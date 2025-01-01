import stylistic from "@stylistic/eslint-plugin-ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "projects/**/*",
        "**/dist",
        "**/coverage",
        "**/*.spec.ts",
        "**/*.graphql",
        "src/main.server.ts",
    ],
}, {
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "script",
    },
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
).map(config => ({
    ...config,
    files: ["**/*.ts"],
})), {
    files: ["**/*.ts"],

    plugins: {
        "@stylistic": stylistic,
    },

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "wal",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: "wal",
            style: "kebab-case",
        }],

        "@typescript-eslint/dot-notation": "error",

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "explicit",
        }],

        "@typescript-eslint/explicit-function-return-type": ["error"],

        "@stylistic/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },

            multilineDetection: "brackets",
        }],

        "@typescript-eslint/no-empty-function": ["error", {
            allow: ["arrowFunctions"],
        }],

        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "warn",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/prefer-for-of": ["warn"],
        "@typescript-eslint/prefer-function-type": ["warn"],
        "@stylistic/semi": ["error"],
        "@stylistic/type-annotation-spacing": "error",
        "@typescript-eslint/typedef": "warn",
        "@typescript-eslint/no-non-null-assertion": "error",
        "arrow-parens": ["warn", "as-needed"],
        "brace-style": ["warn"],
        "comma-dangle": ["error", "always-multiline"],
        "eol-last": "warn",
        "linebreak-style": ["error", "unix"],
        "max-len": "off",
        "new-parens": "error",
        "newline-per-chained-call": "off",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-extra-semi": "error",
        "no-invalid-this": "warn",
        "no-irregular-whitespace": "error",
        "no-redeclare": "error",
        "no-trailing-spaces": "error",
        "no-void": "error",
        "one-var": ["error", "never"],
        "space-in-parens": ["warn", "never"],
    },
}, ...compat.extends(
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility",
  "plugin:prettier/recommended",
).map(config => ({
    ...config,
    files: ["**/*.html"],
})), {
    files: ["**/*.html"],

    rules: {
        "@angular-eslint/template/click-events-have-key-events": "off",
        "@angular-eslint/template/interactive-supports-focus": "off",
    },
}];
