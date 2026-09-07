# 개인정보 안내 — Trust 9/12

2026-09-07 KST · LOCAL · /health/trust/privacy · SEO_PAGE_CERTIFIED

NOINDEX_FOLLOW. Fresh GSC INDEXED, positive query 미관찰. 초기 INDEX_UTILITY 후보를 정책·사이트 이용 보조 역할에 따라 재판정했다. 건강정보 검색 결과의 독립 설명이 아니라 방문 독자의 기록·외부 서비스 정보 처리 안내이며 푸터/도구에서 계속 공개 접근된다. 현재 이미 색인된 URL이므로 색인 실패 은폐가 아니다. 이 선택은 INTERNAL_HEURISTIC이며 Google의 개인정보 페이지 noindex 요구가 아니다. 개인정보 고지 의무나 법률 적합성은 별도 Owner 검토가 필요하다.

## 구현·공식 근거

기존 ‘브라우저에서 적은 내용’은 실제 인쇄용 빈칸과 달라 수정했다. HealthToolPage.tsx의 td/dd/div 빈칸과 일부 native checkbox, PrintButton의 window.print, 저장/제출 핸들러 부재를 직접 확인했다. 브라우저 상태·종이·기기 사본의 완전 삭제를 보장하지 않는다. RootLayout의 GA4/AdSense 코드는 VERCEL_ENV가preview가 아닌 경우 포함되며 코드 존재와 광고 승인·실제 노출·개별 정보 전송 관측은 별개다. 공개 문의는 비공개 의료창구가 아니며 일반 독자 접수와 이메일 검증은 아직 없다.

OFFICIAL: [Google 파트너 사이트 정보 처리](https://policies.google.com/technologies/partner-sites?hl=ko)를 Main이2026-09-07 전체 열람했다. 해당 서비스가 포함된 사이트의 URL/IP·쿠키 처리 가능성과 광고 개인 최적화 해제/비공개 탐색이 모든 처리를 중단시키지 않는다는 설명을 대조했다. 기존 실제 Google광고설정/partner-sites 링크를 유지한다. 실제 계정의 동의/보관/삭제 설정을 조회·변경하거나 법률 준수를 인증하지 않았다. 보관 기간·삭제 SLA·개인정보 담당자 자격을 만들지 않았다.

## QA

Baseline140words/source0 → local329/source0/outlinks15. source0은 의학 출처 계수이며 Google정책2링크 부재 뜻이 아니다. HTTP200/H1 1/self-canonical/noindex,follow/sitemap제외(총62), robots의 크롤링 차단 없음. 안내 수정일2026-09-07; sitemap제외라 lastmod없음. Organization/WebSite/BreadcrumbList·schema오류0. 정정/문의2내부목적지200. 전역 unique/inlinks/depth NOT_AUDITED.

Main360/390/430/768/1440 전체 화면 직접 확인: 본문/설정 링크/내비/푸터 정상, overflow0/pageerror0. 그림/FAQ 불필요. 관련85tests,5폭QA,SEO,MINZ plan/results-trust09의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests직접; 전체test/lint공통구조및최종통합; sourceURL/build최종통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 실제 결과 없음. Main2파일diff/git diff --check PASS. Sartre 독립 실제diff 대조 잔여P0/P1/P2없음(법률/임상 검수 아님).

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (새 임상 주장 없음) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED이며 법률 준수·의료검수·인간독자 검증 완료 아님. 의료/독자 gate 및144Claim/47패킷 보존. Production·GSC·AdSense/동의·쿠키설정/메일변경0. raw/page-qa/privacy.json와 ignored local PNG/SEO/MINZ evidence. 전역/Preview 후속.
