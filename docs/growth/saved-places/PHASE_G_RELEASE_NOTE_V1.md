# Phase G Planner Release Note v1

Planner preparation completed on 2026-09-01.

Phase G is intentionally local-first and additive:
- canonical saved object: place/location
- persistence: browser localStorage
- no account/backend
- Saved Places list + cross-work My Map target
- existing Work/Place/Map/Guide data reused
- no new indexable URL required
- no SEO architecture change

The developer should not start until the current RC is merged/checkpointed and the map/shared-generator collision check is clean.

If cross-work My Map requires a major second map/router/data-model architecture, stop as `NEEDS DECISION`; do not quietly build a parallel map system.
