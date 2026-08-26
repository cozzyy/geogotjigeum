// "작품 속 진짜 한국" 문화 콘텐츠 정적 페이지 생성기 (2026-08, 기획자 제안 4번)
//
// 무엇을 만드는가: contentmap_culture.js의 CULTURE_TOPICS를 읽어 /culture/ 허브 페이지와
// /culture/{topicId}/ 개별 주제 페이지를 생성한다. 촬영지 좌표(장소 페이지)나 작품 소개
// (작품 페이지)와 달리, 장면 속에 자연스럽게 녹아있는 한국 문화를 외국인 관점에서 설명하는
// 콘텐츠 — 검색 의도가 "이 장면이 어디서 찍혔나"가 아니라 "이 장면이 왜 저런가"에 가깝다.
//
// 1차 범위(2026-08): ko/en 2개 언어만 생성한다. ja/zh 번역은 대표 작품에만 선별 적용하는
// 정책([[geugotjigeum_project]] 참고)과 마찬가지로, 이 신규 콘텐츠 유형도 먼저 ko/en으로
// 검증한 뒤 확장 여부를 판단한다.
//
// 입력: contentmap_culture.js(CULTURE_TOPICS, vm으로 직접 로드) + /tmp/seowork/works_dump.json
//       (관련 작품 제목·허브 URL 조회용 — 세션마다 재생성되므로 generate_work_pages.js보다
//       먼저 dump.js를 실행해 둬야 한다)
// 실행: node generate_culture_pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE_ORIGIN = 'https://geugotjigeum.com';
const GA_ID = 'G-H2KNQYH97M';
const TODAY = '2026-08-25';

// ---------- CULTURE_TOPICS 로드 (vm — 다른 생성기가 WORKS/DATA를 로드하는 것과 동일 방식) ----------
// 주의: vm.runInContext로 실행한 최상위 const/let은 sandbox 객체의 프로퍼티로 자동
// 반영되지 않는다(다른 생성기들의 WORKS/DATA 로드부와 동일한 함정). 그래서 로드 직후
// 별도 표현식으로 명시적으로 꺼내야 한다.
const cultureSandbox = {};
vm.createContext(cultureSandbox);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'contentmap_culture.js'), 'utf8'), cultureSandbox, { filename: 'contentmap_culture.js' });
const CULTURE_TOPICS = vm.runInContext('CULTURE_TOPICS', cultureSandbox);

