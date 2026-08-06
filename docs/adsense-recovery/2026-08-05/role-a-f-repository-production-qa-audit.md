# ROLE A/F 저장소·Production·QA 감사

- 감사일: 2026-08-05 KST
- 역할: ROLE A — Repository & Production Auditor, ROLE F — QA & Evidence Auditor
- 판정: `PARTIAL_BASELINE_COMPLETE_HUMAN_DECISIONS_REQUIRED`
- 범위: 저장소와 Production 읽기 전용 조사
- 금지 준수: 소스·콘텐츠·설정 수정 없음, Production GET/HEAD 외 요청 없음, deploy/promote/redeploy/merge/push/AdSense 재검토/Search Console 변경 없음

## 1. 기준선

| 항목 | 확인 결과 | 증거 명령 |
| --- | --- | --- |
| repository root | `C:/Users/LOVE/.codex/worktrees/biz2lab-adsense-low-value-recovery-20260805` | `git rev-parse --show-toplevel` |
| branch | `codex/biz2lab-adsense-low-value-recovery-20260805` | `git branch --show-current` |
| baseline HEAD | `3420483063f44b18d21c4b80e97c462a91d5e1f1` | `git rev-parse HEAD` |
| remote default branch | `master` | `git ls-remote --symref origin HEAD` |
| remote HEAD / `origin/master` | baseline HEAD와 동일 | `git ls-remote origin refs/heads/master`, `git rev-parse origin/master` |
| branch divergence | `0 / 0` | `git rev-list --left-right --count HEAD...origin/master` |
| 작업 시작 상태 | clean | `git status --short --branch` |
| Node.js | `v24.14.0` | `node --version` |
| package manager | npm `11.9.0` | `npm --version` |
| lockfile | `package-lock.json` | filesystem 확인 |
| Production | Vercel `READY`, target `production` | `vercel ls ... --environment production --format json` |
| Production deployment | `dpl_44fsHqM1X1o4bLg51XczKCXLDZ5F` | sanitized `vercel inspect --json` |
| Production Git SHA | baseline HEAD와 동일 | Vercel Git metadata의 SHA만 선별 확인 |
| canonical host | `https://www.biz2lab.com` | 코드와 live 응답 교차 확인 |

과거 문서의 통과 결과를 현재 사실로 재사용하지 않았다. 현재 원격 SHA, Vercel Production SHA, live HTTP 응답을 다시 확인했다.

## 2. 저장소 구조

### 프레임워크와 라우팅

- Next.js `16.2.11`, React `19.2.4`, App Router다. `pages/` Router는 없다.
- 페이지·route handler는 `app/`에 있다.
- 루트 `/`는 `permanentRedirect("/ko")`다.
- 공개 글은 `app/ko/[category]/[slug]/page.tsx`에서 정적 생성한다.
- 관리자 콘솔 `/admin/content-automation`은 `proxy.ts`의 환경 게이트와 인증으로 차단되며 Production에서 `404`와 `X-Robots-Tag: noindex, nofollow`를 확인했다.
- `/ko/ops/seo-dashboard`는 Production `200`, `meta robots=noindex, nofollow`, sitemap/RSS 제외다.
- `/ko/ops/evidence-review`는 Production `404`; Preview에서만 조건부 노출하도록 설계됐다.

### 콘텐츠·발견 파일

| 영역 | 실제 위치/구현 |
| --- | --- |
| 콘텐츠 원본 | `content/ko/**/*.md`, `gray-matter`, 파일 기반 |
| 콘텐츠 인덱스 | `content/ko/content-index.json` |
| 공개 판정 | `status=published && draft=false`; sitemap만 추가로 `noindex=false` |
| sitemap | `app/sitemap.ts` |
| robots | `app/robots.ts` |
| RSS | `app/rss.xml/route.ts` |
| metadata/canonical | `lib/site.ts`, `lib/seo.ts`, 각 page metadata |
| redirect | `next.config.ts` 1건, 루트 `app/page.tsx`, Vercel host/protocol redirect |
| navigation/footer | `lib/site-settings.ts`, `components/layout/SiteHeader.tsx`, `SiteFooter.tsx` |
| 카테고리 | `lib/categories.ts`, 공개 category type은 4개 |
| 태그 archive | 공개 route 없음 |
| locale | `ko`만 공개; `en`, `ja`는 planned/forbidden |
| CMS/DB | 외부 CMS 없음; contact/newsletter/click POST에만 optional Supabase admin client 사용 |
| 증거 원본/manifest | `evidence-assets/`, `data/evidence-manifest.json`, `config/evidence-sources.ts` |
| Production 증거 자산 | prebuild staging으로 `public/images/evidence/` 제공 |
| AdSense/GA4 | `lib/google-setup.ts`, `app/layout.tsx`의 client loader |
| ads.txt | `public/ads.txt` |
| 분석 이벤트 | GA4 loader와 optional Supabase click endpoint |

