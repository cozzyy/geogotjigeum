// 장소 개별 SEO 페이지 생성기 (2026-08 10라운드 — 파일럿 28곳 → 약 200곳으로 확대, 3개 언어 지원)
//
// 무엇인가: generate_work_pages.js가 "작품 1개 → 그 작품의 장소 전체"를, generate_region_pages.js가
// "지역 1곳 → 그 지역의 작품 전체"를 보여준다면, 이 생성기는 "장소 1곳 → 그 장소가 나온 작품 1개 +
// 방문 정보"를 전담한다. "OO(작품명) 촬영지"뿐 아니라 "OO(장소명) 드라마/영화"로 검색하는 사람들을
// 잡기 위한 URL·페이지.
//
// 9라운드(파일럿, 2026-08-20)에서 28곳·한국어만으로 먼저 검증했고, 구글 SEO 색인이 잘 붙는 것을
// 확인한 뒤 사용자가 "200개까지 확대"를 지시해 이번 라운드에서 실행한다.
//
// 선정 기준(정확성 원칙 유지 — 절대 지어내지 않는다):
//   - tierOf()가 "official"(실제 촬영지) 또는 "experience"(지금도 체험 가능)로 분류하는 장소만.
//     "story setting"(서사적 배경 정도)은 실제로 안 가본 곳일 수 있어 이 페이지 타입에서는 제외.
//   - 위도·경도가 실제로 있는 곳만(허위 좌표 금지 원칙 — 좌표 없는 곳은 애초에 후보에서 빠짐).
//   - 특정 작품 하나가 페이지를 독식하지 않도록, 작품별로 라운드로빈(순환 배분)하며 골고루 뽑는다.
//     (미스터 션샤인처럼 태그가 잘 갖춰진 작품 혼자 100곳을 채우면 "장소로 찾기"가 사실상 그 작품
//     전용 페이지가 되어버려 취지에 안 맞음 — 39개 작품이 고르게 대표되도록 함)
//
// 3개 언어(9라운드 파일럿 때는 "200개로 늘릴 때 함께 한다"고 미뤄뒀던 부분): 장소 데이터에 이미
// name_ja/desc_en/desc_ja/tag_en/tag_ja/travelTip_en 필드가 있으므로(신규 작품 추가 표준 절차상 항상
// 채워짐) 이를 그대로 재사용한다. 일본어는 해당 작품 자체가 일본어 콘텐츠를 지원할 때만
// (jaAvailable) 생성 — 없는 번역을 지어내지 않는다는 원칙은 여기서도 동일하게 적용.
//
// 입력: /tmp/seowork/works_dump.json (dump_works.js 산출물 — 매 세션 재생성 필요)
// 실행: node generate_place_pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 2026-08 Issue #10: 언어 전환/번역 준비상태 공통 헬퍼(contentmap_i18n.js). 이 파일은 원래
// 장소 페이지에 언어 스위처가 아예 없었다 — 이번에 새로 추가하면서 다른 두 생성기와 같은
// 헬퍼를 쓴다(판정이 세 곳에서 각자 따로면 반드시 어긋난다).
const I18N = (() => {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'contentmap_i18n.js'), 'utf8'), sandbox, { filename: 'contentmap_i18n.js' });
  return vm.runInContext('({ i18nStatus: i18nStatus, i18nUrl: i18nUrl, i18nSwitcherHtml: i18nSwitcherHtml, i18nHreflangBlock: i18nHreflangBlock })', sandbox);
})();

const SITE_ORIGIN = 'https://geugotjigeum.com';
const GA_ID = 'G-H2KNQYH97M';
const TODAY = '2026-08-25';
const TARGET_COUNT = 999999; // 2026-08 11라운드: "최대한으로" — 정직하게 채울 수 있는 후보를 전부 사용

const works = JSON.parse(fs.readFileSync('/tmp/seowork/works_dump.json', 'utf8'));
const worksById = {};
works.forEach(w => { worksById[w.id] = w; });

