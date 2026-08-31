# 그곳지금 Growth Execution Plan — 2026-09 v1

Date: 2026-08-31
Status: **APPROVED PLANNING / DEVELOPER HANDOFF BASELINE**
Owner split: ChatGPT = PM/SEO/content planning, Developer = implementation/QA, User = deployment/final high-risk decisions

## 0. 왜 이 문서를 새 기준으로 쓰는가

2026-08-31 Search Console 장기 export와 최신 24시간 export를 다시 검토한 결과, 그곳지금은 이제 "URL/작품 수를 빠르게 늘리는 단계"보다 **Google이 이미 반응하기 시작한 페이지를 보호하고 1~5위권으로 밀어 올리는 단계**에 들어왔다.

기존 원칙인 `검색 → 작품 → 장소 → 지역 → 지도 → 재탐색`은 유지한다. 다만 2026-09 실행 비중은 다음으로 조정한다.

- **50%: 기존 검색 승자 강화**
- **30%: 신규 콘텐츠 Research Gate + 검증된 소수 제작**
- **20%: 기술 SEO / URL 보호 / 내부링크**

대규모 UI 리디자인은 Design Phase 1 종료 후 동결한다. 이후 UI 변경은 실제 사용자/검색 데이터가 이유가 있을 때만 한다.

---

## 1. 최신 Search Console 판단

### 1.1 장기 추세
기준 문서: `docs/growth/GSC_PERFORMANCE_2026-08-31_ANALYSIS.md`

2026-08-04~08-28:
- Clicks: 145
- Impressions: 4,656
- CTR: 3.11%
- 최근 7일(08-22~08-28): 2,591 impressions / 49 clicks / CTR 1.89%

Google이 더 많은 URL과 query를 시험하고 있으므로 site-wide 평균순위만 보고 성패를 판단하지 않는다.

### 1.2 최신 24시간 추가 신호
2026-08-31 사용자가 제공한 최신 24시간 GSC export 기준:
- 약 485 impressions
- 12 clicks
- CTR 약 2.47%

특히 KR/JA가 실제 클릭과 1페이지권 신호를 만들고 있으며 EN은 노출 대비 낮은 순위/클릭 효율이 계속 보인다.

### 1.3 전략 결론
- **KR = 최우선 성장 시장**
- **JA = 이미 1페이지 신호가 있는 작품을 선택적으로 투자**
- **EN = bulk expansion 금지. 글로벌 IP의 검증된 롱테일만 선택적 투자**
- **ZH = 구조/준비상태 유지, 수요 증거가 생길 때 확장**

---

## 2. 지금 가장 중요한 운영 원칙

### P0 — 검색자산을 삭제하지 않는다
PR #36 Place Detail 재생성 과정에서 기존 Place URL 일부가 사라질 수 있다는 것이 확인됐고, 최신 GSC에는 일부 Odyssey Place URL이 이미 2~6위권과 실제 클릭을 기록하고 있다.

따라서:
1. 기존 색인 URL은 삭제/404 전에 GSC 성과를 확인한다.
2. 실제 촬영지가 아니면 촬영지라고 허위 표기하지 않는다.
3. 대신 `FILMED / EXPERIENCE / STORY-RELATED / INSPIRATION / UNVERIFIED` 등 현재 데이터가 뒷받침하는 정확한 관계로 분류한다.
4. 유효한 콘텐츠로 유지 가능하면 **URL을 보존**한다.
5. 유지가 불가능하고 명확한 대체 페이지가 있으면 301 redirect를 제안한다.
6. 고순위/클릭 URL을 임의로 404 처리하지 않는다.
7. sitemap / canonical / hreflang 변경은 URL 보존 정책과 함께 검토한다.

현재 사용자에게 전달된 별도 SEO 안전성 작업이 이 원칙의 첫 적용이다.

---

## 3. 개발 실행 순서

### Stage A — 현재 작업 마무리
현재 진행 중인 작업을 먼저 끝낸다.

1. PR #36 삭제 Place URL SEO 안전성 보정
2. Issue #26 Discovery Hubs의 `/places/` 언어 토글 수정 포함 최종 QA/PR/병합
3. Issue #27 Shared Site Shell
4. Issue #28 Design Phase 1 final regression
5. Phase 1 운영 배포 확인 후 **디자인 동결**

**규칙:** Growth 코드가 같은 generator/CSS를 건드리면 Phase 1 최신 main 이후 시작한다.

