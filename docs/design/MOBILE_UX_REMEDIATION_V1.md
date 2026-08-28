# Geugotjigeum Mobile UX Remediation v1

## Status
**APPROVED corrective pass — based on real-device screenshots provided by user on 2026-08-28**

This document is a corrective mobile-only pass for the current Design Phase 1. It does not replace the approved visual direction. It fixes the gap between desktop-oriented responsive CSS and actual mobile usability observed on real devices.

## 1. Why this pass is required
Two real-device screenshots exposed a consistent pattern:
- the mobile homepage technically stacks, but still feels like a compressed desktop composition
- some copy visibly clips at the right edge or is forced into overly tight containers
- header controls are crowded
- hero/search/CTA content is too dense above the fold
- large cards consume too much vertical space relative to the amount of information shown
- some text/card treatments feel scaled down rather than intentionally designed for a phone
- mobile QA based only on CSS inspection is insufficient

This is a product usability correction, not a new aesthetic direction.

## 2. Non-negotiable mobile rules
Applies to all touched screens: Homepage, Work Detail, Map, Quiz, Place Detail, Places/Regions hubs and Shared Shell.

### 2.1 No horizontal overflow
Hard gate at 360 / 390 / 430px:
- `document.documentElement.scrollWidth <= window.innerWidth`
- `document.body.scrollWidth <= window.innerWidth`
- no visible right-edge clipping
- no fixed-width child may force the page wider
- flex/grid children that contain text must use `min-width:0` where needed
- images/media must stay within container width
- avoid `white-space:nowrap` on user-facing titles/body copy unless paired with intentional ellipsis and a clearly bounded single-line UI

### 2.2 Mobile typography is not desktop typography scaled down
Recommended minimums:
- primary mobile page/hero title: 22–26px, line-height 1.3–1.4
- section title: 19–22px
- card title: 15–17px
- body/readable description: 14–16px, line-height 1.55–1.75
- meta/supporting copy: normally >=12px
- utility labels may be 11–12px only if not essential reading

Do not use tiny text to make a desktop layout fit.

### 2.3 Mobile content width
- normal page horizontal padding: 16px preferred, 14px minimum where map/app density requires it
- avoid nested containers each adding large left/right padding
- all important content should use the available width instead of being visually reduced to a narrow desktop column

### 2.4 Touch targets
- interactive primary/secondary controls: min 44px height
- language/nav controls must remain tappable without requiring precision
- do not shrink controls below accessible size merely to keep four languages and navigation on one row

### 2.5 Mobile hierarchy
The first screen must answer:
1. Where am I?
2. What is this content/place/work?
3. What is the primary thing I can do now?

Avoid showing search, multiple filters, three secondary actions, long counters and large card previews all with equal emphasis above the fold.

## 3. Shared mobile header correction
Current mobile screenshots show the logo/home/language group fitting physically but feeling crowded and visually small.

Target:
- one stable row only
- height around 54–60px depending on shell
- brand/logo left
- language access right
- Home/back only when it adds meaning; avoid equally strong duplicate home controls next to a clickable logo
- canonical labels remain `KR / EN / JP / 繁中`
- if direct four-language pills plus navigation do not fit comfortably at 360px, collapse secondary navigation before shrinking language/touch controls
- no accidental two-row wrap

## 4. Homepage mobile correction
The current screenshot shows the strongest gap between responsive CSS and mobile UX.

### 4.1 Hero
Keep cinematic imagery, but simplify the first viewport.

Required:
- hero card width must be fully contained inside viewport
- title must wrap naturally; never clip on the right
- title target 22–24px at 360–390, max roughly 3 lines
- kicker remains small and secondary
- counter copy must not behave like one long desktop pill; on mobile use a compact 1–2 line block/card or split metrics so every number and label remains readable
- reduce excessive vertical hero padding

### 4.2 Search/filter
Current mobile hero gives the search/filter panel too much vertical dominance.

Target default state:
- search input prominent and full-width
- one compact `필터` action
- filter-reset hidden until a filter/search state is active
- expanded filter controls appear on demand, not as permanent above-the-fold height
- search/filter container should feel like a tool, not a second hero card

### 4.3 Primary CTA
`작품 발견하기` remains the primary action, but should read as a button rather than a large banner.

Target:
- full width allowed on phone
- 46–50px height range
- moderate radius; not visually heavier than the work content below
- spacing above/below compact

### 4.4 Secondary actions
Do not force `지역별 여행 / 내주변여행 / 여행지찾기` into one cramped row.

