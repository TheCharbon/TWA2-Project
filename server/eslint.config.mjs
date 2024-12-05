import globals from "globals";
import js from "@eslint/js";
//import jest from "eslint-plugin-jest";

export default [
  {
    ignores: [
      "public/*",
      "node_modules/*",
      "react_build/*"
    ],
  },
  {
    files: ["server/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "no-multiple-empty-lines": [
        "error",
        { max: 1 },
      ],
      curly: "error",
      indent: [
        "error",
        4,
      ],
      quotes: [
        "error",
        "single",
      ],
      semi: [
        "warn",
        "never",
      ],
      eqeqeq: [
        "error",
        "always",
      ],
      "no-console": [
        "warn",
      ],
      "no-new": "error",
      "no-var": "error",
      "comma-dangle": [
        "warn",
        "always-multiline",
      ],
      "max-len": [
        "warn",
        { code: 80, comments: 120 },
      ],
    },
  },
  {
    files: ["**/*.test.js"],
    //...jest.configs.flat.recommended,
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
]