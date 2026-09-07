# 복통·배변 질문지 — Tool 24/34

2026-09-07 KST · LOCAL · /health/tools/irritable-bowel-syndrome-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

INDEX_UTILITY. Fresh GSC DISCOVERED_NOT_INDEXED이며 독립 상담 준비 작업을 보완한 로컬 판정이다. Google 색인 여부·수요를 보장하지 않는다. 부모는 IBS/IBD·통증과 배변의 관계를 설명하고, 도구는 실제 전후 변화·생활·약 이력을 가져가 개인 검사·식사 계획에 관한 답변을 남긴다. 독립 작업 YES / 도구만 NO / 사용법3단계 / 부모와 역할 분리 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. INTERNAL_HEURISTIC.

## 변경·출처·의료 안전

4필드·3질문. 배변 전후 덜 아픔·더 아픔·비슷함·모르겠음을 모두 허용한다. 새 출혈·체중 감소·밤에 통증으로 깬 일, 실제 약·최근 장염·아는 가족력을 사실대로 적는다. 일정 기록 기간을 진료 조건으로 삼지 않고 검사 주문·IBS 자가진단·IBD 감별·음식 도전·자가 약 변경·영구 제한식 지침을 만들지 않았다. 제한식의 필요·효과 확인·재도입은 의료진·영양 전문가와 상의한다. 부모 카드에도 실제 도구 역할과 제목을 반영했다.

Main이 [NIDDK 진단](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/diagnosis), [식사](https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/eating-diet-nutrition)(모두2017-11), [NHS IBS 증상](https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/symptoms/)(2025-03-17), [복통](https://www.nhs.uk/symptoms/stomach-ache/)(2023-05-26), [IBD](https://www.nhs.uk/conditions/inflammatory-bowel-disease/)(2023-05-05), [NIDDK GI출혈](https://www.niddk.nih.gov/health-information/digestive-diseases/gastrointestinal-bleeding/symptoms-causes)(2024-07) 본문을 직접 대조했다. 기존 부모 KDCA IBS와 합쳐 도구7출처. NHS 복통·IBD 차기 검토일2026-05 경과를 최신 검토 완료로 표현하지 않는다. NIDDK의 참고문헌2021을 검토일로 쓰지 않는다.

독립 AI 실제 diff 대조에서 부모의 ‘복통과 함께 … 타르변’이 통증을 필수 조건처럼 보이게 하는 P1 발견. Main 공식 GI출혈 원문 재확인 후 부모 경고·FAQ 및 인쇄 양식 모두 ‘검고 끈적한 타르 같은 변은 복통이 없어도 즉시 의료 도움’으로 분리했다. 기존 SRC-NIDDK-GI-BLEEDING 연결, 새 출처 객체/원래 Claim 수정 없음. 갑작OR심한 복통·쓰러짐·많은/멈추지 않는 출혈119, 새 출혈·이유 없는 체중 감소 당일 연락, 기록 완성·여러 신호 동시 발생을 기다리지 않음. 부모 실질수정일9/7; 기존 sourceCheckedAt9/6과 구분한다.

독립 AI 후속 문구·연결 확인에서 이전 P1 해결, 새 P0/P1/P2 미발견. 이 후속 확인은 테스트·화면 검증이나 의료인 검수가 아니다.

## QA와 범위

Baseline64 words/source0 → local513/source7/internal outlinks19. HTTP200/H1 1/self-canonical/index follow/sitemap포함(로컬69), Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

60SEO+6cutover=66tests PASS. 부모와 도구 각각5폭 page QA/SEO PASS, tool QA PASS. Main5폭 상단 및 최종 A4 3쪽(1333/1253/320자)을 모두 직접 확인. 1쪽 안내,2쪽4기입란·3질문·답변선·출처 일부,3쪽 나머지2출처·정책 링크로 실제3쪽이다. 초기4쪽은 설명의 near-blank overflow가 있어 일반 사용 설명을 간결화했고 경고·출처 글씨를 줄이지 않았다. 최종 footer12px, 모든7출처 URL, 체크0/포커스false, overflow0, 문맥 링크200, non-GET0. 초기·중간 PDF/PNG는 ignored local에 보존.

부모 추가 QA: local1285words/12sources/3images/outlinks20,5폭/SEO PASS; Main430px 경고 블록 직접 확인. 마지막 full test/lint/typecheck/Health audit는 직전 Tool23 증거이며 이 delta의 전체 suite 통과로 바꿔 쓰지 않는다. build는 Tool8 역사적 증거, 최종 통합 후 재실행 예정.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 인쇄 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 공식 출처·AI 대조는 면허 의료인 검수가 아니다. 새 SEO 문장은 원래47 패킷의 임상 승인으로 승격하지 않는다. Production·Google 변경0. raw/page-qa 및 raw/tool-qa 해당 slug JSON, ignored reports/local PNG/PDF/SEO JSON.
