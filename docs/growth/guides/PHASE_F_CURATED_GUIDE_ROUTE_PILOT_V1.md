# Phase F — Curated Guide & Route Pilot v1

Date: 2026-09-01
Status: PLANNED / PLANNER PREP IN PROGRESS / DO NOT START UNTIL ISSUE #40 COMPLETE
Parent: Issue #31 Content Growth Engine v1

## 0. 목적
그곳지금을 `작품 → 장소` DB에서 `실제로 어떻게 돌아볼지`까지 답하는 여행 미디어로 확장한다.

Phase F의 검색 의도는 기존 Work 페이지와 다르다.
- Work: `브레이킹 배드 촬영지`, `폭싹 속았수다 촬영지`, `白夜行 ロケ地`
- Guide: `브레이킹 배드 앨버커키 하루 코스`, `제주 드라마 촬영지 하루 코스`, `白夜行 聖地巡礼 コース`

따라서 v1에서는 별도 Guide URL을 허용하되, 3개 파일럿만 수동 기획한다. 대량 자동생성은 하지 않는다.

## 1. 파일럿 3개

### F1. Breaking Bad — Albuquerque 1-day filming-location route
목표 검색의도:
- breaking bad filming locations albuquerque
- breaking bad self guided tour
- 브레이킹 배드 앨버커키 촬영지

초기 Stop 후보:
1. Los Pollos Hermanos / Twisters — 4257 Isleta Blvd SW
2. Tuco’s headquarters / Java Joe’s — 906 Park Ave SW
3. A1A Car Wash — 9516 Snow Heights Cir NE

확장 후보:
- Walter White house는 사유지·주민 민원 이력이 있으므로 v1 route stop으로 적극 방문 유도하지 않는다. 필요하면 `respect private residence / view only from public right-of-way` 경고가 있는 optional context로만 검토한다.

근거 우선순위:
- Visit Albuquerque local guide
- current business/site information
- IMDb/secondary filming-location database는 보조 검증

### F2. Poksshak — Jeju 1-day drama route
목표 검색의도:
- 폭싹 속았수다 제주 촬영지
- 폭싹 속았수다 촬영지 코스
- 제주 드라마 촬영지 하루 코스

초기 Stop 후보:
1. 김녕 어촌계/김녕 바다 — 1화·3화 촬영 축
2. 성산일출봉/성산권 — 제주관광공사가 촬영지로 소개
3. 제주목관아 — 제주관광공사 추천 코스에 포함된 촬영지 축

운영 원칙:
- 공식 제주관광공사 콘텐츠에서 실제 촬영지와 추천관광지를 구분한다.
- Visit Jeju의 사진/영상은 저작권자가 제주관광공사로 명시되어 있으므로 무단 복제하지 않는다. 정보 검증용으로만 사용하고, 사이트 asset은 별도 사용권 확보 또는 자체 제작을 원칙으로 한다.

### F3. Byakuyako — story setting + 2006 TBS adaptation pilgrimage
목표 검색의도:
- 白夜行 聖地巡礼
- 白夜行 ロケ地
- 白夜行 水海道駅

v1에서는 `원작/스토리 배경`과 `2006 TBS 영상판 촬영지`를 섞지 않는다.

초기 Stop 구조:
A. STORY SETTING layer
- Fuse Station
- Fuse Hondori shopping street

B. ADAPTATION FILMING layer
- Mitsukaido Station — Ibaraki Film Commission confirms TBS 2006 filming
- Kita-Mitsukaido Station — Ibaraki Film Commission confirms TBS 2006 filming

Guide 페이지에서 두 레이어를 시각적으로 분리한다.

## 2. Guide 페이지 공통 구조
1. Hero
   - 검색형 제목
   - 2~4문장 요약
   - 예상 소요시간/이동방식/Stop 수
2. Route Map
3. Stop cards
   - Stop 번호
   - Place/Map link
   - 작품에서의 의미 또는 Scene Context
   - Why This Place?
   - 다음 Stop 이동 힌트
   - 방문 주의사항
4. Before You Go
   - 운영시간/사유지/접근성 등 변동 가능 정보
   - `마지막 확인 YYYY-MM-DD`
5. Related
   - Work
   - Place
   - Region/Map
   - 다른 Guide

## 3. URL 원칙
권장:
- `/guides/breaking-bad-albuquerque-1day/`
- `/guides/poksshak-jeju-1day/`
- `/ja/guides/byakuya-pilgrimage/`

실제 URL architecture는 개발 시작 전 repo audit에서 최종 확인한다. 기존 고순위 Work/Place URL을 변경하지 않는다.

## 4. 개발 공수 최소화 원칙
작품마다 별도 HTML을 손코딩하지 않는다.

Planner가 `Guide Package` 데이터/문구/Stop/asset을 준비하고 Developer는 공용 Guide renderer/template 1개만 만든다.

이후 Guide 추가는:
`planner package → generator → generated guide`
로 처리해야 한다.

## 5. Phase F v1에서 하지 않는 것
- 자동 경로 최적화
- 실시간 교통
- 예약/결제
- 로그인
- 사용자 저장
- 사용자 리뷰
- 대량 Guide 생성

## 6. SEO 원칙
- Guide는 기존 Work와 다른 검색의도를 가져야 한다.
- Work title/H1을 Guide 때문에 바꾸지 않는다.
- Guide → Work/Place/Map crawlable links
- canonical/hreflang/sitemap 정상 유지
- 얇은 텍스트 + 지도만 있는 페이지 금지
- 각 Guide는 사람이 기획한 순서/설명/주의사항을 가져야 한다.

## 7. 성공 판단
배포 후 14/28일:
- Guide impressions/clicks/CTR/position
- Guide → Place/Work/Map 클릭
- 해당 작품 전체 organic landing 증가 여부

## 8. Development Gate
다음이 모두 끝난 뒤 release:
1. Issue #37 complete
2. Issue #40 complete
3. Planner Guide Package 3/3 READY
4. Stop → canonical location mapping 완료
5. 현재 접근 가능성/사유지 주의사항 확인
6. asset/source/license 준비

## 9. NEEDS DECISION
- Guide URL architecture가 기존 router/generator와 충돌
- 실시간 외부 지도 API 또는 유료 API가 필요
- 사유지 방문을 직접 유도해야 하는 구조
- 고순위 기존 URL 변경 필요
- 검증되지 않은 촬영지를 route에 넣어야 함

## 10. Source notes
Breaking Bad:
- https://albuquerque.com/explore-albuquerque-the-breaking-bad-way/
- https://www.imdb.com/title/tt0903747/locations/

Poksshak / Jeju:
- https://www.visitjeju.net/kr/themtour/view?contentsid=CNTS_300000000013461
- https://www.visitjeju.net/kr/themtour/view?contentsid=CNTS_300000000013454

Byakuyako:
- https://www.ibarakiguide.jp/ibaraki-fc/support.php?code=406&mode=detail
- https://loca.ash.jp/info/2006/d200601_byakuyakou.htm
