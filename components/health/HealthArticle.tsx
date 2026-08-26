import Link from "next/link";
import Image from "next/image";

import {
  getSources,
  healthClaims,
  healthTools,
  type HealthArticle,
} from "@/lib/health-v3/content";
import { expansionGuideSummaries } from "@/lib/health-v3/public-expansion";
import { absoluteUrl } from "@/lib/site";

const imageMeta: Record<string, { src: string; alt: string; caption: string; width: number; height: number }> = {
  "htn-hero": {
    src: "/images/onurim/hypertension/hero.webp",
    alt: "집에서 혈압을 잰 뒤 기록표에 숫자와 시간을 적는 성인의 차분한 교육용 삽화",
    caption: "한 번의 숫자보다 같은 조건에서 남긴 기록이 진료 질문을 구체적으로 만듭니다.",
    width: 1536,
    height: 1024,
  },
  "htn-process": {
    src: "/images/onurim/hypertension/process.webp",
    alt: "심장이 혈관으로 피를 보내며 혈관 벽에 압력이 생기는 과정을 단순화한 교육용 삽화",
    caption: "혈압은 피가 혈관 벽을 미는 힘입니다. 그림은 이해를 돕는 단순화이며 진단 영상이 아닙니다.",
    width: 1536,
    height: 1024,
  },
  "htn-warning": {
    src: "/images/onurim/hypertension/warning.webp",
    alt: "가슴 통증과 호흡곤란, 갑작스러운 한쪽 힘 빠짐과 말 이상 시 119 도움을 우선하는 경고 삽화",
    caption: "갑작스러운 심한 증상이 있으면 측정을 반복하며 기다리지 말고 119에 도움을 요청합니다.",
    width: 1536,
    height: 1024,
  },
  "htn-checklist": {
    src: "/images/onurim/hypertension/checklist.webp",
    alt: "등과 팔을 받치고 두 발을 바닥에 둔 채 맨팔 커프로 혈압을 재는 자세의 교육용 삽화",
    caption: "5분 휴식, 안정된 자세와 맞는 커프가 기록의 출발점입니다.",
    width: 1024,
    height: 1536,
  },
  "dia-hero": {
    src: "/images/onurim/type-2-diabetes/hero.webp",
    alt: "식사와 활동, 수면과 혈당 측정값을 관찰 기록지에 적는 다양한 연령의 가족 삽화",
    caption: "관찰 기록은 약을 바꾸는 계산표가 아니라 진료에서 질문할 맥락을 남기는 도구입니다.",
    width: 1536,
    height: 1024,
  },
  "dia-process": {
    src: "/images/onurim/type-2-diabetes/process.webp",
    alt: "포도당과 인슐린 신호가 세포의 에너지 사용과 연결되는 기본 흐름을 단순화한 삽화",
    caption: "인슐린은 포도당이 세포에서 쓰이도록 돕습니다. 실제 몸의 작용은 그림보다 복잡합니다.",
    width: 1536,
    height: 1024,
  },
  "dia-warning": {
    src: "/images/onurim/type-2-diabetes/warning.webp",
    alt: "반복되는 구토와 호흡곤란, 의식 변화가 있을 때 기록보다 응급 도움을 우선하는 경고 삽화",
    caption: "상태가 빠르게 나빠지면 기록을 계속하지 말고 응급 의료 도움을 받습니다.",
    width: 1536,
    height: 1024,
  },
  "dia-checklist": {
    src: "/images/onurim/type-2-diabetes/checklist.webp",
    alt: "당사자의 선택을 존중하며 검사 결과와 진료 질문을 함께 정리하는 가족 삽화",
    caption: "가족의 역할은 감시보다 동의, 기록 정리와 질문 준비입니다.",
    width: 1024,
    height: 1536,
  },
  "ar-hero": {
    src: "/images/onurim/allergic-rhinitis/hero.webp",
    alt: "실외와 실내에서 생긴 코와 눈의 변화를 관찰표에 적는 성인의 교육용 삽화",
    caption: "증상과 장소의 흐름을 적어도 알레르기 원인을 이 그림으로 확정할 수는 없습니다.",
    width: 1536,
    height: 1024,
  },
  "ar-explainer": {
    src: "/images/onurim/allergic-rhinitis/explainer.webp",
    alt: "실외 꽃가루와 실내 먼지처럼 보이는 입자가 단순화한 코 주변으로 향하는 교육용 삽화",
    caption: "실외·실내 자극과 코 증상의 관계를 단순화한 그림이며 진단 도구가 아닙니다.",
    width: 1536,
    height: 1024,
  },
  "ar-action": {
    src: "/images/onurim/allergic-rhinitis/checklist.webp",
    alt: "성인 두 명이 창문과 옷, 표면 정리와 관찰표를 함께 살피는 교육용 삽화",
    caption: "환경 변화는 개인마다 다릅니다. 기록은 원인을 확정하는 검사표가 아닙니다.",
    width: 1024,
    height: 1536,
  },
  "gerd-hero": {
    src: "/images/onurim/gastroesophageal-reflux-disease/hero.webp",
    alt: "식사와 자세, 불편의 시간 흐름을 관찰 노트에 적는 성인의 교육용 삽화",
    caption: "시간표는 음식 금지표가 아니라 진료에서 질문할 흐름을 남기는 도구입니다.",
    width: 1536,
    height: 1024,
  },
  "gerd-explainer": {
    src: "/images/onurim/gastroesophageal-reflux-disease/explainer.webp",
    alt: "위 내용물이 식도 쪽으로 올라오는 흐름을 세 단계로 단순화한 교육용 삽화",
    caption: "역류의 기본 흐름을 단순화한 그림이며 흉부 불편의 원인을 진단하지 않습니다.",
    width: 1536,
    height: 1024,
  },
  "gerd-action": {
    src: "/images/onurim/gastroesophageal-reflux-disease/checklist.webp",
    alt: "두 성인이 식사 뒤 증상 시간표와 질문 카드를 함께 살피는 교육용 삽화",
    caption: "증상·자세·수면의 흐름을 함께 적어 의료진과 상의할 질문을 준비합니다.",
    width: 1024,
    height: 1536,
  },
  "oa-hero": {
    src: "/images/onurim/osteoarthritis/hero.webp",
    alt: "일상 활동 전후의 무릎 불편과 변화를 관찰 노트에 적는 성인의 교육용 삽화",
    caption: "활동 기록은 병명이나 치료를 스스로 결정하는 계산표가 아닙니다.",
    width: 1536,
    height: 1024,
  },
  "oa-explainer": {
    src: "/images/onurim/osteoarthritis/explainer.webp",
    alt: "관절의 뼈 끝과 완충 조직을 단순화해 보여 주는 교육용 삽화",
    caption: "관절의 여러 조직을 단순화한 그림이며 개인의 영상 검사나 상태를 보여 주지 않습니다.",
    width: 1536,
    height: 1024,
  },
  "oa-action": {
    src: "/images/onurim/osteoarthritis/checklist.webp",
    alt: "두 성인이 일상 활동 기록과 질문 카드를 차분히 준비하는 교육용 삽화",
    caption: "가족은 통증을 판단하기보다 당사자의 기록과 질문 준비를 도울 수 있습니다.",
    width: 1024,
    height: 1536,
  },
  "op-hero": {
    src: "/images/onurim/osteoporosis/hero.webp",
    alt: "성인이 골밀도와 낙상, 복용 약에 관한 진료 질문을 정리하는 교육용 삽화",
    caption: "질문 준비는 검사 결과를 혼자 해석하거나 치료를 정하는 일이 아닙니다.",
    width: 1536,
    height: 1024,
  },
  "op-explainer": {
    src: "/images/onurim/osteoporosis/explainer.webp",
    alt: "뼈 내부 구조가 달라질 수 있다는 개념을 단순화해 보여 주는 교육용 삽화",
    caption: "뼈 구조 변화를 단순화한 그림이며 개인의 골밀도 검사 결과가 아닙니다.",
    width: 1536,
    height: 1024,
  },
  "op-action": {
    src: "/images/onurim/osteoporosis/checklist.webp",
    alt: "두 성인이 집 안 통로와 느슨한 매트를 살피고 질문 카드를 준비하는 교육용 삽화",
    caption: "집안 점검은 낙상 위험을 줄이기 위한 한 부분이며 골절 예방을 보장하지 않습니다.",
    width: 1024,
    height: 1536,
  },
};