function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function jsonLdScript(obj){ return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`; }
function jaAvailable(w){ return !!w.title_ja; }
// 2026-08 3단계: 번체 중문(대만·홍콩) — title_zh 보유 작품(대표작)의 장소만 /zh/places/ 생성
function zhAvailable(w){ return !!w.title_zh; }

// 괄호 안 영문명 추출 — generate_work_pages.js의 extractEnglishName()과 동일 로직(9라운드에서
// "크라이스트처치 칼리지 (Christ Church College), 옥스퍼드"처럼 괄호 뒤에 한글이 더 붙는 경우의
// 버그를 고친 버전). 영문명이 없으면 원문을 그대로 반환 — 지어내지 않는다.
function extractEnglishName(name){
  if (!name) return name;
  const trailing = name.match(/^(.*?)\s*[\(（]([^)）]+)[\)）]\s*$/);
  if (trailing && /[A-Za-z]/.test(trailing[2])) return trailing[2].trim();
  const anywhere = name.match(/[\(（]([^)）]+)[\)）]/);
  if (anywhere && /[A-Za-z]/.test(anywhere[1])) return anywhere[1].trim();
  return name;
}
// 이름만 뽑기(제목용) — "킹스크로스역 (King's Cross Station)"에서 앞부분 한글명만
function shortKoName(name){
  const m = (name || '').match(/^(.*?)\s*[\(（]/);
  return (m ? m[1] : name || '').trim();
}
function placeDisplayName(loc, locale){
  if (locale === 'en') return extractEnglishName(loc.name);
  if (locale === 'ja') return loc.name_ja || shortKoName(loc.name);
  if (locale === 'zh') return loc.name_zh || shortKoName(loc.name);
  return shortKoName(loc.name);
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

const SHARED_CSS = `
  :root{
    --ink:#1B1E24; --sub:#575E6B; --line:#E1DCD2; --accent:#FF7B57; --accent2:#FF9B7D;
    --card:#FFFFFF; --pagebg:#F8F5EE;
    --dh-bg:#0A0B0F; --dh-text:#FFFFFF; --dh-text-2:#CDD2DC; --dh-line:#242A34;
  }
  *{box-sizing:border-box;}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","Malgun Gothic",sans-serif;color:var(--ink);line-height:1.7;background:var(--pagebg);}
  /* 컴팩트 다크 헤더 — Issue #24: 장소마다 실사진이 없으므로(허위 이미지 금지 원칙) 큰 히어로
     대신, 나머지 Phase 1 화면(홈/작품상세/지도/퀴즈)과 같은 다크 브랜드 톤의 컴팩트 헤더로
     "이 장소가 실화 기반 여행 정보다"라는 정체성을 즉시 전달한다. */
  .wsHeader{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid var(--dh-line);background:var(--dh-bg);position:sticky;top:0;z-index:5;flex-wrap:wrap;gap:8px;min-width:0;}
  .wsHeader a.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:16px;color:var(--dh-text);text-decoration:none;min-width:0;}
  .wsHeader a.brand span{overflow:hidden;text-overflow:ellipsis;}
  .wsHeader a.brand .brand-logo{width:28px;height:28px;flex-shrink:0;}
  .wsHeader a.backLink{font-size:13.5px;color:var(--accent);text-decoration:none;font-weight:600;flex-shrink:0;min-height:44px;display:inline-flex;align-items:center;}
  .wsHeader a.backLink:hover{text-decoration:underline;}
  main{max-width:760px;margin:0 auto;padding:28px 20px 60px;width:100%;}
  .kicker{font-size:12.5px;font-weight:700;color:var(--accent);letter-spacing:.02em;margin:0 0 8px;}
  .breadcrumb{font-size:12.5px;color:var(--sub);margin:0 0 10px;overflow-wrap:break-word;}
  .breadcrumb a{color:var(--sub);text-decoration:none;}
  .breadcrumb a:hover{text-decoration:underline;}
  .wsLangs{display:flex;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px;align-items:center;font-size:11.5px;margin:0 0 14px;width:fit-content;max-width:100%;flex-wrap:wrap;}
  .wsLangs a{color:var(--sub);text-decoration:none;padding:6px 11px;border-radius:999px;font-weight:700;}
  .wsLangs a.on{color:#fff;background:var(--accent);}
  .wsLangs a:not(.on):hover{color:var(--accent);}
  .wsLangs-planned{padding:6px 11px;border-radius:999px;font-weight:700;color:var(--sub);opacity:.55;cursor:default;}
  /* 정체성 블록 — 장소명(h1) + 출처 작품 + "실제로 가볼 수 있는 곳" 배지를 한 덩어리로 */
  .phIdentity{margin:0 0 18px;}
  h1{font-size:24px;line-height:1.35;margin:0 0 6px;color:var(--ink);overflow-wrap:break-word;}
  .subTitle{font-size:14.5px;color:var(--sub);margin:0 0 12px;overflow-wrap:break-word;}
  .tierBadge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#fff;background:#2E9E5B;border-radius:999px;padding:5px 12px;}
  /* 지도 CTA — Issue #24: 예전엔 본문 중간에 있었지만, "이 장소가 어디인지" 확인하려는
     방문형 검색 의도가 강하므로 정체성 블록 바로 아래(스크롤 없이 보이는 영역)로 끌어올린다. */
  .mapCtaWrap{margin:16px 0 22px;}
  .mapCta{display:inline-flex;align-items:center;justify-content:center;background:var(--accent);color:#fff;font-weight:700;font-size:14.5px;text-decoration:none;padding:13px 22px;border-radius:12px;min-height:44px;box-sizing:border-box;width:100%;max-width:420px;text-align:center;}
  .mapCta:hover{opacity:.9;}
  .intro{font-size:15.5px;color:var(--ink);margin:0 0 18px;overflow-wrap:break-word;}
  .tipBox{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent2);border-radius:12px;padding:14px 16px;font-size:13.5px;color:var(--ink);margin:0 0 22px;overflow-wrap:break-word;}
  .tipBox b{color:var(--accent);}
  /* Issue #40 Phase E v1 — Place Detail Scene/Why This Place 블록 */
  .sceneBlock{margin:0 0 22px;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--card);}
  .sceneBlock .sceneImgWrap{aspect-ratio:16/9;background:var(--pagebg);overflow:hidden;}
  .sceneBlock .sceneImgWrap img{width:100%;height:100%;object-fit:cover;display:block;}
  .sceneBlock .sceneBlockBody{padding:14px 16px 16px;}
  .sceneBadge{display:inline-block;font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px;margin-bottom:8px;}
  .sceneBlockBody p{font-size:14.5px;color:var(--ink);margin:0 0 10px;overflow-wrap:break-word;}
  .sceneBlockBody a.sceneWorkLink{font-size:13.5px;font-weight:600;color:var(--accent);text-decoration:none;}
  .sceneBlockBody a.sceneWorkLink:hover{text-decoration:underline;}
  .whyBox{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:12px;padding:14px 16px;font-size:14.5px;color:var(--ink);margin:0 0 22px;overflow-wrap:break-word;}
  .whyBox h2{margin:0 0 8px;padding-top:0;border-top:none;font-size:15.5px;}
  .noteBox{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;font-size:13.5px;color:var(--sub);margin:0 0 4px;overflow-wrap:break-word;}
  h2{font-size:17.5px;margin:32px 0 12px;padding-top:10px;border-top:1px solid var(--line);color:var(--ink);}
  .workCard{display:block;padding:16px 18px;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;text-decoration:none;color:inherit;background:var(--card);transition:border-color .15s ease,background .15s ease;min-width:0;}
  .workCard:hover{border-color:var(--accent2);}
  .workCard h3{font-size:16px;margin:0 0 6px;color:var(--ink);overflow-wrap:break-word;}
  .workCard p{font-size:13.5px;color:var(--sub);margin:0 0 8px;overflow-wrap:break-word;}
  .workCard .cta{font-size:13px;font-weight:600;color:var(--accent);}
  .otherList{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
  .otherList li{margin:0;min-width:0;}
  .otherList a{display:flex;align-items:center;min-height:44px;padding:10px 14px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;overflow-wrap:break-word;box-sizing:border-box;}
  .otherList a:hover{border-color:var(--accent2);color:var(--accent);}
  .finalCtaWrap{margin-top:30px;padding-top:18px;border-top:1px solid var(--line);}
  footer{max-width:760px;margin:0 auto;padding:20px;color:var(--sub);font-size:13px;border-top:1px solid var(--line);}
  footer a{color:var(--sub);text-decoration:underline;margin-right:14px;}
  footer a:hover{color:var(--accent);}
  .placeGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:8px;}
  @media (max-width:768px){
    .wsHeader{padding:11px 16px;}
    main{padding:24px 16px 52px;}
    .mapCta{max-width:100%;}
    h1{font-size:20px;}
  }
  @media (max-width:480px){
    main{padding:22px 16px 48px;}
    h1{font-size:19px;}
  }