### 현재 콘텐츠 수

- Markdown: 76개 (`content-index.json` 제외)
- 공개·indexable: 11개
  - automation 2
  - sales-ops 6
  - small-business 2
  - warehouse-logistics 1
- draft + noindex: 65개
- 공개 글 중 evidence required: 5개
- Production 승인 증거: 7개(approved 7, candidate 0; fixture 5, local-demo 2)
- 공개 다운로드 파일: 20개. 현재 공개 소스가 참조하는 것은 10개이며, 과거 draft 글용 CSV 10개가 `public/downloads/`에 남아 있다.

## 3. Production 읽기 전용 결과

### host와 redirect

| 입력 | 최종 | redirect hop |
| --- | --- | ---: |
| `https://www.biz2lab.com/` | `https://www.biz2lab.com/ko` 200 | 1 |
| `https://biz2lab.com/` | `https://www.biz2lab.com/ko` 200 | 2 |
| `http://www.biz2lab.com/` | `https://www.biz2lab.com/ko` 200 | 2 |
| `http://biz2lab.com/` | `https://www.biz2lab.com/ko` 200 | 3 |
| `https://biz2lab.com/ko` | `https://www.biz2lab.com/ko` 200 | 1 |
| `http://biz2lab.com/ko` | `https://www.biz2lab.com/ko` 200 | 2 |

명시된 “redirect chain 1회 이하” 기준에는 apex HTTP와 root 변형이 미달한다.

### sitemap·robots·RSS·ads.txt

- `robots.txt`: 200, 중요 공개 경로 allow, API와 forbidden route prefix disallow, www sitemap 참조.
- `sitemap.xml`: 200, 26 URL.
  - 정적 15 + 글 11
  - 코드 기대 집합과 live 집합 동일
  - 중복 0, non-www 0, redirect URL 0, 404 0, noindex meta URL 0
  - 전 URL 200, self-canonical, `og:url` 일치
- `rss.xml`: 200, item 11.
  - 중복 0, non-www 0, non-200 0, redirect 0
  - 모든 item이 sitemap의 공개 글과 일치
- `ads.txt`: 200, source와 live exact match. 값 자체는 이 보고서에 재기록하지 않았다.

### rendered graph와 metadata

- sitemap 26개를 GET으로 읽고 rendered `<a href>`를 수집했다.
- unique internal links 43개: non-200 0, redirect 0.
- rendered same-origin images 18개: HEAD 200, redirect 0, WebP 17 + JPEG 1.
- sitemap 페이지의 duplicate title 0, duplicate meta description 0.
- H1 수 오류 0(모두 1개), OG URL 오류 0, off-host JSON-LD URL 0.
- sitemap route orphan 0. 가장 적은 inbound도 4개였다.
- 공개 페이지에서 `<ins class=adsbygoogle>` 또는 `data-ad-slot` 수동 슬롯 0, `meta keywords` 0.

### index 제외·과거 URL

first-parent history의 대표 시점 `9ea9bcc`, `9c32c72`, `d3c5fe6`, `d01209a`, `0b9a43f`, 현재 `3420483`을 비교했다.

- 역사상 공개된 Markdown route union: 76개.
- 현재 indexable: 11개.
- 현재 draft/noindex 65개는 위 역사에서 모두 한 번 이상 공개됐던 URL이다.
- live 전수 확인 결과:
  - 64개 draft URL: 404
  - 1개: `/ko/sales-ops/unify-order-channels-for-sales` → `/ko/small-business/unify-order-channels` 영구 308 → 200
  - 과거 hub 4개(`/ko/contracts-payments`, 영화/OTT hub 3개): 404
  - 합계: 68개 404, 1개 308
