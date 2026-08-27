// 지역×작품 롱테일 SEO 페이지 생성기 (2026-08)
//
// 무엇인가: "강릉 도깨비 촬영지"처럼 [지역명 + 작품명]으로 검색하는 사람들을 위한
// 지역 허브 페이지. 작품 허브 페이지(generate_work_pages.js)가 "작품 1개 → 그 작품의 장소 전체"를
// 보여준다면, 이 생성기는 반대 방향인 "지역 1곳 → 그 지역을 다루는 작품 전체"를 보여준다.
// 같은 정보를 다른 축으로 재구성해 새 URL·새 제목·새 검색 의도를 커버하는 게 핵심이라
// "롱테일"이라고 부른다 — 지역명은 작품명보다 검색량은 적지만(꼬리, tail) 그런 지역명 조합이
// 수백 개씩 있어서(long) 합산하면 무시할 수 없는 유입이 된다.
//
// 정확성 원칙 때문에 두 등급으로 나눠 만들었다(국내/국외 데이터 정밀도가 다름):
//   - 국가 단위(COUNTRY_REGION_DEFS, 28개국): 실제 위경도가 붙은 장소 단위(locIds)까지 정확히
//     매칭되므로, "이 나라의 어느 장소가 어느 작품에 나오는지" 카드 단위로 보여준다.
//   - 국내 시도/시군구 단위(REGION_DEFS): 원본 데이터에 장소 단위 매핑이 없고(작품 단위 집계만
//     존재), 텍스트 매칭으로 재구성을 시도했지만 정확도가 44%에 그쳐 신뢰할 수 없었다. 그래서
//     "이 지역과 연결된 작품 목록"까지만 정직하게 보여주고, 정확한 장소는 각 작품 페이지로
//     연결해 확인하도록 안내한다 — 없는 정밀도를 있는 것처럼 꾸미지 않는다.
//
// 입력: /tmp/seowork/regions_dump.json (dump_regions.js가 vm으로 REGION_DEFS/COUNTRY_REGION_DEFS/
//       WORKS/DATA를 평탄화한 스냅샷 — 세션마다 재생성 필요)
// 실행: node generate_region_pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 2026-08 Issue #10: 언어 전환/번역 준비상태 공통 헬퍼 — 다른 두 생성기(work/place)와 동일.
const I18N = (() => {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'contentmap_i18n.js'), 'utf8'), sandbox, { filename: 'contentmap_i18n.js' });
  return vm.runInContext('({ i18nStatus: i18nStatus, i18nUrl: i18nUrl, i18nSwitcherHtml: i18nSwitcherHtml, i18nHreflangBlock: i18nHreflangBlock })', sandbox);
})();

const SITE_ORIGIN = 'https://geugotjigeum.com';
const GA_ID = 'G-H2KNQYH97M';
const TODAY = '2026-08-20';

const dump = JSON.parse(fs.readFileSync('/tmp/seowork/regions_dump.json', 'utf8'));
const REGION_DEFS = dump.regionDefs;
const COUNTRY_REGION_DEFS = dump.countryRegionDefs;
const WORKS = dump.works;
const worksById = {};
WORKS.forEach(w => { worksById[w.id] = w; });

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

