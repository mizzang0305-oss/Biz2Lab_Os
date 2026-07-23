# Security Audit Notes

Updated: 2026-07-24

## Dependency Audit

`npm audit` and `npm audit --omit=dev` report zero known vulnerabilities after
the 2026-07-24 dependency remediation.

The lockfile now resolves patched releases for:

- Next.js private PostCSS: `8.5.22` (`GHSA-qx2v-qp2m-jg93`,
  `GHSA-6g55-p6wh-862q`)
- Next.js private Sharp: `0.35.3` (`GHSA-f88m-g3jw-g9cj`)
- Gray Matter's JS-YAML: `3.15.0` (`GHSA-h67p-54hq-rp68`,
  `GHSA-52cp-r559-cp3m`)
- ESLint's JS-YAML: `4.3.0` (`GHSA-52cp-r559-cp3m`)
- Brace Expansion: `1.1.16` and `5.0.8` (`GHSA-3jxr-9vmj-r5cp`)

Next.js `16.2.11` is still the current stable npm release but pins older
private PostCSS and Sharp versions. A scoped `overrides.next` entry replaces
only those two private packages. The regression test in
`tests/dependency-security.test.ts` prevents the patched minimums from
silently regressing.

The pre-remediation `npm audit fix --force` suggestion was not used because it
proposed a breaking Next.js downgrade instead of preserving the current App
Router release.

Current scope note:

- The MVP does not add user-authored CSS input or custom CSS serialization.
- Image optimization continues to accept only repository-controlled assets;
  the Sharp override is nevertheless kept patched because image processing is
  part of the build and editorial automation pipeline.
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

