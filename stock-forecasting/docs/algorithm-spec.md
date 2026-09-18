# Algorithm Spec

## 목표

사용자와 ChatGPT가 예측 알고리즘을 공동 설계하고, Claude가 이를 구현할 수 있도록 명세화한다.

## 설계 원칙

- 단일 모델에 의존하지 않음
- 가격·거래량·시장·수급·거시·이벤트 신호를 분리해 검증
- feature 하나를 채택하기 전에 out-of-sample 성능 확인
- 랜덤 셔플보다 시계열 순서를 보존한 walk-forward 검증 사용
- 미래정보 누수(data leakage) 방지
- 모델 성능은 방향 적중률뿐 아니라 calibration과 수익률 분포도 함께 평가

## 1차 예측 후보

### Target A: 다음 거래일 방향
- 출력: 상승 / 보합 / 하락 확률

### Target B: 향후 5거래일 수익률
- 출력: 예상수익률과 신뢰구간

### Target C: 향후 5거래일 고점·저점 범위
- 출력: 예상 상단/하단 가격

## 초기 feature 후보군

### Price
- 1/2/3/5/10/20일 수익률
- 이동평균 괴리율
- 전일 고가·저가·종가 위치
- gap return
- ATR
- realized volatility

### Volume / Liquidity
- 거래량 변화율
- 20일 평균 대비 거래량
- 거래대금
- turnover

### Calendar
- 요일
- 월말/분기말
- 공휴일 전후
- 옵션·선물 만기

### Market
- KOSPI / KOSDAQ
- 업종지수
- 미국 S&P 500 / Nasdaq
- SOX
- 주요 동종기업 수익률

### Flow
- 외국인 순매수
- 기관 순매수
- 개인 순매수
- 프로그램 매매

### Macro
- USD/KRW
- 금리
- VIX / VKOSPI

### Event / Sentiment
- 실적발표
- 공시
- 뉴스 sentiment

## Baseline

- Logistic Regression
- Random Forest
- XGBoost / LightGBM 계열
- 단순 확률 baseline
- 이후 필요 시 sequence model 추가

## 평가

- Accuracy / Balanced Accuracy
- ROC-AUC
- Brier Score
- Log Loss
- calibration
- 예측확률 구간별 실제 상승률
- 거래비용을 반영한 단순 전략 성과는 보조지표로만 사용

## 다음 결정

1. 첫 MVP의 예측 타깃 확정
2. 데이터 확보 가능한 feature부터 우선순위 결정
3. baseline 기간과 walk-forward 구간 확정
