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
    // openapi-typescript output — regenerated from the backend's OpenAPI
    // spec via `pnpm gen:api`, never hand-edited (business-management-infra
    // CLAUDE.md §3). Same rationale as .gitignore'd generated content
    // elsewhere in the project.
    "shared/api/generated/**",
  ]),
]);

export default eslintConfig;
