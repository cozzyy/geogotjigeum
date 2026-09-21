from __future__ import annotations

import argparse
import time
import numpy as np
import pandas as pd

from .config import CROSS_SECTION_UNIVERSE
from .krx_data import KRXProvider, krx_credentials_present
from .v6_robust import (
    build_panel as build_v6_panel,
    _model,
    _daily_metrics,
    _offset_metrics,
    _prediction_frame,
)


def _safe_div(a: pd.Series, b: pd.Series) -> pd.Series:
    return a / b.replace(0, np.nan)


def _merge_krx(
    panel: pd.DataFrame,
    refresh: bool = False,
) -> pd.DataFrame:
    provider = KRXProvider(refresh=refresh)
    start = panel["date"].min()
    end = panel["date"].max()

    pieces = []
    tickers = list(panel["ticker"].drop_duplicates())
    for i, ticker in enumerate(tickers, 1):
        name = CROSS_SECTION_UNIVERSE.get(ticker, {}).get("name", ticker)
        print(f"[KRX {i}/{len(tickers)}] {ticker} {name} 수급/재무...", flush=True)
        try:
            frame = provider.bundle(ticker, start, end)
        except Exception as exc:
            print(f"    실패: {exc}", flush=True)
            continue

        if frame.empty:
            continue
        x = frame.copy()
        x["date"] = x.index
        x["ticker"] = ticker
        pieces.append(x.reset_index(drop=True))

    if not pieces:
        raise RuntimeError(
            "KRX 데이터가 한 종목도 수집되지 않았습니다. "
            "pykrx 설치/네트워크/KRX_ID·KRX_PW 설정을 확인하세요."
        )

    krx = pd.concat(pieces, ignore_index=True)
    out = panel.merge(krx, on=["date", "ticker"], how="left")
    return out


