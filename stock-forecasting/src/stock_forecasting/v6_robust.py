from __future__ import annotations

import argparse
import math
import time
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.stats import spearmanr
from sklearn.ensemble import ExtraTreesRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .config import CROSS_SECTION_UNIVERSE, MARKET_SYMBOLS
from .data import YahooProvider
from .v5_rank import _broad_sector


def _safe_div(a: pd.Series, b: pd.Series) -> pd.Series:
    return a / b.replace(0, np.nan)


def _stock_features(df: pd.DataFrame, horizon: int) -> pd.DataFrame:
    close = df["close"]
    volume = df["volume"].astype(float)
    prev = close.shift(1)
    ret1 = close.pct_change()
    traded_value = close * volume

    out = pd.DataFrame(index=df.index)

    for n in [1, 2, 3, 5, 10, 20, 60]:
        out[f"ret_{n}d"] = close.pct_change(n)

    for n in [5, 10, 20, 60]:
        ma = close.rolling(n).mean()
        out[f"close_vs_ma{n}"] = _safe_div(close, ma) - 1

    out["ma5_vs_ma20"] = _safe_div(close.rolling(5).mean(), close.rolling(20).mean()) - 1
    out["ma20_vs_ma60"] = _safe_div(close.rolling(20).mean(), close.rolling(60).mean()) - 1
    out["gap_return"] = _safe_div(df["open"], prev) - 1
    out["intraday_return"] = _safe_div(close, df["open"]) - 1
    out["day_range"] = _safe_div(df["high"] - df["low"], prev)
    out["close_location"] = _safe_div(close - df["low"], df["high"] - df["low"])

    for n in [5, 10, 20, 60]:
        out[f"vol_{n}d"] = ret1.rolling(n).std() * np.sqrt(252)

    neg = ret1.where(ret1 < 0)
    out["downside_vol20"] = neg.rolling(20, min_periods=8).std() * np.sqrt(252)
    out["ret_skew20"] = ret1.rolling(20).skew()
    out["ret_max20"] = ret1.rolling(20).max()
    out["ret_min20"] = ret1.rolling(20).min()
    out["drawdown20"] = close / close.rolling(20).max() - 1
    out["dist_high60"] = close / close.rolling(60).max() - 1
    out["dist_low60"] = close / close.rolling(60).min() - 1

    out["volume_ratio_5"] = _safe_div(volume, volume.rolling(5).mean())
    out["volume_ratio_20"] = _safe_div(volume, volume.rolling(20).mean())
    logv = np.log1p(volume)
    out["volume_z20"] = _safe_div(logv - logv.rolling(20).mean(), logv.rolling(20).std())

    log_value = np.log1p(traded_value)
    out["traded_value_log"] = log_value
    out["value_ratio_5"] = _safe_div(traded_value, traded_value.rolling(5).mean())
    out["value_ratio_20"] = _safe_div(traded_value, traded_value.rolling(20).mean())
    out["value_z20"] = _safe_div(
        log_value - log_value.rolling(20).mean(),
        log_value.rolling(20).std(),
    )
    out["amihud20"] = (
        _safe_div(ret1.abs(), traded_value) * 1e9
    ).rolling(20, min_periods=10).mean()
    out["ret_value_corr20"] = ret1.rolling(20).corr(log_value.diff())

    out["reversal_1x5"] = out["ret_1d"] * out["ret_5d"]
    out["trend_5x20"] = out["ret_5d"] * out["ret_20d"]
    out["trend_20x60"] = out["ret_20d"] * out["ret_60d"]
    out["vol_ratio_5_20"] = _safe_div(out["vol_5d"], out["vol_20d"])
    out["vol_ratio_20_60"] = _safe_div(out["vol_20d"], out["vol_60d"])

    out[f"future_ret_{horizon}d"] = close.shift(-horizon) / close - 1
    out["traded_value_raw"] = traded_value

    return out.replace([np.inf, -np.inf], np.nan)


