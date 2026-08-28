# 폭싹 속았수다 SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/poksshak/`
- impressions: 94
- clicks: 8
- CTR: 8.5%
- avg position: 14.71

Interpretation: this page has real click traction but is still outside the first-page core. It is also the best Batch 1 page for testing the full funnel `work → story/location → quiz → map/place`.

Current title:
`폭싹 속았수다 제주 촬영지 실제 위치와 가는 법 | 그곳, 지금`

Current description:
`폭싹 속았수다 촬영지 제주 성산일출봉, 협재해수욕장, 새별오름 등 실제 위치와 가는 법을 지도에서 확인하세요.`

## 2. Primary user intent

1. Which Jeju places actually appeared in the drama?
2. Which scenes correspond to which places?
3. Which places are recommendations with a similar Jeju atmosphere rather than actual filming sites?
4. Which locations can be grouped into a practical Jeju trip?
5. After reading the story/quiz, where can the user go next on the map?

The important trust rule is to distinguish `actual scene/filming relation` from `recommended nearby place / similar atmosphere`.

## 3. Keep / change recommendation

### Keep
- URL
- current title direction (`제주 촬영지`, `실제 위치`, travel intent)
- work → quiz → map funnel
- Jeju as the primary discovery region

### Improve
- meta description examples: replace any weak/unverified headline examples with places supported by official Visit Jeju episode/location material
- page location cards: audit every `직접` badge; several current cards appear to use stronger certainty than the official tourism source supports
- scene relation: show episode/scene where officially documented
- region links: Seongsan/Gujwa, Jeju City, Hallim/West Jeju, Daejeong/Songaksan clusters

## 4. High-confidence official Jeju anchors

Visit Jeju's official `A Jeju Journey with When Life Gives You Tangerines` guide provides episode-linked places that are strong anchors:
- Seongsan Ilchulbong & Seongsan canola fields — Episode 2
- Gimnyeong Fishing Village — Episodes 1 & 3
- Jejumok Gwana — Episode 8
- Jewon Apartments — Episode 9
- Dogurial — Episode 10
- Saengigijeong — Episode 12
- Hallim Port & Hallim Fisheries Market — Episode 14
- Geumnung Port — Episodes 14 & 16
- Songaksan Coastal Trail — Episode 15
- Deokcheon-ri / Gunsan Oreum context — Episode 15
- Yeongnang-ri Coastal Road — Episodes 11 & 15
- additional Hado/Jongdal and Jeju travel clusters documented by Visit Jeju

These are preferable SEO/snippet anchors because the source links the place to specific episodes or scene context.

## 5. Data-quality findings in current repo

Sources reviewed:
- `site/works/poksshak/index.html`
- no standalone `site/contentmap_poksshak_locations.js` was found in this audit; the exact map-data source/generator must be located before implementation

### A. Current meta examples need verification/update
Current meta names:
- Seongsan Ilchulbong
- Hyeopjae Beach
- Saebyeol Oreum

Seongsan is supported by Visit Jeju. In this research pass, Hyeopjae Beach and Saebyeol Oreum were not established by the official Visit Jeju drama guide as the strongest actual episode-linked filming anchors.

Action:
- do not strengthen Hyeopjae/Saebyeol as `actual filming locations` without a stronger source
- replace meta examples with a high-confidence set such as `성산일출봉·김녕어촌·한림항·금능항` if metadata is changed

### B. Jeju Folk Village card appears to overstate filming status — fix required
Current work-detail HTML labels `제주민속촌` as `직접` and says it was used to recreate the 1960s Jeju village.

Visit Jeju explicitly says the nostalgic traditional-village scenes were filmed on a **set outside Jeju**. It recommends Jeju Stone Park's Dolhan Village and Seongeup Folk Village as places to experience old-Jeju atmosphere; those are recommendations, not the set itself.

Action:
- remove any `actual/direct filming` claim for Jeju Folk Village unless independently verified for a separate scene
- introduce a `추천 / 분위기 체험` class distinct from `실제 촬영`

