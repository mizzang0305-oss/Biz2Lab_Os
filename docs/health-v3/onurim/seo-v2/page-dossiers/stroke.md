# 뇌졸중 — 질환 19/20, expansion 13/14

2026-09-06 · `/health/stroke` · LOCAL · SEO_PAGE_CERTIFIED

## GSC와 검색 의도

Fresh 개별 검사 DISCOVERED_NOT_INDEXED. 마지막 크롤·fetch·crawl/index 허용·사용자/Google canonical은 UI ‘해당사항 없음’, 참조 페이지 감지 없음, sitemap.xml은 표시됨. 미크롤 URL에 대해 허용 YES나 Google canonical SELF를 추정하지 않는다. Public baseline 200·self-canonical은 별도 HTTP 증거다. Positive query row 없음. 갑작스러운 증상·119·TIA·두 시각 구분은 공식 자료에서 확인한 편집 의도(INTERNAL_HEURISTIC)이며 검색량·Google 지역 SERP 순위 측정이나 로컬 변경의 색인 성과가 아니다.

## 공식 benchmark와 Main 직접 확인

| 자료 | 본문·날짜 실제 확인 | 설명 패턴과 사용 경계 |
|---|---|---|
| [KDCA 뇌졸중5495](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5495) | 개요·종류·원인, 증상 전체, 진단·검사와 치료 도입. 등록2020-07-22/업데이트2026-04-29 | 갑작스러운 독립 신호·119·허혈/출혈·영상 역할. 전체729줄·후반 모든 항목을 읽었다고 주장하지 않음 |
| [KDCA 조기증상119](https://www.kdca.go.kr/kdca/2855/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa2RjYSUyRjQ3JTJGMjE4NzQ4JTJGYXJ0Y2xWaWV3LmRvJTNG) | 게시글 본문과 전사00:10–00:17, 작성·최종수정2025-12-16 | 조기증상에서 바로 행동. 동영상 실제 재생·첨부 검증과 구분 |
| [CDC Stroke signs](https://www.cdc.gov/stroke/signs-symptoms/index.html) | 전체 본문·표시일2026-05-19 | 신호각OR·FAST·잠깐호전도응급·직접운전금지. 기존 MIG에서 갱신한 동일 레코드 재사용 |
| [KDCA 일과성 허혈 발작2607](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=2607) | 개요·유형·증상·진단/검사·치료 도입, 등록2020-04-04/업데이트2026-07-30 | 호전≠안전·원인 평가. 확률·지속시간·ABCD점수·자가치료 미제시, 전체FAQ 미독 |
| [NHLBI Diagnosis](https://www.nhlbi.nih.gov/health/stroke/diagnosis) | 전체 본문·Last updated2023-05-26 | 진찰/CT/MRI/혈액/심전도 역할; 모두 같은 검사순서·단일검사 자가결론 아님 |
| [NHLBI Treatment](https://www.nhlbi.nih.gov/health/stroke/treatment) | 전체 본문·Last updated2023-05-26 | 종류·시각·건강상황별 전문 판단과 후속 재활 계획만. 본문의3/4.5시간·약물분류 혼용·자가중단 지시를 복제하지 않고 최신 개인별 치료 지침으로 포장하지 않음 |
| [Stroke Foundation 기다림](https://strokefoundation.org.au/About-Stroke/Learn/signs-of-stroke/What-to-do-while-you-wait-for-an-ambulance) | 전체 본문, 자체 날짜 미표시 | 음식·물·아스피린 등 임의제공금지·전화 안내. copyright2026≠수정일, 호주번호·맥박/CPR세부·자세 일괄지시 미복제 |
| [Wisconsin DHS P-02469](https://www.dhs.wisconsin.gov/publications/p02469.pdf) | 2페이지 전체 추출 텍스트, 판본12/2023 | LKW와 첫 발견 시각 정의만. ‘Symptom Onset’ 제목의 본문은 discovery 정의이므로 발병 확정시각으로 번역하지 않음. 기존 평소 장애·목격/비목격·모름 구분 |

Wisconsin PDF 시각 증거는 미완료: Main 웹p0 screenshot InternalError/p1 Timeout, 로컬 공개 다운로드는 DNS ‘알려진 호스트가 없습니다’로 실패. 파일 렌더를 했다고 보고하지 않는다. 독립 연구도 이미지 없는 참조 문자열 결과라 시각 성공 판정 안 함. 공식 [NIH FITBIR STROKE 데이터사전](https://fitbir.nih.gov/dictionary/publicData/dataElementAction!view.action?dataElementName=SymptmOnsetDateTime&publicArea=true&style.key=fitbir-style)의 STROKE HTML 정의를 Main·독립 각각 직접 읽어 두 시각 구분을 보조 대조했다. 자체 날짜 미표시, Version1.1/참고문헌2009-11-04는 페이지 수정일 아님. 사전의 다른 질환 규칙은 사용하지 않고 공개 출처8개 수에 중복 추가하지 않았다.

ASA EMS Stroke Alert Form PDF는 Main 웹 접근 실패로 채택하지 않았다. 위 비교는 기관 문장·그림 복제나 기관 승인·면허 의료인 검수를 의미하지 않는다.

## 독립 가치와 on-page

BODY_SIGNAL: 갑작스런 신호 각각과119 → 막힘/출혈 → 일시호전의 오해 → 신고 후 두 시각 → 대기 중 음식·약 경계 → 응급실 검사 역할. 6sections/6FAQ/2tables. 두 시각 비교와 신고를 지연시키지 않는 행동 경계가 독립 가치다. 치료시간 숫자·예후 확률·점수표를 추가하지 않았다.

- Title: 뇌졸중 증상: 갑작스러운 신호 하나라도 119, 전달할 두 시각 | 오누림
- H1: 뇌졸중 신호가 갑자기 나타나면 즉시 119
- 첫 화면 H1·description에서119·갑작스러운 신호·일시호전 주의 확인.
- 문맥 링크5: 위험신호·뇌졸중카드·약목록·진료질문·평소고혈압관리. 약목록/질문카드는 신고의 선행조건 아님.
- 발행8/26·실제 수정/출처 대조9/6. UI/Article/sitemap 일치, SSR본문·HTML비교표·Breadcrumb. 박영훈 비의료 편집자와 의료인검수 미완료 유지, 허위Physician/reviewedBy/FAQPage 없음.

## 의료·원장 보존

8페이지 출처/global156. 직접 진단 자료와 대기·시각 근거를 추가해 원래 STR-P3-003/004 매핑의 한계를 보완했다. `../raw/source-deltas-stroke.csv`에 새 표현8개 별도 기록, licensed review NOT_COMPLETED. 원래 STR-P3-001..005 ID/문장/출처ID순서 그대로.

Main HEAD20d26a4대비 expansion70 exact동일·전체144/highrisk47·기존STR3source와47교집합0. PacketHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. content/medical-review 원장 파일 수정 없음. 전체base와 비교할 때 앞선 페이지의 파생 title/sourceDate 변경 사실과 구분한다.

MEDICAL_REVIEW_COMPLETED=NO · REAL_HUMAN_READER_TEST=NOT_PERFORMED. 기계 감사의 unresolvedPublicHighRiskClaims0은 기존 공개 안전판정 레코드에 관한 값이며 새 표현의 임상검수 완료가 아니다.

## 시각·모바일

기존3+신규2raw Main실제열람. 독립 raw검토 재생성필수P0/P1/P2 없음, 컵/시야모양/빈시계 의미를caption에보완. AI가상인물·다섯조건/단계/자가검사아님·시간모름허용/기록보다신고먼저. Manifest 3개 alt/caption·직접출처·clinicalReviewCompleted=false 일치. 기존파일보존.

- Concept1536x1024/193722B/SHA256 `ffa8882d9dcfdeccbe5d98f829975eb94a03b525cd6278e709ccfcbf740a7cc9`
- Action1536x1024/122826B/SHA256 `9d00915eb014fce1be2ee2989f2aa3c1008473e1aab5b06da45eed554fd529de`
- Exact prompts/raw: `../raw/stroke-image-generation.md`.
- Main360top/390두시각표/430긴급/768FAQ/1440출처 실제 확인. 첫화면119명확, 표는2개항목 모바일 카드형 대응,FAQ keyboard/nav/footer/3이미지각1회/source anchors,5폭overflow0.

## Before / after

| 항목 | Production baseline | Local |
|---|---|---|
| Word count | 378 | 1419 |
| FAQ / 표 | 2 / 0 | 6 / 2 |
| 출처 | heuristic2 (선언3) | 선언8; 품질인증 숫자 아님 |
| 렌더이미지 / 도구 | 5(고유3) / 1 | 3 / 1 |
| Internal outlinks | 16 | 20 |
| Content inlink / depth | HTML2 / 1, 당시가시성미검증 | 단일route미산출·전체후속 |

## QA

전체269tests/명시적typecheck/Healthaudit/lint0errors(기존1warning)/5폭QA/SEO/build116/gitdiffcheck PASS. 회귀26개중 뇌졸중119·각OR·TIA·두시각·자가약물/시간금지 추가. 기계 증거 `../raw/page-qa/stroke.json`, ignored local SEO/스크린샷.

독립 전체 검토: HEAD20d26a4대비144claims·47packets whole레코드exact동일,5링크200·source8모두resolve·각source anchor1회·최종WebP3개실제열람/hash/1536x1024/alt/caption/manifest일치. P0없음. P1 ‘어지럽고 균형’ 동시조건은 각각OR로 고치고 description/summary/FAQ에도어지럼명시했다. P2 긴급구역설명지연은119단락1개→5증상목록으로 정리, FAST는다음section으로옮기고CDC직접출처추가했다. delta01·회귀수정후전체269/type/Health/5QA/SEO/build116재PASS. Main최종430긴급화면실제재확인,독립해당delta재검토P1/P2해소·잔여없음.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

임상·실제독자·fieldCWV·Google색인 보장 아님. Preview/Production/색인요청 없음.
