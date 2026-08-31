# Phase E — Scene Package Research 15 v1

Date: 2026-08-31
Status: **CONTENT RESEARCH COMPLETE / ASSET PREP NEXT / NOT YET READY FOR DEV RENDERING**
Parent: Issue #40

## 0. 이번 문서의 결론

5작품 × 3개, 총 15개 Scene/Story Package 후보를 실제 출처와 현재 repo 구조에 맞춰 고정한다.

- `Odyssey`: 3개 — 실제 촬영 장면/장소
- `Breaking Bad`: 3개 — 실제 촬영 장면/장소
- `Byakuyako`: 2개 소설 무대 + 1개 TBS 영상판 촬영지
- `Stranger Things`: 3개 — 실제 촬영 장면/장소
- `폭싹 속았수다`: 3개 — 제주 공식 관광기관이 연결한 촬영/에피소드 장소

중요한 수정: **백야행을 억지로 영상 장면 3개로 만들지 않는다.** `STORY_SETTING`과 `ADAPTATION_FILMING`을 분리한다.

현재 목표는 “15개를 READY라고 선언”하는 것이 아니다. 사실/이미지/Place 연결이 모두 준비된 것만 READY가 된다.

---

# 1. Odyssey — 3 packages

## O1. `odyssey-scene-01`
- context: `SCREEN_SCENE`
- place_id: `nestors_cave`
- relationship: `FILMED`
- 제목안: **동굴 안에서 마주친 키클롭스**
- 설명안: 영화의 키클롭스/폴리페모스 시퀀스가 그리스 메세니아의 네스토르 동굴에서 촬영됐다. 화면 속 신화의 동굴이 실제로는 보이도킬리아 만 위 절벽에 붙어 있다.
- Why This Place?: **영화 장면 하나 보고 찾아갔다가 풍경에 한 번 더 놀라는 곳이다. 동굴 자체보다 입구에서 내려다보는 보이도킬리아의 곡선이 더 비현실적으로 보인다. ‘세트겠지’ 싶었던 공간이 실제 지형이라는 게 이 장소의 재미다.**
- fact source: Condé Nast Traveler, `Where Was The Odyssey Filmed?`
  - https://www.cntraveler.com/story/where-was-the-odyssey-filmed-the-locations-christopher-nolans-greek-epic-brings-to-life
- image candidate: Wikimedia Commons `Nestors cave.jpg`
  - https://commons.wikimedia.org/wiki/File:Nestors_cave.jpg
  - license: CC BY-SA 3.0
- status: `ASSET_SOURCE_VERIFIED`
- gate: PR #36 이후 해당 Place URL 보존 여부 최종 확인

## O2. `odyssey-scene-02`
- context: `SCREEN_SCENE`
- place_id: `voidokilia_beach`
- relationship: `FILMED`
- 제목안: **신화의 바다가 현실이 되는 보이도킬리아**
- 설명안: 보이도킬리아 해변은 《오디세이》의 그리스 해안 시퀀스에 쓰인 실제 촬영지다. 거의 완벽한 Ω 모양의 만이 CG보다 더 영화 같은 배경을 만든다.
- Why This Place?: **위에서 보면 해변이 거의 기호처럼 휘어 있다. 네스토르 동굴과 한 동선으로 이어져서 ‘장면 하나’가 아니라 영화의 공간 전체를 걷는 느낌을 만들기 좋다. Odyssey 장소 중 실제 여행으로 연결하기 가장 좋은 축 중 하나다.**
- fact source: Condé Nast Traveler 위 기사 + 현재 repo location source
- image candidate: Wikimedia Commons `Voidokilia.jpg`
  - https://commons.wikimedia.org/wiki/File:Voidokilia.jpg
  - license: CC BY-SA 3.0 또는 GFDL 중 CC BY-SA 3.0 선택
- status: `ASSET_SOURCE_VERIFIED`
- gate: 기존 고순위 Place URL 유지

