import numpy as np
import pandas as pd
from stock_forecasting.features import make_dataset
from stock_forecasting.backtest import run_walk_forward


def _frame(index, seed=0):
    rng = np.random.default_rng(seed)
    rets = 0.0002 + rng.normal(0, 0.012, len(index))
    close = 100 * np.exp(np.cumsum(rets))
    open_ = close * (1 + rng.normal(0, 0.002, len(index)))
    high = np.maximum(open_, close) * (1 + rng.uniform(0.001, 0.015, len(index)))
    low = np.minimum(open_, close) * (1 - rng.uniform(0.001, 0.015, len(index)))
    vol = rng.integers(100_000, 500_000, len(index))
    return pd.DataFrame({"open":open_,"high":high,"low":low,"close":close,"volume":vol}, index=index)


def test_walk_forward_runs():
    idx = pd.bdate_range("2018-01-01", periods=850)
    bundle = {"stock": _frame(idx, 1)}
    for i,k in enumerate(["kospi","kosdaq","nasdaq","sox","vix","usdkrw"], 2):
        bundle[k] = _frame(idx, i)
    ds, cols = make_dataset(bundle)
    res = run_walk_forward(ds, cols, min_train_days=400, test_months=12)
    assert {"logistic","tree"}.issubset(res.keys())
    for r in res.values():
        assert r.summary["all"]["samples"] > 0
        assert 0 <= r.summary["all"]["accuracy"] <= 1
        assert 0 <= r.summary["all"]["range_coverage"] <= 1
