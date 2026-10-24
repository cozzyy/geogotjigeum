from __future__ import annotations

import argparse
import math
import numpy as np
import pandas as pd
from sklearn.metrics import brier_score_loss

from .backtest import _direction_metrics
from .config import resolve_ticker
from .data import YahooProvider
from .features import make_dataset
from .models import make_logistic


C_GRID = [0.02, 0.05, 0.10, 0.25, 0.50]
HALF_LIFE_GRID = [None, 252, 504]
SHRINK_GRID = [0.25, 0.50, 0.75, 1.00]


def _pick(cols: list[str], prefixes: tuple[str, ...], exact: set[str] | None = None) -> list[str]:
    exact = exact or set()
    return [c for c in cols if c in exact or any(c.startswith(p) for p in prefixes)]


def advanced_recipes(feature_cols: list[str]) -> dict[str, list[str]]:
    price = _pick(feature_cols, (
        "ret_", "close_vs_ma", "ma5_", "ma20_", "gap_", "intraday_",
        "overnight_", "close_location", "reversal_", "ret1_z", "rsi"
    ))
    vol = _pick(feature_cols, ("atr", "realized_vol_", "vol_ratio_", "volume_"))
    kr = _pick(feature_cols, ("kospi_", "kosdaq_", "excess_vs_"))
    broad_us = _pick(feature_cols, ("sp500_", "nasdaq_", "vix_", "tnx_", "dxy_"))
    semi = _pick(feature_cols, (
        "sox_", "smh_", "soxx_", "nvda_", "micron_", "tsm_",
        "memory_shock", "ai_chip_shock", "semi_etf_consensus",
        "gap_x_sox", "intraday_x_sox"
    ))
    fx = _pick(feature_cols, ("usdkrw_",))

    def uniq(*groups):
        out = []
        for group in groups:
            for c in group:
                if c not in out:
                    out.append(c)
        return out

    return {
        "lean": uniq(price, kr, semi),
        "semi_macro": uniq(price, vol, kr, semi, broad_us),
        "semi_macro_fx": uniq(price, vol, kr, semi, broad_us, fx),
        "price_reversal": uniq(price, vol),
    }


def _weights(n: int, half_life: int | None) -> np.ndarray | None:
    if half_life is None:
        return None
    age = np.arange(n - 1, -1, -1, dtype=float)
    w = np.power(0.5, age / float(half_life))
    return w / np.mean(w)


def _base_rate(y: pd.Series) -> float:
    y = y.astype(float)
    return float((y.sum() + 1.0) / (len(y) + 2.0))


def _fit_predict(model, Xtr, ytr, Xte, half_life: int | None):
    w = _weights(len(ytr), half_life)
    if w is None:
        model.fit(Xtr, ytr)
    else:
        model.fit(Xtr, ytr, model__sample_weight=w)
    return model.predict_proba(Xte)[:, 1]


def _tune(train: pd.DataFrame, cols: list[str]) -> tuple[float, int | None, float, float]:
    # Chronological inner holdout.  Last observation before validation is purged
    # because its next-day label touches the validation window.
    n = len(train)
    split = max(350, int(n * 0.78))
    if split >= n - 80:
        split = n - 80

    fit = train.iloc[:split].copy()
    valid = train.iloc[split:].copy()
    if len(fit) > 1:
        fit = fit.iloc[:-1]

    yfit = fit["target_up_1d"].astype(int)
    yval = valid["target_up_1d"].astype(int)
    base = _base_rate(yfit)

    best = None
    for c in C_GRID:
        for half_life in HALF_LIFE_GRID:
            model = make_logistic(C=c, balanced=False)
            raw = _fit_predict(model, fit[cols], yfit, valid[cols], half_life)
            for shrink in SHRINK_GRID:
                p = base + shrink * (raw - base)
                score = brier_score_loss(yval, np.clip(p, 1e-6, 1 - 1e-6))
                candidate = (score, c, half_life, shrink, base)
                if best is None or candidate[0] < best[0]:
                    best = candidate

    assert best is not None
    _, c, half_life, shrink, _ = best
    return c, half_life, shrink, float(best[0])


