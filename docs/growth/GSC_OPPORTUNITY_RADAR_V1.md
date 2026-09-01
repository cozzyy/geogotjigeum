# GSC Opportunity Radar v1

Date: 2026-09-01
Status: ACTIVE OPERATING PLAN
Purpose: 다음 SEO/콘텐츠 작업을 감이 아니라 Search Console 신호로 고른다.

## 1. 주간 추출 항목
매주 GSC에서 아래를 본다.

### A. Near-page-one / page-one opportunity
- average position 4~15
- impressions가 의미 있게 존재
- 기존 canonical Work/Place/Guide 페이지가 있음

### B. Low CTR opportunity
- position 1~10인데 CTR이 유사 페이지보다 낮음
- title/meta/첫 문단/검색의도 정합성 확인

### C. Rising query
- 최근 7일 또는 14일 impressions가 이전 기간보다 증가
- 새롭게 등장한 작품/장소/지역 검색어

### D. Rising page
- 특정 Work/Place가 갑자기 impressions/clicks 증가
- 해당 페이지의 내부링크/Scene/Guide 확장 가능성 검토

### E. Country/language signal
- KO / JA / EN / ZH-Hant별 클릭·노출·평균순위
- 언어 확장은 실제 반응이 확인된 콘텐츠부터

## 2. 주간 PM 결과물
한 번에 많은 작업을 열지 않는다.

매주 최대:
1. `ATTACK` — 이번 주 가장 먼저 개선할 페이지 1~3개
2. `EXPAND` — 관련 Place/Guide/Scene을 확장할 콘텐츠 1개
3. `WATCH` — 아직 건드리지 않고 관찰할 페이지/검색어
4. `PROTECT` — 순위가 좋아 큰 변경을 피해야 할 URL

## 3. 기본 선정 규칙
우선순위 점수 예시:
- position 4~10: +3
- position 11~15: +2
- 최근 impressions 상승: +3
- CTR 개선 여지 큼: +2
- verified Place/Scene/Guide 확장 가능: +2
- 이미 고순위여서 큰 title/H1 변경 위험: -2

## 4. 변경 후 측정
각 SEO micro-sprint는 baseline을 남긴다.
- clicks
- impressions
- CTR
- average position
- target queries
- target landing page

평가 시점:
- 14일: 방향성
- 28일: 유지/확대/rollback 판단

## 5. 운영 원칙
- 14/28일 측정은 개발 중단 사유가 아니다.
- MEASURE와 BUILD/PREP를 병렬 운영한다.
- 결과가 나오면 다음 개발 큐의 순서를 조정한다.
- GSC query table은 privacy threshold로 전체 query를 보여주지 않으므로 query 합계를 사이트 총합으로 사용하지 않는다.

## 6. 현재 known signals
2026-08-31 기준 이미 확인된 우선 신호:
- Odyssey: Work + 일부 Place가 page-one/상위권
- Byakuyako JA: 실제 클릭과 `白夜行 聖地巡礼` 검색 신호
- Breaking Bad / Stranger Things: 기존 성장 스프린트 대상
- Region pages: 검색확장보다 navigation/internal-link hub로 우선 활용
- EN: 대량 확장보다 선택적 개선
- ZH-Hant: Issue #37 파일럿으로 수요 검증

## 7. 자동화 후보
향후 개발 공수가 허용되면 GSC export를 입력으로 다음 표를 자동 생성할 수 있다.
- Top opportunities
- CTR leaks
- rising pages
- rising queries
- locale signals
- 14/28-day experiment comparison

v1은 우선 수동/반자동 운영으로 시작한다.
