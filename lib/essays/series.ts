import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import { z } from "zod";
import plan from "@/data/knowledge-series-plan.json";
import publicationRecords from "@/data/knowledge-publication.json";
import { antikytheraEssay, essaySources } from "./antikythera";

export const essayThemes = [
  { slug: "measurement", name: "측정과 질서", question: "시간과 위치를 함께 재려면 무엇을 먼저 정해야 할까?" },
  { slug: "observation", name: "관측과 증거", question: "보이는 흔적에서 보이지 않는 것을 어떻게 알아낼까?" },
  { slug: "models", name: "설명과 모형", question: "설명이 맞는 범위와 멈추는 지점은 어디일까?" },
  { slug: "technology", name: "기계와 연결", question: "도구가 바뀌면 일과 생각의 순서도 달라질까?" },
  { slug: "responsibility", name: "지식과 책임", question: "알게 된 것과 할 수 있는 일 사이에는 어떤 책임이 있을까?" },
  { slug: "perspective", name: "인간의 자리", question: "시야가 넓어질 때 우리의 자리는 어떻게 달라질까?" },
] as const;
export const plannedEssays = plan.articles;
const contentRoot = path.join(process.cwd(), "content", "knowledge-essays");
const sourceSchema = z.object({ label: z.string().trim().min(1).max(200), url: z.string().url().refine(isPublicHttps), note: z.string().trim().min(1).max(1200) }).strict();
const frontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]{0,70}$/), title: z.string().trim().min(5).max(150),
  description: z.string().trim().min(30).max(250), theme: z.enum(essayThemes.map(theme => theme.name)),
  question: z.string().trim().min(5).max(200), sources: z.array(sourceSchema).min(3).max(8),
}).strict();
export type EssaySource = z.infer<typeof sourceSchema>;
export type EssaySection = { id: string; title: string; content: string };
export type SeriesEssay = {
  slug: string; order: number; path: string; title: string; description: string; theme: string; question: string;
  sources: readonly EssaySource[]; related: readonly string[]; content: string; intro: string; sections: EssaySection[];
  manuscriptSha256: string; bodySha256: string; sourceCheckedAt: string | null; authorRecordMatches: boolean;
};

function isPublicHttps(value: string) {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password && !url.port; }
  catch { return false; }
}
export function sha256(value: string | Buffer) { return createHash("sha256").update(value).digest("hex"); }
function headingText(value: string) { return value.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").trim(); }
export function splitEssaySections(content: string) {
  const headings: { title: string; start: number; end: number }[] = [];
  let position = 0;
  let fence = "";
  for (const line of content.split("\n")) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence = marker[1][0]; else if (marker[1][0] === fence) fence = ""; }
    const match = !fence && line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (match) headings.push({ title: headingText(match[1]), start: position, end: position + line.length + 1 });
    position += line.length + 1;
  }
  return { intro: content.slice(0, headings[0]?.start ?? content.length).trim(),
    sections: headings.map((heading, index) => ({ id: `scene-${index + 1}`, title: heading.title, content: content.slice(heading.end, headings[index + 1]?.start ?? content.length).trim() })) };
}
export function parseEssayManuscript(raw: string, slug: string): Omit<SeriesEssay, "sourceCheckedAt" | "authorRecordMatches"> {
  const entry = plannedEssays.find(article => article.slug === slug && slug !== "antikythera");
  if (!entry || raw.length > 128_000) throw new Error("허용된 원고가 아닙니다.");
  if (raw.split(/\r?\n/, 1)[0] !== "---") throw new Error("원고는 정확한 YAML 구분선 ---로 시작해야 합니다.");
  const parsed = matter(raw);
  const frontmatter = frontmatterSchema.parse(parsed.data);
  if (frontmatter.slug !== slug || frontmatter.theme !== entry.theme) throw new Error("원고의 경로 또는 주제가 목록과 다릅니다.");
  const content = parsed.content.replaceAll("\r\n", "\n").trim();
  if (content.length < 3500 || /^#\s/m.test(content) || /<\/?[a-z][^>]*>|<!--|<!DOCTYPE/i.test(content) || /!\[[^\]]*\]\(/.test(content)) throw new Error("본문 길이·제목·HTML·이미지 규칙을 확인해야 합니다.");
  const structure = splitEssaySections(content);
  if (structure.sections.length < 3 || structure.sections.length > 8 || structure.sections.some(section => !section.content)) throw new Error("완성된 3–8개 본문 절이 필요합니다.");
  return { ...frontmatter, order: entry.order, path: `/essays/${slug}`, related: entry.related, content, ...structure,
    manuscriptSha256: sha256(raw), bodySha256: sha256(content) };
}
function authorRecord(slug: string, manuscriptSha256: string) {
  const record = (publicationRecords as Record<string, {sha256: string; sourceCheckedAt: string | null}>)[slug];
  if (!record) return { sourceCheckedAt: null, authorRecordMatches: false };
  try {
    const authorRecordMatches = record.sha256 === manuscriptSha256;
    const date = record.sourceCheckedAt;
    const sourceCheckedAt = authorRecordMatches && typeof date === "string" && /^\d{4}-\d{2}-\d{2}(T|$)/.test(date) && Number.isFinite(Date.parse(date)) ? date : null;
    return { sourceCheckedAt, authorRecordMatches };
  } catch { return { sourceCheckedAt: null, authorRecordMatches: false }; }
}
export function getSeriesEssay(slug: string): SeriesEssay | null {
  if (!/^[a-z][a-z0-9-]{0,70}$/.test(slug) || !plannedEssays.some(entry => entry.slug === slug)) return null;
  if (slug === "antikythera") {
    const entry = plannedEssays[0];
    const raw = fs.readFileSync(path.join(process.cwd(), "components", "essays", "AntikytheraEssay.tsx"), "utf8");
    const sections = [...raw.replaceAll("\r\n", "\n").matchAll(/<section id="([^"]+)"[\s\S]*?<\/section>/g)].map(match => match[0]).join("\n");
    const record = authorRecord(slug, sha256(raw));
    return { ...antikytheraEssay, slug, order: 1, theme: entry.theme, question: entry.question, sources: essaySources, related: entry.related,
      content: "", intro: "", sections: [], manuscriptSha256: sha256(raw), bodySha256: sha256(sections), ...record, sourceCheckedAt: record.sourceCheckedAt ?? antikytheraEssay.updatedAt };
  }
  const file = path.join(contentRoot, `${slug}.md`);
  if (!fs.existsSync(file) || fs.statSync(file).size > 128_000) return null;
  try { const essay = parseEssayManuscript(fs.readFileSync(file, "utf8"), slug); return { ...essay, ...authorRecord(slug, essay.manuscriptSha256) }; }
  catch { return null; }
}
export function getSeriesEssays() { return plannedEssays.map(entry => getSeriesEssay(entry.slug)).filter((essay): essay is SeriesEssay => essay !== null); }
export function getRelatedEssays(slug: string) {
  const essay = getSeriesEssay(slug);
  return essay ? essay.related.map(related => getSeriesEssay(related)).filter((related): related is SeriesEssay => related !== null) : [];
}
export function getEssayTheme(slug: string) { return essayThemes.find(theme => theme.slug === slug) ?? null; }
export function safeEssayHref(value: string | undefined, availablePaths: readonly string[]): string | undefined {
  if (!value) return undefined;
  if (/^#[a-zA-Z0-9_-]+$/.test(value)) return value;
  if (value === "/" || value === "/privacy" || availablePaths.includes(value.split("#")[0])) return value;
  return isPublicHttps(value) ? value : undefined;
}
