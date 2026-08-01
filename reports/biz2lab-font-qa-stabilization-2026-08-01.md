---
type: qa-stabilization
project: Biz2Lab
status: validated-draft
updated: 2026-08-01
tags:
  - biz2lab
  - playwright
  - nextjs
  - font-qa
---

# Biz2Lab font asset browser-QA stabilization

## 작업 요약

PR #123의 기존 browser QA는 Production evidence build를 검증한 직후 검토된 build가 아닌 `next dev`를 새로 시작했습니다. 이전 350px 실행에서 문서와 JavaScript가 응답하는 동안 self-hosted WOFF2 한 요청만 `net::ERR_CONNECTION_FAILED`로 끊겨 74/75에서 릴리스가 중단됐습니다.

이번 변경은 public UI, 콘텐츠, font, evidence와 Production 동작을 바꾸지 않고 browser QA가 검토한 Production build를 `next start`로 제공하도록 고정합니다.

## 기준선

- Starting HEAD: `b68615004214a2131f1dbeff33594ca31501f181`
- Validated implementation commit: `31ec9d25721c7b51498c02cd325ce022db2cd6cb`
- Production baseline: `0b9a43f9070b973d7e09aca3e86e26f2a20298a7`
- PR state during validation: Draft, open, unmerged
- Approved evidence: 7
- Candidate evidence: 0

문서 commit을 포함한 최종 PR HEAD는 push 후 PR 본문과 최종 검증 기록에 별도로 남긴다. commit은 자신의 최종 SHA를 내용에 자기 참조로 포함할 수 없으므로 이 보고서에는 검증된 구현 commit을 기록한다.

## 원래 실패

- Route: `/ko/warehouse-logistics`
- Viewport: `350x800`
- Browser result: 74/75
- Failed resource: self-hosted `/_next/static/media/*.woff2`
- Error: `net::ERR_CONNECTION_FAILED`
- Retry나 allowlist로 통과시키지 않았다.

## Root cause

실패 trace에서는 HTML과 JavaScript가 같은 시점에 정상 응답했지만 self-hosted font 연결 하나가 실패했다. font 파일 자체는 dev와 Production 서버 비교에서 모두 같은 크기의 정상 WOFF2로 확인됐다.

구조적 원인은 Production evidence build를 만든 뒤 browser acceptance가 해당 build를 사용하지 않고 HMR, lazy compilation과 incremental asset serving을 수행하는 `next dev`로 전환한 것이다. 이 구성은 Production 동작을 검증한다는 테스트 목적과 달랐으며 자산 제공 lifecycle을 비결정적으로 만들었다. 검토된 build를 그대로 제공하는 `next start`에서는 동일 문제가 재현되지 않았다.

## 진단 비교

| 서버 | Context | Route | Viewport | Font URL | Font HTTP | Same-origin failure | Broken image | Overflow | 결과 |
|---|---:|---|---|---:|---|---:|---:|---:|---|
| `next dev` | 1 | `/ko/warehouse-logistics` | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next dev` | 2 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next dev` | 3 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next dev` | 4 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next dev` | 5 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next start` | 1 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next start` | 2 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next start` | 3 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next start` | 4 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |
| `next start` | 5 | 동일 | 350x800 | 2 | 2/2 200 | 0 | 0 | 0 | PASS |

두 서버 모두 진단 중 예기치 않은 restart나 exit가 없었고, port 4320의 기존 listener도 없었다. `next dev`는 초기 route를 lazy compile했고 `next start`는 사전 build를 1초 미만에 제공했다.

## 정확한 수정

- Browser QA server command:
  - 이전: `npm run dev -- --hostname 127.0.0.1 --port 4320`
  - 변경: `tsx scripts/start-evidence-preview-server.ts --hostname 127.0.0.1 --port 4320`
- Launcher는 `.next/BUILD_ID`와 runtime manifest가 없으면 시작을 거부한다.
- Runtime manifest는 정확히 승인 7개, candidate 0개여야 한다.
- Launcher 내부에서는 build하지 않고 설치된 Next binary의 `next start`만 실행한다.
- stdout/stderr와 child exit code를 전달하고 SIGINT/SIGTERM을 child에 전달한다.
- 모든 route test가 same-origin `requestfailed`, HTTP 5xx, page error를 수집한다.
- request failure에는 method, resource type, URL과 failure text가 보존된다.
- `ERR_CONNECTION_FAILED`는 allowlist하지 않았다.
- retries는 0, workers는 1이며 기존 route와 viewport를 제거하지 않았다.

## Font stability

| 실행 | Context | Route | Viewport | Font URL count | HTTP | Request failures | 결과 |
|---|---:|---|---|---:|---|---:|---|
| Full-suite stability run 1 | 5 isolated | `/ko/warehouse-logistics` | 350x800 | 2/context | 10/10 200 | 0 | PASS |
| Independent stability run 2 | 5 isolated | 동일 | 350x800 | 2/context | 10/10 200 | 0 | PASS |

별도 direct probe 5회에서도 route는 5/5 HTTP 200, 두 WOFF2는 각 probe마다 200, `font/woff2`, non-empty bytes였다.

## 전체 검증

- `npm ci`: PASS
- `npm test`: 223/223 PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run validate:posts`: PASS
- `npm run validate:seo`: PASS
- `npm run validate:images`: PASS
- interaction/content authority/content originality audits: PASS
- link check: PASS
- image brief/prompt/uniqueness/premium audits: PASS
- `npm run evidence:validate`: 7/7 PASS
- `npm run evidence:qa`: 76/76 PASS
- Original browser cases: 75/75 PASS
- New font stability regression: PASS
- Viewports 350/390/768/1440: PASS
- Same-origin request failures: 0
- Font failures: 0
- Production evidence URLs: 7x200
- Production review page: 404
- Preview review page: 200/noindex
- Production build: PASS
- `npm audit --omit=dev`: 0 vulnerabilities
- `git diff --check`: PASS

## Evidence integrity

- Approved: 7
- Candidate: 0
- Evidence image SHA changes: 0
- Approval metadata changes: 0
- Screenshot/content/public inventory changes: 0

## 핵심 의사결정

font 제거, preload 비활성화, retry, 오류 allowlist, route/viewport 축소가 아니라 테스트 서버를 실제 검토 대상 build와 일치시켰다. 이는 실패를 숨기는 완화가 아니라 Production-like asset path를 직접 검증하는 강화다.

## 롤백

PR branch에서 구현 commit과 이 문서 commit을 revert하면 이전 browser-QA 구성이 복원된다. Production 배포가 없으므로 Production rollback은 필요하지 않다.

## 다음 작업

1. 새 exact-head Vercel Preview를 확인한다.
2. PR #123을 Draft로 유지한다.
3. 새 HEAD에 대한 소유자의 Ready/merge 승인을 다시 받는다.

Production was not deployed or promoted.
AdSense, Search Console, domains, DNS, canonical host, ads.txt and advertising code were not modified.
No indexing or AdSense review request was submitted.
