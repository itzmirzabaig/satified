import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
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