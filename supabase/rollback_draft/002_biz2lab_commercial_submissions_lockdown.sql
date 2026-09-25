-- Draft rollback for an explicitly approved Production change only.
-- Preserve every stored row. This stops new service-role inserts while retaining
-- restricted read/delete capability for an approved operator cleanup process.
-- Run only after the application write path has been disabled and the exact
-- target table/sequence identity has been verified. Do not run in this phase.
begin;

alter table public.commercial_submissions enable row level security;
revoke all on public.commercial_submissions from public, anon, authenticated, service_role;
revoke all on sequence public.commercial_submissions_id_seq from public, anon, authenticated, service_role;
grant select, delete on public.commercial_submissions to service_role;

commit;

-- This is a write-lockdown rollback, not an automatic DROP TABLE.
-- Schema removal needs a later, separately approved data-retention decision.
