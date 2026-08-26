// 작품별 정적 SEO 페이지 생성기 — 2026-08 2단계 4-4·4-5: ko/en/ja 다국어 대응 전면 재작성
//
// 무엇이 바뀌었나 (V2 기획안 0-2절 지적사항 반영):
//   - 이전에는 한국어 32개 페이지만 생성했다. 이제 로케일 축을 추가해
//       ko → works/{id}/            (32개, 기존 URL 그대로 유지 — 301/404 새로 발생 없음)
//       en → en/works/{id}/         (32개 — description_en 커버리지가 사실상 전작품이라 전체 생성)
//       ja → ja/works/{id}/         (title_ja 보유 작품만 — 현재 대표작 7편. '반쪽 번역' 페이지를
//                                    만들지 않기 위해 번역 완료 작품만 생성. app.js workHubPath()와 동일 조건)
//   - 언어별 self-canonical + 상호 hreflang(+x-default=ko)을 각 페이지 head에 삽입 (기존 0건 → 신규 구축)
//   - sitemap.xml도 이 생성기가 함께 재생성한다 (홈 3개 언어 + about/contact + 전체 언어별 작품 페이지)
//
// 입력: /tmp/seowork/works_dump.json (jsdom으로 WORKS/DATA를 평탄화한 스냅샷 — _en/_ja 필드 포함)
// 실행: node generate_work_pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 2026-08 문화 콘텐츠("작품 속 진짜 한국") 크로스링크 — 작품 허브 페이지에서 관련 문화 주제로
// 연결한다. ko/en 페이지에만 노출(문화 콘텐츠 자체가 ko/en만 존재, ja/zh 미번역).
// vm.runInContext는 top-level const를 sandbox 객체 프로퍼티로 자동 반영하지 않으므로
// 반드시 두 번째 vm.runInContext 호출로 명시적으로 꺼내야 한다 (이 프로젝트에서 반복되는 함정).
let CULTURE_TOPICS = [];
try {
  const cultureSandbox = {};
  vm.createContext(cultureSandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'contentmap_culture.js'), 'utf8'), cultureSandbox, { filename: 'contentmap_culture.js' });
  CULTURE_TOPICS = vm.runInContext('CULTURE_TOPICS', cultureSandbox) || [];
} catch (e) {
  console.error('CULTURE_TOPICS load failed (culture cross-links will be skipped):', e.message);
}
const CULTURE_BY_WORK = {};
CULTURE_TOPICS.forEach(topic => {
  (topic.relatedWorkIds || []).forEach(wid => {
    if (!CULTURE_BY_WORK[wid]) CULTURE_BY_WORK[wid] = [];
    CULTURE_BY_WORK[wid].push(topic);
  });
});

// 2026-08 추가: 후킹페이지 중간 삽입용 "새" 이미지(히어로 이미지 재사용이 아닌 별도 사진) —
// 작품별로 최대 2장. 사용자가 "대문 사진과 중간 사진이 같으면 수정한 보람이 없다"고 지적한 것에 대한
// 대응. 이 세션은 네트워크 아웃바운드가 화이트리스트로 제한돼 있어 각 URL을 curl/HTTP로 직접
// 검증할 수 없었다 — 대신 검색엔진 색인에 걸린 파일의 실제 픽셀 크기·용량·라이선스 메타데이터를
// 교차 확인하는 방식으로 조사했다(순수 추측 금지 원칙은 지킴). 목록에 없는 작품은 기존처럼
// heroImage를 재사용한다(2건 반복 위험보다 이미지 없음을 택하지 않기 위한 절충).
const HOOK_IMAGES = (() => {
  try { return require('./hook_images_extra.json'); } catch (e) { return {}; }
})();

const SITE_ORIGIN = 'https://geugotjigeum.com';
const NAVER_VERIFY = '0512374962f5ac8a38d912a2c512eb5b603c9410';
const GA_ID = 'G-H2KNQYH97M';
const TODAY = '2026-08-11';

