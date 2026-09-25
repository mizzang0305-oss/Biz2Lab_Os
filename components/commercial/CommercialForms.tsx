"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import type { CommercialService } from "@/lib/commercial";
import { commercialAttribution, trackCommercialEvent } from "@/lib/commercial-events";

type FormState = "idle" | "sending" | "saved" | "unavailable" | "secret_rejected" | "duplicate" | "error";

async function submitCommercial(payload: Record<string, unknown>): Promise<FormState> {
  try {
    const response = await fetch("/api/commercial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);
    if (response.status === 201 && result?.ok && result?.stored) return "saved";
    if (response.status === 400 && result?.error === "SECRET_CONTENT_REJECTED") return "secret_rejected";
    if (response.status === 409 && result?.error === "DUPLICATE_SUBMISSION") return "duplicate";
    return response.status === 503 ? "unavailable" : "error";
  } catch {
    return "error";
  }
}

function Status({ state }: { state: FormState }) {
  if (state === "idle" || state === "sending") return null;
  const messages = {
    saved: "접수가 저장되었습니다. 운영자가 확인한 뒤 안내합니다.",
    unavailable: "현재 접수 저장을 확인할 수 없습니다. 제출되지 않았으므로 나중에 다시 시도해 주세요.",
    secret_rejected: "비밀번호·API 키·토큰 등 비밀정보를 입력하지 마세요. 제거한 뒤 다시 제출해 주세요.",
    duplicate: "같은 서비스에 최근 제출한 내용이 있습니다. 10분 뒤 다시 시도해 주세요.",
    error: "제출하지 못했습니다. 입력값과 연결 상태를 확인한 뒤 다시 시도해 주세요.",
  } satisfies Record<Exclude<FormState, "idle" | "sending">, string>;
  const message = messages[state];
  return <p role={state === "saved" ? "status" : "alert"} className="mt-3 text-sm leading-6 text-slate-700">{message}</p>;
}

export function CommercialForms({ service }: { service: CommercialService }) {
  const openedAt = useRef(0);
  const inquiryStarted = useRef(false);
  const [inquiryState, setInquiryState] = useState<FormState>("idle");
  const [leadState, setLeadState] = useState<FormState>("idle");

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function handleInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setInquiryState("sending");
    const state = await submitCommercial({
      kind: "inquiry",
      service,
      name: String(fields.get("name") || "").trim(),
      email: String(fields.get("email") || "").trim(),
      message: String(fields.get("message") || "").trim(),
      consent: fields.get("consent") === "on",
      website: String(fields.get("website") || ""),
      opened_at: openedAt.current,
      ...commercialAttribution(),
    });
    setInquiryState(state);
    if (state === "saved") {
      trackCommercialEvent("inquiry_submit", service);
      form.reset();
    }
  }

  async function handleLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setLeadState("sending");
    const state = await submitCommercial({
      kind: "email_lead",
      service,
      email: String(fields.get("lead_email") || "").trim(),
      consent: fields.get("lead_consent") === "on",
      website: String(fields.get("website") || ""),
      opened_at: openedAt.current,
      ...commercialAttribution(),
    });
    setLeadState(state);
    if (state === "saved") {
      trackCommercialEvent("email_lead_submit", service);
      form.reset();
    }
  }

  return (
    <section id="inquiry" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">Next step</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-950">현재 단계에 맞는 상담을 요청하세요</h2>
      <p className="mt-3 max-w-3xl text-slate-600">제공 가능 범위와 공개 시점을 먼저 확인합니다. 고객 개인정보, 건강 기록, 결제 정보, 비밀번호, API key, token, credential 파일 내용은 입력하지 마세요.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleInquiry} onFocusCapture={() => {
          if (!inquiryStarted.current) {
            inquiryStarted.current = true;
            trackCommercialEvent("inquiry_start", service);
          }
        }} className="grid min-w-0 gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <h3 className="text-xl font-bold text-slate-950">서비스 문의</h3>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">이름<input name="name" required maxLength={120} autoComplete="name" className="min-w-0 rounded-lg border border-slate-300 px-3 py-3" /></label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">이메일<input name="email" type="email" required maxLength={240} autoComplete="email" className="min-w-0 rounded-lg border border-slate-300 px-3 py-3" /></label>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">문의 내용<textarea name="message" required minLength={10} maxLength={5000} rows={5} className="min-w-0 rounded-lg border border-slate-300 px-3 py-3" placeholder="필요한 범위와 현재 상황을 개인정보 없이 적어 주세요." /></label>
          <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="flex items-start gap-2 text-sm leading-6 text-slate-600"><input name="consent" type="checkbox" required className="mt-1" />문의 답변을 위한 이메일·서비스·유입 정보 수집에 동의합니다.</label>
          <a href="/services/privacy" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal-700 underline">수집 항목과 현재 운영 상태 보기</a>
          <button disabled={inquiryState === "sending"} className="min-h-12 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white disabled:opacity-60">{inquiryState === "sending" ? "저장 확인 중" : "문의 제출"}</button>
          <Status state={inquiryState} />
        </form>
        <form onSubmit={handleLead} className="grid min-w-0 content-start gap-4 rounded-3xl border border-teal-200 bg-teal-50 p-5 sm:p-7">
          <h3 className="text-xl font-bold text-slate-950">이메일로 다음 안내 받기</h3>
          <p className="text-sm leading-6 text-slate-600">이 서비스의 준비 상태나 상담 가능 범위가 바뀌면 연락받기 위한 별도 신청입니다. 광고성 뉴스레터 수신 동의가 아닙니다.</p>
          <label className="grid gap-1 text-sm font-semibold text-slate-700">이메일<input name="lead_email" type="email" required maxLength={240} autoComplete="email" className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-3" /></label>
          <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="flex items-start gap-2 text-sm leading-6 text-slate-600"><input name="lead_consent" type="checkbox" required className="mt-1" />선택한 서비스의 후속 안내를 위한 이메일·유입 정보 수집에 동의합니다.</label>
          <a href="/services/privacy" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal-700 underline">수집 항목과 현재 운영 상태 보기</a>
          <button disabled={leadState === "sending"} className="min-h-12 rounded-xl bg-teal-800 px-5 py-3 font-bold text-white disabled:opacity-60">{leadState === "sending" ? "저장 확인 중" : "이메일 신청"}</button>
          <Status state={leadState} />
        </form>
      </div>
    </section>
  );
}
