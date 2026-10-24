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
    recent_summary,
    v10_features,
    walk_forward_config,
)
from .v11_dart_events import (
    EVENT_CATEGORIES,
    add_dart_event_features,
)
from .v12_dart_attribution_fusion import (
    CORE_NO_OWNERSHIP,
    categories_features,
    event_gate,
    fusion_prediction,
)


CANDIDATES = (
    "base_only",
    "event_gated_all_w50_20d",
    "event_gated_no_ownership_w50_20d",
)

FOCUS_CATEGORIES = (
    "earnings",
    "periodic",
    "contract",
    "treasury",
    "dividend",
    "ownership",
)

VALIDATION_WINDOWS = (5, 20)
COST_BPS = (5, 10, 20)


def _safe_spearman(a: pd.Series, b: pd.Series) -> float:
    x = pd.DataFrame({"a": a, "b": b}).dropna()
    if len(x) < 10:
        return np.nan
    if x["a"].nunique() < 2 or x["b"].nunique() < 2:
        return np.nan
    return float(x["a"].corr(x["b"], method="spearman"))


def _prediction_with_ranks(pred: pd.DataFrame) -> pd.DataFrame:
    out = pred.copy()
    out["score_rank"] = out.groupby("date")["score"].rank(
        pct=True, method="average"
    )
    return out


def _days_until_next_event(
    panel: pd.DataFrame,
    category: str,
) -> pd.Series:
    event_col = f"dart_{category}_1d"
    result = pd.Series(252.0, index=panel.index, dtype=float)

    if event_col not in panel.columns:
        return result

    for _, idx in panel.groupby("ticker", sort=False).groups.items():
        loc = np.asarray(list(idx), dtype=int)
        g = panel.loc[loc].sort_values("date")
        ordered_idx = g.index.to_numpy()
        event = g[event_col].fillna(0).to_numpy() > 0

        next_pos = None
        days = np.full(len(g), 252.0)
        for i in range(len(g) - 1, -1, -1):
            if event[i]:
                next_pos = i
            if next_pos is not None:
                days[i] = min(float(next_pos - i), 252.0)

        result.loc[ordered_idx] = days

    return result


def _event_masks(
    panel: pd.DataFrame,
    category: str,
    window_days: int,
) -> tuple[pd.Series, pd.Series, pd.Series]:
    since_col = f"dart_{category}_days_since"
    if since_col not in panel.columns:
        false = pd.Series(False, index=panel.index)
        return false, false, pd.Series(252.0, index=panel.index)

    days_since = panel[since_col].fillna(252.0)
    days_until = _days_until_next_event(panel, category)

    post = days_since.between(0, window_days - 1)

    # Diagnostic-only placebo. Future event timing is used only to define
    # the evaluation subset and never enters model features/training.
    # Exclude rows that are simultaneously in the post-event window of a
    # previous disclosure of the same category.
    pre = (
        days_until.between(1, window_days)
        & (days_since >= window_days)
    )

    clean_control = (
        (days_since >= window_days)
        & (days_until > window_days)
    )
    return post, pre, clean_control


def _subset_skill(
    pred_ranked: pd.DataFrame,
    keys: pd.DataFrame,
    horizon: int,
) -> dict:
    if keys.empty:
        return {
            "observations": 0,
            "days": 0,
            "tickers": 0,
            "rank_ic": np.nan,
            "top_bottom_neutral_spread": np.nan,
            "mean_abs_rank_error": np.nan,
            "top_positive_rate": np.nan,
        }

    key_cols = ["date", "ticker"]
    x = pred_ranked.merge(
        keys[key_cols].drop_duplicates(),
        on=key_cols,
        how="inner",
        validate="one_to_one",
    )
    future_col = f"future_sector_neutral_{horizon}d"
    x = x.dropna(subset=["score_rank", "target_rank", future_col])

    if x.empty:
        return {
            "observations": 0,
            "days": 0,
            "tickers": 0,
            "rank_ic": np.nan,
            "top_bottom_neutral_spread": np.nan,
            "mean_abs_rank_error": np.nan,
            "top_positive_rate": np.nan,
        }

    ic = _safe_spearman(x["score_rank"], x["target_rank"])
    top = x[x["score_rank"] >= 0.70]
    bottom = x[x["score_rank"] <= 0.30]
    spread = (
        top[future_col].mean() - bottom[future_col].mean()
        if len(top) >= 5 and len(bottom) >= 5
        else np.nan
    )

    return {
        "observations": int(len(x)),
        "days": int(x["date"].nunique()),
        "tickers": int(x["ticker"].nunique()),
        "rank_ic": ic,
        "top_bottom_neutral_spread": (
            float(spread) if pd.notna(spread) else np.nan
        ),
        "mean_abs_rank_error": float(
            (x["score_rank"] - x["target_rank"]).abs().mean()
        ),
        "top_positive_rate": (
            float((top[future_col] > 0).mean())
            if not top.empty else np.nan
        ),
    }


