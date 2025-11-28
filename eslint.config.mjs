import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

export default [
     ...obsidianmd.configs.recommended,
    {
        files: ['**/*.ts'],
        ignores: ['node_modules/**', 'main.js', 'dist/**', '*.d.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                project: "./tsconfig.json"
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            "obsidianmd/ui/sentence-case": [
                "warn",
                {
                brands: ["YourBrand"],
                acronyms: ["OK"],
                enforceCamelCaseLower: true,
                },
            ],
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-prototype-builtins': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
        },
    },
    // Special rules for main.ts to preserve critical import order
    {
        files: ['src/main.ts'],
        rules: {
            // Disable any import sorting in main.ts to preserve dependency order
            'sort-imports': 'off',
        },
    },
];`
`