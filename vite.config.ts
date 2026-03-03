import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps the broken imports in your 1,300 files to the correct location
      '../../types': fileURLToPath(new URL('./study/types.ts', import.meta.url)),
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Points Vite to both your landing page and your study app
        main: resolve(__dirname, 'index.html'),
        study: resolve(__dirname, 'study/index.html'),
      },
    }
  },
  server: {
    port: 5173,
  }
})