import { appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const raw = execFileSync('supabase', ['status', '-o', 'env'], { encoding: 'utf8' });
const values = Object.fromEntries(raw.split(/\r?\n/).map((line) => {
  const match = line.match(/^([A-Z_]+)=(.*)$/);
  if (!match) return [];
  const value = match[2].trim().replace(/^['"]|['"]$/g, '');
  return [match[1], value];
}).filter((entry) => entry.length === 2));

const required = {
  API_URL: 'SUPABASE_URL',
  ANON_KEY: 'LOCAL_ANON_KEY',
  SERVICE_ROLE_KEY: 'SUPABASE_SERVICE_ROLE_KEY',
  DB_URL: 'LOCAL_DB_URL',
};
for (const [source, target] of Object.entries(required)) {
  const value = values[source];
  if (!value || value.includes('\n')) throw new Error(`Missing or invalid local ${source}`);
  process.stdout.write(`::add-mask::${value}\n`);
  appendFileSync(process.env.GITHUB_ENV, `${target}=${value}\n`);
}
appendFileSync(process.env.GITHUB_ENV, 'BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED=true\n');
process.stdout.write('LOCAL_DB_AND_API_CREDENTIALS_PRESENT=true; remote project link not used\n');
