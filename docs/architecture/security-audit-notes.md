# Security Audit Notes

Date: 2026-06-15

## Dependency Audit

`npm audit --omit=dev` currently reports two moderate advisories through the
Next.js bundled PostCSS dependency range. The advisory is
`GHSA-qx2v-qp2m-jg93`, covering PostCSS CSS stringification of unescaped
`</style>` sequences.

`npm audit fix --force` was not applied. The force fix proposes a breaking
downgrade to an old Next.js major version, which is outside the MVP scope and
would risk destabilizing the App Router build.

Deferred remediation:

- Track the upstream Next.js/PostCSS dependency update.
- Upgrade through a current supported Next.js release, not a force downgrade.
- Re-run `npm audit --omit=dev`, `npm run lint`, `npm run typecheck`,
  `npm test`, and `npm run build` after the dependency update.

Current scope note:

- The MVP does not add user-authored CSS input or custom CSS serialization.
- Search excerpts are rendered as plain text.
- JSON-LD scripts are generated from local structured data and escaped with the
  existing `jsonLd()` helper.

## Supabase Readiness

Supabase integration remains server-only and optional for this MVP. Public
forms degrade gracefully when `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is
missing, and no service-role key is exposed to client code.

The draft SQL under `supabase/migrations_draft/` has not been applied. Before
any future apply step, confirm the target Supabase project, enable and review
RLS policies, and re-check Supabase platform behavior. Supabase announced on
2026-04-28 that new public schema tables are no longer automatically exposed to
the Data API, but RLS and server-side key handling remain required controls.

