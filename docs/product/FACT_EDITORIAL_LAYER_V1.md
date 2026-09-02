# Fact / Editorial Layer v1

Status: **PLANNER CANONICAL — REQUIRED BEFORE #45 IMPLEMENTATION RELEASE**

## 1. 목적

그곳지금의 콘텐츠를 두 층으로 분리한다.

- **Fact Layer**: 검증 가능한 촬영지/배경/방문 정보
- **Editorial Layer**: 운영자의 선택, 해석, 큐레이션, 작품을 장소로 다시 보는 관점

핵심 원칙:

> Fact는 짧고 검증 가능하게. Editorial은 개인 창작의 핵심으로.

AI가 작성한 문장을 운영자의 실제 경험/의견처럼 가장하지 않는다. 운영자의 관점은 운영자에게서 받은 짧은 입력을 바탕으로 편집·확장한다.

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

단순한 감상문이 아니라 **선택과 연결의 이유**를 보여준다.

### Work 페이지에서 필요한 Editorial

#### A. Editor's Lens — 2~4문장
예시 질문:
- 이 작품을 장소로 다시 본다면 무엇이 가장 중요해 보이는가?
- 이 작품의 장소를 따라가면 어떤 감정/시간/관계가 다시 보이는가?

#### B. Why these 3 scenes?
3개 Scene을 고른 이유를 각각 1문장.

#### C. Why these places?
Core Place 3~5를 고른 이유를 각각 1~2문장.

#### D. Optional closing note
작품과 장소를 다시 연결해서 보는 짧은 마무리 1~2문장.

### 하지 말 것
- 운영자가 직접 가본 적 없는데 `가봤다`, `직접 보니` 등 체험 화법
- 운영자 의견을 받지 않았는데 AI가 임의로 `내가 가장 좋아한 장면`이라고 단정
- Fact와 Editorial을 같은 문장 안에서 섞어 독자가 무엇이 확인된 사실인지 구분하기 어렵게 만들기

---

## 4. Editorial Input — 작품당 3문답

Pilot 5개 작품은 구현 전에 운영자에게 아래 3개만 묻는다.

1. **이 작품에서 가장 기억에 남은 감정/관계/주제는 무엇인가?**
2. **장소 중 어디가 가장 궁금하거나 직접 보고 싶은가? 왜 그런가?**
3. **이 작품을 장소로 보여줄 때 방문자에게 어떤 느낌을 남기고 싶은가?**

답은 짧아도 된다. Planner가 이를 바탕으로 Editor's Lens / Scene Selection / Place Selection 문안을 작성한다.

운영자가 작품을 보지 않았거나 의견이 없다면:
- 개인 의견을 만들어내지 않는다.
- Editorial Layer를 `curated rationale` 수준으로 제한하고 개인 1인칭을 사용하지 않는다.

---

## 5. Visual distinction

Fact와 Editorial은 UI에서도 구분한다.

권장:
- `작품을 장소로 다시 본다면` = Editorial section
- `실제 촬영지`, `작품 속 배경` badge = Fact
- `왜 이 장면을 골랐나` = Editorial
- `이 장면의 실제 장소` = Fact
- `왜 가볼 만한가` = Editorial/Practical 판단. 단, 운영자 직접 방문 경험이 아니라면 `가보면 좋다`보다 `이 장소가 의미 있는 이유` 중심으로 작성

별도 색상 체계를 과하게 추가하지 않는다. 라벨/문구 차이로 충분히 구분한다.

---

## 6. Pilot release gate

#45 R1 5개 작품을 구현하기 전:

- [ ] 작품당 3문답 확보 또는 `no-personal-editorial` 결정
- [ ] 3 Scene 선정 이유 확정
- [ ] 3~5 Core Place 선정 이유 확정
- [ ] Fact relationship/evidence audit 완료
- [ ] fake first-person 0
- [ ] Fact와 Editorial 문장 분리 완료

이 조건이 충족되지 않으면 개발자는 콘텐츠를 임의 작성하지 않는다.
