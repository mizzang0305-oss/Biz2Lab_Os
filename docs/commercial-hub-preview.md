---
type: commercial-readiness
project: Biz2Lab
status: PREVIEW_CANDIDATE_BLOCKED
updated: 2026-09-25
tags: [biz2lab, commercial, lead, preview]
---

# Biz2Lab Commercial Hub Preview 후보

## 목적과 기준선

- 기준 소스: `origin/master@66e974df5afd728f4b468b6ca11662474b0c7206`.
- 작업 위치: 격리 worktree `codex/commercial-hub-preview-v1`.
- `/`와 `/health/*`의 오누림 화면, canonical, robots, sitemap은 전환하지 않는다.
- `/services`, `/mybiz`, `/web`, `/minz-mind`는 서비스별 별도 경로다.
- 현재 서비스 경로는 `noindex, nofollow`이고 기존 sitemap에 넣지 않는다. 검증 완료 전 색인·SNS 유입을 열지 않는다.

## 공개 표현의 상한

| 축 | Preview 표시 | 실제 근거 | 현재 제외 |
| --- | --- | --- | --- |
| MyBiz | `BETA` | `https://mybiz.ai.kr/demo/dashboard`의 샘플 매장 대시보드가 공개 접근 가능하며 저장되지 않는 데모라고 표시 | 샘플 수치를 실제 성과로 홍보, 실결제·전자서명·외부 게시 보장 |
| 홈페이지 제작 | `COMING_SOON` | 독립 서비스 상품·고객 사례·판매 조건을 확인하지 못함 | 예약 시스템·관리자 화면·유지보수 제공 확약 |
| MINZ MIND | `COMING_SOON` | 통합 Preview 자료가 있으나 `PROJECT_STATE.json`은 `P13 HUMAN_GATE`; 공개 사용 제품 아님 | 의료 서비스, 실 Auth·결제·Production DB, 공개 Demo 주장 |

## 문의·이메일 신청 계약

- 브라우저는 `POST /api/commercial`로 문의와 별도 이메일 신청을 구분한다.
- 문의: `name`, `email`, `message`, `service`, `source`, `landing_url`, UTM, 동의 시각.
- 이메일 신청: `email`, `service`, `source`, `landing_url`, UTM, 동의 시각. 광고성 뉴스레터 동의와 혼합하지 않는다.
- 서버는 서비스·경로 일치, 입력 길이, 동의, 같은 출처 요청, 숨김 필드, 최소 제출 시간을 검사한다.
- `BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED`가 `true`가 아니거나 저장소가 없으면 `503`이며 성공 응답·성공 이벤트를 보내지 않는다.
- 저장소 후보는 `supabase/migrations_draft/002_biz2lab_commercial_submissions.sql`이다. **미적용 초안**이며 anon/authenticated 접근을 허용하지 않는다.
- 현재 운영자 확인은 **NOT_VERIFIED**. 승인 후 Supabase의 제한된 운영 계정으로 `commercial_submissions`의 새 테스트 행과 서비스·유입 필드를 직접 조회해야 한다. 이메일·메시지는 승인된 운영자만 열람한다.
- 현재 숨김 필드·제출 시간 검사는 기본 봇 억제일 뿐이다. 실제 트래픽의 분산 rate limit/abuse 대응은 Production gate다.
- `/services/privacy`는 현재 수집 계약과 비활성 상태를 설명하는 Preview 안내다. 보관 기간, 삭제 요청, 운영 책임자, 저장 리전 등은 승인 전 확정 사실로 쓰지 않는다.

## Analytics와 SEO

