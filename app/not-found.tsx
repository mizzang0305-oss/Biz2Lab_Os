import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-5">
      <p className="text-sm font-semibold text-teal-700">404 · 페이지를 찾을 수 없습니다</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
        검토가 끝난 핵심 글만 공개하고 있습니다
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">
        이전에 공개됐던 일부 도구 비교 또는 계약·결제 글은 정확성과 실용성을 다시 확인하기 위해
        비공개 검토 상태로 전환했습니다. 아래에서 현재 공개 중인 글과 자료를 확인해 주세요.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/ko"
          className="rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          홈으로 이동
        </Link>
        <Link
          href="/ko/resources"
          className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-600 hover:text-teal-700"
        >
          실무 자료실 보기
        </Link>
      </div>
    </main>
  );
}
