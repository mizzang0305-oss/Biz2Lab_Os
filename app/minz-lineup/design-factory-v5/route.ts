import { readFile } from "node:fs/promises";
import path from "node:path";
import { withMinzPrivacyNotice } from "@/lib/minz/privacy-notice";

export const dynamic = "force-static";

export async function GET() {
  const html = await readFile(path.join(process.cwd(), "public/minz-lineup/design-factory-v5/index.html"), "utf8");
  return new Response(withMinzPrivacyNotice(html).replace("<head>", '<head><base href="/minz-lineup/design-factory-v5/">'), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, follow",
      "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self' blob:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'",
    },
  });
}