- 코드 경로: `service_view`, `demo_view`, `cta_click`, `inquiry_start`, 저장 성공 후 `inquiry_submit`·`email_lead_submit`.
- GA4 호출에는 `service`, `landing_url`, `source`, `campaign`을 보낸다. 직접 식별자와 문의 본문은 이벤트에 넣지 않는다.
- `/services`에 붙은 UTM은 같은 브라우저 탭의 서비스 이동에서 최대 30분 동안 `sessionStorage`로 유지한다. 저장 실패 시 폼 자체는 계속 동작한다.
- Preview에서는 기존 GA4 로더가 비활성이다. 로컬 `dataLayer` 관찰은 Production 수집 증명이 아니다.
- 각 서비스 URL은 별도 title·description·canonical·OG 이미지가 있지만 검증 전 `noindex`다. 오누림 sitemap과 robots는 유지한다.
- 관련성 없는 건강 콘텐츠에 서비스 CTA를 일괄 배치하지 않는다. 정보 글에서 서비스로의 링크는 별도 편집 검토 후 추가한다.

## Production Promotion 조건

1. 사업축별 실제 제공 범위, Demo, 가격·계약 표현을 Owner가 검토한다.
2. 개인정보 안내의 운영 주체·저장 위치·보관/삭제 기준·연락 경로와 봇 대응을 확정한다.
3. 별도 승인으로 DB 초안의 실제 스키마 충돌·RLS·권한을 검토하고 적용한다. 기존 테이블 존재를 가정하지 않는다.
4. 별도 승인된 비실고객 테스트 데이터 한 건으로 `폼 → API → Production DB 저장 → 운영자 조회`를 증명하고 테스트 행 정리 방침을 따른다.
5. 이메일 신청도 별도로 저장·조회·동의 증거를 확인한다.
6. GA4 DebugView/실제 수집에서 6개 이벤트와 서비스·유입 속성을 확인한다. UTM이 붙은 SNS 테스트 링크를 사용한다.
7. Preview와 Production에서 360·390·430px 및 키보드·터치·폼 오류 상태를 재검증한다.
8. 색인 승인 시 서비스 URL을 sitemap에 넣고 `noindex`를 해제하며 개별 검색 의도·canonical·OG·내부 링크를 확인한다.
9. Production 배포와 Root 전환은 각각 별도 승인이다. Root는 현재 `/` 오누림 유지(Option B)를 권고한다. Option A는 검색·AdSense·전환 증거를 비교한 후에만 검토한다.

## 로컬 검증과 한계

- `npm run typecheck`: PASS.
- `npm run lint`: PASS, 기존 `tests/biz2lab-policy.test.ts` 미사용 import 경고 1건.
- `npm test`: PASS, 336/336 (2026-09-25 gate audit).
- `npx tsx --test tests/commercial-preview.test.ts`: PASS, 6/6.
- `npm run build`: PASS.
- `npm run verify:commercial-structured-data`: PASS. `/`·`/health`의 오누림 schema를 보존하고 네 Commercial 경로의 오누림 schema 상속을 차단한다.
- `POST /api/commercial`은 Content-Length가 없는 스트림도 8KB에서 중단한다.
- 로컬 Production 빌드에서 네 새 경로 HTTP 200, 세 서비스 랜딩의 폼 2개씩 확인.
- Playwright 360·390·430px에서 Hero/카드/CTA/폼의 가로 넘침과 화면 밖 노출 없음. 로컬 문의는 저장 OFF로 실패 상태를 표시.
- 로컬 브라우저에서 `/services?utm_source=threads&utm_medium=social&utm_campaign=qa` → `/mybiz` 이동 시 유입 값 보존을 확인했다. API 성공 응답을 **모의**한 브라우저 테스트에서 6개 이벤트의 `dataLayer` 호출을 확인했다. 이는 DB 저장·GA4 수집 증거가 아니다.
- 실제 Preview 배포, Production 문의·이메일 저장, 운영자 조회, GA4 수집, 실사용 스팸 대응은 **NOT_RUN**.

## 롤백

현재 외부 변경은 없다. 격리 작업 트리의 변경만 폐기하면 기준 `origin/master`가 남는다. 향후 Production 승격 뒤에는 먼저 수집 토글을 끄고, 별도 승인된 배포 롤백을 수행한다. 저장된 리드 삭제는 데이터 보관 정책과 별도 승인에 따른다.
