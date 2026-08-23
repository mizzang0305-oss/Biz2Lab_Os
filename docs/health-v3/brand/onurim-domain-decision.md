---
type: domain-decision
project: ONURIM_HEALTH_V3_BATCH1
status: OWNER_DECISION_REQUIRED
updated: 2026-08-24
tags: [health-v3, onurim, domain, no-purchase]
---

# 오누림 도메인 구조 결정안

도메인은 구매하지 않았고, 아래 평가는 구조 비교일 뿐 가용성·소유권·법적 사용 가능성을 보장하지 않는다.

| 안 | 구조 | 장점 | 핵심 리스크 | 현재 판단 |
|---|---|---|---|---|
| D1 | `www.biz2lab.com/health` | 기존 운영 자산 활용, 관리 단순 | 기존 B2B 주제 이력과 건강 주제 혼재, 공개 전환 시 기존 SEO 구조 영향 | Preview 경로로만 구현 가능 |
| D2 | `onurim.com` 또는 `.kr` / `.co.kr` | 건강 정보 브랜드와 정보 구조를 명확히 분리 | 신규 도메인 신뢰 축적, Search Console·AdSense 별도 검토, 상표·도메인 수동 확인 | 장기 권장 후보, Owner 결정 필요 |
| D3 | `health.biz2lab.com` | 기술·배포 분리와 운영자 연결을 함께 표현 | 사용자에게 브랜드 관계가 덜 직관적일 수 있고 DNS·색인 운영이 추가됨 | 차선 후보, Owner 결정 필요 |

## 결정 전 확인

- 오누림 상표 유사군과 지정상품·서비스 수동 검토
- 등록기관에서 도메인 실제 구매 가능 여부 확인
- 운영 주체, 개인정보·정정 채널, Search Console 책임자 확정
- 기존 Biz2Lab 콘텐츠의 삭제·리디렉션·canonical·sitemap 변경은 별도 승인

현재 결론: `DOMAIN_ARCHITECTURE_OWNER_DECISION_PENDING`.