### Stage B — Technical SEO hardening
Design Phase 1 closeout 직후 작은 전용 sprint로 수행한다.

필수 점검:
- `?work=` 및 기타 parameter state URL의 Google-selected canonical
- internal links가 불필요하게 parameter URL을 노출하는지
- sitemap / canonical / hreflang / x-default 일관성
- 삭제/복구/redirect URL map
- Work → Place → Region → Map 내부링크의 crawlable HTML 경로
- Places/Regions programmatic page 품질
- zero/near-zero value URL을 근거 없이 대량 noindex하지 않기

**Regions는 URL 수 확장 대상이 아니라 discovery/internal-link hub가 기본 역할이다.**

### Stage C — Existing Winner Growth Sprint
현재 GSC를 반영해 기존 Batch 순서를 부분 수정한다.

#### C1. Odyssey — 새 최우선 micro-sprint
이유:
- 작품 페이지가 1페이지권
- `오디세이 촬영지`, `오디세이 실제 지도`, `오디세이 촬영장소`, `오디세이 시칠리아` 등 명확한 query 의도
- 일부 Place URL이 2~6위권

할 일:
- 삭제 Place URL 보존/분류 정리 완료
- 현재 title/H1은 과도하게 바꾸지 말고 CTR 개선 중심 검토
- meta description과 첫 150~250자에서 "실제 촬영 장소 / 이야기 관련 장소"를 명확히 구분
- 핵심 Place 3~8개로 내부링크 강화
- 관련 지역/지도 CTA 연결
- `오디세이 실제 지도` 의도를 기존 Work/Map 경험 안에서 명확히 충족

#### C2. Byakuyako — JA 우선
이유:
- `/ja/works/byakuya/` 및 `白夜行` 관련 query가 일본 Google 1페이지권 신호
- Batch 2 research가 이미 존재

할 일:
- `docs/growth/batch2/BYAKUYA_RESEARCH_V1.md` 기준으로 `舞台 / 聖地巡礼` 의도 정리
- novel setting / adaptation filming / fictional/story nodes를 명확히 분리
- JA title을 무리하게 변경하지 말고 설명/내부링크/장소 맥락 강화
- 실제 장소가 충분할 때만 `聖地巡礼` 코스형 섹션 테스트

#### C3. Breaking Bad + Stranger Things
- 기존 research/brief 재사용
- Breaking Bad: Albuquerque/verified filming intent 강화
- Stranger Things: 현재 높은 CTR/순위를 보호하면서 장소 최신성/정확성 개선
- 성공 title을 전면 재작성하지 않는다

#### C4. Harry Potter
- 1페이지 자산 보호
- 촬영지 정확성 보정 + supporting Place 내부링크 강화

#### C5. Santi / One Piece
- 단순 metadata 작업 전에 기존 Research Gate의 taxonomy 문제를 먼저 해결
- shared data-model 변경이 필요하면 `NEEDS DECISION`

---

## 4. 질문형 SEO 콘텐츠 전략 — 별도 URL을 함부로 만들지 않는다

GSC에서 실제 query는 작품명만이 아니라 다음처럼 질문/구체 의도로 들어온다.

- `오디세이 촬영지`
- `오디세이 실제 지도`
- `백야행 성지순례`
- `앨버커키 브레이킹 배드`
- `기묘한 이야기 촬영지`

이 수요는 적극 대응하되 **동일 키워드로 새 article URL을 남발하지 않는다.** Work 페이지와 새 article이 서로 경쟁할 수 있기 때문이다.

### 1차 방식
기존 canonical Work 페이지 안에 검색 질문을 직접 해결하는 섹션을 만든다.

예:
- H2: 오디세이는 실제 어디서 촬영했을까?
- H2: 실제 촬영지와 이야기 관련 장소는 어떻게 다른가?
- H2: 촬영지를 지도에서 한 번에 보는 방법

### 별도 URL 허용 조건
다음처럼 검색의도가 명확히 다르고 독립 가치가 있을 때만 만든다.
- `하루 여행코스`
- `도시별 성지순례 코스`
- `시즌별 촬영지 변화`
- 한 작품을 넘어 여러 작품을 묶는 장소/지역 가이드

FAQ schema는 검색효과를 기대해 자동 대량 적용하지 않는다. 실제 사용자에게 유용한 본문을 우선한다.

---

## 5. 신규 콘텐츠 전략 — 바로 개발하지 말고 Research Gate부터

