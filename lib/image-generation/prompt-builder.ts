import type { ImageBriefCategory } from "@/lib/image-generation/types";

export type Biz2LabImageUsage = "hero" | "inline" | "hub" | "og";
export type Biz2LabImageOutputMode = "prompt-only" | "manual-drop" | "local-diagram";

export type BuildImagePromptPackageInput = {
  slug: string;
  articleTitle: string;
  category: ImageBriefCategory;
  usage: Biz2LabImageUsage;
  userDescription: string;
  targetFeeling?: string;
  mustInclude?: string[];
  mustAvoid?: string[];
  referenceText?: string;
  outputMode?: Biz2LabImageOutputMode;
  existingBrief?: Partial<Biz2LabImagePromptPackage>;
};

export type Biz2LabManifestDraft = {
  id: string;
  project: "biz2lab";
  postSlug: string;
  usage: Biz2LabImageUsage | "hub";
  src: string;
  rawPath: string;
  altKo: string;
  captionKo: string;
  width: number;
  height: number;
  format: "webp";
  licenseStatus: "local-prompt-package" | "local-generated-diagram";
  commerceAutoReusable: true;
  status: "planned";
};

export type Biz2LabImagePromptPackage = {
  id: string;
  postSlug: string;
  articleTitle: string;
  category: ImageBriefCategory;
  usage: Biz2LabImageUsage;
  outputMode: Biz2LabImageOutputMode;
  userDescription: string;
  targetFeeling: string;
  mustInclude: string[];
  mustAvoid: string[];
  filename: string;
  rawPath: string;
  optimizedPath: string;
  providerPromptKo: string;
  providerPromptEn: string;
  negativePromptKo: string;
  visualStyle: string;
  composition: string;
  textPolicy: string;
  categoryStyle: string;
  visualDifferentiationHint: string;
  altKo: string;
  captionKo: string;
  manifestEntry: Biz2LabManifestDraft;
  articleUpdatePlan: string[];
  validationChecklist: string[];
  localOnly: true;
};

type CategoryStyle = {
  labelKo: string;
  promptKo: string;
  promptEn: string;
  palette: string;
  motifs: string[];
};

const categoryStyles: Record<ImageBriefCategory, CategoryStyle> = {
  automation: {
    labelKo: "업무 자동화",
    promptKo:
      "현대적인 AI 업무 흐름, 문서와 데이터가 자동화 후보로 분류되는 장면, 추상 AI 노드, 밝은 SaaS 에디토리얼 일러스트",
    promptEn:
      "modern AI workflow, document and data orchestration, abstract AI node, light SaaS editorial illustration",
    palette: "teal, navy, soft cyan, warm amber",
    motifs: ["업무 입력 레이어", "AI 분류 노드", "우선순위 패널", "실행 상태 모듈"],
  },
  "sales-ops": {
    labelKo: "영업 운영",
    promptKo:
      "매출 대시보드, 미수금 상태, 목표 추적, 리포팅 흐름, 숫자가 정돈된 운영형 화면",
    promptEn:
      "sales dashboard, receivables, target tracking, reporting flow, operational clarity",
    palette: "navy, slate, teal, amber",
    motifs: ["목표 카드", "미수금 상태표", "리포트 흐름", "매출 추적 패널"],
  },
  "small-business": {
    labelKo: "소상공인 운영",
    promptKo:
      "주문, 예약, 고객, 리뷰가 한 화면에서 정리되는 매장 운영 워크플로, 친근하지만 전문적인 사업자 대시보드",
    promptEn:
      "order, reservation, customer, and review operations, practical owner dashboard, friendly but professional",
    palette: "teal, forest green, slate, warm yellow",
    motifs: ["주문 큐", "예약 캘린더", "고객 메모", "리뷰 대응 상태"],
  },
  "contracts-payments": {
    labelKo: "계약 결제",
    promptKo:
      "계약, 검증, 서명, 결제 상태가 신뢰감 있게 연결되는 보안형 프로세스 모듈",
    promptEn:
      "contract, verification, signature, payment status, trust, secure process modules",
    palette: "deep navy, teal, cool gray, restrained amber",
    motifs: ["계약 상태", "서명 확인", "결제 검증", "보관 모듈"],
  },
};

