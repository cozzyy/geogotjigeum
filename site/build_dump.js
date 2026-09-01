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
const { execFileSync } = require('child_process');

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

// ---------- 1-8. Scene Package manifest 병합 (Issue #40 Phase E v1) ----------
// 입력: docs/growth/story-scene/SCENE_PACKAGES_READY_V1.yaml (기획 측 planner_ready 산출물,
// planner_contract.render_only_from_this_file: true — 구 SCENE_PACKAGES_DRAFT_V1.yaml은 사용하지 않는다).
// 이 저장소는 npm 의존성이 전혀 없고(node_modules 없음) 이 빌드 환경은 npm/GitHub 네트워크가
// 막혀 있어 js-yaml 설치가 불가능하다. 대신 이미 설치돼 있는 python3 + PyYAML을 child_process로
// 1회 호출해 YAML -> JSON 변환만 위임한다. 매 빌드마다 YAML 원본을 그대로 다시 읽으므로 중간 JSON을
// repo에 커밋하지 않고 YAML 파일 자체가 유일한 source of truth로 유지된다.
const READY_MANIFEST_PATH = path.join(SITE_DIR, '..', 'docs', 'growth', 'story-scene', 'SCENE_PACKAGES_READY_V1.yaml');
const PY_YAML_TO_JSON = "import sys, json, yaml, datetime\nwith open(sys.argv[1], encoding='utf-8') as f:\n    data = yaml.safe_load(f)\ndef _default(o):\n    if isinstance(o, (datetime.date, datetime.datetime)):\n        return o.isoformat()\n    raise TypeError(repr(o) + ' is not JSON serializable')\njson.dump(data, sys.stdout, ensure_ascii=False, default=_default)\n";
if (fs.existsSync(READY_MANIFEST_PATH)) {
  const raw = execFileSync('python3', ['-c', PY_YAML_TO_JSON, READY_MANIFEST_PATH], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const sceneManifest = JSON.parse(raw);
  if (!sceneManifest.planner_contract || sceneManifest.planner_contract.render_only_from_this_file !== true) {
    throw new Error('[build_dump] SCENE_PACKAGES_READY_V1.yaml의 planner_contract.render_only_from_this_file이 true가 아닙니다 — 구현 입력 파일이 맞는지 확인 필요.');
  }
  const packages = sceneManifest.packages || [];
  const byWork = {};
  let resolved = 0, unresolved = 0, withPlace = 0, mapOnly = 0;
  packages.forEach(pkg => {
    if (pkg.status !== 'PLANNER_READY') {
      console.warn(`[build_dump] scene package ${pkg.scene_id} status=${pkg.status} — PLANNER_READY가 아니라 건너뜁니다.`);
      return;
    }
    const w = WORKS.find(x => x.id === pkg.work_id);
    if (!w) { console.warn(`[build_dump] scene package ${pkg.scene_id}: work_id "${pkg.work_id}"를 WORKS에서 찾지 못했습니다.`); unresolved++; return; }
    const loc = (w.locations || []).find(l => l.id === pkg.source_location_id);
    if (!loc) { console.warn(`[build_dump] scene package ${pkg.scene_id}: source_location_id "${pkg.source_location_id}"를 ${pkg.work_id}의 locations에서 찾지 못했습니다.`); unresolved++; return; }
    const hasPlacePage = pkg.link_mode !== 'MAP_STATE' && (loc.tier === 'official' || loc.tier === 'experience') && loc.lat != null && loc.lng != null;
    if (hasPlacePage) withPlace++; else mapOnly++;
    resolved++;
    if (!byWork[pkg.work_id]) byWork[pkg.work_id] = [];
    byWork[pkg.work_id].push(Object.assign({}, pkg, {
      _locModernName: loc.modernName || null,
      _hasPlacePage: hasPlacePage,
    }));
  });
  WORKS.forEach(w => { if (byWork[w.id]) w.scenePackages = byWork[w.id]; });
  console.log(`[build_dump] scene packages: ${resolved} resolved (${withPlace} Place-linked, ${mapOnly} Map-state-only), ${unresolved} unresolved`);
  if (unresolved > 0) {
    throw new Error(`[build_dump] scene package ${unresolved}건이 canonical source에서 해석되지 않았습니다 — 위 경고 확인 필요.`);
  }
} else {
  console.warn('[build_dump] SCENE_PACKAGES_READY_V1.yaml이 없어 scene package 병합을 건너뜁니다 (Issue #40 미착수 상태).');
}

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


// ---------- 3. Guide Package manifest 병합 (Issue #41 Phase F v1) ----------
// 입력: docs/growth/guides/GUIDE_PACKAGES_READY_V1.yaml (기획 측 planner_ready 산출물,
// planner_contract.render_only_from_this_file: true). Scene Package와 동일한 이유로
// (npm 의존성 없음 + 네트워크 차단) python3 + PyYAML을 1회성 변환기로 재사용한다.
// Guide는 works_dump.json에 병합하지 않고 별도 guides_dump.json으로 분리한다 — Work
// 데이터와는 다른 콘텐츠 타입(여러 Stop을 묶은 라우트/순례 콘텐츠)이라 WORKS[].guides
// 같은 형태로 억지로 끼워넣지 않는다(스키마 문서 "공용 Guide renderer 1개"와 별개로,
// 데이터 레벨에서도 WORKS 구조를 건드리지 않는 게 가장 작은 변경).
const GUIDE_MANIFEST_PATH = path.join(SITE_DIR, '..', 'docs', 'growth', 'guides', 'GUIDE_PACKAGES_READY_V1.yaml');
if (fs.existsSync(GUIDE_MANIFEST_PATH)) {
  const rawGuide = execFileSync('python3', ['-c', PY_YAML_TO_JSON, GUIDE_MANIFEST_PATH], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const guideManifest = JSON.parse(rawGuide);
  if (!guideManifest.planner_contract || guideManifest.planner_contract.render_only_from_this_file !== true) {
    throw new Error('[build_dump] GUIDE_PACKAGES_READY_V1.yaml의 planner_contract.render_only_from_this_file이 true가 아닙니다 — 구현 입력 파일이 맞는지 확인 필요.');
  }
  const guidePackages = guideManifest.packages || [];
  let guideOk = 0, guideSkipped = 0;
  const readyGuides = [];
  guidePackages.forEach(g => {
    if (g.status !== 'PLANNER_READY') {
      console.warn(`[build_dump] guide package ${g.guide_id} status=${g.status} — PLANNER_READY가 아니라 건너뜁니다.`);
      guideSkipped++;
      return;
    }
    const w = WORKS.find(x => x.id === g.work_id);
    if (!w) { console.warn(`[build_dump] guide package ${g.guide_id}: work_id "${g.work_id}"를 WORKS에서 찾지 못했습니다.`); guideSkipped++; return; }
    // Guide의 각 stop이 가리키는 canonical_location_id가 실제로 그 작품의 locations에 있는지
    // 여기서 한 번 검증한다 — Scene Package와 동일하게 "canonical source에 없는 stop"을
    // 조용히 넘기지 않고 build 실패로 드러낸다.
    let stopsMissing = 0;
    (g.segments || []).forEach(seg => {
      (seg.stops || []).forEach(stop => {
        const loc = (w.locations || []).find(l => l.id === stop.canonical_location_id);
        if (!loc) {
          console.warn(`[build_dump] guide ${g.guide_id} stop ${stop.stop_id}: canonical_location_id "${stop.canonical_location_id}"를 ${g.work_id}의 locations에서 찾지 못했습니다.`);
          stopsMissing++;
        }
      });
    });
    if (stopsMissing > 0) { guideSkipped++; return; }
    readyGuides.push(g);
    guideOk++;
  });
  fs.writeFileSync(path.join(OUT_DIR, 'guides_dump.json'), JSON.stringify(readyGuides), 'utf8');
  console.log(`[build_dump] guide packages: ${guideOk} resolved, ${guideSkipped} skipped — wrote guides_dump.json`);
  if (guideSkipped > 0) {
    throw new Error(`[build_dump] guide package ${guideSkipped}건이 검증 실패했습니다 — 위 경고 확인 필요.`);
  }
} else {
  console.warn('[build_dump] GUIDE_PACKAGES_READY_V1.yaml이 없어 guide package 병합을 건너뜁니다 (Issue #41 미착수 상태).');
}

console.log('[build_dump] done.');
