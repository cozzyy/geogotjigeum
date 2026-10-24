from __future__ import annotations

from dataclasses import dataclass
import pandas as pd

from .config import resolve_ticker
from .data import YahooProvider
from .features import make_dataset
from .backtest import run_walk_forward
from .models import make_direction_models, make_quantile_model


@dataclass
class Forecast:
    code: str
    name: str
    asof: pd.Timestamp
    close: float
    model_name: str
    prob_up: float
    low_price_5d: float
    high_price_5d: float
    backtest: dict
    sample_count: int


def _choose_model(results: dict):
    ranked = sorted(results.values(), key=lambda r: (r.summary["all"].get("brier", 999), 0 if r.model_name == "logistic" else 1))
    return ranked[0]


def forecast(query: str, start: str = "2017-01-01", end: str | None = None) -> Forecast:
    code, meta = resolve_ticker(query)
    provider = YahooProvider()
    bundle = provider.load_bundle(meta["symbol"], start=start, end=end)
    dataset, feature_cols = make_dataset(bundle)
    results = run_walk_forward(dataset, feature_cols)
    best = _choose_model(results)

    train = dataset.dropna(subset=["target_up_1d", "target_high_ret_5d", "target_low_ret_5d"]).copy()
    latest = dataset.loc[dataset["close"].notna()].iloc[[-1]]

    models = make_direction_models()
    clf = getattr(models, best.model_name)
    clf.fit(train[feature_cols], train["target_up_1d"].astype(int))
    prob = float(clf.predict_proba(latest[feature_cols])[:, 1][0])

    qlow = make_quantile_model(0.10)
    qhigh = make_quantile_model(0.90)
    qlow.fit(train[feature_cols], train["target_low_ret_5d"])
    qhigh.fit(train[feature_cols], train["target_high_ret_5d"])
    low_ret = float(qlow.predict(latest[feature_cols])[0])
    high_ret = float(qhigh.predict(latest[feature_cols])[0])
    low_ret, high_ret = min(low_ret, high_ret), max(low_ret, high_ret)
    close = float(latest["close"].iloc[0])

    return Forecast(
        code=code,
        name=meta["name"],
        asof=pd.Timestamp(latest.index[0]),
        close=close,
        model_name=best.model_name,
        prob_up=prob,
        low_price_5d=close * (1 + low_ret),
        high_price_5d=close * (1 + high_ret),
        backtest=best.summary,
        sample_count=int(best.summary["all"]["samples"]),
    )
