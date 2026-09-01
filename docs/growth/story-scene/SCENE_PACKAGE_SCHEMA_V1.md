# Scene Package Schema v1.2

Date: 2026-09-01
Status: **PLANNING CONTRACT — CONTENT/PM → DEVELOPER**
Parent: Issue #40

## 1. 목적

Scene Package는 기획자가 장면/이야기, 사실관계, canonical location 연결, 이미지 asset과 문구까지 준비하고 개발자는 이를 현재 Work/Place/Map 구조에 통합만 하도록 하는 인수인계 단위다.

Phase E v1 최종 구현 입력은 반드시 아래 파일을 사용한다.

`docs/growth/story-scene/SCENE_PACKAGES_READY_V1.yaml`

기존 `SCENE_PACKAGES_DRAFT_V1.yaml`은 연구 흔적이며 구현 입력이 아니다.

## 2. 핵심 필드

```yaml
scene_id: odyssey-scene-01
work_id: odyssey
context_type: SCREEN_SCENE
source_location_id: nestors_cave
link_mode: MAP_OR_PLACE
scene_title_ko: "..."
scene_description_ko: "..."
relationship: FILMED
image_path: /assets/scenes/odyssey/odyssey-scene-01.svg
image_type: original_illustration
alt_ko: "..."
fact_sources: ["..."]
image_source_url: internal
license: original
attribution: "그곳지금 기획"
why_this_place_ko: "..."
status: PLANNER_READY
```

## 3. context_type

- `SCREEN_SCENE` — 영상 작품의 장면/시퀀스와 실제 장소 연결
- `STORY_SETTING` — 소설·원작의 실제 배경/무대. 촬영지라고 표시하면 안 됨
- `ADAPTATION_FILMING` — 원작과 별도로 영상판 촬영이 검증된 장소

UI 기본 카피:

| context | 기본 카피 |
|---|---|
| SCREEN_SCENE | `이곳에서 나온 장면` |
| STORY_SETTING | `이곳과 연결된 이야기` |
| ADAPTATION_FILMING | `영상판은 여기서 찍혔다` |

## 4. relationship

- `FILMED`
- `EXPERIENCE`
- `STORY-RELATED`
- `INSPIRATION`
- `UNVERIFIED`

`UNVERIFIED`는 v1 운영 UI에 노출하지 않는다.

## 5. source_location_id와 SEO Place 페이지를 구분한다

`source_location_id`는 현재 작품 location data 안의 canonical location ID다.

Scene Package가 canonical location을 갖는다고 해서 반드시 `/places/.../` SEO 페이지가 존재해야 하는 것은 아니다.

현재 `generate_place_pages.js`는 정확성을 위해 `official|experience`만 Place SEO 페이지로 생성하고 STORY SETTING은 제외한다. 이 정책을 Phase E 때문에 깨지 않는다.

세부 매핑은:

`docs/growth/story-scene/SCENE_PLACE_MAPPING_V1.md`

을 기준으로 한다.

## 6. link_mode

### `MAP_OR_PLACE`
- canonical source location이 존재하는 실제 촬영/체험 장소
- 해당 Place SEO page가 존재하면 Place 링크 사용 가능
- 없으면 기존 Map state `?work=<work>&loc=<id>` 사용
- Phase E만을 위해 tier/URL을 임의 변경하지 않는다

### `MAP_STATE`
- canonical source location은 존재하지만 STORY_SETTING
- Map state로 연결
- 촬영지 SEO Place page로 승격하지 않는다

### `ADD_LOCATION_THEN_MAP_OR_PLACE`
- 기획 측 검증은 끝났지만 canonical source row가 아직 없는 실제 촬영지
- `SCENE_PACKAGES_READY_V1.yaml`의 `developer_source_action` 데이터를 그대로 canonical source에 추가
- 개발자가 장소/좌표/관계를 새로 판단하지 않는다

## 7. 상태값

