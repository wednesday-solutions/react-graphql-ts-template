const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    amd: true,
    'jest/globals': true,
    commonjs: true
  },
  plugins: ['react', 'redux-saga', 'react-hooks', 'jest', '@typescript-eslint'],
  extends: [
    'prettier',
    'prettier/react',
    'prettier-standard',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'import/no-webpack-loader-syntax': 0,
    'react/display-name': 0,
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }],
    'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', 250],
    'no-else-return': 'error',
    'max-params': ['error', 3],
    'prettier/prettier': ['error', prettierOptions],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'eslint-comments/no-use': 0
  },
  globals: {
    GLOBAL: false,
    it: false,
    expect: false,
    describe: false
  }
};
