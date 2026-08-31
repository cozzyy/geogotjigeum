# 그곳지금 Phase E — Story & Scene Pilot v1

Date: 2026-08-31
Status: **PLANNED / DEVELOPER HANDOFF PREPARED / DO NOT START UNTIL RELEASED**
Parent: Issue #31 Content Growth Engine v1

## 0. 목적

Phase E의 목표는 그곳지금을 단순한 `작품 → 촬영지 목록`에서 한 단계 확장해,

`작품 → 기억나는 장면 → 실제 장소 → 왜 가볼 만한지 → 지도/다음 장소`

로 이어지는 미디어 경험으로 만드는 것이다.

이번 파일럿에서는 새로운 대형 기능을 만들지 않는다. 기존 Work/Place 페이지에 다음 두 블록만 추가한다.

1. **Scene Context v1 — 이곳에서 나온 장면**
2. **Why This Place? — 여기, 왜 가볼 만해?**

핵심 원칙은 **콘텐츠/이미지 선택은 기획자가 책임지고, 개발자는 GitHub에 준비된 scene package를 정확히 렌더링하는 역할만 맡는 것**이다.

---

## 1. 실행 시점

Phase E 코딩은 아래가 모두 충족된 뒤 시작한다.

1. Stage C Existing Winner Growth Sprint 완료
2. Issue #37 `繁中 Pilot v1` 완료 또는 PM/사용자가 Phase E 선행을 명시적으로 승인
3. 최신 `main` 기준 shared generator / Work / Place 충돌 확인
4. 기획자가 아래 5개 작품의 **15개 Scene Package**를 GitHub에 모두 추가
5. 이미지 source/license/alt/Place 연결 검수 완료

기획 패키지가 완성되기 전에는 개발자가 이미지나 장면을 임의로 찾거나 생성하지 않는다.

---

## 2. 파일럿 대상 5작품

- `odyssey`
- `breakingbad`
- `byakuya`
- `strangerthings`
- `poksshak`

작품당 대표 장면 3개, 총 **15개 Scene Package**를 만든다.

선정 이유:
- GSC 또는 기존 성장 트랙에서 중요도가 높은 작품
- 실제 장소/장면 연결을 설명하기 좋음
- 한국/일본/글로벌 작품을 섞어 UI/콘텐츠 범용성 검증 가능

---

## 3. Scene Context v1

### Work Detail
Work 페이지에 `장면으로 다시 보기` 또는 이에 준하는 섹션을 추가한다.

각 작품당 3개의 Scene Card를 보여준다.

카드 최소 정보:
- 대표 장면 이미지 1장
- 짧은 장면 제목
- 1~3문장의 장면 설명
- 관계 배지: `FILMED` 또는 `STORY-RELATED` 등
- 연결 Place 이름
- Place Detail로 가는 crawlable HTML 링크

권장 위치:
- Hero/intro 이후
- 전체 장소 목록보다 앞

### Place Detail
연결된 핵심 Place에는 다음 블록을 추가한다.

**이곳에서 나온 장면**
- 대표 이미지
- 장면 설명
- 작품명/관계 배지
- Work Detail 링크

권장 위치:
- 장소 정체성 + 지도 CTA 이후
- 긴 여행정보/팁보다 앞

### Phase E v1에서 하지 않는 것
- Scene 전용 URL 생성
- Scene 검색/필터
- 방문 인증
- 배지/포인트
- ShotSync/카메라 기능
- 로그인/컬렉션

Scene은 기존 Work/Place SEO를 강화하는 **본문 콘텐츠 단위**이며 별도 URL을 만들지 않는다.

---

## 4. Why This Place?

15개 대표 장면과 연결된 핵심 Place를 우선 대상으로 한다.

각 대상 Place에 다음을 추가한다.

### 제목
`여기, 왜 가볼 만해?`

### 본문
- 2~4문장
- 친구에게 이야기하듯 자연스럽게
- 주소/교통정보 반복이 아니라 **왜 기억할 만한 장소인지** 설명
- 과장/허위 금지

가능하면 아래 중 1~2개를 함께 제공한다.
- `작품 속 이야기`
- `실제 장소의 숨은 이야기`

이 두 항목은 필수 숫자 채우기가 아니다. 검증 가능한 내용이 있을 때만 노출한다.

---

## 5. 기획자와 개발자 역할 분리

### 기획자 책임
- 대표 장면 15개 선정
- 장면 설명 작성
- 연결 Place 확정
- 관계 분류 확정
- 이미지 선정/제작
- 이미지 source/license/attribution 기록
- alt text 작성
- `Why This Place?` 작성
- story/hidden note 검증
- manifest 작성 및 GitHub 반영

