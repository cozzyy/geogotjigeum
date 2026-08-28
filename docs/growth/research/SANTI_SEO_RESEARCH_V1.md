# 삼체 (santi) SEO Research v1

Status: RESEARCH COMPLETE — implementation after collision check.

## Why this page matters

Search Console baseline (2026-08-25 export):
- page impressions: 57
- clicks: 3
- CTR: 5.3%
- average position: 8.72

This is already a first-page candidate. The main risk is not lack of volume but **content identity confusion**.

## Current identity problem

Current title/H1:
`삼체 촬영지와 실제 배경 지도`

But the body is primarily based on Liu Cixin's novel trilogy and mixes:
- fictional/novel settings
- real scientific facilities
- astronomical objects
- historical analogies
- possible inspiration candidates
- screen adaptation elements

The page currently labels many entries simply `직접`, even when they are not filming locations.

Examples requiring reclassification:
- Miyun Observatory: described as a possible real-world inspiration candidate for Red Coast, not a verified filming location
- FAST telescope: scientific analogy/real SETI-related facility, not a filming location
- Arecibo Observatory: historical/scientific parallel to interstellar messaging, not a filming location
- Alpha Centauri: astronomical reference, not a travel filming location

This weakens trust when the searcher's query is `삼체 촬영지`.

## Recommendation summary

### P0 — preserve ranking title intent but make the page honest

Do not remove `삼체 촬영지` from the title while the page ranks around position 8.7.

Recommended title direction:
`삼체 촬영지와 실제 과학 배경 지도 | 넷플릭스·류츠신 원작 | 그곳, 지금`

Recommended meta direction:
`넷플릭스 3 Body Problem의 확인된 촬영 정보와 류츠신 《삼체》의 실제 과학·지명 배경을 구분해 지도에서 확인하세요.`

Keep URL `/works/santi/`.

### P0 — split the content into evidence classes

Use explicit categories, visible on cards and in section headings:
1. `영상화 공식 촬영지`
2. `원작 속 실존 지명`
3. `실제 과학·천문 장소`
4. `비교/영감 후보 — 공식 확인 없음`

Do not use one generic `직접` badge for all four.

### P0 — downgrade unsupported inspiration claims

Current copy says Miyun Observatory is one of the real facilities often cited as inspiration for Red Coast.

Unless a primary interview/source from Liu Cixin, publisher, or production confirms this, rewrite as:
`레드코스트 설정을 떠올리게 하는 동시대 중국의 실존 전파관측 시설`

This preserves the interesting connection without claiming authorship evidence that is not established.

The same rule applies to Xinglong Observatory and other `있을 법한 실제 이미지` entries.

### P1 — add real screen-adaptation filming information

Netflix official material confirms:
- Season 1 story spans 1960s China, present-day Oxford/London and New York settings.
- Netflix Tudum states Ye Wenjie's final cliff scene was filmed at an old military base in Spain.
- Season 2 production began in Budapest, Hungary in November 2025.

These are genuine production facts and should be separated from novel/science locations.

Do not assume that a story setting is a filming location unless production evidence exists.

### P1 — reduce the current 45-place ambiguity

The current `전체 장소 목록 (45곳)` is impressive in volume but conceptually mixed.

Recommended UI/content treatment:
- Keep the full database if valuable.
- Change heading to `삼체의 장소·과학 배경 45곳` or equivalent.
- Filter/chips: `촬영지 / 소설 속 지명 / 천문·과학 / 비교 후보`.
- TOP5 should contain only the strongest, clearest, high-confidence entries. Avoid calling scientific analogues `대표 촬영지 TOP5`.

### P1 — story/content scope

The long trilogy recap contains major spoilers and delays location intent.

Recommended structure:
1. 4–6 short hook paragraphs
2. `넷플릭스에서 실제로 찍은 곳`
3. `소설 속 실제 지명`
4. `진짜 과학으로 이어지는 장소`
5. optional deeper spoiler story section

Clearly label spoilers before the deep trilogy recap.

### P2 — current-event freshness opportunity

Season 2 production is underway in Budapest as of Netflix's Nov. 26, 2025 production announcement. This gives the page a current update hook without rewriting the entire article.

Add a small `2026 업데이트` block only when facts can be sourced and dated.

## Verified sources

Netflix Tudum:
- Series overview / settings: https://www.netflix.com/tudum/articles/3-body-problem-teaser-release-date
- Season 2 production in Budapest: https://www.netflix.com/tudum/articles/3-body-problem-renewed
- Ye Wenjie Episode 7 filming at an old military base in Spain: https://www.netflix.com/tudum/articles/3-body-problem-episode-7-recap
- Science explainer: https://www.netflix.com/tudum/articles/3-body-problem-science-explained-burning-questions

## Implementation guardrails

- Preserve URL/canonical/hreflang and current first-page search equity.
- Do not relabel story setting as filming location.
- Do not relabel scientific analogy as author-confirmed inspiration without source.
- If changing card categories requires data-model migration, stop and use `NEEDS DECISION`; otherwise implement via existing badge/text fields.
- Coordinate with shared generator/design/mobile work before touching page source.
- Measure before/after at ~14d/~28d.

## Decision

**SEO action: CLARIFY + RECLASSIFY, not expand blindly.**

This page's opportunity is to become a trustworthy guide that clearly separates `촬영지`, `원작 속 실제 지명`, and `실제 과학`. That is more valuable than simply increasing the location count.