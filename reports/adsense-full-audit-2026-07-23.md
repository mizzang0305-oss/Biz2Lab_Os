---
type: audit
project: Biz2Lab_Os
status: conditional-ready-account-check-required
updated: 2026-07-23
tags:
  - adsense
  - seo
  - content-quality
  - nextjs
  - audit
---

# Biz2Lab AdSense·SEO·콘텐츠 품질 종합 감사

## A. 최종 진단

### 결론

**CONDITIONAL_READY_ACCOUNT_CHECK_REQUIRED**

코드와 공개 정보 구조는 재심사 준비 수준으로 정리했고, 대표 글 5개에는 저장소와 검증 기록으로 확인되는 실제 제작 경험과 그 한계를 추가했다. 그러나 Google AdSense 승인 여부를 코드만으로 보장할 수 없고 Search Console·AdSense의 실제 계정 상태는 운영자 확인이 필요하다. 따라서 `READY`가 아니라 조건부 준비 상태로 판정한다.

### 변경 전 핵심 위험

1. 사이트 브랜드는 실무형 AI·SaaS·업무 자동화를 표방하면서 공개 콘텐츠는 영화·OTT 중심이라 주제 정체성이 충돌했다.
2. 오락형 글 22개가 유사한 템플릿과 의사결정 프레임을 공유해 사이트 전체가 대량 생성형 콘텐츠로 오인될 가능성이 있었다.
3. 기존 실무형 글 53개 중 상당수가 비공개 검토 상태여서 사이트의 실제 전문성과 제작 경험이 공개 정보 구조에 충분히 드러나지 않았다.
4. 편집·수정 정책, 광고·제휴 고지, 면책조항이 독립된 신뢰 페이지로 제공되지 않았다.
5. 공개되지 않는 엔터테인먼트 URL을 가리키는 숨은 도구 링크가 남아 있었다.
6. 프리미엄 이미지 승인 목록과 실제 파일 상태가 한 글에서 일치하지 않았다.

### 변경 후 상태

- 공개 글: 20개
- 공개 카테고리: 3개
  - AI 업무 자동화 7개
  - 영업·매출 관리 7개
  - 소상공인 운영 6개
- 검토 보류·noindex 글: 55개
- 콘텐츠 인벤토리:
  - 유지 20개
  - 보강 6개
  - 병합 후보 27개
  - 비공개/noindex 22개
  - 삭제 0개

상세 인벤토리는 `reports/adsense-content-inventory-2026-07-23.md`에 기록했다.

## B. 사이트 구조와 기술 감사

### 기술 구조

| 영역 | 현재 구현 |
| --- | --- |
| 프레임워크 | Next.js 16.2.11 App Router, React 19.2.4 |
| 콘텐츠 저장 | `content/ko/**/*.md` + `gray-matter` |
| 콘텐츠 빌드 | 정적 생성, `generateStaticParams`, `content-index.json` |
| SEO | route metadata, canonical, Open Graph, JSON-LD |
| 발견성 | `app/sitemap.ts`, `app/robots.ts`, RSS |
| 이미지 | `next/image`, 글별 manifest, premium image gate |
| 배포 | Vercel |
| CMS | 별도 외부 CMS 없음 |

### 공개 경로

- 홈: `/ko`
- 카테고리:
  - `/ko/automation`
  - `/ko/sales-ops`
  - `/ko/small-business`
- 글: 20개 정적 상세 페이지
- 신뢰·정책:
  - `/ko/about`
  - `/ko/contact`
  - `/ko/editorial-policy`
  - `/ko/advertising`
  - `/ko/disclaimer`
  - `/ko/privacy`
  - `/ko/terms`
- 자료: `/ko/resources`
- 운영용 페이지와 API는 검색 노출 대상에서 제외한다.

### 기술 수정

- sitemap, RSS, 홈, 카테고리, 관련 글을 동일한 공개 글 집합으로 통일했다.
- 공개 카테고리를 실무형 3개로 제한했다.
- 보류 글은 `draft: true`, `noindex: true`로 유지했다.
- 숨은 broken-link를 가진 미사용 `ViewingTools` 컴포넌트를 제거했다.
- 작성자·편집 기준·수정 정책·광고 고지·면책 고지를 서로 연결했다.
- 프리미엄 이미지 승인 메타데이터를 실제 산출물과 맞췄다.
- Next.js를 16.2.9에서 16.2.11로 올려 직접 적용되던 최신 App Router 보안 권고를 해소했다.

