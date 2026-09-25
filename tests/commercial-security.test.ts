import assert from "node:assert/strict";
import test from "node:test";

import { handleCommercialPost } from "@/lib/commercial-handler";
import { containsCommercialSecret } from "@/lib/commercial-secret";
import type { CommercialSubmission } from "@/lib/commercial-submission";
import type { getSupabaseAdmin } from "@/lib/supabase";

const candidate: CommercialSubmission = {
  kind: "inquiry",
  service: "mybiz",
  name: "Level 2 QA",
  email: "QA-EXAMPLE@example.invalid",
  message: "Synthetic commercial inquiry with no customer information.",
  source: "codex_level2",
  landing_url: "/mybiz",
  utm_source: "synthetic",
  utm_medium: "qa",
  utm_campaign: "commercial_front_level2",
  consent: true,
  website: "",
  opened_at: Date.now() - 4000,
};

function request(payload: CommercialSubmission) {
  return new Request("https://example.invalid/api/commercial", {
    method: "POST",
    headers: { origin: "https://example.invalid", "content-type": "application/json" },
    body: JSON.stringify({ ...payload, opened_at: Date.now() - 4000 }),
  });
}

function fakeStore() {
  const rows: Array<Record<string, unknown>> = [];
  let lookupError = false;
  let insertError: string | null = null;
  const client = {
    from(table: string) {
      assert.equal(table, "commercial_submissions");
      return {
        select(column: string) {
          assert.equal(column, "id");
          const filters: Array<[string, unknown]> = [];
          let cutoff = "";
          const query = {
            eq(key: string, value: unknown) { filters.push([key, value]); return query; },
            gte(key: string, value: string) { assert.equal(key, "created_at"); cutoff = value; return query; },
            async limit(count: number) {
              assert.equal(count, 1);
              if (lookupError) return { data: null, error: { code: "SYNTHETIC_LOOKUP_ERROR" } };
              const data = rows.filter((row) =>
                filters.every(([key, value]) => row[key] === value) && String(row.created_at) >= cutoff,
              ).slice(0, 1).map((row) => ({ id: row.id }));
              return { data, error: null };
            },
          };
          return query;
        },
        async insert(value: Record<string, unknown>) {
          if (insertError) return { error: { code: insertError } };
          rows.push({ ...value, id: rows.length + 1, created_at: new Date().toISOString() });
          return { error: null };
        },
      };
    },
  } as unknown as NonNullable<ReturnType<typeof getSupabaseAdmin>>;
  return {
    rows,
    resolveAdmin: () => client,
    failLookup: () => { lookupError = true; },
    failInsert: (code = "SYNTHETIC_INSERT_ERROR") => { insertError = code; },
  };
}

test("server rejects credential patterns without reflecting or storing them", async () => {
  const patterns = [
    "-----BEGIN PRIVATE KEY-----",
    "-----BEGIN RSA PRIVATE KEY-----",
    "Authorization: Bearer " + "A".repeat(24),
    "Bearer " + "A".repeat(24),
    "DATABASE_URL=postgres://synthetic.invalid",
    "SUPABASE_SERVICE_ROLE_KEY=synthetic",
    "OPENAI_API_KEY=synthetic",
    "AWS_SECRET_ACCESS_KEY=synthetic",
    "sk-" + "A".repeat(20),
    "sk-proj-" + "A".repeat(20),
    "ghp_" + "A".repeat(24),
    "github_pat_" + "A".repeat(24),
    "AKIA" + "A".repeat(16),
    ["A".repeat(16), "B".repeat(16), "C".repeat(24)].join("."),
  ];
  for (const pattern of patterns) {
    const payload: CommercialSubmission = { ...candidate, message: `Synthetic secret check: ${pattern}` };
    assert.equal(containsCommercialSecret(payload), true);
    const response = await handleCommercialPost(request(payload), () => {
      throw new Error("storage must not be resolved for rejected content");
    });
    assert.equal(response.status, 400);
    const body = await response.text();
    assert.match(body, /SECRET_CONTENT_REJECTED/);
    assert.ok(!body.includes(pattern));
  }
});