## O3. `odyssey-scene-03`
- context: `SCREEN_SCENE`
- place_id: `favignana_castle`
- relationship: `FILMED`
- 제목안: **이타카 왕궁은 시칠리아 섬 정상에 있었다**
- 설명안: 이타카 왕궁 외경은 이탈리아 파비냐나 섬 정상의 산타 카테리나 성채에서 촬영됐다. 영화 속 고대 왕궁과 실제 버려진 성채가 겹치는 장소다.
- Why This Place?: **화면에서는 왕궁인데 실제로 가면 바다 한가운데 산 정상의 오래된 요새다. 섬 항구에서 바로 닿는 관광지가 아니라 올라가야 한다는 점까지 영화의 고립감과 묘하게 어울린다. ‘영화 세트’와 ‘실제 장소의 시간’이 가장 크게 충돌하는 곳이다.**
- fact source: Condé Nast Traveler 위 기사 + `site/contentmap_odyssey_locations.js`
- image candidate: Wikimedia Commons `Favignana Castle.jpg`
  - https://commons.wikimedia.org/wiki/File:Favignana_Castle.jpg
  - license: CC BY-SA 3.0
- status: `ASSET_SOURCE_VERIFIED`

---

# 2. Breaking Bad — 3 packages

공통 fact source: Visit Albuquerque, `Breaking Bad Filming Locations You Can Visit`
https://www.visitalbuquerque.org/abq365/blog/post/breaking-bad-filming-locations-you-can-visit/

## B1. `breakingbad-scene-01`
- context: `SCREEN_SCENE`
- place_id: `lospollos`
- relationship: `FILMED`
- 제목안: **월터가 처음 거스를 만난 치킨집**
- 설명안: 극중 Los Pollos Hermanos의 원조 촬영지는 앨버커키의 실제 식당 Twisters다. Visit Albuquerque도 이곳을 월터가 처음 거스를 만난 장소로 안내한다.
- Why This Place?: **간판은 Twisters인데 팬 눈에는 바로 Los Pollos Hermanos로 보인다. 세트가 철거된 장소가 아니라 지금도 실제 식당으로 기능한다는 게 포인트다. 작품 속 세계와 현재의 앨버커키가 가장 자연스럽게 겹치는 장소 중 하나다.**
- image candidate: Wikimedia Commons `Twisters, Isleta Blvd, South Valley NM.jpg`
  - https://commons.wikimedia.org/wiki/File:Twisters,_Isleta_Blvd,_South_Valley_NM.jpg
  - license: CC BY-SA 3.0, John Phelan
- status: `ASSET_SOURCE_VERIFIED`

## B2. `breakingbad-scene-02`
- context: `SCREEN_SCENE`
- place_id: `carwash`
- relationship: `FILMED`
- 제목안: **돈세탁 사업장이 된 A1 세차장**
- 설명안: 월터와 스카일러가 돈세탁을 위해 사들이는 A1A/A1 Car Wash는 앨버커키의 실제 세차장에서 촬영됐다. 지금은 Mister Car Wash로 운영되는 장소다.
- Why This Place?: **엄청난 사건이 벌어진 장소보다 오히려 평범한 세차장이라 더 《Breaking Bad》답다. 범죄의 돈이 일상적인 사업장으로 숨어드는 설정이 실제 장소의 평범함과 붙는다. 차를 타고 지나가다 보면 ‘저기가 그곳이라고?’ 싶은 재미가 있다.**
- image candidate: Wikimedia Commons `Breaking Bad car wash.jpg`
  - https://commons.wikimedia.org/wiki/File:Breaking_Bad_car_wash.jpg
  - license: CC BY-SA 2.0, Anna Irene
- status: `ASSET_SOURCE_VERIFIED`

