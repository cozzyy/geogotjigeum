from __future__ import annotations

import argparse
import time
import numpy as np
import pandas as pd
from scipy.stats import spearmanr
from sklearn.ensemble import ExtraTreesRegressor, HistGradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge, LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .config import CROSS_SECTION_UNIVERSE, MARKET_SYMBOLS
from .data import YahooProvider
from .v4_cross_section import _base_stock_features


BROAD_SECTOR = {
    "semi": "tech",
    "it_parts": "tech",
    "electronics": "tech",
    "platform": "tech",
    "auto": "industrial",
    "industrial": "industrial",
    "defense": "industrial",
    "shipbuilding": "industrial",
    "shipping": "industrial",
    "logistics": "industrial",
    "battery": "materials",
    "chem_battery": "materials",
    "materials": "materials",
    "finance": "financial",
    "insurance": "financial",
    "bio": "healthcare",
    "holding": "diversified",
    "utility": "defensive",
    "telecom": "defensive",
    "consumer": "defensive",
}


def _safe_div(a: pd.Series, b: pd.Series) -> pd.Series:
    return a / b.replace(0, np.nan)


def _broad_sector(sector: str) -> str:
    return BROAD_SECTOR.get(sector, sector)


def _market_features(provider: YahooProvider, start: str) -> pd.DataFrame:
    pieces = []

    def prep(symbol_key: str, exact: bool, prefix: str):
        df = provider.download(MARKET_SYMBOLS[symbol_key], start=start, use_cache=True)
        x = pd.DataFrame(index=df.index)
        c = df["close"]
        x[f"{prefix}_ret1"] = c.pct_change()
        x[f"{prefix}_ret5"] = c.pct_change(5)
        x[f"{prefix}_ret20"] = c.pct_change(20)
        x[f"{prefix}_vol20"] = c.pct_change().rolling(20).std() * np.sqrt(252)
        if not exact:
            x = x.shift(1)
        return x

    pieces.append(prep("kospi", True, "kospi"))
    pieces.append(prep("nasdaq", False, "nasdaq"))
    pieces.append(prep("sox", False, "sox"))
    pieces.append(prep("vix", False, "vix"))
    pieces.append(prep("usdkrw", False, "usdkrw"))

    out = pd.concat(pieces, axis=1).sort_index()
    out.index = pd.to_datetime(out.index).tz_localize(None).normalize()
    return out


def _sector_relative_features(panel: pd.DataFrame, raw_cols: list[str]) -> pd.DataFrame:
    out = panel.copy()

    for c in raw_cols:
        out[f"rank_{c}"] = out.groupby("date")[c].rank(pct=True, method="average")
        out[f"sector_rank_{c}"] = out.groupby(["date", "broad_sector"])[c].rank(
            pct=True, method="average"
        )

    for c in ["ret_1d", "ret_5d", "ret_20d", "vol_20d", "volume_ratio_20"]:
        if c not in out.columns:
            continue
        sector_med = out.groupby(["date", "broad_sector"])[c].transform("median")
        out[f"sector_rel_{c}"] = out[c] - sector_med
        out[f"sector_median_{c}"] = sector_med

    # Market breadth / dispersion: same value for all stocks on a date.
    out["breadth_ret1_positive"] = out.groupby("date")["ret_1d"].transform(lambda s: (s > 0).mean())
    out["breadth_ret5_positive"] = out.groupby("date")["ret_5d"].transform(lambda s: (s > 0).mean())
    out["dispersion_ret5"] = out.groupby("date")["ret_5d"].transform("std")
    out["dispersion_ret20"] = out.groupby("date")["ret_20d"].transform("std")

    return out


def _targets(panel: pd.DataFrame, horizon: int) -> pd.DataFrame:
    out = panel.copy()
    future_col = f"future_ret_{horizon}d"

    # Overall cross-sectional rank.
    out[f"target_rank_{horizon}d"] = out.groupby("date")[future_col].rank(
        pct=True, method="average"
    )

    # Sector-neutral future return, then ranked across all stocks.
    sector_med = out.groupby(["date", "broad_sector"])[future_col].transform("median")
    out[f"future_sector_neutral_{horizon}d"] = out[future_col] - sector_med
    out[f"target_sector_neutral_rank_{horizon}d"] = out.groupby("date")[
        f"future_sector_neutral_{horizon}d"
    ].rank(pct=True, method="average")

    return out


