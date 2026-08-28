# Batch 1 SEO Readiness Matrix v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION AFTER COLLISION CHECK

## 1. Executive decision

Batch 1의 6개 페이지는 모두 검색 성장 가능성이 있으나, 같은 방식으로 고치면 안 된다.

핵심 원칙:
- 이미 1페이지에 있는 페이지는 title을 지킨다.
- 실제 촬영지 / 설정 / 영감 / 팬 체험 / 추천 여행지를 섞지 않는다.
- 데이터 정확성 문제가 있는 페이지는 SEO 문구보다 데이터 정리가 먼저다.
- 구현 전 Issue #30/#28 및 공통 generator/source 충돌을 확인한다.

## 2. Final matrix

| Work | GSC baseline | Title decision | Main action | Data risk | Locale priority | Dev readiness |
|---|---|---|---|---|---|---|
| Breaking Bad | 135 imp / 5 clk / pos 10.13 | **KEEP** | verified Albuquerque places + address/status cleanup + internal links | MEDIUM | KR → EN | READY AFTER 2 FACT CHECKS + COLLISION CHECK |
| ONE PIECE | 98 / 4 / 13.81 | **REVIEW / LIKELY REFRAME** | split FILMED / OFFICIAL EXPERIENCE / FICTIONAL / UNVERIFIED; remove weak location claims | HIGH | KR → JP → EN | NOT YET — taxonomy/query check first |
| 삼체 | 57 / 3 / 8.72 | **REFRAME CANDIDATE** | remove filming-location mismatch; split novel setting / science / speculation / adaptation | VERY HIGH | KR → zh-Hant → EN | NOT YET — GSC query + taxonomy decision first |
| Stranger Things | 61 / 6 / 7.97 | **KEEP** | urgent stale/wrong location cleanup + Season 5 freshness + place status | HIGH | KR → EN | READY AFTER DATA CLEANUP PLAN + COLLISION CHECK |
| Harry Potter | 67 / 6 / 7.22 | **KEEP** | light claim precision + regional clusters + 2026 anniversary freshness | LOW–MEDIUM | KR → EN/JP by query evidence | MOST READY — collision check only after 2 claim verifications |
| 폭싹 속았수다 | 94 / 8 / 14.71 | **KEEP DIRECTION** | audit `직접` badges; replace weak meta examples; strengthen episode-linked Jeju places + quiz→map funnel | MEDIUM–HIGH | KR → JP → zh-Hant | READY AFTER SOURCE/GENERATOR AUDIT + LABEL CLEANUP |

## 3. Work-by-work final decision

### Breaking Bad
**KEEP TITLE / DATA CLEANUP / CONTENT ENRICH / INTERNAL LINKING**

Do first:
- verify/correct A1A/Mister Car Wash address and coordinates
- verify or remove/downgrade White Sands filming claim
- feature strong public visitor anchors such as Twisters/Los Pollos and other verified Albuquerque places

Do not:
- rewrite the title for keyword novelty
- turn private homes into tourism calls-to-action without warnings

### ONE PIECE
**POSITIONING REFRAME / TAXONOMY CLEANUP / FRESHNESS UPDATE**

Do first:
- update Season 3 status from filming-in-progress to wrapped
- remove/downgrade Canary Islands unless verified
- stop treating Cape Town studio sets, Kumamoto statues, USJ and fictional map items as one location type
- group multiple set-scenes under the physical Cape Town Film Studios node

Decision still needed at implementation brief stage:
- whether title should emphasize live-action filming or broader real-world ONE PIECE places, based on actual GSC query mix

### 삼체
**TITLE+META REFRAME CANDIDATE / TRUST TAXONOMY CLEANUP**

Do first:
- inspect GSC query intent before changing title
- separate `NOVEL SETTING / SCIENCE PARALLEL / UNCONFIRMED / FICTIONAL / NETFLIX ADAPTATION`
- remove `촬영지` claim unless the page actually contains verified adaptation filming locations

This has the highest semantic trust mismatch in Batch 1.

### Stranger Things
**KEEP TITLE / URGENT DATA CLEANUP / CURRENT-STATUS UPDATE**

Do first:
- Patrick Henry High School: mark demolished/historical, not active school
- Lenora Hills: remove Fayetteville, Georgia claim; Netflix says the California house was filmed in New Mexico
- Kamchatka/Russia: remove Atlanta-set claim; Netflix confirms prison scenes in Vilnius, Lithuania
- Hawkins Lab: identify Emory Briarcliff Building A
- Creel House: identify Claremont House, Rome, with private-property warning
- distinguish historical studio use from Season 5 Cinespace MAC-Z backlot

Do not:
- change the current first-page title

### Harry Potter
**KEEP TITLE / LIGHT DATA PRECISION / REGION CLUSTER / 2026 FRESHNESS**

Do first:
- reclassify Australia House after final verification; current `INSPIRED` wording likely understates actual filming use
- make Christ Church distinction precise: staircase filmed; Hall inspiration/context; authentic Great Hall set is at the Studio Tour
- add compact 2026 25th-anniversary freshness without putting a temporary event into evergreen title

This is the safest Batch 1 page for a small SEO/content PR after collision check.

### 폭싹 속았수다
**KEEP TITLE DIRECTION / META EXAMPLE UPDATE / PLACE-LABEL AUDIT / FUNNEL TEST**

Do first:
- locate canonical map/place generator/source
- audit every `직접` badge
- correct traditional-village claim: Visit Jeju says those nostalgic village scenes were filmed on a set outside Jeju; Jeju Stone Park/Seongeup Folk Village are recommended atmosphere experiences
- prefer official episode-linked anchors such as Seongsan Ilchulbong, Gimnyeong, Hallim Port, Geumnung Port, Songaksan
- reconsider Hyeopjae/Saebyeol in the meta unless separately verified
- connect quiz result cards only to verified places

This page is the best conversion experiment after trust cleanup.

## 4. Proposed implementation batches

Do not send all six pages as one giant development task.

### Implementation A — low-risk first
1. Harry Potter
2. Breaking Bad

Purpose:
- claim precision
- small data corrections
- internal links
- metadata description only where justified

### Implementation B — factual cleanup with stable titles
3. Stranger Things
4. 폭싹 속았수다

Purpose:
- clean incorrect/current-status data
- preserve title intent
- improve visitor trust and map/funnel links

### Implementation C — semantic restructuring
5. ONE PIECE
6. 삼체

Purpose:
- taxonomy/content identity cleanup
- GSC query-intent check before title/meta decisions
- possible future product/data-model implications

Implementation C should not start until A/B prove the workflow and the taxonomy can be handled without changing URL/SEO architecture.

## 5. Common implementation checklist

Before any code/content PR:
- latest main
- active #30/#28 collision check
- canonical generator/source located
- pre-change title/meta/H1/H2 recorded
- GSC baseline recorded
- factual corrections linked to reliable sources
- no manual-only edit of generated HTML
- preserve URL/canonical/hreflang/structured data/GA4
- mobile 360/390/430 inherits Issue #30 rules
- no unsupported opening hours, drive times or public-access claims

After deployment:
- 14-day GSC comparison
- 28-day GSC comparison
- impressions / clicks / CTR / avg position / target query
- map/place/quiz conversion where events exist

## 6. Developer handoff status

**NOT YET.**

Research for all six is complete. Next step is an implementation collision/source audit against active design/mobile work. After that, create small developer Issues by implementation batch, beginning with Harry Potter + Breaking Bad unless the collision audit says otherwise.

No new broad UI redesign is part of this growth task.
