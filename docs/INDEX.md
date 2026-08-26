# 그곳지금 문서 인덱스

그곳지금 프로젝트의 주요 기획·운영 문서와 AI 공동작업 문서를 관리하는 인덱스입니다.

## AI 공동개발 운영 문서

- [`../AGENTS.md`](../AGENTS.md)  
  ChatGPT, Claude, Manus, 외부 개발자가 공통으로 따라야 하는 작업 규칙.

- [`PROJECT_STATE.md`](PROJECT_STATE.md)  
  새로운 세션이 가장 먼저 확인할 현재 프로젝트 상태와 우선순위.

- [`CHATGPT_CLAUDE_HANDOFF.md`](CHATGPT_CLAUDE_HANDOFF.md)  
  ChatGPT 기획안을 GitHub를 통해 Claude에게 넘기고, 기술검토·사용자 승인 후 개발하는 표준 절차.

- [`CLAUDE_DEVELOPER_BOOTSTRAP.md`](CLAUDE_DEVELOPER_BOOTSTRAP.md)  
  다른 Claude 계정/세션에서도 동일한 개발자 역할을 GitHub 기준으로 복원하고 병렬 작업 충돌을 방지하는 가이드.

- [`CLAUDE_SECONDARY_START_PROMPT.md`](CLAUDE_SECONDARY_START_PROMPT.md)  
  2차 Claude 계정·Project·Code 세션에 그대로 붙여 넣는 시작 프롬프트.

- [`ROADMAP.md`](ROADMAP.md)  
  AI 공동개발 기반 구축부터 Inbox·자동보고·멀티에이전트 고도화까지의 단계별 로드맵.

- [`PROJECT_MANAGEMENT.md`](PROJECT_MANAGEMENT.md)  
  GitHub Projects를 업무 DB처럼 사용하기 위한 필드, View, Issue, 승인 Gate, Inbox, Done, 인수인계 규칙.

- [`DECISIONS.md`](DECISIONS.md)  
  여러 AI와 개발자가 계속 알아야 할 주요 프로젝트 의사결정 기록.

## 디렉터리

```text
docs/
├─ content/     작품별 신규 콘텐츠 기획
├─ product/     기능·운영 기획
├─ qa/          사이트 점검·QA 보고서
└─ seo/         SEO·글로벌·광고·개발 요청 문서
```

정리 전 아이디어·녹취·메일·메모는 저장소 루트의 [`../inbox/`](../inbox/)를 사용합니다.

## SEO / 개발

- [`seo/naver-seo-development-request-2026-08-05.md`](seo/naver-seo-development-request-2026-08-05.md)  
  네이버 검색노출 개선을 위한 작품별 URL·HTML·메타정보 개발 수정요청서.

- [`seo/global-seo-ui-content-development-plan-v1.md`](seo/global-seo-ui-content-development-plan-v1.md)  
  글로벌 다국어, SEO, UI, 콘텐츠, 검색, 배우·장소 관계, 여행 기능을 통합한 개발기획안.

- [`seo/seo-growth-adsense-plan-v1.0.md`](seo/seo-growth-adsense-plan-v1.0.md)  
  Search Console 초기 데이터를 기반으로 한 SEO 성장 및 AdSense 운영 4주 실행안.

## 제품 / 기능

- [`product/quiz-expansion-plan-v1.1.md`](product/quiz-expansion-plan-v1.1.md)  
  작품당 20문제, 장소 연계, 비로그인·저공수 운영을 중심으로 한 퀴즈 확대 기획안.

- [`product/representative-approval-automation-blueprint-v1.md`](product/representative-approval-automation-blueprint-v1.md)  
  대표 승인 중심으로 AI·n8n·GitHub를 연결하는 단계별 운영·자동화 설계.

## QA / 점검

- [`qa/live-site-baseline-audit-2026-08-26.md`](qa/live-site-baseline-audit-2026-08-26.md)  
  실제 운영 사이트 표본 점검, 기존 문서의 잠정 실행 상태, 사용자 노출 오류를 기록한 기준선 보고서.

- [`qa/language-toggle-audit-2026-08-25.md`](qa/language-toggle-audit-2026-08-25.md)  
  후킹페이지 41종의 KR / EN / JP / 中文 버튼 존재 여부를 기록한 외부 관찰 기준선.

- [`qa/i18n-language-switcher-remediation-plan-v2.md`](qa/i18n-language-switcher-remediation-plan-v2.md)  
  실제 `site/` 소스를 반영한 다국어 전환·번역 준비상태 통합 개발 기준본 (Issue #10).

## 콘텐츠

- [`content/pachinko-content-plan-v1.md`](content/pachinko-content-plan-v1.md)  
  Apple TV+ 『파친코』의 인물·역사·촬영지·이주·여행을 연결하는 장기 운영형 콘텐츠 기획안의 GitHub 구조화본.

## 관리 원칙

1. GitHub를 프로젝트의 Single Source of Truth로 사용한다.
2. 코드·문서는 Repository, 할 일은 Issues, 진행상태는 GitHub Projects에서 관리한다.
3. 새로운 AI/개발자는 `AGENTS.md → PROJECT_STATE.md → CHATGPT_CLAUDE_HANDOFF.md → 열린 Issues` 순으로 확인한다.
4. 새 Claude 계정/세션은 추가로 `CLAUDE_DEVELOPER_BOOTSTRAP.md`를 읽고 필요 시 `CLAUDE_SECONDARY_START_PROMPT.md`를 사용한다.
5. ChatGPT 기획이 개발로 넘어갈 때는 Handoff Issue와 사용자 승인 Gate를 사용한다.
6. 여러 Claude를 병렬로 사용할 때는 한 Issue = 한 실행 Claude, 한 작업 = 전용 branch를 기본으로 한다.
7. Markdown을 기본 관리 포맷으로 사용한다.
8. 문서 파일명은 영문 소문자와 하이픈을 기본으로 하며 날짜 또는 버전을 포함한다.
9. 실제 개발에 반영된 문서는 Git commit history와 Issues/PR로 변경 이력을 남긴다.
10. 중요한 방향 변경은 `DECISIONS.md`에 기록한다.

## 이관 메모

현재 저장소에는 기획·SEO·콘텐츠·QA 문서와 운영 웹사이트 소스가 함께 있다. 운영 소스는 `site/` 하위에 있으며, 배포 환경의 최종 매핑은 Issue #4에서 확정한다. 과거 원본 중 원본 보존이 꼭 필요한 바이너리 문서는 필요 시 `archive/originals/`에 별도 보관한다.
