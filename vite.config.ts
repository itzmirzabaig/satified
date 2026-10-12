import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      // dev-only: make /sat-math/... style directory URLs resolve to their
      // public/<path>/index.html, like Cloudflare Pages does in production
      name: 'static-directory-index',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const u = (req.url || '').split('?')[0]
          if (u.length > 1 && u.endsWith('/') && !u.startsWith('/study') && !u.startsWith('/@')) {
            req.url = u + 'index.html'
          }
          next()
        })
      },
    },
    {
      // build only: study/tutor.js is a classic script (no module type), and
      // Vite bundles module scripts only, so ship it verbatim into dist/study
      name: 'copyStudyTutor',
      apply: 'build',
      closeBundle() {
        mkdirSync(resolve(__dirname, 'dist/study'), { recursive: true })
        copyFileSync(resolve(__dirname, 'study/tutor.js'), resolve(__dirname, 'dist/study/tutor.js'))
      },
    },
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Points Vite to both your landing page and your study app
        main: resolve(__dirname, 'index.html'),
        study: resolve(__dirname, 'study/index.html'),
      },
      output: {
        // Every question template is its own lazily loaded chunk, so a content
        // hash in the filename means editing one question renames that one
        // chunk. The old name stops existing the moment the next deploy goes
        // out, and a practice test that was already open in a browser still
        // holds the old URL: it asks for a file that is gone, gets a 404, and
        // the student loses that question through no fault of their own.
        // Question chunks therefore keep stable names. public/_headers gives
        // them a short TTL with background revalidation rather than the
        // immutable year that hashed assets get, so edits still reach people
        // quickly while the URL stays valid across deploys.
        chunkFileNames(info) {
          return /^question_\d+$/.test(info.name || '')
            ? 'q/[name].js'
            : 'assets/[name]-[hash].js'
        },
      },
    }
  },
  server: {
    port: 5173,
  }
})