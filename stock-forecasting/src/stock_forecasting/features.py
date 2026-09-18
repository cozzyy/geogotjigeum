from __future__ import annotations

import numpy as np
import pandas as pd


def _safe_div(a: pd.Series, b: pd.Series) -> pd.Series:
    return a / b.replace(0, np.nan)


def _rsi(close: pd.Series, window: int = 14) -> pd.Series:
    delta = close.diff()
    gain = delta.clip(lower=0).rolling(window).mean()
    loss = (-delta.clip(upper=0)).rolling(window).mean()
    rs = _safe_div(gain, loss)
    return 100 - (100 / (1 + rs))


def _atr(df: pd.DataFrame, window: int = 14) -> pd.Series:
    prev_close = df["close"].shift(1)
    tr = pd.concat([
        df["high"] - df["low"],
        (df["high"] - prev_close).abs(),
        (df["low"] - prev_close).abs(),
    ], axis=1).max(axis=1)
    return tr.rolling(window).mean() / prev_close


def _rolling_z(s: pd.Series, window: int = 20) -> pd.Series:
    mean = s.rolling(window).mean()
    std = s.rolling(window).std()
    return _safe_div(s - mean, std)


def _merge_aux(base: pd.DataFrame, aux: pd.DataFrame, prefix: str, allow_exact_matches: bool) -> pd.DataFrame:
    if aux is None or aux.empty:
        return base

    x = aux[["close"]].copy()
    x[f"{prefix}_ret_1d"] = x["close"].pct_change()
    x[f"{prefix}_ret_2d"] = x["close"].pct_change(2)
    x[f"{prefix}_ret_3d"] = x["close"].pct_change(3)
    x[f"{prefix}_ret_5d"] = x["close"].pct_change(5)
    x[f"{prefix}_z20"] = _rolling_z(x["close"], 20)
    x[f"{prefix}_vol20"] = x["close"].pct_change().rolling(20).std() * np.sqrt(252)
    x = x.drop(columns=["close"]).reset_index()
    x = x.rename(columns={x.columns[0]: "date"})

    left = base.reset_index()
    left = left.rename(columns={left.columns[0]: "date"})
    merged = pd.merge_asof(
        left.sort_values("date"),
        x.sort_values("date"),
        on="date",
        direction="backward",
        allow_exact_matches=allow_exact_matches,
    )
    return merged.set_index("date")


