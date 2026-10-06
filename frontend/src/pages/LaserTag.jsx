import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import laserTagHeroBg from '../assets/blog-hero-bg.webp';
import gameZoneMobileBanner from '../assets/game_zone_mobile_banner.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import laserTagImg1 from '../assets/laser-tag-1.png';
import laserTagImg2 from '../assets/laser-tag-2.png';
import laserTagBg3 from '../assets/laser-tag-bg-3.png';
import laserTagBg4 from '../assets/laser-tag-4.png';
import laserTagImg3 from '../assets/laser-tag-3.png';
import laserTagImg3Border from '../assets/laser-tag-3-border.png';
import laserTagImg5 from '../assets/laser-tag-5.png';
import laserTagIcon5 from '../assets/laser-tag-5-icon.png';
import laserTagImg6 from '../assets/laser-tag-6.png';
import laserTagImg6Small from '../assets/laser-tag-6-2.png';
import laserTagImg6Bg from '../assets/laser-tag-6-bg.png';
import laserTagImg6Btn from '../assets/laser-tag-6-button.png';
import laserSpyIcon1 from '../assets/laser-6-icon1.png';
import laserSpyIcon2 from '../assets/laser-6-icon2.png';
import laserSpyIcon3 from '../assets/laser-6-icon3.png';
import laserSpyIcon4 from '../assets/laser-6-icon4.png';
import laserSpyIcon5 from '../assets/lasr-6-icon5.png';
import homePageIcon from '../assets/home-page-icon.png';
import downloadButtonImg from '../assets/download-button.png';
import MobileExpandableText from '../components/MobileExpandableText';
import { FileText, Shield, Activity, Crosshair, Users, Tv, Sparkles, Sliders, Target } from 'lucide-react';

