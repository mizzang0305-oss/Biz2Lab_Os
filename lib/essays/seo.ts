import type { Metadata } from "next";
import { antikytheraEssay, essayFigures, essaySources, knowledgeBrand } from "./antikythera";
import { essayPhotoSrc, getEssayPhoto } from "./photos";
export function knowledgeIsPublished() {
  return process.env.VERCEL_ENV === "production" && process.env.BIZ2LAB_KNOWLEDGE_PUBLISH_APPROVED === "true";
}
export function knowledgeOrigin() {
  if (knowledgeIsPublished()) return "https://www.biz2lab.com";
  const candidate = process.env.BIZ2LAB_REVIEW_ORIGIN || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://127.0.0.1:33204");
  try {
    const url = new URL(candidate);
    if (!url.username && !url.password && url.pathname === "/" && !url.search && !url.hash &&
      ((url.protocol === "https:" && url.hostname.endsWith(".vercel.app")) ||
        (url.protocol === "http:" && ["127.0.0.1", "localhost"].includes(url.hostname)))) return url.origin;
  } catch { /* Invalid review origins fall back to the local candidate. */ }
  return "http://127.0.0.1:33204";
}
export function knowledgeUrl(path: string) { return new URL(path, knowledgeOrigin()).toString(); }
export function knowledgeMetadata(title: string, description: string, path: string): Metadata {
  const article = /^\/essays\/[a-z][a-z0-9-]*$/.test(path);
  return { metadataBase: new URL(knowledgeOrigin()), title: { absolute: `${title} | ${knowledgeBrand}` }, description,
    alternates: { canonical: knowledgeUrl(path) }, robots: { index: knowledgeIsPublished(), follow: knowledgeIsPublished() },
    openGraph: { title, description, url: knowledgeUrl(path), siteName: knowledgeBrand, locale: "ko_KR", type: article ? "article" : "website" },
    twitter: { card: "summary_large_image", title, description } };
}
export type KnowledgeArticleSeo = { path: string; title: string; description: string; theme: string; sources: readonly { url: string }[] };
export function knowledgeSchemas(pathname: string | null, article?: KnowledgeArticleSeo): unknown[] {
  const entry = article?.path === pathname ? article : pathname === antikytheraEssay.path ? { ...antikytheraEssay, theme: "관측과 증거", sources: essaySources } : null;
  if (pathname !== "/" && !entry) return [];
  const organization = { "@type": "Organization", name: "Biz2Lab", url: knowledgeUrl("/") };
  const photo = entry ? getEssayPhoto(entry.path.split("/").at(-1) ?? "") : undefined;
  return [{ "@context": "https://schema.org", "@type": "WebSite", name: knowledgeBrand, url: knowledgeUrl("/"), inLanguage: "ko-KR" },
    ...(entry ? [
      { "@context": "https://schema.org", "@type": "BlogPosting", headline: entry.title,
        description: entry.description, inLanguage: "ko-KR", url: knowledgeUrl(entry.path), articleSection: entry.theme,
        mainEntityOfPage: knowledgeUrl(entry.path), author: organization, publisher: organization,
        ...(entry.path === antikytheraEssay.path ? { image: essayFigures.map(figure => knowledgeUrl(figure.src)) } : photo ? { image: {
          "@type": "ImageObject", contentUrl: knowledgeUrl(essayPhotoSrc(photo, photo.width, "jpg")),
          caption: photo.caption, creditText: photo.credit,
          ...(photo.creator ? { creator: { "@type": photo.creatorType ?? "Person", name: photo.creator } } : {}),
          license: photo.licenseUrl, width: photo.width, height: photo.height,
        } } : {}), citation: entry.sources.map(source => source.url) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: knowledgeBrand, item: knowledgeUrl("/") },
        { "@type": "ListItem", position: 2, name: entry.title, item: knowledgeUrl(entry.path) } ] }
    ] : [])];
}