- `RESEARCHED` — 후보/사실 조사만 완료
- `ASSET_SOURCE_VERIFIED` — 사용할 외부 asset 출처/권리 확인
- `PLACE_REQUIRED` — planner 결정 전 장소 연결 미완료
- `PLANNER_READY` — 개발자가 판단할 콘텐츠 요소가 모두 확정됨. asset이 repo에 존재하고 source location/link mode가 확정됨. `ADD_LOCATION_THEN_MAP_OR_PLACE`의 경우 planner가 exact source patch data를 제공하면 이 상태 허용
- `READY` — 개발자가 canonical source patch/integration까지 반영하여 runtime render 가능한 상태
- `BLOCKED` — 사실/권리/구조 이슈로 보류

**Issue #40 개발 착수 gate는 15개 모두 `PLANNER_READY`면 충족한다.** 구현 후 developer가 runtime 검증을 통과한 package를 `READY`로 취급한다.

## 8. 이미지 타입

허용:
- `licensed_photo`
- `original_photo`
- `original_illustration`
- `generated_illustration`

Phase E v1은 개발 blocker를 없애기 위해 기획 측이 만든 **original SVG editorial illustration 15개**를 repo에 직접 제공한다.

SVG도 이미지 asset으로 허용한다.

권장:
- 사진: WebP, 16:9, <=1600×900, 대개 100–300KB
- original illustration: SVG 허용, viewBox 1600×900 권장

금지:
- 무허가 영화/Netflix/방송사 screenshot
- unknown-license 이미지
- watermarked 이미지
- 특정 프레임/배우 얼굴을 그대로 복제한 illustration

## 9. 이미지 경로

```text
site/assets/scenes/<work_id>/<scene_id>.(svg|webp)
```

Phase E v1 제공 asset은 모두 SVG다.

## 10. alt 규칙

alt는 이미지 의미를 자연스럽게 설명한다. 키워드 나열 금지.

original illustration인 경우 실제 스틸/사진처럼 오해되지 않도록 `표현한 에디토리얼 일러스트`라는 의미를 포함한다.

## 11. 사실 출처와 이미지 출처 분리

- `fact_sources`: 작품↔장소 관계 검증 근거
- `image_source_url`: 실제 사용 이미지 출처

Phase E v1 original SVG는:

```yaml
image_source_url: internal
license: original
attribution: "그곳지금 기획"
```

으로 고정한다.

## 12. Why This Place?

2~4문장.

1. 작품과의 기억
2. 실제 장소에서 느낄 차이/매력
3. 가볼 이유

친구에게 말하듯 쓰되 관광 광고문구와 확인되지 않은 사실은 쓰지 않는다.

## 13. 개발자 역할

개발자는:
- manifest loader/source integration
- Work Scene UI
- 존재하는 Place Detail의 Scene/Why block
- Map/Place link resolution
- responsive image/UI
- accessibility/performance
- SEO/i18n/GA4 regression

을 담당한다.

개발자는 하지 않는다:
- 장면 새로 고르기
- 이미지 검색/대체
- 사실관계 추정
- STORY_SETTING을 FILMED로 변경
- 임의 Place URL 생성

## 14. 구현 규칙

- generated HTML을 source of truth로 삼지 않는다
- Scene 전용 URL 생성 금지
- 기존 Work/Place URL/canonical/hreflang/sitemap 유지
- Scene text는 crawlable HTML
- Work↔Place/Map link는 일반 `<a href>`
- 기존 design system 재사용
- untranslated locale에 한국어 Scene 문구를 silent fallback하지 않는다

## 15. 완료 조건

- `SCENE_PACKAGES_READY_V1.yaml` 15개 모두 처리
- repo asset 15/15 정상 로드
- wrong FILMED 0
- broken link/image 0
- STORY_SETTING 두 건이 촬영지로 노출되지 않음
- 백야행 미쓰카이도역 planner-approved source patch 반영
- 360/390/430 mobile QA
- SEO/i18n/GA4 regression pass
- PR + QA + local deployment ZIP
- production deploy는 사용자 승인 전 금지
