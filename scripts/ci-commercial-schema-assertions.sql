do $$
declare
  actual_columns text[];
  policy_count integer;
  check_count integer;
begin
  if to_regclass('public.commercial_submissions') is null then
    raise exception 'commercial_submissions missing';
  end if;
  select array_agg(column_name::text order by ordinal_position) into actual_columns
    from information_schema.columns
    where table_schema = 'public' and table_name = 'commercial_submissions';
  if actual_columns is distinct from array[
    'id', 'kind', 'service', 'email', 'name', 'message', 'source', 'landing_url',
    'utm_source', 'utm_medium', 'utm_campaign', 'consented_at', 'created_at'
  ]::text[] then raise exception 'unexpected columns'; end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.commercial_submissions'::regclass
    and contype = 'p' and pg_get_constraintdef(oid) = 'PRIMARY KEY (id)') then
    raise exception 'identity primary key missing';
  end if;
  if not exists (select 1 from pg_attribute where attrelid = 'public.commercial_submissions'::regclass
    and attname = 'id' and attidentity = 'd') then
    raise exception 'id identity default missing';
  end if;
  if not exists (select 1 from pg_attrdef d
    join pg_attribute a on a.attrelid = d.adrelid and a.attnum = d.adnum
    where d.adrelid = 'public.commercial_submissions'::regclass
      and a.attname = 'created_at' and pg_get_expr(d.adbin, d.adrelid) = 'now()') then
    raise exception 'created_at now default missing';
  end if;
  select count(*) into check_count from pg_constraint
    where conrelid = 'public.commercial_submissions'::regclass and contype = 'c';
  if check_count < 3 then raise exception 'kind/service/shape CHECK constraints missing'; end if;
  if not exists (select 1 from pg_class where oid = 'public.commercial_submissions'::regclass and relrowsecurity) then
    raise exception 'RLS not enabled';
  end if;
  select count(*) into policy_count from pg_policies
    where schemaname = 'public' and tablename = 'commercial_submissions';
  if policy_count <> 0 then raise exception 'unexpected public policies'; end if;
  if has_table_privilege('anon', 'public.commercial_submissions', 'SELECT')
    or has_table_privilege('anon', 'public.commercial_submissions', 'INSERT')
    or has_table_privilege('anon', 'public.commercial_submissions', 'UPDATE')
    or has_table_privilege('anon', 'public.commercial_submissions', 'DELETE')
    or has_table_privilege('authenticated', 'public.commercial_submissions', 'SELECT')
    or has_table_privilege('authenticated', 'public.commercial_submissions', 'INSERT')
    or has_table_privilege('authenticated', 'public.commercial_submissions', 'UPDATE')
    or has_table_privilege('authenticated', 'public.commercial_submissions', 'DELETE') then
    raise exception 'public or authenticated table privileges present';
  end if;
  if not has_table_privilege('service_role', 'public.commercial_submissions', 'SELECT')
    or not has_table_privilege('service_role', 'public.commercial_submissions', 'INSERT')
    or not has_table_privilege('service_role', 'public.commercial_submissions', 'DELETE')
    or has_table_privilege('service_role', 'public.commercial_submissions', 'UPDATE') then
    raise exception 'service role privileges missing';
  end if;
  if has_sequence_privilege('anon', 'public.commercial_submissions_id_seq', 'USAGE')
    or has_sequence_privilege('authenticated', 'public.commercial_submissions_id_seq', 'USAGE')
    or not has_sequence_privilege('service_role', 'public.commercial_submissions_id_seq', 'USAGE') then
    raise exception 'identity sequence privileges incorrect';
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