- Langflow, Dify, Activepieces, Plausible, Umami 등 과거 도구 글은 현재 404다.
- 핵심 주제와 관련된 `/ko/contracts-payments` 및 전자계약 글도 현재 404다.
- 404 응답은 status가 실제 404이고 robots `noindex`여서 soft 404 200은 아니다. 다만 root metadata를 상속해 homepage canonical을 출력한다.
- 현재 permanent redirect는 HTTP `301`이 아니라 Next/Vercel의 `308`이다.

## 4. 확인된 finding

| Severity | Gate | Finding | 근거/영향 | 상태 |
| --- | --- | --- | --- | --- |
| HIGH | HUMAN_DECISION_REQUIRED | `draft + noindex` 65개가 실제 noindex 페이지가 아니라 route 미생성으로 격리된다. | 64개 404, 1개 308. “삭제하지 않고 noindex 격리”와 현재 runtime 의미가 다르다. 기존 URL의 복원·계속 404 여부를 자동 결정하면 안 된다. | 결정 필요 |
| HIGH | HUMAN_DECISION_REQUIRED | 핵심 포지셔닝의 전자계약·결제 hub/글도 404다. | `/ko/contracts-payments`와 전자계약 대표 글이 역사에는 있었으나 현재 공개 증거가 없어 보류됐다. 허위 근거 없이 복원 불가. | truthful evidence 필요 |
| HIGH | QA GAP | Playwright 공개 route 테스트가 정상 route에 대해 `<500`만 검사한다. | 기대 route가 404여도 테스트가 통과할 수 있다. 실제 200/308/404 contract를 route별로 강제해야 한다. | 수정 필요 |
| MEDIUM | P0_CANDIDATE / BLOCKED_PRODUCTION_SETTINGS | apex·HTTP·root 조합이 최대 3-hop이다. | 명시 기준 1회 이하 미달. host/protocol hop은 Vercel 도메인 설정 영향이 있어 이번 범위에서 변경 금지. | 별도 승인 필요 |
| MEDIUM | P0_CANDIDATE | 404 HTML이 homepage canonical을 상속한다. | 상태는 올바른 404지만 canonical은 최종 200 URL의 self-reference가 아니다. 검색엔진에는 404가 우선하나 감사 기준 불일치. | 코드 검토 필요 |
| MEDIUM | INDEXABILITY DESIGN | `getPublicPosts()`가 `noindex`를 제외하지 않는다. | 앞으로 `published + noindex`로 route를 살리면 home/category/RSS에도 노출될 수 있어 `NOINDEX_ISOLATE`를 안전하게 표현할 별도 routable/discoverable 집합이 필요하다. | 설계 필요 |
| MEDIUM | CONTENT POSITIONING | `/ko` meta description은 구체적 B2B 현장 카피가 아니라 예전의 범용 AI 자동화 설명이다. | hero/site-wide description과 메타 설명의 주제 선명도가 다르다. | P1/P3 후보 |
| MEDIUM | ASSET HYGIENE | 현재 공개 글에서 참조하지 않는 과거 CSV 10개가 `public/downloads/`에 남아 있다. | 소스상 public static 자산이다. 삭제/이전은 금지이며 실제 색인·유입은 Search Console 없이는 판단 불가. | HUMAN_CHECK |
| MEDIUM | REDIRECT CONTRACT | 의미가 같은 주문 채널 URL은 permanent `308`이다. | permanent semantics는 있으나 요구 예시는 exact `301`. 308 수용 여부를 redirect map에서 명시해야 한다. | HUMAN_DECISION |
| LOW | LOCALE | hreflang은 없다. | 공개 언어가 ko 단일이고 en/ja는 차단되어 현재 중복 신호는 확인되지 않았다. | 정상 |
| LOW | ARCHIVE | tag/archive/page pagination route가 없다. | thin tag archive 위험은 현재 확인되지 않았다. | 정상 |

