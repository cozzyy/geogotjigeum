# Harry Potter SEO Research v1

Status: RESEARCH COMPLETE — implementation after collision check.

## Why this page matters

Search Console baseline (2026-08-25 export):
- page impressions: 67
- clicks: 6
- CTR: 9.0%
- average position: 7.22

This is one of the site's strongest first-page assets. Preserve the successful search intent.

## Current page snapshot

Current title/H1:
`해리 포터 영국 촬영지와 실제 장소 지도`

Current content already covers a strong UK travel cluster: King's Cross, London locations, Oxford, Alnwick, Glenfinnan/Scottish Highlands and other locations.

## Recommendation summary

### KEEP
- URL `/works/harrypotter/`
- title/H1 core phrase `해리 포터 영국 촬영지`
- UK-wide travel framing
- Glenfinnan Viaduct hero direction
- map-first CTA and 25-place inventory

### CHANGE — P0 factual precision

1. **Separate filmed-at vs inspiration/association claims.**
   - Christ Church's official site explicitly confirms the **Hall Staircase** was used in Harry Potter filming.
   - Its official Great Hall page does not say the Great Hall itself was used as the film's Hogwarts Great Hall set.
   - Therefore copy such as `Christ Church dining hall = Hogwarts Great Hall filming location` should be avoided unless another primary production source proves it.
   - If retaining the Great Hall connection, label it carefully as an associated/inspirational visitor location rather than the exact filmed Great Hall set.

2. Keep clearly verified locations as direct filming/travel anchors:
   - King's Cross / Platform 9¾ visitor spot
   - Leadenhall Market
   - Bodleian Library / Divinity School
   - Christ Church Hall Staircase
   - Glenfinnan Viaduct
   - Loch Shiel
   - Alnwick Castle / Gloucester Cathedral and other verified VisitBritain locations

### CHANGE — P1 2026 freshness and travel utility

3. Add a small dated `2026 여행 업데이트` rather than rewriting the page.
   - VisitBritain notes 2026 marks 25 years since the release of *Harry Potter and the Philosopher's Stone*.
   - Keep this as a compact freshness signal, not promotional clutter.

4. Add practical current-state notes where official travel sources support them.
   - VisitScotland states the Jacobite Steam Train route over Glenfinnan operates April–October; booking is advised.
   - Loch Shiel appears as Hogwarts Lake in several scenes.
   - Christ Church is a working college/cathedral with closures and limited visitor access at certain times; link to current official visiting information rather than hard-coding schedules that will go stale.

5. Reorganize locations into travel clusters:
   - London
   - Oxford
   - Northern England / castles
   - Scotland / Highlands

This better matches actual itinerary/search behavior than a flat 25-place list.

### CHANGE — P1 reading flow

6. The current article spends many paragraphs recapping all eight films before reaching the travel utility. Reduce the front-loaded plot summary.

Recommended order:
1. 3–5 short emotional hook paragraphs
2. `런던에서 바로 갈 수 있는 곳`
3. `옥스퍼드의 호그와트 흔적`
4. `스코틀랜드 호그와트 익스프레스 코스`
5. optional deeper story / full 25-place list

7. Use a clear distinction between:
- `실제 촬영지`
- `방문용 공식 포토스폿/관광 요소`
- `영감·연관 장소`

### CHANGE — P2 new HBO series guardrail

8. Do not mix the original 2001–2011 film map with the new Harry Potter TV series.
   - VisitBritain separately discusses filming activity for the new series.
   - If mentioned, place it in a clearly dated `새 시리즈 업데이트` box and keep the original film locations as the primary content.

### P2 internal discovery

Potential internal links, only where routes/data exist:
- Harry Potter → United Kingdom region
- London locations → other London filming works
- Oxford → related UK works
- Scotland / Glenfinnan → Scotland-region discovery

## Verified external evidence

Official tourism/institutional sources:
- VisitBritain — UK Harry Potter filming locations: https://www.visitbritain.com/en/things-to-do/visit-harry-potter-filming-locations
- VisitScotland — Harry Potter itinerary / Glenfinnan / Loch Shiel: https://www.visitscotland.com/things-to-do/attractions/tv-film/harry-potter-itinerary
- Christ Church Oxford — Hall Staircase and Great Hall descriptions: https://www.chch.ox.ac.uk/visit/things-to-see
- Christ Church Oxford — current closures/visitor information: https://www.chch.ox.ac.uk/visit/known-closures

## Implementation guardrails

- Preserve URL/canonical/hreflang/structured data.
- Preserve the already-successful title unless current GSC contradicts the baseline.
- Do not hard-code frequently changing opening hours when an official current-info link is safer.
- Do not combine original film and new TV-series filming into one undifferentiated map layer.
- Coordinate with active shared CSS/generator work before implementation.
- Measure at ~14d/~28d after deployment.

## Decision

**SEO action: PRESERVE + TRAVEL-UTILITY UPGRADE.**

This page does not need a new identity. It needs less plot recap, stronger UK itinerary clustering, precise filming-vs-inspiration labeling and current official travel information.