from __future__ import annotations

import argparse
import re
import time

import numpy as np
import pandas as pd

from .config import CROSS_SECTION_UNIVERSE
from .dart_data import (
    DARTProvider,
    dart_key_present,
    require_dart_key,
    diagnose_dart_key,
)
from .krx_data import (
    krx_credentials_present,
    require_krx_credentials,
    diagnose_krx_login,
)
from .v8_krx_variables import build_panel as build_v8_panel
from .v10_regime_adaptation import (
    AdaptConfig,
    v10_features,
    walk_forward_config,
    _summary,
    _yearly,
    recent_summary,
)


EARNINGS_STATE_COLS = [
    "revenue_yoy",
    "operating_profit_yoy",
    "net_income_yoy",
    "operating_margin",
    "net_margin",
    "earnings_breadth",
]

CORPORATE_EVENT_PATTERNS = {
    "contract": (
        "단일판매", "공급계약", "수주", "판매계약",
    ),
    "buyback": (
        "자기주식취득", "자기주식처분", "자기주식", "신탁계약",
    ),
    "capital": (
        "유상증자", "무상증자", "전환사채", "신주인수권부사채",
        "교환사채", "감자결정",
    ),
    "ownership": (
        "최대주주", "주식등의대량보유", "임원ㆍ주요주주",
        "임원·주요주주",
    ),
    "ma": (
        "합병", "분할", "영업양수", "영업양도", "주식교환",
        "주식이전",
    ),
    "investment": (
        "타법인주식", "신규시설투자", "시설투자", "유형자산취득",
        "유형자산양도",
    ),
    "litigation": (
        "소송", "중재", "가압류", "가처분",
    ),
}

PRELIM_EARNINGS_PATTERNS = (
    "영업(잠정)실적",
    "잠정실적",
    "매출액또는손익구조",
    "매출액 또는 손익구조",
)

PERIODIC_PATTERNS = (
    "사업보고서",
    "반기보고서",
    "분기보고서",
)


def _clean_report_name(value: str) -> str:
    s = str(value or "")
    return re.sub(r"\s+", "", s)


def is_periodic_report(report_nm: str) -> bool:
    name = _clean_report_name(report_nm)
    return any(p in name for p in PERIODIC_PATTERNS)


def is_prelim_earnings(report_nm: str) -> bool:
    name = _clean_report_name(report_nm)
    return any(_clean_report_name(p) in name for p in PRELIM_EARNINGS_PATTERNS)


def classify_corporate_event(report_nm: str) -> str | None:
    name = _clean_report_name(report_nm)
    if is_periodic_report(name) or is_prelim_earnings(name):
        return None
    for category, patterns in CORPORATE_EVENT_PATTERNS.items():
        if any(_clean_report_name(p) in name for p in patterns):
            return category
    return None


def strict_next_trade_date(
    trading_dates: pd.DatetimeIndex,
    filing_date: pd.Timestamp,
) -> pd.Timestamp | None:
    if pd.isna(filing_date) or len(trading_dates) == 0:
        return None
    dates = pd.DatetimeIndex(trading_dates).sort_values()
    pos = dates.searchsorted(pd.Timestamp(filing_date).normalize(), side="right")
    if pos >= len(dates):
        return None
    return pd.Timestamp(dates[pos])


def _days_since(index: pd.DatetimeIndex, event_mask: pd.Series) -> pd.Series:
    event_dates = pd.Series(pd.NaT, index=index, dtype="datetime64[ns]")
    mask = event_mask.astype(bool)
    event_dates.loc[mask] = index[mask.to_numpy()]
    last = event_dates.ffill()
    return pd.Series(
        (pd.Series(index, index=index) - last).dt.days.to_numpy(dtype=float),
        index=index,
    )


