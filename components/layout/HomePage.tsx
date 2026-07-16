import {
  ArrowRight,
  Clock3,
  Film,
  Heart,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/cards/ArticleCard";
import { getPostsByCategory, getPublicPosts } from "@/lib/posts";
import { siteSettings } from "@/lib/site-settings";

const quickPaths = [
  {
    title: "기운이 없어요",
    description: "집중력이 길게 가지 않는 밤을 위한 짧고 편한 선택",
    href: "/ko/what-to-watch/tired-after-work-movie-guide",
    icon: Clock3,
    tone: "border-amber-200 bg-amber-50 text-amber-950",
  },
  {
    title: "같이 볼 영화가 필요해요",
    description: "가족·연인·친구 사이에서 취향 싸움을 줄이는 기준",
    href: "/ko/what-to-watch/family-movie-night-guide",
    icon: Heart,
    tone: "border-rose-200 bg-rose-50 text-rose-950",
  },
  {
    title: "결말이 계속 생각나요",
    description: "장면과 인물의 선택을 따라 엔딩을 한 번 더 읽기",
    href: "/ko/after-the-credits",
    icon: MessageCircleQuestion,
    tone: "border-violet-200 bg-violet-50 text-violet-950",
  },
  {
    title: "추천 화면이 마음에 안 들어요",
    description: "시청 기록과 프로필을 정리해 OTT 홈을 다시 내 취향으로",
    href: "/ko/streaming-life/netflix-profile-reset-recommendations",
    icon: Sparkles,
    tone: "border-teal-200 bg-teal-50 text-teal-950",
  },
] as const;

export function HomePage() {
  const publicPosts = getPublicPosts();
  const latestPosts = publicPosts.slice(0, 6);
  const interpretationPosts = getPostsByCategory("after-the-credits").slice(0, 3);
  const streamingPosts = getPostsByCategory("streaming-life").slice(0, 3);

  return (
    <div className="bg-[#fffdf9]">
      <section className="relative overflow-hidden border-b border-orange-100 bg-[#fff8ee]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-sm font-semibold text-orange-700">
              <Film className="h-4 w-4" />
              영화·OTT를 고르는 밝은 편집 매거진
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.035em] text-[#20162c] sm:text-5xl lg:text-6xl">
              오늘 뭐 볼지,
              <span className="block text-[#ef5b3f]">기분부터 물어볼게요.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#675f72]">
              {siteSettings.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={siteSettings.hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#20162c] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#ef5b3f] sm:w-auto"
              >
                {siteSettings.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteSettings.hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#20162c]/20 bg-white px-6 py-3.5 text-sm font-bold text-[#20162c] transition hover:border-[#ef5b3f] hover:text-[#ef5b3f] sm:w-auto"
              >
                {siteSettings.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-orange-200 bg-white p-5 shadow-[0_24px_80px_rgba(107,76,51,0.12)] sm:p-7">
            <p className="text-sm font-bold text-[#ef5b3f]">고르기 전에 딱 세 가지만</p>
            <div className="mt-5 grid gap-3">
              {[
                ["01", "얼마나 시간이 남았나요?", "90분, 두 시간, 정주행 중 하나만 정합니다."],
                ["02", "어떤 기분으로 끝내고 싶나요?", "웃고 싶다, 울고 싶다, 생각하고 싶다를 고릅니다."],
                ["03", "누구와 보나요?", "혼자와 함께는 좋은 영화의 기준이 다릅니다."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-[#f2e8dd] bg-[#fffdf9] p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe3d9] text-sm font-black text-[#d6422d]">
                    {number}
                  </span>
                  <div>
                    <p className="font-bold text-[#20162c]">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#716977]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-[#ef5b3f]">지금 내 상태에서 출발하기</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.025em] text-[#20162c]">
            제목보다 먼저, 오늘의 상황을 고르세요
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {quickPaths.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group rounded-[1.5rem] border p-6 transition hover:-translate-y-1 hover:shadow-lg ${item.tone}`}
              >
                <Icon className="h-6 w-6" />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-2 leading-7 opacity-75">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  바로 보기
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#eee5f4] bg-[#f8f3ff]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-violet-700">최근 편집 노트</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.025em] text-[#20162c]">
                한 편을 고르는 데 실제로 필요한 글
              </h2>
            </div>
            <Link href="/ko/what-to-watch" className="text-sm font-bold text-violet-700">
              전체 선택 가이드 보기
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 sm:py-16 lg:grid-cols-2">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-rose-600">보고 나서</p>
              <h2 className="mt-2 text-2xl font-black text-[#20162c]">엔딩 뒤의 이야기</h2>
            </div>
            <Link href="/ko/after-the-credits" className="text-sm font-bold text-rose-600">
              더 보기
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {interpretationPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-teal-700">설정부터 구독까지</p>
              <h2 className="mt-2 text-2xl font-black text-[#20162c]">덜 헤매는 OTT 생활</h2>
            </div>
            <Link href="/ko/streaming-life" className="text-sm font-bold text-teal-700">
              더 보기
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {streamingPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-orange-100 bg-[#20162c] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-5 sm:py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold text-[#ffab91]">대량 추천 대신 작은 취향부터</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.025em]">
              볼 것만 쌓지 말고, 오늘 한 편을 끝내세요.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/70">
              취향 도구는 입력값을 서버에 저장하지 않습니다. 남은 시간과 기분을 브라우저에서만
              계산해 다음 읽을 글을 제안합니다.
            </p>
          </div>
          <Link
            href="/ko/resources"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8a65] px-6 py-3.5 text-sm font-black text-[#20162c] transition hover:bg-white"
          >
            취향 도구 열기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
