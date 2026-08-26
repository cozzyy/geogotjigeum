/* ============================================================
   繁體中文(대만·홍콩 대상) 콘텐츠 번역 (2026-08 3단계) — 대표작 6편
   [선정 기준] 대만/홍콩 상업적 수요·화제성 우선: 오징어 게임·케이팝 데몬 헌터스(넷플릭스
   대만/홍콩 상위권 실적), 대장금·겨울연가·커피프린스(홍콩·대만 "한류 1세대" 향수 콘텐츠로
   명시적 언급됨), 폭싹 속았수다(2025년 최신 히트작). ja_content.js와 동일한 구조·병합 방식을
   따르되, 번역 대상 작품 목록은 다르다(글로리·우영우는 이번 1차 확장에서 제외).
   [구조] 기존 *_locations.js 파일을 직접 수정하지 않고, 이 파일 하나에 _zh 필드를 모아
   로드 시점에 WORKS/DATA에 병합한다. tField()가 _zh를 자동으로 집어간다.
   [번체 중문 제목 출처] 대만/홍콩 넷플릭스·주요 엔터테인먼트 매체(위키백과 zh-tw, Yahoo奇摩,
   TVBS, 工商時報 등) 공식/통용 표기를 WebSearch로 확인 후 반영. 연출·극본자 이름의 한자
   표기도 동일하게 교차 검증했다(추측 표기 금지 원칙 — [[geugotjigeum_factual_accuracy]]).
   ============================================================ */
