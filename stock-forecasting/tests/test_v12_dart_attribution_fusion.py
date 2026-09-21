import numpy as np
import pandas as pd

from stock_forecasting.v12_dart_attribution_fusion import (
    category_features,
    categories_features,
    event_gate,
    fusion_prediction,
)


def _pred(scores):
    return pd.DataFrame({
        "date": pd.to_datetime([
            "2026-09-21", "2026-09-21", "2026-09-21",
        ]),
        "ticker": ["A", "B", "C"],
        "name": ["A", "B", "C"],
        "broad_sector": ["x", "x", "x"],
        "future_ret_5d": [0.01, -0.01, 0.02],
        "future_sector_neutral_5d": [0.01, -0.01, 0.02],
        "target_sector_neutral_rank_5d": [0.5, 0.2, 0.8],
        "target_rank": [0.5, 0.2, 0.8],
        "score": scores,
    })


def test_category_features_isolate_ownership():
    cols = [
        "dart_ownership_1d",
        "rank_dart_ownership_5d",
        "sector_rank_dart_ownership_recency20",
        "dart_contract_1d",
        "dart_event_1d",
    ]
    ownership = category_features(cols, "ownership")
    assert "dart_ownership_1d" in ownership
    assert "rank_dart_ownership_5d" in ownership
    assert "dart_contract_1d" not in ownership
    assert "dart_event_1d" not in ownership


def test_categories_features_can_exclude_ownership():
    cols = [
        "dart_ownership_1d",
        "dart_contract_1d",
        "rank_dart_contract_5d",
        "dart_dividend_1d",
    ]
    selected = categories_features(cols, ["contract", "dividend"])
    assert "dart_ownership_1d" not in selected
    assert set(selected) == {
        "dart_contract_1d",
        "rank_dart_contract_5d",
        "dart_dividend_1d",
    }


def test_late_fusion_uses_cross_sectional_score_ranks():
    base = _pred([1.0, 2.0, 3.0])
    dart = _pred([3.0, 2.0, 1.0])
    fused = fusion_prediction(base, dart, 0.5)
    assert np.allclose(
        fused["score"].to_numpy(),
        np.array([2/3, 2/3, 2/3]),
    )


def test_event_gate_uses_days_since_window():
    panel = pd.DataFrame({
        "date": pd.to_datetime([
            "2026-09-21", "2026-09-21", "2026-09-21",
        ]),
        "ticker": ["A", "B", "C"],
        "dart_contract_days_since": [0.0, 4.0, 5.0],
        "dart_dividend_days_since": [252.0, 252.0, 1.0],
    })
    gate = event_gate(
        panel,
        ["contract", "dividend"],
        window_days=5,
    )
    assert gate["event_gate"].tolist() == [True, True, True]
