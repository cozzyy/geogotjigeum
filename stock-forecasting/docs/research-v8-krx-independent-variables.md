# V8 KRX Independent Variables

## 목적

V1~V7에서 가격/거래량/시장지수 중심 feature와 여러 모델을 반복 검증했지만
안정적인 OOS 개선이 확인되지 않았다.

V8의 질문은 모델이 아니라 독립변수다.

> 외국인/기관 수급, 시가총액/회전율, 가치/이익 지표처럼 가격과 다른 정보원을 추가하면
> 동일 모델의 OOS ranking 성능이 실제로 개선되는가?

## 데이터 소스

### 기존
- Yahoo Finance OHLCV
- KOSPI/KOSDAQ
- S&P500/Nasdaq/SOX/VIX/US10Y/DXY/USDKRW

### V8 신규: KRX / pykrx
- 투자자별 순매수 거래대금
- 시가총액
- KRX 거래대금
- 상장주식수
- BPS
- PER
- PBR
- EPS
- 배당수익률
- DPS

데이터는 .cache/pykrx 에 캐시한다.

## 신규 feature

### Flow
- foreign/institution/individual/other-corp net
- 순매수 / 거래대금 비율
- 5일/20일 누적 순매수 비율
- 5일/20일 순매수 양수 비중
- 5일 대비 20일 flow acceleration
- foreign + institution smart-money ratio
- foreign/institution agreement
- foreign - institution divergence

### Size / Liquidity
- log market cap
- traded value / market cap turnover
- log listed shares

### Fundamental
- earnings yield = 1 / PER
- book-to-market = 1 / PBR
- dividend yield
- EPS level / 20d change
- EPS update event
- BPS level / 20d change
- DPS

각 신규 feature에 대해:
- 전체 종목 cross-sectional percentile rank
- broad-sector 내부 percentile rank

도 추가한다.

## 검증

모델과 날짜를 고정한 feature ablation.

비교 세트:

1. price_only
2. price_plus_flow
3. price_plus_all_krx
4. krx_only
5. momentum20 baseline

Fast:
- ExtraTrees
- 12개월 test fold

Full:
- Ridge
- ExtraTrees
- 6개월 test fold

모든 ML:
- 5년 rolling train
- target horizon만큼 purge
- 5개 non-overlap offset 평가

## Data coverage guard

V8은 KRX 응답이 빈 상태에서 조용히 학습하지 않는다.

실행 시 다음 coverage를 출력한다.

- foreign_net
- institution_net
- individual_net
- market_cap
- traded value
- PER/PBR/EPS/BPS/dividend yield

외국인/기관 수급 평균 coverage가 20% 미만이면 실험을 중단한다.

## 실행

먼저 데이터 연결 확인:

~~~powershell
py -m stock_forecasting.v8_krx_variables --fast --max-tickers 10
~~~

이 단계는 성능 판정용이 아니라 KRX 데이터가 정상 수집되는지 확인하는 용도다.

30종목 실제 빠른 ablation:

~~~powershell
py -m stock_forecasting.v8_krx_variables --fast
~~~

전체 모델/6개월 fold:

~~~powershell
py -m stock_forecasting.v8_krx_variables
~~~

KRX 캐시 강제 갱신:

~~~powershell
py -m stock_forecasting.v8_krx_variables --fast --refresh-krx
~~~

## KRX 인증

최신 pykrx/KRX 환경에서 인증이 필요한 API가 있으면 PowerShell에서:

~~~powershell
$env:KRX_ID="..."
$env:KRX_PW="..."
~~~

환경변수만 사용하고 계정정보는 repository에 저장하지 않는다.

## 판정 기준

가장 중요한 비교는 같은 ExtraTrees에서:

- price_only
- price_plus_flow
- price_plus_all_krx

이다.

출력:
- delta_ic_vs_price
- delta_neutral_spread_vs_price

두 값이 여러 OOS 구간과 5개 offset에서 함께 양수여야 신규 독립변수가 실제 incremental information을 제공한다고 본다.

KRX-only가 자체적으로 양수인 경우에는
가격계열과 독립적인 예측정보가 존재할 가능성이 더 강해진다.
