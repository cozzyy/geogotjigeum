# 그곳지금 문서 인덱스

그곳지금 프로젝트에서 ChatGPT와 함께 작성·정리한 주요 문서를 GitHub에서 관리하기 위한 인덱스입니다.

## 디렉터리

```text
docs/
├─ content/     작품별 신규 콘텐츠 기획
├─ product/     기능·운영 기획
├─ qa/          사이트 점검·QA 보고서
└─ seo/         SEO·글로벌·광고·개발 요청 문서
```

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

## QA / 점검

- [`qa/language-toggle-audit-2026-08-25.md`](qa/language-toggle-audit-2026-08-25.md)  
  후킹페이지 41종의 KR / EN / JP / 中文 버튼 존재 여부와 언어 전환 구조 점검 보고서.

## 콘텐츠

- [`content/pachinko-content-plan-v1.md`](content/pachinko-content-plan-v1.md)  
  Apple TV+ 『파친코』의 인물·역사·촬영지·이주·여행을 연결하는 장기 운영형 콘텐츠 기획안의 GitHub 구조화본.

## 관리 원칙

1. GitHub에서는 검색·변경이 쉬운 Markdown을 기본 관리 포맷으로 사용한다.
2. 문서 파일명은 영문 소문자와 하이픈을 기본으로 하며 날짜 또는 버전을 포함한다.
3. 과거 DOCX/HTML 자료는 내용이 동일하면 Markdown 관리본을 우선한다.
4. 실제 개발에 반영된 문서는 수정 시 버전을 올리거나 Git commit history로 변경 이력을 남긴다.
5. 신규 기획안은 성격에 따라 `content`, `product`, `qa`, `seo` 중 하나에 저장한다.

## 이관 메모

이번 정리에서는 현재 File Library와 대화에서 확인 가능한 그곳지금 관련 생성 문서를 우선 이관했다. 과거 원본 중 GitHub 커넥터가 직접 바이너리를 가져올 수 없는 DOCX/HTML은 내용 기반 Markdown 관리본으로 정리했다. 이후 원본 보존이 꼭 필요한 파일은 `archive/originals/`에 별도 보관하는 방식이 적절하다.
