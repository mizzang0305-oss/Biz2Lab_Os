# 작성자 박영훈 — Trust 4/12

2026-09-07 KST · LOCAL · /health/trust/author · SEO_PAGE_CERTIFIED

## 개별 역할

INDEX_SUPPORT. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 미관찰. ‘이 건강정보의 작성자는 누구이며 어떤 역할인가’라는 브랜드·작성자 탐색 문서. 소개의 서비스 범위와 달리 한 인물의 비의료 편집 역할·AI 사용·임상 검수 한계를 확인한다. 원장 INDEX_UTILITY 명칭을 INDEX_SUPPORT로 정규화하고 기존 색인 허용 유지. 검색량·의학 전문성·순위 상승을 추정하지 않는 INTERNAL_HEURISTIC이다.

사용자 공개 사실 박영훈/비의료인 건강정보 편집자를 보존. 내부 상태 코드 대신 평문으로 편집 역할, 제공하지 않는 의료 서비스, AI 보조와 인간 확인의 차이, 의료 검토·정정 상태를 설명했다. 작성자 서명이 모든 내용을 직접 인간이 처리하거나 임상 검증했다는 뜻으로 읽히지 않게 한다. 검토자 미배정·의료 검수 미완료를 명시한다. 임상 자격·학력·경력·환자 사례·사진·연락처를 새로 추가하지 않았다.

## 구조화데이터의 근거와 한계

Main이 [Google ProfilePage 공식 문서](https://developers.google.com/search/docs/appearance/structured-data/profile-page)(2025-12-10 수정) 원문을 직접 읽었다. 사이트와 연관된 한 사람의 저자 페이지는 유효 예시이고 mainEntity의 Person 및 name이 필수다. [Schema.org Person](https://schema.org/Person)의 jobTitle 정의도 직접 확인했다. 최소 ProfilePage → Person에 name/jobTitle/description/url/안정적인 @id만 추가했다. 기존 Article 작성자의 name/jobTitle/url과 일치한다. 기존 글 schema는 이번에 수정하지 않았다.

사진·sameAs·팔로워 수·자격·reviewedBy·Physician·MedicalOrganization 없음. 실제 프로필 생성일 및 인간이 수정한 metadata 시각을 확보하지 않았으므로 권장 속성인 dateCreated/dateModified를 억지로 추가하지 않았다. 공개 안내의 실제 문장 수정일2026-09-07은 UI와 sitemap의 날짜로만 표시하며 의료 검수일과 구분한다. 필수 속성/JSON 파싱/실제 SSR HTML 검증이며 Google Rich Results Test나 검색 노출 성공을 주장하지 않는다. 로컬 Preview에 의료 전문성 배지가 생긴 것이 아니다.

## QA

Baseline70words/source0 → local200/source0/outlinks16. 운영·역할 문서이므로 신규 임상 근거가 필요한 주장 없음. H1은 자연스러운 이름·역할, title/description은 오누림 작성자 역할 질문에 맞춤. HTTP200/H1 1/self-canonical/indexable/sitemap포함(현재63), 실제 SSR의 Organization/WebSite/ProfilePage/BreadcrumbList·nested Person 확인, schema오류0. 안내 수정일과 lastmod 일치. 편집/AI/출처/의료검토/정정5개 문맥 링크 모두 로컬200. 전역 uniqueness/inlinks/depth는 NOT_AUDITED.

Main 360/390/430/768/1440 최종 전체 화면 직접 확인, H1 줄바꿈/본문/검수 한계/링크/내비게이션/푸터 정상, overflow0/pageerror0. 실제 사진 미제공이므로 이미지 생성·placeholder 불필요. 관련80tests, QA5폭, SEO, MINZ fresh plan/results-trust04의 npm run typecheck exit0 모두 PASS. 9 NOT_SELECTED: 관련tests 직접 실행; 전체test/lint는 Trust1 직전 공통검증+최종 통합 재실행; sourceURL/build 최종 통합; legacy check:links/validate:images/posts/seo는 현재 Onurim QA 대체; validate:health-medical-review는 실제 의료인 결과 미입력. git diff --check PASS.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (신규 임상 주장 없음, 승인된 공개 역할 대조) / INTERNAL_LINK_PASS / IMAGE_PASS (실제 사진 없음, 생성 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

로컬 SEO_PAGE_CERTIFIED만 의미한다. MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래144Claim·47패킷 미변경. Production·Google·메일·외부 설정 변경0. raw/page-qa/author.json와 ignored local PNG/SEO/MINZ evidence, 전역 감사·Preview 후속.
