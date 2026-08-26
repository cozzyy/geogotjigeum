# PROJECT_STATE — 그곳지금

> 이 문서는 새로운 ChatGPT/Claude/Manus 세션과 외부 개발자가 프로젝트의 현재 상태를 빠르게 파악하기 위한 **살아있는 상태 문서**다. 프로젝트 전체 상태가 바뀌면 갱신한다.

마지막 갱신: 2026-08-26

## 1. 프로젝트 개요
- 서비스명: 그곳지금 (geogotjigeum)
- 목적: K-콘텐츠의 촬영지·장소·이야기를 여행 경험과 연결하는 글로벌 콘텐츠/여행 서비스
- 운영 원칙: GitHub를 프로젝트 Single Source of Truth로 사용
- 주요 지원 언어: 한국어 / 영어 / 일본어 / 중국어

## 2. 현재 이 저장소에 존재하는 자산

### 콘텐츠
- `docs/content/pachinko-content-plan-v1.md`

### 제품/기능
- `docs/product/quiz-expansion-plan-v1.1.md`

### QA
- `docs/qa/language-toggle-audit-2026-08-25.md`

### SEO/성장
- `docs/seo/global-seo-ui-content-development-plan-v1.md`
- `docs/seo/naver-seo-development-request-2026-08-05.md`
- `docs/seo/seo-growth-adsense-plan-v1.0.md`

### AI 공동개발 운영
- `AGENTS.md`
- `CLAUDE.md`
- `docs/PROJECT_MANAGEMENT.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `inbox/README.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/pull_request_template.md`

### 문서 인덱스
- `docs/INDEX.md`

## 3. 현재 확인된 구조적 상태
- 문서 저장소 구조는 `content / product / qa / seo`로 분리되어 있다.
- AI 공동개발 시스템 v1의 운영 문서와 Issue/PR 템플릿은 `main`에 반영 완료됐다.
- GitHub Issue 기반 작업관리를 시작했으며 초기 운영 Issue #2~#5가 등록돼 있다.
- GitHub Projects 보드는 아직 생성/설정 전이며 Issue #2에서 추적한다.
- 현재 GitHub 저장소에는 문서가 중심이며, 운영 웹사이트의 전체 애플리케이션 소스코드는 아직 이 저장소에서 확인되지 않는다. Issue #4에서 저장소 전략을 결정한다.

## 4. 진행 중인 시스템 구축
### AI 공동개발 시스템 v1
완료:
- 공통 AI 규칙 `AGENTS.md`
- Claude 시작점 `CLAUDE.md`
- 현재 상태 / 로드맵 / 의사결정 로그
- GitHub Projects DB 필드 설계
- Issue Form 2종과 PR 인수인계 템플릿
- Inbox 운영 규칙
- 초기 운영 Issues 등록

남음:
- GitHub Project 실제 생성 및 필드/View 설정 (#2)
- 기존 문서 실행 상태 분류 및 후속 Issue 연결 (#3)
- 운영 사이트 소스코드 Repository 전략 결정 (#4)
- Inbox 실제 입력 파일럿 (#5)

## 5. 우선순위 높은 다음 작업
1. #2 GitHub Projects 보드 생성 및 필드 설정
2. #4 운영 사이트 소스코드 저장 위치 확인 및 Repository 관계 결정
3. #3 기존 문서 6종의 실제 실행 상태 판정
4. #5 아이디어·녹취·메일 Inbox 흐름 실제 파일럿
5. 주간 상태보고 자동화 설계

## 6. Project에서 추적할 핵심 정보
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

## 7. 현재 열린 초기 Issues
- #2 `[OPS] GitHub Project - AI 공동개발 보드 최초 설정`
- #3 `[OPS] 기존 문서 - 실행 상태 분류 및 Issue 연결`
- #4 `[DEV] 운영 사이트 - 소스코드 저장 위치 확인 및 Repository 전략 결정`
- #5 `[OPS] Inbox - 아이디어·녹취·메일 입력 흐름 파일럿`

## 8. 신규 에이전트 인수인계 문구
새로운 AI 세션에서는 아래와 같이 시작하면 된다.

> `cozzyy/geogotjigeum` 저장소를 이 프로젝트의 Single Source of Truth로 사용해. 먼저 `AGENTS.md`, `docs/PROJECT_STATE.md`, `docs/ROADMAP.md`와 열린 Issues를 읽고, 현재 상태를 파악한 뒤 작업을 이어가. 이미 완료된 일을 중복으로 하지 말고, 중요한 결과와 상태 변경은 다시 GitHub에 남겨.

## 9. 상태 갱신 원칙
이 문서는 모든 세부 작업을 적는 로그가 아니다. 다음 경우에만 갱신한다.
- 새로운 핵심 기능이 완료됨
- 중요한 콘텐츠 묶음이 공개/완료됨
- 기술 구조가 변경됨
- 우선순위가 크게 변경됨
- 중요한 외부 의존성 또는 위험이 생김
- 프로젝트 운영 방식이 변경됨
