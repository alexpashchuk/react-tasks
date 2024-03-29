import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import magicalSvg from 'vite-plugin-magical-svg';
import path from 'path';

export default defineConfig({
  plugins: [react(), magicalSvg({ target: 'react' })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    css: true,
    coverage: {
      provider: 'istanbul',
      all: true,
      enabled: true,
      reporter: ['text'],
      include: ['**/*.tsx'],
      exclude: ['**/_app.tsx', '**/_document.tsx'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
