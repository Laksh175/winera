import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import ArcadeProduct from '../models/ArcadeProduct.js';
import VrGame from '../models/VrGame.js';
import Project from '../models/Project.js';
import Content from '../models/Content.js';
import { SEO_SCHEMAS } from '../data/seoSchemas.js';
import { defaultSiteData } from '../controllers/content.controller.js';

// Clean markdown (*bold*) and HTML tags (<br/>) from headings
function cleanHeading(raw) {
  if (!raw) return '';
  return String(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// In-memory cache for CMS sections (TTL: 10 seconds for real-time admin sync)
let cmsCache = new Map();
let lastCmsFetch = 0;

export async function getCmsSection(sectionKey) {
  const now = Date.now();
  if (cmsCache.has(sectionKey) && (now - lastCmsFetch < 10000)) {
    return cmsCache.get(sectionKey);
  }

  let data = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      const doc = await Content.findOne({ sectionKey }).maxTimeMS(2000).lean();
      if (doc && doc.data) {
        data = doc.data;
      }
    } catch (e) {
      console.warn(`[SeoHtml] Mongo query warning for ${sectionKey}:`, e.message);
    }
  }

  if (!data && defaultSiteData && defaultSiteData[sectionKey]) {
    data = defaultSiteData[sectionKey];
  }

  if (data) {
    cmsCache.set(sectionKey, data);
  }
  return data;
}

const CATEGORY_CMS_CONFIG = {
  'laser-tag': {
    seoKey: 'lasertagSeo',
    introKey: 'lasertagIntro',
    getHeading: (intro) => {
      if (intro?.titleHighlight || intro?.titleNormal) {
        return cleanHeading(`${intro.titleHighlight || ''} ${intro.titleNormal || ''}`);
      }
      return cleanHeading(intro?.title) || 'Laser Tag Gaming Equipment & Laser Spy Supplier in India';
    },
    defaultTitle: 'Laser Tag Equipment Supplier in India | Winera International',
    defaultDesc: 'Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training.'
  },
  'bumper-car': {
    seoKey: 'bumpercarSeo',
    fallbackSeoKey: 'bumperSeo',
    introKey: 'bumpercarIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Bumper Car Manufacturer in India',
    defaultTitle: 'Bumper Car Manufacturer in India | Electric & Battery Cars | Winera International',
    defaultDesc: 'As a leading Bumper Car Manufacturer in India, Winera International Pvt Ltd crafts exhilarating, safe, and durable bumper cars that are a favorite at amusement parks.'
  },
  'soft-play': {
    seoKey: 'softplaySeo',
    introKey: 'softplayIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Indoor Soft Play Equipment Manufacturer in India',
    defaultTitle: 'Top Soft Play Equipment Manufacturers in India | Winera International',
    defaultDesc: 'As a premier soft play manufacturer in India, Winera International creates custom indoor soft play equipment. We deliver personalized solutions designed to fit your specific space and budget.'
  },
  'trampoline-park': {
    seoKey: 'trampolineSeo',
    introKey: 'trampolineIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Trampoline Park Manufacturer in India',
    defaultTitle: 'Trampoline Park Manufacturer in India | Winera International',
    defaultDesc: 'Looking for a trampoline park manufacturer in India? Winera International designs and installs custom trampoline parks to your space, vision, and budget.'
  },
  'bowling-alley': {
    seoKey: 'bowlingSeo',
    introKey: 'bowlingIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Bowling Alley Manufacturers in India',
    defaultTitle: 'Bowling Alley Manufacturer in India | Winera International',
    defaultDesc: 'Looking for a bowling alley manufacturer in India? Winera International supplies premium new and refurbished Brunswick systems, with 15+ years of expertise.'
  },
  'arcade-games': {
    seoKey: 'arcadeSeo',
    introKey: 'arcadeHero',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Commercial Arcade Games Manufacturer & Supplier in India',
    defaultTitle: 'Arcade Games Manufacturer in India | Winera International',
    defaultDesc: 'Looking for arcade game machines in India? Winera International offers redemption games, kiddie rides, racing simulators, and more at direct factory prices.'
  },
  'vr-games': {
    seoKey: 'vrSeo',
    introKey: 'vrIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'VR Gaming Machine Supplier in India',
    defaultTitle: 'VR Gaming Machine Manufacturer in India | Winera International',
    defaultDesc: 'Winera International is a leading VR gaming machine manufacturer in India, offering immersive virtual reality attractions built for arcades and FEC centers.'
  },
  'amusement-park': {
    seoKey: 'amusementSeo',
    introKey: 'amusementIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Amusement Park Ride Manufacturer in India',
    defaultTitle: 'Amusement Park Manufacturer in India | Winera International',
    defaultDesc: 'Winera International is a premier amusement park manufacturer in India, delivering innovative, safe rides and equipment tailored to your game zone and venue space.'
  },
  'hypergrid': {
    seoKey: 'hypergridSeo',
    introKey: 'hypergridIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'Hypergrid Game Supplier in India',
    defaultTitle: 'Hypergrid Game Supplier in India | Winera International',
    defaultDesc: 'Winera International is a trusted Hypergrid game supplier in India, installing commercial interactive LED floor systems for malls, FECs, and trampoline parks.'
  },
  'ar-games': {
    seoKey: 'arSeo',
    introKey: 'arIntro',
    getHeading: (intro) => cleanHeading(intro?.title) || 'AR Games Supplier in India',
    defaultTitle: 'AR Games Supplier in India | Winera International',
    defaultDesc: 'Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions.'
  }
};

