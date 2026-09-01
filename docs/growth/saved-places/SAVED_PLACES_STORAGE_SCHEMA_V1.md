# Saved Places Storage Schema v1

Status: planner-approved contract for Phase G.

## 1. Storage key

Use one versioned key only:

```text
geugotjigeum.savedPlaces.v1
```

Do not reuse the existing `lang` key and do not scatter one key per work/place.

## 2. Payload

```json
{
  "version": 1,
  "updatedAt": "2026-09-01T08:30:00.000Z",
  "items": [
    {
      "workId": "poksshak",
      "locationId": "seongsan_ilchulbong",
      "savedAt": "2026-09-01T08:29:10.000Z"
    },
    {
      "workId": "breakingbad",
      "locationId": "lospollos",
      "savedAt": "2026-09-01T08:30:00.000Z"
    }
  ]
}
```

## 3. Required fields

Payload:
- `version`: integer, exactly `1`
- `updatedAt`: ISO-8601 string
- `items`: array

Item:
- `workId`: canonical work ID string
- `locationId`: canonical location ID string
- `savedAt`: ISO-8601 string

No other field is required for v1.

## 4. Do not persist content snapshots

Do not store these as source of truth:
- work title
- place name
- localized name
- description
- region label
- relationship label
- coordinates
- image path
- Place URL

Reason: all can change through content correction, locale switch, taxonomy correction, or generator update.

The browser payload stores identity only. UI resolves current canonical data at render time.

## 5. Unique identity

Unique key:

```js
`${workId}:${locationId}`
```

Saving an already-saved key must be idempotent. Do not create duplicates.

Recommended operation:

```js
savePlace(workId, locationId)
```

- validate non-empty IDs
- read current payload
- if identity exists: no duplicate insert
- otherwise append with current `savedAt`
- update `updatedAt`
- persist

## 6. Removal

```js
removeSavedPlace(workId, locationId)
```

Remove only the exact composite identity. Do not remove all instances of the same `locationId` across different works.

## 7. Maximum size

Soft cap: **200 saved identities** in v1.

Reason: keeps UI and localStorage behavior predictable while far exceeding realistic near-term usage.

If cap is reached:
- do not silently evict old items
- fail the new save gracefully
- show a short localized message if a toast/message system exists

Do not build pagination/storage eviction logic for v1.

## 8. Read / normalization rules

`readSavedPlaces()` should:
1. get only `geugotjigeum.savedPlaces.v1`
2. parse in `try/catch`
3. verify `version === 1`
4. verify `items` is an array
5. keep only items with string `workId`, string `locationId`, parseable `savedAt`
6. deduplicate by composite identity
7. return normalized payload

If the JSON is corrupt or shape is invalid:
- reset only this key to a clean v1 payload
- do not clear all localStorage
- do not touch language preference or other keys
- site remains usable

## 9. Canonical resolution

After storage normalization, resolve each identity against current site data.

Pseudo-contract:

```js
resolveSavedPlace(workId, locationId) -> {
  work,
  location,
  localizedWorkTitle,
  localizedLocationName,
  relationship,
  region,
  lat,
  lng,
  placeHref,
  mapHref
} | null
```

Exact names are developer-owned and should reuse existing helpers.

If resolution returns `null`:
- do not render a broken card
- remove that stale identity from storage in a safe cleanup pass

## 10. Language rule

Storage is locale-neutral.

The same item saved under Korean must remain the same item under EN/JA/zh-Hant.

Do not include locale in the unique key.

## 11. Cross-tab behavior

Recommended low-cost enhancement: listen for browser `storage` events for this key so two open tabs update saved count/state.

This is optional for launch if it creates unexpected complexity, but the storage module should not make it impossible.

## 12. Future migration contract

Future v2 must not overwrite v1 blindly.

Recommended API shape:

```js
function migrateSavedPlaces(raw) {
  // v1 -> future schema
}
```

For v1 implementation, keep schema parsing isolated in the shared storage module so later migration does not require editing every page renderer.

## 13. Privacy

Saved data stays in the user's browser.

Do not transmit the full saved list to a server or third party.

GA4 may receive event-level IDs for user actions as defined in the Phase G spec, but no free-form notes, personal information, precise user location, or browser storage dump.

## 14. Test fixtures

### Clean
```json
{"version":1,"updatedAt":"2026-09-01T00:00:00.000Z","items":[{"workId":"poksshak","locationId":"seongsan_ilchulbong","savedAt":"2026-09-01T00:00:00.000Z"}]}
```

### Duplicate
```json
{"version":1,"updatedAt":"2026-09-01T00:00:00.000Z","items":[{"workId":"poksshak","locationId":"seongsan_ilchulbong","savedAt":"2026-09-01T00:00:00.000Z"},{"workId":"poksshak","locationId":"seongsan_ilchulbong","savedAt":"2026-09-01T00:01:00.000Z"}]}
```
Expected: normalize to one identity.

### Corrupt
```text
{broken-json
```
Expected: no site crash; reset only Phase G key.

### Missing canonical record
```json
{"version":1,"updatedAt":"2026-09-01T00:00:00.000Z","items":[{"workId":"deleted-work","locationId":"old-place","savedAt":"2026-09-01T00:00:00.000Z"}]}
```
Expected: no broken UI; stale identity removed safely.
