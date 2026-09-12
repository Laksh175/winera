import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import blogHeroBg from '../assets/blog-hero-bg.webp';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blogData';

const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/')) {
    return url;
  }
  if (url.startsWith('uploads/')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001/${url}`;
  }
  return url || fallback;
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

// Helper to extract SHORT headings for Table of Contents
const extractHeadings = (text) => {
  if (!text) return [];
  const paragraphs = text.split('\n\n');
  const headings = [];
  paragraphs.forEach((pText) => {
    const trimmed = pText.trim();
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const firstLine = trimmed.replace(/^#+\s*/, '').split('\n')[0].trim();
      const cleanTitle = firstLine.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      headings.push({
        id: `blog-heading-${headings.length}`,
        title: cleanTitle.length > 45 ? `${cleanTitle.substring(0, 45)}...` : cleanTitle,
      });
    } else {
      const numMatch = trimmed.match(/^(\d+\.\s+[^.\n:]+)/);
      if (numMatch) {
        const titleText = numMatch[1].trim();
        headings.push({
          id: `blog-heading-${headings.length}`,
          title: titleText.length > 45 ? `${titleText.substring(0, 45)}...` : titleText,
        });
      }
    }
  });
  return headings;
};

const renderTextWithLinks = (textStr) => {
  if (!textStr) return null;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(textStr)) !== null) {
    if (match.index > lastIndex) {
      parts.push(textStr.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];

    // Omit any winera.in or external link tags, render as clean plain text
    if (linkUrl.includes('winera.in') || linkUrl.startsWith('http')) {
      parts.push(linkText);
    } else {
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}
        >
          {linkText}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < textStr.length) {
    parts.push(textStr.substring(lastIndex));
  }
  return parts.length > 0 ? parts : textStr;
};

const renderFormattedText = (text) => {
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  let headingCounter = 0;
  const elements = [];

  paragraphs.forEach((pText, idx) => {
    const trimmed = pText.trim();
    if (!trimmed) return;

    // Headings starting with ### or ## (FONT SIZE 22px, FONT WEIGHT 700)
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const lines = trimmed.split('\n');
      const headingText = lines[0].replace(/^#+\s*/, '');
      const bodyLines = lines.slice(1).join('\n').trim();
      const headingId = `blog-heading-${headingCounter}`;
      headingCounter++;

      elements.push(
        <h3
          key={`h-${idx}`}
          id={headingId}
          style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#0f172a',
            margin: '36px 0 14px',
            lineHeight: 1.35,
            scrollMarginTop: '110px'
          }}
        >
          {renderTextWithLinks(headingText)}
        </h3>
      );

      if (bodyLines) {
        elements.push(
          <p key={`h-body-${idx}`} style={{
            fontSize: '17px',
            color: '#334155',
            lineHeight: 1.85,
            fontWeight: '400',
            marginBottom: '22px'
          }}>
            {renderTextWithLinks(bodyLines)}
          </p>
        );
      }
      return;
    }

    // Numbered sections like "1. Target Audience" (FONT SIZE 22px, FONT WEIGHT 700)
    const numHeadingMatch = trimmed.match(/^(\d+\.\s+[^.\n:]+[:.]?)([\s\S]*)$/);
    if (numHeadingMatch && (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.') || trimmed.startsWith('4.'))) {
      const titlePart = numHeadingMatch[1].trim();
      const bodyPart = numHeadingMatch[2].trim();
      const headingId = `blog-heading-${headingCounter}`;
      headingCounter++;

      elements.push(
        <div key={`num-${idx}`} id={headingId} style={{ marginBottom: '24px', scrollMarginTop: '110px' }}>
          <h4 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#0f172a',
            margin: '28px 0 10px 0',
            lineHeight: 1.35
          }}>
            {titlePart}
          </h4>
          {bodyPart && (
            <p style={{
              fontSize: '17px',
              color: '#334155',
              lineHeight: 1.85,
              fontWeight: '400',
              margin: 0
            }}>
              {renderTextWithLinks(bodyPart)}
            </p>
          )}
        </div>
      );
      return;
    }

    // Regular Paragraph (FONT SIZE 17px, FONT WEIGHT 400)
    elements.push(
      <p key={`p-${idx}`} style={{
        fontSize: '17px',
        color: '#334155',
        lineHeight: 1.85,
        fontWeight: '400',
        marginBottom: '22px'
      }}>
        {renderTextWithLinks(trimmed)}
      </p>
    );
  });

  return elements;
};

export default function BlogDetail({ siteData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const blogHero = siteData?.blogHero || {
    breadcrumbText: 'Blog',
    bgUrl: blogHeroBg,
  };
  const heroBg = (blogHero?.bgUrl && (blogHero.bgUrl.startsWith('http') || blogHero.bgUrl.startsWith('uploads') || blogHero.bgUrl.startsWith('/uploads')))
    ? getValidImageUrl(blogHero.bgUrl, blogHeroBg)
    : blogHeroBg;

  const blogPosts = (Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length >= 12 && siteData.blogPosts[0]?.fullContent?.length > 300 && siteData.blogPosts[1]?.title !== siteData.blogPosts[0]?.title)
    ? siteData.blogPosts
    : DEFAULT_BLOG_POSTS;

  // Find post by ID or slug with fallback
  const defaultMatch = DEFAULT_BLOG_POSTS.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
  const post = blogPosts.find(p => String(p.id) === String(id) || String(p.slug) === String(id)) || defaultMatch || blogPosts[0];
  const postImg = getValidImageUrl(post?.image || post?.imgUrl, blogCardImg);

  // Recent/Related posts: Pick the NEXT 3 consecutive blogs after current blog (e.g. blog 5 -> blogs 6, 7, 8)
  const currentIndex = blogPosts.findIndex(p => String(p.id) === String(post?.id) || String(p.slug) === String(post?.slug));
  const validIndex = currentIndex >= 0 ? currentIndex : 0;
  const recentPosts = [1, 2, 3].map(offset => {
    const nextIdx = (validIndex + offset) % blogPosts.length;
    return blogPosts[nextIdx];
  });

  useEffect(() => {
    const fullTitle = `${post.title || ''} ${post.subtitle || ''}`.trim();
    document.title = `${fullTitle || 'Blog Detail'} | Winera International`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post]);

  // Always use rich full content so ALL blog detail pages show complete detailed article content
  const rawArticleContent = (post.fullContent && post.fullContent.length > 400)
    ? post.fullContent
    : DEFAULT_BLOG_POSTS[0].fullContent;

  const headings = extractHeadings(rawArticleContent);

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif", overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. TOP HERO BANNER */}
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

      {/* 3. 3-COLUMN MAIN ARTICLE SECTION */}
      <section style={{ padding: '45px 3vw 70px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          
          <div className="winera-blog-3col-grid" style={{
            display: 'grid',
            gridTemplateColumns: '260px minmax(0, 1fr) 310px',
            gap: '35px',
            alignItems: 'start'
          }}>

            {/* ── LEFT COLUMN: STICKY TABLE OF CONTENTS MENU (FONT SIZE 15px) ── */}
            <div className="winera-blog-left-toc-sticky" style={{
              position: 'sticky',
              top: '110px',
              alignSelf: 'start'
            }}>
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '20px',
                padding: '18px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: '#0f172a',
                  marginBottom: '12px',
                  paddingBottom: '8px',
                  borderBottom: '1.5px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: '#0284c7' }}>📌</span> In this article
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        const el = document.getElementById(h.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      title={h.title}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '15px',
                        color: '#334155',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: '6px 8px',
                        borderRadius: '8px',
                        transition: 'all 0.15s ease',
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e0f2fe';
                        e.currentTarget.style.color = '#0284c7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#334155';
                      }}
                    >
                      <span style={{ color: '#0284c7', fontWeight: '800', flexShrink: 0 }}>•</span>
                      <span style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word'
                      }}>
                        {h.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── MIDDLE COLUMN: TITLE, META, FEATURED IMAGE & ARTICLE CONTENT ── */}
            <div style={{ width: '100%' }}>
              
              {/* Category Tag */}
              <div style={{ marginBottom: '12px' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#0284c7',
                  background: 'rgba(224, 242, 254, 0.8)',
                  border: '1px solid #93c5fd',
                  borderRadius: '20px',
                  padding: '4px 14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px'
                }}>
                  {post.category || 'INSIGHTS'}
                </span>
              </div>

              {/* Main Article Title & Subtitle */}
              <h1 style={{
                fontSize: '42px',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: 1.25,
                margin: '0 0 16px',
                letterSpacing: '-0.5px'
              }}>
                {getFullTitle(post)}
              </h1>

              {/* Article Meta Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '13px',
                color: '#64748b',
                fontWeight: '600',
                marginBottom: '26px',
                paddingBottom: '16px',
                borderBottom: '1.5px solid #cbd5e1'
              }}>
                <span>📅 {post.date || 'FEB 19, 2026'}</span>
                <span>•</span>
                <span>⏱️ {post.readTime || '5 min read'}</span>
              </div>

              {/* Featured Image Centered in Middle Column */}
              <div style={{
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                marginBottom: '35px',
                background: '#e0f2fe'
              }}>
                <img
                  src={postImg}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '440px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Formatted Article Text Stream */}
              <div style={{ marginBottom: '40px' }}>
                {renderFormattedText(rawArticleContent)}
              </div>

            </div>

            {/* ── RIGHT COLUMN: STICKY REGISTER FORM POSTER CARD ─────────────── */}
            <div className="winera-blog-right-sidebar-sticky" style={{
              position: 'sticky',
              top: '110px',
              alignSelf: 'start'
            }}>
              <div style={{
                background: 'linear-gradient(150deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '24px',
                padding: '28px 22px',
                color: '#ffffff',
                boxShadow: '0 20px 45px rgba(15, 23, 42, 0.25)',
                border: '1.5px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '900',
                    color: '#ffcd00',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    WINERA INTERNATIONAL
                  </div>
                  
                  <h4 style={{
                    fontSize: '1.25rem',
                    fontWeight: '900',
                    lineHeight: 1.3,
                    margin: '0 0 10px',
                    color: '#ffffff'
                  }}>
                    Plan Your Perfect Game Zone
                  </h4>
                  
                  <p style={{
                    fontSize: '13px',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    margin: '0 0 20px'
                  }}>
                    One-stop turnkey solution for 15+ indoor play equipment & custom 3D layout setup.
                  </p>

                  {/* Feature highlights */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginBottom: '22px',
                    fontSize: '13px',
                    color: '#e2e8f0',
                    fontWeight: '600'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>✓</div>
                      <span>Custom 3D Layout Planning</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>✓</div>
                      <span>Factory Direct Manufacturing</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>✓</div>
                      <span>Certified Global Safety Standards</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>✓</div>
                      <span>Maximized ROI & Profitability</span>
                    </div>
                  </div>
                </div>

                {/* Register Action Button */}
                <button
                  onClick={() => setIsLeadModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(90deg, #ffcd00 0%, #f59e0b 100%)',
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                    transition: 'all 0.2s ease',
                    marginTop: 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.55)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  Register Now &rarr;
                </button>
              </div>

              {/* ── MORE TO EXPLORE (VERTICAL SIDEBAR CARDS) ── */}
              <div style={{ margin: '13% 25px 22px' }}>
                <h4 style={{
                  fontSize: '30px',
                  fontWeight: '900',
                  color: '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.3px',
                }}>
                  More to <span style={{ color: '#38bdf8' }}>Explore</span>
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {recentPosts.slice(0, 3).map((recPost) => {
                    const recImage = getValidImageUrl(recPost.image || recPost.imgUrl, blogCardImg);
                    const recExcerpt = recPost.excerpt || recPost.line1 || 'Soft play or trampoline park? Discover the key differences in investment...';
                    const truncatedExcerpt = formatExcerpt(recExcerpt, 75);

                    return (
                      <div
                        key={recPost.id}
                        onClick={() => navigate(`/blog/${recPost.id}`)}
                        style={{
                          background: '#ffffff',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '20px',
                          padding: '16px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.25s ease',
                          boxShadow: '0 4px 18px rgba(0,0,0,0.04)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#38bdf8';
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.04)';
                        }}
                      >
                        {/* Card Top Image */}
                        <div style={{ width: '100%', height: '165px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, marginBottom: '12px', background: '#e0f2fe' }}>
                          <img
                            src={recImage}
                            alt={getFullTitle(recPost)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        {/* Category Tag Meta Row */}
                        <div style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          color: '#0284c7',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '8px'
                        }}>
                          {recPost.category || 'INSIGHTS'}
                        </div>

                        {/* Blog Title & Subtitle */}
                        <h5 style={{
                          fontSize: '15px',
                          fontWeight: '800',
                          color: '#0f172a',
                          lineHeight: 1.35,
                          margin: '0 0 8px 0'
                        }}>
                          {getFullTitle(recPost)}
                        </h5>

                        {/* Excerpt Description */}
                        <p style={{
                          fontSize: '13px',
                          color: '#64748b',
                          lineHeight: 1.5,
                          margin: '0 0 14px 0',
                          flexGrow: 1
                        }}>
                          {truncatedExcerpt}
                        </p>

                        {/* Card Footer: Date & Read More Link */}
                        <div style={{
                          paddingTop: '12px',
                          borderTop: '1px solid #f1f5f9',
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#64748b',
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {recPost.date || 'SEP 12, 2026'}
                          </span>
                          <span style={{
                            color: '#0284c7',
                            fontWeight: '700',
                            fontSize: '12px',
                            textDecoration: 'underline',
                            letterSpacing: '0.2px'
                          }}>
                            Read More...
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <Footer footerData={footer} />

      {/* LEAD CAPTURE MODAL */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        pageSource={`Blog Article › ${post.title}`}
      />

      {/* CSS Responsive Styles */}
      <style>{`
        @media (max-width: 1080px) {
          .winera-blog-3col-grid {
            grid-template-columns: 1fr 300px !important;
            gap: 25px !important;
          }
          .winera-blog-left-toc-sticky {
            display: none !important;
          }
          .winera-related-articles-full-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .winera-blog-3col-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .winera-blog-right-sidebar-sticky {
            position: static !important;
          }
          .winera-related-articles-full-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