def placebo_report(
    predictions: dict[str, pd.DataFrame],
    panel: pd.DataFrame,
    horizon: int,
    categories: tuple[str, ...] = FOCUS_CATEGORIES,
    windows: tuple[int, ...] = VALIDATION_WINDOWS,
) -> pd.DataFrame:
    rows = []
    ranked = {
        name: _prediction_with_ranks(pred)
        for name, pred in predictions.items()
    }

    for category in categories:
        for window in windows:
            post, pre, _ = _event_masks(panel, category, window)

            for period, period_mask in (
                ("all", pd.Series(True, index=panel.index)),
                (
                    "2025+",
                    pd.to_datetime(panel["date"]).dt.year >= 2025,
                ),
            ):
                post_keys = panel.loc[
                    post & period_mask, ["date", "ticker"]
                ]
                pre_keys = panel.loc[
                    pre & period_mask, ["date", "ticker"]
                ]

                for model_name, pred_ranked in ranked.items():
                    post_stats = _subset_skill(
                        pred_ranked, post_keys, horizon
                    )
                    pre_stats = _subset_skill(
                        pred_ranked, pre_keys, horizon
                    )
                    rows.append({
                        "model": model_name,
                        "category": category,
                        "window_days": window,
                        "period": period,
                        "post_observations":
                            post_stats["observations"],
                        "pre_observations":
                            pre_stats["observations"],
                        "post_rank_ic": post_stats["rank_ic"],
                        "pre_rank_ic": pre_stats["rank_ic"],
                        "delta_post_minus_pre_ic": (
                            post_stats["rank_ic"]
                            - pre_stats["rank_ic"]
                        ),
                        "post_spread":
                            post_stats["top_bottom_neutral_spread"],
                        "pre_spread":
                            pre_stats["top_bottom_neutral_spread"],
                        "delta_post_minus_pre_spread": (
                            post_stats["top_bottom_neutral_spread"]
                            - pre_stats["top_bottom_neutral_spread"]
                        ),
                        "post_abs_rank_error":
                            post_stats["mean_abs_rank_error"],
                        "pre_abs_rank_error":
                            pre_stats["mean_abs_rank_error"],
                        "delta_pre_minus_post_rank_error": (
                            pre_stats["mean_abs_rank_error"]
                            - post_stats["mean_abs_rank_error"]
                        ),
                    })

    return pd.DataFrame(rows)


