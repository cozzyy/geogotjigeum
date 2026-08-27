# AGENTS.md — 그곳지금 공동작업 규칙

이 저장소는 그곳지금(geogotjigeum) 프로젝트의 **Single Source of Truth**다. ChatGPT, Claude, Manus, 사람 개발자 모두 아래 규칙을 따른다.

## 1. 작업 시작 전 반드시 읽기
1. `AGENTS.md`
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. 관련 문서 및 열린 GitHub Issue
5. 코드 작업이라면 관련 PR/최근 변경사항

Claude 새 계정/새 세션은 추가로 `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`를 읽고, 필요 시 `docs/CLAUDE_SECONDARY_START_PROMPT.md`를 시작 프롬프트로 사용한다.
개발·테스트 완료 후 배포 인수인계가 필요한 작업은 `docs/DEPLOYMENT_HANDOFF.md`를 따른다.

대화 기억만으로 현재 상태를 추정하지 않는다.

## 2. 작업 단위
- 중요한 신규 작업은 GitHub Issue 단위로 관리한다.
- Issue 없이 큰 기능을 바로 개발하지 않는다.
- 기존 작업과 중복되는지 먼저 검색한다.
- 여러 Claude를 병렬로 사용할 때는 **한 Issue = 한 실행 Claude**, **한 작업 = 전용 branch**를 기본으로 한다.
- 다른 Claude가 진행 중인 Issue/branch를 임의로 덮어쓰지 않는다.

## 3. 기본 상태
일반 작업: `Inbox → Planned → Todo → In Progress → Review → Done`

기획에서 개발로 넘기는 작업은 위험도에 따라 나눈다.
- Fast Lane: `Planning → In Development → PR Review → Done`
- Approval Lane: `Planning → Dev Review → Needs Decision(필요 시) → Approved → In Development → PR Review → Done`

예외 상태: `Hold`, `Cancelled`, `Blocked`

## 4. 작업 유형
- `content`: 작품·장소·퀴즈·스토리 콘텐츠
- `product`: 기능·UX·운영 기획
- `design`: UI/UX, 디자인 시스템, 화면 시안
- `development`: 코드·인프라·배포
- `qa`: 기능·언어·데이터 품질 점검
- `seo`: 검색·메타데이터·유입 개선
- `research`: 경쟁사·시장·콘텐츠 조사
- `bug`: 오류 수정
- `ops`: 운영·자동화·관리

## 5. ChatGPT → Claude 기본 협업 규칙
- ChatGPT는 기획자/PM 역할을 맡아 요구사항과 완료기준을 정리한다.
- 개발이 필요한 기획은 가능한 경우 Handoff Issue로 넘긴다.
- **저위험·명확한 작업은 Fast Lane이 기본값**이다. 별도 사용자 승인 왕복 없이 Claude가 구현·테스트·PR까지 진행할 수 있다.
- Claude는 Fast Lane에서도 개발 전 최신 `main`, 예상 변경 파일, 병렬 작업 충돌을 짧게 확인한다.
- 사용자 결정이 필요한 문제가 생기면 그때 `NEEDS DECISION`으로 멈춘다.
- 큰 리디자인, 유료 서비스, 개인정보/결제/인증, 대규모 데이터·URL·SEO·배포 구조 변경, 파괴적 변경은 Approval Lane으로 올린다.
- Approval Lane에서는 `개발 승인` 또는 `APPROVED` 전 개발하지 않는다.
- 세부 규칙은 `docs/CHATGPT_CLAUDE_HANDOFF.md`를 따른다.

## 6. Git 작업 원칙
- 큰 변경은 `Issue → Branch → 작업 → Test → PR → Review → Merge → Issue Done` 순서를 우선한다.
- 운영에 영향이 큰 변경은 가능하면 `main`에 직접 커밋하지 않는다.
- 기존 파일을 대량 삭제하거나 구조를 크게 바꾸기 전에는 사용자 승인을 받는다.
- Secret/API Key/개인정보를 저장소에 커밋하지 않는다.
- 병렬 Claude 작업 시 같은 핵심 파일을 동시에 수정할 가능성이 높으면 먼저 사용자/ChatGPT에게 알린다.
- 저위험 문서/설정/소규모 수정은 ChatGPT가 직접 처리할 수 있다.

## 7. 문서 위치
- 현재 상태: `docs/PROJECT_STATE.md`
- 로드맵: `docs/ROADMAP.md`
- 주요 의사결정: `docs/DECISIONS.md`
- 프로젝트/Issue 관리 규칙: `docs/PROJECT_MANAGEMENT.md`
- ChatGPT→Claude 인수인계: `docs/CHATGPT_CLAUDE_HANDOFF.md`
- Claude 계정/세션 복원: `docs/CLAUDE_DEVELOPER_BOOTSTRAP.md`
- 2차 Claude 시작 프롬프트: `docs/CLAUDE_SECONDARY_START_PROMPT.md`
- 배포 ZIP 인수인계: `docs/DEPLOYMENT_HANDOFF.md`
- 디자인 시스템/화면 사양: `docs/design/`
- 작품 콘텐츠 기획: `docs/content/`
- 기능 기획: `docs/product/`
- QA: `docs/qa/`
- SEO: `docs/seo/`
- 공용 스킬: `skills/`
- 아직 정리되지 않은 입력: `inbox/`

