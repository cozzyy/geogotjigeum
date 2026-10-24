from __future__ import annotations

import argparse
import time
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
    """
    최근 OHLCV 모양을 lag feature로 변환.
    열을 하나씩 insert하지 않고 lag block을 만든 뒤 한 번에 concat해서
    pandas DataFrame fragmentation을 방지한다.
    """
    s = stock.copy()
    prev = s["close"].shift(1)

    lv = np.log1p(s["volume"])
    daily = pd.DataFrame(
        {
            "ret": np.log(s["close"] / prev),
            "body": (s["close"] - s["open"]) / prev,
            "range": (s["high"] - s["low"]) / prev,
            "upper": (s["high"] - np.maximum(s["open"], s["close"])) / prev,
            "lower": (np.minimum(s["open"], s["close"]) - s["low"]) / prev,
            "volume_z": (lv - lv.rolling(20).mean()) / lv.rolling(20).std(),
        },
        index=s.index,
    )

    blocks = []
    for lag in range(window):
        block = daily.shift(lag).copy()
        block.columns = [f"w{window}_{c}_lag{lag}" for c in block.columns]
        blocks.append(block)

    return pd.concat(blocks, axis=1).copy()


def _add_targets(dataset: pd.DataFrame, stock: pd.DataFrame, kospi: pd.DataFrame) -> pd.DataFrame:
    out = dataset.copy()
    close = stock["close"].reindex(out.index)

    next_close = close.shift(-1)
    out["target_up_1d_v3"] = (next_close > close).astype(float).where(next_close.notna())

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
    base, base_features = make_dataset(bundle)
    c5 = _chart_features(bundle["stock"], 5)
    c20 = _chart_features(bundle["stock"], 20)

    ds = pd.concat([base, c5, c20], axis=1).copy()
    ds = _add_targets(ds, bundle["stock"], bundle["kospi"])

    chart_cols = list(c5.columns) + list(c20.columns)
    macro_prefixes = (
        "kospi_", "kosdaq_", "sp500_", "nasdaq_", "sox_", "smh_", "soxx_",
        "nvda_", "micron_", "tsm_", "vix_", "tnx_", "dxy_", "usdkrw_",
        "excess_vs_", "memory_shock", "ai_chip_shock", "semi_etf_consensus",
    )
    macro = [c for c in base_features if c.startswith(macro_prefixes)]
    cols = list(dict.fromkeys(chart_cols + macro))

    ds = ds.replace([np.inf, -np.inf], np.nan).copy()
    return ds, cols


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
                max_depth=3,
                learning_rate=0.04,
                max_iter=120,
                l2_regularization=3.0,
                random_state=42,
            )),
        ])

    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesClassifier(
                n_estimators=200,
                max_depth=8,
                min_samples_leaf=12,
                max_features=0.45,
                class_weight=None,
                n_jobs=-1,
                random_state=42,
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
    if len(index) <= min_train:
        return []
    first = index[min_train].to_period("M").start_time
    return [
        (s, s + pd.DateOffset(months=test_months))
        for s in pd.date_range(first, index.max(), freq=f"{test_months}MS")
    ]


def _target_info(target: str):
    if target == "1d":
        return "target_up_1d_v3", 1
    if target == "5d":
        return "target_up_5d", 5
    if target == "5d_excess":
        return "target_excess_up_5d", 5
    raise ValueError(target)


def run_single(
    ds: pd.DataFrame,
    cols: list[str],
    target: str,
    model_name: str,
    test_months: int = 3,
) -> pd.DataFrame:
    target_col, purge = _target_info(target)
    data = ds.dropna(subset=[target_col]).copy()
    parts = []

    for start, end in _folds(data.index, test_months=test_months):
        train = data.loc[data.index < start]
        test = data.loc[(data.index >= start) & (data.index < end)]

        if len(train) < 650 or test.empty:
            continue

        train = train.iloc[:-purge]
        if train.empty:
            continue

        model = _model(model_name)
        model.fit(train[cols], train[target_col].astype(int))
        p = model.predict_proba(test[cols])[:, 1]

        parts.append(
            pd.DataFrame(
                {
                    "actual": test[target_col].astype(int),
                    "prob": p,
                },
                index=test.index,
            )
        )

    return pd.concat(parts).sort_index() if parts else pd.DataFrame()


def _summarize(pred: pd.DataFrame, ticker: str, target: str, model: str) -> dict:
    y = pred["actual"].to_numpy()
    p = pred["prob"].to_numpy()
    m = _metrics(y, p)

    recent12 = pred.loc[pred.index >= pred.index.max() - pd.DateOffset(months=12)]
    m12 = (
        _metrics(recent12["actual"].to_numpy(), recent12["prob"].to_numpy())
        if not recent12.empty
        else {}
    )

    conf = (pred["prob"] - 0.5).abs()
    high = pred.loc[conf >= 0.075]
    mh = (
        _metrics(high["actual"].to_numpy(), high["prob"].to_numpy())
        if not high.empty
        else {}
    )

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


def run_experiment(
    start: str = "2017-01-01",
    models: list[str] | None = None,
    targets: list[str] | None = None,
    test_months: int = 3,
) -> pd.DataFrame:
    provider = YahooProvider()
    rows = []

    models = models or ["logistic", "histgb", "extra_trees"]
    targets = targets or ["1d", "5d", "5d_excess"]

    total_jobs = len(SEMICON_CODES) * len(targets) * len(models)
    job = 0
    t0 = time.perf_counter()

    for code in SEMICON_CODES:
        meta = SUPPORTED[code]
        print(f"\n[{code} {meta['name']}] 데이터 준비 중...", flush=True)

        bundle = provider.load_bundle(meta["symbol"], start=start, use_cache=True)

        frame_started = time.perf_counter()
        ds, cols = build_frame(bundle)
        print(
            f"[{code}] feature 생성 완료: {len(cols)}개 "
            f"({time.perf_counter() - frame_started:.1f}초)",
            flush=True,
        )

        for target in targets:
            for model_name in models:
                job += 1
                started = time.perf_counter()
                print(
                    f"[{job}/{total_jobs}] {meta['name']} | target={target} | model={model_name} ...",
                    flush=True,
                )

                pred = run_single(
                    ds,
                    cols,
                    target,
                    model_name,
                    test_months=test_months,
                )

                if not pred.empty:
                    row = _summarize(pred, code, target, model_name)
                    rows.append(row)
                    print(
                        f"    완료 {time.perf_counter() - started:.1f}초 | "
                        f"acc={row['accuracy']:.3f} | brier={row['brier']:.4f}",
                        flush=True,
                    )
                else:
                    print("    결과 없음", flush=True)

    print(f"\n전체 실험 완료: {time.perf_counter() - t0:.1f}초", flush=True)
    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser(description="V3 horizon/sequence research")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument(
        "--fast",
        action="store_true",
        help="빠른 1차 확인: Logistic + ExtraTrees, 1d/5d만 비교",
    )
    p.add_argument(
        "--test-months",
        type=int,
        default=3,
        help="walk-forward test block months (default: 3)",
    )
    args = p.parse_args()

    if args.fast:
        models = ["logistic", "extra_trees"]
        targets = ["1d", "5d"]
    else:
        models = ["logistic", "histgb", "extra_trees"]
        targets = ["1d", "5d", "5d_excess"]

    report = run_experiment(
        start=args.start,
        models=models,
        targets=targets,
        test_months=args.test_months,
    )

    if report.empty:
        print("실험 결과가 없습니다.")
        return

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

    print("\n=== V3 최종 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 240):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))


if __name__ == "__main__":
    main()
