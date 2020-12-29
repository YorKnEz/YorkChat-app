module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-mixed-operators': 'error',
    'no-tabs': 'error',
    curly: ['error', 'all'],
    'sort-imports': [
      2,
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
};
