# Batch 1 Growth — Developer Handoff Queue v1

Date: 2026-08-28
Status: **PREPARED / DO NOT START UNTIL COLLISION GATE CLEARS**

## Why this exists

Research for all six Batch 1 pages is complete, but Design Phase 1 (#28) is still open. This document prepackages the future development work so the user does not have to reconstruct the instructions later.

Canonical inputs:
- `docs/growth/BATCH1_IMPLEMENTATION_READINESS_V1.md`
- `docs/growth/batch1/BATCH1_READINESS_MATRIX_V1.md`
- six research notes under `docs/growth/batch1/`

## Start gate

Start only when:
1. latest `main` is pulled
2. no open PR touches `site/generate_work_pages.js` or the same work-specific data source
3. #27 Shared Site Shell is not actively changing the shared work-page template/generator, or its changes are already merged
4. canonical source is traced for the selected work

#30 mobile remediation is complete, so it is no longer a blocker.

## Future implementation order

### Task A — Harry Potter + Breaking Bad
Lowest-risk growth implementation.

Harry Potter:
- preserve title
- verify/reclassify Australia House
- tighten Christ Church filmed-vs-inspired wording
- add region/internal-link structure where existing entities support it
- optional small 2026 25th-anniversary freshness note, not evergreen title

Breaking Bad:
- preserve title
- correct A1A/Mister Car Wash address/coordinates after final verification
- verify/remove White Sands claim
- strengthen verified Albuquerque visitor anchors
- retain private-residence etiquette

### Task B — Stranger Things + 폭싹 속았수다
Factual/status cleanup with stable title intent.

Stranger Things:
- Patrick Henry = demolished/historical
- Lenora California house = New Mexico, not Fayetteville GA
- Russia prison = Vilnius/Lithuania, not Atlanta set
- Hawkins Lab = Emory Briarcliff entity
- Creel House = Claremont House/address/private warning
- current Season 5/studio context where useful

폭싹:
- trace canonical place/map source first
- audit `직접` labels
- correct traditional-village recommendation vs actual filming distinction
- prefer official Visit Jeju episode-linked places
- update meta examples only after source cleanup
- preserve quiz→verified place→map funnel

### Task C — ONE PIECE + 삼체
Do not start as routine content cleanup.

ONE PIECE requires taxonomy/query decision:
`FILMED / OFFICIAL EXPERIENCE / FICTIONAL / UNVERIFIED`.

삼체 requires taxonomy/query decision:
`NOVEL SETTING / SCIENCE PARALLEL / UNCONFIRMED / FICTIONAL / NETFLIX ADAPTATION`.

If either requires shared data-model or URL architecture change, stop as `NEEDS DECISION`.

## Common developer guardrails

- generated HTML is output, not canonical source
- use `site/generate_work_pages.js` and work-specific sources
- preserve URL/canonical/hreflang/x-default/OG/Twitter/JSON-LD/GA4
- preserve PR #16 locale readiness
- inherit Issue #30 mobile rules
- no unsupported access/opening/drive-time claims
- no bulk rewrite of first-page titles
- regenerate once per PR, then test locales/sitemap
- no production deployment; prepare ZIP only if requested by current deployment workflow

## Measurement

Before deploy, capture current GSC baseline.
After deploy, compare at ~14 and ~28 days.

This queue is deliberately not a live developer instruction until the collision gate clears.
