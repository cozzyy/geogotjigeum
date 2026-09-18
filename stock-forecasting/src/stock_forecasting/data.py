from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict
import hashlib
import time
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
    cache_dir: str = ".cache/yfinance"
    cache_ttl_hours: int = 6

    def _cache_path(self, symbol: str, start: str, end: str | None) -> Path:
        raw = f"{symbol}|{start}|{end}|{self.auto_adjust}".encode("utf-8")
        digest = hashlib.sha1(raw).hexdigest()[:16]
        safe_symbol = symbol.replace("^", "IDX_").replace("=", "_")
        return Path(self.cache_dir) / f"{safe_symbol}_{digest}.pkl"

    def _read_cache(self, path: Path) -> pd.DataFrame | None:
        if not path.exists():
            return None
        age_hours = (time.time() - path.stat().st_mtime) / 3600
        if age_hours > self.cache_ttl_hours:
            return None
        try:
            return pd.read_pickle(path)
        except Exception:
            return None

    def _write_cache(self, path: Path, df: pd.DataFrame) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        df.to_pickle(path)

    def download(self, symbol: str, start: str, end: str | None = None, use_cache: bool = True) -> pd.DataFrame:
        cache_path = self._cache_path(symbol, start, end)
        if use_cache:
            cached = self._read_cache(cache_path)
            if cached is not None and not cached.empty:
                return cached.copy()

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
        normalized = _normalize_yf_frame(df, symbol)
        if use_cache:
            self._write_cache(cache_path, normalized)
        return normalized

    def load_bundle(self, stock_symbol: str, start: str, end: str | None = None, use_cache: bool = True) -> Dict[str, pd.DataFrame]:
        bundle = {"stock": self.download(stock_symbol, start, end, use_cache=use_cache)}
        for name, symbol in MARKET_SYMBOLS.items():
            try:
                bundle[name] = self.download(symbol, start, end, use_cache=use_cache)
            except Exception:
                bundle[name] = pd.DataFrame()
        return bundle
