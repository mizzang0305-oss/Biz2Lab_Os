import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryHubCard } from "@/components/cards/CategoryHubCard";
import { categoryList } from "@/lib/categories";
import { getPublicPosts } from "@/lib/posts";

export function HomePage() {
  const posts = getPublicPosts().slice(0, 6);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal text-slate-950 md:text-5xl">
              AI 업무 자동화로 사업 운영을 시스템화하는 방법
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              반복 업무, 매출 관리, 전자계약, 고객 관리까지 현장에서 바로 적용할
              수 있는 자동화 구조를 정리합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ko/automation"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                처음 시작하기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ko/contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-teal-700 hover:text-teal-700"
              >
                문의하기
              </Link>
            </div>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-3">
              {[
                "반복 업무를 자동화 후보로 분류",
                "매출·미수금·계약 상태를 연결",
                "글마다 관련 글과 다음 행동을 제공",
                "구글 애드센스 승인 전 공개 범위 최소화",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span className="text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">
            처음 시작하는 AI 업무 자동화
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            네 개의 허브는 업무 자동화를 현장 운영, 영업 숫자, 주문 흐름,
            계약·결제 상태로 나누어 읽을 수 있게 설계했습니다.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryList.map((category) => (
            <CategoryHubCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">최근 글</h2>
              <p className="mt-3 leading-7 text-slate-600">
                각 글은 문제, 해결 방향, 체크리스트, 관련 글, 다음 단계로
                이어지도록 구성했습니다.
              </p>
            </div>
            <Link href="/ko/automation" className="text-sm font-semibold text-teal-700">
              글 묶음 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 rounded-md border border-teal-200 bg-teal-50 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              무료 체크리스트 안내
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              다운로드 시스템은 승인 이후 단계로 두고, 현재는 글마다 바로 쓸 수
              있는 점검 항목을 제공합니다.
            </p>
          </div>
          <Link
            href="/ko/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            문의하기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
