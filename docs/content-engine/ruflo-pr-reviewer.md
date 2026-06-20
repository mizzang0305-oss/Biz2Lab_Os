# Ruflo PR Reviewer Dry-run

Date: 2026-06-21
Status: first safe PoC implementation
Scope: local report-only review harness

## Purpose

The Ruflo PR Reviewer dry-run harness creates a deterministic Biz2Lab review report for a GitHub PR. It implements the first safe Ruflo PoC from `reports/RUFLO_BIZ2LAB_OS_POC_PLAN.md` without installing Ruflo and without giving Ruflo write access.

The default path is repo-local TypeScript logic. Ruflo is optional and is not required for the command or tests to pass.

## Command

```powershell
npm run ruflo:review-pr -- --pr 15 --dry-run
```

Default output:

```text
reports/ruflo-pr-review/pr-15.md
```

Run the heavy validation checklist only when explicitly requested:

```powershell
npm run ruflo:review-pr -- --pr 15 --dry-run --run-validation
```

## Ruflo Hook

By default, the report records:

```text
RUFLO_NOT_CONFIGURED
```

If a local Ruflo binary is reviewed and approved later, set `RUFLO_BIN` and opt in explicitly:

```powershell
$env:RUFLO_BIN="C:\path\to\ruflo.exe"
npm run ruflo:review-pr -- --pr 15 --dry-run --use-ruflo
```

The hook is invoked only in report-only mode with `--dry-run --report-only`. This PR does not install Ruflo, add Ruflo packages, add background workers, or add CI automation.

## Checks

The report includes:

- PR metadata
- changed files
- content scope
- SEO metadata checks
- hero/raw/public image checks
- alt text checks
- internal link checks
- content authority section checks
- validation command checklist
- production smoke checklist
- license/source caution
- forbidden public wording
- admin/private route exposure risk
- final decision

Possible final decisions:

- `PASS_REVIEW`
- `NEEDS_OWNER_REVIEW`
- `BLOCKED_SCOPE_DRIFT`
- `BLOCKED_SECURITY_RISK`
- `BLOCKED_VALIDATION_GAP`

## Safety

The harness must remain report-only:

- no Ruflo install
- no content edits
- no writes to the reviewed PR
- no commit, push, merge, or deploy
- no scheduler config changes
- no admin env flag changes
- no production env changes
- no DB, payment, message, notification, or external business API calls
- no reads or writes to protected untracked Codex-local files

Protected local paths:

```text
.codex-remote-attachments/
.codex/config.toml
```

## Validation Commands

Static review lists the full Biz2Lab gate without running it:

```powershell
npm run validate:posts
npm run validate:images
npm test
npm run lint
npm run typecheck
npm run build
npm run check:links
npm run validate:seo
npm run audit:image-briefs
npm run audit:image-prompts
npm run audit:content-authority
npm run image-skill:plan
npm run image-skill:validate
git diff --check
```

Use `--run-validation` only when the owner explicitly wants the full local validation bundle for a reviewed PR.
