# Decisions

프로젝트에서 사용자와 합의한 주요 결정을 기록한다.

## 2026-09-18

- 주가 예측 기능은 `cozzyy/geogotjigeum` 본체 코드와 구분하여 `stock-forecasting/` 하위 디렉토리에서 개발
- ChatGPT는 기획뿐 아니라 사용자와 함께 예측 알고리즘을 설계
- Claude는 GitHub의 명세를 기반으로 실제 개발을 담당
- GitHub를 ChatGPT-사용자-Claude 간 공용 협업 공간으로 사용
- 초기에는 본체와 강하게 결합하지 않고 독립적으로 실험·검증 후 연동
