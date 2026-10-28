import fs from 'fs';
import path from 'path';
import Blog from '../models/Blog.js';
import Project from '../models/Project.js';
import ArcadeProduct from '../models/ArcadeProduct.js';
import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';

const BASE_URL = process.env.SITE_URL || 'https://www.winera.in';

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Resolves directory paths for frontend public and dist
 */
export const getTargetDirectories = () => {
  const dirs = [];

  const publicCandidates = [
    process.env.PUBLIC_DIR,
    path.resolve(process.cwd(), '../frontend/public'),
    path.resolve(process.cwd(), 'frontend/public'),
    path.resolve(process.cwd(), 'public'),
    path.resolve(process.cwd(), '../public')
  ].filter(Boolean);

  for (const dir of publicCandidates) {
    if (fs.existsSync(dir)) {
      dirs.push(dir);
      break;
    }
  }

  const distCandidates = [
    process.env.DIST_DIR,
    path.resolve(process.cwd(), '../frontend/dist'),
    path.resolve(process.cwd(), 'frontend/dist'),
    path.resolve(process.cwd(), 'dist'),
    path.resolve(process.cwd(), '../dist')
  ].filter(Boolean);

  for (const dir of distCandidates) {
    if (fs.existsSync(dir)) {
      dirs.push(dir);
      break;
    }
  }

  // Live Nginx web roots if present on Ubuntu server
  const liveNginxDirs = [
    '/var/www/winera/frontend',
    '/var/www/html'
  ];
  for (const dir of liveNginxDirs) {
    if (fs.existsSync(dir) && !dirs.includes(dir)) {
      dirs.push(dir);
    }
  }

  if (dirs.length === 0) {
    dirs.push(path.resolve(process.cwd(), '../frontend/public'));
  }

  return dirs;
};

/**
 * Normalize and ensure URL uses https://www.winera.in
 */
export const normalizeUrl = (rawUrl) => {
  if (!rawUrl) return '';
  let url = rawUrl.trim();

  // Normalize winera.in to www.winera.in as per client's PDF structure
  if (url.startsWith('https://winera.in')) {
    url = url.replace('https://winera.in', BASE_URL);
  } else if (url.startsWith('http://winera.in')) {
    url = url.replace('http://winera.in', BASE_URL);
  } else if (url.startsWith('http://www.winera.in')) {
    url = url.replace('http://www.winera.in', BASE_URL);
  } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  // Remove trailing slash unless it is the root URL
  if (url.length > `${BASE_URL}/`.length && url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
};

/**
 * Escape XML special characters
 */
const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

/**
 * Builds an XML <url> element string
 */
const buildUrlXml = ({ url, lastmod, changefreq = 'weekly', priority = '0.8' }) => {
  const modDate = lastmod || getTodayDateString();
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${modDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
};

/**
 * Wraps a list of <url> elements inside a standard <urlset>
 */
const wrapUrlset = (urlElements = []) => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlElements.join('\n')}\n</urlset>\n`;
};

/**
 * Generates the master <sitemapindex> strictly adhering to Google & client's PDF specification
 */
export const buildSitemapIndexXml = (subSitemaps = {}) => {
  const today = getTodayDateString();
  const pageLastMod = subSitemaps.page || today;
  const productLastMod = subSitemaps.product || today;
  const projectLastMod = subSitemaps.project || today;
  const blogLastMod = subSitemaps.blog || today;

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>${BASE_URL}/page-sitemap.xml</loc>
<lastmod>${pageLastMod}</lastmod>
</sitemap>
<sitemap>
<loc>${BASE_URL}/product-sitemap.xml</loc>
<lastmod>${productLastMod}</lastmod>
</sitemap>
<sitemap>
<loc>${BASE_URL}/project-sitemap.xml</loc>
<lastmod>${projectLastMod}</lastmod>
</sitemap>
<sitemap>
<loc>${BASE_URL}/blog-sitemap.xml</loc>
<lastmod>${blogLastMod}</lastmod>
</sitemap>
</sitemapindex>\n`;
};

