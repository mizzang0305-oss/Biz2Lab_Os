# 심근경색 전달 메모 — Tool 34/34

2026-09-07 KST · LOCAL · /health/tools/acute-myocardial-infarction-visit-card · SEO_PAGE_CERTIFIED

## 개별 판정

NOINDEX_FOLLOW. 2026-09-06 fresh GSC UNKNOWN를 미색인으로 바꾸지 않음, positive query 없음. 부모 응급 해설에 연결된 신고 후 메모·치료 뒤 질문이며 독립 검색 도착점으로 확대하지 않는다. 독립 검색 작업 제한 / 도구만 NO / 사용법3단계 / 부모 해설 의존 / 단독 사용 경계 YES / 고유 metadata 문구 YES / 문맥 링크 YES. 역할에 따른 INTERNAL_HEURISTIC, 실패 은폐나 Google 기준 아님. URL·부모 링크 유지, 로컬 sitemap 제외.

## 변경·출처·안전

처음 느낀 시각·이후 변화, 실제 위치·퍼짐/몸 상태, 알고 있는 병력·약·알레르기의3필드를 모두 ‘신고 후’로 표시. 개인 약과 활동·심장재활·다음 방문의2질문은 모두 ‘급한 평가·치료 뒤’. 미확인 허용, 메모·답변 완성은 구급 대응 조건 아님. 부모 카드 설명·필드·질문만 변경, 부모 의료 본문/날짜/Claim/출처 객체 보존.

Main 직접 원문·날짜 확인: [CDC Heart Attack](https://www.cdc.gov/heart-disease/about/heart-attack.html)(2024-10-24, 증상·신고/개인 활동·처방·감독하 재활), [NHLBI Symptoms](https://www.nhlbi.nih.gov/health/heart-attack/symptoms)(Last updated2022-03-24, 약한/오락가락 증상·불확실해도 신고·운전/아스피린 지연 금지), [NHS Heart attack](https://www.nhs.uk/conditions/heart-attack/)(review2026-03-31, 응급조건·약·회복). KDCA ‘갑작스러운 마비·언어장애·가슴통증… 뇌졸중·심근경색 조기 대응 중요’는 기존 `SRC-KDCA-CARDIO-2026`의 정확한 /2847/subview.do?enc=… URL로 직접 재열람, 본문433–460과 작성2026-02-10/최종수정2026-02-11 확인. 실제 전체 URL은 도구 출처 및 raw/tool-qa JSON에 보존. ownCDC1+부모3=4출처. 해외999/911·NHS111·아스피린300mg·GTN·정해진 회복기간을 국내 공통 처방으로 옮기지 않았다.

강도/지속시간/모든 증상 대기 금지, 약하거나 오락가락해도 의심 시119. 심한 숨참·피부색·반응저하 OR 유지. 자가 이동/가족 차 대기/약 찾기·약효/증상 재현·맥박/혈압으로 신고 지연·안전 확정 금지. 아스피린의 무조건 금지와 동일 용량 처방 모두 피하고 개인 약/알레르기를 전달해119·의료진 안내를 받는다. 시술/호전으로 처방약 자가중단 금지. 실제b74c4cc 3파일 diff 독립 검토 잔여P0/P1/P2 없음. 면허 의료인 검수 아님.

## QA

Baseline66words/source0 → local448/source4/outlinks18. HTTP200/H1 1/self-canonical/noindex follow/sitemap제외(총64), Organization/WebSite/BreadcrumbList. 전역 metadata 중복·inbound/depth NOT_AUDITED.

관련76tests, 부모·도구5폭QA/SEO, 인쇄·키보드 PASS. A4 2쪽(1089/1411자) 및360/390/430/768/1440 상단 모두 Main 직접 확인. 3필드·2질문·4답변선/4URL/footer12px/체크0/포커스false/overflow0/non-GET0/문맥 링크200. 긴 KDCA 공개 URL도 줄바꿈되고 잘림·겹침·고아 쪽 없음. PDF SHA256 7f69b09970ce51034d3b5c122c303b104eb03bb28919c0fb65f528dd9089ccd2.

MINZ fresh plan/results-tool34: `npm run test`, `npm run lint`, `npm run typecheck` 모두 exit0 PASS. pretest는 기존 로컬 Preview용 evidence staging, runner/관련 fixture 변경0; lint=eslint/typecheck=tsc --noEmit, credentials/provider/Production 호출 없음. 7 NOT_SELECTED: sourceURL/build는 최종 통합 단계; legacy check:links/validate:images/posts/seo는 현재 Onurim QA로 대체; validate:health-medical-review는 의료인 결과 미입력. build Tool8은 과거 증거, 최종 build는 후속이다.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS / INTERNAL_LINK_PASS / IMAGE_PASS (HTML 양식) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

MEDICAL_REVIEW_COMPLETED=NO / REVIEWER_ASSIGNED=NO / MEDICAL_REVIEW_IN_PROGRESS=NO / REAL_HUMAN_READER_TEST=NOT_PERFORMED. 원래47패킷·Claim 수정 없음. Production·Google 변경0. raw/page-qa·raw/tool-qa 동명JSON, ignored local PNG/PDF/SEO·검증 계획/결과.