function jaAvailable(w){ return !!w.title_ja; }
function zhAvailable(w){ return !!w.title_zh; }
function titleFor(w, locale){
  if (locale === 'en') return w.title_en || w.title;
  if (locale === 'ja') return w.title_ja || w.title_en || w.title;
  if (locale === 'zh') return w.title_zh || w.title_en || w.title;
  return w.title;
}
// 2026-08 Issue #10: 예전엔 이 함수 자체가 ja/zh 미번역 작품을 en 허브로 조용히 돌려보냈다.
// 이제 이 함수는 판정 없이 순수 URL 조립만 하고, 호출부(renderDomesticPage 등)가 먼저
// I18N.i18nStatus로 확인한 뒤에만 호출한다.
function hubUrl(w, locale){
  return I18N.i18nUrl('work', w.id, locale, { origin: SITE_ORIGIN });
}
function mapUrl(w, locale, locId){
  const base = `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/?work=${encodeURIComponent(w.id)}`;
  return locId ? `${base}&loc=${encodeURIComponent(locId)}` : base;
}
function regionLabel(r, locale){
  if (locale === 'en') return r.label_en || r.label;
  if (locale === 'ja') return r.label_ja || r.label_en || r.label;
  if (locale === 'zh') return r.label_zh || r.label_en || r.label;
  return r.label;
}
// 2026-08 9라운드: generate_work_pages.js와 동일한 이유로 영문 페이지의 지명 이중표기
// ("킹스크로스역 (King's Cross Station)") 문제를 여기서도 고친다. UK/NZ 지역 페이지에서
// 확인됨.
function extractEnglishName(name){
  if (!name) return name;
  const m = name.match(/^(.*?)\s*[\(（]([^)）]+)[\)）]\s*$/);
  if (m && /[A-Za-z]/.test(m[2])) return m[2].trim();
  return name;
}
function locName(l, locale){
  if (locale === 'ja' && l.modernName_ja) return l.modernName_ja;
  if (locale === 'zh' && l.modernName_zh) return l.modernName_zh;
  if (locale === 'en') return l.modernName_en || extractEnglishName(l.modernName);
  return l.modernName;
}

