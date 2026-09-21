from __future__ import annotations

import argparse
import time

import numpy as np
import pandas as pd

from .config import CROSS_SECTION_UNIVERSE
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
from .v8_krx_variables import build_panel as build_v8_panel
from .v10_regime_adaptation import (
    AdaptConfig,
    _summary,
    _yearly,
    recent_summary,
    v10_features,
    walk_forward_config,
)


EVENT_CATEGORIES = (
    "earnings",
    "periodic",
    "contract",
    "capital",
    "debt",
    "treasury",
    "dividend",
    "ma_reorg",
    "ownership",
    "investment",
    "litigation",
    "governance",
)


def _is_amendment(report_name: str) -> bool:
    text = str(report_name or "")
    return any(
        marker in text
        for marker in (
            "[기재정정]",
            "[첨부정정]",
            "[정정]",
            "[변경등록]",
            "[정정명령부과]",
            "[정정제출요구]",
        )
    )


def classify_report(report_name: str) -> str | None:
    text = str(report_name or "").replace(" ", "")

    if any(x in text for x in (
        "잠정실적",
        "영업실적",
        "매출액또는손익구조",
        "매출액또는손익",
    )):
        return "earnings"

    if any(x in text for x in ("사업보고서", "반기보고서", "분기보고서")):
        return "periodic"

    if any(x in text for x in (
        "단일판매", "공급계약", "판매ㆍ공급계약", "판매·공급계약",
    )):
        return "contract"

    if any(x in text for x in (
        "유상증자", "무상증자", "감자결정", "증자결정",
    )):
        return "capital"

    if any(x in text for x in (
        "전환사채", "신주인수권부사채", "교환사채", "사채권발행",
    )):
        return "debt"

    if "자기주식" in text or "자사주" in text:
        return "treasury"

    if "배당" in text:
        return "dividend"

    if any(x in text for x in (
        "합병", "회사분할", "분할결정", "주식교환",
        "영업양수", "영업양도", "분할합병",
    )):
        return "ma_reorg"

    if any(x in text for x in (
        "최대주주", "대량보유", "주요주주",
    )):
        return "ownership"

    if any(x in text for x in (
        "타법인주식", "신규시설투자", "시설투자", "투자결정",
    )):
        return "investment"

    if "소송" in text or "중재" in text:
        return "litigation"

    if any(x in text for x in (
        "대표이사변경", "주주총회", "이사선임", "감사선임",
    )):
        return "governance"

    return None


def _event_daily_frame(
    trading_dates: pd.DatetimeIndex,
    disclosures: pd.DataFrame,
) -> tuple[pd.DataFrame, dict[str, int]]:
    dates = pd.DatetimeIndex(
        pd.to_datetime(trading_dates).tz_localize(None).normalize()
    ).sort_values().unique()

    base_cols = ["event", "amendment", *EVENT_CATEGORIES]
    daily = pd.DataFrame(0.0, index=dates, columns=base_cols)
    stats = {
        "raw_disclosures": 0,
        "mapped_disclosures": 0,
        "amendments": 0,
        **{f"category_{c}": 0 for c in EVENT_CATEGORIES},
    }

    if disclosures is None or disclosures.empty:
        return _engineer_event_features(daily), stats

    for _, row in disclosures.iterrows():
        event_date = pd.Timestamp(row.get("rcept_dt")).normalize()
        if pd.isna(event_date):
            continue

        # list.json exposes filing date but not filing time.
        # Never expose a disclosure on its filing date: activate it from
        # the first strictly later trading day to block after-close leakage.
        pos = int(dates.searchsorted(event_date, side="right"))
        if pos >= len(dates):
            continue
        effective = dates[pos]

        report_name = str(row.get("report_nm", ""))
        amendment = _is_amendment(report_name)
        category = classify_report(report_name)

        stats["raw_disclosures"] += 1
        stats["mapped_disclosures"] += 1

        if amendment:
            daily.loc[effective, "amendment"] += 1.0
            stats["amendments"] += 1
            continue

        daily.loc[effective, "event"] += 1.0
        if category is not None:
            daily.loc[effective, category] += 1.0
            stats[f"category_{category}"] += 1

    return _engineer_event_features(daily), stats


