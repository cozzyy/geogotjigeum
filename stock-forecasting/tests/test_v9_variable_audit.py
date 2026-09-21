import numpy as np
import pandas as pd

from stock_forecasting.v9_variable_audit import (
    split_krx_groups,
    feature_sets,
    leakage_audit,
    leakage_flags,
)


def test_split_krx_groups_separates_valuation_accounting():
    groups = {
        "price": ["ret_5d"],
        "flow": ["foreign_net_ratio_5d"],
        "size_liquidity": ["log_market_cap", "rank_log_market_cap"],
        "fundamental": [
            "earnings_yield",
            "rank_earnings_yield",
            "eps_level",
            "sector_rank_eps_change_20d",
            "bps_level",
            "dividend_yield",
        ],
    }
    split = split_krx_groups(groups)
    assert "earnings_yield" in split["valuation"]
    assert "rank_earnings_yield" in split["valuation"]
    assert "eps_level" in split["accounting"]
    assert "sector_rank_eps_change_20d" in split["accounting"]
    assert "bps_level" in split["accounting"]


def test_feature_sets_include_clean_ablation_combinations():
    split = {
        "price": ["p"],
        "flow": ["f"],
        "size_liquidity": ["s"],
        "valuation": ["v"],
        "accounting": ["a"],
        "misc_fundamental": ["m"],
    }
    sets = feature_sets(split)
    assert sets["price_plus_size"] == ["p", "s"]
    assert sets["price_plus_valuation"] == ["p", "v"]
    assert sets["price_plus_accounting"] == ["p", "a"]
    assert sets["price_plus_size_valuation"] == ["p", "s", "v"]
    assert set(sets["krx_only"]) == {"f", "s", "v", "a", "m"}


def test_leakage_audit_flags_daily_changing_eps():
    n = 40
    dates = pd.bdate_range("2025-01-01", periods=n)
    panel = pd.DataFrame({
        "ticker": ["A"] * n + ["B"] * n,
        "date": list(dates) * 2,
        "eps": list(np.arange(n, dtype=float)) * 2,
        "bps": [100.0] * (n * 2),
    })
    audit, _ = leakage_audit(panel)
    flags = leakage_flags(audit)
    assert any("eps" in x and "지나치게" in x for x in flags)
