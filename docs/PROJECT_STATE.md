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

### 문서 인덱스
- `docs/INDEX.md`

## 3. 현재 확인된 구조적 상태
- 문서 저장소 구조는 이미 `content / product / qa / seo`로 분리되어 있다.
- 현재 GitHub 저장소에는 위 문서들과 README가 중심이며, 운영 웹사이트의 전체 애플리케이션 소스코드는 아직 이 저장소에서 확인되지 않는다.
- GitHub Issue 기반 작업관리는 아직 시작 전 상태다.
- GitHub Projects 보드는 별도로 생성/설정해야 한다.
- AI 공동작업을 위한 `AGENTS.md`, `CLAUDE.md`, 프로젝트 상태/의사결정/관리 규칙을 v1에서 추가한다.

## 4. 진행 중인 시스템 구축
### AI 공동개발 시스템 v1
목표:
- ChatGPT, Claude, Manus, 외부 개발자가 동일한 프로젝트 기억을 공유
- 새로운 채팅에서도 GitHub만 읽으면 업무를 이어받을 수 있게 함
- 아이디어 → Issue → 개발/콘텐츠 → Review → Done 흐름을 표준화
- 완료/미완료/보류 상태를 GitHub에서 추적

## 5. 우선순위 높은 다음 작업
1. GitHub Projects 보드 생성 및 필드 설정
2. 기존 문서 6종을 실제 실행 업무와 연결해 Issue로 전환/분류
3. 운영 사이트 소스코드가 별도 저장소에 있다면 이 저장소와의 관계 결정
4. 아이디어·녹취·메일을 받을 `Inbox` 흐름 실제 운영 시작
5. 주간 상태보고 자동화 설계
6. AI가 작업 종료 시 `PROJECT_STATE.md`를 갱신하는 습관 정착

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

세부 필드 정의는 `docs/PROJECT_MANAGEMENT.md` 참조.

## 7. 신규 에이전트 인수인계 문구
새로운 AI 세션에서는 아래와 같이 시작하면 된다.

> `cozzyy/geogotjigeum` 저장소를 이 프로젝트의 Single Source of Truth로 사용해. 먼저 `AGENTS.md`, `docs/PROJECT_STATE.md`, `docs/ROADMAP.md`와 열린 Issues를 읽고, 현재 상태를 파악한 뒤 작업을 이어가. 이미 완료된 일을 중복으로 하지 말고, 중요한 결과와 상태 변경은 다시 GitHub에 남겨.

## 8. 상태 갱신 원칙
이 문서는 모든 세부 작업을 적는 로그가 아니다. 다음 경우에만 갱신한다.
- 새로운 핵심 기능이 완료됨
- 중요한 콘텐츠 묶음이 공개/완료됨
- 기술 구조가 변경됨
- 우선순위가 크게 변경됨
- 중요한 외부 의존성 또는 위험이 생김
- 프로젝트 운영 방식이 변경됨
