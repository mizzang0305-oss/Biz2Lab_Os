# 수면무호흡증 — 질환 12/20, expansion 6/14

2026-09-06 · `/health/sleep-apnea` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

Fresh 개별 GSC는 DISCOVERED_NOT_INDEXED. 수집된 positive query row 없음. 밤의 가족 관찰과 낮의 본인 경험을 모아 검사 질문으로 연결하는 의도는 공식 정보 기반 편집 추론(INTERNAL_HEURISTIC)이며 검색량·순위·수정 후 색인 성과가 아니다.

| 공식 benchmark | 실제 확인 범위·날짜 | 채택·경계 |
|---|---|---|
| [NHLBI overview](https://www.nhlbi.nih.gov/health/sleep-apnea), [symptoms](https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms), [diagnosis](https://www.nhlbi.nih.gov/health/sleep-apnea/diagnosis) | 관련 본문 직접 확인, 모두2025-01-09 | 유형·밤낮 증상·검사 선택, 코골이/체형만으로 확정 금지 |
| [NHLBI treatment](https://www.nhlbi.nih.gov/health/sleep-apnea/treatment), [living](https://www.nhlbi.nih.gov/health/sleep-apnea/living-with) | 본문 직접 확인, 모두2025-01-09 | CPAP 일정압력, 개별 기기 지침, 복부불편/팽만 사용중단·의료진 연락, 졸음운전 금지 |
| [KDCA 수면무호흡증](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6308) | 등록2023-07-31/업데이트2026-07-30, 정의·유형·검사·치료 관련 본문 직접 확인 | CPAP가 무호흡 발생 후만 공기를 넣는다는 듯한 문구는 채택하지 않음 |
| [KDCA 월간 진단·관리법](https://health.kdca.go.kr/healthinfo/biz/health/ntcnInfo/healthSourc/thtimtCntnts/thtimtCntntsView.do?thtimt_cntnts_sn=171) | 표시 월2026-05, 관련 본문 직접 확인 | 본문 ‘6월’을 업데이트 날짜로 쓰지 않음 |
| [AASM 성인 진단 지침 PDF](https://www.aasm.org/resources/clinicalguidelines/diagnostic-testing-osa.pdf) | 원논문2017-03-15, 인쇄479쪽 권고2·3·4와 주변 배경을 Main 직접 확인; 독립 검토자는479쪽 실제 렌더링 확인 | 선택적 성인 가정검사, 음성/불확정/측정불충분 후 PSG 권고; 소아로 확대 안 함 |
| [FDA pulse oximeters](https://www.fda.gov/medical-devices/products-and-medical-procedures/pulse-oximeters) | 본문 직접 확인, 페이지 수정일 미표시 | 2025-01-07은 초안 발표일; 단일 산소값 확진·배제 금지 |
| [SJA CPR](https://www.sja.org.uk/first-aid-advice/cpr/), [recovery position](https://www.sja.org.uk/first-aid-advice/recovery-position/) | 관련 본문 직접 확인, 원출처 임상 검토2025-04-28 | 무반응 단독도 신고; CPR은 무반응 AND 비정상 호흡, 한국119 현지화; 회복자세 동작은 추가하지 않음 |
| [NHS breathlessness](https://www.nhs.uk/symptoms/shortness-of-breath/) | 직접 본문 확인,2024-01-30 | 심한 호흡곤란·의식 변화 도움 지연 금지 |

AASM PDF 전체105페이지를 모두 읽었다고 보고하지 않는다. PubMed 응답 본문 없음·PMC 접근 제한은 우회하지 않았으며 직접 확인 가능한 AASM 원문을 사용했다. 원출처 임상 검토일은 오누림 의료인 검수일이 아니다.

## 독립 가치·구조

FAMILY_SITUATION: 대화 시작 → 밤/낮 두 칸 → 폐쇄성/중추성 개념 → 일반 기기/가정검사/PSG 비교 → 결과·치료 질문 → 즉시119/운전 예방. 6sections/FAQ6/표2. 첫 독립 가치는 서로 다른 관찰자의 정보를 비난·감시 없이 구분하는 편집 예시, 둘째는 검사 이름보다 자료의 역할과 후속 평가를 확인하는 질문이다.

- Title: 수면무호흡증: 코골이·낮 졸림 기록과 수면검사 질문 | 오누림
- H1: 수면무호흡증이 걱정될 때, 밤과 낮의 변화를 함께 정리하기
- Description: 실제 밤낮 기록·검사 차이·양압기 상담 내용과 일치.
- 문맥 링크7: 관찰카드·증상기록·비만·검사결과·약목록·진료질문·위험신호. 독립 HTTP200 확인.
- 발행8/26, 실질 수정·출처 확인9/6, UI/Article/sitemap 일치. 작성자 박영훈/비의료인. Article/Breadcrumb 사용, 허위 Physician/FAQPage/의료검수 배지 없음.

## 의료·provenance

최종 페이지12sources/global122. 새 delta9개는 `../raw/source-deltas-osa.csv`; 기존47개가 새 문장을 승인한 것이 아니다. AHI/압력/약 용량/공통 검사 점수·가족 대리 진단 없음. 양압기 압력 자가변경·약 임의중단 금지, 장치 부작용 예외는 출처에 따라 구분했다.

독립 P0/P1 blocker 없음. P2 4건 모두 반영:119문단 우선, SJA 무반응 신고 출처, 가정검사 후PSG권고 명시, 복부불편·팽만 시 양압기 중단/의료진 연락. 독립 최종 delta검토 잔여0,430 경고 Main 직접 확인. 신고 OR 조건과 CPR AND 조건은 분리되어 있다.

Main expansion70 exact 비교 및 content/medical-review diff0; 독립144개 claim 전체와47개 packet 전체 레코드가 HEADdcca280과 동일. 추가 SJA source는47개 packet과 무관. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED. 전체 작업 base 대비47개 파생 sourceDates/articleTitle은 이전 페이지에서 변경되었으므로 작업 전체 byte불변으로 확대 보고하지 않는다.

## 이미지

기존3개 직접 확인 후 새 concept/action2개. 최초 concept는 후두 뒤 식도로 흐르는 것처럼 보이는 통로 P1으로 폐기, 공개 파일에 쓰지 않았다. imagegen 수정본은 혀·연구개 뒤 인두 공간까지만 범위를 좁혔다. Main·독립 실제 검토에서 잔여 P0/P1 및 재생성이 필요한 P2 없음. 좁아짐의 정확한 비율·혀 이동량·중추성·치료 전후 그림 아님.

- concept-v2:1536×1024/164602bytes/SHA256 `4be12f5153599e7ea5140007d1d53d707f4250de8454058ca50482a192bb4e0d`
- action-v2:1536×1024/172174bytes/SHA256 `ab2f4bfd6fddf4cf579457aa43ded4058aa4ed9998c266619a654b7aea9ac62e`
- action은 동의한 가상 성인2명의 각자 노트 대화, 실제 환자·검수자·필수 가족감시 아님. 기존 파일 보존. prompt/폐기/수정 증거 `../raw/osa-image-generation.md`.
- manifest/alt/caption/크기/hash 일치, clinicalReviewCompleted=false. hero 장식 십자는 임상 승인 표시 아님. 3이미지 각1회.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 361 | 1250 |
| FAQ / 표 | 2 / 0 | 6 / 2 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 12 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route 미산출; 최종 전체 그래프 후속 |

## 인증

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

전체262tests, 명시적typecheck, lint오류0(기존경고1), healthaudit PASS. 최종4건 반영 후19SEO회귀/typecheck/5폭360·390·430·768·1440/SEO/healthaudit/build116 PASS. Main360top/390첫표/430두번째표·최종urgent/768FAQ/1440sources 실제 확인. 최종12sourceanchors/SSR200/selfcanonical/schemaerrors0/actual lastmod 확인. 처음 잘못 입력한 `audit:health:v3`는 script미존재로 실행되지 않았고 실제 `audit:health-v3`로 재실행 PASS. `../raw/page-qa/sleep-apnea.json`과 ignored local 폴더에 machine evidence.

이 페이지 작업 중 이전 천식 테스트의 선택필드 타입 누락도 assertion으로 보완했다. 천식 dossier에 시점 오류를 정정했으며 공개 천식 본문 변경 없음. 자동 안전 PASS는 임상·실제독자·fieldCWV·Google색인 보장이 아니다. Preview·Production·색인 요청 없음.

## Tool26 연결 확인 — 2026-09-07

부모 카드만 실제 ‘밤·낮 수면 질문지’의 제목·역할로 연결했다. 부모 의료 본문·날짜·원래 Claim은 변경하지 않았다. 부모5폭/SEO 재실행 PASS. 도구4필드·3질문·6출처·상속/독립 인쇄 경고·A4 2쪽을 개별 인증했고 관련68tests/typecheck PASS. 상세 tool-sleep-apnea-visit-card.md. Production·Google 변경0, 임상 검수 미완료 유지.
