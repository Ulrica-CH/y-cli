import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importSort from "eslint-plugin-simple-import-sort";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{js,jsx,ts,tsx}"],
  ignores: ["*.js", "**/*dist/**/*", "**/*node_modules/**/*"],
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\w"], ["^@\\w"], ["^@/"], ["^\\u0000"]],
      },
    ],
  },
  languageOptions: {
    parser: tseslint.parser,
    globals: {
      ...globals.node,
    },
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      //   project:['./tsconfig.json']
    },
  },
  plugins: { "simple-import-sort": importSort },
});
