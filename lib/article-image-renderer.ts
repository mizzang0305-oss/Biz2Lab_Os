import type { ArticleImageConcept } from "@/lib/article-image-concepts";

const WIDTH = 1200;
const HEIGHT = 675;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function text(
  x: number,
  y: number,
  value: string,
  {
    size = 24,
    weight = 700,
    color = "#1e293b",
    anchor = "start",
  }: { size?: number; weight?: number; color?: string; anchor?: "start" | "middle" | "end" } = {},
) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="${size}" font-weight="${weight}">${escapeXml(value)}</text>`;
}

function card(
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  concept: ArticleImageConcept,
  options: { fill?: string; accent?: string; icon?: "dot" | "check" | "calendar" | "doc" } = {},
) {
  const accent = options.accent ?? concept.palette.accent;
  const fill = options.fill ?? "#ffffff";
  const icon = options.icon ?? "dot";
  const iconSvg =
    icon === "check"
      ? `<path d="M${x + 26} ${y + 42} l9 10 l20 -27" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
      : icon === "calendar"
        ? `<rect x="${x + 22}" y="${y + 22}" width="42" height="38" rx="8" fill="${accent}" opacity="0.14"/><path d="M${x + 30} ${y + 35} h26 M${x + 36} ${y + 25} v10 M${x + 50} ${y + 25} v10" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>`
        : icon === "doc"
          ? `<path d="M${x + 24} ${y + 22} h34 l14 14 v30 h-48 z" fill="${accent}" opacity="0.14"/><path d="M${x + 58} ${y + 22} v14 h14" fill="none" stroke="${accent}" stroke-width="3"/>`
          : `<circle cx="${x + 43}" cy="${y + 43}" r="15" fill="${accent}" opacity="0.14"/><circle cx="${x + 43}" cy="${y + 43}" r="6" fill="${accent}"/>`;

  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="18" fill="${fill}" stroke="#d8e2e7" stroke-width="2"/>
      ${iconSvg}
      ${text(x + 82, y + 52, label, { size: 23, color: concept.palette.deep })}
      <rect x="${x + 26}" y="${y + height - 28}" width="${Math.max(72, width - 92)}" height="8" rx="4" fill="${accent}" opacity="0.2"/>
    </g>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, concept: ArticleImageConcept) {
  return `<path d="M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" stroke="${concept.palette.accent}" stroke-width="4" fill="none" stroke-linecap="round" marker-end="url(#arrow)"/>`;
}

function metricTile(x: number, y: number, label: string, concept: ArticleImageConcept, width = 160) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="116" rx="18" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${text(x + 24, y + 42, label, { size: 22, color: concept.palette.deep })}
      <rect x="${x + 24}" y="${y + 66}" width="${width - 58}" height="12" rx="6" fill="${concept.palette.soft}"/>
      <rect x="${x + 24}" y="${y + 66}" width="${Math.round((width - 58) * 0.58)}" height="12" rx="6" fill="${concept.palette.accent}"/>
    </g>`;
}

function drawMatrix(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <rect x="108" y="132" width="520" height="420" rx="26" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <path d="M180 498 V190 H568" stroke="${concept.palette.deep}" stroke-width="4" stroke-linecap="round"/>
      <path d="M180 344 H568 M374 190 V498" stroke="#cbd5e1" stroke-width="2"/>
      ${text(228, 238, concept.labels[0], { size: 22, color: concept.palette.deep })}
      ${text(438, 238, concept.labels[1], { size: 22, color: concept.palette.deep })}
      ${text(228, 452, concept.labels[2], { size: 22, color: concept.palette.deep })}
      ${text(438, 452, concept.labels[3], { size: 22, color: concept.palette.deep })}
      <circle cx="478" cy="278" r="20" fill="${concept.palette.warm}"/>
      <circle cx="284" cy="408" r="16" fill="${concept.palette.accent}"/>
      <circle cx="510" cy="424" r="13" fill="${concept.palette.accent}" opacity="0.7"/>
      <circle cx="302" cy="270" r="12" fill="${concept.palette.deep}" opacity="0.35"/>
      ${card(705, 154, 322, 88, concept.labels[2], concept, { icon: "check" })}
      ${card(756, 292, 322, 88, concept.labels[0], concept, { fill: concept.palette.soft })}
      ${card(705, 430, 322, 88, concept.labels[3], concept, { icon: "calendar" })}
    </g>`;
}

