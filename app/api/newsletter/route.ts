import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(240),
  consent: z.coerce.boolean(),
});

export async function POST(request: Request) {
  const raw = await request.json().catch(() => ({}));
  const parsed = newsletterSchema.safeParse(raw);

  if (!parsed.success || !parsed.data.consent) {
    return Response.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json(
      { ok: false, error: "SUPABASE_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: parsed.data.email,
      consented_at: new Date().toISOString(),
      status: "subscribed",
    },
    { onConflict: "email" },
  );

  if (error) {
    return Response.json({ ok: false, error: "NEWSLETTER_SAVE_FAILED" }, { status: 500 });
  }

  return Response.json({ ok: true });
}

