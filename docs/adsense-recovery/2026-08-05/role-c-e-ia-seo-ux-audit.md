# ROLE C + E — IA·SEO·UX·신뢰 감사

- 감사일: 2026-08-05 (KST)
- 저장소: `Biz2Lab_Os`
- 작업 브랜치: `codex/biz2lab-adsense-low-value-recovery-20260805`
- 기준 HEAD: `3420483063f44b18d21c4b80e97c462a91d5e1f1`
- Production 기준 URL: `https://www.biz2lab.com`
- 범위: 정보구조, 주제 일관성, 탐색, 공개/격리 경계, 신뢰 페이지, 접근성·모바일 UX의 코드 및 읽기 전용 Production 감사
- 변경 범위: 이 보고서만 생성. 기존 소스·콘텐츠·설정은 수정하지 않음.

## 1. 판정

`PARTIAL_HUMAN_CONTENT_REQUIRED`

현재 공개 사이트는 이전 영화·OTT 사이트보다 B2B 현장 업무 자동화로 크게 정리되어 있다. 공개 글 11개와 4개 허브는 주문·미수금·승인형 자동화·물류 중심이며, 영화·OTT 글 22개를 포함한 비공개 글 65개는 정적 라우트, sitemap, RSS, navigation에서 빠져 있다.

그러나 아래 문제 때문에 ROLE C/E 관점의 사람 검토 준비 상태를 PASS로 볼 수 없다.

1. **HIGH — 기본 Open Graph 이미지가 아직 `Biz2Lab PLAY / 영화 추천·결말 해석·OTT 생활`이다.** 홈페이지·허브·신뢰 페이지 등 기본 이미지를 쓰는 indexable static route 15개가 B2B 카피와 정반대인 공개 이미지를 공유한다.
2. **HIGH — 전면 카피는 전자계약을 핵심 전문 영역으로 약속하지만 공개 전자계약 허브와 글은 모두 404다.** 관련 Markdown 5개는 `draft + noindex`라서 허위 노출은 막았지만, 공개 IA가 사이트의 핵심 약속을 뒷받침하지 못한다.
3. **HIGH — 비공개 개인정보 요청을 받을 실제 private contact 경로가 없다.** 일반 문의는 공개 GitHub Issue로 동작하지만, Contact가 안내하는 GitHub 프로필에는 현재 공개 email/blog/bio가 없어 민감한 열람·정정·삭제 요청의 다음 행동이 막힌다.
4. **MEDIUM — 홈페이지와 모바일 navigation의 밀도가 높다.** Production `/ko`의 main 내부 링크는 38개지만 목적지는 14개뿐이고, 같은 글이 3~5회 반복된다. sticky header에는 8개 링크가 별도 mobile menu 없이 wrap된다.
5. **MEDIUM — 1개 글짜리 물류 허브가 빈 `클러스터 글` 섹션을 렌더링한다.** 자동화·주문 허브도 공개 글이 각각 2개뿐이라 범용 템플릿형 archive 인상이 남는다.
6. **MEDIUM — 스크린샷·키보드·실제 viewport 검증이 미완료다.** 인앱 Browser가 연결되지 않아 360/390/430/768/1440 시각 QA를 이번 역할에서 수행하지 못했다.

이 보고서는 AdSense 승인 가능성이나 재검토 준비 완료를 보장하지 않는다.

## 2. 감사 방법과 증거 한계

### 현재 실행에서 확인한 증거

- `git status --short --branch`, `git rev-parse HEAD`
- `npx tsx`로 `getAllPosts()`, `getPublicPosts()`, `getSitemapPosts()`와 category별 공개 수 집계
- `npm run validate:seo` → `PASS (15 static routes, 11 sitemap posts)`
- `npm run check:links` → `PASS`
- `npm run audit:interactions` → `PASS`
- Production `GET/HEAD`만 사용한 status, redirect, canonical, metadata, heading/link count 확인
- live sitemap 26 URL, RSS 11 item, off-topic/contract URL 포함 여부 확인
- live CSS token과 정적 색상 대비 계산
- GitHub public API에서 운영자 프로필의 private-contact 대체 수단 존재 여부를 boolean으로만 확인

