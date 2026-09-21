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

from .krx_data import (
    krx_credentials_present,
    require_krx_credentials,
    diagnose_krx_login,
)
from .v8_krx_variables import (
    build_panel as build_v8_panel,
    coverage_report,
    _folds,
)
from .v6_robust import (
    _daily_metrics,
    _offset_metrics,
    _prediction_frame,
)


VALUATION_TOKENS = (
    "earnings_yield",
    "per_clean",
    "book_to_market",
    "pbr_clean",
    "dividend_yield",
    "dps_level",
)
ACCOUNTING_TOKENS = (
    "eps_level",
    "eps_change_20d",
    "eps_update_event",
    "bps_level",
    "bps_change_20d",
)
SIZE_TOKENS = (
    "log_market_cap",
    "turnover_value",
    "log_listed_shares",
)


def _belongs(feature: str, tokens: tuple[str, ...]) -> bool:
    return any(
        feature == token
        or feature.endswith("_" + token)
        or feature.endswith(token)
        for token in tokens
    )


def split_krx_groups(groups: dict[str, list[str]]) -> dict[str, list[str]]:
    fundamental = groups.get("fundamental", [])
    size = groups.get("size_liquidity", [])
    flow = groups.get("flow", [])
    price = groups.get("price", [])

    valuation = [c for c in fundamental if _belongs(c, VALUATION_TOKENS)]
    accounting = [c for c in fundamental if _belongs(c, ACCOUNTING_TOKENS)]

    # Keep any fundamental feature that was not caught above visible in misc.
    used = set(valuation + accounting)
    misc_fundamental = [c for c in fundamental if c not in used]

    return {
        "price": list(price),
        "flow": list(flow),
        "size_liquidity": list(size),
        "valuation": list(valuation),
        "accounting": list(accounting),
        "misc_fundamental": list(misc_fundamental),
    }


def feature_sets(split: dict[str, list[str]]) -> dict[str, list[str]]:
    p = split["price"]
    f = split["flow"]
    s = split["size_liquidity"]
    v = split["valuation"]
    a = split["accounting"]
    m = split["misc_fundamental"]

    def u(*parts):
        return list(dict.fromkeys(x for part in parts for x in part))

    return {
        "price_only": p,
        "price_plus_flow": u(p, f),
        "price_plus_size": u(p, s),
        "price_plus_valuation": u(p, v),
        "price_plus_accounting": u(p, a),
        "price_plus_size_valuation": u(p, s, v),
        "price_plus_all_krx": u(p, f, s, v, a, m),
        "krx_only": u(f, s, v, a, m),
    }


def leakage_audit(panel: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    cols = [c for c in ["per", "pbr", "eps", "bps", "div_yield", "dps"] if c in panel.columns]
    rows = []
    ticker_rows = []

    for c in cols:
        change_counts = []
        daily_change_rates = []
        unique_counts = []
        run_lengths = []

        for ticker, g in panel[["ticker", "date", c]].dropna(subset=[c]).groupby("ticker"):
            x = g.sort_values("date")[c]
            if len(x) < 2:
                continue

            changed = x.ne(x.shift(1))
            changes = int(changed.iloc[1:].sum())
            rate = changes / max(1, len(x) - 1)
            unique = int(x.nunique(dropna=True))

            # Approximate median number of trading days that a value remains unchanged.
            grp = changed.cumsum()
            runs = x.groupby(grp).size()
            median_run = float(runs.median()) if len(runs) else np.nan

            change_counts.append(changes)
            daily_change_rates.append(rate)
            unique_counts.append(unique)
            run_lengths.append(median_run)

            ticker_rows.append({
                "ticker": ticker,
                "feature": c,
                "observations": len(x),
                "changes": changes,
                "change_rate": rate,
                "unique_values": unique,
                "median_run_days": median_run,
            })

        rows.append({
            "feature": c,
            "tickers": len(change_counts),
            "median_changes_per_ticker": float(np.median(change_counts)) if change_counts else np.nan,
            "median_change_rate": float(np.median(daily_change_rates)) if daily_change_rates else np.nan,
            "median_unique_values": float(np.median(unique_counts)) if unique_counts else np.nan,
            "median_run_days": float(np.nanmedian(run_lengths)) if run_lengths else np.nan,
        })

    return pd.DataFrame(rows), pd.DataFrame(ticker_rows)


def leakage_flags(audit: pd.DataFrame) -> list[str]:
    flags = []
    if audit.empty:
        return ["펀더멘털 audit 대상 컬럼이 없습니다."]

    for _, r in audit.iterrows():
        feature = str(r["feature"])
        rate = float(r["median_change_rate"]) if pd.notna(r["median_change_rate"]) else np.nan
        run = float(r["median_run_days"]) if pd.notna(r["median_run_days"]) else np.nan

        # EPS/BPS/DPS are accounting values and normally should not change every day.
        if feature in {"eps", "bps", "dps"} and pd.notna(rate) and rate > 0.10:
            flags.append(
                f"{feature}: 중앙 변경률 {rate:.1%} — 회계값치고 지나치게 자주 변경. "
                "point-in-time 정의/소급반영 여부 확인 필요."
            )
        if feature in {"eps", "bps", "dps"} and pd.notna(run) and run < 5:
            flags.append(
                f"{feature}: 동일값 중앙 유지기간 {run:.1f} 거래일 — 비정상적으로 짧음."
            )

    if not flags:
        flags.append(
            "자동 audit에서 즉시 드러나는 고빈도 회계값 변경은 없음. "
            "다만 이것만으로 point-in-time 무누수를 증명하지는 못함."
        )
    return flags


def _model(name: str, fast: bool):
    if name == "ridge":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
            ("model", Ridge(alpha=20.0)),
        ])

    if name == "extra_trees":
        return Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("model", ExtraTreesRegressor(
                n_estimators=160 if fast else 300,
                max_depth=10,
                min_samples_leaf=20,
                max_features=0.45,
                n_jobs=-1,
                random_state=42,
            )),
        ])

    raise ValueError(name)