const works = JSON.parse(fs.readFileSync('/tmp/seowork/works_dump.json', 'utf8'));

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const TIER_COLOR = { official:'#3ac07c', experience:'#3a7ce0', theme:'#c9a227', direct:'#8a8fa3' };
function hexToRgba(hex, a){
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substring(0,2),16)},${parseInt(h.substring(2,4),16)},${parseInt(h.substring(4,6),16)},${a})`;
}

const BRAND_LOGO_SVG = `<svg class="brand-logo" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e0603a"/>
          <stop offset="100%" stop-color="#3a7ce0"/>
        </linearGradient>
      </defs>
      <path d="M20 3c-7.7 0-14 6.3-14 14 0 10.5 14 20 14 20s14-9.5 14-20c0-7.7-6.3-14-14-14z" fill="url(#brandGrad)"/>
      <circle cx="20" cy="17" r="6.5" fill="#12141a"/>
      <path d="M14.2 19.8 C14.2 16.8 17.2 16.1 20 17.4 C22.8 16.1 25.8 16.8 25.8 19.8 C25.8 19.8 22.8 18.2 20 19.3 C17.2 18.2 14.2 19.8 14.2 19.8 Z" fill="#eef1f5"/>
      <path d="M20 17.2 C20.4 15 19.2 13 20.4 11.2" stroke="#eef1f5" stroke-width="1.2" stroke-dasharray="1.3 1.6" stroke-linecap="round" fill="none"/>
      <circle cx="20.6" cy="10.6" r="1.05" fill="#eef1f5"/>
    </svg>`;

/* ---------- 한국어 SEO 메타 (기존 그대로 유지 — ko URL·문구 무변경 원칙) ---------- */
/* 2026-08 GSC 분석 대응 — 1순위(한국어 강세 지역 밀어주기): 실제 클릭이 나오는 국내 배경 작품들의
   타이틀/설명에 '지역명 + 실제 위치/가는 법'을 명시적으로 넣어 "OO 촬영지 가는법" 류 롱테일
   검색어와의 관련성을 높였다. 새로 지어낸 장소는 없고, 전부 각 작품 locations 데이터에 이미
   있는 실제 지명만 사용했다([[geugotjigeum_factual_accuracy]] 원칙 준수). */
const SEO_OVERRIDE = {
  poksshak: { title: '폭싹 속았수다 제주 촬영지 실제 위치와 가는 법 | 그곳, 지금', description: '폭싹 속았수다 촬영지 제주 성산일출봉, 협재해수욕장, 새별오름 등 실제 위치와 가는 법을 지도에서 확인하세요.' },
  squidgame: { title: '오징어 게임 촬영지 서울 도봉구 쌍문동 실제 위치 | 그곳, 지금', description: '오징어 게임 기훈의 동네로 나온 서울 도봉구 쌍문동, 인천 월미도 등 실제 촬영지 위치와 가는 법을 지도에서 확인하세요.' },
  kdemonhunters: { title: '케이팝 데몬 헌터스 서울 명소 실제 위치와 가는 법 | 그곳, 지금', description: '케이팝 데몬 헌터스에 나온 N서울타워, 북촌한옥마을, 경복궁 등 서울 명소의 실제 위치와 가는 법을 지도에서 확인하세요.' },
  daemang: { title: '대망 소설 일본 배경지와 역사 여행 지도 | 그곳, 지금', description: '소설 대망과 도쿠가와 이에야스의 역사에 연결된 일본의 실제 장소를 지도에서 확인하세요.' }
};
const SEO_GENERATED = {
  kiminonawa: { title: '너의 이름은 성지순례지와 실제 배경 지도 | 그곳, 지금', description: '너의 이름은에 나온 실제 배경과 성지순례지를 지도에서 확인하세요.' },
  suzume: { title: '스즈메의 문단속 성지순례지와 실제 배경 지도 | 그곳, 지금', description: '스즈메의 문단속에 나온 실제 배경과 성지순례지를 지도에서 확인하세요.' },
  santi: { title: '삼체 촬영지와 실제 배경 지도 | 그곳, 지금', description: '삼체에 등장하는 실제 촬영지와 배경 장소를 지도에서 확인하세요.' },
  breakingbad: { title: '브레이킹 배드 앨버커키 촬영지 지도 | 그곳, 지금', description: '브레이킹 배드의 실제 촬영지와 배경이 된 앨버커키의 장소를 지도에서 확인하세요.' },
  harrypotter: { title: '해리 포터 영국 촬영지와 실제 장소 지도 | 그곳, 지금', description: '해리 포터 시리즈의 영국 촬영지와 작품 속 실제 장소를 지도에서 확인하세요.' },
  gameofthrones: { title: '왕좌의 게임 촬영지와 실제 장소 지도 | 그곳, 지금', description: '왕좌의 게임의 실제 촬영지와 작품 속 배경 장소를 지도에서 확인하세요.' },
  wednesday: { title: '웬즈데이 루마니아 촬영지 지도 | 그곳, 지금', description: '웬즈데이의 실제 촬영지인 루마니아와 아일랜드의 장소를 지도에서 확인하세요.' },
  strangerthings: { title: '기묘한 이야기 촬영지와 실제 장소 지도 | 그곳, 지금', description: '기묘한 이야기의 실제 촬영지와 작품 속 배경 장소를 지도에서 확인하세요.' },
  emilyinparis: { title: '에밀리, 파리에 가다 파리 촬영지 지도 | 그곳, 지금', description: '에밀리, 파리에 가다의 파리 촬영지와 실제 장소를 지도에서 확인하세요.' },
  bridgerton: { title: '브리저튼 촬영지와 실제 장소 지도 | 그곳, 지금', description: '브리저튼의 실제 촬영지와 작품 속 배경 장소를 지도에서 확인하세요.' },
  lotr: { title: '반지의 제왕 뉴질랜드 촬영지 지도 | 그곳, 지금', description: '반지의 제왕의 실제 촬영지인 뉴질랜드의 장소를 지도에서 확인하세요.' },
  moneyheist: { title: '종이의 집 마드리드 촬영지 지도 | 그곳, 지금', description: '종이의 집의 실제 촬영지인 마드리드의 장소를 지도에서 확인하세요.' },
  onepiece: { title: '원피스 실제 모티브 장소 지도 | 그곳, 지금', description: '원피스 세계관에 영감을 준 실제 장소와 배경을 지도에서 확인하세요.' },
  jikji: { title: '직지 청주 배경지와 유럽 여행 지도 | 그곳, 지금', description: '소설 직지의 배경이 된 청주와 유럽의 실제 장소를 지도에서 확인하세요.' },
  glory: { title: '더 글로리 촬영지 청주 중앙공원·용화사 실제 위치 | 그곳, 지금', description: '더 글로리의 실제 촬영지 청주 중앙공원, 용화사 등 실제 위치와 가는 법을 지도에서 확인하세요.' },
  woo: { title: '이상한 변호사 우영우 촬영지 수원 행궁동 실제 위치 | 그곳, 지금', description: '이상한 변호사 우영우 촬영지 수원 행궁동, 카자구루마 등 실제 위치와 가는 법을 지도에서 확인하세요.' },
  taebaek: { title: '태백산맥 벌교 배경지와 역사 여행 지도 | 그곳, 지금', description: '소설 태백산맥의 무대인 벌교와 여수·순천의 실제 장소를 지도에서 확인하세요.' },
  sunshine: { title: '미스터 션샤인 촬영지 서울 경복궁·덕수궁 실제 위치 | 그곳, 지금', description: '미스터 션샤인의 촬영지 서울 경복궁, 덕수궁 등 대한제국 시기 실제 역사 장소와 가는 법을 지도에서 확인하세요.' },
  pachinko: { title: '파친코 부산 영도·오사카 실제 장소 지도 | 그곳, 지금', description: '파친코(Apple TV+)의 배경인 부산 영도와 오사카 이쿠노, 도쿄의 실제 장소를 지도에서 확인하세요.' },
  namiya: { title: '히가시노 게이고 추모 특집 — 나미야 잡화점의 기적 실제 장소 지도 | 그곳, 지금', description: '2026년 별세한 히가시노 게이고를 추모하며, 나미야 잡화점의 기적 영화 촬영지와 작가의 실제 발자취를 지도에서 확인하세요.' },
  suspectx: { title: '히가시노 게이고 추모 특집 — 용의자 X의 헌신 도쿄 실제 장소 지도 | 그곳, 지금', description: '용의자 X의 헌신의 실제 배경인 도쿄 고토구 신오하시·청주교·기요스미 정원을 지도에서 확인하세요. 히가시노 게이고 추모 특집.' },
  byakuya: { title: '히가시노 게이고 추모 특집 — 백야행 오사카 실제 장소 지도 | 그곳, 지금', description: '백야행의 실제 배경인 오사카 후세 상점가와 19년에 걸친 두 사람의 이야기를 지도에서 확인하세요. 히가시노 게이고 추모 특집.' },
  kimetsu: { title: '귀멸의 칼날 실제 성지순례지 지도 — 카마도 신사·치치부 철도 | 그곳, 지금', description: '귀멸의 칼날 속 다이쇼시대 배경과 이름이 겹치는 실존 명소(다자이후 카마도 신사), 제작진이 참고한 실제 모티브(치치부 철도, 교토 철도박물관)를 지도에서 확인하세요.' },
  hope: { title: '영화 호프 실제 촬영지 지도 — 해남 남창리 영화의 거리 | 그곳, 지금', description: '나홍진 감독 영화 호프의 실제 촬영지 전남 해남군 남창리 영화의 거리, 루마니아 카르파티아 숲 촬영지를 지도에서 확인하세요. 명량대첩 현장 울돌목 연계 코스도 함께.' },
  odyssey: { title: '영화 오디세이 실제 촬영지 지도 — 시칠리아·모로코·그리스 신화 여행 | 그곳, 지금', description: '크리스토퍼 놀란 감독 영화 오디세이의 실제 촬영지(이탈리아 시칠리아 파비냐나, 모로코 아이트 벤하두, 그리스 펠로폰네소스, 스코틀랜드, 아이슬란드)와 실제 그리스 신화 속 지명(이타카, 트로이, 필로스, 미케네)을 지도에서 확인하세요.' },
  dokkaebi: { title: '드라마 도깨비 실제 촬영지 지도 — 강릉 주문진·캐나다 퀘벡 | 그곳, 지금', description: 'tvN 드라마 도깨비의 실제 촬영지 강릉 주문진 해변·방사제, 캐나다 퀘벡시티 도깨비 빨간문·페어몬트 프롱트낙 호텔, 서울 덕수궁 돌담길·중앙고등학교까지 71곳을 지도에서 확인하세요.' },
  gwandong: { title: '관동별곡 관동팔경 실제 위치 지도 — 경포대·낙산사·죽서루 | 그곳, 지금', description: '정철의 관동별곡에 나오는 관동팔경(경포대·낙산사 의상대·죽서루·청간정·망양정·월송정)과 금강산 내금강 명소의 실제 위치를 지도에서 확인하세요.' },
  wangsanam: { title: '왕과 사는 남자 실제 장소 지도 — 영월 청령포·장릉·관풍헌 | 그곳, 지금', description: '1691만 관객 영화 왕과 사는 남자의 배경인 단종의 유배지 강원 영월 청령포·장릉·관풍헌부터 실제 촬영지 선돌마을·어라연, 서울 사육신공원·정업원까지 34곳을 지도에서 확인하세요.' },
  spiderman: { title: '스파이더맨: 홈커밍 촬영지 — 뉴욕인 줄 알았는데 애틀랜타였던 곳들 | 그곳, 지금', description: '스파이더맨: 홈커밍의 실제 촬영지 애틀랜타·뉴욕·워싱턴DC·베를린 102곳을 지도에서 확인하세요. 진짜 뉴욕 장면과 뉴욕으로 꾸며진 애틀랜타 장면을 비교해보세요.' },
  sonyeon: { title: '소년이 온다 광주 실제 장소 지도 — 소년의 길·작가의 길 | 그곳, 지금', description: '한강 노벨문학상 수상작 소년이 온다의 배경인 광주 5·18 사적지(전일빌딩245·옛 전남도청·상무관)와 작가의 길을 지도에서 확인하세요.' },
  priests: { title: '검은 사제들 촬영지 지도 — 대구 계산성당·근대골목 | 그곳, 지금', description: '영화 검은 사제들의 실제 촬영지 대구 계산성당·동성로·근대골목 일대를 지도에서 확인하세요.' },
  littleforest: { title: '리틀 포레스트 촬영지 지도 — 대구 군위 혜원의 집 | 그곳, 지금', description: '영화 리틀 포레스트의 실제 촬영지 대구 군위군 혜원의 집, 화본역, 의성 산수유마을을 지도에서 확인하세요.' },
  isatong: { title: '이 사랑 통역 되나요? 촬영지 지도 — 가마쿠라·에노시마·캐나다 로키·이탈리아 | 그곳, 지금', description: '넷플릭스 이 사랑 통역 되나요? 실제 촬영지 일본 가마쿠라·에노시마, 캐나다 앨버타 로키산맥, 이탈리아 토스카나와 해외 로케로 위장된 국내 촬영지를 지도에서 확인하세요.' },
  conanhighway: { title: '명탐정 코난: 하이웨이의 타천사 실제 배경 지도 — 요코하마·하코네 | 그곳, 지금', description: '극장판 명탐정 코난 29탄 하이웨이의 타천사의 실제 배경인 요코하마 미나토미라이와 하코네 턴파이크를 지도와 결말 스포일러 정리로 확인하세요.' },
  prada2: { title: '악마는 프라다를 입는다 2 촬영지 지도 — 뉴욕·밀라노·코모 호수 | 그곳, 지금', description: '악마는 프라다를 입는다 2의 실제 촬영지 뉴욕 맨해튼, 밀라노, 코모 호수 빌라 발비아노를 지도와 결말 스포일러 정리로 확인하세요.' },
  wintersonata: { title: '겨울연가 실제 촬영지 지도 — 남이섬·춘천·거제 외도 | 그곳, 지금', description: '한류의 출발점 겨울연가의 실제 촬영지 남이섬 가로수길, 춘천, 거제 외도를 지도에서 확인하세요. 지금은 사라진 중도유원지·준상이네 집 이야기도 함께.' },
  coffeeprince: { title: '커피프린스 1호점 촬영지 지도 — 서교동 카페·부암동 산모퉁이 | 그곳, 지금', description: '커피프린스 1호점의 실제 카페 세트가 있던 서교동과 지금도 영업 중인 부암동 산모퉁이 카페를 지도에서 확인하세요.' },
  daejanggeum: { title: '대장금 실제 촬영지 지도 — 용인대장금파크·제주민속촌·낙안읍성 | 그곳, 지금', description: '91개국에 수출된 대장금의 실제 촬영지 용인대장금파크, 제주민속촌, 낙안읍성을 지도에서 확인하세요. 폐장한 양주 원조 세트 이야기도 함께.' }
};
const SEO_META_KO = Object.assign({}, SEO_GENERATED, SEO_OVERRIDE);

/* ---------- 영문 SEO 메타 오버라이드 (2026-08 GSC 분석 대응) ----------
   문제: 이전엔 모든 en 페이지가 `${title} — Filming Locations & Real Places Map | That Place, Now`
   라는 동일한 템플릿 타이틀을 썼다. Search Console 데이터를 보면 이 페이지들(브레이킹 배드·
   기묘한 이야기·오징어 게임·스파이더맨·원피스·브리저튼 등)이 노출은 한국어 페이지 전체보다도
   많이(1,799회) 받으면서 클릭은 13회(CTR 0.72%)뿐이었고, 평균 순위가 60~90위(6~10페이지)에
   머물러 있었다 — "filming locations"라는 가장 경쟁이 심한 문구로 IMDb·Netflix 공식·대형
   여행매체와 정면으로 붙는 헤드키워드 싸움이라 신생 도메인이 이길 수 없는 구조였다.
   대응: 각 작품이 실제로 촬영된, 잘 알려지지 않은 사실(예: "뉴욕이 아니라 애틀랜타",
   "인디애나가 아니라 조지아주", "버몬트가 아니라 루마니아")을 타이틀에 넣어 경쟁이 약한
   롱테일 문구로 방향을 틀었다. 전부 이미 사이트에 확보된 실제 촬영지 데이터에 근거하며,
   지어낸 사실은 없다([[geugotjigeum_factual_accuracy]] 원칙 준수). */
const SEO_META_EN = {
  breakingbad: { title: 'Breaking Bad Filming Locations in Albuquerque You Can Actually Visit | That Place, Now', description: "Find the real Albuquerque, New Mexico locations from Breaking Bad — Walter White's house, the car wash, Los Pollos Hermanos — on an interactive map with visit tips." },
  strangerthings: { title: 'Stranger Things Was Filmed in Jackson, Georgia — Not Indiana | That Place, Now', description: "Hawkins isn't real, but the small Georgia town used to film it is. Explore the real Jackson, Georgia filming locations from Stranger Things on an interactive map." },
  squidgame: { title: "Squid Game's Real Seoul Neighborhood: Ssangmun-dong, Dobong-gu | That Place, Now", description: "Gi-hun's neighborhood in Squid Game is a real part of Seoul. Explore the actual Ssangmun-dong streets and other Squid Game filming locations on a map." },
  spiderman: { title: 'Spider-Man: Homecoming Was Filmed in Atlanta, Not New York | That Place, Now', description: "Most of Spider-Man: Homecoming's \"New York\" was actually shot in Atlanta. Compare the real NYC scenes to their Atlanta stand-ins on an interactive map." },
  onepiece: { title: 'One Piece (Netflix) Was Filmed in Cape Town, South Africa | That Place, Now', description: "Netflix's One Piece live-action series was largely shot at Cape Town Film Studios in South Africa. See the real filming locations on an interactive map." },
  bridgerton: { title: 'Bridgerton Filming Locations in London You Can Visit | That Place, Now', description: "From Ranger's House in Greenwich to other English estates, explore the real UK locations behind Bridgerton on an interactive map." },
  kiminonawa: { title: 'Your Name (Kimi no Na wa) Real Locations: Hida-Furukawa & Tokyo | That Place, Now', description: "The real town behind Itomori is Hida-Furukawa in Gifu, blended with Lake Suwa. Explore Your Name's real-life pilgrimage sites on an interactive map." },
  wednesday: { title: 'Wednesday (Netflix) Was Filmed in Romania, Not Vermont | That Place, Now', description: "Nevermore Academy isn't in New England — it's Romania. See the real Romanian (and Irish) filming locations from Netflix's Wednesday on an interactive map." },
  gameofthrones: { title: 'Game of Thrones Filming Locations in Dubrovnik & Beyond | That Place, Now', description: "King's Landing is really Dubrovnik, Croatia. Explore Game of Thrones' real filming locations across Croatia, Iceland, Spain, and Morocco on an interactive map." },
  emilyinparis: { title: 'Emily in Paris Filming Locations You Can Actually Visit | That Place, Now', description: "From Emily's apartment building to Gabriel's restaurant, find the real Paris locations from Emily in Paris on an interactive map." },
  lotr: { title: 'The Lord of the Rings Filming Locations in New Zealand | That Place, Now', description: "From Hobbiton to Mordor, see the real New Zealand locations behind The Lord of the Rings on an interactive map with visit tips." },
  sunshine: { title: 'Mr. Sunshine Filming Locations in Seoul: Gyeongbokgung & Deoksugung | That Place, Now', description: "Explore the real Seoul palace locations — Gyeongbokgung, Deoksugung — behind the Korean historical drama Mr. Sunshine on an interactive map." }
};

// 2026-08 3단계: 번체 중문(대만·홍콩) 대표작 SEO — 새로 zh 콘텐츠를 채운 6개 작품만 우선 수록.
// (오징어게임/케이팝 데몬 헌터스=최신 글로벌 히트작, 대장금/겨울연가/커피프린스=대만·홍콩에서도
// 90년대말~2000년대 한류 1세대를 함께 겪은 세대 공감대가 있는 작품, 폭싹속았수다=2025 최신 화제작)
const SEO_META_ZH = {
  squidgame: { title: '魷魚遊戲拍攝地 首爾道峰區雙門洞實際位置 | 那個地方，現在', description: '魷魚遊戲奇勳的家鄉雙門洞、仁川月尾島等實際拍攝地，在地圖上查看確切位置與交通方式。' },
  kdemonhunters: { title: 'Kpop 獵魔女團首爾景點實際位置 | 那個地方，現在', description: 'Kpop 獵魔女團中出現的N首爾塔、北村韓屋村、景福宮等首爾景點，實際位置與交通方式一次查看。' },
  daejanggeum: { title: '大長今拍攝地地圖 — 龍仁大長今公園・濟州民俗村・樂安邑城 | 那個地方，現在', description: '曾行銷91國的大長今，實際拍攝地龍仁大長今公園、濟州民俗村、樂安邑城，在地圖上一次查看。已拆除的楊州原始場景故事也一併收錄。' },
  wintersonata: { title: '冬季戀歌拍攝地地圖 — 南怡島・春川・巨濟外島 | 那個地方，現在', description: '韓流起點冬季戀歌的實際拍攝地南怡島林蔭道、春川、巨濟外島，在地圖上查看。已消失的中島樂園、俊相的家故事也一併收錄。' },
  coffeeprince: { title: '咖啡王子1號店拍攝地地圖 — 西橋洞咖啡廳・付岩洞山轉角 | 那個地方，現在', description: '咖啡王子1號店實際咖啡廳場景所在的西橋洞，以及至今仍在營業的付岩洞山轉角咖啡廳，在地圖上查看。' },
  poksshak: { title: '苦盡柑來遇見你 濟州拍攝地實際位置與交通方式 | 那個地方，現在', description: '苦盡柑來遇見你（When Life Gives You Tangerines）拍攝地濟州城山日出峰、挾才海水浴場、曉星岳等實際位置與交通方式，在地圖上查看。' }
};

/* ---------- 로케일 설정 ---------- */
function jaAvailable(w){ return !!w.title_ja; }
// 2026-08 3단계: 번체 중문(대만·홍콩) — title_zh 보유 작품(대표작 5~8개)에만 /zh/works/ 페이지 생성
function zhAvailable(w){ return !!w.title_zh; }
// 실제 배우/성우가 존재하는 매체인지 판정 — 소설(novel)은 연기한 사람이 없으므로
// "등장인물과 배우" 대신 "등장인물"로, 배우 프로필 링크도 노출하지 않는다.
// (일부 소설 속 실존 인물 데이터에 actorWikiUrl이 남아있어도 매체 기준으로 걸러낸다)
const CAST_MEDIUMS = { tv_drama:true, film:true, anime_film:true, anime_series:true };
function hasCastFeature(w){ return !!CAST_MEDIUMS[w.medium]; }

const LOCALES = {
  ko: {
    htmlLang: 'ko', ogLocale: 'ko_KR', urlPrefix: '', outDir: 'works',
    siteName: '그곳, 지금',
    ui: {
      backLink: '🏠 홈', adLabel: '광고',
      top5: n => `대표 촬영지 TOP${n}`,
      allList: (t, n) => `${t}의 전체 장소 목록 (${n}곳)`,
      // 2026-08 버그 수정: <summary> 펼치기 줄이 로케일 안 가리고 한국어로 하드코딩되어 있어서
      // EN/JA 페이지에서도 "TOP5 · 출연진 · 실제 장소 N곳 전체 목록"이 그대로 노출되던 문제.
      // 인물(출연진) 섹션은 ko 페이지에만 나오므로(castHtml 참고) 라벨도 locale별로 분리한다.
      moreSummary: n => `TOP5 · 출연진 · 실제 장소 ${n}곳 전체 목록`,
      related: '다른 작품도 둘러보세요', relatedSuffix: ' 지도 보기 →',
      cta: t => `${t} 장소 전체 보기 →`,
      ctaList: n => `TOP5·출연진·전체 장소 ${n}곳 보기`,
      introSuffix: ' 실제 촬영 장소와 이야기 배경, 주변 여행지를 구분해 소개합니다.',
      castHeading: (total, shown, hasCast) => hasCast ? `등장인물과 배우 (${total}명 중 ${shown}명)` : `등장인물 (${total}명 중 ${shown}명)`,
      castNote: '전체 인물 관계와 이야기는 지도 화면에서 확인할 수 있어요.',
      actorLink: '🎭 배우 프로필',
      footerTag: '그곳, 지금 — 이야기 속 장소를 실제로 가볼 수 있는 개인 여행지도 블로그',
      footerLinks: [['about','서비스 소개'],['places','장소로 찾기'],['contact','문의'],['privacy','개인정보처리방침'],['terms','이용약관']]
    }
  },
  en: {
    htmlLang: 'en', ogLocale: 'en_US', urlPrefix: '/en', outDir: 'en/works',
    siteName: 'That Place, Now',
    ui: {
      backLink: '🏠 Home', adLabel: 'Ad',
      top5: n => `Top ${n} locations`,
      allList: (t, n) => `All ${t} locations (${n})`,
      related: 'Explore more stories', relatedSuffix: ' — view the map →',
      moreSummary: n => `Top 5 · Real locations (${n} total)`,
      cta: t => `See every ${t} location on the map →`,
      ctaList: n => `Top 5 · Cast · All ${n} locations`,
      introSuffix: ' Real filming spots, story settings and nearby travel ideas — clearly labeled.',
      footerTag: 'That Place, Now — a personal travel-map blog connecting stories to the real places behind them',
      footerLinks: [['about','About'],['contact','Contact'],['privacy','Privacy'],['terms','Terms']]
    }
  },
  ja: {
    htmlLang: 'ja', ogLocale: 'ja_JP', urlPrefix: '/ja', outDir: 'ja/works',
    siteName: 'あの場所、いま',
    ui: {
      backLink: '🏠 ホーム', adLabel: '広告',
      top5: n => `代表ロケ地TOP${n}`,
      allList: (t, n) => `${t}のすべての場所（${n}か所）`,
      related: 'ほかの作品も見る', relatedSuffix: ' のマップを見る →',
      moreSummary: n => `TOP5・実際の場所 ${n}か所 全リスト`,
      cta: t => `${t}の場所をすべて見る →`,
      ctaList: n => `TOP5・キャスト・全${n}か所を見る`,
      introSuffix: ' 実際のロケ地と物語の舞台、周辺の旅行情報を区別して紹介します。',
      // 2026-08 추가: 인물 데이터에 _ja 필드가 전부 채워지면서(등장인물 다국어화 완료) ja 페이지에도
      // 등장인물 섹션을 노출할 수 있게 됨 — 기존에는 "인물 데이터가 한국어뿐"이라는 이유로 ko만 노출했었다.
      castHeading: (total, shown, hasCast) => hasCast ? `登場人物とキャスト（${total}名中${shown}名）` : `登場人物（${total}名中${shown}名）`,
      castNote: '人物の関係や物語の詳細は地図画面で確認できます。',
      actorLink: '🎭 俳優プロフィール',
      footerTag: 'あの場所、いま — 物語と現実の場所をつなぐ個人の旅行マップブログ',
      footerLinks: [['about','サービス紹介'],['contact','お問い合わせ'],['privacy','プライバシーポリシー'],['terms','利用規約']]
    }
  },
  // 2026-08 3단계: 번체 중문(대만·홍콩)
  zh: {
    htmlLang: 'zh-Hant', ogLocale: 'zh_TW', urlPrefix: '/zh', outDir: 'zh/works',
    siteName: '那個地方，現在',
    ui: {
      backLink: '🏠 首頁', adLabel: '廣告',
      top5: n => `代表拍攝地 TOP${n}`,
      allList: (t, n) => `${t}的所有地點（${n}處）`,
      moreSummary: n => `TOP5・演員陣容・${n}處地點完整清單`,
      related: '看看其他作品', relatedSuffix: ' 的地圖 →',
      cta: t => `查看${t}的所有地點 →`,
      ctaList: n => `TOP5・演員・${n}處地點總覽`,
      introSuffix: ' 為您區分介紹實際拍攝地、故事背景地與周邊旅遊資訊。',
      castHeading: (total, shown, hasCast) => hasCast ? `主要人物與演員（共${total}位中${shown}位）` : `主要人物（共${total}位中${shown}位）`,
      castNote: '完整的人物關係與故事內容可以在地圖畫面查看。',
      actorLink: '🎭 演員檔案',
      footerTag: '那個地方，現在 — 連結故事與現實地點的個人旅遊地圖部落格',
      footerLinks: [['about','關於本站'],['contact','聯絡我們'],['privacy','隱私權政策'],['terms','使用條款']]
    }
  }
};

// ---------- JSON-LD 구조화 데이터 (2026-08 SEO 1단계) ----------
// medium → schema.org 타입 매핑. 실존인물 소설처럼 '배우'가 없는 매체는 author만,
// 배우/성우가 있는 매체는 actor를 함께 채운다 (hasCastFeature와 동일 기준 재사용).
const MEDIUM_SCHEMA_TYPE = {
  novel: 'Book', tv_drama: 'TVSeries', film: 'Movie',
  anime_film: 'Movie', anime_series: 'TVSeries'
};
const HOME_LABEL = { ko: '그곳, 지금', en: 'That Place, Now', ja: 'あの場所、いま', zh: '那個地方，現在' };
// GSC 검색어 데이터로 확인된 실제 유입 패턴("OO 촬영지" / 실존인물 소설은 "OO 배경지")을
// 대표이미지 alt·OG 이미지 alt에도 그대로 반영한다 (app.js workImgAlt()와 동일 원칙).
const ALT_TERM = {
  ko: { novel: '배경지', filmed: '촬영지' },
  en: { novel: 'Real Locations', filmed: 'Filming Locations' },
  ja: { novel: '舞台', filmed: 'ロケ地' },
  zh: { novel: '故事背景地', filmed: '拍攝地' }
};
function imgAltFor(w, locale, displayTitle){
  const term = ALT_TERM[locale][w.medium === 'novel' ? 'novel' : 'filmed'];
  return `${displayTitle} ${term}`;
}
function jsonLdScript(obj){
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}
// 대표 촬영지(top5)를 Place(geo 포함)로 노출 — "OO 촬영지/실제 장소" 검색의도와
// 가장 직접적으로 맞닿는 필드가 CreativeWork.locationCreated이므로 이걸 사용한다.
function placesFor(locations, locale){
  return locations
    .filter(l => l.lat != null && l.lng != null)
    .slice(0, 8)
    .map(l => {
      const place = { '@type': 'Place', name: locName(l, locale) };
      place.geo = { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng };
      return place;
    });
}
function jsonLdFor(w, locale, canonicalUrl, seo, h1, displayTitle){
  const schemaType = MEDIUM_SCHEMA_TYPE[w.medium] || 'CreativeWork';
  const author = (locale === 'ja' && w.author_ja) ? w.author_ja
    : ((locale === 'zh' && w.author_zh) ? w.author_zh
    : ((locale !== 'ko' && w.author_en) ? w.author_en : w.author));
  const work = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: displayTitle,
    url: canonicalUrl,
    description: seo.description,
    inLanguage: LOCALES[locale].htmlLang
  };
  if (w.heroImage) work.image = w.heroImage.url;
  if (author && schemaType === 'Book') work.author = { '@type': 'Person', name: author };
  if (Array.isArray(w.genres) && w.genres.length) work.genre = w.genres;
  if (locale === 'ko' && hasCastFeature(w)){
    const actors = (w.people || []).filter(p => p.actorWikiUrl).slice(0, 8)
      .map(p => ({ '@type': 'Person', name: p.name, sameAs: p.actorWikiUrl }));
    if (actors.length) work.actor = actors;
  }
  const places = placesFor(w.locations, locale);
  if (places.length) work.locationCreated = places;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_LABEL[locale], item: `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/` },
      { '@type': 'ListItem', position: 2, name: h1, item: canonicalUrl }
    ]
  };
  return jsonLdScript(work) + '\n' + jsonLdScript(breadcrumb);
}

const TIER_LABELS = {
  ko: { official:'공식·직접', experience:'체험시설', theme:'테마 연계', direct:'직접' },
  en: { official:'FILMED HERE', experience:'HANDS-ON', theme:'THEMED', direct:'RELATED' },
  ja: { official:'公式・直接', experience:'体験施設', theme:'テーマ関連', direct:'関連' },
  zh: { official:'官方・直接', experience:'體驗設施', theme:'主題關聯', direct:'直接' }
};

function titleFor(w, locale){
  if (locale === 'en') return w.title_en || w.title;
  if (locale === 'ja') return w.title_ja || w.title_en || w.title;
  if (locale === 'zh') return w.title_zh || w.title_en || w.title;
  return w.title;
}
function seoFor(w, locale){
  if (locale === 'ko') return SEO_META_KO[w.id];
  if (locale === 'en'){
    if (SEO_META_EN[w.id]) return SEO_META_EN[w.id];
    const t = titleFor(w, 'en');
    return {
      title: `${t} — Filming Locations & Real Places Map | That Place, Now`,
      description: w.summary_en
        ? (w.summary_en.length > 155 ? w.summary_en.slice(0, 152) + '…' : w.summary_en)
        : `Explore the real filming locations and story settings of ${t} on an interactive map with travel tips.`
    };
  }
  if (locale === 'zh'){
    if (SEO_META_ZH[w.id]) return SEO_META_ZH[w.id];
    const t = titleFor(w, 'zh');
    return {
      title: `${t}拍攝地・故事場景地圖 | 那個地方，現在`,
      description: w.summary_zh
        ? (w.summary_zh.length > 155 ? w.summary_zh.slice(0, 152) + '…' : w.summary_zh)
        : `在地圖上探索${t}的實際拍攝地與故事場景，附旅遊小提示。`
    };
  }
  const t = titleFor(w, 'ja');
  return {
    title: `${t}のロケ地・聖地巡礼マップ | あの場所、いま`,
    description: w.summary_ja
      ? (w.summary_ja.length > 155 ? w.summary_ja.slice(0, 152) + '…' : w.summary_ja)
      : `${t}のロケ地と舞台を、旅のヒントとともに地図で紹介します。`
  };
}
function h1For(w, locale){
  if (locale === 'ko') return SEO_META_KO[w.id].title.split(' | ')[0].trim();
  if (locale === 'en') return `${titleFor(w, 'en')} — Filming Locations & Real Places`;
  if (locale === 'zh') return `${titleFor(w, 'zh')} 拍攝地・故事場景地圖`;
  return `${titleFor(w, 'ja')}のロケ地・舞台マップ`;
}
// 언어별 허브 URL — ja/zh 미번역 작품은 en 허브로 (app.js workHubPath()와 동일 규칙)
function hubUrl(w, locale){
  if (locale === 'ja' && !jaAvailable(w)) return `${SITE_ORIGIN}/en/works/${w.id}/`;
  if (locale === 'zh' && !zhAvailable(w)) return `${SITE_ORIGIN}/en/works/${w.id}/`;
  return `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/works/${w.id}/`;
}
function hreflangBlock(w){
  const lines = [
    `<link rel="alternate" hreflang="ko" href="${SITE_ORIGIN}/works/${w.id}/">`,
    `<link rel="alternate" hreflang="en" href="${SITE_ORIGIN}/en/works/${w.id}/">`
  ];
  if (jaAvailable(w)) lines.push(`<link rel="alternate" hreflang="ja" href="${SITE_ORIGIN}/ja/works/${w.id}/">`);
  if (zhAvailable(w)) lines.push(`<link rel="alternate" hreflang="zh-Hant" href="${SITE_ORIGIN}/zh/works/${w.id}/">`);
  lines.push(`<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/works/${w.id}/">`);
  return lines.join('\n');
}
// 2026-08 9라운드(기획자 검토 반영): 영문 페이지에 "킹스크로스역 (King's Cross Station)"처럼
// 한글 지명이 영문 옆에 그대로 남아 있다는 지적 — 확인해보니 장소 데이터에 modernName_en
// 필드 자체가 아예 없다(이 사이트 전체 어느 작품에도 없음, 39개 작품 전수 확인). 장소마다
// 새로 영문명을 조사해 넣는 건 매우 큰 작업이라, 우선 지금 있는 데이터 패턴("한글이름 (English
// Name)")에서 괄호 안 영문만 뽑아내는 실용적인 방법으로 처리한다 — 대부분의 장소명이 이미
// 이 표기 관행을 따르고 있어서(특히 해외 촬영지) 즉시 넓은 범위를 고친다. 괄호 안에 라틴 문자가
// 없으면(=순수 한글 지명, 영문 표기가 원래 없는 경우) 안전하게 원래 이름으로 폴백한다 — 없는
// 영문명을 지어내지 않는다는 원칙을 지킨다.
function extractEnglishName(name){
  if (!name) return name;
  // 1) 괄호가 문자열 끝에 있는 표준 패턴("한글이름 (English Name)")
  const trailing = name.match(/^(.*?)\s*[\(（]([^)）]+)[\)）]\s*$/);
  if (trailing && /[A-Za-z]/.test(trailing[2])) return trailing[2].trim();
  // 2) 2026-08 추가 수정: 괄호 뒤에 추가 한글이 더 붙는 경우("크라이스트처치 칼리지
  //    (Christ Church College), 옥스퍼드")는 위 정규식이 문자열 끝(\s*$) 조건 때문에
  //    매칭에 실패해 통째로 원문이 폴백되던 버그. 문자열 어디에 있든 괄호 안에 라틴 문자가
  //    있으면 그 영문만 취한다. 괄호 뒤에 남는 한글 조각(도시명 등)은 번역 데이터가 없어
  //    지어내지 않고 그냥 버린다 — "없는 영문명을 지어내지 않는다"는 기존 원칙 유지.
  const anywhere = name.match(/[\(（]([^)）]+)[\)）]/);
  if (anywhere && /[A-Za-z]/.test(anywhere[1])) return anywhere[1].trim();
  return name;
}
function locName(l, locale){
  if (locale === 'ja' && l.name_ja) return l.name_ja;
  if (locale === 'zh' && l.name_zh) return l.name_zh;
  if (locale === 'en' || locale === 'zh') return l.name_en || extractEnglishName(l.name);
  return l.name;
}
function locDesc(l, locale){
  if (locale === 'ja') return l.desc_ja || l.desc_en || l.desc;
  if (locale === 'zh') return l.desc_zh || l.desc_en || l.desc;
  if (locale === 'en') return l.desc_en || l.desc;
  return l.desc;
}

