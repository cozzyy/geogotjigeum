# 《빅쇼트》 신규 콘텐츠 + 주가예측 하위메뉴 파일럿 기획안 V1

**상태:** PLANNING READY  
**기획 확정일:** 2026-09-18  
**기획자 역할:** ChatGPT / PM  
**대상 Work ID 제안:** `the-big-short`  
**핵심 방향:** 영화 콘텐츠를 먼저 읽게 하고, 작품의 핵심 질문을 자연스럽게 `주가예측` 실험 서비스로 연결한다.

---

## 1. 이 콘텐츠를 추가하는 이유

《빅쇼트》(The Big Short)는 단순한 금융영화가 아니라, **시장 전체가 같은 믿음을 공유할 때 숫자를 먼저 읽은 소수가 왜 오히려 이상한 사람처럼 보이는지**를 보여주는 작품이다.

이번 콘텐츠의 목적은 두 가지다.

1. 그곳지금에 주식·금융을 소재로 한 첫 대표 영화 콘텐츠를 만든다.
2. 해당 작품의 하위메뉴에 별도 개발 중인 **`주가예측` 서비스 진입점**을 만들 수 있도록 정보구조와 UI 자리를 미리 설계한다.

중요:
- 영화 콘텐츠가 주가예측 프로그램의 광고처럼 보이면 안 된다.
- 먼저 《빅쇼트》 자체가 재미있고 읽을 가치가 있어야 한다.
- 마지막에 작품의 질문이 자연스럽게 “그렇다면 오늘의 데이터는 어떤 신호를 내고 있을까?”로 넘어가야 한다.
- 예측 엔진 자체는 이번 개발 범위가 아니다.

---

## 2. 작품 기본정보

- 작품명: 빅쇼트
- 원제: The Big Short
- 공개연도: 2015
- 감독: Adam McKay
- 원작: Michael Lewis, *The Big Short: Inside the Doomsday Machine*
- 장르: 드라마 / 코미디 / 금융
- 주요 배역:
  - Christian Bale — Michael Burry
  - Steve Carell — Mark Baum
  - Ryan Gosling — Jared Vennett
  - Brad Pitt — Ben Rickert
- 공식 작품 소개 기준: 2008년 금융위기를 앞두고 대형 은행·미디어·정부가 보지 못한 위험을 본 소수의 인물들이 시장 반대편에 베팅하는 이야기

1차 공식 출처:
- Paramount Pictures: https://www.paramountpictures.com/movies/the-big-short

---

## 3. 최종 콘텐츠 콘셉트

### 추천 후킹 제목

# 모두가 틀렸을 때, 혼자 맞는 사람은 왜 미친 사람처럼 보일까? 《빅쇼트》가 보여준 시장의 집단착각

보조 카피:

> 숫자는 이미 무너지고 있었다.  
> 그런데 왜 사람들은 끝까지 안 믿었을까?

### 핵심 질문

《빅쇼트》의 진짜 재미를 “금융위기를 맞힌 천재들”로만 설명하지 않는다.

핵심 질문은 이것이다.

> **데이터가 시장 전체의 믿음과 반대로 말할 때, 사람은 숫자를 믿을까 아니면 사람들을 믿을까?**

이 질문을 중심으로 다음 심리를 다룬다.

- 군집행동 / social proof
- 확증편향
- 권위에 대한 의존
- 인센티브 때문에 불편한 사실을 보지 않으려는 태도
- “너무 일찍 맞으면 한동안 틀린 사람처럼 보인다”는 시간의 문제
- 모델이 맞는 것과 투자자가 끝까지 버티는 것은 다른 문제라는 점

학술 논문처럼 설명하지 않는다. 작품 속 장면과 인물의 선택을 먼저 보여주고 심리 개념을 짧게 붙인다.

---

## 4. 검토한 다른 콘셉트와 최종 선택 이유

### 후보 A — 금융상품 설명형
“CDO, MBS, CDS를 영화 장면으로 쉽게 이해하기”

