import type { ReactNode } from "react";

type MarkdownTableNode = {
  tagName?: string;
  type?: string;
  value?: string;
  children?: MarkdownTableNode[];
};

function textFromNode(node: MarkdownTableNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return (node.children ?? []).map(textFromNode).join("").replace(/\s+/g, " ").trim();
}

function rowsFromNode(node?: MarkdownTableNode): string[][] {
  if (!node?.children) {
    return [];
  }

  const rowParents = node.children.flatMap((child) => {
    if (child.tagName === "thead" || child.tagName === "tbody") {
      return child.children ?? [];
    }
    return [child];
  });

  return rowParents
    .filter((child) => child.tagName === "tr")
    .map((row) =>
      (row.children ?? [])
        .filter((cell) => cell.tagName === "th" || cell.tagName === "td")
        .map(textFromNode),
    )
    .filter((row) => row.length > 0);
}

export function ResponsiveTable({
  children,
  node,
}: {
  children: ReactNode;
  node?: unknown;
}) {
  const rows = rowsFromNode(node as MarkdownTableNode | undefined);
  const headers = rows[0] ?? [];
  const bodyRows = rows.slice(1);

  return (
    <div className="not-prose my-7 min-w-0 max-w-full">
      <div
        className="hidden overflow-hidden rounded-md border border-slate-200 bg-white md:block"
        data-testid="responsive-table-desktop"
      >
        <table className="responsive-markdown-table">{children}</table>
      </div>

      <div className="grid min-w-0 gap-3 md:hidden" data-testid="responsive-table-mobile">
        {bodyRows.length > 0 ? (
          bodyRows.map((row, rowIndex) => (
            <div
              key={`${row.join("|")}-${rowIndex}`}
              className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-sm"
            >
              {row.map((cell, cellIndex) => (
                <div
                  key={`${headers[cellIndex] ?? cellIndex}-${cellIndex}`}
                  className="grid min-w-0 gap-1 border-t border-slate-100 py-2 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <div className="break-keep text-xs font-semibold leading-5 text-teal-700">
                    {headers[cellIndex] || `항목 ${cellIndex + 1}`}
                  </div>
                  <div className="break-keep text-sm leading-6 text-slate-700">
                    {cell}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
            표 내용을 불러올 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