def _earnings_features_for_ticker(
    trading_dates: pd.DatetimeIndex,
    reports: pd.DataFrame,
    prelim_disclosures: pd.DataFrame,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    dates = pd.DatetimeIndex(sorted(trading_dates.unique()))
    out = pd.DataFrame(index=dates)
    out["dart_earnings_event_1d"] = 0.0
    for period in ["q1", "half", "q3", "annual"]:
        out[f"dart_earnings_{period}_event_1d"] = 0.0

    for col in EARNINGS_STATE_COLS:
        out[f"dart_{col}_new"] = np.nan
        out[f"dart_{col}_latest"] = np.nan

    audit_rows = []
    if reports is not None and not reports.empty:
        for _, r in reports.sort_values("filing_date").iterrows():
            filing = pd.Timestamp(r["filing_date"])
            available = strict_next_trade_date(dates, filing)
            if available is None:
                continue

            out.loc[available, "dart_earnings_event_1d"] += 1.0
            period = str(r.get("period", ""))
            if period in {"q1", "half", "q3", "annual"}:
                out.loc[
                    available, f"dart_earnings_{period}_event_1d"
                ] += 1.0

            for col in EARNINGS_STATE_COLS:
                value = pd.to_numeric(r.get(col), errors="coerce")
                if pd.notna(value):
                    out.loc[available, f"dart_{col}_new"] = float(value)
                    out.loc[available, f"dart_{col}_latest"] = float(value)

            audit_rows.append({
                "kind": "financial_report",
                "filing_date": filing,
                "available_date": available,
                "strictly_after": bool(available > filing.normalize()),
                "date_source": r.get("date_source", ""),
                "period": period,
            })

    latest_cols = [f"dart_{c}_latest" for c in EARNINGS_STATE_COLS]
    if latest_cols:
        out[latest_cols] = out[latest_cols].ffill()

    out["dart_days_since_earnings"] = _days_since(
        dates, out["dart_earnings_event_1d"] > 0
    )
    out["dart_earnings_events_20d"] = (
        out["dart_earnings_event_1d"].rolling(20, min_periods=1).sum()
    )

    out["dart_prelim_earnings_event_1d"] = 0.0
    if prelim_disclosures is not None and not prelim_disclosures.empty:
        for _, r in prelim_disclosures.iterrows():
            filing = pd.Timestamp(r["rcept_dt"])
            available = strict_next_trade_date(dates, filing)
            if available is None:
                continue
            out.loc[available, "dart_prelim_earnings_event_1d"] += 1.0
            audit_rows.append({
                "kind": "prelim_earnings",
                "filing_date": filing,
                "available_date": available,
                "strictly_after": bool(available > filing.normalize()),
                "date_source": "list",
                "period": "",
            })

    out["dart_prelim_earnings_events_20d"] = (
        out["dart_prelim_earnings_event_1d"]
        .rolling(20, min_periods=1)
        .sum()
    )
    audit = pd.DataFrame(audit_rows)
    return out, audit


def _event_features_for_ticker(
    trading_dates: pd.DatetimeIndex,
    disclosures: pd.DataFrame,
) -> tuple[pd.DataFrame, pd.DataFrame]:
    dates = pd.DatetimeIndex(sorted(trading_dates.unique()))
    out = pd.DataFrame(index=dates)
    categories = list(CORPORATE_EVENT_PATTERNS)

    out["dart_material_event_1d"] = 0.0
    out["dart_correction_event_1d"] = 0.0
    for category in categories:
        out[f"dart_event_{category}_1d"] = 0.0

    audit_rows = []
    if disclosures is not None and not disclosures.empty:
        for _, r in disclosures.dropna(subset=["rcept_dt"]).iterrows():
            report_nm = str(r.get("report_nm", ""))
            category = classify_corporate_event(report_nm)
            if category is None:
                continue

            filing = pd.Timestamp(r["rcept_dt"])
            available = strict_next_trade_date(dates, filing)
            if available is None:
                continue

            out.loc[available, "dart_material_event_1d"] += 1.0
            out.loc[available, f"dart_event_{category}_1d"] += 1.0
            if "정정" in report_nm:
                out.loc[available, "dart_correction_event_1d"] += 1.0

            audit_rows.append({
                "kind": category,
                "filing_date": filing,
                "available_date": available,
                "strictly_after": bool(available > filing.normalize()),
                "report_nm": report_nm,
            })

    roll_cols = ["dart_material_event_1d", "dart_correction_event_1d"] + [
        f"dart_event_{c}_1d" for c in categories
    ]
    for col in roll_cols:
        out[col.replace("_1d", "_5d")] = out[col].rolling(
            5, min_periods=1
        ).sum()
        out[col.replace("_1d", "_20d")] = out[col].rolling(
            20, min_periods=1
        ).sum()

    out["dart_days_since_material_event"] = _days_since(
        dates, out["dart_material_event_1d"] > 0
    )
    return out, pd.DataFrame(audit_rows)


def _add_cross_section_ranks(
    panel: pd.DataFrame,
    raw_cols: list[str],
) -> tuple[pd.DataFrame, list[str]]:
    out = panel.copy()
    created = {}
    for c in raw_cols:
        if c not in out.columns:
            continue
        # Sparse one-day event indicators are not useful as continuous ranks.
        if c.endswith("_1d") or c.endswith("_5d") or c.endswith("_20d"):
            continue
        created[f"rank_{c}"] = out.groupby("date")[c].rank(
            pct=True, method="average"
        )
        created[f"sector_rank_{c}"] = out.groupby(
            ["date", "broad_sector"]
        )[c].rank(pct=True, method="average")

    if created:
        out = pd.concat(
            [out, pd.DataFrame(created, index=out.index)], axis=1
        )
    return out, list(created)


def merge_dart_features(
    panel: pd.DataFrame,
    refresh: bool = False,
) -> tuple[pd.DataFrame, dict[str, list[str]], pd.DataFrame]:
    provider = DARTProvider(refresh=refresh)
    pieces = []
    audit_parts = []

    earnings_raw_template = None
    events_raw_template = None

    tickers = list(panel["ticker"].drop_duplicates())
    start = pd.Timestamp(panel["date"].min())
    end = pd.Timestamp(panel["date"].max())
    start_year = start.year
    end_year = end.year

    for i, ticker in enumerate(tickers, 1):
        name = CROSS_SECTION_UNIVERSE.get(ticker, {}).get("name", ticker)
        print(
            f"[DART {i}/{len(tickers)}] {ticker} {name} "
            "실적/공시 이벤트...",
            flush=True,
        )
        base = panel[panel["ticker"] == ticker].copy()
        dates = pd.DatetimeIndex(base["date"].sort_values().unique())

        try:
            disclosures = provider.disclosures(ticker, start, end)
            reports = provider.financial_reports(
                ticker, start_year, end_year
            )
        except Exception as exc:
            print(f"    DART 실패: {exc}", flush=True)
            continue

        prelim = (
            disclosures[
                disclosures["report_nm"].astype(str).map(is_prelim_earnings)
            ].copy()
            if not disclosures.empty and "report_nm" in disclosures.columns
            else pd.DataFrame()
        )

        earnings, earnings_audit = _earnings_features_for_ticker(
            dates, reports, prelim
        )
        events, events_audit = _event_features_for_ticker(
            dates, disclosures
        )

        feat = pd.concat([earnings, events], axis=1)
        feat["date"] = feat.index
        feat["ticker"] = ticker
        pieces.append(feat.reset_index(drop=True))

        if earnings_raw_template is None:
            earnings_raw_template = list(earnings.columns)
        if events_raw_template is None:
            events_raw_template = list(events.columns)

        if not earnings_audit.empty:
            earnings_audit["ticker"] = ticker
            audit_parts.append(earnings_audit)
        if not events_audit.empty:
            events_audit["ticker"] = ticker
            audit_parts.append(events_audit)

    if not pieces:
        raise RuntimeError(
            "DART feature가 한 종목도 생성되지 않았습니다. "
            "DART_API_KEY와 OpenDART 응답을 확인하세요."
        )

    dart = pd.concat(pieces, ignore_index=True)
    out = panel.merge(dart, on=["date", "ticker"], how="left")

    earnings_raw = list(earnings_raw_template or [])
    event_raw = list(events_raw_template or [])

    # Event counts are zero when no filing occurred; state variables remain NaN
    # until the first known report/event.
    count_cols = [
        c for c in earnings_raw + event_raw
        if c.endswith(("_1d", "_5d", "_20d"))
    ]
    for c in count_cols:
        if c in out.columns:
            out[c] = out[c].fillna(0.0)

    rank_candidates = [
        c for c in earnings_raw
        if c.endswith("_latest") or c.startswith("dart_days_since_")
    ]
    out, rank_cols = _add_cross_section_ranks(out, rank_candidates)

    earnings_rank = [
        c for c in rank_cols
        if any(
            c.endswith(x) for x in rank_candidates
            if x in earnings_raw
        )
    ]
    event_rank = [
        c for c in rank_cols
        if any(
            c.endswith(x) for x in rank_candidates
            if x in event_raw
        )
    ]

    groups = {
        "earnings": list(dict.fromkeys(earnings_raw + earnings_rank)),
        "events": list(dict.fromkeys(event_raw + event_rank)),
    }

    audit = (
        pd.concat(audit_parts, ignore_index=True)
        if audit_parts else pd.DataFrame()
    )
    return out.replace([np.inf, -np.inf], np.nan), groups, audit


def dart_coverage(
    panel: pd.DataFrame,
    groups: dict[str, list[str]],
    audit: pd.DataFrame,
) -> pd.DataFrame:
    rows = []
    for group_name, cols in groups.items():
        existing = [c for c in cols if c in panel.columns]
        state = [
            c for c in existing
            if c.endswith("_latest")
        ]
        event_cols = [
            c for c in existing if c.endswith("_1d")
        ]
        rows.append({
            "group": group_name,
            "features": len(existing),
            "state_coverage": float(
                panel[state].notna().mean().mean()
            ) if state else np.nan,
            "event_count": float(
                panel[event_cols].sum().sum()
            ) if event_cols else 0.0,
        })

    if not audit.empty:
        rows.append({
            "group": "point_in_time_audit",
            "features": int(len(audit)),
            "state_coverage": float(audit["strictly_after"].mean()),
            "event_count": float((~audit["strictly_after"]).sum()),
        })
    return pd.DataFrame(rows)


def feature_sets(
    base: list[str],
    dart_groups: dict[str, list[str]],
) -> dict[str, list[str]]:
    e = dart_groups.get("earnings", [])
    v = dart_groups.get("events", [])

    def u(*parts):
        return list(dict.fromkeys(x for part in parts for x in part))

    return {
        "base_only": list(base),
        "base_plus_earnings": u(base, e),
        "base_plus_events": u(base, v),
        "base_plus_earnings_events": u(base, e, v),
        "dart_only": u(e, v),
    }


def main():
    p = argparse.ArgumentParser(
        description="V11 OpenDART earnings/event incremental-signal study"
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--refresh-dart", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V11 DART Earnings + Corporate Events ===", flush=True)
    print(
        f"KRX credential env: {'있음' if krx_credentials_present() else '없음'}",
        flush=True,
    )
    print(
        f"DART_API_KEY env: {'있음' if dart_key_present() else '없음'}",
        flush=True,
    )

    require_krx_credentials()
    krx_diag = diagnose_krx_login()
    if not krx_diag.get("ok"):
        raise RuntimeError(
            "KRX login preflight 실패: "
            f"code={krx_diag.get('error_code')} "
            f"message={krx_diag.get('error_message')}"
        )

    require_dart_key()
    dart_diag = diagnose_dart_key()
    if not dart_diag.get("ok"):
        raise RuntimeError(
            "OpenDART preflight 실패: "
            f"status={dart_diag.get('status', '-')} "
            f"message={dart_diag.get('message', '-')}"
        )
    print(
        "OpenDART preflight 성공: "
        f"corp_count={dart_diag.get('corp_count', '-')}, "
        f"005930={'찾음' if dart_diag.get('samsung_found') else '미확인'}",
        flush=True,
    )

    t0 = time.perf_counter()
    panel, groups = build_v8_panel(
        start=args.start,
        horizon=args.horizon,
        max_tickers=args.max_tickers,
        refresh_krx=args.refresh_krx,
    )
    base_features, counts = v10_features(groups)
    panel, dart_groups, audit = merge_dart_features(
        panel, refresh=args.refresh_dart
    )

    print(
        f"panel: {panel['ticker'].nunique()}종목, "
        f"{panel['date'].nunique()}일, {len(panel):,} rows "
        f"({time.perf_counter()-t0:.1f}초)",
        flush=True,
    )
    print(
        "base features: "
        + ", ".join(f"{k}={v}" for k, v in counts.items()),
        flush=True,
    )
    print(
        "DART features: "
        + ", ".join(f"{k}={len(v)}" for k, v in dart_groups.items()),
        flush=True,
    )

    cov = dart_coverage(panel, dart_groups, audit)
    print("\n=== DART coverage / point-in-time audit ===")
    with pd.option_context("display.max_columns", None, "display.width", 220):
        print(
            cov.to_string(
                index=False, float_format=lambda x: f"{x:.4f}"
            )
        )

    if not audit.empty:
        violations = audit[~audit["strictly_after"]]
        fallback = audit[
            audit.get("date_source", pd.Series(index=audit.index, dtype=str))
            == "rcept_no_prefix"
        ]
        print(
            f"timeline audit: {len(audit):,} events, "
            f"same-day/earlier violations={len(violations)}, "
            f"financial filing-date fallback={len(fallback)}",
            flush=True,
        )
        if len(violations):
            raise RuntimeError(
                "DART point-in-time audit 실패: 공시일 당일 또는 이전에 "
                "feature가 활성화된 행이 있습니다."
            )

    sets = feature_sets(base_features, dart_groups)
    cfg = AdaptConfig("rolling_3y", 3, None)
    test_months = 12 if args.fast else 6

    rows = []
    yearly_blocks = []
    total = len(sets)

    for i, (name, cols) in enumerate(sets.items(), 1):
        print(
            f"[{i}/{total}] variables={name} features={len(cols)}",
            flush=True,
        )
        t1 = time.perf_counter()
        pred, daily = walk_forward_config(
            panel,
            cols,
            cfg,
            args.horizon,
            test_months,
            args.fast,
        )
        if pred.empty:
            continue

        s = _summary(daily, args.horizon)
        r = recent_summary(daily, 2025)
        y = _yearly(daily)
        rows.append({
            "variables": name,
            "features": len(cols),
            **s,
            **r,
            "positive_ic_year_rate": (
                float((y["mean_ic"] > 0).mean()) if not y.empty else np.nan
            ),
            "positive_neutral_year_rate": (
                float((y["mean_neutral_spread"] > 0).mean())
                if not y.empty else np.nan
            ),
            "worst_year_ic": (
                float(y["mean_ic"].min()) if not y.empty else np.nan
            ),
            "worst_year_neutral_spread": (
                float(y["mean_neutral_spread"].min())
                if not y.empty else np.nan
            ),
        })
        if not y.empty:
            yy = y.copy()
            yy.insert(0, "variables", name)
            yearly_blocks.append(yy)

        print(
            f"    {time.perf_counter()-t1:.1f}초 | "
            f"IC={s['offset_mean_ic']:.4f} | "
            f"neutral spread={s['offset_mean_neutral_spread']:.4%} | "
            f"recent IC={r.get('recent_mean_ic', np.nan):.4f} | "
            f"recent spread={r.get('recent_mean_neutral_spread', np.nan):.4%}",
            flush=True,
        )

    report = pd.DataFrame(rows)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    base = report[report["variables"] == "base_only"]
    if not base.empty:
        b = base.iloc[0]
        report["delta_ic_vs_base"] = (
            report["offset_mean_ic"] - b["offset_mean_ic"]
        )
        report["delta_neutral_spread_vs_base"] = (
            report["offset_mean_neutral_spread"]
            - b["offset_mean_neutral_spread"]
        )
        report["delta_recent_ic_vs_base"] = (
            report["recent_mean_ic"] - b["recent_mean_ic"]
        )
        report["delta_recent_spread_vs_base"] = (
            report["recent_mean_neutral_spread"]
            - b["recent_mean_neutral_spread"]
        )

    cols = [
        "variables", "features", "oos_days",
        "offset_mean_ic", "offset_std_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "positive_ic_year_rate", "positive_neutral_year_rate",
        "worst_year_ic", "worst_year_neutral_spread",
        "recent_mean_ic", "recent_positive_ic_rate",
        "recent_mean_neutral_spread",
        "recent_positive_neutral_spread_rate",
        "delta_ic_vs_base", "delta_neutral_spread_vs_base",
        "delta_recent_ic_vs_base", "delta_recent_spread_vs_base",
    ]

    print("\n=== V11 DART Incremental-Signal Ablation ===")
    with pd.option_context("display.max_columns", None, "display.width", 340):
        print(
            report[cols].to_string(
                index=False, float_format=lambda x: f"{x:.4f}"
            )
        )

    if yearly_blocks:
        yearly = pd.concat(yearly_blocks, ignore_index=True)
        print("\n=== V11 연도별 OOS 안정성 ===")
        with pd.option_context("display.max_rows", 200, "display.width", 260):
            print(
                yearly.to_string(
                    index=False, float_format=lambda x: f"{x:.4f}"
                )
            )

    print(
        "\n판정 핵심:\n"
        "1) base_plus_earnings가 base_only 대비 전체/최근 IC와 spread를 개선하는가\n"
        "2) base_plus_events가 earnings와 별도로 incremental signal을 주는가\n"
        "3) earnings+events 결합이 단일 추가보다 안정적인가\n"
        "4) 2025+ recent spread가 여전히 음수면 DART 정보만으로 최근 regime 문제는 해결되지 않은 것\n"
        "5) 모든 DART feature는 공시 접수일 다음 거래일부터만 활성화되어야 함",
        flush=True,
    )


if __name__ == "__main__":
    main()
