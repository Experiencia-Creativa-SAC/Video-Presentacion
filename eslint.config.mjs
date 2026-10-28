import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
export default [
  {ignores:['node_modules/**','out/**','deliverables/**','public/**']},
  {files:['**/*.mjs'],languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:{process:'readonly',console:'readonly',Buffer:'readonly'}},rules:js.configs.recommended.rules},
  {files:['**/*.ts','**/*.tsx'],languageOptions:{parser,parserOptions:{ecmaFeatures:{jsx:true}}},plugins:{'@typescript-eslint':tsPlugin},rules:tsPlugin.configs.recommended.rules},
];
