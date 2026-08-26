// "이 사랑 통역 되나요?" (Can This Love Be Translated? / 恋の通訳、できますか？) 실제 촬영지
// 2026-08 신규 작품 추가. country 필드는 "지역으로 찾기" 국가 단위 집계용(신규 필드, 기존 로직과 무관).
// ※ localTag: 이 작품은 한국어(lang:'ko')라 기본적으로 한자/가나 태그가 생성되지 않는다. 그런데
//    일본 로케이션(가마쿠라·에노시마)은 실제로는 일본어권 SNS 게시물이 훨씬 많으므로, 직지의
//    유럽 장소와 같은 방식(loc.localTag)으로 현지 검색에 실제 쓰이는 로마자 태그를 별도 지정한다.
//    (정확한 한자·가나 표기를 단정하기보다, 실제로 통용되는 로마자 태그를 쓰는 쪽이 더 안전하다는
//    판단 — localTagLang은 지정하지 않아 "현지어 태그"라는 중립 표현으로 노출된다.)
// Tier 1: 일본 가마쿠라·에노시마(실제 해외 촬영, kamakuraguide.com 로케이션 가이드 + 아사히신문 인용 기준)
// Tier 2: 캐나다 앨버타(실제 해외 촬영, 여러 한국 여행매체·Destination Canada 공식 가이드 기준)
// Tier 3: 이탈리아 토스카나·움브리아(실제 해외 촬영)
// Tier 4: 한국 — "해외인 줄 알았는데 사실 한국" 위장 촬영지 + 극중 실제 한국 배경 장면(여행톡톡 국내 촬영지 12곳 기준)
const ISATONG_LOCATIONS = [
  // ── 일본: 가마쿠라·에노시마 (10곳, 실제 해외 촬영) ──
  {
    "id": "gokurakuji_station",
    "order": 1,
    "country": "japan",
    "localTag": "GokurakujiStation",
    "modernName": "고쿠라쿠지역 (에노시마 전철, 가마쿠라)",
    "lat": 35.3098, "lng": 139.5280,
    "description": "1화 초반, 무희와 호진이 서로의 존재를 모른 채 스쳐 지나가는 장면의 배경. 1904년에 지어진 목조 역사로, 고레에다 히로카즈 감독의 <바닷마을 다이어리>에도 등장했던 곳이다.",
    "description_en": "Where Ho-jin and Mu-hee silently pass each other early in Episode 1, neither yet aware the other exists. A wooden station house built in 1904, also featured in Hirokazu Kore-eda's Our Little Sister.",
    "description_ja": "1話序盤、ムヒとホジンが互いの存在を知らないまますれ違うシーンの舞台。1904年築の木造駅舎で、是枝裕和監督の『海街diary』にも登場した場所。",
    "tag": "실제 촬영지 — 두 사람이 스쳐 지나가는 복선 장면",
    "tag_en": "REAL SETTING — the foreshadowing near-miss, filmed here",
    "tag_ja": "実際の撮影地 — 二人がすれ違う伏線シーン",
    "travelTip": "주택가 안에 있어 촬영 시 소음·사생활 배려가 필요하다는 안내가 붙어 있다.",
    "travelTip_en": "Located within a residential neighborhood — visitors are asked to be considerate when photographing."
  },
  {
    "id": "tenzan_lab_ramen",
    "order": 2,
    "country": "japan",
    "localTag": "TenzanLab",
    "modernName": "텐잔랩 (에노시마 골목, 극중 라멘집 '모모짱 라멘')",
    "lat": 35.3011, "lng": 139.4818,
    "description": "무희가 전 남친의 새 여친에게 따지러 뛰어들었다가 일본어가 안 통해 얼어붙었을 때, 그 자리에 있던 호진이 통역으로 끼어들며 둘의 인연이 시작된 곳. 실제로는 빙수·화과자를 파는 카페로, 극에서는 외관만 라멘집으로 나왔다.",
    "description_en": "Where Mu-hee bursts in to confront her ex's new girlfriend, freezes because she can't speak Japanese, and Ho-jin — who happens to be there — steps in as her interpreter. This is where their story truly begins. In reality it's a café serving shaved ice and Japanese sweets; only its exterior plays the ramen shop.",
    "description_ja": "元カレの新しい彼女に詰め寄ろうと飛び込んだムヒが、日本語が通じず固まっていたところに居合わせたホジンが通訳として割って入る — 二人の物語が本当に始まる場所。実際はかき氷や和菓子を出すカフェで、外観だけがラーメン屋として使われた。",
    "tag": "실제 촬영지 — 두 사람의 진짜 첫 만남",
    "tag_en": "REAL SETTING — where they actually first meet",
    "tag_ja": "実際の撮影地 — 二人の本当の出会いの場所",
    "travelTip": "지금도 영업 중인 카페. 라멘은 팔지 않는다."
  },
  {
    "id": "benzaiten_nakamise",
    "order": 3,
    "country": "japan",
    "localTag": "EnoshimaNakamise",
    "modernName": "벤자이텐 나카미세 거리 (에노시마)",
    "lat": 35.3005, "lng": 139.4809,
    "description": "에노시마역에서 에노시마 신사로 이어지는 참배길. 문어전병·시라스덮밥 같은 길거리 음식을 사 먹으며 두 사람이 함께 섬을 둘러보는 장면의 배경이다.",
    "description_en": "The pilgrimage path from Enoshima Station to Enoshima Shrine, lined with shops. The backdrop for the scene where the two explore the island together, sharing street food.",
    "tag": "실제 촬영지 — 함께 섬을 걷는 장면",
    "tag_en": "REAL SETTING — their island walk together, filmed here",
    "travelTip": "에도시대부터 이어진 여관들과 상점이 늘어선 거리, 에노시마 여행의 첫 진입로다."
  },
  {
    "id": "enoshima_post_office",
    "order": 4,
    "country": "japan",
    "localTag": "EnoshimaPostOffice",
    "modernName": "에노시마 우체국 앞",
    "lat": 35.3018, "lng": 139.4810,
    "description": "무희가 호진의 가방을 든 채 그를 기다리는 장면에 등장한다. 상점가 사이 조용한 일본식 공공건물로, 자칫 지나치기 쉬운 장소다.",
    "description_en": "Where Mu-hee waits for Ho-jin while holding his bag. A quiet Japanese-style public building tucked between shops — easy to miss if you're not looking for it.",
    "tag": "실제 촬영지 — 가방을 들고 기다리는 장면",
    "tag_en": "REAL SETTING — the waiting-with-his-bag scene, filmed here",
    "travelTip": "벤자이텐 나카미세 거리 중간 지점."
  },
  {
    "id": "oiwayamichi_street",
    "order": 5,
    "country": "japan",
    "localTag": "Oiwayamichi",
    "modernName": "오이와야미치 거리 (에노시마)",
    "lat": 35.2992, "lng": 139.4746,
    "description": "찐빵을 사고 나서야 호진의 스마트폰을 자기가 갖고 있다는 걸 깨달은 무희가 그를 찾아 뛰어가는 장면이 촬영된 돌길. 에노시마 신사 오쿠쓰미야에서 이와야 동굴로 이어진다.",
    "description_en": "The stone-paved path where Mu-hee, realizing she still has Ho-jin's phone, rushes to find him. It runs from Enoshima Shrine's Okutsumiya to the Iwaya Caves.",
    "tag": "실제 촬영지 — 스마트폰을 돌려주려 뛰어가는 장면",
    "tag_en": "REAL SETTING — the phone-chase scene, filmed here",
    "travelTip": "나카미세 거리보다 한적하고 조용한 순례길 분위기."
  },
  {
    "id": "goryo_shrine",
    "order": 6,
    "country": "japan",
    "localTag": "GoryoShrine",
    "modernName": "고료 신사 (가마쿠라 하세)",
    "lat": 35.3097, "lng": 139.5346,
    "description": "무희가 호진을 따라잡아 스마트폰을 돌려주는 장면 — 흰색 도리이 앞으로 에노덴 전철이 지나가는 이 시리즈 최고의 명장면이 촬영된 곳. 아사히신문 보도로 실제 촬영지임이 확인됐다.",
    "description_en": "Where Mu-hee catches up to Ho-jin to return his phone — set against the series' most iconic shot, an Enoden train crossing in front of the shrine's white torii gate. Confirmed as a filming location by Asahi Shimbun.",
    "tag": "실제 촬영지 — 도리이 앞 에노덴, 시리즈 최고 명장면",
    "tag_en": "REAL SETTING — the torii-and-train shot, the series' most iconic scene",
    "travelTip": "장마철엔 수국과 전철이 함께 찍혀 원래도 유명한 포토스팟."
  },
  {
    "id": "katase_lighthouse",
    "order": 7,
    "country": "japan",
    "localTag": "KataseLighthouse",
    "modernName": "가타세 어항 흰 등대",
    "lat": 35.3049, "lng": 139.4786,
    "description": "노을 지는 저녁, 두 사람이 방파제 끝 등대에 나란히 앉는 장면. 무희가 이때 호진의 옆모습을 몰래 찍은 사진이 훗날 재회의 실마리가 된다. 에노시마와 후지산이 한 프레임에 담기는 흔치 않은 지점이다.",
    "description_en": "Where the two sit side by side at sunset — the photo Mu-hee secretly takes of Ho-jin's profile here later becomes the thread that reunites them. One of the rare spots where Enoshima and Mount Fuji align in a single frame.",
    "tag": "실제 촬영지 — 노을 지는 벤치 장면",
    "tag_en": "REAL SETTING — the sunset bench scene, filmed here",
    "travelTip": "한국 드라마 팬들 사이에서 '인생샷 명소'로 불린다."
  },
  {
    "id": "hase_crossing",
    "order": 8,
    "country": "japan",
    "localTag": "HaseCrossing",
    "modernName": "하세역 인근 건널목",
    "lat": 35.3110, "lng": 139.5346,
    "description": "1화의 클라이맥스 — 밥 먹을 곳을 찾다 무희가 먼저 가라고 하고, 에노덴이 지나가는 짧은 순간 호진이 감쪽같이 사라지는 장면. 전 세계 팬들이 찾아오자 가마쿠라시가 다국어 안내판을 세웠다.",
    "description_en": "Episode 1's climax — as the two look for somewhere to eat, Mu-hee tells him to go ahead, an Enoden train passes between them, and Ho-jin vanishes. So many fans now visit that Kamakura City installed multilingual notice signs.",
    "tag": "실제 촬영지 — 호진이 사라지는 1화 클라이맥스",
    "tag_en": "REAL SETTING — Ho-jin's disappearance, Episode 1's climax",
    "travelTip": "주택가 도로라 소음·통행 방해에 각별히 주의. 다국어 안내판이 세워져 있다."
  },
  {
    "id": "enoshima_sea_candle",
    "order": 9,
    "country": "japan",
    "localTag": "EnoshimaSeaCandle",
    "modernName": "에노시마 씨캔들 (전망 등대)",
    "lat": 35.2995, "lng": 139.4791,
    "description": "2화부터, 호진이 첫사랑 신지선을 찾아 헤매는 장면의 배경이 된 전망대. 100m 높이에서 요코하마 랜드마크타워부터 후지산, 이즈반도까지 360도로 조망할 수 있다.",
    "description_en": "The observation tower where, from Episode 2 onward, Ho-jin searches for his first love Shin Ji-seon. A 360-degree panorama from 100 meters up, taking in Mount Fuji, Yokohama, and the Izu Peninsula.",
    "tag": "실제 촬영지 — 첫사랑을 찾아 헤매는 장면",
    "tag_en": "REAL SETTING — the searching-for-his-first-love scene",
    "travelTip": "실내 장면은 한국 속초 피노디아 엑스포타워에서 따로 촬영됐다(아래 한국 촬영지 참고) — 외경은 씨캔들, 내부는 속초라는 이중 구조."
  },
  {
    "id": "inamuragasaki_park",
    "order": 10,
    "country": "japan",
    "localTag": "Inamuragasaki",
    "modernName": "이나무라가사키 (가마쿠라 해변공원)",
    "lat": 35.3059, "lng": 139.5228,
    "description": "호진의 오랜 짝사랑이 시작된 자리 — 첫사랑 지선이 여행을 앞두고 그에게 부적을 건네는 회상 장면이 촬영됐다. 후지산과 에노시마를 한 시야에 담을 수 있는 곶.",
    "description_en": "The origin point of Ho-jin's long unrequited love — the flashback scene where Ji-seon hands him a protective charm before their trip. A cape offering a rare joint view of Mount Fuji and Enoshima.",
    "tag": "실제 촬영지 — 첫사랑과의 회상 장면",
    "tag_en": "REAL SETTING — the first-love flashback, filmed here",
    "travelTip": "가나가와현 명승 50선이자 후지산 조망 명소 100선에 포함."
  },

  // ── 캐나다: 앨버타(캘거리·밴프·캔모어·카나나스키스) (7곳, 실제 해외 촬영) ──
  {
    "id": "calgary_downtown",
    "order": 11,
    "country": "canada",
    "modernName": "캘거리 (앨버타주 최대 도시)",
    "lat": 51.0447, "lng": -114.0719,
    "description": "'로맨틱 트립' 본격 촬영이 시작된 도시이자 로키산맥으로 가는 관문. 캐나다 파트 전체의 실질적 거점이다.",
    "description_en": "The city where formal filming of 'Romantic Trip' begins, and the gateway to the Canadian Rockies — the base for the entire Canada leg.",
    "tag": "실제 촬영지 — 캐나다 파트의 거점 도시",
    "tag_en": "REAL SETTING — the base city for the Canada storyline",
    "travelTip": "앨버타주 최대 도시, 캘거리국제공항을 통해 접근."
  },
  {
    "id": "banff_avenue",
    "order": 12,
    "country": "canada",
    "modernName": "밴프 애비뉴 (밴프 국립공원)",
    "lat": 51.1784, "lng": -115.5708,
    "description": "밴프 타운의 중심 거리. 극중 두 사람이 걸었던 아기자기한 소품샵·카페 거리를 실제로 걸어볼 수 있다. 캐나다 최초의 국립공원 안에 있는 마을이다.",
    "description_en": "Banff's main street, where you can actually walk the same charming shops and cafés the two characters stroll past on screen — a townsite within Canada's very first national park.",
    "tag": "실제 촬영지 — 산책·카페 거리 장면",
    "tag_en": "REAL SETTING — the strolling-through-town scenes",
    "travelTip": "9~10월 로키산맥 단풍철에 주로 촬영돼 화면이 유난히 따뜻한 색감을 띤다."
  },
  {
    "id": "canmore_town",
    "order": 13,
    "country": "canada",
    "modernName": "캔모어 (밴프 인근 산악 마을)",
    "lat": 51.0899, "lng": -115.3599,
    "description": "밴프 국립공원과 맞닿은 산악 마을로, 캐나다 파트 여러 장면의 배경이 됐다.",
    "description_en": "A mountain town bordering Banff National Park, used as the backdrop for several Canada-leg scenes.",
    "tag": "실제 촬영지 — 산악 마을 배경 장면",
    "tag_en": "REAL SETTING — mountain-town backdrop scenes",
    "travelTip": "밴프보다 한적해 현지인 느낌의 카페·상점이 많다."
  },
  {
    "id": "kananaskis_area",
    "order": 14,
    "country": "canada",
    "modernName": "카나나스키스 컨트리",
    "lat": 50.9558, "lng": -115.1478,
    "description": "극중 무희가 히로를 처음 발견하는 장소로 등장. 캔모어를 둘러싸고 밴프 국립공원과 맞닿은 자연보호구역이다.",
    "description_en": "Where, in the story, Mu-hee first spots Hiro. A protected wilderness area surrounding Canmore, bordering Banff National Park.",
    "tag": "실제 촬영지 — 히로를 처음 발견하는 장면",
    "tag_en": "REAL SETTING — where Mu-hee first spots Hiro"
  },
  {
    "id": "quarry_lake_canmore",
    "order": 15,
    "country": "canada",
    "modernName": "쿼리 호수 (캔모어 인근)",
    "lat": 51.0967, "lng": -115.3839,
    "description": "두 사람의 첫 키스 장면이 촬영된 호수. 7개 봉우리가 12㎞에 걸쳐 이어지는 런들산맥이 성벽처럼 호수 뒤로 솟아 있다. 이후 한국 드라마 팬들 사이 '성지 코스'로 자리 잡았다.",
    "description_en": "The lake where the two share their first kiss, with the seven-peaked, 12km-long Rundle Range rising behind it like a wall. It's since become a pilgrimage stop for Korean-drama fans.",
    "tag": "실제 촬영지 — 첫 키스 장면",
    "tag_en": "REAL SETTING — their first kiss, filmed here",
    "travelTip": "캔모어 시내에서 가까운 접근성 좋은 호수."
  },
  {
    "id": "royal_tyrrell_museum",
    "order": 16,
    "country": "canada",
    "modernName": "로열 티렐 박물관 (드럼헬러)",
    "lat": 51.4674, "lng": -112.7944,
    "description": "공룡·고생물학 전문 박물관으로 '로맨틱 트립' 촬영 중 등장한 장소. 세계 최대급 규모로 약 16만 점의 화석을 소장하며, 앨버타주에서 처음 발견돼 이름 붙은 알베르토사우루스도 전시돼 있다.",
    "description_en": "A dinosaur and paleontology museum that appears during the 'Romantic Trip' filming. One of the world's largest, holding some 160,000 fossils — including the Albertosaurus, first discovered in and named for Alberta.",
    "tag": "실제 촬영지 — 로맨틱 트립 촬영 장면",
    "tag_en": "REAL SETTING — a 'Romantic Trip' filming scene",
    "travelTip": "드럼헬러는 캘거리에서 차로 약 1시간 30분."
  },
  {
    "id": "canadian_rockies_aurora",
    "order": 17,
    "country": "canada",
    "modernName": "캐네디언 로키 (밴프 국립공원 일대)",
    "lat": 51.4968, "lng": -115.9281,
    "description": "무희와 호진이 오로라를 감상하는 장면의 배경이 된 로키산맥 일대. 정확한 촬영 지점은 여러 매체마다 표기가 조금씩 다르지만, 밴프 국립공원 권역 내로 확인된다.",
    "description_en": "The Rockies backdrop for the scene where Mu-hee and Ho-jin watch the aurora together. Reports vary slightly on the exact spot, but it's confirmed to be within Banff National Park.",
    "tag": "실제 촬영지 — 오로라 감상 장면",
    "tag_en": "REAL SETTING — the aurora-watching scene",
    "travelTip": "정확한 포인트가 매체마다 조금씩 다르게 보도돼, 이 핀은 밴프 국립공원 일대를 넓게 가리킨다."
  },

  // ── 이탈리아: 토스카나·움브리아 (3곳, 실제 해외 촬영) ──
  {
    "id": "siena_piazza_del_campo",
    "order": 18,
    "country": "italy",
    "modernName": "피아차 델 캄포 (시에나, 토스카나)",
    "lat": 43.3188, "lng": 11.3308,
    "description": "토스카나 시에나의 대표 광장에서 두 사람이 포옹하는 장면이 촬영됐다. 이야기 후반부 관계가 결정적으로 깊어지는 순간 중 하나다.",
    "description_en": "Siena's signature shell-shaped square, where the two share an embrace — one of the moments in the back half of the story where their relationship deepens decisively.",
    "tag": "실제 촬영지 — 포옹 장면",
    "tag_en": "REAL SETTING — their embrace, filmed here",
    "travelTip": "시에나 구시가의 중심 광장, 팔리오 경마 축제로도 유명하다."
  },
  {
    "id": "perugia_via_appia",
    "order": 19,
    "country": "italy",
    "modernName": "비아 아피아 (페루자 구시가)",
    "lat": 43.1122, "lng": 12.3888,
    "description": "돌바닥과 경사진 골목, 벽에 가까운 좁은 동선이 이어지는 페루자 구시가의 골목. 두 사람의 키스 장면이 촬영됐다.",
    "description_en": "A narrow, sloping stone alley in Perugia's old town, walls close on either side — the setting for the two characters' kiss.",
    "tag": "실제 촬영지 — 키스 장면",
    "tag_en": "REAL SETTING — their kiss, filmed here",
    "travelTip": "움브리아주의 주도(州都) 페루자의 유네스코급 구시가 골목."
  },
  {
    "id": "civita_di_bagnoregio",
    "order": 20,
    "country": "italy",
    "modernName": "치비타 디 바뇨레조",
    "lat": 42.6275, "lng": 12.1102,
    "description": "'로맨틱 트립'의 마지막을 장식한 고백 장면이 촬영된 중세풍 절경 마을. 침식된 절벽 위에 홀로 서 있어 '죽어가는 마을'이라는 별칭으로도 불린다.",
    "description_en": "The medieval hilltop town where 'Romantic Trip's' final confession scene was filmed — perched alone atop an eroding cliff, sometimes nicknamed 'the dying town.'",
    "tag": "실제 촬영지 — 로맨틱 트립 최종 고백 장면",
    "tag_en": "REAL SETTING — Romantic Trip's final confession scene",
    "travelTip": "라치오주, 도보 다리로만 마을에 진입할 수 있다."
  },

  // ── 한국: '해외인 줄 알았는데 사실 한국'이었던 위장 촬영지 (9곳) ──
  {
    "id": "hwiwoo_coffee_goyang",
    "order": 21,
    "country": "korea",
    "modernName": "휘우커피 (경기 고양)",
    "lat": 37.6725, "lng": 126.8324,
    "description": "극중 이탈리아에서 호진과 무희(도라미)가 밤마다 함께 찾았던 레스토랑 — 실제로는 경기 고양의 카페다. 기찻길 옆에 있어 기차가 지나는 순간을 감상할 수 있는 이국적인 외관·인테리어로 유명하다.",
    "description_en": "The restaurant in Italy where Ho-jin and Mu-hee visit together every night — actually a café in Goyang, Gyeonggi-do. Known for its exotic exterior and interior, right next to a railway.",
    "tag": "위장 촬영지 — 이탈리아 레스토랑, 사실은 고양",
    "tag_en": "STORY SETTING — the 'Italian restaurant' was really filmed in Goyang, Korea",
    "travelTip": "기찻길 옆 감성 카페로 이미 인기 데이트 스팟."
  },
  {
    "id": "raum_art_center",
    "order": 22,
    "country": "korea",
    "modernName": "라움아트센터 (서울 강남)",
    "lat": 37.5172, "lng": 127.0473,
    "description": "극중 일본 영화제 뒤풀이 연회장으로 나온 장소 — 실제로는 서울 강남의 공연·웨딩 복합 공간이다. 유럽 고성 분위기의 인테리어가 특징.",
    "description_en": "Portrayed on screen as a Japanese film festival afterparty hall — actually a performance and wedding venue in Gangnam, Seoul, styled like a European castle interior.",
    "tag": "위장 촬영지 — 일본 영화제 연회장, 사실은 강남",
    "tag_en": "STORY SETTING — the 'Japan film festival hall' was really filmed in Gangnam, Seoul",
    "travelTip": "공연·콘서트·팝업스토어·웨딩홀로 다목적 사용되는 공간."
  },
  {
    "id": "universal_art_center",
    "order": 23,
    "country": "korea",
    "modernName": "유니버설 아트센터 (서울 광진)",
    "lat": 37.5487, "lng": 127.0838,
    "description": "무희가 히로와 오페라를 관람하다 나와 걷는 중세풍 복도 장면이 촬영된 곳 — 샹들리에까지 당연히 해외인 줄 알기 쉽지만 실제로는 서울 광진구다.",
    "description_en": "Where Mu-hee steps out mid-opera with Hiro and walks down a medieval-looking corridor, chandeliers and all — easy to assume it's overseas, but it's actually in Gwangjin-gu, Seoul.",
    "tag": "위장 촬영지 — 오페라 극장 복도, 사실은 서울",
    "tag_en": "STORY SETTING — the 'opera house corridor' was really filmed in Seoul",
    "travelTip": "대종상·한국뮤지컬시상식 등에 쓰인 다목적 문화예술 공간(2026년 1월 기준 내진보강공사로 운영 일시 중단)."
  },
  {
    "id": "pinnodia_expo_tower",
    "order": 24,
    "country": "korea",
    "modernName": "피노디아 엑스포 타워 (강원 속초)",
    "lat": 38.2070, "lng": 128.5919,
    "description": "1화에서 호진이 첫사랑을 만나러 달려간 일본의 한 전망대 — 외경은 실제 에노시마 씨캔들이지만, 내부 촬영은 속초의 이 타워에서 이뤄졌다.",
    "description_en": "The Japanese observation tower Ho-jin rushes to in Episode 1 to meet his first love — the exterior is the real Enoshima Sea Candle, but the interior was filmed at this tower in Sokcho.",
    "tag": "위장 촬영지 — 일본 전망대 내부, 사실은 속초",
    "tag_en": "STORY SETTING — the tower's interior was really filmed in Sokcho, Korea",
    "travelTip": "청초호를 하늘에서 감상할 수 있는 실제 속초 명소, 입장료 2,500원."
  },
  {
    "id": "sanmeoru_winery",
    "order": 25,
    "country": "korea",
    "modernName": "산머루농원 (경기 파주)",
    "lat": 37.9838, "lng": 126.9316,
    "description": "극중 이탈리아 와이너리로 나온 곳 — 실제로는 경기 파주의 와이너리 체험농장이다.",
    "description_en": "Portrayed as an Italian winery — actually a wine-experience farm in Paju, Gyeonggi-do.",
    "tag": "위장 촬영지 — 이탈리아 와이너리, 사실은 파주",
    "tag_en": "STORY SETTING — the 'Italian winery' was really filmed in Paju, Korea",
    "travelTip": "와이너리 투어·와인 만들기 체험이 가능한 캠핑장 겸 농원(사전예약 필수)."
  },
  {
    "id": "grand_mercure_gangnam",
    "order": 26,
    "country": "korea",
    "modernName": "그랜드 머큐어 임페리얼 팰리스 서울 강남",
    "lat": 37.5183, "lng": 127.0478,
    "description": "히로가 캐나다에서 처음 찾았던 고급 레스토랑 장면 — 실제로는 학동역 앞 5성급 호텔의 연회장(셀레나 홀)이다.",
    "description_en": "The upscale restaurant Hiro first visits in Canada — actually the banquet hall (Selena Hall) of a 5-star hotel in front of Hakdong Station, Seoul.",
    "tag": "위장 촬영지 — 캐나다 레스토랑, 사실은 강남 호텔",
    "tag_en": "STORY SETTING — the 'Canada restaurant' was really a Gangnam hotel",
    "travelTip": "엔틱하고 럭셔리한 인테리어로 연회·컨벤션 장소로 주로 쓰인다."
  },
  {
    "id": "castle_assisi_yangpyeong",
    "order": 27,
    "country": "korea",
    "modernName": "캐슬아씨시 (경기 양평)",
    "lat": 37.4779, "lng": 127.4235,
    "description": "극중 이탈리아 스태프 숙소로 등장한 곳 — 과거 펜션·호텔로 운영되던 경기 양평의 건물이다. 이름 자체가 이탈리아 도시 '아시시(Assisi)'를 재치있게 딴 것이기도 하다.",
    "description_en": "Portrayed as the Italian crew's lodging — a former pension/hotel in Yangpyeong, Gyeonggi-do. Its name is itself a playful nod to the Italian town of Assisi.",
    "tag": "위장 촬영지 — 이탈리아 스태프 숙소, 사실은 양평",
    "tag_en": "STORY SETTING — the 'Italy crew lodging' was really filmed in Yangpyeong, Korea",
    "travelTip": "현재 숙박 예약은 받지 않고 촬영·행사 장소로만 활용된다."
  },
  {
    "id": "poohoongnam_dangsan",
    "order": 28,
    "country": "korea",
    "modernName": "포옹남 당산점 (서울 영등포)",
    "lat": 37.5346, "lng": 126.8987,
    "description": "무희의 베트남 팬들이 등장하는 베트남 식당 장면 — 실제로는 서울 당산의 베트남 음식 전문점이다. 인테리어부터 메뉴까지 현지 분위기를 재현해 원래도 유명한 맛집이었다.",
    "description_en": "The Vietnamese restaurant scene featuring Mu-hee's Vietnamese fans — actually a Vietnamese restaurant in Dangsan, Seoul, already well known for recreating an authentic atmosphere in both decor and menu.",
    "tag": "위장 촬영지 — 베트남 식당, 사실은 당산",
    "tag_en": "STORY SETTING — the 'Vietnamese restaurant' scene, filmed in Dangsan, Seoul",
    "travelTip": "드라마 이전부터 베트남 음식 맛집으로 잘 알려진 곳."
  },

  // ── 한국: 극중 실제로도 한국이 배경인 장면 (3곳) ──
  {
    "id": "buyeo_national_museum",
    "order": 29,
    "country": "korea",
    "modernName": "국립부여박물관",
    "lat": 36.2760, "lng": 126.9099,
    "description": "마지막 화, 무희와 호진이 다시 만나는 공간 — 박물관의 디지털 실감영상관에서 촬영됐다.",
    "description_en": "Where Mu-hee and Ho-jin reunite in the final episode — filmed in the museum's digital immersive exhibition hall.",
    "tag": "실제 촬영지 — 마지막 화 재회 장면",
    "tag_en": "REAL SETTING — the final-episode reunion, filmed here",
    "travelTip": "무료 관람, 월요일 휴관."
  },
  {
    "id": "haebangchon_sinheung_market",
    "order": 30,
    "country": "korea",
    "modernName": "해방촌 신흥시장 (서울 용산)",
    "lat": 37.5415, "lng": 126.9866,
    "description": "드라마 끝자락, 호진이 외국인 친구와 함께 걷는 골목 장면이 촬영됐다.",
    "description_en": "Where Ho-jin walks with a foreign friend near the drama's end.",
    "tag": "실제 촬영지 — 엔딩부 골목 장면",
    "tag_en": "REAL SETTING — a late-series alley scene, filmed here",
    "travelTip": "힙한 카페·식당이 밀집한 이국적 분위기의 골목 시장."
  },
  {
    "id": "seongsu_movieland",
    "order": 31,
    "country": "korea",
    "modernName": "성수 무비랜드 (서울 성동)",
    "lat": 37.5445, "lng": 127.0557,
    "description": "무희와 히로가 '로맨틱 트립' 편집본을 함께 보는 장면이 촬영된 30석 규모의 소규모 영화관.",
    "description_en": "A tiny 30-seat cinema where Mu-hee and Hiro watch a rough cut of 'Romantic Trip' together.",
    "tag": "실제 촬영지 — 편집본 시사 장면",
    "tag_en": "REAL SETTING — the rough-cut screening scene, filmed here",
    "travelTip": "매달 큐레이터가 선정한 옛 영화를 상영하는 독립 상영관, 공식 홈페이지 예매 가능."
  }
];