- 장점: 검색 수요가 있음
- 단점: 이미 유튜브와 금융 블로그에 매우 많음
- 판정: 보조 콘텐츠로만 사용

### 후보 B — 2008 금융위기 재구성형
“어떻게 미국 주택시장이 세계 금융시장을 무너뜨렸나”

- 장점: 정보량이 풍부함
- 단점: 역사 설명 페이지가 되어 그곳지금 고유 톤이 약해짐
- 판정: 배경 설명으로만 사용

### 후보 C — 집단착각 / 심리 미스터리형
“모두가 같은 방향을 볼 때, 왜 소수만 숫자를 믿었나”

- 장점:
  - 영화의 캐릭터 서사와 잘 맞음
  - 심리학적 재미가 있음
  - 그곳지금의 후킹형 장문과 잘 맞음
  - 마지막에 주가예측 서비스와 자연스럽게 연결됨
- **최종 선택**

---

## 5. 후킹페이지 본문 구조

### 1) 오프닝 — 문제는 숫자가 아니라 사람이었다

시장은 주택 가격이 계속 오를 것이라고 믿는다. 신용평가사는 안전하다고 하고, 은행은 상품을 계속 만들고, 투자자는 계속 산다.

그런데 마이클 버리는 사람들이 말하는 전망보다 대출 데이터를 직접 본다.

여기서 첫 질문:

> **모두가 괜찮다고 하는데 숫자만 위험하다고 말하면, 누구를 믿을까?**

### 2) 마이클 버리 — 예측이 아니라 “읽기”

버리를 초능력자처럼 묘사하지 않는다.

핵심은 그가 화려한 전망보다 기초 데이터를 집요하게 읽었다는 점이다.

- 변동금리 모기지
- 부실 대출
- 연체 가능성
- 상품의 기초자산

후킹:

> 미래를 본 게 아니라, 남들이 안 읽던 현재를 읽은 것 아닐까?

### 3) 시장이 틀렸는데도 버리가 먼저 괴로워진다

이 작품에서 중요한 건 “맞혔다”보다 “맞기 전까지 틀린 사람처럼 보였다”는 과정이다.

주택 대출의 질은 나빠지고 있는데 관련 상품 가격은 바로 무너지지 않는다. 투자자들은 버리를 의심하고 돈을 빼고 싶어 한다.

핵심 문장:

> **예측에서 가장 어려운 건 정답을 찾는 일이 아니라, 정답이 아직 증명되지 않았을 때 견디는 일일지도 모른다.**

### 4) 라스베이거스 — 집단착각이 가장 잘 보이는 장소

금융업계 관계자들이 모인 자리에서 모두가 같은 낙관을 반복한다.

여기서는 “전문가가 많으면 판단도 좋아지는가?”를 묻는다.

- 모두가 같은 데이터 공급망을 보고
- 같은 평가기관을 믿고
- 같은 인센티브를 갖고
- 서로의 판단을 서로가 근거로 삼으면

전문가 집단도 하나의 거대한 확증편향 시스템이 될 수 있다는 편집적 해석으로 연결한다.

### 5) 마크 바움 — 믿기 싫은 사실을 확인하러 간 사람

바움 팀은 단순히 숫자만 믿지 않고 현장을 확인한다.

영화에서 중요한 건 모델과 현실을 대조하는 태도다.

이를 현재의 데이터 서비스와 연결할 때도 동일 원칙을 둔다.

> 모델이 말한다고 끝이 아니다.  
> 데이터가 무엇을 보고 있고 무엇을 놓치는지도 같이 봐야 한다.

### 6) 가장 불편한 반전 — 그들이 맞으면 수많은 사람이 망한다

이 작품의 감정적 핵심.

“내 투자 판단이 맞는다”와 “좋은 일이 벌어진다”는 완전히 다르다.

금융위기가 현실이 되면 그들의 포지션은 돈을 벌 수 있지만, 동시에 집·직장·저축을 잃는 사람들이 생긴다.

