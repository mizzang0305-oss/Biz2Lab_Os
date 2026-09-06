# 지방간(MASLD) — 질환 9/20, expansion 3/14

2026-09-06 · `/health/metabolic-dysfunction-associated-steatotic-liver-disease` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

개별 GSC는 DISCOVERED_CURRENTLY_NOT_INDEXED, 마지막 crawl 미표시. 이를 Google이 콘텐츠를 평가해 거절한 상태라고 단정하지 않는다. 수집한 positive query row 없음. 간 수치 정상/초음파 지방간·MASLD 명칭·섬유화·보충제·검사 준비는 검색량·순위 실측이 아닌 출처/검색 결과 기반 의도다.

| 직접 확인한 benchmark | 제목·내용·시각·신뢰 패턴 | 적용 |
|---|---|---|
| [NIDDK Definition](https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/definition-facts) | NAFLD/NASH 이름·지방/염증/흉터 구분, 2021-04 검토 | 개념 분리, 필연적 단계로 그리지 않음 |
| [NIDDK Diagnosis](https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/diagnosis) | 병력·혈액·영상·탄성도·선택적 조직검사, 2021-04 | 검사 역할 비교와 준비 메모 |
| [NIDDK Treatment](https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash/treatment) | 생활/급격 감량/보충제, 2021-04 | 급격 감량·보충제 주의만 대조; 오래된 약 승인 문장은 사용하지 않음 |
| [AMC 지방간](https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31685) | 증상·진단·원인별 관리, 기사일 미표시 | 무증상 가능·다른 원인 확인; 과거 음주/일괄 감량 숫자 미사용 |
| [KDCA 간기능검사](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5444) | 검사 목적/항목/해석, 업데이트2026-05-06 | AST·ALT가 전체 간 기능 점수 아님, 참고범위·임상 상황 |
| [AASLD 명칭](https://www.aasld.org/new-masld-nomenclature) | 명칭/대사 요인/별도 MetALD 분류, 기사일 미표시 | 과거·현재 이름 연결, 개인 진단을 자동 변경하지 않음 |
| [EASL·EASD·EASO 지침](https://easlcampus.eu/sites/default/files/2024-08/EASL_CPGs_management_of_MASLD.pdf) | 학회 원문, 온라인2024-06-07/학술지2024-09 | 인쇄496 정상 간효소의 한계,513 보충제 효과·안전 근거 경계 |
| [NHS Alcohol-use disorder](https://www.nhs.uk/conditions/alcohol-use-disorder/) | 의존/금단/의료 도움,2026-04-24 | 금주가 무감독 급중단·자가해독 지시로 읽히지 않는 경계 |

추가 증상별 원문은 [황달](https://www.nhs.uk/conditions/jaundice/)(2024-01-22), [토혈](https://www.nhs.uk/symptoms/vomiting-blood/)(2025-08-18), [갑작스러운 혼동](https://www.nhs.uk/symptoms/confusion/)(2024-05-28)이다. 이미 간경변을 진단받은 사람에게 한정한 경고를 MASLD 전체의 단독 근거로 확대하지 않았다. NHS 과거 conditions URL이 증상별 symptoms URL로 이동하는 것을 확인해 현재 주소를 사용했다.

Main은 NIDDK4 본문, AMC/KDCA/AASLD, NHS4 본문과 날짜를 직접 확인했다. PDF 스킬에 따라 EASL 인쇄496/513을 로컬 렌더로 직접 읽었다. 해당 PDF는 ignored `reports/local/onurim-seo-v2/masld-sources/`에 있으며 논문 도표를 사이트에 복제하지 않는다. AASLD2023-06은 명칭 발표 사건일이지 페이지 수정일이 아니다. 기존 sourceDate2025였던 NIDDK3 metadata를 실제2021-04로 정정했다.

## 독립 가치·metadata

QUESTION_FIRST: ‘정상 간 수치와 초음파 소견 중 무엇이 맞나’ → 이름 → 지방/염증/섬유화 → 검사 역할 비교 → 원문과 생활·약 정보 → 개인 관리 → 도움 시점. 두 독립 가치는 검사별 질문 비교표와 기존 자료를 진료 대화로 바꾸는 메모다. 누구나 받는 검사 목록·진단 계산기가 아니고, 정상 결과자 전원에게 정밀검사를 권하지 않는다. 고유 FAQ6. 단어 수는 목표나 Google 기준이 아니다.

- Title: 지방간(MASLD) 검사 결과: 간 수치·초음파·섬유화 구분 | 오누림
- H1: 지방간이라는데 간 수치는 정상, 무엇을 더 물어볼까요?
- Description: 명칭·세 개념·검사 역할·원문/음주/약 질문이라는 실제 내용을 반영.
- 본문 문맥 링크: 검사표 읽기·약 목록·비만·혈당·지질·위험 신호·기존 MASLD 카드.
- 발행8/26, 실질 수정/출처대조9/6; Article/UI/sitemap 일치. 실제 비의료인 작성자, Article/Breadcrumb, 허위reviewedBy/Physician/FAQPage 없음.

## 의료·provenance

12출처, 본문7/FAQ6 각각 sourceIds 연결. 새 delta8개는 `../raw/source-deltas-masld.csv`. AST/ALT·일반초음파·탄성도 구분; 모든 조직검사·계산식 자가판정·개인 수치 목표 없음. 보충제/약 자가 시작·중단 금지. NIDDK2021의 ‘승인된 약 없음’을 최신 치료 현황으로 사용하지 않으며 미국/유럽 약 승인 사실을 국내 처방 가능성으로 옮기지 않는다.

새 황달은 당일 연락/신속진료, 갑작스러운 혼동은119, 토혈에 어지럼·전반적인 몸 불량·호흡 변화·검은 변 등이 동반되면119로 분리. 토혈이 멎고 다른 증상이 없어도 신속 의료 도움. 음주 의존·금단의 무감독 급중단 위험을 알리되 자가해독법·안전 음주량은 제공하지 않는다.

HEAD7c04b98의 expansion70 Claim records와 현재70을 읽기 전용 TS 평가로 비교해 동일. content/medical-review diff0, 전체144 유지. 새 MASLD article/source와 기존47교집합0. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 유지. 새 SEO 설명은 원래47에 포함되거나 임상 검수됐다는 뜻이 아니다. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED.

## 이미지

기존3개 직접 검사. 장식 hero의 한계를 명시하고 추상 concept/action은 보존 후 새 원본2개로 교체. 세포 안 지방·염증/손상·세포 밖 섬유조직의 위치가 구분되는 개념도, 실제 환자가 아닌 자료 정리 상황 이미지다. Main·독립 Astra 실제 시각검토에서 재생성이 필요한 P0/P1/P2 없음. 모든 캡션은 비필연적 단계·비진단·비복용권장·AI 생성 경계를 설명. `../raw/masld-image-generation.md`에 exact prompt와 raw경로.

- concept-v2:1536×1024/137308bytes/SHA256 `a88e229983a7ad57456fe587c9e7b3ddffe6bb40d690c183e373b2243776dd13`
- action-v2:1536×1024/156014bytes/SHA256 `a54f1aba594c5c7e240c866bd85c3c10aba441766faac32014ba9683c3e13239`
- SOURCE_CONCEPT_CHECKED, clinicalReviewCompleted=false. 실제3회 렌더로 이전5회 중복 제거, 크기/alt/caption/lazy loading 유지.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 392 | 1256 |
| FAQ / 비교표 | 2 / 0 | 6 / 1 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 12 / 3 / 1 |
| internal outlinks | 16 | 22 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route 미산출; 최종 전체 그래프 후속 |

## Tool23 연결 재확인 — 2026-09-06

도구 카드의 제목·소개를 검사 원문·음주·약 이력을 준비하는 작업과 맞췄다. 부모 의료 본문·claim은 변경하지 않았다. 부모5폭 UI/SEO 재실행 fail0이며 raw/page-qa의 해당 route는 이 재확인 관찰값이다. 아래 초기 build 기록과 구분한다. Tool23 통합 test/lint/typecheck 및 Health audit 최신 PASS는 별도 도구 dossier에 기록한다.

## 인증 증거

- INTENT / TITLE / DESCRIPTION / H1: 결과 불일치처럼 보이는 의문에 답하는 고유 metadata/H1 하나.
- CONTENT_UNIQUENESS: 검사 역할 표와 기존 자료 대화 메모, 고유 FAQ6, 실제 QUESTION_FIRST.
- MEDICAL_SOURCE: primary12/source delta8, 독립 텍스트·출처 재대조 P0/P1 없음. P2인 세포 팽창·염증 설명의 직접 근거 연결을 EASL 원문으로 보완하고 QA를 재실행했다. 임상 검수 아님.
- INTERNAL_LINK / IMAGE: route inventory/source anchor 결손0, 실제3개 이미지 load/alt/caption/hash.
- MOBILE: 360/390/430/768/1440 fail0; Main360top/390비교표/430urgent/768FAQ/1440sources 직접 확인.
- SCHEMA / CANONICAL / INDEXABILITY: Article/Breadcrumb, HTTPS www self, SSR200/index 허용/실제lastmod/sitemap.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

259tests/typecheck/health audit/build116 PASS, lint 오류0/기존경고1,5폭QA/SEO fail0,diffcheck PASS. 마지막 sourceIds 보완 후 빌드116/페이지QA5폭/SEO/SEO회귀16건 재통과. `../raw/page-qa/metabolic-dysfunction-associated-steatotic-liver-disease.json` 및 ignored local 동명 폴더. Preview·Production·색인 요청 없음.
