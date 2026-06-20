import { adminJson, requireAdminRequest } from "@/lib/admin/content-automation-auth";
import { getContentAutomationStatus } from "@/lib/admin/content-automation-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = requireAdminRequest(request);
  if (!auth.ok) {
    return adminJson({ ok: false, error: auth.error }, { status: auth.status });
  }

  return adminJson({ ok: true, status: getContentAutomationStatus() });
}
