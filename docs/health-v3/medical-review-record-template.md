# 의료 검토 기록 템플릿

상태: `TEMPLATE_NOT_A_COMPLETED_REVIEW`

```yaml
record_id: ""
article_slug: ""
article_version_hash: ""
review_state_before: ""
review_state_after: ""
reviewer_real_name: ""
license_category: ""
license_verification_method: ""
public_affiliation_if_approved: ""
display_permission: false
review_scope: []
claim_ids_reviewed: []
source_versions_reviewed: []
reviewed_at: null
result: "APPROVED | CHANGES_REQUIRED | BLOCKED"
unresolved_disagreements: []
next_review_trigger: ""
owner_acknowledged_at: null
```

## 검토 범위 체크

- [ ] 정의
- [ ] 증상
- [ ] 응급 신호와 행동
- [ ] 검사 설명
- [ ] 치료 개요
- [ ] 약물 관련 경계
- [ ] 예방·생활 관리
- [ ] 어린이·임신·고령자 등 특수 대상
- [ ] 보호자 행동
- [ ] 그림의 의학적 의미

## 필수 원칙

- 빈 템플릿은 검수 증거가 아니다.
- 문서 hash가 바뀌면 의료 의미 변경 여부를 판단해 재검토한다.
- 검토하지 않은 claim을 record에 포함하지 않는다.
- 면허 번호처럼 공개할 필요가 없는 민감 정보는 공개 저장소에 기록하지 않고 검증 방법만 남긴다.
- 검수자 공개 동의가 없으면 이름·소속을 공개 페이지에 표시하지 않는다.