## B3. `breakingbad-scene-03`
- context: `SCREEN_SCENE`
- place_id: `tuco_office`
- relationship: `FILMED`
- 제목안: **월터가 투코의 사무실을 날려버린 곳**
- 설명안: 투코의 본거지로 등장한 건물은 실제 Java Joe’s다. Visit Albuquerque는 제시가 두들겨 맞은 뒤 월터가 찾아와 투코의 사무실을 폭파하는 장면의 장소로 소개한다.
- Why This Place?: **시리즈 초반 ‘평범한 화학 선생’ 월터가 돌아올 수 없는 선을 넘는 장면을 실제 카페 건물이 품고 있다. 지금의 외관은 놀랄 만큼 평범해서 오히려 장면 기억이 더 세게 튀어나온다.**
- image candidate: Wikimedia Commons `Breaking Bad Locations (17351493198).jpg`
  - https://commons.wikimedia.org/wiki/File:Breaking_Bad_Locations_(17351493198).jpg
  - license: CC BY-SA 2.0, Anna Irene
- status: `ASSET_SOURCE_VERIFIED`

---

# 3. Byakuyako / 백야행 — 3 packages

기준 문서: `docs/growth/batch2/BYAKUYA_RESEARCH_V1.md`

## Y1. `byakuya-scene-01`
- context: `STORY_SETTING`
- place_id: `by_fuse_station`
- relationship: `STORY-RELATED`
- 제목안: **백야행의 출발점, 오사카 후세**
- 설명안: 후세는 소설 《백야행》의 핵심 무대로 연결되는 실제 오사카 동네다. 이 package는 **영상 촬영 장면이 아니라 원작의 무대**로 소개한다.
- Why This Place?: **백야행을 따라가다 보면 화려한 관광지보다 평범한 역과 상점가가 더 작품답게 느껴진다. 사건과 두 사람의 시간이 시작되는 도시의 질감을 실제로 상상할 수 있는 출발점이다.**
- fact source: current repo Byakuya research/location source; adaptation filming과 분리
- image plan: `Fuse Station`의 권리 단순한 최신 CC 이미지를 추가 조사하거나 original/generated illustration 사용
- status: `RESEARCHED`
- reason not READY: 현재 확인된 대표 역 사진 중 GFDL-only 자산은 v1 asset workflow에서 우선 사용하지 않음

## Y2. `byakuya-scene-02`
- context: `STORY_SETTING`
- place_id: `by_fuse_honodori`
- relationship: `STORY-RELATED`
- 제목안: **료지와 유키호의 시간이 겹쳐지는 후세 상점가**
- 설명안: 후세 혼마치 상점가는 작품의 오사카 생활권을 실제 거리로 느끼게 해주는 장소다. ‘촬영지’가 아니라 **소설 속 무대를 걷는 성지순례**라는 맥락으로 노출한다.
- Why This Place?: **작품 속 가게나 사건을 그대로 찾는 장소가 아니다. 대신 오래된 상점가의 길이와 생활감이 ‘백야행의 오사카’를 상상하게 한다. 일본 검색에서 `舞台`·`聖地巡礼` 의도에 답하기 좋은 장소다.**
- image candidate: Wikimedia Commons `Fuse Honmachi Shopping Street.jpg`
  - https://commons.wikimedia.org/wiki/File:Fuse_Honmachi_Shopping_Street.jpg
  - license: CC BY 4.0, Suikotei
- status: `ASSET_SOURCE_VERIFIED`

## Y3. `byakuya-scene-03`
- context: `ADAPTATION_FILMING`
- place_id: null
- proposed_place_id: `by_mitsukaido_station`
- relationship: `FILMED`
- 제목안: **TBS 드라마판은 여기서 실제로 찍혔다**
- 설명안: 2006년 TBS 드라마 《白夜行》는 이바라키현 조소시의 미쓰카이도역·기타미쓰카이도역에서 촬영됐다. 원작의 오사카 무대와 영상판 촬영지는 별도 층으로 보여준다.
- Why This Place?: **‘소설의 무대’와 ‘드라마를 찍은 곳’이 다르다는 걸 한 번에 보여주는 좋은 사례다. 백야행 페이지의 신뢰도를 높이면서, 팬에게는 원작 성지순례와 영상판 로케 순례라는 두 가지 여행법을 열어준다.**
- fact source: Ibaraki Film Commission official
  - https://www.ibarakiguide.jp/ibaraki-fc/support.php?code=406&mode=detail