### 증거 한계

- `BLOCKED_VISUAL_QA`: 인앱 Browser 목록이 비어 있어 현재 실행의 screenshot을 만들 수 없었다.
- 실제 360×800, 390×844, 430×932, 768×1024, 1440×900 reflow, 잘림, sticky header 점유 높이, 실제 focus 순서와 keyboard navigation은 통과 처리하지 않았다.
- 스크린샷 없이 full WCAG 준수나 실제 시각적 완성도를 주장하지 않는다.
- Search Console query/click/index export는 제공되지 않아 검색 유입과 orphan 판정에 사용하지 않았다.

## 3. 공개 IA 현황

### 3.1 공개 콘텐츠 분포

| 공개 허브 | 공개 글 | 유형 | 판단 |
| --- | ---: | --- | --- |
| `/ko/sales-ops` | 6 | pillar 1, checklist 1, how-to 4 | 가장 완성된 클러스터 |
| `/ko/automation` | 2 | case-study 2 | 근거성은 좋으나 허브 깊이는 얕음 |
| `/ko/small-business` | 2 | case-study 2 | 주문·운영 포지셔닝은 명확하나 허브 깊이는 얕음 |
| `/ko/warehouse-logistics` | 1 | case-study 1 | 빈 cluster section을 만드는 얇은 archive 위험 |

- 전체 Markdown: 76개
- 공개: 11개
- sitemap 대상 글: 11개
- 비공개: 65개 (`status: draft`, `draft: true`, `noindex: true`)
- 공개 category source of truth: `lib/schema.ts:3-8`, `lib/categories.ts:112-114`
- 공개 필터 및 sitemap 필터: `lib/posts.ts:106-133`

### 3.2 비공개 콘텐츠 분포

| 분류 | 수 | 현재 상태 | 권고 |
| --- | ---: | --- | --- |
| 영화 추천 `what-to-watch` | 8 | draft + noindex, live 404 | 현 상태 유지. 삭제·이전은 사람 결정 전 금지 |
| 영화 해석 `after-the-credits` | 8 | draft + noindex, live 404 | 현 상태 유지 |
| OTT `streaming-life` | 6 | draft + noindex, live 404 | 현 상태 유지 |
| 범용/오픈소스 도구 중심 automation | 31 | draft + noindex, live 404 | 실제 사용·비교 증거 없는 글은 계속 비공개 또는 통합 후보 |
| 기타 automation 실무 글 | 2 | draft + noindex | 증거·고유 의도 충족 시에만 보강 후보 |
| 전자계약·결제 | 5 | draft + noindex, live 404 | 사실 증거 없이는 공개 금지. 핵심 포지셔닝 결정 필요 |
| sales-ops | 1 | draft + noindex | 기존 301 대상과 중복 의도 확인 후 처리 |
| small-business | 4 | draft + noindex | 근거 있는 supporting만 선별 |

영화·OTT 22개와 모든 draft 글은 현재 `generateStaticParams()`와 `getPostBySlug()`가 `getPublicPosts()`만 사용하므로 public article route로 생성되지 않는다 (`app/ko/[category]/[slug]/page.tsx:28-60`). 이는 공개 `noindex` 페이지보다 강한 격리로, live 과거 URL은 `404 + noindex`였다.

### 3.3 sitemap/RSS/navigation/locale

- live `sitemap.xml`: 26 URL = static 15 + 공개 글 11
- live `rss.xml`: 11 item
- 영화·OTT·전자계약 draft URL: sitemap/RSS에 없음
- 공개 locale: `ko`만 허용 (`lib/locales.ts:1-5`)
- `/en`, `/ja`는 금지 prefix이며 multilingual flag도 false
- hreflang이 없는 것은 현재 단일 locale 구조와 일치한다.
- public tag archive는 존재하지 않는다. frontmatter `tags`는 저장되지만 app/component에서 렌더링하지 않으므로 thin tag archive가 생성되지 않는다.
- 공개 글 11개는 각각 해당 category hub의 card grid에서 연결되므로 코드 기준 article orphan은 0개다.
- static trust/resource/project route는 header 또는 footer에서 연결된다.

## 4. 상세 발견 사항

