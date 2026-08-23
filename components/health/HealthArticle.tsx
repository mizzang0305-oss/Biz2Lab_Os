import Link from "next/link";
import Image from "next/image";

import {
  getSources,
  healthClaims,
  healthTools,
  type HealthArticle,
} from "@/lib/health-v3/content";

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
};

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

  return (
    <article className="onurim-article">
      <header className="onurim-article-hero">
        <div>
          <p className="onurim-eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="onurim-lead">{article.description}</p>
          <div className="onurim-review-strip" aria-label="콘텐츠 검토 상태">
            <span>공식 출처 매핑 완료</span>
            <span>의료인 검수 미완료</span>
            <span>Production 공개 차단</span>
          </div>
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
      </section>

      <div className="onurim-article-grid">
        <div className="onurim-article-body">
          {article.sections.map((section, index) => {
            const imageIndex = index === 1 ? 1 : index === 4 ? 3 : section.tone === "warning" ? 2 : -1;
            const image = imageIndex >= 0 ? imageMeta[article.imageIds[imageIndex]] : undefined;
            return (
              <section
                key={section.title}
                className={`onurim-content-section onurim-tone-${section.tone ?? "default"}`}
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
              마지막 출처 대조: 2026-08-24 · claim {articleClaims.length}개 · OFFICIAL_SOURCE_CHECKED ·
              NOT_MEDICALLY_REVIEWED · PRODUCTION_BLOCKED
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
