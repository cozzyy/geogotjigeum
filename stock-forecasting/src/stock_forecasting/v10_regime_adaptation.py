from __future__ import annotations

import argparse
import time
from dataclasses import dataclass

import numpy as np
import pandas as pd
from sklearn.ensemble import ExtraTreesRegressor
from sklearn.impute import SimpleImputer

from .krx_data import (
    krx_credentials_present,
    require_krx_credentials,
    diagnose_krx_login,
)
from .v8_krx_variables import build_panel as build_v8_panel
from .v9_variable_audit import split_krx_groups
from .v6_robust import _daily_metrics, _offset_metrics, _prediction_frame


@dataclass(frozen=True)
class AdaptConfig:
    name: str
    train_years: int
    half_life_years: float | None = None


CONFIGS = [
    AdaptConfig("rolling_2y", 2, None),
    AdaptConfig("rolling_3y", 3, None),
    AdaptConfig("rolling_5y", 5, None),
    AdaptConfig("rolling_5y_hl1y", 5, 1.0),
    AdaptConfig("rolling_5y_hl2y", 5, 2.0),
]


def _safe_valuation_features(split: dict[str, list[str]]) -> list[str]:
    allowed_tokens = (
        "earnings_yield",
        "per_clean",
        "book_to_market",
        "pbr_clean",
        "dividend_yield",
    )
    return [
        c for c in split["valuation"]
        if any(
            c == token or c.endswith("_" + token) or c.endswith(token)
            for token in allowed_tokens
        )
    ]


def v10_features(groups: dict[str, list[str]]) -> tuple[list[str], dict[str, int]]:
    split = split_krx_groups(groups)
    valuation = _safe_valuation_features(split)
    cols = list(dict.fromkeys(
        split["price"] + split["size_liquidity"] + valuation
    ))
    counts = {
        "price": len(split["price"]),
        "size_liquidity": len(split["size_liquidity"]),
        "valuation_safe": len(valuation),
        "total": len(cols),
    }
    return cols, counts


def _sample_weights(
    dates: pd.Series,
    train_end: pd.Timestamp,
    half_life_years: float | None,
) -> np.ndarray | None:
    if half_life_years is None:
        return None
    age_days = (
        pd.Timestamp(train_end).normalize()
        - pd.to_datetime(dates).dt.normalize()
    ).dt.days.clip(lower=0).to_numpy(dtype=float)
    half_life_days = 365.25 * half_life_years
    weights = np.power(0.5, age_days / half_life_days)
    return np.clip(weights, 0.02, 1.0)


def _fit_predict(
    train: pd.DataFrame,
    test: pd.DataFrame,
    features: list[str],
    target_col: str,
    cfg: AdaptConfig,
    fast: bool,
) -> np.ndarray:
    fit = train.dropna(subset=[target_col]).copy()
    imputer = SimpleImputer(strategy="median")
    x_train = imputer.fit_transform(fit[features])
    x_test = imputer.transform(test[features])

    model = ExtraTreesRegressor(
        n_estimators=120 if fast else 260,
        max_depth=10,
        min_samples_leaf=20,
        max_features=0.45,
        n_jobs=-1,
        random_state=42,
    )
    weights = _sample_weights(
        fit["date"],
        fit["date"].max(),
        cfg.half_life_years,
    )
    model.fit(x_train, fit[target_col], sample_weight=weights)
    return model.predict(x_test)


