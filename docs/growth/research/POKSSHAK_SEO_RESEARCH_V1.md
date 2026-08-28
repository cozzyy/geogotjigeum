# 폭싹 속았수다 SEO Research v1

Status: RESEARCH COMPLETE — implementation after collision check.

## Why this page matters

Search Console baseline (2026-08-25 export):
- page impressions: 94
- clicks: 8
- CTR: 8.5%
- average position: 14.71

The page has healthy click response but still sits outside page one on average. Its biggest opportunity is **trustworthy filming-location classification + stronger nationwide travel utility**.

## Current page snapshot

Current title/H1:
`폭싹 속았수다 제주 촬영지 실제 위치와 가는 법`

Current page mixes:
- verified Jeju filming locations
- non-Jeju filming locations such as Gochang
- purpose-built set / fictional-place stories
- nearby recommended Jeju attractions

The title says `제주 촬영지`, while some of the strongest iconic scenes were filmed outside Jeju. This is usable if the page clearly says `제주 중심 + 전국 촬영지`, but the current card taxonomy does not make that distinction well.

## Recommendation summary

### KEEP
- URL `/works/poksshak/`
- current strong hook around `제주 촬영지 실제 위치와 가는 법`
- four-language routing including zh-Hant
- Jeju as the main travel identity
- map-first CTA
- Gochang surprise/reversal story because it is both memorable and travel-relevant

### CHANGE — P0 factual/trust

1. **Do not label nearby recommended attractions as direct filming locations.**
   - Visit Jeju's official `폭싹 속았수다와 함께 하는 제주 여행` page identifies **Seongsan Ilchulbong** and **Jeju Mokgwana** as filming locations.
   - On the same official page, **Seopjikoji** is listed under `추천관광지` near the Seongsan filming area, not as the filming location itself.
   - Current TOP5 labels `섭지코지` as `직접`; this should be removed or reclassified unless a separate authoritative source confirms a scene filmed there.

2. **Re-verify Hyeopjae Beach before retaining `직접`.**
   - The official Jeju sources reviewed in this audit clearly support Seongsan, Jeju Mokgwana, Ora buckwheat field and other thematic locations, but did not establish Hyeopjae as a direct filming location.
   - If no strong source is found at implementation time, downgrade/remove it from TOP5 rather than infer from visual similarity or tourism lists.

3. **Use stronger verified locations in TOP5.**
   Strong official evidence exists for:
   - Seongsan Ilchulbong — Visit Jeju
   - Jeju Mokgwana — Visit Jeju; episode/location context is provided
   - Ora-dong buckwheat field — Visit Jeju identifies it as a drama filming location
   - Gochang Hagwon Farm canola field — Korea Tourism Organization explicitly identifies it as the field where Ae-sun and Gwan-sik's youthful romance was filmed
   - Gasilsungdang Church, Chilgok — Korea Tourism Organization identifies it as Geum-myeong's wedding scene filming location

A Jeju-only TOP5 can be used only if each location is separately verified; otherwise use a nationwide `대표 촬영지 TOP5` and a separate `제주에서 따라가기` list.

### CHANGE — P0 evidence classes

4. Introduce visible categories:
- `실제 촬영지`
- `세트/재현 촬영지`
- `가상 지명/설정`
- `주변 추천 여행지`

Do not use one generic `직접` badge for all relationships.

5. The official Visit Jeju page explicitly notes that the drama's old-Jeju village appearance was filmed on a set **outside Jeju**, while recommending real Jeju folk sites for a similar atmosphere. This is exactly the distinction the site should preserve rather than collapse.

### CHANGE — P1 title/meta direction

6. The current title has good intent and should not be radically rewritten before more GSC query detail is collected.

Recommended conservative title direction:
`폭싹 속았수다 촬영지 지도 | 제주·고창 실제 위치와 가는 법 | 그곳, 지금`

Alternative if preserving current winning phrase is preferred:
`폭싹 속았수다 제주 촬영지 실제 위치와 가는 법 | 고창·전국 촬영지 포함`

Recommended meta direction:
`성산일출봉·제주목관아·오라 메밀꽃밭부터 고창 학원농장까지, 폭싹 속았수다의 실제 촬영지와 주변 추천 여행지를 구분해 지도에서 확인하세요.`

Keep URL unchanged.

### CHANGE — P1 reading flow

7. Reduce long plot recap before location utility.

Recommended order:
1. 3–5 short emotional hook paragraphs
2. `제주인 줄 알았는데 고창이었다` reversal
3. verified filming-location TOP5
4. `제주에서 실제로 갈 곳` route
5. `제주가 아닌 촬영지` section
6. set/fictional-place story
7. optional deeper story/spoiler content

8. Remove or separately verify tangential/current claims that do not help location discovery, such as ranking/review claims or OST popularity claims. They add maintenance burden and little location-search value.

### CHANGE — P1 travel utility

9. Add practical `지금 가면` information using official tourism sources where stable:
- address/region
- outdoor/indoor
- seasonal landscape note
- filming vs nearby recommendation status
- official tourism link where appropriate

Avoid copying changing opening times directly unless needed; link to current official details.

### P2 internal discovery

Potential links, only where actual routes/data exist:
- 폭싹 → Jeju region
- 폭싹 → Gochang / Jeonbuk region
- Gochang Hagwon Farm → other works filmed at the same farm where verified
- Jeju Mokgwana / Seongsan → same-place or same-region works
- filming place → nearby travel recommendations, clearly labeled as nearby rather than filming

## Verified external evidence

Official tourism sources:
- Visit Jeju — filming locations include Jeju Mokgwana and Seongsan Ilchulbong: https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_300000000013454
- Visit Jeju — detailed `폭싹 속았수다와 함께 하는 제주 여행`; Seopjikoji is a nearby recommended attraction, not labeled as the filming spot in that section: https://www.visitjeju.net/kr/themtour/view?contentsid=CNTS_300000000013461
- Visit Jeju — Ora buckwheat field festival based on its status as a drama filming location: https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_300000000013805
- Korea Tourism Organization — Gochang Hagwon Farm canola field is a filming location: https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=7f32a56b-2526-4bd4-acfb-991e6d51f9a2
- Korea Tourism Organization — Gasilsungdang Church is identified as the wedding-scene filming location in current travel content.

## Claims needing verification before implementation

- Hyeopjae Beach as direct filming location
- Seopjikoji as direct filming location — current official Jeju source instead treats it as nearby recommended tourism
- exact Andong set location/details and whether it is visitable today
- any `highest-rated K-drama` style ranking statement
- OST popularity claims unless retained for a specific content reason

## Implementation guardrails

- Preserve URL/canonical/hreflang/structured data and 4-language routing.
- Do not turn `nearby recommendation` into `filming location` for SEO volume.
- Update source/generator, not only generated HTML.
- Coordinate with Issue #30/mobile and shared design work before implementation.
- Record before GSC metrics and compare at ~14d/~28d.

## Decision

**SEO action: VERIFY + RECLASSIFY + EXPAND TRAVEL UTILITY.**

The page already earns clicks. The biggest improvement is making the difference between `actual filming location`, `set`, `fictional place` and `nearby trip recommendation` unmistakable, then using verified Jeju + nationwide locations to deepen travel discovery.