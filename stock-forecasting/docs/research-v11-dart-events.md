# V11 OpenDART Earnings / Corporate Event Study

## 목적

V10은 Price + Size + Valuation을 유지한 채 2y/3y/5y rolling과
recency weighting을 비교했다.

3y rolling은 전체 OOS에서 가장 좋은 고정 window였지만,
2025+ sector-neutral spread는 여전히 음수였다.

V11은 학습 window 추가 튜닝을 멈추고
기존 가격/밸류에이션과 성격이 다른 point-in-time 기업정보를 추가한다.

## 데이터 소스

OpenDART 공식 API.

사용 API:
- corpCode.xml: 종목코드 -> DART 고유번호
- list.json: 실제 공시 접수일(rcept_dt)과 보고서명
- fnlttSinglAcnt.json: 1Q/반기/3Q/사업보고서 주요계정

환경변수:
- DART_API_KEY

인증키는 저장소에 저장하지 않는다.

## 누수 방지 원칙

가장 중요한 V11 규칙:

공시가 D일에 접수됐더라도 D일 feature로 사용하지 않는다.

실제 접수시각이 장중인지 장후인지 일 단위 데이터만으로 확실히 알 수 없으므로
모든 재무/이벤트 정보는 D 다음 한국 거래일부터 활성화한다.

즉:

filing_date < feature_available_date

를 timeline audit에서 강제한다.

## Earnings features

정기보고서 주요계정에서 연결(CFS)을 우선 사용하고,
없으면 별도(OFS)를 사용한다.

추출 후보:
- revenue
- operating profit
- net income

비교 가능한 전년 동기/누적 금액을 이용해:
- revenue_yoy
- operating_profit_yoy
- net_income_yoy
- operating_margin
- net_margin
- earnings_breadth

를 생성한다.

각 값은:
- *_new: 새 보고서가 사용 가능해진 첫 거래일의 event impulse
- *_latest: 다음 보고서 전까지 시장이 알고 있는 최근 상태

로 분리한다.

추가:
- quarterly/half/annual filing event
- days_since_earnings
- 20d earnings event count
- 잠정실적 공시 event

## Corporate event features

공시명 기반으로 다음 사건을 분리한다.

- contract: 단일판매/공급계약/수주
- buyback: 자기주식/신탁계약
- capital: 유상/무상증자, CB/BW/EB, 감자
- ownership: 최대주주/대량보유/임원주주
- M&A: 합병/분할/영업양수도/주식교환
- investment: 타법인주식/시설투자/유형자산
- litigation: 소송/중재/가압류/가처분

정기보고서와 잠정실적은 corporate-event block에서 제외해
earnings와 event ablation이 중복되지 않게 한다.

각 category:
- 1d event count
- 5d count
- 20d count

및 days_since_material_event를 생성한다.

## V11 ablation

모델 구조와 학습 window를 고정:
- ExtraTrees
- 3y rolling
- 5-day sector-neutral rank target
- horizon purge
- non-overlap offset metrics

비교:
1. base_only
2. base_plus_earnings
3. base_plus_events
4. base_plus_earnings_events
5. dart_only

Base:
Price + Size/Liquidity + conservative Valuation from V10.

## 실행

OpenDART 키 진단:

~~~powershell
$env:DART_API_KEY = Read-Host "OpenDART API Key"
py -m stock_forecasting.dart_key_check
~~~

V11 quick study:

~~~powershell
py -m stock_forecasting.v11_earnings_events --fast
~~~

처음 실행은 30개 기업의 과거 DART 공시와 정기보고서를 내려받아
.cache/opendart에 저장하므로 오래 걸릴 수 있다.

이후에는 cache를 재사용한다.

강제 갱신이 필요할 때만:

~~~powershell
py -m stock_forecasting.v11_earnings_events --fast --refresh-dart
~~~

## 해석

V11이 유의미하려면 최소한:
- base_plus_earnings 또는 base_plus_events의 delta IC > 0
- delta neutral spread > 0
- 2025+ recent delta도 같은 방향
- 여러 연도에서 반복
- timeline audit violation = 0

을 확인한다.

특히 전체 평균만 좋아지고 2025+가 계속 음수면
DART 정보 역시 최근 regime 문제를 해결했다고 보지 않는다.

## 제한

fnlttSinglAcnt API는 현재 조회시점의 정기보고서 데이터를 제공한다.
V11은 API가 반환하는 rcept_no를 공시목록의 접수일과 매칭하고,
그 이후 거래일에만 값을 사용함으로써 보수적으로 처리한다.

그러나 정정 전/후 XBRL 값의 완전한 historical versioning까지
증명하는 구조는 아니다.

실전 서비스 후보가 될 경우에는 raw filing version 또는 별도
point-in-time fundamental store로 재검증해야 한다.
