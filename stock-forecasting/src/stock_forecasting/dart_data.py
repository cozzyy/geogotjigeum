from __future__ import annotations

from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
import hashlib
import os
import re
import time
import xml.etree.ElementTree as ET
import zipfile

import numpy as np
import pandas as pd
import requests


BASE_URL = "https://opendart.fss.or.kr/api"
REPORT_CODES = {
    "11013": "q1",
    "11012": "half",
    "11014": "q3",
    "11011": "annual",
}


class DARTAPIError(RuntimeError):
    def __init__(self, status: str, message: str):
        super().__init__(f"OpenDART status={status}: {message}")
        self.status = status
        self.message = message


def dart_key_present() -> bool:
    return bool(os.environ.get("DART_API_KEY", "").strip())


def require_dart_key() -> str:
    key = os.environ.get("DART_API_KEY", "").strip()
    placeholders = (
        "본인의_", "YOUR_", "your_", "DART_API_KEY",
        "실제_", "<", ">",
    )
    if not key:
        raise RuntimeError(
            "V11은 OpenDART API 인증키가 필요합니다.\n"
            "PowerShell에서 실제 발급 키를 환경변수로 설정하세요.\n"
            "  $env:DART_API_KEY = Read-Host 'OpenDART API Key'\n\n"
            "인증키를 채팅, 코드, .env, GitHub에 올리지 마세요."
        )
    if any(token in key for token in placeholders):
        raise RuntimeError(
            "DART_API_KEY에 예시 문자열이 들어 있습니다. "
            "OpenDART에서 발급받은 실제 인증키를 입력하세요."
        )
    return key


def _parse_number(value) -> float:
    if value is None:
        return np.nan
    s = str(value).strip()
    if not s or s in {"-", "nan", "None"}:
        return np.nan
    negative = s.startswith("(") and s.endswith(")")
    s = s.strip("()").replace(",", "").replace(" ", "")
    try:
        x = float(s)
    except ValueError:
        return np.nan
    return -x if negative else x


def _growth(current: float, previous: float, clip: float = 5.0) -> float:
    if not np.isfinite(current) or not np.isfinite(previous):
        return np.nan
    if abs(previous) < 1.0:
        return np.nan
    value = (current - previous) / abs(previous)
    return float(np.clip(value, -clip, clip))


def _norm_account(name: str) -> str:
    return re.sub(r"[^0-9A-Za-z가-힣]", "", str(name)).lower()


ACCOUNT_ALIASES = {
    "revenue": [
        "매출액",
        "수익매출액",
        "영업수익",
        "보험영업수익",
        "이자수익",
    ],
    "operating_profit": [
        "영업이익",
        "영업이익손실",
        "영업손익",
    ],
    "net_income": [
        "당기순이익",
        "당기순이익손실",
        "분기순이익",
        "분기순이익손실",
        "반기순이익",
        "반기순이익손실",
        "연결당기순이익",
    ],
}


def _select_income_rows(rows: list[dict]) -> list[dict]:
    income = [
        r for r in rows
        if str(r.get("sj_div", "")).upper() in {"IS", "CIS"}
    ]
    if not income:
        income = rows

    has_cfs = any(str(r.get("fs_div", "")).upper() == "CFS" for r in income)
    if has_cfs:
        income = [
            r for r in income
            if str(r.get("fs_div", "")).upper() == "CFS"
        ]
    else:
        ofs = [
            r for r in income
            if str(r.get("fs_div", "")).upper() == "OFS"
        ]
        if ofs:
            income = ofs
    return income


def _find_account(rows: list[dict], kind: str) -> dict | None:
    aliases = [_norm_account(x) for x in ACCOUNT_ALIASES[kind]]
    normalized = [(_norm_account(r.get("account_nm", "")), r) for r in rows]

    for alias in aliases:
        exact = [r for n, r in normalized if n == alias]
        if exact:
            return exact[0]

    for alias in aliases:
        partial = [r for n, r in normalized if alias in n or n in alias]
        if partial:
            return partial[0]
    return None


