# Phase E — Scene Asset Production Queue v1

Date: 2026-09-01
Status: **COMPLETE — SUPERSEDED BY READY MANIFEST**
Parent: Issue #40

## 결론

기획 측 이미지 제작/권리 검토 작업은 완료됐다.

Phase E v1은 외부 영화/방송 스틸을 사용하지 않고 **기획 측이 직접 만든 original SVG editorial illustration 15개**를 사용한다.

최종 구현 입력은 아래 두 파일을 따른다.

1. `docs/growth/story-scene/SCENE_PACKAGES_READY_V1.yaml`
2. `docs/growth/story-scene/SCENE_PLACE_MAPPING_V1.md`

이 문서는 과거 제작 큐의 기록이며 더 이상 개발 blocker가 아니다.

## 완료 자산

### Odyssey
- `/assets/scenes/odyssey/odyssey-scene-01.svg`
- `/assets/scenes/odyssey/odyssey-scene-02.svg`
- `/assets/scenes/odyssey/odyssey-scene-03.svg`

### Breaking Bad
- `/assets/scenes/breakingbad/breakingbad-scene-01.svg`
- `/assets/scenes/breakingbad/breakingbad-scene-02.svg`
- `/assets/scenes/breakingbad/breakingbad-scene-03.svg`

### Byakuyako
- `/assets/scenes/byakuya/byakuya-scene-01.svg`
- `/assets/scenes/byakuya/byakuya-scene-02.svg`
- `/assets/scenes/byakuya/byakuya-scene-03.svg`

### Stranger Things
- `/assets/scenes/strangerthings/strangerthings-scene-01.svg`
- `/assets/scenes/strangerthings/strangerthings-scene-02.svg`
- `/assets/scenes/strangerthings/strangerthings-scene-03.svg`

### Poksshak
- `/assets/scenes/poksshak/poksshak-scene-01.svg`
- `/assets/scenes/poksshak/poksshak-scene-02.svg`
- `/assets/scenes/poksshak/poksshak-scene-03.svg`

## Asset metadata

모든 v1 asset은:

```yaml
image_type: original_illustration
image_source_url: internal
license: original
attribution: "그곳지금 기획"
```

으로 관리한다.

각 Scene별 alt text와 실제 `image_path`는 `SCENE_PACKAGES_READY_V1.yaml`에 이미 채워져 있다.

## 왜 SVG를 썼는가

- 개발자에게 이미지 탐색/저작권 판단을 넘기지 않기 위해서
- 영화/Netflix/방송사 screenshot 무단 저장을 피하기 위해서
- repo에서 가볍고 선명하게 관리하기 위해서
- 16:9 `viewBox="0 0 1600 900"`으로 반응형 렌더링하기 위해서

실제 장소 사진으로 교체하는 것은 이후 별도 콘텐츠 개선 작업이다. Phase E v1 개발 착수 조건은 아니다.

## 개발자 규칙

- 위 15개 asset을 그대로 사용한다.
- 인터넷에서 더 좋은 이미지를 임의로 찾지 않는다.
- 배우 얼굴/원작 프레임 유사 이미지를 생성하지 않는다.
- 파일이 실제 로드되지 않으면 broken path로 보고하고 임의 대체하지 않는다.

## 완료 판정

- asset files: **15/15 repo 반영 완료**
- source/license policy: **15/15 완료**
- alt text: **15/15 READY manifest에 완료**
- developer asset sourcing: **불필요**
