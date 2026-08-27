# 배포 ZIP 인수인계 규칙

## 목적
개발이 로컬 PC 밖에서 끝나더라도 사용자가 외부/퇴근 후 다른 기기에서 배포할 수 있도록, 배포 가능한 ZIP을 Google Drive의 공용 위치에 보관한다.

GitHub는 코드·문서·Issue·PR의 Single Source of Truth이고, Google Drive는 **배포용 완성 ZIP 전달/보관 용도**로만 사용한다.

## Google Drive 배포 폴더
- 루트: `그곳지금/Deploy`
- READY: https://drive.google.com/drive/folders/10XRQsnxTJI9DRsm5LO1G4YTWK2w684AT
- ARCHIVE: https://drive.google.com/drive/folders/14rU_DS4amrRsrAxRfwzAgTnAL3MxK4gp

### READY
현재 배포 가능한 최신 ZIP을 둔다.

권장 파일명:
`geugotjigeum_YYYY-MM-DD_issue-N.zip`

예:
`geugotjigeum_2026-08-27_issue-10.zip`

가능하면 최신 배포본을 쉽게 찾도록 `CURRENT.zip` 이름의 복사본/최신본도 유지한다.

### ARCHIVE
이전 배포본을 보관한다. 새 ZIP이 READY에 올라가고 정상 배포가 끝나면 이전 배포본을 ARCHIVE로 이동한다.

## Claude 개발 완료 시 필수 인수인계
개발·테스트가 끝나면 다음 순서로 처리한다.

1. 최신 `main` 또는 승인된 branch 상태를 확인한다.
2. 배포 가능한 사이트 디렉터리/ZIP을 생성한다.
3. ZIP 이름에 날짜와 Issue 번호를 포함한다.
4. Google Drive 접근/업로드 권한이 있으면 `Deploy/READY`에 ZIP을 업로드한다.
5. Google Drive 업로드가 불가능하면 ZIP을 생성한 로컬 경로와 정확한 파일명을 보고하고, 사용자가 업로드할 수 있도록 멈춘다.
6. 관련 GitHub Issue 또는 PR에 아래를 기록한다.
   - 상태: `READY TO DEPLOY`
   - Issue 번호
   - commit SHA / PR
   - 배포 ZIP 파일명
   - Drive 링크 또는 로컬 파일 경로
   - 테스트 결과
   - 알려진 위험/주의사항
7. 사용자가 실제 배포를 완료하기 전에는 `DEPLOYED`로 표시하지 않는다.

## Issue/PR 보고 예시

```text
READY TO DEPLOY
- Issue: #10
- Commit/PR: <sha or PR link>
- Deploy ZIP: geugotjigeum_2026-08-27_issue-10.zip
- Drive READY: <link>
- Test: PASS
- Known risks: 없음
- Production deploy: NOT YET
```

## 중요한 원칙
- 배포 ZIP은 개발 소스의 기준본이 아니다. 소스의 기준본은 GitHub다.
- ZIP만 수정하고 GitHub에 반영하지 않는 작업은 금지한다.
- 운영 배포 전에 PR/승인 절차를 우선한다.
- 다른 Claude의 진행 중 branch를 덮어쓰지 않는다.
- ZIP 생성 과정에서 API key, secret, 개인 로컬 설정 파일이 포함되지 않았는지 확인한다.

## 향후 자동화
수동 흐름이 안정되면 다음 순서로 자동화한다.

`PR merge → 배포 ZIP 자동 생성 → Drive/Artifact 저장 → 사용자 승인/배포`

최종적으로는 `main merge → 자동 deploy`로 전환하여 ZIP 수동 배포 자체를 없애는 것을 목표로 한다.
