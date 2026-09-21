# V9 Granular KRX Variable Ablation + Leakage Audit

## 목적

V8 30종목 결과에서:
- price_only: IC +0.0260, neutral spread -0.0958%
- price_plus_flow: 개선 없음
- price_plus_all_krx: IC +0.0310, neutral spread +0.0523%
- krx_only: 약함

즉 KRX 전체를 붙이는 방향은 약한 개선이 있었지만,
어떤 변수군이 그 개선을 만들었는지는 불명확하다.

V9는 모델 변경보다 독립변수군 분해에 집중한다.

## 변수군

### Price
V6/V8 기존 가격·거래량·시장 레짐 feature.

### Flow
- 외국인/기관/개인/기타법인 순매수
- 1/5/20일 flow ratio
- positive share
- acceleration
- foreign+institution smart money
- foreign/institution agreement/divergence

### Size / Liquidity
- log market cap
- traded value / market cap turnover
- log listed shares
- cross-sectional / sector rank

### Valuation
- earnings yield
- PER
- book-to-market
- PBR
- dividend yield
- DPS
- cross-sectional / sector rank

### Accounting
- EPS level
- EPS 20d change
- EPS update event
- BPS level
- BPS 20d change
- cross-sectional / sector rank

## Ablation

동일 모델/동일 OOS 날짜에서:

1. price_only
2. price_plus_flow
3. price_plus_size
4. price_plus_valuation
5. price_plus_accounting
6. price_plus_size_valuation
7. price_plus_all_krx
8. krx_only

Fast:
- ExtraTrees only
- 160 trees
- 12개월 OOS fold

Full:
- Ridge + ExtraTrees
- 300-tree ExtraTrees
- 6개월 OOS fold

공통:
- 5년 rolling training
- horizon purge
- 5개 non-overlap offset

## 연도별 안정성

각 변수군에 대해:
- yearly mean IC
- yearly positive IC rate
- yearly neutral spread
- yearly positive neutral spread rate
- worst-year IC
- worst-year neutral spread
- IC 양수 연도 비율
- neutral spread 양수 연도 비율

을 출력한다.

평균값 하나가 아니라 여러 시장 국면에서 반복되는지를 본다.

## Fundamental point-in-time audit

PER/PBR/EPS/BPS/DIV/DPS의 종목별 시계열에서:
- 변경 횟수
- 일별 변경률
- unique value 수
- 동일값 median run length

를 계산한다.

특히 EPS/BPS/DPS가 거의 매일 바뀌는 등 회계값치고 비정상적인 형태면
point-in-time / 소급반영 가능성을 경고한다.

주의:
이 audit에서 이상이 없다고 해서 point-in-time 안전성이 증명되는 것은 아니다.
최종 서비스 전에는 KRX 각 필드의 산출/적용 시점 정의를 별도로 확인해야 한다.

## 실행

현재 30종목 캐시 재사용:

~~~powershell
git pull
py -m pip install -e .
py -m stock_forecasting.v9_variable_audit --fast
~~~

전체 검증:

~~~powershell
py -m stock_forecasting.v9_variable_audit
~~~

KRX 캐시를 강제로 다시 받을 필요는 보통 없다.
`--refresh-krx`는 원천데이터 갱신이 필요할 때만 사용한다.

## 판정

좋은 후보는 단순히 평균 IC가 높은 조합이 아니다.

다음을 모두 본다.

1. price_only 대비 delta IC > 0
2. price_only 대비 delta neutral spread > 0
3. positive IC year rate가 높음
4. positive neutral spread year rate가 높음
5. worst-year가 과도하게 나쁘지 않음
6. accounting 개선이라면 leakage audit 경고가 없는지 확인

특히 size/valuation 같은 비교적 해석 가능한 변수군만으로
개선이 유지되면 V8의 all-KRX 효과보다 신뢰도가 높다.
