# Biz2Lab V3 건강교육 피벗 기준선

- 기준 시각: 2026-08-21 01:52 KST
- 작업 branch: `codex/biz2lab-v3-health-education-rebuild`
- 기준 commit: `cde7471f339f00e962f5d1a560f3226b7a2b6985`
- Production: `https://www.biz2lab.com`
- 현재 단계: P0 Fresh Discovery + P1 Research & Strategy

## 1. Owner 결정과 검증 범위

Owner는 기존 주제·포지셔닝으로 AdSense 거절이 5회 이상 있었다고 보고했고, 이번 지시에서 전면적인 건강교육 피벗을 결정했다. 이 횟수와 계정 화면은 Codex가 인증된 AdSense UI에서 독립 검증하지 않았으므로 `OWNER_REPORTED_ACCOUNT_STATE`로 기록한다.

이번 branch는 전략·편집·의료 안전·정보구조 초안을 만들기 위한 격리 작업 공간이다. Production, AdSense, Search Console, DNS, 도메인, `ads.txt`, 배포 설정은 변경하지 않는다.

## 2. Git 기준선

| 항목 | 관찰값 |
|---|---|
| Primary checkout | `D:\MyProjects\Biz2Lab_Os` |
| Primary state | dirty `master@d3c5fe62a135c22bd658b68fb9caef2b45075ae1` |
| Primary drift | `origin/master`보다 7 commits behind |
| Remote master | `cde7471f339f00e962f5d1a560f3226b7a2b6985` |
| Isolated worktree | `D:\CodexData\.codex\worktrees\biz2lab-v3-health-education-rebuild` |
| Isolated state at creation | clean |

Primary checkout의 수정·미추적 파일은 사용자 작업으로 간주해 건드리지 않았다.

## 3. Production 관찰

2026-08-21 01:52 KST의 표준 브라우저형 GET 결과다.

| 시작 URL | 최초 | Redirect | 최종 | 최종 URL |
|---|---:|---:|---:|---|
| `http://biz2lab.com/` | 308 | 3 | 200 | `https://www.biz2lab.com/ko` |
| `https://biz2lab.com/` | 308 | 2 | 200 | `https://www.biz2lab.com/ko` |
| `http://www.biz2lab.com/` | 308 | 2 | 200 | `https://www.biz2lab.com/ko` |
| `https://www.biz2lab.com/` | 308 | 1 | 200 | `https://www.biz2lab.com/ko` |
| `https://www.biz2lab.com/ko` | 200 | 0 | 200 | self-canonical |
| `/robots.txt` | 200 | 0 | 200 | `text/plain` |
| `/sitemap.xml` | 200 | 0 | 200 | `application/xml` |
| `/ads.txt` | 200 | 0 | 200 | `text/plain` |

Production은 현재 이용 가능하다. 이는 AdSense 승인 가능성이나 의료 콘텐츠 품질을 증명하지 않는다.

## 4. 현재 콘텐츠와 공개 IA

- Markdown 콘텐츠: 76개
- indexable: 11개
- `draft: true` + `noindex: true`: 65개
- 현재 public static route: 15개(`/ko` 포함)
- Production sitemap 기준 전체 URL: 26개
- 공개 주제: B2B 영업·미수금, 승인형 자동화, 주문·운영, 물류·피킹
- 저장소에는 별도 noindex 상태의 영화·OTT 및 도구 분석 초안이 존재한다.

현재 신뢰 페이지는 About, Author, Contact, Editorial Policy, Advertising, Privacy, Terms, Disclaimer를 갖고 있지만 내용은 업무 자동화 정체성에 맞춰져 있다. 건강교육 전환 전에는 의료 검토 정책, 출처 정책, 정정 정책, 응급 안내, 작성자 자격의 사실적 표현이 추가로 필요하다.

## 5. 기술적 재사용 가능성

현재 App Router는 정적 Markdown, dynamic article route, metadata, sitemap, JSON-LD, 관련 글, FAQ, 요약 박스, 이미지와 검증 스크립트를 이미 갖고 있다. 구조를 전부 폐기하기보다 다음을 재사용할 수 있다.

- `content/ko` 기반 정적 콘텐츠 파이프라인
- `app/ko/[category]/[slug]`
- `next/image` 기반 hero 처리
- metadata/canonical/sitemap 생성기
- FAQ, 목차, 요약, 관련 글 UI
- 기존 lint/typecheck/build/content 검증 체계

의료 콘텐츠에는 기존 `EditorialEvidenceBox`를 그대로 의미 전환하지 않는다. 실제 의료 검토가 없는 상태에서 `검토` 또는 전문가 인상을 주는 표시는 금지한다.

## 6. 피벗 위험

1. 건강은 Google Search가 더 강한 신뢰 신호를 고려한다고 설명하는 YMYL 영역이다.
2. 건강 주제 선택 자체가 AdSense 승인 가능성을 높인다는 공식 근거는 없다.
3. 20개 문서를 한꺼번에 생성하면 scaled-content 또는 generic AI 위험이 커진다.
4. 작성자·운영자에게 의료 자격이 없다면 이를 정직하게 표시하고, `의료진 검토`를 주장하면 안 된다.
5. 과거 URL을 즉시 삭제하면 사용자·색인·복구에 영향을 준다. Production 삭제와 redirect는 별도 Owner 승인 대상으로 둔다.

## 7. 이번 단계의 완료 정의

- 공식 출처 registry와 freshness 기록
- 정확히 20개 flagship topic 선정
- benchmark pattern 분석
- V3 IA와 legacy migration matrix
- 의료 안전·편집·신뢰·시각 시스템
- first-wave를 위한 출처 기반 brief와 human gate

이번 단계에서는 공개 route, 기존 콘텐츠, metadata, AdSense loader를 변경하지 않는다.
