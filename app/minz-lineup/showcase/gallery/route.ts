import { readFile } from "node:fs/promises";
import path from "node:path";
import { withMinzPrivacyNotice } from "@/lib/minz/privacy-notice";

export const dynamic = "force-static";

export async function GET() {
  const html = await readFile(path.join(process.cwd(), "public/minz-lineup/showcase/gallery/index.html"), "utf8");
  return new Response(withMinzPrivacyNotice(html), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
