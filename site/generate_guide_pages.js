// 공용 Guide(Curated Guide & Route) 페이지 생성기 (Issue #41, Phase F v1)
//
// 무엇인가: docs/growth/guides/GUIDE_PACKAGES_READY_V1.yaml에 기획자가 준비한 Guide
// Package(LINEAR_ROUTE 또는 LAYERED_PILGRIMAGE)를 읽어, 3개 Guide를 각각 손코딩하지
// 않고 공용 renderer 하나로 렌더링한다. 장소·Stop·이미지·관계 분류·SEO copy·본문은
// 전부 기획 입력을 그대로 쓰고, 개발자는 canonical location의 tier(공식/체험 촬영지
// 여부)를 보고 Place 페이지로 연결할지 기존 Map state로 연결할지만 판단한다
// (link_mode: MAP_OR_PLACE일 때만 해당 — MAP_STATE는 항상 Map state).
//
// 입력:
//   /tmp/seowork/works_dump.json  — build_dump.js가 만든 작품/장소(tier 포함) 스냅샷
//   /tmp/seowork/guides_dump.json — build_dump.js가 GUIDE_PACKAGES_READY_V1.yaml에서
//                                   파싱하고 canonical location 존재 여부까지 검증한 배열
// 실행: node generate_guide_pages.js (build_dump.js 실행 이후, 다른 4개 생성기 이후 아무
//       때나 — sitemap.xml에 자기 섹션만 append하고 없으면 건너뛴다)
//
// Guide 콘텐츠는 필드 자체가 이미 guide.primary_locale 언어로 확정돼 있다(기획자가
// ko 또는 ja 하나만 채워서 넘긴다). 그래서 다른 생성기들처럼 로케일별로 본문 텍스트를
// 분기하는 로직이 없다 — Guide 1개 = 로케일 1개. 번역이 없는 로케일에는 이 Guide 자체를
// 만들지 않는다(조용한 fallback 금지 — 스키마 문서 "Locale 규칙").
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://geugotjigeum.com';
const GA_ID = 'G-H2KNQYH97M';
const TODAY = '2026-09-01';

