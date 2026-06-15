# Pagefind Search Status

Date: 2026-06-15

Biz2Lab currently ships the search box as a Pagefind-ready placeholder. The
runtime looks for `/pagefind/pagefind.js`, but full search only becomes active
after the static build process generates and publishes the Pagefind index.

User-facing behavior:

- The search input remains visible in the Korean navigation.
- Pagefind is disabled by default with `NEXT_PUBLIC_PAGEFIND_ENABLED=false`.
- When `NEXT_PUBLIC_PAGEFIND_ENABLED=true`, the client checks for
  `/pagefind/pagefind.js` before injecting the script.
- When the index is missing and a visitor enters a search query, the UI shows:
  `검색 색인은 정적 배포 색인 생성 후 활성화됩니다.`
- Search result excerpts are rendered as plain text, not inserted as HTML.

Activation checklist:

- Run `npm run build-search` after the production static output exists.
- Confirm `/pagefind/pagefind.js` and generated index assets are published.
- Set `NEXT_PUBLIC_PAGEFIND_ENABLED=true` only after those assets are available.
- Smoke test desktop and mobile search queries against real indexed pages.
- Keep the placeholder message until a production build serves the index.
