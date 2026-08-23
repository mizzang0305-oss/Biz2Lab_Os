---
type: preview-qa
project: ONURIM_HEALTH_V3_BATCH1
status: LOCAL_BROWSER_QA_PASS
updated: 2026-08-24
tags: [health-v3, onurim, playwright, qa]
---

# 오누림 보호 Preview 브라우저 QA

## 범위와 결과

- 뷰포트: 360, 390, 430, 768, 1440px
- 점검 경로: 홈, 고혈압, 제2형 당뇨병, 8개 도구, 9개 신뢰 페이지, 중첩 404
- 가로 넘침: 0
- 일반 페이지 콘솔 오류/경고: 0/0
- 파일럿 이미지: 단계 스크롤 후 8/8 로드, 대체 텍스트 8/8
- 도구: 인쇄 버튼과 표 확인
- 404: HTTP 404, 오누림 안내문, 홈 링크, noindex 확인
- 광고·분석 스크립트: Vercel Preview에서 비활성화

## 로컬 캡처 증거

캡처는 커밋하지 않는 로컬 QA 산출물이며 아래 SHA-256으로 식별한다.

| 화면 | 뷰포트 | 파일 | SHA-256 |
| --- | --- | --- | --- |
| 홈 | 360 | `page-2026-08-23T19-45-13-863Z.png` | `496e21801e68719802acf2855954337c4bc769d613c8df5e327b499e46c8ba8b` |
| 고혈압 | 390 | `page-2026-08-23T19-45-22-642Z.png` | `759508ac67eaa001b2abbe77c8069dd68a389509ea685927046ceee868bc7b42` |
| 제2형 당뇨병 | 430 | `page-2026-08-23T19-45-30-999Z.png` | `1b8cd4179ebe6d0adb74cf9344c666e17e5dbbfe164f7f5ce3317649d664b4cb` |
| 혈압 기록 도구 | 768 | `page-2026-08-23T19-46-12-660Z.png` | `6478fe88d4b7482f6ffbc49cc15fd5782a108789b784f50800e8fd405f88f7ab` |
| 의료 검수 안내 | 1440 | `page-2026-08-23T19-46-21-464Z.png` | `9fd1ff85414b2e05b6c608c7d5cb4ef8d1d77175072c7bd3e0814bfe9b322985` |
| 중첩 404 | 390 | `page-2026-08-23T19-54-41-491Z.png` | `d5afd732a2608ddc572bf8ba67f9644a5336ea946c9e3ddf9fd55cf631310fe3` |

로컬 기준 디렉터리: `output/playwright/onurim-batch1/.playwright-cli/`.
