---
type: audit
project: Biz2Lab_Os
status: draft-pr-ready
updated: 2026-07-26
tags:
  - adsense
  - content-quality
  - seo
  - recovery
---

# AdSense 저가치 콘텐츠 거절 후 복구 감사

## 결론

**CONDITIONAL_READY_RECRAWL_AND_OWNER_CHECK_REQUIRED**

코드와 Preview 검증까지 완료한 뒤에도 즉시 재검토를 요청하면 안 된다. 이번 거절 화면의
직접 사유는 `가치가 별로 없는 콘텐츠`이며, 현재 검색 결과에는 7월 24일 개편 전
카테고리 설명과 글 제목이 남아 있다. 수정본을 production에 반영한 뒤 Search Console에서
대표 URL과 sitemap 재수집을 확인하고, 이전 공개면이 새 구조로 교체된 뒤 재검토를 요청한다.

## 핵심 원인

1. 홈과 소개 페이지가 `공개 글 개수`, `검토 보류 개수`, `AI 승인`, `AdSense 코드`처럼
   내부 품질관리 절차를 과도하게 설명해 독자보다 심사자를 위한 사이트처럼 보였다.
2. 작성 주체가 `Biz2Lab 편집팀`으로 표시됐지만 실제 사람의 역할과 공개 프로젝트 근거는
   About 페이지 안에서만 약하게 연결돼 있었다.
3. 대표 글의 경험 근거가 합성 데이터와 비공개 로컬 검증 중심이라 외부에서 확인하기 어려웠다.
4. 공개 글은 모두 유사한 시기에 게시됐고 FAQ 3개·CSV 1개·검증 상자 구조가 반복돼
   대량 템플릿 콘텐츠로 오해될 여지가 있다.
5. 검색 결과에 이전 엔터테인먼트·도구 비교형 설명이 남아 있어 현재의 자동화·운영 주제와
   Google이 알고 있는 사이트 정체성이 아직 일치하지 않는다.

## 이번 변경

- 홈에서 공개 글 개수와 승인 절차 문구를 제거하고 독자가 얻는 계산식·CSV·복구 기준으로 교체
- `Biz2Lab 편집팀`을 `Biz2Lab 운영자`로 변경하고 독립 작성자 페이지 추가
- 공개 저장소 3개의 구현 범위와 한계를 설명하는 `/ko/projects` 추가
- 대표 글 5개의 경험 근거를 공개 저장소 링크와 실제 구현 경계로 교체
- 반복되던 `AI 사용 공개` 상자를 제거하고 글별 `검증 메모`와 확인 가능한 근거만 표시
- About과 자료실에서 승인용 개수·보류 통계를 제거
- author/projects 경로를 metadata, sitemap, header/footer 탐색 구조에 포함

## 대표 글 근거

| 글 | 공개 근거 | 확인 가능한 범위 |
| --- | --- | --- |
| AI 업무 자동화 설계 | `commerce-automation` | generate-only, 수동 검토, 외부 업로드 차단 |
| 자동화 우선순위 | `commerce-automation`, `CN_ExeFlow` | 입력 검증·상태·승인 기록을 기능 확장보다 우선 |
| 미수금 관리표 | `mybizLab` | 주문 흐름과 결제 웹훅 확인 경계 분리 |
| 매일 확인할 숫자 | `mybizLab` | local demo 지표와 production 데이터 구분 |
| 주문 채널 통합 | `mybizLab` | 주문·설문·문의·수동 입력의 원본 종류와 상태 분리 |

실제 고객 매출, 회수율, 절감 시간과 누락률은 공개 근거가 없으므로 주장하지 않는다.

## 검증

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run validate:posts`
- `npm run validate:seo`
- `npm run audit:content-authority`
- `npm run audit:content-originality`
- `npm run check:links`
- `npm run build`
- 360px·desktop Preview에서 홈, 프로젝트, 작성자, 대표 글과 sitemap 확인

## 남은 리스크

- Google 검색 결과의 이전 카테고리 설명은 production 배포만으로 즉시 바뀌지 않는다.
- 공개 글 20개의 일정한 FAQ·CSV 구조는 계속 템플릿 신호가 될 수 있다. 다음 콘텐츠 작업은
  새 글 추가보다 기존 글별 화면·코드·실패 사례를 다르게 보강하는 방식으로 진행한다.
- Search Console의 색인 범위, 선택 canonical, 수동 조치와 크롤링 오류는 운영자 계정에서만
  확인할 수 있다.
- AdSense 재검토 결과는 보장할 수 없다.

## 롤백

- 변경 PR의 merge commit을 revert하면 기존 홈·About·작성자 표시로 복구된다.
- 새 경로는 데이터나 migration을 만들지 않으므로 별도 데이터 롤백은 없다.

## 운영자 다음 작업

1. Preview에서 공개 프로젝트 이름, 운영자 표기와 외부 GitHub 링크를 확인한다.
2. 승인 후 production에 배포한다.
3. Search Console에서 `/ko`, `/ko/about`, `/ko/author/biz2lab`, `/ko/projects`와 대표 글
   5개를 URL 검사하고 색인 생성을 요청한다.
4. sitemap을 다시 제출하고 새 `lastmod` 수집 여부를 확인한다.
5. 이전 검색 결과 설명이 교체되고 크롤링 오류가 없을 때 AdSense 재검토를 요청한다.

## 공식 기준

- Google Publisher Policies — replicated content:
  https://support.google.com/publisherpolicies/answer/11190248
- Google Search Central — people-first content:
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- AdSense content guidelines:
  https://support.google.com/adsense/answer/23921