신규 작품은 **화제성 × 실제 장소성 × 검증 가능성**으로 선별한다.

Publish Gate는 기존 `CONTENT_PRIORITY_30_2026H2.md` 원칙을 유지한다.
- 실제 장소 5개 이상 검증 가능
- scene/context 설명 가능
- 여행 코스 또는 2개 이상 지역 연결 가능
- 공식 플랫폼/언론/공공기관 등 신뢰 가능한 출처 3개 이상
- KR 외 최소 한 언어의 확장 가능성

### 2026-09 Research Gate 우선 후보

#### N1. Our Sticky Love / 이런 엿같은 사랑
왜 조사하는가:
- 2026년 8월 Netflix Korea Top 10에서 반복 상위권
- 촬영지 검색 콘텐츠가 이미 빠르게 생기고 있어 수요/경쟁이 동시에 존재

주의:
- 현재 공개된 촬영지 정보에서 당진/예천 등 출처별 불일치가 확인됨
- **즉시 개발 금지. 먼저 primary/local source 중심으로 실제 촬영지 5개 이상 검증**

판정:
- **Research Priority A / Publish 미확정**

#### N2. The East Palace / 동궁
왜 조사하는가:
- 2026 Netflix Korea Top 10 반복 진입
- 호서대학교 아산캠퍼스는 촬영지로 확인 가능한 보도/기관 제공 근거가 존재
- 전국 사극/산악/캠퍼스 공간으로 location graph 확장 가능성이 높음

판정:
- **Research Priority A / 현재 신규 후보 중 Publish Gate 통과 가능성이 높음**
- 다만 secondary list의 18~20개 장소를 그대로 믿지 말고, 최소 5개를 신뢰 가능한 출처로 재검증

#### N3. Spooky in Love / 오싹한 연애
왜 조사하는가:
- 2026년 8월 Netflix Korea Top 10 반복 진입

판정:
- **Research Priority B**
- 실제 location richness와 검증 source가 확보되기 전에는 개발하지 않음

### 신규 콘텐츠 제작량
월 3~6개를 상한으로 두되, **기존 승자 리라이트와 신규 제작을 합산**한다.
새 작품 수 자체를 KPI로 사용하지 않는다.

---

## 6. 신규 작품 1개의 완료 정의

앞으로 `Work page 하나 생성`만으로 완료 처리하지 않는다.

최소 완료 패키지:
1. Work 페이지
2. 검증된 핵심 Place 5개 이상
3. 각 Place의 정확한 관계 분류
4. 최소 1개 Region 연결
5. Map 진입
6. Work ↔ Place ↔ Region 내부링크
7. 검색의도를 직접 해결하는 질문형 본문 2~4개
8. KR 공개
9. JA/EN/ZH는 실제 수요/작품 특성에 따라 선택적
10. 배포 전 canonical/hreflang/sitemap/mobile QA

기존 content skill의 `100명/100장소`는 **허위/패딩을 허용하는 숫자 목표가 아니다.** 2026-09 성장 sprint에서는 검색/여행 가치가 높은 검증 데이터의 밀도를 우선한다.

---

## 7. 언어 투자 원칙

### KR
- 기존/신규 모두 기본
- 촬영지/실제 장소/지도/지역 검색의도 강화

### JA
선택적 우선투자:
- Byakuyako
- 일본 배경/일본 팬덤 강한 작품
- 실제 GSC 1~2페이지 신호가 생긴 작품

### EN
당분간 금지:
- generic `filming in Spain/Africa/Romania` 식의 bulk programmatic 확장

허용:
- Breaking Bad / Stranger Things / Harry Potter처럼 기존 검색자산이 있고, 특정 장소명 + 작품명으로 의도가 명확한 롱테일

### ZH
- i18n architecture/readiness 유지
- 유의미한 GSC demand가 생긴 작품부터 확대

---

## 8. 4주 실행 예시

### Week 1
- SEO URL preservation hotfix 완료
- #26 / #27 / #28 Phase 1 closeout 진행
- Odyssey SEO/content brief 확정

### Week 2
- Phase 1 완료 시 Odyssey micro-sprint 구현
- Byakuyako JA 개선
- Technical SEO audit 시작

### Week 3
- Breaking Bad + Stranger Things 기존 승자 개선
- 신규 N1/N2/N3 Research Gate 완료
- 통과 후보 1개만 제작 착수