/* ---------- 인물 아바타 (앱과 동일 규칙) ---------- */
const FACTION_PALETTE = ['#c0524a','#4a7cc0','#4ac07c','#c0a24a','#8a4ac0','#4ac0b0','#c04a8a','#7a8a9a'];
function factionColorStatic(faction){
  const s = faction || '기타';
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FACTION_PALETTE[h % FACTION_PALETTE.length];
}
function personInitialStatic(name){
  const clean = (name || '').split(/[（(·・]/)[0].trim();
  return clean ? clean.charAt(0) : '?';
}

const TOP5_TIER_ORDER = { official: 0, experience: 1, theme: 2, direct: 3 };
function top5Locations(locations){
  return locations
    .map((loc, idx) => ({ loc, idx }))
    .sort((a, b) => {
      const ta = TOP5_TIER_ORDER[a.loc.tier] != null ? TOP5_TIER_ORDER[a.loc.tier] : 4;
      const tb = TOP5_TIER_ORDER[b.loc.tier] != null ? TOP5_TIER_ORDER[b.loc.tier] : 4;
      if (ta !== tb) return ta - tb;
      return a.idx - b.idx;
    })
    .slice(0, 5)
    .map(x => x.loc);
}

// 2026-08 9라운드(기획자 검토 반영): 예전엔 WORKS[] 배열에서 그냥 "다음 2개"를 순서대로
// 뽑아왔다 — 오징어게임(한국/스릴러) 밑에 에밀리 파리에 가다·브리저튼(유럽/로맨스)이 붙는 등
// 아무 연관성이 없어서 "왜 이걸 눌러야 하지?" 질문에 답을 못 했다. 국가/장르/매체가 겹칠수록
// 점수를 높게 줘서 실제로 비슷한 결의 작품을 추천하도록 바꿨다. 점수가 전부 0(겹치는 게
// 하나도 없는 작품만 남는 경우, 데이터가 아주 적을 때)이면 예전처럼 배열 순서로 안전하게
// 폴백한다 — 추천 자체가 비는 것보다는 낫다.
function relatedWorks(currentId){
  const cur = works.find(w => w.id === currentId);
  const idx = works.findIndex(w => w.id === currentId);
  if (!cur) return [];
  const curGenres = new Set(cur.genres || []);
  const scored = works
    .filter(w => w.id !== currentId)
    .map(w => {
      let score = 0;
      if (w.country && cur.country && w.country === cur.country) score += 3;
      if (w.medium && cur.medium && w.medium === cur.medium) score += 1;
      if (w.type && cur.type && w.type === cur.type) score += 1;
      const shared = (w.genres || []).filter(g => curGenres.has(g)).length;
      score += shared * 2;
      return { w, score };
    })
    .sort((a, b) => b.score - a.score || works.indexOf(a.w) - works.indexOf(b.w));
  const top = scored.filter(x => x.score > 0).slice(0, 2).map(x => x.w);
  if (top.length === 2) return top;
  // 점수 있는 후보가 부족하면(2개 미만) 배열 순서 폴백으로 채운다.
  const out = top.slice();
  for (let i = 1; out.length < 2 && i < works.length; i++){
    const cand = works[(idx + i) % works.length];
    if (cand.id !== currentId && !out.some(w => w.id === cand.id)) out.push(cand);
  }
  return out;
}

const SHARED_CSS = `
  :root{ --ink:#1c1f26; --sub:#5b6270; --line:#e4e6eb; --accent:#e0603a; --accent2:#3a7ce0; }
  *{box-sizing:border-box;}
  /* 2026-08 모바일 버그 수정: 상단 언어토글(한국어/EN/日本語) 필이 iOS Safari에서 실제 지정한
     12.5px보다 훨씬 크게 렌더링된다는 사용자 지적 — iOS Safari가 좁은 컬럼 안의 짧은 텍스트를
     "읽기 쉽게" 자동으로 확대하는 text-size-adjust 동작 때문으로 추정. 명시적으로 100%로 고정해
     브라우저가 임의로 글자 크기를 키우지 못하게 막는다. */
  html{-webkit-text-size-adjust:100%;text-size-adjust:100%;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","Malgun Gothic",sans-serif;color:var(--ink);line-height:1.7;background:#fff;}
  .wsHeader{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--line);background:#fff;position:sticky;top:0;z-index:5;}
  .wsHeader a.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--ink);text-decoration:none;}
  .wsHeader a.brand .brand-logo{width:28px;height:28px;flex-shrink:0;}
  .wsHeader a.brand:hover{opacity:.85;}
  .wsHeader a.backLink{font-size:13.5px;color:var(--accent2);text-decoration:none;font-weight:600;}
  .wsHeader a.backLink:hover{text-decoration:underline;}
  /* 2026-08 3단계: 헤더(SPA 앱)의 .lang-toggle 알약형 그룹 버튼과 시각적으로 통일 —
     기존에는 낱개 아웃라인 필(pill) 3~4개가 흩어져 있어 그림1(헤더)과 그림2(후킹페이지)가
     서로 다른 컴포넌트처럼 보인다는 지적. 회색 트랙 안에 버튼이 촘촘히 붙어있고, 선택된
     언어만 색이 채워지는 동일한 구조로 맞췄다. */
  .wsLangs{display:flex;background:#f2f3f5;border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px;align-items:center;font-size:11.5px;}
  .wsLangs a{color:var(--sub);text-decoration:none;padding:6px 11px;border-radius:999px;font-weight:700;}
  .wsLangs a.on{color:#fff;background:var(--accent2);}
  .wsLangs a:not(.on):hover{color:var(--accent2);}
  main{max-width:760px;margin:0 auto;padding:32px 20px 60px;}
  /* 2026-08 10라운드(기획자 검토 반영): 히어로 이미지가 760px 컬럼 안에 갇혀 양옆이
     테두리로 낭비된다는 지적 — 이미지만 화면 폭 전체로 꽉 채우고(풀블리드), 본문 텍스트는
     기존처럼 읽기 좋은 폭을 유지한다. 그래서 히어로는 <main> 바깥, <header> 바로 아래로 옮겼다. */
  .heroWrap{width:100%;max-height:440px;overflow:hidden;background:#eee;}
  .heroImgFull{display:block;width:100%;height:440px;object-fit:cover;}
  .heroCreditWrap{max-width:760px;margin:0 auto;padding:8px 20px 0;}
  .heroCredit{font-size:11.5px;color:var(--sub);margin:0 0 22px;text-align:right;}
  .heroCredit a{color:var(--sub);text-decoration:underline;}
  .heroCredit a:hover{color:var(--accent2);}
  h1{font-size:26px;line-height:1.4;margin:0 0 10px;}
  .metaLine{color:var(--sub);font-size:14px;margin:0 0 18px;}
  .intro{font-size:16px;margin:0 0 22px;}
  /* 2026-08 10라운드: 지도보기·전체목록 버튼 2개를 훅 본문(길면 12~18문단)보다 위, h1 바로
     아래로 옮겨서 글이 길어져도 항상 스크롤 없이 보이게 했다. 두 버튼 모두 같은 크기의
     컬러풀한 그라디언트 버튼으로 통일. */
  .actionBar{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 22px;}
  .actionBar .ctaBtn{flex:1 1 220px;margin-bottom:0;}
  .ctaBtn{display:inline-block;text-align:center;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 20px;border-radius:10px;margin-bottom:28px;box-shadow:0 3px 10px rgba(58,124,224,.22);}
  .ctaBtn.ctaBtnAlt{background:linear-gradient(135deg,var(--accent2),#8a4ac0);box-shadow:0 3px 10px rgba(138,74,192,.22);}
  .ctaBtn:hover{opacity:0.92;}
  .hookBadge{display:inline-block;font-size:12.5px;font-weight:700;color:var(--accent2);background:rgba(58,124,224,.1);border:1px solid rgba(58,124,224,.25);border-radius:999px;padding:5px 12px;margin:0 0 12px;}
  .hookTagline{font-size:23px;font-weight:800;line-height:1.4;margin:0 0 16px;color:var(--ink);}
  /* 2026-08 수정: 후킹페이지 글이 재미있는데 짧고 밋밋해 보인다는 피드백 — 스포일러를 과감히
     담아 더 길게 쓰는 김에, 글자 크기를 1.5배(15.5px→23px)로 키우고 가운데 정렬로 바꿔서
     블로그 에세이처럼 한 줄 한 줄 읽히도록 했다. */
  .hookBox{background:#fff9f2;border:1px solid #f0ddc4;border-radius:14px;padding:26px 22px;margin:0 0 18px;text-align:center;}
  .hookBox p{margin:0 0 18px;font-size:23px;line-height:1.65;}
  .hookBox p:last-child{margin-bottom:0;}
  .hookBox img{max-width:100%;border-radius:10px;margin:6px 0 18px;}
  .hookBox .hookPhotoCaption{font-size:14px;color:var(--sub);margin:-12px 0 18px;text-align:center;}
  .hookReveals{margin:0 0 18px;}
  .hookReveals .revealsRow{display:flex;flex-wrap:wrap;gap:8px;}
  .hookReveals a.revealChip,.hookReveals span.revealChip{display:inline-block;font-size:13px;font-weight:600;border-radius:999px;padding:7px 13px;text-decoration:none;}
  .hookReveals a.revealChip{color:var(--accent2);background:rgba(58,124,224,.08);border:1px solid rgba(58,124,224,.3);}
  .hookReveals a.revealChip:hover{background:rgba(58,124,224,.16);}
  .hookReveals span.revealChip{color:var(--sub);background:#f2f3f5;border:1px solid var(--line);}
  .moreDetails{margin-top:6px;}
  .moreDetails > summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;background:#f6f7f9;border:1px solid var(--line);border-radius:12px;padding:14px 18px;font-weight:700;font-size:15px;color:var(--ink);margin-bottom:4px;}
  .moreDetails > summary::-webkit-details-marker{display:none;}
  .moreDetails > summary::after{content:"펼치기 ▾";font-size:12.5px;font-weight:600;color:var(--accent2);}
  .moreDetails[open] > summary::after{content:"접기 ▴";}
  /* 2026-08 버그 수정: 위 펼치기/접기 텍스트가 html[lang] 상관없이 한국어로 고정 출력되던 문제.
     en/ja 페이지는 html lang 속성으로 오버라이드한다(사용자 지적: "일본어로 번역이 됐는데도
     버튼 내부 글자는 한글로 남아있다"). */
  html[lang="en"] .moreDetails > summary::after{content:"Show more ▾";}
  html[lang="en"] .moreDetails[open] > summary::after{content:"Show less ▴";}
  html[lang="ja"] .moreDetails > summary::after{content:"開く ▾";}
  html[lang="ja"] .moreDetails[open] > summary::after{content:"閉じる ▴";}
  html[lang="zh-Hant"] .moreDetails > summary::after{content:"展開 ▾";}
  html[lang="zh-Hant"] .moreDetails[open] > summary::after{content:"收合 ▴";}
  .moreDetails > summary:hover{background:#eef0f3;}
  .moreDetails .moreDetailsBody{padding-top:18px;}
  h2{font-size:19px;margin:36px 0 14px;padding-top:10px;border-top:1px solid var(--line);}
  .locCard{padding:16px 18px;border:1px solid var(--line);border-radius:12px;margin-bottom:12px;transition:border-color .15s ease,background .15s ease;}
  .locCard:hover{border-color:#d5d9e0;background:#fafbfc;}
  .locCard h3{font-size:16px;margin:0 0 6px;}
  .tierBadge{display:inline-block;font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;margin-bottom:8px;}
  .locCard p{font-size:14px;color:#333;margin:0;}
  .relatedList{list-style:none;padding:0;margin:0;}
  .relatedList li{margin-bottom:10px;}
  .relatedList a{color:var(--accent2);text-decoration:none;font-size:15px;font-weight:600;}
  .relatedList a:hover{text-decoration:underline;}
  /* 2026-08 문화 콘텐츠 크로스링크 박스 — "작품 속 진짜 한국" */
  .cultureBox{margin:28px 0;padding:18px 20px;border:1px solid var(--line);border-radius:14px;background:#f0f7ff;}
  .cultureBox h3{margin:0 0 4px;font-size:15px;}
  .cultureBox .cbSub{margin:0 0 12px;font-size:13px;color:var(--sub);}
  .cultureBox ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;}
  .cultureBox a{display:block;color:var(--ink);text-decoration:none;font-size:14.5px;font-weight:600;padding:10px 12px;background:#fff;border:1px solid var(--line);border-radius:10px;}
  .cultureBox a:hover{border-color:var(--accent2);color:var(--accent2);}
  .adSlot{margin:30px 0;padding:14px;border:1px dashed var(--line);border-radius:12px;background:#fbfbfc;text-align:center;}
  .adSlot .adLabel{display:block;font-size:11px;color:var(--sub);letter-spacing:.04em;margin-bottom:8px;}
  .adSlot .adBox{min-height:100px;display:flex;align-items:center;justify-content:center;color:#c3c8d1;font-size:12px;border-radius:6px;}
  footer{max-width:760px;margin:0 auto;padding:20px;color:var(--sub);font-size:13px;border-top:1px solid var(--line);}
  footer a{color:var(--sub);text-decoration:underline;margin-right:14px;}
  footer a:hover{color:var(--accent2);}
  .top5Grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:8px;}
  .top5Card{border:1px solid var(--line);border-radius:12px;padding:14px 14px 16px;position:relative;}
  .top5Rank{position:absolute;top:-9px;left:12px;background:var(--ink);color:#fff;font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px;}
  .top5Card h3{font-size:14.5px;margin:6px 0 4px;}
  .top5Card p{font-size:12.5px;color:#555;margin:0;}
  .castGrid{display:flex;flex-direction:column;gap:2px;}
  .castRow{display:flex;align-items:center;gap:12px;padding:11px 4px;border-bottom:1px solid var(--line);}
  .castAvatar{flex-shrink:0;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px;}
  .castInfo{min-width:0;flex:1;}
  .castInfo .castName{font-size:14.5px;font-weight:700;}
  .castInfo .castRole{font-size:12.5px;color:var(--sub);}
  .castActorLink{flex-shrink:0;font-size:12px;font-weight:600;color:var(--accent2);text-decoration:none;white-space:nowrap;}
  .castActorLink:hover{text-decoration:underline;}
  @media (max-width:480px){
    .wsHeader{padding:11px 16px;flex-wrap:wrap;gap:6px;}
    .wsHeader a.brand{font-size:14.5px;gap:7px;}
    .wsHeader a.brand .brand-logo{width:24px;height:24px;}
    .wsHeader a.backLink{font-size:12.5px;}
    /* 2026-08: 모바일에서 언어토글 필이 지나치게 커 보인다는 지적 — 폰트/패딩/간격을 한 번 더
       줄여서 작은 화면에서도 눈에 거슬리지 않는 보조 UI 크기로 확실히 고정한다. */
    .wsLangs{gap:1px;font-size:11px;padding:2px;}
    .wsLangs a{padding:5px 9px;}
    main{padding:22px 16px 48px;}
    .heroWrap{max-height:200px;}
    .heroImgFull{height:200px;}
    h1{font-size:21px;}
    .intro{font-size:14.5px;}
    .hookTagline{font-size:19px;}
    .hookBox{padding:18px 16px;}
    .hookBox p{font-size:20px;line-height:1.6;}
    /* 2026-08 재수정: 이전 수정이 헤더 언어토글(.wsLangs)만 건드리고 실제 사용자가 지적한
       두꺼운 버튼(본문 상단 actionBar의 .ctaBtn 2개, "지도에서 보기"/"TOP5·출연진·전체 N곳 보기")은
       그대로 뒀던 게 원인이었다. 안드로이드(삼성)에서도 동일하게 두껍게 보였던 이유는 iOS
       한정 버그가 아니라 이 버튼 자체의 padding(14px 16px)+기본 16px 폰트가 좁은 화면에서
       실제로 큰 값이었기 때문 — 폰트/패딩/모서리 반경을 모바일 전용으로 한 번 더 축소한다. */
    .actionBar{flex-direction:column;gap:8px;}
    .ctaBtn{display:block;text-align:center;font-size:13.5px;padding:10px 14px;border-radius:8px;margin-bottom:0;}
    h2{font-size:17px;margin:28px 0 12px;}
    .locCard{padding:13px 14px;}
    .locCard h3{font-size:15px;}
    .locCard p{font-size:13.5px;}
    .adSlot .adBox{min-height:80px;}
    .top5Grid{grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:9px;}
    .castRow{padding:9px 2px;gap:9px;}
    .castAvatar{width:32px;height:32px;font-size:13px;}
  }
`;

// 2026-08 문화 콘텐츠 크로스링크 박스 — 이 작품과 연결된 "작품 속 진짜 한국" 주제가 있으면
// 장소 목록 아래에 노출한다. ko/en에서만 노출(문화 콘텐츠가 ko/en만 존재).
function cultureSectionHtml(w, locale){
  if (locale !== 'ko' && locale !== 'en') return '';
  const topics = CULTURE_BY_WORK[w.id];
  if (!topics || !topics.length) return '';
  const prefix = locale === 'en' ? '/en' : '';
  const heading = locale === 'en' ? 'The Real Korea Behind the Scene' : '작품 속 진짜 한국';
  const sub = locale === 'en'
    ? 'What looks ordinary in this story is real Korean culture — here’s the story behind it.'
    : '이 작품 속 장면이 별거 아닌 것 같아도, 사실은 진짜 한국 문화입니다.';
  const items = topics.map(t => {
    const tc = t[locale] || t.ko;
    return `      <li><a href="${SITE_ORIGIN}${prefix}/culture/${esc(t.id)}/">${esc(tc.title)}</a></li>`;
  }).join('\n');
  return `
    <div class="cultureBox">
      <h3>🇰🇷 ${esc(heading)}</h3>
      <p class="cbSub">${esc(sub)}</p>
      <ul>
${items}
      </ul>
    </div>`;
}

function renderPage(w, locale){
  const L = LOCALES[locale];
  const seo = seoFor(w, locale);
  const canonicalUrl = hubUrl(w, locale);
  const mapUrl = `${SITE_ORIGIN}${L.urlPrefix}/?work=${encodeURIComponent(w.id)}`;
  const h1 = h1For(w, locale);
  const displayTitle = titleFor(w, locale);
  const heroAlt = esc(imgAltFor(w, locale, titleFor(w, locale)));
  const author = (locale === 'ja' && w.author_ja) ? w.author_ja
    : ((locale === 'zh' && w.author_zh) ? w.author_zh
    : ((locale !== 'ko' && w.author_en) ? w.author_en : w.author));
  const era = (locale === 'ja' && w.era_ja) ? w.era_ja
    : ((locale === 'zh' && w.era_zh) ? w.era_zh
    : ((locale !== 'ko' && w.era_en) ? w.era_en : w.era));
  const genreLine = [author, era].filter(Boolean).join(' · ');
  const tiers = TIER_LABELS[locale];
  const jsonLd = jsonLdFor(w, locale, canonicalUrl, seo, h1, displayTitle);

  const locItems = w.locations.map(l => {
    const tierColor = TIER_COLOR[l.tier] || TIER_COLOR.direct;
    const badgeStyle = `background:${hexToRgba(tierColor, 0.12)};color:${tierColor};border:1px solid ${hexToRgba(tierColor, 0.35)}`;
    return `      <div class="locCard">
        <span class="tierBadge" style="${badgeStyle}">${esc(tiers[l.tier] || tiers.direct)}</span>
        <h3>${esc(locName(l, locale))}</h3>
        <p>${esc(locDesc(l, locale))}</p>
      </div>`;
  }).join('\n');

  const top5 = top5Locations(w.locations);
  const top5Html = top5.length ? `
  <h2>${esc(L.ui.top5(top5.length))}</h2>
  <div class="top5Grid">
${top5.map((l, i) => {
    const tierColor = TIER_COLOR[l.tier] || TIER_COLOR.direct;
    return `    <div class="top5Card" style="border-top:3px solid ${tierColor}">
      <span class="top5Rank">${i + 1}</span>
      <h3>${esc(locName(l, locale))}</h3>
      <p>${esc(tiers[l.tier] || tiers.direct)}</p>
    </div>`;
  }).join('\n')}
  </div>` : '';

  // 2026-08: 인물 데이터 전체(1262명)에 _ja 필드가 채워지면서 ja 페이지에도 등장인물 섹션을
  // 노출할 수 있게 됐다(과거엔 "인물 데이터가 한국어뿐"이라 ko만 노출 — '반쪽 번역' 페이지를
  // 만들지 않는다는 원칙, 6-2 QA). en은 아직 인물 데이터에 _en 필드가 없어 계속 제외한다.
  let castHtml = '';
  if (locale === 'ko' || locale === 'ja' || locale === 'zh'){
    const castList = (w.people || []).slice(0, 8);
    const hasCast = hasCastFeature(w);
    const pName = p => (locale === 'ja' && p.name_ja) ? p.name_ja : ((locale === 'zh' && p.name_zh) ? p.name_zh : p.name);
    const pYears = p => (locale === 'ja' && p.years_ja) ? p.years_ja : ((locale === 'zh' && p.years_zh) ? p.years_zh : p.years);
    const pRole = p => (locale === 'ja' && p.role_ja) ? p.role_ja : ((locale === 'zh' && p.role_zh) ? p.role_zh : p.role);
    castHtml = castList.length ? `
  <h2>${esc(L.ui.castHeading(w.peopleCount, castList.length, hasCast))}</h2>
  <div class="castGrid">
${castList.map(p => {
      const avatarColor = p.symbolColor || factionColorStatic(p.faction);
      const metaLine = [pYears(p), pRole(p)].filter(Boolean).join(' · ');
      const actorLinkHtml = (hasCast && p.actorWikiUrl)
        ? `<a class="castActorLink" href="${esc(p.actorWikiUrl)}" target="_blank" rel="noopener">${esc(L.ui.actorLink)}</a>`
        : '';
      return `    <div class="castRow">
      <div class="castAvatar" style="background:${avatarColor}">${esc(personInitialStatic(pName(p)))}</div>
      <div class="castInfo">
        <div class="castName">${esc(pName(p))}</div>
        <div class="castRole">${esc(metaLine)}</div>
      </div>
      ${actorLinkHtml}
    </div>`;
    }).join('\n')}
  </div>
  <p style="font-size:12.5px;color:var(--sub);margin-top:10px;">${esc(L.ui.castNote)}</p>` : '';
  }

  const related = relatedWorks(w.id).map(r => {
    const effLocale = (locale === 'ja' && !jaAvailable(r)) ? 'en' : ((locale === 'zh' && !zhAvailable(r)) ? 'en' : locale);
    const anchor = esc(h1For(r, effLocale));
    return `      <li><a href="${hubUrl(r, locale)}">${anchor}${esc(L.ui.relatedSuffix)}</a></li>`;
  }).join('\n');

  const summaryText = (locale === 'ja' && w.summary_ja) ? w.summary_ja
    : ((locale === 'zh' && w.summary_zh) ? w.summary_zh
    : ((locale !== 'ko' && w.summary_en) ? w.summary_en : w.summary));
  const introExtra = summaryText ? esc(summaryText) : '';

  // 2026-08 SEO: "발견형 훅" 콘텐츠 — 검색 유입 직후 클릭 없이 바로 보이도록 상단에 렌더링.
  // 로케일별 필드(discoveryHook/discoveryHook_en/discoveryHook_ja 등)가 있는 작품만 적용,
  // 없는 작품·언어는 기존 방식(줄거리 요약) 그대로 유지 — 번역 누락 시 조용히 폴백된다.
  const hookField = (base) => {
    if (locale === 'ja') return w[base + '_ja'] || null;
    if (locale === 'zh') return w[base + '_zh'] || null;
    if (locale === 'en') return w[base + '_en'] || null;
    return w[base] || null;
  };
  const localeHook = hookField('discoveryHook');
  const hasHook = Array.isArray(localeHook) && localeHook.length > 0;
  const localeBadge = hookField('hookBadge');
  const localeTagline = hookField('hookTagline');
  const localeReveals = hookField('hookReveals');
  const hookBadgeHtml = hasHook && localeBadge ? `<p class="hookBadge">${esc(localeBadge)}</p>` : '';
  const hookTaglineHtml = hasHook && localeTagline ? `<p class="hookTagline">${esc(localeTagline)}</p>` : '';
  // 2026-08 추가(v2): 후킹페이지 글이 길어지면서(스포일러 포함, 12~18문단) 사진 없이 텍스트만
  // 쭉 이어지면 지루하다는 피드백으로 처음엔 heroImage를 문단 중간에 재사용했으나, "대문 사진과
  // 중간 사진이 같으면 수정한 보람이 없다"는 재지적을 받아 HOOK_IMAGES(작품별 신규 조사 이미지,
  // 위 상단 정의)가 있으면 그것을 우선 사용하도록 변경. 신규 이미지가 없는 작품만 이전처럼
  // heroImage를 재사용한다(이미지 자체를 아예 안 넣는 것보다는 낫다는 절충).
  const extraImgs = HOOK_IMAGES[w.id] || [];
  const photoHtml = (img) => img
    ? `<img src="${esc(img.url)}" alt="${heroAlt}" loading="lazy">` +
      (img.credit ? `<p class="hookPhotoCaption">${esc(img.credit)}</p>` : '')
    : '';
  const hookBoxHtml = hasHook
    ? (() => {
        const n = localeHook.length;
        let positions; // 문단 인덱스 → 그 문단 앞에 넣을 이미지
        if (extraImgs.length){
          // 이미지 2장을 1/3, 2/3 지점에 분산 배치(이미지 1장이면 중간 1곳에만)
          positions = extraImgs.length >= 2
            ? [{ at: Math.floor(n / 3), img: extraImgs[0] }, { at: Math.floor(n * 2 / 3), img: extraImgs[1] }]
            : [{ at: Math.floor(n / 2), img: extraImgs[0] }];
        } else if (w.heroImage){
          positions = [{ at: Math.floor(n / 2), img: w.heroImage }];
        } else {
          positions = [];
        }
        const byIndex = {};
        positions.forEach(p => { if (!byIndex[p.at]) byIndex[p.at] = p.img; });
        return `<div class="hookBox">${localeHook.map((p, i) =>
          (byIndex[i] ? photoHtml(byIndex[i]) : '') + `<p>${esc(p)}</p>`
        ).join('\n')}</div>`;
      })()
    : '';
  const hookRevealsHtml = hasHook && Array.isArray(localeReveals) && localeReveals.length
    ? `<div class="hookReveals"><div class="revealsRow">${
        localeReveals.map(r => {
          const label = (locale === 'ja' && r.label_ja) ? r.label_ja
            : ((locale === 'zh' && r.label_zh) ? r.label_zh
            : ((locale === 'en' && r.label_en) ? r.label_en : r.label));
          const loc = r.locId ? w.locations.find(l => l.id === r.locId) : null;
          return loc
            ? `<a class="revealChip" href="${esc(mapUrl + '&loc=' + encodeURIComponent(r.locId))}">${esc(label)}</a>`
            : `<span class="revealChip">${esc(label)}</span>`;
        }).join('')
      }</div></div>` : '';

  // 언어 전환 링크(우상단): ja/zh 미번역 작품에서는 en 허브로 보냄 — 404를 만들지 않기 위해
  // 2026-08 3단계: 헤더(SPA)의 .lang-toggle과 동일하게 짧은 코드 라벨(KR/EN/JP/中文)로 통일
  const langLinks = `<nav class="wsLangs" aria-label="Languages">
    <a href="${hubUrl(w, 'ko')}"${locale === 'ko' ? ' class="on"' : ''}>KR</a>
    <a href="${hubUrl(w, 'en')}"${locale === 'en' ? ' class="on"' : ''}>EN</a>
    ${jaAvailable(w) ? `<a href="${hubUrl(w, 'ja')}"${locale === 'ja' ? ' class="on"' : ''}>JP</a>` : ''}
    ${zhAvailable(w) ? `<a href="${hubUrl(w, 'zh')}"${locale === 'zh' ? ' class="on"' : ''}>中文</a>` : ''}
  </nav>`;

  return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>

  <meta name="naver-site-verification" content="${NAVER_VERIFY}" />

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(seo.title)}</title>

<meta
  name="description"
  content="${esc(seo.description)}"
>

<link rel="canonical" href="${canonicalUrl}">
${hreflangBlock(w)}

<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(L.siteName)}">

