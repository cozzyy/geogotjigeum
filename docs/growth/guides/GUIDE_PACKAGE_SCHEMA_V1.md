# Guide Package Schema v1

Date: 2026-09-01
Status: **PLANNER APPROVED — IMPLEMENTATION CONTRACT**
Parent: Issue #41

## 목적
Phase F에서는 Guide 3개를 각각 손코딩하지 않는다. Planner가 `GUIDE_PACKAGES_READY_V1.yaml`을 제공하고, Developer는 이를 읽는 **공용 Guide renderer/template 1개**를 만든다.

## 핵심 원칙
- Guide는 기존 Work/Place/Scene 데이터를 재사용한다.
- Guide 때문에 기존 Work/Place URL을 변경하지 않는다.
- 실시간 경로 최적화/교통 API를 넣지 않는다.
- `slug_candidate`는 planner의 희망 경로일 뿐이다. 현재 router/generator에 작은 추가로 수용 가능할 때만 사용한다. 새 전역 URL architecture가 필요하면 `NEEDS DECISION`.
- source location이 존재한다고 반드시 SEO Place page를 새로 만들지 않는다. `link_mode`를 따른다.
- 영업시간/교통시간처럼 쉽게 변하는 숫자는 본문에 하드코딩하지 않는다. `current_status_source`로 사용자가 확인할 수 있게 한다.

## Guide 필드
```yaml
guide_id: string
status: PLANNER_READY
primary_locale: ko | ja
work_id: string
guide_type: LINEAR_ROUTE | LAYERED_PILGRIMAGE
slug_candidate: string
seo:
  title: string
  meta_description: string
  target_queries: [string]
hero:
  eyebrow: string
  heading: string
  summary: string
  time_label: string
  transport_label: string
  hero_asset: string
before_you_go:
  - string
segments:
  - segment_id: string
    title: string
    summary: string
    stops:
      - order: int
        stop_id: string
        canonical_location_id: string
        canonical_source: string
        relationship: FILMED | STORY-RELATED
        context_type: SCREEN_SCENE | STORY_SETTING | ADAPTATION_FILMING
        link_mode: MAP_OR_PLACE | MAP_STATE
        role: CORE | OPTIONAL_EXTENSION
        scene_id: string | null
        asset_path: string
        heading: string
        body: string
        why_this_stop: string
        visit_note: string
        next_hint: string
        current_status_source: string | null
        verified_at: YYYY-MM-DD
related:
  work_id: string
  suggested_links: [WORK, PLACE, MAP]
```

## Renderer 요구사항
### 공통
1. Hero
2. Guide overview / Before You Go
3. Route map 또는 segment map
4. Stop cards
5. Related Work / Place / Map

### LINEAR_ROUTE
- stop order를 그대로 보여준다.
- "자동 최적 경로"라고 표현하지 않는다.
- 지도 API가 없는 경우 기존 Map state/links를 재사용하고 stop order만 시각적으로 표현한다.

### LAYERED_PILGRIMAGE
- 서로 멀리 떨어진 지역/성격이 다른 장소를 하나의 1-day route로 오해시키지 않는다.
- segment header를 명확히 노출한다.
- `STORY_SETTING`과 `ADAPTATION_FILMING`을 시각적으로 구분한다.

## Asset 규칙
- Phase F v1은 Phase E의 planner-owned original SVG를 재사용한다.
- Developer가 인터넷에서 새 이미지를 찾지 않는다.
- 지정 asset이 없거나 깨지면 임의 대체하지 말고 blocker로 보고한다.

## Locale 규칙
- Breaking Bad / Poksshak: v1 기본 `ko`
- Byakuyako: v1 기본 `ja`
- 번역되지 않은 Guide를 다른 locale에서 한국어/일본어로 silent fallback하지 않는다.
- 향후 번역 package가 준비되기 전에는 해당 locale Guide를 생성하지 않는다.

## SEO 규칙
- Guide intent는 Work intent와 달라야 한다.
- Guide title/H1은 route/pilgrimage 의도를 명확히 한다.
- Work title/H1을 Guide 때문에 변경하지 않는다.
- canonical/hreflang/sitemap은 실제 생성된 Guide만 포함한다.
- Scene 전용 URL은 새로 만들지 않는다.
- thin map-only page 금지.

## 완료 기준
- 3/3 Guide Package 렌더링
- canonical stop mapping 100%
- broken asset/link 0
- private residence 직접 방문 유도 0
- FILMED/STORY-RELATED 오분류 0
- mobile 360/390/430 QA
- SEO/i18n/GA4 regression pass
- PR + QA report + local deployment ZIP
- 운영 배포는 사용자 승인 전 금지
