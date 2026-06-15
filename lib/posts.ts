import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { categories } from "@/lib/categories";
import {
  postFrontmatterSchema,
  type PostFrontmatter,
  type PublicCategorySlug,
} from "@/lib/schema";

const contentRoot = path.join(process.cwd(), "content", "ko");

export type Post = {
  slug: string;
  route: string;
  category: PublicCategorySlug;
  categoryName: string;
  frontmatter: PostFrontmatter;
  content: string;
  excerpt: string;
  readingTime: string;
  internalLinks: string[];
  headings: { id: string; text: string; level: number }[];
};

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkMarkdownFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    })
    .sort();
}

function extractInternalLinks(content: string) {
  return Array.from(content.matchAll(/\]\((\/ko\/[^)\s#]+)(?:#[^)]+)?\)/g))
    .map((match) => match[1])
    .filter((link, index, links) => links.indexOf(link) === index);
}

export function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractHeadings(content: string) {
  return Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm)).map((match) => ({
    id: slugifyHeading(match[2]),
    text: match[2].trim(),
    level: match[1].length,
  }));
}

function parsePost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = postFrontmatterSchema.parse(data);
  const category = frontmatter.category as PublicCategorySlug;

  if (frontmatter.category === "pillar") {
    throw new Error(`${filePath} uses internal-only pillar category in public content`);
  }

  return {
    slug: frontmatter.slug,
    route: `/ko/${frontmatter.category}/${frontmatter.slug}`,
    category,
    categoryName: categories[category].name,
    frontmatter,
    content: content.trim(),
    excerpt: frontmatter.description,
    readingTime: readingTime(content).text.replace("min read", "분 읽기"),
    internalLinks: extractInternalLinks(content),
    headings: extractHeadings(content),
  };
}

export function getAllPosts() {
  return walkMarkdownFiles(contentRoot).map(parsePost);
}

export function getPublicPosts() {
  return getAllPosts()
    .filter(
      (post) =>
        post.frontmatter.locale === "ko" &&
        post.frontmatter.status === "published" &&
        !post.frontmatter.draft,
    )
    .sort((a, b) =>
      b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
    );
}

export function getSitemapPosts() {
  return getPublicPosts().filter((post) => !post.frontmatter.noindex);
}

export function getPostBySlug(category: string, slug: string) {
  return (
    getPublicPosts().find(
      (post) => post.frontmatter.category === category && post.slug === slug,
    ) ?? null
  );
}

export function getPostsByCategory(category: PublicCategorySlug) {
  return getPublicPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(post: Post) {
  const posts = getPublicPosts();
  return post.frontmatter.relatedPosts
    .map((slug) => posts.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Post => Boolean(candidate));
}

