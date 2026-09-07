# 편집 정책 — Trust 5/12

2026-09-07 KST · LOCAL · /health/trust/editorial-policy · SEO_PAGE_CERTIFIED

## 개별 판정과 변경

INDEX_SUPPORT. Fresh GSC INDEXED, positive query 미관찰. ‘오누림은 어떤 절차로 글을 만들고 바꾸는가’의 브랜드 탐색 질문. 출처 정책의 자료 선정이나 작성자 프로필과 달리 질문별 구성·작업 단계·수정일·검증 한계를 담당한다. 최초 ENRICH_THEN_INDEX → INDEX_SUPPORT로 확정, 기존 색인 허용은 유지. 원장의 utility 명칭을 신뢰 설명 역할로 정규화한 INTERNAL_HEURISTIC이며 Google 순위 기준 아님.

모든 문서를 같은 3단 순서로 만든다는 기존 intro를 질문별 구성으로 변경. 편집/출처 대조/의료 검수/실제 독자 테스트/운영자 공개 결정을 서로 다른 단계로 설명하고, AI 보조를 인간이 수행한 확인으로 표시하지 않는다. 현재 검토자 미배정·의료 검수와 실제 독자 테스트 미완료를 공개한다. 기존 두 파일럿의 합성 점검을 실제 독자 결과나 현재 모든 글의 검증으로 확대하지 않는다. 문장 변경일/원문 날짜/원문 대조일을 구분하고 재배포만으로 날짜를 갱신하지 않는다. 기술 테스트·검색·광고 심사를 임상 정확성 보증으로 취급하지 않는다.

Main 직접 근거 확인: `lib/health-v3/medical-review.ts` currentMedicalReviewState(배정/진행/완료/real-reader=false), `docs/health-v3/onurim/content-status.md`의 역사적 검토/합성 상태, `docs/health-v3/synthetic-reader-test/synthetic-validation-decision.md`의 두 파일럿·실제 사람 아님 한계. 역사 문서의 과거 Preview-only/출처69/실동작Issues 표현을 현재 상태로 전용하지 않았다. 현재 SEO 작업·공개 접수 상태는 별도 live/구현 증거를 따른다. 새 의료 주장·합성 점검 재실행·면허 검수·사람 모집은 수행하지 않았다.

## QA

Baseline62words/source0 → local265/source0/outlinks16. 고유 SEO title/description, H1 편집 정책 유지, 실제 안내 수정일2026-09-07. HTTP200/H1 1/self-canonical/indexable/sitemap포함(63), Organization/WebSite/BreadcrumbList, schema오류0. 출처/AI/작성자/의료검토/정정5개 문맥 목적지 로컬200. 운영 정책이므로 의료기관 출처 개수0을 근거 부족 점수로 사용하지 않는다. 전역 uniqueness/inlinks/depth는 NOT_AUDITED.

Main 360/390/430/768/1440 전체 화면 직접 확인, 내용·단계 구분·날짜·문맥 링크·내비게이션·푸터 정상, overflow0/pageerror0. 그림·FAQ 추가 불필요. 관련81tests, 5폭QA, SEO PASS. MINZ fresh plan/results-trust05의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests 직접 수행; 전체test/lint는 Trust1 공통 구조 검증 및 최종 통합 재실행; sourceURL/build 최종 통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 실제 의료인 결과 없음. Main 실제2파일 diff 검토·git diff --check PASS.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (신규 임상 주장 없음, 검증 상태와 절차 분리) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED. MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래144Claim·47패킷 변경 없음. Production·GSC·AdSense·외부 설정 변경0. raw/page-qa/editorial-policy.json와 ignored local PNG/SEO/MINZ evidence. Preview와 전역 감사는 후속.
