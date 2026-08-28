# Batch 1 SEO Implementation Readiness v1

Status: **RESEARCH COMPLETE / CODE WAITING FOR ISSUE #30 MOBILE PASS**

## Purpose

Turn the six completed research notes into a safe implementation sequence without colliding with the active mobile/design work.

Research notes:
- `research/BREAKING_BAD_SEO_RESEARCH_V1.md`
- `research/ONE_PIECE_SEO_RESEARCH_V1.md`
- `research/SANTI_SEO_RESEARCH_V1.md`
- `research/STRANGER_THINGS_SEO_RESEARCH_V1.md`
- `research/HARRY_POTTER_SEO_RESEARCH_V1.md`
- `research/POKSSHAK_SEO_RESEARCH_V1.md`

## Collision finding

`site/generate_work_pages.js` is the shared generator for work SEO pages and contains the Korean SEO override/generated-title map. Issue #20 already changed this generator for the Hybrid Light Editorial redesign.

Issue #30 Mobile UX Remediation explicitly includes Work Detail/Hooking pages, so it may touch the same generator/template/CSS output.

**Therefore do not start Batch 1 work-page implementation until #30 is merged to main.**

After #30 merges, always start from latest main and regenerate pages through the canonical generator pipeline.

## Recommended implementation shape

Do not create six unrelated large PRs that each regenerate all work pages. That would produce noisy repeated generated diffs and merge conflicts.

Preferred approach:

### PR A — Trust/factual corrections in work-specific data/content
Targets with highest factual risk:
1. Breaking Bad
2. Stranger Things
3. One Piece
4. 삼체
5. 폭싹 속았수다
6. Harry Potter precision fixes

Touch only the canonical work/location/story sources for each work where possible. Trace the source of every generated paragraph/card before editing; do not hand-edit generated `site/works/*/index.html` files as the source of truth.

### PR B — SEO/meta + reading-order / taxonomy changes
After factual corrections are stable:
- update `SEO_OVERRIDE` / `SEO_GENERATED` in `site/generate_work_pages.js` only where the research note recommends a metadata change
- add/adjust evidence-class labels using existing data fields if possible
- surface location utility earlier without changing URLs or data contracts
- regenerate all locale work pages once

If evidence-class labels require a new data-model field shared across the app, stop as `NEEDS DECISION` rather than silently migrating the model.

## Work-by-work scope

| Work | SEO title action | Content action | Primary risk |
|---|---|---|---|
| Breaking Bad | KEEP core title | White Sands claim, current business names, residence etiquette, earlier TOP5 | factual trust |
| Stranger Things | KEEP | correct Vilnius Russia filming claim, final-season status, 2026 location update | factual + stale |
| Harry Potter | KEEP | filming vs association precision, UK travel clusters, current visitor utility | classification |
| One Piece | REFRAME carefully | split official filming / official tourism / fan motif; update S3 status | evidence mixing |
| 삼체 | CLARIFY carefully | split filming / novel setting / science / analogy | category confusion |
| 폭싹 속았수다 | conservative tweak | actual filming / set / fictional / nearby recommendation; replace weak TOP5 entries | evidence mixing |

## Canonical source tracing checklist

Before editing each work, developer must identify:
1. work metadata source loaded into `works_dump.json`
2. work-specific `contentmap_<id>_locations.js`
3. people module if cast text is affected
4. hook/story source used by the generator
5. `generate_work_pages.js` meta/template code
6. related region/place generator implications

Do not infer that generated HTML is canonical just because it contains the current text.

## SEO safeguards

- Preserve all current URLs.
- Preserve canonical/hreflang/OG/Twitter/JSON-LD unless the corresponding content text is intentionally updated.
- Do not delete successful query phrases from Harry Potter, Stranger Things, Breaking Bad or 삼체 without newer GSC evidence.
- Do not keyword-stuff.
- Re-run all locale generation and sitemap generation once per implementation PR, not repeatedly per work.

## Mobile safeguards

All Batch 1 work pages inherit Issue #30 rules:
- 360/390/430 real browser/emulation review
- zero page-level horizontal overflow
- readable work title/metadata
- content-driven card height
- long locale strings wrap safely
- touch targets >=44px

## Measurement

Before deploy, record the baseline already captured in the research docs. Review at approximately 14 and 28 days:
- impressions
- clicks
- CTR
- average position
- target query position
- map/place clicks when available

## Handoff gate

Developer handoff becomes appropriate only when:
- Issue #30 is merged
- no active PR is touching the same work sources/generator
- latest main is confirmed

Until then, research/documentation can continue in parallel.