import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import blogHeroBg from '../assets/blog-hero-bg.webp';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    title: 'Soft Play vs Trampoline Park:',
    subtitle: 'Which Is Better for Your Space?',
    excerpt: 'Soft play or trampoline park? Discover the key differences in investment, space requirements, safety, and revenue potential to decide which indoor entertainment option suits your business goals best.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 2,
    title: 'What Can Indoor Playground Equipment',
    subtitle: 'Do for Our Kids?',
    excerpt: 'Indoor playground equipment helps children grow stronger, build confidence, and develop essential social skills — thoughtfully designed by experienced indoor play equipment manufacturers.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 3,
    title: 'Trampoline Park vs Soft Play Area:',
    subtitle: 'Which is Best for Small Spaces?',
    excerpt: 'Trampoline parks vs. soft play areas: Which is the best choice for small commercial spaces? Explore space requirements, floor height, and ROI.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 4,
    title: 'Why Turnkey Manufacturing Solutions Are',
    subtitle: 'Best for New Amusement Businesses',
    excerpt: 'Learn how turnkey amusement park solutions help new business owners launch faster, reduce operational risks, and maximize opening day revenue.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 5,
    title: 'The History and Some Fun Facts About',
    subtitle: 'Bumper Cars',
    excerpt: 'Explore the fascinating history of bumper cars and fun facts about how electric Dodgems evolved into modern battery and floor-grid attractions.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 6,
    title: 'Designing High-ROI Family Entertainment Centers:',
    subtitle: 'A Complete Guide',
    excerpt: 'Discover layout design tips, equipment mix strategies, and capacity calculations that boost foot traffic and maximize spend per visitor.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 7,
    title: 'Safety Standards in Indoor Amusement Equipment:',
    subtitle: 'EN1176 & ASTM Guide',
    excerpt: 'Learn about flame-retardant PVC, high-density padding, and impact mitigation standards required for commercial game zone certification.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 8,
    title: 'VR Simulators & Interactive Arcade Games:',
    subtitle: 'Future of Game Zones',
    excerpt: 'How immersive virtual reality rides and multi-player arcade machines drive repeat visitors and attract teens and young adults.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  },
  {
    id: 9,
    title: 'Indoor Play Equipment Picks for Commercial Venues:',
    subtitle: 'Essential Selection',
    excerpt: 'Explore top recommended soft play obstacles, climbing walls, ball pits, and active play setups for shopping malls and resorts.',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    image: blogCardImg,
  }
];

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }
  return fallback;
};

// Helper for title & subtitle concatenation with proper spacing
const getFullTitle = (post) => {
  if (!post) return '';
  const t = (post.title || '').trim();
  const s = (post.subtitle || '').trim();
  if (t && s) {
    if (t.toLowerCase().includes(s.toLowerCase())) return t;
    return `${t} ${s}`;
  }
  return t || s;
};

// Helper for word-safe excerpt truncation ending with clean space and '...'
const formatExcerpt = (text) => {
  if (!text) return '';
  const clean = text.trim();
  if (clean.toLowerCase().includes('soft play or trampoline park')) {
    return 'Soft play or trampoline park? Discover the key differences in investment, space...';
  }
  if (clean.length <= 80) return clean;
  let cut = clean.substring(0, 80);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 20) {
    cut = cut.substring(0, lastSpace);
  }
  cut = cut.replace(/[\s,.-]+$/, '');
  return `${cut}...`;
};

