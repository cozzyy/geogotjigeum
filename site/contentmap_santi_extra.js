/* ============================================================
   삼체(三体) — 연대기(SANTI_SCENES) + 과학 노트(SCIENCE_NOTES)
   (2026-08 웹 검색으로 확인한 정보 기반: 나무위키 '삼체(소설)' 계열 문서,
   영문 위키백과, Three Body Problem Fandom Wiki)
   SANTI_SCENES.locId는 SANTI_LOCATIONS(지구 realm:"earth" 또는
   우주 realm:"space") 어느 쪽 id든 참조 가능 — 지구 항목은 메인 지도로,
   우주 항목은 별도 '우주 지도' 페이지로 연결된다.
   결말과 직결되는 세부 설정은 스포일러 완화를 위해 일부 압축해 서술.
   ============================================================ */

const SANTI_SCENES = [
 {year:"1967", title:"예저타이의 죽음", note:"문화대혁명의 투쟁대회에서 물리학자 예저타이가 홍위병들에게 맞아 죽는다. 딸 예원제가 인류 문명 자체에 대한 신뢰를 잃는 결정적 계기가 된다.", important:true, locId:"tsinghua_university"},
 {year:"1969", title:"홍안기지 배치", note:"예원제가 대흥안령 산맥 깊숙한 곳의 비밀 군사기지 '홍안기지'로 보내져 전파천문학 임무에 투입된다.", important:false, locId:"mohe_greater_khingan"},
 {year:"1971", title:"태양 증폭 원리의 발견", note:"예원제가 태양이 전파를 증폭·반사하는 매질로 쓰일 수 있음을 알아내, 홍안기지 송신기의 출력을 인류 최초로 항성간 통신이 가능한 수준까지 끌어올린다.", important:true, locId:"mohe_greater_khingan"},
 {year:"1977", title:"삼체 문명의 첫 응답", note:"8년 뒤, 신호를 수신한 삼체 문명의 한 평화주의자로부터 답장이 도착한다 — '답장하지 마라, 너희 좌표가 알려지면 침략당한다.'", important:true, locId:"mohe_greater_khingan"},
 {year:"1979", title:"예원제의 선택", note:"경고를 무시한 예원제가 다시 응답을 송신한다. 이 한 번의 선택이 삼체 문명의 지구 침공을 촉발하는 '원죄'가 된다.", important:true, locId:"mohe_greater_khingan"},
 {year:"현재", title:"물리학자들의 연쇄 자살", note:"전 세계 최고 물리학자들이 '물리학은 존재하지 않는다'는 말을 남기고 잇따라 스스로 목숨을 끊기 시작한다.", important:false, locId:"beijing_city"},
 {year:"현재", title:"나노소재 연구자 왕먀오", note:"나노기술 연구자 왕먀오가 기이한 사건들에 휘말리며, 미스터리한 VR게임 '삼체'에 접속하게 된다.", important:false, locId:"beijing_city"},
 {year:"현재", title:"VR게임 속 삼체 문명", note:"게임 속에서 왕먀오는 태양이 셋인 불안정한 세계 — 안정기와 난세기를 오가며 몇 번이고 문명을 잃는 삼체 행성의 모습을 목격한다.", important:true, locId:"trisolaris"},
 {year:"현재", title:"지구삼체운동(ETO) 발각", note:"예원제가 정신적 지주로 있는 지구삼체운동(ETO)의 존재와, 강림파·구원파·생존파로 갈라진 내부 분파가 모두 드러난다.", important:true, locId:null},
 {year:"현재", title:"우청 작전 — 파나마 운하", note:"나노섬유 '비검'을 이용해, ETO의 핵심 기밀이 담긴 선박 '심판일호'를 파나마 운하 갈라드 컷 구간에서 통째로 절단한다.", important:true, locId:"panama_canal"},
 {year:"현재", title:"지자(智子) 공개", note:"삼체 문명이 지구로 미리 보낸 양성자 크기의 컴퓨터 '지자'의 존재가 밝혀지고, 인류의 시야에 '너희는 벌레다'라는 문구가 나타난다.", important:true, locId:null},
 {year:"위기 원년", title:"면벽 프로젝트 시작", note:"지자가 인간의 생각만은 읽을 수 없다는 점에 착안해, UN이 네 명의 '면벽자'에게 진실을 밝히지 않은 채 전권과 자원을 부여한다.", important:true, locId:"un_headquarters_nyc"},
 {year:"위기 초기", title:"타일러의 '양자 유령' 함대", note:"면벽자 프레더릭 타일러의 함대 계획이 파벽자에게 간파되어 무력화되고, 그는 스스로 목숨을 끊는다.", important:false, locId:"washington_dc"},
 {year:"위기 초기", title:"레이디아즈의 수성 협박", note:"면벽자 레이디아즈가 수성에 핵폭탄을 심어 태양계 공멸을 협박하는 계획을 세우지만 발각되어 처형당한다.", important:false, locId:"caracas_venezuela"},
 {year:"위기 초기", title:"하인즈의 정신 각인", note:"면벽자 하인즈가 실은 인류에게 패배주의를 심는 비밀 '정신 각인' 프로젝트를 진행해왔다는 사실이 드러난다.", important:false, locId:"brussels_belgium"},
 {year:"위기 중기", title:"뤄지의 저주 — 187J3X1", note:"마지막 면벽자 뤄지가 예원제에게 배운 우주사회학 공리를 이용해, 항성 187J3X1의 좌표를 우주 전체에 방송하는 '저주'를 시연한다.", important:true, locId:"star_187j3x1"},
 {year:"위기 중기", title:"장베이하이의 선택", note:"우주함대파 장베이하이가 인류 문명의 장기 생존을 위해 추진 방식 논쟁의 방향을 은밀히 비틀며, 함대의 미래를 바꿔놓는다.", important:false, locId:"jiuquan_satellite_launch_center"},
 {year:"위기 종식(+185년)", title:"뤄지, 185년 후 깨어나다", note:"동면에서 깨어난 뤄지가 '승리가 확실하다'는 낙관에 휩싸인, 몰라볼 만큼 달라진 미래의 지구를 마주한다.", important:false, locId:"earth_home"},
 {year:"위기 종식", title:"물방울의 도착", note:"삼체 함대의 정찰 프로브 '물방울'이 태양계에 도착하고, 인류는 목성 궤도 인근에 2,000척의 함대를 모아 환영 사열을 준비한다.", important:true, locId:"jupiter"},
 {year:"위기 종식", title:"함대의 전멸", note:"완벽한 표면을 가진 작은 물방울 하나가 단 몇 분 만에 2,000척의 인류 함대 전체를 파괴한다 — 삼부작에서 가장 널리 회자되는 장면.", important:true, locId:"jupiter"},
 {year:"위기 종식", title:"암흑의 숲, 함대 간 살육", note:"살아남은 소수의 함선이 도주하며, 부족한 자원을 두고 서로를 공격하는 '암흑의 숲' 생존 논리가 함대 내부에서 그대로 재현된다.", important:true, locId:"natural_selection"},
 {year:"위기 종식", title:"187J3X1의 소멸 확인", note:"뤄지가 저주를 내렸던 항성 187J3X1이 실제로 파괴된 사실이 관측되며, 암흑숲 이론과 뤄지의 위협 능력이 증명된다.", important:true, locId:"star_187j3x1"},
 {year:"위기 종식", title:"눈 계획(雪计划)", note:"해왕성 궤도 인근에 유증기(油膜)를 살포해, 보이지 않는 물방울 탐사선들의 이동 경로를 시각화하는 '눈 계획'이 실행된다.", important:false, locId:"neptune"},
 {year:"억지의 시대", title:"뤄지의 무덤가 대치", note:"뤄지가 자신의 무덤 앞에서 삼체 함대와 최후의 억지력 대치를 벌이며 2부가 마무리된다.", important:true, locId:"earth_home"},
 {year:"억지의 시대", title:"계단 계획", note:"우주비행공학자 청신이 죽어가는 윈톈밍의 뇌만을 광속 근접 우주선에 실어 삼체 함대 쪽으로 보내는 '계단 계획'을 제안한다.", important:true, locId:"jiuquan_satellite_launch_center"},
 {year:"억지의 시대", title:"청신, 두 번째 검잡이가 되다", note:"청신이 뤄지에 이어 두 번째 '검잡이'가 되지만, 결정적 순간의 망설임으로 억지 시스템이 무력화되고 지구의 방어선이 무너진다.", important:true, locId:"earth_home"},
 {year:"침공 재개", title:"중력파 좌표 방송", note:"함선 그래비티호와 블루스페이스호가 삼체 행성계의 좌표를 우주 전체에 중력파로 방송해 보복하고, 삼체 함대는 지구 침공을 포기한 채 퇴각한다.", important:true, locId:"gravitational_wave_broadcast_event"},
 {year:"삼체 문명 소멸", title:"삼체 행성계의 파괴", note:"좌표가 공개된 삼체 행성계가 정체불명의 제3의 문명에 의해 파괴되며, 삼체 문명 자체가 소멸한다.", important:true, locId:"trisolaris"},
 {year:"이차원화", title:"태양계의 2차원화 공격", note:"고차원 문명의 무기 '이향박'이 태양계 전체를 3차원에서 2차원 '그림'으로 붕괴시킨다 — 삼부작 최대 규모의 재난 장면.", important:true, locId:"dimensional_collapse"},
 {year:"탈출", title:"광속 우주선의 탈출", note:"청신과 AA가 인류에게 남은 유일한 광속 근접 우주선 블루스페이스호(파생함)를 타고 붕괴하는 태양계를 탈출한다.", important:true, locId:"blue_space"},
 {year:"탈출 이후", title:"명왕성에서의 재회", note:"탈출 직전, 청신이 명왕성에서 노년의 뤄지와 마지막으로 재회한다.", important:false, locId:"pluto"},
 {year:"성간 여행", title:"DX3906 항성계 도착", note:"청신과 AA가 윈톈밍이 생전에 청신에게 선물했던 별, DX3906 항성계에 도착해 그래비티호의 생존자 관이판과 조우한다.", important:false, locId:"dx3906_system"},
 {year:"성간 여행", title:"흑역(黑域)의 발견", note:"DX3906 항성계를 집어삼키는 저광속 요새 '흑역'이 확장하고 있음을 발견한다 — 스스로를 가두어 공격 의도가 없음을 증명하는 방어 기술.", important:true, locId:"black_domain"},
 {year:"흑역 안에서", title:"1800만 년의 시간차", note:"흑역 안에서 단 몇 주를 보내는 사이, 바깥 우주에서는 약 1800만 년이 흘러버린 사실을 깨닫는다.", important:true, locId:"black_domain"},
 {year:"결말부", title:"소우주 647호의 선물", note:"윈톈밍이 남긴 마지막 선물 — 독립된 '소우주(포켓 유니버스) 647호'를 통해 청신과 다시 만난다.", important:true, locId:"universe_647"},
 {year:"결말부", title:"질량 회귀 결정", note:"우주 전체의 질량 결손 문제를 두고, 소우주에 남을지 질량을 대우주로 되돌려보낼지를 선택해야 하는 순간이 삼부작을 마무리짓는다.", important:true, locId:"universe_647"}
];