function drawDocuments(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <rect x="112" y="150" width="250" height="330" rx="22" fill="#ffffff" stroke="#d8e2e7" stroke-width="2" transform="rotate(-4 112 150)"/>
      <rect x="156" y="124" width="250" height="330" rx="22" fill="#f8fafc" stroke="#d8e2e7" stroke-width="2" transform="rotate(5 156 124)"/>
      <rect x="202" y="158" width="250" height="330" rx="22" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${text(246, 220, concept.labels[0], { color: concept.palette.deep })}
      <rect x="246" y="258" width="138" height="10" rx="5" fill="${concept.palette.accent}" opacity="0.45"/>
      <rect x="246" y="286" width="168" height="10" rx="5" fill="#cbd5e1"/>
      <rect x="246" y="314" width="116" height="10" rx="5" fill="#cbd5e1"/>
      <path d="M520 312 l82 64 l-82 64 z" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="3"/>
      ${text(562, 384, concept.labels[2], { size: 20, anchor: "middle", color: concept.palette.deep })}
      <rect x="726" y="154" width="314" height="370" rx="26" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${text(772, 218, concept.labels[3], { color: concept.palette.deep })}
      ${metricTile(770, 258, concept.labels[1], concept, 222)}
      ${metricTile(770, 404, concept.labels[2], concept, 222)}
    </g>`;
}

function drawSpreadsheet(concept: ArticleImageConcept) {
  const rows = Array.from({ length: 6 }, (_, index) => {
    const y = 198 + index * 48;
    return `<rect x="112" y="${y}" width="560" height="42" fill="${index % 2 ? "#ffffff" : "#f8fafc"}" stroke="#d8e2e7"/><rect x="132" y="${y + 14}" width="${110 + index * 12}" height="8" rx="4" fill="${index === 1 ? concept.palette.accent : "#cbd5e1"}"/><rect x="392" y="${y + 12}" width="96" height="18" rx="9" fill="${index % 3 === 0 ? concept.palette.soft : "#e2e8f0"}"/>`;
  }).join("");

  return `
    <g data-family="${concept.visualFamily}">
      <rect x="92" y="134" width="612" height="390" rx="24" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <rect x="112" y="158" width="560" height="40" rx="12" fill="${concept.palette.deep}"/>
      ${text(146, 185, concept.labels[0], { size: 18, color: "#ffffff" })}
      ${rows}
      <rect x="760" y="154" width="310" height="150" rx="24" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="2"/>
      ${text(806, 218, concept.labels[1], { size: 26, color: concept.palette.deep })}
      <rect x="804" y="246" width="188" height="10" rx="5" fill="${concept.palette.accent}" opacity="0.5"/>
      <rect x="816" y="354" width="250" height="120" rx="24" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${text(860, 418, concept.labels[2], { size: 24, color: concept.palette.deep })}
      ${arrow(704, 328, 760, 228, concept)}
      ${arrow(704, 384, 816, 414, concept)}
    </g>`;
}

