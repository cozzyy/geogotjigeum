import numpy as np
import pandas as pd

from stock_forecasting.dart_data import (
    _growth,
    _parse_number,
)
from stock_forecasting.v11_earnings_events import (
    classify_corporate_event,
    feature_sets,
    is_prelim_earnings,
    strict_next_trade_date,
)


def test_parse_number_and_growth():
    assert _parse_number("1,234") == 1234.0
    assert _parse_number("(1,234)") == -1234.0
    assert np.isclose(_growth(120.0, 100.0), 0.2)


def test_strict_next_trade_date_never_uses_filing_day():
    dates = pd.DatetimeIndex(pd.to_datetime([
        "2026-03-13", "2026-03-16", "2026-03-17"
    ]))
    assert strict_next_trade_date(
        dates, pd.Timestamp("2026-03-13")
    ) == pd.Timestamp("2026-03-16")


def test_event_classifier_separates_prelim_and_corporate_events():
    assert is_prelim_earnings("영업(잠정)실적(공정공시)") is True
    assert classify_corporate_event("영업(잠정)실적(공정공시)") is None
    assert classify_corporate_event("단일판매ㆍ공급계약체결") == "contract"
    assert classify_corporate_event("자기주식취득결정") == "buyback"
    assert classify_corporate_event("유상증자결정") == "capital"


def test_feature_sets_keep_clean_ablation():
    sets = feature_sets(
        ["p1", "p2"],
        {"earnings": ["e1"], "events": ["v1", "v2"]},
    )
    assert sets["base_only"] == ["p1", "p2"]
    assert sets["base_plus_earnings"] == ["p1", "p2", "e1"]
    assert sets["base_plus_events"] == ["p1", "p2", "v1", "v2"]
    assert sets["dart_only"] == ["e1", "v1", "v2"]
