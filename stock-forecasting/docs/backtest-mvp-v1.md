# Stock Forecasting Backtest MVP v1

## 0. 목적

그곳지금 주가예측 서비스의 **검증용 MVP**를 구현한다.

이번 단계의 목표는 완성형 UI가 아니라, 실제 데이터를 이용해 다음을 반복 검증할 수 있는 도구를 만드는 것이다.

- 종목 선택
- 과거 데이터 자동 수집
- feature 자동 생성
- walk-forward backtest
- 다음 거래일 상승확률
- 향후 5거래일 예상 가격범위
- 방향 적중률 / 범위 적중률 / 표본 수
- 모델별 성능 비교

사용자는 종목만 입력하고 나머지 데이터는 모두 자동으로 수집·계산한다.

---

## 1. MVP 출력

종목 예시: 삼성전자(005930)

최소 출력:

- 종목명 / 종목코드
- 데이터 기준일
- 다음 거래일 상승확률
- 향후 5거래일 예상 가격범위
- 방향 적중률
- 5일 범위 적중률
- 검증 표본 수
- 모델명 / 버전
- 주요 feature contribution 또는 importance 상위 항목
- 사용 데이터 기간

예시:

```
삼성전자 (005930)
기준일: 2026-09-17

다음 거래일 상승확률: 63.7%
5거래일 예상범위: 92,500 ~ 98,300원

Walk-forward 검증
- 방향 적중률: 61.8%
- 5일 범위 적중률: 73.4%
- 검증 표본: 428
- 모델: LightGBM v0.1
```

---

## 2. 지원 종목 — 1차

전체 시장 지원부터 시작하지 않는다.

### 우선 테스트 종목
- 삼성전자 005930
- SK하이닉스 000660
- 삼성전기 009150
- 현대차 005380
- NAVER 035420
- 카카오 035720

이유:
- 충분한 거래량
- 서로 다른 업종 일부 포함
- 사용자 테스트 용이
- 반도체 / 자동차 / 플랫폼 비교 가능

### 확장 원칙
MVP가 안정되면 아래 조건을 만족하는 종목으로 확대한다.
- 충분한 거래이력
- 일정 수준 이상의 유동성
- 필요한 시장/수급 데이터 확보 가능
- 결측치가 과도하지 않음

---

## 3. 예측 Target

### Target A — 다음 거래일 방향

```
y_direction = 1 if close[t+1] > close[t] else 0
```

출력:
- 상승확률
- 하락확률

초기에는 보합 class를 별도로 만들지 않는다.

### Target B — 향후 5거래일 가격범위

각 시점 t에서 미래 5거래일의:

```
future_high_5d = max(high[t+1:t+5])
future_low_5d  = min(low[t+1:t+5])
```

직접 가격을 예측하기보다 수익률/범위를 예측한 뒤 현재 가격으로 환산한다.

권장 1차 구현:
- 5일 최대상승률 quantile model
- 5일 최대하락률 quantile model

예:
- lower quantile: 0.10 또는 0.20
- upper quantile: 0.80 또는 0.90

MVP에서는 80% interval을 기본값으로 시작해도 된다.

---

## 4. 입력 feature

모든 feature는 시점 t까지 사용 가능한 데이터만 사용한다.
미래정보 누수 금지.

### 4.1 Price / Momentum
- return_1d
- return_2d
- return_3d
- return_5d
- return_10d
- return_20d
- close_vs_ma5
- close_vs_ma10
- close_vs_ma20
- close_vs_ma60
- ma5_vs_ma20
- ma20_vs_ma60
- gap_return
- close_location_in_day = (close-low)/(high-low)
- close_location_20d_range

### 4.2 Volatility
- daily_range = (high-low)/prev_close
- ATR_14
- realized_vol_5
- realized_vol_10
- realized_vol_20

### 4.3 Volume
- volume_change_1d
- volume_ratio_5
- volume_ratio_20
- turnover 또는 거래대금 비율 (가능할 경우)

### 4.4 Calendar
- weekday one-hot
- month-end dummy
- quarter-end dummy
- holiday_before / holiday_after (데이터 확보 쉬우면)

요일효과는 독립 규칙이 아니라 feature 중 하나로 취급한다.

### 4.5 Korean Market
- KOSPI return 1/3/5d
- KOSDAQ return 1/3/5d
- 관련 업종지수 return 1/3/5d (가능할 경우)
- stock beta-like rolling relation (후순위)

### 4.6 Global Market
한국시장 개장 전에 이미 확정된 해외 데이터만 사용한다.

- S&P500 previous US session return
- Nasdaq previous US session return
- SOX previous US session return
- VIX previous close/change

반도체 종목에는 SOX feature가 특히 중요하나 모든 종목에 공통 입력으로 우선 포함한다.

### 4.7 FX
- USD/KRW return 1d
- USD/KRW return 5d
- USD/KRW rolling volatility

### 4.8 Investor Flow
데이터 확보가 안정적일 경우:
- foreign_net_buy_ratio
- institution_net_buy_ratio
- retail_net_buy_ratio
- 3d / 5d cumulative flow

수급 데이터가 안정적으로 확보되지 않으면 MVP v0에서는 제외하고 별도 feature batch로 실험한다.

---

## 5. 데이터 우선순위

### MVP 필수
1. 국내 종목 OHLCV
2. KOSPI
3. KOSDAQ
4. Nasdaq
5. SOX
6. USD/KRW

### MVP 권장
7. 외국인/기관/개인 수급
8. VIX

### 후순위
- 뉴스 sentiment
- 공시 NLP
- 실적 event
- 옵션/선물 데이터
- intraday data

중요:
**데이터 제공원은 구현 전 실제 사용 가능성, 라이선스, 안정성을 확인하고 하나의 공급자에 과도하게 종속되지 않게 adapter 구조로 작성한다.**

