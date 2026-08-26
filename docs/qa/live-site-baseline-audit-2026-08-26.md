# 라이브 사이트 기준선 점검 — 2026-08-26

> 목적: 문서 저장소의 기획 상태와 실제 운영 사이트 상태를 구분하고, 다음 개발·QA 작업의 기준선을 남긴다.

## 점검 범위

- 운영 사이트: `https://geugotjigeum.com/`
- 표본 페이지: 홈, `/en/`, `/works/poksshak/`, `/en/works/poksshak/`
- 점검일: 2026-08-26
- 방식: 공개 페이지 렌더링 및 링크 구조 확인
- 제외: 로그인 영역, 소스코드·배포 설정, 전체 41개 작품 전수 테스트, 모바일 기기별 확인

## 확인된 구현 상태

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| 작품별 독립 URL | Done (표본) | `/works/poksshak/`, `/en/works/poksshak/`가 독립 페이지로 열림 |
| 작품별 제목·소개문 | Done (표본) | 폭싹 속았수다 KR/EN 페이지에 고유 title, H1, 설명문 확인 |
| 4개 언어 전환 링크 | Done (표본) | KR / EN / JP / 中文 링크가 동일 작품 slug로 연결됨 |
| 장소·지역 탐색 구조 | In Progress | `/places/`, `/regions/` 및 다수 언어별 장소·지역 URL이 검색에 노출됨 |
| 전체 41개 후킹페이지 4개 언어 완비 | In Progress | 표본은 정상이나 전수 재점검이 필요함 |
| 퀴즈 20문항 확대 | Planned | `/quiz/` 구현과 데이터 여부를 코드 기준으로 확인할 수 없음 |
| 파친코 장기형 콘텐츠 | Planned | 기획 문서는 있으나 라이브 발행 상태를 별도 확인해야 함 |
| AdSense·성장 4주 실행 | Review | 2026-08-25 기준 기획 문서이며 최신 GSC·광고·행동 데이터 갱신 필요 |

## 확인된 문제

- 홈과 영어 홈 렌더링 결과에 `스크립트 오류: Script error. (line 0)` 문구가 사용자에게 노출됨.
- 이는 단순 콘솔 경고가 아니라 화면 텍스트로 보이므로 원인 확인 및 수정 전까지 QA 이슈로 추적한다.
- 해당 오류의 파일·스택·배포 시점은 코드 저장소와 배포 환경 확인 전에는 특정할 수 없다.

## 문서별 잠정 상태

| 기존 문서 | 상태 | 후속 처리 |
| --- | --- | --- |
| `content/pachinko-content-plan-v1.md` | Planned | 발행 여부·장소 근거·다국어 데이터 확인 |
| `product/quiz-expansion-plan-v1.1.md` | Planned | 코드 저장소 확인 후 구현 여부와 범위 확정 |
| `qa/language-toggle-audit-2026-08-25.md` | In Progress | 41개 slug 전수·언어 URL·active 상태 자동 점검 |
| `seo/global-seo-ui-content-development-plan-v1.md` | In Progress | 독립 URL·다국어 구조는 부분 구현, 미완료 항목을 코드 기준으로 분해 |
| `seo/naver-seo-development-request-2026-08-05.md` | In Progress | 표본 메타·정적 URL은 확인, canonical·sitemap·전 작품 페이지소스 검증 필요 |
| `seo/seo-growth-adsense-plan-v1.0.md` | Review | 최신 Search Console·AdSense·GA4 데이터를 기준으로 재계획 |

## 소스코드 기준 저장소 상태

- GitHub 연결 계정 `cozzyy`에서 접근 가능한 본인 소유 저장소를 확인했다.
- `cozzyy/geogotjigeum`은 문서 중심 저장소이며, 라이브 사이트 애플리케이션 코드로 보이는 별도 저장소는 확인되지 않았다.
- 따라서 운영 코드의 canonical repository, 배포 서비스, 접근 권한은 Issue #4에서 개발 담당자 또는 Manus 작업 환경을 통해 확정해야 한다.

## 다음 우선순위

1. Issue #4: 운영 사이트 코드 저장소·배포 환경 확정
2. Issue #6: 홈 화면 스크립트 오류 원인 확인 및 수정
3. Issue #2: GitHub Project 보드 최초 설정
4. Issue #3: 코드 기준으로 기존 문서 상태 확정 및 후속 Issue 분리
5. Issue #5: 실제 입력 1건으로 Inbox 파일럿 실행
