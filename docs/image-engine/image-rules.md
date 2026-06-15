# Image Rules

MVP image policy:

- No external hotlinked hero images.
- Use local files under `public/images/posts`.
- Keep raw sources under `assets/images/raw`.
- Generate WebP derivatives with `npm run optimize-images`.
- Every post must define `heroImage` and `heroAlt`.
- Use `next/image` for rendering.

Future compatibility:

- Codex image generation can create raw assets, then the optimizer creates WebP sizes.
- CommerceAuto can later share `image_assets`, but no public CommerceAuto route or product card exists before AdSense approval.
- Do not scrape Amazon or product images.

