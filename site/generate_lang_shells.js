// 언어 셸 생성기 (2026-08 2단계 4-1: 한/영/일 URL·라우팅 아키텍처)
//
// 무엇을 만드는가: index.html(한국어 원본)을 읽어 en/index.html, ja/index.html 두 개의
// "언어 셸"을 생성한다. 앱 본체(app.js)는 URL 경로(/en/, /ja/)를 보고 언어를 스스로
// 결정하므로, 셸이 하는 일은 검색엔진과 SNS가 보는 정적인 부분을 언어에 맞추는 것이다:
//   - <html lang>, <title>, description, OG/트위터 메타, og:locale
//   - canonical(언어별 self-canonical) + hreflang 상호 링크
//   - 상대경로 자산(css/js)을 절대경로로 교체 (/en/ 하위에서 ../ 없이 로드되도록)
//
// 왜 손으로 복사본을 관리하지 않는가: index.html이 바뀔 때마다(작품 추가 = script 태그 추가)
// 세 벌을 손으로 동기화하면 반드시 어긋난다. 이 생성기를 배포 전에 한 번 실행하는 것으로
// 단일 원본(index.html) 원칙을 유지한다. 실행: node generate_lang_shells.js
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://geugotjigeum.com';

const LANG_META = {
  en: {
    htmlLang: 'en',
    title: 'That Place, Now | Filming Locations & Story Pilgrimage Map',
    description: 'Explore real filming locations and story settings from K-dramas, films, anime and novels — on one interactive map with travel tips.',
    ogLocale: 'en_US',
    canonical: SITE_ORIGIN + '/en/'
  },
  ja: {
    htmlLang: 'ja',
    title: 'あの場所、いま | 韓国ドラマ・映画・アニメの聖地巡礼マップ',
    description: '韓国ドラマ・映画・アニメ・小説のロケ地と舞台を、ひとつの地図で。実際に行ける場所と旅のヒントを紹介します。',
    ogLocale: 'ja_JP',
    canonical: SITE_ORIGIN + '/ja/'
  },
  // 2026-08 3단계: 번체 중문(대만·홍콩) 셸 추가 — ogLocale은 대만 기준(zh_TW),
  // hreflang은 번체·간체 어느 지역에서 검색해도 잡히도록 zh-Hant(스크립트 기준) 사용.
  zh: {
    htmlLang: 'zh-Hant',
    title: '那個地方，現在 | 韓劇・電影・動畫拍攝地與故事場景地圖',
    description: '在一張地圖上探索韓劇、電影、動畫、小說中的真實拍攝地與故事場景，附旅遊小提示。',
    ogLocale: 'zh_TW',
    canonical: SITE_ORIGIN + '/zh/'
  }
};

const HREFLANG_BLOCK = [
  '<link rel="alternate" hreflang="ko" href="' + SITE_ORIGIN + '/">',
  '<link rel="alternate" hreflang="en" href="' + SITE_ORIGIN + '/en/">',
  '<link rel="alternate" hreflang="ja" href="' + SITE_ORIGIN + '/ja/">',
  '<link rel="alternate" hreflang="zh-Hant" href="' + SITE_ORIGIN + '/zh/">',
  '<link rel="alternate" hreflang="x-default" href="' + SITE_ORIGIN + '/">'
].join('\n');

const src = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function buildShell(lang){
  const m = LANG_META[lang];
  let html = src;

  // <html lang>
  html = html.replace('<html lang="ko">', '<html lang="' + m.htmlLang + '">');

  // title / description (head의 <title>과 name="description"만 — 본문은 앱이 그린다)
  html = html.replace(/<title>[^<]*<\/title>/, '<title>' + m.title + '</title>');
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*>/,
    '<meta\n  name="description"\n  content="' + m.description + '"\n>'
  );

  // canonical → 언어별 self-canonical
  html = html.replace(
    '<link rel="canonical" href="' + SITE_ORIGIN + '/">',
    '<link rel="canonical" href="' + m.canonical + '">'
  );

  // hreflang 블록은 ko 원본에 이미 있으므로 그대로 유지된다(세 셸 모두 동일 클러스터 — 규격상 올바름).

  // OG/트위터
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*>/, '<meta\n  property="og:title"\n  content="' + m.title + '"\n>');
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*>/, '<meta\n  property="og:description"\n  content="' + m.description + '"\n>');
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*>/, '<meta\n  property="og:url"\n  content="' + m.canonical + '"\n>');
  html = html.replace('<meta property="og:locale" content="ko_KR">', '<meta property="og:locale" content="' + m.ogLocale + '">');
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*>/, '<meta\n  name="twitter:title"\n  content="' + m.title + '"\n>');
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*>/, '<meta\n  name="twitter:description"\n  content="' + m.description + '"\n>');

  // 상대경로 자산 → 절대경로 (/en/ 아래에서 /en/contentmap_app.js 를 찾지 않도록).
  // http(s)://, //, / 로 시작하지 않는 src/href 중 로컬 파일(js/css)만 바꾼다.
  html = html.replace(/(src|href)="(?!https?:\/\/|\/\/|\/|#|mailto:)([^"]+\.(?:js|css))"/g, '$1="/$2"');

  // 언어 토글 초기 active 표시를 이 셸의 언어에 맞춘다(앱이 뜨기 전 첫 페인트 정합성).
  html = html.replace('<button data-lang="ko" class="active">KR</button>', '<button data-lang="ko">KR</button>');
  if (lang === 'en'){
    html = html.replace('<button data-lang="en">EN</button>', '<button data-lang="en" class="active">EN</button>');
  } else if (lang === 'ja'){
    html = html.replace('<button data-lang="ja">JP</button>', '<button data-lang="ja" class="active">JP</button>');
  } else if (lang === 'zh'){
    html = html.replace('<button data-lang="zh" id="langZhBtn">繁中</button>', '<button data-lang="zh" id="langZhBtn" class="active">繁中</button>');
  }

  return html;
}

['en', 'ja', 'zh'].forEach(function(lang){
  const dir = path.join(__dirname, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildShell(lang), 'utf8');
  console.log('generated', lang + '/index.html');
});
