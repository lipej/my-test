module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error']
      }
    ],
    "@typescript-eslint/no-unused-vars": ["error", { "ignoreRestSiblings": true }],
    'no-debugger': 'error',
    eqeqeq: ['error', 'always'],
    'max-depth': ['error', 6],
    'max-params': ['error', 3],
    complexity: ['error', 12],
    'no-useless-constructor': 'off',
  }
}
