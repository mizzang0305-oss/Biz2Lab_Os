do $$
declare
  actual_columns text[];
  policy_count integer;
  check_count integer;
begin
  if to_regnamespace('biz2lab') is null then
    raise exception 'biz2lab schema missing';
  end if;
  if to_regclass('public.commercial_submissions') is not null then
    raise exception 'legacy public commercial_submissions must not exist';
  end if;
  if to_regclass('biz2lab.commercial_submissions') is null then
    raise exception 'biz2lab.commercial_submissions missing';
  end if;

  select array_agg(column_name::text order by ordinal_position) into actual_columns
    from information_schema.columns
    where table_schema = 'biz2lab' and table_name = 'commercial_submissions';
  if actual_columns is distinct from array[
    'id', 'kind', 'service', 'email', 'name', 'message', 'source', 'landing_url',
    'utm_source', 'utm_medium', 'utm_campaign', 'consented_at', 'created_at'
  ]::text[] then raise exception 'unexpected columns'; end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'biz2lab.commercial_submissions'::regclass
      and contype = 'p'
      and pg_get_constraintdef(oid) = 'PRIMARY KEY (id)'
  ) then raise exception 'identity primary key missing'; end if;

  if not exists (
    select 1 from pg_attribute
    where attrelid = 'biz2lab.commercial_submissions'::regclass
      and attname = 'id'
      and attidentity = 'd'
  ) then raise exception 'id identity default missing'; end if;

  if not exists (
    select 1 from pg_attrdef d
    join pg_attribute a on a.attrelid = d.adrelid and a.attnum = d.adnum
    where d.adrelid = 'biz2lab.commercial_submissions'::regclass
      and a.attname = 'created_at'
      and pg_get_expr(d.adbin, d.adrelid) = 'now()'
  ) then raise exception 'created_at now default missing'; end if;

  select count(*) into check_count
  from pg_constraint
  where conrelid = 'biz2lab.commercial_submissions'::regclass and contype = 'c';
  if check_count < 3 then raise exception 'kind/service/shape CHECK constraints missing'; end if;

  if not exists (
    select 1
    from pg_class
    where oid = 'biz2lab.commercial_submissions'::regclass
      and relrowsecurity
  ) then raise exception 'RLS not enabled'; end if;

  select count(*) into policy_count
  from pg_policies
  where schemaname = 'biz2lab' and tablename = 'commercial_submissions';
  if policy_count <> 0 then raise exception 'unexpected biz2lab table policies'; end if;

  if has_schema_privilege('anon', 'biz2lab', 'USAGE')
    or has_schema_privilege('authenticated', 'biz2lab', 'USAGE')
    or has_schema_privilege('service_role', 'biz2lab', 'USAGE') then
    raise exception 'direct client schema usage remains';
  end if;

  if has_table_privilege('anon', 'biz2lab.commercial_submissions', 'SELECT')
    or has_table_privilege('anon', 'biz2lab.commercial_submissions', 'INSERT')
    or has_table_privilege('anon', 'biz2lab.commercial_submissions', 'UPDATE')
    or has_table_privilege('anon', 'biz2lab.commercial_submissions', 'DELETE')
    or has_table_privilege('authenticated', 'biz2lab.commercial_submissions', 'SELECT')
    or has_table_privilege('authenticated', 'biz2lab.commercial_submissions', 'INSERT')
    or has_table_privilege('authenticated', 'biz2lab.commercial_submissions', 'UPDATE')
    or has_table_privilege('authenticated', 'biz2lab.commercial_submissions', 'DELETE')
    or has_table_privilege('service_role', 'biz2lab.commercial_submissions', 'SELECT')
    or has_table_privilege('service_role', 'biz2lab.commercial_submissions', 'INSERT')
    or has_table_privilege('service_role', 'biz2lab.commercial_submissions', 'UPDATE')
    or has_table_privilege('service_role', 'biz2lab.commercial_submissions', 'DELETE') then
    raise exception 'direct table privilege present';
  end if;

  if has_sequence_privilege('anon', 'biz2lab.commercial_submissions_id_seq', 'USAGE')
    or has_sequence_privilege('authenticated', 'biz2lab.commercial_submissions_id_seq', 'USAGE')
    or has_sequence_privilege('service_role', 'biz2lab.commercial_submissions_id_seq', 'USAGE') then
    raise exception 'direct sequence privilege present';
  end if;

  if not has_function_privilege(
      'service_role',
      'public.biz2lab_commercial_recent_submission_exists(text,text,text,timestamptz)',
      'EXECUTE'
    )
    or not has_function_privilege(
      'service_role',
      'public.biz2lab_commercial_insert_submission(text,text,text,text,text,text,text,text,text,text,timestamptz,timestamptz)',
      'EXECUTE'
    )
    or not has_function_privilege(
      'service_role',
      'public.biz2lab_commercial_rows_by_email(text)',
      'EXECUTE'
    )
    or not has_function_privilege(
      'service_role',
      'public.biz2lab_commercial_expired_ids(timestamptz)',
      'EXECUTE'
    )
    or not has_function_privilege(
      'service_role',
      'public.biz2lab_commercial_delete_submission(bigint)',
      'EXECUTE'
    ) then
    raise exception 'service-role RPC privilege missing';
  end if;

  if has_function_privilege(
      'anon',
      'public.biz2lab_commercial_rows_by_email(text)',
      'EXECUTE'
    )
    or has_function_privilege(
      'authenticated',
      'public.biz2lab_commercial_rows_by_email(text)',
      'EXECUTE'
    )
    or has_function_privilege(
      'anon',
      'public.biz2lab_commercial_insert_submission(text,text,text,text,text,text,text,text,text,text,timestamptz,timestamptz)',
      'EXECUTE'
    )
    or has_function_privilege(
      'authenticated',
      'public.biz2lab_commercial_insert_submission(text,text,text,text,text,text,text,text,text,text,timestamptz,timestamptz)',
      'EXECUTE'
    ) then
    raise exception 'client RPC execute privilege present';
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname = 'biz2lab'
      and tablename = 'commercial_submissions'
      and indexname = 'commercial_submissions_repeat_lookup_idx'
  ) then raise exception 'repeat lookup index missing'; end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname = 'biz2lab'
      and tablename = 'commercial_submissions'
      and indexname = 'commercial_submissions_atomic_dedupe_idx'
      and indexdef like 'CREATE UNIQUE INDEX%'
  ) then raise exception 'atomic dedupe unique index missing'; end if;

  raise notice 'BIZ2LAB_SCHEMA_RPC_RLS_GRANTS_INDEXES=PASS';
end $$;