def _comparable_amounts(row: dict | None, report_code: str) -> tuple[float, float]:
    if row is None:
        return np.nan, np.nan

    use_cumulative = report_code in {"11012", "11014"}
    if use_cumulative:
        cur = _parse_number(row.get("thstrm_add_amount"))
        prev = _parse_number(row.get("frmtrm_add_amount"))
        if not np.isfinite(cur):
            cur = _parse_number(row.get("thstrm_amount"))
        if not np.isfinite(prev):
            prev = _parse_number(row.get("frmtrm_amount"))
    else:
        cur = _parse_number(row.get("thstrm_amount"))
        prev = _parse_number(row.get("frmtrm_amount"))

    return cur, prev


@dataclass
class DARTProvider:
    cache_dir: str = ".cache/opendart"
    pause_seconds: float = 0.08
    refresh: bool = False
    api_key: str | None = None

    def __post_init__(self):
        if self.api_key is None:
            self.api_key = require_dart_key()

    def _cache_path(self, kind: str, *parts: object) -> Path:
        raw = "|".join([kind, *[str(x) for x in parts]]).encode("utf-8")
        digest = hashlib.sha1(raw).hexdigest()[:16]
        return Path(self.cache_dir) / f"{kind}_{digest}.pkl"

    def _load_df(self, path: Path) -> pd.DataFrame | None:
        if self.refresh or not path.exists():
            return None
        try:
            obj = pd.read_pickle(path)
            if isinstance(obj, pd.DataFrame):
                return obj.copy()
        except Exception:
            pass
        return None

    def _save_df(self, path: Path, frame: pd.DataFrame) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        frame.to_pickle(path)

    def _request_json(
        self,
        endpoint: str,
        params: dict,
        allow_no_data: bool = True,
    ) -> dict:
        query = {"crtfc_key": self.api_key, **params}
        response = requests.get(
            f"{BASE_URL}/{endpoint}",
            params=query,
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        status = str(data.get("status", ""))
        message = str(data.get("message", ""))

        if status == "000":
            time.sleep(self.pause_seconds)
            return data
        if status == "013" and allow_no_data:
            return {"status": "013", "message": message, "list": []}
        raise DARTAPIError(status or "UNKNOWN", message or "unknown error")

    def corp_codes(self) -> pd.DataFrame:
        path = Path(self.cache_dir) / "corp_codes.pkl"
        cached = self._load_df(path)
        if cached is not None and not cached.empty:
            return cached

        response = requests.get(
            f"{BASE_URL}/corpCode.xml",
            params={"crtfc_key": self.api_key},
            timeout=45,
        )
        response.raise_for_status()
        raw = response.content

        try:
            with zipfile.ZipFile(BytesIO(raw)) as zf:
                xml_names = [
                    n for n in zf.namelist()
                    if n.lower().endswith(".xml")
                ]
                if not xml_names:
                    raise RuntimeError("OpenDART corpCode ZIP에 XML이 없습니다.")
                xml_bytes = zf.read(xml_names[0])
        except zipfile.BadZipFile as exc:
            preview = raw[:300].decode("utf-8", errors="ignore")
            raise RuntimeError(
                "OpenDART corpCode 응답이 ZIP이 아닙니다. "
                f"인증키 상태를 확인하세요. 응답 일부: {preview}"
            ) from exc

        root = ET.fromstring(xml_bytes)
        records = []
        for item in root.findall(".//list"):
            rec = {
                child.tag: (child.text or "").strip()
                for child in list(item)
            }
            records.append(rec)

        frame = pd.DataFrame(records)
        if frame.empty or "corp_code" not in frame.columns:
            raise RuntimeError("OpenDART 고유번호 목록 파싱에 실패했습니다.")

        if "stock_code" in frame.columns:
            frame["stock_code"] = frame["stock_code"].astype(str).str.strip()
        self._save_df(path, frame)
        return frame

    def corp_code_for_stock(self, stock_code: str) -> str:
        frame = self.corp_codes()
        hit = frame[frame["stock_code"] == str(stock_code).zfill(6)]
        if hit.empty:
            raise RuntimeError(
                f"{stock_code}: OpenDART 고유번호를 찾지 못했습니다."
            )
        return str(hit.iloc[0]["corp_code"]).zfill(8)

    def disclosures(
        self,
        stock_code: str,
        start: str | pd.Timestamp,
        end: str | pd.Timestamp,
    ) -> pd.DataFrame:
        start_s = pd.Timestamp(start).strftime("%Y%m%d")
        end_s = pd.Timestamp(end).strftime("%Y%m%d")
        path = self._cache_path("disclosures", stock_code, start_s, end_s)
        cached = self._load_df(path)
        if cached is not None:
            return cached

        corp_code = self.corp_code_for_stock(stock_code)
        rows: list[dict] = []
        page_no = 1

        while True:
            data = self._request_json(
                "list.json",
                {
                    "corp_code": corp_code,
                    "bgn_de": start_s,
                    "end_de": end_s,
                    "last_reprt_at": "N",
                    "sort": "date",
                    "sort_mth": "asc",
                    "page_no": page_no,
                    "page_count": 100,
                },
            )
            batch = list(data.get("list", []) or [])
            rows.extend(batch)

            total_page = int(data.get("total_page", 0) or 0)
            if not batch or page_no >= max(1, total_page):
                break
            page_no += 1

        frame = pd.DataFrame(rows)
        if frame.empty:
            frame = pd.DataFrame(columns=[
                "corp_code", "stock_code", "corp_name", "report_nm",
                "rcept_no", "rcept_dt", "flr_nm", "rm",
            ])
        if "rcept_dt" in frame.columns:
            frame["rcept_dt"] = pd.to_datetime(
                frame["rcept_dt"], format="%Y%m%d", errors="coerce"
            )
        self._save_df(path, frame)
        return frame

    def financial_reports(
        self,
        stock_code: str,
        start_year: int,
        end_year: int,
    ) -> pd.DataFrame:
        path = self._cache_path(
            "financial_reports", stock_code, start_year, end_year
        )
        cached = self._load_df(path)
        if cached is not None:
            return cached

        corp_code = self.corp_code_for_stock(stock_code)
        disclosure_start = f"{start_year}-01-01"
        disclosure_end = f"{end_year + 1}-06-30"
        disclosures = self.disclosures(
            stock_code, disclosure_start, disclosure_end
        )
        rcept_dates = {}
        if not disclosures.empty:
            for _, r in disclosures.dropna(subset=["rcept_no", "rcept_dt"]).iterrows():
                rcept_dates[str(r["rcept_no"])] = pd.Timestamp(r["rcept_dt"])

        out = []
        for year in range(int(start_year), int(end_year) + 1):
            for report_code, period_name in REPORT_CODES.items():
                raw_path = self._cache_path(
                    "financial_raw", stock_code, year, report_code
                )
                raw_cached = self._load_df(raw_path)
                if raw_cached is not None:
                    rows = raw_cached.to_dict("records")
                else:
                    data = self._request_json(
                        "fnlttSinglAcnt.json",
                        {
                            "corp_code": corp_code,
                            "bsns_year": str(year),
                            "reprt_code": report_code,
                        },
                    )
                    rows = list(data.get("list", []) or [])
                    self._save_df(raw_path, pd.DataFrame(rows))

                if not rows:
                    continue

                income = _select_income_rows(rows)
                revenue_row = _find_account(income, "revenue")
                op_row = _find_account(income, "operating_profit")
                net_row = _find_account(income, "net_income")

                revenue, revenue_prev = _comparable_amounts(
                    revenue_row, report_code
                )
                op_profit, op_profit_prev = _comparable_amounts(
                    op_row, report_code
                )
                net_income, net_income_prev = _comparable_amounts(
                    net_row, report_code
                )

                rcept_candidates = [
                    str(r.get("rcept_no", "")).strip()
                    for r in [revenue_row, op_row, net_row]
                    if r is not None and str(r.get("rcept_no", "")).strip()
                ]
                if not rcept_candidates:
                    rcept_candidates = [
                        str(r.get("rcept_no", "")).strip()
                        for r in rows
                        if str(r.get("rcept_no", "")).strip()
                    ]
                rcept_no = rcept_candidates[0] if rcept_candidates else ""

                filing_date = rcept_dates.get(rcept_no, pd.NaT)
                date_source = "list"
                if pd.isna(filing_date) and len(rcept_no) >= 8:
                    prefix = rcept_no[:8]
                    parsed = pd.to_datetime(
                        prefix, format="%Y%m%d", errors="coerce"
                    )
                    if pd.notna(parsed):
                        filing_date = parsed
                        date_source = "rcept_no_prefix"

                margin_op = (
                    op_profit / revenue
                    if np.isfinite(op_profit)
                    and np.isfinite(revenue)
                    and abs(revenue) >= 1.0
                    else np.nan
                )
                margin_net = (
                    net_income / revenue
                    if np.isfinite(net_income)
                    and np.isfinite(revenue)
                    and abs(revenue) >= 1.0
                    else np.nan
                )

                yoy_values = [
                    _growth(revenue, revenue_prev),
                    _growth(op_profit, op_profit_prev),
                    _growth(net_income, net_income_prev),
                ]
                finite_yoy = [x for x in yoy_values if np.isfinite(x)]

                out.append({
                    "ticker": str(stock_code).zfill(6),
                    "corp_code": corp_code,
                    "bsns_year": year,
                    "report_code": report_code,
                    "period": period_name,
                    "rcept_no": rcept_no,
                    "filing_date": filing_date,
                    "date_source": date_source,
                    "revenue": revenue,
                    "operating_profit": op_profit,
                    "net_income": net_income,
                    "revenue_yoy": yoy_values[0],
                    "operating_profit_yoy": yoy_values[1],
                    "net_income_yoy": yoy_values[2],
                    "operating_margin": float(np.clip(margin_op, -2, 2))
                    if np.isfinite(margin_op) else np.nan,
                    "net_margin": float(np.clip(margin_net, -2, 2))
                    if np.isfinite(margin_net) else np.nan,
                    "earnings_breadth": float(np.mean(np.sign(finite_yoy)))
                    if finite_yoy else np.nan,
                    "has_revenue": int(np.isfinite(revenue)),
                    "has_operating_profit": int(np.isfinite(op_profit)),
                    "has_net_income": int(np.isfinite(net_income)),
                })

        frame = pd.DataFrame(out)
        if not frame.empty:
            frame["filing_date"] = pd.to_datetime(frame["filing_date"])
            frame = (
                frame.sort_values(["filing_date", "bsns_year", "report_code"])
                .drop_duplicates(
                    subset=["bsns_year", "report_code"], keep="last"
                )
                .reset_index(drop=True)
            )
        self._save_df(path, frame)
        return frame


def diagnose_dart_key() -> dict:
    key = require_dart_key()
    provider = DARTProvider(api_key=key)
    try:
        corp = provider.corp_codes()
        samsung = corp[corp.get("stock_code", pd.Series(dtype=str)) == "005930"]
        return {
            "ok": not corp.empty,
            "corp_count": len(corp),
            "samsung_found": not samsung.empty,
            "key_length": len(key),
        }
    except DARTAPIError as exc:
        return {
            "ok": False,
            "status": exc.status,
            "message": exc.message,
            "key_length": len(key),
        }
    except Exception as exc:
        return {
            "ok": False,
            "status": "CLIENT_ERROR",
            "message": str(exc),
            "key_length": len(key),
        }
