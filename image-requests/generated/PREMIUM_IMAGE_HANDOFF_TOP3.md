# Biz2Lab Premium Image Handoff - Top 3

Status: selected_for_first_manual_generation
Date: 2026-06-16

This handoff prepares the first three premium hero images for manual creation. No image has been generated, no raw file has been saved, no optimized file has been written, and no article has been changed.

Use these prompts as the source of truth for the first manual generation pass. The deterministic local diagram fallback is not a final image path for this phase.

## Shared Production Rules

- Create a premium SaaS/editorial hero image, 16:9, target 1200 x 675.
- Keep the scene abstract and business-focused; do not create a realistic private screenshot.
- No real logos, no product photos, no Amazon/ecommerce feel, no people or faces, no private data.
- Use minimal in-image text. If text is needed, keep it as tiny abstract UI marks, not readable customer data.
- Make each image visually distinct from the others and from the rejected deterministic fallback visuals.
- Do not apply the image to articles until the raw file exists, optimization passes, and the image is visually approved.

## 1. Image Target

- slug: `ai-business-automation-guide`
- title: `AI 업무 자동화란 무엇인가: 소상공인과 영업팀을 위한 실전 가이드`
- usage: `hero`
- purpose: Show a small Korean business owner managing orders, receivables, contracts, customer inquiries, and revenue reports from one AI automation dashboard. This should feel like a trustworthy SaaS blog hero, not a robot illustration.
- selected status: `selected_for_first_manual_generation`

### 2. Copy This Prompt

Korean prompt:

```text
한국 소상공인과 영업팀을 위한 Biz2Lab 블로그 hero 이미지. 밝고 신뢰감 있는 premium SaaS/editorial 스타일. 한 명의 실제 인물이나 얼굴을 그리지 말고, 추상적인 업무 자동화 대시보드 장면으로 구성한다.

중앙에는 넓은 AI 자동화 대시보드가 있고, 다섯 가지 업무 흐름이 하나로 모인다: 주문 접수, 미수금 확인, 전자계약 상태, 고객 문의 분류, 매출 리포트. 각 흐름은 얇은 라인과 작은 카드로 연결되어 데이터가 정리되고 우선순위가 자동으로 잡히는 느낌을 준다. 화면은 실제 서비스 스크린샷처럼 보이지 않게 추상화하고, 읽을 수 있는 고객명, 금액, 전화번호, 계약번호는 넣지 않는다.

구도는 16:9 hero 썸네일에 맞게 넓고 선명하게, 왼쪽에서 여러 업무 입력이 들어오고 중앙 AI 허브를 거쳐 오른쪽의 실행 체크리스트와 리포트 카드로 정돈되는 흐름. 색상은 흰 배경, soft teal, navy, cool gray, 아주 절제된 amber 포인트. 선명한 여백, 고급 B2B SaaS 블로그 느낌, 모바일 썸네일에서도 주제가 보이게 큰 형태를 사용한다. 로봇 캐릭터는 과장하지 말고, 실제 업무 효율과 데이터 흐름이 보이게 한다.
```

English prompt:

```text
Create a premium SaaS/editorial hero image for a Korean Biz2Lab article about AI business automation for small businesses and sales teams. Do not depict a real person or face. Build an abstract business automation dashboard scene.

In the center, show one broad AI automation dashboard where five workstreams converge: order intake, accounts receivable, electronic contract status, customer inquiries, and revenue reports. Use thin data-flow lines and compact cards to show information being organized, prioritized, and routed into action. Avoid making it look like a real private software screenshot; use abstract UI cards and non-readable placeholder marks only.

Use a 16:9 hero composition with multiple inputs on the left, a central AI orchestration hub, and organized action checklist/report cards on the right. Bright trustworthy palette: white background, soft teal, navy, cool gray, restrained amber accents. Clear whitespace, premium B2B SaaS blog style, clickable thumbnail clarity on mobile. Avoid exaggerated robot imagery; emphasize operational efficiency and data flow.
```

