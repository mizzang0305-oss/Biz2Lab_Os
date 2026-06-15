# Settings Model

Date: 2026-06-15
Status: static model implemented, DB model deferred

## Current Static Schema

Current source:

- `lib/site-settings.ts`

The static settings model contains:

- `siteName`
- `koreanName`
- `brandSubtitle`
- `description`
- `author`
- `contactEmail`
- `hero.title`
- `hero.description`
- `hero.bullets`
- `hero.primaryCta`
- `hero.secondaryCta`
- `navItems`
- `footer.sections`
- `messages.disabledSearch`
- `messages.searchIndexPending`
- `messages.contactUnavailable`
- `messages.templateCta`
- `featureFlags`

Current feature flag defaults:

- `searchEnabled: false`
- `newsletterEnabled: false`
- `downloadsEnabled: false`
- `adminEnabled: false`
- `commerceEnabled: false`
- `aiEnabled: false`
- `multilingualEnabled: false`

## Current Safety Behavior

- Build does not require a database.
- No settings API endpoint exists.
- No public admin route exists.
- No login route exists.
- Public UI reads only static settings.
- Disabled search remains visibly disabled.
- Downloads remain disabled and informational.
- AI, commerce, multilingual, newsletter, and admin features remain absent from public navigation.

## Future DB-Backed Schema

Future settings can be split into these models:

### Site Settings

Stores small public copy blocks and metadata.

- `key`
- `value_json`
- `version`
- `updated_by`
- `updated_at`

### Feature Flags

Controls whether future surfaces can render.

- `flag_key`
- `enabled`
- `environment`
- `updated_by`
- `updated_at`

### Navigation Items

Controls public and protected navigation separately.

- `label`
- `href`
- `group`
- `sort_order`
- `enabled`
- `visibility`

### CTA Settings

Controls labels and destinations for known CTA surfaces.

- `surface`
- `label`
- `href`
- `description`
- `enabled`

### Audit Log

Records every settings write.

- `actor_id`
- `action`
- `target_table`
- `target_id`
- `before_json`
- `after_json`
- `created_at`

## Migration Path

1. Static config.
2. Protected local-only admin mock.
3. Protected authenticated admin.
4. DB-backed settings reads.
5. DB-backed settings writes with audit log.

## Validation Rules

- Hrefs must start with `/`.
- Public hrefs must stay inside approved Korean routes until policy changes.
- `adminEnabled` must remain `false` before AdSense approval.
- `multilingualEnabled` must remain `false` before `/en` or `/ja` approval.
- `commerceEnabled` must remain `false` before product, review, Amazon, affiliate, or commerce approval.
- `aiEnabled` must remain `false` before public AI/chat approval.
- `downloadsEnabled` must remain `false` until real files exist under `public/`.
- `searchEnabled` must remain `false` until Pagefind is built and served.

## Rollback

Static rollback:

- Revert `lib/site-settings.ts`.
- Revert components that read from the settings object.
- Rerun local validation.

DB-backed rollback, future only:

- Disable feature flags first.
- Restore previous settings version from audit log.
- Revalidate public route safety.
- Apply DB rollback only after explicit approval.
