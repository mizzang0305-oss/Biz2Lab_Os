# AdSense 재검토 전 사람 승인 체크리스트

> 이번 작업에서는 AdSense 재검토를 실행하지 않는다. 아래는 승인된 변경이 Production에 별도로 반영된 뒤 사람이 확인할 목록이다.

## 일정·계정

- [ ] `HUMAN_CHECK` 재검토 시점이 2026-08-11 이후다.
- [ ] `HUMAN_CHECK` AdSense 정책 센터에 저가치 콘텐츠 외 다른 문제가 없는지 확인했다.
- [ ] `HUMAN_CHECK` 사이트 소유권 확인이 계속 유효하다.
- [ ] `HUMAN_APPROVAL` 최종 검토자가 재검토 요청을 별도로 승인했다.

## Production 반영

- [ ] 승인된 PR만 merge됐다.
- [ ] 승인한 SHA가 Vercel Production에 실제 반영됐다.
- [ ] Production sitemap URL 404가 0개다.
- [ ] Production 공개 내부 broken link와 redirect loop가 0개다.
- [ ] sitemap에 redirect URL과 noindex URL이 없다.
- [ ] 404가 soft 404가 아니며 homepage canonical을 출력하지 않는다.
- [ ] www canonical, Open Graph URL과 JSON-LD URL이 일치한다.
- [ ] ads.txt가 사람 확인 기준으로 정상이다.

## 콘텐츠·증거

- [ ] 사람 검토자가 독립 FLAGSHIP 7개를 처음부터 끝까지 읽었다.
- [ ] 미수금과 주문·매출·청구·입금 증거가 fixture·코드·CSV·테스트 결과와 일치한다.
- [ ] 두 신규 패키지의 Evidence와 Reproducibility가 각각 3점 이상이라는 판단에 동의한다.
- [ ] `HUMAN_CONTENT_REQUIRED` 독립 FLAGSHIP 8개를 내부 게이트로 유지한다면 사실 기반 페이지 1개를 더 확보했다.
- [ ] 전자계약·결제처럼 공개 근거가 없는 주제를 과장 카피로 복원하지 않았다.
- [ ] 주제 이탈 초안이 sitemap, RSS, navigation과 핵심 내부링크에서 빠져 있다.
- [ ] 64개 과거 URL을 Search Console 근거 없이 일괄 삭제·홈 redirect하지 않았다.

## 문의·개인정보

- [ ] Contact의 공개 GitHub Issues 링크가 동작하고 공개 게시판 경고가 Privacy 표현과 일치한다.
- [ ] 비공개 문의가 필수라면 승인된 이메일 또는 endpoint와 수집·보관 범위를 제공했다.
- [ ] `image-privacy-review.md`의 현재 이미지 16개와 manifest SHA-256이 일치한다.
- [ ] 실제 고객·거래처·연락처·계정·token·매출 원본이 공개 콘텐츠와 캡처에 없다.

## UX·Search Console

- [ ] 360×800, 390×844, 430×932, 768×1024, 1440×900에서 주요 route를 확인했다.
- [ ] overflow, broken image, sticky header, table/code/긴 URL 문제를 확인했다.
- [ ] keyboard skip link, focus 표시와 주요 navigation을 확인했다.
- [ ] `HUMAN_CHECK` Search Console에서 중요 URL 색인 상태와 Google 선택 canonical을 확인했다.
- [ ] `HUMAN_CHECK` Search Console에서 sitemap과 과거 URL crawl/index 상태를 확인했다.
