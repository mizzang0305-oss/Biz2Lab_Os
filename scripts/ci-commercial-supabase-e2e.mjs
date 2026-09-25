import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// Next start constructs the route Request URL from its localhost host binding.
// Use that same origin for the browser, API calls, and origin validation.
const base = 'http://localhost:3100';
const table = 'commercial_submissions';
const runId = Date.now().toString(36);
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const rowIds = new Set();
const fakeSecrets = [
  '-----BEGIN PRIVATE KEY-----',
  'Authorization: Bearer abcdefghijklmnopqrstuvwxyz1234',
  'DATABASE_URL=postgresql://fake:fake@invalid.example/db',
  'SUPABASE_SERVICE_ROLE_KEY=synthetic-only-value',
  'OPENAI_API_KEY=synthetic-only-value',
  'AWS_SECRET_ACCESS_KEY=synthetic-only-value',
  'sk-proj-ABCDEFGHIJKLMNOPQRSTUVWX',
  'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
  'github_pat_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
  'AKIAABCDEFGHIJKLMNOP',
  'abcdefghijklmnop.qrstuvwxyz123456.abcdefghijklmnopqrstuvwxyz',
];
const report = (name, value) => {
  const line = `${name}=${value}`;
  console.log(line);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`);
};
const cleanEmail = (label) => `commercial-ci-${label}-${runId}@example.invalid`;
const payload = (email, overrides = {}) => ({
  kind: 'inquiry', service: 'mybiz', name: 'Persistence QA', email,
  message: 'Synthetic CI inquiry with no customer information.',
  consent: true, website: '', opened_at: Date.now() - 5000,
  source: 'synthetic', landing_url: '/mybiz', utm_source: 'synthetic',
  utm_medium: 'ci', utm_campaign: 'commercial_front_level2', ...overrides,
});
async function api(body, origin = base) {
  const response = await fetch(`${base}/api/commercial`, {
    method: 'POST', headers: { origin, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  assert(!responseText.includes(process.env.SUPABASE_SERVICE_ROLE_KEY), 'API exposed service credential');
  return { status: response.status, body: responseText };
}
async function rows(email) {
  const result = await db.from(table).select('*').eq('email', email).order('id');
  assert.ifError(result.error);
  for (const row of result.data) rowIds.add(row.id);
  return result.data;
}
async function waitApp() {
  for (let i = 0; i < 40; i++) {
    try {
      const response = await fetch(`${base}/mybiz`);
      if (response.status === 200) return;
    } catch { /* Wait for Next start. */ }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error('Local app did not reach HTTP 200');
}
function clientBundleExposure() {
  const stack = [join(process.cwd(), '.next', 'static')];
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const dbPassword = new URL(process.env.LOCAL_DB_URL).password;
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(path);
      else if (entry.isFile()) {
        const content = readFileSync(path, 'utf8');
        assert(!content.includes(secret), 'Client bundle exposed service credential');
        if (dbPassword) assert(!content.includes(dbPassword), 'Client bundle exposed DB password');
      }
    }
  }
  report('SERVICE_ROLE_CLIENT_EXPOSURE', 'NONE');
}
async function dataApiSecurity(id) {
  const headers = { apikey: process.env.LOCAL_ANON_KEY,
    authorization: `Bearer ${process.env.LOCAL_ANON_KEY}` };
  const endpoint = `${process.env.SUPABASE_URL}/rest/v1/${table}`;
  const get = await fetch(`${endpoint}?select=*`, { headers });
  const getText = await get.text();
  assert(!getText.includes('commercial-ci-inquiry-'), 'Anonymous Data API leaked inquiry');
  if (get.ok) assert.deepEqual(JSON.parse(getText), [], 'Anonymous SELECT must return zero rows');
  const patch = await fetch(`${endpoint}?id=eq.${id}`, {
    method: 'PATCH', headers: { ...headers, 'content-type': 'application/json', prefer: 'return=representation' },
    body: JSON.stringify({ name: 'Forbidden anonymous update' }),
  });
  const patchText = await patch.text();
  assert(!patch.ok || patchText === '[]', 'Anonymous PATCH changed or returned a row');
  const deletion = await fetch(`${endpoint}?id=eq.${id}`, {
    method: 'DELETE', headers: { ...headers, prefer: 'return=representation' },
  });
  const deleteText = await deletion.text();
  assert(!deletion.ok || deleteText === '[]', 'Anonymous DELETE changed or returned a row');
  const verify = await db.from(table).select('id,name').eq('id', id).single();
  assert.ifError(verify.error);
  assert.equal(verify.data.name, 'Persistence QA');
  report('DATA_API_ANON_READ_UPDATE_DELETE', `BLOCKED; statuses=${get.status}/${patch.status}/${deletion.status}`);
}
async function exactCleanup() {
  for (const id of rowIds) {
    const before = await db.from(table).select('id').eq('id', id).maybeSingle();
    assert.ifError(before.error);
    if (!before.data) continue;
    const deletion = await db.from(table).delete().eq('id', id).select('id');
    assert.ifError(deletion.error);
    assert.equal(deletion.data.length, 1, 'Exact synthetic delete affected unexpected row count');
    const after = await db.from(table).select('id').eq('id', id).maybeSingle();
    assert.ifError(after.error);
    assert.equal(after.data, null);
  }
  report('SYNTHETIC_EXACT_ROW_DELETE', 'PASS');
}

await waitApp();
clientBundleExposure();
let browser;
let failure;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`${base}/mybiz?utm_source=synthetic&utm_medium=ci&utm_campaign=commercial_front_level2`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.gtag === 'function', null, { timeout: 15000 });
  await page.waitForTimeout(3200);
  const inquiryEmail = cleanEmail('inquiry');
  const inquiry = page.locator('form').first();
  await inquiry.locator('input[name="name"]').fill('Persistence QA');
  await inquiry.locator('input[name="email"]').fill(inquiryEmail);
  await inquiry.locator('textarea[name="message"]').fill('Synthetic CI inquiry with no customer information.');
  await inquiry.locator('input[name="consent"]').check();
  const beforeSuccess = await page.evaluate(() => window.dataLayer.filter((entry) => entry[1] === 'inquiry_submit').length);
  assert.equal(beforeSuccess, 0);
  const inquiryResponse = page.waitForResponse((response) => response.url().endsWith('/api/commercial') && response.request().method() === 'POST');
  await inquiry.getByRole('button', { name: '문의 제출' }).click();
  assert.equal((await inquiryResponse).status(), 201);
  await inquiry.getByRole('status').waitFor();
  const inquiryRows = await rows(inquiryEmail);
  assert.equal(inquiryRows.length, 1);
  assert.equal(inquiryRows[0].service, 'mybiz');
  assert.equal(inquiryRows[0].source, 'synthetic');
  assert.equal(inquiryRows[0].landing_url, '/mybiz');
  assert.deepEqual([inquiryRows[0].utm_source, inquiryRows[0].utm_medium, inquiryRows[0].utm_campaign],
    ['synthetic', 'ci', 'commercial_front_level2']);
  assert(inquiryRows[0].created_at && inquiryRows[0].consented_at);
  await page.waitForFunction(() => window.dataLayer.filter((entry) => entry[1] === 'inquiry_submit').length === 1);
  report('INQUIRY_FORM_API_PERSISTED_READBACK_ANALYTICS', 'PASS');
  await dataApiSecurity(inquiryRows[0].id);

  await inquiry.locator('input[name="name"]').fill('Persistence QA');
  await inquiry.locator('input[name="email"]').fill(inquiryEmail);
  await inquiry.locator('textarea[name="message"]').fill('Synthetic CI inquiry with no customer information.');
  await inquiry.locator('input[name="consent"]').check();
  const duplicateResponse = page.waitForResponse((response) => response.url().endsWith('/api/commercial') && response.request().method() === 'POST');
  await inquiry.getByRole('button', { name: '문의 제출' }).click();
  assert.equal((await duplicateResponse).status(), 409);
  assert.match(await inquiry.getByRole('alert').innerText(), /10분/);
  assert.equal((await rows(inquiryEmail)).length, 1);
  assert.equal(await page.evaluate(() => window.dataLayer.filter((entry) => entry[1] === 'inquiry_submit').length), 1);
  report('DUPLICATE_REAL_DB_AND_DOUBLE_ANALYTICS', 'PASS');

  const leadEmail = cleanEmail('lead');
  const lead = page.locator('form').nth(1);
  await lead.locator('input[name="lead_email"]').fill(leadEmail);
  await lead.locator('input[name="lead_consent"]').check();
  const leadResponse = page.waitForResponse((response) => response.url().endsWith('/api/commercial') && response.request().method() === 'POST');
  await lead.getByRole('button', { name: '이메일 신청' }).click();
  assert.equal((await leadResponse).status(), 201);
  await lead.getByRole('status').waitFor();
  const leadRows = await rows(leadEmail);
  assert.equal(leadRows.length, 1);
  assert.equal(leadRows[0].kind, 'email_lead');
  assert.equal(leadRows[0].name, null);
  assert.equal(leadRows[0].message, null);
  assert.deepEqual([leadRows[0].source, leadRows[0].landing_url, leadRows[0].utm_source,
    leadRows[0].utm_medium, leadRows[0].utm_campaign],
    ['synthetic', '/mybiz', 'synthetic', 'ci', 'commercial_front_level2']);
  assert(leadRows[0].created_at && leadRows[0].consented_at);
  await page.waitForFunction(() => window.dataLayer.filter((entry) => entry[1] === 'email_lead_submit').length === 1);
  report('LEAD_FORM_CONSENT_API_PERSISTED_UTM_READBACK_ANALYTICS', 'PASS');

  for (let i = 0; i < fakeSecrets.length; i++) {
    const email = cleanEmail(`secret-${i}`);
    const response = await api(payload(email, { message: `Synthetic credential rejection: ${fakeSecrets[i]}` }));
    assert.equal(response.status, 400, `Secret pattern ${i} was accepted`);
    assert.equal((await rows(email)).length, 0);
  }
  const log = readFileSync(process.env.APP_LOG_FILE, 'utf8');
  for (const fakeSecret of fakeSecrets) assert(!log.includes(fakeSecret), 'Rejected content leaked to app log');
  report('SECRET_HTTP_400_DB_ZERO_LOG_ZERO', 'PASS');
  const benignEmail = cleanEmail('benign');
  assert.equal((await api(payload(benignEmail, { message: 'API token 오류가 발생합니다. 일반 문장 테스트입니다.' }))).status, 201);
  assert.equal((await rows(benignEmail)).length, 1);
  report('SECRET_FALSE_POSITIVE', 'PASS');

  assert.equal((await api(payload(cleanEmail('honeypot'), { website: 'filled' }))).status, 400);
  assert.equal((await api(payload(cleanEmail('delay'), { opened_at: Date.now() }))).status, 400);
  assert.equal((await api(payload(cleanEmail('origin')), 'https://invalid.example')).status, 403);
  const overlarge = await api(payload(cleanEmail('body'), { message: 'x'.repeat(9000) }));
  assert.equal(overlarge.status, 413);
  report('BODY_HONEYPOT_DELAY_ORIGIN', 'PASS; statuses=413/400/400/403');

  const concurrentEmail = cleanEmail('concurrent');
  const concurrentPayload = payload(concurrentEmail);
  const results = await Promise.all(Array.from({ length: 8 }, () => api(concurrentPayload)));
  const concurrentRows = await rows(concurrentEmail);
  report('CONCURRENT_DUPLICATE_ROWS', concurrentRows.length);
  report('CONCURRENT_HTTP', results.map((result) => result.status).join(','));

  execFileSync('bash', ['scripts/ci-commercial-local-sql.sh',
    'supabase/rollback_draft/002_biz2lab_commercial_submissions_lockdown.sql'], { stdio: 'pipe' });
  const afterLockdown = await api(payload(cleanEmail('lockdown')));
  assert.equal(afterLockdown.status, 503);
  assert.equal((await rows(inquiryEmail)).length, 1);
  report('ROLLBACK_WRITE_LOCKDOWN_AND_DATA_PRESERVATION', 'PASS');

  if (concurrentRows.length !== 1) throw new Error('Concurrent duplicate inserts are not atomic');
  report('ATOMIC_DEDUPE', 'PASS');
} catch (error) {
  failure = error;
} finally {
  await browser?.close();
  try { await exactCleanup(); } catch (error) { failure ??= error; }
}
if (failure) throw failure;