### C. Generic oreum claims need evidence
Current work-detail HTML includes `오름길(용눈이오름 인근)` as `직접` and describes recurring scenes.

Visit Jeju discusses oreum as part of the show's Jeju atmosphere and gives recommended oreums such as Baekyaki/Andol, while separately identifying specific scene-linked places such as Gunsan Oreum.

Action:
- do not tag a generic/nearby oreum as direct filming without a scene/source
- prefer the exact episode-linked Gunsan Oreum context where appropriate

### D. Several non-Jeju `직접` cards need a second-source audit
Current HTML also labels places such as Jeonbuk National University Hospital, Chonnam National University, Chung-Ang High School, Unmunsa, Maechukji Village, Yeosu, Seoul National University and others as `직접`.

These may be valid, but the Visit Jeju source does not establish them. They must be independently verified before being used in title/meta or prominent SEO copy.

### E. Inline generated content/source-of-truth risk
The current work-detail page contains a large inline location-card list. The map location module was not found under the expected standalone filename during this pass.

Action:
- developer must locate the canonical generator/data source before any cleanup
- do not hand-edit generated HTML as the sole fix

## 6. Suggested page structure

1. Hero: keep `폭싹 속았수다 제주 촬영지 실제 위치`
2. `진짜 촬영지와 제주 분위기 추천지는 다릅니다` compact trust note
3. `회차로 보는 제주 촬영지` — official episode-linked anchors
4. `성산·김녕 / 제주시 / 한림·금능 / 송악산·서부` regional clusters
5. `제주 밖에서 촬영된 장면` — only independently verified places
6. quiz CTA
7. quiz result → 3 verified places → map
8. related Jeju works / culture (haenyeo) / region discovery

## 7. Metadata proposal

### Title
Keep current direction; no forced rewrite:
`폭싹 속았수다 제주 촬영지 실제 위치와 가는 법 | 그곳, 지금`

`가는 법` should remain only if the page provides reliable navigation/travel utility.

### Description candidate
`폭싹 속았수다의 제주 촬영지를 성산일출봉, 김녕어촌, 한림항·금능항 등 장면별로 확인하세요. 실제 촬영지와 제주 분위기 추천지를 구분해 지도와 여행 동선으로 정리합니다.`

Do not publish until location labels/data are audited.

## 8. Internal-link / conversion plan

Priority:
- work → verified Jeju place pages
- place → Jeju regional hub
- work → quiz
- quiz result → three verified locations
- quiz/location → map deep link
- work → `culture/haenyeo/`
- same Jeju region → other K-content locations where entities really exist

Track when available:
- work → quiz start
- quiz complete
- result location click
- map open
- place detail click

## 9. Locale priority

1. KR — immediate; strongest direct search/funnel opportunity
2. JP — Jeju + K-drama travel intent may be valuable; verify GSC query evidence
3. zh-Hant — strong travel relevance once translation/source labels are reliable
4. EN — useful for Netflix global audience but should follow source/data cleanup

## 10. Implementation risk

**MEDIUM–HIGH.** SEO title direction is good, but current place certainty labels risk confusing `actual filming` with `recommended atmosphere`. Trust cleanup is necessary before growth optimization.

## 11. Implementation gate

Before developer handoff:
- find canonical place/map data source and generator
- audit every `직접` badge against a source
- correct Jeju Folk Village/traditional-village classification
- choose verified meta examples
- collision-check Issue #30/#28 shared work-page generator/CSS
- capture pre-change GSC metrics

## 12. Research sources

Primary/strong sources used:
- Visit Jeju official, `A Jeju Journey with <When Life Gives You Tangerines>` — episode-linked Jeju locations and nearby/recommended-place distinctions
- current repo work-detail HTML for present labels/claims

Important official-source distinction:
Visit Jeju explicitly states the nostalgic traditional-village scenes were filmed on a set outside Jeju, while Jeju Stone Park and Seongeup Folk Village are recommended places to experience the traditional atmosphere. This distinction should become a reusable data rule for the entire site.
