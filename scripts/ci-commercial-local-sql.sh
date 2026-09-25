#!/usr/bin/env bash
set -euo pipefail

sql_file="$1"
if command -v psql >/dev/null 2>&1; then
  psql -X -v ON_ERROR_STOP=1 "$LOCAL_DB_URL" -f "$sql_file"
  exit 0
fi

# A GitHub-hosted ephemeral runner starts exactly one Supabase Local DB.
mapfile -t db_containers < <(docker ps --format '{{.Names}}' --filter 'name=^supabase_db_')
if [[ ${#db_containers[@]} -ne 1 ]]; then
  echo 'Expected exactly one ephemeral Supabase database container' >&2
  exit 1
fi
docker exec -i "${db_containers[0]}" psql -X -U postgres -d postgres -v ON_ERROR_STOP=1 < "$sql_file"
