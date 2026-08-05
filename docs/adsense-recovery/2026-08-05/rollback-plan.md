# 롤백 계획

## 원칙

- 변경은 감사 자동화, 기술 SEO·접근성, IA·카피, 문서 커밋으로 분리한다.
- Production에는 아직 배포하지 않는다.
- rollback은 해당 커밋의 `git revert <sha>`로 수행하며 force push나 history rewrite를 사용하지 않는다.

## 변경별 영향

| 변경 | 롤백 시 영향 | 안전한 복원 |
| --- | --- | --- |
| root canonical 제거 | 되돌리면 404가 homepage canonical을 다시 상속할 수 있음 | 해당 기술 SEO 커밋만 revert 후 404 metadata를 재검증 |
| OG 이미지 카피 | 되돌리면 영화·OTT 미리보기 브랜드가 다시 노출됨 | IA·카피 커밋만 revert 후 `/opengraph-image` 확인 |
| homepage·navigation 축소 | 되돌리면 반복 링크와 mobile header 밀도가 다시 증가 | IA·카피 커밋만 revert |
| 빈 허브 섹션 제거·공개 범위 추가 | 되돌리면 1개 글 물류 허브에 빈 섹션이 재생성 | IA·카피 커밋만 revert |
| sitemap/noindex | 이번 구현에서는 기존 sitemap/noindex 집합을 변경하지 않음 | 해당 없음 |
| redirect | 이번 구현에서는 기존 permanent 308을 변경하지 않음 | 해당 없음 |
| 콘텐츠 통합·URL 제거 | 이번 구현에서 수행하지 않음 | 해당 없음 |
| 감사 스크립트·QA | 되돌리면 재발 방지 gate와 inventory 생성 명령이 사라짐 | 감사 자동화 커밋만 revert |

## 재검증

revert 후 `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run audit:adsense`와 Preview smoke를 다시 실행한다. sitemap/noindex/redirect에 후속 변경이 생겼다면 이 문서가 아니라 그 변경의 별도 rollback 기록을 따른다.