const ZH_CONTENT = {

  squidgame: {
    work: {
      title_zh: "魷魚遊戲 (Squid Game)",
      author_zh: "黃東赫 執導 · Netflix",
      era_zh: "現代",
      summary_zh: "被債務與絕望逼入絕境的人們，為了鉅額獎金參加童年遊戲。看似簡單的規則背後，是參賽者的抉擇、不平等、團結與背叛。"
    },
    locations: {
      ssangmundong: { modernName_zh:"雙門洞（首爾道峰區）", tag_zh:"奇勳的生活圈", description_zh:"主角成奇勳生活圈所在的首爾道峰區社區。《魷魚遊戲》許多拍攝地實際上都集中在道峰區一帶，據說是因為黃東赫導演本人曾在這一帶生活過。", travelTip_zh:"這裡是居民實際生活的社區，參觀時請保持安靜。" },
      baegunmarket: { modernName_zh:"白雲市場一帶", tag_zh:"日常生活背景", description_zh:"作為平民日常生活背景登場的傳統市場。", travelTip_zh:"這裡是實際營業中的市場，可以邊逛邊品嚐小吃。" },
      dobonggolmok: { modernName_zh:"道峰區巷弄", tag_zh:"首爾生活氣息", description_zh:"呈現首爾生活氣息的道峰區一帶巷弄風景。", travelTip_zh:"這裡是住宅區，拍照時請留意居民感受。" },
      yeouido: { modernName_zh:"汝矣島", tag_zh:"與都會的對比", description_zh:"作為與遊戲場世界形成對比的都會背景登場的首爾金融街。", travelTip_zh:"很適合和漢江公園一起散步的區域。" },
      wolmido: { modernName_zh:"仁川 月尾島", tag_zh:"回憶與遊戲", description_zh:"拍攝奇勳兒時回憶與遊戲場景的仁川遊樂園區域。", travelTip_zh:"可以同時享受遊樂園與海景的地方。" },
      seongapdo: { modernName_zh:"松岬島設定・島嶼拍攝範圍（仁川舞衣島周邊）", tag_zh:"遊戲場外觀（實際位於仁川一帶）", description_zh:"劇中設定為遊戲場所在島嶼的地方，實際上是在仁川近郊的島嶼群拍攝。", travelTip_zh:"拍攝場景不對外開放，但可透過周邊島嶼之旅感受氛圍。" },
      daejeonstudio: { modernName_zh:"大田攝影棚（Daejeon Studio Cube）", tag_zh:"大型遊戲場景搭建地", description_zh:"搭建大型遊戲場景的大田攝影棚。", travelTip_zh:"一般不對外開放，需事先確認。" },
      incheonislands: { modernName_zh:"仙甲島・仁川島嶼群", tag_zh:"粉絲關注景點", description_zh:"在粉絲之間成為話題、被視為實際拍攝候補地的島嶼範圍。", travelTip_zh:"從仁川可搭船抵達多座島嶼。" },
      seoulsubway: { modernName_zh:"首爾地鐵（乙支路3街站一帶）", tag_zh:"招募場景", description_zh:"拍攝參賽者招募場景的首爾地鐵站。", travelTip_zh:"目前仍正常運行的地鐵站。" },
      yaksuseoksin: { modernName_zh:"藥水站・新設洞等", tag_zh:"城市移動場景", description_zh:"拍攝城市移動場景的首爾各地區。", travelTip_zh:"搭地鐵即可輕鬆往返的地區。" },
      incheonairport: { modernName_zh:"仁川機場", tag_zh:"結局部分的移動場景", description_zh:"拍攝結局部分移動場景的韓國門戶機場。", travelTip_zh:"從首爾市區搭機場鐵路即可輕鬆抵達。" },
      squidgameexhibit: { modernName_zh:"場景展示・體驗空間（期間限定快閃店）", tag_zh:"體驗展覽", description_zh:"重現遊戲場景的期間限定體驗展覽在首爾舉辦的空間。", travelTip_zh:"展覽檔期會不時異動，建議出發前確認。" }
    }
  },

  kdemonhunters: {
    work: {
      title_zh: "Kpop 獵魔女團",
      author_zh: "瑪姬・姜、Chris Appelhans 執導 · Sony Pictures Animation · Netflix",
      era_zh: "現代",
      summary_zh: "K-pop女子團體HUNTR/X的Rumi、Mira、Zoey在舞台上是世界巨星，台下卻是狩獵惡魔、守護人類靈魂的獵人。隨著勁敵男團「Saja Boys」登場，音樂上的競爭與對抗惡魔的戰鬥交織在一起。"
    },
    locations: {
      nseoultower: { modernName_zh:"N首爾塔", tag_zh:"首爾天際線・Saja Boys的舞台", description_zh:"聳立在南山山頂的展望塔。Saja Boys演唱《Your Idol》的虛構體育場就設定在這座塔下方，是全片最具象徵性的場景背景。", travelTip_zh:"搭纜車上山還能一併欣賞夜景。" },
      bukchon: { modernName_zh:"北村韓屋村", tag_zh:"屋頂合唱・傳統巷弄", description_zh:"傳統韓屋密集的巷弄，常被認為是劇中屋頂合唱場景的背景原型，表現出韓國傳統美與獵人血脈的意象。", travelTip_zh:"這裡仍有居民實際生活，清晨參觀請保持安靜。" },
      cheongdambridge: { modernName_zh:"清潭大橋", tag_zh:"「Takedown」戰鬥場景", description_zh:"橫跨漢江的橋樑，是列車上展開的「Takedown」戰鬥場景的原型地。", travelTip_zh:"比起橋本身，更推薦從河岸步道眺望。" },
      hangang: { modernName_zh:"漢江（蠶室一帶）", tag_zh:"寧靜片刻・蠶室漢江", description_zh:"貫穿首爾的大河，蠶室段尤其被視為角色們暫時卸下巨星壓力與獵魔雙重生活重擔的寧靜場景原型。寬闊的步道與自行車道、映在江面上的夜景是其特色。", travelTip_zh:"配合盤浦彩虹噴泉的時間造訪，夜景會更加華麗。" },
      gyeongbokgung: { modernName_zh:"景福宮", tag_zh:"宮殿・傳統美", description_zh:"朝鮮王朝正宮，是強調宮殿與傳統美場景的原型，也是首爾代表性古宮。", travelTip_zh:"穿韓服可免門票入場。" },
      naksanpark: { modernName_zh:"駱山公園", tag_zh:"城郭・夜景", description_zh:"保留舊漢陽都城城郭的公園，是連結夜景與城郭動線場景的背景原型。", travelTip_zh:"黃昏時分造訪可同時欣賞城郭與市區夜景。" },
      olympicstadium: { modernName_zh:"首爾奧林匹克主競技場", tag_zh:"大型演唱會意象", description_zh:"經常舉辦大型演唱會的綜合競技場，是劇中大規模演出畫面的原型地。", travelTip_zh:"配合實際K-pop演唱會場次造訪會更有臨場感。" },
      myeongdong: { modernName_zh:"明洞", tag_zh:"K-pop・購物街", description_zh:"首爾代表性商圈，是表現K-pop、購物與街頭能量場景的背景原型。", travelTip_zh:"傍晚造訪可同時欣賞街頭表演與繽紛霓虹。" },
      coexkpop: { modernName_zh:"COEX K-POP廣場", tag_zh:"大型媒體牆・粉絲體驗", description_zh:"設有巨大媒體牆並舉辦K-pop粉絲活動的江南商業空間，是粉絲文化體驗內容的原型。", travelTip_zh:"建議事先確認媒體牆播放時間。" },
      nationalmuseum: { modernName_zh:"國立中央博物館", tag_zh:"傳統文物・文化元素", description_zh:"韓國規模最大的博物館，是傳統文物與文化元素延伸的素材來源。", travelTip_zh:"常設展免費參觀。" },
      yangnyeongsi: { modernName_zh:"首爾藥令市（K-Medi Center）", tag_zh:"傳統文化體驗", description_zh:"傳統韓方藥材市場，是傳統文化體驗內容的背景原型。", travelTip_zh:"K-Medi Center也有提供韓方體驗課程。" },
      jamsil: { modernName_zh:"蠶室・江南", tag_zh:"演唱會・粉絲經濟動線", description_zh:"大型演出場館與粉絲商圈密集的地區，是演唱會與粉絲消費動線的原型地。", travelTip_zh:"很適合和樂天世界塔展望台一起造訪。" }
    }
  },

  daejanggeum: {
    work: {
      title_zh: "大長今",
      author_zh: "李丙勳 執導 · 金榮昡 編劇",
      era_zh: "2003～2004年播出（MBC）・以朝鮮中宗時期（16世紀）為背景",
      summary_zh: "2003～2004年於MBC播出、外銷至91個國家的時代劇。描寫出身水刺間宮女的長今，一路成長為朝鮮第一位女御醫的歷程。角色原型取自《朝鮮王朝實錄》中確實記載的醫女「大長今」。"
    },
    locations: {
      yangju_theme_park: { modernName_zh:"楊州大長今主題公園舊址（京畿楊州，已關閉）", tag_zh:"實際拍攝地 — 原始場景（現已關閉）", description_zh:"為拍攝《大長今》實際搭建的原始場景，重現了宮殿露天場景、水刺間、燒酒房、東軒等空間，2004年對外開放，但因安全問題與設施老化於2011年底關閉。部分場景其後遷移、復原至龍仁大長今公園。", travelTip_zh:"位於京畿道楊州市晚松洞，舊MBC文化洞山內。2011年關閉後不再對外開放參觀。" },
      yongin_daejanggeum_park: { modernName_zh:"龍仁大長今公園（京畿龍仁，原始場景的後繼地）", tag_zh:"實際拍攝地 — 原始場景的後繼地（2015年更名，並非原始拍攝地）", description_zh:"如今被稱為「大長今公園」的這個地方，其實並非2003年《大長今》播出當時的實際拍攝地。這裡原本是另一座時代劇綜合場景「MBC Dramia」，2011年楊州場景關閉後，於2015年8月借用大長今IP更名為「大長今公園」，並遷移、復原了部分楊州場景。其他時代劇也曾在此拍攝。", travelTip_zh:"位於京畿道龍仁市處仁區白岩面龍泉Drama路。門票成人11,000韓元（2026年基準），全年開放。" },
      jeju_folk_village: { modernName_zh:"濟州民俗村博物館（濟州西歸浦市表善面）", tag_zh:"實際拍攝地 — 長今流放濟州的場景", description_zh:"拍攝長今被流放濟州時期官衙、茅屋場景的地方。2003年12月曾在此拍攝17天，至今仍保留拍攝說明看板、拍照區，以及展示戲服、劇本、藥草、醫療器具的小型主題公園。", travelTip_zh:"位於濟州西歸浦市表善面民俗海岸路。作為博物館全年營業。" },
      hyeopjae_beach: { modernName_zh:"挾才海水浴場（濟州濟州市）", tag_zh:"實際拍攝地 — 長今與閔政浩的海邊場景", description_zh:"拍攝長今與閔政浩一同散步、乘船場景的海邊，是濟州西海岸代表性海水浴場，至今仍深受遊客喜愛。", travelTip_zh:"位於濟州濟州市翰林邑。以翡翠色海水聞名的海水浴場。" },
      naganeupseong: { modernName_zh:"樂安邑城（全南順天）", tag_zh:"實際拍攝地 — 市場・白丁村場景", description_zh:"拍攝市場與白丁村場景的朝鮮時代邑城，如今仍是有居民實際生活的民俗村，全年開放參觀。", travelTip_zh:"位於全羅南道順天市樂安面。作為有居民生活的民俗村全年可參觀。" },
      gyeongbokgung_sojubang: { modernName_zh:"景福宮 燒酒房（首爾鍾路區）", tag_zh:"有提及 — 具體場景尚未確認", description_zh:"多篇旅遊資訊將此地列為宮中水刺間相關場景的背景，但確切是哪一集哪個場景，尚未經一手資料證實，僅作參考資訊列出。", travelTip_zh:"位於首爾鍾路區景福宮內。配合宮殿開放時間全年可參觀。" },
      hwaseong_haenggung: { modernName_zh:"華城行宮（京畿水原）", tag_zh:"有提及 — 具體場景尚未確認", description_zh:"常被提及為宮廷時代劇拍攝地的行宮，但《大長今》具體拍攝場景尚未經一手資料證實，僅作參考資訊列出。", travelTip_zh:"位於京畿道水原市八達區。全年開放的觀光景點。" }
    }
  },

  wintersonata: {
    work: {
      title_zh: "冬季戀歌",
      author_zh: "尹錫湖 執導 · 尹恩景、金恩熙 等 編劇",
      era_zh: "2002年播出（KBS2）",
      summary_zh: "2002年於KBS2播出、被視為韓流起點的愛情劇。描寫高中時期陷入三角關係的俊相、有真、相赫，十年後重逢後展開的故事。南怡島的水杉林蔭道至今仍是韓流觀光的象徵。",
      hookBadge_zh: "2002年 KBS2 · 韓流起點 · 裴勇俊 × 崔智友",
      hookTagline_zh: "媽媽的大頭貼，到現在還是那個地方",
      discoveryHook_zh: [
        "媽媽IG的大頭貼，已經好幾年都沒換過。積著雪的林蔭道，白茫茫地延伸開來，像被霧籠罩過一樣的樹木隧道。我還以為是她最近去哪裡旅行拍的，一問才知道，媽媽笑著說『那是南怡島啦，冬季戀歌的拍攝地』。",
        "『冬季戀歌』這個名字我聽過，但頂多只知道『媽媽那一代喜歡的老劇』，其實一集都沒看過。畢竟是2002年的劇，我根本還沒出生。",
        "於是我在YouTube上找了找。像是『冬季戀歌 經典場面合輯』『冬季戀歌 結局整理』這類標題的影片，點閱數動輒好幾百萬。都已經是20多年前的戲了，居然到現在還有這麼多人在看，讓我有點驚訝。",
        "點開幾支來看，畫質雖然不像現在的劇那麼清晰，卻莫名讓人移不開視線。裴勇俊摘下眼鏡那短短三秒的畫面，留言竟然超過八千則，還附註『就靠這一幕讓全日本為之瘋狂』。",
        "日本的大嬸們為了看裴勇俊一眼，成群結隊跑來韓國的事，我從小聽到大耳朵都長繭了。以前總覺得『媽媽那輩人是不是太誇張了』，直到我在影片裡看到當年的粉絲見面會畫面才明白，那真的不是誇張。機場閘門前排滿人潮、有人哭到不能自己、還有手工做的大布條。",
        "滑著留言區，發現不少跟我差不多年紀的人也在留言『和媽媽一起看的』『希望能重拍』。原來遲到的不只我一個。",
        "接著我去查了實際的拍攝地，媽媽那麼喜歡的那條林蔭道，是真的存在的，現在還好好留在南怡島上，甚至有個「冬季戀歌之路」的暱稱，連指示牌都立在那裡。",
        "但不是每個地方都還在。兩人一起走過的湖邊——中島樂園，如今已經蓋起了樂高樂園韓國，那片風景整個消失了。俊相住過的春川那棟房子，聽說2021年終於也被拆掉了。",
        "我把這件事講給媽媽聽，她沉默了一下，只淡淡回了句『這樣啊』。YouTube留言區裡那股熱度，和媽媽此刻的平靜沉默之間，好像正好夾著二十年的時間。",
        "不過拍結局的巨濟外島，聽說還完好保留著。結局的片段我也找來看了，雖然大概大家都知道結局是什麼，但那最後一幕的氛圍，我覺得還是該自己親眼看過比較好，所以就不寫在這裡了。",
        "光靠幾支剪輯片段，遲來地認識了媽媽那一代的劇，卻覺得有點奇妙——這不只是一段過去的故事，而是真實存在於媽媽二十多歲某個時刻的地方。不是畫面裡的風景，而是真實存在的座標。",
        "下次有機會去南怡島，我想用和媽媽大頭貼一樣的角度拍一張。這次要先把全劇好好看完再去。"
      ]
    },
    locations: {
      chuncheon_high_school: { modernName_zh:"春川高中石牆路（江原春川）", tag_zh:"實際拍攝地 — 高中時期背景", description_zh:"俊相、有真、相赫就讀的高中，是真實存在的學校。因為至今仍是有學生上課的現役學校，拍攝主要集中在外牆與石牆路一帶。春川市在市內12處設立說明看板時，這裡也被列入其中。", travelTip_zh:"位於江原道春川市。現役學校，僅能參觀外觀。" },
      namiseom_treelined: { modernName_zh:"南怡島水杉林蔭道 —「戀人之森」（江原春川）", tag_zh:"實際拍攝地 — 俊相與有真的林蔭道場景", description_zh:"俊相與有真翹掉自習課、一起漫步的道路。高聳入雲的水杉樹林形成的隧道，是《冬季戀歌》最經典場面的背景。播出後獲得「冬季戀歌之路」的暱稱，至今仍立有拍攝地指示牌。", travelTip_zh:"位於江原道春川市南山面芳荷里、南怡島內。需購票入場（成人19,000韓元，2026年基準）。" },
      namiseom_bike: { modernName_zh:"南怡島自行車道（江原春川）", tag_zh:"實際拍攝地 — 自行車約會場景", description_zh:"兩人並肩騎自行車奔馳而過的南怡島環狀道路，現在同一條路上仍可租借自行車。", travelTip_zh:"南怡島內設有自行車租借服務。" },
      namiseom_sculpture: { modernName_zh:"南怡島雕塑公園 — 戀人雕像（江原春川）", tag_zh:"實際拍攝地 — 初吻場景", description_zh:"劇中兩人初吻場景據信在這座雕塑公園一帶拍攝。如今立有以裴勇俊、崔智友為原型的戀人雕像，是粉絲的紀念拍照地標。", travelTip_zh:"位於南怡島內的雕塑公園區域。" },
      joongdo: { modernName_zh:"中島樂園（江原春川，現為樂高樂園韓國園區）", tag_zh:"實際拍攝地 — 湖邊場景（現已消失）", description_zh:"俊相與有真沿著湖邊散步、確認彼此心意的地方。播出當時是一座樸素的遊樂園，2022年這片土地上開幕了樂高樂園韓國度假村，當年的風景已不復見。", travelTip_zh:"位於江原道春川市中島洞。現址為樂高樂園韓國度假村，已看不到當年風貌。" },
      junsang_house: { modernName_zh:"俊相的家 舊址（江原春川昭陽路，已拆除）", tag_zh:"實際拍攝地 — 俊相的家（現已拆除）", description_zh:"作為姜俊相春川時期住家登場的真實房屋。播出後近20年間一直是粉絲朝聖地，2021年被出售給重建組合後遭到拆除。據報導家中的鋼琴等道具原訂展示於鄰近重建公寓社區的公園內，但實際是否執行尚未確認。", travelTip_zh:"位於江原道春川市昭陽路2街一帶（確切地號因資料而異）。目前已拆除，改為重建用地。" },
      chuncheon_station: { modernName_zh:"春川站（江原春川）", tag_zh:"實際拍攝地 — 畢業旅行出發場景（站舍後來重建）", description_zh:"與朋友們一同出發畢業旅行那天登場的車站。2010年京春線電氣化複線後新建了站舍，與劇中當年的舊站舍外觀不同。", travelTip_zh:"位於江原道春川市，京春線春川站。現有站舍為2010年新建。" },
      myeongdong_chuncheon: { modernName_zh:"春川明洞街・中央圓環（江原春川）", tag_zh:"實際拍攝地 — 市區場景", description_zh:"有真得知俊相發生意外消息等場景登場的春川市區商圈，至今仍是春川代表性的市中心商業區。", travelTip_zh:"位於江原道春川市明洞一帶，現今仍是營業中的商圈。" },
      yongpyeong: { modernName_zh:"龍平度假村（江原平昌，劇中「White滑雪場」）", tag_zh:"實際拍攝地 — 劇中「White滑雪場」", description_zh:"十年後，有真與李珉亨（俊相）因滑雪場整修計畫而重逢的地方。現實中也是韓國第一座綜合滑雪度假村，至今仍在營業。", travelTip_zh:"位於江原道平昌郡龍平面。滑雪季之外也全年作為度假村營業。" },
      oedo: { modernName_zh:"外島（外島Botania，慶南巨濟）", tag_zh:"實際拍攝地 — 最終回結局場景", description_zh:"劇集最終回，面臨失明危機的俊相與有真重逢、確認彼此心意的結局拍攝地。懸崖上異國風情的庭園景致，為兩人的故事畫下句點。", travelTip_zh:"位於慶尚南道巨濟市一運面外島路17號。僅能搭船抵達的私人植物園。" }
    }
  },

  coffeeprince: {
    work: {
      title_zh: "咖啡王子1號店",
      author_zh: "李允貞 執導 · 李正娥、張賢珠 編劇，李善美 原著小說",
      era_zh: "2007年播出（MBC）",
      summary_zh: "2007年於MBC播出的浪漫喜劇。為了分擔家計而女扮男裝的恩燦，進入咖啡廳「咖啡王子1號店」工作，與老闆韓結因誤會而展開的戀情。播出當時創下最高收視率27.8%。",
      hookBadge_zh: "2007年 MBC · 最高收視率27.8% · 孔劉 × 尹恩惠",
      hookTagline_zh: "媽媽KTV的必點曲，原來是這部劇的OST",
      discoveryHook_zh: [
        "媽媽的KTV必點歌單裡，到現在還有Nell的歌。我問是什麼歌，媽媽立刻說『這不是咖啡王子的OST嗎』，還馬上哼了起來。",
        "她說是2007年的劇，那時候我根本還沒出生。但聽媽媽講起來，好像不能只當成一部普通的老劇看待。她說當年看完還特地跑去弘大找那間咖啡廳，講的時候還有點得意。",
        "我在YouTube搜尋『咖啡王子 經典場面』『孔劉 尹恩惠 化學反應』，跳出好幾支剪輯影片，每支點閱數都好幾百萬，留言也有好幾千則。甚至還有2020年代『咖啡王子重新翻紅』的新聞剪輯。",
        "光聽劇情大綱其實有點尷尬——女生女扮男裝進咖啡廳工作，老闆誤以為對方是男生，還提議『乾脆假裝是Gay』。但剪輯片段裡兩人之間的氛圍比我想像中自然許多。孔劉一臉驚訝又忍不住笑出來的那個節奏感，就算用現在的剪輯手法看，也完全不覺得過時。",
        "媽媽說當年最高收視率是27.8%。換算成現在的感覺，等於幾乎全國人民都在同一時間看同一台。這個數字對我來說有點難以想像。",
        "我問那間咖啡廳是不是真的存在，媽媽說真的在西橋洞，從弘大入口站爬坡上去就到了。那現在還在嗎？媽媽說她也不知道，於是我自己查了查。",
        "查完才發現，現在……已經歇業了。荒廢了五、六年，甚至還有新聞說這間店正以百億韓元的價格求售。YouTube上有支影片叫『咖啡王子的咖啡廳 現在的樣子』，畫面裡積滿灰塵的窗戶讓人看了有點感慨——媽媽的回憶之地變成這樣，心情有點微妙。",
        "不過崔漢成（李善均飾）家所在的付岩洞山轉角咖啡廳，聽說至今仍在營業。就是他和愛犬一起生活的那個家。",
        "我跟媽媽說咖啡王子那間咖啡廳已經沒了，她明顯失落了一下，說『那裡明明很漂亮的』，還接著聊了好一會兒當年的事。那天我才第一次真切感受到，原來媽媽也曾經有過二十多歲。",
        "當年媽媽的年紀，跟現在的我差不多，這件事讓我覺得有點不可思議。都快要20年的劇了，對媽媽來說卻好像還是『那時候的那部劇』；對我來說，卻只是YouTube演算法推薦給我的幾支短片而已。",
        "山轉角咖啡廳聽說還在，這週末想帶媽媽去看看。就算咖啡廳的場景消失了，至少還留著一個地方，也算是一點安慰。到了那邊，也想放放看Nell的那首歌。"
      ]
    },
    locations: {
      coffeeprince_cafe: { modernName_zh:"咖啡王子1號店咖啡廳場景（首爾麻浦區西橋洞）", tag_zh:"實際拍攝地 — 咖啡廳場景（現已歇業荒廢）", description_zh:"韓結和恩燦工作的咖啡廳「咖啡王子1號店」外觀與內部的實際拍攝地，位於弘大入口站沿臥牛山路上坡處。播出後長年是粉絲朝聖地，約2019～2020年間歇業後便荒廢至今，截至2025年仍以廢墟狀態、開價百億韓元求售。", travelTip_zh:"位於首爾麻浦區西橋洞337-2（臥牛山路29街5號）。目前歇業中，無法入內參觀，僅能觀看外觀。" },
      sanmotungi_cafe: { modernName_zh:"山轉角咖啡廳（首爾鍾路區付岩洞）", tag_zh:"實際拍攝地 — 崔漢成的家", description_zh:"作為崔漢成（李善均飾）自宅登場的咖啡廳，劇中描寫為他與愛犬「率子」一起生活的家。目前仍以咖啡廳形式營業，是韓劇拍攝地巡禮的熱門去處，訪客絡繹不絕。", travelTip_zh:"位於首爾鍾路區付岩洞、白石洞路153號。目前以咖啡廳形式營業中。" },
      hangyul_house_set: { modernName_zh:"崔韓結自宅場景舊址（首爾中區藝場洞）", tag_zh:"實際拍攝地 — 崔韓結的家（現已拆除）", description_zh:"作為崔韓結（孔劉飾）宅邸登場的場景舊址，是在南山首爾動畫中心（「漫畫之家」）園區內特別搭建的拍攝用場景，拍攝結束後隨即拆除，目前已不存在。", travelTip_zh:"位於首爾中區藝場洞，首爾動畫中心附近。場景已拆除，現已不存在。" },
      eunchan_neighborhood: { modernName_zh:"高恩燦的社區（首爾恩平區鷹岩洞一帶）", tag_zh:"實際拍攝地 — 恩燦的社區（具體位置尚未確認）", description_zh:"扛起家計的恩燦與母親金智香、妹妹恩世一起生活的頂樓加蓋房與社區。具體建築尚未被確認，但鷹岩洞一帶被認為是這個場景的背景地。", travelTip_zh:"一般認為位於首爾恩平區鷹岩洞一帶，但確切建築尚未經證實。" },
      bukak_skyway: { modernName_zh:"北岳天際路（首爾鍾路區・城北區）", tag_zh:"實際拍攝地 — 韓結的慢跑場景", description_zh:"崔韓結反覆慢跑場景中登場的環狀道路，至今仍是首爾市民熱愛的兜風、散步路線。", travelTip_zh:"位於首爾鍾路區與城北區交界，北岳山環狀道路。公共道路，全天可通行。" }
    }
  },

  poksshak: {
    work: {
      title_zh: "苦盡柑來遇見你 (When Life Gives You Tangerines)",
      author_zh: "編劇 林尚春 · 導演 金元錫",
      era_zh: "1950年代～現在",
      summary_zh: "1950年代的濟州島。16歲的愛純是個「比起參考書更想寫詩、聰明又帶點反骨」的少女。她與嘴硬心軟的少年寬植結下的緣分，如四季流轉般延伸成長達70餘年的人生故事。貧困與離別，以及一次次的重逢——這是一段刻寫在濟州這片土地上的夫妻人生故事。"
    },
    locations: {
      seongsan_ilchulbong: { modernName_zh:"濟州西歸浦市 — 城山日出峰", tag_zh:"三千拜場景", description_zh:"婚後遲遲未能懷孕的愛純與婆婆一同行三千拜的場景，是劇中最催淚的一幕的實際拍攝地。聯合國教科文組織世界自然遺產。", travelTip_zh:"從濟州市外巴士客運站搭巴士約1小時20分。也是著名的日出景點。" },
      gimnyeong_beach: { modernName_zh:"濟州濟州市 — 金寧海水浴場", tag_zh:"童年時期・海女", description_zh:"拍攝愛純與寬植童年時期，以及兩人母親輩海女生活場景的海灘。", travelTip_zh:"從濟州市區搭巴士約40分鐘。以翡翠色海水聞名的海灘。" },
      hyeopjae_beach: { modernName_zh:"濟州西歸浦市 — 挾才海水浴場", tag_zh:"浪漫場景", description_zh:"愛純與寬植戲水、眺望夕陽——劇中最溫馨的一幕拍攝地。", travelTip_zh:"從濟州市區搭巴士約1小時。以能望見飛揚島的白沙灘聞名。" },
      seopjikoji: { modernName_zh:"濟州西歸浦市 — 涉地岬", tag_zh:"海岸散步道", description_zh:"劇中最令人印象深刻的散步場景之一——並肩走向燈塔的畫面，就是在這座海岸丘陵拍攝。", travelTip_zh:"距城山日出峰車程約10分鐘。油菜花季節更是熱門。" },
      ora_buckwheat_field: { modernName_zh:"濟州濟州市梧羅洞 — 蕎麥花田", tag_zh:"蕎麥花田", description_zh:"一整片白色蕎麥花盛開之處，是劇中浪漫場景的背景。播出後訪客大幅增加。", travelTip_zh:"從濟州市區車程約20分鐘。花期（9～10月）造訪最佳。" },
      gasi_canola_field: { modernName_zh:"濟州西歸浦市表善面加時里 — 油菜花田", tag_zh:"初吻場景", description_zh:"愛純與寬植初吻場景的背景——黃澄澄的油菜花田，鄰近迷你馬體驗公園的一片原野。", travelTip_zh:"距表善海水浴場車程約15分鐘。油菜花3～4月盛開。" },
      jejumok_gwana: { modernName_zh:"濟州濟州市 — 濟州牧官衙", tag_zh:"舊濟州官署", description_zh:"復原朝鮮時代濟州地方官署的地方，是劇中舊濟州市街場景的背景。", travelTip_zh:"位於濟州市中央圓環附近，市中心可步行抵達。" },
      andong_set: { modernName_zh:"慶北安東市豐川面 — 道洞里場景遺址（慶北道廳新都市）", tag_zh:"實際拍攝場景（已拆除）", description_zh:"劇中1950～60年代「道洞里」村莊場景，大部分其實不是在濟州，而是在這裡的安東搭景拍攝。當時重現了80多間茅草屋、石牆、港口，甚至4艘漁船，但拍攝結束後已拆除，如今只剩遺址。", travelTip_zh:"距安東市區車程約15分鐘。場景雖已拆除，仍可與安東市區觀光一併安排。" },
      andong_lake: { modernName_zh:"慶北安東市 — 安東湖及周邊湖畔", tag_zh:"真實湖泊背景", description_zh:"位於「道洞里」場景附近的真實湖泊，用來補充場景中人工海景的真實水岸背景。", travelTip_zh:"距安東・道洞里場景遺址車程約20～30分鐘。" },
      yeoncheon_set: { modernName_zh:"江原漣川 — 時代變遷街景場景遺址", tag_zh:"時代變遷場景（已拆除）", description_zh:"為重現1960年代至2025年現今、跨越60年變化的街道與建築而搭建的大型露天場景。與安東場景一同在拍攝結束後拆除。", travelTip_zh:"場景本身已不存在，可與漣川郡一帶觀光一併安排。" },
      gochang_hagwon_farm: { modernName_zh:"全北高敞郡 — 鶴園農場青麥田", tag_zh:"初吻真實拍攝地", description_zh:"許多觀眾以為愛純與寬植初吻場景的油菜花田是在濟州，其實是在這裡的高敞青麥田拍攝，再用電腦動畫加上濟州的海。", travelTip_zh:"每年4～5月青麥節期間造訪，最能看到與劇中畫面最相近的風景。" },
      daegu_gyesan_set: { modernName_zh:"大邱中區桂山洞 — 桂山聖堂周邊露天場景", tag_zh:"1960年代市場場景", description_zh:"1960年代，年幼的愛純與寬植賣高麗菜與魚——韓戰剛結束不久的市場場景，就是在這座近代建築桂山聖堂周邊的露天場景拍攝。脖子上掛著尋找戰爭失散家人牌子的老奶奶等畫面，映照出那個時代的傷痕。", travelTip_zh:"此地包含在大邱市中心近代巷弄導覽路線內，方便一併參觀。" },
      chilgok_gasil_cathedral: { modernName_zh:"慶北漆谷郡 — 佳室聖堂", tag_zh:"錦明的婚禮場景", description_zh:"建於1895年的紅磚哥德式聖堂，後來成為錦明婚禮場景的背景。", travelTip_zh:"距大邱車程約40分鐘。聖堂庭園優美，也是熱門拍照景點。" },
      gwangju_theater: { modernName_zh:"光州東區 — 光州劇場（劇中「Ganeu劇場」）", tag_zh:"錦明首爾・光州時期的核心舞台", description_zh:"1935年開館，是韓國歷史最悠久的單廳電影院。劇中長大後的錦明在此擔任售票處打工，朴春燮擔任看板畫師，登場為「Ganeu劇場」。這裡是她與從首爾歸來的戀人朴永範重逢，也與春燮結下緣分的故事後半核心空間。", travelTip_zh:"至今仍以真實電影院形式營業，主要上映藝術片與獨立電影。" },
      jeongeup_chilbo_ms: { modernName_zh:"全北井邑市七寶面 — 七寶中學校", tag_zh:"學生時期拍攝地", description_zh:"已知為劇中學生時期場景的實際拍攝地之一的學校。", travelTip_zh:"從井邑市區車程約30分鐘。" },
      jeonju_paldalro: { modernName_zh:"全北全州市完山區 — 八達路一帶", tag_zh:"市街拍攝地", description_zh:"確認為劇中市街場景拍攝地的全州舊市區街道。", travelTip_zh:"從全州韓屋村可步行抵達。" },
      jeonbuk_univ_hospital: { modernName_zh:"全北全州市德津區 — 全北大學校醫院", tag_zh:"醫院場景拍攝地", description_zh:"確認為劇中醫院場景實際拍攝地的地方。", travelTip_zh:"距全州市中心不遠。" },
      jeonnam_univ: { modernName_zh:"光州北區龍鳳洞 — 全南大學校", tag_zh:"大學時期拍攝地", description_zh:"確認為劇中大學時期場景拍攝地的校園，地理上也與光州劇場一帶錦明・春燮的故事相連。", travelTip_zh:"距光州劇場車程約15分鐘，適合與光州拍攝地路線一併安排。" },
      jongno_joongang_hs: { modernName_zh:"首爾鍾路區 — 中央高等學校", tag_zh:"首爾場景實際拍攝地", description_zh:"1908年創校、歷史悠久的首爾名校，確認為劇中首爾背景場景的實際拍攝地。", travelTip_zh:"近代建築本身也頗負盛名，校園值得一看。鄰近北村、三清洞可一併造訪。" },
      unmunsa_temple: { modernName_zh:"慶北清道郡雲門面 — 雲門寺", tag_zh:"寺院場景拍攝地", description_zh:"拍攝劇中造訪寺院場景的真實千年古剎。", travelTip_zh:"寺內有樹齡超過500年的垂枝松（天然紀念物），值得一併參觀。" },
      busan_maechukji: { modernName_zh:"釜山東區 — 埋築地村", tag_zh:"愛純與寬植私奔場景", description_zh:"韓戰避難民定居形成的村落，保留著狹窄巷弄與簡陋屋舍。19歲的寬植與18歲的愛純私奔的場景就在此拍攝。", travelTip_zh:"位於釜山舊市區（凡一洞）一帶。以保留1960～70年代風情的巷弄導覽路線聞名。" },
      yeosu_opening: { modernName_zh:"全南麗水市", tag_zh:"片頭實際拍攝地", description_zh:"劇集開場的片頭場景，其實不是在濟州，而是在這裡的麗水拍攝，此事在播出後成為話題。", travelTip_zh:"以「麗水夜海」聞名的觀光城市，可與梧桐島、麗水海上纜車一同遊覽。" },
      seoul_national_univ: { modernName_zh:"首爾冠岳區 — 首爾大學校", tag_zh:"錦明的大學時期", description_zh:"離開濟州的錦明於1987年就讀的英文系所在地。錦明的初戀、同時也是她首爾緣分的朴永範也出身這裡的法學部，兩人的首爾故事由此展開。", travelTip_zh:"位於冠岳山山麓。校園範圍廣闊，建議事先規劃路線。" },
      cheongsim_camp: { modernName_zh:"濟州 — 清心國際海洋青少年修練院", tag_zh:"青少年時期拍攝地", description_zh:"確認為劇中青少年時期團體活動場景拍攝地的海洋青少年研修設施。", travelTip_zh:"位於濟州東部海岸附近。" },
      udo_island: { modernName_zh:"濟州濟州市 — 牛島", tag_zh:"自行車約會場景", description_zh:"從城山港搭船可達的小島。劇中兩人騎自行車、悠閒度過時光的場景就在此拍攝。", travelTip_zh:"從城山日出峰附近的城山港搭渡輪約15分鐘。" },
      hamdeok_seowoobong: { modernName_zh:"濟州濟州市朝天邑 — 咸德海水浴場・犀牛峰", tag_zh:"海邊對話場景", description_zh:"以翡翠色海水、白沙灘，以及春天將犀牛峰染成一片黃色的油菜花聞名的海灘。劇中兩人望著大海、深談的場景就在此拍攝。", travelTip_zh:"從濟州市區車程約30分鐘。犀牛峰油菜花3～4月盛開。" },
      jeju_folk_village: { modernName_zh:"濟州西歸浦市表善面 — 濟州民俗村", tag_zh:"1960年代村莊重現", description_zh:"完整重現濟州傳統房屋與生活樣貌的民俗村，用於重現劇中1960年代濟州村莊的樣貌。", travelTip_zh:"緊鄰表善海水浴場，方便一併參觀。" },
      jeju_oreum_trail: { modernName_zh:"濟州 — Oreum步道（龍眼岳周邊）", tag_zh:"散步場景反覆出現的背景", description_zh:"緩緩起伏的稜線綿延不絕，是濟州特有的Oreum（寄生火山）地形。劇中愛純與寬植並肩而行的散步場景背景多次出現於此。", travelTip_zh:"龍眼岳是來回30～40分鐘即可攻頂的平緩路線，相當知名。" }
    }
  }
};

/* ---------- 병합: 로드 시점에 WORKS/DATA에 _zh 필드를 심는다 ----------
   ja_content.js와 동일한 방식 — data.js와 각 *_locations.js보다 나중에, ja_content.js 이후에
   로드되어야 한다(HTML의 script 순서 참고). Object.assign은 재실행해도 무해(멱등)하므로
   지연 로딩으로 작품 데이터가 뒤늦게 도착할 때마다 재적용할 수 있도록 전역 함수로 노출한다. */
function applyZhContent(){
  if (typeof WORKS === 'undefined' || typeof DATA === 'undefined') return;
  Object.keys(ZH_CONTENT).forEach(function(workId){
    var pack = ZH_CONTENT[workId];
    var w = WORKS.find(function(x){ return x.id === workId; });
    if (w && pack.work) Object.assign(w, pack.work);
    var d = DATA[workId];
    if (d && d.locations && pack.locations){
      d.locations.forEach(function(loc){
        if (pack.locations[loc.id]) Object.assign(loc, pack.locations[loc.id]);
      });
    }
  });
}
applyZhContent();
