import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import ArcadeProduct from '../models/ArcadeProduct.js';
import VrGame from '../models/VrGame.js';
import Project from '../models/Project.js';
import Content from '../models/Content.js';

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

  // Article / BlogPosting Schema
  const schema = {
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

  // Category page lookup
  const categoryMap = {
    'arcade-games': {
      title: 'Commercial Arcade Games Manufacturer & Supplier in India | Winera International',
      desc: 'Buy top-earning commercial arcade games in India. Claw machines, racing simulators, ticket redemption, basketball games, and shooting games with pan-India setup.'
    },
    'vr-games': {
      title: 'Commercial VR Games & Virtual Reality 360 Rides | Winera International',
      desc: 'High-ROI commercial VR gaming simulators, 360 VR roller coasters, VR shooting arenas, and motion simulators for malls and entertainment centers in India.'
    },
    'soft-play': {
      title: 'Soft Play Equipment Manufacturer in India | Indoor Playground | Winera',
      desc: 'Turnkey indoor soft play equipment manufacturer in India. Custom multi-level play structures, toddler zones, ball pits, and slides for malls, cafes, and schools.'
    },
    'trampoline-park': {
      title: 'Commercial Trampoline Park Manufacturer & Setup in India | Winera',
      desc: 'India’s leading trampoline park builder. High-grade foam pits, slam dunk courts, ninja warrior courses, and airbag zones built with international safety standards.'
    },
    'bowling-alley': {
      title: 'Commercial Bowling Alley Setup & Equipment Supplier in India | Winera',
      desc: 'Full-length regulation bowling alleys and duckpin bowling lanes setup in India. Turnkey installation, electronic scoring, and pinsetter machinery for venues.'
    },
    'bumper-car': {
      title: 'Commercial Bumper Cars Manufacturer in India | Winera International',
      desc: 'Battery-powered and ceiling-grid commercial bumper cars for amusement parks and game zones. Durable fiberglass bodies, interactive LED lighting, and safety bumpers.'
    },
    'amusement-park': {
      title: 'Indoor Amusement Park Rides & Attractions Manufacturer | Winera',
      desc: 'Custom-designed indoor amusement park rides and attractions across India. Trackless trains, mini drop towers, carousel rides, and family entertainment setups.'
    },
    'hypergrid': {
      title: 'Interactive Hypergrid Active LED Gaming Arena | Winera International',
      desc: 'The viral interactive LED floor puzzle arena in India. Fast-paced active motion gaming grids for family entertainment centers, trampoline parks, and sports arenas.'
    },
    'laser-tag': {
      title: 'Turnkey Laser Tag Arena Setup & Equipment in India | Winera',
      desc: 'Commercial laser tag equipment, phasers, vests, interactive bases, and themed glow-in-the-dark arena design and construction across India.'
    },
    'ar-games': {
      title: 'Augmented Reality (AR) Games & Interactive Projections | Winera',
      desc: 'Cutting-edge interactive AR sandboxes, wall climbing projections, and interactive floor systems for indoor play zones and interactive museums.'
    }
  };

  if (categoryMap[normalizedSlug]) {
    return {
      title: categoryMap[normalizedSlug].title,
      description: categoryMap[normalizedSlug].desc,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}/product/${normalizedSlug}`,
      ogType: 'website'
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
    return {
      title: `${readable} | Commercial Game Zone Equipment | Winera International`,
      description: `Commercial game zone equipment: ${readable}. Turnkey manufacturing, setup, and supply across 50+ cities in India by Winera International.`,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}/product/${normalizedSlug}`,
      ogType: 'product'
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
    },
    'offers': {
      '@type': 'Offer',
      'url': canonicalUrl,
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock'
    }
  };

  return {
    title,
    description: desc,
    image,
    canonicalUrl,
    ogType: 'product',
    schema
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
    return {
      title: `${readable} | Game Zone Project Setup | Winera International`,
      description: `Explore ${readable} game zone setup and installation project by Winera International across India.`,
      image: DEFAULT_IMAGE,
      canonicalUrl: `${BASE_URL}/project/${normalizedSlug}`,
      ogType: 'website'
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

  return {
    title,
    description: desc,
    image,
    canonicalUrl,
    ogType: 'website'
  };
}

/**
 * Metadata resolver for Static Pages
 */
export function getStaticPageSeoData(rawPath) {
  const p = (rawPath || '/').toLowerCase().replace(/\/+$/, '') || '/';

  const staticPages = {
    '/': {
      title: DEFAULT_TITLE,
      desc: DEFAULT_DESC,
      image: DEFAULT_IMAGE
    },
    '/why-us': {
      title: "Why Choose Winera | India's Trusted Game Zone Equipment Manufacturer",
      desc: "Learn why malls, FECs, and resorts trust Winera International for commercial game zone equipment, free ROI analysis, and 50+ city turnkey installations.",
      image: DEFAULT_IMAGE
    },
    '/contact': {
      title: "Contact Us | Winera International - Commercial Game Zone Inquiries",
      desc: "Get in touch with Winera International for game zone setup inquiries, equipment pricing, ROI consultations, and customer support across India.",
      image: DEFAULT_IMAGE
    },
    '/blog': {
      title: "Game Zone & Amusement Park Industry Blogs | Winera International",
      desc: "Read expert guides, ROI formulas, setup costs, and industry tips on establishing profitable indoor game zones, trampoline parks, and arcade setups in India.",
      image: DEFAULT_IMAGE
    },
    '/project': {
      title: "Game Zone Projects & Portfolio Across India | Winera International",
      desc: "Explore our portfolio of successful arcade, trampoline park, bowling alley, and soft play installations completed across 50+ cities in India.",
      image: DEFAULT_IMAGE
    },
    '/resource/roi': {
      title: "Game Zone ROI Blueprint & Feasibility Calculator | Winera International",
      desc: "Calculate your game zone setup cost, footfall projections, monthly operating expenses, and break-even timeline with our free ROI Blueprint.",
      image: DEFAULT_IMAGE
    },
    '/resource/safety-standards': {
      title: "Safety Standards & Quality Certifications | Winera International",
      desc: "Discover how Winera International adheres to European EN-1176, ASTM, and global safety standards for commercial indoor playgrounds and arcade rides.",
      image: DEFAULT_IMAGE
    },
    '/privacy-policy': {
      title: "Privacy Policy | Winera International",
      desc: "Read our privacy policy regarding how Winera International collects, protects, and manages user information.",
      image: DEFAULT_IMAGE
    },
    '/terms-and-conditions': {
      title: "Terms & Conditions | Winera International",
      desc: "Review the terms and conditions governing the purchase, supply, and installation of Winera International game zone equipment.",
      image: DEFAULT_IMAGE
    }
  };

  if (staticPages[p]) {
    let bodyHtml = null;

    // Pre-render all 33 blog links on /blog for non-JS crawlers & Screaming Frog
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
          <h1>Game Zone & Amusement Park Industry Blogs | Winera International</h1>
          <p>Read expert guides, ROI formulas, setup costs, and industry tips on establishing profitable indoor game zones in India.</p>
          <section>
            ${blogLinks}
          </section>
        </main>
      `;
    } else if (p === '/') {
      bodyHtml = `
        <header style="padding:24px;">
          <h1>Winera International - Commercial Game Zone Equipment Manufacturer</h1>
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
    }

    return {
      title: staticPages[p].title,
      description: staticPages[p].desc,
      image: staticPages[p].image,
      canonicalUrl: `${BASE_URL}${p === '/' ? '/' : p}`,
      ogType: 'website',
      bodyHtml
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    image: DEFAULT_IMAGE,
    canonicalUrl: `${BASE_URL}${p === '/' ? '/' : p}`,
    ogType: 'website'
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
  if (schema) {
    const schemaJson = JSON.stringify(schema, null, 2);
    const schemaTag = `\n  <script type="application/ld+json">\n${schemaJson}\n  </script>\n`;
    html = html.replace(/<\/head>/i, `${schemaTag}</head>`);
  }

  // 7. Inject Crawler-friendly HTML into <div id="root"> for non-JS crawlers & Screaming Frog
  if (meta.bodyHtml) {
    html = html.replace(
      /<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>/i,
      `<div id="root">\n${meta.bodyHtml}\n</div>`
    );
  }

  return html;
}
