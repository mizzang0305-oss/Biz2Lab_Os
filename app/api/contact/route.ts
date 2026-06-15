import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(240),
  topic: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const raw =
    contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return Response.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json(
      { ok: false, error: "SUPABASE_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic,
    message: parsed.data.message,
  });

  if (error) {
    return Response.json({ ok: false, error: "CONTACT_SAVE_FAILED" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

