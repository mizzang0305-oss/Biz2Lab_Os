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
- `npm test`: PASS, 337/337.
- `npx tsx --test tests/commercial-preview.test.ts`: PASS, 5/5.
- `npm run build`: PASS.
- 로컬 Production 빌드에서 네 새 경로 HTTP 200, 세 서비스 랜딩의 폼 2개씩 확인.
- Playwright 360·390·430px에서 Hero/카드/CTA/폼의 가로 넘침과 화면 밖 노출 없음. 로컬 문의는 저장 OFF로 실패 상태를 표시.
- 로컬 브라우저에서 `/services?utm_source=threads&utm_medium=social&utm_campaign=qa` → `/mybiz` 이동 시 유입 값 보존을 확인했다. API 성공 응답을 **모의**한 브라우저 테스트에서 6개 이벤트의 `dataLayer` 호출을 확인했다. 이는 DB 저장·GA4 수집 증거가 아니다.
- 실제 Preview 배포, Production 문의·이메일 저장, 운영자 조회, GA4 수집, 실사용 스팸 대응은 **NOT_RUN**.

## 롤백

현재 외부 변경은 없다. 격리 작업 트리의 변경만 폐기하면 기준 `origin/master`가 남는다. 향후 Production 승격 뒤에는 먼저 수집 토글을 끄고, 별도 승인된 배포 롤백을 수행한다. 저장된 리드 삭제는 데이터 보관 정책과 별도 승인에 따른다.

## Gate close 재조사 (2026-09-25)

- `origin/master`는 `66e974df5afd728f4b468b6ca11662474b0c7206`, 기존 후보는 `48ff219724c43dad58413374cd07cbbae2678d4c`로 재확인했다. 기존 후보 worktree에는 별도 미커밋 structured-data 수정 6개가 있어 보존하고, `48ff219`에서 새 격리 브랜치 `codex/commercial-gate-close-v1`을 만들었다.
- `REUSED_ASSETS`: `lib/supabase.ts`의 서버 전용 client, 기존 `/api/contact`·`/api/newsletter`와 미적용 `001` SQL의 설계, 상위 GA4 loader, 기존 오누림 SEO/robots/sitemap, 기존 Vercel 프로젝트.
- `MISSING_ASSETS`: Biz2Lab로 식별되는 dev/staging Supabase 프로젝트, 적용된 capture 테이블의 증거, 운영자 조회 증거, 확정 보관·삭제 정책, 실트래픽 분산 rate limit, 실제 GA4 property 수집 증거.
- `DO_NOT_REBUILD`: 새로운 Supabase 프로젝트, 별도 관리자·Auth·이메일 발송 시스템, 별도 Analytics SaaS, 건강 콘텐츠·Root 구조.
- 기존 `contact_messages`와 `newsletter_subscribers`도 미적용 초안이다. 전자는 서비스·UTM 필드가 없고, 후자는 이메일 단일 unique와 `subscribed` 상태가 서비스별 후속 안내 동의와 다르다. 현재 `commercial_submissions`는 이 두 API의 대체가 아니라 서비스별 문의·Lead의 분리된 **미적용 스키마 후보**다. 실제 DB 스키마를 확인하기 전에는 중복 여부를 최종 판정하거나 적용하지 않는다.

### 48ff219 후보 파일별 판정

