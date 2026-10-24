import numpy as np
import pandas as pd

from stock_forecasting.v6_robust import (
    _offset_metrics,
    _apply_train_window,
    _stock_features,
)


def _ohlcv(n=400):
    idx = pd.bdate_range("2024-01-01", periods=n)
    rng = np.random.default_rng(7)
    close = 100 * np.exp(np.cumsum(rng.normal(0.0003, 0.012, n)))
    open_ = close * (1 + rng.normal(0, 0.002, n))
    high = np.maximum(open_, close) * (1 + rng.uniform(0.001, 0.01, n))
    low = np.minimum(open_, close) * (1 - rng.uniform(0.001, 0.01, n))
    volume = rng.integers(100000, 500000, n)
    return pd.DataFrame(
        {"open": open_, "high": high, "low": low, "close": close, "volume": volume},
        index=idx,
    )


def test_stock_features_include_liquidity_signals():
    f = _stock_features(_ohlcv(), 5)
    assert "value_ratio_20" in f.columns
    assert "amihud20" in f.columns
    assert "downside_vol20" in f.columns
    assert "future_ret_5d" in f.columns


def test_train_window_limits_history():
    dates = pd.bdate_range("2018-01-01", "2026-01-01")
    frame = pd.DataFrame({"date": dates, "x": 1})
    start = pd.Timestamp("2025-01-01")
    out = _apply_train_window(frame, start, 3)
    assert out["date"].min() >= pd.Timestamp("2022-01-01")


def test_offset_metrics_uses_all_offsets():
    dates = pd.bdate_range("2025-01-01", periods=50)
    daily = pd.DataFrame({
        "date": dates,
        "rank_ic": np.linspace(-0.1, 0.2, 50),
        "neutral_ic": np.linspace(-0.1, 0.2, 50),
        "spread": np.linspace(-0.01, 0.02, 50),
        "neutral_spread": np.linspace(-0.01, 0.02, 50),
        "top_beats_median": np.linspace(0.4, 0.7, 50),
    })
    detail, summary = _offset_metrics(daily, 5)
    assert len(detail) == 5
    assert set(detail["offset"]) == {0, 1, 2, 3, 4}
    assert "offset_std_ic" in summary
    assert "offset_mean_neutral_spread" in summary
