# Stranger Things SEO Research v1

Status: RESEARCH COMPLETE — implementation after collision check.

## Why this page matters

Search Console baseline (2026-08-25 export):
- page impressions: 61
- clicks: 6
- CTR: 9.8%
- average position: 7.97
- query `기묘한 이야기 촬영지`: average position 7.38

This page is already a first-page winner. Do not rewrite the core title for novelty.

## Current page snapshot

Current title/H1:
`기묘한 이야기 촬영지와 실제 장소 지도`

The core Georgia/Hawkins framing is strong, but several details are stale or factually wrong as of 2026.

## Recommendation summary

### KEEP
- URL `/works/strangerthings/`
- title/H1 core phrase `기묘한 이야기 촬영지`
- Georgia/Hawkins as the main geographic discovery theme
- Jackson, Hawkins Lab, Gwinnett Place Mall as major location hooks
- map-first exploration

### CHANGE — P0 factual/trust

1. **Correct the Season 4 Russia filming claim.**
   - Current page says the Russia/Siberia material was filmed on an Atlanta studio set.
   - Netflix Tudum says Hopper's Siberia/prison scenes were shot outside a real prison in **Vilnius, Lithuania**.
   - Replace the current reveal chip and paragraph with the verified Lithuania fact.

2. **Update the final-season status.**
   - Current copy says the cast is heading toward the final season.
   - Stranger Things 5 has already been released and the series has ended.
   - Netflix's 2026 behind-the-scenes material explicitly describes Season 5 as the final season and the end of the series.
   - Remove future-tense wording.

3. **Use verified Season 5 location facts for freshness.**
   - Netflix Tudum confirms downtown **Jackson, Georgia** doubled for downtown Hawkins in prior seasons.
   - Season 5's large MAC-Z set was built on the backlot of **Cinespace Studios in Atlanta**.
   - Hawkins Lab scenes were filmed in a former psychiatric hospital owned by **Emory University in Atlanta**.

These can form a dated `2026 업데이트` block without changing the whole article.

### CHANGE — P1 current-place utility

4. Keep the location-first title/meta because it is already ranking well.

5. Surface the strongest filming locations earlier. Recommended reading order:
   - 3–5 short hook paragraphs
   - `호킨스는 어디서 찍었을까?` TOP locations
   - dated final-season update
   - deeper story/spoiler section

6. Add location-status labels where reliable:
   - active public attraction
   - exterior/private/institutional
   - former/changed site
   - studio/not public

Do not imply that a studio or institutional property is freely visitable.

### CHANGE — P1 claim review

7. Re-verify `Stone Mountain Park = 숲·철길 실제 촬영지` before keeping it as a hero-credit factual claim. The official Netflix sources reviewed for this audit support Jackson, Atlanta/Cinespace, Emory/Hawkins Lab and Lithuania; they do not establish this specific Stone Mountain claim. If no strong source is found, downgrade the wording or replace the hero with a better-supported location.

8. Gwinnett Place Mall's current status is time-sensitive. Avoid stale phrases such as `지금은 쇠퇴` unless a current local-government/owner source is checked at implementation time.

### CHANGE — P2 internal discovery

Potential links, only where corresponding routes/data already exist:
- Stranger Things → Georgia / United States region
- Jackson / Atlanta place cards → same-region works
- final-season location cards → map filtered to Stranger Things

Do not force unrelated cross-work links.

## Verified external evidence

Netflix Tudum:
- Final-season making-of / Jackson and Atlanta Cinespace: https://www.netflix.com/tudum/features/stranger-things-digital-cover
- Hawkins Lab former Emory psychiatric hospital: https://www.netflix.com/tudum/articles/stranger-things-5-fun-facts
- Siberia scenes filmed in Vilnius, Lithuania: https://www.netflix.com/tudum/articles/stranger-things-cast-interview-geeked-season-4-filming-locations
- final season release/end state: https://www.netflix.com/tudum/articles/stranger-things-cast-and-creators-on-the-final-season

## Implementation guardrails

- Preserve URL/canonical/hreflang/structured data.
- Do not change the strong ranking title without specific GSC evidence.
- Do not describe studios/private/institutional properties as ordinary tourist attractions.
- Do not touch shared CSS/generator while active mobile/design work collides.
- If generator-produced, modify source-of-truth rather than generated HTML.
- Record before metrics and compare at ~14d/~28d.

## Decision

**SEO action: REFRESH + FACT-CHECK, not rewrite-from-scratch.**

The page already ranks. The highest-value change is correcting the Lithuania error, updating the final-season status, and adding trusted 2026 filming-location context while preserving the successful search intent.