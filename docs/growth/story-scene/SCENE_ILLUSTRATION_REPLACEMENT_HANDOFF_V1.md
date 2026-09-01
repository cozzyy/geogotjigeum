# Phase E Scene Illustration Replacement — Developer Handoff v1

Status: **PLANNER ASSET READY — 15/15**

## Goal
Replace all 15 Phase E placeholder/simple SVG scene illustrations with the planner-approved `1안` original editorial illustrations.

This is a **full 15/15 replacement**, not a partial refresh.

## Canonical inputs
1. `docs/growth/story-scene/SCENE_ILLUSTRATION_REPLACEMENT_MANIFEST_V1.yaml`
2. Existing `docs/growth/story-scene/SCENE_PACKAGES_READY_V1.yaml`

The replacement manifest owns only the new raster image paths and alt text. Existing scene metadata remains canonical in `SCENE_PACKAGES_READY_V1.yaml`.

## Asset package
Planner prepared a ZIP containing this exact repository-relative structure:

```text
site/assets/scenes/poksshak/poksshak-scene-01.webp
site/assets/scenes/poksshak/poksshak-scene-02.webp
site/assets/scenes/poksshak/poksshak-scene-03.webp
site/assets/scenes/odyssey/odyssey-scene-01.webp
site/assets/scenes/odyssey/odyssey-scene-02.webp
site/assets/scenes/odyssey/odyssey-scene-03.webp
site/assets/scenes/breakingbad/breakingbad-scene-01.webp
site/assets/scenes/breakingbad/breakingbad-scene-02.webp
site/assets/scenes/breakingbad/breakingbad-scene-03.webp
site/assets/scenes/byakuya/byakuya-scene-01.webp
site/assets/scenes/byakuya/byakuya-scene-02.webp
site/assets/scenes/byakuya/byakuya-scene-03.webp
site/assets/scenes/strangerthings/strangerthings-scene-01.webp
site/assets/scenes/strangerthings/strangerthings-scene-02.webp
site/assets/scenes/strangerthings/strangerthings-scene-03.webp
```

All assets are 1600×900 WebP and are original editorial illustrations.

## Critical mapping guardrails
Do not reinterpret images or alter scene metadata because of visual details.

- `breakingbad-scene-01` remains `lospollos` / Twisters (Los Pollos filming location). **Do not use the earlier RV concept for this scene.**
- `breakingbad-scene-02` remains `carwash`.
- `breakingbad-scene-03` remains `tuco_office` / Java Joe's.
- `byakuya-scene-01` remains `by_fuse_station` / STORY_SETTING.
- `byakuya-scene-02` remains `by_fuse_honodori` / STORY_SETTING.
- `byakuya-scene-03` remains `by_mitsukaido_station` / ADAPTATION_FILMING / FILMED.
- Stranger Things remains Creel House → Hawkins Lab → Gwinnett Mall.
- Odyssey remains Nestor's Cave → Voidokilia Beach → Santa Caterina/Favignana.
- Poksshak remains Seongsan Ilchulbong → Gimnyeong Beach → Hyeopjae Beach.

## Implementation
After the asset ZIP is extracted at repository root:

1. Audit the existing Scene renderer/data binding.
2. For the 15 existing Phase E scene packages, replace only `image_path`:
   - from `/assets/scenes/<work>/<scene-id>.svg`
   - to `/assets/scenes/<work>/<scene-id>.webp`
3. Apply the approved `alt_ko` from the replacement manifest.
4. Preserve all existing:
   - `scene_id`
   - `source_location_id`
   - `context_type`
   - `relationship`
   - scene copy / Why This Place copy
   - Work/Place URLs
   - canonical/hreflang/x-default/sitemap
   - GA4 behavior
5. Do not create a new renderer, CMS, router, or data model for this task.
6. Keep the old SVG files until the WebP replacement is fully verified and a reference search shows they are no longer required. Then remove only if safe.

## Image rendering
- expected aspect ratio: 16:9
- `object-fit: cover`
- preserve existing card border radius/layout
- use lazy loading where current renderer allows it
- reserve dimensions/aspect ratio to avoid CLS

## QA / Done definition
The task is DONE only when all are true:

- 15/15 new WebP assets render
- 5 works × 3 Scene cards confirmed
- broken image = 0
- old placeholder SVG visible = 0
- Scene ↔ location mismatch = 0
- relationship classification regression = 0
- desktop QA pass
- mobile 360 / 390 / 430 pass
- valid Place Scene blocks pass
- canonical/hreflang/sitemap/GA4 regression = 0

Provide Work Detail screenshots for all five works with all three Scene cards visible, plus a 15-row asset mapping/QA table.

## Before implementation report
Report only:
1. files/templates/manifests to touch
2. whether this is an additive `image_path` replacement
3. any blocker that would require architecture/data-model changes

If no blocker exists, proceed immediately.

**Do not production deploy. Stop at PR + QA report.**
