# Batch 2 SEO Readiness Matrix v1

Date: 2026-08-28
Status: RESEARCH COMPLETE — IMPLEMENTATION QUEUED AFTER PHASE 1 COLLISION CHECK

## 1. Executive decision

Batch 2 contains two different kinds of opportunity:
- already-ranking pages where metadata should be protected and trust/data improved
- pages whose place taxonomy is actively misleading and needs cleanup before SEO expansion

The most urgent trust problem is **미스터 션샤인**. The safest growth update is **브리저튼**. `이 사랑 통역 되나요?` is the best current-title expansion candidate once exact location sources are normalized.

## 2. Matrix

| Work | Search signal | Title | Main action | Risk | Dev readiness |
|---|---|---|---|---|---|
| 미스터 션샤인 | 57 imp / 3 clk / pos 9.54 | **CHANGE REQUIRED** | separate real filming from historical/story context; rebuild TOP5 | VERY HIGH trust | NOT YET — classify 102 entries/source trace |
| 더 글로리 | 80 / 3 / 13.80 | **KEEP** | clean fictional/nearby/unverified labels; keep Cheongju anchors | MEDIUM | READY AFTER SOURCE TRACE + COLLISION CHECK |
| 브리저튼 | query `브리저튼 촬영지` pos 7.60 | **KEEP** | fix Ranger's House claim; add S4 freshness/locations | LOW–MEDIUM | MOST READY |
| 백야행 | query `白夜行 舞台` pos 9.88 | **KEEP** | separate novel setting / fictional / adaptation filming / theme recs | HIGH taxonomy | READY AFTER TAXONOMY SOURCE TRACE |
| 이 사랑 통역 되나요? | 2026 current-title priority | **KEEP** | normalize exact filming vs region vs stand-in; official Canada/Tuscany sources | MEDIUM | READY AFTER 31-LOCATION SOURCE TRACE |

## 3. Priority by impact

### Trust hotfix priority — 미스터 션샤인
Current title says `촬영지 서울 경복궁·덕수궁`, while the current page text treats these locations as historical/story context and the TOP5 includes historical places as `공식·직접`. This should not remain the long-term public taxonomy.

Recommended future title after verified filming set is ready:
`미스터 션샤인 촬영지 논산·함양·안동 실제 장소 지도 | 그곳, 지금`

Actual filming core should come from verified Nonsan Sunshine Studio / Hamyang Ildu Historic House / Andong Manhyujeong / Hapcheon Image Theme Park.

### Lowest-risk implementation — 브리저튼
- preserve title
- correct Ranger's House from `interior scenes` to exterior of Bridgerton House
- add Season 4 currentness: Shepperton backlot as production context, Loseley Park as verified Season 4 real location
- keep Bath/London visitor clusters

### Data-label cleanup — 더 글로리
- keep current Cheongju title
- `세명시` → FICTIONAL
- `성안길` → NEARBY/ROUTE, not experience facility
- unverified Sejong entry → downgrade/remove from core
- TOP5 only source-backed real filming places

### Search-language opportunity — 백야행
- memorial framing is verified: KADOKAWA says Higashino died 2026-07-23
- Japanese query `白夜行 舞台` aligns with novel-setting discovery
- current `직접` label is wrong on fictional/non-place/theme entries
- optional adaptation layer can use Ibaraki Film Commission 2006 TBS locations and Shinshu FC 2011 film location

### Current-release growth — 이 사랑 통역 되나요?
- preserve current 4-country title
- official Netflix Canada has eight canonical Canadian filming nodes
- Toscana Film Commission verifies Siena/Montalcino/Florence
- build a strong `actual filming site vs stand-in` editorial hook

## 4. Suggested implementation groups

### Group D — smallest safe growth PR
1. Bridgerton
2. The Glory

No title changes. Focus on factual precision, labels and internal links.

### Group E — current-title structured cleanup
3. Can This Love Be Translated?
4. Byakuyako

Requires location taxonomy/source tracing but should not need URL changes.

### Group F — trust restructure
5. Mr. Sunshine

Do separately. The 102-entry taxonomy and title/meta need coordinated correction. Do not mix this into a small SEO PR.

## 5. Common source taxonomy for Growth v1

Use this cross-site vocabulary where the existing data model allows it without migration:
- `FILMED` — verified physical filming site
- `SET/STUDIO` — production set or backlot
- `STORY SETTING` — real place used as narrative setting, not verified filming
- `FICTIONAL` — fictional place/non-real entity
- `INSPIRED` — verified inspiration/motif
- `EXPERIENCE` — official fan/visitor experience, not filming
- `NEARBY/ROUTE` — nearby travel recommendation
- `STAND-IN` — filming site representing a different story location
- `UNVERIFIED` — do not promote in title/TOP5 until verified

If supporting this cleanly requires a shared data-model migration, stop as `NEEDS DECISION`; otherwise map to existing labels locally.

## 6. Developer handoff status

**NOT YET.**

Batch 2 research is complete, but Issue #28 Design Phase 1 is still the shared implementation track. Same-day collision check must be performed before creating a developer implementation issue. Growth research can continue independently.
