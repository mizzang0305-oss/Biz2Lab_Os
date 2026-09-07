# 지질검사 진료 질문지 — Tool 21/34

2026-09-06 · LOCAL · /health/tools/dyslipidemia-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY. 검사 설명을 개인 목표·후속 검사 계획으로 연결하는 독립 인쇄 작업이다. 부모는 네 지질 항목과 오해 해설, 도구는 원본·검사 조건·현재 이력을 가져가 답을 남기는 역할이다. 검색량을 추정하지 않는다. 독립 작업 YES / 도구만 NO / 3단계 사용법 YES / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC이며 실제 Google 색인 보장 아님. GSC 현재 분류는 04 ledger 원래 관찰값을 유지한다.

## 변경·출처·안전

4개 준비 필드와 4개 질문·답변 공간. 네 항목·단위를 원본대로 가져가고 기관 안내와 실제 식사 시각을 구분한다. 미확인 이력을 추측하지 않는다. 공통 목표치·금식 시간·약 중단·검사 취소를 지시하지 않는다. 증상 중심의 기존 범용 소개와 ‘한 장’ 약속을 검사 중심 제목·소개로 바꿨다. optional toolSummary는 DLP 한 도구에만 적용되며 나머지13개는 기존 fallback을 유지한다. 부모·허브의 카드도 같은 데이터로 연결된다.

Main 직접 읽은 공식 근거: [KDCA 지질검사](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6709), [NHLBI 진단](https://www.nhlbi.nih.gov/health/blood-cholesterol/diagnosis), [NHLBI 치료](https://www.nhlbi.nih.gov/health/blood-cholesterol/treatment). 기관별 검사 조건 차이를 하나의 금식 시간으로 합치지 않는다. 부모 경고의 NHLBI 심근경색 증상·KDCA 뇌졸중·심폐소생술을 합쳐 출처6개. 가벼워도 심근경색 의심 변화119, 갑작스러운 마비·말 이상과 위급한 호흡·의식 변화119, 검사값 재확인·서류 완성 기다리지 않음.

독립 AI 실제 diff 검토 미해결 P0/P1/P2 없음(마지막 toolSummary 추가는 Main이 소비자·diff 별도 확인). makeClaims는 observationItems/questions/toolSummary를 사용하지 않아 기존144 claim 및 47개 검토 문장의 변경이 아니다. 새 설명의 source mapping을 의료인 검수로 승격하지 않는다.

## QA

Baseline66 words/source0 → local461/source6/outlinks18. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬70). Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth는 NOT_AUDITED.

57SEO+6cutover=63tests PASS. 5폭 page QA/tool QA/SEO PASS. Main 360/390/430/768/1440 상단과 A4 3쪽(1280/1051/278자)을 직접 확인했다. 마지막 쪽은 남은 KDCA 출처와 정책 링크로 여백이 있으며 1~2쪽이라고 보고하지 않는다. 4필드·4질문·답변선과 출처6개 URL 유지, footer12px, 체크 키보드/초기화 PASS, overflow0, 내부링크200, non-GET0. 부모 dyslipidemia도 5폭 QA/SEO 재실행 PASS. 초기 도구 제목의 어색한 줄바꿈·부모 소개문 불일치를 수정 후 최종 화면·PDF를 다시 확인했다.

전체 test/lint/typecheck 마지막 PASS는 Tool20이며 이번 페이지 이후 전체 통합 검증은 후속이다. 최종 build/source URL/global crawl/Preview 미실행 상태를 PASS로 바꾸지 않는다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. Production·Google 변경0. raw/page-qa/dyslipidemia-visit-card.json, raw/tool-qa/dyslipidemia-visit-card.json 및 ignored reports/local PNG/PDF/SEO JSON.