`;

const LOCALES = {
  ko: { htmlLang:'ko', ogLocale:'ko_KR', urlPrefix:'', outDir:'places', siteName:'그곳, 지금',
    ui:{ home:'🏠 홈', kicker:'장소로 찾기', breadcrumbHome:'홈', breadcrumbHub:'장소로 찾기',
      subTitle:(t)=>`${t}에 나온 실제 장소`, tierBadge:'✅ 실제로 가볼 수 있는 곳',
      note:(t)=>`이 장소가 나온 작품 "${t}"의 다른 실제 촬영지·배경 장소들도 함께 볼 수 있어요.`,
      mapCta:'🗺️ 지도에서 정확한 위치 보기 →', tipLabel:'💡 방문 팁',
      workHeading:'이 장소가 나온 작품', workCardCta:(t)=>`지도에서 ${t} 장소 전체 보기 →`,
      otherHeading:'다른 작품 속 실제 장소도 둘러보세요',
      titleTpl:(p,t)=>`${p} — ${t} 촬영지 실제 위치 | 그곳, 지금`,
      descFallback:(t,p)=>`${t}에 등장하는 ${p}의 실제 위치와 방문 정보.`,
      hubTitle:'장소로 찾기 — 실제로 가볼 수 있는 촬영지 목록 | 그곳, 지금',
      hubDesc:'영화·드라마·소설 속 장소를 이름으로 찾아보세요. 검증된 실제 촬영지·배경 장소를 지도와 함께 확인할 수 있습니다.',
      hubH1:'이름으로 실제 장소 찾기',
      hubIntro:(n)=>`영화·드라마·소설에 나온 곳을 장소 이름으로 검색해서 찾아보세요. 검증된 대표 장소 ${n}곳을 모았습니다.`,
      hubListHeading:'전체 장소 목록', cardCta:'자세히 보기 →', footerAbout:'서비스 소개', footerContact:'문의',
      footerPrivacy:'개인정보처리방침', footerTerms:'이용약관',
      footerTag:'이야기 속 장소를 실제로 가볼 수 있는 개인 여행지도 블로그' } },
  en: { htmlLang:'en', ogLocale:'en_US', urlPrefix:'/en', outDir:'en/places', siteName:'That Place, Now',
    ui:{ home:'🏠 Home', kicker:'Find by place', breadcrumbHome:'Home', breadcrumbHub:'Find by place',
      subTitle:(t)=>`A real place from ${t}`, tierBadge:'✅ A real place you can visit',
      note:(t)=>`You can also see other real filming locations and settings from "${t}" here.`,
      mapCta:'🗺️ See the exact location on the map →', tipLabel:'💡 Visit tip',
      workHeading:'The story behind this place', workCardCta:(t)=>`See all ${t} locations on the map →`,
      otherHeading:'Explore real places from other stories',
      titleTpl:(p,t)=>`${p} — Real ${t} Filming Location | That Place, Now`,
      descFallback:(t,p)=>`The real location and visitor info for ${p}, featured in ${t}.`,
      hubTitle:'Find by Place — Real Filming Locations You Can Visit | That Place, Now',
      hubDesc:'Search real places from movies, dramas, and novels by name — verified filming locations and settings, shown on a map.',
      hubH1:'Find a Real Place by Name',
      hubIntro:(n)=>`Search for places from movies, dramas, and novels by name. We've gathered ${n} verified places so far.`,
      hubListHeading:'All places', cardCta:'See details →', footerAbout:'About', footerContact:'Contact',
      footerPrivacy:'Privacy Policy', footerTerms:'Terms of Use',
      footerTag:'A personal travel-map blog for visiting real places from stories' } },
  ja: { htmlLang:'ja', ogLocale:'ja_JP', urlPrefix:'/ja', outDir:'ja/places', siteName:'あの場所、いま',
    ui:{ home:'🏠 ホーム', kicker:'場所で探す', breadcrumbHome:'ホーム', breadcrumbHub:'場所で探す',
      subTitle:(t)=>`${t}に登場する実際の場所`, tierBadge:'✅ 実際に訪れられる場所',
      note:(t)=>`この場所が登場する作品「${t}」の他の実際のロケ地・舞台もあわせてご覧いただけます。`,
      mapCta:'🗺️ 地図で正確な位置を見る →', tipLabel:'💡 訪問のヒント',
      workHeading:'この場所が登場する作品', workCardCta:(t)=>`地図で${t}の場所をすべて見る →`,
      otherHeading:'他の作品の実際の場所も見てみましょう',
      titleTpl:(p,t)=>`${p} — ${t}のロケ地 実際の場所 | あの場所、いま`,
      descFallback:(t,p)=>`${t}に登場する${p}の実際の場所と訪問情報。`,
      hubTitle:'場所で探す — 実際に訪れられるロケ地一覧 | あの場所、いま',
      hubDesc:'映画・ドラマ・小説に登場する場所を名前で検索できます。実際のロケ地・舞台を地図と一緒に確認できます。',
      hubH1:'名前で実際の場所を探す',
      hubIntro:(n)=>`映画・ドラマ・小説に登場する場所を名前で検索してみましょう。検証済みの場所を${n}件集めました。`,
      hubListHeading:'全ての場所', cardCta:'詳しく見る →', footerAbout:'サービス紹介', footerContact:'お問い合わせ',
      footerPrivacy:'プライバシーポリシー', footerTerms:'利用規約',
      footerTag:'物語の中の場所を実際に訪れられる個人旅行地図ブログ' } },
  zh: { htmlLang:'zh-Hant', ogLocale:'zh_TW', urlPrefix:'/zh', outDir:'zh/places', siteName:'那個地方，現在',
    ui:{ home:'🏠 首頁', kicker:'依地點尋找', breadcrumbHome:'首頁', breadcrumbHub:'依地點尋找',
      subTitle:(t)=>`${t}中出現的實際地點`, tierBadge:'✅ 實際可以造訪的地方',
      note:(t)=>`您也可以一起查看「${t}」中其他實際拍攝地與故事背景地點。`,
      mapCta:'🗺️ 在地圖上查看確切位置 →', tipLabel:'💡 造訪小提示',
      workHeading:'出現這個地點的作品', workCardCta:(t)=>`在地圖上查看${t}的所有地點 →`,
      otherHeading:'也來看看其他作品的實際地點吧',
      titleTpl:(p,t)=>`${p} — ${t}拍攝地實際位置 | 那個地方，現在`,
      descFallback:(t,p)=>`${t}中出現的${p}實際位置與造訪資訊。`,
      hubTitle:'依地點尋找 — 實際可造訪的拍攝地清單 | 那個地方，現在',
      hubDesc:'用地點名稱搜尋電影、電視劇、小說中的場景。可在地圖上確認已驗證的實際拍攝地與故事背景地。',
      hubH1:'依名稱尋找實際地點',
      hubIntro:(n)=>`用地點名稱搜尋電影、電視劇、小說中出現的地方。目前已收錄${n}處已驗證的地點。`,
      hubListHeading:'所有地點', cardCta:'查看詳情 →', footerAbout:'關於本站', footerContact:'聯絡我們',
      footerPrivacy:'隱私權政策', footerTerms:'使用條款',
      footerTag:'連結故事與現實地點的個人旅遊地圖部落格' } }
};