## C. 콘텐츠 인벤토리와 분류

### 공개 유지 20개

공개 글은 실무 절차, 수치 계산, 체크리스트, CSV 자료, 실패 조건, FAQ 중 여러 요소를 갖춘 글만 선택했다.

### 우선 보강 6개

인벤토리에서 본문 길이 또는 비교 근거가 상대적으로 약한 글 6개는 공개 상태를 유지하되 운영자 사례를 추가할 우선순위로 표시했다.

### 병합 후보 27개

계약, 결제, 도구 비교 등 기존 전문 글 27개는 현재 정보 정확성, 실제 사용 증거, 제품 가격·정책의 최신성을 다시 확인하기 전까지 비공개 검토 상태를 유지한다. 주제가 겹치는 글은 개별 재공개보다 대표 글 중심 병합을 권장한다.

### 비공개/noindex 22개

영화 추천, 작품 해석, OTT 사용 팁 22개는 현재 Biz2Lab의 핵심 정체성과 맞지 않아 모두 draft/noindex로 전환했다. 원문은 삭제하지 않아 추후 별도 브랜드 또는 별도 도메인으로 분리할 수 있다.

## D. 상위 5개 대표 글 점검

| 대표 글 | 검색 의도 | 현재 고유 가치 | 추가한 실제 검증 근거 |
| --- | --- | --- | --- |
| `ai-business-automation-guide` | 업무 자동화 시작 방법 | 단계별 적용 기준, FAQ, 관련 CSV | 합성 JSONL end-to-end·멱등성·외부 실행 차단 검증 |
| `automation-priority-method` | 자동화 우선순위 선정 | 반복도·시간·오류 기반 판단 | 대상과 완료조건이 명확한 로컬 흐름을 먼저 선택한 실제 결정 |
| `accounts-receivable-tracker` | 미수금 관리표 | 계산 기준, 추적 절차, CSV | 결제 승인 단계의 주문 식별자·금액 보존과 456개 테스트 |
| `daily-numbers-for-small-business` | 소상공인 일일 지표 | 운영 지표 구조, 점검 루틴 | canonical 데이터 집계와 fake-metric 차단 운영 경험 |
| `unify-order-channels` | 주문 채널 통합 | 통합 순서, 실패 조건, 체크리스트 | 원 주문 ID 보존과 미검증 데이터 원본 확장 차단 경험 |

다섯 글 모두 제목·설명·작성자·수정일·FAQ·관련 글·자료 연결과 실제 제작·검증 근거를 갖췄다. 소프트웨어 검증을 실제 매출·회수율·절감시간 성과로 확대 해석하지 않도록 각 글에 검증하지 않은 범위도 함께 명시했다.

## E. E-E-A-T 강화

- About 페이지에 운영 목적, 작성 주체, 전문 영역, 편집 기준, GitHub 공개 활동 링크를 명시했다.
- `ProfilePage`와 `Person` JSON-LD를 추가했다.
- 각 글의 작성자 링크가 About 페이지로 연결된다.
- 수정 정책, 광고·제휴 안내, 면책조항을 독립 페이지로 만들고 footer에 상시 노출했다.
- 광고 코드가 콘텐츠 판단을 방해하지 않도록 광고 슬롯을 과도하게 추가하지 않았다.
- 실제 경력·성과로 확인되지 않은 문구는 작성하지 않았다.

## F. 내부 링크와 콘텐츠 클러스터

### 클러스터 1: AI 업무 자동화

- pillar: `ai-business-automation-guide`
- support: 자동화 우선순위, 자동화 전 업무 목록, 문서 정리, Google Sheets, Obsidian 지식베이스, 반복 업무 감소

### 클러스터 2: 영업·매출 관리

- pillar: `sales-revenue-ar-structure`
- support: 미수금, 일일 매출 보고, 목표 분해, 달성률, 결제 리마인드, 주문 채널 통합

### 클러스터 3: 소상공인 운영

- pillar: `daily-numbers-for-small-business`
- support: 1인 사업 시스템화, 고객 기억, 예약·주문·리뷰, 지식 저장, 주문 채널 통합

홈 → 카테고리 → 대표 글 → 보조 글 → CSV 자료의 흐름을 유지하고, 관련 글은 동일 클러스터 안에서 우선 연결한다.

## G. 운영자 확인 필요 항목

### 최우선

- Search Console에서 색인 상태, 수동 조치, 크롤링 오류, canonical 선택을 확인한다.
- AdSense에서 정책 센터 경고와 재심사 가능 상태를 확인한다.

