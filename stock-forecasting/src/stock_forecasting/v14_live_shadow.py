from __future__ import annotations

import argparse
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
import json
from pathlib import Path
import shutil
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
    _fit_predict,
    v10_features,
)
from .v11_dart_events import add_dart_event_features
from .v12_dart_attribution_fusion import (
    CORE_NO_OWNERSHIP,
    categories_features,
    event_gate,
)
from .v13_robust_event_validation import (
    monthly_block_bootstrap,
    transaction_cost_report,
)


FROZEN_MODEL_VERSION = "v14-shadow-2026-09-21-v1"
FROZEN_AT = "2026-09-21"
HORIZON = 5
TRAIN_YEARS = 3
DART_WEIGHT = 0.50
GATE_WINDOW_DAYS = 20
MIN_DAILY_TICKERS = 24
DEFAULT_SHADOW_DIR = ".shadow/v14"


@dataclass(frozen=True)
class PromotionPolicy:
    min_realized_days: int = 126
    min_realized_months: int = 6
    min_median_daily_coverage: float = 0.90
    min_candidate_mean_ic: float = 0.020
    min_delta_ic_vs_base: float = 0.005
    min_positive_ic_rate: float = 0.53
    min_last_63d_ic: float = 0.0
    require_ic_bootstrap_ci_low_above_zero: bool = True
    min_net_spread_10bps: float = 0.0


PROMOTION_POLICY = PromotionPolicy()


def frozen_manifest() -> dict:
    return {
        "model_version": FROZEN_MODEL_VERSION,
        "frozen_at": FROZEN_AT,
        "horizon_trading_days": HORIZON,
        "train_years": TRAIN_YEARS,
        "model": {
            "type": "ExtraTreesRegressor",
            "n_estimators": 260,
            "max_depth": 10,
            "min_samples_leaf": 20,
            "max_features": 0.45,
            "random_state": 42,
        },
        "base_feature_policy": (
            "V10 price + size/liquidity + conservative valuation"
        ),
        "dart_feature_policy": (
            "V11 category-specific DART features excluding ownership "
            "and generic all-event aggregates"
        ),
        "fusion": {
            "dart_weight_when_gate_active": DART_WEIGHT,
            "gate_window_trading_days": GATE_WINDOW_DAYS,
            "gate_categories": list(CORE_NO_OWNERSHIP),
            "base_weight_when_gate_inactive": 1.0,
        },
        "point_in_time": {
            "dart_same_day_allowed": False,
            "dart_effective": "first strictly later trading day",
            "training_label_cutoff": (
                "latest label whose horizon is fully realized by as_of"
            ),
        },
        "promotion_policy": asdict(PROMOTION_POLICY),
    }


def _atomic_write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text, encoding="utf-8")
    tmp.replace(path)


def ensure_frozen_manifest(root: Path) -> Path:
    path = root / "freeze_manifest.json"
    expected = frozen_manifest()

    if path.exists():
        current = json.loads(path.read_text(encoding="utf-8"))
        if current != expected:
            raise RuntimeError(
                "V14 freeze manifest가 현재 코드와 다릅니다. "
                "기존 live shadow 결과에 다른 모델/승격기준을 섞을 수 없습니다. "
                "설계를 바꾸려면 새로운 model_version과 별도 shadow directory를 사용하세요."
            )
        return path

    _atomic_write_text(
        path,
        json.dumps(
            expected,
            ensure_ascii=False,
            indent=2,
            sort_keys=True,
        )
        + "\n",
    )
    return path


def _clear_yahoo_cache(cache_dir: str = ".cache/yfinance") -> int:
    root = Path(cache_dir)
    if not root.exists():
        return 0
    count = 0
    for p in root.glob("*.pkl"):
        try:
            p.unlink()
            count += 1
        except OSError:
            pass
    return count


def _log_path(root: Path) -> Path:
    return root / "predictions.csv"


def load_shadow_log(root: Path) -> pd.DataFrame:
    path = _log_path(root)
    if not path.exists():
        return pd.DataFrame()

    out = pd.read_csv(
        path,
        dtype={"ticker": str},
    )
    if "ticker" in out.columns:
        out["ticker"] = out["ticker"].str.zfill(6)
    for c in [
        "as_of_date",
        "realized_date",
        "created_at_utc",
        "settled_at_utc",
    ]:
        if c in out.columns:
            out[c] = pd.to_datetime(out[c], errors="coerce")
    return out


