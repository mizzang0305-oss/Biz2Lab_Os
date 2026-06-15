# Premium Visual Guidelines

Date: 2026-06-16
Status: internal Biz2Lab image production guidance

## Purpose

Biz2Lab article images should feel like premium Korean B2B SaaS/editorial visuals, not repeated placeholder diagrams. This document guides prompt packages, manual image generation, and review before any production image replacement.

## Premium Standard

- Match the article's specific business problem, not a generic workflow.
- Use the category's visual identity: automation, sales operations, small business operations, or contracts/payments.
- Prefer structured editorial compositions with a clear focal point, useful business context, and restrained color.
- Keep in-image text minimal and large enough to read on mobile.
- Use Korean `altKo` and `captionKo` to carry explanatory detail instead of cramming text into the image.
- Avoid repeating the same three-box flow, bar chart, card grid, or "Article workflow" label.

## Category Direction

- `automation`: abstract AI workflow, document/data/process orchestration, priority routing, calm SaaS editorial feel.
- `sales-ops`: sales dashboard, receivables, target tracking, report flow, clear metric panels.
- `small-business`: order/reservation/customer/review operations, owner workflow, friendly but professional store operations.
- `contracts-payments`: contract status, verification, signature request, payment confirmation, secure process modules.

## Safety Boundaries

- No real logos, product photos, Amazon/ecommerce imagery, affiliate/review/shop surfaces, or copyrighted characters.
- No people/faces unless a later task explicitly approves them.
- No private customer, payment, contract, account, or company data.
- No fake screenshots that appear to contain real private information.
- No external image URLs, scraping, hotlinks, public image generation route, upload UI, admin, auth, commerce, or multilingual expansion.

## Fallback Policy

`local-diagram-fallback` is allowed only when explicitly requested. It may create a safe local SVG fallback, but it is not the premium final visual and should not be used as proof that visual quality is approved.

## Review Checklist

- The image concept is article-specific.
- The composition differs from nearby article images.
- The category style is visible without relying on tiny text.
- The prompt includes a negative prompt and differentiation hint.
- The planned raw path is under `assets/images/raw`.
- The planned optimized path is under `public/images/posts`.
- `npm run audit:image-briefs` and `npm run validate:images` remain clean before article application.
