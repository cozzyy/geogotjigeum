# PROJECT_STATE — 그곳지금

> 이 문서는 새로운 ChatGPT/Claude/Manus 세션과 외부 개발자가 프로젝트의 현재 상태를 빠르게 파악하기 위한 **살아있는 상태 문서**다. 프로젝트 전체 상태가 바뀌면 갱신한다.

마지막 갱신: 2026-08-26

## 1. 프로젝트 개요
- 서비스명: 그곳지금 (geogotjigeum)
- 목적: K-콘텐츠의 촬영지·장소·이야기를 여행 경험과 연결하는 글로벌 콘텐츠/여행 서비스
- 운영 원칙: GitHub를 프로젝트 Single Source of Truth로 사용
- 기본 역할: ChatGPT = 기획자/의사결정 지원, Claude = 개발자/기술검토자, Manus = 제작/리서치 보조
- 주요 지원 언어: 한국어 / 영어 / 일본어 / 번체 중국어(`zh-Hant`, URL `/zh/`)

## 2. 현재 이 저장소에 존재하는 자산

### 콘텐츠
- `docs/content/pachinko-content-plan-v1.md`

### 제품/기능
- `docs/product/quiz-expansion-plan-v1.1.md`
- `docs/product/representative-approval-automation-blueprint-v1.md`

### QA
- `docs/qa/language-toggle-audit-2026-08-25.md`
- `docs/qa/live-site-baseline-audit-2026-08-26.md`
- `docs/qa/i18n-language-switcher-remediation-plan-v2.md`

### SEO/성장
- `docs/seo/global-seo-ui-content-development-plan-v1.md`
- `docs/seo/naver-seo-development-request-2026-08-05.md`
- `docs/seo/seo-growth-adsense-plan-v1.0.md`

