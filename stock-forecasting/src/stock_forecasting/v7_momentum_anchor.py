from __future__ import annotations

import argparse
import time
import numpy as np
import pandas as pd
from sklearn.ensemble import ExtraTreesRegressor
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .v6_robust import (
    build_panel as build_v6_panel,
    _daily_metrics,
    _offset_metrics,
    _prediction_frame,
)


LAMBDA_GRID = [0.0, 0.10, 0.25, 0.50]
TRAIN_WINDOWS = [3, 5]


def _add_momentum_meta_features(
    panel: pd.DataFrame,
    feature_cols: list[str],
) -> tuple[pd.DataFrame, list[str]]:
    out = panel.copy()

    required = ["rank_ret_5d", "rank_ret_10d", "rank_ret_20d", "rank_ret_60d"]
    for c in required:
        if c not in out.columns:
            raise ValueError(f"V7에 필요한 feature 누락: {c}")

    centered = pd.DataFrame({
        "mom5_c": out["rank_ret_5d"] - 0.5,
        "mom10_c": out["rank_ret_10d"] - 0.5,
        "mom20_c": out["rank_ret_20d"] - 0.5,
        "mom60_c": out["rank_ret_60d"] - 0.5,
    }, index=out.index)

    meta = pd.DataFrame(index=out.index)
    meta["anchor_mom20"] = out["rank_ret_20d"]
    meta["mom20_strength"] = centered["mom20_c"].abs()
    meta["mom_multi_mean"] = (
        out["rank_ret_5d"] + out["rank_ret_10d"]
        + out["rank_ret_20d"] + out["rank_ret_60d"]
    ) / 4.0
    meta["mom_rank_dispersion"] = centered.std(axis=1)
    meta["mom_alignment"] = (
        np.sign(centered).eq(np.sign(centered["mom20_c"]), axis=0)
    ).mean(axis=1)
    meta["mom_near_vs_far"] = (
        (out["rank_ret_5d"] + out["rank_ret_10d"]) / 2.0
        - (out["rank_ret_20d"] + out["rank_ret_60d"]) / 2.0
    )

    if "vol_20d" in out.columns:
        meta["risk_adj_mom20_raw"] = out["ret_20d"] / out["vol_20d"].replace(0, np.nan)
        meta["risk_adj_mom20_rank"] = meta.groupby(out["date"])["risk_adj_mom20_raw"].rank(
            pct=True, method="average"
        )

    if "sector_rank_ret_20d" in out.columns:
        meta["sector_mom20"] = out["sector_rank_ret_20d"]
        meta["market_vs_sector_mom20"] = out["rank_ret_20d"] - out["sector_rank_ret_20d"]

    if "sector_rel_ret_20d" in out.columns:
        meta["sector_rel_mom20"] = out["sector_rel_ret_20d"]

    # Regime interactions: ML learns when the momentum anchor should be trusted.
    interaction_sources = {
        "kospi20": "kospi_ret20",
        "kospi_vol": "kospi_vol20",
        "nasdaq20": "nasdaq_ret20",
        "sox20": "sox_ret20",
        "vix20": "vix_ret20",
        "breadth20": "breadth_ret20_positive",
        "dispersion20": "dispersion_ret20",
        "stock_vol20": "vol_20d",
        "stock_skew20": "ret_skew20",
        "drawdown20": "drawdown20",
    }
    anchor_c = centered["mom20_c"]
    for short, col in interaction_sources.items():
        if col in out.columns:
            meta[f"mom20_x_{short}"] = anchor_c * out[col]

    # A simple observable crash-pressure proxy; no fitted threshold.
    if all(c in out.columns for c in ["kospi_ret20", "kospi_vol20", "vix_ret20"]):
        meta["market_stress"] = (
            (-out["kospi_ret20"]).clip(lower=0)
            * out["kospi_vol20"].clip(lower=0)
            * (1 + out["vix_ret20"].clip(lower=0))
        )
        meta["mom20_x_market_stress"] = anchor_c * meta["market_stress"]

    out = pd.concat([out, meta], axis=1).copy()
    new_cols = list(meta.columns)
    return out, list(dict.fromkeys(feature_cols + new_cols))


def build_panel(
    start: str = "2017-01-01",
    horizon: int = 5,
    max_tickers: int | None = None,
    investor_flow_dir: str | None = None,
) -> tuple[pd.DataFrame, list[str]]:
    panel, feature_cols = build_v6_panel(
        start=start,
        horizon=horizon,
        max_tickers=max_tickers,
        investor_flow_dir=investor_flow_dir,
    )
    return _add_momentum_meta_features(panel, feature_cols)


def _residual_model(name: str):
    if name == "ridge":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=30.0)),
        ])
    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesRegressor(
                n_estimators=220,
                max_depth=8,
                min_samples_leaf=28,
                max_features=0.40,
                n_jobs=-1,
                random_state=42,
            )),
        ])
    raise ValueError(name)


def _window(train: pd.DataFrame, end_date: pd.Timestamp, years: int) -> pd.DataFrame:
    return train.loc[train["date"] >= end_date - pd.DateOffset(years=years)]