def save_shadow_log(root: Path, log: pd.DataFrame) -> None:
    path = _log_path(root)
    path.parent.mkdir(parents=True, exist_ok=True)
    out = log.copy()
    for c in [
        "as_of_date",
        "realized_date",
        "created_at_utc",
        "settled_at_utc",
    ]:
        if c in out.columns:
            out[c] = pd.to_datetime(
                out[c], errors="coerce"
            ).dt.strftime("%Y-%m-%d")
    tmp = path.with_suffix(".csv.tmp")
    out.to_csv(tmp, index=False, encoding="utf-8-sig")
    tmp.replace(path)


def _active_categories_for_row(row: pd.Series) -> str:
    active = []
    for category in CORE_NO_OWNERSHIP:
        c = f"dart_{category}_days_since"
        if c in row.index:
            value = row[c]
            if pd.notna(value) and 0 <= float(value) < GATE_WINDOW_DAYS:
                active.append(category)
    return ";".join(active)


def _training_cutoff(
    panel: pd.DataFrame,
    as_of: pd.Timestamp,
    horizon: int,
) -> pd.Timestamp:
    dates = pd.DatetimeIndex(
        sorted(pd.to_datetime(panel["date"]).unique())
    )
    eligible = dates[dates <= as_of]
    if len(eligible) <= horizon:
        raise RuntimeError(
            f"{as_of.date()} 기준 {horizon}일 label cutoff를 만들 history가 부족합니다."
        )
    return pd.Timestamp(eligible[-(horizon + 1)])


def build_live_snapshot(
    panel: pd.DataFrame,
    base_features: list[str],
    dart_features: list[str],
    as_of: pd.Timestamp | None = None,
) -> pd.DataFrame:
    if as_of is None:
        as_of = pd.Timestamp(panel["date"].max())
    as_of = pd.Timestamp(as_of).normalize()

    latest = panel[panel["date"] == as_of].copy()
    if len(latest) < MIN_DAILY_TICKERS:
        raise RuntimeError(
            f"{as_of.date()} panel 종목 수가 {len(latest)}개로 너무 적습니다 "
            f"(최소 {MIN_DAILY_TICKERS})."
        )

    cutoff = _training_cutoff(panel, as_of, HORIZON)
    train_start = as_of - pd.DateOffset(years=TRAIN_YEARS)
    target_col = f"target_sector_neutral_rank_{HORIZON}d"
    train = panel[
        (panel["date"] >= train_start)
        & (panel["date"] <= cutoff)
    ].copy()
    train = train.dropna(subset=[target_col])

    if len(train) < 1800:
        raise RuntimeError(
            f"live training rows={len(train):,}로 부족합니다."
        )

    cfg = AdaptConfig(
        "v14_frozen_3y",
        TRAIN_YEARS,
        None,
    )
    base_raw = _fit_predict(
        train,
        latest,
        base_features,
        target_col,
        cfg,
        fast=False,
    )
    dart_raw = _fit_predict(
        train,
        latest,
        dart_features,
        target_col,
        cfg,
        fast=False,
    )

    snap = latest[
        ["date", "ticker", "name", "broad_sector"]
    ].copy()
    snap = snap.rename(columns={"date": "as_of_date"})
    snap["base_score_raw"] = base_raw
    snap["dart_score_raw"] = dart_raw
    snap["base_rank_score"] = pd.Series(
        base_raw, index=snap.index
    ).rank(pct=True, method="average")
    snap["dart_rank_score"] = pd.Series(
        dart_raw, index=snap.index
    ).rank(pct=True, method="average")

    gate = event_gate(
        panel[panel["date"] == as_of].copy(),
        CORE_NO_OWNERSHIP,
        GATE_WINDOW_DAYS,
    )
    gate_map = dict(
        zip(gate["ticker"], gate["event_gate"])
    )
    snap["dart_gate_active"] = (
        snap["ticker"].map(gate_map).fillna(False).astype(bool)
    )

    active_map = {
        row["ticker"]: _active_categories_for_row(row)
        for _, row in latest.iterrows()
    }
    snap["active_dart_categories"] = (
        snap["ticker"].map(active_map).fillna("")
    )

    w = np.where(
        snap["dart_gate_active"].to_numpy(),
        DART_WEIGHT,
        0.0,
    )
    snap["final_score"] = (
        (1.0 - w) * snap["base_rank_score"].to_numpy()
        + w * snap["dart_rank_score"].to_numpy()
    )
    snap["final_rank"] = snap["final_score"].rank(
        pct=True, method="average"
    )

    now_utc = datetime.now(timezone.utc).isoformat()
    snap["model_version"] = FROZEN_MODEL_VERSION
    snap["horizon"] = HORIZON
    snap["train_start_date"] = train_start.normalize()
    snap["train_label_cutoff"] = cutoff
    snap["created_at_utc"] = now_utc
    snap["status"] = "pending"
    snap["realized_date"] = pd.NaT
    snap["settled_at_utc"] = pd.NaT
    snap[f"future_ret_{HORIZON}d"] = np.nan
    snap[f"future_sector_neutral_{HORIZON}d"] = np.nan
    snap[f"target_sector_neutral_rank_{HORIZON}d"] = np.nan

    return snap.sort_values(
        "final_rank",
        ascending=False,
    ).reset_index(drop=True)