def _market_features(provider: YahooProvider, start: str) -> pd.DataFrame:
    specs = [
        ("kospi", True),
        ("kosdaq", True),
        ("sp500", False),
        ("nasdaq", False),
        ("sox", False),
        ("vix", False),
        ("tnx", False),
        ("dxy", False),
        ("usdkrw", False),
    ]
    pieces = []

    for key, same_day in specs:
        try:
            df = provider.download(MARKET_SYMBOLS[key], start=start, use_cache=True)
        except Exception:
            continue

        c = df["close"]
        x = pd.DataFrame(index=df.index)
        x[f"{key}_ret1"] = c.pct_change()
        x[f"{key}_ret5"] = c.pct_change(5)
        x[f"{key}_ret20"] = c.pct_change(20)
        x[f"{key}_vol20"] = c.pct_change().rolling(20).std() * np.sqrt(252)

        if not same_day:
            x = x.shift(1)
        pieces.append(x)

    if not pieces:
        return pd.DataFrame()

    out = pd.concat(pieces, axis=1, sort=False).sort_index()
    out.index = pd.to_datetime(out.index).tz_localize(None).normalize()
    return out


def _load_investor_flow(
    ticker: str,
    flow_dir: str | None,
    traded_value: pd.Series,
) -> pd.DataFrame:
    if not flow_dir:
        return pd.DataFrame(index=traded_value.index)

    root = Path(flow_dir)
    csv_path = root / f"{ticker}.csv"
    parquet_path = root / f"{ticker}.parquet"

    if csv_path.exists():
        flow = pd.read_csv(csv_path)
    elif parquet_path.exists():
        flow = pd.read_parquet(parquet_path)
    else:
        return pd.DataFrame(index=traded_value.index)

    if "date" not in flow.columns:
        raise ValueError(f"{ticker} investor-flow 파일에 date 컬럼이 필요합니다.")

    flow["date"] = pd.to_datetime(flow["date"]).dt.tz_localize(None).dt.normalize()
    flow = flow.set_index("date").sort_index()

    aliases = {
        "foreign_net": ["foreign_net", "foreign_net_value", "foreign"],
        "institution_net": ["institution_net", "institution_net_value", "institution"],
    }

    out = pd.DataFrame(index=traded_value.index)
    for canonical, candidates in aliases.items():
        source = next((c for c in candidates if c in flow.columns), None)
        if source is None:
            continue
        s = pd.to_numeric(flow[source], errors="coerce").reindex(out.index)
        out[canonical] = s
        for n in [1, 5, 20]:
            summed = s.rolling(n, min_periods=1).sum()
            denom = traded_value.rolling(n, min_periods=1).mean()
            out[f"{canonical}_ratio_{n}d"] = _safe_div(summed, denom)

    return out


def _cross_section_features(panel: pd.DataFrame, raw_cols: list[str]) -> pd.DataFrame:
    out = panel.copy()

    rank_blocks = {}
    for c in raw_cols:
        rank_blocks[f"rank_{c}"] = out.groupby("date")[c].rank(pct=True, method="average")
        rank_blocks[f"sector_rank_{c}"] = out.groupby(["date", "broad_sector"])[c].rank(
            pct=True, method="average"
        )

    if rank_blocks:
        out = pd.concat([out, pd.DataFrame(rank_blocks, index=out.index)], axis=1)

    rel_cols = [
        "ret_1d", "ret_5d", "ret_20d", "ret_60d",
        "vol_20d", "downside_vol20",
        "volume_ratio_20", "value_ratio_20", "amihud20",
    ]
    rel_data = {}
    for c in rel_cols:
        if c not in out.columns:
            continue
        med = out.groupby(["date", "broad_sector"])[c].transform("median")
        rel_data[f"sector_rel_{c}"] = out[c] - med
        rel_data[f"sector_median_{c}"] = med

    rel_data["breadth_ret1_positive"] = out.groupby("date")["ret_1d"].transform(
        lambda s: (s > 0).mean()
    )
    rel_data["breadth_ret5_positive"] = out.groupby("date")["ret_5d"].transform(
        lambda s: (s > 0).mean()
    )
    rel_data["breadth_ret20_positive"] = out.groupby("date")["ret_20d"].transform(
        lambda s: (s > 0).mean()
    )
    rel_data["dispersion_ret5"] = out.groupby("date")["ret_5d"].transform("std")
    rel_data["dispersion_ret20"] = out.groupby("date")["ret_20d"].transform("std")
    rel_data["sector_breadth_ret5"] = out.groupby(["date", "broad_sector"])["ret_5d"].transform(
        lambda s: (s > 0).mean()
    )

    return pd.concat([out, pd.DataFrame(rel_data, index=out.index)], axis=1).copy()


