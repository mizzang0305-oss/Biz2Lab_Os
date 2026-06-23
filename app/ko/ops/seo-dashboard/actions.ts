"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createOpsDashboardSessionValue,
  opsDashboardCookieName,
  opsDashboardCookieOptions,
  verifyOpsDashboardKey,
} from "@/lib/ops-dashboard-auth";
import { SEO_OPS_DASHBOARD_ROUTE } from "@/lib/seo-ops-dashboard";

export async function unlockOpsDashboard(formData: FormData) {
  const providedKey = String(formData.get("opsDashboardKey") ?? "");

  if (verifyOpsDashboardKey(providedKey)) {
    const cookieStore = await cookies();
    cookieStore.set(opsDashboardCookieName, createOpsDashboardSessionValue(), opsDashboardCookieOptions());
  }

  redirect(SEO_OPS_DASHBOARD_ROUTE);
}
