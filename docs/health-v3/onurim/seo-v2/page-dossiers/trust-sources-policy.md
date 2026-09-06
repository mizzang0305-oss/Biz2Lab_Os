# 출처 정책 — Trust 6/12

2026-09-07 KST · LOCAL · /health/trust/sources-policy · SEO_PAGE_CERTIFIED

## 개별 판정과 변경

INDEX_SUPPORT. Fresh GSC INDEXED, positive query 미관찰. ‘오누림이 자료를 어떻게 고르고 문장을 대조하는가’의 브랜드 탐색 질문. 편집 순서·작성자와 달리 원문 선정/문장 적용 범위/날짜 종류/해외 자료 적용 한계를 설명한다. 최초 INDEX_UTILITY 명칭을 INDEX_SUPPORT로 정규화하며 색인 허용 유지. INTERNAL_HEURISTIC이며 Google 순위 기준 아님.

기관 일렬 순위 대신 질문과 대상에 맞는 공공기관·전문기관·문헌 선택, 홈페이지 링크와 실제 문장 근거의 차이, 미표시 날짜 보존, 해외 조건을 국내 개인 지시로 일반화하지 않는 원칙을 추가했다. 원문이나 표·그림 복사 없이 독립 설명을 구성하며, 링크 개수/접속 성공은 면허 의료인 검수가 아님을 명시한다. HbA1c 실제 안내, 의료 검토, 정정, 편집 정책에 문맥 연결. 신규 임상 주장이나 외부 의학 URL 추가 없음; 운영 원칙이므로 source0을 의료 근거 부족 점수로 해석하지 않는다.

## QA와 실패 이력

Baseline59words/source0 → local256/source0/outlinks17. HTTP200/H1 1/self-canonical/indexable/sitemap포함(63), 실제 안내 수정일2026-09-07, Organization/WebSite/BreadcrumbList, schema오류0. 전역 unique/inlinks/depth는 NOT_AUDITED_SINGLE_ROUTE.

최초 구현의 HbA1c 링크 `/health/guides/hba1c`가 직접 목적지 검사에서404였다. 단일 URL SEO audit은 그 링크의 목적지 HTTP까지 검사하지 않았으므로 최초 audit PASS만으로 인증하지 않았다. 실제 `/health/guides/understanding-hba1c`로 수정하고 모든 Trust 문맥 내부 링크가77URL 재고에 존재하는 회귀 검사를 추가했다. 최종4목적지 모두 로컬200, 관련82tests와 재생성5폭 QA 및 SEO audit PASS. 실패를 숨기거나 처음부터 링크 정상으로 보고하지 않는다.

Main 최종360/390/430/768/1440 전체 화면 직접 검토: 제목·본문·날짜·링크·푸터 정상, overflow0/pageerror0. 그림/FAQ 불필요. 최종2파일 diff와 git diff --check PASS. MINZ plan/results-trust06-final의 npm run typecheck exit0 PASS(수정 전 trust06 결과는 과거 증거로 유지). 9 NOT_SELECTED: 관련tests 직접 수행; 전체test/lint는 Trust1 공통구조 및 최종통합 재실행; sourceURL/build 최종통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 실제 의료인 결과 없음.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (신규 임상 주장 없음, 출처 대조와 임상 검수 구분) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED. MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래144Claim·47패킷 변경 없음. Production·GSC·AdSense·외부 설정 변경0. raw/page-qa/sources-policy.json와 ignored local PNG/SEO/MINZ evidence. Preview와 전역 감사 후속.
