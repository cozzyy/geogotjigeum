# Issue #37 繁中(zh-Hant) Pilot — 개발자 인계 노트 (2026-09-01)

이 문서는 세션 중단(샌드박스 리셋으로 `/tmp` 작업 클론 유실) 때문에 다음 개발자가
GitHub 상태만 보고도 이어갈 수 있도록 지금까지의 판단·리서치를 전부 기록한다.
**이 문서 자체는 삭제하지 말고, Pilot 구현이 끝난 뒤 참고용으로 남겨둘 것.**

## 0. 지금 이 브랜치 상태

- 브랜치: `wip/stage-c-closeout-and-zh-hant-audit-20260901` (origin/main HEAD = `b5ba8eb` 기준)
- 이 커밋에 포함된 변경: `site/contentmap_data.js`의 `odyssey`/`breakingbad` `hookReveals`에 `label_ja` 8건 추가
  (Stage C closeout QA에서 발견된 locale-fallback 버그 수정 — JA 사용자에게 EN/KO가 조용히 노출되던 문제)
- **push 시도 결과: 이 샌드박스에는 GitHub 자격증명(PAT)이 없어 직접 push 불가.**
  사용자가 이 브랜치를 직접 push하거나, PAT를 제공해야 함. 지금까지의 패턴대로
  "PR 준비까지 하고 실제 push/merge는 사용자가 수행"이 맞음.
- 이전 세션들에서 실제 배포용 zip을 만들던 작업 클론(`/tmp/repo_work/geogotjigeum`)은
  bash 샌드박스가 리셋되며 통째로 사라졌다. 그 클론에서 커밋했던
  "Stage C closeout: odyssey/breakingbad label_ja 보완" 커밋 자체는 유실됐지만,
  **완성된 배포 zip은 살아있다**: `새 폴더/geugotjigeum_2026-08-31_stageC-closeout-locale-fix.zip`
  (이 zip이 이미 사용자에게 전달됨). 이번 커밋은 그 zip이 반영했던 소스 변경을
  이 영구 저장소(`새 폴더/geogotjigeum_repo`)에 다시 적용한 것 — 내용은 동일함.

**교훈**: 앞으로는 `/tmp` 스크래치 클론이 아니라 이 `새 폴더/geogotjigeum_repo`
(사용자 워크스페이스에 마운트되어 세션 리셋에도 살아남음)를 기준 작업 디렉터리로
쓰는 게 안전하다. `/tmp` 클론은 빌드 파이프라인 실행 같은 무거운 작업의 스크래치 용도로만
쓰고, 실제 커밋은 이 영구 클론에서 하는 방향을 고려할 것.

## 1. Stage C closeout — 완료

PM 지시(Stage C는 C5에서 종료, Section 0)의 6개 체크리스트 전부 확인 완료:
- URL/canonical/hreflang/sitemap 보존 — 문제없음
- title/H1 안정성 — glory 등 1건 의도적 변경 외 전부 유지
- Work→Place→Region→Map 내부링크 — 정상 (frozen-312 안전장치로 인한 카운트 차이는 버그 아님)
- 질문형 검색의도 반영 — 기존 발견형 인트로 포맷(hookBox + hookReveals + TOP5 Place + Map CTA)이
  이미 H2/짧은답변형 요건을 충족한다고 판단, **추가 수정 없음** (PM 지시 "이미 충분하면 수정하지 말 것" 적용)
- GSC baseline — `docs/growth/GSC_PERFORMANCE_2026-08-31_ANALYSIS.md`가 이미 오늘 날짜 기준선
- broken link / FILMED 오분류 / locale fallback — broken link 0건, FILMED 분류는 C1~C5 작업 중 검증 완료,
  locale fallback은 odyssey/breakingbad `label_ja` 누락 1건 발견 → 이 커밋에서 수정

신규 작품 3종(이런 엿같은 사랑/동궁/오싹한 연애)은 Research Gate 유지, 개발 안 함 — 그대로.

## 2. Issue #37 繁中 Pilot — 사전 감사 결과 + PM 결정사항

### 2.1 감사 결과 요약 (구현 전 필수 보고 항목)