<meta
  property="og:title"
  content="${esc(seo.title)}"
>

<meta
  property="og:description"
  content="${esc(seo.description)}"
>

<meta property="og:url" content="${canonicalUrl}">
${w.heroImage ? `<meta property="og:image" content="${esc(w.heroImage.url)}">
<meta property="og:image:alt" content="${heroAlt}">` : ''}
<meta property="og:locale" content="${L.ogLocale}">

<meta name="twitter:card" content="summary_large_image">

<meta
  name="twitter:title"
  content="${esc(seo.title)}"
>

<meta
  name="twitter:description"
  content="${esc(seo.description)}"
>
${w.heroImage ? `<meta name="twitter:image" content="${esc(w.heroImage.url)}">
<meta name="twitter:image:alt" content="${heroAlt}">` : ''}

<!-- 방문자 통계(GA4) 연동 완료 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
<style>${SHARED_CSS}</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6290350430336608"
     crossorigin="anonymous"></script>

<!-- 2026-08 SEO 1단계: 구조화 데이터 (CreativeWork + BreadcrumbList) -->
${jsonLd}
</head>
<body>
<header class="wsHeader">
  <a class="brand" href="${SITE_ORIGIN}${L.urlPrefix}/">
    ${BRAND_LOGO_SVG}
    <span>${esc(L.siteName)}</span>
  </a>
  ${langLinks}
  <a class="backLink" href="${SITE_ORIGIN}${L.urlPrefix}/">${esc(L.ui.backLink)}</a>
