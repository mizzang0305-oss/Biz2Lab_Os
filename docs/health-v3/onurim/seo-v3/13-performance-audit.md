# ONURIM 대표군 성능 감사

2026-09-07 KST · 390x844 headless Chromium · local production build · http://127.0.0.1:3213

| route | HTTP | lab LCP ms | CLS | FCP ms | JS KiB | image count/KiB | hero preload | lazy images | overflow px | running animations |
|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|
| / | 200 | 116 | 0.000 | 116 | 327 | 1/0 | N/A | 0 | 0 | 0 |
| /health | 200 | 132 | 0.000 | 132 | 328 | 1/0 | N/A | 0 | 0 | 0 |
| /health/hypertension | 200 | 164 | 0.000 | 164 | 333 | 2/12 | YES | 3 | 0 | 2 |
| /health/type-2-diabetes | 200 | 196 | 0.000 | 196 | 333 | 1/0 | YES | 3 | 0 | 2 |
| /health/obesity | 200 | 160 | 0.000 | 160 | 333 | 1/0 | YES | 2 | 0 | 2 |
| /health/stroke | 200 | 176 | 0.000 | 176 | 333 | 2/24 | YES | 2 | 0 | 2 |
| /health/guides/understanding-hba1c | 200 | 120 | 0.000 | 120 | 328 | 1/0 | N/A | 0 | 0 | 0 |
| /health/tools/blood-pressure-log | 200 | 116 | 0.000 | 116 | 335 | 1/0 | N/A | 0 | 0 | 0 |
| /health/trust/medical-review-policy | 200 | 88 | 0.000 | 88 | 327 | 1/0 | N/A | 0 | 0 | 0 |

## Reduced motion 파일럿

| route | running animations | moving runner visible |
|---|---:|---|
| /health/hypertension | 0 | NO |
| /health/type-2-diabetes | 0 | NO |
| /health/stroke | 0 | NO |

## 판정

- PERFORMANCE_AUDIT = PASS
- 실패: 없음
- HTML은 실제 응답 body 크기, JS/이미지/font는 Resource Timing transferSize 기준입니다. 브라우저 캐시·로컬 서버 조건에 따라 0 또는 변동할 수 있습니다.
- LCP/FCP/CLS는 단일 local lab 관찰이며 실제 사용자 데이터가 아닙니다. Search Console의 field CWV는 현재 데이터 없음으로 관찰되었습니다.
- INP와 모바일 FPS는 실제 사용자 field 데이터가 없으므로 추정하지 않습니다. BodyTheater 적용 뒤 대표 3개 route에서 reduced-motion 정적 대체를 재측정했습니다.
