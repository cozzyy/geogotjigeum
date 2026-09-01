# New Work Research Gate v1

Date: 2026-09-01
Status: ACTIVE PLANNING STANDARD
Purpose: 신규 작품을 화제성만 보고 무작정 추가하지 않고, 검색 가능성·장소 검증·여행성·다국어 확장성을 점수화해 개발 투입 여부를 결정한다.

## 1. 기본 원칙
신규 작품은 `Research Gate → RELEASED → Development` 순서로만 진행한다.

개발자는 Research Gate 단계의 작품을 임의로 생성하지 않는다.

## 2. 100점 평가표
| 항목 | 배점 | 판단 기준 |
|---|---:|---|
| 현재 화제성 | 20 | 최근 공개/시즌/글로벌 화제, 플랫폼 Top10 등 |
| 촬영지 검색수요 | 20 | 작품명+촬영지/로케지/성지순례/filming locations 검색의도 |
| 검증 가능한 장소 | 20 | 공식/신뢰 출처로 실제 촬영지 5곳 이상 확인 가능 |
| 여행 가치 | 15 | 일반 관광객이 방문할 가치, 동선/지역 묶음 가능성 |
| Scene 연결 가능성 | 10 | 대표 장면과 실제 장소를 설명 가능 |
| 다국어 확장성 | 10 | KO/JA/EN/ZH 중 2개 이상 검색/팬덤 확장 가능성 |
| 경쟁 콘텐츠 약함 | 5 | 기존 검색결과가 얕거나 분산되어 차별화 가능 |

## 3. 판정
- 80~100: `RELEASE CANDIDATE` — 우선 제작 후보
- 70~79: `RESEARCH MORE` — 출처/장소 보강 후 재평가
- 50~69: `WATCHLIST` — 화제는 있으나 개발하지 않음
- 0~49: `HOLD`

## 4. Hard Gate
점수가 높아도 아래 중 하나면 RELEASE 금지.
- 실제 촬영지 5개 미만
- 신뢰 가능한 독립/공식 출처 총 3개 미만
- 장소관계가 FILMED/STORY/EXPERIENCE인지 구분 불가
- 저작권/이미지 전략이 없음
- 기존 indexed Work와 중복/충돌 위험이 큼

## 5. 신규작 운영 규칙
기본 성장 사이클:
- 신규 작품 1개 RELEASE
- 기존 검색 승자 2개 개선

신규 콘텐츠 숫자 자체를 KPI로 삼지 않는다.

## 6. 현재 후보군
기존 Growth Plan 후보:
- Our Sticky Love / 이런 엿같은 사랑
- The East Palace / 동궁
- Spooky in Love / 오싹한 연애

위 3개는 이 문서 기준으로 다시 점수화한 뒤 RELEASE 여부를 결정한다. 기존 문서에 후보로 있다는 이유만으로 구현하지 않는다.

## 7. Planner deliverable
신규 작품 하나를 RELEASE할 때 최소 다음을 제공한다.
- scorecard
- verified locations 5+
- source list 3+
- canonical work id/slug 제안
- 대표 Scene 3개 후보
- 핵심 Place 5~10개
- locale 우선순위
- SEO query cluster
- asset strategy
- FILMED/STORY/EXPERIENCE 분류

## 8. Developer handoff
`RELEASED` 명시가 없는 신규 작품은 구현하지 않는다.