따라서 이 콘텐츠는 “폭락을 맞혀 돈 번 천재”로 영웅화하지 않는다.

### 7) 결론 — 예측보다 더 어려운 질문

마지막 질문:

> **내 모델이 시장과 반대로 말하면, 나는 정말 그 모델을 믿을 수 있을까?**

이어지는 문장:

> 《빅쇼트》가 보여준 건 미래를 맞히는 마법이 아니다.  
> 숫자, 군중, 인센티브가 서로 다른 말을 할 때 어떤 신호를 믿을지 결정하는 문제에 가깝다.

그리고 하위 서비스로 연결한다.

> 영화에서는 2008년의 데이터를 봤다.  
> 그렇다면 지금의 데이터는 어떤 신호를 내고 있을까?

CTA:

**[주가예측 해보기]**

---

## 6. 주가예측 하위메뉴 — 제품 연결 구조

### 권장 메뉴명
- KO: 주가예측
- EN: Stock Prediction
- JA: 株価予測
- ZH: 股價預測

### 권장 URL

```text
/works/the-big-short/stock-prediction/
```

locale 구조가 현재 prefix 방식이면 기존 규칙을 그대로 따른다.

예:
- `/en/works/the-big-short/stock-prediction/`
- `/ja/works/the-big-short/stock-prediction/`
- `/zh/works/the-big-short/stock-prediction/`

### 이번 개발 범위

이번 Work 개발자는:
- 작품 상세 페이지에 `주가예측` 하위 메뉴/CTA가 들어갈 수 있는 구조를 마련
- child route 또는 연결 지점을 기존 routing 방식에 맞게 준비
- 추후 별도 개발팀의 예측 서비스가 들어갈 mount point / integration boundary 정의
- SEO/canonical/hreflang 충돌이 없도록 설계

이번 Work 개발자가 하지 않을 것:
- 실제 예측 모델 개발
- 시세 수집 API 선택
- 종목 추천
- 매매 신호 생성
- 백테스트 엔진 개발
- 계좌/증권사 연동

### 통합 전 placeholder 문구

> **주가예측 실험실 준비 중**  
> 영화 속 사람들은 시장의 집단 믿음과 다른 숫자를 봤습니다.  
> 이 메뉴에서는 실제 시장 데이터를 이용한 예측 실험을 제공할 예정입니다.

단, 운영 공개 전 사용자가 원하지 않으면 placeholder route는 검색 노출하지 않고 메뉴만 feature flag로 숨길 수 있다.

---

## 7. 주가예측 서비스와의 연결 원칙

이 메뉴는 “정답을 알려주는 AI”처럼 표현하지 않는다.

필수 원칙:
- 실험적 예측임을 명시
- 투자 권유/매수/매도 추천 문구 금지
- 개인 포트폴리오 기반 맞춤 권유 금지
- 자동매매 연결 금지
- 확률 또는 신호를 확정적 미래처럼 표현하지 않기
- 모델 버전, 기준 시각, 입력 데이터 기준을 향후 표시
- 성능을 공개할 때는 백테스트 구간과 한계를 같이 표시
- “재미/실험용이며 투자 판단을 대신하지 않는다”는 고지
- 작품 콘텐츠와 금융 도구의 시각적 연결은 하되, 영화 속 사례가 현재 모델 성능을 보증하는 것처럼 보이지 않게 함

---

## 8. 장소/여행 파트

《빅쇼트》는 월스트리트 영화지만 실제 제작은 뉴올리언스를 주요 베이스로 사용했고, 뉴욕·라스베이거스 등에서도 촬영됐다.

우선 검증 후보:

### FILMING 후보
1. New Orleans, Louisiana — 주요 촬영 베이스
2. Algiers, New Orleans — 일부 촬영
3. Houston St & Lafayette St, New York City — Mark Baum 전화 장면
4. New York State Department of Financial Services — Lehman Brothers 사무실 재현 장면
5. Las Vegas, Nevada — 금융업계 컨퍼런스/카지노 관련 시퀀스
6. Malibu, California — 욕조 설명 장면 관련 촬영지
7. The Black Horse, Fulmer, Buckinghamshire — 영국 펍 exterior

