# Batch 1 SEO Implementation Readiness v1

Date: 2026-08-28
Status: **RESEARCH COMPLETE / MOBILE #30 COMPLETE / WAITING FOR DESIGN PHASE 1 COLLISION GATE**

## Purpose

Turn the six completed research notes into a safe implementation sequence without colliding with the remaining Design Phase 1 work.

Canonical research notes:
- `batch1/BREAKING_BAD_RESEARCH_V1.md`
- `batch1/ONE_PIECE_RESEARCH_V1.md`
- `batch1/SANTI_RESEARCH_V1.md`
- `batch1/STRANGER_THINGS_RESEARCH_V1.md`
- `batch1/HARRY_POTTER_RESEARCH_V1.md`
- `batch1/POKSSHAK_RESEARCH_V1.md`
- final matrix: `batch1/BATCH1_READINESS_MATRIX_V1.md`

## Current collision finding

### Issue #30
Issue #30 Mobile UX Remediation is now **closed/completed**. The original hard blocker has cleared.

### Issue #28
Issue #28 Design Phase 1 Closeout remains open and still includes:
- #22 Map Explorer
- #23 Quiz
- #24 Place Detail
- #26 Discovery Hubs
- #27 Shared Site Shell
- final regression

There are currently no open pull requests in the repository at the time of this audit, but future #27/shared-shell or other Phase 1 work may still touch the shared work-page generator/templates.

### Shared generator confirmed
`site/generate_work_pages.js` is the canonical shared generator for work SEO pages. It contains:
- `SEO_OVERRIDE`
- `SEO_GENERATED`
- locale/hreflang logic
- work-detail template/output generation
- sitemap regeneration

Current Batch 1 title/meta entries are present directly in this generator, including `poksshak`, `santi`, `breakingbad`, `harrypotter`, `strangerthings`, and `onepiece`.

**Rule:** do not hand-edit generated `site/works/*/index.html` as the sole source of truth.

## Readiness by implementation group

### Group A — low-risk first
1. Harry Potter
2. Breaking Bad

Status: **CONTENT BRIEF READY; CODE QUEUED**

Still required before coding:
- final claim verification (Australia House / Christ Church precision)
- Breaking Bad A1A/Mister Car Wash address verification
- White Sands verify/remove decision
- same-day check that no active Phase 1 PR touches `generate_work_pages.js` or the same work-specific source

Expected shape:
- work-specific data/source fixes first
- small internal-link/content precision changes
- preserve both titles
- meta description only where clearly better
- regenerate once from canonical generator

### Group B — factual cleanup with stable titles
3. Stranger Things
4. 폭싹 속았수다

Status: **RESEARCH READY; SOURCE CLEANUP PLAN REQUIRED**

Stranger Things:
- Patrick Henry demolished status
- New Mexico correction for California/Lenora house
- Lithuania correction for Russia prison scenes
- Emory Briarcliff/Hawkins Lab specificity
- Creel House entity/address
- studio/Season 5 freshness

폭싹 속았수다:
- locate canonical map/place source; no standalone `contentmap_poksshak_locations.js` was found in research audit
- audit every `직접` badge
- correct traditional-village vs recommended-experience classification
- use official Visit Jeju episode-linked anchors
- preserve title direction

### Group C — semantic restructuring
5. ONE PIECE
6. 삼체

Status: **NOT READY FOR BLIND DEV HANDOFF**

These require editorial/query decisions before metadata implementation:
- ONE PIECE: `FILMED / OFFICIAL EXPERIENCE / FICTIONAL / UNVERIFIED` taxonomy and title intent
- 삼체: `NOVEL SETTING / SCIENCE PARALLEL / UNCONFIRMED / FICTIONAL / NETFLIX ADAPTATION` taxonomy and whether `촬영지` can safely be removed from metadata

If implementing these taxonomies requires a new shared data-model field or URL architecture change, stop as `NEEDS DECISION`.

## Recommended handoff timing

Do **not** interrupt the developer's current Design Phase 1 sequence with Batch 1 growth code.

Best handoff gate:
1. current Phase 1 PR, if any, finishes
2. confirm latest main
3. check Issue #28 remaining work / shared-generator collision
4. if generator collision risk is low, hand Group A as a small dedicated growth Issue
5. Group B after Group A
6. Group C only after explicit taxonomy/query brief is finalized

If #27 Shared Site Shell is about to edit `generate_work_pages.js`, wait until #27 is merged before Group A.

## Canonical source tracing checklist

Before editing each work, developer must identify:
1. metadata source loaded into `/tmp/seowork/works_dump.json`
2. work-specific `contentmap_<id>_locations.js` or equivalent source
3. people module if cast text is affected
4. hook/story source used by the generator
5. `generate_work_pages.js` meta/template code
6. related region/place generator implications

For `poksshak`, source tracing is a mandatory first step because the expected standalone location module was not found.

## SEO safeguards

- preserve all current URLs
- preserve canonical/hreflang/x-default/OG/Twitter/JSON-LD unless corresponding text is intentionally updated
- preserve successful title phrases for Harry Potter, Stranger Things and Breaking Bad
- do not keyword-stuff
- distinguish filming / setting / inspiration / experience / nearby recommendation
- regenerate locale pages and sitemap through the canonical pipeline
- record baseline before deploy

## Mobile safeguards

All Batch 1 work pages inherit completed Issue #30 rules:
- 360/390/430 real browser/emulation review
- zero page-level horizontal overflow
- readable title/metadata
- content-driven card height
- long locale strings wrap safely
- touch targets >=44px

## Measurement

Review at approximately 14 and 28 days after deployment:
- impressions
- clicks
- CTR
- average position
- target query position
- map/place clicks
- for 폭싹: quiz start/complete/result-place/map transition when tracking exists

## Handoff gate

Research is complete. **Developer handoff is prepared but intentionally queued.**

Create/activate the first implementation task only when the same-day collision check confirms that Design Phase 1 work is not modifying the shared generator/source. Until then, continue research and source verification without code changes.
