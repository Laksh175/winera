import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CtaBanner from '../components/CtaBanner';
import blogHeroBg from '../assets/blog-hero-bg.webp';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import aboutusCtaBg from '../assets/aboutus-cta-bg.webp';

const DEFAULT_BLOG_POSTS = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  title: 'Soft Play vs Trampoline Park: Which',
  subtitle: 'Is Better for Your Space?',
  line1: 'Soft play or trampoline park? Discover',
  line2: 'the key differences in investment, space',
  line3: 'requirements, safety, and revenue.....',
  date: 'Aug 22, 2026',
  image: blogCardImg,
  category: 'Game Zone Setup & ROI',
  readTime: '4 min read',
  author: 'Winera Experts'
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

export default function BlogDetail({ siteData }) {
  const { id } = useParams();
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

  // Find post by ID or slug
  const post = blogPosts.find(p => String(p.id) === String(id) || String(p.slug) === String(id)) || blogPosts[0];
  const postImg = getValidImageUrl(post?.image || post?.imgUrl, blogCardImg);

  // Related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => String(p.id) !== String(post.id)).slice(0, 3);

  useEffect(() => {
    const fullTitle = `${post.title || ''} ${post.subtitle || ''}`.trim();
    document.title = `${fullTitle || 'Blog Detail'} | Winera International`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', 'Montserrat', sans-serif", overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. TOP HERO BANNER (Clean breadcrumb only, title removed from hero) */}
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
          {/* Breadcrumb: Home › Blog › Article */}
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: 0
          }}>
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <Link to="/blog" style={{ color: '#ffffff', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>Article</span>
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLE CONTAINER */}
      <section style={{ padding: '35px 4vw 60px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          
          {/* Title ABOVE the featured image */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{
              display: 'inline-block',
              background: '#e0f2fe',
              color: '#0284c7',
              fontSize: '13px',
              fontWeight: '800',
              padding: '6px 18px',
              borderRadius: '20px',
              marginBottom: '14px'
            }}>
              {post.category || 'Game Zone Setup & ROI'}
            </span>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.25,
              margin: '0 0 14px',
              letterSpacing: '-0.5px'
            }}>
              {post.title} {post.subtitle}
            </h1>

            <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '600' }}>
              📅 {post.date} &nbsp;•&nbsp; ⏱️ {post.readTime || '4 min read'} &nbsp;•&nbsp; By {post.author || 'Winera Team'}
            </div>
          </div>

          {/* Full Width & Height Featured Image */}
          <div style={{
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
            marginBottom: '35px',
            background: '#e0f2fe',
            border: '2px solid #38bdf8'
          }}>
            <img
              src={postImg}
              alt={post.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '520px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>

          {/* Main Article Body */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            lineHeight: 1.85,
            fontSize: '16.5px',
            color: '#334155'
          }}>
            <p style={{ marginBottom: '24px', fontSize: '17px', color: '#475569', fontWeight: '500', lineHeight: 1.8 }}>
              {post.content || post.description || 'Planning a new game zone or family entertainment center requires critical decisions regarding layout design, equipment mix, safety standards, and overall investment strategy. Understanding the distinct operational and financial characteristics of each attraction model is vital to maximizing your long-term return on investment (ROI).'}
            </p>

            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: '32px 0 16px' }}>
              {post.section1Title || '1. Space Requirements & Architectural Layout'}
            </h3>
            <p style={{ marginBottom: '20px' }}>
              {post.section1Text || 'Soft Play zones typically require a minimum ceiling height of 3.5 to 4.5 meters for multi-level tubular structures, whereas Trampoline Parks demand clear ceiling heights of 5.5 to 6.5 meters to accommodate high jumps, foam pits, and airbag stunt zones safely.'}
            </p>

            {/* Highlight Callout Box */}
            <div style={{
              background: '#f0f9ff',
              borderLeft: '5px solid #38bdf8',
              borderRadius: '14px',
              padding: '20px 24px',
              margin: '28px 0',
              color: '#0369a1',
              fontWeight: '600'
            }}>
              💡 <strong>Key Takeaway:</strong> {post.takeawayText || 'Soft play delivers higher throughput per square meter for toddlers and kids aged 2–8, while Trampoline Parks attract older kids, teens, and young adults with higher per-ticket pricing.'}
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: '32px 0 16px' }}>
              {post.section2Title || '2. Safety Standards & Commercial Durability'}
            </h3>
            <p style={{ marginBottom: '20px' }}>
              {post.section2Text || 'All commercial equipment supplied by Winera International meets rigorous global standards including EN 1176 / ASTM F1918 for Soft Play and ASTM F2970 for Trampoline Parks. Flame-retardant PVC padding, high-density impact foams, and non-toxic materials ensure long-lasting commercial durability.'}
            </p>

            <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: '32px 0 16px' }}>
              {post.section3Title || '3. Revenue Projection & Operating Costs'}
            </h3>
            <p style={{ marginBottom: '20px' }}>
              {post.section3Text || 'Integrating a balanced game zone mix — combining Soft Play, Trampoline Courts, Arcade Games, and VR simulators — creates a comprehensive family destination that drives repeat visits and higher average spend per customer.'}
            </p>
          </div>

          {/* Related Articles Section */}
          <div style={{ marginTop: '50px' }}>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '200px', height: '9px', margin: '0 auto 8px', objectFit: 'fill' }}
              />
              <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                Related <span style={{ color: '#38bdf8' }}>Articles</span>
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {relatedPosts.map((relPost, index) => (
                <div
                  key={relPost.id || index}
                  onClick={() => navigate(`/blog/${relPost.id}`)}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #38bdf8',
                    borderRadius: '20px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ width: '100%', height: '160px', borderRadius: '14px', overflow: 'hidden', marginBottom: '12px' }}>
                    <img
                      src={getValidImageUrl(relPost.image || relPost.imgUrl, blogCardImg)}
                      alt={relPost.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', lineHeight: 1.35, margin: '0 0 8px' }}>
                    {relPost.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>{relPost.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. CTA BANNER SECTION (Exact Copy from About Us page) */}
      <CtaBanner
        showOverlay={false}
        align="left"
        buttonTheme="yellow_white"
        gradientTagline={false}
        gradientTitle={true}
        bgUrl={siteData?.aboutCta?.bgUrl !== undefined ? siteData.aboutCta.bgUrl : null}
        bg={aboutusCtaBg}
        tagline={
          siteData?.aboutCta?.tagline !== undefined
            ? siteData.aboutCta.tagline
            : "READY TO GET STARTED?"
        }
        title={
          siteData?.aboutCta?.title !== undefined
            ? siteData.aboutCta.title
            : "TAKE THE NEXT STEP TOWARDS<br />YOUR PERFECT GAME ZONE"
        }
        subtitle=""
        description={
          siteData?.aboutCta?.description !== undefined
            ? siteData.aboutCta.description
            : "Whether you're starting from scratch or upgrading an existing space our team is ready to help you plan, build, and launch a game zone that drives real revenue."
        }
        buttonText={
          siteData?.aboutCta?.buttonText !== undefined
            ? siteData.aboutCta.buttonText
            : "Talk to an ROI Expert"
        }
        buttonLink={
          siteData?.aboutCta?.buttonLink !== undefined
            ? siteData.aboutCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* 5. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
