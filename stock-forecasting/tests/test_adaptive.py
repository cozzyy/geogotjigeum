import numpy as np
import pandas as pd

from stock_forecasting.adaptive import feature_recipes, run_logistic_window_backtest
from stock_forecasting.features import make_dataset


def _frame(index, seed=0):
    rng = np.random.default_rng(seed)
    close = 100 * np.exp(np.cumsum(rng.normal(0.0003, 0.012, len(index))))
    open_ = close * (1 + rng.normal(0, 0.002, len(index)))
    high = np.maximum(open_, close) * (1 + rng.uniform(0.001, 0.01, len(index)))
    low = np.minimum(open_, close) * (1 - rng.uniform(0.001, 0.01, len(index)))
    vol = rng.integers(100000, 500000, len(index))
    return pd.DataFrame({"open":open_,"high":high,"low":low,"close":close,"volume":vol}, index=index)


def test_feature_recipes_include_non_cumulative_market_core():
    cols = [
        "ret_1d","close_vs_ma5","volume_ratio_5","atr14",
        "weekday_0","month_end",
        "kospi_ret_1d","kosdaq_ret_1d",
        "nasdaq_ret_1d","sox_ret_1d","vix_ret_1d",
        "usdkrw_ret_1d",
    ]
    recipes = feature_recipes(cols)
    assert "price+kr+us" in recipes
    assert "weekday_0" not in recipes["price+kr+us"]
    assert "usdkrw_ret_1d" not in recipes["price+kr+us"]
    assert "sox_ret_1d" in recipes["price+kr+us"]


def test_rolling_logistic_backtest_runs():
    idx = pd.bdate_range("2016-01-01", periods=1500)
    bundle = {"stock": _frame(idx, 1)}
    for i,k in enumerate(["kospi","kosdaq","nasdaq","sox","vix","usdkrw"], 2):
        bundle[k] = _frame(idx, i)
    ds, cols = make_dataset(bundle)
    selected = feature_recipes(cols)["price+kr+us"]
    pred = run_logistic_window_backtest(ds, selected, rolling_years=3, min_train_days=504, test_months=6)
    assert len(pred) > 0
    assert pred["prob_up"].between(0,1).all()
