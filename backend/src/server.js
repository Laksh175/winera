import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import connectDB from './config/db.js';
import { initDbBackupCron } from './services/dbBackupCron.js';
import { initScheduledPublishingCron } from './services/scheduledPublishService.js';
import apiRoutes from './routes/api.routes.js';
import { getSitemapXmlController } from './controllers/content.controller.js';
import {
  getBaseIndexHtml,
  injectSeoTags,
  getBlogSeoData,
  getProductSeoData,
  getProjectSeoData,
  getStaticPageSeoData
} from './utils/seoHtmlService.js';

import fs from 'fs';
import path from 'path';

connectDB();
initDbBackupCron();
initScheduledPublishingCron();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true, parameterLimit: 500000 }));

// Basic Security Headers Middleware (Strict-Transport-Security, X-Frame-Options, Content-Security-Policy)
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob: res.cloudinary.com; font-src 'self' https: data: fonts.gstatic.com; style-src 'self' https: 'unsafe-inline' fonts.googleapis.com; frame-src 'self' https: https://www.youtube.com https://youtube.com; connect-src 'self' https: wss:;");
  next();
});

// Root dynamic SEO sitemap & category sub-sitemaps (100% Google Compliant)
app.get([
  '/sitemap.xml',
  '/page-sitemap.xml',
  '/product-sitemap.xml',
  '/project-sitemap.xml',
  '/blog-sitemap.xml'
], getSitemapXmlController);

// Root robots.txt serving configured crawlers and rules
app.get('/robots.txt', (req, res) => {
  const filePath = path.resolve(process.cwd(), '../frontend/public/robots.txt');
  if (fs.existsSync(filePath)) {
    res.type('text/plain; charset=utf-8');
    return res.sendFile(filePath);
  }
  res.type('text/plain; charset=utf-8');
  res.send(`# Robots.txt for https://winera.in/
# Purpose: Crawl control for search engines & AI bots

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /login/
Disallow: /signup/
Disallow: /user/
Disallow: /account/
Disallow: /settings/
Disallow: /profile/
Disallow: /api/
Disallow: /data/
Disallow: /private/
Disallow: /backend/
Disallow: /config/
Disallow: /internal/
Disallow: */feed/
Disallow: /thank-you
Disallow: /*?utm_

Sitemap: https://winera.in/sitemap.xml
`);
});

// Root LLMs crawler context specification
app.get('/llms.txt', (req, res) => {
  const filePath = path.resolve(process.cwd(), '../frontend/public/llms.txt');
  if (fs.existsSync(filePath)) {
    res.type('text/plain; charset=utf-8');
    return res.sendFile(filePath);
  }
  res.type('text/plain; charset=utf-8').send('# Winera International\n\n> Commercial Game Zone Equipment Manufacturer in India.\n');
});

// Root Machine-Readable AI Catalog (ARD Specification Compliant)
app.get([
  '/ai-catalog.json',
  '/.well-known/ai-catalog.json',
  '/.well-known/ard.json'
], (req, res) => {
  const wellKnownPath = path.resolve(process.cwd(), '../frontend/public/.well-known/ai-catalog.json');
  if (fs.existsSync(wellKnownPath)) {
    res.type('application/json; charset=utf-8');
    return res.sendFile(wellKnownPath);
  }
  const rootPath = path.resolve(process.cwd(), '../frontend/public/ai-catalog.json');
  if (fs.existsSync(rootPath)) {
    res.type('application/json; charset=utf-8');
    return res.sendFile(rootPath);
  }
  res.status(404).json({ error: 'Catalog not found' });
});

// Auto-serve compressed WebP files for PNG/JPG upload requests
app.use('/uploads', (req, res, next) => {
  if (req.path.match(/\.(png|jpg|jpeg)$/i)) {
    const webpRelPath = req.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const fullWebpPath = path.join(process.cwd(), 'uploads', webpRelPath);
    if (fs.existsSync(fullWebpPath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.sendFile(fullWebpPath);
    }
  }
  next();
});

app.use('/uploads', express.static('uploads', {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
}));

// Serve frontend static build in production if available with aggressive cache-control
const frontendDistPath = path.resolve(process.cwd(), '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath, {
    index: false,
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
}

// Global process error safety guards for production stability
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

// Legacy Product URLs 301 Permanent Redirect Handler (SEO Canonical Preservation)
app.get([
  '/product/arcade-games/:slug',
  '/product/vr-games/:slug',
  '/product/:category/:slug'
], (req, res) => {
  const { slug } = req.params;
  const queryString = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  return res.redirect(301, `/product/${slug}${queryString}`);
});

app.use('/api', apiRoutes);

// Dynamic HTML Server: Injects accurate SEO meta tags (title, description, image, canonical, OG & Twitter tags) for raw requests & web crawlers
app.get('*', async (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }

  const baseHtml = getBaseIndexHtml();
  if (!baseHtml) {
    if (req.path === '/' || req.path === '') {
      return res.send('Winera Backend API is running...');
    }
    return next();
  }

  try {
    const rawPath = req.path;
    let seoData = null;

    // 1. Dynamic Blog Pages: /blog/:slug
    if (rawPath.startsWith('/blog/')) {
      const slug = rawPath.replace(/^\/blog\//, '').replace(/\/+$/, '');
      if (slug) {
        seoData = await getBlogSeoData(slug);
      }
    }
    // 2. Dynamic Product Pages: /product/:slug
    else if (rawPath.startsWith('/product/')) {
      const slug = rawPath.replace(/^\/product\//, '').replace(/\/+$/, '');
      if (slug) {
        seoData = await getProductSeoData(slug);
      }
    }
    // 3. Dynamic Project Pages: /project/:slug
    else if (rawPath.startsWith('/project/')) {
      const slug = rawPath.replace(/^\/project\//, '').replace(/\/+$/, '');
      if (slug) {
        seoData = await getProjectSeoData(slug);
      }
    }

    // 4. Static Pages or Fallback
    if (!seoData) {
      seoData = getStaticPageSeoData(rawPath);
    }

    const injectedHtml = injectSeoTags(baseHtml, seoData);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(injectedHtml);
  } catch (err) {
    console.error('[DynamicHTML] Error injecting SEO tags:', err);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(baseHtml);
  }
});

// Global Express Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Global Express Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