// Helper to resolve valid image URLs or fallback
const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:5001${url}`;
  if (url.startsWith('/assets/') || url.startsWith('/src/assets/')) return fallback;
  return url;
};

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  let text = rawText || defaultText;
  if (!text) return null;

  text = text.replace(/([^\s>])(<br\s*\/?>)/gi, '$1 $2').replace(/(<br\s*\/?>)([^\s<])/gi, '$1 $2');
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    const lines = part.split(/<br\s*\/?>/i);
    const renderedContent = lines.map((line, lIdx) => (
      <React.Fragment key={lIdx}>
        {lIdx > 0 && <br />}
        {line}
      </React.Fragment>
    ));

    if (isHighlighted) {
      return (
        <span key={pIdx} style={{ color: highlightColor }}>
          {renderedContent}
        </span>
      );
    }
    return <React.Fragment key={pIdx}>{renderedContent}</React.Fragment>;
  });
};

const defaultGroupsFeatures = [
  "Laser guns with lights and a small screen, and vests that show each hit right away",
  "Wireless charging, so you don't have to wait between games",
  "Home base points and power-ups that make the game more fun",
  "A TV to explain the rules, and a live score screen that makes players want to play again",
  "Full sound, game software, setup, and staff training all done by our team"
];

const defaultSpecsRows = [
  { spec: "Players", details: "10 to 30+ simultaneously" },
  { spec: "Guns & vests", details: "Start with 8, add more anytime" },
  { spec: "Staff needed", details: "Just 1 person" },
  { spec: "Game types", details: "Team battle, solo, elimination, capture the flag" },
  { spec: "Lasts for", details: "8–10 years" }
];

const defaultSpySpecsRows = [
  { spec: "Smallest space", details: "150 sq ft" },
  { spec: "Best space", details: "Around 560 sq ft" },
  { spec: "Tasks", details: "3–4 team tasks + 1 main challenge" },
  { spec: "Staff needed", details: "Just 1 person" },
  { spec: "Scoreboard", details: "Automatic TV leaderboard" }
];

const defaultSpaceZones = [
  {
    num: "01",
    title: "BRIEFING AREA",
    subtitle: "(EXPLAIN THE RULES)",
    space: "~150 sq ft",
    iconType: "rules"
  },
  {
    num: "02",
    title: "VESTING AREA",
    subtitle: "(PLAYERS GEAR UP)",
    space: "~250 sq ft",
    iconType: "vest"
  },
  {
    num: "03",
    title: "PLAY AREA",
    subtitle: "(COMBAT ZONE)",
    space: "7–8 sq ft / pl",
    iconType: "play"
  }
];

const defaultSpyFeatures = [
  "Laser guns with lights and a small screen, and vests that show each hit right away",
  "3 to 4 team games and one big final game",
  "A 40-inch TV that shows the top players",
  "Glowing lights, UV art, and smoke machines for a cool spy look",
  "Control panels, game software, sound system, and staff training — all by our team"
];

const laserSpyIcons = [laserSpyIcon1, laserSpyIcon2, laserSpyIcon3, laserSpyIcon4, laserSpyIcon5];

const defaultComparisonFeatures = [
  "How to play",
  "Space needed",
  "Players at once",
  "Best for",
  "Earns money from",
  "The feel"
];

const defaultLasertagPoints = [
  { text: "Teams shoot each other with laser guns in an open arena" },
  { text: "A big open room" },
  { text: "10 to 30+" },
  { text: "Big groups, parties, and events" },
  { text: "Group bookings and parties" },
  { text: "Fast, active team battle" }
];

const defaultLaserspyPoints = [
  { text: "Players move through laser beams without touching them" },
  { text: "A small room (from 150 sq ft)" },
  { text: "A few at a time" },
  { text: "Quick play and small spaces" },
  { text: "Repeat play and walk-ins" },
  { text: "A cool spy-movie challenge" }
];

const formatComparisonPointText = (rawText) => {
  if (!rawText || typeof rawText !== 'string') return rawText || '';
  let text = rawText.trim();
  if (text.includes('<br') || text.includes('\n')) {
    return text;
  }
  const breakMap = [
    { match: /Teams shoot each other with laser guns in an open arena/i, replacement: "Teams shoot each other<br/>with laser guns in an<br/>open arena" },
    { match: /Big groups, parties, and events/i, replacement: "Big groups, parties, and<br/>events" },
    { match: /Group bookings and parties/i, replacement: "Group bookings and<br/>parties" },
    { match: /Players move through laser beams without touching them/i, replacement: "Players move through<br/>laser beams without<br/>touching them" },
    { match: /A small room \(from 150 sq ft\)/i, replacement: "A small room (from 150<br/>sq ft)" },
    { match: /Quick play and small spaces/i, replacement: "Quick play and small<br/>spaces" },
    { match: /Repeat play and walk-ins/i, replacement: "Repeat play and walk-<br/>ins" },
    { match: /A cool spy-movie challenge/i, replacement: "A cool spy-movie<br/>challenge" },
    { match: /Fast, active team battle/i, replacement: "Fast, active team battle" }
  ];
  for (const { match, replacement } of breakMap) {
    if (match.test(text)) {
      return replacement;
    }
  }
  return text;
};

const LaserTagComparisonSlider = ({ features = [], lasertagPoints = [], laserspyPoints = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef(0);

  const cleanText = (t) => {
    if (!t || typeof t !== 'string') return '';
    return t.replace(/<br\s*\/?>/gi, ' ').trim();
  };

  const total = Array.isArray(features) && features.length > 0 ? features.length : 6;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
  };

  const currentFeature = features[activeIndex] || "";
  const currentLaserTag = cleanText(lasertagPoints[activeIndex]?.text || "");
  const currentLaserSpy = cleanText(laserspyPoints[activeIndex]?.text || "");

  return (
    <div className="winera-lasertag-comparison-mobile">
      <div
        className="winera-lasertag-comparison-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Feature Name Header */}
        <div className="winera-comparison-card-header">
          <span className="winera-comparison-step-badge">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h4 className="winera-comparison-feature-title">
            {currentFeature}
          </h4>
        </div>

        {/* 1. Left Side Point: Laser Tag */}
        <div className="winera-comparison-option-box electric-box">
          <div className="winera-comparison-option-badge electric-badge">
            🔫 Laser Tag
          </div>
          <p className="winera-comparison-option-text">
            {currentLaserTag}
          </p>
        </div>

        {/* VS Divider */}
        <div className="winera-comparison-vs-divider">
          <span>VS</span>
        </div>

        {/* 2. Right Side Point: Laser Spy */}
        <div className="winera-comparison-option-box battery-box">
          <div className="winera-comparison-option-badge battery-badge">
            🎯 Laser Spy
          </div>
          <p className="winera-comparison-option-text">
            {currentLaserSpy}
          </p>
        </div>
      </div>

      {/* Slider Controls: Prev Button, Dot Indicators, Next Button */}
      <div className="winera-comparison-slider-controls">
        <button
          type="button"
          onClick={handlePrev}
          className="winera-comparison-nav-btn"
          aria-label="Previous comparison"
        >
          &#10094;
        </button>

        <div className="winera-comparison-dots">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`winera-comparison-dot ${idx === activeIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="winera-comparison-nav-btn"
          aria-label="Next comparison"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default function LaserTag({ siteData }) {
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

  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.lasertagSeo?.pageTitle || "Laser Tag Equipment Supplier in India | Winera International";
    const metaDesc = siteData?.lasertagSeo?.metaDescription || "Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training.";

    document.title = pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [siteData]);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Laser Tag...</div>;

  const header = siteData?.header || {};
  const footer = siteData?.footer || {};
  const heroBgImage = getValidImageUrl(siteData?.lasertagHero?.bgUrl, laserTagHeroBg);
  const introImg = getValidImageUrl(siteData?.lasertagIntro?.mainImgUrl, laserTagImg1);
  const setupImg = getValidImageUrl(siteData?.lasertagSetup?.mainImgUrl, laserTagImg2);
  const groupsBg = getValidImageUrl(siteData?.lasertagGroups?.bgUrl, laserTagBg3);
  const groupsImg = getValidImageUrl(siteData?.lasertagGroups?.mainImgUrl, laserTagImg3);
  const groupsBorderImg = laserTagImg3Border;
  const specsBg = getValidImageUrl(siteData?.lasertagSpecs?.bgUrl, laserTagBg4);
  const spySpecsBg = getValidImageUrl(siteData?.lasertagSpySpecs?.bgUrl, laserTagBg4);
  const spaceImg = getValidImageUrl(siteData?.lasertagSpace?.mainImgUrl, laserTagImg5);
  const spyImg = getValidImageUrl(siteData?.lasertagSpy?.mainImgUrl, laserTagImg6);
  const spyBorderImg = getValidImageUrl(siteData?.lasertagSpy?.borderImgUrl, laserTagImg6Bg);
  const spySmallImg = getValidImageUrl(siteData?.lasertagSpy?.smallImgUrl, laserTagImg6Small);
  const spyBtnImg = getValidImageUrl(siteData?.lasertagSpy?.buttonImgUrl, laserTagImg6Btn);
  const spyBg = getValidImageUrl(siteData?.lasertagSpy?.bgUrl, laserTagBg3);

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. LASER TAG HERO BANNER SECTION */}
      <section className="winera-lasertag-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        aspectRatio: isPhone ? '941 / 550' : 'auto',
        paddingTop: isPhone ? '55px' : '165px',
        paddingBottom: isPhone ? '0px' : '75px',
        background: isPhone ? `url(${gameZoneMobileBanner}) center top / 100% 100% no-repeat` : `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › Laser Tag */}
          <h1 className="winera-lasertag-hero-h1" style={{
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
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.lasertagHero?.breadcrumbText || "Laser Tag"}
            </span>
          </h1>
        </div>
      </section>

      {/* 2.5 LASER TAG GAMING EQUIPMENT & LASER SPY SECTION (BLOCK 1) */}
      <section className="winera-lasertag-intro-section" style={{
        padding: isPhone ? '35px 5vw 20px' : '50px 4vw 25px',
        backgroundColor: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isPhone ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.15fr)',
          gap: isPhone ? '35px' : '50px',
          alignItems: 'center'
        }}>
          {/* Left Column: Heading, Description & Shape Button */}
          <div style={{ textAlign: isPhone ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: isPhone ? 'center' : 'flex-start' }}>
            {/* Yellow Accent Stroke Line */}
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '14px',
                objectFit: 'fill',
                marginLeft: isPhone ? 'auto' : '0',
                marginRight: isPhone ? 'auto' : '0'
              }}
            />

            {/* H2 Title with Auto Line Breaks & Exact Colors */}
            <h2 style={{
              fontSize: isPhone ? '26px' : '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.18,
              margin: '0 0 18px 0',
              textAlign: isPhone ? 'center' : 'left'
            }}>
              {(() => {
                const intro = siteData?.lasertagIntro;
                const highlight = intro?.titleHighlight || "Laser Tag Gaming Equipment";
                const normal = intro?.titleNormal || "& Laser Spy Supplier in India";

                if (highlight.trim() === "Laser Tag Gaming Equipment" && normal.trim() === "& Laser Spy Supplier in India") {
                  return (
                    <>
                      <span style={{ color: '#38bdf8' }}>Laser Tag Gaming</span>
                      <br />
                      <span style={{ color: '#38bdf8' }}>Equipment </span>
                      <span style={{ color: '#0f172a' }}>& Laser Spy</span>
                      <br />
                      <span style={{ color: '#0f172a' }}>Supplier in India</span>
                    </>
                  );
                }

                return (
                  <>
                    <span style={{ color: '#38bdf8' }}>
                      {highlight.split('\n').map((hLine, hIdx) => (
                        <React.Fragment key={hIdx}>
                          {hIdx > 0 && <br />}
                          {hLine}
                        </React.Fragment>
                      ))}
                    </span>
                    {' '}
                    <span style={{ color: '#0f172a' }}>
                      {normal.split('\n').map((nLine, nIdx) => (
                        <React.Fragment key={nIdx}>
                          {nIdx > 0 && <br />}
                          {nLine}
                        </React.Fragment>
                      ))}
                    </span>
                  </>
                );
              })()}
            </h2>

            {/* Description Text with Mobile Expandable Text */}
            <div style={{ marginBottom: '28px', maxWidth: '520px', width: '100%', textAlign: isPhone ? 'center' : 'left' }}>
              {(() => {
                const fullDesc = siteData?.lasertagIntro?.desc || "Turn your venue into a place people book again and again. We set up complete laser tag and laser spy games for venues across India. arenas equipment, design, installation, and support handled by our own team across 50+ cities.";
                const splitIndex = fullDesc.indexOf('. ', fullDesc.indexOf('. ') + 1);
                if (splitIndex !== -1 && isPhone) {
                  const p1 = fullDesc.substring(0, splitIndex + 1);
                  const p2 = fullDesc.substring(splitIndex + 2);
                  return (
                    <MobileExpandableText
                      preview={
                        <p style={{ fontSize: isPhone ? '14px' : '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: isPhone ? 'center' : 'left' }}>
                          {p1}
                        </p>
                      }
                      expandedContent={
                        <p style={{ fontSize: isPhone ? '14px' : '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '8px 0 0 0', textAlign: isPhone ? 'center' : 'left' }}>
                          {p2}
                        </p>
                      }
                    />
                  );
                }
                return (
                  <p style={{ fontSize: isPhone ? '14px' : '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: isPhone ? 'center' : 'left' }}>
                    {fullDesc}
                  </p>
                );
              })()}
            </div>

            {/* Get A Quote Button matching VR Games style */}
            <div className="winera-cyan-cta-wrapper">
              {(() => {
                const baseLink = siteData?.lasertagIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.lasertagIntro?.waMessage || "Hello Winera International! I want to get a quote for Laser Tag & Laser Spy Equipment setup. Please share details.";
                let hrefLink = baseLink;
                if (!baseLink.includes('text=')) {
                  const separator = baseLink.includes('?') ? '&' : '?';
                  hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
                }
                return (
                  <a
                    href={hrefLink}
                    target="_blank"
                    rel="noreferrer"
                    className="winera-cyan-cta-btn"
                  >
                    <span>{siteData?.lasertagIntro?.buttonText || "Get A Quote"}</span>
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Framed Cyber Image Graphic */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={introImg}
              alt="Laser Tag Gaming Equipment & Laser Spy Supplier in India"
              style={{
                width: '100%',
                maxWidth: '620px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </section>

      {/* 2.6 ONE TEAM FOR YOUR WHOLE LASER TAG SETUP SECTION (BLOCK 2) */}
      <section className="winera-lasertag-setup-section" style={{
        padding: isPhone ? '20px 5vw 25px' : '25px 4vw 35px',
        backgroundColor: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isPhone ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.25fr)',
          gap: isPhone ? '35px' : '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Graphic Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            order: isPhone ? 2 : 1
          }}>
            <img
              src={setupImg}
              alt="One Team for Your Whole Laser Tag & Laser Spy Setup"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Right Column: Heading & 2 Paragraphs */}
          <div style={{
            textAlign: isPhone ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isPhone ? 'center' : 'flex-start',
            order: isPhone ? 1 : 2
          }}>
            {/* Yellow Accent Stroke Line */}
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '14px',
                objectFit: 'fill',
                marginLeft: isPhone ? 'auto' : '0',
                marginRight: isPhone ? 'auto' : '0'
              }}
            />

            {/* H2 Title with Auto Line Breaks */}
            <h2 style={{
              fontSize: isPhone ? '26px' : '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.18,
              margin: '0 0 18px 0',
              textAlign: isPhone ? 'center' : 'left'
            }}>
              {(() => {
                const setup = siteData?.lasertagSetup;
                const highlight = setup?.titleHighlight || "Tag & Laser Spy Setup";
                const normal = setup?.titleNormal || "One Team for Your Whole Laser";

                if (highlight.trim() === "Tag & Laser Spy Setup" && normal.trim().includes("One Team for Your Whole")) {
                  return (
                    <>
                      <span style={{ color: '#0f172a' }}>One Team for Your Whole</span>
                      <br />
                      <span style={{ color: '#0f172a' }}>Laser </span>
                      <span style={{ color: '#38bdf8' }}>Tag & Laser Spy Setup</span>
                    </>
                  );
                }

                return (
                  <>
                    <span style={{ color: '#0f172a' }}>
                      {normal.split('\n').map((nLine, nIdx) => (
                        <React.Fragment key={nIdx}>
                          {nIdx > 0 && <br />}
                          {nLine}
                        </React.Fragment>
                      ))}
                    </span>
                    {' '}
                    <span style={{ color: '#38bdf8' }}>
                      {highlight.split('\n').map((hLine, hIdx) => (
                        <React.Fragment key={hIdx}>
                          {hIdx > 0 && <br />}
                          {hLine}
                        </React.Fragment>
                      ))}
                    </span>
                  </>
                );
              })()}
            </h2>

            {/* Paragraphs with Mobile Expandable Text */}
            <div style={{ maxWidth: '660px', width: '100%', textAlign: isPhone ? 'center' : 'left' }}>
              <MobileExpandableText
                preview={
                  <p style={{
                    fontSize: isPhone ? '14px' : '15px',
                    color: '#475569',
                    lineHeight: 1.65,
                    fontWeight: '500',
                    marginBottom: isPhone ? '0px' : '16px',
                    textAlign: isPhone ? 'center' : 'left'
                  }}>
                    {siteData?.lasertagSetup?.paragraph1 || "Winera International has set up laser tag and laser spy games for entertainment centres, malls, hotels, schools, and resorts across India since 2014. Every setup comes with the full equipment, game software, scoreboards, and complete arena setup."}
                  </p>
                }
                expandedContent={
                  <p style={{
                    fontSize: isPhone ? '14px' : '15px',
                    color: '#475569',
                    lineHeight: 1.65,
                    fontWeight: '500',
                    marginTop: isPhone ? '8px' : '0px',
                    marginBottom: '0px',
                    textAlign: isPhone ? 'center' : 'left'
                  }}>
                    {siteData?.lasertagSetup?.paragraph2 || "Before you order anything, we check your space size, how many players you want, and how you plan to run it. Then our own team handles everything — design, setup, and staff training across 50+ cities in India."}
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2.7 LASER TAG - GREAT FOR GROUPS SECTION (BLOCK 3) */}
      <section className="winera-lasertag-groups-section" style={{
        position: 'relative',
        width: '100%',
        background: isPhone ? 'none' : `url(${laserTagBg3}) center center / 100% 100% no-repeat`,
        backgroundColor: isPhone ? '#F5F5F9' : 'transparent',
        padding: isPhone ? '35px 5vw 40px' : '75px 4vw 85px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          {/* Top Centered Header */}
          <div style={{ textAlign: 'center', marginBottom: isPhone ? '30px' : '45px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '200px' : '240px',
                height: '8px',
                marginBottom: '12px',
                objectFit: 'fill',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
            <h2 style={{
              fontSize: isPhone ? '26px' : '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.2,
              margin: '0 0 12px 0'
            }}>
              <span style={{ color: '#38bdf8' }}>
                {siteData?.lasertagGroups?.titleHighlight || "Laser Tag - "}
              </span>
              <span style={{ color: '#0f172a' }}>
                {siteData?.lasertagGroups?.titleNormal || "Great for Groups"}
              </span>
            </h2>
            <p style={{
              fontSize: isPhone ? '13.5px' : '14.5px',
              color: '#475569',
              lineHeight: 1.65,
              fontWeight: '500',
              maxWidth: '740px',
              margin: '0 auto'
            }}>
              {siteData?.lasertagGroups?.desc || "Laser tag fills fast because groups book many players at once at birthday parties, office teams, and school outings. We supply the complete game and set it up fully, so you're ready to take bookings from day one."}
            </p>
          </div>

          {/* 2-Column Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : '1.1fr 1fr',
            gap: isPhone ? '35px' : '50px',
            alignItems: 'center'
          }}>
            {/* Left: What you get, fully set up + Checklist items */}
            <div>
              <h3 style={{
                fontSize: isPhone ? '18px' : '21px',
                fontWeight: '900',
                color: '#0f172a',
                margin: '0 0 22px 0'
              }}>
                {siteData?.lasertagGroups?.listHeading || "What you get, fully set up:"}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {(Array.isArray(siteData?.lasertagGroups?.features) && siteData.lasertagGroups.features.length > 0
                  ? siteData.lasertagGroups.features
                  : defaultGroupsFeatures
                ).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <img
                      src={homePageIcon}
                      alt="check"
                      style={{ width: isPhone ? '18px' : '22px', height: isPhone ? '18px' : '22px', flexShrink: 0, marginTop: '4px', objectFit: 'contain' }}
                    />
                    <span style={{
                      fontSize: isPhone ? '15px' : '20px',
                      color: 'rgb(45, 45, 1)',
                      fontWeight: '400',
                      lineHeight: 1.55
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Framed Cyber Image with border image behind */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                aspectRatio: '630 / 492'
              }}>
                <img
                  src={groupsBorderImg}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
                <img
                  src={groupsImg}
                  alt="Laser Tag - Great for Groups"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${(616 / 630) * 100}%`,
                    height: `${(482 / 492) * 100}%`,
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.8 TECHNICAL SPECIFICATIONS CARD SECTION */}
      <section className="winera-lasertag-specs-section" style={{
        padding: isPhone ? '25px 4vw 35px' : '35px 4vw 50px',
        backgroundColor: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div className="winera-lasertag-specs-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: isPhone ? '24px' : '36px',
          overflow: 'hidden',
          background: isPhone ? `#051b47` : `url(${specsBg}) center center / 100% 100% no-repeat`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          padding: isPhone ? '35px 20px 35px' : '50px 50px 45px',
          minHeight: isPhone ? 'auto' : '580px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          {/* Top Title: Technical Specifications with Yellow Accent Stroke */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: isPhone ? '20px' : '28px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '10px',
                objectFit: 'fill'
              }}
            />
            <h2 style={{
              fontSize: isPhone ? '26px' : '36px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0
            }}>
              <span style={{ color: '#ffcd00' }}>
                {siteData?.lasertagSpecs?.titleHighlight || "Technical"}
              </span>
              {' '}
              <span style={{ color: '#ffffff' }}>
                {siteData?.lasertagSpecs?.titleNormal || "Specifications"}
              </span>
            </h2>
          </div>

          {/* Yellow Border Container for Table matching Hypergrid */}
          <div style={{
            border: '2px solid #ffcd00',
            borderRadius: isPhone ? '18px' : '24px',
            background: '#ffffff',
            padding: isPhone ? '18px 20px' : '24px 35px',
            maxWidth: '610px',
            width: '100%',
            marginBottom: isPhone ? '25px' : '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isPhone ? '280px' : 'auto' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px 20px 12px 0',
                    fontSize: isPhone ? '20px' : '27px',
                    fontWeight: '700',
                    color: '#0f172a',
                    width: '52%'
                  }}>
                    {siteData?.lasertagSpecs?.specHeading || "Specification"}
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px 0 12px 20px',
                    fontSize: isPhone ? '20px' : '27px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    {siteData?.lasertagSpecs?.detailsHeading || "Details"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.lasertagSpecs?.rows) && siteData.lasertagSpecs.rows.length > 0
                  ? siteData.lasertagSpecs.rows
                  : defaultSpecsRows
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{
                      padding: '11px 20px 11px 0',
                      fontSize: isPhone ? '14px' : '16px',
                      fontWeight: '400',
                      color: '#0f172a'
                    }}>
                      {row.spec}
                    </td>
                    <td style={{
                      padding: '11px 0 11px 20px',
                      fontSize: isPhone ? '14px' : '16px',
                      fontWeight: '400',
                      color: '#334155'
                    }}>
                      {row.details || row.detail || row.value || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA Button: Download Our Brochure matching Hypergrid */}
          <div style={{ margin: 0 }}>
            {(() => {
              const baseLink = siteData?.lasertagSpecs?.buttonLink || "https://wa.me/919428989488";
              const defaultMsg = siteData?.lasertagSpecs?.waMessage || "Hello Winera International! I want to download the Laser Tag Equipment & Setup Brochure. Please share details.";
              let hrefLink = baseLink;
              if (!baseLink.includes('text=')) {
                const separator = baseLink.includes('?') ? '&' : '?';
                hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
              }
              return (
                <a
                  href={hrefLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download Our Brochure"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isPhone ? '205px' : '225px',
                    height: isPhone ? '56px' : '63px',
                    background: `url(${downloadButtonImg}) center center / 100% 100% no-repeat`,
                    color: '#ffffff',
                    fontSize: isPhone ? '14px' : '15.5px',
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 1,
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span>{siteData?.lasertagSpecs?.buttonText || "Download Our Brochure"}</span>
                </a>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 2.9 HOW MUCH SPACE YOU NEED FOR LASER TAG SECTION */}
      <section className="winera-lasertag-space-section" style={{
        padding: isPhone ? '35px 5vw 45px' : '55px 4vw 70px',
        backgroundColor: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          {/* 2-Column Content Grid: Left (Header + Table Card) + Right 3D Schematic Image */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : '1.15fr 1fr',
            gap: isPhone ? '30px' : '45px',
            alignItems: 'center'
          }}>
            {/* Left Column: Header + Table Card */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Top Header with Yellow Stroke */}
              <div style={{ marginBottom: isPhone ? '20px' : '28px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: isPhone ? '200px' : '240px',
                    height: '8px',
                    marginBottom: '10px',
                    objectFit: 'fill'
                  }}
                />
                <h2 style={{
                  fontSize: isPhone ? '22px' : '28px',
                  fontWeight: '900',
                  color: '#0f172a',
                  lineHeight: 1.2,
                  margin: '0 0 10px 0'
                }}>
                  <span style={{ color: '#38bdf8' }}>
                    {siteData?.lasertagSpace?.titleHighlight || "How Much Space"}
                  </span>
                  {' '}
                  {(() => {
                    const rawNormal = siteData?.lasertagSpace?.titleNormal || "You<br/>Need for Laser Tag";
                    const lines = rawNormal.includes('<br')
                      ? rawNormal.split(/<br\s*\/?>/i)
                      : (rawNormal.startsWith("You Need") ? ["You", rawNormal.substring(4)] : (rawNormal.startsWith("You ") ? ["You", rawNormal.substring(4)] : [rawNormal]));
                    return lines.map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        <span style={{ color: '#0f172a' }}>{line}</span>
                      </React.Fragment>
                    ));
                  })()}
                </h2>

                {/* Description Text */}
                <p style={{
                  fontSize: isPhone ? '13px' : '14px',
                  color: '#475569',
                  lineHeight: 1.55,
                  fontWeight: '500',
                  maxWidth: '560px',
                  margin: 0
                }}>
                  {siteData?.lasertagSpace?.desc || "A laser tag arena works from about 1,000 sq ft, but 2,500–5,000 sq ft is ideal; it gives players room to move, hide, and enjoy the game. Here's how the space is used:"}
                </p>
              </div>

              {/* Left: 2-Tone Contiguous Zones Specification Table Card */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '520px',
                background: '#ffffff',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
                border: 'none'
              }}>
                {(Array.isArray(siteData?.lasertagSpace?.zones) && siteData.lasertagSpace.zones.length > 0
                  ? siteData.lasertagSpace.zones
                  : defaultSpaceZones
                ).map((zone, idx) => {
                  const renderZoneIcon = () => {
                    if (zone.iconType === 'vest' || idx === 1) {
                      return (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '19px',
                          height: '19px',
                          color: '#eab308'
                        }}>
                          <Shield style={{ width: '17px', height: '17px', strokeWidth: 2.3 }} />
                        </span>
                      );
                    }
                    if (zone.iconType === 'play' || idx === 2) {
                      return (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '19px',
                          height: '19px',
                          color: '#22c55e'
                        }}>
                          <Activity style={{ width: '17px', height: '17px', strokeWidth: 2.5 }} />
                        </span>
                      );
                    }
                    return (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '19px',
                        height: '19px',
                        color: '#38bdf8'
                      }}>
                        <FileText style={{ width: '17px', height: '17px', strokeWidth: 2.3 }} />
                      </span>
                    );
                  };

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: isPhone ? '1.15fr 1fr' : '1.35fr 1fr'
                      }}
                    >
                      {/* Left White Sub-card: Number + Icon + Title + Subtitle */}
                      <div style={{
                        padding: isPhone ? '12px 14px' : '18px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: isPhone ? '10px' : '14px',
                        background: '#ffffff'
                      }}>
                        <span style={{
                          fontSize: isPhone ? '24px' : '32px',
                          fontWeight: '900',
                          color: '#bae6fd',
                          lineHeight: 1,
                          flexShrink: 0
                        }}>
                          {zone.num || `0${idx + 1}`}
                        </span>

                        {/* Content block with title and subtitle */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {/* Top Line: Icon + Title */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {renderZoneIcon()}
                            <span style={{
                              fontSize: isPhone ? '15px' : '17.5px',
                              fontWeight: '600',
                              color: 'rgb(28, 38, 1)',
                              letterSpacing: '0.3px',
                              lineHeight: 1.2
                            }}>
                              {zone.title}
                            </span>
                          </div>
                          {/* Bottom Line: Subtitle */}
                          <span style={{
                            fontSize: isPhone ? '10px' : '11.5px',
                            fontWeight: '700',
                            color: '#64748b',
                            marginTop: '3px',
                            letterSpacing: '0.3px',
                            lineHeight: 1.2
                          }}>
                            {zone.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Right Soft Blue Sub-card: Space Value + laser-tag-5-icon */}
                      <div style={{
                        padding: isPhone ? '12px 14px' : '18px 18px',
                        background: '#cff0fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: isPhone ? '16px' : '20px',
                          fontWeight: '700',
                          color: '#0f172a',
                          lineHeight: 1
                        }}>
                          {zone.space}
                        </span>
                        <img
                          src={laserTagIcon5}
                          alt=""
                          style={{
                            width: isPhone ? '22px' : '27px',
                            height: isPhone ? '22px' : '27px',
                            objectFit: 'contain',
                            flexShrink: 0
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: 3D Schematic Arena Image with native transparent frame & vertical centering */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}>
              <img
                src={spaceImg}
                alt="Laser Tag Arena Space Layout"
                style={{
                  width: '100%',
                  maxWidth: '580px',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2.10 LASER SPY - LASER BEAM GAME SECTION */}
      <section className="winera-lasertag-spy-section" style={{
        position: 'relative',
        width: '100%',
        background: isPhone ? 'none' : `url(${spyBg}) center center / 100% 100% no-repeat`,
        backgroundColor: isPhone ? '#F5F5F9' : 'transparent',
        padding: isPhone ? '35px 5vw 45px' : '75px 4vw 85px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          {/* 2-Column Content Grid: Left Images, Right Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isPhone ? '1fr' : '1.15fr 1fr',
            gap: isPhone ? '35px' : '45px',
            alignItems: 'center'
          }}>
            {/* Left Column: Overlapping Cyber Images + laser-tag-6-button Badge (Order 2 on Mobile) */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: isPhone ? '100%' : '630px',
              margin: isPhone ? '35px auto 30px' : '0 auto 0 0',
              transform: isPhone ? 'none' : 'translate(25px, -81px)',
              order: isPhone ? 2 : 1,
              paddingBottom: isPhone ? '25px' : '0'
            }}>
              {/* Big Main Image with Cyber Border Behind */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '744 / 432'
              }}>
                {/* 1. Behind Cyber Border */}
                <img
                  src={spyBorderImg}
                  alt=""
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />

                {/* 2. Big Main Image */}
                <img
                  src={spyImg}
                  alt="Laser Spy Game"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />

                {/* 3. Second Image Overlapping at Bottom-Left (Native white border in PNG) */}
                <img
                  src={spySmallImg}
                  alt="Laser Spy Arena"
                  style={{
                    position: 'absolute',
                    top: '68%',
                    left: '0px',
                    width: isPhone ? '54%' : '52%',
                    height: 'auto',
                    zIndex: 5,
                    display: 'block',
                    filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45))'
                  }}
                />

                {/* 4. laser-tag-6-button.png Badge at Bottom-Right of Second Image */}
                <div style={{
                  position: 'absolute',
                  bottom: isPhone ? '-8%' : '-13%',
                  left: isPhone ? '38%' : '41%',
                  zIndex: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isPhone ? '200px' : '255px'
                }}>
                  <img
                    src={spyBtnImg}
                    alt="Small Space. Big Thrills."
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    left: '50%',
                    top: '48%',
                    transform: 'translate(-50%, -50%)',
                    color: '#1e293b',
                    fontWeight: '400',
                    fontSize: isPhone ? '13.5px' : '19px',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.2px',
                    pointerEvents: 'none'
                  }}>
                    {siteData?.lasertagSpy?.badgeText || "Small Space. Big Thrills."}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description & Checklist (Order 1 on Mobile) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              order: isPhone ? 1 : 2
            }}>
              {/* Yellow Accent Stroke Line */}
              <img
                src={yellowStrokeLine}
                alt=""
                style={{
                  display: 'block',
                  width: isPhone ? '140px' : '160px',
                  height: '7px',
                  marginBottom: '12px',
                  objectFit: 'fill'
                }}
              />

              {/* Title: Laser Spy — Laser Beam Game That Fits in a Small Room */}
              <h2 style={{
                fontSize: isPhone ? '24px' : '34px',
                fontWeight: '900',
                lineHeight: 1.18,
                margin: '0 0 14px 0'
              }}>
                <span style={{ color: '#0f172a' }}>
                  {siteData?.lasertagSpy?.titleDark || "Laser Spy — Laser "}
                </span>
                <span style={{ color: '#00b0ff' }}>
                  {siteData?.lasertagSpy?.titleCyan || "Beam Game That Fits in a Small Room"}
                </span>
              </h2>

              {/* Paragraph Description */}
              <p style={{
                fontSize: isPhone ? '13px' : '14px',
                color: '#475569',
                lineHeight: 1.6,
                fontWeight: '450',
                margin: '0 0 20px 0',
                maxWidth: '600px'
              }}>
                {siteData?.lasertagSpy?.desc || "Laser spy is a room full of laser beams. Players have to move through them without touching any. People love it and come back again and again to beat their best score. And it fits in a small room, so you can add it even when you don't have much space. We supply and set up the full game, ready to play."}
              </p>

              {/* Subheading: What you get, fully set up: */}
              <h3 style={{
                fontSize: isPhone ? '17px' : '19px',
                fontWeight: '900',
                color: '#0f172a',
                margin: '0 0 16px 0'
              }}>
                {siteData?.lasertagSpy?.listHeading || "What you get, fully set up:"}
              </h3>

              {/* 5 Checklist Items with Cyan Rounded Icon Boxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: isPhone ? '12px' : '14px' }}>
                {(Array.isArray(siteData?.lasertagSpy?.features) && siteData.lasertagSpy.features.length > 0
                  ? siteData.lasertagSpy.features
                  : defaultSpyFeatures
                ).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: isPhone ? '11px' : '14px' }}>
                    <img
                      src={laserSpyIcons[idx] || laserSpyIcon1}
                      alt=""
                      style={{
                        width: isPhone ? '28px' : '36px',
                        height: isPhone ? '28px' : '36px',
                        flexShrink: 0,
                        marginTop: '2px',
                        objectFit: 'contain'
                      }}
                    />
                    <span style={{
                      fontSize: isPhone ? '15.5px' : '20px',
                      color: 'rgb(45, 44, 1)',
                      fontWeight: '400',
                      lineHeight: 1.45
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.11 LASER SPY TECHNICAL SPECIFICATIONS CARD SECTION */}
      <section className="winera-lasertag-spyspecs-section" style={{
        padding: isPhone ? '25px 4vw 35px' : '35px 4vw 50px',
        backgroundColor: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div className="winera-lasertag-spyspecs-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: isPhone ? '24px' : '36px',
          overflow: 'hidden',
          background: isPhone ? `#051b47` : `url(${spySpecsBg}) center center / 100% 100% no-repeat`,
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          padding: isPhone ? '35px 20px 35px' : '50px 50px 45px',
          minHeight: isPhone ? 'auto' : '580px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          {/* Top Title: Technical Specifications with Yellow Accent Stroke */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: isPhone ? '20px' : '28px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '10px',
                objectFit: 'fill'
              }}
            />
            <h2 style={{
              fontSize: isPhone ? '26px' : '36px',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0
            }}>
              <span style={{ color: '#ffcd00' }}>
                {siteData?.lasertagSpySpecs?.titleHighlight || "Technical"}
              </span>
              {' '}
              <span style={{ color: '#ffffff' }}>
                {siteData?.lasertagSpySpecs?.titleNormal || "Specifications"}
              </span>
            </h2>
          </div>

          {/* Yellow Border Container for Table matching Hypergrid */}
          <div style={{
            border: '2px solid #ffcd00',
            borderRadius: isPhone ? '18px' : '24px',
            background: '#ffffff',
            padding: isPhone ? '18px 20px' : '24px 35px',
            maxWidth: '610px',
            width: '100%',
            marginBottom: isPhone ? '25px' : '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isPhone ? '280px' : 'auto' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px 20px 12px 0',
                    fontSize: isPhone ? '20px' : '27px',
                    fontWeight: '700',
                    color: '#0f172a',
                    width: '52%'
                  }}>
                    {siteData?.lasertagSpySpecs?.specHeading || "Specification"}
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '8px 0 12px 20px',
                    fontSize: isPhone ? '20px' : '27px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    {siteData?.lasertagSpySpecs?.detailsHeading || "Details"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.lasertagSpySpecs?.rows) && siteData.lasertagSpySpecs.rows.length > 0
                  ? siteData.lasertagSpySpecs.rows
                  : defaultSpySpecsRows
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{
                      padding: '11px 20px 11px 0',
                      fontSize: isPhone ? '14px' : '16px',
                      fontWeight: '400',
                      color: '#0f172a'
                    }}>
                      {row.spec}
                    </td>
                    <td style={{
                      padding: '11px 0 11px 20px',
                      fontSize: isPhone ? '14px' : '16px',
                      fontWeight: '400',
                      color: '#334155'
                    }}>
                      {row.details || row.detail || row.value || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA Button: Download Our Brochure matching Hypergrid */}
          <div style={{ margin: 0 }}>
            {(() => {
              const baseLink = siteData?.lasertagSpySpecs?.buttonLink || "https://wa.me/919428989488";
              const defaultMsg = siteData?.lasertagSpySpecs?.waMessage || "Hello Winera International! I want to download the Laser Spy Equipment & Setup Brochure. Please share details.";
              let hrefLink = baseLink;
              if (!baseLink.includes('text=')) {
                const separator = baseLink.includes('?') ? '&' : '?';
                hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
              }
              return (
                <a
                  href={hrefLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download Our Brochure"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isPhone ? '205px' : '225px',
                    height: isPhone ? '56px' : '63px',
                    background: `url(${downloadButtonImg}) center center / 100% 100% no-repeat`,
                    color: '#ffffff',
                    fontSize: isPhone ? '14px' : '15.5px',
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 1,
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span>{siteData?.lasertagSpySpecs?.buttonText || "Download Our Brochure"}</span>
                </a>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 2.12 WHICH GAME IS RIGHT FOR YOUR VENUE COMPARISON SECTION */}
      <section className="winera-lasertag-comparison-section" style={{
        padding: isPhone ? '35px 4vw 40px' : '80px 4vw 70px',
        background: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading with Yellow Accent Stroke */}
          <div style={{ textAlign: 'center', marginBottom: isPhone ? '30px' : '45px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              className="winera-yellow-stroke"
              style={{ display: 'block', width: isPhone ? '240px' : '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: isPhone ? '25px' : '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.lasertagComparison?.title, "*Which Game Is* Right for Your Venue?", '#38bdf8')}
            </h2>
          </div>

          {/* Central Comparison Diagram Layout (Desktop) */}
          <div className="winera-lasertag-comparison-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* LEFT COLUMN: Laser Tag Points (Yellow Arc Curve Layout) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-end',
              position: 'relative',
              minHeight: '380px'
            }}>
              {/* Point Pills List arranged in an outward curve */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'flex-end',
                zIndex: 3,
                width: '100%',
                paddingRight: '70px',
                boxSizing: 'border-box'
              }}>
                {(siteData?.lasertagComparison?.lasertagPoints || defaultLasertagPoints).map((pt, idx) => {
                  const curveOffsets = [5, 90, 145, 110, 80, 5];
                  const offsetRight = curveOffsets[idx] || 0;
                  const formattedText = formatComparisonPointText(pt?.text || '');

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #fef08a 0%, #fde047 50%, #facc15 100%)',
                      borderRadius: '24px',
                      padding: '7px 10px 7px 18px',
                      boxShadow: '0 2px 8px rgba(250, 204, 21, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      justifyContent: 'space-between',
                      marginRight: `${offsetRight}px`,
                      minHeight: '38px',
                      minWidth: '200px',
                      maxWidth: '245px',
                      width: 'fit-content',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        fontSize: '12.5px',
                        fontWeight: '600',
                        color: '#0f172a',
                        textAlign: 'left',
                        flex: 1,
                        lineHeight: 1.25,
                        whiteSpace: 'normal'
                      }}>
                        {formattedText.split(/<br\s*\/?>|\n/i).map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {lIdx > 0 && <br />}
                            {line}
                          </React.Fragment>
                        ))}
                      </span>
                      <span style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontSize: '13px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Central Yellow Dashed Circle Badge */}
              <div style={{
                position: 'absolute',
                right: '120px',
                top: '50%',
                transform: 'translate(50%, -50%)',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '2px dashed #facc15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px',
                flexShrink: 0,
                background: 'transparent',
                zIndex: 2,
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#ca8a04', lineHeight: 1.2, letterSpacing: '0.5px' }}>
                  LASER TAG
                </span>
              </div>

              {/* Big Outer Yellow Dotted Circle Graphic Centered on Inner Badge */}
              <div style={{
                position: 'absolute',
                right: '120px',
                top: '50%',
                transform: 'translate(50%, -50%)',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                border: '2px dashed #fde047',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
            </div>

            {/* CENTER COLUMN: Features Pill Column (Gradient Pill Card with Pill Ends) */}
            <div style={{
              width: '260px',
              borderRadius: '24px',
              background: 'linear-gradient(rgb(220, 252, 231) 0%, rgb(167, 243, 208) 25%, rgb(125, 211, 252) 65%, rgb(56, 189, 248) 100%)',
              padding: '50px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              textAlign: 'center',
              boxShadow: 'none',
              paddingBottom: '50px',
              zIndex: 4,
              flexShrink: 0
            }}>
              {(siteData?.lasertagComparison?.features || defaultComparisonFeatures).map((fText, idx) => (
                <div key={idx} style={{
                  fontSize: '17px',
                  fontWeight: '500',
                  color: 'rgba(50, 52, 50, 1)',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {fText}
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Laser Spy Points (Cyan/Blue Arc Curve Layout) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-start',
              position: 'relative',
              minHeight: '380px'
            }}>
              {/* Central Blue Dashed Circle Badge */}
              <div style={{
                position: 'absolute',
                left: '120px',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '2px dashed #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px',
                flexShrink: 0,
                background: 'transparent',
                zIndex: 2,
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#0284c7', lineHeight: 1.2, letterSpacing: '0.5px' }}>
                  LASER SPY
                </span>
              </div>

              {/* Big Outer Cyan Dotted Circle Graphic Centered on Inner Badge */}
              <div style={{
                position: 'absolute',
                left: '120px',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                border: '2px dashed #7dd3fc',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>

              {/* Point Pills List arranged in an outward curve */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'flex-start',
                zIndex: 3,
                width: '100%',
                paddingLeft: '70px',
                boxSizing: 'border-box'
              }}>
                {(siteData?.lasertagComparison?.laserspyPoints || defaultLaserspyPoints).map((pt, idx) => {
                  const curveOffsets = [5, 90, 145, 110, 80, 5];
                  const offsetLeft = curveOffsets[idx] || 0;
                  const formattedText = formatComparisonPointText(pt?.text || '');

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%)',
                      borderRadius: '24px',
                      padding: '7px 18px 7px 10px',
                      boxShadow: '0 2px 8px rgba(56, 189, 248, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      justifyContent: 'flex-start',
                      marginLeft: `${offsetLeft}px`,
                      minHeight: '38px',
                      minWidth: '200px',
                      maxWidth: '245px',
                      width: 'fit-content',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0284c7',
                        fontSize: '13px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontSize: '12.5px',
                        fontWeight: '600',
                        color: '#ffffff',
                        textAlign: 'left',
                        flex: 1,
                        lineHeight: 1.25,
                        whiteSpace: 'normal'
                      }}>
                        {formattedText.split(/<br\s*\/?>|\n/i).map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {lIdx > 0 && <br />}
                            {line}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Responsive Layout for Comparison (Card Swiper) */}
          <LaserTagComparisonSlider
            features={siteData?.lasertagComparison?.features || defaultComparisonFeatures}
            lasertagPoints={siteData?.lasertagComparison?.lasertagPoints || defaultLasertagPoints}
            laserspyPoints={siteData?.lasertagComparison?.laserspyPoints || defaultLaserspyPoints}
          />

          {/* Bottom Note Paragraph from Image 4 */}
          <div style={{
            textAlign: 'center',
            marginTop: isPhone ? '25px' : '45px',
            padding: isPhone ? '0 10px' : '0 40px'
          }}>
            <p style={{
              fontSize: isPhone ? '14px' : '17px',
              fontWeight: '500',
              color: '#334155',
              lineHeight: 1.6,
              maxWidth: '850px',
              margin: '0 auto'
            }}>
              {siteData?.lasertagComparison?.note || "Not sure which fits your venue? Our team looks at your space and how you want to run it, then suggests the right game or both, if you have the room."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection
        sectionData={siteData?.lasertagRelated || siteData?.arcadeRelated}
        accentColor="#38bdf8"
      />

      {/* 4. FOOTER SECTION */}
      <div style={{ marginTop: 'auto' }}>
        <Footer footerData={footer} />
      </div>
    </div>
  );
}