const STATIC_PAGE_CMS_MAP = {
  '/': {
    seoKey: 'homeSeo',
    heroKey: 'hero',
    getHeading: (hero) => {
      const rawTitle = hero?.title || "Game Zone Equipment *Manufacturer* & Supplier";
      return cleanHeading(rawTitle) || 'Game Zone Equipment Manufacturer & Supplier in India';
    },
    defaultTitle: 'Game Zone Equipment Manufacturer in India | Winera International',
    defaultDesc: 'Winera International is your trusted Game Zone Equipment Manufacturer and Indoor Play Equipment Manufacturer in India since 2014. Get Amazing deals!'
  },
  '/why-us': {
    seoKey: 'aboutSeo',
    heroKey: 'aboutHero',
    getHeading: (hero) => cleanHeading(hero?.title) || 'Why Choose Winera International',
    defaultTitle: 'The Right Choice for Your Business | Winera International',
    defaultDesc: 'Winera delivers more than promises trusted expertise, customer care, and quality solutions that set us apart. Discover why clients choose us.'
  },
  '/contact': {
    seoKey: 'contactSeo',
    heroKey: 'contactHero',
    getHeading: (hero) => cleanHeading(hero?.title) || 'Contact Winera International',
    defaultTitle: 'Contact Winera International | Game Zone Equipment Setup',
    defaultDesc: 'Get in touch with Winera International for game zone setup inquiries, equipment pricing, ROI consultations, and customer support across India.'
  },
  '/blog': {
    seoKey: 'blogSeo',
    heroKey: 'blogHero',
    getHeading: (hero) => cleanHeading(hero?.title) || 'Winera International Blogs',
    defaultTitle: 'Winera International Blog | Winera International',
    defaultDesc: 'Explore expert insights, trends, and ideas from Winera International to elevate your entertainment venue and create unforgettable guest experiences.'
  },
  '/project': {
    seoKey: 'projectSeo',
    heroKey: 'projectHero',
    getHeading: (hero) => cleanHeading(hero?.title) || 'Our Projects & Game Zone Installations',
    defaultTitle: 'Our Projects | Game Zones Built | Winera International',
    defaultDesc: "Explore Winera International's completed projects across India. Real play destinations we've designed, built, and installed for venues of every size and type."
  },
  '/resource/roi': {
    seoKey: 'roiSeo',
    heroKey: 'roiIntro',
    getHeading: (hero) => {
      if (hero?.titleLine1 || hero?.titleLine2) {
        return cleanHeading(`${hero.titleLine1 || ''} ${hero.titleLine2 || ''}`);
      }
      return 'Game Zone ROI Blueprint & Feasibility Calculator';
    },
    defaultTitle: 'Know Your Game Zone ROI Before You Invest | Winera International',
    defaultDesc: 'Opening a game zone is easy, making it profitable is a system. Winera International models your ROI around your space and budget before you invest a rupee.'
  },
  '/resource/safety-standards': {
    seoKey: 'safetySeo',
    heroKey: 'safetyIntro',
    getHeading: (hero) => {
      if (hero?.titleLine1 || hero?.titleLine2) {
        return cleanHeading(`${hero.titleLine1 || ''} ${hero.titleLine2 || ''}`);
      }
      return 'Where Game Zone Safety Comes First';
    },
    defaultTitle: 'Where Game Zone Safety Comes First | Winera International',
    defaultDesc: 'Safety comes first at Winera International. Every ride, play structure, and machine we install meets global safety standards, so your venue opens ready to run.'
  },
  '/privacy-policy': {
    seoKey: 'privacySeo',
    heroKey: null,
    getHeading: () => 'Winera International Privacy Policy for Game Zone Solutions',
    defaultTitle: 'Winera International Privacy Policy for Game Zone Solutions',
    defaultDesc: 'Learn how Winera International collects, uses, and protects the information you share when enquiring about our game zone equipment and setup services in India.'
  },
  '/terms-and-conditions': {
    seoKey: 'termsSeo',
    heroKey: null,
    getHeading: () => 'Terms of Service | Winera International',
    defaultTitle: 'Terms of Service | Winera International',
    defaultDesc: "Read Winera International's Terms of Service outlining your rights, responsibilities, and guidelines for using our game zone equipment and setup in India."
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || 'https://winera.in';
const DEFAULT_IMAGE = 'https://winera.in/winera-favicon.jpeg';
const DEFAULT_TITLE = "Winera International | India's Trusted Game Zone Equipment Manufacturer";
const DEFAULT_DESC = "Winera International Pvt Ltd is India's leading manufacturer and supplier of Bumper Cars, Soft Play, VR/AR Games, Arcade Machines, and Bowling Alleys.";

// Escape utility to prevent broken HTML attributes
function escapeAttr(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function cleanPlainText(text, maxLength = 160) {
  if (!text) return '';
  const cleaned = String(text)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + '...';
}

// Cached index.html template
let cachedIndexHtml = null;
let lastIndexReadTime = 0;

export function getBaseIndexHtml() {
  const now = Date.now();
  // Cache for 10 seconds in case dist/index.html is re-built
  if (cachedIndexHtml && (now - lastIndexReadTime) < 10000) {
    return cachedIndexHtml;
  }

  const candidatePaths = [
    path.resolve(__dirname, '../../../frontend/dist/index.html'),
    path.resolve(__dirname, '../../../frontend/public/index.html'),
    path.resolve(__dirname, '../../../frontend/index.html'),
    path.resolve(process.cwd(), '../frontend/dist/index.html'),
    path.resolve(process.cwd(), 'frontend/dist/index.html'),
    path.resolve(process.cwd(), 'dist/index.html'),
    path.resolve(process.cwd(), '../frontend/index.html'),
    path.resolve(process.cwd(), 'frontend/index.html')
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        cachedIndexHtml = fs.readFileSync(p, 'utf8');
        lastIndexReadTime = now;
        return cachedIndexHtml;
      } catch (e) {
        console.warn('[SeoHtml] Failed to read template at', p, e.message);
      }
    }
  }

  return null;
}

// Read fallback blogs JSON if database is slow or offline
let cachedBlogsJson = null;
function getBlogsFromJson() {
  if (cachedBlogsJson) return cachedBlogsJson;
  const candidatePaths = [
    path.resolve(__dirname, '../data/blogsData.json'),
    path.resolve(process.cwd(), 'backend/src/data/blogsData.json'),
    path.resolve(process.cwd(), 'src/data/blogsData.json')
  ];
  for (const jsonPath of candidatePaths) {
    if (fs.existsSync(jsonPath)) {
      try {
        cachedBlogsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        return cachedBlogsJson;
      } catch (e) {
        console.warn('[SeoHtml] Could not parse blogsData.json', e.message);
      }
    }
  }
  return [];
}

/**
 * Metadata resolver for Blog posts
 */
export async function getBlogSeoData(slug) {
  const normalizedSlug = (slug || '').toLowerCase().trim();
  let blog = null;

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      blog = await Blog.findOne({ slug: normalizedSlug }).maxTimeMS(2000).lean();
    } catch (e) {
      console.warn('[SeoHtml] Blog.findOne warning:', e.message);
    }
  }

  if (!blog) {
    const list = getBlogsFromJson();
    blog = list.find(b => (b.slug || '').toLowerCase() === normalizedSlug);
  }

  if (!blog) return null;

  // Title formatting
  let title = blog.metaTitle && blog.metaTitle.trim();
  if (!title) {
    const full = `${blog.title || ''} ${blog.subtitle || ''}`.trim();
    title = full ? `${full} | Winera International` : DEFAULT_TITLE;
  }

  // Description formatting
  let desc = blog.metaDescription && blog.metaDescription.trim();
  if (!desc) {
    desc = cleanPlainText(blog.excerpt || blog.description || blog.fullContent, 160);
  }
  if (!desc) {
    desc = DEFAULT_DESC;
  }

  // Image formatting
  let image = blog.imageUrl || blog.image || DEFAULT_IMAGE;
  if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
    image = `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;

  // Pre-rendered clean crawler content for Googlebot and non-JS crawlers
  const bodyHtml = `
    <article style="max-width:900px;margin:0 auto;padding:20px;">
      <h1>${escapeAttr(blog.title)} ${escapeAttr(blog.subtitle || '')}</h1>
      <p><strong>Published:</strong> ${escapeAttr(blog.date || '2024')}</p>
      <p><strong>Author:</strong> ${escapeAttr(blog.author || 'Divyang Mandani')}</p>
      <div>${blog.fullContent || blog.content || `<p>${escapeAttr(desc)}</p>`}</div>
      <p><a href="/blog">&larr; Back to all blogs</a></p>
    </article>
  `;

  // Route Schema check (from SEO_SCHEMAS) or fallback to dynamic BlogPosting Schema
  const blogRoute = `/blog/${normalizedSlug}`;
  let schema = SEO_SCHEMAS[blogRoute] || null;

  if (!schema) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': blog.title || title,
      'description': desc,
      'image': [image],
      'datePublished': blog.createdAt || blog.date || '2024-01-01',
      'dateModified': blog.updatedAt || blog.createdAt || '2024-01-01',
      'author': {
        '@type': 'Person',
        'name': blog.author || 'Divyang Mandani'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Winera International Pvt. Ltd.',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/dqjnjhybdtibqy4soznu.png'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };
  }

  return {
    title,
    description: desc,
    image,
    canonicalUrl,
    ogType: 'article',
    schema,
    bodyHtml
  };
}

/**
 * Metadata resolver for Products (Arcade, VR, Categories)
 */
export async function getProductSeoData(slug) {
  const normalizedSlug = (slug || '').toLowerCase().trim();

  // Category page lookup from dynamic CMS
  if (CATEGORY_CMS_CONFIG[normalizedSlug]) {
    const cfg = CATEGORY_CMS_CONFIG[normalizedSlug];
    const seo = (await getCmsSection(cfg.seoKey)) || (cfg.fallbackSeoKey ? await getCmsSection(cfg.fallbackSeoKey) : null) || {};
    const intro = (await getCmsSection(cfg.introKey)) || {};

    const title = seo.pageTitle && seo.pageTitle.trim() ? seo.pageTitle.trim() : cfg.defaultTitle;
    const desc = seo.metaDescription && seo.metaDescription.trim() ? seo.metaDescription.trim() : cfg.defaultDesc;
    const h1 = cfg.getHeading(intro, seo);

    let bodyHtml = null;

    if (normalizedSlug === 'arcade-games') {
      try {
        const arcadeData = JSON.parse(fs.readFileSync(new URL('../data/allArcadeProducts.json', import.meta.url), 'utf-8'));
        const cards = (arcadeData && arcadeData.cards) || [];
        const links = cards
          .filter(c => {
            const s = (c.slug || c.title || c.name || '').toLowerCase();
            return s && !/^to(-\d+)?$/i.test(s) && !/invoice-wi/i.test(s) && s !== 'example';
          })
          .map(c => `<li><a href="/product/${c.slug || c.title || c.name}">${escapeAttr(c.name || c.title)}</a></li>`)
          .join('\n');
        bodyHtml = `
          <main style="max-width:1200px;margin:0 auto;padding:24px;">
            <h1>${escapeAttr(h1)}</h1>
            <p>${escapeAttr(desc)}</p>
            <ul>
              ${links}
            </ul>
          </main>
        `;
      } catch (e) {
        console.warn('Error pre-rendering arcade games:', e.message);
      }
    } else if (normalizedSlug === 'vr-games') {
      try {
        const vrData = JSON.parse(fs.readFileSync(new URL('../data/allVrGames.json', import.meta.url), 'utf-8'));
        const cards = (vrData && vrData.cards) || [];
        const links = cards
          .filter(c => {
            const s = (c.slug || c.title || c.name || '').toLowerCase();
            return s && !/^to(-\d+)?$/i.test(s) && !/invoice-wi/i.test(s) && s !== 'example';
          })
          .map(c => `<li><a href="/product/${c.slug || c.title || c.name}">${escapeAttr(c.name || c.title)}</a></li>`)
          .join('\n');
        bodyHtml = `
          <main style="max-width:1200px;margin:0 auto;padding:24px;">
            <h1>${escapeAttr(h1)}</h1>
            <p>${escapeAttr(desc)}</p>
            <ul>
              ${links}
            </ul>
          </main>
        `;
      } catch (e) {
        console.warn('Error pre-rendering VR games:', e.message);
      }
    }

    if (!bodyHtml) {
      bodyHtml = `
        <main style="max-width:1200px;margin:0 auto;padding:24px;">
          <h1>${escapeAttr(h1)}</h1>
          <p>${escapeAttr(desc)}</p>
          <nav aria-label="breadcrumb">
            <a href="/">Home</a> / <span>${escapeAttr(h1)}</span>
          </nav>
        </main>
      `;
    }

    const catRoute = `/product/${normalizedSlug}`;
    const schema = SEO_SCHEMAS[catRoute] || null;

    return {
      title,
      description: desc,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}/product/${normalizedSlug}`,
      ogType: 'website',
      schema,
      bodyHtml
    };
  }

  // Individual Product lookup
  let product = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      product = await ArcadeProduct.findOne({ slug: normalizedSlug }).maxTimeMS(2000).lean();
      if (!product) {
        product = await VrGame.findOne({ slug: normalizedSlug }).maxTimeMS(2000).lean();
      }
    } catch (e) {
      console.warn('[SeoHtml] Product query warning:', e.message);
    }
  }

  if (!product) {
    const readable = normalizedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const canonicalUrl = `${BASE_URL}/product/${normalizedSlug}`;
    const fallbackSchema = SEO_SCHEMAS[`/product/${normalizedSlug}`] || {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': readable,
      'description': `Commercial game zone equipment: ${readable}. Turnkey manufacturing, setup, and supply across 50+ cities in India by Winera International.`,
      'image': [DEFAULT_IMAGE],
      'brand': {
        '@type': 'Brand',
        'name': 'Winera International'
      }
    };

    const fallbackBodyHtml = `
      <main style="max-width:1200px;margin:0 auto;padding:24px;">
        <h1>${escapeAttr(readable)}</h1>
        <p>Commercial game zone equipment: ${escapeAttr(readable)}. Turnkey manufacturing, setup, and supply across 50+ cities in India by Winera International.</p>
        <p><a href="/product/arcade-games">&larr; Back to all products</a></p>
      </main>
    `;

    return {
      title: `${readable} | Commercial Game Zone Equipment | Winera International`,
      description: `Commercial game zone equipment: ${readable}. Turnkey manufacturing, setup, and supply across 50+ cities in India by Winera International.`,
      image: DEFAULT_IMAGE,
      canonicalUrl,
      ogType: 'product',
      schema: fallbackSchema,
      bodyHtml: fallbackBodyHtml
    };
  }

  let title = product.metaTitle && product.metaTitle.trim();
  if (!title) {
    title = `${product.name || product.title || 'Game Zone Equipment'} | Winera International`;
  }

  let desc = product.metaDescription && product.metaDescription.trim();
  if (!desc) {
    desc = cleanPlainText(product.desc || product.description, 160);
  }
  if (!desc) {
    desc = `Commercial ${product.category || 'Arcade'} equipment manufactured and supplied by Winera International across 50+ cities in India.`;
  }

  let image = product.imageUrl || product.img || DEFAULT_IMAGE;
  if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
    image = `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  const canonicalUrl = `${BASE_URL}/product/${product.slug || normalizedSlug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name || product.title,
    'description': desc,
    'image': [image],
    'brand': {
      '@type': 'Brand',
      'name': 'Winera International'
    }
  };

  const bodyHtml = `
    <article style="max-width:1200px;margin:0 auto;padding:24px;">
      <h1>${escapeAttr(title)}</h1>
      <p><strong>Category:</strong> ${escapeAttr(product.category || 'Commercial Arcade & VR Equipment')}</p>
      <p>${escapeAttr(desc)}</p>
      ${image ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(title)}" style="max-width:100%;height:auto;" />` : ''}
      <p><a href="/product/arcade-games">&larr; Back to all products</a></p>
    </article>
  `;

  return {
    title,
    description: desc,
    image,
    canonicalUrl,
    ogType: 'product',
    schema,
    bodyHtml
  };
}

/**
 * Metadata resolver for Projects
 */
export async function getProjectSeoData(slug) {
  const normalizedSlug = (slug || '').toLowerCase().trim();
  let project = null;

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      project = await Project.findOne({ slug: normalizedSlug }).maxTimeMS(2000).lean();
    } catch (e) {
      console.warn('[SeoHtml] Project query warning:', e.message);
    }
  }

  if (!project) {
    const readable = normalizedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const projectRoute = `/project/${normalizedSlug}`;
    const schema = SEO_SCHEMAS[projectRoute] || null;
    const fallbackProjectBody = `
      <main style="max-width:1200px;margin:0 auto;padding:24px;">
        <h1>${escapeAttr(readable)} | Game Zone Project</h1>
        <p>Explore ${escapeAttr(readable)} game zone setup and installation project by Winera International across India.</p>
        <p><a href="/project">&larr; Back to all projects</a></p>
      </main>
    `;
    return {
      title: `${readable} | Game Zone Project Setup | Winera International`,
      description: `Explore ${readable} game zone setup and installation project by Winera International across India.`,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}/project/${normalizedSlug}`,
      ogType: 'website',
      schema,
      bodyHtml: fallbackProjectBody
    };
  }

  let title = project.metaTitle && project.metaTitle.trim();
  if (!title) {
    title = `${project.name || project.titleLine1 || 'Game Zone Project'} | Winera International`;
  }

  let desc = project.metaDescription && project.metaDescription.trim();
  if (!desc) {
    desc = cleanPlainText(project.description || `${project.name} turnkey game zone installation in ${project.city || 'India'} by Winera International.`, 160);
  }

  let image = project.img || project.clientImg || DEFAULT_IMAGE;
  if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
    image = `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  const canonicalUrl = `${BASE_URL}/project/${project.slug || normalizedSlug}`;
  const projectRoute = `/project/${project.slug || normalizedSlug}`;
  const schema = SEO_SCHEMAS[projectRoute] || SEO_SCHEMAS[`/project/${normalizedSlug}`] || null;
  const projectBodyHtml = `
    <article style="max-width:1200px;margin:0 auto;padding:24px;">
      <h1>${escapeAttr(title)}</h1>
      <p><strong>Location:</strong> ${escapeAttr(project.city || 'India')}</p>
      <p>${escapeAttr(desc)}</p>
      <p><a href="/project">&larr; Back to all projects</a></p>
    </article>
  `;

  return {
    title,
    description: desc,
    image,
    canonicalUrl,
    ogType: 'website',
    schema,
    bodyHtml: projectBodyHtml
  };
}

/**
 * Metadata resolver for Static Pages
 */
export async function getStaticPageSeoData(rawPath) {
  const p = (rawPath || '/').toLowerCase().replace(/\/+$/, '') || '/';

  if (STATIC_PAGE_CMS_MAP[p]) {
    const cfg = STATIC_PAGE_CMS_MAP[p];
    const seo = (await getCmsSection(cfg.seoKey)) || {};
    const hero = cfg.heroKey ? ((await getCmsSection(cfg.heroKey)) || {}) : {};

    const title = seo.pageTitle && seo.pageTitle.trim() ? seo.pageTitle.trim() : cfg.defaultTitle;
    const desc = seo.metaDescription && seo.metaDescription.trim() ? seo.metaDescription.trim() : cfg.defaultDesc;
    const h1 = cfg.getHeading(hero, seo);

    let bodyHtml = null;

    if (p === '/blog') {
      const blogs = getBlogsFromJson();
      const blogLinks = blogs.map(b => `
        <article style="margin-bottom:24px;">
          <h2><a href="/blog/${b.slug}">${escapeAttr(b.title)} ${escapeAttr(b.subtitle || '')}</a></h2>
          <p>${escapeAttr(b.excerpt || '')}</p>
        </article>
      `).join('');

      bodyHtml = `
        <main style="max-width:1200px;margin:0 auto;padding:24px;">
          <h1>${escapeAttr(h1)}</h1>
          <p>${escapeAttr(desc)}</p>
          <section>
            ${blogLinks}
          </section>
        </main>
      `;
    } else if (p === '/') {
      bodyHtml = `
        <header style="padding:24px;">
          <h1>${escapeAttr(h1)}</h1>
          <p>${escapeAttr(desc)}</p>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/why-us">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/blog">Blogs & Insights</a></li>
              <li><a href="/project">Projects</a></li>
              <li><a href="/resource/roi">ROI Blueprint</a></li>
              <li><a href="/resource/safety-standards">Safety Standards</a></li>
              <li><a href="/product/arcade-games">Arcade Games</a></li>
              <li><a href="/product/vr-games">VR Games</a></li>
              <li><a href="/product/soft-play">Soft Play</a></li>
              <li><a href="/product/trampoline-park">Trampoline Park</a></li>
              <li><a href="/product/bowling-alley">Bowling Alley</a></li>
              <li><a href="/product/bumper-car">Bumper Cars</a></li>
              <li><a href="/product/amusement-park">Amusement Park Rides</a></li>
              <li><a href="/product/hypergrid">Hypergrid</a></li>
              <li><a href="/product/laser-tag">Laser Tag</a></li>
              <li><a href="/product/ar-games">AR Games</a></li>
            </ul>
          </nav>
        </header>
      `;
    } else {
      bodyHtml = `
        <main style="max-width:1200px;margin:0 auto;padding:24px;">
          <h1>${escapeAttr(h1)}</h1>
          <p>${escapeAttr(desc)}</p>
          <nav aria-label="breadcrumb">
            <a href="/">Home</a> / <span>${escapeAttr(h1)}</span>
          </nav>
        </main>
      `;
    }

    const pRoute = p === '/' ? '/' : p;
    const schema = SEO_SCHEMAS[pRoute] || null;

    return {
      title,
      description: desc,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}${p === '/' ? '/' : p}`,
      ogType: 'website',
      schema,
      bodyHtml
    };
  }

  const pRoute = p === '/' ? '/' : p;
  const schema = SEO_SCHEMAS[pRoute] || null;

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    image: DEFAULT_IMAGE,
    canonicalUrl: `${BASE_URL}${p === '/' ? '/' : p}`,
    ogType: 'website',
    schema
  };
}