### 입력하면 좋은 항목

- 운영자의 실제 업무 경력 범위
- 공개 가능한 프로젝트 또는 코드 링크
- 실제 현장 운영 데이터가 확보되면 적용 기간, 전후 시간, 오류 감소를 가상 예시와 분리해 추가
- 각 자료를 마지막으로 검토한 날짜와 검토 방식
- 외부 도구 비교 글을 재공개할 때 실제 사용 버전과 가격 확인일

## H. 재심사 전 체크리스트

- [x] 사이트 주제와 공개 콘텐츠 정합성 확보
- [x] 공개 카테고리 3개로 집중
- [x] 공개 글 20개와 sitemap·RSS·내부 링크 집합 일치
- [x] 저우선·주제 불일치 글 55개 draft/noindex
- [x] About·문의·개인정보·약관 제공
- [x] 편집·수정 정책 제공
- [x] 광고·제휴 고지 제공
- [x] 면책조항 제공
- [x] 모바일 360px overflow 없음
- [x] 공개 자료 다운로드 링크 20개 확인
- [x] 보류 URL 404 확인
- [x] lint, typecheck, test, build, 콘텐츠·SEO·이미지 감사 통과
- [x] 대표 글 5개에 검증 가능한 제작 경험과 한계 추가
- [ ] Search Console 실제 상태 확인
- [ ] AdSense 정책 센터 실제 상태 확인
- [x] production 반영 전 Preview 문구·공개 범위 운영자 검수

## 검증 결과

| 검증 | 결과 |
| --- | --- |
| Unit tests | 210/210 통과 |
| TypeScript | 통과 |
| ESLint | 통과 |
| Production build | 통과, 43개 정적 페이지 |
| 게시물 검증 | 20개 통과 |
| SEO 검증 | 12개 정적 경로, 20개 sitemap 글 통과 |
| 이미지 검증 | 20개 글, 212개 manifest 항목 통과 |
| 콘텐츠 권위성 | FAQ·CSV·heading·본문 기준 통과 |
| 콘텐츠 독창성 | 최대 유사도 0.004, 장문 반복 0 |
| 내부 링크 | 통과 |
| 모바일 브라우저 | 홈·대표 글·자료실 360px overflow 없음 |
| 비공개 URL | 404 확인 |
| Vercel Preview | 원격 build 성공 |

### Preview 배포

- URL: https://biz2-lab-53gky2wck-mizzang0305-gmailcoms-projects.vercel.app
- 환경: Vercel Preview
- production alias: 변경하지 않음
- 원격 검증: Next.js 16.2.11 build, TypeScript, 43개 정적 페이지 생성 통과

## 남은 기술 리스크

- `npm audit --omit=dev`는 4건(High 3, Moderate 1)을 보고한다.
- Next.js 16.2.11 자체의 직접 보안 권고는 해소됐지만, 현재 최신 stable Next.js가 내부적으로 고정한 `postcss@8.4.31`, `sharp@0.34.5`와 `gray-matter`가 사용하는 `js-yaml@3.14.2`가 감사 항목으로 남는다.
- 이 입력 경로는 현재 저장소가 관리하는 로컬 Markdown·CSS·이미지 중심이라 임의 사용자 입력 노출은 제한적이다.
- upstream 호환 패치 없이 강제로 transitive dependency를 덮어쓰는 것은 빌드·이미지 파이프라인 위험이 있어 이번 범위에서는 적용하지 않았다.

## 롤백

현재 변경은 격리 worktree의 `codex/adsense-audit-20260723` 브랜치에만 있다. production에는 반영하지 않았다. Preview는 Vercel에서 해당 deployment를 삭제하거나 무시하면 되고, 로컬 변경은 이 worktree를 제거하면 원본 checkout에 영향 없이 되돌릴 수 있다.

## 공식 기준 참고

- Google AdSense: 콘텐츠가 불충분한 사이트 관련 도움말
  - https://support.google.com/adsense/answer/7299563
- Google Search: 사람 우선의 유용한 콘텐츠 작성
  - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google AdSense: Google Publisher Policies
  - https://support.google.com/adsense/answer/1348695
- Google AdSense: 저가치 콘텐츠 관련 정책 도움말
  - https://support.google.com/adsense/answer/10502938

## 다음 작업

1. Draft PR에서 변경 범위와 CI를 확인한다.
2. Search Console·AdSense 계정 상태를 확인한다.
3. 두 상태가 정상일 때 production 배포를 별도로 승인한다.