def _fit_residual(
    train: pd.DataFrame,
    feature_cols: list[str],
    target_col: str,
    model_name: str,
):
    fit = train.dropna(subset=[target_col, "anchor_mom20"]).copy()
    residual = fit[target_col] - fit["anchor_mom20"]
    model = _residual_model(model_name)
    model.fit(fit[feature_cols], residual)
    return model


def _score_with_anchor(
    model,
    frame: pd.DataFrame,
    feature_cols: list[str],
    lam: float,
) -> np.ndarray:
    anchor = frame["anchor_mom20"].to_numpy(dtype=float)
    if lam == 0.0 or model is None:
        return anchor
    correction = model.predict(frame[feature_cols])
    return np.clip(anchor + lam * correction, 0.0, 1.0)


def _objective(summary: dict) -> float:
    if not summary:
        return -999.0
    return float(
        summary["offset_mean_ic"]
        + 7.0 * summary["offset_mean_neutral_spread"]
        + 0.10 * (summary["offset_positive_ic_rate"] - 0.5)
        + 0.10 * (summary["offset_positive_neutral_spread_rate"] - 0.5)
        - 0.25 * summary["offset_std_ic"]
        - 2.5 * summary["offset_std_neutral_spread"]
    )


def _evaluate_scores(
    frame: pd.DataFrame,
    score: np.ndarray,
    target_col: str,
    horizon: int,
) -> tuple[pd.DataFrame, dict]:
    pred = _prediction_frame(frame, score, target_col, horizon)
    daily = _daily_metrics(pred, horizon)
    _, summary = _offset_metrics(daily, horizon)
    return pred, summary


def _select_on_calibration(
    history: pd.DataFrame,
    calibration: pd.DataFrame,
    feature_cols: list[str],
    target_col: str,
    horizon: int,
    fast: bool,
) -> dict:
    candidates = []

    model_names = ["ridge", "extra_trees"]
    windows = [5] if fast else TRAIN_WINDOWS

    # Plain momentum is always a candidate.  The ML layer must earn its way in.
    _, base_summary = _evaluate_scores(
        calibration,
        calibration["anchor_mom20"].to_numpy(),
        target_col,
        horizon,
    )
    candidates.append({
        "model": "anchor_only",
        "train_years": 0,
        "lambda": 0.0,
        "objective": _objective(base_summary),
        **{f"cal_{k}": v for k, v in base_summary.items()},
    })

    for years in windows:
        train = _window(history, calibration["date"].min(), years)
        purge_cutoff = calibration["date"].min() - pd.offsets.BDay(horizon)
        train = train[train["date"] <= purge_cutoff]

        if train[target_col].notna().sum() < 2500:
            continue

        for model_name in model_names:
            model = _fit_residual(train, feature_cols, target_col, model_name)
            correction = model.predict(calibration[feature_cols])
            anchor = calibration["anchor_mom20"].to_numpy()

            for lam in LAMBDA_GRID[1:]:
                score = np.clip(anchor + lam * correction, 0.0, 1.0)
                _, summary = _evaluate_scores(
                    calibration, score, target_col, horizon
                )
                candidates.append({
                    "model": model_name,
                    "train_years": years,
                    "lambda": lam,
                    "objective": _objective(summary),
                    **{f"cal_{k}": v for k, v in summary.items()},
                })

    ranked = pd.DataFrame(candidates).sort_values(
        ["objective", "cal_offset_mean_ic"],
        ascending=False,
    )
    return ranked.iloc[0].to_dict()


def _outer_folds(
    dates: pd.Series,
    horizon: int,
    calibration_months: int = 12,
    test_months: int = 6,
) -> list[tuple[pd.Timestamp, pd.Timestamp, pd.Timestamp]]:
    unique = pd.DatetimeIndex(sorted(pd.unique(dates)))
    first = unique.min() + pd.DateOffset(years=4)
    starts = pd.date_range(
        first.to_period("M").start_time,
        unique.max(),
        freq=f"{test_months}MS",
    )
    rows = []
    for test_start in starts:
        test_end = test_start + pd.DateOffset(months=test_months)
        cal_start = test_start - pd.DateOffset(months=calibration_months)
        if cal_start <= unique.min():
            continue
        rows.append((cal_start, test_start, test_end))
    return rows


