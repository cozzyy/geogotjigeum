from __future__ import annotations

import pandas as pd

from .config import resolve_ticker
from .data import YahooProvider
from .features import make_dataset
from .models import make_direction_models
from .backtest import _month_steps, _direction_metrics


def _pick(cols: list[str], prefixes: tuple[str, ...], exact: set[str] | None = None) -> list[str]:
    exact = exact or set()
    return [c for c in cols if c in exact or any(c.startswith(p) for p in prefixes)]


def feature_recipes(feature_cols: list[str]) -> dict[str, list[str]]:
    price = _pick(feature_cols, ("ret_", "close_vs_ma", "ma5_", "ma20_", "gap_", "close_location", "rsi"))
    vol = _pick(feature_cols, ("volume_", "realized_vol_", "atr"))
    cal = _pick(feature_cols, ("weekday_",), {"month_end", "quarter_end"})
    kr = _pick(feature_cols, ("kospi_", "kosdaq_"))
    us = _pick(feature_cols, ("nasdaq_", "sox_", "vix_"))
    fx = _pick(feature_cols, ("usdkrw_",))

    def uniq(*groups):
        out = []
        for group in groups:
            out.extend([c for c in group if c not in out])
        return out

    return {
        "price": uniq(price),
        "price+vol": uniq(price, vol),
        "price+kr": uniq(price, kr),
        "price+us": uniq(price, us),
        "price+kr+us": uniq(price, kr, us),
        "price+vol+kr+us": uniq(price, vol, kr, us),
        "price+vol+cal+kr+us": uniq(price, vol, cal, kr, us),
        "all_no_fx": uniq(price, vol, cal, kr, us),
        "all_with_fx": uniq(price, vol, cal, kr, us, fx),
    }


def run_logistic_window_backtest(
    dataset: pd.DataFrame,
    feature_cols: list[str],
    rolling_years: int | None,
    min_train_days: int = 504,
    test_months: int = 3,
) -> pd.DataFrame:
    data = dataset.dropna(subset=["target_up_1d"]).copy()
    folds = _month_steps(data.index, min_train_days=min_train_days, test_months=test_months)
    rows = []

    for train_mask, test_mask in folds:
        train = data.loc[train_mask]
        test = data.loc[test_mask]
        if rolling_years is not None:
            cutoff = test.index.min() - pd.DateOffset(years=rolling_years)
            train = train.loc[train.index >= cutoff]
        if len(train) < min_train_days:
            continue

        model = make_direction_models().logistic
        model.fit(train[feature_cols], train["target_up_1d"].astype(int))
        p = model.predict_proba(test[feature_cols])[:, 1]
        rows.append(pd.DataFrame({
            "prob_up": p,
            "actual_up": test["target_up_1d"].values,
        }, index=test.index))

    if not rows:
        return pd.DataFrame()
    return pd.concat(rows).sort_index()


def _slice_metrics(pred: pd.DataFrame, months: int | None) -> dict:
    if pred.empty:
        return {}
    d = pred if months is None else pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=months)]
    return _direction_metrics(d)


def run_adaptive_for_dataset(dataset: pd.DataFrame, feature_cols: list[str]) -> pd.DataFrame:
    rows = []
    for recipe_name, cols in feature_recipes(feature_cols).items():
        for years in [2, 3, 5, None]:
            pred = run_logistic_window_backtest(dataset, cols, rolling_years=years)
            if pred.empty:
                continue
            all_m = _slice_metrics(pred, None)
            m12 = _slice_metrics(pred, 12)
            m6 = _slice_metrics(pred, 6)
            rows.append({
                "recipe": recipe_name,
                "train_window": "expanding" if years is None else f"{years}y",
                "features": len(cols),
                "samples": all_m.get("samples", 0),
                "accuracy": all_m.get("accuracy"),
                "balanced_accuracy": all_m.get("balanced_accuracy"),
                "brier": all_m.get("brier"),
                "roc_auc": all_m.get("roc_auc"),
                "accuracy_12m": m12.get("accuracy"),
                "brier_12m": m12.get("brier"),
                "accuracy_6m": m6.get("accuracy"),
                "brier_6m": m6.get("brier"),
            })
    return pd.DataFrame(rows)


def run_adaptive(query: str, start: str = "2017-01-01") -> pd.DataFrame:
    _, meta = resolve_ticker(query)
    provider = YahooProvider()
    bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)
    dataset, feature_cols = make_dataset(bundle)
    return run_adaptive_for_dataset(dataset, feature_cols)


def rank_adaptive(report: pd.DataFrame) -> pd.DataFrame:
    if report.empty:
        return report
    r = report.copy()
    # 최근 적합성과 확률 품질을 함께 보되, 특정 6개월 accuracy 하나에 과적합하지 않도록 완만한 합성 점수 사용.
    r["score"] = (
        r["brier_12m"].fillna(1.0) * 0.45
        + r["brier"].fillna(1.0) * 0.35
        + (1 - r["balanced_accuracy"].fillna(0.5)) * 0.20
    )
    return r.sort_values(["score", "brier_12m", "brier"], ascending=True).reset_index(drop=True)


def main():
    import argparse

    p = argparse.ArgumentParser(description="최근시장 적응형 Logistic 실험")
    p.add_argument("ticker", help="종목명 또는 종목코드")
    p.add_argument("--start", default="2017-01-01")
    args = p.parse_args()

    report = rank_adaptive(run_adaptive(args.ticker, start=args.start))
    cols = [
        "recipe", "train_window", "features", "samples",
        "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "accuracy_12m", "brier_12m", "accuracy_6m", "brier_6m", "score",
    ]
    with pd.option_context("display.max_columns", None, "display.width", 220):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
