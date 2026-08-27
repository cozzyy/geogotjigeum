# PROJECT_MANAGEMENT — 그곳지금 AI 공동개발 시스템 v1.1

## 1. 목적
GitHub Issues + GitHub Projects를 프로젝트 운영 DB처럼 사용한다. 코드와 문서는 Git에, 작업 상태와 책임은 Issues/Projects에 남긴다.

또한 ChatGPT의 기획을 Claude 개발자가 안전하게 이어받도록 `기획 → 기술검토 → 사용자 승인 → 개발` Gate를 사용한다.

## 2. GitHub Project 권장 이름
`Geogotjigeum AI Collaboration`

## 3. Project DB 필드

| 필드 | 형식 | 권장 값 / 설명 |
|---|---|---|
| Status | Single select | Inbox / Planning / Dev Review / Needs Decision / Approved / In Development / PR Review / Done / Hold / Cancelled / Blocked |
| Type | Single select | content / product / development / qa / seo / research / bug / ops |
| Priority | Single select | P0 Critical / P1 High / P2 Medium / P3 Low |
| Agent/Owner | Text 또는 Assignee | ChatGPT / Claude / Manus / 사람 담당자 |
| Area | Single select | Home / Map / Hooking Page / Content / Quiz / Search / SEO / Ads / i18n / Infra / Analytics / Other |
| Content/Work | Text | 작품명, 장소명 또는 기능명 |
| Language | Multi select | KR / EN / JP / ZH / Global / N/A |
| Source | Single select | User / Voice Memo / Email / Meeting / Research / QA / Analytics / Agent |
| Target date | Date | 목표일 |
| Last reviewed | Date | 마지막 점검일 |
| Result/PR | Text | 결과 파일·PR·배포 링크 |

처음에는 위 필드만 사용한다. 실제 운영에서 필요가 확인되기 전에는 필드를 늘리지 않는다.

## 4. Status 정의
- **Inbox**: 아직 분류되지 않은 메모·메일·녹취·아이디어
- **Planning**: ChatGPT 또는 사람이 기획/요구사항을 정리 중
- **Dev Review**: Claude가 기획과 현재 코드의 구현 가능성·충돌·위험을 검토
- **Needs Decision**: 사용자 판단이 필요해 개발을 멈춘 상태
- **Approved**: 사용자가 개발을 명시적으로 승인함
- **In Development**: Claude/개발자가 실제 코드 작업 중
- **PR Review**: 구현과 테스트가 끝나 PR 검토가 필요한 상태
- **Done**: 완료 기준 충족
- **Hold**: 우선순위/외부조건으로 잠시 중단
- **Cancelled**: 진행하지 않기로 결정
- **Blocked**: 권한·환경·외부 의존성 등으로 진행 불가

단순 조사/콘텐츠 작업처럼 개발 Gate가 필요 없는 경우 일부 상태를 건너뛸 수 있다.

## 5. 추천 View

### A. Master Board
Group: Status
Filter: Cancelled 제외

### B. 대표 의사결정
Filter: Status = Needs Decision 또는 Approved 직전
목적: 사용자가 복잡한 작업 전체가 아니라 지금 판단할 일만 확인

### C. This Week
Filter: Priority = P0/P1 또는 Target date가 7일 이내

### D. Content Pipeline
Filter: Type = content
Group: Status

### E. Development
Filter: Type = development 또는 bug
Group: Status

### F. AI Work Queue
Filter: Agent/Owner가 ChatGPT / Claude / Manus 중 하나
Group: Agent/Owner

### G. Inbox
Filter: Status = Inbox

## 6. Issue 생성 기준
다음 중 하나에 해당하면 Issue를 만든다.
- 30분 이상 걸릴 가능성이 있는 작업
- 여러 파일/페이지에 영향을 주는 작업
- 다른 에이전트에게 넘길 가능성이 있는 작업
- 검토/승인이 필요한 작업
- 사용자가 나중에 진행상황을 물어볼 가능성이 있는 작업
- 버그 또는 배포 이슈

