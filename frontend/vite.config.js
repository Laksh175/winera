import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const gzipCache = new Map();

const previewOptimizationPlugin = () => ({
  name: 'preview-optimization',
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      const acceptEncoding = req.headers['accept-encoding'] || '';
      const urlPath = (req.url || '').split('?')[0];

      if (acceptEncoding.includes('gzip')) {
        let targetFile = null;
        let contentType = '';
        if (urlPath === '/' || urlPath === '/index.html' || urlPath === '') {
          targetFile = path.join(process.cwd(), 'dist', 'index.html');
          contentType = 'text/html; charset=utf-8';
        } else if (urlPath.includes('/assets/') && (urlPath.endsWith('.js') || urlPath.endsWith('.css') || urlPath.endsWith('.svg') || urlPath.endsWith('.json'))) {
          targetFile = path.join(process.cwd(), 'dist', urlPath);
          contentType = urlPath.endsWith('.css')
            ? 'text/css; charset=utf-8'
            : (urlPath.endsWith('.js') ? 'application/javascript; charset=utf-8' : (urlPath.endsWith('.json') ? 'application/json' : 'image/svg+xml'));
        }

        if (targetFile) {
          if (gzipCache.has(targetFile)) {
            const cached = gzipCache.get(targetFile);
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Encoding', 'gzip');
            res.setHeader('Content-Length', cached.length);
            if (urlPath !== '/' && urlPath !== '/index.html') {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            res.end(cached);
            return;
          }
          if (fs.existsSync(targetFile)) {
            const raw = fs.readFileSync(targetFile);
            const gzipped = zlib.gzipSync(raw);
            gzipCache.set(targetFile, gzipped);
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Encoding', 'gzip');
            res.setHeader('Content-Length', gzipped.length);
            if (urlPath !== '/' && urlPath !== '/index.html') {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
            res.end(gzipped);
            return;
          }
        }
      }

      if (urlPath && (urlPath.includes('/assets/') || urlPath.match(/\.(webp|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|ico|json)$/i))) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), previewOptimizationPlugin()],
  build: {
    assetsInlineLimit: 0,
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    modulePreload: {
      resolveDependencies(filename, deps) {
        return deps.filter(dep => !dep.includes('quill'));
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('quill')) {
            return 'quill-editor';
          }
        }
      }
    }
  }
})
