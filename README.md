# geogotjigeum

그곳지금 서비스의 기획·SEO·콘텐츠·QA와 AI 공동작업 상태를 관리하는 저장소입니다.

## AI/개발자 시작점

새로운 ChatGPT, Claude, Manus 세션 또는 외부 개발자는 아래 순서로 프로젝트를 확인합니다.

1. [`AGENTS.md`](AGENTS.md) — 공통 작업 규칙
2. [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) — 현재 프로젝트 상태
3. [`docs/ROADMAP.md`](docs/ROADMAP.md) — 큰 단계와 우선순위
4. [`docs/PROJECT_MANAGEMENT.md`](docs/PROJECT_MANAGEMENT.md) — Issues/Projects 운영 규칙
5. 관련 GitHub Issues / PR / 문서

## 문서 구조

```text
AGENTS.md                    # 모든 AI/개발자 공통 지침
CLAUDE.md                    # Claude 시작점
docs/
├─ PROJECT_STATE.md          # 현재 상태
├─ ROADMAP.md                # 로드맵
├─ DECISIONS.md              # 주요 의사결정
├─ PROJECT_MANAGEMENT.md     # Project DB 필드·Issue 규칙
├─ content/                  # 작품별 신규 콘텐츠 기획
├─ product/                  # 서비스 기능·운영 기획
├─ qa/                       # 사이트 점검 및 QA 보고서
└─ seo/                      # SEO·글로벌·광고·개발 요청 문서
inbox/                       # 아직 정리되지 않은 아이디어·녹취·메일·메모
.github/                     # Issue/PR 템플릿
```

전체 문서 목록은 [`docs/INDEX.md`](docs/INDEX.md)에서 확인할 수 있습니다.

## 관리 원칙

- GitHub를 프로젝트의 Single Source of Truth로 사용합니다.
- 코드·문서는 Repository, 할 일은 Issues, 진행상태는 GitHub Projects에서 관리합니다.
- 대화 기억보다 GitHub에 기록된 최신 상태를 우선합니다.
- GitHub에서 비교·검색하기 쉬운 Markdown을 기본 문서 포맷으로 사용합니다.
- 파일명은 영문 소문자 + 하이픈을 기본으로 하고 날짜 또는 버전을 포함합니다.
- 중요한 변경은 Git commit history와 `docs/DECISIONS.md`로 추적합니다.
- 실제 촬영지·번역·SEO·라이선스 등 검증이 필요한 정보는 근거와 확인일을 남깁니다.