### 개발자 책임
- scene package를 읽는 canonical source/generator 연결
- Work/Place UI 구현
- 이미지 반응형/성능/접근성 처리
- 내부링크 구현
- mobile QA
- 기존 SEO/i18n/GA4 무결성 보존

### 개발자가 하지 않는 것
- 인터넷에서 임의로 영화 스크린샷 수집
- 장면 선정
- 관계 유형 판단
- 사실/라이선스가 불명확한 이미지를 임의 채택
- 콘텐츠 빈칸을 임의 문구로 채움

---

## 6. 이미지 원칙

권장 우선순위:
1. 사용권리가 명확한 실제 장소 사진
2. 기획자가 직접 만든 원본 일러스트
3. 저작권 침해 위험이 낮은 생성형 일러스트

피해야 할 것:
- Netflix/방송사/영화의 캡처 화면을 무단 저장해 GitHub에 업로드
- 워터마크 이미지
- 출처/라이선스 불명 이미지
- 배우 얼굴이나 원본 프레임을 그대로 복제하는 목적의 생성 이미지

파일 권장:
- WebP
- 16:9 기본
- 권장 1600×900 이하
- 1장 약 100~300KB 목표
- 초고해상도 원본은 repo에 넣지 않음

예상 경로:
`site/assets/scenes/<work_id>/<scene_id>.webp`

경로는 개발 시작 전 repo audit에서 충돌 여부를 확인하고 확정한다.

---

## 7. 언어 전략

Phase E v1 콘텐츠 원본은 **KR 우선**이다.

- KO 페이지: 15개 package 전체 노출
- EN/JA/ZH: 해당 locale의 scene text가 준비된 경우만 노출
- 번역이 없으면 한국어를 그대로 fallback해서 보여주지 말고 block을 숨긴다

이미지는 locale 공용 사용 가능하지만 alt/scene text는 언어별 준비가 필요하다.

---

## 8. SEO / 내부링크 원칙

- 새 Scene URL 생성 금지
- 기존 Work/Place canonical 유지
- hreflang/x-default 유지
- sitemap URL 수를 늘리기 위한 작업이 아님
- Scene 설명은 검색엔진이 읽을 수 있는 visible HTML이어야 함
- Work → Scene → Place 링크는 `<a href>` 기반 crawlable link
- Place → Scene → Work 역시 동일
- title/H1을 Scene 때문에 전면 재작성하지 않음

목적은 **검색 중인 기존 페이지의 콘텐츠 깊이와 사용자 만족도를 높이는 것**이다.

---

## 9. UI 원칙

새로운 디자인 시스템을 만들지 않는다. 현재 DS/Work Detail/Place Detail 스타일을 따른다.

### Desktop
- Work: 3개 Scene Card를 3열 또는 기존 카드 폭에 맞는 안정적 grid
- Place: 이미지 + 텍스트 한 블록

### Mobile
- 360/390/430px 기준 1열
- 이미지 잘림/가로 overflow 금지
- 텍스트가 이미지 위에 과도하게 겹치지 않음
- tap target 44px 이상

### 성능
- width/height 또는 aspect-ratio 명시
- fold 아래 이미지는 `loading="lazy"`
- WebP 사용
- 이미지 실패 시 레이아웃 붕괴 금지

---

## 10. 성공 판단

파일럿 배포 후 14일/28일 기준으로 본다.

SEO:
- 대상 Work/Place impressions
- clicks
- CTR
- average position

행동:
- Scene → Place 클릭
- Place → Work 클릭
- Map CTA 이동
- 대상 페이지 체류/연속 탐색 신호(수집 가능 범위)

v1의 목적은 Scene 자체 트래픽이 아니라 **기존 검색 유입이 더 깊게 탐색하는지** 확인하는 것이다.

---

## 11. 완료 조건

- 5작품 × 3장면 = 15 Scene Package 렌더링
- 각 package에 이미지/설명/Place/관계/alt/source/license 존재
- 연결 핵심 Place에 `Why This Place?` 존재
- 잘못된 FILMED 표기 없음
- broken image/link 0
- KO에서 완전한 경험
- 미번역 locale에서 한국어 fallback 0
- canonical/hreflang/sitemap/GA4 회귀 없음
- 360/390/430 QA 완료
- PR + QA report + local deployment ZIP 준비
- 운영 배포는 사용자 승인 전 금지

## 12. NEEDS DECISION 조건

아래는 개발자가 임의 결정하지 않는다.
- 새로운 URL architecture가 필요함
- Scene 도입 때문에 shared data-model 대규모 migration 필요
- 사용 이미지의 저작권/라이선스 판단이 불명확함
- 기존 검색 상위 URL의 구조 변경 필요
- Scene과 Place 관계가 사실상 검증되지 않음

그 외의 작은 template/CSS/generator 연결은 Fast Lane으로 처리한다.
