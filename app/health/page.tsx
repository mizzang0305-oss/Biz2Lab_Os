import type { Metadata } from "next";
import Link from "next/link";

import { healthTools } from "@/lib/health-v3/content";
import { healthHubUpdatedAt } from "@/lib/health-v3/entry-pages";
import { hubConditions, hubConditionGroups, hubSupportGroups, hubToolKind } from "@/lib/health-v3/health-hub";
import { healthSupportGuides } from "@/lib/health-v3/support-guides";
import { breadcrumbJsonLd, createMetadata, jsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "질환별 건강 안내서와 검사·진료 준비 도구 찾기",
  description: "20개 질환을 분야별로 찾고, 검사표·증상 기록·가족 지원을 위한 9개 가이드와 34개 인쇄 도구를 살펴보세요. 각 자료의 쓰임과 도움 요청의 우선순위를 구분합니다.",
  path: "/health",
});

export default function OnurimHealthHub() {
  return (
    <div className="onurim-home onurim-hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
        { name: "오누림", url: absoluteUrl("/") },
        { name: "건강 자료 찾기", url: absoluteUrl("/health") },
      ])) }} />
      <header className="onurim-hub-intro">
        <Link href="/">오누림 홈</Link>
        <h1>질환·검사·진료 준비 자료 찾기</h1>
        <p>설명을 읽을지, 검사표의 용어를 확인할지, 인쇄할 양식을 찾을지에 따라 골라보세요. 질환별 안내와 여러 질환에서 함께 쓰는 자료를 나눴습니다.</p>
        <nav className="onurim-hub-jumps" aria-label="자료 종류 바로가기">
          <Link href="#conditions">20개 질환 안내</Link>
          <Link href="#guides">9개 공통 가이드</Link>
          <Link href="#tools">34개 인쇄 도구</Link>
        </nav>
      </header>

      <section className="onurim-hub-urgent" aria-labelledby="hub-urgent-title">
        <h2 id="hub-urgent-title">지금 위급하다면 자료를 찾기보다 119가 먼저입니다</h2>
        <p>의식 저하나 심한 호흡곤란 같은 위급한 변화가 있으면 즉시 119에 연락합니다. 글을 읽거나 기록을 완성하며 기다리지 마세요. 이 예시만으로 모든 응급상황을 판단할 수는 없습니다.</p>
        <Link href="/health/guides/danger-signals">평소에 알아둘 위험 신호와 신고 후 안내</Link>
        <p className="onurim-hub-source">근거: <a href="https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/">소방청 119 구급신고 요령</a>, <a href="https://medlineplus.gov/ency/article/001927.htm">MedlinePlus 응급상황 안내</a></p>
      </section>

      <section id="conditions" className="onurim-hub-section">
        <h2>20개 주요 질환 안내</h2>
        <p>분야는 자료를 찾기 위한 묶음입니다. 증상으로 병명을 정하거나 어느 진료과로 갈지 판정하는 목록이 아닙니다.</p>
        <nav className="onurim-hub-group-jumps" aria-label="질환 분야 바로가기">
          {hubConditionGroups.map(group => <Link key={group.id} href={`#condition-${group.id}`}>{group.title}</Link>)}
        </nav>
        <div className="onurim-hub-directory">
          {hubConditionGroups.map(group => (
            <section key={group.id} id={`condition-${group.id}`}>
              <h3>{group.title}</h3>
              <ul>{group.slugs.map(slug => (
                <li key={slug}><Link href={`/health/${slug}`}><strong>{hubConditions[slug].name}</strong><span>{hubConditions[slug].detail}</span></Link></li>
              ))}</ul>
            </section>
          ))}
        </div>
      </section>

      <section id="guides" className="onurim-hub-section">
        <h2>여러 질환에서 함께 쓰는 9개 가이드</h2>
        <p>특정 병명을 먼저 고르지 않아도 읽을 수 있습니다. 검사·기록·진료 준비 중 지금 필요한 내용을 찾으세요.</p>
        <div className="onurim-hub-directory">
          {hubSupportGroups.map(group => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.slugs.map(slug => {
                const guide = healthSupportGuides.find(item => item.slug === slug)!;
                return <li key={slug}><Link href={`/health/guides/${slug}`}><strong>{guide.title}</strong><span>{guide.description}</span></Link></li>;
              })}</ul>
            </section>
          ))}
        </div>
      </section>

      <section id="tools" className="onurim-hub-section">
        <h2>인쇄해서 쓰는 34개 건강 도구</h2>
        <p>질환별 설명을 읽은 뒤 필요한 기록표·질문지·참고 자료를 선택하세요. 빈칸은 인쇄 후 손으로 작성하며, 사이트에 기록을 저장하거나 제출하는 기능은 없습니다. 일부 화면의 체크는 임시 표시입니다.</p>
        <p>뇌졸중·심근경색 메모는 <strong>119 신고 후</strong> 아는 사실을 전하는 보조 자료입니다. 인쇄·작성 때문에 신고를 미루지 않으며, 치료 뒤 질문을 응급 중에 끝낼 필요도 없습니다.</p>
        <Link href="/health/trust/privacy">기록표·출력물과 개인정보 안내</Link>
        <div className="onurim-hub-directory onurim-hub-tool-directory">
          {hubConditionGroups.flatMap(group => group.slugs).map(slug => (
            <section key={slug}>
              <h3>{hubConditions[slug].name} 도구</h3>
              <ul>{healthTools.filter(tool => tool.articleSlug === slug).map(tool => (
                <li key={tool.slug}>
                  <Link href={`/health/tools/${tool.slug}`}><strong>{tool.title}</strong><span className="onurim-hub-tool-kind">{hubToolKind(tool)}</span></Link>
                  <p>{tool.description}</p>
                </li>
              ))}</ul>
            </section>
          ))}
        </div>
      </section>

      <section className="onurim-hub-section onurim-hub-trust">
        <h2>자료의 출처와 확인 상태</h2>
        <p><Link href="/health/trust/author">박영훈 비의료인 건강정보 편집자</Link>가 작성합니다. <Link href="/health/trust/sources-policy">공식 원문 대조</Link>는 의료인의 임상 검수와 다릅니다. 현재 의료인 검수는 미완료입니다.</p>
        <ul>
          <li><Link href="/health/trust/medical-review-policy">의료 검토의 현재 상태</Link></li>
          <li><Link href="/health/trust/ai-disclosure">AI 활용 공개와 실제 독자 테스트 상태</Link></li>
          <li><Link href="/health/trust/corrections-policy">정정 원칙과 현재 접수 경로</Link></li>
        </ul>
        <p>공개 게시판의 새 글 접수 가능 여부는 확인되지 않았습니다. 개인정보·검사 결과·처방전을 공개 공간에 올리지 마세요.</p>
        <p className="onurim-hub-date">자료 찾기 안내 수정 <time dateTime={healthHubUpdatedAt}>{healthHubUpdatedAt}</time>. 의료 검수일이나 모든 글의 수정일이 아닙니다.</p>
      </section>
    </div>
  );
}
