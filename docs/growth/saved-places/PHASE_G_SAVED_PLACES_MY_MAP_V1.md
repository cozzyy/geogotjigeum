# Phase G — Saved Places & My Map v1

Status: **PLANNER GATE CLEARED — READY AFTER CURRENT RELEASE CANDIDATE IS MERGED**

Parent: Issue #31 — Content Growth Engine v1

## 1. Product goal

Turn geugotjigeum from a one-session discovery site into a lightweight return-use product.

Core loop:

`Work / Scene / Place / Guide → save a real place → Saved Places → My Map → reopen place/work → plan a trip`

The user should be able to save places without account creation, then come back on the same browser and see the saved list/map again.

This is intentionally **local-first**. v1 does not require backend, auth, cloud sync, profile, payment, or personal data collection.

## 2. Why this is the next phase

Phase E and F already create higher-value nodes:
- Work Detail
- Scene cards
- Place Detail
- Map Explorer
- curated Guides

Phase G should connect those nodes with a durable user action. The product action is **save a place**, not save an article/work/scene.

Saved identity must therefore point to the existing canonical location record.

## 3. v1 scope

### Required
1. Save / unsave a canonical place.
2. Persist saves in browser `localStorage`.
3. Show a global Saved Places entry with live count.
4. Show a Saved Places drawer/modal/list.
5. Open a saved place through the existing map state (`work + location`).
6. Provide a **My Map** mode that visualizes saved geolocatable places across works when this can be done as an additive layer on the current MapLibre app.
7. Keep saved state language-independent; names/descriptions are resolved at render time from current locale data.
8. Add GA4 events for save/open behavior.
9. Full KO/EN/JA/zh-Hant UI strings.

### Save entry surfaces
Use the same reusable save control. Do not implement separate logic per page.

Priority surfaces:
- Work Detail location cards
- Place Detail
- Map Explorer location detail/sidebar
- Guide stop cards

Optional only if it fits the existing renderer cleanly:
- Scene cards: save the linked canonical location, never the scene itself.

### Not in v1
- login/signup
- cloud synchronization
- cross-device sync
- public/shareable saved lists
- collaborative trip planning
- notifications
- reviews/ratings
- booking/payment
- server database
- automatic route optimization
- saving people/works/scenes as separate object types

## 4. Canonical identity rule

A saved item is identified by:

```text
<work_id>:<location_id>
```

Example:

```text
breakingbad:lospollos
poksshak:seongsan_ilchulbong
```

Do not store translated title/name/description snapshots as source of truth. They become stale when content is corrected or locale changes.

At render time resolve `work_id + location_id` against the canonical current location data.

If an old saved ID no longer resolves, skip it from the visible list and clean it from storage safely. Do not show broken cards.

## 5. Eligibility

A location can be saved when it resolves to a real canonical location object.

For **My Map**, it additionally needs valid numeric latitude/longitude.

Do not manufacture a Place URL merely to make something saveable.

A STORY_SETTING can be saved if it is an actual geolocatable real-world place. A fictional/non-geolocatable node must not appear as a My Map pin.

Existing relationship truth remains unchanged. Saving must never relabel STORY_SETTING, ADAPTATION_FILMING, FILMED, inspiration, etc.

Where an existing location is explicitly flagged by current product/content rules as unsafe/private/not for visitor promotion, do not add a new promotional save CTA. If the existing data has no such flag, do not introduce a broad data-model migration in Phase G; report the specific case as `NEEDS DECISION`.

## 6. UX

### 6.1 Save button

Unsaved:

```text
♡ 저장
```

Saved:

```text
♥ 저장됨
```

Localized equivalents are required.

Behavior:
- one click saves
- second click removes
- no confirmation modal for a single item
- use `aria-pressed="true|false"`
- keyboard-operable
- touch target >= 44px on mobile
- visual state cannot depend on color alone

The control should expose a common attribute/API such as:

```html
<button
  class="save-place-btn"
  data-work-id="poksshak"
  data-location-id="seongsan_ilchulbong"
  aria-pressed="false">
</button>
```

Exact markup is developer-owned; identity contract is planner-owned.

### 6.2 Global Saved Places entry

Add one global entry in the existing shell/header or another shared high-visibility navigation surface:

```text
♥ 저장 3
```

Requirements:
- count updates immediately after save/unsave
- mobile uses a compact version if necessary
- count persists after reload
- no new indexable SEO URL is required

### 6.3 Saved Places panel

Open as an additive drawer/modal/sheet inside the existing app shell unless current architecture strongly favors another non-indexed client view.

Each card:
- current localized place name
- work title
- relationship label
- region/country if available
- `지도에서 보기`
- remove control

Recommended grouping: by work. Keep v1 simple; no sorting engine needed.

Empty state:

```text
아직 저장한 장소가 없어요.
작품 속 장소에서 ♡ 저장을 눌러 나만의 여행 지도를 만들어보세요.
```

### 6.4 My Map

Primary intent: show all saved geolocatable places on one map regardless of work.

Preferred implementation:
- reuse existing MapLibre instance and existing canonical location data
- create a saved-only GeoJSON/data layer derived from localStorage identities
- no duplicate source of location facts
- clicking a saved marker opens the existing location detail behavior where possible
- provide a way to return to Saved Places list

If the current Map Explorer fundamentally cannot display cross-work locations without a large router/data-model rewrite, **stop as `NEEDS DECISION` rather than creating a second map system**. In that case G1 (save + list + existing map deep links) may ship first, but My Map remains an explicit incomplete Phase G requirement.

Do not create a crawlable `/saved/` or `/my-map/` page solely for client state in v1.

