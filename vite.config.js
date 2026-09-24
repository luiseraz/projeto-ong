import { defineConfig } from 'vite';

export default defineConfig({
  build: { minify: 'esbuild', target: 'es2020' },
  test: { environment: 'jsdom' },
});
