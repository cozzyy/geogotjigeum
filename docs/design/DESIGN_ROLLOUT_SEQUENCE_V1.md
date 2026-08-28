# Geugotjigeum Design Rollout Sequence v1

## Current sequence
1. Homepage — Cinematic Content Discovery — implementation completed
2. Work Detail / Hooking — Hybrid Light Editorial — implementation completed (PR #25 / Issue #20)
3. Map Explorer — dark brand shell + dominant map + bright info panel — design spec ready / Figma visual pending
4. Quiz Experience — Playful Editorial — design spec ready / Figma visual pending
5. Place Detail — Hybrid Travel Information — early design plan ready
6. Discovery Hubs — Places / Regions — Light Discovery Index — design plan ready
7. Shared Site Shell — Header / Navigation / Language — design plan ready

## Shared principles
Across all screens:
- same brand accent (`#FF7B57` family)
- dark cinematic surfaces where emotion/identity matters
- bright warm reading surfaces where long text or practical information matters
- mobile-first layout
- no unnecessary architecture rewrite for visual work
- preserve SEO / i18n / existing data contracts
- use verified existing content and images first
- utility/index pages should optimize discovery and scanability rather than imitate editorial pages
- canonical language presentation is `KR / EN / JP / 繁中`, while preserving existing locale readiness/fallback rules

## Screen roles
- Homepage: emotional discovery / entry
- Work Detail: story and scene context
- Map Explorer: spatial discovery
- Quiz: lightweight interaction that returns users to real places
- Place Detail: practical travel context
- Places / Regions hubs: search and browse utility
- Shared Shell: cross-screen orientation and language consistency

## Pipeline rule
Design stays one or two screens ahead of development:

`ChatGPT design/spec → user approves direction → Claude implements → ChatGPT reviews → next design already waiting`

Do not start a later implementation if it risks collision with an unfinished earlier screen sharing the same core files/styles.

## Figma constraint
Starter MCP quota may temporarily block visual-frame creation. When that happens, GitHub Markdown specs remain the canonical planning source and Figma visuals are added later without changing approved product direction unless user review requires it.