def build_panel(
    start: str = "2017-01-01",
    max_tickers: int | None = None,
    horizon: int = 5,
) -> tuple[pd.DataFrame, list[str]]:
    provider = YahooProvider()
    items = list(CROSS_SECTION_UNIVERSE.items())
    if max_tickers:
        items = items[:max_tickers]

    rows = []
    total = len(items)

    for i, (code, meta) in enumerate(items, 1):
        print(f"[{i}/{total}] {code} {meta['name']} 데이터 준비...", flush=True)
        try:
            stock = provider.download(meta["symbol"], start=start, use_cache=True)
        except Exception as exc:
            print(f"    건너뜀: {exc}", flush=True)
            continue

        f = _base_stock_features(stock)
        close = stock["close"]
        f[f"future_ret_{horizon}d"] = close.shift(-horizon) / close - 1
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
        "future_ret_1d", "future_ret_5d", f"future_ret_{horizon}d",
    }
    raw_cols = [c for c in panel.columns if c not in exclude and not c.startswith("future_")]

    panel = _sector_relative_features(panel, raw_cols)
    panel = _targets(panel, horizon)

    # Global regime variables.
    market = _market_features(provider, start).reset_index()
    market = market.rename(columns={market.columns[0]: "date"})
    panel = panel.merge(market, on="date", how="left")

    # Sector one-hot.
    dummies = pd.get_dummies(panel["broad_sector"], prefix="bsec", dtype=float)
    panel = pd.concat([panel, dummies], axis=1)

    engineered = [
        c for c in panel.columns
        if c.startswith(("rank_", "sector_rank_", "sector_rel_", "sector_median_"))
        or c in {
            "breadth_ret1_positive", "breadth_ret5_positive",
            "dispersion_ret5", "dispersion_ret20",
        }
    ]
    market_cols = [
        c for c in panel.columns
        if c.startswith(("kospi_", "nasdaq_", "sox_", "vix_", "usdkrw_"))
    ]
    feature_cols = list(dict.fromkeys(raw_cols + engineered + market_cols + list(dummies.columns)))

    return panel.sort_values(["date", "ticker"]).reset_index(drop=True), feature_cols


def _regressor(name: str):
    if name == "ridge":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=20.0)),
        ])
    if name == "histgb":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", HistGradientBoostingRegressor(
                max_depth=4,
                learning_rate=0.035,
                max_iter=180,
                l2_regularization=5.0,
                min_samples_leaf=40,
                random_state=42,
            )),
        ])
    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesRegressor(
                n_estimators=300,
                max_depth=10,
                min_samples_leaf=20,
                max_features=0.45,
                n_jobs=-1,
                random_state=42,
            )),
        ])
    raise ValueError(name)


