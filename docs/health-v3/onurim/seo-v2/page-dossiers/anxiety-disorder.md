# 불안장애 — 질환 18/20, expansion 12/14

2026-09-06 · `/health/anxiety-disorder` · LOCAL · SEO_PAGE_CERTIFIED

## GSC와 검색 의도

Fresh 개별 검사 INDEXED. 마지막 크롤 UI `2026. 8. 27. 오전 4:01:00`, 참조 sitemap.xml. Smartphone / fetch·crawl·index 허용 YES / 사용자·Google canonical SELF. Positive query row는 없다. 걱정·공황 구분, 도움 시점, 진료 기록과 약의 역할은 공식 자료에 근거한 편집 추론(INTERNAL_HEURISTIC)이며 검색량·지역 SERP 순위 실측 또는 로컬 변경의 색인 성과가 아니다.

## 공식 benchmark와 Main 직접 확인

| 자료 | 본문·날짜 확인 | 사용 경계 |
|---|---|---|
| [서울대학교병원 불안장애](https://www.snuh.org/health/nMedInfo/nView.do?medid=AA000615) | 정의·종류·원인·증상·진단·치료·생활 전체, 작성/수정일 미표시 | 모든 항불안제 즉효 일반화·MRI 필수·자가 노출 훈련으로 복제하지 않음 |
| [NIMH Anxiety](https://www.nimh.nih.gov/health/topics/anxiety-disorders) | 전체 본문, Last Reviewed 2024-12 | 기존 출처의 2025 표기를 실제 표시로 정정 |
| [NIMH GAD](https://www.nimh.nih.gov/health/publications/generalized-anxiety-disorder-gad) | 전체 본문과 치료 항목 추가 확인, Revised 2025 | 기존 2024 정정; 6개월을 진료 대기 조건으로 쓰지 않음 |
| [NIMH Panic](https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms) | 전체 본문·Revised 2025 | 한 번의 발작과 질환 구분, 신체 질환 공존; 발작 지속시간·자가 증상 유발법 미사용 |
| [NIMH Medications](https://www.nimh.nih.gov/health/topics/mental-health-medications) | 일반 원칙·항불안/항우울·사용 경계·날짜 확인, Last Reviewed 2023-12 | 약 이름·용량·효과 주수·중단 일정 미제시. 의약품별 최신 처방 근거로 과장하지 않음 |
| [NHS Chest pain](https://www.nhs.uk/symptoms/chest-pain/) | 전체 본문·Page reviewed 2023-08-08 | next review 2026-08-08이 경과했지만 업데이트로 바꾸지 않음; 한국119 현지화 |
| [NHS Breathlessness](https://www.nhs.uk/symptoms/shortness-of-breath/) | 성인 응급·상담·원인·날짜 재확인, 2024-01-30 | 소아 기준 미복제; 몸의 느낌만으로 감별 금지 |
| [MOHW 정책](https://www.mohw.go.kr/menu.es?mid=a10716040000), [109 서비스](https://www.129.go.kr/109) | 앞선 우울증에서 Main 정책·FAQ·24시간 직접 확인, 날짜 미표시 | 기존 ANX용 2026을 수정일로 주장하지 않음; 실제 전화·출동 시험 없음 |
| [NIMH Suicide FAQ](https://www.nimh.nih.gov/health/publications/suicide-faq), [한국 긴급번호](https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=3&cciNo=3&cnpClsNo=1&csmSeq=1465&popMenu=ov) | 앞선 우울증 Main 직접 확인; Revised2023 / 정보기준2026-08-15 | 임박 위험과 상담·구조 경계, 미국 번호·자해 방법 미복제 |

공식 문장·기관 그림 복제 없음. 위 출처 대조는 해당 기관의 승인이나 면허 의료인의 Onurim 검수를 의미하지 않는다.

## 독립 가치·on-page

MYTH_FIRST: 과거 공황에 의한 거짓 안심 차단 → 불안 경험 다양성 → 발작과 질환 → 진단 기간·검사 한계 → 네 기록 영역 → 약의 서로 다른 역할 → 강요하지 않는 도움. 7 sections / 6 FAQ / 3행 비교표 1개. 표와 예시는 진단표·실제 환자 사례가 아니다.

- Title: 불안장애: 걱정·공황의 차이와 진료에 전할 기록 | 오누림
- H1: 불안장애, 같은 불안으로 묶지 않고 살펴보기
- Description은 경험 구분·흉통/호흡·기록·약/가족 경계와 일치.
- 문맥 링크6: 위험 신호·심근경색·우울증·ANX 진료 카드·약 목록·진료 질문.
- 발행8/26, 실제 수정·출처 대조9/6. UI/Article/sitemap 일치. 박영훈 비의료 편집자·의료인 검수 미완료. 허위 Physician/reviewedBy/FAQPage 없음.

## 의료·원장 보존

페이지11출처/global151. 새 delta8개 `../raw/source-deltas-anxiety-disorder.csv`에 분리. 흉통·호흡 각 응급조건 OR, 과거 공황≠현재 안전. 6개월·자가점수 대기 금지. 신체검사 정상≠자동 확진. 약 전체 PRN/즉효 일반화·자가중단·공유·강제 노출 없음. 회피는 이미 피하게 된 일을 기록하는 것이지 권장 행동이 아니다.

Main HEAD ad06a58 대비 expansion70 exact 동일, content·medical-review diff0, 전체144/highrisk47/ANX 기존3출처와47교집합0. PacketHash `4bc7630fce8a29d8e55eae2f314ebf0f5983530624bcd50b7a2459dfbd8c4a64`. ANX-P3-001..005 원장 문장/ID/출처 순서 보존. 전체base 대비 앞선 파생 title/sourceDate 변경과 구분한다.

MEDICAL_REVIEW_COMPLETED=NO · REAL_HUMAN_READER_TEST=NOT_PERFORMED. 새 표현의 licensed review 미완료. 원래47개 검토 패킷이 새 표현까지 임상 검토했다는 뜻이 아니다.

## 시각·모바일

기존3파일 실제 열람, concept/action 신규 생성, 기존 파일 보존. Main+독립 raw 실제 검토 P0/P1·재생성 P2 없음. 겹칠 수 있는 경험·진단종류/악화단계 아님, 표정 감별 금지, 회피 권유 아님을 caption에 반영했다. Manifest 직접 출처와 clinicalReviewCompleted=false.

- Concept1536x1024/229566B/SHA256 `a2a9e76b665bdcae346e9faaad648c5bbaba014242aba7067cb06d2158dab253`
- Action1536x1024/221782B/SHA256 `1011bec16bac746116f7ceb59b59e6ef374c3dfbebd498e1b633b3a74858119f`
- Exact prompts/raw: `../raw/anxiety-disorder-image-generation.md`.
- Main360top/390비교표/430긴급/768FAQ/1440출처 실제 확인. H1 3줄 정상, 표는 모바일 카드로 대응, nav/footer·FAQ keyboard·source anchors·3이미지 각1회, 5폭 overflow0.

## Before / after

| 항목 | Production baseline | local |
|---|---|---|
| Word count | 391 | 1525 |
| FAQ / 표 | 2 / 0 | 6 / 1 |
| 출처 | heuristic2 (원래선언3; MOHW호스트누락) | 선언11, 품질판정과구분 |
| 렌더이미지 / 도구 | 5(고유3) / 1 | 3 / 1 |
| Internal outlinks | 16 | 21 |
| Content inlink / depth | HTML2 / 1, 당시가시성미검증 | 단일route미산출,전체후속 |

## QA

전체268tests/명시적typecheck/lint0errors(기존1warning)/Healthaudit/5폭QA/SEO/build116 PASS. 기계 evidence `../raw/page-qa/anxiety-disorder.json`, ignored local 결과. 단일 URL 내부 inlink/depth는 검사한 척하지 않고 최종 전체 graph에서 확인한다.

독립 전체 최종 검토: P0/P1 없음. P2 새 숨참의 연락 시점 모호함은 반복 흉통과 분리하여 ‘신속히 연락해 평가’로 수정, delta·regression 추가 후 전체268tests/typecheck/Healthaudit/5폭QA/SEO/build116 재실행 모두PASS. Main 최종430긴급화면 재확인. 독립 해당delta 재검토에서 P2 해소 확인.

독립144claim·47packet 전체 레코드 HEAD ad06a58과 동일,13개본문/FAQ source resolve·6링크200·최종3WebP시각/hash/alt/caption/manifest 일치. 실제 의료인 검수가 아니다.

INTENT_PASS · TITLE_PASS · DESCRIPTION_PASS · H1_PASS · CONTENT_UNIQUENESS_PASS · MEDICAL_SOURCE_PASS · INTERNAL_LINK_PASS · IMAGE_PASS · MOBILE_PASS · SCHEMA_PASS · CANONICAL_PASS · INDEXABILITY_PASS.

임상·실제독자·fieldCWV·Google색인 보장 아님. Preview/Production/색인요청 없음.

## Tool32 후속 — 2026-09-07 LOCAL

불안 진료 메모를 개별 NOINDEX_FOLLOW로 판정. 부모 카드 설명·관찰3필드·질문2개만 갱신, 이 페이지 의료 본문/날짜/Claim 보존. 경고 조건을 유지하고 질문 주제를 통합해 인쇄2쪽을 검증했다. 부모5폭QA/SEO 재실행 PASS, 별도 `tool-anxiety-disorder-visit-card.md`에 출처·74관련test·typecheck·최종 화면/PDF 증거. 도구 sitemap 제외는 local만 적용, 부모 INDEX_PRIMARY 유지. 전역 graph·Preview·의료인 검수 후속.