### IA-01. 기본 OG 이미지가 여전히 엔터테인먼트 브랜드다 — HIGH / P0-P1

**증거**

- `app/opengraph-image.tsx:3`: `Biz2Lab PLAY - 오늘 뭐 볼까`
- `app/opengraph-image.tsx:26-31`: `Biz2Lab PLAY`, `영화 추천 · 결말 해석 · OTT 생활`
- `lib/seo.ts:38-60`: 별도 image가 없으면 `/opengraph-image`를 Open Graph에 사용
- live `/ko`, `/ko/warehouse-logistics`, `/ko/about`, `/ko/contact`, `/ko/privacy`, `/ko/editorial-policy`, `/ko/author/biz2lab` 모두 `og:image=https://www.biz2lab.com/opengraph-image`
- live `/opengraph-image`는 `200 image/png`

**영향**

- 검색·메신저·SNS 공유 미리보기에서 B2B 현장 시스템 사이트가 영화·OTT 사이트처럼 보일 수 있다.
- 코드상 본문 카피가 정리되어도 외부 표면의 주제 일관성을 훼손한다.

**권고**

- P0/P1에서 기본 OG 이미지와 alt를 검증된 B2B 포지셔닝으로 교체한다.
- `주문·미수금·전자계약·재고·승인형 자동화` 중 실제 공개 콘텐츠가 있는 범위만 표현한다.
- 실제 시스템 screenshot처럼 보이는 합성 이미지를 만들지 않는다.
- homepage, 4 hub, trust/resource/project static page의 OG metadata를 다시 확인한다.

### IA-02. 전자계약 약속과 공개 IA가 불일치한다 — HIGH / HUMAN_CONTENT_REQUIRED

**증거**

- site description과 hero는 전자계약을 핵심 주제로 명시 (`lib/site-settings.ts:50-64`).
- About도 전자계약 시스템을 직접 다룬 문제로 명시 (`app/ko/about/page.tsx:34-43`).
- 그러나 header nav, public category list, static routes에 `/ko/contracts-payments`가 없다 (`lib/site-settings.ts:66-75`, `lib/categories.ts:112-114`, `lib/seo.ts:5-21`).
- 관련 Markdown 5개는 모두 draft + noindex이며 live hub/article은 404다.

**영향**

- 첫 화면에서 약속한 핵심 전문 주제를 독자가 탐색할 수 없다.
- 전자계약을 찾는 방문자에게 B2B 전문성보다 미완성 IA로 보일 수 있다.

**권고**

- 실제 저장소 증거로 1개 flagship과 최소 1~2개 supporting을 강화할 수 있을 때만 hub와 nav를 공개한다.
- 진실한 근거가 부족하면 공개 카피를 현재 공개 가능한 주문·미수금·물류·승인형 자동화 범위로 좁힌다.
- 빈 hub나 placeholder는 만들지 않는다.
- 이 선택은 `HUMAN_DECISION_REQUIRED`다.

### IA-03. 허브 깊이 불균형과 빈 archive UI — MEDIUM / P1

**증거**

- category별 공개 글 수: 6 / 2 / 2 / 1.
- `CategoryHubPage`는 실제 pillar가 없으면 첫 글을 pillar처럼 사용한다 (`components/layout/CategoryHubPage.tsx:7-10`).
- clusters가 0개여도 `클러스터 글` heading과 빈 grid를 렌더링한다 (`components/layout/CategoryHubPage.tsx:41-50`).
- live `/ko/warehouse-logistics`는 `200`, H2 4개지만 공개 글은 1개다.

**영향**

- 1~2개 card만 있는 범용 archive는 고유한 hub보다 얇은 템플릿 페이지로 보일 수 있다.
- 빈 heading은 모바일 읽기 흐름과 정보 기대를 깨뜨린다.

**권고**

- `clusters.length === 0`이면 cluster section을 렌더링하지 않는다.
- 1개 글 허브는 고유 문제 지도·상태 흐름·다음 supporting 계획이 있을 때 유지하고, 아니면 homepage/project hub에서 직접 연결하는 방안을 검토한다.
- category별 실제 pillar를 명시하고 `posts[0]` fallback에 의존하지 않는다.

