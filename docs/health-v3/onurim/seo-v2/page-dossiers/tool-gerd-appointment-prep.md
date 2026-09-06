# 위식도역류 진료 준비 카드 — Tool 14/34

2026-09-06 · LOCAL · /health/tools/gerd-appointment-prep · SEO_PAGE_CERTIFIED

## 개별 판정

ENRICH_THEN_INDEX → INDEX_UTILITY. Fresh GSC UNKNOWN(개별 검사에서 Google에 알려지지 않음). 이를 crawl 실패나 Google canonical 오류로 바꾸어 기록하지 않는다. 기록 원본·현재 약을 검사 목적과 다음 상담 질문에 연결하고 답을 남기는 독립 기능을 보강했다. 독립 준비 의도 YES / 도구만 NO / 3단계 사용법 YES / 부모의 검사 설명과 실제 질문·답변 구분 YES / 단독 활용 YES / 고유 metadata YES / 문맥 링크 YES. 검색 수요량은 추정하지 않은 INTERNAL_HEURISTIC이다.

## 변경과 출처

증상 시각·지속·식사·자세와 현재 약·이전 자료 2칸, 4질문, 답변 4줄. 원본·미확인 허용, 긴 기록을 완성해야 진료받는 조건 금지. 모든 검사를 요구하거나 금식 시간·약 중단 기간을 처방하지 않는다. 기존 흉통을 예약 질문으로만 남길 여지를 없애고 부모119 경고와 출혈 안내를 화면·인쇄 양식에 유지한다.

Main은 [NIDDK 진단](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/diagnosis), [NHS](https://www.nhs.uk/conditions/heartburn-and-acid-reflux/)를 다시 직접 열어 읽고 앞서 직접 읽은 [GERD 증상](https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes), [GI 출혈](https://www.niddk.nih.gov/health-information/digestive-diseases/gastrointestinal-bleeding/symptoms-causes), [NHLBI](https://www.nhlbi.nih.gov/health/heart-attack/symptoms)와 대조했다. 부모 KDCA CPR 포함 실제6출처, 신규 source 없음. 진단·검사 선택은 의료진의 판단이며 이 양식은 준비 대화의 편집 설계다. 독립 AI 대조 미해결 P0/P1/P2 없음, 임상검수 아님.

## 전후·QA

69 words/source0 → 460/source6/outlinks19. 200/self-canonical/index허용/sitemap포함(로컬72), Breadcrumb only, 실제수정9월6일. 단일route inbound/depth미감사.

50 SEO + 6 public-cutover = 56 tests PASS. 5폭 page QA·tool QA·SEO audit PASS. Main 360/390/430/768/1440 화면·A4 2쪽(1203/1429자) 직접 확인. 질문4개/답변4줄/6source URL·정책 링크까지 보존, 체크0·9pt footer·overflow0·키보드전환/복귀·내부링크200·non-GET0.

MINZ verification 재발견·manifest/lifecycle 재검토 후 `npm run test`, `npm run lint`, `npm run typecheck` helper 결과 각 exit0 PASS. plan/result는 ignored reports/local/onurim-seo-v2/skill-resumption/verification-{plan,results}-tool14.json. helper는 stdout hash만 보존하므로 이번 전체 테스트 수·lint 경고 수는 추정하지 않는다. pretest의 생성 evidence 경로는 격리 task 내부·비링크 디렉터리로 확인했다.

나머지7개 NOT_SELECTED: `check:health-source-urls` 전체외부HTTP는 최종source검사, `check:links`/`validate:posts`/`validate:images`/`validate:seo` legacy감사는 개별도구변경과 직접 관련 없음(대신 Onurim SEO/tool검사), `validate:health-medical-review` 실제검토결과 없음, `build` 최종통합 때 재실행. 최신 build는Tool8상태이며 현재build PASS를 주장하지 않는다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED = NO. REAL_HUMAN_READER_TEST = NOT_PERFORMED. 144 Claim·47패킷 본문·해시불변. Production·Google 변경없음. ../raw/page-qa/gerd-appointment-prep.json 및 ../raw/tool-qa/gerd-appointment-prep.json. PDF/PNG ignored reports/local.