- image candidate: Wikimedia Commons `Mitsukaido Station building 2016 10 16.jpg`
  - https://commons.wikimedia.org/wiki/File:Mitsukaido_Station_building_2016_10_16.jpg
  - license: CC BY 4.0, Nesnad
- status: `PLACE_REQUIRED`
- gate: canonical Place 생성/URL은 developer가 임의 결정하지 말고 기존 generator 정책에 맞춰 PM 확인

---

# 4. Stranger Things — 3 packages

## S1. `strangerthings-scene-01`
- context: `SCREEN_SCENE`
- place_id: `hawkinslab`
- relationship: `FILMED`
- 제목안: **모든 게 시작된 호킨스 연구소**
- 설명안: 호킨스 연구소 장면은 애틀랜타의 Emory University Briarcliff Campus에 있던 옛 정신병원 건물에서 촬영됐다. Eleven의 기억과 실험, Upside Down의 시작점이 반복해서 이 공간으로 돌아온다.
- Why This Place?: **화려한 관광지가 아니라 실제로도 낡은 기관 건물이어서 호킨스 연구소의 불길한 분위기가 거의 설명 없이 만들어진다. 장소 하나가 시즌 전체의 기억을 계속 끌고 가는 사례라 Scene Context의 대표 샘플로 좋다.**
- fact source: Netflix Tudum / About Netflix
  - https://www.netflix.com/tudum/articles/stranger-things-5-fun-facts
  - https://about.netflix.com/en/news/made-in-america-how-stranger-things-electrified-the-us-economy
- image candidate: Wikimedia Commons `“Hawkins National Labs”…Briarcliff campus.jpg`
  - https://commons.wikimedia.org/wiki/File:%E2%80%9CHawkins_National_Labs%E2%80%9D_also_known_as_Emory_University%E2%80%99s_briarcliff_campus._(28903314358).jpg
  - license: CC BY 2.0, Counse
- status: `ASSET_SOURCE_VERIFIED`

## S2. `strangerthings-scene-02`
- context: `SCREEN_SCENE`
- place_id: `gwinnettmall`
- relationship: `FILMED`
- 제목안: **여름의 중심이었던 스타코트 몰**
- 설명안: 시즌 3의 Starcourt Mall은 조지아 Duluth의 Gwinnett Place Mall을 활용해 만들어졌다. 친구들이 모이는 1980년대 쇼핑몰이면서 시즌 후반의 거대한 전투 무대다.
- Why This Place?: **시즌 3를 기억하는 사람에게는 쇼핑몰 간판 하나만 봐도 Scoops Ahoy와 마지막 전투가 같이 떠오른다. 실제 미국 쇼핑몰이 1980년대 호킨스로 변한 과정을 보여주기 좋아, ‘장면→장소’라는 Phase E 취지가 가장 직관적인 곳이다.**
- fact source: Netflix Tudum Starcourt/Season 4 location context + existing repo location source
  - https://www.netflix.com/tudum/videos/everything-you-can-do-at-starcourt-mall-in-stranger-things
- image candidate: Wikimedia Commons `Gwinnett Place Mall.jpg`
  - https://commons.wikimedia.org/wiki/File:Gwinnett_Place_Mall.jpg
  - license: CC BY-SA 2.0, Mike Kalasnik
- status: `ASSET_SOURCE_VERIFIED`

