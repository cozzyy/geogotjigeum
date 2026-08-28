# Utility / Edge States v1 — Phase 1 Finalization

## Status
**PHASE 1 FINAL DESIGN — APPROVED FOR IMPLEMENTATION**

This document closes the remaining small-state design gaps so individual screens do not invent their own fallback, empty, error, multilingual, or advertising behavior.

## 1. Principle
Edge states must feel like part of the same product, but they should remain visually quiet. Do not create a new visual language for fallback states.

Use the established system:
- cinematic dark only when identity/emotion benefits from it
- warm bright surfaces for reading and utility
- coral `#FF7B57` for the main action
- near-black text on light surfaces
- white / `#CDD2DC` on dark surfaces

## 2. Image unavailable
When a verified production image does not exist:
- do not invent or scrape a replacement image
- do not use random stock photography
- use a neutral branded placeholder/gradient based on existing dark/elevated tokens
- keep work/place title visible
- preserve the same card/hero dimensions so layout does not jump
- do not show broken-image icons

If the page is otherwise text-heavy, prefer a compact placeholder rather than a giant empty hero.

## 3. Empty search/filter result
For Places / Regions / future discovery filters:
- state the result plainly: `조건에 맞는 장소가 없어요.` or locale equivalent
- keep the search/filter controls visible
- provide one clear reset action
- optionally provide existing stable navigation such as map / all places / regions
- do not show an empty grid or generic system error
- no backend requirement should be introduced only for the empty state

## 4. Missing / unavailable translation
Follow existing PR #16 readiness behavior.

Rules:
- no silent English fallback presented as if it were the selected locale
- unavailable locale is visibly unavailable / preparing
- language labels remain `KR / EN / JP / 繁中`
- preserve real locale routes and hreflang rules
- do not create fake translated strings to fill gaps

## 5. Long multilingual text
Test KR / EN / JP / zh-Hant labels with realistic long names.

Rules:
- work/place/region names may wrap; do not force tiny fonts to keep one line
- avoid fixed-width buttons that clip translated labels
- use two-line clamps only for secondary summaries, not primary entity names
- header must not accidentally wrap into two rows on 360/390/430px
- do not use horizontal page scrolling as a solution

## 6. Loading / map-app transient state
Only add explicit loading UI where existing asynchronous behavior benefits from it.

Preferred:
- compact skeleton or neutral status text
- preserve panel geometry to avoid layout shift
- do not add full-screen animation for small waits

Map state must not block core controls unnecessarily.

## 7. Error / unavailable action
For recoverable client-side errors:
- concise explanation
- primary action: retry where meaningful
- secondary action: return to stable existing route such as home/map/place
- preserve user orientation

Do not expose internal error details in the visual UI.

## 8. Empty optional sections
If related works, nearby places, culture bridge, quiz, or another optional section has no verified data:
- hide the section cleanly
- do not render empty cards, fake recommendations, or placeholder copy that implies data exists

## 9. Quiz semantic states
Correct / wrong / selected states must not rely on color alone.

Use:
- text/icon/label plus color
- adequate contrast
- stable layout before/after feedback
- no excessive confetti or motion
- retry must reset visual and logical state

## 10. Search/filter states
- active filter has visible label/state, not color only
- reset is always discoverable when filters are active
- result count remains textual
- mobile controls >=44px

## 11. Advertising safety
Manual AdSense placement may coexist with the redesign, but ads must not damage the core product experience.

Do not place ads:
- inside the primary homepage hero
- between a quiz question and its answer choices
- between answer selection and immediate quiz feedback
- over map controls or the location information panel
- inside primary CTA groups
- as an element that visually resembles a location/work card

When ads are inserted between editorial/discovery sections:
- reserve enough vertical space to reduce CLS where practical
- keep a clear visual gap from navigation/CTA controls
- do not make sticky controls overlap ad slots

This document does not change AdSense implementation strategy or create new ad placements by itself.

## 12. Focus / keyboard / accessibility
Across all Phase 1 screens:
- keyboard focus remains visible
- interactive elements use semantic controls where practical
- touch targets >=44px on mobile
- hover-only information must also be available without hover
- state is not encoded by color alone
- text/background contrast must remain readable

## 13. Footer / terminal navigation
Footer does not need a new visual concept.

Normalize only:
- typography
- spacing
- link contrast
- warm-light vs dark-shell compatible colors

Preserve existing legal/contact/about destinations. Do not invent new footer routes for symmetry.

## 14. QA matrix
Mandatory widths:
- 360
- 390
- 430
- 1280 where relevant
- 1440
- 1920 for Map Explorer

Check:
- no horizontal overflow
- no clipped multilingual labels
- image fallback does not collapse layout
- empty states are actionable
- unavailable translation is explicit
- keyboard focus visible
- touch targets >=44px
- ad slots do not overlap product controls
- no new console errors
- no SEO/i18n regression
