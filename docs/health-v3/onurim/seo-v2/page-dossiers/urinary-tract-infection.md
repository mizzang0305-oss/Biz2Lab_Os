# 요로감염 — 질환 16/20, expansion 10/14

2026-09-06 · `/health/urinary-tract-infection` · LOCAL · SEO_PAGE_CERTIFIED

## GSC·intent·benchmark

Fresh 개별 GSC DISCOVERED_NOT_INDEXED, sitemap발견/감지참조페이지 없음, crawl·canonical 미제공. 수집된 positive query row 없음. 방광염/신우신염·냄새·소변검사/배양·남은 항생제 질문은 공식 정보에 근거한 편집 추론(INTERNAL_HEURISTIC). 검색량·지역 SERP 순위 실측 또는 로컬 개선의 Production 색인 성과가 아님.

| 공식 benchmark | Main 직접 읽은 본문·날짜 | 경계 |
|---|---|---|
| [KDCA6674 요로감염](https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6674) | 개요·종류·원인·증상·진단·치료·예방·FAQ;등록2025-04-28/업데이트2026-05-08 | 단순UTI 중심 문서를 전환별 처방으로 일반화 안 함. 치료항목2018지침 인용, 약이름/기간/영상검사72시간 조건을 대기기준으로 복제 안 함 |
| [NIDDK Definition](https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/definition-facts) | 전체본문·Last Reviewed2024-04 | 방광염과넓은UTI 구분 |
| [NIDDK Symptoms](https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/symptoms-causes) | 전체본문·Last Reviewed2024-04 | 배뇨변화·임의확진금지 |
| [NIDDK Diagnosis](https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/diagnosis) | 전체본문·Last Reviewed2024-04 | 병력·검사역할 |
| [NIDDK Treatment](https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults/treatment) | 전체본문·Last Reviewed2024-04 | 처방준수·부작용연락·수분개별화;약기간성별일괄처방없음 |
| [NIDDK Pyelonephritis Symptoms](https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-infection-pyelonephritis/symptoms-causes) | 전체본문·Last Reviewed2024-10 | 즉시평가·신우신염·패혈증가능성;소아기준복제없음 |
| [NHS UTI](https://www.nhs.uk/conditions/urinary-tract-infections-utis/) | 전체본문·Page reviewed2025-07-11 | 개인위험·긴급도·검사필수아님;약사처방/48h대기/진통제용량·장기약처방복제없음 |
| [CDC Antibiotic Use](https://www.cdc.gov/antibiotic-use/about/) | 전체본문·표시일2025-09-23 | 남은약·타인약금지·처방준수·부작용문의;미국폐기방식은미사용 |
| [NHS Sepsis](https://www.nhs.uk/conditions/sepsis/) | 앞선 신장결석에서 Main 직접 성인본문·footer 확인;Page reviewed2026-05-14 | 혼돈·호흡119,열만으로패혈증확진아님 |
| [MedlinePlus / A.D.A.M. Urine culture](https://medlineplus.gov/ency/article/003751.htm) | Main 전체본문·Review Date2024-10-09 | 최근항생제사용과위음성가능성 직접근거;제공자인증2028≠검토일. 채취대기시간·침습검사수행법·결과만으로확진 문장은미사용 |

공식자료의 사실·역할만 대조, 문장·기관 이미지 복제 없음. 해외 긴급연락은 한국119로 현지화한 교육 경계. 출처 날짜와 확인일을 구분하며 의료기관·사이트가 Onurim을 승인했다는 뜻이 아니다.

## 독립 가치·on-page

QUESTION_FIRST: 급한변화 질문 → 위치명 질문 → 소변겉모습 질문 → 두검사역할 → 남은항생제 → 개인상황/재발정보.6sections/6FAQ/표1(2행). 같은검체라도 다른검사질문, 감염명 관계와비필수진행, 소변표시≠모두항생제를 설명한다. 실제약명·용량·치료기간·수분리터·자가점수없음.

- Title: 요로감염: 방광염·신우신염 차이와 소변검사 질문 | 오누림
- H1: 소변 볼 때 불편한데, 방광염일까요?
- Description: 위치·검사·급한전신변화·개인상황·처방경계 본문과 일치.
- 문맥링크7: 위험신호·신장결석·증상일지·결과읽기·약목록·UTI카드·진료질문. 전체graph inlink/depth 후속 확인.
- 발행8/26/실제본문수정·출처대조9/6,UI/Article/sitemap일치,박영훈 비의료인·의료인검수미완료. Article/Breadcrumb;허위Physician/reviewedBy/FAQPage없음.

## 의료·provenance

페이지10출처/global142. delta9개 `../raw/source-deltas-urinary-tract-infection.csv`. 원래003검사 문장에 증상출처만 연결되어 있던 점,004남은약 경계 직접CDC 부족,005원장 전신증상AND 및출처한계는 새 공개section/FAQ 직접출처와OR 문장으로 보완했다. 원래UTI-P3-001..005 ID·문장·원장출처순서는 보존, 새로운표현은 licensed review NOT_COMPLETED.

Main HEAD945071d 대비 expansion70 exact동일/content·medical-review diff0/전체144/highrisk47/UTI 및기존3NIDDK·NHSsepsis와47교집합0. packetHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. 전체base대비앞선파생title/sourceDate변경과구분.

MEDICAL_REVIEW_COMPLETED=NO · REAL_HUMAN_READER_TEST=NOT_PERFORMED. 증상으로감염확정·전신증상모두대기·검사결과대기·남은약/타인약·자가중단연장·수분강요 없음. 공개안전검사 PASS는 임상검수 아니다.

## 이미지·모바일

기존3이미지 실제확인 후2개 생성,기존파일보존. Main+독립 raw시각 P0/P1·재생성P2없음. Concept정확한연결·별도위치·한쪽만감염/필수진행/배타성 오해차단. Action현미경일부방법/접시≠음성결과·필수순서대기시간아님. manifest직접sourceIds·clinicalReviewCompleted=false.

- concept-v2:1536x1024/42656B/SHA256 `40ba897d90f7c994c2cc89c30824454da353e31ea3ec9d85c52e0a1d2a42bd2d`
- action-v2:1536x1024/109204B/SHA256 `a115df6ff23fd2a551ca6f148b981410e7c2211219fbeea4704010f9733f3f0b`
- Exact prompts/raw `../raw/urinary-tract-infection-image-generation.md`.
- Main360top/390표/430urgent/768FAQ/1440sources 최종스크린샷 실제확인. 카드형표·keyboardFAQ·nav/footer·sourceanchors·3이미지각1회 정상. 5폭overflow0.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| word count | 377 | 1333 |
| FAQ / 표 | 2 / 0 | 6 / 1 |
| 출처 / 렌더이미지 / 도구 | 3 / 5(고유3) / 1 | 10 / 3 / 1 |
| internal outlinks | 16 | 21 |
| content inlink / depth | HTML2 / 1,당시가시성미검증 | 단일route미산출,전체후속 |

## QA

전체266tests/명시적typecheck/lint0errors(기존1warning)/5폭QA/SEO/build116 PASS. 최초Healthaudit ‘중요합니다’6회로FAIL → UTI1문장 구체적행동안내로수정,이후23SEO회귀/명시적typecheck/Healthaudit/5폭QA/SEO/build116 재실행 모두PASS. 독립 P2 최근항생제 정보의 직접출처 보강: Main MedlinePlus 원문확인 후 source/delta/test 추가,최종266전체tests/typecheck/Healthaudit/5폭QA/SEO/build116 모두재실행PASS 및 최종출처화면 Main실제확인.

독립 전체·delta 확인: 잔여P0/P1/P2없음. 원래144claim·47packet 전체가 HEAD945071d와 동일,12본문FAQ source/claim resolve·7문맥링크HTTP200·최종WebP3개 실제시각/hash/alt/caption일치. SSR200/selfcanonical/actual lastmod/schemaerrors0,추가출처anchor·section/schema연결도확인. 기계 evidence `../raw/page-qa/urinary-tract-infection.json` 및 ignored local 폴더.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

임상·실제독자·fieldCWV·Google색인보장 아님. Preview/Production/색인요청 없음.
