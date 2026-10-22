import fs from 'fs';
import path from 'path';
import Blog from '../models/Blog.js';
import Project from '../models/Project.js';
import ArcadeProduct from '../models/ArcadeProduct.js';
import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';

const BASE_URL = 'https://winera.in';

/**
 * Resolves the absolute path to sitemap.xml dynamically
 */
export const getSitemapPath = () => {
  const candidates = [
    process.env.SITEMAP_PATH,
    path.resolve(process.cwd(), '../frontend/public/sitemap.xml'),
    path.resolve(process.cwd(), 'frontend/public/sitemap.xml'),
    path.resolve(process.cwd(), 'public/sitemap.xml'),
    path.resolve(process.cwd(), '../frontend/dist/sitemap.xml'),
    path.resolve(process.cwd(), 'dist/sitemap.xml')
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // Fallback to default expected path in project
  return path.resolve(process.cwd(), '../frontend/public/sitemap.xml');
};

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
 * Clean & normalize URL
 */
export const normalizeUrl = (rawUrl) => {
  if (!rawUrl) return '';
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  // Remove trailing slash unless it is just root https://winera.in/
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
  return unsafe.replace(/[<>&'"]/g, (c) => {
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
 * Add or update a single URL in sitemap.xml
 */
export const addOrUpdateUrlInSitemap = async (arg1, arg2 = {}) => {
  let url = '';
  let priority = '0.8';
  let changefreq = 'weekly';
  let lastmod = null;

  if (typeof arg1 === 'string') {
    url = arg1;
    priority = arg2.priority || priority;
    changefreq = arg2.changefreq || changefreq;
    lastmod = arg2.lastmod || lastmod;
  } else if (arg1 && typeof arg1 === 'object') {
    url = arg1.url;
    priority = arg1.priority || priority;
    changefreq = arg1.changefreq || changefreq;
    lastmod = arg1.lastmod || lastmod;
  }

  const normalized = normalizeUrl(url);
  if (!normalized) return { success: false, message: 'Invalid URL' };

  return addMultipleUrlsToSitemap([{ url: normalized, priority, changefreq, lastmod }]);
};

/**
 * Batch add or update multiple URLs in sitemap.xml in a single atomic file write
 */
export const addMultipleUrlsToSitemap = async (urlEntries = []) => {
  if (!Array.isArray(urlEntries) || urlEntries.length === 0) {
    return { success: true, count: 0, added: 0, updated: 0 };
  }

  const sitemapPath = getSitemapPath();
  const today = getTodayDateString();

  let xmlContent = '';
  if (fs.existsSync(sitemapPath)) {
    xmlContent = fs.readFileSync(sitemapPath, 'utf8');
  } else {
    // If file doesn't exist, create initial root template
    xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
  }

  let added = 0;
  let updated = 0;
  const newBlocksToAdd = [];

  for (const entry of urlEntries) {
    const rawUrl = entry.url || entry.loc;
    if (!rawUrl) continue;
    const url = normalizeUrl(rawUrl);
    const priority = entry.priority || '0.8';
    const changefreq = entry.changefreq || 'weekly';
    const modDate = entry.lastmod || today;

    // Check if URL already exists in XML
    const locPattern = new RegExp(`<loc>\\s*${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\\/loc>`, 'i');
    const hasMatch = locPattern.test(xmlContent);

    if (hasMatch) {
      // Update existing <lastmod> for this loc
      // Match the entire <url> block containing this loc
      const urlBlockPattern = new RegExp(
        `(<url>[\\s\\S]*?<loc>\\s*${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\\/loc>[\\s\\S]*?<lastmod>)[^<]+(<\\/lastmod>[\\s\\S]*?<\\/url>)`,
        'i'
      );
      if (urlBlockPattern.test(xmlContent)) {
        xmlContent = xmlContent.replace(urlBlockPattern, `$1${modDate}$2`);
        updated++;
      }
    } else {
      // Collect new block to insert
      newBlocksToAdd.push(buildUrlXml({ url, lastmod: modDate, changefreq, priority }));
      added++;
    }
  }

  // If there are new URLs to add, append before </urlset>
  if (newBlocksToAdd.length > 0) {
    const combinedNewBlocks = newBlocksToAdd.join('\n') + '\n';
    if (xmlContent.includes('</urlset>')) {
      xmlContent = xmlContent.replace('</urlset>', `${combinedNewBlocks}</urlset>`);
    } else {
      xmlContent += `\n${combinedNewBlocks}</urlset>\n`;
    }
  }

  // Write changes safely back to file
  try {
    fs.writeFileSync(sitemapPath, xmlContent, 'utf8');

    // Also update dist/sitemap.xml if it exists (e.g. production build)
    const distPath = path.resolve(path.dirname(sitemapPath), '../dist/sitemap.xml');
    if (fs.existsSync(distPath)) {
      try {
        fs.writeFileSync(distPath, xmlContent, 'utf8');
      } catch (distErr) {
        // Non-critical, ignore
      }
    }
  } catch (err) {
    console.error('Failed to write sitemap.xml:', err);
    return { success: false, message: err.message };
  }

  const totalLocMatches = (xmlContent.match(/<loc>/g) || []).length;

  return {
    success: true,
    sitemapPath,
    totalIndexed: totalLocMatches,
    added,
    updated
  };
};

/**
 * Scan all models (Blogs, Projects, Products, Categories) from MongoDB & Site Data,
 * and ensure every valid slug is registered in sitemap.xml
 */
export const syncAllDatabaseToSitemap = async () => {
  try {
    const urlEntries = [];

    // 1. Static high-priority pages
    const staticPages = [
      { url: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly' },
      { url: `${BASE_URL}/why-us`, priority: '0.9', changefreq: 'monthly' },
      { url: `${BASE_URL}/contact`, priority: '0.9', changefreq: 'monthly' },
      { url: `${BASE_URL}/project`, priority: '0.9', changefreq: 'weekly' },
      { url: `${BASE_URL}/blog`, priority: '0.9', changefreq: 'weekly' },
      { url: `${BASE_URL}/resource/roi`, priority: '0.8', changefreq: 'monthly' },
      { url: `${BASE_URL}/resource/safety-standards`, priority: '0.8', changefreq: 'monthly' },
      { url: `${BASE_URL}/privacy-policy`, priority: '0.3', changefreq: 'yearly' },
      { url: `${BASE_URL}/terms-and-conditions`, priority: '0.3', changefreq: 'yearly' }
    ];
    urlEntries.push(...staticPages);

    // 2. Categories (Exact canonical category slugs)
    const categorySlugs = [
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
    for (const cat of categorySlugs) {
      urlEntries.push({
        url: `${BASE_URL}/product/${cat}`,
        priority: '0.9',
        changefreq: 'weekly'
      });
    }

    // 3. Blogs from MongoDB Blog collection
    try {
      const blogs = await Blog.find({ isPublished: { $ne: false } }).select('slug title updatedAt createdAt');
      for (const blog of blogs) {
        const slug = blog.slug || (blog.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) {
          const modDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString().split('T')[0] : getTodayDateString();
          urlEntries.push({
            url: `${BASE_URL}/blog/${slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: modDate
          });
        }
      }
    } catch (e) {
      console.warn('Could not query Blog collection for sitemap:', e.message);
    }

    // 4. Projects from MongoDB Project collection
    try {
      const projects = await Project.find({ isActive: { $ne: false } }).select('slug name updatedAt createdAt');
      for (const proj of projects) {
        const slug = proj.slug || (proj.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) {
          const modDate = proj.updatedAt ? new Date(proj.updatedAt).toISOString().split('T')[0] : getTodayDateString();
          urlEntries.push({
            url: `${BASE_URL}/project/${slug}`,
            priority: '0.8',
            changefreq: 'weekly',
            lastmod: modDate
          });
        }
      }
    } catch (e) {
      console.warn('Could not query Project collection for sitemap:', e.message);
    }

    // 5. Arcade Products
    try {
      const arcadeProds = await ArcadeProduct.find({}).select('slug name title updatedAt');
      for (const prod of arcadeProds) {
        const slug = prod.slug || (prod.title || prod.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) {
          urlEntries.push({
            url: `${BASE_URL}/product/${slug}`,
            priority: '0.8',
            changefreq: 'monthly'
          });
        }
      }
    } catch (e) {
      console.warn('Could not query ArcadeProduct collection for sitemap:', e.message);
    }

    // 6. VR Games
    try {
      const vrGames = await VrGame.find({}).select('slug name title updatedAt');
      for (const vr of vrGames) {
        const slug = vr.slug || (vr.title || vr.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (slug) {
          urlEntries.push({
            url: `${BASE_URL}/product/${slug}`,
            priority: '0.8',
            changefreq: 'monthly'
          });
        }
      }
    } catch (e) {
      console.warn('Could not query VrGame collection for sitemap:', e.message);
    }

    // 7. Check Content collection (arcadeCategories, vrCategories, blogPosts, projectItems)
    try {
      const contentSections = await Content.find({
        sectionKey: { $in: ['arcadeCategories', 'vrCategories', 'vrRange', 'blogPosts', 'projectItems'] }
      });

      for (const sec of contentSections) {
        const data = sec.data;
        if (!data) continue;

        if (sec.sectionKey === 'blogPosts') {
          const posts = Array.isArray(data) ? data : (data.posts && Array.isArray(data.posts) ? data.posts : []);
          for (const b of posts) {
            const slug = b.slug || (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            if (slug) {
              urlEntries.push({ url: `${BASE_URL}/blog/${slug}`, priority: '0.8', changefreq: 'weekly' });
            }
          }
        } else if (sec.sectionKey === 'projectItems') {
          const list = Array.isArray(data) ? data : [];
          for (const p of list) {
            const slug = p.slug || (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            if (slug) {
              urlEntries.push({ url: `${BASE_URL}/project/${slug}`, priority: '0.8', changefreq: 'weekly' });
            }
          }
        } else if (sec.sectionKey === 'arcadeCategories' || sec.sectionKey === 'vrCategories' || sec.sectionKey === 'vrRange') {
          const cards = data.cards && Array.isArray(data.cards) ? data.cards : (Array.isArray(data) ? data : []);
          for (const card of cards) {
            const slug = card.slug || (card.title || card.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            if (slug) {
              urlEntries.push({ url: `${BASE_URL}/product/${slug}`, priority: '0.8', changefreq: 'monthly' });
            }
          }
          if (data.categoriesList && Array.isArray(data.categoriesList)) {
            for (const cat of data.categoriesList) {
              if (cat && typeof cat === 'string') {
                const catSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                if (catSlug) {
                  urlEntries.push({ url: `${BASE_URL}/product/${catSlug}`, priority: '0.9', changefreq: 'weekly' });
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Could not query Content collection for sitemap:', e.message);
    }

    // Run batch sitemap update
    const result = await addMultipleUrlsToSitemap(urlEntries);
    return {
      success: true,
      message: `Sitemap synchronized successfully! Added ${result.added} new URLs, updated ${result.updated} URLs. Total indexed: ${result.totalIndexed}`,
      ...result
    };
  } catch (error) {
    console.error('Error during syncAllDatabaseToSitemap:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Returns raw XML content for direct HTTP serving (e.g. GET /sitemap.xml)
 */
export const getSitemapXmlContent = () => {
  const sitemapPath = getSitemapPath();
  if (fs.existsSync(sitemapPath)) {
    return fs.readFileSync(sitemapPath, 'utf8');
  }

  // Fallback minimal XML if file is not found
  const today = getTodayDateString();
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`;
};
