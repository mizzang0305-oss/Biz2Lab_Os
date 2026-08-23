# Biz2Lab Health V3 연구·아키텍처 패키지

상태: `HEALTH_V3_RESEARCH_AND_ARCHITECTURE_READY`

기준일: 2026-08-23 KST
Production 반영: 없음

## P0 — Fresh baseline

- `fresh-baseline.md`
- `legacy-content-decision-matrix.csv`

## P1 — Research and strategy

- `official-source-registry.md`
- `core-20-disease-selection.md`
- `benchmark-matrix.csv`
- `benchmark-analysis.md`
- `patterns-to-adopt.md`
- `patterns-to-avoid.md`
- `site-architecture.md`
- `topic-cluster-plan.md`
- `search-intent-map.csv`

## P2 — Editorial and trust system

- `editorial-style-guide.md`
- `article-template.md`
- `medical-safety-rules.md`
- `medical-review-workflow.md`
- `human-author-and-trust-input-required.md`
- `trust-page-blueprints.md`
- `illustration-system.md`
- `visual-asset-plan.csv`
- `health-content-qa-plan.md`

## P3/P4 — Non-public first-wave drafts

- `draft-homepage.md`
- `first-wave-content-plan.md`
- `drafts/` — 고혈압, 제2형 당뇨병, 뇌졸중, 심근경색
- `image-prompts/` — 위 4개 주제의 4종 시각 자산 프롬프트
- `first-wave-quality-scorecard.csv`

## 현재 경계

- 연구·정보구조·편집 시스템은 사람 검토 가능한 상태다.
- 의료 초안은 `draft + noindex` 문서일 뿐 공개 준비 완료가 아니다.
- 실제 저자·의료 검토·정책 카피·이미지·코드 구현·Preview 검증이 남아 있다.
- merge, push, PR, Preview, Production deploy, AdSense 변경은 수행하지 않았다.

## Batch 0 — Trust and differentiated pilot

현재 Batch 0 상태는 Owner 결정을 일부 기록한 비공개 prototype이다. 공개 승인이 아니다.

- `batch0-owner-input-required.md`
- `authorship-model.md`
- `medical-review-state-machine.md`
- `medical-review-record-template.md`
- `unique-value-contract.md`
- `pilot-claim-registry.csv`
- `story-ethics-policy.md`
- `reader-test-protocol.md`
- `reader-test-response-template.csv`
- `pilot-visual-claim-map.csv`
- `pilot-image-prompts/`
- `private-printables/` — 4개 파일럿별 4종 도구
- `private-contact-requirements.md`
- `brand-architecture-decision.md`
- `legacy-migration-hold.md`
- `ai-assistance-disclosure-plan.md`
- `p01-health-v3-owner-trust-completion.md` — Owner 입력 전 completion 초안
- `four-pilot-publication-readiness.csv`
- `trust-surfaces/` — placeholder가 남은 비공개 trust copy 초안 7개

박영훈 비의료 편집자와 Option B는 Owner 승인되었다. 고혈압·제2형 당뇨병은 `PRIVATE_PILOT_AUTHORIZED`이지만 네 pilot draft 모두 `PUBLICATION_BLOCKED`다. source checker와 실제 의료 검토 기록은 없고 의료 검수자는 sourcing 상태다. 뇌졸중·심근경색 공개는 계속 차단된다.

## Batch 0.5 — Owner decision, copyright, local baseline

- `batch0-owner-input-required.md` — 2026-08-23 Owner 결정과 미확정 gate
- `owner-approval-pack.md` — 비공개 파일럿 한정 Owner 승인 기록
- `official-source-copyright-policy.md` — 공식 출처 표현·시각물과 KDCA 공공누리 제4유형 경계
- `first-wave-risk-segmentation.md` — 상대적 편집 위험과 공개 차단
- `medical-review-state-machine.md` — private source-check와 page/claim별 면허 검토 분리

Option B, 박영훈, `health@biz2lab.com` 주소 선택, 의료 검수자 sourcing, 동의·익명화된 보호자 경험 정책과 AI 활용 공개 방향은 승인되었다. 최종 브랜드명은 `PENDING_NAME_CLEARANCE`, 주소 활성화는 `PENDING_ACTIVATION`, 보관·삭제 정책은 `PENDING_OWNER_POLICY`이며 현재 면허 검수자는 `NO_CURRENT_LICENSED_REVIEWER`다.

## P01 — Owner trust completion

상태: `P01_HEALTH_V3_OWNER_TRUST_COMPLETION_PREPARED_NOT_PUBLISHED`

- `p01-health-v3-owner-trust-completion.md`
- `four-pilot-publication-readiness.csv`
- `trust-surfaces/` — 공개하지 않은 신뢰 표면 문구 7종

남은 Owner·운영 gate는 최종 브랜드명·tagline, 정정 주소의 실제 활성화·담당자·보관정책, 실제 의료 검수자와 검토 기록이다. 고혈압·제2형 당뇨병은 비공개 파일럿만 허용되고 뇌졸중·심근경색은 페이지 전체가 `LICENSED_REVIEW_REQUIRED`다. 네 파일럿은 적용되는 의료 검토·사람 source check·독자 테스트·trust gate·별도 publication 승인이 완료될 때까지 계속 `PUBLICATION_BLOCKED`다.
