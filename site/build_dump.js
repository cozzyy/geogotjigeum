// build_dump.js — 2026-09-01 재작성 (원본 스크립트는 /tmp 스크래치 클론 유실로 사라짐)
//
// 목적: generate_work_pages.js / generate_place_pages.js / generate_region_pages.js /
//       generate_culture_pages.js 네 개의 정적 페이지 생성기가 공통으로 읽는
//       /tmp/seowork/works_dump.json 과 (region 생성기 전용) /tmp/seowork/regions_dump.json 을
//       만든다.
//
// 왜 필요한가: 브라우저 앱(contentmap_app.js)은 각 작품의 *_locations.js/*_people.js를
//       WORK_DATA_FILES 매니페스트에 따라 지연 로딩(lazy-load)한다. Node 환경의 정적 생성기는
//       브라우저가 아니므로 이 지연 로딩이 일어나지 않는다 — 대신 이 스크립트가 vm으로 모든
//       조각 파일을 미리 다 로드하고 병합(WORKS[].locations/.people 평탄화, _ja/_zh 필드 병합)한
//       뒤 JSON 스냅샷으로 떠서 생성기들이 그 스냅샷만 읽게 한다.
//
// 실행: node build_dump.js   (반드시 site/ 디렉터리 안에서 실행)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE_DIR = __dirname;
const OUT_DIR = '/tmp/seowork';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function loadInto(ctx, filename){
  const full = path.join(SITE_DIR, filename);
  const src = fs.readFileSync(full, 'utf8');
  vm.runInContext(src, ctx, { filename });
}

// ---------- 1. WORKS/DATA 조립용 메인 컨텍스트 ----------
const ctx = vm.createContext({ console, module: {}, exports: {} });

// 1-1. 장소 상세 서술 (LOCATION_DETAILS) — 다른 파일이 참조하지 않지만 원본 로드 순서를 재현
loadInto(ctx, 'contentmap_details.js');

// 1-2. 모든 *_locations*.js / *_people*.js 조각 파일을 data.js보다 먼저 로드해야 한다
//      (data.js의 buildWorkDataMap()이 typeof 가드로 이 전역 변수들의 존재를 확인하기 때문).
const fragmentFiles = fs.readdirSync(SITE_DIR)
  .filter(f => /^contentmap_.*_(locations|people)\d*\.js$/.test(f) || f === 'contentmap_santi_extra.js')
  .sort();
console.log(`[build_dump] loading ${fragmentFiles.length} location/people fragment files...`);
fragmentFiles.forEach(f => loadInto(ctx, f));

// 1-3. 메인 데이터 (WORKS 배열 + DATA 맵)
loadInto(ctx, 'contentmap_data.js');

// 1-4. 일본어 콘텐츠 병합 (자체적으로 파일 끝에서 applyJaContent() 호출)
loadInto(ctx, 'contentmap_ja_content.js');

// 1-5. 번체중문 콘텐츠 병합 (자체적으로 파일 끝에서 applyZhContent() 호출)
loadInto(ctx, 'contentmap_zh_content.js');

const WORKS = vm.runInContext('WORKS', ctx);
const DATA = vm.runInContext('DATA', ctx);

// 1-6. 평탄화: WORKS[].locations / WORKS[].people 에 DATA[workId]의 실데이터를 심는다
WORKS.forEach(w => {
  const d = DATA[w.id];
  w.locations = (d && d.locations) ? d.locations : [];
  w.people = (d && d.people) ? d.people : [];
});

// 1-7. tier 파생 — contentmap_app.js의 deriveConnectionTier()와 완전히 동일한 로직.
//      원본 위치 데이터에는 tier 필드가 없고, 브라우저 앱은 렌더링 시점에 tag/tag_en 문자열에서
//      매번 파생해서 쓴다. 정적 생성기들(generate_place_pages.js의 official/experience 선정,
//      generate_work_pages.js의 tier 배지·색상·TOP5 정렬)은 이 필드가 이미 데이터에 박혀 있다고
//      가정하므로, 덤프 시점에 반드시 같은 규칙으로 한 번 계산해 심어줘야 한다.
function deriveConnectionTier(loc){
  const hay = ((loc.tag_en || '') + ' ' + (loc.tag || '')).toUpperCase();
  if (hay.indexOf('FILMED') !== -1) return 'official';
  if (hay.indexOf('EXPERIENCE') !== -1) return 'experience';
  if (hay.indexOf('설정') !== -1 || hay.indexOf('STORY SETTING') !== -1 || hay.indexOf('허구') !== -1) return 'theme';
  return 'direct';
}
let tierCounts = { official:0, experience:0, theme:0, direct:0 };
WORKS.forEach(w => {
  (w.locations || []).forEach(l => {
    l.tier = deriveConnectionTier(l);
    tierCounts[l.tier] = (tierCounts[l.tier] || 0) + 1;
  });
});
console.log('[build_dump] tier distribution across all locations:', tierCounts);

const worksJson = JSON.stringify(WORKS);
fs.writeFileSync(path.join(OUT_DIR, 'works_dump.json'), worksJson, 'utf8');
console.log(`[build_dump] wrote works_dump.json (${WORKS.length} works, ${(worksJson.length/1024).toFixed(0)} KB)`);

// zh 가용 작품 빠른 점검
const zhWorks = WORKS.filter(w => !!w.title_zh);
console.log('[build_dump] zh-available works:', zhWorks.map(w => w.id).join(', '));

// ---------- 2. REGION_DEFS / COUNTRY_REGION_DEFS 추출 ----------
// contentmap_app.js는 브라우저 전용 코드(맨 위에서 바로 new maplibregl.Map(...) 등 DOM 의존)라
// 파일 전체를 vm으로 실행할 수 없다. REGION_DEFS ~ COUNTRY_REGION_DEFS 구간은 WORKS/DATA나
// DOM에 의존하지 않는 순수 데이터 블록이므로, 그 구간만 텍스트로 잘라내 별도 컨텍스트에서 실행한다.
const appSrc = fs.readFileSync(path.join(SITE_DIR, 'contentmap_app.js'), 'utf8');
const startMarker = 'const REGION_DEFS = [';
const endMarker = 'let expandedRegionId = null;';
const startIdx = appSrc.indexOf(startMarker);
const endIdx = appSrc.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
  throw new Error('[build_dump] REGION_DEFS/COUNTRY_REGION_DEFS 블록 경계를 찾지 못했습니다 — contentmap_app.js 구조가 바뀌었을 수 있습니다. 수동 확인 필요.');
}
const regionSrc = appSrc.slice(startIdx, endIdx);
const regionCtx = vm.createContext({ console });
vm.runInContext(regionSrc, regionCtx, { filename: 'contentmap_app.js (REGION_DEFS slice)' });
const REGION_DEFS = vm.runInContext('REGION_DEFS', regionCtx);
const COUNTRY_REGION_DEFS = vm.runInContext('COUNTRY_REGION_DEFS', regionCtx);

console.log(`[build_dump] REGION_DEFS: ${REGION_DEFS.length} entries, COUNTRY_REGION_DEFS: ${COUNTRY_REGION_DEFS.length} entries`);

const regionsDump = {
  regionDefs: REGION_DEFS,
  countryRegionDefs: COUNTRY_REGION_DEFS,
  works: WORKS
};
fs.writeFileSync(path.join(OUT_DIR, 'regions_dump.json'), JSON.stringify(regionsDump), 'utf8');
console.log('[build_dump] wrote regions_dump.json');

console.log('[build_dump] done.');
