# Verified Minimalism — Preflight v1

Status: **DEV AUDIT ONLY / NO IMPLEMENTATION YET**

이 문서는 #45 구현 전에 개발자가 수행할 읽기 전용/분석 작업 범위를 고정한다.

## A. Place URL / 내부링크 보존 Audit

목적: Work 본문에서 장소/인물/부가기능을 숨기거나 축소하더라도 기존 SEO Place URL과 내부 링크 구조를 실수로 끊지 않기 위함.

개발자는 다음을 보고한다.

1. Work Detail에서 `/places/`로 연결되는 모든 생성 규칙/함수 위치
2. Map deep-link(`?work=<id>&loc=<id>`) 생성 규칙/함수 위치
3. Scene → Place/Map 연결 규칙
4. Guide → Place/Map 연결 규칙
5. sitemap에 Place URL을 넣는 generator 위치
6. Work에서 UI를 숨길 때 crawlable internal link가 사라질 수 있는 지점

### 원칙
- Pilot에서는 기존 Place URL 삭제/변경/301/noindex 금지
- 내부 링크를 무조건 현재 화면과 동일하게 전부 노출할 필요는 없음
- 다만 기존 indexed/canonical Place에 대한 crawl path가 완전히 끊기지 않도록 보존책을 제안
- 구현 전에 링크 보존안을 Planner가 승인

## B. Relationship Schema 영향 Audit

목표 taxonomy:
- FILMED
- STORY_SETTING
- EXPERIENCE
- INSPIRATION
- UNVERIFIED

### 매우 중요
**42개 작품 일괄 migration을 바로 하지 않는다.**

개발자는 먼저 현재 실제 데이터 값의 분포를 읽기 전용으로 조사한다.

보고 항목:
1. 현재 location relationship/tier 관련 필드명과 가능한 값
2. 각 값별 레코드 수
3. Work/Place/Map/Guide/Scene에서 이 값을 읽는 코드 위치
4. 새 taxonomy로 1:1 안전 변환 가능한 값
5. 사람이 판단해야 하는 ambiguous 값
6. migration 시 URL/ID/SEO 영향 여부

### R1 정책
- Pilot 5개 작품만 canonical mapping table을 Planner가 확정
- 나머지 catalog는 기존 값을 유지할 수 있음
- renderer에서 normalization adapter를 둘 수 있으나 raw data를 일괄 파괴적으로 치환하지 않음
- `UNVERIFIED`를 자동 추론하지 않음

## C. 5개 Pilot Content Contract

대상:
- poksshak
- breakingbad
- byakuya
- strangerthings
- odyssey

개발자는 콘텐츠 문안을 발명하지 않는다.

Planner가 각 작품에 대해 제공해야 하는 것:
- Editor's Lens 2~4문장
- Scene 최대 3개 + 선정 이유
- Core Place 3~5 + 선정 이유
- Hidden Fact 0~3
- 각 Fact 관계/evidence 상태

`docs/product/FACT_EDITORIAL_LAYER_V1.md`가 canonical rule이다.

## D. Navigation / IA Touch Audit

아직 nav를 수정하지 말고 아래만 보고한다.

1. desktop primary nav 생성 위치
2. mobile nav 생성 위치
3. homepage CTA/region/nearby/search UI 생성 위치
4. Work Detail의 cast/quiz/culture/all-locations 섹션 생성 위치
5. shared component인지 locale별 중복인지

## E. 개발 시작 Gate

개발자가 위 A~D audit 결과를 Issue #45 comment로 보고한다.

그 다음 Planner가:
- Pilot 콘텐츠 계약
- link preservation 방식
- relationship normalization 방식
- 실제 nav 축소 범위
을 확정해 `IMPLEMENTATION RELEASED`라고 명시한 뒤에만 코드 수정 시작.

그 전에는 generator/data/nav 코드 변경 금지.
