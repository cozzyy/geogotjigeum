# Phase E — Scene Package Research v1

Date: 2026-08-31
Status: **CONTENT SHORTLIST READY / ASSETS PENDING**
Parent: Issue #40

## 목적
Phase E 파일럿 5개 작품에서 작품당 3개씩 총 15개의 대표 Scene Package 후보를 확정한다.

이 문서는 개발 지시서가 아니다. **기획/콘텐츠 측이 먼저 사실관계·Place 연결·관계 분류·이미지 자산을 완성하기 위한 제작 큐**다.

원칙:
- 장면은 팬이 기억할 가능성이 높고 장소와 연결이 명확한 것을 우선한다.
- 실제 촬영 근거가 확인되지 않으면 `FILMED`를 쓰지 않는다.
- 소설 배경/영상판 촬영/테마 추천을 섞지 않는다.
- 영화·Netflix·방송사 스크린샷을 무단 복제해 repo에 넣지 않는다.
- 장소 사진 또는 장소·분위기 중심의 original/generated illustration을 쓴다.

---

## 1. Odyssey — 3 Scene Packages

### ODY-S01 — 키클롭스의 땅, 보이도킬리아와 네스토르 동굴
- 연결 Place: `odyssey-nestors_cave` + 인접 `odyssey-voidokilia_beach`
- 관계: **FILMED**
- 장면 방향: 오디세우스 일행이 거대한 자연 지형 속에서 키클롭스의 영역으로 들어가는 긴장감
- Why This Place?: 반달 모양의 보이도킬리아 해변과 절벽 위 네스토르 동굴은 영화 세트가 아니라 실제 메세니아 지형이다. 영화의 신화적 공간감과 실제 고고학·호메로스 전승이 한 장소에서 겹친다는 점이 핵심이다.
- 숨은 이야기 후보: Hellenic Film Commission은 Voidokilia Beach와 Nestor’s Cave가 실제 촬영지라고 공식 확인했고, 2026년 후속 자료에서는 이 일대가 영화에서 Cyclops의 땅으로 사용됐다고 설명한다.
- 이미지 방향: **실제 장소 풍경 사진 우선** — Voidokilia 전경 또는 Nestor’s Cave 외관. 인물/영화 프레임 불필요.
- 근거: Hellenic Film Commission (2025-02-25), Hellenic Film Commission (2026-08-05)
- 상태: `CONTENT_READY / ASSET_PENDING`

### ODY-S02 — 메넬라오스의 궁전으로 변한 메토니 성
- 연결 Place: Methoni Castle 계열 canonical Place를 source audit 후 연결
- 관계: **FILMED**
- 장면 방향: 고대 왕궁처럼 제시되는 거대한 성벽과 바다 풍경
- Why This Place?: 실제로는 중세·베네치아 계열의 요새지만 영화에서는 호메로스 세계의 궁전으로 변신한다. “실제 장소의 시대”와 “영화 속 시대”가 완전히 다르다는 반전이 재미 포인트다.
- 숨은 이야기 후보: 2026 Hellenic Film Commission 자료는 Methoni Castle이 Menelaus의 palace 역할을 했다고 설명한다.
- 이미지 방향: 성벽과 Bourtzi가 함께 보이는 실제 장소 사진.
- 근거: Hellenic Film Commission (2025, 2026), Visit Kalamata
- 상태: `CONTENT_READY / PLACE_ID_AUDIT / ASSET_PENDING`

### ODY-S03 — 실제 촬영지와 원전의 장소가 겹치는 순간
- 연결 Place: `odyssey-voidokilia_beach` 또는 Palace of Nestor 관련 canonical node를 audit 후 결정
- 관계: **STORY-RELATED** 또는 **FILMED** 중 source-of-truth 확인 후 1개로 확정
- 장면 방향: 텔레마코스/네스토르 서사와 메세니아 풍경이 연결되는 장면 맥락
- Why This Place?: 메세니아는 단순 로케이션이 아니라 『오디세이』 원전에서 텔레마코스가 네스토르를 찾아가는 필로스 지역과 직접 연결된다. 영화 촬영지와 원전의 신화 지리가 동시에 존재하는 보기 드문 사례다.
- 이미지 방향: Palace of Nestor 또는 Pylos/Messinia 풍경. 장면 재현 일러스트는 후순위.
- 근거: Hellenic Film Commission (2026), Visit Kalamata
- 상태: `RESEARCH_READY / RELATION_NEEDS_FINAL_CHECK / ASSET_PENDING`

