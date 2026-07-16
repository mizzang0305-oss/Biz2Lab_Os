"use client";

import { ArrowRight, Calculator, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const moodOptions = [
  {
    id: "light",
    label: "가볍게 웃고 싶어요",
    result: "피곤한 밤 영화 고르기",
    href: "/ko/what-to-watch/tired-after-work-movie-guide",
  },
  {
    id: "together",
    label: "누군가와 편하게 보고 싶어요",
    result: "가족 영화 밤 합의하기",
    href: "/ko/what-to-watch/family-movie-night-guide",
  },
  {
    id: "think",
    label: "보고 나서 이야기하고 싶어요",
    result: "엔딩 뒤의 이야기",
    href: "/ko/after-the-credits",
  },
  {
    id: "tense",
    label: "긴장감이 필요해요",
    result: "공포영화 강도 고르기",
    href: "/ko/what-to-watch/horror-movie-intensity-guide",
  },
] as const;

export function ViewingTools() {
  const [selectedMood, setSelectedMood] = useState<(typeof moodOptions)[number] | null>(null);
  const [availableMinutes, setAvailableMinutes] = useState("120");
  const [breakMinutes, setBreakMinutes] = useState("15");
  const [monthlyCost, setMonthlyCost] = useState("30000");
  const [activeMonths, setActiveMonths] = useState("12");

  const runtime = useMemo(() => {
    const available = Math.max(0, Number(availableMinutes) || 0);
    const rest = Math.max(0, Number(breakMinutes) || 0);
    return Math.max(0, Math.floor(available - rest));
  }, [availableMinutes, breakMinutes]);

  const annualCost = useMemo(() => {
    const monthly = Math.max(0, Number(monthlyCost) || 0);
    const months = Math.min(12, Math.max(0, Number(activeMonths) || 0));
    return monthly * months;
  }, [monthlyCost, activeMonths]);

  const runtimeRecommendation =
    runtime <= 100
      ? {
          href: "/ko/what-to-watch/ninety-minute-movie-guide",
          label: "90분 안쪽 영화 보기",
        }
      : {
          href: "/ko/what-to-watch",
          label: "이 시간에 맞는 영화 보기",
        };

  return (
    <div className="grid gap-6">
      <section
        aria-labelledby="viewing-tools-guide"
        className="rounded-[1.5rem] border border-[#eadfe8] bg-white p-5 shadow-[0_18px_45px_rgba(50,31,64,0.06)] sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-[#ef5b3f]">이 페이지 사용법</p>
            <h2 id="viewing-tools-guide" className="mt-1 text-xl font-black text-[#20162c] sm:text-2xl">
              필요한 도구 하나만 골라보세요
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#675f72]">
              기분으로 작품을 고르거나, 남은 시간·구독 비용을 계산한 뒤 관련 글로 바로 이어집니다.
            </p>
          </div>
          <p className="w-fit shrink-0 rounded-full bg-[#fff4ef] px-4 py-2 text-xs font-black text-[#b63e26]">
            입력값은 저장되지 않아요
          </p>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-orange-200 bg-orange-50 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-700">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-orange-700">30초 취향 질문</p>
            <h2 className="text-2xl font-black text-[#20162c]">오늘 어떤 기분으로 끝내고 싶나요?</h2>
            <p className="mt-1 text-sm text-[#675f72]">한 가지를 고르면 바로 이어서 볼 글을 알려드려요.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {moodOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={selectedMood?.id === option.id}
              onClick={() => setSelectedMood(option)}
              className={`rounded-2xl border p-4 text-left text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                selectedMood?.id === option.id
                  ? "border-orange-500 bg-white text-orange-800 shadow-sm"
                  : "border-orange-200 bg-white/70 text-[#514858] hover:border-orange-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div
          aria-live="polite"
          className={`mt-5 rounded-2xl border p-5 ${
            selectedMood ? "border-[#20162c] bg-[#20162c] text-white" : "border-orange-200 bg-white text-[#20162c]"
          }`}
        >
          {selectedMood ? (
            <>
              <p className="text-sm text-white/60">지금 읽기 좋은 편집 노트</p>
              <p className="mt-1 text-xl font-black">{selectedMood.result}</p>
              <Link
                href={selectedMood.href}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff8a65] px-5 py-3 text-sm font-black text-[#20162c] transition hover:bg-[#ff9d7f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#20162c] sm:w-auto"
              >
                추천 글 보러 가기
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm font-black text-orange-700">다음 단계</p>
              <p className="mt-1 text-sm text-[#675f72]">위에서 지금 기분과 가장 가까운 항목을 하나 골라주세요.</p>
              <button
                type="button"
                disabled
                className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#eee8ec] px-5 py-3 text-sm font-black text-[#8b828a] sm:w-auto"
              >
                기분을 선택하면 다음으로
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </section>

      <section className="grid min-w-0 items-stretch gap-6 lg:grid-cols-2">
        <div className="flex h-full min-w-0 flex-col rounded-[1.5rem] border border-violet-200 bg-violet-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Clock3 aria-hidden="true" className="h-6 w-6 text-violet-700" />
            <h2 className="text-xl font-black text-[#20162c]">내가 끝까지 볼 수 있는 러닝타임</h2>
          </div>
          <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid min-w-0 gap-2 text-sm font-bold text-[#514858]">
              남은 시간(분)
              <input
                inputMode="numeric"
                value={availableMinutes}
                onChange={(event) => setAvailableMinutes(event.target.value)}
                className="w-full min-w-0 rounded-xl border border-violet-200 bg-white px-4 py-3 text-base outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold text-[#514858]">
              씻기·정리 시간(분)
              <input
                inputMode="numeric"
                value={breakMinutes}
                onChange={(event) => setBreakMinutes(event.target.value)}
                className="w-full min-w-0 rounded-xl border border-violet-200 bg-white px-4 py-3 text-base outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </label>
          </div>
          <p className="mt-5 text-sm text-[#675f72]">오늘 권장 최대 러닝타임</p>
          <p className="mt-1 text-4xl font-black text-violet-800">{runtime.toLocaleString()}분</p>
          <p className="mt-3 text-sm leading-6 text-[#675f72]">
            엔딩 크레딧과 잠깐의 휴식까지 생각하면 계산값보다 5~10분 짧은 작품이 편합니다.
          </p>
          <div className="mt-auto pt-5">
            <Link
              href={runtimeRecommendation.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-black text-white transition hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              {runtimeRecommendation.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex h-full min-w-0 flex-col rounded-[1.5rem] border border-teal-200 bg-teal-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Calculator aria-hidden="true" className="h-6 w-6 text-teal-700" />
            <h2 className="text-xl font-black text-[#20162c]">OTT 구독 유지 비용</h2>
          </div>
          <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid min-w-0 gap-2 text-sm font-bold text-[#514858]">
              한 달 총액(원)
              <input
                inputMode="numeric"
                value={monthlyCost}
                onChange={(event) => setMonthlyCost(event.target.value)}
                className="w-full min-w-0 rounded-xl border border-teal-200 bg-white px-4 py-3 text-base outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold text-[#514858]">
              1년에 유지할 개월
              <input
                inputMode="numeric"
                value={activeMonths}
                onChange={(event) => setActiveMonths(event.target.value)}
                className="w-full min-w-0 rounded-xl border border-teal-200 bg-white px-4 py-3 text-base outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              />
            </label>
          </div>
          <p className="mt-5 text-sm text-[#675f72]">예상 연간 결제액</p>
          <p className="mt-1 text-4xl font-black text-teal-800">{annualCost.toLocaleString()}원</p>
          <p className="mt-3 text-sm leading-6 text-[#675f72]">
            가격 비교나 해지 권유가 아니라, 동시에 유지할지 한 서비스씩 돌려볼지 판단하기 위한 단순 계산입니다.
          </p>
          <div className="mt-auto pt-5">
            <Link
              href="/ko/streaming-life/ott-subscription-rotation"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              구독 돌려쓰기 방법 보기
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