def _folds(
    panel: pd.DataFrame,
    test_months: int,
    minimum_history_years: int = 2,
) -> list[tuple[pd.Timestamp, pd.Timestamp]]:
    dates = pd.DatetimeIndex(sorted(pd.unique(panel["date"])))
    first = (
        dates.min() + pd.DateOffset(years=minimum_history_years)
    ).to_period("M").start_time
    starts = pd.date_range(first, dates.max(), freq=f"{test_months}MS")
    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def walk_forward_config(
    panel: pd.DataFrame,
    features: list[str],
    cfg: AdaptConfig,
    horizon: int,
    test_months: int,
    fast: bool,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    parts = []

    for fold_no, (start, end) in enumerate(_folds(panel, test_months), 1):
        test = panel[(panel["date"] >= start) & (panel["date"] < end)].copy()
        if test.empty:
            continue

        train = panel[
            (panel["date"] < start)
            & (panel["date"] >= start - pd.DateOffset(years=cfg.train_years))
        ].copy()
        purge_cutoff = start - pd.offsets.BDay(horizon)
        train = train[train["date"] <= purge_cutoff]

        if train[target_col].notna().sum() < 1800:
            continue

        score = _fit_predict(
            train, test, features, target_col, cfg, fast
        )
        pred = _prediction_frame(test, score, target_col, horizon)
        pred["config"] = cfg.name
        pred["fold"] = fold_no
        parts.append(pred)

    if not parts:
        return pd.DataFrame(), pd.DataFrame()

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    return pred, daily


def _summary(daily: pd.DataFrame, horizon: int) -> dict:
    _, s = _offset_metrics(daily, horizon)
    if not s:
        return {}
    out = dict(s)
    out["oos_days"] = len(daily)
    return out


def _yearly(daily: pd.DataFrame) -> pd.DataFrame:
    if daily.empty:
        return pd.DataFrame()
    d = daily.copy()
    d["year"] = pd.to_datetime(d["date"]).dt.year
    rows = []
    for year, g in d.groupby("year"):
        rows.append({
            "year": int(year),
            "days": len(g),
            "mean_ic": g["rank_ic"].mean(),
            "positive_ic_rate": (g["rank_ic"] > 0).mean(),
            "mean_neutral_spread": g["neutral_spread"].mean(),
            "positive_neutral_spread_rate": (g["neutral_spread"] > 0).mean(),
        })
    return pd.DataFrame(rows)


def _selection_objective(daily: pd.DataFrame, horizon: int) -> float:
    _, s = _offset_metrics(daily, horizon)
    if not s:
        return -999.0
    return float(
        s["offset_mean_ic"]
        + 7.0 * s["offset_mean_neutral_spread"]
        + 0.10 * (s["offset_positive_ic_rate"] - 0.5)
        + 0.10 * (s["offset_positive_neutral_spread_rate"] - 0.5)
        - 0.25 * s["offset_std_ic"]
        - 2.0 * s["offset_std_neutral_spread"]
    )


def dynamic_select(
    predictions: dict[str, pd.DataFrame],
    horizon: int,
    calibration_months: int = 12,
    test_months: int = 6,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    usable = [p for p in predictions.values() if not p.empty]
    if not usable:
        return pd.DataFrame(), pd.DataFrame()

    common_dates = sorted(set.intersection(*[
        set(pd.to_datetime(p["date"]).unique()) for p in usable
    ]))
    if not common_dates:
        return pd.DataFrame(), pd.DataFrame()

    min_date = pd.Timestamp(min(common_dates))
    max_date = pd.Timestamp(max(common_dates))
    first_test = (
        min_date + pd.DateOffset(months=calibration_months)
    ).to_period("M").start_time
    starts = pd.date_range(first_test, max_date, freq=f"{test_months}MS")

    selected_parts = []
    choices = []

    for test_start in starts:
        test_end = test_start + pd.DateOffset(months=test_months)
        cal_start = test_start - pd.DateOffset(months=calibration_months)

        scores = []
        for name, pred in predictions.items():
            cal = pred[
                (pred["date"] >= cal_start)
                & (pred["date"] < test_start)
            ].copy()
            if cal.empty:
                continue
            cal_daily = _daily_metrics(cal, horizon)
            scores.append({
                "config": name,
                "objective": _selection_objective(cal_daily, horizon),
                "cal_days": len(cal_daily),
            })

        if not scores:
            continue

        ranked = pd.DataFrame(scores).sort_values(
            ["objective", "config"], ascending=[False, True]
        )
        chosen = str(ranked.iloc[0]["config"])
        chosen_pred = predictions[chosen]
        test_pred = chosen_pred[
            (chosen_pred["date"] >= test_start)
            & (chosen_pred["date"] < test_end)
        ].copy()
        if test_pred.empty:
            continue

        test_daily = _daily_metrics(test_pred, horizon)
        test_summary = _summary(test_daily, horizon)

        choices.append({
            "test_start": test_start,
            "test_end": test_end,
            "chosen_config": chosen,
            "cal_objective": float(ranked.iloc[0]["objective"]),
            "test_ic": test_summary.get("offset_mean_ic", np.nan),
            "test_neutral_spread": test_summary.get(
                "offset_mean_neutral_spread", np.nan
            ),
        })
        test_pred["chosen_config"] = chosen
        selected_parts.append(test_pred)

    if not selected_parts:
        return pd.DataFrame(), pd.DataFrame()

    return (
        pd.concat(selected_parts, ignore_index=True),
        pd.DataFrame(choices),
    )


def recent_summary(daily: pd.DataFrame, start_year: int = 2025) -> dict:
    if daily.empty:
        return {}
    recent = daily[pd.to_datetime(daily["date"]).dt.year >= start_year]
    if recent.empty:
        return {}
    return {
        "recent_days": len(recent),
        "recent_mean_ic": float(recent["rank_ic"].mean()),
        "recent_positive_ic_rate": float((recent["rank_ic"] > 0).mean()),
        "recent_mean_neutral_spread": float(recent["neutral_spread"].mean()),
        "recent_positive_neutral_spread_rate": float(
            (recent["neutral_spread"] > 0).mean()
        ),
    }


def main():
    p = argparse.ArgumentParser(
        description="V10 regime adaptation on price + size + valuation"
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V10 Regime Adaptation ===", flush=True)
    print(
        f"KRX credential env: {'있음' if krx_credentials_present() else '없음'}",
        flush=True,
    )
    require_krx_credentials()
    diag = diagnose_krx_login()
    if not diag.get("ok"):
        raise RuntimeError(
            "KRX login preflight 실패: "
            f"code={diag.get('error_code')} message={diag.get('error_message')}"
        )
    print("KRX 로그인 preflight 성공.", flush=True)

    t0 = time.perf_counter()
    panel, groups = build_v8_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    features, counts = v10_features(groups)
    print(
        f"panel: {panel['ticker'].nunique()}종목, "
        f"{panel['date'].nunique()}일, {len(panel):,} rows "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        "V10 features: "
        + ", ".join(f"{k}={v}" for k, v in counts.items()),
        flush=True,
    )

    test_months = 12 if args.fast else 6
    predictions: dict[str, pd.DataFrame] = {}
    rows = []

    for i, cfg in enumerate(CONFIGS, 1):
        print(
            f"[{i}/{len(CONFIGS)}] {cfg.name} "
            f"window={cfg.train_years}y "
            f"half_life={cfg.half_life_years or '-'}",
            flush=True,
        )
        t1 = time.perf_counter()
        pred, daily = walk_forward_config(
            panel, features, cfg, args.horizon, test_months, args.fast
        )
        if pred.empty:
            continue

        predictions[cfg.name] = pred
        s = _summary(daily, args.horizon)
        r = recent_summary(daily, 2025)
        y = _yearly(daily)
        rows.append({
            "method": cfg.name,
            **s,
            **r,
            "positive_ic_year_rate": (
                float((y["mean_ic"] > 0).mean()) if not y.empty else np.nan
            ),
            "positive_neutral_year_rate": (
                float((y["mean_neutral_spread"] > 0).mean())
                if not y.empty else np.nan
            ),
        })
        print(
            f"    {time.perf_counter()-t1:.1f}초 | "
            f"IC={s['offset_mean_ic']:.4f} | "
            f"neutral spread={s['offset_mean_neutral_spread']:.4%} | "
            f"recent IC={r.get('recent_mean_ic', np.nan):.4f} | "
            f"recent spread={r.get('recent_mean_neutral_spread', np.nan):.4%}",
            flush=True,
        )

    dynamic_pred, choices = dynamic_select(
        predictions,
        args.horizon,
        calibration_months=12,
        test_months=test_months,
    )
    if not dynamic_pred.empty:
        dynamic_daily = _daily_metrics(dynamic_pred, args.horizon)
        s = _summary(dynamic_daily, args.horizon)
        r = recent_summary(dynamic_daily, 2025)
        y = _yearly(dynamic_daily)
        rows.append({
            "method": "dynamic_v10",
            **s,
            **r,
            "positive_ic_year_rate": (
                float((y["mean_ic"] > 0).mean()) if not y.empty else np.nan
            ),
            "positive_neutral_year_rate": (
                float((y["mean_neutral_spread"] > 0).mean())
                if not y.empty else np.nan
            ),
        })

    report = pd.DataFrame(rows)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    cols = [
        "method", "oos_days",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "positive_ic_year_rate", "positive_neutral_year_rate",
        "recent_days", "recent_mean_ic", "recent_positive_ic_rate",
        "recent_mean_neutral_spread",
        "recent_positive_neutral_spread_rate",
    ]

    print("\n=== V10 적응 방식 비교 ===")
    with pd.option_context("display.max_columns", None, "display.width", 300):
        print(
            report[cols].to_string(
                index=False, float_format=lambda x: f"{x:.4f}"
            )
        )

    if not choices.empty:
        print("\n=== Dynamic V10 선택 이력 ===")
        with pd.option_context("display.max_rows", 100, "display.width", 220):
            print(
                choices.to_string(
                    index=False, float_format=lambda x: f"{x:.4f}"
                )
            )
        print("\n선택 빈도:")
        print(
            choices["chosen_config"]
            .value_counts(normalize=True)
            .rename("share")
            .to_string(float_format=lambda x: f"{x:.1%}")
        )

    print(
        "\n판정 핵심:\n"
        "1) 2y/3y가 5y보다 2025~2026 recent metrics를 개선하는가\n"
        "2) half-life weighting이 recent IC와 neutral spread를 동시에 개선하는가\n"
        "3) dynamic_v10이 fixed config보다 전체 OOS와 recent 구간 모두에서 나은가\n"
        "4) 개선이 한 지표만이 아니라 IC/spread/positive-rate에 같이 나타나는가",
        flush=True,
    )


if __name__ == "__main__":
    main()