---

## 2. Breaking Bad — 3 Scene Packages

### BB-S01 — 월터 화이트의 집
- 연결 Place: `walterwhite_house`
- 관계: **FILMED**
- 장면 방향: 월터의 평범한 가족생활과 범죄자의 삶이 계속 충돌하는 집 앞/진입로 장면들
- Why This Place?: 시리즈에서 가장 평범해 보이는 공간이 가장 불편한 상징으로 바뀐다. 지금도 실제 개인 주택이어서 팬 성지이면서 동시에 방문 예절이 특히 중요한 장소다.
- 숨은 이야기 후보: 촬영지 관광의 대표 사례이지만 실제 거주자의 사생활을 침해하면 안 되는 장소라는 점을 콘텐츠에 명시한다.
- 이미지 방향: 배우/장면 스크린샷 대신 **도로에서 본 실제 주택 외관의 사용권 명확한 사진** 또는 집 자체를 특정 프레임처럼 복제하지 않는 앨버커키 주택가 분위기 일러스트.
- 근거: repo canonical `contentmap_breakingbad_locations.js`; Albuquerque/New Mexico filming ecosystem sources
- 상태: `CONTENT_READY / ASSET_PENDING`

### BB-S02 — Los Pollos Hermanos
- 연결 Place: `lospollos`
- 관계: **FILMED**
- 장면 방향: 구스 프링이 친절한 점주와 냉혹한 범죄조직 보스를 오가는 장면
- Why This Place?: 극중 가상의 치킨 체인점이지만 실제 장소는 지금도 운영되는 Twisters다. “영화 세트”가 아니라 팬이 실제로 들어가 식사할 수 있는 촬영지라는 점이 강하다.
- 이미지 방향: Twisters 외관/간판의 라이선스 명확한 사진 또는 건물·뉴멕시코 패스트푸드점 분위기 중심 illustration.
- 근거: repo canonical `lospollos` data; local Albuquerque tourism/film sources로 배포 전 재검증
- 상태: `CONTENT_READY / CURRENT_BUSINESS_VERIFY / ASSET_PENDING`

### BB-S03 — Ozymandias의 사막
- 연결 Place: `tohajiilee`
- 관계: **FILMED**
- 장면 방향: 시즌5 후반 사막 총격전과 시리즈 최대 전환점
- Why This Place?: Breaking Bad의 사막은 단순한 배경이 아니라 선택의 결과가 되돌아오는 공간이다. 도시의 촬영지들과 달리 이 장소는 나바호 네이션 영내이므로 “가보는 법”보다 접근·존중 규칙을 먼저 알려야 한다.
- 이미지 방향: 정확한 장면 재현보다 뉴멕시코 사막/To’hajiilee의 공공·라이선스 명확 풍경 사진.
- 근거: repo canonical `tohajiilee` data; local access 규정은 배포 직전 별도 확인
- 상태: `CONTENT_READY / ACCESS_RULE_VERIFY / ASSET_PENDING`

---

## 3. Byakuyako — 3 Scene Packages

> 중요: 백야행은 **소설의 실제 무대와 영상판 촬영지를 분리**한다. 기존 Research v1의 taxonomy 원칙을 그대로 적용한다.

### BYA-S01 — 두 사람의 이야기가 시작되는 후세
- 연결 Place: Kintetsu Fuse Station canonical node
- 관계: **STORY-RELATED (NOVEL SETTING)**
- 장면 방향: 오사카 후세라는 실제 도시가 19년에 걸친 이야기의 현실감을 만드는 시작점
- Why This Place?: 후세는 “드라마 촬영지”가 아니라 소설 속 세계를 이해하기 위한 실제 도시 배경이다. 촬영지라고 과장하지 않고 작품의 무대를 직접 걷는 경험으로 설명한다.
- 이미지 방향: Fuse Station/후세역 주변의 합법적 실제 사진.
- 근거: `docs/growth/batch2/BYAKUYA_RESEARCH_V1.md`
- 상태: `CONTENT_READY / PLACE_ID_TRACE / ASSET_PENDING`

