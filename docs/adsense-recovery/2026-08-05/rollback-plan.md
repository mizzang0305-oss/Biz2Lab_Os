# 롤백 계획

## 원칙

- Production에는 아직 배포하지 않는다.
- force push나 history rewrite 없이 논리 커밋을 `git revert <sha>`로 되돌린다.
- 사용자 승인 없이 redirect, noindex, sitemap, URL 삭제 또는 Production 설정을 바꾸지 않는다.

## 변경 경계

| 커밋 | 변경 | 롤백 영향 | 안전한 복원 |
| --- | --- | --- | --- |
| `c2455bc` | 익명 fixture·계산 코드·CSV | 재현 입력과 공개 다운로드가 함께 사라짐 | 이 커밋을 revert하고 테스트·링크 재검증 |
| `52535c9` | 두 기존 글·승인 이미지·manifest | 증거 설명과 시각 증거가 이전 상태로 돌아감 | 이 커밋을 revert하고 canonical·sitemap·image validation 확인 |
| `f247cfc` | audit 분류·reproducibility·QA 계약 | inventory가 이전 6 FLAGSHIP 기준으로 돌아가고 Preview gate가 7개 증거를 기대함 | 이 커밋을 revert한 뒤 보고서 재생성 및 Playwright 재실행 |
| `docs: update evidence expansion and human gates` | 문서·체크리스트 | 최신 사람 게이트와 개인정보 검토가 사라짐 | 같은 제목의 문서 커밋을 revert |

## 이번 작업에서 건드리지 않은 경계

- redirect: 변경 없음. 기존 동일 의도 permanent redirect만 유지한다.
- noindex와 sitemap 제외: 기존 주제 이탈·초안 정책을 변경하지 않는다.
- 콘텐츠 통합과 URL 제거: 수행하지 않는다.
- Contact endpoint: 공개 GitHub Issues만 확인했고 새 endpoint나 이메일을 추가하지 않는다.
- Production/AdSense/Search Console/DNS/도메인/광고 코드/analytics: 변경 없음.

## 재검증

revert 후 `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run evidence:validate`, `npm run audit:adsense`와 Preview smoke를 다시 실행한다. noindex, sitemap 또는 redirect가 이후 별도 변경됐다면 해당 커밋의 롤백 문서를 우선한다.