### 3. Negative Prompt

```text
watermark, real logo, brand logo, realistic people, face, portrait, robot mascot, product photo, Amazon, ecommerce, shopping, private customer data, readable names, phone numbers, real invoice, real contract, payment card, fake realistic screenshot, cluttered UI, unreadable tiny text, generic three-box flow, repeated bar chart block, stock photo, dark cyberpunk style
```

### 4. Save Result Here

- raw path: `assets/images/raw/ai-business-automation-guide-hero.png`
- optimized path: `public/images/posts/ai-business-automation-guide-1200.webp`

Manifest draft:

```json
{
  "id": "ai-business-automation-guide-hero",
  "project": "biz2lab",
  "postSlug": "ai-business-automation-guide",
  "usage": "hero",
  "src": "/images/posts/ai-business-automation-guide-1200.webp",
  "rawPath": "assets/images/raw/ai-business-automation-guide-hero.png",
  "altKo": "주문, 미수금, 전자계약, 고객문의, 매출 리포트가 하나의 AI 자동화 대시보드로 정리되는 업무 흐름",
  "captionKo": "여러 업무 입력이 AI 자동화 대시보드에서 분류되고 실행 우선순위와 리포트로 정리되는 구조",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "manual-premium-image",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

Article update plan after approval:

- Candidate `heroImage`: `/images/posts/ai-business-automation-guide-1200.webp`
- Candidate `heroAlt`: `주문, 미수금, 전자계약, 고객문의, 매출 리포트가 하나의 AI 자동화 대시보드로 정리되는 업무 흐름`
- Do not apply until the optimized WebP exists and visual review passes.

### 5. After Image Is Created

```bash
npm run optimize-images
npm run validate:images
npm run validate:posts
npm run validate:seo
npm run check:links
npm run audit:interactions
npm run build
```

### 6. Visual Review Checklist

- Image is not generic.
- Image is clearly different from the fallback diagrams.
- No logos.
- No product/Amazon feel.
- No people/faces.
- No private data.
- No tiny unreadable text.
- Article topic is visually clear.
- Mobile thumbnail still clear.

## 1. Image Target

- slug: `accounts-receivable-tracker`
- title: `미수금 관리표를 만드는 방법`
- usage: `hero`
- purpose: Show a receivables operations board that helps a small business see invoice promises, overdue status, next follow-up dates, and action priority without making it look like an actual private spreadsheet.
- selected status: `selected_for_first_manual_generation`

### 2. Copy This Prompt

Korean prompt:

```text
한국 소상공인의 미수금 관리 글을 위한 premium SaaS/editorial hero 이미지. 실제 엑셀 화면이나 고객 장부를 보여주지 말고, 추상적인 미수금 운영 보드로 표현한다.

중앙에는 깔끔한 receivables board가 있고, 거래처별 청구 상태를 색상 토큰과 카드로 분류한다: 정상, 확인 필요, 지연, 분쟁, 완료. 왼쪽에는 청구 금액과 약속일을 나타내는 추상 카드 묶음, 중앙에는 지연일과 다음 연락일을 정리하는 우선순위 레이어, 오른쪽에는 오늘 연락할 대상과 다음 액션이 정돈된 작은 체크리스트가 보인다. 금액, 고객명, 전화번호, 실제 회사명은 읽을 수 없게 처리한다.

구도는 16:9, 사선으로 흐르는 칸반/테이블 혼합 레이아웃. AI 자동화 이미지와 다르게 숫자 관리와 후속 조치 운영에 초점을 둔다. 색상은 white, slate, navy, teal, amber status chips. 전체 느낌은 차분하고 실무적인 B2B SaaS 썸네일, 카드 간격이 넓고 모바일에서도 미수금 상태 관리라는 주제가 바로 보이게 한다.
```

English prompt:

```text
Create a premium SaaS/editorial hero image for a Korean small-business article about building an accounts receivable tracker. Do not show a real spreadsheet or private ledger. Represent it as an abstract receivables operations board.

