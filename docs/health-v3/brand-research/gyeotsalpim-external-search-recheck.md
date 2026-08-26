# 곁살핌 외부 검색 재확인 기록

상태: `PARTIAL_AUTOMATED_CAPTURE_NOT_CLEARANCE`
실행일: 2026-08-24 KST

## 실행 query

`"곁살핌"`, `"곁 살핌"`, `"GyeotSalpim"`, `"Gyeot Salpim"`

## 관찰

- 일반 웹 검색 자동 결과는 역사·사전·일반 단어 용례 중심으로 섞여 나왔으며, 특정 건강정보 서비스·사업자·앱의 exact identity를 신뢰성 있게 확정할 수 없었다.
- 이 관찰은 `NO_EXACT_CONFLICT_FOUND`가 아니며, external use 부재 또는 trademark availability를 뜻하지 않는다.
- 검색 엔진별 실시간 색인, 지역화, 로그인 상태, 앱스토어 노출과 사업자 데이터는 자동 웹 결과만으로 완결할 수 없다.

## 사람이 확인할 채널

| 채널 | 정확 query | 기록해야 할 것 | 상태 |
|---|---|---|---|
| Google | 네 query 전부 | 결과 URL, 사업자/서비스, 날짜, 혼동 가능성 | `HUMAN_CHECK_REQUIRED` |
| Naver | 네 query 전부 | 통합검색·블로그·카페·쇼핑·플레이스 결과 | `HUMAN_CHECK_REQUIRED` |
| Bing | 네 query 전부 | 결과 URL, 사업자/서비스, 날짜 | `HUMAN_CHECK_REQUIRED` |
| YouTube | 네 query 전부 | 채널/동영상의 운영 주체·건강 관련성 | `HUMAN_CHECK_REQUIRED` |
| 앱 웹/스토어 | 한글·로마자 query | Android/iOS/웹앱 명칭·사업자·카테고리 | `HUMAN_CHECK_REQUIRED` |
| 사업자·소셜 웹 | 한글·로마자 query | 기관/사업체/계정 명칭과 제공 서비스 | `HUMAN_CHECK_REQUIRED` |

## 판정 기준

- 관련 건강·교육·디지털 정보 서비스와 정확 또는 혼동 가능한 명칭이 발견되면 `ESCALATE_TO_IP_PROFESSIONAL`.
- 무관해 보이는 결과만 발견되어도 `NOT_A_CLEARANCE`.
- 채널별 화면, 날짜, URL, 운영주체가 누락되면 `SEARCH_EVIDENCE_INCOMPLETE`.
