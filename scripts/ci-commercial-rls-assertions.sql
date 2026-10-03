-- Temporary grants inside transactions isolate RLS from ordinary privilege denial.
-- Every grant and attempted write is rolled back on this disposable database.
begin;
grant usage on schema biz2lab to anon;
grant select, update, delete on biz2lab.commercial_submissions to anon;
set local role anon;
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_read_zero
  from biz2lab.commercial_submissions;
with changed as (
  update biz2lab.commercial_submissions
  set source = 'anonymous-test'
  returning id
)
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_update_zero from changed;
with removed as (
  delete from biz2lab.commercial_submissions
  returning id
)
select 1 / case when count(*) = 0 then 1 else 0 end as anon_rls_delete_zero from removed;
rollback;

begin;
grant usage on schema biz2lab to authenticated;
grant select on biz2lab.commercial_submissions to authenticated;
set local role authenticated;
select 1 / case when count(*) = 0 then 1 else 0 end as authenticated_rls_read_zero
  from biz2lab.commercial_submissions;
rollback;