def _matched_keys(
    panel: pd.DataFrame,
    category: str,
    window_days: int,
    recent_only: bool,
) -> tuple[pd.DataFrame, dict]:
    post, _, clean_control = _event_masks(
        panel, category, window_days
    )

    period_mask = pd.Series(True, index=panel.index)
    if recent_only:
        period_mask = (
            pd.to_datetime(panel["date"]).dt.year >= 2025
        )

    needed = [
        "date", "ticker", "broad_sector", "log_market_cap"
    ]
    events = panel.loc[
        post & period_mask, needed
    ].copy()
    controls = panel.loc[
        clean_control & period_mask, needed
    ].copy()

    pairs = []
    sector_matches = 0
    fallback_matches = 0

    for dt, e_day in events.groupby("date"):
        c_day = controls[controls["date"] == dt].copy()
        if c_day.empty:
            continue

        used: set[str] = set()
        e_day = e_day.sort_values(
            "log_market_cap", kind="stable"
        )

        for _, e in e_day.iterrows():
            candidates = c_day[
                ~c_day["ticker"].astype(str).isin(used)
            ].copy()
            if candidates.empty:
                continue

            same_sector = candidates[
                candidates["broad_sector"] == e["broad_sector"]
            ].copy()
            if not same_sector.empty:
                pool = same_sector
                scope = "sector"
            else:
                pool = candidates
                scope = "date"
                fallback_matches += 1

            if pd.notna(e["log_market_cap"]):
                dist = (
                    pool["log_market_cap"] - e["log_market_cap"]
                ).abs()
                if dist.notna().any():
                    chosen_idx = dist.idxmin()
                else:
                    chosen_idx = pool.index[0]
            else:
                chosen_idx = pool.index[0]

            c = pool.loc[chosen_idx]
            used.add(str(c["ticker"]))
            if scope == "sector":
                sector_matches += 1

            pairs.append({
                "date": dt,
                "event_ticker": e["ticker"],
                "control_ticker": c["ticker"],
                "event_sector": e["broad_sector"],
                "control_sector": c["broad_sector"],
                "event_log_market_cap": e["log_market_cap"],
                "control_log_market_cap": c["log_market_cap"],
                "match_scope": scope,
            })

    out = pd.DataFrame(pairs)
    total = len(out)
    stats = {
        "pairs": total,
        "sector_match_rate": (
            sector_matches / total if total else np.nan
        ),
        "fallback_matches": fallback_matches,
    }
    return out, stats


def matched_control_report(
    predictions: dict[str, pd.DataFrame],
    panel: pd.DataFrame,
    horizon: int,
    categories: tuple[str, ...] = FOCUS_CATEGORIES,
    windows: tuple[int, ...] = VALIDATION_WINDOWS,
) -> pd.DataFrame:
    ranked = {
        name: _prediction_with_ranks(pred)
        for name, pred in predictions.items()
    }
    rows = []

    for category in categories:
        for window in windows:
            for recent_only in (False, True):
                pairs, match_stats = _matched_keys(
                    panel,
                    category,
                    window,
                    recent_only,
                )
                if pairs.empty:
                    continue

                event_keys = pairs[
                    ["date", "event_ticker"]
                ].rename(columns={"event_ticker": "ticker"})
                control_keys = pairs[
                    ["date", "control_ticker"]
                ].rename(columns={"control_ticker": "ticker"})

                for model_name, pred_ranked in ranked.items():
                    event_stats = _subset_skill(
                        pred_ranked, event_keys, horizon
                    )
                    control_stats = _subset_skill(
                        pred_ranked, control_keys, horizon
                    )
                    rows.append({
                        "model": model_name,
                        "category": category,
                        "window_days": window,
                        "period": "2025+" if recent_only else "all",
                        **match_stats,
                        "event_rank_ic": event_stats["rank_ic"],
                        "control_rank_ic":
                            control_stats["rank_ic"],
                        "delta_event_minus_control_ic": (
                            event_stats["rank_ic"]
                            - control_stats["rank_ic"]
                        ),
                        "event_spread":
                            event_stats[
                                "top_bottom_neutral_spread"
                            ],
                        "control_spread":
                            control_stats[
                                "top_bottom_neutral_spread"
                            ],
                        "delta_event_minus_control_spread": (
                            event_stats[
                                "top_bottom_neutral_spread"
                            ]
                            - control_stats[
                                "top_bottom_neutral_spread"
                            ]
                        ),
                        "event_abs_rank_error":
                            event_stats["mean_abs_rank_error"],
                        "control_abs_rank_error":
                            control_stats["mean_abs_rank_error"],
                        "delta_control_minus_event_rank_error": (
                            control_stats["mean_abs_rank_error"]
                            - event_stats["mean_abs_rank_error"]
                        ),
                    })

    return pd.DataFrame(rows)