function drawGraph(concept: ArticleImageConcept) {
  const nodes = [
    [250, 210, concept.labels[0]],
    [505, 168, concept.labels[1]],
    [710, 302, concept.labels[2]],
    [470, 462, concept.labels[3]],
    [870, 468, concept.labels[0]],
  ] as const;
  return `
    <g data-family="${concept.visualFamily}">
      ${nodes
        .map(([x1, y1], index) =>
          nodes
            .slice(index + 1)
            .map(([x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#cbd5e1" stroke-width="3"/>`)
            .join(""),
        )
        .join("")}
      ${nodes
        .map(([x, y, label], index) => `
          <g>
            <circle cx="${x}" cy="${y}" r="${index === 2 ? 72 : 58}" fill="${index === 2 ? concept.palette.soft : "#ffffff"}" stroke="${concept.palette.accent}" stroke-width="3"/>
            ${text(x, y + 8, label, { anchor: "middle", color: concept.palette.deep })}
          </g>`)
        .join("")}
      <rect x="122" y="512" width="264" height="72" rx="18" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <rect x="156" y="542" width="170" height="10" rx="5" fill="${concept.palette.accent}" opacity="0.45"/>
    </g>`;
}

function drawChecklist(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <rect x="156" y="112" width="430" height="480" rx="32" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <rect x="268" y="92" width="206" height="58" rx="18" fill="${concept.palette.deep}"/>
      ${concept.labels
        .map((label, index) => {
          const y = 196 + index * 86;
          return `<path d="M214 ${y} l14 14 l30 -42" fill="none" stroke="${index === 1 ? concept.palette.warm : concept.palette.accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>${text(296, y + 12, label, { color: concept.palette.deep })}<rect x="296" y="${y + 34}" width="${170 + index * 26}" height="10" rx="5" fill="#cbd5e1"/>`;
        })
        .join("")}
      <rect x="704" y="168" width="330" height="128" rx="26" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="2"/>
      <rect x="736" y="344" width="260" height="170" rx="26" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${text(770, 236, concept.labels[1], { color: concept.palette.deep })}
      ${text(786, 432, concept.labels[3], { color: concept.palette.deep })}
    </g>`;
}

function drawKanban(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      ${concept.labels
        .map((label, index) => {
          const x = 112 + index * 255;
          const cards = Array.from({ length: 4 - Math.min(index, 2) }, (_, cardIndex) => {
            const y = 226 + cardIndex * 70;
            return `<rect x="${x + 24}" y="${y}" width="176" height="48" rx="12" fill="#ffffff" stroke="#d8e2e7"/><rect x="${x + 46}" y="${y + 20}" width="${82 + cardIndex * 18}" height="8" rx="4" fill="${index === 3 ? concept.palette.warm : concept.palette.accent}" opacity="0.38"/>`;
          }).join("");
          return `<rect x="${x}" y="152" width="224" height="380" rx="24" fill="${index === 3 ? concept.palette.soft : "#f8fafc"}" stroke="#d8e2e7" stroke-width="2"/>${text(x + 112, 198, label, { anchor: "middle", color: concept.palette.deep })}${cards}`;
        })
        .join("")}
    </g>`;
}

function drawTimeline(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <path d="M154 340 H1038" stroke="${concept.palette.accent}" stroke-width="8" stroke-linecap="round"/>
      ${concept.labels
        .map((label, index) => {
          const x = 184 + index * 280;
          return `<circle cx="${x}" cy="340" r="26" fill="#ffffff" stroke="${concept.palette.accent}" stroke-width="6"/>${card(x - 96, index % 2 ? 388 : 168, 192, 106, label, concept, { icon: index % 2 ? "calendar" : "doc" })}`;
        })
        .join("")}
      <rect x="862" y="486" width="220" height="58" rx="18" fill="${concept.palette.deep}" opacity="0.92"/>
      ${text(972, 523, concept.labels[3], { anchor: "middle", size: 20, color: "#ffffff" })}
    </g>`;
}

function drawBoard(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <rect x="116" y="132" width="660" height="418" rx="28" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${concept.labels
        .map((label, index) => {
          const y = 178 + index * 84;
          return `<rect x="152" y="${y}" width="584" height="58" rx="16" fill="${index === 0 ? concept.palette.soft : "#f8fafc"}" stroke="#d8e2e7"/><circle cx="188" cy="${y + 29}" r="10" fill="${index === 0 ? concept.palette.warm : concept.palette.accent}"/>${text(224, y + 38, label, { size: 22, color: concept.palette.deep })}<rect x="510" y="${y + 23}" width="160" height="10" rx="5" fill="#cbd5e1"/>`;
        })
        .join("")}
      <rect x="842" y="170" width="220" height="300" rx="26" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="2"/>
      ${text(952, 308, concept.labels[3], { anchor: "middle", size: 28, color: concept.palette.deep })}
      <path d="M918 350 l24 24 l48 -70" fill="none" stroke="${concept.palette.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
}

function drawDashboard(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <rect x="102" y="130" width="996" height="430" rx="28" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      ${metricTile(146, 178, concept.labels[0], concept, 196)}
      ${metricTile(376, 178, concept.labels[1], concept, 196)}
      ${metricTile(606, 178, concept.labels[2], concept, 196)}
      ${metricTile(836, 178, concept.labels[3], concept, 196)}
      <path d="M178 476 C 310 352, 422 454, 548 358 S 812 422, 982 302" fill="none" stroke="${concept.palette.accent}" stroke-width="8" stroke-linecap="round"/>
      <rect x="166" y="492" width="820" height="16" rx="8" fill="${concept.palette.soft}"/>
    </g>`;
}

function drawGauge(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      <path d="M258 472 A250 250 0 0 1 758 472" fill="none" stroke="${concept.palette.soft}" stroke-width="54" stroke-linecap="round"/>
      <path d="M258 472 A250 250 0 0 1 624 246" fill="none" stroke="${concept.palette.accent}" stroke-width="54" stroke-linecap="round"/>
      <circle cx="508" cy="472" r="22" fill="${concept.palette.deep}"/>
      <path d="M508 472 L638 324" stroke="${concept.palette.deep}" stroke-width="8" stroke-linecap="round"/>
      ${text(508, 550, concept.labels[1], { anchor: "middle", size: 30, color: concept.palette.deep })}
      ${card(824, 174, 236, 96, concept.labels[2], concept, { fill: concept.palette.soft })}
      ${card(824, 326, 236, 96, concept.labels[3], concept, { icon: "check" })}
    </g>`;
}

