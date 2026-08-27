# Map Explorer v1 — Design Spec

## Status
**DESIGN READY — FIGMA VISUAL PENDING (Starter MCP rate limit reached)**

Figma file created: https://www.figma.com/design/SmDA0jIwnIK2kfGqqMWYeR

This is the next design track after Work Detail / Hooking Page v1.1.

## 1. Existing implementation confirmed
The current map screen already has a sound structural model and should be preserved:
- Desktop: `#main` split layout with map and sidebar.
- Desktop default ratio: map about 58%, sidebar about 42%.
- User can resize the divider with `#dragHandle`.
- Mobile: map and sidebar are not shown together; the bottom tab bar switches between `지도` and `정보`.
- Map engine: MapLibre GL.

Do not replace this architecture just for visual redesign.

## 2. Core UX goal
Turn the current technical map + sidebar into a travel-discovery product experience:

`selected work → visible places on map → selected place → readable context → immediate travel action`

The map must remain the dominant spatial canvas. The information panel should feel editorial and easy to read rather than like a dark developer sidebar.

## 3. Visual direction — Dark Brand Shell + Bright Info Panel
Use the same family as the approved homepage and Work Detail designs, but assign different jobs to dark and light surfaces.

### Dark brand shell
Use for:
- global header
- selected-work controls
- map filter chips when appropriate
- mobile bottom tab bar

### Map canvas
Keep the map visually open and dominant. Avoid heavy dark overlays that obscure map labels or place density.

### Bright information panel
Desktop sidebar and mobile detail/info view should use a bright warm neutral surface:
- panel background: `#FDFBF7` / warm off-white
- cards: white
- main text: near-black `#1B1E24`
- secondary text: neutral gray `#575E6B`
- soft border: `#E1DCD2`
- primary accent/action: coral `#FF7B57`

This continues the Work Detail v1.1 rule: cinematic discovery at entry, bright surfaces for reading.

## 4. Desktop composition (1440)
1. Dark global header
   - brand
   - product navigation
   - language switcher
2. Main map area about 58%
   - selected work title and place count in a floating search/filter bar
   - work/location filters as compact chips
   - visible map pins with one clearly selected state
   - current-location control and zoom controls
3. Thin draggable divider retained
4. Bright info panel about 42%
   - selected location eyebrow (`SELECTED LOCATION`)
   - location title
   - work + scene context
   - large actual-location/scene image
   - compact fact row (scene / current location / place type)
   - short readable context paragraph
   - primary CTA: open external map/location
   - secondary CTA: share
   - nearby/related locations below

## 5. Mobile composition (390)
Preserve the existing map/info tab architecture.

### Map tab
- dark compact header
- full-width map
- selected work + place count floating search/filter bar
- selected marker state
- current location / filter controls
- small selected-place peek card above bottom tabs
- bottom tabs: `지도` active / `정보`

### Info tab
- same bright information layout as desktop sidebar, full-width
- large location image
- title/context/facts
- primary travel CTA
- nearby locations
- persistent bottom tabs with `정보` active

Do not stack a compressed map on top of a long info panel; the current one-view-at-a-time mobile behavior is correct.

## 6. Interaction hierarchy
Primary interaction order:
1. choose/select work
2. select map pin/location
3. inspect concise place context
4. open real-world map / travel action
5. discover nearby or related places

Secondary controls such as share, extra photos, culture links, or course tools should not compete with the primary travel CTA.

## 7. Preserve existing functionality
Do not remove or break:
- MapLibre map behavior
- work query/deep-link behavior (`?work=...` and location links)
- existing location selection
- draggable desktop split resize
- mobile `지도 / 정보` tab switching
- language switching KR / EN / JP / zh-Hant
- nearby/travel/course actions already supported by the product
- SEO/analytics scripts unrelated to visual layout

## 8. Accessibility / QA
Implementation targets:
- desktop 1280 / 1440 / 1920
- mobile 360 / 390 / 430
- touch targets >= 44px
- map controls must not overlap selected-place card or safe-area tab bar
- sidebar copy contrast suitable for long reading
- no horizontal overflow
- selected pin state must be distinguishable by more than color alone if possible (size/ring/label)
- language controls must survive wider translated labels

## 9. Figma
Working file already created:
`Geugotjigeum Design 03 - Map Explorer`

URL: https://www.figma.com/design/SmDA0jIwnIK2kfGqqMWYeR

The actual desktop/mobile frames are pending because the free Starter MCP call allowance was exhausted during this design session. When the allowance resets, create:
- `Map Explorer Desktop 1440`
- `Map Explorer Mobile 390 — Map`
- `Map Explorer Mobile 390 — Info`

This Markdown spec remains the persistent source of design intent until those visual frames are written.

## 10. Next design track
After Map Explorer visual approval:

`Quiz → Place detail/supporting screens`
