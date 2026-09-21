# V14 Frozen Live Shadow Evaluator

## 목적

V13 이후 historical tuning을 중단한다.

V14는 새로운 모델 실험이 아니라
V13에서 정한 후보를 **미래 실제 데이터에서 그대로 기록하고 평가**하는 단계다.

과거 데이터를 다시 돌려 V14 log를 backfill하지 않는다.

## Frozen model

Model version:

`v14-shadow-2026-09-21-v1`

고정 구성:

- Universe: 현재 연구용 30종목
- Horizon: 5 trading days
- Train window: rolling 3 years
- Base: V10 Price + Size/Liquidity + Conservative Valuation
- DART: category-specific features excluding ownership
- DART generic all-event aggregates: 제외
- ExtraTrees:
  - n_estimators 260
  - max_depth 10
  - min_samples_leaf 20
  - max_features 0.45
  - random_state 42
- Fusion:
  - no qualifying DART event: Base 100%
  - qualifying event within previous 20 trading days:
    Base 50% + DART 50%
- DART same-day filing: 사용 금지
- filing information: first strictly later trading day부터 사용

이 설정은 V14 live period 동안 변경하지 않는다.

## Freeze manifest

첫 run 때:

`.shadow/v14/freeze_manifest.json`

을 생성한다.

manifest에는:
- model version
- model parameters
- horizon
- train years
- feature policy
- DART gate categories/window
- fusion weight
- point-in-time rule
- promotion policy

가 기록된다.

이후 코드의 frozen 설정과 manifest가 다르면 V14 run은 중단한다.

설계를 바꾸려면 기존 V14 결과를 덮는 대신
새 model version / 별도 shadow directory를 만들어야 한다.

## Daily snapshot

매 run의 최신 완료 market date에 대해 각 종목별로 기록:

- as_of_date
- ticker / name / broad_sector
- base_score_raw
- dart_score_raw
- base_rank_score
- dart_rank_score
- dart_gate_active
- active_dart_categories
- final_score / final_rank
- training start
- latest fully realized training-label cutoff
- model version
- created timestamp
- target settlement status

같은 market date + model version의 snapshot이 이미 존재하면
재실행해도 덮어쓰지 않는다.

이 규칙은 historical data revision이나
사후 재학습이 과거 live prediction을 바꾸는 것을 막기 위한 것이다.

## Label settlement

새 run 시 기존 pending prediction을 확인한다.

해당 as_of date의 5거래일 forward target이 현재 panel에서
완전히 관측 가능해지면 자동으로:

- future_ret_5d
- future_sector_neutral_5d
- target_sector_neutral_rank_5d
- realized_date
- settled_at_utc

를 채우고 status를 `settled`로 바꾼다.

## Freshness

Yahoo Finance cache는 live run 기본값에서 삭제 후 다시 조회한다.

이유:
historical research의 6시간 cache가
당일 live snapshot에 stale daily bar를 공급하는 것을 피하기 위함.

KRX/DART는 날짜가 바뀌면 기존 provider cache key의 end date도 바뀌므로
새 날짜는 새 cache를 만든다.

강제 원천 재조회가 필요한 경우에만:

~~~powershell
py -m stock_forecasting.v14_live_shadow run --refresh-krx --refresh-dart
~~~

주의:
KRX `--refresh-krx`는 30종목 full history를 다시 받을 수 있어 오래 걸릴 수 있다.

## Local files

기본 directory:

`.shadow/v14/`

생성:

- freeze_manifest.json
- predictions.csv
- daily_metrics.csv
- cost_metrics.csv
- status.json

`.shadow/`는 gitignore 대상이다.
API key/password나 live research log를 GitHub에 commit하지 않는다.

## Promotion policy

이 기준은 live 결과를 보기 전에 고정한다.

최소 관측:

- realized trading days >= 126
- realized calendar months >= 6
- median daily universe coverage >= 90%

Prediction quality:

- candidate mean rank IC >= 0.020
- candidate IC - Base IC >= 0.005
- positive IC day rate >= 53%
- last 63 trading-day mean IC >= 0

Uncertainty:

- monthly block bootstrap IC 95% CI lower bound > 0

Economic diagnostic:

- estimated 10 bps one-way transaction-cost-adjusted
  sector-neutral top-bottom spread > 0

모든 조건을 만족해야:

`PROMOTION_ELIGIBLE`

그 전:
- 충분한 기간이 아니면 `COLLECTING`
- 기간은 충분하지만 하나라도 실패하면 `SHADOW_ONLY`

중요:
PROMOTION_ELIGIBLE은 자동으로 사용자-facing 투자 신호를 켠다는 뜻이 아니다.
사전에 고정한 research gate를 통과했다는 뜻이다.

## 최초 실행

V13 이후 처음 실행한 날부터가 live holdout 시작이다.

~~~powershell
git pull
py -m pip install -e .
py -m pytest tests/test_v14_live_shadow.py -q
py -m stock_forecasting.v14_live_shadow run
~~~

가능하면 한국장 종료 후 실행한다.

첫날에는 target이 없으므로 status는 정상적으로:

`COLLECTING`

으로 나온다.

## 이후 실행

매 거래일 장 종료 후:

~~~powershell
py -m stock_forecasting.v14_live_shadow run
~~~

이미 오늘 snapshot이 있으면 새 prediction은 만들지 않고
기존 pending target settlement/status update만 수행한다.

## 네트워크 없이 현재 상태 확인

~~~powershell
py -m stock_forecasting.v14_live_shadow status
~~~

## 운영 원칙

V14 live holdout이 쌓이는 동안:

- historical window 재튜닝 금지
- DART weight 재튜닝 금지
- 20d gate 재튜닝 금지
- category cherry-picking 금지
- promotion threshold 변경 금지
- 기존 live prediction overwrite 금지

별도 연구 아이디어가 생기면 V14를 수정하지 않고
새 challenger model/version으로 병렬 shadow test한다.

이렇게 해야 V14 live result가 처음으로
researcher feedback loop에서 분리된 out-of-sample evidence가 된다.