def _flow_features(panel: pd.DataFrame) -> tuple[pd.DataFrame, list[str]]:
    out = panel.copy()
    created = {}

    traded = out.get("krx_traded_value")
    if traded is None:
        traded = out.get("traded_value_raw")
    if traded is None:
        traded = pd.Series(np.nan, index=out.index)

    investors = [
        c for c in ["foreign_net", "institution_net", "individual_net", "other_corp_net"]
        if c in out.columns
    ]

    for c in investors:
        daily = _safe_div(out[c], traded)
        created[f"{c}_ratio_1d"] = daily

        grouped_net = out.groupby("ticker")[c]
        grouped_value = traded.groupby(out["ticker"])
        for n in [5, 20]:
            net_sum = grouped_net.transform(lambda s, n=n: s.rolling(n, min_periods=max(2, n // 2)).sum())
            value_sum = grouped_value.transform(lambda s, n=n: s.rolling(n, min_periods=max(2, n // 2)).sum())
            created[f"{c}_ratio_{n}d"] = _safe_div(net_sum, value_sum)
            created[f"{c}_positive_share_{n}d"] = grouped_net.transform(
                lambda s, n=n: (s > 0).rolling(n, min_periods=max(2, n // 2)).mean()
            )

        created[f"{c}_accel_5v20"] = (
            created[f"{c}_ratio_5d"] - created[f"{c}_ratio_20d"]
        )

    if "foreign_net" in out.columns and "institution_net" in out.columns:
        combined = out["foreign_net"] + out["institution_net"]
        created["smart_money_ratio_1d"] = _safe_div(combined, traded)
        smart_group = combined.groupby(out["ticker"])
        value_group = traded.groupby(out["ticker"])
        for n in [5, 20]:
            sm = smart_group.transform(lambda s, n=n: s.rolling(n, min_periods=max(2, n // 2)).sum())
            tv = value_group.transform(lambda s, n=n: s.rolling(n, min_periods=max(2, n // 2)).sum())
            created[f"smart_money_ratio_{n}d"] = _safe_div(sm, tv)

        created["foreign_inst_agree"] = (
            np.sign(out["foreign_net"]) == np.sign(out["institution_net"])
        ).astype(float)
        created["foreign_minus_inst_ratio"] = _safe_div(
            out["foreign_net"] - out["institution_net"], traded
        )

    if created:
        out = pd.concat([out, pd.DataFrame(created, index=out.index)], axis=1)

    cols = list(created.keys())
    return out, cols


def _fundamental_size_features(panel: pd.DataFrame) -> tuple[pd.DataFrame, list[str], list[str]]:
    out = panel.copy()
    fundamental = {}
    size = {}

    if "market_cap" in out.columns:
        size["log_market_cap"] = np.log1p(out["market_cap"].clip(lower=0))
    if "krx_traded_value" in out.columns and "market_cap" in out.columns:
        size["turnover_value"] = _safe_div(out["krx_traded_value"], out["market_cap"])
    if "listed_shares" in out.columns:
        size["log_listed_shares"] = np.log1p(out["listed_shares"].clip(lower=0))

    if "per" in out.columns:
        valid = out["per"].where(out["per"] > 0)
        fundamental["earnings_yield"] = 1.0 / valid
        fundamental["per_clean"] = valid
    if "pbr" in out.columns:
        valid = out["pbr"].where(out["pbr"] > 0)
        fundamental["book_to_market"] = 1.0 / valid
        fundamental["pbr_clean"] = valid
    if "div_yield" in out.columns:
        fundamental["dividend_yield"] = out["div_yield"]
    if "eps" in out.columns:
        fundamental["eps_level"] = out["eps"]
        lag20 = out.groupby("ticker")["eps"].shift(20)
        fundamental["eps_change_20d"] = (out["eps"] - lag20) / (lag20.abs() + 1.0)
        lag1 = out.groupby("ticker")["eps"].shift(1)
        fundamental["eps_update_event"] = (
            out["eps"].notna() & lag1.notna() & (out["eps"] != lag1)
        ).astype(float)
    if "bps" in out.columns:
        fundamental["bps_level"] = out["bps"]
        lag20 = out.groupby("ticker")["bps"].shift(20)
        fundamental["bps_change_20d"] = (out["bps"] - lag20) / (lag20.abs() + 1.0)
    if "dps" in out.columns:
        fundamental["dps_level"] = out["dps"]

    blocks = {}
    blocks.update(size)
    blocks.update(fundamental)
    if blocks:
        out = pd.concat([out, pd.DataFrame(blocks, index=out.index)], axis=1)

    return out, list(fundamental.keys()), list(size.keys())


def _rank_new_features(
    panel: pd.DataFrame,
    cols: list[str],
) -> tuple[pd.DataFrame, list[str]]:
    out = panel.copy()
    ranks = {}
    for c in cols:
        if c not in out.columns:
            continue
        ranks[f"rank_{c}"] = out.groupby("date")[c].rank(pct=True, method="average")
        ranks[f"sector_rank_{c}"] = out.groupby(["date", "broad_sector"])[c].rank(
            pct=True, method="average"
        )

    if ranks:
        out = pd.concat([out, pd.DataFrame(ranks, index=out.index)], axis=1)
    return out, list(ranks.keys())


def build_panel(
    start: str = "2017-01-01",
    horizon: int = 5,
    max_tickers: int | None = None,
    refresh_krx: bool = False,
) -> tuple[pd.DataFrame, dict[str, list[str]]]:
    base, price_features = build_v6_panel(
        start=start,
        horizon=horizon,
        max_tickers=max_tickers,
        investor_flow_dir=None,
    )

    panel = _merge_krx(base, refresh=refresh_krx)
    panel, flow_raw = _flow_features(panel)
    panel, fundamental_raw, size_raw = _fundamental_size_features(panel)

    new_raw = flow_raw + fundamental_raw + size_raw
    panel, rank_cols = _rank_new_features(panel, new_raw)

    flow_rank = [
        c for c in rank_cols
        if any(c.endswith(x) for x in flow_raw)
    ]
    fundamental_rank = [
        c for c in rank_cols
        if any(c.endswith(x) for x in fundamental_raw)
    ]
    size_rank = [
        c for c in rank_cols
        if any(c.endswith(x) for x in size_raw)
    ]

    groups = {
        "price": list(price_features),
        "flow": list(dict.fromkeys(flow_raw + flow_rank)),
        "fundamental": list(dict.fromkeys(fundamental_raw + fundamental_rank)),
        "size_liquidity": list(dict.fromkeys(size_raw + size_rank)),
    }
    groups["all_krx"] = list(dict.fromkeys(
        groups["flow"] + groups["fundamental"] + groups["size_liquidity"]
    ))
    groups["price_flow"] = list(dict.fromkeys(groups["price"] + groups["flow"]))
    groups["price_all_krx"] = list(dict.fromkeys(groups["price"] + groups["all_krx"]))

    return panel.replace([np.inf, -np.inf], np.nan), groups


def coverage_report(panel: pd.DataFrame) -> pd.DataFrame:
    keys = [
        "foreign_net", "institution_net", "individual_net",
        "market_cap", "krx_traded_value",
        "per", "pbr", "eps", "bps", "div_yield",
    ]
    rows = []
    for c in keys:
        if c not in panel.columns:
            rows.append({"feature": c, "coverage": 0.0})
        else:
            rows.append({"feature": c, "coverage": float(panel[c].notna().mean())})
    return pd.DataFrame(rows)


def _folds(
    panel: pd.DataFrame,
    test_months: int,
) -> list[tuple[pd.Timestamp, pd.Timestamp]]:
    dates = pd.DatetimeIndex(sorted(pd.unique(panel["date"])))
    first = (dates.min() + pd.DateOffset(years=4)).to_period("M").start_time
    starts = pd.date_range(first, dates.max(), freq=f"{test_months}MS")
    return [(s, s + pd.DateOffset(months=test_months)) for s in starts]


def evaluate(
    panel: pd.DataFrame,
    features: list[str],
    model_name: str,
    horizon: int,
    test_months: int,
    train_years: int = 5,
) -> dict:
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

        model = _model(model_name)
        model.fit(fit[features], fit[target_col])
        score = model.predict(test[features])
        pred = _prediction_frame(test, score, target_col, horizon)
        pred["fold"] = fold_no
        parts.append(pred)

    if not parts:
        return {}

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    _, summary = _offset_metrics(daily, horizon)
    summary["oos_days"] = len(daily)
    return summary


def momentum_baseline(panel: pd.DataFrame, horizon: int, test_months: int) -> dict:
    target_col = f"target_sector_neutral_rank_{horizon}d"
    parts = []

    for start, end in _folds(panel, test_months):
        test = panel[(panel["date"] >= start) & (panel["date"] < end)].copy()
        if test.empty:
            continue
        pred = _prediction_frame(
            test,
            test["rank_ret_20d"].to_numpy(),
            target_col,
            horizon,
        )
        parts.append(pred)

    pred = pd.concat(parts, ignore_index=True)
    daily = _daily_metrics(pred, horizon)
    _, summary = _offset_metrics(daily, horizon)
    summary["oos_days"] = len(daily)
    return summary


def main():
    p = argparse.ArgumentParser(description="V8 KRX flow/fundamental independent-variable ablation")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V8 KRX 독립변수 panel 생성 ===", flush=True)
    print(
        f"KRX credential env: {'있음' if krx_credentials_present() else '없음'} "
        "(공개 API가 동작하면 없어도 진행 가능)",
        flush=True,
    )
    t0 = time.perf_counter()
    panel, groups = build_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    print(
        f"panel: {panel['ticker'].nunique()}종목, {panel['date'].nunique()}일, "
        f"{len(panel):,} rows ({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )

    coverage = coverage_report(panel)
    print("\n=== KRX 데이터 coverage ===")
    print(coverage.to_string(index=False, formatters={"coverage": lambda x: f"{x:.1%}"}))

    flow_cov = coverage.loc[
        coverage["feature"].isin(["foreign_net", "institution_net"]), "coverage"
    ].mean()
    if flow_cov < 0.20:
        raise RuntimeError(
            f"외국인/기관 수급 coverage가 {flow_cov:.1%}로 너무 낮습니다. "
            "KRX 조회/인증 문제를 먼저 해결해야 V8 실험이 유효합니다."
        )

    model_names = ["extra_trees"] if args.fast else ["ridge", "extra_trees"]
    feature_sets = {
        "price_only": groups["price"],
        "price_plus_flow": groups["price_flow"],
        "price_plus_all_krx": groups["price_all_krx"],
        "krx_only": groups["all_krx"],
    }
    test_months = 12 if args.fast else 6

    rows = []
    total = len(model_names) * len(feature_sets)
    job = 0
    for model_name in model_names:
        for set_name, cols in feature_sets.items():
            job += 1
            print(
                f"[{job}/{total}] model={model_name} variables={set_name} "
                f"features={len(cols)}",
                flush=True,
            )
            t1 = time.perf_counter()
            result = evaluate(
                panel, cols, model_name,
                args.horizon, test_months, train_years=5,
            )
            if not result:
                continue
            rows.append({
                "model": model_name,
                "variables": set_name,
                "features": len(cols),
                **result,
            })
            print(
                f"    {time.perf_counter()-t1:.1f}초 | "
                f"IC={result['offset_mean_ic']:.4f} | "
                f"neutral spread={result['offset_mean_neutral_spread']:.4%} | "
                f"positive={result['offset_positive_neutral_spread_rate']:.1%}",
                flush=True,
            )

    momentum = momentum_baseline(panel, args.horizon, test_months)
    rows.append({
        "model": "baseline",
        "variables": "momentum20",
        "features": 1,
        **momentum,
    })

    report = pd.DataFrame(rows)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    base_lookup = {}
    for model_name in model_names:
        x = report[
            (report["model"] == model_name)
            & (report["variables"] == "price_only")
        ]
        if not x.empty:
            base_lookup[model_name] = x.iloc[0]

    report["delta_ic_vs_price"] = np.nan
    report["delta_neutral_spread_vs_price"] = np.nan
    for idx, row in report.iterrows():
        base = base_lookup.get(row["model"])
        if base is None:
            continue
        report.loc[idx, "delta_ic_vs_price"] = (
            row["offset_mean_ic"] - base["offset_mean_ic"]
        )
        report.loc[idx, "delta_neutral_spread_vs_price"] = (
            row["offset_mean_neutral_spread"]
            - base["offset_mean_neutral_spread"]
        )

    cols = [
        "model", "variables", "features", "oos_days",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread", "offset_std_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "offset_top_beats_median",
        "delta_ic_vs_price", "delta_neutral_spread_vs_price",
    ]

    print("\n=== V8 독립변수 Ablation ===")
    with pd.option_context("display.max_columns", None, "display.width", 260):
        print(report[cols].to_string(index=False, float_format=lambda x: f"{x:.4f}"))

    print(
        "\n판정: 같은 모델에서 price_plus_flow / price_plus_all_krx가 "
        "price_only보다 IC와 sector-neutral spread를 동시에 높이는지 확인. "
        "KRX-only도 양수면 새 독립변수 자체에 별도 정보가 있다는 뜻.",
        flush=True,
    )


if __name__ == "__main__":
    main()
