# WORK_HANDOFF — 그곳지금

마지막 갱신: 2026-08-26

## 목적
이 문서는 현재 Chat 대화에서 진행한 내용을 새 ChatGPT Work 채팅이 바로 이어받도록 하기 위한 인수인계 문서다.

## 1. 핵심 원칙
- GitHub `cozzyy/geogotjigeum`을 프로젝트의 Single Source of Truth로 사용한다.
- 새 Work 채팅은 대화 기억보다 GitHub의 최신 문서와 열린 Issues를 우선한다.
- 이미 완료된 작업을 중복 수행하지 않는다.
- 중요한 결과와 상태 변경은 다시 GitHub에 남긴다.

## 2. Work 시작 시 반드시 읽을 파일
1. `AGENTS.md`
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. `docs/PROJECT_MANAGEMENT.md`
5. `docs/DECISIONS.md`
6. `docs/INDEX.md`
7. `docs/qa/live-site-baseline-audit-2026-08-26.md`
8. 열린 GitHub Issues

Claude를 사용하는 경우 `CLAUDE.md`도 함께 확인한다.

## 3. 현재까지 완료된 핵심 작업
- AI 공동개발 시스템 v1을 구축하고 `main`에 병합함
- `AGENTS.md`, `CLAUDE.md` 추가
- `PROJECT_STATE`, `ROADMAP`, `DECISIONS`, `PROJECT_MANAGEMENT` 운영문서 추가
- Inbox 운영 규칙 추가
- GitHub Issue Form 2종 추가
- PR 인수인계 템플릿 추가
- 라이브 사이트 표본 점검·기존 문서 잠정 상태 분류를 `docs/qa/live-site-baseline-audit-2026-08-26.md`에 기록
- 사용자 노출 스크립트 오류를 Issue #7로 등록

## 4. 현재 열린 주요 Issues
- #2 `[OPS] GitHub Project - AI 공동개발 보드 최초 설정`
- #3 `[OPS] 기존 문서 - 실행 상태 분류 및 Issue 연결`
- #4 `[DEV] 운영 사이트 - 소스코드 저장 위치 확인 및 Repository 전략 결정`
- #5 `[OPS] Inbox - 아이디어·녹취·메일 입력 흐름 파일럿`
- #7 `[BUG] 홈 화면 - 사용자에게 노출되는 스크립트 오류 점검`

## 5. 다음 우선순위
1. Issue #4: 실제 운영 사이트 소스코드와 배포 환경의 canonical 위치 확인
2. Issue #7: 홈·영어 홈의 사용자 노출 스크립트 오류 수정
3. Issue #2: GitHub Projects 보드 실제 생성 및 필드 설정
4. Issue #3: 코드 기준으로 기존 문서의 구현상태를 확정하고 후속 Issue 분리
5. Issue #5: 실제 메모/녹취/메일 1건으로 Inbox 파일럿 실행
6. 이후 주간 상태보고 자동화 설계

## 6. 새 Work 채팅에서 사용할 첫 프롬프트
아래 문장을 첫 메시지로 사용한다.

> 이 Work 채팅은 `그곳지금` 프로젝트의 후속 작업이다. GitHub `cozzyy/geogotjigeum`을 Single Source of Truth로 사용해라. 먼저 `AGENTS.md`, `docs/WORK_HANDOFF.md`, `docs/PROJECT_STATE.md`, `docs/ROADMAP.md`, `docs/PROJECT_MANAGEMENT.md`, `docs/DECISIONS.md`, `docs/qa/live-site-baseline-audit-2026-08-26.md`와 열린 Issues를 읽고 현재 상태를 파악해라. 이미 완료된 일을 중복하지 말고, 현재 열린 Issue와 실제 저장소 상태를 기준으로 다음 우선순위를 제안한 뒤 작업을 이어가라. 중요한 결과, 의사결정, 완료/보류 상태는 반드시 GitHub에 다시 남겨라.

## 7. Work의 역할
Work는 단순 답변보다 다음과 같은 장기·다단계 작업에 우선 사용한다.
- 프로젝트 현황 파악 및 보고
- 다수 문서 검토와 통합
- 시장/경쟁/SEO 조사
- 기획서·보고서·문서 산출물 생성
- 여러 연결 앱과 파일을 함께 사용하는 작업
- 반복/예약/조건 기반 관리 업무

코드 구현·디버깅·테스트가 중심인 작업은 필요에 따라 Codex 또는 Claude와 분담하되, 결과는 GitHub에 남긴다.

## 8. 인수인계 성공 기준
새 Work 채팅이 다음 질문에 GitHub 근거로 답할 수 있어야 한다.
- 지금 프로젝트가 어디까지 왔는가?
- 최근 완료된 일은 무엇인가?
- 현재 진행중/미착수 작업은 무엇인가?
- 다음 우선순위는 무엇인가?
- 어떤 문서나 코드가 기준본인가?
