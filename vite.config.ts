import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'development' ? '/' : '/pwa-currency-converter/',
    server: {
      host: true,
      port: 5666,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      }
    }
  }
})