class PairwiseLinearRanker:
    def __init__(self, max_pairs_per_date: int = 24, min_rank_gap: float = 0.30):
        self.max_pairs_per_date = max_pairs_per_date
        self.min_rank_gap = min_rank_gap
        self.imputer = SimpleImputer(strategy="median")
        self.scaler = StandardScaler()
        self.model = LogisticRegression(
            max_iter=2500, C=0.10, fit_intercept=False, solver="lbfgs"
        )

    def fit(self, X: pd.DataFrame, y: pd.Series, dates: pd.Series):
        Ximp = self.imputer.fit_transform(X)
        Xs = self.scaler.fit_transform(Ximp)
        work = pd.DataFrame({"date": pd.to_datetime(dates).to_numpy(), "y": y.to_numpy()})
        rng = np.random.default_rng(42)

        diffs = []
        labels = []

        for dt, idx in work.groupby("date").groups.items():
            idx = np.asarray(list(idx), dtype=int)
            if len(idx) < 4:
                continue

            yy = y.iloc[idx].to_numpy()
            order = np.argsort(yy)
            low_pool = order[: max(2, len(order)//3)]
            high_pool = order[-max(2, len(order)//3):]

            pairs = []
            for _ in range(self.max_pairs_per_date):
                a = int(rng.choice(high_pool))
                b = int(rng.choice(low_pool))
                if yy[a] - yy[b] < self.min_rank_gap:
                    continue
                pairs.append((idx[a], idx[b], 1))
                pairs.append((idx[b], idx[a], 0))

            for ia, ib, label in pairs:
                diffs.append(Xs[ia] - Xs[ib])
                labels.append(label)

        if not diffs:
            raise ValueError("pairwise 학습쌍이 없습니다.")

        self.model.fit(np.asarray(diffs), np.asarray(labels))
        return self

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        Xs = self.scaler.transform(self.imputer.transform(X))
        # Pairwise logistic is linear in feature differences; individual latent utility is w'x.
        return Xs @ self.model.coef_.ravel()


def _folds(dates: pd.Series, min_years: int = 3, test_months: int = 6):
    unique = pd.DatetimeIndex(sorted(pd.unique(dates)))
    earliest = unique.min() + pd.DateOffset(years=min_years)
    starts = pd.date_range(earliest.to_period("M").start_time, unique.max(), freq=f"{test_months}MS")
    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def _predict_fold(
    model_name: str,
    train: pd.DataFrame,
    test: pd.DataFrame,
    feature_cols: list[str],
    target_col: str,
):
    fit = train.dropna(subset=[target_col]).copy()

    if model_name == "pairwise":
        model = PairwiseLinearRanker()
        model.fit(fit[feature_cols], fit[target_col], fit["date"])
        return model.predict(test[feature_cols])

    model = _regressor(model_name)
    model.fit(fit[feature_cols], fit[target_col])
    return model.predict(test[feature_cols])


def _daily_metrics(pred: pd.DataFrame, horizon: int) -> pd.DataFrame:
    rows = []

    for dt, g in pred.groupby("date"):
        if len(g) < 8:
            continue

        g = g.dropna(subset=["score", f"future_ret_{horizon}d", "target_rank"]).copy()
        if len(g) < 8:
            continue

        ranked = g.sort_values("score")
        k = max(1, int(np.floor(len(ranked) * 0.20)))
        bottom = ranked.head(k)
        top = ranked.tail(k)

        ic_raw = spearmanr(g["score"], g[f"future_ret_{horizon}d"], nan_policy="omit").statistic
        ic_rank = spearmanr(g["score"], g["target_rank"], nan_policy="omit").statistic
        ic_neutral = spearmanr(
            g["score"], g[f"future_sector_neutral_{horizon}d"], nan_policy="omit"
        ).statistic

        rows.append({
            "date": dt,
            "stocks": len(g),
            "rank_ic_raw": ic_raw,
            "rank_ic_target": ic_rank,
            "rank_ic_sector_neutral": ic_neutral,
            "top_ret": top[f"future_ret_{horizon}d"].mean(),
            "bottom_ret": bottom[f"future_ret_{horizon}d"].mean(),
            "spread": top[f"future_ret_{horizon}d"].mean() - bottom[f"future_ret_{horizon}d"].mean(),
            "top_neutral": top[f"future_sector_neutral_{horizon}d"].mean(),
            "bottom_neutral": bottom[f"future_sector_neutral_{horizon}d"].mean(),
            "neutral_spread": (
                top[f"future_sector_neutral_{horizon}d"].mean()
                - bottom[f"future_sector_neutral_{horizon}d"].mean()
            ),
            "top_beats_median": (
                top[f"future_ret_{horizon}d"] > g[f"future_ret_{horizon}d"].median()
            ).mean(),
        })

    return pd.DataFrame(rows).sort_values("date")


def _nonoverlap(daily: pd.DataFrame, step: int) -> pd.DataFrame:
    if daily.empty:
        return daily
    dates = pd.DatetimeIndex(sorted(daily["date"].unique()))
    keep = set(dates[::step])
    return daily[daily["date"].isin(keep)].copy()


def _aggregate(daily: pd.DataFrame, prefix: str = "") -> dict:
    if daily.empty:
        return {}
    return {
        f"{prefix}days": len(daily),
        f"{prefix}mean_ic": float(daily["rank_ic_target"].mean()),
        f"{prefix}positive_ic_rate": float((daily["rank_ic_target"] > 0).mean()),
        f"{prefix}mean_spread": float(daily["spread"].mean()),
        f"{prefix}positive_spread_rate": float((daily["spread"] > 0).mean()),
        f"{prefix}mean_neutral_spread": float(daily["neutral_spread"].mean()),
        f"{prefix}positive_neutral_spread_rate": float((daily["neutral_spread"] > 0).mean()),
        f"{prefix}top_beats_median": float(daily["top_beats_median"].mean()),
    }


def run_walk_forward(
    panel: pd.DataFrame,
    feature_cols: list[str],
    model_name: str,
    target_kind: str = "sector_neutral_rank",
    horizon: int = 5,
    test_months: int = 6,
):
    target_col = (
        f"target_sector_neutral_rank_{horizon}d"
        if target_kind == "sector_neutral_rank"
        else f"target_rank_{horizon}d"
    )

    parts = []
    for fold_no, (start, end) in enumerate(_folds(panel["date"], test_months=test_months), 1):
        train = panel[panel["date"] < start].copy()
        test = panel[(panel["date"] >= start) & (panel["date"] < end)].copy()
        if train.empty or test.empty:
            continue

        purge_cutoff = start - pd.offsets.BDay(horizon)
        train = train[train["date"] <= purge_cutoff]
        if train[target_col].notna().sum() < 3000:
            continue

        print(
            f"  fold {fold_no}: train_rows={train[target_col].notna().sum():,}, "
            f"test={start.date()}~{(end-pd.Timedelta(days=1)).date()}",
            flush=True,
        )

        score = _predict_fold(model_name, train, test, feature_cols, target_col)
        part = test[
            [
                "date", "ticker", "name", "broad_sector",
                f"future_ret_{horizon}d",
                f"future_sector_neutral_{horizon}d",
                f"target_rank_{horizon}d",
                f"target_sector_neutral_rank_{horizon}d",
            ]
        ].copy()
        part["score"] = score
        part["target_rank"] = part[target_col]
        parts.append(part)

    if not parts:
        return pd.DataFrame(), pd.DataFrame(), {}

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    nonoverlap = _nonoverlap(daily, horizon)

    metrics = {
        **_aggregate(daily, "daily_"),
        **_aggregate(nonoverlap, "nonoverlap_"),
    }

    recent_cut = daily["date"].max() - pd.DateOffset(months=12)
    recent = daily[daily["date"] >= recent_cut]
    metrics.update(_aggregate(recent, "recent12m_"))

    return pred, daily, metrics


def compare(
    panel: pd.DataFrame,
    feature_cols: list[str],
    target_kind: str,
    horizon: int,
    fast: bool,
):
    models = ["ridge", "extra_trees", "pairwise"] if fast else [
        "ridge", "histgb", "extra_trees", "pairwise"
    ]
    rows = []

    for model_name in models:
        print(f"\n=== V5 model={model_name} target={target_kind} horizon={horizon}d ===", flush=True)
        t0 = time.perf_counter()
        _, _, metrics = run_walk_forward(
            panel, feature_cols, model_name, target_kind, horizon
        )
        if not metrics:
            continue
        row = {"model": model_name, "target": target_kind, "horizon": horizon, **metrics}
        rows.append(row)
        print(
            f"완료 {time.perf_counter()-t0:.1f}초 | "
            f"nonoverlap IC={row['nonoverlap_mean_ic']:.4f} | "
            f"neutral spread={row['nonoverlap_mean_neutral_spread']:.4%} | "
            f"positive={row['nonoverlap_positive_neutral_spread_rate']:.1%}",
            flush=True,
        )

    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser(description="V5 rank regression / pairwise cross-sectional research")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, choices=[5, 20], default=5)
    p.add_argument(
        "--target",
        choices=["raw_rank", "sector_neutral_rank"],
        default="sector_neutral_rank",
    )
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V5 panel 생성 ===", flush=True)
    t0 = time.perf_counter()
    panel, features = build_panel(
        start=args.start,
        max_tickers=args.max_tickers,
        horizon=args.horizon,
    )
    print(
        f"panel: {panel['ticker'].nunique()}종목, {panel['date'].nunique()}일, "
        f"{len(panel):,} rows, {len(features)} features "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )

    report = compare(
        panel, features, args.target, args.horizon, args.fast
    )
    if report.empty:
        print("결과가 없습니다.")
        return

    # Rank quality is primary; sector-neutral top-bottom spread is secondary.
    report["score"] = (
        -report["nonoverlap_mean_ic"].fillna(0) * 0.45
        -report["nonoverlap_mean_neutral_spread"].fillna(0) * 5.0
        -report["nonoverlap_positive_neutral_spread_rate"].fillna(0.5) * 0.20
        -report["recent12m_mean_ic"].fillna(0) * 0.15
    )
    report = report.sort_values("score")

    cols = [
        "model", "target", "horizon",
        "daily_mean_ic", "daily_mean_spread", "daily_mean_neutral_spread",
        "nonoverlap_days", "nonoverlap_mean_ic",
        "nonoverlap_positive_ic_rate",
        "nonoverlap_mean_spread", "nonoverlap_positive_spread_rate",
        "nonoverlap_mean_neutral_spread",
        "nonoverlap_positive_neutral_spread_rate",
        "nonoverlap_top_beats_median",
        "recent12m_mean_ic", "recent12m_mean_neutral_spread",
        "recent12m_positive_neutral_spread_rate",
    ]

    print("\n=== V5 모델 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 280):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
