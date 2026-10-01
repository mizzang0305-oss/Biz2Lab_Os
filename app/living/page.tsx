import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { livingPosts } from "@/lib/living-posts";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "생활용품 제휴 안내 | Biz2Lab" },
  description: "생활용품의 확인된 정보와 선택 전 점검할 내용을 안내하는 제휴 게시물입니다.",
  authors: [], creator: "Biz2Lab 생활용품", publisher: "Biz2Lab 생활용품",
  alternates: { canonical: absoluteUrl("/living") },
  robots: { index: false, follow: true },
  openGraph: { title: "생활용품 제휴 안내", description: "생활용품 제휴 게시물", siteName: "Biz2Lab 생활용품", url: absoluteUrl("/living"), type: "website", images: [] },
  twitter: { card: "summary", title: "생활용품 제휴 안내", images: [] },
};

export default function LivingIndexPage() {
  if (!livingPosts.length) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-950">생활용품 제휴 안내</h1>
      <p className="mt-4 text-base leading-8">건강교육 글과 별도로 작성한 생활용품 안내입니다. 각 글의 첫부분에서 쿠팡 파트너스 광고 고지를 확인할 수 있습니다.</p>
      <ul className="mt-8 grid gap-5">
        {livingPosts.map((post) => (
          <li key={post.slug} className="rounded-xl border border-slate-300 bg-white p-5">
            <p className="text-sm font-semibold text-amber-800">제휴 게시물</p>
            <Link href={`/living/${post.slug}`} className="mt-2 block text-xl font-semibold text-slate-950 underline underline-offset-4">{post.title}</Link>
            <p className="mt-3 text-base leading-7">{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