| FILE | PURPOSE | NECESSARY | RISK | DECISION |
| --- | --- | --- | --- | --- |
| `app/api/commercial/route.ts` | 검증 후 저장 | true | 무제한 본문·봇 | MODIFY: 본문 byte 제한 |
| `app/globals.css` | Commercial chrome 분리 | true | 오누림 스타일 영향 | KEEP |
| `app/minz-mind/page.tsx` | 독립 랜딩 | true | 기능 과장 | KEEP |
| `app/mybiz/page.tsx` | 독립 랜딩 | true | 샘플을 실운영으로 오인 | KEEP |
| `app/services/opengraph-image.tsx` | 공통 OG 이미지 | true | 브랜드 혼합 | KEEP |
| `app/services/page.tsx` | 3축 Hub | true | 판매 상태 오인 | KEEP |
| `app/services/privacy/page.tsx` | 수집 상태 안내 | true | 정책 미확정 | MODIFY: credential 금지 안내 |
| `app/web/page.tsx` | 독립 랜딩 | true | 제공 범위 미확정 | KEEP |
| `components/commercial/CommercialActions.tsx` | CTA·view 이벤트 | true | GA4 loader 의존 | KEEP |
| `components/commercial/CommercialForms.tsx` | 별도 문의·Lead | true | 실패 성공 오표시 | MODIFY: 비밀정보 경고 |
| `components/commercial/CommercialShell.tsx` | 서비스 탐색 | true | 홈과 시각 충돌 | KEEP |
| `components/commercial/ServiceLanding.tsx` | 공통 상업 랜딩 | true | Demo 과장 | KEEP |
| `docs/commercial-hub-preview.md` | 운영 Gate·롤백 | true | 상태 드리프트 | MODIFY: 재조사 증거 |
| `lib/commercial-events.ts` | 유입·GA4 속성 | true | 수집 불명 | KEEP |
| `lib/commercial-seo.ts` | 독립 메타·noindex | true | 색인 선행 | KEEP |
| `lib/commercial-submission.ts` | 입력 계약 | true | 비밀정보 입력 | MODIFY: 명백한 credential 거절 |
| `lib/commercial.ts` | 공개 범위 상한 | true | 과장 | MODIFY: 미사용 export 제거 |
| `supabase/migrations_draft/002_biz2lab_commercial_submissions.sql` | 서비스별 저장 후보 | true | 스키마·PII | MODIFY: 충돌 시 실패·조회 index |
| `tests/commercial-preview.test.ts` | 회귀 검증 | true | 성공 오판 | MODIFY: 크기·비밀정보 검증 |

### DB security review와 운영자 조회 계약

- `TABLES`: 초안 1개, `public.commercial_submissions`. Production 적용 `NOT_RUN`.
- `COLUMNS`: `id`, `kind`, `service`, `email`, `name`, `message`, `source`, `landing_url`, `utm_source`, `utm_medium`, `utm_campaign`, `consented_at`, `created_at`. PII는 `email`, 문의 시 `name`·`message`.
- `NULLABILITY/DEFAULTS`: kind/service/email/source/landing/consented_at 필수, created_at 서버 `now()`; name/message는 문의에서만 필수, UTM은 nullable.
- `INDEXES`: id PK 및 `(service, created_at desc)` 운영 조회 index. 이메일 공개 검색 index는 만들지 않는다.
- `RLS`: enabled; anon/authenticated 권한 revoke; 공개 INSERT/SELECT/DELETE policy 없음. 서버의 service-role만 작성한다. 브라우저 직접 조회는 불가해야 한다.
- `SERVICE_ROLE_DEPENDENCY`: 기존 `getSupabaseAdmin()` 서버 경계. 키는 Preview/브라우저에 출력하거나 주입하지 않는다.
- `RETENTION`: `PENDING_OWNER_POLICY`. 기간·백업·로그 삭제 및 요청 채널 확정 전 수집 toggle은 OFF.
- `OPERATOR_LOOKUP_METHOD`: 대상 Supabase 프로젝트가 특정되면 기존 Dashboard의 승인된 운영 계정으로 Table Editor/SQL Editor에서 service·created_at·synthetic email로 1건 조회. 새로운 admin 경로는 만들지 않는다. `AUTH_REQUIRED=true`; `TEST_RESULT=NOT_RUN`; export/delete 권한과 절차는 미확정.
- `ROLLBACK`: 미적용이므로 현재 DB 롤백 없음. 적용 후 구조 롤백은 수집 toggle OFF → 보관 대상 export/삭제 정책 확인 → 별도 승인된 스키마 rollback 순서이며, 수집된 고객 행을 임의 `DROP`하지 않는다.

### 개인정보·스팸 운영 Gate