### IA-04. 홈페이지 내부링크와 CTA가 과도하게 반복된다 — MEDIUM / P1-P3

**증거**

- live `/ko` main: 내부 링크 38개, 고유 목적지 14개.
- 같은 목적지 반복: `daily-numbers-for-small-business` 5회, `ai-business-automation-guide`·`unify-order-channels`·`automation-priority-method` 각 4회, 여러 글이 3회.
- source는 hero 다음에 대표 사례, 실무 숫자, 실무 자료, 판단 기준, 공개 코드, 최근 글, 추천 경로를 연속 렌더링한다 (`components/layout/HomePage.tsx:117-334`).

**영향**

- 핵심 CTA가 많아서가 아니라 같은 11개 글을 여러 묶음으로 반복 노출해 템플릿형·과밀 인상을 준다.
- 모바일에서 스크롤 길이가 늘고 다음 행동 우선순위가 흐려진다.

**권고**

- homepage를 `핵심 약속 → flagship 4~6개 → 업무 허브 → 신뢰/자료` 정도로 압축한다.
- 동일 URL은 main에서 역할이 다른 경우에도 1~2회 이내를 우선한다.
- 최근 글 grid와 추천 경로가 같은 글을 반복하면 한쪽을 제거하거나 서로 다른 supporting으로 분리한다.
- 광고·상담성 CTA를 추가하지 않는다.

### IA-05. header/footer 탐색 밀도와 active state 부족 — MEDIUM / P1-P3

**증거**

- sticky header에 8개 링크가 있고 별도 menu/disclosure가 없다 (`components/layout/SiteHeader.tsx:7-38`, `lib/site-settings.ts:66-75`).
- nav는 mobile에서 `flex-wrap`이며 active page나 `aria-current` 표시가 없다.
- footer는 category 6 + policy 8 = 14개 링크를 제공 (`lib/site-settings.ts:76-105`).

**영향**

- 360px에서 header가 여러 줄로 높아져 본문을 가릴 가능성이 있다. screenshot 부재로 실제 높이는 미확인이다.
- 현재 위치 인지가 어렵고, header와 footer의 정보 밀도가 서로 다른 방식으로 과하다.

**권고**

- mobile에서는 검증 가능한 disclosure menu를 사용하고 focus 이동·ESC·outside click을 테스트한다.
- desktop 1차 nav는 핵심 hub와 구축 사례 중심으로 줄이고 About/Contact/policy는 footer에 둔다.
- active link와 breadcrumb current item에 `aria-current="page"`를 제공한다.

### IA-06. breadcrumb는 article에만 있고 현재 페이지를 self-link한다 — LOW / P3

**증거**

- article breadcrumb는 홈 → category → article을 제공 (`app/ko/[category]/[slug]/page.tsx:69-72,116-119`).
- 마지막 article item도 링크이며 `aria-current`가 없다 (`components/article/Breadcrumbs.tsx:12-20`).
- hub/static trust page에는 breadcrumb가 없다.

**권고**

- 마지막 item은 text + `aria-current="page"`로 바꾼다.
- hub와 깊은 static page에 breadcrumb가 실제 탐색을 돕는 경우에만 추가한다. 모든 페이지에 기계적으로 넣지 않는다.

### UX-01. article 본문 시작 전 UI가 길다 — MEDIUM / P2-P3

**증거**

- article 순서: header → hero → Summary → Editorial Evidence → Evidence Gallery → TOC → 본문 (`app/ko/[category]/[slug]/page.tsx:116-177`).
- 공개 case-study 5개 중 5개가 evidence 1~2개를 가진다.

**강점**

- 작성자, 게시일·수정일, 검증 범위, 실제 증거와 미검증 범위를 분리한다.
- evidence-first 방향은 사이트 신뢰에 직접 기여한다.

**위험**

- mobile에서 독자의 질문에 답하는 첫 본문이 여러 card와 gallery 뒤로 밀릴 수 있다.
- 모든 글에 같은 block 순서가 반복되면 evidence가 고유 가치가 아니라 템플릿 장식처럼 보일 수 있다.

**권고**

