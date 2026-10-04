import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { getSeriesEssay } from "@/lib/essays/series";
import coverage from "@/assets/fonts/series-font-provenance.json";
export const alt = "Biz2Lab 지식 에세이 · 원자료에서 시작하는 질문";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";
export default async function SocialImage({ params }: { params: Promise<{ slug: string }> }) {
  const essay = getSeriesEssay((await params).slug);
  if (!essay || essay.slug === "antikythera") notFound();
  const text = `Biz2Lab 지식 에세이${essay.theme}${essay.title}${essay.question}원자료에서 시작하는 질문${essay.order}`;
  const glyphs = new Set(coverage.coveredCodepoints);
  if ([...text].some(char => !/\s/.test(char) && !glyphs.has(char.codePointAt(0)!))) throw new Error("원고 제목 변경 후 공유 이미지 글꼴 범위를 다시 확인해야 합니다.");
  const font = await readFile(join(process.cwd(), "assets/fonts/NotoSansKR-series-subset.woff"));
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 62, background: "#f7f4ed", color: "#202b2c", fontFamily: "Noto Sans KR", justifyContent: "space-between", borderTop: "12px solid #8c451e" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25 }}><div>Biz2Lab 지식 에세이</div><div style={{ color: "#8c451e" }}>{essay.theme}</div></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}><div style={{ display: "flex", fontSize: 56, lineHeight: 1.45, wordBreak: "keep-all" }}>{essay.title}</div><div style={{ display: "flex", fontSize: 25, lineHeight: 1.7, color: "#566262" }}>{essay.question}</div></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#566262" }}><div>원자료에서 시작하는 질문</div><div>{String(essay.order).padStart(2, "0")}</div></div>
  </div>, { ...size, fonts: [{ name: "Noto Sans KR", data: font, weight: 600, style: "normal" }] });
}
