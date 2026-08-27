# 배포 ZIP 인수인계 규칙

## 목적
현재 그곳지금 운영 배포는 사용자가 로컬 ZIP을 직접 배포하는 방식이다. 개발자는 개발·테스트가 끝난 뒤 배포 가능한 ZIP을 로컬에 생성하고 정확한 경로를 사용자에게 전달한다.

GitHub는 코드·문서·Issue·PR의 Single Source of Truth이고, ZIP은 **배포용 전달물**이다.

## 현재 배포 방식
- 기본 배포 ZIP 위치: 사용자의 로컬 지정 폴더(현재 `C:\새 폴더` 계열)
- Google Drive 자동 업로드는 현재 사용하지 않는다.
- Claude가 Google Drive를 직접 사용할 수 없으므로 Drive 업로드를 완료 조건으로 요구하지 않는다.
- 사용자가 필요할 때 로컬 ZIP을 직접 배포한다.

권장 파일명:
`geugotjigeum_YYYY-MM-DD_issue-N.zip`

예:
`geugotjigeum_2026-08-27_issue-17.zip`

## Claude 개발 완료 시 필수 인수인계
개발·테스트가 끝나면 다음 순서로 처리한다.

1. 최신 `main` 또는 작업 branch 기준을 확인한다.
2. 배포 가능한 사이트 ZIP을 생성한다.
3. ZIP 이름에 날짜와 Issue 번호를 포함한다.
4. 사용자가 지정한 로컬 폴더에 저장한다.
5. 관련 Issue/PR 또는 사용자 보고에 아래를 남긴다.
   - Issue 번호
   - commit SHA / branch / PR
   - 배포 ZIP 파일명
   - 로컬 파일 경로
   - 테스트 결과
   - 알려진 위험/주의사항
6. 사용자가 실제 운영 배포를 완료하기 전에는 `DEPLOYED`로 표시하지 않는다.
7. 사용자가 배포 완료를 알려주면 Issue에 `DEPLOYED`를 기록한다.

## 보고 예시

```text
READY TO DEPLOY
- Issue: #17
- Branch/Commit: issue-17-quiz-result-location-cards / <sha>
- Deploy ZIP: geugotjigeum_2026-08-27_issue-17.zip
- Local path: C:\새 폴더\geugotjigeum_2026-08-27_issue-17.zip
- Test: PASS
- Known risks: 모바일 실브라우저 QA 일부 제한
- Production deploy: NOT YET
```

## 중요한 원칙
- 배포 ZIP은 개발 소스의 기준본이 아니다. 소스의 기준본은 GitHub다.
- **ZIP을 먼저 배포했더라도 개발 소스는 반드시 GitHub branch/PR/main에 동기화한다.**
- ZIP만 수정하고 GitHub에 소스가 남지 않는 상태를 완료로 간주하지 않는다.
- 다른 Claude의 진행 중 branch를 덮어쓰지 않는다.
- ZIP 생성 과정에서 API key, secret, 개인 로컬 설정 파일이 포함되지 않았는지 확인한다.

## 현재 현실적인 흐름

`Issue → 개발/테스트 → GitHub branch/PR → 로컬 배포 ZIP 생성 → 사용자 직접 배포 → DEPLOYED 기록`

작은 Fast Lane 작업은 사용자 중간 승인 없이 개발/테스트/PR/ZIP 생성까지 진행할 수 있다.

## 향후 개선
소스와 배포 구조가 안정되면 다음을 검토한다.

`PR merge → 배포 artifact 자동 생성 → 사용자 배포`

장기적으로는 `main merge → 자동 deploy`로 전환하여 ZIP 수동 배포 자체를 없애는 것을 목표로 한다.