def _engineer_event_features(daily: pd.DataFrame) -> pd.DataFrame:
    out = pd.DataFrame(index=daily.index)

    for c in daily.columns:
        source = daily[c].astype(float)
        stem = f"dart_{c}"
        out[f"{stem}_1d"] = source
        out[f"{stem}_5d"] = source.rolling(5, min_periods=1).sum()
        out[f"{stem}_20d"] = source.rolling(20, min_periods=1).sum()

        values = source.to_numpy()
        last = -1
        days_since = np.full(len(source), 999.0)
        for i, value in enumerate(values):
            if value > 0:
                last = i
            if last >= 0:
                days_since[i] = i - last

        days_since = np.minimum(days_since, 252.0)
        out[f"{stem}_days_since"] = days_since
        decay = np.exp(-days_since / 20.0)
        decay[days_since >= 252.0] = 0.0
        out[f"{stem}_recency20"] = decay

    return out


def _rank_event_features(
    panel: pd.DataFrame,
    cols: list[str],
) -> tuple[pd.DataFrame, list[str]]:
    ranks = {}
    for c in cols:
        if c not in panel.columns:
            continue
        value = -panel[c] if c.endswith("_days_since") else panel[c]
        ranks[f"rank_{c}"] = value.groupby(panel["date"]).rank(
            pct=True, method="average"
        )
        ranks[f"sector_rank_{c}"] = value.groupby(
            [panel["date"], panel["broad_sector"]]
        ).rank(pct=True, method="average")

    if ranks:
        panel = pd.concat(
            [panel, pd.DataFrame(ranks, index=panel.index)],
            axis=1,
        )
    return panel, list(ranks.keys())


def add_dart_event_features(
    panel: pd.DataFrame,
    provider: DARTProvider,
) -> tuple[pd.DataFrame, dict[str, list[str]], pd.DataFrame]:
    tickers = list(panel["ticker"].drop_duplicates())
    mapping = provider.stock_to_corp_code(tickers)
    missing = [t for t in tickers if t not in mapping]
    if missing:
        raise RuntimeError(
            "DART corp_code 매핑 실패 종목: " + ", ".join(missing)
        )

    start = pd.Timestamp(panel["date"].min())
    end = pd.Timestamp(panel["date"].max())
    feature_parts = []
    stat_rows = []

    for i, ticker in enumerate(tickers, 1):
        name = CROSS_SECTION_UNIVERSE.get(ticker, {}).get("name", ticker)
        print(
            f"[DART {i}/{len(tickers)}] {ticker} {name} 공시...",
            flush=True,
        )
        disclosures = provider.disclosures(
            mapping[ticker],
            start,
            end,
        )

        dates = pd.DatetimeIndex(
            panel.loc[panel["ticker"] == ticker, "date"].sort_values().unique()
        )
        features, stats = _event_daily_frame(dates, disclosures)
        features["date"] = features.index
        features["ticker"] = ticker
        feature_parts.append(features.reset_index(drop=True))
        stat_rows.append({
            "ticker": ticker,
            "name": name,
            "corp_code": mapping[ticker],
            **stats,
        })

    event_frame = pd.concat(feature_parts, ignore_index=True)
    out = panel.merge(event_frame, on=["date", "ticker"], how="left")

    raw_cols = [
        c for c in event_frame.columns
        if c not in {"date", "ticker"}
    ]
    out[raw_cols] = out[raw_cols].fillna(0.0)
    out, rank_cols = _rank_event_features(out, raw_cols)

    all_event = list(dict.fromkeys(raw_cols + rank_cols))
    earnings_tokens = ("dart_earnings_", "dart_periodic_")
    earnings = [
        c for c in all_event
        if any(token in c for token in earnings_tokens)
    ]
    corporate = [
        c for c in all_event
        if c not in earnings
        and (
            "dart_event_" in c
            or "dart_amendment_" in c
            or any(
                f"dart_{category}_" in c
                for category in EVENT_CATEGORIES
                if category not in {"earnings", "periodic"}
            )
        )
    ]

    groups = {
        "dart_earnings": earnings,
        "dart_corporate": corporate,
        "dart_all": all_event,
    }
    return (
        out.replace([np.inf, -np.inf], np.nan),
        groups,
        pd.DataFrame(stat_rows),
    )


def dart_coverage(stats: pd.DataFrame) -> pd.DataFrame:
    if stats.empty:
        return pd.DataFrame()
    cols = [
        "raw_disclosures",
        "amendments",
        *[f"category_{c}" for c in EVENT_CATEGORIES],
    ]
    rows = []
    for c in cols:
        rows.append({
            "event": c,
            "total": int(stats[c].sum()),
            "tickers_with_event": int((stats[c] > 0).sum()),
        })
    return pd.DataFrame(rows)


