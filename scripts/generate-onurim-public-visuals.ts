import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { expansionGuideSummaries } from "../lib/health-v3/public-expansion";

const root = process.cwd();
const manifestPath = path.join(root, "docs/health-v3/onurim/visual-assets.json");

type ManifestEntry = {
  id: string;
  file: string;
  generationDate: string;
  dimensions: string;
  sha256: string;
  claimIds: string[];
  altText: string;
  caption: string;
  prompt: string;
  state: string[];
};

const palettes = [
  ["#194f46", "#6fc3a8", "#f3c77b", "#fff8e9"],
  ["#38506b", "#86b7c9", "#f0b18a", "#f8f5ee"],
  ["#5c426a", "#b89ac8", "#e8bd75", "#fff9ef"],
  ["#75513f", "#d19a75", "#7db6a5", "#fff9f0"],
  ["#284d66", "#7fb6d4", "#d9a768", "#f7fbfc"],
  ["#4f5f3d", "#9cbd72", "#e1b76f", "#fbfaef"],
  ["#633d45", "#c78391", "#7fb6a2", "#fff7f5"],
];

function sha256(buffer: Buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}

function backdrop(width: number, height: number, palette: string[], seed: number) {
  const [ink, accent, warm, paper] = palette;
  const dots = Array.from({ length: 14 }, (_, index) => {
    const x = 90 + ((index * 173 + seed * 41) % (width - 180));
    const y = 90 + ((index * 113 + seed * 59) % (height - 180));
    const r = 8 + ((index + seed) % 4) * 5;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${index % 2 ? accent : warm}" opacity="0.22"/>`;
  }).join("");
  return `<rect width="${width}" height="${height}" rx="56" fill="${paper}"/><path d="M0 ${height * .72} C ${width * .24} ${height * .54}, ${width * .58} ${height * .9}, ${width} ${height * .62} L ${width} ${height} L0 ${height}Z" fill="${accent}" opacity="0.13"/>${dots}<rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="42" fill="none" stroke="${ink}" stroke-width="3" opacity="0.12"/>`;
}

