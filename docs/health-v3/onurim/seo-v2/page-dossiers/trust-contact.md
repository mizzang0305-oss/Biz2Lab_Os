# 문의 — Trust 3/12

2026-09-07 KST · LOCAL · /health/trust/contact · SEO_PAGE_CERTIFIED

## 개별 판정

NOINDEX_FOLLOW. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 미관찰. 문의 경로 찾기는 정정 정책을 보조하는 길찾기이고 독립 건강정보 검색 과제가 아니다. 정정 정책과 중복되는 절차를 재확장하지 않고 짧은 상태·공개 게시·상담 한계를 유지한다. 최초 원장의 NOINDEX 결정을 실제 적용했다. 미색인 상태 은폐가 아니라 역할에 따른 INTERNAL_HEURISTIC. URL200·self-canonical·본문/푸터 접근 유지; robots.txt는 막지 않고 sitemap에서만 제외한다. 정정 정책은 INDEX_SUPPORT 유지.

## 변경과 근거

기존 ‘실제 운영 중’과 작성 확정 CTA를 제거했다. Main의 [공개 Issues](https://github.com/mizzang0305-oss/Biz2Lab_Os/issues) 직접 관찰: 공개 목록 열람 가능, 새 글 작성 제한 안내, 일반 독자 실제 접수 미검증. 권한 원인이나 로그인만으로 가능한지 추측하지 않는다. 2026-09-07 확인일을 본문에 기록하고 정정 정책의 자세한 상태·필요한 내용으로 연결한다. 이메일 활성화·송수신도 미검증. 외부 링크는 /issues/new 대신 공개 목록 열람이며 설정/제출은 수행하지 않았다.

개인·가족 정보를 공개 게시물/첨부에 넣지 말도록 안내한다. 개인 진단·치료·약물·응급 상담을 제공하지 않고 위급 시 게시/답변을 기다리지 않는 기존119 경계를 유지한다. 응답 SLA·접수 보장·의료 검수 완료 없음. 고유 title/description, H1 문의, 안내 수정일2026-09-07. 새 URL·폼·계정·사진·의학 주장 없음.

## QA와 실패 이력

Baseline63words/source0 → local152/source0/outlinks15. source0은 감사기의 의료기관 링크 집계; GitHub 운영 상태 링크1개는 별도. HTTP200/H1 1/self-canonical/noindex follow/sitemap제외(현재63), schema오류0, Organization/WebSite/BreadcrumbList. 정정/개인정보/위험신호3개 문맥 링크 로컬200. 전역 uniqueness/inlinks/depth는 NOT_AUDITED.

Main 360/390/430/768/1440 최종 전체 화면 직접 확인: 접수 한계·외부 목록 링크·개인정보 경고·사이트 내비게이션·푸터 정상, overflow0/pageerror0. 그림·FAQ는 역할상 불필요. 신규 회귀 테스트 첫 실행은 78/79 PASS, `ReferenceError: robots is not defined` 1건으로 FAIL했다. 원인은 테스트의 import 누락이며 제품 라우트 실패가 아니다. 실제 robots 모듈 import를 추가하고 관련79tests 모두 PASS 재확인. QA5폭/SEO는 제품 변경 최종본에서 PASS, 이후 수정은 테스트 import뿐이다.

MINZ plan-trust03은 실패 테스트 시점의 미실행 계획으로 남겼다. 수정 뒤 fresh plan/results-trust03-final의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests 직접 수행, 전체test/lint는 Trust1 공통패치의 직전 증거이며 최종 통합 재실행; sourceURL/build 최종 통합; legacy check:links/validate:images/posts/seo는 Onurim QA 대체; validate:health-medical-review는 의료인 결과 미입력. Main 실제 diff3파일 검토, git diff --check PASS.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (새 임상 주장 없음) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

CONTACT_SUBMISSION_VERIFIED=NO / MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래144Claim·47패킷 미변경. 로컬 SEO_PAGE_CERTIFIED만이며 Production·Google·메일·GitHub 설정 변경0. raw/page-qa/contact.json와 ignored local PNG/SEO/MINZ evidence, Preview/전역 감사 후속.
