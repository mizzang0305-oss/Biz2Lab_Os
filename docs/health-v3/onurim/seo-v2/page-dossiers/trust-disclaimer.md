# 면책 안내 — Trust 11/12

2026-09-07 KST · LOCAL · /health/trust/disclaimer · SEO_PAGE_CERTIFIED

NOINDEX_FOLLOW. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 미관찰. 초기 후보 유지. 질환별 의료 설명을 대체하는 페이지가 아니라 사이트 이용의 한계와 도움 요청 우선순위를 짧게 알리는 정책 문서다. 독립 의료 검색 결과로 늘리지 않고 푸터·다른 정책에서 계속 접근한다. 미색인 은폐나 위험 문구를 숨기려는 조치가 아니며 INTERNAL_HEURISTIC이다.

## 수정과 원문 대조

기존 ‘새롭거나 심한 증상’이 전부119로 읽힐 수 있는 포괄 표현을 제거했다. 의식 저하·심한 호흡곤란 같은 위급한 변화에는 즉시119, 글/기록/답변을 기다리지 않는 안내를 유지한다. 예시 누락이 안전 보증이 아니며 링크 읽기도 신고 전제 조건이 아님을 명시했다. 자가 진단·약 변경 금지, 기록표 역할, 개인 상황 차이와 검수 미완료를 설명한다. 법적 책임 면제나 임상 검수 완료를 새로 주장하지 않는다.

OFFICIAL 원문 재확인(2026-09-07 Main): [소방청119구급신고 요령](https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/)의 신고·의식/호흡 전달·통화 유지 안내, [MedlinePlus 응급상황 인지](https://medlineplus.gov/ency/article/001927.htm)의 의식/호흡 변화와 지체하지 않는 현지 응급 연락 안내. 미국911/988을 국내번호로 제시하지 않으며 원문 흉통2분 기준을 대기시간으로 옮기지 않았다. 원문 전문·표·그림 복사 없음. 기존 danger-signals 상세 안내로 연결하며 별도의 약물/응급처치/진단 기준 추가 없음.

## QA와 실패 이력

최초87tests 중86PASS/1FAIL: 새 진료 질문 링크 `/health/guides/doctor-visit-questions`가77URL 재고에 없음을 회귀 검사가 발견했다. 실제 `/health/guides/appointment-questions`로 수정하고87/87PASS 재실행. 잘못된 링크를 통과로 보고하지 않았다.

Baseline68words/source0 → local176words/인식source1/outlinks15. 실제 외부원문2링크지만 auditor allowlist 계수는1이므로 기관 개수와 동일하지 않다. HTTP200/H1 1/self-canonical/noindex,follow/sitemap제외(60), robots크롤링허용. 안내 수정일2026-09-07, lastmod없음. Organization/WebSite/BreadcrumbList·schema오류0. 진료질문/위험신호/의료검토/출처4목적지200. 전역 unique/inlinks/depth NOT_AUDITED.

Main360/390/430/768/1440 전체 화면 직접 확인: 본문·응급 경계·외부 출처·링크·내비·푸터 정상, overflow0/pageerror0. 그림/FAQ 불필요. 최종87tests/5폭QA/SEO PASS, MINZ plan/results-trust11의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests직접; 전체test/lint공통및최종통합; sourceURL/build최종통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 실제 결과 없음. Main 실제2파일diff/git diff --check PASS.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (응급 문구 원문 재대조, 임상 검수 아님) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED. 의료검수·실제독자gate 보존. 기존144Claim/47패킷 변경0, 응급 안내 문구도 면허 의료인 최종 검토를 대신하지 않는다. Production/GSC/AdSense 변경0. raw/page-qa/disclaimer.json 및 ignored local PNG/SEO/MINZ evidence. 전역/Preview 후속.