주의:
- 세부 장소별 장면관계는 개발 전 최종 교차검증
- city-level 정보와 exact spot을 섞지 않음
- 검증 근거가 약한 장소는 `FILMING` 확정하지 않음

1차 참고:
- IMDb Filming Locations: https://www.imdb.com/title/tt1596363/locations/
- Wikipedia filming section 및 해당 인용 원출처
- Metatake location map: https://metatake.net/film/locations/the-big-short-2015

---

## 9. 강한 Hidden Fact 후보

### Hidden Fact 1 — 월스트리트 영화인데 뉴올리언스가 여러 지역을 대신했다

Adam McKay 인터뷰에 따르면 뉴올리언스를 촬영 베이스로 사용하면서 도시의 고층건물, 카지노, 걸프 연안 개발지 등을 활용해 뉴욕·플로리다·북부 캘리포니아처럼 보이게 만들었다.

이건 그곳지금과 매우 잘 맞는 제작 비하인드다.

출처:
- Post Magazine interview  
  https://www.postmagazine.com/Publications/Post-Magazine/2015/December-1-2015/Oscar-Buzz-Paramount-Pictures-The-Big-Short.aspx

### Hidden Fact 2 — 실제 Lehman Brothers 건물이 아니라 규제기관 건물에서 재현

뉴욕주 금융서비스국 로비가 Lehman Brothers 사무실 장면 재현에 사용됐다.

개발 전 원출처 재검증 필수.

### Hidden Fact 3 — 일부러 “멋진 월스트리트 영화”처럼 찍지 않았다

McKay는 차갑고 세련된 금융권 이미지 대신 neo-documentary / vérité 느낌을 원했다고 설명했다.

따라서 흔들리는 카메라, 덜 세련된 사무실과 인물의 외형 자체가 작품의 메시지와 연결된다.

---

## 10. 경쟁/유관 콘텐츠 조사 요약

### 공식
- Paramount Pictures — 작품 기본정보, synopsis, cast

### 촬영지/장소
- IMDb filming locations
- Metatake
- MovieMaps / 유사 촬영지 DB

### 금융 설명 콘텐츠에서 흔한 것
- MBS / CDO / CDS 설명
- Michael Burry가 어떻게 금융위기를 예측했나
- 2008 금융위기 요약
- 영화 속 유명 설명 장면 정리

### 영향력 있는 YouTube 예시
- New Money — “How Did Michael Burry Predict the 2008 Housing Bubble?” (약 295만 조회 확인)
- Margot Robbie finance explanation scene 업로드 (200만+ 조회 확인)
- The Big Short / 2008 crisis 설명형 영상 다수

### 콘텐츠 공백

대부분은 “버리가 무엇을 봤나”를 설명한다.

그곳지금은 한 단계 옆으로 간다.

> **왜 같은 시장에 있던 수많은 전문가들은 그 데이터를 보고도 행동하지 않았나?**

즉 금융상품 강의보다 **집단심리 + 장소 + 영화 서사 + 예측 서비스**를 연결한다.

---

## 11. 대표 비주얼 기획

영화 스틸을 무단 복제하기보다 editorial illustration을 우선 검토한다.

권장 5장:

1. **고독한 데이터 분석가**
   - 수많은 사람이 상승 화살표를 보는 동안 한 사람만 대출 데이터의 균열을 보는 장면
2. **무너지는 Jenga 금융상품**
   - MBS → CDO → 파생 구조를 상징하는 탑
3. **라스베이거스 집단착각**
   - 화려한 컨퍼런스와 같은 방향을 보는 군중
4. **맞았지만 너무 이른 사람**
   - 모델 신호는 빨간데 시장 가격은 계속 올라가는 시간차 표현
