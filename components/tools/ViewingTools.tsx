"use client";

import { Calculator, Clock3, Sparkles } from "lucide-react";
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

  return (
    <div className="grid gap-6">
      <section className="rounded-[1.5rem] border border-orange-200 bg-orange-50 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-700">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-orange-700">30초 취향 질문</p>
            <h2 className="text-2xl font-black text-[#20162c]">오늘 어떤 기분으로 끝내고 싶나요?</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {moodOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={selectedMood?.id === option.id}
              onClick={() => setSelectedMood(option)}
              className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
                selectedMood?.id === option.id
                  ? "border-orange-500 bg-white text-orange-800 shadow-sm"
                  : "border-orange-200 bg-white/70 text-[#514858] hover:border-orange-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {selectedMood ? (
          <div aria-live="polite" className="mt-5 rounded-2xl bg-[#20162c] p-5 text-white">
            <p className="text-sm text-white/60">지금 읽기 좋은 편집 노트</p>
            <p className="mt-1 text-xl font-black">{selectedMood.result}</p>
            <Link
              href={selectedMood.href}
              className="mt-4 inline-flex rounded-full bg-[#ff8a65] px-4 py-2 text-sm font-black text-[#20162c]"
            >
              결과 보러 가기
            </Link>
          </div>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-violet-200 bg-violet-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Clock3 className="h-6 w-6 text-violet-700" />
            <h2 className="text-xl font-black text-[#20162c]">내가 끝까지 볼 수 있는 러닝타임</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-[#514858]">
              남은 시간(분)
              <input
                inputMode="numeric"
                value={availableMinutes}
                onChange={(event) => setAvailableMinutes(event.target.value)}
                className="rounded-xl border border-violet-200 bg-white px-4 py-3 text-base outline-none focus:border-violet-500"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#514858]">
              씻기·정리 시간(분)
              <input
                inputMode="numeric"
                value={breakMinutes}
                onChange={(event) => setBreakMinutes(event.target.value)}
                className="rounded-xl border border-violet-200 bg-white px-4 py-3 text-base outline-none focus:border-violet-500"
              />
            </label>
          </div>
          <p className="mt-5 text-sm text-[#675f72]">오늘 권장 최대 러닝타임</p>
          <p className="mt-1 text-4xl font-black text-violet-800">{runtime.toLocaleString()}분</p>
          <p className="mt-3 text-sm leading-6 text-[#675f72]">
            엔딩 크레딧과 잠깐의 휴식까지 생각하면 계산값보다 5~10분 짧은 작품이 편합니다.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-teal-200 bg-teal-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-teal-700" />
            <h2 className="text-xl font-black text-[#20162c]">OTT 구독 유지 비용</h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-[#514858]">
              한 달 총액(원)
              <input
                inputMode="numeric"
                value={monthlyCost}
                onChange={(event) => setMonthlyCost(event.target.value)}
                className="rounded-xl border border-teal-200 bg-white px-4 py-3 text-base outline-none focus:border-teal-500"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-[#514858]">
              1년에 유지할 개월
              <input
                inputMode="numeric"
                value={activeMonths}
                onChange={(event) => setActiveMonths(event.target.value)}
                className="rounded-xl border border-teal-200 bg-white px-4 py-3 text-base outline-none focus:border-teal-500"
              />
            </label>
          </div>
          <p className="mt-5 text-sm text-[#675f72]">예상 연간 결제액</p>
          <p className="mt-1 text-4xl font-black text-teal-800">{annualCost.toLocaleString()}원</p>
          <p className="mt-3 text-sm leading-6 text-[#675f72]">
            가격 비교나 해지 권유가 아니라, 동시에 유지할지 한 서비스씩 돌려볼지 판단하기 위한 단순 계산입니다.
          </p>
        </div>
      </section>
    </div>
  );
}