const LOCALES = {
  ko: {
    htmlLang: 'ko', ogLocale: 'ko_KR', urlPrefix: '', outDir: 'regions', siteName: '그곳, 지금',
    ui: {
      backLink: '🏠 홈', kicker: '지역으로 찾기',
      countryHeading: (label, n) => `${label}에서 실제로 다녀올 수 있는 장소 ${n}곳`,
      countryIntro: label => `그곳, 지금에 등록된 작품 중 ${label}을(를) 배경으로 하거나 실제로 촬영한 장소를 작품별로 모았습니다.`,
      domesticHeading: (label, n) => `${label}과(와) 연결된 작품 ${n}편`,
      domesticIntro: label => `${label}을(를) 무대로 하거나 실제로 촬영한 작품들입니다. 정확한 촬영 장소와 주소는 각 작품 페이지에서 확인하세요.`,
      childrenHeading: '세부 지역',
      worksHeading: '연결된 작품',
      locationsHeading: '작품별 실제 장소',
      workCta: t => `${t} 지도에서 보기 →`,
      locCta: '지도에서 이 장소 보기 →',
      hubTitle: '지역으로 촬영지 찾기',
      hubIntro: '나라별로는 실제 촬영 장소까지, 국내 지역별로는 연결된 작품까지 확인할 수 있어요.',
      hubCountries: '나라별 촬영지',
      hubDomestic: '국내 지역별 작품',
      breadcrumbHub: '지역',
      footerTag: '그곳, 지금 — 이야기 속 장소를 실제로 가볼 수 있는 개인 여행지도 블로그',
      footerLinks: [['about','서비스 소개'],['places','장소로 찾기'],['contact','문의'],['privacy','개인정보처리방침'],['terms','이용약관']]
    }
  },
  en: {
    htmlLang: 'en', ogLocale: 'en_US', urlPrefix: '/en', outDir: 'en/regions', siteName: 'That Place, Now',
    ui: {
      backLink: '🏠 Home', kicker: 'Browse by region',
      countryHeading: (label, n) => `${n} real places you can visit in ${label}`,
      countryIntro: label => `Real filming locations and story settings in ${label}, gathered from every story on That Place, Now.`,
      domesticHeading: (label, n) => `${n} stories connected to ${label}`,
      domesticIntro: label => `Stories set in or filmed around ${label}. For exact filming spots and addresses, check each story's page below.`,
      childrenHeading: 'Sub-regions',
      worksHeading: 'Connected stories',
      locationsHeading: 'Real places by story',
      workCta: t => `View ${t} on the map →`,
      locCta: 'View this place on the map →',
      hubTitle: 'Find filming locations by region',
      hubIntro: 'Countries link to exact filming locations; domestic regions link to the connected stories.',
      hubCountries: 'By country',
      hubDomestic: 'By region (Korea)',
      breadcrumbHub: 'Regions',
      footerTag: 'That Place, Now — a personal travel-map blog connecting stories to the real places behind them',
      footerLinks: [['about','About'],['contact','Contact'],['privacy','Privacy'],['terms','Terms']]
    }
  },
  ja: {
    htmlLang: 'ja', ogLocale: 'ja_JP', urlPrefix: '/ja', outDir: 'ja/regions', siteName: 'あの場所、いま',
    ui: {
      backLink: '🏠 ホーム', kicker: '地域で探す',
      countryHeading: (label, n) => `${label}で実際に訪れられる場所 ${n}か所`,
      countryIntro: label => `あの場所、いまに登録された作品のうち、${label}を舞台にしたり実際に撮影した場所を作品別にまとめました。`,
      domesticHeading: (label, n) => `${label}とつながる作品 ${n}本`,
      domesticIntro: label => `${label}を舞台にしたり実際に撮影した作品です。正確なロケ地・住所は各作品ページでご確認ください。`,
      childrenHeading: '細分地域',
      worksHeading: 'つながる作品',
      locationsHeading: '作品別の実際の場所',
      workCta: t => `${t}を地図で見る →`,
      locCta: 'この場所を地図で見る →',
      hubTitle: '地域でロケ地を探す',
      hubIntro: '国別は実際のロケ地まで、韓国国内の地域別はつながる作品まで確認できます。',
      hubCountries: '国別ロケ地',
      hubDomestic: '国内地域別の作品',
      breadcrumbHub: '地域',
      footerTag: 'あの場所、いま — 物語と現実の場所をつなぐ個人の旅行マップブログ',
      footerLinks: [['about','サービス紹介'],['contact','お問い合わせ'],['privacy','プライバシーポリシー'],['terms','利用規約']]
    }
  },
  zh: {
    htmlLang: 'zh-Hant', ogLocale: 'zh_TW', urlPrefix: '/zh', outDir: 'zh/regions', siteName: '那個地方，現在',
    ui: {
      backLink: '🏠 首頁', kicker: '依地區尋找',
      countryHeading: (label, n) => `在${label}可以實際造訪的${n}個地方`,
      countryIntro: label => `從「那個地方，現在」收錄的所有作品中，整理出以${label}為背景或實際在此拍攝的地點。`,
      domesticHeading: (label, n) => `與${label}相關的${n}部作品`,
      domesticIntro: label => `以${label}為舞台或實際在此拍攝的作品。確切的拍攝地點與地址請至各作品頁面確認。`,
      childrenHeading: '細分地區',
      worksHeading: '相關作品',
      locationsHeading: '各作品的實際地點',
      workCta: t => `在地圖上查看${t} →`,
      locCta: '在地圖上查看此地點 →',
      hubTitle: '依地區尋找拍攝地',
      hubIntro: '各國家可查看確切拍攝地點，韓國國內各地區可查看相關作品。',
      hubCountries: '依國家',
      hubDomestic: '依韓國地區',
      breadcrumbHub: '地區',
      footerTag: '那個地方，現在 — 連結故事與真實地點的個人旅行地圖部落格',
      footerLinks: [['about','關於'],['contact','聯絡我們'],['privacy','隱私權政策'],['terms','服務條款']]
    }
  }
};