// ---------- 관련 작품 제목/허브 URL 조회용 ----------
const worksDumpPath = '/tmp/seowork/works_dump.json';
const WORKS = fs.existsSync(worksDumpPath) ? JSON.parse(fs.readFileSync(worksDumpPath, 'utf8')) : [];
const worksById = {};
WORKS.forEach(w => { worksById[w.id] = w; });

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function titleFor(w, locale){
  if (locale === 'en') return w.title_en || w.title;
  return w.title;
}
function hubUrl(w, locale){
  const prefix = locale === 'en' ? '/en' : '';
  return `${SITE_ORIGIN}${prefix}/works/${w.id}/`;
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

const LOCALES = {
  ko: {
    htmlLang: 'ko', ogLocale: 'ko_KR', urlPrefix: '', outDir: 'culture', siteName: '그곳, 지금',
    ui: {
      backLink: '🏠 홈', kicker: '작품 속 진짜 한국',
      hubTitle: '작품 속 진짜 한국',
      hubSubtitle: '작품을 통해 한국 문화를 이해해 보세요.',
      hubIntro: '드라마·영화 속 한 장면에는 한국인에게는 너무 당연해서 설명할 필요조차 없었던 문화가 숨어 있습니다. 그 장면이 왜 그렇게 자연스러운지, 지금도 한국에서 흔히 볼 수 있는 모습인지 하나씩 짚어봅니다.',
      sceneLabel: '① 작품 속 장면',
      normalLabel: '② 한국 사람에게는 평범하지만…',
      cultureLabel: '③ 사실 이런 문화다',
      stillLabel: '④ 지금도 그런가?',
      relatedWorksLabel: '이 문화가 등장하는 작품',
      workCta: t => `${t} 지도에서 보기 →`,
      moreTopics: '다른 문화 이야기',
      breadcrumbHub: '작품 속 진짜 한국',
      footerTag: '그곳, 지금 — 이야기 속 장소를 실제로 가볼 수 있는 개인 여행지도 블로그',
      footerLinks: [['about','서비스 소개'],['places','장소로 찾기'],['regions','지역으로 찾기'],['contact','문의'],['privacy','개인정보처리방침'],['terms','이용약관']]
    }
  },
  en: {
    htmlLang: 'en', ogLocale: 'en_US', urlPrefix: '/en', outDir: 'en/culture', siteName: 'That Place, Now',
    ui: {
      backLink: '🏠 Home', kicker: 'The Real Korea Behind the Scene',
      hubTitle: 'The Real Korea Behind the Scene',
      hubSubtitle: 'Understand Korean culture through the stories you already love.',
      hubIntro: 'A single scene in a K-drama or film often carries a piece of everyday Korean life that\'s so ordinary to Koreans it never gets explained. Here we unpack why those scenes feel so natural — and whether you can still see them in Korea today.',
      sceneLabel: '① The Scene',
      normalLabel: '② Ordinary to Koreans, but…',
      cultureLabel: '③ Here\'s the Real Culture',
      stillLabel: '④ Is It Still True Today?',
      relatedWorksLabel: 'Stories featuring this culture',
      workCta: t => `View ${t} on the map →`,
      moreTopics: 'More culture notes',
      breadcrumbHub: 'The Real Korea Behind the Scene',
      footerTag: 'That Place, Now — a personal travel-map blog connecting stories to the real places behind them',
      footerLinks: [['about','About'],['contact','Contact'],['privacy','Privacy'],['terms','Terms']]
    }
  }
};

const SHARED_CSS = `
  :root{ --ink:#1c1f26; --sub:#5b6270; --line:#e4e6eb; --accent:#e0603a; --accent2:#3a7ce0; }
  *{box-sizing:border-box;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;color:var(--ink);line-height:1.75;background:#fff;}
  .wsHeader{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--line);background:#fff;position:sticky;top:0;z-index:5;}
  .wsHeader a.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--ink);text-decoration:none;}
  .wsHeader a.brand .brand-logo{width:28px;height:28px;flex-shrink:0;}
  .wsHeader a.backLink{font-size:13.5px;color:var(--accent2);text-decoration:none;font-weight:600;}
  .wsHeader a.backLink:hover{text-decoration:underline;}
  .wsLangs{display:flex;align-items:center;background:#f2f3f5;border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px;font-size:12.5px;}
  .wsLangs a{color:var(--sub);text-decoration:none;padding:4px 9px;border-radius:999px;}
  .wsLangs a.on{color:#fff;background:var(--accent2);font-weight:700;}
  main{max-width:720px;margin:0 auto;padding:32px 20px 60px;}
  .kicker{font-size:12.5px;font-weight:700;color:var(--accent2);letter-spacing:.02em;margin:0 0 8px;}
  .breadcrumb{font-size:12.5px;color:var(--sub);margin:0 0 10px;}
  .breadcrumb a{color:var(--sub);text-decoration:none;}
  .breadcrumb a:hover{text-decoration:underline;}
  h1{font-size:25px;line-height:1.4;margin:0 0 14px;}
  .hashRow{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 18px;}
  .hashRow span{font-size:12.5px;color:var(--accent2);background:#eef4fc;border-radius:999px;padding:4px 10px;}
  .heroImg{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin:0 0 26px;background:#f2f3f5;}
  .cBlock{margin:0 0 26px;padding:18px 20px;border:1px solid var(--line);border-radius:14px;background:#fafbfc;}
  .cBlock.scene{background:#fff8f2;border-color:#f3ddc9;}
  .cBlock.normal{background:#f6f7f9;}
  .cBlock.culture{background:#f0f7ff;border-color:#d6e6fb;}
  .cBlock.still{background:#f0fbf4;border-color:#cdeed9;}
  .cBlock h2{font-size:14.5px;margin:0 0 10px;color:var(--sub);font-weight:700;}
  .cBlock p{font-size:15.5px;color:#2a2d34;margin:0;}
  .relatedBox{margin:32px 0 0;padding-top:22px;border-top:1px solid var(--line);}
  .relatedBox h3{font-size:15px;margin:0 0 12px;}
  .workCard{display:block;padding:14px 16px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;text-decoration:none;color:inherit;}
  .workCard:hover{border-color:#d5d9e0;background:#fafbfc;}
  .workCard h4{font-size:15px;margin:0 0 4px;color:var(--ink);}
  .workCard .cta{font-size:13px;font-weight:600;color:var(--accent2);}
  .topicGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:20px 0 0;}
  .topicCard{display:block;text-decoration:none;color:inherit;border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:border-color .15s ease;}
  .topicCard:hover{border-color:var(--accent2);}
  .topicCard .tImg{width:100%;aspect-ratio:16/10;object-fit:cover;background:#f2f3f5;display:block;}
  .topicCard .tImgPlaceholder{width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,#f6f0e6,#eef4fc);display:flex;align-items:center;justify-content:center;font-size:34px;}
  .topicCard .tBody{padding:13px 14px;}
  .topicCard h3{font-size:14.5px;margin:0;color:var(--ink);line-height:1.5;}
  .hubIntro{font-size:15px;color:#333;margin:0 0 6px;}
  .hubSubtitle{font-size:14px;color:var(--sub);margin:0 0 16px;}
  footer{max-width:720px;margin:0 auto;padding:20px;color:var(--sub);font-size:13px;border-top:1px solid var(--line);}
  footer a{color:var(--sub);text-decoration:underline;margin-right:14px;}
  footer a:hover{color:var(--accent2);}
  @media (max-width:480px){
    .wsHeader{padding:11px 16px;flex-wrap:wrap;gap:6px;}
    main{padding:22px 16px 48px;}
    h1{font-size:21px;}
    .topicGrid{grid-template-columns:1fr;}
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
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(L.siteName)}">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${opts.canonicalUrl}">
${opts.ogImage ? `<meta property="og:image" content="${esc(opts.ogImage)}">` : ''}
<meta property="og:locale" content="${L.ogLocale}">
<meta name="twitter:card" content="summary${opts.ogImage ? '_large_image' : ''}">
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
function langLinks(topicId, locale){
  const links = ['ko','en'].map(loc => {
    const url = topicId ? `${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/culture/${topicId}/` : `${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/culture/`;
    const label = { ko: 'KR', en: 'EN' }[loc];
    return `<a href="${url}"${loc === locale ? ' class="on"' : ''}>${label}</a>`;
  });
  return links.join('\n    ');
}
function hreflangBlock(topicId){
  const path = topicId ? `culture/${topicId}/` : 'culture/';
  return ['ko','en'].map(loc =>
    `<link rel="alternate" hreflang="${loc}" href="${SITE_ORIGIN}${LOCALES[loc].urlPrefix}/${path}">`
  ).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/${path}">`;
}

function renderTopicPage(topic, locale){
  const L = LOCALES[locale];
  const t = topic[locale];
  const canonicalUrl = `${SITE_ORIGIN}${L.urlPrefix}/culture/${topic.id}/`;
  const relatedWorks = (topic.relatedWorkIds || []).map(id => worksById[id]).filter(Boolean);

  const relatedHtml = relatedWorks.length ? `  <div class="relatedBox">
    <h3>${esc(L.ui.relatedWorksLabel)}</h3>
${relatedWorks.map(w => `    <a class="workCard" href="${esc(hubUrl(w, locale))}">
      <h4>${esc(titleFor(w, locale))}</h4>
      <span class="cta">${esc(L.ui.workCta(titleFor(w, locale)))}</span>
    </a>`).join('\n')}
  </div>` : '';

  const otherTopics = CULTURE_TOPICS.filter(x => x.id !== topic.id).slice(0, 4);
  const moreHtml = `  <div class="relatedBox">
    <h3>${esc(L.ui.moreTopics)}</h3>
    <div class="topicGrid">
${otherTopics.map(x => renderTopicCard(x, locale)).join('\n')}
    </div>
  </div>`;

  const jsonLd = jsonLdScript({
    '@context': 'https://schema.org', '@type': 'Article',
    headline: t.title, url: canonicalUrl, inLanguage: L.htmlLang,
    publisher: { '@type': 'Organization', name: L.siteName }
  });

  const body = `  <p class="kicker">${esc(L.ui.kicker)}</p>
  <p class="breadcrumb"><a href="${SITE_ORIGIN}${L.urlPrefix}/culture/">${esc(L.ui.breadcrumbHub)}</a> / ${esc(t.title)}</p>
  <h1>${esc(t.title)}</h1>
  <div class="hashRow">${(topic.hashtags || []).map(h => `<span>#${esc(h)}</span>`).join('')}</div>
${topic.heroImage ? `  <img class="heroImg" src="${esc(topic.heroImage)}" alt="${esc(topic.heroImageAlt || t.title)}" loading="lazy">` : ''}
  <div class="cBlock scene"><h2>${esc(L.ui.sceneLabel)}</h2><p>${esc(t.sceneText)}</p></div>
  <div class="cBlock normal"><h2>${esc(L.ui.normalLabel)}</h2><p>${esc(t.normalText)}</p></div>
  <div class="cBlock culture"><h2>${esc(L.ui.cultureLabel)}</h2><p>${esc(t.cultureText)}</p></div>
  <div class="cBlock still"><h2>${esc(L.ui.stillLabel)}</h2><p>${esc(t.stillText)}</p></div>
${relatedHtml}
${moreHtml}`;

  return pageShell(locale, {
    title: `${t.title} — ${L.siteName}`,
    description: t.normalText.length > 150 ? t.normalText.slice(0, 148) + '…' : t.normalText,
    canonicalUrl,
    hreflang: hreflangBlock(topic.id),
    langLinks: langLinks(topic.id, locale),
    ogImage: topic.heroImage || '',
    jsonLd, body
  });
}

function renderTopicCard(topic, locale){
  const t = topic[locale];
  const url = `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/culture/${topic.id}/`;
  const img = topic.heroImage
    ? `<img class="tImg" src="${esc(topic.heroImage)}" alt="${esc(topic.heroImageAlt || t.title)}" loading="lazy">`
    : `<div class="tImgPlaceholder">🇰🇷</div>`;
  return `      <a class="topicCard" href="${esc(url)}">
        ${img}
        <div class="tBody"><h3>${esc(t.title)}</h3></div>
      </a>`;
}

function renderHubPage(locale){
  const L = LOCALES[locale];
  const canonicalUrl = `${SITE_ORIGIN}${L.urlPrefix}/culture/`;
  const jsonLd = jsonLdScript({
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: L.ui.hubTitle, url: canonicalUrl
  });
  const body = `  <p class="kicker">${esc(L.ui.kicker)}</p>
  <h1>${esc(L.ui.hubTitle)}</h1>
  <p class="hubSubtitle">${esc(L.ui.hubSubtitle)}</p>
  <p class="hubIntro">${esc(L.ui.hubIntro)}</p>
  <div class="topicGrid">
${CULTURE_TOPICS.map(x => renderTopicCard(x, locale)).join('\n')}
  </div>`;
  return pageShell(locale, {
    title: `${L.ui.hubTitle} — ${L.siteName}`,
    description: L.ui.hubIntro,
    canonicalUrl,
    hreflang: hreflangBlock(null),
    langLinks: langLinks(null, locale),
    jsonLd, body
  });
}

/* ---------- 생성 실행 ---------- */
let count = 0;
Object.keys(LOCALES).forEach(locale => {
  const L = LOCALES[locale];
  const baseDir = path.join(__dirname, L.outDir);
  fs.mkdirSync(baseDir, { recursive: true });
  fs.writeFileSync(path.join(baseDir, 'index.html'), renderHubPage(locale), 'utf8');
  count++;
  CULTURE_TOPICS.forEach(topic => {
    const dir = path.join(baseDir, topic.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderTopicPage(topic, locale), 'utf8');
    count++;
  });
  console.log(locale + ':', 1 + CULTURE_TOPICS.length, 'pages');
});
console.log('total culture pages generated:', count);

/* ---------- sitemap.xml에 문화 페이지 URL 추가 ---------- */
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
  if (sitemap.indexOf('/culture/') === -1){
    const entries = [];
    entries.push(urlEntry(`${SITE_ORIGIN}/culture/`, TODAY, 'monthly', '0.7'));
    entries.push(urlEntry(`${SITE_ORIGIN}/en/culture/`, TODAY, 'monthly', '0.5'));
    CULTURE_TOPICS.forEach(topic => {
      entries.push(urlEntry(`${SITE_ORIGIN}/culture/${topic.id}/`, TODAY, 'monthly', '0.6'));
      entries.push(urlEntry(`${SITE_ORIGIN}/en/culture/${topic.id}/`, TODAY, 'monthly', '0.4'));
    });
    sitemap = sitemap.replace('</urlset>', entries.join('\n') + '\n</urlset>\n');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('sitemap.xml: +', entries.length, 'culture urls');
  } else {
    console.log('sitemap.xml: culture urls already present, skipped');
  }
} else {
  console.log('sitemap.xml not found — skipped (run generate_work_pages.js first)');
}
