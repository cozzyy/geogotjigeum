# [READY][PRODUCT][RETENTION] Phase G — Saved Places + My Map v1

Parent: #31

Status: PLANNER GATE CLEARED — START AFTER CURRENT RC MERGE/CHECKPOINT.

Canonical docs:
1. `docs/growth/saved-places/PHASE_G_SAVED_PLACES_MY_MAP_V1.md`
2. `docs/growth/saved-places/SAVED_PLACES_STORAGE_SCHEMA_V1.md`
3. `docs/growth/saved-places/PHASE_G_DEVELOPER_HANDOFF_V1.md`
4. `docs/growth/saved-places/PHASE_G_QA_CHECKLIST_V1.md`

Goal: localStorage-based place save/unsave, global Saved Places list/count, and cross-work My Map on the existing MapLibre architecture, without login/backend.

Release gate: current RC merged/checkpointed + same-day shared map/shell/generator collision audit clean.

Hard rules: saved identity is `work_id + location_id`; no content snapshot in storage; no new SEO URL; no canonical/hreflang/sitemap changes; no auth/backend/DB/new map engine; no relationship taxonomy changes.

Required surfaces: Work Detail, Place Detail, Map Explorer location detail/sidebar, Guide stops. Scene cards optional only through the same canonical location save control.

Stop `NEEDS DECISION` if cross-work My Map requires major Map Explorer/router/data-model rewrite.

DONE: persistence, global count/list, My Map or explicit NEEDS DECISION, KO/EN/JA/ZH persistence, GA4 events, 360/390/430, SEO/i18n regression 0, PR + local ZIP, no production deploy without user approval.
