# Scene Package Schema v1

Date: 2026-08-31
Status: **PLANNING CONTRACT — CONTENT TEAM → DEVELOPER**

## 1. 목적

Scene Package는 기획자가 대표 장면 콘텐츠와 이미지를 GitHub에 완성해 두고, 개발자가 별도 콘텐츠 판단 없이 Work/Place 페이지에 연결할 수 있게 하는 인수인계 단위다.

파일럿은 5작품 × 3장면 = 총 15 package다.

## 2. 필수 필드

각 scene package는 최소 아래 정보를 가진다.

```yaml
scene_id: odyssey-scene-01
work_id: odyssey
place_id: <existing canonical place id or slug>
scene_title_ko: <짧은 장면 제목>
scene_description_ko: <1~3문장 장면 설명>
relationship: FILMED
image_path: /assets/scenes/odyssey/odyssey-scene-01.webp
image_type: licensed_photo
alt_ko: <이미지의 의미를 전달하는 자연스러운 alt>
source_url: <source URL or internal provenance note>
license: <license / generated / original>
attribution: <필요 시 표기>
why_this_place_ko: <2~4문장>
story_note_ko: <optional>
hidden_place_note_ko: <optional>
verified_at: 2026-08-31
status: READY
```

## 3. relationship 허용값

v1에서는 다음만 사용한다.

- `FILMED` — 해당 장면/작품이 실제로 그 장소에서 촬영됐다는 근거가 충분함
- `EXPERIENCE` — 공식 체험/전시/세트/공식 방문 경험
- `STORY-RELATED` — 작품의 이야기/배경과 관련되지만 실제 촬영이라고 단정할 수 없음
- `INSPIRATION` — 작품/장면의 모티프·영감·역사적 연관이 확인됨
- `UNVERIFIED` — 유력하나 현재 검증 불충분

`UNVERIFIED` package는 v1 기본 UI에서 대표 장면으로 노출하지 않는다. 기획 검토용으로만 유지할 수 있다.

## 4. 이미지 타입

허용:
- `licensed_photo`
- `original_photo`
- `original_illustration`
- `generated_illustration`

금지/보류:
- `copyrighted_screenshot_unlicensed`
- `unknown_license`
- `watermarked_asset`

## 5. 파일명 규칙

```text
site/assets/scenes/<work_id>/<scene_id>.webp
```

예:
```text
site/assets/scenes/odyssey/odyssey-scene-01.webp
site/assets/scenes/breakingbad/breakingbad-scene-02.webp
```

파일명은 영문 소문자/숫자/하이픈만 사용한다.

## 6. 이미지 권장 규격

- WebP
- 기본 16:9
- 1600×900 이하 권장
- 약 100~300KB 목표
- 동일 이미지 중복 업로드 금지
- 실제 표시 크기보다 지나치게 큰 원본 금지

## 7. alt text 규칙

alt는 SEO 키워드 나열이 아니라 이미지 의미를 설명한다.

좋음:
`뉴멕시코 사막과 RV가 보이는 Breaking Bad 장면 연상 일러스트`

나쁨:
`브레이킹배드 촬영지 미국 여행 뉴멕시코 촬영장소 명소`

## 8. 출처/라이선스 기록

각 이미지에 반드시 아래 중 하나가 있어야 한다.

### 외부 사용허가 이미지
- source URL
- 라이선스 명칭
- attribution 필요 여부

### 자체 제작
- `source_url: internal`
- `license: original`

### 생성 이미지
- `source_url: generated`
- 사용 도구/제작 메모를 provenance에 남길 수 있음
- 원작 프레임·배우 얼굴을 그대로 복제하려는 프롬프트는 사용하지 않음

## 9. 장면 선정 기준

대표 장면은 아래를 우선한다.

1. 작품 팬이 기억하기 쉬움
2. 실제 Place와 연결 가능
3. 장소 자체의 이야기가 있음
4. 이미지로 장소 분위기를 전달 가능
5. 같은 작품의 3개 장면이 서로 다른 장소/맥락을 보여줌

장면을 유명하다는 이유만으로 선택하지 않는다. 실제 장소와의 연결이 약하면 제외한다.

## 10. Why This Place? 작성 기준

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

## 11. 선택 필드

`story_note_ko`
- 장면의 서사 맥락
- 스포일러가 있으면 UI에서 표시 여부를 개발자가 구분할 수 있게 별도 flag 추가 가능

`hidden_place_note_ko`
- 실제 장소의 역사/비하인드/숨은 이야기
- 검증 출처가 있을 때만 작성

## 12. READY 조건

package는 아래를 모두 만족해야 `status: READY`가 된다.

- scene/work/place id 확정
- relationship 확정
- 이미지 repo 업로드 완료
- 이미지 license/source 검증 완료
- alt 작성 완료
- scene description 완료
- Why This Place 완료
- Place 연결 확인

개발자는 `READY`가 아닌 package를 본문에 임의 노출하지 않는다.

## 13. manifest 구현 방식

기획자는 위 필드 구조를 유지한다.

실제 runtime manifest 파일 형식(JSON/JS module 등)은 개발자가 현재 generator/source-of-truth 구조를 audit한 뒤 가장 작은 변경으로 결정한다.

중요:
- generated HTML을 canonical source로 삼지 않는다.
- 기존 `contentmap_*` 데이터 흐름을 불필요하게 복제하지 않는다.
- standalone scene module 하나로 해결 가능하면 대규모 data-model migration을 하지 않는다.
- 대규모 migration이 필요하면 `NEEDS DECISION`으로 멈춘다.
