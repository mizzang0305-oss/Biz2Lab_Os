# Korean social-card fonts

The original `NotoSansKR-social-subset.woff` is the Noto Sans KR 600 text subset prepared on 2026-10-04 for the Antikythera card. It remains unchanged. Its source was the Google Fonts CSS API: https://fonts.googleapis.com/css2?family=Noto+Sans+KR%3Awght%40600.

## Series cards

`NotoSansKR-series-subset.woff` is a static 600-weight WOFF for the visible series-card strings. The generator uses the production article loader and `getSeriesSocialCardText`, which is also used by the OG/Twitter route. Printable ASCII is included for numbering and punctuation. It does not include every Hangul syllable.

The upstream variable TTF is pinned to Google Fonts commit `4efc2774c63917927efe769ca845def6bd6debae`:
https://raw.githubusercontent.com/google/fonts/4efc2774c63917927efe769ca845def6bd6debae/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf

Expected upstream SHA-256:
`194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252`

Preserve `NotoSansKR-OFL.txt` and the font's embedded attribution/license records. The upstream font and derived subset remain under SIL OFL 1.1. Upstream license: https://raw.githubusercontent.com/google/fonts/4efc2774c63917927efe769ca845def6bd6debae/ofl/notosanskr/OFL.txt.

## Rebuild after adding or changing article card text

Run `npm ci` first. Use an isolated Python environment; fonttools is pinned in `scripts/requirements-knowledge-font.txt`. The generator was verified with Python 3.14.3 and fonttools 4.68.0.

Windows PowerShell:

```powershell
python -m venv .tmp/knowledge-font-venv
.tmp/knowledge-font-venv/Scripts/python.exe -m pip install -r scripts/requirements-knowledge-font.txt
.tmp/knowledge-font-venv/Scripts/python.exe scripts/prepare-knowledge-series-font.py
.tmp/knowledge-font-venv/Scripts/python.exe scripts/prepare-knowledge-series-font.py --check
```

Linux/macOS:

```sh
python3 -m venv .tmp/knowledge-font-venv
.tmp/knowledge-font-venv/bin/python -m pip install -r scripts/requirements-knowledge-font.txt
.tmp/knowledge-font-venv/bin/python scripts/prepare-knowledge-series-font.py
.tmp/knowledge-font-venv/bin/python scripts/prepare-knowledge-series-font.py --check
```

The first build downloads only the pinned upstream font and checks its hash; later builds use the ignored `.tmp/knowledge-font-source/` cache and check the same hash. `--source PATH` accepts an existing copy but never bypasses verification. No environment files, private content, or visitor data are read or uploaded.

Review and commit both the WOFF and `series-font-provenance.json` alongside the article. The provenance records the upstream version/hash, tool version, actual cmap coverage, card text hash, article identities, file size and subset hash. A second `--check` run must reproduce the artifacts. Run the publication tests and inspect the new OG/Twitter images before deployment.

Missing source glyphs, a changed upstream hash, a different fonttools version, or a subset reaching 400,000 bytes stops generation. This leaves room below the installed Next.js documentation's 500KB image bundle limit; it is not a measurement of the complete route bundle. If the corpus reaches the budget, split the card fonts deliberately rather than suppressing the guard.

The deployed card reads the committed local font; it does not download fonts at request time or make visitor font requests. The runtime missing-glyph guard remains enabled.

License text hashes and provenance comparisons normalize CRLF to LF so Windows and Linux checkouts produce the same recorded result. The OFL wording is not changed.
