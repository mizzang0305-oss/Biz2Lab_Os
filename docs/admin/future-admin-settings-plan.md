# Future Admin Settings Plan

Date: 2026-06-15
Status: planning only
Scope: future protected settings control after AdSense approval

## Current Rule

Biz2Lab must not expose a public admin page before AdSense approval.

Do not add:

- `/admin`
- `/login`
- public settings APIs
- public auth flows
- public AI, commerce, affiliate, product, review, Amazon, or multilingual controls

The current approved approach is a static typed settings layer in `lib/site-settings.ts`.
The public site may read settings from that file at build time, but users cannot edit settings from the browser.

## Why Public Admin Is Forbidden Now

- The Phase 1 to Phase 3 public surface is intentionally minimal for AdSense review.
- A public admin route creates an unnecessary review and security surface.
- A login page can imply account, user data, or private functionality before those policies are ready.
- Any settings write path would require authentication, authorization, audit logging, rollback, and production DB approval.

## Recommended Route After Approval

Preferred route:

- `/internal/admin`

Acceptable only if fully protected:

- `/admin`

Do not expose either route until authentication, authorization, robots controls, and rollback are ready.

## Required Protections

- Authentication required before rendering any admin UI.
- Role-based access required for settings writes.
- Server-side authorization must be checked inside route handlers or server functions.
- Middleware or proxy may be used as defense-in-depth, not as the only authorization layer.
- Add `noindex` metadata and headers.
- Add `robots.txt` disallow rules for admin paths.
- Do not expose service role keys to the browser.
- Do not write production DB settings without explicit user approval.
- Do not store secrets in settings rows.

## Future Tables Draft

### `site_settings`

- `id`
- `key`
- `value_json`
- `updated_at`
- `updated_by`
- `version`

### `feature_flags`

- `id`
- `flag_key`
- `enabled`
- `environment`
- `updated_at`
- `updated_by`

### `navigation_items`

- `id`
- `label`
- `href`
- `group`
- `sort_order`
- `enabled`

### `cta_settings`

- `id`
- `surface`
- `label`
- `href`
- `description`
- `enabled`

### `content_workflow_status`

- `id`
- `content_slug`
- `status`
- `reviewed_by`
- `reviewed_at`
- `notes`

## Implementation Phases

1. Static typed config in `lib/site-settings.ts`.
2. Local-only protected admin mock after AdSense approval.
3. Authenticated protected admin route.
4. DB-backed settings read model.
5. DB-backed settings write model with audit log.

## Approval Gates

- Separate approval for creating an admin route.
- Separate approval for adding auth.
- Separate approval for DB migrations.
- Separate approval for production DB writes.
- Separate approval for deploy.

## Rollback Plan

- Remove the admin route folder.
- Disable all admin-related feature flags.
- Revert settings UI changes.
- Revert DB migrations before production apply, or apply a reviewed down migration if already approved and executed.
- Confirm `/admin`, `/login`, and `/internal/admin` return `404` or authenticated denial.
- Rerun:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:seo
npm run audit:interactions
npm run build
```
