# 역류 증상·시간 기록표 — Tool 12/34

2026-09-06 · LOCAL · /health/tools/gerd-symptom-timing-log · SEO_PAGE_CERTIFIED

## 개별 의도·판정

INDEX_UTILITY 유지. Fresh GSC INDEXED. 식사·자세·불편 발생의 순서를 실제로 작성하는 기능이 질환 설명과 다르다. 독립 기록 의도 YES / 도구만 NO / 3단계 사용법 YES / 부모 설명과 실제 작성 구분 YES / 단독 활용 YES / 고유 title·H1·description YES / 문맥 링크 YES. 수요 규모·순위는 추정하지 않는 INTERNAL_HEURISTIC.

## 기록과 도움 요청 경계

7열 12행을 유지하며 실제 증상 시작 시각, 음식·음료·대략적인 양·시각, 자세·수면, 느낌·지속, 삼킴, 기존 약·시각, 메모로 구분했다. 12일 의무 기록·약 변경·식사 실험·산도검사 대체를 금지하고 미확인을 허용한다. 가짜 정상값이나 환자 예시는 없다.

별도 URL에 부모의 119 경고가 없던 누락을 해결했다. `inheritParentWarning`을 현재 이 도구에만 명시적으로 적용하여 부모 첫 경고와 출처를 그대로 연결한다. 경고는 사용 순서보다 먼저 표시되며 worksheet에도 119·출혈 시 바로 도움 요청을 남긴다. 다른 GERD 도구의 개별 편집·인증은 이후 직렬 진행한다.

Main [NIDDK GERD 증상](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes), [진단](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/diagnosis), [NHS GERD](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/), [NHLBI 심근경색 증상](https://www.nhlbi.nih.gov/health/heart-attack/symptoms), [NIDDK GI 출혈](https://www.niddk.nih.gov/health-information/digestive-diseases/gastrointestinal-bleeding/symptoms-causes)을 직접 읽었다. GI 출혈 source를 새로 연결(Last Reviewed 2024-07, registry 총 166). 부모 KDCA CPR 포함 실제 출처 6개. 일반 가정 기록에 산도검사의 진단 성능을 부여하지 않는다. 출혈의 도움 요청과 심근경색 의심·위급 상태의 119를 구분한다.

독립 AI 대조에서 이 도구의 미해결 P0/P1/P2 없음. 부모 후반 ‘삼키기 어렵거나 아프고…’의 잠재 AND P2도 별도로 발견했다. 다음 도구 전 각 조건을 OR로 명시하고 54 tests·5폭 QA·SEO 및 변경 구간 시각 확인을 통과했다. 독립 AI 재대조에서 해당 P2 해결 확인. 부모 dossier에 별도 기록했으며 사이트 전체의 P2=0이나 면허 의료인 검수를 주장하지 않는다.

## 전후·QA

45 words/source 0 → 427/source 6/outlinks 19. 200/self-canonical/index 허용/sitemap 포함(73). 실제 수정일 9월 6일, Breadcrumb only. 단일 페이지 inbound/depth는 미감사.

48 SEO + 6 public-cutover = 54 tests/typecheck/5폭 page QA/SEO audit/tool QA PASS. Main 360/390/430/768/1440 화면과 390 경고·표 우측·PDF 직접 확인. 실제 ArrowRight 이동·우측 도달, 내부 링크 200, non-GET 0, overflow 0.

첫 PDF는 마지막 정책 링크 한 줄만 3쪽으로 밀렸다. print footer의 9pt 의도가 공통 p 규칙 및 CSS 최적화의 :is() specificity에 덮인 것을 실제 computed style(13.333px)로 확인했다. 선택자 우선순위를 바로잡아 12px(9pt)을 검증하고 footer 여백을 0.6rem으로 줄였다. 본문·경고·출처·12행은 삭제하지 않았다. 최종 A4 2쪽 1155/1271자, 6개 URL과 마지막 정책 안내까지 포함. 최종 파일은 verified-pdf-*; 앞선 실패 출력은 로컬에 남아 있다.

54 tests/typecheck는 마지막 footer margin 조정 직전 재통과했고 margin 조정 후 tool QA·PDF를 재검증했다. 전체 test/lint/typecheck의 최신 통합 PASS는 직전 Tool11 상태, build는 Tool8 상태다. 공통 print footer 변경은 최종 전체 도구 QA에서 다시 확인한다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 기록표) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED = NO. REAL_HUMAN_READER_TEST = NOT_PERFORMED. 144 Claim·47개 패킷 본문과 해시 불변. Production·Google 변경 없음. 증거: ../raw/page-qa/gerd-symptom-timing-log.json, ../raw/tool-qa/gerd-symptom-timing-log.json. PDF/PNG ignored reports/local.
