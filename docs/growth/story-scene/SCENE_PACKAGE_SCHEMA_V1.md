# Scene Package Schema v1.1

Date: 2026-08-31
Status: **PLANNING CONTRACT — CONTENT TEAM → DEVELOPER**

## 1. 목적

Scene Package는 기획자가 대표 장면/이야기 콘텐츠와 이미지까지 GitHub에 완성해 두고, 개발자가 별도 콘텐츠 판단 없이 Work/Place 페이지에 연결할 수 있게 하는 인수인계 단위다.

파일럿은 5작품 × 3개 = 총 15 package다.

중요: 모든 작품이 영상 장면만으로 구성되는 것은 아니다. 특히 소설 원작/배경 콘텐츠는 실제 촬영 장면처럼 보이면 안 되므로 `context_type`을 별도로 둔다.

## 2. 필수 필드

```yaml
scene_id: odyssey-scene-01
work_id: odyssey
context_type: SCREEN_SCENE
place_id: nestors_cave
proposed_place_id: null
scene_title_ko: <짧은 제목>
scene_description_ko: <1~3문장 설명>
relationship: FILMED
image_path: /assets/scenes/odyssey/odyssey-scene-01.webp
image_type: licensed_photo
alt_ko: <이미지의 의미를 전달하는 자연스러운 alt>
fact_source_urls:
  - <장면/작품-장소 관계를 검증한 출처>
image_source_url: <이미지 원본/라이선스 페이지>
license: <license / generated / original>
attribution: <필요 시 표기>
why_this_place_ko: <2~4문장>
story_note_ko: <optional>
hidden_place_note_ko: <optional>
verified_at: 2026-08-31
status: RESEARCHED
```

## 3. context_type 허용값

- `SCREEN_SCENE` — 영화/드라마/영상 작품의 특정 장면 또는 시퀀스와 실제 장소가 연결됨
- `STORY_SETTING` — 소설·원작·서사의 실제 배경/무대지만 영상 촬영지라고 단정하면 안 됨
- `ADAPTATION_FILMING` — 원작과 별개로 특정 영상판(드라마/영화)의 촬영이 검증된 장소

UI 기본 카피도 context에 따라 달라져야 한다.

| context_type | 기본 섹션 카피 예시 |
|---|---|
| `SCREEN_SCENE` | `이곳에서 나온 장면` |
| `STORY_SETTING` | `이곳과 연결된 이야기` |
| `ADAPTATION_FILMING` | `영상판은 여기서 찍혔다` |

모든 package를 억지로 `장면`이라고 부르지 않는다.

## 4. relationship 허용값

- `FILMED` — 해당 영상 장면/작품이 실제로 그 장소에서 촬영됐다는 근거가 충분함
- `EXPERIENCE` — 공식 체험/전시/세트/공식 방문 경험
- `STORY-RELATED` — 작품의 이야기/실제 배경과 관련되지만 촬영이라고 단정할 수 없음
- `INSPIRATION` — 작품/장면의 모티프·영감·역사적 연관이 확인됨
- `UNVERIFIED` — 유력하나 현재 검증 불충분

`UNVERIFIED` package는 v1 기본 UI에서 노출하지 않는다.

## 5. 상태값

- `RESEARCHED` — 장면/이야기 후보와 사실 출처가 정리됨
- `ASSET_SOURCE_VERIFIED` — 사용 가능한 이미지 원본과 라이선스가 확인됨
- `PLACE_REQUIRED` — 콘텐츠는 준비됐지만 연결할 canonical Place가 아직 없음/확정 안 됨
- `READY` — 이미지가 repo에 업로드되고 Place 연결까지 완료되어 개발자가 바로 렌더링 가능
- `BLOCKED` — 사실/저작권/구조 문제로 보류

`READY` 외에는 운영 UI에 노출하지 않는다.

## 6. 이미지 타입

허용:
- `licensed_photo`
- `original_photo`
- `original_illustration`
- `generated_illustration`

금지/보류:
- `copyrighted_screenshot_unlicensed`
- `unknown_license`
- `watermarked_asset`

## 7. 파일명 규칙

```text
site/assets/scenes/<work_id>/<scene_id>.webp
```

예:
```text
site/assets/scenes/odyssey/odyssey-scene-01.webp
site/assets/scenes/breakingbad/breakingbad-scene-02.webp
```

