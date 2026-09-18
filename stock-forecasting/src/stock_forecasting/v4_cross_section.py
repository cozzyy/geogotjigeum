from __future__ import annotations

import argparse
import time
from dataclasses import dataclass

import numpy as np
import pandas as pd
from scipy.stats import spearmanr
from sklearn.ensemble import ExtraTreesClassifier, HistGradientBoostingClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, balanced_accuracy_score, brier_score_loss, roc_auc_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .config import CROSS_SECTION_UNIVERSE
from .data import YahooProvider


@dataclass
class CrossSectionResult:
    predictions: pd.DataFrame
    metrics: dict
    daily_metrics: pd.DataFrame


def _safe_div(a: pd.Series, b: pd.Series) -> pd.Series:
    return a / b.replace(0, np.nan)


def _base_stock_features(df: pd.DataFrame) -> pd.DataFrame:
    out = pd.DataFrame(index=df.index)
    close = df["close"]
    volume = df["volume"]

    for n in [1, 2, 3, 5, 10, 20, 60]:
        out[f"ret_{n}d"] = close.pct_change(n)

    for n in [5, 10, 20, 60]:
        ma = close.rolling(n).mean()
        out[f"close_vs_ma{n}"] = _safe_div(close, ma) - 1

    out["ma5_vs_ma20"] = _safe_div(close.rolling(5).mean(), close.rolling(20).mean()) - 1
    out["ma20_vs_ma60"] = _safe_div(close.rolling(20).mean(), close.rolling(60).mean()) - 1

    prev_close = close.shift(1)
    out["gap_return"] = _safe_div(df["open"], prev_close) - 1
    out["intraday_return"] = _safe_div(close, df["open"]) - 1
    out["day_range"] = _safe_div(df["high"] - df["low"], prev_close)
    out["close_location"] = _safe_div(close - df["low"], df["high"] - df["low"])

    daily_ret = close.pct_change()
    for n in [5, 10, 20]:
        out[f"vol_{n}d"] = daily_ret.rolling(n).std() * np.sqrt(252)

    out["vol_ratio_5_20"] = _safe_div(out["vol_5d"], out["vol_20d"])
    out["volume_ratio_5"] = _safe_div(volume, volume.rolling(5).mean())
    out["volume_ratio_20"] = _safe_div(volume, volume.rolling(20).mean())
    logv = np.log1p(volume)
    out["volume_z20"] = _safe_div(logv - logv.rolling(20).mean(), logv.rolling(20).std())

    out["reversal_1x5"] = out["ret_1d"] * out["ret_5d"]
    out["trend_5x20"] = out["ret_5d"] * out["ret_20d"]

    out["future_ret_5d"] = close.shift(-5) / close - 1
    out["future_ret_1d"] = close.shift(-1) / close - 1

    return out.replace([np.inf, -np.inf], np.nan)


def _rank_features(panel: pd.DataFrame, raw_cols: list[str]) -> pd.DataFrame:
    ranked = panel.copy()
    for c in raw_cols:
        ranked[f"rank_{c}"] = panel.groupby("date")[c].rank(pct=True, method="average")
    return ranked


def _add_targets(panel: pd.DataFrame, upper_q: float = 0.70, lower_q: float = 0.30) -> pd.DataFrame:
    out = panel.copy()

    out["future_rank_5d"] = out.groupby("date")["future_ret_5d"].rank(pct=True, method="average")
    out["future_rank_1d"] = out.groupby("date")["future_ret_1d"].rank(pct=True, method="average")

    out["target_5d_extreme"] = np.where(
        out["future_rank_5d"] >= upper_q,
        1.0,
        np.where(out["future_rank_5d"] <= lower_q, 0.0, np.nan),
    )
    out["target_1d_extreme"] = np.where(
        out["future_rank_1d"] >= upper_q,
        1.0,
        np.where(out["future_rank_1d"] <= lower_q, 0.0, np.nan),
    )

    return out


def build_panel(start: str = "2017-01-01", max_tickers: int | None = None) -> tuple[pd.DataFrame, list[str]]:
    provider = YahooProvider()
    rows = []

    universe_items = list(CROSS_SECTION_UNIVERSE.items())
    if max_tickers:
        universe_items = universe_items[:max_tickers]

    total = len(universe_items)

    for i, (code, meta) in enumerate(universe_items, start=1):
        print(f"[{i}/{total}] {code} {meta['name']} 데이터 준비...", flush=True)
        try:
            stock = provider.download(meta["symbol"], start=start, use_cache=True)
        except Exception as exc:
            print(f"    건너뜀: {exc}", flush=True)
            continue

        f = _base_stock_features(stock)
        f["date"] = f.index
        f["ticker"] = code
        f["name"] = meta["name"]
        f["sector"] = meta["sector"]
        rows.append(f.reset_index(drop=True))

    if not rows:
        raise RuntimeError("사용 가능한 종목 데이터가 없습니다.")

    panel = pd.concat(rows, ignore_index=True)
    panel["date"] = pd.to_datetime(panel["date"])

    raw_cols = [
        c for c in panel.columns
        if c not in {
            "date", "ticker", "name", "sector",
            "future_ret_5d", "future_ret_1d",
        }
    ]

    panel = _rank_features(panel, raw_cols)
    panel = _add_targets(panel)

    rank_cols = [f"rank_{c}" for c in raw_cols]
    feature_cols = raw_cols + rank_cols

    # Sector one-hot. Ticker ID itself is intentionally not used in v4 baseline:
    # first verify that transferable cross-sectional patterns exist.
    sector_dummies = pd.get_dummies(panel["sector"], prefix="sector", dtype=float)
    panel = pd.concat([panel, sector_dummies], axis=1)
    feature_cols += list(sector_dummies.columns)

    return panel.sort_values(["date", "ticker"]).reset_index(drop=True), feature_cols