### AI 공동개발 운영
- `AGENTS.md`
- `CLAUDE.md`
- `docs/CHATGPT_CLAUDE_HANDOFF.md`
- `docs/PROJECT_MANAGEMENT.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `inbox/README.md`
- `.github/ISSUE_TEMPLATE/task.yml`
- `.github/ISSUE_TEMPLATE/inbox.yml`
- `.github/ISSUE_TEMPLATE/handoff.yml`
- `.github/pull_request_template.md`

### 공용 스킬
- `skills/geogotjigeum-content/SKILL.md` — 신규 작품 콘텐츠 제작 기준
- `skills/geogotjigeum-content/QUALITY_CHECKLIST.md` — 완료 전 품질 점검
- `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md` — 신규 작품 기획 표준 템플릿

### 문서 인덱스
- `docs/INDEX.md`

## 3. 현재 확인된 구조적 상태
- 문서 저장소 구조는 `content / product / qa / seo`로 분리되어 있다.
- AI 공동개발 시스템과 `ChatGPT 기획 → Claude 기술검토 → 사용자 승인 → Claude 개발 → PR` 인수인계 규칙이 `main`에 반영돼 있다.
- 신규 주요 작품 콘텐츠에는 `skills/geogotjigeum-content/`의 공용 스킬을 사용하도록 AGENTS/CLAUDE 규칙에 연결했다.
- 콘텐츠 스킬의 기본 규모 목표는 등장인물 100명 이상, 장소 100개 이상, 풍부한 해시태그/SEO, 충분한 본문, 숨은 이야기, 여행 확장이다.
- 단, 목표 수치를 채우기 위한 허위 인물·허위 촬영지·중복 데이터 생성은 금지하며 검증 가능한 최대치와 부족 사유를 기록한다.
- GitHub Issue 기반 작업관리를 시작했으며, 초기 운영 Issue와 라이브 오류/개선 Issue가 열려 있다.
- GitHub Projects 보드는 아직 생성/설정 전이며 Issue #2에서 추적한다.
- 운영 사이트 소스는 `site/` 하위에 반입되어 있다. 작품·장소·지역 정적 생성기와 지도 SPA가 공존한다. 배포 환경의 최종 매핑은 Issue #4에서 확정한다.
- 다국어는 번체 중국어(`zh-Hant`)를 사용한다. 앱·작품·장소·지역 페이지의 언어 전환/폴백 통합은 Issue #10에서 관리한다.
- 자동 개발/자동 승인 흐름은 아직 도입하지 않는다. 먼저 수동 Handoff를 2~3건 검증한 뒤 Issue #8의 자동화로 확장한다.

## 4. ChatGPT → Claude 표준 개발 흐름

`사용자 요구 → ChatGPT 기획 → GitHub 기획문서 → Handoff Issue → Claude Dev Review → Needs Decision(필요 시) → 사용자 승인 → Claude 개발 → PR Review → Done`

핵심 원칙:
- ChatGPT가 기획안을 GitHub에 저장하고 Handoff Issue를 만든다.
- 신규 작품 콘텐츠라면 먼저 `skills/geogotjigeum-content/SKILL.md`를 적용한다.
- Claude는 승인 전에 코드부터 수정하지 않고 기술검토를 먼저 한다.
- Claude는 `READY FOR APPROVAL / NEEDS DECISION / BLOCKED` 중 하나로 검토결과를 남긴다.
- 사용자의 `개발 승인` 또는 `APPROVED` 기록 후 실제 개발을 시작한다.
- 상세 규칙은 `docs/CHATGPT_CLAUDE_HANDOFF.md` 참조.

## 5. 진행 중인 시스템 구축
완료/반영된 기반:
- 공통 AI 규칙 `AGENTS.md`
- Claude 시작점 `CLAUDE.md`
- 현재 상태 / 로드맵 / 의사결정 로그
- GitHub Projects DB 필드 설계
- 일반 Issue / Inbox Issue / Handoff Issue Form
- PR 인수인계 템플릿
- Inbox 운영 규칙
- ChatGPT → Claude 수동 승인 Handoff 규칙
- 신규 작품 공용 콘텐츠 제작 스킬 v1.0
- 라이브 사이트 기준선 점검 및 기록

남음:
- GitHub Project 실제 생성 및 v1.1 Status/View 설정 (#2)
- 기존 문서 실행 상태 확정 및 후속 Issue 연결 (#3)
- 운영 사이트 소스코드 Repository·배포 전략 결정 (#4)
- Inbox 실제 입력 파일럿 (#5)
- 홈 화면 사용자 노출 스크립트 오류 수정 (#7)
- 대표 승인 기반 자동화는 수동 Handoff 검증 후 착수 (#8)
- 다국어 언어 전환·번역 준비상태 통합 (#10)
- 콘텐츠 스킬을 실제 신규 작품 기획에 적용해 1차 검증
- Claude GitHub 연동/자동 호출은 수동 프로토콜 검증 후 설정

## 6. 우선순위 높은 다음 작업
1. `geogotjigeum-content` 스킬로 신규 작품 1건을 실제 기획해 품질 기준 검증
2. Handoff 방식으로 기획안을 Claude에게 넘겨 수동 파일럿
3. #4 운영 사이트 소스코드와 배포 환경의 canonical 위치 확정
4. #7 홈·영어 홈 스크립트 오류 원인 파악 및 수정
5. #10 다국어 언어 전환·번역 준비상태 통합 설계 구현
6. #2 GitHub Projects 보드 생성 및 v1.1 필드/상태 설정
7. #3 기존 문서 실행 상태 확정 및 후속 Issue 분리
8. #5 Inbox 파일럿
9. #8 자동화는 선행 조건 충족 후 별도 착수

## 7. Project에서 추적할 핵심 정보
- Status
- Type
- Priority
- Agent/Owner
- Area
- Content/Work
- Language
- Source
- Target date
- Last reviewed
- Result/PR

세부 필드 정의는 `docs/PROJECT_MANAGEMENT.md` 참조.

## 8. 신규 에이전트 인수인계 문구

> `cozzyy/geogotjigeum` 저장소를 이 프로젝트의 Single Source of Truth로 사용해. 먼저 `AGENTS.md`, `CLAUDE.md`, `docs/PROJECT_STATE.md`, `docs/CHATGPT_CLAUDE_HANDOFF.md`, `docs/ROADMAP.md`와 열린 Issues를 읽고 현재 상태를 파악해. 신규 작품 콘텐츠 작업이면 `skills/geogotjigeum-content/SKILL.md`와 품질 체크리스트를 반드시 적용해. 이미 완료된 일을 중복하지 말고, 기획에서 개발로 넘어가는 작업은 승인 Gate를 지켜. 중요한 결과와 상태 변경은 다시 GitHub에 남겨.

## 9. 상태 갱신 원칙
이 문서는 모든 세부 작업을 적는 로그가 아니다. 다음 경우에만 갱신한다.
- 새로운 핵심 기능이 완료됨
- 중요한 콘텐츠 묶음이 공개/완료됨
- 기술 구조가 변경됨
- 우선순위가 크게 변경됨
- 중요한 외부 의존성 또는 위험이 생김
- 프로젝트 운영 방식이 변경됨
