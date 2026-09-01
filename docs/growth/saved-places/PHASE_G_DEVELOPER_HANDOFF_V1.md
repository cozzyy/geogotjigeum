# Phase G Developer Handoff v1

Status: **READY FOR IMPLEMENTATION AFTER CURRENT RC MERGE/CHECKPOINT**

Read first:
1. `docs/growth/saved-places/PHASE_G_SAVED_PLACES_MY_MAP_V1.md`
2. `docs/growth/saved-places/SAVED_PLACES_STORAGE_SCHEMA_V1.md`
3. Issue #43

## Mission

Implement a local-first `Saved Places + My Map` experience using the site's existing canonical work/location data and MapLibre application.

Do not create an account/backend system. Do not create a second location database. Do not hand-code separate save behavior for each page type.

## Before coding

Post a short audit with:
1. exact files to touch;
2. current helper used to resolve `work_id + location_id`;
3. current helper/deep-link path used for `?work=<id>&loc=<id>`;
4. whether the existing MapLibre app can display saved locations across works as an additive saved-only layer;
5. any collision with an active shared-shell/map/generator branch.

If item 4 requires a major map/router/data-model rewrite, report `NEEDS DECISION` before building an alternative map architecture.

## Approved implementation shape

Preferred shared module:

```text
site/saved_places.js
```

Responsibilities:
- parse/normalize/migrate Phase G localStorage payload
- save/unsave/idempotency
- saved count
- canonical identity resolution adapter
- shared DOM/state refresh
- GA4 Phase G events
- graceful storage failure

The page generators/components emit identity and the common save control. They do not own storage logic.

## Required UI surfaces

- Work Detail canonical location cards
- Place Detail
- Map Explorer location detail/sidebar
- Guide stop cards

Scene card integration is optional if it can call the same location-save control with no custom branch of logic.

## Saved panel

One global entry with live count, e.g. `♥ 저장 3`.

Panel/list cards show current localized data resolved from canonical sources:
- place
- work
- relationship
- region if available
- map/open action
- remove action

No translated strings or location facts are persisted in localStorage.

## My Map

Preferred: a saved-only layer on the existing MapLibre app derived from resolved saved IDs.

- cross-work pins
- only valid geolocatable records
- existing detail interaction where feasible
- list equivalent for accessibility
- no new indexable route required

Do not create a new map engine or paid map service.

## Required analytics

Events:
- `save_place`
- `unsave_place`
- `open_saved_places`
- `open_saved_map`
- `open_saved_place`

Params as applicable:
- `work_id`
- `location_id`
- `surface`
- `locale`
- `relationship`
- `saved_count`

No PII/free text.

## Required locale UI

- KO
- EN
- JA
- zh-Hant

Saved identity/count must remain identical through locale switches.

## Hard no

- login/auth
- server DB
- cloud sync
- new SEO Saved page
- new sitemap URL for user-private state
- canonical/hreflang changes to existing pages
- relationship/taxonomy changes
- bulk location schema migration
- per-work save code
- content snapshots stored in browser
- third-party saved-list SDK

## QA acceptance

Use at least these fixtures:
- `poksshak:seongsan_ilchulbong`
- `breakingbad:lospollos`
- `byakuya:by_fuse_station`
- one non-Phase-E ordinary location
- one valid Place-page target
- one Map-only target

Pass:
- save/unsave on required surfaces
- idempotent duplicate save
- reload persistence
- same saved state after KO→EN→JA→ZH switch
- global count correct
- deleted/missing ID does not create broken UI
- corrupt Phase G JSON does not crash page or wipe other localStorage keys
- My Map saved-only pins correct
- 360/390/430 mobile
- keyboard/aria-pressed
- no console error
- no canonical/hreflang/sitemap regression
- no break to existing map deep links

## Delivery

Developer reports:
1. changed files;
2. storage API and schema confirmation;
3. screenshots: Work save, Saved panel, My Map desktop, My Map mobile;
4. KO/EN/JA/ZH persistence QA;
5. GA4 event QA;
6. regression results;
7. known issues;
8. PR + local deployment ZIP.

Do not production-deploy without user approval.
