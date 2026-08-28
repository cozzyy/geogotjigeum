# 그곳지금 Content Production Pipeline v1

## Status
**APPROVED OPERATING PLAN**

목표는 콘텐츠 제작을 매번 처음부터 생각하는 일이 아니라, **증거 기반 후보 선정 → 조사 → 제작 → 측정 → 다음 우선순위 재조정**의 반복 시스템으로 만드는 것이다.

## 1. 전체 파이프라인

`Candidate Inbox → Score → Research Gate → Content Brief → Data/Place Verification → Draft → Internal Links → Locale Plan → GitHub Issue → Implementation → QA → Deploy → 2w/4w Measurement`

## 2. Candidate Inbox

후보 출처:
- Search Console 상승 query
- Netflix/Disney+/Apple TV+ 등 공식 신규 라인업
- 극장 개봉/재개봉/신시즌
- 여행/지역 이슈
- 기존 사이트의 높은 지도/장소 클릭 작품
- 사용자 제안

각 후보에는 최소 기록:
- 작품명
- 공개/화제 시점
- 플랫폼
- 예상 지역
- 기존 사이트 존재 여부
- 후보를 넣은 이유
- 출처 링크

## 3. Score

`CONTENT_GROWTH_ENGINE_V1.md`의 100점 모델 사용.

기존 페이지는 GSC 실제 성과가 최우선이며, 신규 작품은 점수가 높아도 Research Gate를 통과해야 한다.

## 4. Research Gate

### 필수 조사
- 공식 작품 정보
- 실제 촬영지와 극중 배경 구분
- 최소 5개 location 후보
- 장소별 촬영 관계 근거
- 방문 가능 여부를 말할 필요가 있으면 현재 정보 근거
- 인물/배우 최소 핵심 관계
- 숨은 이야기/비하인드 후보

### 중단 조건
- 대부분 세트/CG라 실제 장소 연결이 약함
- location 정보가 블로그 복제 수준으로만 존재해 검증 어려움
- 작품 인지도만 높고 여행/장소 발견으로 연결되지 않음

## 5. Content Brief 표준

1. 한 줄 검색의도
2. 핵심 title 제안 2개
3. meta description
4. 20~30대 친구 말투의 hook
5. 핵심 장소 5~10개
6. 장소마다 `장면/관계 → 실제 장소 → 현재 정보` 구조
7. 숨은 이야기 1~3개
8. 같은 지역 관련 작품/장소 internal-link 후보
9. 지도 CTA
10. locale priority
11. quiz readiness
12. 출처 목록

## 6. 글쓰기 원칙

- 설명서처럼 가르치지 않는다.
- 짧고 자연스러운 문장.
- 사용자가 작품을 이미 좋아한다는 전제로 장면의 감정을 먼저 건드린다.
- 정보 나열보다 발견의 흐름을 만든다.
- '직접 가봤다'처럼 경험을 꾸며내지 않는다.
- 반전/비하인드는 반드시 사실 검증.
- 검색어는 자연스럽게 H2/본문에 포함하고 반복 삽입 금지.

## 7. SEO 패키지

각 제작/리라이트 Issue에 포함:
- target query 1~3개
- current position/impressions/clicks if existing
- title/meta before→after
- H1/H2 plan
- internal links in/out
- relevant region/place page
- image alt
- structured-data 영향 여부

## 8. Locale Plan

모든 콘텐츠를 4개 언어로 즉시 번역하지 않는다.

결정 기준:
- GSC 국가/언어 신호
- 작품 팬덤 지역
- 장소가 위치한 국가
- 번역 후 검색경쟁
- 번역 준비상태

예:
- 일본 작품/배경: KR + JA
- 글로벌 영어권 IP: KR + selective EN long-tail
- 핵심 K-drama: KR → JA/繁中 → selective EN

번역은 단순 직역이 아니라 해당 언어 사용자의 검색 표현과 장소명 표기를 확인한다.

## 9. Quiz Gate

모든 작품에 퀴즈를 즉시 붙이지 않는다.

Quiz Tier 조건:
- 핵심 콘텐츠 Tier A/B
- 객관적으로 검증 가능한 20문항 확보 가능
- 장소와 연결되는 결과/보상 3개 이상
- 스포일러 수준 관리 가능

초기 10문제 파일럿이 있어도 구조는 향후 20문제를 지원해야 한다.

## 10. GitHub 실행

### Planning Issue
ChatGPT가 생성:
- 목적
- research evidence
- content brief
- SEO target
- source files 예상
- locale
- QA

### Developer handoff
Claude는 최신 main 기준으로:
- 기존 source/generator 확인
- 데이터 추가/수정
- generator 재생성
- 링크/SEO/i18n QA
- PR

디자인 closeout과 같은 공통 generator/CSS를 동시에 수정하는 경우 충돌을 피하기 위해 구현 순서를 조정한다.

## 11. QA

### 사실
- 촬영지 근거
- 장소명/주소/좌표
- 극중 장소 vs 실제 촬영지
- 인물/배우
- 최신 상태를 주장한 정보

### SEO
- canonical
- hreflang
- title/meta
- H1 하나
- structured data
- sitemap/internal links

### UX
- 360/390/430
- 1440
- no horizontal overflow
- map CTA
- related place/work links
- images/fallback

## 12. Measurement

배포 후 14일:
- impressions
- clicks
- CTR
- avg position
- query expansion

배포 후 28일:
- above + 지도 진입/장소 클릭
- 관련 페이지 유입
- locale별 성과

판단:
- WIN: 유지 + 추가 내부링크/번역
- PROMISING: title/H2 재조정
- FLAT: 추가 투자 중단
- WRONG INTENT: 검색의도/페이지 역할 재설계

## 13. 운영 주기

### 매주
- GSC 신규 query/상승 query 확인
- Candidate Inbox 업데이트
- 1페이지 경계권 3~5개 확인

### 격주
- Priority 30 재점수
- 신규 Research Gate 1~2개
- 기존 페이지 리라이트 2~3개

### 월간
- WIN/FLAT 판정
- locale ROI
- graph orphan/duplicate 점검
- 다음 30일 콘텐츠 큐 확정

## 14. 대표 의사결정 최소화

일상적인 후보 조사/리라이트/내부링크/SEO 개선은 Fast Lane으로 진행한다.

사용자 승인이 필요한 경우:
- 서비스 정체성을 바꾸는 글로벌 확장
- 대규모 신규 카테고리
- 유료 데이터/이미지/검색 서비스
- URL/SEO architecture 변경
- 저작권/브랜드 위험이 큰 자산 사용

그 외에는 ChatGPT가 우선순위를 관리하고 Claude가 구현한다.
