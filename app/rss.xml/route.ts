import { healthArticles } from "@/lib/health-v3/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = Object.values(healthArticles)
    .map(
      (article) => `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${absoluteUrl(`/health/${article.slug}`)}</link>
  <guid>${absoluteUrl(`/health/${article.slug}`)}</guid>
  <description>${escapeXml(article.description)}</description>
  <pubDate>${new Date("2026-08-26T00:00:00+09:00").toUTCString()}</pubDate>
</item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.name)} 건강 안내</title>
  <link>${siteConfig.url}</link>
  <description>${escapeXml(siteConfig.description)}</description>
  <language>ko-KR</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

