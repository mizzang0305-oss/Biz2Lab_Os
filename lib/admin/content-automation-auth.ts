import { createHash, timingSafeEqual } from "node:crypto";

export const contentAutomationAdminPath = "/admin/content-automation";

export type AdminAuthFailure = {
  ok: false;
  status: number;
  error: "ADMIN_CONSOLE_DISABLED" | "ADMIN_TOKEN_NOT_CONFIGURED" | "ADMIN_AUTH_REQUIRED";
};

export type AdminAuthResult = { ok: true } | AdminAuthFailure;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeTokenEqual(provided: string, expected: string) {
  return timingSafeEqual(digest(provided), digest(expected));
}

function tokenFromAuthorization(authorization: string) {
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  if (bearer) return bearer;

  const basic = authorization.match(/^Basic\s+(.+)$/i)?.[1]?.trim();
  if (!basic) return "";

  try {
    const decoded = Buffer.from(basic, "base64").toString("utf8");
    return decoded.slice(decoded.indexOf(":") + 1).trim();
  } catch {
    return "";
  }
}

export function isContentAutomationAdminEnabled() {
  return process.env.BIZ2LAB_ADMIN_CONSOLE_ENABLED === "true";
}

export function isAdminConfigWriteEnabled() {
  return process.env.BIZ2LAB_ADMIN_CONFIG_WRITE_ENABLED === "true";
}

export function requireAdminRequest(request: Request): AdminAuthResult {
  if (!isContentAutomationAdminEnabled()) {
    return { ok: false, status: 404, error: "ADMIN_CONSOLE_DISABLED" };
  }

  const expectedToken = process.env.BIZ2LAB_ADMIN_TOKEN?.trim();
  if (!expectedToken) {
    return { ok: false, status: 503, error: "ADMIN_TOKEN_NOT_CONFIGURED" };
  }

  const providedToken = tokenFromAuthorization(request.headers.get("authorization") ?? "");

  if (!providedToken || !safeTokenEqual(providedToken, expectedToken)) {
    return { ok: false, status: 401, error: "ADMIN_AUTH_REQUIRED" };
  }

  return { ok: true };
}

export function adminJson(payload: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Vary", "Authorization");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return Response.json(payload, { ...init, headers });
}
