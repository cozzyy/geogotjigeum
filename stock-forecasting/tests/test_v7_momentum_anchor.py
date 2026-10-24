import numpy as np
import pandas as pd

from stock_forecasting.v7_momentum_anchor import (
    _add_momentum_meta_features,
    _score_with_anchor,
    _objective,
)


def test_meta_features_keep_momentum_anchor():
    n = 20
    panel = pd.DataFrame({
        "date": pd.to_datetime(["2025-01-02"] * n),
        "rank_ret_5d": np.linspace(0.05, 0.95, n),
        "rank_ret_10d": np.linspace(0.10, 0.90, n),
        "rank_ret_20d": np.linspace(0.15, 0.85, n),
        "rank_ret_60d": np.linspace(0.20, 0.80, n),
        "ret_20d": np.linspace(-0.1, 0.1, n),
        "vol_20d": np.linspace(0.1, 0.3, n),
    })
    out, cols = _add_momentum_meta_features(panel, list(panel.columns[1:]))
    assert np.allclose(out["anchor_mom20"], panel["rank_ret_20d"])
    assert "mom_alignment" in cols
    assert "risk_adj_mom20_rank" in cols


def test_lambda_zero_is_exact_anchor():
    frame = pd.DataFrame({
        "anchor_mom20": [0.2, 0.5, 0.8],
        "x": [1.0, 2.0, 3.0],
    })
    score = _score_with_anchor(None, frame, ["x"], 0.0)
    assert np.allclose(score, [0.2, 0.5, 0.8])


def test_objective_rewards_positive_signal():
    good = {
        "offset_mean_ic": 0.05,
        "offset_mean_neutral_spread": 0.005,
        "offset_positive_ic_rate": 0.60,
        "offset_positive_neutral_spread_rate": 0.60,
        "offset_std_ic": 0.01,
        "offset_std_neutral_spread": 0.001,
    }
    bad = {
        "offset_mean_ic": -0.02,
        "offset_mean_neutral_spread": -0.003,
        "offset_positive_ic_rate": 0.45,
        "offset_positive_neutral_spread_rate": 0.45,
        "offset_std_ic": 0.03,
        "offset_std_neutral_spread": 0.003,
    }
    assert _objective(good) > _objective(bad)
