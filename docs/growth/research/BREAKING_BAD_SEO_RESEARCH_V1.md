# Breaking Bad SEO Research v1

Status: RESEARCH COMPLETE — implementation should wait for active design/mobile collision check.

## Why this page matters

Search Console baseline (2026-08-25 export):
- page impressions: 135
- clicks: 5
- CTR: 3.7%
- average position: 10.13
- query `앨버커키 브레이킹 배드`: average position 8.90

This is a page-one-boundary winner. Preserve what already works and remove trust-breaking inaccuracies.

## Current page snapshot

Current title/H1:
`브레이킹 배드 앨버커키 촬영지 지도 | 그곳, 지금`

Current page already has strong direct-location inventory: Walter White house, Jesse house, Twisters/Los Pollos Hermanos, A1A car wash, Java Joe's, superlab entrance, Saul office, To'hajiilee and other Albuquerque locations.

## Recommendation summary

### KEEP
- URL `/works/breakingbad/`
- core title/H1 phrase `브레이킹 배드 앨버커키 촬영지 지도`
- map-first CTA
- 13-location direct-location inventory
- Twisters / Java Joe's / car-wash hooks
- Albuquerque as the primary geographic entity

### CHANGE — P0 factual/trust
1. **Remove or replace the White Sands National Park hero claim.**
   - The page currently labels White Sands as an actual early-season desert filming location.
   - NPS's commercial-filming history lists many productions but does not list Breaking Bad.
   - Visit Albuquerque consistently anchors Breaking Bad filming in Albuquerque and To'hajiilee.
   - Unless a primary production source is found, White Sands must not be labeled a verified Breaking Bad filming location.
   - Replace hero with a verified Albuquerque / Route 66 / Sandia / Twisters / other rights-safe location image.

2. **Update the A1A car-wash present-day identity.**
   - Visit Albuquerque lists the filming location as Mister Car Wash.
   - Copy should say `A1A Car Wash filming location — now Mister Car Wash` rather than only `former Octopus Car Wash` or vague `still operating` language.

3. **Private-residence etiquette must be explicit.**
   - Walter White house and Jesse house are private residences.
   - Add a visible note: exterior/public-road viewing only; no entry, driveway use or disturbance.
   - Avoid copy that encourages close-up “pilgrimage” behavior.

### CHANGE — P1 search intent / UX
4. **Do not radically change the title.** It already matches the high-intent query and sits around position 10.

5. Improve the meta description to name the strongest entities, e.g.:
   `월터 화이트의 집, Twisters(로스 포요스), Mister Car Wash, Java Joe's 등 브레이킹 배드 앨버커키 실제 촬영지 13곳을 지도에서 확인하세요.`

6. Move location discovery earlier in the reading flow.
   - The current long recap delays the searcher's main intent: actual places.
   - Keep the friend-like hook, but shorten plot recap materially and surface `대표 촬영지 TOP5` sooner.
   - Recommended pattern: 4–6 short hook paragraphs → TOP5 → optional deeper story.

7. Add a compact `지금 가면 어떤 곳?` status line per top location:
   - active business
   - private exterior only
   - public/visitor-friendly
   - remote/visit caution

### CHANGE — P2 internal links
8. Strengthen geography-based internal discovery:
   - Work → Albuquerque map filtered to Breaking Bad
   - Work → related United States / New Mexico region page if current generated route exists
   - Work → `Stranger Things` where the site has an Albuquerque filming-location connection (only if the target page's data confirms it)
   - Place cards → same-region other works

Do not create fake related-work links just for SEO.

## Verified external evidence

Primary/official-first sources:
- Visit Albuquerque — Breaking Bad filming locations: https://www.visitalbuquerque.org/about-abq/film-tourism/breaking-bad/
- Visit Albuquerque — locations you can visit (Twisters, Java Joe's, Mister Car Wash): https://www.visitalbuquerque.org/abq365/blog/post/breaking-bad-filming-locations-you-can-visit/
- Visit Albuquerque — 2026 set-jetting guide: https://www.visitalbuquerque.org/abq365/blog/post/set-jetting-in-albuquerque-discover-local-filming-locations/
- NPS White Sands commercial-filming history: https://home.nps.gov/whsa/learn/historyculture/commercial-filming.htm

Useful secondary confirmation:
- IMDb filming locations: https://www.imdb.com/title/tt0903747/locations/

## Implementation guardrails

- Preserve canonical/hreflang/structured data and URL.
- Do not change shared design CSS while Issue #30 / Phase 1 work is active without collision check.
- If page is generator-produced, edit source/generator rather than generated HTML.
- Record before metrics before deploy, then compare at ~14d/~28d.

## Decision

**SEO action: OPTIMIZE, not rewrite-from-scratch.**

The title and core intent are already working. Highest-value change is factual cleanup + earlier place utility + richer current-place information + internal links.