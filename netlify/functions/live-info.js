// 그곳지금 - 공공데이터 실시간 정보 프록시 (Netlify Function)
//
// TourAPI / 서울시 실시간 도시데이터 서비스키를 서버사이드에서만 사용하고
// 클라이언트(브라우저)에는 절대 노출하지 않기 위한 프록시.
//
// 환경변수 (Netlify 사이트 설정 > Site configuration > Environment variables 에 등록):
//   TOURAPI_SERVICE_KEY    - 한국관광공사 TourAPI 서비스키 (data.go.kr에서 발급, Encoding 형태 그대로 사용)
//   SEOUL_RTD_SERVICE_KEY  - 서울시 실시간 도시데이터 서비스키 (활용신청 완료 후 등록 — 아직 미발급)
//
// 사용법:
//   GET /.netlify/functions/live-info?type=tour&contentId=126508
//   GET /.netlify/functions/live-info?type=seoul&hotspot=경복궁
//
// 주의:
//   - 서울시 실시간 도시데이터(citydata) 엔드포인트/응답 구조는 공식 매뉴얼 기준으로 작성했으나
//     실제 서비스키 발급 전이라 실동작 검증 전. 키 발급 후 반드시 실제 호출로 재검증할 것.
//   - TourAPI(detailCommon2) 쪽은 2026-09-21 실제 키로 검증 완료.

const TOURAPI_BASE = 'https://apis.data.go.kr/B551011/KorService2';
const SEOUL_RTD_BASE = 'http://openapi.seoul.go.kr:8088';

// 콜드스타트 사이 인스턴스가 재사용될 때만 살아있는 메모리 캐시.
// 서버리스라 영속적이진 않지만 짧은 시간 내 반복 호출을 줄이는 용도로는 충분.
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5분

function getCached(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function setCached(key, data) {
  cache.set(key, { data, at: Date.now() });
}

async function fetchTourApiCommonInfo(contentId) {
  const key = process.env.TOURAPI_SERVICE_KEY;
  if (!key) throw new Error('TOURAPI_SERVICE_KEY not configured');
  const url =
    `${TOURAPI_BASE}/detailCommon2` +
    `?serviceKey=${key}` +
    `&contentId=${encodeURIComponent(contentId)}` +
    `&MobileOS=ETC&MobileApp=geugotjigeum&_type=json` +
    `&defaultYN=Y&addrinfoYN=Y&overviewYN=N`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TourAPI HTTP ${res.status}`);
  const json = await res.json();
  const items = json?.response?.body?.items?.item;
  const item = Array.isArray(items) ? items[0] : items;
  if (!item) return null;
  return {
    title: item.title,
    addr: [item.addr1, item.addr2].filter(Boolean).join(' '),
    tel: item.tel || null,
    homepage: item.homepage ? String(item.homepage).replace(/<[^>]+>/g, '') : null,
    mapx: item.mapx,
    mapy: item.mapy,
  };
}

async function fetchSeoulHotspot(hotspotName) {
  const key = process.env.SEOUL_RTD_SERVICE_KEY;
  if (!key) throw new Error('SEOUL_RTD_SERVICE_KEY not configured');
  const url = `${SEOUL_RTD_BASE}/${key}/json/citydata/1/5/${encodeURIComponent(hotspotName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SeoulRTD HTTP ${res.status}`);
  const json = await res.json();
  const pop = json?.CITYDATA?.LIVE_PPLTN_STTS?.LIVE_PPLTN_STTS?.[0];
  if (!pop) return null;
  return {
    hotspotName: pop.AREA_NM,
    congestLevel: pop.AREA_CONGEST_LVL,
    congestMsg: pop.AREA_CONGEST_MSG,
    updatedAt: pop.PPLTN_TIME,
  };
}

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=120',
    'Access-Control-Allow-Origin': 'https://geugotjigeum.com',
  };

  try {
    const { type, contentId, hotspot } = event.queryStringParameters || {};

    if (type === 'tour' && contentId) {
      const cacheKey = `tour:${contentId}`;
      let data = getCached(cacheKey);
      if (!data) {
        data = await fetchTourApiCommonInfo(contentId);
        setCached(cacheKey, data);
      }
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, data }) };
    }

    if (type === 'seoul' && hotspot) {
      const cacheKey = `seoul:${hotspot}`;
      let data = getCached(cacheKey);
      if (!data) {
        data = await fetchSeoulHotspot(hotspot);
        setCached(cacheKey, data);
      }
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true, data }) };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'type=tour&contentId=... 또는 type=seoul&hotspot=... 형식으로 요청하세요.',
      }),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ ok: false, error: String((err && err.message) || err) }),
    };
  }
};
