# PROJECT_MANAGEMENT — 그곳지금 AI 공동개발 시스템 v1

## 1. 목적
GitHub Issues + GitHub Projects를 프로젝트 운영 DB처럼 사용한다. 코드와 문서는 Git에, 작업 상태와 책임은 Issues/Projects에 남긴다.

## 2. GitHub Project 권장 이름
`Geogotjigeum AI Collaboration`

## 3. Project DB 필드

| 필드 | 형식 | 권장 값 / 설명 |
|---|---|---|
| Status | Single select | Inbox / Planned / Todo / In Progress / Review / Done / Hold / Cancelled |
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

## 4. 추천 View

### A. Master Board
Group: Status
Filter: Cancelled 제외

### B. This Week
Filter: Priority = P0/P1 또는 Target date가 7일 이내

### C. Content Pipeline
Filter: Type = content
Group: Status

### D. Development
Filter: Type = development 또는 bug
Group: Status

### E. AI Work Queue
Filter: Agent/Owner가 ChatGPT / Claude / Manus 중 하나
Group: Agent/Owner

### F. Inbox
Filter: Status = Inbox
정리되지 않은 메모·메일·녹취·아이디어를 검토하는 곳.

## 5. Issue 생성 기준
다음 중 하나에 해당하면 Issue를 만든다.
- 30분 이상 걸릴 가능성이 있는 작업
- 여러 파일/페이지에 영향을 주는 작업
- 다른 에이전트에게 넘길 가능성이 있는 작업
- 검토/승인이 필요한 작업
- 사용자가 나중에 진행상황을 물어볼 가능성이 있는 작업
- 버그 또는 배포 이슈

단순 오탈자, 즉시 끝나는 소규모 문구 수정 등은 Issue 없이 처리할 수 있다.

## 6. Issue 제목 규칙
형식:
`[TYPE] 작업 대상 - 핵심 작업`

예:
- `[CONTENT] 폭싹 속았수다 - 제주 촬영지 1일 코스 기획`
- `[DEV] 언어 토글 - JP/ZH 전환 오류 수정`
- `[SEO] 파친코 - 검색 메타데이터 개선`
- `[QA] 후킹페이지 - 4개 언어 버튼 재점검`

## 7. Issue 본문 최소 항목
- 목적
- 배경/출처
- 해야 할 일
- 완료 기준
- 관련 문서/링크
- 담당 에이전트 또는 사람
- 주의사항

## 8. Inbox 처리 규칙
메모·녹취·메일·아이디어가 들어오면 먼저 정리 여부를 판단한다.

### Inbox 단계에서는
1. 원문 의미를 보존
2. 핵심 아이디어 1~3줄 요약
3. 기존 Issue/기능과 중복 검색
4. Type / Priority / Area 제안
5. 실행할 가치가 있으면 Planned 또는 Todo로 이동
6. 보류면 Hold, 불필요하면 Cancelled

사용자에게 원문을 다시 정리해서 보내달라고 요구하지 않는 것을 원칙으로 한다.

## 9. 상태 정의
- **Inbox**: 아직 분류/판단되지 않은 입력
- **Planned**: 하기로 결정했지만 실행 순서 미정
- **Todo**: 실행 준비 완료
- **In Progress**: 실제 작업 중
- **Review**: 사용자/개발/QA 검토 필요
- **Done**: 완료 기준 충족
- **Hold**: 외부조건/우선순위로 잠시 중단
- **Cancelled**: 진행하지 않기로 결정

## 10. Done 기준
가능한 경우 다음을 모두 충족한다.
- 요구사항 충족
- 결과물 GitHub 저장 또는 PR 연결
- 필요한 테스트/사실검증 완료
- 후속 작업이 있으면 별도 Issue 생성
- Project 상태 Done
- 전체 프로젝트 상태에 영향이 있으면 `PROJECT_STATE.md` 갱신

## 11. AI 인수인계 규칙
에이전트가 작업을 중단하거나 다른 에이전트로 넘길 때 Issue에 다음을 남긴다.
- 완료한 것
- 아직 안 한 것
- 다음 한 단계
- 관련 파일/브랜치/PR
- 막힌 이유가 있으면 원인

## 12. Project 생성 체크리스트
GitHub UI에서 최초 1회 설정한다.

- [ ] Repository의 Projects 또는 사용자 Projects에서 `Geogotjigeum AI Collaboration` 생성
- [ ] Repository `cozzyy/geogotjigeum` 연결
- [ ] Status 옵션 구성
- [ ] Type 필드 구성
- [ ] Priority 필드 구성
- [ ] Agent/Owner 필드 구성
- [ ] Area 필드 구성
- [ ] Language 필드 구성
- [ ] Source 필드 구성
- [ ] Target date 필드 구성
- [ ] Last reviewed 필드 구성
- [ ] Master Board / This Week / Content / Development / AI Work Queue / Inbox View 생성
- [ ] 새 Issue 자동추가 Workflow 설정

## 13. 운영 원칙
GitHub Projects는 '상태 DB', Git Repository는 '결과물과 기억', 실제 서비스 DB는 '서비스 데이터'를 담당한다. 서로의 역할을 섞지 않는다.