- 문제와 직접 답을 1~2문단 먼저 보여 준 뒤 evidence/TOC를 배치하는 방안을 Preview에서 비교한다.
- evidence가 없는 글에서는 빈 gallery를 이미 숨기고 있으므로, 실제 evidence 종류에 따라 block 순서를 차별화한다.
- 검증 메모 자체를 삭제하지 말고 읽기 흐름 안에 통합한다.

### UX-02. 접근성 기반은 양호하지만 skip/focus/contrast 검증이 남았다 — MEDIUM / P3

**확인된 강점**

- root `<html lang="ko">` (`app/layout.tsx:46-49`).
- live 표본 8개 route는 모두 H1 1개.
- article image는 frontmatter alt를 사용 (`app/ko/[category]/[slug]/page.tsx:153-162`).
- responsive Markdown table은 mobile card / desktop table로 분리된다.
- body와 heading은 Korean keep-all과 overflow-wrap을 사용 (`app/globals.css:19-57`).
- Contact의 공개 Issue 링크는 민감정보 금지 안내와 안전한 external link 속성을 가진다.
- modal, cookie banner, newsletter popup, manual ad-slot markup은 public component source에서 발견되지 않았다.

**확인된 위험**

- live HTML 표본에 skip-to-content link가 없고 layout main에도 target id가 없다 (`app/layout.tsx:79-81`).
- 주요 링크는 hover style만 명시하며 공통 `focus-visible` 디자인은 없다. 브라우저 기본 outline의 실제 가시성은 미검증이다.
- live CSS 기준 footer copyright `#62748e` on `#020618` 대비는 약 `4.23:1`로 12px normal text의 4.5:1 목표에 못 미친다 (`components/layout/SiteFooter.tsx:28-30`).
- article prose link `#d6422d` on white는 약 `4.49:1`로 경계 미달이다 (`app/globals.css:110-113`).
- keyboard order, menu wrap, zoom 200%, focus obscuring은 screenshot/browser 부재로 미검증이다.

**권고**

- skip link와 `main` target을 추가한다.
- link/button/card에 일관된 `focus-visible` ring을 추가하고 keyboard로 확인한다.
- 두 경계 색상을 4.5:1 이상으로 조정한 뒤 실제 compiled CSS로 재계산한다.
- 360/390/430/768/1440에서 horizontal overflow, sticky obstruction, table/code/URL reflow를 반드시 재검증한다.

### TRUST-01. 신뢰 페이지 체계는 강하다 — POSITIVE

다음 Production route는 모두 `200`, self canonical, H1 1개였다.

| Route | 확인된 역할 |
| --- | --- |
| `/ko/about` | 직접 다루는 문제, 작성·검토 주체, AI 보조, 수정·한계 공개 |
| `/ko/contact` | 공개 오류 제보, 민감정보 금지, 공개 Issue 경로 |
| `/ko/privacy` | GitHub 문의, GA4, AdSense 연결 코드, 광고 쿠키와 변경 안내 |
| `/ko/terms` | 정보성 성격, 사용자 책임, 최신성, 저작권, 외부 링크 |
| `/ko/editorial-policy` | 사실/추정 구분, 의미 있는 수정일, AI 보조, 오류 처리 |
| `/ko/author/biz2lab` | 운영 경험 범위, 공개 코드, 대표 글, 공개하지 않는 정보 |
| `/ko/advertising` | AdSense 연결 상태, 제휴·협찬 없음, 편집 독립성 |
| `/ko/disclaimer` | 결과 비보장, 전문가 상담 범위, 적용 책임 |

특히 About와 Author는 `local/demo/synthetic`을 production 성과로 확대하지 않고, 고객명·개인정보·내부 매출을 공개하지 않는다고 명시한다. 이 방향은 유지해야 한다.

### TRUST-02. private contact가 실제로 닫혀 있다 — HIGH / HUMAN_INPUT_REQUIRED

**증거**

- Contact는 일반 문의를 public GitHub Issue로 보낸다 (`app/ko/contact/page.tsx:17-37`).
- 개인정보 관련 비공개 확인은 운영자 GitHub 프로필의 공개 연락처를 쓰라고 안내한다 (`app/ko/contact/page.tsx:40-57`).
- 2026-08-05 public GitHub API 확인 결과 해당 profile에는 public email, blog, bio가 없었다. 값 자체는 보고서에 기록하지 않았다.

