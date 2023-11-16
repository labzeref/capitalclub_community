import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/scss/app.scss',
                'resources/js/bundle.js',
            ],
            refresh: true,
        }),
        react(),
        svgr({
            svgrOptions: {
                // svgr options
            },
        }),
    ],
});
