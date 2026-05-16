const { FlatCompat } = require('@eslint/eslintrc');

const eslintConfig = require('./.eslintrc.cjs');

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

module.exports = dedupePlugins(compat.config(eslintConfig));
