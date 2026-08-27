# PROJECT_STATE — 그곳지금

> 이 문서는 새로운 ChatGPT/Claude/Manus 세션과 외부 개발자가 프로젝트의 현재 상태를 빠르게 파악하기 위한 **살아있는 상태 문서**다. 프로젝트 전체 상태가 바뀌면 갱신한다.

마지막 갱신: 2026-08-27

## 1. 프로젝트 개요
- 서비스명: 그곳지금 (geogotjigeum)
- 목적: K-콘텐츠의 촬영지·장소·이야기를 여행 경험과 연결하는 글로벌 콘텐츠/여행 서비스
- 운영 원칙: GitHub를 프로젝트 Single Source of Truth로 사용
- 기본 역할: ChatGPT = 기획자/PM/저위험 GitHub 수정, Claude = 개발자, Manus = 제작/리서치 보조
- 주요 지원 언어: 한국어 / 영어 / 일본어 / 번체 중국어(`zh-Hant`, URL `/zh/`)

## 2. 현재 이 저장소에 존재하는 주요 자산

### 제품/기능
- `docs/product/quiz-expansion-plan-v1.1.md`
- `docs/product/pokssak-quiz-result-location-cards-pilot-v1.md`
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
- `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`
- `docs/CLAUDE_SECONDARY_START_PROMPT.md`
- `docs/DEPLOYMENT_HANDOFF.md`

### 공용 스킬
- `skills/geogotjigeum-content/SKILL.md`
- `skills/geogotjigeum-content/QUALITY_CHECKLIST.md`
- `skills/geogotjigeum-content/RESEARCH_PLAYBOOK.md`
- `skills/geogotjigeum-content/MOBILE_UI_GUIDE.md`
- `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md`

## 3. 현재 확인된 구조적 상태
- 운영 사이트 소스는 `site/` 하위에 있다.
- 작품·장소·지역 정적 생성기와 지도 SPA가 공존한다.
- 다국어 언어 전환/번역 준비상태 통합은 Issue #10 / PR #16으로 구현되어 `main`에 병합 완료됐다.
- 신규 주요 작품 콘텐츠에는 `skills/geogotjigeum-content/` 공용 스킬을 사용한다.
- 콘텐츠 스킬의 규모 목표는 등장인물 100명 이상, 장소 100개 이상, 풍부한 해시태그/SEO, 충분한 본문, 숨은 이야기, 여행 확장이다. 단, 허위/중복 데이터 생성은 금지한다.
- 폭싹 속았수다 퀴즈 결과 장소 카드 파일럿 Issue #17은 로컬 구현/테스트 및 운영 배포까지 완료됐다. 원격 GitHub에는 해당 개발 branch/PR 소스 동기화가 아직 필요하다.
- 협업 파일럿을 통해 GitHub 기반 ChatGPT↔Claude 인수인계가 검증됐으며, 2026-08-27부터 **저위험 작업은 Fast Lane**으로 전환했다.

## 4. ChatGPT → Claude 개발 흐름

### Fast Lane — 기본값
`사용자 요구 → ChatGPT 범위확정 → Issue → Claude 개발/테스트 → PR → ChatGPT 검토 → Done`

적용 대상:
- 소규모 기능
- 버그 수정
- UI 보정
- 콘텐츠/QA
- 내부 리팩터링
- 요구사항과 완료기준이 명확하고 롤백이 쉬운 작업

사용자에게 중간 승인을 매번 요청하지 않는다. Claude가 진행 중 사용자 결정이 필요한 문제를 발견하면 그때만 `NEEDS DECISION`으로 멈춘다.

### Approval Lane — 중요한 작업
다음은 기존 승인 Gate를 유지한다.
- 큰 리디자인/핵심 UX 변경
- 유료 서비스/API 도입
- 개인정보/회원가입/결제/인증/권한
- 대규모 데이터 모델/URL/SEO/배포 구조 변경
- 대량 삭제/마이그레이션/되돌리기 어려운 변경

상세 규칙은 `docs/CHATGPT_CLAUDE_HANDOFF.md` 참조.

## 5. 완료/진행 중 기반
완료/반영:
- 공통 AI 규칙 `AGENTS.md`
- Claude 시작점 `CLAUDE.md`
- Fast Lane/Approval Lane 개발 규칙
- 현재 상태 / 로드맵 / 의사결정 로그
- 일반 Issue / Inbox Issue / Handoff Issue Form
- PR 인수인계 템플릿
- 신규 작품 공용 콘텐츠 제작 스킬 v1.1
- 라이브 사이트 기준선 점검
- 다국어 통합 Issue #10 / PR #16
- 3자 협업 파일럿 Issue #17

남음:
- #17 개발 소스를 원격 GitHub branch/PR로 동기화
- GitHub Project 실제 생성 및 v1.1 Status/View 설정 (#2)
- 기존 문서 실행 상태 확정 및 후속 Issue 연결 (#3)
- 운영 사이트 소스코드/배포 canonical 위치 확정 (#4)
- Inbox 실제 입력 파일럿 (#5)
- 홈 화면 사용자 노출 스크립트 오류 수정 (#7)
- 대표 승인 기반 자동화는 별도 검토 (#8)
- 콘텐츠 스킬을 신규 작품에 본격 적용
- 디자인 시스템/Figma 기반 UI 개선 트랙 구축

## 6. 우선순위 높은 다음 작업
1. 시급한 UI/디자인 개선을 위한 Figma 디자인 트랙 구축
2. #17 원격 소스 동기화 및 기록 정리
3. #7 홈 화면 스크립트 오류 수정
4. 신규 작품 콘텐츠 1건을 스킬 v1.1로 제작
5. #4 소스/배포 canonical 위치 정리
6. GitHub Projects 보드 설정 (#2)
7. Inbox 파일럿 (#5)

## 7. 신규 에이전트 인수인계 문구

> `cozzyy/geogotjigeum` 저장소를 이 프로젝트의 Single Source of Truth로 사용해. 먼저 `AGENTS.md`, `CLAUDE.md`, `docs/PROJECT_STATE.md`, `docs/CHATGPT_CLAUDE_HANDOFF.md`, `docs/ROADMAP.md`와 열린 Issues를 읽고 현재 상태를 파악해. 저위험·명확한 작업은 Fast Lane으로 바로 개발/테스트/PR까지 진행하고, 사용자 결정이 필요한 큰 변경만 Approval Lane으로 올려. 신규 작품 콘텐츠 작업이면 `skills/geogotjigeum-content/`를 적용해. 중요한 결과와 상태 변경은 다시 GitHub에 남겨.

## 8. 상태 갱신 원칙
이 문서는 모든 세부 작업을 적는 로그가 아니다. 다음 경우에만 갱신한다.
- 새로운 핵심 기능이 완료됨
- 중요한 콘텐츠 묶음이 공개/완료됨
- 기술 구조가 변경됨
- 우선순위가 크게 변경됨
- 중요한 외부 의존성 또는 위험이 생김
- 프로젝트 운영 방식이 변경됨