def monthly_block_bootstrap(
    daily: pd.DataFrame,
    reps: int = 1000,
    seed: int = 42,
) -> dict:
    d = daily.dropna(
        subset=["rank_ic", "neutral_spread"]
    ).copy()
    if d.empty:
        return {}

    d["month"] = pd.to_datetime(d["date"]).dt.to_period("M")
    months = list(d["month"].drop_duplicates())
    if len(months) < 4:
        return {}

    blocks = {
        month: d[d["month"] == month]
        for month in months
    }

    rng = np.random.default_rng(seed)
    ic_samples = np.empty(reps, dtype=float)
    spread_samples = np.empty(reps, dtype=float)

    for i in range(reps):
        chosen = rng.choice(months, size=len(months), replace=True)
        sample = pd.concat(
            [blocks[m] for m in chosen],
            ignore_index=True,
        )
        ic_samples[i] = sample["rank_ic"].mean()
        spread_samples[i] = sample["neutral_spread"].mean()

    def stats(values: np.ndarray, observed: float, prefix: str):
        return {
            f"{prefix}_observed": float(observed),
            f"{prefix}_ci_low": float(np.quantile(values, 0.025)),
            f"{prefix}_ci_high": float(np.quantile(values, 0.975)),
            f"{prefix}_boot_positive_rate":
                float((values > 0).mean()),
        }

    out = {}
    out.update(stats(
        ic_samples,
        d["rank_ic"].mean(),
        "ic",
    ))
    out.update(stats(
        spread_samples,
        d["neutral_spread"].mean(),
        "spread",
    ))
    out["months"] = len(months)
    out["days"] = len(d)
    return out


def bootstrap_report(
    predictions: dict[str, pd.DataFrame],
    horizon: int,
    reps: int,
) -> pd.DataFrame:
    rows = []
    for name, pred in predictions.items():
        daily = _daily_metrics(pred, horizon)
        for recent_only in (False, True):
            d = daily.copy()
            if recent_only:
                d = d[
                    pd.to_datetime(d["date"]).dt.year >= 2025
                ]
            stats = monthly_block_bootstrap(
                d,
                reps=reps,
                seed=42,
            )
            if not stats:
                continue
            rows.append({
                "model": name,
                "period": "2025+" if recent_only else "all",
                **stats,
            })
    return pd.DataFrame(rows)


def _membership_churn(
    prev: set[str] | None,
    current: set[str],
) -> float:
    if prev is None or not prev or not current:
        return np.nan
    denom = max(len(prev), len(current))
    return 1.0 - len(prev & current) / denom


def transaction_cost_report(
    predictions: dict[str, pd.DataFrame],
    horizon: int,
    cost_bps: tuple[int, ...] = COST_BPS,
) -> pd.DataFrame:
    rows = []

    for name, pred in predictions.items():
        for recent_only in (False, True):
            p = pred.copy()
            if recent_only:
                p = p[
                    pd.to_datetime(p["date"]).dt.year >= 2025
                ].copy()

            dates = pd.DatetimeIndex(
                sorted(pd.unique(p["date"]))
            )
            offset_rows = []

            for offset in range(horizon):
                chosen_dates = dates[offset::horizon]
                prev_top = None
                prev_bottom = None
                churn_top = []
                churn_bottom = []
                spreads = []

                for dt in chosen_dates:
                    g = p[p["date"] == dt].dropna(
                        subset=[
                            "score",
                            f"future_sector_neutral_{horizon}d",
                        ]
                    )
                    if len(g) < 8:
                        continue

                    ranked = g.sort_values("score")
                    k = max(
                        1,
                        int(np.floor(len(ranked) * 0.20)),
                    )
                    bottom = set(
                        ranked.head(k)["ticker"].astype(str)
                    )
                    top = set(
                        ranked.tail(k)["ticker"].astype(str)
                    )

                    spread = (
                        ranked.tail(k)[
                            f"future_sector_neutral_{horizon}d"
                        ].mean()
                        - ranked.head(k)[
                            f"future_sector_neutral_{horizon}d"
                        ].mean()
                    )
                    spreads.append(spread)

                    ct = _membership_churn(prev_top, top)
                    cb = _membership_churn(
                        prev_bottom, bottom
                    )
                    if pd.notna(ct):
                        churn_top.append(ct)
                    if pd.notna(cb):
                        churn_bottom.append(cb)

                    prev_top = top
                    prev_bottom = bottom

                if spreads:
                    offset_rows.append({
                        "gross_spread": float(
                            np.nanmean(spreads)
                        ),
                        "top_churn": float(
                            np.nanmean(churn_top)
                        ) if churn_top else np.nan,
                        "bottom_churn": float(
                            np.nanmean(churn_bottom)
                        ) if churn_bottom else np.nan,
                        "rebalances": len(spreads),
                    })

            if not offset_rows:
                continue

            o = pd.DataFrame(offset_rows)
            gross = float(o["gross_spread"].mean())
            top_churn = float(o["top_churn"].mean())
            bottom_churn = float(o["bottom_churn"].mean())

            base = {
                "model": name,
                "period": "2025+" if recent_only else "all",
                "gross_neutral_spread": gross,
                "avg_top_churn": top_churn,
                "avg_bottom_churn": bottom_churn,
                "avg_rebalances_per_offset":
                    float(o["rebalances"].mean()),
            }

            # One-way trading cost c. Replacing fraction f requires
            # closing old and opening new positions. With +1 long and -1
            # short books, approximate round-trip cost is
            # 2*c*(top_churn + bottom_churn).
            for bps in cost_bps:
                c = bps / 10000.0
                cost = 2.0 * c * (
                    top_churn + bottom_churn
                )
                base[f"net_spread_{bps}bps"] = (
                    gross - cost
                )
                base[f"estimated_cost_{bps}bps"] = cost

            rows.append(base)

    return pd.DataFrame(rows)