def _folds(index: pd.DatetimeIndex, min_train_days: int = 504, test_months: int = 3):
    if len(index) <= min_train_days:
        return []
    first = index[min_train_days].to_period("M").start_time
    last = index.max()
    starts = pd.date_range(first, last, freq=f"{test_months}MS")
    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def run_advanced_for_dataset(
    dataset: pd.DataFrame,
    feature_cols: list[str],
    recipe: str = "semi_macro",
    min_train_days: int = 504,
    test_months: int = 3,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    recipes = advanced_recipes(feature_cols)
    if recipe not in recipes:
        raise ValueError(f"unknown recipe: {recipe}; choices={sorted(recipes)}")
    cols = recipes[recipe]

    data = dataset.dropna(subset=["target_up_1d"]).copy()
    rows = []
    tuning_rows = []

    for start, end in _folds(data.index, min_train_days, test_months):
        train = data.loc[data.index < start].copy()
        test = data.loc[(data.index >= start) & (data.index < end)].copy()
        if len(train) < min_train_days or test.empty:
            continue

        # Purge one row: its t+1 direction label overlaps first test day.
        train = train.iloc[:-1]
        if len(train) < min_train_days:
            continue

        c, half_life, shrink, inner_brier = _tune(train, cols)
        ytr = train["target_up_1d"].astype(int)
        base = _base_rate(ytr)

        model = make_logistic(C=c, balanced=False)
        raw = _fit_predict(model, train[cols], ytr, test[cols], half_life)
        p = np.clip(base + shrink * (raw - base), 1e-6, 1 - 1e-6)

        rows.append(pd.DataFrame({
            "prob_up": p,
            "raw_prob_up": raw,
            "actual_up": test["target_up_1d"].values,
            "base_prob": base,
        }, index=test.index))
        tuning_rows.append({
            "test_start": start,
            "C": c,
            "half_life": "none" if half_life is None else half_life,
            "shrink": shrink,
            "inner_brier": inner_brier,
            "features": len(cols),
        })

    if not rows:
        return pd.DataFrame(), pd.DataFrame(tuning_rows)
    return pd.concat(rows).sort_index(), pd.DataFrame(tuning_rows)


def _period_metrics(pred: pd.DataFrame, months: int | None) -> dict:
    if pred.empty:
        return {}
    d = pred if months is None else pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=months)]
    return _direction_metrics(d)


def selective_table(pred: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for threshold in [0.00, 0.025, 0.05, 0.075, 0.10]:
        confidence = (pred["prob_up"] - 0.5).abs()
        d = pred.loc[confidence >= threshold]
        if d.empty:
            continue
        metrics = _direction_metrics(d)
        rows.append({
            "min_confidence": threshold,
            "coverage": len(d) / len(pred),
            "samples": len(d),
            "accuracy": metrics.get("accuracy"),
            "balanced_accuracy": metrics.get("balanced_accuracy"),
            "brier": metrics.get("brier"),
        })
    return pd.DataFrame(rows)


def calibration_table(pred: pd.DataFrame) -> pd.DataFrame:
    if pred.empty:
        return pd.DataFrame()
    bins = [0.0, 0.40, 0.45, 0.50, 0.55, 0.60, 1.0]
    labels = ["<40", "40-45", "45-50", "50-55", "55-60", "60+"]
    d = pred.copy()
    d["bucket"] = pd.cut(d["prob_up"], bins=bins, labels=labels, include_lowest=True)
    rows = []
    for bucket, g in d.groupby("bucket", observed=True):
        rows.append({
            "bucket": str(bucket),
            "samples": len(g),
            "mean_prob": g["prob_up"].mean(),
            "actual_up_rate": g["actual_up"].mean(),
        })
    return pd.DataFrame(rows)


def run_advanced(query: str, start: str = "2017-01-01", recipe: str = "semi_macro"):
    _, meta = resolve_ticker(query)
    provider = YahooProvider()
    bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)
    dataset, feature_cols = make_dataset(bundle)
    pred, tuning = run_advanced_for_dataset(dataset, feature_cols, recipe=recipe)

    if pred.empty:
        return pred, tuning, {}, pd.DataFrame(), pd.DataFrame()

    baseline = pred[["actual_up", "base_prob"]].rename(columns={"base_prob": "prob_up"})
    summary = {
        "model_all": _period_metrics(pred, None),
        "model_12m": _period_metrics(pred, 12),
        "model_6m": _period_metrics(pred, 6),
        "base_all": _direction_metrics(baseline),
    }
    if summary["base_all"].get("brier"):
        summary["brier_skill_vs_base"] = 1 - summary["model_all"]["brier"] / summary["base_all"]["brier"]
    else:
        summary["brier_skill_vs_base"] = None

    return pred, tuning, summary, selective_table(pred), calibration_table(pred)


def main():
    p = argparse.ArgumentParser(description="Advanced v2 next-day probability research engine")
    p.add_argument("ticker", help="종목명 또는 종목코드")
    p.add_argument("--recipe", default="semi_macro", choices=["lean", "semi_macro", "semi_macro_fx", "price_reversal"])
    p.add_argument("--start", default="2017-01-01")
    args = p.parse_args()

    pred, tuning, summary, selective, calibration = run_advanced(args.ticker, args.start, args.recipe)
    if pred.empty:
        print("예측 결과가 없습니다.")
        return

    print(f"\n=== Advanced v2 | {args.ticker} | recipe={args.recipe} ===")
    for key in ["model_all", "model_12m", "model_6m", "base_all"]:
        print(key, summary[key])
    print(f"Brier Skill vs base: {summary['brier_skill_vs_base']:.4%}")

    print("\n=== 고확신 예측 성능 ===")
    with pd.option_context("display.width", 160):
        print(selective.to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print("\n=== 확률 Calibration ===")
    with pd.option_context("display.width", 160):
        print(calibration.to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print("\n=== 최근 튜닝 선택값 ===")
    with pd.option_context("display.width", 160):
        print(tuning.tail(8).to_string(index=False))


if __name__ == "__main__":
    main()
