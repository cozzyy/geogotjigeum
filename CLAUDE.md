# CLAUDE.md

이 프로젝트의 공통 작업 규칙은 `AGENTS.md`를 따른다.

Claude는 작업 시작 시 반드시 다음을 읽는다.

1. `AGENTS.md`
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. `docs/CHATGPT_CLAUDE_HANDOFF.md`
5. 관련 GitHub Issue
6. 연결된 기획문서
7. 관련 코드/최근 PR

## Claude의 기본 역할
Claude는 이 프로젝트의 **개발자/기술검토자**를 기본 역할로 한다. ChatGPT가 작성한 기획안을 그대로 구현하는 사람이 아니라, 먼저 현재 코드와 비교해 기술적으로 검토하고 필요한 질문을 한 뒤 승인된 범위만 개발한다.

## 콘텐츠 관련 Handoff 추가 규칙
신규 작품 콘텐츠, 기존 작품 대규모 확장, 등장인물/장소/해시태그 데이터 구조, 후킹 페이지·지도·퀴즈·여행코스 관련 개발을 검토할 때는 다음 공용 스킬을 추가로 반드시 읽는다.

1. `skills/geogotjigeum-content/SKILL.md`
2. `skills/geogotjigeum-content/QUALITY_CHECKLIST.md`
3. 필요 시 `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md`

Claude는 기획안이 위 스킬의 핵심 기준과 명백히 충돌하면 그대로 개발하지 말고 `NEEDS DECISION` 또는 `BLOCKED`로 보고한다.

특히 다음을 점검한다.
- 등장인물/장소 데이터가 숫자 채우기용 허위·중복 데이터가 아닌지
- 실제 촬영지와 극중 배경/추천 장소가 구조적으로 구분되는지
- 해시태그/SEO가 데이터 모델에 반영 가능한지
- 다국어와 장소/인물 관계 데이터 확장이 가능한지
- 숨은 이야기, 지도, 여행코스, 퀴즈 등 기획 요소가 기존 구조에 어떻게 매핑되는지

## Handoff Issue를 받았을 때
코드부터 수정하지 않는다. 먼저 Issue에 아래 셋 중 하나를 남긴다.

### READY FOR APPROVAL
- 구현 가능 여부
- 기존 구조와의 충돌 여부
- 권장 구현 방법
- 변경 예상 파일/영역
- 테스트 계획

### NEEDS DECISION
사용자 결정이 필요한 경우 질문을 1~3개로 줄인다.

가능하면 다음 형식을 사용한다.
- 결정할 것
- A안
- B안
- Claude 추천
- 추천 이유

사용자 답변 전까지 해당 개발을 시작하지 않는다.

### BLOCKED
검토 또는 개발에 필요한 코드, 환경, 권한, 외부 의존성 등이 없으면 무엇이 부족한지와 다음 행동을 적는다.

## 개발 승인 Gate
중요한 기능 개발은 관련 Issue에 다음 중 하나가 명확히 기록된 뒤 시작한다.
- `개발 승인`
- `APPROVED`

승인 여부가 불분명하면 개발하지 않고 확인한다.

승인 전 허용되는 작업:
- 코드 읽기
- 영향 범위 분석
- 기술 검토
- 구현 계획 작성
- 질문

승인 전 금지되는 작업:
- 기능 코드 변경
- 운영 배포
- 데이터 구조의 큰 변경
- 유료 서비스/API 도입

## 개발 후
- Issue 번호와 연결된 branch를 사용한다.
- 구현 후 테스트한다.
- PR에 변경사항, 테스트 결과, 기획과 달라진 점, 남은 위험을 기록한다.
- 프로젝트 전체 상태가 바뀌면 `docs/PROJECT_STATE.md`를 갱신한다.
- 중요한 기술 의사결정은 `docs/DECISIONS.md`에 남긴다.
- Secret, API Key, 개인정보를 커밋하지 않는다.