현재 sitemap 또는 rendered internal graph에서 확인된 404, redirect, broken image, canonical 오류는 0이다. 따라서 확정 P0 broken-link는 없고, P0 후보는 redirect chain과 404 canonical hygiene다.

## 5. 기존 QA와 실제 baseline 실행

### 실행한 read-only 검사

| 명령/검사 | 결과 |
| --- | --- |
| `npm run validate:posts` | PASS — 공개 11 |
| `npm run validate:seo` | PASS — static 15, sitemap post 11 |
| `npm run validate:images` | PASS — 공개 글 11, manifest 212, optional 31 |
| `npm run check:links` | PASS |
| `npm run audit:interactions` | PASS |
| `npm run audit:content-authority` | PASS — 11 |
| `npm run audit:content-originality` | PASS — max similarity 0.003, repeated long paragraph 0 |
| `npm run evidence:validate` | PASS — 7 |
| live sitemap status/canonical audit | PASS — 26/26 |
| live rendered internal link audit | PASS — 43/43 |
| live rendered image HEAD audit | PASS — 18/18 |
| live metadata duplicate/H1/OG/JSON-LD audit | PASS — 26/26 |
| live RSS audit | PASS — 11/11 |
| public-facing text/download sensitive pattern scan | PASS — 134 text files, email/전화/주민번호/사업자번호/card-like/secret assignment 0 |
| 승인 증거 7개 직접 시각 확인 | PASS — fixture/local-demo 표시, 실제 사람 이름·전화·이메일·계정번호·토큰 미노출 확인 |

### 실행하지 않은 검사

- `npm test`: `pretest`가 evidence를 `public/images/evidence`와 runtime manifest로 stage하는 쓰기 작업이라 역할의 “결과 파일 외 변경 금지”와 충돌한다.
- `npm run build`: `prebuild`도 evidence staging 쓰기를 수행하며 `.next`를 생성한다.
- `npm run lint`, `npm run typecheck`: 최종 통합 상태에서 오케스트레이터가 전체 gate로 실행해야 한다. 이 역할에서는 기준선 구조 감사 후 추가 탐색 중단 요청을 따랐다.
- `npm run evidence:qa` / Playwright: Production-like build와 Preview evidence staging을 생성하며 현재 작업은 Preview가 아니다.
- Preview visual screenshot: Preview가 아직 생성되지 않았다.

과거 보고서의 223 tests, evidence QA 76/76 결과는 현재 재실행 결과가 아니므로 이번 PASS로 계산하지 않는다.

## 6. QA 누락

1. **Live route contract 자동화 없음**
   - `validate:seo`는 source 집합만 보고 live 200/redirect/404/canonical을 검사하지 않는다.
   - Playwright는 정상 route에 exact `200`을 강제하지 않는다.

2. **broken link 범위가 좁음**
   - `check-links.ts`는 공개 Markdown의 `/ko/...` 링크만 검사한다.
   - header/footer/resources/download/rendered HTML/image/redirect chain/orphan/external source URL은 검사하지 않는다.

3. **요구 viewport와 route 미충족**
   - 현재 viewport: 350×800, 390×844, 768×900, 1440×960.
   - 요구 중 360×800, 430×932, 768×1024, 1440×900 exact case가 없다.
   - 6개 공개 글과 contact/editorial/advertising/disclaimer/SEO ops dashboard가 브라우저 route 배열에 없다.

4. **접근성 검증 부족**
   - heading 순서, keyboard navigation, focus visibility, contrast, tap target, alt 품질, table/code/long URL overflow를 전수 자동 검사하지 않는다.

5. **metadata·schema 검사 부족**
   - static trust page를 포함한 title/description 중복, live OG URL, JSON-LD URL/date/author/publisher/breadcrumb 일치를 자동화하지 않는다.

6. **noindex isolation regression guard 부족**
   - `published + noindex`가 sitemap에서는 빠져도 RSS/home/category에 남는 구조를 차단하는 테스트가 없다.

7. **민감정보 감사 부족**
   - evidence validator는 manifest 상태·hash·선언을 검증하지만 OCR 기반 PII/secret 검출은 아니다.
   - 공개 Markdown/CSV/신뢰 페이지 전체 민감 패턴 audit package script가 없다.

