# 정정 정책 — Trust 2/12

2026-09-07 KST · LOCAL · /health/trust/corrections-policy · SEO_PAGE_CERTIFIED

## 역할과 실제 근거

INDEX_SUPPORT. Fresh GSC INDEXED, URL별 positive query 미관찰. ‘오누림 내용이 틀렸다면 어떤 정보로 어떻게 정정하는가’라는 브랜드 책임 확인 문서다. 단순 연락처 중복 페이지와 달리 제보 자료·공개 게시 경계·수정 원칙을 담당한다. 기존 INDEX_UTILITY 명칭을 INDEX_SUPPORT로 정규화하며 기존 색인 허용 유지. INTERNAL_HEURISTIC이며 Google 승인 기준이나 접수 서비스 완료 판정 아님.

Main이 2026-09-07 KST [공개 GitHub Issues](https://github.com/mizzang0305-oss/Biz2Lab_Os/issues)를 직접 read-only 열람했다. 목록은 열리나 새 글 작성 제한 안내가 있다. 로그인 사용자의 실제 접수 가능·운영자 응답은 검증하지 않았다. 제한 원인/계정별 권한을 추정하지 않는다. 기존 ‘실제 접수·현재 실동작’ 단정을 없애고 미확인을 첫 절에 명시했다. 이메일 활성화·송수신 미완료 사실은 보존하되 사용할 수 없는 구체적 주소는 공개 본문에서 제거했다. 외부 설정 변경·시험 Issue 생성·메일 발송 없음.

## 변경·고유 가치

고유 SEO title/description, H1 정정 정책 유지, 실제 안내 수정일2026-09-07. 제보 가능할 때 필요한 URL·문장·이유·공식 원문, 올리지 말아야 할 개인 정보, 출처 대조·수정 이유 기록 원칙, 의료상담과의 차이를 구분한다. 특정 진단명/검사표의 제출을 요구하지 않으며 비공개 보관이나 응답 SLA·모든 제안 채택을 보장하지 않는다. 의료 판단에 영향이 있는 변경은 면허 검토 대상이지 출처 대조 완료로 임상 검수 승격하지 않는다.

외부 CTA는 새 글 작성 확정 안내 대신 실제 공개 목록 열람으로 제한했다. Trust renderer에서는 이 페이지의 기존 /issues/new 문구만 제거, contact의 기존 문구는 다음 직렬 수정 대상으로 남긴다. privacy/sources-policy/medical-review-policy/danger-signals의4개 문맥 링크 로컬200. 새 URL·폼·사진·FAQ·의료 Claim 없음. 기존 의료 안내는 이미 인증된 위험 신호 페이지에 연결한다.

## QA

Baseline78words/source0 → local239/source0/outlinks15. source0은 자동 감사의 의료기관 링크 집계이고 GitHub 운영 근거 링크1개와 모순되지 않는다. HTTP200/H1 1/self-canonical/indexable/sitemap포함(64), Organization/WebSite/BreadcrumbList, schema오류0. lastmod와 안내 수정일 일치. 전역 metadata 중복·inlinks/depth는 NOT_AUDITED 유지.

Main 5폭360/390/430/768/1440 최종 전체 화면 직접 확인. 접수 미검증과 개인정보 경고·링크가 읽히고 overflow0/pageerror0. 텍스트 정책이므로 장식 이미지/FAQ 추가 불필요. 관련78tests/5폭QA/SEO PASS. MINZ fresh plan/results-trust02의 npm run typecheck exit0 PASS. 9 NOT_SELECTED: 관련tests 직접 실행, 전체test/lint는 Trust1 공통 구조 검증 후 최종 통합에서 재실행; sourceURL/build 최종 통합; legacy check:links/validate:images/posts/seo는 현재 Onurim QA 대체; validate:health-medical-review는 의료인 결과 미입력. git diff --check PASS. 외부 채널 실제 접수 테스트는 의도적으로 미수행이며 인증에 포함하지 않는다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (신규 임상 주장 없음, 검수 구분 보존) / INTERNAL_LINK_PASS / IMAGE_PASS (그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

이는 로컬 SEO_PAGE_CERTIFIED이며 CONTACT_SUBMISSION_VERIFIED=NO. MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래144Claim·47패킷 변경 없음. Production·GSC·AdSense·메일·GitHub 설정 변경0. raw/page-qa/corrections-policy.json, ignored local PNG/SEO/MINZ 계획·결과. Preview와 전역 감사 후속.
