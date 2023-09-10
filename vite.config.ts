/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        react(),
        eslint({
            cache: false,
        }),
        svgr({
            exportAsDefault: true,
        }),
    ],
    server: {
        open: true,
    },
});
