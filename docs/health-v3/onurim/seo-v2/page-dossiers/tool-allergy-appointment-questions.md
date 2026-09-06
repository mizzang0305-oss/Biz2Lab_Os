# 알레르기 비염 진료 질문 카드 — Tool 11/34

2026-09-06 · LOCAL · /health/tools/allergy-appointment-questions · SEO_PAGE_CERTIFIED

## 의도·판정

ENRICH_THEN_INDEX → INDEX_UTILITY. Fresh GSC DISCOVERED_NOT_INDEXED. 실제 검색 성과는 미확인. 독립 가치는 관찰 사례·현재 제품을 우선 질문·받은 답·다음 행동에 연결하는 성인 진료 준비다. 7개 질문: 독립 준비 의도 YES / 도구만 NO / 4단계 사용법 YES / 부모 설명과 양식 역할 구분 YES / 단독 활용 YES / 고유 title·H1·description YES / 문맥 링크 YES. INTERNAL_HEURISTIC이며 색인 보장 아님.

## 변경·직접 근거

관찰 사례와 현재 약·코/눈 제품의 실제 사용법을 적는 2필드를 추가하고 원래 4개 일반 질문을 검사 필요성·제품별 준비·제품 사용법/기간/문의 기준·가족 도움/다음 상담으로 구체화했다. 답변 4줄 유지. 사례나 우선 질문 선택 때문에 다른 중요한 정보를 생략하지 않도록 명시했다. 검사기관의 기존 안내와 제품 원본을 가져가며 모르는 점은 미확인으로 남긴다.

Main과 독립 AI가 [MedlinePlus 성인 비염 질문](https://medlineplus.gov/ency/patientinstructions/000247.htm)(2025-01-01), [피부 알레르기 검사](https://medlineplus.gov/ency/article/003519.htm)(2026-01-20), [NHS 비염](https://www.nhs.uk/conditions/allergic-rhinitis/)을 직접 읽었다. 첫 두 출처를 registry에 추가(전체 165, ID 고유성·정확 URL 검사 포함). 피부검사 준비를 모든 검사에 일반화하지 않고 임의 약 중단·일괄 며칠 중단 규칙을 금지한다. NHS/MedlinePlus 충혈제거 스프레이 5일/3일 차이를 합치지 않으며 모든 스프레이에 적용하지 않는다. 출처 성인 범위를 description·purpose에 표시했다.

기존 KDCA CPR와 부모의 위급 호흡/의식 변화 119를 출력에도 남긴다. AI 원문 대조 P0/P1/P2 지적 없음. 의료인 검수가 아니다. 144 Claim과 47개 패킷 본문·해시는 변경하지 않았다.

## 전후·QA

71 words/source 0 → 396/source 4/outlinks 19. 로컬 200/self-canonical/index 허용/sitemap 포함(73). Breadcrumb만 추가, 허위 reviewedBy 없음. 수정일 9월 6일. 단일 route inbound/depth는 미감사.

47 SEO + 6 public-cutover tests = 53 PASS, typecheck/5폭 page QA/tool-print QA/SEO audit PASS. Main 360/390/430/768/1440·390 전체·A4 두 쪽 직접 확인. 1038/1015자, 2필드·4질문·답변4줄·4출처 URL·119·검수 미완료가 2쪽에 보존됐다. Space 선택과 해제를 각각 검증하고 checkedItems=0으로 출력, overflow 0, 내부 링크 200, non-GET 0.

중간 통합 검증은 새 minz-verification plan-tool11의 package:test/package:lint/package:typecheck 모두 실행 PASS(exit 0). 전체 테스트 stdout은 helper가 해시만 보존하므로 개수는 이 결과에서 별도 주장하지 않는다. 외부 출처 전수 HTTP·기존 링크 검사·legacy posts/images/SEO 검사·실제 의료 검토 결과 입력 검증·build는 NOT_SELECTED; 출처 원문 직접 대조/ONURIM 개별 HTML·이미지·링크 QA로 이 페이지를 확인했고 전체 build는 최종 게이트에서 재실행한다. 10개 발견 명령의 argv·선택·상태는 reports/local/onurim-seo-v2/skill-resumption/verification-results-tool11.json에 보존한다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 질문지) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED = NO. REAL_HUMAN_READER_TEST = NOT_PERFORMED. Production·Google 변경 없음. 증거: ../raw/page-qa/allergy-appointment-questions.json, ../raw/tool-qa/allergy-appointment-questions.json. PDF·PNG는 ignored reports/local.
