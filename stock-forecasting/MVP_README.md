# 주가예측 검증용 MVP v0.1

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
- 가격·모멘텀·거래량·변동성·요일 feature 자동 생성
- Logistic Regression / HistGradientBoosting 비교
- expanding walk-forward OOS 백테스트
- 다음 거래일 상승확률 계산
- 향후 5거래일 예상 가격범위 계산
- 방향 적중률 / Balanced Accuracy / Brier / Log Loss / ROC-AUC
- 5일 범위 적중률 및 평균 범위폭
- 전체 / 최근 3년 / 1년 / 6개월 / 3개월 성능 집계
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

## CLI 실행

~~~bash
stock-forecast 005930
stock-forecast 삼성전자
stock-forecast 000660 --json
~~~

## 테스트 UI 실행

~~~bash
streamlit run streamlit_app.py
~~~

브라우저에서 종목을 선택하고 예측해보기 버튼을 누르면 아래를 확인할 수 있다.

- 다음 거래일 상승확률
- 5거래일 예상범위
- 방향 적중률
- 5일 범위 적중률
- 검증 표본 수
- 최근 1년 / 6개월 / 3개월 성능

## 테스트

~~~bash
pip install pytest
pytest -q
~~~

로컬 합성데이터 기준:
- feature/target 생성 테스트 통과
- walk-forward 파이프라인 테스트 통과

## 현재 제한

이 버전은 모델 성능을 검증하기 위한 MVP다.

아직 하지 않은 것:
- 외국인/기관/개인 수급
- 뉴스 sentiment
- 실적/공시 이벤트
- intraday 데이터
- feature ablation 리포트 자동 생성
- calibration plot
- 운영 배포
- 그곳지금 본체 UI 연결

또한 Yahoo Finance 데이터는 테스트 편의를 위한 1차 공급자다. 운영 데이터 공급자는 실제 성능과 안정성 확인 후 교체 가능하도록 별도 adapter 구조로 확장한다.

## 누수 방지

- random train/test split 사용 안 함
- 시간 순서대로 expanding walk-forward
- feature는 현재 또는 과거 데이터만 사용
- 1일/5일 target은 미래 데이터로 별도 생성
- 해외/시장 보조 데이터는 보수적으로 이전 사용가능 세션을 매칭

## 모델 선택

Logistic / tree 모델의 OOS Brier Score를 비교해서 더 낮은 모델을 현재 예측에 사용한다.

이 선택 방식 역시 성능검증 후 변경 가능하다.

## 주의

이 결과는 과거 시장데이터를 기반으로 한 통계·AI 예측이다. 실제 주가 움직임과 다를 수 있으며, 투자 판단을 위한 확정적 신호가 아니다.