def main():
    p = argparse.ArgumentParser(
        description="V11 DART earnings/event information ablation"
    )
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--horizon", type=int, default=5, choices=[5, 20])
    p.add_argument("--max-tickers", type=int, default=None)
    p.add_argument("--refresh-krx", action="store_true")
    p.add_argument("--refresh-dart", action="store_true")
    p.add_argument("--fast", action="store_true")
    args = p.parse_args()

    print("=== V11 DART Earnings / Corporate Events ===", flush=True)
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
    print(
        f"OpenDART preflight 성공: listed corp rows="
        f"{dart_diag.get('listed_rows'):,}",
        flush=True,
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
        "DART features: "
        + ", ".join(f"{k}={len(v)}" for k, v in dart_groups.items()),
        flush=True,
    )
    print(
        "point-in-time rule: 모든 공시는 접수일 당일이 아니라 "
        "다음 거래일부터 feature 활성화",
        flush=True,
    )

    cov = dart_coverage(event_stats)
    print("\n=== DART event coverage ===")
    if not cov.empty:
        print(cov.to_string(index=False))

    feature_sets = {
        "base_v10": base_features,
        "base_plus_earnings_events": list(dict.fromkeys(
            base_features + dart_groups["dart_earnings"]
        )),
        "base_plus_corporate_events": list(dict.fromkeys(
            base_features + dart_groups["dart_corporate"]
        )),
        "base_plus_all_dart": list(dict.fromkeys(
            base_features + dart_groups["dart_all"]
        )),
        "dart_only": dart_groups["dart_all"],
    }

    cfg = AdaptConfig("rolling_3y", 3, None)
    test_months = 12 if args.fast else 6
    rows = []

    for i, (name, features) in enumerate(feature_sets.items(), 1):
        print(
            f"[{i}/{len(feature_sets)}] {name} features={len(features)}",
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
        if pred.empty:
            continue

        summary = _summary(daily, args.horizon)
        recent = recent_summary(daily, 2025)
        yearly = _yearly(daily)

        rows.append({
            "variables": name,
            "features": len(features),
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
        })

        print(
            f"    {time.perf_counter()-t1:.1f}초 | "
            f"IC={summary['offset_mean_ic']:.4f} | "
            f"spread={summary['offset_mean_neutral_spread']:.4%} | "
            f"recent IC={recent.get('recent_mean_ic', np.nan):.4f} | "
            f"recent spread="
            f"{recent.get('recent_mean_neutral_spread', np.nan):.4%}",
            flush=True,
        )

    report = pd.DataFrame(rows)
    if report.empty:
        print("검증 결과가 없습니다.")
        return

    base = report.loc[report["variables"] == "base_v10"].iloc[0]
    report["delta_ic_vs_base"] = (
        report["offset_mean_ic"] - base["offset_mean_ic"]
    )
    report["delta_neutral_spread_vs_base"] = (
        report["offset_mean_neutral_spread"]
        - base["offset_mean_neutral_spread"]
    )
    report["delta_recent_ic_vs_base"] = (
        report["recent_mean_ic"] - base["recent_mean_ic"]
    )
    report["delta_recent_spread_vs_base"] = (
        report["recent_mean_neutral_spread"]
        - base["recent_mean_neutral_spread"]
    )

    cols = [
        "variables", "features", "oos_days",
        "offset_mean_ic", "offset_positive_ic_rate",
        "offset_mean_neutral_spread",
        "offset_positive_neutral_spread_rate",
        "positive_ic_year_rate", "positive_neutral_year_rate",
        "recent_mean_ic", "recent_positive_ic_rate",
        "recent_mean_neutral_spread",
        "recent_positive_neutral_spread_rate",
        "delta_ic_vs_base", "delta_neutral_spread_vs_base",
        "delta_recent_ic_vs_base", "delta_recent_spread_vs_base",
    ]

    print("\n=== V11 DART 정보 추가 Ablation ===")
    with pd.option_context("display.max_columns", None, "display.width", 340):
        print(
            report[cols].to_string(
                index=False,
                float_format=lambda x: f"{x:.4f}",
            )
        )

    print(
        "\n판정 핵심:\n"
        "1) base_plus_earnings_events가 base_v10 대비 최근 IC/spread를 개선하는가\n"
        "2) corporate events도 독립적인 incremental value가 있는가\n"
        "3) all_dart가 개별 event block보다 나쁘면 정보 과다/노이즈 가능성\n"
        "4) dart_only가 양수여도 base 결합에서 개선되지 않으면 중복정보 가능성\n"
        "5) DART 공시는 접수일 다음 거래일부터만 사용하므로 same-day timing leakage를 차단",
        flush=True,
    )


if __name__ == "__main__":
    main()
