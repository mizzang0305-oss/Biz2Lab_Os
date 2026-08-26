# 오누림 의료 검토 기록 계약

상태: `TEMPLATE_NOT_A_COMPLETED_REVIEW`

검토 화면과 CSV는 다음 두 레코드를 결합한다.

## 검토자 지정 레코드

```yaml
reviewer_real_name: ""
license_category: ""
license_jurisdiction: ""
license_verification_method: "" # 면허번호 원문 금지
reviewer_affiliation: ""
display_permission: false
conflict_disclosure: ""
scope_attested: false
source_review_attested: false
```

## Claim 판정 레코드

```yaml
packet_version: ""
packet_hash: ""
claim_version_hash: ""
article_slug: ""
claim_id: ""
current_text: ""
risk_level: "MEDIUM | HIGH"
review_question: ""
source_ids: []
decision: "APPROVE | REVISE | REMOVE | SPECIALIST_REQUIRED"
proposed_text: ""
reviewer_rationale: ""
specialist_area: ""
reviewed_at: ""
workflow_state: ""
```

## 판정별 필수값

- `APPROVE`: `reviewed_at`
- `REVISE`: `proposed_text`, `reviewer_rationale`, `reviewed_at`
- `REMOVE`: `reviewer_rationale`, `reviewed_at`
- `SPECIALIST_REQUIRED`: `specialist_area`, `reviewer_rationale`, `reviewed_at`

## 필수 원칙

- 빈 템플릿이나 빈 CSV는 의료 검토 증거가 아니다.
- 실제 검토자 지정 정보와 최소 한 건의 유효 판정이 있어야 `ONURIM_MEDICAL_REVIEW_IN_PROGRESS`다.
- 검토하지 않은 Claim은 `PENDING`으로 남긴다.
- packet hash와 Claim hash가 다르면 현재 문장에 결과를 적용하지 않는다.
- 면허번호, 환자정보, 진료기록은 입력하거나 공개 저장소에 보관하지 않는다.
- 공개 동의가 없으면 검토자 이름·소속을 공개 페이지에 표시하지 않는다.
- CSV는 판정을 회수하는 전달 형식이며 코드를 자동 변경하지 않는다.
