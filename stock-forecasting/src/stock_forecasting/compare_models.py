from __future__ import annotations

import argparse
import numpy as np
import pandas as pd

from .adaptive import feature_recipes
from .backtest import _direction_metrics
from .config import SUPPORTED
from .data import YahooProvider
from .features import make_dataset
from .models import make_direction_models


SEMICON_CODES = ["005930", "000660", "009150"]


def _load_semicon_datasets(start: str = "2017-01-01"):
    provider = YahooProvider()
    datasets = {}
    feature_lists = {}

    for code in SEMICON_CODES:
        meta = SUPPORTED[code]
        bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)
        dataset, feature_cols = make_dataset(bundle)
        dataset = dataset.dropna(subset=["target_up_1d"]).copy()
        datasets[code] = dataset
        feature_lists[code] = feature_cols

    common_features = sorted(set.intersection(*(set(v) for v in feature_lists.values())))
    return datasets, common_features


def _fold_starts(index: pd.DatetimeIndex, min_train_days: int = 504, test_months: int = 3):
    if len(index) <= min_train_days:
        return []
    first = index[min_train_days].to_period("M").start_time
    last = index.max()
    starts = pd.date_range(start=first, end=last, freq=f"{test_months}MS")
    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def _smooth_prob(y: pd.Series) -> float:
    y = y.dropna().astype(int)
    return float((y.sum() + 1.0) / (len(y) + 2.0))


def _baseline_predictions(train: pd.DataFrame, test: pd.DataFrame) -> dict[str, np.ndarray]:
    base = _smooth_prob(train["target_up_1d"])
    base_pred = np.full(len(test), base, dtype=float)

    train_today_up = (train["ret_1d"] > 0).astype(int)
    test_today_up = (test["ret_1d"] > 0).astype(int)

    up_mask = train_today_up == 1
    down_mask = train_today_up == 0

    p_after_up = _smooth_prob(train.loc[up_mask, "target_up_1d"]) if up_mask.any() else base
    p_after_down = _smooth_prob(train.loc[down_mask, "target_up_1d"]) if down_mask.any() else base

    momentum_pred = np.where(test_today_up.values == 1, p_after_up, p_after_down).astype(float)
    return {"base_rate": base_pred, "momentum_baseline": momentum_pred}


def _add_stock_dummies(frame: pd.DataFrame, code: str) -> pd.DataFrame:
    out = frame.copy()
    for c in SEMICON_CODES:
        out[f"stock_{c}"] = 1 if c == code else 0
    return out


def _collect_metrics(pred: pd.DataFrame, target_code: str, model_name: str, recipe: str) -> dict:
    all_m = _direction_metrics(pred)

    def recent(months: int):
        d = pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=months)]
        return _direction_metrics(d) if not d.empty else {}

    m12 = recent(12)
    m6 = recent(6)

    return {
        "ticker": target_code,
        "name": SUPPORTED[target_code]["name"],
        "model": model_name,
        "recipe": recipe,
        "samples": all_m.get("samples", 0),
        "accuracy": all_m.get("accuracy"),
        "balanced_accuracy": all_m.get("balanced_accuracy"),
        "brier": all_m.get("brier"),
        "roc_auc": all_m.get("roc_auc"),
        "accuracy_12m": m12.get("accuracy"),
        "brier_12m": m12.get("brier"),
        "accuracy_6m": m6.get("accuracy"),
        "brier_6m": m6.get("brier"),
    }