### BYA-S02 — 후세 상점가, 소설의 분위기를 걷는 장소
- 연결 Place: Fuse Hondori shopping street canonical node
- 관계: **STORY-RELATED (NOVEL SETTING)**
- 장면 방향: 일상의 상점가와 어두운 사건 서사가 겹치는 대비
- Why This Place?: 작품이 만들어내는 긴장감은 관광명소보다 평범한 생활공간에서 더 선명하다. 실제 상점가를 “촬영지”라고 부르지 않으면서도 성지순례 수요를 만족시킬 수 있는 대표 사례다.
- 이미지 방향: 상점가 아케이드 실제 사진. 브랜드/인물 초상은 피한다.
- 근거: Batch2 Byakuya Research v1
- 상태: `CONTENT_READY / PLACE_ID_TRACE / ASSET_PENDING`

### BYA-S03 — 영상판은 실제 어디서 찍었나?
- 연결 Place: Mitsukaido Station 또는 Kita-Mitsukaido Station 중 현재 data-model에 가장 안전한 node를 신규/기존 여부 audit 후 결정
- 관계: **FILMED (2006 TBS ADAPTATION)**
- 장면 방향: 소설의 오사카 무대와 영상화된 드라마의 실제 촬영 장소가 다르다는 점
- Why This Place?: “백야행의 무대”를 찾는 사람과 “백야행 드라마 촬영지”를 찾는 사람은 검색 의도가 다르다. 이 Package는 둘을 처음으로 명확히 나눠 주는 역할을 한다.
- 이미지 방향: 역 외관 실제 사진. 영화/드라마 화면 캡처 사용 금지.
- 근거: Ibaraki Film Commission — 2006 TBS `白夜行` Mitsukaido/Kita-Mitsukaido filming; Batch2 research
- 상태: `RESEARCH_READY / DATA_MODEL_LINK_CHECK / ASSET_PENDING`

---

## 4. Stranger Things — 3 Scene Packages

### ST-S01 — Creel House와 Vecna
- 연결 Place: `creelhouse`
- 관계: **FILMED**
- 장면 방향: 크릴 하우스의 시계, 다락방, Vecna 정체가 연결되는 시즌4 핵심 장면
- Why This Place?: 제작진은 전형적인 “유령의 집”이 아니라 수직적이고 불길한 실루엣을 가진 실제 저택을 찾았고, Rome, Georgia의 집을 선택했다. 실제 건물의 건축적 분위기가 Vecna 서사의 일부가 된 사례다.
- 이미지 방향: Creel House 실제 외관의 라이선스 명확 사진 또는 Rome historic-house 분위기 illustration. Netflix 장면 캡처 금지.
- 근거: Netflix Tudum — Season 4 locations, production design, Easter eggs
- 상태: `CONTENT_READY / ASSET_PENDING`

### ST-S02 — Hawkins Lab
- 연결 Place: `hawkinslab`
- 관계: **FILMED**
- 장면 방향: Eleven의 과거와 실험실 서사가 시작되는 Hawkins Laboratory
- Why This Place?: 섬뜩한 외관은 세트가 아니라 애틀랜타의 옛 정신의료시설(Emory at Briarcliff)을 활용했다. 실제 건축물의 무거운 분위기가 연구소 미장센의 출발점이 됐다.
- 이미지 방향: Emory/Briarcliff 외관의 사용권 명확 사진. 접근 불가/철거·현황은 배포 직전 재검증.
- 근거: Netflix Tudum production designer interview; Netflix 2026 BTS/facts
- 상태: `CONTENT_READY / CURRENT_STATUS_VERIFY / ASSET_PENDING`

### ST-S03 — Starcourt Mall
- 연결 Place: `gwinnettmall`
- 관계: **FILMED**
- 장면 방향: 시즌3 쇼핑몰과 마지막 전투
- Why This Place?: 1984년에 문을 연 실제 Gwinnett Place Mall을 1985년의 Starcourt로 되돌려 놓았다는 점이 재미있다. 시대극 세트가 아니라 실제 80년대 쇼핑몰의 구조를 활용한 사례다.
- 이미지 방향: mall exterior/public area의 합법적 실제 사진. 폐쇄/재개발 현황 배포 전 확인.
- 근거: repo canonical data; Netflix Tudum Starcourt content
- 상태: `CONTENT_READY / CURRENT_STATUS_VERIFY / ASSET_PENDING`

---

## 5. 폭싹 속았수다 — 3 Scene Packages

