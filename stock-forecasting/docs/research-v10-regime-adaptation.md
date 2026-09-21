# V10 Regime Adaptation

## 배경

V9에서 가장 유망했던 변수군은 Price + Size + Valuation이었다.

Fast / 30-stock:
- price_only IC: 0.0271
- price + size + valuation IC: 0.0350
- price + size + valuation neutral spread: +0.0539%

하지만 2025, 2026에는 IC와 neutral spread가 다시 음수로 돌아섰다.

V10은 feature를 더 늘리지 않고 같은 정보로 학습의 시간 적응 속도를 비교한다.

## 고정 feature set

### Price
V6/V8 price, volume, volatility, market-regime features.

### Size / Liquidity
- log market cap
- traded value / market cap turnover
- log listed shares
- cross-sectional / sector ranks

### Conservative Valuation
- earnings yield
- PER
- book-to-market
- PBR
- dividend yield
- corresponding cross-sectional / sector ranks

V10에서는 EPS/BPS/DPS level/change 및 flow는 제외한다.

이유:
- V9에서 flow는 incremental OOS value가 없었음
- accounting은 개선폭이 작았음
- point-in-time 해석이 더 단순한 valuation/size 중심으로 축소

## 적응 후보

동일 ExtraTrees 구조에서:

1. rolling_2y
2. rolling_3y
3. rolling_5y
4. rolling_5y_hl1y
5. rolling_5y_hl2y

### Half-life weighting

5년 데이터는 유지하되 오래된 관측치 weight를 지수적으로 감소시킨다.

- hl1y: 1년 전 observation weight 약 0.5
- hl2y: 2년 전 observation weight 약 0.5

최저 weight는 0.02로 clip한다.

## Dynamic V10

각 fixed config의 walk-forward prediction을 먼저 만든다.

그 후 각 테스트 구간 직전 12개월의 OOS prediction만 사용해
어떤 config를 다음 기간에 쓸지 선택한다.

선택 objective:
- Rank IC
- sector-neutral spread
- positive IC rate
- positive neutral spread rate
- offset instability penalty

즉 현재 테스트 구간의 결과를 보고 config를 고르지 않는다.

## Fast

~~~powershell
py -m stock_forecasting.v10_regime_adaptation --fast
~~~

- 120-tree ExtraTrees
- 12개월 test fold
- 2y/3y/5y + 5y half-life 1y/2y
- 마지막에 dynamic selection

## Full

~~~powershell
py -m stock_forecasting.v10_regime_adaptation
~~~

- 260-tree ExtraTrees
- 6개월 test fold

## 판정

전체 OOS:
- offset_mean_ic
- offset_mean_neutral_spread
- positive-rate
- positive year rate

최근 2025+:
- recent_mean_ic
- recent_positive_ic_rate
- recent_mean_neutral_spread
- recent_positive_neutral_spread_rate

핵심 질문:

1. 2y / 3y rolling이 5y보다 최근 성능을 개선하는가?
2. 5y + recency weighting이 history를 버리지 않고 최근 적응력을 높이는가?
3. dynamic_v10이 fixed config보다 전체와 최근 모두 개선되는가?
4. 개선이 IC 하나가 아니라 spread와 positive-rate에서도 반복되는가?

## 해석상 주의

V10 구조는 이미 V9의 2025~2026 성능 저하를 본 후 설계했다.
따라서 2025~2026을 pristine final holdout이라고 부르지 않는다.

Dynamic selection의 각 historical test는 해당 시점 이전 OOS 결과만 사용하지만,
V10 연구 방향 자체는 과거 결과에 영향을 받았다.

V10 동결 이후 새롭게 발생하는 실제 시장 데이터가 최종 live holdout이다.
