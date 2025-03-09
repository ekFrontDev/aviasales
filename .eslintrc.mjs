import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:import/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:@typescript-eslint/recommended",
      "eslint-config-prettier",
    ],
    settings: {
      react: { version: "18.3" },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...airbnb.rules,
      ...prettier.rules,
      "prettier/prettier": "error",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "error",
    },
  },
];
