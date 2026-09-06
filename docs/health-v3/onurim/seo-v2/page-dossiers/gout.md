# 통풍 — 질환 13/20, expansion 7/14

2026-09-06 · `/health/gout` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

Fresh 개별 GSC DISCOVERED_NOT_INDEXED, 수집된 positive query row 없음. 요산 수치의 의미·갑작스러운 관절 변화·치료 목적 구분은 공식 정보 기반 편집 추론(INTERNAL_HEURISTIC)이지 검색량·순위 실측이 아니다. 이번 로컬 수정은 Production 색인 성과가 아니다.

| 공식 benchmark | 실제 확인한 내용·날짜 | 사용 경계 |
|---|---|---|
| [NIAMS Gout](https://www.niams.nih.gov/health-topics/gout) | 본문 직접 확인, Last Reviewed2023-12 | 퓨린·요산·여러 관여 요인, 음식 비난 안 함 |
| [NIAMS Diagnosis/Treatment/Steps](https://www.niams.nih.gov/health-topics/gout/diagnosis-treatment-and-steps-to-take) | 본문 직접 확인, Last Reviewed2023-12 | 선택적 검사, 급성 완화/장기 예방 목적, 자기 처방 안 함 |
| [MedlinePlus Gout](https://medlineplus.gov/gout.html) | 본문 직접 확인, Last updated2024-02-26 | 여러 관절·증상·검사의 교육 범위 |
| [MedlinePlus Uric Acid Test](https://medlineplus.gov/lab-tests/uric-acid-test/) | 준비·결과 포함 본문 직접 확인, Last updated2026-07-15 | 검사수치≠진단, 약 임의 중단 금지; 참고문헌 날짜와 구분 |
| [KDCA 통풍6732](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6732) | 등록2025-05-19/업데이트2026-05-18, 정의·원인·진단·치료 관련 본문 직접 확인 | 고요산만으로 충분 아님/고요산이 없어도 관절증상 평가; 약세부 용량 안 옮김 |
| [NHS Gout](https://www.nhs.uk/conditions/gout/) | 본문 직접 확인, Page reviewed2023-08-24 | 다음 검토 예정2026-08-24 경과·영상2026-02-16과 구분; 자연 경과를 자가 대기기간으로 안 씀 |
| [NHS Septic arthritis](https://www.nhs.uk/conditions/septic-arthritis/) | 본문 직접 확인, Page reviewed2023-03-23 | 다음 검토 예정2026-03-23 경과; 급성 한 관절 통증/부종/피부색 변화의 신속 평가 |
| [ACR Gout](https://rheumatology.org/patients/gout) | 본문 직접 확인, Updated2025-02 | 높은 요산≠모두 통풍, 개인별 관리 |
| [NHS Shortness of breath](https://www.nhs.uk/symptoms/shortness-of-breath/) | 앞선 천식/OSA에서 직접 본문 확인,2024-01-30 | 호흡·의식119를 관절 당일진료와 구분 |

NICE NG219는 직접 본문 열람 실패(403/도구오류), 공식 검색 목록만으로 검증 완료 처리하지 않고 페이지 출처에서 제외했다. 해외 응급체계는 한국119로 현지화했으며 약물 선택·용량·일률 수치 목표는 만들지 않았다.

## 독립 가치·구조

MYTH_FIRST: 음식 비난의 오해 → 관절 결정/혈액 수치 → 즉각119·급성 관절 진료 → 검사 목적 → 급성/장기 치료 목적 → 두 칸 진료질문 → 생활/검사 준비 경계. 7sections/FAQ6/표1(4행). 첫 독립 가치는 검사값과 관절의 실제 염증을 구분하는 개념·그림, 둘째는 현재 통증과 장기 관리 질문을 함께 챙기는 메모 구조이다. 두 칸은 정해진 치료 순서가 아니다.

- Title: 통풍: 요산 수치만으로 진단할 수 없는 이유와 진료 준비 | 오누림
- H1: 통풍이 걱정될 때, 요산 수치와 관절 통증을 나눠 보기
- Description: 수치·급성 변화·두 치료 목적·상담 질문의 실제 내용과 일치.
- 문맥 링크7: 검사결과·위험신호·골관절염·약목록·통풍카드·진료질문·비만.
- 발행8/26, 실질수정·출처대조9/6. UI/Article/sitemap actual date 일치. 박영훈/비의료인, 임상검수미완료 표시. Article/Breadcrumb만, 허위 Physician/FAQPage 없음.

## 의료·provenance

9페이지 출처/global126. 새 delta8개는 `../raw/source-deltas-gout.csv`. 원장 GOUT-P3-005의 오래된 연결은 급성 관절 감염 기준을 직접 지지하기에 부족하므로 새 공개 section/FAQ에 NHS septic/Gout를 직접 연결했다. 원래144개 claim 문장·ID·연결 원장을 이 작업에서 재작성하지 않았고, 새로운 문장·출처 대조를 기존47개 의료 승인으로 승격하지 않았다.

Main HEADd875756 expansion70 exact 동일, content/medical-review diff0, 전체144/highrisk47 및 gout article/source와47교집합0을 확인. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED. 전체base대비 이전 페이지에서 파생 sourceDate/title 변경은 있었으므로 전 작업 전체 bytes불변 주장은 하지 않는다.

신속 진료 기준은 각각의 급성 관절 변화이며 발열을 필수로 묶지 않았다. 기저 통풍·수치·약 반응으로 감염 배제 안 함. 물의 일률량·금지 식품 목록·요산 기준·약 용량·자가 약 변경 없음. Main 모바일 검토에서119문단을 경고 맨 앞으로 옮겨 실제 즉각 행동을 먼저 표시했고20회귀/명시적typecheck/5폭QA/SEO/build를 재실행 PASS.

## 이미지

기존3개 실제 확인 후 concept/action2개 생성, 이전 파일 보존. 단순화한 관절의 결정 기호와 별도의 혈액 검체를 나란히 배치했으며 검체 안 결정/거대한 뼈 관통 결정/필수 진행 화살표 없음. 실제 관절 비율·진단 이미지 아님. 액션 노트의 한국어 ‘이번 통증 / 다음 관리’ 실제 확인, 빈 일정·기록이며 임상 처방표 아님.

- concept-v2:1536×1024/96338B/SHA256 `06f77598485f18317e10c0efcabe40e6ad5331be9dec7d149e59eb4887611dc5`
- action-v2:1536×1024/61580B/SHA256 `7661b7639ae425caa52103ee7a761bf209cbfd4b1045e5ab67fa409b5849975d`
- prompt·raw경로 `../raw/gout-image-generation.md`. Main+독립 실제 시각 확인 P0/P1없음, P2캡션2건 반영. clinicalReviewCompleted=false, manifest일치. 실제 환자·의료검수·복용일정 없음. 3이미지 각1회 렌더.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 383 | 1319 |
| FAQ / 표 | 2 / 0 | 6 / 1 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 9 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route 미산출; 최종 전체 그래프 후속 |

## 인증

전체263tests/명시적typecheck/lint오류0(기존경고1)/healthaudit/build116 PASS. 최종순서 변경후20SEO회귀/명시적typecheck/5폭360·390·430·768·1440/SEO/build116 PASS. Main360top/390질문표/430최종urgent/768FAQ/1440sources 직접 확인. SSR200/selfcanonical/actual lastmod/schemaerrors0. `../raw/page-qa/gout.json`과 ignored local 폴더에 machine evidence. 독립 최종 검토 P0/P1/P2 잔여0,144claim/47packet 전체레코드동일,13개본문·FAQ연결누락0,7본문링크HTTP200,9출처앵커각1회 및 최종WebP·manifest 일치 확인. 임상검수·실제독자·fieldCWV·Google색인 보장 아님. Preview·Production·색인 요청 없음.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.
