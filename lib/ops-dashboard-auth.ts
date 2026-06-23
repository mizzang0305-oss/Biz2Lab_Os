import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const OPS_DASHBOARD_KEY_ENV = "BIZ2LAB_OPS_DASHBOARD_KEY";
export const opsDashboardCookieName = "biz2lab_ops_dashboard";
export const opsDashboardCookiePath = "/ko/ops";

const sessionVersion = "v1";
const sessionPurpose = "biz2lab:ops-dashboard-session:v1";
const sessionMaxAgeSeconds = 60 * 60 * 8;

function configuredOpsDashboardKey() {
  return process.env[OPS_DASHBOARD_KEY_ENV]?.trim() ?? "";
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

function sessionDigest(secret: string) {
  return createHmac("sha256", secret).update(sessionPurpose).digest("base64url");
}

export function isOpsDashboardKeyConfigured() {
  return configuredOpsDashboardKey().length > 0;
}

export function verifyOpsDashboardKey(providedKey: string) {
  const expectedKey = configuredOpsDashboardKey();
  const normalizedProvidedKey = providedKey.trim();

  return Boolean(expectedKey && normalizedProvidedKey && safeEqual(normalizedProvidedKey, expectedKey));
}

export function createOpsDashboardSessionValue() {
  const expectedKey = configuredOpsDashboardKey();

  if (!expectedKey) {
    return "";
  }

  return `${sessionVersion}.${sessionDigest(expectedKey)}`;
}

export function isValidOpsDashboardSession(cookieValue: string | undefined) {
  const expectedSession = createOpsDashboardSessionValue();

  return Boolean(cookieValue && expectedSession && safeEqual(cookieValue, expectedSession));
}

export function opsDashboardCookieOptions() {
  return {
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: opsDashboardCookiePath,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function isOpsDashboardAuthenticated() {
  const cookieStore = await cookies();

  return isValidOpsDashboardSession(cookieStore.get(opsDashboardCookieName)?.value);
}
