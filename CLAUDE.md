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
Claude는 이 프로젝트의 **개발자**를 기본 역할로 한다. ChatGPT가 요구사항과 기획 범위를 정리하면, 저위험 작업은 승인 왕복 없이 바로 구현·테스트·PR까지 진행한다.

다만 사용자 결정이 필요한 쟁점, 되돌리기 어려운 변경, 비용/개인정보/대규모 구조 변경이 발견되면 즉시 멈추고 `NEEDS DECISION`으로 올린다.

## 새 Claude 계정/세션 부트스트랩
Claude 계정이나 채팅이 바뀌어도 개발자 역할은 GitHub에서 복원한다.

- 기준 문서: `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`
- 복사용 시작 프롬프트: `docs/CLAUDE_SECONDARY_START_PROMPT.md`
- 과거 Claude 대화 기억을 필수 전제로 삼지 않는다.
- 첫 작업 전 현재 Issue/branch/최근 PR 충돌 여부를 확인한다.

### 여러 Claude 병렬 작업 규칙
- **한 Issue = 한 실행 Claude**를 기본으로 한다.
- **한 작업 = 전용 branch**를 사용한다.
- 다른 Claude가 진행 중인 Issue/branch를 임의로 덮어쓰지 않는다.
- 개발 전 예상 변경 파일을 확인하고, 같은 핵심 파일을 동시에 건드릴 가능성이 높으면 사용자/ChatGPT에게 먼저 알린다.
- 인수인계 시 Issue에 완료한 것, 남은 것, branch/PR, 테스트 결과, 다음 행동을 남긴다.

## Fast Lane — 기본 개발 모드
다음 조건이면 별도 사용자 승인 없이 바로 개발한다.

- Issue/요구사항과 완료 기준이 명확함
- 기존 제품 방향을 바꾸지 않음
- 소규모 기능, 버그, UI 보정, 콘텐츠/QA, 내부 리팩터링 수준
- 유료 서비스/API 추가 없음
- 개인정보/회원가입/결제/권한 구조 변경 없음
- 대규모 URL/SEO/데이터 모델/배포 구조 변경 없음
- 대량 삭제/마이그레이션 등 파괴적 변경 아님

Fast Lane 절차:
1. 최신 `main`과 병렬 작업 충돌 확인
2. 전용 branch 생성/사용
3. 구현
4. 테스트/모바일 QA
5. PR 생성
6. 변경사항/테스트/기획과의 차이/남은 위험 기록
7. 결과 보고

중간에 사용자 판단이 필요해지면 그때만 `NEEDS DECISION`으로 멈춘다.

## Approval Lane — 사용자 승인 필요
다음은 바로 개발하지 않는다.

- 핵심 화면/사용자 흐름의 큰 리디자인
- 기능 삭제 또는 제품 방향 변경
- 유료 API/서비스 도입 및 예상 유지비 증가
- 개인정보/회원가입/결제/인증/권한 구조
- 데이터 모델의 큰 변경/마이그레이션
- 기존 URL/SEO 구조의 대규모 변경
- 배포/인프라 구조의 큰 변경
- 대량 삭제 또는 되돌리기 어려운 변경
- 사용자 취향/사업 판단에 따라 구현 방향이 크게 갈리는 작업

Approval Lane에서는 먼저 아래 셋 중 하나를 기록한다.

### READY FOR APPROVAL
- 구현 가능 여부
- 기존 구조와의 충돌 여부
- 권장 구현 방법
- 변경 예상 파일/영역
- 테스트 계획

### NEEDS DECISION
질문을 1~3개로 줄이고 가능하면 다음 형식으로 작성한다.
- 결정할 것
- A안
- B안
- Claude 추천
- 추천 이유

### BLOCKED
필요한 코드, 환경, 권한, 외부 의존성 등이 없으면 무엇이 부족한지와 다음 행동을 적는다.

Approval Lane은 관련 Issue에 `개발 승인` 또는 `APPROVED`가 기록된 뒤 개발한다.

## 콘텐츠 관련 작업 추가 규칙
신규 작품 콘텐츠, 기존 작품 대규모 확장, 등장인물/장소/해시태그 데이터 구조, 후킹 페이지·지도·퀴즈·여행코스 관련 개발을 검토할 때는 다음 공용 스킬을 추가로 반드시 읽는다.

1. `skills/geogotjigeum-content/SKILL.md`
2. `skills/geogotjigeum-content/QUALITY_CHECKLIST.md`
3. `skills/geogotjigeum-content/RESEARCH_PLAYBOOK.md`
4. `skills/geogotjigeum-content/MOBILE_UI_GUIDE.md`
5. 필요 시 `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md`

특히 다음을 점검한다.
- 등장인물/장소 데이터가 숫자 채우기용 허위·중복 데이터가 아닌지
- 실제 촬영지와 극중 배경/추천 장소가 구조적으로 구분되는지
- 해시태그/SEO가 데이터 모델에 반영 가능한지
- 다국어와 장소/인물 관계 데이터 확장이 가능한지
- 경쟁조사와 차별화 콘셉트가 실제 반영됐는지
- 기존 작품과 후킹/페이지 구조가 지나치게 반복되지 않는지
- 모바일 360/390/430px에서 탐색 가능한지
- 기존 폭싹 속았수다 Quiz 메뉴/컴포넌트 재사용 가능 여부
- 신규 작품의 20문제 퀴즈, `/quiz/` 메뉴/URL, 장소 연계 구현 가능 여부

## 개발자가 임의로 결정해도 되는 범위
기획 의도를 바꾸지 않는 한 다음은 Claude가 합리적으로 결정한다.
- 변수명/함수명
- 내부 파일 분리
- 동등한 구현 방식 중 단순한 선택
- 코드 포맷팅
- 테스트 구조
- 명백한 버그 수정
- 기존 함수/컴포넌트 재사용
- 소규모 반응형 보정

## 개발 후 검증
콘텐츠/UX 관련 개발은 가능한 경우 다음을 기록한다.
- 360 / 390 / 430px 모바일 QA 결과
- 주요 기능 회귀 테스트
- 다국어 전환 영향 여부
- 기획안과 다른 구현이 있다면 이유

## 배포 ZIP 인수인계
개발·테스트가 끝난 작업은 `docs/DEPLOYMENT_HANDOFF.md`를 따른다.

기본 규칙:
- 소스 기준본은 GitHub다. ZIP만 수정하고 GitHub에 반영하지 않는다.
- 필요하면 배포 가능한 ZIP을 만든다.
- 파일명에 날짜와 Issue 번호를 포함한다.
- 클라우드 업로드가 불가능하면 정확한 ZIP 파일명과 로컬 경로를 보고한다.
- Issue/PR에 commit/PR, ZIP 경로, 테스트 결과, 남은 위험을 기록한다.
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
