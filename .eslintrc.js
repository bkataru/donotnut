module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    env: {
      node: true,
      browser: true,
    },
    ignorePatterns: ['.eslintrc.js']
  };
