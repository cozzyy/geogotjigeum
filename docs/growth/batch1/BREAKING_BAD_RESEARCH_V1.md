# Breaking Bad SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/breakingbad/`
- impressions: 135
- clicks: 5
- CTR: 3.7%
- avg position: 10.13
- useful query: `앨버커키 브레이킹 배드` avg position 8.90

Interpretation: this is a page-one boundary page. The current title already matches the highest-value intent well, so do not change title for novelty.

Current title:
`브레이킹 배드 앨버커키 촬영지 지도 | 그곳, 지금`

Current description:
`브레이킹 배드의 실제 촬영지와 배경이 된 앨버커키의 장소를 지도에서 확인하세요.`

## 2. Primary user intent

Primary intent is not plot summary. It is:
1. Where in Albuquerque was Breaking Bad filmed?
2. Which locations can still be visited now?
3. Which are businesses/open places vs private residences?
4. What is the best self-guided route / map?
5. What was each real place in the show?

The official Visit Albuquerque tourism site treats Breaking Bad as a continuing film-tourism product and specifically promotes self-guided/guided location discovery. This strongly supports travel-intent optimization rather than generic fandom copy.

## 3. Keep / change recommendation

### Keep
- URL
- current title, unless later GSC shows CTR deterioration
- Albuquerque as the core geographic entity
- map-first CTA
- clear distinction between real business / private residence / public location

### Improve
- meta description: add one or two concrete examples instead of generic `장소`
- H1/H2: absorb actual user intent such as `앨버커키 브레이킹 배드 촬영지`, `지금 방문 가능한 곳`, `사유지 방문 주의`
- opening copy: explain that Albuquerque was both setting and real filming city
- internal links: location detail → Albuquerque/region → nearby filming locations → map
- travel utility: cluster public businesses separately from private residences

## 4. High-confidence location anchors

Strong public / official-tourism-supported anchors:
- Twisters on Isleta Blvd — used as Los Pollos Hermanos; still operating
- Dog House Drive-In — featured in Breaking Bad / Better Call Saul
- Mister Car Wash — A1A Car Wash filming location
- Java Joe's — Tuco headquarters / hideout filming location
- Simms Building — used as DEA office exterior/context
- Albuquerque International Sunport
- The Grove Cafe & Market
- Garduno's
- Isleta Resort and Casino

These are better SEO/internal-link anchors than relying only on private homes because they have clear visitor utility.

## 5. Data-quality findings in current repo

Source reviewed: `site/contentmap_breakingbad_locations.js`.

### A. Car wash address discrepancy — fix required before publishing any rewritten travel copy
Current repo says:
`9560 Snow Heights Cir NE`

Multiple external location references identify the A1A/Mister Car Wash location as:
`9516 Snow Heights Cir NE`

Action: developer/content implementation must verify and correct the source-of-truth address/coordinates together; do not patch generated HTML only.

### B. White Sands claim — insufficient support found
Current repo includes White Sands National Park and states it was used for early-season Breaking Bad desert scenes.

In this research pass, official Visit Albuquerque sources confirmed extensive Albuquerque-area filming and To'hajiilee/desert relevance generally, but did not support White Sands as a Breaking Bad filming location. Treat the current White Sands claim as **unverified** until a reliable production/location source is found.

Action: do not strengthen, feature or SEO-link this claim. Either verify with a high-quality source or remove/downgrade later.

### C. Private-home content
Walter/Jesse/Gus/Hank-Marie homes are useful fan landmarks but are private residences. Travel copy must explicitly discourage trespass, lingering, nuisance behavior or entering property.

## 6. Suggested page structure

1. Hero: `브레이킹 배드 앨버커키 촬영지`
2. Short hook: Albuquerque is not just the setting; it is the real filming city
3. `지금 가볼 수 있는 촬영지` — prioritize operating/public places
4. `팬들이 많이 찾지만 사유지인 곳` — compact caution section
5. `장면으로 기억하는 장소` — scene → real place → map link
6. `앨버커키에서 어떻게 묶어볼까` — map/route CTA, without fabricating drive times until verified
7. related: Better Call Saul / Albuquerque region / other US filming-location works

## 7. Metadata proposal

### Title
Keep current for now:
`브레이킹 배드 앨버커키 촬영지 지도 | 그곳, 지금`

### Description candidate
`브레이킹 배드가 실제로 촬영된 앨버커키의 로스 포요스 에르마노스, A1A 세차장 등 주요 장소를 지도에서 확인하세요. 지금 방문 가능한 곳과 사유지도 구분해 정리합니다.`

Note: before implementation, confirm exact naming/address in source data.

## 8. Internal-link plan

Priority links:
- work page → each verified place page
- place page → `/regions/` Albuquerque/New Mexico node if available
- place page → main map with Breaking Bad deep link
- related-work link to Better Call Saul only if a real site entity/page exists; do not create a dead or speculative link
- same-region nearby film-tourism items only after data verification

## 9. Locale priority

1. KR — immediate, because current GSC evidence is strongest
2. EN — natural fit because the locations are in the US, but only after KR source data is cleaned
3. JP — consider after checking actual query impressions
4. zh-Hant — not a priority until translated page/data readiness is verified

Do not auto-translate unverified travel facts.

## 10. Implementation gate

Do not hand to developer yet. Before implementation:
- verify A1A/Mister Car Wash address and coordinates
- verify or remove White Sands claim
- inspect generator/source path used for work page and place pages
- check whether active Design Phase 1/mobile work is touching the same generator/CSS
- capture pre-change GSC metrics

Once these are complete, this can become a small SEO/data cleanup implementation Issue.