def run_common_vs_individual(
    recipe: str = "price+kr+us",
    start: str = "2017-01-01",
    min_train_days: int = 504,
    test_months: int = 3,
) -> pd.DataFrame:
    datasets, common_features = _load_semicon_datasets(start=start)
    recipes = feature_recipes(common_features)
    if recipe not in recipes:
        raise ValueError(f"지원하지 않는 recipe: {recipe}. 선택 가능: {sorted(recipes)}")

    feature_cols = recipes[recipe]
    dummy_cols = [f"stock_{c}" for c in SEMICON_CODES]
    predictions = {
        code: {
            "base_rate": [],
            "momentum_baseline": [],
            "individual_logistic": [],
            "common_logistic": [],
        }
        for code in SEMICON_CODES
    }

    for target_code in SEMICON_CODES:
        target = datasets[target_code]
        for start_dt, end_dt in _fold_starts(target.index, min_train_days=min_train_days, test_months=test_months):
            target_train = target.loc[target.index < start_dt]
            target_test = target.loc[(target.index >= start_dt) & (target.index < end_dt)]
            if len(target_train) < min_train_days or target_test.empty:
                continue

            baseline = _baseline_predictions(target_train, target_test)
            for model_name, probs in baseline.items():
                predictions[target_code][model_name].append(
                    pd.DataFrame(
                        {"prob_up": probs, "actual_up": target_test["target_up_1d"].values},
                        index=target_test.index,
                    )
                )

            individual = make_direction_models().logistic
            individual.fit(target_train[feature_cols], target_train["target_up_1d"].astype(int))
            p_ind = individual.predict_proba(target_test[feature_cols])[:, 1]
            predictions[target_code]["individual_logistic"].append(
                pd.DataFrame(
                    {"prob_up": p_ind, "actual_up": target_test["target_up_1d"].values},
                    index=target_test.index,
                )
            )

            pooled_train_parts = []
            for code in SEMICON_CODES:
                d = datasets[code]
                part = d.loc[d.index < start_dt]
                if part.empty:
                    continue
                pooled_train_parts.append(_add_stock_dummies(part, code))

            if not pooled_train_parts:
                continue

            pooled_train = pd.concat(pooled_train_parts, axis=0).sort_index()
            pooled_test = _add_stock_dummies(target_test, target_code)

            common = make_direction_models().logistic
            common.fit(
                pooled_train[feature_cols + dummy_cols],
                pooled_train["target_up_1d"].astype(int),
            )
            p_common = common.predict_proba(pooled_test[feature_cols + dummy_cols])[:, 1]
            predictions[target_code]["common_logistic"].append(
                pd.DataFrame(
                    {"prob_up": p_common, "actual_up": target_test["target_up_1d"].values},
                    index=target_test.index,
                )
            )

    rows = []
    for code in SEMICON_CODES:
        for model_name, parts in predictions[code].items():
            if not parts:
                continue
            pred = pd.concat(parts).sort_index()
            rows.append(_collect_metrics(pred, code, model_name, recipe))

    report = pd.DataFrame(rows)
    if report.empty:
        return report

    base_brier = (
        report.loc[report["model"] == "base_rate", ["ticker", "brier"]]
        .rename(columns={"brier": "baseline_brier"})
    )
    report = report.merge(base_brier, on="ticker", how="left")
    report["brier_improvement_vs_base"] = (
        (report["baseline_brier"] - report["brier"]) / report["baseline_brier"]
    )
    return report


def summary_table(report: pd.DataFrame) -> pd.DataFrame:
    if report.empty:
        return report
    order = {
        "base_rate": 0,
        "momentum_baseline": 1,
        "individual_logistic": 2,
        "common_logistic": 3,
    }
    out = report.copy()
    out["model_order"] = out["model"].map(order)
    return out.sort_values(["ticker", "model_order"]).drop(columns=["model_order"])


def winner_table(report: pd.DataFrame) -> pd.DataFrame:
    if report.empty:
        return report
    candidates = report[report["model"].isin(["individual_logistic", "common_logistic"])].copy()
    candidates["score"] = (
        candidates["brier_12m"].fillna(1.0) * 0.45
        + candidates["brier"].fillna(1.0) * 0.35
        + (1 - candidates["balanced_accuracy"].fillna(0.5)) * 0.20
    )
    idx = candidates.groupby("ticker")["score"].idxmin()
    return candidates.loc[idx].sort_values("ticker").reset_index(drop=True)


def main():
    p = argparse.ArgumentParser(description="반도체 3종목 공통 모델 vs 종목별 모델 비교")
    p.add_argument("--recipe", default="price+kr+us")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--test-months", type=int, default=3)
    args = p.parse_args()

    report = summary_table(
        run_common_vs_individual(
            recipe=args.recipe,
            start=args.start,
            test_months=args.test_months,
        )
    )
    cols = [
        "ticker", "name", "model", "samples",
        "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "accuracy_12m", "brier_12m",
        "accuracy_6m", "brier_6m",
        "brier_improvement_vs_base",
    ]
    print(f"\n=== Common vs Individual | recipe={args.recipe} ===")
    with pd.option_context("display.max_columns", None, "display.width", 220):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    winners = winner_table(report)
    if not winners.empty:
        print("\n=== 현재 종목별 우세 후보 ===")
        for _, r in winners.iterrows():
            print(
                f"{r['name']} ({r['ticker']}): {r['model']} | "
                f"accuracy={r['accuracy']:.3f}, brier={r['brier']:.4f}, "
                f"12m_acc={r['accuracy_12m']:.3f}, 6m_acc={r['accuracy_6m']:.3f}"
            )


if __name__ == "__main__":
    main()
