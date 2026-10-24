import numpy as np
import pandas as pd
from stock_forecasting.features import make_dataset


def _frame(index, seed=0):
    rng = np.random.default_rng(seed)
    close = 100 * np.exp(np.cumsum(rng.normal(0.0005, 0.015, len(index))))
    open_ = close * (1 + rng.normal(0, 0.003, len(index)))
    high = np.maximum(open_, close) * (1 + rng.uniform(0.001, 0.02, len(index)))
    low = np.minimum(open_, close) * (1 - rng.uniform(0.001, 0.02, len(index)))
    vol = rng.integers(1_000_000, 5_000_000, len(index))
    return pd.DataFrame({"open":open_,"high":high,"low":low,"close":close,"volume":vol}, index=index)


def test_dataset_targets_are_future_only():
    idx = pd.bdate_range("2020-01-01", periods=700)
    stock = _frame(idx, 1)
    bundle = {"stock":stock}
    for i, k in enumerate(["kospi","kosdaq","nasdaq","sox","vix","usdkrw"], 2):
        bundle[k] = _frame(idx, i)
    ds, features = make_dataset(bundle)
    t = idx[200]
    expected_up = float(stock.loc[idx[201], "close"] > stock.loc[t, "close"])
    assert ds.loc[t, "target_up_1d"] == expected_up
    assert "target_up_1d" not in features
    assert "close" not in features
    assert any(c.startswith("sox_ret") for c in features)
