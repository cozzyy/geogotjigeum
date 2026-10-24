# V6 Robust Data + Sealed Holdout Validation

## 목적

V5에서 전체 기간에는 약한 양의 Rank IC가 관찰됐지만 최근 12개월 성능이 역전됐다.

V6는 모델을 크게 바꾸기보다 다음 두 가지를 강화한다.

1. 데이터 표현
2. 검증 설계

주력 모델은 ExtraTreesRegressor를 유지하고 Ridge를 sanity-check baseline으로 둔다.

## 추가 데이터/피처

### 가격/추세
- 1/2/3/5/10/20/60일 수익률
- 이동평균 거리
- gap / intraday return
- 20/60일 고점·저점 거리
- drawdown

### 변동성
- 5/10/20/60일 realized volatility
- downside volatility
- 20일 skew
- short/long volatility ratio

### 유동성/거래대금
- 거래량 비율
- 거래대금 log
- 거래대금 5/20일 비율
- 거래대금 z-score
- Amihud-style illiquidity
- return vs traded-value correlation

### Cross-sectional
- 전체 종목 percentile rank
- broad-sector 내부 percentile rank
- sector-relative momentum/volatility/liquidity
- market breadth
- sector breadth
- cross-sectional dispersion

### 시장 레짐
- KOSPI
- KOSDAQ
- S&P500
- Nasdaq
- SOX
- VIX
- US 10Y
- DXY
- USD/KRW

한국지수는 한국장 마감 후 예측이라는 전제에서 당일 값을 사용한다.
해외 변수는 이전에 완료된 세션만 사용한다.

## 외국인/기관 수급 확장 인터페이스

V6는 선택적으로 investor-flow 파일을 merge할 수 있다.

디렉터리 구조 예:

~~~text
data/investor_flow/
  005930.csv
  000660.csv
  ...
~~~

CSV 최소 형식:

~~~text
date,foreign_net,institution_net
2026-01-02,123456789,-23456789
...
~~~

허용 alias:
- foreign_net / foreign_net_value / foreign
- institution_net / institution_net_value / institution

실행:

~~~powershell
py -m stock_forecasting.v6_robust --fast --investor-flow-dir data/investor_flow
~~~

수급 파일이 없으면 가격/유동성/시장 데이터만으로 정상 실행한다.

## 검증 설계

### 1. 최근 12개월 봉인

데이터 마지막 날짜 기준 최근 12개월을 final holdout으로 고정한다.

이 구간의 결과는 모델/학습창 선택에 사용하지 않는다.

### 2. Pre-holdout 모델 선택

holdout 이전 데이터에서만 다음을 비교한다.

모델:
- Ridge
- ExtraTrees

학습창:
- 3년 rolling
- 5년 rolling
- expanding

fast 모드:
- 5년
- expanding

### 3. 5개 non-overlap offset

5일 horizon은 연속 날짜 target이 서로 겹친다.

따라서 5거래일 간격 평가를 한 번만 하지 않고
offset 0,1,2,3,4를 모두 계산한다.

각 offset별:
- mean IC
- positive IC rate
- top-bottom spread
- sector-neutral spread
- positive spread rate

를 계산하고 평균과 표준편차를 함께 본다.

### 4. Final holdout

pre-holdout에서 가장 좋은 모델/학습창을 선택한 뒤
최근 12개월 holdout을 딱 한 번 평가한다.

비교 baseline:
- 20일 momentum rank
- 5일 reversal rank

## 실행

빠른 검증:

~~~powershell
py -m stock_forecasting.v6_robust --fast
~~~

전체 3y/5y/expanding 비교:

~~~powershell
py -m stock_forecasting.v6_robust
~~~

## 핵심 판정

Final holdout에서 아래를 본다.

- offset_mean_ic
- offset_std_ic
- offset_positive_ic_rate
- offset_mean_neutral_spread
- offset_std_neutral_spread
- offset_positive_neutral_spread_rate

V6는 단순히 전체 평균이 양수인 것보다
5개 offset 대부분에서 동일 방향이 유지되는지를 더 중요하게 본다.

특히 V6가 momentum/reversal baseline보다
holdout에서 안정적으로 나은지를 확인한다.
