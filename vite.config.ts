import { defineConfig } from 'vite';

const config = {
  build: {
    target: 'es2015',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
};

export default defineConfig(config);
