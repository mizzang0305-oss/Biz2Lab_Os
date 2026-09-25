---
type: commercial-gate-audit
project: Biz2Lab
status: BLOCKED
updated: 2026-09-25
tags: [biz2lab, commercial, preview, release-gate]
---

# Commercial Front gate close — 2026-09-25

## A. Overall Result

- `OVERALL_RESULT=BLOCKED`
- `COMMERCIAL_FRONT_READY=false`
- `COMMERCIAL_FRONT_PRODUCTION_APPROVAL_READY=false`
- `AGENTOPS_RESCUE_STATE=DEFERRED_BY_COMMERCIAL_GATE`

## B. Git / Candidate Identity

- 확인 시점의 `origin/master=66e974df5afd728f4b468b6ca11662474b0c7206`는 공유 작업지시의 기준과 동일했다. `git ls-remote`의 원격 master도 같았다.
- `codex/commercial-hub-preview-v1@48ff219724c43dad58413374cd07cbbae2678d4c`는 기준보다 1커밋 앞서며, 원격 후보 브랜치는 없었다.
- `BASE_DRIFT=false`, `CANDIDATE_DRIFT=false` (감사 시작 시점), `CONFLICT_RISK=LOW` (기준 변경 없음), `FILES_CHANGED_SINCE_BASELINE=19`.
- 기본 checkout `master@d3c5fe62`의 기존 수정·미추적 파일은 보존했다. 이번 수정은 후보의 격리 worktree에서만 수행했다.

## C. Candidate Audit

기준 `66e974df..48ff219`의 19개 파일을 검토했다. 아래의 `KEEP`은 Production 승인 뜻이 아니라 Preview 후보 유지 판단이다.

| 파일 | 목적 | 필요한가 | 위험 / 판단 |
| --- | --- | --- | --- |
| `app/api/commercial/route.ts` | 문의·리드 접수 API | 예 | 봇 남용·저장 실패 경계. **MODIFY**: 스트림 본문 8KB 제한 |
| `app/globals.css` | Commercial 전용 chrome | 예 | `:has` 브라우저 QA 필요. KEEP |
| `app/minz-mind/page.tsx` | 독립 랜딩 | 예 | 제공 범위 과장 주의. KEEP |
| `app/mybiz/page.tsx` | 독립 랜딩 | 예 | 샘플 데모와 실제 운영 구분. KEEP |
| `app/services/opengraph-image.tsx` | Commercial OG 이미지 | 예 | 실제 상품과 혼동 금지. KEEP |
| `app/services/page.tsx` | 3개 사업축 허브 | 예 | 루트와 분리 유지. KEEP |
| `app/services/privacy/page.tsx` | 수집 안내 초안 | 예 | 보관·삭제·운영자 미확정. KEEP, 공개 수집 전 갱신 필수 |
| `app/web/page.tsx` | 독립 랜딩 | 예 | 사례·판매 조건 미확인. KEEP |
| `components/commercial/CommercialActions.tsx` | CTA·조회 이벤트 | 예 | Preview GA4 비활성. KEEP |
| `components/commercial/CommercialForms.tsx` | 문의·리드 폼 | 예 | 실저장·오류 상태 QA 미완료. KEEP |
| `components/commercial/CommercialShell.tsx` | 서비스 탐색·푸터 | 예 | 모바일 Preview QA 필요. KEEP |
| `components/commercial/ServiceLanding.tsx` | 공통 랜딩 구성 | 예 | Demo 표시가 제공 범위를 넘지 않아야 함. KEEP |
| `docs/commercial-hub-preview.md` | 후보·운영 경계 | 예 | 검증 수치 갱신. MODIFY |
| `lib/commercial-events.ts` | UTM·GA4 이벤트 | 예 | 실제 수집 미검증. KEEP |
| `lib/commercial-seo.ts` | 메타·noindex | 예 | 구조화 데이터 상속 문제는 루트 경계에서 수정. KEEP |
| `lib/commercial-submission.ts` | 입력 검증 | 예 | 클라이언트 타임스탬프는 봇 방어 증거 아님. KEEP |
| `lib/commercial.ts` | 서비스 상태·문구 | 예 | BETA/COMING_SOON 상한 유지. KEEP |
| `supabase/migrations_draft/002_biz2lab_commercial_submissions.sql` | 저장 스키마 초안 | 조건부 | 미적용. 보관·조회 권한 확인 전 적용 금지. KEEP DRAFT |
| `tests/commercial-preview.test.ts` | 기본 경계 테스트 | 예 | 스트림 크기 회귀 테스트 추가. MODIFY |

