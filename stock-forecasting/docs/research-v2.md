# 주가예측 Advanced v2 연구 메모

## 문제 진단

v0.x 결과에서 전체 방향 정확도는 대체로 50~53% 수준이었고, Brier Score는 base-rate baseline보다 개선되지 않는 경우가 많았다.

따라서 단순히 복잡한 모델을 추가하는 대신 아래 원칙으로 재설계한다.

1. 확률 품질(Brier)을 우선
2. 최신 시장 구조 변화 반영
3. 반도체 업종 특화 글로벌 입력
4. short-horizon reversal / volatility / spillover 구조 반영
5. 미래정보 누수 방지 강화
6. 매일 무조건 판단하지 않고 고확신 구간 성능을 별도 평가

## 참고한 연구 방향

### Machine learning asset pricing

Gu, Kelly, Xiu (2020), Empirical Asset Pricing via Machine Learning.
- 고차원 predictor
- nonlinear interaction
- regularization / trees / neural networks 비교
- out-of-sample 성능 중심

### LSTM stock forecasting

Fischer & Krauss (2018), Deep learning with long short-term memory networks for financial market predictions.
- short-term reversal
- high volatility
- extreme recent moves가 주요 패턴으로 관찰
- 다만 후기 구간에서 거래비용 후 edge가 약화

### Korean market / US spillover

Park & Yi (2011), Mispricing of US Shocks in the Korean Stock Market.
- 한국시장 개장은 미국 overnight shock를 반영
- 이후 장중 reversal이 나타날 수 있음

Kim, Choi, Lee (2010), US stock market information spillover and KOSPI200 futures.
- 미국시장 정보 spillover
- overnight overreaction / intraday reversal

### Financial validation

금융 시계열에서는 일반 shuffled CV보다 time-aware validation이 필요하며,
forward label이 test boundary와 겹치는 경우 purge가 필요하다.

## Advanced v2 설계

### 1. 모델

- unweighted Logistic Regression
- C regularization grid
- expanding walk-forward outer test
- chronological inner holdout tuning
- exponential time-decay sample weights 후보
- probability shrinkage to training base-rate 후보

### 2. Feature

#### Price / reversal
- 1/2/3/5/10/20일 수익률
- 이동평균 거리
- overnight gap
- intraday return
- RSI
- short-term reversal interactions
- 20일 z-score

#### Volatility / volume
- ATR
- realized volatility
- short/long volatility ratio
- volume ratio
- volume z-score

#### Korean market
- KOSPI / KOSDAQ
- stock excess return vs KOSPI/KOSDAQ

#### US / semiconductor
- S&P500
- Nasdaq
- SOX
- SMH
- SOXX
- NVIDIA
- Micron
- TSM
- VIX
- US 10Y
- DXY

#### FX
- USD/KRW는 별도 recipe에서만 비교

#### Spillover interactions
- gap × SOX
- intraday × SOX
- SOX - Nasdaq
- Micron relative shock
- Nvidia relative shock
- semiconductor ETF consensus

### 3. Leakage control

- Korea index same-day close: forecast generated after Korea close라는 전제에서 사용
- US/global: previous completed session only
- outer test 직전 1 row purge for next-day label
- hyperparameter selection은 train 내부 chronological holdout만 사용

### 4. Evaluation

- Accuracy
- Balanced Accuracy
- ROC-AUC
- Brier Score
- Brier Skill vs base-rate
- 최근 12개월 / 6개월
- calibration buckets
- selective accuracy / coverage

### 5. Selective forecast

매일 강한 방향판단을 강제하지 않는다.

확률이 50% 근처인 날은 low-confidence로 보고,
|p-0.5|가 큰 고확신 구간의 accuracy와 coverage를 별도 평가한다.

목표는 전체 정확도를 억지로 높이는 것이 아니라
실제로 신호가 존재하는 구간을 구분하는 것이다.

## 현재 구현

- src/stock_forecasting/advanced_v2.py

실행:

~~~powershell
py -m stock_forecasting.advanced_v2 005930
py -m stock_forecasting.advanced_v2 000660
py -m stock_forecasting.advanced_v2 009150
~~~

recipe 비교:

~~~powershell
py -m stock_forecasting.advanced_v2 005930 --recipe lean
py -m stock_forecasting.advanced_v2 005930 --recipe semi_macro
py -m stock_forecasting.advanced_v2 005930 --recipe semi_macro_fx
py -m stock_forecasting.advanced_v2 005930 --recipe price_reversal
~~~

## 다음 판단

Advanced v2가 다음 조건을 만족하는지 확인한다.

- Brier Skill vs base > 0
- 최근 12개월 Brier 개선
- 고확신 구간 accuracy 상승
- 종목별로 동일 방향의 안정성
- 특정 feature recipe가 반복적으로 우세

이를 만족하지 못하면 LSTM/sequence model로 바로 넘어가기보다,
먼저 target definition, cross-sectional pooling, investor flow, earnings/event data를 추가 검토한다.
