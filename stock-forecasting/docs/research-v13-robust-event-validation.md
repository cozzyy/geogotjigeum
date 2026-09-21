# V13 Robust Event Validation

## 목적

V12에서 DART signal은 2025+ 구간에서 개선 가능성을 보였지만,
그 자체로 production edge를 의미하지 않는다.

특히 다음 대안 설명이 남아 있다.

- 공시 직후가 아니라 원래 그런 종목에서 모델이 잘 맞았을 수 있음
- event 전에도 같은 성능이 있었을 수 있음
- ownership 빈도가 높아 event gate가 사실상 거의 항상 켜졌을 수 있음
- 평균 spread가 serial dependence / 특정 월에 의해 과대평가됐을 수 있음
- 짧은 event strategy는 거래비용으로 사라질 수 있음

V13은 새로운 feature/weight/window 탐색이 아니라
V12에서 정한 후보를 동결하고 robustness만 검증한다.

## Frozen candidates

1. base_only
2. event_gated_all_w50_20d
3. event_gated_no_ownership_w50_20d

고정:
- 3년 rolling
- ExtraTrees
- 5일 horizon 기본
- DART 50% late fusion
- event gate 20거래일
- 기존 다음 거래일 point-in-time rule

V13 결과를 보고 weight/window를 미세 조정하지 않는다.

## 0. Gate coverage

all-event gate와 no-ownership gate가 실제 universe의 몇 %를 덮는지 측정한다.

출력:
- row coverage
- median daily universe coverage
- p90 daily universe coverage
- 전체 / 2025+

all-event 20d가 대부분 종목에서 항상 켜져 있다면
event-gated 구조는 사실상 상시 late-fusion에 가까운 것으로 해석한다.

## 1. Headline OOS metrics

세 후보에 대해 기존과 동일하게:
- 5-offset IC
- positive IC rate
- sector-neutral spread
- positive spread rate
- 2025+ recent metrics

를 다시 출력한다.

이 단계는 V12 재현 확인용이다.

## 2. Pre-event placebo

진짜 event-local 정보라면
공시 후 성능이 공시 직전보다 나아야 한다.

공시 feature의 안전한 활성화 거래일을 t=0으로 정의한다.

Post:
- 5일: t=0..4
- 20일: t=0..19

Placebo pre:
- 5일: t=-5..-1
- 20일: t=-20..-1

중요:
pre 구간이 동일 category의 이전 event post-window와 겹치면 제외한다.

미래 event date는 오직 evaluation subset을 정의하는 데만 사용하며
모델 feature나 training에는 절대 들어가지 않는다.

Focus categories:
- earnings
- periodic
- contract
- treasury
- dividend
- ownership

비교:
- post rank IC vs pre rank IC
- post spread vs pre spread
- post absolute rank error vs pre error
- 전체 / 2025+

## 3. Matched control

event 발생 종목과 다음 조건의 control을 같은 날짜에서 매칭한다.

우선:
- 같은 날짜
- 같은 broad sector
- log market cap이 가장 가까운 종목
- 같은 category event의 post/pre window 밖

같은 sector control이 없으면
같은 날짜 전체 universe에서 가장 가까운 size control로 fallback한다.

한 날짜 안에서는 같은 control ticker를 중복 사용하지 않는다.

출력:
- matched pair 수
- sector match rate
- event/control rank IC
- event/control top-bottom neutral spread
- event/control mean absolute rank error

Event 쪽 성능이 matched control보다 좋아야
단순 sector/size selection effect 설명이 약해진다.

## 4. Monthly block bootstrap

일별 5일 forward return은 serial dependence가 있기 때문에
iid standard error를 사용하지 않는다.

calendar month를 block으로 보고 월 단위 resampling을 수행한다.

Fast:
- 300 bootstrap reps

Full:
- 1000 reps

출력:
- observed mean IC
- IC 95% bootstrap interval
- IC bootstrap positive rate
- observed neutral spread
- spread 95% bootstrap interval
- spread bootstrap positive rate
- 전체 / 2025+

주의:
monthly bootstrap도 researcher degrees of freedom을 제거하지는 않는다.
V7~V13 설계가 2025~2026 결과를 보며 발전했기 때문에
해당 구간은 final pristine holdout이 아니다.

## 5. Turnover / transaction costs

5일 horizon에서 5개 non-overlap offset별로
top 20% / bottom 20% equal-weight membership를 구성한다.

각 다음 rebalance에서:
- top churn
- bottom churn

을 계산한다.

비용 가정:
- 5 bps
- 10 bps
- 20 bps
one-way execution cost.

+1 long / -1 short 두 book을 가정하여
교체 fraction f의 close+open 비용을 반영한다.

Approximate cost:
2 * one_way_cost * (top_churn + bottom_churn)

출력:
- gross sector-neutral spread
- average top/bottom churn
- net spread after 5/10/20 bps
- 전체 / 2025+

이는 완전한 portfolio simulator가 아니라
event signal이 합리적인 비용 가정에서도 남는지 보는 diagnostic이다.

## 실행

기존 KRX / DART cache 재사용:

~~~powershell
git pull
py -m pip install -e .
py -m stock_forecasting.v13_robust_event_validation --fast
~~~

원한다면 bootstrap reps 직접 지정:

~~~powershell
py -m stock_forecasting.v13_robust_event_validation --fast --bootstrap-reps 500
~~~

Full:

~~~powershell
py -m stock_forecasting.v13_robust_event_validation
~~~

## 판정 순서

1. all-event gate coverage가 지나치게 높지 않은가
2. post-event > pre-event placebo인가
3. event > matched control인가
4. bootstrap CI가 0을 넓게 가로지르는가
5. 10~20bp 비용 후에도 spread가 남는가

한두 지표만 좋다고 채택하지 않는다.

## Freeze rule

V13 이후에는 historical 2025+ 결과를 보고
weight/window/category 조합을 다시 세밀하게 튜닝하지 않는다.

V13에서 가장 방어적인 구조를 하나 정한 뒤
그 구조를 freeze하고 이후 새롭게 발생하는 실제 시장 데이터를
live holdout으로 쌓는다.

최종 서비스 승격 여부는 이 live holdout을 기준으로 판단한다.
