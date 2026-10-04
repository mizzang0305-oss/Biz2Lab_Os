# Korean social-card font

Noto Sans KR (600), Google Fonts text subset, 2026-10-04. Used only by the server-generated Antikythera social card. No visitor font request is added. The subset contains the Korean title/brand and attribution text. Preserve `NotoSansKR-OFL.txt` when distributing this font.

Font source: https://fonts.googleapis.com/css2?family=Noto+Sans+KR%3Awght%40600 (text-subset request recorded in enhancement evidence).

License source: https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/OFL.txt

The original Antikythera subset remains unchanged. `NotoSansKR-series-subset.woff` is a separate 600-weight text subset for the series titles, questions and labels. `series-font-provenance.json` records the public font URL, SHA-256 and actual cmap coverage. Preserve the same OFL license. After changing a title/question, run `python scripts/prepare-knowledge-series-font.py` before testing every social card. A missing glyph fails the card instead of silently drawing a missing-character box or fetching a visitor font. The preparation script reads only the planned titles and public manuscript frontmatter; it does not inspect environment files or private data.