**영향**

- 오류 제보는 가능하지만 본인 확인 자료가 필요한 privacy request는 안전하게 완료할 수 없다.
- 공개 Issue에 민감정보를 올리지 말라는 안내는 옳지만, 실제 대체 채널이 없다.

**권고**

- 운영자가 공개 승인한 private email 또는 서버 측 form 경로를 제공해야 한다.
- 실제 주소가 결정되기 전 placeholder email/전화번호를 배포하지 않는다.
- 연락처 제공은 `HUMAN_INPUT_REQUIRED`다.

### TRUST-03. 운영자 신원 공개 범위는 의도적으로 gated 상태다 — MEDIUM / HUMAN_DECISION_REQUIRED

- `AUTHOR_REAL_NAME_APPROVED === "true"`일 때만 real name을 표시하며 기본은 역할 기반 이름이다 (`lib/editorial-evidence.ts:1-10`).
- 현재 live author H1은 `Biz2Lab 운영자 · B2B 유통 현장 시스템 설계·개발`이다.
- 공개 GitHub 코드와 project 근거는 연결되어 있어 완전 익명은 아니지만, 법인/사업자/실명 운영 주체 정보는 제공되지 않는다.

실명·사업자·회사 주소를 새로 만들거나 추론해서는 안 된다. 운영자가 승인한 정보만 별도 작업에서 반영하거나, 현재 역할 기반 identity를 유지한다.

### SEO-01. canonical/sitemap/index 경계는 대체로 일관된다 — POSITIVE

- canonical host source는 `https://www.biz2lab.com` (`lib/site.ts:3-20`).
- 표본 200 page는 모두 self canonical과 동일한 Open Graph URL을 가졌다.
- sitemap에 draft/noindex/off-topic URL이 없었다.
- `/ko/ops/seo-dashboard`는 live 200이지만 `noindex, nofollow`, private/no-store이고 sitemap/nav에 없다.
- evidence review와 admin console은 live 404이며 noindex 방어가 있다.
- 영화·OTT 과거 URL은 404 + noindex이며 homepage로 redirect하지 않는다.

### SEO-02. apex homepage만 2-hop redirect chain이다 — HIGH / PRODUCTION_SETTING_REQUIRED

**live chain**

1. `https://biz2lab.com/` → `308 https://www.biz2lab.com/`
2. `https://www.biz2lab.com/` → `308 /ko`
3. `https://www.biz2lab.com/ko` → `200`

`www` root는 1-hop이고 apex deep path `/ko`도 1-hop이지만 apex root는 사용자 기준인 redirect chain 1회 이하를 충족하지 않는다.

이 문제는 domain redirect와 app root redirect의 결합이다. Production domain/Vercel 설정 변경은 이번 PR에서 금지되어 있으므로 자동 수정하지 않는다. canonical host와 `/ko` 정책을 유지하면서 apex root를 한 번에 final URL로 보내는 방법은 별도 승인된 Production 설정 검토가 필요하다.

## 5. 역할별 flow 상태

| Step | 사용자가 보는 단계 | 상태 | 근거/제한 |
| ---: | --- | --- | --- |
| 1 | apex/www 진입 후 `/ko` 도착 | RISK | www는 1-hop, apex root는 2-hop |
| 2 | sticky header에서 업무 주제 선택 | PARTIAL | 4개 B2B hub는 명확, mobile 8-link wrap과 active state 미검증 |
| 3 | category hub에서 pillar/cluster 탐색 | RISK | 6/2/2/1 분포, 물류 hub 빈 cluster section |
| 4 | article에서 근거와 본문 읽기 | PARTIAL | author/date/evidence 우수, 본문 전 block 과다 위험 |
| 5 | related/next step으로 이동 | HEALTHY | 공개 글마다 category inbound가 있고 related/next step 검사 통과 |
| 6 | About/Author에서 운영 범위 확인 | HEALTHY | 구현·미검증·민감정보 경계 명확 |
| 7 | 오류/개인정보 문의 | RISK | 공개 Issue는 동작, private contact는 없음 |
| 8 | 영화·OTT/실험 URL 접근 | HEALTHY ISOLATION | sitemap/RSS/nav 제외, live 404+noindex |
| 9 | mobile/keyboard/visual 확인 | BLOCKED | 인앱 Browser 없음, screenshot 0개 |

