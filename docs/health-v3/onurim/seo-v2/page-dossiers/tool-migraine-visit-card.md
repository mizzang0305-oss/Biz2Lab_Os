# 두통 발생·실제 약 사용 준비표 — Tool 28/34

2026-09-07 KST · LOCAL · /health/tools/migraine-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 없음. 부모의 증상·조짐·진단/치료 해설과 달리, 두통 발생일과 실제 약 사용일을 분리하여 개인 진료 질문·답·다음 계획으로 옮기는 독립 작업이다. 독립 작업 YES / 도구만 NO / 사용법3단계 / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC이며 실측 검색량·색인 보장 아님.

## 변경·출처·안전

3필드: 두통 시작·지속·동반 변화·일상 영향, 실제 약 이름·사용일·반응·목적, 생활 맥락·기존 자료. 3질문: 다른 원인 평가 목적, 완화/예방약 개인 지침·연락 기준, 이어갈 기록/다음 확인/연락 변화. 기존 일지 사용 가능·미확인 허용·필수 기록 기간 없음. 두통 발생일과 약 사용일의 차이는 미래 복용 일정이 아니다. 부모 카드 설명만 역할에 맞춰 변경했으며 의료 본문·날짜·출처 객체·Claim은 변경하지 않았다.

Main 직접 본문 대조: [MedlinePlus Migraine](https://medlineplus.gov/migraine.html)(2025-11-20), [Headache](https://medlineplus.gov/headache.html)(2025-11-19), [Managing migraines at home](https://medlineplus.gov/ency/patientinstructions/000420.htm)(A.D.A.M.검토2023-12-31), [Headaches—danger signs](https://medlineplus.gov/ency/patientinstructions/000424.htm)(A.D.A.M.검토2025-10-27), [NHS Migraine](https://www.nhs.uk/conditions/migraine/)(본문검토2026-03-10; 영상2026-06-16과 구분), [CDC Stroke signs](https://www.cdc.gov/stroke/signs-symptoms/index.html)(2026-05-19). 소스 기관의 임상검토와 오누림 검수를 구분한다.

HOME/NHS 숫자 복약 지침이 다른 것을 단일 안전 횟수로 합치지 않음. 예방약에 급성기 약 제한 일괄 적용 금지·임의 증량/중단 금지, 식품 원인 확정/빛·음식·수면 부족 재현 금지. 부모 경고 상속+인쇄 경고: 각 급성 두통/신경/의식/경련 신호119, 호전·전조시간·약효 대기·직접 운전 금지. 부상 후 두통 및 발열 OR 목경직도 즉시 의료 도움, 즉시 평가 불가시 응급기관/119. 실제 fa31744 대비 3필드 최종 diff 독립 검토 잔여 P0/P1/P2 없음. agent 테스트·PDF 검증이나 의료인 검수 아님.

## QA

Baseline64words/source0 → local485/source6/outlinks19. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬69), Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

최종 관련70tests PASS. 부모5폭/SEO, 도구5폭/SEO·인쇄·키보드 PASS. 첫PDF4쪽(1340/14/1080/154자), 중간3쪽(1299/14/1213자)의 문장 고아·마지막 출처 분할을 Main 직접 발견. 일반 purpose/step1/example만 간결화하고 두통 경험 필드2개를 하나로 묶었다. 경고·출처6개·limitation·글자크기·공통CSS 미변경. 최종 A4 2쪽(1271/1213자)과360/390/430/768/1440 상단을 Main 모두 확인. 3필드·3질문·4답변선/출처6URL/footer12px/체크0/포커스false/overflow0/non-GET0/문맥 링크200.

MINZ 첫 plan/results-tool28 typecheck PASS는 인쇄 수정 전 증거로 보존. 최종 fresh plan/results-tool28-final의 `npm run typecheck`(tsc --noEmit, 추가 lifecycle 없음) 검토 후 exit0 PASS. 나머지9 NOT_SELECTED: 전체test/lint 직전Tool25 confirmed PASS는 현재 전체통과를 대신하지 않음(이번 관련70tests 직접 실행); sourceURL/build 최종 통합 예정; legacy check:links/validate:images/posts/seo는 현재 Onurim route검사로 대체; validate:health-medical-review는 실제 의료인 결과 미입력. 마지막 전체 Health audit Tool23, build Tool8 역사적 증거.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래47패킷·Claim 수정 없음. Production·Google 변경0. raw/page-qa 및 raw/tool-qa 동명 JSON, ignored local PNG/PDF/SEO·검증 계획/결과.
