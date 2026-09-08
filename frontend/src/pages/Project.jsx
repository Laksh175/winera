import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import CtaBanner from '../components/CtaBanner';

import projectBanner from '../assets/main-project-bg.webp';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';
import projSoft1 from '../assets/proj-softplay1.webp';
import projectImage01 from '../assets/project-image01.webp';
import projectImage3 from '../assets/project-image-3.webp';
import projectImage4 from '../assets/project-image-4.webp';
import projectCtaBg from '../assets/project-cta-bg.webp';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';

const resolveProjectImg = (proj) => {
  const slug = (proj?.slug || '').toLowerCase();
  const name = (proj?.name || '').toLowerCase();
  const category = (proj?.category || '').toLowerCase();
  const url = proj?.img || proj?.imgUrl || '';

  if (url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) {
    return url;
  }
  if (url && typeof url === 'string' && url.startsWith('/uploads')) {
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    return `http://${hostname}:5001${url}`;
  }

  if (slug.includes('hulaboo') || name.includes('hulaboo')) return projHulaboo;
  if (slug.includes('neon') || name.includes('neon')) return projNeon1;
  if (slug.includes('softplay') || slug.includes('playzonia') || name.includes('playzonia') || name.includes('soft play') || name.includes('softplay') || name.includes('hoppers') || name.includes('kidzonation') || name.includes('pepe')) return projSoft1;
  if (slug.includes('fifthalley') || name.includes('fifthalley') || slug.includes('bowling') || name.includes('bowling') || name.includes('lanex') || name.includes('rock and bowl') || name.includes('funevers')) return projectImage01;
  if (category.includes('bowling')) return projectImage01;
  if (category.includes('soft play') || category.includes('softplay')) return projSoft1;
  if (category.includes('arcade') || category.includes('game zone') || category.includes('gamezone')) return projHulaboo;

  return projectImage01;
};

