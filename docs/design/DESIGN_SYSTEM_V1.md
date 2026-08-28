# Geugotjigeum Design System v1 — Phase 1 Final

## Status
**PHASE 1 DESIGN SYSTEM — FINAL FOR THIS REDESIGN ROUND**

This is the shared visual and interaction baseline for the first completed design-redesign cycle.

## 1. Product idea
The service should connect:

`K-content scene → work/story → real place → travel discovery`

The visual system must support both emotional discovery and practical reading. One tone is not forced everywhere.

## 2. Two-surface principle
### A. Cinematic dark
Use where emotion, identity, imagery, or spatial immersion is primary:
- homepage hero
- work-detail hero / featured scene
- map shell
- selected editorial transitions

### B. Warm light
Use where reading, search, travel information, or scanning is primary:
- work-detail long-form sections
- place detail practical sections
- Places / Regions discovery hubs
- utility/legal/supporting pages
- quiz question/feedback surface

The user should feel one brand, not one background color.

## 3. Core dark tokens
- `--ds-bg: #0A0B0F`
- `--ds-bg-elevated: #141820`
- `--ds-hero-left: #232A38`
- `--ds-hero-right: #10141C`
- `--ds-panel: #151923`
- `--ds-line: #242A34`
- `--ds-text: #FFFFFF`
- `--ds-text-2: #CDD2DC`
- `--ds-text-3: #9EA5B2`

## 4. Core light tokens
Recommended warm reading family:
- `--ds-light-bg: #F8F5EE`
- `--ds-light-surface: #FDFBF7`
- `--ds-light-card: #FFFFFF`
- `--ds-light-text: #1B1E24`
- `--ds-light-text-2: #575E6B`
- `--ds-light-line: #E1DCD2`

Implementation may use very close existing production-safe values if a page already has compatible tokens; do not create needless near-duplicate variables.

## 5. Brand accent
Primary:
- `--ds-accent: #FF7B57`
- `--ds-accent-soft: #FF9B7D`

Rules:
- coral is the primary product action color
- do not introduce another competing brand accent just to decorate utility pages
- existing blue may remain only where current functional semantics or legacy links require it during migration
- destructive/error states should use semantic styling, not coral

## 6. Typography
Use the current production-safe multilingual stack unless a verified project font already covers KR / EN / JP / zh-Hant better.

Recommended scale:
- Logo: 22px / 700
- Desktop Hero: 44px / 700–800
- Mobile Hero: 30px / 700–800
- Page title: 28–36px depending on context
- Section title: 22–24px / 700
- Card title: 15–18px / 600–700
- Body: 14–16px / 400
- Meta: 11–13px / 500–600

Rules:
- Korean body line-height roughly 1.45–1.65
- long-form line length should remain comfortable on desktop
- primary entity names may wrap; never shrink them aggressively to force one line
- translated labels must not break navigation or buttons

## 7. Spacing / radius
- desktop horizontal page padding: 40–56px for wide product surfaces
- editorial reading container may remain narrower for readability
- mobile horizontal padding: 18–22px
- section gap: 40–56px desktop / 28–36px mobile
- card radius: 16–18px
- compact utility card radius: 12–16px
- pill radius: 999px
- mobile interactive target: >=44px

## 8. Shared component language
### Header / site shell
Three approved variants:
1. Cinematic shell
2. Utility light shell
3. Map/app shell

They may differ in background/height but should share brand geometry, language anatomy, focus behavior, and stable navigation priorities.

Canonical language labels:
`KR / EN / JP / 繁中`

### Primary CTA
- coral fill
- readable white text
- minimum 44px touch height mobile
- one visually dominant action per local decision area

### Secondary CTA
- neutral contrast appropriate to surface
- clearly subordinate to primary

### Cards
Work / place / result cards should prioritize:
1. entity identity
2. relationship/context
3. action

Avoid excessive badges, borders, and metadata.

### Search/filter
- prominent only on discovery utility screens
- active state visible by text/shape, not color alone
- reset discoverable
- no backend requirement unless already justified

### Featured scene / editorial panel
- connect story/scene to a real place
- avoid repetitive system copy such as default “사실은…” hooks

## 9. Responsive rules
Mandatory common widths:
- 360
- 390
- 430
- 1440

Additional:
- 1280 for utility/detail layouts
- 1920 for map layout

Rules:
- no horizontal page scrolling
- header must not accidentally wrap into two rows
- CTA rows may stack
- map controls retain usable space
- card grids collapse intentionally, not accidentally

## 10. Accessibility / interaction
- visible keyboard focus
- sufficient text/background contrast
- semantic buttons/links where practical
- state not encoded by color alone
- hover-only content must have non-hover access
- touch target >=44px mobile
- long localized text must wrap safely

## 11. Images
- verified existing assets first
- no paid stock dependency in Phase 1
- no random stock fallback
- image unavailable → branded neutral placeholder with stable geometry
- preserve lazy loading / performance behavior where present
- preserve existing credit/source policy

## 12. Motion
Phase 1 does not need a motion system.

If transitions exist:
- subtle
- do not block reading/action
- respect reduced-motion behavior where applicable
- avoid gratuitous confetti/large animation in quiz or map

## 13. Ads
Design must tolerate manual AdSense without letting ads interrupt core actions.

See `UTILITY_EDGE_STATES_V1.md` for placement safety rules.

## 14. SEO / data boundary
Visual redesign must preserve unless a separate approved task says otherwise:
- URL structure
- canonical
- hreflang / x-default
- structured data
- OG/Twitter
- GA4
- map/deep links
- existing verified content/data contracts

Prefer generator/template source changes over hand-editing generated outputs.

## 15. Phase 1 design references
- `HOMEPAGE_REDESIGN_A_V1.md`
- `WORK_DETAIL_HOOKING_V1.md`
- `MAP_EXPLORER_V1.md`
- `QUIZ_EXPERIENCE_V1.md`
- `PLACE_DETAIL_V1.md`
- `DISCOVERY_HUBS_V1.md`
- `SHARED_SITE_SHELL_V1.md`
- `UTILITY_EDGE_STATES_V1.md`
- `DESIGN_PHASE1_CLOSEOUT_V1.md`

## 16. Design freeze
After Phase 1 implementation and regression QA, this visual system should be treated as the working baseline rather than continuously redesigned.

A later redesign may reopen the system based on usage data, content growth, SEO/traffic patterns, or user feedback. Until then, new content/features should reuse these patterns rather than invent new visual systems.
