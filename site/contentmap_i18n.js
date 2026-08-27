/* ============================================================
   공통 다국어 헬퍼 — locale 준비상태 registry + URL/hreflang/스위처
   (Issue #10, docs/qa/i18n-language-switcher-remediation-plan-v2.md 구현)

   왜 이 파일이 필요한가: 언어 전환/번역 준비상태 판정이 contentmap_app.js의
   workHubPath(), generate_work_pages.js/generate_region_pages.js의 hubUrl()에
   각각 따로 구현돼 있었고, 셋 다 "ja/zh 번역이 없으면 영어 페이지로 조용히
   보낸다"는 같은 폴백을 갖고 있었다. 사용자가 JP/繁中을 선택했는데 클릭한
   버튼이 영어 페이지로 데려가는 게 실제 버그였다. 이 파일이 그 판정을
   한 곳으로 모으고, "번역이 없으면 링크 없는 준비 중 상태로 보여준다"는
   새 규칙을 강제한다.

   브라우저(<script> 태그, contentmap_app.js보다 먼저 로드)와 Node
   (generate_work_pages.js 등에서 require)에서 동일 코드로 동작해야 하므로
   DOM이나 모듈 시스템 특정 API에 의존하지 않는다.

   내부 locale 코드는 그대로 'ko'|'en'|'ja'|'zh'를 쓴다(기존 currentLang,
   SUPPORTED_LANGS와 동일 — URL도 /zh/ 그대로 유지). hreflang에 실리는 값만
   'zh-Hant'로 명확히 한다. 대이동(URL 구조 변경, 변수명 전면 교체)은 이번
   작업 범위가 아니다.
   ============================================================ */
(function (root) {
  var I18N_LOCALES = [
    { code: 'ko', urlPrefix: '',    hreflang: 'ko',      label: '한국어',  short: 'KR' },
    { code: 'en', urlPrefix: '/en', hreflang: 'en',      label: 'English', short: 'EN' },
    { code: 'ja', urlPrefix: '/ja', hreflang: 'ja',      label: '日本語',  short: 'JP' },
    { code: 'zh', urlPrefix: '/zh', hreflang: 'zh-Hant', label: '繁中',    short: '繁中' }
  ];
  var LOCALE_MAP = {};
  I18N_LOCALES.forEach(function (l) { LOCALE_MAP[l.code] = l; });

  var PLANNED_LABEL = { ko: '준비 중', en: 'Coming soon', ja: '準備中', zh: '準備中' };

  var ENTITY_PATH = { work: 'works', place: 'places', region: 'regions' };

  // entityType: 'work' | 'place' | 'region'
  // entity: work이면 work 객체 그대로, place면 { work: <부모 work 객체>, ... } 형태,
  //         region이면 아무 값이나(지역 페이지는 작품 번역 상태와 무관하게 4개 언어 항상 발행).
  function i18nStatus(entityType, entity, locale) {
    if (!LOCALE_MAP[locale]) return 'planned';
    if (locale === 'ko' || locale === 'en') return 'published';
    if (entityType === 'region') return 'published';
    // place는 부모 작품의 번역 상태를 그대로 물려받는다 — 장소별 완역 여부를 별도
    // 필드로 관리하지 않는 현재 데이터 구조에서는 이게 가장 정직한 근사치.
    // (장소 단위로 세분화하는 건 이후 별도 작업 — docs/qa/i18n-language-switcher-remediation-plan-v2.md 4.3)
    var w = (entityType === 'place') ? (entity && entity.work) : entity;
    if (!w) return 'planned';
    if (locale === 'ja') return w.title_ja ? 'published' : 'planned';
    if (locale === 'zh') return w.title_zh ? 'published' : 'planned';
    return 'planned';
  }

  function i18nUrl(entityType, id, locale, opts) {
    opts = opts || {};
    var loc = LOCALE_MAP[locale];
    if (!loc) return null;
    var origin = opts.origin || '';
    var seg = ENTITY_PATH[entityType];
    if (!seg) return origin + loc.urlPrefix + '/';
    return origin + loc.urlPrefix + '/' + seg + '/' + id + '/';
  }

  // 정적 페이지(Node)·SPA(브라우저) 공용 언어 스위처 HTML.
  // published: <a href> 진짜 링크. planned: 링크 없는 '준비 중' 배지 — 다른 언어로 보내지 않는다.
  function i18nSwitcherHtml(entityType, entity, id, currentLocale, opts) {
    opts = opts || {};
    var useShort = opts.short !== false; // 기본 짧은 라벨(KR/EN/JP/繁中) — 기존 헤더·wsLangs 스타일 유지
    return I18N_LOCALES.map(function (l) {
      var status = i18nStatus(entityType, entity, l.code);
      var labelText = useShort ? l.short : l.label;
      var isCurrent = (l.code === currentLocale);
      if (status === 'published') {
        var href = i18nUrl(entityType, id, l.code, opts);
        return '<a href="' + href + '"' + (isCurrent ? ' class="on" aria-current="page"' : '') + '>' + labelText + '</a>';
      }
      var plannedText = (PLANNED_LABEL[currentLocale] || PLANNED_LABEL.ko);
      return '<span class="wsLangs-planned" aria-disabled="true" title="' + plannedText + '">' + labelText + '</span>';
    }).join('\n    ');
  }

  function i18nHreflangBlock(entityType, entity, id, opts) {
    opts = opts || {};
    var lines = I18N_LOCALES.filter(function (l) {
      return i18nStatus(entityType, entity, l.code) === 'published';
    }).map(function (l) {
      return '<link rel="alternate" hreflang="' + l.hreflang + '" href="' + i18nUrl(entityType, id, l.code, opts) + '">';
    });
    lines.push('<link rel="alternate" hreflang="x-default" href="' + i18nUrl(entityType, id, 'ko', opts) + '">');
    return lines.join('\n');
  }

  var api = {
    I18N_LOCALES: I18N_LOCALES,
    i18nStatus: i18nStatus,
    i18nUrl: i18nUrl,
    i18nSwitcherHtml: i18nSwitcherHtml,
    i18nHreflangBlock: i18nHreflangBlock
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    Object.keys(api).forEach(function (k) { root[k] = api[k]; });
  }
})(typeof window !== 'undefined' ? window : this);
