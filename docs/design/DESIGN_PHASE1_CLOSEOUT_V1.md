# Geugotjigeum Design Phase 1 Closeout v1

## Status
**DESIGN PHASE 1 COMPLETE — USER-APPROVED CLOSEOUT HANDOFF**

This document is the master closeout for the first site-wide redesign round. The user explicitly requested that the current redesign be planned through the final stage, implemented, regression-checked, and then frozen until a later redesign round.

## 1. What Phase 1 is trying to achieve
The site should feel like one product across discovery, story, map, quiz and travel-information screens.

The product flow is:

`scene → work/story → real place → map/travel discovery`

Phase 1 does not try to make every screen visually identical. It uses two complementary surfaces:
- cinematic dark for emotion, imagery, identity and map immersion
- warm light for reading, search, practical information and long multilingual copy

Primary brand accent remains coral `#FF7B57`.

## 2. Phase 1 screen coverage
### Completed implementation
1. Homepage — Cinematic Content Discovery
   - Issue #19 / PR #21
2. Work Detail / Hooking — Hybrid Light Editorial
   - Issue #20 / PR #25

### Remaining implementation in this closeout
3. Map Explorer — Issue #22
4. Quiz Experience — Issue #23
5. Place Detail — Issue #24
6. Discovery Hubs: Places / Regions — Issue #26
7. Shared Site Shell: Header / Navigation / Language — Issue #27
8. Utility / Edge States — shared finalization rules, no separate product feature

## 3. Canonical design documents
Read these in this order:
1. `docs/design/DESIGN_SYSTEM_V1.md`
2. `docs/design/DESIGN_PHASE1_CLOSEOUT_V1.md`
3. screen-specific document
4. `docs/design/UTILITY_EDGE_STATES_V1.md`

Screen-specific docs:
- `HOMEPAGE_REDESIGN_A_V1.md`
- `WORK_DETAIL_HOOKING_V1.md`
- `MAP_EXPLORER_V1.md`
- `QUIZ_EXPERIENCE_V1.md`
- `PLACE_DETAIL_V1.md`
- `DISCOVERY_HUBS_V1.md`
- `SHARED_SITE_SHELL_V1.md`

## 4. Figma rule for closeout
Figma is a useful visual reference, but the free Starter MCP write quota has repeatedly blocked completion of remaining frames.

Therefore for Phase 1 closeout:
- GitHub Markdown specs are canonical and sufficient to implement.
- Missing Figma frames MUST NOT block implementation.
- Existing Figma frames remain references where available.
- If Figma is later updated, it should reflect the approved written direction rather than silently changing it.
- A material UX/product change discovered during implementation still requires `NEEDS DECISION`.

## 5. Implementation sequence
Do not implement the remaining redesign as one giant PR.

Recommended sequence:

### Stage A — Map Explorer (#22)
Purpose: spatial discovery.

Preserve:
- desktop 58% map / 42% info
- draggable divider
- MapLibre
- mobile map/info tab behavior
- deep links and selected-location state

Visual goal:
- compact dark brand/app shell
- dominant map canvas
- bright readable info panel
- selected pin/card state clear

### Stage B — Quiz Experience (#23)
Purpose: lightweight interaction that returns users to real places.

Preserve:
- `QUIZ_DATA[workId]`
- score/state/retry behavior
- `secret` / `fortune` reward data
- result location IDs and map/place actions

Visual goal:
- Playful Editorial, not arcade UI
- dark outer shell/top context
- warm light question/feedback surface
- compact progress suitable for future 20-question standard
- result screen prioritizes verified place discovery

### Stage C — Place Detail (#24)
Purpose: fandom interest → practical place context.

Visual goal:
- image/context top when useful
- warm light travel-information surface
- strong map CTA
- related work / nearby discovery
- graceful image fallback

### Stage D — Discovery Hubs (#26)
Purpose: convert static indexes into usable discovery utilities.

Places:
- prominent client-side search if cleanly feasible from current generated/static data
- lightweight filters only when existing data supports them
- clear results count and one-column mobile cards

Regions:
- hierarchy between major/high-count destinations and long-tail destinations
- avoid giant undifferentiated chip wall
- preserve all SEO-visible links

### Stage E — Shared Site Shell (#27)
Purpose: make navigation/language treatment consistent after key screens stabilize.

