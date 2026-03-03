import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '../../types': fileURLToPath(new URL('./study/types.ts', import.meta.url)),
    }
  },
  build: {
    rollupOptions: {
      input: {
        main:  fileURLToPath(new URL('index.html', import.meta.url)),
        study: fileURLToPath(new URL('study/index.html', import.meta.url)),
      },
    }
  },
  server: {
    port: 5173,
  }
})