## S3. `strangerthings-scene-03`
- context: `SCREEN_SCENE`
- place_id: `creelhouse`
- relationship: `FILMED`
- 제목안: **Vecna의 비밀이 숨은 Creel House**
- 설명안: 시즌 4의 핵심 미스터리인 Creel House는 미국 조지아 Rome의 실제 Claremont House에서 촬영됐다. Netflix 제작진은 독특하고 위압적인 수직 구조와 다락 때문에 이 집을 선택했다고 설명한다.
- Why This Place?: **실제 집인데도 미술팀이 처음 봤을 때부터 이미 공포영화 세트처럼 보였다는 장소다. 다만 현재 사유지이므로 ‘방문 인증’ 대상으로 밀지 않고, 공공 보도에서 외관을 존중해 보는 수준으로 안내해야 한다.**
- fact source: Netflix Tudum
  - https://www.netflix.com/tudum/articles/stranger-things-season-4-easter-eggs
- image candidate: Wikimedia Commons `The Claremont House.jpg`
  - https://commons.wikimedia.org/wiki/File:The_Claremont_House.jpg
  - license: CC BY-SA 4.0, JumboCow
- status: `ASSET_SOURCE_VERIFIED`
- travel/safety note: private property — trespass 유도 금지

---

# 5. 폭싹 속았수다 — 3 packages

공통 primary source: Visit Jeju `폭싹 속았수다와 함께 하는 제주 여행`
https://www.visitjeju.net/kr/themtour/view?contentsid=CNTS_300000000013461

보조 source: 제주관광공사 보도자료 — 주요 촬영 스팟으로 제주목 관아, 김녕 해변, 성읍민속마을, 성산일출봉 명시.

현재 repo 중요 문제: `site/places/`에서 poksshak Place Detail이 확인되지 않는다. 따라서 아래 3개는 콘텐츠 연구는 완료됐지만 우선 `PLACE_REQUIRED`다.

## P1. `poksshak-scene-01`
- context: `SCREEN_SCENE`
- place_id: null
- proposed_place_id: `poksshak-seongsan_ilchulbong`
- relationship: `FILMED`
- 제목안: **어린 애순과 관식의 제주, 성산일출봉**
- 설명안: Visit Jeju는 2화와 연결해 어린 애순과 관식의 제주 장면에 성산일출봉이 자주 등장한다고 소개한다. 허구의 ‘6시 내고향’ 유채꽃 축제 장면도 이 성산 풍경과 이어진다.
- Why This Place?: **성산일출봉은 작품을 몰라도 제주를 상징하는 장소지만, 폭싹을 보고 나면 풍경에 두 사람의 어린 시절이 겹쳐 보인다. ‘드라마 때문에 찾아갔는데 결국 제주 자체가 기억에 남는’ 장소라 첫 Scene Card로 좋다.**
- image candidate: Wikimedia Commons `Seongsan Ilchulbong.jpg`
  - https://commons.wikimedia.org/wiki/File:Seongsan_Ilchulbong.jpg
  - Creative Commons licensed; 최종 정확한 version/attribution을 asset commit 시 기록
- status: `PLACE_REQUIRED`
- note: 현재 generated work HTML의 다른 장면 설명을 그대로 재사용하지 말 것. Visit Jeju의 episode-linked 설명을 기준으로 다시 쓴다.

## P2. `poksshak-scene-02`
- context: `SCREEN_SCENE`
- place_id: null
- proposed_place_id: `poksshak-gimnyeong`
- relationship: `FILMED`
- 제목안: **해녀의 바다와 어린 시절이 겹치는 김녕**
- 설명안: Visit Jeju는 김녕어촌을 1·3화와 연결하며, 김녕의 바다와 해녀 풍경, 어린 애순·관식의 장면을 따라가는 장소로 소개한다. 제주관광공사도 김녕 해변을 주요 촬영 스팟으로 명시했다.
- Why This Place?: **폭싹에서 바다는 배경이 아니라 생활 그 자체다. 김녕에서는 에메랄드빛 바다만 보는 게 아니라 작품이 보여준 해녀와 마을의 생활감을 같이 떠올릴 수 있다. 성산과 다른, 조금 더 생활에 가까운 제주다.**
- image candidate: Wikimedia Commons `Jejuolle Route 20.jpg`
  - https://commons.wikimedia.org/wiki/File:Jejuolle_Route_20.jpg
  - Route 20가 Gimnyeong Beach를 지나는 사진, Jeju Olle Foundation
