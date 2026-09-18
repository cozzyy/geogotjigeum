from __future__ import annotations

import argparse
import numpy as np
import pandas as pd
from sklearn.ensemble import ExtraTreesClassifier, HistGradientBoostingClassifier
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, balanced_accuracy_score, brier_score_loss, roc_auc_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

from .config import SUPPORTED
from .data import YahooProvider
from .features import make_dataset


SEMICON_CODES = ["005930", "000660", "009150"]


def _chart_features(stock: pd.DataFrame, window: int) -> pd.DataFrame:
    s = stock.copy()
    prev = s["close"].shift(1)
    daily = pd.DataFrame(index=s.index)
    daily["ret"] = np.log(s["close"] / prev)
    daily["body"] = (s["close"] - s["open"]) / prev
    daily["range"] = (s["high"] - s["low"]) / prev
    daily["upper"] = (s["high"] - np.maximum(s["open"], s["close"])) / prev
    daily["lower"] = (np.minimum(s["open"], s["close"]) - s["low"]) / prev
    lv = np.log1p(s["volume"])
    daily["volume_z"] = (lv - lv.rolling(20).mean()) / lv.rolling(20).std()

    out = pd.DataFrame(index=s.index)
    for lag in range(window):
        shifted = daily.shift(lag)
        for c in daily.columns:
            out[f"w{window}_{c}_lag{lag}"] = shifted[c]
    return out


def _add_targets(dataset: pd.DataFrame, stock: pd.DataFrame, kospi: pd.DataFrame) -> pd.DataFrame:
    out = dataset.copy()
    close = stock["close"].reindex(out.index)
    out["target_up_1d_v3"] = (close.shift(-1) > close).astype(float).where(close.shift(-1).notna())

    ret5 = close.shift(-5) / close - 1
    out["future_ret_5d"] = ret5
    out["target_up_5d"] = (ret5 > 0).astype(float).where(ret5.notna())

    kclose = kospi["close"].reindex(out.index).ffill()
    kret5 = kclose.shift(-5) / kclose - 1
    excess5 = ret5 - kret5
    out["future_excess_5d"] = excess5
    out["target_excess_up_5d"] = (excess5 > 0).astype(float).where(excess5.notna())
    return out


def build_frame(bundle: dict[str, pd.DataFrame]) -> tuple[pd.DataFrame, list[str]]:
    ds, base_features = make_dataset(bundle)
    c5 = _chart_features(bundle["stock"], 5)
    c20 = _chart_features(bundle["stock"], 20)
    ds = ds.join(c5, how="left").join(c20, how="left")
    ds = _add_targets(ds, bundle["stock"], bundle["kospi"])

    chart_cols = list(c5.columns) + list(c20.columns)
    macro_prefixes = (
        "kospi_", "kosdaq_", "sp500_", "nasdaq_", "sox_", "smh_", "soxx_",
        "nvda_", "micron_", "tsm_", "vix_", "tnx_", "dxy_", "usdkrw_",
        "excess_vs_", "memory_shock", "ai_chip_shock", "semi_etf_consensus",
    )
    macro = [c for c in base_features if c.startswith(macro_prefixes)]
    cols = chart_cols + macro
    cols = list(dict.fromkeys(cols))
    return ds.replace([np.inf, -np.inf], np.nan), cols


def _model(name: str):
    if name == "logistic":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", LogisticRegression(max_iter=3000, C=0.05)),
        ])
    if name == "histgb":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", HistGradientBoostingClassifier(
                max_depth=3, learning_rate=0.04, max_iter=180,
                l2_regularization=3.0, random_state=42,
            )),
        ])
    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesClassifier(
                n_estimators=350, max_depth=8, min_samples_leaf=12,
                max_features=0.45, class_weight=None,
                n_jobs=-1, random_state=42,
            )),
        ])
    raise ValueError(name)


