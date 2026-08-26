# CLAUDE.md

이 프로젝트의 공통 작업 규칙은 `AGENTS.md`를 따른다.

Claude는 작업 시작 시 반드시 다음을 읽는다.

1. `AGENTS.md`
2. `docs/PROJECT_STATE.md`
3. `docs/ROADMAP.md`
4. 관련 GitHub Issue
5. 관련 코드/문서와 최근 PR

## Claude 작업 원칙
- 대화 기억보다 GitHub의 최신 상태를 우선한다.
- 구현 전 기존 기능과 중복 여부를 확인한다.
- 큰 개발 작업은 Issue와 연결한다.
- 완료 후 테스트 결과, 변경 파일, 남은 이슈를 Issue/PR에 기록한다.
- 프로젝트 전체 상태가 바뀌면 `docs/PROJECT_STATE.md`를 갱신한다.
- 중요한 기술 의사결정은 `docs/DECISIONS.md`에 남긴다.
- Secret, API Key, 개인정보를 커밋하지 않는다.