def _model(name: str):
    if name == "logistic":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", LogisticRegression(max_iter=2500, C=0.05)),
        ])
    if name == "histgb":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", HistGradientBoostingClassifier(
                max_depth=4,
                learning_rate=0.04,
                max_iter=160,
                l2_regularization=4.0,
                min_samples_leaf=30,
                random_state=42,
            )),
        ])
    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesClassifier(
                n_estimators=250,
                max_depth=10,
                min_samples_leaf=20,
                max_features=0.45,
                n_jobs=-1,
                random_state=42,
            )),
        ])
    raise ValueError(name)


def _folds(dates: pd.DatetimeIndex, min_train_years: int = 3, test_months: int = 6):
    unique = pd.DatetimeIndex(sorted(pd.unique(dates)))
    if len(unique) < 500:
        return []

    earliest = unique.min() + pd.DateOffset(years=min_train_years)
    first = earliest.to_period("M").start_time
    starts = pd.date_range(first, unique.max(), freq=f"{test_months}MS")

    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def _daily_rank_metrics(pred: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for dt, g in pred.groupby("date"):
        if len(g) < 8:
            continue

        ranked = g.sort_values("score")
        n = len(ranked)
        k = max(1, int(np.floor(n * 0.20)))
        bottom = ranked.head(k)
        top = ranked.tail(k)

        ic = np.nan
        if g["score"].nunique() > 1 and g["future_ret_5d"].nunique() > 1:
            ic = spearmanr(g["score"], g["future_ret_5d"], nan_policy="omit").statistic

        rows.append({
            "date": dt,
            "stocks": n,
            "rank_ic": ic,
            "top20_ret_5d": top["future_ret_5d"].mean(),
            "bottom20_ret_5d": bottom["future_ret_5d"].mean(),
            "spread_5d": top["future_ret_5d"].mean() - bottom["future_ret_5d"].mean(),
            "top20_win_rate": (top["future_ret_5d"] > 0).mean(),
            "top20_beats_median": (top["future_ret_5d"] > g["future_ret_5d"].median()).mean(),
        })

    return pd.DataFrame(rows).sort_values("date")


def _classification_metrics(pred: pd.DataFrame, target_col: str) -> dict:
    d = pred.dropna(subset=[target_col, "score"]).copy()
    if d.empty:
        return {}

    y = d[target_col].astype(int)
    p = d["score"].clip(1e-6, 1 - 1e-6)
    label = (p >= 0.5).astype(int)

    out = {
        "samples": len(d),
        "accuracy": float(accuracy_score(y, label)),
        "balanced_accuracy": float(balanced_accuracy_score(y, label)),
        "brier": float(brier_score_loss(y, p)),
    }
    try:
        out["roc_auc"] = float(roc_auc_score(y, p))
    except ValueError:
        out["roc_auc"] = np.nan
    return out


def run_walk_forward(
    panel: pd.DataFrame,
    feature_cols: list[str],
    model_name: str = "extra_trees",
    target: str = "5d",
    test_months: int = 6,
) -> CrossSectionResult:
    target_col = "target_5d_extreme" if target == "5d" else "target_1d_extreme"
    purge_days = 5 if target == "5d" else 1

    prediction_parts = []

    for fold_no, (start, end) in enumerate(_folds(panel["date"], test_months=test_months), start=1):
        train = panel.loc[panel["date"] < start].copy()
        test = panel.loc[(panel["date"] >= start) & (panel["date"] < end)].copy()

        if train.empty or test.empty:
            continue

        # Purge rows whose forward target horizon reaches into the test block.
        purge_cutoff = start - pd.offsets.BDay(purge_days)
        train = train.loc[train["date"] <= purge_cutoff]
        fit = train.dropna(subset=[target_col]).copy()

        if len(fit) < 2000:
            continue

        print(
            f"  fold {fold_no}: train={fit['date'].min().date()}~{fit['date'].max().date()} "
            f"({len(fit):,} extreme rows), test={start.date()}~{(end-pd.Timedelta(days=1)).date()}",
            flush=True,
        )

        model = _model(model_name)
        model.fit(fit[feature_cols], fit[target_col].astype(int))

        score = model.predict_proba(test[feature_cols])[:, 1]

        part = test[
            [
                "date", "ticker", "name", "sector",
                "future_ret_5d", "future_ret_1d",
                "future_rank_5d", "future_rank_1d",
                "target_5d_extreme", "target_1d_extreme",
            ]
        ].copy()
        part["score"] = score
        prediction_parts.append(part)

    if not prediction_parts:
        return CrossSectionResult(pd.DataFrame(), {}, pd.DataFrame())

    pred = pd.concat(prediction_parts, ignore_index=True)
    daily = _daily_rank_metrics(pred)
    cls = _classification_metrics(pred, target_col)

    metrics = {
        **cls,
        "days": int(len(daily)),
        "mean_rank_ic": float(daily["rank_ic"].mean()),
        "median_rank_ic": float(daily["rank_ic"].median()),
        "positive_ic_rate": float((daily["rank_ic"] > 0).mean()),
        "mean_top20_ret_5d": float(daily["top20_ret_5d"].mean()),
        "mean_bottom20_ret_5d": float(daily["bottom20_ret_5d"].mean()),
        "mean_spread_5d": float(daily["spread_5d"].mean()),
        "positive_spread_rate": float((daily["spread_5d"] > 0).mean()),
        "top20_win_rate": float(daily["top20_win_rate"].mean()),
        "top20_beats_median": float(daily["top20_beats_median"].mean()),
    }

    recent_cut = daily["date"].max() - pd.DateOffset(months=12)
    recent = daily.loc[daily["date"] >= recent_cut]
    if not recent.empty:
        metrics.update({
            "rank_ic_12m": float(recent["rank_ic"].mean()),
            "spread_5d_12m": float(recent["spread_5d"].mean()),
            "positive_spread_rate_12m": float((recent["spread_5d"] > 0).mean()),
            "top20_beats_median_12m": float(recent["top20_beats_median"].mean()),
        })

    return CrossSectionResult(pred, metrics, daily)


def compare_models(
    panel: pd.DataFrame,
    feature_cols: list[str],
    target: str = "5d",
    fast: bool = False,
) -> pd.DataFrame:
    names = ["logistic", "extra_trees"] if fast else ["logistic", "histgb", "extra_trees"]
    rows = []

    for name in names:
        print(f"\n=== v4 model={name} target={target} ===", flush=True)
        started = time.perf_counter()
        result = run_walk_forward(panel, feature_cols, model_name=name, target=target)

        if not result.metrics:
            continue

        row = {"model": name, "target": target, **result.metrics}
        rows.append(row)

        print(
            f"완료 {time.perf_counter() - started:.1f}초 | "
            f"IC={row['mean_rank_ic']:.4f} | "
            f"spread={row['mean_spread_5d']:.4%} | "
            f"positive_spread={row['positive_spread_rate']:.1%}",
            flush=True,
        )

    return pd.DataFrame(rows)


def latest_ranking(
    panel: pd.DataFrame,
    feature_cols: list[str],
    model_name: str,
    target: str,
    top_n: int = 10,
) -> pd.DataFrame:
    target_col = "target_5d_extreme" if target == "5d" else "target_1d_extreme"
    latest_date = panel["date"].max()

    train = panel.loc[panel["date"] < latest_date].copy()
    fit = train.dropna(subset=[target_col])
    latest = panel.loc[panel["date"] == latest_date].copy()

    model = _model(model_name)
    model.fit(fit[feature_cols], fit[target_col].astype(int))
    latest["score"] = model.predict_proba(latest[feature_cols])[:, 1]

    return latest.sort_values("score", ascending=False)[
        ["date", "ticker", "name", "sector", "score"]
    ].head(top_n)


def main():
    p = argparse.ArgumentParser(description="V4 cross-sectional relative-strength research")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--target", choices=["1d", "5d"], default="5d")
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V4 cross-sectional dataset 생성 ===", flush=True)
    started = time.perf_counter()
    panel, feature_cols = build_panel(start=args.start, max_tickers=args.max_tickers)

    print(
        f"panel 완료: {panel['ticker'].nunique()}종목, "
        f"{panel['date'].nunique()}거래일, {len(panel):,} rows, "
        f"{len(feature_cols)} features "
        f"({time.perf_counter() - started:.1f}초)",
        flush=True,
    )

    report = compare_models(panel, feature_cols, target=args.target, fast=args.fast)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    report["score"] = (
        -report["mean_rank_ic"].fillna(0) * 0.35
        -report["mean_spread_5d"].fillna(0) * 3.0
        -report["positive_spread_rate"].fillna(0.5) * 0.15
        +report["brier"].fillna(1) * 0.20
    )
    report = report.sort_values("score")

    cols = [
        "model", "target", "samples", "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "days", "mean_rank_ic", "positive_ic_rate",
        "mean_top20_ret_5d", "mean_bottom20_ret_5d", "mean_spread_5d",
        "positive_spread_rate", "top20_win_rate", "top20_beats_median",
        "rank_ic_12m", "spread_5d_12m", "positive_spread_rate_12m",
    ]

    print("\n=== V4 모델 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 260):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    best_model = report.iloc[0]["model"]
    print(f"\n=== 최신일 상대강도 상위 종목 | model={best_model} ===")
    ranking = latest_ranking(panel, feature_cols, best_model, args.target, top_n=10)
    with pd.option_context("display.width", 160):
        print(ranking.to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
