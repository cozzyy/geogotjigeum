# 그곳지금 Phase E — Story & Scene Pilot v1

Date: 2026-09-01
Status: **PLANNER GATE CLEARED / READY FOR DEVELOPMENT WHEN SEQUENCE RELEASES IT**
Parent: Issue #31 / Implementation Issue #40

## 0. 목적

Phase E는 그곳지금을 단순한 `작품 → 촬영지 목록`에서 한 단계 확장해,

`작품 → 기억나는 장면/이야기 → 실제 location → 왜 가볼 만한지 → Place 또는 Map`

으로 이어지는 미디어 경험을 만든다.

v1은 새 Scene URL이나 대형 기능을 만들지 않는다. 기존 Work/Place/Map 안에 다음을 추가한다.

1. **Scene Context v1**
2. **Why This Place?**

## 1. 2026-09-01 Planner Gate 완료

기획 측 준비는 완료됐다.

- 5작품 × 3 package = **15/15 PLANNER_READY**
- 15/15 original SVG editorial image asset repo 반영
- 15/15 image path / alt / source / license / attribution 완료
- canonical source location mapping 재검증 완료
- STORY SETTING과 FILMED 분류 재검증
- 개발자가 새로 판단해야 할 Place/이미지 없음
- Byakuyako 2006 TBS 촬영지 `by_mitsukaido_station`은 exact planner-approved source action까지 제공

최종 구현 기준은 반드시 아래 순서로 읽는다.

1. `docs/growth/story-scene/SCENE_PACKAGES_READY_V1.yaml`
2. `docs/growth/story-scene/SCENE_PLACE_MAPPING_V1.md`
3. `docs/growth/story-scene/SCENE_PACKAGE_SCHEMA_V1.md`
4. 본 문서
5. `docs/growth/story-scene/STORY_SCENE_CONTENT_GUIDE_V1.md`
6. `docs/growth/story-scene/SCENE_PACKAGE_RESEARCH_15_V1.md` — 근거 참고용

`SCENE_PACKAGES_DRAFT_V1.yaml`은 구현 입력이 아니다.

## 2. 실행 순서

현재 전체 Growth 순서는:

1. Stage C closeout
2. Issue #37 `繁中 Pilot v1`
3. Issue #40 Phase E

이다. PM/사용자가 명시적으로 병렬화하거나 순서를 바꾸지 않는 한 이 순서를 따른다.

Phase E 자체는 더 이상 Planner Prep 때문에 막혀 있지 않다.

## 3. 파일럿 대상

- `odyssey`
- `breakingbad`
- `byakuya`
- `strangerthings`
- `poksshak`

작품당 3개, 총 15 Scene/Story Package.

## 4. Scene Context v1

### Work Detail
Hero/intro 이후, 전체 장소 목록보다 앞에 `장면으로 다시 보기` 또는 context에 맞는 섹션을 둔다.

카드 정보:
- 기획 제공 이미지
- 짧은 장면/이야기 제목
- 1~3문장 설명
- 관계 배지
- 연결 location 이름
- Place 또는 Map으로 가는 crawlable `<a href>`

### Place Detail
실제 generated Place page가 존재하는 linked location에만 다음을 추가한다.

- `SCREEN_SCENE`: `이곳에서 나온 장면`
- `ADAPTATION_FILMING`: `영상판은 여기서 찍혔다`
- `여기, 왜 가볼 만해?`

`STORY_SETTING`은 Phase E 때문에 촬영지 Place page를 억지로 만들지 않는다.

## 5. Place와 Map 링크 규칙

canonical location과 SEO Place page는 다른 개념이다.

상세 기준:
`docs/growth/story-scene/SCENE_PLACE_MAPPING_V1.md`

### `MAP_OR_PLACE`
canonical source location이 있는 실제 촬영/체험 장소.
- Place page가 있으면 Place로 연결 가능
- 없으면 기존 Map state `?work=<work>&loc=<id>`로 연결
- Phase E만을 위해 tier/URL 변경 금지

### `MAP_STATE`
STORY SETTING.
- Map으로만 연결
- 촬영지 Place SEO page로 승격 금지

### `ADD_LOCATION_THEN_MAP_OR_PLACE`
planner가 검증한 실제 촬영지지만 canonical source row만 없는 경우.
- final manifest의 exact `developer_source_action`을 적용
- 그 다음 기존 generator 정책 사용

## 6. Byakuyako 특별 규칙

