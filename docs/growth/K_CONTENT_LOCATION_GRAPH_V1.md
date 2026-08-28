# K-content Location Graph v1

## Status
**PLANNING — NO BACKEND MIGRATION REQUIRED FOR V1**

## 1. 목적

그곳지금의 장기 경쟁력은 작품별 독립 페이지 수가 아니라 **작품과 실제 장소 사이의 관계 데이터**다.

핵심 구조:

`작품 → 장면 → 실제 장소 → 지역 → 주변 장소`

여기에 인물/배우/문화/퀴즈를 연결한다.

## 2. V1 Node

### Work
- id
- title by locale
- media type
- release year
- platform/network when verified
- country

### Scene
- id
- workId
- short scene label
- spoiler level
- episode/time context when verified

### Character
- id
- workId
- name by locale

### Actor
- id
- canonical name
- verified profile/reference URL where available

### Place
- id
- canonical current name
- coordinates
- address/region
- visitability/current-state field only when verified

### Region
- country
- admin1 / city / locality where available

### CultureTopic (optional)
- food
- history
- custom
- architecture
- local culture

### QuizQuestion (optional)
- workId
- related place/scene IDs where relevant

## 3. V1 Edge

- `WORK_HAS_SCENE`
- `SCENE_FILMED_AT_PLACE`
- `WORK_FILMED_AT_PLACE` — derived convenience edge
- `CHARACTER_APPEARS_IN_WORK`
- `ACTOR_PORTRAYS_CHARACTER`
- `PLACE_LOCATED_IN_REGION`
- `PLACE_NEAR_PLACE` — distance-derived, not manually invented
- `WORK_RELATES_TO_CULTURE`
- `QUIZ_REFERS_TO_WORK`
- `QUIZ_REVEALS_PLACE`

## 4. 현재 코드와의 연결

V1에서는 새 DB를 만들지 않는다.

현재 자산에서 파생한다.
- `contentmap_data.js`
- `contentmap_<work>_locations.js`
- `contentmap_<work>_people.js`
- work/place/region generators
- quiz data

필요 시 generator 단계에서 `derived_location_graph.json` 같은 **파생 파일**을 만들 수 있지만, 원본 데이터는 기존 source-of-truth를 유지한다.

## 5. SEO/Internal Link 활용

### Work page
- 주요 장소 3~8개
- 같은 지역의 관련 작품
- 지역 허브
- 지도 deep link

### Place page
- 이 장소가 등장한 작품
- 같은 지역의 다른 촬영지
- 같은 작품의 다음 장소
- 지도

### Region page
- 지역별 작품
- 대표 장소
- 가까운 장소 cluster

### Actor/Character future
현재 V1에서 별도 색인 페이지를 즉시 만들 필요는 없다. 데이터 관계만 정규화하고 검색수요가 확인되면 Phase 2 SEO surface로 검토한다.

## 6. Derived page 아이디어 — Phase 2 후보

- `서울에서 촬영된 넷플릭스 작품`
- `제주 K-drama 촬영지`
- `이 배우 작품의 촬영지 모아보기`
- `같은 장소에서 촬영된 서로 다른 작품`
- `도깨비 + 미스터 션샤인 하루 코스`
- `일본에서 촬영된 한국 드라마`
- `한 작품을 따라가는 1일/2일 루트`

이 페이지들은 관계 데이터가 충분할 때 생성하며, thin/duplicate SEO page를 대량 생성하지 않는다.

## 7. 품질 규칙

- 동일 장소의 alias/번역명을 다른 장소로 중복 생성하지 않는다.
- 장면과 실제 촬영지 관계는 추정으로 연결하지 않는다.
- 배경 설정 장소와 실제 촬영 장소를 별도 필드/관계로 구분한다.
- 애니메이션·가상공간은 `inspiration/real-world analogue`를 촬영지처럼 표현하지 않는다.
- nearby는 좌표 기반 거리로 계산하고, '함께 가기 좋다'는 추천은 별도 travel logic로 취급한다.
- actor/character relation은 공식/신뢰 출처로 검증한다.

## 8. V1 성공 기준

- 상위 15개 작품에서 work→place→region→related-work 연결이 끊기지 않음
- place page에서 최소 하나 이상의 역링크가 존재
- region hub가 단순 국가 칩 목록이 아니라 실제 작품/장소 관계를 보여줌
- quiz 결과가 실제 location IDs로 연결됨
- 중복 장소/고아 place/work 비율을 측정할 수 있음

## 9. 다음 구현 후보

디자인 Phase 1이 안정된 후 별도 기술 Issue에서 다음만 검토한다.
1. graph 파생 스크립트
2. orphan/duplicate audit report
3. internal-link recommender
4. region/work/place link generator 개선

V1은 데이터모델 마이그레이션이 아니라 **기존 데이터로부터 관계를 명시적으로 활용하는 전략**이다.
