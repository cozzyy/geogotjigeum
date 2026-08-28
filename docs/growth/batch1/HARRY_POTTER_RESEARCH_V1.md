# Harry Potter SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/harrypotter/`
- impressions: 67
- clicks: 6
- CTR: 9.0%
- avg position: 7.22

Interpretation: this is one of the strongest first-page assets in the site. Avoid title churn. The best opportunity is a trustworthy UK filming-location cluster plus 2026 freshness and internal discovery.

Current title:
`해리 포터 영국 촬영지와 실제 장소 지도 | 그곳, 지금`

Current description:
`해리 포터 시리즈의 영국 촬영지와 작품 속 실제 장소를 지도에서 확인하세요.`

## 2. Primary user intent

1. Which UK places were actually used in the Harry Potter films?
2. Which places merely inspired the films or are fan experiences?
3. Which London/Oxford/Scotland locations can be combined on a trip?
4. Which famous place corresponds to which scene?
5. Which locations require booking or have access limits?

The current data taxonomy is already stronger than most work pages because it distinguishes `FILMED / INSPIRED / COMPOSITE / EXPERIENCE / PRIVATE·RESTRICTED`. Preserve and tighten it.

## 3. Keep / change recommendation

### Keep
- URL
- current title
- UK as the geographic core
- filmed/inspired/experience distinction
- strong map and place discovery

### Improve
- description: add a few high-confidence names such as King's Cross, Oxford and Gloucester/Scottish cluster rather than generic `실제 장소`
- region grouping: London / Oxford / England outside London / Scotland / studio experience
- scene relation: show why each place matters before generic travel text
- 2026 freshness: 25th anniversary of `Harry Potter and the Philosopher's Stone` is a legitimate current hook

## 4. High-confidence anchors

Strong official-tourism / official-venue supported anchors include:
- King's Cross / Platform 9¾ experience
- Leadenhall Market
- Australia House — its interior was used for Gringotts filming
- Christ Church staircase, Oxford — used in Harry Potter filming; Great Hall should be described carefully as inspiration rather than claiming the movie Great Hall was filmed there
- Bodleian Library — Hogwarts library
- Divinity School — Hogwarts hospital wing
- Gloucester Cathedral cloisters
- Warner Bros. Studio Tour London — authentic sets/props, clearly an experience rather than an outdoor filming-location destination

VisitBritain's current Harry Potter filming-location guide supports the travel-intent structure and explicitly highlights 2026 as the 25th anniversary year of the first film.

## 5. Data-quality findings in current repo

Source reviewed: `site/contentmap_harrypotter_locations.js`.

### A. Taxonomy is a strength — preserve it
The source already distinguishes:
- `FILMED`
- `INSPIRED`
- `COMPOSITE`
- `EXPERIENCE`
- `PRIVATE·RESTRICTED`

Do not collapse these into a generic `촬영지` label in cards or SEO copy.

### B. Australia House is currently understated/misclassified
Current repo description says its marble hall was a `model` for Gringotts and tags it `INSPIRED`.

Visit London currently describes Australia House's interior as having been used as a filming location for Gringotts Wizarding Bank.

Action:
- re-verify exact film/scene scope
- likely change from pure `INSPIRED` to `FILMED` or a combined label
- do not overstate public interior access; it is a working diplomatic building

### C. Christ Church wording needs precision
Current repo says the staircase inspired the entrance and that some corridor scenes were filmed.

Christ Church's own visitor information states its Hall Staircase has been used in Harry Potter. The common tourist shorthand that the actual movie Great Hall was filmed in Christ Church's dining hall is misleading; the Studio Tour has the authentic Great Hall set.

Action:
- label the staircase as filmed
- describe Christ Church Hall as an influence/inspiration where relevant
- do not imply the film's Great Hall interior was filmed inside the college dining hall

### D. Visitor-state facts should be time-bounded
Opening, booking and access facts for colleges, cathedrals and Studio Tour change. Keep evergreen guidance (`advance booking often required`, `working college/place of worship`) and link to official place sources rather than hardcoding fragile schedules unless updated regularly.

### E. 2026 anniversary is usable freshness, not a permanent title keyword
Warner Bros. Studio Tour is running `First Year at Hogwarts`, 7 May–7 September 2026, for the first film's 25th anniversary. VisitBritain also frames 2026 as the 25-year milestone.

Action:
- use a small updated/current box or intro note
- do not rewrite the evergreen SEO title around `25주년`
- remove/update the event note after the relevant period

## 6. Suggested page structure

1. Hero: keep current title intent
2. `해리 포터 영국 촬영지는 어디에 모여 있을까?`
3. London cluster — King's Cross / Leadenhall / Australia House / other verified film sites
4. Oxford cluster — Christ Church / Bodleian / Divinity School / New College
5. Scotland & wider Britain — scene-to-place route
6. `실제 촬영 vs 영감 vs 체험` explainer
7. `2026: 첫 영화 25주년` compact freshness box
8. region / place / map links

## 7. Metadata proposal

### Title
Keep current:
`해리 포터 영국 촬영지와 실제 장소 지도 | 그곳, 지금`

### Description candidate
`해리 포터 영화의 영국 촬영지를 킹스크로스, 옥스퍼드, 글로스터 등 지역별로 확인하세요. 실제 촬영지와 영감을 준 장소, 스튜디오 체험을 구분해 지도에서 보여드립니다.`

The current description is acceptable; change only if a controlled CTR test is desired.

## 8. Internal-link plan

Priority:
- work → London / Oxford / Scotland region hubs where real pages exist
- work → verified place detail pages
- place → map deep link and same-region Harry Potter places
- London places → nearby walkable cluster
- Oxford places → one Oxford cluster instead of isolated cards
- Studio Tour → experience node, not misleading `city filming location` node

## 9. Locale priority

1. KR — immediate because the page is already ranking strongly
2. EN — use specific place/region long-tail intent rather than broad `Harry Potter filming locations`
3. JP — strong evergreen fandom potential; verify GSC demand first
4. zh-Hant — later based on query evidence

## 10. Implementation risk

**LOW–MEDIUM.** The overall page/search intent is good and the data model is already nuanced. Main risks are local claim precision and accidentally damaging a page already averaging position ~7.

## 11. Implementation gate

Before developer handoff:
- verify/reclassify Australia House
- tighten Christ Church wording
- confirm no design/mobile generator collision
- identify generator/source-of-truth
- capture pre-change GSC metrics
- implement metadata changes only if they add clear value; title stays untouched

## 12. Research sources

Primary/strong sources used:
- VisitBritain, `Visit Harry Potter filming locations` — UK location/travel cluster and 2026 25th anniversary context
- Christ Church, University of Oxford, official visitor page — Hall Staircase usage
- Visit London — Australia House / Gringotts filming reference
- Warner Bros. Studio Tour London — `First Year at Hogwarts`, 7 May–7 September 2026 and authentic set context
