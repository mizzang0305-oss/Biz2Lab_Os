import { affiliateDisclosure, type LivingPost } from "@/lib/living-posts";
import Link from "next/link";

export type LivingArticleContent = Pick<LivingPost, "title" | "summary" | "productName" | "publishedAt" | "facts" | "selectionTips" | "limitations" | "affiliateUrl">;

export function LivingArticle({ post }: { post: LivingArticleContent }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 text-slate-800 sm:px-6 sm:py-12" data-living-article>
      <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-base font-semibold leading-7 text-slate-950" data-affiliate-disclosure>
        {affiliateDisclosure}
      </p>
      <header className="mt-7">
        <p className="text-sm font-semibold text-amber-800">생활용품 · 제휴 게시물</p>
        <h1 className="mt-3 text-3xl font-bold leading-snug text-slate-950 sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8">{post.summary}</p>
        <p className="mt-4 text-sm text-slate-600">게시일 <time dateTime={post.publishedAt}>{post.publishedAt}</time></p>
        <p className="mt-4 border-l-4 border-slate-300 pl-4 text-base leading-7">
          이 글은 생활용품을 살펴보는 제휴 안내입니다. 건강교육 글과 별도로 작성하며, 의료인 검수나 건강상의 효능을 근거로 상품을 추천하지 않습니다.
        </p>
      </header>
      <div className="mt-8 space-y-8 text-base leading-8 sm:text-lg">
        <section aria-labelledby="living-facts">
          <h2 id="living-facts" className="text-2xl font-bold text-slate-950">확인한 상품 정보</h2>
          <p className="mt-3 font-semibold">{post.productName}</p>
          <ul className="mt-3 list-disc space-y-4 pl-5">
            {post.facts.map((fact, index) => (
              <li key={index}>
                <p>{fact.text}</p>
                <a className="text-base text-teal-800 underline underline-offset-4" href={fact.sourceUrl} target="_blank" rel="noopener noreferrer">
                  정보 출처 {index + 1} 확인 (새 창)
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="living-selection">
          <h2 id="living-selection" className="text-2xl font-bold text-slate-950">선택 전에 살펴볼 점</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5">{post.selectionTips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
        </section>
        <section aria-labelledby="living-limits">
          <h2 id="living-limits" className="text-2xl font-bold text-slate-950">확인 범위와 한계</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5">{post.limitations.map((limit, index) => <li key={index}>{limit}</li>)}</ul>
          <p className="mt-4">가격·배송·구성은 바뀔 수 있습니다. 주문 전 판매 페이지에서 현재 정보를 확인하세요.</p>
        </section>
        <aside className="rounded-xl border border-slate-300 bg-white p-5" aria-label="제휴 상품 링크">
          <p className="text-base leading-7">아래 링크는 쿠팡 파트너스 제휴 링크입니다.</p>
          <a href={post.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-center text-base font-semibold leading-7 text-white hover:bg-slate-700">
            쿠팡에서 {post.productName} 정보 확인 (새 창)
          </a>
        </aside>
      </div>
      <nav className="mt-10 border-t border-slate-300 pt-4" aria-label="생활용품 탐색">
        <Link href="/living" className="inline-flex min-h-11 items-center text-base font-semibold text-teal-800 underline underline-offset-4">생활용품 목록으로 돌아가기</Link>
      </nav>
    </article>
  );
}
