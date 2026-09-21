SUPPORTED = {
    "005930": {"name": "삼성전자", "symbol": "005930.KS"},
    "000660": {"name": "SK하이닉스", "symbol": "000660.KS"},
    "009150": {"name": "삼성전기", "symbol": "009150.KS"},
    "005380": {"name": "현대차", "symbol": "005380.KS"},
    "035420": {"name": "NAVER", "symbol": "035420.KS"},
    "035720": {"name": "카카오", "symbol": "035720.KS"},
}

# v4 cross-sectional research starter universe.
# 운영 유니버스가 아니라 모델 구조 검증용 대형/유동 종목 묶음이다.
CROSS_SECTION_UNIVERSE = {
    "005930": {"name": "삼성전자", "symbol": "005930.KS", "sector": "semi"},
    "000660": {"name": "SK하이닉스", "symbol": "000660.KS", "sector": "semi"},
    "009150": {"name": "삼성전기", "symbol": "009150.KS", "sector": "it_parts"},
    "005380": {"name": "현대차", "symbol": "005380.KS", "sector": "auto"},
    "000270": {"name": "기아", "symbol": "000270.KS", "sector": "auto"},
    "012330": {"name": "현대모비스", "symbol": "012330.KS", "sector": "auto"},
    "035420": {"name": "NAVER", "symbol": "035420.KS", "sector": "platform"},
    "035720": {"name": "카카오", "symbol": "035720.KS", "sector": "platform"},
    "373220": {"name": "LG에너지솔루션", "symbol": "373220.KS", "sector": "battery"},
    "006400": {"name": "삼성SDI", "symbol": "006400.KS", "sector": "battery"},
    "051910": {"name": "LG화학", "symbol": "051910.KS", "sector": "chem_battery"},
    "005490": {"name": "POSCO홀딩스", "symbol": "005490.KS", "sector": "materials"},
    "207940": {"name": "삼성바이오로직스", "symbol": "207940.KS", "sector": "bio"},
    "068270": {"name": "셀트리온", "symbol": "068270.KS", "sector": "bio"},
    "105560": {"name": "KB금융", "symbol": "105560.KS", "sector": "finance"},
    "055550": {"name": "신한지주", "symbol": "055550.KS", "sector": "finance"},
    "086790": {"name": "하나금융지주", "symbol": "086790.KS", "sector": "finance"},
    "316140": {"name": "우리금융지주", "symbol": "316140.KS", "sector": "finance"},
    "028260": {"name": "삼성물산", "symbol": "028260.KS", "sector": "holding"},
    "066570": {"name": "LG전자", "symbol": "066570.KS", "sector": "electronics"},
    "034020": {"name": "두산에너빌리티", "symbol": "034020.KS", "sector": "industrial"},
    "012450": {"name": "한화에어로스페이스", "symbol": "012450.KS", "sector": "defense"},
    "329180": {"name": "HD현대중공업", "symbol": "329180.KS", "sector": "shipbuilding"},
    "015760": {"name": "한국전력", "symbol": "015760.KS", "sector": "utility"},
    "033780": {"name": "KT&G", "symbol": "033780.KS", "sector": "consumer"},
    "017670": {"name": "SK텔레콤", "symbol": "017670.KS", "sector": "telecom"},
    "011200": {"name": "HMM", "symbol": "011200.KS", "sector": "shipping"},
    "086280": {"name": "현대글로비스", "symbol": "086280.KS", "sector": "logistics"},
    "000810": {"name": "삼성화재", "symbol": "000810.KS", "sector": "insurance"},
    "402340": {"name": "SK스퀘어", "symbol": "402340.KS", "sector": "holding"},
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