/**
 * Injects SEO tags into index.html
 */
export function injectSeoTags(baseHtml, meta) {
  if (!baseHtml || !meta) return baseHtml;

  const {
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    canonicalUrl = BASE_URL,
    ogType = 'website',
    schema = null
  } = meta;

  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeImage = escapeAttr(image);
  const safeCanonical = escapeAttr(canonicalUrl);

  let html = baseHtml;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // 2. Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );

  // 3. Replace Canonical
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*\/?>/i,
    `<link rel="canonical" href="${safeCanonical}" />`
  );

  // 4. OpenGraph Tags
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*\/?>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*\/?>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*\/?>/i,
    `<meta property="og:url" content="${safeCanonical}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:image["'][^>]*\/?>/i,
    `<meta property="og:image" content="${safeImage}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:secure_url["'][^>]*\/?>/i,
    `<meta property="og:image:secure_url" content="${safeImage}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:type["'][^>]*\/?>/i,
    `<meta property="og:type" content="${ogType}" />`
  );

  // 5. Twitter Tags
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*\/?>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*\/?>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image["'][^>]*\/?>/i,
    `<meta name="twitter:image" content="${safeImage}" />`
  );

  // If blog or featured image exists, use summary_large_image for social previews
  if (ogType === 'article' || (image && image !== DEFAULT_IMAGE)) {
    html = html.replace(
      /<meta\s+name=["']twitter:card["'][^>]*\/?>/i,
      `<meta name="twitter:card" content="summary_large_image" />`
    );
  }

  // 6. Schema Injection
  // Always replace the static winera-dynamic-ld-json script in baseHtml so that
  // inner pages never accidentally carry the Homepage schema / Homepage FAQs!
  const dynamicScriptRegex = /<script\s+id=["']winera-dynamic-ld-json["'][^>]*>[\s\S]*?<\/script>/i;

  if (schema) {
    const schemaJson = JSON.stringify(schema, null, 2);
    const schemaTag = `<script id="winera-dynamic-ld-json" type="application/ld+json">\n${schemaJson}\n  </script>`;

    if (dynamicScriptRegex.test(html)) {
      html = html.replace(dynamicScriptRegex, schemaTag);
    } else {
      html = html.replace(/<\/head>/i, `  ${schemaTag}\n</head>`);
    }
  } else {
    // If this inner page has no schema, strip the homepage schema script tag
    // to prevent Google or Schema.org from seeing wrong homepage FAQs on this URL.
    if (dynamicScriptRegex.test(html) && canonicalUrl !== BASE_URL && canonicalUrl !== `${BASE_URL}/`) {
      html = html.replace(dynamicScriptRegex, '');
    }
  }

  // 7. Inject Crawler-friendly HTML into <div id="root"> for non-JS crawlers & Screaming Frog
  // If a specific bodyHtml is provided, use it; otherwise generate a clean fallback so
  // no inner page ever accidentally inherits the Homepage <h1> from index.html!
  const effectiveBodyHtml = meta.bodyHtml || `
    <main style="max-width:1200px;margin:0 auto;padding:24px;">
      <h1>${safeTitle}</h1>
      <p>${safeDesc}</p>
    </main>
  `;

  html = html.replace(
    /<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>/i,
    `<div id="root">\n${effectiveBodyHtml}\n</div>`
  );

  return html;
}
