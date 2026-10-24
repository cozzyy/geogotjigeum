from __future__ import annotations

import pandas as pd

from .backtest import run_direction_walk_forward
from .config import resolve_ticker
from .data import YahooProvider
from .features import make_dataset


def _starts_with_any(name: str, prefixes: tuple[str, ...]) -> bool:
    return any(name.startswith(p) for p in prefixes)


def feature_stages(feature_cols: list[str]) -> list[tuple[str, list[str]]]:
    price = [
        c for c in feature_cols
        if _starts_with_any(c, ("ret_", "close_vs_ma", "ma5_", "ma20_", "gap_", "close_location", "rsi"))
    ]
    volume_vol = [
        c for c in feature_cols
        if _starts_with_any(c, ("volume_", "realized_vol_", "atr"))
    ]
    calendar = [
        c for c in feature_cols
        if _starts_with_any(c, ("weekday_",)) or c in {"month_end", "quarter_end"}
    ]
    kr_market = [c for c in feature_cols if _starts_with_any(c, ("kospi_", "kosdaq_"))]
    us_market = [c for c in feature_cols if _starts_with_any(c, ("nasdaq_", "sox_", "vix_"))]
    fx = [c for c in feature_cols if _starts_with_any(c, ("usdkrw_",))]

    groups = [
        ("price", price),
        ("+volume_volatility", volume_vol),
        ("+calendar", calendar),
        ("+korean_market", kr_market),
        ("+us_market_sox_vix", us_market),
        ("+fx", fx),
    ]

    stages = []
    cumulative: list[str] = []
    for name, cols in groups:
        cumulative += [c for c in cols if c not in cumulative]
        if cumulative:
            stages.append((name, cumulative.copy()))
    return stages


def run_ablation_for_dataset(dataset: pd.DataFrame, feature_cols: list[str], min_train_days: int = 504, test_months: int = 6) -> pd.DataFrame:
    rows = []
    for stage_name, cols in feature_stages(feature_cols):
        results = run_direction_walk_forward(
            dataset,
            cols,
            min_train_days=min_train_days,
            test_months=test_months,
        )
        for model_name, result in results.items():
            all_m = result.summary["all"]
            y12 = result.summary["12m"]
            y6 = result.summary["6m"]
            rows.append({
                "stage": stage_name,
                "features": len(cols),
                "model": model_name,
                "samples": all_m.get("samples", 0),
                "accuracy": all_m.get("accuracy"),
                "balanced_accuracy": all_m.get("balanced_accuracy"),
                "brier": all_m.get("brier"),
                "roc_auc": all_m.get("roc_auc"),
                "accuracy_12m": y12.get("accuracy"),
                "brier_12m": y12.get("brier"),
                "accuracy_6m": y6.get("accuracy"),
                "brier_6m": y6.get("brier"),
            })
    return pd.DataFrame(rows)


def run_ablation(query: str, start: str = "2017-01-01") -> pd.DataFrame:
    _, meta = resolve_ticker(query)
    provider = YahooProvider()
    bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)
    dataset, feature_cols = make_dataset(bundle)
    return run_ablation_for_dataset(dataset, feature_cols)


def best_rows(report: pd.DataFrame) -> pd.DataFrame:
    if report.empty:
        return report
    return report.sort_values(["brier", "balanced_accuracy"], ascending=[True, False]).reset_index(drop=True)


def main():
    import argparse

    p = argparse.ArgumentParser(description="feature ablation 비교")
    p.add_argument("ticker", help="종목명 또는 종목코드")
    p.add_argument("--start", default="2017-01-01")
    args = p.parse_args()

    report = run_ablation(args.ticker, start=args.start)
    ranked = best_rows(report)
    display_cols = [
        "stage", "features", "model", "samples",
        "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "accuracy_12m", "accuracy_6m",
    ]
    with pd.option_context("display.max_columns", None, "display.width", 180):
        print(ranked[display_cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