## 8. 상태 갱신 규칙
작업 완료 시 최소한 다음을 확인한다.
- 관련 Issue 상태 갱신
- 결과물 경로 또는 PR 연결
- 배포 대기 작업이면 ZIP/로컬 인수인계 정보 기록
- 프로젝트 전체 상태에 영향을 주면 `docs/PROJECT_STATE.md` 갱신
- 중요한 방향 변경이면 `docs/DECISIONS.md` 기록

## 9. 배포 인수인계 원칙
- 개발 소스 기준본은 GitHub다.
- 배포 ZIP은 전달/보관용이며 GitHub 상태를 대체하지 않는다.
- 개발·테스트 완료 후 필요하면 배포 ZIP을 생성하고 `docs/DEPLOYMENT_HANDOFF.md`를 따른다.
- 사용자가 실제 운영 배포하기 전에는 `DEPLOYED`로 표시하지 않는다.

## 10. 그곳지금 콘텐츠 원칙
- K-콘텐츠의 실제 장소와 여행 경험을 연결한다.
- 일반 사용자 글은 설명서보다 친구가 알려주는 듯한 자연스러운 20~30대 톤을 우선한다.
- 과도한 정보 나열을 피하고, 작품 속 장면·장소·숨은 이야기·의외성 있는 정보의 연결을 중시한다.
- 확인 가능한 촬영지·최신 정보·SEO 관련 사실은 출처와 확인일을 남긴다.
- 주요 지원 언어는 KR / EN / JP / ZH이며 직역보다 현지화를 우선한다.

### 신규 작품 콘텐츠 작업 시 필수 스킬
신규 영화/드라마/예능/애니메이션/OTT 작품 콘텐츠를 기획하거나 기존 작품을 대규모 확장할 때는 **반드시** 아래 파일을 먼저 읽고 적용한다.

1. `skills/geogotjigeum-content/SKILL.md`
2. `skills/geogotjigeum-content/QUALITY_CHECKLIST.md`
3. `skills/geogotjigeum-content/RESEARCH_PLAYBOOK.md`
4. `skills/geogotjigeum-content/MOBILE_UI_GUIDE.md`
5. 신규 기획서 작성 시 `skills/geogotjigeum-content/CONTENT_PLAN_TEMPLATE.md`

등장인물 100명 이상, 장소 100개 이상, 풍부한 해시태그/SEO, 충분한 본문, 모바일 퍼스트, 경쟁/유튜브 조사, 반복 형식 탈피, 20문제 퀴즈 메뉴, 여행 확장 등 반복 기준은 위 스킬을 기준본으로 삼는다. 단, 숫자를 채우기 위한 허위 데이터 생성은 금지한다.

### 콘텐츠 스킬 지속개선
작업 중 다른 작품에도 반복 적용될 가능성이 높은 규칙·실수·QA 항목을 발견하면 `skills/geogotjigeum-content/`를 살아있는 기준으로 업데이트한다.
- 기존 방향을 강화하는 추가 규칙/체크리스트는 에이전트가 자발적으로 갱신할 수 있다.
- 핵심 목표치 축소, 언어 정책, 대규모 데이터 구조, 승인 Gate 등 큰 방향 변경은 사용자에게 먼저 알린다.
- 스킬 변경 시 `CHANGELOG.md`에 이유와 변경내용을 기록한다.

## 11. AI별 기본 역할
역할은 고정하지 않되 기본적으로 다음을 우선한다.
- ChatGPT: 기획, 조사, 콘텐츠, SEO/UX, 요구사항 정의, 프로젝트 정리, 사용자 의사결정 지원, 저위험 GitHub 수정
- Claude: 저장소 분석, 개발, 리팩터링, 테스트, 디버깅
- Figma: 승인 전/후 UI 시안과 디자인 시스템 원본(편집권한이 있을 때)
- Manus: 웹 제작, UI 구현, 리서치, 반복형 웹 작업

핵심은 역할 구분이 아니라 **모든 결과가 GitHub에 다시 남는 것**이다.

## 12. 완료 정의
`Done`은 단순히 "작성함"이 아니다. 가능한 경우 아래를 충족해야 한다.
- 요구사항 충족
- 결과물 저장
- 필요한 검증/테스트 완료
- 관련 Issue/상태 업데이트
- 다음 에이전트가 추가 설명 없이 이어받을 수 있음
