/* ============================================================
   Phase G — Saved Places / My Map v1: 공유 client 모듈
   (Issue #43, docs/growth/saved-places/*.md 구현)

   local-first: 저장 상태는 이 브라우저의 localStorage에만 존재한다.
   백엔드/인증/DB 없음. 저장 항목은 <work_id>:<location_id> identity만
   저장하고(번역 스냅샷 없음), 실제 이름/설명/좌표는 렌더 시점에
   canonical 데이터(WORKS/DATA — SPA 전용 전역)에서 조회한다.

   이 파일은 정적 페이지(Work/Place/Guide 등, WORKS/DATA 없음)와
   지도 SPA(index.html, WORKS/DATA 있음) 양쪽에서 그대로 <script>로
   불러 쓴다. resolve()는 WORKS/DATA가 있을 때만 동작하고, 나머지
   (isSaved/save/remove/toggle/count, 정적 페이지 저장 버튼 자동 연결,
   전역 저장 카운트 배지)는 두 컨텍스트 모두에서 동일하게 동작한다.

   SAVED_PLACES_STORAGE_SCHEMA_V1.md의 payload 계약을 그대로 따른다.
   ============================================================ */
(function (root) {
  'use strict';
  var STORAGE_KEY = 'geugotjigeum.savedPlaces.v1';
  var MAX_ITEMS = 200;

  function nowIso() { return new Date().toISOString(); }
  function emptyPayload() { return { version: 1, updatedAt: nowIso(), items: [] }; }

  // storage 접근 자체가 막힌 환경(프라이빗 모드, 3rd-party storage 차단 등)에서도
  // 페이지가 죽지 않도록 모든 localStorage 접근을 try/catch로 감싼다.
  function hasStorage() {
    try {
      var k = '__gcjg_probe__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  }

  function readRaw() {
    try {
      if (!hasStorage()) return emptyPayload();
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyPayload();
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) {
        return emptyPayload();
      }
      var seen = {};
      var items = [];
      parsed.items.forEach(function (it) {
        if (!it || typeof it.workId !== 'string' || !it.workId) return;
        if (typeof it.locationId !== 'string' || !it.locationId) return;
        var savedAt = it.savedAt;
        if (typeof savedAt !== 'string' || isNaN(Date.parse(savedAt))) savedAt = nowIso();
        var key = it.workId + ':' + it.locationId;
        if (seen[key]) return;
        seen[key] = true;
        items.push({ workId: it.workId, locationId: it.locationId, savedAt: savedAt });
      });
      return { version: 1, updatedAt: (typeof parsed.updatedAt === 'string' ? parsed.updatedAt : nowIso()), items: items };
    } catch (e) {
      // 손상된 JSON — 이 키만 초기화, 다른 localStorage 키(lang 등)는 손대지 않는다.
      return emptyPayload();
    }
  }

  function write(payload) {
    try {
      if (!hasStorage()) return false;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return true;
    } catch (e) {
      return false; // quota exceeded 등 — 조용히 실패, 전역 에러 던지지 않음
    }
  }

  function readSavedPlaces() { return readRaw(); }

  function isSaved(workId, locationId) {
    if (!workId || !locationId) return false;
    var p = readRaw();
    for (var i = 0; i < p.items.length; i++) {
      if (p.items[i].workId === workId && p.items[i].locationId === locationId) return true;
    }
    return false;
  }

  function savedCount() { return readRaw().items.length; }

  function savePlace(workId, locationId) {
    if (!workId || !locationId) return { ok: false, reason: 'invalid', count: savedCount() };
    var p = readRaw();
    var exists = p.items.some(function (it) { return it.workId === workId && it.locationId === locationId; });
    if (exists) return { ok: true, count: p.items.length };
    if (p.items.length >= MAX_ITEMS) return { ok: false, reason: 'cap', count: p.items.length };
    p.items.push({ workId: workId, locationId: locationId, savedAt: nowIso() });
    p.updatedAt = nowIso();
    if (!write(p)) return { ok: false, reason: 'storage', count: savedCount() };
    notify();
    return { ok: true, count: p.items.length };
  }

  function removeSavedPlace(workId, locationId) {
    if (!workId || !locationId) return { ok: false, reason: 'invalid', count: savedCount() };
    var p = readRaw();
    var before = p.items.length;
    p.items = p.items.filter(function (it) { return !(it.workId === workId && it.locationId === locationId); });
    if (p.items.length === before) return { ok: true, count: p.items.length };
    p.updatedAt = nowIso();
    if (!write(p)) return { ok: false, reason: 'storage', count: savedCount() };
    notify();
    return { ok: true, count: p.items.length };
  }

  function toggleSavedPlace(workId, locationId) {
    return isSaved(workId, locationId) ? removeSavedPlace(workId, locationId) : savePlace(workId, locationId);
  }

  // ---- 구독자 모델: 저장 버튼/배지/패널이 서로 다른 곳에서도 즉시 갱신되도록 ----
  var listeners = [];
  function subscribe(fn) {
    listeners.push(fn);
    return function () { listeners = listeners.filter(function (l) { return l !== fn; }); };
  }
  function notify() {
    var payload = readRaw();
    listeners.forEach(function (fn) { try { fn(payload); } catch (e) {} });
  }

  // 다른 탭에서 저장/삭제했을 때 이 탭의 배지/버튼도 갱신 (선택 강화 항목, 저비용)
  try {
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY) notify();
    });
  } catch (e) {}

  // ---- Canonical 해석: WORKS/DATA가 로드된 컨텍스트(지도 SPA)에서만 동작 ----
  // 정적 페이지는 이 함수를 호출하지 않는다 — 그 페이지 자신의 work/location은
  // 이미 서버 렌더 시점에 알고 있으므로 별도 조회가 필요 없다.
  function resolveSavedPlace(workId, locationId) {
    if (typeof WORKS === 'undefined' || typeof DATA === 'undefined') return null;
    var work = WORKS.find(function (w) { return w.id === workId; });
    if (!work) return null;
    var data = DATA[workId];
    if (!data || !data.locations) return null;
    var loc = data.locations.find(function (l) { return l.id === locationId; });
    if (!loc) return null;
    var hasCoords = loc.lat != null && loc.lng != null;
    return {
      work: work,
      location: loc,
      workId: workId,
      locationId: locationId,
      hasCoords: hasCoords,
      lat: hasCoords ? loc.lat : null,
      lng: hasCoords ? loc.lng : null,
      mapHref: '/?work=' + encodeURIComponent(workId) + '&loc=' + encodeURIComponent(locationId)
    };
  }

  // resolverFn(workId, locationId) -> truthy/falsy. 호출 측이 필요한 work 데이터를
  // 전부 로드해둔 뒤에 불러야 정확하다(예: Saved 패널이 ensureWorkData 완료 후 호출).
  function pruneUnresolvable(resolverFn) {
    var p = readRaw();
    var kept = p.items.filter(function (it) { return !!resolverFn(it.workId, it.locationId); });
    if (kept.length !== p.items.length) {
      p.items = kept;
      p.updatedAt = nowIso();
      write(p);
      notify();
    }
    return kept.length;
  }

  function gaEvent(name, params) {
    try {
      if (typeof root.gtag === 'function') root.gtag('event', name, params || {});
    } catch (e) {}
  }

  // ---- 정적 페이지(Work/Place/Guide 등) 저장 버튼 자동 연결 ----
  // 마크업 계약(기획 문서 6.1과 동일):
  // <button class="save-place-btn" data-work-id="X" data-location-id="Y"
  //         data-surface="work|place|map|guide" aria-pressed="false">
  //   <span class="save-place-btn-icon" aria-hidden="true"></span>
  //   <span class="save-place-btn-label"></span>
  // </button>
  // 라벨 텍스트는 data-label-save / data-label-saved 속성(이미 로케일별로
  // generator가 채워 넣음)에서 가져온다 — 이 모듈은 번역 문자열을 갖지 않는다.
  function paintButton(btn) {
    var workId = btn.getAttribute('data-work-id');
    var locId = btn.getAttribute('data-location-id');
    var saved = isSaved(workId, locId);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    btn.classList.toggle('is-saved', saved);
    var labelEl = btn.querySelector('.save-place-btn-label');
    if (labelEl) {
      var label = btn.getAttribute(saved ? 'data-label-saved' : 'data-label-save');
      if (label) labelEl.textContent = label;
    }
    var iconEl = btn.querySelector('.save-place-btn-icon');
    if (iconEl) iconEl.textContent = saved ? '♥' : '♡'; // ♥ / ♡
  }
  function paintAllButtons() {
    var list = document.querySelectorAll('.save-place-btn');
    for (var i = 0; i < list.length; i++) paintButton(list[i]);
  }
  function paintCountBadges() {
    var n = savedCount();
    var badges = document.querySelectorAll('.saved-count-badge');
    for (var i = 0; i < badges.length; i++) badges[i].textContent = String(n);
    var hideWhenZero = document.querySelectorAll('[data-saved-hide-when-zero]');
    for (var j = 0; j < hideWhenZero.length; j++) hideWhenZero[j].hidden = (n === 0);
  }

  function wireStaticButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.save-place-btn') : null;
      if (!btn) return;
      var workId = btn.getAttribute('data-work-id');
      var locId = btn.getAttribute('data-location-id');
      var surface = btn.getAttribute('data-surface') || 'unknown';
      if (!workId || !locId) return;
      var wasSaved = isSaved(workId, locId);
      var result = toggleSavedPlace(workId, locId);
      if (!result.ok) return; // 저장 실패(quota/cap 등) — 조용히 무시, 페이지는 계속 동작
      var locale = document.documentElement.getAttribute('lang') || 'ko';
      gaEvent(wasSaved ? 'unsave_place' : 'save_place', {
        work_id: workId, location_id: locId, surface: surface,
        locale: locale, saved_count: result.count
      });
    });
    subscribe(function () { paintAllButtons(); paintCountBadges(); });
    function initialPaint() { paintAllButtons(); paintCountBadges(); }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialPaint);
    } else {
      initialPaint();
    }
  }

  root.SavedPlaces = {
    STORAGE_KEY: STORAGE_KEY,
    MAX_ITEMS: MAX_ITEMS,
    read: readSavedPlaces,
    isSaved: isSaved,
    count: savedCount,
    save: savePlace,
    remove: removeSavedPlace,
    toggle: toggleSavedPlace,
    subscribe: subscribe,
    resolve: resolveSavedPlace,
    pruneUnresolvable: pruneUnresolvable,
    gaEvent: gaEvent,
    paintAllButtons: paintAllButtons,
    paintCountBadges: paintCountBadges
  };

  wireStaticButtons();
})(window);