def append_snapshot(
    root: Path,
    log: pd.DataFrame,
    snapshot: pd.DataFrame,
) -> tuple[pd.DataFrame, bool]:
    as_of = pd.Timestamp(snapshot["as_of_date"].iloc[0]).normalize()

    if not log.empty:
        existing_dates = pd.to_datetime(
            log["as_of_date"]
        ).dt.normalize()
        existing = log[
            (existing_dates == as_of)
            & (log["model_version"] == FROZEN_MODEL_VERSION)
        ]
        if not existing.empty:
            return log, False

    if log.empty:
        out = snapshot.copy()
    else:
        out = pd.concat([log, snapshot], ignore_index=True)

    save_shadow_log(root, out)
    return out, True


def settle_shadow_log(
    log: pd.DataFrame,
    panel: pd.DataFrame,
) -> tuple[pd.DataFrame, int]:
    if log.empty:
        return log, 0

    out = log.copy()
    target = f"target_sector_neutral_rank_{HORIZON}d"
    future = f"future_ret_{HORIZON}d"
    neutral = f"future_sector_neutral_{HORIZON}d"

    lookup = panel[
        ["date", "ticker", future, neutral, target]
    ].copy().rename(columns={"date": "as_of_date"})
    lookup["as_of_date"] = pd.to_datetime(
        lookup["as_of_date"]
    ).dt.normalize()
    lookup["ticker"] = lookup["ticker"].astype(str).str.zfill(6)

    dates = pd.DatetimeIndex(
        sorted(pd.to_datetime(panel["date"]).unique())
    )
    realized_date_map = {}
    for i, dt in enumerate(dates):
        j = i + HORIZON
        if j < len(dates):
            realized_date_map[pd.Timestamp(dt)] = pd.Timestamp(dates[j])

    merged = out.merge(
        lookup,
        on=["as_of_date", "ticker"],
        how="left",
        suffixes=("", "_new"),
        validate="many_to_one",
    )

    settled_count = 0
    now_utc = datetime.now(timezone.utc).isoformat()

    for idx in merged.index:
        if str(merged.at[idx, "status"]) == "settled":
            continue

        target_new = merged.at[idx, f"{target}_new"]
        if pd.isna(target_new):
            continue

        merged.at[idx, future] = merged.at[idx, f"{future}_new"]
        merged.at[idx, neutral] = merged.at[idx, f"{neutral}_new"]
        merged.at[idx, target] = target_new
        as_of = pd.Timestamp(merged.at[idx, "as_of_date"]).normalize()
        merged.at[idx, "realized_date"] = realized_date_map.get(
            as_of, pd.NaT
        )
        merged.at[idx, "settled_at_utc"] = now_utc
        merged.at[idx, "status"] = "settled"
        settled_count += 1

    drop_cols = [
        c for c in merged.columns
        if c.endswith("_new")
    ]
    merged = merged.drop(columns=drop_cols)
    return merged, settled_count