**(1) 현재 `/zh/` 구조**: `site/zh/{index.html, works/, places/, regions/}` 존재.
`zh/works/`에 기존 6개 작품(`squidgame, kdemonhunters, daejanggeum, wintersonata, coffeeprince, poksshak`)만
있음. `zh/places/`는 허브 페이지 1개뿐 — **개별 Place SEO 페이지가 zh에 하나도 없다** (아래 2.2 참고).
`zh/regions/`는 151개 정상 생성(ko/en/ja와 동일 폭).

**(2) generator/source-of-truth 확인**:
- Work 메타(title_zh/author_zh/era_zh/summary_zh) + 장소 필드(modernName_zh/tag_zh/description_zh/travelTip_zh)의
  단일 진실 소스는 `site/contentmap_zh_content.js` — `ja_content.js`와 동일한 병합 패턴.
  `applyZhContent()`가 로드 시점에 `WORKS`/`DATA`에 `_zh` 필드를 병합(Object.assign, 멱등).
  **개별 `*_locations.js`나 generated HTML을 직접 고치지 않는다** — 이 파일 하나만 수정.
- `zhAvailable(w){ return !!w.title_zh; }` — 이 한 줄이 `generate_work_pages.js`,
  `generate_place_pages.js`, `generate_region_pages.js` 세 곳에 동일하게 정의돼 있고,
  **work에 title_zh가 있어야만** 해당 작품의 zh Work/Place 정적 페이지와 sitemap 엔트리가 생성된다.
- 빌드 파이프라인 순서(변경 없음): `node build_dump.js`(vm으로 `details.js` → 모든
  `*_locations/people.js` → `data.js` → `ja_content.js` → `zh_content.js` 순서 로드, 이 순서가
  깨지면 안 됨) → `generate_work_pages.js`(sitemap 리셋) → `generate_region_pages.js` →
  `generate_place_pages.js` → `generate_culture_pages.js`.

**(3) Work/Place/Region/Map 연결 확인**: Region은 zhAvailable과 무관하게 전체 151개 항상 생성됨(문제없음).
Place는 **zhAvailable(work) && 그 장소가 Issue #26 frozen-312 목록에 이미 커밋돼 있어야** 생성됨 — 아래 2.2가 핵심 블로커.

**(4) ko/en fallback 점검**: `generate_place_pages.js`에서
`desc_zh || desc_en`, `travelTip_zh || travelTip_ja || travelTip_en`, `summary_zh || summary`(summary는 KO로 폴백!) 처럼
**zh 필드가 비어있으면 조용히 다른 언어로 폴백하는 코드가 이미 존재**한다(zh 전용 버그 아니라 en/ja도 마찬가지 패턴).
이 Pilot에서는 "번역 없는 콘텐츠를 조용히 폴백하지 말 것" 원칙에 따라 **폴백에 의존하지 않고
5개 작품의 모든 committed Place 필드를 전부 명시적으로 채워서** 이 폴백이 실제로 발동하지 않게 만드는
방식으로 접근 중이었음(제너레이터 자체를 고치는 건 en/ja에도 영향이 커서 이번 Pilot 범위 밖으로 판단).
- 추가로 발견한 별개 버그(사이트 전체, zh 한정 아님): `generate_work_pages.js`의 히어로 이미지 캡션
  (`w.heroImage.credit`)은 로케일 필드가 아예 없어서 zh(및 en/ja) 페이지에도 한국어 원문이 그대로 노출됨
  (`zh/works/squidgame/index.html` 288행에서 실측 확인: "월미도, 인천(기훈의 어린 시절 기억이 담긴 실제 장소)").
  **이번 Pilot에서는 고치지 않고 보고만 함** — 전체 사이트 공통 필드라 손대면 en/ja 전체 회귀 위험.
  다음에 별도 티켓으로 `heroImage.credit_en/credit_ja/credit_zh` 필드 분리를 제안.

### 2.2 핵심 블로커 (PM에게 보고 후 결정 받음)

Issue #26에서 "이미 색인된 312곳 고정" 안전장치(`generate_place_pages.js`)가 있어서,
**어떤 작품이든 title_zh를 추가해도, 그 작품의 개별 장소가 이미 커밋된 `site/places/` 디렉터리
목록에 slug로 존재하지 않으면 zh(뿐 아니라 ko/en도 이미 마찬가지) Place SEO 페이지가 생기지 않는다.**

