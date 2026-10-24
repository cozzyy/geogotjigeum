import numpy as np
import pandas as pd

from stock_forecasting.v4_cross_section import (
    _add_targets,
    _rank_features,
    _daily_rank_metrics,
)


def test_cross_section_target_marks_top_and_bottom():
    rows = []
    for d in pd.to_datetime(["2025-01-02", "2025-01-03"]):
        for i in range(10):
            rows.append({
                "date": d,
                "ticker": f"T{i}",
                "future_ret_5d": i / 100,
                "future_ret_1d": i / 200,
                "x": float(i),
            })
    panel = pd.DataFrame(rows)
    panel = _add_targets(panel)

    for _, g in panel.groupby("date"):
        assert (g["target_5d_extreme"] == 1).sum() == 4
        assert (g["target_5d_extreme"] == 0).sum() == 3
        assert g["target_5d_extreme"].isna().sum() == 3


def test_rank_features_are_cross_sectional():
    panel = pd.DataFrame({
        "date": pd.to_datetime(["2025-01-02"] * 4),
        "ticker": ["A", "B", "C", "D"],
        "x": [1.0, 2.0, 3.0, 4.0],
    })
    out = _rank_features(panel, ["x"])
    assert np.isclose(out.loc[out["ticker"] == "D", "rank_x"].iloc[0], 1.0)
    assert out["rank_x"].between(0, 1).all()


def test_daily_rank_metrics_positive_when_scores_match_returns():
    panel = pd.DataFrame({
        "date": pd.to_datetime(["2025-01-02"] * 10),
        "score": np.linspace(0.1, 0.9, 10),
        "future_ret_5d": np.linspace(-0.05, 0.05, 10),
    })
    out = _daily_rank_metrics(panel)
    assert len(out) == 1
    assert out.iloc[0]["rank_ic"] > 0.9
    assert out.iloc[0]["spread_5d"] > 0
