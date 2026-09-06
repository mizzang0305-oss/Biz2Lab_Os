# 비만 상담 메모 — Tool 22/34

2026-09-06 · LOCAL · /health/tools/obesity-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

NOINDEX_FOLLOW. Fresh GSC DISCOVERED_NOT_INDEXED지만 비색인을 감추기 위한 선택이 아니다. 부모의 체중·생활 변화와 상담 준비를 보조하는 인쇄 메모이며 별도 검사·계산 기능을 붙이지 않는다. 독립 검색 역할 제한 / 도구만 NO / 3단계 사용법 YES / 부모 중복 역할 명시 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC. 검색량·색인 효과 추정 없음.

## 변경·출처·안전

변화·생활/약·원하는 도움의 3필드와 3질문. 가족의 동의·공유 범위·혼자 상담할 선택을 먼저 확인한다. 수치/날짜 미확인 허용, 감량 목표·열량·용량·자가약중단 없음. 기존 개인 기록 계획은 유지하면서 이 메모 때문에 새 기록을 의무화하지 않는다고 명시한다. toolSummary는 비만 한 도구의 부모·허브 카드 소개도 구체화하며 ‘한 장’ 약속을 없앤다.

Main 직접 재확인: [NIDDK 요인](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/factors-affecting-weight-health)(2023-05), [의료 대화](https://www.niddk.nih.gov/health-information/professionals/clinical-tools-patient-management/weight-management/talking-with-your-patients-about-weight)(2023-08), [MedlinePlus 체중 증가](https://medlineplus.gov/ency/article/003084.htm)(2025-07-03), [다리 부종](https://medlineplus.gov/ency/article/003104.htm)(2025-05-19). KDCA CPR까지 부모 경고와 합쳐 출처5개. 새 급격 증가·부종은 의료기관 연락, 부종과 숨참 또는 가슴 압박·조임은119, 심한 호흡곤란·의식 저하119, 기록 완성 대기 없음. 의료진 대화 원칙의 가족 적용은 편집 제안으로 명시한다.

독립 AI 실제 diff P0/P1 없음, P2 ‘매일 기록 불필요’의 범위 모호함1건은 ‘이 메모를 위해’와 기존 개인 계획 유지 문장으로 해결·회귀 검사했다. makeClaims는 수정 배열·toolSummary를 사용하지 않아 원래 claim text/hash를 변경하지 않는다. 임상 검수 아님.

## QA

Baseline68 words/source0 → local465/source5/outlinks18. HTTP200/H1 1/self-canonical/noindex follow/sitemap제외(로컬69). Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

58SEO+6cutover=64tests PASS, 5폭 page QA/tool QA/SEO PASS. Main 360/390/430/768/1440 상단과 최종 A4 2쪽(1285/1303자) 직접 확인. 3필드·3질문·4답변선·출처URL5·footer12px 유지, overflow0, 체크 Space/초기화 PASS, 내부링크200/non-GET0. 부모 obesity도 카드 소개 변경 후5폭/SEO PASS.

실제 PDF 초기 검사에서 체크는0이지만 첫 체크박스 키보드 포커스 테두리가 남아 있었다. QA helper가 키보드 테스트 후 blur하도록 수정하고 focusedCheckbox=false 검증을 추가했다. 사이트 체크 기능을 변경한 것은 아니다. 최종 PDF에서 선택·포커스0 직접 확인. 이전 verified-pdf와 중간 final-pdf 로컬 렌더 보존, 최종 confirmed-pdf. 공통 QA 변경 때문에 최종 전체34도구 인쇄 재검사가 필요하다.

전체 test/lint/typecheck 최신 통합 PASS는 Tool20. 현재 이후 전체 build/source URL/global crawl/Preview는 후속이며 과거 PASS를 최신으로 승격하지 않는다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS (보조 역할 분리) / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. Production·Google 변경0. raw/page-qa/obesity-visit-card.json, raw/tool-qa/obesity-visit-card.json 및 ignored reports/local PNG/PDF/SEO JSON.