Approved variants:
1. Cinematic shell
2. Utility light shell
3. Map/app shell

Canonical language labels:
`KR / EN / JP / 繁中`

Do not invent routes for visual symmetry. Quiz remains contextual unless a real global quiz hub exists.

### Stage F — Utility / Edge States
Apply `UTILITY_EDGE_STATES_V1.md` across touched screens:
- image fallback
- no-result state
- translation unavailable state
- long locale strings
- errors/transient states
- keyboard focus
- ad-placement safety
- empty optional sections

## 6. Source-of-truth / code rule
For generated pages:
- identify the generator/template first
- edit the generator/template source
- regenerate outputs
- do not make generated HTML the authoritative manual source

For SPA/map/quiz:
- preserve existing data/state contracts unless a bug is explicitly found
- do not turn visual work into framework migration or data-model rewrite

## 7. What must not change in this redesign
Unless separately approved:
- URL architecture
- canonical URLs
- hreflang / x-default structure
- structured data
- OG/Twitter metadata
- GA4
- map deep links
- existing verified content/data
- locale architecture
- backend/database model
- account/login/payment systems
- deployment architecture
- paid service dependencies

## 8. Multilingual rules
- canonical visual labels: `KR / EN / JP / 繁中`
- preserve established locale paths: ko / en / ja / zh-Hant presentation rules
- preserve PR #16 translation readiness/fallback behavior
- never silently present English fallback as completed selected-language content
- long work/place/region names must wrap safely
- no accidental two-row mobile header

## 9. Readability / accessibility gates
Across all final Phase 1 screens:
- touch targets >=44px mobile
- visible keyboard focus
- meaningful state not expressed by color alone
- adequate contrast
- no horizontal page overflow
- no text clipped by fixed-width controls
- warm light background for reading-heavy areas
- dark surfaces limited to contexts where they improve identity/immersion

## 10. Required QA matrix
### Common
- 360
- 390
- 430
- 1440

### Additional
- 1280 for detail/discovery utilities
- 1920 for Map Explorer

Regression check:
- homepage navigation
- language switching
- unavailable locale behavior
- work detail links
- place links
- map/deep links
- quiz state/retry/result places
- Places/Regions links
- canonical/hreflang/meta/structured data on generated/static pages
- no new JS console errors
- no unintended CLS/layout collapse from missing images or ads

## 11. Ads
Phase 1 does not redesign monetization, but the layout must not let manual AdSense placements break core flows.

Never insert ads inside:
- primary hero decision areas
- quiz question/answer/feedback sequence
- map controls/info interaction
- primary CTA groups

See `UTILITY_EDGE_STATES_V1.md`.

## 12. PR / branch discipline
Use one logical PR per stage/Issue where practical.

For each stage:
1. pull latest `main`
2. create dedicated branch
3. implement
4. run programmatic/static QA
5. run real-browser/mobile QA if available
6. create PR with screenshots if possible
7. document deviations and known risks
8. prepare local deploy ZIP where deployment workflow requires it

Do not automatically deploy production unless explicitly instructed.

## 13. Stop conditions
Use `NEEDS DECISION` only if implementation requires:
- material UX direction change
- URL/SEO architecture change
- locale architecture change
- data-model/backend change
- new paid service/asset dependency
- destructive migration
- authentication/privacy/payment work
- deployment architecture change

Normal CSS/layout/responsive/component decisions are developer discretion.

## 14. Final closeout acceptance criteria
Phase 1 is complete when:
- Homepage and Work Detail remain regression-safe
- #22 Map Explorer implemented and QA'd
- #23 Quiz Experience implemented and QA'd
- #24 Place Detail implemented/generated and QA'd
- #26 Places/Regions discovery hubs implemented and QA'd
- #27 shared shell applied to intended page types without route/i18n regression
- edge/fallback states applied where touched
- full multilingual and SEO regression completed
- all implementation PRs merged/synced to `main`
- final deployment ZIP prepared and production deployment confirmed separately

## 15. Design freeze after completion
After the above closeout:
- do not continue opportunistic visual redesign screen-by-screen
- new content/features should reuse this Phase 1 system
- collect actual usage, SEO, traffic and user feedback
- revisit design later as a deliberate Phase 2 redesign

This keeps the current redesign finite and prevents perpetual rework.
