module.exports = {
  root: true,
  ignorePatterns: ['dist/**', 'node_modules/**'],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  overrides: [
    {
      files: [
        '.eslintrc.cjs',
        'eslint.config.js',
        'postcss.config.js',
        'tailwind.config.js',
        'vite.config.ts',
        'scripts/**/*.mjs',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: [
        '.eslintrc.cjs',
        'eslint.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['scripts/**/*.mjs'],
      rules: {
        'no-await-in-loop': 'off',
        'no-console': 'off',
        'no-continue': 'off',
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
