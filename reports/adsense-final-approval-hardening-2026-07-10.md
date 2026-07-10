# Biz2Lab AdSense 최종 승인 준비 하드닝

- 감사일: 2026-07-10
- 기준 커밋: `904623bee7339b9573fbb7ceef97ec969db5b66c`
- 작업 브랜치: `codex/adsense-final-approval-hardening`
- 상태: `LOCAL_READY_FOR_OWNER_REVIEW`
- 프로덕션 반영: 안 함
- AdSense 재검토 요청: 안 함

## 1. 목적

AdSense의 승인 여부를 보장할 수는 없다. 이번 작업은 Google이 공개한 게시자 정책과 유용한 콘텐츠 원칙을 기준으로 다음 검토 위험을 줄이는 데 목적이 있다.

- 반복 템플릿과 문단 중복으로 인한 저가치 콘텐츠 인상
- 실제 동작과 다른 문의·개인정보 안내
- 중복 홈페이지와 불필요한 검색 구조화 데이터
- 작성·검토 주체와 수정 원칙의 불명확성
- 광고 슬롯 또는 빈 광고 영역 노출 위험

## 2. 공식 기준

- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563?hl=en-EN)
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google guidance about AI-generated content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
- [Required content for privacy disclosures](https://support.google.com/adsense/answer/1348695?hl=en)

## 3. 핵심 변경

### 콘텐츠 독창성과 실무 가치

- 공개 글 53개의 공통 제목을 주제별 제목으로 구체화했다.
- 여러 글에 반복되던 긴 상용 문단을 제거했다.
- 한국어 목적격 조사와 확인된 제품명 조사 오류를 교정했다.
- 계약·결제 핵심 글 5개에 국가법령정보센터와 개인정보보호위원회 공식 확인 경로를 추가했다.
- 독창성 회귀 감사에서 긴 문단 반복, 과도한 공통 제목, 높은 문서 유사도, 조사 오류를 차단한다.

### 신뢰 표면

- 소개 페이지에 작성·검토 주체, AI 보조 활용, 출처·독창성·과장·최신성 검토 원칙을 공개했다.
- 모든 글에 `작성·검토: Biz2Lab 편집팀`과 소개 페이지 연결을 추가했다.
- 개인정보처리방침을 실제 Google Analytics, AdSense 클라이언트, 광고 쿠키, GitHub 문의 흐름에 맞췄다.
- 동작하지 않는 공개 문의 폼을 제거하고 GitHub Issues 기반 오류 제보 경로를 제공했다.
- 비공개 확인이 필요한 개인정보 요청은 공개 Issue와 분리해 운영자 공개 연락처로 안내한다.
- 이용약관의 정보성 성격, 최신성, 외부 링크, 저작권과 책임 제한을 구체화했다.

### 검색·구조화 데이터

- `/`를 단일 한국어 홈페이지 `/ko`로 영구 리디렉션한다.
- 사이트맵과 WebSite 구조화 데이터의 대표 URL을 `/ko`로 통일했다.
- 제공하지 않는 사이트 검색 `SearchAction`과 존재하지 않는 도메인 이메일 `contactPoint`를 제거했다.
- `/ko/ops/seo-dashboard`의 `noindex`는 유지했다.

### 광고 안전

- 기존 AdSense 클라이언트 로더는 유지했다.
- 수동 `<ins class="adsbygoogle">`, `data-ad-slot`, 명시적 광고 슬롯은 추가하지 않았다.
- 로컬 런타임의 `ins.adsbygoogle-noablate`는 `display:none`, `0 x 0`, 슬롯 없음으로 확인했다.
- 데스크톱·모바일에서 빈 광고 영역, 수평 오버플로, 레이아웃 교란은 확인되지 않았다.

## 4. 재현 가능한 결과

| 항목 | 결과 |
| --- | --- |
| 공개 글 | 53 |
| 최소 본문 길이 | 3,700자 |
| 반복 긴 문단 그룹 | 0 |
| 과도한 공통 제목 그룹 | 0 |
| 최대 5단어 shingle 유사도 | 0.35 |
| 조사 오류 | 0 |
| AI 답변 구조 준비 | 53/53 |
| AdSense 내부 준비 판정 | 53/53 |
| 템플릿 위험 판정 | 0 |
| 사이트맵 | 정적 10 + 글 53 |
| 소스 광고 슬롯 | 0 |
| 모바일 수평 오버플로 | 0 |
| 브라우저 콘솔 warning/error | 0 |

위 수치는 로컬 정적 감사와 브라우저 스모크 결과이며 Search Console, AdSense, 트래픽 또는 수익 성과가 아니다.

## 5. 검증

- `npm test`: PASS, 211/211
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run validate:posts`: PASS
- `npm run validate:seo`: PASS
- `npm run validate:images`: PASS
- `npm run audit:interactions`: PASS
- `npm run audit:content-authority`: PASS
- `npm run audit:content-originality`: PASS
- `npm run check:links`: PASS
- `npm run audit:image-briefs`: PASS
- `npm run audit:image-prompts`: PASS
- `npm run audit:premium-images`: PASS
- `npm run build`: PASS
- Playwright 로컬 스모크: PASS

## 6. 남은 리스크

- Google의 최종 정책·품질 판단은 외부 결정이므로 승인을 보장할 수 없다.
- 이 브랜치는 아직 커밋·푸시·병합·배포되지 않았다. 현재 진행 중인 AdSense 검토는 기존 프로덕션을 본다.
- `audit:image-uniqueness`는 기존 자동화 글 28개의 원본 SVG 부재를 보고한다. 모든 공개 WebP와 이미지 참조는 존재하고 `validate:images` 및 브라우저 렌더링은 통과했으므로 공개 심사 표면의 차단 결함으로 분류하지 않았다.
- Next.js build는 기존 admin content automation 경로의 broad NFT trace 경고 2건을 유지한다. 빌드는 성공하며 이번 공개 사이트 변경과 직접 관련이 없다.

## 7. 반영 원칙과 롤백

- 반영은 유지보수자 리뷰 후 PR로만 진행한다.
- 수동 Vercel deploy 또는 redeploy를 하지 않는다.
- 승인된 PR 병합 뒤 정상 Git-triggered 배포만 사용한다.
- 문제 발생 시 해당 PR의 squash commit을 revert하면 된다. 데이터베이스, 환경변수, 마이그레이션 변경은 없다.

## 8. 다음 게이트

1. 변경 범위와 문구를 owner review한다.
2. 명시적 승인 후에만 커밋, push, PR 생성을 진행한다.
3. 병합은 별도 승인 뒤 수행하고 정상 Git 배포 완료 후 프로덕션 스모크를 다시 실행한다.
4. AdSense 화면이 이미 검토 중이면 추가 검토 요청을 누르지 않고 현재 결정을 기다린다.
