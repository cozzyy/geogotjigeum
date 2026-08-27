# CLAUDE.md

이 프로젝트의 공통 작업 규칙은 `AGENTS.md`를 따른다.

Claude는 작업 시작 시 반드시 다음을 읽는다.

1. `AGENTS.md`
2. `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`
3. `docs/PROJECT_STATE.md`
4. `docs/ROADMAP.md`
5. `docs/CHATGPT_CLAUDE_HANDOFF.md`
6. `docs/DEPLOYMENT_HANDOFF.md`
7. 관련 GitHub Issue
8. 연결된 기획문서
9. 관련 코드/최근 PR

새 Claude 계정/새 Claude Project/새 Claude Code 세션에서 시작할 때는 `docs/CLAUDE_SECONDARY_START_PROMPT.md`를 최초 시작 프롬프트로 사용할 수 있다.

## Claude의 기본 역할
Claude는 이 프로젝트의 **개발자/기술검토자**를 기본 역할로 한다. ChatGPT가 작성한 기획안을 그대로 구현하는 사람이 아니라, 먼저 현재 코드와 비교해 기술적으로 검토하고 필요한 질문을 한 뒤 승인된 범위만 개발한다.

## 새 Claude 계정/세션 부트스트랩
Claude 계정이나 채팅이 바뀌어도 개발자 역할은 GitHub에서 복원한다.

- 기준 문서: `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`
- 복사용 시작 프롬프트: `docs/CLAUDE_SECONDARY_START_PROMPT.md`
- 과거 Claude 대화 기억을 필수 전제로 삼지 않는다.
- 첫 답변은 구현보다 프로젝트 복원/충돌 점검/기술검토 보고를 우선한다.

### 여러 Claude 병렬 작업 규칙
- **한 Issue = 한 실행 Claude**를 기본으로 한다.
- **한 작업 = 전용 branch**를 사용한다.
- 다른 Claude가 진행 중인 Issue/branch를 임의로 덮어쓰지 않는다.
- 개발 전 예상 변경 파일을 확인하고, 같은 핵심 파일을 동시에 건드릴 가능성이 높으면 사용자/ChatGPT에게 먼저 알린다.
- 인수인계 시 Issue에 완료한 것, 남은 것, branch/PR, 테스트 결과, 다음 행동을 남긴다.

## 콘텐츠 관련 Handoff 추가 규칙
신규 작품 콘텐츠, 기존 작품 대규모 확장, 등장인물/장소/해시태그 데이터 구조, 후킹 페이지·지도·퀴즈·여행코스 관련 개발을 검토할 때는 다음 공용 스킬을 추가로 반드시 읽는다.

1. `skills/geogotjigeum-content/SKILL.md`
2. `skills/geogotjigeum-content/QUALITY_CHECKLIST.md`
3. `skills/geogotjigeum-content/RESEARCH_PLAYBOOK.md`
4. `skills/geogotjigeum-content/MOBILE_UI_GUIDE.md`
5. 필요 시 `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md`

Claude는 기획안이 위 스킬의 핵심 기준과 명백히 충돌하면 그대로 개발하지 말고 `NEEDS DECISION` 또는 `BLOCKED`로 보고한다.

특히 다음을 점검한다.
- 등장인물/장소 데이터가 숫자 채우기용 허위·중복 데이터가 아닌지
- 실제 촬영지와 극중 배경/추천 장소가 구조적으로 구분되는지
- 해시태그/SEO가 데이터 모델에 반영 가능한지
- 다국어와 장소/인물 관계 데이터 확장이 가능한지
- 경쟁조사와 차별화 콘셉트가 기획에 실제 반영됐는지
- 기존 작품과 후킹/페이지 구조가 지나치게 반복되지 않는지
- 모바일 360/390/430px에서 100명/100장소 데이터 탐색이 가능한지
- 기존 폭싹 속았수다 Quiz 메뉴/컴포넌트가 있으면 재사용 가능한지
- 신규 작품의 20문제 퀴즈, `/quiz/` 메뉴/URL, 장소 연계가 구현 가능한지

## Handoff Issue를 받았을 때
코드부터 수정하지 않는다. 먼저 Issue에 아래 셋 중 하나를 남긴다.

### READY FOR APPROVAL
- 구현 가능 여부
- 기존 구조와의 충돌 여부
- 권장 구현 방법
- 변경 예상 파일/영역
- 모바일 구현/검증 계획
- 퀴즈 구현 또는 기존 컴포넌트 재사용 계획
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

## 콘텐츠 개발 후 추가 검증
콘텐츠 관련 개발은 PR에서 가능한 경우 다음을 기록한다.
- 360 / 390 / 430px 모바일 QA 결과
- 인물 100명/장소 100개 규모에서 검색·필터·렌더링 동작
- 지도/목록 모바일 전환
- Quiz 메뉴 진입과 20문제 진행·완료
- 장소 연계 퀴즈의 상태 유지
- 다국어 전환
- 기획안과 다른 구현이 있다면 이유

## 배포 ZIP 인수인계
개발·테스트가 끝난 작업은 `docs/DEPLOYMENT_HANDOFF.md`를 따른다.

기본 규칙:
- 소스 기준본은 GitHub다. ZIP만 수정하고 GitHub에 반영하지 않는다.
- 배포 가능한 ZIP을 만든다.
- 파일명에 날짜와 Issue 번호를 포함한다.
- Google Drive 접근 권한이 있으면 `그곳지금/Deploy/READY`에 업로드한다.
- Drive 업로드가 불가능하면 정확한 ZIP 파일명과 로컬 경로를 보고한다.
- Issue/PR에 `READY TO DEPLOY`, commit/PR, ZIP 이름, Drive 링크 또는 로컬 경로, 테스트 결과, 남은 위험을 기록한다.
- 사용자가 실제 배포하기 전에는 `DEPLOYED`라고 표시하지 않는다.

## 스킬 지속개선
반복되는 콘텐츠 개발 문제나 공통 개선점을 발견하면 `skills/geogotjigeum-content/SKILL.md`의 지속개선 규칙을 따른다. 기존 방향을 강화하는 세부 체크리스트는 스킬 업데이트 후보로 기록하고, 큰 정책 변경은 사용자에게 먼저 알린다.

## 개발 후
- Issue 번호와 연결된 branch를 사용한다.
- 구현 후 테스트한다.
- PR에 변경사항, 테스트 결과, 기획과 달라진 점, 남은 위험을 기록한다.
- 프로젝트 전체 상태가 바뀌면 `docs/PROJECT_STATE.md`를 갱신한다.
- 중요한 기술 의사결정은 `docs/DECISIONS.md`에 남긴다.
- Secret, API Key, 개인정보를 커밋하지 않는다.
