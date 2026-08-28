# Geugotjigeum Design Rollout Sequence v1 — Phase 1 Closeout

## Status
**DESIGN PLANNING COMPLETE — IMPLEMENTATION CLOSEOUT IN PROGRESS**

## Final Phase 1 sequence
1. Homepage — Cinematic Content Discovery — implemented (#19 / PR #21)
2. Work Detail / Hooking — Hybrid Light Editorial — implemented (#20 / PR #25)
3. Map Explorer — dark brand shell + dominant map + bright info panel — approved for implementation (#22)
4. Quiz Experience — Playful Editorial — approved for implementation (#23)
5. Place Detail — Hybrid Travel Information — approved for implementation (#24)
6. Discovery Hubs — Places / Regions — Light Discovery Index — approved for implementation (#26)
7. Shared Site Shell — Header / Navigation / Language — approved for implementation (#27)
8. Utility / Edge States — final cross-screen polish and fallback rules
9. Full regression QA / deploy package / Phase 1 design freeze

## Canonical closeout document
`docs/design/DESIGN_PHASE1_CLOSEOUT_V1.md`

## Shared principles
Across all screens:
- same primary accent (`#FF7B57` family)
- dark cinematic surfaces where emotion/identity/spatial immersion matters
- bright warm reading surfaces where long text, search, or practical information matters
- mobile-first layout
- no unnecessary architecture rewrite for visual work
- preserve SEO / i18n / existing data contracts
- use verified existing content and images first
- utility/index pages optimize discovery and scanability rather than imitate editorial pages
- canonical language presentation: `KR / EN / JP / 繁中`
- no silent locale fallback presented as completed translation
- image and empty states must degrade gracefully without fabricated content

## Screen roles
- Homepage: emotional discovery / entry
- Work Detail: story and scene context
- Map Explorer: spatial discovery
- Quiz: lightweight interaction that returns users to real places
- Place Detail: practical travel context
- Places / Regions hubs: search and browse utility
- Shared Shell: cross-screen orientation and language consistency
- Utility / Edge States: resilience, fallback and accessibility consistency

## Figma rule
Starter MCP quota may block visual-frame creation. For this Phase 1 closeout, GitHub Markdown specs are canonical and sufficient for implementation. Missing Figma frames do not block development.

## Implementation discipline
Do not combine all remaining work into one giant PR.

Recommended order:
`#22 → #23 → #24 → #26 → #27 → final edge/regression pass`

Each stage should begin from latest `main`, use a dedicated branch/PR, and preserve the prior completed screens.

## Pipeline after Phase 1
Once final QA/deployment is complete, stop opportunistic redesign work and treat this system as the baseline.

Future design work becomes a deliberate Phase 2 based on actual usage, SEO/traffic, content growth and user feedback.
