# 레거시 마이그레이션 Hold

상태: `LEGACY_MIGRATION_NOT_AUTHORIZED`

기존 `legacy-content-decision-matrix.csv`는 제안일 뿐 실행 권한이 아니다. Batch 0에서는 기존 B2B 페이지의 삭제·redirect·noindex·canonical·sitemap·navigation을 변경하지 않는다.

| 영향 영역 | 예상 영향 | 실행 전 증거 | 롤백 요구 |
|---|---|---|---|
| Old-to-new navigation | B2B 진입 경로 감소와 건강 IA 전환 | 승인된 브랜드·pilot·trust pages·메뉴 prototype | 이전 navigation commit과 Preview 비교 |
| Sitemap | 기존 URL 제거 또는 건강 URL 추가 | 각 URL의 indexability·content readiness·Owner 승인 | 이전 sitemap snapshot과 commit revert |
| Canonical | host는 유지해도 주제·경로 canonical 변화 가능 | Preview canonical matrix와 redirect 계획 | 이전 metadata commit revert |
| Search Console | crawl·index·query 변동 가능 | 계정의 실제 URL·canonical·sitemap 상태를 Owner가 확인 | 변경 전 export와 단계별 제출 계획 |
| 404 | 삭제·이동 시 외부 링크 손실 가능 | 현재 내부·외부 inbound와 실제 대체 의도 | 필요한 경우 승인된 redirect만 되돌림 |
| AdSense review | 활성 검토 중 대규모 주제·URL 변화는 안정성을 해칠 수 있음 | 현 검토 종료 상태와 별도 Owner 전환 승인 | 직전 Production deployment 보존 |
| Content archive | B2B 자료의 접근·법적·사업 가치 손실 가능 | 보관 책임·내부 링크·검색 성과 확인 | archive 복구 경로와 commit |

## 실행 전 필수 게이트

- [ ] 브랜드 Option Owner 결정
- [ ] 실제 운영자·저자·연락·정책 정보
- [ ] 파일럿 4개 claim source check와 필요한 의료 검토
- [ ] 실제 독자 3인 테스트
- [ ] Preview의 route·canonical·sitemap·robots·404 검증
- [ ] Search Console 현황의 사람 확인
- [ ] Production 변경·롤백 승인
