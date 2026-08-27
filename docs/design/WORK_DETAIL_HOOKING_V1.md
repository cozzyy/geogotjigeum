# Work Detail / Hooking Page v1 — Design Spec

## Status
**DESIGN READY — USER REVIEW PENDING (v1.1 hybrid light revision)**

This is the next design track after the approved homepage redesign A (`Cinematic Content Discovery`).

Figma file: https://www.figma.com/design/bhWP6rUcihMcpWi45REUd4

Reference implementation inspected: `site/works/poksshak/index.html`.

## 1. Why this screen is next
The homepage now communicates `K-content scene → real place → travel`. The work-detail/hooking page is the first major destination after a work card click, so it must continue the same visual language without forcing every section into the same dark treatment.

Current work pages contain strong content and SEO structure. The redesign should preserve the cinematic continuity at the top of the page, then deliberately switch into a brighter reading surface for long-form copy and place discovery.

## 2. Core UX goal
The page should move the user through this sequence:

`Scene emotion → short story/hook → actual location → map / quiz / related discovery`

Do not lead with a dense location list. Let one memorable scene or hook establish context first, then expose the most useful place actions.

## 3. Design direction — Hybrid Light Editorial
Inherit `docs/design/DESIGN_SYSTEM_V1.md`, but use a **hybrid dark/light composition** for this screen.

### Dark cinematic zone
Use the approved homepage visual language for:
- global header
- hero / work identity
- Featured Scene
- final next-action band

Purpose: maintain brand continuity, emotional impact, and the sense that the user is still inside the same product.

### Bright reading zone
Use warm off-white / ivory surfaces for:
- Story / hooking copy
- long-form explanatory text
- location discovery section
- culture bridge / supporting editorial content

Recommended surface range:
- main reading background: warm off-white around `#F8F5EE` / `#FDFBF7`
- cards: white or near-white
- primary reading text: near-black around `#1B1E24`
- secondary text: neutral gray around `#575E6B`
- border: warm light gray around `#E1DCD2`
- primary action/accent remains coral `#FF7B57`

The visual transition itself is intentional: **cinematic entrance → comfortable reading → action/discovery**.

Do not imitate Netflix literally. Do not turn the page into a generic tourism-board or unrelated magazine page.

## 4. Desktop composition (1440)
1. Global dark header + language switcher
2. Split cinematic dark hero
   - left: work title, short product hook, primary map CTA, quiz CTA
   - right: one `Featured Scene` story/fact
3. Bright Story section
   - warm off-white reading surface
   - hook text broken into readable 2–3 paragraph rhythm
   - dark/image scene block may interrupt the light reading surface
4. Bright `이 장면의 실제 장소`
   - 3 priority white location cards
   - direct map affordance
5. Warm-light Culture bridge (`작품 속 진짜 한국`)
6. Dark Next actions band: map / quiz / other works

## 5. Mobile composition (390)
1. Compact dark header
2. Dark hero image/surface
3. Work title + 1-line hook
4. Two visible CTAs: map / quiz
5. Dark Featured Scene card
6. Bright Story block
7. Bright location section with 3 compact cards stacked vertically
8. Warm-light Culture bridge
9. Dark bottom next actions

Mandatory QA targets when implemented: 360 / 390 / 430px.

## 6. Readability rules
This page is text-heavier than the homepage, so readability takes priority over forcing a single background tone.

- body copy should primarily be dark text on light surface
- avoid long white/light-gray copy on dark backgrounds
- target body size should stay comfortably readable on mobile; do not shrink to fit
- long copy should be broken with spacing, subheads, images, or cards
- keep line length moderate on desktop rather than stretching text across the full viewport
- use dark sections as emphasis, not as the default reading canvas
- coral accent should guide actions and highlights, not become body text color

## 7. Content treatment
Use existing verified work content and images first. Do not fabricate scene trivia or places.

For the `poksshak` prototype, the design uses existing verified location data already present in the product:
- 성산일출봉 — 삼천배 장면
- 협재해수욕장 — 로맨틱 장면
- 학원농장 유채꽃밭 — 첫 입맞춤 실제 촬영지

The exact copy may be adapted from current production content; design examples are not a license to invent unsupported facts.

## 8. Preserve current functionality / SEO
The redesign must not remove or rewrite:
- canonical URL
- hreflang KR / EN / JP / zh-Hant
- OG/Twitter metadata
- GA4
- current language-switch behavior
- existing location/map links
- related-work links
- existing structured/SEO content

This is primarily a visual/UX layer change.

## 9. Existing content that should be retained, but visually reworked
Current `poksshak` page includes:
- full-bleed hero
- title/meta/intro
- map and list CTAs
- hook box and reveal chips
- expandable details
- location cards
- culture crosslink box
- related content

Do not discard these blindly. Reorganize them so the top feels cinematic, while the actual reading experience becomes brighter and easier to scan.

## 10. Interaction rules
- Primary action: map/location discovery
- Secondary action: quiz
- location CTA touch target >= 44px on mobile
- no horizontal overflow at 360/390/430
- language labels must survive KR/EN/JP/ZH widths
- long story copy should use progressive rhythm, not one giant block
- avoid excessive badge/chip density
- changing from dark to light surfaces must not create abrupt spacing or contrast artifacts

## 11. Figma frames
Figma working file:
`Geugotjigeum Design 02 - Work Detail`

- Desktop: `Work Detail Desktop 1440`
- Mobile: `Work Detail Mobile 390`

Both frames were revised to the **Hybrid Light Editorial** direction after user feedback on long-form readability.

The Figma file is the visual reference; this Markdown is the persistent implementation/decision record in GitHub.

## 12. Development timing
Do **not** start this redesign in parallel with Homepage Issue #19 if it would cause shared CSS/header/i18n conflicts.

Recommended order:
1. Finish Homepage Redesign #19
2. Review the deployed homepage visually
3. Apply any reusable design-token corrections to this spec
4. User reviews this Work Detail v1.1 direction
5. Then open/activate the implementation Issue

## 13. Next design track after this
After Work Detail is validated, continue design-system rollout in this order:

`Map → Quiz → Place detail / supporting screens`
