# ONURIM SEO V2 — 기준 상태

조회일: 2026-09-06 KST. 이 문서는 진행 중 기준 증거이며 완료 보고서가 아니다.

## 권한과 동결

실제 AdSense UI의 `pub-2021259826985155` / `biz2lab.com`은 `준비 중`, `사이트의 광고 게재 가능 여부 검토 중`, `리뷰가 요청됨`이다. 요청 시간은 `29 8월 2026 02:59`로 표시됐다. 따라서 이번 요청의 **MODE B**를 적용한다. 조사·격리 worktree 구현·canonical Preview·Draft PR까지 가능하며 merge/Production deploy는 금지한다. 이것은 Owner의 운영 계약이며 Google이 일반적으로 SEO 수정을 금지한다는 정책 주장이 아니다.

AdSense UI의 ads.txt `찾을 수 없음`과 공개 HTTP 200 / `google.com, pub-2021259826985155, DIRECT, f08c47fec0942fa0`를 별도 사실로 기록한다. 이 작업에서 AdSense 요청·설정 변경은 없다.

## Git과 Production

- 기본 checkout: `D:\MyProjects\Biz2Lab_Os`, `master`, local HEAD `d3c5fe62a135c22bd658b68fb9caef2b45075ae1`.
- fresh fetch 후 `origin/master`: `9f44e462f9e2437ce7f26e493adbd8919d72f610`.
- 새 worktree: `D:\CodexData\.codex\worktrees\onurim-seo-v2-indexation`, branch `codex/onurim-seo-v2-indexation`, 동일 base SHA.
- Production: `biz2-lab-os`, `prj_Zx5HsZZAFfClRt6CMVnd5RF86LJ8`, team `team_FNwj4ocrtRGdttpJPdEWRRoP`.
- Production deployment `dpl_Ep5AFZoX6k3LeoLLE3dCwRujEVTa`, READY, production target, Git master SHA `9f44e462f9e2437ce7f26e493adbd8919d72f610`.
- `www.biz2lab.com` 및 `biz2lab.com` alias 유지. Vercel CLI inspect와 GET deployment API로 확인했다. 환경변수 값은 열람·저장하지 않았다.

기본 checkout의 기존 변경을 보존한다:

```text
 M reports/adsense-final-approval-hardening-2026-07-10.md
?? .codex-remote-attachments/
?? .codex/config.toml
?? .local/
?? .playwright-cli/
?? .playwright-mcp/
?? biz2lab-pr123-evidence-review-preview-loaded.png
?? biz2lab-pr123-evidence-review-preview.png
```

## GSC: 집계 보고서와 개별 검사는 시점이 다르다

원자료: [UI 색인 표](raw/gsc-index-report-2026-09-06.json). CSV 다운로드는 `ERR_BLOCKED_BY_CLIENT`로 차단됐다. 보안 설정을 바꾸지 않고 실제 UI 표 전체 행을 전사했다. 계정 토큰·쿠키·서명된 export URL은 저장하지 않는다.

- 속성 집계(표시 최종 업데이트 2026-08-28): indexed 52, not indexed 72.
- 현재 sitemap 77개와 URL 단위로 JOIN한 **그 보고서 시점**: indexed 17 / discovered-not-indexed 59 / crawled-not-indexed 1.
- 나머지 indexed 35개는 legacy `/ko/*` URL이다.
- CNI 9건: ONURIM 이상지질혈증 1, legacy 글 5, JS·폰트 자원 3. 자원 파일의 비색인을 콘텐츠 결함으로 취급하지 않는다.
- redirect 3건은 현재 모두 308로 HTTPS www에 수렴한다(apex HTTP는 2단계). 집계 404 1건인 legacy Huginn URL은 현재 의도된 410이다. CNI legacy 글 5건도 현재 410이며 JS·폰트 3건은 올바른 MIME의 200이다.
- **개별 URL 검사에서는 이상지질혈증이 이미 INDEXED**이며 Googlebot 스마트폰, 크롤링 2026-08-29 23:53:35, fetch 성공, crawl/index 허용, self-canonical이다. 집계 CNI를 현재 장애로 오인하지 않는다.
- Sitemap: 제출 2026-08-26 / 마지막 읽기 2026-09-01 / 성공 / 발견 77.
- 직접 조치·보안 문제: 각각 감지된 문제 없음.
- HTTPS(2026-09-05): HTTPS 27 / nonHTTPS 0 / 평가되지 않음 0. 이 숫자는 sitemap 색인 완료 수가 아니다.
- CWV(2026-09-04): 모바일·데스크톱 모두 INSUFFICIENT_DATA. PASS로 바꾸지 않는다.

[개별 URL 검사 77개](raw/gsc-url-inspections-2026-09-06.json)를 모두 완료했다. 현재는 **INDEXED 38 / DISCOVERED_NOT_INDEXED 34 / UNKNOWN 5 / CRAWLED_NOT_INDEXED 0**이다. UNKNOWN은 실제 UI의 `Google에는 아직 알려지지 않은 URL입니다.`를 보존한 분류다. 과거 집계 DNI와 최신 URL 검사 사이의 불일치를 숨기지 않는다. 편두통·우울증·골밀도 용어 카드의 개별 sitemap 영역에는 `일시적인 처리 오류`가 있지만 세 URL 모두 INDEXED, fetch 성공, self-canonical이고 별도 sitemap 보고서는 성공이다.

현재 38개 색인은 이번 SEO V2 수정 성과가 아니다. 이 관측 시점에는 공개 내용 변경이나 색인 요청을 하지 않았다.

## 검색 실적 원칙

보고서는 7일(2026-08-28~09-03), 28일(08-07~09-03), cutover 이후(08-26~09-03)를 별도로 읽었다. 속성 총 클릭은 모두 0, 노출은 각각 24 / 45 / 30이다. 차원별 합계는 집계 방법·비공개 검색어 때문에 일치하지 않을 수 있다. 독립 차원 표를 임의로 query×page×country×device의 결합 데이터처럼 만들지 않는다.

HbA1c URL을 실제 페이지 필터로 선택해 `hba1c 뜻` / `hba1c` / `hba1c ngsp`를 연결했다. 각각 노출 1, 클릭 0, 평균 순위 8 / 32 / 57. HbA1c 페이지 합계 노출은 4이므로 공개 검색어 표의 3회를 전체로 오인하지 않는다. 이 표본으로 CTR 개선효과·검색 수요 크기·순위 상승을 주장할 수 없다.

## 구현 전 공개 HTML 감사

[77개 server HTML 관측](raw/production-crawl.json): 전 URL HTTP 200, H1 1개, 제목 중복 0, 설명 중복 13(14개 확장 카드가 같은 설명). JS·네트워크 자원 로딩을 끈 별도 파서에서 HTML을 읽었다. 이는 렌더링·실사용·CWV 통과와 별개다. 첫 감사의 root canonical trailing slash 판정은 문자열 비교의 오탐이었으며 URL 정규화 후 재실행해 failure 0을 확인했다. 본문 header의 제목·서론을 보존한 파서로 최종 baseline을 재생성했다.

초기 `npm ci`는 성공했고 기존 dependency audit가 moderate 1/high 4를 보고했다. 임의 `npm audit fix`나 Production 의존성 변경은 수행하지 않았다. 별도 read-only 분류가 필요하다.

## 진실성 보존

실제 작성자 박영훈(비의료 건강정보 편집자), 의료인 검수 미완료, 기존 47개 licensed review packet, synthetic reader와 real human reader의 구분을 유지한다. 출처 조사와 SEO QA는 licensed medical review가 아니다.
