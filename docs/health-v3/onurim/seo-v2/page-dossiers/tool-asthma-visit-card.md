# 천식 진료 질문지 — Tool 25/34

2026-09-07 KST · LOCAL · /health/tools/asthma-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY. Fresh GSC DISCOVERED_NOT_INDEXED. 부모는 기도·개인 행동계획의 해설, 도구는 실제 기기·사용 경험·야간/활동 영향을 진료에서 대조하는 준비 작업이다. 독립 작업 YES / 도구만 NO / 3단계 사용법 / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC이며 검색량·색인·순위 보장 없음.

## 변경과 출처

3필드·3질문. 증상 시기·수면/활동 영향, 실제 흡입기·약·사용 뒤 변화·어려움, 받은 행동계획·이전 발작/진료 기록을 가져가 기기 사용법과 현재 지침·연락 기준을 질문한다. 미확인 허용, 기록 완성은 진료 조건이 아니다. 시범은 진료팀 안내에 따르고 연습을 이유로 추가 흡입하지 않는다. 색상별 역할·공통 용량/흡입횟수·PEF구간·기기 구매·자가 자극 시험 없음. 새 행동계획을 만들거나 기존 계획을 대체하지 않는다. 부모 toolSummary도 실제 제목·작업과 맞췄다.

Main과 독립 AI가 직접 확인한 공식5출처: [NHLBI Managing](https://www.nhlbi.nih.gov/health/asthma/living-with), [Action plan](https://www.nhlbi.nih.gov/health/asthma/treatment-action-plan), [Attack](https://www.nhlbi.nih.gov/health/asthma/attacks)(각2024-04-17), [NHS Asthma](https://www.nhs.uk/conditions/asthma/)(페이지2025-04-07,영상2024-05-01과 구분), [Breathlessness](https://www.nhs.uk/symptoms/shortness-of-breath/)(2024-01-30). NHS의 개별 처방·한 기기 복수 역할을 보편 약물 알고리즘으로 합치지 않았다.

부모 경고 상속 + 인쇄 양식에도 독립119경고. 심한 호흡곤란·말하기 어려움·색 변화·갑작스러운 혼란을 각각 안내하고, 발작 중 처방약으로 완화되지 않는 상황도 즉시 도움. 여러 신호·색 변화·계획서·기록·약효를 기다리지 않음, 직접 운전 금지. 발작 뒤 호전돼도 신속한 후속 진료. 실제 dcb2b77 대비 독립 diff 검토 잔여 P0/P1/P2 없음; 이후 Main은 사용 설명의 중복만 축약하고 안전 경계는 유지했다. 의료인 검수 아님.

## QA

Baseline61words/source0 → local445/source5/outlinks19. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬69), Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

관련67tests PASS, 최종 축약 뒤5폭/tool/SEO PASS. Main360/390/430/768/1440 상단과 A4 최종2쪽(1252/1008자) 모두 직접 확인했다. 첫3쪽1258/118/1008과 중간1186/118/1008은 주의 문단만 별도 페이지로 밀려 미인증. 일반 사용 설명만 더 간결하게 해 최종2쪽; 경고·기입란·출처·글씨 축소 없음. 3필드·3질문·4답변선/출처5URL/footer12px/체크0/포커스false/overflow0/non-GET0/문맥 링크200. 초기 PNG 보존. 부모 카드도5폭/SEO 재실행 PASS.

MINZ 최초 실행은 인쇄용 설명 수정으로 lib/health-v3/tool-editorial.ts 지문이 달라져 실행 전 INVALID_INPUT_STALE_PLAN_OR_OUTPUT_REFUSED(exit2), 결과 파일 없음. 같은 판정 재확인 후 새 discovery·argv/lifecycle를 확인했다. 최종 verification-plan/results-tool25-confirmed 기준 `npm run test`, `npm run lint`, `npm run typecheck` 모두 exit0 PASS. 원래 계획과 중간 계획 보존. stdout은 hash/byte만 보존하므로 전체 테스트수/경고수는 추정하지 않는다.

나머지7 NOT_SELECTED: `check:health-source-urls`·`build` 최종 통합 예정, `check:links`·`validate:images`·`validate:posts`·`validate:seo`는 legacy 대신 현재 Onurim route감사, `validate:health-medical-review` 실제 의료인 결과 미입력. 전체 Health audit는 직전Tool23, build는Tool8의 역사적 증거다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래47패킷·Claim은 수정하지 않았다. Production·Google 변경0. raw/page-qa 및 raw/tool-qa 동명 JSON, ignored local PNG/PDF/SEO·검증 계획/결과.
