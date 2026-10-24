from __future__ import annotations

from dataclasses import dataclass
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, balanced_accuracy_score, brier_score_loss, log_loss, roc_auc_score

from .models import make_direction_models, make_quantile_model


@dataclass
class BacktestResult:
    predictions: pd.DataFrame
    summary: dict
    model_name: str


def _month_steps(index: pd.DatetimeIndex, min_train_days: int, test_months: int):
    if len(index) <= min_train_days:
        return []
    start = index[min_train_days]
    end = index.max()
    starts = pd.date_range(start=start.to_period("M").start_time, end=end, freq=f"{test_months}MS")
    folds = []
    for s in starts:
        e = s + pd.DateOffset(months=test_months)
        train_mask = index < s
        test_mask = (index >= s) & (index < e)
        if train_mask.sum() >= min_train_days and test_mask.sum() > 0:
            folds.append((train_mask, test_mask))
    return folds


def _direction_metrics(df: pd.DataFrame) -> dict:
    if df.empty:
        return {}
    y = df["actual_up"].astype(int)
    p = df["prob_up"].clip(1e-6, 1 - 1e-6)
    pred = (p >= 0.5).astype(int)
    out = {
        "samples": int(len(df)),
        "accuracy": float(accuracy_score(y, pred)),
        "balanced_accuracy": float(balanced_accuracy_score(y, pred)),
        "brier": float(brier_score_loss(y, p)),
        "log_loss": float(log_loss(y, np.c_[1-p, p], labels=[0,1])),
    }
    try:
        out["roc_auc"] = float(roc_auc_score(y, p))
    except ValueError:
        out["roc_auc"] = None
    return out


def _range_metrics(df: pd.DataFrame) -> dict:
    if df.empty:
        return {}
    covered = (df["actual_low_ret"] >= df["pred_low_ret"]) & (df["actual_high_ret"] <= df["pred_high_ret"])
    return {
        "range_coverage": float(covered.mean()),
        "range_avg_width": float((df["pred_high_ret"] - df["pred_low_ret"]).mean()),
        "lower_miss_rate": float((df["actual_low_ret"] < df["pred_low_ret"]).mean()),
        "upper_miss_rate": float((df["actual_high_ret"] > df["pred_high_ret"]).mean()),
    }


def _period_metrics(pred: pd.DataFrame, months: int | None):
    d = pred if months is None else pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=months)]
    return {**_direction_metrics(d), **_range_metrics(d)}


def _direction_period_metrics(pred: pd.DataFrame, months: int | None):
    d = pred if months is None else pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=months)]
    return _direction_metrics(d)


def run_direction_walk_forward(dataset: pd.DataFrame, feature_cols: list[str], min_train_days: int = 504, test_months: int = 6) -> dict[str, BacktestResult]:
    data = dataset.dropna(subset=["target_up_1d"]).copy()
    folds = _month_steps(data.index, min_train_days=min_train_days, test_months=test_months)
    if not folds:
        raise ValueError("walk-forward에 필요한 데이터가 부족합니다.")

    rows_by_model = {"logistic": [], "tree": []}
    for train_mask, test_mask in folds:
        train = data.loc[train_mask]
        test = data.loc[test_mask]
        Xtr, Xte = train[feature_cols], test[feature_cols]
        ytr = train["target_up_1d"].astype(int)

        models = make_direction_models()
        for model_name in ["logistic", "tree"]:
            clf = getattr(models, model_name)
            clf.fit(Xtr, ytr)
            p = clf.predict_proba(Xte)[:, 1]
            fold = pd.DataFrame({
                "prob_up": p,
                "actual_up": test["target_up_1d"].values,
            }, index=test.index)
            rows_by_model[model_name].append(fold)

    outputs = {}
    for model_name, rows in rows_by_model.items():
        pred = pd.concat(rows).sort_index()
        summary = {
            "all": _direction_period_metrics(pred, None),
            "36m": _direction_period_metrics(pred, 36),
            "12m": _direction_period_metrics(pred, 12),
            "6m": _direction_period_metrics(pred, 6),
            "3m": _direction_period_metrics(pred, 3),
        }
        outputs[model_name] = BacktestResult(predictions=pred, summary=summary, model_name=model_name)
    return outputs


def run_walk_forward(dataset: pd.DataFrame, feature_cols: list[str], min_train_days: int = 504, test_months: int = 6) -> dict[str, BacktestResult]:
    data = dataset.dropna(subset=["target_up_1d", "target_high_ret_5d", "target_low_ret_5d"]).copy()
    folds = _month_steps(data.index, min_train_days=min_train_days, test_months=test_months)
    if not folds:
        raise ValueError("walk-forward에 필요한 데이터가 부족합니다.")

    rows_by_model = {"logistic": [], "tree": []}
    for train_mask, test_mask in folds:
        train = data.loc[train_mask]
        test = data.loc[test_mask]
        Xtr, Xte = train[feature_cols], test[feature_cols]
        ytr = train["target_up_1d"].astype(int)

        qlow = make_quantile_model(0.10)
        qhigh = make_quantile_model(0.90)
        qlow.fit(Xtr, train["target_low_ret_5d"])
        qhigh.fit(Xtr, train["target_high_ret_5d"])
        plow = qlow.predict(Xte)
        phigh = qhigh.predict(Xte)
        low = np.minimum(plow, phigh)
        high = np.maximum(plow, phigh)

        models = make_direction_models()
        for model_name in ["logistic", "tree"]:
            clf = getattr(models, model_name)
            clf.fit(Xtr, ytr)
            p = clf.predict_proba(Xte)[:, 1]
            fold = pd.DataFrame({
                "prob_up": p,
                "actual_up": test["target_up_1d"].values,
                "pred_low_ret": low,
                "pred_high_ret": high,
                "actual_low_ret": test["target_low_ret_5d"].values,
                "actual_high_ret": test["target_high_ret_5d"].values,
            }, index=test.index)
            rows_by_model[model_name].append(fold)

    outputs = {}
    for model_name, rows in rows_by_model.items():
        pred = pd.concat(rows).sort_index()
        summary = {
            "all": _period_metrics(pred, None),
            "36m": _period_metrics(pred, 36),
            "12m": _period_metrics(pred, 12),
            "6m": _period_metrics(pred, 6),
            "3m": _period_metrics(pred, 3),
        }
        outputs[model_name] = BacktestResult(predictions=pred, summary=summary, model_name=model_name)
    return outputs
