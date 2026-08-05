# HUMAN INPUT / DECISION REQUIRED

이번 PR에서 임의로 채우거나 실행하지 않는 항목이다.

1. `HUMAN_CONTENT_REQUIRED` — 독립 FLAGSHIP 8개 기준에는 개인정보가 제거된 실제 fixture, exact source commit과 검증 로그가 있는 공개 페이지 1개가 더 필요하다. 이번에 보강한 미수금 페이지는 기준선 6개에 이미 포함돼 있어 중복 계산하지 않는다.
2. `READY_PUBLIC_GITHUB_ISSUES` — 공개 문의 경로는 Contact 페이지의 GitHub Issues다. 저장소는 public이고 Issues가 활성화돼 있으며 새 이슈 URL은 로그인 화면을 거쳐 접근된다. 페이지는 공개 게시판에 민감정보를 쓰지 말라고 경고한다.
3. `HUMAN_INPUT_REQUIRED` — 운영자 GitHub 프로필에는 공개 연락처가 있지만 사이트 본문에 이메일을 직접 복제하지 않았다. 사이트 소유 비공개 문의 경로가 별도로 필요하면 공개 가능한 이메일 또는 실제 endpoint, 문의 목적, 수집 항목, 보관 여부와 답변 범위를 승인해야 한다. placeholder 이메일이나 작동하지 않는 폼은 추가하지 않았다.
4. `HUMAN_DECISION_REQUIRED` — 과거 공개 URL 64개를 계속 404로 유지할지, 일부를 복원하거나 동일 의도 페이지로 redirect할지는 Search Console 근거와 함께 결정한다.
5. `HUMAN_DECISION_REQUIRED` — 영화·OTT/Biz2Lab PLAY 22개 URL의 완전 삭제, 이전 또는 별도 도메인 분리는 이번 PR 범위 밖이다.
6. `PRODUCTION_SETTING_REQUIRED` — apex/protocol/root redirect chain을 1회로 줄이는 Vercel domain 정책은 별도 Production 설정 승인이 필요하다.
7. `HUMAN_CHECK` — Search Console 색인·선택 canonical, AdSense 정책 센터의 다른 문제와 consent/CMP 요구사항은 계정 화면에서 확인해야 한다.
8. `HUMAN_CHECK` — 승인된 이미지가 교체되거나 Preview가 재캡처되면 `image-privacy-review.md` 기준으로 다시 확인한다.
