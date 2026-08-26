/* ============================================================
   MapLibre GL + OpenFreeMap 벡터 지도 엔진
   - 지도 라벨을 name:ko → name:latin(로마자) → name:en → name(현지어) 순으로 표시
     (OSM 데이터에 한국어 이름이 없는 소도시는 로마자로 표시되어 일본어를 몰라도 읽을 수 있음)
   - 마커는 항상 라벨이 켜져 있지 않고 hover 시에만 표시 (겹침 방지)
   ============================================================ */
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [138.0, 36.2],
  zoom: 6,
  minZoom: 5
});
map.addControl(new maplibregl.NavigationControl({ showCompass:false }), 'top-left');

// '처음 위치로' 버튼 — 호프(한국·루마니아)처럼 장소가 멀리 흩어진 작품에서 원거리 장소를
// 구경하러 지도를 옮긴 뒤, 드래그로 한참 되돌아오지 않고 한 번에 원래 화면으로 복귀하게 한다.
function MapHomeControl(){}
MapHomeControl.prototype.onAdd = function(mapRef){
  this._map = mapRef;
  this._container = document.createElement('div');
  this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group map-home-ctrl';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'mapHomeBtn';
  btn.innerHTML = '🎯';
  btn.onclick = function(){ if (typeof goToWorkHome === 'function') goToWorkHome(); };
  this._container.appendChild(btn);
  return this._container;
};
MapHomeControl.prototype.onRemove = function(){
  if (this._container.parentNode) this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};
map.addControl(new MapHomeControl(), 'top-left');

let currentWorkId = null;
let eraMode = 'modern';
let hoverPopup = null;
let clickPopup = null;
let descMode = 'long';

/* ============================================================
   언어 선택 (한국어/English/日本語) — 2026-08 2단계 개편
   [언어 결정 우선순위] ① URL 경로(/en/, /ja/ — 검색엔진·공유 링크가 언어를 확정할 수 있어야
   하므로 최우선) ② 사용자가 이전에 고른 언어(localStorage 'lang') ③ 기본값 ko.
   [폴백 체인] ja 번역이 아직 없는 문구·본문은 한국어가 아니라 영어로 폴백한다 —
   일본어 사용자에게는 한국어보다 영어가 읽힐 확률이 훨씬 높기 때문(ja → en → ko).
   [주의] 자동 리다이렉트(브라우저 언어 감지로 /를 /en/으로 보내는 것)는 하지 않는다.
   Googlebot이 en-US 환경으로 렌더링하다 한국어 홈이 /en/으로 튕겨 색인이 망가질 수 있어서다
   (Google 다국어 가이드도 자동 리다이렉트 대신 hreflang + 사용자 선택을 권장).
   ============================================================ */
const SUPPORTED_LANGS = ['ko', 'en', 'ja', 'zh'];
function langFromPath(){
  const m = location.pathname.match(/^\/(en|ja|zh)(\/|$)/);
  return m ? m[1] : null;
}
// 앱 셸 경로(/, /en/, /ja/, /zh/)에 있을 때만 true — 이때만 주소창의 언어 프리픽스를 고쳐 쓴다.
// (프로토타입 파일을 직접 열었을 때 등 다른 경로에서는 주소를 건드리지 않음)
function isAppShellPath(){
  return /^\/(en\/?|ja\/?|zh\/?)?$/.test(location.pathname);
}
let currentLang = langFromPath() || localStorage.getItem('lang') || 'ko';
if (SUPPORTED_LANGS.indexOf(currentLang) === -1) currentLang = 'ko';
// 저장된 선호 언어와 주소창 프리픽스가 어긋나 있으면(예: 이전에 ja를 골랐던 사람이 /로 재방문)
// 화면 언어에 맞게 주소만 조용히 맞춰준다 — 리다이렉트(재로딩)가 아니라 replaceState라 SEO 무해.
(function(){
  try {
    if (isAppShellPath() && langFromPath() !== (currentLang === 'ko' ? null : currentLang)){
      const prefix = (currentLang === 'ko') ? '/' : '/' + currentLang + '/';
      history.replaceState(null, '', prefix + location.search + location.hash);
    }
  } catch(e){}
})();
let currentView = { type:'landing' };
// 인물/장소 상세 화면의 '뒤로' 버튼이 어디로 돌아가야 하는지 기억해두는 상태.
// (goBack/resolveReturnTarget/backBtnLabel — loadWork() 정의 바로 아래에 있음)
let returnTarget = null;

const UI_STRINGS = {
  ko: {
    headerTagline:"작품 속 그 곳, 지금 가볼 수 있는 곳 — 작품을 고르고 지도를 클릭해보세요.",
    brandBackTitle:"처음 화면으로",
    guideOpenBtn:"❔ 사용법",
    reportOpenBtn:"📝 장소·인물 제안",
    landingKicker:"이야기를 따라, 현실의 장소로",
    landingHeadline:"대한민국 대표 콘텐츠 여행 사이트, 그곳 지금",
    landingBlurb:"'그곳, 지금'은 이야기 속 세계와 현실의 장소를 연결하는 콘텐츠 여행 플랫폼입니다. 소설·영화·드라마·애니메이션·웹툰 속 배경과 촬영지, 인물과 창작자의 흔적을 찾아 하나의 지도 위에 담고 있습니다. 좋아하는 작품을 따라 떠나거나, 지금 내 주변에 숨어 있는 이야기의 장소를 발견해 보세요.",
    landingCardCta:"둘러보기 →",
    guideTitle:"👋 처음이신가요? 이렇게 써보세요",
    guideIntro:"'그곳, 지금'은 제 개인 프로젝트예요 — 이야기 속 장소가 실제로는 어떤 모습인지 궁금해서 만든, 진짜 여행으로 이어지는 지도입니다.",
    guideStep1Title:"지도 위의 점을 클릭하세요",
    guideStep1Desc:"동그란 점이 작중 배경이 된 진짜 장소예요. 클릭하면 오른쪽(모바일은 하단 '정보' 탭)에 자세한 정보가 나와요.",
    guideStep2Title:"📸 사진 더 보기로 실제 모습을 확인하세요",
    guideStep2Desc:"인스타그램·유튜브·트위터 등에서 그 장소를 실제로 찍은 사진과 영상을 바로 찾아볼 수 있어요.",
    guideStep3Title:"실제로 가보기 & 여행 코스 만들기",
    guideStep3Desc:"구글맵 위치 보기, 그리고 '추천 여행 코스 만들기'로 진짜 여행을 계획해보세요.",
    guideStep4Title:"다른 작품으로 갈아타기",
    guideStep4Desc:"상단 탭을 누르거나, 왼쪽 위 로고를 누르면 작품 선택 화면으로 돌아갈 수 있어요.",
    guideToday:"오늘 하루 안 보기",
    guideWeek:"1주일간 안 보기",
    guideConfirm:"확인했어요",
    tabMap:"🗺️ 지도",
    tabInfo:"📋 정보",
    sidebarChooseTitle:"장소를 선택하세요",
    sidebarEmptyHint:"지도 위의 점을 클릭하면 이곳에 상세 정보(작중 지명, 현재 지명, 여행 정보)가 표시됩니다.",
    trailerBtn:"🎬 예고편 보기",
    posterBtn:"🖼️ 공식 포스터·스틸 보기",
    timelineBtn:"📜 연대기 30선 보기",
    sceneTimelineBtn:"📜 주요 장면 36선 보기",
    spotifyBtn:"테마송 듣기",
    timelineImportant:"핵심 사건",
    timelineNoLoc:"지도에 표시된 특정 장소가 없는 사건이에요.",
    timelineGoLoc:"이 장소 보러가기 →",
    courseBtn:"🧭 이 작품 기준 추천 여행 코스 만들기",
    relationsBtn:"🕸️ 등장인물 관계도 보기",
    summaryBtn:"📖 줄거리 요약 보기",
    summaryModalSuffix:"줄거리 요약",
    spoilerWarningTitle:"⚠️ 스포일러 주의",
    spoilerWarningBody:"아래에는 세부 줄거리가 포함되어 있어요. 다만 최종 결말과 반전은 적지 않았으니, 그 부분은 꼭 작품으로 직접 확인해보세요.",
    endingHiddenLabel:"결말 안내",
    peopleTitle:"주요 인물",
    searchResultsTitle:"검색 결과",
    peopleSearchPlaceholder:"이름·역할·장소로 검색 (예: 사천왕, 오사카성)",
    locationSearchLabel:"📍 장소 검색 결과",
    collapseBtn:"▾ 접기",
    expandBtn:"▸ 펼치기",
    moreAboutWorkBtn:"🔎 작품 더 알아보기 (예고편·줄거리·관계도·연대기 등)",
    tabPlacesLabel:"장소",
    tabWorkLabel:"작품",
    tabPeopleLabel:"인물",
    tabTravelLabel:"여행",
    placesListLabel:"전체 장소",
    placesSearchPlaceholder:"장소 이름으로 검색",
    travelCourseLabel:"추천 코스",
    readMore:"📖 줄거리 더 보기 ▾",
    readMoreCollapse:"접기 ▴",
    locTitle:"장소 정보",
    locShareBtn:"📤 공유하기",
    eraOld:"옛 지명",
    eraModern:"현재 지명",
    sceneLabel:"기억나시나요?",
    thenLabel:"🎬 작품 속",
    nowLabel:"📍 지금",
    descShort:"초보자용 짧은 요약",
    descLong:"자세히 보기",
    specialtyLabel:"🍽️ 이 지역 특산물",
    travelLabel:"실제로 가보기",
    mapsBtn:"📍 구글맵에서 이 위치 보기",
    universeMapBtn:"🌌 우주 지도에서 보기",
    universeMapLaunchBtn:"🌌 삼체 우주 지도 열기 (태양계·항성간 공간·함선·사건)",
    wikiBtn:"📖 위키백과에서 더 알아보기",
    socialLabel1:"📸 SNS·영상에서 실제 사진 보기",
    socialLabel2:"🔍 이미지·블로그 검색으로 보기",
    fictionalLocationNote:"🪐 이곳은 소설 속에만 존재하는 가상의 공간이라 실제 사진은 없어요. 대신 아래 작품 해시태그로 팬 아트·독서 후기 등을 찾아볼 수 있어요.",
    crossLabel:"📍 같은 지역, 다른 이야기",
    storyLabel:"📖 이야기 속 이 장소",
    statPeople:"연결된 인물",
    statCross:"가까운 다른 작품 장소",
    statTag:"장소 태그",
    backBtn:"← 작품 소개로 돌아가기",
    backToPeopleBtn:"← 인물 목록으로",
    backToPlacesBtn:"← 장소 목록으로",
    backToLocBtn:"← 이전 장소로",
    backToPersonBtn:"← 이전 인물로",
    photoLoading:"📷 실제 사진을 찾는 중…",
    personTitle:"인물 정보",
    personShareBtn:"🔗 이 인물 링크",
    moreLabel:"더 알아보기",
    personWikiBtn:"📖 위키백과에서 검색",
    actorPhotoBtn:"🎭 배우 프로필 사진 보기",
    sourceLink:"원문 참고자료 ↗",
    locBlockLabel:"관련 장소 (지도에 표시됨)",
    noLocEmpty:"📍 이 인물의 주요 활동지는 소설 속에서 지명이 뚜렷하게 나오지 않아 지도에는 표시되지 않았어요.",
    quickpopupHint:"👉 오른쪽 패널에서 실제 사진과 더 많은 정보를 볼 수 있어요",
    contentNote:"이 부분은 아직 한국어로만 제공됩니다.",
    filterSearchPlaceholder:"작품명·작가로 검색",
    filterCountryLabel:"국가",
    filterMediumLabel:"매체",
    filterGenreLabel:"장르",
    filterAllChip:"전체",
    filterResetBtn:"필터 초기화",
    filterNoResults:"조건에 맞는 작품이 없어요. 필터를 조금 풀어보세요.",
    filterCountLabel:"개 작품",
    workPickerBtn:"작품 선택",
    workPickerToggle:"▾ 필터",
    workPickerCollapse:"▴ 접기",
    nearbyOpenBtn:"📍 내 주변 콘텐츠 투어",
    nearbyModalTitle:"📍 내 주변 콘텐츠 투어",
    countryLocModalTitle:"🌍 국가별 실제 장소",
    countryLocIntro:"이 나라를 배경으로 하는 작품들의 실제 장소예요. 눌러보면 바로 지도에서 볼 수 있어요.",
    countryLocResultCountSuffix:"곳",
    countryLocEmpty:"등록된 장소가 없어요.",
    mapHomeBtnTitle:"처음 위치로",
    offscreenChipPrefix:"📍 다른 지역 장소 ",
    offscreenChipSuffix:"곳 보기 →",
    imgAltTermNovel:"배경지",
    imgAltTermFilmed:"촬영지",
    nearbyIntro:"작품을 먼저 고르지 않아도 돼요. 위치와 반경만 정하면, 그 주변에 있는 모든 작품의 촬영지·인물 관련 장소·전시·음식점을 한 번에 찾아드려요.",
    nearbyUseLocationBtn:"📍 현재 위치 사용",
    nearbyAddressPlaceholder:"도시·주소·관광지 입력 (예: 광화문)",
    nearbySearchBtn:"검색",
    nearbyRadiusLabel:"반경",
    nearbyCategoryLabel:"분류",
    nearbyCategoryAll:"전체",
    nearbyResultCountSuffix:"곳",
    nearbyEmptyBeforeSearch:"위쪽에서 현재 위치를 사용하거나 장소를 입력해보세요.",
    nearbyEmptyNoResults:"이 반경 안에는 아직 등록된 장소가 없어요. 반경을 넓히거나 분류를 초기화해보세요.",
    nearbyGeoError:"위치를 가져오지 못했어요. 브라우저 위치 권한을 확인하거나 직접 입력해주세요.",
    nearbyGeocodeError:"이 주소를 찾지 못했어요. 다른 표현으로 다시 시도해보세요.",
    nearbyGeocoding:"검색 중…",
    nearbyCenterSet:"기준 위치가 설정됐어요:",
    nearbyAddrToggleOpen:"다른 장소로 찾을래요",
    nearbyAddrToggleClose:"▴ 접기",
    nearbyGoBtn:"이 장소 보러가기 →",
    tierOfficial:"공식·직접",
    tierExperience:"체험시설",
    tierTheme:"테마 연계",
    tierDirect:"직접",
    catStory:"작품 배경",
    catFilm:"촬영·제작",
    catCreator:"창작자·인물",
    catCulture:"문화시설",
    catFood:"음식",
    catShopping:"쇼핑",
    catEvent:"행사",
    catExperience:"체험시설",
    nearbyLandingSub:"누르면 지금 계신 곳 주변의 모든 장소가 자동으로 나와요",
    footerAbout:"서비스 소개",
    footerContact:"문의",
    footerPrivacy:"개인정보처리방침",
    footerTerms:"이용약관",
    relationsModalSuffix:"등장인물 관계도",
    infoPageBtn:"📄 이 작품 소개 페이지 보기",
    reportModalTitle:"📝 장소·인물 제안하기",
    reportBody:"여러분이 작품 속에서 아시는 장소나 인물이 이 사이트에 나오지 않거나, 카페·식당 등 작품과 관련된 장소를 알고 계시면 메일을 보내주세요. 장소나 인물 검색에 나오도록 하겠습니다.",
    reportEmailNote:"아래 이메일로 알려주세요",
    footerReportLink:"📝 장소·인물 제안",
    langCnComingSoon:"중국어(간체) 번역은 준비 중이에요. 조금만 기다려 주세요!",
    regionScrollPrev:"이전 지역",
    regionScrollNext:"다음 지역",
    heroRegionBtn:"지역별 여행",
    heroNearbyBtn:"내주변여행",
    heroSearchBtn:"여행지찾기",
    homeIconLabel:"홈",
    heroTodayPickLabel:"오늘의 장소"
  },
  en: {
    headerTagline:"Real places behind the stories you love — pick a story, then click the map.",
    brandBackTitle:"Back to start",
    guideOpenBtn:"❔ Guide",
    reportOpenBtn:"📝 Suggest a place",
    landingKicker:"Follow the story to its real place",
    landingHeadline:"Korea's Leading Content Travel Site — That Place, Now",
    landingBlurb:"'That Place, Now' is a content-travel platform connecting the worlds of stories to real places. It gathers settings and filming locations from novels, movies, dramas, anime, and webtoons — along with the traces of their characters and creators — onto a single map. Follow your favorite story on a trip, or discover the story hiding right around you.",
    landingCardCta:"Explore →",
    guideTitle:"👋 New here? Here's how it works",
    guideIntro:"This is my personal project — a map born from wondering what story settings really look like, built to lead you to a real trip.",
    guideStep1Title:"Click a dot on the map",
    guideStep1Desc:"Each dot is a real place that appears in the story. Click it to see details on the right (or the 'Info' tab on mobile).",
    guideStep2Title:"📸 See real photos with \"Show more photos\"",
    guideStep2Desc:"Jump straight to real photos and videos of that place on Instagram, YouTube, X, and more.",
    guideStep3Title:"Plan a real visit & build a trip",
    guideStep3Desc:"Open the spot in Google Maps, or use \"Build a suggested trip\" to plan an actual visit.",
    guideStep4Title:"Switch to another story",
    guideStep4Desc:"Use the tabs up top, or click the logo in the corner, to go back to the story picker.",
    guideToday:"Hide for today",
    guideWeek:"Hide for a week",
    guideConfirm:"Got it",
    tabMap:"🗺️ Map",
    tabInfo:"📋 Info",
    sidebarChooseTitle:"Choose a place",
    sidebarEmptyHint:"Click a dot on the map to see details here — the name used in the story, its real-world name, and travel info.",
    trailerBtn:"🎬 Watch the trailer",
    posterBtn:"🖼️ View official poster & stills",
    timelineBtn:"📜 View the 30-event chronology",
    sceneTimelineBtn:"📜 View 36 key scenes",
    spotifyBtn:"Listen to the theme song",
    timelineImportant:"Key event",
    timelineNoLoc:"No specific mapped location for this event.",
    timelineGoLoc:"See this place →",
    courseBtn:"🧭 Build a suggested trip for this story",
    relationsBtn:"🕸️ View the character map",
    summaryBtn:"📖 View story summary",
    summaryModalSuffix:"Story Summary",
    spoilerWarningTitle:"⚠️ Spoiler warning",
    spoilerWarningBody:"The summary below includes detailed plot points. The final ending and any twists are intentionally left out — please experience those in the work itself.",
    endingHiddenLabel:"About the ending",
    peopleTitle:"Key characters",
    searchResultsTitle:"Search results",
    peopleSearchPlaceholder:"Search by name, role, or place",
    locationSearchLabel:"📍 Matching places",
    collapseBtn:"▾ Collapse",
    expandBtn:"▸ Expand",
    moreAboutWorkBtn:"🔎 More about this story (trailer, summary, relations, timeline...)",
    tabPlacesLabel:"Places",
    tabWorkLabel:"Story",
    tabPeopleLabel:"Characters",
    tabTravelLabel:"Trip",
    placesListLabel:"All places",
    placesSearchPlaceholder:"Search by place name",
    travelCourseLabel:"Suggested route",
    readMore:"📖 Read more ▾",
    readMoreCollapse:"Collapse ▴",
    locTitle:"Place details",
    locShareBtn:"📤 Share",
    eraOld:"Historic name",
    eraModern:"Modern name",
    sceneLabel:"Remember this scene?",
    thenLabel:"🎬 In the story",
    nowLabel:"📍 Now",
    descShort:"Quick summary",
    descLong:"Full details",
    specialtyLabel:"🍽️ Local specialty",
    travelLabel:"Plan your visit",
    mapsBtn:"📍 Open in Google Maps",
    universeMapBtn:"🌌 View on the universe map",
    wikiBtn:"📖 Learn more on Wikipedia",
    socialLabel1:"📸 See real photos & videos on social media",
    socialLabel2:"🔍 Search images & blogs",
    fictionalLocationNote:"🪐 This place exists only in the novel, so there are no real photos of it. Use the work hashtag below to find fan art and reader discussion instead.",
    crossLabel:"📍 Same area, different story",
    storyLabel:"📖 This place in the story",
    statPeople:"Linked characters",
    statCross:"Nearby places from other stories",
    statTag:"Place tag",
    backBtn:"← Back to the story overview",
    backToPeopleBtn:"← Back to characters",
    backToPlacesBtn:"← Back to places",
    backToLocBtn:"← Back to the previous place",
    backToPersonBtn:"← Back to the previous character",
    photoLoading:"📷 Looking for a real photo…",
    personTitle:"Character details",
    personShareBtn:"🔗 Copy link to this character",
    moreLabel:"Learn more",
    personWikiBtn:"📖 Search on Wikipedia",
    actorPhotoBtn:"🎭 See actor's profile photo",
    sourceLink:"Source ↗",
    locBlockLabel:"Related places (shown on map)",
    noLocEmpty:"📍 This character's key locations aren't clearly named in the story, so they're not shown on the map.",
    quickpopupHint:"👉 See more real photos and details in the panel",
    contentNote:"This section is currently only available in Korean.",
    filterSearchPlaceholder:"Search by title or creator",
    filterCountryLabel:"Country",
    filterMediumLabel:"Medium",
    filterGenreLabel:"Genre",
    filterAllChip:"All",
    filterResetBtn:"Reset filters",
    filterNoResults:"No stories match these filters — try loosening one.",
    filterCountLabel:" stories",
    workPickerBtn:"Choose a story",
    workPickerToggle:"▾ Filters",
    workPickerCollapse:"▴ Collapse",
    nearbyOpenBtn:"📍 Nearby Content Tour",
    nearbyModalTitle:"📍 Nearby Content Tour",
    countryLocModalTitle:"🌍 Real Places by Country",
    countryLocIntro:"Real places from stories set in this country. Tap one to jump straight to it on the map.",
    countryLocResultCountSuffix:" places",
    countryLocEmpty:"No places registered yet.",
    mapHomeBtnTitle:"Reset view",
    offscreenChipPrefix:"📍 ",
    offscreenChipSuffix:" more places off-screen →",
    imgAltTermNovel:"Real Locations",
    imgAltTermFilmed:"Filming Locations",
    nearbyIntro:"No need to pick a story first. Set a location and radius, and we'll find every story's filming spots, character-related places, exhibits, and restaurants nearby — all at once.",
    nearbyUseLocationBtn:"📍 Use my location",
    nearbyAddressPlaceholder:"Enter a city, address, or landmark",
    nearbySearchBtn:"Search",
    nearbyRadiusLabel:"Radius",
    nearbyCategoryLabel:"Category",
    nearbyCategoryAll:"All",
    nearbyResultCountSuffix:" places",
    nearbyEmptyBeforeSearch:"Use your current location or enter a place above to get started.",
    nearbyEmptyNoResults:"No registered places within this radius yet — try widening it or resetting the category.",
    nearbyGeoError:"Couldn't get your location. Check your browser's location permission, or enter a place manually.",
    nearbyGeocodeError:"Couldn't find that address — try a different phrasing.",
    nearbyGeocoding:"Searching…",
    nearbyCenterSet:"Center location set:",
    nearbyAddrToggleOpen:"Search a different place",
    nearbyAddrToggleClose:"▴ Collapse",
    nearbyGoBtn:"See this place →",
    tierOfficial:"Official/Direct",
    tierExperience:"Experience site",
    tierTheme:"Theme-linked",
    tierDirect:"Direct",
    catStory:"Story setting",
    catFilm:"Filming/Production",
    catCreator:"Creator/Figure",
    catCulture:"Museum/Culture",
    catFood:"Food",
    catShopping:"Shopping",
    catEvent:"Event",
    catExperience:"Experience",
    nearbyLandingSub:"Tap it and every nearby location shows up automatically.",
    footerAbout:"About",
    footerContact:"Contact",
    footerPrivacy:"Privacy Policy",
    footerTerms:"Terms",
    relationsModalSuffix:"Character Map",
    infoPageBtn:"📄 View this story's info page",
    reportModalTitle:"📝 Suggest a place or character",
    reportBody:"If a place or character you recognize from a story isn't on this site yet — or if you know a related cafe, restaurant, or spot — please email us. We'll add it so others can find it too.",
    reportEmailNote:"Reach us at the email below",
    universeMapLaunchBtn:"🌌 Open the 3-Body universe map (solar system, interstellar space, ships & events)",
    footerReportLink:"📝 Suggest a place",
    langCnComingSoon:"Simplified Chinese is coming soon — thanks for your patience!",
    regionScrollPrev:"Previous region",
    regionScrollNext:"Next region",
    heroRegionBtn:"Explore by region",
    heroNearbyBtn:"Near me now",
    heroSearchBtn:"Find a trip",
    homeIconLabel:"Home",
    heroTodayPickLabel:"Today's pick"
  },
  // 2026-08 2단계 4-2: 일본어 UI 사전 — ko 사전과 1:1 동일한 키 구성.
  // 표기 원칙: 성지순례 팬덤에서 통용되는 어휘(聖地巡礼·ロケ地)를 쓰고, 존댓말(です·ます)로 통일.
  ja: {
    headerTagline:"物語の中のあの場所へ、いま行ける — 作品を選んで地図をクリックしてみてください。",
    brandBackTitle:"最初の画面へ",
    guideOpenBtn:"❔ 使い方",
    reportOpenBtn:"📝 場所・人物を提案",
    landingKicker:"物語をたどって、現実の場所へ",
    landingHeadline:"韓国代表・コンテンツ旅行サイト「あの場所、いま」",
    landingBlurb:"「あの場所、いま」は物語の世界と現実の場所をつなぐコンテンツ旅行プラットフォームです。小説・映画・ドラマ・アニメ・ウェブトゥーンの舞台やロケ地、人物と作り手の足跡をひとつの地図にまとめています。好きな作品をたどって旅に出るもよし、いまいる場所の近くに隠れた物語の舞台を見つけるもよし。",
    landingCardCta:"見てみる →",
    guideTitle:"👋 はじめてですか？こう使ってみてください",
    guideIntro:"「あの場所、いま」は個人プロジェクトです — 物語の舞台が実際はどんな姿なのか気になって作った、本当の旅につながる地図です。",
    guideStep1Title:"地図上の点をクリック",
    guideStep1Desc:"丸い点が作品の舞台になった実在の場所です。クリックすると右側（モバイルは下の「情報」タブ)に詳しい情報が表示されます。",
    guideStep2Title:"📸 「写真をもっと見る」で実際の姿をチェック",
    guideStep2Desc:"Instagram・YouTube・Xなどで、その場所を実際に撮った写真や動画をすぐ探せます。",
    guideStep3Title:"実際に行ってみる & 旅行コースを作る",
    guideStep3Desc:"Googleマップで位置を確認し、「おすすめ旅行コースを作る」で本当の旅を計画してみましょう。",
    guideStep4Title:"別の作品に乗り換える",
    guideStep4Desc:"上部のタブを押すか、左上のロゴを押すと作品選択画面に戻れます。",
    guideToday:"今日は表示しない",
    guideWeek:"1週間表示しない",
    guideConfirm:"確認しました",
    tabMap:"🗺️ 地図",
    tabInfo:"📋 情報",
    sidebarChooseTitle:"場所を選んでください",
    sidebarEmptyHint:"地図上の点をクリックすると、ここに詳細情報（作中の地名、現在の地名、旅行情報）が表示されます。",
    trailerBtn:"🎬 予告編を見る",
    posterBtn:"🖼️ 公式ポスター・スチールを見る",
    timelineBtn:"📜 年表30選を見る",
    sceneTimelineBtn:"📜 主要シーン36選を見る",
    spotifyBtn:"テーマソングを聴く",
    timelineImportant:"重要な出来事",
    timelineNoLoc:"地図上に特定の場所が示されていない出来事です。",
    timelineGoLoc:"この場所を見に行く →",
    courseBtn:"🧭 この作品のおすすめ旅行コースを作る",
    relationsBtn:"🕸️ 登場人物の相関図を見る",
    summaryBtn:"📖 あらすじを見る",
    summaryModalSuffix:"あらすじ",
    spoilerWarningTitle:"⚠️ ネタバレ注意",
    spoilerWarningBody:"以下には詳しいあらすじが含まれます。ただし結末とどんでん返しは書いていませんので、その部分はぜひ作品でお確かめください。",
    endingHiddenLabel:"結末について",
    peopleTitle:"主要人物",
    searchResultsTitle:"検索結果",
    peopleSearchPlaceholder:"名前・役柄・場所で検索",
    locationSearchLabel:"📍 場所の検索結果",
    collapseBtn:"▾ たたむ",
    expandBtn:"▸ ひらく",
    moreAboutWorkBtn:"🔎 作品をもっと知る（予告編・あらすじ・相関図・年表など）",
    tabPlacesLabel:"場所",
    tabWorkLabel:"作品",
    tabPeopleLabel:"人物",
    tabTravelLabel:"旅",
    placesListLabel:"すべての場所",
    placesSearchPlaceholder:"場所の名前で検索",
    travelCourseLabel:"おすすめコース",
    readMore:"📖 続きを読む ▾",
    readMoreCollapse:"たたむ ▴",
    locTitle:"場所の情報",
    locShareBtn:"📤 共有する",
    eraOld:"昔の地名",
    eraModern:"現在の地名",
    sceneLabel:"覚えていますか？",
    thenLabel:"🎬 作品の中",
    nowLabel:"📍 いま",
    descShort:"はじめての方向けの短い要約",
    descLong:"詳しく見る",
    specialtyLabel:"🍽️ この地域の名物",
    travelLabel:"実際に行ってみる",
    mapsBtn:"📍 Googleマップでこの場所を見る",
    universeMapBtn:"🌌 宇宙地図で見る",
    universeMapLaunchBtn:"🌌 三体の宇宙地図を開く（太陽系・恒星間空間・艦船・事件）",
    wikiBtn:"📖 Wikipediaでもっと知る",
    socialLabel1:"📸 SNS・動画で実際の写真を見る",
    socialLabel2:"🔍 画像・ブログ検索で見る",
    fictionalLocationNote:"🪐 ここは小説の中にだけ存在する架空の場所なので、実際の写真はありません。代わりに下の作品ハッシュタグでファンアートや感想を探せます。",
    crossLabel:"📍 同じ地域、別の物語",
    storyLabel:"📖 物語の中のこの場所",
    statPeople:"関連する人物",
    statCross:"近くの他作品の場所",
    statTag:"場所タグ",
    backBtn:"← 作品紹介に戻る",
    backToPeopleBtn:"← 人物一覧に戻る",
    backToPlacesBtn:"← 場所一覧に戻る",
    backToLocBtn:"← 前の場所に戻る",
    backToPersonBtn:"← 前の人物に戻る",
    photoLoading:"📷 実際の写真を探しています…",
    personTitle:"人物情報",
    personShareBtn:"🔗 この人物のリンク",
    moreLabel:"もっと知る",
    personWikiBtn:"📖 Wikipediaで検索",
    actorPhotoBtn:"🎭 俳優のプロフィール写真を見る",
    sourceLink:"参考資料 ↗",
    locBlockLabel:"関連する場所（地図に表示）",
    noLocEmpty:"📍 この人物の主な活動地は作中で地名がはっきり出てこないため、地図には表示していません。",
    quickpopupHint:"👉 右のパネルで実際の写真と詳しい情報が見られます",
    contentNote:"この部分はまだ日本語に対応していません。",
    filterSearchPlaceholder:"作品名・作者で検索",
    filterCountryLabel:"国",
    filterMediumLabel:"メディア",
    filterGenreLabel:"ジャンル",
    filterAllChip:"すべて",
    filterResetBtn:"フィルターをリセット",
    filterNoResults:"条件に合う作品がありません。フィルターを少し緩めてみてください。",
    filterCountLabel:"作品",
    workPickerBtn:"作品を選ぶ",
    workPickerToggle:"▾ フィルター",
    workPickerCollapse:"▴ たたむ",
    nearbyOpenBtn:"📍 近くのコンテンツツアー",
    nearbyModalTitle:"📍 近くのコンテンツツアー",
    countryLocModalTitle:"🌍 国別の実在スポット",
    countryLocIntro:"この国が舞台になっている作品の実在スポットです。タップするとすぐ地図で見られます。",
    countryLocResultCountSuffix:"件",
    countryLocEmpty:"登録されたスポットがありません。",
    mapHomeBtnTitle:"初期表示に戻る",
    offscreenChipPrefix:"📍 画面外に他の場所 ",
    offscreenChipSuffix:"件 →",
    imgAltTermNovel:"舞台",
    imgAltTermFilmed:"ロケ地",
    nearbyIntro:"先に作品を選ばなくても大丈夫。位置と半径を決めるだけで、その周辺にあるすべての作品のロケ地・人物ゆかりの場所・展示・飲食店を一度に探せます。",
    nearbyUseLocationBtn:"📍 現在地を使う",
    nearbyAddressPlaceholder:"都市・住所・観光地を入力（例：明洞）",
    nearbySearchBtn:"検索",
    nearbyRadiusLabel:"半径",
    nearbyCategoryLabel:"分類",
    nearbyCategoryAll:"すべて",
    nearbyResultCountSuffix:"件",
    nearbyEmptyBeforeSearch:"上で現在地を使うか、場所を入力してみてください。",
    nearbyEmptyNoResults:"この半径内にはまだ登録された場所がありません。半径を広げるか、分類をリセットしてみてください。",
    nearbyGeoError:"位置情報を取得できませんでした。ブラウザの位置情報の許可を確認するか、直接入力してください。",
    nearbyGeocodeError:"この住所が見つかりませんでした。別の表現でもう一度お試しください。",
    nearbyGeocoding:"検索中…",
    nearbyCenterSet:"基準位置を設定しました：",
    nearbyAddrToggleOpen:"別の場所から探す",
    nearbyAddrToggleClose:"▴ たたむ",
    nearbyGoBtn:"この場所を見に行く →",
    tierOfficial:"公式・直接",
    tierExperience:"体験施設",
    tierTheme:"テーマ関連",
    tierDirect:"直接",
    catStory:"作品の舞台",
    catFilm:"撮影・製作",
    catCreator:"作り手・人物",
    catCulture:"文化施設",
    catFood:"グルメ",
    catShopping:"ショッピング",
    catEvent:"イベント",
    catExperience:"体験施設",
    nearbyLandingSub:"押すと、近くのすべての場所が自動的に表示されます。",
    footerAbout:"サービス紹介",
    footerContact:"お問い合わせ",
    footerPrivacy:"プライバシーポリシー",
    footerTerms:"利用規約",
    relationsModalSuffix:"登場人物相関図",
    infoPageBtn:"📄 この作品の紹介ページを見る",
    reportModalTitle:"📝 場所・人物を提案する",
    reportBody:"作品に出てくる場所や人物がこのサイトに載っていない場合や、カフェ・レストランなど作品ゆかりの場所をご存じの場合は、メールでお知らせください。検索に出るように追加します。",
    reportEmailNote:"下のメールアドレスまでどうぞ",
    footerReportLink:"📝 場所・人物を提案",
    langCnComingSoon:"簡体字中国語の翻訳は準備中です。もう少しお待ちください！",
    regionScrollPrev:"前の地域",
    regionScrollNext:"次の地域",
    heroRegionBtn:"地域で旅する",
    heroNearbyBtn:"近くを旅する",
    heroSearchBtn:"旅先を探す",
    homeIconLabel:"ホーム",
    heroTodayPickLabel:"今日のおすすめ"
  },
  // 2026-08 3단계: 번체 중문(대만·홍콩 대상) UI 사전 — ko 사전과 1:1 동일한 키 구성.
  // GSC 분석 결과 구글 검색이 그대로 통하는 번체(대만·홍콩)를 먼저 서비스하기로 결정
  // (간체·바이두 시장은 별도 프로젝트로 보류). 존댓말 톤(您/請)으로 통일.
  zh: {
    headerTagline:"故事中的那個地方，現在就能去 — 選一部作品，點擊地圖看看吧。",
    brandBackTitle:"回到首頁",
    guideOpenBtn:"❔ 使用說明",
    reportOpenBtn:"📝 提議地點・人物",
    landingKicker:"跟著故事，走進真實的地方",
    landingHeadline:"韓國代表性內容旅遊網站「那個地方，現在」",
    landingBlurb:"「那個地方，現在」是一個連結故事世界與現實地點的內容旅遊平台。我們將小說、電影、電視劇、動畫、網漫中的背景與拍攝地、人物與創作者的足跡，統整在同一張地圖上。跟隨你喜歡的作品出發旅行，或發現藏在你身邊的故事場景吧。",
    landingCardCta:"看看 →",
    guideTitle:"👋 第一次使用嗎？教你怎麼玩",
    guideIntro:"「那個地方，現在」是我的個人專案 — 因為好奇故事裡的場景實際上長什麼樣子而做的地圖，能真的帶你去旅行。",
    guideStep1Title:"點擊地圖上的圓點",
    guideStep1Desc:"圓點就是作品中出現的真實地點。點擊後，詳細資訊會顯示在右側（手機版在下方的「資訊」分頁）。",
    guideStep2Title:"📸 用「看更多照片」確認實際樣貌",
    guideStep2Desc:"可以直接在 Instagram、YouTube、X 等平台找到該地點的實際照片與影片。",
    guideStep3Title:"實際前往 & 規劃旅行路線",
    guideStep3Desc:"在 Google 地圖上查看位置，並用「建立推薦旅行路線」規劃一趟真正的旅行吧。",
    guideStep4Title:"切換到別部作品",
    guideStep4Desc:"點擊上方分頁，或點左上角的 Logo，就能回到作品選擇畫面。",
    guideToday:"今天不再顯示",
    guideWeek:"一週內不再顯示",
    guideConfirm:"我知道了",
    tabMap:"🗺️ 地圖",
    tabInfo:"📋 資訊",
    sidebarChooseTitle:"請選擇一個地點",
    sidebarEmptyHint:"點擊地圖上的圓點，這裡就會顯示詳細資訊（劇中地名、現在地名、旅遊資訊）。",
    trailerBtn:"🎬 觀看預告片",
    posterBtn:"🖼️ 查看官方海報・劇照",
    timelineBtn:"📜 查看30大事件年表",
    sceneTimelineBtn:"📜 查看36個重要場景",
    spotifyBtn:"聆聽主題曲",
    timelineImportant:"關鍵事件",
    timelineNoLoc:"這個事件沒有標示在地圖上的特定地點。",
    timelineGoLoc:"前往這個地點 →",
    courseBtn:"🧭 建立這部作品的推薦旅行路線",
    relationsBtn:"🕸️ 查看人物關係圖",
    summaryBtn:"📖 查看劇情摘要",
    summaryModalSuffix:"劇情摘要",
    spoilerWarningTitle:"⚠️ 劇透警告",
    spoilerWarningBody:"以下包含詳細劇情。不過最終結局與反轉並未寫出，這部分請務必親自透過作品確認。",
    endingHiddenLabel:"關於結局",
    peopleTitle:"主要人物",
    searchResultsTitle:"搜尋結果",
    peopleSearchPlaceholder:"以姓名・角色・地點搜尋",
    locationSearchLabel:"📍 地點搜尋結果",
    collapseBtn:"▾ 收合",
    expandBtn:"▸ 展開",
    moreAboutWorkBtn:"🔎 更多關於這部作品（預告片・劇情摘要・關係圖・年表等）",
    tabPlacesLabel:"地點",
    tabWorkLabel:"作品",
    tabPeopleLabel:"人物",
    tabTravelLabel:"旅行",
    placesListLabel:"所有地點",
    placesSearchPlaceholder:"以地點名稱搜尋",
    travelCourseLabel:"推薦路線",
    readMore:"📖 閱讀更多 ▾",
    readMoreCollapse:"收合 ▴",
    locTitle:"地點資訊",
    locShareBtn:"📤 分享",
    eraOld:"舊地名",
    eraModern:"現今地名",
    sceneLabel:"還記得這個場景嗎？",
    thenLabel:"🎬 作品中",
    nowLabel:"📍 現在",
    descShort:"新手簡短摘要",
    descLong:"查看詳情",
    specialtyLabel:"🍽️ 當地特產",
    travelLabel:"實際前往",
    mapsBtn:"📍 在Google地圖上查看此地點",
    universeMapBtn:"🌌 在宇宙地圖上查看",
    universeMapLaunchBtn:"🌌 開啟三體宇宙地圖（太陽系・星際空間・艦船・事件）",
    wikiBtn:"📖 在維基百科了解更多",
    socialLabel1:"📸 在社群・影音平台看真實照片",
    socialLabel2:"🔍 用圖片・部落格搜尋查看",
    fictionalLocationNote:"🪐 這裡只存在於小說中，是虛構的空間，沒有實際照片。你可以透過下方的作品主題標籤尋找粉絲創作、讀後感等內容。",
    crossLabel:"📍 同一地區，不同故事",
    storyLabel:"📖 故事中的這個地點",
    statPeople:"相關人物",
    statCross:"附近其他作品的地點",
    statTag:"地點標籤",
    backBtn:"← 回到作品介紹",
    backToPeopleBtn:"← 回到人物列表",
    backToPlacesBtn:"← 回到地點列表",
    backToLocBtn:"← 回到上一個地點",
    backToPersonBtn:"← 回到上一位人物",
    photoLoading:"📷 正在尋找實際照片…",
    personTitle:"人物資訊",
    personShareBtn:"🔗 複製這位人物的連結",
    moreLabel:"了解更多",
    personWikiBtn:"📖 在維基百科搜尋",
    actorPhotoBtn:"🎭 查看演員檔案照片",
    sourceLink:"參考資料 ↗",
    locBlockLabel:"相關地點（顯示於地圖上）",
    noLocEmpty:"📍 這位人物的主要活動地點在作品中沒有明確標示地名，因此未顯示在地圖上。",
    quickpopupHint:"👉 在右側面板可以看到實際照片與更多資訊",
    contentNote:"此部分目前僅提供韓文版本。",
    filterSearchPlaceholder:"以作品名・作者搜尋",
    filterCountryLabel:"國家",
    filterMediumLabel:"媒體類型",
    filterGenreLabel:"類型",
    filterAllChip:"全部",
    filterResetBtn:"重設篩選",
    filterNoResults:"沒有符合條件的作品，試著放寬篩選條件看看。",
    filterCountLabel:" 部作品",
    workPickerBtn:"選擇作品",
    workPickerToggle:"▾ 篩選",
    workPickerCollapse:"▴ 收合",
    nearbyOpenBtn:"📍 附近內容之旅",
    nearbyModalTitle:"📍 附近內容之旅",
    countryLocModalTitle:"🌍 各國實際地點",
    countryLocIntro:"以這個國家為背景的作品中的實際地點。點擊即可直接在地圖上查看。",
    countryLocResultCountSuffix:" 處",
    countryLocEmpty:"尚無登錄的地點。",
    mapHomeBtnTitle:"回到初始畫面",
    offscreenChipPrefix:"📍 畫面外還有其他地點 ",
    offscreenChipSuffix:" 處 →",
    imgAltTermNovel:"故事背景地",
    imgAltTermFilmed:"拍攝地",
    nearbyIntro:"不需要先選作品。只要設定位置和範圍，就能一次找到附近所有作品的拍攝地、人物相關地點、展覽和餐廳。",
    nearbyUseLocationBtn:"📍 使用目前位置",
    nearbyAddressPlaceholder:"輸入城市・地址・景點（例：明洞）",
    nearbySearchBtn:"搜尋",
    nearbyRadiusLabel:"範圍",
    nearbyCategoryLabel:"分類",
    nearbyCategoryAll:"全部",
    nearbyResultCountSuffix:" 處",
    nearbyEmptyBeforeSearch:"請先在上方使用目前位置，或輸入地點。",
    nearbyEmptyNoResults:"這個範圍內還沒有登錄的地點，試著擴大範圍或重設分類看看。",
    nearbyGeoError:"無法取得您的位置。請確認瀏覽器的位置權限，或直接輸入地點。",
    nearbyGeocodeError:"找不到這個地址，請試著用不同的說法再搜尋一次。",
    nearbyGeocoding:"搜尋中…",
    nearbyCenterSet:"已設定基準位置：",
    nearbyAddrToggleOpen:"搜尋其他地點",
    nearbyAddrToggleClose:"▴ 收合",
    nearbyGoBtn:"前往這個地點 →",
    tierOfficial:"官方・直接",
    tierExperience:"體驗設施",
    tierTheme:"主題關聯",
    tierDirect:"直接",
    catStory:"作品背景",
    catFilm:"拍攝・製作",
    catCreator:"創作者・人物",
    catCulture:"文化設施",
    catFood:"美食",
    catShopping:"購物",
    catEvent:"活動",
    catExperience:"體驗設施",
    nearbyLandingSub:"點擊後，會自動顯示您附近的所有地點",
    footerAbout:"關於本站",
    footerContact:"聯絡我們",
    footerPrivacy:"隱私權政策",
    footerTerms:"使用條款",
    relationsModalSuffix:"人物關係圖",
    infoPageBtn:"📄 查看這部作品的介紹頁面",
    reportModalTitle:"📝 提議地點・人物",
    reportBody:"如果您知道作品中出現、但本站尚未收錄的地點或人物，或是與作品相關的咖啡廳、餐廳等地點，歡迎來信告訴我們，我們會加入搜尋結果中。",
    reportEmailNote:"請透過以下電子郵件與我們聯絡",
    footerReportLink:"📝 提議地點・人物",
    regionScrollPrev:"上一個地區",
    regionScrollNext:"下一個地區",
    heroRegionBtn:"依地區旅行",
    heroNearbyBtn:"附近旅行",
    heroSearchBtn:"尋找旅遊地",
    homeIconLabel:"首頁",
    heroTodayPickLabel:"今日推薦地點"
  }
};
function t(key){
  const dict = UI_STRINGS[currentLang] || UI_STRINGS.ko;
  if (dict[key] !== undefined) return dict[key];
  // ja에 아직 없는 키는 영어로 폴백(파일 상단 폴백 체인 원칙: ja → en → ko)
  if (UI_STRINGS.en && UI_STRINGS.en[key] !== undefined) return UI_STRINGS.en[key];
  return (UI_STRINGS.ko[key] !== undefined) ? UI_STRINGS.ko[key] : key;
}
// 데이터 쪽 다국어 필드 선택: ja 모드면 _ja → _en → 원본, en 모드면 _en → 원본
function tField(obj, field){
  if (!obj) return '';
  if (currentLang === 'ja'){
    if (obj[field + '_ja']) return obj[field + '_ja'];
    if (obj[field + '_en']) return obj[field + '_en'];
  }
  if (currentLang === 'zh'){
    if (obj[field + '_zh']) return obj[field + '_zh'];
    if (obj[field + '_en']) return obj[field + '_en'];
  }
  if (currentLang === 'en' && obj[field + '_en']) return obj[field + '_en'];
  return obj[field] || '';
}
// 2026-08 버그 수정: 인물(person) 데이터는 name/years/role/faction/period/historicity/description이
// 전부 한국어 원본만 있고 tField가 찾는 접미어 규칙(_en 우선)과 달리 지금은 _ja만 채워져 있어서
// 별도 헬퍼로 분리한다. 일본어 선택 시에도 인물 상세·목록에 한글이 그대로 남아있던 문제(사용자 지적)를
// 해결하기 위한 것 — ja 필드가 없는 인물은 조용히 원본(한국어)으로 폴백한다.
function pField(obj, field){
  if (!obj) return '';
  if (currentLang === 'ja' && obj[field + '_ja']) return obj[field + '_ja'];
  if (currentLang === 'zh' && obj[field + '_zh']) return obj[field + '_zh'];
  return obj[field] || '';
}
// 언어별 정적 허브 페이지(/works/, /en/works/, /ja/works/, /zh/works/) 경로.
// ja/zh 허브 페이지는 번역이 완료된 작품(title_ja/title_zh 보유)에만 실제 파일이 존재하므로,
// 미번역 작품은 영어 허브로 보낸다 — 존재하지 않는 링크를 만들지 않기 위함.
// (generate_work_pages.js도 같은 조건으로 ja/zh 페이지를 생성하므로 항상 일치함)
function workHubPath(w){
  if (currentLang === 'ja') return (w && w.title_ja) ? '/ja/works/' + w.id + '/' : '/en/works/' + w.id + '/';
  if (currentLang === 'zh') return (w && w.title_zh) ? '/zh/works/' + w.id + '/' : '/en/works/' + w.id + '/';
  if (currentLang === 'en') return '/en/works/' + w.id + '/';
  return '/works/' + w.id + '/';
}

/* ---------- 공통 유틸: 거리 계산, 파벌 색상, 방문기록, 토스트, 공유 ---------- */
function haversineKm(a, b){
  const R = 6371, toRad = function(d){ return d * Math.PI / 180; };
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/* ============================================================
   연결등급(connectionTier) / 카테고리(category) 자동 판정 — 2026-08 신규
   개별 장소마다 새 필드를 수백 곳씩 수작업으로 채우는 대신, 이미 각 장소의
   tag/tag_en에 쓰여온 관습적 표기(FILMED — .../EXPERIENCE — .../설정 장면 등)와
   설명 텍스트의 키워드에서 등급·카테고리를 그때그때 계산해낸다.
   완벽하지 않은 휴리스틱이지만, 400곳이 넘는 기존 장소를 재작업 없이 즉시
   써먹을 수 있다는 게 핵심 — 오탐이 보이면 그때그때 해당 장소의 tag만
   다듬어도 자동으로 등급이 바뀐다.
   ============================================================ */
function deriveConnectionTier(loc){
  const hay = ((loc.tag_en || '') + ' ' + (loc.tag || '')).toUpperCase();
  if (hay.indexOf('FILMED') !== -1) return 'official';
  if (hay.indexOf('EXPERIENCE') !== -1) return 'experience';
  if (hay.indexOf('설정') !== -1 || hay.indexOf('STORY SETTING') !== -1 || hay.indexOf('허구') !== -1) return 'theme';
  // FILMED/EXPERIENCE 관습이 없는 구작(대망·너의 이름은·스즈메·폭싹속았수다·삼체 지구 장소 등)은
  // 실제 역사·성지순례 현장을 직접 다루는 경우가 대부분이라 '직접'을 기본값으로 둔다.
  return 'direct';
}
const TIER_LABEL_KEY = { official:'tierOfficial', experience:'tierExperience', theme:'tierTheme', direct:'tierDirect' };
const TIER_COLOR = { official:'#3ac07c', experience:'#3a7ce0', theme:'#c9a227', direct:'#8a8fa3' };

function deriveCategory(loc){
  const hay = ((loc.tag || '') + ' ' + (loc.description || '') + ' ' + (loc.modernName || '')).toLowerCase();
  if (/박물관|뮤지엄|미술관|전시관|기록관|도서관|문학관/.test(hay)) return 'catCulture';
  if (/레스토랑|카페|음식|맛집|식당|메뉴|디저트|베이커리/.test(hay)) return 'catFood';
  if (/스튜디오|세트장|촬영지|촬영 스튜디오|사운드스테이지/.test(hay)) return 'catFilm';
  if (/생가|묘소|무덤|고향|탄생지|집필|사무실|모교/.test(hay)) return 'catCreator';
  if (/축제|콘서트|행사|팝업|공연|이벤트|기간 한정/.test(hay)) return 'catEvent';
  if (/테마파크|체험관|투어 프로그램|유니버설 스튜디오|굿즈숍|기념품점|팝업스토어/.test(hay)) return 'catExperience';
  if (/쇼핑|서점|음반점/.test(hay)) return 'catShopping';
  return 'catStory';
}

/* ============================================================
   내 주변 콘텐츠 투어 — 전체 작품 통합 장소 인덱스 (2026-08 신규)
   작품을 먼저 고르지 않고, 사용자의 현재 위치(또는 입력한 위치) 기준
   반경 안의 모든 작품 관련 실제 장소를 한 목록으로 찾아준다.
   DATA{}는 페이지 로드시 이미 전 작품이 다 채워져 있으므로, lat/lng을
   가진 장소만 뽑아 한 번 평탄화해두고 이후 매 검색마다 재사용한다.
   ============================================================ */
let _allLocationsIndex = null;
function getAllLocationsIndex(){
  if (_allLocationsIndex) return _allLocationsIndex;
  const out = [];
  Object.keys(DATA).forEach(function(workId){
    const work = WORKS.find(function(w){ return w.id === workId; });
    if (!work) return;
    const locs = (DATA[workId] && DATA[workId].locations) || [];
    locs.forEach(function(loc){
      if (loc.lat == null || loc.lng == null) return; // 우주/가상 장소는 좌표가 없어 자연스럽게 제외됨
      out.push({
        workId: workId, workTitle: work.title, workPinColor: work.pinColor,
        locId: loc.id, lat: loc.lat, lng: loc.lng,
        name: loc.nameInWork || loc.modernName, modernName: loc.modernName,
        tag: loc.tag, tag_en: loc.tag_en,
        tier: deriveConnectionTier(loc), category: deriveCategory(loc)
      });
    });
  });
  _allLocationsIndex = out;
  return out;
}

const FACTION_PALETTE = ['#e0603a','#3a7ce0','#3ac07c','#c03ae0','#e0c03a','#3ae0c0','#e03a7c','#7c3ae0'];
function factionColor(faction){
  const s = faction || '기타';
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FACTION_PALETTE[h % FACTION_PALETTE.length];
}

function getVisited(workId){
  try { return JSON.parse(localStorage.getItem('visited_' + workId) || '[]'); } catch(e){ return []; }
}
function markVisited(workId, locId){
  const v = getVisited(workId);
  if (v.indexOf(locId) === -1){ v.push(locId); localStorage.setItem('visited_' + workId, JSON.stringify(v)); }
}
function renderProgressBadge(work, data){
  const el = document.getElementById('progressBadge');
  if (!el) return;
  const visited = getVisited(work.id).filter(function(id){ return data.locations.some(function(l){ return l.id === id; }); });
  el.textContent = '✅ ' + visited.length + ' / ' + data.locations.length + '곳 확인';
}

function showToast(msg){
  let t = document.getElementById('toast');
  if (!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

function openRelationsModal(workId){
  const work = WORKS.find(function(w){ return w.id === workId; });
  document.getElementById('relationsModalTitle').textContent = (work ? tField(work, 'title') + ' · ' : '') + t('relationsModalSuffix');
  document.getElementById('relationsFrame').src = 'contentmap_relations.html?work=' + encodeURIComponent(workId);
  document.getElementById('relationsModal').classList.add('show');
}
function closeRelationsModal(){
  document.getElementById('relationsModal').classList.remove('show');
  document.getElementById('relationsFrame').src = '';
}
window.openRelationsModal = openRelationsModal;
window.closeRelationsModal = closeRelationsModal;

/* ---------- 장소·인물 제안 모달 (2026-08: 미완성 구글폼 대신 안내문+이메일로 교체) ---------- */
function openReportModal(){
  const modal = document.getElementById('reportModal');
  if (modal) modal.classList.add('show');
}
function closeReportModal(){
  const modal = document.getElementById('reportModal');
  if (modal) modal.classList.remove('show');
}
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;

/* ---------- 작품 내용 상세(개조식 줄거리) 모달 — 결말/반전은 적지 않고 안내 문구로 대체 ---------- */
function renderContentSummaryHtml(work){
  const cs = work.contentSummary;
  if (!cs) return '<div class="empty-state">' + (currentLang === 'ja' ? 'この作品はまだ準備中です。' : (currentLang !== 'ko' ? 'Not available yet for this story.' : '아직 준비되지 않았어요.')) + '</div>';
  const contentNoteHtml = (currentLang !== 'ko')
    ? '<div style="font-size:11px;color:var(--sub);margin-bottom:14px;">' + t('contentNote') + '</div>' : '';
  const sectionsHtml = cs.sections.map(function(sec){
    return '<div class="summary-section"><h4>' + sec.heading + '</h4><ul>' +
      sec.bullets.map(function(b){ return '<li>' + b + '</li>'; }).join('') +
      '</ul></div>';
  }).join('');
  const endingHtml = cs.endingNote ?
    '<div class="summary-ending-box"><span class="label">' + t('endingHiddenLabel') + '</span><div class="text">' + cs.endingNote + '</div></div>' : '';
  return contentNoteHtml + sectionsHtml + endingHtml;
}
function openSummaryModal(workId){
  const work = WORKS.find(function(w){ return w.id === workId; });
  if (!work) return;
  document.getElementById('summaryModalTitle').textContent = tField(work, 'title') + ' · ' + t('summaryModalSuffix');
  document.getElementById('summaryBody').innerHTML =
    '<div class="spoiler-banner"><span class="icon">⚠️</span><div><span class="label">' + t('spoilerWarningTitle') + '</span><div class="text">' + t('spoilerWarningBody') + '</div></div></div>' +
    renderContentSummaryHtml(work);
  document.getElementById('summaryModal').classList.add('show');
}
function closeSummaryModal(){
  document.getElementById('summaryModal').classList.remove('show');
}
window.openSummaryModal = openSummaryModal;
window.closeSummaryModal = closeSummaryModal;

/* ---------- 작품 퀴즈 모달 (2026-08 9라운드 — 폭싹속았수다 파일럿) ----------
   QUIZ_DATA[workId]가 있는 작품에서만 동작. 지금은 폭싹속았수다 하나뿐이라
   ko 화면에서만 버튼을 노출한다(travelTabHtml 쪽 조건 참고) — en/ja 번역은
   전체 작품으로 넓힐 때 함께 할 예정([[geugotjigeum_planner_review_20260820]]
   참고, 다음에 이어갈 항목으로 메모리에 남겨둠). */
let quizState = null; // { workId, idx, correctCount, unlocked:[{type,text}] }
function openQuizModal(workId){
  const quiz = window.QUIZ_DATA && window.QUIZ_DATA[workId];
  if (!quiz) return;
  quizState = { workId: workId, idx: 0, correctCount: 0, unlocked: [], answered: false };
  document.getElementById('quizModalTitle').textContent = '🍊 ' + quiz.title;
  renderQuizQuestion();
  document.getElementById('quizModal').classList.add('show');
}
function closeQuizModal(){
  const modal = document.getElementById('quizModal');
  if (modal) modal.classList.remove('show');
}
function renderQuizQuestion(){
  const quiz = window.QUIZ_DATA[quizState.workId];
  const body = document.getElementById('quizBody');
  if (quizState.idx >= quiz.questions.length){
    renderQuizResult();
    return;
  }
  const q = quiz.questions[quizState.idx];
  quizState.answered = false;
  body.innerHTML =
    '<div class="quiz-progress">문제 ' + (quizState.idx + 1) + ' / ' + quiz.questions.length + ' · 정답 ' + quizState.correctCount + '개</div>' +
    '<div class="quiz-question">' + q.q + '</div>' +
    '<div class="quiz-options" id="quizOptions">' +
      q.options.map(function(opt, i){
        return '<button class="quiz-option-btn" onclick="answerQuiz(' + i + ')">' + opt + '</button>';
      }).join('') +
    '</div>' +
    '<div id="quizFeedback"></div>';
}
function answerQuiz(optIdx){
  if (quizState.answered) return;
  quizState.answered = true;
  const quiz = window.QUIZ_DATA[quizState.workId];
  const q = quiz.questions[quizState.idx];
  const isCorrect = optIdx === q.correct;
  const buttons = document.querySelectorAll('#quizOptions .quiz-option-btn');
  buttons.forEach(function(btn, i){
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === optIdx) btn.classList.add('wrong');
  });
  const feedback = document.getElementById('quizFeedback');
  if (isCorrect){
    quizState.correctCount++;
    quizState.unlocked.push(q.reward);
    const rewardLabel = q.reward.type === 'secret' ? '🔓 비밀 해제' : '🔮 운세 해제';
    feedback.innerHTML =
      '<div class="quiz-feedback correct">✅ 정답이에요!</div>' +
      '<div class="quiz-reward-box"><span class="label">' + rewardLabel + '</span><div class="text">' + q.reward.text + '</div></div>' +
      '<button class="course-btn" style="margin-top:12px;" onclick="nextQuiz()">다음 문제 →</button>';
  } else {
    feedback.innerHTML =
      '<div class="quiz-feedback wrong">❌ 아쉬워요, 정답은 "' + q.options[q.correct] + '"였어요.</div>' +
      '<button class="course-btn" style="margin-top:12px;" onclick="nextQuiz()">다음 문제 →</button>';
  }
}
function nextQuiz(){
  quizState.idx++;
  renderQuizQuestion();
}
function renderQuizResult(){
  const quiz = window.QUIZ_DATA[quizState.workId];
  const total = quiz.questions.length;
  const body = document.getElementById('quizBody');
  const secretCount = quizState.unlocked.filter(function(r){ return r.type === 'secret'; }).length;
  const fortuneCount = quizState.unlocked.filter(function(r){ return r.type === 'fortune'; }).length;
  const rewardListHtml = quizState.unlocked.map(function(r){
    const label = r.type === 'secret' ? '🔓 비밀' : '🔮 운세';
    return '<div class="quiz-reward-box"><span class="label">' + label + '</span><div class="text">' + r.text + '</div></div>';
  }).join('');
  body.innerHTML =
    '<div class="quiz-result-score">' + quizState.correctCount + ' / ' + total + '문제 정답!</div>' +
    '<div class="quiz-result-sub">비밀 ' + secretCount + '개 · 운세 ' + fortuneCount + '개를 모았어요.</div>' +
    (rewardListHtml || '<div class="empty-state">이번엔 모은 보상이 없어요 — 다시 도전해보세요!</div>') +
    '<button class="course-btn" style="margin-top:14px;" onclick="openQuizModal(\'' + quizState.workId + '\')">🔁 처음부터 다시 풀기</button>';
}
window.openQuizModal = openQuizModal;
window.closeQuizModal = closeQuizModal;
window.answerQuiz = answerQuiz;
window.nextQuiz = nextQuiz;

document.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('relationsModal');
  if (overlay){
    overlay.addEventListener('click', function(e){ if (e.target === overlay) closeRelationsModal(); });
  }
  const summaryOverlay = document.getElementById('summaryModal');
  if (summaryOverlay){
    summaryOverlay.addEventListener('click', function(e){ if (e.target === summaryOverlay) closeSummaryModal(); });
  }
  const quizOverlay = document.getElementById('quizModal');
  if (quizOverlay){
    quizOverlay.addEventListener('click', function(e){ if (e.target === quizOverlay) closeQuizModal(); });
  }
  const guideOverlay = document.getElementById('usageGuideModal');
  if (guideOverlay){
    guideOverlay.addEventListener('click', function(e){ if (e.target === guideOverlay) dismissUsageGuide(0); });
  }
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    closeRelationsModal();
    closeSummaryModal();
    closeQuizModal();
    dismissUsageGuide(0);
  });

  document.querySelectorAll('.mobile-tabbar button').forEach(function(b){
    b.addEventListener('click', function(){ setMobileView(b.dataset.view); });
  });

  document.querySelectorAll('.lang-toggle button').forEach(function(b){
    b.addEventListener('click', function(){
      // 2026-08 3단계: 번체 중문(대만·홍콩) 서비스 정식 개시 — 더 이상 "준비 중"
      // 자리표시자가 아니라 실제 언어이므로 그냥 setLang()을 호출한다.
      setLang(b.dataset.lang);
    });
  });
  // 저장된 언어 설정(또는 기본 한국어)을 화면에 즉시 반영 — 헤더/랜딩/안내모달이
  // 처음부터 정적 한국어 텍스트가 아니라 현재 언어 기준으로 그려지도록 함
  setLang(currentLang);
  renderHeroCollage();
  renderHeroTodayPick();

  initResizer();
});

/* ============================================================
   지도:사이드바 크기 조절 (마우스 드래그)
   - #dragHandle을 잡고 좌우로 끌면 #sidebar의 flex-basis(%)가 실시간으로 바뀐다.
   - 비율은 localStorage에 저장해 다음 방문 때도 유지한다.
   - 모바일(≤768px, 세로 스택 레이아웃)에서는 동작하지 않는다.
   ============================================================ */
const SIDEBAR_RATIO_KEY = 'gcjg_sidebarRatioPct';
const SIDEBAR_MIN_PCT = 24;
const SIDEBAR_MAX_PCT = 76;

function applySidebarRatio(pct){
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const clamped = Math.max(SIDEBAR_MIN_PCT, Math.min(SIDEBAR_MAX_PCT, pct));
  sidebar.style.flexBasis = clamped + '%';
  return clamped;
}

function initResizer(){
  const handle = document.getElementById('dragHandle');
  const main = document.getElementById('main');
  const sidebar = document.getElementById('sidebar');
  if (!handle || !main || !sidebar) return;

  // 이전에 저장해둔 비율이 있으면 시작할 때부터 반영
  try{
    const saved = parseFloat(localStorage.getItem(SIDEBAR_RATIO_KEY));
    if (!isNaN(saved)) applySidebarRatio(saved);
  }catch(e){}

  let dragging = false;

  function onPointerMove(clientX){
    if (!dragging) return;
    const rect = main.getBoundingClientRect();
    if (rect.width <= 0) return;
    // 지도는 왼쪽, 사이드바는 오른쪽 — 사이드바 폭 비율 = (오른쪽 끝 - 커서 X) / 전체 폭
    const pct = ((rect.right - clientX) / rect.width) * 100;
    applySidebarRatio(pct);
  }

  function startDrag(clientX){
    dragging = true;
    handle.classList.add('dragging');
    sidebar.classList.add('resizing');
    document.body.classList.add('resizing-cursor');
    onPointerMove(clientX);
  }

  function endDrag(){
    if (!dragging) return;
    dragging = false;
    handle.classList.remove('dragging');
    sidebar.classList.remove('resizing');
    document.body.classList.remove('resizing-cursor');
    try{
      const pct = parseFloat(sidebar.style.flexBasis);
      if (!isNaN(pct)) localStorage.setItem(SIDEBAR_RATIO_KEY, String(pct));
    }catch(e){}
  }

  handle.addEventListener('mousedown', function(e){
    e.preventDefault();
    startDrag(e.clientX);
  });
  window.addEventListener('mousemove', function(e){
    if (dragging) onPointerMove(e.clientX);
  });
  window.addEventListener('mouseup', endDrag);

  // 터치 기기(태블릿 가로모드 등)에서도 동일하게 동작하도록 터치 이벤트도 지원
  handle.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX);
  }, {passive:true});
  window.addEventListener('touchmove', function(e){
    if (dragging && e.touches.length === 1) onPointerMove(e.touches[0].clientX);
  }, {passive:true});
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchcancel', endDrag);

  // 키보드 접근성: 핸들에 포커스한 뒤 좌우 화살표로도 비율 조절 가능
  handle.addEventListener('keydown', function(e){
    const cur = parseFloat(sidebar.style.flexBasis) || 42;
    if (e.key === 'ArrowLeft'){ applySidebarRatio(cur + 2); e.preventDefault(); }
    else if (e.key === 'ArrowRight'){ applySidebarRatio(cur - 2); e.preventDefault(); }
    else return;
    try{ localStorage.setItem(SIDEBAR_RATIO_KEY, String(parseFloat(sidebar.style.flexBasis))); }catch(e2){}
  });

  // 2026-08 UX 개편: 더블클릭하면 기본 5:5가 아니라 새 기본값인 지도58:사이드바42로 되돌리기
  handle.addEventListener('dblclick', function(){
    applySidebarRatio(42);
    try{ localStorage.setItem(SIDEBAR_RATIO_KEY, '42'); }catch(e){}
  });
}
window.initResizer = initResizer;

const MOBILE_BREAKPOINT = 768;
function isMobileLayout(){ return window.innerWidth <= MOBILE_BREAKPOINT; }

function setMobileView(view){
  document.querySelectorAll('.mobile-tabbar button').forEach(function(b){
    b.classList.toggle('active', b.dataset.view === view);
  });
  const appEl = document.getElementById('app');
  if (appEl) appEl.classList.toggle('view-info', view === 'info');
  if (view === 'map'){
    // 지도가 display:none이었다가 다시 보이면 캔버스 크기를 다시 계산해줘야 함
    setTimeout(function(){ map.resize(); }, 60);
  }
}
window.setMobileView = setMobileView;

function shareCurrent(workId, kind, id, label){
  const url = location.href.split('?')[0] + '?work=' + encodeURIComponent(workId) + '&' + kind + '=' + encodeURIComponent(id);
  // 모바일처럼 실제 공유시트가 뜨는 환경에서는 그걸 우선 시도하고,
  // 그게 없거나 실패하면(대부분의 데스크톱 브라우저) 눈에 보이는 복사 상자를 띄운다.
  // (예전엔 clipboard.writeText만 조용히 시도하다 실패하면 아무 반응이 없었음)
  if (navigator.share){
    navigator.share({ title:'그곳, 지금' + (label ? ' · ' + label : ''), url:url }).catch(function(){ showCopyBox(url); });
  } else {
    showCopyBox(url);
  }
}

function showCopyBox(url){
  const box = document.getElementById('copyBox');
  const input = document.getElementById('copyBoxInput');
  if (!box || !input) return;
  input.value = url;
  box.style.display = 'flex';
  input.focus();
  input.select();
}

function copyLinkNow(){
  const input = document.getElementById('copyBoxInput');
  if (!input) return;
  input.focus();
  input.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch(e){ ok = false; }
  if (ok){ showToast('링크가 복사되었어요 🔗'); return; }
  if (navigator.clipboard){
    navigator.clipboard.writeText(input.value)
      .then(function(){ showToast('링크가 복사되었어요 🔗'); })
      .catch(function(){ showToast('자동 복사가 안 돼요 — 위 링크를 직접 선택해 복사해주세요'); });
  } else {
    showToast('자동 복사가 안 돼요 — 위 링크를 직접 선택해 복사해주세요');
  }
}
window.copyLinkNow = copyLinkNow;

function localizeLabels(){
  const style = map.getStyle();
  if (!style || !style.layers) return;
  style.layers.forEach(function(layer){
    const tf = layer.layout && layer.layout['text-field'];
    if (!tf) return;
    const tfStr = JSON.stringify(tf);
    if (tfStr.indexOf('"name') === -1) return; // ref/shield 등 이름이 아닌 라벨은 건드리지 않음
    try {
      map.setLayoutProperty(layer.id, 'text-field', [
        'coalesce',
        ['get', 'name:ko'],
        ['get', 'name:latin'],
        ['get', 'name:en'],
        ['get', 'name']
      ]);
    } catch(e){ /* 일부 레이어는 속성이 없어 실패할 수 있음, 무시 */ }
  });
}

/* ---------- 장소 태그(해시태그용) 공통 계산 — showLocation()과 지도 클릭 퀵팝업이 같이 사용 ----------
   work.lang에 따라 한자/가나 태그(cjkTag)를 만들지 말지, 만든다면 어느 나라 서비스로 연결할지가 갈린다.
   - work.lang === 'ko' (한국 작품 — 예: 폭싹 속았수다): cjkTag를 아예 만들지 않는다.
     (한국 지명의 한자 표기(城山日出峰 등)를 일본어로 오인해 야후재팬·일본어 위키로 연결하던 문제 방지 — 한국 작품은 한국어 태그·한국 SNS가 기준)
   - work.lang === 'zh' (중국 작품 — 예: 삼체): 괄호 속 한자를 감지해 중국어 태그로 쓰고, 중국 서비스(웨이보/더우반/중문 위키)로 연결한다.
   - 그 외(기본값, 일본 작품들): 기존과 동일하게 가나/한자를 감지해 일본어 태그로 쓰고, 야후재팬/일본어 위키로 연결한다.

   2026-08 수정: modernName이 "지역 — 랜드마크(원어표기)" 형식(폭싹 속았수다/너의 이름은/스즈메/삼체)일 때
   기존 코드는 "—" 앞부분(광역 지명)까지 통째로 태그에 남겨서 "제주서귀포시—성산일출봉" 같이 실제로는
   아무도 쓰지 않는 깨진 해시태그가 만들어지는 버그가 있었다(인스타그램 검색 결과 0건으로 이어짐).
   extractLandmarkName()으로 "—" 뒤쪽의 랜드마크명만 우선 추출하고, 대망처럼 modernName에 랜드마크가
   아예 없고 광역 행정구역만 있는 경우(예: "아이치현 오카자키시")는 nameInWork(예: "오카자키성(岡崎城)")에서
   랜드마크명을 가져오도록 고쳤다. */
function extractLandmarkName(loc){
  // 자동 추출 결과가 실제 SNS 사용 태그와 어긋나는 특정 장소는 data.js의 TAG_OVERRIDES로 수동 보정
  if (typeof TAG_OVERRIDES !== 'undefined' && TAG_OVERRIDES[loc.id]) return TAG_OVERRIDES[loc.id];
  let raw = loc.modernName || '';
  const dashIdx = raw.lastIndexOf('—');
  if (dashIdx !== -1) raw = raw.slice(dashIdx + 1);
  // 괄호 속 원어 표기를 먼저 통째로 제거해야 한다 — "장소명 (English Name, City)"처럼 괄호 '안'에
  // 쉼표가 있는 경우, 쉼표로 먼저 split해버리면 괄호가 반토막나면서 "장소명 (English" 같은
  // 깨진 문자열이 태그로 만들어지는 버그가 있었다(2026-08 발견: 직지의 유럽 장소들에서 처음 확인됨).
  let core = raw.replace(/[(（][^)）]*[)）]/g, '').trim();
  core = core.split(/[·,]/)[0].trim();
  // "—"가 없어 여전히 광역 행정구역명뿐이면(대망류), nameInWork에서 랜드마크명을 가져옴
  if (dashIdx === -1 && loc.nameInWork){
    const fromWork = loc.nameInWork.replace(/[(（][^)）]*[)）]/g, '').trim();
    if (fromWork) core = fromWork;
  }
  return core || raw.trim();
}
function computeLocationTags(loc, work){
  const placeName = extractLandmarkName(loc);
  const korTag = placeName.replace(/[\s()（）·,—]/g, '');
  const workLang = (work && work.lang) || 'ja'; // 대망/너의 이름은/스즈메는 lang 필드가 없으므로 기본값 'ja'
  let cjkTag = null;
  let cjkLang = (workLang === 'zh' ? 'zh' : 'ja');
  // 장소 데이터에 직접 지정한 현지어 태그(loc.localTag)가 있으면 최우선으로 쓴다.
  // — 한국 작품이라도 해외 실존 장소(예: 직지의 유럽 장소들)를 다루는 경우, 한국어 태그 하나만으로는
  // 실제로 그 태그를 쓰는 사람이 거의 없어 "검색결과 없음"이 되기 쉽다. 그 나라에서 실제로 쓰이는
  // 언어의 태그(예: #GutenbergMuseum, #Strasbourg)를 장소 데이터에 직접 지정해 함께 보여준다.
  if (loc.localTag){
    cjkTag = loc.localTag;
    cjkLang = loc.localTagLang || 'local';
  } else if (workLang !== 'ko' && workLang !== 'en'){
    const cjkSource = (loc.nameInWork || '') + ' ' + (loc.modernName || '');
    const cjkMatches = cjkSource.match(/[（(]([^）)]*)[）)]/g) || [];
    for (let i = 0; i < cjkMatches.length; i++){
      const inner = cjkMatches[i].replace(/[（(）)]/g, '');
      if (/[぀-ヿ一-鿿]/.test(inner)){ cjkTag = inner.replace(/[\s]/g, ''); break; }
    }
  }
  const photoSpotTag = (typeof PHOTO_SPOTS !== 'undefined') ? PHOTO_SPOTS[loc.id] : null;
  // 작품 고유 해시태그(예: #폭싹속았수다) — 장소별 태그에 실제 게시물이 없을 때를 대비한 안전망.
  // 팬들이 촬영지 방문 인증에 가장 많이 쓰는 태그이기도 해서, 철거된 세트장처럼 장소 자체의
  // 독자적 인지도가 없는 곳에서도 최소한 이 태그로는 실제 결과가 나온다.
  const workTag = (typeof WORK_HASHTAGS !== 'undefined' && work) ? WORK_HASHTAGS[work.id] : null;
  return { placeName:placeName, korTag:korTag, cjkTag:cjkTag, cjkLang: cjkLang, workLang:workLang, photoSpotTag:photoSpotTag, workTag:workTag, searchTag: cjkTag || korTag,
    // 이전 코드와의 호환을 위해 jpTag라는 이름으로도 동일한 값을 제공 (workLang==='ja'일 때만 실질적으로 '일본어'라는 의미를 가짐)
    jpTag: cjkTag };
}

// 지도 위 마커를 클릭했을 때, 사이드바까지 스크롤하지 않아도 바로 해시태그 링크들을 볼 수 있는 퀵팝업.
// (지도 비중을 줄인 대신, 클릭 한 번으로 훨씬 많은 정보가 그 자리에서 뜨도록 만든 것)
function buildMapQuickPopupHtml(loc, work){
  const tags = computeLocationTags(loc, work);
  const igTags = tags.jpTag && tags.jpTag !== tags.korTag ? [tags.jpTag, tags.korTag] : [tags.korTag];
  const chips = igTags.map(function(tag){
    return '<a class="qp-chip" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(tag) + '/" target="_blank" rel="noopener">📷 #' + tag + '</a>';
  });
  if (tags.photoSpotTag){
    chips.push('<a class="qp-chip qp-spot" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(tags.photoSpotTag) + '/" target="_blank" rel="noopener">✨ #' + tags.photoSpotTag + '</a>');
  }
  if (tags.workTag){
    chips.push('<a class="qp-chip qp-spot" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(tags.workTag) + '/" target="_blank" rel="noopener">🎬 #' + tags.workTag + '</a>');
  }
  chips.push('<a class="qp-chip" href="https://www.youtube.com/hashtag/' + encodeURIComponent(tags.searchTag) + '" target="_blank" rel="noopener">▶️ ' + (currentLang !== 'ko' ? 'YouTube' : '유튜브') + '</a>');
  chips.push('<a class="qp-chip" href="https://twitter.com/hashtag/' + encodeURIComponent(tags.searchTag) + '" target="_blank" rel="noopener">𝕏 ' + (currentLang !== 'ko' ? 'X' : '트위터') + '</a>');
  const scene = (typeof SCENE_MOMENTS !== 'undefined') ? SCENE_MOMENTS[loc.id] : null;
  return '<div class="qp-title">' + (loc.nameInWork || tField(loc, 'modernName')) + '</div>' +
    (scene ? '<div class="qp-scene">🎬 ' + scene + '</div>' : '<div class="qp-sub">' + tField(loc, 'modernName') + '</div>') +
    '<div class="qp-chips">' + chips.join('') + '</div>' +
    '<div class="qp-hint">' + t('quickpopupHint') + '</div>';
}

function setupLocationLayer(){
  map.addSource('locations', { type:'geojson', data:{ type:'FeatureCollection', features:[] } });
  // 클릭/hover 판정용 '보이지 않는 확대 히트박스' 레이어 (반경을 실제 표시보다 훨씬 크게 잡아
  // 마커를 정확히 못 맞춰도 클릭/hover가 잘 잡히도록 함). 이게 이전 버전에서
  // "어떤 점은 클릭해도 반응 없음" 버그의 주된 원인이었음(반경 8px는 너무 작아 정확히 클릭해야 했음).
  map.addLayer({
    id:'locations-hit',
    type:'circle',
    source:'locations',
    paint:{ 'circle-radius':16, 'circle-color':'#000000', 'circle-opacity':0 }
  });
  map.addLayer({
    id:'locations-circle',
    type:'circle',
    source:'locations',
    paint:{
      'circle-radius':8,
      'circle-color':['get','color'],
      // 방문 확인(localStorage 기반)한 장소는 금색 테두리를 더 두껍게 둘러 한눈에 구분되게 함
      // — 서버 없이도 "이미 확인한 곳/아직 안 본 곳"을 지도에서 바로 알 수 있어 완주 동기부여가 됨
      'circle-stroke-width':['case', ['==', ['get','visited'], 1], 3, 2],
      'circle-stroke-color':['case', ['==', ['get','visited'], 1], '#ffd23f', '#ffffff']
    }
  });

  function clearHoverPopup(){
    if (hoverPopup){ hoverPopup.remove(); hoverPopup = null; }
  }

  map.on('mousemove', 'locations-hit', function(e){
    map.getCanvas().style.cursor = 'pointer';
    const f = e.features[0];
    if (hoverPopup && hoverPopup._locId === f.properties.locId) return; // 이미 같은 점 표시 중
    clearHoverPopup();
    hoverPopup = new maplibregl.Popup({ closeButton:false, closeOnClick:false, offset:14 })
      .setLngLat(f.geometry.coordinates)
      .setText(f.properties.label)
      .addTo(map);
    hoverPopup._locId = f.properties.locId;
  });
  map.on('mouseleave', 'locations-hit', function(){
    map.getCanvas().style.cursor = '';
    clearHoverPopup();
  });
  // 지도 어디를 클릭하든(팝업이 남아있어 클릭을 가로채는 경우까지 대비) 먼저 팝업을 치우고 처리
  map.on('click', function(){ clearHoverPopup(); });
  map.on('click', 'locations-hit', function(e){
    clearHoverPopup();
    const f = e.features[0];
    const work = WORKS.find(function(w){ return w.id === f.properties.workId; });
    const data = DATA[f.properties.workId];
    const loc = data.locations.find(function(l){ return l.id === f.properties.locId; });
    showLocation(work, data, f.properties.locId);
    // PC에서는 지도 비중을 줄인 대신, 마커를 직접 클릭하면 그 자리에서 해시태그 링크가 바로 뜨게 함
    if (clickPopup){ clickPopup.remove(); clickPopup = null; }
    if (loc && !isMobileLayout()){
      clickPopup = new maplibregl.Popup({ closeButton:true, closeOnClick:true, offset:16, maxWidth:'260px', className:'quick-popup' })
        .setLngLat(f.geometry.coordinates)
        .setHTML(buildMapQuickPopupHtml(loc, work))
        .addTo(map);
    }
  });
}

function fitBoundsFor(locs){
  const mappable = locs.filter(function(l){ return l.lat != null && l.lng != null; });
  if (!mappable.length) return;
  const bounds = new maplibregl.LngLatBounds();
  mappable.forEach(function(l){ bounds.extend([l.lng, l.lat]); });
  map.fitBounds(bounds, { padding:60, maxZoom:9, duration:600 });
}

/* ============================================================
   지도 '처음 위치로' 복귀 + 원거리 장소 발견 칩 (2026-08 신규)
   [배경] 호프처럼 장소가 한국·루마니아 등 멀리 흩어진 작품은 WORK_MAP_HOME으로
   실질적 주 무대(한국)를 시작 화면으로 고정해뒀지만, 그 바람에 화면 밖 장소(루마니아)는
   존재 자체를 모르고 지나치기 쉽다. 또한 사용자가 직접 그쪽으로 지도를 옮긴 뒤에는
   다시 드래그로 한참 되돌아와야 했다. 아래 두 기능으로 보완한다:
     1) goToWorkHome() — 상단 '처음 위치로(🎯)' 버튼, 언제든 한 번에 시작 화면으로 복귀.
     2) renderOffscreenChips() — 시작 화면(홈뷰) 정착 직후, 화면 밖에 있는 장소 묶음을
        "📍 다른 지역 장소 N곳 보기" 칩으로 알려주고 클릭하면 그 지역으로 날아간다.
   ============================================================ */
// 겹쳐 예약된 once('moveend') 콜백이 뒤늦게 실행되며 이미 지나간(다른 작품의) 낡은
// mappableLocations로 패널을 다시 그리는 경쟁 상태를 막기 위한 토큰. flyToWorkHome이
// 호출될 때마다 값을 올리고, 실제 실행 시점에 토큰이 그대로인지 확인한다.
let _offscreenCheckToken = 0;
function flyToWorkHome(work, data){
  const mappableLocations = data.locations.filter(function(loc){ return loc.lat != null && loc.lng != null; });
  const home = (typeof WORK_MAP_HOME !== 'undefined') ? WORK_MAP_HOME[work.id] : null;
  if (home){
    map.flyTo({ center: home.center, zoom: home.zoom, duration: 700 });
  } else {
    fitBoundsFor(mappableLocations);
  }
  // WORK_MAP_HOME이 있는 작품만 애초에 "일부러 잘라낸" 화면이므로, 그럴 때만 화면 밖 장소를 검사한다.
  // (WORK_MAP_HOME이 없으면 fitBoundsFor가 이미 전체 장소를 한 화면에 담아서 잘라낼 게 없다)
  if (home) scheduleOffscreenCheck(work.id, mappableLocations);
  else { _offscreenCheckToken++; clearOffscreenChips(); }
}
function goToWorkHome(){
  if (!currentWorkId) return;
  const work = WORKS.find(function(w){ return w.id === currentWorkId; });
  const data = DATA[currentWorkId];
  if (!work || !data) return;
  flyToWorkHome(work, data);
}
window.goToWorkHome = goToWorkHome;

function scheduleOffscreenCheck(workId, mappableLocations){
  // flyTo 애니메이션이 끝나 카메라가 실제로 자리잡은 뒤에 화면 경계를 확인해야 정확하다.
  const token = ++_offscreenCheckToken;
  map.once('moveend', function(){
    // 이 콜백이 예약된 뒤 다른 작품 전환이나 또 다른 홈뷰 복귀가 먼저 일어났다면
    // (토큰 불일치) 낡은 데이터로 패널을 덮어쓰지 않고 조용히 무시한다.
    if (token !== _offscreenCheckToken || workId !== currentWorkId) return;
    renderOffscreenChips(mappableLocations);
  });
}

// 단순 거리 임계값(threshold) 기반 union-find 클러스터링 — 같은 나라·인접 지역은 하나로
// 묶이고, 대륙을 건너뛴 촬영지만 별도 묶음으로 분리된다. 어떤 작품에도 하드코딩 없이 동작한다.
function clusterByProximity(locs, thresholdKm){
  const n = locs.length;
  const parent = locs.map(function(_, i){ return i; });
  function find(i){ while (parent[i] !== i){ parent[i] = parent[parent[i]]; i = parent[i]; } return i; }
  function union(a, b){ const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; }
  for (let i = 0; i < n; i++){
    for (let j = i + 1; j < n; j++){
      if (haversineKm(locs[i], locs[j]) <= thresholdKm) union(i, j);
    }
  }
  const groups = {};
  for (let i = 0; i < n; i++){
    const r = find(i);
    (groups[r] = groups[r] || []).push(locs[i]);
  }
  return Object.values(groups);
}
function clearOffscreenChips(){
  const el = document.getElementById('offscreenChips');
  if (el) el.innerHTML = '';
}
function renderOffscreenChips(mappableLocations){
  let panel = document.getElementById('offscreenChips');
  if (!panel){
    panel = document.createElement('div');
    panel.id = 'offscreenChips';
    panel.className = 'offscreen-chips';
    const wrap = document.getElementById('mapWrap');
    if (wrap) wrap.appendChild(panel);
  }
  panel.innerHTML = '';
  const bounds = map.getBounds();
  const offscreen = mappableLocations.filter(function(l){ return !bounds.contains([l.lng, l.lat]); });
  if (!offscreen.length) return;
  // 700km 이내는 "같은 권역"으로 묶어 하나의 칩으로, 그보다 먼 곳은 별도 칩으로 분리.
  // 칩이 너무 많으면 오히려 산만하므로 큰 묶음 위주로 최대 3개까지만 보여준다.
  const clusters = clusterByProximity(offscreen, 700)
    .sort(function(a, b){ return b.length - a.length; })
    .slice(0, 3);
  clusters.forEach(function(cluster, idx){
    const btn = document.createElement('button');
    btn.className = 'offscreen-chip';
    btn.textContent = t('offscreenChipPrefix') + cluster.length + t('offscreenChipSuffix');
    btn.onclick = function(){ fitBoundsFor(cluster); };
    panel.appendChild(btn);
  });
}

function renderCrossPromo(work){
  // 2026-08 4라운드: "지금 보는 중: OO / 이 지역, 사실 다른 시대의 이야기도 있어요 → XX 보러가기"
  // 배너를 사용자가 "의미 없어 보인다"고 지적해 전체 콘텐츠에서 완전히 제거했다. 함수 자체와
  // 호출부(loadWork())는 남겨두되(다른 곳에서 다시 부를 일 없도록 no-op화), 배너 엘리먼트는
  // 항상 숨긴다 — CSS 기본값도 display:none이라 이중 안전.
  const el = document.getElementById('crossPromo');
  if (el) el.style.display = 'none';
}

/* ---------- 사용법 안내 배너 (최초 방문 시 1회, 스누즈 가능) ---------- */
const USAGE_GUIDE_KEY = 'usageGuideHideUntil';
function shouldShowUsageGuide(){
  const until = localStorage.getItem(USAGE_GUIDE_KEY);
  if (!until) return true;
  return Date.now() > Number(until);
}
function showUsageGuide(){
  const modal = document.getElementById('usageGuideModal');
  if (modal) modal.classList.add('show');
}
function dismissUsageGuide(days){
  if (days){
    localStorage.setItem(USAGE_GUIDE_KEY, String(Date.now() + days * 24 * 60 * 60 * 1000));
  }
  const modal = document.getElementById('usageGuideModal');
  if (modal) modal.classList.remove('show');
}
window.showUsageGuide = showUsageGuide;
window.dismissUsageGuide = dismissUsageGuide;

/* ---------- 처음 화면(작품 선택 랜딩) ---------- */
// 특정 작품(대망)으로 항상 시작하지 않도록, 공유 링크가 없으면 먼저 작품을 고르게 한다.
function renderLandingCopy(){
  const kicker = document.getElementById('landingKicker');
  const headline = document.getElementById('landingHeadline');
  const blurb = document.getElementById('landingBlurb');
  if (kicker) kicker.textContent = t('landingKicker');
  if (headline) headline.textContent = t('landingHeadline');
  if (blurb) blurb.innerHTML = t('landingBlurb');
}
// 2026-08 UI 개편(랜딩 히어로 재설계) — "기능은 많은데 여행 욕구는 약하다"는 기획 피드백에
// 따라, 히어로 영역 배경을 실제 작품 대표 이미지 콜라주로 채운다. 이미 카드에 쓰이고 있는
// heroImage(저작권 검토를 마친 이미지)만 재사용하므로 새로운 이미지 소싱·검증이 필요 없다.
// 언어를 바꿔도 이미지 자체는 바뀌지 않으므로 부팅 시 한 번만 그리면 충분하다(setLang마다
// 다시 섞으면 오히려 화면이 산만해짐).
function renderHeroCollage(){
  const wrap = document.getElementById('landingHeroCollage');
  if (!wrap || wrap.dataset.rendered === '1') return;
  const urls = WORKS.filter(function(w){ return w.heroImage && w.heroImage.url; })
    .map(function(w){ return w.heroImage.url; });
  if (!urls.length) return;
  const picked = shuffleArray(urls.slice()).slice(0, 12);
  wrap.innerHTML = picked.map(function(u){
    return '<div class="hero-collage-tile" style="background-image:url(\'' + u.replace(/'/g, "\\'") + '\')"></div>';
  }).join('');
  wrap.dataset.rendered = '1';
}
window.renderHeroCollage = renderHeroCollage;

// 2026-08 히어로 주목도 개선 아이디어 #3: "오늘의 장소" 미니 프리뷰.
// 매 페이지뷰마다 랜덤으로 고르면 "오늘의"라는 표현이 거짓이 될 수 있으므로(정확성 원칙),
// 날짜(자정 기준 UTC 일수) 기반의 결정론적 픽으로 — 같은 날 방문한 모든 사용자에게 동일한 값이
// 나오도록 한다. heroImage와 hookTagline(모든 39개 작품에 존재)이 있는 작품만 대상으로 삼는다.
function pickTodayWork(){
  const pool = WORKS.filter(function(w){ return w.heroImage && w.heroImage.url && w.hookTagline; });
  if (!pool.length) return null;
  const dayIndex = Math.floor(Date.now() / 86400000);
  return pool[dayIndex % pool.length];
}
function renderHeroTodayPick(){
  const card = document.getElementById('heroTodayPick');
  if (!card) return;
  const work = pickTodayWork();
  if (!work){ card.hidden = true; return; }
  const imgEl = document.getElementById('heroTodayPickImg');
  const labelEl = document.getElementById('heroTodayPickLabel');
  const titleEl = document.getElementById('heroTodayPickTitle');
  const hookEl = document.getElementById('heroTodayPickHook');
  if (imgEl) imgEl.style.backgroundImage = "url('" + work.heroImage.url.replace(/'/g, "\\'") + "')";
  if (labelEl) labelEl.textContent = t('heroTodayPickLabel');
  if (titleEl) titleEl.textContent = tField(work, 'title');
  if (hookEl) hookEl.textContent = tField(work, 'hookTagline');
  card.setAttribute('aria-label', tField(work, 'title'));
  card.onclick = function(){ enterWork(work.id); };
  card.hidden = false;
}
window.pickTodayWork = pickTodayWork;
window.renderHeroTodayPick = renderHeroTodayPick;

function renderLandingCards(){
  renderRegionRow();
  const wrap = document.getElementById('landingCards');
  if (!wrap) return;
  const filtered = getFilteredWorks(true);
  // 2026-08 9라운드: "39개 작품" 카운트 텍스트가 무의미하다는 지적 — PC/모바일 공용 요소라
  // 여기서 렌더를 멈추면 두 화면 다 한번에 없어진다. textContent만 비우면 margin-bottom 때문에
  // 빈 줄이 남으므로 display까지 꺼서 자리도 차지하지 않게 한다.
  const countEl = document.getElementById('landingResultCount');
  if (countEl) countEl.style.display = 'none';
  if (filtered.length === 0){
    wrap.innerHTML = '<div class="filter-empty">' + t('filterNoResults') + '</div>';
    return;
  }
  // 2026-08 SEO 개선(개발자 확인 문구 반영) — <button> 안에 <a>를 넣거나, 하나의 링크가
  // href와 onclick(preventDefault)로 두 가지 목적을 동시에 수행하는 중첩/겸용 구조를 없앴다.
  // 카드 자체는 순수 컨테이너(div)이고, 그 안에 성격이 다른 두 개의 독립된 클릭 대상을 둔다:
  //   1) <a href="/works/{id}/"> — 정적 SEO 페이지(작품 설명·장소 목록)로 가는 진짜 링크.
  //      onclick이 없어 크롤러·키보드·새 탭 열기 등 어떤 방식으로 눌러도 항상 그 페이지로 감.
  //   2) <button onclick="enterWork(...)"> — 페이지 이동 없이 즉시 인터랙티브 지도로 들어가는
  //      버튼. href가 없으므로 <a> 문제와 겹치지 않는다.
  wrap.innerHTML = filtered.map(function(w){
    const img = w.heroImage ? w.heroImage.url : '';
    // 2026-08: 카드 테두리·"둘러보기" 링크 색은 이제 작품별 pinColor가 아니라 CSS의 --card-accent
    // (밝은 오렌지) 고정값을 쓴다 — 랜딩 카드 순서가 세션마다 랜덤이라 색으로 작품을 구분하는 의미가
    // 없어졌고, 오히려 일부 pinColor가 어두운 배경과 대비가 약해 안 보이는 문제만 있었다.
    return '<div class="landing-card">' +
      '<a class="landing-card-infolink" href="' + workHubPath(w) + '">' +
        (img ? '<div class="landing-card-img"><img src="' + img + '" alt="' + workImgAlt(w) + '" loading="lazy"></div>' : '') +
        '<div class="landing-card-body">' +
          '<div class="landing-card-title">' + tField(w, 'title') + '</div>' +
          '<div class="landing-card-sub">' + tField(w, 'author') + ' · ' + tField(w, 'era') + '</div>' +
          '<div class="landing-card-summary">' + tField(w, 'summary') + '</div>' +
        '</div>' +
      '</a>' +
      '<button type="button" class="landing-card-mapbtn" onclick="enterWork(\'' + w.id + '\')">' + t('landingCardCta') + '</button>' +
    '</div>';
  }).join('');
}

/* ============================================================
   랜딩 상단 동적 카운터 배너 (2026-08 신규, task #384)
   "OOO명, OO개의 이야기. OOO개의 장소를 바로 만나보세요" 형태로 사이트 규모를 한눈에 보여주는
   배너. 인물 수·이야기(작품) 수는 항상 그 순간의 실제 데이터를 다시 세어 보여주고(콘텐츠가
   늘어나면 별도 손질 없이 자동으로 갱신됨), 장소 수만 사용자 주목도를 높이기 위해 1부터 최종
   값까지 2~3초 안에 빠르게 올라가는 카운트업 애니메이션으로 보여준다. 숫자 세 개가 한꺼번에
   돌아가면 어지러우니, 인물·이야기 수는 바로 최종값으로 조용히 표시하고 장소 수만 움직이게 해서
   시선을 자연스럽게 그 숫자로 모은다. goToLanding()과 최초 부팅 시 둘 다에서 호출되므로, 첫
   진입이든 로고를 눌러 되돌아온 재진입이든 랜딩 화면에 들어올 때마다 매번 새로 애니메이션된다
   (진행 상태를 저장해두지 않음 — 사용자 주목을 끄는 게 목적이므로 매번 보여주는 게 의도적).
   ============================================================ */
function computeSiteCounts(){
  const workCount = WORKS.length;
  let peopleCount = 0;
  Object.keys(DATA).forEach(function(workId){
    const people = (DATA[workId] && DATA[workId].people) || [];
    peopleCount += people.length;
  });
  const placeCount = getAllLocationsIndex().length;
  return { workCount: workCount, peopleCount: peopleCount, placeCount: placeCount };
}
window.computeSiteCounts = computeSiteCounts;

// 2026-08 재수정: 한때 "세션당 1번만" 방식으로 바꿨었는데(재생이 반복되면 피곤하다는 피드백),
// 이번엔 반대로 "재진입할 때마다 다시 안 도니까 화면이 허전하다"는 피드백을 받았다 — 이 배너가
// 히어로의 핵심 주목 요소이므로, 정적으로 멈춰 있는 것보다는 매번 다시 도는 쪽이 낫다는 판단.
// 그래서 세션당 1회 제한을 다시 없애고, 랜딩 화면에 들어올 때마다(최초 진입/로고로 재진입/
// 새로고침 전부) 항상 0→최종값으로 애니메이션한다.
function animateCounterUp(elId, target){
  const el = document.getElementById(elId);
  if (!el) return;
  if (!target){ el.textContent = '0'; return; }
  const durationMs = 3000;
  const startTime = performance.now();
  function tick(now){
    const progress = Math.min(1, (now - startTime) / durationMs);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic — 처음엔 빠르게, 끝에서 부드럽게
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}
window.animateCounterUp = animateCounterUp;

function renderLandingCounterBanner(){
  const el = document.getElementById('landingCounterBanner');
  if (!el) return;
  // 지연 로딩 중이면 인물·장소 수가 실제보다 적게 잡힐 수 있으므로, ensureAllData()로 전 작품
  // 데이터를 먼저 확보한 뒤 정확한 숫자로 그린다(정확성 원칙 — 숫자를 지어내지 않는다).
  ensureAllData(function(){
    _allLocationsIndex = null; // 방금 받아온 데이터까지 포함해 인덱스를 새로 만든다
    const counts = computeSiteCounts();
    const peopleNum = counts.peopleCount.toLocaleString();
    const workNum = counts.workCount;
    // 2026-08 문구 수정: "OO명, OO개의 이야기"는 밋밋해서 눈에 잘 안 띈다는 피드백 — 사람이
    // 이야기를 "만든" 주체라는 느낌이 들도록 문장을 바꾸고, 장소 숫자(counter-banner-num)는
    // CSS에서 글자 크기를 2배로 키워 시선이 그쪽으로 자연스럽게 모이게 했다.
    let html;
    if (currentLang === 'ja'){
      html = peopleNum + '人が生んだ' + workNum + '作品。<b class="counter-banner-num" id="counterBannerPlaceNum">0</b>ヶ所の実在スポットを今すぐチェック';
    } else if (currentLang !== 'ko'){
      html = peopleNum + ' people created ' + workNum + ' stories. Meet <b class="counter-banner-num" id="counterBannerPlaceNum">0</b> real places right now';
    } else {
      html = peopleNum + '명이 만든 ' + workNum + '개의 이야기. <b class="counter-banner-num" id="counterBannerPlaceNum">0</b>개의 장소를 바로 만나보세요';
    }
    el.innerHTML = '<span class="counter-banner-text">' + html + '</span>';
    animateCounterUp('counterBannerPlaceNum', counts.placeCount);
  });
}
window.renderLandingCounterBanner = renderLandingCounterBanner;

// 2026-08 랜딩화면 정리 — "한국 여행 코스 보기"(country 필터 재사용 버튼, 별다른 기능 없었음)와
// "지금 인기있는 작품"(수동 큐레이션 고정 목록이라 트래픽과 무관하게 항상 같은 8개만 노출되던 문제)을
// 걷어내고, 실제 장소 데이터(위경도)를 기반으로 계산한 "지역으로 찾기" 칩 행으로 교체했다.
// 2026-08 재설계(1차): 기존 REGION_DEFS는 "광역 지역 + 작품 수"였는데(예: 서울 10 = 서울에 장소가 있는
// 작품 10편), '내 주변 콘텐츠 투어'가 보여주는 "실제 장소 개수"와 숫자가 안 맞아 혼란을 줬다. 그래서
// 시군구 단위로 잘게 쪼개고 count를 실제 장소 개수로 바꿨는데, 이때는 "서울"(광역 전체)과 "서울 종로"
// (그 안의 구)가 서로 무관한 평면 배열 항목으로 나열돼 있어서 "서울 종로"+"서울 중구"+...의 합이
// "서울" 한 항목의 숫자와 안 맞는 게 이상하다는 지적을 받았다(부모 없이 부모/자식이 뒤섞여 있었던 셈).
// 2026-08 재설계(2차, 현재): 부모(광역시/도)-자식(시군구) 2단계 구조로 바꿨다. 각 부모의 count는
// children의 count 합과 항상 정확히 일치한다(= 실제 장소 데이터를 프로그램적으로 집계한 값이라 자동
// 보장됨). "부모만 있고 자식이 없는" 항목이 생기지 않도록, 시군구 문자열이 없는 원본 위치 141곳(예:
// 도로명이 "쌍문동"처럼 동/읍/면 단위뿐이거나 랜드마크명만 있는 경우)을 하나하나 실제 소재지 조사로
// 재분류해 전부 시군구 자식에 편입시켰다(세종시만 예외 — 세종은 실질적으로 구 단위가 없는 단일
// 특별자치시라 자식 없이 count만 갖는다). 새 작품이 추가되면 이 파이프라인(parse_regions.js →
// gen_region_defs2.js)을 다시 돌려 배열을 갱신해야 한다(자동 재계산 아님).
const REGION_DEFS = [

  { id:'kr-seoul', label:'서울', label_en:'Seoul', label_ja:'ソウル', count:128, workIds:["poksshak","kdemonhunters","squidgame","jikji","glory","woo","taebaek","sunshine","pachinko","dokkaebi","wangsanam","isatong"],
    children:[
      { id:'kr-seoul-junggu', label:'서울 중구', label_en:'Seoul Jung-gu', label_ja:'ソウル 中区', count:43, workIds:["kdemonhunters","squidgame","sunshine","dokkaebi"] },
      { id:'kr-seoul-jongno', label:'서울 종로', label_en:'Seoul Jongno', label_ja:'ソウル チョンノ', count:39, workIds:["poksshak","kdemonhunters","glory","taebaek","sunshine","pachinko","dokkaebi","wangsanam"] },
      { id:'kr-seoul-gangnam', label:'서울 강남', label_en:'Seoul Gangnam', label_ja:'ソウル カンナム', count:8, workIds:["kdemonhunters","woo","dokkaebi","isatong"] },
      { id:'kr-seoul-yongsan', label:'서울 용산', label_en:'Seoul Yongsan', label_ja:'ソウル ヨンサン', count:7, workIds:["kdemonhunters","jikji","sunshine","pachinko","dokkaebi","isatong"] },
      { id:'kr-seoul-seodaemun', label:'서울 서대문', label_en:'Seoul Seodaemun', label_ja:'ソウル ソデムン', count:5, workIds:["sunshine","pachinko","dokkaebi"] },
      { id:'kr-seoul-dobong', label:'서울 도봉', label_en:'Seoul Dobong', label_ja:'ソウル トボン', count:4, workIds:["squidgame","dokkaebi"] },
      { id:'kr-seoul-gwangjin', label:'서울 광진', label_en:'Seoul Gwangjin', label_ja:'ソウル クァンジン', count:3, workIds:["dokkaebi","isatong"] },
      { id:'kr-seoul-dongdaemun', label:'서울 동대문', label_en:'Seoul Dongdaemun', label_ja:'ソウル トンデムン', count:3, workIds:["kdemonhunters","dokkaebi"] },
      { id:'kr-seoul-seongdong', label:'서울 성동', label_en:'Seoul Seongdong', label_ja:'ソウル ソンドン', count:3, workIds:["dokkaebi","isatong"] },
      { id:'kr-seoul-songpa', label:'서울 송파', label_en:'Seoul Songpa', label_ja:'ソウル ソンパ', count:3, workIds:["kdemonhunters","squidgame"] },
      { id:'kr-seoul-yeongdeungpo', label:'서울 영등포', label_en:'Seoul Yeongdeungpo', label_ja:'ソウル ヨンドゥンポ', count:3, workIds:["squidgame","dokkaebi","isatong"] },
      { id:'kr-seoul-dongjak', label:'서울 동작', label_en:'Seoul Dongjak', label_ja:'ソウル トンジャク', count:2, workIds:["wangsanam"] },
      { id:'kr-seoul-seocho', label:'서울 서초', label_en:'Seoul Seocho', label_ja:'ソウル ソチョ', count:2, workIds:["jikji","dokkaebi"] },
      { id:'kr-seoul-gwanak', label:'서울 관악', label_en:'Seoul Gwanak', label_ja:'ソウル クァナク', count:1, workIds:["poksshak"] },
      { id:'kr-seoul-mapo', label:'서울 마포', label_en:'Seoul Mapo', label_ja:'ソウル マポ', count:1, workIds:["dokkaebi"] },
      { id:'kr-seoul-seongbuk', label:'서울 성북', label_en:'Seoul Seongbuk', label_ja:'ソウル ソンブク', count:1, workIds:["jikji"] },
    ]
  }
,
  { id:'kr-busan', label:'부산', label_en:'Busan', label_ja:'プサン', count:67, workIds:["poksshak","taebaek","pachinko"],
    children:[
      { id:'kr-busan-yeongdo', label:'부산 영도', label_en:'Busan Yeongdo', label_ja:'プサン ヨンド', count:24, workIds:["pachinko"] },
      { id:'kr-busan-junggu', label:'부산 중구', label_en:'Busan Jung-gu', label_ja:'プサン 中区', count:13, workIds:["pachinko"] },
      { id:'kr-busan-donggu', label:'부산 동구', label_en:'Busan Dong-gu', label_ja:'プサン 東区', count:9, workIds:["poksshak","pachinko"] },
      { id:'kr-busan-namgu', label:'부산 남구', label_en:'Busan Nam-gu', label_ja:'プサン 南区', count:6, workIds:["taebaek","pachinko"] },
      { id:'kr-busan-seogu', label:'부산 서구', label_en:'Busan Seo-gu', label_ja:'プサン 西区', count:4, workIds:["pachinko"] },
      { id:'kr-busan-haeundae', label:'부산 해운대', label_en:'Busan Haeundae', label_ja:'プサン ヘウンデ', count:4, workIds:["pachinko"] },
      { id:'kr-busan-dongnae', label:'부산 동래', label_en:'Busan Dongnae', label_ja:'プサン トンネ', count:2, workIds:["pachinko"] },
      { id:'kr-busan-saha', label:'부산 사하', label_en:'Busan Saha', label_ja:'プサン Saha', count:2, workIds:["pachinko"] },
      { id:'kr-busan-geumjeong', label:'부산 금정', label_en:'Busan Geumjeong', label_ja:'プサン クムジョン', count:1, workIds:["pachinko"] },
      { id:'kr-busan-busanjin', label:'부산 부산진', label_en:'Busan Busanjin', label_ja:'プサン プサンジン', count:1, workIds:["pachinko"] },
      { id:'kr-busan-suyeong', label:'부산 수영', label_en:'Busan Suyeong', label_ja:'プサン スヨン', count:1, workIds:["pachinko"] },
    ]
  }
,
  { id:'kr-daegu', label:'대구', label_en:'Daegu', label_ja:'テグ', count:14, workIds:["poksshak","pachinko","wangsanam","priests","littleforest"],
    children:[
      { id:'kr-daegu-junggu', label:'대구 중구', label_en:'Daegu Jung-gu', label_ja:'テグ 中区', count:8, workIds:["poksshak","pachinko","priests"] },
      { id:'kr-daegu-namgu', label:'대구 남구', label_en:'Daegu Nam-gu', label_ja:'テグ 南区', count:3, workIds:["priests"] },
      { id:'kr-daegu-gunwi', label:'대구 군위', label_en:'Daegu Gunwi', label_ja:'テグ クヌィ', count:1, workIds:["littleforest"] },
      { id:'kr-daegu-dalseo', label:'대구 달서', label_en:'Daegu Dalseo', label_ja:'テグ Dalseo', count:1, workIds:["priests"] },
      { id:'kr-daegu-dalseong', label:'대구 달성', label_en:'Daegu Dalseong', label_ja:'テグ Dalseong', count:1, workIds:["wangsanam"] },
    ]
  }
,
  { id:'kr-incheon', label:'인천', label_en:'Incheon', label_ja:'インチョン', count:36, workIds:["squidgame","glory","taebaek","sunshine","pachinko","dokkaebi","wangsanam"],
    children:[
      { id:'kr-incheon-junggu', label:'인천 중구', label_en:'Incheon Jung-gu', label_ja:'インチョン 中区', count:18, workIds:["squidgame","sunshine","pachinko","dokkaebi"] },
      { id:'kr-incheon-ganghwa', label:'인천 강화', label_en:'Incheon Ganghwa', label_ja:'インチョン カンファ', count:9, workIds:["sunshine","wangsanam"] },
      { id:'kr-incheon-yeonsu', label:'인천 연수', label_en:'Incheon Yeonsu', label_ja:'インチョン Yeonsu', count:4, workIds:["taebaek","pachinko","dokkaebi"] },
      { id:'kr-incheon-donggu', label:'인천 동구', label_en:'Incheon Dong-gu', label_ja:'インチョン 東区', count:2, workIds:["dokkaebi"] },
      { id:'kr-incheon-seogu', label:'인천 서구', label_en:'Incheon Seo-gu', label_ja:'インチョン 西区', count:2, workIds:["glory","dokkaebi"] },
      { id:'kr-incheon-ongjin', label:'인천 옹진', label_en:'Incheon Ongjin', label_ja:'インチョン Ongjin', count:1, workIds:["squidgame"] },
    ]
  }
,
  { id:'kr-gwangju', label:'광주', label_en:'Gwangju', label_ja:'クァンジュ', count:21, workIds:["poksshak","taebaek","sonyeon"],
    children:[
      { id:'kr-gwangju-donggu', label:'광주 동구', label_en:'Gwangju Dong-gu', label_ja:'クァンジュ 東区', count:12, workIds:["poksshak","taebaek","sonyeon"] },
      { id:'kr-gwangju-bukgu', label:'광주 북구', label_en:'Gwangju Buk-gu', label_ja:'クァンジュ 北区', count:7, workIds:["poksshak","taebaek","sonyeon"] },
      { id:'kr-gwangju-namgu', label:'광주 남구', label_en:'Gwangju Nam-gu', label_ja:'クァンジュ 南区', count:2, workIds:["sonyeon"] },
    ]
  }
,
  { id:'kr-daejeon', label:'대전', label_en:'Daejeon', label_ja:'テジョン', count:7, workIds:["squidgame","sunshine","pachinko"],
    children:[
      { id:'kr-daejeon-donggu', label:'대전 동구', label_en:'Daejeon Dong-gu', label_ja:'テジョン 東区', count:3, workIds:["sunshine"] },
      { id:'kr-daejeon-yuseong', label:'대전 유성', label_en:'Daejeon Yuseong', label_ja:'テジョン Yuseong', count:3, workIds:["squidgame","sunshine","pachinko"] },
      { id:'kr-daejeon-junggu', label:'대전 중구', label_en:'Daejeon Jung-gu', label_ja:'テジョン 中区', count:1, workIds:["sunshine"] },
    ]
  }
,
  { id:'kr-gangwon', label:'강원', label_en:'Gangwon', label_ja:'カンウォン', count:33, workIds:["poksshak","glory","dokkaebi","gwandong","wangsanam","isatong"],
    children:[
      { id:'kr-gangwon-yeongwol', label:'강원 영월', label_en:'Gangwon Yeongwol', label_ja:'カンウォン ヨンウォル', count:18, workIds:["wangsanam"] },
      { id:'kr-gangwon-gangneung', label:'강원 강릉', label_en:'Gangwon Gangneung', label_ja:'カンウォン カンヌン', count:4, workIds:["glory","dokkaebi","gwandong"] },
      { id:'kr-gangwon-goseong', label:'강원 고성', label_en:'Gangwon Goseong', label_ja:'カンウォン コソン', count:3, workIds:["gwandong"] },
      { id:'kr-gangwon-pyeongchang', label:'강원 평창', label_en:'Gangwon Pyeongchang', label_ja:'カンウォン ピョンチャン', count:3, workIds:["dokkaebi"] },
      { id:'kr-gangwon-samcheok', label:'강원 삼척', label_en:'Gangwon Samcheok', label_ja:'カンウォン サムチョク', count:1, workIds:["gwandong"] },
      { id:'kr-gangwon-sokcho', label:'강원 속초', label_en:'Gangwon Sokcho', label_ja:'カンウォン Sokcho', count:1, workIds:["isatong"] },
      { id:'kr-gangwon-yangyang', label:'강원 양양', label_en:'Gangwon Yangyang', label_ja:'カンウォン ヤンヤン', count:1, workIds:["gwandong"] },
      { id:'kr-gangwon-yeoncheon', label:'강원 연천', label_en:'Gangwon Yeoncheon', label_ja:'カンウォン Yeoncheon', count:1, workIds:["poksshak"] },
      { id:'kr-gangwon-wonju', label:'강원 원주', label_en:'Gangwon Wonju', label_ja:'カンウォン ウォンジュ', count:1, workIds:["gwandong"] },
    ]
  }
,
  { id:'kr-gyeonggi', label:'경기', label_en:'Gyeonggi', label_ja:'キョンギ', count:15, workIds:["woo","taebaek","dokkaebi","wangsanam","isatong"],
    children:[
      { id:'kr-gyeonggi-paju', label:'경기 파주', label_en:'Gyeonggi Paju', label_ja:'キョンギ Paju', count:3, workIds:["taebaek","dokkaebi","isatong"] },
      { id:'kr-gyeonggi-goyang', label:'경기 고양', label_en:'Gyeonggi Goyang', label_ja:'キョンギ コヤン', count:2, workIds:["dokkaebi","isatong"] },
      { id:'kr-gyeonggi-namyangju', label:'경기 남양주', label_en:'Gyeonggi Namyangju', label_ja:'キョンギ ナミャンジュ', count:2, workIds:["dokkaebi","wangsanam"] },
      { id:'kr-gyeonggi-anseong', label:'경기 안성', label_en:'Gyeonggi Anseong', label_ja:'キョンギ アンソン', count:2, workIds:["dokkaebi"] },
      { id:'kr-gyeonggi-bucheon', label:'경기 부천', label_en:'Gyeonggi Bucheon', label_ja:'キョンギ プチョン', count:1, workIds:["dokkaebi"] },
      { id:'kr-gyeonggi-seongnam', label:'경기 성남', label_en:'Gyeonggi Seongnam', label_ja:'キョンギ ソンナム', count:1, workIds:["dokkaebi"] },
      { id:'kr-gyeonggi-suwon', label:'경기 수원', label_en:'Gyeonggi Suwon', label_ja:'キョンギ スウォン', count:1, workIds:["woo"] },
      { id:'kr-gyeonggi-anyang', label:'경기 안양', label_en:'Gyeonggi Anyang', label_ja:'キョンギ アニャン', count:1, workIds:["dokkaebi"] },
      { id:'kr-gyeonggi-yangpyeong', label:'경기 양평', label_en:'Gyeonggi Yangpyeong', label_ja:'キョンギ ヤンピョン', count:1, workIds:["isatong"] },
      { id:'kr-gyeonggi-hanam', label:'경기 하남', label_en:'Gyeonggi Hanam', label_ja:'キョンギ ハナム', count:1, workIds:["dokkaebi"] },
    ]
  }
,
  { id:'kr-gyeongnam', label:'경남', label_en:'Gyeongnam', label_ja:'キョンナム', count:12, workIds:["woo","taebaek","pachinko"],
    children:[
      { id:'kr-gyeongnam-sancheong', label:'경남 산청', label_en:'Gyeongnam Sancheong', label_ja:'キョンナム Sancheong', count:3, workIds:["taebaek"] },
      { id:'kr-gyeongnam-changwon', label:'경남 창원', label_en:'Gyeongnam Changwon', label_ja:'キョンナム チャンウォン', count:2, workIds:["woo"] },
      { id:'kr-gyeongnam-hamyang', label:'경남 함양', label_en:'Gyeongnam Hamyang', label_ja:'キョンナム Hamyang', count:2, workIds:["taebaek"] },
      { id:'kr-gyeongnam-geoje', label:'경남 거제', label_en:'Gyeongnam Geoje', label_ja:'キョンナム コジェ', count:1, workIds:["taebaek"] },
      { id:'kr-gyeongnam-geochang', label:'경남 거창', label_en:'Gyeongnam Geochang', label_ja:'キョンナム Geochang', count:1, workIds:["taebaek"] },
      { id:'kr-gyeongnam-jinju', label:'경남 진주', label_en:'Gyeongnam Jinju', label_ja:'キョンナム チンジュ', count:1, workIds:["taebaek"] },
      { id:'kr-gyeongnam-hadong', label:'경남 하동', label_en:'Gyeongnam Hadong', label_ja:'キョンナム Hadong', count:1, workIds:["taebaek"] },
      { id:'kr-gyeongnam-hapcheon', label:'경남 합천', label_en:'Gyeongnam Hapcheon', label_ja:'キョンナム Hapcheon', count:1, workIds:["pachinko"] },
    ]
  }
,
  { id:'kr-gyeongbuk', label:'경북', label_en:'Gyeongbuk', label_ja:'キョンブク', count:22, workIds:["poksshak","pachinko","gwandong","wangsanam","priests","littleforest"],
    children:[
      { id:'kr-gyeongbuk-gunwi', label:'경북 군위', label_en:'Gyeongbuk Gunwi', label_ja:'キョンブク クヌィ', count:5, workIds:["littleforest"] },
      { id:'kr-gyeongbuk-uiseong', label:'경북 의성', label_en:'Gyeongbuk Uiseong', label_ja:'キョンブク ウィソン', count:5, workIds:["littleforest"] },
      { id:'kr-gyeongbuk-andong', label:'경북 안동', label_en:'Gyeongbuk Andong', label_ja:'キョンブク アンドン', count:3, workIds:["poksshak","pachinko"] },
      { id:'kr-gyeongbuk-uljin', label:'경북 울진', label_en:'Gyeongbuk Uljin', label_ja:'キョンブク ウルジン', count:2, workIds:["gwandong"] },
      { id:'kr-gyeongbuk-chilgok', label:'경북 칠곡', label_en:'Gyeongbuk Chilgok', label_ja:'キョンブク チルゴク', count:2, workIds:["poksshak","priests"] },
      { id:'kr-gyeongbuk-gyeongju', label:'경북 경주', label_en:'Gyeongbuk Gyeongju', label_ja:'キョンブク キョンジュ', count:1, workIds:["pachinko"] },
      { id:'kr-gyeongbuk-mungyeong', label:'경북 문경', label_en:'Gyeongbuk Mungyeong', label_ja:'キョンブク Mungyeong', count:1, workIds:["wangsanam"] },
      { id:'kr-gyeongbuk-sangju', label:'경북 상주', label_en:'Gyeongbuk Sangju', label_ja:'キョンブク Sangju', count:1, workIds:["wangsanam"] },
      { id:'kr-gyeongbuk-yeongju', label:'경북 영주', label_en:'Gyeongbuk Yeongju', label_ja:'キョンブク Yeongju', count:1, workIds:["wangsanam"] },
      { id:'kr-gyeongbuk-cheongdo', label:'경북 청도', label_en:'Gyeongbuk Cheongdo', label_ja:'キョンブク Cheongdo', count:1, workIds:["poksshak"] },
    ]
  }
,
  { id:'kr-sejong', label:'세종', label_en:'Sejong', label_ja:'セジョン', count:1, workIds:["glory"],
    children:[]
  }
,
  { id:'kr-jeonnam', label:'전남', label_en:'Jeonnam', label_ja:'チョンナム', count:93, workIds:["poksshak","taebaek","pachinko","hope","dokkaebi"],
    children:[
      { id:'kr-jeonnam-boseong', label:'전남 보성', label_en:'Jeonnam Boseong', label_ja:'チョンナム ポソン', count:35, workIds:["taebaek"] },
      { id:'kr-jeonnam-suncheon', label:'전남 순천', label_en:'Jeonnam Suncheon', label_ja:'チョンナム スンチョン', count:16, workIds:["taebaek","pachinko"] },
      { id:'kr-jeonnam-yeosu', label:'전남 여수', label_en:'Jeonnam Yeosu', label_ja:'チョンナム ヨス', count:14, workIds:["poksshak","taebaek"] },
      { id:'kr-jeonnam-haenam', label:'전남 해남', label_en:'Jeonnam Haenam', label_ja:'チョンナム ヘナム', count:13, workIds:["hope"] },
      { id:'kr-jeonnam-gurye', label:'전남 구례', label_en:'Jeonnam Gurye', label_ja:'チョンナム Gurye', count:6, workIds:["taebaek"] },
      { id:'kr-jeonnam-mokpo', label:'전남 목포', label_en:'Jeonnam Mokpo', label_ja:'チョンナム モクポ', count:3, workIds:["taebaek","pachinko"] },
      { id:'kr-jeonnam-gangjin', label:'전남 강진', label_en:'Jeonnam Gangjin', label_ja:'チョンナム Gangjin', count:1, workIds:["taebaek"] },
      { id:'kr-jeonnam-goheung', label:'전남 고흥', label_en:'Jeonnam Goheung', label_ja:'チョンナム Goheung', count:1, workIds:["taebaek"] },
      { id:'kr-jeonnam-gokseong', label:'전남 곡성', label_en:'Jeonnam Gokseong', label_ja:'チョンナム Gokseong', count:1, workIds:["taebaek"] },
      { id:'kr-jeonnam-naju', label:'전남 나주', label_en:'Jeonnam Naju', label_ja:'チョンナム Naju', count:1, workIds:["dokkaebi"] },
      { id:'kr-jeonnam-damyang', label:'전남 담양', label_en:'Jeonnam Damyang', label_ja:'チョンナム Damyang', count:1, workIds:["taebaek"] },
      { id:'kr-jeonnam-hwasun', label:'전남 화순', label_en:'Jeonnam Hwasun', label_ja:'チョンナム Hwasun', count:1, workIds:["taebaek"] },
    ]
  }
,
  { id:'kr-jeonbuk', label:'전북', label_en:'Jeonbuk', label_ja:'チョンブク', count:9, workIds:["poksshak","taebaek","dokkaebi"],
    children:[
      { id:'kr-jeonbuk-namwon', label:'전북 남원', label_en:'Jeonbuk Namwon', label_ja:'チョンブク ナモン', count:4, workIds:["taebaek"] },
      { id:'kr-jeonbuk-gochang', label:'전북 고창', label_en:'Jeonbuk Gochang', label_ja:'チョンブク コチャン', count:2, workIds:["poksshak","dokkaebi"] },
      { id:'kr-jeonbuk-jeonju', label:'전북 전주', label_en:'Jeonbuk Jeonju', label_ja:'チョンブク チョンジュ', count:2, workIds:["poksshak"] },
      { id:'kr-jeonbuk-jeongeup', label:'전북 정읍', label_en:'Jeonbuk Jeongeup', label_ja:'チョンブク チョンウプ', count:1, workIds:["poksshak"] },
    ]
  }
,
  { id:'kr-jeju', label:'제주', label_en:'Jeju', label_ja:'済州', count:17, workIds:["poksshak","pachinko"],
    children:[
      { id:'kr-jeju-jejusi', label:'제주 제주시', label_en:'Jeju Jeju-si', label_ja:'済州 済州市', count:12, workIds:["poksshak","pachinko"] },
      { id:'kr-jeju-seogwipo', label:'제주 서귀포', label_en:'Jeju Seogwipo', label_ja:'済州 ソグィポ', count:5, workIds:["poksshak","pachinko"] },
    ]
  }
,
  { id:'kr-chungnam', label:'충남', label_en:'Chungnam', label_ja:'チュンナム', count:21, workIds:["sunshine","pachinko","wangsanam","isatong"],
    children:[
      { id:'kr-chungnam-nonsan', label:'충남 논산', label_en:'Chungnam Nonsan', label_ja:'チュンナム ノンサン', count:17, workIds:["sunshine","pachinko"] },
      { id:'kr-chungnam-gongju', label:'충남 공주', label_en:'Chungnam Gongju', label_ja:'チュンナム Gongju', count:1, workIds:["wangsanam"] },
      { id:'kr-chungnam-buyeo', label:'충남 부여', label_en:'Chungnam Buyeo', label_ja:'チュンナム プヨ', count:1, workIds:["isatong"] },
      { id:'kr-chungnam-cheonan', label:'충남 천안', label_en:'Chungnam Cheonan', label_ja:'チュンナム チョナン', count:1, workIds:["pachinko"] },
      { id:'kr-chungnam-hongseong', label:'충남 홍성', label_en:'Chungnam Hongseong', label_ja:'チュンナム Hongseong', count:1, workIds:["wangsanam"] },
    ]
  }
,
  { id:'kr-chungbuk', label:'충북', label_en:'Chungbuk', label_ja:'チュンブク', count:11, workIds:["jikji","glory","woo"],
    children:[
      { id:'kr-chungbuk-cheongju', label:'충북 청주', label_en:'Chungbuk Cheongju', label_ja:'チュンブク チョンジュ(清州)', count:11, workIds:["jikji","glory","woo"] },
    ]
  }
];
// 2026-08 신규(안전장치): REGION_DEFS 생성 파이프라인(gen_region_defs2.js)은 실제 장소가 있는
// 광역만 만들어내므로, 아직 콘텐츠가 하나도 없는 광역(예: 울산 — 다른 16개 광역에는 이미 최소
// 1곳 이상 있는데 울산만 아직 없음)은 배열에서 통째로 빠진다. "17개 광역시/도가 항상 다 보이고,
// 콘텐츠가 없으면 그냥 0으로 표시"되는 게 사용자에게 더 자연스러우므로, 여기서 표준 17개 목록에
// 없는 항목을 count:0으로 채워 넣는다. 나중에 그 광역에 실제 장소가 생겨 파이프라인을 다시 돌리면
// 위 배열에 진짜 데이터가 채워지고, 이 patch는 이미 존재하는 항목은 건드리지 않으므로 자동으로
// 최신 상태가 반영된다(재배포마다 수동으로 손볼 필요 없음).
const KOREA_TOP_REGION_ORDER = [
  { id:'kr-seoul', label:'서울', label_en:'Seoul', label_ja:'ソウル' },
  { id:'kr-busan', label:'부산', label_en:'Busan', label_ja:'釜山' },
  { id:'kr-daegu', label:'대구', label_en:'Daegu', label_ja:'大邱' },
  { id:'kr-incheon', label:'인천', label_en:'Incheon', label_ja:'仁川' },
  { id:'kr-gwangju', label:'광주', label_en:'Gwangju', label_ja:'光州' },
  { id:'kr-daejeon', label:'대전', label_en:'Daejeon', label_ja:'大田' },
  { id:'kr-ulsan', label:'울산', label_en:'Ulsan', label_ja:'蔚山' },
  { id:'kr-gangwon', label:'강원', label_en:'Gangwon', label_ja:'江原' },
  { id:'kr-gyeonggi', label:'경기', label_en:'Gyeonggi', label_ja:'京畿' },
  { id:'kr-gyeongnam', label:'경남', label_en:'Gyeongnam', label_ja:'慶尚南道' },
  { id:'kr-gyeongbuk', label:'경북', label_en:'Gyeongbuk', label_ja:'慶尚北道' },
  { id:'kr-sejong', label:'세종', label_en:'Sejong', label_ja:'世宗' },
  { id:'kr-jeonnam', label:'전남', label_en:'Jeonnam', label_ja:'全羅南道' },
  { id:'kr-jeonbuk', label:'전북', label_en:'Jeonbuk', label_ja:'全羅北道' },
  { id:'kr-jeju', label:'제주', label_en:'Jeju', label_ja:'済州' },
  { id:'kr-chungnam', label:'충남', label_en:'Chungnam', label_ja:'忠清南道' },
  { id:'kr-chungbuk', label:'충북', label_en:'Chungbuk', label_ja:'忠清北道' }
];
KOREA_TOP_REGION_ORDER.forEach(function(def){
  if (!REGION_DEFS.some(function(r){ return r.id === def.id; })){
    REGION_DEFS.push({ id:def.id, label:def.label, label_en:def.label_en, label_ja:def.label_ja, count:0, workIds:[], children:[] });
  }
});
// 서울,부산,대구,인천,광주,대전,울산(특별시+6대 광역시) → 나머지는 가나다순, 표준 순서로 정렬한다.
// 위에서 새로 채워 넣은 항목(예: 울산)도 이 정렬로 제자리를 찾아간다.
(function(){
  const orderIndex = {};
  KOREA_TOP_REGION_ORDER.forEach(function(def, i){ orderIndex[def.id] = i; });
  REGION_DEFS.sort(function(a, b){ return orderIndex[a.id] - orderIndex[b.id]; });
})();
// 2026-08 재설계: 예전엔 "국가 필드(loc.country)를 쓰는 작품이 이사랑통역 하나뿐"이라는 이유로
// 일본·캐나다·이탈리아 3개국만 수동 집계했었다. 하지만 실제로는 이 사이트에 미국(브레이킹 배드,
// 스파이더맨, 오디세이 일부 등)·영국(해리포터, 브리저튼 등)·프랑스·중국·북한 등 훨씬 많은 나라의
// 실제 장소가 이미 담겨 있었는데 국가 칩에 반영이 안 돼 있었다. 그래서 전 작품의 실좌표 장소
// 1,050곳을 좌표 기반으로 다시 훑어(국가명이 본문에 적혀 있으면 그 텍스트를 우선 신뢰하고, 없으면
// 위경도 바운딩박스로 국가를 판정) 총 28개국(북한 포함)을 새로 집계했다(classify_countries.js).
// locIds는 "workId::locId" 형식 — 국가 칩을 클릭했을 때 그 나라의 실제 장소 목록을 보여주기 위한
// 참조용이다(작품 필터링이 아니라 장소 목록 모달을 여는 데 쓰인다 — goToRegion() 참고).
const COUNTRY_REGION_DEFS = [
  { id:'country-japan', label:'일본', label_en:'Japan', label_ja:'日本', count:214, workIds:["daemang","kiminonawa","suzume","onepiece","sunshine","pachinko","namiya","suspectx","byakuya","kimetsu","isatong","conanhighway"], locIds:["conanhighway::akarengasoko","conanhighway::turnpikehakone","conanhighway::shutokanagawa1","conanhighway::yokohamabaybridge","conanhighway::tanzawako","conanhighway::kanagawapolicehq","conanhighway::marinetower","conanhighway::chinatownyokohama","conanhighway::queenssquareyokohama","conanhighway::motomachi","conanhighway::osanbashi","conanhighway::hammerhead","conanhighway::worldporters","conanhighway::basegateyokohama","conanhighway::colettemare","conanhighway::minatomiraitokyu","conanhighway::odawarastation","conanhighway::hakoneyumotostation","conanhighway::odawaratourism","conanhighway::manyoparkyugawara","conanhighway::hakonesekisho","conanhighway::gorastation","daemang::okazaki","daemang::matsudairago","daemang::sunpu_imagawa","daemang::kiyosu","daemang::azuchi","daemang::hamamatsu","daemang::mikatagahara","daemang::nagashino","daemang::odawara","daemang::edo","daemang::oyama","daemang::sekigahara","daemang::fushimi","daemang::nijo","daemang::osaka","daemang::sunpu_castle","daemang::kunozan","daemang::nikko","daemang::kariya","daemang::kakegawa","daemang::kitanosho","daemang::honnoji","daemang::kasugayama","daemang::aizuwakamatsu","daemang::koyasan","daemang::kumamoto","daemang::fukuoka","daemang::sendai","daemang::ueda","daemang::nihonbashi","daemang::hibiya_reclamation","daemang::korakuen","daemang::hamarikyu","kiminonawa::hida_furukawa_station","kiminonawa::ketawakamiya_shrine","kiminonawa::hida_library","kiminonawa::nakaya_ramen","kiminonawa::ajidokoro_furukawa","kiminonawa::lake_suwa","kiminonawa::route361","kiminonawa::shinjuku_south","kiminonawa::shinanomachi","kiminonawa::yotsuya_station","kiminonawa::suga_shrine","kiminonawa::national_art_center","kiminonawa::hida_takayama","kiminonawa::furukawa_machinami","kiminonawa::hida_daishonyudo","suzume::aburatsu","suzume::yawatahama","suzume::kobe_fruit_flower_park","suzume::ninomiya_shopping_street","suzume::akashi_kaikyo_bridge","suzume::hijiribashi_ochanomizu","suzume::ushigafuchi","suzume::ooya_kaigan","onepiece::kumamotostatues","onepiece::tokyoexhibit","onepiece::usjosaka","sunshine::japan_yokohama_port","sunshine::japan_tokyo_legation_context","pachinko::osaka","pachinko::ikaino","pachinko::osaka_station","pachinko::nagano_countryside","pachinko::tokyo","pachinko::yokohama","pachinko::waseda_univ_story","pachinko::ikuno_koreatown","pachinko::tsuruhashi_station","pachinko::miyukimori_shrine","pachinko::osaka_history_museum","pachinko::peace_osaka","pachinko::osaka_castle","pachinko::osaka_port","pachinko::sakurajima_bay_area","pachinko::ikuno_ward_office","pachinko::waseda_univ_real","pachinko::shinokubo_koreatown","pachinko::korean_cultural_center_tokyo","pachinko::tokyo_reconstruction_museum","pachinko::yokoamicho_park","pachinko::yokohama_port_museum","pachinko::yokohama_port_hall","pachinko::yokohama_port","pachinko::kobe_port","pachinko::shimonoseki_port","pachinko::hakata_port","pachinko::fukuoka_asian_art_museum","pachinko::national_folk_museum_japan","pachinko::zainichi_history_archive","pachinko::kyoto_koreatown","pachinko::utoro_museum","pachinko::ikuno_korea_food_alley","pachinko::osaka_korean_church_real","pachinko::osaka_umeda_sky","pachinko::osaka_dotonbori","pachinko::osaka_nishinari","pachinko::osaka_tenma_market","pachinko::osaka_liberty_museum","pachinko::osaka_namba","pachinko::tokyo_marunouchi","pachinko::tokyo_ginza","pachinko::tokyo_roppongi","pachinko::tokyo_ueno_park","pachinko::tokyo_korean_town_okubo","pachinko::kobe_kitano","pachinko::osaka_korea_museum_annex","pachinko::osaka_tsuruhashi_yakiniku","pachinko::osaka_abeno_harukas","pachinko::osaka_shitennoji","pachinko::osaka_korean_ymca","pachinko::osaka_taisho_ward","pachinko::tokyo_asakusa","pachinko::tokyo_shinjuku","pachinko::tokyo_bay_area","pachinko::yokohama_chinatown","pachinko::kobe_koreatown","pachinko::osaka_korea_school","pachinko::osaka_korea_food_market","pachinko::tokyo_koreatown_church","namiya::bungotakada_showamachi","namiya::beppu_onsen","namiya::usa_jingu","namiya::higashino_hometown_ikuno","namiya::osaka_metropolitan_univ_nakamozu","namiya::denso_kariya","namiya::naoki_prize_tsukiji_shinkiraku","namiya::kodansha_hq","namiya::yufuin_station","namiya::oita_airport","suspectx::sx_shinohashi","suspectx::sx_kiyosu","suspectx::sx_kiyosumi_garden","suspectx::sx_monzennakacho","suspectx::sx_tomiokahachimangu","suspectx::sx_nihonbashi","byakuya::by_fuse_station","byakuya::by_fuse_honodori","byakuya::by_osaka_castle","byakuya::by_dotonbori","kimetsu::kimetsu_kamado_shrine","kimetsu::kimetsu_kamado_jigoku","kimetsu::kimetsu_kyoto_railway_museum","kimetsu::kimetsu_mt_kumotori","kimetsu::kimetsu_okawaso","kimetsu::kimetsu_kanroji_temple","kimetsu::kimetsu_asakusa_real","kimetsu::kimetsu_yoshiwara_real","kimetsu::kimetsu_chichibu_sl","kimetsu::kimetsu_usj","kimetsu::kimetsu_dazaifu_tenmangu","kimetsu::kimetsu_beppu_town","kimetsu::kimetsu_kinosaki_town","kimetsu::kimetsu_kyoto_gion","kimetsu::kimetsu_tokyo_station","kimetsu::kimetsu_ueno","kimetsu::kimetsu_fukuoka_hakata","kimetsu::kamado_house","kimetsu::ubuyashiki_estate","kimetsu::asakusa_backstreet","kimetsu::mugen_train_interior","kimetsu::yoshiwara_district","kimetsu::swordsmith_village","kimetsu::infinity_castle","kimetsu::fujikasane_peak","kimetsu::kimetsu_studio_ufotable","kimetsu::kimetsu_ginza","kimetsu::kimetsu_shirakawago","kimetsu::kimetsu_nezu_shrine","kimetsu::kimetsu_sensoji","kimetsu::kimetsu_sumida_river","kimetsu::kimetsu_kyoto_arashiyama","kimetsu::kimetsu_kamakura","kimetsu::kimetsu_nikko","kimetsu::kimetsu_hakone","kimetsu::kimetsu_kurokawa_onsen","kimetsu::kimetsu_takayama","kimetsu::kimetsu_kanazawa","kimetsu::kimetsu_kurashiki","kimetsu::kimetsu_yokohama","kimetsu::kimetsu_nakasendo","isatong::gokurakuji_station","isatong::tenzan_lab_ramen","isatong::benzaiten_nakamise","isatong::enoshima_post_office","isatong::oiwayamichi_street","isatong::goryo_shrine","isatong::katase_lighthouse","isatong::hase_crossing","isatong::enoshima_sea_candle","isatong::inamuragasaki_park"] },
  { id:'country-usa', label:'미국', label_en:'USA', label_ja:'アメリカ', count:137, workIds:["santi","breakingbad","strangerthings","taebaek","sunshine","pachinko","odyssey","spiderman","prada2"], locIds:["prada2::mcgrawhillbuilding","prada2::amnh","prada2::uestownhouse","prada2::centreislandestate1","prada2::centreislandestate2","prada2::woolworthmansion","prada2::centralpark","prada2::fifthavenue","santi::arecibo_observatory","santi::un_headquarters_nyc","santi::washington_dc","santi::kennedy_space_center","breakingbad::walterwhite_house","breakingbad::jesse_house","breakingbad::lospollos","breakingbad::carwash","breakingbad::tuco_office","breakingbad::gus_laundry","breakingbad::vamonos_pest","breakingbad::saul_office","breakingbad::gusfring_house","breakingbad::hank_marie_house","breakingbad::hector_nursing","breakingbad::tohajiilee","breakingbad::whitesands","strangerthings::jacksonga","strangerthings::hawkinslab","strangerthings::gwinnettmall","strangerthings::patrickhenryhs","strangerthings::stonemountain","strangerthings::eastpoint","strangerthings::romega","strangerthings::creelhouse","strangerthings::screengems","strangerthings::atlantabase","strangerthings::lenorahills","strangerthings::kamchatkaset","taebaek::hawaii_honolulu","sunshine::sanfrancisco_port","sunshine::us_koreanimmigrant_museum","sunshine::us_militaryacademy_context","pachinko::newyork","pachinko::nyc_koreatown","odyssey::universal_studios_la","spiderman::pinewoodatlanta","spiderman::mandarinorientalatl","spiderman::gradyhighschool","spiderman::delmarsdeli","spiderman::lernershops","spiderman::originalnails","spiderman::peachtree99","spiderman::sylvanbuilding","spiderman::littlejohntrail","spiderman::parkdrivebridge","spiderman::hindutempleatlanta","spiderman::embassysuitesperimeter","spiderman::porschecenter","spiderman::flushingmeadowsdrive","spiderman::longislandcityapt","spiderman::queensblvdfireescape","spiderman::steldertsstation","spiderman::franklinlanehigh","spiderman::thirtyfirststreet","spiderman::kingsfriedchicken","spiderman::statenislandferry","spiderman::governorsislandvent","spiderman::coneyislandboardwalk","spiderman::washingtonmonument","spiderman::grandcentralterminal","spiderman::starktowernyc","spiderman::queensborobridge","spiderman::astoriablvdstation","spiderman::courtsquarehunterspoint","spiderman::jfkairportqueens","spiderman::whitehallstreetlower","spiderman::reflectingpooldc","spiderman::forestneighborhoodqueens","spiderman::calvarycemeteryqueens","spiderman::unispherelandmark","spiderman::rooseveltislandtram","spiderman::midtownhighnamesake","spiderman::georgiaaquarium","spiderman::worldofcocacola","spiderman::cnncenter","spiderman::centennialolympicpark","spiderman::atlantabeltline","spiderman::poncecitymarket","spiderman::foxtheatreatlanta","spiderman::atlantahistorycenter","spiderman::piedmontparkatl","spiderman::mercedesbenzstadium","spiderman::highmuseumart","spiderman::stonemountainpark","spiderman::zooatlanta","spiderman::mlkhistoricsite","spiderman::krogstreetmarket","spiderman::timessquarenyc","spiderman::empirestatebuilding","spiderman::topoftherocknyc","spiderman::centralparknyc","spiderman::brooklynbridgenyc","spiderman::rockefellercenternyc","spiderman::statueoflibertynyc","spiderman::grandcentralfoodhall","spiderman::chryslerbuildingnyc","spiderman::oneworldobservatory","spiderman::queensmuseumny","spiderman::momaps1queens","spiderman::queensnightmarket","spiderman::astoriaparknyc","spiderman::highlinenyc","spiderman::brooklynmuseumny","spiderman::wallstreetbullny","spiderman::unionsquareny","spiderman::nationalmalldc","spiderman::lincolnmemorialdc","spiderman::airandspacemuseumdc","spiderman::uscapitoldc","spiderman::whitehouseviewdc","spiderman::jeffersonmemorialdc","spiderman::libraryofcongressdc","spiderman::naturalhistorymuseumdc","spiderman::nationalarchivesdc","spiderman::georgetownwaterfrontdc","spiderman::kaufmanastoriastudios","spiderman::movingimagemuseum","spiderman::bryantparknyc","spiderman::nyplmain","spiderman::madisonsquaregardenny","spiderman::laguardiaairportqueens","spiderman::flushingchinatownqueens","spiderman::batteryatlantadistrict","spiderman::freedomparkatlanta","spiderman::eastpotomacparkdc","spiderman::robertfkennedybridgeview","spiderman::gantryplazastatepark","spiderman::citifieldqueens"] },
  { id:'country-uk', label:'영국', label_en:'UK', label_ja:'イギリス', count:47, workIds:["harrypotter","gameofthrones","bridgerton","odyssey"], locIds:["harrypotter::kingscross","harrypotter::stpancras","harrypotter::leadenhall","harrypotter::australiahouse","harrypotter::londonzoo","harrypotter::millenniumbridge","harrypotter::claremontsquare","harrypotter::wbstudiotour","harrypotter::christchurch","harrypotter::bodleian","harrypotter::divinityschool","harrypotter::newcollege","harrypotter::gloucestercathedral","harrypotter::lacockabbey","harrypotter::lacockvillage","harrypotter::alnwickcastle","harrypotter::durhamcathedral","harrypotter::goathland","harrypotter::malhamcove","harrypotter::glenfinnan","harrypotter::glencoe","harrypotter::lochshiel","harrypotter::steallfalls","harrypotter::freshwaterwest","harrypotter::swinleyforest","gameofthrones::darkhedges","gameofthrones::castleward","gameofthrones::ballintoy","gameofthrones::cushendun","gameofthrones::tollymore","gameofthrones::gotstudiotour","bridgerton::rangershouse","bridgerton::royalcrescent","bridgerton::holburnemuseum","bridgerton::bathassembly","bridgerton::castlehoward","bridgerton::hamptoncourt","bridgerton::oldrnc","bridgerton::wiltonhouse","bridgerton::basildonpark","bridgerton::painshillpark","bridgerton::wrothampark","bridgerton::lancasterhouse","bridgerton::bathcitycenter","bridgerton::bridgertonexperience","odyssey::culbin_forest","odyssey::findlater_castle"] },
  { id:'country-canada', label:'캐나다', label_en:'Canada', label_ja:'カナダ', count:21, workIds:["pachinko","dokkaebi","isatong"], locIds:["pachinko::vancouver_region","pachinko::vancouver_gastown","dokkaebi::quebec_frontenac","dokkaebi::quebec_goblin_hill","dokkaebi::quebec_petit_champlain","dokkaebi::quebec_red_door","dokkaebi::quebec_noel_shop","dokkaebi::quebec_dufferin","dokkaebi::quebec_montmorency","dokkaebi::quebec_tourny","dokkaebi::quebec_st_pierre","dokkaebi::quebec_samuel_holland","dokkaebi::quebec_maison_demers","dokkaebi::quebec_boutique_jourdain","isatong::calgary_downtown","isatong::banff_avenue","isatong::canmore_town","isatong::kananaskis_area","isatong::quarry_lake_canmore","isatong::royal_tyrrell_museum","isatong::canadian_rockies_aurora"] },
  { id:'country-italy', label:'이탈리아', label_en:'Italy', label_ja:'イタリア', count:30, workIds:["emilyinparis","moneyheist","jikji","odyssey","isatong","prada2"], locIds:["prada2::breraacademy","prada2::palazzoparigi","prada2::galleriavittorioemanuele","prada2::palazzoclerici","prada2::villaarconati","prada2::villabalbiano","prada2::milanduomo","prada2::santamariadellegrazie","prada2::bellagio","prada2::comotown","emilyinparis::piazzacostaguti","emilyinparis::spanishsteps","emilyinparis::venice","moneyheist::florence","jikji::vaticanlibrary","odyssey::favignana_castle","odyssey::aeolian_vulcano","odyssey::aeolian_lipari","odyssey::faraglioni_lipari","odyssey::pietra_del_bagno","odyssey::basiluzzo_scylla","odyssey::real_strait_messina","odyssey::real_mount_etna","odyssey::real_monte_circeo","odyssey::real_li_galli","odyssey::real_lake_avernus","odyssey::real_thrinacia_sicily","isatong::siena_piazza_del_campo","isatong::perugia_via_appia","isatong::civita_di_bagnoregio"] },
  { id:'country-greece', label:'그리스', label_en:'Greece', label_ja:'ギリシャ', count:18, workIds:["odyssey"], locIds:["odyssey::voidokilia_beach","odyssey::nestors_cave","odyssey::methoni_castle","odyssey::acrocorinth","odyssey::real_ithaca","odyssey::real_pylos_nestor","odyssey::real_sparta","odyssey::real_mycenae","odyssey::real_cape_malea","odyssey::real_cape_tainaron","odyssey::real_corfu","odyssey::real_maroneia","odyssey::real_isthmus_corinth","odyssey::real_delphi","odyssey::real_mount_olympus","odyssey::real_acropolis_athens","odyssey::real_necromanteion","odyssey::real_cape_sounion"] },
  { id:'country-france', label:'프랑스', label_en:'France', label_ja:'フランス', count:16, workIds:["emilyinparis","jikji","hope"], locIds:["emilyinparis::placeestrapade","emilyinparis::terranera","emilyinparis::placedevalois","emilyinparis::palaisroyalgarden","emilyinparis::pontalexandre3","emilyinparis::palaisgarnier","emilyinparis::montmartre","emilyinparis::museearts","emilyinparis::cafedeflore","emilyinparis::provence","emilyinparis::megeve","emilyinparis::realrestaurants","jikji::bnfrichelieu","jikji::avignon","jikji::strasbourg","hope::hope_cannes_lumiere"] },
  { id:'country-new-zealand', label:'뉴질랜드', label_en:'New Zealand', label_ja:'ニュージーランド', count:14, workIds:["lotr"], locIds:["lotr::hobbiton","lotr::tongariro","lotr::ngauruhoe","lotr::kaitoke","lotr::mountsunday","lotr::putangirua","lotr::huttriver","lotr::glenorchy","lotr::fiordland","lotr::queenstown","lotr::twizel","lotr::wellington","lotr::wetaworkshop","lotr::pelorusriver"] },
  { id:'country-spain', label:'스페인', label_en:'Spain', label_ja:'スペイン', count:13, workIds:["gameofthrones","moneyheist","onepiece"], locIds:["gameofthrones::girona","gameofthrones::alcazarseville","gameofthrones::gaztelugatxe","moneyheist::csicmadrid","moneyheist::nuevosministerios","moneyheist::ministeriofomento","moneyheist::plazacallao","moneyheist::granvia","moneyheist::sanfrutos","moneyheist::torrelodones","moneyheist::madridstudio","moneyheist::madridcitymap","onepiece::canaryislands"] },
  { id:'country-germany', label:'독일', label_en:'Germany', label_ja:'ドイツ', count:11, workIds:["jikji","spiderman"], locIds:["jikji::gutenbergmuseum","jikji::mainzcathedral","spiderman::tegelbrandenburg","spiderman::reichstagberlin","spiderman::eastsidegalleryberlin","spiderman::tvtowerberlin","spiderman::checkpointcharlieberlin","spiderman::museumislandberlin","spiderman::tegelparknow","spiderman::kudammberlin","spiderman::potsdamerplatzberlin"] },
  { id:'country-romania', label:'루마니아', label_en:'Romania', label_ja:'ルーマニア', count:10, workIds:["wednesday","hope"], locIds:["wednesday::cantacuzino","wednesday::bucharestgarden","wednesday::palatulmonteoru","wednesday::casaniculescu","wednesday::sinaiastation","wednesday::politehnica","wednesday::buftea","wednesday::busteni","hope::hope_romania_forest","hope::hope_brasov"] },
  { id:'country-china', label:'중국', label_en:'China', label_ja:'中国', count:8, workIds:["santi"], locIds:["santi::tsinghua_university","santi::qinghua_fuzhong","santi::mohe_greater_khingan","santi::miyun_station","santi::xinglong_observatory","santi::fast_telescope","santi::beijing_city","santi::jiuquan_satellite_launch_center"] },
  { id:'country-north-korea', label:'북한', label_en:'North Korea', label_ja:'北朝鮮', count:8, workIds:["pachinko","gwandong"], locIds:["pachinko::pyongyang","gwandong::manpokdong","gwandong::geumgangdae","gwandong::jinheoldae","gwandong::gaesimdae","gwandong::hwaryongyeon","gwandong::sibipokpo","gwandong::chongseokjeong"] },
  { id:'country-south-africa', label:'남아프리카공화국', label_en:'South Africa', label_ja:'南アフリカ', count:7, workIds:["onepiece"], locIds:["onepiece::capetownstudios","onepiece::westerncapecoast","onepiece::southafricaregion","onepiece::goingmerryset","onepiece::baratieset","onepiece::loguetownset","onepiece::drumislandset"] },
  { id:'country-croatia', label:'크로아티아', label_en:'Croatia', label_ja:'クロアチア', count:5, workIds:["gameofthrones"], locIds:["gameofthrones::dubrovnik","gameofthrones::lovrijenac","gameofthrones::lokrum","gameofthrones::split","gameofthrones::trsteno"] },
  { id:'country-iceland', label:'아이슬란드', label_en:'Iceland', label_ja:'アイスランド', count:4, workIds:["gameofthrones","odyssey"], locIds:["gameofthrones::thingvellir","gameofthrones::vatnajokull","odyssey::hjorleifshofdi","odyssey::landeyjahofn"] },
  { id:'country-morocco', label:'모로코', label_en:'Morocco', label_ja:'モロッコ', count:4, workIds:["gameofthrones","odyssey"], locIds:["gameofthrones::essaouira","odyssey::essaouira_morocco","odyssey::ait_ben_haddou","odyssey::tahanaout_morocco"] },
  { id:'country-ireland', label:'아일랜드', label_en:'Ireland', label_ja:'アイルランド', count:4, workIds:["wednesday"], locIds:["wednesday::powerscourt","wednesday::charleville","wednesday::claraghwoods","wednesday::dublinwicklow"] },
  { id:'country-panama', label:'파나마', label_en:'Panama', label_ja:'パナマ', count:2, workIds:["santi","moneyheist"], locIds:["santi::panama_canal","moneyheist::panamathailand"] },
  { id:'country-malta', label:'몰타', label_en:'Malta', label_ja:'マルタ', count:2, workIds:["odyssey"], locIds:["odyssey::kalkara_malta","odyssey::real_gozo_calypso"] },
  { id:'country-australia', label:'호주', label_en:'Australia', label_ja:'オーストラリア', count:1, workIds:["santi"], locIds:["santi::sydney_australia"] },
  { id:'country-venezuela', label:'베네수엘라', label_en:'Venezuela', label_ja:'ベネズエラ', count:1, workIds:["santi"], locIds:["santi::caracas_venezuela"] },
  { id:'country-belgium', label:'벨기에', label_en:'Belgium', label_ja:'ベルギー', count:1, workIds:["santi"], locIds:["santi::brussels_belgium"] },
  { id:'country-denmark', label:'덴마크', label_en:'Denmark', label_ja:'デンマーク', count:1, workIds:["moneyheist"], locIds:["moneyheist::copenhagen"] },
  { id:'country-myanmar', label:'미얀마', label_en:'Myanmar', label_ja:'ミャンマー', count:1, workIds:["taebaek"], locIds:["taebaek::burma_front"] },
  { id:'country-western-sahara', label:'서사하라', label_en:'Western Sahara', label_ja:'西サハラ', count:1, workIds:["odyssey"], locIds:["odyssey::dune_blanche"] },
  { id:'country-turkiye', label:'튀르키예', label_en:'Turkiye', label_ja:'トルコ', count:1, workIds:["odyssey"], locIds:["odyssey::real_troy_hisarlik"] },
  { id:'country-tunisia', label:'튀니지', label_en:'Tunisia', label_ja:'チュニジア', count:1, workIds:["odyssey"], locIds:["odyssey::real_djerba"] },
];
// 지금 펼쳐져 있는 광역(부모) 지역 id — 이 값이 있으면 그 지역의 시군구(자식) 칩 행을 아래에
// 추가로 그린다. 자식이 없는 광역(세종처럼 구 단위가 없는 경우)이나 국가 칩은 펼침 대상이 아니다.
let expandedRegionId = null;
// 2026-08 버그 수정: 칩의 "active"(선택됨) 표시를 workFilters.ids와의 집합 일치 여부로 판정했더니,
// 서로 다른 시군구가 우연히 같은 workIds 조합을 가진 경우(예: 광주 동구·북구가 둘 다 광주 전체와
// 동일한 작품 3개를 가짐, 대전 유성이 대전 전체와 동일한 작품 3개를 가짐) 광역을 클릭해 펼치기만
// 해도 그 광역과 우연히 작품 목록이 겹치는 시군구 칩까지 함께 활성화된 것처럼 보였다. 실제로
// "사용자가 마지막으로 클릭한 칩이 어느 것인지"를 별도로 기억해서, 그 칩 하나만 활성화되도록 한다.
let selectedRegionId = null;

function goToRegion(regionId){
  // 2026-08 재설계: 자식(시군구)이 있는 광역과 없는 광역(세종·아직 콘텐츠가 없는 울산 등)을 서로
  // 다른 분기로 처리했더니, 자식 없는 광역을 클릭해도 expandedRegionId를 안 건드려서 직전에
  // 펼쳐져 있던 다른 광역의 시군구 행이 화면에 그대로 남아있는 버그가 있었다("세종을 눌렀는데
  // 경북 하위 목록이 남아있음"). 이제 REGION_DEFS 최상위 항목(광역)은 자식 유무와 상관없이 전부
  // 이 branch 하나로 통일해서 처리한다 — 자식이 없으면 renderRegionRow()가 자기 자신을 유일한
  // '자식'으로 그려서(상위 지명 = 하위 지명), 다른 광역들과 똑같이 펼침/접힘 동작을 보여준다.
  const parent = REGION_DEFS.find(function(r){ return r.id === regionId; });
  if (parent){
    // 2026-08 버그 수정: 펼침/접힘과 별개로 카드 목록도 함께 필터링하는 건 그대로 두되, 화면을
    // 카드 목록 쪽으로 강제 스크롤하던 부분은 제거했다 — 방금 펼친 시군구 칩 행이 화면 밖으로
    // 밀려나 사용자가 다시 위로 스크롤해야 하는 불편함이 있었기 때문("서울을 눌렀는데 화면이
    // 아래로 확 튀어버림").
    expandedRegionId = (expandedRegionId === regionId) ? null : regionId;
    selectedRegionId = expandedRegionId; // 펼치기만 한 상태 — 하위 시군구는 아직 아무것도 선택되지 않음
    workFilters = { country:null, medium:null, genres:new Set(), query:'', ids:new Set(parent.workIds) };
    refreshAllFilterUIs();
    renderRegionRow();
    return;
  }
  // 국가 칩 — 예전엔 시군구 칩과 똑같이 "카드 목록 필터링"만 적용했는데, 그 나라를 다루는 작품이
  // 여러 개면 클릭해도 눈에 띄는 변화가 없어 보이거나, workIds 조합이 겹쳐 다른 국가 칩까지 같이
  // 활성화된 것처럼 보이는 문제가 있었다. 국가 칩은 이제 클릭 즉시 그 나라의 실제 장소 목록
  // 모달을 띄운다(openCountryLocModal — locIds로 매칭).
  const country = COUNTRY_REGION_DEFS.find(function(r){ return r.id === regionId; });
  if (country){
    openCountryLocModal(regionId);
    return;
  }
  // 시군구(자식) 칩 — 실제 필터링을 적용하고, 결과가 바뀌는 카드 목록으로 스크롤해 바로 보여준다
  // (자식 칩 클릭은 "펼치기"가 아니라 "이 시군구로 결과를 좁히기"가 목적이라 스크롤이 자연스럽다).
  let region = null;
  for (let i = 0; i < REGION_DEFS.length && !region; i++){
    region = (REGION_DEFS[i].children || []).find(function(c){ return c.id === regionId; });
  }
  if (!region) return;
  selectedRegionId = regionId; // 이 시군구 칩 하나만 선택 표시
  workFilters = { country:null, medium:null, genres:new Set(), query:'', ids:new Set(region.workIds) };
  refreshAllFilterUIs();
  renderRegionRow();
  const cards = document.getElementById('landingCards');
  if (cards) cards.scrollIntoView({ behavior:'smooth', block:'start' });
}
window.goToRegion = goToRegion;
// 2026-08 UI 개편(지역칩 스크롤 UX) — 예전엔 브라우저 기본 가로 스크롤바가 그대로 보여서
// 마감이 덜 된 것처럼 보였다. 스크롤바는 CSS에서 숨기고(cross-browser), 대신 좌우 화살표
// 버튼으로 한 번에 카드 2~3개 폭만큼 이동시킨다. 칩 목록(.region-row-chips)은 renderRegionRow()가
// 호출될 때마다 innerHTML로 새로 그려지므로, 화살표는 클릭 시점에 동적으로 현재 DOM을 찾는다.
// 2026-08 UI 개편: 히어로 아래 "지역별 여행" 버튼을 누르면 이 패널이 펼쳐지며 기존
// 지역칩 목록(#regionRowWrap, renderRegionRow가 그리는 내용 그대로)이 나타난다. 칩 자체는
// renderLandingCards()가 호출될 때마다 이미 그려져 있으므로(숨김 상태에서도), 여기서는
// hidden 속성만 토글하면 된다 — 다시 그릴 필요 없음.
function toggleHeroPanel(which){
  if (which !== 'region') return;
  const panel = document.getElementById('heroRegionPanel');
  const btn = document.getElementById('heroRegionBtn');
  if (!panel) return;
  const willShow = panel.hasAttribute('hidden');
  if (willShow){
    panel.removeAttribute('hidden');
    if (btn) btn.classList.add('active');
    if (panel.scrollIntoView) panel.scrollIntoView({ behavior:'smooth', block:'nearest' });
  } else {
    panel.setAttribute('hidden', '');
    if (btn) btn.classList.remove('active');
  }
}
window.toggleHeroPanel = toggleHeroPanel;

function scrollRegionRow(dir){
  const chipsRow = document.querySelector('#regionRow .region-row-chips');
  if (!chipsRow) return;
  chipsRow.scrollBy({ left: dir * 240, behavior: 'smooth' });
}
window.scrollRegionRow = scrollRegionRow;

function renderRegionRow(){
  const wrap = document.getElementById('regionRow');
  const wrapOuter = document.getElementById('regionRowWrap');
  if (!wrap) return;
  if (wrapOuter) wrapOuter.style.display = '';
  // 2026-08 버그 수정: 광역 칩을 클릭하면 wrap.innerHTML을 통째로 다시 그리는데, 이때
  // .region-row-chips가 새 DOM 요소로 교체되면서 가로 스크롤 위치(scrollLeft)가 0으로 리셋됐다.
  // 그래서 스크롤을 오른쪽으로 끌어 "전북"을 클릭하면, 시군구는 잘 펼쳐지는데 정작 방금 누른
  // "전북" 칩 자체는 스크롤이 왼쪽으로 튕기면서 화면 밖으로 사라져 사용자가 혼란스러워했다.
  // 재렌더링 전에 현재 scrollLeft를 저장해뒀다가, 새 DOM에 그대로 복원한다.
  const existingChipsRow = wrap.querySelector('.region-row-chips');
  const savedScrollLeft = existingChipsRow ? existingChipsRow.scrollLeft : 0;
  const labelEl = document.getElementById('regionRowLabel');
  if (labelEl) labelEl.textContent = currentLang === 'ja' ? '🗺️ 地域で探す' : (currentLang !== 'ko' ? '🗺️ Explore by region' : '🗺️ 지역으로 찾기');
  // 1단계: 광역시/도 칩 — count는 그 광역 전체의 실제 장소 개수(= 시군구 자식들 count의 합,
  // gen_region_defs2.js에서 프로그램적으로 집계해 항상 정확히 일치함). 모든 광역 칩은 클릭하면
  // 펼쳐진다(캐럿을 항상 보여줌) — 자식이 없는 광역(세종, 아직 콘텐츠가 없는 울산 등)도 아래
  // districtRowHtml에서 자기 자신을 유일한 자식으로 보여줘 동작이 일관되게 만든다.
  const koreaChipsHtml = REGION_DEFS.map(function(r){
    const label = currentLang === 'ja' ? r.label_ja : (currentLang !== 'ko' ? r.label_en : r.label);
    const active = selectedRegionId === r.id;
    const expanded = expandedRegionId === r.id;
    const caret = ' <span class="region-chip-caret">' + (expanded ? '▲' : '▼') + '</span>';
    return '<button type="button" class="region-chip' + (active ? ' active' : '') + (expanded ? ' expanded' : '') +
      '" onclick="goToRegion(\'' + r.id + '\')">' +
      label + ' <span class="region-chip-count">' + r.count + '</span>' + caret + '</button>';
  }).join('');
  // 2단계: 펼쳐진 광역이 있으면 그 시군구 자식 칩을 별도 행으로 추가한다(region-chip-child 클래스로
  // 들여쓰기 등 시각적으로 구분). 자식 칩의 count는 그 시군구의 실제 장소 개수 그대로.
  // 2026-08 버그 수정: 시군구 자식이 없는 광역(세종·울산 등)을 클릭했을 때 이 if문 안으로 아예
  // 안 들어가서 직전에 펼쳐져 있던 다른 광역의 하위 목록이 화면에 그대로 남는 버그가 있었다.
  // 이제 expandedRegionId가 가리키는 광역을 찾기만 하면(자식 유무와 무관하게) 항상 이 블록이
  // 실행되고, 자식이 없을 때는 자기 자신을 유일한 항목으로 보여준다("세종" 위에 "세종"이 다시
  // 뜨는 것처럼 보이지만, 상위 지명과 하위 지명이 같다는 걸 보여줘 다른 광역과 동작이 통일된다).
  let districtRowHtml = '';
  if (expandedRegionId){
    const expandedParent = REGION_DEFS.find(function(r){ return r.id === expandedRegionId; });
    if (expandedParent){
      const childSource = (expandedParent.children && expandedParent.children.length) ? expandedParent.children : [expandedParent];
      const childChips = childSource.map(function(c){
        const label = currentLang === 'ja' ? c.label_ja : (currentLang !== 'ko' ? c.label_en : c.label);
        const active = selectedRegionId === c.id;
        return '<button type="button" class="region-chip region-chip-child' + (active ? ' active' : '') + '" onclick="goToRegion(\'' + c.id + '\')">' +
          label + ' <span class="region-chip-count">' + c.count + '</span></button>';
      }).join('');
      districtRowHtml = '<div class="region-chip-row-children">' + childChips + '</div>';
    }
  }
  // 국가 칩은 한국 지역칩과 구분되도록 별도 클래스(region-chip-country)를 붙이고, 뱃지 숫자는
  // 작품 수가 아니라 그 나라의 실제 장소 수(count)를 보여준다. 국가 칩은 드릴다운이 없다(단일 단계).
  // 2026-08 수정: 예전엔 국가 칩도 광역 칩처럼 workFilters로 활성화 여부를 판정했는데, 한 나라를
  // 다루는 작품이 여러 개고 그 workIds 조합이 다른 나라 칩과 우연히 같아 보이는 경우(예: 옛날엔
  // 일본/캐나다/이탈리아 모두 이사랑통역 하나만 워크IDS였음) 관련 없는 칩까지 같이 오렌지색으로
  // 활성화된 것처럼 보이는 버그가 있었다. 국가 칩은 이제 카드 필터링이 아니라 그 나라의 실제 장소
  // 목록 모달을 여는 용도이므로(goToRegion 참고) active 상태 자체가 필요 없어 제거했다.
  const countryChipsHtml = COUNTRY_REGION_DEFS.map(function(r){
    const label = currentLang === 'ja' ? r.label_ja : (currentLang !== 'ko' ? r.label_en : r.label);
    return '<button type="button" class="region-chip region-chip-country" onclick="goToRegion(\'' + r.id + '\')">' +
      label + ' <span class="region-chip-count">' + r.count + '</span></button>';
  }).join('');
  // 1단계 칩(광역+국가)은 기존처럼 가로 스크롤되는 한 줄로 묶고, 펼쳐진 시군구 자식 칩은 그
  // 아래에 별도의 줄(region-chip-row-children)로 놓는다 — #regionRow 자체는 flex가 아니라 두
  // 줄을 세로로 쌓는 컨테이너로 바뀌었으므로, 가로 스크롤 스타일은 안쪽 래퍼(region-row-chips)에만 적용한다.
  wrap.innerHTML = '<div class="region-row-chips">' + koreaChipsHtml + countryChipsHtml + '</div>' + districtRowHtml;
  const newChipsRow = wrap.querySelector('.region-row-chips');
  if (newChipsRow && savedScrollLeft) newChipsRow.scrollLeft = savedScrollLeft;
}

/* ============================================================
   국가·매체·장르 필터 (2026-08 신규) — 랜딩 화면 카드 목록과
   헤더의 '작품 선택' 드롭다운 패널이 이 필터 상태 하나(workFilters)를 공유한다.
   작품 수가 계속 늘어나면서 목록을 한눈에 훑기 어려워져 도입.
   ============================================================ */
let workFilters = { country:null, medium:null, genres:new Set(), query:'' };
// 모바일에서 칩 목록을 기본적으로 접어두기 위한 펼침 상태(필터 값이 바뀌어 패널이
// 다시 그려져도 사용자가 펼쳐둔 상태가 도로 접히지 않도록 idPrefix별로 따로 기억한다).
let filterBarExpanded = { landing:false, picker:false };

function matchesWorkFilters(w){
  if (workFilters.ids && !workFilters.ids.has(w.id)) return false;
  if (workFilters.query){
    const q = workFilters.query.toLowerCase();
    const hay = (w.title + ' ' + w.author + ' ' + (w.title_en || '') + ' ' + (w.author_en || '')).toLowerCase();
    if (hay.indexOf(q) === -1) return false;
  }
  if (workFilters.country && w.country !== workFilters.country) return false;
  if (workFilters.medium && w.medium !== workFilters.medium) return false;
  if (workFilters.genres.size > 0){
    const wg = w.genres || [];
    let ok = false;
    workFilters.genres.forEach(function(g){ if (wg.indexOf(g) !== -1) ok = true; });
    if (!ok) return false;
  }
  return true;
}
// 2026-08 신규: 랜딩화면 카드가 매번 같은 순서(국가순 고정)로 보여서 "올 때마다 새 화면" 같은
// 느낌이 없다는 피드백 — 방문(세션) 단위로 한 번만 순서를 섞는다. 필터 칩을 누르거나 언어를
// 바꿀 때마다 renderLandingCards()가 다시 호출되는데, 그때마다 새로 섞으면 방금 보던 카드가
// 계속 자리를 옮겨 오히려 산만해지므로, 이 세션(sessionStorage, 탭을 닫을 때까지) 동안은
// 같은 순서를 유지하고 다음 방문(새 탭/새 세션)에만 다시 섞는다.
let _sessionCardOrder = null;
function shuffleArray(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}
function getSessionCardOrder(){
  if (_sessionCardOrder) return _sessionCardOrder;
  const allIds = WORKS.map(function(w){ return w.id; });
  let saved = null;
  try {
    const raw = sessionStorage.getItem('gcjgCardOrder');
    if (raw) saved = JSON.parse(raw);
  } catch(e){}
  // 저장된 순서가 있어도 지금의 전체 작품 id 집합과 정확히 같을 때만 재사용한다.
  // (그 사이 작품이 추가/삭제됐으면 낡은 순서를 버리고 새로 섞는다.)
  const savedValid = Array.isArray(saved) && saved.length === allIds.length &&
    saved.slice().sort().join('|') === allIds.slice().sort().join('|');
  const order = savedValid ? saved : shuffleArray(allIds.slice());
  if (!savedValid){
    try { sessionStorage.setItem('gcjgCardOrder', JSON.stringify(order)); } catch(e){}
  }
  const map = {};
  order.forEach(function(id, i){ map[id] = i; });
  _sessionCardOrder = map;
  return map;
}
function getFilteredWorks(shuffle){
  const matched = WORKS.filter(matchesWorkFilters);
  if (shuffle){
    const order = getSessionCardOrder();
    return matched.slice().sort(function(a, b){ return (order[a.id] || 0) - (order[b.id] || 0); });
  }
  // 국가 순서(한국·일본·미국·중국·영국·스페인)로 정렬 — 헤더 '작품 선택' 드롭다운은 이름을 찾아
  // 스캔하는 용도라 셔플하지 않고 이 고정 순서를 유지한다. 같은 국가 안에서는 등록된 순서 그대로(안정 정렬).
  return (typeof sortByCountryOrder !== 'undefined') ? sortByCountryOrder(matched, function(w){ return w.country; }) : matched;
}
function taxonomyLabel(table, id){
  const e = table[id];
  if (!e) return id;
  // 2026-08 버그 수정: 국가/매체/장르 분류 칩이 일본어 선택 시에도 영어(label_en)로만
  // 표시되던 문제 — label_ja를 우선 사용하도록 수정.
  if (currentLang === 'ja') return e.label_ja || e.label_en || e.label;
  return currentLang !== 'ko' ? e.label_en : e.label;
}
function countryLabel(id){ return taxonomyLabel(COUNTRY_TAXONOMY, id); }
function mediumLabel(id){ return taxonomyLabel(MEDIUM_TAXONOMY, id); }
function genreLabel(id){ return taxonomyLabel(GENRE_TAXONOMY, id); }

// 실제로 하나 이상의 작품에 쓰이고 있는 값만 칩으로 노출(빈 칩 방지)
function usedValues(field, isArray){
  const set = new Set();
  WORKS.forEach(function(w){
    if (isArray) (w[field] || []).forEach(function(v){ set.add(v); });
    else if (w[field]) set.add(w[field]);
  });
  return Array.from(set);
}

function chipRowHtml(dim, values, labelFn, multi){
  const allActive = multi ? (workFilters.genres.size === 0) : (!workFilters[dim]);
  let html = '<button type="button" class="filter-chip' + (allActive ? ' active' : '') + '" data-dim="' + dim + '" data-val="">' + t('filterAllChip') + '</button>';
  values.forEach(function(v){
    const active = multi ? workFilters.genres.has(v) : (workFilters[dim] === v);
    html += '<button type="button" class="filter-chip' + (active ? ' active' : '') + '" data-dim="' + dim + '" data-val="' + v + '">' + labelFn(v) + '</button>';
  });
  return html;
}

function buildFilterBarHtml(idPrefix){
  // 국가 칩도 등장 순서가 아니라 COUNTRY_ORDER(한국·일본·미국·중국·영국·스페인) 순서로 고정.
  const countries = (typeof sortByCountryOrder !== 'undefined')
    ? sortByCountryOrder(usedValues('country', false), function(c){ return c; })
    : usedValues('country', false);
  const mediums = usedValues('medium', false);
  const genres = usedValues('genres', true);
  const q = (workFilters.query || '').replace(/"/g, '&quot;');
  const expanded = filterBarExpanded[idPrefix] ? ' expanded' : '';
  return '' +
    '<div class="filter-bar' + expanded + '" id="' + idPrefix + 'FilterBar">' +
      '<input type="text" class="filter-search" id="' + idPrefix + 'FilterSearch" placeholder="' + t('filterSearchPlaceholder') + '" value="' + q + '">' +
      '<button type="button" class="filter-toggle-mobile" id="' + idPrefix + 'FilterToggle">' + (filterBarExpanded[idPrefix] ? t('workPickerCollapse') : t('workPickerToggle')) + '</button>' +
      '<div class="filter-group"><span class="filter-group-label">' + t('filterCountryLabel') + '</span><div class="filter-chips">' + chipRowHtml('country', countries, countryLabel, false) + '</div></div>' +
      '<div class="filter-group"><span class="filter-group-label">' + t('filterMediumLabel') + '</span><div class="filter-chips">' + chipRowHtml('medium', mediums, mediumLabel, false) + '</div></div>' +
      '<div class="filter-group"><span class="filter-group-label">' + t('filterGenreLabel') + '</span><div class="filter-chips">' + chipRowHtml('genre', genres, genreLabel, true) + '</div></div>' +
      '<button type="button" class="filter-reset-btn" id="' + idPrefix + 'FilterReset">' + t('filterResetBtn') + '</button>' +
    '</div>';
}

function wireFilterBar(idPrefix, onChange){
  const bar = document.getElementById(idPrefix + 'FilterBar');
  if (!bar) return;
  bar.querySelectorAll('.filter-chip').forEach(function(chip){
    chip.onclick = function(){
      const dim = chip.dataset.dim, val = chip.dataset.val;
      if (dim === 'genre'){
        if (val === '') workFilters.genres.clear();
        else if (workFilters.genres.has(val)) workFilters.genres.delete(val);
        else workFilters.genres.add(val);
      } else {
        workFilters[dim] = (val === '' ? null : (workFilters[dim] === val ? null : val));
      }
      onChange();
    };
  });
  const search = document.getElementById(idPrefix + 'FilterSearch');
  if (search){
    // 검색창은 칩 클릭과 달리 onChange()(=필터바 전체 innerHTML 재생성)를 그대로 쓰면 안 된다.
    // 매 키 입력마다 이 <input> 자체가 새 DOM 노드로 교체되면서 포커스가 끊기고,
    // 특히 한글은 조합 중인 자모가 초기화돼 "ㄷ"처럼 첫 자음만 쳐지고 멈추는 문제가 있었다.
    // 그래서 검색 입력 시에는 필터바를 다시 그리지 않고 결과 목록만 갱신한다.
    search.oninput = function(){
      workFilters.query = search.value;
      refreshResultsOnly();
    };
  }
  const reset = document.getElementById(idPrefix + 'FilterReset');
  if (reset){
    reset.onclick = function(){
      workFilters = { country:null, medium:null, genres:new Set(), query:'' };
      selectedRegionId = null;
      onChange();
    };
  }
  // 모바일 전용 '▾ 필터' 토글 — 칩 목록이 길어 기본 접힘 상태로 두고, 눌렀을 때만 펼침
  const toggle = document.getElementById(idPrefix + 'FilterToggle');
  if (toggle){
    toggle.onclick = function(){
      filterBarExpanded[idPrefix] = !filterBarExpanded[idPrefix];
      bar.classList.toggle('expanded', filterBarExpanded[idPrefix]);
      toggle.textContent = filterBarExpanded[idPrefix] ? t('workPickerCollapse') : t('workPickerToggle');
    };
  }
}

// 검색어 입력 전용 — 필터바(칩·입력창)는 그대로 두고 결과 목록만 다시 그린다.
// (검색창 자체를 다시 그리면 안 되는 이유는 위 wireFilterBar의 주석 참고)
function refreshResultsOnly(){
  renderLandingCards();
  const pickerPanel = document.getElementById('workPickerPanel');
  if (pickerPanel && !pickerPanel.hasAttribute('hidden')) renderWorkPickerList();
}
window.refreshResultsOnly = refreshResultsOnly;

// 랜딩 화면과 헤더 드롭다운, 둘 중 하나에서 필터를 바꾸면 둘 다 같은 상태로 다시 그린다
function refreshAllFilterUIs(){
  const landingWrap = document.getElementById('landingFilterWrap');
  if (landingWrap){
    landingWrap.innerHTML = buildFilterBarHtml('landing');
    wireFilterBar('landing', refreshAllFilterUIs);
  }
  renderLandingCards();
  const pickerPanel = document.getElementById('workPickerPanel');
  if (pickerPanel && !pickerPanel.hasAttribute('hidden')){
    const pickerWrap = document.getElementById('pickerFilterWrap');
    if (pickerWrap){
      pickerWrap.innerHTML = buildFilterBarHtml('picker');
      wireFilterBar('picker', refreshAllFilterUIs);
    }
    renderWorkPickerList();
  }
}
window.refreshAllFilterUIs = refreshAllFilterUIs;

function renderWorkPickerList(){
  const wrap = document.getElementById('pickerList');
  if (!wrap) return;
  const filtered = getFilteredWorks();
  const countEl = document.getElementById('pickerResultCount');
  if (countEl) countEl.textContent = filtered.length + t('filterCountLabel');
  if (filtered.length === 0){
    wrap.innerHTML = '<div class="filter-empty">' + t('filterNoResults') + '</div>';
    return;
  }
  wrap.innerHTML = filtered.map(function(w){
    const active = w.id === currentWorkId;
    return '<button type="button" class="work-picker-item' + (active ? ' active' : '') + '" onclick="selectWorkFromPicker(\'' + w.id + '\')">' +
      '<span class="dot" style="background:' + w.pinColor + '"></span>' +
      '<span class="work-picker-item-text"><span class="work-picker-item-title">' + tField(w, 'title') + '</span><span class="work-picker-item-sub">' + tField(w, 'author') + '</span></span>' +
    '</button>';
  }).join('');
}

function selectWorkFromPicker(workId){
  enterWork(workId);
  closeWorkPicker();
}
window.selectWorkFromPicker = selectWorkFromPicker;

function toggleWorkPicker(){
  const panel = document.getElementById('workPickerPanel');
  if (!panel) return;
  const isHidden = panel.hasAttribute('hidden');
  if (isHidden){
    panel.removeAttribute('hidden');
    const pickerWrap = document.getElementById('pickerFilterWrap');
    if (pickerWrap){
      pickerWrap.innerHTML = buildFilterBarHtml('picker');
      wireFilterBar('picker', refreshAllFilterUIs);
    }
    renderWorkPickerList();
  } else {
    panel.setAttribute('hidden', '');
  }
}
window.toggleWorkPicker = toggleWorkPicker;

function closeWorkPicker(){
  const panel = document.getElementById('workPickerPanel');
  if (panel) panel.setAttribute('hidden', '');
}
window.closeWorkPicker = closeWorkPicker;

// 패널 바깥을 클릭하면 자동으로 닫힘
document.addEventListener('click', function(e){
  const wrap = document.getElementById('workPickerWrap');
  if (!wrap) return;
  if (!wrap.contains(e.target)) closeWorkPicker();
});

function updateWorkPickerLabel(workId){
  const labelEl = document.getElementById('workPickerActiveTitle');
  const work = WORKS.find(function(w){ return w.id === workId; });
  if (labelEl && work) labelEl.textContent = '— ' + tField(work, 'title');
}
window.updateWorkPickerLabel = updateWorkPickerLabel;

// 2026-08 SEO 개선(개발자 확인 문구 반영): ?work=작품명 으로 들어온 SPA 화면의 canonical이
// 항상 루트("/")만 가리키던 것을, 실제로 보고 있는 작품에 대응하는 정적 SEO 페이지
// (/works/작품명/)를 가리키도록 작품별로 갱신한다. <link rel="canonical">이 없으면 새로 만든다.
function updateCanonicalUrl(workId){
  let link = document.querySelector('link[rel="canonical"]');
  if (!link){
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  const origin = location.origin || 'https://geugotjigeum.com';
  // 2026-08 2단계: 현재 언어에 맞는 정적 허브(ko: /works/, en: /en/works/, ja: /ja/works/)를
  // 가리킨다 — 언어 셸의 루트 canonical도 언어별 루트(/en/, /ja/)로.
  const langRoot = (currentLang === 'ko') ? '/' : '/' + currentLang + '/';
  const w = workId ? WORKS.find(function(x){ return x.id === workId; }) : null;
  link.setAttribute('href', w ? (origin + workHubPath(w)) : (origin + langRoot));
}
window.updateCanonicalUrl = updateCanonicalUrl;

// 2026-08: 로고를 누르면 '언제 어디서나' 처음 화면으로 돌아가야 하는데, 관계도·요약·제안·
// 안내·내 주변 투어 같은 모달이 열려 있으면 모달 배경(.modal-overlay, 화면 전체를 덮음)이
// 로고 클릭 자체를 가로채서 아무 반응이 없어 보이는 문제가 있었다. 그래서 로고를 누르면
// 열려 있는 모달·드롭다운을 전부 먼저 닫고, 모바일의 지도/정보 탭 상태도 초기화한다.
function closeAllModals(){
  document.querySelectorAll('.modal-overlay.show').forEach(function(m){ m.classList.remove('show'); });
  closeWorkPicker();
}
window.closeAllModals = closeAllModals;

function goToLanding(){
  closeAllModals();
  const appEl = document.getElementById('app');
  if (appEl){
    appEl.classList.add('landing');
    appEl.classList.remove('view-info'); // 모바일 '정보' 탭 상태로 남아있던 것도 초기화
  }
  // 2026-08 버그 수정: ?work=로 처음 들어올 때 FOUC(깜빡임) 방지를 위해 <html>에 붙이는
  // 'gcjg-boot-work' 클래스가, 작품이 정상적으로 로드된 뒤에도 지워지지 않고 계속 남아있었다.
  // 이 클래스가 남아있으면 CSS(html.gcjg-boot-work #app.landing #main{display:flex} 등)가
  // '#app.landing'보다 더 강하게 적용돼서, 로고를 눌러 #app에 landing 클래스를 다시 넣어도
  // 주소창은 처음 화면으로 바뀌는데 실제 화면은 계속 지도 화면에 머물러 있는 것처럼 보였다.
  document.documentElement.classList.remove('gcjg-boot-work');
  history.replaceState(null, '', location.pathname);
  currentView = { type:'landing' };
  updateCanonicalUrl(null);
  // 2026-08 버그 수정: 검색창에 글자가 남아있거나(예: 추모 배너를 눌러 "히가시노" 검색이 걸린 채),
  // 국가/매체/장르 칩이 선택된 채로 로고를 눌러 랜딩으로 돌아오면, workFilters가 그대로 남아있어서
  // 주소창은 처음 화면으로 바뀌었는데도 카드 목록은 계속 필터링된 채로 보였다(사용자가 검색어를
  // 직접 지워야만 원래대로 돌아옴). 로고 클릭 등 '초기 화면으로' 동작은 필터도 함께 초기화해야
  // 진짜 처음 화면처럼 느껴지므로, 여기서 필터 상태를 리셋하고 필터 UI·카드 목록을 다시 그린다.
  workFilters = { country:null, medium:null, genres:new Set(), query:'' };
  expandedRegionId = null; // 지역칩 드릴다운 펼침 상태도 초기 화면 진입 시 함께 접는다
  selectedRegionId = null;
  // 히어로의 "지역별 여행" 토글 패널도 다시 접어서, 다음에 홈으로 돌아왔을 때 항상 깔끔한
  // 기본 상태(검색창 + 3개 버튼만)로 보이게 한다.
  const heroRegionPanelEl = document.getElementById('heroRegionPanel');
  if (heroRegionPanelEl) heroRegionPanelEl.setAttribute('hidden', '');
  const heroRegionBtnEl = document.getElementById('heroRegionBtn');
  if (heroRegionBtnEl) heroRegionBtnEl.classList.remove('active');
  if (typeof refreshAllFilterUIs === 'function') refreshAllFilterUIs();
  if (typeof renderLandingCounterBanner === 'function') renderLandingCounterBanner();
  // 2026-08 버그 수정: 카드 목록까지 아래로 스크롤한 상태에서 홈 버튼(=로고 클릭과 동일)을 누르면
  // 화면 상태(필터 등)는 초기화되는데 스크롤 위치는 그대로 남아 있어 "눌러도 아무 반응이 없다"고
  // 느껴졌다. 실제 스크롤 컨테이너는 window가 아니라 overflow-y:auto인 #landingScreen이므로,
  // 그 요소를 맨 위로 스크롤해야 히어로 영역이 다시 눈에 보인다(모바일도 동일 컨테이너 구조).
  const landingScreenEl = document.getElementById('landingScreen');
  if (landingScreenEl) landingScreenEl.scrollTo({ top: 0, behavior: 'smooth' });
}
window.goToLanding = goToLanding;

/* ============================================================
   작품 데이터 지연 로딩 (2026-08 2단계 4-6 — V2 기획안 신규 항목)
   [배경] 이전에는 어떤 작품을 보든 32개 작품 전체의 장소·인물 파일(~1.1MB, 70개 script)을
   HTML이 무조건 전부 내려받았다. 이제 초기 HTML에는 코어(app/data/details/ja_content)만 싣고,
   작품 데이터 파일은 그 작품에 실제로 진입할 때 주입한다.
   [동작] data.js의 DATA는 typeof 가드 덕에 파일이 없으면 빈 배열로 시작한다.
   ensureWorkData()가 파일을 주입한 뒤 rebindWorkData()로 실데이터를 다시 바인딩하고,
   applyJaContent()로 일본어 필드도 재병합한다.
   [전 작품 데이터가 필요한 기능] '내 주변 투어'와 '같은 지역, 다른 이야기'는 로드된 작품만
   반영된다 — 대신 첫 화면이 뜨고 3초 뒤 백그라운드에서 나머지 전체를 미리 받아두므로
   (ensureAllData), 잠깐 뒤에는 이전과 완전히 같은 기능이 된다. 초기 렌더 경로에서만 빠진다는
   것이 Core Web Vitals 개선의 핵심이다.
   ============================================================ */
const WORK_DATA_FILES = {
  daemang: ['contentmap_daemang_people1.js', 'contentmap_daemang_people2.js'],
  kiminonawa: ['contentmap_kiminonawa_people.js'],
  suzume: ['contentmap_suzume_people.js'],
  poksshak: ['contentmap_poksshak_people.js'],
  santi: ['contentmap_santi_people.js', 'contentmap_santi_locations.js', 'contentmap_santi_extra.js'],
  breakingbad: ['contentmap_breakingbad_people.js', 'contentmap_breakingbad_locations.js'],
  harrypotter: ['contentmap_harrypotter_people.js', 'contentmap_harrypotter_locations.js'],
  kdemonhunters: ['contentmap_kdemonhunters_locations.js', 'contentmap_kdemonhunters_people.js'],
  gameofthrones: ['contentmap_got_locations.js', 'contentmap_got_people.js'],
  wednesday: ['contentmap_wednesday_locations.js', 'contentmap_wednesday_people.js'],
  strangerthings: ['contentmap_strangerthings_locations.js', 'contentmap_strangerthings_people.js'],
  squidgame: ['contentmap_squidgame_locations.js', 'contentmap_squidgame_people.js'],
  emilyinparis: ['contentmap_emilyinparis_locations.js', 'contentmap_emilyinparis_people.js'],
  bridgerton: ['contentmap_bridgerton_locations.js', 'contentmap_bridgerton_people.js'],
  lotr: ['contentmap_lotr_locations.js', 'contentmap_lotr_people.js'],
  moneyheist: ['contentmap_moneyheist_locations.js', 'contentmap_moneyheist_people.js'],
  onepiece: ['contentmap_onepiece_locations.js', 'contentmap_onepiece_people.js'],
  jikji: ['contentmap_jikji_locations.js', 'contentmap_jikji_people.js'],
  glory: ['contentmap_glory_locations.js', 'contentmap_glory_people.js'],
  woo: ['contentmap_woo_locations.js', 'contentmap_woo_people.js'],
  taebaek: ['contentmap_taebaek_locations.js', 'contentmap_taebaek_locations2.js', 'contentmap_taebaek_locations3.js', 'contentmap_taebaek_people.js', 'contentmap_taebaek_people2.js', 'contentmap_taebaek_people3.js', 'contentmap_taebaek_people4.js', 'contentmap_taebaek_people5.js'],
  sunshine: ['contentmap_sunshine_locations1.js', 'contentmap_sunshine_locations2.js', 'contentmap_sunshine_people1.js', 'contentmap_sunshine_people2.js'],
  pachinko: ['contentmap_pachinko_locations.js', 'contentmap_pachinko_people.js'],
  namiya: ['contentmap_namiya_locations.js', 'contentmap_namiya_people.js'],
  suspectx: ['contentmap_suspectx_locations.js', 'contentmap_suspectx_people.js'],
  byakuya: ['contentmap_byakuya_locations.js', 'contentmap_byakuya_people.js'],
  kimetsu: ['contentmap_kimetsu_locations.js', 'contentmap_kimetsu_people.js'],
  hope: ['contentmap_hope_locations.js', 'contentmap_hope_people.js'],
  odyssey: ['contentmap_odyssey_locations.js', 'contentmap_odyssey_people.js'],
  dokkaebi: ['contentmap_dokkaebi_locations.js', 'contentmap_dokkaebi_people.js'],
  gwandong: ['contentmap_gwandong_locations.js', 'contentmap_gwandong_people.js'],
  wangsanam: ['contentmap_wangsanam_locations.js', 'contentmap_wangsanam_people.js'],
  spiderman: ['contentmap_spiderman_locations.js', 'contentmap_spiderman_people.js'],
  sonyeon: ['contentmap_sonyeon_locations.js', 'contentmap_sonyeon_people.js'],
  priests: ['contentmap_priests_locations.js', 'contentmap_priests_people.js'],
  littleforest: ['contentmap_littleforest_locations.js', 'contentmap_littleforest_people.js'],
  isatong: ['contentmap_isatong_locations.js', 'contentmap_isatong_people.js'],
  conanhighway: ['contentmap_conanhighway_locations.js', 'contentmap_conanhighway_people.js'],
  prada2: ['contentmap_prada2_locations.js', 'contentmap_prada2_people.js'],
  wintersonata: ['contentmap_wintersonata_locations.js', 'contentmap_wintersonata_people.js'],
  coffeeprince: ['contentmap_coffeeprince_locations.js', 'contentmap_coffeeprince_people.js'],
  daejanggeum: ['contentmap_daejanggeum_locations.js', 'contentmap_daejanggeum_people.js']
};

const loadedWorkData = {};      // workId → true (파일 도착 + 재바인딩 완료)
const loadedScripts = {};       // src → true (로드 완료)
const loadingScripts = {};      // src → 대기 중인 콜백 배열 (지금 한창 로딩 중인 요청)
let allDataLoading = false;

// 2026-08 버그 수정: "내 주변 투어"가 호출하는 ensureAllData()와, 페이지 로드 3초 뒤 자동 실행되는
// 백그라운드 프리페치(아래 setTimeout)가 같은 순간에 겹치면, loadScriptOnce가 "로드 완료된 것"만
// 체크하고 "지금 로딩 중인 것"은 체크하지 않아서 같은 파일에 대해 <script> 태그가 두 번 삽입되고,
// const로 선언된 전역 변수(예: WANGSANAM_LOCATIONS)가 두 번 선언되며 SyntaxError가 났다
// ("Identifier ... has already been declared" — 페이지를 새로 열 때만 재현되고, 같은 페이지 안에서
// 다시 시도하면 이미 로드된 상태라 재현되지 않았던 이유). 로딩 중인 요청을 큐에 모아뒀다가
// 완료 시 한 번에 콜백을 실행하는 방식으로, 같은 src에 대한 동시 요청이 실제 <script> 태그를
// 딱 한 번만 만들도록 고쳤다.
function loadScriptOnce(src, done){
  if (loadedScripts[src]) return done();
  if (loadingScripts[src]){ loadingScripts[src].push(done); return; }
  loadingScripts[src] = [done];
  const s = document.createElement('script');
  // 언어 셸(/en/, /ja/)에서도 같은 파일을 찾도록 항상 루트 절대경로로 주입.
  // 단, file:// 로 연 프로토타입에서는 루트 경로가 없으므로 상대경로 유지.
  s.src = (location.protocol === 'file:') ? src : '/' + src;
  s.onload = function(){
    loadedScripts[src] = true;
    const cbs = loadingScripts[src] || [];
    delete loadingScripts[src];
    cbs.forEach(function(cb){ cb(); });
  };
  s.onerror = function(){ // 실패해도 진행 — DATA는 빈 배열로 남고 화면은 뜬다
    const cbs = loadingScripts[src] || [];
    delete loadingScripts[src];
    cbs.forEach(function(cb){ cb(); });
  };
  document.head.appendChild(s);
}

function ensureWorkData(workId, cb){
  cb = cb || function(){};
  const files = WORK_DATA_FILES[workId];
  if (!files || loadedWorkData[workId]) return cb();
  // 이미 데이터가 있으면(테스트 하네스처럼 전 파일이 선탑재된 환경) 주입 없이 통과
  if (DATA[workId] && DATA[workId].locations && DATA[workId].locations.length &&
      DATA[workId].people && DATA[workId].people.length){
    loadedWorkData[workId] = true;
    return cb();
  }
  let remain = files.length;
  files.forEach(function(f){
    loadScriptOnce(f, function(){
      remain--;
      if (remain === 0){
        if (typeof rebindWorkData !== 'undefined') rebindWorkData();
        if (typeof applyJaContent !== 'undefined') applyJaContent();
        loadedWorkData[workId] = true;
        cb();
      }
    });
  });
}

// 전 작품 데이터 로드 — '내 주변 투어' 진입 시, 그리고 백그라운드 프리페치에서 사용
function ensureAllData(cb){
  cb = cb || function(){};
  const ids = Object.keys(WORK_DATA_FILES).filter(function(id){ return !loadedWorkData[id]; });
  if (ids.length === 0) return cb();
  let remain = ids.length;
  ids.forEach(function(id){
    ensureWorkData(id, function(){ remain--; if (remain === 0) cb(); });
  });
}

// 첫 화면이 자리잡은 뒤(3초) 나머지 작품 데이터를 조용히 미리 받아둔다 —
// 초기 로드 지표(Core Web Vitals)에는 잡히지 않으면서, 잠시 뒤에는
// 내 주변 투어·같은 지역 교차 추천이 전 작품 기준으로 완전하게 동작한다.
setTimeout(function(){
  if (!allDataLoading){ allDataLoading = true; ensureAllData(); }
}, 3000);

function enterWork(workId){
  const appEl = document.getElementById('app');
  if (appEl) appEl.classList.remove('landing');
  // 작품이 실제로 화면에 뜨는 순간 FOUC 방지용 부트 클래스는 더 이상 필요 없으므로 바로 제거
  // (제거하지 않으면 이후 goToLanding()으로 되돌아갈 때 화면이 안 바뀌는 버그가 생김)
  document.documentElement.classList.remove('gcjg-boot-work');
  // 2026-08 9라운드: 모바일에서 "둘러보기"를 눌렀을 때 지도/정보 중 어느 화면이 뜨는지가
  // 이전 탐색 상태(view-info 클래스가 남아있었는지)에 따라 들쭉날쭉했다는 지적 — 여기서
  // 명시적으로 '정보' 탭으로 고정한다. 스킵-자동선택으로 열리는 화면이 바로 이 정보(사이드바)
  // 쪽 콘텐츠(장소｜작품｜인물｜여행 탭)이므로, PC에서 지도+정보가 나란히 보이는 것과 가장
  // 가까운 경험이 된다 — 지도부터 보여주면 핀만 잔뜩 있고 고를 콘텐츠가 안 보여 더 헷갈린다.
  if (isMobileLayout()) setMobileView('info');
  // 4-6 지연 로딩: 이 작품의 데이터가 아직 없으면 먼저 받아온 뒤 화면을 그린다.
  // 로딩 중임을 사이드바에 표시(파일이 수십 KB 수준이라 보통 한 프레임 안에 끝난다).
  const sBody = document.getElementById('sidebarBody');
  if (!loadedWorkData[workId] && WORK_DATA_FILES[workId] && sBody &&
      !(DATA[workId] && DATA[workId].locations && DATA[workId].locations.length)){
    sBody.innerHTML = '<div class="empty-state">⏳</div>';
  }
  ensureWorkData(workId, function(){
    // 2026-08 8라운드: 랜딩 카드 클릭(작품을 "고르는" 진입)은 특정 장소를 지목한 게 아니므로
    // 대표 장소로 바로 점프하지 않고 작품 소개(장소｜작품｜인물｜여행 탭) 화면부터 보여준다.
    loadWork(workId, {skipAutoSelect:true});
    setTimeout(function(){ map.resize(); }, 60);
  });
  history.replaceState(null, '', '?work=' + encodeURIComponent(workId));
  // 2026-08 개편: 첫 방문 시 자동으로 뜨던 사용법 안내 팝업을 제거했다.
  // 상단 '사용법' 버튼(showUsageGuide() 직접 호출)으로만 열리도록 함 — shouldShowUsageGuide()는
  // 더 이상 자동 트리거에 쓰이지 않지만, 추후 재사용 가능성을 위해 함수 자체는 남겨둔다.
}
window.enterWork = enterWork;

/* ============================================================
   내 주변 콘텐츠 투어 모달 (2026-08 신규)
   랜딩화면·헤더의 '내 주변 콘텐츠 투어' 버튼으로 진입. 작품을 고르지 않고
   위치+반경만으로 전 작품 통합 장소를 찾는다.
   ============================================================ */
let nearbyState = { center:null, centerLabel:'', radiusKm:50, category:null };
// 2026-08: '현재 위치 사용'과 '주소 검색' 두 방법이 나란히 보이면 "뭘 먼저 해야 하지?"라는 혼란이
// 생긴다는 피드백을 반영 — 기본은 큰 버튼 하나만 보이고, 이 값이 true일 때만 주소 입력창이 펼쳐진다.
let nearbyAddrExpanded = false;
function toggleNearbyAddrSearch(){
  nearbyAddrExpanded = !nearbyAddrExpanded;
  renderNearbyModal();
  if (nearbyAddrExpanded){
    const input = document.getElementById('nearbyAddressInput');
    if (input) input.focus();
  }
}
window.toggleNearbyAddrSearch = toggleNearbyAddrSearch;

// 2026-08 UI 개편: 히어로의 "여행지찾기" 버튼은 같은 모달을 "현재 위치 사용" 큰 버튼부터
// 보여주는 대신, 곧바로 주소 검색란이 펼쳐진 상태로 열어준다({addressMode:true}) — 사용자가
// 위치 권한을 쓰기 싫고 특정 지역명으로 바로 찾고 싶을 때를 위한 지름길.
function openNearbyModal(opts){
  nearbyAddrExpanded = !!(opts && opts.addressMode);
  document.getElementById('nearbyModal').classList.add('show');
  renderNearbyModal();
  if (opts && opts.addressMode){
    setTimeout(function(){
      const input = document.getElementById('nearbyAddressInput');
      if (input) input.focus();
    }, 0);
  }
  // 4-6 지연 로딩 대응: '내 주변 투어'는 전 작품 장소가 다 있어야 정확하므로,
  // 모달을 여는 순간 아직 안 받아온 작품 데이터를 마저 받아온 뒤 인덱스를 새로 만들어 다시 그린다.
  // (이미 다 받아온 상태라면 ensureAllData의 콜백이 바로 실행되어 사실상 비용이 없다)
  ensureAllData(function(){
    _allLocationsIndex = null; // 캐시 무효화 — 부분 데이터로 굳어버리는 것을 방지
    if (document.getElementById('nearbyModal').classList.contains('show')) renderNearbyModal();
  });
}
window.openNearbyModal = openNearbyModal;
function closeNearbyModal(){
  document.getElementById('nearbyModal').classList.remove('show');
}
window.closeNearbyModal = closeNearbyModal;

function useMyLocationForNearby(){
  const statusEl = document.getElementById('nearbyLocStatus');
  if (!navigator.geolocation){
    if (statusEl) statusEl.textContent = t('nearbyGeoError');
    return;
  }
  if (statusEl) statusEl.textContent = t('nearbyGeocoding');
  navigator.geolocation.getCurrentPosition(function(pos){
    nearbyState.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    nearbyState.centerLabel = currentLang === 'ja' ? '現在地' : (currentLang !== 'ko' ? 'My current location' : '현재 위치');
    nearbyAddrExpanded = false; // 큰 버튼으로 바로 정했으니 열려 있던 주소 검색란은 다시 접어 깔끔하게
    renderNearbyModal();
  }, function(){
    if (statusEl) statusEl.textContent = t('nearbyGeoError');
  }, { timeout: 10000 });
}
window.useMyLocationForNearby = useMyLocationForNearby;

// Nominatim(OpenStreetMap) 공개 지오코딩 API — 별도 API 키 없이 브라우저에서 바로 호출 가능.
// 실패(네트워크 차단·검색결과 없음)해도 조용히 안내 메시지만 보여주고, '현재 위치 사용'은 별도로 항상 동작한다.
function geocodeAddressForNearby(){
  const input = document.getElementById('nearbyAddressInput');
  const statusEl = document.getElementById('nearbyLocStatus');
  const q = input ? input.value.trim() : '';
  if (!q) return;
  if (statusEl) statusEl.textContent = t('nearbyGeocoding');
  fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q))
    .then(function(res){ return res.json(); })
    .then(function(results){
      if (!results || !results.length){ if (statusEl) statusEl.textContent = t('nearbyGeocodeError'); return; }
      nearbyState.center = { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
      nearbyState.centerLabel = q;
      renderNearbyModal();
    })
    .catch(function(){ if (statusEl) statusEl.textContent = t('nearbyGeocodeError'); });
}
window.geocodeAddressForNearby = geocodeAddressForNearby;

function setNearbyRadius(km){
  nearbyState.radiusKm = km;
  renderNearbyModal();
}
window.setNearbyRadius = setNearbyRadius;
function setNearbyCategory(cat){
  nearbyState.category = (nearbyState.category === cat) ? null : cat;
  renderNearbyModal();
}
window.setNearbyCategory = setNearbyCategory;

function jumpToNearbyResult(workId, locId){
  closeNearbyModal();
  // 랜딩 화면(#app.landing)에서 곧바로 '내 주변 투어' 결과를 클릭한 경우, loadWork()가 내부 상태는
  // 정상적으로 바꿔놓아도 #app에 landing 클래스가 남아 있으면 #main이 display:none이라 화면이 그대로
  // 랜딩으로 보이는 버그가 있었다 — enterWork()와 동일하게 landing 클래스를 반드시 제거해줘야 한다.
  const appEl = document.getElementById('app');
  if (appEl) appEl.classList.remove('landing');
  // 2026-08 8라운드: 어차피 60ms 뒤 showLocation()으로 특정 장소를 곧바로 띄우므로, 그 전에
  // 대표 장소가 잠깐 표시됐다가 바뀌는 깜빡임을 없애기 위해 자동 선택을 건너뛴다.
  loadWork(workId, {skipAutoSelect:true});
  history.replaceState(null, '', '?work=' + encodeURIComponent(workId));
  setTimeout(function(){ map.resize(); showLocation(WORKS.find(function(w){ return w.id === workId; }), DATA[workId], locId); }, 60);
}
window.jumpToNearbyResult = jumpToNearbyResult;

const NEARBY_RADII = [1, 5, 10, 30, 50, 70, 100];
const NEARBY_CATEGORIES = ['catStory','catFilm','catCreator','catCulture','catFood','catShopping','catEvent','catExperience'];

function renderNearbyModal(){
  const body = document.getElementById('nearbyModalBody');
  if (!body) return;
  const radiusChips = NEARBY_RADII.map(function(km){
    return '<button class="filter-chip' + (nearbyState.radiusKm === km ? ' active' : '') + '" onclick="setNearbyRadius(' + km + ')">' + km + 'km</button>';
  }).join('');
  const catChips = '<button class="filter-chip' + (!nearbyState.category ? ' active' : '') + '" onclick="setNearbyCategory(null)">' + t('nearbyCategoryAll') + '</button>' +
    NEARBY_CATEGORIES.map(function(c){
      return '<button class="filter-chip' + (nearbyState.category === c ? ' active' : '') + '" onclick="setNearbyCategory(\'' + c + '\')">' + t(c) + '</button>';
    }).join('');

  let resultsHtml;
  if (!nearbyState.center){
    resultsHtml = '<div class="filter-empty">' + t('nearbyEmptyBeforeSearch') + '</div>';
  } else {
    const all = getAllLocationsIndex();
    let matches = all.filter(function(l){ return haversineKm(nearbyState.center, l) <= nearbyState.radiusKm; });
    if (nearbyState.category) matches = matches.filter(function(l){ return l.category === nearbyState.category; });
    matches.forEach(function(l){ l._dist = haversineKm(nearbyState.center, l); });
    matches.sort(function(a,b){ return a._dist - b._dist; });
    if (!matches.length){
      resultsHtml = '<div class="filter-empty">' + t('nearbyEmptyNoResults') + '</div>';
    } else {
      resultsHtml = '<div class="filter-result-count">' + matches.length + t('nearbyResultCountSuffix') + '</div>' +
        '<div class="nearby-result-list">' + matches.map(function(l){
          return '<button class="nearby-result-item" style="--tier-color:' + TIER_COLOR[l.tier] + '" onclick="jumpToNearbyResult(\'' + l.workId + '\',\'' + l.locId + '\')">' +
            '<div class="nearby-result-top">' +
              '<span class="nearby-result-name">' + l.name + '</span>' +
              '<span class="nearby-result-dist">' + l._dist.toFixed(1) + 'km</span>' +
            '</div>' +
            '<div class="nearby-result-meta">' +
              '<span class="nearby-result-work" style="color:' + l.workPinColor + '">' + l.workTitle + '</span>' +
              '<span class="nearby-tier-badge" style="background:' + TIER_COLOR[l.tier] + '">' + t(TIER_LABEL_KEY[l.tier]) + '</span>' +
              '<span class="nearby-cat-badge">' + t(l.category) + '</span>' +
            '</div>' +
          '</button>';
        }).join('') + '</div>';
    }
  }

  body.innerHTML =
    '<p class="nearby-intro">' + t('nearbyIntro') + '</p>' +
    '<div class="nearby-loc-controls">' +
      // 2026-08 개선: 예전엔 '현재 위치 사용' 버튼과 주소 입력창이 나란히 있어서 "뭘 먼저 해야 하지?"
      // 하는 혼란이 있었다. 이제 기본은 큰 버튼 하나뿐이고, 주소로 직접 찾고 싶을 때만
      // 아래 링크를 눌러 입력창을 펼치는 구조로 바꿨다(둘 중 뭘 써야 할지 고민할 필요가 없게).
      '<button class="nearby-loc-btn-primary" onclick="useMyLocationForNearby()">' + t('nearbyUseLocationBtn') + '</button>' +
      '<button type="button" class="nearby-addr-toggle" onclick="toggleNearbyAddrSearch()">' +
        (nearbyAddrExpanded ? t('nearbyAddrToggleClose') : t('nearbyAddrToggleOpen')) +
      '</button>' +
      (nearbyAddrExpanded ?
        '<div class="nearby-addr-row">' +
          '<input type="text" id="nearbyAddressInput" class="filter-search" placeholder="' + t('nearbyAddressPlaceholder') + '" onkeydown="if(event.key===\'Enter\')geocodeAddressForNearby();">' +
          '<button class="filter-chip" onclick="geocodeAddressForNearby()">' + t('nearbySearchBtn') + '</button>' +
        '</div>' : '') +
      '<div id="nearbyLocStatus" class="nearby-loc-status">' + (nearbyState.center ? (t('nearbyCenterSet') + ' ' + nearbyState.centerLabel) : '') + '</div>' +
    '</div>' +
    '<div class="filter-group"><span class="filter-group-label">' + t('nearbyRadiusLabel') + '</span><div class="filter-chips">' + radiusChips + '</div></div>' +
    '<div class="filter-group"><span class="filter-group-label">' + t('nearbyCategoryLabel') + '</span><div class="filter-chips">' + catChips + '</div></div>' +
    '<div class="nearby-results">' + resultsHtml + '</div>';
}
window.renderNearbyModal = renderNearbyModal;

/* ============================================================
   국가 칩 클릭 → 실제 장소 목록 모달 (2026-08 신규, task #383)
   예전엔 국가 칩을 누르면 '내 주변 투어'와 무관하게 카드 목록만 필터링했는데, 한 나라를 다루는
   작품이 여러 개면 클릭해도 뚜렷한 변화가 안 보이거나, workIds 조합이 겹쳐 다른 국가 칩까지 같이
   활성화된 것처럼 보이는 문제가 있었다(예전엔 일본/캐나다/이탈리아 세 나라 모두 workIds가
   ['isatong']로 동일해서 셋 다 항상 같이 켜졌었다). COUNTRY_REGION_DEFS의 locIds(그 나라의 실제
   장소를 "workId::locId"로 적어둔 목록, 위 배열 정의부 주석 참고)를 getAllLocationsIndex()와
   매칭해, 클릭 즉시 그 나라의 실제 장소를 카드로 나열하는 모달을 띄운다 — '내 주변 투어' 결과
   카드와 같은 UI(.nearby-result-item)를 재사용해 클릭 한 번으로 지도의 그 장소로 바로 이동한다
   (jumpToNearbyResult 재사용).
   ============================================================ */
function openCountryLocModal(countryId){
  const modal = document.getElementById('countryLocModal');
  if (!modal) return;
  modal.dataset.countryId = countryId; // 언어 전환 시 재렌더링에 사용(updateLanguageUI 참고)
  modal.classList.add('show');
  renderCountryLocModal(countryId);
  // 4-6 지연 로딩 대응: 아직 안 받아온 작품 데이터가 있으면 마저 받아온 뒤 인덱스를 새로 만들어 다시 그린다.
  ensureAllData(function(){
    _allLocationsIndex = null;
    if (modal.classList.contains('show')) renderCountryLocModal(countryId);
  });
}
window.openCountryLocModal = openCountryLocModal;

function closeCountryLocModal(){
  const modal = document.getElementById('countryLocModal');
  if (modal) modal.classList.remove('show');
}
window.closeCountryLocModal = closeCountryLocModal;

function renderCountryLocModal(countryId){
  const titleEl = document.getElementById('countryLocModalTitleText');
  const body = document.getElementById('countryLocModalBody');
  if (!body) return;
  const country = COUNTRY_REGION_DEFS.find(function(c){ return c.id === countryId; });
  if (!country){ body.innerHTML = ''; return; }
  const countryLabel = currentLang === 'ja' ? country.label_ja : (currentLang !== 'ko' ? country.label_en : country.label);
  if (titleEl) titleEl.textContent = '🌍 ' + countryLabel;
  const locIdSet = new Set(country.locIds || []);
  const all = getAllLocationsIndex();
  const matches = all.filter(function(l){ return locIdSet.has(l.workId + '::' + l.locId); });
  // 같은 작품끼리 모아서 보여주면 어느 작품의 장소인지 한눈에 파악하기 쉽다.
  matches.sort(function(a,b){
    if (a.workTitle !== b.workTitle) return a.workTitle < b.workTitle ? -1 : 1;
    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
  });
  let resultsHtml;
  if (!matches.length){
    resultsHtml = '<div class="filter-empty">' + t('countryLocEmpty') + '</div>';
  } else {
    resultsHtml = '<div class="filter-result-count">' + matches.length + t('countryLocResultCountSuffix') + '</div>' +
      '<div class="nearby-result-list">' + matches.map(function(l){
        return '<button class="nearby-result-item" style="--tier-color:' + TIER_COLOR[l.tier] + '" onclick="closeCountryLocModal();jumpToNearbyResult(\'' + l.workId + '\',\'' + l.locId + '\')">' +
          '<div class="nearby-result-top">' +
            '<span class="nearby-result-name">' + l.name + '</span>' +
          '</div>' +
          '<div class="nearby-result-meta">' +
            '<span class="nearby-result-work" style="color:' + l.workPinColor + '">' + l.workTitle + '</span>' +
            '<span class="nearby-tier-badge" style="background:' + TIER_COLOR[l.tier] + '">' + t(TIER_LABEL_KEY[l.tier]) + '</span>' +
            '<span class="nearby-cat-badge">' + t(l.category) + '</span>' +
          '</div>' +
        '</button>';
      }).join('') + '</div>';
  }
  body.innerHTML = '<p class="nearby-intro">' + t('countryLocIntro') + '</p><div class="nearby-results">' + resultsHtml + '</div>';
}
window.renderCountryLocModal = renderCountryLocModal;

/* ---------- 사용법 안내 모달을 현재 언어로 그림 ---------- */
function renderGuideModal(){
  const titleEl = document.getElementById('guideModalTitleText');
  const bodyEl = document.getElementById('guideBody');
  const footerEl = document.getElementById('guideFooter');
  if (titleEl) titleEl.textContent = t('guideTitle');
  if (bodyEl){
    const steps = [
      [t('guideStep1Title'), t('guideStep1Desc')],
      [t('guideStep2Title'), t('guideStep2Desc')],
      [t('guideStep3Title'), t('guideStep3Desc')],
      [t('guideStep4Title'), t('guideStep4Desc')]
    ];
    bodyEl.innerHTML = '<p class="guide-intro">' + t('guideIntro') + '</p>' +
      steps.map(function(s, i){
        return '<div class="guide-step"><span class="num">' + (i + 1) + '</span><div><b>' + s[0] + '</b><br>' + s[1] + '</div></div>';
      }).join('');
  }
  if (footerEl){
    footerEl.innerHTML =
      '<button class="guide-btn ghost" onclick="dismissUsageGuide(1)">' + t('guideToday') + '</button>' +
      '<button class="guide-btn ghost" onclick="dismissUsageGuide(7)">' + t('guideWeek') + '</button>' +
      '<button class="guide-btn primary" onclick="dismissUsageGuide(0)">' + t('guideConfirm') + '</button>';
  }
}

/* ---------- 언어 전환 ---------- */
function setLang(lang){
  if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  // 언어를 바꾸면 주소창의 언어 프리픽스도 함께 바뀐다(재로딩 없는 replaceState —
  // 스크롤·필터·현재 화면 상태를 그대로 유지한 채 URL만 언어별 공식 주소가 되게).
  try {
    if (isAppShellPath()){
      const prefix = (lang === 'ko') ? '/' : '/' + lang + '/';
      history.replaceState(null, '', prefix + location.search + location.hash);
    }
  } catch(e){}
  document.querySelectorAll('.lang-toggle button').forEach(function(b){
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  const taglineEl = document.querySelector('header p');
  if (taglineEl) taglineEl.textContent = t('headerTagline');
  const guideBtn = document.getElementById('guideOpenBtnText');
  if (guideBtn) guideBtn.textContent = t('guideOpenBtn');
  const reportBtn = document.getElementById('reportOpenBtnText');
  if (reportBtn) reportBtn.textContent = t('reportOpenBtn');
  const nearbyBtn = document.getElementById('nearbyOpenBtnText');
  if (nearbyBtn) nearbyBtn.textContent = t('nearbyOpenBtn');
  const heroRegionBtnText = document.getElementById('heroRegionBtnText');
  if (heroRegionBtnText) heroRegionBtnText.textContent = t('heroRegionBtn');
  const heroNearbyBtnText = document.getElementById('heroNearbyBtnText');
  if (heroNearbyBtnText) heroNearbyBtnText.textContent = t('heroNearbyBtn');
  const heroSearchBtnText = document.getElementById('heroSearchBtnText');
  if (heroSearchBtnText) heroSearchBtnText.textContent = t('heroSearchBtn');
  renderHeroTodayPick();
  const homeIconBtnText = document.getElementById('homeIconBtnText');
  if (homeIconBtnText) homeIconBtnText.textContent = t('homeIconLabel');
  const footerReportLink = document.getElementById('footerReportLink');
  if (footerReportLink) footerReportLink.textContent = t('footerReportLink');
  const regionScrollLeftBtn = document.getElementById('regionScrollLeft');
  if (regionScrollLeftBtn) regionScrollLeftBtn.setAttribute('aria-label', t('regionScrollPrev'));
  const regionScrollRightBtn = document.getElementById('regionScrollRight');
  if (regionScrollRightBtn) regionScrollRightBtn.setAttribute('aria-label', t('regionScrollNext'));
  const footerAboutLink = document.getElementById('footerAboutLink');
  if (footerAboutLink) footerAboutLink.textContent = t('footerAbout');
  const footerContactLink = document.getElementById('footerContactLink');
  if (footerContactLink) footerContactLink.textContent = t('footerContact');
  const footerPrivacyLink = document.getElementById('footerPrivacyLink');
  if (footerPrivacyLink) footerPrivacyLink.textContent = t('footerPrivacy');
  const footerTermsLink = document.getElementById('footerTermsLink');
  if (footerTermsLink) footerTermsLink.textContent = t('footerTerms');
  const reportModalTitle = document.getElementById('reportModalTitle');
  if (reportModalTitle) reportModalTitle.textContent = t('reportModalTitle');
  const reportBodyText = document.getElementById('reportBodyText');
  if (reportBodyText) reportBodyText.textContent = t('reportBody');
  const reportEmailNote = document.getElementById('reportEmailNote');
  if (reportEmailNote) reportEmailNote.textContent = t('reportEmailNote');
  const relationsModalEl = document.getElementById('relationsModal');
  if (relationsModalEl && relationsModalEl.classList.contains('show') && currentWorkId){
    const relWork = WORKS.find(function(w){ return w.id === currentWorkId; });
    const relTitleEl = document.getElementById('relationsModalTitle');
    if (relTitleEl) relTitleEl.textContent = (relWork ? tField(relWork, 'title') + ' · ' : '') + t('relationsModalSuffix');
  }
  const nearbyModalTitle = document.getElementById('nearbyModalTitleText');
  if (nearbyModalTitle) nearbyModalTitle.textContent = t('nearbyModalTitle');
  const mapHomeBtnEl = document.getElementById('mapHomeBtn');
  if (mapHomeBtnEl) mapHomeBtnEl.title = t('mapHomeBtnTitle');
  const nearbyModalEl = document.getElementById('nearbyModal');
  if (nearbyModalEl && nearbyModalEl.classList.contains('show')) renderNearbyModal();
  const countryLocModalEl = document.getElementById('countryLocModal');
  if (countryLocModalEl && countryLocModalEl.classList.contains('show') && countryLocModalEl.dataset.countryId){
    renderCountryLocModal(countryLocModalEl.dataset.countryId);
  }
  const brandEl = document.querySelector('.brand');
  if (brandEl) brandEl.title = t('brandBackTitle');
  document.querySelectorAll('.mobile-tabbar button[data-view="map"]').forEach(function(b){ b.textContent = t('tabMap'); });
  document.querySelectorAll('.mobile-tabbar button[data-view="info"]').forEach(function(b){ b.textContent = t('tabInfo'); });
  // 아직 작품을 고르지 않은 초기 사이드바 상태도 현재 언어로 표시
  if (currentView.type === 'landing'){
    const sTitle = document.getElementById('sidebarTitle');
    const sBody = document.getElementById('sidebarBody');
    if (sTitle) sTitle.textContent = t('sidebarChooseTitle');
    if (sBody) sBody.innerHTML = '<div class="empty-state">' + t('sidebarEmptyHint') + '</div>';
  }
  renderGuideModal();
  renderLandingCopy();
  const landingFilterWrap = document.getElementById('landingFilterWrap');
  if (landingFilterWrap){
    landingFilterWrap.innerHTML = buildFilterBarHtml('landing');
    wireFilterBar('landing', refreshAllFilterUIs);
  }
  renderLandingCards();
  if (typeof renderLandingCounterBanner === 'function') renderLandingCounterBanner();
  const pickerBtnLabel = document.getElementById('workPickerBtnLabel');
  if (pickerBtnLabel) pickerBtnLabel.textContent = t('workPickerBtn');
  const pickerPanel = document.getElementById('workPickerPanel');
  if (pickerPanel && !pickerPanel.hasAttribute('hidden')){
    const pickerWrap = document.getElementById('pickerFilterWrap');
    if (pickerWrap){
      pickerWrap.innerHTML = buildFilterBarHtml('picker');
      wireFilterBar('picker', refreshAllFilterUIs);
    }
    renderWorkPickerList();
  }
  if (currentWorkId) updateWorkPickerLabel(currentWorkId);
  refreshCurrentView();
}
window.setLang = setLang;

// 랜딩/작품 목록/장소 상세/인물 상세 중 지금 보고 있는 화면을 기억해뒀다가,
// 언어를 바꾸면 그 화면을 같은 상태로 다시 그려준다.
function refreshCurrentView(){
  if (currentView.type === 'work'){
    const work = WORKS.find(function(w){ return w.id === currentView.workId; });
    const data = DATA[currentView.workId];
    if (work && data){ renderCrossPromo(work); resetSidebar(work, data); renderProgressBadge(work, data); }
  } else if (currentView.type === 'location'){
    const work = WORKS.find(function(w){ return w.id === currentView.workId; });
    const data = DATA[currentView.workId];
    if (work && data && data.locations.some(function(l){ return l.id === currentView.locId; })){
      showLocation(work, data, currentView.locId, true);
    }
  } else if (currentView.type === 'person'){
    if (DATA[currentView.workId]) showPerson(currentView.workId, currentView.personId);
  }
}

// 2026-08 3라운드: 장소 상세 화면 맨 아래 "← 작품 소개로 돌아가기" 버튼이 예전엔 loadWork()를 그대로
// 다시 호출했는데, loadWork()가 항상 대표 장소를 자동 선택하는 지금 구조에서는 이 버튼을 눌러도
// "장소 목록"이 아니라 매번 1번 장소로 되돌아갈 뿐이었다(사용자가 "메뉴가 무슨 의미인지 모르겠다"고
// 지적한 게 바로 이 버튼) — 71개 장소 중 14번째를 보다가 눌러도 항상 1번으로 튕기는 게 버그였던 셈.
// opts.skipAutoSelect를 넣어, 이 버튼에서 부를 때만 대표 장소 자동 선택을 건너뛰고 작품 소개
// 화면(hero/요약/작품 더 알아보기/인물 검색)과 전체 장소가 보이는 지도로만 돌아가게 했다.
function loadWork(workId, opts){
  const skipAutoSelect = !!(opts && opts.skipAutoSelect);
  currentWorkId = workId;
  eraMode = 'modern';
  currentView = { type:'work', workId:workId };
  // 작품을 (다시) 여는 시점에는 이전에 보던 인물/장소 상세의 '뒤로가기' 목적지가 더 이상
  // 유효하지 않으므로 초기화한다. 탭 목록에서 상세로 들어갈 때 showPerson/showLocation이
  // from 인자로 다시 채워준다.
  returnTarget = null;
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];

  updateCanonicalUrl(workId);
  updateWorkPickerLabel(workId);
  renderCrossPromo(work);
  resetSidebar(work, data);
  renderProgressBadge(work, data);

  // realm==='space'인 장소(삼체의 우주/함선 등)는 위도·경도가 없으므로 실제 지구 지도에는 표시하지 않는다.
  // (별도의 '우주 지도' 페이지에서만 다룸 — showLocation()의 우주 지도 버튼 참고)
  const mappableLocations = data.locations.filter(function(loc){ return loc.lat != null && loc.lng != null; });
  refreshLocationLayer(work, mappableLocations);

  // 장소가 여러 대륙에 걸친 작품은 WORK_MAP_HOME에 정의된 '본거지' 화면으로 진입한다
  // (전체 장소를 fitBounds로 한번에 담으면 대륙 사이 바다·엉뚱한 제3국이 중심에 찍히는 문제 방지).
  // 화면 밖에 남는 장소가 있으면 '처음 위치로' 버튼과 함께 발견 칩(renderOffscreenChips)도 갱신된다.
  flyToWorkHome(work, data);

  // 2026-08 지도 UX 개편 1단계("장소가 주인공"): 지도에 처음 들어왔을 때 오른쪽 패널이 작품
  // 소개(버튼 7개)로 시작되면 "그래서 뭘 눌러야 하지?"가 생긴다는 지적을 받아, 대표 장소
  // (order 값이 가장 작은 곳 = 데이터 작성 시 이미 "1번 장소"로 정해둔 곳, 예: 반지의 제왕 → 호비튼)를
  // 자동으로 선택된 상태로 시작한다. 작품 소개(예고편·줄거리·관계도 등)는 사라지지 않고
  // resetSidebar()가 그린 infoPageBtn 등으로 여전히 접근 가능 — 다만 첫 화면이 아니게 됐을 뿐이다.
  // 좌표 없는 작품(전부 space realm 등)이면 조용히 기존 작품 소개 화면을 그대로 유지한다.
  if (!skipAutoSelect && mappableLocations.length){
    const firstLoc = mappableLocations.slice().sort(function(a, b){
      return (a.order != null ? a.order : 999) - (b.order != null ? b.order : 999);
    })[0];
    if (firstLoc) showLocation(work, data, firstLoc.id);
  }
}

// 2026-08 라운드: 인물/장소 상세 화면의 '뒤로' 버튼이 예전엔 항상 loadWork()로 '작품' 탭에만
// 떨어져서, "인물 탭에서 인물을 눌렀는데 다시 인물 목록으로 못 돌아간다"는 지적을 받았다.
// resolveReturnTarget/goBack이 "어느 탭·어느 상세에서 들어왔는지"를 구체적으로 기억해뒀다가
// 그곳으로 정확히 되돌려준다. onclick 문자열에 'tab:people' / 'location:locId' / 'person:personId'
// 같은 짧은 태그를 심어두면 이 함수가 해석한다.
function resolveReturnTarget(from, workId){
  if (!from) return null;
  const i = from.indexOf(':');
  const kind = i === -1 ? from : from.slice(0, i);
  const val = i === -1 ? '' : from.slice(i + 1);
  if (kind === 'tab') return { type:'tab', workId:workId, tab:val };
  if (kind === 'location') return { type:'location', workId:workId, locId:val };
  if (kind === 'person') return { type:'person', workId:workId, personId:val };
  return null;
}
function goBack(){
  const rt = returnTarget;
  if (!rt || !DATA[rt.workId]){ loadWork(currentWorkId, {skipAutoSelect:true}); return; }
  if (rt.type === 'tab'){
    loadWork(rt.workId, {skipAutoSelect:true});
    switchWorkTab(rt.tab);
  } else if (rt.type === 'location'){
    const w = WORKS.find(function(x){ return x.id === rt.workId; });
    if (w) showLocation(w, DATA[rt.workId], rt.locId, false, 'tab:places');
  } else if (rt.type === 'person'){
    showPerson(rt.workId, rt.personId, 'tab:people');
  }
}
window.goBack = goBack;
// 뒤로가기 버튼의 라벨을 목적지에 맞게 구체적으로 보여준다("작품 소개로"만 있으면
// 인물 목록에서 왔는지 장소 목록에서 왔는지 알 수 없어 사용자가 혼란스러워했다).
function backBtnLabel(){
  const rt = returnTarget;
  if (rt && rt.type === 'tab' && rt.tab === 'people') return t('backToPeopleBtn');
  if (rt && rt.type === 'tab' && rt.tab === 'places') return t('backToPlacesBtn');
  if (rt && rt.type === 'location') return t('backToLocBtn');
  if (rt && rt.type === 'person') return t('backToPersonBtn');
  return t('backBtn');
}

// 지도 위 핀의 '방문 확인' 금색 테두리를 최신 상태로 다시 그린다.
// (loadWork에서 작품을 열 때, 그리고 showLocation에서 새로 방문 확인될 때마다 호출됨)
function refreshLocationLayer(work, mappableLocations){
  const visited = getVisited(work.id);
  const features = mappableLocations.map(function(loc){
    return {
      type:'Feature',
      geometry:{ type:'Point', coordinates:[loc.lng, loc.lat] },
      properties:{
        locId: loc.id, workId: work.id, color: work.pinColor,
        label: loc.nameInWork || loc.modernName,
        visited: visited.indexOf(loc.id) !== -1 ? 1 : 0
      }
    };
  });
  const source = map.getSource('locations');
  if (source) source.setData({ type:'FeatureCollection', features:features });
}

// 그 작품의 지도상 모든 장소(실존 좌표가 있는 곳)를 다 확인했을 때 딱 한 번 축하 토스트를 띄운다.
// (localStorage에 완주 기록을 남겨, 이후 재방문 시 매번 뜨지 않게 함 — 재확인은 방해가 아니라 동기부여여야 하므로)
function checkCompletion(work, data){
  const mappable = data.locations.filter(function(l){ return l.lat != null && l.lng != null; });
  if (!mappable.length) return;
  const visited = getVisited(work.id).filter(function(id){ return mappable.some(function(l){ return l.id === id; }); });
  if (visited.length < mappable.length) return;
  const doneKey = 'completed_' + work.id;
  if (localStorage.getItem(doneKey)) return;
  localStorage.setItem(doneKey, '1');
  showToast((currentLang !== 'ko'
    ? '🎉 Complete! You\'ve checked every place in "' + tField(work, 'title') + '".'
    : '🎉 완주했어요! "' + tField(work, 'title') + '"의 모든 장소를 확인하셨네요.'));
}

// 2026-08 등장인물 카드 UI — 이름 첫 글자를 딴 컬러 이니셜 아바타(실제 스틸/사진은 저작권상
// 이 사이트에 직접 게시하지 않으므로, 그 대안으로 만든 시각적 요소). person.symbolColor가 있으면
// 그 색을, 없으면 진영 색(factionColor)을 배경으로 쓴다.
function personInitial(name){
  const clean = (name || '').split(/[（(·・]/)[0].trim();
  return clean ? clean.charAt(0) : '?';
}
// 실제 배우/성우가 존재하는 매체인지 판정 — 소설(novel)은 실제로 연기한 사람이 없으므로
// actorWikiUrl 값이 데이터에 남아있더라도(과거 인물 자신의 위키 링크가 잘못 들어간 경우 등)
// "배우 프로필" UI를 노출하지 않는다. 애니메이션은 성우가 있으므로 그대로 노출한다.
const CAST_MEDIUMS = { tv_drama:true, film:true, anime_film:true, anime_series:true };
function hasCastFeature(work){
  return !!(work && CAST_MEDIUMS[work.medium]);
}
// 2026-08 SEO 1단계 — 이미지 alt 텍스트 정비. GSC 검색어 데이터로 확인된 실제 유입 패턴
// ("OO 촬영지" / 실존인물 소설은 "OO 배경지")을 그대로 alt에 반영해 이미지 검색에도 잡히게 한다.
function workImgAlt(work){
  const term = (work && work.medium === 'novel') ? t('imgAltTermNovel') : t('imgAltTermFilmed');
  return tField(work, 'title') + ' ' + term;
}
function personChip(workId, p, hasCast, from){
  // factionColor는 진영 문자열을 해시해 팔레트에서 색을 고르는 함수라, 언어별로 다른 문자열(한글/일본어)을
  // 넣으면 같은 인물인데도 언어를 바꿀 때 색이 바뀌어버린다 — 색 계산은 항상 원본(한국어) faction으로 고정.
  const avatarColor = p.symbolColor || factionColor(p.faction);
  const avatarCls = 'person-avatar' + ((hasCast && p.actorWikiUrl) ? ' has-actor' : '');
  const dName = pField(p, 'name'), dYears = pField(p, 'years'), dRole = pField(p, 'role'), dFaction = pField(p, 'faction');
  // from — 어디서 이 인물 칩을 눌렀는지(인물 탭 목록 / 어느 장소의 관련 인물 목록)를 표시해두면,
  // 인물 상세의 '뒤로' 버튼이 정확히 그 자리로 되돌아갈 수 있다. 기본값은 인물 탭.
  return '<button class="person-chip" style="border-left:4px solid ' + factionColor(p.faction) + ';" onclick="showPerson(\'' + workId + '\',\'' + p.id + '\',\'' + (from || 'tab:people') + '\')">' +
    '<div class="' + avatarCls + '" style="background:' + avatarColor + ';">' + personInitial(dName) + '</div>' +
    '<div class="person-chip-text">' +
      '<div class="pname">' + dName + '</div>' +
      '<div class="pyears">' + dYears + ' · ' + dRole + (dFaction ? ' · ' + dFaction : '') + '</div>' +
    '</div>' +
    '</button>';
}

function renderPeopleList(work, data, query){
  const q = (query || '').trim().toLowerCase();
  // 검색은 원본(한국어)과 일본어 필드를 모두 대상으로 한다 — 언어가 ja로 바뀌어도 사용자가 한글로
  // 치던 습관 그대로 검색할 수 있게(반대로 ja 표시 중에 일본어로 쳐도 찾히게) 하기 위함.
  const list = !q ? data.people : data.people.filter(function(p){
    const hay = [p.name, p.role, p.faction, p.period, p.name_ja, p.role_ja, p.faction_ja, p.period_ja]
      .filter(Boolean).join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  });
  const listEl = document.getElementById('peopleListInner');
  if (!listEl) return;
  const hasCast = hasCastFeature(work);
  listEl.innerHTML = list.length
    ? list.map(function(p){ return personChip(work.id, p, hasCast); }).join('')
    : '<div class="empty-state" style="padding:6px 2px;">' + (currentLang === 'ja' ? '一致する人物がいません。' : (currentLang !== 'ko' ? 'No matching characters.' : '일치하는 인물이 없습니다.')) + '</div>';
  const countEl = document.getElementById('peopleCount');
  if (countEl) countEl.textContent = list.length + ' / ' + data.people.length + (currentLang !== 'ko' ? '' : '명');
  // 검색창은 인물 이름과 장소 지명을 동시에 찾아주는 통합검색이라, 검색 중일 땐 섹션 제목을
  // '주요 인물'에서 '검색 결과'로 바꿔줘야 함 — 안 그러면 인물 0명에 장소만 나와도 '주요 인물'이라고
  // 표시되어 혼란스러움(사용자 피드백으로 발견된 문제).
  const titleEl = document.getElementById('peopleSectionTitle');
  if (titleEl) titleEl.textContent = q ? t('searchResultsTitle') : t('peopleTitle');

  // 같은 검색창에서 장소(지명)도 함께 찾아짐 — 인물 이름뿐 아니라 작중 지명·현재 지명으로도 검색 가능
  const locEl = document.getElementById('locationSearchResults');
  if (locEl){
    if (!q){
      locEl.innerHTML = '';
    } else {
      const locs = (data.locations || []).filter(function(l){
        return ((l.nameInWork||'') + ' ' + (l.modernName||'') + ' ' + (l.oldProvince||'') + ' ' + (tField(l,'tag')||'')).toLowerCase().indexOf(q) !== -1;
      });
      locEl.innerHTML = locs.length ? (
        '<div style="font-size:11px;color:var(--sub);margin:2px 0 6px;text-transform:uppercase;letter-spacing:.05em;">' + t('locationSearchLabel') + ' (' + locs.length + ')</div>' +
        locs.map(function(l){
          return '<button class="person-chip" style="border-left:4px solid ' + work.pinColor + ';" onclick="jumpToTimelineLoc(\'' + work.id + '\',\'' + l.id + '\')">' +
            '<div class="pname">' + (l.nameInWork || tField(l, 'modernName')) + '</div>' +
            '<div class="pyears">' + tField(l, 'modernName') + '</div>' +
          '</button>';
        }).join('')
      ) : '';
    }
  }
}

function togglePeopleList(){
  const wrap = document.getElementById('peopleListWrap');
  const btn = document.getElementById('peopleCollapseBtn');
  if (!wrap || !btn) return;
  const collapsed = wrap.style.display === 'none';
  wrap.style.display = collapsed ? '' : 'none';
  btn.textContent = collapsed ? t('collapseBtn') : t('expandBtn');
}
window.togglePeopleList = togglePeopleList;

// 2026-08 지도 UX 개편 6라운드: '작품' 탭이 "영화 소개 화면"처럼 안 느껴진다는 사용자 피드백에
// 따라, 히어로를 오버레이 포스터 형태로 키우고 예고편을 상단에 노출하고 사진 콜라주를 끼워 넣는
// 새 레이아웃을 만들었다. 처음엔 대표작 8개(HOOK_IMAGES_CLIENT 이미지가 확보된 작품)로만 시범
// 적용했으나, 7라운드에서 사용자 확인 후 "나머지도 하자"는 지시로 39개 전체로 확장함(8라운드).
// heroImage는 39개 작품 전원이 보유(2026-08 확인)하므로 게이트를 그 여부로만 둔다 — 이제
// 사실상 "히어로 있는 모든 작품"이라 파일럿이라 부르기 애매하지만, 향후 신규 작품 추가 시
// heroImage를 깜빡 빠뜨려도 조용히 기존 레이아웃으로 폴백하는 안전장치로 이름은 유지한다.
// 포토 콜라주(HOOK_IMAGES_CLIENT)는 33개 작품에만 있고 6개(glory/woo/taebaek/sunshine/
// pachinko/namiya)는 아직 없음 — 없는 작품은 콜라주 없이 히어로+예고편만 보인다(collageImgs
// 가 빈 배열이면 collageHtml이 빈 문자열이 되므로 자동으로 안전하게 생략됨, 없는 이미지를
// 지어내지 않는다는 원칙).
const HERO_POSTER_PILOT = null; // null이면 "heroImage가 있는 모든 작품"으로 취급(아래 isPosterWork 참고)

// 2026-08 문화 콘텐츠("작품 속 진짜 한국") 지도 화면 크로스링크 — 정적 SEO 페이지
// (generate_work_pages.js의 cultureSectionHtml)에만 있고 실제 지도 화면(SPA '작품' 탭)에는
// 빠져 있다는 사용자 지적 반영. CULTURE_TOPICS는 contentmap_culture.js가 전역으로 선언한다
// (index.html에 script 태그 추가됨). ko/en에서만 노출(문화 콘텐츠가 ko/en만 존재).
function cultureCrossLinkHtml(work){
  if (currentLang !== 'ko' && currentLang !== 'en') return '';
  if (typeof CULTURE_TOPICS === 'undefined' || !CULTURE_TOPICS || !CULTURE_TOPICS.length) return '';
  const topics = CULTURE_TOPICS.filter(function(topic){
    return (topic.relatedWorkIds || []).indexOf(work.id) !== -1;
  });
  if (!topics.length) return '';
  const prefix = currentLang === 'en' ? '/en' : '';
  const heading = currentLang === 'en' ? 'The Real Korea Behind the Scene' : '작품 속 진짜 한국';
  const sub = currentLang === 'en'
    ? 'What looks ordinary in this story is real Korean culture — here’s the story behind it.'
    : '이 작품 속 장면이 별거 아닌 것 같아도, 사실은 진짜 한국 문화입니다.';
  const items = topics.map(function(topic){
    const tc = topic[currentLang] || topic.ko;
    return '<a class="course-btn" style="display:block;text-align:left;" href="' + prefix + '/culture/' + topic.id + '/">' + tc.title + '</a>';
  }).join('');
  return '<div class="tab-scenic-header" style="margin-top:14px;"><span class="icon">🇰🇷</span><span class="label">' + heading + '</span></div>' +
    '<p style="font-size:13px;color:var(--sub);margin:0 0 8px;">' + sub + '</p>' +
    '<div style="display:flex;flex-direction:column;gap:8px;">' + items + '</div>';
}

function resetSidebar(work, data){
  document.getElementById('sidebar').classList.remove('sidebar-detail');
  // 2026-08 9라운드(모바일 점검): 포스터형 히어로 작품은 오버레이 안에 이미 제목이 크게 있으므로,
  // 탭바 위 #sidebarTitle에 같은 제목을 또 띄우면 화면에 제목이 두 번 나온다(사용자 스크린샷으로
  // 지적됨). 히어로가 없는 작품(현재는 없지만 향후 대비)은 오버레이 제목이 없으므로 여기서 계속
  // 보여준다. isPosterWork는 아래에서 계산하므로, 그 계산이 끝난 뒤 마지막에 title을 채운다.
  // 관계도(contentmap_relations.html)는 daemang/kiminonawa/suzume/poksshak용 데이터만 있고
  // 삼체용 그룹·엣지 데이터는 아직 없음 — 없는 채로 열면 대망 관계도가 잘못 표시되므로,
  // 데이터가 준비되기 전까지는 삼체에서만 이 버튼을 숨긴다 (틀린 정보보다 없는 게 낫다는 원칙).
  // 2026-08 10라운드: 원래 '작품' 탭 버튼 목록에 있었는데, "등장인물 관계도"는 인물 얘기이므로
  // '인물' 탭이 훨씬 자연스러운 자리라는 지적에 따라 이쪽으로 옮겼다(peopleHtml 조립보다 먼저
  // 계산해서 아래에서 바로 끼워 넣을 수 있게 함).
  const relationsBtnHtml = (work.id !== 'santi') ?
    '<button class="course-btn" style="border-style:solid;border-color:#3a4a6b;color:#9fb4ff;margin-bottom:10px;" onclick="openRelationsModal(\'' + work.id + '\')">' + t('relationsBtn') + '</button>' : '';
  let peopleHtml = '';
  if (data.people && data.people.length){
    // 2026-08 지도 UX 개편 3단계: '인물' 탭 자체가 이미 접기/펼치기 역할을 하므로,
    // 탭 안에 또 있던 접기 버튼(peopleCollapseBtn/togglePeopleList)은 중복이라 제거했다.
    peopleHtml =
      '<div class="tab-scenic-header">' +
        '<span class="icon">👤</span><span class="label" id="peopleSectionTitle">' + t('peopleTitle') + '</span>' +
        '<span id="peopleCount" class="count">' + data.people.length + (currentLang !== 'ko' ? '' : '명') + '</span>' +
      '</div>' +
      relationsBtnHtml +
      '<input id="peopleSearch" type="text" placeholder="' + t('peopleSearchPlaceholder') + '" ' +
      'style="width:100%;box-sizing:border-box;background:var(--panel2);border:1px solid var(--border);color:var(--text);' +
      'border-radius:8px;padding:9px 11px;font-size:13.5px;margin-bottom:10px;" oninput="renderPeopleList(WORKS.find(function(w){return w.id===\'' + work.id + '\';}), DATA[\'' + work.id + '\'], this.value)">' +
      '<div id="locationSearchResults"></div>' +
      '<div class="people-list" id="peopleListInner"></div>';
  }
  // 포스터형 히어로 대상 여부 — HERO_POSTER_PILOT이 배열이면 그 목록에 있는 작품만(시범 단계),
  // null이면 대표이미지가 있는 모든 작품에 적용(8라운드부터 전체 확장). 대표이미지가 없으면
  // 어느 경우든 조용히 기존 레이아웃으로 폴백한다(깨진 화면을 보여주지 않기 위해).
  const isPosterWork = !!work.heroImage && (HERO_POSTER_PILOT === null || HERO_POSTER_PILOT.indexOf(work.id) !== -1);
  // 포스터형 히어로일 땐 오버레이(.work-poster-title)가 제목을 이미 크게 보여주므로 상단 h2는
  // 완전히 숨긴다(텍스트만 비우면 margin으로 인한 빈 여백이 남으므로 display까지 끈다).
  // 히어로가 없는 예외적인 경우에만 h2가 유일한 제목 표시 수단이라 계속 보여준다.
  (function(){
    const titleEl = document.getElementById('sidebarTitle');
    titleEl.textContent = isPosterWork ? '' : tField(work, 'title');
    titleEl.style.display = isPosterWork ? 'none' : '';
  })();
  const posterTagline = isPosterWork ? tField(work, 'hookTagline') : '';
  const heroHtml = (work.heroImage && !isPosterWork) ?
    '<div class="hero-image"><img src="' + work.heroImage.url + '" alt="' + workImgAlt(work) + '" loading="lazy">' +
      '<div class="hero-credit"><a href="' + work.heroImage.creditUrl + '" target="_blank" rel="noopener">' + work.heroImage.credit + '</a></div>' +
    '</div>' : '';
  // 포스터형 히어로 — 이미지를 크게 키우고 그 위에 제목·한줄 태그라인을 그라데이션 오버레이로
  // 얹어 "영화 포스터" 느낌을 준다. 예고편 버튼도 접힌 목록 안이 아니라 히어로 바로 아래 큼직하게 노출.
  const posterHeroHtml = isPosterWork ?
    '<div class="work-poster-hero">' +
      '<img src="' + work.heroImage.url + '" alt="' + workImgAlt(work) + '" loading="lazy">' +
      '<div class="work-poster-overlay">' +
        '<div class="work-poster-title">' + tField(work, 'title') + '</div>' +
        (posterTagline ? '<div class="work-poster-tagline">' + posterTagline + '</div>' : '') +
      '</div>' +
    '</div>' +
    (work.heroImage.credit ? '<div class="hero-credit"><a href="' + work.heroImage.creditUrl + '" target="_blank" rel="noopener">' + work.heroImage.credit + '</a></div>' : '')
    : '';
  // 포토 콜라주 — 후킹페이지용으로 이미 조사해둔 작품별 추가 이미지(HOOK_IMAGES_CLIENT, 작품당
  // 2장, 히어로와는 다른 사진)를 지도 화면에도 재사용한다. 텍스트(줄거리 요약) 바로 다음, 버튼
  // 목록 앞에 끼워 넣어 "사진 사이사이 텍스트"가 아니라 "텍스트 다음 사진"으로 리듬을 만든다.
  const collageImgs = (isPosterWork && typeof HOOK_IMAGES_CLIENT !== 'undefined') ? (HOOK_IMAGES_CLIENT[work.id] || []) : [];
  const collageHtml = collageImgs.length ?
    '<div class="work-photo-collage">' +
      collageImgs.map(function(img){
        return '<figure><img src="' + img.url + '" alt="' + workImgAlt(work) + '" loading="lazy">' +
          '<figcaption><a href="' + img.creditUrl + '" target="_blank" rel="noopener">' + img.credit + '</a></figcaption></figure>';
      }).join('') +
    '</div>' : '';
  const longSummaryText = tField(work, 'longSummary');
  const longIntroHtml = longSummaryText ?
    '<div class="work-intro-long" id="workIntroLong" style="display:none;">' + longSummaryText + '</div>' +
    '<button class="read-more-btn" id="workIntroBtn" onclick="toggleWorkIntro()">' + t('readMore') + '</button>' : '';
  const contentNoteHtml = (currentLang !== 'ko' && !work['longSummary_' + currentLang])
    ? '<div style="font-size:11px;color:var(--sub);margin-top:8px;">' + t('contentNote') + '</div>' : '';
  // 팬·독자 커뮤니티 조사 결과 요약(communityNote) — 2026-08 5개 작품 고도화 기획안 반영
  const communityNoteText = tField(work, 'communityNote');
  const communityNoteHtml = communityNoteText ?
    '<div style="font-size:12px;color:var(--sub);line-height:1.6;margin-top:10px;padding:8px 10px;background:var(--panel2);border-radius:8px;border-left:3px solid var(--accent2);">💬 ' + communityNoteText + '</div>' : '';
  // 이미 이 작품을 좋아해서 들어온 사람들을 위한 리마인드용 — 예고편·원작 정보를 바로 찾아볼 수 있게
  const trailerUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(tField(work, 'title') + (currentLang !== 'ko' ? ' official trailer' : ' 공식 예고편'));
  // 2026-08: WORK_TRAILERS에 검증된 공식 예고편 영상 ID가 있으면 페이지 안에서 바로 재생되는
  // 16:9 임베드 버튼으로, 없으면 기존처럼 유튜브 검색 결과 페이지로 나가는 링크로 폴백한다.
  const trailerData = (typeof WORK_TRAILERS !== 'undefined') ? WORK_TRAILERS[work.id] : null;
  const trailerBtnHtml = trailerData
    ? '<button class="course-btn" style="border-style:solid;border-color:#4a3a20;color:#e0a862;" onclick="toggleTrailer(\'' + work.id + '\')">▶ ' + t('trailerBtn') + '</button><div id="trailerOutput"></div>'
    : '<a class="course-btn" style="display:block;text-decoration:none;border-color:#4a3a20;color:#e0a862;" href="' + trailerUrl + '" target="_blank" rel="noopener">' + t('trailerBtn') + '</a>';
  // 공식 포스터·스틸컷은 저작권이 있어 직접 게시하지 않고, 위키백과 문서(정당한 출처의 공식 이미지가
  // 이미 실려 있는 곳)로 바로 연결해요 — 링크만 제공하고 이미지를 이 사이트에 복제/호스팅하지 않음
  const posterHtml = work.posterPage ?
    '<a class="course-btn" style="display:block;text-decoration:none;border-color:#3a4a3a;color:#8ad08a;" href="' + work.posterPage + '" target="_blank" rel="noopener">' + t('posterBtn') + '</a>' : '';
  // 2026-08: /works/{id}/ 정적 SEO 페이지 → 지도 앱(?work=)으로 오는 링크는 있었지만 반대 방향
  // 링크가 없었다. 지도 앱에서도 이 작품의 정적 소개 페이지로 갈 수 있게 새 탭 링크를 추가 —
  // 페이지뷰(광고 노출) 확대와 검색엔진 재방문 동선 확보 목적.
  const infoPageBtnHtml =
    '<a class="course-btn" style="display:block;text-decoration:none;border-style:solid;border-color:var(--accent2);color:var(--accent2);" href="' + workHubPath(work) + '" target="_blank" rel="noopener">' + t('infoPageBtn') + '</a>';
  // 작품 내용 상세(개조식 줄거리) — 결말/반전은 포함하지 않으며, 클릭 시 스포일러 경고가 항상 먼저 보임
  const summaryBtnHtml = work.contentSummary ?
    '<button class="course-btn" style="border-style:solid;border-color:#5a3a1f;color:#e0a862;" onclick="openSummaryModal(\'' + work.id + '\')">' + t('summaryBtn') + '</button>' : '';
  // 타임라인/장면 데이터가 있는 작품일 때만 버튼을 보여줌 — getTimelineData()가 작품별 데이터를 일괄 조회
  const timelineDataForBtn = getTimelineData(work.id);
  const timelineBtnHtml = timelineDataForBtn ?
    '<button class="course-btn" style="border-style:solid;border-color:#4a3a6b;color:#c9a8ff;" onclick="renderTimeline(\'' + work.id + '\')">' + (work.id === 'santi' ? t('sceneTimelineBtn') : t('timelineBtn')) + '</button><div id="timelineOutput"></div>' : '';
  // 공식 스포티파이 임베드가 있는 작품일 때만 버튼을 보여줌 (WORK_SPOTIFY, data.js)
  const spotifyBtnHtml = (typeof WORK_SPOTIFY !== 'undefined' && WORK_SPOTIFY[work.id]) ?
    '<button class="course-btn" style="border-style:solid;border-color:#1DB954;color:#1DB954;" onclick="toggleSpotify(\'' + work.id + '\')">🎵 ' + t('spotifyBtn') + '</button><div id="spotifyOutput"></div>' : '';
  // 삼체는 우주(space realm) 장소를 위한 별도 우주 지도 페이지가 있으므로, 이 작품일 때만 진입 버튼을 보여줌
  const universeLaunchHtml = (work.id === 'santi') ?
    '<a class="course-btn" style="display:block;text-decoration:none;border-color:#2b3a6b;color:#9fb0ff;" href="contentmap_universe.html" target="_blank" rel="noopener">' + t('universeMapLaunchBtn') + '</a>' : '';
  // 2026-08 지도 UX 개편 3단계: 예고편/줄거리/포스터/관계도/연대기/Spotify 버튼을 접이식
  // "작품 더 알아보기" 박스 하나에 욱여넣던 2단계 방식을, 사용자와 합의한 "장소｜작품｜인물｜여행"
  // 진짜 탭 구조로 격상한다. 각 콘텐츠는 이제 접었다 펼치는 게 아니라 자기 탭에 그냥 펼쳐져 있다
  // (탭 자체가 이미 "안 보고 싶으면 다른 탭 누르면 됨"이라는 접기 역할을 하므로 이중 접기가 불필요해짐).
  // 포스터형 히어로 작품은 예고편 버튼을 히어로 바로 아래(파일럿 8개 한정, 접힌 목록 밖)로
  // 끌어올린다 — 아래쪽 버튼 목록에서는 중복 노출을 피하기 위해 뺀다.
  const prominentTrailerHtml = isPosterWork ? '<div class="work-poster-trailer-cta">' + trailerBtnHtml + '</div>' : '';
  const workTabHtml =
    (isPosterWork ? posterHeroHtml + prominentTrailerHtml : heroHtml) +
    infoPageBtnHtml +
    '<div class="empty-state">' +
      '<span class="dot" style="background:' + work.pinColor + ';display:inline-block;margin-right:4px;"></span>' + tField(work, 'summary') +
      longIntroHtml + contentNoteHtml + communityNoteHtml +
    '</div>' +
    collageHtml +
    '<div style="display:flex;flex-direction:column;gap:8px;margin-top:4px;">' +
      (isPosterWork ? '' : trailerBtnHtml) +
      summaryBtnHtml +
      posterHtml +
      universeLaunchHtml +
      timelineBtnHtml +
      spotifyBtnHtml +
    '</div>' +
    cultureCrossLinkHtml(work);
  // '장소' 탭 — 지도 핀을 하나씩 눌러야만 접근 가능했던 장소들을, order(이야기 순서) 기준으로
  // 정렬한 목록으로도 바로 탐색할 수 있게 한다. jumpToTimelineLoc()이 이미 showLocation() 호출 +
  // 모바일 뷰 전환까지 해주는 함수라 그대로 재사용.
  const allLocsSorted = (data.locations || []).slice().sort(function(a, b){
    return (a.order != null ? a.order : 999) - (b.order != null ? b.order : 999);
  });
  const placesTabHtml = allLocsSorted.length ?
    ('<div class="tab-scenic-header">' +
      '<span class="icon">📍</span><span class="label">' + t('placesListLabel') + '</span>' +
      '<span id="placesListCount" class="count">' + allLocsSorted.length + '</span>' +
    '</div>' +
    '<input id="placesSearchInput" type="text" placeholder="' + t('placesSearchPlaceholder') + '" ' +
    'style="width:100%;box-sizing:border-box;background:var(--panel2);border:1px solid var(--border);color:var(--text);' +
    'border-radius:8px;padding:9px 11px;font-size:13.5px;margin-bottom:10px;" oninput="filterPlacesTab(\'' + work.id + '\', this.value)">' +
    '<div class="people-list" id="placesListInner" style="max-height:520px;overflow-y:auto;padding-right:2px;">' +
      allLocsSorted.map(function(l){ return placeChipHtml(work, l); }).join('') +
    '</div>')
    : '<div class="empty-state" style="padding:6px 2px;">' + t('noLocEmpty') + '</div>';
  // '여행' 탭 — 실제 동선을 짜주는 추천 코스 생성기 + 지금 위치 기준 근처 다른 작품 장소도
  // 찾아볼 수 있는 '내 주변 콘텐츠 투어' 진입점을 한데 모았다.
  // 2026-08 9라운드: 퀴즈는 QUIZ_DATA[work.id]가 있는 작품에서만, 그리고 지금은 ko 화면에서만
  // 노출한다 — 폭싹속았수다 하나로 먼저 검증해보자는 파일럿 범위 합의라 en/ja 번역은 아직
  // 안 했다(전체 작품으로 넓힐 때 함께 할 예정).
  const quizBtnHtml = (currentLang === 'ko' && window.QUIZ_DATA && window.QUIZ_DATA[work.id])
    ? '<button class="course-btn" style="margin-top:10px;border-style:solid;border-color:#e0a83a;color:#8a6a1f;background:#fff8ee;" onclick="openQuizModal(\'' + work.id + '\')">🍊 이 작품 퀴즈 풀어보기</button>'
    : '';
  const travelTabHtml =
    '<div class="tab-scenic-header"><span class="icon">🧭</span><span class="label">' + t('travelCourseLabel') + '</span></div>' +
    '<button class="course-btn" style="background:linear-gradient(135deg,var(--accent),#c24a28);border-color:var(--accent);color:#fff;font-size:15.5px;" onclick="generateCourse(\'' + work.id + '\')">🗺️ ' + t('courseBtn') + '</button>' +
    '<div id="courseOutput"></div>' +
    '<button class="course-btn" style="margin-top:10px;background:linear-gradient(135deg,#2a4a8f,var(--accent2));border-color:var(--accent2);color:#fff;font-size:15.5px;" onclick="openNearbyModal()">📍 ' + t('nearbyOpenBtn') + '</button>' +
    quizBtnHtml;
  // 2026-08 9라운드: 탭 순서를 장소｜작품｜인물｜여행 → 작품｜장소｜인물｜여행으로 바꿨다.
  // "작품소개로 돌아가기" 버튼이 항상 '작품' 탭으로 들어오는데, 그게 맨 왼쪽이 아니면(기존엔
  // 2번째) 처음 보는 사람 입장에서 "왜 두번째 탭이 켜져 있지?"처럼 어색하다는 지적 — 기본
  // 진입 탭과 탭 순서를 일치시켜 "왼쪽 탭 = 지금 보고 있는 화면"이 되도록 정리했다.
  const tabBarHtml =
    '<div class="work-tabbar">' +
      '<button id="workTabBtn_work" class="work-tab-btn" onclick="switchWorkTab(\'work\')">' + t('tabWorkLabel') + '</button>' +
      '<button id="workTabBtn_places" class="work-tab-btn" onclick="switchWorkTab(\'places\')">' + t('tabPlacesLabel') + '</button>' +
      (peopleHtml ? '<button id="workTabBtn_people" class="work-tab-btn" onclick="switchWorkTab(\'people\')">' + t('tabPeopleLabel') + '</button>' : '') +
      '<button id="workTabBtn_travel" class="work-tab-btn" onclick="switchWorkTab(\'travel\')">' + t('tabTravelLabel') + '</button>' +
    '</div>';
  // 2026-08 10라운드: 장소/인물/여행 탭이 "글자만 있고 사진이 하나도 없어 칙칙하다"는 피드백에
  // 따라, 이미 저작권 확인된 작품 히어로 이미지를 세 탭의 은은한 배경으로 재사용한다(신규 이미지를
  // 조달하지 않고도 "이 세계관 속을 여행 중"이라는 분위기를 줄 수 있음). 히어로가 없는 작품은
  // 배경 없이 순수 컬러 스타일만 적용되어 자동 폴백된다.
  const scenicBg = work.heroImage ?
    ' style="background-image:linear-gradient(180deg,rgba(15,17,21,.90) 0%,rgba(15,17,21,.95) 55%,rgba(15,17,21,.99) 100%),url(\'' + work.heroImage.url + '\');"' : '';
  document.getElementById('sidebarBody').innerHTML =
    tabBarHtml +
    '<div id="workTab_work" class="work-tab-panel">' + workTabHtml + '</div>' +
    '<div id="workTab_places" class="work-tab-panel tab-panel-scenic"' + scenicBg + '>' + placesTabHtml + '</div>' +
    (peopleHtml ? '<div id="workTab_people" class="work-tab-panel tab-panel-scenic"' + scenicBg + '>' + peopleHtml + '</div>' : '') +
    '<div id="workTab_travel" class="work-tab-panel tab-panel-scenic"' + scenicBg + '>' + travelTabHtml + '</div>';
  // 기본 진입 탭은 '작품' — 이제 탭 순서상으로도 맨 왼쪽이라 자연스럽다.
  switchWorkTab('work');
  if (data.people && data.people.length) renderPeopleList(work, data, '');
}
window.renderPeopleList = renderPeopleList;

// '장소' 탭에 쓰이는 장소 칩 — person-chip과 동일한 시각 언어를 재사용해 인물 목록과 통일감을 준다.
// 2026-08 10라운드: 인물 칩에는 컬러 아바타가 있는데 장소 칩엔 아무 그림도 없어 밋밋하다는
// 지적 반영 — 3-tier 분류(실제 촬영지/서사적 배경/체험)를 이모지 배지로 시각화했다. 텍스트로
// 이미 있던 정보(태그)를 새 사실로 지어내지 않고 그대로 아이콘화한 것뿐이라 정확성 원칙에 안 어긋남.
function placeTierIcon(rawTag){
  const t2 = rawTag || '';
  if (t2.indexOf('FILMED') === 0 || t2.indexOf('실제 촬영지') === 0) return { icon:'🎬', color:'#e0603a' };
  if (t2.indexOf('EXPERIENCE') === 0 || t2.indexOf('체험') === 0) return { icon:'🎡', color:'#3aa86a' };
  if (t2.indexOf('STORY SETTING') === 0) return { icon:'📖', color:'#3a7ce0' };
  return { icon:'📍', color:'#8a93a3' };
}
function placeChipHtml(work, l){
  const rawTag = tField(l, 'tag') || '';
  const dashMatch = rawTag.match(/^(.+?)\s+[—–]\s+(.+)$/);
  const tierLabel = dashMatch ? dashMatch[1] : rawTag;
  const tierIcon = placeTierIcon(rawTag);
  return '<button class="person-chip" style="border-left:4px solid ' + work.pinColor + ';" onclick="jumpToTimelineLoc(\'' + work.id + '\',\'' + l.id + '\',\'tab:places\')">' +
    '<div class="person-avatar" style="background:' + tierIcon.color + ';font-size:19px;">' + tierIcon.icon + '</div>' +
    '<div class="person-chip-text">' +
      '<div class="pname">' + (l.nameInWork || tField(l, 'modernName')) + '</div>' +
      '<div class="pyears">' + tField(l, 'modernName') + (tierLabel ? ' · ' + tierLabel : '') + '</div>' +
    '</div>' +
  '</button>';
}

// '장소' 탭 검색창 — 인물 검색(renderPeopleList)과 동일한 패턴으로, 이름/작중 지명/현재 지명/태그를
// 대상으로 필터링한다. workId 기준으로 DATA를 다시 조회해 어떤 작품에서도 재사용 가능하게 함.
function filterPlacesTab(workId, query){
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];
  if (!work || !data) return;
  const q = (query || '').trim().toLowerCase();
  const all = (data.locations || []).slice().sort(function(a, b){
    return (a.order != null ? a.order : 999) - (b.order != null ? b.order : 999);
  });
  const list = !q ? all : all.filter(function(l){
    const hay = [l.nameInWork, l.modernName, l.modernName_ja, tField(l, 'tag')].filter(Boolean).join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  });
  const listEl = document.getElementById('placesListInner');
  if (listEl){
    listEl.innerHTML = list.length ? list.map(function(l){ return placeChipHtml(work, l); }).join('') :
      '<div class="empty-state" style="padding:6px 2px;">' + t('noLocEmpty') + '</div>';
  }
  const countEl = document.getElementById('placesListCount');
  if (countEl) countEl.textContent = list.length + ' / ' + all.length;
}
window.filterPlacesTab = filterPlacesTab;

// '장소｜작품｜인물｜여행' 탭 전환 — 4개 패널을 전부 미리 렌더링해두고 display만 토글하는 방식이라
// (재렌더 없음) 코스 생성 결과·인물 검색어·예고편 재생 상태 같은 각 탭의 입력 상태가 탭을 오가도 안 날아간다.
function switchWorkTab(tab){
  ['places', 'work', 'people', 'travel'].forEach(function(name){
    const panel = document.getElementById('workTab_' + name);
    if (panel) panel.style.display = (name === tab) ? '' : 'none';
    const btn = document.getElementById('workTabBtn_' + name);
    if (btn) btn.classList.toggle('active', name === tab);
  });
}
window.switchWorkTab = switchWorkTab;

function toggleWorkIntro(){
  const el = document.getElementById('workIntroLong');
  const btn = document.getElementById('workIntroBtn');
  if (!el || !btn) return;
  const show = el.style.display === 'none';
  el.style.display = show ? 'block' : 'none';
  btn.textContent = show ? t('readMoreCollapse') : t('readMore');
}
window.toggleWorkIntro = toggleWorkIntro;

/* ---------- 작품별 타임라인/장면 데이터 조회 (신규 작품 추가 시 이 목록에만 추가하면 됨) ---------- */
function getTimelineData(workId){
  if (workId === 'santi') return (typeof SANTI_SCENES !== 'undefined') ? SANTI_SCENES : null;
  if (workId === 'breakingbad') return (typeof BREAKINGBAD_TIMELINE !== 'undefined') ? BREAKINGBAD_TIMELINE : null;
  if (workId === 'daemang') return (typeof DAEMANG_TIMELINE !== 'undefined') ? DAEMANG_TIMELINE : null;
  if (workId === 'kiminonawa') return (typeof KIMINONAWA_TIMELINE !== 'undefined') ? KIMINONAWA_TIMELINE : null;
  if (workId === 'suzume') return (typeof SUZUME_TIMELINE !== 'undefined') ? SUZUME_TIMELINE : null;
  if (workId === 'poksshak') return (typeof POKSSAK_TIMELINE !== 'undefined') ? POKSSAK_TIMELINE : null;
  if (workId === 'harrypotter') return (typeof HARRYPOTTER_TIMELINE !== 'undefined') ? HARRYPOTTER_TIMELINE : null;
  if (workId === 'kdemonhunters') return (typeof KDEMONHUNTERS_TIMELINE !== 'undefined') ? KDEMONHUNTERS_TIMELINE : null;
  if (workId === 'gameofthrones') return (typeof GOT_TIMELINE !== 'undefined') ? GOT_TIMELINE : null;
  if (workId === 'wednesday') return (typeof WEDNESDAY_TIMELINE !== 'undefined') ? WEDNESDAY_TIMELINE : null;
  if (workId === 'strangerthings') return (typeof STRANGERTHINGS_TIMELINE !== 'undefined') ? STRANGERTHINGS_TIMELINE : null;
  if (workId === 'squidgame') return (typeof SQUIDGAME_TIMELINE !== 'undefined') ? SQUIDGAME_TIMELINE : null;
  if (workId === 'emilyinparis') return (typeof EMILYINPARIS_TIMELINE !== 'undefined') ? EMILYINPARIS_TIMELINE : null;
  if (workId === 'bridgerton') return (typeof BRIDGERTON_TIMELINE !== 'undefined') ? BRIDGERTON_TIMELINE : null;
  if (workId === 'lotr') return (typeof LOTR_TIMELINE !== 'undefined') ? LOTR_TIMELINE : null;
  if (workId === 'moneyheist') return (typeof MONEYHEIST_TIMELINE !== 'undefined') ? MONEYHEIST_TIMELINE : null;
  if (workId === 'onepiece') return (typeof ONEPIECE_TIMELINE !== 'undefined') ? ONEPIECE_TIMELINE : null;
  if (workId === 'jikji') return (typeof JIKJI_TIMELINE !== 'undefined') ? JIKJI_TIMELINE : null;
  if (workId === 'glory') return (typeof GLORY_TIMELINE !== 'undefined') ? GLORY_TIMELINE : null;
  if (workId === 'woo') return (typeof WOO_TIMELINE !== 'undefined') ? WOO_TIMELINE : null;
  if (workId === 'taebaek') return (typeof TAEBAEK_TIMELINE !== 'undefined') ? TAEBAEK_TIMELINE : null;
  if (workId === 'sunshine') return (typeof SUNSHINE_TIMELINE !== 'undefined') ? SUNSHINE_TIMELINE : null;
  if (workId === 'pachinko') return (typeof PACHINKO_TIMELINE !== 'undefined') ? PACHINKO_TIMELINE : null;
  if (workId === 'namiya') return (typeof NAMIYA_TIMELINE !== 'undefined') ? NAMIYA_TIMELINE : null;
  if (workId === 'suspectx') return (typeof SUSPECTX_TIMELINE !== 'undefined') ? SUSPECTX_TIMELINE : null;
  if (workId === 'byakuya') return (typeof BYAKUYA_TIMELINE !== 'undefined') ? BYAKUYA_TIMELINE : null;
  if (workId === 'kimetsu') return (typeof KIMETSU_TIMELINE !== 'undefined') ? KIMETSU_TIMELINE : null;
  if (workId === 'hope') return (typeof HOPE_TIMELINE !== 'undefined') ? HOPE_TIMELINE : null;
  if (workId === 'odyssey') return (typeof ODYSSEY_TIMELINE !== 'undefined') ? ODYSSEY_TIMELINE : null;
  if (workId === 'dokkaebi') return (typeof DOKKAEBI_TIMELINE !== 'undefined') ? DOKKAEBI_TIMELINE : null;
  if (workId === 'gwandong') return (typeof GWANDONG_TIMELINE !== 'undefined') ? GWANDONG_TIMELINE : null;
  if (workId === 'wangsanam') return (typeof WANGSANAM_TIMELINE !== 'undefined') ? WANGSANAM_TIMELINE : null;
  if (workId === 'spiderman') return (typeof SPIDERMAN_TIMELINE !== 'undefined') ? SPIDERMAN_TIMELINE : null;
  if (workId === 'sonyeon') return (typeof SONYEON_TIMELINE !== 'undefined') ? SONYEON_TIMELINE : null;
  if (workId === 'priests') return (typeof PRIESTS_TIMELINE !== 'undefined') ? PRIESTS_TIMELINE : null;
  if (workId === 'littleforest') return (typeof LITTLEFOREST_TIMELINE !== 'undefined') ? LITTLEFOREST_TIMELINE : null;
  if (workId === 'isatong') return (typeof ISATONG_TIMELINE !== 'undefined') ? ISATONG_TIMELINE : null;
  if (workId === 'conanhighway') return (typeof CONANHIGHWAY_TIMELINE !== 'undefined') ? CONANHIGHWAY_TIMELINE : null;
  if (workId === 'prada2') return (typeof PRADA2_TIMELINE !== 'undefined') ? PRADA2_TIMELINE : null;
  return null;
}
window.getTimelineData = getTimelineData;

/* ---------- 스포티파이 공식 임베드 토글 (WORK_SPOTIFY, data.js) ---------- */
function toggleSpotify(workId){
  const out = document.getElementById('spotifyOutput');
  if (!out) return;
  if (out.dataset.open === '1'){ out.innerHTML = ''; out.dataset.open = ''; return; }
  out.dataset.open = '1';
  const sp = (typeof WORK_SPOTIFY !== 'undefined') ? WORK_SPOTIFY[workId] : null;
  if (!sp) return;
  out.innerHTML =
    '<iframe style="border-radius:12px;margin-top:6px;" src="https://open.spotify.com/embed/' + sp.type + '/' + sp.id + '?utm_source=generator&theme=0" ' +
    'width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>' +
    '<div style="font-size:11px;color:var(--sub);margin-top:4px;">' + sp.label + '</div>';
}
window.toggleSpotify = toggleSpotify;

/* ---------- 공식 예고편 유튜브 임베드 토글 (WORK_TRAILERS, data.js) ----------
   2026-08 기획안 4-2절 — WORK_TRAILERS에 등록된 작품만 임베드가 뜨고, 없는 작품은
   기존처럼 resetSidebar()에서 유튜브 검색 링크로 폴백한다(toggleSpotify와 동일한 패턴). */
function toggleTrailer(workId){
  const out = document.getElementById('trailerOutput');
  if (!out) return;
  if (out.dataset.open === '1'){ out.innerHTML = ''; out.dataset.open = ''; return; }
  out.dataset.open = '1';
  const tr = (typeof WORK_TRAILERS !== 'undefined') ? WORK_TRAILERS[workId] : null;
  if (!tr) return;
  out.innerHTML =
    '<div class="trailer-embed-wrap"><iframe src="https://www.youtube-nocookie.com/embed/' + tr.videoId + '" ' +
    'title="' + t('trailerBtn') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
    'allowfullscreen loading="lazy"></iframe></div>' +
    (tr.channel ? '<div class="trailer-embed-credit">' + (currentLang === 'ja' ? '出典: ' : (currentLang !== 'ko' ? 'Source: ' : '출처: ')) + tr.channel + '</div>' : '');
}
window.toggleTrailer = toggleTrailer;

/* ---------- 작품 연대기/주요 장면 (사건 목록 + 지도 연동) ---------- */
function renderTimeline(workId){
  const out = document.getElementById('timelineOutput');
  if (!out) return;
  if (out.dataset.open === '1'){ out.innerHTML = ''; out.dataset.open = ''; return; }
  out.dataset.open = '1';
  const timelineData = getTimelineData(workId) || DAEMANG_TIMELINE;
  const rows = timelineData.map(function(ev){
    const importantHtml = ev.important ? '<span style="background:#4a3a1f;color:#f0c674;font-size:10px;font-weight:700;padding:1px 6px;border-radius:999px;margin-left:6px;">⭐ ' + t('timelineImportant') + '</span>' : '';
    const locBtnHtml = ev.locId ?
      '<button style="background:none;border:0;color:var(--accent2);font-size:11px;font-weight:700;cursor:pointer;padding:2px 0;" onclick="jumpToTimelineLoc(\'' + workId + '\',\'' + ev.locId + '\',\'tab:work\')">' + t('timelineGoLoc') + '</button>' :
      '<span style="font-size:11px;color:var(--sub);">' + t('timelineNoLoc') + '</span>';
    return '<div style="border-left:2px solid ' + (ev.important ? '#c9a8ff' : 'var(--border)') + ';padding:4px 0 10px 10px;margin-bottom:2px;">' +
      '<div style="font-size:11.5px;color:var(--accent2);font-weight:800;">' + ev.year + importantHtml + '</div>' +
      '<div style="font-size:13px;font-weight:700;margin:2px 0;">' + ev.title + '</div>' +
      '<div style="font-size:12px;color:var(--sub);line-height:1.5;margin-bottom:4px;">' + ev.note + '</div>' +
      locBtnHtml +
    '</div>';
  }).join('');
  out.innerHTML = '<div style="margin-top:8px;max-height:420px;overflow-y:auto;padding-right:4px;">' + rows + '</div>';
}
window.renderTimeline = renderTimeline;

function jumpToTimelineLoc(workId, locId, from){
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];
  if (!work || !data) return;
  const loc = data.locations.find(function(l){ return l.id === locId; });
  if (!loc) return;
  showLocation(work, data, locId, false, from);
  if (isMobileLayout()) setMobileView('info');
}
window.jumpToTimelineLoc = jumpToTimelineLoc;

function generateCourse(workId){
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];
  // 우주(space realm) 장소는 위경도가 없어 거리 계산이 불가능하므로, 실제 지구 동선 코스에서는 제외
  const locs = data.locations.filter(function(l){ return l.lat != null && l.lng != null; }).slice().sort(function(a,b){ return a.order - b.order; });
  if (locs.length < 2){
    document.getElementById('courseOutput').innerHTML = '';
    return;
  }
  // 첫 지점에서 가장 가까운 곳을 순서대로 이어붙이는 단순 최근접 이웃 경로 (동선 최적화)
  const remaining = locs.slice();
  const route = [remaining.shift()];
  while (remaining.length){
    const last = route[route.length - 1];
    let bi = 0, bd = Infinity;
    remaining.forEach(function(l, i){ const d = haversineKm(last, l); if (d < bd){ bd = d; bi = i; } });
    route.push(remaining.splice(bi, 1)[0]);
  }
  // 하루 이동거리가 너무 길어지지 않도록, 누적 거리 기준으로 날짜를 나눔 (2일 분할)
  let legs = [0];
  for (let i = 1; i < route.length; i++) legs.push(haversineKm(route[i-1], route[i]));
  const totalKm = legs.reduce(function(a,b){ return a+b; }, 0);
  let acc = 0, splitAt = route.length - 1;
  for (let i = 1; i < route.length; i++){
    acc += legs[i];
    if (acc >= totalKm / 2){ splitAt = i; break; }
  }
  const day1 = route.slice(0, splitAt), day2 = route.slice(splitAt);
  function dayKm(day, startIdx){
    let k = 0;
    for (let i = 1; i < day.length; i++) k += haversineKm(day[i-1], day[i]);
    return k;
  }
  const isEn = currentLang !== 'ko';
  function stopHtml(l, idx, day){
    const legKm = idx > 0 ? haversineKm(day[idx-1], l) : null;
    return '<div class="course-stop">' +
      (legKm !== null ? '<div class="leg">↳ ' + (isEn ? '~' + legKm.toFixed(1) + 'km from the previous stop' : '이전 지점에서 약 ' + legKm.toFixed(1) + 'km') + '</div>' : '') +
      '<button class="name" onclick="loadWork(\'' + work.id + '\',{skipAutoSelect:true});setTimeout(function(){showLocation(WORKS.find(function(w){return w.id===\'' + work.id + '\';}), DATA[\'' + work.id + '\'], \'' + l.id + '\');},50);">' +
        (l.nameInWork || tField(l, 'modernName')) + '</button>' +
      '</div>';
  }
  function dayBlock(label, day){
    const placesLabel = isEn ? day.length + ' stops' : day.length + '곳';
    const kmLabel = isEn ? '~' + dayKm(day).toFixed(1) + 'km total' : '총 약 ' + dayKm(day).toFixed(1) + 'km 이동';
    return '<div class="course-day"><div class="d"><span>' + label + ' (' + placesLabel + ')</span><span class="km">' + kmLabel + '</span></div>' +
      '<div class="course-timeline">' + day.map(function(l,i){ return stopHtml(l, i, day); }).join('') + '</div></div>';
  }
  document.getElementById('courseOutput').innerHTML =
    '<div class="course-box">' +
      '<h4>' + (isEn ? 'Suggested 2-day trip · Optimized by travel distance' : '추천 1박 2일 코스 · 이동거리 기준 동선 최적화') + '</h4>' +
      dayBlock(isEn ? 'Day 1' : '1일차', day1) +
      dayBlock(isEn ? 'Day 2' : '2일차', day2) +
    '</div>';
}
window.generateCourse = generateCourse;

/* ---------- 실제 사진 한 장 크게 보여주기 (위키백과 REST API, 저작권 안전한 대표 사진) ---------- */
// 해시태그 링크 모음만으로는 화면이 밋밋해서, 그 장소의 실제 사진을 위키백과에서 찾아
// 상세 패널 맨 위에 크게 띄운다. 위키백과 REST API는 CORS를 허용해 브라우저에서 바로 호출 가능.
// 사진을 못 찾으면 조용히 숨긴다(억지로 아무 이미지나 보여주지 않음).
function fetchWikiThumb(lang, title){
  const url = 'https://' + lang + '.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
  return fetch(url).then(function(r){
    if (!r.ok) throw new Error('not found');
    return r.json();
  }).then(function(j){
    if (!j.thumbnail || !j.thumbnail.source) throw new Error('no image');
    const pageUrl = (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) ||
      ('https://' + lang + '.wikipedia.org/wiki/' + encodeURIComponent(title));
    // 썸네일은 작으니 원본에 가깝게 폭을 키워서 요청 (위키미디어 썸네일 URL은 /###px-로 크기 지정 가능)
    const bigImg = j.thumbnail.source.replace(/\/\d+px-/, '/640px-');
    return { img: bigImg, title: j.title, pageUrl: pageUrl, lang: lang };
  });
}
// 이야기 진행 막대(슬라이더)에 붙는 안내 문구 — 위치(M/N번째)와 함께 "드래그해서 이동 가능"이라는
// 조작법 힌트를 문구 자체에 포함시킨다. 2026-08 3라운드: 이 막대가 그냥 점 하나로만 보여서
// 드래그할 수 있다는 걸 아무도 몰랐다는 지적 반영 — 라벨과 시각적 트랙(CSS) 둘 다 손봤다.
// showLocation() 최초 렌더와 scrubStoryProgress() 드래그 중 갱신이 항상 같은 문구를 쓰도록 공유.
function storyProgressText(pos, total){
  if (currentLang === 'ja') return '全' + total + 'か所中' + pos + '番目の場所 — ドラッグして他の場所へ';
  if (currentLang !== 'ko') return 'Stop ' + pos + ' of ' + total + ' in the story — drag to jump to another place';
  return '전체 ' + total + '곳 중 ' + pos + '번째 장소 — 밀어서 다른 장소로 이동';
}
// '이야기 속 이 장소' 진행 막대 드래그 핸들러 — 모든 작품이 이 코드를 공유한다.
// oninput(드래그하는 동안)에는 숫자 라벨과 막대 채움만 가볍게 갱신하고, onchange(손을 뗀 순간)에만
// 실제 장소 이동(showLocation)을 수행한다. 매 프레임 지도를 다시 날리면 버벅이고, 상세 패널 전체가
// 그때마다 다시 그려지면 드래그 중인 슬라이더 DOM 자체가 사라져 드래그가 끊기기 때문이다.
function scrubStoryProgress(inputEl){
  const ids = (inputEl.getAttribute('data-ids') || '').split(',').filter(Boolean);
  const total = ids.length;
  const pos = parseInt(inputEl.value, 10);
  if (!total || !pos) return;
  const pct = total > 1 ? Math.round((pos - 1) / (total - 1) * 100) : 100;
  inputEl.style.setProperty('--pct', pct + '%');
  const label = document.getElementById('storyProgressLabel');
  if (label) label.textContent = storyProgressText(pos, total);
}
function commitStoryProgress(inputEl){
  const workId = inputEl.getAttribute('data-work');
  const ids = (inputEl.getAttribute('data-ids') || '').split(',').filter(Boolean);
  const pos = parseInt(inputEl.value, 10);
  const targetId = ids[pos - 1];
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];
  if (!work || !data || !targetId) return;
  showLocation(work, data, targetId);
}
window.scrubStoryProgress = scrubStoryProgress;
window.commitStoryProgress = commitStoryProgress;

function showLocation(work, data, locId, isRefresh, from){
  const loc = data.locations.find(function(l){ return l.id === locId; });
  if (!loc) return;
  currentView = { type:'location', workId:work.id, locId:locId };
  // '뒤로' 버튼의 목적지 — 어느 탭/상세에서 왔는지가 있으면 그걸로 갱신하고, 없으면(언어 전환
  // 재렌더 등) 기존 목적지를 유지, 그것도 없으면 '장소' 탭으로 기본 설정.
  if (!isRefresh) returnTarget = resolveReturnTarget(from, work.id) || returnTarget || { type:'tab', workId:work.id, tab:'places' };
  const hasCoords = loc.lat != null && loc.lng != null;
  if (!isRefresh){
    if (hasCoords) map.flyTo({ center:[loc.lng, loc.lat], zoom:12, duration:700 });
    document.getElementById('sidebar').classList.add('sidebar-detail');
    markVisited(work.id, locId);
    renderProgressBadge(work, data);
    if (hasCoords) refreshLocationLayer(work, data.locations.filter(function(l){ return l.lat != null && l.lng != null; }));
    checkCompletion(work, data);
    if (isMobileLayout()) setMobileView('info');
  }

  const isHistorical = work.type === 'historical';
  const relatedPeople = (data.people || []).filter(function(p){ return p.relatedLocationIds.includes(locId); });
  const eraToggleHtml = isHistorical ?
      '<div class="era-toggle"><button id="btnOld" onclick="setEra(\'old\')">' + t('eraOld') + '</button>' +
      '<button id="btnModern" onclick="setEra(\'modern\')">' + t('eraModern') + '</button></div>' : '';

  // 2026-08 3라운드: 장소 태그("실제 촬영지 — 은탁·김신 최초 소환 장면" 같은 "티어라벨 — 구체설명" 형식)가
  // 파란 제목 배너의 부제(sub) 줄에 이미 그대로 나오는데, 바로 아래 회색 태그필(tag-pill)에도 똑같은
  // 문자열이 중복 노출된다는 지적 반영. "티어라벨 — " 접두어는 배너에서 이미 봤으니 pill에서는 떼어내고
  // 뒤쪽 구체 설명만 남긴다. 접두어만 있고 뒤에 붙는 설명이 없는 태그(예: 그냥 "실제 촬영지")는 pill에
  // 남길 내용이 없어지므로 pill 자체를 렌더링하지 않는다(빈 뱃지가 떠 있는 것도 잡음이라 판단).
  const rawTagText = tField(loc, 'tag') || '';
  const tagPillDashMatch = rawTagText.match(/^.+?\s+[—–]\s+(.+)$/);
  const tagPillText = tagPillDashMatch ? tagPillDashMatch[1] : '';

  // 2026-08 3라운드: 초보자용 요약/자세히 보기 토글과 설명 문단을 지도 패널에서 통째로 뺐으므로
  // (화면만 복잡하게 만든다는 지적 반영) LOCATION_DETAILS/description 조회도 더 이상 필요 없다.
  const mapsUrl = hasCoords ? ('https://www.google.com/maps/search/?api=1&query=' + loc.lat + ',' + loc.lng) : null;
  // realm==='space'인 장소(삼체의 행성·항성·함선 등)는 구글맵 대신 별도 '우주 지도' 페이지로 연결한다.
  const universeMapUrl = (loc.realm === 'space') ? ('contentmap_universe.html?loc=' + encodeURIComponent(loc.id)) : null;
  const wikiQuery = encodeURIComponent(loc.modernName.split(/[·,(（]/)[0].trim());
  // 영어권 작품(workLang==='en')은 한국어 위키백과 대신 영어 위키백과에서 검색되도록 분기한다.
  const wikiUrl = (work && work.lang === 'en')
    ? 'https://en.wikipedia.org/w/index.php?search=' + wikiQuery
    : 'https://ko.wikipedia.org/w/index.php?search=' + wikiQuery;
  const specialty = (typeof SPECIALTIES !== 'undefined') ? SPECIALTIES[loc.id] : null;
  const scienceNote = (loc.scienceNoteId && typeof SCIENCE_NOTES !== 'undefined') ? SCIENCE_NOTES[loc.scienceNoteId] : null;

  // 실제 방문자들이 올린 사진을 찾아볼 수 있는 외부 검색 링크 모음
  // (인스타그램은 '인기순 API'를 외부에 공개하지 않아 직접 가져올 수 없어서, 대신 정확한 해시태그/검색 페이지로 바로 연결)
  // 한국어 지명 하나만 태그로 쓰면 게시물이 거의 없는 경우가 많아서(실제로 그 태그를 쓰는 사람이 적음),
  // 실제 방문자들이 쓰는 일본어 한자 태그를 같이 찾아 함께 제공한다 — 사진이 훨씬 많이 나옴.
  // (지도 클릭 퀵팝업과 동일한 로직을 쓰도록 computeLocationTags()로 공통화함)
  const locTags = computeLocationTags(loc, work);
  const placeName = locTags.placeName, korTag = locTags.korTag, cjkTag = locTags.cjkTag, cjkLang = locTags.cjkLang, workLang = locTags.workLang, workTag = locTags.workTag;
  const sceneMoment = (typeof SCENE_MOMENTS !== 'undefined') ? SCENE_MOMENTS[loc.id] : null;

  // 상세 패널을 열자마자 실제 사진 한 장이 크게 보이도록, 위키백과에서 사진을 비동기로 찾아온다.
  // (링크 모음만으로는 화면이 밋밋해서, 찾아지면 render()를 다시 호출해 사진을 채워넣는 방식)
  let photoInnerHtml = null;
  let photoFetchStarted = false;
  function ensurePhoto(){
    if (photoFetchStarted) return;
    photoFetchStarted = true;
    // 우주(space realm) 장소는 소설 속 가상의 공간이라 실제 사진이 존재하지 않음 — 무의미한 위키백과
    // 검색을 시도하지 않고 조용히 건너뛴다.
    if (!hasCoords){ photoInnerHtml = ''; return; }
    const attempts = [];
    if (cjkTag) attempts.push(function(){ return fetchWikiThumb(cjkLang, cjkTag); });
    // 영어권 작품(workLang==='en')은 placeName이 해시태그용 영문 코드(예: WalterWhiteHouse)라
    // 위키백과 검색에 부적합하므로, 주소를 뺀 실제 지명(modernName)으로 영어 위키백과를 먼저 시도한다.
    if (workLang === 'en'){
      const enSearchName = (loc.modernName || '').replace(/[(（][^)）]*[)）]/g, '').trim();
      if (enSearchName) attempts.push(function(){ return fetchWikiThumb('en', enSearchName); });
    }
    attempts.push(function(){ return fetchWikiThumb('ko', placeName); });
    (function run(i){
      if (i >= attempts.length){ photoInnerHtml = ''; render(); return; }
      attempts[i]().then(function(res){
        const langBadge = res.lang === 'ja' ? '(日) ' : (res.lang === 'zh' ? '(中) ' : ' ');
        const langBadgeEn = res.lang === 'ja' ? ' (JA)' : (res.lang === 'zh' ? ' (ZH)' : '');
        const creditSuffix = currentLang !== 'ko'
          ? ' · Wikipedia' + langBadgeEn + ' ↗'
          : ' · 위키백과' + langBadge + '에서 보기 ↗';
        photoInnerHtml = '<img src="' + res.img + '" alt="' + placeName + '" loading="lazy" onerror="this.closest(\'.photo-hero\').remove()">' +
          '<a class="photo-hero-credit" href="' + res.pageUrl + '" target="_blank" rel="noopener">' + res.title + creditSuffix + '</a>';
        render();
      }).catch(function(){ run(i + 1); });
    })(0);
  }

  const igTags = cjkTag && cjkTag !== korTag ? [cjkTag, korTag] : [korTag];
  const igChipsHtml = igTags.map(function(tag){
    return '<a class="social-chip" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(tag) + '/" target="_blank" rel="noopener">📷 #' + tag + '</a>';
  }).join('');
  // 지명 자체 말고, 그 주변의 실제로 잘 알려진 명소·포토스팟도 함께 검색어로 제공
  // (지명 하나만으로는 다양한 사진이 안 나오는 경우가 많아서, 근처 유명 스팟 이름을 추가로 얹어줌)
  const photoSpotTag = (typeof PHOTO_SPOTS !== 'undefined') ? PHOTO_SPOTS[loc.id] : null;
  const photoSpotChipHtml = photoSpotTag ?
    '<a class="social-chip spot-chip" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(photoSpotTag) + '/" target="_blank" rel="noopener">✨ #' + photoSpotTag + '</a>' : '';
  // 작품 고유 해시태그 — 장소 태그에 게시물이 없어도 최소한 이건 실제 결과가 나오는 안전망
  const workTagChipHtml = workTag ?
    '<a class="social-chip spot-chip" href="https://www.instagram.com/explore/tags/' + encodeURIComponent(workTag) + '/" target="_blank" rel="noopener">🎬 #' + workTag + '</a>' : '';
  // 영어권 작품 전용 — 팬 커뮤니티 레딧 서브레딧 안전망 칩(브레이킹 배드부터 신규 추가)
  const workRedditName = (typeof WORK_REDDIT !== 'undefined' && work) ? WORK_REDDIT[work.id] : null;
  const workRedditChipHtml = workRedditName ?
    '<a class="social-chip spot-chip" href="https://www.reddit.com/r/' + workRedditName + '/" target="_blank" rel="noopener">👽 r/' + workRedditName + '</a>' : '';
  const searchTag = cjkTag || korTag;
  const ytUrl = 'https://www.youtube.com/hashtag/' + encodeURIComponent(searchTag);
  const xUrl = 'https://twitter.com/hashtag/' + encodeURIComponent(searchTag);
  const naverBlogUrl = 'https://search.naver.com/search.naver?where=blog&query=' + encodeURIComponent(placeName + ' 여행');
  const naverImgUrl = 'https://search.naver.com/search.naver?where=image&query=' + encodeURIComponent(placeName + ' 여행');
  const daumCafeUrl = 'https://search.daum.net/search?w=cafe&q=' + encodeURIComponent(placeName + ' 여행');
  const gimgUrl = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(cjkTag || placeName);
  const yahooUrl = 'https://search.yahoo.co.jp/image/search?p=' + encodeURIComponent(cjkTag || placeName);
  // 중국 SNS: 웨이보 화제 검색, 더우반(豆瓣) 검색, 바이두 이미지 검색
  const weiboUrl = 'https://s.weibo.com/weibo?q=' + encodeURIComponent(cjkTag || placeName);
  const doubanUrl = 'https://www.douban.com/search?q=' + encodeURIComponent(cjkTag || placeName);
  const baiduImgUrl = 'https://image.baidu.com/search/index?tn=baiduimage&word=' + encodeURIComponent(cjkTag || placeName);
  const pinUrl = 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(placeName);
  // 영어권 작품(브레이킹 배드 등): 레딧 서브레딧 + IMDb 포토 갤러리 + 구글 이미지를 우선 노출
  const redditName = (typeof WORK_REDDIT !== 'undefined' && work) ? WORK_REDDIT[work.id] : null;
  const redditUrl = redditName ? 'https://www.reddit.com/r/' + redditName + '/search/?q=' + encodeURIComponent(placeName) : null;
  const imdbUrl = 'https://www.imdb.com/find/?q=' + encodeURIComponent(placeName) + '&s=all';
  const enGimgUrl = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(placeName);
  // 한국 작품(workLang==='ko')은 한자/가나 태그가 아예 생성되지 않으므로(cjkTag=null) 이 팁은 자동으로 표시되지 않는다.
  // cjkLang==='local'은 loc.localTag(직지의 유럽 장소처럼, 한국 작품이지만 해외 실존 장소인 경우)로
  // 만들어진 현지어 태그 — 특정 언어를 단정하지 않고 "현지어 태그"라는 중립적 표현을 쓴다.
  const socialTipHtml = cjkTag
    ? '<div class="social-tip">💡 ' + (currentLang !== 'ko'
        ? (cjkLang === 'zh'
            ? 'Korean-only tags can be sparse — the Chinese tag (#' + cjkTag + ') usually has far more photos.'
            : cjkLang === 'local'
            ? 'Korean-only tags can be sparse for overseas places — the local-language tag (#' + cjkTag + ') usually has far more photos.'
            : 'Korean-only tags can be sparse — the Japanese tag (#' + cjkTag + ') usually has far more photos.')
        : (cjkLang === 'zh'
            ? '한국어 태그는 게시물이 적을 수 있어요 — 중국어 태그(#' + cjkTag + ')에 사진이 훨씬 많습니다.'
            : cjkLang === 'local'
            ? '해외 장소는 한국어 태그만으로는 게시물이 적을 수 있어요 — 현지어 태그(#' + cjkTag + ')에 사진이 훨씬 많습니다.'
            : '한국어 태그는 게시물이 적을 수 있어요 — 일본어 태그(#' + cjkTag + ')에 사진이 훨씬 많습니다.')) + '</div>'
    : '';
  // 우주(space realm) 장소는 소설 속에만 존재하는 가상의 공간이라, 지명으로 실제 SNS 검색을 시도해도
  // 무의미한 결과(0건 또는 전혀 관계없는 결과)만 나온다. 이런 경우엔 지명별 검색 링크 대신, 작품
  // 해시태그(workTag) 하나와 "가상의 장소" 설명만 가볍게 보여준다.
  // 2026-08 3라운드: SNS(해시태그 기반) 검색은 태그를 아무도 안 쓰면 결과가 0건이라 마치 에러처럼
  // 보이는 경우가 잦다는 지적 반영 — 어떤 경우든 결과가 나오는 이미지·블로그 검색(socialLabel2)을
  // 먼저 보여주고, 결과가 없을 수도 있는 SNS·영상 검색(socialLabel1)은 그 아래로 내렸다.
  const snsBoxHtml = !hasCoords ?
    '<div class="social-box">' +
      '<span class="label">' + t('socialLabel1') + '</span>' +
      '<div class="social-links">' +
        workTagChipHtml +
      '</div>' +
      '<div class="social-tip">' + t('fictionalLocationNote') + '</div>' +
    '</div>' :
    '<div class="social-box">' +
      '<span class="label">' + t('socialLabel1') + '</span>' +
      '<div class="social-links">' +
        igChipsHtml +
        photoSpotChipHtml +
        workTagChipHtml +
        workRedditChipHtml +
        '<a class="social-chip" href="' + ytUrl + '" target="_blank" rel="noopener">▶️ ' + (currentLang !== 'ko' ? 'YouTube' : '유튜브') + '</a>' +
        '<a class="social-chip" href="' + xUrl + '" target="_blank" rel="noopener">𝕏 ' + (currentLang !== 'ko' ? 'X' : '트위터') + '</a>' +
      '</div>' +
      socialTipHtml +
    '</div>';
  const imageBlogBoxHtml = !hasCoords ? '' :
    '<div class="social-box">' +
      '<span class="label">' + t('socialLabel2') + '</span>' +
      '<div class="social-links">' +
        (workLang === 'en'
          // 영어권 작품(브레이킹 배드): 레딧 검색·IMDb 포토 갤러리·구글 이미지를 우선 노출
          ? (redditUrl ? '<a class="social-chip" href="' + redditUrl + '" target="_blank" rel="noopener">👽 ' + (currentLang !== 'ko' ? 'Reddit' : '레딧') + '</a>' : '') +
            '<a class="social-chip" href="' + imdbUrl + '" target="_blank" rel="noopener">🎞️ IMDb</a>' +
            '<a class="social-chip" href="' + enGimgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Google Images' : '구글 이미지') + '</a>'
          : workLang === 'ko'
          // 한국 작품: 야후재팬 대신 네이버 블로그/이미지·다음 카페 등 한국 SNS를 우선 노출
          ? '<a class="social-chip" href="' + naverBlogUrl + '" target="_blank" rel="noopener">📝 ' + (currentLang !== 'ko' ? 'Naver Blog' : '네이버 블로그') + '</a>' +
            '<a class="social-chip" href="' + naverImgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Naver Images' : '네이버 이미지') + '</a>' +
            '<a class="social-chip" href="' + daumCafeUrl + '" target="_blank" rel="noopener">☕ ' + (currentLang !== 'ko' ? 'Daum Cafe' : '다음 카페') + '</a>' +
            '<a class="social-chip" href="' + gimgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Google Images' : '구글 이미지') + '</a>'
          : workLang === 'zh'
          // 중국 작품(삼체): 야후재팬 대신 웨이보·더우반·바이두 이미지 등 중국 SNS를 우선 노출
          ? '<a class="social-chip" href="' + weiboUrl + '" target="_blank" rel="noopener">🇨🇳 ' + (currentLang !== 'ko' ? 'Weibo' : '웨이보') + '</a>' +
            '<a class="social-chip" href="' + doubanUrl + '" target="_blank" rel="noopener">📖 ' + (currentLang !== 'ko' ? 'Douban' : '더우반') + '</a>' +
            '<a class="social-chip" href="' + baiduImgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Baidu Images' : '바이두 이미지') + '</a>' +
            '<a class="social-chip" href="' + gimgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Google Images' : '구글 이미지') + '</a>'
          // 기본값(일본 작품들): 기존 그대로
          : '<a class="social-chip" href="' + gimgUrl + '" target="_blank" rel="noopener">🔍 ' + (currentLang !== 'ko' ? 'Google Images' : '구글 이미지') + '</a>' +
            '<a class="social-chip" href="' + yahooUrl + '" target="_blank" rel="noopener">🇯🇵 ' + (currentLang !== 'ko' ? 'Yahoo! Japan' : '야후재팬 이미지') + '</a>' +
            '<a class="social-chip" href="' + naverBlogUrl + '" target="_blank" rel="noopener">📝 ' + (currentLang !== 'ko' ? 'Naver Blog' : '네이버 블로그') + '</a>'
        ) +
        '<a class="social-chip" href="' + pinUrl + '" target="_blank" rel="noopener">📌 Pinterest</a>' +
      '</div>' +
    '</div>';
  const socialHtml = imageBlogBoxHtml + snsBoxHtml;

  // 2026-08 지도 UX 3라운드 사용자 피드백 반영: "같은 지역, 다른 이야기"(crossHtml)는 의미가
  // 잘 전달되지 않아 화면만 복잡하게 만든다는 지적에 따라 통째로 제거. 이 계산에만 쓰이던
  // crossMatches/otherWorks 루프(다른 38개 작품 전체를 매번 순회)도 함께 제거해 렌더링 비용도 줄인다.

  // 지도 대신 '이야기 맥락'으로 장소를 설명하는 슬라이더 — 전체 여정 중 이 장소의 위치를 보여주고
  // 드래그하면 앞뒤 장소로 바로 이동할 수 있다.
  // 2026-08 3라운드: 사용자가 "점만 보이고 막대(bar)가 안 보인다"고 지적 — 원인은 안 채워진 구간
  // 색(#241d33)이 박스 배경(#1a1622)과 거의 같아 첫 장소(진행률 0%)에서는 사실상 안 보였기 때문.
  // 박스 자체를 없애고 파란 배너(제목 영역) 안으로 옮기면서, 안 채워진 구간을 반투명 흰색으로 바꿔
  // 진행률이 0%여도 막대 전체가 항상 보이도록 했다(.hero-story-progress CSS 참고). 동시에 "이야기
  // 속 이 장소"라는 별도 설명 라벨은 없애고, 라벨 문구 자체에 "전체 N곳 중 M번째 — 밀어서 이동"처럼
  // 드래그 가능하다는 안내를 포함시켜 라벨 하나로 위치와 조작법을 함께 전달한다.
  // 드래그하는 동안(oninput)은 숫자 라벨만 가볍게 갱신하고, 손을 뗀 순간(onchange)에만
  // showLocation()을 호출해 지도·사진·본문을 갱신한다 — 매 프레임마다 지도를 다시 날리거나
  // 위키 사진을 다시 불러오면 버벅이고, 상세 패널 전체가 매번 다시 그려지면서 드래그 중인
  // 슬라이더 DOM 자체가 사라져 드래그가 끊기기 때문(release() 시점에만 안전하게 다시 그림).
  const orderedLocs = data.locations.slice().sort(function(a, b){ return (a.order || 0) - (b.order || 0); });
  const curPos = (function(){ const i = orderedLocs.findIndex(function(l){ return l.id === loc.id; }); return i >= 0 ? i + 1 : 1; })();
  const totalLocs = orderedLocs.length;
  const scrubPct = totalLocs > 1 ? Math.round((curPos - 1) / (totalLocs - 1) * 100) : 100;
  const storyProgressLabel = storyProgressText(curPos, totalLocs);
  const storyOrderedIdsAttr = orderedLocs.map(function(l){ return l.id; }).join(',');
  const storySliderHtml = totalLocs > 1 ?
    '<div class="hero-story-progress">' +
      '<input type="range" class="story-progress-slider" min="1" max="' + totalLocs + '" step="1" value="' + curPos + '" ' +
        'style="--pct:' + scrubPct + '%" data-work="' + work.id + '" data-ids="' + storyOrderedIdsAttr + '" ' +
        'oninput="scrubStoryProgress(this)" onchange="commitStoryProgress(this)" ' +
        'aria-label="' + (currentLang === 'ja' ? '物語順の場所' : (currentLang !== 'ko' ? 'Location in story order' : '이야기 속 장소 순서')) + '">' +
      '<div class="story-progress-label" id="storyProgressLabel">' + storyProgressLabel + '</div>' +
    '</div>' : '';

  function render(){
    // 드래그 중 손을 뗀 시점(commitStoryProgress)에만 showLocation()이 다시 호출되는데,
    // 그 전에 이미 다른 위치로 옮겨간 뒤 뒤늦게 도착한 위키 사진 fetch 등이 이 render()를
    // 다시 부를 수 있다. currentView가 더 이상 이 장소를 가리키지 않으면 조용히 건너뛴다.
    if (currentView.type !== 'location' || currentView.workId !== work.id || currentView.locId !== loc.id) return;
    let titleHtml, subHtml;
    if (isHistorical && eraMode === 'old'){
      titleHtml = loc.nameInWork;
      subHtml = loc.oldProvince + (currentLang === 'ja' ? ' · 現在は ' : (currentLang !== 'ko' ? ' · now ' : ' · 지금은 ')) + tField(loc, 'modernName');
    } else {
      titleHtml = tField(loc, 'modernName');
      subHtml = isHistorical ? ((currentLang !== 'ko' ? 'Name in story: ' : '작중 지명: ') + loc.nameInWork) : (tField(loc, 'tag') || '');
    }

    let peopleBlock = '';
    if (relatedPeople.length){
      const peopleBlockLabel = (currentLang === 'ja' ? 'この場所に関連する人物 (' : (currentLang !== 'ko' ? 'Characters linked to this place (' : '이 장소와 관련된 인물 (')) + relatedPeople.length + ')';
      const hasCastHere = hasCastFeature(work);
      peopleBlock = '<div class="people-list"><div style="font-size:12.5px;color:#b7bfcb;font-weight:700;margin:14px 0 8px;text-transform:uppercase;letter-spacing:.05em;">' + peopleBlockLabel + '</div>' +
        relatedPeople.map(function(p){ return personChip(work.id, p, hasCastHere, 'location:' + loc.id); }).join('') + '</div>';
    }

    const photoHeroHtml = photoInnerHtml === null
      ? '<div class="photo-hero loading"><div class="photo-hero-skel">' + t('photoLoading') + '</div></div>'
      : (photoInnerHtml ? '<div class="photo-hero">' + photoInnerHtml + '</div>' : '');

    // 2026-08 전후 비교(작품 속/지금) UI — SCENE_MOMENTS에 장면 묘사가 있는 장소는 그 텍스트("그때")와
    // 위키 실사진("지금")을 나란히 붙인 compare-card로 보여준다. 저작권상 실제 스틸컷은 쓸 수 없으니
    // "그때"는 항상 텍스트, "지금"은 항상 실사진이라는 원칙은 유지한 채 배치만 비교형으로 바꾼 것.
    // 장면 묘사가 없는 장소는 기존처럼 사진만 상단에 단독으로 보여준다(중복 렌더 방지).
    const compareHtml = sceneMoment
      ? '<div class="compare-card">' +
          '<div class="compare-panel compare-then">' +
            '<div class="compare-panel-label">' + t('thenLabel') + '</div>' +
            '<div class="compare-then-text">' + sceneMoment + '</div>' +
          '</div>' +
          '<div class="compare-panel compare-now">' +
            '<div class="compare-panel-label">' + t('nowLabel') + '</div>' +
            photoHeroHtml +
          '</div>' +
        '</div>'
      : photoHeroHtml;

    // 2026-08 3라운드 사용자 피드백 반영 요약 (지도 상세 패널 전면 간소화):
    // - 사이드바 상단의 "장소 정보"라는 보일러플레이트 라벨은 CSS에서 감춤(#sidebar.sidebar-detail #sidebarTitle{display:none}).
    //   파란 배너(제목 카드)가 이미 제목을 보여주므로 중복.
    // - 태그필(tag-pill)은 파란 배너 부제와 중복되던 "실제 촬영지" 같은 티어 접두어를 떼고 뒤쪽 구체 설명만 표시(tagPillText, 없으면 숨김).
    // - "초보자용 요약/자세히 보기" 토글과 그 아래 설명 문단(desc), 번역 안내(contentNote)를 전부 제거 — "읽을 것도 없이 화면만 복잡하게 만든다"는 지적.
    // - "실제로 가보기" 라벨과 주소(travelTip) 문구를 제거하고 지도/위키 버튼만 남김.
    // - "이야기 속 이 장소" 진행 막대는 라벨을 없애고 파란 배너 안으로 옮겨 항상 눈에 띄게 했다(storySliderHtml, 위에서 구성).
    // - "연결된 인물/가까운 다른 작품 장소/장소 태그" 통계 카드와 "같은 지역, 다른 이야기"(crossHtml)는 통째로 제거.
    // - SNS·사진 검색은 이미지·블로그 검색(항상 결과가 있음)을 먼저, SNS·영상 검색(해시태그 없으면 0건일 수 있음)을 나중에, 인물 목록보다 위로 이동.
    // 2026-08 4라운드: "이 인물 링크"/"공유하기" 버튼 용도가 불분명하다는 피드백으로 장소·인물 상세 화면에서
    // share-btn 자체를 완전히 제거(shareCurrent 함수와 UI_STRINGS의 locShareBtn/personShareBtn 키는 다른 곳에서
    // 쓰일 수 있어 남겨두되, 두 렌더 함수의 호출부만 삭제). 동시에 어두운 배경 대비 버튼/메뉴 글자 크기를 키우고
    // 테두리·배경 대비를 높여 가독성을 개선(CSS 쪽 참고).
    document.getElementById('sidebarBody').innerHTML =
      '<div class="detail-card">' +
        '<div class="detail-hero" style="--hero-color:' + work.pinColor + '">' +
          '<div class="kicker">' + tField(work, 'title') + '</div>' +
          '<h3>' + titleHtml + '</h3>' +
          '<div class="sub">' + subHtml + '</div>' +
          storySliderHtml +
        '</div>' +
        compareHtml +
        '<div class="detail-body">' +
          '<button class="person-chip" style="text-align:center;margin-bottom:10px;" onclick="goBack()">' + backBtnLabel() + '</button>' +
          (tagPillText ? '<span class="tag-pill">' + tagPillText + '</span>' : '') +
          eraToggleHtml +
          (specialty ? '<div class="specialty-box"><span class="label">' + t('specialtyLabel') + '</span><span class="text">' + specialty + '</span></div>' : '') +
          (scienceNote ? '<div class="science-box"><span class="label">🔬 ' + (currentLang !== 'ko' ? scienceNote.title_en : scienceNote.title) + '</span><div class="text">' + (currentLang !== 'ko' ? scienceNote.body_en : scienceNote.body) + '</div></div>' : '') +
          '<div class="travel-box">' +
            (hasCoords
              ? '<a class="travel-btn" href="' + mapsUrl + '" target="_blank" rel="noopener">' + t('mapsBtn') + '</a><br>'
              : (universeMapUrl ? '<a class="travel-btn" style="background:#5b3ea6;" href="' + universeMapUrl + '" target="_blank" rel="noopener">' + t('universeMapBtn') + '</a><br>' : '')) +
            '<a class="travel-btn" style="background:#2b6cb0;" href="' + wikiUrl + '" target="_blank" rel="noopener">' + t('wikiBtn') + '</a>' +
          '</div>' +
          socialHtml +
          peopleBlock +
        '</div>' +
      '</div>';

    if (isHistorical){
      document.getElementById('btnOld').classList.toggle('active', eraMode === 'old');
      document.getElementById('btnModern').classList.toggle('active', eraMode === 'modern');
    }
    ensurePhoto();
  }
  window.setEra = function(mode){ eraMode = mode; render(); };
  render();
}

function showPerson(workId, personId, from){
  const work = WORKS.find(function(w){ return w.id === workId; });
  const data = DATA[workId];
  const person = data.people.find(function(p){ return p.id === personId; });
  if (!person) return;
  currentView = { type:'person', workId:workId, personId:personId };
  // '뒤로' 버튼의 목적지 — 인물 탭 목록에서 왔으면 그리로, 어느 장소의 관련 인물 목록에서
  // 왔으면 그 장소로 되돌아간다(없으면 기존 목적지 유지, 그마저 없으면 인물 탭이 기본값).
  returnTarget = resolveReturnTarget(from, workId) || returnTarget || { type:'tab', workId:workId, tab:'people' };

  document.getElementById('sidebar').classList.add('sidebar-detail');
  const relatedLocs = data.locations.filter(function(l){ return person.relatedLocationIds.includes(l.id); });
  if (relatedLocs.length) fitBoundsFor(relatedLocs);
  if (isMobileLayout()) setMobileView('info');

  const metaBits = [pField(person, 'faction'), pField(person, 'period'), pField(person, 'historicity')].filter(Boolean);
  const metaHtml = metaBits.length ? '<div style="margin-bottom:2px;">' +
    metaBits.map(function(m){ return '<span class="tag-pill" style="margin-right:6px;">' + m + '</span>'; }).join('') + '</div>' : '';
  // 2026-08 라운드: "상징 색상(팬 색채 분석 기반)" 캡션은 스와치가 무슨 근거로 나온 색인지
  // 설명하는 UI 메타문구라 사용자가 불필요하다고 지적 — 스와치 자체가 인물 아바타 색과 이미
  // 일치해 보여주는 정보라 캡션 없이도 기능하므로, 이 블록 전체를 뺐다.

  const locBlock = relatedLocs.length ?
    '<div class="people-list"><div style="font-size:12.5px;color:#b7bfcb;font-weight:700;margin:6px 0 8px;text-transform:uppercase;letter-spacing:.05em;">' + t('locBlockLabel') + '</div>' +
      relatedLocs.map(function(l){
        return '<button class="person-chip" onclick="showLocation(WORKS.find(function(w){return w.id===\'' + workId + '\';}), DATA[\'' + workId + '\'], \'' + l.id + '\', false, \'person:' + personId + '\')">' +
          '<div class="pname">' + (l.nameInWork || tField(l, 'modernName')) + '</div><div class="pyears">' + tField(l, 'modernName') + '</div></button>';
      }).join('') + '</div>' :
    '<div class="empty-state" style="padding:6px 2px;">' + t('noLocEmpty') + '</div>';

  const nameKo = person.name.split(/[（(]/)[0].trim();
  // 영어권 작품(work.lang==='en')은 한국어 위키백과 대신 영어 위키백과에서 검색되도록 분기한다.
  const wikiUrl = (work && work.lang === 'en')
    ? 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(nameKo)
    : 'https://ko.wikipedia.org/w/index.php?search=' + encodeURIComponent(nameKo);
  const contentNoteHtml = currentLang !== 'ko'
    ? '<div style="font-size:10.5px;color:var(--sub);margin-top:8px;">' + t('contentNote') + '</div>' : '';
  // 배우 위키백과 프로필 사진 링크(actorWikiUrl) — 극중 스틸 대신 "이 배우가 이 역할을 연기했다"를
  // 저작권 문제 없이 확인할 수 있는 안전한 대안(4-2절 기획안 참고).
  const actorBtnHtml = (hasCastFeature(work) && person.actorWikiUrl) ?
    '<a class="travel-btn" style="background:#6b4fa0;margin-top:4px;" href="' + person.actorWikiUrl + '" target="_blank" rel="noopener">' + t('actorPhotoBtn') + '</a>' : '';
  // 2026-08 라운드: 버튼 위에 붙어 있던 "더 알아보기" 캡션(moreLabel)은 버튼 자체가 이미
  // "위키백과에서 검색"처럼 뭘 하는지 말해주므로 중복 — 캡션 없이 버튼만 남긴다.
  const sourceHtml =
    '<div class="travel-box" style="margin-top:4px;">' +
      '<a class="travel-btn" style="background:#2b6cb0;" href="' + wikiUrl + '" target="_blank" rel="noopener">' + t('personWikiBtn') + '</a>' +
      actorBtnHtml +
      (person.sourceUrl ? '<br><a href="' + person.sourceUrl + '" target="_blank" rel="noopener" style="color:#bfe8cf;font-size:11.5px;">' + t('sourceLink') + '</a>' : '') +
    '</div>';

  const personAvatarColor = person.symbolColor || factionColor(person.faction);
  const personAvatarCls = 'detail-hero-avatar' + ((hasCastFeature(work) && person.actorWikiUrl) ? ' has-actor' : '');
  const dName = pField(person, 'name'), dYears = pField(person, 'years'), dRole = pField(person, 'role'), dDesc = pField(person, 'description');

  document.getElementById('sidebarTitle').textContent = t('personTitle');
  document.getElementById('sidebarBody').innerHTML =
    '<div class="detail-card">' +
      '<div class="detail-hero detail-hero-with-avatar" style="--hero-color:' + work.pinColor + '">' +
        '<div class="' + personAvatarCls + '" style="background:' + personAvatarColor + ';">' + personInitial(dName) + '</div>' +
        '<div class="detail-hero-text">' +
          '<div class="kicker">' + tField(work, 'title') + '</div>' +
          '<h3>' + dName + '</h3>' +
          '<div class="sub">' + dYears + ' · ' + dRole + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<button class="person-chip" style="text-align:center;margin-bottom:10px;" onclick="goBack()">' + backBtnLabel() + '</button>' +
        metaHtml +
        '<div class="desc">' + dDesc + '</div>' + contentNoteHtml +
        sourceHtml +
        locBlock +
      '</div>' +
    '</div>';
}
window.showPerson = showPerson;
window.showLocation = showLocation;
window.loadWork = loadWork;

// 헤더의 '작품 선택' 토글 버튼. 작품이 17개+로 늘어나면서 가로 탭 목록이 더는
// 감당이 안 돼, 필터+검색이 딸린 드롭다운 패널로 교체했다(패널 내용은 toggleWorkPicker에서 그림).
const pickerToggleBtn = document.getElementById('workPickerToggleBtn');
if (pickerToggleBtn) pickerToggleBtn.onclick = function(e){ e.stopPropagation(); toggleWorkPicker(); };

map.on('load', function(){
  localizeLabels();
  setupLocationLayer();
  const mapHomeBtnInit = document.getElementById('mapHomeBtn');
  if (mapHomeBtnInit) mapHomeBtnInit.title = t('mapHomeBtnTitle');
  const landingFilterWrap = document.getElementById('landingFilterWrap');
  if (landingFilterWrap){
    landingFilterWrap.innerHTML = buildFilterBarHtml('landing');
    wireFilterBar('landing', refreshAllFilterUIs);
  }
  renderLandingCards();
  if (typeof renderLandingCounterBanner === 'function') renderLandingCounterBanner();
  // 공유 링크(?work=daemang&loc=okazaki 또는 &person=p_c001)로 들어온 경우엔
  // 작품 선택 화면을 건너뛰고 바로 해당 장소/인물로 이동한다.
  const params = new URLSearchParams(location.search);
  const qWork = params.get('work');
  const qLoc = params.get('loc');
  const qPerson = params.get('person');
  if (qWork && WORKS.some(function(w){ return w.id === qWork; })){
    const appEl = document.getElementById('app');
    if (appEl) appEl.classList.remove('landing');
    // 부트 시점에 URL의 ?work=으로 바로 작품이 뜬 경우도 FOUC 방지용 부트 클래스를 여기서 지워야
    // 나중에 로고를 눌러 처음 화면으로 돌아갈 때 화면이 안 바뀌는 버그가 생기지 않는다.
    document.documentElement.classList.remove('gcjg-boot-work');
    // 2026-08 9라운드: 모바일에서 외부 링크(SEO 허브의 "장소 전체 보기" 등)로 바로 들어와도
    // enterWork()와 동일하게 '정보' 탭으로 고정 — 지도/정보가 뒤죽박죽 뜨던 문제를 진입 경로
    // 전체에서 일관되게 없앤다. loc/person이 있으면 아래에서 showLocation/showPerson이 다시
    // 한 번 'info'로 설정하므로 중복 호출이지만 무해하다.
    if (isMobileLayout()) setMobileView('info');
    // 4-6 지연 로딩 대응: 공유 링크(?work=)로 바로 들어온 경우도 enterWork()와 동일하게
    // ensureWorkData()로 해당 작품 데이터를 먼저 받아온 뒤에 그린다 (직접 loadWork()를 부르면
    // 아직 안 받아온 작품일 때 빈 화면이 뜬다).
    ensureWorkData(qWork, function(){
      // 2026-08 8라운드: "?work=X"만 있고 loc/person이 없는 경우(허브·SEO 페이지의
      // "장소 전체 보기" CTA가 여기로 옴)는 대표 장소로 바로 점프하지 않고 작품 소개
      // 탭 화면부터 보여준다. loc/person이 있으면 아래에서 곧바로 덮어써지므로 여기서
      // 자동 선택을 건너뛰어도(=skipAutoSelect) 손해가 없고, 대표 장소가 잠깐 떴다가
      // 바뀌는 깜빡임도 없앨 수 있다.
      loadWork(qWork, {skipAutoSelect:true});
      if (qLoc || qPerson){
        setTimeout(function(){
          const work = WORKS.find(function(w){ return w.id === qWork; });
          const data = DATA[qWork];
          if (qLoc && data.locations.some(function(l){ return l.id === qLoc; })) showLocation(work, data, qLoc);
          else if (qPerson && data.people.some(function(p){ return p.id === qPerson; })) showPerson(qWork, qPerson);
        }, 300);
      }
    });
    // 2026-08 개편: 자동 사용법 팝업 제거 (상단 '사용법' 버튼으로만 열림)
  }
  // 링크 없이 들어온 경우엔 #app에 이미 있는 'landing' 클래스(HTML 기본값)가 유지되어
  // 작품 선택 화면이 보이고, 사용자가 카드를 클릭하면 enterWork()가 처리한다.
});
