import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

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
  ],
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