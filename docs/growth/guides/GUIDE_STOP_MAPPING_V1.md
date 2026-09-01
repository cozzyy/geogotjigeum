# Phase F — Guide Stop ↔ Canonical Location Mapping v1

Date: 2026-09-01
Status: **PLANNER APPROVED — IMPLEMENTATION INPUT**
Parent: Issue #41

## 결론
Phase F v1은 **기존 canonical location과 Phase E asset을 최대한 재사용**한다. Guide를 만들기 위해 새 촬영지 Place를 대량 추가하지 않는다.

개발자가 구현할 canonical input은 `GUIDE_PACKAGES_READY_V1.yaml`이며, 이 문서는 mapping 검증표다.

## F1 Breaking Bad — Albuquerque
| Order | Stop | canonical ID | Source | Relation | Asset | Link |
|---|---|---|---|---|---|---|
| 1 | Twisters / Los Pollos Hermanos | `lospollos` | `site/contentmap_breakingbad_locations.js` | FILMED | `breakingbad-scene-01.svg` | MAP_OR_PLACE |
| 2 | Java Joe's / Tuco HQ | `tuco_office` | same | FILMED | `breakingbad-scene-03.svg` | MAP_OR_PLACE |
| 3 | A1A / current car wash | `carwash` | same | FILMED | `breakingbad-scene-02.svg` | MAP_OR_PLACE |

### Planner decision
- `walterwhite_house`는 canonical source에 존재하지만 **Guide 핵심 Stop에서 제외**한다. 개인 주택 방문을 제품이 적극 유도하지 않기 위해서다.
- 현재 상태 검증(2026-09-01): Twisters Isleta, Java Joe's, 9516 Snow Heights의 car wash가 영업 중인 것으로 확인. 운영시간은 페이지에 고정하지 않고 외부 current-status source만 제공한다.

## F2 Poksshak — Jeju
| Order | Stop | canonical ID | Source | Relation | Role | Asset | Link |
|---|---|---|---|---|---|---|---|
| 1 | 성산일출봉 | `seongsan_ilchulbong` | `site/contentmap_data.js#POKSSAK_LOCATIONS` | FILMED | CORE | `poksshak-scene-01.svg` | MAP_OR_PLACE |
| 2 | 김녕 바다 | `gimnyeong_beach` | same | FILMED | CORE | `poksshak-scene-02.svg` | MAP_OR_PLACE |
| 3 | 협재해수욕장 | `hyeopjae_beach` | same | FILMED | OPTIONAL_EXTENSION | `poksshak-scene-03.svg` | MAP_OR_PLACE |

### Planner decision
기존 초안의 `제주목관아`는 v1 Stop에서 제거한다. 이유는:
1. Phase E에서 이미 검증/준비된 Scene + canonical location을 재사용하는 것이 개발공수와 사실검증 비용이 가장 낮다.
2. 성산→김녕은 East Core로 묶고, 협재는 서쪽 장거리 연장 Stop으로 명확히 표시한다.
3. 페이지에서 `짧은 최적 코스`라고 부르지 않는다. `제주 동→서 하루 팬 코스`이며 일정이 빠듯하면 협재를 생략하도록 안내한다.

## F3 Byakuyako — pilgrimage layers
### Segment A: STORY SETTING / Osaka Fuse
| Order | Stop | canonical ID | Source | Relation | Asset | Link |
|---|---|---|---|---|---|---|
| 1 | Fuse Station | `by_fuse_station` | `site/contentmap_byakuya_locations.js` | STORY-RELATED | `byakuya-scene-01.svg` | MAP_STATE |
| 2 | Fuse Hondori | `by_fuse_honodori` | same | STORY-RELATED | `byakuya-scene-02.svg` | MAP_STATE |

### Segment B: ADAPTATION FILMING / Ibaraki
| Order | Stop | canonical ID | Source | Relation | Asset | Link |
|---|---|---|---|---|---|---|
| 1 | Mitsukaido Station | `by_mitsukaido_station` | `site/contentmap_byakuya_locations.js` **after Issue #40 approved source patch** | FILMED | `byakuya-scene-03.svg` | MAP_OR_PLACE |

### Planner decision
- Osaka/Fuse와 Ibaraki/Mitsukaido를 **하루 이동 코스로 합치지 않는다.** 서로 다른 지역이자 서로 다른 의미의 장소이므로 두 segment로 분리한다.
- `by_fuse_station`, `by_fuse_honodori`를 촬영지라고 표기하면 안 된다.
- Ibaraki Film Commission 자료에는 Kita-Mitsukaido Station 사용도 확인되지만, Phase F v1에서는 새 canonical row를 하나 더 만들지 않는다. 보조 문구로만 언급한다.
- `by_mitsukaido_station`은 Issue #40에서 이미 planner-approved source action이 정의되어 있으므로 #40 완료 이후 #41에서는 해당 canonical row를 재사용한다.

## Asset policy
Guide 전용 이미지를 새로 만들지 않는다.
- `site/assets/scenes/breakingbad/`
- `site/assets/scenes/poksshak/`
- `site/assets/scenes/byakuya/`
의 Phase E original editorial SVG를 재사용한다.

따라서 Phase F v1의 image sourcing/license gate는 **이미 planner-cleared**다.

## Link policy
1. valid Place SEO page가 있으면 Place를 우선할 수 있다.
2. Place page가 없거나 STORY_SETTING이면 기존 Map state로 연결한다.
3. Guide 때문에 Place URL을 새로 생성하지 않는다.
4. 새 Guide URL 3개 외에 URL 수를 확장하지 않는다.
5. Guide slug 후보가 현재 router에서 작은 변경으로 처리되지 않으면 URL architecture를 임의로 재설계하지 말고 `NEEDS DECISION`.

## Current-status sources
- Breaking Bad local/current status:
  - `https://www.mytwisters.com/locations/`
  - `https://joe.coffee/locations/nm/albuquerque/java-joe-s-albuquerque/`
  - `https://albuquerque.com/explore-albuquerque-the-breaking-bad-way/`
- Poksshak / Jeju filming & visitor context:
  - `https://www.visitjeju.net/`
  - 기존 Phase E research/source notes
- Byakuyako:
  - `https://www.kintetsu.co.jp/station/`
  - `https://www.ibarakiguide.jp/ibaraki-fc/support.php?code=406&mode=detail`
  - `https://www.kantetsu.co.jp/train/mitsukaido`

## Release gate
Planner 기준으로 3/3 Guide Package의 content/stop/asset/source/mapping은 완료됐다.
**개발 시작 sequence만 남음: #37 완료 → #40 완료 → #41 PM release.**
