# 고혈압 — 질환 1/20

2026-09-06 · `/health/hypertension` · LOCAL candidate · **SEO_PAGE_CERTIFIED**

## 현재 상태와 의도

개별 GSC 검사 INDEXED. 스마트폰 Googlebot, crawl/index 허용, fetch 성공, user/Google canonical 모두 정규 URL. 페이지별 쿼리 노출은 이번 수집의 positive rows에 없으므로 관측된 쿼리를 만들어 붙이지 않는다. 주 의도는 고혈압 증상 유무와 집에서 혈압 재기, 부 의도는 두 숫자·커프·백의/가면 혈압·진료 준비다. 제안 쿼리는 수요량이나 순위가 검증된 키워드가 아니다.

## SERP·일차 자료 벤치마크

| 자료 | 제목/내용/시각/신뢰 패턴 | 채택한 방향과 차이 |
|---|---|---|
| [KDCA 고혈압](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6765) | 질환명 중심, 진단·치료 전반, 측정 자세/분류 그림, 공공기관·2026-04-27 갱신 | 백의/가면 양상을 설명하되 진단값을 제시하는 자가판정표는 만들지 않음 |
| [CDC About High Blood Pressure](https://www.cdc.gov/high-blood-pressure/about/) | 정의·두 숫자·미국 기준, 이미지와 관련 주제 링크 | 한국 독자에게 미국 cutoff를 보편 기준처럼 옮기지 않음 |
| [AHA Home Blood Pressure Monitoring](https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home) | 기기/커프→측정→기록→연락, 인쇄 기록 도구, 2025-08-14 검토 | 기기·조건 점검을 원래 값/진료 질문과 연결 |
| [WHO Hypertension](https://www.who.int/news-room/fact-sheets/detail/hypertension) | 환자용 증상·관리 요약, 2025-09-25 | 증상 없음이 배제 기준이 아님을 교차 확인; 통계·치료 목록을 복사하지 않음 |

정확한 SERP 순위·검색량은 주장하지 않는다. 원문 문장/표/그림은 복제하지 않았다.

## 콘텐츠 평가와 변경

이전 약점: 세 가지 일반 FAQ, 비공개 파일럿 eyebrow, 기준 차이/측정 조건의 해석 부족, 관련 support 링크 부족. 고혈압 개념 그림에는 혈관 밖에서 안으로 누르는 화살표가 있었다.

독립 가치 1: 백의·가면·측정 조건을 구분하고 각각 어떤 원래 기록을 가져갈지 연결하는 비교표. 가치 2: 커프/자세/직전 활동 점검표와 혈압계·횟수·약에 대한 진료 질문. 두 가치 기준은 INTERNAL_HEURISTIC이다.

- Title: **고혈압 증상과 혈압 재는 법, 가정혈압 기록표 | 오누림**
- H1: **고혈압을 이해하고 집에서 혈압을 정확히 기록하는 법** — 1개.
- Description: 증상 없이도 측정할 이유, 커프/자세, 진료실·가정 차이와 상담/응급 경계를 정확히 요약한다.
- 구조: 증상 부재 → 두 숫자 → 장소 차이 → 조건 점검 → 측정·기록·질문 → 생활/약 한계 → 응급/비응급 연락 → 가족 준비. 고정 질환백과 목차를 따르지 않는다.
- FAQ 6개: 한 번 높은 값, 무증상, 약 중단, 진료실/집 차이, 손목/위팔 기기, 반복 측정. 각각 별도 질문이며 HTML/키보드 접근 가능.

## 출처·의료안전

페이지의 section/FAQ마다 `sourceIds`를 실제 5개 출처 anchor에 연결했다. 위 3개와 [KDCA 뇌졸중](https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/ccvcdInfo/cbvcacdInfoMain.do), [KDCA 심근경색](https://health.kdca.go.kr/healthinfo/biz/health/ccvdInfo/cvcdInfo/miInfoMain.do)을 2026-09-06 직접 대조했다. WHO는 연구 교차 확인 자료이며 페이지 source count에는 포함하지 않는다.

`../raw/source-deltas-hypertension.csv`에 신규/수정 개념과 위험등급을 분리 기록했다. 기존 claim ID는 기존 주장 범주를 연결하며 신규 문장 전체가 기존 47개 임상 패킷에 포함되었다는 뜻이 아니다. 원 패킷 문장/해시를 덮어쓰지 않았다. SEO 변경분은 향후 실제 의료 검토에서 원 패킷과 함께 재확인해야 한다.

독립 Astra 읽기 전용 검토도 P0/P1 blocker를 발견하지 못했다. **AI 출처 대조이지 면허 의료인 검수가 아니다.** 개인 cutoff·약 용량·확정 진단 없음. 응급 증상은 혈압 확인/재측정을 기다리지 않고 119. 응급 증상이 없어도 매우 높은 값이 지속되면 정기 진료까지 미루지 않고 의료진에게 바로 연락하도록 분리했다.

## 시각자료·신뢰·링크

- 기존 4개 이미지 원본을 직접 보았다. hero의 기록 장면은 측정 후 행동이며 측정 중 쓰지 않는다는 caption을 명시했다. warning/checklist는 본문 행동과 대조했다.
- process 그림은 built-in image generation 편집으로 내부→벽 방향 화살표로 수정했다. 4단계 진행 오해도 제거했다. 실제 해부도/진단 영상이 아닌 개념임을 caption에 표시한다.
- 새 파일 `public/images/onurim/hypertension/process-v2.webp`: **1536×1024, 65,206 bytes**, SHA-256 `63f7e8904e56a3bd5814fcba344caa0b1ab71a75305b3dc3976db7225a253e2d`. 원 process.webp는 삭제하지 않아 복구 가능하다. manifest는 62개 현재 자산 중 해당 항목을 새 파일로 연결하고 SOURCE_CONCEPT_CHECKED/의료 검수 false로 기록했다.
- 원본 생성 PNG는 Codex generated_images에 보존, 실제 사용 WebP는 worktree에 포함. prompt·편집 방식·한글 alt/caption은 `../../visual-assets.json`에 기록. Biz2Lab 이미지 스킬의 기존 B2B 경로 대신 이미 존재하는 Health asset 모델을 사용했다. 현재 Owner 요청이 image generation을 명시 허용하므로 prompt-only 기본값보다 우선한다.
- 위팔 측정 support, 혈압 기록/질문 도구, 복용약 목록, 위험 신호, 뇌졸중, hub/작성자/편집/출처/의료검수 상태를 문맥 연결. unrelated disease SEO 링크 없음.
- 박영훈/비의료인 편집자 및 검수 미완료 유지. 발행일 8/26은 최초 도입 Git, 수정/대조 9/6은 이번 작업. 다른 질환 날짜는 바꾸지 않았다.

## Before / after

| 관측 | Production | local |
|---|---|---|
| 토큰화 word count | 586 | 996; 길이는 목표/랭킹 근거 아님 |
| FAQ/비교표 | 3/0 | 6/2 |
| 출처/이미지/도구 | 5/4/4 | 5/4/4 |
| 내부 distinct outlink | 19 | 24 |
| inlink/depth | HTML 6/1; 가시성 미검증 | 단일 route 실행으로 재산출하지 않음; 전체 그래프 후속 |
| Article | dateModified 고정, published/image 없음 | 실제 날짜·사용 이미지, Breadcrumb 추가 |

## 최종 QA

| gate | 판정 근거 |
|---|---|
| INTENT_PASS | 증상/가정 측정/진료실 차이 의도에 집중 |
| TITLE_PASS | 실제 고유 내용과 기록 도구를 설명 |
| DESCRIPTION_PASS | 내용 범위 일치, 공포·효과 보장 없음 |
| H1_PASS | 단일 자연어 H1, SEO title과 분리 |
| CONTENT_UNIQUENESS_PASS | 장소 차이와 측정 조건이라는 질환 고유 정보 가치 |
| MEDICAL_SOURCE_PASS | P0/P1 포함 공식 원문 재대조 + 독립 AI 확인; 임상 검수 아님 |
| INTERNAL_LINK_PASS | 관련 지원/도구/질환/신뢰 href와 출처 anchor 결손 0 |
| IMAGE_PASS | 원본 4개 시각 확인, 잘못된 방향 수정, alt/caption/크기/본문 일치 |
| MOBILE_PASS | 360/390/430/768/1440 overflow 0, FAQ keyboard/이미지/표/메뉴/footer PASS; 화면 시각 검토 |
| SCHEMA_PASS | Article/Breadcrumb JSON 유효·실제 저자/날짜·허위 reviewedBy 없음 |
| CANONICAL_PASS | HTTPS www 정규 self canonical |
| INDEXABILITY_PASS | HTTP 200, SSR, index 허용, sitemap 포함/lastmod 실제 수정일 |

증거 `../raw/page-qa/hypertension.json`; screenshot/단일 route audit는 ignored `reports/local/onurim-seo-v2/hypertension/`. 표 2개 모두 각 폭으로 캡처했다. 공통 비교표 추출 후 HbA1c 5폭도 재검사 PASS.

검증: **248/248 tests**, typecheck PASS, lint 오류 0/기존 경고 1, build PASS(116 routes), health audit PASS, page SEO fail 0, Playwright 5폭 fail 0, diff whitespace PASS. 47개 패킷 해시 `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64` 보존.

`SEO_PAGE_CERTIFIED`는 local 한정. Preview·Production 미배포, 색인 요청 0, 실제 독자/의료 검수 미완료. 다음 질환: 제2형 당뇨병.
