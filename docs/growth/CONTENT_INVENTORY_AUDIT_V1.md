# 그곳지금 Content Inventory Audit v1

## Status
**INITIAL AUDIT — DATA-GROUNDED, NOT A CLAIM OF FULL MANUAL REVIEW OF EVERY PAGE**

이 문서는 현재 저장소 구조와 2026-08-25 Search Console 기준선을 바탕으로 만든 1차 진단이다. 42개 작품 모두의 문장 품질·사실관계·모바일 화면을 수작업으로 재검수했다는 뜻은 아니다. 실제 성과 데이터가 있는 자산을 먼저 분류하고, 나머지는 후속 자동/수동 점검 대상으로 둔다.

## 1. 현재 작품 인벤토리

`site/works/`에서 확인되는 작품 ID:

`breakingbad, bridgerton, byakuya, coffeeprince, conanhighway, daejanggeum, daemang, dokkaebi, emilyinparis, gameofthrones, glory, gwandong, harrypotter, hope, isatong, jikji, kdemonhunters, kimetsu, kiminonawa, littleforest, lotr, moneyheist, namiya, odyssey, onepiece, pachinko, poksshak, prada2, priests, santi, sonyeon, spiderman, squidgame, strangerthings, sunshine, suspectx, suzume, taebaek, wangsanam, wednesday, wintersonata, woo`

총 42개 작품 디렉터리 기준.

## 2. 데이터 자산의 강점

현재 구조는 단순 글 42개보다 훨씬 강하다.

- 작품별 work page
- 다수 작품별 locations module
- 다수 작품별 people module
- 통합 `contentmap_data.js`
- 작품/장소/지역 generator
- culture 데이터
- relation/universe 실험 자산
- KR/EN/JA/ZH 경로
- 폭싹속았수다 quiz pilot

따라서 앞으로의 경쟁력은 **글을 더 많이 쓰는 것보다 이미 있는 관계 데이터를 검색·탐색 구조로 묶는 것**에서 나온다.

## 3. A Tier — GSC 기반 즉시 개선

아래는 2026-08-25 GSC export에서 평균순위가 대체로 7~15위권으로 확인된 자산이다.

| 우선 | 작품/ID | 노출 | 클릭 | 평균순위 | 1차 액션 |
|---|---|---:|---:|---:|---|
| A1 | Harry Potter | 67 | 6 | 7.22 | 1페이지 유지+CTR/장소 내부링크 강화 |
| A1 | Stranger Things | 61 | 6 | 7.97 | `기묘한 이야기 촬영지` 의도 강화 |
| A1 | 삼체 (`santi`) | 57 | 3 | 8.72 | 촬영지/실제 배경 질문형 H2 강화 |
| A1 | `daemang` | 52 | 4 | 8.98 | 실제 query 확인 후 snippet 강화 |
| A1 | 미스터 션샤인 (`sunshine`) | 57 | 3 | 9.54 | 국내 장소/지역 그래프 강화 |
| A1 | Breaking Bad | 135 | 5 | 10.13 | 최우선: `앨버커키 브레이킹 배드` 집중 |
| A1 | `odyssey` | 71 | 4 | 10.70 | query 확인 후 title/H2 조정 |
| A2 | 더 글로리 | 80 | 3 | 13.80 | 장소별 롱테일 확대 |
| A2 | One Piece | 98 | 4 | 13.81 | `원피스 지역/지도` 의도 강화 |
| A2 | 폭싹 속았수다 | 94 | 8 | 14.71 | 제주/고창 장소+퀴즈 연동 강화 |
| A2 | Money Heist | 58 | 4 | 14.76 | 촬영지/도시 롱테일 강화 |

추가 query 신호:
- `브리저튼 촬영지` 평균 7.60
- `白夜行 舞台` 평균 9.88

따라서 `bridgerton`, `byakuya`는 페이지 집계와 별개로 **query-driven A/B 경계 자산**으로 본다.

## 4. B Tier — 서비스 정체성과 데이터 자산이 강한 후보

GSC 상세 성과표에는 두드러지지 않았지만, 장소/팬덤/서비스 적합성 때문에 보강 가치가 높은 후보:

- `dokkaebi` — 대표 K-drama + 국내 여행 연결
- `pachinko` — 한국/일본/이민사/지역 관계 확장성이 큼
- `squidgame` — 글로벌 K-content 대표성
- `kdemonhunters` — 매우 큰 글로벌 관심, 실제 촬영지가 아니라 실제 장소/문화 모티브라는 구분 필수
- `isatong` — 2026 현행작이며 일본·한국·캐나다·이탈리아의 글로벌 location 서사가 강함
- `daejanggeum` — 한류 에버그린 + 문화/음식/지역 연결
- `wintersonata` — 일본어권 에버그린 검색 잠재력
- `coffeeprince` — 서울 성지순례형 장소 검색 잠재력
- `littleforest` — 지역/음식/슬로트래블 연결
- `wangsanam` — 현재 구축된 풍부한 데이터 활용 여부 점검

이 Tier는 실제 GSC query/page 데이터를 추가 추출해 A 승격 여부를 결정한다.

## 5. C Tier — 글로벌 에버그린 / 경쟁 강함

- Game of Thrones
- Lord of the Rings
- Spider-Man
- Emily in Paris
- Wednesday
- Demon Slayer (`kimetsu`)
- Your Name (`kiminonawa`)
- Suzume

장소성이 강한 작품도 있으나 글로벌 경쟁이 매우 크다. 한국어 사이트에서 단순 `작품명 촬영지`로 싸우기보다 **특정 도시/장면/건물/여행코스 롱테일**로 접근해야 한다.

## 6. D / RESEARCH NEEDED

다음은 삭제 대상이 아니라 **현재 증거가 부족해 투자 우선순위를 유보**하는 그룹이다.

- `hope`
- `gwandong`
- `jikji`
- `prada2`
- `priests`
- `sonyeon`
- `suspectx`
- `taebaek`
- `woo`
- `conanhighway`
- 기타 위 A/B/C에서 명시되지 않은 자산

후속 점검에서 다음 중 하나가 확인되면 상향한다.
- GSC 노출/순위
- 충분한 장소 데이터
- 현재 화제성
- 일본/영어권 롱테일
- 특정 지역 여행 허브와 강한 연결

## 7. 공통 품질 체크리스트

각 작품별로 다음 10개를 0/1 또는 0~2점으로 점검한다.

1. 검색 의도가 title에 드러나는가
2. description이 줄거리보다 장소/여행 가치를 설명하는가
3. H1/H2가 실제 query와 자연스럽게 연결되는가
4. 핵심 실제 장소가 3개 이상 명확한가
5. 장소별 현재 상태/촬영 관계가 검증돼 있는가
6. 작품→장소→지도 링크가 끊기지 않는가
7. 장소→관련 작품/지역 역링크가 있는가
8. 모바일에서 360/390/430 가독성이 확보되는가
9. KR/JA/EN/ZH 중 투자할 언어가 명확한가
10. 숨은 이야기/비하인드가 사실 검증된 형태로 1개 이상 있는가

## 8. 다음 감사(audit) 작업

1. GSC raw export 확보 또는 Search Console 연결 가능 시 page/query 전체 매칭
2. 42개 작품별 장소 수 / 인물 수 / 언어 준비상태 자동 산출
3. title/description/H1 길이 및 중복 검사
4. 내부링크 degree 산출
5. quiz readiness 산출
6. A/B/C/D 자동 초안 후 상위 15개 수동 검토

이 결과는 `CONTENT_PRIORITY_30_2026H2.md`의 우선순위를 매 2~4주 재조정하는 근거가 된다.
