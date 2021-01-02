module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'standard-with-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {project: './tsconfig.json', tsconfigRootDir: __dirname},
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    '@typescript-eslint/no-var-requires': off,
  },
}
