# V7 Momentum Anchor + ML Correction

## 배경

V6에서 sealed 12-month holdout 결과:

- V6 Ridge 5y: negative IC / negative sector-neutral spread
- 20-day momentum baseline: positive IC / positive sector-neutral spread

따라서 V7은 ML이 처음부터 종목 순위를 만드는 구조를 폐기하고,
20-day cross-sectional momentum을 anchor로 고정한다.

ML의 역할은 다음 하나로 제한한다.

> 현재 모멘텀 신호가 앞으로도 유지될지, 꺾일지를 보정한다.

## 핵심 구조

### Anchor

~~~text
anchor = rank_ret_20d
~~~

즉 같은 날짜의 30종목 중 20일 수익률 percentile rank.

### Residual target

~~~text
residual = future_sector_neutral_rank_5d - anchor
~~~

ML은 미래 rank 자체가 아니라 anchor가 틀릴 부분만 학습한다.

### Final score

~~~text
final_score = anchor + lambda * predicted_residual
~~~

lambda 후보:

- 0.00
- 0.10
- 0.25
- 0.50

lambda=0은 plain momentum과 완전히 동일하다.

따라서 calibration 구간에서 ML이 실질적으로 도움이 되지 않으면
자동으로 anchor-only가 선택된다.

## Momentum quality features

- 5/10/20/60일 momentum rank
- 20일 momentum strength
- multi-horizon momentum mean
- horizon 간 momentum dispersion
- momentum alignment
- near-term vs long-term momentum difference
- risk-adjusted 20d momentum
- sector momentum
- sector-relative momentum

## Regime / crash features

20일 momentum과 다음 변수를 interaction으로 사용한다.

- KOSPI 20d return
- KOSPI volatility
- Nasdaq 20d return
- SOX 20d return
- VIX 20d change
- market breadth
- cross-sectional dispersion
- stock volatility
- stock skewness
- drawdown

간단한 market-stress proxy도 추가한다.

## Nested walk-forward

V6 최근 12개월 결과를 이미 확인했기 때문에
그 구간은 더 이상 pristine final holdout으로 취급하지 않는다.

V7 검증은 각 outer fold에서:

1. 테스트 직전 12개월 = calibration
2. calibration 이전 데이터로 residual model 학습
3. calibration에서
   - anchor-only
   - Ridge correction
   - ExtraTrees correction
   - lambda
   - train window
   를 선택
4. 선택된 설정을 test 직전까지 다시 학습
5. 다음 outer test period 평가

즉 각 fold의 선택은 미래 test 데이터를 보지 않는다.

## 모델

Residual correction:

- Ridge
- ExtraTrees

Fast mode:
- 5y training window

Full mode:
- 3y
- 5y

## 평가

V7과 plain momentum20을 동일 OOS 날짜에서 비교.

- 5-offset mean IC
- IC standard deviation
- positive IC rate
- sector-neutral top-bottom spread
- neutral spread standard deviation
- positive neutral spread rate
- raw spread
- top beats median

Fold별로 어떤 설정이 선택됐는지도 출력한다.

특히:

~~~text
ML correction 선택 비율
~~~

을 본다.

anchor-only가 자주 선택된다면,
현재 데이터에서는 ML이 momentum을 안정적으로 개선하지 못한다는 뜻이다.

## 실행

빠른 검증:

~~~powershell
py -m stock_forecasting.v7_momentum_anchor --fast
~~~

전체 3y/5y 비교:

~~~powershell
py -m stock_forecasting.v7_momentum_anchor
~~~

Investor flow 파일이 준비된 경우:

~~~powershell
py -m stock_forecasting.v7_momentum_anchor --fast --investor-flow-dir data/investor_flow
~~~

## 연구상 주의

V7 설계 자체가 V6의 2025-09~2026-09 결과를 보고 만들어졌다.

따라서 해당 기간을 다시 완전 독립 holdout이라고 주장하지 않는다.

V7 구조를 동결한 이후 새롭게 발생하는 실제 시장 데이터가
진짜 live holdout이 된다.
