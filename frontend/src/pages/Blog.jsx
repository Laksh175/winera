import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import blogHeroBg from '../assets/blog-hero-bg.png';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

const DEFAULT_BLOG_POSTS = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  title: 'Soft Play vs Trampoline Park: Which',
  subtitle: 'Is Better for Your Space?',
  line1: 'Soft play or trampoline park? Discover',
  line2: 'the key differences in investment, space',
  line3: 'requirements, safety, and revenue.....',
  date: 'Aug 22, 2026',
  image: blogCardImg,
}));

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
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', 'Montserrat', sans-serif", overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER (MATCHING VR GAMES 1:1) */}
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
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '240px', height: '10px', margin: '0 auto 8px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              our <span style={{ color: '#38bdf8' }}>Blogs</span>
            </h2>
          </div>

          {/* 9 Cards Grid */}
          <div className="winera-blog-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {currentPosts.map((post, index) => (
              <div
                key={post.id || index}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="winera-blog-single-card"
                style={{
                  background: '#f0f9ff',
                  border: '1.5px solid #38bdf8',
                  borderRadius: '24px',
                  padding: '16px',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Card Top Image */}
                <div className="winera-blog-card-img-container" style={{ width: '100%', borderRadius: '18px', overflow: 'hidden', height: '240px', flexShrink: 0 }}>
                  <img
                    src={getValidImageUrl(post.image || post.imgUrl, blogCardImg)}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Card Text Body */}
                <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#0d1e38',
                    lineHeight: 1.35,
                    margin: '0 0 12px',
                  }}>
                    {post.title} {post.subtitle && <><span className="winera-desktop-br"><br /></span>{post.subtitle}</>}
                  </h3>

                  <p style={{
                    fontSize: '13.5px',
                    fontWeight: '400',
                    color: '#64748b',
                    lineHeight: 1.55,
                    margin: '0 0 16px',
                    flexGrow: 1,
                  }}>
                    {post.line1 || post.excerpt} <span className="winera-desktop-br"><br /></span>
                    {post.line2} <span className="winera-desktop-br"><br /></span>
                    {post.line3}
                  </p>

                  <div>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#64748b',
                      textDecoration: 'underline',
                    }}>
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