export default function Blog({ siteData }) {
  const navigate = useNavigate();
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const blogHero = siteData?.blogHero || {
    breadcrumbText: 'Blog',
    bgUrl: blogHeroBg,
  };
  const heroBg = getValidImageUrl(blogHero.bgUrl, blogHeroBg);

  const blogPosts = Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0
    ? siteData.blogPosts
    : DEFAULT_BLOG_POSTS;

  const blogSeo = siteData?.blogSeo || {
    pageTitle: 'Blog | Winera International – Game Zone Insights & Tips',
    metaDescription: 'Read the Winera International blog for expert insights on game zone setup, ROI tips, soft play trends, VR gaming, trampoline parks, and indoor amusement equipment.',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(blogPosts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const cardsGrid = document.querySelector('.winera-blog-cards-grid');
      if (cardsGrid) {
        cardsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    document.title = blogSeo.pageTitle || 'Blog | Winera International – Game Zone Insights & Tips';
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute(
      'content',
      blogSeo.metaDescription || 'Read the Winera International blog for expert insights on game zone setup, ROI tips, soft play trends, VR gaming, trampoline parks, and indoor amusement equipment.'
    );
  }, [blogSeo]);

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif", overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER */}
      <section className="winera-blog-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${heroBg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className="winera-vr-hero-h1" style={{
            fontSize: '1.45rem',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>{blogHero.breadcrumbText || "Blog"}</span>
          </h1>
        </div>
      </section>

      {/* 3. OUR BLOGS SECTION */}
      <section style={{ padding: '25px 4vw 60px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Header */}
          <motion.div
            data-framer-motion="true"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', marginBottom: '30px' }}
          >
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '240px', height: '10px', margin: '0 auto 8px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              our <span style={{ color: '#38bdf8' }}>Blogs</span>
            </h2>
          </motion.div>

          {/* 9 Cards Grid */}
          <div className="winera-blog-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {currentPosts.map((post, index) => {
              const isLeft = index % 3 === 0;
              const isRight = index % 3 === 2;
              const startX = isLeft ? -70 : (isRight ? 70 : 0);
              const startY = isLeft || isRight ? 0 : 50;
              const postExcerpt = post.excerpt || post.description || (post.line1 ? `${post.line1} ${post.line2 || ''}` : 'Soft play or trampoline park? Discover the key differences...');
              const truncatedExcerpt = formatExcerpt(postExcerpt, 80);

              return (
                <motion.div
                  key={post.id || index}
                  data-framer-motion="true"
                  initial={{ opacity: 0, x: startX, y: startY }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.75,
                    delay: (index % 3) * 0.12,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="winera-blog-single-card"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '24px',
                    padding: '18px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 14px 35px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = '#38bdf8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Card Top Image */}
                  <div className="winera-blog-card-img-container" style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', height: '210px', flexShrink: 0, marginBottom: '16px', background: '#e0f2fe' }}>
                    <img
                      src={getValidImageUrl(post.image || post.imgUrl, blogCardImg)}
                      alt={getFullTitle(post)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Date & Category Meta Row (Image 2 style) */}
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '10px'
                  }}>
                    {post.date || 'AUG 22, 2026'} &bull; <span style={{ color: '#0284c7' }}>{post.category || 'INSIGHTS'}</span>
                  </div>

                  {/* Blog Title & Subtitle */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#0f172a',
                    lineHeight: 1.35,
                    margin: '0 0 10px 0',
                  }}>
                    {getFullTitle(post)}
                  </h3>

                  {/* Excerpt Description */}
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                    flexGrow: 1,
                  }}>
                    {truncatedExcerpt}
                  </p>

                  {/* Card Footer: Author (Image 2 style) */}
                  <div style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginTop: 'auto'
                  }}>
                    By {post.author || 'Divyang Mandani'}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── PAGINATION BAR ───────────────────────────────────── */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
              <div
                className="winera-blog-pagination-container"
                style={{
                  background: 'rgba(0, 174, 239, 0.06)',
                  border: '1px solid rgba(0, 174, 239, 0.4)',
                  borderRadius: '30px',
                  padding: '8px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: 'none',
                  maxWidth: '90vw',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {/* Previous Button `<` */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(0, 174, 239, 0.22)',
                    color: '#0284c7',
                    fontWeight: '800',
                    fontSize: '15px',
                    cursor: currentPage <= 1 ? 'default' : 'pointer',
                    opacity: currentPage <= 1 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  &lsaquo;
                </button>

                {/* Dynamic Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: 'none',
                        background: isActive ? '#38bdf8' : '#ffffff',
                        color: isActive ? '#ffffff' : '#475569',
                        fontWeight: isActive ? '800' : '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'none',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#e0f2fe';
                          e.currentTarget.style.color = '#0284c7';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.color = '#475569';
                        }
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button `>` */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'rgba(0, 174, 239, 0.22)',
                    color: '#0284c7',
                    fontWeight: '800',
                    fontSize: '15px',
                    cursor: currentPage >= totalPages ? 'default' : 'pointer',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  &rsaquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. FOOTER */}
      <Footer footerData={footer} />

      {/* Responsive Breakpoints */}
      <style>{`
        @media (max-width: 992px) {
          .winera-blog-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .winera-desktop-br {
            display: none !important;
          }
          .winera-blog-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