- status: `PLACE_REQUIRED`
- asset note: 정확한 촬영 포인트를 찍은 사진으로 오해하지 않도록 alt/caption에 `김녕 해안/올레길`이라고 표현. 더 정확한 CC asset 발견 시 교체 우선.

## P3. `poksshak-scene-03`
- context: `SCREEN_SCENE`
- place_id: null
- proposed_place_id: `poksshak-jejumok_gwana`
- relationship: `FILMED`
- 제목안: **애순의 시간이 다시 돌아오는 제주목 관아**
- 설명안: Visit Jeju는 제주목 관아를 8화와 연결한다. 애순과 관식의 글짓기 장면과, 시간이 흐른 뒤 애순이 어머니를 떠올리며 다시 찾는 기억의 장소로 소개된다.
- Why This Place?: **같은 장소가 젊은 시절과 나중의 기억을 동시에 품는다는 점이 좋다. 드라마를 본 뒤 실제 공간에 서면 건물보다 ‘시간이 다시 겹치는 느낌’이 먼저 오는 장소다. 관덕정과 제주목 관아 자체의 역사까지 이어갈 수 있어 숨은 이야기 확장성도 높다.**
- image candidate: Wikimedia Commons `Gwandeokjeong Pavilion and Jeju Mok Office.JPG`
  - https://commons.wikimedia.org/wiki/File:Gwandeokjeong_Pavilion_and_Jeju_Mok_Office.JPG
  - license: CC BY-SA 3.0, Thddbwnd
- status: `PLACE_REQUIRED`

---

# 6. 현재 준비도

| 작품 | 후보 확정 | fact source | image source | Place gate | 현재 상태 |
|---|---:|---:|---:|---:|---|
| Odyssey | 3/3 | 완료 | 3/3 검증 | PR #36 보존 확인 | ASSET_SOURCE_VERIFIED |
| Breaking Bad | 3/3 | 완료 | 3/3 검증 | 기존 IDs | ASSET_SOURCE_VERIFIED |
| Byakuyako | 3/3 | 완료 | 2개 사용안 확정, 1개 추가 필요 | Mitsukaido 신규 Place 필요 | MIXED |
| Stranger Things | 3/3 | 완료 | 3/3 검증 | 기존 IDs | ASSET_SOURCE_VERIFIED |
| 폭싹 속았수다 | 3/3 | 완료 | 3개 후보 | Place Detail 3개 필요 | PLACE_REQUIRED |

**READY: 0/15** — 정상이다. READY는 실제 WebP가 repo에 들어가고 canonical Place까지 연결된 뒤 선언한다.

---

# 7. 다음 기획자 작업

1. 위 이미지 원본을 내려받아 라이선스/저자/변경 여부 최종 기록
2. `site/assets/scenes/<work>/`에 WebP 최적화본 준비
3. 16:9 crop 시 장소 핵심 요소 훼손 여부 확인
4. Byakuya Y1 이미지: CC 조건이 단순한 Fuse Station asset 추가 확보 또는 original/generated illustration 제작
5. Odyssey Place URL rescue 결과 반영
6. Poksshak 3개 canonical Place 생성 가능 여부를 developer source audit 결과와 맞춤
7. 모든 조건 충족 package만 `READY`

## 개발자에게 아직 하지 말라고 할 것
- Scene UI 선개발 후 내용 끼워 맞추기
- Netflix/영화 스크린샷 검색·복사
- `PLACE_REQUIRED`를 위해 임의 URL 생성
- STORY_SETTING을 FILMED로 변환
- READY 전 운영 노출
