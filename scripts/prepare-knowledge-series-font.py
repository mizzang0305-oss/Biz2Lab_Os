#!/usr/bin/env python3
"""Build the local OG font from the actual series card text. No visitor-time fetch."""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
FONTTOOLS_VERSION = "4.68.0"
SOURCE_COMMIT = "4efc2774c63917927efe769ca845def6bd6debae"
SOURCE_URL = (
    "https://raw.githubusercontent.com/google/fonts/"
    + SOURCE_COMMIT + "/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf"
)
SOURCE_SHA256 = "194018e6b2b293a7964f037b25c0249ce1418bc9ab3c971060a03aa57861e252"
LICENSE_URL = "https://raw.githubusercontent.com/google/fonts/" + SOURCE_COMMIT + "/ofl/notosanskr/OFL.txt"
MAX_FONT_BYTES = 400_000
FONT_PATH = ROOT / "assets/fonts/NotoSansKR-series-subset.woff"
PROVENANCE_PATH = ROOT / "assets/fonts/series-font-provenance.json"

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def card_data() -> dict:
    # Reuse the production loader and the card's shared text function. No YAML
    # parser duplication, environment-file reads, AI generation, or remote text.
    code = """
import { getSeriesEssays } from './lib/essays/series.ts';
import { getSeriesSocialCardText } from './lib/essays/social-card-text.ts';
const articles = getSeriesEssays();
if (!articles.length) throw new Error('No published series articles');
console.log(JSON.stringify({
  slugs: articles.map(article => article.slug),
  text: articles.map(getSeriesSocialCardText).join('\\n')
}));
"""
    result = subprocess.run(
        ["node", str(ROOT / "node_modules/tsx/dist/cli.mjs"), "-e", code],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True,
    )
    return json.loads(result.stdout)

def source_bytes(explicit: Path | None) -> bytes:
    cache = explicit or ROOT / ".tmp/knowledge-font-source/NotoSansKR-upstream.ttf"
    if cache.exists():
        data = cache.read_bytes()
    elif explicit:
        raise FileNotFoundError(explicit)
    else:
        with urllib.request.urlopen(SOURCE_URL, timeout=60) as response:
            data = response.read()
        if sha256(data) != SOURCE_SHA256:
            raise ValueError("Downloaded font does not match the pinned SHA-256")
        cache.parent.mkdir(parents=True, exist_ok=True)
        cache.write_bytes(data)
    if sha256(data) != SOURCE_SHA256:
        raise ValueError("Source font does not match the pinned SHA-256")
    return data

def build(data: bytes, required: set[int]) -> tuple[bytes, list[int]]:
    font = TTFont(io.BytesIO(data), recalcTimestamp=False)
    missing = required - set(font.getBestCmap())
    if missing:
        raise ValueError("Upstream font lacks: " + ", ".join(f"U+{cp:04X}" for cp in sorted(missing)))
    options = subset.Options()
    options.name_IDs = ["*"]  # Retain copyright, OFL and attribution records.
    options.name_languages = ["*"]
    options.name_legacy = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=required)
    subsetter.subset(font)
    font = instantiateVariableFont(font, {"wght": 600}, inplace=True)
    font.recalcTimestamp = False
    font.flavor = "woff"
    output = io.BytesIO()
    font.save(output, reorderTables=True)
    result = output.getvalue()
    if len(result) >= MAX_FONT_BYTES:
        raise ValueError(f"Font is {len(result)} bytes; budget is below {MAX_FONT_BYTES}. Split social-card fonts before publishing.")
    verified = TTFont(io.BytesIO(result), recalcTimestamp=False)
    coverage = sorted(verified.getBestCmap())
    if required - set(coverage):
        raise ValueError("Generated font lost required glyphs")
    if "fvar" in verified:
        raise ValueError("Generated font must be a static 600-weight instance")
    return result, coverage

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, help="Existing upstream TTF; its pinned hash is always checked")
    parser.add_argument("--check", action="store_true", help="Regenerate in memory and fail if committed artifacts differ")
    args = parser.parse_args()
    if fontTools.__version__ != FONTTOOLS_VERSION:
        raise ValueError(f"Use fonttools=={FONTTOOLS_VERSION}, found {fontTools.__version__}")
    license_bytes = (ROOT / "assets/fonts/NotoSansKR-OFL.txt").read_bytes().replace(b"\r\n", b"\n")
    if b"SIL OPEN FONT LICENSE Version 1.1" not in license_bytes:
        raise ValueError("The existing OFL notice must be preserved")
    cards = card_data()
    # Printable ASCII avoids a new font for an article-order digit or punctuation.
    required = set(range(0x20, 0x7F)) | {ord(c) for c in cards["text"] if not c.isspace()}
    font_bytes, coverage = build(source_bytes(args.source), required)
    provenance = {
        "source": SOURCE_URL, "sourceCommit": SOURCE_COMMIT,
        "sourceSha256": SOURCE_SHA256, "license": LICENSE_URL,
        "licenseSha256": sha256(license_bytes), "fontToolsVersion": FONTTOOLS_VERSION,
        "weight": 600, "bytes": len(font_bytes), "sha256": sha256(font_bytes),
        "coveredCodepoints": coverage, "cardSlugs": cards["slugs"],
        "cardTextSha256": sha256(cards["text"].encode("utf-8")),
        "purpose": "Server-generated local series social cards; no visitor or request-time font fetch.",
    }
    provenance_bytes = (json.dumps(provenance, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    if args.check:
        if FONT_PATH.read_bytes() != font_bytes or PROVENANCE_PATH.read_text(encoding="utf-8").encode("utf-8") != provenance_bytes:
            raise ValueError("Font/provenance is stale; run this script without --check and review both files")
    else:
        FONT_PATH.write_bytes(font_bytes)
        PROVENANCE_PATH.write_bytes(provenance_bytes)
    print(json.dumps({"check": args.check, "articles": len(cards["slugs"]),
                      "glyphs": len(coverage), "bytes": len(font_bytes),
                      "sha256": sha256(font_bytes)}))

if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        print(f"Font preparation failed: {error}", file=sys.stderr)
        raise SystemExit(1)
