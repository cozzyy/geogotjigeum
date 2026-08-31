# 繁中 Content & SEO Guide v1

Date: 2026-08-31
Status: **AUTHORING / SEO RULESET FOR ISSUE #37**

## 1. 언어 범위

이번 프로젝트의 중국어는 **Traditional Chinese / zh-Hant**만 지원한다.

- UI label: `繁中`
- HTML language: `zh-Hant`
- 기존 URL: `/zh/`
- Simplified Chinese (`zh-CN`)는 이번 범위 밖

`/zh/` URL 구조는 유지한다. URL 구조 변경이 필요해 보이면 구현하지 말고 `NEEDS DECISION`으로 보고한다.

## 2. 번역 원칙

### 원칙 A — 번역보다 공식 표기를 우선
작품명, 플랫폼명, 인명, 지역명, 관광지명은 가능한 경우 아래 순서로 확인한다.
1. 공식 플랫폼/배급사 Traditional Chinese 표기
2. 공식 관광기관/정부기관 표기
3. 장소 공식 사이트의 zh-Hant 표기
4. 신뢰 가능한 대만/홍콩 주요 매체의 통용 표기

확인 가능한 공식 표기가 없으면 임의 직역하지 말고 source note를 남긴다.

### 원칙 B — 번체중문 사용자에게 자연스럽게
한국어 문장 구조를 그대로 옮기지 않는다. 짧은 문장, 장소 중심 설명, 검색자가 바로 알고 싶은 정보 순으로 쓴다.

### 원칙 C — 사실관계를 번역 과정에서 강화하지 않는다
`관련 장소`를 `실제 촬영지`로 번역하지 않는다.

관계는 반드시 데이터가 뒷받침하는 범위에서 구분한다.
- FILMED: 실제 촬영 확인
- EXPERIENCE: 공식/검증된 체험
- STORY-RELATED: 작품 서사/배경 관련
- INSPIRATION: 영감/연관 맥락
- UNVERIFIED: 확인 부족

## 3. 기본 용어 가이드

문맥에 따라 자연스럽게 선택하되 아래를 기준어로 사용한다.

| 한국어 의미 | zh-Hant 기본 표현 | 비고 |
|---|---|---|
| 촬영지 | 拍攝地 / 取景地 | 검색의도와 지역 통용표현을 확인해 선택 |
| 실제 촬영지 | 實際拍攝地 / 實際取景地 | 검증된 경우만 |
| 성지순례 | 聖地巡禮 | 팬덤/여행 맥락에서만 |
| 작품 배경 | 故事背景 / 故事相關地點 | 촬영지와 구분 |
| 공식 체험 | 官方體驗 | 실제 공식성 확인 |
| 지도에서 보기 | 在地圖上查看 | CTA 기본안 |
| 관련 장소 | 相關地點 | 촬영 여부 미확정시 안전한 기본어 |
| 여행 팁 | 旅遊提示 / 造訪提示 | 문맥에 따라 자연스럽게 |

용어표는 고정 번역 사전이 아니다. 실제 Taiwan/Hong Kong search phrasing과 공식 출처를 우선한다.

## 4. SEO 작성 규칙

### Title
- 작품 공식 Traditional Chinese title을 앞부분에 둔다.
- 사용자가 실제로 찾는 location intent가 분명하면 `拍攝地` 또는 `取景地`를 자연스럽게 포함한다.
- 성공 중인 기존 title을 이유 없이 전면 변경하지 않는다.
- keyword stuffing 금지.

### Meta description
약 1~2문장으로 다음을 우선한다.
- 어떤 작품인가
- 어떤 실제/관련 장소를 볼 수 있는가
- 지도/여행 탐색 가치

촬영 여부가 혼합돼 있으면 `實際拍攝地與作品相關地點`처럼 구분해 표현한다.

### H1/H2
H1은 작품+장소 의도를 명확히 하고, H2는 검색 질문에 직접 답한다.

예시 구조:
- 這部作品實際在哪裡拍攝？
- 實際拍攝地與故事相關地點有什麼不同？
- 如何在地圖上查看這些地點？

별도 article URL을 만들기 전에 기존 Work 페이지에서 검색질문을 먼저 해결한다.

## 5. Place 콘텐츠 규칙

각 핵심 Place에는 최소 다음 정보가 자연스러운 zh-Hant로 보여야 한다.
- 장소 공식/통용 Traditional Chinese 명칭
- 원문/영문명 필요시 병기
- 도시/지역
- 작품과의 관계
- 해당 scene/context
- 방문자가 알아야 할 핵심 설명
- 검증된 경우에만 travel tip
- 지도 CTA

영업시간, 가격, 교통, 운영상태 등 변동성 높은 정보는 신뢰 가능한 최신 근거가 없으면 단정하지 않는다.

## 6. 링크/locale 규칙

- zh-Hant Work에서 zh-Hant Place가 존재하면 반드시 `/zh/places/.../`로 연결
- zh-Hant Region이 존재하면 `/zh/regions/.../`
- locale-aware Map 경로/상태 유지
- 대상 zh 페이지가 없는 경우 조용히 다른 언어로 보내지 않는다. 현재 제품 규칙에 맞춰 planned/unavailable 처리하거나 `NEEDS DECISION` 보고
- 언어 toggle은 KR / EN / JP / 繁中 일관성 유지

## 7. Technical SEO

각 zh-Hant 페이지에서 확인:
- `<html lang="zh-Hant">`
- self canonical
- `hreflang="ko"`, `en`, `ja`, `zh-Hant`, `x-default`
- hreflang 대상 URL 실제 존재 여부
- sitemap entry
- OG title/description
- `og:locale`은 기존 구현과 일관되게 사용하되 zh-Hant 의미가 훼손되지 않는지 확인
- JSON-LD의 visible name/description 언어 일관성

새 중국어 콘텐츠 때문에 query-parameter URL이나 duplicate canonical을 만들지 않는다.

## 8. QA 언어 체크리스트

Pilot 페이지마다 visible text를 확인한다.

허용:
- 작품/장소의 공식 원문명 병기
- 고유명사 영문명 병기

불허:
- 한국어 CTA
- 일본어 섹션명
- 영어 placeholder/fallback 본문
- 한국어 travel tip
- 다른 locale URL로 잘못 연결된 `繁中` 버튼

## 9. 콘텐츠 톤

그곳지금의 기존 원칙을 유지한다.
- 백과사전식 정보 나열보다 장소 발견의 재미
- 짧고 읽기 쉬운 문장
- 실제 장면/장소 맥락 중심
- 검증되지 않은 비하인드 과장 금지
- 사용자가 “그래서 어디지?”를 빠르게 해결할 수 있게 구성

## 10. 배포 후 측정

작품별 baseline:
- URL
- target zh-Hant query 1~3개
- impressions/clicks/CTR/position
- 현재 색인 여부

14일/28일 후 비교한다.

중국어 콘텐츠 수 자체는 KPI가 아니다. **검색노출 + 클릭 + 장소/지도 탐색이 발생하는지**로 확대 여부를 결정한다.
