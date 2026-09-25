import { commercialSubmissionSchema } from "@/lib/commercial-submission";
import { containsCommercialSecret } from "@/lib/commercial-secret";
import { getSupabaseAdmin } from "@/lib/supabase";

const maxPayloadBytes = 8192;
const duplicateCooldownMs = 10 * 60 * 1000;

async function readBoundedBody(request: Request) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxPayloadBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    return "";
  } finally {
    reader.releaseLock();
  }
}

export async function handleCommercialPost(
  request: Request,
  resolveAdmin: typeof getSupabaseAdmin = getSupabaseAdmin,
) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) {
    return Response.json({ ok: false, error: "ORIGIN_DENIED" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, error: "INVALID_CONTENT_TYPE" }, { status: 415 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > maxPayloadBytes) {
    return Response.json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  const raw = await readBoundedBody(request);
  if (raw === null) {
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

  if (containsCommercialSecret(data)) {
    return Response.json({
      ok: false,
      error: "SECRET_CONTENT_REJECTED",
      message: "비밀번호·API 키·토큰 등 비밀정보를 입력하지 마세요.",
    }, { status: 400 });
  }

  if (process.env.BIZ2LAB_COMMERCIAL_CAPTURE_ENABLED !== "true") {
    return Response.json({ ok: false, error: "CAPTURE_NOT_ENABLED" }, { status: 503 });
  }

  const supabase = resolveAdmin();
  if (!supabase) {
    return Response.json({ ok: false, error: "STORAGE_UNAVAILABLE" }, { status: 503 });
  }

  const normalizedEmail = data.email.toLowerCase();
  const cutoff = new Date(Date.now() - duplicateCooldownMs).toISOString();
  const { data: recent, error: lookupError } = await supabase
    .from("commercial_submissions")
    .select("id")
    .eq("service", data.service)
    .eq("kind", data.kind)
    .eq("email", normalizedEmail)
    .gte("created_at", cutoff)
    .limit(1);
  if (lookupError) {
    return Response.json({ ok: false, error: "STORAGE_UNAVAILABLE" }, { status: 503 });
  }
  if (recent?.length) {
    return Response.json({ ok: false, error: "DUPLICATE_SUBMISSION" }, { status: 409 });
  }

  const { error } = await supabase.from("commercial_submissions").insert({
    kind: data.kind,
    service: data.service,
    email: normalizedEmail,
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
    if (error.code === "23505") {
      return Response.json({ ok: false, error: "DUPLICATE_SUBMISSION" }, { status: 409 });
    }
    return Response.json({ ok: false, error: "SAVE_FAILED" }, { status: 503 });
  }

  return Response.json({ ok: true, stored: true }, { status: 201 });
}
