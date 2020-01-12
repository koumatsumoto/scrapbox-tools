module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // for webpack html-loader
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
      },
    ],
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/ignore': ['.html', '.svg'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
};
