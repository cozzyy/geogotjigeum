import numpy as np
import pandas as pd

from stock_forecasting.advanced_v2 import (
    advanced_recipes,
    selective_table,
    _weights,
    _base_rate,
)


def test_advanced_recipes_include_semiconductor_inputs():
    cols = [
        "ret_1d", "gap_return", "intraday_return", "reversal_1x5",
        "atr14", "volume_ratio_5",
        "kospi_ret_1d", "excess_vs_kospi_1d",
        "sox_ret_1d", "smh_ret_1d", "micron_ret_1d", "nvda_ret_1d",
        "memory_shock", "ai_chip_shock", "vix_ret_1d", "tnx_ret_1d",
        "usdkrw_ret_1d",
    ]
    recipes = advanced_recipes(cols)
    assert "semi_macro" in recipes
    assert "micron_ret_1d" in recipes["semi_macro"]
    assert "vix_ret_1d" in recipes["semi_macro"]
    assert "usdkrw_ret_1d" not in recipes["semi_macro"]
    assert "usdkrw_ret_1d" in recipes["semi_macro_fx"]


def test_time_decay_weights_favor_recent_rows():
    w = _weights(100, 50)
    assert w is not None
    assert w[-1] > w[0]
    assert np.isclose(w.mean(), 1.0)


def test_base_rate_is_smoothed():
    y = pd.Series([1, 1, 0, 1])
    p = _base_rate(y)
    assert 0 < p < 1


def test_selective_table_reduces_coverage_for_higher_thresholds():
    idx = pd.bdate_range("2025-01-01", periods=8)
    pred = pd.DataFrame({
        "prob_up": [0.51, 0.49, 0.52, 0.48, 0.60, 0.40, 0.70, 0.30],
        "actual_up": [1, 0, 1, 0, 1, 0, 1, 0],
    }, index=idx)
    table = selective_table(pred)
    assert table.iloc[0]["coverage"] == 1.0
    assert table["coverage"].is_monotonic_decreasing
