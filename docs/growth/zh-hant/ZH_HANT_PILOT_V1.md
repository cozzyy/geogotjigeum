# 그곳지금 繁中 Pilot v1

Date: 2026-08-31
Status: **PLANNED / QUEUED AFTER STAGE C**
Issue: #37

## 1. 목적

繁中 버튼만 존재하는 상태를 넘어서, 선택한 6개 작품에서 **작품 → 장소 → 지역 → 지도**까지 실제로 사용할 수 있는 Traditional Chinese (`zh-Hant`) 경험을 만든다.

전면 번역은 하지 않는다. 먼저 6개 작품으로 검색/사용자 반응을 검증하고 14일/28일 성과를 보고 확대 여부를 결정한다.

## 2. 현재 저장소 기준

현재 `site/zh/`에는 home / works / places / regions 구조가 있고 `site/zh/works/`에는 다음 6개 작품 디렉토리만 존재한다.

- `coffeeprince`
- `daejanggeum`
- `kdemonhunters`
- `poksshak`
- `squidgame`
- `wintersonata`

따라서 이번 파일럿은 기존 6개를 그대로 유지하는 프로젝트가 아니다. 현재 zh-Hant 생성 파이프라인과 번역 완성도를 먼저 감사한 뒤, 성장성이 높은 작품 중심으로 재구성한다.

## 3. Pilot 대상

### 고정 5개
1. `squidgame` — 기존 zh-Hant 자산의 품질 기준점
2. `poksshak` — 제주/여행 연결성이 있는 K-content 기준점
3. `glory` — 신규 zh-Hant 확장
4. `dokkaebi` — 성지순례/한국여행형 에버그린
5. `isatong` — 한국·일본·캐나다·이탈리아의 다국가 장소 구조

### 6번째 작품
Stage C 완료 후 GSC에서 가장 성과가 좋은 작품 1개를 선택한다.

후보 예: Odyssey / Byakuyako / Breaking Bad / Stranger Things / Harry Potter.

**6번째 작품은 지금 미리 확정하지 않는다.**

## 4. 작품 1개 완료 정의

작품 한 개는 아래가 모두 완료돼야 `ZH-HANT READY`다.

- official/credible Traditional Chinese 작품명 확인
- zh-Hant title / meta description / H1 / 주요 H2
- 본문 핵심 내용 자연스러운 번체중문
- 핵심 Place 최소 5개 또는 해당 작품에서 검증 가능한 핵심 장소 전체
- 장소명·설명·여행 팁의 zh-Hant
- FILMED / EXPERIENCE / STORY-RELATED / INSPIRATION / UNVERIFIED 관계 정확성
- Work → Place → Region → Map 내부링크
- 가능하면 관련 작품 링크도 `/zh/` 경로 유지
- canonical / hreflang / x-default / sitemap 정상
- 모바일 360 / 390 / 430 QA
- 한국어/영어가 visible content에 섞이지 않는지 확인

핵심 장소가 5개 미만인 작품은 숫자를 맞추기 위해 허위/약한 장소를 추가하지 않는다.

## 5. 구현 순서

### P1 — Audit
`ZH_HANT_CONTENT_READINESS_AUDIT_V1.md` 기준으로 현재 `/zh/` 전체를 감사한다.

### P2 — Source tracing
생성 HTML을 직접 고치기 전에 다음 source를 확인한다.
- work metadata source
- work-specific location source
- people/story source if visible text에 영향
- shared i18n dictionary
- work/place/region generator
- sitemap/hreflang generation path

### P3 — Pilot 5개 구현
`squidgame`, `poksshak`, `glory`, `dokkaebi`, `isatong` 순으로 구현하되, 같은 generator를 공유하면 한 번에 구조를 고치고 작품별 콘텐츠만 분리한다.

### P4 — Stage C winner 추가
PM/User가 6번째 작품을 승인한 뒤 추가한다.

### P5 — QA / PR / ZIP
- static generation/regeneration
- broken link check
- locale link check
- canonical/hreflang/sitemap check
- mobile QA
- PR
- local deployment ZIP

운영 배포는 하지 않는다.

## 6. 파일럿 성공 기준

배포 후 14일/28일에 확인한다.

- zh-Hant impressions 발생 여부
- zh-Hant clicks 발생 여부
- target query 평균순위
- work → place / map 이동
- 중국어 페이지에서 다른 언어로 이탈시키는 broken/fallback link 여부

### 확대 판단
- 2개 이상 작품에서 의미 있는 impression/query 신호가 생기면 Batch 2 검토
- 반응이 거의 없으면 전면 번역하지 않고 title/meta/query intent를 먼저 재검토

## 7. 범위 밖

이번 Pilot에서 하지 않는다.

- Simplified Chinese (`zh-CN`) 추가
- `/zh/` URL을 다른 구조로 변경
- 전체 40+ 작품 번역
- Region 페이지 대량 자동생성
- 모든 Place를 억지로 번역/생성
- 디자인 리뉴얼
- 자동 배포

## 8. 핵심 원칙

> 목표는 “중국어 페이지 수”가 아니라 “중국어 사용자가 실제로 끝까지 탐색할 수 있는 6개의 완성된 콘텐츠 경험”이다.
