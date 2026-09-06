# 편두통 — 질환 14/20, expansion 8/14

2026-09-06 · `/health/migraine` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

Fresh 개별 GSC INDEXED, 마지막 crawl2026-08-30 20:56:20, smartphone/fetch·crawl·index 허용 및 user/Google selfcanonical. URL검사의 sitemap ‘일시적인 처리 오류’는 별도 관찰이며 전체 sitemap SUCCESS와 구분한다. 이번 작업은 재제출·색인 요청·Production 변경을 하지 않았다. 수집된 positive query row 없음. 두통 위치·조짐·일지·약 사용·응급 판단 의도는 공식 자료 기반 편집 추론(INTERNAL_HEURISTIC), 지역별 순위나 검색량 실측 아님.

| 공식 benchmark | 실제 확인한 본문·표시 날짜 | 적용 경계 |
|---|---|---|
| [MedlinePlus Migraine](https://medlineplus.gov/migraine.html) | Main 증상·단계·진단·치료 직접 확인, Last updated2025-11-20 | 모든 단계 필수 아님; 약 세부 선택 안 함 |
| [MedlinePlus Headache](https://medlineplus.gov/headache.html) | Main summary·응급·footer 직접 확인, Last updated2025-11-19 | 응급 신호를 두통과 모두 동반해야 하는 조건으로 안 씀 |
| [KDCA 편두통6557](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6557) | Main 정의·원인·진단·관리·위험 관련 본문 직접 확인, 등록2024-07-30/업데이트2026-06-05 | 조사 agent는 앞서 직접조회 실패했으나 Main은 성공; 지속시간·약횟수 대기기준 안 만듦 |
| [서울아산병원31876](https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31876) | Main 정의·증상·진단·치료·경과 직접 확인, 등록/수정일 미표시 | 영상검사 정상=확진 안 함 |
| [NHS Migraine](https://www.nhs.uk/conditions/migraine/) | Main 본문·footer 직접 확인, Page reviewed2026-03-10 | video reviewed2026-06-16과 구분;2일/1시간/72시간을 안전대기선으로 안 씀 |
| [MedlinePlus Headaches—danger signs](https://medlineplus.gov/ency/patientinstructions/000424.htm) | Main 본문 직접 확인, A.D.A.M. Review2025-10-27 | NIH 저작이나 오누림 임상검수로 표시 안 함 |
| [MedlinePlus Managing migraines at home](https://medlineplus.gov/ency/patientinstructions/000420.htm) | Main 본문 직접 확인, A.D.A.M. Review2023-12-31 | 참고문헌2024/인증2028과 구분; 식품·약횟수 일률 지시 안 함 |
| [CDC Stroke Signs](https://www.cdc.gov/stroke/signs-symptoms/index.html) | Main 전체 관련 본문·상하단 날짜2026-05-19 확인 | 급한 각 증상 OR·호전대기/운전금지, 치료 시간창 안 옮김 |

NINDS 현재 본문은 조회403으로 미열람. 기존 claim 원장에는 보존하되 이번 페이지 source 목록·대조완료로 표시하지 않았다.

## 독립 가치·구조

BODY_SIGNAL: 새 위험신호 먼저 → 한쪽 통증이라는 오해 → 전·중·후 경험(필수단계 아님) → 조짐 설명의 한계 → 병력/선택 검사 → 두통날과 실제 급성기약 사용날 분리 → 급성·예방치료 목적. 7sections/6고유FAQ/2표. 독립 가치는 진단용 타임라인이 아닌 경험 질문과, 복용 일정이 아닌 실제 사용기록을 구분하는 것.

- Title: 편두통: 증상 흐름·두통 일지·응급 신호 구분 | 오누림
- H1: 편두통이 걱정될 때, 평소 두통 패턴과 새 변화를 나눠 보기
- Description: 위치·전후 변화·조짐 한계·기록·도움 요청이라는 실제 본문과 일치.
- 문맥 링크7: 뇌졸중·위험신호·증상일지·검사결과·편두통카드·약목록·진료질문. 최종 전체 graph에서 inlink/depth 후속 검증.
- 실제 발행8/26/수정·출처대조9/6, UI/Article/sitemap 날짜 일치. 비의료인 박영훈·의료인검수미완료 유지. Article/Breadcrumb; 허위 Physician·reviewedBy·FAQPage 없음.

## 의료·provenance

8페이지 출처/global131. delta9개는 `../raw/source-deltas-migraine.csv`. 원래144개 claim ID/문장/원장 연결을 재작성하지 않았다. 새로운 공개 section/FAQ의 직접출처는 현재 조회 성공한 자료로 연결하며 임상 승인이 아니다.

Main HEAD3de2dba 대비 expansion70 exact동일, content/medical-review diff0, 전체144/highrisk47 및 migraine/refresh한 Medline2·CDC와47교집합0 확인. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. 작업 전체 base대비 이전 페이지의 파생 title/sourceDate 변경은 있으므로 전체과정 bytes불변 주장은 안 한다.

MEDICAL_REVIEW_COMPLETED=NO · REAL_HUMAN_READER_TEST=NOT_PERFORMED. 새로운 신경 변화의 임의 ‘조짐’ 확정 금지; 갑작스러운 증상 각각119; 기다릴 시간·통증약 안전횟수·용량 없음. 임신/출산직후 신속 상담, 급한 신호는 예약 대기 아님. 예방약을 급성기 약 과용과 동일 취급하지 않음.

## 시각·모바일

기존3개 실제 확인, concept/action2개 새 생성·기존 파일 보존. Concept 빛/소리·메스꺼움·피로의 선택적 경험만, 전조 섬광/마비/의식저하를 일상 단계로 만들지 않음. 독립 image P2 캡션 보강 반영. Action 두 제목 ‘두통 기록 / 약 사용 기록’ 정확·빈 칸, 실제 환자·임상 기록 아님/복용 일정 아님 표시.

- concept-v2:1536×1024/154964B/SHA256 `5b1547c70c1d5a1ce0090aba0b8ca1ee2ddd1ac357221de90f678a3be075a1fd`
- action-v2:1536×1024/74934B/SHA256 `c73d4207e8e8f8a90674bcba965914378427511791097b6be30daaeb8767351e`
- exact prompts·raw provenance: `../raw/migraine-image-generation.md`. manifest clinicalReviewCompleted=false.
- Main360top·urgent/390첫표/430약기록표/768FAQ/1440출처 실제 확인. 표 모바일 카드, nav·footer 보임, 3이미지 각1회 정상 로드. 긴 H1·첫화면은 질환 소개이고 응급 summary/첫section/목차 바로가기 유지. 기계검사에서만 자동 ‘사람이 이해함’을 추정하지 않음.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 377 | 1331 |
| FAQ / 표 | 2 / 0 | 6 / 2 |
| 출처 / 렌더이미지 / 도구 | 3 / 5(고유3) / 1 | 8 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일route 미산출; 최종 전체 그래프 후속 |

## QA

전체264tests/명시적typecheck/lint오류0(기존경고1)/healthaudit/build116/5폭360·390·430·768·1440/SEO PASS. SSR200/selfcanonical/actual lastmod/schemaerrors0/이미지alt0누락. `../raw/page-qa/migraine.json` 및 ignored local machine evidence.

독립 P1: 발열·목경직을 모두 필요한 조건으로 오해할 위험 → MedlinePlus 원문 재확인 후 ‘또는’·둘다대기금지·즉시평가불가시 응급기관/119 명시. P2: manifest 직접 sourceIds2개씩 추가. 이후21SEO회귀/명시적typecheck/5폭QA/SEO/build116 모두 재실행 PASS, Main 최종360urgent 재확인. 독립 delta 재검토 잔여P0/P1/P2없음. 원래144claim·47packet 전체레코드 HEAD3de2dba와 동일,13개본문FAQ source 연결누락0/7문맥링크HTTP200/8출처앵커·3최종WebP hash·alt·caption일치 독립 확인.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

임상 검수·실제 독자·fieldCWV·Google색인 보장 아님. Preview·Production·색인요청 없음.

## Tool 28 연결 후 확인 — 2026-09-07 LOCAL

두통 발생일과 실제 약 사용일을 구분하는 준비표로 카드 설명/필드/질문만 변경. 부모 의료 본문·날짜·Claim·출처 객체 미변경. 부모5폭/SEO PASS. 상세 개별 인증은 tool-migraine-visit-card.md. Production 미적용.
