# Verified Minimalism — Content Audit v1

이 문서는 구조조정 구현 전/중에 각 Work/Place/Region 콘텐츠를 판정하기 위한 공통 기준이다.

## 1. Work 판정

각 작품마다 아래만 확인한다.

### A. 핵심 5문항
1. 사용자가 이 작품의 실제 장소를 찾을 검색/방문 이유가 있는가?
2. 대표 장소 3~5개를 신뢰 가능한 근거로 확인할 수 있는가?
3. 촬영지 / 작품 배경 / 체험 / 영감 관계를 명확히 구분할 수 있는가?
4. 장면 또는 장소 설명이 단순 데이터 나열을 넘어 실제 추가 가치를 주는가?
5. 이 페이지에서 제거해도 사용자 가치가 거의 줄지 않는 정보가 무엇인가?

### B. 등급

- **A KEEP/CORE**: 3~5개 핵심 장소와 관계가 명확하고 대표 페이지로 쓸 수 있음.
- **B SIMPLIFY**: 작품 가치는 있으나 장소/인물/부가정보가 과다. 핵심만 남기면 좋음.
- **C RESEARCH BEFORE INDEX**: 촬영 여부·관계·지역 등 핵심 사실에 불확실성이 있음.
- **D DE-EMPHASIZE/MERGE**: 독립 Work/SEO 페이지 가치가 낮고 다른 경험에 흡수하는 편이 나음.

## 2. 장소별 판정

각 location은 다음 필드를 반드시 구분한다.

```text
work_id
location_id
display_name
relationship
core_candidate
source_strength
visit_value
notes
```

### relationship
- FILMED
- STORY_SETTING
- EXPERIENCE
- INSPIRATION
- UNVERIFIED

### source_strength
- **A**: 제작사/방송사/공식 관광기관/공식 로케이션 자료 등 1차 또는 준1차 근거
- **B**: 신뢰도 높은 언론/지역기관/복수의 신뢰 자료
- **C**: 블로그/팬 추정/단일 약한 출처

Core 3~5에는 원칙적으로 source_strength A/B만 사용한다.

## 3. Claim 삭제 규칙

아래 정보는 사용자 가치가 명확하지 않으면 쓰지 않는다.

- 세부 행정구역
- 불필요한 주소 설명
- 촬영과 무관한 주변 관광지
- 등장인물 생년/관계 등 작품 장소 이해와 직접 관계없는 데이터
- 확인하기 어려운 촬영 에피소드
- 이미 다른 카드에서 반복한 정보
- '관련 있음' 수준의 모호한 관계

## 4. Work 기본 노출량

```text
소개: 3~5문장
Scene: 0~3
Core Place: 3~5
Hidden facts: 0~3
Expanded locations: 필요 시 접힘
Source note: 1개
```

장소 수가 많다는 이유만으로 노출량을 늘리지 않는다.

## 5. Place 기본 노출량

```text
관계 label: 1
scene/context: 1
why visit: 1~2문장
practical fact: 최대 3
map action: 1
source/verification note: 1
```

## 6. 문체

금지:
- 실제 운영자의 직접 체험처럼 읽히는 허구의 1인칭
- `내가 가봤는데`, `직접 찾아봤는데` 등 사실이 아닌 체험 화법
- 과한 감탄/과장

권장:
- 자연스러운 대화체
- 짧은 문장
- 장면과 장소를 연결
- 확인된 것과 해석을 구분

예:

나쁨:
> 내가 찾아봤는데 이 장소가 진짜 대박이었다.

좋음:
> 화면에서는 제주처럼 보이지만, 실제 촬영은 고창에서 진행됐다. 작품을 본 뒤 장소를 찾아보면 가장 먼저 놀라는 지점 중 하나다.

## 7. Audit 산출물

작품별로 다음 한 줄 matrix를 만든다.

| work_id | grade | core 3~5 ready | scene ready | remove/secondary | factual risk | action |
|---|---|---:|---:|---|---|---|

R1 Pilot 5개부터 작성한 뒤 전체 catalog로 확장한다.
