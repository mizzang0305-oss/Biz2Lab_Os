import Link from "next/link";

import { PrintButton } from "@/components/health/PrintButton";
import type { HealthTool } from "@/lib/health-v3/content";

export function HealthToolPage({ tool }: { tool: HealthTool }) {
  return (
    <article className="onurim-tool-page" data-claim-ids={tool.claimIds.join(",")}>
      <header className="onurim-tool-header">
        <p className="onurim-eyebrow">오누림 기록 도구</p>
        <h1>{tool.title}</h1>
        <p>{tool.description}</p>
        <div className="onurim-tool-actions">
          <PrintButton />
          <Link href={`/health/${tool.articleSlug}`}>안내 글로 돌아가기</Link>
        </div>
      </header>

      <section className="onurim-print-sheet">
        <div className="onurim-print-intro">
          <p><strong>이름 또는 표시:</strong> ____________________</p>
          <p><strong>작성 기간:</strong> ____________________</p>
        </div>

        {tool.kind === "log" && tool.columns ? (
          <div className="onurim-table-scroll">
            <table>
              <thead><tr>{tool.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>
                {Array.from({ length: tool.rows ?? 8 }, (_, row) => (
                  <tr key={row}>{tool.columns?.map((column) => <td key={column} aria-label={`${row + 1}행 ${column}`} />)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tool.items ? (
          <div className={tool.kind === "warning" ? "onurim-warning-list" : "onurim-check-list"}>
            {tool.items.map((item) => (
              <label key={item}>
                {tool.kind !== "guide" && tool.kind !== "warning" ? <input type="checkbox" /> : <span aria-hidden>•</span>}
                <span>{item}</span>
              </label>
            ))}
          </div>
        ) : null}

        {tool.kind === "questions" ? (
          <div className="onurim-notes-area">
            <p>의료진의 답과 다음에 확인할 내용</p>
            <div /><div /><div /><div />
          </div>
        ) : null}

        {tool.kind === "warning" ? (
          <div className="onurim-emergency-action">
            <strong>갑작스럽고 심한 변화가 있으면 기록을 계속하지 말고 119에 도움을 요청합니다.</strong>
            <p>이 카드는 증상으로 질환을 진단하거나 혈압 숫자만으로 응급 여부를 판정하지 않습니다.</p>
          </div>
        ) : null}
      </section>

      <footer className="onurim-tool-footer">
        <p>교육·기록용 · 진단 결과 없음 · 약물 결정 없음 · 서버 저장 없음</p>
        <p>공식 출처 연결: {tool.claimIds.join(", ")} · 일반 건강교육 · 면허 의료인 검수 미완료</p>
      </footer>
    </article>
  );
}
