# Fact / Editorial Layer v1

Status: **PLANNER CANONICAL — REQUIRED BEFORE #45 IMPLEMENTATION RELEASE**

## 1. 목적

그곳지금의 콘텐츠를 두 층으로 분리한다.

- **Fact Layer**: 검증 가능한 촬영지/배경/방문 정보
- **Editorial Layer**: 운영자의 선택, 해석, 큐레이션, 작품을 장소로 다시 보는 관점

핵심 원칙:

> Fact는 짧고 검증 가능하게. Editorial은 개인 창작의 핵심으로.

AI가 작성한 문장을 운영자의 실제 경험/의견처럼 가장하지 않는다. 운영자의 관점은 운영자 인터뷰를 바탕으로 편집·확장한다.

**중요:** Editorial Layer는 Work Detail 일부 박스에만 붙이는 부가요소가 아니다. 각 작품의 후킹페이지 전체 흐름(도입, 장면 선택, 장소 선택, 숨은 사실 선택, 마무리)의 편집 기준이 된다.

---

## 2. Fact Layer

Fact Layer는 아래 질문에만 답한다.

1. 실제로 어디서 찍었는가?
2. 촬영지가 아니라 작품 속 배경인가?
3. 지금 방문 가능한가?
4. 이 장소와 작품의 관계는 무엇인가?

### 필수 규칙
- 핵심 Scene 최대 3
- Core Place 3~5
- Hidden Fact 최대 3
- 불필요한 행정구역/연도/세부정보는 사용자가 이해/방문하는 데 필요할 때만 표시
- 관계 분류는 canonical record에서만 읽기
- 불확실한 정보는 `UNVERIFIED`로 분리하고 Core 영역에서 제외
- Fact 문장에는 1인칭 체험 표현 금지

### 관계 분류
- `FILMED`: 실제 촬영 확인
- `STORY_SETTING`: 작품/원작 속 배경
- `EXPERIENCE`: 공식 체험/전시
- `INSPIRATION`: 모티프/영감
- `UNVERIFIED`: 확인 부족

---

## 3. Editorial Layer

Editorial Layer가 그곳지금의 개인 창작 영역이다.

단순 감상문이 아니라 **무엇을 남기고 무엇을 버렸는지, 왜 그 장면과 장소를 골랐는지**를 보여준다.

### Work/후킹페이지에서 필요한 Editorial

#### A. Editor's Lens — 3~6문장
- 이 작품을 어떤 관점으로 기억하는가
- 무엇이 오래 남았는가
- 장소를 따라볼 때 어떤 감정/관계/세대를 다시 보고 싶은가

#### B. Why these scenes?
3개 Scene을 고른 이유를 각각 1문장.

#### C. Why these places?
Core Place 3~5를 고른 이유를 각각 1~2문장.

#### D. Hidden facts selection
사실이 많다고 다 쓰지 않는다. Editor's Lens와 관련 있고 검증이 강한 사실만 최대 3개 선택한다.

#### E. Closing / travel invitation
단순 `가보세요`가 아니라, 이 작품을 따라 여행했을 때 무엇을 느끼거나 누구와 어떤 대화를 해보면 좋은지 운영자의 관점을 담는다.

### 하지 말 것
- 운영자가 직접 가본 적 없는데 `가봤다`, `직접 보니` 등 체험 화법
- 운영자 의견을 받지 않았는데 AI가 임의로 `내가 가장 좋아한 장면`이라고 단정
- Fact와 Editorial을 같은 문장 안에서 섞어 독자가 무엇이 확인된 사실인지 구분하기 어렵게 만들기
- 검색량/유명도만으로 Scene/Place를 대표로 자동 선정하기

---

## 4. Editorial Input — 기억을 돕는 객관식 인터뷰

운영자가 작품을 오래전에 봐 세부 에피소드를 모두 기억하지 못할 수 있으므로, 기본 인터뷰는 **객관식 + 복수선택 가능** 방식으로 진행한다.

### 기본 구성
- 작품당 약 8~10문항
- 감정 / 관계 / 기억나는 사건 / 끌리는 장소 / 여행 경험 / 독자에게 남기고 싶은 생각을 묻는다.
- `잘 기억 안 남` 선택지를 반드시 제공한다.
- 필요할 경우 Planner가 검증된 작품 에피소드 예시를 짧게 제시해 기억을 돕는다.
- 답을 특정 방향으로 유도하지 않는다.

### 인터뷰에서 반드시 뽑아낼 것
1. 작품을 기억하는 핵심 감정
2. 인물/관계를 보는 운영자의 관점
3. 가장 보고 싶은 장소 유형
4. 장소를 고르는 기준
5. 여행자에게 권하고 싶은 경험
6. 페이지를 본 뒤 독자에게 남기고 싶은 감정/행동

### 개인창작성의 출처
운영자의 선택지를 Planner가 다음으로 변환한다.
- Editor's Lens
- Scene 3개 선정 기준
- Core Place 3~5 선정 기준
- Hidden Fact 선정 기준
- 후킹페이지 도입/마무리 문안

운영자가 작품을 보지 않았거나 의견이 없다면:
- 개인 의견을 만들어내지 않는다.
- Editorial Layer를 `curated rationale` 수준으로 제한하고 개인 1인칭을 사용하지 않는다.

---

## 5. 후킹페이지 전체 수정 규칙

기존 후킹페이지의 문장을 부분적으로 유지한 채 Editorial 박스만 추가하지 않는다.

Pilot 작품은 인터뷰가 완료되면 **페이지 전체를 인터뷰 관점에 맞춰 다시 편집**한다.

### 재편집 대상
- Hero/intro
- Scene 3개 선정 및 설명
- Core Place 3~5 선정 및 순서
- Why This Place 문장
- Hidden facts 최대 3개
- travel invitation / closing
- 관련 Guide/Quiz 노출 여부

### 원칙
- 기존 장문 줄거리 요약은 필요한 만큼만 축약
- 운영자의 관점과 연결되지 않는 부가 사실은 삭제/2차화
- 장소 수가 많다는 이유로 목록을 길게 노출하지 않음
- `유명한 관광지`보다 운영자의 선택 기준을 우선하되, Fact evidence가 약하면 대표로 쓰지 않음
- 기존 SEO URL/canonical/hreflang은 별도 승인 없이는 변경하지 않음

---

## 6. Visual distinction

Fact와 Editorial은 UI에서도 구분한다.

권장:
- `이 작품을 이렇게 기억했다` / `이 작품을 장소로 다시 본다면` = Editorial
- `실제 촬영지`, `작품 속 배경` badge = Fact
- `왜 이 장면을 골랐나` = Editorial
- `이 장면의 실제 장소` = Fact
- `왜 이곳이 기억에 남는가` = Editorial

별도 색상 체계를 과하게 추가하지 않는다. 라벨/문구 차이로 충분히 구분한다.

---

## 7. Pilot release gate

#45 R1 5개 작품을 구현하기 전:

- [ ] 작품별 객관식 인터뷰 완료 또는 `no-personal-editorial` 결정
- [ ] Editor's Lens 확정
- [ ] 3 Scene 선정 이유 확정
- [ ] 3~5 Core Place 선정 이유 확정
- [ ] Hidden Fact 최대 3개 선정
- [ ] Fact relationship/evidence audit 완료
- [ ] fake first-person 0
- [ ] Fact와 Editorial 문장 분리 완료
- [ ] 후킹페이지 전체 copy가 인터뷰 관점과 일관됨

이 조건이 충족되지 않으면 개발자는 콘텐츠를 임의 작성하지 않는다.
