import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ESLint configuration

  // Ignores
  {
    ignores: [
      "*/dist",
      "**/node_modules",
      "**/package-lock.json",
      "**/.vscode",
      "www/_site",
      "www/static/keymapkit",
    ],
  },

  // Use the recommended rules from ESLint, TypeScript, and other plugins
  ...tseslint.configs.recommended,

  // TypeScript rules
  {
    files: ["**/*.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // JavaScript rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Eleventy config rules
  {
    files: ["www/eleventy.*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // JSON rules
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // Markdown rules
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"],
    rules: {
      "markdown/no-missing-label-refs": "off", // It can't understand eleventy's inputPathToUrl
    },
  },

  // CSS rules
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": "off", // Sorry I need nesting
      "css/no-invalid-properties": "off", // It doesn't understand a vars.css file that has variables used in other files
    },
  },
]);