const SHARED_CSS = `
  :root{ --ink:#1c1f26; --sub:#5b6270; --line:#e4e6eb; --accent:#e0603a; --accent2:#3a7ce0; }
  *{box-sizing:border-box;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","Malgun Gothic",sans-serif;color:var(--ink);line-height:1.7;background:#fff;}
  .wsHeader{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--line);background:#fff;position:sticky;top:0;z-index:5;}
  .wsHeader a.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--ink);text-decoration:none;}
  .wsHeader a.brand .brand-logo{width:28px;height:28px;flex-shrink:0;}
  .wsHeader a.backLink{font-size:13.5px;color:var(--accent2);text-decoration:none;font-weight:600;}
  .wsHeader a.backLink:hover{text-decoration:underline;}
  .wsLangs{display:flex;align-items:center;background:#f2f3f5;border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px;font-size:12.5px;}
  .wsLangs a{color:var(--sub);text-decoration:none;padding:4px 9px;border-radius:999px;}
  .wsLangs a.on{color:#fff;background:var(--accent2);font-weight:700;}
  main{max-width:760px;margin:0 auto;padding:32px 20px 60px;}
  .kicker{font-size:12.5px;font-weight:700;color:var(--accent2);letter-spacing:.02em;margin:0 0 8px;}
  .breadcrumb{font-size:12.5px;color:var(--sub);margin:0 0 10px;}
  .breadcrumb a{color:var(--sub);text-decoration:none;}
  .breadcrumb a:hover{text-decoration:underline;}
  h1{font-size:24px;line-height:1.4;margin:0 0 12px;}
  .intro{font-size:15.5px;color:#333;margin:0 0 24px;}
  .noteBox{background:#f6f7f9;border:1px solid var(--line);border-radius:12px;padding:14px 16px;font-size:13.5px;color:var(--sub);margin:0 0 26px;}
  h2{font-size:18px;margin:32px 0 14px;padding-top:8px;border-top:1px solid var(--line);}
  .chipRow{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;}
  .regionChip{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;color:var(--ink);background:#f6f7f9;border:1px solid var(--line);border-radius:999px;padding:8px 14px;text-decoration:none;}
  .regionChip:hover{border-color:var(--accent2);color:var(--accent2);}
  .regionChip .cnt{color:var(--sub);font-weight:500;}
  .workCard{display:block;padding:16px 18px;border:1px solid var(--line);border-radius:12px;margin-bottom:12px;text-decoration:none;color:inherit;transition:border-color .15s ease,background .15s ease;}
  .workCard:hover{border-color:#d5d9e0;background:#fafbfc;}
  .workCard h3{font-size:16px;margin:0 0 6px;color:var(--ink);}
  .workCard p{font-size:13.5px;color:var(--sub);margin:0 0 8px;}
  .workCard .cta{font-size:13px;font-weight:600;color:var(--accent2);}
  .locGroup{margin-bottom:26px;}
  .locGroup > a.groupTitle{display:inline-block;font-size:16px;font-weight:700;color:var(--ink);text-decoration:none;margin-bottom:10px;}
  .locGroup > a.groupTitle:hover{color:var(--accent2);}
  .locCard{display:block;padding:14px 16px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;text-decoration:none;color:inherit;}
  .locCard:hover{border-color:#d5d9e0;background:#fafbfc;}
  .locCard h4{font-size:14.5px;margin:0 0 4px;color:var(--ink);}
  .locCard p{font-size:13px;color:var(--sub);margin:0;}
  .locCard .cta{font-size:12.5px;font-weight:600;color:var(--accent2);margin-top:6px;display:inline-block;}
  footer{max-width:760px;margin:0 auto;padding:20px;color:var(--sub);font-size:13px;border-top:1px solid var(--line);}
  footer a{color:var(--sub);text-decoration:underline;margin-right:14px;}
  footer a:hover{color:var(--accent2);}
  .hubSection{margin-bottom:36px;}
  @media (max-width:480px){
    .wsHeader{padding:11px 16px;flex-wrap:wrap;gap:6px;}
    main{padding:22px 16px 48px;}
    h1{font-size:20px;}
    .workCard{padding:13px 14px;}
  }
`;

