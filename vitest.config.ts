import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
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
        exclude: [
          'src/const/*',
          'src/main.tsx',
          'src/api/*',
          '**/*/@(index|config).@(tsx|ts)',
          '**/*/*.@(icon|asset).@(tsx|ts)',
        ],
      },
    },
  })
);
