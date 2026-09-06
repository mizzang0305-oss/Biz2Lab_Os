# 비만 — 질환 8/20, expansion 2/14

2026-09-06 · `/health/obesity` · LOCAL · **SEO_PAGE_CERTIFIED**

## GSC·intent·benchmark

개별 GSC는 INDEXED, 마지막 crawl 2026-09-04 21:31:09, smartphone fetch 성공/crawl·index 허용/self user·Google canonical. 현재 수정 전에 이미 색인된 페이지다. 수집한 positive query row 없음. BMI·허리둘레·체중 변화·가족의 도움·진료 준비는 검색량이나 순위 실측이 아닌 출처/검색 결과 기반 의도다.

| 확인한 benchmark | 제목·내용·시각·신뢰 패턴 | 적용 |
|---|---|---|
| [NIDDK Healthy Weight](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/am-i-healthy-weight) | 질문형 제목·BMI/허리둘레 한계·공공기관, 2023-05 검토 | 숫자 판정 대신 지표의 용도와 한계 비교 |
| [NIDDK Factors](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/factors-affecting-weight-health) | 생활·환경·약·질환·유전 분리, 2023-05 검토 | 체중과 함께 달라진 조건 메모 |
| [NIDDK Weight Conversation](https://www.niddk.nih.gov/health-information/professionals/clinical-tools-patient-management/weight-management/talking-with-your-patients-about-weight) | 의료진용 동의·낙인 없는 대화, 2023-08 검토 | 가족 대화로 편집 응용임을 명시; 검증된 가족 치료로 주장하지 않음 |
| [서울아산병원 비만](https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31809) | 질환명·정의/진단/치료·병원 제공, 표시일 미확인 | 지방/체중·근육량 구분; 오래된 수치·약 정보를 복사하지 않음 |
| [MedlinePlus 체중 증가](https://medlineplus.gov/ency/article/003084.htm) | 비의도적 변화·수분·진료 질문, 2025-07-03 검토, A.D.A.M. 작성 | 급격한 증가를 지방으로 단정하지 않고 약을 임의 중단하지 않음 |
| [MedlinePlus 다리 부종](https://medlineplus.gov/ency/article/003104.htm) | 도움 시점과 위험 증상 분리, 2025-05-19 검토, A.D.A.M. 작성 | 붓기와 숨참 또는 가슴 압박·조임의 즉시 도움 |

Main이 본문과 표시일 직접 대조. NIDDK 정의·요인·위험·건강체중·치료 페이지는 표시된 Last Reviewed 2023-05를 사용하며 참고문헌 연도를 페이지 날짜로 바꾸지 않는다. 미국 BMI/허리둘레 기준·수술/약 적응증·감량률·수면 시간·운동량을 국내 개인 처방으로 옮기지 않는다. 원문 문장·표·그림 복사 없음.

## 독립 가치·metadata

FAMILY_SITUATION을 실제 순서에 구현: 동의와 원하는 도움 → 지표의 한계 → 생활/약 변화 → 갑작스러운 증가와 응급 경계 → 선택적 지원 → 개별 치료 상담 → 질문. 가족이 환자를 관리하는 구조가 아니다. 독립 가치는 동의 중심 대화 카드와 세 가지 지표 비교표, 변화 시기/환경 메모다. 고유 FAQ6. 글 길이는 목표나 Google 기준이 아니다.

- Title: 비만 상담 준비: BMI·허리둘레와 수면·약·생활 변화 | 오누림
- H1: 비만 상담 전, 체중과 생활 변화를 함께 정리하기
- Description: BMI·허리둘레 한계, 생활/약 메모, 급격한 증가, 가족 동의라는 실제 내용을 설명.
- 약 목록·위험 신호·진료 질문·혈당·수면무호흡·기존 비만 카드에 문맥 링크. 본문 링크 route inventory 검사 통과.
- 발행 8/26, 실질 수정·출처 대조 9/6; HTML/Article/sitemap 일치. Article+Breadcrumb, 실제 비의료인 작성자; 허위 Physician/reviewedBy/FAQPage 없음.

## 의료·provenance

10개 출처, 본문7/FAQ6 각각 출처 연결. `../raw/source-deltas-obesity.csv`8개를 새 설명으로 분리한다. BMI는 무용하다고 하지 않고 직접 지방량을 측정하지 않는다는 한계를 설명한다. 급격 체중 증가의 수분 가능성과 붓기+숨참 또는 가슴 압박의119 행동을 분리한다. 약 변경 시기가 겹쳐도 원인 확정·자가 중단하지 않는다. 개인 숫자 목표·용량·보충제 권장 없음.

이 페이지 변경에서 기존 expansion70 Claim records를 HEAD의 TS를 읽기 전용으로 평가한 객체와 비교해 완전 일치 확인. 나머지 content/medical-review 모듈 diff0, 전체144 유지. 기존47에는 비만 article/source와의 교집합0으로 패킷도 직전 HEAD와 불변. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. SEO 신규 설명이 원래47에 포함되거나 임상 검수됐다는 뜻은 아니다. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED.

## Tool22 연결 재확인 — 2026-09-06

도구의 부모 카드 제목·소개를 ‘비만 상담 메모’와 실제 작업 설명으로 바꾸고 ‘한 장’ 약속을 제거했다. 본문·claim 수정 없음. 부모5폭 UI/SEO 재실행 fail0, raw/page-qa/obesity.json는 이 재검사 관찰이다. 도구의 NOINDEX_FOLLOW는 부모 가이드의 index허용을 바꾸지 않는다. 아래 전체suite/build는 초기 가이드 작업 당시 결과다.

## 이미지

기존3개 직접 확인 후 장식 hero는 의미의 한계를 정확히 적었다. 기존 추상 concept/action은 보존하고 imagegen 원본2개로 교체. 피하/복벽 안 장 사이 지방은 위치만, 생활 지원은 본인의 동의를 받은 선택지만 설명한다. Main·독립 Astra가 실제 새 그림을 보고 재생성이 필요한 P0/P1/P2 미발견. SOURCE_CONCEPT_CHECKED, clinicalReviewCompleted=false. 정확한 prompts/raw/SHA는 `../raw/obesity-image-generation.md`.

- concept-v2: 1536×1024 · 224600bytes · `fe6546b9e08ba0792718c325aeb5df1f125e94afd9a5b1d2773b6589ffc7a533`
- action-v2: 1536×1024 · 242684bytes · `b87e97b5e08dae2c7e530c3e030a734042bbc1c031f0fae2d93d1a7be2d0d105`
- 실제3개만 렌더해 이전5회 중복 제거. 모든 alt/caption/manifest 일치, 크기 지정/lazy loading 유지.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 399 | 1317 |
| FAQ / 비교표 | 2 / 0 | 6 / 2 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 10 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route에서는 미산출; 최종 전체 그래프 후속 |

## 인증 증거

최종12개: INTENT_PASS, TITLE_PASS, DESCRIPTION_PASS, H1_PASS, CONTENT_UNIQUENESS_PASS, MEDICAL_SOURCE_PASS, INTERNAL_LINK_PASS, IMAGE_PASS, MOBILE_PASS, SCHEMA_PASS, CANONICAL_PASS, INDEXABILITY_PASS.

- INTENT / TITLE / DESCRIPTION / H1: 구체적 상담 준비 의도, 고유 metadata와 H1 하나.
- CONTENT_UNIQUENESS: 가족의 동의·지표의 한계·변화 메모; 독립 표2와 고유 FAQ6.
- MEDICAL_SOURCE_PASS: 공식/병원/NLM-hosted 출처10, source delta8, 독립 Astra 재대조 P0/P1 및 신규 수정 필요 P2 없음. 임상 검수 아님.
- INTERNAL_LINK: 실제 route 검사, 끊긴 source anchor0.
- IMAGE: 직접검사·원본생성·hash/크기/alt/caption/실제로딩.
- MOBILE: 360/390/430/768/1440 fail0. Main은 360top,390대화표,430지표표,768urgent,1440FAQ 직접 확인.
- SCHEMA / CANONICAL / INDEXABILITY: Article/Breadcrumb, HTTPS www self canonical, SSR200/index허용/sitemap/실제lastmod.

258 tests PASS, typecheck PASS, lint 오류0/기존경고1, health audit PASS, build116 PASS, SEO fail0/5폭 QA fail0, diffcheck PASS. 증거 `../raw/page-qa/obesity.json`, ignored `reports/local/onurim-seo-v2/obesity/`. Preview/Production/외부 색인 요청 없음.

독립 Astra도 HEAD001587d4 대비144개 Claim 및47개 패킷 전체 동일, 본문 링크6개200, metadata/schema/이미지3개 일치를 확인했다. 기존 공통 CPR 출처의 `sourceDate:2023`은 등록연도이다. 실제 KDCA6226 원문은 등록2023-05-30/업데이트2026-05-21을 표시하며 Main도 현재 표시를 재확인했다. 원래47패킷의 공통 source bytes를 이 페이지 작업에서 바꾸지 않고, 이번 관찰의 등록일과 업데이트일을 여기 별도로 기록한다.