function pageShell(locale, opts){
  const L = LOCALES[locale];
  const langLinksHtml = opts.langLinks ? `<nav class="wsLangs" aria-label="Languages">${opts.langLinks}</nav>` : '';
  return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
<link rel="canonical" href="${opts.canonicalUrl}">
${opts.hreflang || ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(L.siteName)}">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${opts.canonicalUrl}">
<meta property="og:locale" content="${L.ogLocale}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(opts.title)}">
<meta name="twitter:description" content="${esc(opts.description)}">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
<style>${SHARED_CSS}</style>
${opts.jsonLd || ''}
</head>
<body>
<header class="wsHeader">
  <a class="brand" href="${SITE_ORIGIN}${L.urlPrefix}/">
    ${BRAND_LOGO_SVG}
    <span>${esc(L.siteName)}</span>
  </a>
  ${langLinksHtml}
  <a class="backLink" href="${SITE_ORIGIN}${L.urlPrefix}/">${esc(L.ui.backLink)}</a>
</header>
<main>
${opts.body}
</main>
<footer>
  &copy; ${esc(L.ui.footerTag)}<br>
  ${L.ui.footerLinks.map(([slug, label]) => `<a href="${SITE_ORIGIN}/${slug}/">${esc(label)}</a>`).join('\n  ')}
</footer>
</body>
</html>
`;
}

function jsonLdScript(obj){ return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`; }
function breadcrumbLd(locale, h1, canonicalUrl){
  const L = LOCALES[locale];
  return jsonLdScript({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: L.siteName, item: `${SITE_ORIGIN}${L.urlPrefix}/` },
      { '@type': 'ListItem', position: 2, name: L.ui.breadcrumbHub, item: `${SITE_ORIGIN}${L.urlPrefix}/regions/` },
      { '@type': 'ListItem', position: 3, name: h1, item: canonicalUrl }
    ]
  });
}
function regionLangLinks(regionId, locale){
  const links = ['ko','en','ja','zh'].map(loc => {
    const url = `${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/regions/${regionId}/`;
    const label = { ko: 'KR', en: 'EN', ja: 'JP', zh: '繁中' }[loc];
    return `<a href="${url}"${loc === locale ? ' class="on"' : ''}>${label}</a>`;
  });
  return links.join('\n    ');
}
function regionHreflang(regionId){
  return ['ko','en','ja'].map(loc =>
    `<link rel="alternate" hreflang="${loc}" href="${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/regions/${regionId}/">`
  ).join('\n')
    + `\n<link rel="alternate" hreflang="zh-Hant" href="${SITE_ORIGIN}${LOCALES.zh.urlPrefix}/regions/${regionId}/">`
    + `\n<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/regions/${regionId}/">`;
}

/* ---------- 국가 페이지 (COUNTRY_REGION_DEFS — locIds 기반, 장소 단위 정밀 매칭) ---------- */
function buildCountryGroups(country){
  // "workId::locId" 문자열을 실제 work/location 객체로 되돌린다. 매칭 안 되는 항목(데이터 드리프트)은
  // 조용히 건너뛴다 — 없는 장소를 지어내지 않기 위해서다.
  const byWork = {};
  (country.locIds || []).forEach(pair => {
    const idx = pair.indexOf('::');
    if (idx === -1) return;
    const workId = pair.slice(0, idx), locId = pair.slice(idx + 2);
    const w = worksById[workId];
    if (!w) return;
    const loc = (w.locations || []).find(l => l.id === locId);
    if (!loc) return;
    if (!byWork[workId]) byWork[workId] = [];
    byWork[workId].push(loc);
  });
  // WORKS[] 등장 순서를 유지 (관련작품 추천 등 사이트 다른 곳과 동일한 원칙)
  return WORKS.filter(w => byWork[w.id]).map(w => ({ work: w, locs: byWork[w.id] }));
}