재사용 자산: `lib/supabase.ts`의 server-side client, 기존 contact/newsletter API 및 초안, 공용 metadata helper, GA4 loader, 기존 관리자 인증 코드. 기존 관리자 화면은 콘텐츠 자동화용이며 Commercial 리드 조회 기능이 없다. 새 관리자 앱·DB는 만들지 않았다.

## D–E. Commercial Routes / Product Status

| 경로 | 후보 빌드 | 공개 Production (읽기 전용 HEAD) | 상태 |
| --- | --- | --- | --- |
| `/` | 오누림 유지 | 200 | Root 변경 없음 |
| `/services` | 생성됨 | 404 | Preview 후보 |
| `/mybiz` | 생성됨 | 404 | BETA, 샘플 데모만 확인 |
| `/web` | 생성됨 | 404 | COMING_SOON |
| `/minz-mind` | 생성됨 | 404 | COMING_SOON |

MyBiz 샘플 URL `/demo/dashboard`는 2026-09-25 GET 200이다. 실제 운영 성과·계약 범위·SLA는 검증하지 않았다. `SALES_READY_SERVICES=NONE`.

## F. Privacy / Security

- 문의 이름·이메일·메시지, 리드 이메일, 서비스·유입·UTM·동의 시각을 수집하는 계약이다. 폼의 동의는 필수이며 뉴스레터 동의와 분리했다.
- UI는 고객 개인정보·건강 기록·결제 정보·비밀번호·API key·token·credential 파일 내용 입력 금지를 안내한다. 자유 텍스트에 secret이 입력되는 것을 서버가 보장하여 차단하지는 못한다.
- `RETENTION=UNDEFINED`, `DELETE_PROCESS=UNDEFINED`, `OPERATOR_ACCESS=NOT_VERIFIED`; `/services/privacy`는 운영정책 확정본이 아니다.
- DB 초안: `commercial_submissions` 13개 열 (`id`, `kind`, `service`, `email`, `name`, `message`, `source`, `landing_url`, `utm_source`, `utm_medium`, `utm_campaign`, `consented_at`, `created_at`). `id` PK 외 보조 index 없음. `name/message`는 kind에 따라 nullable이고 CHECK로 형태를 제한한다. `created_at`은 `now()` 기본값이다.
- RLS 활성화, `anon/authenticated` 테이블 권한 revoke, 별도 INSERT/SELECT/DELETE policy 없음. 서버의 service role 쓰기를 전제로 한다. 실제 운영 권한·스키마 충돌·삭제 절차는 DB에서 검증하지 않았다.
- Origin·honeypot·최소 제출 시간·본문 크기 검사는 구현됨. 분산 rate limit과 abuse 대응은 미완료다. 공개 수집 토글은 기본 OFF다.

## G–I. Inquiry, Email Lead, Notification

- 폼·검증·API 및 저장 성공 후에만 성공 UI와 `inquiry_submit`/`email_lead_submit`을 내보내는 코드 경로는 확인했다. 저장 OFF일 때 API 503과 실패 UI 경계를 테스트했다.
- 기존 non-production DB 연결이 없고 환경에도 Supabase 연결값이 없어 `DB_INSERT=PERSISTENCE=OPERATOR_LOOKUP=NOT_RUN`. 실제 이메일·UTM row 확인도 `NOT_RUN`.
- 기존 Supabase Console은 운영자 조회 후보일 뿐 인증·가시 필드·삭제·내보내기 권한이 미검증이다. `EMAIL_NOTIFICATION=NOT_VERIFIED`, 테스트 메일은 발송하지 않았다.

## J. Analytics

- 여섯 이벤트와 `service`, `landing_url`, `source`, `campaign` 전파 코드를 확인했다. 기존 후보 기록의 로컬 모의 `dataLayer` 증거는 실제 GA4 수집 증거가 아니다.
- `DATALAYER_VERIFIED=LOCAL_MOCK_ONLY`, `GA4_NETWORK_EMISSION_VERIFIED=false`, `GA4_COLLECTION_VERIFIED=false`.
- Vercel Preview에서는 기존 root layout이 GA4 loader를 비활성화한다. 설정 변경 없이 Preview에서 GA4 네트워크 발생을 PASS로 판정할 수 없다.

## K–M. Preview, Mobile, SEO

- `PR=NONE`, `PREVIEW_URL=NONE`, `DEPLOYMENT_ID=NONE`. 원격 후보 브랜치가 없고 로컬 개인정보·저장 gate가 남아 있어 Preview release는 수행하지 않았다.
- Preview 360/390/430px QA와 스크린샷은 `NOT_RUN`. 이전 후보 문서의 로컬 QA는 Preview QA로 승격하지 않는다.
- 로컬 빌드의 `/services`, `/mybiz`, `/web`, `/minz-mind`에 별도 title·description·canonical·OG·`noindex,nofollow`가 있다. 네 경로는 sitemap에 없고 robots 기존 규칙은 변경하지 않았다.
- 새 회귀 gate에서 `/`와 `/health`의 오누림 Organization/WebSite schema를 보존하고 네 Commercial 경로의 오누림 schema 상속을 제거했다. Production SEO/색인은 변경하지 않았다.

