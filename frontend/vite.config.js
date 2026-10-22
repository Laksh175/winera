import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'compression'

const previewOptimizationPlugin = () => ({
  name: 'preview-optimization',
  configurePreviewServer(server) {
    server.middlewares.use(compression());
    server.middlewares.use((req, res, next) => {
      if (req.url && (req.url.includes('/assets/') || req.url.match(/\.(webp|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|ico|json)$/i))) {
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
        return deps.filter(dep => !dep.includes('motion-core') && !dep.includes('quill'));
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-core';
          }
          if (id.includes('framer-motion')) {
            return 'motion-core';
          }
          if (id.includes('quill')) {
            return 'quill-editor';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