파일명은 영문 소문자/숫자/하이픈만 사용한다.

## 8. 이미지 권장 규격

- WebP
- 기본 16:9
- 1600×900 이하 권장
- 약 100~300KB 목표
- 동일 이미지 중복 업로드 금지
- 실제 표시 크기보다 지나치게 큰 원본 금지

세로 사진은 무리하게 중요한 피사체를 잘라 16:9로 만들지 말고, UI가 `object-fit`/초점 위치를 안전하게 처리할 수 있는지 먼저 확인한다.

## 9. alt text 규칙

alt는 SEO 키워드 나열이 아니라 이미지 의미를 설명한다.

좋음:
`뉴멕시코 앨버커키의 Twisters 외관. 브레이킹 배드에서 로스 포요스 에르마노스로 사용된 실제 촬영지`

나쁨:
`브레이킹배드 촬영지 미국 여행 뉴멕시코 촬영장소 명소`

## 10. 사실 출처와 이미지 출처를 분리한다

### fact_source_urls
작품-장소 관계, 장면, 에피소드, 촬영 사실을 검증한 출처다. 공식 제작사/방송사/필름커미션/관광기관/직접 인터뷰를 우선한다.

### image_source_url
실제 사용할 이미지의 원본/라이선스 페이지다. Wikimedia Commons 등 라이선스가 명확한 페이지를 기록한다.

이미지가 촬영지 사진이라고 해서 그 사진 자체를 `촬영 사실의 근거`로 쓰지 않는다.

## 11. 이미지 출처/라이선스 기록

### 외부 사용허가 이미지
- `image_source_url`
- 라이선스 명칭
- attribution
- 편집/크롭 시 라이선스 조건 확인

### 자체 제작
- `image_source_url: internal`
- `license: original`

### 생성 이미지
- `image_source_url: generated`
- 제작 provenance 기록 가능
- 원작 프레임·배우 얼굴을 그대로 복제하려는 프롬프트 금지

## 12. 장면/이야기 선정 기준

1. 작품 팬이 기억하거나 이해하기 쉬움
2. 실제 Place와 연결 가능
3. 장소 자체의 이야기가 있음
4. 이미지로 장소 분위기를 전달 가능
5. 같은 작품의 3개 package가 서로 다른 장소/맥락을 보여줌
6. 공식/신뢰 출처로 관계를 검증 가능

유명하다는 이유만으로 선택하지 않는다.

## 13. Why This Place? 작성 기준

길이: 2~4문장.

구성 권장:
1. 이 장소가 작품에서 왜 기억나는지
2. 실제 장소에서 발견할 수 있는 차이/매력
3. 가보고 싶은 이유 한 가지

말투:
- 친구에게 이야기하듯
- 과도한 정보 나열 금지
- 관광 홍보문구 금지
- 확인되지 않은 사실 금지

## 14. 선택 필드

`story_note_ko`
- 장면/서사의 맥락
- 스포일러가 크면 `spoiler: true` 같은 flag를 runtime manifest에서 추가 가능

`hidden_place_note_ko`
- 실제 장소의 역사/비하인드/숨은 이야기
- 검증 출처가 있을 때만 작성

`proposed_place_id`
- 아직 canonical Place가 없지만 제작 가치가 높은 경우 기획용으로만 사용
- status는 `PLACE_REQUIRED`
- 개발자가 임의로 URL을 생성하면 안 됨

## 15. READY 조건

- scene/work/context 확정
- place_id 확정 및 실제 canonical Place 존재
- relationship 확정
- fact source 검증 완료
- 이미지 repo 업로드 완료
- image license/source 검증 완료
- alt 완료
- scene/story description 완료
- Why This Place 완료
- Work↔Place 연결 확인

## 16. manifest 구현 방식

기획자는 위 필드 구조를 유지한다.

실제 runtime manifest 형식(JSON/JS module 등)은 개발자가 현재 generator/source-of-truth를 audit한 뒤 가장 작은 변경으로 결정한다.

중요:
- generated HTML을 canonical source로 삼지 않는다.
- 기존 `contentmap_*` 데이터 흐름을 불필요하게 복제하지 않는다.
- standalone scene module 하나로 해결 가능하면 대규모 migration 금지
- 대규모 migration이 필요하면 `NEEDS DECISION`
