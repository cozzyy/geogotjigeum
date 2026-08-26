/* ============================================================
   콘텐츠 데이터 (works.json / daemang.json / kiminonawa.json / daemang_people.json 를
   브라우저에서 바로 읽을 수 있도록 JS 상수로 옮긴 파일)

   heroImage 작성 규칙 (신규 작품 추가 시 반드시 지킬 것):
   - 공식 포스터/스틸은 저작권이 있어 직접 호스팅하지 않음(대신 posterPage로 위키백과 등에 링크).
   - heroImage에는 그 작품의 배경이 되는 실존 장소·소재를 담은, 자유 라이선스(퍼블릭 도메인/CC)
     실사 이미지를 사용. 파일명은 반드시 웹 검색으로 실제 존재를 확인한 뒤 사용할 것 —
     추측으로 Wikimedia Commons 파일명을 만들어 넣으면 깨진 이미지로 뜬다(2026-08 삼체 건에서 실제 발생).
   - url은 https://commons.wikimedia.org/wiki/Special:FilePath/<파일명> 형식,
     creditUrl은 해당 File: 문서로 연결.
   ============================================================ */
const WORKS = [
  { id:"daemang", title:"대망 (徳川家康)", author:"야마오카 소하치", type:"historical", country:"japan", medium:"novel", genres:["historical","drama"],
    era:"전국시대~에도초기", title_en:"Daemang (Tokugawa Ieyasu)", author_en:"by Sohachi Yamaoka", era_en:"Sengoku period ~ early Edo period",
    summary:"여섯 살에 인질로 끌려간 소년은, 어떻게 260년 태평성대를 연 천하인이 되었을까? 오다 노부나가와 도요토미 히데요시, 두 천재가 차례로 무너진 자리에서 끝까지 살아남은 '제3의 남자'의 이야기다. 결말은 역사가 이미 알려주지만, 거기까지 가는 길은 배신과 인내, 예상 밖의 반전으로 가득하다.",
    longSummary:"대망을 처음 폈을 때 나는 그냥 '오래된 일본 역사소설이겠거니' 생각했다. 그런데 몇 챕터만 읽어도 알게 된다 — 이건 승리의 기록이 아니라, 지는 법을 아는 사람의 기록이라는 걸.\n\n주인공 이에야스는 이 시리즈에서 단 한 번도 '천재'로 그려지지 않는다. 노부나가처럼 번뜩이지도, 히데요시처럼 사람을 홀리지도 못한다. 대신 그는 참는다. 지독하게, 때로는 답답할 정도로. 그런데 이상하게도 그 답답함이 몇백 페이지를 넘기면서 어느 순간 통쾌함으로 바뀐다 — '저렇게까지 버티다니' 하며 응원하게 되는 순간이 온다.\n\n개인적으로 가장 좋아하는 건 이 소설이 '착한 사람이 이긴다'는 이야기가 아니라는 점이다. 이에야스도 살아남기 위해 냉정한 선택을 여러 번 한다. 대망이 지금까지도 일본 기업인들의 '필독서'로 꼽히는 이유도 여기 있다 — 인내에 관한 이야기이자, 동시에 권력이 얼마나 많은 걸 요구하는지에 관한 이야기이기도 하다.\n\n역사를 몰라도 상관없다. 결말이 궁금해서가 아니라, '다음엔 또 어떻게 버티나'가 궁금해서 페이지를 넘기게 되는 소설이다.",
    pinColor:"#e0603a",
    summary_en:"At six years old, he was sent away as a hostage. How did that boy grow up to become the ruler who built 260 years of peace? This is the story of the 'third man' who outlasted two brilliant rivals, Oda Nobunaga and Toyotomi Hideyoshi, and was still standing when the dust settled. You already know how it ends — but the road there is full of betrayal, patience, and turns you won't see coming.",
    longSummary_en:"When I first picked up Daemang, I assumed it would be just another old Japanese historical novel. A few chapters in, though, I realized this isn't a record of victory — it's a record of someone who knew how to lose.\n\nIeyasu is never portrayed as a genius in this series. He doesn't dazzle like Nobunaga or charm people like Hideyoshi. Instead, he endures — stubbornly, sometimes almost unbearably so. And strangely, after a few hundred pages, that unbearable patience starts to feel satisfying. You catch yourself rooting for him, thinking, 'how is he still holding on?'\n\nWhat I love most is that this isn't a story where 'the good guy wins.' Ieyasu makes plenty of cold, calculated choices to survive. That's part of why Daemang is still considered required reading for Japanese businesspeople today — it's a story about patience, but also about how much power demands of the person who holds it.\n\nYou don't need to know the history. You keep turning the pages not because you're wondering how it ends, but because you're wondering how he manages to hold on just a little longer.",
    communityNote:"이에야스·노부나가·히데요시 세 사람의 성격은 '울지 않는 두견새를 어떻게 할 것인가'라는 유명한 비유로 흔히 설명돼요 — 노부나가는 \"죽여버리마\", 히데요시는 \"울려 보이마\", 이에야스는 \"울 때까지 기다리마\". 야마오카 소하치가 17년에 걸쳐 완결한 총 26권 분량 자체도 독자 사이에서 자주 회자되는 화제입니다.",
    communityNote_en:"The personalities of Ieyasu, Nobunaga, and Hideyoshi are often summed up with a famous parable about a caged bird that won't sing: Nobunaga says 'kill it,' Hideyoshi says 'coax it to sing,' and Ieyasu says 'wait until it sings on its own.' Readers also often point to the sheer scale of the novel — 26 volumes written over 17 years by author Yamaoka Sohachi.",
    hookBadge:"야마오카 소하치 원작 · 26권 완결 대하소설 · 실존 인물·실제 촬영지", hookTagline:"《대망》 읽고 나서 이에야스 발자취가 자꾸 눈에 밟혔다",
    discoveryHook:[
      "이 사람, 진짜 있었던 사람이라고? 《대망》 읽으면서 몇 번을 되뇐 생각이다.",
      "26권짜리 대하소설이라고 해서 처음엔 그냥 각 잡고 읽을 마음의 준비만 했는데, 몇 챕터 넘기다 보니 어느 순간 이에야스가 소설 속 인물이 아니라 실존 인물이라는 게 자꾸 새삼스러워졌다.",
      "여섯 살에 인질로 끌려간 게 소설적 과장인 줄 알았는데, 실제로 이에야스는 오다 가문, 이어서 이마가와 가문으로 인질 신분이 넘어가면서 슨푸에서 셋사이 선사한테 학문을 배웠다고 한다. 어린 시절부터 참는 법부터 배운 사람이었던 거다.",
      "그래서 좀 찾아봤다. 태어난 오카자키성부터, 지금도 아이치현에 그대로 있고 복원된 천수각까지 볼 수 있더라.",
      "소설 초반은 사실 버티기의 연속이다. 오케하자마 전투에서 노부나가가 이마가와 요시모토를 꺾어준 덕에 독립할 기회를 얻고, 노부나가와 기요스 동맹을 맺으면서 거의 20년 가까이 협력 관계를 이어간다.",
      "근데 이 동맹이 순탄하지만은 않다. 다케다 신겐한테 미카타가하라 전투에서 크게 깨지는데, 신겐이 갑자기 죽으면서 최악의 위기를 넘긴다. 이후 나가시노 전투에서는 반대로 조총 전술로 다케다 가문에 결정타를 날린다.",
      "근데 개인적으로 제일 마음 아팠던 대목은 노부야스·쓰키야마도노 사건이다. 동맹 관계 안에서 이에야스가 자기 아내와 아들을 잃는 개인적 비극을 겪는데, 이게 그냥 지어낸 서브플롯이 아니라 실제로 있었던 일이라는 걸 알고 나니 소설이 다르게 읽혔다.",
      "그리고 혼노지의 변. 노부나가가 급사하자 이에야스는 사카이에서 목숨을 건 탈출을 감행하는데, 이게 그 유명한 '이가고에'다. 진짜 죽을 뻔한 순간이었다고.",
      "노부나가 죽고 나서는 이번엔 히데요시랑 붙는다. 고마키·나가쿠테 전투에서는 군사적으로 이에야스가 우위였는데, 결국 정치적으로 봉합되면서 오사카성에서 히데요시한테 정식으로 신종한다. 이 대목에서 좀 답답했는데, 이게 바로 이 소설이 말하는 '참는 법'인 것 같다.",
      "심지어 관동 이봉으로 본거지를 떠나 당시엔 늪지투성이였던 간토, 그러니까 훗날의 에도로 강제 이주까지 당한다. 조선 출병에도 전면에 나서지 않고 그냥 세력을 온존시키면서 때를 기다린다.",
      "이 인내가 결국 세키가하라 전투에서 서군(이시다 미쓰나리 등)을 격파하면서 보답받는다. 정이대장군에 올라 에도 막부를 열고 공식적으로 '천하인'이 된 거다.",
      "근데 여기서 끝이 아니다. 쇼군직은 아들 히데타다한테 넘기면서도 오고쇼로 실권은 계속 쥐는 이원 통치를 하고, 니조성에서는 이제 성인이 된 도요토미 히데요리를 직접 대면한다. 그리고 오사카 전투(겨울의 진 → 여름의 진)로 도요토미 가문과 마지막 대결을 벌인다. 이 소설이 처음부터 답을 알려주고 시작하는 이야기 — 260년 태평성대를 연 사람 — 라는 걸 알면서도, 그 마지막 대결까지 가는 과정 하나하나가 계속 손에 땀을 쥐게 만드는 게 신기했다.",
      "이 소설에서 제일 유명한 그 비유도 있다. 이에야스·노부나가·히데요시 성격을 '울지 않는 두견새'에 빗댄 거. 노부나가는 죽여버리겠다, 히데요시는 울려보겠다, 이에야스는 울 때까지 기다리겠다. 이게 소설이 지어낸 말인 줄 알았는데, 알고 보니 일본에서 지금도 실제로 쓰이는 유명한 비유였다.",
      "제일 신기했던 건 이에야스가 죽고 나서 진짜로 '신'이 됐다는 부분. 닛코 도쇼구에 모셔져 있는데 세계문화유산이고, 지금도 참배객이 끊이지 않는다고 한다.",
      "거성으로 삼았던 에도성도 사라진 게 아니라 지금 도쿄 한복판 고쿄(황거) 자리 그대로다. 동쪽 정원은 무료로 들어갈 수 있다고.",
      "그러니까 이 소설, 그냥 옛날 얘기가 아니라 지금도 걸어볼 수 있는 지도인 셈이다. 나도 나중에 일본 가면 오사카·교토 코스 말고 이 사람 발자취 한번 따라가보고 싶어졌다."
    ],
    hookReveals:[
      { label:"오카자키성 → 이에야스 실제 출생지", label_en:"Okazaki Castle → Ieyasu's real birthplace", locId:"okazaki" },
      { label:"우는 새 비유 → 실제로 통용되는 유명한 비유", label_en:"The caged-bird parable → a real, widely known saying", locId:null },
      { label:"에도성 → 지금의 도쿄 고쿄(황거)", label_en:"Edo Castle → today's Tokyo Imperial Palace", locId:"edo" },
      { label:"닛코 도쇼구 → 사후 신으로 모셔진 세계유산", label_en:"Nikko Toshogu → where he's enshrined as a deity, a World Heritage site", locId:"nikko" }
    ],
    hookBadge_en:"By Sohachi Yamaoka · A 26-volume epic · Real person, real places",
    hookTagline_en:"Wait, was this guy actually real?",
    discoveryHook_en:[
      "Reading Daemang does something strange to you.",
      "It takes a while to really register that this isn't fiction — it's about a real person, even though the book runs 26 volumes and you go in bracing yourself for a slog.",
      "Being sent away as a hostage at six sounds like novelistic exaggeration, but it's true — Ieyasu passed from the Oda clan to the Imagawa clan as a hostage, and studied under the priest Sessai in Sunpu. He learned how to endure before he learned almost anything else.",
      "So I looked into it, and it turns out almost everywhere the real Ieyasu walked is still standing today. Start with his birthplace, Okazaki Castle, still there in Aichi Prefecture with a reconstructed keep you can visit.",
      "The early chapters are basically one long lesson in holding on. Nobunaga's win over Imagawa Yoshimoto at the Battle of Okehazama is what gives Ieyasu his shot at independence, and the two form the Kiyosu Alliance, a partnership that holds for nearly twenty years.",
      "It's not a smooth alliance, though. Ieyasu gets crushed by Takeda Shingen at the Battle of Mikatagahara, and only survives the fallout because Shingen suddenly dies. Later, at Nagashino, Ieyasu is on the other side of a decisive blow, using arquebus tactics to help finish off the Takeda clan.",
      "The part that actually hurt to read was the Nobuyasu and Lady Tsukiyama incident — within his own alliance, Ieyasu loses his wife and son. Knowing this wasn't invented for the novel, that it really happened, changes how you read it.",
      "Then comes the Honno-ji Incident. When Nobunaga is suddenly killed, Ieyasu has to make a life-or-death escape from Sakai — the famous 'Iga crossing.' He really could have died there.",
      "After Nobunaga's death, Ieyasu clashes with Hideyoshi next. At Komaki-Nagakute he actually has the military upper hand, but it gets settled politically instead, and he ends up formally submitting to Hideyoshi at Osaka Castle. This part is frustrating to read, but it's exactly the kind of patience this novel keeps circling back to.",
      "He's even forced to relocate — the Kanto transfer uproots him from his home base to what was then swampland: the future Edo. And when Hideyoshi launches the invasions of Korea, Ieyasu holds back, keeping his strength intact and waiting for his moment.",
      "That patience finally pays off at the Battle of Sekigahara, where he crushes the Western Army under Ishida Mitsunari and others. He's named Sei-i Taishogun and opens the Edo Shogunate — officially, he's the ruler of the realm.",
      "But it doesn't stop there. He hands the shogunate to his son Hidetada while keeping real power as 'Ogosho,' a kind of dual rulership, and meets the now-adult Toyotomi Hideyori face to face at Nijo Castle. Then comes the Siege of Osaka — winter campaign, then summer campaign — his final showdown with the Toyotomi clan. You already know the ending going in (260 years of peace), and somehow every step toward that final battle still keeps you on edge.",
      "There's also the novel's most famous scene — the parable comparing Ieyasu, Nobunaga, and Hideyoshi to a caged bird that won't sing. Nobunaga says kill it, Hideyoshi says make it sing, Ieyasu says wait until it sings on its own. I assumed the novel invented this, but it's actually a real, still-used Japanese saying.",
      "Even more striking: after he died, Ieyasu was literally deified. He's enshrined at Nikko Toshogu, a UNESCO World Heritage site that still draws a steady stream of visitors.",
      "And Edo Castle, his home base, never disappeared either — it's the site of today's Imperial Palace in the middle of Tokyo. The East Gardens are free to walk through.",
      "So this novel isn't just an old story — it's a map you can actually walk. Next time you're in Japan, skip the usual Osaka-Kyoto route and try tracing this one man's footsteps instead."
    ],
    discoveryHook_ja:[
      "「え、この人、実在したの?」『大望』を読みながら、何度もそう思った。",
      "全26巻の大河小説と聞いて、最初は気合いを入れて読む心構えだけしていたんだけど、何章か進むうちに、家康がもう小説の登場人物じゃなくて実在の人物なんだって、何度も改めて実感するようになった。",
      "六歳で人質に出されるというのも小説的な誇張かと思っていたら、本当の話だった。家康は織田家、続いて今川家へと人質の身分が移り、駿府で雪斎禅師のもとで学問を学んだという。幼い頃から「耐える」ことをまず学んだ人だったわけだ。",
      "だから少し調べてみた。生まれた岡崎城は、今も愛知県にそのまま残っていて、復元された天守閣まで見ることができるらしい。",
      "物語の序盤は、ひたすら耐え抜く日々の連続だ。桶狭間の戦いで信長が今川義元を破ってくれたおかげで独立のきっかけを掴み、信長と清洲同盟を結んで、以後20年近く続く協力関係が始まる。",
      "でもこの同盟、順風満帆ではない。三方ヶ原の戦いでは武田信玄に大敗するけれど、信玄が急死したおかげで最大の危機を免れる。その後の長篠の戦いでは逆に鉄砲隊の戦術で武田家に決定打を与える。",
      "個人的に一番つらかったのは、信康・築山殿事件だ。同盟関係の中で家康が自分の妻子を失うという個人的な悲劇を経験するんだけど、これがただの創作エピソードじゃなく実際にあったことだと知ると、小説の読み方が変わった。",
      "そして本能寺の変。信長が急死すると、家康は堺から命がけの脱出を敢行する。これが有名な「伊賀越え」だ。本当に死にかけた瞬間だったらしい。",
      "信長の死後は、今度は秀吉と対立する。小牧・長久手の戦いでは軍事的には家康が優勢だったのに、結局は政治的に手打ちとなり、大坂城で秀吉に正式に臣従することになる。ここは読んでいてもどかしいんだけど、これこそがこの小説が繰り返し描く「耐える」ということなんだと思う。",
      "さらに関東移封で、本拠地を離れて当時は湿地だらけだった関東、つまり後の江戸へと移らされる。秀吉の朝鮮出兵にも前面には出ず、力を温存しながら時を待つ。",
      "その忍耐がついに関ヶ原の戦いで報われる。西軍(石田三成ら)を打ち破り、征夷大将軍に就いて江戸幕府を開き、正式に「天下人」となる。",
      "でもここで終わりじゃない。将軍職は息子の秀忠に譲りながらも、大御所として実権は握り続ける「二元統治」を行い、二条城では成人した豊臣秀頼と直接対面する。そして大坂の陣(冬の陣→夏の陣)で豊臣家との最後の対決に臨む。この小説、最初から結末——260年の太平の世を開いた人物——を知った状態で読み進めるのに、その最後の対決に至るまでの一つひとつが、なぜかずっと手に汗握らせるのが不思議だった。",
      "この小説で一番有名なあの例え話もある。家康・信長・秀吉の性格を「鳴かないホトトギス」に例えたものだ。信長は「殺してしまえ」、秀吉は「鳴かせてみせよう」、家康は「鳴くまで待とう」。てっきり小説が作った台詞だと思っていたら、日本で今も実際に使われている有名な例えだった。",
      "一番驚いたのは、家康が死んだ後、本当に「神」になったという話だ。日光東照宮に祀られていて、しかも世界文化遺産で、今も参拝客が絶えないという。",
      "居城としていた江戸城も消えてなくなったわけじゃなく、今も東京のど真ん中、皇居の場所にそのまま残っている。東御苑は無料で入れるらしい。",
      "つまりこの小説、ただの昔話じゃなくて、今でも実際に歩ける地図なんだと思う。私も今度日本に行ったら、大阪・京都コースじゃなくて、この人の足跡を一度たどってみたくなった。"
    ],
    title_ja:"大望(徳川家康)", summary_ja:"六歳で人質として送られた少年は、どうやって260年の太平の世を開いた天下人になったのか? 織田信長と豊臣秀吉、二人の天才が次々と倒れていった後に最後まで生き残った「第三の男」の物語だ。結末は歴史がすでに教えてくれているが、そこに至るまでの道のりは裏切りと忍耐、そして予想外の展開に満ちている。", author_ja:"山岡荘八", era_ja:"戦国時代〜江戸初期",
    contentSummary:{ sections:[
      { heading:"출생과 인질 시절 (1543~1560)", bullets:[
        "오카자키에서 미카와 마쓰다이라 가문의 아들로 태어남",
        "여섯 살에 이웃 오다 가문에 인질로 잡혀감",
        "이후 이마가와 가문으로 인질 신분이 넘어가, 슨푸에서 셋사이 선사 문하에 들어가 학문을 익힘",
        "무력보다 인내와 학식을 갖춘 소년으로 성장함"
      ]},
      { heading:"독립과 노부나가와의 동맹 (1560~1582)", bullets:[
        "오케하자마 전투에서 노부나가가 이마가와 요시모토를 격파하며 독립의 계기가 마련됨",
        "노부나가와 '기요스 동맹'을 맺고, 이후 20년 가까이 이어질 협력관계를 시작함",
        "미카타가하라 전투에서 다케다 신겐에게 크게 패하지만, 신겐이 급사하며 최대 위기를 넘김",
        "나가시노 전투에서 조총 전술로 다케다 가문에 결정타를 가함",
        "노부야스·쓰키야마도노 사건 — 동맹 관계 안에서 아내와 아들을 잃는 개인적 비극을 겪음",
        "혼노지의 변으로 노부나가가 급사하자, 사카이에서 목숨을 건 탈출(이가고에)을 감행함"
      ]},
      { heading:"히데요시와의 대립과 화해 (1582~1598)", bullets:[
        "고마키·나가쿠테 전투에서 히데요시와 정면충돌 — 군사적으로는 우위였으나 정치적으로 봉합됨",
        "오사카성에서 히데요시에게 정식으로 신종함",
        "관동 이봉 — 본거지를 떠나 늪지투성이였던 간토(훗날의 에도)로 이주하게 됨",
        "조선 출병에는 전면에 나서지 않고 세력을 온존시키며 때를 기다림",
        "히데요시 사망으로 갈등의 축이 '히데요시 개인'에서 '그가 남긴 사람들'로 옮겨감"
      ]},
      { heading:"천하 통일 (1598~1616)", bullets:[
        "아이즈 정벌을 계기로 거병, 세키가하라 전투에서 서군(이시다 미쓰나리 등)을 격파함",
        "정이대장군에 올라 에도 막부를 열며 공식적으로 '천하인'이 됨",
        "쇼군직을 아들 히데타다에게 넘기면서도, 오고쇼로서 실권은 계속 쥐는 이원 통치를 함",
        "니조성에서 성인이 된 도요토미 히데요리를 직접 대면하며 후계 구도를 최종 확인함",
        "오사카 전투(겨울의 진 → 여름의 진)로 도요토미 가문과 마지막 대결을 벌임"
      ]}
    ], endingNote:"이에야스가 도요토미 가문과의 마지막 대결에서 구체적으로 어떤 선택을 내리고, 어떤 마음으로 260년 태평성대의 문을 여는 순간을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Tokugawa_Ieyasu2_full.JPG", credit:"도쿠가와 이에야스 초상(가노 탄유 작, 17세기) · Wikimedia Commons · Public Domain", creditUrl:"https://commons.wikimedia.org/wiki/File:Tokugawa_Ieyasu2_full.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%8F%84%EC%BF%A0%EA%B0%80%EC%99%80_%EC%9D%B4%EC%97%90%EC%95%BC%EC%8A%A4_(%EC%86%8C%EC%84%A4)" },
  { id:"kiminonawa", title:"너의 이름은. (君の名は。)", author:"신카이 마코토", type:"contemporary", country:"japan", medium:"anime_film", genres:["romance","fantasy","drama"],
    era:"현대", title_en:"Your Name", author_en:"by Makoto Shinkai", era_en:"Present day",
    summary:"얼굴도 이름도 모르는 두 사람이 어느 날부터 서로의 몸에서 눈을 뜬다. 도쿄의 남자 고등학생과 산골 마을의 여자 고등학생 — 처음엔 당황스러운 해프닝이었던 이 뒤바뀜이, 어느 순간 되돌릴 수 없는 무언가로 바뀐다. '타소가레'라 불리는 황혼의 순간, 두 사람은 마침내 서로를 알아볼 수 있을까.",
    longSummary:"너의 이름은을 극장에서 처음 봤을 때, 정작 제일 기억에 남은 건 두 주인공의 로맨스가 아니라 '이 마을, 진짜 있을 것 같다'는 생각이었다. 신카이 마코토 감독의 배경 작화가 원래도 유명하지만, 이 작품은 유독 실제 지명을 정직하게 가져다 쓴다 — 그리고 그 배경들이 나중엔 이야기 자체보다 더 오래 마음에 남는다.\n\n몸이 뒤바뀐다는 설정은 사실 흔하다. 코미디로 소비되기 딱 좋은 소재이기도 하고, 실제로 초반부는 웃긴 장면이 많다. 그런데 이 영화가 특별한 건, 그 가벼운 설정을 아주 다른 무게의 이야기로 슬쩍 옮겨놓는 방식 때문이다. 언제 그 전환이 일어나는지 알아채기도 전에, 관객은 이미 다른 감정 속에 들어가 있다.\n\n개인적으로 이 영화를 다시 볼 때마다 다른 장면에서 울컥한다. 처음엔 결말 때문에, 두 번째는 중반의 어떤 대사 때문에, 세 번째는 그냥 배경 음악 하나 때문에. 스포일러 없이 말할 수 있는 건 딱 하나 — '타소가레'라는 단어의 뜻을 알고 나면, 영화를 보는 내내 그 말이 계속 따라다닌다는 것.\n\n실제로 존재하는 마을과 신사, 기차역을 따라가다 보면 이 영화가 왜 그렇게 많은 사람들을 '성지순례'로 이끌었는지 이해하게 된다.",
    pinColor:"#3a7ce0",
    summary_en:"Two strangers who've never met start waking up in each other's bodies. A boy in Tokyo, a girl in a mountain village — what starts as an awkward, funny mix-up slowly turns into something neither of them can undo. At twilight, a moment called 'tasogare,' will the two finally be able to recognize each other?",
    longSummary_en:"The first time I saw Your Name in a theater, what stuck with me wasn't the romance — it was the thought, 'this town feels like it could really exist.' Makoto Shinkai's background art is already famous, but this film is unusually faithful to real place names, and in the end, those backgrounds stay with you even longer than the story itself.\n\nBody-swapping is a well-worn premise, and it's easy to play for laughs — and the first act really is funny. What makes this film different is how quietly it shifts that light setup into something with far more weight. You don't notice the turn happening until you're already somewhere else, emotionally.\n\nEvery time I rewatch it, I tear up at a different moment. The first time, it was the ending. The second time, a line in the middle. The third time, just the score. There's one thing I can say without spoiling anything: once you learn what 'tasogare' means, that word follows you through the rest of the film.\n\nFollow the real towns, shrines, and train stations this film is built on, and you start to understand why it sparked so many pilgrimages.",
    communityNote:"신주쿠 요쓰야의 스가 신사 계단은 팬들 사이에서 성지순례 코스의 마지막이자 최고 인기 스팟으로 꼽혀요. 극중 할머니가 설명하는 '무스비(結び, 인연을 잇는 행위)' 개념은 이야기 전체를 관통하는 핵심 은유로 자주 인용됩니다.",
    communityNote_en:"The staircase at Suga Shrine in Yotsuya, Shinjuku, is widely considered the final and most popular stop on the film's pilgrimage route. The concept of 'musubi' (結び, the act of tying a bond) explained by Mitsuha's grandmother is often cited as the central metaphor running through the whole story.",
    hookBadge:"신카이 마코토 · 실존 마을·신사 · 성지순례 핵심 루트", hookTagline:"《너의 이름은.》 보고 나서 나도 모르게 이 마을을 검색하고 있었다",
    discoveryHook:[
      "이토모리, 진짜 있는 마을 아니야? 영화 보고 나서 이 생각부터 들었다.",
      "찾아보니 완전히 상상은 아니었다. 근데 방식이 좀 재밌다.",
      "이토모리 특유의 그 골목, 세토강 따라 흰 벽 창고들이 늘어선 풍경은 기후현 히다후루카와라는 실제 마을 거리를 거의 그대로 가져온 거고, 이토모리호는 또 다른 데다. 나가노현 스와호가 모델이라고 한다.",
      "그러니까 이 영화 속 '이토모리'는 마을 풍경은 기후, 호수는 나가노, 이렇게 서로 다른 실제 장소 두 개를 붙여서 만든 가상의 마을이었던 거다. 마을 하나 검색해보려던 게 여행 코스 두 개를 찾아본 꼴이 됐다.",
      "근데 이 영화, 사실 처음 볼 땐 그냥 몸이 뒤바뀌는 코믹한 설정으로 시작한다. 미츠하와 타키가 서로의 존재도 모른 채 상대의 하루를 대신 살면서 크고 작은 해프닝을 겪고, 노트에 규칙과 당부를 남기며 소통하는 초반부는 정말 유쾌하다.",
      "그런데 이게 어느 순간부터 뚝 끊긴다. 뒤바뀜이 완전히 멈추고, 타키는 미츠하한테 연락할 방법을 전부 잃어버린다. 그래서 기억 속 풍경만 단서로 히다 지방을 직접 찾아 나서는데, 여기서부터 영화 분위기가 완전히 달라진다.",
      "그리고 마을을 찾은 타키가 마주하는 건 상상도 못한 사실이다. 3년 전 혜성 파편이 충돌해서 이토모리 마을 전체가 사라졌다는 것. 처음 이 부분을 알고 나서는 소름이 쫙 돋았다.",
      "더 소름 돋는 건 그다음이다. 타키가 실제로 몸을 바꿔 겪었던 건 '지금의 미츠하'가 아니라 '3년 전 과거의 미츠하'였다는 게 밝혀진다. 처음부터 두 사람은 같은 시간을 산 게 아니었던 거다.",
      "그래서 마을과 사람들을 구하기 위해, '타소가레도키(황혼)'라 불리는 특별한 시간대에 벌어지는 마지막 시도가 시작된다. 낮도 밤도 아닌, 이승과 저승의 경계가 흐려지는 그 시간에만 가능한 마지막 기회.",
      "이건 알고 나서 진짜 소름 돋았던 건데, 영화 후반 타키와 미츠하가 계단에서 스쳐 지나가는 그 장면. 신주쿠 요츠야에 있는 스가 신사 계단이 실제 모델이라고 한다. 지금도 팬들 사이에서 성지순례 마지막 코스로 제일 인기 있는 곳이라고.",
      "극중 미츠하 할머니가 설명하는 '무스비(結び)'라는 개념도 영화가 지어낸 말이 아니라 실제 일본어 단어다. 실이나 끈을 잇는다는 뜻에서 인연을 잇는다는 의미로 확장된, 영화 전체를 관통하는 진짜 은유였던 셈. 시간을 넘나드는 이 이야기 전체가 결국 이 단어 하나로 요약되는 셈이다.",
      "그리고 영화 마지막, 서로의 이름과 얼굴을 다 잊어버린 채로 도쿄 어딘가에서 다시 마주칠 기회를 얻는 두 사람. 정말로 서로를 다시 알아볼 수 있을지, 이 질문 하나로 영화가 끝까지 간다. 스포일러라고 하기도 애매한 이 질문이, 사실 영화 전체를 이끌어가는 힘이었다.",
      "나는 아직 히다후루카와까지 가보진 못했지만, 도쿄 갔을 때 요츠야 그 계단은 일부러 찾아가서 올라가 봤다. 별거 없는 평범한 동네 계단인데, 알고 올라가면 묘하게 감회가 다르다.",
      "다음에 일본 가면 히다후루카와까지 가서 진짜 '이토모리'를 한번 걸어보고 싶다."
    ],
    hookReveals:[
      { label:"이토모리 마을 → 기후현 히다후루카와가 모델", label_en:"Itomori's town → modeled on Hida Furukawa, Gifu", label_ja:"糸守町 → 岐阜県飛騨古川がモデル", locId:"furukawa_machinami" },
      { label:"이토모리호 → 나가노현 스와호가 모델", label_en:"Lake Itomori → modeled on Lake Suwa, Nagano", label_ja:"糸守湖 → 長野県の諏訪湖がモデル", locId:"lake_suwa" },
      { label:"엔딩 계단 재회 → 신주쿠 요츠야 스가 신사 계단, 실존", label_en:"The ending staircase reunion → the real Suga Shrine stairs in Yotsuya", label_ja:"エンディングの階段の再会 → 新宿・四ツ谷の須賀神社の階段、実在", locId:"suga_shrine" },
      { label:"'무스비' → 실제 존재하는 일본어 단어이자 영화의 핵심 은유", label_en:"'Musubi' → a real Japanese word, and the film's central metaphor", label_ja:"「結び」 → 実在する日本語であり映画の核心的な暗喩", locId:null }
    ],
    hookBadge_en:"Makoto Shinkai · Real towns & shrines · The core pilgrimage route",
    hookTagline_en:"After Your Name, I caught myself googling this town without even thinking",
    discoveryHook_en:[
      "Isn't Itomori a real town? That was my first thought after the movie.",
      "Turns out it's not entirely made up — but the way it's built is kind of funny.",
      "That distinctive Itomori alleyway, the white-walled storehouses lining the Seto River, is lifted almost directly from a real street in Hida Furukawa, Gifu Prefecture. Lake Itomori is somewhere else entirely — modeled on Lake Suwa, in Nagano.",
      "So the fictional 'Itomori' is really two different real places stitched together: the town from Gifu, the lake from Nagano. Once I realized that, googling one town turned into planning two separate trips.",
      "The film actually opens as a fairly comic body-swap story. Mitsuha and Taki don't even know the other exists at first — they just live each other's days, bumbling through small mishaps, leaving notes and rules for each other in notebooks. The first act is genuinely funny.",
      "Then, at some point, it just stops. The swapping cuts off completely, and Taki loses every way of reaching Mitsuha. He sets off for Hida with nothing to go on but the scenery from his memories — and that's exactly where the film's mood shifts completely.",
      "What Taki finds when he gets there is something he never expected: three years earlier, a comet fragment struck Itomori and wiped the entire town off the map. Learning this for the first time genuinely gave me chills.",
      "What's even more chilling is what comes next — it turns out Taki wasn't swapping bodies with the Mitsuha of 'now.' He was living the days of Mitsuha from three years in the past. The two of them were never even living in the same time to begin with.",
      "So, to save the town and its people, one last attempt begins — one that's only possible during 'tasogare,' the twilight hour, a time that belongs to neither day nor night, when the line between this world and the next blurs.",
      "Here's the part that genuinely gave me chills once I learned it. The staircase where Taki and Mitsuha brush past each other near the end is modeled on the real staircase at Suga Shrine in Yotsuya, Shinjuku — apparently still the most popular final stop on the fan pilgrimage route.",
      "Even 'musubi,' the concept Mitsuha's grandmother explains, isn't something the film made up. It's a real Japanese word — literally tying a cord or thread, extended to mean tying a bond between people — and it turns out to be the real metaphor running through the whole story that crosses time itself.",
      "And at the very end, the two of them get a chance to cross paths again somewhere in Tokyo, having forgotten each other's names and faces entirely. Whether they can actually recognize each other again is the one question the film carries all the way to its final frame — and it might be the real engine behind the whole story.",
      "I haven't made it to Hida Furukawa yet, but when I was in Tokyo I went out of my way to climb that staircase in Yotsuya. It's just an ordinary neighborhood stairway, but knowing the story behind it makes climbing it feel strangely different.",
      "Next time I'm in Japan, I want to make it to Hida Furukawa and actually walk through the real 'Itomori.'"
    ],
    hookBadge_ja:"新海誠 · 実在する町・神社 · 聖地巡礼の核心ルート",
    hookTagline_ja:"『君の名は。』を見てから、気づいたらあの町を検索していた",
    discoveryHook_ja:[
      "糸守って、本当にある町なんじゃない? 映画を見た後、真っ先にそう思った。",
      "調べてみたら、完全な想像ではなかった。でも作り方がちょっと面白い。",
      "糸守町特有のあの路地、瀬戸川沿いに白壁の土蔵が並ぶ風景は岐阜県飛騨古川の実際の町並みをほぼそのまま持ってきたもので、糸守湖はまた別の場所。長野県の諏訪湖がモデルだという。",
      "つまり映画の中の「糸守」は、町並みは岐阜、湖は長野という、別々の実在の場所を繋げて作られた架空の町だったわけだ。町ひとつ検索するつもりが、旅行先を2つ調べる羽目になった。",
      "この映画、実は最初はわりとコミカルな入れ替わりものとして始まる。ミツハとタキはお互いの存在すら知らないまま相手の一日を代わりに生きて、大小のハプニングに巻き込まれる。ノートに互いへのルールや伝言を書き残しながらやりとりする序盤は、本当に楽しい。",
      "ところがある瞬間から、それがぷつりと止まる。入れ替わりが完全に止まり、タキはミツハに連絡する手段を全部失ってしまう。記憶の中の風景だけを手がかりに飛騨地方を探しに行くところから、映画の空気が一変する。",
      "そして町を見つけたタキが目にするのは、想像もしていなかった事実だ。3年前、彗星の破片が衝突して糸守町がまるごと消えてしまっていたのだ。初めてこれを知ったときは、本当にゾクッとした。",
      "もっとゾクッとするのはその先だ。タキが実際に入れ替わっていたのは「今のミツハ」ではなく、「3年前のミツハ」だったことが明かされる。二人は最初から同じ時間を生きていたわけではなかったのだ。",
      "だから町と人々を救うために、「黄昏時(たそがれどき)」と呼ばれる特別な時間だけに可能な、最後の挑戦が始まる。昼でも夜でもない、この世とあの世の境界が曖昧になるその時間にしかできないラストチャンスだ。",
      "これは知ってから本当にゾクッとしたことなんだけど、映画終盤でタキとミツハがすれ違うあの階段。新宿区四ツ谷にある須賀神社の階段が実際のモデルらしい。今でもファンの間で聖地巡礼の最後を飾る、一番人気のスポットだという。",
      "ミツハのおばあちゃんが説明する「結び」という概念も、映画が作った言葉じゃなく実在する日本語だ。糸や紐を結ぶという意味から、人と人との縁を結ぶという意味に広がった、時間さえも超えるこの物語全体を貫く、本物の暗喩だったわけだ。",
      "そして映画の最後、お互いの名前も顔も忘れたまま、東京のどこかですれ違うチャンスを得る二人。本当にもう一度お互いを見つけられるのか。この一つの問いを、映画は最後の最後まで抱えたまま終わる。もしかしたらこれこそが、この物語全体を動かしていた力なのかもしれない。",
      "私はまだ飛騨古川までは行けていないけれど、東京に行ったときは四ツ谷のあの階段だけはわざわざ探して上ってみた。何の変哲もない普通の階段なのに、知って上ると不思議と感慨が違う。",
      "今度日本に行ったら、飛騨古川まで足を伸ばして本物の「糸守」を歩いてみたい。"
    ],
    contentSummary:{ sections:[
      { heading:"몸이 뒤바뀌는 나날", bullets:[
        "산골 마을 이토모리에 사는 여고생 미츠하와 도쿄에 사는 남고생 타키가 어느 날부터 꿈속에서 서로 몸이 뒤바뀜",
        "처음엔 서로의 존재를 모른 채 상대의 하루를 대신 살아가며 크고 작은 해프닝을 겪음",
        "노트와 스마트폰 메모로 서로에게 하루의 규칙과 당부를 남기며 소통하기 시작함",
        "서로의 삶에 조금씩 스며들며 만난 적 없는 두 사람 사이에 미묘한 감정이 싹틈"
      ]},
      { heading:"갑작스러운 단절", bullets:[
        "어느 순간부터 뒤바뀜이 완전히 멈추고, 타키는 미츠하와 연락할 방법을 모두 잃음",
        "타키가 미츠하를 만나기 위해 기억 속 풍경만을 단서로 히다 지방을 찾아 나섬",
        "마을을 찾은 타키는 3년 전 혜성 파편 충돌로 이토모리 마을 전체가 사라졌다는 충격적인 사실과 마주함"
      ]},
      { heading:"시간의 어긋남", bullets:[
        "타키가 실제로 몸을 바꿔 겪었던 것은 3년 전 과거의 미츠하였다는 사실이 드러남",
        "마을과 사람들을 구하기 위해, '타소가레도키(황혼)'라 불리는 특별한 시간대에 벌어지는 마지막 시도가 시작됨"
      ]}
    ], endingNote:"두 사람이 정말로 마을과 사람들을 구할 수 있을지, 그리고 서로의 이름조차 잊은 채로 다시 서로를 알아볼 수 있을지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Suga_Shrine_stairs_high-angle_20161113-073454.jpg", credit:"스가 신사(須賀神社) 계단, 신주쿠 요쓰야 · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/Category:Suga_Shrine,_Shinjuku" },
    posterPage:"https://en.wikipedia.org/wiki/Your_Name" },
  { id:"suzume", title:"스즈메의 문단속 (すずめの戸締まり)", author:"신카이 마코토", type:"contemporary", country:"japan", medium:"anime_film", genres:["fantasy","adventure","drama"],
    era:"현대", title_en:"Suzume", author_en:"by Makoto Shinkai", era_en:"Present day",
    summary:"규슈의 조용한 항구 마을에 살던 열일곱 소녀 스즈메는 폐허 속에서 이상한 문 하나를 발견한다. 그 문을 잘못 열면서 시작된 여정은, 그녀를 규슈에서 시코쿠, 고베, 도쿄, 그리고 도호쿠까지 일본 열도를 종단하는 로드무비 속으로 끌고 간다. 재난을 막기 위해 전국의 '문'을 잠그고 다니는 여정이지만, 그 끝에서 스즈메가 진짜로 마주하게 되는 건 다른 무엇이다.",
    longSummary:"이 영화를 보기 전에 나는 신카이 마코토가 또 한 번 아름다운 재난 영화를 만들었겠거니 생각했다. '너의 이름은'과 '날씨의 아이' 이후 세 번째로 이어지는, 그의 이른바 '재난 3부작' 마지막 편이라는 것도 알고 있었다. 그런데 이 영화는 앞의 두 작품과는 결이 조금 다르다 — 더 조용하고, 더 개인적이고, 그리고 훨씬 더 용기가 필요한 이야기다.\n\n스즈메가 문을 잠그며 일본 열도를 종단하는 여정 자체는 로드무비의 즐거움으로 가득하다. 규슈의 항구, 시코쿠로 가는 페리, 고베의 뒷골목 스낵바, 도쿄의 번화가 — 실제로 존재하는 장소들을 하나하나 스쳐 지나가며, 낯선 어른들의 작은 친절 속에서 성장하는 소녀의 이야기이기도 하다. 말하는 고양이 다이진의 존재는 이 무거울 수 있는 여정에 묘하게 사랑스러운 리듬을 더한다.\n\n개인적으로 가장 마음에 남은 건, 이 영화가 여정의 끝에서 다다르는 곳이다. 스포일러 없이 말하자면, 신카이 감독은 이 작품을 통해 2011년 동일본대지진을 잃어버린 이들을 향한 애도이자, 살아남은 이들을 향한 위로의 마음으로 그려냈다고 밝힌 바 있다. 화려한 재난 스펙터클보다, '문을 닫는다'는 행위 자체가 상실을 받아들이고 다시 문을 열고 나아가는 것에 관한 은유라는 걸 알아차리는 순간, 영화 전체가 다르게 보이기 시작한다.\n\n실존하는 장소들을 따라가는 성지순례가 유독 뜻깊게 느껴지는 이유도 여기에 있다. 이 영화 속 여행은 단순한 관광이 아니라, 실제 그 땅에 새겨진 기억을 마주하러 가는 여정이기도 하다.",
    pinColor:"#e0a83a",
    summary_en:"A quiet seventeen-year-old in a Kyushu port town finds a strange door standing alone in the ruins. Opening it by mistake sets off a journey that pulls her from Kyushu to Shikoku, Kobe, Tokyo, and finally the Tohoku coast. It's a road trip to lock doors and stop disasters — but what she really finds at the end of it is something else entirely.",
    longSummary_en:"Going in, I expected Makoto Shinkai to deliver another beautifully shot disaster movie — I already knew this was the closing chapter of his so-called 'disaster trilogy,' after Your Name and Weathering With You. But this film is quieter, more personal, and asks something braver of its audience than the first two.\n\nThe road trip itself is a joy to watch — a port in Kyushu, a ferry to Shikoku, a back-alley snack bar in Kobe, a busy Tokyo street — real places drift by one after another, and it's just as much a coming-of-age story built on small kindnesses from strangers along the way. The talking cat, Daijin, adds a strangely lovable rhythm to what could otherwise be a heavy journey.\n\nWhat stayed with me most is where the journey ends. Without spoiling it: Shinkai has said he made this film as both a mourning for those lost in the 2011 Tohoku earthquake and a comfort for those who survived. Once you notice that the act of 'locking a door' is really a metaphor for accepting loss and opening the next one anyway, the whole film looks different.\n\nThat's also why following the real locations feels different here — it's not just tourism, it's walking toward a memory carved into that land.",
    communityNote:"신카이 마코토 감독은 이 작품을 동일본대지진의 기억을 다음 세대에도 전하고 싶다는 마음으로 만들었다고 밝힌 바 있어요. 실존 재난을 정면으로 다루는 만큼, 이 사이트에서도 무겁지 않되 가볍게 소비되지 않도록 신중한 톤을 지키려 합니다. 말하는 고양이 '다이진'이라는 이름은 극중 설정상 '고양이가 다이진(大臣)을 닮았다'는 데서 붙여졌다고 해요.",
    communityNote_en:"Director Makoto Shinkai has said he wanted this film to carry the memory of the 2011 Tohoku earthquake forward to the next generation. Because it engages directly with a real disaster, we try to keep a careful tone here — not too heavy, but not treated lightly either. The talking cat's name, Daijin, comes from an in-story joke that the cat resembles a 'daijin' (minister).",
    hookBadge:"신카이 마코토 · 실존 로드무비 루트 · 규슈→도호쿠", hookTagline:"《스즈메의 문단속》 보고 나서 촬영지 찾아보다가 진짜 놀랐다",
    discoveryHook:[
      "그 폐유원지, 사실 지금도 운영 중이라고? 촬영지 찾아보다가 제일 놀랐던 게 이거였다.",
      "일단 스즈메가 나고 자란 규슈 항구 마을, 미야자키현 아부라쓰항이 모델이라고 한다. 실제로 존재하는 조용한 항구다.",
      "근데 이 영화, 스즈메가 등굣길에 우연히 만난 여행자 소타를 따라 산속 폐허에 들어가면서 시작된다. 거기서 홀로 서 있는 낡은 문 하나를 발견하고, 별생각 없이 열어버리는 순간 재난을 부르는 지렁이 형상의 존재 '미미즈'가 새어나오기 시작한다.",
      "그리고 재난을 막던 '토지시' 소타가 다리 셋 달린 낡은 어린이용 의자로 변해버리는 장면. 처음 봤을 때는 이게 좀 황당한 설정 같았는데, 말하는 하얀 고양이 '다이진'까지 등장하면서 본격적으로 스즈메와 '의자가 된 소타'의 로드무비가 시작된다.",
      "이 여정이 규슈에서 시코쿠, 고베, 도쿄를 거쳐 도호쿠까지 일본 열도를 종단한다. 스즈메가 고양이 다이진을 쫓아 시코쿠로 건너가는 페리 장면도 실제로 규슈와 시코쿠를 잇는 진짜 항로, 에히메현 야와타하마항이 배경이다.",
      "근데 제일 신기했던 건 따로 있다. 중반에 나오는 '두 번째 문'이 있는 폐유원지. 나는 당연히 진짜 폐허인 줄 알았는데, 알고 보니 고베 후르츠·플라워 파크라는, 지금도 실제로 운영 중인 놀이공원이라고 한다. 폐허가 아니라 멀쩡히 영업 중인 곳을 폐허처럼 그린 거다.",
      "도쿄 파트에서는 도시 전체를 위협하는 거대한 미미즈와 맞서 싸우는 장면이 나오는데, 스즈메 일행이 지나는 다리도 실존한다. 오차노미즈의 히지리바시. 팬들 사이에서는 도쿄의 '뒷문'이 있던 자리로 고쿄(황거) 외곽의 우시가후치 해자를 지목하기도 한다.",
      "그리고 여정의 마지막, 도호쿠 해안 장면에서 스즈메는 사실 어린 시절 겪었던 자기 자신의 상처와 정면으로 마주하게 된다. 스즈메가 문 너머 '저편'의 세계에서 진짜로 찾고자 했던 게 뭐였는지가 여기서 서서히 드러난다.",
      "여기는 좀 다르게 다가온다. 신카이 마코토 감독이 이 영화를 2011년 동일본대지진을 잃어버린 이들을 향한 애도이자 살아남은 이들을 향한 위로로 만들었다고 직접 밝혔다는 걸 알고 나면, 미야기현의 실제 복구 도로휴게소가 배경이라는 사실이 그냥 '촬영지 하나'로 안 느껴진다.",
      "문을 잠근다는 행위 자체가 상실을 받아들이고 다시 나아가는 것에 관한 은유라는 걸 알고 나면, 이 로드무비를 실제로 따라가 보고 싶어진다.",
      "여정 내내 만나는 낯선 어른들의 작은 친절도 그렇다. 재난을 막으러 다니는 무거운 여정인데, 가는 곳마다 사람들이 스즈메를 먹이고 재워주고 도와주는 장면들이 이 영화를 생각보다 훨씬 따뜻하게 만든다.",
      "말하는 고양이 다이진의 존재도 다시 생각하면 묘하다. 사랑스럽고 얄미운 이 고양이가 사실은 재난을 막는 존재들과 깊이 얽혀 있다는 걸 알고 나면, 여정 내내 다이진을 쫓아다니던 장면들이 다르게 보인다.",
      "나는 아직 규슈에서 도호쿠까지 그대로 따라가 보진 못했지만, 언젠가 간다면 도호쿠 파트만큼은 가볍게 소비하지 않고 마음의 준비를 좀 하고 가고 싶다.",
      "규슈의 항구, 시코쿠로 가는 페리, 고베의 놀이공원, 도쿄의 다리, 그리고 도호쿠 해안까지 — 이 영화 하나로 일본 열도를 세로로 관통하는 여행 코스가 완성되는 셈이다."
    ],
    hookReveals:[
      { label:"폐유원지 '두 번째 문' → 실은 지금도 운영 중인 고베 후르츠·플라워 파크", label_en:"The abandoned 'second door' park → actually still-open Kobe Fruit Flower Park", label_ja:"廃遊園地「二番目の扉」 → 実は今も営業中の神戸フルーツ・フラワーパーク", locId:"kobe_fruit_flower_park" },
      { label:"규슈 시작 마을 → 미야자키현 아부라쓰항", label_en:"Suzume's hometown → Aburatsu Port, Miyazaki", label_ja:"すずめの故郷の町 → 宮崎県油津港", locId:"aburatsu" },
      { label:"도쿄의 '뒷문' → 고쿄 외곽 해자 우시가후치(추정)", label_en:"Tokyo's 'back door' → Ushigafuchi moat by the Imperial Palace (fan theory)", label_ja:"東京の「裏戸」 → 皇居外周の牛ヶ淵(推定)", locId:"ushigafuchi" },
      { label:"도호쿠 마지막 장면 → 동일본대지진 복구 도로휴게소, 실제 장소", label_en:"The final Tohoku scene → a real post-earthquake recovery rest stop", label_ja:"東北のラストシーン → 東日本大震災の復興道の駅、実在の場所", locId:"ooya_kaigan" }
    ],
    hookBadge_en:"Makoto Shinkai · A real road-trip route · Kyushu to Tohoku",
    hookTagline_en:"After Suzume, I looked up the filming locations and was genuinely surprised",
    discoveryHook_en:[
      "Wait, that abandoned park is actually still open? That's what surprised me most while looking up the filming locations.",
      "The Kyushu port town where Suzume grew up is modeled on Aburatsu Port in Miyazaki Prefecture — a real, quiet harbor.",
      "The film actually kicks off when Suzume follows a traveler named Souta she runs into on her way to school, into a ruin in the mountains. There, she finds a lone door standing in the rubble, and the moment she opens it without thinking, a worm-shaped disaster entity called the Mimizu starts leaking out.",
      "Then Souta, the 'closer' whose job is to shut these doors, gets turned into an old three-legged children's chair while trying to stop the disaster. It sounded like a bizarre setup at first, but once the talking white cat Daijin shows up too, the road trip of Suzume and 'chair Souta' really kicks off.",
      "That journey runs the length of Japan — Kyushu to Shikoku, Kobe, Tokyo, and finally Tohoku. The ferry scene where she chases Daijin over to Shikoku is a real route too, based on Yawatahama Port in Ehime.",
      "But the one that really caught me off guard was different. The abandoned amusement park with the 'second door' partway through the film — I assumed it was a real ruin. Turns out it's modeled on the Kobe Fruit Flower Park, which is still an operating amusement park today. They painted a working park to look abandoned.",
      "The Tokyo section has Suzume's group fighting off a giant Mimizu threatening the whole city, and the bridge they cross is real too — Hijiribashi in Ochanomizu. Fans point to Ushigafuchi, a moat on the outer edge of the Imperial Palace, as the likely site of Tokyo's 'back door.'",
      "Then, at the very end of the journey, on the Tohoku coast, Suzume finally confronts a wound from her own childhood head-on. What she was really searching for on the other side of all those doors slowly comes into focus here.",
      "This part lands differently. Once you know Shinkai has said he made this film as both a mourning for those lost in the 2011 earthquake and a comfort for those who survived, the fact that the backdrop is a real recovery-era rest stop in Miyagi stops feeling like just another filming location.",
      "Once you notice that the act of locking a door is itself a metaphor for accepting loss and moving forward anyway, you want to actually retrace this road trip.",
      "The small kindnesses from strangers along the way matter too. It's a heavy journey to close doors and stop disasters, but people keep feeding Suzume, giving her a place to sleep, helping her out at every stop — and it makes the film warmer than you'd expect.",
      "The talking cat Daijin is worth a second thought too. Once you realize this adorable, maddening cat is actually deeply tangled up with the beings that hold disasters at bay, all those chase scenes read differently in hindsight.",
      "I haven't retraced the whole Kyushu-to-Tohoku route myself yet, but whenever I do, I want to go into the Tohoku stretch with the right frame of mind rather than treating it lightly.",
      "A Kyushu port, a ferry to Shikoku, a Kobe amusement park, a Tokyo bridge, and the Tohoku coast — string them together and this one film gives you a travel route running the entire length of Japan."
    ],
    hookBadge_ja:"新海誠 · 実在するロードムービーのルート · 九州→東北",
    hookTagline_ja:"『すずめの戸締まり』を見た後、撮影地を調べて本当に驚いた",
    discoveryHook_ja:[
      "あの廃遊園地、実は今も営業中だって? 撮影地を調べていて一番驚いたのがこれだった。",
      "まずすずめが育った九州の港町は、宮崎県の油津港がモデルだという。実際に存在する静かな港だ。",
      "この映画、実は登校中に偶然出会った旅人・宗太を追いかけて山中の廃墟に入っていくところから始まる。そこでぽつんと立つ古い扉を見つけ、何気なく開けてしまった瞬間、災いを呼ぶミミズのような存在が漏れ出し始める。",
      "そして災いを止めようとした「閉じ师」の宗太が、脚が三本しかない古い子ども用の椅子に変えられてしまう場面。最初はかなり突飛な設定だと思ったけれど、しゃべる白猫「ダイジン」まで登場して、すずめと「椅子になった宗太」のロードムービーが本格的に始まる。",
      "この旅は九州から四国、神戸、東京を経て東北まで、日本列島を縦断する。ダイジンを追いかけて四国へ渡るフェリーのシーンも実在する航路で、愛媛県の八幡浜港が背景になっている。",
      "でも一番驚いたのは別のところだった。物語中盤に出てくる「二番目の扉」がある廃遊園地。てっきり本物の廃墟だと思っていたら、神戸フルーツ・フラワーパークという、今も普通に営業中の遊園地がモデルだという。廃墟どころか、現役の施設を廃墟っぽく描いていたわけだ。",
      "東京パートでは都市全体を脅かす巨大なミミズと対決するシーンがあるんだけど、すずめたちが渡る橋も実在する。お茶の水の聖橋。ファンの間では、東京の「裏戸」があった場所として皇居外周の牛ヶ淵が挙げられているという。",
      "そして旅の最後、東北の海岸のシーンで、すずめは自分自身の幼い頃の傷と正面から向き合うことになる。すずめが扉の向こう、「後ろ側」の世界で本当に探していたものが何だったのか、ここで少しずつ明らかになっていく。",
      "ここは少し違う重みで迫ってくる。新海誠監督がこの作品を、2011年の東日本大震災で亡くなった人々への追悼であり、生き残った人々への慰めとして作ったと語っていることを知ると、宮城県にある実際の復興道の駅が背景だという事実が、ただの「撮影地のひとつ」には思えなくなる。",
      "扉を閉めるという行為そのものが、喪失を受け入れて再び前へ進むことの比喩だと気づくと、このロードムービーを実際にたどってみたくなる。",
      "旅の道中で出会う見知らぬ大人たちの小さな親切もいい。災いを止めて回る重い旅なのに、行く先々ですずめにご飯を食べさせ、泊めてくれ、助けてくれる人たちが出てきて、この映画を思った以上に温かいものにしている。",
      "しゃべる猫ダイジンの存在も、改めて考えると不思議だ。可愛くて憎らしいこの猫が、実は災いを閉じる存在たちと深く結びついていると知ると、旅の間ずっとダイジンを追いかけていた場面の見え方が変わってくる。",
      "私はまだ九州から東北までのルートを全部たどれてはいないけれど、いつか行くなら東北パートだけは軽く消費せずに心の準備をして訪れたい。",
      "九州の港、四国へのフェリー、神戸の遊園地、東京の橋、そして東北の海岸まで——この一本の映画だけで、日本列島を縦に貫く旅のルートが出来上がっているわけだ。"
    ],
    contentSummary:{ sections:[
      { heading:"이상한 문과의 만남", bullets:[
        "규슈의 조용한 항구 마을에 사는 열일곱 살 스즈메, 등굣길에 여행자 소타를 만남",
        "소타를 따라간 산속 폐허에서 홀로 서 있는 낡은 문 하나를 발견함",
        "무심코 문을 열어버린 순간, 재난을 부르는 지렁이 형상의 존재 '미미즈'가 새어나오기 시작함"
      ]},
      { heading:"소타, 의자가 되다", bullets:[
        "문을 닫는 일을 업으로 삼는 '토지시' 소타가 재난을 막다가 다리 셋 달린 낡은 어린이용 의자로 변해버림",
        "말하는 하얀 고양이 '다이진'이 나타났다 사라지며, 스즈메와 의자가 된 소타의 여정이 본격적으로 시작됨"
      ]},
      { heading:"일본 열도를 종단하는 여정", bullets:[
        "규슈에서 페리를 타고 시코쿠로, 다시 고베·도쿄를 거쳐 도호쿠까지 이동하는 로드무비가 펼쳐짐",
        "가는 곳마다 낯선 어른들의 작은 친절 속에서 전국의 낡은 문을 잠그며 재난을 막아나감",
        "도쿄에서는 도시 전체를 위협하는 거대한 미미즈와 맞서 싸우게 됨"
      ]},
      { heading:"도호쿠, 그리고 스즈메의 진짜 이야기", bullets:[
        "여정의 마지막 목적지인 도호쿠 해안에서, 스즈메가 어린 시절 겪었던 상처와 마주하게 됨",
        "스즈메가 문 너머 '저편'의 세계에서 진짜로 찾고자 했던 것이 무엇인지 서서히 드러나기 시작함"
      ]}
    ], endingNote:"스즈메가 문 너머에서 만나게 되는 존재가 누구인지, 그리고 스즈메와 소타가 어떤 결말을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Hijiribashi_Bridge.jpg", credit:"오차노미즈 히지리바시(聖橋), 도쿄 지요다구 · Wikimedia Commons · CC BY-SA 3.0", creditUrl:"https://commons.wikimedia.org/wiki/File:Hijiribashi_Bridge.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Suzume_(film)" },
  { id:"poksshak", title:"폭싹 속았수다 (When Life Gives You Tangerines)", author:"임상춘 극본 · 김원석 연출", type:"contemporary", country:"korea", medium:"tv_drama", genres:["drama","romance"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    era:"1950년대~현재", title_en:"When Life Gives You Tangerines", author_en:"Written by Lim Sang-choon · Directed by Kim Won-seok", era_en:"1950s – present",
    summary:"1950년대 제주, 열여섯 살 애순은 참고서보다 시를 쓰고 싶어 하는 '똑똑하고 반항기 있는' 소녀다. 무뚝뚝하지만 다정한 소년 관식과 얽히며 시작된 인연은, 사계절처럼 이어지는 70여 년의 삶으로 펼쳐진다. 가난과 이별, 그리고 다시 만나는 사람들 — 제주라는 땅에 새겨진 한 부부의 인생 이야기다.",
    longSummary:"이 드라마를 보기 전엔 그냥 '제주 배경의 잔잔한 로맨스겠지' 생각했다. 그런데 1화부터 마음을 흔든 건 로맨스가 아니라 애순이라는 인물이었다. 1950년대 제주에서 '똑똑한 여자애'로 사는 게 얼마나 버거운 일인지, 이 드라마는 예쁘게 포장하지 않고 그대로 보여준다.\n\n관식과 애순의 관계도 흔한 첫사랑 서사와는 결이 다르다. 두 사람은 서로를 구원하는 관계가 아니라, 그냥 나란히 버텨내는 관계에 가깝다. 그 담백함이 오히려 몇십 년을 이어가는 이야기에 설득력을 준다.\n\n개인적으로 가장 인상 깊었던 건 시간의 흐름을 다루는 방식이다. 젊은 애순을 연기하던 배우가 어느 순간 중년의 얼굴로 바뀌는 장면 — 그 배우 교체 자체가 하나의 연출이 된다. 세월이 사람을 어떻게 바꾸는지, 그리고 무엇을 안 바꾸는지를 얼굴로 보여주는 방식이 인상적이었다.\n\n제주의 실제 풍경들 — 성산일출봉, 협재 바다, 메밀꽃밭 — 이 드라마 속에서 그냥 배경이 아니라 인물들의 감정 그 자체로 쓰인다는 것도 이 작품을 다시 보게 만드는 이유다.",
    pinColor:"#2fa876",
    summary_en:"In 1950s Jeju, sixteen-year-old Ae-sun would rather write poems than study — a sharp, defiant girl in a place that doesn't quite know what to do with her. Her bond with the gruff but tender Gwan-sik grows into a 70-year story told across the seasons. Poverty, loss, and the people who keep coming back — this is one couple's life, carved into the land of Jeju.",
    longSummary_en:"Going in, I expected a quiet romance set in Jeju. What actually hooked me from episode one wasn't the romance — it was Ae-sun herself. The show doesn't soften how hard it was to be a 'smart girl' in 1950s Jeju; it just shows you.\n\nAe-sun and Gwan-sik's relationship isn't the usual first-love arc either. They don't save each other so much as simply endure side by side, and that plainness is what makes a story spanning decades feel earned.\n\nWhat stayed with me most was how the show handles time. The moment the actress playing young Ae-sun is replaced by an older actress mid-scene — that recasting itself becomes a piece of direction. Showing what years do to a person, and what they don't, through a changing face is genuinely striking.\n\nJeju's real scenery — Seongsan Ilchulbong, Hyeopjae's sea, the buckwheat fields — isn't just backdrop here. It carries the characters' emotions directly, which is why this one's worth watching more than once.",
    communityNote:"공개 당시 IMDb·왓챠피디아 등에서 역대 한국 드라마 중 손꼽히는 평점을 기록했다는 평가가 확인됐어요. 시청자들 사이에서는 실제로는 제주가 아니라 안동·고창·여수 등 육지에서 촬영된 장면이 많다는 사실이 특히 화제였는데, 이 사이트의 타임라인·장소 소개에도 그 반전을 함께 담았습니다. 아이유가 직접 부른 OST '밤 산책'도 방영 후 큰 화제를 모았습니다.",
    communityNote_en:"At release, the show reportedly earned some of the highest ratings ever recorded for a Korean drama on sites like IMDb and Watcha Pedia. Viewers were especially struck to learn that many 'Jeju' scenes were actually filmed on the mainland — in Andong, Gochang, and Yeosu — a twist we've woven into this site's timeline and location write-ups. IU's own vocals on the OST track 'Midnight Walk' also drew significant attention after the show aired.",
    // 2026-08 SEO 파일럿: 검색 유입 첫 화면을 "줄거리" 대신 "발견형 훅"으로 바꾸는 실험.
    // discoveryHook은 클릭 없이 페이지 로드 즉시 전부 보이도록 정적 페이지 본문에 그대로 렌더링된다.
    hookBadge:"Netflix · 아이유 × 박보검 · 촬영지 & 숨은 이야기",
    hookTagline:"폭싹 속았수다, 그 장면 어디였지?",
    hookStats:"촬영 비하인드 4가지 · 실제 장소 28곳",
    hookReveals:[
      { label:"유채꽃밭 → 전북 고창", label_en:"Canola field → Gochang, not Jeju", label_ja:"菜の花畑 → 全羅北道 高敞", locId:"gochang_hagwon_farm" },
      { label:"제주 마을 세트 → 경북 안동", label_en:"The whole village → a set in Andong", label_ja:"村の全体 → 慶尚北道 安東のセット", locId:"andong_set" },
      { label:"'도동리' → 가상의 지명(실존 안 함)", label_en:"'Dodong-ri' → doesn't exist on any map", label_ja:"「トドンリ」 → 実在しない地名", locId:null },
      { label:"김녕 바다 → 진짜 촬영지", label_en:"Gimnyeong Beach → actually real", label_ja:"金寧の海 → 本物の撮影地", locId:"gimnyeong_beach" }
    ],
    hookBadge_en:"Netflix · IU × Park Bo-gum · Filming locations & behind-the-scenes",
    hookTagline_en:"Wait, where was that scene actually filmed?",
    discoveryHook_en:[
      "After watching When Life Gives You Tangerines, there's this thing that happens.",
      "You want to go to Jeju.",
      "You want to see the sea Ae-sun and Gwan-sik walked along, that canola field.",
      "Going in, I expected a quiet romance set in Jeju. What actually hooked me from episode one wasn't the romance — it was Ae-sun herself. The show doesn't soften how hard it was to be a sharp, defiant sixteen-year-old who'd rather write poems than study, in 1950s Jeju; it just shows you.",
      "Ae-sun grows up poor with her mother Jeon Gwang-rye, a haenyeo diver, and loses her father to the Korean War — the era's wounds run deep through the family history. In the middle of all that, she builds a bond from childhood with the gruff but tender boy next door, Gwan-sik.",
      "What stayed with me most was how the show handles time. The moment the actress playing young Ae-sun is replaced by an older actress mid-scene — that recasting itself becomes a piece of direction. Showing what years do to a person, and what they don't, through a changing face is genuinely striking.",
      "Ae-sun and Gwan-sik marry and simply endure, leaning on each other through poverty and hard labor, day after day. Their story carries into the next generation through their three children — eldest daughter Geum-myeong, Eun-myeong, and Dong-myeong.",
      "Grown up, Geum-myeong leaves Jeju in 1987 to study English literature at Seoul National University. Working a box-office job at the Gwangju Theater — nicknamed the 'Cannes Theater' — she crosses paths with Park Yeong-beom, the son of a government official, and starts a new relationship with Park Chung-seop, a sign painter at the same theater. Their very different backgrounds become one thread of the story.",
      "And then the show returns to Ae-sun and Gwan-sik, now middle-aged and elderly, still living side by side. Raising and letting go of their children, growing old together through all of life's turns — I realized late that this, not the early romance, is the show's real center.",
      "So I looked up the filming locations. Turns out it's more interesting than I expected.",
      "That yellow canola field where the two of them stood — I just assumed it was Jeju. It was actually Gochang, in North Jeolla.",
      "The village where they grew up isn't a real Jeju village either — the crew built the entire thing from scratch in Andong. Stone walls, houses, even a harbor, and they gradually changed the wallpaper and roofs as the story moved through the decades.",
      "Here's the part that genuinely surprised me. The village Ae-sun and Gwan-sik lived in, 'Dodong-ri' — if you pull up a map in Jeju looking for it, it's not there. It never existed. It's a fictional place name the production made up on purpose, specifically so it wouldn't resemble any one real Jeju village too closely — like they wanted it to feel like anyone's hometown, not a specific place.",
      "Some spots are the real deal, though. Gimnyeong Beach is still there, looking exactly like it does on screen.",
      "At release, the show reportedly earned some of the highest ratings ever recorded for a Korean drama on sites like IMDb and Watcha Pedia. IU's own vocals on the OST track 'Midnight Walk' also drew significant attention after it aired.",
      "So if you do make it to Jeju, maybe don't just hit the famous spots — try tracking down one or two of these and asking yourself, 'wait, was this the scene?' Though maybe the biggest twist of all is that most of the scenes that hit you hardest weren't shot in Jeju at all — they were shot in Andong and Gochang."
    ],
    hookBadge_ja:"Netflix · IU × パク・ボゴム · 撮影地&裏話",
    hookTagline_ja:"あのシーン、実はどこで撮ったの?",
    discoveryHook_ja:[
      "『おつかれさま』を見終わると、ちょっとこうなる。",
      "済州島に行きたくなる。",
      "エスンとグァンシクが歩いた海も見たいし、菜の花畑にも一度行ってみたい。",
      "見る前は「済州島を舞台にした静かな恋愛ドラマだろう」くらいに思っていた。でも1話目から心を掴んだのは恋愛ではなく、エスンという人物そのものだった。1950年代の済州で、参考書より詩を書きたがる、賢くて反抗的な16歳の少女として生きることがどれほどしんどいことか、このドラマは飾らずそのまま見せてくる。",
      "海女の母チョン・グァンレと共に貧しい暮らしの中で育ち、朝鮮戦争で父まで失うエスン。時代の痛みが家族の歴史に深く刻まれている中で、無愛想だけど優しい隣の少年グァンシクと幼い頃から縁を結んでいく。",
      "個人的に一番印象に残ったのは、時間の流れの描き方だ。若いエスンを演じていた俳優が、ある瞬間から中年の顔に変わる場面——その配役の切り替え自体がひとつの演出になっている。歳月が人をどう変えて、何を変えないのか。それを顔で見せるやり方が印象的だった。",
      "エスンとグァンシクは夫婦の縁を結び、貧しさと厳しい労働の中でも互いに寄りかかりながら日々を耐え抜いていく。二人の間に生まれた長女クミョンを始め、ウンミョン・トンミョンの三兄妹の物語が次の世代へと続いていく。",
      "成長したクミョンは1987年、ソウル大学英文科に進学して済州島を離れる。「カンヌ劇場」と呼ばれた光州劇場でチケット売り場のアルバイトをしながら、次官の息子パク・ヨンボムと縁を結び、同じ劇場で看板画家として働くパク・チュンソプとも新しい関係が始まる。それぞれ違う出自が物語のもうひとつの軸になっていく。",
      "そして再び、中年、老年になったエスンとグァンシクの人生が並行して描かれる。子どもたちを育て、送り出しながら経験する人生の浮き沈み、夫婦で一緒に歳を重ねていく姿——これこそがこのドラマの本当の中心なんだと、遅れて気づいた。",
      "それで撮影地を少し調べてみたら、思ったより面白かった。",
      "二人がいたあの黄色い菜の花畑。てっきり済州島だと思っていたら、全羅北道の高敞(コチャン)だった。",
      "幼い頃に住んでいた済州島の村も、実在する済州の村ではなく、制作陣が安東(アンドン)に丸ごと作ったセットだった。石垣や家はもちろん、時代が進むごとに壁紙や屋根まで少しずつ変えて撮影したという。",
      "そして、これは調べていて驚いたこと。エスンとグァンシクが暮らした「トドンリ」。済州旅行で地図を開いて探しても出てこない。もともと存在しない村なのだ。制作陣が作った架空の地名で、あえて特定の済州の村に見えないようにしたという。一つの村の物語ではなく、誰にでもありそうな故郷に見せたかったのかもしれない。",
      "逆に、本物の済州で撮影された場所もある。金寧(キムニョン)海水浴場は今もそのまま行くことができる。",
      "このドラマ、公開当時IMDbやワチャピディアなどで歴代韓国ドラマの中でも指折りの評価を受けたという。IUが自ら歌ったOST「夜の散歩」も放送後大きな話題を呼んだそうだ。",
      "だから済州島に行くなら、有名観光地だけ回らずに、「ここ、もしかしてあのシーンじゃない?」と一つ二つ探してみるのも、意外と楽しいはず。もっとも、本当に心を揺さぶられたシーンの多くが済州ではなく安東と高敞で撮られていたというのが、このドラマ一番のどんでん返しなのかもしれない。"
    ],
    discoveryHook:[
      "《폭싹 속았수다》 보고 나면 좀 그런 게 있다.",
      "제주 가고 싶다.",
      "애순이랑 관식이가 걷던 바다도 보고 싶고, 유채꽃밭도 한번 가보고 싶고.",
      "그런데 이 드라마, 사실 처음 볼 땐 그냥 '제주 배경의 잔잔한 로맨스겠지' 싶었다. 그런데 1화부터 마음을 흔든 건 로맨스가 아니라 애순이라는 인물이었다. 1950년대 제주에서 참고서보다 시를 쓰고 싶어하는, 똑똑하고 반항기 있는 열여섯 살 소녀로 사는 게 얼마나 버거운 일인지, 이 드라마는 예쁘게 포장하지 않고 그대로 보여준다.",
      "해녀인 어머니 전광례와 함께 가난한 형편 속에서 자란 애순, 한국전쟁으로 아버지까지 잃는 등 시대의 아픔이 가족사 깊숙이 새겨져 있는데, 그 와중에 무뚝뚝하지만 다정한 이웃 소년 관식과 어린 시절부터 인연을 쌓아간다.",
      "개인적으로 가장 인상 깊었던 건 시간의 흐름을 다루는 방식이다. 젊은 애순을 연기하던 배우가 어느 순간 중년의 얼굴로 바뀌는 장면 — 그 배우 교체 자체가 하나의 연출이 된다. 세월이 사람을 어떻게 바꾸는지, 그리고 무엇을 안 바꾸는지를 얼굴로 보여주는 방식이 인상적이었다.",
      "애순과 관식이 부부의 연을 맺고, 가난과 고된 노동 속에서도 서로에게 의지하며 하루하루를 버텨내는 이야기가 이어진다. 두 사람 사이에서 태어난 장녀 금명을 비롯해 은명·동명 삼남매의 이야기로 다음 세대까지 넘어간다.",
      "자라난 금명은 1987년 서울대학교 영어영문학과에 진학하며 제주를 떠난다. 광주극장, 그러니까 '깐느극장'이라 불리던 곳에서 매표소 아르바이트를 하다가 차관 집안 아들 박영범과 인연을 맺고, 같은 극장에서 간판화가로 일하는 박충섭과도 새로운 관계가 시작되면서 서로 다른 출신 배경이 이야기의 한 축을 이룬다.",
      "그리고 다시, 중년과 노년이 된 애순과 관식의 삶이 함께 그려진다. 자식들을 키우고 떠나보내며 겪는 인생의 굴곡, 부부가 함께 나이 들어가는 모습이 이 드라마의 진짜 중심이라는 걸 뒤늦게 깨달았다.",
      "그래서 촬영지를 좀 찾아봤는데, 생각보다 재밌다.",
      "둘이 있던 그 노란 유채꽃밭. 난 당연히 제주인 줄 알았는데 전북 고창이었다.",
      "어린 시절 살던 제주 마을도 실제 제주 마을이 아니라, 제작진이 안동에 통째로 만든 세트였다. 돌담이랑 집은 물론이고, 시간이 흐를 때마다 벽지랑 지붕까지 조금씩 바꿔가며 찍었다고 한다.",
      "그리고 이건 찾아보다가 좀 신기했다. 애순과 관식이 살던 '도동리'. 제주 여행 가서 찾아보려고 지도 켜도 안 나온다. 원래 없는 마을이다. 제작진이 일부러 특정 제주 마을처럼 보이지 않게 만든 가상의 지명이라고 한다. 어느 한 동네의 이야기가 아니라, 누구한테나 있을 법한 고향처럼 보였으면 했던 것 같다.",
      "반대로 진짜 제주에서 찍은 곳도 있다. 김녕 바다 같은 곳은 지금도 그대로 가볼 수 있다.",
      "이 드라마, 공개 당시 IMDb·왓챠피디아 같은 곳에서 역대 한국 드라마 중 손꼽히는 평점을 받았다고 한다. 아이유가 직접 부른 OST '밤 산책'도 방영 후 큰 화제를 모았다고.",
      "그러니까 제주 가게 되면 그냥 유명 관광지만 돌지 말고, \"여기 혹시 그 장면 아니야?\" 하면서 한두 군데 찾아가 보는 것도 꽤 재밌을 듯. 다만 정작 그 마음을 흔든 장면들 상당수는 제주가 아니라 안동과 고창에 있다는 게 이 드라마의 제일 큰 반전인지도 모르겠다."
    ],
    contentSummary:{ sections:[
      { heading:"1950년대, 제주", bullets:[
        "열여섯 살 애순은 참고서보다 시를 쓰고 싶어하는 똑똑하고 반항기 있는 소녀",
        "해녀인 어머니 전광례와 함께 가난한 형편 속에서 자람",
        "무뚝뚝하지만 다정한 이웃 소년 관식과 어린 시절부터 인연을 쌓음",
        "한국전쟁으로 아버지를 잃는 등, 시대의 아픔이 가족사에 깊이 새겨져 있음"
      ]},
      { heading:"청년기, 사랑과 생계", bullets:[
        "애순과 관식이 서로에 대한 마음을 확인하고 부부의 연을 맺음",
        "가난과 고된 노동 속에서도 서로에게 의지하며 하루하루를 버텨나감",
        "두 사람 사이에서 장녀 금명을 비롯해 은명·동명 삼남매가 태어남"
      ]},
      { heading:"다음 세대, 금명의 이야기", bullets:[
        "자라난 금명은 1987년 서울대학교 영어영문학과에 진학하며 제주를 떠남",
        "광주극장('깐느극장')에서 매표소 아르바이트를 하며 차관 집안 아들 박영범과 인연을 맺음",
        "같은 극장에서 간판화가로 일하는 박충섭과도 새로운 관계가 시작되며, 서로 다른 출신 배경이 이야기의 한 축이 됨"
      ]},
      { heading:"다시, 애순과 관식", bullets:[
        "시간이 흘러 중년, 노년이 된 애순과 관식의 삶이 함께 그려짐",
        "자식들을 키우고 떠나보내며 겪는 인생의 굴곡과, 부부가 함께 나이 들어가는 모습이 이어짐"
      ]}
    ], endingNote:"애순과 관식, 그리고 금명의 이야기가 최종적으로 어떻게 마무리되는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Seongsan_Ilchulbong.jpg", credit:"성산일출봉, 제주 서귀포시 · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Seongsan_Ilchulbong.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%ED%8F%AD%EC%8B%B9_%EC%86%8D%EC%95%98%EC%88%98%EB%8B%A4" },
  { id:"santi", title:"삼체 (三体)", author:"류츠신(刘慈欣)", type:"scifi", country:"china", medium:"tv_drama", genres:["scifi","mystery"],
    lang:"zh", // 중국 원작 SF — 한자 표기, 중국어 태그·SNS(웨이보/더우반/바이두)를 우선한다.
    era:"1967년~미래(수백~수백만 년 후)", title_en:"The Three-Body Problem", author_en:"by Liu Cixin", era_en:"1967 – the far future (centuries to millions of years ahead)",
    hasUniverseMap:true,
    summary:"문화대혁명의 광기 속에서 아버지를 잃은 천체물리학자 예원제는 절망 끝에 우주를 향해 신호를 보낸다. 그 신호에 응답한 건, 자신들의 항성계가 곧 파괴될 것을 아는 외계 문명 '삼체'였다. 지구 vs 삼체 문명의 대결은 400년에 걸쳐 태양계 전체, 그리고 결국 우주의 근본 법칙 자체를 건 싸움으로 번져나간다.",
    longSummary:"삼체를 처음 읽었을 때 가장 놀랐던 건 이게 '외계인 침공물'이 아니라는 점이었다. 물론 외계 문명이 나오고, 함대가 오고, 지구의 운명이 걸려 있다. 그런데 이 소설이 진짜로 다루는 건 사람들이 위기 앞에서 어떤 선택을 하는가, 그리고 그 선택들이 수백 년에 걸쳐 어떻게 되돌아오는가다.\n\n1부의 예원제는 이 시리즈 전체를 이해하는 열쇠다. 문화대혁명이라는 실제 역사의 광기 속에서 인류에게 완전히 등을 돌린 한 사람의 선택이, 소설 전체의 첫 도미노가 된다. 류츠신은 이 지점에서 SF적 상상력보다 역사적 트라우마를 먼저 보여주는데, 그래서 이후에 벌어지는 모든 우주적 사건들이 오히려 더 인간적으로 느껴진다.\n\n2부의 '벽 앞의 사람들(面壁者)' 프로젝트와 '암흑의 숲(黑暗森林)' 이론은 개인적으로 가장 소름 돋았던 부분이다. 왜 우주는 이렇게 조용한가에 대한 이 소설만의 답은, 읽고 나면 밤하늘을 다시 보게 만든다. 3부에 이르면 이야기는 태양계를 넘어 수백만 년, 심지어 우주의 차원 구조 자체를 건 스케일로 확장되는데, 그럼에도 마지막까지 중심에 남는 건 정청신이라는 한 개인의 선택이다.\n\n소설에 등장하는 물리학·천문학 개념들 — 양자얽힘, 삼체 문제, 우주 배경복사, 중력파 — 은 실제 과학에 기반해 있으면서도 소설적 상상력으로 확장된 것들이라, 곳곳에 '어디까지가 진짜 과학이고 어디부터가 허구인지'를 짚어주는 설명을 함께 담았다.",
    pinColor:"#7b5fd6",
    summary_en:"Astrophysicist Ye Wenjie loses her father to the chaos of the Cultural Revolution and, in despair, sends a signal into space. It's answered by Trisolaris, an alien civilization that knows its home star system is doomed. Over four centuries, the standoff between Earth and Trisolaris grows from a fight over the solar system into a battle over the fundamental laws of the universe itself.",
    longSummary_en:"What struck me most reading The Three-Body Problem for the first time was that it isn't really an 'alien invasion' story. Yes, there's an alien civilization, a fleet, and Earth's fate on the line — but what the novel is actually about is what people choose to do in the face of crisis, and how those choices echo back centuries later.\n\nYe Wenjie in Book 1 is the key to the whole series. Her decision to turn her back on humanity, forged in the real historical trauma of the Cultural Revolution, becomes the first domino for everything that follows. Liu Cixin leads with historical trauma before science-fictional spectacle, which is exactly why the cosmic events later on feel so human.\n\nBook 2's Wallfacer Project and its Dark Forest theory were, for me, the most chilling part of the whole trilogy — the novel's own answer to why the universe is so quiet will change how you look at the night sky. By Book 3 the story's scale explodes outward across millions of years and even the dimensional structure of the universe itself, and yet the story never stops being about one person's choices: Cheng Xin's.\n\nThe physics and astronomy woven through the book — quantum entanglement, the three-body problem, cosmic background radiation, gravitational waves — are grounded in real science even as the story extends them into fiction, so I've included notes throughout marking where the real science ends and the imagination begins.",
    communityNote:"이 사이트는 원작 소설을 기준으로 콘텐츠를 구성했어요. 넷플릭스판(무대를 영국 옥스퍼드로 옮기고 원작 인물들을 동시대 동창생으로 재구성)과 텐센트판(중국 원작에 충실한 30부작)은 서로 각색 방향이 크게 달라, 배우 사진은 어느 판본인지 표기와 함께 부가정보로만 제공합니다. 넷플릭스 드라마는 공개 당시 세계 시청 순위 1위에 오르며 원작 IP의 화제성을 다시 보여줬습니다.",
    communityNote_en:"This site is organized around the original novel. The Netflix adaptation (which relocates the story to Oxford and reimagines characters from different eras as contemporary classmates) and the Tencent adaptation (a 30-episode series closer to the Chinese original) take very different approaches, so any actor photos are clearly labeled by version and offered only as supplementary context. The Netflix series reportedly topped global viewership charts at release, underscoring how much attention the IP still draws.",
    hookBadge:"류츠신 원작 SF · 실제 관측소·실존 항성계", hookTagline:"《삼체》 읽고 나서 밤하늘 보는 눈이 좀 달라졌다",
    discoveryHook:[
      "이 항성계, 진짜 있는 거야? 《삼체》 읽다 보면 이상한 지점에서 소름이 돋는다. 외계인이 나올 때가 아니라, '어? 이거 진짜잖아' 싶을 때.",
      "그런데 이 소설, 사실 처음부터 외계인 얘기가 아니다. 문화대혁명의 광기 속에서 아버지 예저타이를 잃은 천체물리학자 예원제가 인류에 대한 신뢰를 완전히 잃는 이야기로 시작한다.",
      "비밀 군사기지 '홍안기지'에 배치된 예원제는 태양을 증폭 매질로 이용해서 항성간 통신이 가능한 송신 장치를 완성하는데, 8년 뒤 삼체 문명의 한 평화주의자로부터 '답장하지 말라'는 경고를 받는다. 근데 예원제는 그 경고를 무시하고 다시 응답해버린다. 이 선택 하나가 삼체 문명의 지구 침공을 촉발하는 결정적 사건이 된다.",
      "예원제가 배치되는 비밀기지 '레드코스트'는 물론 완전한 허구다. 그런데 찾아보니 이 설정에 영감을 줬을 법한 진짜 시설들이 있다. 베이징 근교의 미윈 관측소 — 1960년대부터 실제로 우주를 향해 전파를 쏘고 받던, 냉전기 중국의 진짜 시설이다.",
      "그리고 예원제가 우주로 신호를 보내는 그 장면, 완전한 허구가 아니다. 1974년 인류는 실제로 아레시보 전파망원경에서 우주를 향해 의도적으로 메시지를 쏘아 보낸 적이 있다. '아레시보 메시지'라고, 소설 속 사건과 거의 겹치는 진짜 역사다.",
      "현재 시점 이야기도 따로 있다. 나노기술 연구자 왕먀오가 물리학자들의 연쇄 자살 사건과 미스터리한 VR게임 '삼체'에 휘말리며 배후의 진실에 다가가는데, 우청 작전으로 지구삼체운동(ETO)의 핵심 증거가 담긴 선박이 나노섬유로 절단되는 장면에서 삼체 문명이 미리 심어둔 초지능 컴퓨터 '지자(智子)'의 존재가 드러난다.",
      "2부에서는 지자가 인간의 생각만은 읽을 수 없다는 걸 이용해서, UN이 진실을 숨긴 채 네 명의 '면벽자'에게 전권을 부여한다. 타일러, 레이디아즈, 하인즈 세 사람의 계획은 차례로 무너지거나 진실이 드러나는데, 이 부분이 개인적으로 제일 소름 돋았다.",
      "마지막 면벽자 뤄지는 예원제에게 배운 '우주사회학' 공리를 이용해서 항성 좌표를 우주에 공개하겠다는 위협 능력을 갖추게 된다. 왜 우주가 이렇게 조용한지에 대한 이 소설만의 답, '암흑의 숲' 이론이다.",
      "185년의 동면 끝에 깨어난 뤄지가 마주하는 건 몰라볼 만큼 달라진 미래의 지구다. 그런데 삼체 함대의 정찰 프로브 '물방울'이 도착하면서, 인류가 자랑하던 2,000척의 함대가 단 몇 분 만에 전멸해버린다.",
      "뤄지가 실제로 항성 하나를 파괴시키는 데 성공하면서 억지력이 입증되긴 하지만, 결국 자신의 무덤가에서 삼체 함대와 최후의 대치를 벌이는 걸로 2부가 끝난다.",
      "3부에서는 우주비행공학자 청신이 죽어가는 연인 윈톈밍의 뇌만을 광속에 가까운 우주선에 실어 삼체 함대로 보내는 '계단 계획'을 제안한다. 청신은 뤄지에 이어 두 번째 '검잡이'가 되지만, 결정적 순간에 망설이면서 지구의 방어선이 무너진다.",
      "그 결과 함선 그래비티호와 블루스페이스호가 삼체 행성계의 좌표를 우주 전체에 방송해서 보복하는데, 결국 삼체 문명 자체가 정체불명의 제3의 문명에 의해 파괴된다. 이어서 고차원 문명의 무기가 태양계 전체를 3차원에서 2차원으로 붕괴시키는, 삼부작 최대 규모의 재난이 벌어진다.",
      "청신과 AA는 유일하게 남은 광속 우주선을 타고 붕괴하는 태양계를 탈출한다. 성간 여행 끝에 스스로를 가두어 공격 의도가 없음을 증명하는 방어 기술 '흑역(黑域)'을 발견하는데, 흑역 안에서 단 몇 주가 흐르는 사이 바깥 우주에서는 무려 1800만 년이 흘러버렸다는 걸 깨닫는다.",
      "그리고 윈톈밍이 남긴 마지막 선물, 독립된 '소우주 647호'를 통해 청신과 다시 만나게 된다.",
      "근데 제일 신기했던 건 따로 있다. 트리솔라리스 문명이 산다는 그 '삼체 항성계', 즉 알파 센타우리는 상상 속 이름이 아니라 지구에서 가장 가까운 실제 항성계다. 지구에서 4.37광년 떨어져 있는데, 남반구에서 맑은 밤하늘을 만나면 육안으로도 보인다고 한다. 소설 속 물리학 개념들 — 양자얽힘, 중력파 같은 것도 다 실제 과학에 기반한다. 특히 중력파는 2015년 실제로 인류가 처음 검출해서 2017년 노벨물리학상까지 받았다.",
      "그러니까 이 소설, 400년에 걸친 우주 전쟁 이야기이면서 동시에 진짜 과학과 진짜 역사 위에 지어 올린 이야기다. 나는 요즘도 맑은 밤에 남쪽 하늘 보면 알파 센타우리 어디쯤일까 괜히 한번 찾아보게 된다."
    ],
    hookReveals:[
      { label:"레드코스트 기지 → 완전 허구지만 실제 후보지로 꼽히는 미윈 관측소", label_en:"Red Coast Base → fictional, but Miyun Station is a real cited candidate", locId:"miyun_station" },
      { label:"톈옌 FAST 전파망원경 → 세계 최대, 실제 SETI 프로젝트에 쓰임", label_en:"The FAST telescope → the world's largest, actually used in real SETI research", locId:"fast_telescope" },
      { label:"예원제의 신호 발신 → 1974년 실제 '아레시보 메시지'와 겹치는 사건", label_en:"Ye Wenjie's transmission → parallels the real 1974 Arecibo Message", locId:"arecibo_observatory" },
      { label:"삼체 항성계 → 지구에서 가장 가까운 실제 항성계, 알파 센타우리", label_en:"The Trisolaran system → Alpha Centauri, Earth's real nearest star system", locId:"alpha_centauri" }
    ],
    hookBadge_en:"By Liu Cixin · Real observatories, a real star system",
    hookTagline_en:"After The Three-Body Problem, I look at the night sky differently now",
    discoveryHook_en:[
      "Wait, this star system actually exists? Reading The Three-Body Problem, the chills don't come from the aliens — they come from the moments you realize 'wait, this part is real.'",
      "But this novel doesn't actually start as an alien story. It opens with astrophysicist Ye Wenjie losing her father, Ye Zhetai, to the chaos of the Cultural Revolution, and losing her faith in humanity along with him.",
      "Stationed at the secret Red Coast Base, Ye Wenjie completes a transmitter powerful enough for interstellar communication using the sun as an amplifying medium. Eight years later, a pacifist within the Trisolaran civilization warns her not to reply. She ignores the warning and answers anyway — one choice that becomes the trigger for Trisolaris's invasion of Earth.",
      "The secret Red Coast Base is, of course, entirely fictional. But there are real facilities that plausibly inspired it. Miyun Station near Beijing is a genuine Cold War-era Chinese site that's been sending and receiving radio signals to and from space since the 1960s.",
      "And the scene where Ye Wenjie transmits a signal into space isn't pure fiction either. In 1974, humanity actually beamed a deliberate message into space from the Arecibo radio telescope — the Arecibo Message, real history that closely parallels what happens in the novel.",
      "There's a present-day storyline too. Nanotech researcher Wang Miao gets pulled into a string of physicist suicides and a mysterious VR game called 'Three Body' while chasing the truth behind it all — and during Operation Guzheng, a ship carrying the key evidence against the Earth-Trisolaris Organization (ETO) is sliced apart with nanofiber, revealing the existence of Sophon, the superintelligent computer Trisolaris planted on Earth in advance.",
      "In Book 2, because Sophons can't read human thoughts, the UN secretly grants total authority to four 'Wallfacers' without revealing why. The plans of three of them — Tyler, Rey Diaz, and Hines — collapse or get exposed one by one, and this part genuinely gave me chills.",
      "The last Wallfacer, Luo Ji, uses a cosmic-sociology axiom he learned from Ye Wenjie to gain the power to threaten broadcasting a star's coordinates to the universe — the novel's own answer to why the universe is so quiet: the Dark Forest theory.",
      "Luo Ji wakes from 185 years of hibernation to a future Earth he barely recognizes — only for the Trisolaran scout probe, the 'droplet,' to arrive and wipe out humanity's proud 2,000-ship fleet in minutes.",
      "Luo Ji proves the deterrence works by actually destroying a star, but Book 2 ends with him in a final standoff against the Trisolaran fleet, at his own grave.",
      "In Book 3, aerospace engineer Cheng Xin proposes the 'Staircase Program' — sending only the brain of her dying lover, Yun Tianming, toward the Trisolaran fleet on a near-light-speed ship. Cheng Xin becomes the second 'Swordholder' after Luo Ji, but hesitates at the critical moment, and Earth's defenses collapse.",
      "In retaliation, the ships Gravity and Blue Space broadcast Trisolaris's coordinates to the entire universe — and Trisolaris itself is ultimately destroyed by an unidentified third civilization. What follows is the trilogy's biggest catastrophe yet: a higher-dimensional weapon collapses the entire solar system from three dimensions into two.",
      "Cheng Xin and AA escape the collapsing solar system on the only remaining light-speed ship. After an interstellar journey, they discover 'Black Domain' technology — sealing themselves off to prove they have no hostile intent — and realize that while only a few weeks pass inside the Black Domain, a staggering 18 million years pass in the outside universe.",
      "Eventually, through Yun Tianming's final gift — an independent pocket universe called 'Universe 647' — Cheng Xin is reunited with him.",
      "But the thing that surprised me most was something else entirely: the 'Trisolaran star system' where the aliens live — Alpha Centauri — isn't an invented name. It's the real star system closest to Earth, about 4.37 light-years away, and on a clear night in the Southern Hemisphere, you can actually see it with the naked eye. The physics throughout the novel — quantum entanglement, gravitational waves — is grounded in real science too. Gravitational waves in particular were first actually detected by humanity in 2015, work that won the 2017 Nobel Prize in Physics.",
      "So this novel is a 400-year cosmic war story, and at the same time, it's built on real science and real history. These days, on a clear night, I catch myself trying to spot roughly where Alpha Centauri would be in the southern sky."
    ],
    discoveryHook_ja:[
      "この恒星系、本当にあるの? 『三体』を読んでいると、妙なところでゾクッとする。宇宙人が出てくる場面じゃなくて、「あれ、これ本当の話じゃん」と気づく瞬間に。",
      "でもこの小説、実は最初から宇宙人の話じゃない。文化大革命の狂気の中で父イエ・ジョタイを失った天体物理学者イエ・ウェンジエが、人類への信頼を完全に失っていく話から始まる。",
      "秘密軍事基地「紅岸基地」に配属されたイエ・ウェンジエは、太陽を増幅媒体に利用して恒星間通信が可能な送信装置を完成させる。8年後、三体文明の平和主義者から「返信するな」という警告を受け取るが、イエ・ウェンジエはその警告を無視して返信してしまう。この一つの選択が、三体文明による地球侵攻を引き起こす決定的な出来事になる。",
      "イエ・ウェンジエが配属される秘密基地「紅岸」はもちろん完全な創作だ。でも調べてみると、この設定にヒントを与えたと思われる実在の施設がある。北京郊外の密雲観測所——1960年代から実際に宇宙へ向けて電波を送受信していた、冷戦期中国の本物の施設だ。",
      "そしてイエ・ウェンジエが宇宙に信号を送るあの場面も、完全な創作ではない。1974年、人類は実際にアレシボ電波望遠鏡から宇宙へ向けて意図的にメッセージを送ったことがある。「アレシボ・メッセージ」と呼ばれる、小説の出来事とほぼ重なる本物の歴史だ。",
      "現代パートの物語も別にある。ナノテク研究者のワン・ミャオが、物理学者たちの連鎖自殺事件と謎のVRゲーム「三体」に巻き込まれながら背後の真実に近づいていくんだけど、「牛騾作戦」で地球三体運動(ETO)の核心証拠を積んだ船がナノファイバーで切断される場面で、三体文明が事前に仕込んでいた超知能コンピューター「智子(ソフォン)」の存在が明らかになる。",
      "2部では、智子が人間の思考だけは読めないという弱点を利用して、国連が真相を隠したまま4人の「面壁者」に全権を与える。テイラー、レイディアズ、ハインズという3人の計画が次々と崩れたり真相が暴かれたりするんだけど、この部分が個人的に一番ゾクッとした。",
      "最後の面壁者ルオ・ジーは、イエ・ウェンジエから学んだ「宇宙社会学」の公理を使い、恒星の座標を宇宙全体に公開すると脅す力を手に入れる。宇宙がなぜこんなに静かなのかというこの小説なりの答え、「暗黒森林理論」だ。",
      "185年間の冬眠から目覚めたルオ・ジーが見るのは、見違えるほど変わった未来の地球。ところが三体艦隊の偵察プローブ「水滴」が到着すると、人類が誇っていた2000隻の艦隊がわずか数分で全滅してしまう。",
      "ルオ・ジーは実際に恒星をひとつ破壊してみせ、抑止力を証明するけれど、結局自分の墓の前で三体艦隊と最後の対峙をするところで2部が終わる。",
      "3部では、宇宙飛行工学者のチェン・シンが、死にゆく恋人ユン・ティエンミンの脳だけを光速に近い宇宙船に乗せて三体艦隊へ送る「階段計画」を提案する。チェン・シンはルオ・ジーに続く2人目の「剣を持つ者」になるけれど、決定的な瞬間にためらってしまい、地球の防衛線が崩壊する。",
      "その結果、宇宙船グラビティ号とブルースペース号が三体星系の座標を宇宙全体に放送して報復するんだけど、最終的に三体文明そのものが正体不明の第三の文明によって滅ぼされてしまう。続いて、高次元文明の兵器が太陽系全体を3次元から2次元へと崩壊させる、三部作最大の災厄が起こる。",
      "チェン・シンとAAは唯一残った光速宇宙船で崩壊する太陽系を脱出する。恒星間航行の果てに、自らを閉じ込めることで攻撃の意図がないことを証明する防御技術「黒域」を発見するんだけど、黒域の中ではわずか数週間しか経っていないのに、外の宇宙では実に1800万年もの歳月が流れていたことに気づく。",
      "そしてユン・ティエンミンが遺した最後の贈り物、独立した「小宇宙647号」を通じて、チェン・シンは彼と再会する。",
      "でも一番驚いたのは別のところだった。トリソラリス文明が住むという「三体星系」、つまりケンタウルス座アルファ星は、想像上の名前じゃなくて地球から一番近い実在の恒星系だ。地球から4.37光年離れているけれど、南半球で晴れた夜空に出会えば肉眼でも見えるという。小説に出てくる物理学の概念——量子もつれや重力波なども、すべて実際の科学に基づいている。特に重力波は2015年に人類が実際に初めて検出し、2017年のノーベル物理学賞まで受賞している。",
      "つまりこの小説、400年に及ぶ宇宙戦争の物語でありながら、同時に本物の科学と本物の歴史の上に築かれた物語でもあるわけだ。私は最近も、晴れた夜に南の空を見ると、ついケンタウルス座アルファ星がどのあたりにあるのか探してしまう。"
    ],
    title_ja:"三体", summary_ja:"文化大革命の狂気の中で父を失った天体物理学者イエ・ウェンジエは、絶望の果てに宇宙へ向けて信号を送る。その信号に応えたのは、自分たちの恒星系がまもなく崩壊することを知る地球外文明「三体」だった。地球対三体文明の対立は400年にわたって太陽系全体を、そして最終的には宇宙の根本法則そのものを賭けた戦いへと広がっていく。", author_ja:"劉慈欣", era_ja:"1967年〜未来(数百年〜数百万年後)",
    contentSummary:{ sections:[
      { heading:"1부 · 삼체문제 — 예원제의 선택", bullets:[
        "문화대혁명의 광기 속에서 아버지 예저타이를 잃은 천체물리학자 예원제, 인류에 대한 신뢰를 잃음",
        "비밀 군사기지 '홍안기지'에 배치되어, 태양을 증폭 매질로 이용해 항성간 통신이 가능한 수준의 송신 장치를 완성함",
        "8년 뒤, 삼체 문명의 한 평화주의자로부터 '답장하지 말라'는 경고성 응답을 받음",
        "예원제는 경고를 무시하고 다시 응답 — 이 선택이 삼체 문명의 지구 침공을 촉발하는 결정적 사건이 됨",
        "현재 시점에서는 나노기술 연구자 왕먀오가 물리학자들의 연쇄 자살 사건과 미스터리한 VR게임 '삼체'에 휘말리며 배후의 진실에 다가감",
        "우청 작전으로 지구삼체운동(ETO)의 핵심 증거가 담긴 선박이 나노섬유로 절단되고, 삼체 문명이 미리 심어둔 초지능 컴퓨터 '지자(智子)'의 존재가 드러남"
      ]},
      { heading:"2부 · 암흑의 숲 — 면벽자들", bullets:[
        "지자가 인간의 생각만은 읽을 수 없다는 점에 착안, UN이 진실을 숨긴 채 네 명의 '면벽자'에게 전권을 부여함",
        "타일러·레이디아즈·하인즈, 세 면벽자의 계획이 차례로 무너지거나 진실이 드러남",
        "마지막 면벽자 뤄지가 예원제에게 배운 '우주사회학' 공리를 이용해, 항성 좌표를 우주에 공개하겠다는 위협 능력을 갖추게 됨",
        "185년의 동면 끝에 깨어난 뤄지가 몰라볼 만큼 달라진 미래의 지구와 마주함",
        "삼체 함대의 정찰 프로브 '물방울'이 도착하고, 인류가 자랑하던 2,000척의 함대가 단 몇 분 만에 전멸함",
        "뤄지가 실제로 항성 하나를 파괴시키는 데 성공하며 억지력이 입증되지만, 결국 자신의 무덤가에서 삼체 함대와 최후의 대치를 벌이는 것으로 2부가 마무리됨"
      ]},
      { heading:"3부 · 사신의 영생 — 청신과 계단 계획", bullets:[
        "우주비행공학자 청신이 죽어가는 연인 윈톈밍의 뇌만을 광속에 가까운 우주선에 실어 삼체 함대로 보내는 '계단 계획'을 제안함",
        "청신이 뤄지에 이어 두 번째 '검잡이'가 되지만, 결정적 순간의 망설임으로 지구의 방어선이 무너짐",
        "함선 그래비티호와 블루스페이스호가 삼체 행성계의 좌표를 우주 전체에 방송해 보복 — 결국 삼체 문명 자체가 정체불명의 제3의 문명에 의해 파괴됨",
        "이어 고차원 문명의 무기가 태양계 전체를 3차원에서 2차원으로 붕괴시키는, 삼부작 최대 규모의 재난이 벌어짐",
        "청신과 AA가 유일하게 남은 광속 우주선을 타고 붕괴하는 태양계를 탈출, 성간 여행 끝에 스스로를 가두어 공격 의도가 없음을 증명하는 방어 기술 '흑역(黑域)'을 발견함",
        "흑역 안에서는 단 몇 주가 흐르는 사이 바깥 우주에서는 무려 1800만 년이 흘러버렸다는 사실을 깨닫게 됨",
        "윈톈밍이 남긴 마지막 선물, 독립된 '소우주 647호'를 통해 청신과 다시 만나게 됨"
      ]}
    ], endingNote:"우주 전체의 질량 결손 문제를 둘러싼 마지막 선택, 그리고 인류 문명의 최종적인 운명은 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Best_image_of_Alpha_Centauri_A_and_B.jpg", credit:"허블 우주망원경이 촬영한 알파centauri A·B(삼체 문명의 실제 모델 항성계) · NASA/ESA · CC BY 4.0", creditUrl:"https://commons.wikimedia.org/wiki/File:Best_image_of_Alpha_Centauri_A_and_B.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%82%BC%EC%B2%B4_(%EC%86%8C%EC%84%A4)" },
  { id:"breakingbad", title:"브레이킹 배드 (Breaking Bad)", author:"빈스 길리건 제작 · AMC", type:"crime", country:"usa", medium:"tv_drama", genres:["crime","drama","thriller"],
    lang:"en", // 영어권 작품 — 일본/중국어 태그 로직 대신 레딧 등 영어권 SNS 채널을 별도로 노출한다.
    era:"2008년~2013년", title_en:"Breaking Bad", author_en:"Created by Vince Gilligan · AMC", era_en:"2008–2013",
    summary:"평범한 고등학교 화학교사 월터 화이트는 말기 폐암 진단을 받은 뒤, 가족에게 돈을 남기겠다는 절박함으로 옛 제자 제시와 함께 마약 제조에 뛰어든다. '피해자'였던 남자가 서서히 '하이젠버그'라는 이름의 가해자로 변해가는 5년간의 이야기 — 뉴멕시코주 앨버커키의 실제 거리와 건물들이 그대로 무대가 된다.",
    longSummary:"브레이킹 배드를 처음 볼 때는 그냥 '암 걸린 교사가 마약을 만든다'는 설정만 알고 시작했다. 그런데 이 드라마가 진짜 무서운 건 마약 제조 자체가 아니라, 한 사람이 '어쩔 수 없었다'는 변명 뒤에서 서서히 즐기기 시작하는 과정이다.\n\n월터 화이트는 시즌1에서는 확실히 피해자였다. 능력에 비해 인정받지 못한 인생, 갑작스러운 시한부 선고, 가족을 지키고 싶다는 절박함. 그런데 시즌이 흐를수록 '가족을 위해서'라는 명분은 점점 얇아지고, 그 자리를 지배욕과 자존심이 채운다. 하이젠버그라는 알터에고는 처음엔 위장이었지만, 나중엔 오히려 월터가 숨기고 싶었던 진짜 얼굴에 더 가까워진다.\n\n제시 핑크맨과의 관계도 이 드라마의 핵심이다. 스승과 제자, 동업자, 그리고 서로를 이용하면서도 놓지 못하는 애증 — 이 복잡한 관계가 시리즈 내내 가장 인간적인 축을 이룬다. 반대편에는 로스 포요스 에르마노스 치킨집 뒤에서 마약 유통망을 지휘하는 구스 프링이 있는데, 감정을 거의 드러내지 않는 그 침착함이 오히려 극도의 공포를 만들어낸다.\n\n무엇보다 이 드라마를 다시 보게 만드는 건 촬영지 전부가 실제로 존재하는 앨버커키의 거리라는 점이다. 월터의 집, 세차장, 로스 포요스 에르마노스로 쓰인 실제 식당까지 — 그린스크린 없이 진짜 도시를 그대로 무대로 삼았기 때문에, 팬들이 직접 찾아가 '그 장면 속 그 자리'에 설 수 있는 몇 안 되는 작품이다.",
    pinColor:"#c9a227",
    summary_en:"Walter White, an unassuming high school chemistry teacher, is diagnosed with terminal lung cancer and, desperate to leave something behind for his family, turns to cooking meth with a former student, Jesse. Over five years, a man who starts out as a victim of circumstance slowly transforms into someone else entirely — Heisenberg — against the backdrop of real streets and buildings in Albuquerque, New Mexico.",
    hookBadge:"AMC · 앨버커키 실제 촬영지 · 지금도 영업 중", hookTagline:"《브레이킹 배드》 보고 나서 앨버커키가 계속 궁금했다",
    discoveryHook:[
      "그 치킨집, 진짜 영업 중이라고? 《브레이킹 배드》 보고 나면 이상하게 앨버커키가 궁금해진다.",
      "근데 이 드라마, 사실 시즌1의 월터 화이트는 확실히 피해자다. 고등학교 화학교사로 능력에 비해 인정받지 못하고 살다가, 말기 폐암 진단을 받고서 가족에게 돈을 남기겠다는 절박함 하나로 옛 제자 제시 핑크맨과 손잡고 RV 안에서 첫 마약 제조를 시작한다. 크레이지-8과 에밀리오랑 벌이는 위험한 충돌이 그 시작이다.",
      "근데 시즌이 흐를수록 '가족을 위해서'라는 명분이 점점 얇아지고, 그 자리를 지배욕과 자존심이 채운다. 사막에서 RV가 고장 나면서 벌어지는 생존 위기(4 Days Out)를 지나, 제시의 연인 제인 마골리스와 관련된 비극적 사건까지 겪으면서 월터는 이미 예전의 그가 아니게 된다.",
      "이때 시작된 '리신 담배' 서브플롯은 무려 시즌4까지 이어지고, 동업자였던 콤보를 구역 다툼 속에서 잃는 등 이 시기부터 이미 사람이 죽어나가기 시작한다.",
      "그리고 로스 포요스 에르마노스 뒤에서 유통망을 총괄하는 구스 프링이 본격 등장한다. 감정을 거의 드러내지 않는 그 침착함이 오히려 극도의 공포를 만들어내는 인물인데, 구스와 손잡으면서 지하 슈퍼랩이 가동되고 사업 규모가 비약적으로 커진다.",
      "근데 그만큼 위기도 커진다. 구스의 조카뻘 살라만카 사촌들의 습격, 제시가 구스의 화학자 게일 보티커를 둘러싼 사건에 휘말리는 전개까지 이어지면서 목숨을 건 순간들이 계속된다.",
      "결국 월터와 구스의 갈등은 정면충돌로 치닫는다. 안드레아의 아들, 어린 브록이 중독되는 사건까지 벌어지는데 이게 팬들 사이에서 지금까지도 제일 뜨거운 논쟁거리 중 하나다. 구스 프링의 죽음과 함께 슈퍼랩이 파괴되면서 한 시대가 끝난다.",
      "그 후로도 월터는 사업을 멈추지 않는다. 바모노스 페스트 컨트롤을 이용한 새 이동식 랩으로 옮겨가고, 기차를 이용한 대담한 화학약품 탈취 작전까지 벌인다.",
      "그리고 '오지만디아스'. 시리즈 최대 전환점이라 불리는 이 사건에서, 해결사였던 마이크 얼먼트라웃을 잃고, 형사였던 처형 행크 슈레이더가 마침내 '하이젠버그'의 정체를 알아챈다.",
      "투하히일리 사막에서 벌어지는 총격전으로 가족 전체가 걷잡을 수 없이 무너지고, 월터는 모든 걸 잃은 채 도피 생활에 들어간다. 최종화 'Felina'에서 월터가 어떤 선택을 내리는지는 여기서 스포일러하지 않겠다 — 이건 진짜 직접 보는 게 낫다.",
      "그린스크린 하나 없이 실제 도시를 그대로 무대로 썼다는 얘기를 듣고 촬영지를 찾아봤는데, 진짜 놀라운 건 그중 상당수가 지금도 그대로 운영되고 있다는 거다.",
      "구스 프링의 표면상 사업체였던 치킨 프랜차이즈 로스 포요스 에르마노스. 이게 세트가 아니라 실제로 영업 중인 패스트푸드점 'Twisters'다. 팬들이 직접 들어가서 주문하고, 그 자리에서 인증샷까지 남길 수 있다고 한다.",
      "투코 살라만카가 은신처로 썼던 건물도 지금은 실제 카페 'Java Joe's'로 바뀌어 있다. 마약상의 아지트였던 곳에서 커피를 마실 수 있다는 게 좀 웃기면서도 묘하다.",
      "월터의 표면상 직업이었던 세차장도 지금까지 실제로 영업 중이다. 16개 에피소드나 등장했던, 그의 '평범한 삶'과 이중생활이 겹치던 바로 그 장소에서 실제로 세차를 맡길 수 있다.",
      "반대로 무겁게 다가오는 곳도 있다. 시리즈 최대 전환점인 '오지만디아스' 사막 총격전 — 이 장면은 CG가 아니라 나바호 네이션 영내 투하히일리에서 실제로 촬영됐다.",
      "시즌 초반 사막 장면이 나오는 화이트 샌즈도 마찬가지다. 새하얀 석고 사구가 끝없이 펼쳐지는, 진짜 존재하는 국립공원이다.",
      "그러니까 이 드라마, 정말로 한 도시를 통째로 무대 삼아 찍은 몇 안 되는 작품이다. 나는 아직 앨버커키에 안 가봤지만, 언젠가 가면 그 세차장에서 세차 한번 맡기고 Twisters에서 치킨도 한 접시 먹어보고 싶다."
    ],
    hookReveals:[
      { label:"로스 포요스 에르마노스 → 실제 영업 중인 식당 Twisters", label_en:"Los Pollos Hermanos → an actual working restaurant, Twisters", locId:"lospollos" },
      { label:"투코의 은신처 → 지금은 실제 카페 Java Joe's", label_en:"Tuco's hideout → now a real café, Java Joe's", locId:"tuco_office" },
      { label:"월터의 세차장 → 지금도 실제로 영업 중", label_en:"Walter's car wash → still a real, working car wash", locId:"carwash" },
      { label:"오지만디아스 총격전지 → 나바호 네이션 영내, 실제 촬영지", label_en:"The Ozymandias shootout site → real location on Navajo Nation land", locId:"tohajiilee" }
    ],
    hookBadge_en:"AMC · Real Albuquerque filming locations · Still open for business",
    hookTagline_en:"After Breaking Bad, Albuquerque just kept nagging at me",
    discoveryHook_en:[
      "Wait, that chicken place is actually still open? After Breaking Bad, Albuquerque starts to feel oddly compelling.",
      "In season one, Walter White really is a victim. An underappreciated high school chemistry teacher, he gets a terminal cancer diagnosis and, desperate to leave something for his family, teams up with former student Jesse Pinkman to cook meth for the first time in an RV — kicking things off with a dangerous run-in with Crazy-8 and Emilio.",
      "But as the seasons go on, 'for my family' gets thinner and thinner as an excuse, and something closer to pure hunger for control and pride fills the gap. Between the desert survival crisis when the RV breaks down ('4 Days Out') and the tragic incident involving Jesse's girlfriend Jane Margolis, Walter is already someone else by the time it's over.",
      "The 'ricin cigarette' subplot that starts here runs all the way through season four, and Walter loses his partner Combo in a turf dispute — people are already dying by this point.",
      "Then Gus Fring makes his real entrance, running the distribution network from behind Los Pollos Hermanos. His eerie, near-total lack of visible emotion is scarier than any outburst — and once Walter partners with him, an underground superlab goes online and the business explodes in scale.",
      "But the danger grows just as fast. An attack by Gus's nephew-figures, the Salamanca cousins, and Jesse getting tangled up in the fate of Gus's chemist, Gale Boetticher, keep the life-or-death stakes climbing.",
      "Eventually Walter and Gus's conflict turns into open war. Andrea's young son Brock gets poisoned along the way — still one of the most hotly debated moments among fans today — and Gus's death, along with the destruction of the superlab, ends an entire era of the show.",
      "Walter doesn't stop the business even after that. He moves to a new mobile lab using Vamonos Pest Control, and pulls off an audacious train heist to steal chemicals.",
      "Then comes 'Ozymandias' — the show's biggest turning point. Walter loses his fixer, Mike Ehrmantraut, and his brother-in-law, DEA agent Hank Schrader, finally figures out who Heisenberg really is.",
      "A shootout in the desert at Tohajiilee brings the whole family crashing down, and Walter goes on the run having lost everything. What choice Walter makes in the finale, 'Felina' — I'm not going to spoil that part here. That one's genuinely better watched than read about.",
      "I heard the show used real city locations with zero green screen, so I looked up the filming sites — and the genuinely surprising part is how many of them are still open for business today.",
      "Los Pollos Hermanos, Gus Fring's front business — that's not a set, it's an actual working fast-food restaurant called Twisters. Fans can walk in, order food, and take a photo on the spot.",
      "Tuco Salamanca's old hideout has become a real café, Java Joe's. There's something both funny and strange about getting coffee at a former drug dealer's safehouse.",
      "Walter's cover job, the car wash, is still a working car wash. It shows up in 16 episodes as the place where his 'ordinary life' and double life kept colliding — and you can actually get your car washed there.",
      "Some spots hit differently, though. The desert shootout in 'Ozymandias,' the show's biggest turning point, was filmed for real on Navajo Nation land at Tohajiilee — no CG involved.",
      "Same with White Sands, used for the early-season desert scenes — an actual national park with endless white gypsum dunes.",
      "This is one of the rare shows that used an entire real city as its set. I haven't made it to Albuquerque yet, but whenever I do, I want to get my car washed at that same car wash, then grab a plate of chicken at Twisters."
    ],
    discoveryHook_ja:[
      "あの鶏肉店、実は今も営業中だって? 『ブレイキング・バッド』を見た後は、なぜかアルバカーキが気になって仕方なくなる。",
      "シーズン1のウォルター・ホワイトは、間違いなく被害者だ。実力に見合った評価を受けられずにいた高校の化学教師が、末期がんの宣告を受けて、家族に何かを残したいという切迫感だけで元教え子ジェシー・ピンクマンと手を組み、キャンピングカーの中で初めて覚醒剤を作る。クレイジー8とエミリオとの危険な衝突がその始まりだ。",
      "でもシーズンが進むにつれて、「家族のため」という言い訳はどんどん薄っぺらくなり、その代わりに支配欲とプライドが場所を占めていく。砂漠でキャンピングカーが故障して起きる生存の危機(「4デイズ・アウト」)や、ジェシーの恋人ジェーン・マーゴリスにまつわる悲劇的な事件を経て、ウォルターはもう以前の彼ではなくなっている。",
      "ここから始まる「リシンのタバコ」というサブプロットはシーズン4まで続き、相棒だったコンボを縄張り争いの中で失うなど、この頃からすでに人が死に始める。",
      "そしてロス・ポヨス・エルマノスの裏で流通網を統括するガス・フリングが本格的に登場する。感情をほとんど表に出さないその冷静さがかえって強烈な恐怖を生む人物で、ガスと組むことで地下のスーパーラボが稼働し、事業規模が一気に膨らんでいく。",
      "でもそれだけ危険も大きくなる。ガスの甥にあたるサラマンカ従兄弟の襲撃、ジェシーがガスの化学者ゲイル・ボティカーをめぐる事件に巻き込まれる展開まで続き、命がけの瞬間が続く。",
      "結局ウォルターとガスの対立は真っ向からの衝突へと向かう。アンドレアの息子、幼いブロックが毒を盛られる事件まで起きるんだけど、これはファンの間で今でも一番熱く議論されるポイントのひとつだ。ガス・フリングの死とともにスーパーラボが破壊され、ひとつの時代が終わる。",
      "その後もウォルターは事業を止めない。バモノス害虫駆除を利用した新しい移動式ラボに移り、列車を使った大胆な化学薬品強奪作戦まで実行する。",
      "そして「オジマンディアス」。シリーズ最大の転換点と呼ばれるこの事件で、解決屋だったマイク・エルマントラウトを失い、義理の兄で捜査官のハンク・シュレイダーがついに「ハイゼンバーグ」の正体に気づく。",
      "トハヒーリーの砂漠で繰り広げられる銃撃戦で、家族全体が取り返しのつかないほど崩壊し、ウォルターはすべてを失ったまま逃亡生活に入る。最終話「フェリナ」でウォルターがどんな選択をするのかは、ここではあえて語らない——これは本当に自分の目で見たほうがいい。",
      "グリーンスクリーンを一切使わず、実在の街をそのまま舞台にしたと聞いて撮影地を調べてみたら、驚いたのはその多くが今もそのまま営業しているということだった。",
      "ガス・フリングの表向きの事業だった鶏肉チェーン、ロス・ポヨス・エルマノス。これはセットではなく、実際に営業中のファストフード店「Twisters」だ。ファンは実際に店に入って注文し、その場で記念写真まで撮れるという。",
      "トゥコ・サラマンカがアジトにしていた建物も、今では実際のカフェ「Java Joe's」に変わっている。麻薬密売人のアジトだった場所でコーヒーが飲めるというのは、ちょっと笑えるし不思議でもある。",
      "ウォルターの表向きの仕事だった洗車場も、今も実際に営業している。16話にも登場した、彼の「普通の生活」と裏の生活が重なり合っていたまさにその場所で、実際に洗車を頼むことができる。",
      "逆に重く迫ってくる場所もある。シリーズ最大の転換点「オジマンディアス」の砂漠での銃撃戦——このシーンはCGではなく、ナバホ・ネーション領内のトハヒーリーで実際に撮影された。",
      "シーズン序盤の砂漠シーンに使われたホワイトサンズも同じだ。真っ白な石膏の砂丘が果てしなく広がる、実在する国立公園だ。",
      "つまりこのドラマ、本当にひとつの街を丸ごと舞台にして撮影した数少ない作品なんだと思う。私はまだアルバカーキに行ったことはないけれど、いつか行くことがあれば、あの洗車場で洗車を頼んで、Twistersでチキンも一皿食べてみたい。"
    ],
    title_ja:"ブレイキング・バッド(Breaking Bad)", summary_ja:"平凡な高校化学教師ウォルター・ホワイトは末期肺癌の診断を受けた後、家族にお金を残したいという切迫感から、かつての教え子ジェシーと共に覚醒剤の製造に乗り出す。「被害者」だった男が、じわじわと「ハイゼンバーグ」という名の加害者へと変わっていく5年間の物語——舞台はそのままニューメキシコ州アルバカーキの実在の街並みと建物だ。", author_ja:"ヴィンス・ギリガン製作・AMC", era_ja:"2008年〜2013年",
    longSummary_en:"Going in, all I knew was 'a teacher with cancer starts making drugs.' What actually makes the show unsettling isn't the meth-making itself — it's watching someone slowly start to enjoy what he insists he had no choice but to do.\n\nIn season one, Walter really is a victim: underappreciated for his talent, blindsided by a terminal diagnosis, desperate to protect his family. But as the seasons go on, 'for my family' gets thinner and thinner as an excuse, and something closer to pure hunger for control and pride fills the gap. Heisenberg starts as a disguise, but ends up looking a lot more like Walter's real face than Walter ever was.\n\nThe relationship with Jesse Pinkman is the emotional core of the whole show — teacher and student, business partners, and two people who keep using each other without ever quite being able to let go. On the other side stands Gus Fring, running a drug empire from behind a fried-chicken counter, whose eerie calm is scarier than any outburst could be.\n\nWhat makes this one worth revisiting most, though, is that every filming location is a real street in Albuquerque. Walter's house, the car wash, the actual restaurant used as Los Pollos Hermanos — no green screens, just a real city standing in for itself. It's one of the rare shows where fans can walk up and stand in the exact spot from the scene.",
    contentSummary:{ sections:[
      { heading:"① 폐암 진단과 첫 발걸음", bullets:[
        "고등학교 화학교사 월터 화이트, 말기 폐암 진단을 받음",
        "가족에게 돈을 남기기 위해 옛 제자 제시 핑크맨과 손잡고 마약 제조를 시작함",
        "RV(캠핑카) 안에서의 첫 제조, 크레이지-8·에밀리오와의 위험한 충돌을 겪음"
      ]},
      { heading:"② 제시와의 동업, 첫 위기들", bullets:[
        "사막에서 RV가 고장 나며 벌어지는 생존의 위기(4 Days Out)",
        "제시의 연인 제인 마골리스와 관련된 비극적 사건이 벌어짐",
        "시즌4까지 이어지는 '리신 담배' 서브플롯이 시작됨",
        "동업자 콤보를 구역 다툼 속에서 잃음"
      ]},
      { heading:"③ 구스 프링과의 전쟁", bullets:[
        "로스 포요스 에르마노스 뒤에서 유통망을 총괄하는 구스 프링이 본격 등장",
        "지하 슈퍼랩이 가동되며 사업 규모가 비약적으로 커짐",
        "구스의 조카뻘 살라만카 사촌들의 습격 등, 목숨을 건 위기가 이어짐",
        "제시가 구스의 화학자 게일 보티커를 둘러싼 사건에 휘말림"
      ]},
      { heading:"④ 제국의 확장과 균열", bullets:[
        "월터와 구스의 갈등이 정면충돌로 치달음",
        "안드레아의 아들 브록이 중독되는 사건이 벌어지며 팬들 사이에 큰 화제가 됨",
        "구스 프링의 죽음과 함께 슈퍼랩이 파괴되며 한 시대가 끝남",
        "이후 사업을 확장하며 바모노스 페스트 컨트롤을 이용한 새 이동식 랩으로 옮겨감",
        "기차를 이용한 대담한 화학약품 탈취 작전이 벌어짐"
      ]},
      { heading:"⑤ 오지만디아스, 모든 것이 무너지다", bullets:[
        "해결사 마이크 얼먼트라웃을 잃는 결정적 사건이 벌어짐",
        "처형 행크 슈레이더가 마침내 '하이젠버그'의 정체를 알아챔",
        "투하히일리 사막에서 벌어지는 총격전(오지만디아스)으로 가족이 걷잡을 수 없이 무너짐",
        "월터는 모든 것을 잃은 채 도피 생활에 들어감"
      ]}
    ], endingNote:"최종화(Felina)에서 월터가 어떤 선택을 내리고 이야기가 어떻게 마무리되는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_dunefield,_White_Sands_National_Park,_New_Mexico,_United_States.png", credit:"화이트 샌즈 국립공원, 뉴멕시코주(시리즈 초반 사막 장면 실제 촬영지) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_dunefield,_White_Sands_National_Park,_New_Mexico,_United_States.png" },
    posterPage:"https://en.wikipedia.org/wiki/Breaking_Bad" },
  { id:"harrypotter", title:"해리 포터 (Harry Potter)", author:"J.K. 롤링 원작 · 워너 브라더스 제작", type:"fantasy", country:"uk", medium:"film", genres:["fantasy","adventure"],
    lang:"en", // 영어권 작품 — 브레이킹 배드와 동일하게 레딧 등 영어권 SNS 채널을 우선 노출한다.
    era:"극중 1991~1998년 · 영화 개봉 2001~2011년", title_en:"Harry Potter", author_en:"Based on the novels by J.K. Rowling · Produced by Warner Bros.", era_en:"Story set 1991–1998 · Films released 2001–2011",
    summary:"부모를 잃고 평범한 소년으로 자란 해리 포터가 열한 살 생일에 자신이 마법사라는 사실을 알게 되며 호그와트 마법학교에 입학한다. 친구들과 함께 보낸 일곱 번의 학년은 곧 자신의 과거와 어둠의 마법사 볼드모트의 그림자를 마주하는 여정이 된다. 영화 8편에 걸친 이 성장기는 런던의 기차역부터 스코틀랜드의 산과 호수까지, 영국 곳곳의 실제 장소를 무대로 그려졌다.",
    longSummary:"해리 포터를 처음 만난 게 언제였는지는 사람마다 다르겠지만, 다시 보게 되는 이유는 다들 비슷하지 않을까 싶다 — 이 시리즈는 마법보다 '자라는 과정'을 더 오래 붙잡고 있다는 것.\n\n1편에서 해리·론·헤르미온느는 그냥 11살짜리 학생들이다. 트롤 사건 하나로 우정이 시작되고, 퀴디치와 시험을 걱정하는 평범한 학교생활이 이어진다. 그런데 매 편이 지날 때마다 이들이 감당해야 하는 무게가 조금씩 늘어난다. 4편의 무도회에서 시작된 설렘은 5편의 마법부 소동을 지나며 어느새 '싸워야 하는' 이야기로 바뀌어 있다.\n\n개인적으로 이 시리즈를 다시 보게 만드는 건 결말의 전투 장면이 아니라, 그 전투에 이르기까지 인물들이 보여주는 선택들이다. 스네이프는 영웅인가 학대자인가, 덤블도어는 해리를 진짜 보호한 걸까 아니면 조종한 걸까 — 이런 질문들에 시리즈는 친절하게 답을 주지 않는다. 그래서 팬들 사이에서 지금도 논쟁이 끊이지 않는다.\n\n그리고 무엇보다, 이 세계가 그린스크린 판타지가 아니라 실제로 존재하는 영국의 기차역·성·대성당·호수가 이어붙여 만들어졌다는 사실을 알고 나면, 다음 여행지를 고르는 방식이 완전히 달라진다.",
    pinColor:"#8c1c1c",
    summary_en:"Orphaned and raised in an ordinary house, Harry Potter learns on his eleventh birthday that he's a wizard and is admitted to Hogwarts School of Witchcraft and Wizardry. Seven school years spent with his friends become a journey toward confronting his own past and the shadow of the dark wizard Voldemort. Across eight films, this coming-of-age story was shot on real locations scattered across Britain — from London train stations to Scottish mountains and lochs.",
    longSummary_en:"Everyone remembers Harry Potter differently, but the reason people keep coming back is probably the same for most of us: this series holds onto the process of growing up longer than it holds onto magic itself.\n\nIn the first film, Harry, Ron, and Hermione are just eleven-year-olds. A troll incident sparks a friendship, and the rest is ordinary school life — Quidditch, exams, homework. But with each film, the weight these three have to carry grows a little heavier. The excitement of the dance in film four slides, by film five, into something you'd actually call a fight.\n\nWhat brings me back to this series isn't the final battle — it's the choices the characters make on the way there. Was Snape a hero or an abuser? Did Dumbledore really protect Harry, or did he manipulate him? The series never gives easy answers, which is exactly why fans are still arguing about it.\n\nAnd once you realize this world wasn't built on green screens but stitched together from real train stations, castles, cathedrals, and lochs across Britain, it completely changes how you plan your next trip.",
    communityNote:"팬 커뮤니티에서 가장 오래 이어지는 논쟁 하나만 꼽으라면 단연 \"스네이프는 영웅인가, 학대자인가\"예요 — 릴리에 대한 평생의 헌신과 학생들에게 보인 태도를 어떻게 함께 볼 것인지가 핵심 쟁점입니다. 기숙사 배정('소팅')을 둘러싼 자기 정체성 논쟁도 SNS에서 꾸준히 화제가 되는 주제예요.",
    communityNote_en:"If there's one debate that never dies in the fandom, it's \"was Snape a hero or an abuser?\" — the core question is how to weigh his lifelong devotion to Lily against how he actually treated his students. House sorting and what it says about identity is another topic that keeps resurfacing on social media.",
    hookBadge:"워너 브라더스 · 영국 실제 촬영지 8편 · 성지순례 지도", hookTagline:"이 세계, 진짜 어딘가에 있었으면 좋겠는데... 있다",
    discoveryHook:[
      "《해리 포터》 보고 나면 다들 한 번쯤 이런 생각 하지 않나. '이 세계, 진짜 어딘가에 있었으면 좋겠다.'",
      "근데 찾아보니 진짜 있다. 완전히 CG로 만든 판타지 세계가 아니라, 영국 전역의 실제 장소를 이어붙여 만든 거였다.",
      "1편에서 해리·론·헤르미온느는 그냥 11살짜리 학생들이다. 트롤 사건 하나로 우정이 시작되고, 마법사의 돌을 지키기 위한 첫 모험을 함께 겪는다.",
      "곧바로 2편에서는 비밀의 방 사건이 이어진다. 집요정 도비의 경고, 바실리스크와의 대결까지 — 아직은 학교생활의 연장선처럼 보이지만, 어둠의 그림자가 여기서부터 서서히 드러나기 시작한다.",
      "3편에서는 탈옥수 시리우스 블랙이 등장하면서 해리 부모 세대의 비밀이 처음으로 드러난다. 그리고 4편, 트리위저드 시합을 통해 덤스트랭·보바통 같은 다른 마법학교와의 세계가 확장되고, 크리스마스 무도회로 대표되는 성장기 특유의 설렘이 펼쳐진다.",
      "근데 이 설렘, 오래 안 간다. 시합의 결말에서 볼드모트가 육체를 되찾고 돌아오는 순간, 이야기의 톤이 완전히 바뀐다. 여기서부터 시리즈는 그냥 마법학교 이야기가 아니게 된다.",
      "5편에서는 마법부의 부정과 엄브리지 교수의 통제에 맞서 해리 일행이 '덤블도어의 군대'를 결성한다. 예언의 방 전투를 거치면서 해리 세대의 저항이 본격화되는데, 이게 호그와트 내부 권력 구도가 무너지는 시리즈 최대 전환점이다.",
      "6편에서는 호크룩스의 정체가 확인되면서, 볼드모트를 막을 유일한 방법이 뭔지가 드러난다. 이때부터 이야기는 확실히 전쟁 서사로 넘어간다.",
      "7~8편은 도피와 사냥의 연속이다. 마법부가 완전히 장악되면서 삼총사는 학교를 떠나 본격적으로 호크룩스를 찾아 나선다. 셸 코티지에서 재정비하는 동안 딱총나무 지팡이를 둘러싼 추적이 계속되고, 그린고트 은행 침투를 시작으로 결국 호그와트로 돌아와 전면전을 준비한다.",
      "마지막에 스네이프의 기억이 공개되는데, 이게 7년에 걸친 이야기 전체를 뒤흔든다. 스네이프가 영웅인지 학대자인지를 둘러싼 논쟁이 팬들 사이에서 지금까지도 안 끝나는 게 다 이유가 있다.",
      "해리와 볼드모트의 마지막 대결이 정확히 어떻게 끝나는지는 여기서 말 안 하려고 한다. 그건 직접 보는 게 맞다.",
      "대신 여기부터는 진짜 존재하는 촬영지 얘기. 9와 3/4 승강장부터 그렇다. 런던 킹스크로스역에 실제로 벽에 카트가 반쯤 박힌 조형물과 포토스폿이 있어서, 지금도 팬들이 줄 서서 사진을 찍는다.",
      "다이애건 앨리 입구로 나온 그 골목도 상상 속 장소가 아니다. 리든홀 마켓이라고, 런던 금융가 한복판에 실제로 있는 빅토리아 시대 시장 골목이다.",
      "그런데 이건 좀 신기했던 건데, 호그와트 성 앞의 그 거대한 호수는 사실 한 장소가 아니다. 스코틀랜드의 로크 실이라는 실제 호수를 항공 촬영한 다음 CG로 성과 합성한 거라고 한다. 그러니까 그 호수, 실제로 존재하긴 하지만 영화 속 모습 그대로는 어디에도 없는 셈.",
      "반대로 호그와트 익스프레스가 지나가는 그 유명한 아치형 철교는 완전히 진짜다. 글렌피넌 육교라고, 지금도 실제로 열차가 다니는 스코틀랜드 고지대의 철로다.",
      "킹스크로스부터 옥스퍼드의 오래된 도서관, 스코틀랜드의 산과 호수까지 — 영화 8편을 이어붙이면 결국 영국 지도 하나가 완성된다.",
      "스네이프 논쟁만큼이나 팬들 사이에서 꾸준히 화제인 게 기숙사 배정, 그러니까 '소팅'을 둘러싼 자기 정체성 얘기다. 자기가 어느 기숙사에 배정될지가 그냥 게임이 아니라 진짜 정체성 논쟁으로 이어진다는 게, 이 시리즈가 왜 이렇게 오래 사랑받는지 조금은 설명해주는 것 같다.",
      "그러니까 해리 포터 세계, 상상이 아니라 진짜 여행 코스였던 거다. 나는 아직 킹스크로스에 못 가봤지만, 다음에 영국 가면 9와 3/4 승강장 앞에서 사진 한 장은 꼭 남기고 싶다."
    ],
    hookReveals:[
      { label:"9와 3/4 승강장 → 런던 킹스크로스역, 실제 포토스폿", label_en:"Platform 9¾ → King's Cross Station, a real photo spot", locId:"kingscross" },
      { label:"다이애건 앨리 입구 → 런던 금융가 리든홀 마켓", label_en:"The entrance to Diagon Alley → Leadenhall Market in the City of London", locId:"leadenhall" },
      { label:"호그와트 호수 → 실은 항공촬영 합성, 로크 실이 모델", label_en:"The Hogwarts Lake → actually a CG composite based on Loch Shiel", locId:"lochshiel" },
      { label:"호그와트 익스프레스 다리 → 스코틀랜드 글렌피넌 육교, 지금도 실제 운행", label_en:"The Hogwarts Express viaduct → Glenfinnan Viaduct, still an active railway", locId:"glenfinnan" }
    ],
    hookBadge_en:"Warner Bros. · Real UK filming locations across 8 films · A pilgrimage map",
    hookTagline_en:"You wish this world were real somewhere. It kind of is.",
    discoveryHook_en:[
      "After Harry Potter, don't you find yourself thinking, 'I wish this world actually existed somewhere'?",
      "Turns out it kind of does. It's not a fully CG fantasy world — it's stitched together from real locations across Britain.",
      "In the first film, Harry, Ron, and Hermione are just eleven-year-olds. A troll incident sparks their friendship, and together they face their first real adventure: protecting the Sorcerer's Stone.",
      "The Chamber of Secrets follows right after in film two — Dobby the house-elf's warning, the confrontation with the basilisk. It still looks like an extension of school life on the surface, but this is where the shadows first start creeping in.",
      "In film three, escaped convict Sirius Black shows up, and for the first time we learn a secret from Harry's parents' generation. Then in film four, the Triwizard Tournament expands the world to include Durmstrang and Beauxbatons, and we get the giddy thrill of the Yule Ball — coming-of-age stuff, through and through.",
      "That giddiness doesn't last, though. The moment Voldemort returns to a physical body at the end of the tournament, the whole tone of the series shifts. From here on, this stops being just a story about a magic school.",
      "In film five, Harry and his friends form Dumbledore's Army to resist the Ministry's corruption and Professor Umbridge's control. The Battle of the Department of Mysteries kicks off real resistance from Harry's generation — and it's the biggest turning point yet, as Hogwarts's entire power structure collapses.",
      "Film six confirms what the Horcruxes actually are, and with that, the only way to stop Voldemort becomes clear. From here, the story is definitively a war story.",
      "Films seven and eight are one long chase and hunt. With the Ministry fully under Voldemort's control, the trio leaves school and goes hunting for Horcruxes in earnest. They regroup at Shell Cottage while the hunt for the Elder Wand continues, break into Gringotts, and finally return to Hogwarts to prepare for all-out war.",
      "Right before the end, Snape's memories are revealed — and it upends everything you thought you knew across all seven years of story. There's a reason the debate over whether Snape was a hero or an abuser still hasn't died down among fans.",
      "Exactly how the final battle between Harry and Voldemort ends — I'm going to hold off on that one here. That's genuinely something to watch for yourself.",
      "From here, let's talk about the real filming locations instead. Start with Platform 9¾. King's Cross Station really does have a luggage cart appearing to vanish into the wall, and a photo spot fans still line up for.",
      "The alley used as the entrance to Diagon Alley isn't imaginary either — it's Leadenhall Market, a real Victorian-era market right in the middle of the City of London's financial district.",
      "Here's the part that surprised me, though. The massive lake in front of Hogwarts Castle isn't actually one single place — it's Loch Shiel in Scotland, shot from the air and composited with the castle using CG. So the lake is real, but the exact view from the film doesn't exist anywhere.",
      "On the other hand, that famous arched viaduct the Hogwarts Express crosses is completely real — the Glenfinnan Viaduct, an actively used railway line in the Scottish Highlands even today.",
      "From King's Cross to Oxford's old libraries to the mountains and lochs of Scotland — string all eight films together and you get an actual map of Britain.",
      "Just as persistent as the Snape debate is the fandom's ongoing conversation about house sorting and identity. Which house you'd be sorted into isn't just a party game to people — it turns into a real conversation about who you are, and that probably says something about why this series has stuck around so long.",
      "So the wizarding world wasn't just imagination — it was a real travel route the whole time. I still haven't made it to King's Cross myself, but next time I'm in the UK I want a photo in front of Platform 9¾, no matter how touristy that sounds."
    ],
    discoveryHook_ja:[
      "『ハリー・ポッター』を見終わると、誰もが一度はこう思うんじゃないだろうか。「この世界、本当にどこかにあったらいいのに」って。",
      "調べてみたら、実際にある。完全にCGで作られたファンタジー世界じゃなくて、イギリス各地の実在の場所をつなぎ合わせて作られていたのだ。",
      "1作目のハリー、ロン、ハーマイオニーは、ただの11歳の生徒たちだ。トロール事件がきっかけで友情が始まり、賢者の石を守るための最初の冒険を一緒に乗り越える。",
      "すぐに2作目では「秘密の部屋」事件が続く。屋敷しもべ妖精ドビーの警告、バジリスクとの対決——まだ学校生活の延長のように見えるけれど、闇の影はここから少しずつ姿を現し始める。",
      "3作目では脱獄囚シリウス・ブラックが登場し、ハリーの親世代の秘密が初めて明かされる。そして4作目、三大魔法学校対抗試合を通してダームストラング、ボーバトンといった他の魔法学校との世界が広がり、クリスマス・ダンスパーティーに代表される思春期特有のときめきが描かれる。",
      "でもこのときめき、長くは続かない。試合の最後にヴォルデモートが肉体を取り戻して復活する瞬間、物語のトーンが完全に変わる。ここから先、このシリーズはただの魔法学校の物語ではなくなる。",
      "5作目では魔法省の腐敗とアンブリッジ教授の統制に対抗して、ハリーたちが「ダンブルドア軍団」を結成する。「神秘部の戦い」を経てハリー世代の抵抗が本格化するんだけど、これがホグワーツ内部の権力構造が崩れるシリーズ最大の転換点だ。",
      "6作目では分霊箱(ホークラックス)の正体が確認され、ヴォルデモートを止める唯一の方法が明らかになる。ここからは間違いなく戦争の物語になっていく。",
      "7〜8作目は逃亡と探索の連続だ。魔法省が完全に掌握され、三人組は学校を離れて本格的に分霊箱探しに乗り出す。シェル・コテージで態勢を立て直しながらニワトコの杖をめぐる追跡が続き、グリンゴッツ銀行への潜入を皮切りに、最終的にホグワーツへ戻って総力戦の準備をする。",
      "最後にスネイプの記憶が明かされるんだけど、これが7年間にわたる物語全体を揺るがす。スネイプが英雄なのか、それとも虐待者なのか——この論争がファンの間で今も終わらないのには理由がある。",
      "ハリーとヴォルデモートの最後の対決がどう終わるのか、正確なところはここでは語らないでおく。これは本当に自分の目で見たほうがいい。",
      "代わりに、ここからは実在する撮影地の話をしよう。まずは9と4分の3番線。ロンドンのキングス・クロス駅には実際に、カートが半分壁にめり込んだオブジェとフォトスポットがあって、今もファンが列を作って写真を撮っている。",
      "ダイアゴン横丁の入り口として使われたあの路地も、想像上の場所じゃない。リデンホール・マーケットという、ロンドンの金融街の真ん中に実際にあるヴィクトリア朝時代の市場だ。",
      "これはちょっと驚いたんだけど、ホグワーツ城の前にあるあの巨大な湖は、実は一箇所じゃない。スコットランドのシール湖という実在の湖を空撮した映像に、CGで城を合成したものらしい。つまりその湖は実在するけれど、映画に映っているそのままの姿はどこにも存在しないということになる。",
      "逆に、ホグワーツ特急が渡るあの有名なアーチ型の高架橋は完全に本物だ。グレンフィナン高架橋といって、今も実際に列車が走るスコットランド高地の鉄道だ。",
      "キングス・クロスからオックスフォードの古い図書館、スコットランドの山や湖まで——全8作をつなげると、結局イギリスの地図が一枚出来上がる。",
      "スネイプ論争と同じくらいファンの間でずっと話題になっているのが、組分け、つまり「ソーティング」をめぐる自己アイデンティティの話だ。自分がどの寮に入るかが単なるお遊びではなく、本当の自分探しの話に発展するというのは、このシリーズがこれほど長く愛されている理由を少し説明してくれる気がする。",
      "つまりハリー・ポッターの世界は、想像じゃなくて本物の旅のルートだったわけだ。私はまだキングス・クロスに行けていないけれど、次にイギリスに行ったら9と4分の3番線の前で、ちょっとベタでも写真を一枚撮りたい。"
    ],
    title_ja:"ハリー・ポッター(Harry Potter)", summary_ja:"両親を失い、平凡な少年として育ったハリー・ポッターは、11歳の誕生日に自分が魔法使いであることを知り、ホグワーツ魔法魔術学校に入学する。友人たちと過ごす7年間の学年は、やがて自分自身の過去と、闇の魔法使いヴォルデモートの影に向き合う旅となる。全8作にわたるこの成長物語は、ロンドンの駅からスコットランドの山や湖まで、イギリス各地の実在の場所を舞台に描かれた。", author_ja:"J.K.ローリング原作・ワーナー・ブラザース製作", era_ja:"劇中1991年〜1998年・映画公開2001年〜2011年",
    contentSummary:{ sections:[
      { heading:"입학과 우정 — 1~2편 (1991~1993)", bullets:[
        "부모를 잃고 이모 집에서 자란 해리, 11살에 자신이 마법사임을 알게 됨",
        "호그와트 익스프레스에서 론·헤르미온느와 만나 평생의 우정을 시작함",
        "마법사의 돌을 지키기 위한 첫 모험, 이어 비밀의 방 사건을 함께 헤쳐 나감",
        "집요정 도비의 경고, 바실리스크와의 대결 등 어둠의 그림자가 서서히 드러나기 시작함"
      ]},
      { heading:"확장되는 세계 — 3~4편 (1993~1995)", bullets:[
        "탈옥수 시리우스 블랙의 등장으로 해리 부모 세대의 비밀이 처음 드러남",
        "트리위저드 시합을 통해 덤스트랭·보바통 등 다른 마법학교와의 세계가 확장됨",
        "크리스마스 무도회로 대표되는 성장기 특유의 설렘과 관계 변화",
        "시합의 결말에서 볼드모트가 육체를 되찾고 돌아오며 이야기의 톤이 완전히 바뀜"
      ]},
      { heading:"저항과 상실 — 5~6편 (1995~1997)", bullets:[
        "마법부의 부정과 엄브리지 교수의 통제에 맞서 덤블도어의 군대를 결성함",
        "예언의 방 전투를 거치며 해리 세대의 저항이 본격화됨",
        "호크룩스의 정체가 확인되며 볼드모트를 막을 유일한 방법이 드러남",
        "호그와트 내부 권력 구도가 무너지는 시리즈 최대 전환점을 맞음"
      ]},
      { heading:"도피와 마지막 대결 — 7~8편 (1997~1998)", bullets:[
        "마법부가 장악되며 삼총사가 학교를 떠나 본격적인 도피와 호크룩스 사냥에 나섬",
        "셸 코티지 등에서 재정비하며 딱총나무 지팡이를 둘러싼 추적이 이어짐",
        "그린고트 은행 침투를 시작으로 호그와트로 돌아와 전면전을 준비함",
        "스네이프의 기억으로 드러나는 진실과 함께 7년에 걸친 이야기가 마지막 대결로 향함"
      ]}
    ], endingNote:"해리와 볼드모트의 마지막 대결이 어떻게 끝나고, 각 인물이 어떤 선택을 내리는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Glenfinnan_Viaduct.jpg", credit:"글렌피넌 육교, 스코틀랜드(호그와트 익스프레스 실제 촬영지) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Glenfinnan_Viaduct.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Harry_Potter_(film_series)" },
  { id:"kdemonhunters", title:"케이팝 데몬 헌터스 (KPop Demon Hunters)", author:"Sony Pictures Animation · Netflix", type:"animation", country:"usa", medium:"anime_film", genres:["fantasy","action","musical"],
    lang:"ko",
    era:"현재", title_en:"KPop Demon Hunters", author_en:"Sony Pictures Animation · Netflix", era_en:"Present day",
    summary:"K-pop 걸그룹 HUNTR/X의 루미·미라·조이는 무대 위에서는 세계적인 스타이지만, 무대 밖에서는 인간의 영혼을 노리는 악마를 막는 헌터다. 라이벌 보이그룹 사자 보이즈가 등장하면서, 음악 경쟁과 악마와의 싸움이 하나로 얽힌다.",
    longSummary:"이 영화를 처음 봤을 때 가장 놀랐던 건, 'K-pop 아이돌이 사실은 악마 사냥꾼'이라는 설정이 예상보다 훨씬 진지하게 다뤄진다는 점이었다. 화려한 무대 뒤에 숨겨야 하는 진짜 정체성, 그리고 그 비밀이 관계에 미치는 무게가 생각보다 깊게 그려진다.\n\n루미와 지누의 관계도 단순한 라이벌 구도로 끝나지 않는다. 서로 다른 무대에 선 두 사람이 예상치 못한 방식으로 얽히면서, 이 작품이 아이돌 산업의 화려함만이 아니라 그 이면의 압박과 고립도 함께 이야기하고 있다는 걸 알게 된다.\n\n무엇보다 이 영화는 서울이라는 도시를 그저 이국적인 배경으로 소비하지 않는다. 남산타워, 경복궁, 한강까지 — 실제로 존재하는 서울의 장소들이 극의 감정을 함께 실어 나른다. 노래 하나하나가 장면과 강하게 묶여 있어서, OST를 듣는 것만으로도 영화 속 서울을 다시 걷는 기분이 든다.",
    pinColor:"#e0466b",
    summary_en:"K-pop girl group HUNTR/X — Rumi, Mira, and Zoey — are global superstars on stage, but off stage they're demon hunters protecting their fans from an ever-present supernatural threat. When a rival boy group, the Saja Boys, appears, a music rivalry and a demon-hunting war become tangled into one story.",
    longSummary_en:"What surprised me most watching this film was how seriously it takes the premise of 'K-pop idols who are secretly demon hunters.' The real identity hidden behind the glittering stage, and the weight that secret puts on relationships, gets more depth than I expected.\n\nThe relationship between Rumi and Jinu doesn't stay a simple rivalry either. Two people standing on very different stages end up tangled together in unexpected ways, and you realize the film is talking about the pressure and isolation behind the idol industry, not just its glamour.\n\nAbove all, the film doesn't treat Seoul as just an exotic backdrop. Namsan Tower, Gyeongbokgung, the Han River — real Seoul locations carry the film's emotional beats along with it. Each song is tied so tightly to its scene that listening to the soundtrack alone feels like walking through the film's Seoul all over again.",
    communityNote:"Golden은 실제로 빌보드 핫100에서 8주 연속 1위를 기록하고 그래미 후보에까지 올랐어요 — 극중 가상 그룹의 노래가 현실 차트를 그대로 점령한 흔치 않은 사례입니다. 루미·미라·조이의 실제 노래 목소리를 맡은 EJAE·오드리 누나·레이 아미가 지미 키멀 라이브·SNL 등에 HUNTR/X로 직접 출연하면서, 팬들 사이에서는 \"이 세 사람이야말로 진짜 HUNTR/X\"라는 반응과 \"루미의 반악마 정체성을 어떻게 볼 것인가\", \"지누는 구원받을 자격이 있는가\"가 가장 뜨거운 논쟁으로 이어지고 있습니다.",
    communityNote_en:"\"Golden\" actually topped the Billboard Hot 100 for eight consecutive weeks and picked up Grammy nominations — a rare case of a fictional group's song taking over the real charts. EJAE, Audrey Nuna, and REI AMI, who provide Rumi, Mira, and Zoey's real singing voices, have appeared live as HUNTR/X on Jimmy Kimmel Live and SNL, fueling fan takes that \"these three ARE HUNTR/X.\" \"How do we read Rumi's half-demon identity\" and \"does Jinu deserve redemption\" remain the hottest ongoing debates.",
    hookBadge:"Netflix · 케데헌 성지순례 · 서울이 진짜 배경", hookTagline:"케이팝 데몬 헌터스 보고 나니까 서울이 좀 다르게 보인다",
    discoveryHook:[
      "어? 여기 영화에서 본 것 같은데? 《케이팝 데몬 헌터스》를 보고 제일 먼저 든 생각은 의외로 이거였다. 서울이 이렇게 예뻤나?",
      "그런데 이 영화, 사실 처음엔 그냥 화려한 아이돌 애니메이션인 줄 알았다. HUNTR/X의 루미·미라·조이가 무대 위에서는 세계적인 스타지만 무대 밖에서는 인간의 영혼을 노리는 악마를 막는 헌터라는 이중생활 설정, 여기까지는 예상 범위 안이었다.",
      "근데 루미 쪽 비밀이 생각보다 훨씬 무겁다. 루미는 전설의 헌터 어머니와 악마 아버지 사이에서 태어난 반악마라는 사실을 팀원들한테도 숨기고 있다. 화려한 무대 뒤에 이 정체성을 숨겨야 하는 무게가 이 영화가 생각보다 진지하게 다뤄지는 이유다.",
      "라이벌 보이그룹 사자 보이즈가 데뷔하면서 음악 경쟁이 본격화되는데, 리더 지누도 만만치 않은 비밀을 갖고 있다. 사실 지누는 수백 년 전 귀마와 거래를 맺고 악마가 된 음악가였다는 게 밝혀진다.",
      "루미와 지누의 관계가 단순한 라이벌 구도로 안 끝나는 것도 이 지점 때문이다. 서로 다른 무대에 선 두 사람이 예상치 못한 방식으로 얽히면서, 혼문(魂門)을 둘러싼 균열이 서서히 드러난다.",
      "그리고 팀 내부 갈등도 만만치 않다. 'Takedown'을 둘러싼 갈등이 최고조에 이르는데, 루미가 결국 인간과 악마 두 본성을 모두 끌어안아야 하는 결정적 순간을 맞는다.",
      "마지막 공연에서 팬들의 힘이 예상치 못한 방식으로 이야기를 매듭짓는다는데, 정확히 루미가 황금빛 혼문을 어떻게 열게 되는지는 여기서 스포일러 안 하려고 한다. 그건 직접 보는 게 낫다.",
      "대신 이 영화가 예능처럼 재밌는 부분은 따로 있다. 극중 가상 그룹 노래인 'Golden'이 실제로 빌보드 핫100에서 8주 연속 1위를 기록하고 그래미 후보에까지 올랐다는 거다. 애니메이션 속 가상 그룹 노래가 현실 차트를 그대로 점령한 흔치 않은 사례라고 한다.",
      "게다가 루미·미라·조이의 실제 노래 목소리를 맡은 EJAE·오드리 누나·레이 아미가 지미 키멀 라이브·SNL 같은 데 직접 HUNTR/X로 출연했다고 한다. 팬들 사이에서는 \"이 세 사람이야말로 진짜 HUNTR/X\"라는 반응이 나올 만도 하다.",
      "맨날 보던 남산이고, 명동이고, 북촌인데 영화 속에 들어가니까 좀 다른 도시처럼 보였다.",
      "특히 사자보이즈가 'Soda Pop' 부르던 명동. 그냥 명동 느낌만 참고한 줄 알았는데 명동예술극장 앞 바닥의 동그란 무늬까지 실제 장소에서 가져왔다. 이런 거 알고 나면 괜히 지나가면서 바닥도 한번 보게 될 것 같다.",
      "루미와 진우가 만나는 한옥 지붕은 북촌, 진우의 과거에 나오는 궁궐은 경복궁에서 가져왔다. 평소에는 관광객 많아서 슬쩍 지나갔던 곳인데, 영화 보고 나니까 한옥 지붕이 좀 예뻐 보이는 게 신기하다.",
      "그리고 내가 제일 궁금했던 건 헌트릭스가 사는 그 높은 빌딩. 알고 보니 영화 속 위치는 롯데월드타워 자리다. 제작진도 롯데타워에서 아이디어를 얻었는데 그대로 쓰지는 않고, 아예 헌트릭스용 타워를 새로 만들었다. 심지어 진짜 롯데월드타워보다 더 높다.",
      "서울도 대충 그린 게 아니었다. 제작진이 실제 서울의 위성 데이터를 바탕으로 지형부터 만들고, 그 위에 영화 속 건물들을 올렸다. 그래서 애니메이션인데도 \"여기 어디인지 알 것 같은데?\" 하는 느낌이 계속 들었던 것 같다.",
      "마지막 무대가 있던 남산서울타워도 실제로 갈 수 있다. 물론 타워 아래 영화 속 거대한 공연장은 없다. 그래도 케데헌 보고 남산에 올라가면 예전이랑은 좀 다를 것 같다. \"루미가 정말로 인간과 악마, 두 본성을 다 끌어안게 됐을까\" 하는 생각을 하면서.",
      "\"지누는 구원받을 자격이 있는가\" 하는 질문도 팬들 사이에서 여전히 뜨거운 논쟁거리라고 한다. 케데헌 보고 서울에 간다면 굳이 새로운 관광지를 찾을 필요는 없을지도 모른다. 원래 알던 서울에서 영화 속 서울을 하나씩 찾아보는 것, 그게 더 재밌을 것 같다."
    ],
    hookReveals:[
      { label:"명동예술극장 앞 바닥 무늬 → 'Soda Pop' 무대 장면에 그대로 반영", label_en:"The pavement pattern outside Myeongdong Theater → recreated in the 'Soda Pop' stage scene", label_ja:"明洞芸術劇場前の床の模様 → 「Soda Pop」のステージシーンにそのまま反映", locId:"myeongdong" },
      { label:"루미·진우가 만나는 한옥 지붕 → 북촌한옥마을이 모델", label_en:"Rumi & Jinu's hanok rooftop meeting → modeled on Bukchon Hanok Village", label_ja:"ルミとジヌが出会う韓屋の屋根 → 北村韓屋村がモデル", locId:"bukchon" },
      { label:"진우의 과거 궁궐 장면 → 경복궁이 모델", label_en:"Jinu's flashback palace → modeled on Gyeongbokgung", label_ja:"ジヌの過去の宮殿シーン → 景福宮がモデル", locId:"gyeongbokgung" },
      { label:"헌트릭스 빌딩 → 롯데월드타워 자리, 실제보다 더 높게 새로 디자인", label_en:"The Hunters' tower → sits where Lotte World Tower stands, redesigned even taller", label_ja:"ハントリックスのタワー → ロッテワールドタワーの場所に、実物より高く新設計", locId:"jamsil" },
      { label:"마지막 무대 남산서울타워 → 지금도 실제로 갈 수 있는 곳", label_en:"The final stage → N Seoul Tower, a place you can actually visit", label_ja:"最後のステージ → 南山ソウルタワー、今も実際に行ける場所", locId:"nseoultower" }
    ],
    hookBadge_en:"Netflix · Retracing KPop Demon Hunters' Seoul · The city is the real backdrop",
    hookTagline_en:"After watching KPop Demon Hunters, Seoul looks a little different to me now",
    discoveryHook_en:[
      "Wait, I think I've seen this place in the movie. That was honestly my first reaction watching KPop Demon Hunters. Has Seoul always looked this pretty?",
      "Going in, I figured this was just a flashy idol animation. HUNTR/X's Rumi, Mira, and Zoey are global superstars on stage but secretly demon hunters off it — that double-life setup was exactly what I expected.",
      "But Rumi's secret runs a lot deeper than that. She's hiding from her own teammates that she's half-demon, born to a legendary hunter mother and a demon father. The weight of hiding that identity behind the glittering stage is exactly why this film gets treated more seriously than you'd expect.",
      "When rival boy group the Saja Boys debut, the music rivalry kicks into gear — and their leader Jinu is carrying a heavy secret of his own. It turns out he's a musician who made a deal with the demon Gwi-Ma centuries ago and became a demon himself.",
      "That's why Rumi and Jinu's relationship never stays a simple rivalry. Two people standing on very different stages end up tangled together in unexpected ways, and cracks slowly start appearing around the Honmoon, the soul gate.",
      "Tension inside the group runs just as high. The conflict over 'Takedown' reaches a boiling point, and Rumi finally faces the moment where she has to embrace both her human and demon natures at once.",
      "In the final performance, the fans' collective power resolves the story in a way you won't see coming — but exactly how Rumi opens the golden Honmoon, I'm not going to spoil here. That one's better watched.",
      "Instead, here's the part that's fun in an almost surreal way: 'Golden,' the fictional group's song within the film, actually topped the Billboard Hot 100 for eight consecutive weeks in real life and picked up Grammy nominations. It's a rare case of a fictional animated group's song genuinely taking over the real charts.",
      "On top of that, EJAE, Audrey Nuna, and REI AMI — who provide Rumi, Mira, and Zoey's real singing voices — appeared live as HUNTR/X on shows like Jimmy Kimmel Live and SNL. No wonder fans keep saying 'these three ARE HUNTR/X.'",
      "Namsan, Myeongdong, Bukchon — places I walk past all the time — suddenly looked like a different city once they showed up on screen.",
      "Especially Myeongdong, where the Saja Boys perform 'Soda Pop.' I figured they just borrowed the vibe, but apparently they even copied the round pattern on the pavement in front of Myeongdong Theater. Now I'll probably glance down at the ground every time I walk by.",
      "The hanok roof where Rumi and Jinu meet is modeled on Bukchon, and the palace from Jinu's flashback is Gyeongbokgung. I usually just walk past both because of the crowds, but somehow the hanok roofs look prettier to me now.",
      "What I was most curious about was that tall building where the Hunters live. Turns out its location is where Lotte World Tower actually stands. The team says they got the idea from the real tower but didn't just copy it — they designed a whole new tower for the Hunters instead, even taller than the real thing.",
      "Seoul wasn't roughly sketched in either. The team built the terrain from real satellite data of Seoul first, then placed the film's buildings on top of it. Maybe that's why, even as an animated film, I kept getting this 'wait, I think I know where this is' feeling.",
      "The final stage at N Seoul Tower is also somewhere you can actually go. Obviously there's no giant concert venue underneath it in real life. But climbing Namsan after watching this hits differently — I'd probably find myself wondering, 'did Rumi really manage to hold onto both sides of herself, human and demon?'",
      "Whether Jinu deserves redemption is still one of the hottest ongoing debates among fans, apparently. If you're in Seoul after watching this, you don't necessarily need to hunt down new attractions. Just take the Seoul you already know and try spotting the movie's Seoul inside it, one place at a time. That sounds like more fun."
    ],
    hookBadge_ja:"Netflix · 『K-POP デーモンハンターズ』聖地巡礼 · ソウルが本当の舞台",
    hookTagline_ja:"『K-POP デーモンハンターズ』を見てから、ソウルが少し違って見える",
    discoveryHook_ja:[
      "あれ、この場所、映画で見た気がする。『K-POP デーモンハンターズ』を見て最初に思ったのは、意外にもそれだった。ソウルってこんなに綺麗だったっけ。",
      "見る前は、ただの華やかなアイドルアニメだと思っていた。HUNTR/Xのルミ、ミラ、ゾーイがステージの上では世界的なスターで、ステージの外では人間の魂を狙う悪魔を止めるハンターだという二重生活の設定、ここまでは想定の範囲内だった。",
      "でもルミ側の秘密は思っていたよりずっと重い。ルミは伝説のハンターの母と悪魔の父の間に生まれた半悪魔だという事実を、チームメンバーにさえ隠している。華やかなステージの裏でこのアイデンティティを隠さなければならない重さこそ、この映画が思った以上に真剣に描かれている理由だ。",
      "ライバルのボーイズグループ、サジャ・ボーイズがデビューして音楽対決が本格化するんだけど、リーダーのジヌも軽くない秘密を抱えている。実はジヌ、何百年も前にグィマと取引をして悪魔になった音楽家だったことが明かされる。",
      "ルミとジヌの関係が単純なライバル構図で終わらないのも、ここが理由だ。それぞれ違うステージに立つ二人が思いがけない形で絡み合いながら、魂門(ホンムン)をめぐる亀裂が少しずつ明らかになっていく。",
      "チーム内の対立も軽くない。「Takedown」をめぐる葛藤が最高潮に達し、ルミはついに人間と悪魔、両方の本性を受け入れなければならない決定的な瞬間を迎える。",
      "最後の公演では、ファンの力が思いがけない形で物語を締めくくるという。ルミが黄金の魂門を正確にどうやって開くのかは、ここではあえて語らないでおく。それは自分の目で見たほうがいい。",
      "その代わり、この映画が現実でも面白いのはここだ。劇中の架空グループの曲「Golden」が実際にビルボードHot100で8週連続1位を記録し、グラミー賞にまでノミネートされたということ。アニメの中の架空グループの曲が現実のチャートをそのまま制覇する、珍しい事例だという。",
      "さらに、ルミ、ミラ、ゾーイの本当の歌声を担当したEJAE、オードリー・ヌナ、レイ・アミがジミー・キンメル・ライブやSNLといった番組にHUNTR/Xとして直接出演したという。ファンの間で「この三人こそ本物のHUNTR/X」という声が出るのも頷ける。",
      "いつも見ている南山も、明洞も、北村も、映画の中に入ると少し違う街みたいに見えた。",
      "特にサジャ・ボーイズが「Soda Pop」を歌う明洞。ただの雰囲気だけ参考にしたのかと思ったら、明洞芸術劇場前の床の丸い模様まで実際の場所からそのまま持ってきていたらしい。これを知ると、つい通りすがりに床を見てしまいそう。",
      "ルミとジヌが出会う韓屋の屋根は北村、ジヌの過去に出てくる宮殿は景福宮がモデルだという。普段は観光客が多くてさっと通り過ぎるだけの場所なのに、映画を見た後だと韓屋の屋根が少し綺麗に見えるから不思議。",
      "そして私が一番気になったのが、ハントリックスが住んでいるあの高いビル。調べてみると、映画の中の位置はロッテワールドタワーの場所だという。制作陣もロッテタワーからアイデアを得たけれど、そのまま使うのではなく、ハントリックス専用のタワーを新しく作ったらしい。しかも本物のロッテワールドタワーより高い。",
      "ソウルも適当に描いたわけじゃなかった。制作陣が実際のソウルの衛星データを基に地形から作り、その上に映画の中の建物を乗せたという。だからアニメーションなのに「ここ、どこか分かる気がする」という感覚がずっと続いたのかもしれない。",
      "最後のステージがあった南山ソウルタワーも実際に行ける場所。もちろんタワーの下に映画のような巨大な公演会場はない。それでもこの映画を見た後に南山に登ったら、前とは少し違う気がする。「ルミは本当に人間と悪魔、両方の本性を抱きしめられたんだろうか」なんて考えながら。",
      "「ジヌは救われるに値するのか」という問いも、ファンの間で今も熱く議論されているという。この映画を見てソウルに行くなら、新しい観光地を探す必要はないかもしれない。もともと知っているソウルの中から、映画の中のソウルを一つずつ見つけていくこと。そっちのほうが楽しそう。"
    ],
    contentSummary:{ sections:[
      { heading:"이중생활 — 스타이자 헌터", bullets:[
        "HUNTR/X 루미·미라·조이, 세계적인 K-pop 그룹이자 비밀 헌터로 활동",
        "무대 밖에서는 인간의 영혼을 노리는 악마들을 막는 임무를 수행함",
        "루미는 전설의 헌터 어머니와 악마 아버지 사이에서 태어난 반악마라는 비밀을 숨기고 있음"
      ]},
      { heading:"사자 보이즈의 등장", bullets:[
        "라이벌 보이그룹 사자 보이즈가 데뷔하며 음악 경쟁이 본격화됨",
        "리더 지누는 사실 수백 년 전 귀마와 거래를 맺고 악마가 된 음악가였음이 드러남",
        "혼문(魂門)을 둘러싼 균열이 서서히 드러나기 시작함"
      ]},
      { heading:"선택과 마지막 무대", bullets:[
        "Takedown을 둘러싼 팀 내부 갈등이 최고조에 이름",
        "루미가 인간과 악마, 두 본성을 모두 끌어안아야 하는 결정적 순간을 맞음",
        "마지막 공연에서 팬들의 힘이 예상치 못한 방식으로 이야기를 매듭지음"
      ]}
    ], endingNote:"루미가 황금빛 혼문을 어떻게 열게 되는지, HUNTR/X와 사자 보이즈의 이야기가 정확히 어떻게 마무리되는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/N_Seoul_Tower_Panorama_001.jpg", credit:'N서울타워 파노라마(HUNTR/X 공중 전투 배경의 실제 모델) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:N_Seoul_Tower_Panorama_001.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/KPop_Demon_Hunters" },
  { id:"gameofthrones", title:"왕좌의 게임 (Game of Thrones)", author:"데이비드 베니오프·D.B. 와이스 제작 · HBO", type:"fantasy", country:"usa", medium:"tv_drama", genres:["fantasy","drama","war"],
    lang:"en",
    era:"방영 2011~2019년", title_en:"Game of Thrones", author_en:"Created by David Benioff & D.B. Weiss · HBO", era_en:"Aired 2011–2019",
    summary:"여러 가문이 철왕좌를 차지하기 위해 동맹과 배신을 반복하는 동안, 북쪽에서는 인류 전체를 위협하는 존재가 다가온다. 정치극과 가족극, 전쟁과 판타지가 한 세계지도 위에서 움직이는 이야기다.",
    longSummary:"왕좌의 게임을 처음 볼 때는 그냥 '중세풍 판타지 전쟁물'이겠거니 생각했다. 그런데 이 드라마의 진짜 무서움은 용이나 백귀가 아니라, 명예로운 사람이 명예 때문에 죽는다는 사실을 아무렇지 않게 보여준다는 점이다.\n\n네드 스타크의 죽음으로 시작된 그 배신감은 시리즈 내내 반복된다. '주인공이니까 살아남겠지'라는 기대가 매번 배신당하면서, 오히려 이 세계의 규칙이 더 선명해진다 — 권력 앞에서 착함은 아무것도 보장해주지 않는다.\n\n무엇보다 이 시리즈를 다시 보게 만드는 건 촬영지 전부가 실제로 존재하는 장소라는 사실이다. 두브로브니크의 성벽, 아이슬란드의 빙하, 북아일랜드의 다크 헤지스 — CG가 아니라 진짜 세계 곳곳을 이어붙여 웨스테로스를 만들었다는 걸 알고 나면, 여행 계획을 세우는 방식이 완전히 달라진다.",
    pinColor:"#5b5b5b",
    summary_en:"As noble houses trade alliances and betrayals for the Iron Throne, something threatens all of humanity from the north. Political drama, family saga, war, and fantasy all move across a single continent-spanning map.",
    longSummary_en:"Going in, I assumed this would just be a medieval-style fantasy war story. What actually makes the show unsettling is how casually it shows an honorable man dying precisely because of his honor.\n\nThe betrayal that started with Ned Stark's death repeats throughout the series. Every time you expect 'the protagonist will surely survive,' you're proven wrong — and that only sharpens the show's real rule: goodness guarantees nothing in the face of power.\n\nWhat makes this one worth revisiting most, though, is that every filming location is a real place. The walls of Dubrovnik, the glaciers of Iceland, the Dark Hedges of Northern Ireland — once you realize Westeros was built by stitching together real corners of the world rather than CGI, it completely changes how you plan a trip.",
    communityNote:"두브로브니크 성벽 위 민체타 탑이 극중 '언데드의 집'으로, 예수회 계단이 세르세이의 '수치의 행진' 그 계단으로 실제 쓰였다는 걸 알고 나면 재감상 포인트가 완전히 달라져요. \"최고의 왕(또는 여왕)은 누구인가\"와 \"시즌8 결말을 어떻게 평가할 것인가\"는 지금도 레딧에서 가장 뜨거운 논쟁 주제입니다.",
    communityNote_en:"Once you know Minčeta Tower on Dubrovnik's walls was literally the House of the Undying, and the Jesuit Staircase is the actual staircase from Cersei's Walk of Shame, a rewatch hits differently. \"Who was the best king or queen\" and \"how should we judge the Season 8 ending\" remain the hottest debates on Reddit to this day.",
    hookBadge:"HBO · 왕좌의 게임 · 7개국에 흩어진 실제 촬영지", hookTagline:"웨스테로스, 사실 다 진짜 있는 곳이더라",
    discoveryHook:[
      "왕좌의 게임을 처음 봤을 때 나는 그냥 '피 튀기는 중세 판타지겠거니' 하고 마음의 준비만 했다.",
      "그런데 시즌1 마지막화에서 네드 스타크가 목이 잘리는 장면을 보고, 이 드라마가 절대 순진하게 볼 작품이 아니라는 걸 깨달았다.",
      "주인공처럼 보이던 사람이 명예를 지키려다 죽는다는 설정 — 이건 그냥 '캐릭터가 죽었다' 수준이 아니라, 드라마 전체의 룰을 새로 쓴 사건이었다.",
      "그 다음 진짜 배신감을 느낀 건 시즌3 '붉은 결혼식'이었다. 롭 스타크와 어머니 캐틀린, 아내 탈리사까지 결혼식장에서 한꺼번에 살해당하는 장면은 지금 다시 봐도 숨이 턱 막힌다.",
      "그런데 이 드라마, 알고 보니 촬영지가 전부 CG가 아니라 진짜 존재하는 장소라는 걸 알게 되면서 완전히 다르게 보이기 시작했다.",
      "킹스랜딩은 크로아티아 두브로브니크다. 성벽 위 민체타 탑이 극중 '언데드의 집' 그 자체이고, 세르세이가 벌거벗은 채 걸었던 '수치의 행진'도 그 도시의 진짜 예수회 계단이라고 한다.",
      "세르세이 얘기가 나와서 말인데, 나는 시즌6에서 세르세이가 야생불로 셉트 오브 베일러를 통째로 날려버리는 장면을 보고 이 캐릭터를 완전히 다시 보게 됐다. 정치적으로 밀리던 사람이 한순간에 도시 전체를 재로 만들어버리는 그 반전.",
      "드래곤스톤은 스페인 바스크 해안의 섬 수도원 가스텔루가체다. 근데 저 풍경 한번 보려면 계단 241개를 올라야 한다니, 대너리스가 얼마나 외로운 자리에 있었는지 새삼 실감이 났다.",
      "사실 이 드라마에서 제일 소름 돋았던 건 죽은 줄 알았던 존 스노우가 시즌6에서 다시 살아나는 장면이었다. 밤의 경비대 형제들에게 배신당해 살해된 그가, 멜리산드레의 손에 눈을 뜨는 순간 이 시리즈가 정말 '누구도 안전하지 않다'는 걸 넘어 '죽음조차 끝이 아닐 수 있다'는 걸 보여줬다.",
      "장벽 너머 설원 장면은 CG인 줄 알았는데 진짜 아이슬란드 빙하와, 북미판·유라시아판이 갈라지는 싱벨리어 국립공원이었다고 한다. 판타지보다 더 판타지 같은 지형이 지구에 원래 있었던 셈이다.",
      "결말로 가면서 가장 논쟁이 됐던 건 대너리스였다. 항복한 킹스랜딩을 향해 용으로 도시 전체를 불태워버리는 그 순간, 시청자 절반이 등을 돌렸다. 해방자였던 사람이 정복자로 변하는 그 과정을 어떻게 받아들여야 할지, 지금도 팬들 사이에서 제일 뜨거운 논쟁 주제라고 한다.",
      "그리고 결국 그 대너리스를 자기 손으로 끝내는 사람이 존 스노우였다는 것도, 다시 생각해도 씁쓸하다.",
      "최종적으로 철왕좌는 브랜 스타크에게 돌아갔다는데, 이것도 팬들 사이에서 \"왜 하필 브랜이냐\"는 얘기가 끊이지 않는다고 한다.",
      "브라보스의 미로 같은 골목도 스페인 지로나라는 도시인데, 대성당 계단은 세트가 아니라 극중 장면 속 그 계단 그대로라고 한다.",
      "결국 이 드라마는 CG로 세계를 만든 게 아니라, 진짜 세계 곳곳을 이어붙여서 웨스테로스를 만든 거였다. 나는 아직 이 나라들 중 한 곳도 못 가봤지만, 언젠가 크로아티아부터 스페인, 아이슬란드까지 순서대로 밟아보는 여행을 진지하게 계획해보고 싶어졌다."
    ],
    hookReveals:[
      { label:"킹스랜딩 → 크로아티아 두브로브니크", label_en:"King's Landing → Dubrovnik, Croatia", locId:"dubrovnik" },
      { label:"드래곤스톤 → 스페인 가스텔루가체(계단 241개)", label_en:"Dragonstone → Gaztelugatxe, Spain (241 steps)", locId:"gaztelugatxe" },
      { label:"장벽 너머 설원 → 진짜 아이슬란드 빙하", label_en:"Beyond the Wall → an actual Icelandic glacier", locId:"vatnajokull" },
      { label:"브라보스 대성당 계단 → 스페인 지로나, 극중 그 계단 그대로", label_en:"Braavos cathedral steps → Girona, Spain — the literal steps from the show", locId:"girona" }
    ],
    hookBadge_en:"HBO · Game of Thrones · Real filming locations across 7 countries",
    hookTagline_en:"Turns out Westeros is a real place. Several, actually.",
    discoveryHook_en:[
      "Going into Game of Thrones, I mentally braced for \"bloody medieval fantasy\" and left it at that.",
      "Then Ned Stark got his head cut off in the Season 1 finale, and I realized this show was never going to play nice.",
      "The guy who looked like the hero dying because he refused to compromise his honor — that wasn't just \"a character died.\" It rewrote the rules of the entire show.",
      "The next gut-punch was the Red Wedding in Season 3. Robb Stark, his mother Catelyn, and his wife Talisa all murdered at once, in the middle of a wedding feast. Even on a rewatch, it still takes my breath away.",
      "Then I found out the filming locations weren't CGI at all — they're real places — and suddenly I started seeing the whole show differently.",
      "King's Landing is Dubrovnik, Croatia. Minčeta Tower on the city walls is literally the House of the Undying, and the staircase Cersei walked, stripped bare, during her Walk of Shame is the city's real Jesuit Staircase.",
      "Speaking of Cersei — the moment I really reconsidered her was Season 6, when she blows up the entire Sept of Baelor with wildfire. A woman who looked politically cornered turns an entire city block to ash in one move.",
      "Dragonstone is Gaztelugatxe, an island hermitage on Spain's Basque coast — and you apparently have to climb 241 steps just to see that view, which somehow made Daenerys's isolation on that rock hit different.",
      "Honestly, the moment that gave me the most chills was Jon Snow coming back from the dead in Season 6. Betrayed and murdered by his own brothers in the Night's Watch, he opens his eyes again under Melisandre's hands — proof that this show didn't just mean nobody's safe, it meant not even death is necessarily the end.",
      "The landscape beyond the Wall looked like CGI, but it's an actual Icelandic glacier and Þingvellir National Park, where the North American and Eurasian tectonic plates are literally splitting apart. A landscape more fantastical than the fantasy, already sitting there on Earth.",
      "The most argued-over moment heading into the ending was Daenerys. When she burns all of King's Landing to the ground with her dragon after the city had already surrendered, half the audience turned on her instantly. How to read her turn from liberator to conqueror is still the hottest debate among fans.",
      "And it's Jon Snow himself who ends up killing her — which, thinking back on it, still stings.",
      "In the end, the Iron Throne goes to Bran Stark, of all people — and fans still argue endlessly about \"why Bran, though.\"",
      "Braavos's maze-like alleys are a real city too, Girona, Spain — and the cathedral steps aren't a set, they're the literal steps used in the show.",
      "In the end, this series didn't build its world out of CGI — it stitched Westeros together from real corners of the actual world. I haven't set foot in any of these countries yet, but I've started seriously plotting a trip that goes Croatia, then Spain, then Iceland, in order."
    ],
    discoveryHook_ja:[
      "『ゲーム・オブ・スローンズ』を見始めたときは、「血なまぐさい中世ファンタジーなんだろうな」くらいの心構えしかしていなかった。",
      "でもシーズン1の最終話でネッド・スタークが首を刎ねられるシーンを見て、この作品は絶対に油断して見られる作品じゃないと悟った。",
      "主人公に見えていた人物が、名誉を守ろうとした結果として死ぬという展開——これはただ「キャラクターが死んだ」というレベルじゃなく、物語全体のルールを書き換えるような出来事だった。",
      "次に本当に裏切られたと感じたのはシーズン3の「赤い結婚式」だ。ロブ・スタークと母キャトリン、妻タリサまで結婚式の最中に一斉に殺されるシーンは、今見返しても息が止まる。",
      "でもこのドラマ、撮影地が全部CGじゃなくて実在する場所だと知ってから、見え方がまるっきり変わった。",
      "キングズ・ランディングはクロアチアのドゥブロヴニクだ。城壁の上にあるミンチェタ塔は劇中の「アンデッドの館」そのものだし、サーセイが裸で歩かされた「恥辱の行進」もあの街に実在するイエズス会の階段だという。",
      "サーセイと言えば、シーズン6で彼女がワイルドファイアでベイラー大聖堂を丸ごと吹き飛ばすシーンを見て、このキャラクターを完全に見直した。政治的に追い詰められていたはずの人物が、一瞬で街ひとつを灰にしてしまうあの転換。",
      "ドラゴンストーンはスペイン・バスク海岸にある島の修道院、ガステルガチェだ。あの景色を見るには241段の階段を上らないといけないらしく、デナーリスがどれだけ孤独な場所に立っていたのか改めて実感した。",
      "正直、このドラマで一番ゾクッとしたのは、死んだはずのジョン・スノウがシーズン6で生き返るシーンだった。ナイツウォッチの仲間たちに裏切られて殺された彼が、メリサンドルの手によって再び目を開ける瞬間、この作品は「誰も安全じゃない」を超えて「死すらも終わりとは限らない」ことを見せつけてきた。",
      "壁の向こうの雪原はCGだと思っていたら、実は本物のアイスランドの氷河と、北米プレートとユーラシアプレートが実際に裂けているシングヴェトリル国立公園だったという。ファンタジーよりファンタジーらしい地形が、もともと地球に存在していたわけだ。",
      "結末に向けて一番議論を呼んだのはデナーリスだった。すでに降伏していたキングズ・ランディングをドラゴンで焼き尽くすあの瞬間、視聴者の半分が彼女に背を向けた。解放者だったはずの人物が征服者に変わっていく過程をどう受け止めるかは、今もファンの間で一番熱い論争だという。",
      "そして結局そのデナーリスを自らの手で終わらせるのがジョン・スノウだったというのも、思い返すと今でも切ない。",
      "最終的に鉄の玉座はブラン・スタークのもとに渡るのだが、これも「なぜよりによってブランなのか」という声がファンの間で今も絶えないらしい。",
      "ブラーヴォスの迷路のような路地もスペインのジローナという街で、大聖堂の階段はセットではなく劇中そのままの階段だという。",
      "結局このドラマは、CGで世界を作ったのではなく、実在する世界のあちこちを繋ぎ合わせてウェスタロスを作り上げていたわけだ。私はまだこれらの国のどこにも行ったことがないけれど、いつかクロアチアからスペイン、アイスランドへと順番に巡る旅を、本気で計画してみたくなった。"
    ],
    title_ja:"ゲーム・オブ・スローンズ", summary_ja:"鉄の玉座を巡って幾つもの名家が同盟と裏切りを繰り返す一方、北方では人類全体を脅かす存在が迫りつつある。政治劇と家族劇、戦争とファンタジーがひとつの世界地図の上で同時に動いていく物語だ。", author_ja:"デヴィッド・ベニオフ&D・B・ワイス製作 · HBO", era_ja:"放送2011〜2019年",
    contentSummary:{ sections:[
      { heading:"왕국의 균열", bullets:[
        "로버트 왕의 북부 방문을 계기로 스타크가와 라니스터가의 갈등이 시작됨",
        "네드의 죽음을 기점으로 다섯 왕의 전쟁이 발발함",
        "블랙워터 전투로 라니스터가가 킹스랜딩을 지켜냄"
      ]},
      { heading:"확장되는 대륙", bullets:[
        "붉은 결혼식으로 스타크 가문이 큰 타격을 입음",
        "대너리스가 바다 건너 노예도시들을 정복하며 세력을 키움",
        "장벽 너머에서는 백귀와의 전쟁이 서서히 다가옴"
      ]},
      { heading:"최종 전쟁", bullets:[
        "킹스랜딩의 권력 구도가 다시 한번 크게 재편됨",
        "장벽 너머의 백귀 군대와 인류 전체의 최종 전쟁이 벌어짐",
        "철왕좌를 둘러싼 마지막 대결이 시리즈의 결말로 이어짐"
      ]}
    ], endingNote:"철왕좌가 최종적으로 누구에게 돌아가고, 각 가문이 어떤 운명을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_the_Old_Town_of_Dubrovnik_-_Croatia.jpg", credit:'두브로브니크 구시가지(킹스랜딩의 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Old_Town_of_Dubrovnik_-_Croatia.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Game_of_Thrones" },
  { id:"wednesday", title:"웬즈데이 (Wednesday)", author:"알프레드 고프·마일스 밀러 제작 · Netflix", type:"mystery", country:"usa", medium:"tv_drama", genres:["mystery","comedy","horror"],
    lang:"en",
    era:"현재", title_en:"Wednesday", author_en:"Created by Alfred Gough & Miles Millar · Netflix", era_en:"Present day",
    summary:"감정을 잘 드러내지 않는 웬즈데이 아담스가 네버모어 아카데미에 입학해, 마을을 뒤흔드는 연쇄 사건과 가족의 오래된 비밀을 조사한다. 학교생활과 우정, 고딕풍 미스터리가 함께 얽힌다.",
    longSummary:"웬즈데이를 처음 볼 때는 그냥 아담스 패밀리의 스핀오프겠거니 생각했다. 그런데 이 드라마는 그 기괴한 유머 감각을 그대로 유지하면서도, 십대 성장물의 결을 놀랍도록 잘 살려낸다.\n\n웬즈데이와 이니드의 관계가 특히 그렇다. 정반대의 두 사람이 룸메이트로 만나 서서히 진짜 친구가 되어가는 과정은, 감정을 숨기는 캐릭터에게도 결국 곁을 내주는 사람이 생긴다는 걸 보여준다. 그 냉소적인 캐릭터가 아주 조금씩 마음을 여는 순간들이 이 드라마의 진짜 재미다.\n\n루마니아와 아일랜드의 실제 고성들을 그대로 활용한 촬영지도 매력이다. CG로 만든 학교가 아니라 진짜 존재하는 고딕 건축물들이 네버모어의 분위기를 만들어낸다는 걸 알고 나면, 그 배경들이 훨씬 더 실감나게 다가온다.",
    pinColor:"#1c1c1c",
    summary_en:"The famously deadpan Wednesday Addams enrolls at Nevermore Academy, where she investigates a killing spree terrorizing the town while unraveling a supernatural mystery involving her own family. School life, friendship, and gothic mystery all tangle together.",
    longSummary_en:"Going in, I assumed this was just an Addams Family spin-off. What the show actually does is keep that same bizarre sense of humor while pulling off a surprisingly effective teen coming-of-age story.\n\nThe relationship between Wednesday and Enid carries a lot of that. Two opposites become roommates and slowly, genuinely, become friends — proving that even a character who hides every emotion eventually lets someone in. Those small moments where the deadpan cracks are the real pleasure of the show.\n\nThe real castles used across Romania and Ireland add a lot too. Once you realize Nevermore's atmosphere comes from actual Gothic architecture rather than CGI, those backdrops land with a lot more weight.",
    communityNote:"4화 '레이븐 무도회' 댄스 장면은 제나 오르테가가 촬영 이틀 전 직접 안무를 짰고, 심지어 코로나19에 걸린 상태로 촬영했다는 사실이 알려지며 더 화제가 됐어요. 본인이 밝힌 참고 자료는 수지 수(Siouxsie Sioux), 밥 포시의 '리치맨스 프러그', 1964년 오리지널 웬즈데이 역의 리사 로링, 80년대 고스 클럽 자료 영상까지 다양합니다. \"웬즈데이와 이니드, 진짜 우정인가 그 이상인가\"도 팬들 사이 꾸준한 논쟁거리예요.",
    communityNote_en:"The Rave'N dance scene in Episode 4 became even more legendary once fans learned Jenna Ortega choreographed it herself just two days before filming — while she had COVID. Her cited influences ranged from Siouxsie Sioux and Bob Fosse's \"Rich Man's Frug\" to Lisa Loring (the original 1964 Wednesday) and archival footage of '80s goth clubs. \"Wednesday and Enid — just friendship, or something more?\" remains a steady fan debate too.",
    hookBadge:"Netflix · 웬즈데이 · 네버모어의 실제 정체", hookTagline:"그 고딕 성, CG인 줄 알았는데 진짜 있더라",
    discoveryHook:[
      "웬즈데이를 처음 볼 때는 그냥 아담스 패밀리 스핀오프겠거니 하고 가볍게 틀었다.",
      "그런데 그 으스스한 네버모어 아카데미 건물을 보자마자 저게 세트인지 CG인지부터 궁금해졌다.",
      "찾아보니 둘 다 아니었다. 루마니아에 실제로 있는 칸타쿠지노 성이다.",
      "1911년에 지어진 진짜 건물인데, 지어진 사연은 전혀 무섭지 않다. 그냥 총리의 여름 별장이었다고 한다. 나중엔 내무부가 소유하다가 지금은 복원돼서 일반에 공개돼 있다.",
      "팀 버튼 감독이 직접 밝히길, 진짜 어려웠던 건 '루마니아를 버몬트처럼 보이게 만드는 것'이었다고 한다. 원래도 충분히 고딕스러운 나라를 미국 동부 느낌으로 다시 꾸며야 했다는 거다.",
      "극 중 초반에는 그냥 냉소적인 전학생이 새 학교에 적응하는 이야기인 줄 알았는데, 회를 거듭할수록 마을을 습격하는 '괴물'의 정체를 쫓는 미스터리로 커진다.",
      "그리고 이게 이 드라마의 진짜 반전인데, 그 괴물의 정체는 웬즈데이가 마음을 열기 시작한 상대, 보안관 아들 타일러였다. 처음부터 곁에 있던 인물이 사실 하이드였다는 걸 알았을 때는 진짜 뒤통수 맞은 기분이었다.",
      "더 놀라운 건 타일러를 그렇게 만든 배후다. 온화해 보이던 식물학 교사 마릴린 손힐이 사실은 로럴 게이츠라는 인물이고, 아담스 가문의 조상 구디 아담스와 오랜 원한 관계였던 게이츠 가문의 후손이었다. 겉으로 제일 안전해 보이던 사람이 처음부터 배후였던 셈이다.",
      "웬즈데이와 룸메이트 이니드의 관계도 이 드라마를 다시 보게 만드는 이유다. 정반대 성격의 두 사람이 서서히 진짜 친구가 되어가는 과정은, 감정을 숨기는 캐릭터에게도 결국 곁을 내주는 사람이 생긴다는 걸 보여준다.",
      "4화 레이븐 무도회 춤 장면도 찾아보다 알게 된 사실인데, 제나 오르테가가 촬영 이틀 전 코로나에 걸린 채로 직접 안무를 짰다고 한다. 그 냉소적인 캐릭터가 춤출 때만큼은 완전히 다른 사람 같아지는 이유가 있었던 셈이다.",
      "시즌2부터는 촬영지 자체가 아일랜드로 넘어갔다. 고딕 실내 장면이 찍힌 찰빌 성은 원래부터 '유령 성'으로 유명해서 따로 투어 프로그램까지 있다고 한다.",
      "그러니까 이 드라마는 그냥 고딕풍 학원물이 아니라, 제일 가까이 있던 사람이 사실 위협이었다는 걸 아주 천천히 보여주는 미스터리였던 셈이다.",
      "네버모어는 상상 속 학교가 아니라, 총리 별장이었다가 내무부 건물이었다가 지금은 관광지가 된 진짜 성이다. 나는 루마니아 가본 적 없지만, 이 드라마 덕분에 여행지 목록에 하나가 추가됐다.",
      "언젠가 루마니아에 가면, 원래는 그냥 별장이었던 그 성이 어떻게 네버모어라는 학교로 다시 태어났는지 눈으로 직접 확인해보고 싶다."
    ],
    hookReveals:[
      { label:"네버모어 아카데미 → 루마니아 칸타쿠지노 성(실제 총리 별장)", label_en:"Nevermore Academy → Cantacuzino Castle, Romania (a real prime minister's summer villa)", locId:"cantacuzino" },
      { label:"학교 정원 장면 → 부쿠레슈티 식물원", label_en:"School garden scenes → Bucharest Botanical Garden", locId:"bucharestgarden" },
      { label:"시즌2 고딕 실내 → 아일랜드 '유령 성' 찰빌", label_en:"Season 2 Gothic interiors → Charleville, Ireland's 'haunted castle'", locId:"charleville" },
      { label:"윔스 교장실 → 부쿠레슈티 몬테오루 궁전", label_en:"Principal Weems's office → Palatul Monteoru, Bucharest", locId:"palatulmonteoru" }
    ],
    hookBadge_en:"Netflix · Wednesday · What Nevermore Academy actually is",
    hookTagline_en:"Wait, that gothic castle is a real place?",
    discoveryHook_en:[
      "Going into Wednesday, I figured it was just an Addams Family spin-off and hit play without much expectation.",
      "Then I saw that eerie Nevermore Academy building and immediately started wondering whether it was a set or CGI.",
      "Turns out it's neither. It's a real castle in Romania called Cantacuzino Castle.",
      "Built in 1911, and the backstory behind it is nowhere near spooky — it was just a prime minister's summer villa. It was later owned by the Ministry of Internal Affairs, and now it's been restored and opened to the public.",
      "Director Tim Burton said the real challenge was making Romania look like Vermont — reshaping an already gothic-looking country into something with an American East Coast feel.",
      "Early on, it plays like a deadpan transfer student adjusting to a new school. But episode by episode it grows into a mystery chasing down whatever \"monster\" is terrorizing the town.",
      "And here's the show's real twist: that monster turns out to be Tyler, the sheriff's son — the exact person Wednesday was slowly starting to let her guard down around. Finding out the guy who'd been by her side the whole time was the Hyde felt like a genuine gut-punch.",
      "Even more shocking is who was pulling his strings. The gentle-seeming botany teacher, Ms. Thornhill, turns out to actually be Laurel Gates — a descendant of the Gates family locked in an old feud with the Addams' ancestor, Goody Addams. The person who looked safest the whole time had been the mastermind from the start.",
      "Wednesday's relationship with her roommate Enid is another reason this show holds up. Two total opposites slowly becoming real friends shows that even a character who hides every emotion eventually lets someone in.",
      "I also found out how the Rave'N dance scene in Episode 4 came together — Jenna Ortega choreographed it herself, two days before filming, while she had COVID. There's a reason the deadpan character looks like a completely different person the moment she starts dancing.",
      "Starting in Season 2, filming shifted to Ireland. Charleville Castle, used for the Gothic interiors, was already famous as a \"haunted castle\" with its own guided tours before the show ever got there.",
      "So this isn't just a gothic school drama — it's a mystery that very slowly reveals the person standing closest to you was the threat all along.",
      "Nevermore isn't an imaginary school. It's a real castle that was a prime minister's villa, then a government building, and is now a tourist attraction. I've never been to Romania, but this show just put it on my list.",
      "If I ever make it there, I want to see with my own eyes how a building that started as just a summer villa got reborn as Nevermore Academy."
    ],
    discoveryHook_ja:[
      "『ウェンズデー』を見始めたときは、アダムス・ファミリーのスピンオフだろうくらいの気持ちで軽く再生した。",
      "でもあの不気味なネバーモア・アカデミーの建物を見た瞬間、これはセットなのかCGなのか気になって仕方なくなった。",
      "調べてみたら、どちらでもなかった。ルーマニアに実在するカンタクジノ城だ。",
      "1911年に建てられた本物の建物だが、その由来は全然怖くない。ただの首相の夏の別荘だったという。その後は内務省が所有し、今は修復されて一般公開されている。",
      "ティム・バートン監督いわく、本当に大変だったのは「ルーマニアをバーモントに見せること」だったという。もともと十分にゴシック的なこの国を、アメリカ東海岸っぽく作り直さないといけなかったわけだ。",
      "序盤は皮肉屋の転校生が新しい学校になじんでいくだけの話かと思っていたが、話が進むにつれて町を襲う「怪物」の正体を追うミステリーへと膨らんでいく。",
      "そしてここがこのドラマの本当の反転なのだが、その怪物の正体は、ウェンズデーが少しずつ心を開き始めていた相手、保安官の息子タイラーだった。最初からそばにいた人物が実はハイドだったと知ったときは、本当に足元をすくわれた気分になった。",
      "さらに驚いたのは、タイラーをそうさせた黒幕だ。物腰の柔らかい植物学の先生マリリン・ソーンヒルは、実はローレル・ゲイツという人物で、アダムス家の祖先グーディ・アダムスと長年因縁のあったゲイツ家の子孫だった。一番安全そうに見えていた人物が、最初から黒幕だったわけだ。",
      "ウェンズデーとルームメイトのイーニドの関係も、このドラマを見返したくなる理由のひとつだ。正反対の性格の二人が少しずつ本当の友達になっていく過程は、感情を隠すキャラクターにもいつか心を許せる相手ができるということを教えてくれる。",
      "第4話のレイヴンズ・ボール(舞踏会)のダンスシーンについても調べていて知ったのだが、ジェナ・オルテガが撮影の2日前、コロナに感染した状態で自ら振り付けを考えたという。あの皮肉屋なキャラクターが踊るときだけまるで別人のように見えるのには、ちゃんと理由があったわけだ。",
      "シーズン2からは撮影地自体がアイルランドに移った。ゴシック調の室内シーンが撮られたチャールヴィル城は、もともと「幽霊城」として有名で、独自のツアープログラムまであるらしい。",
      "つまりこのドラマは、ただのゴシック学園ものではなく、一番近くにいた人物が実は脅威だったということをじっくりと見せていくミステリーだったわけだ。",
      "ネバーモアは空想の学校ではなく、首相の別荘から内務省の建物になり、今は観光地になった本物の城だ。私はルーマニアに行ったことはないけれど、このドラマのおかげで旅行先リストにひとつ加わった。",
      "いつかルーマニアに行けたら、もともとはただの別荘だったあの城が、どうやってネバーモア・アカデミーとして生まれ変わったのか、自分の目で確かめてみたい。"
    ],
    title_ja:"ウェンズデー", summary_ja:"感情をめったに表に出さないウェンズデー・アダムスがネバーモア・アカデミーに入学し、町を揺るがす連続事件と一族に伝わる古い秘密を調べていく。学園生活と友情、ゴシック風のミステリーが絡み合う物語だ。", author_ja:"アルフレッド・ゴフ&マイルズ・ミラー製作 · Netflix", era_ja:"現代",
    contentSummary:{ sections:[
      { heading:"네버모어 입학", bullets:[
        "일반 학교에서 퇴학당한 웬즈데이, 부모의 모교인 네버모어 아카데미에 입학함",
        "룸메이트 이니드, 그리고 여러 학생들과 얽히며 학교생활이 시작됨",
        "제리코 마을에서 벌어지는 의문의 사건에 관심을 갖기 시작함"
      ]},
      { heading:"수사와 성장", bullets:[
        "포컵 대회 등 학교 행사를 배경으로 갈등과 우정이 함께 깊어짐",
        "괴물의 정체를 추적하며 하이드와 관련된 미스터리에 다가감",
        "아담스 가문의 과거와 얽힌 비밀이 서서히 드러나기 시작함"
      ]},
      { heading:"결전과 다음 시즌", bullets:[
        "시즌1 최대 반전과 함께 마을을 위협하던 사건이 해결됨",
        "시즌2에서는 새로운 위협과 함께 이야기가 확장됨"
      ]}
    ], endingNote:"제리코 마을의 사건이 정확히 어떻게 해결되고, 웬즈데이가 어떤 선택을 내리는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Castelul_Cantacuzino_din_Bu%C8%99teni_01.jpg", credit:'칸타쿠지노 성, 루마니아(네버모어 아카데미 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Castelul_Cantacuzino_din_Bu%C8%99teni_01.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Wednesday_(TV_series)" },
  { id:"strangerthings", title:"기묘한 이야기 (Stranger Things)", author:"더퍼 형제 제작 · Netflix", type:"scifi", country:"usa", medium:"tv_drama", genres:["scifi","horror","drama"],
    lang:"en",
    era:"1983년~", title_en:"Stranger Things", author_en:"Created by the Duffer Brothers · Netflix", era_en:"1983–present",
    summary:"인디애나주의 작은 마을 호킨스에서 소년이 사라진 뒤, 친구들과 초능력을 가진 소녀 일레븐이 다른 차원의 위협을 발견한다. 아이들이 성장할수록 마을의 비밀과 적의 규모도 커진다.",
    longSummary:"기묘한 이야기를 처음 볼 때는 그냥 '80년대에 대한 향수를 자극하는 SF물'이겠거니 생각했다. 실제로 자전거를 타고 다니는 아이들, 아케이드 게임, 신스팝 음악까지 그 시절 분위기를 정성껏 재현하긴 한다.\n\n하지만 이 드라마가 오래 사랑받는 진짜 이유는, 초자연적 공포 이야기 안에 지극히 평범한 성장통을 함께 담아냈다는 점이다. 윌의 실종이라는 큰 사건 뒤에는, 친구들 사이의 우정과 첫사랑, 부모와 자식 간의 신뢰 같은 훨씬 작고 인간적인 이야기들이 촘촘히 엮여 있다.\n\n무엇보다 시즌이 거듭될수록 등장인물들이 실제로 자라나는 걸 보는 재미가 있다. 매력적인 배우들이 실제 나이를 먹으며 캐릭터와 함께 성장하는 흔치 않은 시리즈이기도 하다.",
    pinColor:"#a02020",
    summary_en:"After a boy vanishes from the small town of Hawkins, Indiana, his friends and a girl with psychic powers named Eleven uncover a threat from another dimension. As the kids grow up, so does the scale of the town's secrets and its enemy.",
    longSummary_en:"Going in, I assumed this was just an '80s-nostalgia sci-fi show. And it does lovingly recreate that era — kids on bikes, arcade games, synth-pop.\n\nBut the real reason it's stayed beloved is that it weaves ordinary growing pains into a supernatural horror story. Behind the big event of Will's disappearance sit smaller, deeply human stories — friendship, first love, trust between parents and kids.\n\nWhat's most fun, though, is watching the characters actually grow up season by season. It's a rare series where the appealing young cast ages in real time right alongside their characters.",
    communityNote:"케이트 부시의 Running Up That Hill(1985)은 시즌4 방영 후 발매 37년 만에 처음으로 차트 1위에 올라, '역대 최장기간 만에 1위에 오른 곡' 등 기네스 세계기록 3개를 새로 썼어요. 맥스가 헤드폰으로 이 노래를 들으며 베크나에 맞서는 장면이 실제로 하루 평균 스트리밍 600만 회를 이끌어낸 셈입니다. \"맥스는 정말 살아남을 수 있을까\", \"에디 먼슨의 희생을 어떻게 기억할 것인가\"도 시즌4 이후 가장 자주 회자되는 주제예요.",
    communityNote_en:"Kate Bush's \"Running Up That Hill\" (1985) hit No. 1 for the first time 37 years after release following Season 4 — setting three new Guinness World Records, including the longest gap ever for a song to reach No. 1. The scene of Max fighting off Vecna through her Walkman headphones is credited with driving roughly 6 million streams a day at its peak. \"Can Max really survive\" and \"how should we remember Eddie Munson's sacrifice\" have also been the most talked-about topics since Season 4.",
    hookBadge:"Netflix · 기묘한 이야기 · 호킨스의 진짜 위치", hookTagline:"그 몰, 지금은 어떻게 됐을까 찾아봤다",
    discoveryHook:[
      "기묘한 이야기를 처음 볼 때는 그냥 '80년대 감성 자극하는 SF 호러겠거니' 하고 가볍게 시작했다.",
      "그런데 시즌1부터 윌 바이어스가 실종되고, 그 자리를 대신하듯 낯선 소녀 일레븐이 나타나는 전개를 보면서 이게 단순한 향수 콘텐츠가 아니라는 걸 깨달았다.",
      "업사이드다운이라는 다른 차원의 존재가 처음 드러나는 순간, 그리고 시즌1 마지막에 일레븐이 데모고르곤과 함께 사라지는 장면은 다시 봐도 여전히 먹먹하다.",
      "시즌3에서 가장 화려하게 나온 스타코트몰, 실제로는 조지아주의 그위넷 플레이스 몰이라는 곳이다. 1984년에 개장해서 극중 시대인 1985년이랑 거의 맞아떨어지고, 라디오섁이나 스펜서스 기프트 같은 진짜 80년대 브랜드로 매장을 채웠다고 한다.",
      "근데 지금 가보면 분위기가 완전히 다르다. 상권이 크게 죽어서 카운티가 소유 중이고 재개발 얘기가 계속 나오는 중이라고 한다. 극중 가장 화려했던 그 몰이 현실에선 정반대가 됐다는 게 좀 아이러니하다.",
      "시즌3 마지막에 호퍼가 폭발과 함께 죽은 줄 알았던 것도, 시즌4 오프닝에서 사실은 러시아로 끌려가 강제노동수용소에 갇혀 있었다는 게 밝혀지면서 완전히 뒤집혔다. 죽은 줄 알았던 사람이 몇 화 만에 살아 돌아오는 그 반전은 진짜 예상 못 했다.",
      "근데 이 '러시아' 장면도 찾아보다 웃겼는데, 사실은 그냥 애틀랜타 스튜디오 안 세트였다. 아무도 진짜 러시아에 안 갔다는 거다.",
      "시즌4의 진짜 핵심은 베크나였다. 그런데 이 베크나의 정체가 사실 호킨스 연구소 최초의 실험체였던 '001', 즉 헨리 크릴이라는 인물이었다는 게 밝혀지는 순간, 일레븐과 이 빌런이 처음부터 같은 연구소 출신이었다는 게 드러난다. 그냥 새로운 괴물이 아니라 일레븐의 과거와 직접 얽힌 존재였던 거다.",
      "맥스가 헤드폰으로 케이트 부시의 Running Up That Hill을 들으며 베크나의 저주에 맞서는 장면도 다시 봐도 소름 돋는다. 이 노래가 시즌4 방영 이후 발매 37년 만에 처음 차트 1위에 오른 것도 이번에 찾아보고 알았다.",
      "그러니까 이 드라마의 진짜 무대는 초자연적인 다른 차원이 아니라, 조지아주의 평범한 소도시들이다. 나는 조지아엔 가본 적 없지만, 혹시 지나갈 일 있으면 그 자리가 한때 스타코트몰이었다는 걸 알아채는 재미는 있을 것 같다.",
      "숲과 철길 장면이 찍힌 스톤 마운틴 파크도 실제로 방문 가능한 곳이라고 한다.",
      "시즌이 거듭될수록 배우들이 실제 나이를 먹으며 캐릭터와 함께 자라는 걸 보는 것도 이 드라마만의 재미다. 시즌1의 꼬마들이 이제는 진짜 고등학생, 성인의 얼굴로 마지막 시즌을 향해 가고 있다.",
      "호킨스라는 마을은 지도에 없지만, 이 드라마 덕분에 조지아라는 주는 이제 나한테 완전히 다른 의미로 다가온다. 언젠가 가면 그위넷 플레이스 몰 자리부터 들러보고 싶다."
    ],
    hookReveals:[
      { label:"스타코트몰 → 그위넷 플레이스 몰(1984년 개장, 지금은 쇠퇴)", label_en:"Starcourt Mall → Gwinnett Place Mall (opened 1984, now largely vacant)", locId:"gwinnettmall" },
      { label:"시즌4 '러시아' → 사실은 애틀랜타 스튜디오 세트", label_en:"Season 4's 'Russia' → actually an Atlanta studio set", locId:"kamchatkaset" },
      { label:"호킨스 중심가 → 조지아주 잭슨", label_en:"Downtown Hawkins → Jackson, Georgia", locId:"jacksonga" },
      { label:"숲·철길 장면 → 스톤 마운틴 파크", label_en:"Woods & railway scenes → Stone Mountain Park", locId:"stonemountain" }
    ],
    hookBadge_en:"Netflix · Stranger Things · Where Hawkins really is",
    hookTagline_en:"I looked up what happened to that mall since",
    discoveryHook_en:[
      "Going into Stranger Things, I expected an '80s-nostalgia sci-fi horror show and left it at that.",
      "Then Season 1 opened with Will Byers vanishing, and a strange girl named Eleven appearing almost in his place, and I realized this wasn't just nostalgia bait.",
      "The reveal of another dimension called the Upside Down, and Eleven vanishing along with the Demogorgon at the end of Season 1, still hit hard even on a rewatch.",
      "The dazzling Starcourt Mall from Season 3 is actually Gwinnett Place Mall in Georgia. It opened in 1984, almost exactly matching the show's 1985 setting, and was dressed with real '80s brands like RadioShack and Spencer's Gifts.",
      "Visit it today, though, and the vibe is completely different — commercial activity collapsed, the county now owns it, and redevelopment talk keeps circling without resolution. There's something ironic about the show's flashiest location ending up the exact opposite in real life.",
      "Hopper's apparent death in the Season 3 explosion got completely flipped in the Season 4 opener, when it turned out he'd actually been shipped off to a Russian labor camp. A guy I assumed was dead walking back onscreen a few episodes later was a twist I genuinely didn't see coming.",
      "The \"Russia\" setting itself turned out to be a bit of a joke, too — nobody actually went to Russia. It was just a soundstage set at a studio in Atlanta.",
      "The real core of Season 4 was Vecna. The moment it's revealed that Vecna is actually \"001,\" the very first test subject at Hawkins Lab — a man named Henry Creel — it turns out he and Eleven came from the exact same lab from the start. Not just a new monster, but a villain directly tangled up in Eleven's own history.",
      "The scene of Max fighting off Vecna's curse through Kate Bush's \"Running Up That Hill\" playing on her Walkman still gives me chills on a rewatch. I only just learned that the song hit No. 1 for the first time ever, 37 years after release, following Season 4.",
      "So the show's real stage was never some other dimension — it's a handful of ordinary Georgia towns. I've never been to Georgia, but if I ever pass through, there's something fun about knowing that spot used to be Starcourt.",
      "Stone Mountain Park, where the woods and railway scenes were shot, is also apparently open to visitors.",
      "Watching the cast actually age alongside their characters, season after season, is another pleasure unique to this show. The little kids from Season 1 are heading into the final season with the faces of real high schoolers and young adults now.",
      "Hawkins isn't on any map, but thanks to this show, Georgia now means something completely different to me. If I ever get there, I want to start by stopping where Gwinnett Place Mall used to be Starcourt."
    ],
    discoveryHook_ja:[
      "『ストレンジャー・シングス』を見始めたときは、80年代の懐かしさを刺激するSFホラーだろうくらいの気持ちで軽く見始めた。",
      "でもシーズン1の冒頭でウィル・バイヤーズが行方不明になり、その代わりのように見知らぬ少女イレブンが現れる展開を見て、これは単なるノスタルジーコンテンツじゃないと悟った。",
      "「アップサイドダウン」という異次元の存在が初めて明かされる瞬間、そしてシーズン1の最後にイレブンがデモゴルゴンと共に姿を消すシーンは、見返しても今でも胸が締め付けられる。",
      "シーズン3で一番華やかに登場したスターコート・モール、実は本物はジョージア州のグウィネット・プレイス・モールという場所だ。1984年に開業していて劇中の1985年という時代設定とほぼ一致するし、ラジオシャックやスペンサーズ・ギフトのような本物の80年代ブランドで店舗を埋めたという。",
      "でも今行ってみると雰囲気はまるで違う。商業活動がすっかり衰退して郡が所有しており、再開発の話がずっと出ているらしい。劇中で一番華やかだったあのモールが、現実では正反対になっているというのは何とも皮肉だ。",
      "シーズン3のラストで爆発と共に死んだと思われたホッパーも、シーズン4の冒頭で実はロシアに連れて行かれ、強制労働収容所に閉じ込められていたことが明かされて、完全にひっくり返った。死んだと思っていた人物が数話後に生きて戻ってくるあの展開は、本当に予想していなかった。",
      "ちなみにこの「ロシア」のシーンも調べていて笑ってしまったのだが、実際には誰もロシアには行っておらず、ただのアトランタのスタジオ内セットだったという。",
      "シーズン4の本当の核心はヴェクナだった。ところがこのヴェクナの正体が、実はホーキンス研究所の最初の被験体「001」、つまりヘンリー・クリールという人物だったと明かされる瞬間、イレブンとこの悪役が最初から同じ研究所出身だったことが分かる。ただの新しい怪物ではなく、イレブン自身の過去に直接つながる存在だったわけだ。",
      "マックスがヘッドホンでケイト・ブッシュの「Running Up That Hill」を聴きながらヴェクナの呪いに立ち向かうシーンも、見返すたびにゾクゾクする。この曲がシーズン4放送後、発売から37年ぶりに初めてチャートの1位に上り詰めたということも、今回調べて初めて知った。",
      "つまりこのドラマの本当の舞台は超自然的な異次元ではなく、ジョージア州の何の変哲もない小さな町々だったわけだ。私はジョージアに行ったことはないけれど、もし通りかかることがあれば、あそこがかつてスターコートだったと気づく楽しみはありそうだ。",
      "森と線路のシーンが撮影されたストーン・マウンテン・パークも、実際に訪れることができる場所だという。",
      "シーズンを重ねるごとに、俳優たちが実際に年齢を重ねながらキャラクターと一緒に成長していくのを見られるのも、このドラマならではの魅力だ。シーズン1では小さな子どもだった彼らが、今はすっかり高校生や大人の顔つきで最終シーズンへと向かっている。",
      "ホーキンスという町は地図には存在しないけれど、このドラマのおかげでジョージア州は私にとってまったく違う意味を持つ場所になった。いつか行けたら、まずはグウィネット・プレイス・モール、かつてのスターコートがあった場所から訪れてみたい。"
    ],
    title_ja:"ストレンジャー・シングス 未知の世界", summary_ja:"インディアナ州の小さな町ホーキンスで少年が姿を消した後、彼の友人たちと超能力を持つ少女イレブンが異次元からの脅威に気づく。子どもたちが成長するにつれて、町に隠された秘密と敵の規模も大きくなっていく。", author_ja:"ダファー兄弟製作 · Netflix", era_ja:"1983年〜",
    contentSummary:{ sections:[
      { heading:"윌의 실종", bullets:[
        "윌 바이어스가 실종되고, 같은 날 낯선 소녀 일레븐이 발견됨",
        "친구들이 힘을 합쳐 데모고르곤이라는 존재와 첫 대면을 함",
        "업사이드다운이라는 다른 차원의 존재가 처음 드러남"
      ]},
      { heading:"확장되는 위협", bullets:[
        "마인드 플레이어라는 거대한 존재가 호킨스 전체를 위협함",
        "스타코트몰을 배경으로 한 대규모 전투가 벌어짐",
        "호퍼의 실종과 함께 이야기가 러시아까지 확장됨"
      ]},
      { heading:"베크나와 최종장", bullets:[
        "베크나라는 새로운 존재가 등장해 등장인물들의 트라우마를 파고듦",
        "호킨스 전역에 균열이 발생하며 시리즈 최대 위기를 맞음",
        "마지막 시즌을 향한 최종 결전이 예고됨"
      ]}
    ], endingNote:"베크나와의 대결이 어떻게 마무리되고, 호킨스와 아이들이 어떤 결말을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Stone_Mountain_Park,_DeKalb_County,_Georgia.jpg", credit:'스톤 마운틴 파크, 조지아주(숲·철길 장면 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Stone_Mountain_Park,_DeKalb_County,_Georgia.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Stranger_Things" },
  { id:"squidgame", title:"오징어 게임 (Squid Game)", author:"황동혁 제작 · Netflix", type:"thriller", country:"korea", medium:"tv_drama", genres:["thriller","drama"],
    lang:"ko",
    era:"현재", title_en:"Squid Game", author_en:"Created by Hwang Dong-hyuk · Netflix", era_en:"Present day",
    summary:"빚과 절망에 몰린 사람들이 거액의 상금을 위해 어린 시절의 놀이에 참가한다. 단순해 보이는 규칙 뒤에서 참가자의 선택, 불평등, 연대와 배신이 드러난다.",
    longSummary:"오징어 게임을 처음 볼 때는 '어릴 적 놀이로 서바이벌을 한다'는 설정 자체가 신기해서 보기 시작했다. 그런데 몇 화만 지나면 이 작품이 게임의 스릴보다 훨씬 무거운 걸 이야기하고 있다는 게 느껴진다.\n\n각 참가자가 이 게임에 들어온 이유는 하나같이 절박하다. 빚, 실패, 소외 — 이 사회가 이들을 이미 벼랑 끝으로 몰아넣었다는 전제가 게임 자체보다 더 무섭게 다가온다. 그리고 그 절박함 앞에서 사람들이 보여주는 선택들 — 연대할 것인가, 배신할 것인가 — 이 시리즈의 진짜 질문은 여기에 있다.\n\n무엇보다 전 세계가 이 정도로 반응할 줄은 몰랐다. 무궁화꽃이 피었습니다, 달고나 같은 한국의 놀이 문화가 전 세계적인 밈이 된 걸 보면, 콘텐츠가 얼마나 강력하게 문화를 실어 나를 수 있는지 새삼 느끼게 된다.",
    pinColor:"#e0466b",
    summary_en:"People crushed by debt and despair compete in childhood games for an enormous cash prize. Behind rules that look deceptively simple, the choices of each participant reveal inequality, solidarity, and betrayal.",
    longSummary_en:"I started watching for the novelty of the premise — adults playing childhood games as a survival competition. A few episodes in, though, it's clear the show is after something much heavier than game-show thrills.\n\nEvery participant's reason for entering is desperate: debt, failure, exclusion. The premise that society had already pushed them to the edge lands scarier than the games themselves. And the choices people make in the face of that desperation — solidarity or betrayal — is where the show's real question lives.\n\nWhat I didn't expect was just how far this would travel globally. Watching Korean childhood games like Red Light, Green Light and dalgona candy become worldwide memes is a reminder of how powerfully content can carry culture with it.",
    communityNote:"이정재는 2022년 에미상 남우주연상(드라마 부문)을 받으며 비영어권 배우 최초 수상이라는 기록을 세웠고, 황동혁 감독도 첫 화 '무궁화꽃이 피었습니다'로 감독상·각본상을 함께 받았어요. 오징어 게임 자체는 비영어권 시리즈 최초로 에미 작품상 후보에 오르며 총 14개 부문 노미네이트, 공개 당시 넷플릭스 역대 최다 시청 기록도 새로 썼습니다. \"상우는 악인인가 생존자인가\", \"프론트맨의 진짜 동기는 무엇인가\"는 지금도 이어지는 대표적인 논쟁이에요.",
    communityNote_en:"Lee Jung-jae became the first non-English-language actor ever to win the Emmy for Best Actor in a Drama Series (2022), while director Hwang Dong-hyuk also won Directing and Writing Emmys for the premiere episode, \"Red Light, Green Light.\" Squid Game itself was the first non-English series ever nominated for Best Drama, earning 14 nominations total, and became Netflix's most-watched show ever upon release. \"Was Sang-woo a villain or a survivor\" and \"what is the Front Man's real motive\" remain the show's signature debates.",
    hookBadge:"Netflix · 오징어 게임 · 그 섬, 지도에 있을까", hookTagline:"게임장 밖은 전부 진짜 서울이었다",
    discoveryHook:[
      "오징어 게임을 처음 볼 때는 '어릴 적 놀이로 서바이벌을 한다'는 설정 자체가 신기해서 보기 시작했다.",
      "그런데 몇 화만 지나면 이 작품이 게임의 스릴보다 훨씬 무거운 걸 이야기하고 있다는 게 느껴진다. 참가자 대부분이 빚, 실패, 소외로 이미 벼랑 끝에 몰려 있었다는 전제가 게임 자체보다 더 무섭다.",
      "그 게임장이 있는 섬, 궁금해서 찾아봤는데 지도에는 없다. 극중에서만 존재하는 이름이고, 실제로는 제주가 아니라 인천 근처 섬들에서 나눠 찍었다고 한다.",
      "오히려 소름 돋는 건 게임장 밖 장면들이다. 기훈이 살던 동네 쌍문동은 세트가 아니라 진짜 서울 도봉구 동네고, 심지어 황동혁 감독 본인이 실제로 거기서 살았던 경험이 반영됐다고 한다.",
      "시즌1을 다 보고 나서 제일 충격이었던 건 오일남 노인이었다. 참가번호 001, 가장 순진하고 약해 보이던 그 노인이 사실 이 게임 전체를 만든 창시자였다는 반전. 돈이 너무 많아서 오히려 지루해진 사람이, 사람들의 목숨을 걸고 재미를 느끼려고 이 모든 걸 설계했다는 사실을 알았을 때는 정말 소름이 돋았다.",
      "프론트맨의 정체도 마찬가지다. 게임을 운영하던 그 가면 쓴 사람이, 사실은 형사 황준호가 그렇게 찾아 헤매던 실종된 형 황인호였다는 게 밝혀지는 순간, 이 작품이 그냥 서바이벌 스릴러가 아니라는 걸 다시 느꼈다.",
      "게임 자체도 소름 돋는데, 알고 보니 그 정교한 세트들이 실제로는 대전의 한 스튜디오에서 통째로 지어졌다고 한다.",
      "반대로 여의도는 게임장 안 세상과 대비되는 도시 풍경으로 일부러 등장시켰다고 한다. 극단과 현실을 나란히 보여주려던 셈이다.",
      "시즌2·3으로 이어지면서 기훈은 상금을 포기하고 다시 게임 안으로 뛰어들어 저항을 시도한다. 한 번 빠져나온 사람이 다시 들어간다는 선택 자체가, 이 작품이 결국 '살아남는 것'보다 '무엇을 위해 살아남을 것인가'를 묻는 이야기라는 걸 보여준다.",
      "시즌3 마지막에서 기훈은 결국 살아남지 못한다. 다른 참가자의 아기를 지키기 위해 스스로를 희생하는 선택을 하는데, 이 결말을 두고 지금도 팬들 사이에서 \"꼭 이렇게 끝나야 했나\"라는 얘기가 끊이지 않는다.",
      "그리고 진짜 소름 돋는 건 엔딩 크레딧 이후다. LA의 골목에서 낯선 여성이 딱지치기를 하며 누군가를 게임에 초대하는 장면이 나오는데, 이게 이 게임이 한국을 넘어 세계로 퍼져나갈 수 있다는 암시로 해석되고 있다.",
      "결말부에 나오는 공항도 세트가 아니라 진짜 인천공항이라고 한다.",
      "극한의 서바이벌을 다루는 이야기인데, 배경만큼은 철저히 우리가 아는 서울이었다는 게 이 작품을 다시 보게 만드는 이유다.",
      "나는 아직 쌍문동에 가본 적 없지만, 언젠가 그 골목을 지나가게 되면 여기가 그냥 평범한 동네가 아니라 감독 본인의 기억이 담긴 곳이라는 걸 떠올리며 한 번 더 눈길이 갈 것 같다."
    ],
    hookReveals:[
      { label:"게임장 섬 → 지도에 없는 가상의 이름, 실제는 인천 인근 섬", label_en:"The game venue island → a name that doesn't exist on any map; actually filmed near Incheon", locId:"seongapdo" },
      { label:"기훈의 동네 → 감독 본인이 실제로 살았던 쌍문동", label_en:"Gi-hun's neighborhood → Ssangmun-dong, where the director himself once lived", locId:"ssangmundong" },
      { label:"게임 세트 → 대전 스튜디오에서 실제로 지어짐", label_en:"The game sets → actually built at a studio in Daejeon", locId:"daejeonstudio" },
      { label:"결말부 공항 장면 → 진짜 인천공항", label_en:"The final airport scene → the real Incheon International Airport", locId:"incheonairport" }
    ],
    hookBadge_en:"Netflix · Squid Game · Is that island even on a map?",
    hookTagline_en:"Everything outside the game was real Seoul",
    discoveryHook_en:[
      "I started watching Squid Game just for the novelty of adults playing childhood games as a life-or-death survival competition.",
      "A few episodes in, though, it's clear the show is after something far heavier than game-show thrills. The premise that most contestants were already pushed to the edge by debt, failure, and exclusion lands scarier than the games themselves.",
      "I got curious about which island the game venue is actually on, but it's not on any map. It's a name that only exists within the show — filming actually happened on islands near Incheon, not Jeju.",
      "What's more unsettling, honestly, are the scenes outside the game. Gi-hun's neighborhood, Ssangmun-dong, isn't a set — it's a real Seoul neighborhood in Dobong-gu, and reportedly reflects director Hwang Dong-hyuk's own experience of actually living there.",
      "The biggest shock after finishing Season 1 was old man Oh Il-nam. Player 001, the frailest and most innocent-seeming contestant, turns out to be the actual creator of the entire game. Finding out that a man who'd grown so rich he'd gotten bored designed all of this just to feel something by gambling with other people's lives genuinely gave me chills.",
      "The Front Man's identity hits the same way. The masked figure running the games turns out to be Hwang In-ho — the very brother that Detective Hwang Jun-ho had been desperately searching for. The moment that's revealed, it's clear this was never just a survival thriller.",
      "The games themselves are unsettling enough, but I also learned that those elaborate sets were entirely built at a studio in Daejeon.",
      "Yeouido, meanwhile, was deliberately used as an urban contrast to the world inside the game — placing the extreme and the everyday side by side on purpose.",
      "As the story continues into Seasons 2 and 3, Gi-hun gives up his winnings and jumps back into the game to try to fight it from the inside. The choice to go back in after already getting out shows this was always a story about what you survive for, not just whether you survive.",
      "By the end of Season 3, Gi-hun doesn't make it out. He sacrifices himself to protect another contestant's baby — and fans still argue endlessly about whether the story had to end that way.",
      "What really gave me chills, though, was the scene after the credits. A stranger playing ddakji on an LA street corner, quietly inviting someone into a game, hints that this whole system might be about to spread from Korea out into the rest of the world.",
      "The airport in the final act isn't a set either — it's the real Incheon International Airport.",
      "For a story built around extreme survival, the backdrop stayed rigorously, recognizably Seoul — which is exactly why this one holds up on a rewatch.",
      "I've never been to Ssangmun-dong, but if I ever walk through that neighborhood, I'll probably look twice, knowing it isn't just an ordinary street — it's a place carrying the director's own memories."
    ],
    hookBadge_ja:"Netflix · イカゲーム · あの島、地図にある?",
    hookTagline_ja:"ゲーム場の外は全部本物のソウルだった",
    discoveryHook_ja:[
      "『イカゲーム』を見始めたのは、大人たちが子どもの頃の遊びで生死を賭けたサバイバルをするという設定そのものが面白そうだったからだ。",
      "でも数話見ただけで、この作品がゲームのスリルよりずっと重いものを描いていると分かってくる。参加者のほとんどが借金や失敗、疎外によってすでに崖っぷちに追い込まれていたという前提のほうが、ゲームそのものより恐ろしい。",
      "あのゲーム場がある島はどこなのか気になって調べてみたけれど、地図には存在しない。劇中だけの設定で、実際には済州島ではなく仁川近郊の島々で分けて撮影されたという。",
      "むしろぞっとするのは、ゲーム場の外のシーンだ。ギフンが暮らす町、双門洞(サンムンドン)はセットではなく実在するソウル道峰区の町で、しかもファン・ドンヒョク監督自身がそこで暮らした経験が反映されているという。",
      "シーズン1を見終わって一番衝撃だったのはオ・イルナム老人だ。参加番号001、一番弱々しく純朴に見えたあの老人が、実はこのゲーム全体を作り出した創始者だったという反転。あまりに金持ちすぎて退屈になった人物が、人々の命を賭けて楽しみを得るためにこの全てを設計したと知った瞬間は、本当にぞっとした。",
      "フロントマンの正体も同じくらい衝撃的だ。ゲームを運営していたあの仮面の人物が、実は刑事ファン・ジュノがずっと探し続けていた行方不明の兄、ファン・イノだったと明かされる瞬間、この作品がただのサバイバルスリラーではないと改めて感じた。",
      "ゲームそのものも不気味だけれど、あの精巧なセットが実際には大田(テジョン)のあるスタジオにまるごと建てられていたことも知った。",
      "逆に汝矣島(ヨイド)は、ゲーム場の中の世界と対比させるために、あえて都会的な風景として登場させたという。極端な世界と日常を並べて見せようとしたわけだ。",
      "シーズン2、3へと続く中で、ギフンは賞金を放棄してまた自らゲームの中へ飛び込み、内側から抵抗を試みる。一度抜け出した人間がまた戻っていくという選択そのものが、この作品が結局「生き残ること」よりも「何のために生き残るのか」を問う物語だということを示している。",
      "シーズン3の最後、ギフンは結局生き残れない。他の参加者の赤ん坊を守るために自らを犠牲にする選択をするのだが、この結末については今でもファンの間で「本当にこう終わらせる必要があったのか」という声が絶えない。",
      "そして本当にゾッとするのはエンドクレジットの後だ。ロサンゼルスの路地で見知らぬ女性が、紙を地面に叩きつけて裏返す遊び「ッタクジ」をしながら誰かをゲームに誘うシーンが映るのだが、これはこのゲームが韓国を越えて世界中に広がっていく可能性を示唆していると解釈されている。",
      "結末部に出てくる空港もセットではなく、本物の仁川空港だという。",
      "極限のサバイバルを描く物語なのに、背景だけは徹底して私たちの知るソウルだった——それがこの作品を見返したくなる理由だ。",
      "私はまだ双門洞に行ったことはないけれど、いつかあの路地を通ることがあれば、ここがただの普通の町ではなく監督自身の記憶が刻まれた場所だと思い出して、つい二度見してしまいそうだ。"
    ],
    contentSummary:{ sections:[
      { heading:"게임의 시작", bullets:[
        "빚에 몰린 성기훈, 거리에서 만난 낯선 이의 제안으로 게임에 참가하게 됨",
        "무궁화꽃이 피었습니다를 시작으로 참가자들이 게임의 실체를 깨닫게 됨",
        "투표를 통해 게임을 중단할 기회가 주어지지만 대부분 다시 돌아옴"
      ]},
      { heading:"생존의 규칙", bullets:[
        "달고나, 줄다리기 등 여러 게임을 거치며 참가자들 사이 동맹과 배신이 반복됨",
        "황준호가 형의 흔적을 좇아 게임장에 위장 잠입함",
        "게임을 운영하는 프론트맨의 존재와 그 정체가 서서히 드러남"
      ]},
      { heading:"마지막 게임", bullets:[
        "최후까지 남은 참가자들 사이에서 벌어지는 마지막 게임",
        "시즌2·3을 거치며 기훈이 다시 게임에 뛰어들어 저항을 시도함"
      ]}
    ], endingNote:"마지막 게임의 결말과 기훈이 내리는 최종 선택은 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Sunshine_on_Wolmido.jpg", credit:'월미도, 인천(기훈의 어린 시절 기억이 담긴 실제 장소) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Sunshine_on_Wolmido.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Squid_Game" },
  { id:"emilyinparis", title:"에밀리, 파리에 가다 (Emily in Paris)", author:"대런 스타 제작 · Netflix", type:"romance", country:"usa", medium:"tv_drama", genres:["romance","comedy","drama"],
    lang:"en",
    era:"현재", title_en:"Emily in Paris", author_en:"Created by Darren Star · Netflix", era_en:"Present day",
    summary:"시카고의 마케터 에밀리가 파리에서 일하게 되면서 문화 차이, 직장, 우정과 사랑을 경험한다. 이야기가 이어질수록 파리뿐 아니라 프랑스 남부, 로마와 베네치아까지 무대가 넓어진다.",
    longSummary:"에밀리, 파리에 가다를 처음 볼 때는 그냥 가벼운 로맨틱 코미디로 시작했다. 화려한 파리 풍경과 패션을 구경하는 재미로 보게 되는 드라마다.\n\n그런데 회를 거듭할수록, 이 작품이 미국식 직장 문화와 프랑스식 직장 문화의 충돌을 의외로 진지하게 다룬다는 걸 알게 된다. 워라밸을 중시하는 실비와 성과에 집착하는 에밀리 사이의 긴장은, 그저 웃긴 설정이 아니라 실제로 많은 사람들이 공감할 만한 문화 차이를 보여준다.\n\n무엇보다 이 드라마는 여행 콘텐츠로서의 매력이 압도적이다. 극중에 등장한 카페, 레스토랑, 거리 대부분이 실제로 존재하고 방문 가능하다는 점이 이 작품을 몇 번이고 다시 보게 만드는 이유다.",
    pinColor:"#3a7ce0",
    summary_en:"Chicago marketer Emily moves to Paris for work and navigates culture shock, office politics, friendship, and romance. As the story continues, the setting expands beyond Paris to the south of France, Rome, and Venice.",
    longSummary_en:"Going in, this looked like a light romantic comedy — the kind of show you watch for the gorgeous Paris scenery and the fashion.\n\nBut episode by episode, it becomes clear the show takes the clash between American and French office culture more seriously than expected. The tension between Sylvie, who values work-life balance, and Emily, who's obsessed with results, isn't just a joke setup — it captures a cultural gap a lot of people genuinely recognize.\n\nWhat makes this one worth revisiting most, though, is its sheer travel appeal. Almost every café, restaurant, and street featured in the show is real and visitable — which is exactly why it's easy to watch again and again.",
    communityNote:"\"에밀리는 가브리엘과 알피, 마르첼로 중 누구와 이어져야 하는가\"는 시즌마다 팬들 사이에서 뜨겁게 갈리는 주제예요. 가브리엘의 레스토랑으로 등장한 라탱지구의 테라 네라는 실제 이탈리안 식당이고, 에밀리가 지적인 매력의 토마를 만나는 카페 드 플로르는 과거 장폴 사르트르와 시몬 드 보부아르가 즐겨 찾던 실제 문인들의 아지트였다는 점도 팬들 사이 흥미로운 사실로 회자됩니다. 극중 등장한 실제 식당·카페의 방문 후기도 여행 콘텐츠로 꾸준히 인기를 끌고 있습니다.",
    communityNote_en:"\"Should Emily end up with Gabriel, Alfie, or Marcello\" splits fans hotly every season. Terra Nera, the real Italian restaurant in the Latin Quarter that plays Gabriel's place, and Café de Flore, where Emily meets the intellectual Thomas — a real former haunt of Jean-Paul Sartre and Simone de Beauvoir — are favorite trivia points among fans. Real visitor reviews of the cafés and restaurants featured in the show also remain a popular form of travel content.",
    hookBadge:"Netflix · 에밀리, 파리에 가다 · 그 카페들 실제 위치", hookTagline:"극중 카페, 진짜 가서 앉아볼 수 있더라",
    discoveryHook:[
      "에밀리, 파리에 가다를 처음 볼 때는 그냥 가벼운 로맨틱 코미디로 시작했다. 화려한 파리 풍경과 패션을 구경하는 재미로 보게 되는 드라마였다.",
      "그런데 시즌1 마지막화에서 에밀리가 파리 옆집 셰프 가브리엘과 키스하는 장면을 카미유에게 들키는 순간, 이 드라마가 그냥 예쁜 화면으로 끝날 이야기가 아니라는 걸 알았다.",
      "회를 거듭할수록, 워라밸을 중시하는 실비와 성과에 집착하는 에밀리 사이의 긴장이 그냥 웃긴 설정이 아니라 실제로 많은 사람들이 공감할 만한 문화 차이라는 걸 알게 됐다.",
      "그러다 극중 카페며 레스토랑이 진짜 존재하는 곳이라는 걸 알고 나서는 아예 다른 재미로 보게 됐다.",
      "가브리엘의 레스토랑으로 나온 테라 네라, 라탱지구에 실제로 있는 이탈리안 식당이다. 드라마 인기 이후에는 시즌 한정 테마 메뉴까지 냈다고 한다.",
      "더 재밌는 건 카페 드 플로르다. 에밀리가 지적인 매력의 토마를 만나는 장면이 촬영된 곳인데, 실제로 사르트르와 시몬 드 보부아르가 즐겨 찾던 카페였다고 한다. 가벼운 로맨틱 코미디 배경치고는 은근히 급이 다른 이력이다.",
      "시즌이 이어질수록 삼각관계도 점점 복잡해진다. 가브리엘과 카미유 사이에서 흔들리던 에밀리는, 이후 영국인 알피와 새로운 연애를 시작하며 완전히 다른 방향으로 이야기를 끌고 간다.",
      "개인적으로 제일 놀랐던 건 시즌4 후반부다. 에밀리가 실비의 새로운 에이전시에 합류하기로 하면서, 파리에서 쌓아온 관계 중 일부를 스스로 정리하는 선택을 한다. 그동안 계속 갈팡질팡하던 캐릭터가 처음으로 커리어를 위해 확실한 결정을 내리는 순간이었다.",
      "시즌5부터는 무대가 로마와 베네치아까지 넓어졌다. 스페인 광장과 펜디 로마에서 찍힌 패션 장면들도 실제 로마의 대표 명소 그대로다.",
      "그리고 여기서 마르첼로라는 새 인물이 등장하면서, 에밀리는 또 한 번 파리와 이탈리아 중 어디에 마음을 둘지 시험대에 오른다. 시즌마다 삼각관계 상대가 바뀌는데도 이 드라마가 질리지 않는 이유가 있는 셈이다.",
      "에밀리 아파트가 있는 것으로 나온 에스트라파드 광장도 파리 5구에 실제로 있는 작은 광장이다.",
      "\"에밀리는 가브리엘과 알피, 마르첼로 중 누구와 이어져야 하는가\"는 시즌마다 팬들 사이에서 뜨겁게 갈리는 주제라고 하는데, 나도 매 시즌 마음이 바뀌는 걸 보면 이 드라마가 일부러 그렇게 설계한 것 같다.",
      "그러니까 이 드라마는 그냥 보고 감탄만 하고 끝내기 아까운 작품이다. 극중 나온 카페와 레스토랑 대부분이 실제로 존재하고 방문 가능하다는 점이 몇 번이고 다시 보게 만드는 이유다.",
      "나도 파리 가면 카페 드 플로르는 꼭 한번 앉아보고 싶다. 사르트르가 앉았던 그 자리에서, 에밀리처럼 낯선 사람과 대화를 시작해보는 것도 나쁘지 않을 것 같다."
    ],
    hookReveals:[
      { label:"가브리엘 레스토랑 → 라탱지구 실제 이탈리안 식당 테라 네라", label_en:"Gabriel's restaurant → Terra Nera, a real Italian spot in the Latin Quarter", locId:"terranera" },
      { label:"토마와 만난 카페 → 사르트르가 다니던 진짜 카페 드 플로르", label_en:"The café where Emily meets Thomas → Café de Flore, Sartre's real old haunt", locId:"cafedeflore" },
      { label:"시즌5 무대 → 로마·베네치아까지 확장", label_en:"Season 5's setting → expands to Rome and Venice", locId:"venice" },
      { label:"에밀리 아파트 → 파리 5구 에스트라파드 광장", label_en:"Emily's apartment → Place de l'Estrapade, Paris's 5th arrondissement", locId:"placeestrapade" }
    ],
    hookBadge_en:"Netflix · Emily in Paris · Where those cafés actually are",
    hookTagline_en:"Turns out you can actually sit at Emily's café",
    discoveryHook_en:[
      "Going into Emily in Paris, this looked like a light romantic comedy — the kind of show you watch for gorgeous Paris scenery and fashion.",
      "Then, in the Season 1 finale, Camille catches Emily kissing her neighbor Gabriel, the chef next door, and it became clear this wasn't going to stay a purely pretty-pictures show.",
      "Episode by episode, it became obvious the tension between Sylvie, who values work-life balance, and Emily, who's obsessed with results, isn't just a joke setup — it's a cultural gap a lot of people genuinely recognize.",
      "Then I found out the cafés and restaurants featured on the show are real places, and suddenly I was watching it for a completely different reason.",
      "Terra Nera, Gabriel's restaurant, is a real Italian spot in the Latin Quarter. Since the show took off, it's reportedly leaned into the fame with occasional themed menus.",
      "Even better: Café de Flore, where Emily meets the intellectual love interest Thomas, was a real former haunt of Jean-Paul Sartre and Simone de Beauvoir. Quietly a much heavier pedigree than you'd expect from a light rom-com backdrop.",
      "As the seasons go on, the love triangle only gets messier. After wavering between Gabriel and Camille, Emily starts a whole new relationship with the Englishman Alfie, dragging the story in a completely different direction.",
      "Personally, the biggest surprise was the back half of Season 4. When Emily decides to join Sylvie's new agency, she deliberately closes the door on some of the relationships she'd built in Paris. It's the first time this endlessly wavering character makes a firm decision for the sake of her career.",
      "Starting in Season 5, the setting expands to Rome and Venice — and the fashion scenes shot at the Spanish Steps and Fendi Rome are the real, iconic landmarks themselves.",
      "That's also when a new character, Marcello, shows up, putting Emily's loyalties between Paris and Italy to the test all over again. There's clearly a reason this show keeps working even as the third side of the triangle changes every season.",
      "Even Place de l'Estrapade, the square where Emily's apartment is set, is a real small square in Paris's 5th arrondissement.",
      "\"Should Emily end up with Gabriel, Alfie, or Marcello\" reportedly splits fans hotly every season — and given how often my own answer changes season to season, I think the show designed it that way on purpose.",
      "So this show is a shame to just watch and admire from a distance. The fact that almost every café and restaurant featured is real and visitable is exactly why it's so easy to watch again and again.",
      "Whenever I make it to Paris, Café de Flore is going straight on my list. Sitting in the same seat Sartre once sat in and striking up a conversation with a stranger, Emily-style, doesn't sound like a bad way to spend an afternoon."
    ],
    discoveryHook_ja:[
      "『エミリー、パリへ行く』を見始めたときは、ただの軽いロマンティック・コメディだと思っていた。華やかなパリの風景とファッションを眺めるだけでも楽しめるドラマだった。",
      "でもシーズン1の最終話で、エミリーが隣人のシェフ、ガブリエルとキスするところをカミーユに見つかってしまう瞬間、このドラマはただ綺麗な映像で終わる話じゃないと分かった。",
      "話数を重ねるごとに、ワークライフバランスを重視するシルヴィーと成果に執着するエミリーの間の緊張関係が、ただの笑えるネタではなく、多くの人が共感できるリアルな文化の違いだと気づいていく。",
      "そのうち劇中に出てくるカフェやレストランが実際に存在する場所だと知ってからは、まったく別の楽しみ方で見るようになった。",
      "ガブリエルのレストランとして登場するテラ・ネラは、カルチェ・ラタンに実在するイタリアンレストランだ。ドラマの人気を受けて、シーズン限定のテーマメニューまで出したという。",
      "さらに面白いのはカフェ・ド・フロールだ。エミリーが知的な魅力のトマと出会うシーンが撮影された場所だが、実際にサルトルとシモーヌ・ド・ボーヴォワールが通っていたカフェだったという。軽いラブコメの舞台にしては、密かに格が違う経歴だ。",
      "シーズンが進むにつれて三角関係もどんどん複雑になっていく。ガブリエルとカミーユの間で揺れていたエミリーは、その後イギリス人アルフィーと新しい恋を始め、物語をまったく別の方向へと引っ張っていく。",
      "個人的に一番驚いたのはシーズン4の後半だ。エミリーがシルヴィーの新しいエージェンシーに加わることを決めると同時に、パリで築いてきた関係の一部を自ら整理する選択をする。ずっと迷い続けていたキャラクターが、初めてキャリアのために確固たる決断を下す瞬間だった。",
      "シーズン5からは舞台がローマとヴェネツィアにまで広がる。スペイン広場やフェンディ・ローマで撮影されたファッションシーンも、実際のローマを代表する名所そのものだ。",
      "そしてここでマルチェロという新しい人物が登場し、エミリーはパリとイタリアのどちらに心を置くのか、再び試されることになる。三角関係の相手がシーズンごとに変わってもこのドラマに飽きない理由が、ここにある気がする。",
      "エミリーのアパートがあることになっているエストラパード広場も、パリ5区に実在する小さな広場だ。",
      "「エミリーはガブリエル、アルフィー、マルチェロの誰と結ばれるべきか」は、シーズンごとにファンの間で熱く意見が分かれるテーマだというが、私自身シーズンごとに気持ちが変わるのを見ると、このドラマはわざとそう作られている気がする。",
      "だからこのドラマは、ただ眺めて感心するだけで終わらせるにはもったいない作品だ。劇中に出てくるカフェやレストランのほとんどが実在し、実際に訪れられるという事実が、何度でも見返したくなる理由になっている。",
      "私もパリに行ったら、カフェ・ド・フロールには絶対に一度座ってみたい。サルトルが座っていたその席で、エミリーのように見知らぬ誰かと会話を始めてみるのも悪くなさそうだ。"
    ],
    title_ja:"エミリー、パリへ行く", summary_ja:"シカゴ出身のマーケター、エミリーがパリで働くことになり、文化の違いや職場、友情と恋愛を経験していく。物語が進むにつれて舞台はパリだけでなく、フランス南部やローマ、ヴェネツィアへと広がっていく。", author_ja:"ダーレン・スター製作 · Netflix", era_ja:"現代",
    contentSummary:{ sections:[
      { heading:"파리 정착기", bullets:[
        "시카고 마케팅 회사에서 파견된 에밀리, 파리의 사보아르에 합류함",
        "상사 실비, 동료 뤽·줄리앙과 문화 차이로 부딪히며 적응해감",
        "이웃 셰프 가브리엘, 절친 민디와 새로운 관계를 맺어감"
      ]},
      { heading:"관계의 확장", bullets:[
        "가브리엘과 카미유를 둘러싼 삼각관계가 시즌 내내 이어짐",
        "영국인 알피와 새로운 연애가 시작됨",
        "사보아르 동료들과 함께 여러 브랜드 캠페인을 성공시킴"
      ]},
      { heading:"로마로 확장", bullets:[
        "시즌5에서 무대가 로마와 베네치아까지 확장됨",
        "마르첼로와의 새로운 만남으로 에밀리의 선택이 다시 시험대에 오름"
      ]}
    ], endingNote:"에밀리가 최종적으로 어떤 사랑과 커리어를 선택하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Eiffel_Wikimedia_Commons_(cropped).jpg", credit:'에펠탑, 파리 · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons_(cropped).jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Emily_in_Paris" },
  { id:"bridgerton", title:"브리저튼 (Bridgerton)", author:"크리스 반 두센 제작 · Netflix (숀다 라임스 프로덕션)", type:"romance", country:"usa", medium:"tv_drama", genres:["romance","historical","drama"],
    lang:"en",
    era:"섭정시대(가상 배경)", title_en:"Bridgerton", author_en:"Created by Chris Van Dusen · Netflix (Shondaland)", era_en:"The Regency era (fictionalized)",
    summary:"런던 사교계에 데뷔한 브리저튼 가문의 형제자매들이 사랑과 결혼, 가족의 기대 사이에서 자신의 선택을 찾아간다. 레이디 휘슬다운의 소문지가 모든 관계를 흔든다.",
    longSummary:"브리저튼을 처음 볼 때는 그냥 화려한 시대극 로맨스겠거니 생각했다. 파스텔톤 드레스와 무도회 장면들이 눈을 사로잡는 건 사실이다.\n\n그런데 이 시리즈의 진짜 재미는 매 시즌 다른 형제자매를 주인공으로 내세운다는 점이다. 다프네의 계약 연애, 앤서니와 케이트의 애증, 페넬로페의 오랜 짝사랑 — 같은 가족 안에서도 전혀 다른 결의 사랑 이야기가 펼쳐진다.\n\n무엇보다 클래식 팝송을 현악 편곡으로 바꾼 삽입곡들이 이 드라마만의 색깔을 만든다. 테일러 스위프트나 아리아나 그란데의 곡이 오케스트라 버전으로 흐르는 순간, 시대극과 현대 팝이 묘하게 어우러진다.",
    pinColor:"#c9a227",
    summary_en:"The Bridgerton siblings, freshly debuted into London society, search for their own paths through love, marriage, and family expectations. Lady Whistledown's scandal sheet shakes up every relationship in sight.",
    longSummary_en:"Going in, I assumed this was just a lavish period romance — and yes, the pastel gowns and ballroom scenes are eye candy.\n\nBut the real fun of the series is that a different sibling takes the lead every season. Daphne's marriage of convenience, Anthony and Kate's love-hate dynamic, Penelope's long-held crush — completely different flavors of romance play out within the same family.\n\nWhat gives the show its signature flavor, though, is the string-quartet covers of classic pop songs. Hearing a Taylor Swift or Ariana Grande track drift by in orchestral form makes for a strange, delightful mix of period drama and modern pop.",
    communityNote:"원작은 줄리아 퀸의 베스트셀러 소설 시리즈로, 숀다 라임스의 숀다랜드가 제작을 맡았어요. 극중 내레이터 '레이디 휘슬다운'의 목소리는 놀랍게도 배우 줄리 앤드루스가 맡아, 가십걸 같은 정체불명의 내레이션에 관록 있는 무게감을 더합니다. 시즌1~2에서 런던을 대신한 곳은 바스였는데, 시즌3 촬영을 위해 제작진이 다시 로열 크레센트로 돌아왔어요. \"가장 인기 있는 시즌 커플은 누구인가\"는 매 시즌 공개 직후 SNS를 뜨겁게 달구는 주제이고, 원작 소설과 드라마에서 서로 다르게 그려지는 관계들도 팬들 사이 단골 비교 대상입니다.",
    communityNote_en:"The show is based on Julia Quinn's bestselling novel series, produced by Shonda Rhimes's Shondaland. The anonymous Gossip-Girl-style narrator, Lady Whistledown, is voiced — surprisingly — by Dame Julie Andrews, lending seasoned gravitas to the mystery narration. Bath stood in for London in Seasons 1–2, and the crew returned to Royal Crescent for Season 3. \"Who's the most popular couple this season\" heats up social media right after every release, and relationships portrayed differently in the novels versus the show are also a frequent point of fan comparison.",
    hookBadge:"Netflix · 브리저튼 · 이웃집처럼 나온 두 저택의 진실", hookTagline:"브리저튼 저택과 페더링턴 저택, 사실 다른 도시더라",
    discoveryHook:[
      "브리저튼을 처음 볼 때는 그냥 화려한 시대극 로맨스겠거니 하고 가볍게 시작했다. 파스텔톤 드레스와 무도회 장면들이 눈을 사로잡는 건 사실이다.",
      "그런데 시즌1 내내 궁금했던 게 하나 있었다. 익명으로 사교계 스캔들을 폭로하는 '레이디 휘슬다운'이라는 소문지 작가, 대체 누구일까 하는 것.",
      "사실 이건 처음부터 시청자한테만 살짝 알려주는 설정이었다. 늘 무리에서 조용히 관찰만 하던 페넬로페 페더링턴이 사실 그 레이디 휘슬다운이라는 걸, 드라마는 초반부터 은근히 보여준다.",
      "그런데도 극중 인물들은 시즌3이 되어서야 이걸 알게 된다. 콜린이 페넬로페의 정체를 알고 나서 처음엔 분노하다가, 결국 그 정체까지 포함해서 그녀를 사랑하게 되는 과정은 오랜 짝사랑 서사치고 꽤 묵직하다.",
      "그러다 이 화려한 런던 거리가 어디서 찍혔는지 찾아보고 나서 진짜 반전을 하나 더 알게 됐다. 극중 브리저튼가와 페더링턴가 저택은 같은 광장을 마주 보는 이웃집처럼 나오는데, 실제로는 전혀 다른 도시에 있는 건물이다.",
      "브리저튼가 저택은 그리니치의 레인저스 하우스, 페더링턴가 저택은 바스의 로열 크레센트 — 1767년에 지어진 진짜 조지 왕조풍 건축물이다. 제작진이 사자 석상과 장식을 더해 그 가문 특유의 과시적인 느낌을 살렸다고 한다. 이 둘을 CGI로 이어붙여서 런던의 한 광장을 사이에 둔 이웃집처럼 만든 셈이다.",
      "목소리만 나오는 레이디 휘슬다운을 실제로 연기한 사람이 줄리 앤드루스라는 것도 찾아보고 알았다. 얼굴 없는 캐릭터에 관록 있는 무게감을 그대로 데려온 셈이다.",
      "시즌1의 다프네와 사이먼 이야기도 다시 보면 흥미롭다. 가짜 연애 계약으로 시작한 관계가 진짜 사랑으로 바뀌는 과정 자체는 흔한 설정이지만, 그 사이 두 사람이 겪는 갈등이 단순한 오해가 아니라 아이를 낳을 것인가 말 것인가 같은 훨씬 무거운 문제에서 비롯된다는 걸 알면 다르게 보인다.",
      "시즌2의 앤서니와 케이트도 마찬가지다. 의무감으로 신붓감을 찾던 앤서니가, 정작 마음이 가는 사람은 신붓감 후보의 언니였다는 갈등에서 시작해 서서히 사랑으로 바뀌어간다.",
      "시즌1~2에서는 바스 전체가 런던을 대신했는데, 시즌3 촬영을 위해 제작진이 다시 로열 크레센트로 돌아왔다고 한다.",
      "헤이스팅스 공작 저택은 요크셔의 캐슬 하워드였고, 댄버리 저택은 바스의 홀번 박물관이었다는 것도 알고 나니 이 드라마의 런던이 사실 영국 전역을 이어붙인 조합이라는 게 실감났다.",
      "원작은 줄리아 퀸의 베스트셀러 소설 시리즈이고, 숀다 라임스의 숀다랜드가 제작을 맡았다.",
      "그러니까 이 드라마의 화려한 런던은 진짜 런던이 아니라 여러 도시를 이어붙인 합성물이다. 나도 이거 알고 나서부터는 바스 사진만 봐도 자동으로 로열 크레센트부터 찾게 됐다.",
      "언젠가 바스에 가면 로열 크레센트 앞에 서서, 여기가 페더링턴 저택이었다는 걸 떠올리며 사자 석상부터 찾아보고 싶다."
    ],
    hookReveals:[
      { label:"페더링턴 저택 → 바스 로열 크레센트(1767년 건축)", label_en:"Featherington House → Royal Crescent, Bath (built 1767)", locId:"royalcrescent" },
      { label:"브리저튼가 저택 → 그리니치 레인저스 하우스, CGI로 이웃집처럼 합성", label_en:"Bridgerton House → Ranger's House, Greenwich — CGI'd to look like next-door neighbors", locId:"rangershouse" },
      { label:"헤이스팅스 공작 저택 → 요크셔 캐슬 하워드", label_en:"The Duke of Hastings' residence → Castle Howard, Yorkshire", locId:"castlehoward" },
      { label:"댄버리 저택 → 바스 홀번 박물관", label_en:"Lady Danbury's residence → Holburne Museum, Bath", locId:"holburnemuseum" }
    ],
    hookBadge_en:"Netflix · Bridgerton · The truth about those 'neighboring' houses",
    hookTagline_en:"The Bridgerton and Featherington houses aren't even in the same city",
    discoveryHook_en:[
      "Going into Bridgerton, I assumed it was just a lavish period romance — and yes, the pastel gowns and ballroom scenes really are eye candy.",
      "But there was one thing I kept wondering about all through Season 1: who is Lady Whistledown, the anonymous writer exposing every scandal in London society?",
      "It turns out the show tells the audience early, and only the audience. Penelope Featherington, the quiet wallflower always watching from the sidelines, is subtly confirmed as Lady Whistledown almost from the start.",
      "The characters themselves don't find out until Season 3, though. Colin's arc — from fury at discovering the truth, to eventually loving Penelope, secret identity and all — carries real weight for what's otherwise a long-simmering slow burn.",
      "Looking up where those lavish London streets were actually filmed turned up an even bigger twist. Onscreen, the Bridgerton and Featherington houses face each other across the same square like neighbors — but in reality, they're in two completely different cities.",
      "The Bridgerton house is Ranger's House in Greenwich; the Featherington house is Royal Crescent in Bath — a genuine Georgian terrace built in 1767. The production added stone lions and ornamentation to capture the family's ostentatious taste, then CGI'd the two together to look like neighbors sharing a London square.",
      "I also learned that the voice behind faceless Lady Whistledown belongs to none other than Dame Julie Andrews — real gravitas smuggled into a character we never actually see.",
      "Daphne and Simon's Season 1 storyline holds up on a rewatch, too. A marriage of convenience turning into real love is a familiar setup, but it lands differently once you realize their central conflict isn't a simple misunderstanding — it's a much heavier fight over whether to have children.",
      "Season 2's Anthony and Kate follow a similar shape. Anthony, hunting for a bride purely out of duty, finds himself falling for the older sister of his intended match instead — and that conflict slowly turns into genuine love.",
      "Bath stood in for all of London across Seasons 1 and 2, and the crew came back to Royal Crescent specifically to film Season 3.",
      "Learning that the Duke of Hastings' residence is Castle Howard in Yorkshire, and Lady Danbury's house is the Holburne Museum in Bath, really drove home that this show's \"London\" is a composite of locations from across all of England.",
      "The source material is Julia Quinn's bestselling novel series, produced by Shonda Rhimes's Shondaland.",
      "So the show's glamorous London isn't really London at all — it's a composite of several cities stitched together. Ever since I learned this, I can't look at a photo of Bath without my eyes going straight to Royal Crescent.",
      "If I ever make it to Bath, I want to stand in front of Royal Crescent, remember it was once the Featherington house, and go hunting for those stone lions."
    ],
    discoveryHook_ja:[
      "『ブリジャートン家』を見始めたときは、ただ豪華な時代劇ロマンスだろうと軽く見始めた。パステルカラーのドレスと舞踏会のシーンが目を引くのは事実だ。",
      "でもシーズン1の間、ずっと気になっていたことがひとつあった。匿名で社交界のスキャンダルを暴露するゴシップ紙の作者「レディ・ホイッスルダウン」は、一体誰なのかということだ。",
      "実はこれ、最初から視聴者にだけこっそり明かされている設定だった。いつもグループの中で静かに周りを観察しているペネロペ・フェザリントンが、実はそのレディ・ホイッスルダウンだということを、ドラマは序盤からさりげなく見せている。",
      "それなのに劇中の人物たちがこれに気づくのはシーズン3になってからだ。コリンがペネロペの正体を知って最初は怒りを見せながらも、最終的にはその正体も含めて彼女を愛するようになる過程は、長年の片思い物語にしてはなかなか重みがある。",
      "そのうち、この華やかなロンドンの街並みがどこで撮影されたのか調べてみて、もうひとつの本当の反転を知った。劇中でブリジャートン家とフェザリントン家の屋敷は同じ広場を挟んだ隣同士のように登場するが、実際にはまったく別の街にある建物だ。",
      "ブリジャートン家の屋敷はグリニッジのレンジャーズ・ハウス、フェザリントン家の屋敷はバースのロイヤル・クレセント——1767年に建てられた本物のジョージ王朝様式の建築だ。制作陣はライオンの石像や装飾を加えて、あの一族特有の見栄っ張りな雰囲気を演出したという。この二つをCGIで繋ぎ合わせ、ロンドンのひとつの広場を挟んだ隣人同士のように見せていたわけだ。",
      "声だけの登場となるレディ・ホイッスルダウンを実際に演じていたのが、あのジュリー・アンドリュースだったということも調べていて知った。顔のないキャラクターに、そのまま貫禄ある重みを持ち込んだかたちだ。",
      "シーズン1のダフネとサイモンの物語も、見返すと興味深い。偽装結婚から本物の愛に変わっていく過程自体はよくある設定だが、二人の間の対立が単なる誤解ではなく、子どもを持つかどうかというもっと重いテーマに根ざしていると分かると、見え方が変わってくる。",
      "シーズン2のアンソニーとケイトも同じだ。義務感から花嫁探しをしていたアンソニーが、実は心惹かれていたのは候補者本人ではなくその姉だったという葛藤から始まり、少しずつ本物の愛へと変わっていく。",
      "シーズン1〜2ではバース全体がロンドンの代わりを務めていたが、シーズン3の撮影のために制作陣は改めてロイヤル・クレセントに戻ってきたという。",
      "ヘイスティングス公爵の屋敷がヨークシャーのカースル・ハワードで、ダンベリー夫人の屋敷がバースのホルバーン博物館だったと知ってからは、このドラマの「ロンドン」がイギリス全土を繋ぎ合わせた合成物だということを実感した。",
      "原作はジュリア・クインのベストセラー小説シリーズで、ションダ・ライムズのションダランドが制作を手がけている。",
      "つまりこのドラマの華やかなロンドンは、本物のロンドンではなく複数の都市を繋ぎ合わせた合成物だったわけだ。これを知ってからは、バースの写真を見るだけで自然とロイヤル・クレセントを探してしまうようになった。",
      "いつかバースに行ったら、ロイヤル・クレセントの前に立って、ここがフェザリントン家の屋敷だったことを思い出しながら、あのライオンの石像を探してみたい。"
    ],
    title_ja:"ブリジャートン家", summary_ja:"ロンドン社交界にデビューしたブリジャートン家の兄弟姉妹たちが、恋愛や結婚、家族の期待の狭間で自分自身の選択を探していく。匿名のゴシップ紙「レディ・ホイッスルダウン」が、あらゆる人間関係を揺さぶっていく。", author_ja:"クリス・ヴァン・ダスン製作 · Netflix(ションダ・ランズ制作)", era_ja:"リージェンシー時代(架空設定)",
    contentSummary:{ sections:[
      { heading:"시즌1 — 다프네와 사이먼", bullets:[
        "브리저튼가의 장녀 다프네, 사교계 데뷔 시즌을 맞음",
        "헤이스팅스 공작 사이먼과 가짜 연애 계약을 맺음",
        "계약이 진짜 사랑으로 바뀌며 시즌1이 마무리됨"
      ]},
      { heading:"시즌2 — 앤서니와 케이트", bullets:[
        "장남 앤서니, 의무감으로 신붓감을 찾기 시작함",
        "케이트 샤르마와의 갈등이 서서히 사랑으로 바뀜"
      ]},
      { heading:"시즌3 — 페넬로페와 콜린", bullets:[
        "오랜 친구였던 페넬로페와 콜린의 관계가 새로운 국면을 맞음",
        "레이디 휘슬다운의 정체를 둘러싼 갈등이 절정에 이름"
      ]}
    ], endingNote:"각 시즌 커플들이 어떤 결말을 맞이하고, 레이디 휘슬다운의 정체가 어떻게 다뤄지는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Royal.crescent.aerial.bath.arp.jpg", credit:'로열 크레센트, 바스(런던 거리 장면 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Royal.crescent.aerial.bath.arp.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Bridgerton" },
  { id:"lotr", title:"반지의 제왕 (The Lord of the Rings)", author:"J.R.R. 톨킨 원작 · 피터 잭슨 감독", type:"fantasy", country:"uk", medium:"film", genres:["fantasy","adventure","war"],
    lang:"en",
    era:"제3시대", title_en:"The Lord of the Rings", author_en:"Based on the novels by J.R.R. Tolkien · Directed by Peter Jackson", era_en:"The Third Age",
    summary:"작은 호빗 프로도가 세상을 지배할 힘을 가진 절대반지를 파괴하기 위해 동료들과 모르도르로 향한다. 거대한 전쟁 속에서도 우정, 용기, 유혹을 이겨내는 선택이 중심에 있다.",
    longSummary:"반지의 제왕을 처음 볼 때는 그 방대한 세계관에 압도당했던 기억이 난다. 종족, 언어, 수천 년의 역사 — 이걸 다 알아야 하나 싶은 부담감이 있었다.\n\n그런데 결국 이 이야기를 끌고 가는 건 화려한 전투가 아니라, 반지를 짊어진 아주 작은 존재 하나다. 프로도가 힘들어할 때마다 그 곁을 지키는 샘의 헌신은, 서사시적인 스케일 안에서도 가장 인간적인 순간으로 남는다. 영웅은 가장 강한 자가 아니라 가장 끝까지 포기하지 않는 자라는 걸 이 이야기는 계속 보여준다.\n\n무엇보다 뉴질랜드의 실제 자연을 그대로 촬영에 활용했다는 점이 이 작품을 특별하게 만든다. 호비튼의 초록 언덕부터 통가리로의 화산 지형까지, CG가 아닌 진짜 풍경이 중간계를 만들어냈다는 걸 알고 나면 그 스케일이 더 실감나게 다가온다.",
    pinColor:"#946b2d",
    summary_en:"A small hobbit named Frodo sets out with his companions for Mordor to destroy the One Ring, an object of world-ending power. Amid a sprawling war, the story centers on friendship, courage, and resisting temptation.",
    longSummary_en:"I remember feeling overwhelmed by the sheer scale of the world the first time I watched this — races, languages, thousands of years of history. It felt like there was too much to keep track of.\n\nBut what actually carries the story isn't the grand battles — it's one very small being carrying the ring. Sam's devotion, staying by Frodo's side through every low point, remains the most human moment inside an epic-scale story. The trilogy keeps insisting that a hero isn't the strongest person, but the one who refuses to give up till the very end.\n\nWhat makes this one special, though, is that it was filmed on real New Zealand landscapes. From the green hills of Hobbiton to the volcanic terrain of Tongariro, once you realize Middle-earth was built from real scenery rather than CGI, the scale hits that much harder.",
    communityNote:"\"골룸의 결말을 어떻게 볼 것인가\", \"샘이야말로 진짜 영웅인가\"는 팬들 사이에서 오랫동안 이어지는 주제예요. 영화에서 삭제된 톰 봄바딜 에피소드에 대한 아쉬움도 책 팬들 사이에서 꾸준히 언급됩니다. 촬영은 뉴질랜드 남·북섬 전역의 150곳이 넘는 실제 장소에서 1999년 10월부터 2000년 12월까지 진행됐는데, 이는 3부작 전체를 사실상 동시에 찍어낸 전례 없는 규모였어요. 호비튼 세트는 원래 촬영 계약상 철거될 예정이었지만, 2009년 호빗 3부작을 위해 영구 시설로 재건되며 지금의 상설 관광지가 됐습니다.",
    communityNote_en:"\"How should we read Gollum's ending\" and \"is Sam actually the real hero\" are long-running fan topics. Book fans also still frequently bring up the missing Tom Bombadil episode, cut from the films. Principal photography spanned more than 150 real locations across both New Zealand islands from October 1999 to December 2000 — an unprecedented scale, since all three films were essentially shot as one continuous production. The Hobbiton set, originally slated for removal under the filming contract, was rebuilt as a permanent structure for The Hobbit trilogy in 2009 and has been a standing tourist attraction ever since.",
    hookBadge:"반지의 제왕 · 중간계가 된 뉴질랜드 150곳", hookTagline:"호비튼, 원래는 그냥 목장이었다더라",
    discoveryHook:[
      "반지의 제왕을 처음 볼 때는 그 방대한 세계관에 압도당했던 기억이 난다. 종족, 언어, 수천 년의 역사 — 이걸 다 알아야 하나 싶은 부담감이 있었다.",
      "그런데 결국 이 이야기를 끌고 가는 건 화려한 전투가 아니라, 반지를 짊어진 아주 작은 존재 하나였다.",
      "특히 마지막에 운명의 산 앞에서 프로도가 반지를 스스로 없애지 못하고 오히려 손가락에 끼워버리는 장면, 그건 다시 봐도 충격적이다. 그 오랜 여정 끝에 결국 반지의 유혹을 이기지 못한 게 주인공이었다는 거다.",
      "결국 반지가 파괴되는 건 프로도의 의지가 아니라, 골룸이 그 손가락을 물어뜯어 반지를 되찾다가 발을 헛디뎌 용암 속으로 함께 떨어지면서다. 영웅의 결단이 아니라 우연과 탐욕이 세상을 구한 셈인데, 이걸 알고 나면 이 이야기가 훨씬 더 냉정하게 다가온다.",
      "그런데 이 모든 이야기가 뉴질랜드의 실제 자연을 그대로 촬영에 활용했다는 걸 알고 나서, 완전히 다른 시선으로 다시 보게 됐다.",
      "호비튼이 특히 그렇다. 1998년 제작진이 헬리콥터로 로케이션을 찾다가 우연히 발견한 진짜 양·소 목장이었는데, 1편 계약상 촬영 후엔 원래 땅으로 복구하기로 되어 있어서 세트를 한 번 철거했다고 한다.",
      "그런데 2009년 호빗 3부작을 위해 이번엔 아예 영구 시설로 다시 지었고, 지금은 상시 개방된 관광지가 됐다.",
      "모르도르는 통가리로 국립공원의 실제 화산 지형이고, 운명의 산은 지금도 활화산인 나우루호에 산의 외형을 그대로 썼다. 프로도가 반지의 유혹을 이겨내지 못했던 그 장소가 지금도 실제로 연기를 뿜는 산이라는 게 묘하게 소름 돋는다.",
      "촬영 자체도 특이했다. 1999년 10월부터 2000년 12월까지, 3부작 전체를 사실상 동시에 찍어낸 전례 없는 규모였다고 한다.",
      "리븐델 세트는 지금은 철거돼서 없지만, 카이토케 지역공원에 가면 그 자리를 알려주는 표지판이 남아있다고 한다.",
      "이야기 후반, 사우론이 완전히 무너지고 아라곤이 곤도르의 왕위에 오르는 장면도 다시 볼 때마다 뭉클하다. 그저 방랑하던 이가 결국 왕좌를 되찾는 그 여정이, 반지를 짊어졌던 프로도의 여정과 나란히 놓이면서 더 크게 다가온다.",
      "그런데 정작 반지를 없앤 프로도는 끝까지 예전의 자신으로 돌아가지 못한다. 몸과 마음에 남은 상처 때문에 결국 샤이어를 떠나 바다 건너 불멸의 땅으로 향하는 마지막 장면은, 승리 이후에도 완전히 회복되지 못하는 사람이 있다는 걸 보여준다.",
      "그러니까 중간계는 상상 속 어딘가가 아니라, 뉴질랜드 남북섬 곳곳에 이미 흩어져 있던 진짜 풍경이다.",
      "나는 아직 뉴질랜드에 가본 적 없지만, 언젠가 그 150곳을 하나씩 밟아보는 여행을 진지하게 계획해보고 싶다. 특히 호비튼에서 시작해서 나우루호에 화산까지 이어지는 코스로."
    ],
    hookReveals:[
      { label:"호비튼 → 원래 양·소 목장, 2009년 영구 시설로 재건된 실제 관광지", label_en:"Hobbiton → a real sheep-and-beef farm, rebuilt as a permanent attraction in 2009", locId:"hobbiton" },
      { label:"모르도르 → 뉴질랜드 통가리로 국립공원 실제 화산 지형", label_en:"Mordor → the real volcanic terrain of Tongariro National Park, New Zealand", locId:"tongariro" },
      { label:"리븐델 세트 → 지금은 철거, 카이토케 공원에 표지판만 남음", label_en:"The Rivendell set → now removed, only signage remains at Kaitoke Regional Park", locId:"kaitoke" },
      { label:"운명의 산 외형 → 지금도 활동 중인 나우루호에 화산", label_en:"Mount Doom's exterior → Mount Ngauruhoe, an active volcano to this day", locId:"ngauruhoe" }
    ],
    hookBadge_en:"The Lord of the Rings · The 150 real places that became Middle-earth",
    hookTagline_en:"Hobbiton used to be just a sheep farm",
    discoveryHook_en:[
      "Going into The Lord of the Rings, I remember feeling overwhelmed by the sheer scale of the world — races, languages, thousands of years of history. It felt like there was too much to keep track of.",
      "But what actually carries the story isn't the grand battles — it's one very small being carrying the ring.",
      "The moment near the end at Mount Doom, when Frodo can't bring himself to destroy the ring and instead puts it on his own finger, is still shocking on a rewatch. After the whole journey, it's the hero himself who ultimately fails to resist the ring's pull.",
      "In the end, the ring isn't destroyed by Frodo's will at all — it's Gollum, biting off Frodo's finger to reclaim it, who loses his footing and falls into the lava with the ring still in hand. It's not a hero's resolve that saves the world, but accident and greed — and once you notice that, the whole story reads a lot more coldly.",
      "Then I learned this whole saga was filmed on real New Zealand landscapes, and started seeing it completely differently.",
      "Hobbiton especially. In 1998, location scouts flying over by helicopter stumbled onto a real sheep-and-beef farm. Under the original filming contract, the land had to be restored after the first film, so the set was torn down once.",
      "But it was rebuilt as a permanent structure for The Hobbit trilogy in 2009, and it's been a standing tourist attraction ever since.",
      "Mordor is the real volcanic terrain of Tongariro National Park, and Mount Doom's exterior is Mount Ngauruhoe, an active volcano to this day. There's something oddly chilling about the fact that the exact place where Frodo failed to resist the ring is still, right now, a mountain that occasionally smokes.",
      "The production itself was unusual, too — filming ran from October 1999 to December 2000, shooting all three films essentially as one continuous production, an unprecedented scale at the time.",
      "The Rivendell set has since been removed, but if you go to Kaitoke Regional Park, there's still signage marking where it stood.",
      "Later in the story, Sauron's complete defeat and Aragorn's coronation as King of Gondor still hits hard on a rewatch. A wanderer finally reclaiming his throne lands even bigger set right alongside Frodo's own journey carrying the ring.",
      "But Frodo, the one who actually destroyed the ring, never fully returns to who he was. Worn down in body and spirit, he ends up leaving the Shire for the Undying Lands across the sea — a final image showing that not everyone recovers completely, even after victory.",
      "So Middle-earth isn't some imagined elsewhere — it's real scenery that was already scattered across New Zealand's two islands.",
      "I've never been to New Zealand, but I want to seriously plan a trip through those 150 locations someday — starting at Hobbiton and working my way to Mount Ngauruhoe."
    ],
    discoveryHook_ja:[
      "『ロード・オブ・ザ・リング』を初めて見たとき、その壮大な世界観に圧倒された記憶がある。種族、言語、数千年に及ぶ歴史——全部理解しないといけないのかと、ちょっとした重圧すら感じた。",
      "でも結局この物語を引っ張っていくのは、華やかな戦闘シーンではなく、指輪を背負ったひとりのとても小さな存在だった。",
      "特に終盤、滅びの山を前にしてフロドが自らの意志で指輪を破壊できず、逆に自分の指にはめてしまうシーン。あれは見返すたびに衝撃を受ける。あの長い旅路の果てに、指輪の誘惑に打ち勝てなかったのが他でもない主人公だったということだ。",
      "結局指輪が破壊されるのは、フロドの意志によってではない。ゴラムがその指を噛みちぎって指輪を取り戻そうとした際、足を踏み外して溶岩の中へ指輪ごと落ちていくことによってだ。英雄の決断ではなく、偶然と欲望が世界を救ったわけで、これを知ると物語がずっと冷ややかに見えてくる。",
      "そんなこの物語全体が、ニュージーランドの実際の自然をそのまま撮影に使っていたと知ってから、まったく違う目で見返すようになった。",
      "特にホビット村がそうだ。1998年、制作陣がヘリコプターでロケ地を探していて偶然見つけた、本物の羊と牛の牧場だったという。1作目の契約上、撮影後には元の土地に戻すことになっていたため、セットは一度取り壊された。",
      "ところが2009年、『ホビット』三部作のために今度は完全に恒久的な施設として建て直され、今では常時公開されている観光地になっている。",
      "モルドールはトンガリロ国立公園の実際の火山地帯で、滅びの山の外観には今も活火山であるナウルホエ山がそのまま使われている。フロドが指輪の誘惑に打ち勝てなかったあの場所が、今もなお実際に噴煙を上げる山だというのは、妙にゾクゾクする。",
      "撮影そのものも特殊だった。1999年10月から2000年12月まで、三部作全体を事実上同時に撮り上げるという、前例のない規模だったという。",
      "リヴェンデルのセットは今では撤去されて残っていないが、カイトケ地域公園に行くと、その場所を示す標識だけが残っているらしい。",
      "物語終盤、サウロンが完全に打ち倒され、アラゴルンがゴンドールの王位に就くシーンも、見返すたびに胸が熱くなる。ただの放浪者だった人物が最終的に玉座を取り戻すその旅路が、指輪を背負い続けたフロドの旅と並べて描かれることで、より大きな意味を持ってくる。",
      "しかし肝心の、指輪を破壊したフロド自身は、最後まで元の自分には戻れない。心と体に残った傷のせいで、結局シャイアを去り、海の向こうにある不死の国へと旅立つラストシーンは、勝利の後でも完全には癒えない人がいるということを見せてくれる。",
      "つまり中つ国は空想の中だけの場所ではなく、ニュージーランドの南北両島のあちこちにすでに散らばっていた、本物の風景だったわけだ。",
      "私はまだニュージーランドに行ったことはないけれど、いつかあの150か所をひとつずつ巡る旅を、本気で計画してみたい。特にホビット村から始めて、ナウルホエ山まで辿り着くコースで。"
    ],
    title_ja:"ロード・オブ・ザ・リング", summary_ja:"小さなホビット、フロドが世界を支配する力を持つ「一つの指輪」を破壊するため、仲間たちとモルドールを目指す。壮大な戦争の中でも、友情や勇気、誘惑に打ち勝つための選択が物語の中心にある。", author_ja:"J・R・R・トールキン原作 · ピーター・ジャクソン監督", era_ja:"第三紀",
    contentSummary:{ sections:[
      { heading:"원정대의 결성", bullets:[
        "프로도, 삼촌 빌보로부터 절대반지를 물려받음",
        "간달프의 안내로 리븐델에 모인 대표들이 원정대를 결성함",
        "모리아 광산을 지나며 원정대가 큰 위기를 겪음"
      ]},
      { heading:"분열과 확장", bullets:[
        "원정대가 나뉘어 각자의 여정을 이어감",
        "로한과 곤도르가 전쟁에 휘말리며 세계관이 확장됨",
        "프로도와 샘은 골룸의 안내로 모르도르에 다가감"
      ]},
      { heading:"최종 전쟁", bullets:[
        "펠렌노르 평원에서 대규모 전투가 벌어짐",
        "반지의 운명을 건 마지막 선택이 운명의 산에서 벌어짐"
      ]}
    ], endingNote:"절대반지가 최종적으로 어떻게 파괴되고, 각 인물이 어떤 결말을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Hobbiton,_New_Zealand.jpg", credit:'호비튼, 뉴질랜드(샤이어의 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Hobbiton,_New_Zealand.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/The_Lord_of_the_Rings_(film_series)" },
  { id:"moneyheist", title:"종이의 집 (La Casa de Papel / Money Heist)", author:"알렉스 피나 제작 · Netflix", type:"crime", country:"spain", medium:"tv_drama", genres:["crime","thriller","drama"],
    lang:"en",
    era:"현재", title_en:"La Casa de Papel / Money Heist", author_en:"Created by Álex Pina · Netflix", era_en:"Present day",
    summary:"교수라 불리는 설계자가 도시 이름을 가진 팀원들을 모아 스페인 조폐국과 중앙은행을 목표로 거대한 강도 작전을 벌인다. 총격보다 중요한 것은 시간, 여론, 신뢰와 내부 갈등이다.",
    longSummary:"종이의 집을 처음 볼 때는 그냥 화려한 케이퍼물이겠거니 생각했다. 그런데 이 작품이 진짜 흥미로운 건, '완벽한 계획'이라는 것도 결국 사람이 실행한다는 걸 계속 보여준다는 점이다.\n\n도시 이름으로 불리는 팀원들은 각자 개인사와 감정을 지닌 인간들이다. 계획에 없던 사랑이 생기고, 예상 못한 배신이 벌어지고, 그때마다 교수의 완벽한 설계는 흔들린다. 그 균열들이 오히려 이 작품을 더 인간적으로 만든다.\n\n무엇보다 벨라 차오라는 저항가요가 이 작품을 통해 전 세계적인 상징이 됐다는 점이 흥미롭다. 스페인어를 몰라도 이 노래의 멜로디만큼은 전 세계 누구나 알아듣는 시대가 됐다.",
    pinColor:"#a02020",
    summary_en:"A mastermind known as The Professor recruits a team named after world cities for an audacious heist on Spain's Royal Mint and central bank. What matters more than gunfire is time, public opinion, trust, and internal conflict.",
    longSummary_en:"Going in, I assumed this was just a flashy heist thriller. What actually makes it compelling is how consistently it shows that even a 'perfect plan' is ultimately carried out by people.\n\nThe team, known only by city names, are people with their own histories and emotions. Unplanned love appears, unexpected betrayal happens, and each time, The Professor's perfect design wavers. Those cracks are what make the show feel human.\n\nWhat's most striking, though, is how the resistance anthem \"Bella Ciao\" became a genuine global symbol through this show. It's become a melody people everywhere recognize, whether or not they speak a word of Spanish.",
    communityNote:"\"가장 유능한 팀원은 누구인가\", \"베를린의 매력을 어떻게 받아들여야 하는가\"는 팬들 사이에서 오래 이어지는 논쟁이에요. Bella Ciao의 의미와 상징성에 대한 해석도 SNS에서 꾸준히 재조명됩니다. 팀원들의 상징인 빨간 점프수트와 스페인 초현실주의 화가 살바도르 달리의 얼굴을 본뜬 가면도 극의 정체성을 만든 결정적 요소로 꼽혀요. 실제 조폐국은 보안 시설이라 촬영이 불가능해, 통행이 통제된 CSIC(스페인 국립연구위원회) 건물을 외관으로 대신 사용했다는 점도 팬들 사이 흥미로운 뒷이야기입니다.",
    communityNote_en:"\"Who's the most capable team member\" and \"how should we feel about Berlín's charisma\" are long-running fan debates. The meaning and symbolism of Bella Ciao also keeps getting rediscovered on social media. The team's signature red jumpsuits and Salvador Dalí masks — modeled on the Spanish surrealist painter's face — are credited as much as anything for the show's visual identity. It's also a favorite piece of trivia that the real Royal Mint, a secure production facility, couldn't be filmed at all — so the traffic-free CSIC (Spanish National Research Council) building stood in for its exterior instead.",
    hookBadge:"Netflix · 하이스트 스릴러 · 실제 촬영지 & 숨은 이야기", hookTagline:"그 조폐국, 사실 조폐국이 아니었다",
    discoveryHook:[
      "《종이의 집》 정주행 끝내고 나면 이상하게 마드리드 지도를 켜보게 된다.",
      "교수와 팀원들이 뚫었던 그 조폐국, 진짜 가볼 수 있는 건가 싶어서 찾아봤다.",
      "근데 알고 보니 그 건물, 진짜 조폐국이 아니었다. 스페인 왕립 조폐국은 살라망카 지구의 좁고 차 많은 골목에 있어서 애초에 액션 장면을 찍을 수가 없는 곳이고, 지폐·주화를 실제로 찍어내는 보안 시설이라 내부 촬영도 허가가 안 났다.",
      "그래서 제작진이 대신 쓴 게 차량 통행이 통제된 CSIC(국립연구위원회) 건물이다. 몇 시즌 내내 봤던 그 웅장한 조폐국 외관, 사실 전혀 다른 기관 건물이었던 거다.",
      "반면 비행선이 지폐를 뿌리던 그 명장면, 마드리드 한복판 칼라오 광장은 진짜다. 실제로 군중과 시위 장면도 이 광장에서 찍었다고 한다.",
      "팀원들 이름이 전부 도시 이름인 것도 처음엔 그냥 콘셉트인 줄 알았는데, 알고 보니 진짜 이유가 있었다. 교수가 팀원들이 서로의 진짜 이름과 사연을 몰라야 계획이 완벽하게 지켜진다고 설계한 거다. 근데 이 완벽한 설계가 무너지는 게 바로 이 드라마의 핵심이다.",
      "도쿄, 리오, 나이로비… 이 사람들, 처음엔 그냥 '교수의 도구'였는데 몇 화만 지나면 각자 사연 있는 인간으로 보이기 시작한다. 그리고 그 사연들이 꼭 계획에 없던 방식으로 터진다 — 사랑이 생기고, 배신이 생기고, 교수도 예상 못 한 방향으로 팀이 흔들린다.",
      "특히 라켈. 조폐국 사건을 수사하던 경찰이 결국 교수 쪽으로 넘어가는 그 전개, 처음 봤을 땐 좀 뻔뻔하다 싶었는데 다시 보면 이게 이 작품이 하고 싶었던 말이라는 걸 알게 된다 — 완벽한 계획도 결국 사람의 마음을 이기지는 못한다는 것.",
      "조폐국 작전이 끝나고 팀이 뿔뿔이 흩어졌다가 다시 모이는 그 텀도, 그냥 시즌 나누기용이 아니라 이들이 '팀'에서 '가족'으로 바뀌는 과정처럼 느껴진다.",
      "그리고 팔레르모가 지휘봉을 잡고 시작하는 중앙은행 작전. 이번엔 금을 녹여서 빼돌리는 그 살벌한 그림 자체보다, 여론전이 훨씬 치열해진다는 게 흥미로웠다. 이 드라마는 갈수록 '이 강도들을 응원해도 되나'라는 질문을 시청자한테 던진다.",
      "그리고 팀원들 상징인 빨간 점프수트와 가면. 그 가면 얼굴, 그냥 아무 얼굴이 아니라 스페인 초현실주의 화가 살바도르 달리의 얼굴을 본뜬 거였다는 걸 알고 나니 왜 이 작품이 그렇게 스페인스러운지 이해가 됐다.",
      "Bella Ciao도 원래는 이탈리아 저항가요인데, 이 작품 덕분에 스페인어 몰라도 멜로디만으로 전 세계가 따라 부르는 노래가 됐다. 이 노래가 흘러나오는 순간마다 팀이 뭔가를 걸고 있다는 뜻이라는 걸 알면 그 장면들이 다르게 들린다.",
      "후반부 나오는 파나마·태국 도피처는 반대로 진짜 촬영지가 아니라 설정상 나온 곳이라고 한다. 실제로 존재하는 나라들이지만, 이 작품이 거기서 찍은 건 아니라는 뜻.",
      "이 팀이 결국 어떤 대가를 치르고 이야기를 끝내는지는 여기서 다 말하지 않으려 한다. 근데 확실한 건, 마지막까지 보고 나면 '완벽한 강도'라는 말 자체가 얼마나 모순적인지 알게 된다는 거다.",
      "마드리드 가면 그란 비아나 칼라오 광장은 그냥 지나치기 쉬운 관광지인데, '여기가 그 지폐 뿌리던 장면이었지' 하고 한 번 더 보면 꽤 다르게 보인다."
    ],
    hookReveals:[
      { label:"진짜 조폐국 → 못 찍어서 CSIC 건물로 대체", label_en:"The real Mint → couldn't film there, used CSIC instead", locId:"csicmadrid" },
      { label:"지폐 살포 장면 → 칼라오 광장, 진짜 촬영", label_en:"The money-drop scene → really filmed at Plaza del Callao", locId:"plazacallao" },
      { label:"파나마·태국 도피처 → 실제 촬영 아닌 설정", label_en:"Panama & Thailand hideouts → story setting, not filmed there", locId:"panamathailand" },
      { label:"가면 얼굴 → 살바도르 달리 본뜬 것", label_en:"The mask's face → modeled on Salvador Dalí", locId:null }
    ],
    hookBadge_en:"Netflix · Heist Thriller · Filming Locations & Behind-the-Scenes",
    hookTagline_en:"That Mint wasn't actually a mint",
    discoveryHook_en:[
      "Finish binging Money Heist and, weirdly, you find yourself pulling up a map of Madrid.",
      "I wanted to know if you could actually visit the Mint The Professor's crew broke into, so I looked it up.",
      "Turns out that building isn't the real Mint at all. Spain's actual Royal Mint sits on a narrow, traffic-clogged street in the Salamanca district — no room for action scenes to begin with — and since it's a working facility that prints real currency, filming inside was never going to be approved either.",
      "So the crew used the CSIC (National Research Council) building instead, in a traffic-free zone. That grand mint exterior you watched for seasons? A completely different institution's building.",
      "The zeppelin scene where cash rains over the city, though, is the real deal. Plaza del Callao, right in central Madrid, is where the crowd and protest scenes were actually filmed too.",
      "At first I assumed the team's city-name aliases were just a stylistic gimmick, but there's an actual reason. The Professor designed it that way so the team wouldn't know each other's real names or histories — because that's what keeps the plan airtight. And the slow unraveling of that airtight design is the whole point of the show.",
      "Tokyo, Rio, Nairobi — at first they're just 'the Professor's tools,' but a few episodes in they start looking like people with their own histories. And those histories keep erupting in ways the plan never accounted for: love that wasn't supposed to happen, betrayals nobody scripted, the team drifting somewhere even the Professor didn't foresee.",
      "Raquel especially. The cop investigating the Mint heist eventually crossing over to the Professor's side felt almost too bold the first time I watched it — but on a rewatch, that's exactly the point the show is making: even a perfect plan can't out-argue a human heart.",
      "The stretch after the Mint job, where the team scatters and slowly regroups, doesn't feel like a season-break device so much as the moment this group stops being a 'team' and starts being something closer to family.",
      "Then Palermo takes command for the Central Bank job. What's more gripping than the sheer audacity of melting down and smuggling out gold bars is how much fiercer the battle for public opinion gets. As the show goes on, it keeps asking the audience the same uncomfortable question: is it actually okay to be rooting for these robbers?",
      "And the team's signature look — the red jumpsuits and masks. Once I found out that face on the mask is modeled on Spanish surrealist painter Salvador Dalí, it clicked why this show feels so distinctly Spanish down to its bones.",
      "Bella Ciao started life as an Italian resistance song, but thanks to this show it's become something people everywhere hum along to, whether or not they speak a word of Spanish. Once you know that every time it plays, the team is putting something on the line, those scenes hit differently.",
      "The Panama and Thailand hideouts later in the show go the other way, though — those aren't real filming locations, just story settings. Real countries, sure, but the crew never actually shot there.",
      "I won't spell out exactly what price this team ends up paying by the finale. But one thing's certain: by the time you reach the end, you understand just how contradictory the phrase 'the perfect heist' really is.",
      "If you're in Madrid, it's easy to just walk past Gran Vía or Plaza del Callao — but stopping to think 'wait, this was that scene, cash raining from the sky' makes them look completely different."
    ],
    discoveryHook_ja:[
      "『紙の家』を一気見し終わると、なぜかマドリードの地図を開いてしまう。",
      "教授とチームが突入したあの造幣局、実際に行けるのか気になって調べてみた。",
      "ところが、あの建物は本物の造幣局じゃなかった。スペイン王立造幣局はサラマンカ地区の狭くて車の多い通りにあって、そもそもアクション撮影ができる場所じゃない。しかも実際に紙幣や硬貨を刷っている警備施設だから、内部撮影の許可もそもそも下りなかったそうだ。",
      "だから制作陣が代わりに使ったのが、車両通行が制限されているCSIC(国立研究機構)の建物。何シーズンも見てきたあの威風堂々とした造幣局の外観、実は全く別の機関の建物だったわけだ。",
      "一方、飛行船から紙幣がばら撒かれるあの名場面、マドリード中心部のカリャオ広場は本物。実際に群衆や抗議のシーンもこの広場で撮影されたという。",
      "チームのメンバーが全員都市名で呼ばれているのも、最初はただの演出かと思っていたけど、実はちゃんとした理由があった。お互いの本名や過去を知らないことこそが、教授の完璧な計画を守る条件だったのだ。そしてこの完璧な設計が少しずつ崩れていくことこそ、このドラマの核心なんだと思う。",
      "東京、リオ、ナイロビ……彼らは最初「教授の道具」でしかなかったのに、数話も経てば一人ひとりに事情のある人間として見えてくる。そしてその事情は、必ず計画になかった形で噴き出す ― 予定になかった恋が生まれ、誰も予想しなかった裏切りが起き、教授本人も想定していなかった方向にチームが揺れていく。",
      "特にラケル。造幣局事件を捜査していた警察官が最終的に教授側に寝返るあの展開、最初見たときは正直「そこまでする?」と思ったけど、見返してみるとこれこそがこの作品の言いたかったことだと気づく ― どれだけ完璧な計画でも、人の心には勝てないということ。",
      "造幣局作戦が終わってチームがバラバラになり、また少しずつ集まっていくあの間も、単なるシーズンの区切りというより、この集団が「チーム」から「家族」へと変わっていく過程のように感じられる。",
      "そしてパレルモが指揮を執って始まる中央銀行作戦。金塊を溶かして持ち出すという物騒な絵そのものより、世論戦がどんどん激しくなっていくところが面白かった。このドラマは進むほど「この強盗団を応援していいのか」という問いを視聴者に突きつけてくる。",
      "チームのシンボルである赤いジャンプスーツと仮面。あの仮面の顔、実はただの顔じゃなくスペインのシュルレアリスム画家サルバドール・ダリの顔を模していたと知って、この作品がなぜあんなにもスペインらしいのか腑に落ちた。",
      "ベラ・チャオも元々はイタリアの抵抗歌なのに、この作品のおかげでスペイン語がわからなくてもメロディだけで世界中が口ずさむ曲になった。この曲が流れる瞬間はいつも、チームが何かを賭けているサインだと知ると、あのシーンの聴こえ方が変わってくる。",
      "終盤に出てくるパナマ・タイの逃亡先は逆に、実際の撮影地ではなく設定上の場所らしい。実在する国ではあるけれど、この作品がそこで撮影したわけではないということだ。",
      "このチームが最終的にどんな代償を払って物語を終えるのかは、ここでは全部言わないでおこうと思う。ただ確かなのは、最後まで見終えると「完璧な強盗」という言葉自体がどれほど矛盾しているかがわかるということだ。",
      "マドリードに行くと、グランビアやカリャオ広場はつい通り過ぎてしまいがちな観光地だけど、「ここがあの紙幣が舞ったシーンだったんだ」ともう一度見てみると、印象がかなり違って見えてくる。"
    ],
    title_ja:"紙の家(ラ・カサ・デ・パペル / ペーパー・ハウス)", summary_ja:"「教授」と呼ばれる首謀者が、都市の名前を持つメンバーを集め、スペインの造幣局と中央銀行を狙った壮大な強盗作戦を繰り広げる。銃撃よりも重要なのは、時間、世論、信頼、そして内部の対立だ。", author_ja:"アレックス・ピナ製作・Netflix", era_ja:"現在",
    contentSummary:{ sections:[
      { heading:"조폐국 작전", bullets:[
        "교수가 설계한 계획에 따라 도시 이름의 팀원들이 조폐국에 진입함",
        "인질극과 경찰과의 협상이 팽팽하게 이어짐",
        "내부 갈등 속에서도 팀은 지폐를 인쇄하며 시간을 벌어감"
      ]},
      { heading:"도피와 재결집", bullets:[
        "작전 후 팀이 뿔뿔이 흩어졌다가 다시 모이는 과정을 거침",
        "라켈이 경찰에서 팀의 일원으로 넘어오는 결정적 전환이 벌어짐"
      ]},
      { heading:"중앙은행 작전", bullets:[
        "팔레르모의 지휘 아래 새로운 목표, 스페인 중앙은행 작전이 시작됨",
        "금 용해와 운반을 둘러싼 압박 속에서 여론전이 격화됨"
      ]}
    ], endingNote:"중앙은행 작전이 최종적으로 어떻게 마무리되고, 팀원들이 어떤 운명을 맞이하는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Calle_Gran_Via.001_-_Madrid.JPG", credit:'그란 비아, 마드리드 · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Calle_Gran_Via.001_-_Madrid.JPG" },
    posterPage:"https://en.wikipedia.org/wiki/Money_Heist" },
  { id:"onepiece", title:"원피스 (ONE PIECE)", author:"오다 에이이치로 원작", type:"adventure", country:"japan", medium:"anime_series", genres:["adventure","fantasy","comedy"],
    era:"연재중(1997~)", title_en:"ONE PIECE", author_en:"by Eiichiro Oda", era_en:"Ongoing since 1997",
    summary:"해적왕을 꿈꾸는 루피가 동료를 모아 전설의 보물 원피스를 찾아 항해한다. 섬마다 새로운 문화와 갈등이 나타나고, 동료 각자의 꿈이 하나의 항로로 이어진다.",
    longSummary:"원피스를 처음 볼 때는 그냥 흔한 소년만화 해적 이야기겠거니 생각했다. 그런데 몇 개의 섬만 지나도 알게 된다 — 이 작품은 웃긴 순간과 눈물 나는 순간을 그 어떤 작품보다 극단적으로 오가는 이야기라는 걸.\n\n밀짚모자 해적단 멤버 한 명 한 명에게는 저마다의 절실한 꿈이 있다. 조로의 검객으로서의 맹세, 상디의 올 블루를 향한 열망, 우솝의 용기 — 이 모든 개인적인 서사가 결국 하나의 항해로 모인다는 구조가 20년 넘게 이 작품을 이끌어온 힘이다.\n\n무엇보다 오랜 연재 기간 동안 세계관이 끊임없이 확장돼왔다는 점이 놀랍다. 이스트 블루의 작은 모험으로 시작한 이야기가 이제는 세계 정부와 역사의 진실을 건드리는 거대한 서사가 됐다.",
    pinColor:"#e0a83a",
    summary_en:"Luffy, who dreams of becoming the Pirate King, gathers a crew to search for the legendary treasure One Piece. Each island reveals a new culture and conflict, and every crewmate's personal dream feeds into one shared voyage.",
    longSummary_en:"Going in, I assumed this was just another shonen pirate adventure. A few islands in, though, you realize this story swings between comedy and gut-wrenching emotion more extremely than almost anything else out there.\n\nEvery member of the Straw Hat crew carries their own urgent dream — Zoro's vow as a swordsman, Sanji's longing for the All Blue, Usopp's courage. The way all these personal stories converge into one shared voyage is what's carried this series for more than two decades.\n\nWhat's most remarkable, though, is how the world has kept expanding across such a long run. What started as small adventures in the East Blue has grown into an epic story that now touches the World Government and the deepest truths of its history.",
    communityNote:"\"원피스의 정체는 무엇일까\"는 20년 넘게 이어지는 최대 떡밥이에요. 만화·애니메이션·넷플릭스 실사판 사이의 각색 차이도 팬들 사이 단골 비교 주제입니다. 실사판은 남아프리카공화국 케이프타운의 대형 스튜디오에서 촬영되는데, 오다 에이이치로 본인이 촬영장을 직접 방문해 세트와 소품의 디테일을 검수했다는 사실이 알려지며 원작 팬들의 신뢰를 얻는 데 크게 기여했어요.",
    communityNote_en:"\"What is the One Piece treasure, really?\" remains the biggest running mystery after two decades. Differences in adaptation between the manga, anime, and Netflix live-action series are also a frequent point of fan comparison. The live-action series films at a major studio in Cape Town, South Africa, and it became widely known that Eiichiro Oda himself visited the set to personally approve set and prop details — a fact that did a lot to earn manga fans' trust in the adaptation.",
    hookBadge:"Netflix 실사판 · ONE PIECE · 실제 촬영지 & 숨은 이야기", hookTagline:"이스트 블루, 사실 남아프리카였다",
    discoveryHook:[
      "원피스 실사판 정주행 끝내고 나면 이상하게 케이프타운이 궁금해진다.",
      "루피 일당이 처음 항해를 시작하는 이스트 블루, 대체 어디서 찍은 건가 싶어서 찾아봤다.",
      "답은 남아프리카공화국 케이프타운이었다. 아프리카 대륙 최대 규모급 영화 스튜디오인 케이프타운 필름 스튜디오에 고잉 메리호, 바라티에, 로그타운, 심지어 눈 덮인 드럼 아일랜드까지 전부 실물 크기로 지어졌다고 한다.",
      "더 놀라운 건 원작자 오다 에이이치로가 진짜로 이 촬영장을 직접 방문했다는 사실이다. 세트와 소품 하나하나의 디테일을 본인이 직접 검수했다고 하니, 원작 팬들이 처음부터 이 실사판을 믿고 볼 수 있었던 이유가 있었던 셈이다.",
      "반대로 원피스 세계지도 — 이스트 블루니 그랜드라인이니 하는 그 지도는 당연히 실제 지구 어디에도 없다. 원작·애니메이션·실사판 속에만 존재하는 완전히 가상의 레이어다.",
      "실제로 존재하는 건 오히려 다른 데 있다. 원작자 오다 에이이치로의 고향인 구마모토에는 루피 일당 동상이 서 있는데, 이게 원래 관광용으로 세운 게 아니라 2016년 구마모토 지진 이후 지역 부흥을 위해 만들어진 프로젝트였다는 걸 알고 나면 이 동상들이 좀 다르게 보인다.",
      "그리고 원작을 알고 실사판을 다시 보면, 이건 그냥 액션 어드벤처가 아니라 처음부터 '동료를 모으는 이야기'라는 게 새삼 보인다. 조로의 검객으로서의 맹세, 상디의 올 블루를 향한 열망, 우솝의 용기 — 이 각자의 절실한 꿈이 결국 하나의 항로로 합쳐진다는 구조가 20년 넘게 이 작품을 이끌어온 힘이다.",
      "고무고무 열매를 먹고 샹크스와의 약속을 가슴에 품은 채 항해를 시작한 루피가, 로그타운을 거쳐 그랜드라인으로 넘어가는 그 순간부터 이야기의 스케일이 완전히 달라진다.",
      "초반에 조로·나미·우솝·상디가 한 명씩 합류하며 밀짚모자 해적단이 꾸려지는 과정도, 다시 보면 그냥 동료 모으기가 아니라 각자 자기 인생에서 가장 절박했던 순간에 루피와 마주치는 구조라는 걸 알게 된다.",
      "이후 쵸파·로빈·프랑키·브룩·징베까지 합류하면서, 알라바스타 왕국을 비롯한 섬마다의 사연과 갈등에 휘말리는데, 이 확장이 단순히 캐릭터를 늘리는 게 아니라 세계관 자체를 계속 키워가는 방식이라는 게 흥미롭다.",
      "특히 에이스와 흰수염 해적단을 둘러싼 정상전쟁 — 이스트 블루의 작은 모험으로 시작했던 이야기가 세계 정부와 역사의 진실까지 건드리는 거대한 서사로 완전히 뒤바뀌는 지점이다. 이 전쟁이 루피에게, 그리고 이야기 전체에 어떤 흔적을 남기는지는 직접 보는 게 맞을 것 같다.",
      "그 이후 등장하는 검은수염 같은 새로운 세력과의 대립 구도까지 따라가다 보면, 이 만화가 왜 아직도 완결되지 않은 채 계속 세계를 넓혀가고 있는지 이해가 된다.",
      "시즌3까지 계속 같은 케이프타운 스튜디오에서 촬영 중이라니, 앞으로도 이 도시는 원피스 팬들에게 계속 의미가 커질 것 같다.",
      "그러니까 실사판만 보고 '이거 다 세트장이겠지' 하고 넘기기보다, 케이프타운 테이블마운틴이나 구마모토 동상처럼 진짜로 갈 수 있는 곳도 있다는 걸 알아두면 여행이 더 재밌어진다.",
      "원피스가 진짜로 뭔지, 루피가 정말 해적왕이 되는지는 여기서 말하지 않으련다. 그건 아직도 계속되고 있는 이야기니까, 각자 직접 따라가면서 확인하시길."
    ],
    hookReveals:[
      { label:"이스트 블루 → 실제로는 케이프타운", label_en:"East Blue → actually Cape Town", locId:"southafricaregion" },
      { label:"고잉 메리호 → 실물 크기로 만든 세트", label_en:"The Going Merry → a full-scale real set", locId:"goingmerryset" },
      { label:"구마모토 동상 → 지진 부흥 프로젝트로 세워짐", label_en:"Kumamoto statues → built as an earthquake-recovery project", locId:"kumamotostatues" },
      { label:"원피스 세계지도 → 실제 지구 어디에도 없는 가상 지도", label_en:"The One Piece world map → doesn't exist anywhere on Earth", locId:"animeislandmap" }
    ],
    hookBadge_en:"Netflix Live-Action · ONE PIECE · Filming Locations & Behind-the-Scenes",
    hookTagline_en:"The East Blue was actually South Africa",
    discoveryHook_en:[
      "Finish binging the One Piece live-action and, weirdly, Cape Town starts pulling at you.",
      "I looked up where the Straw Hats' first voyage through the East Blue was actually filmed.",
      "The answer: Cape Town, South Africa. At Cape Town Film Studios — one of the largest film production facilities on the entire African continent — the crew built full-scale sets for the Going Merry, Baratie, Loguetown, and even the snow-covered Drum Island.",
      "What's even more surprising is that creator Eiichiro Oda actually visited the set in person. He reportedly signed off on every detail of the sets and props himself, which explains a lot about why manga fans were willing to trust this adaptation from the start.",
      "The in-universe One Piece world map — East Blue, Grand Line, all of it — obviously doesn't correspond to anywhere on the real globe. It's a purely fictional layer that exists only in the manga, anime, and now the live-action.",
      "What is real, though, shows up somewhere else entirely. In Kumamoto, Oda's hometown, there are statues of the Straw Hat crew, and once you learn they weren't built as a tourist gimmick but as part of an actual earthquake-recovery project after the 2016 Kumamoto earthquake, those statues start to look different.",
      "Rewatching the live-action with the source material in mind, it becomes clear this was never just an action-adventure — from the start, it's a story about gathering a crew. Zoro's vow as a swordsman, Sanji's longing for the All Blue, Usopp's courage — the way all these desperate personal dreams eventually converge into one shared voyage is exactly what's carried this series for more than two decades.",
      "From the moment Luffy eats the Gomu Gomu fruit and sets sail with Shanks's promise held close, through Loguetown and into the Grand Line, the entire scale of the story shifts.",
      "Watching Zoro, Nami, Usopp, and Sanji join one by one to form the Straw Hat crew hits differently on a rewatch too — it's not just 'recruiting,' it's Luffy crossing paths with each of them at the most desperate moment of their own lives.",
      "From there, as Chopper, Robin, Franky, Brook, and Jinbe join and the crew gets pulled into the conflicts of islands like the Alabasta Kingdom, what's interesting is that this isn't just adding characters — it's how the whole world keeps expanding.",
      "Then there's the Summit War around Ace and the Whitebeard Pirates — the exact point where a story that started as small East Blue adventures completely transforms into an epic that touches the World Government and the deepest truths of its history. What that war leaves behind, for Luffy and for the story as a whole, is something you really need to see for yourself.",
      "Follow the new conflicts that come after, like the rise of Blackbeard's crew, and it starts to make sense why this manga is still nowhere near finished — it just keeps expanding its world.",
      "Filming has continued at the same Cape Town studio through Season 3, so it seems like this city is only going to matter more to One Piece fans going forward.",
      "So instead of assuming it's all just a set built somewhere and moving on, it's worth knowing that places like Table Mountain in Cape Town or the statues in Kumamoto are real places you can actually go.",
      "Whether Luffy actually becomes Pirate King, what One Piece even is — I won't spoil that here. It's a story that's still going, so follow it yourself and find out."
    ],
    discoveryHook_ja:[
      "実写版『ONE PIECE』を一気見し終わると、なぜかケープタウンが気になってくる。",
      "ルフィたちが最初の航海を始めるイーストブルー、一体どこで撮影されたのか調べてみた。",
      "答えは南アフリカ共和国のケープタウンだった。アフリカ大陸最大級の映画スタジオ、ケープタウン・フィルム・スタジオに、ゴーイングメリー号、バラティエ、ローグタウン、さらには雪に覆われたドラム島まで、すべて実物大で建てられたという。",
      "さらに驚いたのは、原作者の尾田栄一郎が実際にこの撮影現場を訪れていたということ。セットや小道具の一つひとつを本人が直接チェックしていたというから、原作ファンが最初からこの実写版を信頼できた理由が分かる気がした。",
      "逆に、ONE PIECEの世界地図 ― イーストブルーだのグランドラインだのというあの地図は、当然ながら地球のどこにも存在しない。原作・アニメ・実写版の中にだけ存在する、完全にフィクションの層だ。",
      "実在するものは、むしろ別のところにあった。原作者・尾田栄一郎の故郷である熊本には、ルフィたちの銅像が立っているんだけど、これがもともと観光用に建てられたものではなく、2016年の熊本地震後の地域復興プロジェクトとして作られたものだと知ると、この銅像たちが少し違って見えてくる。",
      "原作を知った上で実写版を見返すと、これは単なるアクションアドベンチャーじゃなく、最初から「仲間を集める物語」だったんだと改めて気づく。ゾロの剣士としての誓い、サンジのオールブルーへの憧れ、ウソップの勇気 ― それぞれの切実な夢が、最終的に一つの航路へとつながっていく構造こそ、この作品が20年以上も走り続けてきた力なんだと思う。",
      "ゴムゴムの実を食べ、シャンクスとの約束を胸にルフィが航海を始め、ローグタウンを経てグランドラインへと踏み出すあの瞬間から、物語のスケールがまるっきり変わってくる。",
      "序盤にゾロ・ナミ・ウソップ・サンジが一人ずつ加わって麦わらの一味が結成される過程も、見返してみるとただの仲間集めではなく、それぞれが自分の人生で一番切実な瞬間にルフィと出会う構造なんだと分かる。",
      "その後チョッパー・ロビン・フランキー・ブルック・ジンベエまで加わりながら、アラバスタ王国をはじめ島ごとの事情や対立に巻き込まれていくんだけど、この広がり方が単にキャラクターを増やすことじゃなく、世界観そのものをどんどん大きくしていくやり方だというのが面白い。",
      "特にエースと白ひげ海賊団をめぐる頂上戦争 ― イーストブルーの小さな冒険として始まった物語が、世界政府や歴史の真実にまで踏み込む壮大な物語へと完全に切り替わる地点だ。この戦争がルフィに、そして物語全体にどんな爪痕を残すのかは、自分の目で確かめてほしい。",
      "その後に出てくる黒ひげのような新勢力との対立まで追っていくと、この漫画がなぜいまだに完結せず世界を広げ続けているのか理解できる。",
      "シーズン3までずっと同じケープタウンのスタジオで撮影が続いているらしいから、この街はこれからもONE PIECEファンにとってどんどん意味を増していきそうだ。",
      "だから実写版を見て「どうせ全部セットでしょ」と片付けるより、ケープタウンのテーブルマウンテンや熊本の銅像みたいに、本当に行ける場所もあると知っておくと旅がもっと面白くなる。",
      "ワンピースの正体が何なのか、ルフィが本当に海賊王になれるのかは、ここでは言わないでおく。まだ続いている物語だから、それぞれ自分の目で追いかけて確かめてほしい。"
    ],
    title_ja:"ONE PIECE(ワンピース)", summary_ja:"海賊王を夢見るルフィが仲間を集め、伝説の秘宝ワンピースを求めて航海する。島ごとに新しい文化や対立が現れ、仲間それぞれの夢が一つの航路へとつながっていく。", author_ja:"尾田栄一郎 原作", era_ja:"連載中(1997年~)",
    contentSummary:{ sections:[
      { heading:"항해의 시작", bullets:[
        "고무고무 열매를 먹은 루피, 샹크스와의 약속을 가슴에 품고 항해를 시작함",
        "조로·나미·우솝·상디가 차례로 합류하며 밀짚모자 해적단이 결성됨",
        "로그타운을 거쳐 그랜드라인으로 진입함"
      ]},
      { heading:"동료와 세계의 확장", bullets:[
        "쵸파·로빈·프랑키·브룩·징베가 차례로 합류하며 선원이 늘어남",
        "알라바스타 왕국 등 각 섬의 사연과 갈등에 휘말리며 세계관이 확장됨"
      ]},
      { heading:"큰 흐름의 전쟁", bullets:[
        "에이스와 흰수염 해적단을 둘러싼 정상전쟁이 벌어짐",
        "검은수염 등 새로운 세력과의 대립 구도가 본격화됨"
      ]}
    ], endingNote:"루피가 최종적으로 원피스를 찾아 해적왕이 되는지, 그 결말은 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Cape_Town_Table_Mountain.jpg", credit:'테이블마운틴, 케이프타운(넷플릭스 실사판 주요 촬영 거점) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Cape_Town_Table_Mountain.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/One_Piece" },
  { id:"jikji", title:"직지: 아모르 마네트", author:"김진명 장편소설", type:"mystery", country:"korea", medium:"novel", genres:["historical","mystery","crime","thriller","adventure"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    era:"현재 + 조선 세종대 + 15세기 유럽", title_en:"Jikji: Amor Manet", author_en:"Novel by Kim Jin-myung", era_en:"Present day + Joseon King Sejong's reign + 15th-century Europe",
    summary:"고려대 라틴어 교수 전형우의 죽음을 취재하던 기자 김기연은, 그가 남긴 단서에서 세계 최초의 금속활자본 『직지』와 구텐베르크, 그리고 바티칸의 오래된 편지를 둘러싼 비밀을 발견한다. 청주 흥덕사에서 시작해 파리·아비뇽·스트라스부르·마인츠·바티칸까지 이어지는 추적극.",
    longSummary:"이 소설이 흥미로운 건, 살인 사건이라는 장르적 장치를 빌려 실제로 존재하는 유물 하나의 역사를 파고든다는 점이다. 직지는 교과서에서 '세계에서 가장 오래된 금속활자본, 구텐베르크보다 78년 빠르다'는 한 줄로 배우고 넘어가기 쉬운데, 이 작품은 그 한 줄 뒤에 숨은 인물들 — 청주 흥덕사의 승려들, 프랑스로 흘러간 유물, 그것을 알아본 박병선 박사 같은 실존 인물들의 존재를 소설적 상상력으로 다시 불러온다.\n\n현재 시점의 살인 사건 수사와, 조선 세종대·15세기 유럽의 시간이 교차하며 진행되는 구조라 속도감이 있다. 특히 청주 흥덕사지와 고인쇄박물관에서 파리 국립도서관, 아비뇽, 스트라스부르, 마인츠까지 이어지는 실제 장소들을 하나씩 따라가다 보면, 직지가 단지 '오래된 책'이 아니라 청주라는 도시 자체의 정체성이라는 걸 새삼 느끼게 된다.",
    pinColor:"#8a5a2b",
    summary_en:"Journalist Kim Ki-yeon, investigating the death of Korea University Latin professor Jeon Hyeong-woo, uncovers a secret connecting the world's first metal-type book Jikji, Gutenberg, and an old Vatican letter. The chase runs from Cheongju's Heungdeoksa temple to Paris, Avignon, Strasbourg, Mainz, and the Vatican.",
    longSummary_en:"What makes this novel interesting is that it borrows the machinery of a murder mystery to dig into the real history of an actual artifact. Jikji tends to get reduced to a single textbook line — \"the world's oldest metal-type book, 78 years before Gutenberg\" — but this story pulls the people behind that line back into view through fiction: the monks of Cheongju's Heungdeoksa temple, the artifact's journey to France, and real figures like Dr. Park Byeong-seon, who first recognized its significance.\n\nThe present-day murder investigation is interwoven with the eras of King Sejong's Joseon and 15th-century Europe, which keeps the pace brisk. Following the real locations one by one — from Cheongju's Heungdeoksa site and printing museum to the National Library of France, Avignon, Strasbourg, and Mainz — you come away feeling that Jikji isn't just \"an old book,\" but the identity of an entire city.",
    communityNote:"직지(直指心體要節)는 1377년 청주 흥덕사에서 백운 스님의 제자들이 간행한 것으로, 구텐베르크의 42행 성서(1452~1455)보다 78년 앞선 세계 최초의 금속활자본이다. 2001년 유네스코 세계기록유산으로 등재됐다. 현재 하권 1책만 전하며 프랑스국립도서관(BnF)에 소장돼 있는데, 1952년 소장자 앙리 베베르의 유언에 따라 기증됐고 1972년 사서 박병선 박사가 그 정체를 밝혀냈다. 소설 속 바티칸 편지와 구텐베르크와의 직접적 연결은 어디까지나 작가의 상상력이며, 실제로 확인된 역사적 사실이 아니라는 점은 구분해서 읽는 게 좋다.",
    communityNote_en:"Jikji (直指心體要節) was printed in 1377 at Cheongju's Heungdeoksa temple by disciples of the monk Baegun — the world's oldest surviving book printed with metal movable type, predating Gutenberg's 42-line Bible (1452–1455) by 78 years. It was registered as a UNESCO Memory of the World in 2001. Only the second volume survives today, held at the Bibliothèque nationale de France; it was donated in 1952 per the will of its owner Henri Vever, and librarian Dr. Park Byeong-seon identified its significance in 1972. Worth noting: the novel's Vatican letter and its direct link to Gutenberg are the author's invention, not a confirmed historical fact.",
    hookBadge:"역사 미스터리 소설 · 직지 · 실제 흔적과 소설적 상상력", hookTagline:"그 편지, 정말 있었을까?",
    discoveryHook:[
      "『직지: 아모르 마네트』를 다 읽고 나면 자연스럽게 궁금해진다. 여기서 진짜와 소설은 정확히 어디서부터 갈라지는 걸까.",
      "직지는 학교 다닐 때 교과서에서 \"세계에서 가장 오래된 금속활자본, 구텐베르크보다 78년 빠르다\"는 한 줄로 배우고 넘어가기 쉬운 이름이다. 그런데 이 소설을 읽고 나서 찾아보니, 그 한 줄 뒤에 훨씬 더 구체적이고 뭉클한 사실들이 있었다.",
      "청주 흥덕사지는 소설이 지어낸 배경이 아니다. 1985년 발굴조사에서 \"흥덕사\"라는 글자가 새겨진 청동 금구가 실제로 출토되면서, 오랫동안 문헌으로만 전해지던 이 절의 위치가 비로소 확인된 곳이다. 소설이 이야기를 굳이 이 절터에서 시작하는 데는 이유가 있었던 셈이다.",
      "직지의 실물은 지금도 존재한다. 다만 한국이 아니라 프랑스국립도서관에 있다. 1952년, 소장자였던 앙리 베베르의 유언에 따라 도서관에 기증됐고, 20년 가까이 그저 오래된 책 중 하나로 서고에 있다가 1972년 사서로 일하던 박병선 박사가 이 책의 정체를 처음으로 밝혀냈다.",
      "이 대목에서 좀 숙연해진다. 세계에서 가장 오래된 금속활자본이 정작 자국에 없다는 것, 그리고 그 존재를 알아본 사람이 타지에서 사서로 일하던 한 한국인 연구자였다는 것. 소설은 이 실제 역사 위에 현재 시점의 살인 사건 수사라는 허구를 얹어놓는다.",
      "소설의 핵심 미스터리인 바티칸의 오래된 편지, 그리고 그 편지와 구텐베르크를 직접 잇는 연결고리는 작가 김진명이 만들어낸 상상력이다. 이건 실제로 확인된 역사적 사실이 아니라는 걸 이 소설도, 이 사이트도 분명히 해두고 싶다.",
      "다만 그 상상력이 완전히 허공에서 나온 건 아니다. 구텐베르크가 42행 성서를 완성한 곳은 고향 마인츠지만, 그 전에 스트라스부르에서 1434년부터 거의 10년 가까이 비밀리에 금속활자 인쇄를 실험했다는 건 실제 역사다. 소설은 이 확인된 행적 위에 은수, 즉 카레나라는 인물의 유럽 서사를 얹어놓는다.",
      "직지와 구텐베르크 사이에 정말 직접적인 전달 관계가 있었는지는 아직 학계에서 확인되지 않았다. 다만 두 인쇄 혁명이 유라시아 대륙 양 끝에서 78년의 시차를 두고 각각 일어났다는 사실 자체는 소설이 아니라 그냥 역사다. 이 거리와 시차를 생각하면, 두 사건이 무관하다는 것도 신기하고 어떤 식으로든 이어져 있었을지 모른다는 상상도 그 나름대로 매력적이다.",
      "소설은 현재의 살인 사건 수사와 세종대 조선, 15세기 유럽의 시간을 교차시키며 진행된다. 전형우 교수의 죽음을 취재하던 기자 김기연이 청주 흥덕사지와 고인쇄박물관에서 연구자 김정진을 만나며 직지의 실체에 다가가는 전반부는, 소설 속 허구지만 앞서 말한 실제 발굴 역사 위에 자연스럽게 포개진다.",
      "이후 김기연이 파리 프랑스국립도서관에서 직지 실물의 행방을 좇고, 은수의 유럽 서사가 아비뇽과 스트라스부르에서 얽혀드는 구간은, 실제 존재하는 장소들을 하나씩 밟아가는 여정이기도 하다.",
      "피셔 교수를 통해 구텐베르크와 마인츠 쪽 단서가 드러나고, 바티칸의 오래된 편지를 둘러싼 비밀이 펨블턴을 통해 조금씩 밝혀지는 과정은 이 소설이 미스터리 장르로서 가장 힘을 쓰는 부분이다. 전형우의 죽음 뒤에 어떤 진실이 있었는지는 여기서 다 밝히지 않으려 한다. 직접 읽어보시길 권한다.",
      "다만 이 소설을 덮고 나서 남는 건 범인이 누구였는가보다, 흥덕사의 이름 없는 승려들이 만들어낸 책 한 권이 어떻게 78년이라는 시차를 넘어 인류의 인쇄 역사와 나란히 놓이게 됐는가 하는 감각이다.",
      "그래서 이 소설을 따라 청주에서 파리, 아비뇽, 스트라스부르, 마인츠까지 걸어본다면, 어디까지가 실제로 확인된 역사이고 어디부터가 소설의 상상력인지 하나씩 구분해가며 걷는 게 이 여행을 더 깊게 만들어줄 것 같다.",
      "특히 청주 흥덕사지에 직접 서보면, 이곳이 그냥 소설의 배경이 아니라 실제로 세계 인쇄 역사가 시작된 자리라는 게 실감 난다. 그 사실 하나만으로도 이 여행은 이미 충분한 의미가 있다."
    ],
    hookReveals:[
      { label:"흥덕사지 위치 → 1985년 발굴로 실제 확인됨", label_en:"Heungdeoksa's location → confirmed by a real 1985 excavation", locId:"heungdeoksaji" },
      { label:"직지 실물 → 프랑스국립도서관, 1972년 박병선 박사가 발견", label_en:"The real Jikji volume → at the BnF, identified by Dr. Park in 1972", locId:"bnfrichelieu" },
      { label:"바티칸 편지·구텐베르크 연결 → 작가의 완전한 창작", label_en:"The Vatican letter & Gutenberg link → entirely the author's invention", locId:"vaticanlibrary" },
      { label:"구텐베르크 초기 실험 → 마인츠 아닌 스트라스부르", label_en:"Gutenberg's early experiments → Strasbourg, not Mainz", locId:"strasbourg" }
    ],
    hookBadge_en:"Historical Mystery Novel · Jikji · Real Traces & Fiction",
    hookTagline_en:"Was that letter ever really there?",
    discoveryHook_en:[
      "Finish reading Jikji: Amor Manet and you naturally start wondering exactly where the real history ends and the novel's imagination begins.",
      "Jikji is the kind of name you learn as a single textbook line back in school — 'the world's oldest metal-type book, 78 years before Gutenberg' — and move on. Reading this novel and then digging into it, though, there turned out to be far more concrete, and honestly moving, facts behind that one line.",
      "Cheongju's Heungdeoksa temple site isn't a setting the novel invented. A 1985 excavation turned up a bronze gong actually inscribed with the temple's name, finally confirming the location of a temple that had, until then, only existed in old records. The novel starting its story here wasn't arbitrary.",
      "The physical Jikji volume still exists today — just not in Korea. It's held at the National Library of France. It was donated there in 1952 per the will of its former owner, Henri Vever, and sat in the stacks as just another old book for nearly two decades until a librarian named Dr. Park Byeong-seon first identified what it actually was, in 1972.",
      "That part of the story sits with you for a moment. The fact that the world's oldest metal-type book isn't even in the country that made it, and that the person who recognized what it was happened to be a Korean researcher working as a librarian far from home. The novel builds a fictional present-day murder investigation on top of this real history.",
      "The novel's central mystery — an old letter from the Vatican, and a direct link tying that letter to Gutenberg — is author Kim Jin-myung's invention. Neither the novel nor this site treats that as confirmed historical fact, and it's worth being clear about that.",
      "That said, the invention isn't pulled entirely out of thin air. Gutenberg completed the 42-line Bible in his hometown of Mainz, but before that, real history shows he spent nearly a decade, starting in 1434, secretly experimenting with movable type in Strasbourg. The novel builds Eun-su — Karena's — European storyline on top of this confirmed record.",
      "Whether there was ever a direct transmission between Jikji and Gutenberg's technology hasn't been confirmed by scholars. But the plain fact that two printing revolutions happened at opposite ends of Eurasia, 78 years apart, isn't fiction — that part is just history. Thinking about that distance and that gap in time, it's strange to imagine they're truly unconnected, and there's a certain pull to imagining they might somehow be linked after all.",
      "The novel moves by interweaving the present-day murder investigation with the eras of King Sejong's Joseon and 15th-century Europe. The early stretch, where journalist Kim Ki-yeon — investigating the death of Professor Jeon Hyeong-woo — meets researcher Kim Jeong-jin at Cheongju's Heungdeoksa site and printing museum and edges closer to the truth about Jikji, is fiction, but it sits naturally on top of the real excavation history described above.",
      "From there, Kim Ki-yeon traces the whereabouts of the real Jikji volume at the National Library of France in Paris, while Eun-su's European storyline gets tangled up in Avignon and Strasbourg — a stretch that also happens to be a journey through real, existing places, one by one.",
      "The section where Professor Fischer surfaces clues connecting Gutenberg and Mainz, and where the secret of the old Vatican letter starts coming to light through a character named Pemberton, is where the novel's mystery-genre machinery works hardest. I won't reveal here exactly what truth lies behind Jeon Hyeong-woo's death — that part is worth reading for yourself.",
      "But what stays with you after closing the book isn't so much who the culprit was, as the sense of how a single book, made by unnamed monks at Heungdeoksa, ended up standing alongside the history of human printing itself, 78 years ahead of its time.",
      "So if you trace this novel's route from Cheongju to Paris, Avignon, Strasbourg, and Mainz, sorting out what's confirmed history and what's the novel's imagination as you go will make the trip feel a lot deeper.",
      "Standing at the Heungdeoksa site in Cheongju in particular, it hits you that this isn't just a novel's backdrop — it's the actual spot where the history of printing, for the whole world, began. That fact alone is enough to make the trip worthwhile."
    ],
    discoveryHook_ja:[
      "『直指:アモール・マネット』を読み終えると、自然と気になってくる。ここから先、本当の歴史と小説はどこで分かれているんだろう、と。",
      "直指は、学校で「世界最古の金属活字本、グーテンベルクより78年早い」という一行だけ習って通り過ぎてしまいがちな名前だ。でもこの小説を読んでから調べてみると、その一行の裏にはもっと具体的で、正直なところ胸に残る事実があった。",
      "清州(チョンジュ)の興徳寺跡は、小説が作り出した舞台ではない。1985年の発掘調査で「興徳寺」という文字が刻まれた青銅の金具が実際に出土し、それまで文献の中だけの存在だったこの寺の位置が初めて確認された場所だ。小説があえてこの寺跡から物語を始めているのには、理由があったわけだ。",
      "直指の実物は今も存在している。ただし韓国ではなく、フランス国立図書館にある。1952年、所蔵者だったアンリ・ヴェヴェールの遺言によって図書館に寄贈され、20年近くただの古書の一冊として書庫に眠っていたが、1972年、司書として働いていたパク・ビョンソン博士がこの本の正体を初めて明らかにした。",
      "このくだりは、どこか静かな気持ちにさせられる。世界最古の金属活字本が、当の自国にはないという事実。そして、その価値に気づいたのが異国の地で司書として働いていた一人の韓国人研究者だったという事実。小説はこの実際の歴史の上に、現代の殺人事件の捜査というフィクションを重ねていく。",
      "小説の核心となる謎 ― バチカンに眠る古い手紙、そしてその手紙とグーテンベルクを直接結びつける関係は、作家キム・ジンミョンが生み出した創作だ。これが実際に確認された歴史的事実ではないということは、小説自身も、このサイトもはっきりさせておきたい。",
      "とはいえ、その創作は完全に何もないところから生まれたわけでもない。グーテンベルクが42行聖書を完成させたのは故郷マインツだが、その前、1434年からほぼ10年近くストラスブールで密かに金属活字の印刷実験を行っていたというのは実際の歴史だ。小説はこの確認された足跡の上に、ウンス、すなわちカレナという人物のヨーロッパでの物語を重ねている。",
      "直指とグーテンベルクの間に本当に直接的な伝達関係があったのかは、学界でもまだ確認されていない。ただ、二つの印刷革命がユーラシア大陸の両端で78年という時間差を置いてそれぞれ起きたという事実そのものは、小説ではなくただの歴史だ。この距離と時間差を思うと、両者が無関係だということ自体も不思議だし、どこかで繋がっていたかもしれないと想像してみたくなる魅力もある。",
      "小説は現代の殺人事件の捜査と、世宗代の朝鮮、15世紀ヨーロッパの時間を交差させながら進んでいく。チョン・ヒョンウ教授の死を取材していた記者キム・ギヨンが、清州の興徳寺跡と古印刷博物館で研究者キム・ジョンジンと出会い、直指の実体に近づいていく前半部分は、フィクションではあるものの、先に述べた実際の発掘の歴史の上に自然に重なっていく。",
      "その後、キム・ギヨンがパリのフランス国立図書館で直指の実物の行方を追い、ウンスのヨーロッパでの物語がアヴィニョンやストラスブールで絡み合っていく展開は、実在する場所を一つひとつ踏みしめていく旅でもある。",
      "フィッシャー教授を通じてグーテンベルクとマインツにまつわる手がかりが明らかになり、バチカンの古い手紙をめぐる秘密がペンバートンという人物を通して少しずつ明かされていく過程は、この小説がミステリーとして最も力を発揮する部分だ。チョン・ヒョンウの死の裏にどんな真実があったのかは、ここではあえて明かさないでおく。ぜひ本編で確かめてほしい。",
      "ただ、この本を閉じたあとに残るのは、犯人が誰だったかということよりも、興徳寺の名もなき僧侶たちが作り上げた一冊の本が、どうやって78年という時間差を超えて人類の印刷の歴史と並び立つことになったのか、という感覚だ。",
      "だからこの小説をたどりながら清州からパリ、アヴィニョン、ストラスブール、マインツまで歩いてみるなら、どこまでが実際に確認された歴史で、どこからが小説の想像なのかを一つひとつ区別しながら歩くことで、この旅はもっと深いものになると思う。",
      "とりわけ清州の興徳寺跡に実際に立ってみると、ここが単なる小説の舞台ではなく、本当に世界の印刷の歴史が始まった場所なのだと実感する。その事実だけでも、この旅にはすでに十分な意味があるはずだ。"
    ],
    title_ja:"直指:アモール・マネット", summary_ja:"高麗大学のラテン語教授チョン・ヒョンウの死を取材していた記者キム・ギヨンは、彼が残した手がかりから、世界最古の金属活字本『直指』とグーテンベルク、そしてバチカンに眠る古い手紙をめぐる秘密にたどり着く。清州(チョンジュ)の興徳寺から始まり、パリ・アヴィニョン・ストラスブール・マインツ・バチカンへと続く追跡劇。", author_ja:"キム・ジンミョン長編小説", era_ja:"現在 + 朝鮮世宗代 + 15世紀ヨーロッパ",
    contentSummary:{ sections:[
      { heading:"현재 — 사건의 시작", bullets:[
        "고려대 라틴어 교수 전형우가 의문사하고, 기자 김기연이 취재에 나섬",
        "전형우가 남긴 단서에서 직지와 구텐베르크, 바티칸의 오래된 편지가 연결됨을 발견함",
        "청주 흥덕사지·고인쇄박물관에서 연구자 김정진을 만나 직지의 실체를 알게 됨"
      ]},
      { heading:"유럽으로 이어지는 추적", bullets:[
        "김기연이 파리 프랑스국립도서관에서 직지 실물의 행방을 좇음",
        "은수(카레나)의 유럽 서사가 아비뇽·스트라스부르에서 얽혀듦",
        "피셔 교수를 통해 구텐베르크와 마인츠 쪽 단서가 드러남"
      ]},
      { heading:"과거로 거슬러 오르는 진실", bullets:[
        "조선 세종대와 15세기 유럽의 시간이 현재 사건과 교차됨",
        "바티칸의 오래된 편지를 둘러싼 비밀이 펨블턴을 통해 드러나기 시작함"
      ]}
    ], endingNote:"전형우의 죽음 뒤에 숨은 진실과 직지-구텐베르크를 둘러싼 비밀이 어떻게 밝혀지는지는 직접 작품을 읽고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Korean book-Jikji-Selected Teachings of Buddhist Sages and Seon Masters-1377.jpg", credit:'직지심체요절 실물(1377년 청주 흥덕사 간행) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Korean_book-Jikji-Selected_Teachings_of_Buddhist_Sages_and_Seon_Masters-1377.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Jikji" },
  { id:"glory", title:"더 글로리 (The Glory)", author:"김은숙 극본 · Netflix", type:"revenge", country:"korea", medium:"tv_drama", genres:["thriller","drama","crime"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 이 작품은 청주시를 알리기 위해 선정됨 — 청주 중앙공원·용화사가 청주영상위원회 공식 확인 촬영지.
    era:"현재", title_en:"The Glory", author_en:"Written by Kim Eun-sook · Netflix", era_en:"Present day",
    summary:"학교폭력 피해자 문동은이 오랜 시간 준비해 가해자들에게 다가가는 복수극. 충북 청주 중앙공원·용화사 등 실제 장소가 극의 중요한 순간들을 완성한다.",
    longSummary:"'더 글로리'를 다시 보게 되는 이유는 복수의 쾌감 때문만은 아니다. 동은이 견뎌야 했던 시간의 무게, 그리고 그 시간을 되찾기 위해 치러야 하는 대가를 이 작품은 가볍게 다루지 않는다.\n\n특히 인상적인 건 청주라는 도시가 이 이야기에 들어오는 방식이다. 동은이 노인들 틈에 섞여 바둑을 배우는 장면, 종교와 위선이 겹쳐지는 장면이 청주 중앙공원과 용화사에서 실제로 촬영됐다는 걸 알고 나면, 극 중 가상의 '세명시'와는 별개로 청주라는 실존 도시가 이 작품에 남긴 흔적을 다시 보게 된다.\n\n이 사이트는 학교폭력이라는 소재를 다루는 만큼, 실제 피해자·주민·시설을 관광 대상으로 소비하지 않는다는 원칙을 지키려 한다. 청주의 실제 명소는 소개하되, 극중 학교폭력이 벌어지는 구체적 장소는 특정하지 않는 이유다.",
    pinColor:"#7a1f2b",
    summary_en:"A revenge drama in which school-violence survivor Moon Dong-eun spends years preparing to confront her tormentors. Real locations in Cheongju — including Jungang Park and Yonghwasa Temple — complete some of the show's key moments.",
    longSummary_en:"What keeps pulling people back to The Glory isn't just the satisfaction of revenge. The show doesn't take lightly the weight of the years Dong-eun had to endure, or the cost of reclaiming that time.\n\nWhat's especially striking is how the city of Cheongju enters the story. Once you know that the scene of Dong-eun learning baduk among elderly locals, and the scene where religion and hypocrisy intertwine, were both actually filmed at Cheongju Jungang Park and Yonghwasa Temple, you start to see the real city's fingerprints on the show — separate from the fictional 'Semyeong' of the story itself.\n\nBecause this show deals with school violence, this site tries to hold to a principle: don't turn real victims, residents, or facilities into tourist attractions. We introduce Cheongju's real landmarks, but deliberately don't pinpoint the specific spot where the fictional bullying takes place.",
    communityNote:"더 글로리는 2022년 12월(파트1)과 2023년 3월(파트2)에 공개돼 넷플릭스 비영어권 드라마 흥행 상위권에 오른 작품으로, 송혜교·이도현·임지연 등의 연기가 특히 호평받았다. 학교폭력을 소재로 다루는 만큼 \"복수가 피해자의 삶을 정말로 돌려줄 수 있는가\"라는 질문이 방영 이후 지금까지도 계속 논의되고 있다.",
    communityNote_en:"The Glory was released in two parts (December 2022 and March 2023) and became one of Netflix's top-performing non-English-language dramas, with widely praised performances from Song Hye-kyo, Lee Do-hyun, and Lim Ji-yeon. Because the show deals with school violence, the question of \"can revenge really give a victim their life back\" has remained a live discussion since it aired.",
    hookBadge:"Netflix · 더 글로리 · 실제 촬영지 & 숨은 이야기", hookTagline:"동은이 바둑 배우던 그 공원, 진짜 청주다",
    discoveryHook:[
      "《더 글로리》 정주행 끝내고 나면 세명시가 정확히 어디인지 괜히 검색하게 된다.",
      "다들 청주 아니냐고 하길래 찾아봤는데, 제작진이 세명시를 특정 도시로 공식 확인한 적은 한 번도 없다고 한다.",
      "대신 확실하게 확인된 곳은 따로 있다. 동은이 노인들 틈에 섞여 바둑을 배우던 그 공원, 청주 중앙공원이 실제 촬영지라는 사실은 청주영상위원회 자료로 확인됐다. 공원 한가운데 있는 수령 900년 은행나무 아래 장면이 바로 거기서 찍혔다.",
      "그리고 이 공원 장면, 다시 보면 그냥 힐링 산책 신이 아니다. 동은이 여기서 바둑을 배우는 이유 자체가 이미 복수를 위한 포석이었다는 걸 알고 보면 소름이 돋는다 — 동은은 몇 년에 걸쳐 준비해서, 결국 연진의 딸이 다니는 학교의 교사로 들어간다. 처음부터 이 모든 게 계획의 일부였던 거다.",
      "종교와 위선이 겹쳐지던 장면이 나온 용화사도 마찬가지로 실제 촬영지다. 지금도 실제로 운영되는 사찰이라, 방문한다면 조용히 둘러보는 게 맞을 것 같다.",
      "연진·재준·사라·혜정·명오, 이 다섯 명의 가해자들이 시간이 지나도 서로 결속돼 있을 것 같지만, 사실 이 드라마의 진짜 재미는 이들이 계급·욕망·비밀 때문에 서서히 서로를 배신해간다는 데 있다. 동은이 굳이 손을 대지 않아도 이들은 자기들끼리 무너지기 시작한다.",
      "그리고 용화사의 종교·위선 장면이 이 가해자 집단 내부의 균열과 정확히 맞물려 있다는 걸 알고 다시 보면, 이 장소가 단순한 배경이 아니라 이야기 구조의 일부였다는 게 느껴진다.",
      "재밌는 건 바둑판이 청주에만 있는 게 아니라는 거다. 인천 청라호수공원에는 258㎡짜리 대형 바둑판 두 개가 실제로 세트로 만들어져 지금도 남아있다고 한다.",
      "그리고 시즌2 마지막, 눈 내리는 밤 빨간 등대 앞에서 동은과 여정이 맥주를 마시던 그 장면 — 강원도 강릉 소돌항의 진짜 등대다. 몇 년에 걸친 복수 끝에 겨우 도달한 이 장면이 하필 작가 김은숙의 고향에서 찍혔다는 걸 알고 나면, 이 엔딩이 좀 다르게 느껴진다.",
      "다만 이 사이트는 학교폭력을 다루는 작품인 만큼 하나는 분명히 하고 싶다. 실제 피해자·주민·시설을 관광 대상으로 소비하지 않으려 한다는 원칙이다. 그래서 청주의 실제 명소는 소개하되, 극중 학교폭력이 벌어지는 구체적 장소는 특정하지 않는다.",
      "동은이 몇 년을 준비해서 결국 연진 앞에 다시 나타나는 그 순간, 그리고 그 뒤에 이어지는 다섯 사람의 결말이 정확히 어떻게 마무리되는지는 여기서 다 말하지 않으려 한다. 다만 이 복수극이 통쾌함으로만 끝나지는 않는다는 것 정도는 미리 말해두고 싶다.",
      "청주에 간다면 세명시를 찾으려 하기보다, 실제로 확인된 촬영지들 — 중앙공원, 용화사 — 을 따라가 보는 게 더 의미 있을 것 같다.",
      "그리고 강릉에 갈 일이 있다면, 소돌항 등대 앞에 서서 \"동은이 여기까지 오는 데 몇 년이 걸렸지\" 하고 한 번 되짚어보는 것도 나쁘지 않을 것 같다."
    ],
    hookReveals:[
      { label:"동은의 바둑 공원 → 청주 중앙공원, 실제 촬영 확인", label_en:"Dong-eun's baduk park → confirmed real filming at Cheongju Jungang Park", locId:"cheongjujungangpark" },
      { label:"세명시 → 청주라고 공식 확인된 적 없는 가상 도시", label_en:"Semyeong → a fictional city never officially confirmed as Cheongju", locId:"semyeong" },
      { label:"시즌2 결말 빨간 등대 → 강릉 소돌항, 작가의 고향", label_en:"Season 2's red lighthouse → Sodol Port, Gangneung — the writer's hometown", locId:"sodolbangpaje" },
      { label:"대형 바둑판 → 인천 청라호수공원에 실제로 조성", label_en:"The giant baduk board → really built at Cheongna Lake Park, Incheon", locId:"cheongnabadukpark" }
    ],
    hookBadge_en:"Netflix · The Glory · Filming Locations & Behind-the-Scenes",
    hookTagline_en:"That park where Dong-eun learned baduk is really in Cheongju",
    discoveryHook_en:[
      "Finish binging The Glory and you can't help googling exactly where the fictional Semyeong is supposed to be.",
      "Everyone says Cheongju, so I looked into it — but it turns out the production has never officially confirmed any specific real city as Semyeong's model.",
      "What is confirmed is something else entirely. The park where Dong-eun learns baduk among elderly locals, Cheongju Jungang Park, is confirmed as a real filming location by the Cheongju Film Commission. The scene under the park's 900-year-old ginkgo tree was shot right there.",
      "And on a rewatch, that park scene isn't just a quiet healing stroll. It's genuinely chilling once you realize the reason she's learning baduk there in the first place was already part of the revenge plan — Dong-eun spends years preparing, and eventually becomes a teacher at the very school Yeon-jin's daughter attends. From the start, all of it was part of the plan.",
      "Yonghwasa Temple, where the scenes of religion and hypocrisy intertwine, is also a real filming location. It's still an active temple today, so it's worth visiting quietly if you go.",
      "Yeon-jin, Jae-jun, Sara, Hye-jeong, and Myeong-oh — the five perpetrators look bound together no matter how much time passes, but the show's real pleasure is in watching them slowly betray one another over class, desire, and buried secrets. Dong-eun barely has to lift a finger before they start tearing each other apart.",
      "And once you know that Yonghwasa's religion-and-hypocrisy scene lines up exactly with the cracks forming inside that group of perpetrators, the temple stops feeling like just a backdrop and starts feeling like part of the story's actual architecture.",
      "What's interesting is that the baduk boards aren't only in Cheongju. Two giant 258-square-meter baduk boards were actually built at Cheongna Lake Park in Incheon, and they're still standing there.",
      "And the Season 2 finale — Dong-eun and Yeo-jeong drinking beer by the red lighthouse on a snowy night — that's a real lighthouse at Sodol Port in Gangneung. Knowing that this scene, the one Dong-eun finally reaches after years of revenge, happens to be filmed in writer Kim Eun-sook's own hometown makes that ending land a little differently.",
      "Because this show deals with school violence, though, there's one thing this site wants to be clear about: we try not to turn real victims, residents, or facilities into tourist attractions. So we introduce Cheongju's real landmarks, but deliberately don't pinpoint the specific spot where the fictional bullying takes place.",
      "Exactly what happens in the moment Dong-eun finally reappears in front of Yeon-jin after years of preparation, and how the five perpetrators' stories end afterward — I won't spell all of that out here. But it's worth saying up front: this revenge story doesn't end in pure satisfaction alone.",
      "If you go to Cheongju, chasing down Semyeong might be less rewarding than simply following the filming locations that are actually confirmed — Jungang Park, Yonghwasa.",
      "And if you ever find yourself in Gangneung, standing in front of the lighthouse at Sodol Port and thinking, 'it took her years to get here,' isn't a bad way to spend a moment either."
    ],
    hookBadge_ja:"Netflix · THE GLORY(怨みの帝王) · 実際の撮影地&裏話",
    hookTagline_ja:"ドンウンがバドゥクを習ったあの公園、本当に清州だった",
    discoveryHook_ja:[
      "『THE GLORY』を一気見し終わると、セミョン市が正確にどこなのか、つい検索してしまう。",
      "みんな清州(チョンジュ)じゃないかと言うので調べてみたけれど、制作陣がセミョン市を特定の実在都市として公式に確認したことは一度もないらしい。",
      "その代わり、はっきり確認されている場所が別にある。ドンウンが老人たちに混じってバドゥクを習うあの公園、清州中央公園は実際の撮影地だと清州映像委員会の資料で確認されている。公園の真ん中にある樹齢900年の銀杏の木の下のシーンは、まさにそこで撮影されたものだ。",
      "そして、この公園のシーン、見返してみるとただの癒やしの散歩シーンじゃない。ドンウンがここでバドゥクを習っていた理由そのものが、すでに復讐のための布石だったと知るとゾッとする ― ドンウンは何年もかけて準備を重ね、最終的にヨンジンの娘が通う学校の教師になる。最初からすべてが計画の一部だったわけだ。",
      "宗教と偽善が重なるシーンが出てくる龍華寺(ヨンファサ)も同じく実際の撮影地。今も実際に運営中のお寺なので、訪れるなら静かに見学するのが良さそうだ。",
      "ヨンジン、ジェジュン、サラ、ヘジョン、ミョンオ ― この5人の加害者たちは時間が経っても結束しているように見えるけれど、実はこのドラマの本当の見どころは、彼らが階級・欲望・秘密のせいで少しずつお互いを裏切っていくところにある。ドンウンがわざわざ手を下さなくても、彼らは自分たちで崩れ始める。",
      "そして龍華寺の宗教・偽善のシーンが、この加害者集団内部の亀裂とぴったり重なっていると知って見返すと、この場所が単なる背景ではなく、物語の構造そのものの一部だったんだと感じられる。",
      "面白いのは、バドゥク盤が清州だけにあるわけじゃないということ。仁川の青蘿(チョンナ)湖水公園には258平方メートルの巨大なバドゥク盤が2つ、実際にセットとして作られて今も残っているという。",
      "そしてシーズン2の最後、雪の降る夜に赤い灯台の前でドンウンとヨジョンがビールを飲むあのシーン ― 江原道江陵(カンヌン)の所乭(ソドル)港の本物の灯台だ。何年もかけた復讐の末にようやくたどり着いたこのシーンが、よりによって脚本家キム・ウンスクの故郷で撮影されたと知ると、このエンディングが少し違って見えてくる。",
      "ただ、このサイトは学校暴力を扱う作品である以上、一つだけはっきりさせておきたいことがある。実際の被害者・住民・施設を観光対象として消費しないという原則だ。だから清州の実際の名所は紹介しつつ、劇中で学校暴力が起きる具体的な場所は特定しない。",
      "何年もの準備を経て、ドンウンが最終的にヨンジンの前に再び姿を現すあの瞬間、そしてその後に続く5人の結末が正確にどう終わるのかは、ここでは全部言わないでおく。ただ、この復讐劇が痛快さだけでは終わらないということだけは、あらかじめ言っておきたい。",
      "清州に行くなら、セミョン市を探そうとするよりも、実際に確認された撮影地 ― 中央公園、龍華寺 ― をたどってみる方が意味があると思う。",
      "そしてもし江陵に行く機会があれば、所乭港の灯台の前に立って「ドンウンがここまで来るのに何年かかったんだろう」と振り返ってみるのも悪くないと思う。"
    ],
    contentSummary:{ sections:[
      { heading:"피해에서 계획으로", bullets:[
        "고등학생 문동은, 박연진 일당에게 극심한 학교폭력을 당하지만 학교와 가족 누구에게도 보호받지 못함",
        "학교를 떠난 동은, 오랜 시간 준비해 연진의 딸이 다니는 학교의 교사가 됨"
      ]},
      { heading:"청주에서 시작되는 접근", bullets:[
        "동은, 청주 중앙공원에서 노인들 틈에 섞여 바둑을 배우며 계획을 다짐",
        "바둑을 매개로 주여정·하도영과 관계가 시작됨"
      ]},
      { heading:"공모와 균열", bullets:[
        "연진·재준·사라·혜정·명오, 과거의 공모 관계를 유지하지만 계급·욕망·비밀 때문에 서로를 배신함",
        "용화사 장면에서 드러나는 종교와 위선이 가해 집단 내부의 균열과 맞물림"
      ]}
    ], endingNote:"동은의 복수가 어떤 결말을 맞는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Cheongju Sangdangsangseong.jpg", credit:'상당산성, 청주(더 글로리 촬영지 청주 중앙공원·용화사와 같은 도시의 실제 명소) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Cheongju_Sangdangsangseong.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/The_Glory_(TV_series)" },
  { id:"woo", title:"이상한 변호사 우영우 (Extraordinary Attorney Woo)", author:"문지원 극본 · ENA·Netflix", type:"legal", country:"korea", medium:"tv_drama", genres:["drama","comedy"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 이 작품은 서울을 알리기 위해 선정됨 — 충북도청·도의회는 작품 전체 배경이 아니라 8회 촬영지로만 표기.
    era:"현재", title_en:"Extraordinary Attorney Woo", author_en:"Written by Moon Ji-won · ENA · Netflix", era_en:"Present day",
    summary:"자폐 스펙트럼을 지닌 천재 신입 변호사 우영우가 서울의 법무법인 한바다에서 성장해가는 법정 드라마. 강남 센터필드·수원 행궁동 등 서울·수도권의 실제 촬영지가 일상을 채운다.",
    longSummary:"'이상한 변호사 우영우'를 다시 들여다보면, 이 작품이 잘한 건 영우 한 사람을 감동 서사의 재료로만 쓰지 않았다는 점이다. 영우는 뛰어난 능력만큼이나 명확한 취약성과 욕망을 가진 인물로 그려지고, 그 균형이 이 드라마를 단순한 '착한 이야기'로 남지 않게 만든다.\n\n촬영지를 따라가 보는 것도 흥미롭다. 강남 센터필드의 회전문, 수원 행궁동의 김밥집처럼 서울·수도권의 실제 공간이 극의 일상을 채우는 한편, 8회 소덕동 사건에서만큼은 충북도청과 도의회가 실제 무대가 된다. 이 사이트는 그 차이를 분명히 하려 한다 — 충북은 이 작품 전체의 배경이 아니라, 8회 촬영지일 뿐이다.\n\n자폐 스펙트럼 재현에 대해서는 지금도 다양한 관점이 있다. 이 작품이 보여주는 재현이 한 인물의 이야기이지 모든 자폐인을 대표하는 것은 아니라는 점을, 이 사이트도 함께 기억하려 한다.",
    pinColor:"#2b4c7e",
    summary_en:"A legal drama following autistic genius rookie attorney Woo Young-woo as she grows at the Seoul law firm Hanbada. Real filming locations in Seoul and Gyeonggi — like Gangnam's Centerfield building and Suwon's Haenggung-dong — fill out her everyday world.",
    longSummary_en:"Looking back at Extraordinary Attorney Woo, what the show gets right is that it never turns Young-woo into raw material for an inspirational story alone. She's written with clear vulnerabilities and desires to match her ability, and that balance keeps the show from settling into a simple 'feel-good tale.'\n\nTracing the filming locations is its own kind of fun. Real spaces around Seoul and Gyeonggi — the revolving door at Gangnam's Centerfield building, the gimbap shop in Suwon's Haenggung-dong — fill out the everyday texture of the show, while the episode-8 Sodeok-dong storyline is the one place where the Chungbuk Provincial Office and Provincial Council become the real stage. This site tries to keep that distinction clear: Chungbuk isn't the show's overall setting, just its episode-8 filming location.\n\nThere are still varied perspectives on the show's portrayal of autism. This site tries to keep in mind that what the show depicts is one character's story, not a stand-in for all autistic people.",
    communityNote:"이상한 변호사 우영우는 ENA·Netflix 동시 공개로 화제를 모으며, 박은빈이 이 작품으로 백상예술대상 TV부문 대상을 비롯한 여러 시상식에서 여우주연상을 받았다. '고래'라는 상징과 함께, 자폐 스펙트럼 재현의 장점과 한계에 대한 논의가 방영 당시부터 지금까지 이어지고 있다.",
    communityNote_en:"Extraordinary Attorney Woo drew wide attention through its simultaneous ENA/Netflix release, and Park Eun-bin won Best Actress at the Baeksang Arts Awards and several other ceremonies for the role. Alongside the show's recurring whale imagery, discussion of the strengths and limits of its autism portrayal has continued from its original airing to today.",
    hookBadge:"ENA·Netflix · 이상한 변호사 우영우 · 실제 촬영지 & 숨은 이야기", hookTagline:"우영우 김밥집, 사실 김밥이 없다",
    discoveryHook:[
      "《이상한 변호사 우영우》 정주행 끝내고 나면 영우가 다니던 그 회전문, 진짜 있는 건지 궁금해진다.",
      "찾아보니 강남 센터필드라는 실제 오피스 빌딩이었다. 영우가 이준호의 도움으로 왈츠 추듯 통과하던 그 회전문 장면이 실제로 이 건물 로비에서 촬영됐다고 한다.",
      "더 재밌는 건 우영우 김밥집이다. 수원 행궁동 카페거리에 있는 실제 식당인데, 이름이 '카자구루마'라는 일식당이다. 그런데 극과 달리 실제 메뉴에는 김밥이 없다. 우동이랑 덮밥을 판다고 한다. 극중에서 그렇게 김밥을 맛있게 먹던 걸 생각하면, 실제로 찾아가서 김밥을 찾다가 당황할 사람이 한둘이 아닐 것 같다.",
      "8회 소덕동 이야기는 좀 다르게 봐야 한다. 그 안에 나오는 '경해도청' 장면은 실제로 충청북도청과 도의회에서 촬영됐는데, 이건 극 전체의 배경이 아니라 딱 8회만의 촬영지다. 서울·수원이 이 드라마의 진짜 무대이고, 충북은 8회에 한 번 등장하는 거다.",
      "그리고 소덕동이라는 마을 자체는 경남 창원 동부마을이 실제 촬영지다. 촬영 이후 극 중 나왔던 고래 벽화가 지금도 마을 입구 벽에 남아있고, 마을의 상징이던 팽나무도 실제로 그 자리에 서 있다고 한다.",
      "이 드라마를 다시 보면, 영우가 그냥 '착하고 능력 있는 사람'으로만 그려지지 않는다는 게 이 작품이 잘한 지점이라는 걸 느끼게 된다. 영우는 뛰어난 능력만큼이나 명확한 취약성과 욕망을 가진 인물이고, 그 균형이 이 드라마를 단순한 감동 서사에 머물지 않게 만든다.",
      "정명석 변호사 아래에서 여러 사건을 맡으며 영우가 전문직 동료로 성장해가는 과정, 그리고 이준호·최수연·권민우 같은 한바다 동료들과의 관계가 회차마다 조금씩 변해가는 과정을 같이 따라가다 보면, 이 드라마가 법정 케이스 하나하나보다 이 사람들 사이의 관계 변화에 더 공을 들였다는 게 보인다.",
      "특히 8회를 다시 보면, 소덕동 사건이 그냥 하나의 에피소드가 아니라 아버지 우광호와 태수미를 둘러싼 가족의 비밀이 서서히 드러나기 시작하는 지점이라는 걸 알 수 있다. 이 사건을 계기로 영우가 자기 자신에 대해 몰랐던 부분과 마주하게 된다.",
      "자폐 스펙트럼 재현에 대해서는 지금도 다양한 시선이 있다. 이 작품이 보여주는 건 영우 한 사람의 이야기이지, 모든 자폐인을 대표하는 게 아니라는 점은 이 사이트도 기억해두고 싶다.",
      "서울 강남에서 수원 행궁동, 그리고 8회만의 청주까지 — 촬영지를 따라가다 보면 이 드라마가 생각보다 넓은 곳을 무대로 삼았다는 걸 알게 된다.",
      "영우가 자기 직업과 사랑, 그리고 독립을 두고 최종적으로 어떤 결론에 도달하는지는 여기서 다 말하지 않으려 한다. 다만 그 결론이 단순히 '해피엔딩'이라는 말 한마디로 정리되지는 않는다는 것 정도만 말해두고 싶다.",
      "강남 센터필드 로비를 지날 일이 있다면 회전문 한 번 통과해보고, 수원 행궁동에 가면 김밥집에 가서 김밥을 안 판다고 당황하지 말고 우동 한 그릇 먹으면서 '여기가 그 촬영지구나' 하고 느껴보는 것도 나쁘지 않을 것 같다."
    ],
    hookReveals:[
      { label:"회전문 왈츠 장면 → 강남 센터필드, 실제 로비", label_en:"The revolving-door waltz → really filmed at Gangnam's Centerfield lobby", locId:"hanbadabuilding" },
      { label:"우영우 김밥집 → 실제론 김밥 없는 일식당", label_en:"'Woo Young-woo Gimbap' → a real Japanese restaurant with no gimbap on the menu", locId:"gimbapplace" },
      { label:"8회 소덕동 관공서 → 충북도청, 근데 전체 배경 아님", label_en:"Ep. 8's provincial office → Chungbuk, but not the show's overall setting", locId:"chungbukprovoffice" },
      { label:"소덕동 마을 → 창원 동부마을, 고래 벽화 지금도 있음", label_en:"Sodeok-dong village → Changwon's Dongbu Village, whale mural still there", locId:"changwondongbu" }
    ],
    hookBadge_en:"ENA·Netflix · Extraordinary Attorney Woo · Filming Locations & Behind-the-Scenes",
    hookTagline_en:"That gimbap shop doesn't actually sell gimbap",
    discoveryHook_en:[
      "Watch Extraordinary Attorney Woo and you start wondering whether that revolving door Young-woo walks through is a real place.",
      "Turns out it's a real office building called Centerfield in Gangnam. The scene where Young-woo waltzes through it with Jun-ho's help was actually filmed in that building's lobby.",
      "Even funnier is the gimbap shop. It's a real restaurant in Suwon's Haenggung-dong café district, a Japanese place called Kazaguruma. Unlike the show, there's no gimbap on the actual menu — just udon and rice bowls. Given how happily she eats gimbap on screen, more than a few fans have probably shown up expecting some and been thrown off.",
      "The episode-8 Sodeok-dong storyline needs a different frame. The 'Gyeonghae Provincial Office' scene in that episode was really filmed at the Chungbuk Provincial Office and Provincial Council — but that's the filming location for episode 8 alone, not the show's overall setting. Seoul and Suwon are the drama's real stage; Chungbuk just shows up once.",
      "The village of Sodeok-dong itself was filmed at a real place too — Dongbu Village in Changwon, Gyeongsangnam-do. Since filming wrapped, the whale mural from the show is still painted on a wall at the village entrance, and the symbolic hackberry tree still stands where it always did.",
      "Rewatching the show, what it gets right is that it never lets Young-woo settle into being just 'a kind, capable person.' She's written with clear vulnerabilities and desires to match her ability, and that balance is what keeps this from staying a simple feel-good tale.",
      "Following how Young-woo grows into a professional colleague under attorney Jung Myung-seok's mentorship, and how her relationships with Hanbada colleagues like Jun-ho, Su-yeon, and Min-woo shift episode by episode, it becomes clear the show poured more care into these relationships than into any single legal case.",
      "Rewatching episode 8 in particular, you realize the Sodeok-dong case isn't just a standalone episode — it's the point where a family secret involving her father Woo Kwang-ho and a woman named Tae Su-mi starts slowly coming into view. That case becomes the moment Young-woo has to face a part of herself she never knew.",
      "There are still varied views on the show's portrayal of autism. This site wants to keep in mind that what the show depicts is Young-woo's own story, not a stand-in for every autistic person.",
      "From Gangnam in Seoul to Suwon's Haenggung-dong, all the way to Chungbuk for just one episode — tracing the filming locations shows the drama's stage was wider than you'd expect.",
      "Exactly where Young-woo lands on her career, her love life, and her independence by the end, I won't spell all of that out here. I'll just say that ending doesn't wrap up as a simple 'happily ever after.'",
      "If you ever pass through the Centerfield lobby in Gangnam, try walking through the revolving door yourself, and if you make it to the gimbap shop in Suwon's Haenggung-dong, don't be thrown when there's no gimbap — just order the udon and enjoy knowing you're standing in the real filming spot."
    ],
    hookBadge_ja:"ENA·Netflix · 『イサンハン弁護士 ウ・ヨンウ』 · 実際の撮影地&裏話",
    hookTagline_ja:"ウ・ヨンウのり巻き店、実はのり巻きがない",
    discoveryHook_ja:[
      "『イサンハン弁護士 ウ・ヨンウ』を見終わると、ヨンウが通っていたあの回転ドア、本当にあるのか気になってくる。",
      "調べてみると、江南(カンナム)センターフィールドという実在のオフィスビルだった。ヨンウがイ・ジュノの助けを借りてワルツを踊るように通り抜けるあの回転ドアのシーンは、実際にこのビルのロビーで撮影されたそうだ。",
      "もっと面白いのは「ウ・ヨンウのり巻き」のお店。水原(スウォン)行宮洞(ヘングンドン)のカフェ通りにある実在の食堂だけど、店名は「カザグルマ」という和食店。ところがドラマと違って、実際のメニューにはのり巻きがない。うどんと丼を売っているという。劇中であんなに美味しそうにのり巻きを食べていたことを思うと、実際に行ってのり巻きを探して戸惑う人も少なくないんじゃないだろうか。",
      "8話のソドクトンの話は少し違う見方が必要だ。あの中に出てくる「キョンヘ道庁」のシーンは実際に忠清北道庁と道議会で撮影されたけど、これは作品全体の背景ではなく8話だけの撮影地。ソウル・水原がこのドラマの本当の舞台で、忠北は8話に一度だけ出てくる。",
      "そしてソドクトンという村自体は、慶尚南道昌原(チャンウォン)の東部マウルが実際の撮影地。撮影後、劇中に出てきたクジラの壁画が今も村の入口の壁に残っていて、村のシンボルだったパンナムの木も実際にその場所に立っているという。",
      "このドラマを見返すと、ヨンウを単に「善良で有能な人」としてだけ描いていないところがこの作品の優れた点だと感じる。ヨンウは優れた能力と同じくらい明確な脆さと欲求を持った人物として描かれていて、そのバランスがこのドラマを単なる感動物語にとどめない。",
      "チョン・ミョンソク弁護士のもとで様々な事件を担当しながらヨンウが専門職として成長していく過程、そしてイ・ジュノ、チェ・スヨン、クォン・ミヌといったハンバダの同僚たちとの関係が話数ごとに少しずつ変化していく過程を一緒に追っていくと、このドラマが一つひとつの法廷ケースよりも人間関係の変化に力を注いでいたことが見えてくる。",
      "特に8話を見返すと、ソドクトン事件が単なる一エピソードではなく、父ウ・グァンホとテ・スミをめぐる家族の秘密が少しずつ明らかになり始める地点だったと分かる。この事件をきっかけに、ヨンウは自分自身についてこれまで知らなかった部分と向き合うことになる。",
      "自閉スペクトラムの描写については今も様々な見方がある。この作品が見せているのはヨンウ一人の物語であって、すべての自閉症の人を代表するものではないという点は、このサイトも心に留めておきたい。",
      "ソウル江南から水原行宮洞、そして8話だけの忠北まで ― 撮影地をたどっていくと、このドラマが思ったより広い場所を舞台にしていたことが分かる。",
      "ヨンウが仕事、恋愛、そして自立をめぐって最終的にどんな結論にたどり着くのかは、ここでは全部言わないでおく。ただ、その結論が単純な「ハッピーエンド」という一言では片付けられないということだけは言っておきたい。",
      "江南センターフィールドのロビーを通ることがあれば回転ドアを一度くぐってみて、水原行宮洞に行ったらのり巻き店でのり巻きがなくても慌てず、うどんを一杯食べながら「ここがあの撮影地なんだ」と感じてみるのも悪くないと思う。"
    ],
    contentSummary:{ sections:[
      { heading:"한바다의 신입", bullets:[
        "자폐 스펙트럼을 지닌 천재 신입 변호사 우영우, 서울의 대형 법무법인 한바다에 입사함",
        "회전문을 무서워하는 영우, 동료 이준호의 도움으로 왈츠를 추듯 통과함(강남 센터필드 실제 촬영)"
      ]},
      { heading:"사건과 관계의 성장", bullets:[
        "정명석 변호사 아래에서 여러 사건을 맡으며 전문직 동료로 성장해감",
        "이준호·최수연·권민우 등 한바다 동료들과의 관계가 회차마다 변화함"
      ]},
      { heading:"소덕동, 그리고 가족의 비밀", bullets:[
        "8회 소덕동 관련 장면이 충북도청·도의회에서 실제로 촬영됨",
        "아버지 우광호, 그리고 태수미를 둘러싼 가족의 비밀이 서서히 드러나기 시작함"
      ]}
    ], endingNote:"영우의 직업·사랑·자립을 둘러싼 결론은 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Hwaseong Fortress Entrance.jpg", credit:'수원화성 입구(우영우 김밥집 촬영지가 있는 수원 행궁동 인근의 실제 명소) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Hwaseong_Fortress_Entrance.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/Extraordinary_Attorney_Woo" },
  { id:"taebaek", title:"태백산맥", author:"조정래 장편소설", type:"historical", country:"korea", medium:"novel", genres:["historical","war","drama"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 이 작품은 벌교(전남 보성군)를 알리는 콘텐츠 — 태백산맥문학관·현부자네집·소화의집·홍교·소화다리 등 실제 문학기행 명소가 중심.
    // ※ 율어의 정확한 좌표는 원문·지도 대조 전까지 공개하지 않음(taebaek_locations.js 참고).
    era:"1948~1953(여수·순천 10·19사건 직후~한국전쟁 휴전 직후)", title_en:"Taebaeksanmaek (The Taebaek Mountains)", author_en:"Novel by Jo Jung-rae", era_en:"1948–1953 (just after the Yeosu–Suncheon uprising through the Korean War armistice)",
    summary:"해방공간과 한국전쟁을 관통하는 4부 10권의 대하소설. 여수·순천 10·19사건 직후의 벌교를 무대로, 염상진·염상구 형제를 비롯한 인물들이 이념·토지·가족·생존의 갈림길에서 서로 다른 선택을 하는 과정을 그린다. 전남 보성군 벌교읍의 실제 문학기행 장소들이 이야기의 무대를 그대로 품고 있다.",
    longSummary:"『태백산맥』을 다시 펼치면, 이 작품이 좌익과 우익을 설명하는 '이념 소설'이기 이전에 선택지를 빼앗긴 사람들의 지리학이라는 걸 느끼게 된다. 벌교는 단순한 배경이 아니라 사실상 주인공이다 — 권력이 바뀔 때마다 같은 주민이 주민에서 의심받는 자, 협력자, 희생자로 다시 분류되는 과정이 이 작은 읍내를 무대로 반복된다.\n\n염상진과 염상구, 이념을 달리하는 형제의 이야기가 큰 축을 이루지만, 이 소설이 정말 힘을 갖는 건 무당 소화와 정하섭의 관계, 죽산댁·외서댁·들몰댁 같은 여성들의 생활사, 하대치 같은 가난한 농민이 왜 산으로 향할 수밖에 없었는지를 놓치지 않는다는 점이다. 좌우 인물만 강조하면 밀려나기 쉬운 민간인의 삶을 이 소설은 끝까지 붙든다.\n\n실제로 벌교를 걸어보면 이 소설이 얼마나 구체적인 장소 위에 서 있는지 알게 된다. 태백산맥문학관에서 시작해 현부자네 집, 소화의 집, 소화다리, 벌교 홍교, 보성여관까지 — 문학적 상상력과 실제 역사(여수·순천 10·19사건, 한국전쟁)가 씨줄과 날줄처럼 엮인 이 길을 걷다 보면, 왜 이 작품이 한국 현대문학에서 기념비적인 자리를 차지하는지 실감하게 된다.",
    pinColor:"#5a2a1f",
    summary_en:"A four-part, ten-volume epic novel spanning Korea's liberation period and the Korean War. Set in Beolgyo just after the Yeosu-Suncheon October 19 Incident of 1948, it follows characters like the brothers Yeom Sang-jin and Yeom Sang-gu as they're forced into opposing choices over ideology, land, family, and survival. Real literary-tourism sites in Beolgyo, Boseong County, still hold the novel's setting today.",
    longSummary_en:"Returning to Taebaeksanmaek, you feel that before it's an 'ideology novel' explaining left and right, it's a geography of people who lost the ability to choose. Beolgyo isn't just a backdrop — it's effectively the protagonist. Each time power changes hands, the same residents are reclassified again and again: resident, suspect, collaborator, victim.\n\nThe story of brothers Sang-jin and Sang-gu, torn apart by opposing ideologies, forms a major thread, but what gives the novel its real power is that it never loses sight of the shaman Sohwa's relationship with Ha-seop, the daily lives of women like Juksan-daek, Oeseo-daek, and Deulmol-daek, or why a poor farmer like Ha Dae-chi had no choice but to head for the mountains. Where a narrower story might sideline civilian life in favor of its left-and-right leads, this novel holds onto it to the end.\n\nWalking through Beolgyo today makes clear just how concretely this novel is grounded in real places. Starting at the Taebaeksanmaek Literature Museum and continuing through the Hyeon family house, Sohwa's house, Sohwa Bridge, Beolgyo's Hongyo Bridge, and Boseong Inn — following this route, where literary imagination and real history (the Yeosu-Suncheon Incident, the Korean War) are woven together like warp and weft, you understand firsthand why this novel holds such a monumental place in modern Korean literature.",
    communityNote:"태백산맥은 1983년부터 1989년까지 연재된 뒤 전 10권으로 완간된 대하소설로, 한국민족문화대백과사전은 이 작품이 다루는 시대를 여수·순천 10·19사건 직후부터 휴전 직후(1948~1953)까지로 규정한다. 1994년에는 임권택 감독이 안성기(김범우)·김명곤(염상진)·김갑수(염상구) 주연으로 영화화하기도 했다. 이 사이트는 원작 소설의 인물카드에 영화 속 배우 이미지를 섞지 않으며(기획안의 저작권·구성 원칙), 사건의 명칭은 위원회의 공식 표기인 '여수·순천 10·19사건'을 기준으로 삼는다. 8·15 해방과 한국전쟁을 잇는 이 시기를 다룬 작품 중 가장 폭넓게 읽혀온 소설로 꼽히며, 지금도 벌교 문학기행의 핵심 콘텐츠로 살아 있다.",
    communityNote_en:"Taebaeksanmaek was serialized from 1983 to 1989 and completed as a ten-volume epic; the Encyclopedia of Korean Culture defines its historical span as running from just after the Yeosu-Suncheon October 19 Incident through just after the 1953 armistice. In 1994, director Im Kwon-taek adapted it into a film starring Ahn Sung-ki (Kim Beom-u), Kim Myung-gon (Yeom Sang-jin), and Kim Gap-soo (Yeom Sang-gu). In line with the source planning document's copyright and editorial principles, this site does not mix film actor imagery into the original novel's character cards, and uses the truth commission's official name, the 'Yeosu-Suncheon October 19 Incident,' as its standard term. Widely regarded as one of the most-read Korean novels covering the period between liberation and the Korean War, it remains the centerpiece of literary tourism in Beolgyo today.",
    hookBadge:"대하소설 · 태백산맥 · 벌교의 실제 흔적", hookTagline:"소화다리, 원래 이름은 부용교였다",
    discoveryHook:[
      "『태백산맥』을 다 읽고 나면 벌교라는 지명이 자꾸 눈에 밟힌다.",
      "소설 속 지명들이 실제로 존재하는지 궁금해서 찾아봤는데, 생각보다 훨씬 많은 것들이 실재했다.",
      "소설 속 소화다리부터가 그렇다. 정식 명칭은 부용교이고 1931년에 준공된 실제 다리인데, 지금도 벌교 주민들은 이 다리를 그냥 \"소화다리\"라고 부른다고 한다. 소설 속 무당 소화의 이름이 실제 지명 대신 자리 잡아버린 셈이다.",
      "벌교 홍교는 그보다 훨씬 오래됐다. 조선 영조 5년(1729년)에 처음 놓인 돌다리로, 지금은 보물 제304호다. \"뗏목다리\"라는 뜻의 벌교(筏橋)라는 지명 자체가 바로 이 다리에서 유래했다고 한다.",
      "다만 소설 첫머리에 나오는 현부자네 집과 소화의 집은 원래부터 있던 건물이 아니다. 2008년 태백산맥문학관이 세워질 때 함께 복원·재현된 공간이라는 걸 밝혀두고 싶다.",
      "반대로 소설의 1부 말미에 나오는 해방구 \"율어\"는, 보성군에 실제로 율어면이라는 행정구역이 있긴 하지만 소설 속 공간과 정확히 일치하는지는 확정되지 않았다고 한다. 이 사이트는 특정 마을에 불필요한 낙인을 주지 않기 위해 이 항목의 좌표를 아예 공개하지 않는다.",
      "이 소설이 다루는 여수·순천 10·19사건과 한국전쟁은 허구가 아니라 실제로 있었던 일이다. 1948년 사건이 진압된 직후, 좌익 세력이 물러난 벌교에 경찰과 우익 세력이 돌아오면서 이야기가 시작된다.",
      "염상진을 중심으로 한 좌익 세력이 일시적으로 율어 일대를 장악했다가 곧 쫓기는 처지가 되는 초반부는, 이 소설이 승자와 패자를 단순하게 나누지 않는다는 걸 보여주는 대목이기도 하다.",
      "이 소설의 진짜 무게는 염상진·염상구 형제가 서로 다른 권력에 기대며 완전히 다른 삶으로 갈라진다는 데 있다. 같은 부모 밑에서 자란 형제가 시대 때문에 서로 다른 길을 걸을 수밖에 없었고, 그 끝에서 두 사람을 기다리는 게 무엇인지는 이 사이트가 다 말하지 않으려 한다. 다만 어느 쪽도 온전한 승리로 그려지지 않는다는 것만은 짚어두고 싶다.",
      "정하섭이 무당 소화의 집에 몸을 숨기며 시작되는 개인 서사도 인상적이다. 이념·신분·신앙·생존이 한 사람 안에 겹쳐지는 이 관계는, 거대한 역사 서술 속에서도 이 소설이 개인의 자리를 놓치지 않으려 한다는 걸 보여준다.",
      "하대치 같은 가난한 농민들이 토지 문제로 좌익운동에 참여하는 대목은, 이념이라는 것이 결국 얼마나 구체적인 생존의 문제와 맞닿아 있었는지를 드러낸다. 이 소설을 그냥 '이념 소설'로만 읽을 수 없는 이유가 여기에 있다.",
      "1950년 한국전쟁이 발발하며 통치권력이 다시 바뀌고, 같은 벌교 주민들이 협력자·반역자·피해자로 다시 분류되는 과정은 이 소설에서 가장 아프게 읽히는 대목이다. 산으로 들어간 사람들이 추위와 굶주림, 토벌을 견디는 동안, 남은 가족과 마을도 감시와 보복 속에서 생존을 이어간다.",
      "1953년 휴전 이후에도 풀리지 않는 토지와 분단의 문제가 이 소설에서 어떻게 그려지는지는 직접 읽어보시길 권한다. 이 이야기는 승리나 화해로 깔끔하게 마무리되는 종류의 이야기가 아니다.",
      "실제로 벌교를 걷는다는 건 가벼운 문학기행 이상의 일인 것 같다. 태백산맥문학관에서 시작해 현부자네 집, 소화의 집, 소화다리, 벌교 홍교, 보성여관까지 — 이 길을 걷다 보면 문학적 상상력과 실제 역사가 씨줄과 날줄처럼 엮여 있다는 걸 몸으로 느끼게 된다.",
      "홍교 위에 서서 다리 이름 하나에 소설 한 편의 무게가 얹혀 있다는 걸 새삼 실감했던 기억이 있다. 벌교에 간다면, 이 다리들 이름의 유래부터 하나씩 짚어가며 걸어보시길 권하고 싶다."
    ],
    hookReveals:[
      { label:"소화다리 → 정식 이름은 부용교, 소설 속 이름으로 굳어짐", label_en:"Sohwa Bridge → officially Buyong Bridge, but the novel's name stuck", locId:"sohwa_bridge" },
      { label:"벌교 홍교 → 보물 제304호, 지명 '벌교' 자체의 유래", label_en:"Hongyo Bridge → National Treasure No. 304, the origin of the name Beolgyo", locId:"beolgyo_hongyo" },
      { label:"현부자네 집·소화의 집 → 2008년 문학관 조성 때 복원된 공간", label_en:"The Hyeon house & Sohwa's house → reconstructed when the museum opened in 2008", locId:"hyeonbuja_house" },
      { label:"해방구 '율어' → 실제 좌표는 공개하지 않음", label_en:"The liberated zone 'Yureo' → coordinates deliberately withheld", locId:"yureo" }
    ],
    hookBadge_en:"Epic Novel · Taebaeksanmaek · Real Traces in Beolgyo",
    hookTagline_en:"Sohwa Bridge was originally called Buyong Bridge",
    discoveryHook_en:[
      "Finish Taebaeksanmaek and the name Beolgyo keeps coming back to you.",
      "I wanted to know how many of the novel's place names are real, and it turned out far more of them are real than I expected.",
      "Start with Sohwa Bridge in the novel. Its official name is Buyong Bridge, a real bridge completed in 1931 — but locals in Beolgyo still simply call it 'Sohwa Bridge' today. The name of the novel's shaman character, Sohwa, has effectively taken over the real place name.",
      "Beolgyo's Hongyo Bridge is far older. First built in 1729, during the reign of King Yeongjo, it's now National Treasure No. 304. The town's very name, Beolgyo ('raft bridge'), is said to come from this exact bridge.",
      "That said, the Hyeon family house and Sohwa's house from the novel's opening chapters weren't standing buildings to begin with — worth being clear that they were reconstructed and recreated when the Taebaeksanmaek Literature Museum was built in 2008.",
      "On the other hand, 'Yureo,' the liberated zone from the end of Part 1, does correspond to a real administrative township called Yulyeo-myeon in Boseong County, but whether it matches the novel's fictional space exactly has never been confirmed. This site deliberately withholds coordinates for this entry, to avoid stigmatizing any specific real village.",
      "The Yeosu-Suncheon October 19 Incident and the Korean War that this novel depicts aren't fiction — they really happened. The story opens just after the 1948 incident is suppressed, as police and right-wing forces return to a Beolgyo the leftist forces have retreated from.",
      "The early stretch, where leftist forces under Yeom Sang-jin briefly hold the Yureo area before being driven out, shows how this novel refuses to draw a simple line between victors and the defeated.",
      "The real weight of this novel lies in how brothers Sang-jin and Sang-gu, leaning on opposing powers, are pulled into completely different lives. Two brothers raised by the same parents are forced onto separate paths by the era they're living through, and I won't spell out here what waits for each of them at the end. I'll only say this much: neither path is portrayed as a clean victory.",
      "The personal story that begins when Jeong Ha-seop hides at the shaman Sohwa's house is striking too. This relationship, where ideology, class, faith, and survival all overlap in a single person, shows how the novel refuses to lose sight of the individual even within its sweeping historical narrative.",
      "The passage where poor farmers like Ha Dae-chi join the leftist movement over land issues reveals just how concretely ideology was tied to the plain problem of survival. That's part of why this novel can't simply be read as an 'ideology novel.'",
      "When the Korean War breaks out in 1950 and power changes hands again, the same residents of Beolgyo get reclassified once more — as collaborators, traitors, victims — and that's the most painful stretch to read in the whole novel. While the people who fled to the mountains endure cold, hunger, and military suppression, the families and villages left behind keep surviving under surveillance and retaliation.",
      "Exactly how the unresolved issues of land and division are portrayed even after the 1953 armistice is something worth reading for yourself. This isn't the kind of story that wraps up neatly with victory or reconciliation.",
      "Actually walking through Beolgyo feels like more than a casual literary stroll. Starting at the Taebaeksanmaek Literature Museum and continuing through the Hyeon family house, Sohwa's house, Sohwa Bridge, Beolgyo's Hongyo Bridge, and Boseong Inn — walking this route, you feel in your body how literary imagination and real history are woven together like warp and weft.",
      "Standing on Hongyo Bridge myself, it hit me how much weight a single bridge name can carry from one novel. If you go to Beolgyo, I'd recommend tracing the origin of each bridge's name, one by one, as you walk."
    ],
    discoveryHook_ja:[
      "『太白山脈』を読み終えると、筏橋(ボルギョ)という地名がやけに心に残る。",
      "小説に出てくる地名が実際に存在するのか気になって調べてみたら、思っていたよりずっと多くのものが実在していた。",
      "まず小説に出てくる召鶴橋(ソファダリ)がそうだ。正式名称は芙蓉橋で、1931年に完成した実在の橋なんだけど、今でも筏橋の住民たちはこの橋をただ「ソファダリ」と呼んでいるという。小説に出てくる巫女ソファの名前が、実際の地名に取って代わってしまったわけだ。",
      "筏橋の虹橋(ホンギョ)はそれよりもずっと古い。朝鮮・英祖5年(1729年)に初めて架けられた石橋で、今は宝物第304号に指定されている。「筏の橋」という意味の筏橋(ボルギョ)という地名自体が、まさにこの橋に由来しているという。",
      "ただし、小説の冒頭に出てくるヒョン富者(プジャ)の家とソファの家は、もともとあった建物ではない。2008年に太白山脈文学館が建てられた際に一緒に復元・再現された空間だということは、はっきり伝えておきたい。",
      "逆に、小説第1部の終盤に出てくる解放区「ユロ」は、宝城郡に実際にユロ面という行政区域は存在するものの、小説の中の空間と正確に一致するかどうかは確定していないという。このサイトは特定の実在する村に不必要な烙印を押さないよう、この項目の座標をあえて公開していない。",
      "この小説が扱う麗水・順天10・19事件と朝鮮戦争は、フィクションではなく実際に起きた出来事だ。1948年の事件が鎮圧された直後、左翼勢力が去った筏橋に警察と右翼勢力が戻ってくるところから物語は始まる。",
      "ヨム・サンジンを中心とする左翼勢力が一時的にユロ一帯を掌握するものの、まもなく追われる立場になっていく序盤は、この小説が勝者と敗者を単純に分けて描いていないことを示す部分でもある。",
      "この小説の本当の重みは、ヨム・サンジンとヨム・サング兄弟が、それぞれ異なる権力に寄りかかりながらまったく違う人生へと分かれていくところにある。同じ親のもとで育った兄弟が、時代のせいで別々の道を歩まざるを得なかった ― その先で二人を待っているものが何なのかは、ここでは明かさないでおく。ただ、どちらの道も完全な勝利としては描かれていない、ということだけは伝えておきたい。",
      "チョン・ハソプが巫女ソファの家に身を隠すところから始まる個人の物語も印象的だ。イデオロギー・身分・信仰・生存が一人の人間の中で重なり合うこの関係は、大きな歴史の叙述の中でも一人ひとりの居場所を見失わないでおこうとするこの小説の姿勢を表している。",
      "ハ・デチのような貧しい農民たちが土地の問題をきっかけに左翼運動に加わっていく場面は、イデオロギーというものが結局どれほど具体的な生存の問題と結びついていたかを浮き彫りにする。この小説を単なる「イデオロギー小説」として読み切れない理由がここにある。",
      "1950年に朝鮮戦争が勃発して統治権力が再び入れ替わり、同じ筏橋の住民たちが協力者・反逆者・被害者として再び分類されていく過程は、この小説の中でもっとも痛みを伴って読める部分だ。山に入った人々が寒さと飢え、討伐に耐える一方で、残された家族や村もまた監視と報復の中で生き延びていく。",
      "1953年の休戦後もなお解決されない土地と分断の問題がこの小説の中でどう描かれているかは、ぜひ本編を読んで確かめてほしい。この物語は、勝利や和解できれいに締めくくられる類のものではない。",
      "実際に筏橋を歩くということは、ちょっとした文学散歩以上の意味を持つように思う。太白山脈文学館から始まり、ヒョン富者の家、ソファの家、ソファダリ、筏橋の虹橋、宝城旅館まで ― この道を歩いていると、文学的想像力と実際の歴史が縦糸と横糸のように織り込まれていることを、体で感じることになる。",
      "虹橋の上に立ったとき、たった一つの橋の名前に一つの小説の重みが乗っているのだと改めて実感したことを覚えている。筏橋に行くなら、これらの橋の名前の由来から一つずつたどりながら歩いてみることをお勧めしたい。"
    ],
    title_ja:"太白山脈(テベクサンメク)", summary_ja:"解放後の混乱期から朝鮮戦争までを貫く、全4部10巻の大河小説。麗水・順天10・19事件直後の筏橋(ボルギョ)を舞台に、ヨム・サンジン、ヨム・サング兄弟をはじめとする人々が、イデオロギー・土地・家族・生存の岐路でそれぞれ違う選択をしていく姿を描く。全羅南道宝城郡筏橋邑には、物語の舞台そのものを今に伝える実際の文学紀行スポットが残っている。", author_ja:"チョ・ジョンレ長編小説", era_ja:"1948年~1953年(麗水・順天10・19事件直後~朝鮮戦争休戦直後)",
    contentSummary:{ sections:[
      { heading:"진압 직후의 벌교", bullets:[
        "1948년 여수·순천 10·19사건이 진압된 직후, 좌익 세력이 물러난 벌교에 경찰과 우익 세력이 돌아옴",
        "염상진을 중심으로 한 좌익 세력이 일시적으로 율어 일대를 장악했다가 곧 쫓기는 처지가 됨"
      ]},
      { heading:"갈라지는 형제, 얽히는 개인사", bullets:[
        "염상진·염상구 형제가 서로 다른 권력에 기대며 완전히 다른 삶으로 갈라짐",
        "정하섭이 무당 소화의 집에 몸을 숨기며 이념·신분·신앙·생존이 겹친 개인 서사가 시작됨"
      ]},
      { heading:"토지, 생활, 그리고 전쟁", bullets:[
        "하대치 등 가난한 농민들이 토지 문제로 좌익운동에 참여하며 이념의 경제적 바닥이 드러남",
        "1950년 한국전쟁 발발로 통치권력이 다시 바뀌고, 같은 주민이 협력자·반역자·피해자로 재분류됨",
        "산으로 들어간 사람들이 추위·굶주림·토벌을 견디는 동안, 남은 가족과 마을도 감시와 보복 속에서 생존을 이어감"
      ]}
    ], endingNote:"염상진·염상구 형제의 마지막, 그리고 1953년 휴전 이후에도 풀리지 않는 토지·분단의 문제가 어떻게 그려지는지는 직접 작품을 읽고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Beolgyo Arch Bridge 13-09910.JPG", credit:'벌교 홍교, 보물 제304호(태백산맥의 실제 무대인 전남 보성군 벌교읍) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Beolgyo_Arch_Bridge_13-09910.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%ED%83%9C%EB%B0%B1%EC%82%B0%EB%A7%A5" },
  { id:"sunshine", title:"미스터 션샤인", author:"tvN·김은숙 극본", type:"historical", country:"korea", medium:"tv_drama", genres:["historical","romance","action"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 이 작품은 대한제국 시기(1900년대 한성)를 배경으로 한 tvN 드라마 — 서울 정동·경복궁·종로 일대의 실제
    //   근대 역사 공간과, 논산 탑정호에 실물 크기로 조성된 촬영 세트가 두 축을 이룬다.
    // ※ 무신회의 배경지(일본 내)는 극중 설정으로만 존재하며 실제 좌표를 확인할 수 없어 지도에 표시하지 않음
    //   (japan_musinhoe_origin, taebaek의 '율어' 처리 원칙과 동일하게 적용).
    era:"1871~1907(신미양요~고종 강제 퇴위·군대 해산, 대한제국 시기)", title_en:"Mr. Sunshine", author_en:"tvN · Written by Kim Eun-sook", era_en:"1871–1907 (from the Shinmiyangyo through Emperor Gojong's forced abdication and the disbanding of the army, the Korean Empire period)",
    summary:"노비였던 소년이 미 해병대 장교가 되어 조선으로 돌아오고, 명문가 규수는 신분을 감춘 채 의병이 된다. 대한제국 말기 한성을 무대로, 유진 초이·고애신·구동매·김희성·쿠도 히나 다섯 사람이 각자의 이유로 같은 시대와 얽혀든다. 사랑 이야기이자, 이름 없이 스러진 이들에게 보내는 뒤늦은 예의이기도 하다.",
    longSummary:"『미스터 션샤인』을 다시 보면, 이 작품이 '사극 로맨스'라는 장르명 하나로는 다 담기지 않는다는 걸 느끼게 된다. 유진 초이는 노비의 아들로 태어나 미국으로 건너가 살아남았고, 고애신은 명문가의 안주인이 될 운명을 타고났지만 총을 든다. 이 두 사람이 만나는 지점 자체가 이미 신분제 조선이 무너지고 있다는 증거다.\n\n이 드라마가 정말 힘을 갖는 건, 사랑 이야기를 앞세우면서도 결코 역사의 무게를 가볍게 다루지 않는다는 점이다. 을사늑약, 고종의 강제 퇴위, 군대 해산과 의병 봉기 — 실제로 있었던 사건들이 인물들의 선택을 하나씩 되돌릴 수 없게 만든다. 이름이 알려지지 않은 채 스러져간 의병들, 그리고 그들을 기억하려는 시도가 이 작품 전체를 관통하는 정서다.\n\n다섯 주인공 각자가 붙잡고 있는 것도 다르다 — 유진은 복수와 소속감 사이에서, 애신은 신분과 신념 사이에서, 동매는 생존과 충성 사이에서, 희성은 가문과 양심 사이에서, 히나는 정보와 인간적 온기 사이에서 흔들린다. 이 다섯 개의 축이 만들어내는 긴장이야말로 이 드라마가 단순한 러브스토리를 넘어서는 이유다.\n\n실제로 서울 정동 일대를 걸어보면 이 드라마가 얼마나 구체적인 역사 위에 서 있는지 알게 된다. 덕수궁 대한문에서 시작해 중명전, 옛 러시아공사관터, 정동제일교회까지 — 그리고 논산 탑정호에 실제로 조성된 1900년대 한성 촬영 세트까지 함께 걸으면, 왜 이 작품이 그토록 많은 이들의 마음에 남았는지 실감하게 된다.",
    pinColor:"#8a1f2b",
    summary_en:"A boy born into slavery becomes a US Marine officer and returns to Korea; a noblewoman hides her identity to join the righteous army. Set in Hanseong during the final years of the Korean Empire, Eugene Choi, Go Ae-shin, Gu Dong-mae, Kim Hui-seong, and Kudo Hina are each drawn into the same turbulent era for very different reasons. It's a love story, and also a belated tribute to those who fell without ever being named.",
    longSummary_en:"Watching Mr. Sunshine again, you realize the genre label 'historical romance' doesn't fully capture it. Eugene Choi was born the son of a slave and survived by fleeing to America; Ae-shin was born to become the mistress of a noble household, yet picks up a gun instead. The very fact that these two meet is evidence that Joseon's caste system is already collapsing.\n\nWhat gives this drama real power is that even as it foregrounds romance, it never treats the weight of history lightly. The Eulsa Treaty, Gojong's forced abdication, the disbandment of the army and the righteous-army uprisings that followed — real events that make the characters' choices irreversible, one by one. The unnamed righteous-army fighters who fell, and the drama's attempt to remember them, run through the whole story as its emotional core.\n\nEach of the five leads is torn between different things — Eugene between revenge and belonging, Ae-shin between class and conviction, Dong-mae between survival and loyalty, Hui-seong between family and conscience, Hina between information and human warmth. The tension created by these five axes is exactly why this drama transcends a simple love story.\n\nWalking through Seoul's Jeong-dong district today makes clear just how concretely this drama is grounded in real history. Starting at Deoksugung's Daehanmun gate and continuing through Jungmyeongjeon, the former Russian Legation site, and Jeongdong Church — and then walking through the full-scale 1900s Hanseong set actually built at Tapjeong Lake in Nonsan — you understand firsthand why this drama has stayed with so many people.",
    communityNote:"『미스터 션샤인』은 2018년 tvN에서 방영된 김은숙 작가·이응복 감독의 드라마로, 이병헌(유진 초이)·김태리(고애신)·유연석(김희성)·변요한(구동매)·김민정(쿠도 히나)이 주연을 맡았다. 넷플릭스를 통해 전 세계에 동시 공개되며 한국 밖에서도 큰 반향을 일으켰다. 극중 무신회·글로리호텔 등은 가공의 설정이지만, 을사늑약·고종 강제 퇴위·군대 해산·정미의병 등은 모두 실제 역사에 기반한다. 논산시 상월면 탑정호 인근에 조성된 촬영 세트는 지금도 관광지로 개방돼 있으며, 이 사이트는 원작 드라마의 인물카드에 배우 이미지를 섞지 않는다(기존 작품들과 동일한 저작권·구성 원칙).",
    communityNote_en:"Mr. Sunshine aired on tvN in 2018, written by Kim Eun-sook and directed by Lee Eung-bok, starring Lee Byung-hun (Eugene Choi), Kim Tae-ri (Go Ae-shin), Yoo Yeon-seok (Kim Hui-seong), Byun Yo-han (Gu Dong-mae), and Kim Min-jung (Kudo Hina). Released simultaneously worldwide via Netflix, it drew strong international attention. While elements like the Musinhoe and the Glory Hotel are fictional, events such as the Eulsa Treaty, Gojong's forced abdication, the disbandment of the army, and the resulting righteous-army uprisings are all grounded in real history. The filming set built near Tapjeong Lake in Sangwol-myeon, Nonsan, remains open to visitors today. In line with this site's existing copyright and editorial principles, this site does not mix actor imagery into the drama's character cards.",
    hookBadge:"tvN · 미스터 션샤인 · 정동의 실제 역사와 논산의 재현 세트", hookTagline:"글로리호텔, 실제 모델이 있었다",
    discoveryHook:[
      "『미스터 션샤인』을 다 보고 나면 정동이라는 동네가 자꾸 궁금해진다.",
      "극 중 다섯 사람이 얽히던 글로리호텔, 실제로 있었나 찾아봤다.",
      "정확히 같은 이름은 아니지만 실제 모델이 있었다. 1902년 문을 연 한국 최초의 서양식 호텔, 손탁호텔이다. 외국 사절과 상인들의 사교장이었다는데, 지금은 건물이 남아있지 않고 이화여자고등학교 안에 표지석만 남아 있다고 한다.",
      "을사늑약이 체결되는 장면도 허구가 아니다. 1905년 실제로 그 조약이 체결된 중명전이 지금도 서울 정동에 그대로 남아있고, 안에는 관련 상설전시도 있다고 한다. 직접 가보면 극에서 봤던 그 무게가 조금 다르게 다가온다.",
      "반대로 극 중 친일 무력 조직 무신회의 일본 내 근거지는 실제 장소가 아니다. 이 사이트는 확인되지 않은 곳에 임의로 좌표를 붙이지 않는다는 원칙에 따라, 이 항목은 지도에 위치를 표시하지 않는다.",
      "서울 정동을 걷는 것과는 별개로, 극의 배경이 된 1900년대 한성 전체를 실물 크기로 재현한 곳도 있다. 충남 논산 탑정호 인근에 근대 양식 건물 5동, 기와집 19채, 초가 4채, 일본식 가옥 9채가 지어진 촬영 세트인데, 지금도 관광지로 개방돼 있다.",
      "이 드라마를 다시 보면, '사극 로맨스'라는 장르명 하나로는 이 이야기가 다 담기지 않는다는 걸 느끼게 된다. 노비의 아들로 태어나 신미양요 직후 부모를 잃고 미국으로 건너간 유진 초이가 미 해병대 장교가 되어 조선에 돌아오고, 명문가의 안주인이 될 운명이었던 고애신은 총을 든다. 이 둘이 만나는 지점 자체가 이미 신분제 조선이 무너지고 있다는 증거다.",
      "다섯 주인공 각자가 붙잡고 있는 것도 다르다. 유진은 복수와 소속감 사이에서, 애신은 신분과 신념 사이에서, 무신회 출신 구동매는 생존과 충성 사이에서, 명문가 자제 김희성은 가문과 양심 사이에서, 일본 정보요원 쿠도 히나는 정보와 인간적 온기 사이에서 흔들린다. 이 다섯 개의 축이 만들어내는 긴장이야말로 이 드라마가 단순한 러브스토리를 넘어서는 이유다.",
      "을사늑약 체결 소식이 전해지는 순간부터 이 다섯 사람의 선택은 되돌릴 수 없는 방향으로 흘러간다. 이 드라마가 정말 힘을 갖는 건, 사랑 이야기를 앞세우면서도 이 역사의 무게를 결코 가볍게 다루지 않는다는 점이다.",
      "고종의 강제 퇴위와 군대 해산으로 정미의병이 전국적으로 봉기하는 대목에서, 애신을 비롯한 인물들이 이름 없는 의병으로서 무력 항쟁에 본격적으로 뛰어드는 과정을 이 드라마는 피하지 않고 정면으로 그린다.",
      "이 다섯 사람이 각자 어떤 선택을 내리고 어떤 자리에 도착하는지는 여기서 다 밝히지 않으려 한다. 다만 이 작품의 제목 아래 깔린 진짜 마음이 무엇인지는 미리 말해두고 싶다 — 이 드라마는 사랑 이야기이자, 이름 없이 스러진 이들에게 보내는 뒤늦은 예의이기도 하다.",
      "그러니까 이 드라마를 다 보고도 유진과 애신의 결말만 기억한다면 절반만 본 셈이다. 이름이 알려지지 않은 채 스러져간 의병들, 그리고 그들을 기억하려는 이 드라마의 태도까지 함께 봐야 이 이야기가 완성된다.",
      "실제로 서울 정동 일대를 걸어보면 이 드라마가 얼마나 구체적인 역사 위에 서 있는지 알게 된다. 덕수궁 대한문에서 시작해 중명전, 옛 러시아공사관터, 정동제일교회까지 걸어보시길 권한다.",
      "그리고 논산 탑정호에 실제로 조성된 1900년대 한성 촬영 세트까지 함께 걸으면, 왜 이 작품이 그토록 많은 이들의 마음에 남았는지 실감하게 될 것 같다."
    ],
    hookReveals:[
      { label:"글로리호텔 → 실제 모델은 1902년 손탁호텔", label_en:"The Glory Hotel → based on the real 1902 Sontag Hotel", locId:"sontaghotel" },
      { label:"을사늑약 체결 → 중명전, 실제로 있었던 일", label_en:"The Eulsa Treaty signing → really happened at Jungmyeongjeon", locId:"jungmyeongjeon" },
      { label:"무신회 일본 근거지 → 실제 좌표 없는 극중 설정", label_en:"The Musinhoe's base in Japan → a fictional setting, no real coordinates", locId:"japan_musinhoe_origin" },
      { label:"1900년대 한성 전체 → 논산 탑정호에 실물 크기로 재현", label_en:"All of 1900s Hanseong → recreated full-scale at Tapjeong Lake, Nonsan", locId:"sunshinestudio_main" }
    ],
    hookBadge_en:"tvN · Mr. Sunshine · Jeong-dong's Real History & the Nonsan Set",
    hookTagline_en:"The Glory Hotel had a real-life model",
    discoveryHook_en:[
      "Finish Mr. Sunshine and the Jeong-dong district keeps pulling at you.",
      "I looked up whether the Glory Hotel, where the five leads' lives entangle, was ever a real place.",
      "Not under that exact name, but it had a real prototype: the Sontag Hotel, Korea's first Western-style hotel, opened in 1902. It served as a social hub for foreign envoys and merchants; the building itself no longer stands, but a marker remains on the campus of Ewha Girls' High School.",
      "The scene where the Eulsa Treaty is signed isn't fiction either. Jungmyeongjeon, where that treaty was actually signed in 1905, still stands in Seoul's Jeong-dong today, complete with a permanent exhibition inside. Standing there in person, the weight of that scene from the show lands a little differently.",
      "On the other hand, the Musinhoe's base in Japan — the pro-Japanese armed organization in the drama — isn't a real place. In keeping with this site's principle of not assigning coordinates to unconfirmed locations, this entry isn't shown on the map at all.",
      "Apart from walking Seoul's Jeong-dong, there's also a place where the entire 1900s Hanseong setting was recreated at full scale. Near Tapjeong Lake in Nonsan, South Chungcheong, the production built five modern-style buildings, 19 tile-roofed houses, 4 thatched houses, and 9 Japanese-style houses — a filming set that's still open to visitors today.",
      "Rewatching this drama, you feel that the label 'historical romance' doesn't fully capture it. Eugene Choi, born the son of a slave, loses his parents right after the Sinmiyangyo and flees to America, only to return to Korea as a US Marine officer; Ae-shin, born to become the mistress of a noble household, picks up a gun instead. The very fact that these two meet is evidence that Joseon's caste system is already collapsing.",
      "Each of the five leads holds onto something different. Eugene is torn between revenge and belonging; Ae-shin between class and conviction; Gu Dong-mae, a Musinhoe veteran, between survival and loyalty; Kim Hui-seong, the son of a noble family, between family and conscience; Kudo Hina, a Japanese intelligence agent, between information and human warmth. The tension created by these five axes is exactly why this drama transcends a simple love story.",
      "From the moment news of the Eulsa Treaty's signing spreads, the choices these five people make become irreversible. What gives this drama real power is that even as it foregrounds romance, it never treats the weight of this history lightly.",
      "When Gojong's forced abdication and the disbandment of the army spark the nationwide Jeongmi righteous-army uprising, the drama doesn't shy away from showing Ae-shin and the others plunging headfirst into armed resistance as unnamed fighters.",
      "Exactly what choices each of these five people makes, and where each of them ends up, I won't reveal all of that here. But I do want to say upfront what really sits beneath this show's title: it's a love story, and also a belated tribute to those who fell without ever being named.",
      "So if you finish this drama remembering only how things end for Eugene and Ae-shin, you've only seen half of it. This story is only complete once you also take in the unnamed righteous-army fighters who fell, and the drama's own effort to remember them.",
      "Actually walking through Seoul's Jeong-dong district makes clear just how concretely this drama is grounded in real history. I'd recommend starting at Deoksugung's Daehanmun gate and walking through Jungmyeongjeon, the former Russian Legation site, and Jeongdong Church.",
      "And if you also walk through the full-scale 1900s Hanseong set actually built at Tapjeong Lake in Nonsan, you'll likely come away understanding firsthand why this drama has stayed with so many people."
    ],
    discoveryHook_ja:[
      "『ミスター・サンシャイン』を見終えると、貞洞(チョンドン)という街のことが気になってくる。",
      "劇中で5人の運命が絡み合うグローリーホテル、実際にあったのか調べてみた。",
      "全く同じ名前ではないけれど、実際のモデルは存在した。1902年に開業した韓国初の西洋式ホテル、ソンタクホテルだ。外国の使節や商人たちの社交場だったというが、今は建物自体は残っておらず、梨花女子高等学校の敷地内に記念碑だけが残っているという。",
      "乙巳勒約(ウルサヌッチャク)が締結される場面もフィクションではない。1905年に実際にその条約が結ばれた重明殿(チュンミョンジョン)は、今もソウル・貞洞にそのまま残っていて、館内には関連の常設展示もあるという。実際に足を運んでみると、劇中で見たあの重みが少し違った形で伝わってくる。",
      "一方、劇中に登場する親日的な武力組織・武臣会(ムシンフェ)の日本国内の拠点は、実在する場所ではない。このサイトは確認されていない場所に勝手に座標を付けないという原則に従い、この項目は地図上に位置を表示していない。",
      "ソウル・貞洞を歩くこととは別に、ドラマの舞台となった1900年代の漢城(ハンソン)全体を実物大で再現した場所もある。忠清南道論山(ノンサン)の塔亭湖(タプチョンホ)付近には、近代様式の建物5棟、瓦屋根の家19棟、藁葺き屋根の家4棟、日本式家屋9棟が建てられた撮影セットがあり、今も観光地として開放されている。",
      "このドラマを見返すと、「時代劇ロマンス」という一言ではこの物語を語り尽くせないと感じる。奴婢の息子として生まれ、辛未洋擾(シンミヤンヨ)の直後に両親を失って米国へ渡ったユジン・チョイが、米海兵隊将校となって朝鮮に戻ってくる。一方、名門の主人になるはずだったコ・エシンは銃を手に取る。この二人が出会うということ自体が、身分制の朝鮮がすでに崩れ始めていた証拠なのだ。",
      "5人の主人公が抱えているものもそれぞれ違う。ユジンは復讐と帰属のあいだで、エシンは身分と信念のあいだで、武臣会出身のク・ドンメは生存と忠誠のあいだで、名門の子息キム・ヒソンは家門と良心のあいだで、日本の情報要員クドウ・ヒナは情報と人としての温かさのあいだで揺れ動く。この5つの軸が生み出す緊張感こそ、このドラマが単なるラブストーリーを超える理由だと思う。",
      "乙巳勒約が結ばれたという知らせが伝わった瞬間から、この5人の選択は後戻りできない方向へと動いていく。このドラマが本当に力を持っているのは、恋愛を前面に出しながらも、この歴史の重みを決して軽く扱わないところにある。",
      "高宗(コジョン)の強制退位と軍隊解散をきっかけに丁未義兵(チョンミウィビョン)が全国で蜂起する場面で、エシンをはじめとする人物たちが名もなき義兵として本格的に武力抗争へと身を投じていく過程を、このドラマは目をそらさずに正面から描いている。",
      "この5人がそれぞれどんな選択をし、どこへたどり着くのかは、ここでは明かさないでおく。ただ、このタイトルの奥に流れる本当の想いだけは先に伝えておきたい ― このドラマは恋物語であると同時に、名も残さず散っていった人々への遅すぎた手向けでもあるということだ。",
      "だから、このドラマを見終えてユジンとエシンの結末だけを覚えているとしたら、それは半分しか見ていないのと同じだと思う。名もなく散っていった義兵たち、そして彼らを記憶しようとするこのドラマの姿勢まで含めて、初めてこの物語は完成する。",
      "実際にソウルの貞洞一帯を歩いてみると、このドラマがどれほど具体的な歴史の上に立っているかが分かる。徳寿宮(トクスグン)の大漢門(テハンムン)から始まり、重明殿、旧ロシア公使館跡、貞洞第一教会まで歩いてみることをお勧めしたい。",
      "そして論山の塔亭湖に実際に建てられた1900年代漢城の撮影セットまで一緒に歩くと、この作品がなぜこれほど多くの人の心に残っているのか、実感できると思う。"
    ],
    title_ja:"ミスター・サンシャイン", summary_ja:"奴婢だった少年が米海兵隊将校となって朝鮮に戻り、名門の令嬢は身分を隠したまま義兵となる。大韓帝国末期の漢城(ハンソン)を舞台に、ユジン・チョイ、コ・エシン、ク・ドンメ、キム・ヒソン、クドウ・ヒナの5人が、それぞれの理由で同じ時代に絡み合っていく。これは恋物語であると同時に、名も残さず散っていった人々への遅すぎた手向けでもある。", author_ja:"tvN・キム・ウンスク脚本", era_ja:"1871年~1907年(辛未洋擾~高宗の強制退位・軍隊解散、大韓帝国期)",
    contentSummary:{ sections:[
      { heading:"엇갈린 출발, 조선으로 돌아오다", bullets:[
        "노비의 아들로 태어난 유진 초이가 신미양요 직후 부모를 잃고 미국으로 건너가 미 해병대 장교로 성장함",
        "명문가 손녀 고애신은 부모를 여의고 조부 슬하에서 자라며, 신분을 감춘 채 의병 활동에 발을 들이기 시작함",
        "1900년대 한성, 유진이 미 해병대 소속으로 조선에 부임하며 애신과 처음 마주침"
      ]},
      { heading:"다섯 사람, 같은 시대에 얽히다", bullets:[
        "무신회 출신 구동매가 애신의 가문과 얽힌 과거를 지닌 채 한성에서 무력 조직을 이끔",
        "명문가 자제 김희성이 정혼자인 애신과 우정에 가까운 관계를 유지하며 자신만의 선택을 고민함",
        "일본 정보요원 쿠도 히나가 글로리호텔을 거점으로 여러 세력 사이에서 정보를 거래함"
      ]},
      { heading:"역사가 인물들의 선택을 되돌릴 수 없게 만들다", bullets:[
        "을사늑약 체결 소식이 전해지며 다섯 사람 모두 각자의 방식으로 시대의 격변에 반응함",
        "고종의 강제 퇴위와 군대 해산으로 정미의병이 전국적으로 봉기함",
        "애신을 비롯한 인물들이 이름 없는 의병으로서 무력 항쟁에 본격적으로 뛰어듦"
      ]}
    ], endingNote:"유진과 애신을 비롯한 다섯 사람이 각자 어떤 선택을 내리고, 이름 없이 스러져간 이들의 이야기가 어떻게 마무리되는지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Daehanmun of deoksugung.JPG", credit:'덕수궁 대한문(미스터 션샤인의 실제 역사적 배경인 대한제국 정궁 정문) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Daehanmun_of_deoksugung.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%AF%B8%EC%8A%A4%ED%84%B0_%EC%85%A0%EC%83%A4%EC%9D%B8" },
  { id:"pachinko", title:"파친코 (Pachinko)", author:"이민진 원작 소설 · Apple TV+ 오리지널 시리즈", type:"historical", country:"korea", medium:"tv_drama", genres:["historical","drama","family"],
    lang:"ko", // 한국·재일코리안 이야기 — 일본향 SNS 검색도 함께 노출하되(오사카·도쿄 장소 비중이 크므로) 한국어 태그를 우선한다.
    // ※ 플랫폼은 Apple TV+이며 넷플릭스가 아니다(기획안 명시 정정 사항) — 절대 넷플릭스로 표기하지 않는다.
    // ※ 시즌 1·2, 총 16부작(2026-08 기준 공식 확정). 시즌3는 Apple 공식 발표 전까지 '미정'으로만 표기한다.
    // ※ 원작 소설(이민진, 2017)은 드라마와 별도 work이지만, 이 사이트는 franchise 연결 차원에서 하나의
    //   콘텐츠로 함께 다루며, 원작 고유 설정과 드라마 각색을 description에서 구분해 서술한다.
    // ※ 관동대지진 조선인 학살 관련 장소는 관광 상품처럼 소비하지 않는다는 원칙(기획안 8.1절)을 지킨다
    //   — pachinko_locations.js의 kanto_massacre_memorial 항목 참고.
    era:"1910년대~1989(부산 영도 출생~오사카 이주~도쿄 1989년대 금융 이야기)", title_en:"Pachinko", author_en:"Novel by Min Jin Lee · Apple TV+ Original Series", era_en:"1910s–1989 (from Sunja's birth on Yeongdo, Busan, through the family's move to Osaka, to the 1989 finance storyline in Tokyo)",
    summary:"부산 영도에서 태어난 선자가 오사카로 이주해 4대에 걸친 재일코리안 가족사를 이어가는 이야기. 사랑과 생존, 이주와 차별, 그리고 도쿄의 1989년 금융 세계까지 이어지는 가족의 선택들을 그린다. Apple TV+ 오리지널 시리즈(넷플릭스 아님)이며, 이민진의 2017년 동명 소설이 원작이다.",
    longSummary:"『파친코』를 다시 보면, 이 작품이 단순한 이민사 드라마가 아니라 '선택지를 빼앗긴 사람들이 그래도 무언가를 선택해야 했던' 이야기라는 걸 느끼게 된다. 부산 영도의 가난한 하숙집에서 태어난 선자는 상인 한수를 만나 사랑에 빠지지만, 그가 이미 가정을 가진 사람이라는 걸 알게 된 뒤 목사 이삭의 청혼을 받아들여 오사카로 떠난다. 이 결정 하나가 이후 4대에 걸친 가족의 지리와 운명을 결정짓는다.\n\n오사카에서 선자와 가족이 마주하는 건 낯선 언어와 극심한 차별, 그리고 이카이노(현재의 이쿠노 코리아타운)라는 좁은 거주지에서의 생존이다. 이삭이 신념 때문에 체포된 뒤 선자와 형수 경희가 김치를 팔며 가족을 부양하는 장면은, 이 작품이 왜 여성의 노동과 생존을 서사의 중심에 놓는지 보여준다. 아들 노아와 모자수는 같은 차별 앞에서 전혀 다른 길을 걷는다 — 노아는 완벽한 일본인으로 인정받으려 하고, 모자수는 맞서 싸우며 파친코 업계에서 자신만의 자리를 만든다.\n\n1989년 도쿄로 넘어가면 이야기는 손자 솔로몬의 세대로 확장된다. 미국에서 교육받고 국제 금융회사에 들어간 솔로몬은 표면적으로는 가족이 꿈꾸던 성공을 이뤘지만, 한금자 할머니의 땅을 사들여야 하는 거래 앞에서 무엇을 위해 누구의 기억을 지우고 있는지 스스로 묻게 된다. 관동대지진 당시 조선인을 향한 폭력, 전쟁과 피난, 전후 재편까지 — 이 작품은 실제 역사를 배경으로 삼으면서도 이를 자극적으로 소비하지 않으려 애쓴다.\n\n부산 영도의 실제 촬영지와 오사카 이카이노(현 이쿠노)의 재일코리안 생활권, 그리고 순천·논산·양동마을 등 한국 곳곳에 조성된 시대극 세트까지 — 이 작품이 그리는 100년 가까운 이주의 지리를 실제로 따라가 보면, 왜 이 시리즈가 그토록 많은 이들에게 '가족의 이야기'로 다가왔는지 실감하게 된다.",
    pinColor:"#7a3b2e",
    summary_en:"Born on Yeongdo Island in Busan, Sunja moves to Osaka and carries a four-generation Zainichi Korean family story forward through love, survival, migration, and discrimination — all the way to a 1989 finance storyline in Tokyo. This is an Apple TV+ original series (not Netflix), based on Min Jin Lee's 2017 novel of the same name.",
    longSummary_en:"Watching Pachinko again, you realize this isn't simply an immigration drama — it's a story about people who had their choices taken away, and who still had to choose something. Born into a poor boarding house on Yeongdo, Busan, Sunja falls for the merchant Hansu, but after learning he already has a family in Japan, she accepts a marriage proposal from the pastor Isak and leaves for Osaka. That single decision shapes the geography and fate of four generations to come.\n\nIn Osaka, Sunja and her family face an unfamiliar language, harsh discrimination, and survival within Ikaino (today's Ikuno Koreatown), a cramped Korean enclave. After Isak is arrested for his convictions, Sunja and her sister-in-law Kyunghee support the family by selling kimchi — a scene that shows why this story places women's labor and survival at its center. Facing the same discrimination, sons Noa and Mozasu take entirely different paths: Noa tries to be recognized as a perfect Japanese citizen, while Mozasu fights back and carves out his own place in the pachinko industry.\n\nBy 1989 Tokyo, the story expands to grandson Solomon's generation. Educated in America and working at an international finance firm, Solomon appears to have achieved the success his family once dreamed of — but when he's tasked with buying out an elderly woman named Han Geumja's land, he's forced to ask himself whose memory he's erasing, and for what. Violence against Koreans during the Great Kanto Earthquake, wartime displacement, and postwar upheaval all form the historical backdrop — and the show works hard not to treat any of it as spectacle.\n\nFollowing the real geography this series traces — actual filming locations on Yeongdo in Busan, the Zainichi Korean community of Ikaino (today's Ikuno), and the period sets built across Suncheon, Nonsan, and Yangdong Village in Korea — makes clear why this nearly century-long story of migration has resonated with so many as a story about family.",
    communityNote:"『파친코』는 이민진의 2017년 동명 소설을 원작으로 한 Apple TV+ 오리지널 시리즈로, 소지아 라이·이민호·김민하·윤여정·진하 등이 출연했다. 시즌 1·2 총 16부작이 공개됐으며(2026-08 기준), 시즌 3는 Apple 공식 발표 전까지 미정으로 관리한다. 사용자 요청 단계에서 '넷플릭스 드라마'로 잘못 알려진 경우가 있었으나, 확인 결과 Apple TV+ 오리지널이 맞다. 한국어·일본어·영어 3개 언어가 극 중에서 함께 쓰이며, 언어 선택 자체가 인물의 소속감과 권력관계를 보여주는 장치로 쓰인다. 이 사이트는 원작 소설과 드라마 각색을 구분해 다루며, 관동대지진 조선인 희생 등 민감한 역사는 자극적으로 다루지 않는다(기획안 8.1절 원칙).",
    communityNote_en:"Pachinko is an Apple TV+ original series based on Min Jin Lee's 2017 novel of the same name, starring Soji Arai, Lee Min-ho, Kim Min-ha, Youn Yuh-jung, and Jin Ha, among others. Seasons 1 and 2 (16 episodes total) have been released as of August 2026; Season 3 remains unconfirmed pending an official Apple announcement. It was initially misidentified in some requests as a 'Netflix drama,' but research confirms it is an Apple TV+ original. Korean, Japanese, and English are all used within the show, with language choice itself serving as a device that reveals characters' belonging and power relationships. This site distinguishes between the original novel and the TV adaptation, and treats sensitive history such as the Great Kanto Earthquake violence against Koreans without sensationalizing it, in line with the planning document's ethics principle (section 8.1).",
    hookBadge:"Apple TV+ · 이민진 원작 소설 · 촬영지 & 진짜 이야기",
    hookTagline:"파친코, 그 장소들은 지금 어디에 있을까?",
    discoveryHook:[
      "《파친코》 다 보고 나서 자꾸 검색창에 쳐보게 되는 게 있었다.",
      "일단 이거부터. 나는 계속 넷플릭스 드라마인 줄 알았는데 아니었다. Apple TV+ 오리지널이더라. 검색해보니 나만 헷갈린 게 아니었다.",
      "선자가 살던 오사카 동네 이름, 이카이노도 마찬가지였다. 지도에 쳐도 안 나온다.",
      "1973년 행정구역 개편으로 그 이름 자체가 지워졌기 때문이다. 지금은 이쿠노구라는 이름으로만 남아 있다.",
      "부산 영도의 그 하숙집도 실제로는 없다. 알고 보니 경주 양동마을, 유네스코 세계문화유산 마을에 통째로 세트를 지어서 찍었다고.",
      "대신 선자가 걷던 바다는 진짜였다. 태종대, 감지해변 — 부산영상위원회가 공식적으로 확인해준 촬영지들.",
      "그리고 이건 좀 다시 생각하게 된 부분인데, 선자가 처음 사랑에 빠진 사람은 이삭이 아니라 한수였다. 이미 가정이 있는 남자라는 걸 알고서야 이삭의 청혼을 받아들여 오사카로 떠난 거다.",
      "그러니까 노아의 출생을 둘러싼 그 '비밀'이라는 게, 사실 선자 본인은 처음부터 알고 있던 셈이다. 몰랐던 건 노아였다.",
      "이삭이 신념 때문에 체포된 뒤로는 선자랑 형수 경희가 김치를 팔아 가족을 먹여 살렸다는 것도 새삼 크게 다가왔다. 이 드라마가 왜 이렇게 여자들의 노동을 오래 비추는지 알 것 같았다.",
      "노아랑 모자수, 같은 차별을 겪고도 완전히 다른 길을 택한다. 노아는 완벽한 일본인으로 인정받으려 하고, 모자수는 맞서 싸우면서 파친코 업계에서 자기 자리를 만든다.",
      "그 선택의 무게가 나중에 노아한테 어떻게 돌아오는지 알고 나면, 앞부분에서 노아가 그렇게까지 '모범생'이 되려 했던 이유가 다르게 읽힌다.",
      "1989년 도쿄로 넘어가면 손자 솔로몬 세대다. 미국에서 교육받고 국제 금융회사에 들어간 솔로몬이, 한금자 할머니 땅을 사들여야 하는 거래를 맡게 되는 장면이 나온다.",
      "가족이 그렇게 바라던 '성공'을 이룬 솔로몬이, 정작 자기가 무엇을 위해 누구의 기억을 지우고 있는지 스스로 묻게 되는 장면. 이게 이 드라마가 진짜 하고 싶었던 말이 아닐까 싶었다.",
      "관동대지진 때 조선인들을 향했던 폭력도 배경으로 나온다. 자극적으로 다루지 않으려고 애쓴 티가 나는데, 그래서 더 마음에 남았다.",
      "결국 4대에 걸친 이 가족 이야기를 따라가다 보면, 이게 그냥 '이민사'가 아니라 선택지를 빼앗긴 사람들이 그래도 뭔가를 선택해야 했던 이야기라는 생각이 든다.",
      "부산 가면 태종대 바다부터 걸어보고 싶다. 선자가 실제로 걸었던 그 해안이니까.",
      "오사카 가면 이쿠노 코리아타운에서 이카이노의 흔적도 한번 찾아보고 싶고. 지도에 없는 동네를 걷는다는 게, 이 드라마를 보고 나면 좀 다른 의미로 다가올 것 같다."
    ],
    hookReveals:[
      { label:"넷플릭스 아님 → Apple TV+ 오리지널", label_en:"Not Netflix → an Apple TV+ original", locId:null },
      { label:"이카이노 → 1973년 지도에서 지워진 이름, 지금의 이쿠노", label_en:"Ikaino → erased from maps in 1973, now Ikuno", locId:"ikaino" },
      { label:"영도 하숙집 → 실제로는 경주 양동마을 세트", label_en:"The boarding house → actually a set in Gyeongju's Yangdong Village", locId:"yangdong_village" },
      { label:"선자가 걷던 바다 → 태종대, 진짜 촬영지", label_en:"The sea Sunja walks → Taejongdae, a real filming location", locId:"taejongdae" }
    ],
    hookBadge_en:"Apple TV+ · Based on Min Jin Lee's novel · Filming locations & the real story",
    hookTagline_en:"Pachinko: where are these places, really?",
    discoveryHook_en:[
      "After finishing Pachinko, there was a search I kept typing into the browser without really planning to.",
      "First thing: I thought this was a Netflix show. It's not — it's an Apple TV+ original. Turns out I wasn't the only one confused.",
      "Ikaino, the Osaka neighborhood where Sunja's family lives, was next. Pull up a map today and it doesn't exist.",
      "That's because the name itself was erased in a 1973 administrative reorganization. All that's left now is what's called Ikuno.",
      "The Yeongdo boarding house isn't real either — the production built the whole thing from scratch at Yangdong Village, a UNESCO World Heritage site in Gyeongju.",
      "But the sea Sunja walks along is real. Taejongdae, Gamji Beach — both officially confirmed filming locations from the Busan Film Commission.",
      "Here's the part that made me rethink things — the first man Sunja falls for isn't Isak, it's Hansu. She only accepts Isak's proposal and leaves for Osaka after learning Hansu already has a family.",
      "Which means the 'secret' surrounding Noa's birth isn't really a secret to Sunja at all — she's known from the start. It's Noa who doesn't.",
      "It also hit differently, knowing that after Isak is arrested for his convictions, it's Sunja and her sister-in-law Kyunghee who keep the family fed by selling kimchi. Suddenly it made sense why this show spends so much time on women's labor.",
      "Noa and Mozasu face the same discrimination and choose completely different paths. Noa tries to be recognized as the perfect Japanese citizen; Mozasu fights back and carves out his own place in the pachinko business.",
      "Once you know where that choice eventually leads Noa, the earlier scenes of him trying so hard to be the 'model student' read completely differently.",
      "By 1989 Tokyo, it's grandson Solomon's turn. Educated in America and working at an international finance firm, he's handed a deal that requires buying out an elderly woman named Han Geumja's land.",
      "Solomon has achieved exactly the success his family dreamed of — and yet he's forced to ask himself what he's erasing, and whose memory, to get it. I think that's what this show actually wanted to say.",
      "Violence against Koreans during the Great Kanto Earthquake shows up in the background too. You can tell the show is trying hard not to sensationalize it, which somehow makes it land harder.",
      "Following this family across four generations, you realize it's not really an immigration story — it's a story about people who had their choices taken away and still had to choose something.",
      "If I make it to Busan, I want to walk that stretch of coast at Taejongdae first — the same water Sunja actually walked.",
      "And in Osaka, I'd want to go looking for what's left of Ikaino in today's Ikuno Koreatown. Walking a neighborhood that doesn't exist on any map hits differently once you've watched this show."
    ],
    discoveryHook_ja:[
      "『パチンコ』を見終わった後、なぜか検索窓に打ち込みたくなったことがいくつかあった。",
      "まずこれ。てっきりNetflixのドラマだと思っていたけど違った。Apple TV+のオリジナルだったのだ。調べてみると、勘違いしていたのは自分だけじゃなかったらしい。",
      "ソンジャが暮らしていた大阪の町、猪飼野(イカイノ)も同じだった。地図で検索しても出てこない。",
      "1973年の行政区域再編で、その地名自体が消されてしまったからだ。今は生野区という名前でしか残っていない。",
      "釜山・影島の下宿屋も実在しない。実は慶州の良洞村、ユネスコ世界遺産の村に丸ごとセットを建てて撮影したのだという。",
      "でもソンジャが歩いていた海は本物だった。太宗台、甘川海水浴場——釜山映像委員会が公式に確認しているロケ地だ。",
      "そしてこれは少し考え直させられた部分なのだが、ソンジャが最初に恋に落ちた相手はイサクではなくハンスだった。彼にすでに家庭があると知って初めて、イサクのプロポーズを受けて大阪へ渡ったのだ。",
      "つまりノアの出生をめぐる「秘密」というのは、実はソンジャ本人は最初から知っていたことになる。知らなかったのはノアの方だった。",
      "信念のためにイサクが逮捕された後、ソンジャと義姉キョンヒがキムチを売って家族を養っていたという話も、改めて重く感じた。このドラマがなぜあれほど女性の労働を長く映すのか、腑に落ちた気がした。",
      "ノアとモーザスは同じ差別を受けながら、まったく違う道を選ぶ。ノアは完璧な日本人として認められようとし、モーザスは真正面から闘いながらパチンコ業界で自分の居場所を作っていく。",
      "その選択がのちにノアにどう返ってくるかを知ると、序盤で彼があそこまで「優等生」になろうとしていた理由が、まったく違って見えてくる。",
      "1989年の東京に舞台が移ると、孫のソロモンの世代になる。アメリカで教育を受け、国際金融会社に勤めるソロモンが、ハン・グムジャという老女の土地を買い取らなければならない取引を任される場面が出てくる。",
      "家族が夢見てきた「成功」をまさに手にしたはずのソロモンが、自分は何のために、誰の記憶を消そうとしているのかを自問する場面。これこそがこのドラマが本当に言いたかったことなんじゃないかと思った。",
      "関東大震災の際に朝鮮人に向けられた暴力も背景として描かれる。あえて刺激的に扱わないようにしている様子が伝わってきて、だからこそ余計に心に残った。",
      "四世代にわたるこの家族の物語を追っていくと、これは単なる「移民の物語」ではなく、選択肢を奪われた人たちがそれでも何かを選ばなければならなかった物語なのだと感じる。",
      "釜山に行ったら、まずは太宗台の海岸を歩いてみたい。ソンジャが実際に歩いた、その海だから。",
      "大阪に行ったら、生野コリアタウンで猪飼野の名残も探してみたい。地図に載っていない町を歩くということが、このドラマを見た後だとまた違う意味を持つ気がする。"
    ],
    title_ja:"パチンコ", summary_ja:"釜山の影島(ヨンド)で生まれたソンジャが大阪へ移住し、四代にわたる在日コリアンの家族史をつないでいく物語。愛と生存、移住と差別、そして東京の1989年の金融の世界にまで続く家族の選択を描く。Apple TV+オリジナルシリーズ(Netflixではない)であり、ミン・ジン・リーの2017年の同名小説が原作である。", author_ja:"ミン・ジン・リー原作小説・Apple TV+オリジナルシリーズ", era_ja:"1910年代~1989年(釜山・影島生まれ~大阪移住~東京1989年の金融の物語)",
    contentSummary:{ sections:[
      { heading:"영도에서 시작되는 이야기", bullets:[
        "부산 영도의 작은 하숙집, 훈이와 양진 부부 사이에서 선자가 태어나 바다와 시장을 오가며 자람",
        "청년이 된 선자가 어시장에서 만난 상인 한수에게 마음을 열지만, 그가 이미 일본에 가정을 둔 사람이라는 사실을 알게 됨",
        "몸이 아픈 채로 오사카로 향하던 목사 이삭이 영도 하숙집에 머물게 되고, 선자의 상황을 알고도 심판 대신 책임을 선택함"
      ]},
      { heading:"오사카, 낯선 땅에서 가족을 이루다", bullets:[
        "선자와 이삭이 결혼해 함께 오사카로 이주하고, 이삭의 형 요셉과 형수 경희가 두 사람을 맞이함",
        "조선인 거주지 이카이노에서 아들 노아와 모자수가 태어나며, 교회·공장·시장을 중심으로 한 생활 공동체가 형성됨",
        "이삭이 신념 때문에 일본 경찰에 체포되면서, 선자와 경희가 김치 장사로 생계를 책임지는 여성 가장이 됨"
      ]},
      { heading:"전쟁을 통과하는 가족", bullets:[
        "태평양전쟁이 격화되며 오사카 역시 공습과 식량난에 시달리고, 가족은 도시를 떠나 일본 농촌으로 피난함",
        "노아는 뛰어난 학업 성취로 일본 사회에서 인정받으려 하고, 모자수는 학교 폭력에 맞서 싸우며 서로 다른 방식으로 차별에 반응함"
      ]},
      { heading:"다음 세대, 도쿄로 이어지는 이야기", bullets:[
        "성인이 된 모자수는 파친코 사업으로 자리를 잡고, 아들 솔로몬에게 더 넓은 기회를 주기 위해 미국 교육을 지원함",
        "1989년, 도쿄의 국제 금융회사에서 일하게 된 솔로몬이 한금자 노인의 땅을 사들여야 하는 대형 개발 거래를 맡음",
        "노년의 선자는 오랜만에 가족의 뿌리와 고향의 기억을 다시 마주하게 됨"
      ]}
    ], endingNote:"노아를 둘러싼 출생의 비밀, 그리고 솔로몬과 선자가 각자 어떤 선택을 내리는지는 작품에서 직접 확인하세요(시즌 2 기준)." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Yeongdodaegyo(Yeongdo Bridge).jpg", credit:'영도대교, 부산(파친코 주인공 선자의 고향인 영도의 실제 다리) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Yeongdodaegyo(Yeongdo_Bridge).jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%B9%9C%EC%BD%94_(%EB%93%9C%EB%9D%BC%EB%A7%88)" },
  { id:"namiya", title:"나미야 잡화점의 기적 (ナミヤ雑貨店の奇蹟)", author:"히가시노 게이고 장편소설", type:"mystery", country:"japan", medium:"novel", genres:["drama","mystery","fantasy"],
    lang:"ja", // 일본 소설 원작 — 일본어 태그/야후재팬 등 일본향 SNS 검색 로직을 적용한다.
    memorial:true, // 2026-08 추모 특집 표시 플래그 — 랜딩 배너·카드에서 별도 처리
    // ※ 2026년 7월 23일 별세한 히가시노 게이고 작가를 추모하며 추가한 특집 콘텐츠.
    // ※ 나미야 잡화점·환광원은 작가가 실제 지명을 밝히지 않은 가공의 공간이라 좌표를 표시하지 않는다
    //   (대망·미스터 션샤인의 가공 설정 처리 원칙과 동일 — namiya_locations.js 참고).
    // ※ 2017년 실사 영화의 실제 촬영지(오이타현 분고타카다시 쇼와노마치)와, 작가의 실제 고향(오사카
    //   이쿠노구)·모교·경력·수상 관련 실존 장소를 함께 담아 '작품 속 기적'과 '작가의 발자취'를 모두 소개한다.
    era:"쇼와시대~현대(작중 시간대는 편지를 통해 과거·현재가 교차)", title_en:"The Miracles of the Namiya General Store", title_ja:"ナミヤ雑貨店の奇蹟", author_en:"Novel by Keigo Higashino", author_ja:"東野圭吾 長編小説", era_en:"Showa era to present (the story crosses past and present through time-traveling letters)", era_ja:"昭和から現代へ(物語は手紙を通じて過去と現在を行き来する)",
    summary:"30년 넘게 문을 닫은 나미야 잡화점에 우연히 숨어든 좀도둑 3인방이, 셔터 우유 상자에 꽂힌 낯선 편지 한 장을 발견하며 벌어지는 이야기. 장난삼아 써 보낸 답장이 32년 전 과거로 전해지고, 그렇게 이어진 편지들이 서로 다른 시간을 살아가는 사람들의 삶을 조용히 바꿔놓는다. 2026년 7월 별세한 히가시노 게이고의 대표작 중 하나를 추모하며 소개한다.",
    longSummary:"『나미야 잡화점의 기적』을 다시 펼치면, 이 작품이 히가시노 게이고라는 작가의 또 다른 얼굴을 보여준다는 걸 새삼 느끼게 된다. 『백야행』이나 『용의자 X의 헌신』처럼 치밀한 트릭과 인간의 어두운 면을 파고들던 그가, 이 소설에서는 정반대의 질문을 던진다 — 누군가의 진심 어린 답장 한 장이 다른 사람의 인생을 정말 바꿀 수 있을까?\n\n좀도둑 3인방 쇼타·아쓰야·고헤이가 우연히 숨어든 폐가는 사실 30여 년 전 실제로 운영되던 고민상담 잡화점이었다. 셔터 우유 상자에 꽂힌 편지 한 장을 발견한 세 사람은 장난삼아 답장을 쓰지만, 그 답장이 시간을 거슬러 32년 전의 발신인에게 전달된다는 사실을 깨닫게 된다. 펜싱선수 '달 토끼', 무명 뮤지션 '생선가게 예술가', 미혼모가 된 '그린 리버', 몰락한 사업가의 아들 '폴 레논' — 서로 다른 시대를 살아가는 이들의 고민이 편지를 매개로 얽히고설킨다.\n\n이 소설이 정말 힘을 갖는 건, 환광원이라는 보육시설을 거쳐 간 인물들의 상처와 회복을 놓치지 않는다는 점이다. 설립자 미나즈키 아키코가 남긴 '하늘 위에서 모두를 위해 기도하겠다'는 유언은, 나미야 잡화점과 얽힌 모든 인물의 행복을 바라는 마음으로 작품 전체에 스며든다. 좀도둑이었던 세 사람조차 결국 각자 나름의 방식으로 삶의 방향을 찾아간다.\n\n2017년에는 야마다 료스케 주연으로 실사 영화화됐는데, 쇼와시대 후반을 배경으로 한 작품의 특성상 옛 거리 풍경이 그대로 남아 있는 오이타현 분고타카다시의 '쇼와노마치'가 촬영지로 선택됐다. 촬영을 위해 지어졌던 오픈세트는 철거됐지만, 영화의 인기에 힘입어 상점가 한켠에 다시 재현되어 지금도 관광객을 맞고 있다. 2026년 7월 23일, 이 소설을 포함해 106권의 저서를 남긴 히가시노 게이고가 대장암으로 세상을 떠났다는 소식이 전해졌다. 오사카 이쿠노구에서 태어나 엔지니어의 길을 걷다 1985년 에도가와 란포상으로 작가의 길에 들어선 그의 발자취를 이 페이지에서 함께 되짚어본다.",
    pinColor:"#5a4a3a",
    summary_en:"Three small-time thieves hide out in the long-shuttered Namiya General Store and discover a strange letter tucked into the old milk box on the shutter. Their reply, written as a joke, somehow reaches the letter's sender — 32 years in the past. The chain of letters that follows quietly reshapes the lives of people living in different eras. This page is presented in memory of Keigo Higashino, who passed away in July 2026.",
    summary_ja:"30年以上シャッターを閉ざしたままのナミヤ雑貨店に、こそ泥3人組が偶然身を隠し、シャッターの牛乳箱に差し込まれた見知らぬ手紙を見つける。悪ふざけで書いた返事が32年前の過去へ届き、そうしてつながった手紙が、異なる時代を生きる人々の人生を静かに変えていく。2026年7月に亡くなった東野圭吾の代表作の一つを、追悼の思いを込めて紹介する。",
    longSummary_en:"Returning to The Miracles of the Namiya General Store, you see a different side of Keigo Higashino than the meticulous, dark-edged puzzle plots of Journey Under the Midnight Sun or The Devotion of Suspect X. Here he asks the opposite question: can one person's sincere reply really change someone else's life?\n\nThe abandoned building that thieves Shota, Atsuya, and Kohei stumble into turns out to be a former advice shop that operated more than thirty years earlier. Finding a letter in the shutter's milk box, they write a reply as a joke — only to realize it has somehow reached the letter's sender 32 years in the past. A fencer nicknamed \"Moon Rabbit,\" an unknown musician called \"the Fishmonger Artist,\" a single mother going by \"Green River,\" and the son of a ruined businessman known as \"Paul Lennon\" — each living in a different era — find their troubles tangled together through the letters.\n\nWhat gives the novel its real power is how it never loses sight of the wounds and healing of the people who passed through Marumitsuen, an orphanage in the story. Founder Akiko Minazuki's dying wish — \"don't worry, I'll pray for everyone from up in heaven\" — runs through the whole book as a wish for the happiness of everyone connected to the Namiya store, thieves included.\n\nIn 2017 it was adapted into a live-action film starring Ryosuke Yamada. Because the story is set in the late Showa era, Bungotakada City's \"Showa-no-machi\" district in Oita Prefecture — which still preserves its old streetscape — was chosen as the filming location. The open set built for filming was later dismantled, but thanks to the film's popularity it was recreated along the shopping street and still welcomes visitors today. On July 23, 2026, news broke that Keigo Higashino, who left behind 106 books including this one, had passed away from colorectal cancer. Born in Osaka's Ikuno Ward and trained as an engineer before winning the Edogawa Rampo Award in 1985, his path to becoming a novelist is traced across this page.",
    communityNote:"『나미야 잡화점의 기적』은 히가시노 게이고가 2012년 발표한 장편소설로, 2013년 서점대상 2위에 오르는 등 그의 대표작 중 하나로 꼽힌다. 2017년 야마다 료스케·니시지마 히데토시 주연의 일본 실사 영화로, 같은 해 중국에서도 영화화됐다. 2027년에는 디즈니+를 통해 한국 드라마 버전이 공개될 예정이라는 소식도 있다. 히가시노 게이고는 1958년 2월 4일 오사카시 이쿠노구에서 태어나 오사카부립대학(현 오사카공립대학) 전기공학과를 졸업하고 자동차 부품업체 덴소에서 엔지니어로 근무하다, 1985년 데뷔작 『방과 후』로 제31회 에도가와 란포상을 수상하며 전업 작가가 됐다. 2006년 『용의자 X의 헌신』으로 제134회 나오키상을 수상했고, 국내 누적 발행부수 1억 부를 넘긴 것으로 알려진 일본 추리소설의 거장이다. 2026년 7월 23일 새벽 대장암으로 별세했으며, 향년 68세. 소식은 7월 27일 출판사 고단샤가 공식 발표했고 가족장으로 장례가 치러졌다. 유작 『영원의 기억』(갈릴레오 시리즈 11번째 장편)이 2026년 8월 출간됐다.",
    communityNote_en:"The Miracles of the Namiya General Store is a 2012 novel by Keigo Higashino, ranked No. 2 in Japan's 2013 Booksellers' Award and counted among his signature works. It was adapted into a Japanese live-action film in 2017 starring Ryosuke Yamada and Hidetoshi Nishijima, and into a Chinese film the same year; a Korean drama version is reportedly planned for release on Disney+ in 2027. Higashino was born February 4, 1958, in Osaka's Ikuno Ward, graduated in electrical engineering from Osaka Prefecture University (now Osaka Metropolitan University), and worked as an engineer at auto-parts maker Denso before winning the 31st Edogawa Rampo Award in 1985 for his debut novel After School, launching his career as a full-time writer. He won the 134th Naoki Prize in 2006 for The Devotion of Suspect X and is regarded as a giant of Japanese mystery fiction, with cumulative domestic sales reportedly surpassing 100 million copies. He passed away from colorectal cancer in the early hours of July 23, 2026, at age 68. Publisher Kodansha announced his death on July 27, and a private family funeral was held. His final work, Eien no Kioku (the 11th full-length entry in his Detective Galileo series), was published in August 2026.",
    hookBadge:"히가시노 게이고 · 오이타 촬영지 · 영화 속 그곳",
    hookTagline:"나미야 잡화점, 진짜 어딘가에 있을 것 같았다",
    discoveryHook:[
      "밤에 편지를 넣어보고 싶은 그런 곳. 히가시노 게이고를 좋아해서 그런지 《나미야 잡화점의 기적》은 이상하게 장소가 오래 기억에 남았다.",
      "엄청 화려한 곳도 아닌데, 밤늦게 불 켜진 오래된 잡화점 하나. 문 닫은 가게 우편함에 고민을 적어 넣으면 과거에서 답장이 온다는 설정도 너무 좋았고.",
      "그래서 가끔 생각했다. 일본 어딘가에 진짜 저런 가게 하나쯤 있지 않을까.",
      "소설 속 나미야 잡화점은 가상의 장소지만, 영화에서는 일본 오이타현 분고타카다라는 작은 도시에서 그 모습을 만들었다. 영화에 나온 잡화점은 실제 오래된 가게가 아니라 미야마치 상점가에 따로 만든 세트였다. 촬영이 끝난 뒤에는 철거됐다.",
      "이건 조금 아쉽다. 괜히 일본 가면 문 한번 열어보고 싶었는데. 그래도 영화에 쓰였던 나미야 잡화점 간판은 아직 남아 있다. 근처 쇼와로망창고에 보관돼 있다고 한다.",
      "그리고 잡화점만 없어졌을 뿐, 영화에서 보던 주변 풍경은 꽤 많이 남아 있다. 아츠야와 친구들이 뛰어다니던 상점가, 가쓰라바시, 오자키 해안. 영화 마지막에 세리가 'Reborn'에 맞춰 춤추던 마타마 해안도 실제 장소다.",
      "여긴 조금 가보고 싶다. 물이 빠지면 모래 위에 물결 같은 무늬가 생기고, 그 위로 해가 지는데 사진만 봐도 영화 분위기가 난다.",
      "이야기를 다시 곱씹어보면, 좀도둑 세 사람이 하룻밤 숨어든 곳이 하필 나미야 잡화점이었다는 것부터가 이미 우연이 아니다. 이 소설은 처음부터 '아무 상관 없어 보이는 사람들이 사실은 한 곳에서 이어져 있었다'는 구조로 짜여 있다.",
      "그 이어짐의 중심에 환광원이라는 보육시설이 있다. 편지를 주고받는 펜싱선수도, 무명 뮤지션도, 미혼모가 된 여성도, 몰락한 사업가의 아들도 — 서로 다른 시대를 살면서도 결국 이 시설과, 그리고 나미야 잡화점의 편지들과 어딘가에서 맞닿아 있다.",
      "환광원을 세운 미나즈키 아키코가 남긴 마지막 말이 '하늘 위에서 모두를 위해 기도하겠다'였다는 걸 알고 나면, 소설 전체가 다르게 읽힌다. 등장인물 하나하나의 사연이 사실은 이 한마디를 향해 흘러가고 있었던 셈이다.",
      "그리고 이 동네 이야기가 작품이랑 묘하게 닮아 있다. 분고타카다의 오래된 상점가는 한때 사람이 거의 찾지 않는 곳이었다. 그런데 낡은 가게와 간판을 다 없애버리는 대신 그대로 살려서 '쇼와의 마을'로 만들었고, 지금은 사람들이 일부러 찾아오는 곳이 됐다.",
      "《나미야 잡화점의 기적》이 결국 누군가의 작은 말 하나가 다른 사람의 인생을 바꾸는 이야기잖아. 그래서인지 사라질 뻔했던 동네가 다시 살아났다는 이야기도 괜히 잘 어울린다.",
      "2026년 7월, 이 소설을 쓴 히가시노 게이고가 세상을 떠났다는 소식을 들었을 때 제일 먼저 이 잡화점이 떠올랐다. 오사카 이쿠노구에서 태어나 엔지니어로 일하다 서른 넘어 작가가 된 사람이, 정작 자기 대표작에서는 '답장 한 줄이 사람을 구할 수도 있다'는 이야기를 썼다는 게 새삼 마음에 남았다.",
      "나는 아직 분고타카다에 가본 적은 없지만, 언젠가 가게 된다면 영화 세트가 없다는 게 그렇게 아쉽지는 않을 것 같다. 오래된 골목 좀 걷다가 나미야 잡화점이 있던 자리에 한번 서보고, 마지막에는 마타마 해안에서 해 지는 걸 보고 싶다.",
      "그러다 골목 어딘가에서 오래된 우편함 하나 발견하면, 아마 잠깐은 이런 생각도 할 것 같다. \"여기에 편지 넣으면 답장 오려나.\""
    ],
    hookReveals:[
      { label:"영화 속 나미야 잡화점 → 오이타현 분고타카다 미야마치 상점가 세트(촬영 후 철거)", label_en:"The film's Namiya store → a set built on Bungotakada's Miyamachi shopping street, torn down after filming", label_ja:"映画のナミヤ雑貨店 → 豊後高田・宮町商店街に建てられたセット(撮影後に撤去)", locId:"bungotakada_showamachi" },
      { label:"영화에 쓰인 간판 → 인근 쇼와로망창고에 보관", label_en:"The film's actual store sign → preserved at the nearby Showa Romance Warehouse", label_ja:"映画で使われた看板 → 近くの昭和ロマン蔵に保管", locId:null },
      { label:"세리가 'Reborn'에 맞춰 춤추던 마지막 장면 → 마타마 해안", label_en:"Seri's final 'Reborn' dance scene → Matama Beach", label_ja:"芹の「Reborn」ラストダンスシーン → マタマ海岸", locId:null },
      { label:"한때 사람이 찾지 않던 상점가 → '쇼와의 마을'로 되살아나 지금은 관광지", label_en:"A once-empty shopping street → revived as 'Showa Village,' now a real destination", label_ja:"かつて人が訪れなかった商店街 → 「昭和の町」として蘇り、今は人気の観光地", locId:"bungotakada_showamachi" }
    ],
    hookBadge_en:"Keigo Higashino · The Oita film set · A real place from a movie",
    hookTagline_en:"I felt like the Namiya General Store had to be real somewhere",
    discoveryHook_en:[
      "A place you'd want to slip a letter into, late at night. Maybe because I like Keigo Higashino, but The Miracles of the Namiya General Store is one of those stories where the setting stuck with me longer than usual.",
      "It's not flashy at all — just one old general store with its lights on late at night. And the idea that if you write down a worry and slip it through the mail slot of a closed shop, an answer comes back from the past? I loved that.",
      "So I'd sometimes wonder — isn't there a store like that somewhere in Japan, for real?",
      "In the novel, the Namiya store is fictional, but the film recreated it in a small city called Bungotakada in Oita Prefecture. The store you see in the movie wasn't an actual old shop — it was a set built specifically along the Miyamachi shopping street. It was torn down after filming wrapped.",
      "That part's a little disappointing. I'd have loved to open that door if I ever visited Japan. Still, the actual Namiya store sign used in the film is apparently still around, kept nearby at the Showa Romance Warehouse.",
      "And even though the store itself is gone, a lot of the surrounding scenery from the film is still there. The shopping street where Atsuya and his friends used to run around, Katsura Bridge, Ozaki Beach. Even Matama Beach, where Seri dances to 'Reborn' at the very end, is a real place.",
      "I kind of want to see that one. When the tide goes out, it leaves these wave-like ripples in the sand, and with the sun setting over them, even the photos alone feel like the movie.",
      "Looking back at the story, it's no accident that the three thieves happen to hide out in the Namiya store of all places. The whole novel is built around the idea that people who seem to have nothing to do with each other turn out to be quietly connected through one place.",
      "At the center of that web is Marumitsuen, the children's home in the story. The fencer, the struggling musician, the woman who became a single mother, the ruined businessman's son — all living in different eras, all end up tied back to this home, and to the letters passing through the Namiya store.",
      "Once you know that the home's founder, Akiko Minazuki, left the words 'don't worry, I'll pray for everyone from up in heaven' as her final wish, the whole book reads differently. Every character's story turns out to be quietly flowing toward that one line.",
      "And there's something oddly fitting about this town's own story. Bungotakada's old shopping street used to be a place almost nobody visited. Instead of tearing down the worn-out shops and signs, they kept them as they were and turned it into a 'Showa Village' — and now people go out of their way to visit.",
      "The Miracles of the Namiya General Store is, in the end, a story about how one small word from someone can change another person's life. Maybe that's why it fits so well that a town that nearly disappeared came back to life too.",
      "When I heard in July 2026 that Keigo Higashino, the author of this novel, had passed away, this store was the first thing that came to mind. A man born in Osaka's Ikuno Ward who worked as an engineer before becoming a novelist in his thirties — and whose signature work turns out to be about how a single written reply can save someone. That stuck with me.",
      "I haven't been to Bungotakada yet, but if I ever go, I don't think I'll mind that the movie set isn't there anymore. I'd rather walk the old alleys, stand where the Namiya store used to be, and end the day watching the sunset at Matama Beach.",
      "And if I happen to spot an old mailbox somewhere in an alley, I'll probably think, just for a second — \"if I put a letter in here, would I get a reply?\""
    ],
    hookBadge_ja:"東野圭吾 · 大分ロケ地 · 映画の中のあの場所",
    hookTagline_ja:"ナミヤ雑貨店、本当にどこかにありそうな気がした",
    discoveryHook_ja:[
      "夜に手紙を入れてみたくなる、そんな場所。東野圭吾が好きだからか、『ナミヤ雑貨店の奇蹟』は不思議と場所の記憶がいつまでも消えなかった。",
      "そんなに派手な場所じゃないのに、夜遅くまで灯りがついた古い雑貨店がひとつ。閉まった店のシャッターに悩みを書いて差し入れると、過去から返事が届くという設定が、とにかく好きだった。",
      "だから時々思っていた。日本のどこかに、本当にああいう店が一軒くらいあるんじゃないかって。",
      "小説の中のナミヤ雑貨店そのものは架空の場所だ。でも映画では、大分県豊後高田という小さな町にその姿が作られた。",
      "映画に出てくる雑貨店は実在の古い店ではなく、宮町商店街にわざわざ建てられたセットだったらしい。撮影が終わった後は撤去されたという。",
      "これは正直、少し残念だった。日本に行ったらつい扉を開けてみたかったのに。それでも映画で使われたナミヤ雑貨店の看板自体は、今も近くの昭和ロマン蔵に保管されているそうだ。",
      "雑貨店の建物だけがなくなっただけで、映画で見た周りの風景はかなり残っている。淳也たちが走り回っていた商店街、桂川橋、尾崎海岸。芹が最後に「Reborn」に合わせて踊っていたマタマ海岸も実際の場所だ。",
      "ここは少し行ってみたい。潮が引くと砂の上に波のような模様が浮かんで、そこに夕日が沈んでいく。写真を見るだけでも映画の空気が伝わってくる。",
      "物語自体をあらためて振り返ると、この小説がなぜあんなに心に残るのか、少しわかる気がする。ナミヤ雑貨店の主人・浪矢雄治は、かつて子どもがふざけて出した相談の手紙にも真剣に返事をしたことがきっかけで、何十年も「どんな手紙にも誠実に答える」という一線を守り続けた人だった。",
      "その律儀さが、のちに時間を超えて誰かの人生を動かす奇跡につながっていく——そう考えると、雑貨店という舞台そのものが、ただの背景じゃなくて物語の核心なんだと思えてくる。",
      "もうひとつ、環光園という児童養護施設の存在も忘れられない。設立者の皆月暁子は、実はナミヤ雑貨店の雄治とかつて想い合っていた相手だったのに、家柄の差で引き離されてしまったのだという。",
      "亡くなる前に彼女が残した「大丈夫、私が空の上からみんなのために祈っているから」という言葉が、環光園を通り過ぎていったすべての人たちの上に、静かに影を落とし続けている。",
      "フェンシング選手だった「ムーンラビット」、売れない歌手だった「魚屋のアーティスト」、未婚のまま出産を選んだ「グリーンリバー」、没落した実業家の息子「ポール・レノン」——時代の違う相談者たちの手紙が、ナミヤ雑貨店を軸に少しずつつながっていく構成も、読んでいて何度も鳥肌が立った。",
      "誰が誰にどうつながっているのか、その答えは読んでからのお楽しみにしておきたい。ただ、あの一晩、雑貨店に迷い込んだ三人組の泥棒たちも、最終的にはこの手紙のやり取りと無関係ではいられなくなる、とだけ言っておく。",
      "2026年7月、この物語を書いた東野圭吾が亡くなったと聞いた。106冊の著作を残した人だけれど、その中でもこの一冊は特に、彼の優しさが一番よく見える作品だったんじゃないかと思う。",
      "私はまだ豊後高田に行ったことはないけれど、いつか行くことになったら、映画のセットが残っていないことはそれほど気にならないと思う。古い路地を少し歩いて、ナミヤ雑貨店があった場所に立ってみて、最後はマタマ海岸で夕日が沈むのを見たい。",
      "そうしているうちに路地のどこかで古い郵便受けをひとつ見つけたら、きっとまたこう思うはずだ。「ここに手紙を入れたら、返事が来るのかな」って。"
    ],
    contentSummary:{ sections:[
      { heading:"우연히 숨어든 폐가", bullets:[
        "좀도둑 쇼타·아쓰야·고헤이가 훔친 차가 고장 나면서, 30년 넘게 문을 닫은 나미야 잡화점에 몸을 숨김",
        "가게 뒷문 셔터의 우유 상자에서 32년 전에 쓰인 고민 상담 편지 한 장을 발견함"
      ]},
      { heading:"장난삼아 쓴 답장이 시간을 건너다", bullets:[
        "세 사람이 장난삼아 답장을 써서 우유 상자에 넣자, 그 답장이 과거의 발신인에게 실제로 전달됨을 깨달음",
        "펜싱선수·무명 뮤지션·미혼모·몰락한 사업가의 아들 등 서로 다른 시대를 사는 사연자들의 편지가 이어짐"
      ]},
      { heading:"환광원, 상처와 기도가 머무는 곳", bullets:[
        "환광원을 세운 미나즈키 아키코가 '하늘 위에서 모두를 위해 기도하겠다'는 유언을 남기고 세상을 떠남",
        "환광원을 거쳐 간 여러 인물의 삶이 나미야 잡화점의 편지들과 조용히 이어져 있음이 드러남"
      ]},
      { heading:"세 사람의 하룻밤이 남긴 것", bullets:[
        "하룻밤 사이 여러 통의 편지를 주고받은 세 사람의 정체와, 그들이 나미야 잡화점과 맺고 있던 인연은 작품에서 직접 확인하세요",
        "편지들이 서로 다른 시간의 사람들을 어떻게 이어주었는지, 그 결말은 소설을 통해 만나보시길 권합니다"
      ]}
    ], endingNote:"좀도둑 3인방의 정체와 나미야 잡화점을 둘러싼 모든 편지의 진짜 의미는 작품에서 직접 확인하는 것을 권합니다 — 이 작품은 결말의 반전이 핵심이라 특히 스포일러에 주의해주세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Bungotakada showa no machi.JPG", credit:'오이타현 분고타카다시 쇼와노마치(2017년 영화 나미야 잡화점의 기적 실제 촬영지) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Bungotakada_showa_no_machi.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%ED%9E%88%EA%B0%80%EC%8B%9C%EB%85%B8_%EA%B2%8C%EC%9D%B4%EA%B3%A0" },
  { id:"suspectx", title:"용의자 X의 헌신 (容疑者Xの献身)", author:"히가시노 게이고 장편소설", type:"mystery", country:"japan", medium:"novel", genres:["mystery","thriller","drama"],
    lang:"ja", // 일본 소설 원작 — 일본어 태그/야후재팬 등 일본향 SNS 검색 로직을 적용한다.
    memorial:true, // 2026-08 추모 특집(작가 특집) 표시 플래그 — 나미야·백야행과 함께 히가시노 게이고 대표작 3편 그룹으로 노출
    // ※ 2026년 7월 23일 별세한 히가시노 게이고 작가를 추모하며 추가한 특집 콘텐츠(대표작 3편 중 하나).
    // ※ 나미야와 달리 이 작품은 도쿄 고토구(江東区) 후카가와 일대의 실제 거리를 그대로 배경으로 쓴
    //   드문 경우 — 신오하시·청주교·기요스미 정원 등은 소설 속 지명이자 지금도 갈 수 있는 실존 장소다.
    era:"현대(2005년作)", title_en:"The Devotion of Suspect X", author_en:"Novel by Keigo Higashino", era_en:"Present day (published 2005)",
    summary:"이혼 후 딸과 단둘이 사는 야스코의 옆집에는 한때 촉망받던 수학자였지만 지금은 조용히 고교 교사로 살아가는 이시가미가 산다. 어느 날 두 사람에게 벌어진 사건을 알게 된 이시가미가 예상 밖의 방식으로 돕겠다고 나서며 시작되는, 히가시노 게이고의 나오키상 수상작이자 대표작.",
    longSummary:"『용의자 X의 헌신』은 흔히 '누가 범인인가'를 묻는 여느 추리소설과 다르다. 독자는 비교적 이른 시점에 무슨 일이 있었는지를 알게 된다. 대신 이 소설이 던지는 질문은 하나다 — 이시가미라는 남자는, 대체 무엇을, 어디까지 했는가?\n\n딸 미사토와 단둘이 도시락가게에서 일하며 살아가는 야스코의 옆집에는 한때 수학계에서 천재로 불렸지만 지금은 사립고교에서 조용히 학생들을 가르치는 이시가미가 산다. 전 남편 도가시 신지가 다시 모녀를 찾아오며 벌어진 사건 이후, 이시가미는 아무도 예상하지 못한 방식으로 두 사람을 돕겠다고 나선다. 대학 시절부터 이시가미의 재능을 알아본 물리학자 유카와 마나부(별명 '갈릴레오')가 형사 구사나기의 부탁으로 수사에 관여하면서, 두 천재의 조용하지만 팽팽한 두뇌 싸움이 시작된다.\n\n이 소설의 무대는 히가시노의 다른 작품들과 달리 도쿄 고토구 후카가와의 실제 거리 그대로다. 신오하시 도로를 중심으로, 서쪽으로는 니혼바시, 동쪽으로는 에도가와로 뻗어나가는 지리 — 이시가미가 매일 건너는 신오하시, 산책 삼아 들르는 청주교, 그가 근무하는 사립고교 앞 기요스미 정원까지, 소설 속 동선은 지금도 거의 그대로 걸어볼 수 있다.\n\n2005년 발표된 이 작품은 다섯 차례나 나오키상 후보에 오르고도 고배를 마시던 히가시노에게 2006년 마침내 제134회 나오키상을 안겼다. 이후 영어판이 출간되며 에드거상 최우수 소설 부문 후보에 오르는 등, 일본 미스터리로는 이례적으로 해외에서도 널리 읽히는 작품이 됐다. 2026년 7월 23일 히가시노 게이고가 세상을 떠난 뒤, 이 작품은 그가 남긴 106권의 저서 중에서도 가장 널리 사랑받은 대표작 중 하나로 다시 조명받고 있다.",
    pinColor:"#3a4a5a",
    summary_en:"Next door to Yasuko, who lives alone with her daughter after a divorce, lives Ishigami — once a promising mathematician, now a quiet high school teacher. When Ishigami learns what has happened to the two of them, he steps in to help in a way no one could have predicted. Higashino's Naoki Prize–winning signature work.",
    longSummary_en:"The Devotion of Suspect X isn't quite the usual whodunit. The reader learns relatively early what happened. Instead, the novel asks one question: what, exactly, did a man named Ishigami do — and how far did he go?\n\nNext door to Yasuko, who works at a bento shop and lives alone with her daughter Misato, lives Ishigami — once considered a genius in mathematics, now quietly teaching at a private high school. After Yasuko's ex-husband Shinji Togashi shows up again and something happens, Ishigami steps in to help in a way no one expects. Physicist Manabu Yukawa (nicknamed 'Galileo'), who has recognized Ishigami's talent since their university days, gets pulled into the investigation at the request of Detective Kusanagi, setting off a quiet but tense battle of wits between two geniuses.\n\nUnlike most of Higashino's other novels, this one is set on the real streets of Fukagawa in Tokyo's Koto Ward. Centered on Shin-Ohashi Road — running west to Nihonbashi and east toward Edogawa — the geography is concrete: the Shin-Ohashi bridge Ishigami crosses every day, Kiyosu Bridge where he takes walks, and Kiyosumi Garden in front of the school where he teaches. His route through the story can still be walked almost exactly today.\n\nPublished in 2005, the novel finally won Higashino the 134th Naoki Prize in 2006, after five previous nominations without a win. Its English translation was later nominated for the Edgar Award for Best Novel — an unusual feat for a Japanese mystery novel. After Higashino's passing on July 23, 2026, this remains one of the most widely loved among his 106 books.",
    communityNote:"『용의자 X의 헌신』은 히가시노 게이고가 2005년 발표한 갈릴레오 시리즈 세 번째 장편으로, 2006년 제134회 나오키상을 수상했다. 2008년 니시타니 히로시 감독, 후쿠야마 마사하루·츠츠미 신이치·시바사키 코우 주연으로 일본에서 영화화됐으며, 영어판 출간 이후 미국추리작가협회(MWA) 에드거상 최우수 소설 부문 후보에도 올랐다. 히가시노 게이고는 1958년 오사카시 이쿠노구에서 태어나 오사카부립대학 전기공학과를 졸업, 자동차 부품업체 덴소에서 엔지니어로 근무하다 1985년 에도가와 란포상을 수상하며 전업 작가가 됐다. 2026년 7월 23일 대장암으로 별세, 향년 68세.",
    communityNote_en:"The Devotion of Suspect X is the third novel in Higashino's Detective Galileo series, published in 2005 and awarded the 134th Naoki Prize in 2006. It was adapted into a Japanese film in 2008, directed by Hiroshi Nishitani and starring Masaharu Fukuyama, Shinichi Tsutsumi, and Kou Shibasaki; its English translation was later a finalist for the Mystery Writers of America's Edgar Award for Best Novel. Higashino was born in 1958 in Osaka's Ikuno Ward, graduated in electrical engineering from Osaka Prefecture University, worked as an engineer at Denso, and became a full-time novelist after winning the Edogawa Rampo Award in 1985. He passed away from colorectal cancer on July 23, 2026, at age 68.",
    hookBadge:"히가시노 게이고 추모 특집 · 나오키상 수상작 · 도쿄 후카가와 실제 무대",
    hookTagline:"이시가미가 매일 걷던 길, 지금도 그대로 있다",
    discoveryHook:[
      "『용의자 X의 헌신』을 덮고 나서 한동안 멍했다. 그래서 배경이 된 곳부터 찾아봤다.",
      "이 소설, 히가시노 게이고 작품 중에서 실제 도쿄 거리를 그대로 쓴 몇 안 되는 케이스라고 한다. 무대는 도쿄 고토구 후카가와.",
      "신오하시, 청주교, 기요스미 정원 — 이시가미가 매일 걷던 그 동선이 지금도 거의 그대로 남아 있다.",
      "신오하시는 스미다강을 건너는 진짜 다리다. 이시가미가 도시락가게에서 자기 아파트로, 혹은 학교로 갈 때 건너던 다리, 지금도 그 위를 걸을 수 있다.",
      "기요스미 정원은 이시가미가 근무하던 사립고교 바로 앞에 있는 정원이다. 그의 출퇴근길을 그대로 따라 걸어볼 수 있다는 뜻이다.",
      "이 소설은 흔한 추리소설이랑 다르다. 누가 저질렀는지는 비교적 일찍 밝혀진다. 그럼 뭐가 남느냐면, '이시가미가 대체 무엇을, 어디까지 했는가'라는 질문 하나다.",
      "옆집에 사는 야스코 모녀를 위해 이시가미가 나서서 돕겠다고 하는데, 그 방식이 아무도 예상하지 못한 거였다는 게 이 소설의 핵심이다.",
      "형사 구사나기의 부탁으로 물리학자 유카와 마나부(별명 갈릴레오)가 사건에 관여하게 되는데, 대학 시절부터 이시가미의 재능을 알아본 사이라는 게 묘하게 마음을 무겁게 한다. 서로를 인정하는 두 천재가 결국 반대편에 서게 되는 구도라서.",
      "결말까지 다 읽고 나서 다시 앞부분을 펼쳐보면, 이시가미가 야스코 모녀 옆집에서 아무렇지 않게 하던 행동들이 전혀 다르게 읽힌다. 이게 이 소설이 무서운 이유다.",
      "이시가미의 '헌신'이라는 단어, 처음엔 그냥 친절 정도로 읽었는데 마지막 장을 덮고 나면 그 단어의 무게가 완전히 달라져 있다.",
      "2005년에 나온 이 소설, 나오키상 후보에 다섯 번이나 오르고도 떨어지다가 2006년에야 겨우 받았다고 한다. 그를 그 자리에 세워준 작품이 바로 이거였다.",
      "영어판이 나온 뒤에는 미국추리작가협회 에드거상 최우수 소설 부문 후보에도 올랐다고. 일본 추리소설로는 흔치 않은 일이라고 하더라.",
      "2026년 7월, 이 작품을 쓴 히가시노 게이고가 세상을 떠났다는 소식을 들었다. 106권을 남긴 사람인데, 그중에서도 유독 이 작품이 다시 회자되고 있는 이유를 알 것 같았다.",
      "신오하시부터 기요스미 정원까지 실제로 걸어보면, 이시가미가 매일 그 다리를 건너면서 무슨 생각을 하고 있었을지 조금은 알 것 같은 기분이 든다. 결말을 알고 걸으면 그 길이 완전히 다르게 느껴질 거다."
    ],
    hookReveals:[
      { label:"신오하시 → 이시가미가 매일 건너던 실존 다리", label_en:"Shin-Ohashi → the real bridge Ishigami crosses every day", locId:"sx_shinohashi" },
      { label:"기요스미 정원 → 이시가미가 근무하는 학교 바로 앞, 지금도 그대로", label_en:"Kiyosumi Garden → right in front of Ishigami's school, unchanged today", locId:"sx_kiyosumi_garden" },
      { label:"청주교 → 이시가미의 산책길, 실제로 걸어볼 수 있음", label_en:"Kiyosu Bridge → part of Ishigami's real walking route", locId:"sx_kiyosu" },
      { label:"나오키상 → 5수 끝에 받은 상(2006, 제134회)", label_en:"The Naoki Prize → won in 2006 after five previous nominations", locId:null }
    ],
    hookBadge_en:"In Memory of Keigo Higashino · Naoki Prize winner · Real Tokyo, Fukagawa",
    hookTagline_en:"The route Ishigami walked every day is still there",
    discoveryHook_en:[
      "Closing The Devotion of Suspect X left me a little stunned for a while, so I went looking into the setting first.",
      "Turns out this is one of the rare Higashino novels set on real Tokyo streets rather than invented ones — the stage is Fukagawa, in Tokyo's Koto Ward.",
      "Shin-Ohashi bridge, Kiyosu Bridge, Kiyosumi Garden — Ishigami's daily route through the story still exists almost exactly as written.",
      "Shin-Ohashi is a real bridge over the Sumida River, the one Ishigami crosses every day between the bento shop, his apartment, and the school where he teaches. You can walk across it today.",
      "Kiyosumi Garden sits right in front of the private high school where he works, meaning you can retrace his actual commute.",
      "This isn't a typical whodunit. You find out relatively early who did something. What's left is one question: what, exactly, did Ishigami do — and how far did he go?",
      "He steps forward to help Yasuko and her daughter next door, and the way he chooses to help is the whole point — nobody, including the reader, sees it coming.",
      "Physicist Manabu Yukawa (nicknamed Galileo) gets pulled into the case at Detective Kusanagi's request, and there's something quietly heavy about the fact that he's recognized Ishigami's talent since their university days. Two geniuses who respect each other end up on opposite sides.",
      "Go back to the beginning after finishing it, and everything Ishigami does casually next door to Yasuko reads completely differently. That's what makes this novel unsettling.",
      "The word 'devotion' in the title feels like simple kindness at first. By the last page, its weight has changed entirely.",
      "Published in 2005, this book was nominated for the Naoki Prize five times before finally winning it in 2006 — this was the one that finally got him there.",
      "After the English translation came out, it was even a finalist for the Mystery Writers of America's Edgar Award — apparently rare for a Japanese mystery novel.",
      "In July 2026, news came that Higashino, who wrote this, had passed away. He left behind 106 books, and I think I understand now why this particular one keeps coming back up.",
      "Walking from Shin-Ohashi to Kiyosumi Garden gives you some sense of what might have been going through Ishigami's mind crossing that bridge every day. Once you know how it ends, that same walk feels completely different."
    ],
    discoveryHook_ja:[
      "『容疑者Xの献身』を読み終えて、しばらく呆然としていた。だから、まず舞台になった場所から調べてみた。",
      "この小説、東野圭吾作品の中でも珍しく、実際の東京の街をそのまま使っている数少ないケースなのだという。舞台は東京都江東区・深川。",
      "新大橋、清洲橋、清澄庭園——石神が毎日歩いていたその動線が、今もほとんどそのまま残っている。",
      "新大橋は隅田川に架かる本物の橋だ。石神が弁当屋から自分のアパートへ、あるいは学校へ向かうときに渡っていた橋で、今も実際に歩いて渡ることができる。",
      "清澄庭園は、石神が勤めていた私立高校のすぐ前にある庭園らしい。つまり彼の通勤ルートをそのままたどれるということだ。",
      "この小説はよくある推理小説とは違う。誰が何をしたのかは、比較的早い段階でわかってしまう。残るのはただひとつの問い——石神という男は、いったい何を、どこまでしたのか。",
      "隣に住む靖子母娘のために石神が力になろうと動き出すのだが、その「助け方」こそがこの小説の核心で、誰ひとり予想できない。",
      "刑事・草薙の頼みで物理学者・湯川学(通称ガリレオ)が事件に関わることになるのだが、大学時代から石神の才能を認め合っていた仲だと知ると、なぜか胸が重くなる。互いを認め合っていた二人の天才が、最後には対岸に立つことになるからだ。",
      "結末まで読んでから序盤に戻ると、石神が隣人としてごく自然にしていた行動の一つひとつが、まったく違う意味を帯びて見えてくる。この小説が怖いのはそこだ。",
      "タイトルにある「献身」という言葉、最初はただの親切心くらいに読んでいた。でも最後のページを閉じる頃には、その言葉の重みがまるっきり変わっている。",
      "2005年に発表されたこの作品、直木賞候補に5回もなりながら落選し続け、2006年にようやく受賞したのだという。彼をその場所に立たせたのが、まさにこの一冊だった。",
      "英語版が出た後には、アメリカ探偵作家クラブのエドガー賞最優秀長編賞の候補にも選ばれたそうだ。日本のミステリーとしては異例のことだという。",
      "2026年7月、この作品を書いた東野圭吾が亡くなったというニュースを聞いた。106冊を残した人だが、その中でも特にこの一冊が今また語られている理由が、わかる気がした。",
      "新大橋から清澄庭園まで実際に歩いてみると、石神が毎日あの橋を渡りながら何を考えていたのか、少しだけわかるような気がしてくる。結末を知ってから歩くと、同じ道がまったく違って感じられるはずだ。"
    ],
    title_ja:"容疑者Xの献身", summary_ja:"離婚後、娘とふたりで暮らす靖子の隣には、かつて将来を嘱望された数学者でありながら、今はひっそりと高校教師として生きる石神が住んでいる。ある日ふたりの身に起きた事件を知った石神が、誰も予想しない方法で力になろうと動き出すところから始まる、東野圭吾の直木賞受賞作にして代表作。", author_ja:"東野圭吾 長編小説", era_ja:"現代(2005年作)",
    contentSummary:{ sections:[
      { heading:"옆집에 사는 두 사람", bullets:[
        "이혼 후 딸 미사토와 단둘이 도시락가게에서 일하며 사는 야스코, 그 옆집에는 한때 천재 수학자로 불렸던 고교 교사 이시가미가 산다",
        "전 남편 도가시 신지가 다시 두 사람을 찾아오며 예기치 못한 사건이 벌어진다"
      ]},
      { heading:"뜻밖의 헌신", bullets:[
        "이시가미가 아무도 예상하지 못한 방식으로 야스코 모녀를 돕겠다고 나선다",
        "구체적으로 그가 무엇을 어떻게 했는지는 소설의 핵심 트릭이라 여기서는 다루지 않는다"
      ]},
      { heading:"두 천재의 두뇌 싸움", bullets:[
        "형사 구사나기의 부탁으로 물리학자 유카와 마나부(갈릴레오)가 수사에 관여하게 된다",
        "대학 시절부터 서로의 실력을 알아본 이시가미와 유카와 사이의 조용하지만 팽팽한 신경전이 이어진다"
      ]},
      { heading:"진실이 드러나는 순간", bullets:[
        "이시가미의 헌신이 정말로 의미하는 바가 무엇인지는 작품의 결말에서 직접 확인하세요",
        "이 작품은 결말의 반전과 그 정서적 무게가 핵심이라 특히 스포일러에 주의해주세요"
      ]}
    ], endingNote:"이시가미가 무엇을 어디까지 했는지, 그리고 그것이 정말 의미하는 바는 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-1.JPG", credit:'기요스미 정원, 도쿄 고토구(용의자 X의 헌신 속 이시가미가 근무하는 사립고교 앞 실존 정원) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Kiyosumi-1.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%9A%A9%EC%9D%98%EC%9E%90_X%EC%9D%98_%ED%97%8C%EC%8B%A0" },
  { id:"byakuya", title:"백야행 (白夜行)", author:"히가시노 게이고 장편소설", type:"mystery", country:"japan", medium:"novel", genres:["mystery","drama","thriller"],
    lang:"ja", // 일본 소설 원작 — 일본어 태그/야후재팬 등 일본향 SNS 검색 로직을 적용한다.
    memorial:true, // 2026-08 추모 특집(작가 특집) 표시 플래그 — 나미야·용의자X와 함께 히가시노 게이고 대표작 3편 그룹으로 노출
    // ※ 2026년 7월 23일 별세한 히가시노 게이고 작가를 추모하며 추가한 특집 콘텐츠(대표작 3편 중 하나).
    // ※ 두 주인공의 관계와 진실이 19년에 걸쳐 서서히 드러나는 것이 이 작품의 핵심이라, 장소·인물
    //   설명 전반에서 관계나 인과관계를 구체적으로 서술하지 않는다(스포일러 최소화 원칙을 특히 엄격히 적용).
    era:"1973년~1992년(발표 1999년)", title_en:"Journey Under the Midnight Sun (Byakuyako)", author_en:"Novel by Keigo Higashino", era_en:"1973–1992 (published 1999)",
    summary:"1973년 오사카 후세, 한 전당포 주인이 살해된 채 발견된다. 사건은 미해결로 남지만, 그날 이후 19년에 걸쳐 두 사람 — 니시모토(가라사와) 유키호와 기리하라 료지 — 은 각자 전혀 다른 삶을 살아간다. 두 사람의 궤적을 놓지 못하는 형사 사사가키의 시선을 따라가는, 히가시노 게이고의 또 다른 대표작.",
    longSummary:"『백야행』은 흔히 히가시노 게이고의 작품 중 가장 어둡고, 가장 슬픈 소설로 꼽힌다. 1973년 오사카 후세의 한 폐건물에서 전당포 주인 기리하라 요스케가 살해된 채 발견되며 이야기가 시작된다. 담당 형사 사사가키 준조는 피해자가 생전 가까이 지내던 니시모토 후미요·유키호 모녀의 집을 드나들었다는 사실을 알게 되지만, 결정적 증거를 찾지 못한 채 사건은 미궁에 빠진다.\n\n소설은 여기서 시간을 훌쩍 건너뛰어, 1973년부터 1992년까지 19년에 걸쳐 두 아이 — 유키호와 료지 — 가 각자 전혀 다른 삶을 살아가는 모습을 번갈아 비춘다. 유키호는 가난했던 어린 시절과는 완전히 다른, 아름답고 흠잡을 데 없는 상류층 여성으로 성장한다. 료지는 아버지의 죽음 이후 전혀 다른 궤적을 걷는다. 두 사람이 직접 마주치는 장면은 소설 전체를 통틀어 손에 꼽을 정도로 드물지만, 은퇴 후에도 사건을 놓지 못하는 사사가키의 끈질긴 추적을 따라가다 보면 독자는 서서히 어떤 진실에 다가서게 된다.\n\n소설의 실제 무대인 후세는 히가시노가 직접 실명을 밝힌 몇 안 되는 실존 지명이다. 쇼와시대 오사카 중년층에게 향수를 불러일으키는 이 상점가는, 두 주인공이 떠나온 원점이자 그들의 삶이 갈라지기 시작한 자리이기도 하다.\n\n1997년부터 1999년까지 요미우리 신문에 연재된 뒤 단행본으로 출간된 이 작품은, 2006년 TV 드라마로, 2011년에는 호리키타 마키·코라 켄고 주연의 영화로 만들어졌다. 2026년 7월 23일 히가시노 게이고가 세상을 떠난 뒤, 그의 고향 오사카의 정서가 가장 짙게 밴 이 작품 역시 다시 조명받고 있다.",
    pinColor:"#6b3a4a",
    summary_en:"In 1973 Osaka, a pawnshop owner is found murdered. The case goes unsolved, but over the following nineteen years, two people — Yukiho Nishimoto (later Karasawa) and Ryoji Kirihara — grow up to live entirely different lives. Told partly through the eyes of a detective who can't let the case go, this is another of Higashino's signature novels.",
    longSummary_en:"Journey Under the Midnight Sun is often called the darkest and saddest of Higashino's novels. It opens in 1973 in Fuse, Osaka, where pawnshop owner Yosuke Kirihara is found murdered in an abandoned building. Detective Junzo Sasagaki learns that the victim had been visiting the home of Fumiyo Nishimoto and her daughter Yukiho, but without decisive evidence, the case goes cold.\n\nThe novel then leaps forward, following two children — Yukiho and Ryoji — across nineteen years, from 1973 to 1992, as they grow into entirely different lives. Yukiho becomes a beautiful, flawlessly composed woman in high society, worlds away from her impoverished childhood. Ryoji's path diverges after his father's death. The two rarely appear together on the page, but as Sasagaki's stubborn, decades-long pursuit unfolds, the reader is gradually drawn toward an unsettling truth.\n\nFuse, the novel's real setting, is one of the few actual place names Higashino used directly. The shopping street, which still stirs nostalgia for older generations of Osaka residents, is both where the two protagonists come from and the point where their lives begin to split apart.\n\nSerialized in the Yomiuri Shimbun from 1997 to 1999 before being published as a novel, it was adapted into a TV drama in 2006 and a film in 2011 starring Maki Horikita and Kengo Kora. Following Higashino's death on July 23, 2026, this novel — perhaps the one most steeped in the Osaka of his youth — is being revisited once again.",
    communityNote:"『백야행』은 1997~1999년 요미우리 신문에 연재된 뒤 1999년 슈에이샤에서 단행본으로 출간된 히가시노 게이고의 장편소설로, 나오키상 최종 후보에 올랐으나 이때는 수상하지 못했다(그가 2006년 『용의자 X의 헌신』으로 수상하기까지 다섯 차례 고배를 마신 과정 중 하나). 2006년 TBS 계열 드라마로, 2011년에는 후카가와 요시히로 감독, 호리키타 마키·코라 켄고 주연의 영화로 만들어졌다. 배경인 오사카 후세는 작가가 실명을 밝힌 실존 지명이다.",
    communityNote_en:"Journey Under the Midnight Sun was serialized in the Yomiuri Shimbun from 1997–1999 and published as a novel by Shueisha in 1999. It was a Naoki Prize finalist but did not win that year — one of five nominations Higashino received before finally winning in 2006 for The Devotion of Suspect X. It was adapted into a TBS television drama in 2006 and a film in 2011, directed by Yoshihiro Fukagawa and starring Maki Horikita and Kengo Kora. Fuse, Osaka, its real-world setting, is one of the few actual place names Higashino used directly in his fiction.",
    hookBadge:"히가시노 게이고 추모 특집 · 실명으로 밝힌 몇 안 되는 실존 무대",
    hookTagline:"두 사람이 갈라지기 시작한 그 거리, 후세",
    discoveryHook:[
      "『백야행』을 다 읽고 나서 한동안 마음이 무거웠다. 그래서 배경이 된 곳부터 찾아보게 됐다.",
      "이 소설, 히가시노 게이고가 실제 지명을 그대로 밝힌 몇 안 되는 작품이라고 한다. 무대는 오사카부 히가시오사카시의 '후세'.",
      "긴테쓰 후세역, 그리고 그 앞의 후세 혼도리 상점가. 1973년 사건이 시작되는 그 동네가 지금도 실제로 있다.",
      "쇼와시대 오사카 서민 동네의 정취가 그대로 남아 있는 곳이라, 오사카 중년층에게는 향수를 불러일으키는 상점가라고 한다.",
      "전당포 '기리하라'가 정확히 어느 건물인지는 밝혀지지 않았다. 후세라는 동네는 진짜지만, 사건이 벌어진 그 가게 자체는 소설 속 설정으로 남아 있다.",
      "1973년, 이 전당포 주인 기리하라 요스케가 살해된 채 발견되면서 이야기가 시작된다. 담당 형사 사사가키는 피해자가 니시모토 모녀의 집을 드나들었다는 걸 알아내지만, 결정적 증거를 못 찾은 채 사건은 미궁에 빠진다.",
      "그리고 소설은 여기서 시간을 훌쩍 건너뛴다. 1973년부터 1992년까지, 19년에 걸쳐 두 아이 — 유키호와 료지 — 가 각자 전혀 다른 삶을 사는 모습을 번갈아 비춘다.",
      "유키호는 가난했던 어린 시절과는 완전히 다른, 흠잡을 데 없는 상류층 여성으로 자란다. 료지는 아버지의 죽음 이후 전혀 다른 궤적을 걷는다.",
      "두 사람이 직접 마주치는 장면은 소설 전체를 통틀어 손에 꼽을 정도로 드물다고 한다. 그런데도 이 소설을 읽고 나면, 두 사람이 어떤 식으로든 서로에게서 눈을 뗀 적이 없었다는 게 느껴진다.",
      "제목부터가 그 얘기다. 백야(白夜)는 해가 완전히 지지 않는 밤, 낮도 밤도 아닌 시간을 뜻한다. 두 사람은 평생 단 한 번도 나란히 햇빛 아래를 걸어본 적이 없다 — 이 소설이 왜 '백야행'인지, 다 읽고 나면 그 제목이 다르게 보인다.",
      "은퇴한 뒤에도 사사가키 형사는 이 사건을 내려놓지 못한다. 그의 19년에 걸친 끈질긴 추적을 따라가다 보면, 독자는 서서히 어떤 진실에 가까워진다.",
      "결말에서 두 사람의 진짜 관계가 뭐였는지는 여기서 다 말하지 않으려 한다. 다만 이 소설이 히가시노 게이고의 작품 중에서도 유독 결말의 여운이 깊다고 회자되는 데는 이유가 있다.",
      "1997년부터 신문에 연재됐던 이 소설, 나오키상 최종 후보까지 올랐지만 그때는 받지 못했다고 한다. 그가 결국 상을 받은 건 2006년, 『용의자 X의 헌신』으로였다.",
      "2011년에는 호리키타 마키·코라 켄고 주연으로 영화화됐다. 2026년 7월, 작가가 세상을 떠난 뒤 그의 고향 오사카의 정서가 가장 짙게 밴 이 작품이 다시 조명받고 있다.",
      "후세에 가보면, 두 사람의 삶이 갈라지기 시작한 그 거리를 실제로 걸어볼 수 있다. 상점가를 걷다 보면, 어디선가 서로를 지켜보고 있었을 두 사람의 시선이 자꾸 떠오를 것 같다."
    ],
    hookReveals:[
      { label:"긴테쓰 후세역 → 히가시노가 실명 그대로 쓴 몇 안 되는 배경", label_en:"Fuse Station → one of the few real place names Higashino used directly", locId:"by_fuse_station" },
      { label:"후세 혼도리 상점가 → 지금도 남아있는 쇼와시대 거리", label_en:"Fuse Honodori shopping street → a Showa-era street that still stands", locId:"by_fuse_honodori" },
      { label:"전당포 '기리하라' → 정확한 주소는 밝히지 않은 가공의 공간", label_en:"The pawnshop 'Kirihara' → a fictional space with no specified address", locId:null },
      { label:"사사가키 형사의 19년 추적 → 장소가 아니라 시간 그 자체", label_en:"Detective Sasagaki's 19-year pursuit → not a place, but time itself", locId:null }
    ],
    hookBadge_en:"In Memory of Keigo Higashino · One of the few real settings he named directly",
    hookTagline_en:"Fuse: the street where two lives began to split apart",
    discoveryHook_en:[
      "Journey Under the Midnight Sun left me heavy for a while after I finished it, so I went looking into where it was set.",
      "Turns out this is one of the few Higashino novels that names a real place directly: Fuse, a district of Higashiosaka City, Osaka.",
      "Kintetsu Fuse Station and the Fuse Honodori shopping street right in front of it — the neighborhood where the 1973 case begins is a real place you can visit today.",
      "It still carries the texture of a working-class Showa-era Osaka neighborhood, which is why it stirs nostalgia for older generations of Osaka residents.",
      "The pawnshop, Kirihara, was never given an exact address. Fuse itself is real, but the shop where the case unfolds stays fictional.",
      "The story opens in 1973, when the pawnshop's owner, Yosuke Kirihara, is found murdered. Detective Sasagaki discovers the victim had been visiting the Nishimoto household, but without decisive evidence, the case goes cold.",
      "Then the novel leaps forward. From 1973 to 1992, across nineteen years, it alternates between two children — Yukiho and Ryoji — growing into entirely different lives.",
      "Yukiho becomes a flawless, high-society woman, worlds away from her impoverished childhood. Ryoji's path diverges after his father's death.",
      "The two of them barely ever appear on the page together — but reading it, you sense they've never once stopped watching each other, one way or another.",
      "It's right there in the title. 'Byakuya' means a night when the sun never fully sets — neither day nor night. These two never once walk together under real sunlight in their entire lives. Once you finish the book, the title reads completely differently.",
      "Even after retiring, Detective Sasagaki can't put the case down. Following his relentless nineteen-year pursuit, the reader is gradually drawn toward a truth.",
      "I won't spell out what the two of them really were to each other here. But there's a reason this is often called the Higashino novel with the deepest, heaviest aftertaste of them all.",
      "Serialized starting in 1997, this novel made it to the Naoki Prize finals but didn't win that year — that came later, in 2006, for The Devotion of Suspect X.",
      "It was adapted into a film in 2011, starring Maki Horikita and Kengo Kora. Following Higashino's death in July 2026, this novel — perhaps the one most steeped in the Osaka of his own hometown — is being revisited again.",
      "Visit Fuse, and you can walk the actual street where these two lives began to split apart. Wandering the shopping street, you'll probably keep imagining the two of them watching each other from somewhere, always just out of sight."
    ],
    discoveryHook_ja:[
      "『白夜行』を読み終えたあと、しばらく心が重かった。だから、まず舞台になった場所を調べてみることにした。",
      "この小説、東野圭吾が実在の地名をそのまま使った数少ない作品なのだという。舞台は大阪府東大阪市の「布施」。",
      "近鉄布施駅、そしてその前に広がる布施本通商店街。1973年に事件が始まるあの町は、今も実際に存在している。",
      "昭和の大阪の下町らしい雰囲気がそのまま残っていて、大阪の中高年世代にとっては懐かしさを誘う商店街なのだという。",
      "質屋「桐原」がどの建物なのかは明らかにされていない。布施という町自体は本物だが、事件が起きたその店だけは小説の中だけの設定として残っている。",
      "物語は1973年、この質屋の主人・桐原洋介が殺害された姿で発見されるところから始まる。担当刑事の笹垣は、被害者が西本母娘の家に出入りしていたことを突き止めるものの、決定的な証拠が見つからないまま事件は迷宮入りする。",
      "そしてここから物語は一気に時間を飛ぶ。1973年から1992年まで、19年にわたって二人の子ども——雪穂と亮司——がそれぞれまったく違う人生を歩んでいく様子が交互に描かれる。",
      "雪穂は貧しかった幼少期とは似ても似つかない、非の打ちどころのない上流階級の女性へと成長する。亮司は父の死をきっかけに、まったく別の道を歩む。",
      "二人が直接顔を合わせる場面は、作品全体を通してもごくわずかだという。それなのに読み終えると、二人はどんな形であれ、一度もお互いから目を離したことがなかったのだと感じられる。",
      "タイトルそのものがすでにその答えを語っている。「白夜」とは、太陽が完全には沈まない夜、昼でも夜でもない時間のことだ。二人は生涯を通じて、一度も並んで陽の下を歩いたことがない——読み終えたあとにこのタイトルを見返すと、まったく違って見えてくる。",
      "引退したあとも、笹垣刑事はこの事件を心から手放せずにいる。彼の19年にわたるしつこい追跡をたどっていくうちに、読者はじわじわとある真実に近づいていく。",
      "二人が本当はどんな関係だったのか、ここでは明かさないでおこうと思う。ただ、この作品が東野圭吾の中でも特に結末の余韻が深いと言われるのには、それだけの理由がある。",
      "1997年から新聞連載が始まったこの小説、直木賞の最終候補まで残りながら、その年は受賞を逃したという。彼が結局賞を手にしたのは2006年、『容疑者Xの献身』でだった。",
      "2011年には堀北真希・高良健吾主演で映画化された。2026年7月、作家が亡くなったあと、彼の故郷・大阪の空気を最も濃く感じさせるこの作品が、また改めて注目を集めている。",
      "布施を訪れれば、二人の人生が分かれ始めたあの通りを実際に歩くことができる。商店街を歩いていると、どこかからお互いを見つめ続けていた二人の視線を、何度も思い出してしまいそうだ。"
    ],
    title_ja:"白夜行", summary_ja:"1973年、大阪・布施。ひとりの質屋の主人が殺害された姿で発見される。事件は迷宮入りするが、その日から19年にわたり、ふたり——西本(唐沢)雪穂と桐原亮司——はそれぞれまったく異なる人生を歩んでいく。ふたりの軌跡を追い続ける刑事・笹垣の視線を通して描かれる、東野圭吾のもうひとつの代表作。", author_ja:"東野圭吾 長編小説", era_ja:"1973年~1992年(発表1999年)",
    contentSummary:{ sections:[
      { heading:"1973년, 후세의 사건", bullets:[
        "오사카 후세의 한 폐건물에서 전당포 주인 기리하라 요스케가 살해된 채 발견된다",
        "담당 형사 사사가키 준조는 피해자와 니시모토 모녀 사이의 접점을 발견하지만 결정적 증거를 찾지 못한다"
      ]},
      { heading:"19년, 갈라지는 두 삶", bullets:[
        "사건 이후 유키호와 료지, 두 아이가 각자 전혀 다른 삶의 궤적을 걷기 시작한다",
        "유키호는 가난했던 어린 시절과 전혀 다른, 흠잡을 데 없는 상류층 여성으로 성장한다"
      ]},
      { heading:"놓지 못하는 형사", bullets:[
        "사사가키는 은퇴한 뒤에도 오랫동안 이 사건을 마음에서 내려놓지 못한다",
        "그의 끈질긴 추적을 따라가다 보면 독자는 서서히 어떤 진실에 가까워진다"
      ]},
      { heading:"두 사람 사이에 놓인 것", bullets:[
        "유키호와 료지, 두 사람이 정말 어떤 관계였는지는 작품에서 직접 확인하세요",
        "이 작품은 19년에 걸쳐 서서히 드러나는 진실이 핵심이라 특히 스포일러에 주의해주세요"
      ]}
    ], endingNote:"두 사람의 진짜 관계와 사건의 진실은 작품에서 직접 확인하는 것을 권합니다 — 『백야행』은 히가시노 게이고의 작품 중에서도 특히 결말의 여운이 깊은 작품입니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Osaka Fuse Station South View.jpg", credit:'긴테쓰 후세역, 오사카부 히가시오사카시(백야행의 실제 배경) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Osaka_Fuse_Station_South_View.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%95%BC%ED%96%89" },
  { id:"kimetsu", title:"귀멸의 칼날 (鬼滅の刃)", author:"고토게 코요하루 원작", type:"anime", country:"japan", medium:"anime_series", genres:["action","drama","fantasy"],
    lang:"ja", // 일본 만화·애니메이션 원작 — 일본어 태그/야후재팬 등 일본향 SNS 검색 로직을 적용한다.
    // ※ 다이쇼시대(1912~1926) 가상의 일본을 배경으로 한 작품이라 '실제 촬영지'는 존재하지 않는다.
    //   대신 ①제목·성씨가 실제로 겹치는 명소(다자이후 카마도 신사), ②제작진이 참고했다고 널리 알려진
    //   실존 모티브(치치부 철도 파레오익스프레스, 교토 철도박물관 증기기관차, 키노사키 오카와소 료칸),
    //   ③공식 콜라보·팬 순례 코스(USJ)를 '실제 성지순례지'로 분류하고, 나머지는 작품 속 가상 설정으로 표기한다.
    era:"다이쇼시대(大正時代, 1912~1926년 가상 배경)", title_en:"Demon Slayer: Kimetsu no Yaiba", author_en:"Original story by Koyoharu Gotouge", era_en:"Set in the (fictionalized) Taisho era, 1912–1926",
    summary:"숯을 팔며 살아가던 소년 탄지로는 어느 날 가족을 잃고, 유일하게 살아남은 여동생 네즈코마저 오니가 되어버린 참극을 겪는다. 네즈코를 다시 인간으로 되돌릴 방법을 찾기 위해 귀살대에 입대한 탄지로가 동료들과 함께 성장해가는, 고토게 코요하루의 대표작.",
    longSummary:"『귀멸의 칼날』은 다이쇼시대를 배경으로, 오니(귀신)에게 가족을 잃은 소년 카마도 탄지로가 귀살대에 입대해 오니와 맞서 싸우는 이야기다. 숯을 팔며 가족을 부양하던 탄지로는 어느 날 마을에 다녀온 사이 가족 전원이 오니에게 살해당하는 참극을 마주한다. 유일하게 살아남은 여동생 네즈코마저 오니로 변해버렸지만, 놀랍게도 네즈코는 오빠를 공격하지 않는다. 탄지로는 네즈코를 다시 인간으로 되돌릴 방법을 찾기 위해, 그리고 가족을 죽인 오니에게 복수하기 위해 귀살대에 입대한다.\n\n귀살대에 입대한 탄지로는 아가츠마 젠이츠, 하시비라 이노스케 등 개성 강한 동료들을 만나 함께 성장해간다. 나타구모산에서 처음으로 상급 오니와 맞서고, 무한열차에서는 염주 렌고쿠 쿄쥬로의 죽음을 목격하며, 요시와라 유곽에서는 음주 우즈이 텐겐과 함께 상현의 오니와 사투를 벌인다. 대장장이 마을과 하시라 훈련을 거치며 대원들의 힘은 점점 강해지고, 마침내 이야기는 무잔과 귀살대 전원이 무한성에서 격돌하는 최종장으로 향한다.\n\n2016년부터 2020년까지 주간 소년 점프에 연재된 이 작품은 누계 발행 부수 1억 5천만 부를 넘긴 대히트작이 됐고, 극장판 '무한열차편'은 2020년 일본 역대 흥행 수입 1위(약 404억 엔)를 기록하며 사회적 현상이 됐다. 가족애, 상실, 속죄라는 보편적 정서를 정교한 액션과 함께 그려낸 것이 폭넓은 사랑을 받은 이유로 꼽힌다.",
    pinColor:"#4a6b2a",
    summary_en:"Tanjiro, a boy who sells charcoal for a living, loses his family in a single night — and the only survivor, his sister Nezuko, has been turned into a demon. Tanjiro joins the Demon Slayer Corps to find a way to turn her back into a human, growing alongside his companions in Koyoharu Gotouge's signature work.",
    longSummary_en:"Set in the Taisho era, Demon Slayer follows Tanjiro Kamado, a boy who loses his family to a demon and joins the Demon Slayer Corps to fight back. While Tanjiro is away selling charcoal to support his family, his entire household is slaughtered by a demon. The sole survivor, his sister Nezuko, has herself been turned into a demon — yet remarkably, she never attacks her brother. Tanjiro joins the Corps both to find a way to turn Nezuko back into a human and to avenge his family.\n\nAfter joining, Tanjiro meets strong-willed companions like Zenitsu Agatsuma and Inosuke Hashibira and grows alongside them. He faces a formidable demon for the first time on Mount Natagumo, witnesses the death of Flame Hashira Kyojuro Rengoku aboard the Mugen Train, and fights an Upper Rank demon alongside Sound Hashira Tengen Uzui in the Entertainment District. After the Swordsmith Village arc and grueling Hashira Training, the story builds to its climax: the full Corps' battle against Muzan and the Twelve Kizuki within the Infinity Castle.\n\nSerialized in Weekly Shonen Jump from 2016 to 2020, the series has sold over 150 million copies and became a cultural phenomenon when its Mugen Train film became Japan's highest-grossing film of all time in 2020 (roughly ¥40.4 billion). Its blend of intricate action with universal themes of family, loss, and atonement is widely credited for its broad appeal.",
    communityNote:"『귀멸의 칼날』은 고토게 코요하루가 2016년부터 2020년까지 주간 소년 점프에 연재한 만화로, 전 23권 완결. 유포테이블 제작의 TV 애니메이션(2019~)과 극장판 '무한열차편'(2020, 일본 역대 흥행 1위), '무한성편' 극장판 시리즈(2025~)로 이어지며 세계적인 흥행을 기록했다. 다이쇼시대(1912~1926)를 배경으로 하되 실제 역사적 사건보다는 가상의 오니 설정에 집중한 작품이라, 이 사이트에서는 '실제 촬영지' 대신 이름이 겹치는 실존 명소(다자이후 카마도 신사)와 제작진이 참고한 것으로 알려진 실존 모티브(치치부 철도, 교토 철도박물관, 키노사키 오카와소 료칸 등)를 중심으로 순례 코스를 안내한다.",
    communityNote_en:"Demon Slayer: Kimetsu no Yaiba was serialized by Koyoharu Gotouge in Weekly Shonen Jump from 2016 to 2020, completed in 23 volumes. The Ufotable-produced TV anime (2019–) and the Mugen Train film (2020, Japan's highest-grossing film ever) and the ongoing Infinity Castle film series (2025–) carried the series to worldwide success. Because it's set in a fictionalized Taisho era (1912–1926) focused on invented demon lore rather than real historical events, this site's pilgrimage guide centers on real places that share a name with the story (Kamado Shrine in Dazaifu) and real-world motifs the production is known to have referenced (the Chichibu Railway, Kyoto Railway Museum, Okawaso Ryokan in Kinosaki), rather than literal filming locations.",
    hookBadge:"귀멸의 칼날 · 실제 성지순례지 & 숨은 모티브",
    hookTagline:"무한열차, 실제 모델이 있다고?",
    discoveryHook:[
      "《귀멸의 칼날》은 다이쇼시대 가상의 일본이 배경이라 '진짜 촬영지'는 없다. 그런데 찾아보니 의외로 갈 곳이 많았다.",
      "제일 먼저 나온 건 다자이후의 카마도 신사. 탄지로의 성씨 '카마도'랑 이름이 완전히 같은 진짜 신사다. 원래도 유명했는데, 작품이 흥행한 뒤로 전 세계 팬들이 몰려드는 성지가 됐다고 한다.",
      "무한열차. 그 시커먼 증기기관차가 실존 모델이 있다는 게 제일 놀라웠다. 교토 철도박물관에 전시된 C62형 증기기관차 '시고사이'가 유력한 모티브로 꼽힌다.",
      "그런데 애니메이션 제작사가 실제로 참고했다고 알려진 진짜 증기기관차는 따로 있다더라. 사이타마 치치부 철도의 파레오익스프레스. 팬들 사이에선 '진짜 무한열차'라고 불린다고.",
      "무한성 내부는 어떨까 찾아봤더니, 효고현 키노사키온천의 오카와소 료칸이 자주 언급됐다. 화려하고 미로 같은 복도 구조가 무잔의 처소를 비롯한 방들의 디자인이랑 겹쳐진다는 평이 많더라.",
      "물론 이건 다 '모티브로 추정되는' 곳들이다. 다이쇼시대 자체가 가상으로 각색된 배경이라, 정확히 여기가 맞다고 확정된 곳은 별로 없다.",
      "이야기 자체를 다시 떠올려보면, 이 작품이 왜 그렇게까지 사랑받았는지 알 것도 같다. 숯을 팔아 가족을 부양하던 탄지로가 마을에 다녀온 사이, 가족 전원이 오니에게 살해당하는 참극부터가 시작이니까.",
      "유일하게 살아남은 여동생 네즈코마저 오니로 변해버렸는데, 이상하게 오빠를 공격하지 않는다. 탄지로는 네즈코를 다시 인간으로 되돌릴 방법을 찾고, 동시에 가족의 원수를 갚기 위해 귀살대에 입대한다.",
      "젠이츠, 이노스케 같은 개성 강한 동료들을 만나면서 탄지로는 나타구모산에서 처음으로 상급 오니와 맞서고, 무한열차에서는 염주 렌고쿠 쿄쥬로의 죽음을 목격한다. 이 장면 하나 때문에 극장판이 그렇게 흥행했다는 말도 있더라.",
      "요시와라 유곽 편에서는 우즈이 텐겐과 함께 상현의 오니와 사투를 벌이고, 대장장이 마을과 하시라 훈련을 거치면서 귀살대 전체의 힘이 점점 응집된다.",
      "그리고 이야기는 결국 무잔과 귀살대 전원이 무한성에서 격돌하는 최종장으로 향한다. 백여 년 가까운 싸움의 결말이다.",
      "특히 이 결말이 재밌는 게, 그냥 '오니를 이겼다'로 끝나는 게 아니라 백여 년을 건너온 인연이 현재로 이어지는 방식이라는 거다. 탄지로 일행이 그 오랜 싸움을 어떻게 매듭짓는지, 그리고 그 인연이 지금 시대에 어떤 모습으로 남아있는지는 직접 보는 걸 추천한다.",
      "2016년부터 2020년까지 주간 소년 점프에 연재된 이 만화, 누계 발행 부수가 1억 5천만 부를 넘겼다고 한다. 극장판 '무한열차편'은 2020년 일본 역대 흥행 수입 1위(약 404억 엔)를 기록하며 사회적 현상이 됐다.",
      "가족애, 상실, 속죄라는 보편적인 정서를 정교한 액션이랑 같이 담아낸 게 이렇게까지 폭넓은 사랑을 받은 이유라고들 하는데, 다 보고 나니까 그 말이 맞다는 생각이 든다.",
      "그러니까 이 작품, 이름이 겹치는 신사부터 증기기관차, 료칸까지 따라가다 보면 완전히 허구만은 아니라는 느낌이 든다. 다자이후에서 시작해서 규슈 온천 마을까지 이어보는 코스, 한번 해보고 싶다."
    ],
    hookReveals:[
      { label:"카마도 신사 → 탄지로 성씨와 같은 이름의 진짜 신사(다자이후)", label_en:"Kamado Shrine → a real shrine sharing Tanjiro's surname, in Dazaifu", locId:"kimetsu_kamado_shrine" },
      { label:"무한열차 → 교토 철도박물관의 증기기관차 '시고사이'가 유력한 모티브", label_en:"The Mugen Train → likely modeled on the 'Shigosai' locomotive at Kyoto Railway Museum", locId:"kimetsu_kyoto_railway_museum" },
      { label:"'진짜 무한열차' → 사이타마 치치부 철도 파레오익스프레스", label_en:"The 'real Mugen Train' → Saitama's Chichibu Railway Paleo Express", locId:"kimetsu_chichibu_sl" },
      { label:"무한성 내부 → 효고현 키노사키온천 오카와소 료칸이 모티브로 거론", label_en:"Infinity Castle interiors → said to be inspired by the Okawaso Ryokan in Kinosaki", locId:"kimetsu_okawaso" }
    ],
    hookBadge_en:"Demon Slayer · Real pilgrimage sites & hidden motifs",
    hookTagline_en:"Wait, the Mugen Train has a real-life model?",
    discoveryHook_en:[
      "Demon Slayer is set in a fictionalized version of the Taisho era, so there's no such thing as a real filming location — but it turns out there's still a surprising amount to visit.",
      "First up: Kamado Shrine in Dazaifu, a real shrine that shares its name exactly with Tanjiro's surname. It was already well known, but became a full-blown pilgrimage site for fans worldwide once the series took off.",
      "The Mugen Train was the biggest surprise — that black steam engine actually has a real-world counterpart. The C62-class locomotive 'Shigosai' on display at the Kyoto Railway Museum is widely cited as its likely model.",
      "But there's a separate steam train the animation studio is actually known to have referenced: the Paleo Express on Saitama's Chichibu Railway. Fans apparently call it 'the real Mugen Train.'",
      "As for the Infinity Castle's interior, the Okawaso Ryokan in Kinosaki Onsen, Hyogo, comes up a lot — people compare its lavish, maze-like corridors to Muzan's chambers and the castle's other rooms.",
      "All of this is inferred, of course, since the setting is a fictionalized version of history — nothing's officially confirmed as 'the' real spot.",
      "Thinking back on the story itself, though, I get why it's loved this much. It starts with Tanjiro, who sells charcoal to support his family, coming home to find they've all been slaughtered by a demon while he was away.",
      "The one survivor, his sister Nezuko, has been turned into a demon herself — but strangely, she never attacks him. Tanjiro joins the Demon Slayer Corps both to find a way to turn her back and to avenge his family.",
      "Meeting strong-willed companions like Zenitsu and Inosuke, he faces a serious demon for the first time on Mount Natagumo, then witnesses the death of Flame Hashira Kyojuro Rengoku aboard the Mugen Train — people say that one scene alone is what made the film such a massive hit.",
      "In the Entertainment District arc, he fights an Upper Rank demon alongside Sound Hashira Tengen Uzui, and after the Swordsmith Village arc and brutal Hashira training, the Corps' collective strength keeps building.",
      "It all leads to the final arc: the full Corps against Muzan in the Infinity Castle — the climax of a fight that's been building for nearly a hundred years.",
      "What makes the ending interesting is that it's not just 'they beat the demon.' The bond that's carried across that century actually continues into the present day. I'd recommend seeing for yourself how Tanjiro and his friends close out that long fight, and what shape that bond takes in the modern era.",
      "Serialized in Weekly Shonen Jump from 2016 to 2020, the manga has sold over 150 million copies. The Mugen Train film became Japan's highest-grossing film ever in 2020 (about ¥40.4 billion) and turned into a genuine cultural phenomenon.",
      "People say it's the combination of intricate action with universal themes — family, loss, atonement — that gave it such broad appeal, and having gone through it all, I think that's exactly right.",
      "So tracing the shrine that shares a name, then the steam engines, then the ryokan, this story stops feeling entirely made up. Starting in Dazaifu and working through Kyushu's onsen towns sounds like a trip worth taking."
    ],
    discoveryHook_ja:[
      "『鬼滅の刃』は大正時代を舞台にした架空の日本が舞台なので、「本物のロケ地」というものは存在しない。それでも調べてみると、意外と巡れる場所は多かった。",
      "まず出てきたのが太宰府の竈門神社。炭治郎の苗字「竈門」とまったく同じ名前を持つ実在の神社だ。もともと有名な場所だったが、作品のヒット後は世界中のファンが訪れる聖地になったという。",
      "無限列車。あの真っ黒な蒸気機関車に実在のモデルがあるというのが、一番驚いた話だった。京都鉄道博物館に展示されているC62形蒸気機関車「シゴサン」が有力なモチーフとされている。",
      "でもアニメ制作会社が実際に参考にしたと言われている蒸気機関車は、また別にあるらしい。埼玉・秩父鉄道のパレオエクスプレス。ファンの間では「本物の無限列車」と呼ばれているそうだ。",
      "無限城の内部はどうだろうと調べてみたら、兵庫県城崎温泉の旅館がよく挙げられていた。豪華で迷路のような廊下の構造が、無惨の居室をはじめとする各部屋のデザインと重なるという声が多い。",
      "もちろんこれらは全部「モチーフと推定される」場所だ。大正時代自体が架空にアレンジされた背景なので、ここが正解だと確定している場所はそう多くない。",
      "でも物語そのものを改めて振り返ると、なぜここまで愛されたのか少しわかる気がする。炭を売って家族を養っていた炭治郎が、村へ行っている間に家族全員が鬼に殺されてしまう惨劇から物語は始まる。",
      "たった一人生き残った妹・禰豆子までもが鬼に変えられてしまうのに、不思議と兄には襲いかからない。炭治郎は禰豆子を人間に戻す方法を探しながら、家族の仇を討つために鬼殺隊に入隊する。",
      "善逸や伊之助といった個性豊かな仲間たちと出会いながら、炭治郎は那田蜘蛛山で初めて上級の鬼と対峙し、無限列車編では炎柱・煉獄杏寿郎の死を目の当たりにする。この一場面だけであの劇場版がヒットしたと言う人もいるくらいだ。",
      "遊郭編では音柱・宇髄天元とともに上弦の鬼と死闘を繰り広げ、刀鍛冶の里編と柱稽古を経て、鬼殺隊全体の力がどんどん結集していく。",
      "そして物語は、無惨と鬼殺隊全員が無限城で激突する最終章へと向かう。百年近くにわたる戦いの結末だ。",
      "この結末がおもしろいのは、単に「鬼を倒した」で終わらないところだ。百年の時を超えてきた縁が、現代へとつながっていく形で締めくくられる。炭治郎たちがその長い戦いをどう終わらせるのか、そしてその縁が今の時代にどんな形で残っているのかは、ぜひ本編で確かめてほしい。",
      "2016年から2020年まで週刊少年ジャンプに連載されたこの漫画、累計発行部数は1億5000万部を超えたという。劇場版「無限列車編」は2020年、日本の歴代興行収入1位(約404億円)を記録し、社会現象になった。",
      "家族愛、喪失、贖罪といった普遍的な感情を、精巧なアクションと一緒に描いたことがこれほど広く愛された理由だとよく言われるけれど、全部見終えたあとだと、本当にその通りだと思う。",
      "というわけでこの作品、名前が重なる神社から蒸気機関車、旅館まで辿っていくと、完全な架空の話とは思えなくなってくる。太宰府から始めて九州の温泉町までつなげる旅程、一度やってみたい。"
    ],
    title_ja:"鬼滅の刃", summary_ja:"炭を売って暮らしていた少年・炭治郎は、ある日家族を失い、たったひとり生き残った妹・禰豆子までもが鬼にされてしまうという惨劇に見舞われる。禰豆子を人間に戻す方法を探すため鬼殺隊に入隊した炭治郎が、仲間たちとともに成長していく、吾峠呼世晴の代表作。", author_ja:"吾峠呼世晴 原作", era_ja:"大正時代(1912~1926年、架空の設定)",
    contentSummary:{ sections:[
      { heading:"하룻밤의 비극", bullets:[
        "숯을 팔며 가족을 부양하던 탄지로가 마을에 다녀온 사이, 가족 전원이 오니에게 살해당한다",
        "유일하게 살아남은 여동생 네즈코마저 오니로 변해버렸지만, 그녀는 오빠를 공격하지 않는다"
      ]},
      { heading:"귀살대 입대와 동료들", bullets:[
        "네즈코를 인간으로 되돌리고 가족의 원수를 갚기 위해 탄지로가 귀살대에 입대한다",
        "젠이츠·이노스케 등 개성 강한 동료들을 만나 나타구모산·무한열차·요시와라에서 함께 싸우며 성장한다"
      ]},
      { heading:"하시라들의 사투", bullets:[
        "9명의 주(하시라)가 각자의 방식으로 상현의 오니들과 맞서며, 저마다의 사연이 서서히 드러난다",
        "대장장이 마을과 하시라 훈련을 거치며 귀살대 전체의 힘이 최종장을 향해 응집된다"
      ]},
      { heading:"무한성, 마지막 결전", bullets:[
        "무잔과 귀살대 전원이 무한성에서 격돌하는 이야기의 클라이맥스가 펼쳐진다",
        "탄지로 일행이 백여 년에 걸친 싸움을 어떻게 매듭짓는지는 작품에서 직접 확인하세요"
      ]}
    ], endingNote:"탄지로와 동료들의 마지막 선택, 그리고 백여 년을 건너온 인연이 현재로 이어지는 결말은 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Kamado shrine 01.JPG", credit:'다자이후 카마도 신사, 후쿠오카(탄지로의 성씨와 이름이 같아 팬들의 대표적 순례지가 된 실존 신사) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Kamado_shrine_01.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EA%B7%80%EB%A9%B8%EC%9D%98_%EC%B9%BC%EB%82%A0" },
  { id:"hope", title:"호프 (Hope)", author:"나홍진 감독·각본", type:"scifi_thriller", country:"korea", medium:"film", genres:["scifi","thriller","horror"],
    // ※ 제79회 칸 국제영화제 경쟁부문 초청작(2026-05 상영, 2026-07-15 국내 개봉). 러닝타임 156분.
    // ※ 극중 배경은 한국 남부의 가상 마을 '호포항'이지만, 실제 촬영은 전남 해남군 북평면 남창리에서
    //   이뤄졌다(해남군이 개봉에 맞춰 '영화의 거리'로 조성). 숲 장면만 예외적으로 루마니아 카르파티아
    //   산맥에서 촬영됐다(국내 숲의 잔가지가 많아 원하는 화면을 얻기 어려웠다는 제작진의 설명).
    //   지도는 사용자 요청에 따라 한국(해남)을 중심으로 고정한다.
    // ※ 상영시간 156분의 장편영화라 등장인물·장소 수 자체가 원작 만화·소설 시리즈보다 한정적이다.
    //   나무위키 등장인물 문서에 실명이 확인된 인물만(약 35명), 극중·실제 장소도 확인 가능한 만큼만
    //   (약 40곳) 수록했다 — 임의로 인원·장소를 늘리지 않는다(정확성 원칙).
    era:"극중 1980년대 초(2026년 제작)", title_en:"Hope", author_en:"Directed & written by Na Hong-jin", era_en:"Set in the early 1980s (released 2026)",
    summary:"작은 시골 마을 호포항에 정체를 알 수 없는 존재가 나타나면서 벌어지는 참극. 출장소장 범석, 사냥꾼 성기, 경찰관 성애가 정체불명의 외계 생명체와 사투를 벌이는, 나홍진 감독이 《곡성》 이후 10년 만에 내놓은 신작이자 제79회 칸 영화제 경쟁부문 초청작.",
    longSummary:"작은 시골 마을 호포항. 출장소장 범석은 훼손된 소 사체를 확인하러 갔다가 예사롭지 않은 낌새를 느낀다. 얼마 지나지 않아 마을 전체가 정체불명의 존재에게 초토화되고, 범석은 상황을 채 파악하기도 전에 거대한 생명체를 상대로 사투를 벌이게 된다.\n\n한편 산으로 사냥을 나선 성기와 동료들은 숲속에서 추락한 정체불명의 우주선을 발견한다. 그 안에서 소형 외계 생명체를 목격한 이들은 곧 아이도보르에게 유인당해 마베이요와 조르에게 포위되고, 성기를 제외한 동료 전원이 목숨을 잃는 참극을 겪는다. 마을에서는 향토예비군 노인들과 민병대가 잇따라 외계 생명체에게 목숨을 잃고, 저수지 근처 폐가에 사는 은둔자 양배는 자신이 사살한 어린 외계 생명체(칼리)의 정체를 두고 석연찮은 증언을 이어간다.\n\n인간과 외계인 사이의 충돌은 선과 악의 구도가 아니라, 서로를 이해하지 못하는 '다른 존재'들 사이의 비극으로 그려진다. 극 후반, 공통된 무언가를 지녔던 존재가 죽는 순간 이 영화가 던지는 질문 — 앞으로 그들은 어떻게 나아갈 것인가 — 이 제목 '호프'에 담긴 의미로 다가온다.\n\n《추격자》·《황해》·《곡성》으로 한국형 스릴러를 대표해 온 나홍진 감독이 처음으로 외계 생명체 소재에 도전한 작품으로, 2026년 5월 제79회 칸 국제영화제 경쟁부문에서 처음 공개돼 전 세계 영화 팬들의 이목을 집중시켰다. 국내에서는 2026년 7월 15일 개봉했으며, 러닝타임은 156분이다. 극중 배경은 가상의 마을 '호포항'이지만 실제로는 전남 해남군 북평면 남창리에서 대부분이 촬영됐고, 해남군은 개봉에 맞춰 이 마을을 1970~80년대 풍경의 '영화의 거리'로 조성했다. 다만 숲 장면만은 국내 숲의 나무가 촬영에 적합하지 않아 루마니아 카르파티아 산맥에서 찍혔다.",
    pinColor:"#2a4a1a",
    summary_en:"A tragedy unfolds when an unidentifiable being appears in the small coastal village of Hopo Port. Police box chief Beom-seok, hunter Seong-gi, and officer Seong-ae fight for their lives against the alien creatures in Na Hong-jin's first film in ten years since The Wailing — and an official competition entry at the 79th Cannes Film Festival.",
    longSummary_en:"In the small village of Hopo Port, police chief Beom-seok goes to inspect a mutilated cow carcass and senses something is deeply wrong. Before long, the entire village is devastated by an unidentified being, and Beom-seok finds himself fighting for his life against a massive creature before he can even grasp what's happening.\n\nMeanwhile, hunter Seong-gi and his companions, out in the mountains, discover a crashed, unidentified spacecraft in the forest. After glimpsing a small alien creature inside, they're lured by Ai'dovor into an ambush by Ma'veyyo and J'aur, and everyone but Seong-gi is killed. In the village, elderly militia members and civilian defenders are killed one after another by the creatures, while Yang-bae, a recluse living in an abandoned house near a reservoir, gives increasingly suspicious testimony about a young alien (Kali) he shot and killed.\n\nThe conflict between humans and aliens is framed not as good versus evil, but as a tragedy between beings who simply cannot understand one another. In the film's final act, as a being carrying something both sides shared is lost, the question of where they go from here becomes the meaning behind the title, Hope.\n\nHaving defined Korean-style thrillers with The Chaser, The Yellow Sea, and The Wailing, director Na Hong-jin tackles alien-invasion material for the first time here. The film premiered in the official competition at the 79th Cannes Film Festival in May 2026, drawing global attention, and opened in Korean theaters on July 15, 2026, with a runtime of 156 minutes. Though set in the fictional village of Hopo Port, most of it was actually filmed in Namchang, Bukpyeong-myeon, Haenam County — which the county dressed up as a 1970s–80s 'Movie Street' to coincide with the release. Only the forest scenes were shot elsewhere, in Romania's Carpathian Mountains, since Korean forest trees proved unsuitable for the look the production wanted.",
    communityNote:"《호프》는 나홍진 감독·각본의 2026년작 SF 스릴러로, 제79회 칸 국제영화제 경쟁부문에 초청돼 2026년 5월 상영됐고 국내에는 7월 15일 개봉했다(러닝타임 156분, 15세 관람가). 황정민(고범석)·조인성(고성기)·정호연(임성애)이 주연을 맡았고, 외계 생명체 역은 카메론 브리튼·마이클 패스벤더·테일러 러셀·알리시아 비칸데르 등이 연기했다. 마을 장면은 전남 해남군 북평면 남창리에서, 숲 장면은 루마니아 카르파티아 산맥에서 촬영됐다. 해남군은 개봉에 맞춰 남창리 일대를 '영화의 거리'로 조성해 관광 자원으로 활용하고 있다.",
    communityNote_en:"Hope is a 2026 sci-fi thriller directed and written by Na Hong-jin, invited to the official competition at the 79th Cannes Film Festival (screened May 2026) and released in Korean theaters on July 15, 2026 (156 minutes, rated 15+). It stars Hwang Jung-min (Go Beom-seok), Jo In-sung (Go Seong-gi), and Jung Ho-yeon (Im Seong-ae), with the alien creatures performed by Cameron Britton, Michael Fassbender, Taylor Russell, and Alicia Vikander. Village scenes were filmed in Namchang, Bukpyeong-myeon, Haenam County, while forest scenes were shot in Romania's Carpathian Mountains. Haenam County dressed up the Namchang area as a 'Movie Street' to coincide with the release, now used as a tourism draw.",
    hookBadge:"제79회 칸 영화제 경쟁부문 · 나홍진 감독 신작 · 촬영지 & 숨은 이야기",
    hookTagline:"호포항이라는 마을, 지도에 있을까?",
    discoveryHook:[
      "《호프》 보고 나서 제일 먼저 궁금했던 건 '호포항'이라는 마을이 진짜 있나 하는 거였다.",
      "찾아보니 없었다. 극중 무대는 가상의 마을이고, 실제 촬영은 전남 해남군 북평면 남창리에서 이뤄졌다고 한다.",
      "더 흥미로웠던 건 옛 북평 버스터미널이다. 실제로 있던 버스터미널 건물을 극중 '호포출장소' 파출소로 새단장해서 찍었는데, 지금도 그 모습 그대로 남아 있다. 촬영에 쓰인 스텔라 경찰차까지 건물 앞에 그대로 전시돼 있다고.",
      "해남군이 개봉에 맞춰 이 일대를 아예 1970~80년대 분위기의 '영화의 거리'로 조성했다는 것도 알게 됐다. 배우 벽화, 외계 생명체 조형물까지 있다더라.",
      "그런데 숲 장면만은 얘기가 다르다. 극중에서는 분명 한국의 산인데, 실제로는 루마니아 카르파티아 산맥에서 찍었다고. 국내 숲의 나무는 잔가지가 많아서 원하는 화면이 안 나왔다는 게 제작진 설명이었다.",
      "그러니까 이 영화, 한 마을 이야기 같지만 실제로는 지구 반대편까지 걸쳐서 만들어진 셈이다.",
      "내용을 다시 떠올려보면, 출장소장 범석이 훼손된 소 사체를 확인하러 갔다가 뭔가 심상치 않다는 걸 느끼는 데서 시작한다. 그리고 얼마 지나지 않아 마을 전체가 정체불명의 존재에게 초토화된다.",
      "산으로 사냥을 나선 성기와 동료들은 숲속에서 추락한 우주선을 발견한다. 그 안에서 소형 외계 생명체를 목격한 이들은 곧 '아이도보르'에게 유인당해 '마베이요'와 '조르'에게 포위되고, 성기를 제외한 동료 전원이 목숨을 잃는다.",
      "마을에서는 향토예비군 노인들과 민병대가 잇따라 외계 생명체에게 목숨을 잃는다. 저수지 근처 폐가에 사는 은둔자 양배는 자기가 사살한 어린 외계 생명체 '칼리'의 정체를 두고 계속 석연찮은 증언을 이어간다.",
      "이 영화가 특별한 건, 인간과 외계인의 충돌을 그냥 '선 vs 악'으로 안 그린다는 점이다. 서로를 이해하지 못하는 '다른 존재'들 사이의 비극으로 그린다.",
      "후반부에 범석·성애·낙연이 힘을 합쳐 마베이요와 최후의 결전을 벌이는데, 그 결말에서 제목 '호프'에 담긴 진짜 의미가 뭔지 알게 된다. 여기서는 말을 아끼고 싶다.",
      "나홍진 감독이 《추격자》·《황해》·《곡성》으로 한국형 스릴러를 대표해왔는데, 이번에 처음으로 외계 생명체 소재에 도전한 거라고. 《곡성》 이후 10년 만의 신작이라는 것도 이번에 알게 됐다.",
      "2026년 5월 제79회 칸 국제영화제 경쟁부문에서 처음 공개돼 전 세계 영화 팬들의 이목을 집중시켰고, 국내에서는 7월 15일 개봉했다. 러닝타임이 156분이나 되는데, 보고 나면 그 긴 시간이 이해가 간다.",
      "해남에 갈 일이 있으면 남창리부터 들러보고 싶다. 옛 버스터미널 앞에 서서 그 경찰차를 실제로 보면, 영화가 좀 다르게 다가올 것 같다."
    ],
    hookReveals:[
      { label:"호포항 → 실제로는 전남 해남군 남창리", label_en:"Hopo Port → actually Namchang, Haenam County", locId:"hope_namchang_town" },
      { label:"옛 북평 버스터미널 → '호포출장소'로 새단장, 지금도 그 모습 그대로", label_en:"The old bus terminal → redressed as the 'Hopo Police Box,' still standing as-is", locId:"hope_police_box" },
      { label:"극중 한국의 산 → 실제로는 루마니아 카르파티아 산맥", label_en:"A Korean mountainside in the story → actually Romania's Carpathian Mountains", locId:"hope_romania_forest" },
      { label:"제79회 칸 영화제 → 뤼미에르 대극장에서 첫 공개", label_en:"The 79th Cannes Film Festival → premiered at the Lumière theatre", locId:"hope_cannes_lumiere" }
    ],
    hookBadge_en:"79th Cannes Official Competition · Na Hong-jin's new film · Locations & the story behind them",
    hookTagline_en:"Is the village 'Hopo Port' on any map?",
    discoveryHook_en:[
      "After watching Hope, the first thing I wanted to know was whether the village 'Hopo Port' was a real place.",
      "It isn't. The setting is fictional, but the actual filming took place in Namchang, Bukpyeong-myeon, Haenam County, in South Jeolla Province.",
      "What I found more interesting was the old Bukpyeong bus terminal. The production redressed the real building as the fictional 'Hopo Police Box,' and it's been left exactly as it appears on screen — even the actual Kia Stellar patrol car used in filming is still parked out front.",
      "Haenam County apparently dressed up the whole area in a 1970s–80s look to coincide with the release, calling it 'Movie Street' — complete with actor murals and alien-creature sculptures.",
      "The forest scenes are a different story, though. In the film it's clearly a Korean mountainside, but it was actually shot in Romania's Carpathian Mountains — the production said Korean forest trees had too many small branches to get the look they wanted.",
      "So this film, which plays like the story of one small village, was actually pieced together from opposite sides of the planet.",
      "Thinking back over the plot: it starts with police chief Beom-seok going to inspect a mutilated cow carcass and sensing something is deeply wrong. Before long, the entire village is devastated by an unidentified being.",
      "Meanwhile hunter Seong-gi and his companions, out in the mountains, find a crashed spacecraft in the forest. After spotting a small alien creature inside, they're lured by a creature called Ai'dovor into an ambush by Ma'veyyo and J'aur, and everyone but Seong-gi is killed.",
      "In the village, elderly militia members and civilian defenders are killed one after another. Yang-bae, a recluse living in an abandoned house near a reservoir, keeps giving suspicious testimony about a young alien named Kali that he shot and killed.",
      "What makes the film unusual is that it never frames the human-alien conflict as good versus evil — it's a tragedy between beings who simply can't understand each other.",
      "In the final act, Beom-seok, Seong-ae, and Nak-yeon join forces for a last stand against Ma'veyyo, and it's in that ending that the title's real meaning — Hope — clicks into place. I'll leave the specifics for you to see.",
      "Director Na Hong-jin has defined Korean-style thrillers with The Chaser, The Yellow Sea, and The Wailing, and this is his first time tackling alien-invasion material — and, I learned, his first film in ten years since The Wailing.",
      "It premiered in the official competition at the 79th Cannes Film Festival in May 2026, drawing worldwide attention, and opened in Korean theaters on July 15. At 156 minutes, it's a long film, but watching it, that runtime makes sense.",
      "If I'm ever in Haenam, I want to stop by Namchang first. Standing in front of that old bus terminal and seeing the actual patrol car would probably make the film hit differently."
    ],
    discoveryHook_ja:[
      "『ホープ』を見終えたあと、まず気になったのは「ホポ港」という村が実在するのかということだった。",
      "調べてみたら、なかった。劇中の舞台は架空の村で、実際の撮影は全羅南道・海南郡の南倉里(ナムチャンリ)で行われたのだという。",
      "もっと興味深かったのは、旧・北平バスターミナルだ。実在していたバスターミナルの建物を劇中の「ホポ駐在所」として改装して撮影したもので、今もそのままの姿で残っている。撮影に使われたステラのパトカーまで、建物の前にそのまま展示されているらしい。",
      "海南郡が公開に合わせて、この一帯を丸ごと1970~80年代の雰囲気の「映画の通り」として整備したというのも初めて知った。俳優の壁画から地球外生命体のオブジェまであるという。",
      "でも森のシーンだけは事情が違う。劇中では明らかに韓国の山なのに、実際にはルーマニアのカルパティア山脈で撮影されたのだそうだ。韓国の森の木は枝が多くて、狙った画が撮れなかったというのが制作陣の説明だった。",
      "つまりこの映画、一つの村の話のようでいて、実は地球の反対側まで股にかけて作られていたわけだ。",
      "内容を改めて振り返ると、駐在所長のポムソクが損傷した牛の死骸を確認しに行き、何か普通じゃない気配を感じるところから始まる。そしてすぐに、村全体が正体不明の存在によって壊滅させられる。",
      "山へ猟に出たソンギたちは、森の中で墜落した宇宙船を発見する。中で小型の地球外生命体を目撃した彼らは、「アイドヴォル」に誘い出されて「マベイヨ」と「ジョール」に包囲され、ソンギを除く仲間全員が命を落とす。",
      "村では郷土予備軍の老人たちや民兵が次々と地球外生命体に殺されていく。貯水池近くの廃屋に住む隠者ヤンベは、自分が撃ち殺した幼い地球外生命体「カリ」の正体をめぐって、どこか腑に落ちない証言を続ける。",
      "この映画が特別なのは、人間と地球外生命体の衝突を単純な「善対悪」として描かない点だ。互いを理解できない「異なる存在」同士の悲劇として描いている。",
      "終盤、ポムソク・ソンエ・ナギョンが力を合わせてマベイヨとの最後の決戦に挑むのだが、その結末で、タイトル「ホープ」に込められた本当の意味がわかる。ここはあえて詳しく書かないでおきたい。",
      "ナ・ホンジン監督は『チェイサー』『哭声/コクソン』などで韓国型スリラーを代表してきた人だが、今回初めて地球外生命体という題材に挑んだのだという。『哭声』以来10年ぶりの新作だということも、今回初めて知った。",
      "2026年5月、第79回カンヌ国際映画祭のコンペティション部門で初公開され、世界中の映画ファンの注目を集めた。韓国国内では7月15日に公開。上映時間は156分と長いが、見終えるとその長さにも納得がいく。",
      "海南に行く機会があれば、まず南倉里に立ち寄ってみたい。旧バスターミナルの前に立って、あの実際のパトカーを目にすれば、映画がまた違って感じられそうだ。"
    ],
    title_ja:"ホープ", summary_ja:"小さな漁村ホポ港に正体不明の存在が現れたことで始まる惨劇。駐在所長ポムソク、猟師ソンギ、警察官ソンエが得体の知れない地球外生命体と死闘を繰り広げる、ナ・ホンジン監督が『哭声/コクソン』以来10年ぶりに送り出す新作にして、第79回カンヌ国際映画祭コンペティション部門正式出品作。", author_ja:"ナ・ホンジン監督・脚本", era_ja:"劇中は1980年代初頭(2026年製作)",
    contentSummary:{ sections:[
      { heading:"조용한 마을에 나타난 존재", bullets:[
        "출장소장 범석이 훼손된 소 사체를 확인하러 갔다가 심상치 않은 낌새를 느낀다",
        "얼마 지나지 않아 마을 전체가 정체불명의 존재에게 초토화된다"
      ]},
      { heading:"숲에서 발견한 우주선", bullets:[
        "사냥꾼 성기 일행이 숲에서 추락한 우주선과 외계 생명체를 목격한다",
        "아이도보르에게 유인당해 매복에 걸리며 동료 대부분을 잃는다"
      ]},
      { heading:"마을을 휩쓰는 사투", bullets:[
        "향토예비군 노인들과 민병대가 잇따라 외계 생명체에게 목숨을 잃는다",
        "저수지 근처에 사는 은둔자 양배의 석연찮은 증언이 또 다른 의문을 남긴다"
      ]},
      { heading:"고속도로의 마지막 사투", bullets:[
        "범석·성애·낙연이 힘을 모아 마베이요와 최후의 결전을 벌인다",
        "제목 '호프'에 담긴 진짜 의미와 결말은 작품에서 직접 확인하세요"
      ]}
    ], endingNote:"인간과 외계인, 서로 다른 두 존재 사이에서 무엇이 남는지는 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Jindo Bridge.jpg", credit:'진도대교, 전남 해남~진도(호프 촬영지 해남 남창리에서 30~40분 거리, 명량대첩의 실제 현장 울돌목을 가로지르는 다리) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Jindo_Bridge.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%ED%98%B8%ED%94%84_(2026%EB%85%84_%EC%98%81%ED%99%94)" },
  { id:"odyssey", title:"오디세이 (The Odyssey)", author:"크리스토퍼 놀란 감독·각본 (원작: 호메로스 《오디세이아》)", type:"war_fantasy_epic", country:"usa", medium:"film", genres:["fantasy","war","adventure","drama"],
    // ※ 2026-07-17 미국·영국 개봉, 2026-08-05 한국 개봉(172분, 15세 관람가). 제작비 2억 5천만 달러로
    //   놀란 감독 최대 규모이자 역대 R등급 영화 최대 제작비. IMAX 필름 카메라로 전면 촬영된 최초의 장편영화.
    // ※ 장소는 (1) 실제 촬영지 — 이탈리아 시칠리아/에올리에 제도, 모로코, 그리스 펠로폰네소스, 스코틀랜드,
    //   아이슬란드, 몰타, 미국 LA — 와 (2) 실제 그리스 신화 지리에서 전통적으로 비정돼 온 진짜 장소(이타키
    //   섬, 트로이 유적 히사를리크, 필로스, 스파르타, 미케네, 메시나 해협 등) 두 갈래를 모두 표기했다.
    //   가상의 신화적 공간(저승, 세이렌의 바다, 칼립소의 섬 등)은 촬영지 또는 전통적 비정지가 확인되는
    //   대로 연결했다. 인물도 (a) 영화 출연진이 확인된 인물, (b) 극중 대사로 언급된 인물, (c) 원작
    //   《오디세이아》 및 트로이 전쟁 서사시 전통에서만 확인되는 인물(영화에는 없음, 명시 표기)로 구분해
    //   100명 이상을 수록했다 — 임의로 인원·장소를 늘리지 않는다(정확성 원칙).
    era:"고대 그리스 신화 시대(트로이 전쟁 이후, 2026년 제작)", title_en:"The Odyssey", author_en:"Directed & written by Christopher Nolan (based on Homer's Odyssey)", era_en:"Ancient Greek mythological setting, after the Trojan War (released 2026)",
    summary:"트로이 전쟁을 승리로 이끈 이타카의 왕 오디세우스가 아내 페넬로페와 아들 텔레마코스가 있는 고향으로 돌아가기 위해 10년에 걸쳐 신들의 시험과 괴물들을 마주하는 이야기. 크리스토퍼 놀란 감독이 최초로 IMAX 필름 전면 촬영에 도전한 신화 서사극이자, 2026년 최대 흥행작 중 하나.",
    longSummary:"트로이 전쟁이 끝난 지 20년, 이타카의 왕비 페넬로페는 여전히 남편 오디세우스의 생사를 모른 채 시아버지의 수의를 짜는 척 매일 밤 몰래 풀며 안티노오스를 비롯한 구혼자들의 청혼을 미루고 있다. 아들 텔레마코스는 아버지의 부재 속에 원로들의 후계 압박과 구혼자들의 무례함에 시달리다, 결국 아버지의 소식을 찾아 홀로 스파르타로 향한다.\n\n한편 어느 섬에서 기억을 잃은 채 깨어난 오디세우스는 여신 칼립소의 곁에서 서서히 자신에게 돌아가야 할 집이 있음을 기억해낸다. 트로이를 함락시킨 목마 계략의 주인공이었던 그는, 승리 이후 귀향길에서 키코네스족의 마을을 약탈하고, 외눈박이 거인 폴리페무스를 실명시켜 그 아버지 포세이돈의 저주를 사고, 거인족 라이스트뤼고네스에게 함대 대부분을 잃고, 마녀 키르케의 섬에서 부하들이 돼지로 변하는 등 끝없는 시련을 겪는다. 저승에서 예언자 테이레시아스로부터 '오직 자신만이 살아 돌아갈 운명'이라는 예언을 들은 오디세우스는 신들에게 맞서 그 운명을 바꾸겠다 다짐하지만, 세이렌의 노래와 스킬라·카리브디스, 태양신 헬리오스의 신성한 소를 둘러싼 마지막 금기까지 모두 그를 시험한다.\n\n텔레마코스는 스파르타의 왕 메넬라오스와 왕비 헬레네로부터 트로이 목마 작전의 전말과 아버지의 활약상을 직접 전해 듣고, 아가멤논이 귀향 후 아내 클리타임네스트라에게 살해당한 비극도 알게 된다. 결국 뗏목으로 홀로 표류하던 오디세우스는 여신 아테나의 안내로 마침내 고향 이타카 해안에 닿고, 거지로 변장해 옛 심복 에우마이오스와 재회한다. 안티노오스가 보낸 자객들의 위협 속에 귀환한 텔레마코스와 힘을 합친 오디세우스는 열두 자루 도끼 사이로 화살을 쏘는 활 시합으로 정체를 증명하고, 궁을 장악한 구혼자들을 모두 처단한다.\n\n놀란 감독은 원작의 '왕권 회복' 결말 대신, 오디세우스가 텔레마코스에게 왕위를 넘기고 페넬로페와 함께 통치를 내려놓은 채 서쪽 바다로 항해를 떠나는 결말을 택했다. 불타는 트로이 목마의 이미지가 마지막 장면에 겹쳐지며, 이는 끝없는 전쟁에 물든 기성 세대가 다음 세대에게 자리를 내주는 선언이자, 트로이에서 쌓인 죄책을 청산하려는 몸짓으로 해석된다. 맷 데이먼(오디세우스)·톰 홀랜드(텔레마코스)·앤 해서웨이(페넬로페)·로버트 패틴슨(안티노오스)·젠데이아(아테나)·샤를리즈 테론(칼립소) 등 초호화 캐스팅과, 신형 IMAX 필름 카메라로 이탈리아·모로코·그리스·스코틀랜드·아이슬란드·몰타를 오가며 전면 실사 촬영한 스케일로 2026년 최고 화제작이자 흥행작에 올랐다.",
    pinColor:"#1e3a8a",
    summary_en:"Odysseus, king of Ithaca and hero of the Trojan War, spends ten years facing the trials of the gods and monsters of legend on his journey home to his wife Penelope and son Telemachus. Christopher Nolan's mythological epic, the first feature ever shot entirely on IMAX film, became one of 2026's biggest hits.",
    longSummary_en:"Twenty years after the Trojan War ended, Queen Penelope of Ithaca still doesn't know whether her husband Odysseus is alive, stalling the suitor Antinous and his rivals by weaving her father-in-law's burial shroud by day and secretly unravelling it by night. Their son Telemachus, worn down by the elders' pressure over succession and the suitors' contempt, sets sail alone for Sparta in search of news.\n\nMeanwhile, on a distant island, a memory-wiped Odysseus slowly begins to recall that he has a home to return to, in the company of the goddess Calypso. The mastermind of the Trojan Horse, Odysseus faces one trial after another on his way home: raiding the Cicones' town, blinding the one-eyed giant Polyphemus and earning the curse of his father Poseidon, losing most of his fleet to the giant Laestrygonians, and watching his men turned to pigs on the witch Circe's island. Told by the prophet Tiresias in the underworld that he alone is fated to survive, Odysseus vows to defy the gods and change that fate — but the Sirens' song, the strait between Scylla and Charybdis, and a final taboo involving the sun god Helios's sacred cattle all still await him.\n\nTelemachus, for his part, hears the full story of the Trojan Horse and his father's exploits directly from King Menelaus and Queen Helen of Sparta, along with the tragedy of Agamemnon's murder by his wife Clytemnestra upon his return. Odysseus, adrift alone on a raft, is finally guided to the shore of Ithaca by the goddess Athena, and reunites — disguised as a beggar — with his loyal old retainer Eumaeus. With Antinous's assassins closing in on the returning Telemachus, father and son join forces: Odysseus proves his identity by shooting an arrow through twelve axes, and together they cut down every suitor occupying the palace.\n\nRather than the traditional ending of restored kingship, Nolan has Odysseus hand the throne to Telemachus and sail west with Penelope, leaving rule behind — the image of the burning Trojan Horse overlaying the final scene as a declaration that a generation steeped in endless war is stepping aside for the next, and a gesture of atonement for the guilt of Troy. With a starry cast — Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson, Zendaya, Charlize Theron — and newly developed IMAX film cameras carrying production across Italy, Morocco, Greece, Scotland, Iceland, and Malta, it became one of the defining blockbusters of 2026.",
    communityNote:"《오디세이》는 크리스토퍼 놀란 감독·각본의 2026년작 신화 서사극으로, 호메로스의 《오디세이아》를 원작으로 한다. 미국·영국은 2026년 7월 17일, 한국은 8월 5일 개봉했으며(172분, 15세 관람가), 제작비는 2억 5천만 달러로 놀란 감독 최대 규모다. 신형 IMAX 필름 카메라로 전면 촬영된 최초의 장편영화라는 점이 화제가 됐고, 시칠리아 파비냐나·모로코 아이트 벤하두·그리스 펠로폰네소스·스코틀랜드 애버딘셔·아이슬란드·몰타 등 6개국을 오가며 91일간 촬영했다. 맷 데이먼(오디세우스)·톰 홀랜드(텔레마코스)·앤 해서웨이(페넬로페)·로버트 패틴슨(안티노오스)·젠데이아(아테나)·샤를리즈 테론(칼립소) 등이 출연했으며, 개봉 직후 전 세계 흥행 11억 달러를 넘어섰다.",
    communityNote_en:"The Odyssey is Christopher Nolan's 2026 mythological epic, based on Homer's Odyssey. It opened in the US and UK on July 17, 2026, and in Korea on August 5 (172 minutes, rated 15+), with a $250 million budget — Nolan's largest to date. Shot entirely on newly developed IMAX film cameras over a 91-day shoot across six countries — Sicily's Favignana, Morocco's Aït Ben Haddou, Greece's Peloponnese, Aberdeenshire in Scotland, Iceland, and Malta — it stars Matt Damon (Odysseus), Tom Holland (Telemachus), Anne Hathaway (Penelope), Robert Pattinson (Antinous), Zendaya (Athena), and Charlize Theron (Calypso), and crossed $1.1 billion at the worldwide box office shortly after release.",
    hookBadge:"크리스토퍼 놀란 감독 · 6개국 실사 촬영 · 신화의 실제 무대",
    hookTagline:"영화 속 이타카는 진짜 이타카가 아니었다",
    discoveryHook:[
      "《오디세이》를 보고 나서 알게 된 게 있다. 영화 속 '이타카'는 진짜 이타카가 아니었다.",
      "오디세우스의 왕궁 외경은 시칠리아 파비냐나 섬의 15세기 성채에서 찍었다고 한다. 접근로가 없어서 촬영 장비는 삭도로 올리고, 배우들은 매일 걸어서 산을 올라야 했다는 얘기까지 있었다.",
      "그럼 진짜 이타카는 어디냐면, 그리스 이오니아해에 따로 있다. 고대부터 지금까지 '오디세우스의 고향'으로 지목되어온 실제 섬인데, 정작 영화에는 안 나온다.",
      "트로이도 마찬가지였다. 영화 속 트로이 성은 모로코의 아이트 벤하두, 유네스코 세계유산 마을이다. 진짜 트로이 유적 히사를리크는 튀르키예 차낙칼레에 따로 있다.",
      "제일 놀란 건 폴리페무스의 동굴이다. 이건 세트가 아니라 진짜 동굴을 그대로 썼다고 한다. 기원전 6000년부터 사람이 살았다는 그리스의 실제 동굴, CG 없이 차갑고 울리는 그 안에서 그대로 촬영했다는 것.",
      "칼립소의 섬 오기기아는 서사하라의 새하얀 사구에서 찍었는데, 정작 신화 전통은 몰타의 고초 섬을 오기기아로 지목해왔다. 그 섬에는 지금도 '칼립소의 동굴'이라는 이름의 명소가 실제로 있다고 한다.",
      "촬영지 얘기만 해도 이 정도인데, 내용을 다시 떠올려보면 이 영화가 원작을 얼마나 과감하게 다뤘는지도 눈에 들어온다.",
      "트로이 전쟁이 끝난 지 20년, 페넬로페는 여전히 남편의 생사를 모른 채 시아버지의 수의를 짜는 척 매일 밤 몰래 풀며 구혼자들의 청혼을 미루고 있다. 아들 텔레마코스는 결국 아버지 소식을 찾아 홀로 스파르타로 떠난다.",
      "한편 기억을 잃은 채 깨어난 오디세우스는 여신 칼립소 곁에서 서서히 자신에게 돌아가야 할 집이 있음을 기억해낸다. 이후 키코네스족 마을 약탈, 폴리페무스 실명과 포세이돈의 저주, 라이스트뤼고네스에게 함대 절반을 잃는 일, 키르케의 섬에서 부하들이 돼지가 되는 일까지 — 시련이 끝없이 이어진다.",
      "저승에서 예언자 테이레시아스로부터 '오직 자신만이 살아 돌아갈 운명'이라는 예언을 듣는 장면도 나온다. 오디세우스는 신들에게 맞서 그 운명을 바꾸겠다고 다짐하는데, 세이렌의 노래와 스킬라·카리브디스, 태양신 헬리오스의 신성한 소를 둘러싼 마지막 금기까지 그를 시험한다.",
      "텔레마코스는 스파르타의 메넬라오스·헬레네로부터 트로이 목마 작전의 전말을 직접 전해 듣고, 아가멤논이 귀향 후 아내 클리타임네스트라에게 살해당한 비극도 알게 된다. 아버지 없이도 이 여정을 통해 성장하는 인물이라는 게 느껴진다.",
      "결국 뗏목으로 표류하던 오디세우스는 여신 아테나의 안내로 이타카 해안에 닿고, 거지로 변장해 옛 심복 에우마이오스와 재회한다. 안티노오스가 보낸 자객들 위협 속에 돌아온 텔레마코스와 힘을 합쳐, 열두 자루 도끼 사이로 화살을 쏘는 활 시합으로 정체를 증명하고 궁을 장악한 구혼자들을 전부 처단한다.",
      "여기서 이 영화가 진짜 과감해진다. 놀란 감독은 원작의 '왕권 회복'이라는 결말 대신, 오디세우스가 아예 텔레마코스에게 왕위를 넘기고 페넬로페와 함께 통치를 내려놓은 채 서쪽 바다로 항해를 떠나는 결말을 택했다.",
      "불타는 트로이 목마 이미지가 마지막 장면에 겹쳐지는데, 이걸 끝없는 전쟁에 물든 기성 세대가 다음 세대에게 자리를 내주는 선언이자, 트로이에서 쌓인 죄책을 청산하려는 몸짓으로 해석하는 사람들이 많더라.",
      "맷 데이먼·톰 홀랜드·앤 해서웨이·로버트 패틴슨·젠데이아·샤를리즈 테론까지, 초호화 캐스팅에 IMAX 필름으로 6개국을 오가며 찍었다는 스케일도 스케일이지만, 결국 남는 건 '집에 돌아온 왕이 왕좌 대신 선택한 것'이라는 이 결말이었다.",
      "그러니까 이 영화는 촬영지 따로, 신화 속 진짜 장소 따로, 결말까지 원작과 다르게 두 겹 세 겹의 지도를 갖고 있는 셈이다. 어느 쪽을 따라가도 여행이 될 것 같다."
    ],
    hookReveals:[
      { label:"이타카 왕궁 → 실제 촬영은 시칠리아 파비냐나 섬", label_en:"Ithaca's palace → actually filmed on Sicily's Favignana", locId:"favignana_castle" },
      { label:"진짜 이타카 → 그리스 이오니아해의 섬(영화엔 안 나옴)", label_en:"The real Ithaca → an island in the Greek Ionian Sea (not seen in the film)", locId:"real_ithaca" },
      { label:"트로이 성 → 모로코 아이트 벤하두, 진짜 트로이는 튀르키예 히사를리크", label_en:"'Troy' → Morocco's Aït Ben Haddou; the real Troy is Hisarlik, Turkey", locId:"ait_ben_haddou" },
      { label:"폴리페무스의 동굴 → CG 없이, 기원전 6000년부터 사람이 산 진짜 동굴", label_en:"Polyphemus's cave → a real cave inhabited since 6000 BC, filmed without CG", locId:"nestors_cave" }
    ],
    hookBadge_en:"Directed by Christopher Nolan · Filmed across 6 countries · Where the myth actually happened",
    hookTagline_en:"The Ithaca on screen isn't the real Ithaca",
    discoveryHook_en:[
      "Watching The Odyssey, there's something I learned afterward: the 'Ithaca' on screen isn't the real Ithaca.",
      "The exterior of Odysseus's palace was filmed at a 15th-century fortress on Favignana, an island off Sicily — so remote that equipment had to be hauled up by cable car while the cast hiked the mountain daily.",
      "The real Ithaca sits elsewhere entirely, out in the Greek Ionian Sea — an island identified as Odysseus's homeland since antiquity. It never actually appears in the film.",
      "Troy is the same story. The film's walled city was shot at Aït Ben Haddou, a UNESCO World Heritage site in Morocco. The real archaeological ruins of Troy, Hisarlik, sit far away in Çanakkale, Turkey.",
      "The biggest surprise was Polyphemus's cave — it isn't a set at all. It's a real cave in Greece inhabited since 6000 BC, shot without CG, in its actual cold, echoing interior.",
      "Calypso's island Ogygia was filmed on a white sand dune in Western Sahara, but mythological tradition has long pointed to Gozo, in Malta, instead — which even has a landmark literally called 'Calypso's Cave' to this day.",
      "That's already a lot just for filming locations, but going back over the plot, you also see how boldly this film handles the source material.",
      "Twenty years after the Trojan War ends, Penelope still doesn't know if her husband is alive, stalling her suitors by weaving her father-in-law's burial shroud by day and secretly unraveling it by night. Their son Telemachus eventually sails alone for Sparta, searching for news of his father.",
      "Meanwhile, a memory-wiped Odysseus, kept by the goddess Calypso, slowly starts to remember he has a home to return to. What follows is an unbroken chain of disasters: raiding the Cicones' town, blinding Polyphemus and earning Poseidon's curse, losing half his fleet to the Laestrygonians, watching his men turned to pigs on Circe's island.",
      "There's a scene in the underworld where the prophet Tiresias tells him he alone is fated to survive. Odysseus vows to defy the gods and change that fate — but the Sirens' song, the strait of Scylla and Charybdis, and a final taboo involving the sun god Helios's sacred cattle all still test him.",
      "Telemachus hears the full story of the Trojan Horse directly from Menelaus and Helen in Sparta, along with the tragedy of Agamemnon murdered by his own wife Clytemnestra after returning home — you can feel him growing up through this journey, even without his father beside him.",
      "Odysseus, adrift on a raft, is finally guided by Athena to Ithaca's shore and reunites, disguised as a beggar, with his old retainer Eumaeus. With Antinous's assassins closing in on the returning Telemachus, father and son join forces — Odysseus proves his identity by shooting an arrow through twelve axes, and together they cut down every suitor occupying the palace.",
      "This is where the film really goes bold. Instead of the traditional 'restoration of the king' ending, Nolan has Odysseus hand the throne to Telemachus outright, give up rule alongside Penelope, and sail west.",
      "The image of the burning Trojan Horse overlays that final scene, and a lot of people read it as a declaration — a generation steeped in endless war stepping aside for the next one, and a gesture of atonement for everything left behind at Troy.",
      "The scale is already massive — Matt Damon, Tom Holland, Anne Hathaway, Robert Pattinson, Zendaya, Charlize Theron, shot on IMAX film across six countries — but what actually stays with you is this ending: what a king chooses instead of his throne, once he's finally home.",
      "So this film carries two or three overlapping maps at once — where it was filmed, where the myth says these places really are, and an ending that departs from the source entirely. Any one of those is worth following."
    ],
    discoveryHook_ja:[
      "『オデッセイ』を見て気づいたことがある。映画の中の「イタケ」は本物のイタケではなかった。",
      "オデュッセウスの王宮の外観は、シチリア島沖のファヴィニャーナ島にある15世紀の要塞で撮影されたのだという。アクセス路がなく、撮影機材はロープウェイで運び、俳優たちは毎日山を歩いて登らなければならなかったという話まであった。",
      "では本物のイタケはどこかというと、ギリシャのイオニア海に別に存在する。古代から現在まで「オデュッセウスの故郷」とされてきた実在の島だが、映画には登場しない。",
      "トロイアも同じだった。映画の中のトロイア城は、モロッコのアイット・ベン・ハドゥ、ユネスコ世界遺産の村だ。本物のトロイア遺跡ヒサルルックは、トルコのチャナッカレに別にある。",
      "一番驚いたのはポリュフェモスの洞窟だ。これはセットではなく、本物の洞窟をそのまま使ったのだという。紀元前6000年から人が住んでいたというギリシャの実在の洞窟の中で、CGなしに、冷たく反響するその空間をそのまま撮影したらしい。",
      "カリュプソの島オギュギアは西サハラの真っ白な砂丘で撮影されたが、神話の伝承ではマルタのゴゾ島がオギュギアだとされてきた。その島には今も「カリュプソの洞窟」という名の観光名所が実際にあるという。",
      "ロケ地の話だけでもこれだけあるのだが、物語そのものを振り返ると、この映画が原作をどれだけ大胆に扱っているかもよくわかる。",
      "トロイア戦争が終わって20年、ペネロペイアはいまだに夫の生死を知らないまま、義父の死装束を織るふりをして毎晩こっそりほどき、求婚者たちの申し出を先延ばしにしている。息子テレマコスは結局、父の消息を求めてひとりスパルタへと旅立つ。",
      "一方、記憶を失って目覚めたオデュッセウスは、女神カリュプソのもとで少しずつ、自分には帰るべき家があることを思い出していく。キコネス族の村への略奪、ポリュフェモスを失明させてポセイドンの呪いを受けたこと、ライストリュゴネス族に艦隊の半分を失ったこと、キルケの島で部下たちが豚に変えられたこと——試練は絶え間なく続く。",
      "冥界で予言者テイレシアスから「自分だけが生きて帰る運命にある」と告げられる場面もある。オデュッセウスは神々に逆らってその運命を変えると誓うが、セイレーンの歌、スキュラとカリュブディス、太陽神ヘリオスの聖なる牛をめぐる最後の禁忌まで、なおも彼を試し続ける。",
      "テレマコスはスパルタでメネラオスとヘレネから、トロイの木馬作戦の一部始終と父の活躍を直接聞かされ、帰国後に妻クリュタイムネストラに殺されたアガメムノンの悲劇も知ることになる。父がいなくても、この旅を通して成長していく人物だと感じられる。",
      "いかだで漂流していたオデュッセウスは、女神アテナの導きでついにイタケの岸にたどり着き、物乞いに変装して旧友エウマイオスと再会する。アンティノオスが放った刺客に狙われながら帰還したテレマコスと力を合わせ、十二本の斧の穴に矢を通す弓の試合で自分の正体を証明し、宮殿を占拠していた求婚者たちを全員討ち取る。",
      "ここでこの映画が本当に大胆になる。ノーラン監督は原作の「王権の回復」という結末の代わりに、オデュッセウスがテレマコスに王位をそのまま譲り、ペネロペイアとともに統治を手放して西の海へと船出する結末を選んだ。",
      "燃えるトロイの木馬のイメージが最後のシーンに重なるのだが、これを、終わりのない戦争に染まった世代が次の世代に場所を譲る宣言であり、トロイアで積み重ねた罪を清算しようとする身振りだと解釈する人が多いようだ。",
      "マット・デイモン、トム・ホランド、アン・ハサウェイ、ロバート・パティンソン、ゼンデイヤ、シャーリーズ・セロンという超豪華キャストに、IMAXフィルムで6カ国を回って撮影したスケールも凄いのだが、結局心に残るのはこの結末——家に帰り着いた王が、王座の代わりに何を選んだかという話だった。",
      "つまりこの映画は、撮影地、神話の中の本当の場所、そして原作とは違う結末と、二重にも三重にも重なった地図を持っているわけだ。どちらをたどっても、ひとつの旅になりそうだ。"
    ],
    title_ja:"オデッセイ", summary_ja:"トロイア戦争を勝利に導いたイタケの王オデュッセウスが、妻ペネロペイアと息子テレマコスの待つ故郷へ帰るため、10年にわたって神々の試練と怪物たちに立ち向かう物語。クリストファー・ノーラン監督が史上初めてIMAXフィルムでオール撮影に挑んだ神話叙事詩であり、2026年最大級のヒット作のひとつ。", author_ja:"クリストファー・ノーラン監督・脚本(原作:ホメロス『オデュッセイア』)", era_ja:"古代ギリシャ神話の時代(トロイア戦争後、2026年製作)",
    contentSummary:{ sections:[
      { heading:"트로이의 함락과 귀향길의 시작", bullets:[
        "오디세우스의 목마 계략으로 트로이가 함락되지만, 귀향길에서 신들의 시험이 시작된다",
        "이스마로스 약탈, 외눈박이 거인 폴리페무스와의 사투 끝에 포세이돈의 저주를 사게 된다"
      ]},
      { heading:"괴물과 마녀들의 섬", bullets:[
        "라이스트뤼고네스의 습격으로 함대 대부분을 잃고, 키르케의 섬에서 부하들이 돼지로 변한다",
        "저승에서 예언자 테이레시아스를 만나 자신만이 살아 돌아갈 운명이라는 예언을 듣는다"
      ]},
      { heading:"아들 텔레마코스의 여정", bullets:[
        "홀로 아버지를 찾아 나선 텔레마코스가 스파르타에서 메넬라오스와 헬레네를 만난다",
        "트로이 목마 작전의 전말과 아가멤논의 비극을 전해 들으며 성장한다"
      ]},
      { heading:"이타카의 귀환과 결말", bullets:[
        "거지로 변장한 오디세우스가 에우마이오스와 재회하고 아들과 힘을 합친다",
        "구혼자들의 최후, 그리고 왕위와 항해를 둘러싼 결말은 작품에서 직접 확인하세요"
      ]}
    ], endingNote:"돌아온 왕이 다시 왕좌에 앉을지, 아니면 무엇을 내려놓을지는 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Isole_egadi_sicily_boboviel_favignana_marettimo_levanzo_(35).jpg", credit:'파비냐나 섬 전경, 이탈리아 시칠리아 에가디 제도(영화 《오디세이》에서 이타카 왕궁 외경 촬영지 카스텔로 디 산타 카테리나가 있는 섬) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Isole_egadi_sicily_boboviel_favignana_marettimo_levanzo_(35).jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%98%A4%EB%94%94%EC%84%B8%EC%9D%B4_(%EC%98%81%ED%99%94)" },
  { id:"dokkaebi", title:"쓸쓸하고 찬란하神 — 도깨비 (Guardian: The Lonely and Great God)", author:"김은숙 극본 · 이응복 연출", type:"drama", country:"korea", medium:"tv_drama", lang:"ko", genres:["fantasy","romance","drama"],
    // ※ 2016-12-02~2017-01-21 tvN 방영(16부작, 금·토). 강릉 주문진 해변·방사제(은탁·김신 최초 소환 장면)를
    //   중심으로 한 강원도 로케이션 + 캐나다 퀘벡시티 로케이션 + 서울·인천·경기 도심 로케이션까지, 실제
    //   촬영지 71곳을 traveltodrama.com의 '도깨비 촬영지 81곳 완전 정복' 가이드를 바탕으로 수록했다
    //   (MUST VISIT 37 전체 + 서사적 의미가 있는 지역 리스트 위주로 선정, 익명의 상점/폐업 매장 등은
    //   서사적 가치가 낮아 제외 — 정확성 원칙). 인물은 확인된 주요·주변 인물 15명을 수록했다.
    era:"고려시대(배경 설화) · 2016~2017년 방영(현대극)", title_en:"Guardian: The Lonely and Great God (Goblin)", author_en:"Written by Kim Eun-sook, directed by Lee Eung-bok", era_en:"Goryeo-era backstory · aired 2016–2017 (contemporary setting)",
    summary:"불멸의 저주를 풀기 위해 인간 신부가 필요한 도깨비 김신과, 자신이 그의 신부라 주장하는 소녀 지은탁의 시공간을 초월한 로맨스. 강릉 주문진과 캐나다 퀘벡시티를 배경으로 한 명장면으로 국내외에서 큰 사랑을 받은 tvN 대표작.",
    longSummary:"고려의 상장군 김신은 수많은 전쟁에서 단 한 번도 패하지 않아 백성의 존경과 어린 왕 왕여의 두려움을 동시에 산다. 간신 박중헌의 모함으로 역적으로 몰린 김신은 누이 김선의 희생에도 불구하고 죽임을 당하고, 신의 형벌로 가슴에 검이 영원히 꽂힌 채 죽지 못하는 불멸의 도깨비로 부활한다. 그를 죽음으로 몬 왕여 역시 죄책감에 스스로 목숨을 끊고, 600년의 형벌 끝에 기억을 잃은 저승사자로 환생한다.\n\n현대, 임신부 지연희가 뺑소니 사고로 죽어가며 뱃속 아이를 살려달라 빌자 김신이 응답해 모녀를 살려준다. 이렇게 태어난 지은탁은 저승의 호적에 기록되지 않은 '기타 누락자'로, 도깨비의 신부임을 증명하는 흔적과 귀신을 보는 능력을 갖고 태어난다. 9세에 어머니를 잃고 이모 가족에게 맡겨져 구박받으며 자란 은탁은 열아홉 살 생일, 강릉 주문진 방파제에서 홀로 촛불을 불며 소원을 빌다 자신도 모르게 도깨비 김신을 소환한다.\n\n은탁은 마법의 문을 통해 김신을 따라 캐나다 퀘벡까지 건너가 '아저씨한테 시집갈래요'라 당돌하게 고백하고, 김신의 가슴에 꽂힌 검의 모양을 정확히 묘사하며 자신이 진짜 신부임을 증명한다. 죽음을 바라던 도깨비는 점차 그녀와 함께하는 삶을 원하게 되지만, 신부가 검을 뽑는 순간 도깨비는 소멸한다는 숙명이 두 사람 앞을 가로막는다. 한편 저승사자는 삼계탕집을 운영하는 써니(김선의 환생)와 사랑에 빠지고, 자신이 김신을 죽음으로 몬 왕여였다는 충격적 진실과도 마주하게 된다.",
    pinColor:"#2563eb",
    summary_en:"A timeless romance between Kim Shin, an immortal Goblin who needs a human bride to end his curse, and Ji Eun-tak, the girl who claims to be that bride. Filmed at iconic locations from Gangneung's Jumunjin Beach to Québec City, it remains one of tvN's most beloved dramas at home and abroad.",
    longSummary_en:"General Kim Shin of Goryeo, undefeated in countless wars, earns both the people's reverence and young King Wang Yeo's fear. Framed as a traitor by the scheming Park Joong-heon, Kim Shin is killed despite his sister Kim Sun's sacrifice — and a god's punishment revives him as an immortal Goblin with a sword permanently through his chest. Wang Yeo, wracked with guilt over the betrayal, later takes his own life and, after 600 years of punishment, is reincarnated as an amnesiac Grim Reaper.\n\nIn the present day, a dying, pregnant Ji Yeon-hee begs for her unborn child's life during a hit-and-run, and Kim Shin answers, saving both mother and child. The resulting daughter, Ji Eun-tak, is born an unregistered soul with a mark proving she is the Goblin's bride and the ability to see ghosts. Orphaned at nine and raised abusively by her aunt's family, Eun-tak unknowingly summons Kim Shin on her 19th birthday while blowing out candles alone on a breakwater in Jumunjin, Gangneung.\n\nFollowing him through a magic door to Québec City, Eun-tak boldly declares she'll marry him, proving her identity by describing the exact shape of the sword in his chest. The once death-seeking Goblin slowly comes to want a life with her — but their fate is bound by a cruel rule: the moment his bride removes the sword, he will vanish. Meanwhile the Grim Reaper falls for Sunny, the reincarnation of Kim Sun who runs a samgyetang restaurant, and must confront the devastating truth that he was once King Wang Yeo himself.",
    communityNote:"《도깨비》는 김은숙 작가·이응복 감독의 2016~2017년 tvN 금토드라마로, tvN 개국 이래 최고 시청률을 기록했다. 강릉 주문진 해변·방사제에서의 최초 소환 장면과 캐나다 퀘벡시티의 '도깨비 빨간문'은 방영 이후 팬들의 성지순례 명소가 됐다. 공유·김고은·이동욱·유인나·육성재가 주연을 맡았다.",
    communityNote_en:"Guardian: The Lonely and Great God (Goblin) is Kim Eun-sook and Lee Eung-bok's 2016–2017 tvN Friday-Saturday drama, which became the network's highest-rated series at the time. The first-summoning scene at Jumunjin Beach in Gangneung and the 'Goblin's red door' in Québec City became major pilgrimage sites for fans after the show aired. It starred Gong Yoo, Kim Go-eun, Lee Dong-wook, Yoo In-na, and Yook Sung-jae.",
    hookBadge:"tvN 최고 시청률 · 공유 × 김고은 · 촬영지 & 숨은 이야기", hookTagline:"그 빨간 문, 진짜 있다",
    discoveryHook:[
      "《도깨비》 보고 나면 자꾸 그 빨간 문이 생각난다.",
      "손잡이도 없는 그 문, 열면 서울이랑 캐나다가 이어진다는 그 문. 설마 세트겠지 싶어서 찾아봤는데, 진짜 있었다. 퀘벡 쁘띠 샹플랭 거리에.",
      "이름까지 있다. '라 포르트 루즈'. 방영 후로는 아예 퀘벡 최고의 포토 스폿이 됐다더라.",
      "은탁이가 편지 넣던 우체통도 실제로 프론트낙 호텔 로비에 있고, 김신 소유 호텔로 나온 그 호텔도 실존하는 랜드마크다.",
      "근데 더 놀란 건, 둘이 처음 만난 주문진 방파제도, '도깨비 언덕'이라는 눈밭도 다 실제 강원도 촬영지라는 거. 마법의 문 하나만 빼면 이 로맨스, 의외로 다 진짜 땅 위에서 벌어진 얘기더라.",
      "드래곤피크 스키장은 실제 평창 용평리조트고, 은탁이 다니던 중앙고는 알고 보니 《선재 업고 튀어》, 《그해 우리는》에도 나온 곳이었다. 로케이션 성지 중의 성지.",
      "내용을 다시 떠올려보면, 이 드라마가 왜 그렇게 오래 회자되는지도 알 것 같다. 고려의 상장군 김신은 수많은 전쟁에서 단 한 번도 패하지 않아 백성의 존경과 어린 왕 왕여의 두려움을 동시에 샀다.",
      "간신 박중헌의 모함으로 역적으로 몰린 김신은 누이 김선의 희생에도 불구하고 결국 죽임을 당한다. 신의 형벌로 가슴에 검이 영원히 꽂힌 채 죽지 못하는 불멸의 도깨비로 부활한다는 게 이 드라마의 출발점이다.",
      "그를 죽음으로 몬 왕여도 죄책감에 스스로 목숨을 끊고, 600년의 형벌 끝에 기억을 잃은 저승사자로 환생한다. 그러니까 도깨비랑 저승사자, 이 둘의 관계부터가 이미 비극인 셈이다.",
      "현대로 넘어와서, 임신부 지연희가 뺑소니 사고로 죽어가며 뱃속 아이를 살려달라 빌자 김신이 응답해 모녀를 살려준다. 이렇게 태어난 지은탁은 저승의 호적에도 없는 '기타 누락자'로, 도깨비 신부의 흔적과 귀신을 보는 능력을 갖고 태어난다.",
      "9세에 어머니를 잃고 이모 가족에게 맡겨져 구박받으며 자란 은탁은, 열아홉 살 생일에 주문진 방파제에서 홀로 촛불을 불며 소원을 빌다 자기도 모르게 도깨비 김신을 소환한다.",
      "은탁은 마법의 문을 통해 김신을 따라 캐나다 퀘벡까지 건너가 '아저씨한테 시집갈래요'라고 당돌하게 고백하고, 김신의 가슴에 꽂힌 검의 모양을 정확히 묘사하면서 자기가 진짜 신부라는 걸 증명한다.",
      "죽음을 바라던 도깨비가 점점 그녀와 함께하는 삶을 원하게 된다는 게 이 드라마의 진짜 로맨스인데, 문제는 신부가 그 검을 뽑는 순간 도깨비가 소멸한다는 숙명이다. 사랑할수록 끝이 가까워지는 구조라는 게 알고 보면 꽤 잔인하다.",
      "한편 저승사자는 삼계탕집을 운영하는 써니라는 여자한테 반하는데, 알고 보니 써니는 김신의 누이 김선이 환생한 사람이다. 저승사자 본인이 김신을 죽음으로 몬 왕여였다는 충격적인 진실까지 마주하게 된다.",
      "결국 신과 인간, 삶과 죽음 사이의 이야기인데 정작 배경은 지도만 켜면 다 찾아갈 수 있는 곳들이라는 게 이 드라마의 진짜 반전이다. 손잡이 없는 문 앞에 서보고 싶어지는 이유다.",
      "김은숙 작가·이응복 감독의 2016~2017년 tvN 금토드라마인데, tvN 개국 이래 최고 시청률을 기록했다고 한다. 공유·김고은·이동욱·유인나·육성재 조합이 왜 아직도 회자되는지, 다시 보니 알 것 같았다."
    ],
    hookReveals:[
      { label:"빨간 문 → 퀘벡 쁘띠 샹플랭 거리에 실존", label_en:"The red door → really exists in Québec", locId:"quebec_red_door" },
      { label:"김신의 호텔 → 실제 프론트낙 호텔", label_en:"Kim Shin's hotel → the real Château Frontenac", locId:"quebec_frontenac" },
      { label:"드래곤피크 스키장 → 실제 평창 용평리조트", label_en:"'Dragon Peak' → the real Yongpyong Resort", locId:"pyeongchang_yongpyong" },
      { label:"은탁의 고등학교 → 선재 업고 튀어·그해 우리는과 같은 촬영지", label_en:"Eun-tak's high school → also used in Lovely Runner, Our Beloved Summer", locId:"jungang_high" }
    ],
    hookBadge_en:"tvN's highest-rated drama · Gong Yoo × Kim Go-eun · Filming locations & behind-the-scenes",
    hookTagline_en:"That red door? It's real.",
    discoveryHook_en:[
      "After Guardian: The Lonely and Great God, that red door keeps coming back to me.",
      "No handle, and somehow it connects Seoul to Canada whenever it opens. I figured it had to be a set — turns out it's real, in Québec, on Petit Champlain street.",
      "It even has a name — 'La Porte Rouge.' Since the show aired, it's apparently become Québec's top photo spot.",
      "The mailbox where Eun-tak drops her letters is really in the lobby of the Château Frontenac, and the hotel that plays Kim Shin's own hotel is a real landmark too.",
      "What surprised me even more — the breakwater in Jumunjin where the two of them first meet, and the snowy hill called 'Goblin Hill,' are both real filming locations in Gangwon Province. Take away the one magic door, and this romance mostly happens on actual ground.",
      "'Dragon Peak' ski resort is the real Yongpyong Resort in Pyeongchang, and Eun-tak's school, Jungang High, turns out to be the same campus used in Lovely Runner and Our Beloved Summer — a pilgrimage site among pilgrimage sites.",
      "Looking back at the story itself, I get why it's still talked about this much. General Kim Shin of Goryeo, undefeated in countless wars, earns both the people's reverence and young King Wang Yeo's fear.",
      "Framed as a traitor by the scheming Park Joong-heon, Kim Shin is killed despite his sister Kim Sun's sacrifice — and that's where the show actually starts: a god's punishment revives him as an immortal Goblin with a sword permanently through his chest, unable to die.",
      "Wang Yeo, the one who drove him to that death, is wracked with guilt and eventually takes his own life. After 600 years of punishment, he's reincarnated as an amnesiac Grim Reaper — so the relationship between the Goblin and the Grim Reaper is already a tragedy before the story even begins.",
      "In the present day, a dying, pregnant Ji Yeon-hee begs for her unborn child's life during a hit-and-run, and Kim Shin answers, saving both mother and child. The resulting daughter, Ji Eun-tak, is born an unregistered soul, with a mark proving she's the Goblin's bride and the ability to see ghosts.",
      "Orphaned at nine and raised abusively by her aunt's family, Eun-tak unknowingly summons Kim Shin on her 19th birthday, blowing out candles alone on a breakwater in Jumunjin.",
      "She follows him through the magic door all the way to Québec City, boldly declares she'll marry him, and proves her identity by describing the exact shape of the sword in his chest.",
      "The real romance here is watching a once death-seeking Goblin slowly come to want a life with her — but it's built on a cruel rule: the moment his bride removes that sword, he vanishes. The closer they fall in love, the closer the ending gets. It's crueler than it first looks.",
      "Meanwhile the Grim Reaper falls for Sunny, a woman who runs a samgyetang restaurant — who turns out to be the reincarnation of Kim Shin's sister, Kim Sun. And the Grim Reaper has to face the devastating truth that he himself was once King Wang Yeo.",
      "It's a story about gods and mortals, life and death — but the real twist is that its backdrop is somewhere you can pull up on a map right now. That's exactly what makes you want to go stand in front of a handle-less door.",
      "It's Kim Eun-sook and Lee Eung-bok's 2016–2017 tvN Friday-Saturday drama, and it apparently became the network's highest-rated series ever. Revisiting it, I get why the Gong Yoo, Kim Go-eun, Lee Dong-wook, Yoo In-na, Yook Sung-jae lineup is still being talked about."
    ],
    discoveryHook_ja:[
      "『トッケビ〜君がくれた愛しい日々〜』を見た後、あの赤い扉のことがずっと頭から離れなくなる。",
      "取っ手すらないあの扉、開けるとソウルとカナダがつながるというあの扉。さすがにセットだろうと調べてみたら、本当に実在していた。ケベックのプチ・シャンプラン通りに。",
      "名前までついている。「ラ・ポルト・ルージュ」。放送後はケベック随一のフォトスポットになったらしい。",
      "ウンタクが手紙を入れていたポストも実際にシャトー・フロンテナックのロビーにあるし、キム・シン所有のホテルとして出てきたあのホテルも実在するランドマークだ。",
      "でももっと驚いたのは、二人が初めて出会う注文津(チュムンジン)の防波堤も、「トッケビの丘」と呼ばれる雪原も、全部実際の江原道のロケ地だということ。魔法の扉ひとつを除けば、このロマンス、意外とすべて本物の土地の上で起きた話だった。",
      "「ドラゴンピークスキー場」は実際の平昌ヨンピョンリゾートで、ウンタクが通っていた中央高校は、実は韓国ドラマ『선재 업고 튀어』や『その年、私たちは』にも出てきた場所だった。聖地の中の聖地といっていい。",
      "物語自体を振り返ると、このドラマがなぜこれほど長く語り継がれているのかがわかる気がする。高麗の上将軍キム・シンは数々の戦で一度も敗れたことがなく、民の尊敬と幼い王・ワン・ヨの恐れを同時に集めていた。",
      "奸臣パク・チュンホンの謀略で反逆者に仕立て上げられたキム・シンは、妹キム・ソンの犠牲もむなしく殺されてしまう。神の罰として胸に剣が永遠に刺さったまま死ねない不滅のトッケビとして蘇る——これがこの物語の出発点だ。",
      "彼を死に追いやったワン・ヨもまた罪の意識に苛まれ、自ら命を絶つ。600年の罰の果てに、記憶を失った死神として生まれ変わる。つまりトッケビと死神、この二人の関係自体が、物語が始まる前からすでに悲劇なのだ。",
      "現代に舞台が移ると、ひき逃げに遭って死にかけている妊婦チ・ヨンヒが、お腹の子だけでも助けてほしいと祈り、それにキム・シンが応えて母子を救う。こうして生まれたチ・ウンタクは、あの世の戸籍にも記録されない「漏れた者」として、トッケビの花嫁の証と幽霊を見る力を持って生まれてくる。",
      "9歳で母を亡くし、叔母一家に引き取られて冷遇されながら育ったウンタクは、19歳の誕生日、注文津の防波堤でひとりろうそくを吹き消しながら願い事をしているうちに、無意識のうちにトッケビ、キム・シンを召喚してしまう。",
      "ウンタクは魔法の扉を通ってキム・シンを追いカナダ・ケベックまで渡り、「おじさんのお嫁さんになる」と臆面もなく告白し、キム・シンの胸に刺さった剣の形を正確に言い当てて、自分が本物の花嫁であることを証明する。",
      "かつて死を望んでいたトッケビが、少しずつ彼女との人生を望むようになっていく——それがこのドラマの本当のロマンスなのだが、問題は、花嫁がその剣を抜いた瞬間にトッケビが消滅してしまうという宿命だ。愛が深まるほど終わりが近づく構造だと考えると、なかなか残酷な話だとわかる。",
      "一方、死神はサムゲタン店を営むサニーという女性に惹かれていくのだが、実は彼女はキム・シンの妹キム・ソンの生まれ変わりだった。そして死神自身も、キム・シンを死に追いやったワン・ヨその人だったという衝撃の真実に向き合うことになる。",
      "神と人間、生と死の間の物語なのに、その舞台は地図を開けばすべて訪ねていける場所だという、そこがこのドラマの本当の「どんでん返し」だ。取っ手のない扉の前に立ってみたくなる理由はここにある。",
      "キム・ウンスク作家とイ・ウンボク監督による2016~2017年のtvN金土ドラマで、tvN開局以来最高視聴率を記録したという。コン・ユ、キム・ゴウン、イ・ドンウク、ユ・インナ、ユク・ソンジェという組み合わせが今も語り継がれている理由が、見直してみるとよくわかった気がした。"
    ],
    title_ja:"トッケビ〜君がくれた愛しい日々〜", summary_ja:"不滅の呪いを解くために人間の花嫁を必要とするトッケビ、キム・シンと、自分こそが彼の花嫁だと主張する少女、チ・ウンタクの時空を超えたロマンス。江陵・注文津とカナダ・ケベックシティを舞台にした名場面で韓国内外から大きな愛を受けたtvNの代表作。", author_ja:"キム・ウンスク脚本・イ・ウンボク演出", era_ja:"高麗時代(背景となる説話)・2016~2017年放送(現代劇)",
    contentSummary:{ sections:[
      { heading:"고려의 비극 — 도깨비의 탄생", bullets:[
        "무패의 상장군 김신이 간신 박중헌의 모함으로 역적으로 몰려 죽임을 당한다",
        "신의 형벌로 가슴에 검이 꽂힌 채 죽지 못하는 불멸의 도깨비로 부활한다"
      ]},
      { heading:"신부의 운명을 타고난 소녀", bullets:[
        "뺑소니 사고에서 김신에게 구원받은 지연희의 딸 은탁이 도깨비 신부의 흔적을 갖고 태어난다",
        "구박받으며 자란 은탁은 열아홉 생일, 주문진에서 도깨비를 최초로 소환한다"
      ]},
      { heading:"삶과 죽음 사이, 두 사람의 선택", bullets:[
        "은탁은 퀘벡까지 김신을 따라가 자신이 신부임을 증명하고 사랑을 고백한다",
        "신부가 검을 뽑으면 도깨비가 소멸한다는 숙명 앞에서 두 사람이 내리는 결말은 작품에서 직접 확인하세요"
      ]}
    ], endingNote:"불멸의 존재가 결국 무엇을 선택하는지는 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Chateau Frontenac, Quebec City.jpg", credit:'페어몬트 르 샤토 프롱트낙 호텔, 캐나다 퀘벡시티(《도깨비》에서 김신 소유의 호텔로 등장, 은탁이 처음 캐나다에 감탄한 장소) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Chateau_Frontenac,_Quebec_City.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%8F%84%EA%B9%A8%EB%B9%84_(%EB%93%9C%EB%9D%BC%EB%A7%88)" },
  { id:"gwandong", title:"관동별곡 (關東別曲)", author:"정철(鄭澈)", type:"classical_gasa", country:"korea", medium:"novel", lang:"ko", genres:["historical","drama","adventure"],
    // ※ 1580년(선조 13) 정철이 강원도관찰사로 부임해 내금강·외금강·해금강과 관동팔경을 유람하며 지은
    //   가사(歌辭) 문학. 조선시대 실존 인물의 실제 여정을 노래한 작품이라 다른 창작 콘텐츠와 달리
    //   "허구 설정"이 아니라 "역사적으로 기록된 실제 유람 경로"를 다룬다. 내금강 6곳(만폭동·금강대·
    //   진헐대·개심대·화룡연·십이폭포)과 관동팔경 중 총석정·삼일포는 현재 북한 지역에 있어 방문이
    //   제한되지만, 실제 지리 좌표는 표기하고 tag에 "(현재 방문 제한)"을 명시했다. 청간정·낙산사·
    //   경포대·죽서루·망양정·월송정은 현재도 방문 가능한 실제 관동팔경이다. 인물은 작자 정철과
    //   그를 강원도관찰사로 제수한 선조, 2인만 실존 인물로 수록했다 — 이 작품은 다인물 서사가 아닌
    //   1인 여정 가사이므로 임의로 등장인물을 늘리지 않는다(정확성 원칙).
    era:"조선 선조 13년(1580년)", title_en:"Gwandong Byeolgok (Song of the Gwandong Region)", author_en:"Jeong Cheol", era_en:"Joseon Dynasty, 13th year of King Seonjo's reign (1580)",
    summary:"1580년, 45세의 문신 정철이 강원도관찰사로 부임해 내금강·외금강·해금강과 관동팔경을 유람하며 그 절경과 감흥을 노래한 조선 최고의 기행 가사. 경포대의 '세 개의 달', 의상대의 해돋이 등 지금도 회자되는 명구절을 남겼다.",
    longSummary:"1580년(선조 13) 정월, 45세의 정철은 강원도관찰사에 제수되어 강원도 감영이 있는 원주로 부임한다. 관동별곡은 임금의 부름에 감격하며 부임길에 오르는 장면으로 시작해, 이후 그해 3월부터 이어진 실제 관동 지역 순력을 4단 구성으로 노래한다.\n\n2단에서는 내금강의 절경 — 만폭동·금강대·진헐대·개심대·화룡연·십이폭포 등을 오르내리며 그 웅장함에 감탄한다. 3단에서는 외금강과 해금강, 그리고 동해안을 따라가며 관동팔경을 두루 유람한다. 바닷속에서 솟은 돌기둥들에 둘러싸인 총석정에서의 해돋이, 신라 화랑의 전설이 깃든 삼일포, 낙산사 의상대에서 바라본 동해의 일출, 그리고 하늘과 호수와 바다에 각각 뜬 세 개의 달을 노래한 경포대의 유명한 구절, 오십천 절벽 위 죽서루, 망양정과 월송정에서의 여정이 이어진다.\n\n마지막 4단에서는 현실의 유람을 마친 정철이 꿈속에서 신선과 더불어 노니는 장면에 빗대어 자신의 풍류와 정치적 소회를 함축적으로 담아낸다. 이 작품은 조선시대 가사문학의 백미로 꼽히며, 김만중은 서포만필에서 이를 '동방의 이소'라 극찬했다. 지금도 경포대·낙산사·죽서루·청간정·망양정·월송정 등 관동팔경의 상당수는 실제로 방문할 수 있는 명소로 남아 있다.",
    pinColor:"#0f4c3a",
    summary_en:"In 1580, the 45-year-old scholar-official Jeong Cheol was appointed governor of Gangwon Province and toured Inner and Outer Kumgang, Haegeumgang, and the Eight Views of Gwandong, composing this celebrated travel gasa about their scenery and his feelings along the way — including the famous 'three moons' passage at Gyeongpodae and the sunrise at Uisangdae.",
    longSummary_en:"In the first month of 1580, the 45-year-old Jeong Cheol was appointed governor of Gangwon Province and traveled to Wonju, the seat of the provincial government. Gwandong Byeolgok opens with him setting out on this journey, moved by the king's summons, and unfolds in four sections describing his actual tour of the Gwandong region beginning that March.\n\nThe second section describes the splendor of Inner Kumgang — Manpokdong, Geumgangdae, Jinheoldae, Gaesimdae, Hwaryongyeon, and the Twelve-Bend Waterfall — as he climbs among its peaks in awe. The third section follows him through Outer Kumgang, Haegeumgang, and along the East Coast, touring the Eight Views of Gwandong: the sunrise at Chongseokjeong, ringed by hexagonal stone pillars rising from the sea; Samilpo, tied to a Silla-era legend; the sunrise over the East Sea seen from Uisangdae at Naksansa Temple; the famous passage at Gyeongpodae describing three moons — one in the sky, one on the lake, one on the sea; Jukseoru perched on a cliff over the Osip Stream; and finally Mangyangjeong and Wolsongjeong.\n\nIn the final section, having completed his real-world journey, Jeong Cheol likens himself to a wandering immortal in a dream, weaving in reflections on his own artistic sensibility and political circumstances. Considered a masterpiece of Joseon-era gasa literature, it was praised by Kim Man-jung in Seopo Manpil as 'the Li Sao of the East.' Many of its Eight Views — Gyeongpodae, Naksansa, Jukseoru, Cheongganjeong, Mangyangjeong, and Wolsongjeong — remain real, visitable landmarks today.",
    communityNote:"《관동별곡》은 1580년(선조 13) 정철이 강원도관찰사로 부임해 지은 가사로, 《송강가사》와 《협률대성》에 수록돼 전한다. 4음 4보격, 3·4조를 기본 율격으로 하며, 후대 김만중이 '동방의 이소'라 극찬한 조선 가사문학의 대표작이다. 관동팔경 중 총석정·삼일포는 현재 북한 지역에 있어 실제 방문이 어렵지만, 청간정·낙산사·경포대·죽서루·망양정·월송정은 지금도 강원·경북 동해안의 실제 명소로 남아 있다.",
    communityNote_en:"Gwandong Byeolgok is a gasa composed in 1580 by Jeong Cheol during his tenure as governor of Gangwon Province, preserved in the Songgang Gasa and Hyeomnyul Daeseong collections. Built on a four-beat rhythm with predominantly 3-4 syllable meter, it was later praised by Kim Man-jung as 'the Li Sao of the East' and remains a landmark of Joseon-era gasa literature. Two of its Eight Views, Chongseokjeong and Samilpo, now lie in North Korea and are inaccessible, but Cheongganjeong, Naksansa, Gyeongpodae, Jukseoru, Mangyangjeong, and Wolsongjeong remain real, visitable landmarks along the Gangwon and Gyeongbuk east coast today.",
    hookBadge:"정철 · 1580년 강원도관찰사의 실제 유람기", hookTagline:"이 시, 사실 진짜 여행 코스였다",
    discoveryHook:[
      "관동별곡은 학교 다닐 때 그냥 외우기만 했던 시조인 줄 알았다. 3·4조니 뭐니 운율 공부하려고.",
      "근데 나중에 다시 보니 이거 그냥 시가 아니라 실제 답사 기록이었다.",
      "1580년, 45세의 정철이 강원도관찰사로 부임하면서 실제로 걸었던 길을 그대로 노래한 거다.",
      "시작부터 재밌다. 정철은 임금의 부름을 받고 감격해서 원주 강원감영으로 부임하는 걸로 시를 연다 — 그러니까 이 시, 처음부터 끝까지 '내가 실제로 겪은 여행'이라는 틀을 벗어나지 않는다.",
      "2단으로 넘어가면 내금강이 나온다. 만폭동, 금강대, 진헐대, 개심대를 오르내리며 감탄하는데, 이 좌표들이 다 실존한다는 게 신기했다.",
      "화룡연이랑 십이폭포도 마찬가지. 그냥 '폭포가 멋있다' 정도가 아니라 구체적인 장소 이름을 하나하나 짚어가며 노래한다.",
      "3단부터는 외금강, 해금강을 지나 동해안을 따라 관동팔경을 도는데, 여기서부터 좀 마음이 복잡해진다.",
      "관동팔경 여덟 곳 중 두 곳, 총석정이랑 삼일포는 지금 지도로 찾아가도 못 간다. 북한 땅이라서.",
      "정철이 바닷속에서 솟은 돌기둥들에 둘러싸여 해돋이를 보며 감탄했던 그 총석정이 지금은 국경 너머에 있다는 걸 알고 나니, 그 구절이 완전히 다르게 읽혔다.",
      "삼일포도 마찬가지다. 신라 화랑들의 전설이 깃든 곳이라는데, 지금은 가 볼 수가 없다.",
      "대신 나머지 여섯 곳, 경포대·낙산사·죽서루·청간정·망양정·월송정은 지금도 그대로 갈 수 있다.",
      "이 중에서도 제일 유명한 구절은 경포대 대목이다. 하늘에 뜬 달, 호수에 비친 달, 잔에 잠긴 달 — '세 개의 달'을 노래하는 부분인데, 지금 경포대에 서면 이 구절 그대로 재현해 볼 수 있다는 게 신기했다.",
      "낙산사 의상대에서 본 일출도, 오십천 절벽 위에 세워진 죽서루도 다 그대로다. 440년 전 정철이 봤던 풍경을 지금 나도 볼 수 있다는 거다.",
      "시의 마지막 4단은 정철이 여행을 다 마친 뒤 꿈속에서 신선과 노니는 장면으로 끝난다. 실제 여행은 끝났지만, 마음은 아직 그 풍류에 젖어 있다는 뜻인 것 같다 — 정치적 시름도 살짝 담겨 있다고 하고.",
      "그리고 김만중이 서포만필에서 이 작품을 '동방의 이소'라고까지 극찬했다는 걸 알고 나니, 그냥 옛날 교과서 시가 아니라 진짜 대단한 작품이었구나 싶어졌다.",
      "이 시 한 편이 440년 전 실제 여행 코스였다는 걸 알고 나면, 동해안 여행이 완전히 다르게 보인다. 나도 다음에 강릉 갈 일 있으면 경포대에서 저 '세 개의 달' 한번 찾아보고 싶다."
    ],
    hookReveals:[
      { label:"원주 강원감영 → 정철이 실제로 부임한 곳", label_en:"Wonju provincial office → Jeong Cheol's real post", locId:"wonju_gamyeong" },
      { label:"총석정·삼일포 → 지금은 북한 땅, 방문 불가", label_en:"Chongseokjeong & Samilpo → now in North Korea, off-limits", locId:"chongseokjeong" },
      { label:"경포대의 '세 개의 달' → 지금도 볼 수 있다", label_en:"Gyeongpodae's 'three moons' → still visible today", locId:"gyeongpodae" },
      { label:"망양정 → 조선시대 이후 여러 번 자리 옮겨 재건", label_en:"Mangyangjeong → rebuilt at different sites over the centuries", locId:"mangyangjeong" }
    ],
    hookBadge_en:"Jeong Cheol · A governor's real 1580 journey through Gangwon",
    hookTagline_en:"This poem was an actual travel itinerary",
    discoveryHook_en:[
      "I always thought Gwandong Byeolgok was just another classical poem we had to memorize in school — rhythm patterns, 3-4 syllable meter, all that.",
      "Turns out, looking at it again years later, it's not just a poem. It's an actual travel record.",
      "In 1580, 45-year-old Jeong Cheol was appointed governor of Gangwon Province, and this poem traces, almost step by step, the route he genuinely walked.",
      "It opens well too. Jeong Cheol, moved by the king's summons, sets out for the provincial office in Wonju — so from the very first line, this poem never leaves the frame of 'a trip I actually took.'",
      "The second section moves into Inner Kumgang. He climbs Manpokdong, Geumgangdae, Jinheoldae, and Gaesimdae in awe — and it struck me that every one of these is a real coordinate.",
      "Same with Hwaryongyeon and the Twelve-Bend Waterfall. It's not just 'wow, a nice waterfall' — he names each specific spot as he goes.",
      "From the third section on, he passes through Outer Kumgang and Haegeumgang and follows the East Coast through the Eight Views of Gwandong — and this is where it gets a little complicated.",
      "Two of those eight, Chongseokjeong and Samilpo, can't be reached today no matter what map you pull up. They're in North Korea now.",
      "Knowing that Chongseokjeong — where he marveled at the sunrise ringed by stone pillars rising out of the sea — now sits on the other side of a border completely changed how that passage read to me.",
      "Same with Samilpo, tied to a legend of Silla-era warrior-monks. You simply can't go there anymore.",
      "The other six, though — Gyeongpodae, Naksansa, Jukseoru, Cheongganjeong, Mangyangjeong, Wolsongjeong — are all still there, exactly as he described.",
      "The most famous passage of all is the one about Gyeongpodae — the moon in the sky, the moon reflected in the lake, the moon caught in a wine cup — the 'three moons.' What got me is that if you stand at Gyeongpodae today, you can still see this exact scene play out.",
      "The sunrise from Uisangdae at Naksansa Temple, Jukseoru perched over the cliffs of the Osip Stream — all of it is unchanged. The scenery Jeong Cheol saw 440 years ago is the same scenery I could see today.",
      "The poem's final section ends with him, having finished the real journey, dreaming of wandering with immortals. I think it's his way of saying the trip is over but the feeling isn't — and apparently there's a quiet undertone of political worry folded in there too.",
      "And once I learned that Kim Man-jung praised this work in Seopo Manpil as 'the Li Sao of the East,' it stopped feeling like some old textbook poem and started feeling like a genuinely major work.",
      "Realizing this one poem was a real 440-year-old travel itinerary completely changes how you look at a trip along the East Coast. Next time I'm in Gangneung, I want to stand at Gyeongpodae and actually look for those three moons."
    ],
    discoveryHook_ja:[
      "「関東別曲」は学校で覚えさせられただけの古典韻文だと思っていた。3・4調がどうとか、リズムの勉強のために。",
      "でも後になって読み返してみると、これはただの詩じゃなくて、実際の踏査記録だった。",
      "1580年、45歳の鄭澈(チョン・チョル)が江原道観察使として赴任し、実際に歩いた道をそのまま歌にしたものだ。",
      "出だしからして面白い。鄭澈は王の召命に感激しながら原州の江原監営に赴任するところから詩を始める — つまりこの詩、最初から最後まで「自分が実際に経験した旅」という枠から一歩も出ない。",
      "第2段に入ると内金剛が出てくる。万瀑洞、金剛台、眞歇台、開心台を登り降りしながら感嘆するのだが、この地名がすべて実在すると知って驚いた。",
      "火龍淵や十二瀑布も同じだ。「滝がきれいだ」で終わらせず、具体的な場所の名前を一つひとつ挙げながら歌っていく。",
      "第3段からは外金剛、海金剛を過ぎ、東海岸沿いに関東八景を巡るのだが、ここから少し複雑な気持ちになる。",
      "関東八景のうち二カ所、叢石亭と三日浦は、今地図を開いても行くことができない。北朝鮮の領土だからだ。",
      "鄭澈が、海から突き出た石柱に囲まれて日の出を眺め感嘆した叢石亭が、今は国境の向こうにあると知ると、あの一節がまったく違って読めてしまう。",
      "三日浦も同じだ。新羅の花郎の伝説が残る場所らしいが、今は行くことができない。",
      "その代わり、残りの六カ所 — 鏡浦台・洛山寺・竹西楼・清澗亭・望洋亭・越松亭 — は今もそのまま行くことができる。",
      "その中でも一番有名な一節は鏡浦台の場面だ。空に浮かぶ月、湖に映る月、盃に沈む月 — 「三つの月」を歌う部分なのだが、今も鏡浦台に立てばこの一節そのままの光景を再現できるというのが不思議だった。",
      "洛山寺・義湘台から見た日の出も、五十川の断崖の上に建つ竹西楼も、すべてそのまま残っている。440年前に鄭澈が見た風景を、今の自分も見られるということだ。",
      "詩の最後、第4段は鄭澈が旅を終えた後、夢の中で仙人たちと遊ぶ場面で締めくくられる。実際の旅は終わったけれど、心はまだその風流に浸っている、という意味なのだと思う — そこに政治的な憂いもそっと込められているらしい。",
      "そして金萬重が『西浦漫筆』でこの作品を「東方の離騒」とまで絶賛していたと知って、ただの教科書の古典詩じゃなくて本当にすごい作品だったんだと思い直した。",
      "この一編の詩が440年前の実際の旅行コースだったと知ると、東海岸の旅がまったく違って見えてくる。今度江陵に行く機会があれば、鏡浦台であの「三つの月」を探してみたい。"
    ],
    title_ja:"関東別曲(クァンドンビョルゴク)", summary_ja:"1580年、45歳の文臣・鄭澈(チョン・チョル)が江原道観察使として赴任し、内金剛・外金剛・海金剛と関東八景を巡りながら、その絶景と感興を歌った朝鮮随一の紀行歌辞。鏡浦台の「三つの月」、義湘台の日の出など、今なお語り継がれる名句を残した。", author_ja:"鄭澈(チョン・チョル)", era_ja:"朝鮮・宣祖13年(1580年)",
    contentSummary:{ sections:[
      { heading:"부임 — 원주에서 시작된 여정", bullets:[
        "45세의 정철이 강원도관찰사에 제수되어 원주 감영으로 부임한다",
        "임금의 은혜에 감격하며 관동 지역 순력의 여정을 시작한다"
      ]},
      { heading:"내금강의 절경", bullets:[
        "만폭동·금강대·진헐대·개심대를 오르며 금강산 봉우리들의 장관에 감탄한다",
        "화룡연과 십이폭포의 웅장한 정경을 노래한다"
      ]},
      { heading:"관동팔경과 동해의 절경", bullets:[
        "총석정의 해돋이, 삼일포의 신비, 의상대에서 본 일출을 잇달아 노래한다",
        "경포대의 '세 개의 달', 죽서루, 망양정, 월송정까지 — 나머지 여정과 작품의 결말은 원문에서 직접 확인하세요"
      ]}
    ], endingNote:"정철이 꿈속에서 신선과 노닐며 풍류와 소회를 담아낸 결말부는 원문으로 직접 감상하시길 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Gyeongpodae Pavilion Gangneung.JPG", credit:'경포대, 강원 강릉시(관동팔경 중 하나 — 정철이 하늘·호수·바다에 뜬 세 개의 달을 노래한 곳) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:Gyeongpodae_Pavilion_Gangneung.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EA%B4%80%EB%8F%99%EB%B3%84%EA%B3%A1" },
  { id:"wangsanam", title:"왕과 사는 남자", author:"장항준", type:"film", country:"korea", medium:"film", lang:"ko", genres:["historical","drama"],
    // ※ 2026년 2월 4일 개봉, 장항준 감독의 첫 사극 영화. 1457년 단종 폐위~영월 유배~사사, 계유정난과
    //   사육신 사건을 다룬 실화 기반 사극으로 2026년 7월 기준 1691만 관객(역대 박스오피스 2위)을 기록했다.
    //   "정확성 원칙": 등장인물 100명·장소 100곳을 요청받았으나, 실록 등 1차 사료로 이름과 행적이
    //   확인되는 인물만 수록하면 43명, 실제 확인 가능한 장소는 34곳이 정직한 상한선이라 판단해
    //   임의로 인물·장소를 지어내지 않았다. 대신 "촬영지"(FILMED)와 "실제 역사 현장"(REAL SETTING)을
    //   명확히 구분해 수록했다 — 청령포는 관광지화로 실제로는 촬영되지 않았고, 인근 선돌마을 세트가
    //   진짜 촬영지라는 사실도 함께 밝힌다.
    era:"조선 세조 1~3년(1455~1457) / 영화 개봉 2026년", title_en:"The King's Warden", author_en:"Jang Hang-jun", era_en:"Joseon Dynasty, Reign of King Sejo (1455–1457) / Released 2026",
    summary:"1457년, 숙부 세조에게 왕위를 빼앗기고 강원도 영월로 유배된 열일곱 살 폐위 왕 단종과, 그의 마지막을 지킨 실존 인물 엄흥도의 이야기. 2026년 2월 개봉해 1691만 관객을 모으며 역대 박스오피스 2위에 오른 실화 기반 사극.",
    longSummary:"1453년, 수양대군(훗날 세조)은 계유정난을 일으켜 김종서·황보인 등 조카 단종을 보필하던 원로 대신들을 숙청하고 실권을 장악한다. 1455년, 결국 단종은 숙부에게 왕위를 넘기도록 강요받고, 이듬해에는 성삼문·박팽년 등 집현전 학사 출신 신하들(사육신)이 단종 복위를 시도하다 발각되어 처형된다.\n\n1457년 6월, 노산군으로 강봉된 단종은 강원도 영월 청령포로 유배된다. 삼면이 강으로 둘러싸인 '육지 속 섬' 청령포에서, 아무도 곁을 지키려 하지 않는 상황에서 영월의 호장 엄흥도만이 위험을 무릅쓰고 그를 보살핀다. 영화는 이 실존 인물 엄흥도와 폐위된 어린 왕 사이에 쌓이는 관계를 중심으로, 권력을 잃은 인간이 마지막까지 지키려 했던 존엄을 그린다.\n\n그해 10월, 단종은 결국 관풍헌에서 사약을 받고 숨을 거둔다. 아무도 시신을 거두려 하지 않는 상황에서 엄흥도는 목숨을 걸고 몰래 그의 시신을 수습해 암장하는데, 이 자리가 240여 년 뒤 숙종대 단종이 복위되며 '장릉'이라는 정식 왕릉이 된다. 영화는 2026년 2월 4일 개봉해 개봉 50일 만에 1500만을 넘어섰고, 7월 기준 1691만 관객으로 역대 한국 박스오피스 2위, 매출액 1위에 올랐다.",
    pinColor:"#5a1f28",
    summary_en:"In 1457, the deposed 17-year-old King Danjong is exiled to Yeongwol, Gangwon Province, after his throne is seized by his uncle Sejo — and the story of Eom Heung-do, the real historical figure who stayed by his side until the end. Released in February 2026, this true-story historical drama drew 16.91 million admissions, becoming the second highest-grossing film in Korean box office history.",
    longSummary_en:"In 1453, Grand Prince Suyang (later King Sejo) launched the Gyeyu Coup, purging senior officials such as Kim Jong-seo and Hwangbo In who had been protecting his young nephew, King Danjong, and seizing power. In 1455, Danjong was ultimately forced to cede the throne to his uncle, and the following year, former Hall of Worthies scholars including Seong Sam-mun and Bak Paeng-nyeon (the Six Martyred Ministers) attempted to restore him to the throne, were discovered, and were executed.\n\nIn June 1457, Danjong — demoted to the title 'Prince Nosan' — was exiled to Cheongnyeongpo in Yeongwol, Gangwon Province. In this 'land-locked island' surrounded on three sides by rivers, with no one willing to risk staying by his side, only Eom Heung-do, a local Yeongwol official, risked everything to care for him. The film centers on the bond that forms between this real historical figure and the deposed young king, portraying the dignity a person stripped of all power still tries to hold onto until the end.\n\nThat October, Danjong was forced to drink poison and died at Gwanpungheon. With no one willing to claim his body, Eom Heung-do secretly retrieved and buried it at the risk of his own life — the very spot that, some 240 years later under King Sukjong, would become the official royal tomb 'Jangneung.' The film opened on February 4, 2026, surpassed 15 million admissions within 50 days, and by July had reached 16.91 million admissions — the second-highest attendance and highest box-office revenue in Korean film history.",
    communityNote:"《왕과 사는 남자》는 장항준 감독의 첫 사극으로, 1457년 단종의 폐위와 유배, 사사에 이르는 실제 역사를 다룬다. 영화 속 청령포 장면은 실제 청령포가 아니라 인근 선돌마을에 지은 세트에서 촬영됐으며(청령포는 관광지화로 촬영 여건이 맞지 않았다), 뗏목으로 강을 건너는 장면은 영월 어라연에서 실제로 촬영됐다. 등장인물 대부분은 조선왕조실록 등 정사에 기록된 실존 인물이며, 궁녀 '매화'와 '엄태산'은 극적 필요로 만들어진 영화 오리지널 캐릭터다.",
    communityNote_en:"The King's Warden is director Jang Hang-jun's first period film, depicting the real history of King Danjong's deposition, exile, and death in 1457. The film's Cheongnyeongpo scenes were not shot at the real Cheongnyeongpo but at a set built in nearby Seondol Village (the real site's tourist development made filming impractical), while the raft river-crossing scene was genuinely filmed at Eoraeyeon in Yeongwol. Most characters are real historical figures recorded in the Annals of the Joseon Dynasty; the court lady 'Maehwa' and 'Eom Tae-san' are original characters created for dramatic purposes.",
    hookBadge:"장항준 · 유해진 × 박지훈 · 영월 · 단종의 진짜 유배지", hookTagline:"왕과 사는 남자, 보고 나니까 영월이 좀 다르게 보였다",
    discoveryHook:[
      "영화 속 그 강, 진짜 청령포였을까? 《왕과 사는 남자》 보기 전에는 단종 하면 솔직히 교과서에서 보던 어린 왕 정도였다.",
      "근데 영화를 보고 나니까 이상하게 왕보다 그냥 열일곱 살짜리 한 사람이 먼저 생각났다. 엄흥도랑 밥 먹고, 장난도 치고, 강가에 멍하니 앉아 있는 모습 때문인지.",
      "영화를 보고서야 제대로 알게 된 것도 있다. 애초에 단종이 왕위를 잃게 된 건 1453년 계유정난 때문이었다는 것. 숙부 수양대군(훗날 세조)이 김종서·황보인 같은 원로 대신들을 숙청하면서 사실상 권력을 다 가져간 사건이다.",
      "그리고 1456년, 성삼문·박팽년 같은 집현전 출신 신하들이 단종을 다시 왕위에 앉히려다 발각돼서 처형당한다. 이게 그 유명한 '사육신' 사건이다. 이 일 이후로 단종은 완전히 고립된다.",
      "그러니까 영화가 시작되는 1457년 영월 유배는, 이미 몇 년에 걸친 정치적 파국의 마지막 단계였던 셈이다.",
      "마지막으로 갈수록 '아, 얘 결국 어떻게 되는지 나 알고 있는데…' 싶어서 더 마음이 갔다.",
      "그래서 영화에 계속 나오던 그 강도 궁금해졌다. 단종이 유배됐던 영월 청령포. 당연히 영화도 여기서 찍었을 것 같은데, 실제로는 아니다.",
      "청령포는 문화유산이라 대규모 촬영이 어려워서 제작진이 영월 일대를 돌아다니다가 다른 강가에 마을을 새로 만들었다. 길도 없던 곳이라 촬영하려고 길부터 냈다고 한다.",
      "촬영이 끝난 뒤 세트는 모두 철거됐다. 그러니까 영화 속 엄흥도의 집은 지금 찾아갈 수 없다.",
      "대신 진짜 단종이 갇혀 지냈던 청령포는 그대로 남아 있다. 지금도 배를 타고 들어가야 하고, 세 방향은 강, 뒤는 절벽이다. 사진으로만 봐도 좀 답답하다.",
      "영화 보고 나서 보면 더 그렇다. 저 강을 매일 바라보면서도 건널 수 없었다고 생각하면, 영화에서 단종이 강가에 앉아 있던 장면이 괜히 다시 생각난다.",
      "그리고 그 장면에도 작은 이야기가 하나 있다. 단종이 혼자 강가에 앉아 있는 모습은 원래 시나리오에 없었다. 쉬는 시간에 강가에 앉아 있던 박지훈을 스태프가 찍었고, 그 사진을 본 유해진이 \"이거 장면으로 한번 찍어보면 어떠냐\"고 제안하면서 영화에 들어갔다고 한다.",
      "알고 나니 그 장면이 조금 다르게 보였다. 뭔가 연기하고 있는 왕이라기보다 잠깐 혼자 있고 싶은 어린 사람처럼 보여서.",
      "청령포 안에는 단종이 한양을 바라봤다는 노산대, 정순왕후를 생각하며 돌을 쌓았다고 전해지는 망향탑, 단종의 모습을 지켜봤다는 이야기가 남은 관음송도 있다.",
      "결말까지 스포일러하자면, 단종은 그해 10월 결국 관풍헌에서 사약을 받고 숨을 거둔다. 아무도 시신을 거두려 하지 않던 그 순간, 엄흥도만이 목숨을 걸고 몰래 시신을 수습해 암장한다.",
      "그리고 이 대목이 진짜 소름 돋는 부분인데, 엄흥도가 몰래 묻었던 그 자리가 240여 년 뒤 숙종 때 단종이 복위되면서 정식 왕릉 '장릉'이 된다. 한 사람이 목숨 걸고 지킨 자리가, 결국 시간이 지나 정식으로 인정받은 셈이다.",
      "나는 아직 영월에 가본 건 아니지만, 영화 보고 나서는 한번 가보고 싶어졌다. 촬영 인증샷을 찍으러 간다기보다, 단종이 실제로 바라봤다는 그 강을 한번 보고 싶어서.",
      "영화 속 세트는 없어졌지만 그 이야기가 시작된 곳도, 결국 그 이야기가 뒤늦게 인정받은 자리(장릉)도 다 아직 거기 있으니까."
    ],
    hookReveals:[
      { label:"영화 속 청령포 → 실제로는 인근 선돌마을에 새로 지은 세트(촬영 후 철거)", label_en:"Cheongnyeongpo on screen → actually a set newly built in nearby Seondol Village, torn down after filming", label_ja:"映画の中の清冷浦 → 実際は近くのソンドル村に新しく建てたセット(撮影後撤去)", locId:"seondolmaeul" },
      { label:"진짜 청령포 → 단종이 실제로 갇혀 지낸 곳, 지금도 배로만 들어감", label_en:"The real Cheongnyeongpo → where Danjong was truly confined, still only reachable by boat", label_ja:"本物の清冷浦 → 端宗が実際に幽閉された場所、今も船でしか入れない", locId:"cheongryeongpo" },
      { label:"단종이 강가에 앉은 장면 → 박지훈의 즉흥 사진에서 유해진이 제안해 탄생", label_en:"Danjong sitting by the river → born from an off-the-cuff photo of Park Ji-hun, suggested by Yoo Hae-jin", label_ja:"端宗が川辺に座るシーン → パク・ジフンの何気ない写真からユ・ヘジンの提案で誕生", locId:null },
      { label:"청령포 안 관음송·망향탑 → 단종의 유배 시절 전설이 남은 실존 나무·탑", label_en:"Gwaneumsong pine & Manghyangtap tower inside Cheongnyeongpo → real relics tied to legends from Danjong's exile", label_ja:"清冷浦内の観音松と望郷塔 → 端宗の流刑時代の伝説が残る実在の松と塔", locId:"gwaneumsong" }
    ],
    hookBadge_en:"Jang Hang-jun · Yoo Hae-jin × Park Ji-hun · Yeongwol · Danjong's real exile site",
    hookTagline_en:"After The King's Warden, Yeongwol looked different to me",
    discoveryHook_en:[
      "That river in the movie — was it really Cheongnyeongpo? Before watching The King's Warden, Danjong was honestly just the boy-king from my history textbook to me.",
      "But after watching it, weirdly, what stuck with me wasn't the king — it was just a seventeen-year-old. Maybe because of the scenes of him eating with Eom Heung-do, joking around, sitting blankly by the river.",
      "The film also cleared something up for me: Danjong lost his throne in the first place because of the 1453 Gyeyu Coup. His uncle, Grand Prince Suyang (later King Sejo), purged senior officials like Kim Jong-seo and Hwangbo In and effectively seized power.",
      "Then in 1456, former Hall of Worthies scholars including Seong Sam-mun and Bak Paeng-nyeon tried to restore Danjong to the throne, were caught, and were executed — the famous 'Six Martyred Ministers' incident. After that, Danjong was completely isolated.",
      "So the 1457 exile to Yeongwol, where the film begins, was really the final stage of a political catastrophe that had already been unfolding for years.",
      "The closer it got to the end, the more it got to me, thinking, 'ah, I already know how this ends for him...'",
      "So I got curious about that river that kept showing up in the film. Cheongnyeongpo in Yeongwol, where Danjong was exiled. I assumed the film was shot there too — turns out it wasn't.",
      "Cheongnyeongpo is a protected heritage site, so large-scale filming wasn't possible there. The crew scouted around Yeongwol and built a whole village on a different riverbank instead. There wasn't even a road to the spot, so they had to build one just to film.",
      "The set was torn down completely after filming wrapped. So Eom Heung-do's house from the movie doesn't exist anywhere to visit now.",
      "But the real Cheongnyeongpo, where Danjong was actually confined, is still there. You still have to reach it by boat — river on three sides, a cliff behind. It looks suffocating even in photos.",
      "Even more so after watching the film. Thinking that he looked at that same river every single day and could never cross it makes the scene of him sitting by the riverbank stick in your head all over again.",
      "There's a small story behind that scene too. Danjong sitting alone by the river wasn't originally in the script. A staff member happened to photograph Park Ji-hun sitting by the river on a break, and when Yoo Hae-jin saw the photo, he suggested, 'why don't we try shooting this as a scene' — and it made it into the film.",
      "Knowing that changed how the scene looked to me. Less like a king performing his role, more like a young person who just wanted a moment alone.",
      "Inside Cheongnyeongpo there's also Nosandae, where Danjong is said to have looked toward Hanyang; Manghyangtap, a tower he's said to have built stone by stone while thinking of Queen Jeongsun; and Gwaneumsong, a pine tree said to have watched over him.",
      "To spoil the ending outright: that October, Danjong was forced to drink poison and died at Gwanpungheon. With no one else willing to even claim his body, Eom Heung-do alone risked his life to secretly retrieve it and bury it.",
      "And here's the part that genuinely gives me chills — the spot where Eom Heung-do secretly buried him became, some 240 years later under King Sukjong, the official royal tomb 'Jangneung.' A place one man protected at the cost of his own safety eventually got formally recognized, just a couple centuries late.",
      "I haven't been to Yeongwol yet, but after this film I want to go. Not really for a filming-location photo, but to see the river Danjong actually looked at.",
      "The movie set is gone, but the place where that story began — and the place where it was finally, belatedly honored — are both still there."
    ],
    hookBadge_ja:"チャン・ハンジュン · ユ・ヘジン×パク・ジフン · 寧越 · 端宗の本当の流刑地",
    hookTagline_ja:"『王と暮らす男』を見てから、寧越が少し違って見えた",
    discoveryHook_ja:[
      "映画の中のあの川、本当に清冷浦だったのかな。『王と暮らす男』を見る前は、端宗と言えば正直、教科書で見た幼い王という程度だった。",
      "でも映画を見た後は、不思議と王よりも、ただの十七歳の一人の人間が先に思い浮かんだ。エム・フンドと食事をして、冗談を言い合って、川辺でぼんやり座っている姿のせいかもしれない。",
      "映画を見て初めてちゃんと知ったこともある。そもそも端宗が王位を失うことになったのは、1453年の癸酉靖難(ケユジョンナン)がきっかけだった。叔父の首陽大君(後の世祖)が金宗瑞や皇甫仁といった重臣たちを粛清し、実権をほぼ全て握った事件だ。",
      "そして1456年、成三問や朴彭年ら集賢殿出身の臣下たちが端宗を王位に戻そうとして発覚し、処刑される。これがあの有名な「死六臣」事件だ。この一件以降、端宗は完全に孤立していく。",
      "つまり映画が始まる1457年の寧越流刑は、すでに数年にわたって進んでいた政治的破局の、最後の段階だったわけだ。",
      "終盤に近づくにつれ、「ああ、この子が結局どうなるか私は知っているのに…」と思って、余計に心が動いた。",
      "だから映画にずっと出てきたあの川も気になった。端宗が流刑された寧越の清冷浦。当然映画もここで撮ったと思っていたけど、実際は違う。",
      "清冷浦は文化遺産で大規模な撮影が難しく、制作陣は寧越一帯を回った末、別の川辺に村を新しく作った。道もなかった場所だったので、撮影のために道から作ったという。",
      "撮影が終わった後、セットはすべて撤去された。だから映画の中のエム・フンドの家は今はもう訪ねることができない。",
      "その代わり、本物の端宗が閉じ込められていた清冷浦はそのまま残っている。今も船に乗って入らなければならず、三方は川、後ろは崖だ。写真で見るだけでも少し息が詰まる。",
      "映画を見た後だとなおさらそう感じる。あの川を毎日見つめながらも渡れなかったのだと思うと、映画で端宗が川辺に座っていたシーンがつい思い出される。",
      "そしてあのシーンにも小さなエピソードがある。端宗が一人で川辺に座っている姿は、もともと脚本にはなかった。休憩時間に川辺に座っていたパク・ジフンをスタッフが撮影し、その写真を見たユ・ヘジンが「これ、シーンとして一度撮ってみたらどうか」と提案して映画に入ったという。",
      "それを知ると、あのシーンが少し違って見えた。演技している王というより、少しだけ一人になりたい若者のように見えて。",
      "清冷浦の中には、端宗が漢陽を眺めたという魯山台、貞純王后を思いながら石を積んだと伝わる望郷塔、端宗の姿を見守ったという話が残る観音松もある。",
      "結末までネタバレしてしまうと、端宗はその年の10月、結局観風軒で賜薬を受けて息を引き取る。誰も遺体を引き取ろうとしなかったそのとき、エム・フンドただ一人が命懸けで密かに遺体を収め、埋葬する。",
      "そしてここが本当にぞっとする部分なのだが、エム・フンドが密かに埋めたその場所が、約240年後の粛宗の時代に端宗が復位したことで、正式な王陵「荘陵」になる。一人の人間が命を懸けて守った場所が、時を経て正式に認められたということだ。",
      "私はまだ寧越に行ったことはないけれど、映画を見た後は一度行ってみたくなった。撮影地の記念写真を撮りに行くというより、端宗が実際に見つめていたというあの川を一度見てみたくて。",
      "映画のセットはなくなったけれど、その物語が始まった場所も、そしてその物語が遅れて認められた場所(荘陵)も、まだそこにあるから。"
    ],
    title_ja:"王と暮らす男", summary_ja:"1457年、叔父の世祖(セジョ)に王位を奪われ、江原道・寧越(ヨンウォル)に流刑となった17歳の廃位王・端宗(タンジョン)と、その最期を見守った実在の人物エム・フンドの物語。2026年2月に公開され、1691万人の観客を動員して歴代興行成績歴代2位となった実話ベースの時代劇。", author_ja:"チャン・ハンジュン", era_ja:"朝鮮・世祖1~3年(1455~1457年) / 映画公開2026年",
    contentSummary:{ sections:[
      { heading:"계유정난 — 권력이 뒤바뀌다", bullets:[
        "1453년, 수양대군이 계유정난을 일으켜 김종서·황보인 등 원로 대신들을 숙청한다",
        "1455년, 어린 단종은 결국 숙부 세조에게 왕위를 넘기도록 강요받는다"
      ]},
      { heading:"사육신 — 실패한 복위 시도", bullets:[
        "1456년, 성삼문·박팽년 등 집현전 학사 출신 신하들이 단종 복위를 도모하다 발각되어 처형된다",
        "이들의 부친과 가족까지 함께 화를 입으며, 영월 유배를 앞둔 단종은 더욱 고립된다"
      ]},
      { heading:"영월 유배 — 엄흥도라는 사람", bullets:[
        "1457년 6월, 단종은 청령포로 유배되고 아무도 그의 곁을 지키려 하지 않는다",
        "영월 호장 엄흥도만이 위험을 무릅쓰고 곁을 지킨다 — 이후의 이야기는 작품에서 직접 확인하세요"
      ]}
    ], endingNote:"단종의 마지막과 엄흥도의 마지막 선택은 작품에서 직접 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/CheongRyeongpo Eoso.JPG", credit:'청령포 단종어소, 강원 영월군(단종이 유배 생활을 했던 거처) · Wikimedia Commons', creditUrl:"https://commons.wikimedia.org/wiki/File:CheongRyeongpo_Eoso.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%99%95%EA%B3%BC_%EC%82%AC%EB%8A%94_%EB%82%A8%EC%9E%90" },
  { id:"spiderman", title:"스파이더맨: 홈커밍 (Spider-Man: Homecoming)", author:"존 왓츠 감독 · 마블 스튜디오·소니 픽처스", type:"film", country:"usa", medium:"film", genres:["action","adventure","scifi"],
    lang:"en", // 영어권 작품 — 브레이킹 배드·해리 포터와 동일하게 레딧 등 영어권 SNS 채널을 우선 노출한다.
    // ※ 기획자 제안(2026-08): 최근 넷플릭스 재상위권 진입 + 실제 촬영지가 뉴욕·애틀랜타·워싱턴DC·베를린
    //   20곳 이상 확인되는 "검색 자산"으로 선정. "실제 촬영지 vs 작품 속 장소(뉴욕인 줄 알았는데 애틀랜타)"
    //   비교가 핵심 콘텐츠 축. "정확성 원칙"(왕과 사는 남자·직지와 동일): 등장인물 50~100명을 요청받았으나,
    //   실사 장편영화 한 편의 정식 크레딧으로 이름·배역이 확인되는 인물은 50명이 정직한 상한선이라 판단해
    //   무명 엑스트라를 지어내지 않았다. 대신 장소는 실제 촬영지(FILMED) 25곳 + 서사적 실존 배경(STORY
    //   SETTING) 15곳 + 촬영 도시 4곳(뉴욕·애틀랜타·워싱턴DC·베를린)에서 함께 즐길 수 있는 실존 여행지
    //   (EXPERIENCE) 62곳을 더해 102곳으로 "100곳 이상" 요청을 정직하게 충족했다.
    era:"극중 2016년(시빌 워 직후) · 미국 개봉 2017년 7월", title_en:"Spider-Man: Homecoming", author_en:"Directed by Jon Watts · Marvel Studios / Sony Pictures", era_en:"Story set in 2016 (right after Civil War) · Released July 2017",
    summary:"<시빌 워>에서 어벤져스의 일원으로 첫 임무를 마친 퀸즈의 고등학생 피터 파커가, 화려한 전투보다 '동네를 지키는 히어로'로 인정받고 싶어 좌충우돌하는 이야기. 실제로는 애틀랜타에서 대부분 촬영됐지만 무대는 뉴욕 퀸즈이며, 워싱턴 DC·베를린 로케이션도 포함된 마블 시네마틱 유니버스의 스파이더맨 첫 단독 영화다.",
    longSummary:"2016년 개봉한 <캡틴 아메리카: 시빌 워>에서 어벤져스의 일원으로 깜짝 활약한 피터 파커. 하지만 그 화려한 첫 임무 이후, 그는 다시 평범한 퀸즈의 고등학생으로 돌아와야 한다. 스타크가 만들어준 새 슈트를 입고 동네를 순찰하지만, 정작 하는 일이라곤 자전거 도둑을 잡거나 길을 알려주는 정도. '진짜 어벤져스'가 되고 싶은 조바심 속에서, 그는 우연히 첨단 외계 기술로 무기를 만들어 파는 조직을 발견한다.\n\n이 영화가 흥미로운 건 '히어로 영화'이면서도 정작 절반은 하이틴 무비라는 점이다. 짝사랑, 홈커밍 파티, 디케슬론 대회 같은 지극히 평범한 고등학교 서사가 슈트를 입고 건물 사이를 날아다니는 장면들과 나란히 놓인다. 그리고 빌런 벌처(에이드리언 툼스)는 마블 영화 통틀어 손꼽히게 '이해되는' 악당으로 평가받는다 — 그는 세상을 정복하려는 게 아니라, 그저 빼앗긴 일자리와 가족을 지키려 할 뿐이다.\n\n개인적으로 가장 인상 깊은 지점은 이 영화가 뉴욕을 무대로 하면서도 실제로는 애틀랜타에서 대부분 촬영됐다는 사실이다. 피터가 다니는 학교의 외관은 브루클린이지만 내부는 애틀랜타이고, 그의 단골 델리도 애틀랜타 다운타운의 한 건물이다. '진짜 뉴욕'과 '뉴욕처럼 꾸며진 도시' 사이의 이 간극을 알고 나면, 영화를 다시 볼 때 완전히 다른 재미가 생긴다.",
    pinColor:"#c8102e",
    summary_en:"After his surprise debut with the Avengers in Civil War, Queens high-schooler Peter Parker just wants to be recognized as a hero who looks out for his own neighborhood, rather than chasing bigger battles. Though the story is set in Queens, New York, most of the film was actually shot in Atlanta, with additional location work in Washington DC and Berlin — Spider-Man's first solo film in the Marvel Cinematic Universe.",
    longSummary_en:"After his surprise appearance as an Avenger in 2016's Captain America: Civil War, Peter Parker has to go back to being an ordinary Queens high-schooler. Wearing the new suit Tony Stark built him, he patrols the neighborhood — but mostly ends up catching bicycle thieves or giving directions. Impatient to prove himself a 'real Avenger,' he stumbles onto a criminal operation selling weapons built from salvaged alien technology.\n\nWhat makes this film interesting is that, for all its superhero trappings, half of it is really a teen movie. A crush, a homecoming dance, an academic decathlon competition — thoroughly ordinary high-school beats sit right alongside suit-clad swinging between buildings. And its villain, Vulture (Adrian Toomes), is often ranked among the MCU's most 'understandable' antagonists — he isn't trying to conquer the world, just protect the livelihood and family that were taken from him.\n\nWhat strikes me most, personally, is that a film set in New York was mostly filmed in Atlanta. Peter's school is Brooklyn on the outside and Atlanta on the inside; even his go-to deli is a building in downtown Atlanta. Once you know the gap between 'the real New York' and 'a city dressed up to look like New York,' rewatching the film becomes a completely different kind of fun.",
    communityNote:"팬 커뮤니티에서 자주 회자되는 지점은 크게 두 가지예요. 하나는 '벌처가 MCU 최고의 빌런 중 하나'라는 평가 — 세계 정복이 아니라 생계와 가족을 지키려는 지극히 인간적인 동기가 설득력을 높였다는 의견이 많습니다. 다른 하나는 '실제 뉴욕과 촬영지 애틀랜타의 간극' 자체가 팬들 사이에서 하나의 놀이가 됐다는 점이에요 — 어느 장면이 진짜 뉴욕이고 어느 장면이 애틀랜타인지 찾아내는 게시물들이 꾸준히 공유됩니다.",
    communityNote_en:"Two topics come up again and again in fan discussions. First, Vulture is widely rated as one of the MCU's best villains — fans often point to his very human motive (protecting his livelihood and family, not conquering the world) as what makes him work. Second, the gap between the 'real' New York setting and the actual Atlanta filming locations has become something of a game among fans, with posts regularly popping up trying to spot exactly which shots are real NYC versus Atlanta standing in.",
    hookBadge:"MCU · 스파이더맨 첫 단독 영화 · 촬영지 & 숨은 이야기", hookTagline:"뉴욕 영화인데 왜 다 애틀랜타야",
    discoveryHook:[
      "<스파이더맨: 홈커밍> 보고 나면 당연히 뉴욕 퀸즈 가고 싶어진다.",
      "근데 찾아보니까 이 영화, 진짜 촬영은 거의 다 애틀랜타에서 했다.",
      "피터가 다니는 '미드타운 과학기술고'부터가 그렇다. 정문(외관)은 브루클린의 프랭클린 K. 레인 고등학교인데, 복도랑 교실(내부)은 애틀랜타의 헨리 W. 그레이디 고등학교다. 학교 하나가 두 도시에 걸쳐 있는 셈.",
      "피터가 늘 들르던 델리 '델마스'도 사실 애틀랜타 다운타운 피치트리 스트리트의 한 가게 외관이다. (나중에 <노 웨이 홈>에서는 이 델리가 진짜 퀸즈로 '이사'한다는 설정으로 이어진다고 하니 재밌다.)",
      "어벤져스 신본부로 나오는 그 매끈한 건물도 실제로 존재한다 — 포르쉐 익스피리언스 센터, 애틀랜타 공항 바로 옆에 있고 지금도 일반인이 관람할 수 있다.",
      "대신 진짜 뉴욕에서 찍은 장면도 있다. 무인 수송기가 낙하산 타워를 부수는 그 장면은 코니아일랜드에서 실제로 촬영했고, 지금도 그대로 운영 중인 놀이공원이다.",
      "디케슬론 대회로 워싱턴 DC까지 가는 장면도 진짜다. 워싱턴 기념탑, 실제 그 자리에서 찍었다. (참고로 이 여행에서 네드가 몰래 챙긴 외계 기술이 오작동하면서 하마터면 대형 사고로 이어질 뻔한다.)",
      "촬영지 얘기만큼 재밌는 게 벌처의 정체다. 알고 보면 이 영화, 그냥 '악당 하나 등장'이 아니라 시작부터 그 밑밥을 깔아놓는다.",
      "8년 전, 2012년 뉴욕 전투(어벤져스 1편) 직후 잔해 정리를 하던 폐기물 처리업자 에이드리언 툼스는 그 계약을 정부 기관 데미지 컨트롤에게 빼앗긴다. 이미 회수해둔 외계 기술 일부를 몰래 챙긴 그는, 8년 뒤 그걸로 암시장 무기상이 되어 다시 등장한다.",
      "그러니까 벌처는 세계 정복 같은 거창한 동기가 아니라, 빼앗긴 생계와 가족을 지키려는 아주 인간적인 동기로 움직인다. MCU 빌런 중에서도 유독 '이해되는 악당'으로 꼽히는 이유다.",
      "중반부 스태튼아일랜드 페리 장면도 스포일러하자면, 피터가 무기 거래를 저지하려다가 페리를 두 동강 낼 뻔한 대형 사고를 친다. 이 일로 스타크한테 직접 슈트를 회수당한다.",
      "그리고 얼마 지나지 않아 피터는 정말 뜻밖의 상황에서 벌처의 진짜 정체를 알게 된다. 슈트도 없는 상태에서 말이다.",
      "슈트 없이 최후의 대결에 나서는 이 부분이 이 영화에서 제일 좋아하는 지점이다. '히어로는 슈트가 아니라 사람'이라는 뻔한 메시지를, 뻔하지 않게 보여준다.",
      "영화 끝에서 스타크가 피터를 정식 어벤져스로 초대하는 장면이 나오는데, 그가 그 초대를 받아들이는지는 여기서 스포일러하지 않으려 한다 — 이건 진짜 직접 보는 게 낫다.",
      "그러니까 이 영화, 뉴욕 이야기인 척하면서 사실은 애틀랜타·뉴욕·워싱턴 DC·베를린까지 걸친 여행기였던 셈. 뉴욕 가면 퀸즈보로 다리부터, 애틀랜타 가면 저 학교 앞부터 서보고 싶어진다.",
      "그리고 코니아일랜드 가면 저 낙하산 타워도 한번 올려다보고 싶다. 영화 속에선 박살 나지만, 실제로는 지금도 멀쩡히 돌아가고 있으니까."
    ],
    hookReveals:[
      { label:"학교 외관 → 브루클린, 내부 → 애틀랜타", label_en:"School exterior → Brooklyn, interior → Atlanta", locId:"franklinlanehigh" },
      { label:"델리 '델마스' → 애틀랜타 다운타운 실존 건물", label_en:"Delmar's Deli → a real building in downtown Atlanta", locId:"delmarsdeli" },
      { label:"어벤져스 신본부 → 실제 포르쉐 익스피리언스 센터", label_en:"New Avengers HQ → the real Porsche Experience Center", locId:"porschecenter" },
      { label:"낙하산 타워 격추 장면 → 진짜 코니아일랜드에서 촬영", label_en:"The Parachute Jump crash → really filmed at Coney Island", locId:"coneyislandboardwalk" }
    ],
    hookBadge_en:"MCU · Spider-Man's first solo film · Filming locations & behind-the-scenes",
    hookTagline_en:"Set in New York, filmed almost entirely in Atlanta",
    discoveryHook_en:[
      "After Spider-Man: Homecoming, of course you want to go to Queens, New York.",
      "Turns out, though, almost all of it was actually filmed in Atlanta.",
      "Start with Peter's school, 'Midtown School of Science and Technology.' The front entrance (exterior) is Franklin K. Lane High School in Brooklyn — but the hallways and classrooms (interior) are Henry W. Grady High School in Atlanta. One school, split across two cities.",
      "Peter's regular deli, 'Delmar's,' is really the storefront of a building on Peachtree Street in downtown Atlanta. (Apparently in No Way Home, this same deli 'moves' to a real Queens storefront — a fun detail once you know it.)",
      "Even that sleek building that plays the Avengers' new HQ is real — the Porsche Experience Center, right next to the Atlanta airport, still open to the public today.",
      "Some scenes really were shot in New York, though. The scene where the unmanned cargo plane crashes into the Parachute Jump was filmed at Coney Island, an amusement park that's still running today.",
      "The decathlon trip to Washington DC is real too — the Washington Monument scene was actually shot at the real monument. (Small detail: that's also the trip where the alien tech Ned's secretly carrying malfunctions and nearly causes a real disaster.)",
      "As fun as the filming locations are, the Vulture's identity is just as interesting. This movie isn't just 'here's a villain' — it plants the setup from the very first scene.",
      "Eight years earlier, right after the 2012 Battle of New York (the first Avengers film), salvage contractor Adrian Toomes has his cleanup contract stripped away by the government agency Damage Control. He secretly keeps some of the alien tech he'd already recovered, and eight years later resurfaces as a black-market weapons dealer using it.",
      "So Vulture isn't chasing world domination — he's driven by something painfully human: protecting the livelihood and family that were taken from him. It's a big part of why he's often ranked as one of the MCU's most 'understandable' villains.",
      "To spoil the Staten Island Ferry scene: Peter, trying to stop a weapons deal, accidentally splits the ferry nearly in half. Stark personally confiscates his suit for it.",
      "Not long after, Peter learns Vulture's real identity in a genuinely unexpected situation — with no suit to fall back on.",
      "That's actually my favorite part of the movie: facing the final showdown without the suit. It sells the obvious 'the hero is the person, not the suit' message without ever feeling obvious.",
      "Near the end, Tony invites Peter to officially join the Avengers — whether he accepts is one thing I'll leave unspoiled here. That one's genuinely better to watch for yourself.",
      "So this movie pretends to be a New York story while actually being a travelogue across Atlanta, New York, Washington DC, and Berlin. Makes you want to stand at the Queensboro Bridge in New York, or in front of that school in Atlanta.",
      "And if you make it to Coney Island, look up at that Parachute Jump tower for a second — it gets destroyed in the movie, but in real life it's still standing there, perfectly fine."
    ],
    hookBadge_ja:"MCU · スパイダーマン初のソロ映画 · 撮影地&裏話",
    hookTagline_ja:"舞台はニューヨーク、でもほぼアトランタ撮影",
    discoveryHook_ja:[
      "『スパイダーマン:ホームカミング』を見終わると、当然ニューヨークのクイーンズに行きたくなる。",
      "でも調べてみると、この映画、実際の撮影のほとんどはアトランタで行われていた。",
      "ピーターが通う「ミッドタウン科学技術高校」からしてそうだ。正門(外観)はブルックリンのフランクリンK.レイン高校だけど、廊下や教室(内部)はアトランタのヘンリーW.グレイディ高校。学校ひとつが二つの都市にまたがっているわけだ。",
      "ピーターの行きつけのデリ「デルマーズ」も、実はアトランタ・ダウンタウンのピーチツリー・ストリートにある店の外観だった。(後の『ノー・ウェイ・ホーム』では、このデリが本物のクイーンズに『引っ越す』設定になっているらしくて、それも面白い。)",
      "アベンジャーズの新本部として出てくるあの洗練された建物も、実在する。ポルシェ・エクスペリエンス・センター、アトランタ空港のすぐ隣にあって、今も一般公開されている。",
      "逆に本物のニューヨークで撮った場面もある。無人輸送機がパラシュートタワーを壊すあのシーン、コニーアイランドで実際に撮影されていて、今もそのまま営業中の遊園地だ。",
      "決勝大会でワシントンDCまで行くシーンも本物。ワシントン記念塔、実際にその場所で撮影している。(ちなみにこの遠征中、ネッドがこっそり持っていた地球外テクノロジーが誤作動して、あわや大惨事になりかけるエピソードもある。)",
      "撮影地の話と同じくらい面白いのが、ヴァルチャーの正体だ。この映画、ただ「悪役が一人出てくる」だけじゃなくて、最初のシーンからその伏線を仕込んでいる。",
      "8年前、2012年のニューヨーク決戦(アベンジャーズ1作目)直後、瓦礫処理を請け負っていた業者エイドリアン・トゥームスは、その契約を政府機関デイメージ・コントロールに奪われてしまう。すでに回収していた地球外テクノロジーの一部をこっそり持ち出した彼は、8年後、それを使った闇武器商人として再び姿を現す。",
      "つまりヴァルチャーは世界征服みたいな大それた動機ではなく、奪われた生活と家族を守りたいという、極めて人間的な動機で動いている。MCUの悪役の中でも特に「理解できる悪役」と言われる理由だ。",
      "中盤のスタテンアイランド・フェリーのシーンもネタバレすると、ピーターが武器取引を止めようとして、フェリーを真っ二つにしかけるという大事故を起こしてしまう。この一件で、スタークに直接スーツを回収されてしまう。",
      "そしてそれからほどなくして、ピーターは本当に思いがけない状況で、ヴァルチャーの本当の正体を知ることになる。しかもスーツなしの状態で。",
      "スーツなしで最後の対決に臨むこの部分が、この映画で一番好きなところだ。「ヒーローはスーツじゃなく人だ」という、ありがちなメッセージを、ありがちに見せずに描いている。",
      "映画の終盤、スタークがピーターを正式にアベンジャーズに招待する場面があるのだが、彼がその招待を受け入れるかどうかはここではネタバレしないでおく — これは本当に自分の目で確かめたほうがいい。",
      "つまりこの映画、ニューヨークの話のふりをしながら、実はアトランタ・ニューヨーク・ワシントンDC・ベルリンにまたがる旅行記だったわけだ。ニューヨークに行くならクイーンズボロ橋から、アトランタに行くならあの学校の前から、立ってみたくなる。",
      "そしてコニーアイランドに行ったら、あのパラシュートタワーも一度見上げてみたい。映画の中では壊れてしまうけど、現実には今もそのまま、元気に立っているから。"
    ],
    contentSummary:{ sections:[
      { heading:"프롤로그 — 8년 전, 뉴욕 전투의 잔해", bullets:[
        "2012년 뉴욕 전투(어벤져스) 직후, 폐기물 처리업자 에이드리언 툼스는 잔해 정리 계약을 정부(데미지 컨트롤)에 빼앗긴다",
        "이미 회수해둔 외계 기술 일부를 몰래 챙긴 툼스는, 8년 뒤 이를 활용한 암시장 무기상으로 재기한다"
      ]},
      { heading:"첫 임무의 여운 — 시빌 워 이후", bullets:[
        "베를린에서 어벤져스의 내분(<캡틴 아메리카: 시빌 워>)에 투입됐던 피터는, 화려한 첫 임무를 뒤로하고 다시 평범한 퀸즈의 고등학생으로 돌아온다",
        "해피 호건의 연락을 애타게 기다리며, 스타크가 업그레이드해 준 새 슈트를 입고 동네 순찰을 시작한다"
      ]},
      { heading:"평범한 일상과 첫 단서 — 자전거 도둑에서 무기 거래까지", bullets:[
        "자전거 도둑 검거, 은행 강도 저지 등 소소한 동네 치안을 담당하던 피터는 우연히 대규모 무기 거래 현장을 목격한다",
        "리즈의 홈커밍 파티에 초대받아 들뜨지만, 파티 근처에서 다시 무기 거래 정황을 포착하며 벌처와 처음 조우한다"
      ]},
      { heading:"디케슬론 원정 — 워싱턴 DC로", bullets:[
        "무기의 출처를 추적하던 피터는 학교 디케슬론 팀의 워싱턴 DC 전국대회에 자원해 동행한다",
        "대회에서 우승한 팀은 축하 방문으로 워싱턴 기념탑에 오르지만, 네드가 몰래 들고 있던 외계 기술이 오작동하며 위기가 벌어진다"
      ]},
      { heading:"클라이맥스 — 벌처의 정체와 마지막 대결", bullets:[
        "스태튼아일랜드 페리에서 무기 거래를 저지하려다 큰 사고를 낸 피터는 스타크에게 슈트를 회수당한다",
        "이후 벌처의 정체를 뜻밖의 상황에서 알게 된 피터는, 슈트 없이도 자신만의 방식으로 최후의 대결에 나선다 — 그 결말은 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"벌처와의 최종 대결, 그리고 피터가 어벤져스의 정식 초대를 받아들이는지 여부는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Porsche North America, Atlanta.JPG", credit:"포르쉐 익스피리언스 센터, 애틀랜타(영화 속 '어벤져스 신본부' 실제 촬영지) · Michael Rivera, Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Porsche_North_America,_Atlanta.JPG" },
    posterPage:"https://en.wikipedia.org/wiki/Spider-Man:_Homecoming" },
  { id:"sonyeon", title:"소년이 온다 (Human Acts)", author:"한강 지음 · 창비", type:"literary", country:"korea", medium:"novel", genres:["drama","historical"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 기획자 제안(2026-08): 광주광역시 공식 "소년의 길·작가의 길" 문학기행 코스를 바탕으로 선정.
    //   2024년 노벨문학상 수상작가 한강의 대표작으로, 광주를 알리는 콘텐츠로 최적. 학교폭력을 다룬 더 글로리와
    //   달리 이 작품은 실제 국가폭력·학살을 다루므로, 성지순례·포토존이 아니라 "문학+역사+기억"의 여행으로
    //   다룬다는 원칙을 특히 엄격히 지킨다. 실존 희생자·유가족에 대한 예우를 최우선으로 한다.
    era:"1980년 5월 광주민주화운동 및 그 이후", title_en:"Human Acts", author_en:"By Han Kang · Changbi Publishers", era_en:"The May 1980 Gwangju Uprising and its aftermath",
    summary:"1980년 5월 광주. 친구 정대를 잃은 중학생 동호가 상무관에 남아 시신 수습을 돕다 목숨을 잃기까지, 그리고 살아남은 이들이 이후 수십 년을 어떻게 견뎌내는지를 그린 소설. 2024년 노벨문학상을 받은 한강의 대표작으로, 전일빌딩245·옛 전남도청·상무관 등 광주 원도심의 실제 5·18 사적지가 소설의 실질적 배경이다.",
    longSummary:"'소년이 온다'를 다시 펼치는 이유는 단순히 슬픈 이야기여서가 아니다. 이 소설은 국가폭력이 한 사람, 한 가족, 한 도시에 남긴 시간의 무게를 정면으로 응시한다.\n\n소설은 여섯 명의 화자가 번갈아 말하는 구조를 취한다. 계엄군의 총에 죽은 정대, 상무관에서 시신을 수습하다 목숨을 잃은 동호, 그리고 살아남았지만 평생 그날을 짊어져야 했던 은숙·진수·선주, 마지막으로 아들을 잃은 어머니까지. 동호는 실존 인물 문재학(당시 16세, 광주상업고등학교 1학년)을 모티브로 한 것으로 널리 알려져 있다.\n\n이 사이트가 이 작품을 다루는 방식은 다른 작품들과 다르다. 전일빌딩245·옛 전남도청·상무관은 단순한 '촬영지'가 아니라 실제 학살과 항쟁이 벌어진 역사의 현장이다. 광주시가 공식적으로 조성한 '소년의 길'(5·18 사적지)과 '작가의 길'(한강의 유년기 동네)을 따라가며, 이 사이트는 성지순례나 포토존이 아니라 문학과 역사, 그리고 기억을 잇는 여행으로 이 작품을 소개하려 한다.",
    pinColor:"#5a2a2a",
    summary_en:"Gwangju, May 1980. A novel that follows middle-schooler Dong-ho, who stays behind at Sangmugwan to help identify the dead after losing his friend Jeong-dae, and traces how the survivors carry the weight of what happened for decades afterward. The signature work of 2024 Nobel Prize in Literature winner Han Kang — the real 5·18 historic sites of downtown Gwangju, including the Jeonil Building 245 and the Old Jeonnam Provincial Office, form the novel's actual setting.",
    longSummary_en:"Human Acts isn't a book people return to simply because it's sad. It looks directly at the weight that state violence leaves on a person, a family, a city.\n\nThe novel unfolds through six alternating narrators: Jeong-dae, killed by martial law gunfire; Dong-ho, who dies while helping identify bodies at Sangmugwan; the survivors Eun-sook, Jin-su, and Seon-ju, who each carry that day for the rest of their lives; and finally, a grieving mother. Dong-ho is widely known to be modeled on a real victim, Moon Jae-hak, a 16-year-old first-year student at Gwangju Commercial High School.\n\nThis site treats this work differently from others. The Jeonil Building 245, the Old Jeonnam Provincial Office, and Sangmugwan aren't simply 'filming locations' — they are the real sites of a massacre and an uprising. Following Gwangju's official 'Boy's Path' (5·18 historic sites) and 'Author's Path' (Han Kang's childhood neighborhood), this site tries to present the work as a journey connecting literature, history, and memory — not a pilgrimage of photo spots.",
    communityNote:"2024년 한강의 노벨문학상 수상 이후, 이 소설은 국내외에서 다시 폭넓게 읽히고 있다. 광주시는 2025년부터 '소년의 길·작가의 길' 문학기행 프로그램을 공식 운영하며, 5·18 역사와 문학적 정서를 함께 전하는 코스로 소개하고 있다. 문재학의 어머니가 언론 인터뷰에서 아들과 소설에 대해 이야기한 것도 이 시기 화제가 됐다.",
    communityNote_en:"Since Han Kang's 2024 Nobel Prize win, the novel has been read widely again both in Korea and abroad. Since 2025, the city of Gwangju has officially run the 'Boy's Path / Author's Path' literary tour program, combining 5·18 history with the novel's literary resonance. Moon Jae-hak's mother speaking to the press about her son and the novel also drew attention around this time.",
    hookBadge:"2024 노벨문학상 · 한강 · 광주 5·18 사적지", hookTagline:"소설 속 그 자리, 지금도 그대로 남아 있다",
    discoveryHook:[
      "《소년이 온다》를 읽고 나면, 이 이야기가 어디에서 벌어졌는지 자연스럽게 찾아보게 된다.",
      "이 소설은 한 사람의 이야기가 아니라 여섯 명의 목소리로 이루어져 있다. 계엄군의 총에 죽은 정대, 상무관에서 시신을 수습하다 목숨을 잃은 동호, 그리고 살아남았지만 평생 그날을 짊어져야 했던 은숙·진수·선주, 마지막으로 아들을 잃은 어머니까지.",
      "소설 속 동호가 시신을 수습하던 상무관은 지어낸 공간이 아니다. 지금 광주 옛 전남도청 복원 공간 안에, 5·18민주화운동기록관 5관이라는 이름으로 남아 있다.",
      "동호라는 인물은 실존 인물 문재학을 모티브로 한 것으로 알려져 있다. 사건 당시 열여섯 살, 광주상업고등학교 1학년이었다.",
      "소설은 동호가 5월 27일 새벽 도청 진압 과정에서 세상을 떠나는 것을 감추지 않는다. 가족의 만류에도 그는 자리를 지켰고, 그것이 그의 마지막이었다.",
      "살아남은 이들의 이야기도 소설은 피하지 않는다. 은숙은 훗날 출판사에서 검열과 싸우며 그날의 기억을 안고 살아간다. 진수는 구금과 고문에서 살아남지만 죄책감을 이기지 못하고 스스로 생을 마감한다. 선주는 인권운동에 투신하지만, 자신이 겪은 고문의 후유증에서 끝내 자유롭지 못하다.",
      "처음 이 소설을 읽었을 때는 이 인물들의 이후 삶이 왜 이렇게까지 자세히 그려지는지 잘 이해하지 못했다. 다시 읽고 나서야 알았다 — 이 소설이 하려는 이야기는 '그날 무슨 일이 있었는가'만이 아니라 '그 이후 몇십 년을 사람들이 어떻게 살아냈는가'라는 걸.",
      "소설에서 여러 차례 암시되는 헬기 사격 — 오랫동안 부인되어 온 그 주장을 뒷받침하는 물증이 실제로 남아 있다는 사실도 찾아보며 알게 됐다. 전일빌딩에서 2016~2017년 국립과학수사연구원 조사로 확인된 총탄 흔적이 245개. 건물의 새 이름 '전일빌딩245'는 여기서 나왔다.",
      "국립5·18민주묘지와 옛 망월동 묘지(구묘역)가 서로 다른 곳이라는 사실도 새삼 알게 됐다. 1997년 새 국립묘지가 조성되며 유해 대부분이 옮겨졌지만, 원래의 묘역은 지금도 별도로 남아 있다.",
      "광주시는 2025년부터 이 소설의 배경을 '소년의 길'(5·18 사적지)과 '작가의 길'(한강이 실제로 자랐던 동네)로 나눠 공식 문학기행 코스로 조성해왔다.",
      "정작 작가 자신은 항쟁이 일어나기 전 이미 서울로 이주해 그 자리에 없었다는 사실도, 알고 나면 이 소설을 쓴 이유를 다시 생각하게 만든다. 겪지 않은 일을 이렇게까지 정확하게, 이렇게까지 오래 붙들고 쓴다는 것이 무엇을 의미하는지에 대해서.",
      "2024년 한강이 노벨문학상을 받은 뒤, 문재학의 어머니가 언론 인터뷰에서 아들과 이 소설에 대해 이야기한 것도 그맘때 다시 회자됐다.",
      "이 사이트는 이 여정을 성지순례나 포토존으로 소개하지 않는다. 실제로 학살과 항쟁이 있었던 자리를 걷는 일이기 때문이다.",
      "소설을 읽고 광주를 걷는다는 것은, 그 자리에서 있었던 일과 그 이후 오랫동안 이어진 침묵, 그리고 지금 남아 있는 기록을 함께 마주하는 일에 가깝다. 마지막 책장을 덮고도 동호 어머니가 끝내 놓지 못한 것이 무엇인지는, 이 소설을 직접 읽는 사람만이 알 수 있을 것 같다."
    ],
    hookReveals:[
      { label:"상무관 → 지금의 5·18민주화운동기록관 5관", label_en:"Sangmugwan → today's 5·18 Archives, Exhibition Hall 5", locId:"sangmugwan" },
      { label:"동호 → 실존 인물 문재학(당시 16세)을 모티브로 함", label_en:"Dong-ho → modeled on real victim Moon Jae-hak, then 16", locId:"oldprovincialoffice" },
      { label:"전일빌딩245 → 이름의 유래가 된 245개의 총탄 흔적", label_en:"Jeonil Building 245 → named for its 245 confirmed bullet marks", locId:"jeonil245" },
      { label:"국립5·18민주묘지 ≠ 옛 망월동 묘지 — 서로 다른 곳", label_en:"National 5·18 Cemetery ≠ Old Mangwol-dong Cemetery — two separate sites", locId:"oldmangwoldong" }
    ],
    hookBadge_en:"2024 Nobel Prize in Literature · Han Kang · Gwangju's 5·18 Historic Sites",
    hookTagline_en:"The places in the novel are still standing",
    discoveryHook_en:[
      "After reading Human Acts, you naturally find yourself looking up where this story actually took place.",
      "The novel isn't told by one person, but through six alternating voices: Jeong-dae, shot dead by martial law soldiers; Dong-ho, who dies helping identify the bodies at Sangmugwan; the survivors Eun-sook, Jin-su, and Seon-ju, each carrying that day for the rest of their lives; and finally, a mother who has lost her son.",
      "Sangmugwan, where Dong-ho helps identify the dead in the novel, isn't an invented space. It still stands today, inside the restored Old Jeonnam Provincial Office complex, as Exhibition Hall 5 of the 5·18 Archives.",
      "Dong-ho is widely known to be modeled on a real victim, Moon Jae-hak — sixteen years old at the time, a first-year student at Gwangju Commercial High School.",
      "The novel doesn't shy away from the fact that Dong-ho dies in the early hours of May 27, during the crackdown on the Provincial Office. His family begged him to leave. He stayed anyway, and that was the end for him.",
      "Nor does it look away from what happens to the survivors. Eun-sook goes on to fight censorship at a publishing house, carrying the memory of that day with her. Jin-su survives detention and torture but is undone by guilt and takes his own life. Seon-ju devotes herself to human rights work but is never fully free of what the torture left behind.",
      "The first time I read this novel, I didn't fully understand why it spends so much time on what happens to these people afterward. Reading it again, I understood: the story it's telling isn't only 'what happened that day,' but 'how people went on living for decades after.'",
      "The novel alludes several times to helicopter gunfire — a claim long denied. Looking into it, I learned that physical evidence for it still exists. A 2016-2017 forensic investigation confirmed 245 bullet marks on the Jeonil Building; that's where the building's current name, 'Jeonil Building 245,' comes from.",
      "I also learned that the National 5·18 Cemetery and the old Mangwol-dong cemetery are two different places. When the new national cemetery was built in 1997, most of the remains were relocated there, but the original burial ground still exists separately.",
      "Since 2025, the city of Gwangju has divided the novel's settings into two official literary walking routes: the 'Boy's Path' (5·18 historic sites) and the 'Author's Path' (the neighborhood where Han Kang actually grew up).",
      "Knowing that the author herself had already moved to Seoul before the uprising happened — and wasn't there — makes you reconsider why she carried this story regardless, and what it means to hold onto something you didn't personally experience, this precisely and for this long.",
      "After Han Kang won the Nobel Prize in 2024, Moon Jae-hak's mother speaking to the press about her son and this novel drew renewed attention around the same time.",
      "This site doesn't present this journey as a pilgrimage or a photo tour. It's a walk through ground where a massacre and an uprising actually happened.",
      "Reading the novel and walking through Gwangju is closer to facing, together, what happened there, the long silence that followed, and the record that remains today. What Dong-ho's mother never manages to let go of, even after the last page — that's something only a reader of the novel itself can really know."
    ],
    hookBadge_ja:"2024年ノーベル文学賞 · ハン・ガン · 光州5・18史跡",
    hookTagline_ja:"小説の舞台は、今もそのまま残っている",
    discoveryHook_ja:[
      "『少年が来る』を読み終えると、この物語がどこで起きたのかを自然と調べたくなる。",
      "この小説は一人の物語ではなく、六人の声によって成り立っている。戒厳軍の銃弾に倒れたジョンデ、尚武館で遺体の収拾を手伝いながら命を落としたドンホ、そして生き延びながらも生涯その日を背負い続けたウンスク・ジンス・ソンジュ、最後に息子を失った母。",
      "小説の中でドンホが遺体の身元確認を手伝う尚武館は、架空の場所ではない。今も光州の旧全羅南道庁舎の復元空間の中に、5・18民主化運動記録館第5館として残っている。",
      "ドンホという人物は、実在した文在鶴(ムン・ジェハク)をモデルにしたと広く知られている。当時16歳、光州商業高校1年生だった。",
      "小説は、ドンホが5月27日未明の道庁鎮圧の過程で命を落とすことを隠さない。家族の制止にもかかわらず彼はその場を離れず、それが彼の最期になった。",
      "生き延びた人々のその後からも、この小説は目をそらさない。ウンスクはのちに出版社で検閲と闘いながら、あの日の記憶を抱えて生きていく。ジンスは拘禁と拷問を生き延びるが、罪悪感に耐えきれず自ら命を絶つ。ソンジュは人権運動に身を投じるが、自身が受けた拷問の後遺症から最後まで自由になれない。",
      "最初にこの小説を読んだとき、なぜここまで丁寧にこの人たちのその後が描かれるのか、正直よく分からなかった。読み返してみて分かった — この小説が語ろうとしているのは「あの日何が起きたか」だけでなく、「その後の数十年を人々がどう生き抜いたか」なのだと。",
      "小説の中で繰り返しほのめかされるヘリコプターからの銃撃 — 長く否定され続けてきたその主張を裏付ける物的証拠が実際に残っていることも、調べていて知った。全日ビルで2016~2017年の国立科学捜査研究院の調査により確認された銃弾の跡は245個。建物の新しい名前「全日ビル245」はここから来ている。",
      "国立5・18民主墓地と旧望月洞墓地(旧墓域)が別の場所だということも、あらためて知った。1997年に新しい国立墓地が造成され、遺骸の大半が移されたが、元の墓域は今も別に残っている。",
      "光州市は2025年から、この小説の舞台を「少年の道」(5・18史跡)と「作家の道」(ハン・ガンが実際に育った町)に分けて、公式の文学紀行コースとして整備してきた。",
      "作家自身は蜂起が起きる前にすでにソウルへ移り住み、その場にいなかったという事実も、知ってみるとこの小説を書いた理由をあらためて考えさせる。自分が経験しなかったことを、これほど正確に、これほど長く手放さずに書き続けるとはどういうことなのか。",
      "2024年にハン・ガンがノーベル文学賞を受賞した後、文在鶴の母が息子とこの小説について語ったインタビューも、その頃再び話題になった。",
      "このサイトは、この旅を聖地巡礼やフォトスポットとしては紹介しない。実際に虐殺と抗争があった場所を歩くことだからだ。",
      "小説を読んで光州を歩くということは、その場所であったことと、その後長く続いた沈黙と、そして今残されている記録を、共に見つめることに近い。最後のページを閉じてもなお、ドンホの母が手放せずにいるものが何なのか — それはこの小説を実際に読んだ人だけが知ることができるのだと思う。"
    ],
    contentSummary:{ sections:[
      { heading:"1980년 5월, 상무관", bullets:[
        "친구 정대가 계엄군의 총에 맞아 숨진 뒤, 중학생 동호는 상무관에 남아 시신을 수습하고 신원을 확인하는 일을 돕는다",
        "가족의 만류에도 동호는 자리를 지키다, 5월 27일 새벽 도청 진압 과정에서 목숨을 잃는다"
      ]},
      { heading:"살아남은 이들의 시간", bullets:[
        "은숙은 훗날 출판사에서 검열과 싸우며, 상무관에서의 기억을 안고 살아간다",
        "진수는 구금·고문에서 살아남지만 죄책감을 이기지 못하고 스스로 생을 마감한다",
        "선주는 인권운동에 투신하지만, 자신이 겪은 고문의 후유증에서 자유롭지 못하다"
      ]},
      { heading:"기억을 잇는 도시, 광주", bullets:[
        "전일빌딩245에서 확인된 245개의 총탄 흔적은 오랫동안 부인되어온 헬기 사격의 물증이 됐다",
        "광주시는 '소년의 길'(5·18 사적지)과 '작가의 길'(한강의 유년기 동네)을 공식 문학기행 코스로 조성했다"
      ]}
    ], endingNote:"동호의 어머니가 오랜 세월이 지나서도 놓지 못하는 것이 무엇인지는, 소설을 직접 읽고 확인해 주세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Korea-Gwangju-The_former_South_Jeolla_provincial_office_building-01.jpg", credit:"옛 전남도청, 광주(소설의 실질적 배경이 된 5·18 사적지) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/Category:Old_Provincial_Government_Main_Building_of_Jeollanam-do_in_Gwangju" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%86%8C%EB%85%84%EC%9D%B4_%EC%98%A8%EB%8B%A4" },
  { id:"priests", title:"검은 사제들 (The Priests)", author:"장재현 감독", type:"film", country:"korea", medium:"film", genres:["thriller","horror"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 기획자 제안(2026-08): 대구 근대골목 지역을 알리기 위해 선정 — 계산성당이 SBS뉴스 인터뷰로 확인된
    //   공식 실제 촬영지. 검은 사제들·리틀 포레스트 2개 작품으로 대구(성당·근대골목 vs 자연·힐링)를
    //   서로 다른 색깔로 소개한다.
    era:"2015년 개봉", title_en:"The Priests", author_en:"Directed by Jang Jae-hyun", era_en:"Released 2015",
    summary:"혼수상태에 빠진 소녀 영신이 악령에 씌었다고 확신한 김범신 신부가, 신학생 최부제를 조수로 끌어들여 비공식 구마 의식을 벌이는 오컬트 스릴러. 대구 계산성당·동성로 등 근대골목 일대가 실제 촬영지다.",
    longSummary:"'검은 사제들'이 흥미로운 건 한국 영화가 좀처럼 다루지 않던 구마 의식이라는 소재를, 화려한 공포 연출보다 절제된 종교적 절차로 그려냈다는 점이다.\n\n김윤석의 김범신 신부와 강동원의 최부제, 그리고 이 작품으로 백상예술대상 신인여우상을 받은 박소담의 영신까지, 세 인물의 밀도 있는 연기가 영화를 지탱한다.\n\n촬영지를 따라가 보는 재미도 크다. 극 중 배경은 서울이지만, 실제로는 대구 계산성당이 명동성당과 교차 편집되어 등장한다. 감독 장재현이 직접 인터뷰에서 밝혔듯, 대구의 근대골목(계산성당·동성로·근대 캠퍼스들)이 영화 곳곳에 스며 있다. 계산성당은 1902년 지어진 한국 세 번째 고딕양식 성당으로, 그 자체로도 방문할 가치가 있는 실존 문화유산이다.",
    pinColor:"#2b2b3a",
    summary_en:"Father Kim Beom-shin, convinced the comatose girl Young-shin is possessed, recruits seminarian Choi Jun-ho to help him perform an unofficial exorcism — an occult thriller anchored in Daegu's Gyesan Cathedral and the Dongseong-ro modern-culture district.",
    longSummary_en:"What makes The Priests interesting is how it treats a subject rarely tackled in Korean film — the Catholic rite of exorcism — with restrained religious procedure rather than flashy horror spectacle.\n\nKim Yoon-seok as Father Kim, Kang Dong-won as Deacon Choi, and Park So-dam (who won a Baeksang Best New Actress award for this role) as Young-shin carry the film with dense, controlled performances.\n\nTracing the filming locations adds its own pleasure. The story is set in Seoul, but Daegu's Gyesan Cathedral is actually intercut with Myeongdong Cathedral on screen. As director Jang Jae-hyun confirmed directly in interviews, Daegu's historic 'Modern Alley' district — Gyesan Cathedral, Dongseong-ro, and its older campuses — runs throughout the film. Gyesan Cathedral itself, a Gothic cathedral built in 1902, is a genuine heritage site worth visiting in its own right.",
    communityNote:"검은 사제들은 2015년 11월 개봉해 누적 관객 약 544만 명을 기록했고, 박소담이 이 작품으로 여러 시상식에서 신인상을 받으며 본격적으로 주목받기 시작했다. 2025년 공개된 공식 후속작 '검은 수녀들'에서 강동원의 최부제가 카메오로 다시 등장해, 두 작품이 '12형상' 세계관으로 이어져 있음이 확인됐다.",
    communityNote_en:"The Priests opened in November 2015 and drew about 5.44 million admissions; Park So-dam won several new-actress awards for the role, launching her wider career. In the 2025 official sequel Dark Nuns, Kang Dong-won's Deacon Choi reappears in a cameo, confirming the two films share a connected '12 Shapes' mythology.",
    hookBadge:"김윤석 × 강동원 × 박소담 · 오컬트 스릴러 · 촬영지 & 숨은 이야기", hookTagline:"그 명동성당, 사실 대구였다",
    discoveryHook:[
      "<검은 사제들> 보고 나면 그 명동성당 장면이 자꾸 떠오른다.",
      "근데 찾아보니 그 성당, 서울이 아니었다.",
      "항공 촬영이랑 실내 장면 상당수는 대구 계산성당에서 찍었다. 명동성당이랑 외관이 비슷해서, 영화 속에서는 두 성당 장면을 교차 편집해 하나의 '명동성당'으로 만들었다고 감독이 직접 인터뷰에서 밝혔다.",
      "최부제가 걸어 들어가던 그 좁은 골목도 마찬가지다. 대구 동성로 골목이랑 서울 명동8길 골목을 섞어 붙인 장면이다.",
      "계산성당은 세트가 아니라 진짜다. 1902~1903년에 지어진, 한국에서 세 번째로 오래된 고딕양식 성당. 지금도 실제로 미사가 열리는 곳이다.",
      "영화 이야기를 좀 더 해보자면, 시작은 교통사고 후유증으로 혼수상태에 빠진 고등학생 영신이다. 김범신 신부는 이걸 그냥 병이 아니라 강력한 악령이 씐 상태라고 확신하고, 정식 허가도 없이 비공식 구마 의식을 준비한다.",
      "그가 조수로 끌어들이는 신학생 최준호에게도 사연이 있다. 어릴 적 여동생을 잃은 트라우마를 안고 있는 인물인데, 이게 나중에 그가 의식을 두려워하고, 도망쳤다가 다시 돌아오는 이유와 맞물린다.",
      "사실 두 사제가 나서기 전에 먼저 시도된 방법이 따로 있다. 전통 무속의 대살굿. 근데 이게 실패로 끝나면서, 결국 두 사제만 남아 최후의 구마 의식을 준비하게 된다.",
      "그 마지막 밤 장면의 배경이 바로 계산성당(극 중 명동성당)이다. 밤새 이어지는 위험한 의식을, 백 년 넘은 진짜 성당 안에서 찍었다는 걸 알고 나면 그 공기감이 다르게 느껴진다.",
      "영화가 끝나도 이 이야기는 끝난 게 아니다. 2025년 공식 후속작 <검은 수녀들>에 강동원의 최부제가 카메오로 다시 등장하면서, 두 영화가 같은 세계관('12형상')으로 이어져 있다는 게 확인됐다.",
      "배우들 얘기도 빼놓을 수 없다. 김윤석의 김범신, 강동원의 최부제, 그리고 이 작품으로 백상예술대상 신인여우상을 받은 박소담의 영신까지 — 세 사람의 밀도 있는 연기가 영화를 끝까지 끌고 간다.",
      "어두운 구마 의식의 배경이 사실은 백 년 넘은 진짜 성당이라는 걸 알고 나면, 다시 볼 때 그 공기가 조금 다르게 느껴진다.",
      "대구 계산성당, 해 진 뒤 조명 받은 첨탑을 보러 가는 것만으로도 이 영화의 분위기를 실제로 느껴볼 수 있다.",
      "최준호가 마지막에 어떤 선택을 내리는지까지는 여기서 다 풀지 않으려 한다 — 다만 그 선택이 벌어지는 공간이 세트가 아니라 진짜 백 년 된 성당이었다는 것만 알고 봐도, 영화가 완전히 다르게 다가온다."
    ],
    hookReveals:[
      { label:"영화 속 '명동성당' → 실제로는 대구 계산성당과 교차 편집", label_en:"'Myeongdong Cathedral' on screen → actually intercut with Daegu's Gyesan Cathedral", locId:"gyesancathedral" },
      { label:"최부제가 걷던 골목 → 대구 동성로 + 서울 명동8길 교차 편집", label_en:"Deacon Choi's alley → Daegu's Dongseong-ro cut together with Seoul's Myeongdong 8-gil", locId:"dongseongro" },
      { label:"영신의 밝은 회상 장면 → 대구 월배성당에서 실제 촬영", label_en:"Young-shin's bright flashback → really filmed at Wolbae Church, Daegu", locId:"wolbaechurch" },
      { label:"검은 수녀들(2025) → 같은 세계관의 공식 후속작으로 확인", label_en:"Dark Nuns (2025) → confirmed as an official sequel in the same universe", locId:null }
    ],
    hookBadge_en:"Kim Yoon-seok × Kang Dong-won × Park So-dam · Occult thriller · Filming locations & behind-the-scenes",
    hookTagline_en:"That 'Myeongdong Cathedral' was actually in Daegu",
    discoveryHook_en:[
      "After The Priests, that Myeongdong Cathedral scene keeps coming back to me.",
      "Turns out that cathedral wasn't in Seoul.",
      "Much of the aerial footage and interior scenes were actually filmed at Gyesan Cathedral in Daegu. Because its exterior resembles Myeongdong Cathedral, the film intercuts footage from both to form a single on-screen 'Myeongdong Cathedral' — the director confirmed this directly in an interview.",
      "The narrow alley Deacon Choi walks through is the same trick — Daegu's Dongseong-ro alley, cut together with a Myeongdong-8-gil alley in Seoul.",
      "Gyesan Cathedral itself isn't a set, though — it's the real thing. Built in 1902-1903, Korea's third Gothic cathedral, and mass is still held there today.",
      "As for the story itself: it starts with Young-shin, a high schooler left comatose after a car accident. Father Kim becomes convinced this isn't just a medical condition but a case of severe possession, and starts preparing an unofficial exorcism without any formal church approval.",
      "The seminarian he recruits, Choi Jun-ho, has his own backstory — a childhood trauma of losing his younger sister, which later ties directly into why he flees the ritual in fear and then comes back.",
      "Before the two priests even step in, there's actually another attempt first: a traditional shamanic ritual called daesalgut. It fails, leaving the two priests alone to prepare the final exorcism.",
      "That last night takes place at Gyesan Cathedral, standing in for 'Myeongdong Cathedral' onscreen. Knowing that this dangerous, all-night ritual was filmed inside a real, century-old cathedral changes the way the scene feels.",
      "The story doesn't end with the film, either. In the 2025 official sequel Dark Nuns, Kang Dong-won's Deacon Choi reappears in a cameo, confirming the two films share the same '12 Shapes' mythology.",
      "The cast deserves its own mention too — Kim Yoon-seok as Father Kim, Kang Dong-won as Deacon Choi, and Park So-dam (who won a Baeksang Best New Actress award for this role) as Young-shin. Their dense, controlled performances carry the film all the way through.",
      "Knowing the dark exorcism scenes were shot in a real, century-old cathedral changes the air of the film a little on a rewatch.",
      "Just going to see Gyesan Cathedral's lit-up spires after dark is enough to actually feel the film's atmosphere in person.",
      "I won't spell out exactly what choice Choi Jun-ho makes at the very end here — but just knowing the room where it happens wasn't a set, but a real hundred-year-old cathedral, is enough to make the film hit completely differently."
    ],
    hookBadge_ja:"キム・ユンソク×カン・ドンウォン×パク・ソダム · オカルトスリラー · 撮影地&裏話",
    hookTagline_ja:"あの明洞聖堂、実は大邱だった",
    discoveryHook_ja:[
      "『黒い司祭たち』を見終わると、あの明洞聖堂のシーンがふと頭に浮かぶ。",
      "でも調べてみると、あの聖堂、ソウルじゃなかった。",
      "空撮や室内シーンの多くは、大邱の桂山聖堂で撮影されていた。明洞聖堂と外観が似ているため、映画の中では二つの聖堂の映像を交差編集して一つの「明洞聖堂」に仕上げたと、監督自身がインタビューで明かしている。",
      "チェ副祭が歩いて入っていくあの狭い路地も同じだ。大邱の東城路の路地と、ソウルの明洞8ギルの路地をつなぎ合わせたシーンだった。",
      "桂山聖堂はセットではなく本物だ。1902~1903年に建てられた、韓国で三番目に古いゴシック様式の聖堂。今も実際にミサが行われている。",
      "物語そのものについても少し触れておくと、始まりは交通事故の後遺症で昏睡状態に陥った女子高生ヨンシンだ。キム・ボムシン神父は、これを単なる病気ではなく強力な悪霊による憑依だと確信し、正式な許可もないまま非公式の悪魔祓いを準備し始める。",
      "彼が助手として引き込む神学生チェ・ジュノにも事情がある。幼い頃に妹を失ったトラウマを抱えた人物で、これがのちに彼が儀式を恐れて逃げ出し、また戻ってくる理由と重なっていく。",
      "実は二人の司祭が動く前に、別の方法がすでに試みられている。伝統的な巫俗の大殺クッだ。だがこれが失敗に終わり、結局二人の司祭だけが残されて最後の悪魔祓いを準備することになる。",
      "その最後の夜のシーンの舞台が、まさに桂山聖堂(劇中の明洞聖堂)だ。夜通し続く危険な儀式を、百年以上前に建てられた本物の聖堂の中で撮影したと知ると、あの空気感が違って感じられる。",
      "映画が終わっても、この話は終わっていない。2025年の公式続編『ブラック・シスターズ』にカン・ドンウォンのチェ副祭がカメオ出演し、二つの映画が同じ世界観(「12の形象」)でつながっていることが確認された。",
      "キャストについても触れないわけにいかない。キム・ユンソクのキム・ボムシン、カン・ドンウォンのチェ副祭、そしてこの作品で百想芸術大賞新人女優賞を受賞したパク・ソダムのヨンシン — 三人の濃密な演技が映画を最後まで牽引する。",
      "暗い悪魔祓いの背景が、実は百年以上前に建てられた本物の聖堂だと知ると、見返したときの空気が少し違って感じられる。",
      "大邱の桂山聖堂、日が沈んだ後にライトアップされた尖塔を見に行くだけでも、この映画の雰囲気を実際に感じることができる。",
      "チェ・ジュノが最後にどんな選択をするのかは、ここでは全部明かさないでおく — ただ、その選択が行われる場所がセットではなく、本物の百年前の聖堂だったと知っているだけで、映画の見え方はまったく変わってくる。"
    ],
    contentSummary:{ sections:[
      { heading:"혼수상태의 소녀", bullets:[
        "교통사고 후유증으로 혼수상태에 빠진 고등학생 영신을 지켜보던 김범신 신부는 강력한 악령에 씌었다고 확신한다",
        "교단의 정식 허가 대신 비공식 경로로 구마 의식을 준비하며, 신학생 최준호를 조수로 끌어들인다"
      ]},
      { heading:"두려움과 결심 사이", bullets:[
        "어릴 적 여동생을 잃은 트라우마를 지닌 최준호는 의식 도중 두려움에 도망쳤다가 다시 돌아온다",
        "먼저 시도됐던 전통 무속 대살굿이 실패로 끝나며, 두 사제만 남아 최후의 의식을 준비한다"
      ]},
      { heading:"구마 의식의 밤", bullets:[
        "계산성당(극 중 명동성당)을 배경으로 두 사제가 밤새 위험한 구마 의식을 이어간다",
        "결말이 어떻게 마무리되는지, 그리고 최준호가 어떤 선택을 하는지는 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"최준호가 겪는 마지막 시험과 그 결말은 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/%EB%8C%80%EA%B5%AC_%EA%B3%84%EC%82%B0%EC%84%B1%EB%8B%B9.jpg", credit:"계산성당, 대구(영화 속 명동성당 실제 촬영지) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/Category:Gyesan_Cathedral" },
    posterPage:"https://en.wikipedia.org/wiki/The_Priests_(film)" },
  { id:"littleforest", title:"리틀 포레스트 (Little Forest)", author:"임순례 감독 · 원작 이가라시 다이스케", type:"film", country:"korea", medium:"film", genres:["drama"],
    lang:"ko", // 한국 작품 — 일본어 태그/야후재팬 등 일본향 SNS 검색을 적용하지 않고, 한국어 태그·한국 SNS를 우선한다.
    // ※ 기획자 제안(2026-08): 대구 군위군 '혜원의 집'이 대구관광공사·군위 시티투어 공식 코스에 포함된
    //   실제 상설 개방 촬영지. 검은 사제들(성당·도심)과 대비되는 자연·음식·힐링 색깔로 대구를 소개한다.
    era:"2018년 개봉", title_en:"Little Forest", author_en:"Directed by Yim Soon-rye · Based on the manga by Daisuke Igarashi", era_en:"Released 2018",
    summary:"임용고시에 낙방하고 서울살이에 지친 혜원이 고향으로 내려와, 소꿉친구들과 함께 사계절 제철 음식을 해 먹으며 삶의 방향을 되찾아가는 힐링 드라마. 대구 군위군 '혜원의 집'은 촬영 후에도 상설 개방되는 실제 공간이다.",
    longSummary:"'리틀 포레스트'는 특정 사건이 아니라 계절이 흘러가는 속도로 이야기를 만든다. 배춧국에서 아카시아꽃튀김으로, 오이콩국수에서 밤조림으로 이어지는 제철 음식이 곧 챕터가 된다.\n\n일본 만화가 이가라시 다이스케의 원작을 임순례 감독이 한국적으로 다시 그려낸 작품으로, 2015년 공개된 일본판 영화의 속편이 아니라 별도의 리메이크다.\n\n이 영화가 특별한 건 촬영이 끝난 뒤에도 세트가 그대로 남아 있다는 점이다. 대구 군위군 우보면의 '혜원의 집'은 대청마루·부엌·장독대·텃밭까지 극중 모습을 고스란히 간직한 채 무료로 상설 개방되고 있다. 2023년 군위군이 대구광역시로 편입되면서, 대구시가 공식 '군위 시티투어'에 이 집을 정식 코스로 포함시켰다.",
    pinColor:"#4a7c3a",
    summary_en:"Hye-won, worn out from failing a teaching exam and city life, returns to her hometown and slowly finds her footing again by cooking seasonal dishes with her childhood friends. 'Hye-won's House' in Gunwi, Daegu remains open to visitors as a real, preserved filming location.",
    longSummary_en:"Little Forest builds its story around the pace of the seasons rather than any single event. Napa cabbage soup gives way to fried acacia blossoms, cold cucumber noodles to candied chestnuts — each seasonal dish becomes its own chapter.\n\nDirector Yim Soon-rye reimagined Daisuke Igarashi's Japanese manga in a Korean setting; the film is a separate remake, not a sequel to the 2015 Japanese film adaptation.\n\nWhat makes it special is that the set was never torn down after filming wrapped. 'Hye-won's House' in Ubo-myeon, Gunwi, Daegu still preserves the wooden floor, kitchen, jars, and garden from the film, and remains open to visitors free of charge. After Gunwi County was incorporated into Daegu in 2023, the city officially added the house to its Gunwi City Tour route.",
    communityNote:"리틀 포레스트는 2018년 개봉 당시 손익분기점을 일주일 만에 넘기며 역주행 흥행에 성공했고, 여러 매체에서 '2018년 최고의 한국영화'로 꼽혔다. 개봉 이후 대구 군위군은 '혜원의 집'을 지역 대표 관광자원으로 삼아, 화본역·한밤마을 등 인근 명소와 묶은 여행 코스를 꾸준히 홍보하고 있다.",
    communityNote_en:"Little Forest crossed its break-even point within a week of its 2018 release and went on to be named one of the best Korean films of the year by several outlets. Since then, Gunwi County has promoted 'Hye-won's House' as a signature local attraction, pairing it with nearby sites like Hwabon Station and Hanbam Village.",
    hookBadge:"임순례 감독 · 힐링 드라마 · 지금도 갈 수 있는 '혜원의 집'", hookTagline:"그 집, 촬영 끝나고도 그대로 있다",
    discoveryHook:[
      "<리틀 포레스트> 보고 나면 이상하게 배가 고파지면서 어딘가로 내려가고 싶어진다.",
      "혜원이 살던 그 집, 세트라길래 촬영 끝나면 헐렸겠거니 했다.",
      "근데 안 헐렸다. 대구 군위군 우보면에 지금도 그대로 있다. 대청마루도, 부엌도, 장독대도, 심지어 자전거까지 극중 모습 그대로.",
      "게다가 무료로, 상시 개방 중이다. 2023년부터는 아예 대구시 공식 '군위 시티투어' 코스에 정식으로 들어갔다.",
      "화본역 앞에서 혜원이랑 은숙이 아이스크림 먹던 그 구멍가게도 진짜다. 50년 넘게 장사해온 가게가 지금도 그 자리에 그대로 있다.",
      "이 작품, 일본 만화가 원작이지만 2015년 나온 일본판 영화의 속편이 아니라 아예 새로 찍은 한국판 리메이크라는 것도 이번에 알았다.",
      "영화 얘기를 좀 더 해보면, 이 영화는 사실 특별한 사건으로 굴러가는 이야기가 아니다. 임용고시에 낙방한 혜원이 서울살이를 정리하고 고향으로 내려오는 것으로 시작해서, 그냥 계절을 나는 게 전부다.",
      "대신 그 자리를 채우는 게 엄마다. 혜원은 말없이 집을 떠난 엄마의 기억을 요리를 통해 하나씩 되살려낸다. 배추국, 아카시아꽃튀김, 오이콩국수, 밤조림 — 음식 하나마다 엄마와의 기억이 겹쳐 있다.",
      "개인적으로 좋았던 건 이 영화가 엄마가 왜 떠났는지를 시원하게 설명해주지 않는다는 점이다. 대신 혜원이 그 음식들을 하나씩 만들어보면서 조금씩 이해하게 되는 과정 자체를 보여준다.",
      "소꿉친구 재하·은숙 얘기도 빼놓을 수 없다. 영화는 이 둘도 각자 나름의 방식으로 삶을 꾸려가는 모습을 담담하게 지켜본다. 혜원의 선택도 결국 이 세 사람이 함께 보내는 시간 속에서 조금씩 만들어진다.",
      "배추국에서 아카시아꽃튀김으로, 다시 오이콩국수로 — 계절이 바뀌는 속도로 이야기가 흘러가는 영화인데, 정작 그 배경들은 지금도 계절마다 그 자리에서 그대로 피고 진다.",
      "감 따는 장면에 나오는 돌담마을도 실제 장소다. 군위 한밤마을인데, 영화에 나온 그 돌담이 지금도 그대로 남아 있다.",
      "혜원이 마지막에 도시로 돌아갈지, 고향에 완전히 남을지는 여기서 스포일러하지 않으려 한다. 다만 확실한 건, 그 선택을 하기까지 혜원이 지나온 사계절이 지금 실제로 군위에 가면 똑같이 지나가고 있다는 것.",
      "그러니까 이 영화를 보고 대구, 정확히는 군위로 내려간다면 사진만 찍고 오지 말고 화본역 앞 가게에서 아이스크림 하나 사 먹어보길."
    ],
    hookReveals:[
      { label:"혜원의 집 → 촬영 후 철거 안 하고 지금도 상설 개방", label_en:"Hye-won's House → left standing, still open to visitors today", locId:"hyewonhouse" },
      { label:"화본역 앞 가게 → 50년 넘은 진짜 가게, 지금도 영업 중", label_en:"The shop by Hwabon Station → a real 50-year-old shop, still open", locId:"yeokjeonstore" },
      { label:"리틀 포레스트(2018) → 2015년 일본판의 속편 아닌 한국 리메이크", label_en:"Little Forest (2018) → a Korean remake, not a sequel to the 2015 Japanese film", locId:null },
      { label:"감 따던 돌담마을 → 군위 한밤마을, 지금도 그 담장 그대로", label_en:"The persimmon-picking village → Hanbam Village, Gunwi, walls unchanged", locId:"hanbamvillage" }
    ],
    hookBadge_en:"Director Yim Soon-rye · A healing drama · 'Hye-won's House' is still standing",
    hookTagline_en:"The set was never torn down",
    discoveryHook_en:[
      "After Little Forest, you somehow get hungry and want to go somewhere quiet.",
      "Hye-won's house — I assumed it was a set that got torn down once filming wrapped.",
      "It wasn't. It's still standing in Ubo-myeon, Gunwi, Daegu, exactly as it appears on screen — the wooden floor, the kitchen, the jars, even the bicycle.",
      "And it's free, open year-round. Since 2023 it's even an official stop on Daegu's 'Gunwi City Tour.'",
      "The little shop in front of Hwabon Station, where Hye-won and Eun-sook eat ice cream, is real too — over fifty years in business, still standing in the same spot.",
      "I also learned this film is based on a Japanese manga but isn't a sequel to the 2015 Japanese film adaptation — it's a separate Korean remake, shot from scratch.",
      "As for the story itself, it's really not driven by any single big event. It starts with Hye-won, having failed the teaching exam, giving up on city life and heading home — and from there it's really just the seasons passing.",
      "What fills that space instead is her mother. Hye-won gradually recovers the memory of the mother who left home without a word, one dish at a time — napa cabbage soup, fried acacia blossoms, cold cucumber noodles, candied chestnuts, each one layered with a memory of her.",
      "What I liked most, personally, is that the film never neatly explains why her mother left. Instead, it shows the process itself — Hye-won slowly coming to understand a little more with every dish she makes.",
      "Her childhood friends Jae-ha and Eun-sook matter too. The film quietly follows each of them building a life in their own way, and Hye-won's own choice takes shape gradually, through the time the three of them spend together.",
      "Napa cabbage soup to fried acacia blossoms, cucumber noodles to candied chestnuts — the story moves at the pace of the seasons, and its real backdrops still bloom and fade with those same seasons today.",
      "The stone-walled village from the persimmon-picking scene is real too — Hanbam Village in Gunwi, where the same stone walls from the film are still standing.",
      "I won't spoil here whether Hye-won ultimately goes back to the city or stays home for good. What's certain is that the same four seasons she lives through before making that choice are, right now, passing in exactly the same way if you actually go to Gunwi.",
      "So if this movie sends you down to Daegu, or more specifically Gunwi, don't just take photos — grab an ice cream at the shop in front of Hwabon Station."
    ],
    hookBadge_ja:"イム・スルレ監督 · 癒し系ドラマ · 今も残る「ヘウォンの家」",
    hookTagline_ja:"撮影後も、あの家はそのまま",
    discoveryHook_ja:[
      "『リトル・フォレスト』を見終わると、なぜかお腹が空いて、どこかに帰りたくなる。",
      "ヘウォンが暮らしていたあの家、セットだから撮影が終わったら壊されただろうと思っていた。",
      "でも壊されていなかった。大邱・軍威郡牛甫面に、今もそのまま残っている。板の間も、台所も、甕置き場も、自転車まで劇中の姿のままだ。",
      "しかも無料で、常時公開されている。2023年からは大邱市公式の「軍威シティツアー」の正式コースにも組み込まれた。",
      "花本駅前で、ヘウォンとウンスクがアイスクリームを食べていたあの雑貨店も本物だ。50年以上営業してきた店が、今もそのままそこにある。",
      "この作品、日本の漫画が原作だけれど、2015年に公開された日本版映画の続編ではなく、まったく新しく撮られた韓国版リメイクだということも、今回初めて知った。",
      "物語そのものについても少し触れておくと、この映画は特別な事件で動いていく話ではない。教員採用試験に落ちたヘウォンがソウル暮らしを整理して故郷に帰ってくるところから始まり、あとはただ季節が巡っていくだけだ。",
      "その空白を埋めるのが母の存在だ。ヘウォンは、何も言わずに家を出て行った母の記憶を、料理を通して一つずつよみがえらせていく。白菜スープ、アカシアの花の天ぷら、キュウリの豆乳麺、栗の甘露煮 — どの料理にも母との記憶が重なっている。",
      "個人的に良かったのは、この映画が母がなぜ去ったのかをすっきり説明してくれない点だ。その代わり、ヘウォンがその料理を一つずつ作りながら少しずつ理解していく過程そのものを見せてくれる。",
      "幼なじみのジェハ、ウンスクの話も欠かせない。映画はこの二人もそれぞれのやり方で生きていく姿を、淡々と見つめている。ヘウォン自身の選択も、結局この三人が一緒に過ごす時間の中で少しずつ形作られていく。",
      "白菜スープからアカシアの花の天ぷらへ、キュウリの豆乳麺から栗の甘露煮へ — 季節が移り変わる速さで物語が進む映画なのに、その背景となった場所は今も季節ごとにそのまま花を咲かせている。",
      "柿を収穫するシーンに出てくる石垣の村も実在する。軍威のハンバム村で、映画に出てきたあの石垣が今もそのまま残っている。",
      "ヘウォンが最終的に都市に戻るのか、故郷に完全に残るのかは、ここではネタバレしないでおく。ただ確かなのは、その選択に至るまでヘウォンが過ごした四季が、今実際に軍威に行けば、まったく同じように巡っているということだ。",
      "だからこの映画を見て大邱、正確には軍威まで足を延ばすなら、写真だけ撮って帰らずに、花本駅前の店でアイスクリームをひとつ買ってみてほしい。"
    ],
    contentSummary:{ sections:[
      { heading:"고향으로", bullets:[
        "임용고시에 낙방한 혜원, 서울살이를 정리하고 기약 없이 고향으로 내려온다",
        "비어있던 집에서 홀로 지내며, 직접 밭을 일구고 제철 재료로 음식을 해 먹기 시작한다"
      ]},
      { heading:"사계절, 그리고 친구들", bullets:[
        "겨울 배추국에서 시작해 봄 아카시아꽃튀김, 여름 오이콩국수, 가을 밤조림까지 계절이 흘러간다",
        "소꿉친구 재하·은숙과 다시 가까워지며, 각자 다른 방식으로 삶을 꾸려가는 모습을 지켜본다"
      ]},
      { heading:"엄마의 부재, 그리고 나의 삶", bullets:[
        "말없이 떠난 엄마에 대한 기억이 요리를 통해 조금씩 되살아난다",
        "혜원이 결국 어떤 선택을 내리는지는 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"혜원이 다시 도시로 돌아갈지, 고향에 남을지는 직접 작품을 보고 확인하세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Hwabon_Station%2C_Gunwi_on_March_17th%2C_2019.jpg", credit:"화본역, 대구 군위군(혜원의 집과 함께 리틀 포레스트 여행 코스로 묶이는 실제 간이역) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/Category:Gunwi" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%A6%AC%ED%8B%80_%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8_(2018%EB%85%84_%EC%98%81%ED%99%94)" },
  { id:"isatong", title:"이 사랑 통역 되나요? (Can This Love Be Translated?)", author:"홍자매(홍정은·홍미란) 극본 · Netflix", type:"tv_drama", country:"korea", medium:"tv_drama", genres:["romance","comedy"],
    lang:"ko", // 한국 작품(lang:'ko'라 기본 한자/가나 태그는 생성 안 됨) — 가마쿠라·에노시마 장소는
    // ISATONG_LOCATIONS의 loc.localTag로 현지어(로마자) 태그를 개별 지정해 노출한다(직지의 유럽 장소와 동일 원칙).
    era:"현재(2026년 방영)", title_en:"Can This Love Be Translated?", author_en:"Written by the Hong Sisters (Hong Jung-eun, Hong Mi-ran) · Netflix", era_en:"Present day (aired 2026)",
    title_ja:"恋の通訳、できますか？", author_ja:"ホン姉妹(ホン・ジョンウン、ホン・ミラン)脚本 · Netflix", era_ja:"現在(2026年配信)",
    summary:"6개 언어에 능통한 통역사 주호진이 톱스타 차무희의 통역을 맡게 되며 벌어지는 예측불가 로맨스. 일본 가마쿠라·에노시마에서 시작해 캐나다 앨버타, 이탈리아 토스카나까지 이어지는 3개국 로케이션이 이야기의 무대다.",
    longSummary:"이 드라마를 보고 나면 자연스럽게 궁금해진다. 저 가마쿠라 골목이랑 캐나다 호수, 이탈리아 광장 다 진짜 거기서 찍은 걸까.\n\n답은 절반은 그렇고 절반은 아니다. 가마쿠라·에노시마와 캐나다 앨버타, 이탈리아 토스카나·움브리아는 실제로 그 나라에서 촬영됐다. 그런데 극중 '해외'로 나온 장면 중 상당수는 사실 경기 고양·파주·양평, 강원 속초, 서울 강남·광진 같은 국내 장소에서 찍혔다. 이탈리아 와이너리인 줄 알았던 곳이 파주였고, 캐나다 고급 레스토랑인 줄 알았던 곳이 강남의 한 호텔이었다.\n\n통역사 호진과 톱스타 무희(도라미)가 일본 라멘집 골목에서 처음 만나는 장면부터가 흥미롭다. 무희가 전 남친의 새 여친에게 따지러 뛰어들었다가 일본어가 안 통해 얼어붙자, 그 자리에 있던 호진이 통역으로 끼어들며 인연이 시작된다. 이후 두 사람은 '로맨틱 트립'이라는 글로벌 데이트 예능을 매개로 캐나다와 이탈리아까지 함께 오가게 된다.",
    pinColor:"#d94f70",
    summary_en:"A multilingual interpreter, Ju Ho-jin, is enlisted to interpret for global superstar Cha Moo-hee — sparking an unpredictable romance. The story runs from Kamakura and Enoshima in Japan through Alberta, Canada, to Tuscany, Italy.",
    summary_ja:"6か国語に堪能な通訳者チュ・ホジンが、トップスターのチャ・ムヒの通訳を任されたことから始まる予測不能なロマンス。日本の鎌倉・江の島から始まり、カナダのアルバータ、イタリアのトスカーナへと続く3か国ロケーションが物語の舞台となる。",
    longSummary_en:"After watching this show, you naturally start wondering: were those Kamakura alleys, that Canadian lake, that Italian piazza all really filmed there?\n\nThe answer is half yes, half no. Kamakura/Enoshima, Alberta, and Tuscany/Umbria were genuinely filmed on location in those countries. But a surprising number of scenes set 'abroad' were actually filmed in Korea — Goyang, Paju, and Yangpyeong in Gyeonggi, Sokcho in Gangwon, and Gangnam and Gwangjin in Seoul. What looked like an Italian winery was really in Paju; what looked like a fancy Canadian restaurant was really a hotel in Gangnam.\n\nEven the way interpreter Ho-jin and top star Mu-hee (aka Dorami) first meet is a fun detail — in a ramen-shop alley in Japan, when Mu-hee bursts in to confront her ex's new girlfriend, freezes because she can't speak Japanese, and Ho-jin, who happens to be there, steps in as her interpreter. From there, a global dating show called 'Romantic Trip' carries the two of them on through Canada and Italy together.",
    communityNote:"2026년 1월 16일 넷플릭스에서 공개돼 비영어권 TV쇼 부문 1위에 오른 작품으로, 김선호·고윤정·후쿠시 소타가 주연을 맡았다. <미남이시네요>·<호텔 델루나>·<환혼> 등을 쓴 홍자매(홍정은·홍미란)의 신작이다. 12부작.",
    communityNote_en:"Released on Netflix on January 16, 2026, it topped the platform's non-English TV chart, starring Kim Seon-ho, Go Youn-jung, and Sota Fukushi. It's the newest work from the Hong Sisters (Hong Jung-eun, Hong Mi-ran), known for My Girlfriend Is a Gumiho, Hotel del Luna, and Alchemy of Souls. 12 episodes.",
    hookBadge:"Netflix · 이 사랑 통역 되나요? · 가마쿠라·에노시마 실제 촬영지", hookTagline:"둘이 처음 만난 거, 사실 기차역이 아니라 라멘집 골목이었다",
    discoveryHook:[
      "이 사랑 통역 되나요? 다 보고 나서 다들 그 장면부터 찾아보더라. 에노덴 지나가고 나면 남자가 감쪽같이 사라지는 그 건널목.",
      "근데 찾아보니 두 사람이 처음 만난 곳은 그 건널목이 아니었다. 에노시마 골목의 작은 라멘집 — 무희가 전 남친 새 여친한테 따지러 뛰어들었다가 일본어가 안 통해서 얼어붙었을 때, 호진이 통역으로 끼어든 그 장면. 거기가 진짜 시작이다.",
      "그 라멘집도 사실 라멘집이 아니다. 실제로는 'tenzan lab.'이라는 카페인데, 극에서만 외관이 라멘집으로 나온다고. 지금은 빙수랑 화과자 파는 조용한 가게라니, 가서 라멘 찾으면 안 될 것 같다.",
      "1화 초반, 둘이 서로 모른 채 스쳐 지나가는 장면 — 그게 고쿠라쿠지역이다. 1904년 지어진 목조역사인데, 알고 보니 고레에다 히로카즈 감독 <바닷마을 다이어리>에도 나왔던 곳이라고. 아는 사람들 사이에선 이미 성지였던 셈.",
      "제일 유명한 컷은 따로 있다. 고료 신사 흰 도리이 앞으로 에노덴이 지나가는 그 장면, 아사히신문에서도 실제 촬영지로 확인해줬다고 한다. 장마철엔 수국이랑 전철이 같이 찍혀서 원래도 유명한 포토스팟이었다는데, 드라마 이후 더 몰린다고.",
      "그리고 그 유명한 '사라지는' 장면 — 하세역 근처 작은 건널목이다. 실제로 전 세계 팬들이 찾아와서 가마쿠라시가 아예 다국어 안내판까지 세워놨다고 하니, 조용히 사진만 찍고 오는 게 맞을 것 같다.",
      "에노시마 씨캔들 전망대도 나온다. 근데 이건 로맨틱한 장면이 아니라 호진이 첫사랑 지선을 찾아 헤매는 장면이다. 근데 이 장면, 외경은 진짜 씨캔들인데 내부 촬영은 속초 피노디아 엑스포타워에서 따로 찍었다고 한다. 반대로 캐나다 고급 레스토랑이나 이탈리아 와이너리처럼 아예 통째로 한국(강남·파주)에서 찍힌 곳도 있다.",
      "드라마 자체 얘기도 좀 해보면, 이거 홍자매(홍정은·홍미란) 작가 신작이다. <미남이시네요>, <호텔 델루나>, <환혼> 쓴 그 홍자매. 김선호·고윤정·후쿠시 소타가 주연을 맡았고, 2026년 1월 넷플릭스 공개 직후 비영어권 TV쇼 부문 1위에 올랐다. 12부작.",
      "이야기 구조도 스포일러해볼 만하다. 통역 인연으로 시작한 무희랑 호진 사이에, '로맨틱 트립'에 함께 출연하게 되는 일본 배우 히로까지 더해지면서 삼각관계가 만들어진다. 셋 다 같이 출연하는 이 글로벌 데이트 예능을 매개로 이 관계가 계속 얽힌다.",
      "이 삼각관계, 캐나다 밴프에서 한번 더 복잡해지고 이탈리아 토스카나·움브리아에서 결정적인 국면을 맞는다고 하는데, 정확히 누구랑 누가 어떻게 되는지는 여기서 다 말하지 않으려 한다.",
      "대신 확실한 건 하나 있다. '로맨틱 트립'의 마지막 고백 장면이 이 드라마의 진짜 클라이맥스라는 것. 그리고 그 장면까지 가는 길이 실제로는 절반은 진짜 해외, 절반은 국내 세트였다는 걸 알고 나면 다시 볼 때 재미가 배가 된다.",
      "이야기는 여기서 안 끝나고 캐나다 밴프, 이탈리아 토스카나까지 이어진다. 나도 이 세 나라 다 지도로만 본 곳들인데, 장면 하나하나가 이렇게까지 실제 장소랑 딱 맞아떨어지는 걸 알고 나니 언젠가 순서대로 밟아보는 여행도 상상하게 된다.",
      "그중에서도 제일 먼저 밟아보고 싶은 건 역시 가마쿠라·에노시마다. 두 사람이 진짜로 처음 만난 그 라멘집 골목부터, 고쿠라쿠지역, 고료 신사, 하세역 건널목까지 — 이 코스 하나만 걸어도 드라마 1화를 통째로 다시 보는 기분이 들 것 같다.",
      "그리고 씨캔들에 올라가면, 거기서 호진이 지선을 찾아 헤매던 마음이 어떤 거였는지 한 번쯤 생각해보고 싶다. 로맨틱한 장면인 척 안 하는 그 장면이, 사실 이 드라마에서 제일 마음에 남았으니까."
    ],
    hookReveals:[
      { label:"둘의 첫 만남 → 기차역 아닌 에노시마 라멘집 골목", label_en:"Where they actually first meet → an Enoshima ramen-shop alley, not the train station", locId:"tenzan_lab_ramen" },
      { label:"라멘집 외관 → 실제로는 빙수·화과자 파는 카페 'tenzan lab.'", label_en:"The ramen shop's exterior → really a café, 'tenzan lab.'", locId:"tenzan_lab_ramen" },
      { label:"고료 신사 도리이 앞 에노덴 컷 → 아사히신문이 확인한 대표 촬영지", label_en:"The torii-and-Enoden shot → confirmed as a key filming site by Asahi Shimbun", locId:"goryo_shrine" },
      { label:"하세역 인근 건널목 → 가마쿠라시가 다국어 안내판까지 세운 '성지'", label_en:"The Hase Station crossing → Kamakura City installed multilingual signs for the fans who kept coming", locId:"hase_crossing" },
      { label:"씨캔들 전망대 → 외경은 에노시마, 내부는 강원 속초", label_en:"The observation tower → real exterior in Enoshima, interior filmed in Sokcho, Korea", locId:"enoshima_sea_candle" },
      { label:"캐나다 고급 레스토랑 → 사실은 서울 강남 호텔", label_en:"The fancy 'Canada' restaurant → actually a hotel in Gangnam, Seoul", locId:"grand_mercure_gangnam" },
      { label:"이탈리아 와이너리 → 사실은 경기 파주 농원", label_en:"The 'Italian' winery → actually a farm in Paju, Korea", locId:"sanmeoru_winery" }
    ],
    hookBadge_en:"Netflix · Can This Love Be Translated? · Real Kamakura & Enoshima filming locations",
    hookTagline_en:"They didn't first meet at the train station — it was a ramen-shop alley",
    discoveryHook_en:[
      "Finish Can This Love Be Translated? and everyone goes looking for the same scene first — the level crossing where the Enoden train passes and the guy vanishes without a trace.",
      "Turns out that's not actually where the two of them first meet. It's a small ramen shop in an Enoshima alley — the scene where Mu-hee bursts in to confront her ex's new girlfriend, freezes because she can't speak Japanese, and Ho-jin, who happens to be there, steps in as her interpreter. That's where it really starts.",
      "That ramen shop isn't even a ramen shop. It's actually a café called 'tenzan lab.' — only the exterior plays the ramen shop on screen. These days it quietly serves shaved ice and Japanese sweets, so don't go in asking for ramen.",
      "The scene early in Episode 1 where the two pass each other without knowing it — that's Gokurakuji Station. A wooden station house built in 1904, and it turns out it also appeared in Hirokazu Kore-eda's Our Little Sister. Already a pilgrimage site for film fans before this show even existed.",
      "The most famous shot, though, is a different one — an Enoden train passing in front of Goryo Shrine's white torii gate. Asahi Shimbun itself confirmed it as a real filming location. It was already a well-known photo spot during hydrangea season when the train and flowers line up, and apparently even more crowded since the show aired.",
      "And that famous 'disappearing' scene — a small level crossing near Hase Station. So many fans from around the world started showing up that Kamakura City put up multilingual notice signs. Probably best to just take quiet photos and move on.",
      "The Enoshima Sea Candle observation tower shows up too — but not for a romantic scene. It's where Ho-jin searches for his first love, Ji-seon. The exterior is the real tower, but the interior scenes were actually filmed separately at a tower in Sokcho, Korea. And some 'overseas' scenes go even further — the fancy Canadian restaurant and the Italian winery were both filmed entirely in Korea (Gangnam and Paju).",
      "Worth talking about the show itself for a second — this is the newest work from the Hong Sisters (Hong Jung-eun, Hong Mi-ran), the same writers behind My Girlfriend Is a Gumiho, Hotel del Luna, and Alchemy of Souls. It stars Kim Seon-ho, Go Youn-jung, and Sota Fukushi, and topped Netflix's non-English TV chart right after its January 2026 release. 12 episodes.",
      "The story structure is worth spoiling a little too. What starts as an interpreter-and-client bond between Mu-hee and Ho-jin gets complicated once Hiro, a Japanese actor who joins them on the same show, enters the picture — forming a love triangle. All three end up on the same global dating show, 'Romantic Trip,' which keeps pulling their relationship back together.",
      "That triangle gets even messier in Banff, Canada, and comes to a head in Tuscany and Umbria, Italy — exactly who ends up with whom, I'll leave unsaid here.",
      "What I will say for sure: the final confession scene on 'Romantic Trip' is the real climax of the show. And knowing that the road to that scene is only half genuinely overseas, half a set in Korea, makes a rewatch twice as fun.",
      "The story doesn't stop there — it continues on to Banff, Canada, and Tuscany, Italy. I've only ever seen all three countries on a map myself, but knowing how precisely each scene lines up with a real place makes me picture someday following the whole route in order.",
      "If I had to pick where to start, though, it'd be Kamakura and Enoshima. The ramen-shop alley where they really first meet, Gokurakuji Station, Goryo Shrine, the crossing near Hase Station — walking that route alone would probably feel like rewatching all of Episode 1.",
      "And up on the Sea Candle, I'd want to sit with what Ho-jin was actually feeling while searching for Ji-seon. That scene, which never pretends to be romantic, is honestly the one that stuck with me most."
    ],
    hookBadge_ja:"Netflix · 恋の通訳、できますか？ · 鎌倉・江の島の実際の撮影地",
    hookTagline_ja:"二人が本当に出会ったのは駅じゃなくて、ラーメン屋の路地だった",
    discoveryHook_ja:[
      "『恋の通訳、できますか？』を見終わると、みんな真っ先にあのシーンを調べる。江ノ電が通り過ぎたあと、男が跡形もなく消えるあの踏切。",
      "でも調べてみると、二人が本当に出会った場所はあの踏切じゃなかった。江の島の路地にある小さなラーメン屋 — ムヒが元カレの新しい彼女に詰め寄ろうと飛び込んだものの、日本語が通じず固まってしまったところに、たまたま居合わせたホジンが通訳として割って入る。そこが本当の始まりだ。",
      "そのラーメン屋も、実はラーメン屋じゃない。実際は「tenzan lab.」というカフェで、劇中では外観だけがラーメン屋として使われているという。今はかき氷や和菓子を出す静かな店らしいので、行ってラーメンを探さないほうがいい。",
      "1話序盤、二人が互いに気づかずすれ違うシーン — あれが極楽寺駅だ。1904年に建てられた木造駅舎で、調べてみると是枝裕和監督の『海街diary』にも登場した場所だという。分かる人の間ではすでに聖地だったわけだ。",
      "一番有名なカットは別にある。御霊神社の白い鳥居の前を江ノ電が通り過ぎるあのシーン、朝日新聞でも実際の撮影地として確認されたという。梅雨時は紫陽花と電車が一緒に写る、もともと有名なフォトスポットだったが、ドラマ以降さらに人が集まっているそうだ。",
      "そしてあの有名な「消える」シーン — 長谷駅近くの小さな踏切だ。世界中からファンが訪れるようになり、鎌倉市が多言語の案内板まで設置したというから、静かに写真だけ撮って帰るのが良さそうだ。",
      "江の島シーキャンドルの展望台も出てくる。でもこれはロマンチックなシーンじゃなくて、ホジンが初恋のジソンを探し歩くシーンだ。ただこのシーン、外観は本物のシーキャンドルだけど、内部の撮影は韓国・束草(ソクチョ)の展望タワーで別に撮られたという。逆にカナダの高級レストランやイタリアのワイナリーのように、まるごと韓国(江南・坡州)で撮影された場所もある。",
      "ドラマそのものについても少し触れておくと、これはホン姉妹(ホン・ジョンウン、ホン・ミラン)の新作だ。数々のヒットドラマを手がけてきたあのホン姉妹の作品で、キム・ソノ、コ・ユンジョン、福士蒼汰が主演を務め、2026年1月の配信直後、Netflixの非英語TVショー部門で1位を獲得した。全12話。",
      "物語の構造も少しネタバレしておく価値がある。通訳の縁で始まったムヒとホジンの関係に、同じ番組に出演することになる日本人俳優ヒロが加わり、三角関係が生まれる。三人とも出演することになるグローバル恋愛リアリティ番組「ロマンティック・トリップ」を軸に、この関係がずっと絡み合っていく。",
      "この三角関係、カナダのバンフでさらにこじれ、イタリアのトスカーナ・ウンブリアで決定的な局面を迎えるらしいのだが、正確に誰と誰がどうなるのかはここでは全部言わないでおく。",
      "ただ一つ確かなことがある。「ロマンティック・トリップ」の最後の告白シーンが、このドラマの本当のクライマックスだということ。そしてそこに至る道のりが、実際には半分だけ本物の海外で、残り半分は韓国国内のセットだったと知ると、見返すときの楽しみが倍になる。",
      "物語はここで終わらず、カナダのバンフ、イタリアのトスカーナまで続く。私自身、この三カ国はどれも地図でしか見たことがない場所だけど、一つ一つのシーンがここまで実際の場所とぴったり一致していると知ると、いつか順番に巡る旅もつい想像してしまう。",
      "その中でも一番先に歩いてみたいのは、やはり鎌倉・江の島だ。二人が本当に初めて出会ったあのラーメン屋の路地から、極楽寺駅、御霊神社、長谷駅の踏切まで — このルートを一つ歩くだけで、ドラマの1話をまるごと見返すような気分になれそうだ。",
      "そしてシーキャンドルに上ったら、ホジンがジソンを探し歩いていたときの気持ちを一度考えてみたい。ロマンチックなふりをしないあのシーンが、実はこのドラマで一番心に残っているから。"
    ],
    contentSummary:{ sections:[
      { heading:"가마쿠라·에노시마 — 진짜 시작", bullets:[
        "통역사 주호진이 라멘집 골목에서 우연히 톱스타 차무희(도라미)의 통역을 맡게 되며 인연이 시작됨",
        "고료 신사·하세역 건널목 등 가마쿠라 일대 실제 촬영지에서 두 사람의 관계가 발전함"
      ]},
      { heading:"'로맨틱 트립' — 캐나다", bullets:[
        "무희가 일본 배우 히로와 함께 글로벌 데이트 예능 '로맨틱 트립'에 출연, 호진이 통역으로 동행함",
        "밴프·캔모어 일대에서 촬영이 이어지며 무희·호진·히로의 삼각관계가 형성됨"
      ]},
      { heading:"이탈리아 — 관계의 전환점", bullets:[
        "토스카나·움브리아를 배경으로 '로맨틱 트립' 촬영이 이어지며 두 사람의 관계가 결정적으로 깊어짐",
        "'로맨틱 트립'의 최종 고백 장면까지, 그 결말은 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"호진과 무희, 그리고 히로 사이의 삼각관계가 어떻게 마무리되는지는 직접 작품을 보고 확인하는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Enoshima Sea Candle.jpg", credit:"에노시마 씨캔들(이 사랑 통역 되나요? 실제 촬영지, 호진이 첫사랑을 찾아 헤매는 장면) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Enoshima_Sea_Candle.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%9D%B4_%EC%82%AC%EB%9E%91_%ED%86%B5%EC%97%AD_%EB%90%98%EB%82%98%EC%9A%94%3F" },
  { id:"conanhighway", title:"명탐정 코난: 하이웨이의 타천사 (名探偵コナン ハイウェイの堕天使)", author:"하스이 다카히로 감독 · 오쿠라 다카히로 각본 · 도호", type:"film", country:"japan", medium:"film", genres:["mystery","action","thriller"],
    lang:"ja", // 일본 작품 — 일본어 태그·야후재팬 등 일본향 SNS를 우선 노출한다.
    // ※ 기획자 제안(2026-08): 명탐정 코난 극장판 29탄, 한국 개봉(8/12) 직후라 검색 트래픽이 활발한 시점.
    //   무대가 가나가와현(요코하마+하코네)으로 명확히 구체적이라 지도 콘텐츠와 궁합이 좋다. "정확성 원칙":
    //   애니메이션이라 "촬영지"는 존재하지 않으므로, 공식 성지순례 가이드(libert.co.jp)가 확인한 극중 장면
    //   배경(FILMED) 6곳 + 실존하지만 정확한 장면 대응은 불확실한 가나가와 실제 배경(STORY SETTING) 10곳 +
    //   요코하마시·하코네마치 공식 콜라보/스탬프랠리 참여점(EXPERIENCE) 6곳으로 총 22곳을 정직하게 구성했다.
    //   인물도 정식 크레딧이 확인되는 사건 관계자 전원(14명) 기준으로 지어낸 엑스트라는 없다.
    era:"극장판 29탄 · 일본 개봉 2026-04-10 · 한국 개봉 2026-08-12", title_en:"Detective Conan: The Fallen Angel of the Highway", author_en:"Directed by Hasui Takahiro · Screenplay by Okura Takahiro · Toho", era_en:"29th theatrical film · Released in Japan 2026-04-10, in Korea 2026-08-12",
    summary:"가나가와 모터사이클 페스티벌 취재차 요코하마를 찾은 코난 일행이, 도심을 질주하는 정체불명의 검은 오토바이 '루시퍼'를 둘러싼 살인사건에 휘말리는 이야기. 가나가와현경 교통기동대 소대장 하기와라 치하야가 루시퍼를 쫓는 하코네 턴파이크 추격전이 영화의 핵심 액션이며, 결말에서는 경찰 조직 내부의 은폐된 살인과 복수극이 함께 맞물려 드러난다.",
    longSummary:"이 영화는 단순한 '검은 오토바이 추격전'이 아니다. 표면적인 사건은 차세대 AI 경찰 오토바이 '엔젤'을 해킹해 만든 정체불명의 검은 바이크 '루시퍼'가 도심을 질주하는 것으로 시작하지만, 파헤쳐 보면 세 겹의 진실이 겹쳐 있다.\n\n루시퍼를 실제로 몰던 사람은 전직 백주 대원 아사기 이치카다. 그녀는 과거 도로경주 조직원을 추격하다 사망케 한 사고의 책임을 미디어에 뒤집어쓰고 현장에서 배제됐는데, 사실은 '엔젤' 개발 책임자 오오마에 카즈아키에게 은밀히 고용돼 불법 데이터 수집용 사고를 연출해온 것이었다. 오오마에는 이 데이터를 군사용 자율 무기 기술로 밀매하려던 진짜 배후로, 이를 눈치챈 옛 동료 사사키 나오유키를 살해하고 그마저 눈치챈 전직 레이서 아오키 유이치로까지 제거한다. 그리고 사사키의 친누나 류우리 키리코가 동생의 복수를 위해 오오마에를 요코하마 베이브리지 위로 유인해 헬리콥터 저격을 준비하면서 사건은 걷잡을 수 없이 커진다.\n\n결말에서 코난은 치하야와 아사기를 자리 바꿔치기시켜 오오마에의 자백을 직접 받아내는 트릭을 설계하고, 동시에 코난 일행은 류우리의 저격 시도를 저지한다. 영화 제목 '하이웨이의 타천사'는 이중적인데, 하나는 경찰 오토바이 '엔젤'의 타락한 쌍둥이인 '루시퍼' 자체를, 다른 하나는 한때 '천사'(경찰)였다가 복수와 원한 속에서 타락한 아사기를 가리킨다 — 그리고 같은 상실을 겪고도 끝내 타락하지 않는 치하야의 이야기이기도 하다.",
    pinColor:"#26456b",
    summary_en:"Conan's group travels to Yokohama to cover the Kanagawa Motorcycle Festival and gets swept into a murder case surrounding a mysterious black motorcycle, 'Lucifer,' racing through the city. Kanagawa Prefectural Police squad leader Hagiwara Chihaya's pursuit of Lucifer along the Hakone Turnpike is the film's centerpiece action sequence, and the ending unravels a covered-up murder and revenge plot inside the police organization itself.",
    longSummary_en:"This isn't just a black-motorcycle chase movie. The surface case — a mysterious black bike called 'Lucifer,' a hacked and modified version of the next-gen AI police bike 'Angel,' tearing through the city — unfolds into three layers of truth once you dig in.\n\nThe actual rider of Lucifer is Asagi Ichika, a former traffic officer publicly blamed for a fatal pursuit accident years earlier and pulled from motorcycle duty. In reality, she was secretly hired by Angel's chief engineer, Oomae Kazuaki, to stage 'accidents' for illegal data collection. Oomae is the true mastermind, secretly harvesting autonomous-driving data from underground street races to sell as military-grade autonomous-weapon technology — and he murdered his former co-developer Sasaki Naoyuki to cover it up, then had Asagi kill former pro racer Aoki Yuichiro when he caught on too. Meanwhile Sasaki's own older sister, Ryuuri Kiriko, has been secretly manipulating Asagi for her own revenge, luring Oomae onto the Yokohama Bay Bridge for a helicopter-sniper assassination attempt.\n\nIn the climax, Conan orchestrates a switch between Chihaya and Asagi so Oomae confesses directly to (an disguised) Chihaya, while the rest of the group simultaneously foils Ryuuri's sniper attempt. The title, 'Fallen Angel of the Highway,' works two ways: it's Lucifer, the corrupted twin of the police bike Angel, and it's Asagi herself — once an 'angel' (a police officer) who fell into crime out of grief and resentment. It's also, in contrast, the story of Chihaya, who suffers the same kind of loss but never falls.",
    communityNote:"개봉 이후 일본 팬 커뮤니티에서는 '하기와라 치하야가 타락하지 않는 이야기'라는 해석이 가장 많이 회자됩니다. 같은 상실을 겪고도 다른 길을 택한 치하야와 아사기의 대비가 제목의 핵심이라는 분석이 다수예요. 요코미조 주고와의 훈훈한 관계도 후반부 유머 포인트로 자주 언급됩니다.",
    communityNote_en:"Since release, the most-discussed reading in Japanese fan communities is that the film is fundamentally 'the story of Chihaya not falling.' Many fans point to the contrast between Chihaya and Asagi — two women who suffered the same kind of loss but chose opposite paths — as the real meaning of the title. Chihaya's warm, comedic dynamic with Yokomizo Jugo is also frequently cited as a highlight of the film's back half.",
    hookBadge:"극장판 29탄 · 한국 8/12 개봉 · 가나가와 촬영지 & 결말 스포", hookTagline:"그 검은 오토바이, 사실 경찰 오토바이의 해킹판이었다",
    discoveryHook:[
      "코난 극장판 29탄, 한국에서 8월 12일에 개봉해서 지금 한창 상영 중이다.",
      "무대는 가나가와현 요코하마+하코네. 찾아보니 하코네 턴파이크(오칸잔)가 극중 핵심 추격전 배경으로 확인된 실존 드라이브 코스더라.",
      "결말까지 찾아봤다(스포 주의). 검은 오토바이 '루시퍼'는 사실 경찰이 개발 중이던 차세대 AI 바이크 '엔젤'을 해킹한 개조판이었다.",
      "실제로 몰던 사람은 전직 백주 대원 아사기 이치카. 옛날 추격 사고 책임을 뒤집어쓰고 현장에서 밀려난 인물인데, 사실은 '엔젤' 개발자 오오마에한테 몰래 고용돼 불법 데이터 수집용 사고를 연출해온 거였다.",
      "오오마에가 진짜 배후다. 자율주행 데이터를 몰래 모아서 군사용 무기 기술로 팔아넘기려 했고, 이걸 눈치챈 동료를 죽이고 사고로 위장했다.",
      "그런데 죽은 동료의 누나 류우리 키리코가 따로 복수를 준비하고 있었다는 게 또 반전이다. 오오마에를 요코하마 베이브리지로 유인해서 헬기 저격을 시도한다.",
      "결국 코난이 설계한 자리 바꿔치기 트릭으로 오오마에가 직접 자백하는 장면, 그리고 동시에 벌어지는 저격 저지 장면이 클라이맥스다.",
      "제목 '타천사'가 두 가지 뜻이더라 — 경찰 바이크 '엔젤'의 타락한 쌍둥이 '루시퍼', 그리고 한때 경찰이었다가 복수심에 타락한 아사기. 같은 상처를 갖고도 안 무너진 치하야랑 대비되는 구조였다."
    ],
    hookReveals:[
      { label:"검은 오토바이 '루시퍼' → 경찰 AI바이크 '엔젤'의 해킹 개조판", label_en:"'Lucifer' → a hacked, modified version of the police AI bike 'Angel'", locId:"turnpikehakone" },
      { label:"루시퍼의 실제 탑승자 → 전직 백주 대원 아사기 이치카", label_en:"Lucifer's actual rider → former traffic officer Asagi Ichika", locId:"kanagawapolicehq" },
      { label:"진짜 배후 → '엔젤' 개발자 오오마에 카즈아키(데이터 밀매)", label_en:"The true mastermind → Angel's developer Oomae Kazuaki, selling stolen data", locId:"yokohamabaybridge" },
      { label:"최종 반전 → 사사키의 누나 류우리의 헬기 저격 복수극", label_en:"Final twist → Sasaki's sister Ryuuri's helicopter-sniper revenge plot", locId:"yokohamabaybridge" }
    ],
    hookBadge_en:"29th theatrical film · Korea release Aug 12 · Filming setting & full spoilers",
    hookTagline_en:"The black motorcycle turns out to be a hacked police bike",
    discoveryHook_en:[
      "Conan's 29th theatrical film opened in Korea on August 12 and is still running.",
      "The setting is Kanagawa — Yokohama and Hakone. The Hakone Turnpike (Okanzan) turns out to be the real drive confirmed as the chase sequence's backdrop.",
      "I looked up the full ending too (spoilers ahead). The black motorcycle 'Lucifer' turns out to be a hacked, modified version of 'Angel,' the next-gen AI police bike the force was developing.",
      "The actual rider is Asagi Ichika, a former traffic officer publicly blamed for an old pursuit accident and pulled from duty — secretly hired by Angel's developer to stage illegal data-collection 'accidents.'",
      "The real mastermind is Oomae, secretly harvesting autonomous-driving data to sell as military weapons tech, and murdering a colleague who caught on.",
      "Twist: the dead colleague's older sister was running her own revenge plot the whole time, luring Oomae onto the Yokohama Bay Bridge for a helicopter sniper hit.",
      "It all comes together in the climax — Conan's switcheroo trick gets Oomae to confess directly, while the group simultaneously stops the sniper.",
      "The title 'Fallen Angel' has a double meaning — Lucifer, the corrupted twin of the police bike Angel, and Asagi, a former officer who fell into crime out of grief. All set against Chihaya, who suffers the same kind of loss but never falls."
    ],
    hookBadge_ja:"劇場版29弾 · 韓国8/12公開 · 舞台探訪&結末ネタバレ",
    hookTagline_ja:"あの黒いバイク、実は警察バイクのハッキング改造版だった",
    discoveryHook_ja:[
      "コナン劇場版29弾、韓国では8月12日に公開されて今も上映中。",
      "舞台は神奈川県、横浜と箱根。箱根ターンパイク(大観山)が劇中の追跡劇の舞台として確認されている実在のドライブコースだった。",
      "結末まで調べてみた(ネタバレ注意)。黒いバイク「ルシファー」は、警察が開発していた次世代AIバイク「エンジェル」をハッキングした改造版だった。",
      "実際に乗っていたのは元白バイ隊員の浅葱一華。昔の追跡事故の責任を負わされ現場を外された人物だが、実は「エンジェル」の開発者に密かに雇われ、違法データ収集のための事故を演出していた。",
      "本当の黒幕は大前。自動運転データをこっそり集めて軍事用兵器技術として売ろうとしていて、それに気づいた同僚を殺害し事故に見せかけていた。",
      "亡くなった同僚の姉が独自に復讐を準備していたというのがまた別のどんでん返し。大前を横浜ベイブリッジにおびき出しヘリの狙撃を試みる。",
      "最終的にコナンが仕組んだ入れ替わりトリックで大前が直接自白する場面と、同時に進む狙撃阻止のシーンがクライマックス。",
      "タイトル「堕天使」には二重の意味があった — 警察バイク「エンジェル」の堕落した双子「ルシファー」、そして一度は警察官(天使)だったのに復讐心で堕ちた浅葱。同じ喪失を抱えながら堕ちなかった千速との対比構造になっていた。"
    ],
    contentSummary:{ sections:[
      { heading:"프롤로그 — 요코하마행, 그리고 정체불명의 검은 오토바이", bullets:[
        "소년탐정단이 먼저 요코하마로 출발하고, 코난은 코고로·란·소노코·세라 마스미와 함께 가나가와 모터사이클 페스티벌에 합류한다",
        "이동 중 정체불명의 검은 오토바이가 도로를 가로지르고, 가나가와현경 교통기동대 소대장 하기와라 치하야가 이를 추격하다 놓친다"
      ]},
      { heading:"'엔젤'과 '루시퍼' — 경찰 바이크의 해킹판", bullets:[
        "페스티벌에서 차세대 AI 지원 경찰 오토바이 '엔젤'이 공개되고, 치하야가 안전장치를 몰래 해제한 채 시승한다",
        "곧이어 도쿄에서도 목격된 검은 오토바이가 '엔젤'과 실루엣이 같다는 사실이 밝혀지며 '루시퍼'라는 이름이 붙는다"
      ]},
      { heading:"불법 도로경주와 살인사건", bullets:[
        "전직 프로 레이서 아오키 유이치로가 탄자와호에서 익사체로 발견되고, 세라 마스미가 그를 대신해 불법 경주 현장에 잠입해왔다는 사실이 드러난다",
        "코난과 세라는 무기 밀매업자 로한 S. 라히리의 부하들, 그리고 '루시퍼'에게 옥상에서 쫓기는 위기를 겪는다"
      ]},
      { heading:"세 겹의 진실 — 아사기, 오오마에, 그리고 류우리", bullets:[
        "루시퍼를 실제로 모는 사람은 전직 백주 대원 아사기 이치카이며, '엔젤' 개발자 오오마에 카즈아키에게 고용된 것으로 밝혀진다",
        "오오마에는 불법 데이터 수집 사실을 은폐하려 옛 동료 사사키 나오유키를 살해했고, 이를 눈치챈 아오키까지 제거했다는 사실이 드러난다",
        "사사키의 누나 류우리 키리코가 동생의 복수를 위해 아사기를 조종해왔으며, 오오마에를 요코하마 베이브리지로 유인해 헬리콥터 저격을 준비한다"
      ]},
      { heading:"클라이맥스 — 자리 바꿔치기와 저격 저지", bullets:[
        "코난은 아사기를 마취시키고 치하야와 자리를 바꿔, 오오마에가 스스로 범행을 자백하도록 유도하는 트릭을 설계한다",
        "같은 시각 코난 일행은 요코하마 베이브리지 위에서 벌어지는 류우리의 저격 시도를 저지한다 — 그 구체적인 결말은 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"치하야와 요코미조 주고의 관계가 어떻게 마무리되는지, 그리고 아사기와 류우리가 어떤 처분을 받는지는 직접 작품을 보고 확인해 주세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Yokohama Red Brick Warehouse 2012.JPG", credit:"요코하마 아카렌가 창고(코난: 하이웨이의 타천사 티저 예고편 야경 배경) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Yokohama_Red_Brick_Warehouse_2012.JPG" },
    posterPage:"https://ja.wikipedia.org/wiki/%E5%90%8D%E6%8E%A2%E5%81%B5%E3%82%B3%E3%83%8A%E3%83%B3_%E3%83%8F%E3%82%A4%E3%82%A6%E3%82%A7%E3%82%A4%E3%81%AE%E5%A0%95%E5%A4%A9%E4%BD%BF" },
  { id:"prada2", title:"악마는 프라다를 입는다 2 (The Devil Wears Prada 2)", author:"데이비드 프랭클 감독 · 20세기 스튜디오", type:"film", country:"usa", medium:"film", genres:["drama","comedy"],
    lang:"en", // 영어권 작품 — 브레이킹 배드·해리 포터·스파이더맨과 동일하게 레딧 등 영어권 SNS를 우선 노출한다.
    // ※ 기획자 제안(2026-08): 20년 만의 속편이자 전 세계 최초 개봉국이 한국(4/29)이라는 화제성으로 선정.
    //   뉴욕·밀라노·코모 호수 실제 촬영지가 movie-locations.com 등에서 다수 확인됨. "정확성 원칙": 밀라노
    //   두오모·최후의 만찬 박물관은 후보로 검토됐으나 실제로는 스튜디오 세트로 대체돼 촬영되지 않은 것으로
    //   확인돼, 이 두 곳은 "극중 미등장" 라벨을 명시한 EXPERIENCE 여행지로만 분류해 정확성을 지켰다. 실제
    //   촬영이 확인된 FILMED 12곳 + 함께 즐기기 좋은 EXPERIENCE 6곳으로 총 18곳을 정직하게 구성했다.
    era:"20년 만의 속편 · 한국 개봉 2026-04-29(전 세계 최초) · 미국 개봉 2026-05-01", title_en:"The Devil Wears Prada 2", author_en:"Directed by David Frankel · 20th Century Studios", era_en:"A sequel 20 years in the making · Released first in Korea on 2026-04-29, then the US on 2026-05-01",
    summary:"20년 만에 돌아온 '악마는 프라다를 입는다' 속편. 실직 위기에 놓인 저널리스트 앤디 삭스가 '런웨이'의 신임 피처 에디터로 복귀하며 미란다·나이젤·에밀리와 재회하지만, 회장 이르브 라비츠가 갑작스레 사망하며 '런웨이' 자체의 존폐를 건 인수 전쟁이 벌어진다. 결말에서는 미란다가 오랫동안 과소평가했던 나이젤에게 마침내 스포트라이트를 넘긴다.",
    longSummary:"'악마는 프라다를 입는다 2'는 겉으로는 화려한 패션 속편이지만, 실제로는 '미디어 산업의 붕괴'라는 꽤 현실적인 주제를 정면으로 다룬다. 영화는 앤디가 소속 매체 'The Vanguard' 전체가 인수·해고되는 장면으로 시작해, 이 위기감을 '런웨이' 자체의 위기와 곧바로 겹쳐 놓는다.\n\n나이젤이 은밀히 손을 써 앤디가 '런웨이'의 신임 피처 에디터로 합류하면서 미란다·나이젤·에밀리(이제 디올 임원)와의 재회가 이뤄진다. 그런데 회장 이르브 라비츠가 자신의 75세 생일파티 도중 갑자기 사망하면서(감독 데이비드 프랭클이 1편의 '에밀리 택시 사고'에 견줄 만한 의도적 장치라고 직접 밝힌 대목이다), 그의 아들 제이 라비츠가 경영권을 쥐고 '런웨이'를 단기 수익을 위해 해체하려 한다.\n\n앤디는 '런웨이'를 지키기 위해 에밀리와 그녀의 약혼자인 테크 억만장자 벤지 반스를 끌어들여 인수를 시도하지만, 에밀리에게는 이 기회로 미란다를 완전히 몰아내려는 숨은 의도가 있었다는 게 드러난다. 결국 미란다와 앤디는 벤지의 전 연인 사샤 반스에게 손을 내밀어 반전을 만들어내고, 사샤의 인수로 '런웨이'와 미란다의 자리를 모두 지켜낸다.\n\n가장 인상적인 결말은 밀라노 갈라 장면이다. 위기 수습을 위해 자리를 비워야 했던 미란다는 자신을 대신해 기조연설을 하도록 나이젤에게 무대를 넘기는데, 사실 그 연설은 애초에 나이젤이 써준 것이었다 — 20년 동안 과소평가해온 파트너에게 마침내 스포트라이트를 돌려주는 장면이다. 영화는 앤디가 1편 첫 출근일 입었던 그 셀루리안 스웨터를 다시 입고, 미란다·나이젤과 함께 늦은 밤 사무실에서 일하는 장면으로 마무리된다.",
    pinColor:"#c9a13b",
    summary_en:"Twenty years later, The Devil Wears Prada returns. Journalist Andy Sachs, facing a layoff, rejoins Runway as its new Features Editor and reunites with Miranda, Nigel, and Emily — but chairman Irv Ravitz's sudden death triggers a full-blown fight over Runway's very survival. In the end, Miranda finally hands the spotlight to Nigel, whom she's undervalued for two decades.",
    longSummary_en:"On the surface, The Devil Wears Prada 2 is a glossy fashion sequel, but underneath it's genuinely about the collapse of the media industry. The film opens with Andy's entire newsroom at The Vanguard getting acquired and laid off mid-ceremony, immediately mirroring the crisis about to hit Runway itself.\n\nThanks to a secret assist from Nigel, Andy is hired as Runway's new Features Editor, reuniting her with Miranda, Nigel, and Emily (now a Dior executive). But chairman Irv Ravitz suddenly dies at his own 75th birthday party — a twist director David Frankel has directly called a deliberate dramatic device, comparable to Emily's taxi accident in the first film — and his son Jay Ravitz takes control, planning to gut Runway for quick profit.\n\nTo save the magazine, Andy recruits Emily and her tech-billionaire fiancé Benji Barnes to attempt a buyout, only for it to emerge that Emily secretly intends to use the acquisition to push Miranda out entirely. Miranda and Andy counter by reaching out to Benji's ex, Sasha Barnes, whose acquisition ultimately saves both Runway and Miranda's position.\n\nThe film's most striking beat comes at the Milan gala. Called away to handle the crisis just before her keynote, Miranda hands the stage to Nigel — who, it turns out, actually wrote the speech himself — finally giving the spotlight to a partner she's undervalued for two decades. The film closes with Andy, back in the same lumpy cerulean sweater she wore on her first day in the original film, working late into the night alongside Miranda and Nigel.",
    communityNote:"개봉 이후 가장 많이 회자되는 지점은 두 가지예요. 하나는 이르브의 갑작스러운 죽음 — 감독이 직접 인터뷰에서 '의도된 극적 장치'라고 밝히며 화제가 됐죠. 다른 하나는 나이젤이 마침내 스포트라이트를 받는 결말로, '20년을 기다린 보상'이라는 평이 많습니다. 케네스 브래너가 장례식 바이올린 연주 장면을 위해 몇 주간 실제로 운지법을 연습했다는 후일담도 자주 언급돼요.", communityNote_en:"Two things dominate post-release discussion. First, Irv's sudden death — the director confirmed in interviews it was a deliberate dramatic choice, which became a talking point of its own. Second, the ending where Nigel finally gets his moment in the spotlight, widely described as '20 years of payoff.' The behind-the-scenes detail that Kenneth Branagh trained for weeks to actually play the violin for the funeral scene also comes up often.",
    hookBadge:"20년 만의 속편 · 한국 세계 최초 개봉 · 촬영지 & 결말 스포", hookTagline:"뉴욕·밀라노·코모, 근데 두오모는 사실 세트였다",
    discoveryHook:[
      "'악마는 프라다를 입는다' 속편이 무려 20년 만에 나왔는데, 전 세계에서 한국이 제일 먼저 개봉했다(4월 29일, 미국보다 이틀 빨랐다).",
      "찾아보니 뉴욕·밀라노·코모 호수에서 실제로 꽤 많이 찍었더라. 런웨이 사옥 로비 모티브는 맨해튼의 맥그로힐 빌딩, 갈라 장면은 미국 자연사박물관 외관이 실제 촬영지다.",
      "그런데 밀라노 두오모랑 최후의 만찬 박물관은 후보로 검토만 됐고 실제로는 스튜디오 세트로 대체됐다고 확인됐다. 밀라노 가도 그 장면을 실제로 볼 순 없다는 뜻.",
      "코모 호수 쪽 빌라 발비아노는 진짜다. 극중 인물 벤지 반스의 별장으로 나오는데, 2025년 10월에는 레이디 가가가 실제로 여기서 촬영하는 모습이 포착되기도 했다더라.",
      "결말까지 찾아봤다(스포 주의). 회장 이르브가 자기 생일파티 도중 갑자기 죽는다. 감독이 직접 '의도된 장치'라고 인터뷰에서 밝혔을 정도로 확실한 전개다.",
      "이르브 아들이 경영권을 잡고 런웨이를 팔아치우려 하자, 앤디가 에밀리랑 에밀리 약혼자를 끌어들여 인수를 시도한다. 근데 에밀리가 사실 미란다를 몰아내려는 속셈이었다는 게 또 반전.",
      "결국 미란다랑 앤디가 벤지의 전 연인 사샤한테 손을 내밀어서 런웨이를 지켜낸다.",
      "제일 인상적인 장면은 밀라노 갈라다. 미란다가 급한 일로 빠지면서 나이젤한테 기조연설을 넘기는데, 사실 그 연설 자체가 나이젤이 써준 거였다는 걸 이 순간 인정한다. 20년 만에 스포트라이트를 돌려주는 장면."
    ],
    hookReveals:[
      { label:"런웨이 사옥 로비 → 맨해튼 맥그로힐 빌딩", label_en:"Runway HQ lobby → Manhattan's McGraw-Hill Building", locId:"mcgrawhillbuilding" },
      { label:"밀라노 두오모·최후의 만찬 박물관 → 실제로는 미등장(스튜디오 세트로 대체)", label_en:"Milan Duomo and the Last Supper museum → not actually shown (replaced by a studio set)", locId:"milanduomo" },
      { label:"벤지 반스의 별장 → 실존 렌탈 빌라 '빌라 발비아노'", label_en:"Benji Barnes's villa → the real rental estate Villa Balbiano", locId:"villabalbiano" },
      { label:"결말 반전 → 나이젤이 쓴 연설을 나이젤이 직접 낭독", label_en:"Final twist → Nigel delivers the very speech he secretly wrote", locId:"breraacademy" }
    ],
    hookBadge_en:"20 years in the making · Korea's world premiere · Filming locations & full spoilers",
    hookTagline_en:"New York, Milan, Lake Como — except the Duomo was actually a set",
    discoveryHook_en:[
      "The Devil Wears Prada sequel finally arrived after 20 years, and Korea got it first worldwide — April 29, two days ahead of the US.",
      "Turns out a lot of it was really shot in New York, Milan, and Lake Como. Runway's HQ lobby is Manhattan's McGraw-Hill Building; the gala scene was filmed outside the American Museum of Natural History.",
      "But the Milan Duomo and the Last Supper museum were only considered — confirmed to have been replaced by a studio set instead. So you can't actually see that scene's location in Milan.",
      "Villa Balbiano on Lake Como, though, is real. It plays Benji Barnes's villa in the film, and Lady Gaga was reportedly spotted filming there in October 2025.",
      "I looked up the ending too (spoilers). Chairman Irv dies suddenly at his own birthday party — the director confirmed in an interview it was a deliberate move.",
      "His son takes over and tries to sell off Runway, so Andy recruits Emily and her fiancé for a buyout — except it turns out Emily secretly wants to push Miranda out.",
      "In the end, Miranda and Andy reach out to Benji's ex, Sasha, to save the magazine.",
      "The most memorable scene is the Milan gala, where Miranda hands her keynote to Nigel — and admits, in that moment, that he wrote it himself all along. Twenty years of overdue credit, finally paid."
    ],
    contentSummary:{ sections:[
      { heading:"뉴욕 — 해고, 그리고 재회", bullets:[
        "저널리스트로 성장한 앤디가 소속 매체 전체 해고를 겪은 직후, 나이젤의 은밀한 추천으로 '런웨이' 신임 피처 에디터로 합류한다",
        "미란다·나이젤과 재회하고, 디올 임원이 된 에밀리와도 다시 마주친다"
      ]},
      { heading:"이르브의 죽음과 인수 전쟁", bullets:[
        "회장 이르브 라비츠가 75세 생일파티 도중 갑자기 사망하며 '런웨이'의 승계 구도가 뒤흔들린다",
        "아들 제이 라비츠가 경영권을 잡고 '런웨이' 매각을 추진하자, 앤디는 에밀리·벤지 반스를 끌어들여 인수를 시도한다"
      ]},
      { heading:"밀라노 — 배신과 반전", bullets:[
        "밀라노 패션쇼·사교 행사 장면이 이어지는 가운데, 에밀리가 인수를 이용해 미란다를 몰아내려 한다는 사실이 드러난다",
        "미란다와 앤디는 벤지의 전 연인 사샤 반스에게 손을 내밀어 반격을 준비한다"
      ]},
      { heading:"결말 — 나이젤의 스포트라이트", bullets:[
        "사샤의 인수로 '런웨이'와 미란다의 자리가 모두 지켜진다",
        "밀라노 갈라에서 미란다는 나이젤에게 기조연설을 넘기며 그가 써준 연설임을 인정한다 — 이후 인물들의 구체적인 거취는 직접 작품을 보고 확인하세요"
      ]}
    ], endingNote:"에밀리와 벤지의 관계, 그리고 앤디가 미란다에게 허락받은 책이 실제로 어떤 내용을 담게 되는지는 직접 작품을 보고 확인해 주세요." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Villa Balbiano 1.jpg", credit:"빌라 발비아노, 코모 호수(악마는 프라다를 입는다 2 실제 촬영지, 벤지 반스의 별장) · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Villa_Balbiano_1.jpg" },
    posterPage:"https://en.wikipedia.org/wiki/The_Devil_Wears_Prada_2" },
  // ===== 2026-08 10라운드 "다시 그곳" 파일럿 3편 =====
  // 기획자가 제안한 "다시 그곳" 포맷의 시작점으로 사용자가 직접 지정한 3개 작품. 방영 후 15~20여년이
  // 지나 세트/촬영지가 존재/변형/소멸이 뒤섞여 있는 게 공통점이라 정확성 검증에 특히 신경 썼다
  // (WebSearch 조사 결과, 커피프린스 카페는 폐업·방치, 겨울연가 중도·준상이네 집은 소멸, 대장금
  // 양주 원본 세트는 폐장, '대장금파크'는 원본이 아닌 후신이라는 사실 등 — 확인 안 된 촬영지는 싣지
  // 않거나 "언급됨, 구체 장면 미확인"으로 명시). 인물/장소 수는 100명/100곳 목표에 크게 못 미치지만,
  // 20년 전 방영된 TV 드라마 특성상 실제로 검증 가능한 인물·장소 자체가 이 정도가 자연스러운 상한이라
  // 억지로 채우지 않았다([[geugotjigeum_factual_accuracy]] 원칙).
  //
  // 후킹페이지(discoveryHook) 톤: 사용자 지시대로 "20대 여성 화자가 부모 세대의 콘텐츠를 뒤늦게
  // 알아가는" 구조로 전면 재설계 — 다른 작품들의 "내가 직접 다시 봤다" 1인칭 시점과는 의도적으로
  // 다른 화법이다.
  { id:"wintersonata", title:"겨울연가 (冬のソナタ)", author:"윤석호 연출 · 김은희 극본", type:"drama", country:"korea", medium:"tv_drama", lang:"ko", genres:["romance","drama"],
    era:"2002년 방영(KBS2)", title_en:"Winter Sonata", author_en:"Directed by Yoon Seok-ho", era_en:"Aired 2002 (KBS2)",
    summary:"2002년 KBS2에서 방영돼 한류의 출발점으로 꼽히는 멜로드라마. 고교 시절 삼각관계로 얽힌 준상·유진·상혁이 10년 후 재회하며 벌어지는 이야기로, 남이섬 가로수길 장면은 지금도 한류 관광의 상징으로 남아있다.",
    longSummary:"춘천고 전학생 강준상은 정유진, 김상혁과 삼각관계를 이루다 어느 날 교통사고로 실종된다. 10년 뒤, 재미(在美) 건축가 '이민형'이 된 준상이 스키장 리노베이션 프로젝트로 유진 앞에 다시 나타나면서 잊고 있던 감정들이 되살아난다.\n\n유진은 그사이 상혁과 약혼한 사이지만, 이민형이 준상일지도 모른다는 예감을 떨치지 못한다. 준상 역시 서서히 자신의 잃어버린 기억과 마주하게 되고, 세 사람은 다시 한번 선택의 기로에 선다. 남이섬의 가로수길과 자전거길, 거제 외도의 절벽 정원까지, 실제 장소들을 배경으로 펼쳐지는 이 이야기는 방영 당시 일본을 비롯한 아시아 전역에서 큰 반향을 일으켰다.",
    pinColor:"#4a72c9",
    summary_en:"A 2002 KBS2 melodrama widely credited as a starting point of the Korean Wave. Jun-sang, Yu-jin, and Sang-hyuk's high-school love triangle resurfaces ten years later — and Nami Island's tree-lined path remains an icon of hallyu tourism to this day.",
    longSummary_en:"Kang Jun-sang, a transfer student at Chuncheon High, is caught in a love triangle with Jung Yu-jin and Kim Sang-hyuk before vanishing in a car accident. Ten years later, he resurfaces as architect 'Lee Min-hyung,' reuniting with Yu-jin over a ski resort renovation project — and old feelings resurface with him.\n\nYu-jin, now engaged to Sang-hyuk, can't shake the sense that Min-hyung might be Jun-sang. Jun-sang, too, slowly confronts his lost memories, and all three are pushed toward a reckoning. Set against real locations — Namiseom's tree-lined path and bicycle trail, the clifftop gardens of Oedo Island in Geoje — the drama caused a sensation across Japan and the rest of Asia upon airing.",
    communityNote:"《겨울연가》는 윤석호 PD의 2002년 KBS2 드라마로, 이후 일본에서 폭발적인 인기를 얻으며 한류의 출발점 중 하나로 꼽힌다. 배용준·최지우·박용하·박솔미가 주연을 맡았다. 촬영지였던 남이섬은 이후 세계적 관광지로 성장했다.",
    communityNote_en:"Winter Sonata is director Yoon Seok-ho's 2002 KBS2 drama, whose explosive popularity in Japan made it one of the starting points of the Korean Wave. It starred Bae Yong-joon, Choi Ji-woo, Park Yong-ha, and Park Sol-mi. Namiseom Island, its main filming location, later grew into a world-famous tourist destination.",
    hookBadge:"2002년 KBS2 · 한류의 출발점 · 배용준 × 최지우", hookTagline:"엄마 프사가 아직도 거기다",
    discoveryHook:[
      "엄마 인스타 프로필 사진, 몇 년째 그대로다. 눈 쌓인 가로수길, 안개 낀 듯 뿌옇게 뻗은 나무 터널. 최근에 여행 다녀와서 찍은 사진이냐고 물었더니, 엄마가 웃으며 '거기 남이섬이야, 겨울연가 찍은 데'라고 했다.",
      "겨울연가라는 이름은 알았다. 정확히는 '엄마들이 좋아하는 옛날 드라마' 정도로만. 근데 정작 본 적은 없다. 2002년 드라마니까, 나 태어나기도 전 얘기다.",
      "그래서 유튜브를 뒤졌다. '겨울연가 레전드 명장면', '겨울연가 결말 정리' 이런 제목의 영상들이 조회수 수백만씩 찍혀 있었다. 20년 넘은 드라마인데 아직도 이렇게 많이 보고 있다고?",
      "몇 개 클릭해서 봤다. 화질은 요즘 드라마처럼 선명하지 않은데, 이상하게 계속 눈이 갔다. 배용준이 안경을 벗는 그 3초짜리 장면 하나에 댓글이 8천 개 넘게 달려 있었다. '이 장면 때문에 일본에서 난리 났었다'는 설명과 함께.",
      "일본 아주머니들이 배용준 보겠다고 단체로 한국까지 왔다는 얘기는 어릴 때부터 귀에 딱지가 앉도록 들었다. 그땐 그냥 '엄마들 유난이었네' 정도로 흘려들었는데, 클립 속 팬미팅 영상을 보니까 그게 과장이 아니었다는 걸 알겠더라. 공항 게이트 앞에 늘어선 인파, 우는 사람들, 손으로 쓴 플래카드.",
      "댓글 창을 계속 내리다 보니, 지금 나랑 비슷한 나이대 사람들이 '엄마 따라 봤었다', '리메이크 각인데' 이런 댓글을 남기고 있었다. 뒤늦게 발견한 게 나만은 아니었다.",
      "이번엔 실제로 촬영지를 찾아봤다. 엄마가 그렇게 좋아하던 그 가로수길, 진짜로 있었다. 지금도 남이섬에 그대로. 심지어 '겨울연가길'이라는 이름까지 붙어서 표지판까지 세워져 있었다.",
      "근데 다 남아있는 건 아니었다. 두 사람이 호숫가를 거닐던 중도유원지는 이제 레고랜드 코리아가 들어서서 그 풍경이 통째로 사라졌다. 준상이 살던 춘천 집도 2021년에 결국 철거됐다고 한다.",
      "그 얘기를 엄마한테 했더니, 잠깐 말이 없다가 '그렇구나' 하고 짧게만 답했다. 유튜브 댓글에서 봤던 그 열기랑, 지금 엄마의 담담한 침묵 사이에 뭔가 20년이라는 시간이 그대로 껴 있는 느낌이었다.",
      "그래도 결말을 찍은 거제도 외도는 아직 그대로 있다고 한다. 결말 장면 클립도 찾아봤다. 이미 다들 아는 얘기이긴 하지만, 그 마지막 장면의 공기는 직접 보는 게 나을 것 같아서 여기까진 안 쓰기로 했다.",
      "클립으로만 엄마 세대 드라마를 뒤늦게 파고들었는데도, 이게 그냥 옛날이야기가 아니라 엄마의 스물몇 살 어딘가에 진짜로 있었던 장소들이라는 게 신기했다. 화면 속 풍경이 아니라 실제로 존재하는 좌표라는 게.",
      "다음에 남이섬 갈 일 있으면, 엄마 프사 속 그 각도 그대로 한 장 찍어드려야겠다. 이번엔 나도 전편을 제대로 정주행해보고 나서."
    ],
    hookReveals:[
      { label:"남이섬 가로수길 → 지금도 그대로 있음", label_en:"Namiseom's tree-lined path → still there today", locId:"namiseom_treelined" },
      { label:"중도유원지 → 지금은 레고랜드 코리아 부지", label_en:"Jungdo Island → now the site of Legoland Korea", locId:"joongdo" },
      { label:"준상이네 집 → 2021년 철거됨", label_en:"Jun-sang's house → demolished in 2021", locId:"junsang_house" },
      { label:"외도(거제) → 최종화 결말 장소, 지금도 방문 가능", label_en:"Oedo Island → the finale's setting, still open to visitors", locId:"oedo" }
    ],
    hookBadge_en:"2002 · KBS2 · The Korean Wave's starting point · Bae Yong-joon × Choi Ji-woo",
    hookTagline_en:"Mom's profile photo is still that spot",
    discoveryHook_en:[
      "My mom's Instagram profile photo hasn't changed in years — a tree-lined path blanketed in snow, a tunnel of trees fading into a soft haze. I asked if it was from some recent trip. She laughed and said, 'That's Namiseom Island — where they filmed Winter Sonata.'",
      "I knew the name. Filed loosely under 'some old drama moms like.' I'd never actually watched it, though — it aired in 2002, before I was even born.",
      "So I went digging on YouTube. Videos titled things like 'Winter Sonata's Greatest Scenes' and 'Winter Sonata's Ending, Explained' had millions of views. A drama over twenty years old, and people are still watching it like this?",
      "I clicked through a few. The picture quality isn't as sharp as modern shows, but for some reason I kept watching. One three-second clip of Bae Yong-joon taking off his glasses had over 8,000 comments, with a caption explaining that this single moment caused a sensation in Japan.",
      "I'd heard the stories growing up — Japanese tourists flying to Korea in tour groups just to see Bae Yong-joon. I always dismissed it as my mom's generation being a little dramatic. But watching the actual fan-meeting footage in the clips, I realized it wasn't exaggerated at all — crowds lined up at the airport gate, people crying, handmade banners.",
      "Scrolling through the comments, I noticed people around my own age writing things like 'watched this with my mom growing up' or 'this needs a remake.' I wasn't the only one discovering it late.",
      "This time I actually looked up the filming locations. That tree-lined path she loves so much — it's real. It's still there, on Namiseom, even nicknamed 'Winter Sonata Road' with an actual signpost.",
      "Not everything survived, though. Jungdo Island, where they walk along the lake, is now the site of Legoland Korea — that whole landscape is gone. Jun-sang's house in Chuncheon was finally torn down in 2021.",
      "When I told my mom that, she went quiet for a second, then just said, 'I see.' Between the energy I'd seen in those YouTube comments and my mom's quiet response just now, I could feel exactly twenty years sitting in the gap.",
      "Oedo Island in Geoje, where the finale was filmed, is apparently still there. I looked up the ending clips too — everyone already knows how it goes by now, but I think that last scene is something worth watching for yourself, so I'll leave it there.",
      "Digging into a drama from my mom's generation through nothing but clips, it still hit me: these aren't just old stories. They're real places that existed somewhere in her twenties — not scenery on a screen, but actual coordinates you can stand on.",
      "Next time I'm at Namiseom, I want to take a photo at the exact same angle as her profile picture. This time, after actually watching the whole thing myself."
    ],
    contentSummary:{ sections:[
      { heading:"고교 시절 — 세 사람의 삼각관계", bullets:[
        "춘천고 전학생 준상이 유진·상혁과 삼각관계를 이루다가 교통사고로 실종된다"
      ]},
      { heading:"10년 후 — 이민형의 등장", bullets:[
        "재미 건축가 '이민형'이 스키장 리노베이션 프로젝트로 유진 앞에 나타난다",
        "이미 상혁과 약혼한 유진은 이민형이 준상일지도 모른다는 예감을 떨치지 못한다"
      ]},
      { heading:"결말 — 세 사람의 선택", bullets:[
        "준상은 서서히 잃어버린 기억과 마주하고, 거제 외도에서 두 사람이 재회한다",
        "구체적인 결말과 이후 세 사람의 관계는 작품에서 직접 확인하는 것을 권합니다"
      ]}
    ], endingNote:"실명 위기와 기억을 둘러싼 결말부는 직접 보는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Winter Sonata Nami Island.jpg", credit:"남이섬 메타세쿼이아 가로수길, 겨울연가 촬영지 · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Winter_Sonata_Nami_Island.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EA%B2%A8%EC%9A%B8%EC%97%B0%EA%B0%80" },
  { id:"coffeeprince", title:"커피프린스 1호점", author:"이윤정 연출 · 이정아·장현주 극본, 이선미 원작소설", type:"drama", country:"korea", medium:"tv_drama", lang:"ko", genres:["romance","comedy","drama"],
    era:"2007년 방영(MBC)", title_en:"Coffee Prince", author_en:"Directed by Lee Yoon-jung, based on the novel by Lee Sun-mi", era_en:"Aired 2007 (MBC)",
    summary:"2007년 MBC에서 방영된 로맨틱 코미디. 소녀가장 은찬이 남장한 채 카페 '커피프린스 1호점'에 취직하면서, 사장 한결과 겪는 오해와 사랑을 그렸다. 방영 당시 최고 시청률 27.8%를 기록했다.",
    longSummary:"소녀가장 고은찬은 절대후각을 살려 남장한 채 카페 '커피프린스 1호점'에 취직한다. 정략결혼을 피하려던 사장 최한결은 은찬을 남자로 착각한 채 '게이인 척' 연기를 제안하지만, 함께 시간을 보내며 진심으로 사랑에 빠지게 된다.\n\n한결의 사촌형 한성과 화가 유주의 이별·재회, 커피프린스 식구들의 각자 사연까지 얽히며 이야기는 다층적으로 전개된다. 실제 카페 세트가 있던 서교동 건물은 방영 후 오랫동안 팬들의 성지가 됐다.",
    pinColor:"#a8703a",
    summary_en:"A 2007 MBC romantic comedy in which Eun-chan, disguised as a man to support her family, takes a job at the café 'Coffee Prince 1st Shop' and falls into a misunderstanding-turned-romance with its owner, Han-gyeol. It peaked at a 27.8% rating during its original run.",
    longSummary_en:"Go Eun-chan, the breadwinner for her family, uses her exceptional sense of smell to land a job at the café 'Coffee Prince 1st Shop' while disguised as a man. Choi Han-gyeol, the owner trying to dodge an arranged marriage, mistakes her for a man and proposes they pretend he's gay — but genuine feelings develop as they spend time together.\n\nThe story widens to include Han-gyeol's cousin Han-sung's on-and-off relationship with painter Yu-ju, and the individual stories of the café's staff. The Seogyo-dong building that housed the real café set became a long-running fan pilgrimage site after the show aired.",
    communityNote:"《커피프린스 1호점》은 2007년 MBC 드라마로, 공유·윤은혜·이선균·채정안이 주연을 맡았다. 남장 여자 설정과 로맨틱 코미디 장르를 대중적으로 안착시킨 작품으로 꼽힌다.",
    communityNote_en:"Coffee Prince is a 2007 MBC drama starring Gong Yoo, Yoon Eun-hye, Lee Sun-kyun, and Chae Jung-an. It's widely credited with popularizing the cross-dressing romantic-comedy setup in Korean television.",
    hookBadge:"2007년 MBC · 최고 시청률 27.8% · 공유 × 윤은혜", hookTagline:"엄마 애창곡이 이 드라마 OST였다",
    discoveryHook:[
      "엄마 노래방 애창곡 리스트에 넬(Nell)의 노래가 아직도 박혀 있다. 무슨 노래냐고 물었더니, 엄마가 대뜸 '커피프린스 OST잖아' 하면서 흥얼거리기 시작했다.",
      "2007년 드라마라고 했다. 나는 태어나지도 않았을 때다. 근데 엄마 얘기를 들어보니 그냥 옛날 드라마 취급할 게 아니었다. 그때 이거 보고 홍대까지 일부러 카페 찾아갔었다고, 약간 뿌듯한 표정으로 얘기했다.",
      "유튜브에 '커피프린스 명장면', '공유 윤은혜 케미'로 검색해봤다. 편집 영상 몇 개가 조회수 몇백만씩, 댓글도 수천 개씩 달려 있었다. 2020년대에 올라온 '커피프린스 재조명' 관련 뉴스 클립까지 있었다.",
      "줄거리만 들으면 좀 낯간지럽다. 여자가 남장하고 카페에 취직하고, 사장은 그 여자를 남자로 착각한 채 '게이인 척'을 제안하고. 근데 클립으로 본 두 사람 케미는 생각보다 자연스러웠다. 공유가 놀란 표정으로 정색하다가 웃음이 새는 그 타이밍, 요즘 편집으로 봐도 안 촌스러웠다.",
      "엄마 말로는 그때 최고 시청률이 27.8%였다고 한다. 요즘 기준으로 치면 거의 전 국민이 같은 시간에 같은 채널을 보고 있었다는 소리다. 나로서는 잘 상상이 안 되는 숫자다.",
      "그 카페 진짜 있었냐고 물어봤다. 실제로 서교동에 있었다고, 홍대입구역에서 언덕길 올라가는 자리라고 했다. 그럼 지금도 있냐고 물었더니 엄마도 모른다고 했다. 그래서 직접 찾아봤다.",
      "찾아보니 지금은... 폐업 상태였다. 5~6년째 방치돼서 100억짜리 매물로 나와있다는 기사까지 있었다. 유튜브에 '커피프린스 카페 근황'이라는 제목으로 올라온 영상에는 유리창에 먼지 쌓인 지금 모습이 그대로 찍혀 있었다. 엄마 추억의 장소가 이렇게 변했다는 게 좀 이상한 기분이었다.",
      "대신 최한성(이선균) 집으로 나온 부암동 산모퉁이 카페는 지금도 그대로 영업 중이라고 한다. 반려견이랑 같이 살던 그 집.",
      "엄마한테 커피프린스 카페 없어졌다고 했더니 되게 아쉬워했다. '거기 진짜 예뻤는데' 하면서, 잠깐 그때 얘기를 이어갔다. 그날 처음 알았다. 엄마도 스물몇 살 때가 있었다는 걸, 새삼스럽게.",
      "그때 엄마 나이가 지금 내 나이쯤이었다는 게 신기했다. 20년 다 되어가는 드라마인데 엄마한테는 여전히 '그때 그 드라마'인 거다. 나한테는 유튜브 알고리즘이 띄워준 몇 분짜리 클립인데.",
      "산모퉁이 카페는 아직 있다니까, 이번 주말에 엄마 데리고 한번 가볼까 한다. 카페 세트는 사라졌어도 최소한 한 곳은 그대로 남아있다는 게 다행이다. 가서 넬 노래도 한번 틀어봐야겠다."
    ],
    hookReveals:[
      { label:"커피프린스 1호점 카페 → 현재 폐업·방치, 매물로 나옴", label_en:"The café set → closed, abandoned, listed for sale", locId:"coffeeprince_cafe" },
      { label:"산모퉁이 카페(최한성의 집) → 지금도 정상 영업 중", label_en:"Sanmotungi Café (Han-sung's house) → still open today", locId:"sanmotungi_cafe" }
    ],
    hookBadge_en:"2007 · MBC · Peaked at 27.8% ratings · Gong Yoo × Yoon Eun-hye",
    hookTagline_en:"Mom's karaoke go-to was this show's OST",
    discoveryHook_en:[
      "There's still a Nell song sitting in my mom's karaoke favorites. I asked what it was, and she immediately said, 'That's from Coffee Prince,' and started humming it.",
      "It's a 2007 drama — I wasn't even born yet. But from the way my mom told it, this wasn't just some old show. She said, with a hint of pride, that she'd made a special trip out to Hongdae back then just to find the café.",
      "I searched YouTube for 'Coffee Prince best scenes' and 'Gong Yoo Yoon Eun-hye chemistry.' A few edited compilations had millions of views and thousands of comments each — there was even a recent news clip about a 'Coffee Prince re-discovery boom.'",
      "The plot sounds a little cringe on paper: a woman disguised as a man gets a job at a café, and the owner, mistaking her for a man, proposes they pretend he's gay. But the chemistry in the clips was more natural than I expected — that beat where Gong Yoo's shocked expression cracks into a laugh still landed, even by today's editing standards.",
      "My mom says the show peaked at a 27.8% rating. By today's standards, that basically means the entire country was watching the same channel at the same time. It's a number I can't quite picture.",
      "I asked if the café was actually real. Apparently it was, in Seogyo-dong, up the hill from Hongik Univ. Station. When I asked if it was still there, even my mom didn't know. So I looked it up myself.",
      "Turns out it's... closed. Abandoned for five or six years, even listed for sale for ₩10 billion in one article. A YouTube video titled something like 'Coffee Prince café today' showed the dusty windows exactly as they are now. It felt strange that my mom's nostalgic spot had ended up like that.",
      "The house that played Han-sung's (Lee Sun-kyun) home, Sanmotungi Café in Buam-dong, is apparently still open for business, though — same place with the dog he lived with.",
      "When I told my mom the café set was gone, she seemed genuinely disappointed. 'That place was so pretty,' she said, and kept talking about that time for a bit. That was the first time it really landed for me — that my mom had a twenties, too.",
      "It's a little strange to realize she was about my age back then. A drama pushing twenty years old, and to her it's still just 'that show from back then.' To me, it's a few-minute clip my YouTube algorithm happened to serve up.",
      "Since Sanmotungi Café is still around, I might take her this weekend. Even if the original set is gone, it's a relief that at least one place is still standing. I'll queue up that Nell song while we're there."
    ],
    contentSummary:{ sections:[
      { heading:"위장 취업 — 남장한 소녀가장", bullets:[
        "소녀가장 은찬이 절대후각을 살려 남장한 채 커피프린스에 취직한다",
        "정략결혼을 피하려던 한결이 은찬을 남자로 착각해 '게이인 척' 연기를 제안한다"
      ]},
      { heading:"함께한 시간, 진짜가 된 마음", bullets:[
        "함께 카페를 꾸려가며 두 사람은 진심으로 서로에게 끌린다",
        "한성과 유주의 이별·재회, 커피프린스 식구들의 각자 사연도 함께 펼쳐진다"
      ]},
      { heading:"결말 — 정체를 알게 된 후", bullets:[
        "한결은 결국 은찬이 여자라는 사실을 알게 된다",
        "이후 두 사람의 선택과 관계가 어떻게 마무리되는지는 작품에서 직접 확인하는 것을 권합니다"
      ]}
    ], endingNote:"정체가 밝혀진 후 두 사람이 내리는 선택은 직접 보는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Korea-Seoul-Changuimun-01.jpg", credit:"부암동 창의문 일대 — 최한성의 집으로 등장한 산모퉁이 카페가 있는 동네 · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Korea-Seoul-Changuimun-01.jpg" },
    posterPage:"https://ko.wikipedia.org/wiki/%EC%BB%A4%ED%94%BC%ED%94%84%EB%A6%B0%EC%8A%A4_1%ED%98%B8%EC%A0%90" },
  { id:"daejanggeum", title:"대장금", author:"이병훈 연출 · 김영현 극본", type:"drama", country:"korea", medium:"tv_drama", lang:"ko", genres:["historical","drama"],
    era:"2003~2004년 방영(MBC) · 조선 중종 시대(16세기) 배경", title_en:"Dae Jang Geum (Jewel in the Palace)", author_en:"Directed by Lee Byung-hoon", era_en:"Aired 2003–2004 (MBC) · Set in 16th-century Joseon, reign of King Jungjong",
    summary:"2003~2004년 MBC에서 방영돼 91개국에 수출된 사극. 수라간 궁녀 출신 장금이 조선 최초의 여성 어의가 되기까지의 여정을 그렸다. 『조선왕조실록』에 실제로 등장하는 의녀 '대장금'이 모티브다.",
    longSummary:"수라간 궁녀 서장금은 모함으로 위기를 겪으면서도 뛰어난 요리 실력으로 중종의 신임을 얻는다. 이후 제주로 유배돼 의녀 수업을 받게 되고, 다시 궁으로 돌아와 조선 최초의 여성 어의로 임금의 주치의 역할을 맡게 된다.\n\n수라간 최고상궁 가문과의 대립, 스승 한상궁과의 인연, 민정호와의 로맨스가 얽히며 이야기가 전개된다. 극의 모티브가 된 실존 의녀 '대장금'은 『조선왕조실록』 중종실록에 짧게 기록돼 있으나, 구체적인 가족관계·연애사는 모두 드라마의 창작이다.",
    pinColor:"#b8863a",
    summary_en:"A 2003–2004 MBC period drama exported to 91 countries. It follows Jang-geum, a royal-kitchen court lady, on her journey to becoming Joseon's first female royal physician — inspired by a real court lady named 'Dae Jang Geum' recorded in the Joseon Wangjo Sillok.",
    longSummary_en:"Seo Jang-geum, a court lady in the royal kitchen, survives repeated schemes against her and wins King Jungjong's trust through her culinary skill. She's later exiled to Jeju, where she trains as a physician, before returning to the palace as Joseon's first female royal physician.\n\nHer story unfolds through rivalry with the powerful head-court-lady family of the royal kitchen, her bond with her mentor Han-sanggung, and a romance with Min Jeong-ho. The real court lady who inspired the drama, 'Dae Jang Geum,' is briefly recorded in the Jungjong Sillok section of the Joseon Wangjo Sillok, though her family background and romantic life in the drama are entirely fictional.",
    communityNote:"《대장금》은 이병훈 PD의 2003~2004년 MBC 드라마로, 이영애·지진희가 주연을 맡았다. 아시아를 넘어 중동·아프리카까지 91개국에 수출되며 한류를 세계적으로 확산시킨 대표작으로 꼽힌다.",
    communityNote_en:"Dae Jang Geum is director Lee Byung-hoon's 2003–2004 MBC drama, starring Lee Young-ae and Ji Jin-hee. Exported to 91 countries across Asia, the Middle East, and Africa, it's considered one of the dramas that carried the Korean Wave to a truly global audience.",
    hookBadge:"2003년 MBC · 91개국 수출 · 이영애 주연", hookTagline:"엄마 서랍 속 다이어리, 표지가 장금이였다",
    discoveryHook:[
      "엄마 서랍 정리를 도와드리다가 낡은 다이어리 하나를 발견했다. 표지에 한복 입은 여자 사진이 붙어 있길래 물었더니, '어, 그거 대장금 다이어리야. 2004년쯤 산 건데' 하면서 반가운 표정을 지었다.",
      "대장금이 뭐가 그렇게 대단했냐고 물었다. 엄마가 '그때 전 세계가 이 드라마 봤어'라고 했다. 좀 과장 아닌가 싶었는데, 검색해보니 진짜 91개국에 수출됐다는 기록이 나왔다.",
      "유튜브에 '대장금 레전드 장면', '대장금 수라간 대결'로 검색해봤다. 조회수 몇백만짜리 클립들이 줄줄이 나왔다. 특히 홍시 하나로 궁중 요리 대결에서 이기는 장면 — 댓글 창에 '이 장면 때문에 요리 공부 시작했다'는 사람까지 있었다.",
      "사극이라 좀 무겁지 않을까 했는데, 클립으로 몇 개 보니까 생각보다 흡입력이 있었다. 특히 이영애가 화면 정면을 응시하며 대사를 치는 그 특유의 표정, 요즘 배우들 연기랑 결이 다르면서도 왜 계속 눈이 가는지 알 것 같았다.",
      "더 놀란 건, '장금'이라는 이름이 그냥 지어낸 캐릭터가 아니라는 거였다. 조선왕조실록에 실제로 나온다. 중종 때 활약한 의녀 '대장금'. 물론 실록에는 몇 줄 안 남아있고, 드라마 속 가족관계나 연애사는 다 창작이라고 한다.",
      "그래도 실존 기록이 있다는 것 자체가 신기했다. 유튜브에 '대장금 진짜 역사'라는 다큐 클립도 있어서 몇 개 봤다. 실록에 남은 짧은 문장 하나를 두고 이렇게 긴 이야기를 상상해서 만들었다는 게 새삼 대단하게 느껴졌다.",
      "촬영지도 찾아봤는데, 이게 좀 복잡했다. 원래 촬영을 위해 경기 양주에 세트장을 아예 새로 지었었는데, 2011년에 문을 닫았다고 한다. 지금 사람들이 '대장금파크'라고 알고 있는 용인 쪽 세트장은 사실 그 원본이 아니다. 원래 다른 사극 세트장이었다가 2015년에 이름만 대장금으로 바꾼 곳이라고.",
      "엄마한테 이 얘기 했더니 '어 그래? 난 몰랐네' 하면서 오히려 흥미로워했다. 20년째 다이어리를 갖고 있던 엄마도 모르던 뒷얘기였던 거다. 괜히 내가 좀 뿌듯했다.",
      "제주에는 진짜 장금이 유배 갔던 장면을 찍은 곳이 남아있다고 한다. 제주민속촌. 지금도 그때 촬영 안내판이랑 소품 전시가 있다더라. 유튜브 브이로그 중에 실제로 그 안내판 앞에서 인증샷 찍는 영상도 있었다.",
      "엄마 세대한테 '국민 드라마'였다는 게 정확히 어떤 느낌인지는 모르겠지만, 다이어리 한 권을 20년 넘게 안 버리고 갖고 있는 걸 보면 뭔가 알 것도 같다. 나한테 대장금은 유튜브 알고리즘이 띄워준 몇 개 클립이지만, 엄마한테는 그 다이어리를 사던 스물몇 살의 어느 하루였을 거다.",
      "다음에 제주 갈 일 있으면 민속촌에 한번 들러야겠다. 이번엔 클립 말고 정주행부터 해보고."
    ],
    hookReveals:[
      { label:"'대장금' → 조선왕조실록에 실제로 기록된 의녀", label_en:"'Dae Jang Geum' → a real court lady recorded in the Joseon Wangjo Sillok", locId:"jeju_folk_village" },
      { label:"양주 원본 세트장 → 2011년 폐장", label_en:"The original Yangju set → closed in 2011", locId:"yangju_theme_park" },
      { label:"'대장금파크'(용인) → 원본이 아닌 2015년 개칭 후신", label_en:"'Daejanggeum Park' (Yongin) → not the original, renamed in 2015", locId:"yongin_daejanggeum_park" }
    ],
    hookBadge_en:"2003 · MBC · Exported to 91 countries · Starring Lee Young-ae",
    hookTagline_en:"Her diary in Mom's drawer had Jang-geum on the cover",
    discoveryHook_en:[
      "There's still a Dae Jang Geum diary in my mom's drawer — bought around 2004, with Lee Young-ae's photo on the cover.",
      "I asked what was so special about it. She said, 'The whole world was watching this back then.' Sounded like an exaggeration, until I found out it really was exported to 91 countries.",
      "What surprised me more was that 'Jang-geum' isn't just a made-up character. She actually appears in the Joseon Wangjo Sillok — a court physician named 'Dae Jang Geum' who served under King Jungjong.",
      "Granted, the historical record is only a few lines, and the drama's version of her family and love life is entirely invented. Still, it was strange to learn there's a real record behind it at all.",
      "I looked into the filming locations too, and it got complicated fast. A set was originally built from scratch in Yangju, Gyeonggi-do, just for this drama — but it closed in 2011.",
      "The 'Daejanggeum Park' most people know today, in Yongin, actually isn't the original. It used to be a different historical-drama backlot, only renamed after Dae Jang Geum in 2015.",
      "When I told my mom this, she said, 'Oh really? I didn't know that,' clearly intrigued — even she didn't know the backstory.",
      "In Jeju, apparently, the real filming spot for Jang-geum's exile scenes is still there — the Jeju Folk Village, complete with a filming-location sign and a small prop exhibit.",
      "I still don't fully know what it meant to my mom's generation for something to be a 'national drama' — but seeing her hold onto a diary for over twenty years, I think I get a small piece of it."
    ],
    contentSummary:{ sections:[
      { heading:"수라간 궁녀 — 위기와 신임", bullets:[
        "수라간 궁녀 장금이 모함으로 위기를 겪으면서도 뛰어난 요리 실력으로 중종의 신임을 얻는다"
      ]},
      { heading:"제주 유배 — 의녀 수업", bullets:[
        "장금은 제주로 유배돼 의녀 수업을 받으며 새로운 길을 걷는다",
        "스승 한상궁과의 인연, 민정호와의 로맨스가 함께 그려진다"
      ]},
      { heading:"결말 — 조선 최초의 여성 어의", bullets:[
        "장금은 다시 궁으로 돌아와 조선 최초의 여성 어의로 임금의 주치의 역할을 맡게 된다",
        "이후 장금이 맞이하는 구체적인 결말은 작품에서 직접 확인하는 것을 권합니다"
      ]}
    ], endingNote:"장금이 최종적으로 어떤 선택을 내리는지는 직접 보는 것을 권합니다." },
    heroImage:{ url:"https://commons.wikimedia.org/wiki/Special:FilePath/Naganeupseong Folk Village MS3656.JPG", credit:"낙안읍성 민속마을, 대장금 장터·백정마을 장면 촬영지 · Wikimedia Commons", creditUrl:"https://commons.wikimedia.org/wiki/File:Naganeupseong_Folk_Village_MS3656.JPG" },
    posterPage:"https://ko.wikipedia.org/wiki/%EB%8C%80%EC%9E%A5%EA%B8%88" }
];

// 작품 고유 해시태그 — 장소별 태그에 실제 게시물이 없을 때를 대비한 안전망으로 항상 함께 노출된다.
// (팬들이 촬영지·순례지 인증에 가장 흔하게 쓰는 태그이기도 함)
// 장소·인물 제안하기: 2026-08부터 미완성 구글폼 임베드 대신, geugotjigeum@gmail.com로
// 안내하는 정적 텍스트 모달로 교체했다 (openReportModal/closeReportModal, index.html #reportModal 참고).

const WORK_HASHTAGS = {
  daemang:"대망",
  kiminonawa:"너의이름은",
  suzume:"스즈메의문단속",
  poksshak:"폭싹속았수다",
  santi:"삼체",
  breakingbad:"BreakingBad",
  harrypotter:"HarryPotter",
  kdemonhunters:"케이팝데몬헌터스",
  gameofthrones:"GameOfThrones",
  wednesday:"Wednesday",
  strangerthings:"StrangerThings",
  squidgame:"오징어게임",
  emilyinparis:"EmilyInParis",
  bridgerton:"Bridgerton",
  lotr:"LordOfTheRings",
  moneyheist:"MoneyHeist",
  onepiece:"원피스",
  jikji:"직지",
  glory:"더글로리",
  woo:"이상한변호사우영우",
  taebaek:"태백산맥",
  sunshine:"미스터션샤인",
  pachinko:"파친코",
  namiya:"나미야잡화점의기적",
  suspectx:"용의자X의헌신",
  byakuya:"백야행",
  kimetsu:"귀멸의칼날",
  hope:"호프",
  odyssey:"오디세이",
  dokkaebi:"도깨비",
  gwandong:"관동별곡",
  wangsanam:"왕과사는남자",
  spiderman:"SpiderManHomecoming",
  sonyeon:"소년이온다",
  priests:"검은사제들",
  littleforest:"리틀포레스트",
  isatong:"이사랑통역되나요",
  conanhighway:"명탐정코난하이웨이의타천사",
  prada2:"악마는프라다를입는다2",
  wintersonata:"겨울연가",
  coffeeprince:"커피프린스1호점",
  daejanggeum:"대장금"
};

// 작품 진입 시 초기 지도 중심/줌 — 장소들이 여러 대륙에 걸쳐 있는 작품은
// 전체 장소를 fitBounds로 한번에 담으면 지도 중심이 바다나 엉뚱한 제3국(예: 두 대륙의 중간점)에
// 찍히는 문제가 있어, 작품의 실질적 '본거지'를 기준으로 초기 화면을 고정한다.
// (개별 장소는 클릭 시 각자의 위치로 날아가므로, 이 값은 '처음 진입했을 때 보이는 화면'에만 영향을 준다.)
const WORK_MAP_HOME = {
  // 직지: 이 작품은 청주시를 알리기 위해 선정된 콘텐츠 — 유럽 장소도 있지만 시작 화면은 반드시 청주.
  jikji:      { center:[127.4577, 36.6153], zoom:6.4 },
  // 삼체: 실제 지구 장소가 중국~파나마~뉴욕까지 흩어져 있지만, 이야기의 실질적 출발점은 중국.
  santi:      { center:[116.4074, 39.9042], zoom:3.6 },
  // 종이의 집: 마드리드가 이야기의 실질적 중심(조폐국 강탈극의 배경 도시).
  moneyheist: { center:[-3.7038, 40.4168], zoom:5.6 },
  // 원피스: 세계관 자체는 가상이라 실제 좌표가 없음 — 원작자 오다 에이이치로의 고향인
  // 구마모토(지진 이후 원피스 동상이 실제로 세워진 곳)를 기준점으로 삼는다.
  onepiece:   { center:[130.7417, 32.7898], zoom:8.6 },
  // 미스터 션샤인: 장소가 서울(정동·경복궁·종로)~인천~강화~논산~대전~미국까지 넓게 흩어져 있지만,
  // 이야기의 실질적 배경(대한제국 정궁·다섯 주인공이 얽히는 무대)은 한성(현 서울) 정동 일대이므로
  // 초기 화면은 덕수궁·경운궁 인근을 중심으로 고정한다.
  sunshine:   { center:[126.9760, 37.5700], zoom:11.5 },
  // 태백산맥: 장소 대부분은 벌교·보성·순천·여수·지리산에 모여 있지만, 하와이·미얀마 등 극소수
  // 장소가 지구 반대편 경도(서경 -157도)에 있어, 지도 라이브러리가 경도를 단순 최소/최대로 계산하면
  // 태평양을 가로지르는 대신 지구를 반대로 돌아 대서양 한가운데(아프리카 서해안 인근)를 중심으로
  // 잡는 버그가 있었다(2026-08 발견). 소설의 실질적 무대인 벌교읍을 고정 시작점으로 삼아 방지한다.
  taebaek:    { center:[127.3508, 34.8447], zoom:11 },
  // 웬즈데이: 극중 무대(네버모어 아카데미, 미국 버몬트주 제리코)는 완전한 가상의 장소라 실제 좌표가
  // 없다. 실제로 촬영된 곳은 루마니아(칸타쿠지노 성·부프테아 스튜디오 등 8곳)와 아일랜드(4곳)로,
  // 두 나라 사이의 단순 중간값(경도 9도 부근)을 잡으면 프랑스·독일 국경 근처 등 촬영과 무관한
  // 엉뚱한 지점이 뜨는 문제가 있었다. 실제 촬영지의 다수를 차지하는 루마니아 부쿠레슈티·부프테아
  // 스튜디오 일대(네버모어 아카데미 외경 촬영지)를 시작 화면으로 고정한다.
  wednesday:  { center:[25.85, 44.75], zoom:8.6 },
  // 파친코: 장소가 부산 영도~오사카 이카이노~도쿄~요코하마~미국까지 3개국에 걸쳐 흩어져 있지만,
  // 이야기의 실질적 출발점이자 선자의 고향인 부산 영도를 초기 화면으로 고정한다(taebaek·sunshine과 동일 원칙).
  pachinko:   { center:[129.0603, 35.0910], zoom:12 },
  // 나미야 잡화점의 기적: 장소가 오이타(분고타카다)~오사카~아이치~도쿄까지 흩어져 있지만,
  // 실제 방문 가능한 핵심 명소(영화 촬영지)가 있는 분고타카다 쇼와노마치를 시작 화면으로 고정한다.
  namiya:     { center:[131.4487, 33.5644], zoom:13 },
  // 용의자 X의 헌신: 실제 배경인 도쿄 고토구 후카가와(신오하시 일대)를 시작 화면으로 고정한다.
  suspectx:   { center:[139.7919, 35.6850], zoom:14.5 },
  // 백야행: 실제 배경인 오사카 히가시오사카시 후세를 시작 화면으로 고정한다.
  byakuya:    { center:[135.5985, 34.6493], zoom:12 },
  // 귀멸의 칼날: 가상의 다이쇼시대 배경이라 대부분 장소가 좌표 없이(작품 설정) 등록돼 있고,
  // 좌표가 있는 실제/추정 장소도 후쿠오카(다자이후)~사이타마(치치부)~오사카까지 일본 전역에 흩어져
  // 있다. 이야기의 실질적 활동 무대인 간토(도쿄) 일대를 시작 화면으로 고정한다.
  kimetsu:    { center:[139.75, 35.68], zoom:6.2 },
  // 호프: 숲 장면은 루마니아에서 촬영됐지만, 사용자 요청에 따라 이야기의 실질적 주 무대인
  // 한국(전남 해남군 남창리)을 시작 화면으로 고정한다 — taebaek·sunshine·pachinko와 동일 원칙.
  hope:       { center:[126.7475, 34.5510], zoom:12 },
  // 오디세이: 실제 촬영지·신화 지리가 지중해~대서양~아이슬란드까지 넓게 흩어져 있어, 이야기의
  // 실질적 중심인 지중해(이타카 실제 위치 인근)를 기준으로 초기 화면을 고정한다.
  odyssey:    { center:[19.0, 37.5], zoom:3.4 },
  // 도깨비: 장소가 한국(서울·인천·경기·강원·전남)과 캐나다 퀘벡시티까지 흩어져 있지만, 이야기의
  // 실질적 상징 장면(최초 소환)이 벌어진 강릉 주문진을 시작 화면으로 고정한다(taebaek·pachinko·hope와 동일 원칙).
  dokkaebi:   { center:[128.8256, 37.8998], zoom:6.2 },
  // 관동별곡: 내금강(북한)부터 경북 울진까지 남북으로 넓게 흩어져 있어, 관동팔경의 중심이자
  // 가장 유명한 구절(세 개의 달)의 배경인 강릉 경포대를 시작 화면으로 고정한다.
  gwandong:   { center:[128.35, 38.3], zoom:6.4 },
  // 왕과 사는 남자: 장소가 영월~서울~대구~강화도까지 흩어져 있지만, 이야기의 실질적 무대이자
  // 단종 유배~죽음의 현장인 영월(청령포·장릉 일대)을 시작 화면으로 고정한다.
  wangsanam:  { center:[128.47, 37.19], zoom:11 },
  // 스파이더맨: 홈커밍: 실제 촬영지는 애틀랜타가 압도적으로 많지만(25곳 중 13곳), 이야기의 실질적
  // 무대는 뉴욕 퀸즈다(taebaek·pachinko·hope와 동일 원칙 — 실제 촬영지가 아니라 '이야기의 진짜 무대'를
  // 기준으로 삼는다). 장소가 뉴욕~애틀랜타~워싱턴DC~베를린까지 두 대륙에 걸쳐 있어, 단순 fitBounds는
  // 대서양 한가운데를 중심으로 잡는 문제가 있다. 피터의 아파트가 있는 퀸즈 롱아일랜드시티를 시작 화면으로 고정.
  spiderman:  { center:[-73.93, 40.75], zoom:10.5 },
  // 소년이 온다: 모든 장소가 광주 원도심(옛 전남도청·상무관·금남로 일대)에 밀집돼 있어, 그 중심을 시작 화면으로 고정한다.
  sonyeon:    { center:[126.9172, 35.1470], zoom:14 },
  // 검은 사제들: 촬영지가 대구 시내(계산성당·동성로·앞산 자락)에 모여 있어, 핵심 촬영지인 계산성당을 시작 화면으로 고정한다.
  priests:    { center:[128.5934, 35.8717], zoom:13 },
  // 리틀 포레스트: 촬영지가 군위~의성에 걸쳐 있지만, 이야기의 실질적 무대인 혜원의 집(군위 우보면)을 시작 화면으로 고정한다.
  littleforest: { center:[128.5735, 36.1968], zoom:11 },
  // 이 사랑 통역 되나요?: 장소가 일본~캐나다~이탈리아~한국까지 4개국에 걸쳐 있지만, 두 주인공이
  // 처음 만나는 이야기의 실질적 출발점인 가마쿠라·에노시마를 시작 화면으로 고정한다(pachinko·spiderman과 동일 원칙).
  isatong: { center:[139.49, 35.30], zoom:12.5 },
  // 명탐정 코난: 하이웨이의 타천사: 장소가 요코하마 미나토미라이~하코네까지 걸쳐 있지만, 이야기의
  // 실질적 출발점이자 가장 많은 장소가 몰린 요코하마 미나토미라이를 시작 화면으로 고정한다.
  conanhighway: { center:[139.6350, 35.4550], zoom:12.5 },
  // 악마는 프라다를 입는다 2: 장소가 뉴욕~밀라노~코모 호수까지 두 대륙에 걸쳐 있어(spiderman과 동일
  // 문제), 단순 fitBounds는 대서양 한가운데를 중심으로 잡는다. 시리즈의 실질적 무대이자 '런웨이' 본사가
  // 있는 뉴욕 맨해튼을 시작 화면으로 고정한다.
  prada2: { center:[-73.9776, 40.7614], zoom:10.5 },
  // 겨울연가: 장소가 춘천~남이섬~용평~거제까지 흩어져 있지만, 이야기의 상징이자 가장 많이
  // 찾는 남이섬 가로수길을 시작 화면으로 고정한다.
  wintersonata: { center:[127.5253, 37.7908], zoom:12.5 },
  // 커피프린스 1호점: 장소가 서교동~부암동에 걸쳐 있어, 극의 실질적 무대인 서교동 카페 세트를 시작 화면으로 고정한다.
  coffeeprince: { center:[126.9210, 37.5545], zoom:14 },
  // 대장금: 장소가 양주~용인~제주~순천~서울~수원까지 전국에 흩어져 있어, 이야기의 실질적
  // 출발점인 궁중(경복궁 소주방)을 시작 화면으로 고정한다.
  daejanggeum: { center:[126.9770, 37.5788], zoom:6.5 }
};

// 영어권 작품 전용 — 팬 커뮤니티 레딧 서브레딧. 장소별이 아니라 작품 단위 안전망 링크로 노출된다.
const WORK_REDDIT = {
  breakingbad:"breakingbad",
  harrypotter:"harrypotter",
  gameofthrones:"gameofthrones",
  wednesday:"Wednesday",
  strangerthings:"StrangerThings",
  emilyinparis:"EmilyInParis",
  bridgerton:"bridgerton",
  lotr:"lotr",
  moneyheist:"MoneyHeist",
  spiderman:"SpidermanHomecoming",
  prada2:"DevilWearsPrada"
};

/* ============================================================
   국가·매체·장르 분류 체계 (2026-08 신규) — WORKS[].country / medium / genres 필드와 짝을 이룸.
   작품이 계속 늘어나면서 랜딩 화면·헤더 작품 목록이 감당 안 될 정도로 길어져,
   필터·검색 UI를 위해 도입. label/label_en으로 다국어 표시.
   ============================================================ */
const COUNTRY_TAXONOMY = {
  korea: { label:"한국", label_en:"Korea", label_ja:"韓国" },
  japan: { label:"일본", label_en:"Japan", label_ja:"日本" },
  usa:   { label:"미국", label_en:"USA", label_ja:"アメリカ" },
  china: { label:"중국", label_en:"China", label_ja:"中国" },
  uk:    { label:"영국", label_en:"UK", label_ja:"イギリス" },
  spain: { label:"스페인", label_en:"Spain", label_ja:"スペイン" }
};

// 랜딩 화면 카드·필터 칩·헤더 작품 목록이 모두 이 순서를 기준으로 정렬된다(2026-08 신규).
// 새 작품이 추가되면 WORKS[] 맨 뒤에 push되는 기존 관행 그대로 유지하면 되고,
// 화면에 그릴 때만 이 순서로 정렬하므로 "같은 국가 안에서는 등록된 순서, 국가 사이에서는
// 이 배열의 순서"가 항상 자동으로 지켜진다 — WORKS[] 자체를 국가별로 손으로 재배치할 필요가 없다.
const COUNTRY_ORDER = Object.keys(COUNTRY_TAXONOMY);
// 정렬 대상에 country 값이 없거나 COUNTRY_ORDER에 없는 낯선 값이 섞여 있어도 에러 없이
// 맨 뒤로 보내는 안전한 헬퍼. Array.prototype.sort는 안정 정렬(stable sort)이라
// 같은 국가 안에서는 원래 배열 순서(=등록 순서)가 그대로 유지된다.
function sortByCountryOrder(list, getCountry){
  return list.slice().sort(function(a, b){
    const ia = COUNTRY_ORDER.indexOf(getCountry(a));
    const ib = COUNTRY_ORDER.indexOf(getCountry(b));
    return (ia === -1 ? COUNTRY_ORDER.length : ia) - (ib === -1 ? COUNTRY_ORDER.length : ib);
  });
}

const MEDIUM_TAXONOMY = {
  novel:        { label:"소설", label_en:"Novel", label_ja:"小説" },
  anime_film:   { label:"애니메이션 영화", label_en:"Anime Film", label_ja:"アニメ映画" },
  anime_series: { label:"애니메이션 시리즈", label_en:"Anime Series", label_ja:"アニメシリーズ" },
  film:         { label:"영화", label_en:"Film", label_ja:"映画" },
  tv_drama:     { label:"TV 드라마", label_en:"TV Drama", label_ja:"TVドラマ" }
};

const GENRE_TAXONOMY = {
  historical: { label:"역사", label_en:"Historical", label_ja:"歴史" },
  fantasy:    { label:"판타지", label_en:"Fantasy", label_ja:"ファンタジー" },
  scifi:      { label:"SF", label_en:"Sci-Fi", label_ja:"SF" },
  thriller:   { label:"스릴러", label_en:"Thriller", label_ja:"スリラー" },
  romance:    { label:"로맨스", label_en:"Romance", label_ja:"ロマンス" },
  crime:      { label:"범죄", label_en:"Crime", label_ja:"犯罪" },
  mystery:    { label:"미스터리", label_en:"Mystery", label_ja:"ミステリー" },
  drama:      { label:"드라마", label_en:"Drama", label_ja:"ドラマ" },
  adventure:  { label:"모험", label_en:"Adventure", label_ja:"冒険" },
  comedy:     { label:"코미디", label_en:"Comedy", label_ja:"コメディ" },
  horror:     { label:"호러", label_en:"Horror", label_ja:"ホラー" },
  action:     { label:"액션", label_en:"Action", label_ja:"アクション" },
  musical:    { label:"뮤지컬", label_en:"Musical", label_ja:"ミュージカル" },
  war:        { label:"전쟁", label_en:"War", label_ja:"戦争" },
  // 2026-08 추가: 파친코(pachinko)가 genres:["historical","drama","family"]로 이미 태깅되어 있었는데
  // 이 표에는 "family" 항목이 없어서 칩에 라벨 없이 영단어 원문("family")이 그대로 노출되는
  // 버그가 있었다. 새 장르를 얹지 않고 기존 값 중 하나로 대체할 수도 있었지만, "가족" 서사라는
  // 파친코의 실제 성격을 지우는 것보다는 정식 분류로 편입하는 쪽이 정확하다.
  family:     { label:"가족", label_en:"Family", label_ja:"家族" }
};

// 알고리즘이 nameInWork/modernName에서 자동으로 뽑아낸 태그가, 사건명·시대구분 등
// 접미어(전투지·평정터·시절·매립지 등) 때문에 실제 사람들이 쓰는 SNS 해시태그와 어긋나는 경우를
// 수동으로 보정한다. 여기 들어간 값은 전부 실제 존재가 확인된 지명·건축물 이름만 사용함.
const TAG_OVERRIDES = {
  suga_shrine:"스가신사",              // 원래 "스가신사계단" — 실제로는 '스가신사' 단독 태그가 더 널리 쓰임
  sunpu_imagawa:"슨푸성",              // 원래 "슨푸이마가와관시절" — 오늘날 방문 가능한 실제 랜드마크는 슨푸성(공원)
  mikatagahara:"미카타가하라",          // 원래 "미카타가하라전투지" — '전투지' 접미어 제거
  nagashino:"나가시노성",              // 원래 "나가시노성전투지" — 실제 랜드마크명(나가시노성)만 사용
  oyama:"오야마",                      // 원래 "오야마평정터" — 실제 지명(오야마시)만 사용
  hibiya_reclamation:"히비야공원",      // 원래 "히비야이리에매립지" — 오늘날 실제로 존재하는 랜드마크명 사용
  daegu_gyesan_set:"계산성당",          // 원래 "계산성당주변오픈세트" — 실제 랜드마크(계산성당) 이름만 사용
  // 브레이킹 배드(영어권 작품) — modernName에 실제 주소가 괄호로 붙어 있어 자동 추출이 지저분해지므로,
  // 팬들이 실제로 SNS에서 쓰는 영어 해시태그 형태로 전부 수동 지정한다.
  walterwhite_house:"WalterWhiteHouse",
  jesse_house:"JessePinkmanHouse",
  lospollos:"LosPollosHermanos",
  carwash:"BreakingBadCarWash",
  tuco_office:"TucosHideout",
  gus_laundry:"SuperlabEntrance",
  vamonos_pest:"VamonosPestControl",
  saul_office:"SaulGoodmanOffice",
  gusfring_house:"GusFringHouse",
  hank_marie_house:"HankAndMarieHouse",
  hector_nursing:"HectorSalamancaHome",
  tohajiilee:"Tohajiilee",
  whitesands:"WhiteSandsNationalPark",
  // 2026-08 해시태그 정책 개정(v4) — "한 태그 안에 언어를 섞지 않는다" 원칙에 따라 감사에서 발견된 항목 수동 보정.
  // 실제 사람들은 #구텐베르크박물관-GutenbergMuseum 처럼 두 언어를 하이픈으로 이어붙여 태그를 달지 않는다 —
  // 한글 태그와 현지어 태그를 아예 별도의 두 태그로 나누거나(직지 유럽 장소는 loc.localTag로 처리),
  // 여기서는 한 태그 안에 섞인 것만 정리한다.
  fast_telescope:"톈옌전파망원경",     // 원래 "톈옌FAST전파망원경" — 태그 하나에 한글+영어가 섞여 있었음. 중국어 태그(天眼)는 별도로 이미 제공됨
  coexkpop:"COEXKPOPSquare",         // 원래 "COEXK-POPSquare" — 실제 SNS에서 쓰이지 않는 하이픈 제거
  csicmadrid:"CSIC",                 // 원래 "CSIC본부" — 실제로는 기관 약칭 그대로(#CSIC)만 널리 쓰임
  casaniculescu:"니쿨레스쿠도로반츠저택", // 원래 "니쿨레스쿠-도로반츠저택" — 루마니아어 원명의 하이픈을 한글 태그에서 제거
  // 더 글로리·우영우(2026-08 신규) — 자동 추출 결과가 실제보다 길거나 서술적이라, 사람들이 실제로 쓰는 짧은 랜드마크 태그로 보정.
  cheongnabadukpark:"청라호수공원",   // 원래 "청라호수공원바둑공원" — 실제로는 '청라호수공원'만으로 널리 통용됨
  jongno_pagoda:"종로3가기원",        // 원래 "종로3가기원거리" — '거리' 접미어 제거
  sejongbangok:"세종반곡동",          // 원래 "세종시반곡동신도시일대" — 길고 서술적인 표현을 짧은 지명으로 축약
  suwonhaenggung:"행리단길",          // 원래 "수원행궁동행리단길" — 실제로는 '행리단길'만으로 널리 통용됨
  chungbukprovoffice:"충북도청",      // 원래 "충청북도청본관" — 공식명보다 실제로 더 널리 쓰이는 축약형
  chungbukassembly:"충북도의회",      // 위와 동일한 축약 관행 적용
  // 태백산맥(2026-08 신규) — 율어는 modernName에 "— 좌표 비공개(...)" 설명이 붙어 있어, extractLandmarkName의
  // em-dash 파싱 규칙상 "좌표 비공개"가 태그로 뽑히는 문제가 있었다. 실제 지명(율어면)으로 수동 보정.
  yureo:"율어면",
  // 미스터 션샤인(2026-08 신규) — modernName 중 괄호 '밖'에 '·'가 있어 자동 추출이
  // 앞부분만 잘라내는 경우, 그리고 한자(舊)가 섞여 태그가 어색해지는 경우를 수동 보정.
  daejeon_yuseong_hanok:"대전뿌리공원",              // 원래 "대전 해군·해병..." 식으로 잘리는 문제 방지, 실제 랜드마크명만 사용
  us_militaryacademy_context:"USMarineCorpsHistory", // 원래 "미국 해군"으로 잘림 — 특정 실제 랜드마크가 아니므로 개념 태그로 대체
  incheon_japaneseconcession:"인천개항박물관",       // 원래 "인천 舊 일본 제1은행지점"(한자 포함) — 현재 실제 명칭으로 대체
  japan_musinhoe_origin:"MrSunshine무신회",           // 실존 장소가 아닌 극중 설정 — 장소명이 아닌 극중 조직명임을 명확히 함
  // 스파이더맨: 홈커밍(영어권 작품, 2026-08 신규) — modernName에 실제 주소·건물명이 괄호/쉼표로 붙어 있어
  // 자동 추출 시 마침표(.)·하이픈(-)·앰퍼샌드(&)·물결(~) 같은 기호가 태그에 섞이는 경우를 수동 보정.
  // (브레이킹 배드와 동일한 정책 — 실제 SNS에서 쓰이는 깔끔한 영문 캠멀케이스 해시태그로 대체)
  gradyhighschool:"HenryWGradyHighSchool",
  franklinlanehigh:"FranklinKLaneHighSchool",
  longislandcityapt:"PeterParkerApartment",
  queensblvdfireescape:"QueensBoulevardLIC",
  steldertsstation:"36thAvenueStation",
  thirtyfirststreet:"31stStreetAstoria",
  courtsquarehunterspoint:"CourtSquareHuntersPoint",
  mercedesbenzstadium:"메르세데스벤츠스타디움",
  robertfkennedybridgeview:"RFKBridge",
  coneyislandboardwalk:"ConeyIslandBoardwalk",
  tegelbrandenburg:"BrandenburgGate",
  delmarsdeli:"DelmarsDeli",
  peachtree99:"QueensCommunityBankScene",
  littlejohntrail:"LizHouseATL",
  // 소년이 온다(2026-08 신규) — modernName이 서술적이라 자동 추출 결과가 길어지는 경우를 실제 통용되는 짧은 이름으로 보정.
  hankangchildhood:"한강작가의길",
  // 검은 사제들(2026-08 신규) — 위와 동일한 정책.
  apsangolf:"앞산",
  daegunight:"계산성당야경",
  banwoldang:"반월당역",
  // 리틀 포레스트(2026-08 신규) — 위와 동일한 정책.
  hanbamvillage:"한밤마을",
  sagokssansuyu:"산수유마을",
  osangligarlic:"의성마늘",
  gunwijujube:"군위대추",
  // 이 사랑 통역 되나요?(2026-08 신규) — modernName이 서술적인("~인근", "~앞") 경우를
  // 실제 SNS에서 쓰이는 짧은 랜드마크 태그로 보정.
  hase_crossing:"하세역건널목",           // 원래 "하세역 인근 건널목" — '인근' 제거
  enoshima_post_office:"에노시마우체국",  // 원래 "에노시마 우체국 앞" — '앞' 제거
  katase_lighthouse:"가타세등대",         // 원래 "가타세 어항 흰 등대" — 실제로 더 짧게 통용되는 형태
  kananaskis_area:"카나나스키스",          // 원래 "카나나스키스 컨트리" — '컨트리' 제거
  // 명탐정 코난: 하이웨이의 타천사(2026-08 신규) — modernName에 원어(일본어) 병기·쉼표가 많아
  // 실제 SNS에서 통용되는 짧은 랜드마크 태그로 보정.
  turnpikehakone:"하코네턴파이크",
  shutokanagawa1:"수도고속가나가와1호",
  basegateyokohama:"BASEGATE요코하마",
  minatomiraitokyu:"미나토미라이도큐스퀘어",
  manyoparkyugawara:"만요공원유가와라",
  odawaratourism:"오다와라관광교류센터",
  // 악마는 프라다를 입는다 2(2026-08 신규) — modernName에 영문 원어 병기·쉼표·지역명이 많아
  // 실제 SNS에서 통용되는 짧은 랜드마크 태그로 보정.
  mcgrawhillbuilding:"맥그로힐빌딩",
  amnh:"자연사박물관",
  uestownhouse:"어퍼이스트사이드타운하우스",
  centreislandestate1:"빌리조엘저택",
  centreislandestate2:"센터아일랜드자택",
  woolworthmansion:"울워스맨션",
  breraacademy:"브레라미술원",
  palazzoparigi:"팔라초파리지",
  galleriavittorioemanuele:"비토리오에마누엘레갤러리",
  palazzoclerici:"팔라초클레리치",
  villaarconati:"빌라아르코나티",
  villabalbiano:"빌라발비아노",
  santamariadellegrazie:"최후의만찬박물관",
  fifthavenue:"5번가",
  comotown:"코모시내"
};

const DAEMANG_LOCATIONS = [
 {id:"okazaki",order:1,nameInWork:"오카자키성(岡崎城)",oldProvince:"미카와국(三河国)",modernName:"아이치현 오카자키시",lat:34.9558,lng:137.1653,description:"도쿠가와 이에야스 출생지. 미카와 마쓰다이라 가문의 거성.",description_en:"The birthplace of Tokugawa Ieyasu. Home castle of the Matsudaira clan of Mikawa.",tag:"출생",tag_en:"Birthplace",travelTip:"나고야에서 메이테츠선으로 약 30분, 오카자키공원역 하차. 복원 천수각과 미카와무사의 집(家康館)이 있음.",travelTip_en:"About 30 min from Nagoya on the Meitetsu Line, get off at Okazakikoen Station. Home to a reconstructed keep and the Ieyasukan museum."},
 {id:"matsudairago",order:2,nameInWork:"마쓰다이라고(松平郷)",oldProvince:"미카와국(三河国)",modernName:"아이치현 도요타시 마쓰다이라초",lat:35.0325,lng:137.2503,description:"마쓰다이라 가문의 발상지. 마쓰다이라 도쇼구와 산유의 우물이 있음.",description_en:"The ancestral home of the Matsudaira clan. Site of the Matsudaira Toshogu shrine and the Sanyu well.",tag:"가문 발상지",tag_en:"Clan origin",travelTip:"도요타시 중심에서 차로 약 40분. 한적한 산간 마을.",travelTip_en:"About 40 min by car from central Toyota City. A quiet mountain village."},
 {id:"sunpu_imagawa",order:3,nameInWork:"슨푸 이마가와관(駿府今川館) 시절",oldProvince:"스루가국(駿河国)",modernName:"시즈오카현 시즈오카시 아오이구",lat:34.9756,lng:138.3831,description:"소년기 이마가와 가문의 인질로 지낸 곳.",description_en:"Where young Ieyasu spent his boyhood years as a hostage of the Imagawa clan.",tag:"인질 시절",tag_en:"Hostage years",travelTip:"JR 시즈오카역에서 도보권. 슨푸성 공원 일대.",travelTip_en:"Walking distance from JR Shizuoka Station, around Sunpu Castle Park."},
 {id:"kiyosu",order:4,nameInWork:"기요스성(清洲城)",oldProvince:"오와리국(尾張国)",modernName:"아이치현 기요스시",lat:35.2225,lng:136.8511,description:"오다 노부나가와 '기요스 동맹'을 체결한 곳.",description_en:"Where Ieyasu signed the 'Kiyosu Alliance' with Oda Nobunaga.",tag:"노부나가 동맹",tag_en:"Nobunaga alliance",travelTip:"나고야역에서 JR로 약 10분, 기요스역 도보 15분.",travelTip_en:"About 10 min from Nagoya Station by JR, then a 15-min walk from Kiyosu Station."},
 {id:"azuchi",order:5,nameInWork:"아즈치성(安土城)",oldProvince:"오미국(近江国)",modernName:"시가현 오미하치만시",lat:35.1444,lng:136.1442,description:"오다 노부나가의 거성. 이에야스가 방문한 곳.",description_en:"Oda Nobunaga's home castle, which Ieyasu once visited.",tag:"노부나가 관련",tag_en:"Nobunaga's castle",travelTip:"JR 아즈치역에서 도보 약 20분, 아즈치성터 등산로.",travelTip_en:"About a 20-min walk from JR Azuchi Station, up the Azuchi Castle ruins trail."},
 {id:"hamamatsu",order:6,nameInWork:"하마마츠성(浜松城)",oldProvince:"도토미국(遠江国)",modernName:"시즈오카현 하마마츠시 나카구",lat:34.7136,lng:137.7264,description:"도토미 통치 거성. '출세성(出世城)'으로 불림.",description_en:"Ieyasu's base for ruling Totomi Province, nicknamed the 'Castle of Success.'",tag:"거성",tag_en:"Home castle",travelTip:"JR 하마마츠역에서 버스로 약 10분, 하마마츠성공원.",travelTip_en:"About 10 min by bus from JR Hamamatsu Station, at Hamamatsu Castle Park."},
 {id:"mikatagahara",order:7,nameInWork:"미카타가하라(三方ヶ原) 전투지",oldProvince:"도토미국(遠江国)",modernName:"시즈오카현 하마마츠시 나카구 미카타하라초",lat:34.7386,lng:137.6892,description:"다케다 신겐에게 대패한 전투지. 이에야스 생애 최대 위기 중 하나.",description_en:"The battlefield where Ieyasu suffered a crushing defeat to Takeda Shingen — one of the greatest crises of his life.",tag:"전투지",tag_en:"Battlefield",travelTip:"하마마츠 시내에서 버스 이용, 미카타가하라 고전장비 소재.",travelTip_en:"Take a bus from central Hamamatsu; the old battlefield monument stands here."},
 {id:"nagashino",order:8,nameInWork:"나가시노성(長篠城)·전투지",oldProvince:"미카와국(三河国)",modernName:"아이치현 신시로시 나가시노",lat:34.9092,lng:137.5361,description:"오다·도쿠가와 연합군이 다케다군을 조총 전술로 격파한 전투지.",description_en:"Where the combined Oda-Tokugawa forces broke the Takeda army with matchlock-gun tactics.",tag:"전투지",tag_en:"Battlefield",travelTip:"JR이이다선 나가시노조역에서 도보 약 7분.",travelTip_en:"About a 7-min walk from Nagashinojo Station on the JR Iida Line."},
 {id:"odawara",order:9,nameInWork:"오다와라성(小田原城)",oldProvince:"사가미국(相模国)",modernName:"가나가와현 오다와라시",lat:35.2506,lng:139.1539,description:"도요토미의 호조씨 정벌에 종군, 이후 관동으로 이봉되는 계기.",description_en:"Ieyasu joined Hideyoshi's campaign against the Hojo clan here, which set up his transfer to the Kanto region.",tag:"정벌·이봉",tag_en:"Campaign & relocation",travelTip:"JR·오다큐 오다와라역에서 도보 약 10분.",travelTip_en:"About a 10-min walk from JR/Odakyu Odawara Station."},
 {id:"edo",order:10,nameInWork:"에도성(江戸城)",oldProvince:"무사시국(武蔵国)",modernName:"도쿄도 지요다구 (현 고쿄/황거)",lat:35.6852,lng:139.7528,description:"관동 이봉 후 거성으로 삼은 곳. 훗날 에도 막부의 중심.",description_en:"The castle Ieyasu made his base after his transfer to Kanto — later the heart of the Edo shogunate.",tag:"거성",tag_en:"Home castle",travelTip:"도쿄역에서 도보 약 10분. 고쿄 동쪽 정원은 무료 개방.",travelTip_en:"About a 10-min walk from Tokyo Station. The East Gardens of the Imperial Palace are free to enter."},
 {id:"oyama",order:11,nameInWork:"오야마 평정(小山評定)터",oldProvince:"시모쓰케국(下野国)",modernName:"도치기현 오야마시",lat:36.3147,lng:139.8003,description:"세키가하라 전투 직전, 동군 진영의 방침을 정한 회의 개최지.",description_en:"Site of the war council where the Eastern Army settled its strategy just before Sekigahara.",tag:"세키가하라 전초",tag_en:"Sekigahara prelude",travelTip:"JR 오야마역 인근, 오야마 평정터 비석.",travelTip_en:"Near JR Oyama Station — look for the council-site monument."},
 {id:"sekigahara",order:12,nameInWork:"세키가하라(関ヶ原)",oldProvince:"미노국(美濃国)",modernName:"기후현 후와군 세키가하라초",lat:35.3667,lng:136.4667,description:"천하를 결정지은 세키가하라 전투가 벌어진 곳.",description_en:"Where the Battle of Sekigahara — the fight that decided the fate of Japan — was fought.",tag:"결전지",tag_en:"Decisive battlefield",travelTip:"JR 세키가하라역에서 도보로 주요 전적지 순회 가능.",travelTip_en:"The main battle sites are walkable from JR Sekigahara Station."},
 {id:"fushimi",order:13,nameInWork:"후시미성(伏見城)",oldProvince:"야마시로국(山城国)",modernName:"교토부 교토시 후시미구",lat:34.9394,lng:135.7736,description:"정이대장군 선하 및 상경 시 거점으로 사용한 성.",description_en:"The castle Ieyasu used as his base around his appointment as shogun and his visits to Kyoto.",tag:"쇼군 취임 전후",tag_en:"Around the shogun title",travelTip:"게이한 전철 후시미모모야마역 인근, 모모야마성 운동공원.",travelTip_en:"Near Fushimi-Momoyama Station on the Keihan Line, inside Momoyama Castle Sports Park."},
 {id:"nijo",order:14,nameInWork:"니조성(二条城)",oldProvince:"야마시로국(山城国)",modernName:"교토부 교토시 나카교구",lat:35.0142,lng:135.7481,description:"쇼군 취임 의식 및 상경 시 숙소로 축성. 세계문화유산.",description_en:"Built as Ieyasu's Kyoto lodging and the site of shogunal ceremonies. A UNESCO World Heritage site.",tag:"교토 거점",tag_en:"Kyoto base",travelTip:"지하철 니조조마에역 바로 앞. 교토 대표 관광지.",travelTip_en:"Right outside Nijojo-mae subway station — one of Kyoto's signature sights."},
 {id:"osaka",order:15,nameInWork:"오사카성(大坂城)",oldProvince:"셋쓰국(摂津国)",modernName:"오사카부 오사카시 주오구",lat:34.6873,lng:135.5262,description:"오사카 전투(겨울의 진·여름의 진)로 도요토미 가문이 멸망한 곳.",description_en:"Where the Toyotomi clan was wiped out in the Siege of Osaka (winter and summer campaigns).",tag:"최후 전투",tag_en:"Final battle",travelTip:"오사카비즈니스파크역·다니마치욘초메역에서 도보 가능.",travelTip_en:"Walkable from Osakabusinesspark or Tanimachi 4-chome stations."},
 {id:"sunpu_castle",order:16,nameInWork:"슨푸성(駿府城)",oldProvince:"스루가국(駿河国)",modernName:"시즈오카현 시즈오카시 아오이구",lat:34.9756,lng:138.3831,description:"쇼군직을 히데타다에게 물려준 뒤 오고쇼(大御所)로 머문 은퇴 후 거성.",description_en:"Ieyasu's retirement base as 'Ogosho' after handing the shogun title to Hidetada.",tag:"은퇴 후 거성",tag_en:"Retirement castle",travelTip:"JR 시즈오카역에서 도보 약 15분, 슨푸성공원.",travelTip_en:"About a 15-min walk from JR Shizuoka Station, at Sunpu Castle Park."},
 {id:"kunozan",order:17,nameInWork:"구노잔 도쇼구(久能山東照宮)",oldProvince:"스루가국(駿河国)",modernName:"시즈오카현 시즈오카시 스루가구",lat:34.9494,lng:138.4136,description:"이에야스 사후 유언에 따라 첫 안장된 곳.",description_en:"Where Ieyasu was first laid to rest, per his will.",tag:"사후",tag_en:"After his death",travelTip:"니혼다이라에서 로프웨이로 접근, 국보 사당 건축.",travelTip_en:"Reached by ropeway from Nihondaira — a National Treasure shrine building."},
 {id:"nikko",order:18,nameInWork:"닛코 도쇼구(日光東照宮)",oldProvince:"시모쓰케국(下野国)",modernName:"도치기현 닛코시",lat:36.7581,lng:139.5994,description:"이장 후 '동조대권현(東照大権現)'으로 신격화되어 안치된 세계문화유산.",description_en:"Where his remains were later moved and enshrined as the deified 'Tosho Daigongen.' A World Heritage site.",tag:"사후·신격화",tag_en:"Deification",travelTip:"도부닛코역에서 버스 약 10분. 닛코 관광 핵심 코스.",travelTip_en:"About 10 min by bus from Tobu-Nikko Station — the heart of any Nikko trip."},
 {id:"kariya",order:19,nameInWork:"가리야성(刈谷城)",oldProvince:"미카와국(三河国)",modernName:"아이치현 가리야시",lat:34.9997,lng:137.0023,description:"이에야스의 외가 미즈노 가문의 거성. 어머니 오다이노카타가 태어난 곳.",description_en:"Home castle of the Mizuno clan, Ieyasu's mother's family — the birthplace of his mother, Odai no Kata.",tag:"외가",tag_en:"Mother's family",travelTip:"나고야에서 JR로 약 30분, 가리야역 도보권.",travelTip_en:"About 30 min from Nagoya by JR, walking distance from Kariya Station."},
 {id:"kakegawa",order:20,nameInWork:"가케가와성(掛川城)",oldProvince:"도토미국(遠江国)",modernName:"시즈오카현 가케가와시",lat:34.7676,lng:138.0111,description:"이마가와 잔존 세력의 마지막 거점. 이에야스가 무력이 아닌 협상으로 항복시켰다.",description_en:"The last stronghold of Imagawa loyalists, which Ieyasu talked into surrender rather than storming.",tag:"미카와 통일",tag_en:"Uniting Mikawa",travelTip:"JR 가케가와역에서 도보 약 7분. 목조 복원 천수각으로 유명.",travelTip_en:"About a 7-min walk from JR Kakegawa Station, famous for its wooden reconstructed keep."},
 {id:"kitanosho",order:21,nameInWork:"기타노쇼성(北ノ庄城)",oldProvince:"에치젠국(越前国)",modernName:"후쿠이현 후쿠이시",lat:36.0652,lng:136.2216,description:"시바타 가쓰이에와 오이치노카타 부부가 함께 최후를 맞은 성터.",description_en:"Ruins of the castle where Shibata Katsuie and his wife Oichi no Kata met their end together.",tag:"비극의 성",tag_en:"A tragic castle",travelTip:"JR 후쿠이역에서 도보 약 10분, 시바타 신사 경내.",travelTip_en:"About a 10-min walk from JR Fukui Station, within the grounds of Shibata Shrine."},
 {id:"honnoji",order:22,nameInWork:"혼노지(本能寺)",oldProvince:"야마시로국(山城国)",modernName:"교토부 교토시 나카교구",lat:35.0086,lng:135.7681,description:"오다 노부나가가 아케치 미쓰히데의 습격으로 죽은 사건의 현장. 이에야스는 이 소식에 사카이에서 목숨을 건 탈출을 감행했다.",description_en:"Where Oda Nobunaga died in Akechi Mitsuhide's coup. On hearing the news in Sakai, Ieyasu made a desperate escape for his life.",tag:"혼노지의 변",tag_en:"The Honnoji incident",travelTip:"지하철 교토시야쿠쇼마에역 도보 3분. 현재 절은 사건 이후 재건된 자리.",travelTip_en:"A 3-min walk from Kyoto Shiyakusho-mae subway station. The current temple was rebuilt after the incident."},
 {id:"kasugayama",order:23,nameInWork:"가스가야마성(春日山城)",oldProvince:"에치고국(越後国)",modernName:"니가타현 조에쓰시",lat:37.1194,lng:138.2358,description:"우에스기 가문의 본거지. 노부나가와 다케다를 동시에 견제한 동국 최대 세력 중 하나였다.",description_en:"Home base of the Uesugi clan, one of the greatest powers in eastern Japan, holding both Nobunaga and Takeda in check at once.",tag:"우에스기 본거지",tag_en:"Uesugi stronghold",travelTip:"JR 나오에쓰역에서 버스 이용, 성터는 등산로로 정비.",travelTip_en:"Take a bus from JR Naoetsu Station; the castle ruins are now a hiking trail."},
 {id:"aizuwakamatsu",order:24,nameInWork:"아이즈와카마쓰성(会津若松城)",oldProvince:"무쓰국(陸奥国)",modernName:"후쿠시마현 아이즈와카마쓰시",lat:37.4869,lng:139.9297,description:"우에스기 가게카쓰의 아이즈 정벌이 세키가하라 전투의 도화선이 된 곳.",description_en:"Ieyasu's campaign against Uesugi Kagekatsu here was the spark that led to Sekigahara.",tag:"세키가하라 도화선",tag_en:"Spark of Sekigahara",travelTip:"아이즈와카마쓰역에서 버스 약 20분, 일명 '쓰루가성(鶴ヶ城)'.",travelTip_en:"About 20 min by bus from Aizu-Wakamatsu Station — also known as Tsuruga Castle."},
 {id:"koyasan",order:25,nameInWork:"고야산(高野山)",oldProvince:"기이국(紀伊国)",modernName:"와카야마현 이토군 고야초",lat:34.2124,lng:135.5858,description:"불안정했던 도요토미 후계 구도 속에서 도요토미 히데쓰구가 할복을 명받은 영지.",description_en:"Where Toyotomi Hidetsugu was ordered to commit ritual suicide amid the unstable Toyotomi succession.",tag:"도요토미 후계 비극",tag_en:"Toyotomi succession tragedy",travelTip:"난카이 고야산역에서 케이블카로 접근. 오쿠노인 참배로가 유명.",travelTip_en:"Reached by cable car from Nankai Koyasan Station — the Okunoin pilgrimage path is a highlight."},
 {id:"kumamoto",order:26,nameInWork:"구마모토성(熊本城)",oldProvince:"히고국(肥後国)",modernName:"구마모토현 구마모토시",lat:32.8065,lng:130.7055,description:"가토 기요마사가 규슈에서 쌓아올린 거성. 세키가하라 이후 도쿠가와 편에 서서 규슈를 안정시켰다.",description_en:"Kato Kiyomasa's castle in Kyushu. After Sekigahara he sided with the Tokugawa and helped stabilize the region.",tag:"규슈 거점",tag_en:"Kyushu stronghold",travelTip:"구마모토 시내 노면전차 구마모토조·시야쿠쇼마에역 하차.",travelTip_en:"Take the city tram to Kumamotojo-Shiyakushomae Station."},
 {id:"fukuoka",order:27,nameInWork:"후쿠오카성(福岡城)",oldProvince:"지쿠젠국(筑前国)",modernName:"후쿠오카현 후쿠오카시 주오구",lat:33.5845,lng:130.3783,description:"구로다 부자가 세키가하라의 공으로 받은 규슈 영지. 부친 간베에는 혼란을 틈타 독자적 규슈 장악을 노리기도 했다.",description_en:"The Kyushu domain the Kuroda father and son received for their role at Sekigahara — the father, Kanbei, even eyed seizing all of Kyushu amid the chaos.",tag:"규슈 거점",tag_en:"Kyushu stronghold",travelTip:"지하철 오호리코엔역에서 도보 약 10분, 마이즈루공원.",travelTip_en:"About a 10-min walk from Ohori-koen subway station, in Maizuru Park."},
 {id:"sendai",order:28,nameInWork:"센다이성(仙台城)",oldProvince:"무쓰국(陸奥国)",modernName:"미야기현 센다이시 아오바구",lat:38.2529,lng:140.8547,description:"다테 마사무네가 쌓은 오슈 최대 거성. 이에야스와 협력하면서도 독자적 세력 확장을 꾀했다.",description_en:"Date Masamune's great castle in the Oshu region — he cooperated with Ieyasu while still angling to grow his own power.",tag:"오슈 거점",tag_en:"Oshu stronghold",travelTip:"센다이역에서 루프버스로 약 20분, 아오바성터.",travelTip_en:"About 20 min by loop bus from Sendai Station, at the Aoba Castle ruins."},
 {id:"ueda",order:29,nameInWork:"우에다성(上田城)",oldProvince:"시나노국(信濃国)",modernName:"나가노현 우에다시",lat:36.4043,lng:138.2489,description:"사나다 부자가 소수 병력으로 히데타다의 대군을 묶어 세키가하라 본전 지각을 유발한 성.",description_en:"With only a small force, the Sanada father and son pinned down Hidetada's massive army here, making him late for the main battle at Sekigahara.",tag:"세키가하라 지연전",tag_en:"Delaying action",travelTip:"JR 우에다역에서 도보 약 12분.",travelTip_en:"About a 12-min walk from JR Ueda Station."},
 {id:"nihonbashi",order:30,nameInWork:"니혼바시(日本橋)",oldProvince:"무사시국(武蔵国)",modernName:"도쿄도 주오구 니혼바시",lat:35.6835,lng:139.7745,description:"1603년 막부가 가설한 다리로, 도카이도를 포함한 오가도(五街道)의 기점(이정표 0km 지점)이 된 곳. 에도가 전국과 연결되는 상징적 출발점.",description_en:"A bridge built by the shogunate in 1603 as the starting point (zero-mile marker) of the Five Routes, including the Tokaido. The symbolic point where Edo connected to the rest of Japan.",tag:"에도 개발·오가도 기점",tag_en:"Edo development · road network origin",travelTip:"도쿄역에서 도보 약 10분, 니혼바시역 바로 위.",travelTip_en:"About a 10-min walk from Tokyo Station, right above Nihombashi Station."},
 {id:"hibiya_reclamation",order:31,nameInWork:"히비야이리에(日比谷入江) 매립지",oldProvince:"무사시국(武蔵国)",modernName:"도쿄도 지요다구 히비야공원 일대",lat:35.6737,lng:139.7565,description:"원래 에도만의 일부였던 히비야이리에를 매립해 만든 땅. 지금의 마루노우치·긴자 일대가 모두 이 매립지 위에 서 있다.",description_en:"Land reclaimed from Hibiya Inlet, once part of Edo Bay. The entire Marunouchi and Ginza districts now sit on this reclaimed ground.",tag:"에도 개발·매립사업",tag_en:"Edo development · land reclamation",travelTip:"지하철 히비야역 바로 앞, 공원 산책과 함께 마루노우치 거리 구경 가능.",travelTip_en:"Right by Hibiya subway station — combine a park walk with a stroll through Marunouchi."},
 {id:"korakuen",order:32,nameInWork:"고이시카와 고라쿠엔(小石川後楽園)",oldProvince:"무사시국(武蔵国)",modernName:"도쿄도 분쿄구 고라쿠엔",lat:35.7078,lng:139.7500,description:"미토 도쿠가와 가문의 저택 정원으로 조성된 곳. 이에야스가 다진 에도 통치의 기틀 위에서, 그 후손들이 학문과 풍류를 즐기던 공간이 지금은 도쿄를 대표하는 정원 중 하나가 됐다.",description_en:"Once the estate garden of the Mito Tokugawa family. Built on the foundation Ieyasu laid, this space where his descendants pursued learning and refinement is now one of Tokyo's finest gardens.",tag:"에도 개발·다이묘 정원",tag_en:"Edo development · daimyo garden",travelTip:"도쿄돔 바로 옆, 스이도바시역에서 도보 약 8분.",travelTip_en:"Right next to the Tokyo Dome, about an 8-min walk from Suidobashi Station."},
 {id:"hamarikyu",order:33,nameInWork:"하마리큐 온시테이엔(浜離宮恩賜庭園)",oldProvince:"무사시국(武蔵国)",modernName:"도쿄도 주오구 하마리큐테이엔",lat:35.6597,lng:139.7638,description:"원래 도쿠가와 쇼군가의 별저이자 오리 사냥터였던 곳. 에도만의 바닷물을 그대로 끌어들인 조수 정원이 지금도 남아있다.",description_en:"Once a Tokugawa shogunal villa and duck-hunting ground. Its seawater tidal garden, fed directly from Edo Bay, survives to this day.",tag:"에도 개발·쇼군가 별저",tag_en:"Edo development · shogunal villa",travelTip:"지하철 쓰키지시조역에서 도보 약 7분, 오다이바행 수상버스 선착장도 있음.",travelTip_en:"About a 7-min walk from Tsukijishijo subway station — also has a water-bus pier to Odaiba."}
];

// 대망 등장인물 90명 전체 데이터는 contentmap_daemang_people1.js / contentmap_daemang_people2.js 에서 로드됨
// (html에서 이 파일보다 먼저 로드되도록 script 순서를 맞춰둠)

/* ============================================================
   대망 연대기 30선 — 1부(노부나가 중심) / 2부(히데요시와의 갈등) /
   3부(히데요시 사후 잔당과의 갈등) 구조로 정리.
   important:true 는 특히 중요한 전환점, locId가 있으면 지도의
   해당 장소로 바로 연결(클릭 시 showLocation 호출).
   ============================================================ */
const DAEMANG_TIMELINE = [
  { year:"1543", title:"오카자키 출생", note:"이야기의 시작점.", important:true, locId:"okazaki" },
  { year:"1547", title:"오다 가문 인질 시작", note:"노부나가 부친(노부히데)과의 첫 악연.", important:false },
  { year:"1549", title:"슨푸(이마가와) 인질 이관", note:"셋사이 선사 문하에서 수학, 인내와 학식이 형성된 시기.", important:false, locId:"sunpu_imagawa" },
  { year:"1560", title:"오케하자마 전투", note:"노부나가가 이마가와 요시모토를 격파, 이에야스 독립의 계기.", important:true },
  { year:"1561~62", title:"기요스 동맹", note:"노부나가-이에야스, 이후 20년 이어질 동맹의 시작.", important:true, locId:"kiyosu" },
  { year:"1570", title:"아네가와 전투", note:"노부나가·이에야스 연합군, 아사쿠라·아자이 격파.", important:false },
  { year:"1572~73", title:"미카타가하라 전투와 다케다 신겐의 급사", note:"참패했으나 교토로 향하던 신겐이 급사하며 최대 위기가 극적으로 풀림.", important:true, locId:"mikatagahara" },
  { year:"1575", title:"나가시노 전투", note:"다케다 가쓰요리 격파, 신겐 사후 다케다 몰락의 결정타.", important:true, locId:"nagashino" },
  { year:"1577~78", title:"우에스기 겐신, 데도리가와 승리 후 급사", note:"노부나가 최후의 강적이 스스로 무대에서 사라짐.", important:false, locId:"kasugayama" },
  { year:"1579", title:"노부야스·쓰키야마도노 사건", note:"동맹 '안'에서 노부나가의 의심에 굴복해야 했던 이에야스의 최대 비극.", important:true, locId:"hamamatsu" },
  { year:"1582.6", title:"혼노지의 변과 이가고에", note:"다케다 가문 멸망(3월) 직후, 노부나가 시대의 종언과 이에야스의 목숨을 건 탈출.", important:true, locId:"honnoji" },
  { year:"1582~84", title:"기요스 회의 이후 히데요시 대두", note:"시바타 가쓰이에를 제압하며 사실상 후계자로 부상.", important:false, locId:"kiyosu" },
  { year:"1584", title:"고마키·나가쿠테 전투", note:"히데요시와 정면충돌, 군사적으론 우위였으나 정치적으로 봉합됨.", important:false },
  { year:"1586", title:"아사히히메와 재혼, 오만도코로 인질", note:"무력 대신 정략으로 굴복을 압박하는 히데요시식 해법.", important:false },
  { year:"1586.10", title:"오사카성 신종", note:"두 사람의 갈등이 표면적으로 종결되는 순간.", important:true, locId:"osaka" },
  { year:"1590", title:"오다와라 정벌", note:"호조씨 멸망, 이에야스도 종군.", important:false, locId:"odawara" },
  { year:"1590", title:"관동 이봉", note:"이에야스를 본거지에서 떼어놓으려는 히데요시의 정치적 한 수. 늪지투성이 간토가 훗날 에도가 됨.", important:true, locId:"edo" },
  { year:"1592~98", title:"조선 출병 불참전 전략", note:"전면에 나서지 않고 세력을 온존시키며 때를 기다림.", important:false },
  { year:"1595", title:"도요토미 히데쓰구 사건", note:"후계자 숙청, 도요토미 정권 내부 균열의 시작.", important:false, locId:"koyasan" },
  { year:"1598", title:"도요토미 히데요시 사망", note:"갈등의 축이 '히데요시 개인'에서 '그가 남긴 사람들'로 옮겨가는 분기점.", important:true, locId:"fushimi" },
  { year:"1599", title:"마에다 도시이에 사망과 시치쇼(가토 기요마사 등)의 미쓰나리 습격 사건", note:"마지막 원로가 사라지고, 도요토미 진영 내부의 무단파-문치파 분열이 표면화.", important:false },
  { year:"1600", title:"아이즈 정벌 거병", note:"나오에 가네쓰구의 격문(直江状)을 명분삼아 거병.", important:false, locId:"aizuwakamatsu" },
  { year:"1600", title:"오야마 평정", note:"동군 결집, 미쓰나리와의 전면 대결 국면으로 전환.", important:false, locId:"oyama" },
  { year:"1600.9", title:"세키가하라 전투", note:"고바야카와 히데아키의 배신, 서군(미쓰나리 등) 붕괴.", important:true, locId:"sekigahara" },
  { year:"1603", title:"정이대장군 선하, 에도 막부 개창", note:"공식적으로 천하인이 되는 순간.", important:true, locId:"edo" },
  { year:"1605", title:"쇼군직 이양, 오고쇼 체제", note:"히데타다에게 쇼군직을 넘기고 실권은 계속 쥐는 이원 통치.", important:false, locId:"sunpu_castle" },
  { year:"1611", title:"니조성 회견", note:"성인이 된 도요토미 히데요리를 직접 대면, 후계 구도를 최종 확인.", important:false, locId:"nijo" },
  { year:"1614", title:"호코지 종명 사건", note:"'국가안강(国家安康)' 명문을 트집 잡아 개전 명분을 조작.", important:false },
  { year:"1614~15", title:"오사카 전투(겨울의 진→여름의 진)", note:"도요토미 가문 완전 멸망, 통일의 마침표.", important:true, locId:"osaka" },
  { year:"1616~17", title:"이에야스 사망, 닛코 신격화", note:"구노잔에 안장 후 닛코 도쇼구로 이장, 동조대권현으로 신격화.", important:true, locId:"nikko" }
];

const KIMINONAWA_LOCATIONS = [
 {id:"hida_furukawa_station",order:1,modernName:"기후현 히다시 후루카와초 — 히다후루카와역(飛騨古川駅)",lat:36.2394,lng:137.1936,description:"타키가 미츠하를 찾아 방문한 역. 극중 등장 택시승강장이 실존.",tag:"도쿄→히다 이동",travelTip:"JR 다카야마역에서 완행으로 약 15분."},
 {id:"ketawakamiya_shrine",order:2,modernName:"기후현 히다시 후루카와초 — 기타와카미야 신사(気多若宮神社)",lat:36.2439,lng:137.1897,description:"극중 '미야미즈 신사'의 모델로 알려짐. 성지순례 핵심 스팟.",tag:"성지순례 핵심",travelTip:"후루카와역에서 도보 약 20분, 산 중턱 계단길."},
 {id:"hida_library",order:3,modernName:"기후현 히다시 후루카와초 — 히다시립도서관(飛騨市図書館)",lat:36.2361,lng:137.1917,description:"이토모리 마을을 조사하는 장면의 배경 모델.",tag:"도서관 장면",travelTip:"후루카와역에서 도보 약 10분."},
 {id:"nakaya_ramen",order:4,modernName:"기후현 히다시 후루카와초, 역 앞 — 나카야(なかや)",lat:36.2394,lng:137.1939,description:"라멘집 주인이 '이토모리'를 알려주는 장면의 모델이 된 실존 국수가게.",tag:"실존 상점",travelTip:"히다후루카와역 바로 앞."},
 {id:"ajidokoro_furukawa",order:5,modernName:"기후현 히다시 후루카와초 — 아지도코로 후루카와(味処古川)",lat:36.2367,lng:137.1917,description:"극중 노포의 모델로 알려진 정식집. 영화 이후 고헤이모치도 판매.",tag:"실존 상점",travelTip:"히다시립도서관 인근."},
 {id:"lake_suwa",order:6,modernName:"나가노현 스와시·오카야시 일대 — 스와호(諏訪湖)",lat:36.0422,lng:138.1092,description:"극중 '이토모리호'의 모델이 된 나가노현 최대 호수.",tag:"이토모리호 모델",travelTip:"JR 가미스와역·시모스와역에서 도보 접근 가능."},
 {id:"route361",order:7,modernName:"기후현 다카야마시~나가노현 방면 — 국도 361호선(国道361号) 일대",lat:36.1408,lng:137.2528,description:"타키가 히다로 이동하는 극중 도로 풍경의 모델.",tag:"이동 경로",travelTip:"렌터카 여행 시 다카야마↔온타케 방면 드라이브 코스."},
 {id:"shinjuku_south",order:8,modernName:"도쿄도 시부야구/신주쿠구 경계 — 신주쿠역 남쪽 출구(新宿駅南口)",lat:35.6896,lng:139.7006,description:"도쿄 파트의 주요 배경 중 하나.",tag:"도쿄 파트",travelTip:"JR·오다큐·게이오 신주쿠역 남쪽 출구."},
 {id:"shinanomachi",order:9,modernName:"도쿄도 신주쿠구 — 시나노마치역(信濃町駅) 부근",lat:35.6789,lng:139.7192,description:"도쿄 시내 파트 배경으로 등장.",tag:"도쿄 파트",travelTip:"JR 주오·소부선 시나노마치역."},
 {id:"yotsuya_station",order:10,modernName:"도쿄도 신주쿠구 — 요츠야역(四ツ谷駅)",lat:35.6864,lng:139.7300,description:"스가 신사 인근 역, 도쿄 파트 배경.",tag:"도쿄 파트",travelTip:"JR·지하철 요츠야역 하차."},
 {id:"suga_shrine",order:11,modernName:"도쿄도 신주쿠구 요츠야 — 스가 신사(須賀神社) 계단",lat:35.6858,lng:139.7300,description:"엔딩 명장면(계단 재회)의 모델로 알려진, 팬들 사이 최고 인기 성지.",tag:"최고 인기 성지",travelTip:"요츠야역에서 도보 약 10분. 계단에서 신주쿠 방향 뷰 유명."},
 {id:"national_art_center",order:12,modernName:"도쿄도 미나토구 롯폰기 — 국립신미술관(国立新美術館)",lat:35.6653,lng:139.7267,description:"도쿄 파트에서 언급·배경으로 등장.",tag:"도쿄 파트",travelTip:"지하철 노기자카역과 직결."},
 {id:"hida_takayama",order:13,modernName:"기후현 다카야마시 — 히다타카야마(飛騨高山) 시가지",lat:36.1408,lng:137.2528,description:"히다 지역 관광 동선상 함께 소개되는 인근 고도시.",tag:"인근 관광지",travelTip:"히다후루카와와 함께 1박 2일 코스로 묶기 좋음."},
 {id:"furukawa_machinami",order:14,modernName:"기후현 히다시 후루카와초 — 세토강과 흰벽 마을(瀬戸川と白壁土蔵街)",lat:36.2372,lng:137.1917,description:"이토모리 마을 거리 풍경의 모델로 여겨지는 옛 거리.",tag:"마을 풍경",travelTip:"잉어가 노니는 수로와 흰 벽 창고 거리가 도보권."},
 {id:"hida_daishonyudo",order:15,modernName:"기후현 다카야마시 인근 — 히다 대사고(飛騨大鍾乳洞)",lat:36.1219,lng:137.3125,description:"히다 지역 성지순례 코스에서 함께 언급되는 인근 명소.",tag:"인근 명소",travelTip:"다카야마 시내에서 버스 이용."}
];

// 스즈메의 문단속 실존 촬영지·성지순례 스팟 (2026-07 웹 검색으로 확인한 정보 기반으로 작성)
// 정확한 건물 단위 좌표까지 확신하기 어려운 곳은 지역·시설 단위 좌표를 사용했고,
// 팬들 사이의 '추정'인 곳은 tag·description에 명시해 과장하지 않도록 함.
const SUZUME_LOCATIONS = [
 {id:"aburatsu",order:1,modernName:"미야자키현 니치난시 — 아부라쓰항(油津港)",lat:31.5975,lng:131.3839,description:"스즈메가 나고 자란 규슈 항구 마을. 등굣길에 낯선 여행자 소타와 마주치며 이야기가 시작되는 장면의 모델로 알려짐.",tag:"이야기의 시작",travelTip:"닛포혼선 아부라쓰역에서 도보 약 20분."},
 {id:"yawatahama",order:2,modernName:"에히메현 야와타하마시 — 야와타하마항·역(八幡浜港・駅)",lat:33.4631,lng:132.4239,description:"말하는 고양이 다이진을 쫓아 규슈에서 시코쿠로 건너가는 페리 장면의 모델. 세토내해를 오가는 실제 항구 도시.",tag:"시코쿠 상륙",travelTip:"JR 요산선 야와타하마역과 페리터미널이 도보권."},
 {id:"kobe_fruit_flower_park",order:3,modernName:"효고현 고베시 기타구 — 고베 후르츠·플라워 파크(神戸フルーツ・フラワーパーク)",lat:34.8964,lng:135.1614,description:"산속 폐유원지로 등장하는 '두 번째 문' 장면의 모델로 추정되는 곳. 실제로는 지금도 운영 중인 도로휴게소 겸 놀이공원이라 폐허는 아니다.",tag:"두 번째 문(추정)",travelTip:"신고베역에서 버스로 약 40분."},
 {id:"ninomiya_shopping_street",order:4,modernName:"효고현 고베시 주오구 — 니노미야 상점가(二宮商店街)",lat:34.6975,lng:135.1934,description:"스낵바를 운영하는 루미와 며칠을 함께 지내는 고베 파트의 배경 모델. 산노미야역 인근의 소박한 서민 상점가.",tag:"고베 체류",travelTip:"JR·한신 산노미야역 동쪽 출구에서 도보 약 10분."},
 {id:"akashi_kaikyo_bridge",order:5,modernName:"효고현 고베시~아와지시마 — 아카시해협대교(明石海峡大橋)",lat:34.6297,lng:135.0093,description:"세계 최장급 현수교. 고베를 지나는 여정 중 배경으로 등장하는 실존 랜드마크.",tag:"고베 랜드마크",travelTip:"마이코공원에서 다리 바로 아래까지 접근 가능, 전망시설 '브리지 월드' 투어 운영."},
 {id:"hijiribashi_ochanomizu",order:6,modernName:"도쿄도 지요다구 — 오차노미즈 히지리바시(お茶の水 聖橋)",lat:35.6996,lng:139.7657,description:"간다강을 가로지르는 다리로, 도쿄 파트에서 스즈메 일행이 지나는 상징적인 장면의 배경.",tag:"도쿄 파트",travelTip:"JR·마루노우치선 오차노미즈역에서 도보 3분."},
 {id:"ushigafuchi",order:7,modernName:"도쿄도 지요다구 — 기타노마루공원·우시가후치(北の丸公園・牛ヶ淵)",lat:35.6936,lng:139.7502,description:"도쿄의 '뒷문'이 있던 곳으로 팬들 사이에 지목되는 고쿄(皇居) 외곽 해자. 영화 후반 도쿄 파트의 핵심 무대다.",tag:"도쿄의 뒷문(추정)",travelTip:"지하철 다케바시역·구단시타역에서 도보 약 10분, 지도리가후치 산책로와 이어짐."},
 {id:"ooya_kaigan",order:8,modernName:"미야기현 게센누마시 모토요시초 — 미치노에키 오야카이간(道の駅大谷海岸)",lat:38.7128,lng:141.5386,description:"동일본대지진 이후 복구된 해안 도로휴게소. 영화 후반 도호쿠 파트에서 등장하며, 이 작품이 재난의 기억과 회복을 함께 이야기하는 지점이다.",tag:"도호쿠 · 기억과 회복",travelTip:"산리쿠자동차도로 게센누마미나미IC에서 가까움. 오야카이간 해변이 바로 앞."}
];

/* ============================================================
   폭싹 속았수다(When Life Gives You Tangerines) 촬영지
   — 대망·너의 이름은·스즈메와 같은 지도 엔진에 좌표만 한국(제주/안동)으로
   찍은 것. 별도의 '한국 지도'를 새로 만들 필요 없이 그대로 확장됨.
   ============================================================ */
const POKSSAK_LOCATIONS = [
 {id:"seongsan_ilchulbong",order:1,modernName:"제주 서귀포시 — 성산일출봉",lat:33.4587,lng:126.9425,description:"애순이 혼인 후 아이가 생기지 않아 시어머니를 따라 삼천배를 올리는, 극중 가장 눈물겨운 장면의 촬영지. 유네스코 세계자연유산.",description_en:"Where Ae-sun, unable to conceive after marriage, follows her mother-in-law up to perform three thousand bows in one of the show's most tearful scenes. A UNESCO World Natural Heritage site.",tag:"삼천배 장면",tag_en:"The 3,000-bows scene",travelTip:"제주시외버스터미널에서 버스로 약 1시간 20분. 일출 명소로도 유명.",travelTip_en:"About 1 hr 20 min by bus from Jeju Intercity Bus Terminal. Also famous as a sunrise spot."},
 {id:"gimnyeong_beach",order:2,modernName:"제주 제주시 — 김녕해수욕장",lat:33.5566,lng:126.7561,description:"애순과 관식의 어린 시절, 그리고 두 사람의 어머니 세대 해녀들의 삶을 비추는 장면들이 촬영된 해변.",description_en:"The beach where Ae-sun and Gwan-sik's childhood, and the haenyeo lives of their mothers' generation, were filmed.",tag:"유년 시절·해녀",tag_en:"Childhood · haenyeo divers",travelTip:"제주시내에서 버스로 약 40분. 에메랄드빛 바다로 유명한 해변.",travelTip_en:"About 40 min by bus from Jeju City. Known for its emerald-colored water."},
 {id:"hyeopjae_beach",order:3,modernName:"제주 제주시 — 협재해수욕장",lat:33.3939,lng:126.2394,description:"애순과 관식이 파도를 뛰놀고 노을을 바라보는, 드라마에서 가장 다정한 장면들이 촬영된 해변.",description_en:"The beach behind some of the drama's warmest moments — Ae-sun and Gwan-sik playing in the surf and watching the sunset together.",tag:"로맨틱 장면",tag_en:"Romantic scenes",travelTip:"제주시내에서 버스로 약 1시간. 비양도가 보이는 백사장으로 유명.",travelTip_en:"About 1 hr by bus from Jeju City. Famous for its white sand and view of Biyangdo island."},
 {id:"seopjikoji",order:4,modernName:"제주 서귀포시 — 섭지코지",lat:33.4237,lng:126.9269,description:"등대를 향해 함께 걷는 장면 등, 극중 가장 인상적인 산책 장면들의 배경이 된 해안 언덕.",description_en:"The coastal hill behind some of the drama's most memorable walking scenes, including a walk toward the lighthouse.",tag:"해안 산책길",tag_en:"Coastal walking path",travelTip:"성산일출봉에서 차로 약 10분. 유채꽃 시즌엔 더욱 인기.",travelTip_en:"About 10 min by car from Seongsan Ilchulbong. Especially popular during canola-flower season."},
 {id:"ora_buckwheat_field",order:5,modernName:"제주 제주시 오라동 — 메밀꽃밭",lat:33.4780,lng:126.5219,description:"하얀 메밀꽃이 가득 피는 곳으로, 극중 로맨틱한 장면의 배경이 됐다. 방영 이후 방문객이 크게 늘었다.",description_en:"A field that fills with white buckwheat blossoms, used as the backdrop for a romantic scene. Visitor numbers rose sharply after the show aired.",tag:"메밀꽃밭",tag_en:"Buckwheat field",travelTip:"제주시내에서 차로 약 20분. 개화 시기(9~10월)에 방문하는 게 가장 좋음.",travelTip_en:"About 20 min by car from Jeju City. Best visited during bloom season (Sept–Oct)."},
 {id:"gasi_canola_field",order:6,modernName:"제주 서귀포시 표선면 가시리 — 유채꽃밭",lat:33.3925,lng:126.7925,description:"애순과 관식의 첫 입맞춤 장면의 배경이 된 노란 유채꽃밭. 조랑말체험공원 인근 들판이다.",description_en:"The yellow canola field that serves as the backdrop for Ae-sun and Gwan-sik's first kiss, near the Gasi-ri pony experience park.",tag:"첫 키스 장면",tag_en:"First-kiss scene",travelTip:"표선해수욕장에서 차로 약 15분. 유채꽃은 3~4월이 절정.",travelTip_en:"About 15 min by car from Pyoseon Beach. Canola flowers peak in March–April."},
 {id:"jejumok_gwana",order:7,modernName:"제주 제주시 — 제주목 관아",lat:33.5135,lng:126.5219,description:"조선시대 제주 행정관청 건물을 복원한 곳으로, 극중 옛 제주 시내 장면의 배경으로 쓰였다.",description_en:"A reconstruction of Jeju's old Joseon-era government office, used as a backdrop for scenes set in old downtown Jeju.",tag:"옛 제주 관청",tag_en:"Old Jeju government office",travelTip:"제주시 중앙로터리 인근, 도보로 접근 가능한 시내 한복판.",travelTip_en:"Near Jeju City's central rotary, walkable from downtown."},
 {id:"andong_set",order:8,modernName:"경북 안동시 풍천면 — 도동리 세트장 부지(경북도청신도시)",lat:36.5745,lng:128.4970,description:"극중 1950~60년대 '도동리' 마을 장면 대부분은 실제로는 제주가 아니라 이곳 안동에 지어진 세트장에서 촬영됐다. 초가집 80여 채와 돌담, 항구, 어선 4척까지 재현했으나 촬영 종료 후 철거되어 지금은 부지만 남아있다.",description_en:"Most of the 1950s–60s 'Dodong-ri' village scenes were actually filmed not in Jeju but at a purpose-built set here in Andong, complete with 80-some thatched houses, stone walls, a harbor, and four fishing boats. The set was dismantled after filming, so only the site itself remains today.",tag:"실제 촬영 세트장(철거됨)",tag_en:"Former film set (dismantled)",travelTip:"안동 시내에서 차로 약 15분. 세트장은 철거됐지만 안동 시내 관광과 함께 묶어 들르기 좋음.",travelTip_en:"About 15 min by car from central Andong. The set itself is gone, but easy to combine with an Andong city trip."},
 {id:"andong_lake",order:9,modernName:"경북 안동시 — 안동호·호명호(안동호반)",lat:36.5820,lng:128.7140,description:"'도동리' 세트장 인근의 실제 호수. 세트장의 인공 바다 장면을 보완하는 실제 수변 배경으로 함께 쓰였다.",description_en:"A real lake near the 'Dodong-ri' set, used alongside it as an actual waterside backdrop to complement the set's artificial sea scenes.",tag:"실제 호수 배경",tag_en:"Real lakeside backdrop",travelTip:"안동 도동리 세트장 부지에서 차로 약 20~30분 거리.",travelTip_en:"About 20–30 min by car from the Dodong-ri set site."},
 {id:"yeoncheon_set",order:10,modernName:"강원 연천 — 시대 변화 거리 세트장 부지",lat:38.0993,lng:127.0747,description:"1960년대부터 2025년 현재까지 60년에 걸쳐 변화하는 거리와 건물을 재현하기 위해 조성된 대규모 야외 세트. 안동 세트장과 함께 촬영 종료 후 철거됐다.",description_en:"A large outdoor set built to recreate a street and its buildings changing over 60 years, from the 1960s to present-day 2025. Like the Andong set, it was dismantled after filming wrapped.",tag:"시대 변화 세트장(철거됨)",tag_en:"Era-spanning street set (dismantled)",travelTip:"세트장 자체는 남아있지 않으나, 연천군 일대 관광과 함께 둘러볼 수 있음.",travelTip_en:"The set itself no longer exists, but the area can be combined with a broader Yeoncheon-gun trip."},
 {id:"gochang_hagwon_farm",order:11,modernName:"전북 고창군 — 학원농장(보리나라 학원농장) 유채꽃밭",lat:35.4278,lng:126.6222,description:"많은 시청자가 제주 유채꽃밭일 거라 짐작했던 애순과 관식의 첫 입맞춤 장면, 실제로는 이곳 고창 학원농장의 유채꽃밭에서 촬영됐다. 농장 입구 왼쪽엔 유채꽃밭, 오른쪽 언덕엔 청보리밭이 함께 펼쳐져 있어 두 풍경을 한 번에 볼 수 있다.",description_en:"The scene many viewers assumed was filmed in a Jeju canola field — Ae-sun and Gwan-sik's first kiss — was actually shot here, in the canola field at Gochang's Hagwon Farm. The farm's entrance has canola on one side and green barley on the hillside opposite, so both can be seen in the same visit.",tag:"첫 입맞춤 실제 촬영지",tag_en:"Where the first kiss was actually filmed",travelTip:"매년 4~5월 청보리밭 축제 시즌에 유채꽃과 청보리가 함께 피어, 드라마 속 장면과 가장 비슷한 풍경을 볼 수 있음.",travelTip_en:"Visit during the green barley festival (April–May), when the canola and barley bloom together — scenery closest to what's shown in the drama."},
 {id:"daegu_gyesan_set",order:12,modernName:"대구 중구 계산동 — 계산성당 주변 오픈세트",lat:35.8703,lng:128.5936,description:"1960년대 어린 애순과 관식이 양배추와 생선을 팔던 한국전쟁 직후 시장 장면이 이 근대 건축물 계산성당 주변 오픈세트에서 촬영됐다. 전쟁 이산가족을 찾는 팻말을 목에 건 할머니 등, 그 시절의 상흔을 담은 배경이다.",description_en:"The postwar-market scene where young Ae-sun and Gwan-sik sell cabbages and fish was filmed on an open set around this historic cathedral — including a grandmother wearing a sign searching for family separated by the war.",tag:"1960년대 시장 장면",tag_en:"1960s market scene",travelTip:"대구 도심 근대골목투어 코스에 포함되어 있어 함께 둘러보기 좋음.",travelTip_en:"Included in Daegu's downtown 'modern alley' walking tour course, easy to combine with sightseeing."},
 {id:"chilgok_gasil_cathedral",order:13,modernName:"경북 칠곡군 — 가실성당",lat:35.9928,lng:128.4361,description:"1895년에 지어진 붉은 벽돌의 고딕풍 성당으로, 훗날 금명의 결혼식 장면 배경으로 등장한다.",description_en:"A red-brick Gothic cathedral built in 1895, later used as the backdrop for Geum-myeong's wedding scene.",tag:"금명 결혼식 장면",tag_en:"Geum-myeong's wedding scene",travelTip:"대구에서 차로 약 40분. 성당 정원이 아름다워 사진 명소로도 인기.",travelTip_en:"About 40 min by car from Daegu. The cathedral garden is a popular photo spot."},
 {id:"gwangju_theater",order:14,modernName:"광주 동구 — 광주극장(극중 '깐느극장')",lat:35.1499,lng:126.9153,description:"1935년 문을 연 국내에서 가장 오래된 단관극장. 극중 성인이 된 금명이 매표소 아르바이트생으로, 박충섭이 간판화가로 일하던 '깐느극장'으로 등장한다. 서울에서 돌아온 남자친구 박영범과 재회하고, 충섭과도 인연을 쌓는 극의 후반부 핵심 공간이다.",description_en:"South Korea's oldest single-screen theater, opened in 1935. In the drama it appears as the 'Cannes Theater,' where an adult Geum-myeong sells tickets and Park Chung-seop paints the film posters — a key setting for the show's later chapters.",tag:"금명의 서울/광주 시절 핵심 무대",tag_en:"Key setting for Geum-myeong's adult years",travelTip:"지금도 실제 영화관으로 운영 중이며, 주로 예술영화·독립영화를 상영함.",travelTip_en:"Still operating as a real cinema today, mainly screening art-house and independent films."},
 {id:"jeongeup_chilbo_ms",order:15,modernName:"전북 정읍시 칠보면 — 칠보중학교",lat:35.5346,lng:126.9354,description:"극중 학창 시절 장면의 실제 촬영지 중 하나로 알려진 학교.",description_en:"A school confirmed as one of the real filming locations for scenes set in the characters' school years.",tag:"학창 시절 촬영지",tag_en:"School-years filming location",travelTip:"정읍 시내에서 차로 약 30분 거리.",travelTip_en:"About 30 min by car from central Jeongeup."},
 {id:"jeonju_paldalro",order:16,modernName:"전북 전주시 완산구 — 팔달로 일대",lat:35.8156,lng:127.1480,description:"극중 시가지 장면 촬영지로 확인된 전주 구도심의 거리.",description_en:"A downtown Jeonju street confirmed as a filming location for the drama's cityscape scenes.",tag:"시가지 촬영지",tag_en:"Cityscape filming location",travelTip:"전주 한옥마을에서 도보로 이동 가능한 거리.",travelTip_en:"Walkable from Jeonju Hanok Village."},
 {id:"jeonbuk_univ_hospital",order:17,modernName:"전북 전주시 덕진구 — 전북대학교병원",lat:35.8467,lng:127.1297,description:"극중 병원 장면의 실제 촬영지로 확인된 곳.",description_en:"Confirmed as the real filming location for the drama's hospital scenes.",tag:"병원 장면 촬영지",tag_en:"Hospital scene filming location",travelTip:"전주 시내 중심가에서 가까움.",travelTip_en:"Close to central Jeonju."},
 {id:"jeonnam_univ",order:18,modernName:"광주 북구 용봉동 — 전남대학교",lat:35.1761,lng:126.9080,description:"극중 대학 시절 장면 촬영지로 확인된 캠퍼스. 광주극장 인근의 금명·충섭 이야기와 지리적으로도 이어지는 곳이다.",description_en:"A campus confirmed as a filming location for university-years scenes, geographically linked to the Gwangju Theater storyline nearby.",tag:"대학 시절 촬영지",tag_en:"University-years filming location",travelTip:"광주극장에서 차로 약 15분 거리로, 광주 촬영지 코스로 함께 묶기 좋음.",travelTip_en:"About 15 min by car from Gwangju Theater — easy to pair as a Gwangju filming-locations course."},
 {id:"jongno_joongang_hs",order:19,modernName:"서울 종로구 — 중앙고등학교",lat:37.5824,lng:126.9946,description:"1908년 개교한 서울의 유서 깊은 고등학교로, 극중 서울 배경 장면의 실제 촬영지로 확인됐다.",description_en:"A historic Seoul high school founded in 1908, confirmed as a real filming location for the drama's Seoul-set scenes.",tag:"서울 장면 실제 촬영지",tag_en:"Real filming location for Seoul scenes",travelTip:"근대건축물로도 유명해 교정 자체가 볼거리. 인근 북촌·삼청동과 함께 둘러보기 좋음.",travelTip_en:"Famous for its historic architecture — the campus itself is worth seeing. Easy to combine with nearby Bukchon and Samcheong-dong."},
 {id:"unmunsa_temple",order:20,modernName:"경북 청도군 운문면 — 운문사",lat:35.7139,lng:128.9767,description:"극중 사찰 방문 장면이 촬영된 실제 천년 고찰.",description_en:"A real thousand-year-old Buddhist temple where the drama's temple-visit scene was filmed.",tag:"사찰 장면 촬영지",tag_en:"Temple scene filming location",travelTip:"경내에 500년 넘은 처진소나무(천연기념물)가 있어 함께 볼 만함.",travelTip_en:"Home to a 500-year-old weeping pine tree (a designated natural monument) worth seeing on the same visit."},
 {id:"busan_maechukji",order:21,modernName:"부산 동구 — 매축지마을",lat:35.1279,lng:129.0625,description:"한국전쟁 피란민들이 정착해 만든, 좁은 골목과 판잣집이 남아있는 동네. 19살 관식과 18살 애순이 함께 도피하는 장면이 이곳에서 촬영됐다.",description_en:"A neighborhood of narrow alleys and makeshift housing built by Korean War refugees. The scene of 19-year-old Gwan-sik and 18-year-old Ae-sun running away together was filmed here.",tag:"애순·관식 도피 장면",tag_en:"Ae-sun and Gwan-sik's runaway scene",travelTip:"부산 원도심(범일동) 일대, 1960~70년대 정취가 그대로 남아있는 골목길 투어로 인기.",travelTip_en:"In Beomil-dong, central old Busan — popular for its alley walking tour that preserves a 1960s–70s atmosphere."},
 {id:"yeosu_opening",order:22,modernName:"전남 여수시",lat:34.7604,lng:127.6622,description:"드라마의 첫 장면, 즉 오프닝 시퀀스가 실제로는 제주가 아니라 이곳 여수에서 촬영됐다는 사실이 방영 후 화제가 됐다.",description_en:"It became a notable trivia point after the show aired that the drama's very first scene — its opening sequence — was actually filmed not in Jeju but here in Yeosu.",tag:"오프닝 장면 실제 촬영지",tag_en:"Where the opening scene was actually filmed",travelTip:"여수 밤바다로 유명한 관광 도시. 오동도, 여수해상케이블카 등과 함께 묶어 여행하기 좋음.",travelTip_en:"A tourist city famous for its night sea views. Easy to combine with Odongdo Island and the Yeosu cable car."},
 {id:"seoul_national_univ",order:23,modernName:"서울 관악구 — 서울대학교",lat:37.4602,lng:126.9520,description:"제주를 떠난 금명이 1987년 입학한 영어영문학과가 있는 곳. 금명의 첫사랑이자 서울 인연인 박영범도 이곳 법과대학 출신으로, 두 사람의 서울 시절 이야기가 시작되는 배경이다.",description_en:"Where Geum-myeong, having left Jeju, enrolled in the English Literature department in 1987. Her first Seoul love interest, Park Yeong-beom, also studied here at the College of Law — the starting point of their Seoul-era story.",tag:"금명의 대학 시절",tag_en:"Geum-myeong's university years",travelTip:"관악산 자락에 위치. 캠퍼스 규모가 커서 미리 동선을 정해두는 게 좋음.",travelTip_en:"Located at the foot of Mt. Gwanak. The campus is large, so it helps to plan your route in advance."},
 {id:"cheongsim_camp",order:24,modernName:"제주 — 청심국제해양청소년수련원",lat:33.5470,lng:126.6870,description:"극중 청소년 시절 단체 활동 장면이 촬영된 것으로 확인된 해양 청소년 수련시설.",description_en:"A marine youth training facility confirmed as a filming location for a group-activity scene from the characters' teenage years.",tag:"청소년 시절 촬영지",tag_en:"Teenage-years filming location",travelTip:"제주 동부 해안 인근에 위치.",travelTip_en:"Located near Jeju's eastern coast."},
 {id:"udo_island",order:25,modernName:"제주 제주시 — 우도",lat:33.5000,lng:126.9515,description:"성산항에서 배로 건너는 작은 섬. 극중 두 사람이 자전거를 타며 한가로운 시간을 보내는 장면이 이곳에서 촬영됐다.",description_en:"A small island reached by boat from Seongsan Port. The scene of the two leads spending a leisurely afternoon cycling together was filmed here.",tag:"자전거 데이트 장면",tag_en:"Bicycle-date scene",travelTip:"성산일출봉 인근 성산항에서 도항선으로 약 15분.",travelTip_en:"About a 15-minute ferry ride from Seongsan Port, near Seongsan Ilchulbong."},
 {id:"hamdeok_seowoobong",order:26,modernName:"제주 제주시 조천읍 — 함덕해수욕장·서우봉",lat:33.5433,lng:126.6697,description:"에메랄드빛 바다와 하얀 모래사장, 봄이면 서우봉을 노랗게 물들이는 유채꽃으로 유명한 해변. 극중 두 사람이 바다를 바라보며 깊은 대화를 나누는 장면의 배경이 됐다.",description_en:"A beach famous for its emerald water, white sand, and the canola flowers that turn Seowobong hill yellow every spring. Used as the backdrop for a scene of the two leads having a heart-to-heart by the sea.",tag:"바닷가 대화 장면",tag_en:"Seaside conversation scene",travelTip:"제주시내에서 차로 약 30분. 서우봉 유채꽃은 3~4월이 절정.",travelTip_en:"About 30 min by car from Jeju City. Seowobong's canola flowers peak in March–April."},
 {id:"jeju_folk_village",order:27,modernName:"제주 서귀포시 표선면 — 제주민속촌",lat:33.3211,lng:126.8367,description:"제주의 전통 가옥과 생활상을 그대로 복원해놓은 민속촌으로, 극중 1960년대 제주 마을의 모습을 구현하기 위해 활용됐다.",description_en:"A folk village that faithfully recreates traditional Jeju houses and daily life, used to help recreate the look of a 1960s Jeju village.",tag:"1960년대 마을 재현",tag_en:"1960s village recreation",travelTip:"표선해수욕장 바로 인근에 위치해 함께 둘러보기 좋음.",travelTip_en:"Located right next to Pyoseon Beach, easy to visit together."},
 {id:"jeju_oreum_trail",order:28,modernName:"제주 — 오름길(용눈이오름 인근)",lat:33.4590,lng:126.8330,description:"완만한 능선이 이어지는 제주 특유의 오름 지형. 극중 애순과 관식이 나란히 걸어가는 장면의 배경으로 여러 차례 등장한다.",description_en:"Jeju's distinctive gently-sloped volcanic hills. This landscape appears repeatedly as the backdrop for scenes of Ae-sun and Gwan-sik walking side by side.",tag:"산책 장면 반복 배경",tag_en:"Recurring walking-scene backdrop",travelTip:"용눈이오름은 정상까지 왕복 30~40분이면 오를 수 있는 완만한 코스로 유명.",travelTip_en:"Yongnuni Oreum is known for its gentle 30–40 minute round-trip hike to the summit."}
];

/* 2026-08 2단계 4-6(지연 로딩): DATA를 리터럴 한 번 평가에서 "빌더 함수 + 재바인딩" 구조로 변경.
   인물·장소 파일들이 페이지 로드 시점에 없어도(지연 로딩 전) typeof 가드 덕에 빈 배열로 시작하고,
   파일이 뒤늦게 로드되면 rebindWorkData()가 같은 리터럴을 다시 평가해 실데이터로 채운다.
   DATA 객체 자체는 동일 참조를 유지(키만 교체)하므로 앱 코드는 아무것도 몰라도 된다. */
function buildWorkDataMap(){ return {
  daemang: { locations: DAEMANG_LOCATIONS, people: ((typeof DAEMANG_PEOPLE_PART1 !== 'undefined') ? DAEMANG_PEOPLE_PART1 : []).concat((typeof DAEMANG_PEOPLE_PART2 !== 'undefined') ? DAEMANG_PEOPLE_PART2 : []) },
  kiminonawa: { locations: KIMINONAWA_LOCATIONS, people: (typeof KIMINONAWA_PEOPLE !== 'undefined') ? KIMINONAWA_PEOPLE : [] },
  suzume: { locations: SUZUME_LOCATIONS, people: (typeof SUZUME_PEOPLE !== 'undefined') ? SUZUME_PEOPLE : [] },
  poksshak: { locations: POKSSAK_LOCATIONS, people: (typeof POKSSAK_PEOPLE !== 'undefined') ? POKSSAK_PEOPLE : [] },
  santi: { locations: (typeof SANTI_LOCATIONS !== 'undefined') ? SANTI_LOCATIONS : [], people: (typeof SANTI_PEOPLE !== 'undefined') ? SANTI_PEOPLE : [] },
  breakingbad: { locations: (typeof BREAKINGBAD_LOCATIONS !== 'undefined') ? BREAKINGBAD_LOCATIONS : [], people: (typeof BREAKINGBAD_PEOPLE !== 'undefined') ? BREAKINGBAD_PEOPLE : [] },
  harrypotter: { locations: (typeof HARRYPOTTER_LOCATIONS !== 'undefined') ? HARRYPOTTER_LOCATIONS : [], people: (typeof HARRYPOTTER_PEOPLE !== 'undefined') ? HARRYPOTTER_PEOPLE : [] },
  kdemonhunters: { locations: (typeof KDEMONHUNTERS_LOCATIONS !== 'undefined') ? KDEMONHUNTERS_LOCATIONS : [], people: (typeof KDEMONHUNTERS_PEOPLE !== 'undefined') ? KDEMONHUNTERS_PEOPLE : [] },
  gameofthrones: { locations: (typeof GOT_LOCATIONS !== 'undefined') ? GOT_LOCATIONS : [], people: (typeof GOT_PEOPLE !== 'undefined') ? GOT_PEOPLE : [] },
  wednesday: { locations: (typeof WEDNESDAY_LOCATIONS !== 'undefined') ? WEDNESDAY_LOCATIONS : [], people: (typeof WEDNESDAY_PEOPLE !== 'undefined') ? WEDNESDAY_PEOPLE : [] },
  strangerthings: { locations: (typeof STRANGERTHINGS_LOCATIONS !== 'undefined') ? STRANGERTHINGS_LOCATIONS : [], people: (typeof STRANGERTHINGS_PEOPLE !== 'undefined') ? STRANGERTHINGS_PEOPLE : [] },
  squidgame: { locations: (typeof SQUIDGAME_LOCATIONS !== 'undefined') ? SQUIDGAME_LOCATIONS : [], people: (typeof SQUIDGAME_PEOPLE !== 'undefined') ? SQUIDGAME_PEOPLE : [] },
  emilyinparis: { locations: (typeof EMILYINPARIS_LOCATIONS !== 'undefined') ? EMILYINPARIS_LOCATIONS : [], people: (typeof EMILYINPARIS_PEOPLE !== 'undefined') ? EMILYINPARIS_PEOPLE : [] },
  bridgerton: { locations: (typeof BRIDGERTON_LOCATIONS !== 'undefined') ? BRIDGERTON_LOCATIONS : [], people: (typeof BRIDGERTON_PEOPLE !== 'undefined') ? BRIDGERTON_PEOPLE : [] },
  lotr: { locations: (typeof LOTR_LOCATIONS !== 'undefined') ? LOTR_LOCATIONS : [], people: (typeof LOTR_PEOPLE !== 'undefined') ? LOTR_PEOPLE : [] },
  moneyheist: { locations: (typeof MONEYHEIST_LOCATIONS !== 'undefined') ? MONEYHEIST_LOCATIONS : [], people: (typeof MONEYHEIST_PEOPLE !== 'undefined') ? MONEYHEIST_PEOPLE : [] },
  onepiece: { locations: (typeof ONEPIECE_LOCATIONS !== 'undefined') ? ONEPIECE_LOCATIONS : [], people: (typeof ONEPIECE_PEOPLE !== 'undefined') ? ONEPIECE_PEOPLE : [] },
  jikji: { locations: (typeof JIKJI_LOCATIONS !== 'undefined') ? JIKJI_LOCATIONS : [], people: (typeof JIKJI_PEOPLE !== 'undefined') ? JIKJI_PEOPLE : [] },
  glory: { locations: (typeof GLORY_LOCATIONS !== 'undefined') ? GLORY_LOCATIONS : [], people: (typeof GLORY_PEOPLE !== 'undefined') ? GLORY_PEOPLE : [] },
  woo: { locations: (typeof WOO_LOCATIONS !== 'undefined') ? WOO_LOCATIONS : [], people: (typeof WOO_PEOPLE !== 'undefined') ? WOO_PEOPLE : [] },
  taebaek: { locations: [
      ...((typeof TAEBAEK_LOCATIONS !== 'undefined') ? TAEBAEK_LOCATIONS : []),
      ...((typeof TAEBAEK_LOCATIONS2 !== 'undefined') ? TAEBAEK_LOCATIONS2 : []),
      ...((typeof TAEBAEK_LOCATIONS3 !== 'undefined') ? TAEBAEK_LOCATIONS3 : [])
    ], people: [
      ...((typeof TAEBAEK_PEOPLE !== 'undefined') ? TAEBAEK_PEOPLE : []),
      ...((typeof TAEBAEK_PEOPLE2 !== 'undefined') ? TAEBAEK_PEOPLE2 : []),
      ...((typeof TAEBAEK_PEOPLE3 !== 'undefined') ? TAEBAEK_PEOPLE3 : []),
      ...((typeof TAEBAEK_PEOPLE4 !== 'undefined') ? TAEBAEK_PEOPLE4 : []),
      ...((typeof TAEBAEK_PEOPLE5 !== 'undefined') ? TAEBAEK_PEOPLE5 : [])
    ] },
  sunshine: { locations: (typeof SUNSHINE_LOCATIONS1 !== 'undefined' ? SUNSHINE_LOCATIONS1 : []).concat(typeof SUNSHINE_LOCATIONS2 !== 'undefined' ? SUNSHINE_LOCATIONS2 : []), people: (typeof SUNSHINE_PEOPLE1 !== 'undefined' ? SUNSHINE_PEOPLE1 : []).concat(typeof SUNSHINE_PEOPLE2 !== 'undefined' ? SUNSHINE_PEOPLE2 : []) },
  pachinko: { locations: (typeof PACHINKO_LOCATIONS !== 'undefined') ? PACHINKO_LOCATIONS : [], people: (typeof PACHINKO_PEOPLE !== 'undefined') ? PACHINKO_PEOPLE : [] },
  namiya: { locations: (typeof NAMIYA_LOCATIONS !== 'undefined') ? NAMIYA_LOCATIONS : [], people: (typeof NAMIYA_PEOPLE !== 'undefined') ? NAMIYA_PEOPLE : [] },
  suspectx: { locations: (typeof SUSPECTX_LOCATIONS !== 'undefined') ? SUSPECTX_LOCATIONS : [], people: (typeof SUSPECTX_PEOPLE !== 'undefined') ? SUSPECTX_PEOPLE : [] },
  byakuya: { locations: (typeof BYAKUYA_LOCATIONS !== 'undefined') ? BYAKUYA_LOCATIONS : [], people: (typeof BYAKUYA_PEOPLE !== 'undefined') ? BYAKUYA_PEOPLE : [] },
  kimetsu: { locations: (typeof KIMETSU_LOCATIONS !== 'undefined') ? KIMETSU_LOCATIONS : [], people: (typeof KIMETSU_PEOPLE !== 'undefined') ? KIMETSU_PEOPLE : [] },
  hope: { locations: (typeof HOPE_LOCATIONS !== 'undefined') ? HOPE_LOCATIONS : [], people: (typeof HOPE_PEOPLE !== 'undefined') ? HOPE_PEOPLE : [] },
  odyssey: { locations: (typeof ODYSSEY_LOCATIONS !== 'undefined') ? ODYSSEY_LOCATIONS : [], people: (typeof ODYSSEY_PEOPLE !== 'undefined') ? ODYSSEY_PEOPLE : [] },
  dokkaebi: { locations: (typeof DOKKAEBI_LOCATIONS !== 'undefined') ? DOKKAEBI_LOCATIONS : [], people: (typeof DOKKAEBI_PEOPLE !== 'undefined') ? DOKKAEBI_PEOPLE : [] },
  gwandong: { locations: (typeof GWANDONG_LOCATIONS !== 'undefined') ? GWANDONG_LOCATIONS : [], people: (typeof GWANDONG_PEOPLE !== 'undefined') ? GWANDONG_PEOPLE : [] },
  wangsanam: { locations: (typeof WANGSANAM_LOCATIONS !== 'undefined') ? WANGSANAM_LOCATIONS : [], people: (typeof WANGSANAM_PEOPLE !== 'undefined') ? WANGSANAM_PEOPLE : [] },
  spiderman: { locations: (typeof SPIDERMAN_LOCATIONS !== 'undefined') ? SPIDERMAN_LOCATIONS : [], people: (typeof SPIDERMAN_PEOPLE !== 'undefined') ? SPIDERMAN_PEOPLE : [] },
  sonyeon: { locations: (typeof SONYEON_LOCATIONS !== 'undefined') ? SONYEON_LOCATIONS : [], people: (typeof SONYEON_PEOPLE !== 'undefined') ? SONYEON_PEOPLE : [] },
  priests: { locations: (typeof PRIESTS_LOCATIONS !== 'undefined') ? PRIESTS_LOCATIONS : [], people: (typeof PRIESTS_PEOPLE !== 'undefined') ? PRIESTS_PEOPLE : [] },
  littleforest: { locations: (typeof LITTLEFOREST_LOCATIONS !== 'undefined') ? LITTLEFOREST_LOCATIONS : [], people: (typeof LITTLEFOREST_PEOPLE !== 'undefined') ? LITTLEFOREST_PEOPLE : [] },
  isatong: { locations: (typeof ISATONG_LOCATIONS !== 'undefined') ? ISATONG_LOCATIONS : [], people: (typeof ISATONG_PEOPLE !== 'undefined') ? ISATONG_PEOPLE : [] },
  conanhighway: { locations: (typeof CONANHIGHWAY_LOCATIONS !== 'undefined') ? CONANHIGHWAY_LOCATIONS : [], people: (typeof CONANHIGHWAY_PEOPLE !== 'undefined') ? CONANHIGHWAY_PEOPLE : [] },
  prada2: { locations: (typeof PRADA2_LOCATIONS !== 'undefined') ? PRADA2_LOCATIONS : [], people: (typeof PRADA2_PEOPLE !== 'undefined') ? PRADA2_PEOPLE : [] },
  wintersonata: { locations: (typeof WINTERSONATA_LOCATIONS !== 'undefined') ? WINTERSONATA_LOCATIONS : [], people: (typeof WINTERSONATA_PEOPLE !== 'undefined') ? WINTERSONATA_PEOPLE : [] },
  coffeeprince: { locations: (typeof COFFEEPRINCE_LOCATIONS !== 'undefined') ? COFFEEPRINCE_LOCATIONS : [], people: (typeof COFFEEPRINCE_PEOPLE !== 'undefined') ? COFFEEPRINCE_PEOPLE : [] },
  daejanggeum: { locations: (typeof DAEJANGGEUM_LOCATIONS !== 'undefined') ? DAEJANGGEUM_LOCATIONS : [], people: (typeof DAEJANGGEUM_PEOPLE !== 'undefined') ? DAEJANGGEUM_PEOPLE : [] }
}; }
const DATA = buildWorkDataMap();
// 지연 로딩된 작품 파일이 도착한 뒤 호출 — 리터럴을 다시 평가해 빈 배열이던 항목을 실데이터로 교체.
// (DATA 객체 참조는 그대로 두고 키만 갱신해, 이미 DATA를 참조 중인 코드가 깨지지 않게 한다)
function rebindWorkData(){
  const fresh = buildWorkDataMap();
  Object.keys(fresh).forEach(function(k){ DATA[k] = fresh[k]; });
}

/* ============================================================
   너의 이름은. 사건 타임라인 (15개) — 2026-08 신규 기획안(kiminonawa_plan) 반영
   ============================================================ */
const KIMINONAWA_TIMELINE = [
  { year:"발단", title:"몸이 뒤바뀌는 첫 아침", note:"미츠하가 낯선 방(도쿄, 타키의 몸)에서 눈을 뜨며 이야기가 시작된다.", important:true },
  { year:"발단", title:"서로의 하루를 위한 규칙 정하기", note:"타키와 미츠하는 노트와 스마트폰에 메모를 남기며 서로의 일상이 엉키지 않도록 규칙을 정한다.", important:false },
  { year:"교류기", title:"도쿄 신주쿠에서의 하루", note:"미츠하가 타키의 몸으로 도쿄 도심에서의 삶을 경험한다.", important:false, locId:"shinjuku_south" },
  { year:"교류기", title:"오쿠데라 선배와의 데이트", note:"타키의 몸에 들어간 미츠하가 타키를 대신해 오쿠데라 선배와의 만남을 이끈다.", important:false },
  { year:"단절", title:"갑작스러운 몸바뀜의 중단", note:"어느 날부터 몸이 더 이상 바뀌지 않으며, 타키는 불안 속에 미츠하를 찾아 나선다.", important:true },
  { year:"탐색", title:"히다후루카와로 향하다", note:"기억 속 풍경만을 단서로, 타키가 실제로 존재하는지도 몰랐던 마을을 찾아 히다로 떠난다.", important:true, locId:"hida_furukawa_station" },
  { year:"탐색", title:"히다시립도서관에서의 조사", note:"이토모리라는 마을의 흔적을 찾아 도서관에서 옛 자료를 뒤진다.", important:false, locId:"hida_library" },
  { year:"탐색", title:"국수가게 주인의 증언", note:"나카야 국수가게 주인에게서 '이토모리는 3년 전 혜성 낙하로 사라진 마을'이라는 충격적인 사실을 듣는다.", important:true, locId:"nakaya_ramen" },
  { year:"반전", title:"스와호에서 깨닫는 3년의 시차", note:"눈앞의 풍경이 기억과 다르다는 것을 알아채며, 타키는 자신이 3년 전의 미츠하와 이어져 있었음을 깨닫는다.", important:true, locId:"lake_suwa" },
  { year:"반전", title:"구치카미자케를 마시고 과거로", note:"미야미즈 신사(모델: 기타와카미야 신사)의 신체에서 구치카미자케를 마시고 재난 당일의 이토모리로 의식이 연결된다.", important:true, locId:"ketawakamiya_shrine" },
  { year:"클라이맥스", title:"마을 사람들을 설득하다", note:"미츠하의 몸으로 마을 사람들에게 재난을 알리려 하지만 아무도 믿어주지 않는다.", important:false },
  { year:"클라이맥스", title:"황혼의 경계에서의 재회", note:"다소가레도키(황혼 무렵)의 짧은 시간, 타키와 미츠하가 서로를 인지한 채 마주친다.", important:true },
  { year:"클라이맥스", title:"이름을 잊지 않기 위한 약속", note:"서로의 손에 이름을 적어 주며, 재난을 막을 마지막 실마리를 남긴다.", important:false },
  { year:"에필로그", title:"각자의 일상으로", note:"재난 이후 두 사람은 서로를 기억하지 못한 채 각자의 삶을 살아간다. 무언가를 찾는 듯한 상실감만이 남는다.", important:false },
  { year:"에필로그", title:"스가 신사 계단에서의 재회", note:"몇 년 후, 도쿄의 스가 신사 계단에서 두 사람이 다시 마주친다 — 팬들 사이 최고 인기 성지의 실제 무대.", important:true, locId:"suga_shrine" }
];

/* ============================================================
   스즈메의 문단속 여정 타임라인 (12~15개) — 2026-08 신규 기획안(suzume_plan) 반영
   ============================================================ */
const SUZUME_TIMELINE = [
  { year:"규슈", title:"아부라쓰항, 소타와의 첫 만남", note:"등굣길의 스즈메가 '문을 찾고 있다'는 낯선 청년 소타와 마주치며 이야기가 시작된다.", important:true, locId:"aburatsu" },
  { year:"규슈", title:"폐허의 문을 열다", note:"산속 폐허에서 저세상으로 통하는 첫 번째 문을 발견하고, 미미즈(재해를 부르는 존재)가 새어 나오려 한다.", important:true },
  { year:"규슈", title:"요석에서 풀려난 다이진", note:"문을 잠그는 요석이 고양이 다이진으로 변해 도망치고, 대신 소타가 의자로 변해버린다.", important:true },
  { year:"이동", title:"야와타하마항에서 시코쿠로", note:"다이진을 쫓아 페리를 타고 규슈에서 시코쿠로 건너간다.", important:false, locId:"yawatahama" },
  { year:"시코쿠·고베", title:"고베의 폐유원지에서 두 번째 문", note:"산속 놀이공원에서 또 다른 문을 만나 함께 잠근다.", important:false, locId:"kobe_fruit_flower_park" },
  { year:"고베", title:"니노미야 상점가, 루미와의 며칠", note:"스낵바를 운영하는 루미의 도움으로 고베에서 며칠을 함께 지낸다.", important:false, locId:"ninomiya_shopping_street" },
  { year:"고베→도쿄", title:"아카시해협대교를 건너다", note:"혼슈로 향하는 여정 중 세계 최장급 현수교를 지난다.", important:false, locId:"akashi_kaikyo_bridge" },
  { year:"도쿄", title:"오차노미즈에서 도쿄로 진입", note:"간다강을 가로지르는 히지리바시를 건너며 도쿄 파트가 시작된다.", important:false, locId:"hijiribashi_ochanomizu" },
  { year:"도쿄", title:"도쿄의 뒷문을 발견하다", note:"기타노마루공원·우시가후치 인근에서 '도쿄의 뒷문'의 존재를 알게 된다.", important:true, locId:"ushigafuchi" },
  { year:"도쿄", title:"도쿄에서의 결전", note:"거대해진 미미즈를 막기 위해 스즈메와 소타가 목숨을 건 결전을 벌인다.", important:true },
  { year:"화해", title:"다이진과의 화해", note:"내내 미워했던 다이진의 진짜 마음을 이해하게 된다.", important:false },
  { year:"도호쿠", title:"어린 시절의 자신과 마주하다", note:"스즈메가 진짜 뒷문이 있는 고향으로 향하며, 잊고 있던 자신의 과거와 마주하기 시작한다.", important:true },
  { year:"도호쿠", title:"미치노에키 오야카이간, 재난의 기억", note:"동일본대지진 이후 복구된 이 해안 도로휴게소에서, 스즈메는 12년 전 자신이 겪은 재난의 기억과 정면으로 마주한다.", important:true, locId:"ooya_kaigan" },
  { year:"결말부", title:"마지막 문을 닫다", note:"스즈메가 마지막 문 너머의 존재와 대화하며 이야기를 매듭짓는다 — 구체적 결말은 직접 작품으로 확인하는 것을 권한다.", important:false }
];

/* ============================================================
   폭싹 속았수다 인생 연대기 타임라인 (20개) — 2026-08 신규 기획안(poksshak_plan) 반영
   실제 촬영지가 극중 시대·장소와 다른 경우(안동 세트장=도동리, 고창=제주 유채꽃밭 등)가 많아,
   note에 이 '진짜 vs 촬영지' 반전을 함께 적어 흥미를 더함.
   ============================================================ */
const POKSSAK_TIMELINE = [
  { year:"유년기", title:"도동리에서 나고 자란 두 아이", note:"제주 도동리를 배경으로 한 1950~60년대 마을 장면은 실제로는 안동에 지어진 세트장에서 촬영됐다.", important:true, locId:"andong_set" },
  { year:"유년기", title:"해녀 어머니들의 삶", note:"김녕해수욕장에서, 애순·관식 두 집안 어머니 세대 해녀들의 고된 삶이 그려진다.", important:false, locId:"gimnyeong_beach" },
  { year:"유년기", title:"전쟁 직후 시장 풍경", note:"계산성당 주변 오픈세트에서, 어린 애순과 관식이 양배추와 생선을 팔던 한국전쟁 직후의 시장 장면이 촬영됐다.", important:false, locId:"daegu_gyesan_set" },
  { year:"유년기", title:"드라마의 첫 장면", note:"극의 오프닝 시퀀스는 제주가 아니라 여수에서 촬영된 것으로 방영 후 화제가 됐다.", important:false, locId:"yeosu_opening" },
  { year:"학창시절", title:"칠보중학교의 나날", note:"학창 시절 장면의 실제 촬영지 중 하나.", important:false, locId:"jeongeup_chilbo_ms" },
  { year:"청소년기", title:"협재해수욕장, 파도를 뛰놀던 시절", note:"애순과 관식이 파도를 뛰놀고 노을을 바라보는, 가장 다정한 장면들이 촬영된 해변.", important:true, locId:"hyeopjae_beach" },
  { year:"청년기", title:"첫 입맞춤 — 제주가 아니었던 유채꽃밭", note:"많은 시청자가 제주 유채꽃밭으로 짐작했던 이 명장면은 실제로는 전북 고창 학원농장의 유채꽃밭에서 촬영됐다.", important:true, locId:"gochang_hagwon_farm" },
  { year:"청년기", title:"가시리 유채꽃밭의 나날", note:"두 사람의 로맨스가 무르익는 시기의 배경이 된 노란 유채꽃밭.", important:false, locId:"gasi_canola_field" },
  { year:"청년기", title:"매축지마을에서의 도피", note:"19살 관식과 18살 애순이 함께 도피하는 장면이 부산의 실존 동네에서 촬영됐다.", important:true, locId:"busan_maechukji" },
  { year:"청년기", title:"섭지코지, 등대를 향한 산책", note:"극중 가장 인상적인 산책 장면들의 배경이 된 해안 언덕.", important:false, locId:"seopjikoji" },
  { year:"혼인 이후", title:"성산일출봉에서의 삼천배", note:"아이가 생기지 않아 시어머니를 따라 삼천배를 올리는, 극중 가장 눈물겨운 장면의 촬영지.", important:true, locId:"seongsan_ilchulbong" },
  { year:"혼인 이후", title:"오라동 메밀꽃밭의 부부", note:"하얀 메밀꽃이 가득 피는 곳에서의 로맨틱한 부부 시절 장면.", important:false, locId:"ora_buckwheat_field" },
  { year:"중년기", title:"우도에서 보내는 한가로운 시간", note:"자전거를 타며 한가로운 시간을 보내는 장면이 촬영된 작은 섬.", important:false, locId:"udo_island" },
  { year:"중년기", title:"함덕해수욕장, 바다를 보며 나누는 대화", note:"바다를 바라보며 깊은 대화를 나누는 장면의 배경이 된 해변.", important:false, locId:"hamdeok_seowoobong" },
  { year:"자녀 세대", title:"딸 금명, 청소년 수련회", note:"자녀 세대의 청소년 시절 단체 활동 장면이 촬영된 해양 청소년 수련시설.", important:false, locId:"cheongsim_camp" },
  { year:"자녀 세대", title:"금명, 1987년 서울대학교 입학", note:"제주를 떠난 금명이 입학한 대학 — 첫사랑이자 서울 인연인 박영범과의 이야기가 시작되는 배경.", important:true, locId:"seoul_national_univ" },
  { year:"자녀 세대", title:"전남대학교, 대학 시절", note:"금명의 대학 시절 장면이 촬영된 캠퍼스.", important:false, locId:"jeonnam_univ" },
  { year:"자녀 세대", title:"광주극장('깐느극장')의 금명과 충섭", note:"매표소 아르바이트생 금명과 간판화가 충섭의 인연이 쌓이는 극 후반부 핵심 공간.", important:true, locId:"gwangju_theater" },
  { year:"자녀 세대", title:"가실성당의 결혼식", note:"1895년에 지어진 고딕풍 성당이 훗날 금명의 결혼식 장면 배경으로 등장한다.", important:false, locId:"chilgok_gasil_cathedral" },
  { year:"노년기", title:"오름길을 나란히 걷다", note:"세월이 흐른 뒤에도, 애순과 관식은 완만한 오름 능선을 나란히 걷는다 — 이후의 이야기는 직접 작품으로 확인하는 것을 권한다.", important:true, locId:"jeju_oreum_trail" }
];

/* ============================================================
   작품별 공식 스포티파이 임베드 (WORK_SPOTIFY) — 2026-08 신규 기획안 반영
   원작 소설(대망)처럼 공식 스코어/OST가 확인되지 않는 작품은 목록에 포함하지 않음(공식 소스만 사용 원칙).
   type: 'track' | 'album', id: Spotify URI의 마지막 세그먼트, label: 사이드바에 표시할 곡/앨범 설명
   ============================================================ */
const WORK_SPOTIFY = {
  kiminonawa: { type:'track', id:'3OWQGA40CgyZ7AHhVTOe34', label:'前前前世(movie ver.) — RADWIMPS' },
  suzume: { type:'track', id:'7LHAKF7pBqHch8o6Yo0ad5', label:'Suzume (feat. Toaka) — RADWIMPS' },
  poksshak: { type:'track', id:'799r6wVHx3xbMs1XT8MaG9', label:'밤 산책(Midnight Walk) — IU' },
  santi: { type:'album', id:'6VhG7xEPrBO3YjmQj9OcUn', label:'3 Body Problem (Netflix Soundtrack) — Ramin Djawadi' },
  harrypotter: { type:'playlist', id:'3zS3jhuO3m2KlMX4N3TAJQ', label:'Harry Potter: The Official Playlist — WaterTower Music' },
  breakingbad: { type:'track', id:'6bxaW76je4bz5WjZ6ggtH1', label:'Baby Blue (Re-Recorded) — Badfinger' },
  kdemonhunters: { type:'track', id:'1CPZ5BxNNd0n0nF4Orb9JS', label:'Golden — HUNTR/X' },
  gameofthrones: { type:'playlist', id:'37i9dQZF1DXdnZT5DhATDx', label:'Game of Thrones (Official Soundtrack Playlist)' },
  wednesday: { type:'track', id:'3EEd6ldsPat620GVYMEhOP', label:'Goo Goo Muck — The Cramps' },
  strangerthings: { type:'track', id:'66bvSdC7W3iIY2wUFL3JUI', label:'Running Up That Hill — Kate Bush' },
  squidgame: { type:'track', id:'4M1bmtjzXQTE3Qasv9lCpa', label:'Way Back Then — 정재일' },
  emilyinparis: { type:'playlist', id:'37i9dQZF1DXaoHd4tiCLZf', label:'Emily in Paris (Official Soundtrack Playlist)' },
  bridgerton: { type:'playlist', id:'37i9dQZF1DX5Hl0iWtr5b3', label:'Bridgerton (Official Soundtrack Playlist)' },
  lotr: { type:'track', id:'644es5aYPJghtZLjM1rmSP', label:'Concerning Hobbits — Howard Shore' },
  moneyheist: { type:'track', id:'3ISMDCuo2KDOC64nXz0Vah', label:'Bella Ciao — Manu Pilas' },
  pachinko: { type:'album', id:'6uo6H9JiX6ZeiHE0aHTdFt', label:"Let's Live for Today (Pachinko S1 오프닝 크레딧 곡) — LEENALCHI" },
  onepiece: { type:'track', id:'4X2OJQpy9d5vrFjlj4NhAg', label:'We Are! — 기타다니 히로시' }
};

/* ============================================================
   작품별 공식 예고편 유튜브 임베드 (WORK_TRAILERS) — 2026-08 기획안 4-2절 반영.
   channel official YouTube에 올라온 "공식 예고편"만 채워 넣는다(팬 편집·2차가공 영상 금지 —
   WORK_SPOTIFY와 동일한 "공식 소스만 사용" 원칙). 아직 전 작품을 다 조사하지 못했으므로
   이 목록에 없는 작품은 사이드바에서 이전처럼 유튜브 검색 링크로 안내한다(toggleTrailer()
   호출 없이 외부 링크로 폴백 — resetSidebar()의 trailerBtnHtml 분기 참고). 목록은 점진적으로
   확장 가능(항목 하나 추가하는 것만으로 그 작품에도 바로 임베드가 켜짐).
   ============================================================ */
const WORK_TRAILERS = {
  wangsanam: { videoId:'PA4rsZbNVbA', channel:'공식 예고편(유튜브)' },
  glory: { videoId:'yojSF0MeFqo', channel:'Netflix Korea' },
  woo: { videoId:'JQ2rukD8B8U', channel:'ENA' }
};

/* ============================================================
   해리 포터 영화 8편 사건 타임라인 (1991~1998, 32개 이벤트)
   기획안 4-1절 기준. 5~8편(1995년 이후)은 스포일러 수위가 높은 구간이라
   note 문구를 결과보다 "무슨 사건이 벌어지는가" 위주로 절제해서 서술함.
   ============================================================ */
const HARRYPOTTER_TIMELINE = [
  { year:"1편·1991", title:"9와 3/4 승강장에서 첫 탑승", note:"11살 해리가 킹스크로스역에서 호그와트 익스프레스를 처음 타고 마법세계로 들어감.", important:true, locId:"kingscross" },
  { year:"1편·1991", title:"분류모자 의식과 삼총사 결성", note:"그리핀도르에 배정된 해리가 론·헤르미온느와 만나며 평생의 우정이 시작됨.", important:true },
  { year:"1편·1991", title:"트롤 사건", note:"화장실에 갇힌 헤르미온느를 해리와 론이 구하며 셋의 우정이 진짜로 다져짐.", important:false },
  { year:"1편·1992", title:"마법사의 돌을 둘러싼 대결", note:"학교 지하에 숨겨진 마법사의 돌을 지키기 위한 첫 시험대를 통과함.", important:true },
  { year:"2편·1992", title:"위즐리 가족 자동차로 등교", note:"승강장을 놓친 해리와 론이 하늘을 나는 자동차로 호그와트에 도착함.", important:false, locId:"stpancras" },
  { year:"2편·1992", title:"비밀의 방 재개방", note:"오랫동안 잠들어 있던 비밀의 방이 다시 열리며 머글 태생 학생들이 잇따라 습격당함.", important:true },
  { year:"2편·1992", title:"도비와의 첫 만남", note:"낯선 집요정 도비가 나타나 해리에게 호그와트로 돌아가지 말라고 경고함.", important:false },
  { year:"2편·1993", title:"비밀의 방 사건의 결말", note:"근원을 찾아 내려간 지하에서 벌어진 대결로 사건의 전모가 밝혀짐.", important:true },
  { year:"3편·1993", title:"시리우스 블랙 탈옥 소식", note:"12년간 아즈카반에 갇혀 있던 시리우스 블랙이 탈옥했다는 소식이 학교 전체를 뒤흔듦.", important:true },
  { year:"3편·1993", title:"디멘터의 호그와트 익스프레스 습격", note:"열차 안에서 처음으로 디멘터를 마주하며 해리의 과거와 두려움이 드러남.", important:false },
  { year:"3편·1993", title:"루핀 교수의 정체 발각", note:"학생들에게 인기 많던 루핀 교수가 늑대인간이라는 사실이 드러남.", important:false, locId:"durhamcathedral" },
  { year:"3편·1994", title:"시간 전환 장치를 이용한 구출", note:"헤르미온느의 비밀 도구로 시간을 되돌려 벅빅과 시리우스를 구해냄.", important:true },
  { year:"4편·1994", title:"퀴디치 월드컵과 습격", note:"국제 퀴디치 결승전 직후, 죽음을 먹는 자들로 추정되는 이들의 습격이 벌어짐.", important:false },
  { year:"4편·1994", title:"트리위저드 시합 참가자로 선정", note:"나이 제한을 어기고 해리의 이름이 불의 잔에서 나오며 원치 않는 시합에 참가하게 됨.", important:true },
  { year:"4편·1994", title:"크리스마스 무도회", note:"세 학교 학생들이 함께하는 무도회에서 해리·론·헤르미온느의 관계가 새롭게 조명됨.", important:false, locId:"divinityschool" },
  { year:"4편·1995", title:"트리위저드 결승과 볼드모트의 부활", note:"미로 결승에서 벌어진 사건을 계기로 볼드모트가 육체를 되찾고 돌아옴.", important:true, locId:"steallfalls" },
  { year:"5편·1995", title:"엄브리지 교수 부임", note:"마법부가 파견한 엄브리지 교수가 호그와트 교육 전반을 장악하기 시작함.", important:true },
  { year:"5편·1995", title:"덤블도어의 군대 결성", note:"제대로 된 방어술을 배우기 위해 학생들이 비밀 모임을 결성함.", important:true, locId:"leadenhall" },
  { year:"5편·1996", title:"예언의 방으로", note:"환영에 이끌린 해리 일행이 마법부 깊은 곳, 예언이 보관된 방으로 향함.", important:false },
  { year:"5편·1996", title:"마법부 전투", note:"불사조 기사단과 죽음을 먹는 자들 사이의 전면전이 마법부 안에서 벌어짐.", important:true },
  { year:"6편·1996", title:"슬러그혼 교수의 봉인된 기억", note:"슬러그혼 교수가 오랫동안 숨겨온 기억 속에서 볼드모트 과거의 결정적 단서가 발견됨.", important:true },
  { year:"6편·1996", title:"호크룩스의 정체 확인", note:"덤블도어와 해리가 볼드모트의 불멸 비밀, 호크룩스의 존재를 함께 확인함.", important:true },
  { year:"6편·1997", title:"드레이코의 비밀 임무", note:"드레이코 말포이가 강요된 임무를 홀로 짊어지고 있다는 사실이 서서히 드러남.", important:false },
  { year:"6편·1997", title:"천문탑 위의 사건", note:"학교에서 벌어진 사건을 계기로 호그와트의 권력 구도가 완전히 무너짐.", important:true },
  { year:"7편·1997", title:"마법부 함락과 도피 시작", note:"마법부가 어둠의 세력에 장악되며 삼총사가 학교를 떠나 본격적인 도피에 나섬.", important:true, locId:"swinleyforest" },
  { year:"7편·1997", title:"호크룩스 사냥 여정", note:"단서를 좇아 여러 장소를 옮겨 다니며 호크룩스를 하나씩 찾아 나섬.", important:false, locId:"malhamcove" },
  { year:"7편·1997", title:"셸 코티지에서의 재정비", note:"위기를 넘긴 일행이 빌과 플뢰르의 해변 신혼집에서 잠시 숨을 돌림.", important:false, locId:"freshwaterwest" },
  { year:"7편·1998", title:"딱총나무 지팡이를 둘러싼 추적", note:"전설의 지팡이를 둘러싼 볼드모트의 추적이 본격화됨.", important:false },
  { year:"8편·1998", title:"그린고트 은행 침투", note:"호크룩스를 찾기 위해 마법사 세계에서 가장 경비가 삼엄한 은행에 잠입함.", important:true, locId:"australiahouse" },
  { year:"8편·1998", title:"호그와트 전투 시작", note:"학교로 돌아온 일행과 함께 학생·교사·기사단이 총력전을 준비함.", important:true },
  { year:"8편·1998", title:"스네이프의 기억과 진실", note:"스네이프가 남긴 기억을 통해 그가 감춰온 진짜 이야기가 드러남.", important:true, locId:"lacockabbey" },
  { year:"8편·1998", title:"마지막 대결", note:"7년에 걸친 이야기가 해리와 볼드모트의 최후 대결로 향함. 이후의 결말은 직접 작품을 보고 확인하세요.", important:true }
];

/* ============================================================
   브레이킹 배드 사건 타임라인 (시즌1~5, 약 25개 이벤트)
   important:true는 시리즈 전체를 통틀어 핵심 전환점, locId가 있으면 지도의 해당 장소로 연결.
   ============================================================ */
const BREAKINGBAD_TIMELINE = [
  { year:"S1", title:"말기 폐암 진단", note:"월터 화이트, 50세 생일 다음 날 말기 폐암 판정을 받음. 모든 이야기의 출발점.", important:true, locId:"walterwhite_house" },
  { year:"S1", title:"제시와의 첫 협업", note:"옛 제자 제시 핑크맨을 찾아가 마약 제조 동업을 제안함.", important:true, locId:"jesse_house" },
  { year:"S1", title:"RV 안에서의 첫 제조", note:"사막 한복판, 캠핑카를 이동식 실험실 삼아 첫 배치를 만듦.", important:false },
  { year:"S1", title:"크레이지-8·에밀리오와의 충돌", note:"첫 거래가 목숨을 건 충돌로 번지며, 마약 세계의 위험성을 처음 체감함.", important:true },
  { year:"S2", title:"사막에서 RV 고장 (4 Days Out)", note:"사막 한복판에서 캠핑카가 멈춰서며 생존 자체가 걸린 위기를 맞음.", important:false },
  { year:"S2", title:"리신 담배 미스터리 시작", note:"시즌4까지 이어지는 '누가 브록을 중독시켰나' 미스터리의 발단. 당시 팬들이 몇 달간 추리했던 화제의 떡밥.", important:false },
  { year:"S2", title:"제인 마골리스의 죽음", note:"제시의 연인 제인을 둘러싼 비극적 사건. 이후 월터의 선택에 깊은 그림자를 남김.", important:true, locId:"jesse_house" },
  { year:"S2", title:"콤보의 죽음", note:"구역 다툼 속에서 제시의 친구 콤보를 잃음.", important:false },
  { year:"S3", title:"구스 프링 본격 등장", note:"로스 포요스 에르마노스 뒤에 숨은 유통망 총책의 실체가 드러나기 시작함.", important:true, locId:"lospollos" },
  { year:"S3", title:"슈퍼랩 가동", note:"구스의 지하 슈퍼랩에서 월터가 최고 수준의 순도로 제조를 시작함.", important:true, locId:"gus_laundry" },
  { year:"S3", title:"'Fly' 에피소드", note:"실험실에 들어온 파리 한 마리를 두고 벌어지는, 시리즈에서 가장 이질적이면서도 사랑받는 회차.", important:false, locId:"gus_laundry" },
  { year:"S3", title:"살라만카 사촌들의 행크 습격", note:"침묵의 처형자 사촌들이 행크를 노리며 목숨을 건 총격전이 벌어짐.", important:true },
  { year:"S3", title:"제시, 게일 보티커를 쏨", note:"구스의 명령으로 제시가 온화한 화학자 게일을 쏘게 되는, 시리즈 최대 반전 중 하나.", important:true },
  { year:"S4", title:"브록 중독 사건", note:"안드레아의 아들 브록이 리신에 중독되는 사건. 팬들 사이에서 시즌 최대 화제가 된 미스터리의 정점.", important:true },
  { year:"S4", title:"구스 프링의 죽음 (Face Off)", note:"요양원의 헥터를 이용한 계획으로 구스가 폭사함. 한 시대의 종언.", important:true, locId:"hector_nursing" },
  { year:"S4", title:"슈퍼랩 파괴", note:"구스의 죽음과 함께 지하 슈퍼랩도 산성 폭발로 사라짐.", important:false, locId:"gus_laundry" },
  { year:"S5 전반", title:"사업 확장과 새 파트너 리디아", note:"물류 전문가 리디아와 손잡고 국제 유통망으로 사업을 확장함.", important:false, locId:"vamonos_pest" },
  { year:"S5 전반", title:"바모노스 페스트로 이동식 랩 이전", note:"텐트로 감싼 주택 안에 새 이동식 실험실을 차림.", important:false, locId:"vamonos_pest" },
  { year:"S5 전반", title:"기차 강도 작전", note:"메틸아민을 확보하기 위한 대담한 기차 탈취 작전을 감행함.", important:true },
  { year:"S5 전반", title:"마이크 얼먼트라웃의 죽음", note:"팬들이 가장 아쉬워하는 죽음 중 하나로 꼽히는, 해결사 마이크의 최후.", important:true },
  { year:"S5 후반", title:"행크, 하이젠버그의 정체를 알아챔", note:"처형 행크가 마침내 월터가 하이젠버그임을 깨달음. 시리즈 최대 반전.", important:true, locId:"hank_marie_house" },
  { year:"S5 후반", title:"오지만디아스 — 투하히일리 총격전", note:"네오나치 갱단과의 사막 총격전. 행크의 죽음과 가족의 완전한 붕괴가 시작됨.", important:true, locId:"tohajiilee" },
  { year:"S5 후반", title:"월터, 모든 것을 잃고 도피", note:"가족과 제국을 모두 잃은 채 뉴햄프셔로 홀로 도피함.", important:true },
  { year:"S5 후반", title:"최종화 (Felina)", note:"월터가 앨버커키로 돌아와 마지막 선택을 내리는 시리즈의 결말.", important:true, locId:"walterwhite_house" }
];

/* ============================================================
   2026-08 신규 기획안 10작품 — 사건 타임라인 일괄 추가
   ============================================================ */
const KDEMONHUNTERS_TIMELINE = [
  { year:"1", title:"HUNTR/X의 무대", note:"루미·미라·조이, 세계적인 K-pop 그룹이자 비밀 헌터로서 첫 대형 무대에 오름.", important:true, locId:"olympicstadium" },
  { year:"2", title:"사자 보이즈 데뷔", note:"라이벌 보이그룹 사자 보이즈가 등장하며 음악 경쟁이 시작됨.", important:true, locId:"coexkpop" },
  { year:"3", title:"루미의 비밀", note:"루미가 스스로도 감춰야 하는 정체성의 비밀을 안고 있다는 사실이 서서히 드러남.", important:true },
  { year:"4", title:"지누와의 만남", note:"루미와 사자 보이즈의 리더 지누 사이에 예상치 못한 감정적 교감이 생김.", important:true, locId:"cheongdambridge" },
  { year:"5", title:"경복궁 전통 시퀀스", note:"한국 전통 문화를 담은 상징적인 시퀀스가 펼쳐짐.", important:false, locId:"gyeongbokgung" },
  { year:"6", title:"혼문(魂門)의 균열", note:"혼문을 둘러싼 균열이 드러나며 팀 전체가 위기를 감지함.", important:true },
  { year:"7", title:"Takedown", note:"팀 내부 갈등이 최고조에 이르는 결정적 사건이 벌어짐.", important:true },
  { year:"8", title:"남산 결전", note:"N서울타워를 배경으로 한 공중 전투가 벌어짐.", important:true, locId:"nseoultower" },
  { year:"9", title:"마지막 무대", note:"팬들의 힘이 예상치 못한 방식으로 이야기를 매듭짓는 마지막 공연.", important:true, locId:"hangang" }
];

const GOT_TIMELINE = [
  { year:"S1", title:"왕의 북부 방문", note:"로버트 왕의 윈터펠 방문을 계기로 스타크가와 라니스터가의 갈등이 시작됨.", important:true, locId:"castleward" },
  { year:"S1", title:"네드의 죽음", note:"킹스랜딩에서 네드 스타크가 처형되며 다섯 왕의 전쟁이 발발함.", important:true, locId:"dubrovnik" },
  { year:"S2", title:"블랙워터 전투", note:"라니스터가가 킹스랜딩을 지켜내는 대규모 해상 전투가 벌어짐.", important:true, locId:"dubrovnik" },
  { year:"S3", title:"붉은 결혼식", note:"스타크 가문이 결혼식 자리에서 큰 타격을 입는 시리즈 최대 반전 중 하나가 벌어짐.", important:true },
  { year:"S3~4", title:"대너리스, 노예 도시 정복", note:"바다 건너 미린 등 노예 도시들을 정복하며 대너리스의 세력이 커짐.", important:true, locId:"split" },
  { year:"S4", title:"장벽 너머의 전투", note:"장벽 너머 야인들과 나이트워치 사이의 전면전이 벌어짐.", important:false, locId:"tollymore" },
  { year:"S5~6", title:"도른과 브라보스로 확장", note:"이야기의 무대가 도른과 브라보스까지 넓어지며 세계관이 확장됨.", important:false, locId:"girona" },
  { year:"S7", title:"장벽 너머 원정대", note:"백귀를 막기 위한 원정대가 장벽 너머로 향함.", important:true, locId:"vatnajokull" },
  { year:"S8", title:"윈터펠 대전", note:"백귀 군대와 인류 전체의 최종 전쟁이 윈터펠에서 벌어짐.", important:true, locId:"castleward" },
  { year:"S8", title:"철왕좌의 향방", note:"킹스랜딩의 권력 구도가 재편되며 철왕좌를 둘러싼 마지막 대결이 마무리됨.", important:true, locId:"dubrovnik" }
];

const WEDNESDAY_TIMELINE = [
  { year:"S1", title:"네버모어 입학", note:"일반 학교에서 퇴학당한 웬즈데이가 부모의 모교 네버모어 아카데미에 입학함.", important:true, locId:"cantacuzino" },
  { year:"S1", title:"이니드와의 룸메이트 생활", note:"정반대 성격의 이니드와 룸메이트가 되며 서서히 진짜 우정이 싹틈.", important:true },
  { year:"S1", title:"제리코 마을의 의문 사건", note:"마을을 뒤흔드는 연쇄 사건에 웬즈데이가 관심을 갖기 시작함.", important:true },
  { year:"S1", title:"포컵 대회", note:"학교 행사를 배경으로 갈등과 우정이 함께 깊어짐.", important:false, locId:"bucharestgarden" },
  { year:"S1", title:"괴물의 정체 추적", note:"하이드와 관련된 미스터리에 다가가며 아담스 가문의 비밀이 드러나기 시작함.", important:true, locId:"palatulmonteoru" },
  { year:"S1", title:"시즌1 최대 반전", note:"마을을 위협하던 사건의 진짜 배후가 밝혀짐.", important:true },
  { year:"S2", title:"파워스코트의 새로운 위협", note:"시즌2에서 새로운 위협과 함께 이야기가 확장됨.", important:true, locId:"powerscourt" },
  { year:"S2", title:"찰빌 성의 비밀", note:"고딕풍 고성을 배경으로 한 새로운 미스터리가 펼쳐짐.", important:false, locId:"charleville" }
];

const STRANGERTHINGS_TIMELINE = [
  { year:"1983", title:"윌의 실종", note:"윌 바이어스가 실종되고, 같은 날 낯선 소녀 일레븐이 발견됨.", important:true, locId:"jacksonga" },
  { year:"1983", title:"데모고르곤과의 첫 대면", note:"친구들이 힘을 합쳐 업사이드다운의 존재 데모고르곤과 처음 마주함.", important:true, locId:"hawkinslab" },
  { year:"1984", title:"마인드 플레이어의 위협", note:"거대한 존재가 호킨스 전체를 위협하기 시작함.", important:true },
  { year:"1985", title:"스타코트몰 전투", note:"스타코트몰을 배경으로 대규모 전투가 벌어짐.", important:true, locId:"gwinnettmall" },
  { year:"1986", title:"호퍼의 실종", note:"호퍼가 실종되며 이야기가 러시아까지 확장됨.", important:true, locId:"kamchatkaset" },
  { year:"1986", title:"베크나의 등장", note:"새로운 존재 베크나가 등장해 등장인물들의 트라우마를 파고듦.", important:true, locId:"creelhouse" },
  { year:"1986", title:"호킨스 균열", note:"호킨스 전역에 균열이 발생하며 시리즈 최대 위기를 맞음.", important:true, locId:"stonemountain" },
  { year:"1987", title:"최종장을 향해", note:"마지막 시즌을 향한 최종 결전이 예고됨.", important:false, locId:"romega" }
];

const SQUIDGAME_TIMELINE = [
  { year:"1", title:"제안", note:"빚에 몰린 성기훈이 거리에서 만난 낯선 이의 제안으로 게임 참가를 결심함.", important:true, locId:"ssangmundong" },
  { year:"2", title:"무궁화꽃이 피었습니다", note:"첫 게임에서 참가자들이 게임의 실체를 깨닫게 됨.", important:true },
  { year:"3", title:"중단 투표", note:"게임을 중단할 기회가 주어지지만 대부분의 참가자가 다시 돌아옴.", important:true, locId:"seongapdo" },
  { year:"4", title:"달고나·줄다리기", note:"여러 게임을 거치며 참가자들 사이 동맹과 배신이 반복됨.", important:false },
  { year:"5", title:"준호의 잠입", note:"황준호가 형의 흔적을 좇아 게임장에 위장 잠입함.", important:true },
  { year:"6", title:"프론트맨의 정체", note:"게임을 운영하는 프론트맨의 존재와 정체가 서서히 드러남.", important:true, locId:"daejeonstudio" },
  { year:"7", title:"마지막 게임", note:"최후까지 남은 참가자들 사이에서 벌어지는 마지막 게임.", important:true },
  { year:"S2~3", title:"기훈의 재도전", note:"시즌2·3을 거치며 기훈이 다시 게임에 뛰어들어 저항을 시도함.", important:true, locId:"incheonairport" }
];

const EMILYINPARIS_TIMELINE = [
  { year:"S1", title:"파리 발령", note:"시카고 마케팅 회사에서 파견된 에밀리, 파리의 사보아르에 합류함.", important:true, locId:"placedevalois" },
  { year:"S1", title:"이웃 가브리엘과의 만남", note:"이웃 셰프 가브리엘, 절친 민디와 새로운 관계를 맺어감.", important:true, locId:"terranera" },
  { year:"S1", title:"몽마르트르 산책", note:"파리 곳곳을 걸으며 도시에 조금씩 적응해감.", important:false, locId:"montmartre" },
  { year:"S2", title:"가브리엘·카미유 삼각관계", note:"가브리엘과 카미유를 둘러싼 삼각관계가 이어짐.", important:true },
  { year:"S2", title:"오페라 극장의 밤", note:"팔레 가르니에에서 열린 오페라 관람 장면으로 관계가 새롭게 조명됨.", important:false, locId:"palaisgarnier" },
  { year:"S3", title:"알피와의 새로운 연애", note:"영국인 알피와 새로운 연애가 시작됨.", important:true },
  { year:"S4", title:"프로방스 휴가", note:"프랑스 남부로 떠난 휴가에서 관계가 새로운 국면을 맞음.", important:false, locId:"provence" },
  { year:"S5", title:"로마로 확장", note:"무대가 로마와 베네치아까지 확장되며 마르첼로와의 새로운 만남이 시작됨.", important:true, locId:"piazzacostaguti" }
];

const BRIDGERTON_TIMELINE = [
  { year:"S1", title:"다프네의 사교계 데뷔", note:"브리저튼가의 장녀 다프네가 사교계 데뷔 시즌을 맞음.", important:true, locId:"bathassembly" },
  { year:"S1", title:"사이먼과의 계약 연애", note:"헤이스팅스 공작 사이먼과 가짜 연애 계약을 맺음.", important:true, locId:"rangershouse" },
  { year:"S1", title:"계약에서 진짜 사랑으로", note:"거짓 계약이 진짜 사랑으로 바뀌며 시즌1이 마무리됨.", important:true, locId:"castlehoward" },
  { year:"S2", title:"앤서니의 신붓감 찾기", note:"장남 앤서니가 의무감으로 신붓감을 찾기 시작함.", important:false },
  { year:"S2", title:"케이트와의 갈등", note:"케이트 샤르마와의 갈등이 서서히 사랑으로 바뀜.", important:true, locId:"wiltonhouse" },
  { year:"S3", title:"페넬로페와 콜린", note:"오랜 친구였던 페넬로페와 콜린의 관계가 새로운 국면을 맞음.", important:true, locId:"holburnemuseum" },
  { year:"S3", title:"레이디 휘슬다운의 정체", note:"레이디 휘슬다운의 정체를 둘러싼 갈등이 절정에 이름.", important:true },
  { year:"S4~", title:"다음 시즌으로", note:"남은 브리저튼 형제자매들의 이야기가 계속 이어짐.", important:false, locId:"royalcrescent" }
];

const LOTR_TIMELINE = [
  { year:"제3시대", title:"반지 상속", note:"프로도가 삼촌 빌보로부터 절대반지를 물려받음.", important:true, locId:"hobbiton" },
  { year:"제3시대", title:"원정대 결성", note:"간달프의 안내로 리븐델에 모인 대표들이 반지 원정대를 결성함.", important:true, locId:"kaitoke" },
  { year:"제3시대", title:"모리아 광산의 위기", note:"모리아 광산을 지나며 원정대가 간달프를 잃는 큰 위기를 겪음.", important:true },
  { year:"제3시대", title:"원정대의 분열", note:"원정대가 나뉘어 각자의 여정을 이어감.", important:true, locId:"putangirua" },
  { year:"제3시대", title:"에도라스와 로한", note:"로한이 전쟁에 휘말리며 세계관이 확장됨.", important:false, locId:"mountsunday" },
  { year:"제3시대", title:"골룸의 안내", note:"프로도와 샘이 골룸의 안내로 모르도르에 다가감.", important:true, locId:"tongariro" },
  { year:"제3시대", title:"펠렌노르 평원 전투", note:"곤도르를 지키기 위한 대규모 전투가 벌어짐.", important:true, locId:"twizel" },
  { year:"제3시대", title:"운명의 산", note:"절대반지의 운명을 건 마지막 선택이 운명의 산에서 벌어짐.", important:true, locId:"ngauruhoe" }
];

const MONEYHEIST_TIMELINE = [
  { year:"S1", title:"조폐국 진입", note:"교수가 설계한 계획에 따라 도시 이름의 팀원들이 조폐국에 진입함.", important:true, locId:"csicmadrid" },
  { year:"S1", title:"인질극과 협상", note:"인질극과 경찰과의 협상이 팽팽하게 이어짐.", important:false },
  { year:"S1~2", title:"내부 갈등 속 인쇄", note:"내부 갈등 속에서도 팀은 지폐를 인쇄하며 시간을 벌어감.", important:true },
  { year:"S2", title:"라켈의 합류", note:"라켈이 경찰에서 팀의 일원으로 넘어오는 결정적 전환이 벌어짐.", important:true, locId:"torrelodones" },
  { year:"S3", title:"팀의 재결집", note:"작전 후 뿔뿔이 흩어졌던 팀이 다시 모임.", important:false, locId:"sanfrutos" },
  { year:"S3~4", title:"중앙은행 작전 개시", note:"팔레르모의 지휘 아래 새로운 목표, 스페인 중앙은행 작전이 시작됨.", important:true, locId:"nuevosministerios" },
  { year:"S4~5", title:"금 용해 작전", note:"금 용해와 운반을 둘러싼 압박 속에서 여론전이 격화됨.", important:false },
  { year:"S5", title:"최후의 결전", note:"중앙은행 작전이 최종적으로 마무리되는 시리즈의 결말.", important:true, locId:"granvia" }
];

const ONEPIECE_TIMELINE = [
  { year:"1", title:"루피의 출항", note:"고무고무 열매를 먹은 루피가 샹크스와의 약속을 가슴에 품고 항해를 시작함.", important:true },
  { year:"2", title:"로그타운 도착", note:"해적왕이 처형된 로그타운을 거쳐 그랜드라인으로 진입함.", important:true, locId:"loguetownset" },
  { year:"3", title:"바라티에에서 상디 합류", note:"바다 위 레스토랑 바라티에에서 요리사 상디가 합류함.", important:true, locId:"baratieset" },
  { year:"4", title:"드럼 아일랜드에서 쵸파 합류", note:"눈 덮인 드럼 아일랜드에서 순록 의사 쵸파가 합류함.", important:true, locId:"drumislandset" },
  { year:"5", title:"고잉 메리호와의 항해", note:"첫 배 고잉 메리호를 타고 여러 섬의 사연과 갈등에 휘말림.", important:false, locId:"goingmerryset" },
  { year:"6", title:"에이스와 정상전쟁", note:"에이스와 흰수염 해적단을 둘러싼 정상전쟁이 벌어짐.", important:true },
  { year:"7", title:"검은수염의 부상", note:"검은수염 등 새로운 세력과의 대립 구도가 본격화됨.", important:false },
  { year:"현재", title:"해적왕을 향해", note:"루피가 원피스를 찾아 해적왕이 되기 위한 항해는 지금도 계속됨.", important:true, locId:"kumamotostatues" }
];

// 직지: 아모르 마네트 — 현재/조선 세종대/15세기 유럽을 오가는 사건 타임라인
const JIKJI_TIMELINE = [
  { year:"현재", title:"전형우 교수의 의문사", note:"고려대 라틴어 교수 전형우가 세상을 떠나며 사건이 시작됨.", important:true, locId:"koreauniv" },
  { year:"현재", title:"김기연, 취재를 시작하다", note:"사회부 기자 김기연이 전형우의 죽음을 취재하며 그가 남긴 단서를 쫓기 시작함.", important:true, locId:"koreauniv" },
  { year:"1377", title:"흥덕사, 직지를 간행하다", note:"청주 흥덕사에서 백운 스님의 제자들이 금속활자로 직지심체요절을 간행함 — 구텐베르크보다 78년 앞선 세계 최초 금속활자본.", important:true, locId:"heungdeoksaji" },
  { year:"현재", title:"청주에서 김정진을 만나다", note:"김기연이 흥덕사지와 청주고인쇄박물관을 찾아 직지 연구자 김정진에게서 직지의 실체를 듣게 됨.", important:true, locId:"cheongjumuseum" },
  { year:"1434~1444", title:"구텐베르크, 스트라스부르에서 실험하다", note:"구텐베르크가 스트라스부르에 머물며 금속활자 인쇄 실험을 비밀리에 진행함.", important:false, locId:"strasbourg" },
  { year:"1452~1455", title:"구텐베르크, 마인츠에서 42행 성서를 완성하다", note:"고향 마인츠로 돌아온 구텐베르크가 42행 성서를 완성함 — 직지보다 78년 늦은 금속활자본.", important:true, locId:"gutenbergmuseum" },
  { year:"현재", title:"파리로 향하다", note:"김기연이 직지 실물이 소장된 프랑스국립도서관으로 향하며 유럽 추적이 본격화됨.", important:true, locId:"bnfrichelieu" },
  { year:"1952", title:"직지, 프랑스로 넘어가다", note:"소장자 앙리 베베르의 유언에 따라 직지 하권이 프랑스국립도서관에 기증됨(실제 역사적 사실).", important:false, locId:"bnfrichelieu" },
  { year:"1972", title:"박병선, 직지를 알아보다", note:"사서로 근무하던 박병선 박사가 직지의 정체를 밝혀내기 시작함(실제 역사적 사실).", important:true, locId:"bnfrichelieu" },
  { year:"현재", title:"아비뇽에서 얽히는 단서", note:"은수(카레나)의 유럽 서사가 아비뇽 교황청을 배경으로 사건과 얽혀듦.", important:false, locId:"avignon" },
  { year:"현재", title:"피셔 교수를 통해 구텐베르크 쪽 단서를 얻다", note:"스트라스부르와 마인츠를 잇는 구텐베르크 연구자 피셔 교수를 통해 새로운 단서가 드러남.", important:false, locId:"strasbourg" },
  { year:"현재", title:"바티칸 편지의 비밀", note:"펨블턴을 통해 바티칸의 오래된 편지를 둘러싼 비밀이 드러나기 시작함(소설적 상상).", important:true, locId:"vaticanlibrary" },
  { year:"현재", title:"진실의 매듭이 풀리다", note:"직지와 구텐베르크, 바티칸 편지를 잇는 사건의 전모가 밝혀짐 — 결말은 작품에서 직접 확인.", important:true }
];

// 더 글로리 연대기 — 극중 학교폭력이 벌어지는 구체적 장소는 특정하지 않는다(피해자 존중 원칙).
const GLORY_TIMELINE = [
  { year:"학창시절", title:"극심한 학교폭력", note:"문동은, 박연진 일당에게 극심한 학교폭력을 당하지만 학교와 가족 어디에서도 보호받지 못함.", important:true },
  { year:"학창시절", title:"학교를 떠나 계획을 세우다", note:"동은, 오랜 시간 준비해 연진의 딸이 다니는 학교의 교사가 되기로 결심함.", important:true },
  { year:"현재", title:"청주 중앙공원에서 바둑을 배우다", note:"노인들 틈에 섞여 바둑을 배우는 동은 — 실제로 청주 중앙공원에서 촬영된 장면.", important:true, locId:"cheongjujungangpark" },
  { year:"현재", title:"주여정과의 만남", note:"바둑을 매개로 동은과 여정의 관계가 시작됨.", important:false, locId:"cheongnabadukpark" },
  { year:"현재", title:"용화사, 종교와 위선", note:"가해 집단의 종교·가족 관련 장면이 실제로 용화사에서 촬영됨.", important:false, locId:"yonghwasa" },
  { year:"현재", title:"하도영과의 접점", note:"종로3가 기원에서 동은이 연진의 남편 도영을 처음 만남.", important:false, locId:"jongno_pagoda" },
  { year:"현재", title:"가해 집단의 균열", note:"연진·재준·사라·혜정·명오 사이의 공모 관계가 계급·욕망·비밀 때문에 흔들리기 시작함.", important:true },
  { year:"현재", title:"복수의 완성을 향해", note:"동은의 복수가 어떤 결말을 맞는지는 작품에서 직접 확인.", important:true }
];

// 이상한 변호사 우영우 연대기 — 충북도청·도의회는 8회 관련 장면의 촬영지로만 표기(작품 전체 배경 아님).
const WOO_TIMELINE = [
  { year:"1~2회", title:"한바다 입사", note:"자폐 스펙트럼을 지닌 천재 신입 변호사 우영우, 서울 대형 법무법인 한바다에 입사함.", important:true, locId:"hanbadabuilding" },
  { year:"1~2회", title:"회전문을 통과하다", note:"회전문을 무서워하는 영우가 이준호의 도움으로 왈츠를 추듯 통과함 — 강남 센터필드에서 실제 촬영.", important:false, locId:"hanbadabuilding" },
  { year:"1~2회", title:"김밥집, 아버지와의 일상", note:"아버지 우광호가 운영하는 김밥집에서의 일상 — 수원 행궁동에서 실제 촬영.", important:false, locId:"gimbapplace" },
  { year:"3~5회", title:"정명석 아래에서 성장하다", note:"여러 사건을 맡으며 전문직 동료로 인정받기 시작함.", important:true },
  { year:"3~5회", title:"권민우의 공정성 문제 제기", note:"특혜 논쟁 속에서 한바다 내부의 경쟁 구도가 드러남.", important:false },
  { year:"6~8회", title:"8회, 소덕동 사건", note:"소덕동 관련 장면이 충북도청·도의회에서 실제로 촬영됨 — 청주는 8회 촬영지일 뿐, 작품 전체의 배경은 아님.", important:true, locId:"chungbukprovoffice" },
  { year:"13~15회", title:"가족의 비밀이 드러나다", note:"아버지 우광호와 태수미를 둘러싼 가족의 비밀이 서서히 밝혀짐.", important:true },
  { year:"16회", title:"영우의 선택", note:"영우의 직업·사랑·자립을 둘러싼 결론은 작품에서 직접 확인.", important:true }
];

// 태백산맥 연대기 — 확인된 역사(여수·순천 10·19사건, 한국전쟁)와 소설적 사건을 함께 배치하되,
// 민간인 희생·고문 등 민감한 장면은 구체적으로 재현하지 않고 맥락만 절제해서 서술한다.
const TAEBAEK_TIMELINE = [
  { year:"1945-08", title:"해방", note:"식민지 권력은 무너졌지만 토지·친일잔재·국가체제 문제는 해결되지 않은 채 남음(확인된 역사).", important:false },
  { year:"1946", title:"미군정기 토지개혁 논쟁 격화", note:"소작제 개혁을 요구하는 목소리가 커졌지만 실질적 개혁은 지연됨 — 소설이 그리는 소작농들의 좌익 동조 배경이 된 실제 사회 갈등(확인된 역사).", important:false },
  { year:"1948-08-15", title:"대한민국 정부 수립", note:"남한 단독정부가 수립되며 분단이 사실상 고착됨(확인된 역사).", important:false },
  { year:"1948-10-19", title:"여수·순천 10·19사건 발생", note:"여수 주둔 14연대 일부 군인이 제주 4·3사건 진압 명령을 거부하며 봉기, 여수·순천 일대로 확산됨(확인된 역사).", important:true, locId:"yeosu" },
  { year:"1948-10-20", title:"순천 점령", note:"봉기군이 순천을 장악하며 순천역·시가지 일대가 큰 혼란에 휩싸임(확인된 역사).", important:true, locId:"suncheon_station" },
  { year:"1948-10-22", title:"여수 재진압과 계엄령 선포", note:"진압군이 여수를 재탈환하고 전남 동부 일대에 계엄령이 선포됨(확인된 역사).", important:true, locId:"yeosu_port" },
  { year:"1948년 말", title:"진압 직후의 벌교", note:"사건 진압 직후 벌교에서 좌익 세력이 물러나고 경찰·우익 청년단이 돌아오며 소설이 시작됨.", important:true, locId:"beolgyoeup" },
  { year:"1948년 말", title:"부용산 자락의 슬픔", note:"토벌과 학살로 가족을 잃은 이들의 슬픔이 벌교 인근 부용산 자락 노래(부용산)에 스며듦 — 실제로 이 시기 전후 널리 불린 곡의 정서적 배경(확인된 역사+지역 구전).", important:false, locId:"buyongsan_park" },
  { year:"1949", title:"자애병원과 전명환 원장", note:"의사 전명환이 벌교의 작은 병원에서 가난한 이와 부유한 이를 가리지 않고 진료하며 마을의 신뢰를 얻음(소설 사건).", important:false, locId:"jaeae_hospital" },
  { year:"1부", title:"염상진, 율어를 장악하다", note:"염상진을 중심으로 한 좌익 세력이 일시적으로 율어 일대를 해방구로 장악함(소설 사건).", important:true, locId:"yureo" },
  { year:"1부", title:"조성면·겸백면으로 번지는 유격전", note:"율어를 넘어 인근 조성면·겸백면 일대까지 좌익 세력의 활동 반경이 넓어짐(소설 사건).", important:false, locId:"joseongmyeon" },
  { year:"1부", title:"철다리의 결투", note:"염상구가 벌교의 주먹세계를 장악하기 위해 철다리에서 결투를 벌임 — 형제가 반대편 권력에 서게 되는 상징적 장면(소설 사건).", important:false, locId:"cheoldari" },
  { year:"1부", title:"소화의 집에 숨은 정하섭", note:"정하섭이 무당 소화의 집에 몸을 숨기며 이념·신분·신앙·생존이 겹친 개인 서사가 시작됨(소설 사건).", important:true, locId:"sohwa_house" },
  { year:"1부", title:"구금융조합 습격", note:"좌익 세력이 지역 금융기관인 구금융조합을 습격하며 벌교 읍내의 긴장이 최고조에 이름(소설 사건).", important:false, locId:"gugeumyungjohap" },
  { year:"1949", title:"화엄사 인근으로 이어지는 은신처", note:"토벌을 피한 이들이 지리산 자락 화엄사 인근까지 몸을 숨기며 활동 반경이 넓어짐(소설 사건).", important:false, locId:"hwaeomsa" },
  { year:"1949", title:"심재모, 계엄군 사령관으로 부임하다", note:"심재모가 계엄군 사령관으로 부임해 강경 진압과 온건한 민생 사이에서 고뇌하는 인물로 그려짐(소설 사건).", important:true, locId:"boseong_gunchung" },
  { year:"2부", title:"보복과 토벌, 심화되는 유격전", note:"보복과 토벌이 반복되며 지역 공동체의 분열이 깊어짐(소설 사건).", important:false, locId:"jogyesan" },
  { year:"2부", title:"토지 문제와 하대치의 선택", note:"가난한 농민 하대치 등이 중도방죽 간척지의 지켜지지 않은 약속 등 토지 문제 때문에 좌익운동에 참여함(소설 사건).", important:false, locId:"jungdo_embankment" },
  { year:"2부", title:"서민영의 야학, 배움의 공간을 열다", note:"서민영이 정규 교육에서 소외된 이들을 위한 야학을 열어 이지숙·이근술 등과 함께 가르침을 나눔(소설 사건).", important:false, locId:"beolgyoeup" },
  { year:"1949~1950", title:"국민보도연맹 결성과 예비검속의 그림자", note:"좌익 전향자 관리를 명목으로 결성된 보도연맹이, 실제로는 이념과 무관한 이들까지 대거 포함하며 훗날 비극의 씨앗이 됨(확인된 역사).", important:false, locId:"jaeae_hospital" },
  { year:"1949~1950", title:"지리산 피아골, 유격대의 근거지가 되다", note:"피아골 일대가 좌익 유격대의 주요 근거지 중 하나로 자리잡음(소설+역사적 배경).", important:false, locId:"piagol" },
  { year:"1949~1950", title:"반야봉·노고단 토벌작전", note:"토벌군이 반야봉·노고단 일대를 수색하며 유격대와의 산악 대치가 이어짐(소설 사건).", important:false, locId:"nogodan" },
  { year:"3부", title:"전쟁 전야, 커지는 갈등", note:"한국전쟁 발발 전 정치·사회 갈등이 더욱 커짐(소설 구성).", important:false },
  { year:"1950-06-25", title:"한국전쟁 발발", note:"전쟁 발발과 점령·수복의 반복이 민간인과 인물 관계를 재편함(확인된 역사).", important:true, locId:"beolgyoeup" },
  { year:"1950-09-15", title:"인천상륙작전", note:"국군·유엔군의 인천상륙작전 성공으로 전세가 급격히 역전되며, 남도 지역의 정세에도 곧바로 파급됨(확인된 역사).", important:true, locId:"incheon_landing_memorial" },
  { year:"1950", title:"전세 역전, 밀려나는 인민군", note:"인천상륙작전 이후 인민군이 급속히 후퇴하며 벌교·순천 일대의 권력이 다시 뒤바뀜(확인된 역사+소설 사건).", important:false, locId:"suncheon_station" },
  { year:"전쟁 중", title:"다시 뒤바뀌는 신분", note:"통치권력이 바뀔 때마다 같은 주민이 협력자·반역자·피해자로 다시 분류됨(역사+소설).", important:false, locId:"beolgyoeup" },
  { year:"1950~1951", title:"거창사건", note:"국군이 경남 거창 일대에서 다수의 민간인을 희생시킨 사건 — 이 사이트는 실제 국가폭력 희생 사건을 자극적으로 다루지 않으며, 유족과 희생자를 존중하는 태도로 조심스럽게 소개한다(확인된 역사).", important:true, locId:"geochang_massacre" },
  { year:"1951", title:"여수 만성리의 비극", note:"여순사건 진압 과정에서 여수 만성리 일대의 민간인 희생이 있었던 것으로 전해짐 — 이 사이트는 이를 존중하는 태도로, 자극적 묘사 없이 소개한다(확인된 역사).", important:false, locId:"yeosu_manseongri" },
  { year:"1951", title:"순천 매산등, 추모의 자리가 되다", note:"순천 매산등 일대의 희생을 기리는 추모 공간이 후대에 조성됨(확인된 역사+지역 기억).", important:false, locId:"suncheon_maesandeung" },
  { year:"4부", title:"산으로 들어간 사람들", note:"산악 유격전과 토벌이 이어지며 추위·굶주림·부상을 견디는 사람들과, 감시·징집 속에 남겨진 가족의 이야기가 함께 그려짐(소설 사건). 민감한 장면은 이 사이트에서 구체적으로 재현하지 않는다.", important:true, locId:"jirisan" },
  { year:"4부", title:"백아산 자락의 토벌", note:"백아산 일대까지 토벌 작전이 확대되며 유격대의 활동 반경이 점점 좁아짐(소설 사건).", important:false, locId:"baegasan" },
  { year:"4부", title:"뱀사골의 마지막 은신처", note:"궁지에 몰린 유격대 잔여 세력이 뱀사골 깊은 곳까지 몸을 숨기며 버팀(소설 사건).", important:false, locId:"baemsagol_shelter" },
  { year:"4부", title:"조직의 쇠퇴, 커지는 민간인의 희생", note:"전선과 후방의 경계가 흐려지며 여성·노인·아이를 포함한 민간인의 희생과 침묵이 커짐(소설 사건).", important:false },
  { year:"1951~1953", title:"거제도 포로수용소의 갈등", note:"반공포로와 좌익포로가 뒤섞인 거제도 포로수용소에서 이념 갈등이 수용소 내부까지 이어짐(확인된 역사+소설 사건).", important:false, locId:"geoje_pow_camp" },
  { year:"회상", title:"김범우, 버마 전선의 기억", note:"김범우가 학병으로 끌려가 버마 전선에서 겪은 일과 탈출, OSS 훈련의 기억이 그의 이후 선택에 그림자를 드리움(소설 사건, 회상 구성).", important:false, locId:"burma_front" },
  { year:"1951~1953", title:"판문점 정전협상", note:"휴전을 위한 협상이 판문점에서 지루하게 이어지며, 전선의 군인과 후방의 민간인 모두 지친 기다림을 견딤(확인된 역사).", important:false, locId:"panmunjeom" },
  { year:"1953-07", title:"휴전협정", note:"전쟁은 멈추지만 소설이 제시한 토지·민족·분단의 모순은 해결되지 않은 채 남음(확인된 역사+소설 결말).", important:true },
  { year:"1953", title:"유엔기념공원에 잠든 이들", note:"한국전쟁에 참전했다가 전사한 외국군 병사들이 부산 유엔기념공원에 안장되며, 이 전쟁이 세계사적 국제전이었음을 새삼 보여줌(확인된 역사).", important:false, locId:"un_memorial_busan" },
  { year:"결말", title:"염상진과 염상구, 형제의 마지막", note:"적대적 이념을 넘어 남는 혈연과 인간성의 복잡한 감정이 응축되는 장면 — 구체적 결말은 작품에서 직접 확인.", important:true },
  { year:"결말", title:"무당 소화와 정하섭의 마지막 선택", note:"이념과 신분, 사랑 사이에서 두 사람이 내리는 결말은 작품에서 직접 확인할 수 있다(소설 결말부).", important:false, locId:"sohwa_bridge" },
  { year:"결말 이후", title:"벌교 홍교를 다시 건너는 사람들", note:"전쟁이 남긴 상처를 안은 채, 살아남은 이들이 다시 벌교 홍교를 건너 일상으로 돌아가려 애씀(소설 결말부 정서).", important:false, locId:"beolgyo_hongyo" },
  { year:"1955-04-01", title:"지리산 입산금지 해제", note:"여수·순천 10·19사건 진상규명위원회의 공식 정의상, 사건 관련 기간은 이날까지로 본다 — 소설의 서사 범위 밖의 후속 역사(확인된 역사).", important:false, locId:"jirisan" },
  { year:"1957년경", title:"흩어진 가족들의 재회와 생존", note:"전쟁으로 흩어진 가족들이 각자의 방식으로 살아남아 다시 만나거나, 끝내 만나지 못한 채 벌교 곳곳에서 삶을 이어감(소설 결말부 이후 정서).", important:false, locId:"beolgyoeup" },
  { year:"1970~80년대", title:"조정래, 취재와 집필을 준비하다", note:"작가 조정래가 여수·순천, 보성 벌교, 지리산 일대를 오가며 생존자와 지역민들을 취재해 소설의 토대를 마련함(확인된 역사).", important:false },
  { year:"1983~1989", title:"『태백산맥』 연재·완간", note:"월간지 연재로 시작해 전 10권으로 완간되며, 여순사건과 한국전쟁을 정면으로 다룬 대하소설로 큰 반향을 일으킴(확인된 역사).", important:true },
  { year:"1994", title:"국가보안법 고발 논란", note:"소설의 이념적 서술을 문제 삼아 저자가 국가보안법 위반 혐의로 고발되며 오랜 법적 논쟁이 시작됨(확인된 역사).", important:false },
  { year:"2003-03", title:"대법원 무혐의 확정", note:"오랜 법적 다툼 끝에 대법원이 저자에게 무혐의 판결을 내리며 논란이 마무리됨(확인된 역사).", important:false },
  { year:"2008-11", title:"태백산맥문학관 개관", note:"소설의 무대였던 벌교에 문학관이 세워지며, 지금도 이어지는 문학기행의 거점이 됨(확인된 역사).", important:false, locId:"taebaeksanmaek_museum" },
  { year:"현재", title:"문학기행의 성지가 된 벌교", note:"지금도 많은 독자와 여행자들이 소설 속 무대를 따라 벌교·보성·순천·여수·지리산 일대를 걷는 문학기행을 이어가고 있다(현재까지 이어지는 흐름).", important:false, locId:"beolgyoeup" }
];

// 미스터 션샤인 연대기 — 확인된 역사(신미양요, 강화도조약, 대한제국 선포, 을사늑약, 고종 강제 퇴위,
// 군대 해산, 남대문 전투, 정미의병)와 극중 설정을 함께 배치하되 각 항목에 명시해 구분한다.
const SUNSHINE_TIMELINE = [
  { year:"1871-04", title:"신미양요 발발 — 강화 초지진 전투", note:"미국 아시아함대가 강화해협을 공격하며 실제로 벌어진 무력 충돌(확인된 역사). 극이 다루는 반외세 정서의 뿌리 중 하나.", important:true, locId:"ganghwa_chojijin" },
  { year:"1871-04", title:"광성보 혈전", note:"어재연 장군을 비롯한 조선 수비군이 전멸에 가까운 희생을 치르며 항전함(확인된 역사). 극 중 유진 초이의 부모 세대가 겪었을 법한 트라우마의 실제 배경.", important:true, locId:"ganghwa_gwangseongbo" },
  { year:"1871년경", title:"유진 초이, 노비의 아들로 태어나다", note:"신미양요 직후의 혼란 속에서 태어나 어린 시절 부모를 잃는다(극중 설정).", important:true },
  { year:"1871~1875년경", title:"유진, 제물포를 떠나 미국으로", note:"어린 유진이 조선을 떠나 미국행 배에 오른다 — 실제 개항장 인천의 관문을 통해서였을 것으로 그려진다(극중 설정).", important:true, locId:"incheon_customs_pier" },
  { year:"1876-02", title:"강화도조약 체결", note:"조선이 근대적 국제조약 체제에 처음 편입된 역사적 사건(확인된 역사). 개항과 근대화의 실질적 출발점.", important:true, locId:"ganghwa_yeonmudang" },
  { year:"1883", title:"제물포(인천) 개항", note:"외국 상선과 문물이 드나드는 관문이 열림(확인된 역사). 극이 그리는 근대 한성의 물리적 관문.", important:false, locId:"incheon_gaehanggi" },
  { year:"1885", title:"배재학당 설립", note:"한국 최초의 서양식 근대 학교가 세워짐(확인된 역사). 신식 교육이 조선 청년들에게 열리기 시작한 시점.", important:false, locId:"baejaehakdang" },
  { year:"1886", title:"이화학당 설립", note:"한국 최초의 여성 근대 교육기관이 세워짐(확인된 역사).", important:false, locId:"ewhahakdang" },
  { year:"1890년대", title:"애신, 명문가 규수로 성장하다", note:"조부 고사홍 슬하에서 자라며, 신분의 굴레와 자신만의 신념 사이에서 흔들리기 시작한다(극중 설정).", important:false, locId:"gosahong_house_set" },
  { year:"1897-10", title:"대한제국 선포", note:"고종이 환구단에서 황제 즉위식을 올리고 대한제국을 선포함(확인된 역사). 극이 다루는 국가 자체의 상징적 출발점.", important:true, locId:"hwangudan" },
  { year:"1899", title:"한성전기회사 전차 개통", note:"한성 최초의 전차 노선이 열리며 도시 풍경이 근본적으로 바뀜(확인된 역사). 극 중 재현된 종탑 건물·전차 선로의 실제 원형.", important:false, locId:"hansungjeongi" },
  { year:"1900년대 초", title:"유진, 미 해병대 장교로 조선에 부임하다", note:"성인이 된 유진이 미 해병대 소속으로 조선 땅을 다시 밟는다(극중 설정). 어린 시절 떠났던 제물포로 돌아오는 상징적 순간.", important:true, locId:"jemulpo_road" },
  { year:"1900년대 초", title:"유진과 애신, 처음 마주치다", note:"신분도 이름도 모른 채 스쳐 지나간 첫 만남 — 이후 두 사람의 관계를 관통하는 상징적 장면이 된다(극중 설정).", important:true, locId:"gyeongungung_deoksugung" },
  { year:"1900년대 초", title:"구동매, 무신회를 벗어나 한성에 자리잡다", note:"친일 무력 조직 무신회 출신인 구동매가 한성에서 독자적인 세력을 구축하기 시작한다(극중 설정).", important:false, locId:"japanesehouse_zone" },
  { year:"1900년대 초", title:"글로리호텔, 한성 사교의 중심이 되다", note:"손탁호텔을 모티브로 한 극중 공간 글로리호텔이 문을 열며, 다섯 주인공이 얽히는 실질적 무대가 마련된다(극중 설정).", important:true, locId:"gloryhotel_set" },
  { year:"1900년대 초", title:"쿠도 히나, 정보를 거래하다", note:"일본 정보요원 히나가 글로리호텔을 거점으로 여러 세력 사이를 오가며 정보를 사고판다(극중 설정).", important:false },
  { year:"1900년대 초", title:"김희성과 애신의 정혼", note:"명문가 자제 김희성이 애신과 정혼하지만, 두 사람의 관계는 사랑보다 우정에 가깝게 그려진다(극중 설정).", important:false, locId:"unhyeongung" },
  { year:"1900년대 초", title:"애신, 의병의 길에 들어서다", note:"신분을 감춘 채 저잣거리를 오가며 의병 활동을 시작한다(극중 설정).", important:true, locId:"jeojatgeori_set" },
  { year:"1904~1905", title:"러일전쟁", note:"한반도를 둘러싼 열강의 대립이 전쟁으로 폭발함(확인된 역사). 대한제국의 운명을 결정짓는 국제 정세의 전환점.", important:true },
  { year:"1905-11", title:"을사늑약 체결", note:"중명전에서 대한제국의 외교권이 강제로 박탈됨(확인된 역사). 극 중 인물들의 선택이 되돌릴 수 없어지는 결정적 사건.", important:true, locId:"jungmyeongjeon" },
  { year:"1905~1907", title:"각자의 방식으로 시대에 반응하다", note:"유진·애신·동매·희성·히나 다섯 사람 모두 을사늑약 이후의 격변 속에서 서로 다른 선택을 하기 시작한다(극중 설정).", important:false },
  { year:"1907-07", title:"고종 강제 퇴위", note:"헤이그 특사 파견을 빌미로 고종이 강제로 퇴위당함(확인된 역사). 대한제국 황실 권위가 결정적으로 흔들리는 순간.", important:true, locId:"hamnyeongjeon" },
  { year:"1907-08", title:"대한제국 군대 해산", note:"일본의 명령으로 군대가 강제 해산됨(확인된 역사). 해산에 반발한 군인들이 무력 항쟁에 나서는 계기.", important:true },
  { year:"1907-08", title:"남대문 전투", note:"군대 해산에 반발한 조선 군인들이 일본군과 실제로 교전함(확인된 역사). 극이 그리는 무력 저항의 실제 역사적 근거.", important:true, locId:"namdaemun" },
  { year:"1907~1908", title:"정미의병, 전국적으로 봉기하다", note:"군대 해산 이후 전국 각지에서 의병이 봉기함(확인된 역사). 애신을 비롯한 이름 없는 이들이 본격적으로 무력 항쟁에 뛰어드는 배경.", important:true },
  { year:"1907~1908", title:"애신, 이름 없는 의병으로 싸우다", note:"신분을 감춘 채 의병 활동을 이어가던 애신이, 정미의병의 흐름 속에서 본격적인 무력 항쟁에 나선다(극중 설정).", important:true, locId:"sunshinestudio_main" },
  { year:"1907~1908", title:"유진, 소속과 신념 사이에서 선택하다", note:"미 해병대 장교라는 신분과 조선인으로서의 뿌리 사이에서 유진이 자신만의 선택을 내린다(극중 설정).", important:true },
  { year:"1908", title:"서대문형무소 설립", note:"항일 독립운동가들이 실제로 수감되기 시작한 감옥이 세워짐(확인된 역사). 의병들이 감당해야 했던 위험의 실제 무게를 보여주는 장소.", important:false, locId:"seodaemunprison" },
  { year:"결말부", title:"다섯 사람의 마지막 선택", note:"유진과 애신을 비롯한 다섯 사람이 각자 어떤 결말을 맞는지는 작품에서 직접 확인.", important:true, locId:"sanfrancisco_port" },
  { year:"에필로그", title:"이름 없이 스러진 이들을 기억하며", note:"정미의병을 비롯해 이름이 알려지지 않은 채 스러져간 이들을 기억하려는 정서가 극 전체를 관통한다(극중 정서+역사적 사실). 지금도 논산 촬영 세트와 서울 정동 일대가 이 시대를 기억하는 방식으로 남아 있다.", important:false, locId:"sunshinestudio_visitorcenter" }
];

/* ============================================================
   파친코 시간대·회차 연표 (13개) — 기획안(Apple_TV_파친코_신규_콘텐츠_기획안_V1) 6절의
   시간대·회차 연표 설계 표를 그대로 반영. 정확한 날짜가 없는 사건은 연도·계절·회차 범위를
   그대로 쓰고 임의 날짜를 만들지 않는다(6절 원칙). '전체 스포일러' 항목은 구체적 결말을
   서술하지 않고 안내만 한다.
   ============================================================ */
const PACHINKO_TIMELINE = [
  { year:"1910년대", title:"영도, 훈이·양진의 가정과 선자의 출생", note:"하숙집을 꾸리는 훈이와 양진 부부 사이에서 선자가 태어나 유년기를 보낸다.", important:true, locId:"yeongdo_boardinghouse" },
  { year:"1920년대", title:"부산 영도, 시장 노동과 한수와의 만남", note:"선자가 시장 노동을 도우며 자라던 중 생선 중개상 한수를 만난다.", important:true, locId:"busan_fishmarket" },
  { year:"1930년대 초", title:"부산→오사카, 임신·결혼·이주", note:"선자가 임신한 사실을 알게 된 뒤 이삭과 결혼하고 함께 일본으로 이주한다.", important:true, locId:"ferry_korea_japan" },
  { year:"1930년대", title:"오사카 이카이노, 노아·모자수 출생과 생활", note:"이카이노(현 이쿠노) 조선인 거주지에서 노아와 모자수가 태어나고, 교회·공장·시장을 중심으로 생활이 이어진다.", important:true, locId:"ikaino" },
  { year:"1930년대 후반", title:"오사카, 이삭 체포와 여성들의 장사", note:"이삭이 체포된 뒤 선자와 경희가 김치 장사를 시작하며 가족의 생계를 책임진다.", important:true, locId:"osaka_jail" },
  { year:"1923년(회상)", title:"간토, 관동대지진과 조선인 대상 폭력", note:"관동대지진 당시 조선인을 향한 유언비어와 집단폭력 속에서 한수가 살아남는 과정이 회상으로 그려진다. 이 사이트는 이 사건을 자극적으로 다루지 않는다(기획안 8.1절 원칙).", important:true, locId:"kanto_massacre_memorial" },
  { year:"1945년 전후", title:"오사카, 공습·배급과 전쟁 말기 생존", note:"공습과 식량 배급 속에서 가족이 전쟁 말기의 생존을 이어간다.", important:false, locId:"osaka_bomb_shelter" },
  { year:"1945년 전후", title:"일본 농촌, 피난과 생활 공동체", note:"가족이 도시를 떠나 농촌으로 피난하며 김창호와 함께 생활 공동체를 이룬다.", important:false, locId:"evac_farmhouse" },
  { year:"1950년 전후", title:"전후 재편, 노아의 학업과 가족 비밀", note:"전후 사회가 재편되는 가운데 노아가 학업에 매진하지만, 가족의 비밀이 서서히 그의 삶에 그림자를 드리운다.", important:true, locId:"waseda_univ_story" },
  { year:"1950~70년대", title:"오사카·요코하마, 성인기와 파친코 산업", note:"노아와 모자수가 각자의 방식으로 성인기를 통과하며, 모자수는 파친코 산업 안에서 생존의 발판을 마련한다.", important:false, locId:"pachinko_parlor" },
  { year:"1970~80년대", title:"일본·미국, 솔로몬의 성장과 해외교육", note:"솔로몬이 해외 교육을 받으며 성장하고, 하나·에츠코 가족과의 관계가 함께 그려진다.", important:false, locId:"newyork" },
  { year:"1989", title:"도쿄, 솔로몬의 부동산 거래와 선자의 귀향", note:"솔로몬이 한금자의 토지를 둘러싼 대형 거래를 맡는 동안, 선자는 오랜만에 고향과 가족의 기억을 되짚는다.", important:true, locId:"tokyo_finance_company" },
  { year:"현재 공개 결말", title:"노아의 진실과 솔로몬의 선택", note:"노아를 둘러싼 진실과 솔로몬의 선택, 그리고 선자의 과거와 미래가 어떻게 마무리되는지는 작품에서 직접 확인하세요(시즌 2 기준 전체 스포일러).", important:true }
];

/* ============================================================
   히가시노 게이고 추모 특집 연표 — 작가의 실제 생애와 『나미야 잡화점의 기적』 작중·영화화 사건을
   함께 배치한다. 소설 속 사건은 정확한 연도가 나온 것만 표기하고 임의로 만들지 않는다.
   ============================================================ */
const NAMIYA_TIMELINE = [
  { year:"1958-02-04", title:"히가시노 게이고, 오사카에서 태어나다", note:"오사카시 이쿠노구에서 3남매 중 막내로 태어남(확인된 사실).", important:true, locId:"higashino_hometown_ikuno" },
  { year:"1980년대 초", title:"오사카부립대학 졸업, 엔지니어로 입사", note:"전기공학을 전공하고 졸업 후 자동차 부품업체 덴소에 엔지니어로 입사함(확인된 사실).", important:false, locId:"osaka_metropolitan_univ_nakamozu" },
  { year:"1985-09", title:"『방과 후』로 에도가와 란포상 수상, 작가로 전업", note:"제31회 에도가와 란포상을 수상하며 엔지니어에서 전업 작가로 전향함(확인된 사실).", important:true, locId:"edogawa_rampo_award_note" },
  { year:"2006", title:"『용의자 X의 헌신』으로 나오키상 수상", note:"다섯 차례 후보에 오른 끝에 제134회 나오키상을 수상함(확인된 사실).", important:true, locId:"naoki_prize_tsukiji_shinkiraku" },
  { year:"2012", title:"『나미야 잡화점의 기적』 발표", note:"장편소설로 발표되어 이듬해 서점대상 2위에 오르며 대표작 반열에 오름(확인된 사실).", important:true, locId:"namiya_store" },
  { year:"작중(현대)", title:"좀도둑 3인방, 폐가에 숨어들다", note:"쇼타·아쓰야·고헤이가 훔친 차 고장으로 30년 넘게 문 닫은 나미야 잡화점에 숨어들며 이야기가 시작됨(작품 설정).", important:true, locId:"namiya_store" },
  { year:"작중(32년 전)", title:"시간을 넘어 이어지는 편지", note:"장난삼아 쓴 답장이 32년 전 발신인에게 전달된다는 사실을 깨달으며, 서로 다른 시대의 사람들이 편지로 이어짐(작품 설정).", important:true },
  { year:"2017", title:"일본 실사 영화 개봉", note:"야마다 료스케·니시지마 히데토시 주연으로 영화화되어 오이타현 분고타카다시 쇼와노마치에서 촬영됨(확인된 사실).", important:true, locId:"bungotakada_showamachi" },
  { year:"2027(예정)", title:"디즈니+ 한국 드라마판 공개 예정", note:"한국 제작진에 의한 드라마 버전이 디즈니+를 통해 공개될 예정이라는 소식이 전해짐(2026-08 기준 보도).", important:false },
  { year:"2026-07-23", title:"히가시노 게이고 별세", note:"대장암으로 새벽에 별세, 향년 68세(확인된 사실).", important:true, locId:"kodansha_hq" },
  { year:"2026-07-27", title:"고단샤, 공식 발표", note:"출판사 고단샤가 공식 홈페이지를 통해 별세 소식을 알림. 장례는 가족장으로 치러짐(확인된 사실).", important:true, locId:"kodansha_hq" },
  { year:"2026-08", title:"유작 『영원의 기억』 출간", note:"갈릴레오 시리즈 11번째 장편이자 생전 마지막 저서로, 공저를 제외한 저서 106권 중 마지막 작품(확인된 사실).", important:true }
];

const SUSPECTX_TIMELINE = [
  { year:"2005-08", title:"『용의자 X의 헌신』 단행본 출간", note:"잡지 연재를 거쳐 문예춘추에서 단행본으로 출간됨. 갈릴레오 시리즈의 세 번째 장편(확인된 사실).", important:true },
  { year:"2006", title:"제134회 나오키상 수상", note:"다섯 차례 최종 후보에 오른 끝에 마침내 나오키상을 수상, 작가 인생의 전환점이 됨(확인된 사실).", important:true, locId:"sx_naoki_prize_2006" },
  { year:"2008", title:"일본 실사 영화 개봉", note:"니시타니 히로시 감독, 후쿠야마 마사하루·츠츠미 신이치·시바사키 코우 주연. TV 드라마 '탐정 갈릴레오' 세계관의 첫 극장판(확인된 사실).", important:true, locId:"sx_shinohashi" },
  { year:"2011", title:"영어판 The Devotion of Suspect X 출간", note:"알렉산더 O. 스미스 번역으로 영어권에 소개되며 해외 독자층이 크게 넓어짐.", important:false },
  { year:"2012", title:"에드거상 최우수 소설 부문 후보", note:"미국추리작가협회(MWA)가 수여하는 에드거상 최우수 소설 부문 후보에 오르며 영미권에서도 실력을 인정받음.", important:false },
  { year:"2026-07-23", title:"작가 히가시노 게이고 별세", note:"대장암으로 별세, 향년 68세. 나오키상을 안겨준 대표작으로 다시 조명받음(확인된 사실).", important:true }
];

const BYAKUYA_TIMELINE = [
  { year:"1997~1999", title:"요미우리 신문 연재", note:"1997년부터 1999년까지 요미우리 신문에 연재된 뒤 슈에이샤에서 단행본으로 출간됨.", important:false },
  { year:"1999", title:"소설 『백야행』 단행본 출간", note:"19년에 걸친 두 사람의 이야기를 그린 장편소설로 출간됨(확인된 사실).", important:true },
  { year:"1999", title:"나오키상 최종 후보", note:"나오키상 후보에 올랐으나 이때는 수상하지 못함 — 그가 2006년 수상하기까지 다섯 차례 고배를 마신 과정 중 하나.", important:false },
  { year:"작중 1973년", title:"오사카 후세, 전당포 살인사건(극중 배경)", note:"이야기가 시작되는 극중 사건. 19년에 걸친 이야기의 출발점이 됨(작품 설정).", important:true, locId:"by_pawnshop_1973" },
  { year:"작중 1973~1992년", title:"두 사람, 각자 다른 방식으로 살아가다", note:"유키호와 료지가 서로 다른 삶의 궤적을 걸으며 19년의 시간이 흐름(작품 설정).", important:true },
  { year:"2006", title:"일본 TV 드라마화", note:"TBS 계열 드라마로 처음 영상화되며 큰 화제를 모음.", important:false },
  { year:"2011", title:"일본 실사 영화 개봉", note:"후카가와 요시히로 감독, 호리키타 마키·코라 켄고 주연으로 영화화(확인된 사실).", important:true, locId:"by_fuse_station" },
  { year:"2026-07-23", title:"작가 히가시노 게이고 별세", note:"대장암으로 별세, 향년 68세. 그의 오사카 시절 정서가 짙게 밴 이 작품이 다시 조명받음.", important:true }
];

/* ============================================================
   귀멸의 칼날 연표 — 다이쇼시대 극중 사건(정확한 연도가 나오지 않는 것은 '작중'으로 표기)과
   실제 연재·흥행 사건(확인된 사실)을 함께 배치한다.
   ============================================================ */
const KIMETSU_TIMELINE = [
  { year:"작중(다이쇼시대)", title:"가족을 잃은 밤", note:"숯을 팔고 돌아온 탄지로가 가족 전원이 오니에게 살해된 것을 발견한다. 유일하게 살아남은 네즈코마저 오니로 변해 있었다(작품 설정).", important:true, locId:"kamado_house" },
  { year:"작중(다이쇼시대)", title:"최종선별을 통과하다", note:"사콘지 문하에서 수련한 탄지로가 최종선별의 산에서 7일간 살아남아 정식 귀살대원이 된다(작품 설정).", important:true, locId:"final_selection_mountain" },
  { year:"작중(다이쇼시대)", title:"나타구모산, 첫 상급 오니와의 조우", note:"루이가 지배하던 가짜 '가족'과 맞서며 처음으로 하시라 토미오카 기유와 조우한다(작품 설정).", important:true, locId:"natsubi_swamp" },
  { year:"작중(다이쇼시대)", title:"아사쿠사, 도쿄에서의 첫 임무", note:"스사마루·야하바·쿄가이 등 오니와 맞서며 도쿄에서의 임무를 시작한다(작품 설정).", important:false, locId:"asakusa_backstreet" },
  { year:"작중(다이쇼시대)", title:"무한열차, 렌고쿠 쿄쥬로의 죽음", note:"하현의 일 엔무와 상현의 삼 아카자에 맞서 싸우던 염주 렌고쿠 쿄쥬로가 대원들을 지키고 숨을 거둔다(작품 설정).", important:true, locId:"mugen_train_interior" },
  { year:"작중(다이쇼시대)", title:"요시와라 유곽, 상현의 육과의 사투", note:"음주 우즈이 텐겐과 세 아내가 잠입 조사 중 상현의 육 기부타로·다키의 정체를 밝혀내고 사투를 벌인다(작품 설정).", important:true, locId:"yoshiwara_district" },
  { year:"작중(다이쇼시대)", title:"대장장이 마을 습격", note:"상현의 사 한텐구와 상현의 오 교코가 검을 벼리는 대장장이 마을을 습격한다(작품 설정).", important:true, locId:"swordsmith_village" },
  { year:"작중(다이쇼시대)", title:"하시라 훈련", note:"무잔과의 최종전을 앞두고 9명의 하시라가 대원 전원의 전투력을 끌어올리는 특훈을 진행한다(작품 설정).", important:false, locId:"hashira_training_grounds" },
  { year:"작중(다이쇼시대)", title:"무한성, 최종장", note:"무잔과 귀살대 전원, 상현의 오니들이 무한성에서 격돌한다 — 이야기 전체의 클라이맥스(작품 설정).", important:true, locId:"infinity_castle" },
  { year:"작중(다이쇼시대)", title:"후지카사네산, 새벽", note:"동이 트며 무잔이 마침내 태양 아래서 소멸한다. 백여 년에 걸친 싸움이 끝을 맺는 순간(작품 설정).", important:true, locId:"fujikasane_peak" },
  { year:"현대(에필로그)", title:"이어지는 인연", note:"등장인물들의 후손·환생이 현대 도쿄에서 함께 살아가는 모습으로 이야기가 마무리된다(작품 설정).", important:false, locId:"modern_tokyo_school" },
  { year:"2016-02", title:"주간 소년 점프 연재 시작", note:"고토게 코요하루가 주간 소년 점프에 연재를 시작함(확인된 사실).", important:true },
  { year:"2020-05", title:"만화 연재 완결", note:"전 205화, 단행본 전 23권으로 완결됨(확인된 사실).", important:false },
  { year:"2020-10", title:"극장판 '무한열차편' 일본 개봉", note:"개봉 후 일본 역대 흥행 수입 1위(약 404억 엔)를 기록함(확인된 사실).", important:true, locId:"kimetsu_chichibu_sl" },
  { year:"2025~", title:"극장판 '무한성편' 3부작 공개", note:"만화 최종장을 다루는 극장판 3부작이 순차 공개됨(확인된 사실 — 공개 일정은 배급사 발표 기준).", important:false }
];

/* ============================================================
   영화 <호프>(2026, 나홍진) 연표 — 극중 사건(정확한 날짜가 없어 '극중'으로 표기)과
   실제 제작·공개 사실을 함께 배치한다.
   ============================================================ */
const HOPE_TIMELINE = [
  { year:"극중 1980년대 초", title:"소 사체 발견", note:"출장소장 범석이 훼손된 소 사체를 확인하러 갔다가 심상치 않은 낌새를 느낀다(작품 설정).", important:false, locId:"hope_cow_carcass_site" },
  { year:"극중 1980년대 초", title:"바미기르, 마을에 나타나다", note:"정체불명의 존재가 마을을 초토화시키며 사태가 본격적으로 시작된다(작품 설정).", important:true, locId:"hope_namchang_town" },
  { year:"극중 1980년대 초", title:"성기 일행, 숲에서 우주선을 발견하다", note:"사냥에 나선 성기와 동료들이 추락한 우주선과 외계 생명체를 처음 목격한다(작품 설정).", important:true, locId:"hope_forest_wreck" },
  { year:"극중 1980년대 초", title:"매복, 동료들을 잃다", note:"아이도보르에게 유인당한 성기 일행이 마베이요·조르에게 포위되며 성기를 제외한 전원이 목숨을 잃는다(작품 설정).", important:true, locId:"hope_roadside_ambush" },
  { year:"극중 1980년대 초", title:"양배, 어린 외계 생명체를 사살하다", note:"저수지 근처 폐가에 사는 양배가 숲에서 조우한 어린 외계 생명체(칼리)를 저격해 사살한다(작품 설정).", important:true, locId:"hope_yangbae_house" },
  { year:"극중 1980년대 초", title:"트럭 노인들의 최후", note:"흰색 트럭을 몰고 나선 향토예비군 노인들이 마베이요에게 전원 목숨을 잃는다(작품 설정).", important:false, locId:"hope_truck_convoy_road" },
  { year:"극중 1980년대 초", title:"건어물 시장의 비극", note:"덕기를 찾아 나선 춘호와 범석이 바미기르에게 덕기와 춘호를 잇따라 잃는다(작품 설정).", important:true, locId:"hope_dried_seafood_market" },
  { year:"극중 1980년대 초", title:"보건소의 부검", note:"보건소장이 바미기르의 사체를 부검해 알려진 어떤 종도 아니라는 사실을 밝혀낸다(작품 설정).", important:false, locId:"hope_clinic" },
  { year:"극중 1980년대 초", title:"고속도로 최후의 결전", note:"범석·성애·낙연이 마베이요를 쓰러뜨리지만, 곧이어 예기치 못한 사고로 성기가 차량 밖으로 튕겨 나간다(작품 설정).", important:true, locId:"hope_final_standoff" },
  { year:"극중 1980년대 초", title:"야산의 함선 추락", note:"지구 궤도의 외계 함선이 호포항 인근 야산에 추락·폭발한다 — 마을 사건과는 별개로 암시되는 미회수 떡밥(작품 설정).", important:false, locId:"hope_ship_crash_site" },
  { year:"2016", title:"나홍진 감독, 신작 구상 시작", note:"《곡성》(2016) 이후 새로운 장르에 도전하고 싶다는 구상에서 출발해 외계 생명체 소재로 발전함(확인된 사실).", important:false },
  { year:"2026-05-17", title:"제79회 칸 국제영화제 경쟁부문 상영", note:"프랑스 칸 뤼미에르 대극장에서 공식 상영되며 전 세계에 처음 공개됨(확인된 사실).", important:true, locId:"hope_cannes_lumiere" },
  { year:"2026-07-15", title:"한국 개봉", note:"러닝타임 156분, 15세 관람가로 국내 극장에서 개봉함(확인된 사실).", important:true },
  { year:"2026-07~08", title:"해남 남창리 '영화의 거리' 조성", note:"해남군이 촬영지였던 남창리 일대를 1970~80년대 풍경의 관광 거리로 꾸며 공개함(확인된 사실).", important:false, locId:"hope_namchang_town" }
];

const ODYSSEY_TIMELINE = [
  { year:'극중 트로이 전쟁기', title:'이피게네이아의 희생', note:'아가멤논이 트로이 원정의 순풍을 얻기 위해 어린 딸 이피게네이아를 제물로 바친다(작품 설정).', important:true, locId:'aulis_sacrifice_site' },
  { year:'극중 트로이 전쟁기', title:'징병 추첨의 부정', note:'안티노오스가 시논의 면제 표를 가로채 자신의 징집 표와 바꿔치기하며 비극의 씨앗을 심는다(작품 설정).', important:false, locId:'conscription_lottery_site' },
  { year:'극중 트로이 전쟁기', title:'출정 전야, 부부의 마지막 약속', note:'오디세우스가 페넬로페에게 재혼을 부탁하고, 페넬로페는 아테나 문양의 금 브로치를 건넨다(작품 설정).', important:true, locId:'odysseus_penelope_bedroom' },
  { year:'극중 트로이 전쟁기', title:'트로이 목마 설계', note:'오디세우스의 계략으로 아테나에게 바치는 제물로 위장한 거대한 목마가 제작된다(작품 설정).', important:true, locId:'troy_wooden_horse_workshop' },
  { year:'극중 트로이 전쟁기', title:'시논, 홀로 남겨지다', note:'목마의 정체를 속이기 위해 시논이 트로이군에게 붙잡히는 위험한 임무에 자원한다(작품 설정).', important:true, locId:'trojan_horse_field' },
  { year:'극중 트로이 전쟁기', title:'목마 속 잠복', note:'물에 반쯤 잠긴 목마 안에서 그리스 정예 부대가 발각과 익사의 위기를 견디며 밤을 버틴다(작품 설정).', important:false, locId:'troy_horse_interior' },
  { year:'극중 트로이 전쟁기', title:'트로이 함락', note:'성문이 열리며 그리스 연합군이 돌격해 10년 전쟁이 끝난다(작품 설정).', important:true, locId:'troy_city_gates_fall' },
  { year:'극중 귀향 1년차', title:'이스마로스 약탈', note:'귀향길에 오른 오디세우스 일행이 키코네스족의 마을 이스마로스를 약탈하고, 노인의 경고를 묵살한 채 항로를 유지한다(작품 설정).', important:true, locId:'ismarus_raid_site' },
  { year:'극중 귀향 1년차', title:'포세이돈의 시험, 아이올리아', note:'바람의 섬 아이올리아에서 오디세우스 일행이 포세이돈이 내린 가혹한 시련을 마주한다(작품 설정).', important:false, locId:'aeolia_wind_trial' },
  { year:'극중 귀향 1년차', title:'폴리페무스의 동굴', note:'양을 쫓다 들어간 동굴에서 외눈박이 거인 폴리페무스에게 갇히고, 여섯 명의 병사가 잡아먹힌다(작품 설정).', important:true, locId:'polyphemus_cave_interior' },
  { year:'극중 귀향 1년차', title:'폴리페무스의 실명과 저주', note:'오디세우스가 불에 달군 창으로 폴리페무스의 눈을 찌르고, 격분한 거인이 아버지 포세이돈에게 저주를 내려달라 절규한다(작품 설정).', important:true, locId:'polyphemus_cave_exit' },
  { year:'극중 귀향 1년차', title:'오디세우스의 두 번째 화살', note:'탈출에 성공했음에도 분노를 이기지 못한 오디세우스가 실명한 폴리페무스에게 재차 활을 쏘아 위치를 노출시킨다(작품 설정).', important:true, locId:'odysseus_arrow_vengeance_hill' },
  { year:'극중 귀향 1년차', title:'라이스트뤼고네스의 습격', note:'거인족의 항구에서 세 척 중 두 척이 침몰당하고, 오디세우스가 탄 배 한 척만 겨우 탈출한다(작품 설정).', important:true, locId:'laestrygonian_harbor_massacre' },
  { year:'극중 귀향 1년차', title:'키르케의 섬, 병사들이 돼지로 변하다', note:'마녀 키르케가 차려낸 음식을 먹은 병사들이 돼지로 변한다(작품 설정).', important:true, locId:'circe_house' },
  { year:'극중 귀향 1년차', title:'키르케와의 대치와 화해', note:'키르케의 누이를 인질 삼은 오디세우스가 결국 병사들을 원래대로 되돌리는 데 성공하고, 저승으로 가는 법을 조언받는다(작품 설정).', important:true, locId:'circe_sister_hostage' },
  { year:'극중 귀향 2년차', title:'망자들의 해변, 저승의 문턱', note:'양 두 마리를 제물로 바쳐 망자를 소환한 오디세우스가 시논, 아가멤논, 테이레시아스를 차례로 만난다(작품 설정).', important:true, locId:'dead_shore_north' },
  { year:'극중 귀향 2년차', title:'테이레시아스의 예언', note:'오직 오디세우스만이 살아 돌아갈 운명이라는 예언을 들은 그가 신들에게 맞서겠다고 선언한다(작품 설정).', important:true, locId:'odysseus_zeus_defiance_vow' },
  { year:'극중 귀향 2년차', title:'세이렌의 해역을 지나다', note:'밀랍으로 귀를 막은 병사들과 달리 돛대에 몸을 묶은 오디세우스가 유일하게 노래를 들으며 살아남는다. 병사 한 명은 유혹에 넘어가 사라진다(작품 설정).', important:true, locId:'sirens_waters' },
  { year:'극중 귀향 2년차', title:'스킬라의 협곡, 여섯 명을 잃다', note:'카리브디스를 피하려던 계획과 달리 병사들이 스스로 방향을 꺾어 스킬라의 협곡으로 들어서며 여섯 명이 희생된다(작품 설정).', important:true, locId:'scylla_charybdis_channel' },
  { year:'극중 귀향 2년차', title:'헬리오스의 섬, 금기를 어기다', note:'굶주림을 이기지 못한 병사들이 태양신의 신성한 소 350마리 중 일부를 잡아먹는다(작품 설정).', important:true, locId:'helios_cattle_pasture' },
  { year:'극중 귀향 2년차', title:'제우스의 폭풍, 함대의 최후', note:'금기를 어긴 대가로 폭풍이 배를 두 동강 내고, 오디세우스를 제외한 모든 병사가 목숨을 잃는다(작품 설정).', important:true, locId:'storm_wreckage_drift' },
  { year:'극중 귀향 3년차', title:'칼립소의 섬에 표류하다', note:'홀로 표류하던 오디세우스가 의식을 잃은 채 오기기아 섬에 닿아 칼립소에게 구조된다(작품 설정).', important:true, locId:'calypso_awakening_site' },
  { year:'극중 귀향 3~9년차', title:'기억을 잃은 7년', note:'로터스 나무의 꽃을 먹은 오디세우스가 기억을 잃은 채 칼립소와 7년 가까운 시간을 보낸다(작품 설정).', important:true, locId:'lotus_flower_grove' },
  { year:'극중 귀향 9년차', title:'구혼자들, 이타카를 압박하다', note:'안티노오스를 비롯한 구혼자들이 페넬로페에게 노골적으로 구애하며 이타카 궁을 어지럽힌다(작품 설정).', important:false, locId:'ithaca_banquet_hall' },
  { year:'극중 귀향 10년차', title:'텔레마코스, 검술을 배우다', note:'장성한 텔레마코스가 에우마이오스와 멘토르에게 검술을 배우며 아버지의 사냥개 아르고스 이야기를 듣는다(작품 설정).', important:false, locId:'telemachus_training_ground' },
  { year:'극중 귀향 10년차', title:'아르고스 학대 사건', note:'구혼자들이 늙은 사냥개 아르고스를 괴롭히고, 이를 말리던 텔레마코스가 폴리부스에게 제압당한다(작품 설정).', important:true, locId:'ithaca_argos_incident' },
  { year:'극중 귀향 10년차', title:'멜란토의 배신이 드러나다', note:'구혼자와 내통한 시녀 멜란토의 밀회를 에우마이오스가 목격하고, 텔레마코스의 출항 계획이 새어나간다(작품 설정).', important:false, locId:'melantho_antinous_tryst' },
  { year:'극중 귀향 10년차', title:'텔레마코스, 비밀리에 출항하다', note:'암살 위협을 피해 텔레마코스가 몰래 준비를 마치고 스파르타를 향해 떠난다(작품 설정).', important:true, locId:'ithaca_secret_departure' },
  { year:'극중 귀향 10년차', title:'스파르타에서 들은 아버지의 활약', note:'헤르미오네의 결혼 축하연에 초대된 텔레마코스가 메넬라오스로부터 트로이 목마 작전의 전말을 직접 듣는다(작품 설정).', important:true, locId:'sparta_wedding_feast' },
  { year:'극중 귀향 10년차', title:'아가멤논의 비극을 전해 듣다', note:'메넬라오스와의 사냥 중 텔레마코스가 아가멤논의 죽음과 오레스테스의 복수 이야기를 듣는다(작품 설정).', important:false, locId:'menelaus_hunting_ground' },
  { year:'극중 귀향 10년차', title:'칼립소, 진실을 밝히다', note:'기억을 잃은 와중에도 금 브로치를 놓지 않았던 오디세우스를 보고, 칼립소가 그를 놓아주기로 결심한다(작품 설정).', important:true, locId:'calypso_truth_reveal_beach' },
  { year:'극중 귀향 10년차', title:'뗏목을 타고 떠나다', note:'완전히 기억을 되찾은 오디세우스가 뗏목을 만들어 폭풍 속으로 항해를 시작한다(작품 설정).', important:true, locId:'calypso_raft_beach' },
  { year:'극중 귀향 10년차', title:'이타카 해안에 닿다', note:'표류 끝에 정신을 차린 오디세우스 곁에 아테나가 나타나 이곳이 고향 이타카임을 알려준다(작품 설정).', important:true, locId:'ithaca_shore_awakening' },
  { year:'극중 귀향 10년차', title:'에우마이오스와의 재회', note:'거지로 변장한 오디세우스가 옛 심복 에우마이오스와 재회하지만, 이미 그의 아들들이 죽고 텔레마코스가 노려지고 있다는 소식을 듣는다(작품 설정).', important:true, locId:'eumaeus_pigfarm_ithaca' },
  { year:'극중 귀향 10년차', title:'매복을 뚫고 귀환하는 텔레마코스', note:'폴리부스의 부관이 이끄는 도적들의 매복을 피해 텔레마코스가 무사히 이타카로 돌아온다(작품 설정).', important:false, locId:'telemachus_ambush_route' },
  { year:'극중 귀향 10년차', title:'활 시위 시험', note:'원로들의 후계 압박 속에 페넬로페가 텔레마코스에게 오디세우스의 활을 건네지만 시위를 걸지 못한다(작품 설정).', important:false, locId:'odysseus_penelope_bow_gift' },
  { year:'극중 귀향 10년차', title:'열두 자루 도끼 사이 활 시합', note:'정체를 숨긴 오디세우스가 활 시위를 당겨 자신만이 할 수 있던 묘기로 정체를 증명한다(작품 설정).', important:true, locId:'axe_bow_contest_site' },
  { year:'극중 귀향 10년차', title:'구혼자 처단', note:'오디세우스와 텔레마코스가 알현실에서 구혼자 전원을 처단하며 10년에 걸친 여정의 클라이맥스를 맞는다(작품 설정).', important:true, locId:'ithaca_throne_room_battle' },
  { year:'극중 귀향 10년차', title:'배신자들의 최후', note:'구혼자와 내통했던 멜란토·멜란티오스 등이 각자의 죄에 따른 처벌을 받는다(작품 설정).', important:false, locId:'melantho_execution_site' },
  { year:'극중 귀향 10년차', title:'부부의 재회', note:'오랜 세월 끝에 재회한 오디세우스와 페넬로페가 둘만 아는 비밀로 서로의 정체를 확인한다(작품 설정).', important:true, locId:'penelope_reunion_chamber' },
  { year:'극중 귀향 10년차', title:'왕위를 넘기다', note:'오디세우스가 텔레마코스에게 이타카의 왕위를 넘기고 통치에서 물러난다(작품 설정).', important:true, locId:'odyssey_ending_departure' },
  { year:'극중 귀향 10년차 이후', title:'서쪽으로 떠나는 항해', note:'오디세우스와 페넬로페가 함께 배에 올라 서쪽 바다로 항해를 떠나며, 불타는 트로이 목마의 이미지가 겹쳐진다(작품 설정 — 결말).', important:true, locId:'odyssey_ending_departure' },
  { year:'2020', title:'놀란, 원작 판권과 구상 착수', note:'《테넷》 이후 크리스토퍼 놀란 감독이 호메로스의 《오디세이아》를 스크린에 옮기겠다는 구상을 밝히기 시작함(확인된 사실).', important:false },
  { year:'2024-02', title:'유니버설과 배급 계약 공식화', note:'놀란 감독의 신작이 유니버설 픽처스 배급으로 확정되고 제목이 《오디세이》로 공개됨(확인된 사실).', important:true },
  { year:'2024년 상반기', title:'맷 데이먼 오디세우스 캐스팅 확정', note:'주연 오디세우스 역에 맷 데이먼이 캐스팅됨(확인된 사실).', important:true },
  { year:'2024년 하반기', title:'톰 홀랜드·앤 해서웨이 등 주요 배역 캐스팅', note:'텔레마코스 역 톰 홀랜드, 페넬로페 역 앤 해서웨이를 비롯해 젠데이아·샤를리즈 테론 등 초호화 캐스트가 공개됨(확인된 사실).', important:true },
  { year:'2025-02-25', title:'본촬영 시작', note:'91일간의 촬영 일정이 시작됨(확인된 사실).', important:true },
  { year:'2025년 봄', title:'모로코 촬영 — 트로이·오기기아', note:'에사우이라, 아이트 벤하두, 서사하라 화이트 듄 등에서 트로이 함락과 칼립소 에피소드가 촬영됨(확인된 사실).', important:false, locId:'ait_ben_haddou' },
  { year:'2025년 여름', title:'시칠리아·그리스 촬영 — 이타카·키클롭스', note:'파비냐나 카스텔로 디 산타 카테리나에서 이타카 궁전이, 펠로폰네소스 네스토르의 동굴에서 폴리페무스 시퀀스가 촬영됨(확인된 사실).', important:true, locId:'favignana_castle' },
  { year:'2025년 여름', title:'스코틀랜드·아이슬란드 촬영 — 키르케·저승', note:'애버딘셔 컬빈 숲·핀들레이터 성, 아이슬란드 이외를레이프스회이디에서 각각 라이스트뤼고네스·키르케·저승 장면이 촬영됨(확인된 사실).', important:false, locId:'hjorleifshofdi' },
  { year:'2025-08-08', title:'본촬영 종료', note:'91일간의 촬영이 마무리됨(확인된 사실).', important:false },
  { year:'2025년 가을~겨울', title:'몰타·LA 후반 작업', note:'몰타 지중해 필름 스튜디오에서 수중 촬영을, 유니버설 스튜디오 할리우드에서 이타카 궁 실내 세트 촬영을 마침(확인된 사실).', important:false, locId:'universal_studios_la' },
  { year:'2026년 초', title:'IMAX 70mm 최초 전면 촬영 공개', note:'IMAX 필름으로 전체 촬영된 최초의 장편영화라는 점이 공개되며 화제가 됨(확인된 사실).', important:false },
  { year:'2026-07-07', title:'평단 첫 반응 공개', note:'언론 시사 이후 평단의 극찬이 쏟아지며 로튼토마토 지수가 90%대 중후반을 기록함(확인된 사실).', important:false },
  { year:'2026-07-17', title:'미국·영국 개봉', note:'북미·영국에서 정식 개봉하며 놀란 커리어 사상 최대 오프닝 스코어를 기록함(확인된 사실).', important:true },
  { year:'2026년 8월 초', title:'맷 데이먼·샤를리즈 테론·놀란 감독 내한', note:'8월 1일부터 7일까지 한국을 방문해 SBS, 이동진의 파이아키아 등에 출연하며 프로모션을 진행함(확인된 사실).', important:false },
  { year:'2026-08-05', title:'한국 개봉', note:'172분 러닝타임, 15세 관람가로 한국에서 정식 개봉함(확인된 사실).', important:true },
  { year:'2026-08-09', title:'한국 누적 관객 187만 돌파', note:'개봉 5일 만에 한국에서 187만 명을 동원하며 흥행 순항을 이어감(확인된 사실).', important:false },
  { year:'2026년 8월 현재', title:'전 세계 흥행 11억 달러 돌파', note:'전 세계 박스오피스 11억 달러를 넘어서며 놀란 감독 최고 흥행작 중 하나로 자리매김함(확인된 사실).', important:true }
];

const DOKKAEBI_TIMELINE = [
  { year:"고려시대", title:"상장군 김신, 전장에서 무패의 신화를 쓰다", note:"김신은 수많은 전쟁에서 단 한 번도 패하지 않고 나라를 지켜, 백성들의 존경과 어린 왕 왕여의 두려움을 동시에 산다.", important:true, locId:"goryeo_battlefield" },
  { year:"고려시대", title:"누이 김선, 왕비가 되다", note:"김신의 하나뿐인 누이 김선이 왕여의 왕비로 간택된다.", important:false },
  { year:"고려시대", title:"선왕, 박중헌에게 독살당하다", note:"간신 박중헌이 선왕을 독살하고 어린 왕여를 조종하기 시작한다.", important:false, locId:"goryeo_palace_betrayal" },
  { year:"고려시대", title:"박중헌, 김신을 역적으로 모함하다", note:"박중헌은 김신의 공적과 명성을 왕에 대한 위협으로 몰아, 왕여가 그를 두려워하고 미워하게 만든다.", important:false },
  { year:"고려시대", title:"김신, 반역죄로 처형 명령을 받다", note:"왕여는 결국 김신에게 반역죄를 씌우고 그를 죽이라 명한다.", important:true },
  { year:"고려시대", title:"김선의 희생", note:"왕비 김선이 오라버니를 향해 '멈추지 말고 폐하께 가세요'라 외치며 스스로 화살을 맞고 쓰러진다.", important:true, locId:"kim_sun_death_site" },
  { year:"고려시대", title:"김신, 자신의 검에 스러지다", note:"김신은 자신을 죽이라 명한 왕에게 검을 바치러 가던 중, 그를 아끼던 가신의 손에 스스로 목숨을 끊는다.", important:true, locId:"goryeo_palace_betrayal" },
  { year:"고려시대", title:"신의 형벌 — 불멸의 도깨비로 부활", note:"가신들이 버려진 김신의 시신을 애도하자 신이 응답해, 그의 가슴에 영원히 검이 꽂힌 불멸의 도깨비로 되살린다.", important:true, locId:"goblin_birth_field" },
  { year:"고려시대", title:"김신, 박중헌을 처단하다", note:"도깨비로 부활한 김신은 곧바로 박중헌을 찾아가 처단한다.", important:false },
  { year:"고려시대", title:"왕여, 죄책감에 스스로 독을 마시다", note:"박중헌의 계략을 알면서도 막지 못한 왕여는 죄책감에 시달리다 스스로 독을 마시고 세상을 떠난다.", important:true },
  { year:"고려시대~조선", title:"저승사자, 지옥에서 벌을 받다", note:"왕여의 영혼은 600년간 지옥에서 벌을 받으며, 자신이 저지른 일에 대한 대가를 치른다.", important:false },
  { year:"근대", title:"김신, 신부를 기다리며 시대를 떠돌다", note:"900년에 가까운 시간 동안 도깨비 김신은 신부가 나타나기를 기다리며 세상 곳곳을 떠돈다.", important:false },
  { year:"현대·과거", title:"왕여, 기억을 잃은 저승사자로 환생하다", note:"600년의 형벌 끝에 왕여는 전생의 기억을 모두 잃은 채 망자를 인도하는 저승사자로 환생한다.", important:false },
  { year:"현대", title:"지연희, 뺑소니 사고를 당하다", note:"임신부 지연희가 뺑소니 사고로 죽어가며 뱃속 아이를 살려달라 빌고, 김신이 그 모성에 감응해 모녀 모두를 살려준다.", important:true, locId:"eun_tak_birth_scene" },
  { year:"현대", title:"지은탁 출생 — '기타 누락자'", note:"은탁은 저승의 호적에 기록되지 않은 '기타 누락자'로 태어나며, 도깨비의 신부임을 증명하는 몸의 흔적과 귀신을 보는 능력을 갖게 된다.", important:false },
  { year:"현대", title:"은탁, 어머니를 잃다", note:"은탁이 9세 되던 해, 어머니 지연희가 교통사고로 세상을 떠난다.", important:false },
  { year:"현대", title:"은탁, 이모 가족에게 맡겨져 구박받다", note:"보험금을 노린 이모 지연숙의 가족에게 맡겨진 은탁은 식모처럼 부려지며 학대받는 시절을 보낸다.", important:false, locId:"eunuck_house_abuse" },
  { year:"현대", title:"써니와 저승사자, 운명적으로 만나다", note:"육교 위에서 삼계탕집 사장 써니(김선의 환생)와 저승사자가 처음 만나 알 수 없는 끌림을 느낀다.", important:true, locId:"yongdap_bridge" },
  { year:"현대", title:"은탁, 열아홉 살 생일 — 도깨비를 소환하다", note:"주문진 방파제에서 홀로 촛불을 불며 소원을 빌던 은탁이 자신도 모르게 도깨비 김신을 최초로 소환한다.", important:true, locId:"jumunjin_beach" },
  { year:"현대", title:"은탁, 캐나다 퀘벡에서 김신의 신부임을 선언하다", note:"은탁은 마법의 문을 통해 퀘벡까지 김신을 따라가 '아저씨한테 시집갈래요. 사랑해요'라 고백한다.", important:true, locId:"quebec_frontenac" },
  { year:"현대", title:"은탁, 검의 손잡이를 구체적으로 증명하다", note:"은탁이 김신의 가슴에 꽂힌 검의 모양과 문양을 정확히 묘사하며, 자신이 진짜 도깨비 신부임을 확신시킨다.", important:true, locId:"goblin_bride_confession" },
  { year:"현대", title:"김신과 저승사자, 도깨비 하우스에서 함께 살다", note:"운현궁 양관을 배경으로 한 저택에서 김신과 저승사자, 그리고 세입자 유덕화가 함께 지내는 일상이 펼쳐진다.", important:false, locId:"unhyeongung_annex" },
  { year:"현대", title:"김신과 은탁, 월정사 숲길을 걷다", note:"눈 덮인 전나무 숲길에서 두 사람은 서로의 마음을 확인한다.", important:false, locId:"pyeongchang_woljeongsa" },
  { year:"현대", title:"고창 메밀밭 — 도깨비의 비밀 공간", note:"김신이 홀로 상념에 잠기던 메밀밭에서 은탁과 함께 거니는 장면이 그려진다.", important:false, locId:"gochang_buckwheat" },
  { year:"현대", title:"저승사자, 자신이 왕여였음을 깨닫다", note:"기억을 되찾은 저승사자는 자신이 김신을 죽음으로 몬 고려의 왕 왕여였다는 충격적인 진실과 마주한다.", important:true, locId:"wang_yeo_identity_reveal" },
  { year:"현대", title:"유신우 회장, 세상을 떠나다", note:"천우그룹 유신우 회장이 심장마비로 눈을 감으며, 김신에게 자신의 묘비명을 부탁한다.", important:false, locId:"yoo_shinwoo_death" },
  { year:"현대", title:"김비서, 천우그룹의 새 수장이 되다", note:"유신우 회장 사후, 오랫동안 김신의 은밀한 도움을 받아온 김도영이 천우그룹의 CEO 자리에 오른다.", important:false, locId:"cheonwoo_group_office" },
  { year:"현대", title:"지연숙, 파멸하다", note:"은탁을 학대한 이모 지연숙은 사기·유괴 공모로 수감되고, 출소 후 쓸쓸한 죽음을 맞는다.", important:false, locId:"eunuck_house_abuse" },
  { year:"현대", title:"은탁, 성인이 되어 대학에 합격하다", note:"혹독한 시절을 딛고 자란 은탁이 새로운 삶의 문턱에 선다.", important:false },
  { year:"현대", title:"도깨비의 숙명 — 신부가 검을 뽑아야 하는 순간", note:"은탁은 김신을 영원한 불멸의 고통에서 벗어나게 하기 위해, 그의 가슴에서 검을 뽑는 선택을 마주한다.", important:true },
  { year:"현대", title:"김신, 평화로운 죽음을 맞다", note:"900년 넘게 이어진 불멸의 삶을 끝내고, 김신은 마침내 인간으로서 평온한 죽음을 맞이한다.", important:true },
  { year:"현대(그 후)", title:"은탁, 새로운 삶과 재회를 이어가다", note:"김신 없는 삶을 살아가던 은탁은 시간이 흐른 뒤 기억 없는 김신과 다시 마주치며 이야기는 여운을 남긴 채 막을 내린다.", important:true }
];

const GWANDONG_TIMELINE = [
  { year:"1580년(선조 13) 정월", title:"정철, 강원도관찰사에 제수되다", note:"45세의 정철이 임금의 부름을 받고 강원도관찰사 직함을 받는다.", important:true, locId:"wonju_gamyeong" },
  { year:"1580년 정월", title:"원주 부임", note:"정철이 강원도 감영이 있는 원주로 부임하며 관동별곡의 여정이 시작된다.", important:true, locId:"wonju_gamyeong" },
  { year:"1580년 3월", title:"내금강 유람 시작 — 만폭동", note:"금강산 초입, 내금강 제일의 명소 만폭동의 절경에 감탄한다.", important:false, locId:"manpokdong" },
  { year:"1580년 3월", title:"금강대·진헐대·개심대를 오르다", note:"금강산의 여러 전망대에 올라 만이천봉을 조망하며 감흥을 노래한다.", important:false, locId:"gaesimdae" },
  { year:"1580년 3월", title:"화룡연·십이폭포의 장관", note:"용이 승천했다는 전설의 못과 열두 굽이 폭포의 웅장한 정경을 묘사한다.", important:true, locId:"sibipokpo" },
  { year:"1580년 3월~4월", title:"외금강·해금강으로 이동", note:"내금강 유람을 마치고 동해안 방향, 외금강과 해금강 쪽으로 여정을 옮긴다.", important:false },
  { year:"1580년 4월", title:"총석정에서 해돋이를 보다", note:"바닷속에서 솟은 육각 돌기둥들에 둘러싸인 총석정에서 일출의 장관을 노래한다.", important:true, locId:"chongseokjeong" },
  { year:"1580년 4월", title:"삼일포의 신비로운 풍경", note:"신라 화랑이 사흘 머물렀다는 전설이 깃든 삼일포의 호수 풍경을 그린다.", important:false, locId:"samilpo" },
  { year:"1580년 4월", title:"의상대에서의 일출 — 관동별곡 백미", note:"낙산사 의상대에 올라 동해의 해돋이를 바라보며 관동별곡 중에서도 가장 유명한 구절을 남긴다.", important:true, locId:"uisangdae" },
  { year:"1580년 4월", title:"낙산사·청간정을 거치다", note:"관동팔경의 사찰과 정자를 잇달아 둘러보며 여정을 이어간다.", important:false, locId:"naksansa" },
  { year:"1580년 4월", title:"경포대의 달 — 하늘·호수·바다에 뜬 세 개의 달", note:"경포대에서 하늘, 경포호, 동해에 각각 비친 달을 노래한 유명한 구절을 남긴다.", important:true, locId:"gyeongpodae" },
  { year:"1580년 4월", title:"죽서루에 오르다", note:"오십천 절벽 위 죽서루에서 그 빼어난 자리를 노래한다.", important:false, locId:"jukseoru" },
  { year:"1580년 4월~5월", title:"망양정에서 동해의 광활함을 노래하다", note:"관동팔경 중 하나인 망양정에서 끝없이 펼쳐진 동해 바다를 바라본다.", important:false, locId:"mangyangjeong" },
  { year:"1580년 5월", title:"월송정을 끝으로 관동팔경 유람을 마치다", note:"울창한 소나무 숲으로 둘러싸인 월송정에서 관동팔경 순력을 마무리짓는다.", important:false, locId:"wolsongjeong" },
  { year:"1580년", title:"꿈속의 신선 — 관동별곡의 결말", note:"작품의 4단, 정철은 꿈속에서 신선과 더불어 노니는 것에 비유해 자신의 풍류와 소회를 노래하며 작품을 맺는다.", important:true },
  { year:"1580년 이후", title:"관동별곡, 후대 문학에 영향을 남기다", note:"김만중은 서포만필에서 관동별곡을 '동방의 이소'라 극찬했고, 조우인의 관동속별곡 등 후대 작품에도 큰 영향을 미쳤다.", important:true }
];

const WANGSANAM_TIMELINE = [
  { year:"1441년", title:"단종 출생, 생모는 사흘 만에 승하", note:"문종과 현덕왕후 권씨 사이에서 태어난다. 생모 현덕왕후는 산욕으로 출산 사흘 만에 세상을 떠난다.", important:false },
  { year:"1450년", title:"세종대왕 승하", note:"단종의 할아버지 세종이 세상을 떠난다.", important:false },
  { year:"1452년", title:"문종 승하, 단종 즉위", note:"재위 2년여 만에 문종이 병으로 승하하고, 12세의 단종이 왕위에 오른다. 김종서·황보인 등 원로 대신들이 어린 왕을 보필한다.", important:true },
  { year:"1453년 10월", title:"계유정난 — 김종서·황보인 살해", note:"수양대군이 정변을 일으켜 김종서를 직접 찾아가 살해하고, 같은 밤 황보인도 홍윤성·함귀에 의해 살해된다. 두 사람은 역모죄를 뒤집어쓴 채 저잣거리에 효시된다.", important:true, locId:'gyeongbokgung' },
  { year:"1453년", title:"안평대군, 강화도로 유배 후 사사", note:"계유정난 이후 반대파로 몰린 안평대군이 강화도로 유배됐다가 곧 사사된다.", important:true, locId:'ganghwado' },
  { year:"1455년 윤6월", title:"세조 즉위 — 단종의 양위", note:"단종은 결국 숙부 수양대군에게 왕위를 넘기도록 강요받고, 수양대군이 세조로 즉위한다.", important:true, locId:'gyeongbokgung' },
  { year:"1456년 6월", title:"사육신 사건 발각", note:"성삼문·박팽년 등 집현전 학사 출신 신하들이 명나라 사신 접대연에서 세조를 시해하고 단종을 복위시키려 했으나, 가담자였던 김질이 장인 정창손과 함께 밀고하며 거사가 무산된다.", important:true },
  { year:"1456년 6월", title:"사육신 처형 — 부친과 가족까지 연좌", note:"성삼문·박팽년·하위지·이개·유성원·유응부(및 김문기)가 처형된다. 성삼문의 부친 성승, 박팽년의 부친 박중림을 비롯해 가족 500여 명이 함께 화를 입는다.", important:true, locId:'noryangjin' },
  { year:"1457년 6월", title:"단종, 노산군으로 강봉되어 영월로 유배", note:"단종은 노산군으로 강봉되고, 창덕궁을 떠나 7일간의 유배길 끝에 영월 청령포에 도착한다.", important:true, locId:'changdeokgung' },
  { year:"1457년 6월", title:"정순왕후, 정업원에서 비구니가 되다", note:"단종과 이별한 정순왕후 송씨는 궁을 나와 정업원(현 청룡사)에서 비구니가 되어, 매일 동망봉에 올라 영월 쪽을 바라보며 통곡한다.", important:true, locId:'jeongeobwon' },
  { year:"1457년 여름", title:"청령포 침수 위기 — 관풍헌으로 이거", note:"장마로 청령포가 침수될 위험에 놓이자, 단종은 두 달 만에 영월 읍내 관풍헌으로 거처를 옮긴다.", important:false, locId:'gwanpungheon' },
  { year:"1457년 9월", title:"금성대군, 순흥에서 단종 복위를 도모하다", note:"순흥에 유배 중이던 금성대군이 순흥부사 이보흠과 함께 격문을 돌려 의병을 일으키려 하지만 거사가 사전에 발각된다(정축지변).", important:true, locId:'sunheung' },
  { year:"1457년 10월", title:"금성대군 사사, 순흥부 폐부", note:"거사 실패로 금성대군은 사사되고 이보흠은 참형에 처해진다. 순흥부 전체가 폐부되며 수많은 주민이 함께 화를 입는다.", important:true, locId:'sunheung' },
  { year:"1457년 10월 24일", title:"단종, 관풍헌에서 사사되다", note:"금성대군 사건의 여파 속에 단종에게도 사약이 내려진다. 17세의 나이로 세상을 떠난다.", important:true, locId:'gwanpungheon' },
  { year:"1457년 10월", title:"엄흥도, 목숨을 걸고 시신을 수습하다", note:"아무도 시신을 거두려 하지 않는 상황에서, 영월 호장 엄흥도가 후환을 무릅쓰고 몰래 시신을 수습해 선산에 암장한다.", important:true, locId:'jangneung' },
  { year:"1457년 이후", title:"엄흥도, 계룡산에서 삼년상을 치르고 은둔하다", note:"엄흥도는 영월을 떠나 계룡산 동학사에서 단종의 삼년상을 치른 뒤 문경에 은둔한 것으로 전해진다.", important:false, locId:'donghaksa' },
  { year:"1698년(숙종 24)", title:"단종 복위 — 묘호와 능호를 받다", note:"241년 만에 단종의 왕위가 공식 복위되고, 엄흥도가 몰래 묻었던 자리는 정식 왕릉 '장릉'이 된다.", important:true, locId:'jangneung' },
  { year:"1706년(숙종 32)", title:"생육신 6인, 서산서원에 함께 배향되다", note:"김시습·원호·이맹전·조려·성담수·남효온 6인이 상주 서산서원에 함께 모셔진다.", important:false, locId:'seosanseowon' },
  { year:"2024년 10월", title:"영화 캐스팅 발표", note:"유해진·박지훈·유지태·전미도 주연에 김민·이준혁 등의 특별출연이 확정되며 제작 소식이 알려진다.", important:false },
  { year:"2026년 2월 4일", title:"《왕과 사는 남자》 개봉", note:"장항준 감독의 첫 사극 영화가 개봉한다.", important:true },
  { year:"2026년 3월 6일", title:"1000만 관객 돌파", note:"개봉 한 달여 만에 1000만 관객을 넘기며 역대 34번째 '천만 영화'가 된다.", important:true },
  { year:"2026년 7월", title:"최종 1691만 관객 — 역대 박스오피스 2위", note:"역대 한국 영화 관객 수 2위, 매출액 1위를 기록하며 흥행을 마무리한다.", important:true }
];

const SPIDERMAN_TIMELINE = [
  { year:"2012년", title:"뉴욕 전투 — 프롤로그", note:"치타우리의 뉴욕 침공(어벤져스) 직후, 폐기물 처리업자 에이드리언 툼스가 잔해 정리 계약을 정부(데미지 컨트롤)에 빼앗긴다(작품 설정).", important:true, locId:"grandcentralterminal" },
  { year:"2012년", title:"툼스, 외계 기술 일부를 몰래 챙기다", note:"계약을 잃은 툼스는 이미 회수해둔 첨단 외계 기술 일부를 몰래 빼돌려 훗날을 도모한다(작품 설정).", important:false },
  { year:"8년 후 · 2016년", title:"툼스, 암시장 무기상으로 재기", note:"빼돌린 기술을 활용해 첨단 무기를 만들어 파는 암시장 사업을 은밀히 운영하며 세력을 키운다(작품 설정).", important:true },
  { year:"2016년", title:"베를린 — 어벤져스 내분(시빌 워)", note:"스타크의 요청으로 피터가 처음 어벤져스 임무에 투입돼 베를린 공항 전투에 참여한다(<시빌 워>와 연결되는 설정).", important:true, locId:"tegelbrandenburg" },
  { year:"2016년", title:"베를린 호텔 — 새 슈트 확인", note:"스타크사가 업그레이드한 새로운 스파이더 슈트를 처음 착용하고 성능을 확인한다(작품 설정).", important:false, locId:"mandarinorientalatl" },
  { year:"임무 직후", title:"퀸즈로 귀환 — 평범한 일상 복귀", note:"화려한 첫 임무를 뒤로하고 다시 메이 이모와 사는 아파트로 돌아와 평범한 고등학생 생활을 재개한다(작품 설정).", important:true, locId:"longislandcityapt" },
  { year:"이후 약 2개월", title:"해피의 연락을 기다리며", note:"다음 임무를 애타게 기다리며 비상계단에 앉아 스타크사의 연락을 기다리는 나날이 이어진다(작품 설정).", important:false, locId:"queensblvdfireescape" },
  { year:"평범한 하루", title:"등굣길과 델마스 델리", note:"평범한 학교생활 속에서 델마스 델리 주인과 친근한 농담을 주고받는 등 소소한 일상을 보낸다(작품 설정).", important:false, locId:"delmarsdeli" },
  { year:"평범한 하루", title:"자전거 도둑 검거", note:"동네를 순찰하다 자전거 도둑을 잡아 주인에게 돌려주는 등 소소한 '동네 히어로' 활동을 이어간다(작품 설정).", important:false, locId:"lernershops" },
  { year:"어느 날", title:"'퀸즈 커뮤니티 은행' 강도 사건", note:"어벤져스 가면을 쓴 강도들이 은행을 터는 사건이 벌어지고, 델마스 델리까지 피해를 입지만 피터가 델마 아저씨와 고양이를 구해낸다(작품 설정).", important:true, locId:"peachtree99" },
  { year:"어느 날 저녁", title:"메이와의 저녁 식사 — 들키기 직전", note:"메이 이모가 피터의 수상한 행동을 캐묻고, 피터는 '스타크 인턴십'이라는 핑계로 위기를 넘긴다(작품 설정).", important:false, locId:"sylvanbuilding" },
  { year:"파티 초대", title:"리즈의 홈커밍 파티 초대", note:"짝사랑하던 3학년 선배 리즈의 파티에 네드와 함께 초대받아 들뜬다(작품 설정).", important:false, locId:"littlejohntrail" },
  { year:"파티 당일 밤", title:"무기 거래 현장 포착 — 벌처와 첫 조우", note:"파티장 근처에서 대규모 무기 거래 정황을 포착해 저지하려다, 거대한 날개를 단 '벌처'와 처음 맞닥뜨리고 강물에 추락한다(작품 설정).", important:true, locId:"parkdrivebridge" },
  { year:"다음 날", title:"스타크의 경고 전화", note:"스타크가 '인도에서' 전화를 걸어 위험한 일에서 손을 떼라고 경고하지만, 피터는 오히려 단서를 쫓기 시작한다(작품 설정).", important:false, locId:"hindutempleatlanta" },
  { year:"추적 시작", title:"무기 추적 — 워싱턴 원정 계획", note:"거래 현장에서 발견한 무기의 출처를 추적하던 중, 학교 디케슬론 팀의 워싱턴 DC 전국대회에 자원해 동행하기로 한다(작품 설정).", important:true, locId:"gradyhighschool" },
  { year:"DC 도착", title:"'워싱턴 DC' 호텔 투숙", note:"디케슬론 팀과 함께 워싱턴 DC의 호텔에 도착하지만, 대회보다 무기 추적에 더 마음이 쏠려 있다(작품 설정).", important:false, locId:"embassysuitesperimeter" },
  { year:"대회 우승 후", title:"워싱턴 기념탑 방문 — 위기 발생", note:"팀의 우승을 축하하며 방문한 워싱턴 기념탑에서, 네드가 몰래 들고 있던 외계 기술이 오작동해 큰 위기가 벌어진다(작품 설정).", important:true, locId:"washingtonmonument" },
  { year:"위기 직후", title:"애런 데이비스 추적", note:"소규모 밀매업자 애런 데이비스를 추적해 무기 거래 정보를 얻어낸다 — 뜻밖에도 그리 나쁜 사람은 아니라는 사실도 알게 된다(작품 설정).", important:false, locId:"parkdrivebridge" },
  { year:"거래 당일", title:"스태튼아일랜드 페리 — 거래 저지 시도", note:"페리에서 벌어지는 무기 거래를 홀로 저지하려다 상황을 통제하지 못해 페리를 두 동강 내는 대형 사고를 낸다(작품 설정).", important:true, locId:"statenislandferry" },
  { year:"사고 직후", title:"스타크, 슈트를 회수하다", note:"크게 화가 난 스타크가 직접 나타나 신랄하게 질책하며 첨단 슈트를 회수해 간다(작품 설정).", important:true, locId:"governorsislandvent" },
  { year:"슈트 없이", title:"홈커밍 파티 당일 — 벌처의 정체 발각", note:"슈트 없이 평범한 학생으로 돌아간 피터는, 전혀 예상치 못한 상황에서 벌처의 진짜 정체를 알게 된다(작품 설정).", important:true, locId:"littlejohntrail" },
  { year:"무인기 습격", title:"어벤져스 무기 수송기 습격 발견", note:"벌처가 어벤져스의 신형 무기를 실은 무인 수송기를 노린다는 사실을 알아채고, 네드의 도움만으로 단독 대응에 나선다(작품 설정).", important:true, locId:"coneyislandboardwalk" },
  { year:"최종 대결", title:"슈트 없는 최후의 대결", note:"업그레이드된 슈트도 없이, 자신만의 방식으로 벌처와 최후의 대결을 벌인다 — 그 결과는 직접 작품을 보고 확인하세요(작품 설정).", important:true, locId:"porschecenter" },
  { year:"실제 제작", title:"2016년 여름, 실제 촬영 시작", note:"파인우드 애틀랜타 스튜디오를 거점으로 실제 촬영이 진행됐다(확인된 사실).", important:false, locId:"pinewoodatlanta" },
  { year:"2017년 7월 7일", title:"미국 정식 개봉", note:"북미에서 정식 개봉해 마블 시네마틱 유니버스 내 스파이더맨의 첫 단독 영화로 자리매김한다(확인된 사실).", important:true },
  { year:"개봉 이후", title:"전 세계 흥행 성공", note:"전 세계 8억 달러 이상의 흥행 수익을 올리며 상업적으로도 크게 성공한다(확인된 사실).", important:false },
  { year:"2026년", title:"넷플릭스 재상위권 진입", note:"개봉 수년이 지난 2026년, 넷플릭스에 서비스되며 다시 인기 순위 상위권에 오른다(기획자 조사 기준).", important:true }
];

const CONANHIGHWAY_TIMELINE = [
  { year:"프롤로그", title:"요코하마행 — 가나가와 모터사이클 페스티벌", note:"소년탐정단이 먼저 요코하마로 출발하고, 코난은 코고로·란·소노코·세라 마스미와 함께 뒤따라 합류한다(작품 설정).", important:false, locId:"akarengasoko" },
  { year:"이동 중", title:"정체불명의 검은 오토바이", note:"머리가 없는 듯한 착시를 일으키는 검은 오토바이 라이더가 도로를 스치듯 지나가고, 가나가와현경 교통기동대 하기와라 치하야가 이를 추격하다 놓친다(작품 설정).", important:true, locId:"turnpikehakone" },
  { year:"페스티벌 당일", title:"차세대 경찰 오토바이 '엔젤' 공개", note:"엔지니어 오오마에 카즈아키가 AI 지원 경찰 오토바이 '엔젤'을 공개하고, 치하야가 안전장치를 몰래 해제한 채 시승한다(작품 설정).", important:true },
  { year:"곧이어", title:"도쿄에서도 목격된 검은 오토바이 — '루시퍼'로 명명", note:"도쿄 경시청 교통과(미야모토 유미·미이케 나에코)도 같은 오토바이를 목격하고, 실루엣이 '엔젤'과 같다는 사실이 확인돼 '루시퍼'라는 이름이 붙는다(작품 설정).", important:true },
  { year:"과거 회상", title:"치하야의 상실 — 남동생 켄지와 동료 진페이", note:"폭발물 처리반이었던 남동생 하기와라 켄지가 7년 전 순직했고, 그 뒤를 이어 켄지의 절친 마츠다 진페이마저 같은 사건을 쫓다 순직했다는 사실이 회상으로 드러난다(작품 설정).", important:false },
  { year:"수사 중", title:"전직 백주 대원 아사기 이치카 방문", note:"치하야 일행은 과거 추격 사고의 책임을 지고 오토바이 업무에서 배제된 전직 후배 아사기 이치카를 찾아가지만, 그녀가 오토바이를 완전히 끊었다는 말과 달리 수상한 흔적을 남긴다(작품 설정).", important:true },
  { year:"사건 발생", title:"탄자와호 — 아오키 유이치로 익사체 발견", note:"전직 프로 레이서이자 후지사와 오토바이숍 운영자 아오키 유이치로가 탄자와호에서 익사체로 발견된다(작품 설정).", important:true, locId:"tanzawako" },
  { year:"수사 중", title:"세라의 잠입수사 — 불법 도로경주", note:"세라 마스미가 아오키를 대신해 그의 체형·차량으로 위장하고 불법 도로경주 현장에 잠입해왔다는 사실이 드러난다(작품 설정).", important:true },
  { year:"위기", title:"무기 밀매업자와의 충돌 · 옥상 추격", note:"코난과 세라는 무기 개발자 로한 S. 라히리의 부하들과 정면으로 부딪히고, '루시퍼'에게 옥상에서 쫓기는 위기를 겪는다(작품 설정).", important:true },
  { year:"반전 1", title:"루시퍼의 정체 — 아사기 이치카", note:"검은 오토바이 '루시퍼'를 실제로 모는 사람이 아사기 이치카이며, 오오마에 카즈아키에게 은밀히 고용돼 불법 데이터 수집용 사고를 연출해왔다는 사실이 밝혀진다(작품 설정).", important:true, locId:"turnpikehakone" },
  { year:"반전 2", title:"배후 — 오오마에 카즈아키의 데이터 밀매", note:"오오마에가 불법 도로경주로 수집한 자율주행 데이터를 군사용 자율 무기 기술로 밀매하려 했으며, 이를 눈치챈 옛 동료 사사키 나오유키를 살해하고 사고로 위장했다는 사실이 드러난다(작품 설정).", important:true },
  { year:"반전 3", title:"류우리 키리코 — 사사키의 누나의 복수극", note:"페스티벌 바이크 디자이너 류우리 키리코가 사실 사사키 나오유키의 친누나이며, 동생의 복수를 위해 아사기를 조종하고 오오마에를 요코하마 베이브리지로 유인해 헬리콥터 저격을 준비해왔다는 사실이 밝혀진다(작품 설정).", important:true, locId:"yokohamabaybridge" },
  { year:"클라이맥스", title:"자리 바꿔치기 트릭", note:"코난은 아사기를 마취시키고 치하야와 자리를 바꿔, 오오마에가 스스로 범행을 자백하도록 유도하는 트릭을 설계한다(작품 설정).", important:true, locId:"kanagawapolicehq" },
  { year:"클라이맥스", title:"요코하마 베이브리지 — 저격 저지", note:"같은 시각 코난 일행은 요코하마 베이브리지 위에서 벌어지는 류우리의 헬리콥터 저격 시도를 저지한다(작품 설정).", important:true, locId:"yokohamabaybridge" },
  { year:"결말", title:"오오마에·아사기·류우리 검거", note:"오오마에는 살인과 불법 무기 데이터 밀매 혐의로, 아사기와 류우리도 각자의 역할에 따른 죄로 검거된다 — 구체적인 결말은 직접 작품을 보고 확인하세요(작품 설정).", important:true },
  { year:"에필로그", title:"치하야와 요코미조의 훈훈한 마무리", note:"치하야와 요코미조 주고 사이의 코믹하면서도 따뜻한 관계가 영화의 여운을 남기며 마무리된다(작품 설정).", important:false },
  { year:"2026-04-10", title:"일본 정식 개봉", note:"극장판 29탄으로 일본에서 정식 개봉한다(확인된 사실).", important:true },
  { year:"2026-08-12", title:"한국 정식 개봉", note:"한국에서 정식 개봉한다(확인된 사실).", important:true }
];

const PRADA2_TIMELINE = [
  { year:"뉴욕", title:"앤디, 전체 해고를 겪다", note:"저널리스트로 성장한 앤디가 시상식 도중 소속 매체 'The Vanguard' 전체가 인수·해고되는 소식을 접한다(작품 설정).", important:true, locId:"mcgrawhillbuilding" },
  { year:"뉴욕", title:"'런웨이' 스캔들 — 스웻샵 특집 논란", note:"미란다가 승인한 패스트패션 브랜드 특집 기사가 노동력 착취 논란에 휩싸이며 '런웨이'가 위기를 맞는다(작품 설정)." },
  { year:"뉴욕", title:"나이젤의 은밀한 추천", note:"나이젤이 이르브의 아들에게 앤디의 진정성 있는 연설 영상을 몰래 전달해 앤디가 채용되도록 물밑에서 움직인다(작품 설정)." },
  { year:"뉴욕", title:"앤디, 런웨이 신임 피처 에디터로 합류", note:"앤디가 '런웨이'의 신임 피처 에디터로 채용되며 미란다·나이젤과 재회하고, 이제 디올 임원이 된 에밀리와도 다시 마주친다(작품 설정)." },
  { year:"뉴욕", title:"새 어시스턴트들 — 아마리와 진", note:"미란다의 수석 조수 아마리, 앤디의 신임 조수 진이 소개되며 사무실의 새로운 세대 구도가 드러난다(작품 설정)." },
  { year:"뉴욕", title:"이르브의 75세 생일파티 — 갑작스러운 죽음", note:"자연사박물관에서 열린 생일파티 도중 회장 이르브 라비츠가 갑자기 사망한다(작품 설정).", important:true, locId:"amnh" },
  { year:"뉴욕", title:"제이 라비츠, 경영권 장악", note:"이르브의 아들 제이 라비츠가 모기업 경영권을 잡고 '런웨이'를 단기 수익을 위해 해체·매각하려 한다(작품 설정).", important:true },
  { year:"뉴욕", title:"인수 시도 — 에밀리와 벤지 반스", note:"앤디가 '런웨이'를 지키기 위해 에밀리와 그녀의 약혼자인 테크 억만장자 벤지 반스를 끌어들여 인수를 시도한다(작품 설정).", important:true },
  { year:"뉴욕", title:"에밀리의 숨은 의도가 드러나다", note:"에밀리가 인수를 이용해 미란다를 완전히 몰아내려 한다는 사실이 서서히 드러난다(작품 설정).", important:true },
  { year:"밀라노", title:"런웨이 밀라노 패션쇼", note:"주요 인물들이 밀라노로 이동해 '런웨이'의 패션쇼 행사에 참석한다(작품 설정).", important:false, locId:"breraacademy" },
  { year:"밀라노", title:"나이젤, 고국의 재발견", note:"나이젤이 이탈리아 문화·음식과 재회하며 더 많은 분량을 받는다(작품 설정)." },
  { year:"코모 호수", title:"빌라 발비아노 — 벤지의 별장", note:"벤지 반스의 코모 호수 별장에서 인수 협상을 둘러싼 갈등 장면이 펼쳐진다(작품 설정).", important:true, locId:"villabalbiano" },
  { year:"밀라노", title:"미란다와 앤디, 사샤 반스에게 손을 내밀다", note:"미란다와 앤디가 벤지의 전 연인이자 자선사업가인 사샤 반스에게 은밀히 접촉해 대안 인수를 제안한다(작품 설정).", important:true, locId:"palazzoparigi" },
  { year:"밀라노 갈라", title:"미란다, 기조연설 직전 자리를 뜨다", note:"인수 마무리를 위해 미란다가 갈라 기조연설 직전 자리를 떠나야 하는 상황에 놓인다(작품 설정).", important:true },
  { year:"밀라노 갈라", title:"나이젤, 무대에 오르다", note:"미란다가 나이젤에게 연설을 넘기고, 사실 그 연설이 나이젤이 직접 쓴 것이었음을 인정한다. 나이젤이 이탈리아어로 연설을 열어 기립박수를 받는다(작품 설정).", important:true, locId:"breraacademy" },
  { year:"결말", title:"사샤의 인수 성사 — 런웨이와 미란다를 지키다", note:"사샤 반스의 인수가 성사되며 '런웨이'는 미란다 체제 아래 살아남고, 벤지·제이의 인수 시도는 무산된다(작품 설정).", important:true },
  { year:"결말", title:"에밀리와 벤지의 결별, 앤디와의 화해", note:"벤지가 에밀리에게 이별을 통보하지만, 에밀리는 앤디와는 화해하며 마무리된다(작품 설정)." },
  { year:"결말", title:"앤디의 셀루리안 스웨터 — 원점으로", note:"영화는 앤디가 1편 첫 출근일 입었던 셀루리안 스웨터를 다시 입고, 미란다·나이젤과 함께 늦은 밤 사무실에서 일하는 장면으로 마무리된다(작품 설정).", important:true },
  { year:"2026-04-29", title:"한국 세계 최초 개봉", note:"전 세계에서 한국이 가장 먼저 정식 개봉한다(확인된 사실).", important:true },
  { year:"2026-05-01", title:"미국 정식 개봉", note:"미국에서 정식 개봉한다(확인된 사실).", important:true }
];

// 소년이 온다 — 소설 속 서사와 실제 5·18 역사를 함께 배치. 자극적 묘사 없이 사실 중심으로 서술.
const SONYEON_TIMELINE = [
  { year:"1980-05-17", title:"계엄군, 대학 캠퍼스 점령", note:"저녁부터 계엄군이 전남대·조선대 캠퍼스를 점령한다(확인된 사실).", important:false, locId:"jnu" },
  { year:"1980-05-18", title:"전남대 정문 충돌 — 항쟁의 발화점", note:"캠퍼스 봉쇄에 항의하는 학생들을 계엄군이 곤봉으로 진압하고, 부상당한 학생들이 금남로로 흩어지며 사태가 도시 전체로 번지기 시작한다(확인된 사실).", important:true, locId:"jnu" },
  { year:"1980-05-19~20", title:"시민 합류 — 항쟁의 확산", note:"학생들의 저항에 일반 시민들이 합류하며 시위 규모가 급격히 커진다(확인된 사실).", important:false },
  { year:"1980-05-20 밤", title:"광주역 인근 집단 발포", note:"계엄군의 첫 집단 발포가 광주역 부근에서 벌어진다(확인된 사실).", important:true },
  { year:"1980-05-21", title:"금남로 집단 발포", note:"금남로에서 계엄군이 시민들을 향해 집단 발포한다. 소설 속 정대가 총에 맞아 숨지는 장면의 실제 배경이다(확인된 사실).", important:true, locId:"geumnamro" },
  { year:"1980-05-21 이후", title:"시민군 조직", note:"시민들이 예비군 무기고 등에서 무기를 확보해 광주공원 등지에서 시민군을 조직한다(확인된 사실).", important:true, locId:"gwangjupark" },
  { year:"1980-05-22", title:"상무관, 합동분향소가 되다", note:"시민들이 자발적으로 시신을 수습해 상무관에 안치하고 신원 확인을 시작한다. 소설 속 동호·은숙·진수가 활동하는 무대다(확인된 사실).", important:true, locId:'sangmugwan' },
  { year:"1980-05-22~26", title:"시민 자치의 시기", note:"계엄군이 외곽으로 물러난 사이, 시민들이 도청을 중심으로 질서를 유지하며 협상을 시도한다(확인된 사실).", important:false, locId:"oldprovincialoffice" },
  { year:"1980-05-26", title:"윤상원, 외신 기자회견", note:"시민 수습대책위원회 대변인 윤상원이 외신 기자들에게 계엄군의 실상을 알린다(확인된 사실).", important:true },
  { year:"1980-05-27 새벽", title:"도청 최후 진압", note:"계엄군이 마지막 남은 시민군을 진압한다. 문재학을 비롯한 다수가 이때 목숨을 잃었고, 소설 속 동호도 이 새벽에 죽는 것으로 그려진다(확인된 사실).", important:true, locId:"oldprovincialoffice" },
  { year:"1980년 이후", title:"살아남은 이들의 시간", note:"소설 속 은숙·진수·선주는 이후 각자의 방식으로 그날의 트라우마를 짊어지고 살아간다(소설 속 설정).", important:true },
  { year:"1997", title:"국립5·18민주묘지 조성", note:"옛 망월동 묘지에서 125구의 유해가 새 국립묘지로 이장된다(확인된 사실).", important:false, locId:"national518cemetery" },
  { year:"2011", title:"5·18 기록물, 유네스코 세계기록유산 등재", note:"5·18민주화운동 관련 기록물이 유네스코 세계기록유산으로 공식 등재된다(확인된 사실).", important:false, locId:"518archives" },
  { year:"2014", title:"『소년이 온다』 출간", note:"한강이 창비를 통해 소설을 발표한다(확인된 사실).", important:true },
  { year:"2016~2017", title:"전일빌딩245, 총탄 245개 확인", note:"국립과학수사연구원 조사로 헬기 사격의 물리적 증거가 확인된다(확인된 사실).", important:true, locId:"jeonil245" },
  { year:"2024", title:"한강, 노벨문학상 수상", note:"한강이 이 소설을 포함한 작품 세계로 한국인·아시아 여성 최초로 노벨문학상을 받는다(확인된 사실).", important:true },
  { year:"2025", title:"'소년의 길·작가의 길' 공식 문학기행 시작", note:"광주시가 5·18 사적지와 한강의 유년기 동네를 잇는 공식 문학기행 코스를 운영하기 시작한다(확인된 사실).", important:true, locId:"hankangchildhood" }
];

// 검은 사제들 — 극중 서사와 실제 제작·촬영 사실을 함께 배치.
const PRIESTS_TIMELINE = [
  { year:"극중 과거", title:"김범신, 첫 구마 의식의 실패를 목격", note:"이탈리아인 스승 사제가 첫 구마 의식을 시도하다 목숨을 잃는 것을 지켜본다(작품 설정).", important:false },
  { year:"극중 과거(회상)", title:"최준호, 여동생을 잃다", note:"어린 시절 여동생의 죽음을 막지 못했다는 트라우마를 안게 된다(작품 설정).", important:false },
  { year:"극중 현재", title:"영신, 교통사고를 당하다", note:"하굣길 교통사고 후유증으로 영신이 혼수상태에 빠진다(작품 설정).", important:true },
  { year:"극중 현재", title:"영신, 창문에서 몸을 던지다", note:"입원 중이던 영신이 갑자기 병실 창문에서 뛰어내리는 이상 행동을 보인다(작품 설정).", important:true },
  { year:"극중 현재", title:"김범신, 비공식 구마 허가를 받다", note:"교단의 정식 승인 없이 주교로부터 비공식 허가만 얻어 구마 의식을 준비한다(작품 설정).", important:true },
  { year:"극중 현재", title:"최준호, 조수로 발탁되다", note:"평판이 낮은 신학생 최준호가 김범신 신부의 조수로 발탁된다(작품 설정).", important:true, locId:'keimyungdaemyeong' },
  { year:"극중 현재", title:"무속 대살굿 시도 — 실패", note:"제천 법사와 딸 영주가 먼저 전통 무속 대살굿을 시도하지만 실패로 끝난다(작품 설정).", important:false },
  { year:"극중 밤", title:"계산성당(명동성당) — 구마 의식 시작", note:"두 사제가 위험한 구마 의식을 시작한다(작품 설정).", important:true, locId:'gyesancathedral' },
  { year:"극중 밤", title:"최준호, 두려움에 도망쳤다 되돌아오다", note:"의식 도중 공포에 질려 도망쳤던 최준호가 다시 성당으로 돌아온다(작품 설정).", important:true },
  { year:"극중 밤", title:"최후의 대결", note:"악령 '말파스'와의 최후 대결이 벌어진다 — 결말은 직접 작품을 보고 확인하세요(작품 설정).", important:true },
  { year:"실제 제작", title:"2015-03-05, 촬영 시작", note:"서울·안양·대구를 오가며 본촬영이 시작된다(확인된 사실).", important:false },
  { year:"실제 제작", title:"대구 계산성당·동성로 촬영", note:"감독 장재현이 SBS뉴스 인터뷰에서 직접 밝힌 대로, 계산성당 등 대구 근대골목 일대에서 다수 장면이 촬영된다(확인된 사실).", important:true, locId:'gyesancathedral' },
  { year:"실제 제작", title:"2015-06, 촬영 종료", note:"파주에서 촬영이 마무리된다(확인된 사실).", important:false },
  { year:"2015-11-05", title:"개봉", note:"한국에서 정식 개봉해 첫 주 박스오피스 1위를 기록한다(확인된 사실).", important:true },
  { year:"2015년 12월", title:"누적 관객 544만 돌파", note:"최종 약 544만 명의 관객을 동원하며 상업적으로 크게 성공한다(확인된 사실).", important:true },
  { year:"2016년", title:"박소담, 신인상 다수 수상", note:"영신 역의 박소담이 백상예술대상 등에서 신인여우상을 받으며 주목받는다(확인된 사실).", important:false },
  { year:"2025-01-24", title:"공식 후속작 《검은 수녀들》 개봉", note:"같은 제작사(영화사 집)가 만든 후속작이 개봉하며, 최준호가 카메오로 다시 등장해 '12형상' 세계관이 이어짐을 확인시켜준다(확인된 사실).", important:true }
];

// 리틀 포레스트 — 계절의 흐름을 따라가는 극중 구성과 실제 제작·관광화 과정을 함께 배치.
const LITTLEFOREST_TIMELINE = [
  { year:"극중 겨울", title:"고향으로 돌아오다", note:"임용고시에 낙방한 혜원이 서울살이를 정리하고 고향으로 내려온다(작품 설정).", important:true, locId:'hyewonhouse' },
  { year:"극중 겨울", title:"배추국과 첫 겨울", note:"비어있던 집에서 홀로 지내며 배추국을 끓여 먹기 시작한다(작품 설정).", important:false, locId:'hyewonhouse' },
  { year:"극중 봄", title:"재하·은숙과 재회", note:"소꿉친구 재하·은숙과 다시 가까워진다(작품 설정).", important:true },
  { year:"극중 봄", title:"아카시아꽃튀김", note:"봄나물과 아카시아꽃으로 계절 요리를 해 먹는다(작품 설정).", important:false, locId:'sagokssansuyu' },
  { year:"극중 봄", title:"화본역, 재하의 이별 회상", note:"재하가 옛 여자친구를 배웅했던 화본역 플랫폼 장면이 그려진다(작품 설정).", important:false, locId:'hwabonstation' },
  { year:"극중 여름", title:"오이콩국수", note:"여름 제철 음식으로 오이콩국수를 만들어 먹는다(작품 설정).", important:false },
  { year:"극중 가을", title:"밤조림과 감 따기", note:"한밤마을에서 감을 따고, 밤조림을 만든다(작품 설정).", important:false, locId:'hanbamvillage' },
  { year:"극중 사계절 내내", title:"엄마의 기억", note:"말없이 떠난 엄마와의 기억이 요리를 통해 조금씩 되살아난다(작품 설정).", important:true },
  { year:"극중 다시 겨울", title:"삶의 방향을 되찾다", note:"한 해를 나며 혜원이 자신의 삶의 방향에 대해 결론에 다다른다 — 그 선택은 직접 작품을 보고 확인하세요(작품 설정).", important:true },
  { year:"실제 제작", title:"원작자 조건부 리메이크 허가", note:"일본 원작자 이가라시 다이스케가 '원작 훼손 금지'와 '일식 요소 포함'을 조건으로 리메이크를 허락한다(확인된 사실).", important:false },
  { year:"2017-05", title:"의성 사곡면 촬영 공개", note:"오상리 마늘밭 등 봄 장면 촬영 현장이 언론에 공개된다(확인된 사실).", important:false, locId:'osangligarlic' },
  { year:"2018-02-28", title:"한국 개봉", note:"정식 개봉해 개봉 7일 만에 손익분기점을 돌파한다(확인된 사실).", important:true },
  { year:"2018년", title:"역주행 흥행 — 누적 약 151만 명", note:"낮은 하락률로 꾸준히 관객을 모으며 최종 약 151만 명을 동원한다(확인된 사실).", important:true },
  { year:"2018년", title:"'올해의 한국영화' 다수 선정", note:"여러 매체·영화제에서 그해 최고의 한국영화 중 하나로 꼽힌다(확인된 사실).", important:false },
  { year:"2023-05~06", title:"'I♥군위' 시범 투어 운영", note:"대구시·대구문화예술진흥원이 혜원의 집을 포함한 시범 투어를 운영한다(확인된 사실).", important:false, locId:'hyewonhouse' },
  { year:"2023-07", title:"군위군, 대구광역시로 편입 · '군위 시티투어' 정식 코스화", note:"군위군이 대구에 편입되며, 혜원의 집이 공식 관광 코스에 정식 포함된다(확인된 사실).", important:true, locId:'hyewonhouse' }
];

const ISATONG_TIMELINE = [
  { year:"가마쿠라", title:"스쳐 지나가는 두 사람", note:"고쿠라쿠지역에서 무희와 호진이 서로의 존재를 모른 채 스쳐 지나간다.", important:false, locId:"gokurakuji_station" },
  { year:"가마쿠라", title:"라멘집 골목의 진짜 첫 만남", note:"전 남친의 새 여친에게 따지러 뛰어든 무희가 일본어로 얼어붙자, 그 자리에 있던 호진이 통역으로 끼어든다.", important:true, locId:"tenzan_lab_ramen" },
  { year:"가마쿠라", title:"에노시마를 함께 걷다", note:"벤자이텐 나카미세 거리에서 문어전병·시라스덮밥을 나눠 먹으며 두 사람이 가까워진다.", important:false, locId:"benzaiten_nakamise" },
  { year:"가마쿠라", title:"스마트폰을 돌려주려는 추격전", note:"무희가 호진의 스마트폰을 갖고 있다는 걸 뒤늦게 깨닫고 오이와야미치 거리를 뛰어간다.", important:false, locId:"oiwayamichi_street" },
  { year:"가마쿠라", title:"도리이 앞을 지나는 에노덴", note:"고료 신사의 흰 도리이 앞으로 에노덴이 지나가는 순간, 무희가 호진에게 폰을 돌려준다 — 시리즈 최고의 명장면.", important:true, locId:"goryo_shrine" },
  { year:"가마쿠라", title:"노을 지는 벤치, 몰래 찍은 사진", note:"가타세 어항 등대에서 나란히 앉은 두 사람. 무희가 몰래 찍은 호진의 옆모습 사진이 훗날 재회의 실마리가 된다.", important:false, locId:"katase_lighthouse" },
  { year:"가마쿠라", title:"1화 클라이맥스 — 감쪽같이 사라지다", note:"하세역 건널목, 에노덴이 지나가는 짧은 순간 호진이 사라진다.", important:true, locId:"hase_crossing" },
  { year:"가마쿠라", title:"첫사랑을 찾아 헤매다", note:"호진이 씨캔들 전망대에서 오랜 짝사랑 신지선을 찾아 헤맨다.", important:false, locId:"enoshima_sea_candle" },
  { year:"캐나다", title:"'로맨틱 트립' 캘거리에서 시작", note:"무희와 히로가 데이트 예능 '로맨틱 트립' 본격 촬영을 시작한다. 호진은 무희의 통역으로 동행한다.", important:true, locId:"calgary_downtown" },
  { year:"캐나다", title:"카나나스키스, 히로를 처음 발견하다", note:"무희가 '로맨스 프린스' 히로를 이 자연보호구역에서 처음 마주친다.", important:false, locId:"kananaskis_area" },
  { year:"캐나다", title:"쿼리 호수의 첫 키스", note:"런들산맥을 배경으로 두 사람이 첫 키스를 나눈다.", important:true, locId:"quarry_lake_canmore" },
  { year:"캐나다", title:"로키산맥의 오로라", note:"밴프 국립공원 일대에서 무희와 호진이 함께 오로라를 감상한다.", important:false, locId:"canadian_rockies_aurora" },
  { year:"이탈리아", title:"피아차 델 캄포의 포옹", note:"시에나 대표 광장에서 두 사람이 서로를 끌어안는다 — 관계가 결정적으로 깊어지는 순간.", important:true, locId:"siena_piazza_del_campo" },
  { year:"이탈리아", title:"페루자 골목의 키스", note:"비아 아피아의 좁은 돌길에서 두 사람이 입을 맞춘다.", important:true, locId:"perugia_via_appia" },
  { year:"이탈리아", title:"치비타 디 바뇨레조, '로맨틱 트립' 최종 고백", note:"절벽 위 중세 마을에서 '로맨틱 트립'의 마지막을 장식하는 고백 장면이 펼쳐진다.", important:true, locId:"civita_di_bagnoregio" },
  { year:"결말부", title:"부여박물관에서의 재회", note:"마지막 화, 무희와 호진이 다시 만난다 — 이후의 선택은 직접 작품을 보고 확인하는 것을 권한다.", important:true, locId:"buyeo_national_museum" }
];


// 장소별 지역 특산물·먹거리 (여행 동기부여용, showLocation()에서 조회)
const SPECIALTIES = {
  okazaki:"핫초미소(八丁味噌) — 300년 전통 콩된장",
  matsudairago:"미카와 검은콩된장 경단, 지역 고향채소",
  sunpu_imagawa:"시즈오카 명물 우나기파이, 고급 녹차",
  kiyosu:"나고야메시 — 데바사키(닭날개튀김), 히쓰마부시",
  azuchi:"오미규(近江牛) — 시가현 대표 와규",
  hamamatsu:"하마마쓰 명물 장어덮밥, 하마마쓰 교자",
  mikatagahara:"하마마쓰 권역 — 미카타하라 감자, 차밭",
  nagashino:"신시로 명물 고헤이모치(五平餅)",
  odawara:"오다와라 카마보코(어묵), 매실장아찌",
  edo:"에도마에 스시, 몬자야키 — 도쿄 대표 먹거리",
  oyama:"오야마 우엉, 닛코 유바(두부껍질) 요리",
  sekigahara:"기후 명물 호바미소, 세키가하라 라멘",
  fushimi:"후시미 사케 — 일본 3대 니혼슈 양조 지구",
  nijo:"교토 명물 야쓰하시, 유도후(두부요리)",
  osaka:"다코야키, 오코노미야키, 쿠시카츠",
  sunpu_castle:"시즈오카 명물 우나기파이, 고급 녹차",
  kunozan:"시즈오카 이시가키 딸기(이치고)",
  nikko:"닛코 유바(두부껍질) 요리, 소바",
  kariya:"가리야 니혼슈 양조장, 미카와 우동",
  kakegawa:"가케가와 고급 녹차, 장어요리",
  kitanosho:"후쿠이 명물 에치젠 카니(대게), 오로시소바",
  honnoji:"교토 니시키시장 먹거리, 야쓰하시",
  kasugayama:"니가타 고시히카리 쌀, 명주 사케",
  aizuwakamatsu:"아이즈 기바다시소바, 아이즈 와인",
  koyasan:"고야도후(정진요리), 고마도후",
  kumamoto:"말고기 사시미(바사시), 카라시렌콘",
  fukuoka:"돈코츠라멘, 명란젓(멘타이코)",
  sendai:"규탄(소혀구이), 즌다모치",
  ueda:"신슈소바, 신슈 사과",
  seongsan_ilchulbong:"제주 감귤, 옥돔구이",
  gimnyeong_beach:"성게미역국, 갈치조림",
  hyeopjae_beach:"한치물회, 흑돼지구이",
  seopjikoji:"땅콩아이스크림, 해물라면",
  ora_buckwheat_field:"메밀국수, 오메기떡",
  gasi_canola_field:"꿩엿, 조랑말 유래 흑돼지",
  jejumok_gwana:"고기국수, 몸국",
  andong_set:"안동찜닭, 헛제사밥",
  andong_lake:"안동 간고등어, 안동소주",
  yeoncheon_set:"연천 율무 요리, 참게매운탕",
  gochang_hagwon_farm:"고창 풍천장어, 복분자",
  daegu_gyesan_set:"대구 근대골목 납작만두, 무침회",
  chilgok_gasil_cathedral:"칠곡 포도, 순대국밥",
  gwangju_theater:"광주 오리탕, 무등산 보리밥",
  jeongeup_chilbo_ms:"정읍 죽염 요리, 산채정식",
  jeonju_paldalro:"전주비빔밥, 콩나물국밥",
  jeonbuk_univ_hospital:"전주 한옥마을 길거리 간식",
  jeonnam_univ:"광주 김치찌개 백반, 떡갈비",
  jongno_joongang_hs:"서울 종로 인사동 전통 다과",
  unmunsa_temple:"청도 반시(곶감), 사찰음식",
  busan_maechukji:"부산 돼지국밥, 씨앗호떡",
  yeosu_opening:"여수 돌게장, 갓김치",
  seoul_national_univ:"서울 관악구 학생가 분식",
  cheongsim_camp:"제주 고기국수, 갈치조림",
  udo_island:"우도땅콩 아이스크림, 우도 파전",
  hamdeok_seowoobong:"흑돼지 두루치기, 자리물회",
  jeju_folk_village:"제주 전통 오메기술, 빙떡",
  jeju_oreum_trail:"제주 말고기, 청귤차",
  hida_furukawa_station:"히다규(飛騨牛) 꼬치, 사루보보 기념품",
  ketawakamiya_shrine:"인근 양조장의 명주(地酒)",
  hida_library:"히다 특산 한천(寒天) 과자",
  nakaya_ramen:"히다 다카야마식 쇼유라멘",
  ajidokoro_furukawa:"고헤이모치, 히다규 정식",
  lake_suwa:"와카사기(빙어) 튀김, 스와 명물 소바",
  route361:"온타케 방면 휴게소 명물 고로케·소바",
  shinjuku_south:"백화점 지하 디저트, 신주쿠 카레",
  shinanomachi:"인근 카페 거리 디저트",
  yotsuya_station:"요쓰야 노포 소바",
  suga_shrine:"요쓰야 상점가 다이야키(붕어빵)",
  national_art_center:"롯폰기 미술관 카페 디저트",
  hida_takayama:"히다규 스시, 다카야마 아침시장 채소절임",
  furukawa_machinami:"양조 마을 특유의 후토자케, 미소경단",
  hida_daishonyudo:"히다 지역 산나물 요리",
  aburatsu:"미야자키 명물 지도리(치킨난반), 망고",
  yawatahama:"에히메 명물 지라스동(어시장 해산물덮밥), 감귤",
  kobe_fruit_flower_park:"고베·산다 지역 과일 디저트",
  ninomiya_shopping_street:"고베 명물 소고기 스지니(牛すじ煮), 서민 이자카야 안주",
  akashi_kaikyo_bridge:"아카시 명물 다코야키(아카시야키), 성게",
  hijiribashi_ochanomizu:"간다·오차노미즈 노포 소바, 카레",
  ushigafuchi:"기타노마루 인근 화과자, 지도리가후치 벚꽃철 명물 디저트",
  ooya_kaigan:"게센누마 명물 후카히레(상어지느러미) 요리, 산리쿠 굴",
  // 태백산맥(벌교) — 소설에 직접 등장하는 사실은 아니지만, 벌교 여행의 강한 동기가 되는 지역 특산물(기획안 "음식 연결" 항목 반영).
  beolgyoeup:"벌교 꼬막 정식 — 참꼬막·벌교갯벌낙지 등 벌교 갯벌 수산물",
  jungdo_embankment:"중도방죽 인근 갯벌 꼬막·짱뚱어탕"
};

// 장소 인근의 실제로 잘 알려진 명소·포토스팟 (해시태그용 — 지명 하나만으로는 게시물이 적을 때
// 실제 존재하는 유명 스팟 이름을 함께 검색하면 훨씬 다양한 SNS 사진을 찾을 수 있음)
// 확실히 검증 가능한(널리 알려진) 스팟만 선별해 넣었고, 근거가 약한 곳은 비워둠(추측성 상호명은 넣지 않음)
const PHOTO_SPOTS = {
  okazaki:"오카자키공원벚꽃",
  kiyosu:"기요스성라이트업",
  hamamatsu:"하마마쓰성공원벚꽃",
  odawara:"오다와라성벚꽃",
  edo:"니주바시",
  nijo:"니조성가라몬",
  osaka:"오사카성야경",
  kunozan:"니혼다이라로프웨이",
  nikko:"닛코신쿄",
  aizuwakamatsu:"쓰루가성벚꽃",
  koyasan:"오쿠노인참배로",
  fukuoka:"마이즈루공원벚꽃",
  sendai:"다테마사무네동상",
  lake_suwa:"스와호불꽃축제",
  hida_takayama:"다카야마아침시장",
  furukawa_machinami:"세토가와잉어거리",
  ushigafuchi:"지도리가후치벚꽃",
  akashi_kaikyo_bridge:"마이코공원"
};

// 장소별 '기억나시나요?' 한 줄 훅 — 이미 작품을 알고 들어온 팬들이 그 장면을 바로 떠올리도록
// 상세 패널과 지도 클릭 팝업에 함께 노출된다. 사실 나열이 아니라 장면을 떠올리게 하는 문장 위주.
const SCENE_MOMENTS = {
  okazaki:"여섯 살 다케치요가 인질로 끌려가기 직전, 마지막으로 머문 고향.",
  matsudairago:"이에야스가 평생 자신의 뿌리로 여긴, 마쓰다이라 가문의 시작점.",
  sunpu_imagawa:"인질 소년이 훗날의 인내심을 벼려낸 13년의 시간이 흐른 곳.",
  kiyosu:"노부나가와 이에야스, 두 사람의 운명이 처음 엮인 회견장.",
  azuchi:"거침없는 노부나가와 신중한 이에야스, 두 기질이 나란히 선 곳.",
  hamamatsu:"성문을 활짝 열어놓고 잠든 척한 '공성계' 일화의 무대.",
  mikatagahara:"패주하던 자신의 얼굴을 그려 평생 곁에 둔, 뼈아픈 교훈의 현장.",
  nagashino:"삼단 조총 전술로 시대의 흐름이 뒤바뀐 그 벌판.",
  odawara:"익숙한 땅을 떠나 관동으로 향하게 만든 전환점.",
  edo:"허허벌판 어촌이 260년 심장부로 자라난 시작점.",
  oyama:"'누구를 따를 것인가' — 동군의 운명이 결정된 그 자리.",
  sekigahara:"천하를 가른 단 하루, 고바야카와의 배신이 전세를 뒤집은 곳.",
  fushimi:"도리이 모토타다가 마지막 술잔을 나누고 죽음을 각오한 성.",
  nijo:"노년의 이에야스가 장성한 히데요리를 마주한 회견의 무대.",
  osaka:"도요토미 가문의 마지막 숨이 다한, 대장정의 종착지.",
  sunpu_castle:"쇼군직을 물려준 뒤에도 실권을 놓지 않은 '오고쇼'의 거처.",
  kunozan:"유언에 따라 처음 잠든, 국보 사당이 남은 곳.",
  nikko:"동조대권현으로 신격화된 이에야스가 마침내 안치된 곳.",
  kariya:"어머니 오다이노카타와의 생이별이 시작된 외가.",
  kakegawa:"무력 대신 협상으로 마무리한 미카와 통일의 마지막 퍼즐.",
  kitanosho:"시바타 부부가 함께 최후를 맞은, 전국시대 비극의 현장.",
  honnoji:"노부나가 급사 소식에 목숨을 건 탈출이 시작된 곳.",
  kasugayama:"우에스기 겐신이 세력균형을 유지하며 그림자를 드리운 본거지.",
  aizuwakamatsu:"천하를 가른 전쟁의 진짜 도화선이 당겨진 곳.",
  koyasan:"후계자 히데쓰구가 할복을 명받은, 도요토미가의 비극.",
  kumamoto:"가토 기요마사가 규슈 안정에 나선 거성.",
  fukuoka:"구로다 부자의 숨은 야심이 함께 자란 규슈의 새 영지.",
  sendai:"다테 마사무네, 협력자이자 늘 경계 대상이었던 그 야심의 근거지.",
  ueda:"사나다 부자가 대군의 발을 묶어 세키가하라를 지연시킨 성.",
  nihonbashi:"여기가 '0km' 지점이라는 걸 아셨나요? 지금 서 있는 이 다리에서, 에도로 가는 모든 길이 시작됐어요.",
  hibiya_reclamation:"발밑의 이 땅, 원래는 바다였다는 사실 — 마루노우치의 고층빌딩들이 매립지 위에 서 있다는 게 믿기시나요?",
  korakuen:"이에야스가 세운 나라 위에서, 그 후손들은 이 정원을 거닐며 학문을 논했어요. 4대에 걸쳐 완성됐답니다.",
  hamarikyu:"쇼군이 오리를 사냥하던 그 자리에서, 지금은 바닷물이 드나드는 조수 연못을 산책할 수 있어요.",
  seongsan_ilchulbong:"애순이 무릎이 다 까지도록 절을 올리던 그 오름, 지금은 여행자들이 일출을 보러 오르는 곳이 됐어요.",
  gimnyeong_beach:"애순과 관식이 뛰어놀던 이 바다, 지금 가면 그때와 크게 다르지 않은 풍경을 만날 수 있어요.",
  hyeopjae_beach:"두 사람이 노을 앞에서 나눴던 그 장면, 같은 시간에 가면 정말 비슷한 하늘을 볼 수 있대요.",
  seopjikoji:"등대를 향해 나란히 걷던 그 길, 지금도 그대로 걸을 수 있어요.",
  ora_buckwheat_field:"하얀 메밀꽃 사이로 걷던 장면 기억나시나요? 방영 후 이 밭을 찾는 사람이 부쩍 늘었대요.",
  gasi_canola_field:"노란 유채꽃밭에서의 그 첫 키스, 봄이면 지금도 같은 색으로 물들어요.",
  jejumok_gwana:"옛 제주 시내를 배경으로 한 장면들, 이 관아 건물이 그 시절 분위기를 그대로 품고 있어요.",
  andong_set:"'도동리'라 불렸던 그 마을, 사실은 제주가 아니라 여기 안동에 통째로 지어졌었다는 거 알고 계셨나요?",
  andong_lake:"세트장의 인공 바다 옆, 이 진짜 호수가 화면 밖에서 조용히 함께 있었어요.",
  yeoncheon_set:"1960년대부터 2025년까지, 60년의 거리 변화가 이 부지 위에 통째로 지어졌다가 사라졌어요.",
  gochang_hagwon_farm:"다들 제주 유채꽃밭인 줄 알았던 그 첫 입맞춤, 사실은 여기 고창 학원농장 유채꽃밭이었대요.",
  daegu_gyesan_set:"어린 애순과 관식이 양배추를 팔던 그 시장, 이 성당 옆 오픈세트에서 만들어졌어요.",
  chilgok_gasil_cathedral:"1895년에 지어진 이 붉은 벽돌 성당에서, 금명의 결혼식 장면이 촬영됐어요.",
  gwangju_theater:"금명이 매표소 문을 열던 그 '깐느극장', 실은 1935년 문을 연 우리나라에서 가장 오래된 극장이에요.",
  jeongeup_chilbo_ms:"극중 학창 시절 장면이 촬영된 이 학교, 지금도 그때 그 교정 그대로예요.",
  jeonju_paldalro:"드라마 속 시가지 장면, 이 전주 거리에서 촬영됐다는 거 알고 계셨나요?",
  jeonbuk_univ_hospital:"극중 병원 장면이 촬영된 실제 병원, 여기예요.",
  jeonnam_univ:"극중 대학 시절 장면이 촬영된 캠퍼스, 지금도 학생들이 오가는 그 길이에요.",
  jongno_joongang_hs:"1908년부터 그 자리를 지켜온 이 학교가, 극중 서울 장면의 실제 배경이 됐어요.",
  unmunsa_temple:"극중 사찰 방문 장면, 천 년 넘은 이 고찰에서 촬영됐어요.",
  busan_maechukji:"19살 관식과 18살 애순이 함께 도망치던 그 골목, 지금도 그 시절 정취가 남아있어요.",
  yeosu_opening:"드라마의 첫 장면, 사실은 제주가 아니라 여수에서 촬영됐다는 걸 알고 계셨나요?",
  seoul_national_univ:"제주를 떠난 금명이 1987년 입학한 그 캠퍼스, 지금도 그대로예요.",
  cheongsim_camp:"극중 청소년들의 단체 활동 장면, 이 수련원에서 촬영됐어요.",
  udo_island:"두 사람이 자전거를 타고 한가로이 오가던 그 섬, 지금도 자전거로 한 바퀴 돌 수 있어요.",
  hamdeok_seowoobong:"바다를 바라보며 깊은 대화를 나누던 그 장면, 같은 노을을 보러 지금도 사람들이 찾아와요.",
  jeju_folk_village:"1960년대 제주 마을을 재현한 이곳에서, 그 시절 분위기를 그대로 느낄 수 있어요.",
  jeju_oreum_trail:"두 사람이 나란히 걷던 완만한 오름길, 지금도 같은 능선을 따라 걸을 수 있어요.",

  hida_furukawa_station:"타키가 미츠하의 흔적을 찾아 무작정 내린, 그 역.",
  ketawakamiya_shrine:"미야미즈 신사의 모델 — 팬들이 가장 먼저 찾는 순례지.",
  hida_library:"'이토모리'라는 이름의 정체를 조사하던, 그 조용한 서가.",
  nakaya_ramen:"'이건 이토모리잖아' — 결정적 실마리가 던져진 그 가게.",
  ajidokoro_furukawa:"노포 특유의 정취, 극중 장면의 모티브가 된 정식집.",
  lake_suwa:"이토모리호의 지리적 원형으로 여겨지는 호수.",
  route361:"렌터카를 몰고 히다로 향하던, 그 로드무비의 실제 구간.",
  shinjuku_south:"타키의 일상적 도시 공간을 상징하는 번화가 풍경.",
  shinanomachi:"도쿄 파트, 조용한 이동 장면의 배경이 된 역.",
  yotsuya_station:"스가 신사와 가까운, 도쿄 파트 동선의 한 지점.",
  suga_shrine:"엔딩, 마침내 뒤돌아보며 재회하는 그 계단.",
  national_art_center:"도쿄 파트에 짧게 스친, 곡면 유리 건축의 랜드마크.",
  hida_takayama:"히다후루카와와 함께 묶이는, 에도시대 정취의 옛 거리.",
  furukawa_machinami:"잉어가 헤엄치는 수로 — 이토모리 마을 골목의 원형.",
  hida_daishonyudo:"히다 순례 동선에 함께 소개되는 자연 명소.",

  aburatsu:"등굣길, 낯선 여행자 소타와 마주치며 모든 게 시작된 항구.",
  yawatahama:"다이진을 쫓다 얼떨결에 올라탄 페리가 닿은 곳.",
  kobe_fruit_flower_park:"산속 폐유원지 — '두 번째 문'의 모델로 지목되는 곳.",
  ninomiya_shopping_street:"갈 곳 없던 스즈메가 루미와 며칠을 보낸 그 골목.",
  akashi_kaikyo_bridge:"고베를 지나 도쿄로 향하는 여정, 배경 속 거대한 다리.",
  hijiribashi_ochanomizu:"도시의 일상 위로 재난의 그림자가 겹쳐지던 다리.",
  ushigafuchi:"도쿄의 '뒷문'이 있었다고 지목되는, 고쿄를 둘러싼 해자.",
  ooya_kaigan:"잠시 비를 피해 들른 도호쿠의 해안 — 기억과 회복의 정거장."
};
