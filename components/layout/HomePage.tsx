import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { CategoryHubCard } from "@/components/cards/CategoryHubCard";
import { categoryList } from "@/lib/categories";
import { getFeaturedHomePosts } from "@/lib/posts";
import { siteSettings } from "@/lib/site-settings";

export function HomePage() {
  const posts = getFeaturedHomePosts(10);
  const practicalLinks = [
    {
      title: "달성률 계산 / 매출 달성률",
      href: "/ko/sales-ops/sales-achievement-rate",
      description: "목표 대비 실적, 부족 금액, 남은 영업일을 계산하는 기준",
    },
    {
      title: "매일 확인해야 할 숫자",
      href: "/ko/small-business/daily-numbers-for-small-business",
      description: "매출, 주문, 입금, 예약, 미처리 업무를 하루 단위로 확인",
    },
    {
      title: "미수금 관리 체크리스트",
      href: "/ko/sales-ops/accounts-receivable-tracker",
      description: "청구일, 약속일, 경과일, 담당자 후속 조치를 한 표로 정리",
    },
    {
      title: "주문 채널 통합",
      href: "/ko/small-business/unify-order-channels",
      description: "전화, 메시지, 현장 주문을 누락 없이 확인하는 기준",
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-20">
          <div className="min-w-0">
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-5xl">
              {siteSettings.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {siteSettings.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={siteSettings.hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
              >
                {siteSettings.hero.primaryCta.label} <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href={siteSettings.hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-teal-700 hover:text-teal-700 sm:w-auto"
              >
                {siteSettings.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-md border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="grid gap-3">
              {siteSettings.hero.bullets.map((item) => (
                <div key={item} className="flex min-w-0 items-start gap-3 rounded-md bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <span className="min-w-0 text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl min-w-0">
            <h2 className="text-2xl font-bold tracking-normal text-slate-950">
              바로 확인하는 실무 기준
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Biz2Lab은 도구 이름을 나열하는 블로그가 아니라, 매일 놓치면 손해가 되는 숫자와 확인 기준을
              먼저 정리합니다.
            </p>
          </div>
          <Link href="/ko/resources" className="shrink-0 text-sm font-semibold text-teal-700">
            실무 자료실 보기
          </Link>
        </div>
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {practicalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="max-w-2xl min-w-0">
          <h2 className="text-2xl font-bold tracking-normal text-slate-950">
            처음 시작하는 AI 업무 자동화
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            네 개의 허브는 업무 자동화를 현장 운영, 영업 숫자, 주문 흐름,
            계약·결제 상태로 나누어 읽을 수 있게 설계했습니다.
          </p>
        </div>
        <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryList.map((category) => (
            <CategoryHubCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">최근 글</h2>
              <p className="mt-3 leading-7 text-slate-600">
                각 글은 문제, 해결 방향, 체크리스트, 관련 글, 다음 단계로
                이어지도록 구성했습니다.
              </p>
            </div>
            <Link href="/ko/automation" className="shrink-0 text-sm font-semibold text-teal-700">
              글 묶음 보기
            </Link>
          </div>
          <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-14">
        <div className="grid min-w-0 gap-6 rounded-md border border-teal-200 bg-teal-50 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="min-w-0">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            문의하기 <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
