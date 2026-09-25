import { commercialSubmissionSchema } from "@/lib/commercial-submission";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) {
    return Response.json({ ok: false, error: "ORIGIN_DENIED" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, error: "INVALID_CONTENT_TYPE" }, { status: 415 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 8192) {
    return Response.json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  const raw = await request.text().catch(() => "");
  if (raw.length > 8192) {
    return Response.json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }
  let json: unknown;
  try { json = JSON.parse(raw); } catch { json = null; }
  const parsed = commercialSubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const data = parsed.data;
  const elapsed = Date.now() - data.opened_at;
  if (elapsed < 3000 || elapsed > 24 * 60 * 60 * 1000) {
    return Response.json({ ok: false, error: "INVALID_FORM_TIME" }, { status: 400 });
  }

  if (process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED !== "true") {
    return Response.json({ ok: false, error: "CAPTURE_NOT_ENABLED" }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json({ ok: false, error: "STORAGE_UNAVAILABLE" }, { status: 503 });
  }

  const { error } = await supabase.from("commercial_submissions").insert({
    kind: data.kind,
    service: data.service,
    email: data.email,
    name: data.kind === "inquiry" ? data.name : null,
    message: data.kind === "inquiry" ? data.message : null,
    source: data.source,
    landing_url: data.landing_url,
    utm_source: data.utm_source || null,
    utm_medium: data.utm_medium || null,
    utm_campaign: data.utm_campaign || null,
    consented_at: new Date().toISOString(),
  });

  if (error) {
    return Response.json({ ok: false, error: "SAVE_FAILED" }, { status: 503 });
  }

  return Response.json({ ok: true, stored: true }, { status: 201 });
}
