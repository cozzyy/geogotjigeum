# 그곳지금 문서 인덱스

그곳지금 프로젝트의 주요 기획·운영 문서와 AI 공동작업 문서를 관리하는 인덱스입니다.

## AI 공동개발 운영 문서

- [`../AGENTS.md`](../AGENTS.md)  
  ChatGPT, Claude, Manus, 외부 개발자가 공통으로 따라야 하는 작업 규칙.

- [`PROJECT_STATE.md`](PROJECT_STATE.md)  
  새로운 세션이 가장 먼저 확인할 현재 프로젝트 상태와 우선순위.

- [`CHATGPT_CLAUDE_HANDOFF.md`](CHATGPT_CLAUDE_HANDOFF.md)  
  ChatGPT 기획안을 GitHub를 통해 Claude에게 넘기고, Fast Lane 또는 승인 Gate로 개발하는 표준 절차.

- [`CLAUDE_DEVELOPER_BOOTSTRAP.md`](CLAUDE_DEVELOPER_BOOTSTRAP.md)  
  다른 Claude 계정/세션에서도 동일한 개발자 역할을 GitHub 기준으로 복원하고 병렬 작업 충돌을 방지하는 가이드.

- [`CLAUDE_SECONDARY_START_PROMPT.md`](CLAUDE_SECONDARY_START_PROMPT.md)  
  2차 Claude 계정·Project·Code 세션에 그대로 붙여 넣는 시작 프롬프트.

