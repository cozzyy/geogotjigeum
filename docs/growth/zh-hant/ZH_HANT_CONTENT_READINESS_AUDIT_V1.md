# 繁中 Content Readiness Audit v1

Date: 2026-08-31
Status: **AUDIT SPEC / RUN BEFORE IMPLEMENTATION**
Issue: #37

## 1. 목적

현재 `/zh/`가 실제 Traditional Chinese 서비스로 어느 수준까지 준비됐는지 개발 전에 확인한다.

단순 파일 존재 여부가 아니라 **보이는 콘텐츠, 내부링크, SEO/i18n, 생성원본**을 함께 확인한다.

## 2. 현재 확인된 사실

`site/zh/`에는 다음 구조가 존재한다.
- `site/zh/index.html`
- `site/zh/works/`
- `site/zh/places/`
- `site/zh/regions/`

현재 `site/zh/works/`에 존재하는 작품 디렉토리는 6개다.
- `coffeeprince`
- `daejanggeum`
- `kdemonhunters`
- `poksshak`
- `squidgame`
- `wintersonata`

예를 들어 `site/zh/works/squidgame/index.html`에는 이미 `lang="zh-Hant"`, zh-Hant title/meta, canonical, ko/en/ja/zh-Hant/x-default hreflang이 존재한다. 즉 구조가 전혀 없는 상태는 아니며 **기존 파이프라인을 최대한 재사용**하는 것이 기본이다.

## 3. 감사 대상

### A. Home
- 전체 UI가 zh-Hant인지
- 작품명/CTA/탐색 라벨에 KO/EN/JA 잔존 여부
- 작품 카드가 실제 `/zh/works/.../`로 연결되는지
- 없는 zh 작품에 잘못 연결하지 않는지

### B. Works
현재 6개 existing zh work + Pilot 신규 대상에 대해:
- title/meta/H1/H2
- hook/story 본문
- 등장인물/장소명
- CTA/버튼/필터/배지
- related work links
- map links
- visible fallback language

### C. Places
- 실제 생성된 zh-Hant Place 수
- 핵심 Pilot 작품의 Place coverage
- place name / description / travel tip 번역 상태
- relation taxonomy 정확성
- 존재하지 않는 zh Place URL로 링크하는지

### D. Regions
- zh Region 존재/coverage
- Work/Place에서 Region으로 crawlable link가 있는지
- 영어/한국어 지역명이 그대로 노출되는지
- SEO 가치 없는 region을 단순 URL 수 증가 목적으로 생성하고 있지 않은지

### E. Map / Shared UI
- 지도 진입 후 locale 유지 여부
- 언어 toggle label `繁中`
- header/footer/shared CTA
- 검색/필터 결과에 다른 언어 fallback이 섞이는지

### F. SEO/i18n
각 Pilot URL에서:
- `<html lang="zh-Hant">`
- self canonical
- `hreflang="zh-Hant"`
- ko/en/ja/x-default 상호 참조
- sitemap 포함
- OG/Twitter locale/text
- JSON-LD visible text와 언어 일관성
- parameter URL이 canonical을 깨지 않는지

## 4. 판정 등급

각 페이지/작품은 다음 중 하나로 판정한다.

### READY
사용자가 실제로 읽고 이동할 수 있고 SEO/i18n까지 정상.

### PARTIAL
구조는 있으나 본문/장소/링크/메타 일부가 다른 언어이거나 누락.

### NOT READY
zh 경로가 없거나 실질적으로 다른 언어 fallback이며 end-to-end 탐색이 불가능.

### HOLD
정확한 번역/관계/출처를 검증할 수 없어 개발 보류가 필요한 상태.

## 5. 개발자 감사 결과 포맷

구현 전에 아래 표를 Issue #37에 댓글로 남긴다.

| Work | Existing zh Work | Core Places zh | Region zh | Map locale | Visible fallback | SEO/hreflang | Grade | Required action |
|---|---|---:|---|---|---|---|---|---|
| squidgame | Y | n/n | Y/N | Pass/Fail | none/list | Pass/Fail | READY/PARTIAL/... | ... |

그리고 아래 숫자도 함께 보고한다.
- existing zh Work count
- existing zh Place count
- existing zh Region count
- KO/EN/JA visible fallback 발견 건수
- broken/missing locale link 건수
- sitemap/hreflang anomaly 건수

## 6. Source-of-truth 확인

생성된 `site/zh/**/index.html`만 직접 수정하지 않는다.

감사에서 반드시 어떤 파일이 canonical source인지 식별한다.

개발자가 보고할 것:
1. zh work metadata source
2. zh location field/source
3. shared i18n source
4. work generator
5. place generator
6. region generator
7. sitemap generator

직접 생성 HTML과 canonical source가 불일치하면 source를 먼저 수정하고 regenerate한다.

## 7. SEO 보호 규칙

- 기존에 index될 수 있는 `/zh/` URL을 이유 없이 제거하지 않는다.
- 완성도가 낮다는 이유만으로 대량 noindex하지 않는다.
- 내용이 부정확하면 관계/텍스트를 수정한다.
- 삭제가 꼭 필요하면 기존 성과와 대체 URL을 확인하고 `NEEDS DECISION`으로 보고한다.

## 8. Audit 완료 조건

Pilot 구현을 시작하기 전에 다음이 명확해야 한다.
- 현재 zh-Hant 자산의 실제 범위
- 부족한 것이 콘텐츠인지 generator인지 둘 다인지
- Pilot 6개에 필요한 정확한 source/file touch list
- URL 변경 없이 구현 가능한지
- Stage C/공통 generator와 충돌 없는지
