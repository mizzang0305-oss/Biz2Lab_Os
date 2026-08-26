# Blocked or Incomplete Research Items

| item | status | reason | required human action |
|---|---|---|---|
| KIPRIS exact/spacing/romanized/phonetic/partial/semantic search | `TRADEMARK_HUMAN_VERIFICATION_REQUIRED` | 결과별 유사 판단과 관련 상품류 검토가 필요함 | 각 final five를 상표명칭과 상품분류로 검색하고 active/pending/expired mark, 권리자, 상품류, 유사군을 기록 |
| KIPRIS similar-mark interpretation | `TRADEMARK_HUMAN_LEGAL_REVIEW_REQUIRED` | 상표 유사와 지정상품·서비스의 법적 영향은 자동 결론 불가 | 변리사 또는 상표 전문가에게 5개 후보와 실제 서비스 설명 전달 |
| `.kr` / `.co.kr` registration | `DOMAIN_HUMAN_REGISTRAR_CHECK_REQUIRED` | 이번 배치에서 등록원 로그인·구매·예약을 하지 않음 | 신뢰 가능한 등록원에서 수동 조회만 수행하고 screenshot/date 기록 |
| domain history | `DOMAIN_HISTORY_REVIEW_INCOMPLETE` | public archive response가 no-capture 또는 request error일 수 있음 | final 1~2개에 대해 Wayback, search cache, malware/spam reputation을 사람이 재확인 |
| Naver/Bing/YouTube/app-store exact-name review | `SEARCH_RESEARCH_INCOMPLETE` | 자동 캡처가 한국어 exact-query dominance를 재현성 있게 제공하지 못함 | 시크릿/비로그인 환경에서 exact·spacing·romanized·발음 변형을 수동 검색 |
| human reader reaction | `HUMAN_BRAND_READER_TEST_PENDING` | 실제 응답 없음 | 성인·보호자 포함 비의료 독자에게 protocol 실행 |
