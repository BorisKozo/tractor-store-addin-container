import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/[name]-[hash].js', // This is the default format
                manualChunks: (id) => {
                    const normalizedId = id.split(path.sep).join('/');

                    if (normalizedId.includes('/node_modules/')) {
                        return 'vendor';
                    }

                    if (normalizedId.includes('/src/common/')) {
                        return 'common';
                    }

                    if (normalizedId.includes('/src/extensibility/')) {
                        return 'extensibility';
                    }

                    if (normalizedId.includes('/src/interface/')) {
                        return 'interface';
                    }

                    if (normalizedId.includes('/src/modules/checkout/')) {
                        return 'checkout';
                    }

                    if (normalizedId.includes('/src/modules/decide/')) {
                        return 'decide';
                    }

                    if (normalizedId.includes('/src/modules/explore/')) {
                        return 'explore';
                    }

                    return undefined;
                },
            },
        },
    },
});
