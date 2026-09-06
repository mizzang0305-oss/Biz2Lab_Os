# 의료 검토 정책 — Trust 7/12

2026-09-07 KST · LOCAL · /health/trust/medical-review-policy · SEO_PAGE_CERTIFIED

## 개별 판정과 변경

INDEX_SUPPORT. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 미관찰. 최초 원장의 NOINDEX_FOLLOW 후보를 재검토했다. 내부 검토판과 달리 공개 문서는 ‘오누림은 의료인이 검토했는가’라는 독립적인 브랜드 신뢰 질문에 답한다. 미검수 사실을 검색에서도 발견할 수 있게 기존 indexable 상태를 유지한다. 의료 검수 부족이나 현재 미색인을 숨기는 noindex가 아니며, 질환 설명의 대체 페이지도 아니다. 검색 수요나 순위 효과를 추정하지 않는 INTERNAL_HEURISTIC. 내부 /health/review의 Production 차단은 변경하지 않는다.

첫 문장과 검색 설명에 검토자 미배정·검수 미시작·미완료를 평문으로 표시한다. 준비된 기존47문장은 승인된47문장이 아니며 이후 추가·수정본 전부를 포괄하는 패킷도 아님을 설명했다. 출처 대조/AI 점검/임상 판단, 배정/시작/결과/수정 단계를 분리하고 실제 독자 테스트 미실시도 공개한다. 부분 승인이나 과거 버전을 전체 사이트의 의료 검수로 확대하지 않는다. 의료 내용이나 위험 기준 추가 없음.

Main 직접 currentMedicalReviewState와 패킷 구성 함수를 읽었다. 기존47Claim text/hash/packetHash,144Claim,의료 검토 상태를 변경하지 않았다. 공개 페이지에서 내부 상태 코드를 평문으로 풀었을 뿐 LICENSED_REVIEWER_SOURCING, REVIEWER_ASSIGNED=NO, MEDICAL_REVIEW_IN_PROGRESS=NO, MEDICAL_REVIEW_COMPLETED=NO의 실제 데이터는 그대로다.

Cicero가 00665ad 대비 실제 diff를 독립 검토해 잔여 P0/P1/P2 없음으로 보고했다. 이는 임상 검수가 아니며, 과거 패킷의6가이드·74Claim·27출처를 현재 전체 사이트 수치로 재사용하지 않는다.

## QA

Baseline99words/source0 → local229/source0/outlinks15. 고유 metadata, H1 의료 검토 정책, 실제 안내 수정일2026-09-07. HTTP200/H1 1/self-canonical/indexable/sitemap포함(63), Organization/WebSite/BreadcrumbList·schema오류0; reviewedBy/Physician/MedicalOrganization 추가 없음. 작성자/출처/면책/정정4문맥 목적지 모두 로컬200. 전역 uniqueness/inlinks/depth는 NOT_AUDITED.

Main 360/390/430/768/1440 전체 화면 직접 검토: 상태가 서론에 노출되며 본문·링크·내비·푸터 정상, overflow0/pageerror0. 그림/FAQ 불필요. 관련87tests(의료 패킷/상태 회귀4개 포함),5폭QA,SEO 모두PASS. MINZ plan/results-trust07의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests 직접 실행; 전체test/lint는 공통 구조 및 최종통합 재실행; sourceURL/build 최종통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 실제 의료인 결과 없음. Main 실제2파일 diff와 git diff --check PASS.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (신규 임상 주장 없음, 현재 검수 상태 보존) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED는 임상 검수·실제 독자 인증이 아니다. REAL_HUMAN_READER_TEST=NOT_PERFORMED. Production·GSC·AdSense·외부 설정 변경0. raw/page-qa/medical-review-policy.json와 ignored local PNG/SEO/MINZ evidence. Preview와 전역 감사 후속.
