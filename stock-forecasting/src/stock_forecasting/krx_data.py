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
        require_krx_credentials()
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


def require_krx_credentials() -> None:
    login_id = os.environ.get("KRX_ID", "").strip()
    login_pw = os.environ.get("KRX_PW", "").strip()

    placeholder_tokens = (
        "본인의_", "your_", "YOUR_", "<", ">",
        "KRX_ID", "KRX_PW", "비밀번호",
    )

    if not login_id or not login_pw:
        raise RuntimeError(
            "V8의 KRX 수급/시총/펀더멘털 조회에는 실제 KRX 계정 로그인이 필요합니다.\n"
            "현재 KRX_ID 또는 KRX_PW 환경변수가 없습니다.\n\n"
            "PowerShell에서 예시 문구가 아니라 실제 본인 계정값으로 설정하세요.\n"
            '  $env:KRX_ID="실제_KRX_로그인_ID"\n'
            '  $env:KRX_PW="실제_KRX_로그인_비밀번호"\n\n'
            "ID/비밀번호를 채팅, 코드, .env, GitHub에 올리지 마세요."
        )

    if any(token in login_id for token in placeholder_tokens) or any(
        token in login_pw for token in placeholder_tokens
    ):
        raise RuntimeError(
            "KRX_ID/KRX_PW에 예시 문자열이 들어 있습니다.\n"
            "예: '본인의_KRX_ID', '본인의_KRX_비밀번호'는 실제 계정값이 아닙니다.\n\n"
            "PowerShell에서 실제 본인 KRX 계정값으로 다시 설정하세요.\n"
            '  $env:KRX_ID="실제_KRX_로그인_ID"\n'
            '  $env:KRX_PW="실제_KRX_로그인_비밀번호"\n\n'
            "실제 자격증명은 이 채팅에 보내지 마세요."
        )


def diagnose_krx_login() -> dict:
    """KRX 로그인 응답을 1회 진단한다. 비밀번호는 출력/반환하지 않는다."""
    import requests

    require_krx_credentials()

    login_id = os.environ["KRX_ID"].strip()
    login_pw = os.environ["KRX_PW"]

    login_page = "https://data.krx.co.kr/contents/MDC/COMS/client/MDCCOMS001.cmd"
    login_jsp = (
        "https://data.krx.co.kr/contents/MDC/COMS/client/view/login.jsp?site=mdc"
    )
    login_url = (
        "https://data.krx.co.kr/contents/MDC/COMS/client/MDCCOMS001D1.cmd"
    )
    user_agent = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    )

    session = requests.Session()
    try:
        session.get(
            login_page,
            headers={"User-Agent": user_agent},
            timeout=15,
        ).raise_for_status()
        session.get(
            login_jsp,
            headers={"User-Agent": user_agent, "Referer": login_page},
            timeout=15,
        ).raise_for_status()

        payload = {
            "mbrNm": "",
            "telNo": "",
            "di": "",
            "certType": "",
            "mbrId": login_id,
            "pw": login_pw,
        }
        headers = {"User-Agent": user_agent, "Referer": login_page}
        resp = session.post(login_url, data=payload, headers=headers, timeout=15)

        result = {
            "http_status": resp.status_code,
            "content_type": resp.headers.get("content-type", ""),
            "login_id_length": len(login_id),
            "password_length": len(login_pw),
        }

        try:
            data = resp.json()
        except Exception:
            result.update({
                "ok": False,
                "error_code": "NON_JSON",
                "error_message": (
                    "KRX 로그인 응답이 JSON이 아닙니다. "
                    "네트워크/WAF/로그인 엔드포인트 변경 가능성이 있습니다."
                ),
            })
            return result

        code = str(data.get("_error_code", ""))
        message = str(data.get("_error_message", ""))

        if code == "CD011":
            payload["skipDup"] = "Y"
            resp2 = session.post(login_url, data=payload, headers=headers, timeout=15)
            try:
                data2 = resp2.json()
                code = str(data2.get("_error_code", ""))
                message = str(data2.get("_error_message", ""))
                result["duplicate_login_retry"] = True
                result["retry_http_status"] = resp2.status_code
            except Exception:
                result.update({
                    "ok": False,
                    "error_code": "NON_JSON_AFTER_DUP_RETRY",
                    "error_message": "중복 로그인 재시도 응답이 JSON이 아닙니다.",
                })
                return result

        result.update({
            "ok": code == "CD001",
            "error_code": code or "EMPTY_CODE",
            "error_message": message,
        })
        return result
    except requests.RequestException as exc:
        return {
            "ok": False,
            "error_code": "NETWORK_ERROR",
            "error_message": str(exc),
            "login_id_length": len(login_id),
            "password_length": len(login_pw),
        }
