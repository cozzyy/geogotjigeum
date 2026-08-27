# Homepage Redesign A v1 — Approved Implementation Spec

## Status
**APPROVED by user on 2026-08-27.**

Selected direction: **A. Cinematic Content Discovery**.

Figma working file: https://www.figma.com/design/iP3nZVQ3N0Vu6YDFlf4FEt

> Note: the currently connected Figma account is a View seat, so this Markdown is the canonical implementation spec until Figma edit access is available.

## 1. Goal
Redesign the homepage so a first-time visitor understands within seconds that Geugotjigeum connects **K-content scenes → real filming locations → travel discovery**.

## 2. In-scope
- Homepage header/navigation presentation
- Language switcher presentation only; existing behavior must remain
- Hero area
- Primary/secondary CTA treatment
- One featured-scene panel
- First content-discovery section
- Work cards
- Mobile-first layout for 360/390/430
- Desktop 1440
- Reuse current production content/data/assets wherever possible

## 3. Out of scope
- URL/SEO architecture changes
- i18n logic rewrites
- map architecture changes
- quiz logic changes
- account/login/ranking features
- backend/data model changes
- new paid services/assets
- full site redesign beyond homepage

## 4. Approved visual direction
### Desktop composition
1. Header ~72px
2. Hero ~450px
   - left: cinematic visual + headline/CTA
   - right: featured-scene story panel
3. Discovery section
   - section title + short explanatory copy
   - 4 representative work cards on wide desktop where space allows
4. Continue into existing homepage content without breaking current functional entry points

### Mobile composition
1. Compact header
2. Hero image/surface
3. 2-3 line headline
4. Primary + secondary CTA
5. Discovery title
6. Single-column work cards

## 5. Hero copy direction
Primary Korean concept:

`이 장면을 좋아했다면, 그 장소도 좋아할 거예요.`

Supporting concept:

`K-content 속 장면에서 시작해 실제 촬영지와 여행으로 이어지는 발견 경험`

CTA intent:
- Primary: 작품 발견
- Secondary: 지도/장소 탐색

Claude may reuse existing localized homepage copy where it communicates the same product meaning more safely. Do not create new untranslated hard-coded copy that breaks KR/EN/JP/ZH behavior.

## 6. Featured scene
Use an existing verified work/scene/location relationship from current data. The card should communicate:

`scene → work → actual location`

Do not fabricate trivia. Avoid making the repeated “사실 한 곳이 아니었다 / 알고 보니” hook a default UI formula.

## 7. Work cards
Each visible card should prioritize:
- image
- work title
- short place/region metadata
- clear tap/click affordance

Do not add excess badges or information density in v1.

## 8. Design tokens
Use `docs/design/DESIGN_SYSTEM_V1.md` as the base.

Primary direction:
- Background: `#0A0B0F`
- Elevated: `#141820`
- Accent: `#FF7B57`
- Main text: `#FFFFFF`
- Secondary text: `#CDD2DC`

Do not replace the whole app theme if homepage-only scoped classes/tokens can achieve the result.

## 9. Implementation constraints
- Start from latest `main`.
- Respect PR #16 i18n changes.
- Do not regress language toggles or planned/published status behavior.
- Preserve current homepage functional entry points even if their visual presentation changes.
- Prefer scoped homepage CSS to risky global rewrites.
- Reuse current JS/data flow; this is a visual/UX implementation, not architecture work.
- No destructive cleanup unrelated to homepage redesign.

## 10. QA
Required:
- 360px
- 390px
- 430px
- 1440px
- no horizontal overflow
- CTAs >= 44px on mobile
- language switcher works
- works/places/map entry points still work
- existing homepage content loads
- no JS console errors introduced
- hero/card images do not cause severe layout shift
- existing SEO/canonical/sitemap behavior untouched

## 11. Developer output
PR must include:
- changed files
- before/after summary
- screenshots at desktop + mobile if available
- 360/390/430 QA results
- language-switcher regression result
- any difference from this spec
- known risks
- deploy ZIP path per `docs/DEPLOYMENT_HANDOFF.md`