def _daily_shadow_metrics(
    log: pd.DataFrame,
) -> pd.DataFrame:
    target = f"target_sector_neutral_rank_{HORIZON}d"
    neutral = f"future_sector_neutral_{HORIZON}d"
    settled = log[
        (log["status"] == "settled")
        & log[target].notna()
        & log[neutral].notna()
    ].copy()

    rows = []
    for dt, g in settled.groupby("as_of_date"):
        if len(g) < MIN_DAILY_TICKERS:
            continue

        base_ic = g["base_rank_score"].corr(
            g[target],
            method="spearman",
        )
        final_ic = g["final_score"].corr(
            g[target],
            method="spearman",
        )

        def spread(score_col: str) -> float:
            ranked = g.sort_values(score_col)
            k = max(1, int(np.floor(len(ranked) * 0.20)))
            return float(
                ranked.tail(k)[neutral].mean()
                - ranked.head(k)[neutral].mean()
            )

        rows.append({
            "date": pd.Timestamp(dt),
            "tickers": len(g),
            "coverage": len(g) / max(
                1,
                g["ticker"].nunique(),
            ),
            "base_ic": base_ic,
            "candidate_ic": final_ic,
            "delta_ic": final_ic - base_ic,
            "base_neutral_spread": spread(
                "base_rank_score"
            ),
            "candidate_neutral_spread": spread(
                "final_score"
            ),
        })

    return pd.DataFrame(rows).sort_values("date")


def _prediction_frames_from_log(
    log: pd.DataFrame,
) -> dict[str, pd.DataFrame]:
    future = f"future_ret_{HORIZON}d"
    neutral = f"future_sector_neutral_{HORIZON}d"
    target = f"target_sector_neutral_rank_{HORIZON}d"
    settled = log[
        (log["status"] == "settled")
        & log[target].notna()
    ].copy()

    common = settled[
        [
            "as_of_date",
            "ticker",
            "name",
            "broad_sector",
            future,
            neutral,
            target,
        ]
    ].rename(columns={"as_of_date": "date"})

    def frame(score: pd.Series) -> pd.DataFrame:
        x = common.copy()
        x["score"] = score.to_numpy()
        x["target_rank"] = x[target]
        return x

    return {
        "base": frame(settled["base_rank_score"]),
        "candidate": frame(settled["final_score"]),
    }


def shadow_status(
    log: pd.DataFrame,
    bootstrap_reps: int = 1000,
) -> tuple[dict, pd.DataFrame, pd.DataFrame]:
    daily = _daily_shadow_metrics(log)
    if daily.empty:
        return {
            "decision": "COLLECTING",
            "reason": "아직 5거래일 후 실현값이 있는 shadow 날짜가 없습니다.",
            "realized_days": 0,
        }, daily, pd.DataFrame()

    months = pd.to_datetime(daily["date"]).dt.to_period("M").nunique()
    last63 = daily.tail(63)

    candidate_daily = pd.DataFrame({
        "date": daily["date"],
        "rank_ic": daily["candidate_ic"],
        "neutral_spread": daily[
            "candidate_neutral_spread"
        ],
    })
    boot = monthly_block_bootstrap(
        candidate_daily,
        reps=bootstrap_reps,
        seed=20260921,
    )

    frames = _prediction_frames_from_log(log)
    cost = transaction_cost_report(
        frames,
        HORIZON,
        cost_bps=(10,),
    )
    candidate_cost = cost[
        (cost["model"] == "candidate")
        & (cost["period"] == "all")
    ]
    net10 = (
        float(candidate_cost.iloc[0]["net_spread_10bps"])
        if not candidate_cost.empty
        else np.nan
    )

    metrics = {
        "decision": "COLLECTING",
        "model_version": FROZEN_MODEL_VERSION,
        "realized_days": int(len(daily)),
        "realized_months": int(months),
        "median_daily_coverage": float(
            daily["coverage"].median()
        ),
        "candidate_mean_ic": float(
            daily["candidate_ic"].mean()
        ),
        "base_mean_ic": float(
            daily["base_ic"].mean()
        ),
        "delta_ic_vs_base": float(
            daily["candidate_ic"].mean()
            - daily["base_ic"].mean()
        ),
        "candidate_positive_ic_rate": float(
            (daily["candidate_ic"] > 0).mean()
        ),
        "candidate_mean_neutral_spread": float(
            daily["candidate_neutral_spread"].mean()
        ),
        "base_mean_neutral_spread": float(
            daily["base_neutral_spread"].mean()
        ),
        "last_63d_ic": float(
            last63["candidate_ic"].mean()
        ),
        "ic_bootstrap_ci_low": float(
            boot.get("ic_ci_low", np.nan)
        ),
        "ic_bootstrap_ci_high": float(
            boot.get("ic_ci_high", np.nan)
        ),
        "net_spread_10bps": net10,
    }

    p = PROMOTION_POLICY
    checks = {
        "min_realized_days":
            metrics["realized_days"] >= p.min_realized_days,
        "min_realized_months":
            metrics["realized_months"] >= p.min_realized_months,
        "min_median_daily_coverage":
            metrics["median_daily_coverage"]
            >= p.min_median_daily_coverage,
        "min_candidate_mean_ic":
            metrics["candidate_mean_ic"]
            >= p.min_candidate_mean_ic,
        "min_delta_ic_vs_base":
            metrics["delta_ic_vs_base"]
            >= p.min_delta_ic_vs_base,
        "min_positive_ic_rate":
            metrics["candidate_positive_ic_rate"]
            >= p.min_positive_ic_rate,
        "min_last_63d_ic":
            metrics["last_63d_ic"]
            >= p.min_last_63d_ic,
        "ic_bootstrap_ci_low_above_zero": (
            pd.notna(metrics["ic_bootstrap_ci_low"])
            and metrics["ic_bootstrap_ci_low"] > 0
        ),
        "min_net_spread_10bps": (
            pd.notna(metrics["net_spread_10bps"])
            and metrics["net_spread_10bps"]
            > p.min_net_spread_10bps
        ),
    }

    enough_history = (
        checks["min_realized_days"]
        and checks["min_realized_months"]
    )
    if not enough_history:
        metrics["decision"] = "COLLECTING"
    elif all(checks.values()):
        metrics["decision"] = "PROMOTION_ELIGIBLE"
    else:
        metrics["decision"] = "SHADOW_ONLY"

    metrics["checks"] = checks
    return metrics, daily, cost


