import numpy as np
import pandas as pd

from stock_forecasting.v10_regime_adaptation import (
    _sample_weights,
    v10_features,
)


def test_sample_weights_emphasize_recent_rows():
    dates = pd.Series(pd.to_datetime([
        "2023-01-01", "2024-01-01", "2025-01-01"
    ]))
    w = _sample_weights(dates, pd.Timestamp("2025-01-01"), 1.0)
    assert w is not None
    assert 0 < w[0] < w[1] < w[2] <= 1.0
    assert np.isclose(w[2], 1.0)


def test_no_weighting_returns_none():
    dates = pd.Series(pd.to_datetime(["2024-01-01", "2025-01-01"]))
    assert _sample_weights(dates, pd.Timestamp("2025-01-01"), None) is None


def test_v10_features_keep_size_and_safe_valuation_only():
    groups = {
        "price": ["ret_5d", "rank_ret_20d"],
        "flow": ["foreign_net_ratio_5d"],
        "size_liquidity": [
            "log_market_cap",
            "rank_log_market_cap",
            "turnover_value",
        ],
        "fundamental": [
            "earnings_yield",
            "rank_earnings_yield",
            "book_to_market",
            "pbr_clean",
            "dividend_yield",
            "dps_level",
            "eps_level",
            "bps_level",
        ],
    }
    cols, counts = v10_features(groups)
    assert "log_market_cap" in cols
    assert "earnings_yield" in cols
    assert "dividend_yield" in cols
    assert "foreign_net_ratio_5d" not in cols
    assert "dps_level" not in cols
    assert "eps_level" not in cols
    assert "bps_level" not in cols
    assert counts["size_liquidity"] == 3