## N. Tests

- `npm test`: 336/336 PASS.
- `npx tsx --test tests/commercial-preview.test.ts`: 6/6 PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS, 기존 `tests/biz2lab-policy.test.ts` 미사용 import 경고 1건.
- `npm run build`: PASS, 네 서비스 route 생성.
- `npm run verify:commercial-structured-data`: 6 route PASS.
- `git diff --check`: PASS. API 스트림 크기, route metadata, 기존 오누림 schema 경계를 확인했다.

## O–P. DB / Production Promotion Requirements

- `DB_CHANGE_REQUIRED=true`; 초안: `supabase/migrations_draft/002_biz2lab_commercial_submissions.sql`. Production 적용은 실행하지 않았다. RLS/운영 접근 검증, 보관·삭제 정책, 승인된 synthetic row 처리 계획이 필요하다.
- Rollback 초안: 공개 수집 토글 OFF → 별도 승인된 배포 롤백. DB 롤백은 실제 저장 데이터의 보존·삭제 결정을 먼저 내려야 하므로 `DROP TABLE`을 자동 실행하지 않는다.
- `PRODUCTION_CHANGE_REQUIRED=true`, `PRODUCTION_COMMIT=NONE`, `DEPLOYMENT_PLAN=NOT_APPROVED`. Root는 Option B(`/` 오누림, `/services` 허브) 유지.
- 승인 후 검증 순서: 비운영 DB synthetic 문의·리드 저장/운영자 조회 → 개인정보·abuse gate → Preview HTTP/모바일/SEO → GA4 수집 경로 증거 → 별도 Production 승인 → Production 문의·리드·SEO smoke.

## Q–S. Blockers / AgentOps / Certification

| BLOCKER | WHY | WHAT_IS_ALREADY_DONE | EXACT_APPROVAL_REQUIRED | NEXT_COMMAND_AFTER_APPROVAL |
| --- | --- | --- | --- | --- |
| 비운영 저장 E2E 없음 | 연결된 dev/staging DB 없음 | 폼/API/스키마 초안·로컬 실패 경계 검증 | Owner가 기존 비운영 DB와 안전한 테스트 권한 지정 | 승인된 환경에서 `npm run dev` 후 synthetic 폼 제출·DB readback |
| 개인정보 운영정책 미확정 | 보관 기간·삭제·운영자 책임·연락 경로 없음 | 수집 안내 초안·동의 분리 | Owner가 정책 값과 운영 담당자 확정 | `/services/privacy` 및 운영 Runbook 갱신 |
| 실사용 abuse gate 없음 | Origin/시간/honeypot은 우회 가능 | 본문 크기 방어 추가 | Owner가 기존 무료 운영 방어 수단과 허용량 결정 | 승인된 기존 수단 연결 후 부하·거부 검증 |
| GA4 실수집 미검증 | Preview loader 비활성, property 접근 증거 없음 | 이벤트 코드·로컬 모의 확인 | Owner가 Preview 측정 정책과 GA4 조회 권한 결정 | Preview에서 `g/collect` 및 DebugView 확인 |
| Preview/Production 준비 미완료 | 앞선 gate가 남음 | 336 테스트·빌드·SEO 경계 통과 | 앞선 gate 해소 후 별도 Preview 진행 결정 | 후보 push/Draft PR/Preview 배포 후 360·390·430px QA |

- `AGENTOPS_RESCUE_STATE=DEFERRED_BY_COMMERCIAL_GATE`, `AGENTOPS_WORK_PERFORMED=NONE`, `AGENTOPS_NEXT_GATE=COMMERCIAL_FRONT_PRODUCTION_APPROVAL_READY`.
- `FINAL_CERTIFICATION=BLOCKED`; `NEXT_MINIMUM_ACTION=기존 non-production DB와 개인정보 운영정책을 확정해 synthetic 저장·운영자 조회를 증명`.
- `EXACT_OWNER_APPROVAL_REQUIRED=기존 비운영 DB에서 synthetic 문의·리드 검증에 사용할 환경과 운영자 조회 권한, 보관·삭제 정책을 지정`.

## 롤백

이번 실행은 외부 상태를 바꾸지 않았다. 이 격리 worktree의 이번 커밋(또는 미커밋 변경)만 되돌리면 된다. 기본 checkout의 기존 변경은 건드리지 않는다.