def _add_targets(panel: pd.DataFrame, horizon: int) -> pd.DataFrame:
    out = panel.copy()
    future = f"future_ret_{horizon}d"

    out[f"target_rank_{horizon}d"] = out.groupby("date")[future].rank(
        pct=True, method="average"
    )

    sector_med = out.groupby(["date", "broad_sector"])[future].transform("median")
    out[f"future_sector_neutral_{horizon}d"] = out[future] - sector_med
    out[f"target_sector_neutral_rank_{horizon}d"] = out.groupby("date")[
        f"future_sector_neutral_{horizon}d"
    ].rank(pct=True, method="average")

    return out


def build_panel(
    start: str = "2017-01-01",
    horizon: int = 5,
    max_tickers: int | None = None,
    investor_flow_dir: str | None = None,
) -> tuple[pd.DataFrame, list[str]]:
    provider = YahooProvider()
    items = list(CROSS_SECTION_UNIVERSE.items())
    if max_tickers:
        items = items[:max_tickers]

    rows = []
    for i, (code, meta) in enumerate(items, 1):
        print(f"[{i}/{len(items)}] {code} {meta['name']} 데이터 준비...", flush=True)
        try:
            stock = provider.download(meta["symbol"], start=start, use_cache=True)
        except Exception as exc:
            print(f"    건너뜀: {exc}", flush=True)
            continue

        f = _stock_features(stock, horizon)
        flow = _load_investor_flow(code, investor_flow_dir, f["traded_value_raw"])
        if not flow.empty:
            f = pd.concat([f, flow], axis=1)

        f["date"] = f.index
        f["ticker"] = code
        f["name"] = meta["name"]
        f["sector"] = meta["sector"]
        f["broad_sector"] = _broad_sector(meta["sector"])
        rows.append(f.reset_index(drop=True))

    if not rows:
        raise RuntimeError("사용 가능한 종목 데이터가 없습니다.")

    panel = pd.concat(rows, ignore_index=True)
    panel["date"] = pd.to_datetime(panel["date"])

    exclude = {
        "date", "ticker", "name", "sector", "broad_sector",
        f"future_ret_{horizon}d", "traded_value_raw",
    }
    raw_cols = [
        c for c in panel.columns
        if c not in exclude and not c.startswith("future_")
    ]

    panel = _cross_section_features(panel, raw_cols)
    panel = _add_targets(panel, horizon)

    market = _market_features(provider, start)
    if not market.empty:
        market = market.reset_index().rename(columns={"index": "date"})
        if "date" not in market.columns:
            market = market.rename(columns={market.columns[0]: "date"})
        panel = panel.merge(market, on="date", how="left")

    dummies = pd.get_dummies(panel["broad_sector"], prefix="bsec", dtype=float)
    panel = pd.concat([panel, dummies], axis=1)

    engineered = [
        c for c in panel.columns
        if c.startswith(("rank_", "sector_rank_", "sector_rel_", "sector_median_"))
        or c in {
            "breadth_ret1_positive", "breadth_ret5_positive", "breadth_ret20_positive",
            "dispersion_ret5", "dispersion_ret20", "sector_breadth_ret5",
        }
    ]
    market_cols = [
        c for c in panel.columns
        if c.startswith((
            "kospi_", "kosdaq_", "sp500_", "nasdaq_", "sox_",
            "vix_", "tnx_", "dxy_", "usdkrw_",
        ))
    ]
    feature_cols = list(dict.fromkeys(
        raw_cols + engineered + market_cols + list(dummies.columns)
    ))

    panel = panel.replace([np.inf, -np.inf], np.nan)
    return panel.sort_values(["date", "ticker"]).reset_index(drop=True), feature_cols


def _model(name: str):
    if name == "ridge":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=20.0)),
        ])

    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesRegressor(
                n_estimators=240,
                max_depth=10,
                min_samples_leaf=20,
                max_features=0.45,
                n_jobs=-1,
                random_state=42,
            )),
        ])

    raise ValueError(name)


