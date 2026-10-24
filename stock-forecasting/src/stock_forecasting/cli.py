from __future__ import annotations

import argparse
import json
from .pipeline import forecast


def _pct(x):
    return f"{x*100:.1f}%"


def main():
    p = argparse.ArgumentParser(description="그곳지금 주가예측 검증용 MVP")
    p.add_argument("ticker", help="종목명 또는 종목코드 (예: 삼성전자, 005930)")
    p.add_argument("--start", default="2017-01-01")
    p.add_argument("--json", action="store_true")
    args = p.parse_args()

    f = forecast(args.ticker, start=args.start)
    payload = {
        "code": f.code,
        "name": f.name,
        "asof": f.asof.strftime("%Y-%m-%d"),
        "close": f.close,
        "model": f.model_name,
        "prob_up": f.prob_up,
        "low_price_5d": f.low_price_5d,
        "high_price_5d": f.high_price_5d,
        "backtest": f.backtest,
        "samples": f.sample_count,
    }
    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return

    print(f"{f.name} ({f.code}) / {payload['asof']} 기준")
    print(f"현재가: {f.close:,.0f}원")
    print(f"다음 거래일 상승확률: {_pct(f.prob_up)}")
    print(f"5거래일 예상범위: {f.low_price_5d:,.0f} ~ {f.high_price_5d:,.0f}원")
    print(f"모델: {f.model_name}")
    print(f"OOS 방향 적중률: {_pct(f.backtest['all']['accuracy'])}")
    print(f"OOS 범위 적중률: {_pct(f.backtest['all']['range_coverage'])}")
    print(f"검증 표본: {f.sample_count:,}건")
    print("\n주의: 과거 시장데이터 기반 통계·AI 예측이며 실제 주가와 다를 수 있습니다.")


if __name__ == "__main__":
    main()
