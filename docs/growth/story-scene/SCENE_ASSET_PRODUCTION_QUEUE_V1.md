# Phase E — Scene Asset Production Queue v1

Date: 2026-08-31
Status: **PLANNER ASSET WORK QUEUED**
Parent: Issue #40

## 목적
15개 Scene Package의 이미지 자산을 개발자에게 넘기기 전에 기획 측에서 완성한다.

## Asset 원칙
우선순위:
1. 공공기관/공공관광기관이 명시적으로 재사용 가능한 이미지
2. Wikimedia Commons 등 라이선스가 명확한 실제 장소 사진
3. 직접 제작한 original graphic
4. generated illustration

금지:
- 영화/Netflix/방송사 화면 캡처의 무단 저장
- Pinterest/블로그/SNS에서 출처 불명 이미지 다운로드
- 워터마크 이미지
- 라이선스가 불분명한 Google Images 결과
- 배우 얼굴을 사실적으로 재현한 generated image
- 영화의 특정 프레임 구도/캐릭터 외형을 그대로 복제한 illustration

## 공통 스펙
- `webp` 우선
- 16:9
- 최대 1600×900
- 목표 100–300KB, 특별한 이유 없으면 500KB 초과 금지
- 파일명: `scene-01.webp`, `scene-02.webp`, `scene-03.webp`
- 경로: `site/assets/scenes/<work-id>/`
- 각 asset에 source/license/author/source_url/attribution 기록

## 제작 큐

### Odyssey
- `odyssey/scene-01.webp` — Voidokilia + Nestor’s Cave 실제 풍경
  - 1순위: Greek public tourism / licensed Commons photo
  - 대안: cave + crescent beach를 주제로 한 original editorial illustration
- `odyssey/scene-02.webp` — Methoni Castle + sea
  - 1순위: public tourism / Commons
- `odyssey/scene-03.webp` — Palace of Nestor / Pylos-Messinia
  - 1순위: archaeological/public tourism image

### Breaking Bad
- `breakingbad/scene-01.webp` — Walter White house
  - 사유지 이슈 때문에 원본 장소 사진 사용 시 촬영/배포 라이선스와 사생활 맥락 재검토
  - 안전 대안: Albuquerque suburban house + desert light의 non-identical editorial illustration
- `breakingbad/scene-02.webp` — Twisters / Los Pollos exterior context
  - 상표권보다 저작권/사진 라이선스가 우선. 실제 매장 사진은 사용권 확인.
  - 안전 대안: Southwest fast-food exterior editorial illustration, 극중 로고 복제 금지
- `breakingbad/scene-03.webp` — To’hajiilee desert
  - 실제 landscape licensed photo 우선
  - 방문 유도 이미지는 아니며 접근 규정 경고와 함께 사용

### Byakuyako
- `byakuya/scene-01.webp` — Kintetsu Fuse Station
- `byakuya/scene-02.webp` — Fuse Hondori shopping street
- `byakuya/scene-03.webp` — Mitsukaido/Kita-Mitsukaido station
  - 3개 모두 실제 거리/역 사진 우선
  - 일본 철도/상가 브랜드 로고는 이미지 자체의 부수 요소로만 사용하고 기획 그래픽에서 로고를 확대 재현하지 않는다.

### Stranger Things
- `strangerthings/scene-01.webp` — Rome, Georgia / Creel House
  - private property라면 licensed exterior photo 또는 house-specific imitation을 피한 gothic-house editorial illustration
- `strangerthings/scene-02.webp` — Emory at Briarcliff / Hawkins Lab exterior
  - 현황과 사용권 확인 후 actual photo
- `strangerthings/scene-03.webp` — Gwinnett Place Mall
  - current/redevelopment status와 photo license 확인
  - Starcourt 로고/Netflix set 이미지는 사용하지 않는다.

### Poksshak
- `poksshak/scene-01.webp` — Seongsan Ilchulbong + canola
  - 공공관광/Commons actual photo 최우선
- `poksshak/scene-02.webp` — Gimnyeong Fishing Village / coast
  - 주민 얼굴·사유지보다 풍경 중심
- `poksshak/scene-03.webp` — Gwandeokjeong
  - 문화유산 전경 actual photo 최우선

## Manifest-ready asset metadata
각 이미지가 repo에 들어가기 전 다음 필드를 채운다.

```yaml
asset_id: odyssey-scene-01
path: /assets/scenes/odyssey/scene-01.webp
type: photo # photo | illustration | generated
source_name: "..."
source_url: "..."
author: "..."
license: "CC BY-SA 4.0"
attribution: "Photo by ... / CC BY-SA 4.0"
verified_at: 2026-08-31
```

## READY 판정
다음 7개가 모두 있어야 Scene Package를 `READY`로 올린다.
1. scene copy
2. canonical Place link
3. relation classification
4. image file in repo
5. source/license metadata
6. alt text
7. Why This Place copy

## 개발자에게 넘기지 말아야 할 상태
- `ASSET_PENDING`
- `LICENSE_UNCLEAR`
- `PLACE_ID_TRACE`
- `RELATION_NEEDS_FINAL_CHECK`
- `CURRENT_STATUS_VERIFY`

개발자는 파일을 임의로 채우거나 대체 이미지를 찾지 않는다.