export default function Project({ siteData }) {
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;
  const heroData = siteData?.projectHero || {};
  const seoData = siteData?.projectSeo || {};
  const ctaData = siteData?.projectCta || {};

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

  const renderTitleMarkup = (titleText, fallbackMarkup, accentColor = '#38bdf8') => {
    const text = titleText !== undefined && titleText !== null && titleText !== '' ? titleText : fallbackMarkup;
    if (typeof text !== 'string') return text;

    let processed = text
      .replace(/<cyan>(.*?)<\/cyan>/gi, `<span style="color: ${accentColor};">$1</span>`)
      .replace(/\*(.*?)\*/g, '<span style="color: #ffcd00;">$1</span>')
      .replace(/\n/g, '<br />');

    return <span dangerouslySetInnerHTML={{ __html: processed }} />;
  };

  const bannerImg = getValidImageUrl(heroData.bannerImg, projectBanner);
  const breadcrumbHome = heroData.breadcrumbHome || 'Home';
  const breadcrumbPage = heroData.breadcrumbPage || 'Project';
  const ctaBg = getValidImageUrl(ctaData.bgUrl, projectCtaBg);
  const ctaLink = ctaData.buttonLink || "https://wa.me/919428989488";

  const [activeCategory, setActiveCategory] = useState("All");

  // Complete List of All 40+ Projects with categories & images
  const allProjects = [
    {
      id: "fifthalley",
      name: "FifthAlley Sport Bowling",
      category: "Bowling",
      city: "Surat",
      state: "Gujarat",
      slug: "fifthalley-sport-bowling",
      img: projectImage01
    },
    {
      id: "hulaboo",
      name: "Hulaboo Game Zone",
      category: "Game Zones",
      city: "Surat",
      state: "Gujarat",
      slug: "hulaboo",
      img: projHulaboo
    },
    {
      id: "playzonia",
      name: "Playzonia Kids Play Area",
      category: "Soft Play",
      city: "Surat",
      state: "Gujarat",
      slug: "playzonia",
      img: projSoft1
    },
    {
      id: "lanex",
      name: "LaneX Bowling Alley by Rajhans",
      category: "Bowling",
      city: "Surat",
      state: "Gujarat",
      slug: "lanex-bowling-alley",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "funfair",
      name: "Funfair Game Zone",
      category: "Game Zones",
      city: "Surat",
      state: "Gujarat",
      slug: "funfair",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "neonpanda",
      name: "Neon Panda Trampoline & Gamezone",
      category: "Game Zones",
      city: "Indore",
      state: "Madhya Pradesh",
      slug: "neon-panda",
      img: projNeon1
    },
    {
      id: "rebounce",
      name: "Rebounce Game Zone",
      category: "Game Zones",
      city: "Surat",
      state: "Gujarat",
      slug: "rebounce",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kingsman",
      name: "Kingsman Arcade & VR",
      category: "Arcade & VR",
      city: "Navi Mumbai",
      state: "Maharashtra",
      slug: "kingsman-arcade-vr",
      img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "houseofpepe",
      name: "House of Pepe Softplay & Arcade",
      category: "Soft Play",
      city: "Kolkata",
      state: "West Bengal",
      slug: "house-of-pepe",
      img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "oneup",
      name: "1 Up Game Zone",
      category: "Game Zones",
      city: "Gauhati",
      state: "Assam",
      slug: "1-up-game-zone",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "happyhoppers",
      name: "Happy Hoppers Soft Play",
      category: "Soft Play",
      city: "Kolkata",
      state: "West Bengal",
      slug: "happy-hoppers",
      img: projSoft1
    },
    {
      id: "kidzania",
      name: "Kidzania Arcade Games",
      category: "Arcade & VR",
      city: "Delhi",
      state: "Delhi",
      slug: "kidzania-delhi",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "funevers",
      name: "Funevers Bowling",
      category: "Bowling",
      city: "Bhopal",
      state: "Madhya Pradesh",
      slug: "funevers-bowling",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kidzonation",
      name: "Kidzonation Softplay",
      category: "Soft Play",
      city: "Bhopal",
      state: "Madhya Pradesh",
      slug: "kidzonation",
      img: projSoft1
    },
    {
      id: "rockandbowl",
      name: "Rock and Bowl Vapi",
      category: "Bowling",
      city: "Vapi",
      state: "Gujarat",
      slug: "rock-and-bowl-vapi",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "zestopia",
      name: "Zestopia Game Zone",
      category: "Game Zones",
      city: "Surat",
      state: "Gujarat",
      slug: "zestopia",
      img: projHulaboo
    },
    {
      id: "redisson",
      name: "Hotel Redisson & Marriot Resort",
      category: "Hospitality",
      city: "Kamrej, Surat",
      state: "Gujarat",
      slug: "hotel-redisson-marriott",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "kkbrio",
      name: "KKB Rio Colina - Club & Villa",
      category: "Hospitality",
      city: "Surat",
      state: "Gujarat",
      slug: "kkb-rio-colina",
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const fifthAlleyObj = {
    id: "fifthalley",
    name: "FifthAlley Sport Bowling",
    category: "Bowling",
    city: "Surat",
    state: "Gujarat",
    area: "3,000 sq. ft.",
    type: "Bowling Alley Setup",
    slug: "fifthalley-sport-bowling",
    img: projectImage01
  };

  const rawProjectList = (Array.isArray(siteData?.projectItems) && siteData.projectItems.length > 0)
    ? siteData.projectItems
    : allProjects;

  const hasFifthAlley = rawProjectList.some(p => p.slug === "fifthalley-sport-bowling" || (p.name || "").toLowerCase().includes("fifthalley"));
  const projectList = hasFifthAlley ? rawProjectList : [fifthAlleyObj, ...rawProjectList];

  const baseCategories = (Array.isArray(siteData?.projectCategories) && siteData.projectCategories.length > 0)
    ? siteData.projectCategories
    : ["Game Zones", "Bowling", "Soft Play", "Arcade & VR", "Hospitality"];

  // Merge unique categories from projectCategories and project list
  const dynamicCategories = Array.from(new Set([
    ...baseCategories,
    ...projectList.map(p => p.category).filter(Boolean)
  ]));

  const categoriesList = ["All", ...dynamicCategories];

  const sectionTitle = siteData?.projectHeader?.title || "Crafting *India's Best Play Destinations*";

  const filteredProjects = activeCategory === "All"
    ? projectList
    : projectList.filter(p => (p.category || "").toLowerCase().includes(activeCategory.toLowerCase()));

  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = seoData.pageTitle || seoData.title || "Our Projects | Game Zones & Play Destinations | Winera International";
    const metaDesc = seoData.metaDescription || "Explore Winera International's completed game zone, bowling alley, soft play, and VR projects across India. Planned, designed, and delivered turnkey.";

    document.title = pageTitle;

    let metaDesc_el = document.querySelector('meta[name="description"]');
    if (!metaDesc_el) {
      metaDesc_el = document.createElement('meta');
      metaDesc_el.setAttribute('name', 'description');
      document.head.appendChild(metaDesc_el);
    }
    metaDesc_el.setAttribute('content', metaDesc);
  }, [seoData]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#F5F5F9', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-project-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${bannerImg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Breadcrumb: Home › Project */}
          <h1 className="winera-project-hero-h1" style={{
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
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>{breadcrumbHome}</Link>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>{breadcrumbPage}</span>
          </h1>
        </div>
      </section>

      {/* 3. MAIN CATALOG & FILTER TABS SECTION */}
      <section style={{ padding: '70px 4vw 35px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* Title: Crafting India's Best Play Destinations */}
        <SectionHeading marginBottom="45px" accentWidth="220px" accentMaxWidth="260px">
          {sectionTitle}
        </SectionHeading>

        {/* CATEGORY FILTER TABS PILL BAR (MATCHING IMAGE 1 1:1) */}
        <div style={{
          background: 'rgba(224, 242, 254, 0.75)',
          border: '1px solid #bde0fe',
          borderRadius: '10px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '880px',
          margin: '0 auto 50px',
          boxShadow: 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            overflowX: 'auto',
            width: '100%',
            scrollbarWidth: 'none',
            paddingRight: '6px'
          }}>
            {categoriesList.map((cat, idx) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '20px',
                    border: 'none',
                    background: isSelected ? '#38bdf8' : '#ffffff',
                    color: isSelected ? '#0f172a' : '#475569',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: 'none',
                    transition: 'all 0.25s ease',
                    flex: '0 0 auto',
                    textAlign: 'center'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Chevron Arrow Button matching Image 1 */}
          <button
            onClick={() => {
              const currentIdx = categoriesList.indexOf(activeCategory);
              const nextIdx = (currentIdx + 1) % categoriesList.length;
              setActiveCategory(categoriesList[nextIdx]);
            }}
            aria-label="Next Category"
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: '8px',
              border: '1px solid #90caf9',
              background: '#bde0fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '8px',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#38bdf8'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#bde0fe'; e.currentTarget.style.color = '#0284c7'; }}
          >
            <ChevronRight style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
          </button>
        </div>

        {/* PROJECTS CARDS GRID (3 COLUMNS) */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const isLeft = idx % 3 === 0;
              const isRight = idx % 3 === 2;
              const startX = isLeft ? -70 : (isRight ? 70 : 0);
              const startY = isLeft || isRight ? 0 : 50;

              return (
                <motion.div
                  key={proj.id}
                  layout
                  data-framer-motion="true"
                  initial={{ opacity: 0, x: startX, y: startY, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(0, 174, 239, 0.22)',
                  }}
                  transition={{
                    duration: 0.7,
                    delay: (idx % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  style={{
                    borderRadius: '28px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '360px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                    background: `url(${resolveProjectImg(proj)}) center/cover no-repeat`,
                    cursor: 'pointer',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    willChange: 'transform',
                  }}
                >
                  <Link
                    to={`/project/${proj.slug}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      textDecoration: 'none',
                      position: 'relative',
                      zIndex: 2,
                    }}
                    className="winera-project-card-hover"
                  >
                    {/* Gradient Overlay & Details Footer */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '24px 26px'
                    }}>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
                          {proj.name}
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#cbd5e1', fontWeight: '600', margin: 0, textTransform: 'capitalize' }}>
                          {proj.city}, {proj.state}
                        </p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.15, backgroundColor: '#38bdf8' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        aria-label={`View details for ${proj.name}`}
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(6px)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1.5px solid rgba(255,255,255,0.4)',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <ArrowRight style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. CTA BANNER SECTION */}
      <CtaBanner
        showOverlay={false}
        align="center"
        buttonTheme="yellow"
        sectionPadding="20px 4vw 30px"
        bgUrl={
          siteData?.projectCta?.bgUrl && !siteData.projectCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.projectCta.bgUrl, projectCtaBg)
            : null
        }
        bg={projectCtaBg}
        tagline={null}
        title={
          siteData?.projectCta?.title ? (
            renderTitleMarkup(siteData.projectCta.title, "*Planning a Game Zone* <cyan>of Your Own?</cyan>", "#ffcd00")
          ) : (
            <>
              <span style={{ color: '#ffcd00', textShadow: '0 4px 18px rgba(0,0,0,0.85), 2px 2px 4px rgba(0,0,0,0.95)' }}>
                Planning a Game Zone{' '}
              </span>
              <span style={{ color: '#38bdf8', textShadow: '0 4px 18px rgba(0,0,0,0.85), 2px 2px 4px rgba(0,0,0,0.95)' }}>
                of Your Own?
              </span>
            </>
          )
        }
        subtitle={null}
        description={
          siteData?.projectCta?.description !== undefined
            ? siteData.projectCta.description
            : "Give us the space, and we'll deliver a complete game zone — planned, built, and ready to play. Your only job is to open the doors."
        }
        descriptionFontSize="17px"
        buttonText={
          siteData?.projectCta?.buttonText !== undefined
            ? siteData.projectCta.buttonText
            : "Get a Free Consultation"
        }
        buttonLink={
          siteData?.projectCta?.buttonLink !== undefined
            ? siteData.projectCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* 5. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
