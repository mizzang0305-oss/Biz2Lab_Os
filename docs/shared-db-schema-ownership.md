# Shared Supabase ownership contract — Biz2Lab / MyBiz

Updated: 2026-09-27

## Shared physical database

Both products use the same Supabase project:

- project: `Mybiz Project`
- ref: `plnuyudyogbzwpmdulnw`
- region: `ap-northeast-2`

Sharing the physical project does **not** mean sharing application schemas or migration ownership.

## Ownership boundary

### MyBiz room owns

- existing `public` application tables and policies
- `core` identity objects
- `private` identity/service objects
- MyBiz RLS/security migrations
- shared physical-database backup/recovery operation
- MyBiz Production deployment and smoke

Biz2Lab must not modify these objects as part of Commercial release work.

### Biz2Lab room owns

- schema `biz2lab`
- `biz2lab.commercial_submissions`
- future tables whose fully-qualified names begin with `biz2lab.`
- prefixed public server RPC entrypoints named `biz2lab_commercial_*`
- Biz2Lab migration/rollback files
- Biz2Lab Vercel deployment, capture gate, and Commercial smoke

## Data API boundary

The shared project's exposed-schema configuration is a project-wide setting and is not owned by Biz2Lab.

Biz2Lab therefore does **not** add the `biz2lab` schema to the Data API exposed-schema list.

The `biz2lab` schema and its tables have no direct anon/authenticated/service-role schema/table privileges. The Next.js server uses only narrowly named `public.biz2lab_commercial_*` SECURITY DEFINER RPCs whose EXECUTE privilege is revoked from PUBLIC, anon, and authenticated and granted only to service_role.

This preserves schema isolation without changing MyBiz's Data API configuration.

## Cross-project rules

Biz2Lab must not:

- alter MyBiz tables, columns, grants, RLS, policies, or functions
- reuse unprefixed public RPC names
- change `core` or `private`
- change Auth configuration
- change the shared exposed-schema list
- create a second independent Production database backup process

MyBiz must not use the `biz2lab` schema for application data.

## Shared operational dependency

The physical DB backup/recovery gate is performed once in the MyBiz/DB operations room and may be reused by Biz2Lab because the database is shared.

Biz2Lab consumes only the result:

```
SHARED_DB_BACKUP_VERIFIED=true
RECOVERY_PATH_VERIFIED=true
```

and does not create another copy of the same Production backup.

## Release implication

The MyBiz 15-table RLS remediation and Biz2Lab Commercial schema migration are separate change domains.

Once the Biz2Lab isolated-schema candidate passes its own disposable Supabase/RPC/E2E gates, existing MyBiz RLS work is tracked as an external shared-project security issue rather than a migration dependency for `biz2lab` objects.

Biz2Lab Production still requires:

1. exact shared-project identity match;
2. shared backup/recovery result from the DB operations room;
3. exact Biz2Lab migration SHA;
4. exact Biz2Lab code SHA;
5. isolated schema/RPC post-apply assertions;
6. capture-OFF deploy, then synthetic capture/readback/delete smoke.