function drawFunnel(concept: ArticleImageConcept) {
  return `
    <g data-family="${concept.visualFamily}">
      ${concept.labels
        .slice(0, 3)
        .map((label, index) => card(112, 162 + index * 124, 230, 86, label, concept, { icon: index === 2 ? "calendar" : "dot" }))
        .join("")}
      <path d="M406 184 H1010 L900 474 H516 Z" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="3"/>
      <path d="M450 250 H966 M480 322 H938 M514 394 H906" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
      ${text(706, 338, concept.labels[3], { anchor: "middle", size: 30, color: concept.palette.deep })}
    </g>`;
}

function drawLoop(concept: ArticleImageConcept) {
  const positions = [
    [342, 190],
    [742, 190],
    [742, 430],
    [342, 430],
  ] as const;
  return `
    <g data-family="${concept.visualFamily}">
      <path d="M450 236 C560 126, 736 126, 846 236 M846 430 C736 540, 560 540, 450 430 M318 318 C236 410, 250 492, 342 512 M938 318 C1020 226, 1006 144, 914 124" fill="none" stroke="${concept.palette.accent}" stroke-width="6" stroke-linecap="round" marker-end="url(#arrow)" opacity="0.7"/>
      ${positions.map(([x, y], index) => card(x - 112, y - 50, 224, 100, concept.labels[index], concept, { fill: index === 2 ? concept.palette.soft : "#ffffff", icon: index === 3 ? "check" : "dot" })).join("")}
      <circle cx="592" cy="334" r="72" fill="#ffffff" stroke="#d8e2e7" stroke-width="2"/>
      <circle cx="592" cy="334" r="34" fill="${concept.palette.soft}" stroke="${concept.palette.accent}" stroke-width="3"/>
    </g>`;
}

export function renderArticleHeroSvg(concept: ArticleImageConcept) {
  const body = (() => {
    switch (concept.visualFamily) {
      case "priority-matrix":
        return drawMatrix(concept);
      case "document-cleanup-board":
        return drawDocuments(concept);
      case "spreadsheet-ai-panel":
        return drawSpreadsheet(concept);
      case "knowledge-graph":
        return drawGraph(concept);
      case "readiness-checklist":
        return drawChecklist(concept);
      case "reduction-kanban":
        return drawKanban(concept);
      case "contract-status-timeline":
      case "identity-signature-split":
        return drawTimeline(concept);
      case "unsigned-follow-up-board":
      case "receivable-aging-board":
      case "customer-record-card":
      case "service-triage-board":
        return drawBoard(concept);
      case "sales-goal-chart":
      case "daily-report-dashboard":
      case "daily-numbers-dashboard":
      case "revenue-ar-map":
        return drawDashboard(concept);
      case "achievement-gauge":
        return drawGauge(concept);
      case "order-channel-funnel":
      case "restaurant-order-pipeline":
        return drawFunnel(concept);
      default:
        return drawLoop(concept);
    }
  })();

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img">
  <title>${escapeXml(concept.altKo)}</title>
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M2,2 L10,6 L2,10 Z" fill="${concept.palette.accent}"/>
    </marker>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${concept.palette.paper}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${concept.palette.paper}"/>
  <rect x="44" y="44" width="1112" height="587" rx="32" fill="url(#panel)" stroke="#dbe4e8" stroke-width="2"/>
  <rect x="82" y="82" width="58" height="42" rx="12" fill="${concept.palette.deep}"/>
  ${text(111, 110, "B2", { anchor: "middle", size: 21, color: "#ffffff" })}
  <g opacity="0.9">
    <circle cx="1084" cy="108" r="10" fill="${concept.palette.warm}"/>
    <circle cx="1114" cy="108" r="10" fill="${concept.palette.accent}" opacity="0.72"/>
  </g>
  ${body}
</svg>`;

  return svg.replace(/[ \t]+$/gm, "");
}
