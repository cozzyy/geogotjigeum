# ONE PIECE SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/onepiece/`
- impressions: 98
- clicks: 4
- CTR: 4.1%
- avg position: 13.81
- useful query: `원피스 지역` avg position 8.69

Current title:
`원피스 실제 모티브 장소 지도 | 그곳, 지금`

Current description:
`원피스 세계관에 영감을 준 실제 장소와 배경을 지도에서 확인하세요.`

## 2. Main diagnosis

The current page mixes three different intents:
1. Netflix live-action filming locations
2. official ONE PIECE fan/travel experiences
3. speculative or world-building “motif/inspiration” locations

This creates SEO and trust risk. The page should stop treating all points as the same category.

Recommended editorial split:
- **FILMED** — verified live-action production locations
- **OFFICIAL EXPERIENCE** — official ONE PIECE tourism/events, not filming sites
- **STORY / FICTIONAL** — in-universe geography; not a real travel place
- **UNVERIFIED / MOTIF** — do not surface as factual travel content unless reliable sourcing exists

## 3. High-confidence facts from primary/official sources

### Netflix live-action
Netflix Tudum confirms:
- ONE PIECE was filmed in South Africa, including Cape Town Film Studios.
- Season 2 was filmed in Cape Town, South Africa.
- Season 2 premiered March 10, 2026.
- Eiichiro Oda visited the South Africa set during Season 2 production.
- Season 3 production was in Cape Town and officially wrapped June 30, 2026.

### Kumamoto
Official Kumamoto/ONE PIECE recovery-project sources confirm:
- Eiichiro Oda is from Kumamoto.
- the ONE PIECE Kumamoto Revival Project began after the 2016 earthquake.
- Luffy and the Straw Hat crew statues are official recovery/tourism assets across Kumamoto.
- the project remains active in 2026.

### Universal Studios Japan
USJ officially operates `ONE PIECE Premier Summer 2026`, running July 30–November 19, 2026.
This is a valid current travel/event hook, but it must be labeled **EXPERIENCE**, not a filming location.

## 4. Data-quality findings in current repo

Source reviewed: `site/contentmap_onepiece_locations.js`.

### A. Season 3 status is stale
Current repo says Season 3 is `촬영이 진행 중` with a planned wrap in June 2026.

As of official Netflix Tudum reporting dated 2026-06-30, Season 3 **has wrapped production** in Cape Town.

Action: update source data before any content rewrite.

### B. Canary Islands entry is too weak
Current repo says Canary Islands were mentioned as an additional filming candidate and that usage should be confirmed season by season.

This is not strong enough for a location pin presented alongside verified filming sites.

Action: remove from factual map/list or move to an internal research backlog until a reliable production source confirms actual filming.

### C. Cape Town regional claims need precision
Current repo asserts Hout Bay and Table Mountain-area filming for multiple sea/harbor scenes.

This research pass confirmed Cape Town/Cape Town Film Studios from Netflix primary sources, but did not establish those specific sublocations with equivalent confidence.

Action: keep `Cape Town / Cape Town Film Studios` as verified. Do not strengthen Hout Bay/Table Mountain claims until source-verified.

### D. Multiple studio-set pins share the same coordinates
Going Merry, Baratie, Loguetown and Drum Island are all represented as separate map items at the same studio coordinates.

That is technically understandable but poor travel UX if users interpret them as separate destinations.

Action: in the future UI/data model, group these under one physical destination node — `Cape Town Film Studios` — with multiple `scene/set` children rather than pretending each is a distinct travel point.

### E. Fictional map item has no coordinates
`animeislandmap` is explicitly fictional and should never be mixed into real-place counts or travel-distance logic.

## 5. SEO direction

The query `원피스 지역` is ambiguous. It may mean:
- regions/islands in the story
- real locations associated with the franchise
- Netflix filming locations

The current title `실제 모티브 장소` overcommits to inspiration claims. A safer and more useful direction is to separate live-action filming and official travel experiences.

### Recommended title direction after data cleanup
Option A:
`원피스 실사판 촬영지와 공식 여행 명소 지도 | 그곳, 지금`

Option B, if GSC shows more fandom/world intent than live-action intent:
`원피스 실제 장소 지도 — 실사 촬영지·구마모토·USJ | 그곳, 지금`

Do not change title until the data cleanup and query-intent check are complete.

## 6. Recommended page structure

1. Hero — real-world ONE PIECE places, clearly categorized
2. `넷플릭스 실사판은 어디서 찍었을까?`
   - Cape Town
   - Cape Town Film Studios
   - production/set stories
3. `실제로 여행할 수 있는 ONE PIECE 명소`
   - Kumamoto statues/project
   - USJ 2026 event while current
4. `세트는 장소 하나, 장면은 여러 개`
   - Going Merry / Baratie / Loguetown / Drum Island as child scene/set entities
5. `원작 세계지도와 실제 장소는 다르다`
   - fictional layer kept visually separate
6. map / region / related travel CTA

## 7. Internal-link opportunity

Strong links after data cleanup:
- ONE PIECE work → Cape Town Film Studios place
- ONE PIECE work → Kumamoto region / statue place pages if site supports them
- ONE PIECE work → Osaka/USJ place/event only while current and clearly dated
- Cape Town place → other works filmed in Cape Town if verified
- Kumamoto places → same-region travel discovery

Do not create location pages for vague or unverified candidate regions.

## 8. Freshness rules

ONE PIECE has active production/events, so date-sensitive facts need freshness markers.

Fields that should be reviewed periodically:
- season production status
- Netflix release status
- event dates
- studio/public-access status
- temporary exhibitions

Permanent/evergreen items:
- Cape Town filming history
- Kumamoto recovery project/statues

Temporary items such as USJ 2026 should expire or move to archive after the event period.

## 9. Locale priority

1. KR — current GSC evidence
2. JP — especially strong for Kumamoto/USJ official travel intent; check GSC before implementation
3. EN — live-action/Cape Town intent
4. zh-Hant — after translation readiness and search evidence

## 10. Implementation gate

Do not hand to developer yet. Before implementation:
- correct Season 3 status
- verify/remove Canary Islands
- verify or soften Hout Bay/Table Mountain claims
- decide physical-place vs scene/set grouping
- check current GSC query variants around `원피스 지역`, `원피스 실사 촬영지`, `원피스 장소`
- inspect generator/source-of-truth path and collision with active design/mobile PRs

After that, create a small data-cleanup + SEO implementation Issue.
