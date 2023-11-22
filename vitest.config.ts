import { defineConfig } from 'vitest/config';

export default defineConfig({
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
      include: ['src/**/*'],
      exclude: ['src/const/*', 'src/main.tsx', '**/*/@(index|config).@(tsx|ts)', '**/*/*.@(icon|asset).@(tsx|ts)'],
    },
  },
  resolve: {
    alias: {
      '@/*': 'src/*',
    },
  },
});
