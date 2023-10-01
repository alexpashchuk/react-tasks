/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        eslint(),
        tsconfigPaths(),
        svgr({
            exportAsDefault: true,
        }),
    ],
    server: {
        open: true,
    },
    resolve: {
        alias: {
            '~assets': 'src/assets',
            '~components': 'src/components',
            '~constants': 'src/constants',
            '~utils': 'src/utils',
            '~hooks': 'src/hooks',
            '~types': 'src/types',
        },
    },
});