def evaluate_detailed(
    panel: pd.DataFrame,
    features: list[str],
    model_name: str,
    horizon: int,
    test_months: int,
    fast: bool,
    train_years: int = 5,
) -> tuple[dict, pd.DataFrame, pd.DataFrame]:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    parts = []

    for fold_no, (start, end) in enumerate(_folds(panel, test_months), 1):
        test = panel[(panel["date"] >= start) & (panel["date"] < end)].copy()
        if test.empty:
            continue

        train = panel[
            (panel["date"] < start)
            & (panel["date"] >= start - pd.DateOffset(years=train_years))
        ].copy()
        purge_cutoff = start - pd.offsets.BDay(horizon)
        train = train[train["date"] <= purge_cutoff]
        fit = train.dropna(subset=[target_col])

        if len(fit) < 2500:
            continue

        model = _model(model_name, fast)
        model.fit(fit[features], fit[target_col])
        score = model.predict(test[features])
        pred = _prediction_frame(test, score, target_col, horizon)
        pred["fold"] = fold_no
        parts.append(pred)

    if not parts:
        return {}, pd.DataFrame(), pd.DataFrame()

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    _, summary = _offset_metrics(daily, horizon)
    summary["oos_days"] = len(daily)

    yearly_rows = []
    d = daily.copy()
    d["year"] = pd.to_datetime(d["date"]).dt.year
    for year, g in d.groupby("year"):
        yearly_rows.append({
            "year": int(year),
            "days": len(g),
            "mean_ic": g["rank_ic"].mean(),
            "positive_ic_rate": (g["rank_ic"] > 0).mean(),
            "mean_neutral_spread": g["neutral_spread"].mean(),
            "positive_neutral_spread_rate": (g["neutral_spread"] > 0).mean(),
            "mean_spread": g["spread"].mean(),
        })

    yearly = pd.DataFrame(yearly_rows)
    return summary, daily, yearly


def _year_consistency(yearly: pd.DataFrame) -> dict:
    if yearly.empty:
        return {
            "positive_ic_year_rate": np.nan,
            "positive_neutral_year_rate": np.nan,
            "worst_year_ic": np.nan,
            "worst_year_neutral_spread": np.nan,
        }

    return {
        "positive_ic_year_rate": float((yearly["mean_ic"] > 0).mean()),
        "positive_neutral_year_rate": float((yearly["mean_neutral_spread"] > 0).mean()),
        "worst_year_ic": float(yearly["mean_ic"].min()),
        "worst_year_neutral_spread": float(yearly["mean_neutral_spread"].min()),
    }


