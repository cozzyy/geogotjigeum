SUPPORTED = {
    "005930": {"name": "삼성전자", "symbol": "005930.KS"},
    "000660": {"name": "SK하이닉스", "symbol": "000660.KS"},
    "009150": {"name": "삼성전기", "symbol": "009150.KS"},
    "005380": {"name": "현대차", "symbol": "005380.KS"},
    "035420": {"name": "NAVER", "symbol": "035420.KS"},
    "035720": {"name": "카카오", "symbol": "035720.KS"},
}

MARKET_SYMBOLS = {
    "kospi": "^KS11",
    "kosdaq": "^KQ11",
    "nasdaq": "^IXIC",
    "sox": "^SOX",
    "vix": "^VIX",
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