</header>
${/* 2026-08 버그 수정: heroImage는 { url, credit, creditUrl } 객체인데, 이 파일(정적 SEO 페이지
   생성기)만 w.heroImage를 문자열인 것처럼 다뤄서 String(object) → "[object Object]"가 <img src>·
   og:image·twitter:image에 그대로 박혀 있었다. 그래서 39개 작품 SEO 페이지 전부에서 히어로 이미지가
   깨져 있었고(파친코만이 아니라 전체), heroImageCredit/heroImageCreditUrl이라는 존재하지도 않는
   최상위 필드를 찾다 보니 출처 표기도 항상 비어 있었다. app.js(지도 화면)는 처음부터
   w.heroImage.url을 올바르게 썼기 때문에 지도 화면 카드에서는 이 문제가 안 보였다. */''}
${w.heroImage ? `<div class="heroWrap"><img class="heroImgFull" src="${esc(w.heroImage.url)}" alt="${heroAlt}" loading="lazy"></div>
${w.heroImage.credit ? `<div class="heroCreditWrap"><p class="heroCredit">${w.heroImage.creditUrl ? `<a href="${esc(w.heroImage.creditUrl)}" target="_blank" rel="noopener">${esc(w.heroImage.credit)}</a>` : esc(w.heroImage.credit)}</p></div>` : ''}` : ''}
<main>
  ${hookBadgeHtml}
  <h1>${esc(h1)}</h1>
  ${hasHook ? hookTaglineHtml : `<p class="metaLine">${esc(genreLine)}</p>`}
  <div class="actionBar">
    <a class="ctaBtn" href="${mapUrl}">${esc(L.ui.cta(displayTitle))}</a>
    <a class="ctaBtn ctaBtnAlt" href="#allLocations">${esc(L.ui.ctaList(w.locations.length))}</a>
  </div>
  <p class="intro">${esc(seo.description)}${esc(L.ui.introSuffix)}</p>
  ${hasHook ? hookBoxHtml : (introExtra ? `<p class="intro">${introExtra}</p>` : '')}
  ${hasHook ? hookRevealsHtml : ''}
  ${hasHook ? `<p class="metaLine">${esc(genreLine)}</p>` : ''}

