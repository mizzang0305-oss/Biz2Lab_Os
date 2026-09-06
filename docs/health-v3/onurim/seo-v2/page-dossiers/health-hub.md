# 건강 자료 허브 — 77/77 개별 작업

2026-09-07 KST · LOCAL · /health · CERTIFICATION_PENDING

Fresh GSC INDEXED,7d/28d 노출 미관찰(exact query 미연결). 검색 수요0으로 단정하지 않는다. Baseline1117words/34tools/73out, 홈과 동일 H1·본문. a1e5eee에서 홈의 독립 목적 선택을 인증한 뒤 이 허브만 수정한다. INDEX_PRIMARY 유지. 새로운 URL·질환 생성 없음.

## Intent·구조·디자인 사전 계획

전체 자료를 찾는 독자를 위해 질환20개를8개 탐색 분야, 공통 가이드9개를4개 쓰임으로 묶는다. 인쇄 도구34개는 질환별로 찾고 종류·현재 고유 설명을 읽는다. NOINDEX 도구도 공개 목록에서 지우지 않는다. 단순 동일 카드63개와 generic CTA를 반복하지 않는다. 분류는 탐색용이지 증상 진단·진료과 배정표가 아니다. 기존 /health#tools 유지.

Frontend design: 기존 ink #18332f / green #1e6558 / mint #dff2eb / paper #fffdf8 / line #cdded8 / urgent #7a2d21, Pretendard 한국어 system stack. H1 clamp2.3–3.8rem/H2 1.65–2.3rem/본문1rem, 왼쪽 정렬. 홈의 선택 목록과 달리 이곳의 핵심 장치는 섹션 바로가기와 분야별 짧은 디렉터리다. 구조 없는 동일 pastel card 계획을 버리고, 분야 heading·설명형 링크·인쇄자료 종류를 사용한다. 모션·장식 이미지·새 의학 도해 없음. 모바일1열, desktop2열의 읽기 쉬운 폭.

```text
자료 찾기 제목 / 질환·공통가이드·인쇄도구 바로가기
즉시 도움 경계
20개 질환: 8개 분야의 설명형 링크
9개 공통 가이드: 측정·진료·가족·도움요청
34개 도구: 질환별 제목 / 종류 / 고유 쓰임
작성자·출처·의료검수·접수 미확인 경계
```

홈은 이미 인증되어 구조·본문 변경하지 않는다. 기존 허브의7일 측정 처방처럼 보이는 링크문구·서버저장 암시·접수 확인 단정을 제거한다. 응급 문장은 홈/disclaimer의 대조된 공통 범위만 사용하고 동시발생·심한 흉통 대기 조건을 만들지 않는다. 뇌졸중·심근경색 메모는 신고 전 완성 조건이 아니다. 원문은 [소방청119](https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/)·[MedlinePlus](https://medlineplus.gov/ency/article/001927.htm),2026-09-07 대조. 새로운 진단·약물 권고나 의료검수 주장 없음.

개별 QA와 최종 수치·인증은 구현 후 기록한다. 전역 graph/유사도·Preview는 후속.

## Owner 요청에 따른 현재 범위 마감

Owner가 남은 토큰1%에서 현재까지 마감·배포를 요청했다. 2026-09-07 현재 328tests PASS, lint exit0(기존 unused import warning1), typecheck/build PASS. 허브5폭 machine QA failures0, 전체77URL HTML SEO audit failures0, duplicate title/description0, sitemap59. 전체 화면의 최종 직접 검토와 허브12gate 인증은 미완료이므로 CERTIFICATION_PENDING을 유지한다. 기존76개 개별 인증을77개 완료로 올리지 않는다. 홈페이지·기존 임상 Claim·47패킷 변경 없음. AdSense MODE B이므로 Preview만 배포하며 Production·GSC·AdSense 변경하지 않는다.
