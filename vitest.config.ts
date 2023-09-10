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
            coverage: {
                provider: 'istanbul',
                all: true,
                enabled: true,
                reporter: ['text'],
                include: ['**/*.{jsx,tsx}'],
            },
        },
    })
);
