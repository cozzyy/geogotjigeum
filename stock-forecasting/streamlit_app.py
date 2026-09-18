import streamlit as st
from stock_forecasting.config import SUPPORTED
from stock_forecasting.pipeline import forecast
from stock_forecasting.ablation import run_ablation, best_rows

st.set_page_config(page_title="주가예측 실험실", page_icon="📈", layout="centered")
st.title("주가예측 실험실")
st.caption("어떤 종목이 궁금하세요?")

labels = [f"{m['name']} · {code}" for code, m in SUPPORTED.items()]
selected = st.selectbox("종목", labels)
code = selected.split("·")[-1].strip()

if st.button("예측해보기", type="primary", use_container_width=True):
    with st.spinner("최신 데이터와 과거 검증 결과를 계산하고 있습니다..."):
        f = forecast(code)
    st.subheader(f"{f.name} · {f.code}")
    st.caption(f"{f.asof:%Y-%m-%d} 데이터 기준 · {f.model_name} 모델")
    c1, c2 = st.columns(2)
    c1.metric("다음 거래일 상승확률", f"{f.prob_up*100:.1f}%")
    c2.metric("향후 5거래일 예상 가격범위", f"{f.low_price_5d:,.0f} ~ {f.high_price_5d:,.0f}원")

    st.markdown("#### 모델 검증")
    m1, m2 = st.columns(2)
    m1.metric("방향 적중률", f"{f.backtest['all']['accuracy']*100:.1f}%")
    m2.metric("검증 표본", f"{f.sample_count:,}건")
    st.metric("5일 범위 적중률", f"{f.backtest['all']['range_coverage']*100:.1f}%")

    with st.expander("최근 구간 성능 보기"):
        for key, label in [("12m","최근 1년"),("6m","최근 6개월"),("3m","최근 3개월")]:
            s = f.backtest[key]
            st.write(f"**{label}** — 방향 {s.get('accuracy',0)*100:.1f}% · 범위 {s.get('range_coverage',0)*100:.1f}% · 표본 {s.get('samples',0)}")

st.markdown("#### 알고리즘 비교")
st.caption("가격 → 거래량/변동성 → 요일 → 국내시장 → 미국시장/SOX/VIX → 환율 순으로 feature를 추가해 OOS 성능 변화를 비교합니다.")

if st.button("Feature ablation 실행", use_container_width=True):
    with st.spinner("여러 feature 조합과 모델을 순차 백테스트하고 있습니다. 일반 예측보다 오래 걸릴 수 있습니다..."):
        report = best_rows(run_ablation(code))
    view = report[[
        "stage", "features", "model", "samples",
        "accuracy", "balanced_accuracy", "brier", "roc_auc",
        "accuracy_12m", "accuracy_6m",
    ]].copy()
    percent_cols = ["accuracy", "balanced_accuracy", "roc_auc", "accuracy_12m", "accuracy_6m"]
    for col in percent_cols:
        view[col] = view[col].map(lambda x: None if x is None else round(x * 100, 2))
    view["brier"] = view["brier"].round(4)
    st.dataframe(view, use_container_width=True, hide_index=True)
    if not report.empty:
        best = report.iloc[0]
        st.caption(
            f"현재 Brier 기준 최상위: {best['stage']} / {best['model']} "
            f"(전체 방향 적중률 {best['accuracy']*100:.1f}%, Brier {best['brier']:.4f})"
        )

st.divider()
st.caption("주의: 이 결과는 과거 시장데이터를 기반으로 한 통계·AI 예측입니다. 실제 주가 움직임과 다를 수 있으며, 투자 판단을 위한 확정적 신호가 아닙니다.")
