import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAdminConsoleEnabled() {
  return process.env.BIZ2LAB_ADMIN_CONSOLE_ENABLED === "true";
}

function configuredAdminToken() {
  return process.env.BIZ2LAB_ADMIN_TOKEN?.trim() ?? "";
}

function tokenFromAuthorization(authorization: string) {
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  if (bearer) return bearer;

  const basic = authorization.match(/^Basic\s+(.+)$/i)?.[1]?.trim();
  if (!basic) return "";

  try {
    const decoded = atob(basic);
    return decoded.slice(decoded.indexOf(":") + 1).trim();
  } catch {
    return "";
  }
}

function denied(status: number, error: string) {
  return new NextResponse(error, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...(status === 401 ? { "WWW-Authenticate": 'Basic realm="Biz2Lab Content Automation"' } : {}),
    },
  });
}

export function proxy(request: NextRequest) {
  if (!isAdminConsoleEnabled()) {
    return denied(404, "ADMIN_CONSOLE_DISABLED");
  }

  const expectedToken = configuredAdminToken();
  if (!expectedToken) {
    return denied(503, "ADMIN_TOKEN_NOT_CONFIGURED");
  }

  const providedToken = tokenFromAuthorization(request.headers.get("authorization") ?? "");
  if (providedToken !== expectedToken) {
    return denied(401, "ADMIN_AUTH_REQUIRED");
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: "/admin/content-automation/:path*",
};
