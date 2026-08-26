# SYNTHETIC TEST — NOT REAL HUMAN FEEDBACK

## 독립 합성 독자 계약

각 페르소나는 다른 결과나 결론을 보지 않고, 실제 페이지에서 다음을 독립적으로 평가합니다.

| ID | 관점 | 확인 범위 |
| --- | --- | --- |
| SYN-R01 | 평이한 일반 독자 | 질환 이해, 즉시 행동, 용어 |
| SYN-R02 | 모바일에서 빠르게 훑는 독자 | 응급 안내 발견성, 길이, 행동 명확성 |
| SYN-R03 | 가족에게 설명하려는 독자 | 핵심 요약, 가족 행동, 용어 |
| SYN-R04 | 신뢰에 민감한 회의적 독자 | 작성자·출처·검수 상태의 투명성 |
| SYN-R05 | 시각자료 중심 모바일 독자 | 이미지·캡션·대체텍스트와 모바일 읽기성 |

## 공통 질문과 판정

각 페이지마다 1~5점으로 `UNDERSTANDING`, `URGENT_ACTION`, `USEFULNESS`, `TRUST`, `AI_LIKENESS`를 기록합니다. 마지막 항목은 낮을수록 좋습니다. 다음 위험 신호는 불리언으로 기록합니다.

- `PROVIDER_CONFUSION`: 운영자가 의료 제공자라고 오해할 가능성
- `SELF_TREATMENT_OR_MEDICATION_CONFUSION`: 자가진단·약 변경을 유도한다고 오해할 가능성
- `EMERGENCY_DELAY_RISK`: 응급 행동을 늦추거나 채널을 잘못 이해할 가능성
- `VISUAL_MISUNDERSTANDING`: 삽화가 사실과 다른 행동을 유도할 가능성

이 계약은 합성 평가 절차일 뿐, 실제 독자의 경험이나 의료적 판단을 대체하지 않습니다.
