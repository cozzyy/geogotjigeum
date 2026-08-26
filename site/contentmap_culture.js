/* ============================================================
   "작품 속 진짜 한국" 문화 콘텐츠 (2026-08, 기획자 제안 4번 반영)
   [기획 의도] 촬영지 좌표 정보를 넘어, 장면 속에 자연스럽게 녹아있는 한국 문화를
   외국인 관점에서 설명한다 — 왜 편의점 앞에서 소주를 마시는지, 해녀는 실제로 어떻게
   일하는지 등. 4단 구성: ①작품 속 장면 → ②한국인에겐 평범하지만… → ③사실 이런
   문화다(역사·배경) → ④지금도 그런가?(과거형인지 현재도 유효한지 명시).
   [1차 파일럿 — 5개 주제] 사이트에 실제로 있는 작품과 확실히 연결되는 주제 위주로
   선정(전체 16개 후보 중 리서치·정확성 검증까지 한 세션에 끝낼 수 있는 규모).
   [정확성 원칙] 문화 설명도 지어내지 않는다 — 소주 도수 변화, 해녀 유네스코 등재
   연도, 찜질방/달고나 기원 등은 WebSearch로 사실관계를 확인한 뒤 작성했다.
   [구조] 작품(work)과 독립된 별도 콘텐츠 모듈. generate_culture_pages.js가 이 데이터를
   읽어 /culture/ 허브 + /culture/{id}/ 개별 페이지를 생성한다(ko+en, 2026-08 1차 범위 —
   ja/zh는 이번 라운드에 포함하지 않음). relatedWorkIds로 작품 허브 페이지와 상호 링크된다.
   ============================================================ */
