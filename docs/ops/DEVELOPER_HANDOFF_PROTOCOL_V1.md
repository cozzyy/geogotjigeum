# Developer Handoff Protocol v1

Date: 2026-09-01
Status: ACTIVE
Purpose: Claude Developer 1 / Developer 2가 서로 다른 계정·세션을 사용해도 GitHub만으로 같은 작업을 이어갈 수 있게 한다.

## 1. Single Source of Truth
- 코드, 기획, 진행상태, 의사결정은 GitHub가 기준이다.
- 이전 Claude 대화내용이나 특정 PC의 로컬 상태를 전제로 작업하지 않는다.
- 로컬에만 존재하는 의미 있는 변경사항을 장시간 유지하지 않는다.

## 2. 작업 시작 규칙
모든 구현 작업은 아래 순서로 시작한다.
1. 관련 Issue와 최신 PM/Planner 댓글 확인
2. 현재 작업 branch 확인
3. `git status`로 working tree 상태 확인
4. 최신 remote 상태 동기화
5. 이미 완료된 작업을 다시 만들지 않고 최신 commit에서 이어간다.

## 3. Branch 규칙
- 큰 작업은 Issue/Phase별 전용 branch에서 진행한다.
- 한 branch에 서로 무관한 대규모 작업을 섞지 않는다.
- branch 이름은 목적이 드러나게 한다. 예: `wip/issue-40-story-scene`

## 4. Checkpoint 규칙
작업자는 아래 시점마다 commit + push를 남긴다.
- 의미 있는 하위 작업 완료 시
- 30~60분 이상 작업 후
- 토큰/세션 종료 가능성이 높을 때
- 다른 개발자에게 넘기기 전

미완성 상태라도 필요하면 `WIP:` commit을 허용한다. 최종 PR에서 squash 가능하다.

## 5. HANDOFF CHECKPOINT 형식
Issue 최신 댓글에 아래 형식으로 남긴다.

```md
## HANDOFF CHECKPOINT
Branch: `...`
Latest commit: `...`

### 완료
- ...

### 진행 중
- ...

### 아직 안 함
- ...

### 현재 blocker / NEEDS DECISION
- ...

### 다음 개발자가 할 일
1. ...
2. ...

### 변경하면 안 되는 것
- URL/canonical/hreflang 등 기존 보호대상
```

## 6. Developer 2 인수인계 규칙
새 개발자는 다음만으로 시작 가능해야 한다.
- Issue 최신 내용
- 최신 HANDOFF CHECKPOINT
- 해당 branch
- 최신 pushed commit

새 개발자가 이전 세션의 대화기록을 요구해야 한다면 handoff가 실패한 것이다.

## 7. 로컬 전용 파일 금지
다음은 로컬에만 두지 않는다.
- 구현 코드
- canonical content source
- planner manifest
- QA 결과 중 다음 개발자가 알아야 하는 내용

단, deployment ZIP 같은 대용량 산출물은 GitHub에 커밋하지 않는다. 재생성 가능한 source/build flow를 유지한다.

## 8. Lock / 동시작업 규칙
- 같은 working tree를 두 개발자가 동시에 Git write 작업하지 않는다.
- branch/commit/push 작업 중에는 다른 에이전트가 같은 repo에서 git commit/fetch/merge를 실행하지 않는다.
- `.lock` 문제가 생기면 실제 Git 프로세스가 없는지 먼저 확인한다.

## 9. PR / 배포 규칙
- 구현 완료 → QA → PR → local deployment ZIP 순서
- 운영 배포는 사용자 승인 전 금지
- 중간 단계마다 ZIP을 만들지 않는다. 승인대기 가능한 통합본에서만 ZIP을 만든다.

## 10. NEEDS DECISION
개발자는 아래 경우 임의로 결정하지 않고 멈춘다.
- URL architecture 변경
- 고순위 indexed URL 변경/삭제
- shared data-model 대규모 migration
- 사실/저작권/라이선스 불명확
- 기존 기획문서와 코드가 구조적으로 충돌

## 11. PM 운영 원칙
항상 작업 파이프라인을 유지한다.
- BUILD: 현재 개발자가 구현 중인 released work
- PREP: Planner가 다음 개발 패키지 완성
- MEASURE: GSC/GA4 등 성과측정

MEASURE 대기 때문에 BUILD/PREP를 멈추지 않는다.
