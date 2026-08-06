# HUMAN INPUT / DECISION REQUIRED

이번 PR에서 임의로 채우거나 실행하지 않는 항목이다.

1. `HUMAN_REVIEW_REQUIRED` — 독립 FLAGSHIP 7개의 본문, 계산 설명, 가상 데이터 표시, 공개 이미지를 Preview에서 처음부터 끝까지 확인하고 PR #124 병합 여부를 결정해야 한다. 8번째 글은 필수 사람 입력이 아니다.
2. `READY_PUBLIC_GITHUB_ISSUES` — 공개 문의 경로는 Contact 페이지의 GitHub Issues다. 저장소는 public이고 Issues가 활성화돼 있다. 안내 페이지는 로그인 없이 보이지만 새 Issue 작성은 GitHub 로그인이 필요하며, Contact는 공개 게시판에 민감정보를 쓰지 말라고 경고한다.
3. `OPTIONAL_HUMAN_INPUT` — 비공개 문의 경로가 필요하면 공개 가능한 이메일 또는 실제 endpoint, 문의 목적, 수집 항목, 보관 여부와 답변 범위를 승인해야 한다. placeholder 이메일이나 작동하지 않는 폼은 공개 UI에 추가하지 않았다.
4. `HUMAN_DECISION_REQUIRED` — 과거 공개 URL 64개를 계속 404로 유지할지, 일부를 복원하거나 동일 의도 페이지로 redirect할지는 Search Console 근거와 함께 결정한다.
5. `HUMAN_DECISION_REQUIRED` — 영화·OTT/Biz2Lab PLAY 22개 URL의 완전 삭제, 이전 또는 별도 도메인 분리는 이번 PR 범위 밖이다.
6. `PRODUCTION_SETTING_REQUIRED` — apex/protocol/root redirect chain을 1회로 줄이는 Vercel domain 정책은 별도 Production 설정 승인이 필요하다.
7. `HUMAN_CHECK` — Search Console 색인·선택 canonical, AdSense 정책 센터의 다른 문제와 consent/CMP 요구사항은 계정 화면에서 확인해야 한다.
8. `HUMAN_CHECK` — 승인된 이미지가 교체되거나 Preview가 재캡처되면 `image-privacy-review.md` 기준으로 다시 확인한다.

## 공개 문의 구현 상태

- Contact와 Privacy는 GitHub Issues를 공개 문의 채널로 동일하게 안내한다.
- Issue 작성 URL의 최종 응답은 200이며 로그인 화면으로 이동한다.
- 저장소는 public이고 Issues는 활성화돼 있다.
- 공개 Contact 페이지에는 이메일 입력 폼이나 `/api/contact`를 호출하는 UI가 없다.
- 저장소에 남아 있는 `/api/contact`와 `ContactForm`은 현재 공개 Contact 페이지에서 import·노출되지 않으므로 작동하는 문의 폼처럼 안내하지 않는다.
- 비공개 신원 확인이나 민감 자료 전달에는 공개 Issue가 적절하지 않을 수 있다는 제한을 유지한다.
