from __future__ import annotations

import argparse
import time

import numpy as np
import pandas as pd

from .dart_data import (
    DARTProvider,
    dart_api_key_present,
    diagnose_dart_api,
    require_dart_api_key,
)
from .krx_data import (
    diagnose_krx_login,
    krx_credentials_present,
    require_krx_credentials,
)
from .v6_robust import _daily_metrics
from .v8_krx_variables import build_panel as build_v8_panel
from .v10_regime_adaptation import (
    AdaptConfig,
    _summary,
    _yearly,
    recent_summary,
    v10_features,
    walk_forward_config,
)
from .v11_dart_events import (
    EVENT_CATEGORIES,
    add_dart_event_features,
    dart_coverage,
)


ATTRIBUTION_CATEGORIES = list(EVENT_CATEGORIES)
CORE_NO_OWNERSHIP = [
    c for c in EVENT_CATEGORIES
    if c != "ownership"
]


def category_features(
    dart_all: list[str],
    category: str,
) -> list[str]:
    token = f"dart_{category}_"
    return [c for c in dart_all if token in c]


def categories_features(
    dart_all: list[str],
    categories: list[str],
) -> list[str]:
    cols: list[str] = []
    for category in categories:
        cols.extend(category_features(dart_all, category))
    return list(dict.fromkeys(cols))


def _merge_prediction_scores(
    base_pred: pd.DataFrame,
    dart_pred: pd.DataFrame,
) -> pd.DataFrame:
    keep = [
        "date", "ticker", "name", "broad_sector",
        "future_ret_5d", "future_sector_neutral_5d",
        "target_sector_neutral_rank_5d", "target_rank",
    ]
    # Horizon-specific names are not hard-coded below; preserve every
    # non-score column from the base prediction.
    keep = [c for c in base_pred.columns if c != "score"]
    left = base_pred[keep + ["score"]].copy()
    left = left.rename(columns={"score": "base_score"})

    right = dart_pred[["date", "ticker", "score"]].copy()
    right = right.rename(columns={"score": "dart_score"})

    out = left.merge(
        right,
        on=["date", "ticker"],
        how="inner",
        validate="one_to_one",
    )
    out["base_rank_score"] = out.groupby("date")["base_score"].rank(
        pct=True, method="average"
    )
    out["dart_rank_score"] = out.groupby("date")["dart_score"].rank(
        pct=True, method="average"
    )
    return out


def fusion_prediction(
    base_pred: pd.DataFrame,
    dart_pred: pd.DataFrame,
    dart_weight: float,
    gate: pd.DataFrame | None = None,
) -> pd.DataFrame:
    if not 0.0 <= dart_weight <= 1.0:
        raise ValueError("dart_weight must be in [0, 1]")

    merged = _merge_prediction_scores(base_pred, dart_pred)

    if gate is None:
        w = np.full(len(merged), float(dart_weight))
    else:
        g = gate[["date", "ticker", "event_gate"]].copy()
        merged = merged.merge(
            g,
            on=["date", "ticker"],
            how="left",
            validate="many_to_one",
        )
        active = merged["event_gate"].fillna(False).astype(bool).to_numpy()
        w = np.where(active, float(dart_weight), 0.0)

    merged["score"] = (
        (1.0 - w) * merged["base_rank_score"].to_numpy()
        + w * merged["dart_rank_score"].to_numpy()
    )
    return merged


def event_gate(
    panel: pd.DataFrame,
    categories: list[str],
    window_days: int,
) -> pd.DataFrame:
    if window_days < 1:
        raise ValueError("window_days must be >= 1")

    masks = []
    for category in categories:
        col = f"dart_{category}_days_since"
        if col in panel.columns:
            masks.append(panel[col].between(0, window_days - 1))

    if masks:
        mask = masks[0].copy()
        for m in masks[1:]:
            mask = mask | m
    else:
        mask = pd.Series(False, index=panel.index)

    return pd.DataFrame({
        "date": panel["date"],
        "ticker": panel["ticker"],
        "event_gate": mask.astype(bool),
    })