### Week 4
- Harry Potter 또는 다음 GSC 승자 개선
- 신규 후보 1개 공개 가능 시 QA/배포
- 14일 성과가 나온 첫 배치 평가
- 다음 4주 우선순위 재정렬

**순서는 calendar보다 collision/배포 상태와 GSC evidence를 우선한다.**

---

## 9. KPI

### Primary KPI
- Google organic clicks
- 1~10위 query 수
- 핵심 Work/Place URL의 impressions / CTR / position

### 4주 목표 범위
현재 성장 추세를 기준으로:
- 7-day average impressions: **700~1,000/day** 목표 범위
- organic clicks: **20~30/day** 목표 범위
- 핵심 5개 작품 중 최소 3개가 주요 query에서 안정적 1페이지 유지/진입
- JA에서 실제 클릭을 만드는 작품 2개 이상

이 수치는 보장 목표가 아니라 의사결정 기준이다. 노출만 늘고 순위/클릭이 나빠지는 URL 확장은 성공으로 계산하지 않는다.

### Measurement cadence
SEO/content 배포마다:
- Before baseline 저장
- +14일 GSC 비교
- +28일 GSC 비교

비교 항목:
- impressions
- clicks
- CTR
- average position
- target query position
- Work → Place / Map engagement (GA4 가능 시)

---

## 10. 개발자 작업 규칙

1. 항상 latest `main`에서 시작한다.
2. generated HTML이 아니라 canonical generator/source를 수정한다.
3. 성공 중인 title/URL을 이유 없이 전면 교체하지 않는다.
4. 촬영지/배경/추천/체험을 혼동하지 않는다.
5. SEO를 위해 허위 장소나 여행정보를 만들지 않는다.
6. 기존 색인 URL 삭제/rename은 별도 SEO audit 없이 하지 않는다.
7. canonical/hreflang/JSON-LD/GA4/sitemap을 회귀검증한다.
8. 360/390/430 mobile QA를 유지한다.
9. 한 PR은 가능한 한 한 growth 목적만 가진다.
10. URL architecture / data model / 대량 redirect / 대량 noindex가 필요하면 `NEEDS DECISION`으로 멈춘다.
11. 운영 배포는 자동으로 하지 않는다. ZIP과 변경/QA 보고까지만 준비한다.

---

## 11. 개발자에게 지금 당장 할 것 / 하지 말 것

### 지금 할 것
- 사용자가 이미 전달한 PR #36 Place URL SEO 안전성 작업 완료
- #26/#27/#28 Design Phase 1 closeout 완료
- 최신 main과 충돌 없는지 확인

### 다음 Growth 실행 준비
- Odyssey의 source/generator/Place 관계를 추적하고 brief 기준 구현 준비
- Byakuyako Batch 2 research를 읽고 JA 개선 범위를 작은 PR로 산정
- Technical SEO audit 체크리스트 준비

### 아직 하지 말 것
- 신규 작품 3개를 곧바로 구현
- 영어/Region URL 대량 생성
- 별도 질문형 article URL 대량 생성
- GSC 근거 없는 대량 noindex/404
- 또 다른 대규모 디자인 리디자인

---

## 12. 관련 기준 문서

개발자는 이 문서와 함께 아래를 읽는다.

1. `docs/growth/GSC_PERFORMANCE_2026-08-31_ANALYSIS.md`
2. `docs/growth/CONTENT_GROWTH_ENGINE_V1.md`
3. `docs/growth/CONTENT_PRIORITY_30_2026H2.md`
4. `docs/growth/BATCH1_IMPLEMENTATION_READINESS_V1.md`
5. `docs/growth/batch2/BATCH2_READINESS_MATRIX_V1.md`
6. `docs/growth/K_CONTENT_LOCATION_GRAPH_V1.md`
7. `docs/growth/CONTENT_PRODUCTION_PIPELINE_V1.md`
8. `docs/design/DESIGN_PHASE1_CLOSEOUT_V1.md`
9. `docs/qa/MOBILE_VISUAL_QA_CHECKLIST_V1.md`

## Final direction

그곳지금의 2026-09 성장 목표는 "작품 수가 많은 사이트"가 아니다.

> **영화·드라마를 보고 ‘저 장면 어디야?’라고 검색했을 때, 정확한 실제 장소와 지도/여행 맥락까지 가장 잘 연결해 주는 사이트**

따라서 다음 성장 단계는 `more URLs`가 아니라 **protect winners → answer intent → connect places → selectively publish** 순서로 실행한다.