## 7. Existing map compatibility

Current app already supports language preference in localStorage and `?work=` boot/deep-link behavior. Phase G should reuse that client-state architecture rather than introducing a framework/backend.

A saved item action should resolve to the existing map state equivalent of:

```text
?work=<work_id>&loc=<location_id>
```

Use the repository's actual existing parameter/link helper; do not create a competing URL convention.

## 8. Storage contract

Canonical contract is documented separately in:

`docs/growth/saved-places/SAVED_PLACES_STORAGE_SCHEMA_V1.md`

Key points:
- versioned localStorage key
- IDs + timestamps only
- no translated copy snapshots
- duplicate prevention
- safe corrupt-data recovery
- future migration hook

## 9. i18n

Saved state is shared across language switches because identity uses IDs only.

Required UI locales:
- ko
- en
- ja
- zh-Hant (`zh` app key)

Language switching must not create duplicate saved items.

If a location exists in storage but current locale lacks a dedicated Place page, the Saved panel can still show the localized canonical location name and link to the existing Map state. Do not silently inject Korean page copy into EN/JA/ZH.

## 10. Analytics

Add low-volume behavioral GA4 events. No PII.

Recommended events:

```text
save_place
unsave_place
open_saved_places
open_saved_map
open_saved_place
```

Recommended parameters:

```text
work_id
location_id
surface       // work | place | map | guide | scene
locale
relationship
saved_count   // after action where relevant
```

Do not send free-form user-entered data.

## 11. Accessibility

- save button uses `aria-pressed`
- saved count changes should not create disruptive announcements
- buttons have accessible labels in all locales
- empty state and map/list switch are keyboard accessible
- marker-only state must have a list equivalent
- no meaning by heart color alone

## 12. Failure behavior

Storage unavailable/private mode/quota error:
- page must continue to work
- save action should fail gracefully
- do not throw a global JS error
- use a short localized toast/message if available

Corrupt JSON:
- catch parse error
- reset only the Phase G storage key
- do not touch existing `lang` or other localStorage keys

Deleted/renamed location:
- try canonical ID resolution
- unresolved entries are skipped and safely removed from the Phase G payload

## 13. Implementation architecture

Prefer a small shared client module, for example:

```text
site/saved_places.js
```

Responsibilities:
- storage read/write/migration
- `isSaved(workId, locationId)`
- `savePlace(...)`
- `removeSavedPlace(...)`
- event/subscriber or DOM refresh hook
- safe canonical resolution adapter
- analytics helper

Page/render generators should only emit identity attributes and shared control markup. They must not each implement their own localStorage code.

Possible integration touch points:
- `contentmap_app.js`
- shared Work generator
- Place generator
- Guide generator
- shared CSS/shell
- locale string source

Developer must audit exact current files before implementation and keep the touch list minimal.

## 14. Guardrails

- preserve all existing Work/Place/Guide URLs
- no canonical/hreflang/x-default changes for existing SEO pages
- no new sitemap entries for client-only Saved/My Map state
- do not alter canonical location relationships
- do not duplicate location facts in storage
- do not create account/auth infrastructure
- do not add third-party SDK/service
- do not change MapLibre provider
- do not create separate per-work save implementations
- do not make private/local saved data indexable or shareable by accident

## 15. QA matrix

### Functional
- save from Work
- save from Place
- save from Map
- save from Guide
- saved count updates
- unsave from original surface
- unsave from Saved panel
- reload retains items
- locale switch retains same IDs
- open saved item reaches correct map/location
- My Map shows only saved geolocatable items
- empty state works
- corrupt storage does not break site

### Cross-locale
At least one item saved in KO, then switch EN → JA → zh and confirm same saved identity/count with localized current labels.

### Mobile
- 360
- 390
- 430

No horizontal overflow. Save target >= 44px where directly tappable.

### Regression
- existing map deep links
- Work Detail
- Place Detail
- Guide pages
- Scene cards
- canonical/hreflang/x-default
- sitemap
- GA4 existing events
- no new console errors

## 16. Pilot QA set

Use existing high-value nodes:
- `poksshak:seongsan_ilchulbong`
- `breakingbad:lospollos`
- `byakuya:by_fuse_station` (real STORY_SETTING; Map state)
- one ordinary non-Phase-E location
- one item with a Place page
- one item without a Place page but valid Map state

This set deliberately verifies relationship truth and Place-vs-Map fallback.

## 17. Done

- [ ] shared storage module implemented
- [ ] save/unsave from required surfaces
- [ ] global saved count
- [ ] Saved Places list/panel
- [ ] My Map cross-work saved pins OR explicit `NEEDS DECISION` if additive implementation is not feasible
- [ ] no broken/fictional non-geolocatable pins
- [ ] KO/EN/JA/ZH UI strings complete
- [ ] GA4 events present
- [ ] persistence/reload passed
- [ ] 360/390/430 passed
- [ ] SEO/i18n regression 0
- [ ] local deployment ZIP / QA report prepared
- [ ] no production deployment without user approval

## 18. Release gate

Do not start Phase G against a moving release branch.

Start when:
1. the current RC containing #37/#40/#41/#42 is merged or safely checkpointed as the developer's new baseline;
2. same-day collision audit shows no active shared-shell/map/generator work;
3. developer posts exact touch list and confirms this can be implemented local-first without backend/auth.

Normal additive JS/CSS/generator work is Fast Lane after those checks.

Stop `NEEDS DECISION` only if implementation requires:
- new backend/auth/database
- new global URL architecture
- major Map Explorer rewrite
- location data-model migration across the catalog
- third-party paid service
- material privacy policy change beyond local browser persistence disclosure.
