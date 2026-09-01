# Phase E — Scene ↔ Canonical Location Mapping v1

Date: 2026-09-01
Status: **PLANNER APPROVED — IMPLEMENTATION INPUT**
Parent: Issue #40

## 결론

개발자2가 지적한 `place_id` 문제를 현재 `main`의 canonical source 기준으로 다시 대조했다.

Phase E v1에서는 **Scene Package가 반드시 SEO Place 페이지를 가져야 한다고 강제하지 않는다.** 현재 `generate_place_pages.js`는 `tier=official|experience`만 Place SEO 페이지로 생성하고 STORY SETTING은 의도적으로 제외하기 때문이다.

따라서 링크 방식을 세 가지로 고정한다.

- `MAP_OR_PLACE` — canonical location source가 있고 실제 촬영/체험 장소다. 해당 Place SEO 페이지가 현재 존재하면 Place로, 없으면 기존 `?work=<work>&loc=<id>` Map state로 연결한다. Phase E 때문에 새 Place URL을 억지로 만들지 않는다.
- `MAP_STATE` — canonical location source는 있으나 STORY SETTING이다. Map state로만 연결하며 촬영지 Place SEO 페이지로 승격하지 않는다.
- `ADD_LOCATION_THEN_MAP_OR_PLACE` — 기획에서 검증한 실제 영상판 촬영지인데 canonical source row가 아직 없다. 아래 확정 데이터로 canonical source에 1개 row를 추가한 뒤 기존 generator 정책을 따른다.

## 최종 15개 매핑

| Scene | Work | canonical location id | Source | Context | Relation | Link mode |
|---|---|---|---|---|---|---|
| odyssey-scene-01 | odyssey | `nestors_cave` | `site/contentmap_odyssey_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| odyssey-scene-02 | odyssey | `voidokilia_beach` | `site/contentmap_odyssey_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| odyssey-scene-03 | odyssey | `favignana_castle` | `site/contentmap_odyssey_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| breakingbad-scene-01 | breakingbad | `lospollos` | `site/contentmap_breakingbad_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| breakingbad-scene-02 | breakingbad | `carwash` | `site/contentmap_breakingbad_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| breakingbad-scene-03 | breakingbad | `tuco_office` | `site/contentmap_breakingbad_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| byakuya-scene-01 | byakuya | `by_fuse_station` | `site/contentmap_byakuya_locations.js` | STORY_SETTING | STORY-RELATED | MAP_STATE |
| byakuya-scene-02 | byakuya | `by_fuse_honodori` | `site/contentmap_byakuya_locations.js` | STORY_SETTING | STORY-RELATED | MAP_STATE |
| byakuya-scene-03 | byakuya | `by_mitsukaido_station` | **planner-approved new row below** | ADAPTATION_FILMING | FILMED | ADD_LOCATION_THEN_MAP_OR_PLACE |
| strangerthings-scene-01 | strangerthings | `creelhouse` | `site/contentmap_strangerthings_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| strangerthings-scene-02 | strangerthings | `hawkinslab` | `site/contentmap_strangerthings_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| strangerthings-scene-03 | strangerthings | `gwinnettmall` | `site/contentmap_strangerthings_locations.js` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| poksshak-scene-01 | poksshak | `seongsan_ilchulbong` | `site/contentmap_data.js` / `POKSSAK_LOCATIONS` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| poksshak-scene-02 | poksshak | `gimnyeong_beach` | `site/contentmap_data.js` / `POKSSAK_LOCATIONS` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |
| poksshak-scene-03 | poksshak | `hyeopjae_beach` | `site/contentmap_data.js` / `POKSSAK_LOCATIONS` | SCREEN_SCENE | FILMED | MAP_OR_PLACE |

## 백야행 영상판 신규 canonical location — 기획 확정

`byakuya-scene-03`만 canonical source에 새 location row가 필요하다. 이것은 새로운 URL 아키텍처가 아니라 기존 Byakuyako location array에 검증된 실제 촬영지 1건을 추가하는 콘텐츠 작업이다.

확정 데이터:

```yaml
id: by_mitsukaido_station
modernName: "미쓰카이도역 (水海道駅), 이바라키현 조소시"
lat: 36.01782
lng: 139.991395
context: "2006년 TBS 드라마 《白夜行》 촬영지"
relationship: FILMED
address: "〒303-0023 茨城県常総市水海道宝町2861-2"
fact_source: "https://www.ibarakiguide.jp/ibaraki-fc/support.php?code=406&mode=detail"
operator_source: "https://www.kantetsu.co.jp/train/mitsukaido"
coordinate_source: "Wikidata Q6883271 / GeoNames"
```

이바라키 필름커미션은 TBS 《白夜行》의 촬영지로 `水海道駅・北水海道駅`을 공식 명시한다. v1 Scene Package는 **水海道駅 하나만 대표 노드**로 사용한다.

개발자는 이 데이터를 바꾸거나 다른 역을 임의 추가하지 않는다.

## Place Detail 노출 규칙

1. `MAP_OR_PLACE`
   - 현재 generator가 Place SEO 페이지를 생성하는 경우 Scene/Why block을 그 Place Detail에도 붙인다.
   - 현재 생성 대상이 아니라면 Phase E만을 위해 tier/URL을 변경하지 말고 Work Scene Card → Map state로 연결한다.

2. `MAP_STATE`
   - Work Scene Card에서 Map state로 연결.
   - `STORY_SETTING`을 실제 촬영지 Place SEO 페이지로 만들지 않는다.

3. `ADD_LOCATION_THEN_MAP_OR_PLACE`
   - 위 planner-approved row를 canonical source에 추가한다.
   - 이후 Place page 생성 여부는 기존 `generate_place_pages.js` 정책을 그대로 따른다.

## URL 규칙

- Scene 전용 URL 생성 금지.
- 기존 Work/Place URL 변경 금지.
- 기존 Place slug 규칙은 generator가 관리한다.
- Scene manifest가 URL architecture를 소유하지 않는다.

## 개발자 판단이 필요 없는 것

- 15개 Scene의 location id는 위 표가 최종값이다.
- 백야행 STORY_SETTING 2건을 촬영지로 승격하지 않는다.
- 백야행 영상판 촬영지 대표역은 `水海道駅`으로 확정한다.
- Phase E 때문에 새 Place SEO URL을 대량 만들지 않는다.