function heroSvg(title: string, palette: string[], seed: number) {
  const [ink, accent, warm] = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" role="img" aria-label="${escapeXml(title)} 관찰과 진료 준비를 상징하는 교육용 삽화">${backdrop(1536, 1024, palette, seed)}
    <g transform="translate(180 145)">
      <rect x="0" y="80" width="510" height="600" rx="42" fill="#ffffff" stroke="${ink}" stroke-width="8"/>
      <rect x="82" y="0" width="345" height="120" rx="56" fill="${accent}"/>
      ${[0,1,2,3].map((row) => `<circle cx="105" cy="${230 + row * 105}" r="24" fill="${row % 2 ? warm : accent}"/><path d="M160 ${230 + row * 105} H410" stroke="${ink}" stroke-width="20" stroke-linecap="round" opacity="${.22 + row * .08}"/>`).join("")}
    </g>
    <g transform="translate(910 205)">
      <circle cx="210" cy="210" r="205" fill="${accent}" opacity=".22"/>
      <circle cx="210" cy="210" r="132" fill="${warm}" opacity=".7"/>
      <path d="M115 220 C150 95 275 82 318 202 C342 270 285 355 210 392 C127 346 87 288 115 220Z" fill="${ink}" opacity=".9"/>
      <path d="M210 105 V315 M105 210 H315" stroke="#fff" stroke-width="22" stroke-linecap="round" opacity=".85"/>
      <path d="M40 545 C175 460 285 470 420 545" fill="none" stroke="${ink}" stroke-width="34" stroke-linecap="round" opacity=".28"/>
    </g>
  </svg>`;
}

function diseaseMotif(slug: string, ink: string, accent: string, warm: string) {
  const motifs: Record<string, string> = {
    dyslipidemia: `<path d="M625 520 C700 415 835 625 915 500" fill="none" stroke="${ink}" stroke-width="58" stroke-linecap="round"/><circle cx="690" cy="490" r="24" fill="${warm}"/><circle cx="835" cy="550" r="31" fill="${accent}"/>`,
    obesity: `<circle cx="768" cy="512" r="92" fill="${accent}"/><circle cx="655" cy="405" r="54" fill="${warm}"/><circle cx="880" cy="420" r="46" fill="${ink}" opacity=".55"/><circle cx="665" cy="625" r="42" fill="${ink}" opacity=".4"/><circle cx="875" cy="625" r="58" fill="${warm}" opacity=".8"/>`,
    "metabolic-dysfunction-associated-steatotic-liver-disease": `<path d="M610 465 C690 365 905 385 930 510 C880 615 725 675 610 585 C570 545 575 500 610 465Z" fill="${accent}"/><circle cx="700" cy="520" r="26" fill="${warm}"/><circle cx="790" cy="475" r="20" fill="${warm}"/><circle cx="850" cy="565" r="30" fill="${warm}"/>`,
    "irritable-bowel-syndrome": `<path d="M630 390 C580 470 690 485 630 560 C585 625 690 690 750 625 C815 690 935 625 885 550 C835 485 955 450 895 385" fill="none" stroke="${accent}" stroke-width="52" stroke-linecap="round"/><path d="M680 410 V610 M825 410 V610" stroke="${ink}" stroke-width="24" stroke-linecap="round" opacity=".5"/>`,
    asthma: `<path d="M768 350 V500 M768 500 L650 620 M768 500 L886 620 M680 590 L620 685 M855 590 L920 680" fill="none" stroke="${ink}" stroke-width="38" stroke-linecap="round"/><path d="M610 705 C560 640 575 520 660 470 M925 705 C980 630 955 520 875 470" fill="none" stroke="${accent}" stroke-width="55" stroke-linecap="round"/>`,
    "sleep-apnea": `<path d="M620 430 C705 345 840 365 900 450 C820 465 790 520 790 640" fill="none" stroke="${ink}" stroke-width="42" stroke-linecap="round"/><path d="M620 590 H720 M825 590 H930" stroke="${accent}" stroke-width="30" stroke-linecap="round"/><circle cx="770" cy="590" r="24" fill="${warm}"/>`,
    gout: `<circle cx="680" cy="510" r="115" fill="${accent}" opacity=".75"/><circle cx="860" cy="510" r="115" fill="${warm}" opacity=".75"/><path d="M730 510 H810" stroke="${ink}" stroke-width="38" stroke-linecap="round"/>${[0,1,2,3].map((i) => `<path d="M${745 + i * 25} ${470 + (i % 2) * 55} l14 -18 14 18 -14 18Z" fill="${ink}" opacity=".7"/>`).join("")}`,
    migraine: `<path d="M820 345 C680 330 610 435 630 555 C645 650 720 700 805 690 V605 C875 580 915 515 900 440 C885 385 855 355 820 345Z" fill="${accent}" opacity=".78"/><path d="M705 455 L760 405 L800 485 L850 430" fill="none" stroke="${ink}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/><path d="M700 590 H835" stroke="${warm}" stroke-width="32" stroke-linecap="round"/>`,
    "kidney-stones": `<path d="M665 365 C570 400 585 610 675 650 C750 680 790 590 750 520 C710 450 775 380 665 365Z" fill="${accent}"/><path d="M870 365 C965 400 950 610 860 650 C785 680 745 590 785 520 C825 450 760 380 870 365Z" fill="${accent}"/><circle cx="792" cy="585" r="30" fill="${warm}"/><circle cx="835" cy="620" r="18" fill="${ink}"/>`,
    "urinary-tract-infection": `<path d="M670 375 C590 410 605 545 680 565 C735 575 750 500 720 455 C695 415 750 370 670 375Z" fill="${accent}"/><path d="M865 375 C945 410 930 545 855 565 C800 575 785 500 815 455 C840 415 785 370 865 375Z" fill="${accent}"/><path d="M700 550 C710 640 745 665 768 690 C790 665 825 640 835 550" fill="none" stroke="${ink}" stroke-width="24"/><circle cx="768" cy="690" r="58" fill="${warm}"/>`,
    depression: `<circle cx="768" cy="455" r="112" fill="${warm}"/><path d="M585 585 H950" stroke="${ink}" stroke-width="34" stroke-linecap="round"/><path d="M640 675 H745 M790 625 H900" stroke="${accent}" stroke-width="42" stroke-linecap="round"/><path d="M745 675 L790 625" stroke="${accent}" stroke-width="42"/>`,
    "anxiety-disorder": `<circle cx="768" cy="512" r="48" fill="${warm}"/>${[105,175,245].map((r, i) => `<circle cx="768" cy="512" r="${r}" fill="none" stroke="${i % 2 ? accent : ink}" stroke-width="${24 - i * 4}" opacity="${.8 - i * .2}" stroke-dasharray="${i === 2 ? '45 28' : 'none'}"/>`).join("")}`,
    stroke: `<path d="M755 350 C650 320 590 405 620 490 C565 570 640 690 755 655Z" fill="${accent}"/><path d="M780 350 C885 320 945 405 915 490 C970 570 895 690 780 655Z" fill="${warm}"/><path d="M768 350 V660" stroke="${ink}" stroke-width="22"/><path d="M675 445 C710 470 725 510 720 555 M860 435 C825 475 820 520 830 575" fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round" opacity=".65"/>`,
    "acute-myocardial-infarction": `<path d="M768 685 C610 590 585 465 660 405 C715 360 765 400 768 445 C775 395 835 360 885 410 C965 490 900 610 768 685Z" fill="${accent}"/><path d="M590 505 H690 L730 450 L790 585 L830 505 H945" fill="none" stroke="${ink}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/><circle cx="812" cy="505" r="28" fill="${warm}"/>`,
  };
  return motifs[slug] ?? `<circle cx="768" cy="512" r="180" fill="${accent}"/><circle cx="768" cy="512" r="70" fill="${warm}"/>`;
}