Preferred mobile layout:
- 2-column grid for first two actions
- third action spans two columns, or use a clearly intentional horizontal scroll pattern
- labels must remain readable without tiny typography

### 4.5 Featured/content card
- one-column mobile card
- image height approximately 150–190px depending on aspect ratio/content
- card title may wrap to 2 lines
- remove `white-space:nowrap` for main content titles on mobile
- if truncation is required, use 2-line clamp rather than one-line clipping for prominent titles
- supporting copy 12.5–14px

## 5. Work Detail / Hooking mobile correction
The real-device example shows excessive vertical card height relative to information density and a general compressed/small-text feeling.

### 5.1 Top area
- compact shared header
- work title 23–27px depending on length
- metadata readable without miniaturization
- hero must not occupy most of the first screen unless a verified image is the actual focal point
- primary map/place CTA should appear early and be obvious

### 5.2 Reading zone
Keep the approved Hybrid Light Editorial direction:
- warm light surface for long reading sections
- body >=14.5px where practical
- line-height around 1.65
- no long reading block on black background

### 5.3 Large colored cards/panels
Avoid large near-empty panels such as 160–220px-tall blocks containing only one short line.

Use content-driven height:
- typical compact feature/action card: roughly 84–120px unless actual media/content needs more
- left-align important text where it improves scanability
- clearly indicate whether the card is information, CTA or content preview
- strong red/dark fills must have semantic purpose, not function only as decoration

### 5.4 Long titles
- wrap safely
- 2–3 lines acceptable
- never shrink the entire page or typography to fit a long title

## 6. Map mobile correction
Preserve approved map/info tab architecture.

- map and info remain separate full-height states on mobile
- tab bar target >=44px
- map controls must not collide with browser safe area or tab bar
- bright info panel text >=14px for main content
- selected place state understandable without color alone
- no fixed-width sidebar leftovers when switched to mobile mode
- map deep link must land in a usable state at 360/390/430

## 7. Quiz mobile correction
- modal/surface should use nearly full viewport width with 12–16px outer margin
- question 16–18px
- answers min 44px, preferably 48px+
- progress = numeric + compact bar, not many dots
- feedback must not rely on color alone
- result location cards one column
- no ad insertion inside question/answer/feedback sequence
- retry must reset state completely

## 8. Place Detail mobile correction
- compact hero or image; do not let decorative image push practical info far below fold
- place name 23–27px
- map CTA visible near top and >=44px
- practical info on warm light surface
- missing image uses deliberate neutral fallback, not a giant empty media box
- related work/nearby cards compact and content-driven

## 9. Places / Regions mobile correction
### Places
- search visible near top
- filter controls collapsible
- one-column cards
- result count readable
- no-result + reset state explicit

### Regions
- do not render a giant undifferentiated chip cloud
- featured/high-count regions may use 2-column cards when readable
- long-tail regions use compact list/chips
- all labels wrap safely

## 10. Empty / fallback / ad states
Apply `UTILITY_EDGE_STATES_V1.md` with mobile emphasis:
- no giant empty image placeholders
- absent optional sections collapse cleanly
- no-result states are compact and actionable
- unavailable translation is explicit
- manual AdSense placement must not split primary CTA groups, quiz flows or map interaction areas
- reserve enough space to avoid layout jump, but do not create large dead zones when no ad is present

## 11. Real-device/browser QA is mandatory
Programmatic/CSS reasoning is not enough for this correction.

Required viewports:
- 360x800 class
- 390x844 class
- 430x932 class

Minimum QA method:
1. open actual page in a real browser or browser-emulated mobile viewport
2. capture full-page or representative screenshots
3. visually inspect header, first viewport, mid-page cards and footer
4. verify horizontal overflow numerically
5. verify buttons with touch-sized layout
6. test long KR/EN/JP/zh-Hant labels on representative pages

If developer environment cannot capture screenshots, report that explicitly and provide a local ZIP; do not claim mobile visual QA as complete from CSS box-model calculation alone.

## 12. Acceptance criteria
This corrective pass is complete only when:
- no right-edge clipping on representative pages
- no global horizontal scroll at 360/390/430
- homepage hero/search/actions feel intentionally mobile, not compressed desktop
- work/detail cards use content-driven vertical density
- typography is readable without zoom
- shared header feels stable and tappable
- upcoming map/quiz/place/hub implementations inherit these mobile rules
- screenshots from actual browser/emulation are included where environment allows

## 13. Scope boundary
Do not change:
- URL/SEO architecture
- data model/backend
- locale architecture
- verified content
- deployment architecture
- desktop design direction unless a shared fix is unavoidable

This is a focused mobile usability correction inside Design Phase 1.