단순 오탈자, 즉시 끝나는 소규모 문구 수정 등은 Issue 없이 처리할 수 있다.

## 7. Issue 종류
### 일반 작업
`.github/ISSUE_TEMPLATE/task.yml`

### 정리되지 않은 입력
`.github/ISSUE_TEMPLATE/inbox.yml`

### ChatGPT 기획 → Claude 개발 인수인계
`.github/ISSUE_TEMPLATE/handoff.yml`

Handoff Issue는 반드시 연결된 기획문서와 개발 승인 상태를 가진다.

## 8. Issue 제목 규칙
형식:
`[TYPE] 작업 대상 - 핵심 작업`

기획→개발 인수인계:
`[HANDOFF] 작업 대상 - Claude 개발 검토`

## 9. Handoff 운영 규칙
1. ChatGPT가 기획안을 GitHub 문서로 저장한다.
2. 개발이 필요하면 Handoff Issue를 생성한다.
3. 기본 승인값은 `NOT APPROVED`다.
4. Claude는 코드를 수정하기 전 기술검토를 한다.
5. Claude는 결과를 `READY FOR APPROVAL / NEEDS DECISION / BLOCKED` 중 하나로 남긴다.
6. `NEEDS DECISION`이면 질문을 1~3개로 줄이고 A/B안과 추천을 제시한다.
7. 사용자가 `개발 승인` 또는 `APPROVED`를 명시하면 개발을 시작한다.
8. 개발 후 Test → PR → Review → Merge → Done으로 이동한다.

상세 규칙: `docs/CHATGPT_CLAUDE_HANDOFF.md`

## 10. Inbox 처리 규칙
1. 원문 의미 보존
2. 핵심 아이디어 1~3줄 요약
3. 기존 Issue/기능과 중복 검색
4. Type / Priority / Area 제안
5. 실행할 가치가 있으면 Planning으로 이동
6. 보류면 Hold, 불필요하면 Cancelled

사용자에게 원문을 다시 정리해서 보내달라고 요구하지 않는다.

## 11. 사용자 승인 기록
사용자는 GitHub UI에서 직접 답해도 되고 ChatGPT에게 답해도 된다.

사용자가 ChatGPT에서 승인하거나 의사결정을 내리면 ChatGPT는 관련 Issue에 다음을 기록한다.
- 사용자 결정
- 승인 여부
- 결정일
- 필요 시 선택한 A/B안

중요한 개발은 승인 기록이 없으면 시작하지 않는다.

## 12. Done 기준
가능한 경우 다음을 모두 충족한다.
- 요구사항 충족
- 결과물 GitHub 저장 또는 PR 연결
- 필요한 테스트/사실검증 완료
- 후속 작업이 있으면 별도 Issue 생성
- Project 상태 Done
- 전체 프로젝트 상태에 영향이 있으면 `PROJECT_STATE.md` 갱신

## 13. AI 인수인계 규칙
에이전트가 작업을 중단하거나 다른 에이전트로 넘길 때 Issue에 다음을 남긴다.
- 완료한 것
- 아직 안 한 것
- 다음 한 단계
- 관련 파일/브랜치/PR
- 막힌 이유가 있으면 원인

## 14. Project 생성 체크리스트
GitHub UI에서 최초 1회 설정한다.

- [ ] `Geogotjigeum AI Collaboration` 생성
- [ ] Repository `cozzyy/geogotjigeum` 연결
- [ ] Status 옵션을 v1.1 기준으로 구성
- [ ] Type / Priority / Agent-Owner / Area / Language / Source 필드 구성
- [ ] Target date / Last reviewed / Result-PR 필드 구성
- [ ] Master Board / 대표 의사결정 / This Week / Content / Development / AI Work Queue / Inbox View 생성
- [ ] 새 Issue 자동추가 Workflow 설정

## 15. 운영 원칙
GitHub Projects는 '상태 DB', Git Repository는 '결과물과 기억', 실제 서비스 DB는 '서비스 데이터'를 담당한다. 서로의 역할을 섞지 않는다.

Notion 등 별도 도구는 현재 필수 구성요소로 두지 않는다.
