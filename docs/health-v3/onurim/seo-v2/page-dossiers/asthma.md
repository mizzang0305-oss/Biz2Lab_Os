# 천식 — 질환 11/20, expansion 5/14

2026-09-06 · `/health/asthma` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

Fresh 개별 GSC는 DISCOVERED_NOT_INDEXED. 이번 로컬 수정의 색인 성과가 아니다. 수집한 positive query row 없음. 기도 변화·흡입기 역할·행동계획 읽기는 실제 공식 자료에 기초한 검색 의도 추론(INTERNAL_HEURISTIC)이며 검색량·순위 측정이 아니다.

| 직접 확인한 benchmark | 구조·신뢰·내용 | 적용 |
|---|---|---|
| [KDCA 천식](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6784) | 등록2025-09-26/업데이트2026-05-06, 정의·원인·병태생리 | 기도 벽·근육·점액 설명; 원본 이미지 복제 안 함 |
| [NHLBI Symptoms](https://www.nhlbi.nih.gov/health/asthma/symptoms) | 변동 증상과 유발 상황,2024-04-17 | 쌕쌕 소리만으로 확정·안전 판정 안 함 |
| [NHLBI Diagnosis](https://www.nhlbi.nih.gov/health/asthma/diagnosis) | 병력·검사 역할,2024-04-17 | 자가 숨참기·공통 검사 지시 없음 |
| [NHLBI Attack](https://www.nhlbi.nih.gov/health/asthma/attacks) | 기도 변화·응급 도움,2024-04-17 | 발작 중 약으로 완화되지 않으면 도움 지연 금지 |
| [NHLBI Treatment and Action Plan](https://www.nhlbi.nih.gov/health/asthma/treatment-action-plan) | 개인 계획·약 역할,2024-04-17 | 기존 계획을 읽는 질문, 자체 처방표 아님 |
| [NHLBI Managing](https://www.nhlbi.nih.gov/health/asthma/living-with) | 기록·PEF·개인 관리,2024-04-17 | 기기는 의료진 안내 시; 전원 구매나 공통 수치 없음 |
| [NHS Asthma](https://www.nhs.uk/conditions/asthma/) | 처방별 흡입기 역할·발작후 진료,페이지2025-04-07 | 영상2024-05-01과 구분; 약물 세부 지침 혼합 금지 |
| [NHS Shortness of breath](https://www.nhs.uk/symptoms/shortness-of-breath/) | 성인 응급/신속상담 구분,2024-01-30 | 호흡·말하기·색·의식 변화 각각의 즉각 도움 신호 |

Main은 NHLBI5/NHS2 관련 본문·날짜와 KDCA 정의·원인·병태생리까지 직접 대조했다. KDCA 추가 뒷부분 열람은 도구가 실패해 Main 전체 본문 열람으로 보고하지 않는다. 독립 Astra는8개 본문·날짜를 확인했다. NHS의 한 기기 복수 역할 처방과 NHLBI의 별도 약 역할 설명을 횟수·색·약명별 보편 프로토콜로 합치지 않았다. 해외 응급 번호는 한국119로 현지화.

## 독립 가치·고유 구조

SIMPLE_ANALOGY: 기도 통로 → 증상 변동/검사 → 안정된 날 → 흡입기의 역할 → 기존 행동계획5질문 → 계획에 연결할 기록 → 즉각119. 7sections/FAQ6/질문표1. 첫 독립 가치는 벽·근육·점액을 구분하는 개념도와 쉬운 설명, 둘째는 처방을 대신 만들지 않고 이미 받은 계획의 빈 정보를 찾는 질문이다.

- Title: 천식: 기도가 좁아지는 이유와 내 행동계획 읽는 법 | 오누림
- H1: 천식, 기도의 변화와 내 행동계획을 함께 이해하기
- Description: 실제 기도 변화·개인 계획·기록·응급 본문과 일치.
- 문맥 링크6: 알레르기비염·약목록·천식카드·증상기록·진료질문·위험신호. 독립 HTTP200 확인.
- 발행8/26, 실질 수정·출처 대조9/6, UI/Article/sitemap 일치. 작성자 박영훈/비의료인, 임상검수 미완료. Article/Breadcrumb만 사용하며 허위 Physician/FAQPage/reviewedBy 없음.

## 의료·provenance

8sources, 본문7/FAQ6 sourceIds·claimIds 모두 resolve. 새 delta8개는 `../raw/source-deltas-asthma.csv`; 기존47이 새 문장을 승인한 것이 아니다. 개인 처방·기기 사용법은 진료팀·약사에게 확인하며 임의 감량·중단·용량 증량·색별 처방·새 행동계획 생성 없음. 심한 호흡곤란에는 계획·기록·약효·색 변화 대기 금지.

독립 검토 P0/P1 추가 blocker 없음. P2인 ‘헐떡이고 말을…’와 ‘파랗고 회색…’을 각각 OR로 명확화했다. Main은 공통 component가 paragraphs를 bullets보다 먼저 출력함을 화면에서 확인해 천식 경고만 paragraphs5개(실제 기준3→설명2)로 정렬했다. 회귀 assertion과 최종5폭QA 재통과,430 경고 화면에서 기준이 먼저 보이는 것 직접 확인.

초기 자동 health 감사는 `스스로`/`혼자` 리터럴 경계 assertion에서 실패했다. 기존 임의 중단 금지 의미를 유지하면서 ‘약을 혼자 줄이거나 중단하지 말고 변경은 진료팀과 상의하세요’로 명확화했다. 감사 기준은 변경하지 않았고 최종 PASS이다. 자동 medicalSafety PASS는 임상 승인 아님.

Main은 HEAD882d0ac의 expansion70 records를 read-only 평가해 exact 동일, content/medical-review diff0, 전체144/highRisk47, 천식 article/source와47 교집합0을 확인했다. 독립 검토도144개 전체 claim 및47개 전체 packet 레코드 동일을 확인했다. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. MEDICAL_REVIEW_COMPLETED=NO, REAL_HUMAN_READER_TEST=NOT_PERFORMED.

## 이미지

기존3개 Main 확인 후 추상 concept/action을 새 원본2개로 대체, 기존 파일 보존. 열린/좁아진 기도는 내벽 부종·외측 근육·내측 점액을 구분하며 완전 폐쇄·치료전후·실제 조직 진단 그림 아님. 상담 장면은 가상 성인/빈 소품 문서/회색 기기이며 특정 제품·용량·실제 검수자 아님. 장식 hero의 십자 표시도 임상 승인과 구분했다.

- concept-v2:1536×1024/129074bytes/SHA256 `b2fa5a5f823a598ca63c70cf725d7d0cd259ae6805e2d3772bbacdd20d976386`
- action-v2:1536×1024/77258bytes/SHA256 `33204a6fc620f33ea963c322c2ca4bf8dc6e870fd07b1333c2da7cc601963f4e`
- 정확한 prompt·생성 경로 `../raw/asthma-image-generation.md`. Main·독립 실제 시각 검토 완료, 추가 이미지 finding 없음. manifest alt/caption/치수/hash 일치. SOURCE_CONCEPT_CHECKED/clinicalReviewCompleted=false. 이미지3개 각1회 렌더.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 361 | 1172 |
| FAQ / 표 | 2 / 0 | 6 / 1 |
| 출처 / 렌더 이미지 / 도구 | 3 / 5(고유3) / 1 | 8 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1, 당시 가시성 미검증 | 단일 route 미산출; 최종 전체 그래프 후속 |

## 인증

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

전체261tests/typecheck/lint오류0(기존경고1)/build116 PASS. 최종 표현·순서 수정 후 SEO회귀18건, healthaudit,5폭360/390/430/768/1440 fail0,SEO fail0,build116,diffcheck PASS. Main360top/390질문표/430urgent/768FAQ/1440sources 직접 확인. HTTPS www selfcanonical/SSR200/실제lastmod/출처anchor8개1회/schemaerrors0. `../raw/page-qa/asthma.json` 및 ignored local 동명 폴더에 machine evidence. 임상검수·실제독자·fieldCWV·Google색인 보장 아님. Preview·Production·색인 요청 없음.

후속 정정: dcca280 이후 수면무호흡증의 전체 `typecheck`에서 마지막에 추가했던 천식 테스트의 `urgent.paragraphs`가 선택 필드라는 TS18048 오류를 발견했다. 위261tests/typecheck PASS는 마지막 assertion 추가 전 상태이며, 최종 build/실행형 테스트만으로 해당 테스트 파일의 엄격 타입 통과까지 증명할 수 없었다. `assert.ok(urgent.paragraphs)`로 범위를 좁힌 뒤 명시적 `npm run typecheck`와 전체262tests를 재실행해 PASS를 확인했다. 공개 천식 본문은 변경하지 않았다. 이후 페이지는 최종 테스트 수정 뒤에도 명시적 typecheck를 실행한다.

## Tool25 연결 확인 — 2026-09-07

부모 카드 제목·소개가 실제 ‘천식 진료 질문지’와 일치하도록 toolSummary만 수정했다. 부모 의료 본문·날짜·원래 Claim은 변경하지 않았다. 부모5폭/SEO 재실행 PASS. 질문지는 3필드·3질문·상속 경고·독립 인쇄 경고·5출처로 개별 인증; 상세는 tool-asthma-visit-card.md. 최종 질문지 수정 후 full test/lint/typecheck exit0 PASS(검증 계획 confirmed). Production·Google 변경0, 임상 검수 미완료 유지.
