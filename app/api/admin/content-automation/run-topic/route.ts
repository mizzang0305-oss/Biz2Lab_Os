import { z } from "zod";

import { adminJson, requireAdminRequest } from "@/lib/admin/content-automation-auth";
import { runSelectedTopicPlanOnly } from "@/lib/admin/content-automation-actions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const runTopicSchema = z.object({
  topic: z.string().trim().min(1).max(160),
});

export async function POST(request: Request) {
  const auth = requireAdminRequest(request);
  if (!auth.ok) {
    return adminJson({ ok: false, error: auth.error }, { status: auth.status });
  }

  const parsed = runTopicSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return adminJson({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }

  return adminJson({
    ok: true,
    action: await runSelectedTopicPlanOnly(parsed.data.topic),
  });
}
