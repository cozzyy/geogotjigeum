# Stranger Things SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/strangerthings/`
- impressions: 61
- clicks: 6
- CTR: 9.8%
- avg position: 7.97
- useful query: `기묘한 이야기 촬영지` avg position 7.38

Interpretation: this is already a first-page asset. Protect the title and search intent; improve trust, freshness and place accuracy instead of doing a broad rewrite.

Current title:
`기묘한 이야기 촬영지와 실제 장소 지도 | 그곳, 지금`

Current description:
`기묘한 이야기의 실제 촬영지와 작품 속 배경 장소를 지도에서 확인하세요.`

## 2. Primary user intent

1. Where was Stranger Things actually filmed?
2. Which Hawkins locations correspond to real Georgia places?
3. Which locations still exist and can be visited now?
4. Which Season 4/5 places were filmed outside Georgia or on studio sets?
5. What is the easiest way to explore the real places on a map?

The page should answer filming-location intent, not fictional-setting intent. A fictional `Hawkins, Indiana` label must always resolve to a real filming place when shown as a travel destination.

## 3. Keep / change recommendation

### Keep
- URL
- current title
- current primary query intent: `기묘한 이야기 촬영지`
- map-first discovery
- Georgia/Atlanta cluster as the main geographic backbone

### Improve
- description: name 2–3 high-confidence anchors such as Jackson, Emory Briarcliff/Hawkins Lab and Rome/Creel House
- freshness: Season 5 is now complete; add a small current note only where it helps place discovery
- data accuracy: several current rows are stale or wrong and must be fixed before they are promoted in SEO copy
- visitor status: clearly distinguish active attraction/public street/private residence/demolished site/studio-only set

## 4. High-confidence anchors

### Jackson, Georgia — downtown Hawkins
Netflix production coverage confirms that downtown Jackson had doubled for downtown Hawkins in previous seasons. This is a strong visitor-facing anchor.

### Emory University Briarcliff Campus — Hawkins National Laboratory
Emory University identifies Building A at its Briarcliff Campus as the real building used for Hawkins National Laboratory. Current repo data is too vague (`Atlanta 권역`) and should use the real place/entity.

### Claremont House, Rome — Creel House
Georgia's Rome identifies the Claremont House at `906 E 2nd Ave, Rome, GA 30161` as the Creel House. It is private property; visitors should stay on the public sidewalk.

### Gwinnett Place Mall — Starcourt Mall
A strong Season 3 anchor. Because the mall/redevelopment status can change, the page should avoid evergreen claims about current access without date-stamped verification.

### Cinespace Atlanta backlot — Season 5 MAC-Z
Netflix's 2026 production coverage says the Season 5 military-controlled Hawkins area was built by recreating downtown Hawkins on the Cinespace Atlanta backlot. This is useful behind-the-scenes context, but it is not a normal visitor destination.

## 5. Data-quality findings in current repo

Source reviewed: `site/contentmap_strangerthings_locations.js`.

### A. Patrick Henry High School status is stale — fix required
Current repo says:
- `실제 운영 중인 학교라 외부 관람만 가능합니다.`

This is no longer true. The former Patrick Henry High School in Stockbridge, used as Hawkins Middle/High, was demolished in 2024 after Season 5 filming. Do not send visitors there as if the original filming building still exists.

Action:
- change status to `DEMOLISHED / historical filming site`
- remove current-visit wording
- if the location remains on the map, make the loss of the original building explicit

### B. Lenora Hills / California-setting row is wrong — fix required
Current repo says the California-setting scenes were filmed in `Fayetteville, Georgia`.

Netflix's own production-design interview says the Byers/Eleven house meant to be in Southern California was found and filmed in a suburban neighborhood in **New Mexico**.

Action:
- do not keep Fayetteville as the factual filming location for Lenora Hills
- replace only after the exact public-facing location/entity is verified; otherwise use a region-level `New Mexico filming` label without inventing a precise address