for (const guide of expansionGuideSummaries) {
  const key = guide.prefix.toLowerCase();
  imageMeta[`${key}-hero`] = {
    src: `/images/onurim/${guide.slug}/hero.webp`,
    alt: `${guide.title}의 변화를 차분히 기록하고 진료 질문을 준비하는 과정을 상징한 원본 교육용 삽화`,
    caption: `이 그림은 ${guide.title}을 진단하는 영상이 아니라 관찰과 질문 준비의 흐름을 단순화한 삽화입니다.`,
    width: 1536,
    height: 1024,
  };
  imageMeta[`${key}-concept`] = {
    src: `/images/onurim/${guide.slug}/concept.webp`,
    alt: `${guide.title}과 관련된 몸의 구조나 작동 개념을 과장 없이 단순화한 원본 교육용 도식`,
    caption: "질환의 큰 흐름만 단순화했으며 실제 해부 구조, 개인 검사 결과나 진단 영상을 나타내지 않습니다.",
    width: 1536,
    height: 1024,
  };
  imageMeta[`${key}-action`] = {
    src: `/images/onurim/${guide.slug}/action.webp`,
    alt: `${guide.title}의 변화 관찰, 기록, 의료 도움 요청 순서를 세 장면으로 단순화한 교육용 도식`,
    caption: "기록은 진단기가 아닙니다. 새롭고 심한 변화에서는 기록보다 의료 도움을 우선합니다.",
    width: 1536,
    height: 1024,
  };
}

function ClaimStatus({ ids }: { ids: string[] }) {
  return (
    <span className="onurim-claim-status" data-claim-ids={ids.join(",")}>
      출처 연결 {ids.length}개
    </span>
  );
}