### POK-S01 — 성산일출봉과 유채꽃
- 연결 Place: 현재 폭싹 canonical source에서 Seongsan Ilchulbong node trace
- 관계: **FILMED**
- 장면 방향: 애순과 관식의 어린 시절/고향 제주를 상징하는 성산 풍경
- Why This Place?: 성산일출봉은 단순한 제주 관광명소가 아니라 작품에서 계절과 고향의 감정을 동시에 보여주는 배경으로 반복된다. 촬영지를 보러 갔다가 제주를 대표하는 자연유산까지 함께 경험할 수 있다는 점이 강하다.
- 이미지 방향: 성산일출봉+유채꽃 actual landscape. 공공관광/Commons 등 사용권 명확 asset 우선.
- 근거: Visit Jeju 공식 `A Jeju Journey with <When Life Gives You Tangerines>`; Film Korea
- 상태: `CONTENT_READY / CANONICAL_PLACE_TRACE / ASSET_PENDING`

### POK-S02 — 김녕 어촌, 이야기의 생활감
- 연결 Place: Gimnyeong Fishing Village canonical node trace
- 관계: **FILMED**
- 장면 방향: 어린 시절과 제주 어촌의 생활 장면
- Why This Place?: 작품의 제주는 유명 관광지의 엽서 이미지보다 사람들이 실제로 살아가는 어촌 풍경에서 더 강하게 느껴진다. 김녕은 “예쁜 바다”보다 작품의 생활감을 보여주는 장소로 설명한다.
- 이미지 방향: 김녕 어촌/해안 실제 사진. 사유지·주민 얼굴이 중심인 사진은 피한다.
- 근거: Visit Jeju official episode-linked guide
- 상태: `CONTENT_READY / CANONICAL_PLACE_TRACE / ASSET_PENDING`

### POK-S03 — 관덕정, 제주 역사와 작품이 만나는 곳
- 연결 Place: Gwandeokjeong canonical node trace
- 관계: **FILMED**
- 장면 방향: 작품 속 제주 공간과 실제 역사 건축물이 겹치는 장면
- Why This Place?: 화면에서는 이야기의 한 배경처럼 지나가지만 실제 관덕정은 조선 후기 목조건축이자 보물로 지정된 문화유산이다. “드라마 때문에 갔다가 장소 자체의 역사를 발견하는 경험”을 보여주기에 가장 좋은 Package다.
- 이미지 방향: 관덕정 전경 actual photo. 공공기관/Commons 라이선스 우선.
- 근거: Korean Film Council filming location database; Visit Jeju
- 상태: `CONTENT_READY / CANONICAL_PLACE_TRACE / ASSET_PENDING`

---

## 6. 15개 Package 현재 상태 요약

| Work | Package | Content | Place link | Relation | Asset |
|---|---|---|---|---|---|
| Odyssey | ODY-S01 | ready | known | FILMED | pending |
| Odyssey | ODY-S02 | ready | audit | FILMED | pending |
| Odyssey | ODY-S03 | ready | audit | final check | pending |
| Breaking Bad | BB-S01 | ready | known | FILMED | pending |
| Breaking Bad | BB-S02 | ready | known | FILMED | pending |
| Breaking Bad | BB-S03 | ready | known | FILMED | pending |
| Byakuyako | BYA-S01 | ready | trace | STORY-RELATED | pending |
| Byakuyako | BYA-S02 | ready | trace | STORY-RELATED | pending |
| Byakuyako | BYA-S03 | ready | data check | FILMED-adaptation | pending |
| Stranger Things | ST-S01 | ready | known | FILMED | pending |
| Stranger Things | ST-S02 | ready | known | FILMED | pending |
| Stranger Things | ST-S03 | ready | known | FILMED | pending |
| Poksshak | POK-S01 | ready | trace | FILMED | pending |
| Poksshak | POK-S02 | ready | trace | FILMED | pending |
| Poksshak | POK-S03 | ready | trace | FILMED | pending |

**아직 어떤 Package도 `READY`가 아니다.** `READY`는 이미지 파일+라이선스+alt+canonical Place 연결까지 완료됐을 때만 표시한다.

## 7. 다음 기획 작업
1. 15개 각각의 canonical Place ID/path trace
2. 이미지 후보 수집
3. 이미지 사용권 검증
4. 사진이 안전하지 않거나 품질이 낮으면 original/generated illustration 제작
5. WebP 최적화 후 `site/assets/scenes/<work>/`에 commit
6. manifest 작성
7. Package별 `READY` 승격

개발자는 이 단계가 끝날 때까지 Phase E UI 구현을 시작하지 않는다.