${hasHook ? `  <details class="moreDetails">
    <summary>${esc(L.ui.moreSummary(w.locations.length))}</summary>
    <div class="moreDetailsBody">
  <div class="adSlot">
    <span class="adLabel">${esc(L.ui.adLabel)}</span>
    <!-- 2026-08 11라운드: AdSense 승인 완료(ca-pub-6290350430336608). 기획안(SEO 성장 및 애드센스
         운영 기획안 v1.0, 5.1절)이 권장하는 "후킹 콘텐츠 중간 1개" 위치와 정확히 일치.
         광고 유닛명: geugot_hook_middle (사용자가 2026-08-25 애드센스 대시보드에서 직접 발급받은
         실제 슬롯ID — 지어내지 않음). -->
    <div class="adBox"><ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6290350430336608"
     data-ad-slot="1400129963"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>
  </div>
${top5Html}
${castHtml}

  <h2 id="allLocations">${esc(L.ui.allList(displayTitle, w.locations.length))}</h2>
${locItems}
${cultureSectionHtml(w, locale)}

  <div class="adSlot">
    <span class="adLabel">${esc(L.ui.adLabel)}</span>
    <!-- 기획안 5.1절의 두 번째 권장 위치("본문 종료 후 지도/장소 탐색 CTA 직전/직후")와 일치.
         광고 유닛명: geugot_before_map -->
    <div class="adBox"><ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6290350430336608"
     data-ad-slot="4690683888"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>
  </div>
    </div>
  </details>` : `  <div class="adSlot">
    <span class="adLabel">${esc(L.ui.adLabel)}</span>
    <!-- 광고 유닛명: geugot_hook_middle (후킹 콘텐츠가 없는 작품은 이 위치가 본문 상단 역할) -->
    <div class="adBox"><ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6290350430336608"
     data-ad-slot="1400129963"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>
  </div>
${top5Html}
${castHtml}

  <h2 id="allLocations">${esc(L.ui.allList(displayTitle, w.locations.length))}</h2>
${locItems}
${cultureSectionHtml(w, locale)}

  <div class="adSlot">
    <span class="adLabel">${esc(L.ui.adLabel)}</span>
    <!-- 광고 유닛명: geugot_before_map -->
    <div class="adBox"><ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6290350430336608"
     data-ad-slot="4690683888"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>
  </div>`}

  <h2>${esc(L.ui.related)}</h2>
  <ul class="relatedList">
