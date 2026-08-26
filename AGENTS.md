# AGENTS.md — 그곳지금 공동작업 규칙

이 저장소는 그곳지금(geogotjigeum) 프로젝트의 **Single Source of Truth**다. ChatGPT, Claude, Manus, 사람 개발자 모두 아래 규칙을 따른다.

## 1. 작업 시작 전 반드시 읽기
1. `AGENTS.md`
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. 관련 문서 및 열린 GitHub Issue
5. 코드 작업이라면 관련 PR/최근 변경사항

대화 기억만으로 현재 상태를 추정하지 않는다.

## 2. 작업 단위
- 중요한 신규 작업은 GitHub Issue 단위로 관리한다.
- Issue 없이 큰 기능을 바로 개발하지 않는다.
- 기존 작업과 중복되는지 먼저 검색한다.
- 아이디어/메모/녹취/메일은 먼저 `Inbox` 성격으로 기록한 뒤 실행 가능한 Issue로 정리한다.

## 3. 기본 상태
`Inbox → Planned → Todo → In Progress → Review → Done`

예외 상태: `Hold`, `Cancelled`

## 4. 작업 유형
- `content`: 작품·장소·퀴즈·스토리 콘텐츠
- `product`: 기능·UX·운영 기획
- `development`: 코드·인프라·배포
- `qa`: 기능·언어·데이터 품질 점검
- `seo`: 검색·메타데이터·유입 개선
- `research`: 경쟁사·시장·콘텐츠 조사
- `bug`: 오류 수정
- `ops`: 운영·자동화·관리

## 5. Git 작업 원칙
- 큰 변경은 `Issue → Branch → 작업 → Test → PR → Review → Merge → Issue Done` 순서를 우선한다.
- 운영에 영향이 큰 변경은 가능하면 `main`에 직접 커밋하지 않는다.
- 기존 파일을 대량 삭제하거나 구조를 크게 바꾸기 전에는 사용자 승인을 받는다.
- Secret/API Key/개인정보를 저장소에 커밋하지 않는다.

## 6. 문서 위치
- 현재 상태: `docs/PROJECT_STATE.md`
- 로드맵: `docs/ROADMAP.md`
- 주요 의사결정: `docs/DECISIONS.md`
- 프로젝트/Issue 관리 규칙: `docs/PROJECT_MANAGEMENT.md`
- 작품 콘텐츠 기획: `docs/content/`
- 기능 기획: `docs/product/`
- QA: `docs/qa/`
- SEO: `docs/seo/`
- 아직 정리되지 않은 입력: `inbox/`

## 7. 상태 갱신 규칙
작업 완료 시 최소한 다음을 확인한다.
- 관련 Issue 상태 갱신
- 결과물 경로 또는 PR 연결
- 프로젝트 전체 상태에 영향을 주면 `docs/PROJECT_STATE.md` 갱신
- 중요한 방향 변경이면 `docs/DECISIONS.md` 기록

## 8. 그곳지금 콘텐츠 원칙
- K-콘텐츠의 실제 장소와 여행 경험을 연결한다.
- 일반 사용자 글은 설명서보다 친구가 알려주는 듯한 자연스러운 20~30대 톤을 우선한다.
- 과도한 정보 나열을 피하고, 작품 속 장면·장소·숨은 이야기·의외성 있는 정보의 연결을 중시한다.
- 확인 가능한 촬영지·최신 정보·SEO 관련 사실은 출처와 확인일을 남긴다.
- 주요 지원 언어는 KR / EN / JP / ZH이며 직역보다 현지화를 우선한다.

## 9. AI별 기본 역할
역할은 고정하지 않되 기본적으로 다음을 우선한다.
- ChatGPT: 기획, 조사, 콘텐츠, SEO/UX, 요구사항 정의, 프로젝트 정리
- Claude: 저장소 분석, 개발, 리팩터링, 테스트, 디버깅
- Manus: 웹 제작, UI 구현, 리서치, 반복형 웹 작업

핵심은 역할 구분이 아니라 **모든 결과가 GitHub에 다시 남는 것**이다.

## 10. 완료 정의
`Done`은 단순히 "작성함"이 아니다. 가능한 경우 아래를 충족해야 한다.
- 요구사항 충족
- 결과물 저장
- 필요한 검증/테스트 완료
- 관련 Issue/상태 업데이트
- 다음 에이전트가 추가 설명 없이 이어받을 수 있음
