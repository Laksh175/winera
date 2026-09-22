import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import blogHeroBg from '../assets/blog-hero-bg.webp';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import WineraImage from '../components/WineraImage';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blogData';

const getValidImageUrl = (url, fallback, postId = null, postIdx = null) => {
  if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:'))) {
    return url;
  }
  if (url && typeof url === 'string' && (url.startsWith('/uploads/') || url.startsWith('uploads/'))) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${cleanUrl}`;
  }
  if (url && typeof url === 'string' && !url.includes('/src/assets/') && (url.startsWith('/assets/') || url.startsWith('/@fs/'))) {
    return url;
  }
  if (url && typeof url === 'object' && url.src) {
    return url.src;
  }
  if (postId !== null && postId !== undefined) {
    const match = DEFAULT_BLOG_POSTS.find(p => String(p.id) === String(postId) || (p.slug && p.slug === String(postId)));
    if (match?.image) return match.image;
  }
  if (typeof postIdx === 'number' && DEFAULT_BLOG_POSTS[postIdx]?.image) {
    return DEFAULT_BLOG_POSTS[postIdx].image;
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

// Helper to extract SHORT headings for Table of Contents
const extractHeadings = (text) => {
  if (!text) return [];
  const paragraphs = text.split('\n\n');
  const headings = [];
  paragraphs.forEach((pText) => {
    const trimmed = pText.trim();
    if (!trimmed || /^#+\s*$/.test(trimmed)) return;

    if (trimmed.startsWith('#')) {
      const firstLine = trimmed.replace(/^#+\s*/, '').split('\n')[0].trim();
      const cleanTitle = firstLine.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      if (cleanTitle) {
        headings.push({
          id: `blog-heading-${headings.length}`,
          title: cleanTitle.length > 45 ? `${cleanTitle.substring(0, 45)}...` : cleanTitle,
        });
      }
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

export const sanitizeAndFormatHtml = (input) => {
  if (!input || typeof input !== 'string') return '';
  let html = input;

  // 1. Remove editor cursor artifacts
  html = html.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');

  // 2. Convert markdown to HTML tags if markdown syntax exists
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // 3. Ensure links have proper color, font-weight and security attributes
  html = html.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>/gi, (match, href, rest) => {
    const isWineraOrRelative = href.startsWith('/') || href.startsWith('#');
    const targetAttr = isWineraOrRelative ? '' : ' target="_blank" rel="noopener noreferrer"';
    return `<a href="${href}" style="color: #0284c7; font-weight: 700; text-decoration: underline;"${targetAttr}>`;
  });

  return html;
};

const normalizeRawContent = (raw) => {
  if (!raw) return '';
  let str = raw;
  // Strip ql-cursor or unwanted meta spans
  str = str.replace(/<span class="ql-cursor">.*?<\/span>/gi, '');
  // Convert lists
  str = str.replace(/<ul>([\s\S]*?)<\/ul>/gi, (match, listContent) => {
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, '- $1\n').trim() + '\n\n';
  });
  str = str.replace(/<ol>([\s\S]*?)<\/ol>/gi, (match, listContent) => {
    let idx = 1;
    return '\n' + listContent.replace(/<li>(.*?)<\/li>/gi, () => `${idx++}. $1\n`).trim() + '\n\n';
  });
  // Replace <p>...</p> blocks with double newlines
  str = str.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '\n\n');
  // Replace <br\s*/?> with single newline
  str = str.replace(/<br\s*\/?>/gi, '\n');
  // Clean multiple newlines
  str = str.replace(/\n{3,}/g, '\n\n');
  return str.trim();
};

const renderFormattedText = (text) => {
  if (!text) return null;
  const normalized = normalizeRawContent(text);
  const paragraphs = normalized.split('\n\n');
  let headingCounter = 0;
  const elements = [];

  paragraphs.forEach((pText, idx) => {
    const trimmed = pText.trim();
    if (!trimmed || /^#+\s*$/.test(trimmed)) return;

    // Headings starting with ### or ## (FONT SIZE 22px, FONT WEIGHT 600)
    if (trimmed.startsWith('#')) {
      const lines = trimmed.split('\n');
      const headingText = lines[0].replace(/^#+\s*/, '').trim();
      const bodyLines = lines.slice(1).join('\n').trim();

      if (headingText) {
        const headingId = `blog-heading-${headingCounter}`;
        headingCounter++;

        elements.push(
          <h3
            key={`h-${idx}`}
            id={headingId}
            style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#0f172a',
              margin: '36px 0 14px',
              lineHeight: 1.35,
              scrollMarginTop: '110px',
              textAlign: 'left'
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(headingText) }}
          />
        );
      }

      if (bodyLines) {
        elements.push(
          <p
            key={`h-body-${idx}`}
            style={{
              fontSize: '17px',
              color: '#334155',
              lineHeight: 1.85,
              fontWeight: '400',
              marginBottom: '22px',
              textAlign: 'left'
            }}
            dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(bodyLines.replace(/\n/g, '<br>')) }}
          />
        );
      }
      return;
    }

    // Numbered headings like "1. Something" or "Step 1: Something"
    const numMatch = trimmed.match(/^(\d+\.\s+[^.\n:]+)(.*)$/s) || trimmed.match(/^(Step\s+\d+:?[^\n]+)(.*)$/s);
    if (numMatch && trimmed.length < 120) {
      const headingId = `blog-heading-${headingCounter}`;
      headingCounter++;
      elements.push(
        <h4
          key={`num-h-${idx}`}
          id={headingId}
          style={{
            fontSize: '19px',
            fontWeight: '600',
            color: '#0f172a',
            margin: '28px 0 10px',
            lineHeight: 1.4,
            scrollMarginTop: '110px',
            textAlign: 'left'
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(trimmed) }}
        />
      );
      return;
    }

    // Bullet list block
    if (trimmed.includes('\n- ') || trimmed.startsWith('- ') || trimmed.includes('\n* ') || trimmed.startsWith('* ')) {
      const listItems = trimmed.split(/\n(?=[-*]\s+)/).map(l => l.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
      elements.push(
        <ul key={`ul-${idx}`} style={{ margin: '14px 0 22px 24px', paddingLeft: '8px', textAlign: 'left' }}>
          {listItems.map((item, lIdx) => (
            <li
              key={lIdx}
              style={{ fontSize: '17px', color: '#334155', lineHeight: 1.8, marginBottom: '8px' }}
              dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(item) }}
            />
          ))}
        </ul>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <p
        key={`p-${idx}`}
        style={{
          fontSize: '17px',
          color: '#334155',
          lineHeight: 1.85,
          fontWeight: '400',
          marginBottom: '22px',
          textAlign: 'left'
        }}
        dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(trimmed.replace(/\n/g, '<br>')) }}
      />
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

  const isDummyPosts = Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0 && (
    siteData.blogPosts[0]?.title === 'Blog 1' ||
    (siteData.blogPosts[0]?.title?.includes('Soft Play vs Trampoline Park: Which') && siteData.blogPosts.length < 15) ||
    siteData.blogPosts[0]?.image === '/src/assets/blog-images.png'
  );

  const rawPosts = (Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0 && !isDummyPosts)
    ? siteData.blogPosts
    : DEFAULT_BLOG_POSTS;

  const blogPosts = rawPosts.map((p, idx) => {
    const defaultP = DEFAULT_BLOG_POSTS[idx] || DEFAULT_BLOG_POSTS.find(d => String(d.id) === String(p.id) || d.slug === p.slug) || {};
    return {
      ...defaultP,
      ...p,
      image: getValidImageUrl(p.image || p.imgUrl, defaultP.image || blogCardImg, p.id, idx)
    };
  });

  // Find post by ID or slug with fallback
  const defaultMatch = DEFAULT_BLOG_POSTS.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
  const post = blogPosts.find(p => String(p.id) === String(id) || String(p.slug) === String(id)) || defaultMatch || blogPosts[0];
  const postImg = getValidImageUrl(post?.image || post?.imgUrl, defaultMatch?.image || blogCardImg, post?.id);

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

  // Resolve rich article content from fullContent or structured description & sections
  let rawArticleContent = post.fullContent || '';
  if (!rawArticleContent && (post.description || Array.isArray(post.sections))) {
    const parts = [];
    if (post.description && post.description.trim()) {
      parts.push(post.description.trim());
    }
    if (Array.isArray(post.sections)) {
      post.sections.forEach(sec => {
        const t = (sec.title || '').trim();
        const p = (sec.paragraph || sec.content || '').trim();
        if (t && p) parts.push(`### ${t}\n\n${p}`);
        else if (t) parts.push(`### ${t}`);
        else if (p) parts.push(p);
      });
    }
    rawArticleContent = parts.join('\n\n');
  }
  if (!rawArticleContent) {
    rawArticleContent = DEFAULT_BLOG_POSTS[0]?.fullContent || '';
  }

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
          <div className="winera-blog-hero-h1" style={{
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
            <div className="winera-blog-article-main-col" style={{ width: '100%', textAlign: 'left' }}>
              
              {/* Main Article Title & Subtitle */}
              <h1 className="winera-blog-article-title" style={{
                fontSize: '38px',
                fontWeight: '600',
                color: '#0f172a',
                lineHeight: 1.25,
                margin: '0 0 16px',
                letterSpacing: '-0.5px'
              }}>
                {getFullTitle(post)}
              </h1>

              {/* Article Meta Bar */}
              <div className="winera-blog-article-meta" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '13px',
                color: '#64748b',
                fontWeight: '600',
                marginBottom: '26px',
                paddingBottom: '16px',
                borderBottom: '1.5px solid #cbd5e1',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>📅 {post.date || 'FEB 19, 2026'}</span>
                <span style={{ flexShrink: 0 }}>•</span>
                <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>⏱️ {post.readTime || '5 min read'}</span>
                <span style={{ flexShrink: 0 }}>•</span>
                <span style={{ color: '#0284c7', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>✍️ {post.author || post.founder || 'Divyang Mandani'}</span>
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
                <WineraImage
                  src={postImg}
                  alt={post.title}
                  style={{ width: '100%', display: 'block' }}
                  imgStyle={{
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
              <div className="winera-blog-sticky-register-card" style={{
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
                    fontSize: '13.5px',
                    color: '#ffffff',
                    lineHeight: 1.55,
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
                    color: '#ffffff',
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
              <div className="winera-blog-more-explore-section" style={{ margin: '36px 0 20px 0' }}>
                <h4 style={{
                  fontSize: '26px',
                  fontWeight: '900',
                  color: '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.3px',
                }}>
                  More to <span className="winera-blog-explore-accent" style={{ color: '#0284c7' }}>Explore</span>
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {recentPosts.slice(0, 3).map((recPost) => {
                    const recImage = recPost.image || getValidImageUrl(recPost.imgUrl, blogCardImg, recPost.id);
                    const recExcerpt = recPost.excerpt || recPost.line1 || 'Soft play or trampoline park? Discover the key differences in investment...';
                    const truncatedExcerpt = formatExcerpt(recExcerpt, 75);

                    return (
                      <div
                        key={recPost.id}
                        className="winera-blog-more-explore-card"
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
                          e.currentTarget.style.borderColor = '#0284c7';
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
                          <WineraImage
                            src={recImage}
                            alt={getFullTitle(recPost)}
                            style={{ width: '100%', height: '100%' }}
                            imgStyle={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        {/* Blog Title & Subtitle */}
                        <h5 style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#0f172a',
                          lineHeight: 1.35,
                          margin: '0 0 8px 0'
                        }}>
                          {getFullTitle(recPost)}
                        </h5>

                        {/* Excerpt Description */}
                        <p className="winera-blog-card-desc" style={{
                          fontSize: '13px',
                          color: '#475569',
                          lineHeight: 1.5,
                          margin: '0 0 14px 0',
                          flexGrow: 1
                        }}>
                          {truncatedExcerpt}
                        </p>

                        {/* Card Footer: Date & Founder Name */}
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
                          <span className="winera-blog-card-date" style={{ textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' }}>
                            {recPost.date || 'SEP 12, 2026'}
                          </span>
                          <span className="winera-blog-card-readmore" style={{
                            color: '#0284c7',
                            fontWeight: '700',
                            fontSize: '12px',
                            letterSpacing: '0.2px'
                          }}>
                            {recPost.author || recPost.founder || 'Divyang Mandani'}
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
        .winera-blog-article-main-col,
        .winera-blog-article-main-col *,
        .winera-blog-article-title,
        .winera-blog-article-main-col p,
        .winera-blog-article-main-col h1,
        .winera-blog-article-main-col h2,
        .winera-blog-article-main-col h3,
        .winera-blog-article-main-col h4,
        .winera-blog-article-main-col h5,
        .winera-blog-article-main-col div,
        .winera-blog-article-main-col span,
        .winera-blog-article-main-col li {
          text-align: left !important;
        }
        .winera-blog-article-main-col h2,
        .winera-blog-article-main-col h3,
        .winera-blog-article-main-col h4,
        .winera-blog-article-main-col h5 {
          font-weight: 600 !important;
        }
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
          .winera-blog-article-title {
            font-size: 26px !important;
            line-height: 1.25 !important;
            margin-bottom: 12px !important;
            text-align: left !important;
          }
          .winera-blog-article-meta {
            gap: 6px !important;
            font-size: clamp(10.5px, 2.9vw, 12px) !important;
            flex-wrap: nowrap !important;
            white-space: nowrap !important;
            overflow-x: auto !important;
            scrollbar-width: none !important;
            margin-bottom: 20px !important;
            padding-bottom: 12px !important;
          }
          .winera-blog-article-meta::-webkit-scrollbar {
            display: none !important;
          }
          .winera-blog-article-meta span {
            font-size: inherit !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          .winera-blog-right-sidebar-sticky {
            position: static !important;
          }
          .winera-related-articles-full-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .winera-blog-article-main-col,
          .winera-blog-article-main-col *,
          .winera-blog-article-title,
          .winera-blog-article-main-col p,
          .winera-blog-article-main-col h1,
          .winera-blog-article-main-col h2,
          .winera-blog-article-main-col h3,
          .winera-blog-article-main-col h4,
          .winera-blog-article-main-col h5,
          .winera-blog-article-main-col div,
          .winera-blog-article-main-col span,
          .winera-blog-article-main-col li {
            text-align: left !important;
          }
        }
        @media (max-width: 480px) {
          .winera-blog-article-title {
            font-size: 26px !important;
            line-height: 1.25 !important;
            text-align: left !important;
          }
          .winera-blog-article-main-col,
          .winera-blog-article-main-col *,
          .winera-blog-article-title,
          .winera-blog-article-main-col p,
          .winera-blog-article-main-col h1,
          .winera-blog-article-main-col h2,
          .winera-blog-article-main-col h3,
          .winera-blog-article-main-col h4,
          .winera-blog-article-main-col h5,
          .winera-blog-article-main-col div,
          .winera-blog-article-main-col span,
          .winera-blog-article-main-col li {
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
}

