# V4 Cross-Sectional Relative-Strength Research

## 목적

기존 v1~v3는 개별 종목의 다음날/5일 후 절대 방향을 예측했다.
실측 결과 예측력이 약했고 base-rate 대비 개선도 안정적으로 확보되지 않았다.

v4는 문제를 다음처럼 재정의한다.

> 같은 거래일의 여러 종목 중 향후 5거래일 동안 상대적으로 강한 종목과 약한 종목을 구분한다.

## Starter Universe

대형/유동 종목 약 30개를 사용한다.

- 반도체/IT
- 자동차
- 플랫폼
- 배터리/화학
- 바이오
- 금융
- 산업재/방산/조선
- 통신/소비재/물류 등

이 유니버스는 운영 대상이 아니라 모델 구조 검증용이다.

## Target

각 거래일마다 향후 5거래일 수익률의 cross-sectional percentile을 계산한다.

- 상위 30%: 1
- 하위 30%: 0
- 중간 40%: 학습 제외

따라서 모델은 단순 상승/하락이 아니라 상대적으로 강한 종목과 약한 종목을 구분한다.

## Feature

종목별 raw feature:
- 1/2/3/5/10/20/60일 수익률
- 이동평균 거리
- gap / intraday / daily range
- 변동성
- 거래량 비율
- reversal / trend interaction

각 raw feature에 대해 동일 날짜의 cross-sectional percentile rank도 추가한다.

예:
- rank_ret_5d
- rank_volume_ratio_20
- rank_vol_20d

sector one-hot도 사용한다.

v4 baseline에서는 ticker ID를 넣지 않는다.
목적은 종목 고유 ID를 외우는 대신 transferable cross-sectional pattern이 존재하는지 먼저 확인하는 것이다.

## Model

- Logistic Regression
- HistGradientBoosting
- ExtraTrees

## Validation

- 날짜 기준 walk-forward
- 5일 target 사용 시 test 시작 전 5 business day purge
- 학습/테스트 분리는 모든 종목에 동일 날짜 경계를 사용

## 핵심 평가

### Classification
상위 30% vs 하위 30%
- Accuracy
- Balanced Accuracy
- Brier
- ROC-AUC

### Ranking
전체 종목 순위 품질
- Daily Spearman Rank IC
- Positive IC rate

### Portfolio-style discrimination
매일 모델 score 상위 20%와 하위 20% 비교
- Top 20% future 5d return
- Bottom 20% future 5d return
- Top-Bottom spread
- Positive spread rate
- Top 20% positive-return rate
- Top 20% beats-median rate

최근 12개월도 별도 집계한다.

## 실행

빠른 검증:

~~~powershell
py -m stock_forecasting.v4_cross_section --fast
~~~

처음 데이터 다운로드를 줄여서 구조만 보고 싶으면:

~~~powershell
py -m stock_forecasting.v4_cross_section --fast --max-tickers 15
~~~

전체 30종목 / 3모델:

~~~powershell
py -m stock_forecasting.v4_cross_section
~~~

1일 상대강도와 비교:

~~~powershell
py -m stock_forecasting.v4_cross_section --fast --target 1d
~~~

## 판단 기준

v4를 다음 단계로 확장하려면 최소한 다음 패턴이 필요하다.

- mean Rank IC > 0
- positive IC rate가 50%를 안정적으로 상회
- top-bottom 5d spread > 0
- positive spread rate가 50%를 안정적으로 상회
- 최근 12개월에도 방향이 유지

절대 임계값 하나로 합격 여부를 정하지 않는다.
기간별 안정성과 model 간 재현성을 함께 본다.

## 다음 단계

v4가 유효하면:
1. KOSPI200 + KOSDAQ150으로 universe 확장
2. cross-sectional pooled model 재학습
3. investor flow / turnover / sector index 추가
4. ranking objective 또는 learning-to-rank 검토
5. CNN/sequence encoder와 tabular cross-sectional model ensemble 검토
