import type { Metadata } from "next";
import Link from "next/link";

import { editorialIdentity } from "@/lib/editorial-evidence";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "소개·편집 원칙",
  description:
    "Biz2Lab PLAY가 영화 추천, 결말 해석과 OTT 도움말을 고르고 검토하는 방법, 스포일러·AI·저작권·수정 원칙을 공개합니다.",
  path: "/ko/about",
});

export default function AboutPage() {
  return (
    <main className="bg-[#fffdf9]">
      <header className="border-b border-orange-100 bg-[#fff8ee]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-5 sm:py-18">
          <p className="text-sm font-bold text-[#ef5b3f]">많이 나열하지 않고 한 편을 고릅니다</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.03em] text-[#20162c] sm:text-5xl">
            Biz2Lab PLAY 소개
          </h1>
          <div className="mt-6 grid gap-4 text-lg leading-8 text-[#675f72]">
            <p>
              Biz2Lab PLAY는 오늘 볼 영화 선택, 엔딩 뒤의 해석, Netflix와 OTT 설정을 다루는
              한국어 엔터테인먼트 매거진입니다.
            </p>
            <p>
              작품을 많이 나열하기보다 지금의 기분, 남은 시간, 함께 보는 사람과 스포일러
              민감도를 기준으로 실제 선택에 도움이 되는 글을 만듭니다.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-16">
        <section className="rounded-[1.5rem] border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-2xl font-black text-[#20162c]">현재 공개 범위</h2>
          <ul className="mt-5 grid gap-3 leading-7 text-[#514858]">
            <li>영화 선택 8개, 결말·주제 해석 8개, OTT 생활 6개로 총 22개 글을 공개합니다.</li>
            <li>기존 업무 자동화와 매출 관리 글 53개는 새 편집 목적과 맞지 않아 모두 비공개로 보류했습니다.</li>
            <li>검색량만 보고 제목을 복제하지 않고 글마다 다른 질문, 장면과 적용 범위를 둡니다.</li>
            <li>로그인·이메일 입력 없이 취향 질문, 러닝타임과 구독 비용 계산 도구를 사용할 수 있습니다.</li>
          </ul>
          <Link
            href="/ko/what-to-watch"
            className="mt-5 inline-flex rounded-full bg-[#20162c] px-5 py-3 text-sm font-black text-white transition hover:bg-[#ef5b3f]"
          >
            오늘 볼 영화 고르기
          </Link>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">누가 운영하고 검토하나요?</h2>
          <div className="mt-5 grid gap-4 leading-7 text-[#514858]">
            <p>
              표시 작성·검토 주체는 {editorialIdentity.authorName}입니다. 저장소와 수정 이력을
              관리하는 공개 운영 책임 계정은{" "}
              <a
                className="font-bold text-violet-700 underline-offset-4 hover:underline"
                href={editorialIdentity.operatorUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {editorialIdentity.operatorName}
              </a>
              입니다.
            </p>
            <p>
              확인할 수 없는 영화제 경력, 기자 자격, 업계 관계, 시사회 참석과 직접 보지 않은
              작품의 체험담을 만들지 않습니다. 오류는{" "}
              <Link className="font-bold text-violet-700 hover:underline" href="/ko/contact">
                문의 페이지
              </Link>
              에서 받습니다.
            </p>
          </div>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">어떻게 글을 만드나요?</h2>
          <ol className="mt-5 grid list-decimal gap-3 pl-5 leading-7 text-[#514858]">
            <li>Google 자동완성 등 현재 검색 표현을 확인하되, 사이트의 세 가지 주제 안에서만 고릅니다.</li>
            <li>추천 글은 러닝타임, 기분, 동행, 강도처럼 독자가 직접 판단할 수 있는 기준을 먼저 만듭니다.</li>
            <li>해석 글은 줄거리 전체를 다시 쓰지 않고 장면, 소품과 인물의 선택을 근거로 하나의 관점을 제시합니다.</li>
            <li>OTT 설정은 Netflix, 영상물등급위원회 등 공식 도움말을 우선 확인하고 확인 날짜를 표시합니다.</li>
            <li>작품 제공 여부, 요금, 메뉴와 정책은 바뀔 수 있으므로 변동 가능성을 본문에 명시합니다.</li>
            <li>모든 글은 중복 문단, 깨진 링크, 과장 표현, 독창성 검토, 스포일러 표시와 모바일 화면을 확인한 뒤 공개합니다.</li>
          </ol>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">AI는 어디까지 사용하나요?</h2>
          <div className="mt-5 grid gap-4 leading-7 text-[#514858]">
            <p>
              AI 도구는 검색어 후보 정리, 초안 구조화와 누락 항목 점검에 사용할 수 있습니다. 그러나
              작품을 직접 봤다는 체험, 개인 감정과 존재하지 않는 인터뷰를 만들어 넣지 않습니다.
            </p>
            <p>
              최종 제목, 문장, 해석의 강도, 공식 출처와 공개 여부는 운영자가 다시 확인합니다.
              대량 생성된 글을 자동으로 공개하는 기능은 사용하지 않습니다.
            </p>
          </div>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">스포일러와 해석 원칙</h2>
          <div className="mt-5 grid gap-4 leading-7 text-[#514858]">
            <p>
              결말이나 핵심 반전을 다루는 글은 제목 아래에 `결말 스포일러 포함`을 표시합니다.
              선택 가이드와 OTT 도움말은 불필요한 줄거리 설명을 피합니다.
            </p>
            <p>
              영화 해석은 하나의 가능한 읽기입니다. 감독의 의도를 확정하거나 다른 감상을 틀렸다고
              말하지 않습니다. 장면에서 확인되지 않는 사실은 단정하지 않습니다.
            </p>
          </div>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">이미지·저작권 원칙</h2>
          <div className="mt-5 grid gap-4 leading-7 text-[#514858]">
            <p>
              검색에서 찾은 포스터, 스틸컷과 영상 캡처를 허가 없이 복사해 사용하지 않습니다.
              스튜디오 프레스 페이지가 편집 용도를 명시한 자료만 원형을 해치지 않는 범위에서 사용하고,
              이미지마다 권리자, 공식 출처와 확인일을 함께 표시합니다.
            </p>
            <p>
              줄거리, 다른 리뷰와 공식 소개문을 길게 옮기지 않습니다. 필요한 사실은 짧게 확인하고
              Biz2Lab PLAY의 선택 기준과 분석을 중심으로 작성합니다.
            </p>
          </div>
        </section>

        <section className="mt-10 border-t border-[#eee8e2] pt-8">
          <h2 className="text-2xl font-black text-[#20162c]">수정일과 광고 독립성</h2>
          <div className="mt-5 grid gap-4 leading-7 text-[#514858]">
            <p>
              22개 글은 2026년 7월 17일 같은 개편 작업에서 처음 공개했습니다. 서로 다른 날짜로
              꾸미지 않으며, 메뉴·정책·내용이 실제로 달라졌을 때만 수정일을 갱신합니다.
            </p>
            <p>
              현재 글에는 유료 협찬과 제휴 링크가 없습니다. Google AdSense 승인 여부나 광고 수익이
              작품의 추천, 해석과 검토 보류 기준을 바꾸지 않습니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
