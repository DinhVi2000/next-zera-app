const ESLINT = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
};

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    // ...
    "react-hooks",
  ],
  ignorePatterns: ["dist"],
  extends: ["next/core-web-vitals", "eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    env: "readonly",
    getEnv: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    semi: [ESLINT.ERROR, "always"],
    quotes: [ESLINT.OFF, "single"],
    "no-console": ESLINT.WARNING,
    "space-before-blocks": ESLINT.WARNING,
    "no-trailing-spaces": ESLINT.WARNING,
    "no-multi-spaces": ESLINT.WARNING,
    eqeqeq: ESLINT.WARNING,
    "valid-typeof": ESLINT.ERROR,
    "no-unreachable": ESLINT.WARNING,
    "no-cond-assign": ESLINT.WARNING,
    "no-constant-condition": ESLINT.WARNING,
    "no-dupe-keys": ESLINT.WARNING,
    "no-duplicate-case": ESLINT.WARNING,
    "arrow-spacing": ESLINT.WARNING,
    "keyword-spacing": [ESLINT.ERROR, { before: true }],
    "no-whitespace-before-property": ESLINT.WARNING,
    "space-in-parens": ESLINT.WARNING,
    "space-infix-ops": ESLINT.WARNING,
    "semi-spacing": ESLINT.WARNING,
    "no-undef": ESLINT.ERROR,
    "no-useless-catch": ESLINT.OFF,
    "array-bracket-spacing": [ESLINT.WARNING, "never"],
    "object-curly-spacing": [ESLINT.WARNING, "always"],
    "object-shorthand": ESLINT.WARNING,
    "comma-dangle": [
      ESLINT.WARNING,
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "comma-spacing": [
      ESLINT.WARNING,
      {
        before: false,
        after: true,
      },
    ],
    "key-spacing": [ESLINT.WARNING, { beforeColon: false }],
    "no-multiple-empty-lines": [
      ESLINT.WARNING,
      {
        max: ESLINT.WARNING,
        maxEOF: ESLINT.WARNING,
        maxBOF: ESLINT.OFF,
      },
    ],
    "no-unused-vars": [ESLINT.WARNING, { vars: "local" }],
    "no-case-declarations": ESLINT.OFF,
    "func-call-spacing": [ESLINT.ERROR, "never"],
    "space-before-function-paren": [
      ESLINT.WARNING,
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    indent: [ESLINT.WARNING, 2, { SwitchCase: 1 }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
};
