import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HealthComparisonTable } from "@/components/health/HealthComparisonTable";
import { getSources, healthArticles } from "@/lib/health-v3/content";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, createMetadata, jsonLd } from "@/lib/seo";

const article = healthArticles.hypertension;
const homeSource = getSources(["SRC-AHA-HOME-BP"])[0].url;
const diagnosisSource = getSources(["SRC-KDCA-HTN"])[0].url;
const measurementSource = "https://www.heart.org/-/media/Files/Health-Topics/High-Blood-Pressure/How_to_Measure_Your_Blood_Pressure_Letter_Size.pdf";
const emergencySource = "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/when-to-call-911-for-high-blood-pressure";
const localEmergencySource = "https://www.kdca.go.kr/bbs/kdca/42/305195/download.do";

export const metadata: Metadata = createMetadata({
  title: article.seoTitle ?? article.title,
  description: article.description,
  path: "/health/hypertension",
  type: "article",
});

// Reader edition only: original claim/review registry remains intact in content.ts.
// Direct citations bind this wording; source checking is not clinical review.
export default function HypertensionPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: absoluteUrl("/health/hypertension"),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: ["hero.webp", "checklist.webp", "warning.webp"].map(name => absoluteUrl(`/images/onurim/hypertension/${name}`)),
    author: { "@type": "Person", name: "박영훈", jobTitle: "비의료인 건강정보 편집자", url: absoluteUrl("/health/trust/author") },
    publisher: { "@type": "Organization", name: "오누림", url: absoluteUrl("/") },
    isBasedOn: [homeSource, measurementSource, diagnosisSource, emergencySource, localEmergencySource],
  };

  return (
    <article className="onurim-article onurim-seo-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
        { name: "오누림", url: absoluteUrl("/") },
        { name: "건강 가이드", url: absoluteUrl("/health") },
        { name: article.title, url: absoluteUrl("/health/hypertension") },
      ])) }} />

      <header className="onurim-article-hero">
        <div>
          <p className="onurim-eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="onurim-lead">집에서는 혈압이 괜찮았는데 병원에서 높게 나오면 어느 숫자를 믿어야 할지 헷갈립니다. 그럴 때는 두 장소의 기록을 함께 가져가세요. 측정한 시간과 당시 상황이 있으면 차이를 확인하는 데 도움이 됩니다.</p>
          <p className="onurim-byline">작성: <Link href="/health/trust/author">박영훈 · 비의료인 건강정보 편집자</Link></p>
          <p className="onurim-byline">발행 <time dateTime={article.publishedAt}>{article.publishedAt}</time> · 수정 <time dateTime={article.updatedAt}>{article.updatedAt}</time></p>
        </div>
        <figure className="onurim-hero-figure">
          <Image src="/images/onurim/hypertension/hero.webp" alt="집에서 혈압을 잰 뒤 기록표에 숫자와 시간을 적는 성인의 교육용 삽화" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 42vw" preload />
          <figcaption>측정을 마친 뒤 원래 값을 적는 장면입니다. 측정하는 동안에는 쓰거나 움직이지 않습니다.</figcaption>
        </figure>
      </header>

      <nav className="onurim-summary" aria-label="이 글에서 할 일">
        <ol>
          <li><a href="#measure">같은 조건으로 측정하기</a></li>
          <li><a href="#record">원래 값과 상황 기록하기</a></li>
          <li><a href="#visit">진료에서 물어보기</a></li>
        </ol>
        <a className="onurim-urgent-jump" href="#urgent-action">급한 증상이 있다면 119 안내부터 확인하세요</a>
      </nav>

      <div className="onurim-article-grid">
        <div className="onurim-article-body">
          <section id="measure" className="onurim-content-section" aria-labelledby="measure-title">
            <h2 id="measure-title">1. 숫자보다 먼저, 측정 조건을 맞추세요</h2>
            <p>검증된 위팔형 혈압계와 팔 둘레에 맞는 커프를 사용하세요. 기기나 커프가 맞는지 모르겠다면 의료진·약사에게 확인하세요.</p>
            <ol>
              <li>측정 전 30분 동안 흡연·카페인 음료·운동을 피합니다.</li>
              <li>화장실을 다녀온 뒤 조용히 5분 이상 쉽니다.</li>
              <li>등을 기대고 발바닥을 바닥에 둡니다. 다리는 꼬지 않습니다.</li>
              <li>맨팔에 커프를 감고 팔을 심장 높이에서 받칩니다. 기기 설명서의 착용 위치도 확인합니다.</li>
              <li>측정 중에는 말하거나 휴대전화를 사용하지 않습니다.</li>
              <li>1분 간격으로 두 번 잰 뒤, 두 값 모두 기록합니다.</li>
            </ol>
            <p className="onurim-section-sources">측정 순서 근거: <a href={homeSource} target="_blank" rel="noreferrer">미국심장협회 가정혈압 안내</a> · <a href={measurementSource} target="_blank" rel="noreferrer">측정 자세·순서 자료(PDF)</a></p>
            <figure className="onurim-body-figure">
              <Image src="/images/onurim/hypertension/checklist.webp" alt="등과 팔을 받치고 발바닥을 바닥에 둔 채 맨팔 커프로 혈압을 재는 자세의 교육용 삽화" width={1024} height={1536} sizes="(max-width: 900px) 100vw, 56vw" />
              <figcaption>등·발·팔의 위치를 먼저 확인하고 조용히 측정합니다.</figcaption>
            </figure>
          </section>

          <section id="record" className="onurim-content-section" aria-labelledby="record-title">
            <h2 id="record-title">2. 두 번째 숫자만 골라 쓰지 마세요</h2>
            <p>아래는 작성 방법을 보여 주는 <strong>가상 예시</strong>입니다. 실제 환자의 기록이 아니며, 정상 혈압이나 개인 목표값을 뜻하지 않습니다.</p>
            <HealthComparisonTable table={{
              caption: "가상 혈압 기록 예시 — 실제 환자 기록·목표값이 아닙니다",
              columns: ["날짜·시각", "측정", "혈압", "맥박"],
              rows: [["10월 1일 07:00", "1차", "142/88 mmHg", "71회/분"], ["10월 1일 07:01", "2차", "139/87 mmHg", "70회/분"]],
            }} />
            <p><strong>가상 메모:</strong> 5분 앉아 쉰 후 측정 / 대화 없음 / 특별한 증상 없음.</p>
            <p>두 번째 값이 더 낮아도 첫 번째 값을 지우지 않습니다. 날짜·시각과 원래 값, 측정 조건을 함께 남기세요. 측정값만 보고 처방약을 임의로 늘리거나 줄이지 마세요. <a href={homeSource} target="_blank" rel="noreferrer">미국심장협회의 기록·약물 복용 안내</a></p>
            <p><Link href="/health/tools/blood-pressure-log">가정 혈압 기록표를 열어 인쇄하기</Link> — 종이에 쓰는 인쇄용 양식입니다. 건강 수치를 화면에 입력하거나 저장하는 기능은 없습니다.</p>
          </section>

          <section id="visit" className="onurim-content-section" aria-labelledby="visit-title">
            <h2 id="visit-title">3. 어느 값이 맞는지보다, 차이를 함께 물어보세요</h2>
            <p>집에서는 낮고 진료실에서만 높으면 백의 고혈압, 진료실에서는 낮고 일상에서 높으면 가면 고혈압 같은 양상일 수 있습니다. 한 번의 값이나 이 설명만으로 진단할 수는 없습니다. 의료진이 반복 기록과 측정 조건을 확인하고, 필요하면 24시간 활동혈압 검사 여부를 판단합니다. <a href={diagnosisSource} target="_blank" rel="noreferrer">질병관리청의 진료실 밖 혈압·진단 설명</a></p>
            <p>집과 병원에서 잰 기록, 사용하는 혈압계, 복용 중인 약 정보를 준비하고 다음 세 가지를 물어보세요.</p>
            <ul>
              <li>제 혈압계·커프와 측정 자세가 맞는지 확인해 주실 수 있나요?</li>
              <li>저는 언제, 몇 번씩, 며칠 동안 기록하면 될까요?</li>
              <li>제 개인 목표와 의료진에게 즉시 연락해야 하는 기준은 무엇인가요?</li>
            </ul>
            <p>답을 들은 뒤에는 측정 계획, 다음 진료일, 연락할 곳을 메모해 두세요. <Link href="/health/tools/blood-pressure-questions">혈압 진료 질문 카드</Link>에 질문과 답을 함께 적을 수 있습니다. <a href={homeSource} target="_blank" rel="noreferrer">혈압계 확인·기록 공유에 관한 미국심장협회 안내</a></p>
          </section>

          <section id="urgent-action" className="onurim-content-section onurim-tone-warning" aria-labelledby="urgent-title">
            <h2 id="urgent-title">수치 확인보다 119가 먼저인 때</h2>
            <p><strong>갑작스러운 심한 가슴 통증, 호흡곤란, 한쪽 마비, 말이나 시야의 이상</strong>이 있으면 혈압 숫자를 확인하거나 내려가는지 기다리지 말고 119에 도움을 요청하세요. 직접 운전하지 마세요. <a href={localEmergencySource} target="_blank" rel="noreferrer">질병관리청의 조기증상·119 대응 안내(PDF)</a></p>
            <p>그런 증상이 없는 경우, 미국심장협회의 <strong>임신하지 않은 성인</strong> 안내는 수축기 혈압이 <strong>180 mmHg 초과</strong> 또는 이완기 혈압이 <strong>120 mmHg 초과</strong>이면 최소 1분 후 다시 측정하고, 계속 높으면 즉시 의료진에게 연락하도록 설명합니다. 혈압이 매우 높고 가슴 통증·호흡곤란·마비·말이나 시야 이상 등의 증상이 함께 있으면 재측정을 기다리지 말고 119에 연락하세요. <a href={emergencySource} target="_blank" rel="noreferrer">미국심장협회의 매우 높은 혈압·응급 증상 안내</a> · <a href={measurementSource} target="_blank" rel="noreferrer">수축기 또는 이완기 기준표(PDF)</a></p>
            <p>이 숫자보다 낮아도 안전이 보장되는 것은 아닙니다. 임신 중이거나 소아인 경우 이 성인 기준을 적용하지 마세요. 개인 상태에 따른 의료진의 지침이 우선입니다.</p>
            <figure className="onurim-body-figure">
              <Image src="/images/onurim/hypertension/warning.webp" alt="갑작스러운 가슴 통증과 호흡곤란, 한쪽 힘 빠짐과 말 이상 때 119 도움을 우선하는 교육용 삽화" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 56vw" />
              <figcaption>급한 증상이 있으면 기록을 완성하거나 재측정하며 기다리지 않습니다.</figcaption>
            </figure>
          </section>

          <footer className="onurim-content-section">
            <p>일반 건강정보이며 개인의 진단과 치료를 대신하지 않습니다. 면허 의료인의 검수를 받지 않았습니다. 공식자료 확인 <time dateTime="2026-10-01">2026-10-01</time>.</p>
            <p><Link href="/health/trust/sources-policy">출처 선정 기준</Link> · <Link href="/health/trust/editorial-policy">편집 원칙</Link> · <Link href="/health/trust/medical-review-policy">의료 검수 현재 상태</Link></p>
          </footer>
        </div>

        <aside className="onurim-article-aside" aria-label="진료 준비 도구">
          <p className="onurim-mini-label">진료 전에 준비하기</p>
          <h2>기록과 질문을 한 장씩</h2>
          <div className="onurim-tool-links">
            <Link href="/health/tools/blood-pressure-log"><strong>가정 혈압 기록표</strong><span>두 번 잰 원래 값과 측정 조건을 종이에 남깁니다.</span></Link>
            <Link href="/health/tools/blood-pressure-questions"><strong>혈압 진료 질문 카드</strong><span>측정 계획·개인 목표·연락 기준을 물어봅니다.</span></Link>
          </div>
          <p className="onurim-aside-note">기록표는 인쇄용입니다. 화면에서 건강 수치를 입력·저장·제출하는 기능은 없습니다.</p>
        </aside>
      </div>
    </article>
  );
}
