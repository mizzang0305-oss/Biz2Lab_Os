-- Temporary grants inside transactions isolate RLS from ordinary GRANT denial.
-- Every grant and attempted write is rolled back on this disposable database.
begin;
grant select, update, delete on public.commercial_submissions to anon;
set local role anon;
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_read_zero
  from public.commercial_submissions;
with changed as (update public.commercial_submissions set source = 'anonymous-test' returning id)
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_update_zero from changed;
with removed as (delete from public.commercial_submissions returning id)
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_delete_zero from removed;
rollback;

begin;
grant select on public.commercial_submissions to authenticated;
set local role authenticated;
select 1 / case when count(*) = 0 then 1 else 0 end as authenticated_rls_read_zero
  from public.commercial_submissions;
rollback;