def gate_coverage_report(
    panel: pd.DataFrame,
) -> pd.DataFrame:
    gates = {
        "all_20d": event_gate(
            panel, list(EVENT_CATEGORIES), 20
        ),
        "no_ownership_20d": event_gate(
            panel, CORE_NO_OWNERSHIP, 20
        ),
    }
    rows = []
    for name, g in gates.items():
        merged = panel[
            ["date", "ticker"]
        ].merge(
            g,
            on=["date", "ticker"],
            how="left",
            validate="one_to_one",
        )
        for recent_only in (False, True):
            x = merged.copy()
            if recent_only:
                x = x[
                    pd.to_datetime(x["date"]).dt.year >= 2025
                ]
            active = x["event_gate"].fillna(False)
            by_date = x.assign(
                active=active.astype(float)
            ).groupby("date")["active"].mean()

            rows.append({
                "gate": name,
                "period": "2025+" if recent_only else "all",
                "row_coverage": float(active.mean()),
                "median_daily_universe_coverage": float(
                    by_date.median()
                ),
                "p90_daily_universe_coverage": float(
                    by_date.quantile(0.90)
                ),
            })
    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser(
        description=(
            "V13 robust validation of frozen event-gated DART candidates"
        )
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--refresh-dart", action="store_true")
    p.add_argument("--fast", action="store_true")
    p.add_argument(
        "--bootstrap-reps",
        type=int,
        default=None,
        help="default: 300 in --fast, otherwise 1000",
    )
    args = p.parse_args()

    print("=== V13 Robust Event Validation ===", flush=True)
    print(
        "Frozen candidates: "
        + ", ".join(CANDIDATES),
        flush=True,
    )
    print(
        f"KRX credential env: "
        f"{'있음' if krx_credentials_present() else '없음'} | "
        f"DART API key env: "
        f"{'있음' if dart_api_key_present() else '없음'}",
        flush=True,
    )

    require_krx_credentials()
    krx_diag = diagnose_krx_login()
    if not krx_diag.get("ok"):
        raise RuntimeError(
            "KRX login preflight 실패: "
            f"{krx_diag.get('error_code')} "
            f"{krx_diag.get('error_message')}"
        )

    require_dart_api_key()
    dart_diag = diagnose_dart_api()
    if not dart_diag.get("ok"):
        raise RuntimeError(
            "OpenDART preflight 실패: "
            + str(dart_diag.get("message"))
        )

    t0 = time.perf_counter()
    panel, krx_groups = build_v8_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    base_features, _ = v10_features(krx_groups)

    provider = DARTProvider(refresh=args.refresh_dart)
    panel, dart_groups, _ = add_dart_event_features(
        panel, provider
    )
    dart_all = dart_groups["dart_all"]
    dart_no_ownership = categories_features(
        dart_all,
        CORE_NO_OWNERSHIP,
    )

    print(
        f"panel: {panel['ticker'].nunique()}종목, "
        f"{panel['date'].nunique()}일, {len(panel):,} rows "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        f"features: base={len(base_features)}, "
        f"dart_all={len(dart_all)}, "
        f"dart_no_ownership={len(dart_no_ownership)}",
        flush=True,
    )

    cfg = AdaptConfig("rolling_3y", 3, None)
    test_months = 12 if args.fast else 6

    print("\n=== Frozen OOS predictions ===", flush=True)
    base_pred, _ = walk_forward_config(
        panel,
        base_features,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )
    dart_all_pred, _ = walk_forward_config(
        panel,
        dart_all,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )
    dart_no_pred, _ = walk_forward_config(
        panel,
        dart_no_ownership,
        cfg,
        args.horizon,
        test_months,
        args.fast,
    )

    all_gate = event_gate(
        panel,
        list(EVENT_CATEGORIES),
        20,
    )
    no_gate = event_gate(
        panel,
        CORE_NO_OWNERSHIP,
        20,
    )

    predictions = {
        "base_only": base_pred,
        "event_gated_all_w50_20d": fusion_prediction(
            base_pred,
            dart_all_pred,
            0.50,
            gate=all_gate,
        ),
        "event_gated_no_ownership_w50_20d":
            fusion_prediction(
                base_pred,
                dart_no_pred,
                0.50,
                gate=no_gate,
            ),
    }

    print("\n=== 0. Gate coverage ===")
    gate_cov = gate_coverage_report(panel)
    print(
        gate_cov.to_string(
            index=False,
            float_format=lambda x: f"{x:.4f}",
        )
    )

    print("\n=== 1. Candidate headline metrics ===")
    headline = []
    for name, pred in predictions.items():
        daily = _daily_metrics(pred, args.horizon)
        s = _summary(daily, args.horizon)
        r = recent_summary(daily, 2025)
        headline.append({
            "model": name,
            **s,
            **r,
        })
    headline = pd.DataFrame(headline)
    with pd.option_context(
        "display.max_columns", None,
        "display.width", 300,
    ):
        print(
            headline.to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    print("\n=== 2. Pre-event placebo ===")
    placebo = placebo_report(
        predictions,
        panel,
        args.horizon,
    )
    placebo_show = placebo[
        placebo["period"] == "2025+"
    ].copy()
    with pd.option_context(
        "display.max_rows", 200,
        "display.max_columns", None,
        "display.width", 360,
    ):
        print(
            placebo_show.to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    print("\n=== 3. Matched control ===")
    matched = matched_control_report(
        predictions,
        panel,
        args.horizon,
    )
    matched_show = matched[
        matched["period"] == "2025+"
    ].copy()
    with pd.option_context(
        "display.max_rows", 200,
        "display.max_columns", None,
        "display.width", 380,
    ):
        print(
            matched_show.to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    reps = (
        args.bootstrap_reps
        if args.bootstrap_reps is not None
        else (300 if args.fast else 1000)
    )
    print(
        f"\n=== 4. Monthly block bootstrap ({reps} reps) ==="
    )
    boot = bootstrap_report(
        predictions,
        args.horizon,
        reps,
    )
    with pd.option_context(
        "display.max_columns", None,
        "display.width", 300,
    ):
        print(
            boot.to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    print("\n=== 5. Turnover / transaction-cost diagnostic ===")
    costs = transaction_cost_report(
        predictions,
        args.horizon,
    )
    with pd.option_context(
        "display.max_columns", None,
        "display.width", 320,
    ):
        print(
            costs.to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    print(
        "\n해석 규칙:\n"
        "1) post-event 성능이 pre-event placebo보다 좋아야 event-local 설명력이 강해짐\n"
        "2) matched control보다 event 종목의 IC/오차가 좋아야 단순 종목선택 효과 가능성이 줄어듦\n"
        "3) bootstrap CI가 0을 넓게 가로지르면 평균 개선을 확정 신호로 보지 않음\n"
        "4) 10~20bp 비용 후 spread가 사라지면 실전 edge로 간주하지 않음\n"
        "5) all-event gate coverage가 지나치게 높으면 'event-gated'가 사실상 상시 fusion일 수 있음\n"
        "6) V13은 V12를 본 뒤 설계된 validation이므로 2025+도 최종 holdout이 아님; "
        "이 구조를 동결한 뒤의 live data가 최종 검증",
        flush=True,
    )


if __name__ == "__main__":
    main()
