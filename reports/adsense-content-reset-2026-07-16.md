# Biz2Lab AdSense 콘텐츠 재정비 보고서

- 기준일: 2026-07-16
- 범위: 로컬 브랜치 `codex/adsense-content-reset`
- 외부 배포: 하지 않음
- AdSense 재검토 요청: 하지 않음

## 결론

기존 53개 글을 그대로 유지하지 않고, 독자가 실제로 사용할 수 있는 20개 핵심 글만 공개 대상으로 재구성했다.
검증이 부족하거나 대량 템플릿 위험이 있는 33개 글은 삭제하지 않고 `draft: true`, `noindex: true` 상태로 보류했다.

## 공개 포트폴리오

| 카테고리 | 공개 글 수 |
| --- | ---: |
| AI 업무 자동화 | 7 |
| 영업·매출 관리 | 7 |
| 소상공인 운영 | 6 |
| 합계 | 20 |

공개 글마다 다음 요소를 갖추도록 검증한다.

- 서로 다른 문제와 소제목 구조
- 실무 절차 또는 표
- FAQ 3개 이상
- 공개 글만 연결하는 관련 글
- 실제 내려받을 수 있는 CSV 자료
- 샘플·가상 데이터 표시

## 보류 포트폴리오

33개 글은 다음 이유로 공개 대상에서 제외했다.

- 비슷한 도구 분석 제목과 문단 구조가 반복됨
- 실제 사용 검증보다 제품 기능 요약 비중이 큼
- 계약·결제처럼 정확성 위험이 큰 주제의 검토 근거가 부족함
- 공개 글의 관련 링크와 자료실에서 연결할 독자 가치가 충분하지 않음

보류 글은 sitemap, RSS, 콘텐츠 색인에서 제외한다. 충분한 검증 없이 글 수를 다시 늘리지 않는다.

## 사이트 구조 변경

- 공개 카테고리를 자동화, 영업·매출, 소상공인 운영 3개로 집중
- 전자계약·결제 허브를 공개 탐색과 sitemap에서 제외
- 자료실을 20개 공개 글과 20개 CSV의 실제 다운로드 허브로 개편
- 소개 페이지에 AI 활용, 샘플 데이터, 검토 보류, 수정일 원칙 공개
- 존재하지 않는 예전 글에는 검토 보류 이유를 설명하는 404 제공

## 금지한 조치

- 가짜 조회수, 검색 순위, 고객 성과를 추가하지 않음
- 광고 슬롯이나 AdSense 로더를 변경하지 않음
- 수동 배포, 운영 DB 변경, 외부 게시를 하지 않음
- 이번 변경만으로 승인을 보장한다고 표현하지 않음

## 로컬 검증 결과

- `npm test`: PASS, 208/208
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS, 공개 글 20개 정적 경로 생성
- `npm run validate:posts`: PASS, automation 7 / sales-ops 7 / small-business 6
- `npm run validate:seo`: PASS, 정적 경로 9개 / sitemap 글 20개
- `npm run audit:content-authority`: PASS, 모든 글 FAQ 3개와 CSV 1개 확인
- `npm run audit:content-originality`: PASS, 장문 반복 문단 0개
- `npm run check:links`: PASS
- `npm run validate:images`: PASS
- `npm run audit:interactions`: PASS

`npm audit --omit=dev`는 기존 의존성 경로에서 moderate 3건을 보고했다.
자동 수정 제안이 Next.js의 부적절한 메이저 버전 변경을 포함하므로 이번 콘텐츠 PR에서는 의존성을 변경하지 않는다.

## 재검토 전 확인

1. 전체 테스트, 링크 검사, SEO 검사, 콘텐츠 독창성 검사를 통과한다.
2. 프로덕션 배포는 소유자 승인 후 별도로 진행한다.
3. 배포 후 sitemap, RSS, 404, 20개 글과 다운로드를 실제 도메인에서 확인한다.
4. Search Console 재수집 상태를 확인한 뒤 AdSense 재검토 요청 여부를 결정한다.