def _write_status(
    root: Path,
    status: dict,
    daily: pd.DataFrame,
    costs: pd.DataFrame,
) -> None:
    root.mkdir(parents=True, exist_ok=True)
    serializable = dict(status)
    _atomic_write_text(
        root / "status.json",
        json.dumps(
            serializable,
            ensure_ascii=False,
            indent=2,
            sort_keys=True,
            default=str,
        )
        + "\n",
    )
    if not daily.empty:
        daily.to_csv(
            root / "daily_metrics.csv",
            index=False,
            encoding="utf-8-sig",
        )
    if not costs.empty:
        costs.to_csv(
            root / "cost_metrics.csv",
            index=False,
            encoding="utf-8-sig",
        )


def _print_status(status: dict) -> None:
    print("\n=== V14 Shadow status ===")
    print(f"decision: {status.get('decision')}")
    print(f"realized days: {status.get('realized_days', 0)}")
    if status.get("realized_days", 0) == 0:
        print(status.get("reason", ""))
        return

    keys = [
        "realized_months",
        "median_daily_coverage",
        "candidate_mean_ic",
        "base_mean_ic",
        "delta_ic_vs_base",
        "candidate_positive_ic_rate",
        "candidate_mean_neutral_spread",
        "base_mean_neutral_spread",
        "last_63d_ic",
        "ic_bootstrap_ci_low",
        "ic_bootstrap_ci_high",
        "net_spread_10bps",
    ]
    for key in keys:
        value = status.get(key)
        if isinstance(value, float):
            print(f"{key}: {value:.6f}")
        else:
            print(f"{key}: {value}")

    checks = status.get("checks") or {}
    if checks:
        print("\n승격기준:")
        for name, ok in checks.items():
            print(f"- {name}: {'PASS' if ok else 'FAIL'}")


def _prepare_panel(
    refresh_yahoo: bool,
    refresh_krx: bool,
    refresh_dart: bool,
) -> tuple[pd.DataFrame, list[str], list[str]]:
    if refresh_yahoo:
        removed = _clear_yahoo_cache()
        print(
            f"Yahoo cache refresh: {removed}개 cache 삭제",
            flush=True,
        )

    panel, krx_groups = build_v8_panel(
        start="2017-01-01",
        horizon=HORIZON,
        max_tickers=None,
        refresh_krx=refresh_krx,
    )
    base_features, _ = v10_features(krx_groups)

    provider = DARTProvider(refresh=refresh_dart)
    panel, dart_groups, _ = add_dart_event_features(
        panel,
        provider,
    )
    dart_features = categories_features(
        dart_groups["dart_all"],
        CORE_NO_OWNERSHIP,
    )
    return panel, base_features, dart_features


