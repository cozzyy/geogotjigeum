# Work Detail / Hooking Page v1 — Design Spec

## Status
**DESIGN READY — USER REVIEW PENDING**

This is the next design track after the approved homepage redesign A (`Cinematic Content Discovery`).

Figma file: https://www.figma.com/design/bhWP6rUcihMcpWi45REUd4

Reference implementation inspected: `site/works/poksshak/index.html`.

## 1. Why this screen is next
The homepage now communicates `K-content scene → real place → travel`. The work-detail/hooking page is the first major destination after a work card click, so it must continue the same visual language instead of switching back to a white blog-style page.

Current work pages contain strong content and SEO structure, but the visual transition from the new cinematic homepage is weak. This design keeps the content/SEO structure and redesigns presentation only.

## 2. Core UX goal
The page should move the user through this sequence:

`Scene emotion → short story/hook → actual location → map / quiz / related discovery`

Do not lead with a dense location list. Let one memorable scene or hook establish context first, then expose the most useful place actions.

## 3. Design direction
Inherit `docs/design/DESIGN_SYSTEM_V1.md`:
- cinematic dark canvas
- layered dark surfaces rather than flat black
- warm coral (`#FF7B57`) for primary action
- image-led hierarchy
- simple, readable cards
- mobile-first interaction

Do not imitate Netflix literally. Do not turn the page into a generic tourism-board or magazine page disconnected from the product.

## 4. Desktop composition (1440)
1. Global header + language switcher
2. Split cinematic hero
   - left: work title, short product hook, primary map CTA, quiz CTA
   - right: one `Featured Scene` story/fact
3. Short story section
   - hook text broken into readable 2–3 paragraph rhythm
   - scene image/still can interrupt long text
4. `이 장면의 실제 장소`
   - 3 priority location cards
   - direct map affordance
5. Culture bridge (`작품 속 진짜 한국`)
6. Next actions: map / quiz / other works

## 5. Mobile composition (390)
1. Compact header
2. Hero image/surface
3. Work title + 1-line hook
4. Two visible CTAs: map / quiz
5. Featured Scene card
6. Story block
7. 3 compact horizontal location cards stacked vertically
8. Culture bridge
9. Bottom next actions

Mandatory QA targets when implemented: 360 / 390 / 430px.

## 6. Content treatment
Use existing verified work content and images first. Do not fabricate scene trivia or places.

For the `poksshak` prototype, the design uses existing verified location data already present in the product:
- 성산일출봉 — 삼천배 장면
- 협재해수욕장 — 로맨틱 장면
- 학원농장 유채꽃밭 — 첫 입맞춤 실제 촬영지

The exact copy may be adapted from current production content; design examples are not a license to invent unsupported facts.

## 7. Preserve current functionality / SEO
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

## 8. Existing content that should be retained, but visually reworked
Current `poksshak` page includes:
- full-bleed hero
- title/meta/intro
- map and list CTAs
- hook box and reveal chips
- expandable details
- location cards
- culture crosslink box
- related content

Do not discard these blindly. The design reorganizes hierarchy and styling so the strongest content remains discoverable without becoming one long white text column.

## 9. Interaction rules
- Primary action: map/location discovery
- Secondary action: quiz
- location CTA touch target >= 44px on mobile
- no horizontal overflow at 360/390/430
- language labels must survive KR/EN/JP/ZH widths
- long story copy should use progressive rhythm, not one giant block
- avoid excessive badge/chip density

## 10. Figma frames
Figma working file:
`Geugotjigeum Design 02 - Work Detail`

- Desktop: `Work Detail Desktop 1440`
- Mobile: `Work Detail Mobile 390`

The Figma file is the visual reference; this Markdown is the persistent implementation/decision record in GitHub.

## 11. Development timing
Do **not** start this redesign in parallel with Homepage Issue #19 if it would cause shared CSS/header/i18n conflicts.

Recommended order:
1. Finish Homepage Redesign #19
2. Review the deployed homepage visually
3. Apply any reusable design-token corrections to this spec
4. User reviews this Work Detail v1 direction
5. Then open/activate the implementation Issue

## 12. Next design track after this
After Work Detail is validated, continue design-system rollout in this order:

`Map → Quiz → Place detail / supporting screens`
