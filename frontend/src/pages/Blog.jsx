import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import projectPageMobileBanner from '../assets/project-page-mobile-banner.png';
const blogHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const gameZoneMobileBanner = projectPageMobileBanner;
const blogCardImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/ltwinrzpqitg4s8znfel.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
import WineraImage from '../components/WineraImage';
import { ChevronDown, Calendar, PenTool } from 'lucide-react';
import { fetchBlogs } from '../services/api';

const getValidImageUrl = (url, fallback) => {
  if (url && typeof url === 'string' && (url.includes('eqjkboeokagpaus2ifxa') || url.includes('/src/assets/'))) {
    return fallback || blogCardImg;
  }
  if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:'))) {
    return url;
  }
  if (url && typeof url === 'string' && (url.startsWith('/uploads/') || url.startsWith('uploads/'))) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (isLocal) {
      return `http://localhost:5001${cleanUrl}`;
    }
    const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '') : '';
    if (apiUrl) return `${apiUrl}${cleanUrl}`;
    return typeof window !== 'undefined' ? `${window.location.origin}${cleanUrl}` : cleanUrl;
  }
  if (url && typeof url === 'string' && !url.includes('/src/assets/') && (url.startsWith('/assets/') || url.startsWith('/@fs/'))) {
    return url;
  }
  if (url && typeof url === 'object' && url.src) {
    return url.src;
  }
  return fallback || blogCardImg;
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
  const [isPhone, setIsPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [dynamicBlogPosts, setDynamicBlogPosts] = useState(() => {
    try {
      const cached = sessionStorage.getItem('winera_dynamic_blogs');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  const prefetchBlogDetail = (p) => {
    if (!p) return;
    const rawUrl = p.image || p.imageUrl || p.imgUrl;
    if (rawUrl && typeof rawUrl === 'string') {
      const fullUrl = getValidImageUrl(rawUrl, blogCardImg);
      const preloader = new Image();
      preloader.src = fullUrl.includes('cloudinary.com')
        ? fullUrl.replace(/\/image\/upload\/[^/]*/, '/image/upload/f_auto,q_auto,w_1400')
        : fullUrl;
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchBlogs({ limit: 'all' })
      .then(res => {
        if (isMounted && res?.success && Array.isArray(res.blogs || res.posts)) {
          setDynamicBlogPosts(res.blogs || res.posts);
        }
      })
      .catch(err => console.warn('Dynamic blogs fetch notice:', err));
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const blogHero = siteData?.blogHero || {
    breadcrumbText: 'Blog',
    bgUrl: blogHeroBg,
    bgAlt: "Winera International Game Zone & Entertainment Industry Blog",
    mobileBgUrl: gameZoneMobileBanner,
    mobileBgAlt: "Winera International Game Zone & Entertainment Industry Blog Mobile Banner"
  };
  const heroBg = (blogHero?.bgUrl && (blogHero.bgUrl.startsWith('http') || blogHero.bgUrl.startsWith('uploads') || blogHero.bgUrl.startsWith('/uploads')))
    ? getValidImageUrl(blogHero.bgUrl, blogHeroBg)
    : blogHeroBg;
  const mobileHeroBg = getValidImageUrl(blogHero?.mobileBgUrl, gameZoneMobileBanner);

  const isDummyPosts = Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0 && (
    siteData.blogPosts[0]?.title === 'Blog 1' ||
    siteData.blogPosts[0]?.image === '/src/assets/blog-images.png'
  );

  const sitePosts = (Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0 && !isDummyPosts)
    ? siteData.blogPosts
    : [];

  const rawPosts = (() => {
    if (dynamicBlogPosts.length === 0) return sitePosts;
    const merged = dynamicBlogPosts.map(dp => {
      const match = sitePosts.find(sp => (sp.slug && dp.slug && sp.slug === dp.slug) || (sp.id && dp.id && String(sp.id) === String(dp.id)));
      return match ? { ...dp, ...match, author: match.author || dp.author } : dp;
    });
    sitePosts.forEach(sp => {
      const exists = merged.some(m => (m.slug && sp.slug && m.slug === sp.slug) || (m.id && sp.id && String(m.id) === String(sp.id)));
      if (!exists) merged.push(sp);
    });
    return merged;
  })();

  const blogPosts = rawPosts.map((post) => {
    return {
      ...post,
      image: getValidImageUrl(post.image || post.imageUrl || post.imgUrl, blogCardImg)
    };
  });

  const blogSeo = siteData?.blogSeo || {
    pageTitle: 'Blog | Winera International – Game Zone Insights & Tips',
    metaDescription: 'Read the Winera International blog for expert insights on game zone setup, ROI tips, soft play trends, VR gaming, trampoline parks, and indoor amusement equipment.',
  };

  const INITIAL_POSTS_LIMIT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_POSTS_LIMIT);
  const visiblePosts = blogPosts.slice(0, visibleCount);
  const hasMore = visibleCount < blogPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
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
        minHeight: 'auto',
        aspectRatio: isPhone ? '941 / 550' : 'auto',
        paddingTop: isPhone ? '55px' : '175px',
        paddingBottom: isPhone ? '0px' : '95px',
        background: isPhone ? `url(${mobileHeroBg}) center top / 100% 100% no-repeat` : `url(${heroBg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <img
          src={isPhone ? mobileHeroBg : heroBg}
          alt={isPhone ? (blogHero?.mobileBgAlt || blogHero?.bgAlt || "Winera International Game Zone & Entertainment Industry Blog") : (blogHero?.bgAlt || "Winera International Game Zone & Entertainment Industry Blog")}
          style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className="winera-blog-hero-h1" style={{
            fontSize: isPhone ? '1.15rem' : '21px',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: isPhone ? '6px' : '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
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
            className="winera-blog-heading-container"
            style={{ textAlign: 'center', marginBottom: '30px' }}
          >
            <img
              src={yellowStrokeLine}
              alt=""
              className="winera-blog-heading-stroke"
              style={{
                display: 'block',
                width: isPhone ? '180px' : '200px',
                maxWidth: '75%',
                height: '10px',
                margin: '0 auto 8px',
                objectFit: 'fill'
              }}
            />
            <h2 className="winera-blog-heading-title" style={{ fontSize: isPhone ? '28px' : '35px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
              our <span style={{ color: '#00a8ff' }}>Blogs</span>
            </h2>
          </motion.div>

          {/* 9 Cards Grid */}
          <div className="winera-blog-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {visiblePosts.map((post, index) => {
              const isLeft = index % 3 === 0;
              const isRight = index % 3 === 2;
              const startX = isLeft ? -70 : (isRight ? 70 : 0);
              const startY = isLeft || isRight ? 0 : 50;
              const postExcerpt = post.excerpt || post.description || (post.line1 ? `${post.line1} ${post.line2 || ''}` : 'Soft play or trampoline park? Discover the key differences...');
              const truncatedExcerpt = formatExcerpt(postExcerpt, 80);
              const postSlug = post.slug || post.id;

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
                  style={{ display: 'flex', height: '100%' }}
                >
                  <Link
                    to={`/blog/${postSlug}`}
                    state={{ post }}
                    className="winera-blog-single-card"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '24px',
                      padding: '18px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 14px 35px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.borderColor = '#38bdf8';
                      prefetchBlogDetail(post);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {/* Card Top Image */}
                    <div className="winera-blog-card-img-container" style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', height: '210px', flexShrink: 0, marginBottom: '16px', background: '#e0f2fe' }}>
                      <WineraImage
                        src={getValidImageUrl(post.image || post.imgUrl, blogCardImg, post.id, index)}
                        alt={post.imageAlt || getFullTitle(post)}
                        targetWidth={600}
                        style={{ width: '100%', height: '100%' }}
                        imgStyle={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>

                    {/* Blog Title & Subtitle */}
                    <h3 className="winera-blog-card-title" style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#0f172a',
                      lineHeight: 1.35,
                      margin: '0 0 10px 0',
                      textAlign: 'left'
                    }}>
                      {getFullTitle(post)}
                    </h3>

                    {/* Excerpt Description */}
                    <p className="winera-blog-card-desc" style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#64748b',
                      lineHeight: 1.6,
                      margin: '0 0 20px 0',
                      flexGrow: 1,
                      textAlign: 'left'
                    }}>
                      {truncatedExcerpt}
                    </p>

                    {/* Card Footer: Date & Founder Name */}
                    <div className="winera-blog-card-footer" style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#64748b',
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <Calendar style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                        {post.date || 'SEP 12, 2026'}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#0284c7',
                        fontWeight: '700',
                        fontSize: '13px',
                        letterSpacing: '0.2px'
                      }}>
                        <PenTool style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                        {post.author || post.founder || 'Divyang Mandani'}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── LOAD MORE BUTTON ───────────────────────────────────── */}
          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm" style={{ display: 'inline-block' }}>
                <button
                  onClick={handleLoadMore}
                  className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  <span>Load More Blogs</span>
                  <ChevronDown style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <Footer footerData={footer} />

      {/* Responsive Breakpoints */}
      <style>{`
        /* Shining Light Sweep Effect on Card Hover */
        .winera-blog-card-img-container {
          position: relative !important;
          overflow: hidden !important;
        }

        .winera-blog-card-img-container::before {
          content: "" !important;
          position: absolute !important;
          top: 0 !important;
          left: -150% !important;
          width: 80% !important;
          height: 100% !important;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.25) 30%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.25) 70%,
            rgba(255, 255, 255, 0) 100%
          ) !important;
          transform: skewX(-25deg) !important;
          pointer-events: none !important;
          z-index: 10 !important;
          transition: none !important;
        }

        .winera-blog-single-card:hover .winera-blog-card-img-container::before {
          left: 180% !important;
          transition: left 1.4s cubic-bezier(0.2, 0.8, 0.25, 1) !important;
        }

        .winera-blog-card-img-container img {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .winera-blog-single-card:hover .winera-blog-card-img-container img {
          transform: scale(1.06) !important;
        }

        .winera-blog-single-card,
        .winera-blog-single-card *,
        .winera-blog-card-title,
        .winera-blog-card-desc,
        .winera-blog-single-card h3,
        .winera-blog-single-card p {
          text-align: left !important;
        }
        .winera-blog-card-footer {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        }
        @media (max-width: 992px) {
          .winera-blog-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .winera-blog-heading-container {
            text-align: left !important;
            align-items: flex-start !important;
          }
          .winera-blog-heading-stroke {
            margin: 0 0 8px 0 !important;
          }
          .winera-blog-heading-title {
            text-align: left !important;
          }
          .winera-blog-single-card,
          .winera-blog-single-card *,
          .winera-blog-card-title,
          .winera-blog-card-desc,
          .winera-blog-single-card h3,
          .winera-blog-single-card p {
            text-align: left !important;
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
          .winera-blog-single-card,
          .winera-blog-single-card *,
          .winera-blog-card-title,
          .winera-blog-card-desc,
          .winera-blog-single-card h3,
          .winera-blog-single-card p {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}