def main():
    p = argparse.ArgumentParser(
        description="V9 fine-grained KRX variable ablation + leakage audit"
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V9 독립변수 정밀 Ablation + 누수 점검 ===", flush=True)
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
    panel, v8_groups = build_v8_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    split = split_krx_groups(v8_groups)
    sets = feature_sets(split)

    print(
        f"panel: {panel['ticker'].nunique()}종목, {panel['date'].nunique()}일, "
        f"{len(panel):,} rows ({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        "feature groups: "
        + ", ".join(f"{k}={len(v)}" for k, v in split.items()),
        flush=True,
    )

    print("\n=== KRX coverage ===")
    coverage = coverage_report(panel)
    print(coverage.to_string(index=False, formatters={"coverage": lambda x: f"{x:.1%}"}))

    print("\n=== Fundamental point-in-time audit ===")
    audit, ticker_audit = leakage_audit(panel)
    if not audit.empty:
        print(audit.to_string(index=False, float_format=lambda x: f"{x:.4f}"))
    for flag in leakage_flags(audit):
        print(f"- {flag}")

    model_names = ["extra_trees"] if args.fast else ["ridge", "extra_trees"]
    test_months = 12 if args.fast else 6

    rows = []
    yearly_blocks = []
    total = len(model_names) * len(sets)
    job = 0

    for model_name in model_names:
        for set_name, cols in sets.items():
            job += 1
            print(
                f"[{job}/{total}] model={model_name} variables={set_name} "
                f"features={len(cols)}",
                flush=True,
            )
            t1 = time.perf_counter()
            summary, daily, yearly = evaluate_detailed(
                panel,
                cols,
                model_name,
                args.horizon,
                test_months,
                fast=args.fast,
                train_years=5,
            )
            if not summary:
                continue

            consistency = _year_consistency(yearly)
            rows.append({
                "model": model_name,
                "variables": set_name,
                "features": len(cols),
                **summary,
                **consistency,
            })

            if not yearly.empty:
                y = yearly.copy()
                y.insert(0, "variables", set_name)
                y.insert(0, "model", model_name)
                yearly_blocks.append(y)

            print(
                f"    {time.perf_counter()-t1:.1f}초 | "
                f"IC={summary['offset_mean_ic']:.4f} | "
                f"neutral spread={summary['offset_mean_neutral_spread']:.4%} | "
                f"IC+ years={consistency['positive_ic_year_rate']:.1%} | "
                f"spread+ years={consistency['positive_neutral_year_rate']:.1%}",
                flush=True,
            )

    report = pd.DataFrame(rows)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    for model_name in report["model"].unique():
        mask = report["model"] == model_name
        base = report[mask & (report["variables"] == "price_only")]
        if base.empty:
            continue
        b = base.iloc[0]
        report.loc[mask, "delta_ic_vs_price"] = (
            report.loc[mask, "offset_mean_ic"] - b["offset_mean_ic"]
        )
        report.loc[mask, "delta_neutral_spread_vs_price"] = (
            report.loc[mask, "offset_mean_neutral_spread"]
            - b["offset_mean_neutral_spread"]
        )

    cols = [
        "model", "variables", "features", "oos_days",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread", "offset_std_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "positive_ic_year_rate", "positive_neutral_year_rate",
        "worst_year_ic", "worst_year_neutral_spread",
        "delta_ic_vs_price", "delta_neutral_spread_vs_price",
    ]

    print("\n=== V9 정밀 Ablation ===")
    with pd.option_context("display.max_columns", None, "display.width", 320):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    if yearly_blocks:
        yearly_all = pd.concat(yearly_blocks, ignore_index=True)
        interesting = [
            "price_only",
            "price_plus_size",
            "price_plus_valuation",
            "price_plus_accounting",
            "price_plus_size_valuation",
            "price_plus_all_krx",
        ]
        yearly_show = yearly_all[yearly_all["variables"].isin(interesting)]
        print("\n=== 연도별 OOS 안정성 ===")
        with pd.option_context("display.max_rows", 200, "display.width", 260):
            print(
                yearly_show.to_string(
                    index=False, float_format=lambda x: f"{x:.4f}"
                )
            )

    print(
        "\n판정 순서:\n"
        "1) price_plus_*가 price_only 대비 IC와 neutral spread를 동시에 개선하는지\n"
        "2) 개선이 여러 연도에서 반복되는지\n"
        "3) accounting(EPS/BPS) 개선이 누수 audit 경고와 함께 나타나는지\n"
        "4) size/valuation처럼 해석 가능한 변수군만으로도 개선이 유지되는지",
        flush=True,
    )


if __name__ == "__main__":
    main()
