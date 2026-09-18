SUPPORTED = {
    "005930": {"name": "삼성전자", "symbol": "005930.KS"},
    "000660": {"name": "SK하이닉스", "symbol": "000660.KS"},
    "009150": {"name": "삼성전기", "symbol": "009150.KS"},
    "005380": {"name": "현대차", "symbol": "005380.KS"},
    "035420": {"name": "NAVER", "symbol": "035420.KS"},
    "035720": {"name": "카카오", "symbol": "035720.KS"},
}

# Yahoo Finance symbols.  한국시장 지수는 당일 종가 사용 가능,
# 미국/글로벌 신호는 한국장 기준 이전에 확정된 세션만 사용한다.
MARKET_SYMBOLS = {
    "kospi": "^KS11",
    "kosdaq": "^KQ11",
    "sp500": "^GSPC",
    "nasdaq": "^IXIC",
    "sox": "^SOX",
    "smh": "SMH",
    "soxx": "SOXX",
    "nvda": "NVDA",
    "micron": "MU",
    "tsm": "TSM",
    "vix": "^VIX",
    "tnx": "^TNX",
    "dxy": "DX-Y.NYB",
    "usdkrw": "KRW=X",
}

ALIASES = {}
for code, meta in SUPPORTED.items():
    ALIASES[code] = code
    ALIASES[meta["name"].lower()] = code
    ALIASES[meta["symbol"].lower()] = code


def resolve_ticker(query: str) -> tuple[str, dict]:
    key = query.strip().lower()
    code = ALIASES.get(key)
    if not code:
        raise ValueError(f"지원하지 않는 종목입니다: {query}")
    return code, SUPPORTED[code]