- [`DEPLOYMENT_HANDOFF.md`](DEPLOYMENT_HANDOFF.md)  
  개발 완료 후 로컬 배포 ZIP을 준비하고 Issue/PR에 ZIP 경로·테스트·위험을 남기는 현재 배포 인수인계 규칙.

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
├─ design/      디자인 시스템·화면별 설계·Phase 1 마감 기준
├─ growth/      콘텐츠 진단·SEO 성장 우선순위·Location Graph·생산체계
├─ product/     기능·운영 기획
├─ qa/          사이트 점검·QA 보고서
└─ seo/         SEO·글로벌·광고·개발 요청 문서
```

정리 전 아이디어·녹취·메일·메모는 저장소 루트의 [`../inbox/`](../inbox/)를 사용합니다.

## 성장 — 현재 실행 기준

다음 성장 트랙의 마스터 Issue는 **#31 Content Growth Engine v1**이며, 첫 실행 연구 배치는 **#32 Batch 1 SEO winners**입니다.

- [`growth/CONTENT_GROWTH_ENGINE_V1.md`](growth/CONTENT_GROWTH_ENGINE_V1.md)  
  Search Console 기반 우선순위, 신규작 Research Gate, 내부링크·측정 루프를 정의한 성장 마스터 문서.

- [`growth/CONTENT_INVENTORY_AUDIT_V1.md`](growth/CONTENT_INVENTORY_AUDIT_V1.md)  
  현재 42개 작품과 데이터 구조를 기반으로 한 A/B/C/D 1차 콘텐츠 진단.

- [`growth/CONTENT_PRIORITY_30_2026H2.md`](growth/CONTENT_PRIORITY_30_2026H2.md)  
  기존 SEO 가속 15 + 2026 신규 K-content Research Gate 10 + 글로벌 장소형 에버그린 5의 우선순위 30.

- [`growth/BATCH1_SEO_CONTENT_BRIEF_V1.md`](growth/BATCH1_SEO_CONTENT_BRIEF_V1.md)  
  Breaking Bad, One Piece, Stranger Things, Harry Potter, 폭싹 속았수다, 삼체의 첫 SEO/콘텐츠 보강 브리프.

- [`growth/K_CONTENT_LOCATION_GRAPH_V1.md`](growth/K_CONTENT_LOCATION_GRAPH_V1.md)  
  작품↔장면↔인물/배우↔실제 장소↔지역 관계를 기존 데이터에서 활용하는 Location Graph 설계.

- [`growth/CONTENT_PRODUCTION_PIPELINE_V1.md`](growth/CONTENT_PRODUCTION_PIPELINE_V1.md)  
  후보→조사→검증→기획→GitHub→구현→QA→2주/4주 측정의 반복 콘텐츠 생산체계.

## 디자인 — 현재 기준

**이번 디자인 개편의 최종 기준은 아래 순서로 확인합니다.**

- [`design/DESIGN_SYSTEM_V1.md`](design/DESIGN_SYSTEM_V1.md)  
  Phase 1 공통 디자인 시스템 최종본. Cinematic Dark + Warm Light의 2-surface 원칙, coral accent, 반응형·접근성·다국어 기준.

- [`design/DESIGN_PHASE1_CLOSEOUT_V1.md`](design/DESIGN_PHASE1_CLOSEOUT_V1.md)  
  이번 디자인 개편의 마감 범위, 구현 순서, QA, Figma 비차단 원칙, 디자인 동결 기준을 정한 마스터 문서.

- [`design/UTILITY_EDGE_STATES_V1.md`](design/UTILITY_EDGE_STATES_V1.md)  
  이미지 없음, 검색 결과 없음, 번역 준비 중, 긴 다국어 문구, 오류, 접근성, 광고 안전영역 등 최종 엣지 상태 규칙.

- [`design/DESIGN_ROLLOUT_SEQUENCE_V1.md`](design/DESIGN_ROLLOUT_SEQUENCE_V1.md)  
  홈 → 작품 상세 → 지도 → 퀴즈 → 장소 상세 → 장소/지역 허브 → 공통 Shell → 회귀 QA 순서와 현재 상태.

### 화면별 디자인
- [`design/HOMEPAGE_REDESIGN_A_V1.md`](design/HOMEPAGE_REDESIGN_A_V1.md) — Homepage / Cinematic Content Discovery
- [`design/WORK_DETAIL_HOOKING_V1.md`](design/WORK_DETAIL_HOOKING_V1.md) — Work Detail / Hybrid Light Editorial
- [`design/MAP_EXPLORER_V1.md`](design/MAP_EXPLORER_V1.md) — Map Explorer
- [`design/QUIZ_EXPERIENCE_V1.md`](design/QUIZ_EXPERIENCE_V1.md) — Quiz / Playful Editorial
- [`design/PLACE_DETAIL_V1.md`](design/PLACE_DETAIL_V1.md) — Place Detail / Hybrid Travel Information
- [`design/DISCOVERY_HUBS_V1.md`](design/DISCOVERY_HUBS_V1.md) — Places / Regions / Light Discovery Index
- [`design/SHARED_SITE_SHELL_V1.md`](design/SHARED_SITE_SHELL_V1.md) — Header / Navigation / Language 공통 체계

개발 추적 마스터 Issue는 **#28 Design Phase 1 Closeout**을 사용하며, 실제 모바일 보정은 **#30 Mobile UX Remediation**을 우선 처리합니다.

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

- [`qa/MOBILE_VISUAL_QA_CHECKLIST_V1.md`](qa/MOBILE_VISUAL_QA_CHECKLIST_V1.md)  
  실제 모바일/에뮬레이션 360·390·430 화면을 기준으로 하는 시각 QA 하드 게이트.

## 콘텐츠

- [`content/pachinko-content-plan-v1.md`](content/pachinko-content-plan-v1.md)  
  Apple TV+ 『파친코』의 인물·역사·촬영지·이주·여행을 연결하는 장기 운영형 콘텐츠 기획안의 GitHub 구조화본.

## 관리 원칙

1. GitHub를 프로젝트의 Single Source of Truth로 사용한다.
2. 코드·문서는 Repository, 할 일은 Issues, 진행상태는 GitHub Projects에서 관리한다.
3. 새로운 AI/개발자는 `AGENTS.md → PROJECT_STATE.md → CHATGPT_CLAUDE_HANDOFF.md → 열린 Issues` 순으로 확인한다.
4. 새 Claude 계정/세션은 추가로 `CLAUDE_DEVELOPER_BOOTSTRAP.md`를 읽고 필요 시 `CLAUDE_SECONDARY_START_PROMPT.md`를 사용한다.
5. 저위험·명확한 개발은 Fast Lane, 사용자 판단이 필요한 고위험/방향 변경만 승인 Gate를 사용한다.
6. 여러 Claude를 병렬로 사용할 때는 한 Issue = 한 실행 Claude, 한 작업 = 전용 branch를 기본으로 한다.
7. 개발 완료 후 수동 배포가 필요하면 `DEPLOYMENT_HANDOFF.md`에 따라 로컬 배포 ZIP을 준비하고 GitHub에 경로·검증 결과를 남긴다.
8. Markdown을 기본 관리 포맷으로 사용한다.
9. 문서 파일명은 영문 소문자와 하이픈을 기본으로 하되, 기존 핵심 문서는 현재 이름을 유지한다.
10. 실제 개발에 반영된 문서는 Git commit history와 Issues/PR로 변경 이력을 남긴다.
11. 중요한 방향 변경은 `DECISIONS.md`에 기록한다.

## 이관 메모

현재 저장소에는 기획·디자인·성장·SEO·콘텐츠·QA 문서와 운영 웹사이트 소스가 함께 있다. 운영 소스는 `site/` 하위에 있다. 디자인 Phase 1 완료 후에는 해당 디자인 시스템을 기본값으로 재사용하고, 별도의 Phase 2 결정 전까지 수시 리디자인은 하지 않는다. 성장 트랙은 UI 변경과 별개로 GSC/콘텐츠 연구를 병렬 진행할 수 있지만 공통 generator/CSS 충돌이 생기면 최신 main 반영 후 구현한다.