do $$
declare
  column_count integer;
  policy_count integer;
begin
  if to_regclass('public.commercial_submissions') is null then
    raise exception 'commercial_submissions missing';
  end if;
  select count(*) into column_count from information_schema.columns
    where table_schema = 'public' and table_name = 'commercial_submissions';
  if column_count <> 13 then raise exception 'unexpected column count: %', column_count; end if;
  if not exists (select 1 from pg_class where oid = 'public.commercial_submissions'::regclass and relrowsecurity) then
    raise exception 'RLS not enabled';
  end if;
  select count(*) into policy_count from pg_policies
    where schemaname = 'public' and tablename = 'commercial_submissions';
  if policy_count <> 0 then raise exception 'unexpected public policies'; end if;
  if has_table_privilege('anon', 'public.commercial_submissions', 'SELECT')
    or has_table_privilege('anon', 'public.commercial_submissions', 'UPDATE')
    or has_table_privilege('anon', 'public.commercial_submissions', 'DELETE')
    or has_table_privilege('authenticated', 'public.commercial_submissions', 'SELECT') then
    raise exception 'public or authenticated table privileges present';
  end if;
  if not has_table_privilege('service_role', 'public.commercial_submissions', 'SELECT,INSERT,DELETE') then
    raise exception 'service role privileges missing';
  end if;
  if not exists (select 1 from pg_indexes where schemaname = 'public'
    and tablename = 'commercial_submissions' and indexname = 'commercial_submissions_repeat_lookup_idx') then
    raise exception 'repeat lookup index missing';
  end if;
  if not exists (select 1 from pg_indexes where schemaname = 'public'
    and tablename = 'commercial_submissions' and indexname = 'commercial_submissions_atomic_dedupe_idx'
    and indexdef like 'CREATE UNIQUE INDEX%') then
    raise exception 'atomic dedupe unique index missing';
  end if;
  raise notice 'SCHEMA_RLS_GRANTS_INDEXES=PASS';
end $$;
