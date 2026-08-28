# Discovery Hubs v1 — Places / Regions

## Status
**DESIGN PREP — USER REVIEW PENDING — DO NOT IMPLEMENT YET**

## 1. Why this is next
After homepage, work detail, map, quiz, and place detail are brought into one visual system, the remaining high-traffic utility pages should stop feeling like static indexes.

Current references:
- `site/places/index.html`
- `site/regions/index.html`

Observed current-state issues:
- `/places/` says users can search by place name, but the visible page is effectively a long flat card list.
- `/places/` currently exposes hundreds of places in one collection page, so scan cost grows as content grows.
- `/regions/` is dominated by a long country chip wall; the visual hierarchy between major destinations and long-tail destinations is weak.
- both pages use a narrow static white-page treatment that visually disconnects from the redesigned product.
- locale presentation must follow the established KR / EN / JP / `繁中` convention; do not reintroduce inconsistent `中文` labels.

## 2. Product role
These are not editorial reading pages. They are **discovery utilities**.

Core journeys:

### Places
`I know the place / I vaguely remember the place → search/filter → identify the work context → open place → map`

### Regions
`I know where I want to travel → choose country/region → see works and filming places → open map/place`

## 3. Visual direction — Light Discovery Index
Use a compact dark brand shell at the top, then a bright high-legibility discovery surface.

- top shell: dark cinematic brand continuity
- main surface: warm white / off-white
- primary text: near-black
- secondary text: neutral gray
- primary accent: coral `#FF7B57`
- use blue only where existing functional semantics require it; do not make blue a second competing brand accent

The page should feel closer to a modern travel search/browse tool than a blog archive.

## 4. Places hub — desktop
Recommended order:
1. shared compact header / language switcher
2. page title + one-line value proposition
3. prominent search field: place name / work title
4. lightweight filter row
   - country/region
   - work
   - place type if verified data supports it
5. optional featured / recently relevant place strip using existing verified content only
6. results count
7. responsive place-card grid
8. pagination / progressive reveal only if implementation data size makes it necessary
9. footer

### Place card anatomy
- image if an existing verified image is available; image is optional, not required
- current place name
- related work title
- country/region
- short relationship label if data already exists
- CTA: `장소 보기` / `지도에서 보기`

Do not fabricate images, categories, transport information, opening hours, or prices to fill empty card fields.

## 5. Regions hub — desktop
Recommended order:
1. shared compact header
2. page title + travel-oriented supporting copy
3. `대한민국` discovery block first for KR page if existing data supports it
4. `나라별 촬영지` visual country grid
5. each country card shows verified place count and one or two representative work/place cues when data is readily available
6. long-tail countries may remain compact list/chips below the primary grid
7. domestic regional discovery section
8. map CTA

Do not make 20+ countries visually identical. Use hierarchy:
- top destinations / high-count destinations = cards
- long-tail destinations = compact list/chips

This hierarchy is presentational only; it must not change URLs or indexability.

## 6. Mobile
Target: 360 / 390 / 430.

### Places
- sticky compact header
- search field visible near top
- filters in horizontal scroll or compact sheet trigger
- one-column place cards
- card CTA touch target >=44px
- results count remains visible and understandable

### Regions
- featured country cards 2-column where width permits, otherwise 1-column
- long country list remains scannable
- avoid giant chip clouds that require excessive visual parsing

## 7. Search/filter implementation principle
Prefer client-side enhancement of existing static collection data when possible.

Do not require:
- backend search service
- new paid search API
- URL architecture rewrite
- server-side account state

If search/filter cannot be implemented cleanly from existing generated data, report `NEEDS DECISION` before introducing architecture.

## 8. Preserve
- existing canonical URLs
- hreflang / x-default
- CollectionPage structured data where applicable
- current place URLs
- current region URLs
- KR / EN / JP / zh-Hant routes
- existing SEO-visible links to individual places/regions
- GA4
- map/deep-link behavior

## 9. Accessibility / readability
- visible focus states
- search input explicit label or accessible name
- no color-only filter state
- counts remain textual
- touch targets >=44px mobile
- long translated country/work/place names must wrap safely
- no horizontal page overflow

## 10. Figma plan
When Starter MCP quota allows:
- Places Hub Desktop 1440
- Places Hub Mobile 390
- Regions Hub Desktop 1440
- Regions Hub Mobile 390

## 11. Timing
Do not implement until the earlier design rollout has stabilized:
1. Work Detail #20 completed/reviewed
2. Map Explorer #22 visual approved
3. Quiz #23 direction/visual approved
4. Place Detail #24 direction approved

## 12. Next design track
After Discovery Hubs, normalize the **shared site shell / global navigation / language presentation** across homepage, map, work, place, region, and utility pages without changing routing architecture.
