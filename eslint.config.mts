// ESLint base
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

// Language-specific
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import css from '@eslint/css';
import markdown from '@eslint/markdown';

// Angular-specific
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import templateParser from '@angular-eslint/template-parser';

// Plugins & configs
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const ignorePatterns = [
  '.angular/**',
  'dist/**',
  'node_modules/**',
  '.vscode/**',
  'coverage/**',
  'package-lock.json',
  'pnpm-lock.yaml ',
  'tsconfig.json',
  'tsconfig.*.json',
  'package.json',
  'angular.json',
  '.prettierrc',
  '.eslintignore',
];

const jsConfig = {
  files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
  plugins: { js },
  extends: ['js/recommended'],
  languageOptions: { globals: globals.browser },
};

const tsConfig = {
  files: ['**/*.ts'],
  extends: [tseslint.configs.recommended],
  plugins: {
    '@angular-eslint': angular,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    ...angular.configs?.recommended?.rules,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

const htmlConfig = {
  files: ['**/*.html'],
  plugins: { '@angular-eslint/template': angularTemplate },
  languageOptions: {
    parser: templateParser,
  },
  rules: {
    ...angularTemplate.configs.recommended.rules,
  },
};

const jsonConfig = {
  files: ['**/*.json'],
  plugins: { json },
  language: 'json/json',
  extends: ['json/recommended'],
};

const jsoncConfig = {
  files: ['**/*.jsonc'],
  plugins: { json },
  language: 'json/jsonc',
  extends: ['json/recommended'],
};

const json5Config = {
  files: ['**/*.json5'],
  plugins: { json },
  language: 'json/json5',
  extends: ['json/recommended'],
};

const mdConfig = {
  files: ['**/*.md'],
  plugins: { markdown },
  language: 'markdown/gfm',
  extends: ['markdown/recommended'],
};

const cssConfig = {
  files: ['**/*.css'],
  plugins: { css },
  language: 'css/css',
  extends: ['css/recommended'],
};

export default defineConfig([
  { ignores: ignorePatterns },
  jsConfig,
  tsConfig,
  htmlConfig,
  jsonConfig,
  jsoncConfig,
  json5Config,
  mdConfig,
  cssConfig,
  prettier,
]);
