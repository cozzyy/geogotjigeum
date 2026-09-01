# Phase F — Curated Guide & Route Pilot v1

Date: 2026-09-01
Status: **PLANNER GATE CLEARED / READY AFTER #37 → #40 SEQUENCE**
Parent: Issue #31 Content Growth Engine v1
Implementation Issue: #41

## 0. 목적
그곳지금을 `작품 → 장소` DB에서 `그래서 실제로 어떻게 여행하지?`까지 답하는 여행 미디어로 확장한다.

Guide는 기존 Work와 다른 검색의도를 겨냥한다.
- Work: 작품의 촬영지가 어디인지
- Guide: 그 장소를 실제로 어떤 순서/방식으로 경험할지

v1은 3개 파일럿만 수동 기획하고, Developer는 **공용 Guide renderer/template 1개**만 만든다.

## 1. Canonical implementation input
개발자는 아래 순서로 읽는다.
1. `docs/growth/guides/GUIDE_PACKAGES_READY_V1.yaml` — 최종 3 Guide Package
2. `docs/growth/guides/GUIDE_STOP_MAPPING_V1.md` — canonical stop/link 규칙
3. `docs/growth/guides/GUIDE_PACKAGE_SCHEMA_V1.md` — renderer contract
4. 이 문서

Planner는 콘텐츠·Stop·관계·asset·SEO copy·source를 완료했다. Developer가 장소나 이미지를 새로 찾지 않는다.

## 2. 파일럿 3개 — 최종

### F1 Breaking Bad — Albuquerque
**형태:** `LINEAR_ROUTE`

최종 Stop:
1. `lospollos` — Twisters / Los Pollos Hermanos
2. `tuco_office` — Java Joe's / Tuco HQ
3. `carwash` — A1A filming location / current car wash

Planner decision:
- Walter White house는 개인 주택이므로 핵심 Stop에서 제외.
- 현재도 영업하는 상업시설 3곳만 core route로 사용.
- 실시간 영업시간/교통은 하드코딩하지 않음.

### F2 Poksshak — Jeju
**형태:** `LINEAR_ROUTE`

최종 Stop:
1. `seongsan_ilchulbong` — CORE
2. `gimnyeong_beach` — CORE
3. `hyeopjae_beach` — OPTIONAL_EXTENSION

Planner decision:
- 기존 초안의 제주목관아는 v1에서 제거.
- Phase E에서 이미 검증된 canonical location + Scene asset을 재사용.
- 성산→김녕→협재를 `짧은 최적 코스`라고 하지 않고 **제주 동→서 하루 팬 코스**로 설명.
- 일정이 빠듯하면 성산+김녕 East Core에서 종료 가능.

### F3 Byakuyako — pilgrimage
**형태:** `LAYERED_PILGRIMAGE`

Segment A — 원작 STORY SETTING / Osaka Fuse:
1. `by_fuse_station`
2. `by_fuse_honodori`

Segment B — 2006 TBS ADAPTATION FILMING / Ibaraki:
1. `by_mitsukaido_station`

Planner decision:
- Osaka 원작 무대와 Ibaraki 영상 촬영지를 하루 코스로 합치지 않음.
- Fuse 두 장소는 촬영지로 표기 금지.
- Kita-Mitsukaido도 공식 촬영 사용이 확인되지만 v1에서는 새 canonical row를 늘리지 않고 보조 정보로만 언급.
- `by_mitsukaido_station`은 Issue #40의 planner-approved source patch 완료 후 재사용.

## 3. UI / page structure
공용 renderer가 다음을 지원한다.
1. Hero — 검색형 제목, 요약, 시간/이동 성격
2. Before You Go
3. Route/Segment map
4. Stop cards
   - Stop 번호
   - Scene asset
   - Place 또는 Map link
   - 작품에서의 의미
   - Why This Stop
   - 방문 주의사항
   - 다음 이동 힌트
5. Related Work / Place / Map

`LAYERED_PILGRIMAGE`는 segment header와 STORY_SETTING / ADAPTATION_FILMING 구분이 필수다.

## 4. URL 원칙
Planner slug 후보는 READY manifest에 있다.
- `/guides/breaking-bad-albuquerque/`
- `/guides/poksshak-jeju/`
- `/ja/guides/byakuya-pilgrimage/`

이 3개만 파일럿 후보로 승인한다. 현재 router/generator에 작은 추가로 구현 가능할 때 사용한다.

**새 전역 URL architecture나 대규모 router migration이 필요하면 임의 구현하지 말고 `NEEDS DECISION`.**
기존 Work/Place URL은 변경하지 않는다.

## 5. Asset 원칙
Guide 전용 이미지를 새로 찾거나 만들지 않는다.
Phase E의 planner-owned original SVG를 그대로 재사용한다.

- `site/assets/scenes/breakingbad/`
- `site/assets/scenes/poksshak/`
- `site/assets/scenes/byakuya/`

이미지 source/license gate는 planner-cleared 상태다.

## 6. v1에서 하지 않는 것
- 실시간 경로 최적화
- 실시간 교통 API
- 예약/결제
- 로그인
- 사용자 저장
- 리뷰/평점
- Guide 자동 대량 생성
- 개인 주택 방문 추천

## 7. SEO 원칙
- Guide와 Work의 검색의도를 분리한다.
- Work title/H1 변경 금지.
- Guide → Work/Place/Map은 crawlable link.
- thin map-only page 금지.
- 생성된 Guide만 sitemap/canonical/hreflang에 반영.
- 번역 package가 없는 locale에는 silent fallback Guide를 만들지 않는다.

## 8. 개발 공수 최소화
세 Guide를 각각 별도 HTML로 만들지 않는다.

`GUIDE_PACKAGES_READY_V1.yaml → common renderer/generator → 3 generated guides`

이후 Guide 추가는 planner package 추가 중심으로 처리할 수 있어야 한다.

## 9. Development sequence gate
Planner prep은 완료됐다. 개발 시작은 아래 순서만 남았다.
1. Issue #37 繁中 Pilot 완료
2. Issue #40 Story & Scene 완료
3. Issue #41 PM/user release

#40의 Scene asset과 `by_mitsukaido_station` source patch를 재사용하므로 #40보다 먼저 #41을 구현하지 않는다.

## 10. Done
- 3/3 Guide Package 렌더링
- canonical stop mapping 100%
- wrong FILMED/STORY label 0
- broken asset/link 0
- private residence direct promotion 0
- 360/390/430 mobile QA
- canonical/hreflang/sitemap/GA4 regression pass
- PR + QA report + local deployment ZIP
- 운영 배포는 사용자 승인 전 금지

## 11. NEEDS DECISION
- 새 global URL architecture 필요
- paid/realtime routing API 필요
- high-ranking existing URL 변경 필요
- large shared data-model migration 필요
- planner manifest와 canonical source가 충돌

그 외 공용 template/CSS/generator 연결은 Fast Lane으로 진행한다.