---

## 6. 모델

### Baseline 0
항상 상승확률 = 학습구간의 historical base rate.

목적:
복잡한 모델이 최소 기준보다 실제로 나은지 확인.

### Baseline 1
Logistic Regression

용도:
- 해석 가능
- calibration 확인
- feature direction sanity check

### Model 2
LightGBM 또는 XGBoost classifier

둘 중 설치/운영이 더 안정적인 것을 우선 구현한다.

### Range Model
LightGBM/XGBoost quantile regression 또는 sklearn 기반 quantile model.

구현 복잡도가 높으면 1차 MVP에서는:
- 미래 5일 high-return 회귀
- 미래 5일 low-return 회귀
- residual distribution 기반 interval
로 시작 가능.

---

## 7. 검증 방식 — 핵심

Random train/test split 금지.

### Walk-forward

예시:

```
Train: 2019-01 ~ 2022-12
Test:  2023-Q1

Train: 2019-01 ~ 2023-Q1
Test:  2023-Q2

Train: 2019-01 ~ 2023-Q2
Test:  2023-Q3
...
```

또는 rolling/expanding window 중 하나를 설정 가능하게 만든다.

기본:
- expanding window
- test block = 1개월 또는 1분기
- 최소 train = 2~3년

최근 regime 성능을 보기 위해 별도 집계:
- 전체 OOS
- 최근 3년
- 최근 1년
- 최근 6개월
- 최근 3개월

---

## 8. 평가 지표

### Direction
- Accuracy
- Balanced Accuracy
- ROC-AUC
- Log Loss
- Brier Score

### Calibration
예측확률 구간별 실제 상승률:

```
50~55%
55~60%
60~65%
65~70%
70%+
```

각 bucket:
- count
- predicted mean probability
- actual up rate

### Range
- interval coverage rate
- average interval width
- upper/lower miss rate

### 최소 합격 기준은 아직 고정하지 않음
실제 baseline 결과를 보고 결정한다.

---

## 9. Leakage 방지

필수 체크:
- t 시점에서 알 수 없는 t+1 데이터 사용 금지
- 국내시장 개장 시점 이전에 확정되지 않은 해외시장 데이터 사용 금지
- rolling feature는 항상 shift 여부 검토
- normalization/scaler는 각 train window에서만 fit
- feature selection도 train window 안에서 수행
- 최종 test set으로 feature를 선택하지 않음

---

## 10. 실험 구조

권장:

```
stock-forecasting/
  src/
    data/
      providers/
      loader.py
    features/
      price.py
      market.py
      calendar.py
      flow.py
    models/
      baseline.py
      logistic.py
      tree_model.py
      range_model.py
    backtest/
      walk_forward.py
      metrics.py
    cli.py

  experiments/
    exp_001_price_only/
    exp_002_market_added/
    exp_003_calendar_added/
    exp_004_flow_added/

  tests/
```

---

## 11. Feature ablation

최종 모델에 모든 feature를 무조건 넣지 않는다.

순차 비교:

1. Price only
2. + Volume/Volatility
3. + Calendar
4. + Korean market
5. + US market/SOX
6. + FX
7. + Investor flow

각 단계별 OOS 성능을 저장한다.

요일효과도 이 단계에서 실제 성능 증가가 없으면 제거한다.

---

## 12. CLI / Test UI

MVP에서 둘 중 최소 하나는 구현한다.

### CLI 예
```
python -m stock_forecasting.cli predict --ticker 005930
python -m stock_forecasting.cli backtest --ticker 005930
```

### 간단 Test UI
브라우저 입력:
- 종목명/종목코드
- 예측 실행 버튼

결과:
- 상승확률
- 5일 예상범위
- 방향 적중률
- 범위 적중률
- 표본 수
- 주요 feature
- 기준시각

완성형 디자인은 이번 범위 아님.

---

## 13. 예측 결과 문구

UI는 모델 출력과 분리한다.

금지:
- 매수
- 매도
- 목표가
- 확실한 상승
- 보장

사용:
- 상승확률
- 예상범위
- 현재 데이터에서 상승 신호 우세
- 과거 검증 적중률

하단 고정 주의문:

> 이 결과는 과거 시장데이터를 기반으로 한 통계·AI 예측입니다. 실제 주가 움직임과 다를 수 있으며, 투자 판단을 위한 확정적 신호가 아닙니다.

---

## 14. Claude 구현 우선순위

### Phase A — 데이터/백테스트
- 데이터 provider adapter
- OHLCV + 시장지수 + SOX + FX
- feature pipeline
- Logistic baseline
- tree model
- walk-forward
- metrics
- 종목별 결과 저장

### Phase B — 5일 범위
- range target
- range model
- coverage metric

### Phase C — 간단 UI
- 종목 검색
- 결과 카드
- 상세 성능

### Phase D — 고도화
- investor flow
- calibration
- feature importance
- model ensemble

---

## 15. 완료 기준

MVP v1은 아래를 만족하면 완료.

- [ ] 6개 우선 종목 중 최소 3개에서 end-to-end 실행 가능
- [ ] 데이터 자동 수집
- [ ] feature 자동 생성
- [ ] Logistic baseline 동작
- [ ] tree model 동작
- [ ] walk-forward backtest 동작
- [ ] 미래정보 누수 점검
- [ ] 다음날 상승확률 출력
- [ ] 5일 예상범위 출력
- [ ] 방향 적중률 출력
- [ ] 범위 적중률 출력
- [ ] 검증 표본 수 출력
- [ ] 최근 1년/6개월 성능 별도 출력
- [ ] README 실행법 기록
- [ ] 테스트 결과를 experiments/에 저장
- [ ] 완성형 UI/운영 배포는 하지 않음