function placeUrl(p, locale){ return `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/places/${p.slug}/`; }
function hubUrl(locale){ return `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/places/`; }
function workUrl(w, locale){ return `${SITE_ORIGIN}${LOCALES[locale].urlPrefix}/works/${w.id}/`; }
function mapUrl(w, locId){ return `${SITE_ORIGIN}/?work=${encodeURIComponent(w.id)}&loc=${encodeURIComponent(locId)}`; }
// Issue #40 Phase E v1 — Scene Package 관계 배지/컨텍스트 헤딩 (generate_work_pages.js와 동일 값 유지)
const SCENE_REL_LABEL_KO = { FILMED:'실제 촬영지', 'STORY-RELATED':'작품 속 배경', EXPERIENCE:'공식 체험', INSPIRATION:'모티프·영감' };
const SCENE_REL_COLOR = { FILMED:'#3ac07c', 'STORY-RELATED':'#c9a227', EXPERIENCE:'#3a7ce0', INSPIRATION:'#8a8fa3' };
const SCENE_CONTEXT_HEADING_KO = { SCREEN_SCENE:'이곳에서 나온 장면', STORY_SETTING:'이곳과 연결된 이야기', ADAPTATION_FILMING:'영상판은 여기서 찍혔다' };
function workTitle(w, locale){
  if (locale === 'en') return w.title_en || w.title;
  if (locale === 'ja') return w.title_ja || w.title;
  if (locale === 'zh') return w.title_zh || w.title;
  return w.title;
}

