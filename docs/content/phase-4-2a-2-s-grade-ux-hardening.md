# Phase 4.2A.2 S-Grade UX Hardening

Date: 2026-06-17
Status: IMPLEMENTED_LOCAL_READY
Scope: content readability, related-post labels, responsive article tables, article layout, and pre-Google setup guardrails.

This phase does not apply Search Console, GA4, AdSense, ads.txt, DNS, or Vercel
settings. Google setup values remain pending.

## 1. Problems Found

- Related reading links appeared inside Markdown body sections with slug labels such as `payment-reminder-message`.
- Markdown tables relied on horizontal overflow, which could clip on mobile and make Korean text wrap poorly.
- The global article header exposed a disabled search input and the phrase `검색은 승인 후 활성화 예정입니다.` on article pages.
- Article pages had several visually strong boxes in sequence, making the detail page feel heavier than necessary.
- The 25 public Korean posts needed a single S-grade readiness pass before Google setup.

## 2. Files Changed

- `app/globals.css` - removed overflow-only Markdown table styling and added responsive table styles.
- `app/ko/[category]/[slug]/page.tsx` - simplified article width, heading scale, spacing, and section order.
- `components/article/ResponsiveTable.tsx` - added mobile row-card and desktop table rendering.
- `components/article/MarkdownRenderer.tsx` - routes Markdown tables through `ResponsiveTable`.
- `components/article/RelatedReadingBox.tsx` - keeps one related-reading section and uses a 1/2/3 column card grid.
- `components/cards/ArticleCard.tsx` - shows category, Korean title, description, and reading time.
- `components/layout/SiteHeader.tsx` - removed global disabled search box from article/header surface.
- `components/article/SummaryBox.tsx`, `ChecklistBox.tsx`, `FAQBox.tsx` - reduced visual weight.
- `content/ko/**/*.md` - removed duplicate Markdown `## 관련 글` sections while preserving frontmatter `relatedPosts`.
- `scripts/audit-content-authority.ts` - fails slug-only link labels and unresolved Korean related titles.
- `scripts/audit-public-interactions.ts` - checks responsive tables, article search exposure, forbidden routes, and no Google setup code.
- `tests/biz2lab-policy.test.ts` - added regression coverage for related labels, responsive tables, and search exposure.

## 3. Related Post Slug To Title Handling

- Source of truth remains frontmatter `relatedPosts`.
- URLs continue to use existing English slugs.
- `getRelatedPosts(post)` resolves each slug to a `Post` object.
- Public card UI renders `categoryName`, `frontmatter.title`, `frontmatter.description`, and `readingTime`.
- Markdown body no longer renders a second related-reading section.
- Audit fails if a slug-only Markdown link label is visible in article content.

## 4. Mobile Table Handling

- Markdown tables are rendered by `ResponsiveTable`.
- Desktop and tablet `md` and above keep a regular table.
- Mobile renders each table row as a card.
- Each mobile row card renders cells as `header: value` pairs.
- Korean wrapping uses keep-all behavior and does not use `word-break: break-all`.
- Browser smoke confirmed mobile card mode on 320, 375, and 390 width for table-heavy article pages.

## 5. Search UI Handling

- `SiteHeader` no longer renders `SearchBox`.
- Article pages do not show the disabled search input.
- The disabled search component remains available for a future Pagefind phase but is not globally exposed.
- Public article pages no longer show `검색은 승인 후 활성화 예정입니다.`.

## 6. S-Grade Content Criteria

Required checks used in this phase:

- Clear Korean title.
- Clear opening problem and target reader.
- At least one realistic field scenario.
- At least five execution steps or checklist/table coverage.
- Risk and mistake-prevention section.
- At least three FAQ items.
- Related reading resolves to Korean titles.
- Hero image exists and is local.
- TOP3 and P1 representative posts retain inline images.
- Mobile tables, images, and related cards do not clip.

Recommended S-grade patterns checked qualitatively:

- Today / one week / one month rollout structure.
- Manual management to sheet, alert, AI draft, and human approval flow.
- Small-business, sales, contract, and accounts-receivable examples.
- Input values, output artifacts, and confirmation criteria.
- No unverifiable latest statistics or policy claims added.
- No abstract AI praise or excessive promotional wording added.

## 7. 25-Post Grade Before And After

Before, from Phase 4.1:

| grade | count |
| --- | ---: |
| A | 11 |
| B | 14 |
| S-ready | 0 |

After Phase 4.2A.2:

| grade | count | reason |
| --- | ---: | --- |
| S-ready | 25 | All public posts pass content authority audit plus related-label and responsive-table UX guards. |
| A/B remaining | 0 | No post is blocked by required S-grade readiness criteria. |

Audit evidence:

- `audit:content-authority PASS (25 posts)`
- All 25 posts have 9 required content headings after duplicate related sections were removed.
- FAQ coverage: TOP3 5 each, P1 4 each, other posts 3 each.
- Inline image coverage remains TOP3 3 each and P1 1 each.

## 8. Mobile And PC Smoke Results

Browser visual smoke:

- Routes checked: `/`, `/ko`, TOP3 articles, related-issue articles, table-heavy articles, `/ko/privacy`, `/ko/terms`.
- Viewports checked: 320x640, 375x812, 390x844, 768x1024, 1440 desktop.
- Result: 45 visual route/viewport checks, 0 failures.
- Related slug label exposure: 0.
- Markdown slug-only link labels: 0.
- Right-side clipping: 0.
- `word-break: break-all`: 0.
- Article search placeholder exposure: 0.
- Relevant console warning/error count: 0.

HTTP route smoke:

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

Browser screenshot capture note:

- In-app Browser DOM, console, viewport, and layout smoke completed.
- Browser screenshot capture timed out twice through the Browser runtime, so screenshots were not attached.

## 9. Remaining Risks

- Premium real image generation remains pending and should stay separate from deterministic fallback output.
- Google setup values are still missing and not applied.
- Browser visual smoke was local preview only before push; live smoke must run after automatic Vercel redeploy is ready.
- Pagefind search remains disabled until a separate search/index phase.

## 10. Google Setup Confirmation

Not applied in this phase:

- Search Console meta/file: NOT ADDED
- GA4 script: NOT ADDED
- AdSense script: NOT ADDED
- `public/ads.txt`: NOT ADDED
- DNS change: NOT APPLIED
- Vercel manual deploy: NOT RUN
