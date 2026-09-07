import type { HealthSection } from "@/lib/health-v3/content";

export function HealthComparisonTable({ table }: { table: NonNullable<HealthSection["table"]> }) {
  if (table.rows.some(row => row.length !== table.columns.length)) throw new Error(`Invalid comparison columns: ${table.caption}`);
  return <div className="onurim-explainer-table" role="region" aria-label={table.caption} tabIndex={0}>
    <table role="table">
      <caption>{table.caption}</caption>
      <thead role="rowgroup"><tr role="row">{table.columns.map(column => <th role="columnheader" scope="col" key={column}>{column}</th>)}</tr></thead>
      <tbody role="rowgroup">{table.rows.map(row => <tr role="row" key={row[0]}>{row.map((cell, index) => index === 0
        ? <th role="rowheader" scope="row" key={index}>{cell}</th>
        : <td role="cell" key={index}><span className="onurim-mobile-column" aria-hidden="true">{table.columns[index]}</span>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