/* 물리학·천문학 개념 해설 — showLocation()에서 loc.scienceNoteId로 조회해 "🔬 과학 노트" 박스로 표시 */
const SCIENCE_NOTES = {
  three_body_problem: {
    title:"삼체문제란?", title_en:"What is the Three-Body Problem?",
    body:"서로의 중력에 영향을 미치는 세 천체의 운동을 예측하는 문제로, 두 천체(이체문제)와 달리 일반적인 해석해가 존재하지 않는 대표적인 카오스계다. 소설 속 삼체 행성은 실제 알파centauri처럼 안정된 쌍성이 아니라, 세 개의 태양이 뒤섞여 도는 가상의 혼돈계로 그려지며, 이 때문에 삼체 문명은 예측 불가능한 '안정기'와 '난세기'를 반복하며 문명을 몇 번이고 잃는다.",
    body_en:"Predicting the motion of three mutually gravitating bodies has no general closed-form solution, unlike the two-body problem — it's a classic chaotic system. The novel's Trisolaris orbits a fictionalized, genuinely chaotic triple-star system (unlike the real Alpha Centauri, which is a stable binary with a distant third star), forcing Trisolaran civilization through unpredictable cycles of 'Stable Eras' and civilization-ending 'Chaotic Eras.'"
  },
  sophons: {
    title:"지자(智子)란?", title_en:"What are Sophons?",
    body:"삼체 문명이 양성자 하나를 11차원에서 2차원으로 펼쳐 그 위에 초거대 집적회로를 새긴 뒤 다시 접어 만든 초소형 슈퍼컴퓨터. 지구로 보내져 입자가속기 실험을 방해하고 인류를 감시하지만, 인간의 '생각' 자체는 읽지 못한다는 설정이 면벽 프로젝트의 근거가 된다.",
    body_en:"A microscopic supercomputer created by unfolding a single proton from 11 dimensions into 2D, etching a vast integrated circuit on its expanded surface, then refolding it. Sent to Earth, sophons jam particle accelerators and conduct blanket surveillance — but famously cannot read human thoughts, which is the entire premise behind the Wallfacer Project."
  },
  quantum_entanglement: {
    title:"양자얽힘 통신", title_en:"Quantum-Entangled Communication",
    body:"쌍을 이루는 지자끼리는 거리에 상관없이 양자적으로 얽혀 있어, 삼체 문명은 4.2광년 떨어진 지구의 상황을 실시간으로 받아본다. 실제 양자얽힘은 정보를 초광속으로 전달할 수 없다는 것이 현재 물리학의 정설이라, 이 설정은 소설적 허용에 해당한다.",
    body_en:"Entangled sophon pairs let Trisolaris receive real-time data from Earth, 4.2 light-years away, instantly. In real physics, quantum entanglement cannot actually be used to transmit information faster than light — this is one of the novel's deliberate scientific liberties."
  },
  dark_forest: {
    title:"암흑숲 이론", title_en:"The Dark Forest Theory",
    body:"뤄지가 제시한, 페르미 역설에 대한 소설의 답. 모든 문명은 어두운 숲 속의 사냥꾼과 같아서, 상대의 의도를 확인할 방법이 없는 '의심의 사슬'과 문명이 순식간에 강해질 수 있는 '기술 폭발' 가능성 때문에, 다른 문명을 발견하는 즉시 침묵 속에서 파괴하는 것이 유일한 합리적 선택이라는 이론이다.",
    body_en:"Luo Ji's game-theoretic answer to the Fermi Paradox: every civilization is a hidden hunter in a dark forest. Because intent can never be verified across interstellar distances (the 'chain of suspicion') and any civilization might suddenly undergo a 'technological explosion,' the only rational move upon detecting another civilization is to silently destroy it first."
  },
  wallfacer_program: {
    title:"면벽 프로젝트", title_en:"The Wallfacer Program",
    body:"지자가 인간의 생각을 읽을 수 없다는 데 착안해, UN이 네 명의 개인에게 계획을 설명하지 않은 채 절대적 권한과 자원을 주고 각자 머릿속으로만 인류 방어 전략을 구상하게 한 프로젝트. 삼체 진영은 이에 맞서 각 면벽자의 의도를 추리해 폭로하는 인간 '파벽자'를 내세운다.",
    body_en:"Since sophons can't read minds, the UN grants four individuals total secrecy and near-unlimited resources to devise anti-invasion strategies purely inside their own heads. Trisolaris counters with human 'Wallbreakers' who try to infer and expose each Wallfacer's real plan."
  },
  curvature_drive: {
    title:"곡률 추진(광속 우주선)", title_en:"Curvature Propulsion (Lightspeed Ships)",
    body:"연료를 분사하는 대신 우주 공간 자체를 왜곡해 나아가는 추진 개념으로, 이론상 광속에 근접한 속도를 낼 수 있다. 다만 그 항적이 지나간 자리의 빛의 속도를 영구히 낮춰버린다는 설정이 있어, 추진 기술이자 동시에 우주적 규모의 무기가 된다. 실제로는 앨퀴비어 드라이브 같은 이론적 워프 추진 개념에서 착안한 설정이다.",
    body_en:"A propulsion concept that warps space itself rather than expelling reaction mass, theoretically reaching near-lightspeed — but its 'wake' permanently lowers the local speed of light, making it both a propulsion technology and a cosmic-scale weapon. It's loosely inspired by real theoretical warp-drive concepts like the Alcubierre drive."
  },
  black_domain: {
    title:"흑역(黑域) 계획", title_en:"The Black Domain Project",
    body:"특정 우주 영역의 빛의 속도를 인위적으로 낮춰, 그 안에 있는 문명이 결코 밖으로 빠져나가 다른 문명을 위협할 수 없음을 스스로 증명하는 방어 기법. 공격 의도가 없다는 신호를 우주 전체에 보내는 셈이지만, 대신 그 안에 갇힌 존재는 사실상 우주로부터 격리된다.",
    body_en:"A defensive technique that artificially lowers the speed of light within a region of space, proving to the rest of the universe that nothing inside can ever escape to threaten others. It broadcasts harmlessness — at the cost of permanently isolating everything trapped inside from the wider cosmos."
  },
  dimensional_collapse: {
    title:"이차원화 공격(이향박)", title_en:"Dimensional Collapse (the 'Dual Vector Foil')",
    body:"고차원 문명이 사용하는 궁극의 무기로, 3차원 공간을 그대로 2차원으로 붕괴시켜버린다. 태양계 전체가 거대한 '그림'처럼 평면화되는 장면으로 묘사되며, 인류가 마주하는 가장 압도적인 규모의 재난이다.",
    body_en:"The ultimate weapon of a higher-dimensional civilization: it collapses three-dimensional space itself down into two dimensions. Depicted as the entire solar system flattening into a vast painting-like plane, it's the most overwhelming-scale disaster the story presents."
  },
  gravitational_wave_broadcast: {
    title:"중력파 발사", title_en:"Gravitational-Wave Broadcasting",
    body:"전파와 달리 차단하거나 가릴 수 없는 중력파를 이용해 우주 전체에 메시지(예: 좌표)를 방송하는 방법. 삼체 문명에 대한 '검잡이(스워드홀더)' 억지 체계의 핵심 수단으로, 실제로 2015년 라이고(LIGO)가 사상 최초로 중력파를 직접 관측하는 데 성공한 실제 물리 현상에 기반한 설정이다.",
    body_en:"Unlike radio waves, gravitational waves can't be blocked or shielded — making them the ultimate way to broadcast a message (like coordinates) across the universe. This underpins the 'Swordholder' deterrence system, and is grounded in real physics: LIGO made the first-ever direct detection of gravitational waves in 2015."
  },
  hibernation_relativity: {
    title:"동면과 상대론적 시간지연", title_en:"Hibernation & Relativistic Time Dilation",
    body:"여러 인물이 장기 동면으로 수백 년을 건너뛰거나, 광속에 가까운 우주선을 타고 이동하며 자신은 몇 주만 경험하는 사이 바깥에서는 수백만 년이 흐르는 상대론적 시간지연을 겪는다. 실제 특수상대성이론이 예측하는 현상을 극단적으로 확장해, 이야기가 수백 년에서 수천만 년 규모의 시간을 건너뛰는 장치로 활용한다.",
    body_en:"Multiple characters skip centuries via medical hibernation, or experience real relativistic time dilation aboard near-lightspeed ships — living through mere weeks while millions of years pass outside. This extrapolates real special-relativity effects to an extreme, letting the story leap across timescales from centuries to tens of millions of years."
  }
};