function conceptSvg(title: string, slug: string, palette: string[], seed: number) {
  const [ink, accent, warm] = palette;
  const nodes = Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 6 + seed * .05;
    const x = 768 + Math.cos(angle) * 330;
    const y = 512 + Math.sin(angle) * 300;
    return `<path d="M768 512 L${x.toFixed(1)} ${y.toFixed(1)}" stroke="${ink}" stroke-width="10" opacity=".2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="72" fill="${index % 2 ? accent : warm}" opacity=".82"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="30" fill="${ink}" opacity=".5"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" role="img" aria-label="${escapeXml(title)}의 여러 신호와 검사를 단순화한 교육용 도식">${backdrop(1536, 1024, palette, seed + 3)}${nodes}<circle cx="768" cy="512" r="265" fill="#fff" stroke="${ink}" stroke-width="10"/>${diseaseMotif(slug, ink, accent, warm)}</svg>`;
}

function actionSvg(title: string, palette: string[], seed: number) {
  const [ink, accent, warm] = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" role="img" aria-label="${escapeXml(title)} 증상 기록과 도움 요청 순서를 보여 주는 교육용 도식">${backdrop(1536, 1024, palette, seed + 7)}
    <g transform="translate(165 200)">
      ${[0,1,2].map((index) => `<g transform="translate(${index * 420} 0)"><rect width="330" height="520" rx="54" fill="#fff" stroke="${ink}" stroke-width="8"/><circle cx="165" cy="125" r="74" fill="${index === 2 ? warm : accent}" opacity=".8"/><path d="M125 126 H205 M165 86 V166" stroke="${ink}" stroke-width="20" stroke-linecap="round" opacity="${index === 2 ? 1 : .55}"/><path d="M72 265 H258 M72 335 H230 M72 405 H270" stroke="${ink}" stroke-width="20" stroke-linecap="round" opacity=".25"/></g>`).join("")}
      <path d="M350 260 H405 M770 260 H825" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>
      <path d="M390 225 L425 260 L390 295 M810 225 L845 260 L810 295" fill="none" stroke="${ink}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

async function render(svg: string, target: string) {
  const buffer = await sharp(Buffer.from(svg)).webp({ quality: 88, effort: 3 }).toBuffer();
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, buffer);
  return buffer;
}

async function main() {
  const existing = JSON.parse(await readFile(manifestPath, "utf8")) as ManifestEntry[];
  const expansionSlugs = new Set(expansionGuideSummaries.map((guide) => guide.slug));
  const preserved = existing.filter((entry) => ![...expansionSlugs].some((slug) => entry.file.includes(`/onurim/${slug}/`)));
  const generated: ManifestEntry[] = [];

  for (const [index, guide] of expansionGuideSummaries.entries()) {
    const palette = palettes[index % palettes.length];
    const assets = [
      { role: "hero", svg: heroSvg(guide.title, palette, index), alt: `${guide.title}의 변화를 차분히 기록하고 진료 질문을 준비하는 과정을 상징한 원본 교육용 삽화`, caption: `이 그림은 ${guide.title}을 진단하는 영상이 아니라 관찰과 질문 준비의 흐름을 단순화한 삽화입니다.`, claims: [`${guide.prefix}-P3-002`, `${guide.prefix}-P3-003`] },
      { role: "concept", svg: conceptSvg(guide.title, guide.slug, palette, index), alt: `${guide.title}과 관련된 몸의 구조나 작동 개념을 과장 없이 단순화한 원본 교육용 도식`, caption: "질환의 큰 흐름만 단순화했으며 실제 해부 구조, 개인 검사 결과나 진단 영상을 나타내지 않습니다.", claims: [`${guide.prefix}-P3-001`, `${guide.prefix}-P3-003`] },
      { role: "action", svg: actionSvg(guide.title, palette, index), alt: `${guide.title}의 변화 관찰, 기록, 의료 도움 요청 순서를 세 장면으로 단순화한 교육용 도식`, caption: "기록은 진단기가 아닙니다. 새롭고 심한 변화에서는 기록보다 의료 도움을 우선합니다.", claims: [`${guide.prefix}-P3-004`, `${guide.prefix}-P3-005`] },
    ];

    for (const asset of assets) {
      const file = `public/images/onurim/${guide.slug}/${asset.role}.webp`;
      const buffer = await render(asset.svg, path.join(root, file));
      generated.push({
        id: `VIS-${guide.prefix}-P3-${asset.role.toUpperCase()}`,
        file,
        generationDate: "2026-08-26",
        dimensions: "1536x1024",
        sha256: sha256(buffer),
        claimIds: asset.claims,
        altText: asset.alt,
        caption: asset.caption,
        prompt: `local deterministic original ONURIM educational ${asset.role} illustration for ${guide.title}; no people, text, diagnosis, medicine, values or copied anatomy`,
        state: ["ORIGINAL_EDUCATIONAL_ART", "SOURCE_CONCEPT_CHECKED", "ALT_TEXT_PRESENT", "PRIVACY_SAFE", "NOT_DIAGNOSTIC"],
      });
    }
  }

  await writeFile(manifestPath, `${JSON.stringify([...preserved, ...generated], null, 2)}\n`, "utf8");
  console.log(`ONURIM_PUBLIC_VISUALS_GENERATED=${generated.length} TOTAL=${preserved.length + generated.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
