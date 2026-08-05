# AdSense 재검토 전 사람 승인 체크리스트

> 이번 작업에서는 AdSense 재검토를 실행하지 않는다. 이 목록은 Production 반영 후 사람이 직접 확인하는 승인 게이트다.

## 일정·계정

- [ ] `HUMAN_CHECK` 재검토 시점이 2026-08-11 이후다.
- [ ] `HUMAN_CHECK` AdSense 정책 센터에 “가치가 별로 없는 콘텐츠” 외 다른 문제가 없는지 확인했다.
- [ ] `HUMAN_CHECK` 사이트 소유권 확인 상태가 계속 유효하다.
- [ ] `HUMAN_APPROVAL` 최종 검토자가 재검토 요청을 별도로 승인했다.

## Production 반영

- [ ] 승인된 PR만 merge했다.
- [ ] 승인된 SHA가 Vercel Production에 실제 반영됐다.
- [ ] Production sitemap URL의 404가 0개다.
- [ ] Production 공개 내부 broken link가 0개다.
- [ ] Production redirect loop가 0개다.
- [ ] sitemap에 redirect URL과 noindex URL이 없다.
- [ ] 404 페이지가 200 soft 404가 아니며 homepage canonical을 출력하지 않는다.
- [ ] www canonical, Open Graph URL과 JSON-LD URL이 서로 일치한다.
- [ ] ads.txt와 AdSense 연결 코드가 승인된 Production 기준으로 정상이다.

## 콘텐츠·주제

- [ ] 사람이 FLAGSHIP 6개를 처음부터 끝까지 읽고 고유 가치와 실제 증거를 확인했다.
- [ ] `HUMAN_CONTENT_REQUIRED` 추가 FLAGSHIP이 필요하면 개인정보가 제거된 진실한 증거를 먼저 제공했다.
- [ ] 전자계약·결제처럼 공개 근거가 없는 주제를 빈 허브나 과장 카피로 약속하지 않는다.
- [ ] 영화·OTT·범용 도구 초안은 sitemap, RSS, navigation과 핵심 내부링크에서 빠져 있다.
- [ ] 초안 65개와 과거 공개 URL을 Search Console 근거 없이 일괄 삭제·홈 redirect하지 않았다.
- [ ] 페이지별 검증 범위와 미검증 범위가 실제 artifact와 일치한다.

## UX·Search Console

- [ ] 360×800, 390×844, 430×932, 768×1024, 1440×900에서 주요 route를 확인했다.
- [ ] 모바일·데스크톱에서 overflow, broken image, sticky header, table/code/긴 URL을 확인했다.
- [ ] keyboard skip link, focus 표시와 주요 navigation을 확인했다.
- [ ] `HUMAN_CHECK` Search Console에서 중요 URL의 실제 색인 상태와 Google 선택 canonical을 확인했다.
- [ ] `HUMAN_CHECK` Search Console에서 sitemap과 과거 URL crawl/index 상태를 확인했다.

## 안전 확인

- [ ] 민감정보·고객명·전화번호·계약정보·실제 결제정보가 공개 콘텐츠와 캡처에 없다.
- [ ] 실제 화면이 아닌 fixture/local demo는 오해 없이 표시된다.
- [ ] AdSense 승인을 보장하는 문구가 없다.
- [ ] 최종 사람 승인이 기록되기 전 재검토 버튼을 누르지 않는다.
