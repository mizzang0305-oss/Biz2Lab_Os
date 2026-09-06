# 관절 변화·요산 진료 질문지 — Tool 27/34

2026-09-07 KST · LOCAL · /health/tools/gout-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY. Fresh GSC DISCOVERED_NOT_INDEXED, positive query 없음. 부모는 관절·요산·치료 역할의 해설, 도구는 관절 변화와 실제 검사·약 이력을 모아 현재 통증 및 이후 관리의 질문과 답을 남기는 독립 작업이다. 독립 작업 YES / 도구만 NO / 사용법3단계 / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC이며 실제 검색량·색인 보장 아님.

## 변경·출처·안전

3필드: 관절 위치·시작·실제 변화, 기존 요산 원본·이전 발작/진료, 실제 약·보충제·다른 질환·식사/음주. 질문3개: 다른 원인 검사 목적, 현재 통증과 이후 관리 약의 역할/개인 지침, 개인 목표/다음 검사·진료/연락 변화. 일반 질문 카드와 달리 요산 검사와 관절 평가를 구분한다. 부모 카드 설명만 역할에 맞춰 수정했으며 부모 의료 본문·출처 객체·Claim은 변경하지 않았다.

Main 직접 읽은 [NIAMS 진단·치료](https://www.niams.nih.gov/health-topics/gout/diagnosis-treatment-and-steps-to-take)(2023-12), [MedlinePlus 요산 검사](https://medlineplus.gov/lab-tests/uric-acid-test/)(페이지 갱신2026-07-15와 참고문헌 날짜 구분), [NHS Septic arthritis](https://www.nhs.uk/conditions/septic-arthritis/)(검토2023-03-23, 다음 검토2026-03-23 경과), [NHS Gout](https://www.nhs.uk/conditions/gout/)(검토2023-08-24, 다음2026-08-24 경과; 동영상 날짜를 본문 검토일로 사용하지 않음), 직전Tool25에서 직접 읽은 [NHS Breathlessness](https://www.nhs.uk/symptoms/shortness-of-breath/)(2024-01-30), 총5개. 예정 검토일 경과를 숨기거나 오누림 임상검수로 바꾸지 않는다.

한 요산 수치로 진단·감염 배제하지 않음. 두 질문은 고정 치료 순서 아님. 수분량·목표 요산·음식 제한·약 용량·자가 약 변경 없음. 부모 경고 상속+별도 인쇄 경고: 급성 관절 통증 OR 붓기 OR 피부색 변화 당일 신속 진료, 발열/모든 신호/약효/기록 대기 금지; 심한 호흡곤란·의식 변화119. 실제 c65647a diff 독립 검토 P2(처방대로 발작 때 쓰는 약까지 금지하는 듯한 문구)를 ‘발작·무증상 시기만으로 … 혼자 정하거나’로 최소 수정. 문구 재검토 잔여 P0/P1/P2 없음. 의료인 검수·agent 화면/테스트 확인 아님.

## QA

Baseline66words/source0 → local470/source5/outlinks18. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬69), Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

관련69tests PASS. 부모5폭/SEO PASS, 수정 후 도구5폭/SEO·인쇄·키보드 재실행 PASS. Main360/390/430/768/1440 상단 확인 및 최종 A4 2쪽(1279/1069자) 모두 직접 확인. 3필드·3질문·4답변선/출처5URL/footer12px/체크0/포커스false/overflow0/non-GET0/문맥 링크200.

MINZ 최초 plan/results-tool27 typecheck PASS는 수정 전 증거로 보존. 수정 후 fresh plan/results-tool27-revised, 실제 `npm run typecheck`(tsc --noEmit, 추가 lifecycle 없음) 검토 후 실행 exit0 PASS. 나머지9 NOT_SELECTED: 전체test/lint 직전Tool25 confirmed PASS는 현재 페이지 전체통과를 대신하지 않음(이번 직접 관련69tests 실행); sourceURL/build 최종 통합 예정; legacy check:links/validate:images/posts/seo는 현재 Onurim route검사로 대체; validate:health-medical-review는 실제 의료인 결과 미입력. 마지막 전체 Health audit Tool23, build Tool8 역사적 증거.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래47패킷·Claim 수정 없음. Production·Google 변경0. raw/page-qa 및 raw/tool-qa 동명 JSON, ignored local PNG/PDF/SEO·검증 계획/결과.
