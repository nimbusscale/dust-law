import { configDefaults, defineConfig } from "vitest/config";

// tsc -b compiles each test file into its package's dist folder, and never deletes one whose
// source is gone. Without this, Vitest would run each test twice, and keep running deleted ones.
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "**/dist/**"],
  },
});