function renderCountryPage(country, locale){
  const L = LOCALES[locale];
  const label = regionLabel(country, locale);
  // 2026-08 Issue #10: 작품 그룹 제목 링크(groupTitle)도 이 언어로 발행된 작품만 대상으로 한다.
  const groups = buildCountryGroups(country).filter(g => I18N.i18nStatus('work', g.work, locale) === 'published');
  const totalLocs = groups.reduce((sum, g) => sum + g.locs.length, 0);
  const canonicalUrl = `${SITE_ORIGIN}${L.urlPrefix}/regions/${country.id}/`;
  const h1 = L.ui.countryHeading(label, totalLocs);
  const description = L.ui.countryIntro(label);

  const groupsHtml = groups.map(g => {
    const t = titleFor(g.work, locale);
    const locCards = g.locs.map(l => `      <a class="locCard" href="${esc(mapUrl(g.work, locale, l.id))}">
        <h4>${esc(locName(l, locale))}</h4>
        <p>${esc(l.tag || '')}</p>
        <span class="cta">${esc(L.ui.locCta)}</span>
      </a>`).join('\n');
    return `  <div class="locGroup">
    <a class="groupTitle" href="${esc(hubUrl(g.work, locale))}">${esc(t)} (${g.locs.length})</a>
${locCards}
  </div>`;
  }).join('\n');

  const jsonLd = breadcrumbLd(locale, h1, canonicalUrl);
  const body = `  <p class="kicker">${esc(L.ui.kicker)}</p>
  <p class="breadcrumb"><a href="${SITE_ORIGIN}${L.urlPrefix}/regions/">${esc(L.ui.breadcrumbHub)}</a> / ${esc(label)}</p>
  <h1>${esc(h1)}</h1>
  <p class="intro">${esc(description)}</p>
  <h2>${esc(L.ui.locationsHeading)}</h2>
${groupsHtml}`;

  return pageShell(locale, {
    title: `${label} ${locale === 'ko' ? '촬영지' : locale === 'ja' ? 'ロケ地' : locale === 'zh' ? '拍攝地' : 'filming locations'} — ${L.siteName}`,
    description, canonicalUrl,
    hreflang: regionHreflang(country.id),
    langLinks: regionLangLinks(country.id, locale),
    jsonLd, body
  });
}

/* ---------- 국내 지역 페이지 (REGION_DEFS — workIds 단위, 작품 연결만 정직하게 표시) ---------- */
function renderDomesticPage(region, locale, parent){
  const L = LOCALES[locale];
  const label = regionLabel(region, locale);
  // 2026-08 Issue #10: 이 지역 페이지 언어로 발행되지 않은 작품은 목록에서 뺀다 — 예전에는
  // 여기서도 hubUrl()의 en 폴백에 기대 링크를 만들었는데, 그러면 ja/zh 지역 페이지에서 미번역
  // 작품 카드를 눌렀을 때 영어 페이지가 조용히 뜨는 동일한 문제가 있었다.
  const works = WORKS.filter(w => (region.workIds || []).includes(w.id) && I18N.i18nStatus('work', w, locale) === 'published');
  const canonicalUrl = `${SITE_ORIGIN}${L.urlPrefix}/regions/${region.id}/`;
  const h1 = L.ui.domesticHeading(label, works.length);
  const description = L.ui.domesticIntro(label);

  const childrenHtml = (region.children && region.children.length)
    ? `  <h2>${esc(L.ui.childrenHeading)}</h2>
  <div class="chipRow">
${region.children.map(c => `    <a class="regionChip" href="${SITE_ORIGIN}${L.urlPrefix}/regions/${c.id}/">${esc(regionLabel(c, locale))} <span class="cnt">(${c.count})</span></a>`).join('\n')}
  </div>` : '';

  const worksHtml = works.map(w => {
    const t = titleFor(w, locale);
    const summaryText = (locale === 'ja' && w.summary_ja) ? w.summary_ja : ((locale === 'zh' && w.summary_zh) ? w.summary_zh : ((locale === 'en' || locale === 'zh') && w.summary_en) ? w.summary_en : w.summary);
    return `  <a class="workCard" href="${esc(hubUrl(w, locale))}">
    <h3>${esc(t)}</h3>
    ${summaryText ? `<p>${esc(summaryText.length > 90 ? summaryText.slice(0, 88) + '…' : summaryText)}</p>` : ''}
    <span class="cta">${esc(L.ui.workCta(t))}</span>
  </a>`;
  }).join('\n');

  const breadcrumbMid = parent ? `<a href="${SITE_ORIGIN}${L.urlPrefix}/regions/${parent.id}/">${esc(regionLabel(parent, locale))}</a> / ` : '';
  const jsonLd = breadcrumbLd(locale, h1, canonicalUrl);
  const body = `  <p class="kicker">${esc(L.ui.kicker)}</p>
  <p class="breadcrumb"><a href="${SITE_ORIGIN}${L.urlPrefix}/regions/">${esc(L.ui.breadcrumbHub)}</a> / ${breadcrumbMid}${esc(label)}</p>
  <h1>${esc(h1)}</h1>
  <p class="intro">${esc(description)}</p>
${childrenHtml}
  <h2>${esc(L.ui.worksHeading)}</h2>
${worksHtml || `  <p class="intro">—</p>`}`;

  return pageShell(locale, {
    title: `${label} ${locale === 'ko' ? '촬영지·배경 작품' : locale === 'ja' ? 'ロケ地・関連作品' : locale === 'zh' ? '拍攝地・相關作品' : 'connected stories'} — ${L.siteName}`,
    description, canonicalUrl,
    hreflang: regionHreflang(region.id),
    langLinks: regionLangLinks(region.id, locale),
    jsonLd, body
  });
}

