import numpy as np
import pandas as pd

from stock_forecasting.v5_rank import (
    _targets,
    _nonoverlap,
    _aggregate,
    _broad_sector,
)


def test_broad_sector_mapping():
    assert _broad_sector("semi") == "tech"
    assert _broad_sector("finance") == "financial"
    assert _broad_sector("defense") == "industrial"


def test_sector_neutral_target_removes_sector_level_return():
    panel = pd.DataFrame({
        "date": pd.to_datetime(["2025-01-02"] * 6),
        "broad_sector": ["A","A","A","B","B","B"],
        "future_ret_5d": [0.10,0.11,0.12,-0.02,-0.01,0.00],
    })
    out = _targets(panel, 5)
    a = out[out["broad_sector"]=="A"]["future_sector_neutral_5d"]
    b = out[out["broad_sector"]=="B"]["future_sector_neutral_5d"]
    assert np.isclose(a.median(), 0.0)
    assert np.isclose(b.median(), 0.0)


def test_nonoverlap_keeps_every_horizon_step():
    dates = pd.bdate_range("2025-01-01", periods=20)
    daily = pd.DataFrame({
        "date": dates,
        "rank_ic_target": np.ones(20),
        "spread": np.ones(20),
        "neutral_spread": np.ones(20),
        "top_beats_median": np.ones(20),
    })
    out = _nonoverlap(daily, 5)
    assert len(out) == 4


def test_aggregate_positive_metrics():
    daily = pd.DataFrame({
        "date": pd.bdate_range("2025-01-01", periods=3),
        "rank_ic_target": [0.1,0.2,0.3],
        "spread": [0.01,0.02,0.03],
        "neutral_spread": [0.01,0.02,0.03],
        "top_beats_median": [0.6,0.7,0.8],
    })
    m = _aggregate(daily)
    assert m["mean_ic"] > 0
    assert m["positive_neutral_spread_rate"] == 1.0
