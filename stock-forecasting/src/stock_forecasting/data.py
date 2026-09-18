from __future__ import annotations

from dataclasses import dataclass
from typing import Dict
import pandas as pd

from .config import MARKET_SYMBOLS


def _normalize_yf_frame(df: pd.DataFrame, symbol: str) -> pd.DataFrame:
    if df.empty:
        raise ValueError(f"데이터가 비어 있습니다: {symbol}")
    if isinstance(df.columns, pd.MultiIndex):
        if symbol in df.columns.get_level_values(-1):
            df = df.xs(symbol, axis=1, level=-1, drop_level=True)
        elif symbol in df.columns.get_level_values(0):
            df = df.xs(symbol, axis=1, level=0, drop_level=True)
    rename = {c: str(c).strip().lower().replace(" ", "_") for c in df.columns}
    df = df.rename(columns=rename)
    required = {"open", "high", "low", "close", "volume"}
    missing = required.difference(df.columns)
    if missing:
        raise ValueError(f"{symbol} 필수 컬럼 누락: {sorted(missing)}")
    out = df[["open", "high", "low", "close", "volume"]].copy()
    out.index = pd.to_datetime(out.index).tz_localize(None).normalize()
    out = out[~out.index.duplicated(keep="last")].sort_index()
    return out


@dataclass
class YahooProvider:
    auto_adjust: bool = False

    def download(self, symbol: str, start: str, end: str | None = None) -> pd.DataFrame:
        try:
            import yfinance as yf
        except ImportError as exc:
            raise RuntimeError("yfinance가 필요합니다. `pip install -e .`를 실행하세요.") from exc
        df = yf.download(
            symbol,
            start=start,
            end=end,
            progress=False,
            auto_adjust=self.auto_adjust,
            actions=False,
            threads=False,
        )
        return _normalize_yf_frame(df, symbol)

    def load_bundle(self, stock_symbol: str, start: str, end: str | None = None) -> Dict[str, pd.DataFrame]:
        bundle = {"stock": self.download(stock_symbol, start, end)}
        for name, symbol in MARKET_SYMBOLS.items():
            try:
                bundle[name] = self.download(symbol, start, end)
            except Exception:
                bundle[name] = pd.DataFrame()
        return bundle
