from stock_forecasting.ablation import feature_stages


def test_feature_stages_are_cumulative_and_ordered():
    cols = [
        "ret_1d", "close_vs_ma5", "volume_ratio_5", "atr14",
        "weekday_0", "month_end", "kospi_ret_1d", "kosdaq_ret_1d",
        "nasdaq_ret_1d", "sox_ret_1d", "vix_ret_1d", "usdkrw_ret_1d",
    ]
    stages = feature_stages(cols)
    names = [name for name, _ in stages]

    assert names == [
        "price",
        "+volume_volatility",
        "+calendar",
        "+korean_market",
        "+us_market_sox_vix",
        "+fx",
    ]

    previous = set()
    for _, stage_cols in stages:
        current = set(stage_cols)
        assert previous.issubset(current)
        previous = current

    assert "ret_1d" in stages[0][1]
    assert "usdkrw_ret_1d" in stages[-1][1]
