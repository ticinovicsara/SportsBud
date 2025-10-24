const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');

module.exports = {
  root: true,
  ignores: ['dist', 'node_modules'],
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      extends: [
        js.configs.recommended,
        reactHooks.configs['recommended-latest'],
        reactRefresh.configs.vite,
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      env: { browser: true },
      rules: {
        'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
        'prettier/prettier': 'error',
      },
    },
  ],
};
