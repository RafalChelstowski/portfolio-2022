const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

function dedupePlugins(configs) {
  const seenPlugins = new Set();

  return configs.map((config) => {
    if (!config.plugins) {
      return config;
    }

    const plugins = Object.fromEntries(
      Object.entries(config.plugins).filter(([pluginName]) => {
        if (seenPlugins.has(pluginName)) {
          return false;
        }

        seenPlugins.add(pluginName);
        return true;
      })
    );

    if (Object.keys(plugins).length === Object.keys(config.plugins).length) {
      return config;
    }

    if (Object.keys(plugins).length === 0) {
      const rest = { ...config };
      delete rest.plugins;

      return rest;
    }

    return {
      ...config,
      plugins,
    };
  });
}

module.exports = dedupePlugins([
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...compat.extends(
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  ...compat.config({
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
  }),
  {
    files: [
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
    files: ['eslint.config.js', 'postcss.config.js', 'tailwind.config.js'],
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
]);
