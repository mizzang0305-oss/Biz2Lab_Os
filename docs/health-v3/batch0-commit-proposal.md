# Batch 0.5 local baseline commit gate

상태: `LOCAL_COMMIT_AUTHORIZED_SCOPE_VALIDATION_REQUIRED`

2026-08-22 Batch 0.5 지시는 검증이 통과하는 경우에 한해 `docs/health-v3/**`만 로컬 커밋하도록 승인했다. 이는 Health V3의 브랜드·저자·연락처·의료 검수·게시·배포에 대한 승인이 아니다.

## 허용 commit

- message: `docs: establish Health V3 research and architecture baseline`
- scope: `docs/health-v3/**`
- 현재 예상 파일 수: 88
- 목적: 연구·아키텍처·비공개 파일럿·Owner 결정 자료의 로컬 기준선 보존

## commit 전 필수 검증

- staged path가 모두 `docs/health-v3/**`에 속한다.
- secret, 실제 환자 정보, 가짜 검수자, 가짜 의료 자격이 없다.
- 실제 동작하는 email 또는 검수자가 있다고 주장하지 않는다.
- 어떤 페이지도 공개 준비 완료로 표시하지 않는다.
- 뇌졸중과 심근경색은 `LICENSED_REVIEW_REQUIRED` 및 `PUBLICATION_BLOCKED`다.
- KDCA 공공누리 제4유형의 출처표시·상업적 이용 금지·변경 금지 경계가 있다.
- public route, sitemap, robots, canonical, ads.txt, AdSense 코드는 변경하지 않는다.
- 원본 dirty checkout을 변경하지 않는다.

## 금지

- push, PR, merge, Preview 또는 Production deploy
- 외부 게시 및 Google console mutation
- `docs/health-v3/**` 밖의 staging
- 검증 실패 상태에서의 commit

검증 결과와 실제 commit SHA는 실행 보고서에 기록한다.
