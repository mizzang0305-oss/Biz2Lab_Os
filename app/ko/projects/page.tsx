import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getEvidenceForPost } from "@/lib/evidence";
import { publicProjects } from "@/lib/public-projects";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "업무 자동화 프로젝트 기록",
  description:
    "Biz2Lab 운영자가 공개한 자동화 통제, 소상공인 운영 SaaS와 승인·감사 시스템의 구현 범위, 확인 가능한 근거와 한계를 정리합니다.",
  path: "/ko/projects",
});

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-5 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold text-teal-700">공개 코드 기반 프로젝트 기록</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
          무엇을 만들었고 어디까지 검증했는가
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          아래 기록은 제품 홍보나 고객 성공 사례가 아닙니다. 공개 저장소에서 확인할 수
          있는 구현 범위, 그 과정에서 얻은 운영 기준과 아직 확인하지 않은 결과를 함께
          정리합니다.
        </p>
      </header>

      <div className="mt-10 grid gap-6">
        {publicProjects.map((project) => {
          const evidence = project.evidenceSlug
            ? getEvidenceForPost(project.evidenceSlug)[0]
            : undefined;

          return (
          <article key={project.repository} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-700">{project.repository}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{project.name}</h2>
              </div>
              {project.url ? (
                <a
                  className="inline-flex shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:border-teal-600 hover:text-teal-700"
                  href={project.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  공개 저장소 보기
                </a>
              ) : (
                <span className="inline-flex shrink-0 rounded-md border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                  비공개 구현 · 링크 없음
                </span>
              )}
            </div>
            {evidence ? (
              <figure className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                {evidence.status === "candidate" ? (
                  <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900">
                    공개 전 검토 중 · Preview 전용
                  </div>
                ) : null}
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={evidence.image}
                    alt={evidence.altKo}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 896px, 100vw"
                  />
                </div>
                <figcaption className="border-t border-slate-200 px-4 py-3 text-sm leading-6 text-slate-600">
                  {evidence.captionKo}
                </figcaption>
              </figure>
            ) : null}
            <p className="mt-5 leading-7 text-slate-700">{project.summary}</p>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-teal-50 p-4">
                <dt className="font-bold text-slate-950">확인 가능한 구현</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">{project.verified}</dd>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <dt className="font-bold text-slate-950">확대 해석하지 않는 범위</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">{project.boundary}</dd>
              </div>
            </dl>
            <Link
              href={project.relatedArticle}
              className="mt-5 inline-flex text-sm font-semibold text-teal-700 hover:underline"
            >
              {project.relatedLabel}
            </Link>
          </article>
          );
        })}
      </div>

      <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-950">프로젝트 근거를 글에 쓰는 원칙</h2>
        <ul className="mt-4 grid gap-2 leading-7 text-slate-700">
          <li>공개 코드나 문서로 확인할 수 있는 구현만 직접 경험으로 표시합니다.</li>
          <li>local·demo·synthetic 검증을 production 운영 성과로 바꾸어 표현하지 않습니다.</li>
          <li>테스트 개수보다 어떤 실패를 막고 어떤 상태를 남겼는지 설명합니다.</li>
          <li>가격, 정책과 외부 API 동작은 글을 수정할 때 공식 자료를 다시 확인합니다.</li>
        </ul>
      </section>
    </main>
  );
}
