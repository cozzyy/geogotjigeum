import numpy as np
import pandas as pd

from stock_forecasting.v8_krx_variables import (
    _flow_features,
    _fundamental_size_features,
    _rank_new_features,
)


def test_flow_features_create_multi_horizon_ratios():
    dates = pd.bdate_range("2025-01-01", periods=30)
    panel = pd.DataFrame({
        "date": dates,
        "ticker": ["A"] * 30,
        "broad_sector": ["tech"] * 30,
        "krx_traded_value": np.full(30, 1_000_000.0),
        "foreign_net": np.arange(30) * 1000.0,
        "institution_net": np.arange(30)[::-1] * 500.0,
        "individual_net": -np.arange(30) * 800.0,
    })
    out, cols = _flow_features(panel)
    assert "foreign_net_ratio_20d" in cols
    assert "smart_money_ratio_5d" in cols
    assert "foreign_inst_agree" in cols
    assert out["foreign_net_ratio_20d"].notna().sum() > 0


def test_fundamental_features_include_valuation_and_size():
    panel = pd.DataFrame({
        "ticker": ["A"] * 25,
        "market_cap": np.linspace(1e12, 1.2e12, 25),
        "krx_traded_value": np.linspace(1e9, 2e9, 25),
        "listed_shares": np.full(25, 1e8),
        "per": np.full(25, 10.0),
        "pbr": np.full(25, 1.5),
        "eps": np.r_[np.full(20, 1000.0), np.full(5, 1200.0)],
        "bps": np.full(25, 20000.0),
        "div_yield": np.full(25, 2.0),
        "dps": np.full(25, 400.0),
    })
    out, fund, size = _fundamental_size_features(panel)
    assert "earnings_yield" in fund
    assert "eps_update_event" in fund
    assert "log_market_cap" in size
    assert "turnover_value" in size
    assert np.isclose(out["earnings_yield"].iloc[0], 0.1)


def test_rank_new_features_are_cross_sectional():
    panel = pd.DataFrame({
        "date": pd.to_datetime(["2025-01-02"] * 4),
        "broad_sector": ["tech", "tech", "finance", "finance"],
        "x": [1.0, 2.0, 3.0, 4.0],
    })
    out, cols = _rank_new_features(panel, ["x"])
    assert "rank_x" in cols
    assert np.isclose(out["rank_x"].max(), 1.0)
