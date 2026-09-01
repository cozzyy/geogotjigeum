# Phase G developer prompt

Current RC merge/checkpoint 이후 Phase G를 시작해주세요.

Canonical docs:
1. `docs/growth/saved-places/PHASE_G_SAVED_PLACES_MY_MAP_V1.md`
2. `docs/growth/saved-places/SAVED_PLACES_STORAGE_SCHEMA_V1.md`
3. `docs/growth/saved-places/PHASE_G_DEVELOPER_HANDOFF_V1.md`
4. `docs/growth/saved-places/PHASE_G_QA_CHECKLIST_V1.md`

Goal: account/backend 없이 localStorage 기반으로 장소를 저장하고, Saved Places 목록과 가능하면 기존 MapLibre 위의 cross-work My Map(saved-only pins)을 제공한다.

Before coding, exact touch list + current work/location resolver + current `?work=&loc=` deep-link helper + cross-work My Map additive feasibility를 짧게 보고한다.

Hard rules:
- saved identity = `work_id + location_id`
- translated copy/coordinates/location facts를 localStorage에 snapshot으로 저장하지 않는다
- shared storage module 1개 사용; 페이지별 localStorage 구현 금지
- Work/Place/Map/Guide에 같은 save control 사용
- 기존 URL/canonical/hreflang/sitemap/relationship taxonomy 변경 금지
- auth/backend/DB/new map engine/paid service 금지
- My Map이 대규모 map/router/data-model rewrite를 요구하면 `NEEDS DECISION`
- production deploy 금지

DONE은 저장/해제, global count, Saved panel, My Map 또는 명시적 NEEDS DECISION, KO/EN/JA/ZH persistence, GA4 events, 360/390/430 QA, SEO/i18n regression 0, PR+local ZIP까지다.