def _apply_train_window(
    train: pd.DataFrame,
    test_start: pd.Timestamp,
    years: int | None,
) -> pd.DataFrame:
    if years is None:
        return train
    cutoff = test_start - pd.DateOffset(years=years)
    return train.loc[train["date"] >= cutoff]


def _daily_metrics(pred: pd.DataFrame, horizon: int) -> pd.DataFrame:
    rows = []

    for dt, g in pred.groupby("date"):
        g = g.dropna(subset=[
            "score", "target_rank",
            f"future_ret_{horizon}d",
            f"future_sector_neutral_{horizon}d",
        ]).copy()
        if len(g) < 8:
            continue

        ranked = g.sort_values("score")
        k = max(1, int(np.floor(len(ranked) * 0.20)))
        bottom = ranked.head(k)
        top = ranked.tail(k)

        ic = spearmanr(g["score"], g["target_rank"], nan_policy="omit").statistic
        neutral_ic = spearmanr(
            g["score"],
            g[f"future_sector_neutral_{horizon}d"],
            nan_policy="omit",
        ).statistic

        rows.append({
            "date": dt,
            "rank_ic": ic,
            "neutral_ic": neutral_ic,
            "spread": (
                top[f"future_ret_{horizon}d"].mean()
                - bottom[f"future_ret_{horizon}d"].mean()
            ),
            "neutral_spread": (
                top[f"future_sector_neutral_{horizon}d"].mean()
                - bottom[f"future_sector_neutral_{horizon}d"].mean()
            ),
            "top_beats_median": (
                top[f"future_ret_{horizon}d"]
                > g[f"future_ret_{horizon}d"].median()
            ).mean(),
        })

    return pd.DataFrame(rows).sort_values("date")


def _offset_metrics(daily: pd.DataFrame, horizon: int) -> tuple[pd.DataFrame, dict]:
    if daily.empty:
        return pd.DataFrame(), {}

    unique_dates = pd.DatetimeIndex(sorted(daily["date"].unique()))
    rows = []

    for offset in range(horizon):
        chosen = set(unique_dates[offset::horizon])
        d = daily[daily["date"].isin(chosen)]
        if d.empty:
            continue

        rows.append({
            "offset": offset,
            "days": len(d),
            "mean_ic": d["rank_ic"].mean(),
            "positive_ic_rate": (d["rank_ic"] > 0).mean(),
            "mean_neutral_spread": d["neutral_spread"].mean(),
            "positive_neutral_spread_rate": (d["neutral_spread"] > 0).mean(),
            "mean_spread": d["spread"].mean(),
            "positive_spread_rate": (d["spread"] > 0).mean(),
            "top_beats_median": d["top_beats_median"].mean(),
        })

    detail = pd.DataFrame(rows)
    if detail.empty:
        return detail, {}

    summary = {
        "offset_mean_ic": float(detail["mean_ic"].mean()),
        "offset_std_ic": float(detail["mean_ic"].std(ddof=0)),
        "offset_positive_ic_rate": float(detail["positive_ic_rate"].mean()),
        "offset_mean_neutral_spread": float(detail["mean_neutral_spread"].mean()),
        "offset_std_neutral_spread": float(detail["mean_neutral_spread"].std(ddof=0)),
        "offset_positive_neutral_spread_rate": float(
            detail["positive_neutral_spread_rate"].mean()
        ),
        "offset_mean_spread": float(detail["mean_spread"].mean()),
        "offset_positive_spread_rate": float(detail["positive_spread_rate"].mean()),
        "offset_top_beats_median": float(detail["top_beats_median"].mean()),
    }
    return detail, summary


def _prediction_frame(
    test: pd.DataFrame,
    score: np.ndarray,
    target_col: str,
    horizon: int,
) -> pd.DataFrame:
    part = test[[
        "date", "ticker", "name", "broad_sector",
        f"future_ret_{horizon}d",
        f"future_sector_neutral_{horizon}d",
        target_col,
    ]].copy()
    part["score"] = score
    part["target_rank"] = part[target_col]
    return part


def _preholdout_folds(
    panel: pd.DataFrame,
    holdout_start: pd.Timestamp,
    test_months: int,
) -> list[tuple[pd.Timestamp, pd.Timestamp]]:
    dates = pd.DatetimeIndex(sorted(pd.unique(panel["date"])))
    first = (dates.min() + pd.DateOffset(years=3)).to_period("M").start_time
    starts = pd.date_range(first, holdout_start, freq=f"{test_months}MS")
    return [
        (s, min(s + pd.DateOffset(months=test_months), holdout_start))
        for s in starts
        if s < holdout_start
    ]


