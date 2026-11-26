// Claude Code asks the owner before each edit to this file, so an agent can't weaken a check to
// make it pass (CS-3).
import eslint from "@eslint/js";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import noBarrelFiles from "eslint-plugin-no-barrel-files";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

// componentNames adds PascalCase for React components, such as `Board`, written as a function or
// as a const.
function namingConvention(componentNames) {
  const pascalCase = componentNames ? ["PascalCase"] : [];
  return [
    "error",
    { selector: "default", format: ["camelCase"] },
    { selector: "typeLike", format: ["PascalCase"] },
    { selector: "function", format: ["camelCase", ...pascalCase] },
    // Lint can't tell a fixed value from any other top-level const, so both are allowed.
    {
      selector: "variable",
      modifiers: ["const", "global"],
      format: ["camelCase", "UPPER_CASE", ...pascalCase],
    },
    { selector: "enumMember", format: ["UPPER_CASE"] },
    { selector: "import", format: ["camelCase", "PascalCase"] },
    // Keys such as "@typescript-eslint/naming-convention" can't be renamed.
    {
      selector: ["objectLiteralProperty", "typeProperty"],
      modifiers: ["requiresQuotes"],
      format: null,
    },
  ];
}

// When code goes over a limit, it's split, and the limit stays the same (CS-3).
const READABILITY_LIMITS = {
  complexity: ["error", 10],
  "max-depth": ["error", 3],
  "max-lines-per-function": [
    "error",
    { max: 50, skipBlankLines: true, skipComments: true },
  ],
  "max-params": ["error", 4],
  "max-lines": [
    "error",
    { max: 300, skipBlankLines: true, skipComments: true },
  ],
};

// No comment may turn off a lint rule or a type error (CS-3).
const ESCAPE_HATCH_BANS = {
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-non-null-assertion": "error",
  "@typescript-eslint/ban-ts-comment": [
    "error",
    { "ts-ignore": true, "ts-nocheck": true, "ts-expect-error": true },
  ],
  "@eslint-community/eslint-comments/no-use": "error",
};

// Meets AD-7. tsconfig.base.json keeps the DOM out.
const ENGINE_IMPORT_BANS = {
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["react", "react/*", "react-dom", "react-dom/*"],
          message: "The engine has no React (AD-7).",
        },
        {
          group: [
            "socket.io",
            "socket.io/*",
            "socket.io-client",
            "socket.io-client/*",
            "node:http",
            "node:http2",
            "node:https",
            "node:net",
            "node:tls",
            "node:dgram",
            "http",
            "http2",
            "https",
            "net",
            "tls",
            "dgram",
          ],
          message: "The engine has no network code (AD-7).",
        },
      ],
    },
  ],
};

export default defineConfig(
  globalIgnores(["**/dist/", "**/coverage/", ".claude/worktrees/"]),
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintComments.recommended,
  noBarrelFiles.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // In the presets already. Listed so nobody turns them off.
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",

      "@typescript-eslint/naming-convention": namingConvention(false),
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],
      // ESLint can't tell outside data apart, so this bans every `as` except `as const` (CS-6).
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      ...READABILITY_LIMITS,
      ...ESCAPE_HATCH_BANS,
    },
  },
  {
    // Tools such as ESLint need a default export from their config files.
    files: ["**/*.config.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      "no-restricted-exports": "off",
    },
  },
  {
    files: ["packages/engine/**/*.{ts,tsx,mts,cts}"],
    rules: ENGINE_IMPORT_BANS,
  },
  {
    // Vite's fast refresh rule keeps each component file exporting only components.
    files: ["packages/client/**/*.{ts,tsx}"],
    extends: [
      eslintReact.configs["strict-type-checked"],
      reactRefresh.configs.vite,
    ],
  },
  {
    files: ["packages/client/**/*.tsx"],
    rules: {
      "@typescript-eslint/naming-convention": namingConvention(true),
    },
  },
  {
    // Plain JavaScript files, such as this one, aren't in a tsconfig, so they have no types to
    // check.
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "max-lines-per-function": "off",
    },
  },
  // Last, so ESLint doesn't fight Prettier.
  eslintConfigPrettier,
);