const WORKS = JSON.parse(fs.readFileSync('/tmp/seowork/works_dump.json', 'utf8'));
const GUIDE_DUMP_PATH = '/tmp/seowork/guides_dump.json';

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function jsonLdScript(obj){ return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`; }

// Guide 페이지 자체의 UI 문구(칩/버튼/헤딩 라벨)는 기획 매니페스트에 없는 "화면 부속 텍스트"라
// 개발자가 로케일별로 직접 채운다 — 다른 생성기들의 LOCALES.ui 패턴과 동일한 방식.
const GUIDE_LOCALE_META = {
  ko: { urlPrefix: '', htmlLang: 'ko', ogLocale: 'ko_KR', siteName: '그곳, 지금', hreflang: 'ko',
    ui: {
      backLink: '← 홈으로', kicker: '가이드',
      beforeYouGoHeading: '가기 전에 확인할 것',
      routeOverviewHeading: '경로 한눈에 보기',
      segmentBreakLabel: '별도 일정으로 분리',
      mapCta: '🗺️ 지도에서 위치 보기 →', placeCta: '📍 장소 자세히 보기 →',
      whyThisStop: '왜 이 장소?', visitNoteLabel: '💡 방문 시 주의', nextHintLabel: '다음 이동',
      currentStatusCta: '현재 운영 정보 확인 →',
      relatedHeading: '관련 콘텐츠',
      workCta: (t) => `${t} 작품 페이지 보기 →`,
      mapCtaFull: (t) => `지도에서 ${t} 전체 보기 →`,
      relFilmed: '실제 촬영지', relStory: '작품 속 배경',
      ctxScreen: '이곳에서 나온 장면', ctxStory: '이곳과 연결된 이야기', ctxAdapt: '영상판은 여기서 찍혔다',
      roleOptional: '선택 · 연장 코스',
      footerTag: '이야기 속 장소를 실제로 가볼 수 있는 개인 여행지도 블로그',
      titleTag: '그곳, 지금',
      saveBtnLabelSave: '저장', saveBtnLabelSaved: '저장됨'
    } },
  ja: { urlPrefix: '/ja', htmlLang: 'ja', ogLocale: 'ja_JP', siteName: 'あの場所、いま', hreflang: 'ja',
    ui: {
      backLink: '← ホームへ', kicker: 'ガイド',
      beforeYouGoHeading: '行く前に確認すること',
      routeOverviewHeading: 'ルート概要',
      segmentBreakLabel: '別日程として分ける',
      mapCta: '🗺️ 地図で位置を見る →', placeCta: '📍 場所の詳細を見る →',
      whyThisStop: 'なぜこの場所?', visitNoteLabel: '💡 訪問時の注意', nextHintLabel: '次の移動',
      currentStatusCta: '現在の営業情報を確認 →',
      relatedHeading: '関連コンテンツ',
      workCta: (t) => `${t}の作品ページを見る →`,
      mapCtaFull: (t) => `地図で${t}の全体を見る →`,
      relFilmed: '実際のロケ地', relStory: '物語の舞台',
      ctxScreen: 'この場所で撮られたシーン', ctxStory: 'この場所とつながる物語', ctxAdapt: 'ドラマ版はここで撮影された',
      roleOptional: '任意 · 延長コース',
      footerTag: '物語の中の場所を実際に訪れられる個人旅行地図ブログ',
      titleTag: 'あの場所、いま',
      saveBtnLabelSave: '保存', saveBtnLabelSaved: '保存済み'
    } }
};

function workTitleFor(w, locale){
  if (locale === 'ja') return w.title_ja || w.title;
  if (locale === 'zh') return w.title_zh || w.title;
  return w.title;
}

// link_mode === 'MAP_OR_PLACE'일 때만 실제 Place SEO 페이지 존재 여부(tier 기반, #40과 동일
// 판정)를 확인한다. MAP_STATE는 항상 기존 지도 상태(?work=&loc=)로만 연결한다 — STORY_SETTING을
// 촬영지 Place로 승격하지 않는다는 원칙 그대로.
function resolveStopLink(stop, work, locale){
  const L = GUIDE_LOCALE_META[locale];
  const loc = (work.locations || []).find(l => l.id === stop.canonical_location_id);
  const hasPlace = !!loc && (loc.tier === 'official' || loc.tier === 'experience') && loc.lat != null && loc.lng != null;
  if (stop.link_mode === 'MAP_OR_PLACE' && hasPlace) {
    return { url: `${SITE_ORIGIN}${L.urlPrefix}/places/${work.id}-${stop.canonical_location_id}/`, isPlace: true };
  }
  return { url: `${SITE_ORIGIN}/?work=${encodeURIComponent(work.id)}&loc=${encodeURIComponent(stop.canonical_location_id)}`, isPlace: false };
}

const SHARED_CSS = `
  :root{
    --ink:#1B1E24; --sub:#575E6B; --line:#E1DCD2; --accent:#FF7B57; --accent2:#3a7ce0;
    --lz-bg:#F8F5EE; --lz-bg2:#FDFBF7; --lz-card:#FFFFFF;
    --ds-bg:#0A0B0F; --ds-line:#242A34; --ds-text:#FFFFFF; --ds-text-2:#CDD2DC;
  }
  *{box-sizing:border-box;}
  html{-webkit-text-size-adjust:100%;text-size-adjust:100%;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","Malgun Gothic",sans-serif;color:var(--ink);line-height:1.7;background:var(--lz-bg);}
  a{color:var(--accent2);}
  .gHeader{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--ds-line);background:var(--ds-bg);position:sticky;top:0;z-index:5;flex-wrap:wrap;gap:8px;}
  .gHeader a.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--ds-text);text-decoration:none;}
  .gHeader a.backLink{font-size:13.5px;color:var(--ds-text-2);text-decoration:none;font-weight:600;min-height:44px;display:inline-flex;align-items:center;}
  .gHeader a.backLink:hover{color:#fff;}
  .gHero{background:linear-gradient(180deg,#12151c,#0A0B0F 70%);color:#fff;padding:40px 20px 34px;}
  .gHeroInner{max-width:760px;margin:0 auto;}
  .gHeroEyebrow{display:inline-block;font-size:12.5px;font-weight:700;color:var(--accent);letter-spacing:.03em;margin:0 0 10px;}
  .gHero h1{font-size:26px;line-height:1.35;margin:0 0 12px;}
  .gHeroSummary{font-size:15px;color:var(--ds-text-2);margin:0 0 18px;max-width:640px;}
  .gHeroMeta{display:flex;flex-wrap:wrap;gap:10px;}
  .gHeroChip{display:inline-flex;align-items:center;font-size:12.5px;font-weight:600;color:#fff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 13px;}
  main{max-width:760px;margin:0 auto;padding:32px 20px 8px;}
  h2{font-size:19px;margin:36px 0 14px;padding-top:10px;border-top:1px solid var(--line);color:var(--ink);}
  .beforeList{margin:0;padding:0 0 0 20px;font-size:14.5px;color:var(--ink);}
  .beforeList li{margin-bottom:8px;}
  .routeOverview{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:6px;}
  .routeStep{display:flex;align-items:center;gap:8px;background:var(--lz-card);border:1px solid var(--line);border-radius:999px;padding:8px 14px 8px 8px;font-size:13px;font-weight:600;color:var(--ink);}
  .routeStepNum{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--ink);color:#fff;font-size:11.5px;font-weight:700;flex-shrink:0;}
  .routeStepOptional{opacity:.72;border-style:dashed;}
  .routeArrow{color:var(--sub);font-size:14px;}
  .routeSegBreak{flex-basis:100%;font-size:12px;color:var(--sub);font-weight:600;margin:2px 0;padding-left:2px;}
  .segHeader{margin:26px 0 14px;}
  .segHeader h2{margin-top:0;padding-top:0;border-top:none;font-size:17.5px;}
  .segSummary{font-size:13.5px;color:var(--sub);margin:0;}
  .segHeaderLinear{margin:0 0 14px;}
  .stopList{display:flex;flex-direction:column;gap:16px;}
  .stopCard{display:flex;flex-direction:column;background:var(--lz-card);border:1px solid var(--line);border-radius:16px;overflow:hidden;}
  .stopImgWrap{aspect-ratio:16/9;background:var(--lz-bg2);overflow:hidden;}
  .stopImgWrap img{width:100%;height:100%;object-fit:cover;display:block;}
  .stopBody{padding:16px 18px 18px;}
  .stopMeta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px;}
  .stopNumber{font-size:12px;font-weight:700;color:var(--sub);letter-spacing:.03em;}
  .stopBadge{display:inline-block;font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px;}
  .stopRoleBadge{display:inline-block;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;background:#eee9dd;color:var(--sub);border:1px solid var(--line);}
  .stopContext{font-size:12px;color:var(--accent2);font-weight:700;margin:0 0 4px;letter-spacing:.01em;}
  .stopCard h3{font-size:17px;margin:0 0 8px;}
  .stopBodyText{font-size:14.5px;color:#333;margin:0 0 10px;}
  .stopWhy{font-size:13.5px;color:var(--ink);background:var(--lz-bg2);border-left:3px solid var(--accent);border-radius:8px;padding:9px 12px;margin:0 0 10px;}
  .stopWhy b{color:var(--accent);}
  .stopVisitNote{font-size:12.5px;color:var(--sub);margin:0 0 12px;}
  .stopActions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}
  .stopCta{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;background:var(--accent);color:#fff;font-weight:700;font-size:13.5px;text-decoration:none;border-radius:10px;box-sizing:border-box;}
  .stopCta:hover{opacity:.9;}
  .save-place-btn{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 15px;border-radius:10px;background:#fff;border:1px solid var(--line);color:var(--ink);font-size:13px;font-weight:700;cursor:pointer;box-sizing:border-box;}
  .save-place-btn .save-place-btn-icon{font-size:15px;line-height:1;}
  .save-place-btn:hover{border-color:var(--accent);}
  .save-place-btn.is-saved{background:rgba(255,123,87,.12);border-color:var(--accent);color:#b8492a;}
  .save-place-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
  .stopStatusLink{font-size:12.5px;font-weight:600;color:var(--sub);text-decoration:underline;}
  .stopNextHint{font-size:12.5px;color:var(--sub);margin:10px 0 0;font-style:italic;}
  .guideRelated{margin-top:8px;}
  .relatedGrid{display:flex;flex-direction:column;gap:8px;}
  .relatedCard{display:flex;align-items:center;min-height:44px;padding:12px 16px;border:1px solid var(--line);border-radius:12px;background:var(--lz-card);color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;box-sizing:border-box;}
  .relatedCard:hover{border-color:var(--accent2);color:var(--accent2);}
  footer{max-width:760px;margin:0 auto;padding:24px 20px 32px;color:var(--sub);font-size:13px;border-top:1px solid var(--line);}
  footer a{color:var(--sub);text-decoration:underline;margin-right:14px;}
  @media (max-width:480px){
    .gHeader{padding:11px 16px;}
    .gHero{padding:30px 16px 26px;}
    .gHero h1{font-size:21px;}
    main{padding:26px 16px 4px;}
    h2{font-size:17px;margin:28px 0 12px;}
    .stopCard h3{font-size:15.5px;}
    .stopBodyText,.stopWhy{font-size:13.5px;}
    .stopCta{width:100%;justify-content:center;text-align:center;}
    .routeStep{font-size:12px;padding:7px 12px 7px 7px;}
  }
`;

function renderStopCard(stop, work, locale, stopCountInSeg){
  const ui = GUIDE_LOCALE_META[locale].ui;
  const link = resolveStopLink(stop, work, locale);
  const relLabel = stop.relationship === 'FILMED' ? ui.relFilmed : ui.relStory;
  const relColor = stop.relationship === 'FILMED' ? '#3ac07c' : '#c9a227';
  const badgeStyle = `background:${relColor}22;color:${relColor};border:1px solid ${relColor}59`;
  const ctxLabel = stop.context_type === 'STORY_SETTING' ? ui.ctxStory
    : (stop.context_type === 'ADAPTATION_FILMING' ? ui.ctxAdapt : ui.ctxScreen);
  const roleBadgeHtml = stop.role === 'OPTIONAL_EXTENSION' ? `<span class="stopRoleBadge">${esc(ui.roleOptional)}</span>` : '';
  const ctaLabel = link.isPlace ? ui.placeCta : ui.mapCta;
  const statusHtml = stop.current_status_source
    ? `<a class="stopStatusLink" href="${esc(stop.current_status_source)}" target="_blank" rel="noopener">${esc(ui.currentStatusCta)}</a>` : '';
  const visitNoteHtml = stop.visit_note ? `<p class="stopVisitNote">${esc(ui.visitNoteLabel)}: ${esc(stop.visit_note)}</p>` : '';
  const nextHintHtml = stop.next_hint ? `<p class="stopNextHint">${esc(stop.next_hint)}</p>` : '';
  return `        <div class="stopCard">
          <div class="stopImgWrap"><img src="${esc(SITE_ORIGIN + stop.asset_path)}" alt="${esc(stop.heading)}" loading="lazy" width="1600" height="900"></div>
          <div class="stopBody">
            <div class="stopMeta">
              <span class="stopNumber">Stop ${stop.order}${stopCountInSeg ? '/' + stopCountInSeg : ''}</span>
              <span class="stopBadge" style="${badgeStyle}">${esc(relLabel)}</span>
              ${roleBadgeHtml}
            </div>
            <p class="stopContext">${esc(ctxLabel)}</p>
            <h3>${esc(stop.heading)}</h3>
            <p class="stopBodyText">${esc(stop.body)}</p>
            <p class="stopWhy"><b>${esc(ui.whyThisStop)}</b> ${esc(stop.why_this_stop)}</p>
            ${visitNoteHtml}
            <div class="stopActions">
              <a class="stopCta" href="${esc(link.url)}">${esc(ctaLabel)}</a>
              <button type="button" class="save-place-btn" data-work-id="${esc(work.id)}" data-location-id="${esc(stop.canonical_location_id)}" data-surface="guide" data-label-save="${esc(ui.saveBtnLabelSave)}" data-label-saved="${esc(ui.saveBtnLabelSaved)}" aria-pressed="false"><span class="save-place-btn-icon" aria-hidden="true">♡</span><span class="save-place-btn-label">${esc(ui.saveBtnLabelSave)}</span></button>
              ${statusHtml}
            </div>
            ${nextHintHtml}
          </div>
        </div>`;
}

function renderRouteOverview(guide, work, locale){
  const ui = GUIDE_LOCALE_META[locale].ui;
  const parts = [];
  guide.segments.forEach((seg, segIdx) => {
    if (guide.guide_type === 'LAYERED_PILGRIMAGE' && segIdx > 0){
      parts.push(`<span class="routeSegBreak">↳ ${esc(ui.segmentBreakLabel)}</span>`);
    }
    seg.stops.forEach((stop, i) => {
      if (i > 0 || (guide.guide_type === 'LAYERED_PILGRIMAGE' && segIdx > 0 && i === 0)){
        if (!(guide.guide_type === 'LAYERED_PILGRIMAGE' && i === 0)) parts.push(`<span class="routeArrow">→</span>`);
      }
      const optCls = stop.role === 'OPTIONAL_EXTENSION' ? ' routeStepOptional' : '';
      parts.push(`<span class="routeStep${optCls}"><span class="routeStepNum">${stop.order}</span>${esc(stop.heading.split(/[,，、]| — /)[0])}</span>`);
    });
  });
  return `  <h2>${esc(ui.routeOverviewHeading)}</h2>
  <div class="routeOverview">
    ${parts.join('\n    ')}
  </div>`;
}

function renderSegment(seg, guide, work, locale){
  const stopsHtml = seg.stops.map(s => renderStopCard(s, work, locale, seg.stops.length)).join('\n');
  const headerHtml = guide.guide_type === 'LAYERED_PILGRIMAGE'
    ? `      <div class="segHeader">
        <h2>${esc(seg.title)}</h2>
        <p class="segSummary">${esc(seg.summary)}</p>
      </div>`
    : (seg.summary ? `      <div class="segHeader segHeaderLinear"><p class="segSummary">${esc(seg.summary)}</p></div>` : '');
  return `    <section class="guideSegment">
${headerHtml}
      <div class="stopList">
${stopsHtml}
      </div>
    </section>`;
}

function renderGuidePage(guide){
  const locale = guide.primary_locale;
  const L = GUIDE_LOCALE_META[locale];
  const ui = L.ui;
  const work = WORKS.find(w => w.id === guide.work_id);
  if (!work) throw new Error(`[generate_guide_pages] guide ${guide.guide_id}: work_id "${guide.work_id}"를 찾지 못했습니다.`);
  const wTitle = workTitleFor(work, locale);
  const canonicalUrl = `${SITE_ORIGIN}${guide.slug_candidate}`;

  const beforeYouGoHtml = (guide.before_you_go && guide.before_you_go.length)
    ? `  <h2>${esc(ui.beforeYouGoHeading)}</h2>\n  <ul class="beforeList">\n${guide.before_you_go.map(item => `    <li>${esc(item)}</li>`).join('\n')}\n  </ul>` : '';

  const routeOverviewHtml = renderRouteOverview(guide, work, locale);
  const segmentsHtml = guide.segments.map(seg => renderSegment(seg, guide, work, locale)).join('\n');

  const suggested = (guide.related && guide.related.suggested_links) || [];
  const workUrl = `${SITE_ORIGIN}${L.urlPrefix}/works/${work.id}/`;
  const mapUrlFull = `${SITE_ORIGIN}${L.urlPrefix}/?work=${encodeURIComponent(work.id)}`;
  let placeRelUrl = null;
  if (suggested.indexOf('PLACE') !== -1){
    outer:
    for (const seg of guide.segments){
      for (const s of seg.stops){
        const link = resolveStopLink(s, work, locale);
        if (link.isPlace){ placeRelUrl = link.url; break outer; }
      }
    }
  }
  const relatedCards = [];
  if (suggested.indexOf('WORK') !== -1) relatedCards.push(`<a class="relatedCard" href="${esc(workUrl)}">${esc(ui.workCta(wTitle))}</a>`);
  if (placeRelUrl) relatedCards.push(`<a class="relatedCard" href="${esc(placeRelUrl)}">${esc(ui.placeCta)}</a>`);
  if (suggested.indexOf('MAP') !== -1) relatedCards.push(`<a class="relatedCard" href="${esc(mapUrlFull)}">${esc(ui.mapCtaFull(wTitle))}</a>`);
  const relatedHtml = relatedCards.length
    ? `  <section class="guideRelated">
    <h2>${esc(ui.relatedHeading)}</h2>
    <div class="relatedGrid">
      ${relatedCards.join('\n      ')}
    </div>
  </section>` : '';

  const stopsFlat = [];
  guide.segments.forEach(seg => seg.stops.forEach(s => stopsFlat.push(s)));
  const jsonLdTrip = jsonLdScript({
    '@context': 'https://schema.org', '@type': 'TouristTrip',
    name: guide.hero.heading, description: guide.seo.meta_description, url: canonicalUrl,
    itinerary: { '@type': 'ItemList', itemListElement: stopsFlat.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.heading })) }
  });
  const jsonLdBreadcrumb = jsonLdScript({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: L.siteName, item: `${SITE_ORIGIN}${L.urlPrefix}/` },
      { '@type': 'ListItem', position: 2, name: guide.hero.heading, item: canonicalUrl }
    ]
  });

  return `<!DOCTYPE html>
<html lang="${L.htmlLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(guide.seo.title)}</title>
<meta name="description" content="${esc(guide.seo.meta_description)}">
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="${L.hreflang}" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(guide.seo.title)}">
<meta property="og:description" content="${esc(guide.seo.meta_description)}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:locale" content="${L.ogLocale}">
<meta property="og:image" content="${esc(SITE_ORIGIN + guide.hero.hero_asset)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(guide.seo.title)}">
<meta name="twitter:description" content="${esc(guide.seo.meta_description)}">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>
<style>${SHARED_CSS}</style>
<script src="/saved_places.js"></script>
${jsonLdTrip}
${jsonLdBreadcrumb}
</head>
<body>
<header class="gHeader">
  <a class="brand" href="${SITE_ORIGIN}${L.urlPrefix}/"><span>${esc(L.siteName)}</span></a>
  <a class="backLink" href="${SITE_ORIGIN}${L.urlPrefix}/">${esc(ui.backLink)}</a>
</header>
<section class="gHero">
  <div class="gHeroInner">
    <span class="gHeroEyebrow">${esc(guide.hero.eyebrow)}</span>
    <h1>${esc(guide.hero.heading)}</h1>
    <p class="gHeroSummary">${esc(guide.hero.summary)}</p>
    <div class="gHeroMeta">
      <span class="gHeroChip">⏱ ${esc(guide.hero.time_label)}</span>
      <span class="gHeroChip">🚗 ${esc(guide.hero.transport_label)}</span>
    </div>
  </div>
</section>
<main>
${beforeYouGoHtml}
${routeOverviewHtml}
${segmentsHtml}
${relatedHtml}
</main>
<footer>
  &copy; ${esc(ui.footerTag)}
</footer>
</body>
</html>
`;
}

/* ---------- 생성 실행 ---------- */
if (!fs.existsSync(GUIDE_DUMP_PATH)){
  console.log('[generate_guide_pages] guides_dump.json이 없습니다 — build_dump.js를 먼저 실행하세요. 건너뜁니다.');
  process.exit(0);
}
const guides = JSON.parse(fs.readFileSync(GUIDE_DUMP_PATH, 'utf8'));
let count = 0;
const writtenUrls = [];
guides.forEach(guide => {
  const relPath = guide.slug_candidate.replace(/^\//, '').replace(/\/$/, ''); // 'guides/breaking-bad-albuquerque' | 'ja/guides/byakuya-pilgrimage'
  const dir = path.join(__dirname, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderGuidePage(guide), 'utf8');
  writtenUrls.push(`${SITE_ORIGIN}${guide.slug_candidate}`);
  count++;
  console.log(`[generate_guide_pages] wrote ${guide.guide_id} -> ${guide.slug_candidate}`);
});
console.log('[generate_guide_pages] total guides generated:', count);

/* ---------- sitemap.xml에 Guide URL 추가 (기존 항목은 유지, 없을 때만 삽입) ---------- */
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
  if (sitemap.indexOf('/guides/') === -1){
    const entries = writtenUrls.map(u => urlEntry(u, TODAY, 'monthly', '0.6'));
    sitemap = sitemap.replace('</urlset>', entries.join('\n') + '\n</urlset>\n');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('sitemap.xml: +', entries.length, 'guide urls');
  } else {
    console.log('sitemap.xml: guide urls already present, skipped');
  }
} else {
  console.log('sitemap.xml not found — skipped (run generate_work_pages.js first)');
}
