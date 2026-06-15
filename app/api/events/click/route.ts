import { z } from "zod";

import { internalClickEventTypes } from "@/lib/analytics-events";
import { getSupabaseAdmin } from "@/lib/supabase";

const eventSchema = z.object({
  type: z.enum(internalClickEventTypes),
  sourcePath: z.string().startsWith("/").max(500),
  targetPath: z.string().startsWith("/").max(500),
});

export async function POST(request: Request) {
  const parsed = eventSchema.safeParse(await request.json().catch(() => ({})));

  if (!parsed.success) {
    return Response.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return Response.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from("internal_link_click_events").insert({
    event_type: parsed.data.type,
    source_path: parsed.data.sourcePath,
    target_path: parsed.data.targetPath,
  });

  if (error) {
    return Response.json({ ok: true, stored: false });
  }

  return Response.json({ ok: true, stored: true });
}