### C. Kamchatka row is wrong/unsupported — fix required
Current repo says Russian-setting scenes were filmed on an Atlanta soundstage.

Netflix confirms Hopper's snowy prison scenes were filmed outside a real prison in **Vilnius, Lithuania**.

Action:
- remove or correct the Atlanta claim
- if a precise prison entity is added, verify it from a reliable production/tourism source before publishing

### D. Hawkins Lab should be specific
Current repo uses generic `Atlanta 권역` and broad coordinates. Replace with Emory Briarcliff Building A / campus-level entity and an access-status note. Do not imply it is a public attraction without current permission/access confirmation.

### E. Creel House should use the real entity/address
Current repo uses `Rome 인근` with approximate coordinates. Replace with Claremont House / `906 E 2nd Ave, Rome, GA 30161`; retain private-property warning.

### F. Studio terminology needs freshness
Current repo uses `Screen Gems Studios`. Season 5 official material specifically names Cinespace Studios for the MAC-Z backlot. Keep historical studio references only where tied to the season/set actually supported; do not use one studio name as a generic catch-all.

## 6. Suggested page structure

1. Hero: keep `기묘한 이야기 촬영지`
2. `호킨스는 인디애나지만, 촬영은 어디서 했을까?`
3. `지금 가볼 수 있는 대표 촬영지` — Jackson / Rome / other verified public-facing places
4. `이미 사라졌거나 방문하기 어려운 촬영지` — Patrick Henry / studios / restricted locations
5. `시즌별로 달라진 촬영 지역` — Georgia → New Mexico / Lithuania → Season 5 studio context
6. scene → real place → map cards
7. Georgia/Atlanta region discovery + related works

## 7. Metadata proposal

### Title
Keep current:
`기묘한 이야기 촬영지와 실제 장소 지도 | 그곳, 지금`

### Description candidate
`기묘한 이야기의 호킨스가 실제로 촬영된 조지아 잭슨, 호킨스 연구소 배경지와 크릴 하우스 등 주요 장소를 지도에서 확인하세요. 지금 볼 수 있는 곳과 사라진 촬영지도 구분합니다.`

Do not publish the candidate until the location dataset is corrected.

## 8. Internal-link plan

Priority:
- work → verified location entity/page
- location → Georgia / Atlanta / Rome region hub where available
- work/location → map deep link
- Season 5 context → only verified places/sets; avoid entertainment-news-only links that do not help travel discovery
- cross-link same Georgia filming cluster only where the site has a real destination entity

## 9. Locale priority

1. KR — immediate because current GSC query is already first-page
2. EN — strong natural demand, but only after data cleanup
3. JP — evaluate impressions before expansion
4. zh-Hant — later, after source/data and translation readiness

## 10. Implementation risk

**HIGH** because current location data contains multiple factual/current-status errors. Title SEO is stable; the risk is trust/data, not page positioning.

## 11. Implementation gate

Before developer handoff:
- correct/downgrade Patrick Henry, Lenora Hills, Kamchatka and studio rows
- specify Emory Briarcliff and Creel House accurately
- check active Design/Mobile PR collision with work/map generators
- identify generator/source-of-truth; do not patch generated HTML only
- capture pre-change GSC metrics

## 12. Research sources

Primary/strong sources used:
- Netflix Tudum, `The Making of Stranger Things` (2026) — Season 5 MAC-Z/Cinespace and Jackson context
- Netflix Tudum, Season 4 production design interview — California house filmed in New Mexico
- Netflix Tudum, Geeked Week filming recap — Russian prison scenes filmed in Vilnius, Lithuania
- Emory University, `As Scene on Campus` — Briarcliff Building A / Hawkins Lab
- Georgia's Rome, `Claremont House “Creel House”` — entity/address/private-property status
- Atlanta Journal-Constitution — Patrick Henry demolition/current historical status
