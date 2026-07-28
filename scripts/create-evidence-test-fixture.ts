import fs from "node:fs";
import path from "node:path";

import sharp from "sharp";

const output = path.join(
  process.cwd(),
  "evidence-assets",
  "approved",
  "production-approved-test-fixture.webp",
);
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="#f8fafc"/>
  <rect x="36" y="36" width="568" height="288" rx="24" fill="#ffffff" stroke="#0f766e" stroke-width="4"/>
  <circle cx="94" cy="96" r="24" fill="#ccfbf1"/>
  <path d="M82 96l8 8 17-20" fill="none" stroke="#0f766e" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="132" y="92" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#0f172a">EVIDENCE STAGING TEST FIXTURE</text>
  <text x="132" y="122" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0f766e">APPROVED</text>
  <text x="70" y="190" font-family="Arial, sans-serif" font-size="17" fill="#334155">NO USER DATA · NO PRODUCTION CLAIM</text>
  <text x="70" y="230" font-family="Arial, sans-serif" font-size="15" fill="#64748b">Used only to verify approved assets return HTTP 200</text>
  <text x="70" y="258" font-family="Arial, sans-serif" font-size="15" fill="#64748b">while candidate assets remain unavailable.</text>
</svg>`;

fs.mkdirSync(path.dirname(output), { recursive: true });
sharp(Buffer.from(svg))
  .webp({ quality: 88 })
  .toFile(output)
  .then(() => {
    console.log(path.relative(process.cwd(), output).replaceAll("\\", "/"));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
