import assert from "node:assert/strict";
import test from "node:test";

import { POST } from "@/app/api/commercial/route";
import { metadata as mindMetadata } from "@/app/minz-mind/page";
import { metadata as mybizMetadata } from "@/app/mybiz/page";
import { metadata as servicesMetadata } from "@/app/services/page";
import { metadata as webMetadata } from "@/app/web/page";
import sitemap from "@/app/sitemap";
import { commercialServices } from "@/lib/commercial";
import { commercialSubmissionSchema } from "@/lib/commercial-submission";

const candidate = {
  kind: "inquiry",
  service: "mybiz",
  name: "Preview Test",
  email: "preview@example.invalid",
  message: "Synthetic preview question only.",
  source: "test",
  landing_url: "/mybiz",
  utm_source: "test",
  utm_medium: "qa",
  utm_campaign: "preview",
  consent: true,
  website: "",
  opened_at: Date.now() - 4000,
} as const;

test("commercial pages are distinct preview canonicals while the ONURIM sitemap stays intact", () => {
  const pages = [
    [servicesMetadata, "/services"],
    [mybizMetadata, "/mybiz"],
    [webMetadata, "/web"],
    [mindMetadata, "/minz-mind"],
  ] as const;
  for (const [metadata, path] of pages) {
    assert.equal(metadata.alternates?.canonical, `https://www.biz2lab.com${path}`);
    assert.equal(metadata.openGraph?.url, `https://www.biz2lab.com${path}`);
    assert.equal((metadata.title as { absolute: string }).absolute.endsWith("| Biz2Lab"), true);
    assert.equal(metadata.openGraph?.siteName, "Biz2Lab");
    assert.deepEqual(metadata.robots, { index: false, follow: false });
  }
  const urls = sitemap().map((entry) => entry.url);
  assert.ok(urls.includes("https://www.biz2lab.com/"));
  assert.ok(urls.some((url) => url.startsWith("https://www.biz2lab.com/health/")));
  assert.ok(!urls.some((url) => /\/(services|mybiz|web|minz-mind)$/.test(url)));
});

test("public wording stays below verified product availability", () => {
  assert.equal(commercialServices.mybiz.status, "BETA");
  assert.equal(commercialServices.web.status, "COMING_SOON");
  assert.equal(commercialServices["minz-mind"].status, "COMING_SOON");
  assert.equal(commercialServices.web.demoUrl, null);
  assert.equal(commercialServices["minz-mind"].demoUrl, null);
});

test("lead validation rejects missing consent, honeypots and service-path mismatch", () => {
  assert.equal(commercialSubmissionSchema.safeParse(candidate).success, true);
  assert.equal(commercialSubmissionSchema.safeParse({ kind: "email_lead", service: "mybiz", email: candidate.email, source: candidate.source, landing_url: candidate.landing_url, utm_source: "", utm_medium: "", utm_campaign: "", consent: true, website: "", opened_at: candidate.opened_at }).success, true);
  assert.equal(commercialSubmissionSchema.safeParse({ ...candidate, consent: false }).success, false);
  assert.equal(commercialSubmissionSchema.safeParse({ ...candidate, website: "spam" }).success, false);
  assert.equal(commercialSubmissionSchema.safeParse({ ...candidate, landing_url: "/web" }).success, false);
});

test("commercial intake rejects a cross-origin submission before any storage path", async () => {
  const response = await POST(new Request("https://www.biz2lab.com/api/commercial", {
    method: "POST",
    headers: { origin: "https://other.example.invalid", "content-type": "application/json" },
    body: JSON.stringify(candidate),
  }));
  assert.equal(response.status, 403);
});

test("commercial intake bounds streamed payloads without a content-length header", async () => {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode("x".repeat(5000)));
      controller.enqueue(encoder.encode("x".repeat(5000)));
      controller.close();
    },
  });
  const response = await POST(new Request("https://www.biz2lab.com/api/commercial", {
    method: "POST",
    headers: { origin: "https://www.biz2lab.com", "content-type": "application/json" },
    body,
    duplex: "half",
  } as RequestInit));
  assert.equal(response.status, 413);
});

test("inquiry never reports success while capture is disabled", async () => {
  const previous = process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
  process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = "false";
  try {
    const response = await POST(new Request("https://www.biz2lab.com/api/commercial", {
      method: "POST",
      headers: { origin: "https://www.biz2lab.com", "content-type": "application/json" },
      body: JSON.stringify(candidate),
    }));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, error: "CAPTURE_NOT_ENABLED" });
  } finally {
    if (previous === undefined) delete process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED;
    else process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED = previous;
  }
});
