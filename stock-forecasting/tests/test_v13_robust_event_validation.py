import numpy as np
import pandas as pd

from stock_forecasting.v13_robust_event_validation import (
    _event_masks,
    _membership_churn,
    _safe_spearman,
    monthly_block_bootstrap,
)


def test_event_masks_create_clean_pre_and_post_windows():
    panel = pd.DataFrame({
        "ticker": ["A"] * 8,
        "date": pd.bdate_range("2026-01-01", periods=8),
        "dart_earnings_1d": [0, 0, 0, 1, 0, 0, 0, 0],
        "dart_earnings_days_since": [252, 252, 252, 0, 1, 2, 3, 4],
    })
    post, pre, clean = _event_masks(
        panel,
        "earnings",
        window_days=2,
    )

    assert post.tolist() == [
        False, False, False, True, True, False, False, False
    ]
    assert pre.tolist() == [
        False, True, True, False, False, False, False, False
    ]
    assert not (post & pre).any()
    assert clean.iloc[0]


def test_safe_spearman_rejects_constant_input():
    a = pd.Series([1.0] * 20)
    b = pd.Series(np.arange(20, dtype=float))
    assert np.isnan(_safe_spearman(a, b))


def test_monthly_block_bootstrap_is_deterministic():
    dates = pd.bdate_range("2025-01-01", periods=180)
    daily = pd.DataFrame({
        "date": dates,
        "rank_ic": np.linspace(-0.1, 0.1, len(dates)),
        "neutral_spread": np.linspace(-0.01, 0.02, len(dates)),
    })
    a = monthly_block_bootstrap(daily, reps=50, seed=7)
    b = monthly_block_bootstrap(daily, reps=50, seed=7)

    assert a == b
    assert a["ic_ci_low"] <= a["ic_observed"] <= a["ic_ci_high"]
    assert (
        a["spread_ci_low"]
        <= a["spread_observed"]
        <= a["spread_ci_high"]
    )


def test_membership_churn():
    prev = {"A", "B", "C", "D"}
    cur = {"A", "B", "E", "F"}
    assert np.isclose(_membership_churn(prev, cur), 0.5)
