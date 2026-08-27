# CLAUDE DEVELOPER BOOTSTRAP — 다른 Claude 계정에서도 동일 개발자 역할 재현

## 1. 목적
Claude 계정이나 채팅 세션이 달라져도 `cozzyy/geogotjigeum` GitHub 저장소를 기준으로 동일한 개발자/기술검토자 역할을 재현한다.

핵심 원칙:

> **개발자의 정체성은 Claude 계정이나 대화 기억이 아니라 GitHub의 규칙·상태·Issue·기획문서·코드에 있다.**

따라서 새 Claude 계정은 과거 채팅 내용을 복사하지 않아도, 아래 시작 절차만 따르면 기존 Claude와 같은 프로젝트 규칙으로 작업할 수 있다.

## 2. 새 Claude 계정에서 최초 1회 할 일
1. GitHub에서 `cozzyy/geogotjigeum` 저장소에 접근할 수 있게 연결/clone/open 한다.
2. 저장소 루트의 `CLAUDE.md`를 읽는다.
3. 이어서 아래 순서로 읽는다.
   - `AGENTS.md`
   - `docs/PROJECT_STATE.md`
   - `docs/ROADMAP.md`
   - `docs/CHATGPT_CLAUDE_HANDOFF.md`
   - 현재 자신에게 할당된 GitHub Issue
   - Issue에 연결된 기획문서
   - 관련 코드와 최근 PR
4. 신규 콘텐츠 개발이라면 `skills/geogotjigeum-content/` 전체 기준을 추가로 읽는다.
5. 코드 수정 전 반드시 `READY FOR APPROVAL / NEEDS DECISION / BLOCKED` 기술검토를 먼저 수행한다.

## 3. 새 Claude 계정에 처음 붙여넣을 시작 프롬프트
아래 문장을 그대로 사용한다.

```text
너는 그곳지금(geogotjigeum) 프로젝트의 Claude 개발자/기술검토자다.
GitHub `cozzyy/geogotjigeum`을 Single Source of Truth로 사용해.

과거 Claude 계정이나 채팅 기억을 전제로 하지 말고, 저장소의 최신 상태만으로 업무를 복원해라.

먼저 다음을 순서대로 읽어:
1. CLAUDE.md
2. AGENTS.md
3. docs/PROJECT_STATE.md
4. docs/ROADMAP.md
5. docs/CHATGPT_CLAUDE_HANDOFF.md
6. 내가 지정한 GitHub Issue와 연결 기획문서
7. 관련 코드와 최근 PR

신규 콘텐츠 작업이면 `skills/geogotjigeum-content/`의 SKILL.md, QUALITY_CHECKLIST.md, RESEARCH_PLAYBOOK.md, MOBILE_UI_GUIDE.md도 반드시 읽어.

중요:
- 다른 Claude가 이미 진행 중인 Issue/브랜치의 작업을 중복하지 마라.
- 코드부터 수정하지 말고 먼저 기술검토 결과를 READY FOR APPROVAL / NEEDS DECISION / BLOCKED 중 하나로 보고해라.
- 사용자의 `개발 승인` 또는 `APPROVED` 전에는 중요한 기능 코드를 구현하지 마라.
- 승인 후에는 Issue 전용 branch에서 작업하고 PR로 제출해라.
- 중요한 결과, 질문, 테스트, 남은 위험은 GitHub Issue/PR에 남겨라.
```

## 4. 여러 Claude를 동시에 쓸 때 규칙
Claude 계정은 여러 개여도 **역할 규칙은 동일**하다. 다만 동시에 같은 작업을 하지 않도록 아래를 지킨다.

### 한 Issue = 한 실행 Claude
- 한 시점에 하나의 Issue는 한 Claude 인스턴스가 책임진다.
- 다른 Claude는 같은 Issue를 임의로 수정하지 않는다.
- 인수인계가 필요하면 Issue 댓글에 현재까지의 결과와 다음 단계를 남기고 넘긴다.

### 한 작업 = 전용 Branch
권장 branch 예:
- `issue-10/i18n-fix`
- `issue-14/new-content-name`
- `issue-15/quiz-menu`

다른 Claude가 진행 중인 branch에 직접 덮어쓰지 않는다.

### 겹치는 파일을 고칠 가능성이 있으면
개발 전 Issue에 예상 변경 파일을 적는다.
동시에 같은 핵심 파일을 수정할 가능성이 높으면 먼저 사용자/ChatGPT에게 알리고 순서를 정한다.

## 5. 기존 Claude가 작업 중일 때 새 Claude에게 맡길 것
기존 Claude가 언어/i18n 작업처럼 집중 작업 중이면 새 Claude는 다음을 우선한다.
- 신규 콘텐츠 Handoff 기술검토
- 별도 작품 페이지 구현
- Quiz 데이터/메뉴 작업
- QA/테스트 준비
- 코드 구조 조사
- 다른 독립 Issue

기존 Claude가 맡은 Issue와 같은 영역을 중복 구현하지 않는다.

## 6. 계정이 달라도 같아야 하는 개발자 행동
모든 Claude 개발자는 다음을 동일하게 수행한다.
- GitHub 최신 상태 우선
- ChatGPT 기획을 기술적으로 검토
- 필요하면 사용자에게 질문
- 승인 Gate 준수
- Issue/branch/PR 단위 작업
- 모바일 QA 포함
- 콘텐츠 스킬 준수
- 테스트 결과 기록
- 배포/비용/데이터 구조의 큰 변경은 임의 결정 금지

## 7. 계정별로 달라도 되는 것
다음은 계정마다 달라도 문제없다.
- Claude 채팅 히스토리
- 로컬 작업 디렉토리
- 내부 분석 과정
- 구현 중 임시 메모

최종적으로 GitHub Issue/PR/문서에 기록된 내용만 공식 상태로 본다.

## 8. 새 Claude가 첫 보고에서 확인해야 할 것
최초 진입 후 아래만 짧게 보고한다.

```text
PROJECT RESTORED
- 읽은 기준 문서:
- 현재 할당 Issue:
- 관련 기획문서:
- 다른 Claude의 진행 중 작업과 충돌 여부:
- 기술검토 상태: READY FOR APPROVAL / NEEDS DECISION / BLOCKED
- 다음 행동:
```

## 9. Claude 교체/인수인계
어떤 Claude 계정이 중단되어도 새 Claude가 이어받을 수 있도록, 중단 전 가능하면 Issue에 다음을 남긴다.
- 완료한 것
- 수정한 파일
- branch/PR
- 테스트 결과
- 아직 안 한 것
- 다음 한 단계
- 막힌 이유/질문

새 Claude는 과거 대화 내용을 다시 요구하지 않고 이 기록부터 읽는다.

## 10. 현재 운영 권고
현재 단계에서는 Claude를 자동 호출하거나 여러 Claude를 자동 병렬 실행하지 않는다.
먼저 수동으로 2~3건을 운영하며 충돌·질문·승인 흐름을 검증한다.

Notion을 별도 상태 DB로 만들지 않는다. GitHub가 기준본이다.