def _event_window_metrics(
    pred: pd.DataFrame,
    panel: pd.DataFrame,
    category: str,
    window_days: int,
    horizon: int,
    recent_start_year: int | None = None,
) -> dict:
    col = f"dart_{category}_days_since"
    if col not in panel.columns:
        return {}

    exposure = panel[["date", "ticker", col]].copy()
    x = pred.merge(
        exposure,
        on=["date", "ticker"],
        how="left",
        validate="one_to_one",
    )
    x = x[x[col].between(0, window_days - 1)].copy()

    if recent_start_year is not None:
        x = x[pd.to_datetime(x["date"]).dt.year >= recent_start_year].copy()

    future_col = f"future_sector_neutral_{horizon}d"
    needed = ["score", "target_rank", future_col]
    x = x.dropna(subset=needed)
    if x.empty:
        return {
            "observations": 0,
            "days": 0,
            "tickers": 0,
            "pooled_rank_ic": np.nan,
            "top_bottom_neutral_spread": np.nan,
            "top_positive_rate": np.nan,
        }

    # Convert model scores to same-day cross-sectional ranks before
    # conditioning on event exposure. This keeps score scale comparable
    # across folds and dates.
    x["score_rank"] = x.groupby("date")["score"].rank(
        pct=True, method="average"
    )

    pooled_ic = x["score_rank"].corr(x["target_rank"], method="spearman")
    top = x[x["score_rank"] >= 0.70]
    bottom = x[x["score_rank"] <= 0.30]
    spread = (
        top[future_col].mean() - bottom[future_col].mean()
        if not top.empty and not bottom.empty
        else np.nan
    )
    positive = (
        float((top[future_col] > 0).mean())
        if not top.empty else np.nan
    )

    return {
        "observations": int(len(x)),
        "days": int(x["date"].nunique()),
        "tickers": int(x["ticker"].nunique()),
        "pooled_rank_ic": float(pooled_ic) if pd.notna(pooled_ic) else np.nan,
        "top_bottom_neutral_spread": float(spread)
        if pd.notna(spread) else np.nan,
        "top_positive_rate": positive,
    }


def event_window_report(
    predictions: dict[str, pd.DataFrame],
    panel: pd.DataFrame,
    horizon: int,
    categories: list[str],
    windows: tuple[int, ...] = (1, 5, 20),
) -> pd.DataFrame:
    rows = []
    for model_name, pred in predictions.items():
        for category in categories:
            for window in windows:
                for recent_only in (False, True):
                    stats = _event_window_metrics(
                        pred,
                        panel,
                        category,
                        window,
                        horizon,
                        recent_start_year=2025 if recent_only else None,
                    )
                    if not stats:
                        continue
                    rows.append({
                        "model": model_name,
                        "category": category,
                        "window_days": window,
                        "period": "2025+" if recent_only else "all",
                        **stats,
                    })
    return pd.DataFrame(rows)


def _performance_row(
    name: str,
    pred: pd.DataFrame,
    horizon: int,
) -> dict:
    daily = _daily_metrics(pred, horizon)
    summary = _summary(daily, horizon)
    recent = recent_summary(daily, 2025)
    yearly = _yearly(daily)

    return {
        "method": name,
        **summary,
        **recent,
        "positive_ic_year_rate": (
            float((yearly["mean_ic"] > 0).mean())
            if not yearly.empty else np.nan
        ),
        "positive_neutral_year_rate": (
            float((yearly["mean_neutral_spread"] > 0).mean())
            if not yearly.empty else np.nan
        ),
    }