최초 Pilot 고정 5개(`squidgame, poksshak, glory, dokkaebi, isatong`) 중:
- `glory`: 커밋된 Place slug 7개 (충분 — 5개 이상 요건 통과)
- `squidgame`: 후보 1개, 커밋 0개
- `poksshak`: 후보 2개, 커밋 0개
- `dokkaebi`: 후보 59개, 커밋 0개
- `isatong`: 후보 19개, 커밋 0개

**PM 결정 (AskUserQuestion 2회, 2026-09-01)**:
1. squidgame·poksshak은 "다른 후보로 교체" 선택
2. dokkaebi·isatong도 "같은 논리로 교체" 선택 (즉 4개 전부 교체)
3. Issue #26 frozen-312 목록은 **이번 Pilot에서 확장하지 않는다** — PM이 최근 세션에서 직접 강화한
   SEO 보호장치이므로 임의 확장 금지.

**→ Pilot 확정 대상 5개 (교체 완료, 전부 이미 committed Place slug ≥5개 보유, 목록 확장 불필요)**:

| 작품 id | committed Place slug 수 | 비고 |
|---|---:|---|
| `glory` (더 글로리) | 7 | 원래 고정, 유지 |
| `woo` (이상한 변호사 우영우) | 7 | 신규 편입 |
| `littleforest` (리틀 포레스트) | 11 | 신규 편입 |
| `priests` (검은 사제들) | 10 | 신규 편입 |
| `moneyheist` (종이의 집 / La Casa de Papel) | 9 | 신규 편입 — **주의: 이 작품의 committed 장소는 전부 스페인 원작(마드리드 등) 로케이션이다. 한국 리메이크가 아니라 스페인 원작 기준으로 데이터가 이미 들어가 있음.** |

이 5개 모두 **`contentmap_zh_content.js`에 zh 콘텐츠가 아직 하나도 없음** (title_zh 미존재) —
즉 squidgame/poksshak처럼 부분적으로 이미 있던 것과 달리 5개 다 처음부터 새로 써야 함.
squidgame/poksshak/kdemonhunters/daejanggeum/wintersonata/coffeeprince의 기존 zh 콘텐츠는
그대로 유지(제거하지 않음, 이미 색인됐을 수 있는 자산이므로 Section 0 보존 원칙 적용) — 다만 이번
Pilot의 "고정 5개" 완성 목표에서는 제외.

### 2.3 리서치 완료 — 5개 작품의 committed Place 전체 KO/EN 원문 (번역 대기)

아래는 `places/` 디렉터리에 이미 committed된 slug만 추린 것 — Pilot 완료 정의("핵심 Place 5개 이상")를
충족하는 정확한 범위다. 원문은 `/tmp/seowork/works_dump.json`(세션 종료로 유실됨, 재생성 필요 시
`build_dump.js`를 이 저장소 site/ 기준으로 다시 실행)에서 추출한 것을 그대로 옮김.

공식 繁體中文 작품명 확인 완료 (WebSearch, 대만 Netflix/위키백과 zh-tw/영화 매체 기준):
- glory → **《黑暗榮耀》**
- woo → **《非常律師禹英禑》**
- littleforest → 한국영화 자체의 대만 정식 개봉 제목이 명확히 확인되지 않음(검색 결과에 `森之廚房`이 다른 매체명과
  혼재돼 있어 신뢰도 낮음) — **개발 전 반드시 재검증 필요**. 재검증 전까지는 `title_zh` 필드를 비워두거나
  "공식 표기 미확인" 상태로 두고 진행할 것 (정확성 원칙 — 추측 표기 금지).
- priests → **《黑祭司》** (대만 위키백과 zh-tw로 확인, 확실도 높음)
- moneyheist → **《紙房子》** (스페인 원작 기준 대만 Netflix 정식 명칭, 확실도 높음. 한국 리메이크판과
  혼동하지 않도록 zh 콘텐츠 안에서도 "스페인 원작(La Casa de Papel)" 명시 필요 — 장소 데이터 자체가
  전부 스페인/마드리드이므로 자연스럽게 구분됨)

