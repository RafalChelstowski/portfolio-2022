import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

import { Linter } from 'eslint';

import flatConfig from '../eslint.config.js';

const require = createRequire(import.meta.url);
const eslintPackagePath = require.resolve('eslint/package.json');
const { FlatConfigArray } = await import(
  pathToFileURL(
    path.join(
      path.dirname(eslintPackagePath),
      'lib/config/flat-config-array.js'
    )
  )
);

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');
const targetExtensions = new Set(['.ts', '.tsx']);
const severityLabels = ['off', 'warn', 'error'];

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listFiles(entryPath);
      }

      if (targetExtensions.has(path.extname(entry.name))) {
        return [entryPath];
      }

      return [];
    })
  );

  return nestedFiles.flat();
}

function definePluginRules(linter, plugins) {
  for (const [pluginName, plugin] of Object.entries(plugins ?? {})) {
    for (const [ruleName, rule] of Object.entries(plugin.rules ?? {})) {
      linter.defineRule(`${pluginName}/${ruleName}`, rule);
    }
  }
}

function toLegacyConfig(config) {
  const parser = config.languageOptions?.parser;

  return {
    parser: parser
      ? {
          filePath: parser.meta?.name ?? '@typescript-eslint/parser',
          definition: parser,
        }
      : undefined,
    parserOptions: config.languageOptions?.parserOptions,
    globals: config.languageOptions?.globals,
    settings: config.settings,
    rules: config.rules,
  };
}

function formatMessages(filename, messages) {
  return messages.map((message) => {
    const severity = severityLabels[message.severity] ?? 'error';
    const ruleId = message.ruleId ?? 'fatal';

    return `${path.relative(projectRoot, filename)}:${message.line}:${
      message.column
    }  ${severity}  ${message.message}  ${ruleId}`;
  });
}

const configArray = new FlatConfigArray(flatConfig, { basePath: projectRoot });

configArray.normalizeSync();

const files = await listFiles(srcRoot);
const output = [];
let hasErrors = false;

for (const filename of files) {
  const resolvedConfig = configArray.getConfig(filename);

  if (!resolvedConfig) {
    continue;
  }

  const linter = new Linter({ cwd: projectRoot });

  definePluginRules(linter, resolvedConfig.plugins);

  const source = await fs.readFile(filename, 'utf8');
  const messages = linter.verify(source, toLegacyConfig(resolvedConfig), {
    filename,
  });

  if (messages.length > 0) {
    output.push(...formatMessages(filename, messages));
  }

  if (messages.some((message) => message.severity === 2)) {
    hasErrors = true;
  }
}

if (output.length > 0) {
  console.log(output.join('\n'));
}

process.exitCode = hasErrors ? 1 : 0;
