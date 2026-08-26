# Health V3 콘텐츠 QA 계획

상태: `AUDIT_TOOLING_PROPOSAL`
이 문서는 도구 설계안이며 현재 코드나 CI를 변경하지 않는다.

## 1. 자동화 가능한 오류

### ERROR

- 공개 건강 글에 `author_id`가 없거나 확인되지 않은 placeholder가 남음
- 핵심 출처 ID가 source registry에 존재하지 않음
- 공개 글에 `draft: true` 또는 초안 경고가 혼재
- Preview/Vercel 호스트 canonical
- 존재하지 않는 내부 링크 또는 이미지
- 응급 질환 글에 승인된 emergency block이 없음
- 이미지 provenance 또는 의미 있는 이미지의 `alt` 누락
- 의료 글이 sitemap에 포함됐는데 `noindex`이거나 반대 상태

### WARNING

- 마지막 의료 검토일이 정책상 정한 주기를 지남
- 한 출처에 과도하게 의존
- 여러 글의 문단 유사도가 높음
- 메타데이터 중복
- 모바일 이미지 크기·대체 텍스트가 지나치게 김

### HUMAN_REVIEW

- 의료 주장 정확성
- 응급 행동의 임상적 타당성
- 개인 진단·처방으로 읽힐 가능성
- 그림의 해부학적 정확성
- 저자·검수자 자격과 실제 참여
- 개인정보·광고·제휴 공개의 사실 일치

## 2. 제안 파일

Owner가 도구 개발을 승인한 후 별도 범위로 검토한다.

- `scripts/validate-health-content.mjs`: frontmatter와 출처 ID 계약
- `scripts/check-health-emergency-blocks.mjs`: 응급 주제 필수 블록
- `scripts/check-health-image-manifest.mjs`: 이미지 provenance와 alt
- `tests/health-content-contract.test.mjs`: 공개/초안/저자/검토 상태 회귀
- `package.json`: 기존 audit 체계에 새 명령만 연결

기존 콘텐츠·SEO 검증 스크립트를 먼저 재사용하고 중복 프레임워크를 만들지 않는다.

## 3. 제안 명령

실제 추가 전 package scripts와 명칭 충돌을 다시 확인한다.

```text
npm run validate:health-content
npm run audit:health-images
npm run test:health-contract
```

현재 존재하지 않는 명령이므로 실행한 것으로 보고하지 않는다.

## 4. Preview 검증

- 모든 의료 초안 `noindex`
- Production canonical 오염 없음
- 320px 수준의 작은 화면에서 표·그림·응급 블록 확인
- 키보드 탐색, heading 순서, 색상 대비, alt 확인
- 구조화 데이터와 화면에 보이는 저자·검수 정보 일치
- 404, sitemap, robots, RSS 계약 확인
- 표준 브라우저와 named synthetic bot 접근 비교

## 5. 위험과 롤백

- 위험: 과도한 규칙이 정상 초안을 막거나 허술한 정규식이 의료 안전을 보장하는 것처럼 보일 수 있다.
- 완화: 자동화는 형식 오류만 차단하고 의미 검토는 항상 사람에게 남긴다.
- 롤백: 제안 도구는 별도 커밋으로 추가하고 문제가 생기면 해당 커밋만 revert한다.
