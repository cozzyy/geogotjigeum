# 주가예측 검증용 MVP v0.2

그곳지금 본체와 분리된 주가예측 실험용 프로토타입이다.

## 구현된 것

- 지원 종목 6개
  - 삼성전자
  - SK하이닉스
  - 삼성전기
  - 현대차
  - NAVER
  - 카카오
- Yahoo Finance 기반 과거 OHLCV 자동 수집
- KOSPI / KOSDAQ / Nasdaq / SOX / VIX / USD-KRW 자동 수집
- 6시간 TTL의 소형 로컬 데이터 캐시
- 가격·모멘텀·거래량·변동성·요일 feature 자동 생성
- Logistic Regression / HistGradientBoosting 비교
- expanding walk-forward OOS 백테스트
- 다음 거래일 상승확률 계산
- 향후 5거래일 예상 가격범위 계산
- 방향 적중률 / Balanced Accuracy / Brier / Log Loss / ROC-AUC
- 5일 범위 적중률 및 평균 범위폭
- 전체 / 최근 3년 / 1년 / 6개월 / 3개월 성능 집계
- feature ablation 자동 비교
- CLI
- Streamlit 검증 UI

## 설치

~~~bash
cd stock-forecasting
python -m venv .venv
source .venv/bin/activate
# Windows: .venv\Scripts\activate
pip install -e .
~~~

Windows에서 Python Install Manager를 쓰는 경우에는 다음처럼 실행해도 된다.

~~~powershell
py -m pip install -e .
~~~

## 일반 예측

~~~bash
python -m stock_forecasting.cli 005930
~~~

또는 Windows:

~~~powershell
py -m stock_forecasting.cli 005930
~~~

## Feature ablation

~~~bash
python -m stock_forecasting.ablation 005930
~~~

또는 Windows:

~~~powershell
py -m stock_forecasting.ablation 005930
~~~

비교 순서:

1. price
2. +volume_volatility
3. +calendar
4. +korean_market
5. +us_market_sox_vix
6. +fx

각 단계에서 Logistic / Tree 모델을 비교한다.

주요 기준:
- 전체 OOS Accuracy
- Balanced Accuracy
- Brier Score
- ROC-AUC
- 최근 1년 Accuracy
- 최근 6개월 Accuracy

최종 feature 선택은 단순 Accuracy 한 개가 아니라 Brier와 최근 구간 성능까지 함께 보고 결정한다.

## 테스트 UI 실행

~~~powershell
py -m streamlit run streamlit_app.py
~~~

일반 예측과 Feature ablation은 별도 버튼이다.
따라서 평소 예측 시 ablation 백테스트까지 자동 실행하지 않는다.

## 소형 캐시

Yahoo Finance 데이터는 기본 6시간 동안:

~~~text
stock-forecasting/.cache/yfinance/
~~~

에 저장한다.

목적:
- 같은 종목/같은 시장 데이터를 반복 다운로드하지 않음
- 알고리즘 실험 중 네트워크 대기시간 감소

아직 캐시하지 않는 것:
- 학습된 모델
- walk-forward 결과
- 최종 예측 결과

즉 현재 캐시는 운영 최적화가 아니라 **반복 실험 편의용**이다.

필요하면 .cache 폴더를 삭제해 즉시 새 데이터를 다시 받을 수 있다.

## 현재 제한

아직 하지 않은 것:
- 외국인/기관/개인 수급
- 뉴스 sentiment
- 실적/공시 이벤트
- intraday 데이터
- calibration plot
- 운영용 사전학습 모델 캐시
- 운영 배포
- 그곳지금 본체 UI 연결

## 누수 방지

- random train/test split 사용 안 함
- 시간 순서대로 expanding walk-forward
- feature는 현재 또는 과거 데이터만 사용
- 1일/5일 target은 미래 데이터로 별도 생성
- 해외/시장 보조 데이터는 이전 사용 가능 세션을 보수적으로 매칭
- scaler/imputer/model은 각 train window에서 fit

## 주의

이 결과는 과거 시장데이터를 기반으로 한 통계·AI 예측이다. 실제 주가 움직임과 다를 수 있으며, 투자 판단을 위한 확정적 신호가 아니다.
