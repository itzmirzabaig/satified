import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Landing page — served at satified.org
        main: resolve(__dirname, 'index.html'),

        // Study app — served at satified.org/study
        study: resolve(__dirname, 'study/index.html'),

        // ── ADD FUTURE PAGES HERE ──────────────────────────────────────
        // blog:   resolve(__dirname, 'blog/index.html'),
        // scores: resolve(__dirname, 'scores/index.html'),
        // about:  resolve(__dirname, 'about/index.html'),
      }
    }
  },
  // Dev server: both pages accessible during development
  server: {
    port: 5173,
  }
})