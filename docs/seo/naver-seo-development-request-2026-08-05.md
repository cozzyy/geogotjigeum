# 그곳, 지금 네이버 검색노출 개선 개발 수정요청서

**개발자 전달용 · 웹사이트 작품별 SEO 및 HTML 메타정보 개선**  
작성일: 2026-08-05

> **요청 핵심**  
> 현재 모든 작품이 하나의 `index.html`과 `?work=` 쿼리로 표시됩니다. 작품별 URL마다 고유한 `title`, `description`, `canonical`, Open Graph, `H1`과 소개문이 검색로봇이 처음 받는 HTML에 포함되도록 수정해 주세요.

## 1. 수정 목적

네이버에서 사용자가 작품명과 촬영지·배경지·성지순례 등의 검색어를 입력했을 때, 각 작품 페이지가 서로 다른 독립 콘텐츠로 이해되고 검색될 수 있도록 웹사이트 HTML과 URL 구조를 개선합니다.

- 웹사이트가 검색의 본체이며, 네이버 블로그는 이후 유입을 보조하는 별도 채널입니다.
- 검색어를 관리화면에 등록하는 것이 아니라, 페이지의 HTML 제목·설명·본문을 검색 의도에 맞게 구성합니다.
- 검색 노출은 보장되지 않지만 검색로봇이 작품별 주제를 이해할 수 있는 구조를 만듭니다.

## 2. 현재 구조

- 메인: `https://fabulous-starship-25a0d6.netlify.app/`
- 폭싹 속았수다: `https://fabulous-starship-25a0d6.netlify.app/?work=pokshak`
- 오징어 게임: `https://fabulous-starship-25a0d6.netlify.app/?work=squidgame`
- 대망: `https://fabulous-starship-25a0d6.netlify.app/?work=daemang`
- 케이팝 데몬 헌터스: `https://fabulous-starship-25a0d6.netlify.app/?work=kdemonhunters`

현재 화면은 작품별로 달라도 최초 HTML의 `title`과 `description`이 같으면 중복·유사 문서로 판단될 수 있습니다.

## 3. 개발 요청 우선순위

### 3.1 권장안: 작품별 정적 URL과 HTML 생성

```text
/works/pokshak/
/works/squidgame/
/works/daemang/
/works/kdemonhunters/
```

- 각 경로의 최초 HTML에 작품별 메타정보를 포함합니다.
- 기존 `?work=` 주소는 새 경로로 HTTP 301 리다이렉트하거나 canonical을 명확히 지정합니다.
- 새 작품 추가 시 화면 콘텐츠와 SEO 메타가 같은 데이터에서 생성되도록 템플릿화합니다.

### 3.2 최소 수정안: 기존 `?work=` URL 유지

기존 주소를 유지할 경우, 클라이언트 JavaScript로 `document.title`만 바꾸지 말고 요청 URL별 최초 HTML에 고유 메타정보가 들어가도록 프리렌더링, SSR 또는 Edge/Function 기반 HTML 응답을 구현합니다.

**검수 기준:** 가능하면 `view-source` 또는 최초 네트워크 HTML 응답에서도 작품별 `title`과 `description`이 확인되어야 합니다.

## 4. 필수 수정 항목

- `title`: 작품별 고유 제목
- `meta description`: 작품별 고유 요약문
- `canonical`: 작품 대표 URL
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`
- Twitter Card: 작품별 제목·설명·이미지
- `H1`: 작품 페이지당 1개
- 첫 소개문: 목표 검색어의 의미를 자연스럽게 포함
- 장소 설명: 작품과 장소의 관계를 텍스트로 설명
- 이미지 `alt`: 작품명·장소명·이미지 의미
- 내부 링크: 구체적인 링크 문구 사용

## 5. 작품별 목표 검색어와 권장 메타

| 페이지 | 목표 검색어 | 권장 title | 권장 description |
|---|---|---|---|
| 메인 | 작품 속 장소 지도 | 그곳, 지금 \| 작품 속 장소·촬영지·성지순례 지도 | 영화·드라마·애니메이션·소설 속 촬영지와 배경, 실제 장소를 지도와 여행 코스로 확인하세요. |
| 폭싹 속았수다 | 폭싹 속았수다 제주 촬영지 | 폭싹 속았수다 제주 촬영지와 작품 속 장소 \| 그곳, 지금 | 폭싹 속았수다의 제주 촬영지와 배경, 관련 여행지를 지도에서 확인하세요. |
| 오징어 게임 | 오징어 게임 촬영지 지도 | 오징어 게임 촬영지와 실제 장소 지도 \| 그곳, 지금 | 오징어 게임의 촬영지와 작품 속 실제 장소를 지도와 방문 정보로 확인하세요. |
| 케이팝 데몬 헌터스 | 케이팝 데몬 헌터스 서울 명소 | 케이팝 데몬 헌터스 서울 명소와 배경지 지도 \| 그곳, 지금 | 케이팝 데몬 헌터스와 연결된 서울 명소와 작품 속 배경지를 지도에서 확인하세요. |
| 대망 | 대망 소설 일본 배경지 | 대망 소설 일본 배경지와 역사 여행 지도 \| 그곳, 지금 | 소설 대망과 도쿠가와 이에야스의 역사에 연결된 일본의 실제 장소를 지도에서 확인하세요. |

## 6. 폭싹 속았수다 HTML 예시

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>폭싹 속았수다 제주 촬영지와 작품 속 장소 | 그곳, 지금</title>
  <meta name="description" content="폭싹 속았수다의 제주 촬영지와 배경, 관련 여행지를 지도에서 확인하세요.">
  <link rel="canonical" href="https://fabulous-starship-25a0d6.netlify.app/works/pokshak/">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="그곳, 지금">
  <meta property="og:title" content="폭싹 속았수다 제주 촬영지와 작품 속 장소 | 그곳, 지금">
  <meta property="og:description" content="폭싹 속았수다의 제주 촬영지와 배경, 관련 여행지를 지도에서 확인하세요.">
  <meta property="og:url" content="https://fabulous-starship-25a0d6.netlify.app/works/pokshak/">
  <meta property="og:image" content="[작품별 대표 이미지 절대 URL]">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="폭싹 속았수다 제주 촬영지와 작품 속 장소 | 그곳, 지금">
  <meta name="twitter:description" content="폭싹 속았수다의 제주 촬영지와 배경, 관련 여행지를 지도에서 확인하세요.">
  <meta name="twitter:image" content="[작품별 대표 이미지 절대 URL]">
</head>
<body>
  <main>
    <h1>폭싹 속았수다 제주 촬영지와 작품 속 장소</h1>
    <p>폭싹 속았수다의 제주 촬영지와 작품 속 장소를 지도에서 확인하세요. 실제 촬영 장소와 이야기 배경, 주변 여행지를 구분해 소개합니다.</p>
  </main>
</body>
```

