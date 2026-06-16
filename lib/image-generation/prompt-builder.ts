import type { ImageBriefCategory } from "@/lib/image-generation/types";

export type Biz2LabImageUsage = "hero" | "inline" | "hub" | "og";
export type Biz2LabImageOutputMode = "prompt-only" | "manual-drop" | "local-diagram-fallback";

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
      "반복 업무, 문서, 표 데이터가 자동화 후보로 분류되고 우선순위가 정리되는 현대적인 AI 업무 흐름",
    promptEn:
      "modern AI workflow, document and data orchestration, abstract AI node, light SaaS editorial illustration",
    palette: "teal, navy, soft cyan, warm amber",
    motifs: ["업무 입력 레이어", "AI 분류 노드", "우선순위 패널", "실행 상태 모듈", "자동화 후보 큐"],
  },
  "sales-ops": {
    labelKo: "영업 운영",
    promptKo:
      "매출, 미수금, 목표, 리포트 흐름이 정돈되어 보이는 실무형 영업 운영 보드",
    promptEn:
      "sales dashboard, receivables, target tracking, reporting flow, operational clarity",
    palette: "navy, slate, teal, amber",
    motifs: ["목표 카드", "미수금 상태 열", "리포트 흐름", "매출 추적 패널", "후속 조치 타임라인"],
  },
  "small-business": {
    labelKo: "소상공인 운영",
    promptKo:
      "주문, 예약, 고객 메모, 리뷰 대응이 한 화면에서 정리되는 친근하지만 전문적인 매장 운영 워크플로",
    promptEn:
      "order, reservation, customer, and review operations, practical owner dashboard, friendly but professional",
    palette: "teal, forest green, slate, warm yellow",
    motifs: ["주문 흐름", "예약 캘린더", "고객 메모", "리뷰 대응 상태", "사장님 운영 노트"],
  },
  "contracts-payments": {
    labelKo: "계약 결제",
    promptKo:
      "계약서, 본인 확인, 서명, 결제 상태가 신뢰감 있게 연결되는 보안형 프로세스 모듈",
    promptEn:
      "contract, verification, signature, payment status, trust, secure process modules",
    palette: "deep navy, teal, cool gray, restrained amber",
    motifs: ["계약 상태", "서명 확인", "결제 검증", "보관 모듈", "미서명 추적 레인"],
  },
};

const compositionVariants = [
  "중앙에는 핵심 업무 흐름을 두고 우측에는 결과 상태 패널을 배치한다.",
  "좌측 입력 묶음에서 중앙 판단 레이어를 거쳐 우측 실행 결과로 이어지는 비대칭 레이아웃을 사용한다.",
  "상단에는 요약 상태 바를 두고 하단에는 서로 다른 운영 모듈을 넓은 패널로 배치한다.",
  "대시보드 일부와 추상 다이어그램을 겹쳐 보여주되 실제 서비스 화면처럼 보이지 않게 처리한다.",
  "전면에는 하나의 큰 업무 오브젝트를 두고 주변 보조 흐름을 얇은 선과 칩으로 연결한다.",
  "타임라인, 상태 노드, 검토 큐를 조합해 기존 3박스 반복 구성을 피한다.",
  "좌하단에서 우상단으로 흐르는 대각선 프로세스 위에 작은 상태 표식을 놓는다.",
  "중앙에 여백을 크게 둔 편집형 표지 구성을 만들고 주변에 관련 업무 단서를 얇게 배치한다.",
  "분할 화면 대신 하나의 넓은 캔버스에서 입력, 검토, 실행, 기록을 레이어로 표현한다.",
  "복잡한 숫자 대신 우선순위 점, 상태 배지, 연결선으로 업무 구조를 보여준다.",
  "핵심 도구 화면을 재현하지 말고 추상 카드, 라인, 노드로 설명형 이미지를 구성한다.",
  "기사 주제를 상징하는 한 가지 큰 모티프를 기준으로 보조 정보를 원형 또는 곡선 흐름으로 배치한다.",
];

