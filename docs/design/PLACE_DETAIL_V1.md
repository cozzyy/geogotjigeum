# Place Detail v1 — Hybrid Travel Information

## Status
**PHASE 1 FINAL DESIGN — APPROVED FOR IMPLEMENTATION**

This screen turns fandom interest into practical place discovery without becoming a generic tourism-board page.

## 1. Product role
A place detail page answers four questions in order:

1. Why does this place matter in the work?
2. What is this place now?
3. What can the user reliably know before going?
4. Where should the user go next in the product?

Core flow:

`work/scene meaning → current place identity → practical verified info → map → related work / nearby discovery`

## 2. Visual direction
**Hybrid Travel Information**

Reuse the same Phase 1 design language instead of inventing a fourth style.

### Cinematic/context zone
Use a dark/image-forward top only when a strong verified image exists.

- place name
- related work / scene context
- location/region
- one primary action

### Bright utility zone
Use warm off-white / near-white surfaces for actual reading and travel information.

- near-black text
- restrained borders
- coral primary CTA
- compact information cards rather than dense tables

If there is no strong image, do not force a large dark hero; use a compact branded header/placeholder and move quickly into the bright information surface.

## 3. Desktop structure
Recommended order:

1. shared site shell
2. breadcrumb / lightweight context
3. place hero or compact identity block
4. place name + related work + current location/region
5. primary map CTA
6. `작품에서 이곳은` scene/story context
7. `지금 이곳은` current verified description/status
8. `방문 전에` verified practical information / caution where data exists
9. related work card
10. nearby / related places where existing data supports it
11. final map / continue-discovery CTA
12. footer

Do not split the page into many tiny boxes if the available data is thin.

## 4. Mobile structure
Target 360 / 390 / 430px.

1. compact shell
2. hero/image or image fallback
3. place name + work context
4. obvious map CTA near the top
5. scene/story context
6. practical/current information
7. related work
8. nearby places
9. final CTA

Primary map action must remain easy to find without covering content. Prefer a normal prominent CTA or a carefully scoped sticky action only if it does not collide with browser UI, ads, or other sticky elements.

## 5. Content hierarchy
### A. Identity
Must include only verified existing data:
- place name
- work title
- region/country where available
- current relationship/status label where data supports it

### B. Work context
Explain briefly what happened here / why fans care.

Do not turn this into a duplicate of the whole Work Detail article.

### C. Current/practical context
Examples only when verified source data exists:
- address / rough area
- current operating/closed state
- exterior-only / access caution
- basic visit note

Never invent:
- opening hours
- admission price
- public-transport instructions
- phone number
- booking links
- current business status

If not reliably known, omit it or label it as unverified rather than guessing.

## 6. CTA hierarchy
Primary:
- `지도에서 보기` / directions/map action using existing map/deep-link behavior

Secondary:
- related work
- nearby places
- return to region/place discovery

Share may remain tertiary if an existing working share behavior already exists. Do not add a new account/share backend in this phase.

## 7. Image states
### Image available
- image may anchor the hero
- readable gradient/overlay only where text sits on image
- preserve credit/source rules already used by the project

### Image unavailable
Follow `UTILITY_EDGE_STATES_V1.md`:
- no random stock
- no broken image
- branded neutral placeholder
- compact layout so missing imagery does not dominate the page

## 8. Relationship to current implementation
Current place pages are narrow static utility pages with title, description, tip box, map CTA and related work. Phase 1 should improve hierarchy and visual continuity, not discard that verified information.

Prefer generator/template-level changes if place pages are generated. Do not hand-edit hundreds of generated HTML files as the source of truth.

## 9. Multilingual / SEO
Preserve:
- existing place URLs
- canonical
- hreflang / x-default where currently supported
- OG / Twitter metadata
- TouristAttraction / Breadcrumb structured data where present
- GA4
- KR / EN / JP / zh-Hant routes and readiness behavior
- existing map deep links

Do not create new locale architecture or silently translate missing content.

## 10. Accessibility
- map CTA and secondary actions >=44px on mobile
- visible keyboard focus
- sufficient contrast on image overlays
- no critical meaning by color alone
- long translated place names wrap safely

## 11. Out of scope
- real-time opening-hours API
- booking/reservation integration
- backend account/save system
- route planner
- major URL/SEO rewrite
- new place database model
- paid image/service dependency

## 12. QA
Widths:
- 360 / 390 / 430
- 1280 / 1440

Required checks:
- no horizontal overflow
- long place/work names
- image and image-fallback states
- map CTA visible and functional
- related-work links
- multilingual regression
- canonical/hreflang/meta/structured-data regression
- no new console errors
- no invented/duplicated place data
