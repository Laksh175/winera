import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import projectPageMobileBanner from '../assets/project-page-mobile-banner.png';
const blogHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const gameZoneMobileBanner = projectPageMobileBanner;
const blogCardImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345635/winera_uploads/ltwinrzpqitg4s8znfel.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
import WineraImage from '../components/WineraImage';
import { Calendar, Clock, PenTool, ChevronDown } from 'lucide-react';
import { fetchBlogBySlug, fetchBlogs } from '../services/api';
import { sanitizeAndFormatHtml, normalizeRawContent } from '../utils/sanitizeHtml';
import { calculateReadTime } from '../utils/readTime';

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

// Helper to extract Section Titles for "In this article" Table of Contents
// STRICT RULES:
// 1. Only <h2> headings set by Admin show as Main Titles (no <h1>, <h3>, or other tags in main list)
// 2. Any sub-headings (<h3>..<h6>) under each <h2> are grouped in a dropdown accordion
// 3. Compact 14px font size to prevent overly long menus
const extractHeadings = (text) => {
  if (!text) return [];

  // 1. If content contains HTML
  const isHtml = /<\/?(?:p|h[1-6]|div|table|strong|em|pre|code|span|blockquote|ul|ol|li)[\s>]/i.test(text);

  if (isHtml) {
    const headingRegex = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
    let match;
    const allFound = [];
    let counter = 0;

    while ((match = headingRegex.exec(text)) !== null) {
      const level = parseInt(match[1], 10);
      const attrs = match[2];
      const inner = match[3];
      const rawTitle = inner.replace(/<[^>]+>/g, '').trim();

      if (rawTitle) {
        const existingIdMatch = attrs.match(/\bid=["']([^"']+)["']/i);
        const headingId = existingIdMatch ? existingIdMatch[1] : `blog-heading-${counter++}`;
        allFound.push({
          id: headingId,
          level,
          title: rawTitle,
          rawTitle
        });
      }
    }

    // Check if any H2 heading exists
    const hasH2 = allFound.some(h => h.level === 2);

    if (hasH2) {
      const grouped = [];
      let currentH2 = null;

      allFound.forEach((h) => {
        if (h.level === 2) {
          currentH2 = {
            id: h.id,
            level: 2,
            title: h.title,
            rawTitle: h.rawTitle,
            subItems: []
          };
          grouped.push(currentH2);
        } else if (currentH2 && h.level > 2) {
          currentH2.subItems.push({
            id: h.id,
            level: h.level,
            title: h.title,
            rawTitle: h.rawTitle
          });
        }
      });

      return grouped;
    }

    // Fallback if no H2 exists: show top-level genuine headings
    return allFound.map(h => ({ ...h, subItems: [] }));
  }

  // 2. Legacy markdown fallback (only when markdown # headings exist)
  const normalized = normalizeRawContent(text);
  const paragraphs = normalized.split('\n\n');
  const allFound = [];
  let counter = 0;

  paragraphs.forEach((pText) => {
    const trimmed = pText.trim();
    if (!trimmed || /^#+\s*$/.test(trimmed)) return;

    if (trimmed.startsWith('#')) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)/);
      if (match) {
        let level = match[1].length;
        if (level === 3 || level === 1) level = 2; // Treat main blog headings as H2
        const firstLine = match[2].split('\n')[0].trim();
        const cleanTitle = firstLine.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
        if (cleanTitle) {
          allFound.push({
            id: `blog-heading-${counter++}`,
            level,
            title: cleanTitle,
            rawTitle: cleanTitle
          });
        }
      }
    }
  });

  const hasH2 = allFound.some(h => h.level === 2);
  if (hasH2) {
    const grouped = [];
    let currentH2 = null;
    allFound.forEach((h) => {
      if (h.level === 2) {
        currentH2 = { ...h, subItems: [] };
        grouped.push(currentH2);
      } else if (currentH2 && h.level > 2) {
        currentH2.subItems.push(h);
      }
    });
    return grouped;
  }

  return allFound.map(h => ({ ...h, subItems: [] }));
};

export { sanitizeAndFormatHtml, normalizeRawContent };