const forbiddenInputPatterns = [
  { pattern: /\bhttps?:\/\//i, label: "external URL" },
  { pattern: /\bwww\./i, label: "external URL" },
  { pattern: /\bamazon\b|아마존/i, label: "Amazon" },
  { pattern: /\bproduct\s+(photo|image|shot|package|card)s?\b|제품\s*사진|상품\s*사진/i, label: "product image" },
  { pattern: /\bshop\b|\baffiliate\b|이커머스|제휴몰/i, label: "commerce/product surface" },
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

export function normalizeBiz2LabImageOutputMode(value?: string): Biz2LabImageOutputMode {
  if (!value || value === "prompt-only") {
    return "prompt-only";
  }

  if (value === "manual-drop") {
    return "manual-drop";
  }

  if (value === "local-diagram-fallback" || value === "local-diagram") {
    return "local-diagram-fallback";
  }

  throw new Error(`Unsupported output mode: ${value}`);
}

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

function usageLabelKo(usage: Biz2LabImageUsage) {
  if (usage === "inline") return "본문 설명용";
  if (usage === "hub") return "카테고리 허브";
  if (usage === "og") return "공유용 OG";
  return "대표";
}

function usageDirectionKo(usage: Biz2LabImageUsage) {
  if (usage === "inline") {
    return "본문 중간에 들어가는 설명형 프로세스 다이어그램처럼 구성하고, 세부 내용은 캡션이 설명하도록 이미지 속 텍스트는 최소화한다.";
  }

  if (usage === "hub") {
    return "카테고리 허브의 첫 인상에 맞게 여러 글을 묶는 넓은 주제 이미지로 구성하고 특정 기사 하나의 화면처럼 보이지 않게 한다.";
  }

  if (usage === "og") {
    return "작은 썸네일에서도 주제와 대비가 읽히도록 단순한 구도와 명확한 여백을 유지한다.";
  }

  return "글 상단 대표 이미지로 사용할 수 있게 한눈에 주제가 잡히는 넓은 16:9 에디토리얼 구도로 만든다.";
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
  return `${description}를 안전한 로컬 이미지 제작용 브리프로 정리합니다.`;
}

function articleUpdatePlanForUsage(
  promptPackage: Pick<Biz2LabImagePromptPackage, "usage" | "manifestEntry" | "altKo">,
) {
  if (promptPackage.usage === "hero") {
    return [
      `실제 이미지 승인 후 frontmatter heroImage 후보: ${promptPackage.manifestEntry.src}`,
      `실제 이미지 승인 후 frontmatter heroAlt 후보: ${promptPackage.altKo}`,
      "현재 단계에서는 기사 파일을 수정하지 않는다.",
      "적용 전 optimized WebP 파일 존재 여부와 시각 검수를 먼저 확인한다.",
    ];
  }

  if (promptPackage.usage === "inline") {
    return [
      "실제 이미지 승인 후 본문 흐름상 설명이 필요한 위치를 사용자가 지정한다.",
      `삽입 후보 경로: ${promptPackage.manifestEntry.src}`,
      `삽입 후보 alt: ${promptPackage.altKo}`,
      "현재 단계에서는 본문 Markdown 또는 MDX를 수정하지 않는다.",
    ];
  }

  if (promptPackage.usage === "hub") {
    return [
      "실제 이미지 승인 후 해당 카테고리 허브 페이지의 이미지 슬롯 적용을 검토한다.",
      `허브 이미지 후보 경로: ${promptPackage.manifestEntry.src}`,
      "현재 단계에서는 허브 페이지나 라우트를 수정하지 않는다.",
      "적용 전 optimized WebP 파일과 반응형 표시를 검수한다.",
    ];
  }

  return [
    `공유 이미지 후보 경로: ${promptPackage.manifestEntry.src}`,
    "현재 단계에서는 메타데이터나 production 파일을 수정하지 않는다.",
  ];
}

export function buildImagePromptPackage(input: BuildImagePromptPackageInput): Biz2LabImagePromptPackage {
  assertSeoSlug(input.slug);
  assertSafeInput(input);

  const style = categoryStyles[input.category];
  const outputMode = normalizeBiz2LabImageOutputMode(input.outputMode);
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
  const usageDirection = usageDirectionKo(input.usage);
  const visualDifferentiationHint = `${style.motifs[hash % style.motifs.length]}를 중심 모티프로 사용하고, ${composition}`;
  const textPolicy = "이미지 안의 글자는 최소화하고, 읽어야 하는 설명은 alt/caption/본문에 둔다.";
  const { width, height } = dimensionsForUsage(input.usage);
  const providerPromptKo = [
    `Biz2Lab 한국어 비즈니스 글 "${input.articleTitle}"에 사용할 ${usageLabelKo(input.usage)} 이미지.`,
    `사용자 설명: ${compact(input.userDescription)}.`,
    `목표 톤: ${targetFeeling}.`,
    visualStyle,
    usageDirection,
    visualDifferentiationHint,
    includeLine,
    avoidLine,
    textPolicy,
    `${width}:${height} 비율에 맞춘 깔끔한 편집 이미지, 충분한 여백, 광고 친화적이고 신뢰감 있는 구성.`,
  ].join(" ");
  const providerPromptEn = [
    `Create a Biz2Lab ${input.usage} visual for a Korean business article titled "${input.articleTitle}".`,
    `Direction: ${compact(input.userDescription)}.`,
    `Style: ${style.promptEn}; premium SaaS/editorial look; ${style.palette}.`,
    usageDirection,
    "Use abstract workflow modules and useful business-diagram structure, with minimal in-image text.",
    "No real logos, no people or faces, no product photography, no private data, no fake screenshots.",
  ].join(" ");
  const negativePromptKo = uniqueList([...negativeBase, ...mustAvoid]).join(", ");
  const altKo = compact(input.existingBrief?.altKo ?? fallbackAlt(input, style));
  const captionKo = compact(input.existingBrief?.captionKo ?? fallbackCaption(input, style));
  const id = `${input.slug}-${usageSuffix(input.usage)}`;
  const manifestEntry: Biz2LabManifestDraft = {
    id,
    project: "biz2lab",
    postSlug: input.slug,
    usage: input.usage,
    src: publicSrc,
    rawPath,
    altKo,
    captionKo,
    width,
    height,
    format: "webp",
    licenseStatus: outputMode === "local-diagram-fallback" ? "local-generated-diagram" : "local-prompt-package",
    commerceAutoReusable: true,
    status: "planned",
  };
  const basePackage: Omit<Biz2LabImagePromptPackage, "articleUpdatePlan"> = {
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
    manifestEntry,
    validationChecklist: [
      "외부 이미지 URL 없음",
      "실제 로고, 제품/Amazon 이미지, 사람 얼굴 없음",
      "개인정보와 실제 회사/고객 데이터 없음",
      "이미지 속 텍스트 최소화",
      "assets/images/raw 원본과 public/images/posts WebP 경로 확인",
      "npm run optimize-images",
      "npm run validate:images",
      "브라우저에서 기사 또는 허브 이미지 수동 확인",
    ],
    localOnly: true as const,
  };

  return {
    ...basePackage,
    articleUpdatePlan: articleUpdatePlanForUsage(basePackage),
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
    rawOutput: "none",
    manifestEntry: promptPackage.manifestEntry,
    articleUpdatePlan: promptPackage.articleUpdatePlan,
    validationChecklist: promptPackage.validationChecklist,
    localOnly: true,
  };
}