8. **inventory 산출물 부족**
   - `audit:adsense-inventory`는 `reports/` Markdown을 쓰며 required CSV/JSON live fields를 만들지 않는다.
   - 실행 자체가 working tree를 변경하므로 baseline read-only audit에 부적합하다.

9. **테스트의 working-tree mutation**
   - `npm test`와 `npm run build`의 pre-hook이 evidence runtime 자산을 stage한다.
   - 최종 gate 전후 `git status`, exact byte/hash, 원복 여부를 검사하거나 temp build/output으로 격리해야 한다.

## 7. 증거·개인정보 판정

- manifest 7개는 모두 `approved`, `piiScan=pass`다.
- 실제 공개 이미지 7개를 원본 크기로 직접 확인했다.
- 모두 `FIXTURE`, `로컬 데모`, `가상 데이터`, `읽기 전용` 등의 경계가 보인다.
- 실제 고객명, 전화번호, 이메일, 거래처 식별정보, 토큰, 결제정보는 보이지 않았다.
- 이미지에 보이는 값은 sample/fixture 식별자 또는 기능 상태다.
- **HUMAN_CHECK**: 자동 OCR을 실행하지 않았고 원본 외부 저장소 화면 전체를 재검사하지 않았다. 최종 Preview 캡처와 새 증거는 별도 수동 마스킹 검토가 필요하다.

## 8. BLOCKED / HUMAN_CHECK

- `BLOCKED_SEARCH_CONSOLE`: 계정/API/export를 제공받지 않아 실제 색인 URL, 선택 canonical, crawl error, 과거 CSV/legacy URL 유입을 확인하지 못했다.
- `BLOCKED_ADSENSE_ACCOUNT`: 사용자 제공 거절 사유 외 정책 센터의 다른 문제는 확인하지 않았다.
- `BLOCKED_PRODUCTION_SETTINGS`: apex/HTTP redirect chain 단축은 Vercel 도메인/DNS 설정 변경 가능성이 있어 이번 범위에서 금지됐다.
- `BLOCKED_PREVIEW`: Preview가 없어 요구 viewport screenshot, console/network, keyboard/focus/contrast 검증을 실행하지 않았다.
- `HUMAN_DECISION_REQUIRED`: 64개 legacy 404를 계속 유지할지, 일부를 200 noindex로 격리할지, 증거가 있는 동일 의도 페이지로만 redirect할지 결정해야 한다.
- `HUMAN_INPUT_REQUIRED`: 전자계약·결제 콘텐츠는 공개 안전 fixture가 없다는 기존 증거 보고와 일치한다. 진실한 자료 없이 복원하면 안 된다.

## 9. 오케스트레이터 권고 우선순위

1. P0: route contract test를 exact status로 강화하고, live/Preview sitemap 26개와 rendered graph를 자동 검사한다.
2. P0 후보: root/apex/protocol redirect chain과 404 canonical을 코드·Vercel 설정 경계로 분리해 해결 가능성을 판정한다. Production 설정 변경은 별도 승인 전 금지한다.
3. P1: `routable`, `discoverable`, `indexable` 콘텐츠 집합을 분리해 `NOINDEX_ISOLATE`가 RSS/home/sitemap에 섞이지 않도록 한다.
4. HUMAN_DECISION: 65개 과거 공개 URL과 10개 orphan CSV의 유지/격리/redirect/404 정책을 Search Console 근거와 함께 확정한다.
5. HUMAN_CONTENT: 전자계약·결제는 공개 가능한 실제 fixture가 확보되기 전까지 새 flagship으로 가장하지 않는다.
6. P4: 민감 패턴 audit, live metadata duplicate/canonical/schema, orphan, exact viewport Playwright를 package scripts에 연결한다.

## 10. 역할 종료 상태

- 이 문서 외 소스·콘텐츠·설정 변경 없음.
- Production write 없음.
- Preview/deploy/push/merge 없음.
- AdSense 재검토 요청 없음.
- Search Console 작업 없음.
- DNS/domain/ads.txt/GA4/AdSense code 변경 없음.