The center shows a clean receivables board with account statuses grouped by color tokens and cards: normal, needs confirmation, overdue, disputed, completed. On the left, abstract cards suggest invoice amount and promised payment date. In the middle, a priority layer organizes overdue days and next follow-up dates. On the right, a compact checklist shows today's follow-up actions. No readable customer names, phone numbers, company names, or real amounts.

Use a 16:9 composition with a diagonal kanban/table hybrid layout. Make it visually distinct from the AI automation hero by focusing on receivables status and follow-up operations. Palette: white, slate, navy, teal, amber status chips. Calm, practical B2B SaaS thumbnail with generous spacing and clear mobile readability.
```

### 3. Negative Prompt

```text
watermark, real logo, brand logo, people, face, product photo, Amazon, ecommerce, shopping, real spreadsheet screenshot, readable customer names, phone numbers, bank account numbers, exact invoices, payment card, private data, cluttered table, generic three-box flow, repeated bar chart block, stock photo, dark finance trading style
```

### 4. Save Result Here

- raw path: `assets/images/raw/accounts-receivable-tracker-hero.png`
- optimized path: `public/images/posts/accounts-receivable-tracker-1200.webp`

Manifest draft:

```json
{
  "id": "accounts-receivable-tracker-hero",
  "project": "biz2lab",
  "postSlug": "accounts-receivable-tracker",
  "usage": "hero",
  "src": "/images/posts/accounts-receivable-tracker-1200.webp",
  "rawPath": "assets/images/raw/accounts-receivable-tracker-hero.png",
  "altKo": "거래처별 미수금 상태와 다음 연락일이 우선순위 보드로 정리된 업무 화면",
  "captionKo": "청구 상태, 지연일, 다음 연락일을 한눈에 확인해 후속 조치 우선순위를 정하는 미수금 관리 구조",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "manual-premium-image",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

Article update plan after approval:

- Candidate `heroImage`: `/images/posts/accounts-receivable-tracker-1200.webp`
- Candidate `heroAlt`: `거래처별 미수금 상태와 다음 연락일이 우선순위 보드로 정리된 업무 화면`
- Do not apply until the optimized WebP exists and visual review passes.

### 5. After Image Is Created

```bash
npm run optimize-images
npm run validate:images
npm run validate:posts
npm run validate:seo
npm run check:links
npm run audit:interactions
npm run build
```

### 6. Visual Review Checklist

- Image is not generic.
- Image is clearly different from the fallback diagrams.
- No logos.
- No product/Amazon feel.
- No people/faces.
- No private data.
- No tiny unreadable text.
- Article topic is visually clear.
- Mobile thumbnail still clear.

## 1. Image Target

- slug: `electronic-contract-system-basics`
- title: `전자계약 시스템에 필요한 기본 기능`
- usage: `hero`
- purpose: Show the core contract workflow: template, identity verification, signature request, status tracking, document storage, and payment confirmation. The visual should feel secure and trustworthy without becoming a real app screenshot.
- selected status: `selected_for_first_manual_generation`

### 2. Copy This Prompt

Korean prompt:

```text
전자계약 시스템의 기본 기능을 설명하는 Biz2Lab 한국어 블로그 hero 이미지. premium SaaS/editorial 스타일, 보안성과 신뢰감이 느껴지는 밝은 비즈니스 일러스트. 실제 전자계약 서비스 화면, 실제 서명, 실제 계약서 내용은 보여주지 않는다.

이미지 중앙에는 안전한 계약 프로세스 허브가 있고, 주변에 여섯 개의 추상 모듈이 고리처럼 연결된다: 템플릿 선택, 본인확인, 서명 요청, 진행 상태 추적, 문서 보관, 결제 확인. 각 모듈은 작은 아이콘형 카드와 체크 상태로 표현하고, 중앙에는 잠금/검증을 연상시키는 추상 보안 레이어를 둔다. 오른쪽 아래에는 완료된 계약과 결제 확인이 하나의 운영 흐름으로 묶이는 느낌을 준다.

구도는 16:9, 원형 프로세스와 보안 레이어 중심의 구조. 다른 이미지와 겹치지 않게 계약/서명/결제 신뢰 프로세스를 강조한다. 색상은 white, deep navy, teal, cool gray, restrained amber. 텍스트는 거의 넣지 말고, 실제 브랜드 로고, 사람, 계약서 원문, 개인정보, 카드번호, 실제 결제 화면은 제외한다. 모바일 썸네일에서도 전자계약 기능 묶음이라는 주제가 선명해야 한다.
```

English prompt:

```text
Create a premium SaaS/editorial hero image for a Korean Biz2Lab article explaining the basic features of an electronic contract system. The image should feel secure, trustworthy, and business-ready. Do not show a real e-signature service UI, real signatures, or readable contract content.

At the center, place a secure contract process hub. Around it, connect six abstract modules in a circular workflow: template selection, identity verification, signature request, status tracking, document storage, and payment confirmation. Use small icon-like cards and check states. Add an abstract security layer around the center, suggesting verification and control. In the lower right, subtly show completed contract and payment confirmation flowing into one operations process.

Use a 16:9 composition centered on a circular process and security layer. Make it visually distinct by emphasizing contract, signature, payment, and trust. Palette: white, deep navy, teal, cool gray, restrained amber. Minimal text only. No real logos, no people, no contract text, no personal data, no card numbers, no real payment screen. It must remain clear as a mobile thumbnail.
```

### 3. Negative Prompt

```text
watermark, real logo, brand logo, people, face, product photo, Amazon, ecommerce, readable contract text, real signature, personal data, resident registration number, phone number, bank account, card number, real payment screen, fake realistic private screenshot, cluttered UI, generic three-box flow, repeated bar chart block, stock photo, dark hacker style
```

### 4. Save Result Here

- raw path: `assets/images/raw/electronic-contract-system-basics-hero.png`
- optimized path: `public/images/posts/electronic-contract-system-basics-1200.webp`

Manifest draft:

```json
{
  "id": "electronic-contract-system-basics-hero",
  "project": "biz2lab",
  "postSlug": "electronic-contract-system-basics",
  "usage": "hero",
  "src": "/images/posts/electronic-contract-system-basics-1200.webp",
  "rawPath": "assets/images/raw/electronic-contract-system-basics-hero.png",
  "altKo": "전자계약의 템플릿, 본인확인, 서명 요청, 상태 추적, 보관, 결제 확인이 하나의 보안 프로세스로 연결된 구조",
  "captionKo": "전자계약 시스템에서 필요한 기본 기능이 서명과 결제 확인 흐름으로 연결되는 운영 구조",
  "width": 1200,
  "height": 675,
  "format": "webp",
  "licenseStatus": "manual-premium-image",
  "commerceAutoReusable": true,
  "status": "planned"
}
```

Article update plan after approval:

- Candidate `heroImage`: `/images/posts/electronic-contract-system-basics-1200.webp`
- Candidate `heroAlt`: `전자계약의 템플릿, 본인확인, 서명 요청, 상태 추적, 보관, 결제 확인이 하나의 보안 프로세스로 연결된 구조`
- Do not apply until the optimized WebP exists and visual review passes.

### 5. After Image Is Created

```bash
npm run optimize-images
npm run validate:images
npm run validate:posts
npm run validate:seo
npm run check:links
npm run audit:interactions
npm run build
```

### 6. Visual Review Checklist

- Image is not generic.
- Image is clearly different from the fallback diagrams.
- No logos.
- No product/Amazon feel.
- No people/faces.
- No private data.
- No tiny unreadable text.
- Article topic is visually clear.
- Mobile thumbnail still clear.

## Batch Validation After All Three Are Created

Run the same validation bundle after saving and optimizing all three files:

```bash
npm run optimize-images
npm run validate:images
npm run validate:posts
npm run validate:seo
npm run check:links
npm run audit:interactions
npm run build
```

Do not run an article apply phase until the user visually approves the generated images.
