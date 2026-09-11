import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import blogHeroBg from '../assets/blog-hero-bg.webp';
import blogCardImg from '../assets/blog-images.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

const DEFAULT_BLOG_POSTS = [
  {
    id: 1,
    slug: 'soft-play-vs-trampoline-park',
    title: 'Soft Play vs Trampoline Park:',
    subtitle: 'Which Is Better for Your Space?',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: '5 min read',
    image: blogCardImg,
    excerpt: 'Soft play or trampoline park? Discover the key differences in investment, space requirements, safety, and revenue potential to decide which indoor entertainment option suits your business goals best.',
    fullContent: `Soft play or trampoline park? Discover the key differences in investment, space requirements, safety, and revenue potential to decide which indoor entertainment option suits your business goals best.

It sounds fun to plan an indoor space for fun. But it also means making a big choice. Should you put money into a trampoline park or make a soft play area? This choice has a direct impact on your customers' experience, foot traffic and sales.

A lot of business owners talk to a professional trampoline park manufacturer before making a choice these days. That step helps keep things clear and saves money on mistakes later. Both choices are good. But each one is meant for a different group of people and has a different business goal. So, knowing the difference will help you make a space that works well and grows steadily.

Let's make it easier to understand.

### Understanding Soft Play Areas

Soft play areas are mostly for little kids. These areas are bright, safe and friendly. Everything has padding. So kids can freely climb, crawl and look around.

Parents love areas for soft play. They feel at ease because the chance of getting hurt is low. That sense of peace is very important. Because of this, families spend more time in the building.

They are also easy to fit into small spaces. You don't need big spaces or high ceilings. Also, upkeep is still easy to handle. Cleaning and taking care of things stay easy.

These areas are also good for kids' growth. Moving around helps with balance and coordination. Being around other people helps you feel more confident. So, soft play is great for malls, cafés and daycare centres.

But soft play is mostly for younger kids. That makes it harder for more people to see it.

### Understanding Trampoline Parks and Their Business Potential

Trampoline parks have a whole different vibe. They draw in kids, teens and even adults. A reliable trampoline park manufacturer makes these parks with strong materials and high-tech safety features. This makes sure that it works well and is safe for a long time.

These parks are more than just places to have fun. They mix fitness with fun. Jumping makes your heart healthier, your muscles stronger and your stamina better. Visitors also have a great time at the same time.

Trampoline parks can make a lot of money for businesses. You can have birthday parties, school events and fitness classes. So, chances to make money naturally go up.

Professional design also makes things safer. Visitors are safe because of structured layouts, padding and safety nets. Customers feel safe because of this and come back often.

That repeat business leads to steady growth.

### Key Differences Between Soft Play and Trampoline Parks

1. Target Audience
Toddlers and young kids like soft play areas. These quiet places are better for parents. Trampoline parks, on the other hand, are fun for people of all ages. This greatly increases the number of people who can buy from you.

2. Space Requirements
Soft play areas are great for small spaces. They fit into different spaces easily. Trampoline parks, on the other hand, need higher ceilings and more space. Planning ahead makes sure that space is used well.

3. Investment and Profit Potential
It costs less to set up soft play areas at first. The costs of upkeep are also still reasonable. Trampoline parks, on the other hand, can make more money. Having more than one activity can help you make more money.

4. Safety and Engineering
Soft play areas use soft materials to keep people safe. This protects little kids. Trampoline parks, on the other hand, use safety systems that have been designed. Having a professional install it makes sure it will work and last.

### Why Professional Manufacturing Support Matters?

Getting help from an expert makes things easier. Professional builders help you with planning the design, installation and safety. This makes sure that you will be successful in the long run.

### Conclusion

Trampoline parks and soft play areas are both good places to do business. Soft play makes a safe place for little kids to play. Trampoline parks bring in more people and have a better chance of making money.

The best choice depends on your space, your audience and your long-term goals. A lot of business owners trust partners who have been around for a while to make this process easier.

Winera International Private Limited is a top trampoline park manufacturer that offers dependable and personalised solutions. Their knowledge helps turn your idea into a fun, safe and profitable place to hang out.`
  },
  {
    id: 2,
    slug: 'what-can-indoor-playground-equipment-do-for-our-kids',
    title: 'What Can Indoor Playground Equipment',
    subtitle: 'Do for Our Kids?',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: '4 min read',
    image: blogCardImg,
    excerpt: 'Indoor playground equipment helps children grow stronger, build confidence, and develop essential social skills — thoughtfully designed by experienced indoor play equipment manufacturers.',
    fullContent: `Indoor playground equipment helps children grow stronger, build confidence, and develop essential social skills — thoughtfully designed by experienced indoor play equipment manufacturers.

Kids today spend too much time inside and not the kind that helps them grow. Screens, strict schedules and not enough safe places to play have made free play less common. But here's the thing. Play is not an option. It helps kids learn, gain confidence and get stronger in every way. Physically, emotionally and socially. That's why it's important to have well-planned indoor playgrounds. With the help of a professional indoor play equipment manufacturer, these play areas can be more than just fun. They become strong places where kids do well.

Let’s talk about how indoor playgrounds are helping shape better futures for our kids.

### Physical Development Through Play

You know how kids get excited when they run, climb, or jump? That's not just fun. It's development in action. Their bodies learn every time they go down a slide or climb a rope wall. Muscles get stronger. Your balance gets better. Your coordination gets better.

Indoor playgrounds, on the other hand, let kids move around no matter what the weather is like. You don't have to stop playing just because it's too hot, raining, or cold outside. Kids stay healthy and full of energy by doing this all the time. It also lowers the risk of obesity in kids and helps them develop healthy habits for life.

### Designed by an Indoor Play Equipment Manufacturer for Maximum Impact

Good design is not an accident. A good indoor play equipment manufacturer is not just about designing a playground based on colours and shapes. They are more concerned about child psychology, their requirements based on different age groups, and safety.

This means designing a playground made of safe materials, designing a layout that is not just safe but interesting for kids to play in, and designing a playground where kids love to return time and again. The playground is designed to provide children the freedom to play, take safe risks, have fun, and develop skills in a variety of ways.

### Boosting Cognitive and Emotional Growth

Play is the first classroom. When kids play in an indoor playground, they are not just running around in a playground. They are solving puzzles, making decisions, and trying new things, all of which are beneficial to their overall growth.

### Encouraging Social Interaction and Teamwork

Kids get together at playgrounds. They learn to work together, wait their turn and help each other in these places. Every time kids play together, they learn how to talk to each other, understand each other and work as a team.

These lessons are small but very important. And they matter even more now that so much communication happens through screens instead of in person.

### Safety and Accessibility

It's okay to be concerned about safety. A good play area should feel safe. The best companies use soft floors, safe edges and strong tools. More importantly, designs that are open to everyone make sure that all kids can have fun in the space. That kind of access makes people feel like they are equal and belong.

### Conclusion

Playgrounds aren't just a nice thing to have. They're necessary for raising happy, confident and well-rounded kids. And the first step to making one the right way is to find a partner who understands.`
  },
  {
    id: 3,
    slug: 'trampoline-park-vs-soft-play-area-which-is-best-for-small-spaces',
    title: 'Trampoline Park vs Soft Play Area:',
    subtitle: 'Which is Best for Small Spaces?',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: '4 min read',
    image: blogCardImg,
    excerpt: 'Trampoline parks vs. soft play areas: Which is the best choice for small commercial spaces? Explore space requirements, floor height, and ROI.',
    fullContent: `Trampoline parks vs. soft play areas: Which is the best choice for small commercial spaces? Explore space requirements, floor height, and ROI.

When designing a commercial entertainment center in a limited footprint (e.g. 1,500 to 3,000 sq. ft. in a mall or commercial complex), selecting the right equipment layout is critical for maximizing capacity and customer experience.

### Ceiling Height & Vertical Volume

Soft play structures can be custom built into 2-tier or 3-tier vertical mazes within standard 3.5m ceiling heights. Trampoline parks, however, demand high clearance for safety and aerial bounce space.

### Turnkey Solutions from Winera

Winera International provides complete 3D layout design and turnkey installation tailored to your specific building dimensions.`
  },
  {
    id: 4,
    slug: 'why-turnkey-manufacturing-solutions-are-best-for-new-amusement-businesses',
    title: 'Why Turnkey Manufacturing Solutions Are',
    subtitle: 'Best for New Amusement Businesses',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: '5 min read',
    image: blogCardImg,
    excerpt: 'Learn how turnkey amusement park solutions help new business owners launch faster, reduce operational risks, and maximize opening day revenue.',
    fullContent: `Learn how turnkey amusement park solutions help new business owners launch faster, reduce operational risks, and maximize opening day revenue.

Starting an amusement venue involves layout planning, equipment manufacturing, shipping, safety certification, and staff training. Working with a single turnkey partner like Winera International simplifies every stage from empty floor to ready-to-open venue.`
  },
  {
    id: 5,
    slug: 'the-history-and-some-fun-facts-about-bumper-cars',
    title: 'The History and Some Fun Facts About',
    subtitle: 'Bumper Cars',
    date: 'AUG 22, 2026',
    author: 'Divyang Mandani',
    category: 'INSIGHTS',
    readTime: '3 min read',
    image: blogCardImg,
    excerpt: 'Explore the fascinating history of bumper cars and fun facts about how electric Dodgems evolved into modern battery and floor-grid attractions.',
    fullContent: `Explore the fascinating history of bumper cars and fun facts about how electric Dodgems evolved into modern battery and floor-grid attractions.

Bumper cars have been a staple of amusement parks and game zones for over a century. From early ceiling-grid powered cars to modern 360-degree LED battery bumper cars, discover how this iconic attraction continues to drive family fun.`
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
  const heroBg = getValidImageUrl(blogHero.bgUrl, blogHeroBg);

  const blogPosts = Array.isArray(siteData?.blogPosts) && siteData.blogPosts.length > 0
    ? siteData.blogPosts
    : DEFAULT_BLOG_POSTS;

  // Find post by ID or slug with fallback
  const defaultMatch = DEFAULT_BLOG_POSTS.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
  const post = blogPosts.find(p => String(p.id) === String(id) || String(p.slug) === String(id)) || defaultMatch || blogPosts[0];
  const postImg = getValidImageUrl(post?.image || post?.imgUrl, blogCardImg);

  // Recent/Related posts (excluding current post, max 3 items for 3-column grid)
  const recentPosts = blogPosts.filter(p => String(p.id) !== String(post.id));
  if (recentPosts.length < 3) {
    DEFAULT_BLOG_POSTS.filter(p => String(p.id) !== String(post.id)).forEach(p => {
      if (!recentPosts.some(rp => String(rp.id) === String(p.id))) {
        recentPosts.push(p);
      }
    });
  }

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
                <span>📅 {post.date || 'AUG 22, 2026'}</span>
                <span>•</span>
                <span>⏱️ {post.readTime || '5 min read'}</span>
                <span>•</span>
                <span>By <strong style={{ color: '#0f172a' }}>{post.author || 'Divyang Mandani'}</strong></span>
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
            </div>

          </div>

        </div>
      </section>

      {/* 4. WIDER FULL-WIDTH RELATED ARTICLES SECTION (MATCHING IMAGE 2 SPECIFICATION AT 1360PX WIDTH) */}
      <section style={{ padding: '60px 3vw 85px', background: '#F5F5F9', borderTop: '2px solid #cbd5e1' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '240px', height: '10px', margin: '0 auto 8px', objectFit: 'fill' }}
            />
            <h3 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.4px' }}>
              Related <span style={{ color: '#38bdf8' }}>Articles</span>
            </h3>
          </div>

          {/* 3-Column Vertical Cards Grid (Image 2 Format) */}
          <div className="winera-related-articles-full-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {recentPosts.slice(0, 3).map((recPost) => {
              const recImage = getValidImageUrl(recPost.image || recPost.imgUrl, blogCardImg);
              const recExcerpt = recPost.excerpt || recPost.line1 || 'Soft play or trampoline park? Discover the key differences in investment...';
              const truncatedExcerpt = formatExcerpt(recExcerpt, 80);

              return (
                <div
                  key={recPost.id}
                  onClick={() => navigate(`/blog/${recPost.id}`)}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '24px',
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 14px 35px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Card Top Image */}
                  <div style={{ width: '100%', height: '210px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, marginBottom: '16px', background: '#e0f2fe' }}>
                    <img
                      src={recImage}
                      alt={getFullTitle(recPost)}
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
                    {recPost.date || 'AUG 22, 2026'} &bull; <span style={{ color: '#0284c7' }}>{recPost.category || 'INSIGHTS'}</span>
                  </div>

                  {/* Blog Title & Subtitle */}
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#0f172a',
                    lineHeight: 1.35,
                    margin: '0 0 10px 0'
                  }}>
                    {getFullTitle(recPost)}
                  </h4>

                  {/* Excerpt Description */}
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                    flexGrow: 1
                  }}>
                    {truncatedExcerpt}
                  </p>

                  {/* Author Line at Bottom (Image 2 style) */}
                  <div style={{
                    paddingTop: '14px',
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginTop: 'auto'
                  }}>
                    By {recPost.author || 'Divyang Mandani'}
                  </div>
                </div>
              );
            })}
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

