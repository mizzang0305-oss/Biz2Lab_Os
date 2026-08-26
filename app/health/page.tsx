import type { Metadata } from "next";
import Link from "next/link";

import { healthArticles, healthTools, type HealthArticleSlug } from "@/lib/health-v3/content";
import { expansionGuideSummaries } from "@/lib/health-v3/public-expansion";
import { healthSupportGuides } from "@/lib/health-v3/support-guides";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "질환을 쉽게 이해하고 필요한 도움을 찾는 건강 안내서",
  description: "20개 주요 질환을 쉬운 말과 원본 교육 그림으로 이해하고, 증상 기록과 진료 질문을 준비하는 오누림 건강 안내서입니다.",
  path: "/health",
});

const guideCards: Array<{ slug: HealthArticleSlug; cluster: string; detail: string }> = [
  { slug: "hypertension", cluster: "심장·혈관", detail: "혈압 숫자, 안정된 측정, 7일 기록과 진료 질문" },
  { slug: "type-2-diabetes", cluster: "대사·혈당", detail: "혈당과 인슐린, 검사 용어, 관찰 기록과 가족 지원" },
  { slug: "allergic-rhinitis", cluster: "호흡·알레르기", detail: "증상·환경 관찰, 진료 질문과 가족의 준비" },
  { slug: "gastroesophageal-reflux-disease", cluster: "소화", detail: "속쓰림 흐름, 시간 기록과 위험 신호 질문" },
  { slug: "osteoarthritis", cluster: "뼈·관절", detail: "관절의 일상 변화, 활동 기록과 진료 준비" },
  { slug: "osteoporosis", cluster: "뼈·관절", detail: "골밀도 질문, 낙상 환경 점검과 진료 준비" },
  ...expansionGuideSummaries.map((guide) => ({
    slug: guide.slug,
    cluster: guide.cluster,
    detail: guide.description,
  })),
];

export default function OnurimHomePage() {
  return (
    <div className="onurim-home">
      <section className="onurim-home-hero">
        <div>
          <p className="onurim-eyebrow">ONURIM · 일반 건강교육 안내서</p>
          <h1>어려운 질병 이야기,<br />가족에게 설명하듯 쉽게 알려드릴게요</h1>
          <p>읽고 끝나는 글보다, 무엇을 기록하고 진료에서 무엇을 물어볼지 준비할 수 있는 안내서를 만듭니다.</p>
          <div className="onurim-hero-actions">
            <Link href="/health/hypertension">고혈압 안내 보기</Link>
            <Link href="/health/allergic-rhinitis">알레르기 비염 안내 보기</Link>
          </div>
        </div>
        <div className="onurim-orbit" aria-hidden>
          <span>이해</span><span>기록</span><span>질문</span><span>도움</span>
        </div>
      </section>

      <section className="onurim-home-section">
        <p className="onurim-mini-label">오누림이 하는 일</p>
        <h2>몸의 변화를 혼자 결론 내리지 않도록</h2>
        <div className="onurim-value-grid">
          <article><span>01</span><h3>먼저 이해해요</h3><p>짧은 설명과 일상 비유로 낯선 용어의 문턱을 낮춥니다.</p></article>
          <article><span>02</span><h3>있는 그대로 기록해요</h3><p>숫자만이 아니라 시간, 상황과 증상을 함께 남깁니다.</p></article>
          <article><span>03</span><h3>질문을 준비해요</h3><p>자가 진단 대신 진료에서 확인할 질문을 구체적으로 만듭니다.</p></article>
          <article><span>04</span><h3>도움이 먼저인 때를 알아요</h3><p>위급한 변화에서는 기록보다 119와 응급 의료 도움을 우선합니다.</p></article>
        </div>
      </section>

      <section className="onurim-home-section">
        <p className="onurim-mini-label">20개 주요 질환 안내</p>
        <h2>몸의 변화부터 진료 질문까지</h2>
        <div className="onurim-pilot-grid">
          {guideCards.map((guide) => (
            <Link key={guide.slug} href={`/health/${guide.slug}`}>
              <span>{guide.cluster}</span><h3>{healthArticles[guide.slug].title}</h3><p>{guide.detail}</p><strong>안내 열기 →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="onurim-home-section">
        <p className="onurim-mini-label">증상·검사·가족 준비</p>
        <h2>질환을 넘어 바로 쓰는 건강 가이드</h2>
        <div className="onurim-pilot-grid">
          {healthSupportGuides.map((guide) => (
            <Link key={guide.slug} href={`/health/guides/${guide.slug}`}>
              <span>생활 건강</span><h3>{guide.title}</h3><p>{guide.description}</p><strong>가이드 열기 →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section id="tools" className="onurim-home-section">
        <p className="onurim-mini-label">오늘 바로 쓰는 도구</p>
        <h2>저장하고 출력할 수 있어요</h2>
        <div className="onurim-tools-grid">
          {healthTools.map((tool) => (
            <Link key={tool.slug} href={`/health/tools/${tool.slug}`}>
              <span>{healthArticles[tool.articleSlug].title}</span>
              <strong>{tool.title}</strong><p>{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="onurim-emergency-gateway">
        <div><p className="onurim-mini-label">즉시 도움이 필요한 때</p><h2>증상을 맞히려 하지 말고 도움부터 요청하세요</h2></div>
        <p>의식이 흐려지거나 숨쉬기 어렵고, 갑작스러운 한쪽 힘 빠짐이나 심한 가슴 통증처럼 새롭고 심한 변화가 있으면 온라인 글을 더 읽으며 기다리지 말고 119에 도움을 요청합니다.</p>
      </section>

      <section className="onurim-home-section">
        <p className="onurim-mini-label">콘텐츠를 만드는 방법</p>
        <h2>확인한 것과 아직 확인하지 않은 것을 나눕니다</h2>
        <div className="onurim-process-grid">
          <article><strong>공식 출처</strong><p>질병관리청, NIH/NIDDK, CDC 자료를 claim 단위로 연결합니다.</p></article>
          <article><strong>사람 편집자</strong><p>박영훈 비의료인 건강정보 편집자가 독자가 읽고 쓸 구조를 책임집니다.</p></article>
          <article><strong>검수 상태</strong><p>공식 출처 확인과 의료인 검수는 다릅니다. 현재 의료인 검수는 미완료입니다.</p></article>
          <article><strong>AI 활용 공개</strong><p>자료 정리와 초안, 원본 교육 삽화를 보조했으며 의료 전문가로 표시하지 않습니다.</p></article>
        </div>
      </section>

      <section className="onurim-correction">
        <div><p className="onurim-mini-label">정정과 연락</p><h2>실제 사람이 제보를 확인합니다</h2></div>
        <p>공개 GitHub Issues에서 글 URL과 정정할 문장을 받습니다. 개인정보·검사 결과·처방전은 올리지 마세요.</p>
        <Link href="/health/trust/corrections-policy">정정 제보 방법 보기</Link>
      </section>
    </div>
  );
}