def main():
    p = argparse.ArgumentParser(
        description=(
            "V12 DART category attribution, event windows, and late fusion"
        )
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--refresh-dart", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print(
        "=== V12 DART Category Attribution + Event Window + Late Fusion ===",
        flush=True,
    )
    print(
        f"KRX credential env: {'있음' if krx_credentials_present() else '없음'} | "
        f"DART API key env: {'있음' if dart_api_key_present() else '없음'}",
        flush=True,
    )

    require_krx_credentials()
    krx_diag = diagnose_krx_login()
    if not krx_diag.get("ok"):
        raise RuntimeError(
            "KRX login preflight 실패: "
            f"{krx_diag.get('error_code')} {krx_diag.get('error_message')}"
        )

    require_dart_api_key()
    dart_diag = diagnose_dart_api()
    if not dart_diag.get("ok"):
        raise RuntimeError(
            "OpenDART preflight 실패: " + str(dart_diag.get("message"))
        )

    t0 = time.perf_counter()
    panel, krx_groups = build_v8_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    base_features, base_counts = v10_features(krx_groups)

    provider = DARTProvider(refresh=args.refresh_dart)
    panel, dart_groups, event_stats = add_dart_event_features(
        panel, provider
    )
    dart_all = dart_groups["dart_all"]

    category_map = {
        category: category_features(dart_all, category)
        for category in ATTRIBUTION_CATEGORIES
    }
    dart_no_ownership = categories_features(
        dart_all, CORE_NO_OWNERSHIP
    )

    print(
        f"panel: {panel['ticker'].nunique()}종목, "
        f"{panel['date'].nunique()}일, {len(panel):,} rows "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        "base features: "
        + ", ".join(f"{k}={v}" for k, v in base_counts.items()),
        flush=True,
    )
    print(
        "category feature counts: "
        + ", ".join(
            f"{k}={len(v)}" for k, v in category_map.items()
        ),
        flush=True,
    )
    print(
        f"DART all={len(dart_all)}, "
        f"DART no-ownership={len(dart_no_ownership)}",
        flush=True,
    )

    print("\n=== DART event coverage ===")
    coverage = dart_coverage(event_stats)
    if not coverage.empty:
        print(coverage.to_string(index=False))

    cfg = AdaptConfig("rolling_3y", 3, None)
    test_months = 12 if args.fast else 6

    # 1) Baseline prediction once.
    print("\n=== 1. Category attribution ===")
    print("[base] base_v10", flush=True)
    base_pred, base_daily = walk_forward_config(
        panel,
        base_features,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )
    base_summary = _summary(base_daily, args.horizon)
    base_recent = recent_summary(base_daily, 2025)

    attribution_rows = [{
        "category": "base_v10",
        "features_added": 0,
        **base_summary,
        **base_recent,
        "delta_ic_vs_base": 0.0,
        "delta_neutral_spread_vs_base": 0.0,
        "delta_recent_ic_vs_base": 0.0,
        "delta_recent_spread_vs_base": 0.0,
    }]

    for i, category in enumerate(ATTRIBUTION_CATEGORIES, 1):
        extra = category_map[category]
        if not extra:
            continue

        features = list(dict.fromkeys(base_features + extra))
        print(
            f"[{i}/{len(ATTRIBUTION_CATEGORIES)}] "
            f"base_plus_{category} features={len(features)}",
            flush=True,
        )
        t1 = time.perf_counter()
        pred, daily = walk_forward_config(
            panel,
            features,
            cfg,
            args.horizon,
            test_months,
            args.fast,
        )
        summary = _summary(daily, args.horizon)
        recent = recent_summary(daily, 2025)

        attribution_rows.append({
            "category": category,
            "features_added": len(extra),
            **summary,
            **recent,
            "delta_ic_vs_base": (
                summary.get("offset_mean_ic", np.nan)
                - base_summary.get("offset_mean_ic", np.nan)
            ),
            "delta_neutral_spread_vs_base": (
                summary.get("offset_mean_neutral_spread", np.nan)
                - base_summary.get("offset_mean_neutral_spread", np.nan)
            ),
            "delta_recent_ic_vs_base": (
                recent.get("recent_mean_ic", np.nan)
                - base_recent.get("recent_mean_ic", np.nan)
            ),
            "delta_recent_spread_vs_base": (
                recent.get("recent_mean_neutral_spread", np.nan)
                - base_recent.get("recent_mean_neutral_spread", np.nan)
            ),
        })
        print(
            f"    {time.perf_counter()-t1:.1f}초 | "
            f"IC={summary.get('offset_mean_ic', np.nan):.4f} | "
            f"spread="
            f"{summary.get('offset_mean_neutral_spread', np.nan):.4%} | "
            f"recent IC={recent.get('recent_mean_ic', np.nan):.4f} | "
            f"recent spread="
            f"{recent.get('recent_mean_neutral_spread', np.nan):.4%}",
            flush=True,
        )

    attribution = pd.DataFrame(attribution_rows)
    print("\n=== Category incremental value ===")
    attr_cols = [
        "category", "features_added",
        "offset_mean_ic", "offset_mean_neutral_spread",
        "recent_mean_ic", "recent_mean_neutral_spread",
        "delta_ic_vs_base", "delta_neutral_spread_vs_base",
        "delta_recent_ic_vs_base", "delta_recent_spread_vs_base",
    ]
    with pd.option_context("display.max_columns", None, "display.width", 300):
        print(
            attribution[attr_cols].to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    # 2) Train DART-only all and ownership-excluded models once.
    print("\n=== 2. Separate DART models ===")
    print(f"[DART all] features={len(dart_all)}", flush=True)
    dart_all_pred, _ = walk_forward_config(
        panel,
        dart_all,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )
    print(
        f"[DART no ownership] features={len(dart_no_ownership)}",
        flush=True,
    )
    dart_core_pred, _ = walk_forward_config(
        panel,
        dart_no_ownership,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )

    # 3) Fixed and event-gated late fusion.
    print("\n=== 3. Late fusion ===")
    fusion_preds: dict[str, pd.DataFrame] = {
        "base_only": base_pred,
        "dart_all_only": dart_all_pred,
        "dart_no_ownership_only": dart_core_pred,
    }

    for w in (0.25, 0.50, 0.75):
        fusion_preds[f"late_all_w{int(w*100)}"] = fusion_prediction(
            base_pred, dart_all_pred, w
        )
        fusion_preds[
            f"late_no_ownership_w{int(w*100)}"
        ] = fusion_prediction(
            base_pred, dart_core_pred, w
        )

    all_gate = event_gate(
        panel, list(EVENT_CATEGORIES), window_days=20
    )
    core_gate = event_gate(
        panel, CORE_NO_OWNERSHIP, window_days=20
    )
    fusion_preds["event_gated_all_w50_20d"] = fusion_prediction(
        base_pred, dart_all_pred, 0.50, gate=all_gate
    )
    fusion_preds[
        "event_gated_no_ownership_w50_20d"
    ] = fusion_prediction(
        base_pred, dart_core_pred, 0.50, gate=core_gate
    )

    fusion_rows = [
        _performance_row(name, pred, args.horizon)
        for name, pred in fusion_preds.items()
    ]
    fusion_report = pd.DataFrame(fusion_rows)
    base_row = fusion_report[
        fusion_report["method"] == "base_only"
    ].iloc[0]
    fusion_report["delta_ic_vs_base"] = (
        fusion_report["offset_mean_ic"] - base_row["offset_mean_ic"]
    )
    fusion_report["delta_spread_vs_base"] = (
        fusion_report["offset_mean_neutral_spread"]
        - base_row["offset_mean_neutral_spread"]
    )
    fusion_report["delta_recent_ic_vs_base"] = (
        fusion_report["recent_mean_ic"] - base_row["recent_mean_ic"]
    )
    fusion_report["delta_recent_spread_vs_base"] = (
        fusion_report["recent_mean_neutral_spread"]
        - base_row["recent_mean_neutral_spread"]
    )

    fusion_cols = [
        "method",
        "offset_mean_ic",
        "offset_positive_ic_rate",
        "offset_mean_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "recent_mean_ic",
        "recent_positive_ic_rate",
        "recent_mean_neutral_spread",
        "recent_positive_neutral_spread_rate",
        "delta_ic_vs_base",
        "delta_spread_vs_base",
        "delta_recent_ic_vs_base",
        "delta_recent_spread_vs_base",
    ]
    with pd.option_context("display.max_columns", None, "display.width", 340):
        print(
            fusion_report[fusion_cols].to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    # 4) Event-window diagnostic: do the model scores work specifically
    # after the information arrives?
    print("\n=== 4. Event-window diagnostics ===")
    window_models = {
        "base_only": fusion_preds["base_only"],
        "dart_all_only": fusion_preds["dart_all_only"],
        "late_all_w50": fusion_preds["late_all_w50"],
        "event_gated_all_w50_20d":
            fusion_preds["event_gated_all_w50_20d"],
    }
    window_report = event_window_report(
        window_models,
        panel,
        args.horizon,
        categories=list(EVENT_CATEGORIES),
        windows=(1, 5, 20),
    )

    if not window_report.empty:
        recent20 = window_report[
            (window_report["period"] == "2025+")
            & (window_report["window_days"] == 20)
        ].copy()
        recent20 = recent20.sort_values(
            ["model", "top_bottom_neutral_spread"],
            ascending=[True, False],
        )
        print(
            "\n--- 2025+ / event 후 20거래일 핵심표 ---"
        )
        with pd.option_context(
            "display.max_rows", 200,
            "display.max_columns", None,
            "display.width", 300,
        ):
            print(
                recent20.to_string(
                    index=False,
                    float_format=lambda x: f"{x:.4f}",
                )
            )

        ownership_focus = window_report[
            window_report["category"].isin([
                "ownership", "earnings", "contract",
                "treasury", "dividend", "investment",
            ])
        ].copy()
        print(
            "\n--- 주요 카테고리 1/5/20일 event-window ---"
        )
        with pd.option_context(
            "display.max_rows", 500,
            "display.max_columns", None,
            "display.width", 320,
        ):
            print(
                ownership_focus.to_string(
                    index=False,
                    float_format=lambda x: f"{x:.4f}",
                )
            )

    print(
        "\n판정 순서:\n"
        "1) category attribution에서 ownership 하나가 개선을 독점하는지 확인\n"
        "2) DART no-ownership이 DART all의 최근 성능을 유지하는지 확인\n"
        "3) early-fusion이 아니라 late-fusion에서 base와 DART의 장점이 같이 남는지 확인\n"
        "4) event-gated fusion이 평상시 DART noise를 줄이는지 확인\n"
        "5) event-window에서 1d/5d/20d 중 신호가 실제 공시 직후 집중되는지 확인\n"
        "6) 2025+만 좋아도 final holdout으로 간주하지 않음; V12 동결 이후 live data가 최종 검증",
        flush=True,
    )


if __name__ == "__main__":
    main()