def _metrics(y: np.ndarray, p: np.ndarray) -> dict:
    pred = (p >= 0.5).astype(int)
    out = {
        "samples": int(len(y)),
        "accuracy": float(accuracy_score(y, pred)),
        "balanced_accuracy": float(balanced_accuracy_score(y, pred)),
        "brier": float(brier_score_loss(y, p)),
    }
    try:
        out["roc_auc"] = float(roc_auc_score(y, p))
    except ValueError:
        out["roc_auc"] = np.nan
    return out


def _folds(index: pd.DatetimeIndex, min_train: int = 650, test_months: int = 3):
    first = index[min_train].to_period("M").start_time
    return [(s, s + pd.DateOffset(months=test_months))
            for s in pd.date_range(first, index.max(), freq=f"{test_months}MS")]


def _target_info(target: str):
    if target == "1d":
        return "target_up_1d_v3", 1
    if target == "5d":
        return "target_up_5d", 5
    if target == "5d_excess":
        return "target_excess_up_5d", 5
    raise ValueError(target)


def run_single(ds: pd.DataFrame, cols: list[str], target: str, model_name: str) -> pd.DataFrame:
    target_col, purge = _target_info(target)
    data = ds.dropna(subset=[target_col]).copy()
    parts = []
    for start, end in _folds(data.index):
        train = data.loc[data.index < start].copy()
        test = data.loc[(data.index >= start) & (data.index < end)].copy()
        if len(train) < 650 or test.empty:
            continue
        train = train.iloc[:-purge]
        model = _model(model_name)
        model.fit(train[cols], train[target_col].astype(int))
        p = model.predict_proba(test[cols])[:, 1]
        parts.append(pd.DataFrame({"actual": test[target_col].astype(int), "prob": p}, index=test.index))
    return pd.concat(parts).sort_index() if parts else pd.DataFrame()


def _summarize(pred: pd.DataFrame, ticker: str, target: str, model: str) -> dict:
    y = pred["actual"].to_numpy()
    p = pred["prob"].to_numpy()
    m = _metrics(y, p)
    recent12 = pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=12)]
    m12 = _metrics(recent12["actual"].to_numpy(), recent12["prob"].to_numpy()) if not recent12.empty else {}
    conf = (pred["prob"] - 0.5).abs()
    high = pred.loc[conf >= 0.075]
    mh = _metrics(high["actual"].to_numpy(), high["prob"].to_numpy()) if not high.empty else {}
    return {
        "ticker": ticker,
        "name": SUPPORTED[ticker]["name"],
        "target": target,
        "model": model,
        **m,
        "accuracy_12m": m12.get("accuracy"),
        "brier_12m": m12.get("brier"),
        "highconf_samples": len(high),
        "highconf_coverage": len(high) / len(pred) if len(pred) else 0,
        "highconf_accuracy": mh.get("accuracy"),
    }


def run_experiment(start: str = "2017-01-01") -> pd.DataFrame:
    provider = YahooProvider()
    rows = []
    for code in SEMICON_CODES:
        meta = SUPPORTED[code]
        bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)
        ds, cols = build_frame(bundle)
        for target in ["1d", "5d", "5d_excess"]:
            for model_name in ["logistic", "histgb", "extra_trees"]:
                pred = run_single(ds, cols, target, model_name)
                if not pred.empty:
                    rows.append(_summarize(pred, code, target, model_name))
    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser(description="V3 horizon/sequence research")
    p.add_argument("--start", default="2017-01-01")
    args = p.parse_args()
    report = run_experiment(args.start)
    report["score"] = (
        report["brier"].fillna(1) * 0.45
        + report["brier_12m"].fillna(1) * 0.30
        + (1 - report["balanced_accuracy"].fillna(0.5)) * 0.15
        + (1 - report["highconf_accuracy"].fillna(0.5)) * 0.10
    )
    report = report.sort_values(["ticker", "score"])
    cols = [
        "ticker", "name", "target", "model", "samples",
        "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "accuracy_12m", "brier_12m",
        "highconf_samples", "highconf_coverage", "highconf_accuracy", "score",
    ]
    with pd.option_context("display.max_columns", None, "display.width", 240):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