/* ---------- 허브 페이지 /regions/ ---------- */
function renderHubPage(locale){
  const L = LOCALES[locale];
  const canonicalUrl = `${SITE_ORIGIN}${L.urlPrefix}/regions/`;
  // 2026-08 9라운드: 예전엔 여기서 country.locIds.length(검증 안 된 원시 개수, 예: 일본 214)를
  // 그대로 썼는데, /regions/country-japan/ 페이지는 buildCountryGroups()로 실제 work/location에
  // 매칭 안 되는 항목(데이터 드리프트)을 걸러낸 검증된 개수(212)를 썼다. 두 숫자가 서로 달라 신뢰도
  // 문제가 됐다는 기획자 지적 — 허브 페이지도 동일한 검증 로직을 쓰도록 통일한다.
  const countryChips = COUNTRY_REGION_DEFS
    .map(c => ({ c, validatedCount: buildCountryGroups(c).reduce((sum, g) => sum + g.locs.length, 0) }))
    .sort((a, b) => b.validatedCount - a.validatedCount)
    .map(({ c, validatedCount }) => `    <a class="regionChip" href="${SITE_ORIGIN}${L.urlPrefix}/regions/${c.id}/">${esc(regionLabel(c, locale))} <span class="cnt">(${validatedCount})</span></a>`)
    .join('\n');
  const domesticHtml = REGION_DEFS.map(r => {
    const childChips = (r.children && r.children.length)
      ? `<div class="chipRow" style="margin-left:4px;">${r.children.map(c => `<a class="regionChip" href="${SITE_ORIGIN}${L.urlPrefix}/regions/${c.id}/">${esc(regionLabel(c, locale))} <span class="cnt">(${c.count})</span></a>`).join('\n')}</div>`
      : '';
    return `  <div style="margin-bottom:16px;">
    <a class="regionChip" style="font-weight:800;" href="${SITE_ORIGIN}${L.urlPrefix}/regions/${r.id}/">${esc(regionLabel(r, locale))} <span class="cnt">(${r.count})</span></a>
    ${childChips}
  </div>`;
  }).join('\n');

  const jsonLd = jsonLdScript({
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: L.ui.hubTitle, url: canonicalUrl
  });
  const body = `  <p class="kicker">${esc(L.ui.kicker)}</p>
  <h1>${esc(L.ui.hubTitle)}</h1>
  <p class="intro">${esc(L.ui.hubIntro)}</p>
  <div class="hubSection">
    <h2>${esc(L.ui.hubCountries)}</h2>
    <div class="chipRow">
${countryChips}
    </div>
  </div>
  <div class="hubSection">
    <h2>${esc(L.ui.hubDomestic)}</h2>
${domesticHtml}
  </div>`;

  return pageShell(locale, {
    title: `${L.ui.hubTitle} — ${L.siteName}`, description: L.ui.hubIntro, canonicalUrl,
    hreflang: ['ko','en','ja'].map(loc => `<link rel="alternate" hreflang="${loc}" href="${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/regions/">`).join('\n')
      + `\n<link rel="alternate" hreflang="zh-Hant" href="${SITE_ORIGIN}${LOCALES.zh.urlPrefix}/regions/">`
      + `\n<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/regions/">`,
    langLinks: ['ko','en','ja','zh'].map(loc => `<a href="${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/regions/"${loc === locale ? ' class="on"' : ''}>${{ko:'KR',en:'EN',ja:'JP',zh:'繁中'}[loc]}</a>`).join('\n    '),
    jsonLd, body
  });
}

