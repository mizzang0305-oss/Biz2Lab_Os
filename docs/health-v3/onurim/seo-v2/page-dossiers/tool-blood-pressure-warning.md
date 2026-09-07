# 기록보다 119가 먼저인 경고 카드 — Tool 4/34

2026-09-06 · LOCAL · /health/tools/blood-pressure-warning · SEO_PAGE_CERTIFIED

## 개별 판정
NOINDEX_FOLLOW. Fresh GSC INDEXED인 페이지를 '색인 실패' 때문이 아니라 검색용 위험 신호 해설과 인쇄용 보조 카드의 역할을 분리하기 위해 제외한다. 7개질문: 기억·출력 작업 있음, 독립 검색 설명은 부모HTN/danger-signals와 중복, 빈 도구만 아님, 짧은 사용법 있음, 단독 응급판정 불가, 고유title/H1/description 있음, 부모·관련3링크·실제출처 있음. 독립 검색 글로 불필요하게 늘리지 않는다. 사용성은 유지하고 INDEX_UTILITY를 목표로 인증한 것이 아니다. 판단 근거 INTERNAL_HEURISTIC.

## 구현과 안전
중복 tool.items를 제거하고 이미 출처를 연결한 부모HTN warning 제목·본문·목록을 그대로 렌더한다. 입력·체크·빈칸을 제거하고 인쇄용 카드임을 정확히 설명한다. 통증이 심해질 때까지 기다리는 기준이 아님을 경고 목록 앞에 표시했다. 증상 동시발생·혈압 확인·인쇄 완료를119신고 조건으로 만들지 않는다. 약 추가 복용이나 진단을 지시하지 않는다. 부모144claim 및47패킷 본문 불변. 기존 부모 경고 재사용과 도구 편집 대조이지 임상승인 아님.

Main KDCA [심근경색](https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/cvcdInfo/miInfoMain.do) 이번 원문 재열람, [뇌졸중](https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/ccvcdInfo/cbvcacdInfoMain.do) 이전 본문 직접열람범위와 이번 URL 재조회, AHA Tool1 직접열람범위 재사용. 원문의 지속시간·치료시간을 기다림 기준으로 옮기지 않았다. 독립 source검토 P0/P1/P2없음. 의료검수NO/실제독자NOT_PERFORMED 유지.

## 기술·전후
HTTP200/selfcanonical/noindex,follow/robots.txt비차단/로컬sitemap제외 실제 확인. Production sitemap77은 미변경이고 로컬은76. 기존createMetadata noindex기본nofollow는 보존하며 explicit follow:true만 허용하는 회귀검사 추가. 향후개별검토 Tool만 indexDecision으로 제외한다. 새 Preview를 배포한 상태는 아니다.
Google [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [robots meta](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) Main직접확인: crawl허용한메타noindex, nofollow미부여, 검색대상만sitemap에포함. OFFICIAL 구현 근거이며 Google제거/색인/순위 보장이 아니다.

Before87words/source0 → after270/source3/out19. 실제내부목적지200. 고유metadata/Breadcrumb만, 가짜FAQ/Physician/reviewedBy없음. 수정일9/6화면·출처포함인쇄일치.

## 검증
42SEO/전체285tests/typecheck/build116/lint0errors(기존1warning)/5폭QA/SEO/tool-printQA/diffcheck PASS. QA에 예상indexdecision과 실제 robots 대조 추가. Main360·390full/urgent·430·768·1440 화면 직접열람. 초안 출처 분리와 이어진 빈 페이지를 인쇄 여백 및 .shell의 인쇄 min-height만 수정해 해결. 최종A4 1쪽, 모든 위험 신호/119/한계/출처3 확인. pypdf1435문자, 실제종이출력미실행. 비GET0,입력/제출/저장없음.

INTENT_PASS/TITLE_PASS/DESCRIPTION_PASS/H1_PASS/CONTENT_UNIQUENESS_PASS(보조인쇄역할)/MEDICAL_SOURCE_PASS/INTERNAL_LINK_PASS/IMAGE_PASS(카드)/MOBILE_PASS/SCHEMA_PASS/CANONICAL_PASS/INDEXABILITY_PASS(의도된제외).

증거 ../raw/page-qa/blood-pressure-warning.json, ../raw/tool-qa/blood-pressure-warning.json. PDF·PNG·SEO는 ignored reports/local. 외부변경없음.

