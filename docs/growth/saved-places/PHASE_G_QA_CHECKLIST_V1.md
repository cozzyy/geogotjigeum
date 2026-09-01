# Phase G QA Checklist v1

Use after implementation, before PR approval.

## Storage
- [ ] `geugotjigeum.savedPlaces.v1` only
- [ ] duplicate save remains one item
- [ ] reload persistence works
- [ ] corrupt JSON does not crash site
- [ ] corrupt JSON reset does not touch `lang` or other keys
- [ ] stale/missing canonical ID creates no broken card
- [ ] 200-item soft cap fails gracefully

## Save surfaces
- [ ] Work Detail
- [ ] Place Detail
- [ ] Map Explorer detail/sidebar
- [ ] Guide stop card
- [ ] Scene card only if implemented via the same canonical-location control

For every surface:
- [ ] unsaved state
- [ ] saved state
- [ ] unsave
- [ ] `aria-pressed`
- [ ] correct `work_id + location_id`
- [ ] no relationship relabeling

## Saved Places panel
- [ ] global count is correct
- [ ] count updates immediately
- [ ] empty state
- [ ] localized current place name
- [ ] localized current work name
- [ ] relationship shown accurately
- [ ] correct Map/Place action
- [ ] remove item works
- [ ] no broken item after source data change

## My Map
- [ ] cross-work saved pins only
- [ ] unsaved pins excluded from saved-only mode
- [ ] invalid/non-geolocatable saved node excluded from map
- [ ] clicking pin resolves correct work/location
- [ ] existing map detail behavior reused where possible
- [ ] list equivalent available
- [ ] leaving My Map returns to normal app without stale filters
- [ ] existing `?work=&loc=` deep links unchanged

## Locale persistence
Save the same three fixtures and switch KO → EN → JA → ZH:
- `poksshak:seongsan_ilchulbong`
- `breakingbad:lospollos`
- `byakuya:by_fuse_station`

For each locale:
- [ ] saved count identical
- [ ] no duplicate identity created
- [ ] current localized labels render
- [ ] no silent Korean body-copy fallback added by Phase G

## Analytics
- [ ] `save_place`
- [ ] `unsave_place`
- [ ] `open_saved_places`
- [ ] `open_saved_map`
- [ ] `open_saved_place`
- [ ] parameters contain IDs/surface/locale only as planned
- [ ] no PII/free-form content

## Mobile/accessibility
Widths:
- [ ] 360
- [ ] 390
- [ ] 430

Checks:
- [ ] no horizontal overflow
- [ ] tap target >= 44px where directly interactive
- [ ] keyboard save/unsave works
- [ ] saved/unsaved state not color-only
- [ ] panel/map toggle keyboard accessible

## Regression
- [ ] Work Detail validator still passes
- [ ] Place pages unchanged except additive save control
- [ ] Guide pages unchanged except additive save control
- [ ] Scene behavior unchanged except optional shared save control
- [ ] canonical unchanged
- [ ] hreflang/x-default unchanged
- [ ] sitemap unchanged for client-only saved state
- [ ] existing GA4 events unchanged
- [ ] no new global JS error

## Stop / NEEDS DECISION
Stop and report before continuing if any implementation requires:
- backend/auth/database
- new global URL architecture
- second map engine
- major Map Explorer rewrite
- catalog-wide location schema migration
- paid third-party service
- public sharing of saved/private browser state
