-- Draft rollback for an explicitly approved Production change only.
-- Preserve every stored Biz2Lab row. Capture is stopped by revoking only the
-- service-role insert RPC. Read/retention/delete RPCs stay available for an
-- approved operator cleanup process. The shared MyBiz schemas are untouched.
begin;

do $$
begin
  if to_regclass('biz2lab.commercial_submissions') is null then
    raise exception 'Biz2Lab commercial table missing';
  end if;
  if to_regprocedure(
    'public.biz2lab_commercial_insert_submission(text,text,text,text,text,text,text,text,text,text,timestamptz,timestamptz)'
  ) is null then
    raise exception 'Biz2Lab insert RPC missing';
  end if;
end;
$$;

alter table biz2lab.commercial_submissions enable row level security;

revoke execute on function public.biz2lab_commercial_insert_submission(
  text,text,text,text,text,text,text,text,text,text,timestamptz,timestamptz
) from service_role;

-- Direct schema/table access remains closed to every Data API role.
revoke all on schema biz2lab from public, anon, authenticated, service_role;
revoke all on table biz2lab.commercial_submissions from public, anon, authenticated, service_role;
revoke all on sequence biz2lab.commercial_submissions_id_seq from public, anon, authenticated, service_role;

commit;

-- This is a write-lockdown rollback, not an automatic DROP TABLE.
-- Schema removal needs a later, separately approved data-retention decision.
