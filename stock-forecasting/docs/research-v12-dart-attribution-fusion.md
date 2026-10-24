# V12 DART Attribution / Event Window / Late Fusion

## 배경

V11 fast 30-stock 결과:

- base_v10: IC 0.0388 / neutral spread +0.1002%
- base + earnings events: recent IC 0.0143 / recent spread -0.2051%
- base + corporate events: recent IC 0.0084 / recent spread -0.0368%
- all DART early-fusion: recent IC -0.0012 / recent spread -0.2493%
- DART-only: recent IC 0.0239 / recent spread +0.4373%

DART-only는 2025+에서 강했지만 전체 IC는 0.0048에 그쳤다.
또 ownership 공시가 16,764건으로 전체 DART 공시의 큰 비중을 차지했다.

V12는 이 결과를 그대로 채택하지 않고 세 가지를 검증한다.

1. 어떤 공시 카테고리가 incremental value를 만드는가
2. 신호가 실제 공시 후 1/5/20 거래일에 집중되는가
3. Base와 DART를 별도 모델로 학습한 late-fusion이 early-fusion보다 안정적인가

## 1. Category attribution

3년 rolling ExtraTrees와 기존 point-in-time 규칙을 고정한다.

Base:
- V10 Price + Size/Liquidity + Conservative Valuation

각 DART category를 하나씩 Base에 추가:

- earnings
- periodic
- contract
- capital
- debt
- treasury
- dividend
- ma_reorg
- ownership
- investment
- litigation
- governance

각 category별로 다음 delta를 출력한다.

- delta IC vs Base
- delta neutral spread vs Base
- delta recent(2025+) IC vs Base
- delta recent spread vs Base

목적은 ownership 하나가 최근 개선을 독점했는지,
또는 contract/treasury/dividend/investment 등 다른 이벤트도
독립적인 정보를 주는지 확인하는 것이다.

## 2. DART no-ownership model

DART-only 전체 모델 외에 ownership category를 완전히 제외한
DART-only 모델을 별도 학습한다.

중요:
generic `dart_event_*` aggregate는 ownership을 포함할 수 있으므로
no-ownership 모델에는 generic aggregate를 넣지 않는다.

즉 category-specific feature만 조합하여 ownership 제거가 실제로 되도록 한다.

## 3. Late fusion

Base와 DART는 서로 다른 feature matrix로 독립 학습한다.

각 날짜마다:
- Base score -> cross-sectional percentile rank
- DART score -> cross-sectional percentile rank

그 후 고정 비중으로 결합:

- DART 25%
- DART 50%
- DART 75%

각각:
- DART all
- DART no-ownership

을 비교한다.

이는 모든 feature를 한 ExtraTrees에 넣었던 V11 early-fusion과 다르다.

## 4. Event-gated late fusion

평상시에는 Base 100%.

최근 20거래일 이내 DART event가 있는 종목에만:
- Base 50%
- DART 50%

을 적용한다.

두 버전:
- 모든 DART category gate
- ownership 제외 category gate

목적은 DART가 실제 이벤트 근처에서만 유효하다면
평상시 noise를 줄이는 것이다.

## 5. Event-window diagnostics

각 모델 score를 같은 날짜의 cross-sectional percentile rank로 변환한 뒤
event-exposed observation만 선택한다.

공시가 V11 규칙에 따라 활성화된 시점 이후:

- 1 거래일
- 5 거래일
- 20 거래일

에 대해 다음을 측정한다.

- observations
- unique days
- unique tickers
- pooled rank IC
- score 상위 30% vs 하위 30% sector-neutral return spread
- score 상위 30%의 positive neutral-return rate

기간:
- 전체
- 2025+

핵심 카테고리 표:
- ownership
- earnings
- contract
- treasury
- dividend
- investment

## Point-in-time

V11과 동일:

OpenDART 공시는 접수일 당일에 사용하지 않는다.
접수일보다 엄격히 뒤의 첫 거래일부터 feature를 활성화한다.

따라서 event-window의 1d는 '공시 접수 당일'이 아니라
**정보가 안전하게 사용 가능한 첫 거래일**이다.

## 실행

기존 KRX / DART 캐시 재사용:

~~~powershell
git pull
py -m pip install -e .
py -m stock_forecasting.v12_dart_attribution_fusion --fast
~~~

처음부터 원천 데이터를 다시 받으려는 목적이 아니라면
`--refresh-krx`, `--refresh-dart`를 사용하지 않는다.

## 결과 판정

### Category attribution
ownership만 최근 delta가 크면:
- V11 recent DART signal이 ownership-heavy effect일 가능성
- ownership 내부 세부유형 분해 필요

여러 category가 반복 개선되면:
- 기업 이벤트 정보의 일반적인 incremental value 후보

### DART no-ownership
all 대비 최근 성능이 유지/개선되면:
- ownership dominance 우려 감소

크게 무너지면:
- V11 신호가 ownership 의존적일 가능성

### Late fusion
Base의 전체 IC와 DART의 최근 spread가 함께 유지되면:
- early-fusion보다 production 후보에 가까움

### Event-gated
fixed late-fusion보다 개선되면:
- DART signal이 event-local하다는 증거

### Event-window
1d/5d가 강하고 20d에서 약해지면:
- 단기 정보반영 신호

20d까지 유지되면:
- 이벤트가 더 느리게 가격에 반영되거나
- corporate-state proxy 역할을 할 가능성

## 연구상 주의

V12도 V11 결과를 본 뒤 설계되었다.
2025~2026은 pristine final holdout이 아니다.

V12 결과로 category/weight/window를 무한히 미세조정하지 않는다.
V12에서 구조를 동결한 뒤의 미래 live data를 최종 holdout으로 사용한다.