백야행은 세 종류를 섞지 않는다.

- 원작 실제 무대 → `STORY_SETTING / STORY-RELATED`
- 영상판 실제 촬영 → `ADAPTATION_FILMING / FILMED`
- fictional/theme/non-place → Scene package 대상 아님

v1의 원작 무대:
- `by_fuse_station`
- `by_fuse_honodori`

영상판 대표 촬영지:
- `by_mitsukaido_station`

`by_mitsukaido_station`의 좌표/주소/source patch는 final manifest에 확정돼 있다.

## 7. 기획자 / 개발자 역할

### 기획자 — 완료
- 대표 scene/story 선정
- 사실 검증
- source location 확정
- relationship/context 확정
- 이미지 제작
- source/license/attribution
- alt
- Scene copy
- Why This Place copy

### 개발자
- final manifest를 현재 generator/source flow에 통합
- Work Scene UI
- 유효한 Place Detail의 Scene/Why UI
- `link_mode` 해석
- SVG responsive rendering
- accessibility/performance
- mobile QA
- SEO/i18n/GA4 regression

### 개발자가 하지 않는 것
- 이미지 검색/대체
- 장면 재선정
- Place ID 추정
- STORY SETTING을 FILMED로 변경
- Scene URL 생성
- 빈칸을 임의 콘텐츠로 채움

## 8. 이미지 정책

Phase E v1 asset은 이미 제공돼 있다.

경로:
`site/assets/scenes/<work_id>/<scene_id>.svg`

15개 모두:
- original editorial illustration
- 16:9 `viewBox 1600×900`
- `license: original`
- `image_source_url: internal`
- 배우 얼굴 복제 없음
- 영화/Netflix/방송사 스틸 무단 사용 없음

실제 장소 사진으로 교체하는 것은 v1 이후 별도 콘텐츠 개선이다.

## 9. 언어 전략

Phase E v1은 KO-first.

- KO: 15 package 구현
- EN/JA/ZH: 해당 언어 Scene copy가 없으면 block 숨김
- 한국어를 다른 locale에 silent fallback 금지
- image asset은 공용 사용 가능하지만 alt/text는 locale별 준비 필요

## 10. SEO / 내부링크

- Scene URL 생성 금지
- 기존 Work/Place canonical 유지
- hreflang/x-default 유지
- sitemap URL 수 확대 목적 아님
- Scene copy는 visible/crawlable HTML
- 내부링크는 일반 `<a href>`
- title/H1을 Scene 키워드 때문에 전면 변경하지 않음
- Region/Place URL 대량 생성 금지

## 11. UI / Mobile

현재 Design System과 Work/Place 스타일을 재사용한다.

Desktop:
- Work: 3개 Scene Card grid
- Place: 기존 Place 정보 흐름에 Scene/Why block

Mobile 360/390/430:
- 1열
- 가로 overflow 0
- SVG가 비율 유지
- tap target 44px 이상
- fold 아래 image lazy load 가능
- image 실패 시 layout 붕괴 금지

## 12. Phase E에서 하지 않는 것

- Scene 전용 URL
- Scene 검색/필터
- 방문 인증
- 배지/포인트
- ShotSync 카메라
- 로그인/컬렉션
- full scene database migration

## 13. 성공 판단

배포 후 14/28일:
- 대상 Work/Place impressions/clicks/CTR/position
- Scene → Place/Map 클릭
- Place → Work 클릭
- Map CTA

측정 대기 때문에 다음 개발을 중단하지 않는다. 결과는 이후 우선순위 조정에 사용한다.

## 14. 완료 조건

- final manifest 15/15 integration
- image asset 15/15 load
- wrong FILMED 0
- broken image/link 0
- STORY_SETTING을 촬영지로 오표기 0
- `by_mitsukaido_station` exact source action 반영
- KO experience 완결
- untranslated locale Korean fallback 0
- 360/390/430 QA
- canonical/hreflang/sitemap/GA4 regression 0
- PR + QA report + local deployment ZIP
- production deploy는 사용자 승인 전 금지

## 15. NEEDS DECISION

다음만 멈추고 보고한다.
- 새로운 URL architecture 필요
- shared data-model 대규모 migration 필요
- 기존 고순위 URL 변경 필요
- #37 또는 현재 shared generator와 실질적 충돌

final manifest integration과 지정된 `by_mitsukaido_station` source-row 추가는 승인 범위다.