/* ---------- 생성 실행 ---------- */
let count = 0;
const allRegionIds = [];
Object.keys(LOCALES).forEach(locale => {
  const L = LOCALES[locale];
  const baseDir = path.join(__dirname, L.outDir);

  // 허브 페이지
  fs.mkdirSync(baseDir, { recursive: true });
  fs.writeFileSync(path.join(baseDir, 'index.html'), renderHubPage(locale), 'utf8');
  count++;

  // 국가 페이지
  COUNTRY_REGION_DEFS.forEach(country => {
    const dir = path.join(baseDir, country.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderCountryPage(country, locale), 'utf8');
    if (locale === 'ko') allRegionIds.push(country.id);
    count++;
  });

  // 국내 지역 페이지 (부모 + 자식)
  REGION_DEFS.forEach(region => {
    const dir = path.join(baseDir, region.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderDomesticPage(region, locale, null), 'utf8');
    if (locale === 'ko') allRegionIds.push(region.id);
    count++;
    (region.children || []).forEach(child => {
      const cdir = path.join(baseDir, child.id);
      fs.mkdirSync(cdir, { recursive: true });
      fs.writeFileSync(path.join(cdir, 'index.html'), renderDomesticPage(child, locale, region), 'utf8');
      if (locale === 'ko') allRegionIds.push(child.id);
      count++;
    });
  });

  console.log(locale + ':', 1 + COUNTRY_REGION_DEFS.length + REGION_DEFS.length + REGION_DEFS.reduce((s, r) => s + (r.children ? r.children.length : 0), 0), 'pages');
});
console.log('total region pages generated:', count);

/* ---------- sitemap.xml에 지역 페이지 URL 추가 (기존 항목은 유지, 지역 URL만 삽입) ---------- */
function urlEntry(loc, lastmod, changefreq, priority){
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (fs.existsSync(sitemapPath)){
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (sitemap.indexOf('/regions/') === -1){
    const entries = [];
    entries.push(urlEntry(`${SITE_ORIGIN}/regions/`, TODAY, 'weekly', '0.7'));
    entries.push(urlEntry(`${SITE_ORIGIN}/en/regions/`, TODAY, 'weekly', '0.5'));
    entries.push(urlEntry(`${SITE_ORIGIN}/ja/regions/`, TODAY, 'weekly', '0.5'));
    entries.push(urlEntry(`${SITE_ORIGIN}/zh/regions/`, TODAY, 'weekly', '0.5'));
    allRegionIds.forEach(id => {
      entries.push(urlEntry(`${SITE_ORIGIN}/regions/${id}/`, TODAY, 'weekly', '0.6'));
      entries.push(urlEntry(`${SITE_ORIGIN}/en/regions/${id}/`, TODAY, 'weekly', '0.4'));
      entries.push(urlEntry(`${SITE_ORIGIN}/ja/regions/${id}/`, TODAY, 'weekly', '0.4'));
      entries.push(urlEntry(`${SITE_ORIGIN}/zh/regions/${id}/`, TODAY, 'weekly', '0.4'));
    });
    sitemap = sitemap.replace('</urlset>', entries.join('\n') + '\n</urlset>\n');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('sitemap.xml: +', entries.length, 'region urls');
  } else {
    console.log('sitemap.xml: region urls already present, skipped');
  }
} else {
  console.log('sitemap.xml not found — skipped (run generate_work_pages.js first)');
}
