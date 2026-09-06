import Link from "next/link";

import { PrintButton } from "@/components/health/PrintButton";
import { healthArticles, type HealthTool } from "@/lib/health-v3/content";
import { getToolSafetyNotice, getToolSources, toolEditorial } from "@/lib/health-v3/tool-editorial";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function HealthToolPage({ tool }: { tool: HealthTool }) {
  const editorial = toolEditorial[tool.slug];
  const sources = getToolSources(tool);
  const parent = healthArticles[tool.articleSlug];
  const emergency = getToolSafetyNotice(tool);
  const itemGroups = tool.itemGroups ?? (tool.items ? [{ title: "", items: tool.items }] : []);
  return (
    <article className={`onurim-tool-page${tool.kind === "warning" ? " onurim-warning-card" : ""}`} data-claim-ids={tool.claimIds.join(",")}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
        { name: "오누림", url: absoluteUrl("/") },
        { name: parent.title, url: absoluteUrl(`/health/${tool.articleSlug}`) },
        { name: tool.title, url: absoluteUrl(`/health/tools/${tool.slug}`) },
      ])) }} />
      <header className="onurim-tool-header">
        <p className="onurim-eyebrow">오누림 인쇄·기록 도구</p>
        <h1>{tool.title}</h1>
        <p>{editorial?.description ?? tool.description}</p>
        <p className="onurim-tool-format">{tool.kind === "warning" ? "이 카드는 입력·체크·저장 기능이 없는 인쇄용 안내입니다. 위급한 상황에서는 인쇄보다 119 도움 요청이 먼저입니다." : "빈칸은 인쇄한 뒤 손으로 작성합니다. 화면의 체크는 임시 표시이며 저장·제출 기능이 없습니다. 개인정보를 공개 문의 채널에 올리지 마세요."}</p>
        {editorial ? <p className="onurim-tool-date">양식·안내 수정 <time dateTime={editorial.updatedAt}>{editorial.updatedAt}</time> · 비의료인 편집 · 면허 의료인 검수 미완료</p> : null}
        <div className="onurim-tool-actions">
          <PrintButton />
          <Link href={`/health/${tool.articleSlug}`}>{parent.title} 해설 읽기</Link>
        </div>
      </header>

      {emergency ? (
        <section id="urgent-action" className="onurim-emergency-action">
          <h2>{emergency.title}</h2>
          {tool.kind === "warning" && editorial ? <p>{editorial.limitation}</p> : null}
          {emergency.paragraphs?.map(text => <p key={text}>{text}</p>)}
          {emergency.bullets?.length ? <ul>{emergency.bullets.map(text => <li key={text}>{text}</li>)}</ul> : null}
          <p>{tool.kind === "warning" ? "카드를 읽거나 출력하는 것은 도움 요청의 조건이 아닙니다." : "이 양식을 다 쓰는 것은 도움 요청의 조건이 아닙니다."}</p>
          <Link href={`/health/${tool.articleSlug}`}>이 질환 안내의 위험 신호와 도움 요청 행동</Link>
        </section>
      ) : null}

      {editorial ? (
        <section className="onurim-tool-instructions" aria-labelledby="tool-instructions">
          <h2 id="tool-instructions">이 양식을 쓰는 때와 순서</h2>
          <p>{editorial.purpose}</p>
          <ol>{editorial.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <div className="onurim-tool-example"><h3>{tool.kind === "warning" ? "기억용 카드이지 검사표가 아닙니다" : "어디에 무엇을 적나요?"}</h3><p>{editorial.example}</p></div>
          {tool.kind !== "warning" ? <p>{editorial.limitation}</p> : null}
        </section>
      ) : null}

      {tool.kind !== "warning" ? <section className="onurim-print-sheet" aria-labelledby="print-sheet-title">
        <h2 id="print-sheet-title">인쇄해서 작성할 양식</h2>
        {editorial?.sheetNotice ? <p className="onurim-tool-sheet-notice">{editorial.sheetNotice}</p> : null}
        <div className="onurim-print-intro">
          <p><strong>구분 표시(실명 불필요):</strong> ____________________</p>
          <p><strong>작성 날짜·기간:</strong> ____________________</p>
        </div>

        {tool.kind === "log" && tool.columns ? (
          <div>
          <p className="onurim-table-help">작은 화면에서는 표를 좌우로 움직여 모든 열을 확인하세요. 빈칸은 인쇄 후 작성합니다.</p>
          <div className="onurim-table-scroll" tabIndex={0} role="region" aria-label="기록표 전체 열: 작은 화면에서는 좌우로 이동">
            <table>
              <caption>{tool.title} · 한 줄씩 실제 관찰을 기록</caption>
              <thead><tr>{tool.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
              <tbody>
                {Array.from({ length: tool.rows ?? 8 }, (_, row) => (
                    <tr key={row}>{tool.columns?.map((column) => <td key={column} aria-label={`${row + 1}행 ${column}, 인쇄 후 작성`} />)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        ) : null}

        {tool.fields?.length ? (
          <dl className="onurim-tool-fields">
            {tool.fields.map(field => <div key={field}><dt>{field}</dt><dd aria-label={`${field}, 인쇄 후 작성`} /></div>)}
          </dl>
        ) : null}

        {itemGroups.map((group, groupIndex) => (
          <div className="onurim-tool-item-group" key={group.title || groupIndex}>
          {group.title ? <h3>{group.title}</h3> : null}
          <div className={tool.kind === "warning" ? "onurim-warning-list" : "onurim-check-list"}>
            {group.items.map((item) => (
              <label key={item}>
                {tool.kind !== "guide" && tool.kind !== "warning" ? <input type="checkbox" /> : <span aria-hidden>•</span>}
                <span>{item}</span>
              </label>
            ))}
          </div>
          </div>
        ))}

        {tool.kind === "questions" ? (
          <div className="onurim-notes-area">
            <p>의료진의 답과 다음에 확인할 내용</p>
            <div /><div /><div /><div />
          </div>
        ) : null}

      </section> : null}

      {editorial?.links.length ? <section className="onurim-tool-related" aria-label="양식과 함께 읽을 안내">
        <h2>기록을 이해하고 질문으로 옮기기</h2>
        <ul>{editorial.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
      </section> : null}

      <footer className="onurim-tool-footer">
        {editorial ? <p>{tool.title} · 양식·안내 수정 {editorial.updatedAt}</p> : null}
        <p>교육·기록용 · 진단 결과 없음 · 약물 결정 없음 · 서버 저장 없음</p>
        <p>공식 출처 연결과 면허 의료인 검수는 다릅니다. 일반 건강교육 · 면허 의료인 검수 미완료</p>
        <ul className="onurim-source-list">{sources.map(source => (
          <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.organization} — {source.title}</a></li>
        ))}</ul>
        <p><Link href="/health/trust/medical-review-policy">의료 검토 상태</Link> · <Link href="/health/trust/privacy">기록·개인정보 안내</Link></p>
      </footer>
    </article>
  );
}
