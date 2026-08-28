# 삼체 / 3 Body Problem SEO Research v1

Date: 2026-08-28
Parent: Issue #32
Status: RESEARCH COMPLETE — IMPLEMENTATION NOT YET AUTHORIZED

## 1. Search opportunity

Current GSC baseline from `docs/seo/seo-growth-adsense-plan-v1.0.md`:
- page: `/works/santi/`
- impressions: 57
- clicks: 3
- CTR: 5.3%
- avg position: 8.72

Current title:
`삼체 촬영지와 실제 배경 지도 | 그곳, 지금`

Current description:
`삼체에 등장하는 실제 촬영지와 배경 장소를 지도에서 확인하세요.`

## 2. Critical mismatch

The current work page is framed as a **filming-location page**, but the underlying `site/contentmap_santi_locations.js` explicitly says it is based mainly on **Liu Cixin's original novel trilogy**, not the Netflix adaptation.

The data mixes:
- novel settings
- real science/astronomy locations used as conceptual parallels
- unconfirmed possible inspirations
- fictional/space locations

This is a trust and SEO mismatch. A user who searches for `삼체 촬영지` can reasonably expect Netflix/TV filming locations, while the current map is largely a literary/science-location experience.

## 3. Primary-source findings

Netflix official/Tudum material confirms the adaptation spans:
- 1960s Cultural Revolution China
- present-day Oxford, England
- the United Nations in New York

For current production freshness:
- Season 2 officially began production in Budapest, Hungary in November 2025.
- Netflix renewed the adaptation through seasons 2 and 3.

These facts support a separate adaptation/production layer, but they do **not** automatically validate the current novel-based places as filming locations.

## 4. Recommended product/editorial decision

There are two coherent paths.

### Preferred Phase 1 path — keep one page but tell the truth
Reframe the page as:
`삼체 실제 배경·과학 장소 지도`

Structure the data into explicit categories:
- NOVEL SETTING — real places used as story setting/context
- SCIENCE PARALLEL — real observatories/science sites related to the ideas
- POSSIBLE INSPIRATION — unconfirmed; visually downgraded
- FICTIONAL / SPACE — separate non-travel layer
- NETFLIX ADAPTATION — only verified production/location facts

This preserves the valuable science/location concept without pretending the page is a conventional filming-location guide.

### Later path — split into two pages/content modes
1. `삼체 원작 실제 배경·과학 장소`
2. `Netflix 3 Body Problem 촬영지`

Do this only if Search Console shows enough separate demand and the URL/SEO architecture can be changed deliberately.

## 5. Data-quality findings in current repo

Source reviewed: `site/contentmap_santi_locations.js`.

### A. Tsinghua Affiliated High School narrative needs caution
The file presents the school as the site of the opening Cultural Revolution tragedy in the novel. This is a fictional literary event associated with a real operating school.

Action: keep a clear fiction disclaimer and avoid wording that can be read as a historical claim about that exact campus.

### B. Miyun Observatory is labeled a possible Red Coast model
Current copy says it is often cited as a possible real-world inspiration for Red Coast.

This research pass did not establish a strong primary source for that inspiration claim.

Action: treat as `UNCONFIRMED / contextual science location`, not factual inspiration, until a reliable source is found.

### C. Xinglong Observatory is contextual rather than story-linked
The current description openly says it is useful for imagining a plausible facility.

Action: classify as science/context, not story setting or filming location.

### D. FAST and Arecibo are real science parallels
These are useful for a science-explainer experience, but they are not places where the novel/series is necessarily set or filmed.

Action: keep only if the page's identity is broadened to `배경·과학 장소`; otherwise they create intent drift.

### E. Current title/description should not say `촬영지` unless adaptation locations are actually represented and verified
This is the highest-priority correction.

## 6. SEO direction

Because the page already ranks around avg position 8.72, do not make a radical URL change now.

Recommended metadata direction after GSC query check:

### Safer title candidate
`삼체 실제 배경과 과학 장소 지도 | 그곳, 지금`

### Description candidate
`류츠신의 『삼체』에 등장하거나 작품의 과학 설정과 연결되는 베이징·대흥안령·전파망원경 장소를 실제·허구·과학 맥락으로 구분해 지도에서 살펴보세요.`

If actual GSC demand is mostly Netflix filming-intent, pause this change and consider a distinct adaptation section instead.

## 7. Recommended page structure

1. `삼체의 장소는 왜 일반 촬영지 지도와 다를까?`
2. `소설 속 실제 지명`
   - Beijing / Tsinghua context
   - Greater Khingan Mountains / Red Coast fictional setting context
3. `삼체를 떠올리게 하는 실제 과학 장소`
   - FAST
   - Arecibo
   - other verified observatories
4. `추정·영감 후보는 어디까지 사실일까?`
   - explicitly mark unconfirmed material
5. `Netflix 3 Body Problem`
   - Oxford / New York story geography
   - Budapest Season 2 production update
   - only add actual filming-site claims after verification
6. `우주 지도`
   - clearly non-travel and fictional

## 8. Internal-link opportunities

- Santi → science/culture content if such pages exist
- Santi → Beijing / China region pages for genuine story-setting locations
- Santi → map mode with category filter
- adaptation section → Oxford/Budapest/New York place pages only after verified production/story relationships

Do not create place pages whose only basis is a speculative inspiration theory.

## 9. Locale priority

1. KR — current ranking evidence
2. zh-Hant — potentially strategically relevant to Chinese-source story context, but only after factual source cleanup and translation readiness
3. EN — Netflix adaptation search intent
4. JP — only after GSC evidence

## 10. Implementation gate

Do not hand to developer yet. Before implementation:
- inspect actual GSC query terms for `삼체 촬영지`, `삼체 배경`, `삼체 장소`, `3 body problem filming locations`
- verify/soften Miyun inspiration claim
- separate story setting vs science parallel vs speculation in data
- decide whether metadata can safely remove `촬영지` without harming the current ranking
- check generator/source-of-truth path and active design/mobile PR collision

After this, create a small content/data trust-cleanup Issue rather than a broad redesign task.
