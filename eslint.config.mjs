import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Runs Prettier as an ESLint rule and disables ESLint stylistic rules
  // that would conflict with it, so `eslint --fix` is the single source
  // of formatting truth.
  prettierRecommended,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated/vendored content — not source, and the bundled files
    // (e.g. ds-bundle/_vendor/react.js) are large enough to make ESLint
    // (and the Prettier rule) extremely slow if linted.
    "dist/**",
    "ds-bundle/**",
    ".ds-sync/**",
    ".design-sync/**",
    // openapi-typescript output — regenerated from the backend's OpenAPI
    // spec via `pnpm gen:api`, never hand-edited (business-management-infra
    // CLAUDE.md §3). Same rationale as the other generated/vendored ignores
    // above.
    "shared/api/generated/**",
  ]),
]);

export default eslintConfig;
