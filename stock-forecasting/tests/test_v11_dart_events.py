import pandas as pd

from stock_forecasting.v11_dart_events import (
    _event_daily_frame,
    classify_report,
)


def test_classify_report_key_event_types():
    assert classify_report("연결재무제표기준영업(잠정)실적") == "earnings"
    assert classify_report("분기보고서 (2026.03)") == "periodic"
    assert classify_report("단일판매ㆍ공급계약체결") == "contract"
    assert classify_report("유상증자결정") == "capital"
    assert classify_report("자기주식취득결정") == "treasury"
    assert classify_report("현금ㆍ현물배당결정") == "dividend"


def test_disclosure_becomes_active_next_trading_day_not_same_day():
    dates = pd.DatetimeIndex([
        "2026-09-18",
        "2026-09-21",
        "2026-09-22",
    ])
    disclosures = pd.DataFrame([{
        "rcept_dt": pd.Timestamp("2026-09-18"),
        "report_nm": "연결재무제표기준영업(잠정)실적",
        "rcept_no": "20260918000001",
    }])

    features, stats = _event_daily_frame(dates, disclosures)

    assert features.loc[pd.Timestamp("2026-09-18"), "dart_earnings_1d"] == 0
    assert features.loc[pd.Timestamp("2026-09-21"), "dart_earnings_1d"] == 1
    assert stats["category_earnings"] == 1


def test_amendment_not_double_counted_as_new_earnings_event():
    dates = pd.DatetimeIndex(["2026-09-21", "2026-09-22"])
    disclosures = pd.DataFrame([{
        "rcept_dt": pd.Timestamp("2026-09-21"),
        "report_nm": "[기재정정] 연결재무제표기준영업(잠정)실적",
        "rcept_no": "20260921000001",
    }])

    features, stats = _event_daily_frame(dates, disclosures)

    assert features.loc[pd.Timestamp("2026-09-22"), "dart_amendment_1d"] == 1
    assert features.loc[pd.Timestamp("2026-09-22"), "dart_earnings_1d"] == 0
    assert stats["amendments"] == 1
