# Article Frontmatter Rules

Required fields are enforced by `lib/schema.ts`.

Important rules:

- `locale` must be `ko`.
- `status` must be `published` for public lists.
- `draft: true` posts must not appear publicly.
- `noindex: true` posts must not appear in sitemap.
- `heroImage` must be local.
- `heroAlt` is required.
- `relatedPosts` is required.
- Public posts need at least two internal links or related references.

