# 미스터 션샤인 SEO Research v1

Date: 2026-08-28
Parent: Content Growth Engine #31
Status: RESEARCH COMPLETE — TRUST CLEANUP REQUIRED BEFORE DEV

## 1. Search opportunity

GSC baseline:
- page: `/works/sunshine/`
- impressions: 57
- clicks: 3
- avg position: 9.54

This is already at the first-page boundary, so the opportunity is not a broad rewrite. The urgent problem is semantic trust: the current page title says filming locations, while the page's highest-ranked entries are largely historical story-context places rather than verified filming locations.

Current title:
`미스터 션샤인 촬영지 서울 경복궁·덕수궁 실제 위치 | 그곳, 지금`

Current description:
`미스터 션샤인의 촬영지 서울 경복궁, 덕수궁 등 대한제국 시기 실제 역사 장소와 가는 법을 지도에서 확인하세요.`

## 2. Critical finding

The current generated page's TOP5 begins with:
- 한성 (현재 서울)
- 광화문
- 근정전
- 경회루
- 건청궁

All are labeled `공식·직접` under `대표 촬영지 TOP5`.

But the accompanying descriptions themselves describe these as the real historical setting/context of the story, not as verified filming sites. For example, Gyeonghoeru is described as a symbolic place that could have been used for imperial diplomacy, and Geoncheonggung is explained as the historical site of the Eulmi Incident.

This is a category error: **historical setting ≠ filming location**.

## 3. Verified filming/travel anchors

Strong sources support these actual filming-related places:
- 함양 일두고택 — Korea Tourism Organization / Korea Quality describes it as Go Ae-shin's home filming location.
- 안동 만휴정 — public tourism audio guide explicitly connects it to the famous Eugene/Ae-shin confession scene.
- 합천영상테마파크 — Korea Tourism Organization and multiple public sources identify it as a Mr. Sunshine filming site.
- 논산 션샤인스튜디오 — Chungcheongnam-do public tourism content identifies it as a Mr. Sunshine filming location and visitor experience.

These should form the filming-location core. Historical Seoul/Daehan Empire places can remain, but in a separate `HISTORICAL CONTEXT / STORY SETTING` layer.

## 4. Keep / change recommendation

### Keep
- URL
- the work's strong association with travel and modern-history context
- rich historical layer as a differentiator
- map exploration

### Change
- title/description: stop calling Gyeongbokgung/Deoksugung verified filming locations unless independently supported scene-by-scene
- TOP5: actual filming destinations should outrank historical-context nodes when the heading says filming locations
- data labels: separate `FILMED / SET-STUDIO / STORY-HISTORICAL / RELATED HISTORY / EXPERIENCE`
- do not label a city or historical event node `공식·직접`

## 5. Proposed content structure

1. `미스터 션샤인 실제 촬영지는 어디일까?`
2. verified visitor-facing filming locations — Nonsan / Hamyang / Andong / Hapcheon
3. `드라마의 시대를 실제로 걸어보는 서울` — Gyeongbokgung / Deoksugung etc as historical context, not filming
4. scene → filmed place cards
5. historical event context only where it improves understanding
6. regional routes and map

## 6. Metadata direction

Current metadata should be changed because it explicitly conflates filming with historical locations.

Candidate title:
`미스터 션샤인 촬영지 논산·함양·안동 실제 장소 지도 | 그곳, 지금`

Candidate description:
`미스터 션샤인의 실제 촬영지 논산 션샤인스튜디오, 함양 일두고택, 안동 만휴정 등을 지도에서 확인하세요. 서울의 대한제국 역사 장소는 촬영지가 아닌 이야기 배경으로 구분해 소개합니다.`

Do not publish until the canonical source/taxonomy cleanup is ready.

## 7. Internal-link plan

- work → verified filming-place detail
- filming place → region hub
- historical context → Seoul/Daehan Empire context content, not filming badge
- same region → nearby K-content places only when the place entity is real
- map deep link filtered by work and type where supported

## 8. Locale priority

1. KR — immediate due to avg position 9.54 and trust issue
2. EN — strong global K-drama/travel potential after taxonomy cleanup
3. JP — evaluate query evidence
4. zh-Hant — later

## 9. Risk

**VERY HIGH TRUST RISK.** The page is close to page one, but the current metadata/TOP5 can mislead users about what was actually filmed where.

## 10. Implementation gate

Before dev:
- trace canonical location data source, not generated HTML only
- classify all 102 entries
- create separate filming vs historical/context layers
- preserve historical content but remove false `공식·직접` labels
- same-day collision check with Design Phase 1/shared generator
- capture pre-change GSC baseline

## 11. Strong sources used

- Korea Tourism Organization / Korea Quality — Hamyang Ildu Historic House and Mr. Sunshine
- ODII tourism guide — Andong Manhyujeong and the drama scene
- Korea Tourism Organization — Hapcheon Image Theme Park as filming site
- Chungcheongnam-do public tourism content — Nonsan Sunshine Studio