5. **영화 → 주가예측 서비스 브리지**
   - 영화 속 데이터 시트가 현대적인 예측 대시보드로 이어지는 개념 이미지

실제 제작은 별도 이미지 작업으로 진행한다.

---

## 12. 모바일 퍼스트 UX

### 390px 기준 첫 2스크린
1. 작품명
2. 후킹 제목
3. 2~3줄 intro
4. CTA:
   - 촬영지 보기
   - 주가예측

기존 Work Detail의 `map / quiz` 구조를 무조건 복제하지 않는다.

이 작품의 핵심 참여 CTA는:
1. **주가예측**
2. 촬영지/지도

Quiz는 이번 파일럿에서는 우선순위를 낮춘다.

### 본문
- 금융 용어가 길어지지 않게 glossary chip 또는 짧은 펼침 설명 사용
- 한 문장씩 세로로 쪼개는 과도한 모바일 문체 금지
- 심리 파트와 금융 파트를 시각적으로 구분
- “MBS / CDO / CDS”는 독자가 원하면 펼쳐보는 보조 설명으로 둔다

---

## 13. Quiz Gate

**초기 파일럿에서는 DEFER 권장.**

이유:
- 이번 작품의 인터랙션 핵심은 Quiz보다 `주가예측` 진입이다.
- Quiz와 주가예측을 동시에 강한 CTA로 두면 사용자의 다음 행동이 분산된다.
- 향후 콘텐츠 성과가 Tier A/B가 되면 20문제 Quiz 추가 검토.

따라서 공용 스킬의 20문제 기준에는 이번 파일럿이 **PASS WITH GAPS**로 기록된다.

---

## 14. 데이터 규모 목표와 예외

공용 스킬에는 등장인물/장소 100개 이상 목표가 있으나, 본 작품에서 숫자를 채우기 위해 허위/주변 데이터를 대량 생성하지 않는다.

### 등장인물
- 핵심/조연/공식 크레딧 중심으로 검증 가능한 최대치
- 100명 미달 예상
- 부족 사유를 최종 기획/QA에 기록

### 장소
- 실제 FILMING + STORY + SET + HISTORY + RECOMMENDATION으로 합리적 확장 가능
- 단, 100개를 채우기 위해 뉴욕의 일반 금융 명소를 무관하게 붙이지 않는다
- 작품과 실제 관계가 있는 장소를 우선

---

## 15. SEO 방향

### KO
- 빅쇼트 실화
- 빅쇼트 뜻
- 빅쇼트 금융위기
- 빅쇼트 마이클 버리
- 빅쇼트 CDO
- 빅쇼트 촬영지
- 빅쇼트 해석
- 빅쇼트 주가 예측
- 금융위기 영화

### EN
- The Big Short explained
- The Big Short filming locations
- Michael Burry housing crisis
- The Big Short CDO explained
- psychology of The Big Short
- herd behavior financial markets

### JA
- マネー・ショート 解説
- マネー・ショート 実話
- マネー・ショート ロケ地
- マイケル・バーリ

### ZH
현재 사이트의 `zh-Hant` 정책 유지.
- 大賣空 電影解析
- 大賣空 真實事件
- 大賣空 拍攝地
- Michael Burry / 麥可・貝瑞 관련 현지 검색표기는 번역 단계에서 검증

---

## 16. 다국어 우선순위

권장:
1. KO — 기본 원고
2. EN — 글로벌 IP / 영어 검색 수요 때문에 동시 우선
3. JA
4. zh-Hant

runtime 자동번역은 사용하지 않는다.
후킹 문장은 직역보다 현지화한다.

---

## 17. 개발 범위

### 포함
- 신규 Work `the-big-short` 등록
- Work Detail / Hooking content
- 검증된 실제 촬영지 데이터
- Map 연결
- Hidden Facts
- locale 구조
- SEO / canonical / hreflang / sitemap
- 검색/작품 목록 등록
- `주가예측` 메뉴 및 향후 서비스 통합 boundary
- stock-prediction child route 설계 또는 feature-flagged scaffold