function hreflangBlock(p){
  return I18N.i18nHreflangBlock('place', p, p.slug, { origin: SITE_ORIGIN });
}
function hubHreflangBlock(){
  const lines = ['ko', 'en', 'ja', 'zh'].map(l => `<link rel="alternate" hreflang="${l === 'zh' ? 'zh-Hant' : l}" href="${hubUrl(l)}">`);
  lines.push(`<link rel="alternate" hreflang="x-default" href="${hubUrl('ko')}">`);
  return lines.join('\n');
}

function pageShell(locale, opts){
  const L = LOCALES[locale];
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
  <a class="backLink" href="${SITE_ORIGIN}${L.urlPrefix}/">${L.ui.home}</a>
</header>
<main>
${opts.body}
</main>
<footer>
  &copy; ${esc(L.siteName)} — ${esc(L.ui.footerTag)}<br>
  <a href="${SITE_ORIGIN}${L.urlPrefix}/about/">${L.ui.footerAbout}</a><a href="${SITE_ORIGIN}${L.urlPrefix}/contact/">${L.ui.footerContact}</a><a href="${SITE_ORIGIN}/privacy/">${L.ui.footerPrivacy}</a><a href="${SITE_ORIGIN}/terms/">${L.ui.footerTerms}</a>
</footer>
</body>
</html>
`;
}

// ---------- 대상 장소 선정: 작품별 라운드로빈으로 최대 TARGET_COUNT곳 ----------
function tierRank(l){ return l.tier === 'official' ? 0 : 1; } // official 먼저, 그다음 experience
const queues = works.map(w => ({
  work: w,
  items: (w.locations || [])
    .filter(l => (l.tier === 'official' || l.tier === 'experience') && l.lat != null && l.lng != null)
    .sort((a, b) => tierRank(a) - tierRank(b) || (a.order != null ? a.order : 999) - (b.order != null ? b.order : 999))
})).filter(q => q.items.length > 0);

const places = [];
const seenSlugs = new Set();
let round = 0;
while (places.length < TARGET_COUNT){
  let addedThisRound = false;
  for (const q of queues){
    if (places.length >= TARGET_COUNT) break;
    if (round >= q.items.length) continue;
    const loc = q.items[round];
    const slug = `${q.work.id}-${loc.id}`;
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    places.push({ workId: q.work.id, locId: loc.id, work: q.work, loc, slug });
    addedThisRound = true;
  }
  round++;
  if (!addedThisRound) break; // 모든 작품의 후보를 다 소진함
}
console.log('선정된 장소:', places.length, '/ 목표', TARGET_COUNT, '(후보 총', queues.reduce((s,q)=>s+q.items.length,0), '곳,', queues.length, '개 작품에서)');

function renderSceneBlockHtml(scenePkg, w, wTitle, locale){
  const relColor = SCENE_REL_COLOR[scenePkg.relationship] || SCENE_REL_COLOR.FILMED;
  const badgeStyle = `background:${relColor}22;color:${relColor};border:1px solid ${relColor}59`;
  const relLabel = SCENE_REL_LABEL_KO[scenePkg.relationship] || scenePkg.relationship;
  const heading = SCENE_CONTEXT_HEADING_KO[scenePkg.context_type] || SCENE_CONTEXT_HEADING_KO.SCREEN_SCENE;
  return `  <h2>${esc(heading)}</h2>
  <div class="sceneBlock">
    <div class="sceneImgWrap"><img src="${esc(SITE_ORIGIN + scenePkg.image_path)}" alt="${esc(scenePkg.alt_ko || '')}" loading="lazy" width="1600" height="900"></div>
    <div class="sceneBlockBody">
      <span class="sceneBadge" style="${badgeStyle}">${esc(relLabel)}</span>
      <p>${esc(scenePkg.scene_description_ko || '')}</p>
      <a class="sceneWorkLink" href="${esc(workUrl(w, locale))}">${esc(wTitle)} 자세히 보기 →</a>
    </div>
  </div>`;
}

function renderPlacePage(p, locale){
  const L = LOCALES[locale];
  const { work: w, loc: l } = p;
  const placeName = placeDisplayName(l, locale);
  const wTitle = workTitle(w, locale);
  const title = L.ui.titleTpl(placeName, wTitle);
  const rawDesc = locale === 'en' ? l.desc_en : (locale === 'ja' ? l.desc_ja : (locale === 'zh' ? (l.desc_zh || l.desc_en) : l.desc));
  const description = rawDesc ? (rawDesc.length > 150 ? rawDesc.slice(0, 148) + '…' : rawDesc) : L.ui.descFallback(wTitle, placeName);
  const canonicalUrl = placeUrl(p, locale);
  // 2026-08 Issue #10: "다른 장소도 보기" 추천 목록은 이 페이지 언어로 실제 발행된 장소만
  // 담는다. 예전에는 여기서 링크만 만들고 그 언어의 장소 페이지가 실제로 생성되는지 확인하지
  // 않아서, 예를 들어 ja 미번역 작품의 장소가 /ja/places/{slug}/에 링크되고도 정작 그 페이지는
  // 생성되지 않아 404가 나는 경우가 있었다.
  const otherPlaces = places
    .filter(o => o.workId !== p.workId && I18N.i18nStatus('place', o, locale) === 'published')
    .slice(0, 4);

  // Issue #40 Phase E v1 — Place Detail Scene/Why This Place 블록.
  // 기획 매니페스트가 _ko 필드만 제공하므로 v1은 한국어 페이지에만 렌더링한다(조용한 fallback 금지).
  const scenePkg = (locale === 'ko' && Array.isArray(w.scenePackages))
    ? w.scenePackages.find(sp => sp._hasPlacePage && sp.source_location_id === l.id)
    : null;
  const sceneBlockHtml = scenePkg ? renderSceneBlockHtml(scenePkg, w, wTitle, locale) : '';
  const whyBoxHtml = scenePkg && scenePkg.why_this_place_ko ? `  <div class="whyBox"><h2>여기, 왜 가볼 만해?</h2><p style="margin:0;">${esc(scenePkg.why_this_place_ko)}</p></div>` : '';

  const jsonLdPlace = { '@context':'https://schema.org', '@type':'TouristAttraction', name: placeName, description, url: canonicalUrl };
  if (l.lat != null && l.lng != null) jsonLdPlace.geo = { '@type':'GeoCoordinates', latitude: l.lat, longitude: l.lng };
  const breadcrumb = { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement: [
    { '@type':'ListItem', position:1, name: L.ui.breadcrumbHome, item: `${SITE_ORIGIN}${L.urlPrefix}/` },
    { '@type':'ListItem', position:2, name: L.ui.breadcrumbHub, item: hubUrl(locale) },
    { '@type':'ListItem', position:3, name: placeName, item: canonicalUrl }
  ]};
  const jsonLd = jsonLdScript(jsonLdPlace) + '\n' + jsonLdScript(breadcrumb);

  const rawTip = locale === 'en' ? l.travelTip_en : (locale === 'ja' ? (l.travelTip_ja || l.travelTip_en) : (locale === 'zh' ? (l.travelTip_zh || l.travelTip_en) : l.travelTip));
  const tipHtml = rawTip ? `  <div class="tipBox"><b>${L.ui.tipLabel}</b><br>${esc(rawTip)}</div>` : '';
  const otherHtml = otherPlaces.map(o => `    <li><a href="${placeUrl(o, locale)}">${esc(placeDisplayName(o.loc, locale))} — ${esc(workTitle(o.work, locale))}</a></li>`).join('\n');
  const wSummary = locale === 'en' ? (w.summary_en || w.summary) : (locale === 'ja' ? (w.summary_ja || w.summary) : (locale === 'zh' ? (w.summary_zh || w.summary) : w.summary));
  const wSummaryShort = (wSummary || '').length > 90 ? wSummary.slice(0, 88) + '…' : (wSummary || '');
  // 2026-08 Issue #10: 작품·지역 페이지에는 있던 언어 스위처가 장소 페이지에만 없었다 — 세 페이지
  // 타입이 같은 공통 헬퍼로 동일한 스위처를 갖게 통일한다.
  const langLinksHtml = `<nav class="wsLangs" aria-label="Languages">
    ${I18N.i18nSwitcherHtml('place', p, p.slug, locale, { origin: SITE_ORIGIN })}
  </nav>`;

  const body = `  <p class="kicker">${L.ui.kicker}</p>
  ${langLinksHtml}
  <p class="breadcrumb"><a href="${SITE_ORIGIN}${L.urlPrefix}/">${L.ui.breadcrumbHome}</a> / <a href="${hubUrl(locale)}">${L.ui.breadcrumbHub}</a> / ${esc(placeName)}</p>

  <div class="phIdentity">
    <h1>${esc(placeName)}</h1>
    <p class="subTitle">${esc(L.ui.subTitle(wTitle))}</p>
    <span class="tierBadge">${L.ui.tierBadge}</span>
  </div>

  <div class="mapCtaWrap">
    <a class="mapCta" href="${mapUrl(w, l.id)}">${L.ui.mapCta}</a>
  </div>
${sceneBlockHtml}
${whyBoxHtml}
  <p class="intro">${esc(rawDesc || '')}</p>
${tipHtml}
  <div class="noteBox">${esc(L.ui.note(wTitle))}</div>

  <h2>${L.ui.workHeading}</h2>
  <a class="workCard" href="${workUrl(w, locale)}">
    <h3>${esc(wTitle)}</h3>
    <p>${esc(wSummaryShort)}</p>
    <span class="cta">${esc(L.ui.workCardCta(wTitle))}</span>
  </a>

  <h2>${L.ui.otherHeading}</h2>
  <ul class="otherList">
${otherHtml}
  </ul>

  <div class="finalCtaWrap">
    <a class="mapCta" href="${mapUrl(w, l.id)}">${L.ui.mapCta}</a>
  </div>`;

  return pageShell(locale, { title, description, canonicalUrl, jsonLd, hreflang: hreflangBlock(p), body });
}

function renderHubPage(locale){
  const L = LOCALES[locale];
  const canonicalUrl = hubUrl(locale);
  const jsonLd = jsonLdScript({ '@context':'https://schema.org', '@type':'CollectionPage', name: L.ui.hubTitle, url: canonicalUrl });
  // RC QA fix (2026-09): 이 허브 페이지는 zh/ja에서도 필터 없이 전체 places를 나열하고
  // 있었다 — 개별 장소 페이지 생성 루프(아래 파일 쓰기 섹션)는 jaAvailable/zhAvailable로
  // 걸러서 실제로 존재하는 페이지만 만드는데, 허브 카드 목록은 그 필터를 안 타서 아직
  // 생성되지 않은 언어의 장소로 링크된 깨진 링크(404)가 다수 발생했다. 개별 장소 페이지
  // 생성 루프와 동일한 가용성 기준을 여기서도 적용한다.
  const hubPlaces = locale === 'zh' ? places.filter(p => zhAvailable(p.work))
    : locale === 'ja' ? places.filter(p => jaAvailable(p.work))
    : places;
  const cardsHtml = hubPlaces.map(p => `    <a class="workCard" href="${placeUrl(p, locale)}">
      <h3>${esc(placeDisplayName(p.loc, locale))}</h3>
      <p>${esc(workTitle(p.work, locale))}</p>
      <span class="cta">${L.ui.cardCta}</span>
    </a>`).join('\n');
  const body = `  <p class="kicker">${L.ui.kicker}</p>
  <p class="breadcrumb"><a href="${SITE_ORIGIN}${L.urlPrefix}/">${L.ui.breadcrumbHome}</a> / ${L.ui.breadcrumbHub}</p>
  <h1>${L.ui.hubH1}</h1>
  <p class="intro">${esc(L.ui.hubIntro(hubPlaces.length))}</p>
  <h2>${L.ui.hubListHeading}</h2>
  <div class="placeGrid">
${cardsHtml}
  </div>`;
  return pageShell(locale, { title: L.ui.hubTitle, description: L.ui.hubDesc, canonicalUrl, jsonLd, hreflang: hubHreflangBlock(), body });
}

// ---------- 파일 쓰기 ----------
let totalCount = 0;
['ko', 'en'].forEach(locale => {
  const outBase = path.join(__dirname, LOCALES[locale].outDir);
  if (!fs.existsSync(outBase)) fs.mkdirSync(outBase, { recursive: true });
  fs.writeFileSync(path.join(outBase, 'index.html'), renderHubPage(locale), 'utf8');
  places.forEach(p => {
    const dir = path.join(outBase, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), renderPlacePage(p, locale), 'utf8');
    totalCount++;
  });
});
// 일본어는 원작이 일본어 콘텐츠를 지원하는(jaAvailable) 장소만
const jaOutBase = path.join(__dirname, LOCALES.ja.outDir);
if (!fs.existsSync(jaOutBase)) fs.mkdirSync(jaOutBase, { recursive: true });
fs.writeFileSync(path.join(jaOutBase, 'index.html'), renderHubPage('ja'), 'utf8');
let jaCount = 0;
places.forEach(p => {
  if (!jaAvailable(p.work)) return;
  const dir = path.join(jaOutBase, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPlacePage(p, 'ja'), 'utf8');
  jaCount++;
  totalCount++;
});
// 2026-08 3단계: 번체 중문(대만·홍콩)은 원작이 title_zh를 지원하는(zhAvailable) 장소만
const zhOutBase = path.join(__dirname, LOCALES.zh.outDir);
if (!fs.existsSync(zhOutBase)) fs.mkdirSync(zhOutBase, { recursive: true });
fs.writeFileSync(path.join(zhOutBase, 'index.html'), renderHubPage('zh'), 'utf8');
let zhCount = 0;
places.forEach(p => {
  if (!zhAvailable(p.work)) return;
  const dir = path.join(zhOutBase, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPlacePage(p, 'zh'), 'utf8');
  zhCount++;
  totalCount++;
});
console.log('생성 완료 — ko:', places.length + 1, 'en:', places.length + 1, 'ja:', jaCount + 1, 'zh:', zhCount + 1, '(허브 페이지 포함), 총 파일:', totalCount + 4);

// ---------- sitemap.xml 갱신: 기존 /places/ 관련 URL을 전부 지우고 새로 채움 ----------
function urlEntry(loc, lastmod, changefreq, priority){
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}
const sitemapPath = path.join(__dirname, 'sitemap.xml');
if (fs.existsSync(sitemapPath)){
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  // 기존 <url>...</url> 블록 중 <loc>에 /places/ 가 들어간 것들을 통째로 제거(재실행 시 중복/구버전 방지)
  sitemap = sitemap.replace(/  <url>\n(?:[^\n]*\n)*?\s*<loc>[^<]*\/places\/[^<]*<\/loc>\n(?:[^\n]*\n)*?  <\/url>\n/g, '');
  const entries = [];
  entries.push(urlEntry(hubUrl('ko'), TODAY, 'weekly', '0.6'));
  entries.push(urlEntry(hubUrl('en'), TODAY, 'weekly', '0.6'));
  entries.push(urlEntry(hubUrl('ja'), TODAY, 'weekly', '0.6'));
  entries.push(urlEntry(hubUrl('zh'), TODAY, 'weekly', '0.6'));
  places.forEach(p => {
    entries.push(urlEntry(placeUrl(p, 'ko'), TODAY, 'monthly', '0.5'));
    entries.push(urlEntry(placeUrl(p, 'en'), TODAY, 'monthly', '0.5'));
    if (jaAvailable(p.work)) entries.push(urlEntry(placeUrl(p, 'ja'), TODAY, 'monthly', '0.5'));
    if (zhAvailable(p.work)) entries.push(urlEntry(placeUrl(p, 'zh'), TODAY, 'monthly', '0.5'));
  });
  sitemap = sitemap.replace('</urlset>', entries.join('\n') + '\n</urlset>\n');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('sitemap.xml: 장소 URL', entries.length, '개로 갱신');
} else {
  console.log('sitemap.xml not found — skipped (run generate_work_pages.js first)');
}
