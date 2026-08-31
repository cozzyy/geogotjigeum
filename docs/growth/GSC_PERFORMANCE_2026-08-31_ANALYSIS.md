# GSC Performance Analysis — 2026-08-31

Source: `geugotjigeum.com-Performance-on-Search-2026-08-31.xlsx`
Filter in export: Web / last 3 months. The chart itself contains actual daily rows from 2026-08-04 through 2026-08-28.

## 1. Executive conclusion

Search exposure is expanding quickly, but the new exposure is bifurcating into two very different groups:

1. **KR/JA work pages with real page-one or near-page-one intent** — highest near-term growth value.
2. **Broad EN/global long-tail impressions at very low positions** — large impression volume but almost no traffic; do not scale more generic programmatic English pages before diagnosing intent/index quality.

Development should therefore move from additional visual expansion to:

`finish Design Phase 1 → technical SEO hardening → page-one content winners → selective international expansion`

## 2. Site-level trend from chart sheet

Authoritative chart total for 2026-08-04–2026-08-28:
- Clicks: **145**
- Impressions: **4,656**
- Overall CTR: **3.11%**

Growth acceleration:
- 2026-08-15 impressions: 203
- 2026-08-28 impressions: 522
- Change: about **+157%**

Recent 7 days (2026-08-22–2026-08-28):
- 2,591 impressions
- 49 clicks
- CTR about 1.89%

Interpretation: Google is testing/indexing many more URLs and queries. CTR fell from the very early period because exposure broadened to low-ranking long-tail terms; that is not by itself a site failure. The priority is now improving the quality of the expanded footprint.

## 3. Highest-value page-one / near-page-one assets

Individual page rows with strong opportunity:

| Page | Impressions | Clicks | CTR | Avg position | Action |
|---|---:|---:|---:|---:|---|
| `/works/odyssey/` | 229 | 8 | 3.49% | 9.25 | **Top CTR/snippet/content opportunity** |
| `/works/breakingbad/` | 142 | 5 | 3.52% | 10.20 | reinforce Albuquerque/verified filming intent |
| `/works/strangerthings/` | 100 | 8 | 8.00% | 7.51 | protect and expand, not rewrite aggressively |
| `/works/sunshine/` | 81 | 4 | 4.94% | 8.99 | trust correction before growth work |
| `/works/harrypotter/` | 78 | 6 | 7.69% | 9.56 | protect; improve supporting location intent |
| `/works/santi/` | 68 | 3 | 4.41% | 8.96 | strong next-wave improvement candidate |
| `/works/taebaek/` | 59 | 3 | 5.08% | 4.20 | high-rank niche asset; improve CTR/internal links |
| `/works/jikji/` | 57 | 2 | 3.51% | 5.70 | high-rank niche asset; improve CTR/internal links |

Important query signals:
- `오디세이 촬영지`: 44 impressions, position 9.2, **0 clicks** → immediate snippet/search-intent issue.
- `기묘한 이야기 촬영지`: 12 impressions, 2 clicks, position 7.33 → strong fit.
- `앨버 커키 브레이킹 배드`: 10 impressions, position 8.9, 0 clicks → page-one opportunity.
- `원피스 지역`: 13 impressions, position 8.69, 0 clicks → current page may not satisfy the exact intent cleanly.
- `브리저튼 촬영지`: 5 impressions, 1 click, position 7.6 → protect title, improve factual precision.
- `白夜行 舞台`: 28 impressions, position 9.43, 0 clicks → important Japanese opportunity.

## 4. International-language signal

The visible query table does not equal total site queries because Search Console dimensions can omit/anonymize rows, so these numbers are directional rather than the site total.

Visible query rows grouped approximately by script/language:
- Korean: 254 impressions / 16 clicks / weighted avg position about 16.2
- Japanese: 102 impressions / 1 click / weighted avg position about 17.8
- English: 1,399 impressions / 0 clicks / weighted avg position about 73.6

English examples include broad terms such as:
- `filming in africa`
- `filming in spain`
- `filming in romania`
- generic `breaking bad locations`, `stranger things filming locations`, etc.

