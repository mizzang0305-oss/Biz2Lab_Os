# BodyTheater system

- 대상: 20개 질환 가이드
- 구현: React Server Component + inline SVG + CSS animation
- client JavaScript 추가: 없음
- scene key/path: 20/20 고유
- 공식 출처: 장면마다 해당 글의 source ID 2개
- 접근성: SVG title/desc, 텍스트 3단계 설명, 고정 figcaption
- reduced motion: `prefers-reduced-motion: reduce`에서 CSS animation 중지, 이동 점 숨김, 정적 SVG 유지
- 의료 경계: 해부·검사·진단 영상이 아닌 교육용 단순화임을 모든 장면에 동일하게 고지
- 심리 질환: 단일 화학 원인이나 개인 진단을 암시하지 않는 상징 표현

파일: `components/health/BodyTheater.tsx`, `lib/health-v3/body-theater.ts`, `app/health/onurim.module.css`
