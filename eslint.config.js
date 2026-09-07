export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error'] }]
    }
  },
  {
    ignores: ['dist/', 'node_modules/', 'src/generated/']
  }
];