Decision:
- **KR remains primary growth market.**
- **JA deserves selective investment** because specific pages already rank around page one: `/ja/works/byakuya/`, `/ja/works/spiderman/`, `/ja/works/strangerthings/`.
- **EN should not receive bulk expansion yet.** Diagnose query/page intent and programmatic region quality first.
- **ZH should remain architecture-ready but not content-growth priority yet**; this export has almost no meaningful signal.

## 5. Device signal

Search Console device rows:
- Desktop: 3,408 impressions / 110 clicks / CTR 3.23% / avg position 59.04
- Mobile: 1,205 impressions / 33 clicks / CTR 2.74% / avg position 14.26
- Tablet: immaterial volume

Do not infer that mobile CSS alone caused ranking differences because device query mixes differ. But this strongly supports the current product decision to treat real-mobile UX as a hard QA gate: mobile already receives materially better-ranking search exposure.

## 6. Technical SEO signal: parameterized map URLs

The page export contains at least **25** URLs with `?work=` state parameters, e.g.:
- `/en/?work=glory`
- `/ja/?work=squidgame`
- `/en/?work=bridgerton`
- `/en/?work=strangerthings`

These rows collectively show search impressions/clicks in the page sheet. Current source already declares clean locale-home canonicals (`/`, `/en/`, etc.) even when the SPA is entered with `?work=`.

This is therefore **an audit item, not an immediate noindex/redirect change**. After Design Phase 1, verify in Search Console URL Inspection:
- Google-selected canonical for representative `?work=` URLs
- whether parameter URLs are being indexed separately or merely reported as discovered/alternate URLs
- whether internal links unnecessarily expose crawlable query-state URLs

Do not change routing/deep links until this check is complete.

## 7. Places / Regions signal

The page export shows many place and region URLs with tiny impression counts and very weak average positions, while the best work pages drive the meaningful search wins.

This does **not** justify mass noindexing yet. It does justify changing the role of Places/Regions development:
- use them to strengthen work-page topical clusters and internal linking
- avoid auto-expanding generic region pages just to increase URL count
- improve index pages/search/filter for users, but keep SEO-visible links curated
- later audit which programmatic pages have zero/near-zero value after enough time has elapsed

## 8. Revised development priority after Design Phase 1

### P0 — Finish current design closeout
Complete #24 → #26 → #27 → #28 regression. Do not interrupt with SEO code unless a severe indexing bug is found.

### P1 — Technical SEO hardening sprint
Create a focused developer audit/implementation issue for:
1. parameter URL canonical consolidation audit (`?work=` and any location state params)
2. programmatic place/region index-quality audit
3. internal-link path from high-ranking work pages → verified place pages → region hubs
4. sitemap/canonical/hreflang consistency after Design Phase 1
5. no new bulk URL generation until audit results are reviewed

### P2 — Page-one winner content sprint
First order based on current Search Console evidence:
1. Odyssey
2. Breaking Bad
3. Stranger Things (protect/expand)
4. Santi
5. Harry Potter (protect/expand)
6. Japanese Byakuyako

Mr. Sunshine remains a trust correction task before SEO expansion.

### P3 — Selective international strategy
- JA: targeted pages with demonstrated queries/rankings
- EN: fix intent and quality before expansion
- ZH: maintain infrastructure, wait for demand evidence

## 9. Measurement rule

After every SEO/content deployment, capture the same export around +14 and +28 days and compare:
- impressions
- clicks
- CTR
- average position
- target-query position
- work → place/map engagement where GA4 supports it

Do not judge a redesign or content change from site-wide average position alone; expanded low-rank long-tail impressions can worsen the average while valuable page-one traffic improves.

## 10. Data caution

The workbook's chart total, query table and page table do not reconcile exactly when summed. Use the chart for authoritative site-level totals, and use query/page sheets for individual row opportunity analysis and directional segmentation. Do not use raw sums of page/query rows as the official site total without rechecking the Search Console export method.