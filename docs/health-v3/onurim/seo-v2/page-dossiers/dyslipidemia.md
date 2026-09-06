# 이상지질혈증 — 질환 7/20, expansion 1/14

2026-09-06 · `/health/dyslipidemia` · LOCAL · **SEO_PAGE_CERTIFIED**

## GSC·intent·SERP

과거 CNI였으나 이번 개별 GSC는 INDEXED, crawl 2026-08-29, smartphone fetch 성공/crawl·index 허용/self user·Google canonical이다. 현재 개선 전에 이미 색인된 상태로, 이번 수정의 성과가 아니다. 수집한 positive query row 없음. LDL·HDL·중성지방·고지혈증 차이·금식·치료는 검색량 실측이 아닌 출처/검색 결과 기반 의도다.

| 직접 확인한 benchmark | 제목·내용·시각·신뢰 패턴 | 적용 |
|---|---|---|
| [KDCA 이상지질혈증](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6715) | 질환명·정의/진단/위험별 치료·공공기관, 2026-08-19 업데이트 | HDL 저하까지 포함하는 용어, 개인 위험별 상담 |
| [KDCA 지질 검사](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6709) | 항목별 의미·검사 준비·공공기관, 2026-05-06 업데이트 | 네 항목 표, 검사 당시 조건 메모 |
| [NHLBI Diagnosis](https://www.nhlbi.nih.gov/health/blood-cholesterol/diagnosis) | 검사·가족력·lipid panel 질문, NIH, 2024-04-18 | 진단 수치표 복사 대신 준비 조건과 질문 |
| [NHLBI Causes](https://www.nhlbi.nih.gov/health/blood-cholesterol/causes) | 생활/유전/질환/약/HDL 한계, 2024-04-19 | HDL 면죄·체형 낙인 배제 |
| [MedlinePlus](https://medlineplus.gov/cholesterol.html) | 질문형 용어·LDL/HDL/VLDL·연관 검사, NLM, 2025-03-18 | 지질 입자와 수치 역할 분리 |
| [서울아산병원 질환백과](https://rm.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31326) | 질환명·무증상·진단·치료, 병원 제공 | 참고 구조만; 일반 식사조절 기간을 모두의 치료 유예로 복사하지 않음 |

원문 표/문장/그림 복사 없음. KDCA와 NHLBI의 금식 시간/목적별 안내를 하나의 보편 시간으로 합치지 않는다. 검사기관 준비 지시와 실제 식사 여부를 확인한다. CDC 일반 목표치를 개인 치료 목표로 제공하지 않는다. NHLBI 치료 페이지의 특정 약·복잡한 기전·용량을 재게시하지 않는다.

## 고유 가치·metadata

**MYTH_FIRST**를 실제 본문 순서에 구현: HDL 오해 → 네 검사 항목 → 혈관 벽 의미 → 검사 준비 메모 → 생활/약의 관계 → 응급 도움 → 상담 질문. 독립 가치 두 가지는 네 항목 역할 비교표와 결과표/검사 상황 메모표다. 기존 일반 정의·공통 FAQ2 대신 질환 고유 FAQ6을 사용한다. 단어 수는 목표나 Google 기준이 아니다.

- Title: 이상지질혈증 검사표 읽기: LDL·HDL·중성지방의 차이 | 오누림
- H1: 이상지질혈증, 검사표의 네 항목부터 보기
- Description: 네 항목·금식 여부·이전 결과·개인 목표/약 상담을 구체적으로 설명.
- 본문 문맥 링크: 검사표 읽기·혈압·당뇨병·약 목록·질문 준비·위험 신호·기존 DLP 도구. 관련 없는 질환 링크 없음.
- 발행 8/26, 실제 수정·출처 대조 9/6; UI/Article/sitemap 일치. Article+Breadcrumb, 실제 비의료인 작성자, 허위 Physician/reviewedBy/FAQPage 없음.

## 의료·provenance

11개 출처와 13개 본문/FAQ 단위별 링크. 새 source delta8개를 `../raw/source-deltas-dyslipidemia.csv`로 분리. 범용 LDL 목표값/계산식/검사 간격/약 용량/금식 시간/자가 약 변경 없음. HDL이 다른 위험을 상쇄한다는 보장 없음. 가벼운 심근경색 의심 변화도 심해질 때까지 기다리지 않고119, 갑작스러운 마비·말 이상 및 위급한 호흡·의식 변화도119.

독립 Astra 대조 P0/P1 없음. P2 내부 링크404와 원문 출처 제목 불일치를 수정하고 실제200/HTML 재확인. 링크 inventory 회귀 검사 추가. 기존144 Claim records와 기존47 패킷·hash는 직전 HEAD와 동일; 페이지 override/source metadata 추가만 수행. 새 SEO 설명이 기존47에 들어 있거나 임상 검수됐다고 주장하지 않는다. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED, 합성 테스트 구분 유지.

## 이미지

기존3개 직접 검사. hero는 장식 표지로 역할/한계를 명시. 추상 concept과 반복 action을 built-in imagegen 원본 2개로 교체하고 이전 파일은 보존했다. 각각 벽 내 플라크와 좁은 통로, 이전·현재 두 결과표와 별도 질문 노트다. 임상 검수 아닌 SOURCE_CONCEPT_CHECKED. 독립AI도 실제 이미지·manifest·HTML caption·JSON-LD 일치를 재확인했다.

- concept-v2: 1536×1024, 170280bytes, SHA256 4bb2038b2f649040c436bd27739b5d9ef1a195ba9617cdb526ac2123027a0059
- action-v2: 1536×1024, 189530bytes, SHA256 7c23d40b5591acaf092f8b41c36fad26f037e0f1beaae1afaf168549d57af5fa
- 정확한 prompt·raw 경로·생성 경계: `../raw/dyslipidemia-image-generation.md`.
- 기사별 optional visuals로 다른 19개 기사 설정을 변경하지 않는다. 이미지3개를 명시 배치해 기존5회 중복 렌더를 제거. 표 아래 실제 HTML로 개념과 한계를 설명하고 화면 아래 이미지 lazy loading 유지.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 386 | 1175 |
| FAQ / 비교표 | 2 / 0 | 6 / 2 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 11 / 3 / 1 |
| content inlink / depth | HTML2 / 1, 가시성 미검증 | 단일 route에서는 미산출; 최종 그래프 후속 |

## 12개 인증

| gate | 증거 |
|---|---|
| INTENT_PASS | 네 항목 의미·검사 준비·HDL 오해 해소 |
| TITLE_PASS / DESCRIPTION_PASS / H1_PASS | 본문과 맞는 고유 metadata/H1 하나 |
| CONTENT_UNIQUENESS_PASS | 두 독립 표·질환 고유 FAQ6·실제 MYTH_FIRST |
| MEDICAL_SOURCE_PASS | 공식11출처/새 delta8/독립AI 대조, 임상 검수 아님 |
| INTERNAL_LINK_PASS | 잘못된 route 수정 후200; 본문 route inventory 검사/source anchor 결손0 |
| IMAGE_PASS | 원본3·새원본2 직접 검사, hash/크기/alt/caption/실제 로딩 |
| MOBILE_PASS | 360/390/430/768/1440 fail0 |
| SCHEMA_PASS | Article/Breadcrumb, 실제 작성자·날짜·새 이미지 연결 |
| CANONICAL_PASS | HTTPS www self canonical |
| INDEXABILITY_PASS | 200/SSR/index 허용/sitemap/실제lastmod |

Main이 360top/390네항목표/430준비메모표/768urgent/1440FAQ를 직접 확인했고 119 띄어쓰기를 보완했다. 257 tests PASS, typecheck PASS, lint 오류0/기존경고1, health audit PASS, build116 PASS. 최종5폭 QA 및 SEO fail0. 공통 renderer optional visuals 추가 뒤 OP5폭 회귀 PASS. 증거 `../raw/page-qa/dyslipidemia.json`와 ignored `reports/local/onurim-seo-v2/dyslipidemia/`. 초기 이미지2개 계약 위반 테스트는 새 action 그림을 추가해 해결했으며 기존 테스트 기준을 낮추지 않았다. Preview/Production/외부 색인 요청 없음.