def evaluate_candidate(
    panel: pd.DataFrame,
    feature_cols: list[str],
    model_name: str,
    train_years: int | None,
    holdout_start: pd.Timestamp,
    horizon: int,
    test_months: int = 12,
) -> tuple[pd.DataFrame, pd.DataFrame, dict]:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    parts = []

    folds = _preholdout_folds(panel, holdout_start, test_months)

    for fold_no, (start, end) in enumerate(folds, 1):
        train = panel[panel["date"] < start].copy()
        train = _apply_train_window(train, start, train_years)
        purge_cutoff = start - pd.offsets.BDay(horizon)
        train = train[train["date"] <= purge_cutoff]
        fit = train.dropna(subset=[target_col])

        test = panel[(panel["date"] >= start) & (panel["date"] < end)].copy()

        if len(fit) < 2500 or test.empty:
            continue

        model = _model(model_name)
        model.fit(fit[feature_cols], fit[target_col])
        score = model.predict(test[feature_cols])
        parts.append(_prediction_frame(test, score, target_col, horizon))

    if not parts:
        return pd.DataFrame(), pd.DataFrame(), {}

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    offsets, summary = _offset_metrics(daily, horizon)

    if summary:
        summary["model"] = model_name
        summary["train_window"] = "expanding" if train_years is None else f"{train_years}y"
        summary["preholdout_days"] = len(daily)

    return pred, offsets, summary


def _selection_score(row: pd.Series) -> float:
    # Higher is better. Reward IC/spread consistency and penalize offset instability.
    return float(
        row["offset_mean_ic"]
        + 8.0 * row["offset_mean_neutral_spread"]
        + 0.12 * (row["offset_positive_ic_rate"] - 0.5)
        + 0.12 * (row["offset_positive_neutral_spread_rate"] - 0.5)
        - 0.30 * row["offset_std_ic"]
        - 3.0 * row["offset_std_neutral_spread"]
    )


def select_configuration(
    panel: pd.DataFrame,
    feature_cols: list[str],
    holdout_start: pd.Timestamp,
    horizon: int,
    fast: bool,
) -> pd.DataFrame:
    models = ["ridge", "extra_trees"]
    windows = [5, None] if fast else [3, 5, None]
    rows = []

    total = len(models) * len(windows)
    job = 0
    for model_name in models:
        for years in windows:
            job += 1
            label = "expanding" if years is None else f"{years}y"
            print(f"[{job}/{total}] pre-holdout | {model_name} | {label}", flush=True)
            t0 = time.perf_counter()
            _, _, summary = evaluate_candidate(
                panel, feature_cols, model_name, years,
                holdout_start, horizon, test_months=12 if fast else 6,
            )
            if not summary:
                continue
            summary["selection_score"] = _selection_score(pd.Series(summary))
            rows.append(summary)
            print(
                f"    {time.perf_counter()-t0:.1f}초 | "
                f"IC={summary['offset_mean_ic']:.4f}±{summary['offset_std_ic']:.4f} | "
                f"neutral spread={summary['offset_mean_neutral_spread']:.4%} | "
                f"positive={summary['offset_positive_neutral_spread_rate']:.1%}",
                flush=True,
            )

    return pd.DataFrame(rows).sort_values("selection_score", ascending=False).reset_index(drop=True)


def _fit_final_and_predict_holdout(
    panel: pd.DataFrame,
    feature_cols: list[str],
    model_name: str,
    train_years: int | None,
    holdout_start: pd.Timestamp,
    horizon: int,
) -> tuple[pd.DataFrame, pd.DataFrame, dict]:
    target_col = f"target_sector_neutral_rank_{horizon}d"

    train = panel[panel["date"] < holdout_start].copy()
    train = _apply_train_window(train, holdout_start, train_years)
    purge_cutoff = holdout_start - pd.offsets.BDay(horizon)
    train = train[train["date"] <= purge_cutoff]
    fit = train.dropna(subset=[target_col])

    holdout = panel[panel["date"] >= holdout_start].copy()

    model = _model(model_name)
    model.fit(fit[feature_cols], fit[target_col])
    score = model.predict(holdout[feature_cols])

    pred = _prediction_frame(holdout, score, target_col, horizon)
    daily = _daily_metrics(pred, horizon)
    offsets, summary = _offset_metrics(daily, horizon)

    summary["model"] = model_name
    summary["train_window"] = "expanding" if train_years is None else f"{train_years}y"
    summary["holdout_start"] = holdout_start
    summary["holdout_days"] = len(daily)
    return pred, offsets, summary


