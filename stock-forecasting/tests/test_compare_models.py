import numpy as np
import pandas as pd

from stock_forecasting.compare_models import (
    _baseline_predictions,
    _add_stock_dummies,
    SEMICON_CODES,
)


def test_baselines_return_valid_probabilities():
    idx = pd.bdate_range("2024-01-01", periods=20)
    train = pd.DataFrame({
        "ret_1d": np.linspace(-0.02, 0.02, 20),
        "target_up_1d": [0,1] * 10,
    }, index=idx)
    test = train.iloc[-5:].copy()

    out = _baseline_predictions(train.iloc[:-5], test)

    assert set(out) == {"base_rate", "momentum_baseline"}
    for values in out.values():
        assert len(values) == len(test)
        assert ((values > 0) & (values < 1)).all()


def test_stock_dummies_are_one_hot():
    idx = pd.bdate_range("2024-01-01", periods=3)
    frame = pd.DataFrame({"x": [1,2,3]}, index=idx)

    out = _add_stock_dummies(frame, "005930")
    dummy_cols = [f"stock_{c}" for c in SEMICON_CODES]

    assert out[dummy_cols].sum(axis=1).eq(1).all()
    assert out["stock_005930"].eq(1).all()