- 문의와 이메일 후속 안내는 별도 동의다. 광고성 뉴스레터 동의로 해석하지 않는다.
- UI는 credential·건강·결제·고객 명단 입력을 금지한다. 서버는 명백한 credential 패턴을 저장 전 거절한다. 자유문장에 포함된 모든 비밀정보를 완벽하게 식별한다고 주장하지 않는다.
- `lib/commercial-sensitive.ts`는 이메일 주소·명백한 secret 패턴이 포함된 UTM을 이벤트·저장 payload에서 제외한다. 원래 URL query 자체를 통제하는 기능은 아니므로 SNS 링크 생성 단계에서도 비밀정보를 넣지 않아야 한다.
- origin, JSON, 본문 크기, 필수 동의, honeypot, 최소 제출 시간을 검사한다. 분산 rate limit은 기존 재사용 가능한 자산이 확인되지 않아 `NOT_VERIFIED`이며, Production 수집 활성화 전 별도 정책이 필요하다.
- 보관 기간, 운영 담당자, 삭제 요청 경로, 백업·로그 처리, operator/export/delete 권한은 Owner 결정이 필요하다. 확정 전 폼은 저장 불가 상태에서 성공이라고 표시하지 않는다.

### 현재 E2E·Analytics 증거 경계

- Supabase 연결 목록에서 Biz2Lab로 식별되는 프로젝트가 없었다. 무관한 3개 프로젝트를 테스트 대상으로 사용하지 않았다. `INQUIRY_DB_INSERT`, `LEAD_DB_INSERT`, `OPERATOR_LOOKUP`은 `BLOCKED_PRODUCTION_DB_APPROVAL`.
- 로컬 Production 빌드에서 실제 API 저장 OFF는 503과 미접수 UI를 보였다. 모의 201 응답에서는 문의·Lead 각각의 service/source/landing/UTM과 성공 이벤트를 확인했다. 모의 응답은 DB 증거가 아니다.
- `DATALAYER_VERIFIED`: 6개 이벤트 코드 경로와 브라우저 호출 확인. 실패한 문의 뒤 `inquiry_submit` 없음.
- `GA4_NETWORK_EMISSION_VERIFIED`: 일부 이벤트의 `g/collect` POST/204 및 service/landing/source/campaign 확인. 6개 전체의 네트워크 송신은 일관되게 확인되지 않아 `PARTIAL`. `GA4_COLLECTION_VERIFIED=NOT_VERIFIED`.
- Preview OG 이미지는 배포 주소의 `/services/opengraph-image`를 가리킨다. canonical은 계속 Production URL이다. 원래 후보의 Production OG 경로는 배포 전 404여서 Preview 메타 검증에서 발견·교정했다.
- 기존 이메일 알림의 dev sink/dry-run 경로를 찾지 못해 `EMAIL_NOTIFICATION=NOT_VERIFIED`; 실제 메일 발송 없음.

### Production 승인 전 남은 정확한 Gate

1. Owner가 Biz2Lab Supabase 대상과 non-production 여부를 확인한다. non-production이 없으면 Production 스키마 적용·synthetic E2E는 별도 승인까지 중단한다.
2. Owner가 보관 기간, 삭제·백업·로그 정책, 담당 운영자와 문의 채널, 실트래픽 스팸 대응을 확정한다.
3. 승인된 대상에서 기존 테이블과 초안 충돌을 확인하고 RLS/권한을 다시 검토한 후 별도 승인으로만 migration을 적용한다.
4. 승인된 synthetic 행으로 문의와 이메일 신청을 각각 `폼 → API → 저장 → 운영자 조회`까지 증명한다. 테스트 행은 명시된 정리 정책에 따라 처리한다.
5. Preview 배포와 360/390/430px·SEO/noindex·오누림 회귀를 검증한다. 실제 GA4 property 수집 여부는 조회 권한이 있을 때 별도로 확인한다.
6. Production 승격은 별도 승인이다. Root는 Option B로 유지하고 sitemap/noindex/AdSense 설정을 이번 변경에서 건드리지 않는다.
