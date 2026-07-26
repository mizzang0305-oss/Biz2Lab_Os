import type { Metadata } from "next";
import Link from "next/link";

import { editorialIdentity } from "@/lib/editorial-evidence";
import { getPublicPosts } from "@/lib/posts";
import { publicProjects, representativeArticleSlugs } from "@/lib/public-projects";
import { absoluteUrl } from "@/lib/site";
import { createMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Biz2Lab 운영자",
  description:
    "Biz2Lab 운영자가 직접 개발·검증한 업무 자동화, 소상공인 SaaS와 승인·감사 시스템의 공개 근거와 작성 원칙을 소개합니다.",
  path: "/ko/author/biz2lab",
});

export default function AuthorPage() {
  const postsBySlug = new Map(getPublicPosts().map((post) => [post.slug, post]));
  const representativePosts = representativeArticleSlugs
    .map((slug) => postsBySlug.get(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: editorialIdentity.authorName,
      url: absoluteUrl(editorialIdentity.authorUrl),
      sameAs: [editorialIdentity.operatorUrl, ...publicProjects.map((project) => project.url)],
      worksFor: {
        "@type": "Organization",
        name: "Biz2Lab",
        url: absoluteUrl("/ko"),
      },
      knowsAbout: [
        "AI 업무 자동화",
        "SaaS 개발",
        "주문·영업 운영",
        "승인·감사 로그",
      ],
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-5 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(profileJsonLd) }}
      />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-teal-700">작성자·검토자</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
          {editorialIdentity.authorName}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          업무 자동화와 SaaS를 만들면서 입력 원본, 사람 승인, 실패 기록과 복구 경계를
          먼저 설계합니다. Biz2Lab에는 공개 코드나 재현 가능한 절차로 설명할 수 있는
          내용만 직접 경험으로 표시합니다.
        </p>
        <a
          className="mt-6 inline-flex rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-teal-600 hover:text-teal-700"
          href={editorialIdentity.operatorUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub 공개 활동 보기
        </a>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-950">공개 코드로 확인 가능한 작업</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {publicProjects.map((project) => (
            <article key={project.repository} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-950">{project.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{project.summary}</p>
              <a
                className="mt-4 inline-flex text-sm font-semibold text-teal-700 hover:underline"
                href={project.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.repository} 저장소
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-950">대표 글</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {representativePosts.map((post) => (
            <Link
              key={post.slug}
              href={post.route}
              className="rounded-lg border border-slate-200 p-5 transition hover:border-teal-400"
            >
              <p className="text-sm font-semibold text-teal-700">{post.categoryName}</p>
              <h3 className="mt-2 font-bold leading-6 text-slate-950">
                {post.frontmatter.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {post.frontmatter.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-slate-950">공개하지 않는 것</h2>
        <p className="mt-3 leading-7 text-slate-700">
          고객사 이름, 개인정보, 운영 비밀과 내부 매출은 공개하지 않습니다. 이를 대신해
          가상 데이터와 공개 코드로 구조를 설명하며, 실제 고객 성과를 측정하지 않았다면
          개선률이나 수익으로 확대해 말하지 않습니다.
        </p>
      </section>
    </main>
  );
}