def run_shadow(
    root: Path,
    refresh_yahoo: bool = True,
    refresh_krx: bool = False,
    refresh_dart: bool = False,
) -> None:
    ensure_frozen_manifest(root)

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
    panel, base_features, dart_features = _prepare_panel(
        refresh_yahoo=refresh_yahoo,
        refresh_krx=refresh_krx,
        refresh_dart=refresh_dart,
    )
    as_of = pd.Timestamp(panel["date"].max()).normalize()
    print(
        f"latest complete market date from panel: {as_of.date()}",
        flush=True,
    )
    print(
        f"features: base={len(base_features)}, "
        f"dart_no_ownership={len(dart_features)}",
        flush=True,
    )

    log = load_shadow_log(root)
    log, settled = settle_shadow_log(log, panel)
    if settled:
        print(f"settled rows: {settled}", flush=True)
        save_shadow_log(root, log)

    snapshot = build_live_snapshot(
        panel,
        base_features,
        dart_features,
        as_of=as_of,
    )
    log, added = append_snapshot(
        root,
        log,
        snapshot,
    )

    if added:
        active = int(snapshot["dart_gate_active"].sum())
        print(
            f"NEW shadow snapshot: {as_of.date()} | "
            f"{len(snapshot)} stocks | gate active {active}",
            flush=True,
        )
        print("\n상위 frozen score:")
        print(
            snapshot[
                [
                    "ticker",
                    "name",
                    "final_rank",
                    "base_rank_score",
                    "dart_rank_score",
                    "dart_gate_active",
                    "active_dart_categories",
                ]
            ].head(10).to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )
    else:
        print(
            f"{as_of.date()} snapshot은 이미 존재합니다. "
            "과거 live prediction을 덮어쓰지 않았습니다.",
            flush=True,
        )

    status, daily, costs = shadow_status(
        log,
        bootstrap_reps=1000,
    )
    _write_status(root, status, daily, costs)
    _print_status(status)

    print(
        f"\nshadow dir: {root.resolve()}\n"
        f"elapsed: {time.perf_counter()-t0:.1f} sec\n"
        "주의: PROMOTION_ELIGIBLE은 자동 서비스 승격이 아니라 "
        "사전에 고정한 연구 기준을 모두 통과했다는 뜻입니다.",
        flush=True,
    )


def show_status(root: Path) -> None:
    ensure_frozen_manifest(root)
    log = load_shadow_log(root)
    status, daily, costs = shadow_status(
        log,
        bootstrap_reps=1000,
    )
    _write_status(root, status, daily, costs)
    _print_status(status)


def main():
    p = argparse.ArgumentParser(
        description="V14 frozen live shadow evaluator"
    )
    sub = p.add_subparsers(dest="command")

    run = sub.add_parser(
        "run",
        help="최신 market date 예측을 저장하고 과거 pending target을 정산",
    )
    run.add_argument(
        "--shadow-dir",
        default=DEFAULT_SHADOW_DIR,
    )
    run.add_argument(
        "--keep-yahoo-cache",
        action="store_true",
        help=(
            "Yahoo 6시간 cache를 유지. 기본은 live freshness를 위해 "
            "Yahoo cache를 삭제 후 재조회."
        ),
    )
    run.add_argument(
        "--refresh-krx",
        action="store_true",
    )
    run.add_argument(
        "--refresh-dart",
        action="store_true",
    )

    status = sub.add_parser(
        "status",
        help="네트워크 조회 없이 현재 shadow 결과만 평가",
    )
    status.add_argument(
        "--shadow-dir",
        default=DEFAULT_SHADOW_DIR,
    )

    args = p.parse_args()
    command = args.command or "run"

    if command == "status":
        show_status(Path(args.shadow_dir))
        return

    print("=== V14 Frozen Live Shadow ===", flush=True)
    print(
        f"model version: {FROZEN_MODEL_VERSION}\n"
        f"KRX credential env: "
        f"{'있음' if krx_credentials_present() else '없음'} | "
        f"DART API key env: "
        f"{'있음' if dart_api_key_present() else '없음'}",
        flush=True,
    )
    run_shadow(
        Path(args.shadow_dir),
        refresh_yahoo=not args.keep_yahoo_cache,
        refresh_krx=args.refresh_krx,
        refresh_dart=args.refresh_dart,
    )


if __name__ == "__main__":
    main()
