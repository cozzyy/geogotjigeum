# 더 글로리 SEO Research v1

Date: 2026-08-28
Parent: Content Growth Engine #31
Status: RESEARCH COMPLETE — LIGHT SEO + LABEL CLEANUP

## 1. Search opportunity

GSC baseline:
- page: `/works/glory/`
- impressions: 80
- clicks: 3
- avg position: 13.80

Current title:
`더 글로리 촬영지 청주 중앙공원·용화사 실제 위치 | 그곳, 지금`

Current description:
`더 글로리의 실제 촬영지 청주 중앙공원, 용화사 등 실제 위치와 가는 법을 지도에서 확인하세요.`

The current title is materially better aligned than the older Incheon/Paju wording and is supported by Cheongju Film Commission. Preserve it.

## 2. Verified anchors

### 청주 중앙공원 / 용화사
Cheongju Film Commission officially lists `더 글로리` as a supported production and states that it filmed at Cheongju Jungang Park and Yonghwasa.

### 청라호수공원
Incheon City and Incheon tourism material identify Cheongna Lake Park as an actual The Glory filming location, including the baduk-park scenes.

### 소돌방파제
Gangneung's 2026 K-content tourism campaign identifies Sodol Breakwater as a The Glory filming destination.

These four anchors are strong enough for the public-facing travel core.

## 3. Current repo findings

The current page lists eight places. The main issue is not the title; it is inconsistent taxonomy.

### A. `가상 도시 세명시` is labeled `직접` — fix required
The description correctly says Semyeong is fictional and not officially modeled on Cheongju. A fictional city cannot carry the same `직접` filming label as a real shooting location.

Action: classify as `FICTIONAL SETTING` and remove from filming-location TOP candidates.

### B. `성안길·청주 원도심` is labeled `체험시설`
The page itself says it is not a specific drama scene but a nearby walking/travel connector. `체험시설` is misleading.

Action: classify as `NEARBY / ROUTE` or `TRAVEL CONNECTOR`.

### C. 세종시 반곡동 is labeled `체험시설` while described as an unconfirmed filming area
This mixes uncertainty with a visitor category.

Action: unless a reliable source verifies the actual location/scene, downgrade to `UNVERIFIED / DO NOT PROMOTE` or remove from the core list.

### D. 종로3가 기원 거리 claim needs stronger sourcing
It may be valid, but current public official sources used in this pass do not establish it. Keep out of title/meta and TOP5 until verified.

## 4. Keep / change recommendation

### Keep
- current title
- current description direction
- Cheongju as the SEO lead
- Cheongna and Gangneung as secondary verified travel nodes

### Improve
- taxonomy: `FILMED / FICTIONAL / NEARBY / UNVERIFIED`
- TOP5 should contain verified real filming places only
- add region cluster links: Cheongju / Incheon / Gangneung
- scene-to-place descriptions using official sources

## 5. Suggested structure

1. Hero: current Cheongju filming intent
2. `공식 확인된 촬영지`
3. Cheongju cluster — Jungang Park + Yonghwasa
4. Incheon cluster — Cheongna Lake Park
5. Gangneung — Sodol Breakwater
6. `세명시는 실제 도시일까?` — fictional-setting clarification
7. nearby routes separated from filming locations
8. map / related works

## 6. Metadata

Title: **KEEP**.

Description: current version is acceptable. Optional controlled improvement:
`더 글로리의 실제 촬영지 청주 중앙공원·용화사, 인천 청라호수공원과 강릉 소돌방파제를 장면별로 확인하세요. 가상 도시 세명시는 실제 촬영지와 구분해 지도에서 소개합니다.`

Do not change title and description simultaneously if measuring CTR impact.

## 7. Locale priority

1. KR
2. EN — after verified-place labels are cleaned
3. JP
4. zh-Hant

## 8. Risk

**MEDIUM.** Search intent/title are now good. The main risk is trust dilution caused by fictional/nearby/unverified entries sharing filming labels.

## 9. Implementation gate

- trace canonical source/generator
- clean labels before adding more locations
- verify any non-official TOP5 candidate
- preserve URL/title/canonical/hreflang
- collision check with current Design Phase 1 work

## 10. Strong sources used

- Cheongju Film Commission — filming at Jungang Park and Yonghwasa
- Incheon Metropolitan City / Incheon Tour — Cheongna Lake Park filming and tourism activation
- Gangneung city coverage / Yonhap 2026 — Sodol Breakwater as The Glory filming location