def _baseline_holdout(
    holdout: pd.DataFrame,
    horizon: int,
    score_col: str,
    invert: bool = False,
) -> dict:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    score = holdout[score_col].copy()
    if invert:
        score = -score

    pred = _prediction_frame(
        holdout,
        score.to_numpy(),
        target_col,
        horizon,
    )
    daily = _daily_metrics(pred, horizon)
    _, summary = _offset_metrics(daily, horizon)
    return summary


def main():
    p = argparse.ArgumentParser(description="V6 robust data + validation research")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--holdout-months", type=int, default=12)
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--investor-flow-dir", default=None)
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V6 enhanced panel 생성 ===", flush=True)
    t0 = time.perf_counter()
    panel, feature_cols = build_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        investor_flow_dir=args.investor_flow_dir,
    )

    max_date = panel["date"].max()
    cutoff = max_date - pd.DateOffset(months=args.holdout_months)
    available = pd.DatetimeIndex(sorted(panel.loc[panel["date"] >= cutoff, "date"].unique()))
    if len(available) == 0:
        raise RuntimeError("holdout 기간을 만들 수 없습니다.")
    holdout_start = available[0]

    print(
        f"panel: {panel['ticker'].nunique()}종목, {panel['date'].nunique()}일, "
        f"{len(panel):,} rows, {len(feature_cols)} features "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        f"최종 holdout 봉인: {holdout_start.date()} ~ {max_date.date()}",
        flush=True,
    )

    print("\n=== 1단계: holdout 이전에서 모델/학습창 선택 ===", flush=True)
    selection = select_configuration(
        panel, feature_cols, holdout_start, args.horizon, args.fast
    )
    if selection.empty:
        print("선택 가능한 모델이 없습니다.")
        return

    cols = [
        "model", "train_window", "preholdout_days",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread", "offset_std_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "offset_top_beats_median", "selection_score",
    ]
    print("\n=== Pre-holdout 후보 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 240):
        print(selection[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    best = selection.iloc[0]
    best_model = str(best["model"])
    best_years = None if best["train_window"] == "expanding" else int(str(best["train_window"]).rstrip("y"))

    print(
        f"\n선택: model={best_model}, train_window={best['train_window']} "
        f"(holdout 결과를 보지 않고 선택)",
        flush=True,
    )

    print("\n=== 2단계: 봉인된 최근 holdout 단일 평가 ===", flush=True)
    _, holdout_offsets, holdout_summary = _fit_final_and_predict_holdout(
        panel, feature_cols, best_model, best_years,
        holdout_start, args.horizon,
    )

    holdout = panel[panel["date"] >= holdout_start].copy()
    momentum = _baseline_holdout(
        holdout, args.horizon, "rank_ret_20d", invert=False
    )
    reversal = _baseline_holdout(
        holdout, args.horizon, "rank_ret_5d", invert=True
    )

    comparison = pd.DataFrame([
        {"method": f"V6 {best_model}/{best['train_window']}", **holdout_summary},
        {"method": "baseline momentum20", **momentum},
        {"method": "baseline reversal5", **reversal},
    ])

    show = [
        "method",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread", "offset_std_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "offset_mean_spread", "offset_positive_spread_rate",
        "offset_top_beats_median",
    ]

    print("\n=== Final holdout 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 240):
        print(comparison[show].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print("\n=== V6 holdout 5-offset 상세 ===")
    with pd.option_context("display.max_columns", None, "display.width", 220):
        print(holdout_offsets.to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print(
        "\n판정 핵심: V6가 holdout에서 baseline보다 높은 IC/neutral spread를 보이고, "
        "5개 offset 대부분에서 양수인지 확인.",
        flush=True,
    )


if __name__ == "__main__":
    main()
