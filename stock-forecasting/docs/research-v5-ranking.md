# V5 Direct Ranking / Sector-Neutral Research

## 왜 v4에서 다시 바꾸는가

v4는 cross-sectional 문제로 전환했지만 여전히 상위 30%/하위 30% 이진분류를 학습한 뒤
그 확률로 전체 종목을 순위화했다.

실측 결과:
- Rank IC는 약하게 양수
- 그러나 top-bottom 5일 spread는 음수
- 상위권이 특정 섹터에 몰리는 현상

즉 학습 목적과 실제 사용 목적(전체 순위)이 완전히 일치하지 않았다.

## V5 핵심

### 1. rank 자체를 직접 예측

분류 대신 향후 수익률 percentile rank(0~1)를 직접 회귀한다.

- raw_rank: 전체 종목 5일 수익률 percentile
- sector_neutral_rank: broad sector median을 제거한 5일 수익률 percentile

기본 target은 sector_neutral_rank.

### 2. sector-neutralization

현재 30종목 유니버스의 세부 업종을 broad sector로 묶는다.

- tech
- industrial
- materials
- financial
- healthcare
- defensive
- diversified

미래수익률에서 같은 날짜/같은 broad sector median을 제거한 뒤
다시 전체 cross-sectional rank를 계산한다.

목적:
- 특정 섹터가 강했던 시기를 단순히 맞히는 것과
- 같은 섹터 안에서 상대적으로 좋은 종목을 고르는 것을 분리

### 3. feature

기존 raw feature에 추가:
- 전체 시장 내 percentile rank
- broad sector 내 percentile rank
- sector-relative momentum/volatility/volume
- sector median momentum
- market breadth
- cross-sectional return dispersion
- KOSPI / Nasdaq / SOX / VIX / USDKRW regime

### 4. model

- Ridge rank regression
- HistGradientBoostingRegressor
- ExtraTreesRegressor
- Pairwise Linear Ranker

Pairwise ranker는 같은 날짜의 상위/하위 종목 쌍의 feature difference를 이용해
어느 종목이 더 높은 미래 rank를 가져야 하는지 직접 학습한다.

## 평가

5일 target은 매일 겹치므로 두 종류를 같이 본다.

### Daily
- daily mean IC
- daily raw spread
- daily sector-neutral spread

### Non-overlap
5거래일 간격으로 날짜를 골라 평가:
- mean Rank IC
- positive IC rate
- top-bottom raw spread
- positive raw spread rate
- top-bottom sector-neutral spread
- positive sector-neutral spread rate
- top beats median

최근 12개월도 별도 출력.

## 실행

빠른 30종목 비교:

~~~powershell
py -m stock_forecasting.v5_rank --fast
~~~

처음 구조만 15종목으로 확인:

~~~powershell
py -m stock_forecasting.v5_rank --fast --max-tickers 15
~~~

raw rank와 비교:

~~~powershell
py -m stock_forecasting.v5_rank --fast --target raw_rank
~~~

20일 horizon 연구:

~~~powershell
py -m stock_forecasting.v5_rank --fast --horizon 20
~~~

전체 모델:

~~~powershell
py -m stock_forecasting.v5_rank
~~~

## 다음 확장 조건

V5에서 다음이 동시에 나타나는지를 본다.

- non-overlap mean IC > 0
- positive IC rate > 50%
- sector-neutral spread > 0
- positive neutral spread rate > 50%
- 최근 12개월에도 같은 방향

패턴이 반복적으로 유지되면:
1. 100+ 종목으로 확대
2. KOSPI200/KOSDAQ150 historical constituent 처리
3. investor flow / turnover / sector index 추가
4. gradient boosted learning-to-rank 또는 listwise ranker 검토