**glory (7곳)**: `cheongjujungangpark, cheongnabadukpark, jongno_pagoda, sejongbangok, seongangil, sodolbangpaje, yonghwasa`
(각 장소의 ko name/desc/tag/tip 전문은 site/contentmap_glory_locations.js에 이미 있음 — 새로 조사할 필요 없이 그대로 번역만 하면 됨)

**woo (7곳)**: `changwondongbu, cheongjuoldtownlink, chungbukassembly, chungbukprovoffice, gimbapplace, hanbadabuilding, suwonhaenggung`
(site/contentmap_woo_locations.js)

**littleforest (11곳)**: `gunwijujube, gunwimarket, hanbamvillage, hwabonstation, hyewonhouse, ilyeonpark, jomunguksite, osangligarlic, sagokssansuyu, uiheungmarket, yeokjeonstore`
(site/contentmap_littleforest_locations.js)

**priests (10곳)**: `apsangolf, banwoldang, catholicujustino, daegunight, dongseongro, gyesancathedral, keimyungdaemyeong, seosangdonhouse, wolbaechurch, yisanghwahouse`
(site/contentmap_priests_locations.js)

**moneyheist (9곳)**: `csicmadrid, florence, granvia, madridstudio, ministeriofomento, nuevosministerios, plazacallao, sanfrutos, torrelodones`
(정확한 파일명은 site/ 안에서 `moneyheist`로 grep해서 재확인 — 작품 id가 `moneyheist`인지 다른 id인지 확인 필요)

각 장소 원문(ko/en 설명·태그·팁 전체 텍스트)은 site 저장소의 위 파일들을 직접 열어보면 다 있으므로
다시 조사할 필요 없음 — **번역만 하면 되는 상태**.

### 2.4 다음 개발자가 할 일 (순서대로)

1. `site/` 안에서 위 5개 작품의 정확한 location 파일명을 `ls site/contentmap_*_locations.js`로 재확인.
2. `site/contentmap_zh_content.js`에 5개 작품 블록 추가:
   - `work: { title_zh, author_zh, era_zh, summary_zh }`
   - `locations: { <locId>: { modernName_zh, tag_zh, description_zh, travelTip_zh } }` — committed slug만, 위 목록 그대로.
   - **littleforest는 공식 대만 개봉명이 미확인이니 반드시 WebSearch로 재검증 후 title_zh 확정할 것.**
   - 번역 원칙: `docs/growth/zh-hant/ZH_HANT_CONTENT_SEO_GUIDE_V1.md` 4~6절 그대로 따름
     (촬영지/배경/체험 구분 유지, FILMED를 拍攝地/EXPERIENCE를 官方體驗 등으로 사실관계 왜곡 없이 번역).
3. `node build_dump.js` (site/ 기준으로 상대경로 맞춰 재작성 또는 이 저장소 경로에 맞게 새로 생성) →
   `generate_work_pages.js` → `generate_region_pages.js` → `generate_place_pages.js` → `generate_culture_pages.js` 순 재실행.
4. 검증: sitemap dedup, HTML 태그 밸런스, 5개 작품 각각 zh Work/Place 페이지에서 한글/영어 잔존 여부
   (특히 heroCredit 필드는 이번엔 고치지 않기로 했으므로 별도 항목으로만 QA 보고에 기록),
   hreflang/canonical 4개 언어 상호 참조, 모바일 360/390/430.
5. `git add/commit` (이 브랜치 `wip/stage-c-closeout-and-zh-hant-audit-20260901` 계속 사용해도 되고,
   `issue-37-zh-hant-pilot-v1`로 새로 따도 됨 — PM 선호에 맞춰서), **push는 사용자가 직접**(PAT 필요).
   완료 후 PR 준비 + QA report + 로컬 배포 zip까지. 운영 배포는 절대 하지 않음.
6. Issue #37 완료 후에만 Issue #40(Story & Scene Pilot)로 진행 — PM 지시대로 순서 임의 확장 금지,
   #40까지 끝나면 다시 PM 지시를 받을 것.

## 3. Issue #40 Story & Scene Pilot — 아직 미착수

이번 세션에서 손대지 않음. `docs/growth/story-scene/` 아래 6개 문서(`STORY_SCENE_PHASE_E_V1.md` 등)는
origin/main에 이미 존재(`d521ddf` 이후 커밋들) — 다음 개발자가 Issue #37 완료 후 그대로 읽고 시작하면 됨.