const renderFormattedText = (text) => {
  if (!text) return null;

  // Direct HTML Render Mode: Preserves exact line-breaks, tables, headings, code-blocks, colors, and images
  const isHtmlContent = /<\/?(?:p|h[1-6]|ul|ol|li|table|tr|td|th|blockquote|pre|code|img|div|span|strong|em|u|a)[\s>]/i.test(text);

  if (isHtmlContent) {
    let headingCounter = 0;
    // Inject matching anchor IDs into genuine headings h1 to h6
    let htmlWithHeadingIds = text.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
      const clean = inner.replace(/<[^>]+>/g, '').trim();
      if (clean) {
        const existingIdMatch = attrs.match(/\bid=["']([^"']+)["']/i);
        const headingId = existingIdMatch ? existingIdMatch[1] : `blog-heading-${headingCounter++}`;
        const hasClass = /\bclass=["'][^"']*["']/i.test(attrs);
        let newAttrs = attrs;
        if (hasClass) {
          newAttrs = newAttrs.replace(/\bclass=["']([^"']*)["']/i, `class="$1 winera-blog-heading-${level} winera-blog-article-h${level}"`);
        } else {
          newAttrs = `${newAttrs} class="winera-blog-heading-${level} winera-blog-article-h${level}"`;
        }
        if (!existingIdMatch) {
          newAttrs = ` id="${headingId}"${newAttrs}`;
        }
        return `<h${level}${newAttrs}>${inner}</h${level}>`;
      }
      return match;
    });

    // Automatically wrap any <table> with .winera-blog-table-responsive container so it adjusts according to content and scrolls smoothly only when necessary
    let processedHtml = htmlWithHeadingIds;
    if (processedHtml.includes('<table')) {
      // Clean up justify classes and excessive non-breaking spaces inside tables
      processedHtml = processedHtml.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
        let cleaned = tableHtml
          .replace(/text-align\s*:\s*justify\s*;?/gi, '')
          .replace(/\bql-align-justify\b/gi, '')
          .replace(/(?:&nbsp;|\u00a0){2,}/gi, ' ');
        cleaned = cleaned.replace(/(<t[dh][^>]*>)([\s\S]*?)(<\/t[dh]>)/gi, (m, open, body, close) => {
          const normalizedBody = body
            .replace(/[ \t]{2,}/g, ' ')
            .replace(/<p[^>]*class=["'][^"']*ql-align-justify[^"']*["'][^>]*>/gi, '<p>')
            .replace(/<p\s+style=["'][^"']*text-align\s*:\s*justify[^"']*["'][^>]*>/gi, '<p>');
          return `${open}${normalizedBody}${close}`;
        });
        return cleaned;
      });
      processedHtml = processedHtml.replace(/<div[^>]*class=["'][^"']*winera-blog-table-responsive[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi, '$1');
      processedHtml = processedHtml.replace(/(<table[\s\S]*?<\/table>)/gi, '<div class="winera-blog-table-responsive">$1</div>');
    }

    return (
      <div
        className="winera-blog-article-content"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    );
  }

  // Legacy Markdown Fallback Render Mode
  const normalized = normalizeRawContent(text);
  const paragraphs = normalized.split('\n\n');
  let headingCounter = 0;
  const elements = [];

  paragraphs.forEach((pText, idx) => {
    const trimmed = pText.trim();
    if (!trimmed || /^#+\s*$/.test(trimmed)) return;

    // Headings starting with ### or ## or # (FONT SIZE 22px, FONT WEIGHT 700)
    if (trimmed.startsWith('#')) {
      const lines = trimmed.split('\n');
      const headingText = lines[0].replace(/^#+\s*/, '').trim();
      const bodyLines = lines.slice(1).join('\n').trim();

      if (headingText) {
        const headingId = `blog-heading-${headingCounter}`;
        headingCounter++;

        elements.push(
          <h2
            key={`h-${idx}`}
            id={headingId}
            className="winera-blog-heading-2 winera-blog-article-h2"
            style={{
              fontSize: '27px',
              fontWeight: '700',
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
              fontSize: '16.5px',
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
    if (numMatch && trimmed.length < 120 && !trimmed.includes('\n')) {
      const headingId = `blog-heading-${headingCounter}`;
      headingCounter++;
      elements.push(
        <h4
          key={`num-h-${idx}`}
          id={headingId}
          style={{
            fontSize: '19px',
            fontWeight: '700',
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
              style={{ fontSize: '16.5px', color: '#334155', lineHeight: 1.8, marginBottom: '8px' }}
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
          fontSize: '16.5px',
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

// ── TABLE OF CONTENTS ACCORDION (H2 Main Headings + Dropdown Sub-Points) ──
const BlogTableOfContents = ({ headings }) => {
  const [expandedMap, setExpandedMap] = useState({});
  const [activeId, setActiveId] = useState('');

  // Auto-scroll tracker for highlighting active heading
  useEffect(() => {
    const handleScroll = () => {
      const allIds = [];
      headings.forEach(h => {
        allIds.push(h.id);
        if (Array.isArray(h.subItems)) {
          h.subItems.forEach(sub => allIds.push(sub.id));
        }
      });

      const scrollPos = window.scrollY + 130;
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(allIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id, e) => {
    if (e) {
      e.preventDefault();
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -95;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleExpand = (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMainHeadingClick = (heading, e) => {
    e.preventDefault();
    scrollToHeading(heading.id);
    if (heading.subItems && heading.subItems.length > 0) {
      setExpandedMap(prev => ({
        ...prev,
        [heading.id]: !prev[heading.id]
      }));
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      {/* Header */}
      <div style={{
        fontSize: '14px',
        fontWeight: '800',
        color: '#0f172a',
        padding: '13px 16px',
        borderBottom: '1.5px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: '#fafafa'
      }}>
        <span style={{ color: '#0284c7' }}>📌</span> In this article
      </div>

      {/* Headings List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {headings.map((h, index) => {
          const hasSubItems = Array.isArray(h.subItems) && h.subItems.length > 0;
          const isExpanded = !!expandedMap[h.id];
          const isMainActive = activeId === h.id || (hasSubItems && h.subItems.some(sub => sub.id === activeId));

          return (
            <div
              key={h.id}
              style={{
                borderBottom: index < headings.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: isMainActive ? '#f0f9ff' : 'transparent',
                transition: 'background-color 0.15s ease'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderLeft: isMainActive ? '3.5px solid #0284c7' : '3.5px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onClick={(e) => handleMainHeadingClick(h, e)}
                onMouseEnter={(e) => {
                  if (!isMainActive) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isMainActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <a
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMainHeadingClick(h, e);
                  }}
                  title={h.title}
                  style={{
                    flex: 1,
                    fontSize: '14px',
                    fontWeight: isMainActive ? '700' : '600',
                    color: isMainActive ? '#0284c7' : '#1e293b',
                    textDecoration: 'none',
                    lineHeight: 1.45,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                    textAlign: 'left'
                  }}
                >
                  {h.title}
                </a>

                {hasSubItems && (
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(h.id, e)}
                    aria-label={isExpanded ? 'Collapse sub-headings' : 'Expand sub-headings'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '4px',
                      marginLeft: '6px',
                      cursor: 'pointer',
                      color: isMainActive ? '#0284c7' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      transition: 'transform 0.2s ease, color 0.15s ease',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDown style={{ width: '16px', height: '16px' }} />
                  </button>
                )}
              </div>

              {/* Sub-items Accordion Dropdown */}
              {hasSubItems && isExpanded && (
                <div style={{
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  padding: '2px 0'
                }}>
                  {h.subItems.map((sub, sIdx) => {
                    const isSubActive = activeId === sub.id;
                    return (
                      <a
                        key={sub.id}
                        href={`#${sub.id}`}
                        onClick={(e) => scrollToHeading(sub.id, e)}
                        title={sub.title}
                        style={{
                          display: 'block',
                          padding: '8px 14px 8px 24px',
                          fontSize: '13.5px',
                          fontWeight: isSubActive ? '700' : '500',
                          color: isSubActive ? '#0284c7' : '#475569',
                          textDecoration: 'none',
                          lineHeight: 1.4,
                          borderLeft: isSubActive ? '3.5px solid #0284c7' : '3.5px solid transparent',
                          borderBottom: sIdx < h.subItems.length - 1 ? '1px solid #edf2f7' : 'none',
                          transition: 'all 0.15s ease',
                          textAlign: 'left',
                          wordBreak: 'break-word'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#0284c7';
                          e.currentTarget.style.backgroundColor = '#e0f2fe';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isSubActive ? '#0284c7' : '#475569';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {sub.title}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function BlogDetail({ siteData }) {
  const [isPhone, setIsPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navPost = location.state?.post;
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [apiBlog, setApiBlog] = useState(null);
  const [dynamicBlogPosts, setDynamicBlogPosts] = useState(() => {
    try {
      const cached = sessionStorage.getItem('winera_dynamic_blogs');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    let isMounted = true;
    if (id) {
      fetchBlogBySlug(id).then(res => {
        if (isMounted && (res?.blog || res?.post)) {
          setApiBlog(res.blog || res.post);
        }
      }).catch(err => console.warn('Blog fetch by slug notice:', err));
    }
    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    fetchBlogs({ limit: 'all' }).then(res => {
      if (isMounted && res?.success && Array.isArray(res.blogs || res.posts)) {
        setDynamicBlogPosts(res.blogs || res.posts);
      }
    }).catch(err => console.warn('Dynamic blogs fetch notice:', err));
    return () => { isMounted = false; };
  }, []);

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
    return merged.filter(p => {
      if (!p) return false;
      if (p.status === 'scheduled') {
        return p.scheduledAt && new Date(p.scheduledAt) <= new Date();
      }
      return p.isActive !== false && p.status !== 'inactive' && p.isPublished !== false;
    });
  })();

  const blogPosts = rawPosts.map((p) => {
    return {
      ...p,
      image: getValidImageUrl(p.image || p.imageUrl || p.imgUrl, blogCardImg)
    };
  });

  // Find post from list, apiBlog, or router state
  const foundInList = blogPosts.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
  const rawPost = (apiBlog && (String(apiBlog.id) === String(id) || String(apiBlog.slug) === String(id)))
    ? (foundInList ? { ...apiBlog, ...foundInList, author: foundInList.author || apiBlog.author } : apiBlog)
    : (navPost && (String(navPost.id) === String(id) || String(navPost.slug) === String(id)))
      ? navPost
      : (foundInList || apiBlog || navPost || blogPosts[0] || {});
  const post = foundInList ? { ...rawPost, ...foundInList, author: foundInList.author || rawPost.author } : rawPost;
  const postImg = getValidImageUrl(post?.image || post?.imageUrl || post?.imgUrl, blogCardImg);

  // Recent/Related posts: Pick the NEXT 3 consecutive blogs after current blog
  const currentIndex = blogPosts.findIndex(p => String(p.id) === String(post?.id) || String(p.slug) === String(post?.slug));
  const validIndex = currentIndex >= 0 ? currentIndex : 0;
  const recentPosts = blogPosts.length > 0
    ? [1, 2, 3].map(offset => {
        const nextIdx = (validIndex + offset) % blogPosts.length;
        return blogPosts[nextIdx];
      })
    : [];

  useEffect(() => {
    if (!post?.title && !post?.subtitle) return;

    // 1. Dynamic Meta Title Tag
    const fullTitle = `${post.title || ''} ${post.subtitle || ''}`.trim();
    const seoTitle = post.metaTitle && post.metaTitle.trim()
      ? post.metaTitle.trim()
      : `${fullTitle || 'Blog Detail'} | Winera International`;
    document.title = seoTitle;

    // 2. Dynamic Meta Description Tag
    let metaDescTag = document.querySelector("meta[name='description']");
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    const cleanContentSnippet = (post.fullContent || post.content || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
    const seoDesc = post.metaDescription && post.metaDescription.trim()
      ? post.metaDescription.trim()
      : (post.excerpt || post.description || cleanContentSnippet || 'Read expert insights on game zone setup and indoor entertainment on Winera International.');
    metaDescTag.setAttribute('content', seoDesc);

    // 3. OpenGraph and Twitter Meta Tags
    const ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute('content', seoTitle);
    const ogDesc = document.querySelector("meta[property='og:description']");
    if (ogDesc) ogDesc.setAttribute('content', seoDesc);
    const twTitle = document.querySelector("meta[name='twitter:title']");
    if (twTitle) twTitle.setAttribute('content', seoTitle);
    const twDesc = document.querySelector("meta[name='twitter:description']");
    if (twDesc) twDesc.setAttribute('content', seoDesc);

    // 4. Canonical link tag update for SEO
    let canonicalTag = document.querySelector("link[rel='canonical']");
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    const currentSlug = post.slug || post.id;
    const resolvedCanonical = post.canonicalUrl && post.canonicalUrl.trim()
      ? post.canonicalUrl.trim()
      : `https://winera.in/blog/${currentSlug}`;
    canonicalTag.setAttribute('href', resolvedCanonical);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Canonical SEO URL Redirect: If accessed via numeric ID (e.g. /blog/2), seamlessly replace URL with SEO-friendly slug
    if (post?.slug && String(id) !== String(post.slug)) {
      navigate(`/blog/${post.slug}`, { replace: true });
    }
  }, [id, post, navigate]);

  // Resolve rich article content: prioritize fullContent, then content, then legacy description & sections
  let rawArticleContent = '';
  if (post.fullContent && typeof post.fullContent === 'string' && post.fullContent.trim()) {
    rawArticleContent = post.fullContent.trim();
  } else if (post.content && typeof post.content === 'string' && post.content.trim()) {
    rawArticleContent = post.content.trim();
  } else if (post.description || (Array.isArray(post.sections) && post.sections.length > 0)) {
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
    rawArticleContent = '';
  }

  const headings = extractHeadings(rawArticleContent);

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. TOP HERO BANNER */}
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
          <div className="winera-blog-hero-h1" style={{
            fontSize: '21px',
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
      <section data-no-auto-reveal="true" className="winera-blog-main-article-section" style={{ padding: '45px 3vw 70px', background: '#F5F5F9', overflow: 'visible' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          
          {/* ── TOP BANNER: TITLE & META BAR ── */}
          <div className="winera-blog-top-header" style={{ marginBottom: '24px', textAlign: 'left' }}>
            {/* Main Article Title & Subtitle */}
            <h1 className="winera-blog-article-title" style={{
              fontSize: '33px',
              fontWeight: '700',
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
              marginBottom: '0',
              paddingBottom: '16px',
              borderBottom: '1.5px solid #cbd5e1',
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <Calendar style={{ width: '15px', height: '15px', color: '#0284c7' }} />
                {post.date || 'FEB 19, 2026'}
              </span>
              <span style={{ flexShrink: 0, color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <Clock style={{ width: '15px', height: '15px', color: '#0284c7' }} />
                {post.readTime || calculateReadTime(post.fullContent || post.content) || '4 min read'}
              </span>
              <span style={{ flexShrink: 0, color: '#cbd5e1' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: '700', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <PenTool style={{ width: '15px', height: '15px', color: '#0284c7' }} />
                {post.author || post.founder || 'Divyang Mandani'}
              </span>
            </div>
          </div>

          {/* ── TOP BIG FEATURED IMAGE BANNER ── */}
          <div className="winera-blog-top-featured-img" style={{
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 12px 35px rgba(0,0,0,0.08)',
            marginBottom: '42px',
            background: '#e0f2fe'
          }}>
            <WineraImage
              src={postImg}
              alt={post.imageAlt || post.title}
              targetWidth={1400}
              loading="eager"
              style={{ width: '100%', display: 'block' }}
              imgStyle={{
                width: '100%',
                height: 'auto',
                maxHeight: '560px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>

          <div className="winera-blog-3col-grid" style={{
            display: 'grid',
            gridTemplateColumns: headings.length > 0 ? '250px minmax(0, 1fr) 300px' : 'minmax(0, 1fr) 320px',
            gap: '30px',
            alignItems: 'start'
          }}>

            {/* ── LEFT COLUMN: STICKY TABLE OF CONTENTS ACCORDION (H2 ONLY + DROPDOWN SUB-POINTS, FONT SIZE 14px) ── */}
            {headings.length > 0 && (
              <div className="winera-blog-left-toc-sticky" style={{
                position: 'sticky',
                top: '110px',
                alignSelf: 'start',
                height: 'fit-content',
                zIndex: 10
              }}>
                <BlogTableOfContents headings={headings} />
              </div>
            )}

            {/* ── MIDDLE COLUMN: ARTICLE CONTENT ── */}
            <div className="winera-blog-article-main-col" style={{ width: '100%', minWidth: 0, maxWidth: '100%', textAlign: 'left', overflow: 'hidden' }}>
              {/* Formatted Article Text Stream */}
              <div style={{ marginBottom: '40px' }}>
                {renderFormattedText(rawArticleContent)}
              </div>
            </div>

            {/* ── RIGHT COLUMN: STICKY REGISTER FORM POSTER CARD ─────────────── */}
            <div className="winera-blog-right-sidebar-sticky" style={{
              position: 'sticky',
              top: '110px',
              alignSelf: 'start',
              height: 'fit-content',
              zIndex: 10
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
            </div>

          </div>

          {/* ── MORE TO EXPLORE (FULL WIDTH RELATED ARTICLES AT THE END OF THE BLOG) ── */}
          <div className="winera-blog-more-explore-bottom" style={{ marginTop: '70px', paddingTop: '45px', borderTop: '1.5px solid #cbd5e1' }}>
            <div style={{ marginBottom: '28px', textAlign: 'left' }}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '900',
                color: '#0f172a',
                margin: 0,
                letterSpacing: '-0.5px'
              }}>
                More to <span className="winera-blog-explore-accent" style={{ color: '#0284c7' }}>Explore</span>
              </h3>
            </div>

            <div className="winera-related-articles-full-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px'
            }}>
              {recentPosts.slice(0, 3).map((recPost) => {
                const recImage = recPost.image || getValidImageUrl(recPost.imgUrl, blogCardImg, recPost.id);
                const recExcerpt = recPost.excerpt || recPost.line1 || 'Soft play or trampoline park? Discover the key differences in investment...';
                const truncatedExcerpt = formatExcerpt(recExcerpt, 95);

                const recSlug = recPost.slug || recPost.id;

                return (
                  <Link
                    key={recPost.id}
                    to={`/blog/${recSlug}`}
                    state={{ post: recPost }}
                    className="winera-blog-more-explore-card"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '20px',
                      padding: '18px',
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
                    <div className="winera-blog-card-img-container" style={{ position: 'relative', width: '100%', height: '190px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, marginBottom: '14px', background: '#e0f2fe' }}>
                      <WineraImage
                        src={recImage}
                        alt={recPost.imageAlt || getFullTitle(recPost)}
                        targetWidth={600}
                        style={{ width: '100%', height: '100%' }}
                        imgStyle={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>

                    {/* Blog Title & Subtitle */}
                    <h4 style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#0f172a',
                      lineHeight: 1.35,
                      margin: '0 0 10px 0',
                      textAlign: 'left'
                    }}>
                      {getFullTitle(recPost)}
                    </h4>

                    {/* Excerpt Description */}
                    <p className="winera-blog-card-desc" style={{
                      fontSize: '13.5px',
                      color: '#475569',
                      lineHeight: 1.55,
                      margin: '0 0 16px 0',
                      flexGrow: 1,
                      textAlign: 'left'
                    }}>
                      {truncatedExcerpt}
                    </p>

                    {/* Card Footer: Date & Founder Name */}
                    <div style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#64748b',
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span className="winera-blog-card-date" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' }}>
                        <Calendar style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                        {recPost.date || 'SEP 12, 2026'}
                      </span>
                      <span className="winera-blog-card-readmore" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#0284c7',
                        fontWeight: '700',
                        fontSize: '12.5px',
                        letterSpacing: '0.2px'
                      }}>
                        <PenTool style={{ width: '13px', height: '13px', color: '#0284c7' }} />
                        {recPost.author || recPost.founder || 'Divyang Mandani'}
                      </span>
                    </div>
                  </Link>
                );
              })}
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

        /* ── Full Blog Rich Article Content Styling ── */
        .winera-blog-article-content {
          font-family: 'Open Sans', sans-serif !important;
          color: #334155 !important;
          font-size: 16.5px !important;
          line-height: 1.85 !important;
          text-align: left !important;
        }

        /* Paragraphs & Exact Spacing Preservation */
        .winera-blog-article-content p {
          font-size: 16.5px !important;
          color: #334155 !important;
          line-height: 1.85 !important;
          margin-bottom: 20px !important;
          min-height: 1.6em !important;
          text-align: left !important;
        }
        .winera-blog-article-content p:has(br:only-child),
        .winera-blog-article-content p br {
          display: block !important;
        }

        /* Headings H1 to H6 on Blog Page (Strict requested sizes: H1: 33px, H2: 27px, H3: 23px) */
        div.winera-blog-3col-grid div.winera-blog-article-main-col h1,
        div.winera-blog-article-main-col h1,
        div.winera-blog-article-content h1,
        h1.winera-blog-main-h1 {
          font-size: 33px !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin: 32px 0 14px !important;
          line-height: 1.3 !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }
        div.winera-blog-3col-grid div.winera-blog-article-main-col h2,
        div.winera-blog-3col-grid div.winera-blog-article-main-col h2 *,
        div.winera-blog-article-main-col h2,
        div.winera-blog-article-main-col h2 *,
        div.winera-blog-article-content h2,
        div.winera-blog-article-content h2 *,
        .winera-blog-article-main-col h2,
        .winera-blog-article-main-col h2 *,
        .winera-blog-article-content h2,
        .winera-blog-article-content h2 *,
        .winera-blog-main-article-section h2,
        h2.winera-blog-heading-2,
        h2.winera-blog-heading-2 *,
        h2.winera-blog-article-h2,
        h2.winera-blog-article-h2 *,
        h2[id^="blog-heading-"],
        h2[id^="blog-heading-"] *,
        div[class*="winera"] h2.winera-blog-heading-2,
        div[class*="winera"] h2.winera-blog-heading-2 *,
        div[class*="winera"] h2.winera-blog-article-h2,
        div[class*="winera"] h2.winera-blog-article-h2 *,
        div[class*="winera"] h2[id^="blog-heading-"],
        div[class*="winera"] h2[id^="blog-heading-"] * {
          font-size: 27px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 28px 0 12px !important;
          line-height: 1.35 !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }
        div.winera-blog-3col-grid div.winera-blog-article-main-col h3,
        div.winera-blog-3col-grid div.winera-blog-article-main-col h3 *,
        div.winera-blog-article-main-col h3,
        div.winera-blog-article-main-col h3 *,
        div.winera-blog-article-content h3,
        div.winera-blog-article-content h3 *,
        .winera-blog-article-main-col h3,
        .winera-blog-article-content h3,
        .winera-blog-main-article-section h3,
        h3.winera-blog-heading-3,
        h3.winera-blog-heading-3 *,
        h3[id^="blog-heading-"],
        h3[id^="blog-heading-"] * {
          font-size: 23px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 24px 0 10px !important;
          line-height: 1.4 !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }
        article.winera-blog-article-main-col .winera-blog-article-content h4,
        .winera-blog-article-content h4 {
          font-size: 19px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 20px 0 8px !important;
          line-height: 1.45 !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }
        article.winera-blog-article-main-col .winera-blog-article-content h5,
        .winera-blog-article-content h5 {
          font-size: 15px !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin: 16px 0 6px !important;
          line-height: 1.5 !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }
        article.winera-blog-article-main-col .winera-blog-article-content h6,
        .winera-blog-article-content h6 {
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #475569 !important;
          margin: 14px 0 6px !important;
          line-height: 1.5 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          scroll-margin-top: 110px !important;
          font-family: 'Open Sans', sans-serif !important;
          text-align: left !important;
        }

        /* Code Blocks & Quill Syntax Block (1:1 Exact Match with Admin Editor) */
        .winera-blog-article-content pre,
        .winera-blog-article-content pre.ql-syntax,
        .winera-blog-article-content .ql-syntax,
        .winera-blog-article-content .ql-code-block-container {
          background-color: #23241f !important;
          color: #f8f8f2 !important;
          border-radius: 4px !important;
          padding: 6px 14px !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15.5px !important;
          line-height: 1.65 !important;
          margin: 14px 0 !important;
          display: block !important;
          overflow-x: auto !important;
          white-space: pre-wrap !important;
          word-break: break-word !important;
          border: none !important;
          box-shadow: none !important;
        }
        .winera-blog-article-content .ql-code-block {
          background: transparent !important;
          color: #f8f8f2 !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 15.5px !important;
          line-height: 1.65 !important;
          display: block !important;
        }
        .winera-blog-article-content pre *,
        .winera-blog-article-content .ql-code-block-container * {
          color: #f8f8f2 !important;
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-family: 'Open Sans', sans-serif !important;
        }
        .winera-blog-article-content code:not(pre code) {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-family: 'Open Sans', sans-serif !important;
          font-size: 0.95em !important;
        }

        /* Support Custom Text Colors & Background Highlights */
        .winera-blog-article-content [style*="color"] strong,
        .winera-blog-article-content [style*="color"] b,
        .winera-blog-article-content [style*="color"] em,
        .winera-blog-article-content [style*="color"] i {
          color: inherit !important;
        }
        .winera-blog-article-content span[style*="color"],
        .winera-blog-article-content span[style*="background"] {
          display: inline !important;
        }
        .winera-blog-article-content [style*="background"] {
          border-radius: 4px !important;
          padding: 2px 6px !important;
        }
        .winera-blog-article-content p[style*="background"],
        .winera-blog-article-content div[style*="background"] {
          padding: 12px 18px !important;
          border-radius: 8px !important;
          margin: 16px 0 !important;
          display: block !important;
        }

        /* Quill Background Color Classes */
        .winera-blog-article-content .ql-bg-black { background-color: #000000 !important; color: #ffffff !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-red { background-color: #e60000 !important; color: #ffffff !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-orange { background-color: #f90 !important; color: #000000 !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-yellow { background-color: #ff0 !important; color: #000000 !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-green { background-color: #008a00 !important; color: #ffffff !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-blue { background-color: #06c !important; color: #ffffff !important; padding: 2px 6px !important; border-radius: 4px !important; }
        .winera-blog-article-content .ql-bg-purple { background-color: #93f !important; color: #ffffff !important; padding: 2px 6px !important; border-radius: 4px !important; }

        /* Quill Text Color Classes */
        .winera-blog-article-content .ql-color-white { color: #ffffff !important; }
        .winera-blog-article-content .ql-color-red { color: #e60000 !important; }
        .winera-blog-article-content .ql-color-orange { color: #f90 !important; }
        .winera-blog-article-content .ql-color-yellow { color: #ff0 !important; }
        .winera-blog-article-content .ql-color-green { color: #008a00 !important; }
        .winera-blog-article-content .ql-color-blue { color: #06c !important; }
        .winera-blog-article-content .ql-color-purple { color: #93f !important; }

        /* Quill Text Alignments */
        .winera-blog-article-content .ql-align-center,
        .winera-blog-article-content p.ql-align-center,
        .winera-blog-article-content h1.ql-align-center,
        .winera-blog-article-content h2.ql-align-center,
        .winera-blog-article-content h3.ql-align-center,
        .winera-blog-article-content h4.ql-align-center,
        .winera-blog-article-content h5.ql-align-center,
        .winera-blog-article-content h6.ql-align-center {
          text-align: center !important;
        }
        .winera-blog-article-content .ql-align-right,
        .winera-blog-article-content p.ql-align-right,
        .winera-blog-article-content h1.ql-align-right,
        .winera-blog-article-content h2.ql-align-right,
        .winera-blog-article-content h3.ql-align-right,
        .winera-blog-article-content h4.ql-align-right,
        .winera-blog-article-content h5.ql-align-right,
        .winera-blog-article-content h6.ql-align-right {
          text-align: right !important;
        }
        .winera-blog-article-content .ql-align-justify,
        .winera-blog-article-content p.ql-align-justify {
          text-align: justify !important;
        }

        /* Quill Indentations */
        .winera-blog-article-content .ql-indent-1 { padding-left: 2rem !important; }
        .winera-blog-article-content .ql-indent-2 { padding-left: 4rem !important; }
        .winera-blog-article-content .ql-indent-3 { padding-left: 6rem !important; }
        .winera-blog-article-content .ql-indent-4 { padding-left: 8rem !important; }
        .winera-blog-article-content .ql-indent-5 { padding-left: 10rem !important; }

        /* Quill Font Size Classes */
        .winera-blog-article-content .ql-size-small { font-size: 0.75em !important; }
        .winera-blog-article-content .ql-size-large { font-size: 1.45em !important; }
        .winera-blog-article-content .ql-size-huge { font-size: 2.1em !important; }

        /* ── Tables: Professional Layout Matching Admin Editor with Clean Spacing ── */
        .winera-blog-table-responsive {
          width: 100% !important;
          max-width: 100% !important;
          margin: 24px 0 !important;
          border-radius: 12px !important;
          border: 1.5px solid #cbd5e1 !important;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04) !important;
          background: #ffffff !important;
          box-sizing: border-box !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        .winera-blog-table-responsive::-webkit-scrollbar {
          height: 5px;
        }
        .winera-blog-table-responsive::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .winera-blog-table-responsive::-webkit-scrollbar-track {
          background: transparent;
        }

        .winera-blog-table-responsive table,
        .winera-blog-article-content table {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          border-collapse: collapse !important;
          margin: 0 !important;
          table-layout: fixed !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow: none !important;
          box-sizing: border-box !important;
        }

        .winera-blog-article-content table th,
        .winera-blog-article-content table td {
          border: 1px solid #cbd5e1 !important;
          padding: 12px 16px !important;
          font-size: 17px !important;
          line-height: 1.65 !important;
          color: #334155 !important;
          vertical-align: top !important;
          text-align: left;
          box-sizing: border-box !important;
          word-break: break-word !important;
          overflow-wrap: anywhere !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
          text-justify: none !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
        }

        .winera-blog-article-content table th p,
        .winera-blog-article-content table td p {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 17px !important;
          line-height: 1.65 !important;
          color: #334155 !important;
          word-break: break-word !important;
          overflow-wrap: anywhere !important;
          word-wrap: break-word !important;
          white-space: normal !important;
        }

        /* Explicit alignment overrides for table cells & their contents */
        .winera-blog-article-content table th[align="center"],
        .winera-blog-article-content table td[align="center"],
        .winera-blog-article-content table th[style*="text-align: center"],
        .winera-blog-article-content table td[style*="text-align: center"],
        .winera-blog-article-content table th[style*="text-align:center"],
        .winera-blog-article-content table td[style*="text-align:center"],
        .winera-blog-article-content table th.ql-align-center,
        .winera-blog-article-content table td.ql-align-center,
        .winera-blog-article-content table th .ql-align-center,
        .winera-blog-article-content table td .ql-align-center,
        .winera-blog-article-content table th[align="center"] *,
        .winera-blog-article-content table td[align="center"] *,
        .winera-blog-article-content table th[style*="text-align: center"] *,
        .winera-blog-article-content table td[style*="text-align: center"] *,
        .winera-blog-article-content table th[style*="text-align:center"] *,
        .winera-blog-article-content table td[style*="text-align:center"] *,
        .winera-blog-article-content table th.ql-align-center *,
        .winera-blog-article-content table td.ql-align-center * {
          text-align: center !important;
        }

        .winera-blog-article-content table th[align="right"],
        .winera-blog-article-content table td[align="right"],
        .winera-blog-article-content table th[style*="text-align: right"],
        .winera-blog-article-content table td[style*="text-align: right"],
        .winera-blog-article-content table th[style*="text-align:right"],
        .winera-blog-article-content table td[style*="text-align:right"],
        .winera-blog-article-content table th.ql-align-right,
        .winera-blog-article-content table td.ql-align-right,
        .winera-blog-article-content table th .ql-align-right,
        .winera-blog-article-content table td .ql-align-right,
        .winera-blog-article-content table th[align="right"] *,
        .winera-blog-article-content table td[align="right"] *,
        .winera-blog-article-content table th[style*="text-align: right"] *,
        .winera-blog-article-content table td[style*="text-align: right"] *,
        .winera-blog-article-content table th[style*="text-align:right"] *,
        .winera-blog-article-content table td[style*="text-align:right"] *,
        .winera-blog-article-content table th.ql-align-right *,
        .winera-blog-article-content table td.ql-align-right * {
          text-align: right !important;
        }

        .winera-blog-article-content table th[align="left"],
        .winera-blog-article-content table td[align="left"],
        .winera-blog-article-content table th[style*="text-align: left"],
        .winera-blog-article-content table td[style*="text-align: left"],
        .winera-blog-article-content table th[style*="text-align:left"],
        .winera-blog-article-content table td[style*="text-align:left"],
        .winera-blog-article-content table th.ql-align-left,
        .winera-blog-article-content table td.ql-align-left,
        .winera-blog-article-content table th .ql-align-left,
        .winera-blog-article-content table td .ql-align-left,
        .winera-blog-article-content table th[align="left"] *,
        .winera-blog-article-content table td[align="left"] *,
        .winera-blog-article-content table th[style*="text-align: left"] *,
        .winera-blog-article-content table td[style*="text-align: left"] *,
        .winera-blog-article-content table th[style*="text-align:left"] *,
        .winera-blog-article-content table td[style*="text-align:left"] *,
        .winera-blog-article-content table th.ql-align-left *,
        .winera-blog-article-content table td.ql-align-left * {
          text-align: left !important;
        }

        /* Strictly prevent text-align justify inside tables so words never get huge gaps */
        .winera-blog-article-content table th.ql-align-justify,
        .winera-blog-article-content table td.ql-align-justify,
        .winera-blog-article-content table th p.ql-align-justify,
        .winera-blog-article-content table td p.ql-align-justify {
          text-align: left !important;
          text-justify: none !important;
          word-spacing: normal !important;
        }

        .winera-blog-article-content table th {
          background: #f1f5f9 !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          font-size: 17px !important;
          letter-spacing: -0.1px !important;
          border-bottom: 2px solid #cbd5e1 !important;
        }

        .winera-blog-article-content table tr:nth-child(even) td {
          background: #f8fafc !important;
        }

        .winera-blog-article-content table tr:hover td {
          background: #f0fdf4 !important;
        }

        /* Reset nested paragraphs inside table cells to 17px and proper line-height */
        .winera-blog-article-content table th p,
        .winera-blog-article-content table td p {
          margin: 0 !important;
          padding: 0 !important;
          font-size: 17px !important;
          line-height: 1.65 !important;
          min-height: auto !important;
          color: inherit !important;
          font-weight: inherit !important;
          word-break: break-word !important;
          overflow-wrap: anywhere !important;
          word-wrap: break-word !important;
          white-space: normal !important;
          word-spacing: normal !important;
          letter-spacing: normal !important;
          text-justify: none !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
        }

        .winera-blog-article-content table th p + p,
        .winera-blog-article-content table td p + p {
          margin-top: 4px !important;
        }

        /* Prevent oversized forced column inline widths from breaking container */
        .winera-blog-article-content table col {
          max-width: 100% !important;
        }

        /* Inline Images */
        .winera-blog-article-content img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 14px !important;
          margin: 26px auto !important;
          display: block !important;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08) !important;
        }

        /* Blockquotes, Lists & Links */
        .winera-blog-article-content blockquote {
          border-left: 4px solid #0284c7 !important;
          padding: 14px 22px !important;
          margin: 24px 0 !important;
          background: #f0f9ff !important;
          border-radius: 0 12px 12px 0 !important;
          font-style: italic !important;
          color: #0369a1 !important;
          text-align: left !important;
        }
        .winera-blog-article-content ul,
        .winera-blog-article-content ol {
          margin: 16px 0 24px 24px !important;
          padding-left: 10px !important;
          text-align: left !important;
        }
        .winera-blog-article-content li {
          margin-bottom: 8px !important;
          line-height: 1.8 !important;
          text-align: left !important;
        }
        .winera-blog-article-content strong,
        .winera-blog-article-content b {
          font-weight: 800 !important;
          color: #0f172a;
        }
        .winera-blog-article-content a {
          color: #0284c7 !important;
          font-weight: normal !important;
          text-decoration: underline !important;
        }
        .winera-blog-article-content strong a,
        .winera-blog-article-content b a,
        .winera-blog-article-content a strong,
        .winera-blog-article-content a b,
        .winera-blog-article-content h1 a,
        .winera-blog-article-content h2 a,
        .winera-blog-article-content h3 a,
        .winera-blog-article-content h4 a {
          font-weight: 700 !important;
        }
        .winera-blog-left-toc-sticky {
          position: sticky !important;
          top: 100px !important;
          align-self: flex-start !important;
          z-index: 10 !important;
        }
        .winera-blog-right-sidebar-sticky {
          position: sticky !important;
          top: 100px !important;
          align-self: flex-start !important;
          z-index: 10 !important;
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
          .winera-blog-top-header {
            margin-bottom: 18px !important;
          }
          .winera-blog-top-featured-img {
            border-radius: 16px !important;
            margin-bottom: 24px !important;
          }
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

