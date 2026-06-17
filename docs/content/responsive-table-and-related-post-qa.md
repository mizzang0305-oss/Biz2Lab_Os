# Responsive Table And Related Post QA

Date: 2026-06-17
Phase: 4.2A.2 S-grade content and responsive UX hardening
Status: LOCAL_QA_PASS

Google setup remains unapplied. This document records the content and UX QA
criteria used before Search Console, GA4, AdSense, ads.txt, DNS, or Vercel
configuration changes.

## 1. Problems Found

- Article bodies had duplicated Markdown related-post sections.
- Some Markdown related-post labels exposed English slugs such as
  `payment-reminder-message` instead of Korean article titles.
- Markdown tables depended on horizontal overflow on mobile.
- Korean table text could become hard to read on narrow screens if forced into
  desktop table columns.
- Article pages exposed the disabled search message too prominently.
- Article detail pages had several high-emphasis boxes in sequence, which made
  the page look busier than the content required.

## 2. Files Changed

- `components/article/ResponsiveTable.tsx`
- `components/article/MarkdownRenderer.tsx`
- `components/article/RelatedReadingBox.tsx`
- `components/cards/ArticleCard.tsx`
- `components/layout/SiteHeader.tsx`
- `components/article/SummaryBox.tsx`
- `components/article/ChecklistBox.tsx`
- `components/article/FAQBox.tsx`
- `app/ko/[category]/[slug]/page.tsx`
- `app/globals.css`
- `content/ko/**/*.md`
- `scripts/audit-content-authority.ts`
- `scripts/audit-public-interactions.ts`
- `tests/biz2lab-policy.test.ts`
- `docs/content/phase-4-2a-2-s-grade-ux-hardening.md`
- `docs/content/responsive-table-and-related-post-qa.md`

## 3. Related Post Slug To Title Method

- `relatedPosts` remains a frontmatter slug list.
- `getRelatedPosts(post)` resolves each slug through the post registry.
- Public links keep the existing English slug URL.
- Public card text uses the resolved post metadata:
  - Korean title: `frontmatter.title`
  - Korean category label: `categoryName`
  - Korean summary: `frontmatter.description`
  - Reading time: `readingTime`
- The Markdown body no longer owns related-reading rendering.
- A public slug label is treated as a QA failure, not as a display fallback.

## 4. Mobile Table Method

- `MarkdownRenderer` routes Markdown `table` nodes into `ResponsiveTable`.
- Desktop and tablet widths at `md` and above preserve a standard table.
- Mobile widths render each table row as a compact card.
- Each mobile row card displays cells as Korean-readable `header: value` pairs.
- CSS uses keep-all wrapping and normal sentence wrapping.
- `word-break: break-all` is not used for article tables.
- Horizontal scrolling alone is not the mobile solution.

## 5. Search UI Method

- `SiteHeader` no longer renders the disabled `SearchBox`.
- Article pages do not expose `검색은 승인 후 활성화 예정입니다.`.
- Search implementation remains available as a component for a later dedicated
  search phase.
- Current article navigation leans on category and related-post exploration
  instead of a large disabled search field.

## 6. S-Grade Content Criteria

Required readiness checks:

- Clear Korean title.
- Opening paragraph states the reader and problem.
- At least one realistic field example.
- Five or more execution steps, or equivalent checklist/table coverage.
- Risk, mistake-prevention, or caution section.
- Three or more FAQ entries.
- Related posts render Korean titles.
- Hero image exists.
- TOP3 and P1 representative posts keep inline images where useful.
- Mobile tables, images, and related cards do not overflow.

Recommended quality checks:

- Today / one week / one month rollout framing.
- Manual process to sheet, alert, AI draft, and human approval flow.
- Small-business, sales, contract, and receivables examples.
- Input values, output artifacts, and confirmation criteria.
- No unverifiable latest statistics or policy claims added.
- No abstract AI praise or excessive advertising language added.

## 7. 25-Post Grade Before And After

Before Phase 4.2A.2, from the previous content readiness pass:

| grade | count |
| --- | ---: |
| A | 11 |
| B | 14 |
| S-ready | 0 |

After Phase 4.2A.2:

| grade | count | evidence |
| --- | ---: | --- |
| S-ready | 25 | `audit:content-authority` passes all public Korean posts. |
| A/B remaining | 0 | No post has an unresolved related title, missing required authority section, or broken S-grade mobile UX guard. |

Post inventory covered:

- Automation: 7 posts
- Contracts and payments: 5 posts
- Sales operations: 7 posts
- Small business: 6 posts

## 8. Mobile And PC Smoke Results

Local visual smoke routes:

- `/`
- `/ko`
- `/ko/automation/ai-business-automation-guide`
- `/ko/sales-ops/accounts-receivable-tracker`
- `/ko/contracts-payments/electronic-contract-system-basics`
- `/ko/sales-ops/payment-reminder-message`
- `/ko/contracts-payments/manage-unsigned-contracts`
- `/ko/privacy`
- `/ko/terms`

Local visual smoke viewports:

| viewport | result |
| --- | --- |
| 320x640 | PASS |
| 375x812 | PASS |
| 390x844 | PASS |
| 768x1024 | PASS |
| 1440 desktop | PASS |

Observed counts:

| check | result |
| --- | ---: |
| Visual route/viewport checks | 45 |
| Failures | 0 |
| Related slug label exposure | 0 |
| Markdown slug-only related labels | 0 |
| Right-side clipping | 0 |
| One-letter Korean wrapping indicators | 0 |
| Article disabled-search placeholder exposure | 0 |
| Relevant console hydration errors | 0 |

HTTP smoke:

| route | status |
| --- | ---: |
| `/` | 200 |
| `/ko` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/rss.xml` | 200 |
| `/ko/privacy` | 200 |
| `/ko/terms` | 200 |
| `/admin` | 404 |
| `/login` | 404 |
| `/en` | 404 |
| `/ja` | 404 |
| `/ai` | 404 |
| `/chat` | 404 |
| `/ads.txt` | 404 |

## 9. Remaining Risks

- Browser screenshot capture through the in-app Browser timed out, although DOM,
  viewport, console, overflow, and route checks passed.
- Live smoke must be repeated after Vercel automatic redeploy is ready.
- Premium image generation remains a separate pending track.
- Pagefind search remains disabled until a later search/index phase.
- Google setup values are still absent and must not be guessed.

## 10. Google Setup Not Applied

- Search Console meta/file: NOT ADDED
- GA4 script: NOT ADDED
- AdSense script: NOT ADDED
- `public/ads.txt`: NOT ADDED
- DNS change: NOT APPLIED
- Vercel manual deploy: NOT RUN
