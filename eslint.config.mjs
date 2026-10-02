import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Frozen standalone exports and vendored libraries, not application sources.
    "public/minz-lineup/design-factory-v5/_next/**",
    "public/minz-lineup/showcase/_next/**",
    "public/minz-lineup/design-factory-v5/oss/axe-core/**",
    "public/minz-lineup/design-factory-v5/oss/sortablejs/**",
  ]),
]);

export default eslintConfig;
