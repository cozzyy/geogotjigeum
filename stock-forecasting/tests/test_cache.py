import os
import time
import pandas as pd
from stock_forecasting.data import YahooProvider


def test_small_cache_roundtrip(tmp_path):
    provider = YahooProvider(cache_dir=str(tmp_path), cache_ttl_hours=6)
    idx = pd.to_datetime(["2026-09-17", "2026-09-18"])
    frame = pd.DataFrame(
        {
            "open": [1.0, 2.0],
            "high": [2.0, 3.0],
            "low": [0.5, 1.5],
            "close": [1.5, 2.5],
            "volume": [100, 200],
        },
        index=idx,
    )
    path = provider._cache_path("005930.KS", "2020-01-01", None)
    provider._write_cache(path, frame)
    loaded = provider._read_cache(path)

    assert loaded is not None
    pd.testing.assert_frame_equal(frame, loaded)


def test_expired_cache_is_ignored(tmp_path):
    provider = YahooProvider(cache_dir=str(tmp_path), cache_ttl_hours=1)
    idx = pd.to_datetime(["2026-09-18"])
    frame = pd.DataFrame(
        {"open":[1.0],"high":[1.0],"low":[1.0],"close":[1.0],"volume":[1]},
        index=idx,
    )
    path = provider._cache_path("005930.KS", "2020-01-01", None)
    provider._write_cache(path, frame)
    old = time.time() - 2 * 3600
    os.utime(path, (old, old))

    assert provider._read_cache(path) is None
