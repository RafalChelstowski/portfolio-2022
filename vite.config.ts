import { defineConfig } from 'vite';

const config = {
  build: {
    target: 'es2015',
  },
  esbuild: {
    jsx: 'automatic' as const,
    jsxImportSource: 'react',
  },
};

export default defineConfig(config);