def make_dataset(bundle: dict[str, pd.DataFrame]) -> tuple[pd.DataFrame, list[str]]:
    s = bundle["stock"].copy()
    out = s.copy()
    close = out["close"]
    prev_close = close.shift(1)

    # Core price / momentum
    for n in [1, 2, 3, 5, 10, 20]:
        out[f"ret_{n}d"] = close.pct_change(n)
    for n in [5, 10, 20, 60]:
        ma = close.rolling(n).mean()
        out[f"close_vs_ma{n}"] = _safe_div(close, ma) - 1

    out["ma5_vs_ma20"] = _safe_div(close.rolling(5).mean(), close.rolling(20).mean()) - 1
    out["ma20_vs_ma60"] = _safe_div(close.rolling(20).mean(), close.rolling(60).mean()) - 1
    out["gap_return"] = _safe_div(out["open"], prev_close) - 1
    out["intraday_return"] = _safe_div(close, out["open"]) - 1
    out["overnight_abs"] = out["gap_return"].abs()
    out["intraday_abs"] = out["intraday_return"].abs()
    out["close_location_day"] = _safe_div(close - out["low"], out["high"] - out["low"])

    rolling_low = out["low"].rolling(20).min()
    rolling_high = out["high"].rolling(20).max()
    out["close_location_20d"] = _safe_div(close - rolling_low, rolling_high - rolling_low)

    # Short-horizon reversal / trend intensity
    out["reversal_1x5"] = out["ret_1d"] * out["ret_5d"]
    out["reversal_1x20"] = out["ret_1d"] * out["ret_20d"]
    out["ret1_z20"] = _rolling_z(out["ret_1d"], 20)
    out["gap_z20"] = _rolling_z(out["gap_return"], 20)
    out["intraday_z20"] = _rolling_z(out["intraday_return"], 20)

    # Volatility / liquidity
    out["atr14"] = _atr(out, 14)
    for n in [5, 10, 20]:
        out[f"realized_vol_{n}"] = close.pct_change().rolling(n).std() * np.sqrt(252)
    out["vol_ratio_5_20"] = _safe_div(out["realized_vol_5"], out["realized_vol_20"])
    out["volume_change_1d"] = out["volume"].pct_change()
    out["volume_ratio_5"] = _safe_div(out["volume"], out["volume"].rolling(5).mean())
    out["volume_ratio_20"] = _safe_div(out["volume"], out["volume"].rolling(20).mean())
    out["volume_z20"] = _rolling_z(np.log1p(out["volume"]), 20)
    out["rsi14"] = _rsi(close, 14) / 100.0

    # Calendar
    out["weekday"] = out.index.weekday
    for d in range(5):
        out[f"weekday_{d}"] = (out["weekday"] == d).astype(int)
    out["month_end"] = out.index.is_month_end.astype(int)
    out["quarter_end"] = out.index.is_quarter_end.astype(int)

    # Korea market: same-day close is available if forecast is generated after Korea close.
    for key in ["kospi", "kosdaq"]:
        out = _merge_aux(out, bundle.get(key), key, allow_exact_matches=True)

    # US/global inputs: only previous completed session is available before the next Korea session.
    overseas = [
        "sp500", "nasdaq", "sox", "smh", "soxx",
        "nvda", "micron", "tsm", "vix", "tnx", "dxy", "usdkrw",
    ]
    for key in overseas:
        out = _merge_aux(out, bundle.get(key), key, allow_exact_matches=False)

    # Relative / spillover features.
    if "kospi_ret_1d" in out:
        out["excess_vs_kospi_1d"] = out["ret_1d"] - out["kospi_ret_1d"]
        out["excess_vs_kospi_5d"] = out["ret_5d"] - out["kospi_ret_5d"]
    if "kosdaq_ret_1d" in out:
        out["excess_vs_kosdaq_1d"] = out["ret_1d"] - out["kosdaq_ret_1d"]
    if "sox_ret_1d" in out:
        out["gap_x_sox"] = out["gap_return"] * out["sox_ret_1d"]
        out["intraday_x_sox"] = out["intraday_return"] * out["sox_ret_1d"]
        out["sox_minus_nasdaq"] = out["sox_ret_1d"] - out.get("nasdaq_ret_1d", 0.0)
    if "micron_ret_1d" in out:
        out["memory_shock"] = out["micron_ret_1d"] - out.get("sp500_ret_1d", 0.0)
    if "nvda_ret_1d" in out:
        out["ai_chip_shock"] = out["nvda_ret_1d"] - out.get("sp500_ret_1d", 0.0)
    if "smh_ret_1d" in out and "soxx_ret_1d" in out:
        out["semi_etf_consensus"] = (out["smh_ret_1d"] + out["soxx_ret_1d"]) / 2

    # Targets
    next_close = close.shift(-1)
    out["target_up_1d"] = (next_close > close).astype(float).where(next_close.notna())

    future_highs = pd.concat([out["high"].shift(-i) for i in range(1, 6)], axis=1)
    future_lows = pd.concat([out["low"].shift(-i) for i in range(1, 6)], axis=1)
    full_horizon = future_highs.notna().sum(axis=1).eq(5) & future_lows.notna().sum(axis=1).eq(5)
    out["target_high_ret_5d"] = (future_highs.max(axis=1) / close - 1).where(full_horizon)
    out["target_low_ret_5d"] = (future_lows.min(axis=1) / close - 1).where(full_horizon)

    exclude = {
        "open", "high", "low", "close", "volume", "weekday",
        "target_up_1d", "target_high_ret_5d", "target_low_ret_5d",
    }
    feature_cols = [c for c in out.columns if c not in exclude]
    out = out.replace([np.inf, -np.inf], np.nan)
    return out, feature_cols