const CULTURE_TOPICS = [
  {
    id: 'soju_convenience',
    hashtags: ['편의점', '소주', '한국문화', '일상'],
    heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Korean_drink-Soju-01.jpg',
    heroImageAlt: '한국 편의점에서 흔히 보이는 소주병',
    relatedWorkIds: ['squidgame'],
    ko: {
      title: '한국 드라마에서 왜 편의점 앞에서 소주를 마실까?',
      sceneText: '드라마나 영화에서 주인공들이 편의점 앞 파라솔 테이블에 앉아 소주를 마시는 장면을 자주 볼 수 있습니다. 오징어 게임 1화에서 성기훈이 딱 이런 모습으로 등장하죠.',
      normalText: '특별한 술자리도, 비싼 술집도 아닙니다. 하루를 마무리하며 부담 없이 한잔 걸치는, 한국인에게는 지극히 평범한 장면이에요.',
      cultureText: '한국의 편의점은 단순히 물건을 파는 곳이 아닙니다. 24시간 언제나 열려 있고, 생활 반경 어디에나 있는 가까운 공간이죠. 소주는 가격 부담이 거의 없고(대형마트 기준 병당 2,000원 안팎), 도수도 계속 낮아져 왔습니다 — 100년 전에는 35도에 달했지만, 1998년 참이슬이 23도로 나오며 "소주=25도" 공식을 깼고, 이후 꾸준히 낮아져 지금은 16도대가 대세입니다. 부담 없이 마실 수 있는 술이 된 거예요. 그래서 편의점 앞은 누구에게나 열려 있는, "오늘 하루 수고했어"라는 의미를 담은 작은 휴식처가 됩니다.',
      stillText: '네, 지금도 많은 사람들이 퇴근 후 편의점에서 간단히 소주나 맥주 한 병을 사서 친구·동료와 짧게 이야기를 나눕니다. 정식 술자리로 가기 전 가볍게 들르는 곳으로도, 혼자 하루를 정리하는 공간으로도 흔히 쓰여요. 한국에서 아주 익숙한 풍경입니다.'
    },
    en: {
      title: 'Why do characters in Korean dramas drink soju outside convenience stores?',
      sceneText: 'In Korean dramas and films, characters often sit at the plastic tables outside a convenience store, drinking soju. Squid Game\'s Seong Gi-hun appears in exactly this scene in episode 1.',
      normalText: 'It\'s not a special night out or an expensive bar — just an ordinary way to unwind at the end of the day, so common that Koreans barely notice it.',
      cultureText: 'Korean convenience stores are more than places to buy things — they\'re open 24 hours and within walking distance almost everywhere. Soju is cheap (around 2,000 won a bottle at a supermarket) and has gotten progressively lighter: about 35% ABV a century ago, then Jinro\'s Chamisul broke the "soju = 25%" norm by launching at 23% in 1998, and it has kept dropping since — today most brands sit around 16%. That makes it an easy, low-pressure drink, and the tables outside a convenience store become a small, open-to-anyone spot to say "good job today."',
      stillText: 'Yes — many people still stop by a convenience store after work to grab a soju or beer and chat briefly with a friend or coworker, whether as a quick warm-up before a proper night out or just to unwind alone. It\'s a genuinely everyday sight in Korea.'
    }
  },
  {
    id: 'haenyeo',
    hashtags: ['해녀', '제주도', '물질', '무형문화유산'],
    heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Korea-Jeju-Haenyeo-04.jpg',
    heroImageAlt: '제주 바다에서 물질하는 해녀',
    relatedWorkIds: ['poksshak'],
    ko: {
      title: '《폭싹 속았수다》 속 해녀, 실제로 어떻게 일할까?',
      sceneText: '애순이의 엄마 세대 여성들이 제주 바다에 들어가 전복과 소라, 미역을 캐는 장면이 등장합니다.',
      normalText: '제주에서는 오랫동안 아주 흔한 생업이었습니다. 딸이 엄마의 물질을 이어받는 것도 자연스러운 일이었죠.',
      cultureText: '해녀는 산소 공급 장비 없이 맨몸으로 잠수해 전복·소라·미역 등을 채취하는 여성들을 말합니다. 한 번 잠수할 때 보통 1분 안팎을 물속에서 버티고, 물 위로 올라올 때 참았던 숨을 몰아쉬며 내는 특유의 휘파람 같은 소리를 "숨비소리"라고 부릅니다. 계급이나 나이에 따라 상군·중군·하군으로 물질 실력을 구분하는 자체적인 공동체 체계도 있었어요. 2016년에는 제주해녀문화가 유네스코 인류무형문화유산 대표목록에 등재되며 그 가치를 국제적으로 인정받았습니다.',
      stillText: '지금도 실제로 물질을 하는 해녀들이 있지만, 고령화로 그 수는 계속 줄고 있습니다. 한때 제주에만 수만 명에 달했던 해녀는 현재 수천 명 수준으로 줄었고, 대다수가 60~80대입니다. 그래서 제주도는 해녀학교를 운영하는 등 이 문화를 이어가려는 노력을 하고 있어요.'
    },
    en: {
      title: 'How do real haenyeo (Korean female divers) actually work?',
      sceneText: 'Ae-sun\'s mother\'s generation of women dive into the sea off Jeju Island to gather abalone, conch, and seaweed.',
      normalText: 'On Jeju, this was an ordinary livelihood for generations — a daughter picking up diving from her mother was simply how things were.',
      cultureText: 'Haenyeo are women who free-dive without oxygen tanks to harvest abalone, conch, seaweed and other seafood by hand. A single dive typically lasts around a minute, and the distinctive whistling sound they make exhaling as they surface — releasing the breath they held underwater — is called sumbisori. Traditionally, divers were even ranked into senior, mid-level, and junior groups within their own community based on skill. In 2016, Jeju\'s haenyeo culture was inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity, recognizing its value internationally.',
      stillText: 'Yes — real haenyeo are still diving today, but their numbers keep shrinking as the community ages. What was once tens of thousands of divers on Jeju has fallen to a few thousand, most of them in their 60s to 80s. Jeju has responded by running haenyeo training schools to try to keep the tradition alive.'
    }
  },
  {
    id: 'dalgona',
    hashtags: ['달고나', '뽑기', '추억의간식', '오징어게임'],
    heroImage: '',
    heroImageAlt: '',
    relatedWorkIds: ['squidgame'],
    ko: {
      title: '《오징어 게임》의 달고나 뽑기, 진짜 한국 놀이였을까?',
      sceneText: '참가자들이 달고나 과자 위에 찍힌 모양(우산, 별, 삼각형 등)을 깨지 않고 바늘로 파내는 게임을 벌입니다. 실패하면 목숨을 잃는 살벌한 설정이지만, 놀이 자체는 실제 한국의 옛 길거리 간식에서 그대로 가져온 것입니다.',
      normalText: '나이가 있는 한국인들에게 달고나는 목숨을 건 게임이 아니라, 학교 앞 문방구에서 100원, 200원 주고 사 먹던 추억의 불량식품입니다.',
      cultureText: '달고나는 1950년대 후반부터 아이들이 즐겨 먹었고, 1960년대 초 부산에서 가내수공업 형태로 대량 판매되며 전국으로 퍼졌습니다. 설탕을 국자에 녹이고 베이킹소다를 살짝 넣어 부풀린 뒤 눌러 만드는 저렴한 간식이었어요. 이름은 "설탕보다 달구나"에서 왔다는 설이 있습니다. 모양틀로 찍은 무늬를 깨지 않고 온전히 떼어내면 하나를 더 주는 "뽑기(띠기·떼기)" 놀이로 발전하면서, 단순한 간식을 넘어 손재주를 겨루는 길거리 게임이 됐습니다.',
      stillText: '요즘은 동네 문방구 앞에서 자연스럽게 만나기는 어려워졌지만, 오징어 게임의 세계적 흥행 이후 관광지 체험 프로그램이나 축제, 팝업 매장에서 "옛날 감성 간식"으로 다시 인기를 끌고 있습니다. 완전히 사라진 문화라기보다, 추억의 놀이에서 체험 콘텐츠로 형태가 바뀌었다고 보는 게 정확합니다.'
    },
    en: {
      title: 'Was the dalgona "ppogi" game in Squid Game a real Korean childhood game?',
      sceneText: 'Contestants have to carve out a shape (umbrella, star, triangle) stamped into a dalgona candy without breaking it — with deadly stakes. But the game itself is lifted directly from a real, old-school Korean street snack.',
      normalText: 'For older Koreans, dalgona isn\'t a game with life-or-death stakes — it\'s a nostalgic cheap treat bought for pocket change outside the neighborhood stationery store as a kid.',
      cultureText: 'Dalgona became a popular children\'s snack from the late 1950s, and by the early 1960s small home-based makers in Busan were mass-producing it, spreading it nationwide. It was a cheap treat made by melting sugar in a ladle, adding a pinch of baking soda to puff it up, then flattening it. One theory traces the name to a phrase meaning "sweeter than sugar." When street vendors started rewarding kids who could pop out a stamped shape without cracking it with a free extra piece, the snack evolved into "ppogi" (also called ttigi or tteki) — a street game testing hand skill, not just something to eat.',
      stillText: 'It\'s rare to stumble on it outside a stationery store today, but after Squid Game\'s global success, dalgona-making has come back as a nostalgic hands-on activity at tourist experience programs, festivals, and pop-up stalls. It hasn\'t vanished so much as shifted from an everyday childhood game into an experience people seek out on purpose.'
    }
  },
  {
    id: 'market',
    hashtags: ['재래시장', '전통시장', '시장문화', '대장금'],
    heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gwangjang_Market,_Seoul_01.jpg',
    heroImageAlt: '서울 광장시장의 전통시장 풍경',
    relatedWorkIds: ['daejanggeum'],
    ko: {
      title: '《대장금》 속 시장, 조선시대 시장은 지금과 어떻게 달랐을까?',
      sceneText: '장금이 궁 밖에서 저잣거리를 오가거나, 신분이 낮은 이들이 모여 사는 마을과 그 주변 시장을 지나는 장면이 등장합니다.',
      normalText: '지금도 동네마다 재래시장이 있고, 값을 흥정하거나 "덤"을 더 얹어 받는 게 자연스러운 문화라서, 사극 속 시장 풍경이 낯설지 않게 느껴집니다.',
      cultureText: '조선시대 시장은 지금처럼 매일 여는 상설시장보다 정해진 날짜에만 서는 "장(場)"이 많았고(대표적으로 5일마다 서는 5일장), 도성 안 시전(상설 상점가)은 나라의 허가를 받은 상인들이 특정 품목을 독점적으로 팔았습니다. 신분 질서도 시장 풍경에 그대로 반영돼서, 백정처럼 천대받던 신분의 사람들은 따로 모여 사는 마을(백정촌)을 이루고 도축·가죽 관련 일을 도맡는 경우가 많았습니다. 이런 5일장·시전 전통이 개항 이후 상설시장으로 바뀌면서, 지금 우리가 아는 광장시장(1905년)·남대문시장 같은 재래시장의 뿌리가 됐습니다.',
      stillText: '대형마트와 온라인 쇼핑에 밀려 어려움을 겪는 재래시장이 많지만, 광장시장·남대문시장처럼 지금도 활발히 운영되는 곳들이 있습니다. 최근에는 오히려 외국인 관광객들 사이에서 길거리 음식과 옛 정취를 함께 즐기는 "재래시장 먹방 투어" 명소로 다시 주목받고 있어요.'
    },
    en: {
      title: 'How was a market in the Daejanggeum era different from a market today?',
      sceneText: 'Jang-geum moves through the marketplace outside the palace, passing by neighborhoods where lower-status people lived and the markets around them.',
      normalText: 'Because neighborhood markets and haggling — or getting a little extra "for free" — are still completely normal in Korea today, the market scenes in historical dramas don\'t feel especially foreign.',
      cultureText: 'Markets in the Joseon dynasty were often periodic rather than open every day — the best-known form was the "five-day market," held on a fixed rotating schedule — while the sijeon, permanent government-licensed shops inside the capital, held exclusive rights to sell specific goods. Social hierarchy shaped the marketplace too: people from the baekjeong class, who faced heavy discrimination, often lived in separate villages and handled most of the butchering and leatherwork. As Korea opened its ports and modernized, these five-day markets and sijeon shops evolved into the permanent markets we know today, like Gwangjang Market (founded 1905) and Namdaemun Market.',
      stillText: 'Many traditional markets struggle against big-box supermarkets and online shopping, but places like Gwangjang Market and Namdaemun Market are still thriving. In fact, they\'ve recently become popular again — this time as street-food tour destinations for foreign visitors who want both the food and the old-market atmosphere.'
    }
  },
  {
    id: 'jjimjilbang',
    hashtags: ['찜질방', '사우나', '한국목욕문화', '24시간'],
    heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/2020-03-11_20.48.33_%EC%B0%9C%EC%A7%88%EB%B0%A9_%EC%B9%B4%EC%9A%B4%ED%84%B0.jpg',
    heroImageAlt: '한국 찜질방 카운터',
    relatedWorkIds: [],
    ko: {
      title: '한국 드라마 속 찜질방, 목욕탕과 뭐가 다를까?',
      sceneText: '여러 한국 드라마에서 등장인물들이 수건으로 양머리를 하고 식혜나 구운 계란을 먹으며 넓은 찜질실에서 시간을 보내는 장면이 나옵니다.',
      normalText: '특별한 이벤트가 아니라, 가족 나들이나 친구들과의 모임, 심지어 늦은 밤 하룻밤 묵는 곳으로도 자연스럽게 이용됩니다.',
      cultureText: '찜질방의 원형은 숯가마의 남은 열로 몸을 지지던 조선시대 한증막까지 거슬러 올라가지만, 남녀 목욕탕과 공용 찜질실, 수면 공간을 한 건물에 결합한 지금 같은 형태는 1993년 부산에서 처음 등장했습니다. 이후 폭발적으로 인기를 끌며 1990년대 말에는 전국에 700여 곳까지 늘어났습니다. 목욕탕이 "씻는 곳"이라면, 찜질방은 씻고 난 뒤 온 가족이나 친구들이 함께 눕거나 앉아 시간을 보내는 "공용 거실"에 가깝습니다.',
      stillText: '네, 지금도 24시간 운영하는 찜질방이 흔하고, 저렴하게 잠을 해결하거나 친구들과 밤새 이야기를 나누는 장소로 널리 쓰입니다. 최근에는 외국인 관광객 사이에서 "한국식 스파" 체험으로도 인기를 얻고 있어요.'
    },
    en: {
      title: 'What\'s the difference between a jjimjilbang and a regular Korean bathhouse?',
      sceneText: 'In many Korean dramas, characters spend time in a large communal heated room with towels twisted into "sheep ears" on their heads, snacking on sikhye (sweet rice punch) or roasted eggs.',
      normalText: 'It\'s not a special occasion — a jjimjilbang gets used for family outings, hangouts with friends, and even as a cheap place to crash overnight.',
      cultureText: 'The jjimjilbang has roots going back to Joseon-era hanjeungmak — steam huts that used the leftover heat from charcoal kilns — but the modern format, combining separate men\'s and women\'s bathhouses with a shared heated sauna room and a sleeping area under one roof, first appeared in Busan in 1993. It caught on explosively, growing to around 700 locations nationwide by the late 1990s. If a bathhouse is just for washing, a jjimjilbang is closer to a shared living room where the whole family or a group of friends lingers together after washing up.',
      stillText: 'Yes — 24-hour jjimjilbangs are still common, widely used as a cheap place to sleep or to stay up talking with friends. More recently, they\'ve also become popular with foreign tourists looking for a "Korean-style spa" experience.'
    }
  }
];
