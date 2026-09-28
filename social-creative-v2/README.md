# ONURIM Social Creative V2

Original vector artwork rendered as 1080×1350 PNG with `sharp` and the locally installed Malgun Gothic font. No stock images, real patient data, or external image API are used.

```powershell
node scripts/social-creative-v2.mjs social-creative-v2/campaigns/BZ-260929-001.json output
node scripts/social-creative-v2.mjs social-creative-v2/campaigns/BZ-260929-001.json output premium_3d
```

The first command generates three distinct families for editorial review. The optional third argument renders one family for routine campaigns. The input schema is `campaign_id`, `brand`, `theme`, `headline` (two short lines separated by `|`), `subheadline`, `key_points[4]`, `disclaimer`, `visual_mode`, and `landing_path`. Optional `mode_copy` supplies distinct two-line headlines per visual family; optional `cta` overrides the footer. ONURIM input fails when `landing_path` is outside `/health`.

The renderer produces review candidates only. An operator must assess mobile legibility and the V2 quality gate, choose one, then promote **only that PNG** to a public asset and verify its URL, dimensions, content type, and SHA-256 before scheduling. Rejected or draft candidates stay outside `public/`.

V1 is preserved in the original creative workspace as `DESIGN_BASELINE_V1_FAIL_REFERENCE`. This directory does not modify V1 or scheduled posts.
