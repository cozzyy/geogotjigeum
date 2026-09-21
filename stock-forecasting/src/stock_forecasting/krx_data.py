from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import hashlib
import os
import time

import pandas as pd


def _date_str(value: str | pd.Timestamp) -> str:
    return pd.Timestamp(value).strftime("%Y%m%d")


def _normalize_index(df: pd.DataFrame) -> pd.DataFrame:
    if df is None or df.empty:
        return pd.DataFrame()
    out = df.copy()
    out.index = pd.to_datetime(out.index).tz_localize(None).normalize()
    out = out[~out.index.duplicated(keep="last")].sort_index()
    return out


def _numeric(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    for c in out.columns:
        out[c] = pd.to_numeric(out[c], errors="coerce")
    return out


@dataclass
class KRXProvider:
    cache_dir: str = ".cache/pykrx"
    pause_seconds: float = 0.08
    refresh: bool = False

    def _cache_path(self, kind: str, ticker: str, start: str, end: str) -> Path:
        raw = f"{kind}|{ticker}|{start}|{end}".encode("utf-8")
        digest = hashlib.sha1(raw).hexdigest()[:16]
        return Path(self.cache_dir) / f"{kind}_{ticker}_{digest}.pkl"

    def _cached(self, path: Path) -> pd.DataFrame | None:
        if self.refresh or not path.exists():
            return None
        try:
            df = pd.read_pickle(path)
            if isinstance(df, pd.DataFrame) and not df.empty:
                return df.copy()
        except Exception:
            pass
        return None

    def _save(self, path: Path, df: pd.DataFrame) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        df.to_pickle(path)

    @staticmethod
    def _stock_api():
        try:
            from pykrx import stock
        except ImportError as exc:
            raise RuntimeError(
                "pykrx가 필요합니다. py -m pip install -e . 를 다시 실행하세요."
            ) from exc
        return stock

    def investor_flow(self, ticker: str, start: str, end: str) -> pd.DataFrame:
        start_s, end_s = _date_str(start), _date_str(end)
        path = self._cache_path("flow", ticker, start_s, end_s)
        cached = self._cached(path)
        if cached is not None:
            return cached

        stock = self._stock_api()
        try:
            raw = stock.get_market_trading_value_by_date(
                start_s, end_s, ticker, on="순매수"
            )
        except Exception as exc:
            raise RuntimeError(
                f"{ticker} KRX 투자자 수급 조회 실패: {exc}. "
                "최신 pykrx에서 KRX 인증이 필요한 경우 KRX_ID/KRX_PW 환경변수를 확인하세요."
            ) from exc

        raw = _numeric(_normalize_index(raw))
        aliases = {
            "institution_net": ["기관합계", "기관", "institution"],
            "foreign_net": ["외국인합계", "외국인", "foreign"],
            "individual_net": ["개인", "individual"],
            "other_corp_net": ["기타법인", "other_corp"],
        }

        out = pd.DataFrame(index=raw.index)
        for canonical, candidates in aliases.items():
            source = next((c for c in candidates if c in raw.columns), None)
            if source is not None:
                out[canonical] = raw[source]

        self._save(path, out)
        time.sleep(self.pause_seconds)
        return out

    def market_cap(self, ticker: str, start: str, end: str) -> pd.DataFrame:
        start_s, end_s = _date_str(start), _date_str(end)
        path = self._cache_path("cap", ticker, start_s, end_s)
        cached = self._cached(path)
        if cached is not None:
            return cached

        stock = self._stock_api()
        try:
            raw = stock.get_market_cap_by_date(start_s, end_s, ticker)
        except Exception as exc:
            raise RuntimeError(f"{ticker} KRX 시가총액 조회 실패: {exc}") from exc

        raw = _numeric(_normalize_index(raw))
        aliases = {
            "market_cap": ["시가총액", "market_cap"],
            "krx_volume": ["거래량", "volume"],
            "krx_traded_value": ["거래대금", "trading_value"],
            "listed_shares": ["상장주식수", "listed_shares"],
        }
        out = pd.DataFrame(index=raw.index)
        for canonical, candidates in aliases.items():
            source = next((c for c in candidates if c in raw.columns), None)
            if source is not None:
                out[canonical] = raw[source]

        self._save(path, out)
        time.sleep(self.pause_seconds)
        return out

    def fundamentals(self, ticker: str, start: str, end: str) -> pd.DataFrame:
        start_s, end_s = _date_str(start), _date_str(end)
        path = self._cache_path("fund", ticker, start_s, end_s)
        cached = self._cached(path)
        if cached is not None:
            return cached

        stock = self._stock_api()
        try:
            raw = stock.get_market_fundamental_by_date(start_s, end_s, ticker)
        except Exception as exc:
            raise RuntimeError(f"{ticker} KRX 펀더멘털 조회 실패: {exc}") from exc

        raw = _numeric(_normalize_index(raw))
        aliases = {
            "bps": ["BPS", "bps"],
            "per": ["PER", "per"],
            "pbr": ["PBR", "pbr"],
            "eps": ["EPS", "eps"],
            "div_yield": ["DIV", "div", "div_yield"],
            "dps": ["DPS", "dps"],
        }
        out = pd.DataFrame(index=raw.index)
        for canonical, candidates in aliases.items():
            source = next((c for c in candidates if c in raw.columns), None)
            if source is not None:
                out[canonical] = raw[source]

        self._save(path, out)
        time.sleep(self.pause_seconds)
        return out

    def bundle(self, ticker: str, start: str, end: str) -> pd.DataFrame:
        pieces = []
        errors = []

        for label, fn in [
            ("flow", self.investor_flow),
            ("cap", self.market_cap),
            ("fund", self.fundamentals),
        ]:
            try:
                frame = fn(ticker, start, end)
                if not frame.empty:
                    pieces.append(frame)
            except Exception as exc:
                errors.append(f"{label}: {exc}")

        if not pieces:
            details = " | ".join(errors) if errors else "empty response"
            raise RuntimeError(f"{ticker} KRX bundle 생성 실패: {details}")

        out = pd.concat(pieces, axis=1, sort=False).sort_index()
        out = out.loc[:, ~out.columns.duplicated()].copy()
        return out


def krx_credentials_present() -> bool:
    return bool(os.environ.get("KRX_ID") and os.environ.get("KRX_PW"))