const compositionVariants = [
  "중앙에는 핵심 업무 흐름을 두고, 우측에는 결과 상태 패널을 배치한다.",
  "좌측 입력 묶음에서 중앙 판단 레이어를 거쳐 우측 실행 결과로 이어지는 비대칭 레이아웃을 사용한다.",
  "상단에는 요약 상태 바, 하단에는 3개의 서로 다른 운영 모듈을 카드가 아닌 얇은 패널로 배치한다.",
  "대시보드 일부와 추상 다이어그램을 겹쳐 보여주되 실제 서비스 화면처럼 보이지 않게 처리한다.",
  "전면에는 하나의 대표 오브젝트를 크게 두고 주변에 보조 흐름을 작은 선과 칩으로 연결한다.",
  "타임라인, 상태표, 노드 맵 중 하나를 선택해 기존 3박스 반복 구성을 피한다.",
];

const forbiddenInputPatterns = [
  { pattern: /\bhttps?:\/\//i, label: "external URL" },
  { pattern: /\bwww\./i, label: "external URL" },
  { pattern: /\bamazon\b|아마존/i, label: "Amazon" },
  { pattern: /\bproduct(s)?\b|제품\s*사진|상품\s*사진/i, label: "product image" },
  { pattern: /\bshop\b|\baffiliate\b|이커머스|쇼핑몰/i, label: "commerce/product surface" },
  { pattern: /\breview(s)?\b|리뷰\s*상품/i, label: "review/product surface" },
  { pattern: /\blotto\b|로또/i, label: "lotto surface" },
  { pattern: /실제\s*고객|주민등록|계좌번호|카드번호|개인정보/i, label: "private data" },
  { pattern: /유명\s*캐릭터|저작권\s*캐릭터|copyrighted character/i, label: "copyrighted character" },
];

const negativeBase = [
  "watermark",
  "real logo",
  "브랜드 로고",
  "photo-realistic people",
  "사람 얼굴",
  "product package",
  "Amazon",
  "ecommerce",
  "real company name",
  "private data",
  "fake screenshot",
  "copyrighted character",
  "external URL",
  "hotlinked image",
  "cluttered UI",
  "unreadable small text",
  "generic Article workflow label",
  "stock photo",
];

function hasKorean(value: string) {
  return /[\uac00-\ud7a3]/u.test(value);
}

function compact(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function uniqueList(values: string[]) {
  return values.map(compact).filter(Boolean).filter((value, index, list) => list.indexOf(value) === index);
}

function assertSeoSlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid article slug: ${slug}`);
  }
}

function assertSafeInput(input: BuildImagePromptPackageInput) {
  const safetyTargets = [
    input.slug,
    input.articleTitle,
    input.userDescription,
    input.referenceText ?? "",
    ...(input.mustInclude ?? []),
  ].join("\n");

  for (const { pattern, label } of forbiddenInputPatterns) {
    if (pattern.test(safetyTargets)) {
      throw new Error(`Image request rejected: ${label} is not allowed in Biz2Lab image prompts`);
    }
  }
}

function hashString(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function usageSuffix(usage: Biz2LabImageUsage) {
  if (usage === "inline") {
    return "inline-custom";
  }

  if (usage === "hub") {
    return "hub";
  }

  return usage;
}

function dimensionsForUsage(usage: Biz2LabImageUsage) {
  if (usage === "inline") {
    return { width: 1200, height: 800 };
  }

  if (usage === "hub" || usage === "og") {
    return { width: 1200, height: 630 };
  }

  return { width: 1200, height: 675 };
}

function optimizedBasename(slug: string, usage: Biz2LabImageUsage) {
  if (usage === "hero") {
    return `${slug}-1200.webp`;
  }

  return `${slug}-${usageSuffix(usage)}-1200.webp`;
}

function rawBasename(slug: string, usage: Biz2LabImageUsage) {
  return `${slug}-${usageSuffix(usage)}.png`;
}

function summarizeDescription(description: string) {
  const normalized = compact(description);
  return normalized.length > 70 ? `${normalized.slice(0, 67)}...` : normalized;
}

function fallbackAlt(input: BuildImagePromptPackageInput, style: CategoryStyle) {
  const titlePart = input.articleTitle.replace(/[":]/g, "").trim();
  if (hasKorean(input.userDescription)) {
    return `${summarizeDescription(input.userDescription)}를 설명하는 ${style.labelKo} 이미지`;
  }

  return `${titlePart} 내용을 설명하는 ${style.labelKo} 이미지`;
}

function fallbackCaption(input: BuildImagePromptPackageInput, style: CategoryStyle) {
  const description = hasKorean(input.userDescription)
    ? summarizeDescription(input.userDescription)
    : `${style.labelKo} 흐름을 시각적으로 정리한 이미지`;
  return `${description}를 안전한 로컬 제작용 이미지 브리프로 정리합니다.`;
}

export function buildImagePromptPackage(input: BuildImagePromptPackageInput): Biz2LabImagePromptPackage {
  assertSeoSlug(input.slug);
  assertSafeInput(input);

  const style = categoryStyles[input.category];
  const outputMode = input.outputMode ?? "prompt-only";
  const mustInclude = uniqueList(input.mustInclude ?? []);
  const mustAvoid = uniqueList(input.mustAvoid ?? []);
  const hash = hashString(`${input.slug}:${input.usage}:${input.userDescription}`);
  const composition = compositionVariants[hash % compositionVariants.length];
  const filename = rawBasename(input.slug, input.usage);
  const optimizedName = optimizedBasename(input.slug, input.usage);
  const rawPath = `assets/images/raw/${filename}`;
  const optimizedPath = `public/images/posts/${optimizedName}`;
  const publicSrc = `/images/posts/${optimizedName}`;
  const targetFeeling = compact(input.targetFeeling ?? "차분하고 신뢰감 있는 프리미엄 Korean SaaS/editorial style");
  const includeLine = mustInclude.length > 0 ? `반드시 포함: ${mustInclude.join(", ")}.` : "핵심 업무 맥락이 한눈에 보이게 한다.";
  const avoidLine = mustAvoid.length > 0 ? `추가 회피 요소: ${mustAvoid.join(", ")}.` : "실제 로고, 사람 얼굴, 제품 사진은 넣지 않는다.";
  const visualStyle = `${style.promptKo}. 색상은 ${style.palette}. 실제 브랜드나 서비스 화면이 아닌 추상 업무 시각화.`;
  const categoryStyle = `${style.labelKo}: ${style.promptKo}`;
  const visualDifferentiationHint = `${style.motifs[hash % style.motifs.length]}를 중심 모티프로 사용하고, ${composition}`;
  const textPolicy = "이미지 안의 글자는 최소화하고, 읽어야 하는 설명은 alt/caption/본문에 둔다.";
  const providerPromptKo = [
    `Biz2Lab 한국어 비즈니스 글 "${input.articleTitle}"에 사용할 ${input.usage} 이미지.`,
    `사용자 설명: ${compact(input.userDescription)}.`,
    `목표 느낌: ${targetFeeling}.`,
    visualStyle,
    visualDifferentiationHint,
    includeLine,
    avoidLine,
    textPolicy,
    "16:9 기반의 깔끔한 편집 이미지, 넉넉한 여백, 광고 친화적이고 신뢰감 있는 구성.",
  ].join(" ");
  const providerPromptEn = [
    `Create a Biz2Lab ${input.usage} visual for a Korean business article titled "${input.articleTitle}".`,
    `Direction: ${compact(input.userDescription)}.`,
    `Style: ${style.promptEn}; premium SaaS/editorial look; ${style.palette}.`,
    "Use abstract workflow modules and useful business-diagram structure, with minimal in-image text.",
    "No real logos, no people or faces, no product photography, no private data, no fake screenshots.",
  ].join(" ");
  const negativePromptKo = uniqueList([...negativeBase, ...mustAvoid]).join(", ");
  const altKo = compact(input.existingBrief?.altKo ?? fallbackAlt(input, style));
  const captionKo = compact(input.existingBrief?.captionKo ?? fallbackCaption(input, style));
  const { width, height } = dimensionsForUsage(input.usage);
  const manifestUsage = input.usage === "hub" ? "hub" : input.usage;
  const id = `${input.slug}-${usageSuffix(input.usage)}`;

  return {
    id,
    postSlug: input.slug,
    articleTitle: input.articleTitle,
    category: input.category,
    usage: input.usage,
    outputMode,
    userDescription: compact(input.userDescription),
    targetFeeling,
    mustInclude,
    mustAvoid,
    filename,
    rawPath,
    optimizedPath,
    providerPromptKo,
    providerPromptEn,
    negativePromptKo,
    visualStyle,
    composition,
    textPolicy,
    categoryStyle,
    visualDifferentiationHint,
    altKo,
    captionKo,
    manifestEntry: {
      id,
      project: "biz2lab",
      postSlug: input.slug,
      usage: manifestUsage,
      src: publicSrc,
      rawPath,
      altKo,
      captionKo,
      width,
      height,
      format: "webp",
      licenseStatus: outputMode === "local-diagram" ? "local-generated-diagram" : "local-prompt-package",
      commerceAutoReusable: true,
      status: "planned",
    },
    articleUpdatePlan: [
      `frontmatter heroImage 후보: ${publicSrc}`,
      `frontmatter heroAlt 후보: ${altKo}`,
      `inline 사용 시 본문 위치를 사용자가 승인한 뒤 ArticleImage 또는 Markdown 이미지로 삽입한다.`,
      "기본 실행은 기사 파일을 수정하지 않는다. --apply 사용 전 optimized WebP 존재 여부를 확인한다.",
    ],
    validationChecklist: [
      "외부 이미지 URL 없음",
      "실제 로고, 제품/Amazon 이미지, 사람 얼굴 없음",
      "개인정보나 실제 회사/고객 데이터 없음",
      "이미지 안 텍스트 최소화",
      "assets/images/raw 원본과 public/images/posts WebP 경로 확인",
      "npm run optimize-images",
      "npm run validate:images",
      "브라우저에서 기사 이미지 수동 확인",
    ],
    localOnly: true,
  };
}

export function imagePromptPackageToBrief(promptPackage: Biz2LabImagePromptPackage) {
  return {
    id: promptPackage.id,
    postSlug: promptPackage.postSlug,
    articleTitle: promptPackage.articleTitle,
    category: promptPackage.category,
    usage: promptPackage.usage,
    outputMode: promptPackage.outputMode,
    targetPath: promptPackage.rawPath,
    optimizedPath: promptPackage.optimizedPath,
    altKo: promptPackage.altKo,
    captionKo: promptPackage.captionKo,
    promptKo: promptPackage.providerPromptKo,
    providerPromptKo: promptPackage.providerPromptKo,
    providerPromptEn: promptPackage.providerPromptEn,
    negativePromptKo: promptPackage.negativePromptKo,
    visualStyle: promptPackage.visualStyle,
    composition: promptPackage.composition,
    categoryStyle: promptPackage.categoryStyle,
    visualDifferentiationHint: promptPackage.visualDifferentiationHint,
    textPolicy: promptPackage.textPolicy,
    filename: promptPackage.filename,
    rawPath: promptPackage.rawPath,
    manifestEntry: promptPackage.manifestEntry,
    articleUpdatePlan: promptPackage.articleUpdatePlan,
    validationChecklist: promptPackage.validationChecklist,
    localOnly: true,
  };
}