## 6. 우선순위 권고

### P0/P1 — 즉시 구현 후보

1. 기본 OG 이미지를 B2B 현장 시스템 포지셔닝으로 교체하고 15개 static route metadata를 재검증한다.
2. `clusters.length === 0`이면 빈 cluster section을 숨긴다.
3. homepage 반복 link section을 통합한다.
4. mobile header 구조를 단순화하되 Preview에서 실제 keyboard/viewport 검증 전 완료 처리하지 않는다.
5. 전자계약은 진실한 evidence가 확보될 때까지 빈 hub를 만들지 않는다.

### P2/P3 — 콘텐츠·신뢰·접근성

1. article의 직접 답변을 evidence UI보다 먼저 보여 주는 순서를 Preview에서 검증한다.
2. skip link, focus-visible, contrast를 보완한다.
3. 운영자가 승인한 private contact를 제공한다.
4. author real-name/company identity 공개 여부는 사람 승인 후 별도 반영한다.

### 재발 방지 검사 제안

- static OG image에 `PLAY`, `영화`, `OTT` 문자열이 다시 들어오면 실패
- public category count가 0/1일 때 빈 archive section을 렌더링하면 실패
- homepage main 동일 URL 반복 상한 또는 중복 link bundle 경고
- public promise keyword(예: 전자계약)와 실제 public hub/article 존재 여부 mismatch 경고
- skip link, `aria-current`, focus-visible style 존재 검사
- compiled foreground/background contrast smoke
- private contact availability는 자동 통과시키지 않고 `HUMAN_CHECK`

## 7. HUMAN_DECISION_REQUIRED / HUMAN_INPUT_REQUIRED

- `HUMAN_CONTENT_REQUIRED`: 전자계약·결제 관련 실제 화면, 공개 가능한 구조도, 검증 로그 또는 공식 근거 제공. 없으면 public positioning에서 약속 범위를 줄일지 결정.
- `HUMAN_INPUT_REQUIRED`: 공개 Issue가 아닌 private contact 주소 또는 승인된 contact 방식.
- `HUMAN_DECISION_REQUIRED`: 운영자 실명·사업자/회사 정보 공개 범위. 현재 env gate를 우회하거나 임의 정보를 만들지 않음.
- `PRODUCTION_SETTING_REQUIRED`: apex root 2-hop을 1-hop으로 줄이는 domain redirect 정책. 별도 승인 전 변경 금지.
- `HUMAN_DECISION_REQUIRED`: 영화·OTT/Biz2Lab PLAY URL의 완전 삭제·이전·별도 도메인 분리. 이번 범위에서는 draft/404 격리 유지.
- `HUMAN_CHECK`: Google/AdSense 사용 지역과 실제 광고 상태에 따른 consent/CMP 요구사항. 이번 코드 감사로 법률·정책 준수를 자동 판정하지 않음.

## 8. 이번 역할에서 수행하지 않은 작업

- 소스·콘텐츠·redirect·noindex·sitemap·navigation 수정 없음
- URL 삭제·이전·301 추가 없음
- 회사명·주소·전화번호·실명·고객 사례 생성 없음
- Preview/Production deploy 없음
- Vercel/domain/DNS 설정 변경 없음
- AdSense/Search Console 조작 없음
- screenshot 생성 없음 (`BLOCKED_VISUAL_QA`)

## 9. 다음 통합 단계

오케스트레이터는 먼저 **기본 OG 이미지의 주제 오류, 빈 물류 cluster section, homepage 반복 링크**를 P0/P1 diff로 처리하고, 전자계약 공개 여부와 private contact는 사람 자료가 들어오기 전까지 구현하지 않아야 한다. 그 뒤 Preview에서 360/390/430/768/1440 screenshot, keyboard focus, sticky header, article 첫 본문 도달 거리를 다시 검증해야 한다.
