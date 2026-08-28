# 백야행 SEO Research v1

Date: 2026-08-28
Parent: Content Growth Engine #31
Status: RESEARCH COMPLETE — TAXONOMY CLEANUP / MEMORIAL FRAMING VERIFIED

## 1. Search opportunity

GSC query evidence:
- `白夜行 舞台` avg position: 9.88

Current title:
`히가시노 게이고 추모 특집 — 백야행 오사카 실제 장소 지도 | 그곳, 지금`

Current description:
`백야행의 실제 배경인 오사카 후세 상점가와 19년에 걸친 두 사람의 이야기를 지도에서 확인하세요. 히가시노 게이고 추모 특집.`

The current metadata is better aligned with `舞台` than an older filming-location framing. Preserve the `실제 장소/배경` direction.

## 2. Memorial framing verification

KADOKAWA published an official obituary stating that Keigo Higashino died on 2026-07-23. Therefore the current `추모 특집` framing is not an error.

Use memorial language respectfully and sparingly. The page's core value still needs to be the work/place relationship rather than repeated obituary language.

## 3. Critical taxonomy finding

Current generated page TOP5 and full list label all entries as `직접`, including:
- Kintetsu Fuse Station — story setting/context
- Fuse Hondori shopping street — story setting/context
- fictional Kirihara pawnshop
- fictional Yukiho boutique
- `Sasagaki's 19-year pursuit` — not a physical place
- Osaka Castle — explicitly a theme recommendation, not tied to a scene
- Dotonbori — explicitly a theme recommendation, not tied to a scene

This is a category failure even though the text descriptions themselves often acknowledge the distinction.

## 4. Actual adaptation filming layer exists

If the product wants to satisfy users who mean screen locations rather than novel setting, there are verified adaptation filming sources:
- Ibaraki Film Commission officially lists the 2006 TBS drama `白夜行` filming at Mitsukaido Station / Kita-Mitsukaido Station in Joso.
- Shinshu Film Commission lists the 2011 film `白夜行` filming at Hotel Harmonie Bien in Matsumoto.

These should not be merged invisibly with the novel's Osaka setting. They are separate adaptation layers.

## 5. Keep / change recommendation

### Keep
- URL
- memorial feature framing
- Osaka/Fuse story-setting discovery
- current title's `실제 장소` rather than `촬영지`

### Change
- taxonomy: `NOVEL SETTING / FICTIONAL / ADAPTATION FILMED / THEME RECOMMENDATION / NON-PLACE STORY NODE`
- remove `직접` from fictional/non-place/theme entries
- do not call Osaka Castle/Dotonbori `백야행 직접 장소`
- optionally add a separate `2006 TBS / 2011 film filming locations` section if it helps query intent

## 6. Suggested structure

1. memorial intro — compact and respectful
2. `소설 백야행의 무대: 오사카 후세`
3. real setting nodes — Fuse area
4. fictional story places — clearly marked
5. `영상판은 어디서 찍었나?` — 2006 TBS / 2011 film as separate adaptation layer
6. theme recommendations — separate from canonical work places
7. related Higashino works

## 7. Metadata

Title: **KEEP for now**.

Description: current version is acceptable. If adaptation filming content is added, use an on-page H2 rather than forcing `촬영지` back into the title.

## 8. Locale priority

1. JP — direct Japanese query evidence is unusually strong
2. KR — memorial/current interest
3. zh-Hant — Higashino readership potential; inspect demand
4. EN — lower priority

## 9. Risk

**HIGH TAXONOMY RISK / LOW METADATA RISK.** Current title intent is reasonable, but card labels undermine trust.

## 10. Implementation gate

- trace canonical location/story source
- classify all 7 existing entries correctly
- decide whether adaptation filming gets a separate section/layer without changing URL architecture
- preserve memorial metadata unless CTR/query evidence suggests otherwise
- no title churn while avg query position is ~9.88

## 11. Strong sources used

- KADOKAWA official obituary, 2026-07-27 — death on 2026-07-23
- Ibaraki Film Commission — 2006 TBS `白夜行` supported filming, Mitsukaido/Kita-Mitsukaido stations
- Shinshu Film Commission Network — 2011 film `白夜行`, Hotel Harmonie Bien in Matsumoto