### 제외
- 주가예측 엔진
- 실시간 시세/API
- 데이터베이스/모델 학습
- 투자추천 로직
- 자동매매
- 증권계좌 연결
- 유료 데이터 계약
- 운영 배포

---

## 18. 개발자가 먼저 확인할 것

1. 최신 `main`
2. `AGENTS.md`
3. `docs/PROJECT_STATE.md`
4. `docs/design/WORK_DETAIL_HOOKING_V1.md`
5. `docs/growth/CONTENT_PRODUCTION_PIPELINE_V1.md`
6. `skills/geogotjigeum-content/`
7. 최근 신규 Work의 registry/source/generator 패턴
8. `/works/{slug}/quiz/`와 같은 child route 구현 패턴
9. `주가예측` child route가 canonical/hreflang/sitemap에 미치는 영향
10. 별도 예측 개발팀과 연결하기 가장 단순한 mount 방식

---

## 19. 개발 위험도 / Lane

### 콘텐츠 본체
**FAST LANE 가능**
- 신규 Work 추가
- verified location
- editorial
- SEO/i18n
- 기존 구조 안에서의 메뉴/CTA

### 주가예측 실제 서비스 통합
**별도 Approval / Integration Gate**
- 외부 API
- 유료 시세 데이터
- 모델 서버
- 개인정보
- 증권 서비스 연동
- 대규모 routing/infra 변경

현재 단계에서는 예측 엔진 없이 **연결 규격만 준비**한다.

---

## 20. Definition of Done

- [ ] `the-big-short` Work ID/slug 충돌 확인
- [ ] 작품 기본정보 공식 출처 검증
- [ ] 심리형 후킹페이지 구현
- [ ] 금융용어 과잉설명 없이 읽히는 구조
- [ ] 실제 촬영지와 극중 장소 구분
- [ ] Hidden Fact 1~3개 source traceability
- [ ] Map 정상
- [ ] `주가예측` CTA/메뉴 위치 확인
- [ ] stock-prediction child route 또는 feature flag scaffold 준비
- [ ] 예측 엔진 코드 없음
- [ ] “투자 권유가 아닌 실험” 고지 구조 준비
- [ ] KO/EN/JA/ZH locale leak 0
- [ ] canonical/hreflang/sitemap 정상
- [ ] 360/390/430px overflow 0
- [ ] 1440px 정상
- [ ] build error 0
- [ ] 다른 Work regression 없음
- [ ] production deploy 하지 않음

---

## 21. 최종 개발 지시 한 줄

**《빅쇼트》를 ‘금융위기를 맞힌 천재들의 영화’가 아니라 ‘모두가 같은 믿음을 공유할 때 숫자를 믿는 일이 왜 어려운가’를 다루는 심리형 콘텐츠로 신규 등록하고, 작품 하위에 별도 개발 중인 `주가예측` 서비스가 들어갈 child route/menu/integration boundary를 준비하라. 예측 엔진 자체는 구현하지 말고, 작품·촬영지·SEO·다국어·모바일 QA까지 완료하라.**

---

## 22. Research Log

검증일: 2026-09-18

### 공식
- Paramount Pictures — The Big Short
  - https://www.paramountpictures.com/movies/the-big-short

### 촬영/제작
- IMDb — filming locations
  - https://www.imdb.com/title/tt1596363/locations/
- Post Magazine — Adam McKay interview / production approach
  - https://www.postmagazine.com/Publications/Post-Magazine/2015/December-1-2015/Oscar-Buzz-Paramount-Pictures-The-Big-Short.aspx
- Metatake — mapped filming-location reference
  - https://metatake.net/film/locations/the-big-short-2015

### 콘텐츠 경쟁/관심 신호
- New Money — How Did Michael Burry Predict the 2008 Housing Bubble?
- The Big Short finance-term explanation clips / crisis explanation videos
- 상세 조회수·게시상태는 개발/콘텐츠 최종 제작 전 재확인
