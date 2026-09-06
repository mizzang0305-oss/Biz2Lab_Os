# 지방간 검사 상담표 — Tool 23/34

2026-09-06 · LOCAL · /health/tools/metabolic-dysfunction-associated-steatotic-liver-disease-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY, 원래 ENRICH_THEN_INDEX 계획을 개별 QA 후 확정. Fresh GSC INDEXED이므로 이번 로컬 변경으로 색인됐다고 하지 않는다. 부모는 간효소·지방·섬유화와 검사의 역할 해설, 도구는 실제 원문·음주·약 이력을 가져가 개인 답변·다음 계획을 남기는 작업이다. 독립 작업 YES / 도구만 NO / 3단계 사용법 YES / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC, 검색량·순위 보장 없음. 기존 긴 URL 유지, 새 masld URL 없음.

## 변경·출처·안전

3필드·3질문. 원본 검사명·날짜·단위·참고범위, 현재·과거 음주와 줄일 때의 불편, 약·보충제·생약·질환·새 불편을 구분한다. 없음/미확인 허용. ‘좋음·나쁨’ 요약이나 단일 점수로 바꾸지 않는다. 검사 주문·자가 단계 판정·금식 시간·약 용량·음주 허용량·자가 해독 일정 없음. 술을 갑자기 끊기 전 도움 경계를 음주 지속 권장과 구분한다. 부모 카드도 toolSummary를 통해 실제 작업과 맞는 제목·소개가 되며 ‘한 장’ 약속 제거.

Main이 직접 읽은 [NIDDK 진단](https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/diagnosis), [증상·원인](https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/symptoms-causes)(각2021-04), [NHS 음주](https://www.nhs.uk/conditions/alcohol-use-disorder/)(2026-04-24) + 부모 경고의 [황달](https://www.nhs.uk/conditions/jaundice/)(2024-01-22), [토혈](https://www.nhs.uk/symptoms/vomiting-blood/)(2025-08-18), [갑작스러운 혼란](https://www.nhs.uk/symptoms/confusion/)(2024-05-28), 총6출처. 황달 당일 신속한 진료, 갑작스러운 혼란·심한 금단119, 토혈에 위급 변화 동반119, 멎고 다른 증상 없어도 신속한 도움. 직접 운전·기록 완성 지연 금지. NIDDK의 점수·미국 안내를 자가 계산 지침으로 복사하지 않았다.

독립 AI 실제 a998345 대비 diff 대조 잔여 P0/P1/P2 없음. makeClaims가 수정한 observationItems/questions/toolSummary를 사용하지 않는 구조로 원래 claim 생성은 불변. 새 설명은 원래47 패킷에 자동 편입하거나 임상 승인하지 않는다.

## QA

Baseline63 words/source0 → local506/source6/outlinks18. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬69). Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

59SEO+6cutover=65tests PASS. 5폭 page QA/tool QA/SEO PASS. Main 360/390/430/768/1440 상단 및 A4 2쪽(1386/1212자) 직접 확인했다. 3필드·3질문·4답변선, 경고·출처6URL·footer12px 유지. 체크 Space/초기화/포커스 해제 PASS, overflow0, 내부링크200, non-GET0. 부모 MASLD 카드 연결 변경 뒤5폭 UI/SEO 재실행 PASS.

MINZ fresh discovery와 실제 lifecycle 검토 후 `npm run test`, `npm run lint`, `npm run typecheck` 각 exit0 PASS. 근거 ignored skill-resumption/verification-{plan,results}-tool23.json. stdout hash/byte만 보존하므로 전체 테스트수·경고수는 추정하지 않는다. 나머지7개 NOT_SELECTED: `check:health-source-urls`·`build` 최종 통합 예정, `check:links`·`validate:images`·`validate:posts`·`validate:seo`는 legacy대신 현재 Onurim route검사, `validate:health-medical-review` 실제 의료인 결과 미입력. 최신 build는 여전히 Tool8 당시 증거다.

`npm run audit:health-v3`도 exit0 PASS:20질환/34도구/9support/12trust/144claims/47검토packet/166sources/62visuals/75publicadjudications/미해결source0. packetHash 4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64 유지. 감사기의 medicalSafety PASS는 기계 패턴 검사 결과이며 면허 검수 아님.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. Production·Google 변경0. raw/page-qa 및 raw/tool-qa의 해당 slug JSON, ignored reports/local PNG/PDF/SEO JSON.
