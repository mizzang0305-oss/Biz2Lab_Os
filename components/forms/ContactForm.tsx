"use client";

import { useMemo, useState, type FormEvent } from "react";

type ContactPayload = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "warning"; message: string; payload: ContactPayload }
  | { kind: "error"; message: string };

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";

function getPayload(form: HTMLFormElement): ContactPayload {
  const formData = new FormData(form);
  return {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    topic: String(formData.get("topic") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  };
}

function buildMailto(payload: ContactPayload) {
  if (!CONTACT_EMAIL) return "";

  const subject = `[Biz2Lab 문의] ${payload.topic || "문의"}`;
  const body = [
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const mailtoHref = useMemo(() => {
    if (state.kind !== "warning") return "";
    return buildMailto(state.payload);
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = getPayload(form);
    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        form.reset();
        setState({
          kind: "success",
          message: "문의가 접수되었습니다. 확인 후 답변드리겠습니다.",
        });
        return;
      }

      if (response.status === 503 || data?.error === "SUPABASE_NOT_CONFIGURED") {
        setState({
          kind: "warning",
          message:
            "현재 문의 저장 기능이 설정되지 않아 자동 제출할 수 없습니다. 입력 내용은 보존되며, 연락처가 연결되면 제출 기능이 활성화됩니다.",
          payload,
        });
        return;
      }

      if (response.status === 400) {
        setState({
          kind: "error",
          message: "입력값을 확인해 주세요. 이름, 이메일, 주제, 문의 내용을 모두 입력해야 합니다.",
        });
        return;
      }

      setState({
        kind: "error",
        message: "일시적인 오류로 문의를 제출하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } catch {
      setState({
        kind: "error",
        message: "네트워크 오류로 문의를 제출하지 못했습니다. 연결 상태를 확인해 주세요.",
      });
    }
  }

  const isSubmitting = state.kind === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-5 rounded-md border border-slate-200 bg-white p-6"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-slate-800">
          이름
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-slate-800">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm font-semibold text-slate-800">
          문의 주제
        </label>
        <input
          id="topic"
          name="topic"
          required
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-slate-800">
          문의 내용
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <p className="text-sm leading-6 text-slate-500">
        제출된 정보는 문의 확인과 답변 목적으로만 사용합니다. 뉴스레터 수신은 별도 동의가
        있을 때만 처리합니다.
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "문의 보내는 중" : "문의 보내기"}
      </button>
      {state.kind !== "idle" && state.kind !== "submitting" ? (
        <div
          role={state.kind === "error" ? "alert" : "status"}
          className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
        >
          <p>{state.message}</p>
          {state.kind === "warning" && mailtoHref ? (
            <a
              href={mailtoHref}
              className="mt-3 inline-flex w-fit items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-teal-600 hover:text-teal-700"
            >
              이메일 앱으로 문의 열기
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
