# 홈페이지 — 76/77 개별 작업

2026-09-07 KST · LOCAL · / · SEO_PAGE_CERTIFIED

## 근거와 의도

Fresh GSC INDEXED. 7d/28d 각1노출·0클릭, exact query 미연결. 이 작은 표본을 수요·CTR 실패로 단정하지 않는다. Baseline 홈과 /health는 동일 component/H1/1117words 본문·34도구 목록을 공유했다. 홈은 첫 방문자의 목적 선택과 오누림 역할 설명, /health는 전체 재고 탐색으로 분리한다. 두 URL INDEX_PRIMARY를 유지하며 canonical을 합치거나 새 URL을 만들지 않는다. INTERNAL_HEURISTIC.

## Frontend design 사전 계획과 자체 검토

기존 오누림 정체성을 유지한다. 색: ink #18332f, green #1e6558, mint #dff2eb, paper #fffdf8, line #cdded8, urgent #7a2d21. Type: 기존 Pretendard/한국어 system sans stack; H1 2.3–4.2rem, H2 1.65–2.35rem, 본문1rem 이상. 좌측 정렬·짧은 문단·모바일 단일열. 새 폰트·라이브러리·동작·색 체계 추가 없음.

구조 초안은 hero + 같은 카드로 모든 목록을 반복하는 방식이었으나 현 문제를 재생산한다. 수정안은 ‘읽는 목적 선택’ 목록을 기억에 남는 중심 장치로 사용하고, 분야는 짧은 링크 묶음, 검사표/가족 안내는 설명과 연결, 검수 경계는 조용한 정책 블록으로 구분한다. 장식 궤도·번호·일률적 CTA·모션을 넣지 않는다.

```text
목적·한계 설명 | 지금 필요한 안내 선택
즉시 도움 경계 (목록·기록보다 앞)
분야별 대표 질환 링크 + 전체 허브
검사표의 질문 | 가족이 함께 준비할 것
작성자·출처·의료검수 구분 + 접수 확인 상태
```

홈만 새 component/전용 스타일에 연결한다. 허브 본문·metadata는 홈 인증 후 별도 변경. 의료 수치·약물·진단 기준 추가 없음. 응급 공통 문구는 기존 danger-signals/disclaimer와 OFFICIAL 소방청119·MedlinePlus 원문을 다시 대조했다. 검수 미완료·접수 미검증을 숨기지 않는다. 임상 검수·실제 독자 검증 아님.

## 예정 QA

실제 SSR metadata/H1·역할 분리·기존77URL 연결·홈 수정일/sitemap 일치 검사. 360/390/430/768/1440 실제 화면·키보드·overflow·내부 목적지 HTTP 검증. schema Organization/WebSite만 유지, 불필요한 Article/FAQ/Physician 금지. 홈은 의료 그림보다 탐색 목적이므로 신규 이미지 불필요. 최종 지표와 인증은 검증 후 기록.

## 최종 구현·QA

홈은 새 `OnurimHomePage`와 root 전용 스타일을 사용한다. 허브의 본문·metadata·수정일은 이 commit에서 변경하지 않았다. Title은 ‘건강정보가 낯설 때, 질환 이해부터 진료 준비까지’, H1은 ‘건강정보를 이해하고, 진료 질문을 준비하세요’. Description은 실제 연결한 질환·검사표·가족·검수 경계를 설명한다. 첫 선택 목록·9개 분야별 대표 질환·검사표와 가족 설명은 전체 목록을 담는 허브와 역할이 다르다. FAQ/이미지를 억지로 추가하지 않았다.

Baseline1117words/source0/73out → local234words/인식source1/29out. 글자 수나 링크 수 감소 자체를 SEO 향상으로 주장하지 않는다. 응급 원문 링크는 실제2개지만 source host heuristic은1개만 인식한다. [소방청119](https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/)와 [MedlinePlus](https://medlineplus.gov/ency/article/001927.htm)를2026-09-07 다시 대조했으며 미국911/988·흉통 대기시간을 옮기지 않았다. 새로운 자가진단·약물 지침 없음. 목록을 읽는 것이119 신고 전제 조건이 아님을 유지한다.

HTTP200/H1 1/self-canonical(루트 trailing slash 정규화 동일)/indexable/sitemap59에 포함, 본문·lastmod2026-09-07 일치. Organization/WebSite, schema오류0. 홈에서 도구는 `/health#tools`로 연결하며 허브의 실제tools ID 존재. 홈 포함 내부30개 고유 경로 HTTP200. 전역 inlinks/depth/unique는 후속 통합 감사이며 단일 route의 duplicate0을 전역 증거로 사용하지 않는다.

Main360/390/430/768/1440 전체 PNG 직접 확인: 선택 목록·응급 블록·분야 묶음·검사/가족·검수/접수 상태·내비·푸터 정상. overflow0/pageerror0,14px 미만 본문0. 보이는 Next 개발 indicator는 로컬 개발 UI이며 Preview에서 별도 확인한다. 360폭 chooser 첫 링크 focus3px solid, Tab은 검사표 링크, Enter는 실제 reading-health-results200으로 이동. 광고·분석 외부 요청은 QA에서 차단했다.

91 targeted tests PASS. 최종 MINZ plan/results-home: npm test / npm run lint / npm run typecheck 모두 exit0 PASS. 7 NOT_SELECTED: sourceURL/build 최종 통합; legacy check:links/validate:images/posts/seo는 Onurim 전용 QA와 최종 통합으로 대체; validate:health-medical-review는 실제 결과 없음. Main 실제 코드·style·test와 tracked diff/git diff --check 대조. 새 페이지·개인정보 입력·클라이언트 진단 UI 없음.

INTENT_PASS / TITLE_PASS / DESCRIPTION_PASS / H1_PASS / CONTENT_UNIQUENESS_PASS / MEDICAL_SOURCE_PASS (공식 원문 대조, 임상 검수 아님) / INTERNAL_LINK_PASS / IMAGE_PASS (탐색 홈은 추가 그림 불필요) / MOBILE_PASS / SCHEMA_PASS / CANONICAL_PASS / INDEXABILITY_PASS.

독립 read-only Agent가67983b4 대비 tracked/untracked 실제 변경과 원문·경로를 대조해 잔여P0/P1/P2 미발견. Agent는 테스트·화면 QA 재실행이나 파일 변경을 하지 않았다.

로컬 SEO_PAGE_CERTIFIED. 기존144Claim/47패킷 변경0. 의료검수·실제독자gate 보존. Production/GSC/AdSense 변경0. raw/page-qa/home.json 및 ignored PNG/SEO/MINZ 증거. 전체 graph·Preview 후속.