${related}
  </ul>
</main>
<footer>
  &copy; ${esc(L.ui.footerTag)}<br>
  ${L.ui.footerLinks.map(([slug, label]) => `<a href="${SITE_ORIGIN}/${slug}/">${esc(label)}</a>`).join('\n  ')}
</footer>
</body>
</html>
`;
}

/* ---------- 생성 실행 ---------- */
let count = 0;
Object.keys(LOCALES).forEach(locale => {
  const targets = (locale === 'ja') ? works.filter(jaAvailable)
    : ((locale === 'zh') ? works.filter(zhAvailable) : works);
  targets.forEach(w => {
    const dir = path.join(__dirname, LOCALES[locale].outDir, w.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderPage(w, locale), 'utf8');
    count++;
  });
  console.log(locale + ':', targets.length, 'pages');
});
console.log('total generated:', count);

/* ---------- sitemap.xml (2단계 4-5: 다국어 sitemap) ---------- */
function urlEntry(loc, lastmod, changefreq, priority){
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
const entries = [
  urlEntry(`${SITE_ORIGIN}/`, TODAY, 'weekly', '1.0'),
  urlEntry(`${SITE_ORIGIN}/en/`, TODAY, 'weekly', '0.8'),
  urlEntry(`${SITE_ORIGIN}/ja/`, TODAY, 'weekly', '0.8'),
  urlEntry(`${SITE_ORIGIN}/zh/`, TODAY, 'weekly', '0.8'),
  urlEntry(`${SITE_ORIGIN}/about/`, '2026-08-06', 'monthly', '0.4'),
  urlEntry(`${SITE_ORIGIN}/contact/`, '2026-08-06', 'monthly', '0.3')
];
works.forEach(w => entries.push(urlEntry(`${SITE_ORIGIN}/works/${w.id}/`, TODAY, 'weekly', '0.8')));
works.forEach(w => entries.push(urlEntry(`${SITE_ORIGIN}/en/works/${w.id}/`, TODAY, 'weekly', '0.6')));
works.filter(jaAvailable).forEach(w => entries.push(urlEntry(`${SITE_ORIGIN}/ja/works/${w.id}/`, TODAY, 'weekly', '0.6')));
works.filter(zhAvailable).forEach(w => entries.push(urlEntry(`${SITE_ORIGIN}/zh/works/${w.id}/`, TODAY, 'weekly', '0.6')));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  그곳, 지금 다국어 사이트맵 (2026-08 2단계 4-5).
  ko(기존 URL 유지) + /en/(전 작품) + /ja/(일본어 번역 완료 작품만)을 등록합니다.
  각 페이지 head의 hreflang 상호 링크가 언어 관계를 알려주므로, 사이트맵에는 URL만 나열합니다.
  ?work= 주소는 SPA 진입점으로 계속 동작하지만 검색 대표 URL이 아니므로 넣지 않습니다.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');
console.log('sitemap.xml:', entries.length, 'urls');