test("ordinary API and token discussion is not mistaken for a credential", () => {
  assert.equal(containsCommercialSecret({
    ...candidate,
    message: "We need an API token policy and a database URL design, not credentials.",
    utm_campaign: "sk-short-example",
  }), false);
});

test("credential-shaped attribution is rejected before capture can be enabled", async () => {
  const payload: CommercialSubmission = {
    ...candidate,
    utm_campaign: "github_pat_" + "A".repeat(24),
  };
  const response = await handleCommercialPost(request(payload), () => {
    throw new Error("storage must not be resolved for rejected attribution");
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, "SECRET_CONTENT_REJECTED");
});

test("one stored inquiry blocks an immediate same-kind repeat with 409 and no second insert", async () => {
  const previous = process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
  process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = "true";
  try {
    const store = fakeStore();
    const first = await handleCommercialPost(request(candidate), store.resolveAdmin);
    assert.equal(first.status, 201);
    assert.equal(store.rows.length, 1);
    assert.equal(store.rows[0].email, "qa-example@example.invalid");
    assert.equal(store.rows[0].utm_campaign, "commercial_front_level2");
    const repeat = await handleCommercialPost(request(candidate), store.resolveAdmin);
    assert.equal(repeat.status, 409);
    assert.deepEqual(await repeat.json(), { ok: false, error: "DUPLICATE_SUBMISSION" });
    assert.equal(store.rows.length, 1);
  } finally {
    if (previous === undefined) delete process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
    else process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = previous;
  }
});

test("separate consented email lead preserves attribution without an inquiry message", async () => {
  const previous = process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
  process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = "true";
  try {
    const store = fakeStore();
    const lead: CommercialSubmission = {
      kind: "email_lead",
      service: "mybiz",
      email: "LEAD-EXAMPLE@example.invalid",
      source: "codex_level2",
      landing_url: "/mybiz",
      utm_source: "synthetic",
      utm_medium: "qa",
      utm_campaign: "commercial_front_level2",
      consent: true,
      website: "",
      opened_at: Date.now() - 4000,
    };
    assert.equal((await handleCommercialPost(request(lead), store.resolveAdmin)).status, 201);
    assert.equal(store.rows.length, 1);
    assert.equal(store.rows[0].kind, "email_lead");
    assert.equal(store.rows[0].email, "lead-example@example.invalid");
    assert.equal(store.rows[0].name, null);
    assert.equal(store.rows[0].message, null);
    assert.equal(store.rows[0].source, "codex_level2");
    assert.equal(store.rows[0].utm_source, "synthetic");
    assert.equal(store.rows[0].utm_medium, "qa");
    assert.equal(store.rows[0].utm_campaign, "commercial_front_level2");
    assert.ok(!Number.isNaN(Date.parse(String(store.rows[0].consented_at))));
  } finally {
    if (previous === undefined) delete process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
    else process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = previous;
  }
});

test("lookup or insert uncertainty fails closed without a success response", async () => {
  const previous = process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
  process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = "true";
  try {
    const lookup = fakeStore();
    lookup.failLookup();
    assert.equal((await handleCommercialPost(request(candidate), lookup.resolveAdmin)).status, 503);
    assert.equal(lookup.rows.length, 0);
    const insert = fakeStore();
    insert.failInsert();
    assert.equal((await handleCommercialPost(request(candidate), insert.resolveAdmin)).status, 503);
    assert.equal(insert.rows.length, 0);
  } finally {
    if (previous === undefined) delete process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
    else process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = previous;
  }
});

test("database unique-index conflict is a duplicate response, not a success or server error", async () => {
  const previous = process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
  process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = "true";
  try {
    const store = fakeStore();
    store.failInsert("23505");
    const response = await handleCommercialPost(request(candidate), store.resolveAdmin);
    assert.equal(response.status, 409);
    assert.equal((await response.json()).error, "DUPLICATE_SUBMISSION");
    assert.equal(store.rows.length, 0);
  } finally {
    if (previous === undefined) delete process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
    else process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = previous;
  }
});