## 7. 작품 데이터 템플릿

```js
const works = {
  pokshak: {
    slug: "pokshak",
    name: "폭싹 속았수다",
    seoTitle: "폭싹 속았수다 제주 촬영지와 작품 속 장소 | 그곳, 지금",
    seoDescription: "폭싹 속았수다의 제주 촬영지와 배경, 관련 여행지를 지도에서 확인하세요.",
    h1: "폭싹 속았수다 제주 촬영지와 작품 속 장소",
    intro: "폭싹 속았수다의 제주 촬영지와 작품 속 장소를 지도에서 확인하세요.",
    canonicalPath: "/works/pokshak/",
    ogImage: "/images/works/pokshak-og.jpg"
  }
};
```

## 8. 본문 콘텐츠 기준

1. 작품별 `H1`을 1개 사용합니다.
2. 첫 문장에 대표 검색어의 의미가 자연스럽게 드러나게 합니다.
3. 장소 카드마다 작품과의 관계, 실제 촬영지 여부, 방문 정보를 텍스트로 제공합니다.
4. 촬영지가 아닌 장소는 배경지·관련지·추천지로 구분합니다.
5. 이미지에 짧고 정확한 `alt`를 넣습니다.
6. 링크 문구는 “자세히 보기”보다 “폭싹 속았수다 제주 촬영지 지도 보기”처럼 구체적으로 작성합니다.

## 9. 사이트맵과 대표 URL

- 새 `/works/.../` URL을 적용하면 `sitemap.xml`도 새 주소로 변경합니다.
- 사이트맵에는 검색에 노출할 정상 200 대표 URL만 넣습니다.
- 구 URL 폐기 시 HTTP 301 리다이렉트합니다.
- 구·신 URL 모두 운영 시 신 URL을 canonical로 지정합니다.
- `robots.txt`, 네이버·구글 소유확인 meta, GA4 스크립트는 유지합니다.

## 10. 개발 완료 체크리스트

- [ ] 메인과 작품 URL이 HTTP 200으로 열림
- [ ] 작품별 페이지 소스에서 고유 `title`, `description` 확인
- [ ] 작품별 canonical과 `og:url`이 해당 대표 URL을 가리킴
- [ ] 페이지마다 `title` 1개, `H1` 1개
- [ ] 작품별 OG 제목·설명·이미지 적용
- [ ] 첫 소개문과 장소 설명이 HTML 텍스트로 존재
- [ ] 기존 `?work=` URL 처리 방침이 일관됨
- [ ] `sitemap.xml`에 최종 대표 URL 반영
- [ ] `robots.txt` 허용 및 `noindex` 없음
- [ ] 네이버 URL 검사에서 작품별 메타가 다르게 추출됨
- [ ] 구글 URL 검사에서도 각 작품 대표 URL 확인

## 11. 네이버 블로그와의 관계

이번 개발 작업의 핵심은 웹사이트 작품 페이지의 HTML과 URL 구조입니다. 네이버 블로그는 개발 완료 후 같은 검색어로 정보성 글을 작성하고 작품 페이지로 링크를 보내는 마케팅 작업이며, 웹사이트 SEO를 대신하지 않습니다.

## 12. 개발자 최종 산출물

- 선택한 구현 방식 설명
- 작품별 최종 URL 목록
- 작품별 SEO 데이터 매핑 파일
- 수정된 템플릿과 빌드 결과물
- 수정된 `sitemap.xml` 및 리다이렉트 설정
- 대표 작품 4개의 페이지 소스·URL 검사 결과

## 13. 참고 원칙

페이지마다 정확하고 고유한 `title`과 `description`을 작성하고, 중요한 정보는 검색로봇이 이해할 수 있는 HTML 텍스트로 제공합니다. 검색어를 반복하거나 콘텐츠와 무관한 인기 키워드를 추가하지 않습니다.
