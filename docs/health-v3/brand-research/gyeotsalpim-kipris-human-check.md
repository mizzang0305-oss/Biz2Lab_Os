# 곁살핌 KIPRIS 수동 상표 확인 카드

상태: `HUMAN_KIPRIS_CHECK_REQUIRED`
기준일: 2026-08-24 KST

이 카드는 KIPRIS 공개 상표 검색을 사람이 재현 가능하게 수행하고 기록하기 위한 것이다. 이 문서는 법률 자문이 아니며, 검색이 비어 보인다는 사실도 출원·등록 가능성 또는 비충돌을 뜻하지 않는다.

## 공식 시작점

- KIPRIS: <https://www.kipris.or.kr/>
- KIPRIS 상표 검색 안내: <https://www.kipris.or.kr/khome/board/help/basic.do>
- KIPO: <https://www.kipo.go.kr/>
- WIPO Global Brand Database: <https://www.wipo.int/en/web/global-brand-database>

## 수행 순서

1. KIPRIS 상표 검색에서 상표명칭과 제공되는 exact/부분/유사 검색 선택지를 사람이 확인한다.
2. 아래 query를 **한 항목씩** 검색한다. 검색 화면의 선택값, 실행 시각, 결과 수, 결과 상세 URL 또는 화면 캡처를 남긴다.
3. 각 결과에서 표장명, 출원·등록번호, 출원인/권리자, 상태, Nice class, 지정상품·서비스, 유사군을 확인한다.
4. 현재 실제 계획(비의료 건강정보 편집·온라인 기사)과의 중첩을 기록한다. 의료행위 또는 의료서비스를 제공한다고 가정하지 않는다.
5. 확인된 개별 결과만 `gyeotsalpim-kipris-results.csv`에 입력한다. 검색 미실행 또는 결과 미확인은 CSV에 가짜 “없음” 행을 만들지 않는다.
6. 사람이 모든 항목을 완료한 뒤, 변리사/상표 전문가에게 결과 묶음과 실제 서비스 설명을 전달한다.

## 필수 query

| 종류 | query |
|---|---|
| exact | `곁살핌` |
| exact spacing | `곁 살핌` |
| close form | `곁살피` |
| close form | `곁살피미` |
| close form | `곁살핌이` |
| close form | `곁살피다` |
| component | `살핌` |
| component | `곁` |
| romanized | `GYEOTSALPIM` |
| romanized | `GYEOT SALPIM` |
| romanized variant | `GYUTSALPIM` |

## 초기 관련 분류 범위

`gyeotsalpim-class-map.md`의 9, 16, 41, 42를 실제 제공 범위에 따라 확인한다. Class 44 의료서비스는 현재 비의료 편집 정보 서비스의 자동 대상이 아니다. 최종 분류 선택은 `HUMAN_IP_PROFESSIONAL_REVIEW_REQUIRED`다.

## 위험 판정 규칙

- 동일 또는 발음·외관·관념상 매우 가까운 표장이 관련 교육·출판·디지털 정보 영역에서 active/pending이면: `HIGH_RISK_ESCALATE_TO_IP_PROFESSIONAL`.
- 일부 유사라도 지정상품·서비스가 겹치면: `HUMAN_IP_PROFESSIONAL_REVIEW_REQUIRED`.
- 관련 없어 보이는 결과 또는 검색 결과 없음: 법적 clearance가 아니며 `NO_CLEARANCE_INFERENCE`.

## 한계

이 검색어 집합은 완전하지 않다. 표장 유사성·지정상품 유사성·선출원·해외 권리·사용상 혼동은 검색 화면만으로 확정할 수 없다.
