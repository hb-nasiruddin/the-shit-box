/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const defatultConfig = {
    plugins: [react(), legacy()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    resolve: {
      alias: {
        // As per new structure
        '@assets': path.resolve(__dirname, './src/assets/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@core': path.resolve(__dirname, './src/components/core/'),
        '@part': path.resolve(__dirname, './src/components/part/'),
        '@templates': path.resolve(__dirname, './src/components/templates/'),
        '@config': path.resolve(__dirname, './src/config/'),
        '@contexts': path.resolve(__dirname, './src/contexts/'),
        '@pages': path.resolve(__dirname, './src/pages/'),
        '@services': path.resolve(__dirname, './src/services/'),
        '@theme': path.resolve(__dirname, './src/theme/'),
        '@utils': path.resolve(__dirname, './src/utils/'),
        '@': path.resolve(__dirname, './src/'),
      },
    },
  };

  if (command === 'serve') {
    return {
      ...defatultConfig,
    };
  } else {
    // command === 'build'
    return {
      ...defatultConfig,
      base: '/the-shit-box/',
    };
  }
});