export function HealthArticlePage({ article }: { article: HealthArticle }) {
  const sources = getSources(article.sourceIds);
  const tools = article.toolSlugs
    .map((slug) => healthTools.find((tool) => tool.slug === slug))
    .filter(Boolean);
  const articleClaims = healthClaims.filter((claim) => claim.articleSlug === article.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: absoluteUrl(`/health/${article.slug}`),
    dateModified: "2026-08-26",
    author: {
      "@type": "Person",
      name: "박영훈",
      jobTitle: "비의료인 건강정보 편집자",
      url: absoluteUrl("/health/trust/author"),
    },
    publisher: {
      "@type": "Organization",
      name: "오누림",
      url: absoluteUrl("/"),
    },
    isBasedOn: sources.map((source) => source.url),
  };

  return (
    <article className="onurim-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="onurim-article-hero">
        <div>
          <p className="onurim-eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="onurim-lead">{article.description}</p>
          <div className="onurim-review-strip" aria-label="콘텐츠 검토 상태">
            <span>공식 출처 확인</span>
            <span>일반 건강교육</span>
            <span>면허 의료인 검수 미완료</span>
          </div>
          <p className="onurim-byline">
            작성: <Link href="/health/trust/author">박영훈 · 비의료인 건강정보 편집자</Link>
          </p>
        </div>
        <figure className="onurim-hero-figure">
          <Image
            src={imageMeta[article.imageIds[0]].src}
            alt={imageMeta[article.imageIds[0]].alt}
            width={imageMeta[article.imageIds[0]].width}
            height={imageMeta[article.imageIds[0]].height}
            sizes="(max-width: 900px) 100vw, 42vw"
            priority
          />
          <figcaption>{imageMeta[article.imageIds[0]].caption}</figcaption>
        </figure>
      </header>

      <section className="onurim-outcome" aria-labelledby="reader-outcome">
        <p id="reader-outcome" className="onurim-mini-label">이 글을 읽고 할 수 있는 일</p>
        <p>{article.outcome}</p>
      </section>

      <section className="onurim-summary" aria-labelledby="summary-title">
        <h2 id="summary-title">먼저 기억할 세 가지</h2>
        <ul>{article.summary.map((item) => <li key={item}>{item}</li>)}</ul>
        <a className="onurim-urgent-jump" href="#urgent-action">응급 신호와 119 안내 바로 보기</a>
      </section>

      <div className="onurim-article-grid">
        <div className="onurim-article-body">
          {article.sections.map((section, index) => {
            const imageIndex = index === 1 ? 1 : index === 4 ? 3 : section.tone === "warning" ? 2 : -1;
            const imageId = section.imageId === null ? undefined : section.imageId ?? (imageIndex >= 0 ? article.imageIds[imageIndex] : undefined);
            const image = imageId ? imageMeta[imageId] : undefined;
            return (
              <section
                key={section.title}
                className={`onurim-content-section onurim-tone-${section.tone ?? "default"}`}
                id={section.tone === "warning" ? "urgent-action" : undefined}
                data-claim-ids={section.claimIds.join(",")}
              >
                <div className="onurim-section-heading">
                  <h2>{section.title}</h2>
                  <ClaimStatus ids={section.claimIds} />
                </div>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                {image ? (
                  <figure className="onurim-body-figure">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 900px) 100vw, 56vw"
                    />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ) : null}
              </section>
            );
          })}

          <section className="onurim-content-section" aria-labelledby="faq-title">
            <h2 id="faq-title">자주 묻는 질문</h2>
            <div className="onurim-faq-list">
              {article.faq.map((item) => (
                <details key={item.question} data-claim-ids={item.claimIds.join(",")}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                  <ClaimStatus ids={item.claimIds} />
                </details>
              ))}
            </div>
          </section>

          <section className="onurim-content-section" aria-labelledby="sources-title">
            <h2 id="sources-title">확인한 공식 출처</h2>
            <ol className="onurim-source-list">
              {sources.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.organization}, {source.title}</a>
                  <span>확인 {source.retrievedAt} · {source.id}</span>
                </li>
              ))}
            </ol>
            <p className="onurim-state-note">
              마지막 출처 대조: 2026-08-26 · claim {articleClaims.length}개 · OFFICIAL_SOURCE_CHECKED ·
              PUBLIC_SAFETY_ADJUDICATED · NOT_MEDICALLY_REVIEWED
            </p>
          </section>
        </div>

        <aside className="onurim-article-aside" aria-label="기록과 질문 도구">
          <p className="onurim-mini-label">바로 쓰는 도구</p>
          <h2>기록하고 물어보기</h2>
          <div className="onurim-tool-links">
            {tools.map((tool) => tool ? (
              <Link key={tool.slug} href={`/health/tools/${tool.slug}`}>
                <strong>{tool.title}</strong>
                <span>{tool.description}</span>
              </Link>
            ) : null)}
          </div>
          <p className="onurim-aside-note">입력 내용은 서버로 전송하거나 저장하지 않습니다. 공용 기기에서는 작성하지 마세요.</p>
        </aside>
      </div>
    </article>
  );
}
