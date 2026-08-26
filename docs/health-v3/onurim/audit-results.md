---
type: audit-results
project: ONURIM_HEALTH_V3_BATCH1
status: TECHNICAL_GATES_PASS_READER_TEST_PENDING
updated: 2026-08-24
tags: [health-v3, onurim, audit, medical-safety]
---

# 오누림 Batch 1 감사 결과

## 자동 검사

실행 명령: `npm run audit:health-v3`

| 항목 | 결과 |
| --- | --- |
| 파일럿 글 | 2 |
| 행동 도구 | 8 |
| 신뢰 페이지 | 9 |
| 주장 레지스트리 | 26 |
| 고위험 주장 | 18 |
| 출처 매핑 누락 | 0 |
| 의료 안전 | `PASS` |
| 공식 출처 | 12 |
| 원본 시각자료 | 8 |
| AI 상투성 | `AI_GENERICNESS_LOW` |
| 금지 상투어 탐지 | 0 |

## 코드 품질

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS, 233/233
- `VERCEL_ENV=preview npm run build`: PASS

## Production 차단 증명

`VERCEL_ENV=production` 빌드 후 로컬 `next start`에서 `/health`, 두 파일럿, 대표 도구는 모두 HTTP 404와 `noindex, nofollow, noarchive, nosnippet, nocache`를 반환했다. 기존 `/ko`는 HTTP 200으로 유지됐다.

## 남은 gate

자동 검사는 의료인 검수나 실제 독자 반응을 대체하지 않는다. 현재 `HUMAN_MEDICAL_REVIEW_PENDING`, `HUMAN_READER_TEST_PENDING`, `PUBLICATION_BLOCKED`다.
