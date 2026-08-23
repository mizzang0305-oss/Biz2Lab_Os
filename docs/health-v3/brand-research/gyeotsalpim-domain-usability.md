# 곁살핌 도메인 사용성 점검

상태: `BRAND_DOMAIN_DECOUPLING_REQUIRED`
기준일: 2026-08-24 KST

이 평가는 도메인 구매 가능성이나 권리 상태를 판단하지 않는다. 구매·예약·등록·DNS 변경은 수행하지 않았다.

## 후보별 현재 확인 상태

| 후보 | 관찰 | 도메인 권리 결론 |
|---|---|---|
| `gyeotsalpim.com` | 이전 사전조사에서 DNS A 레코드 미확인·Verisign RDAP 404·HTTPS 연결 실패를 관찰 | `DOMAIN_APPEARS_AVAILABLE_UNCONFIRMED` |
| `gyeotsalpim.kr` | 레지스트라 수동 조회 미수행 | `DOMAIN_HUMAN_REGISTRAR_CHECK_REQUIRED` |
| `gyeotsalpim.co.kr` | 레지스트라 수동 조회 미수행 | `DOMAIN_HUMAN_REGISTRAR_CHECK_REQUIRED` |

## 언어·입력 사용성

- 한글 `곁살핌`은 읽는 사람에게 따뜻한 보조·안내의 인상을 줄 수 있으나, `곁`의 로마자 `gyeot`은 일반 독자가 듣고 즉시 철자를 맞히기 어렵다.
- `gyeotsalpim`은 자모 전사와 음절 경계가 한눈에 분명하지 않아 구두 전달, 모바일 입력, 기억 후 재방문에서 오입력 위험이 있다.
- `gyeot-salpim`, `gyeot salpim`, `gyutsalpim` 등 표기 변형이 자연스럽게 생길 수 있다. 이는 소유권 또는 리디렉션 설계의 근거가 아니라 사용성 위험 관찰이다.

## 결정

`BRAND_DOMAIN_DECOUPLING_REQUIRED`: 공개 브랜드명 `곁살핌`과 실제 접근 도메인을 동일한 로마자 문자열로 강제하지 않는 전략을 Owner가 선택해야 한다. 가능한 전략은 기존 Biz2Lab 하위 경로 유지 또는 별도 단순 도메인 전략 중 하나를 사람이 검토하는 것이며, 이 문서는 대체 도메인명을 제안하거나 구매를 승인하지 않는다.

## 사람 확인 항목

1. `.com`, `.kr`, `.co.kr`의 등록·예약·재판매·주차·redirect·평판을 각 레지스트라에서 확인한다.
2. 후보 도메인을 5명 독자 테스트에서 받아쓰기·모바일 입력으로 검증한다.
3. 선택한 구조가 Option B, 비의료 고지, 운영자 표기와 충돌하지 않는지 확인한다.
4. Owner가 별도로 `domain purchase approved`를 기입하기 전에는 어떤 도메인도 구매하지 않는다.