def run_nested_walk_forward(
    panel: pd.DataFrame,
    feature_cols: list[str],
    horizon: int = 5,
    fast: bool = False,
    test_months: int = 6,
) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    parts = []
    choices = []

    folds = _outer_folds(panel["date"], horizon, test_months=test_months)

    for fold_no, (cal_start, test_start, test_end) in enumerate(folds, 1):
        history = panel[panel["date"] < cal_start].copy()
        calibration = panel[
            (panel["date"] >= cal_start) & (panel["date"] < test_start)
        ].copy()
        test = panel[
            (panel["date"] >= test_start) & (panel["date"] < test_end)
        ].copy()

        if history.empty or calibration.empty or test.empty:
            continue

        print(
            f"fold {fold_no}: calibrate={cal_start.date()}~{(test_start-pd.Timedelta(days=1)).date()} "
            f"test={test_start.date()}~{(test_end-pd.Timedelta(days=1)).date()}",
            flush=True,
        )

        chosen = _select_on_calibration(
            history, calibration, feature_cols, target_col, horizon, fast
        )

        model_name = str(chosen["model"])
        years = int(chosen["train_years"])
        lam = float(chosen["lambda"])

        if model_name == "anchor_only":
            score = test["anchor_mom20"].to_numpy()
        else:
            final_train = panel[panel["date"] < test_start].copy()
            final_train = _window(final_train, test_start, years)
            purge_cutoff = test_start - pd.offsets.BDay(horizon)
            final_train = final_train[final_train["date"] <= purge_cutoff]
            model = _fit_residual(
                final_train, feature_cols, target_col, model_name
            )
            score = _score_with_anchor(
                model, test, feature_cols, lam
            )

        pred, fold_summary = _evaluate_scores(
            test, score, target_col, horizon
        )
        pred["outer_fold"] = fold_no
        parts.append(pred)

        choices.append({
            "fold": fold_no,
            "cal_start": cal_start,
            "test_start": test_start,
            "model": model_name,
            "train_years": years,
            "lambda": lam,
            "cal_objective": chosen["objective"],
            "test_ic": fold_summary.get("offset_mean_ic"),
            "test_neutral_spread": fold_summary.get("offset_mean_neutral_spread"),
            "test_positive_neutral": fold_summary.get(
                "offset_positive_neutral_spread_rate"
            ),
        })

        print(
            f"  선택={model_name} {years if years else '-'}y λ={lam:.2f} | "
            f"test IC={fold_summary.get('offset_mean_ic', np.nan):.4f} | "
            f"neutral spread={fold_summary.get('offset_mean_neutral_spread', np.nan):.4%}",
            flush=True,
        )

    if not parts:
        return pd.DataFrame(), pd.DataFrame(), pd.DataFrame()

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    choices_df = pd.DataFrame(choices)
    return pred, daily, choices_df


def _summary_from_daily(daily: pd.DataFrame, horizon: int) -> dict:
    _, summary = _offset_metrics(daily, horizon)
    return summary


def _plain_momentum_prediction(
    panel: pd.DataFrame,
    prediction_dates: pd.Series,
    horizon: int,
) -> pd.DataFrame:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    dates = set(pd.to_datetime(prediction_dates).unique())
    frame = panel[panel["date"].isin(dates)].copy()
    pred = _prediction_frame(
        frame,
        frame["anchor_mom20"].to_numpy(),
        target_col,
        horizon,
    )
    return pred


def main():
    p = argparse.ArgumentParser(description="V7 momentum anchor + ML residual correction")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--investor-flow-dir", default=None)
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V7 Momentum Anchor panel 생성 ===", flush=True)
    t0 = time.perf_counter()
    panel, feature_cols = build_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        investor_flow_dir=args.investor_flow_dir,
    )
    print(
        f"panel: {panel['ticker'].nunique()}종목, {panel['date'].nunique()}일, "
        f"{len(panel):,} rows, {len(feature_cols)} features "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )

    print("\n=== Nested walk-forward: anchor vs ML correction ===", flush=True)
    pred, daily, choices = run_nested_walk_forward(
        panel, feature_cols, args.horizon, args.fast
    )
    if pred.empty:
        print("검증 결과가 없습니다.")
        return

    v7_summary = _summary_from_daily(daily, args.horizon)

    baseline_pred = _plain_momentum_prediction(
        panel, pred["date"], args.horizon
    )
    baseline_daily = _daily_metrics(baseline_pred, args.horizon)
    baseline_summary = _summary_from_daily(
        baseline_daily, args.horizon
    )

    comparison = pd.DataFrame([
        {"method": "V7 momentum+ML", **v7_summary},
        {"method": "plain momentum20", **baseline_summary},
    ])

    cols = [
        "method",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread", "offset_std_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "offset_mean_spread", "offset_positive_spread_rate",
        "offset_top_beats_median",
    ]

    print("\n=== V7 전체 OOS 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 240):
        print(comparison[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print("\n=== Fold별 선택 내역 ===")
    with pd.option_context("display.max_columns", None, "display.width", 220):
        print(choices.to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    correction_rate = (choices["model"] != "anchor_only").mean()
    print(
        f"\nML correction 선택 비율: {correction_rate:.1%}. "
        "λ=0(anchor only)가 자주 선택되면 ML이 모멘텀을 안정적으로 개선하지 못한다는 뜻.",
        flush=True,
    )

    print(
        "\n주의: V6 최근 12개월 결과를 보고 V7 구조를 설계했으므로, "
        "해당 과거 구간은 더 이상 pristine final holdout이 아니다. "
        "V7 확정 이후의 실제 미래 데이터가 최종 live holdout이다.",
        flush=True,
    )


if __name__ == "__main__":
    main()