/**
 * Write XML file to all target public and dist directories
 */
const writeXmlFile = (filename, content) => {
  const dirs = getTargetDirectories();
  for (const dir of dirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filePath = path.join(dir, filename);
      fs.writeFileSync(filePath, content, 'utf8');
    } catch (err) {
      console.warn(`[Sitemap] Failed to write ${filename} to ${dir}:`, err.message);
    }
  }
};

/**
 * Read XML file from public directory
 */
const readXmlFile = (filename) => {
  const dirs = getTargetDirectories();
  for (const dir of dirs) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
      try {
        return fs.readFileSync(filePath, 'utf8');
      } catch {
        // Continue
      }
    }
  }
  return null;
};

// Canonical Category Slugs (These belong in page-sitemap.xml, NOT product-sitemap.xml)
export const CANONICAL_CATEGORY_SLUGS = [
  'arcade-games',
  'vr-games',
  'ar-games',
  'bowling-alley',
  'trampoline-park',
  'soft-play',
  'bumper-car',
  'hypergrid',
  'amusement-park',
  'laser-tag'
];

/**
 * 1. Generate Page Sitemap (Static pages, resources, and canonical category pages)
 */
export const generatePageSitemapXml = () => {
  const today = getTodayDateString();
  const pages = [
    { url: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly', lastmod: today },
    { url: `${BASE_URL}/why-us`, priority: '0.9', changefreq: 'monthly', lastmod: today },
    { url: `${BASE_URL}/contact`, priority: '0.9', changefreq: 'monthly', lastmod: today },
    { url: `${BASE_URL}/project`, priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: `${BASE_URL}/blog`, priority: '0.9', changefreq: 'weekly', lastmod: today },
    { url: `${BASE_URL}/resource/roi`, priority: '0.8', changefreq: 'monthly', lastmod: today },
    { url: `${BASE_URL}/resource/safety-standards`, priority: '0.8', changefreq: 'monthly', lastmod: today },
    // Category Pages
    ...CANONICAL_CATEGORY_SLUGS.map(cat => ({
      url: `${BASE_URL}/product/${cat}`,
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: today
    })),
    { url: `${BASE_URL}/privacy-policy`, priority: '0.3', changefreq: 'yearly', lastmod: today },
    { url: `${BASE_URL}/terms-and-conditions`, priority: '0.3', changefreq: 'yearly', lastmod: today }
  ];

  const xmlUrls = pages.map(buildUrlXml);
  return wrapUrlset(xmlUrls);
};

/**
 * 2. Generate Product Sitemap (All individual Arcade & VR product pages)
 */
export const generateProductSitemapXml = async () => {
  const today = getTodayDateString();
  const seenSlugs = new Set(CANONICAL_CATEGORY_SLUGS);
  const items = [];

  // Arcade Products
  try {
    const arcadeProds = await ArcadeProduct.find({}).select('slug name title updatedAt');
    for (const prod of arcadeProds) {
      const slug = (prod.slug || prod.title || prod.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        const modDate = prod.updatedAt ? new Date(prod.updatedAt).toISOString().split('T')[0] : today;
        items.push({
          url: `${BASE_URL}/product/${slug}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: modDate
        });
      }
    }
  } catch (e) {
    console.warn('[Sitemap] ArcadeProduct query note:', e.message);
  }

  // VR Games
  try {
    const vrGames = await VrGame.find({}).select('slug name title updatedAt');
    for (const vr of vrGames) {
      const slug = (vr.slug || vr.title || vr.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        const modDate = vr.updatedAt ? new Date(vr.updatedAt).toISOString().split('T')[0] : today;
        items.push({
          url: `${BASE_URL}/product/${slug}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: modDate
        });
      }
    }
  } catch (e) {
    console.warn('[Sitemap] VrGame query note:', e.message);
  }

  // Content collection products
  try {
    const contentDocs = await Content.find({
      sectionKey: { $in: ['arcadeCategories', 'vrCategories', 'vrRange'] }
    });
    for (const doc of contentDocs) {
      const data = doc.data;
      if (!data) continue;
      const cards = data.cards && Array.isArray(data.cards) ? data.cards : (Array.isArray(data) ? data : []);
      for (const card of cards) {
        const slug = (card.slug || card.title || card.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug && !seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          items.push({
            url: `${BASE_URL}/product/${slug}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: today
          });
        }
      }
    }
  } catch (e) {
    console.warn('[Sitemap] Content products query note:', e.message);
  }

  const xmlUrls = items.map(buildUrlXml);
  return wrapUrlset(xmlUrls);
};

/**
 * 3. Generate Project Sitemap (All case studies / projects)
 */
export const generateProjectSitemapXml = async () => {
  const today = getTodayDateString();
  const seenSlugs = new Set();
  const items = [];

  // Project Collection
  try {
    const projects = await Project.find({ isActive: { $ne: false }, status: { $ne: 'inactive' } }).select('slug name updatedAt createdAt isActive status');
    for (const proj of projects) {
      if (proj.isActive === false || proj.status === 'inactive') continue;
      const slug = (proj.slug || proj.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        const modDate = proj.updatedAt ? new Date(proj.updatedAt).toISOString().split('T')[0] : today;
        items.push({
          url: `${BASE_URL}/project/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: modDate
        });
      }
    }
  } catch (e) {
    console.warn('[Sitemap] Project query note:', e.message);
  }

  // Content projectItems
  try {
    const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
    if (contentDoc && Array.isArray(contentDoc.data)) {
      for (const p of contentDoc.data) {
        if (p.isActive === false || p.status === 'inactive') continue;
        const slug = (p.slug || p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug && !seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          items.push({
            url: `${BASE_URL}/project/${slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: today
          });
        }
      }
    }
  } catch (e) {
    console.warn('[Sitemap] Content projectItems query note:', e.message);
  }

  const xmlUrls = items.map(buildUrlXml);
  return wrapUrlset(xmlUrls);
};

/**
 * 4. Generate Blog Sitemap (All blog articles)
 */
export const generateBlogSitemapXml = async () => {
  const today = getTodayDateString();
  const seenSlugs = new Set();
  const items = [];

  // Blog Collection
  try {
    const blogs = await Blog.find({ isPublished: { $ne: false } }).select('slug title updatedAt createdAt');
    for (const b of blogs) {
      const slug = (b.slug || b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (slug && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        const modDate = b.updatedAt ? new Date(b.updatedAt).toISOString().split('T')[0] : today;
        items.push({
          url: `${BASE_URL}/blog/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: modDate
        });
      }
    }
  } catch (e) {
    console.warn('[Sitemap] Blog query note:', e.message);
  }

  // Content blogPosts
  try {
    const contentDoc = await Content.findOne({ sectionKey: 'blogPosts' });
    if (contentDoc && contentDoc.data) {
      const posts = Array.isArray(contentDoc.data)
        ? contentDoc.data
        : (contentDoc.data.posts && Array.isArray(contentDoc.data.posts) ? contentDoc.data.posts : []);
      for (const b of posts) {
        const slug = (b.slug || b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug && !seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          items.push({
            url: `${BASE_URL}/blog/${slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: today
          });
        }
      }
    }
  } catch (e) {
    console.warn('[Sitemap] Content blogPosts query note:', e.message);
  }

  const xmlUrls = items.map(buildUrlXml);
  return wrapUrlset(xmlUrls);
};

/**
 * Master Sync: Generates all 4 sub-sitemaps and the master sitemap.xml index.
 * Saves them as physical XML files in frontend/public and frontend/dist.
 */
export const syncAllDatabaseToSitemap = async () => {
  try {
    const today = getTodayDateString();

    // 1. Generate Page Sitemap
    const pageXml = generatePageSitemapXml();
    writeXmlFile('page-sitemap.xml', pageXml);

    // 2. Generate Product Sitemap
    const productXml = await generateProductSitemapXml();
    writeXmlFile('product-sitemap.xml', productXml);

    // 3. Generate Project Sitemap
    const projectXml = await generateProjectSitemapXml();
    writeXmlFile('project-sitemap.xml', projectXml);

    // 4. Generate Blog Sitemap
    const blogXml = await generateBlogSitemapXml();
    writeXmlFile('blog-sitemap.xml', blogXml);

    // 5. Generate Master sitemap.xml as Sitemap Index (Official Google & Client PDF standard)
    const indexXml = buildSitemapIndexXml({
      page: today,
      product: today,
      project: today,
      blog: today
    });
    writeXmlFile('sitemap.xml', indexXml);

    const pageCount = (pageXml.match(/<loc>/g) || []).length;
    const productCount = (productXml.match(/<loc>/g) || []).length;
    const projectCount = (projectXml.match(/<loc>/g) || []).length;
    const blogCount = (blogXml.match(/<loc>/g) || []).length;
    const totalCount = pageCount + productCount + projectCount + blogCount;

    console.log(`✅ [Sitemap Sync] Generated 100% Google SEO Compliant Sitemaps:
      • sitemap.xml (Master Sitemap Index)
      • page-sitemap.xml (${pageCount} pages)
      • product-sitemap.xml (${productCount} products)
      • project-sitemap.xml (${projectCount} projects)
      • blog-sitemap.xml (${blogCount} blogs)`);

    return {
      success: true,
      message: `Sitemap synchronized successfully! Indexed ${pageCount} pages, ${productCount} products, ${projectCount} projects, and ${blogCount} blogs across 4 dedicated category sitemaps.`,
      counts: {
        pages: pageCount,
        products: productCount,
        projects: projectCount,
        blogs: blogCount,
        total: pageCount + productCount + projectCount + blogCount
      }
    };
  } catch (error) {
    console.error('Error during syncAllDatabaseToSitemap:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Helper to update or insert a single URL into its appropriate sub-sitemap
 */
export const addOrUpdateUrlInSitemap = async (arg1, arg2 = {}) => {
  let url = '';
  let priority = '0.8';
  let changefreq = 'weekly';
  let lastmod = '';

  if (typeof arg1 === 'string') {
    url = arg1;
    priority = arg2.priority || priority;
    changefreq = arg2.changefreq || changefreq;
    lastmod = arg2.lastmod || lastmod;
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    url = arg1.url || '';
    priority = arg1.priority || priority;
    changefreq = arg1.changefreq || changefreq;
    lastmod = arg1.lastmod || lastmod;
  }

  const normalized = normalizeUrl(url);
  if (!normalized) return { success: false, message: 'Invalid URL provided' };

  // For atomic safety and maintaining clean separation, trigger sync
  return syncAllDatabaseToSitemap();
};

/**
 * Batch add or update multiple URLs in sitemap
 */
export const addMultipleUrlsToSitemap = async (urlEntries = []) => {
  return syncAllDatabaseToSitemap();
};

/**
 * Direct Content Retrieval for HTTP Serving
 */
export const getSitemapXmlContent = (type = 'index') => {
  const today = getTodayDateString();
  const fileMap = {
    index: 'sitemap.xml',
    page: 'page-sitemap.xml',
    product: 'product-sitemap.xml',
    project: 'project-sitemap.xml',
    blog: 'blog-sitemap.xml'
  };

  const filename = fileMap[type] || 'sitemap.xml';
  const existingContent = readXmlFile(filename);
  if (existingContent) {
    return existingContent;
  }

  // Fallback defaults if files not written to disk yet
  if (type === 'index') {
    return buildSitemapIndexXml();
  } else if (type === 'page') {
    return generatePageSitemapXml();
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>`;
};
