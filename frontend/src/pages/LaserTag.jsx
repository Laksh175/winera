import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";
const laserTagLeftCta = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791348709/winera_uploads/hzwfj0eti3q15lzthvz5.png";
const laserTagRightCta = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791348711/winera_uploads/fy9rcztxwdtqhw65ylvo.png";
const laserTagHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/tj7ke5cpufz9t41c4d7v.png";
const gameZoneMobileBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345650/winera_uploads/eqjkboeokagpaus2ifxa.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const laserTagImg1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345668/winera_uploads/pvowe89a9npyelw0urvy.png";
const laserTagImg2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/pdxjsxxlv5fmskyvexns.png";
const laserTagBg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/zehlru7p5ycnkgk0iy7s.png";
const laserTagBg4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/xrz97xddcvnnpf6roewa.png";
const laserTagImg3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/c6ibna0gcd0tjshkgo8o.png";
const laserTagImg3Border = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/p1eoo20dsjbpbx6lja9n.png";
const laserTagImg5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/v9ozhnic1za88buasewx.png";
const laserTagIcon5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/mp6hqh7nw6xy7kvfrvpm.png";
const laserTagImg6 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/ekzzusfpuhfyih8nyc3w.png";
const laserTagImg6Small = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345671/winera_uploads/neuibh4fb5zojuvgtiec.png";
const laserTagImg6Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/bmfayjdfcpyocsjcg8cc.png";
const laserTagImg6Btn = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345670/winera_uploads/eo5gjslhvaiutogkzeq9.png";
const laserSpyIcon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/e87depkqmlvhh2p0w9iu.png";
const laserSpyIcon2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/ucnbwlgqu3twmnomgbrw.png";
const laserSpyIcon3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/mu2h9kkyinxiqrpyqu6k.png";
const laserSpyIcon4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345667/winera_uploads/a1wa3tttd3lrazhsnxoe.png";
const laserSpyIcon5 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/wnmzcfjqey2pqy6aotce.png";
const laserTagImg7 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/c4xhhkjcjwhagwd8drzm.png";
const laserTagImg7Bg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/b2chyjep2n8etsts6zrh.png";
const talkToRoiBtn = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345686/winera_uploads/p0ljiyl3jf6r3wvnzch1.png";
const homePageIcon = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345656/winera_uploads/gp0aisnttd4hpnswmxu4.png";
const downloadButtonImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345649/winera_uploads/d1xqmhgcvuurvrj8xbvt.png";
import MobileExpandableText from '../components/MobileExpandableText';
import WhyChooseUsMobileSlider from '../components/WhyChooseUsMobileSlider';
import { FileText, Shield, Activity, Crosshair, Users, Tv, Sparkles, Sliders, Target, ShieldCheck, Settings, Database, Headset, Wrench, Box } from 'lucide-react';

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
          <div style={{ position: 'relative', display: isPhone ? 'flex' : 'inline-block', flexDirection: isPhone ? 'column' : 'initial', alignItems: isPhone ? 'center' : 'flex-start', textAlign: isPhone ? 'center' : 'left', marginBottom: isPhone ? '20px' : '28px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '10px',
                objectFit: 'fill',
                marginLeft: isPhone ? 'auto' : '0',
                marginRight: isPhone ? 'auto' : '0'
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isPhone ? 'center' : 'flex-start', textAlign: isPhone ? 'center' : 'left' }}>
              {/* Top Header with Yellow Stroke */}
              <div style={{ marginBottom: isPhone ? '20px' : '28px', textAlign: isPhone ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: isPhone ? 'center' : 'flex-start' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: isPhone ? '200px' : '240px',
                    height: '8px',
                    marginBottom: '10px',
                    objectFit: 'fill',
                    marginLeft: isPhone ? 'auto' : '0',
                    marginRight: isPhone ? 'auto' : '0'
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
              textAlign: isPhone ? 'center' : 'left',
              alignItems: isPhone ? 'center' : 'flex-start',
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
                  objectFit: 'fill',
                  marginLeft: isPhone ? 'auto' : '0',
                  marginRight: isPhone ? 'auto' : '0'
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

              {/* Paragraph Description with Mobile Expandable Text */}
              <div style={{ maxWidth: '600px', width: '100%', marginBottom: '20px', textAlign: isPhone ? 'center' : 'left' }}>
                <MobileExpandableText
                  preview={
                    <p style={{
                      fontSize: isPhone ? '13.5px' : '14px',
                      color: '#475569',
                      lineHeight: 1.6,
                      fontWeight: '450',
                      margin: 0,
                      textAlign: isPhone ? 'center' : 'left'
                    }}>
                      {siteData?.lasertagSpy?.desc ? (
                        siteData.lasertagSpy.desc.includes('. ')
                          ? siteData.lasertagSpy.desc.substring(0, siteData.lasertagSpy.desc.indexOf('. ') + 1)
                          : siteData.lasertagSpy.desc
                      ) : "Laser spy is a room full of laser beams. Players have to move through them without touching any."}
                    </p>
                  }
                  expandedContent={
                    <p style={{
                      fontSize: isPhone ? '13.5px' : '14px',
                      color: '#475569',
                      lineHeight: 1.6,
                      fontWeight: '450',
                      marginTop: '8px',
                      marginBottom: 0,
                      textAlign: isPhone ? 'center' : 'left'
                    }}>
                      {siteData?.lasertagSpy?.desc && siteData.lasertagSpy.desc.includes('. ')
                        ? siteData.lasertagSpy.desc.substring(siteData.lasertagSpy.desc.indexOf('. ') + 2)
                        : "People love it and come back again and again to beat their best score. And it fits in a small room, so you can add it even when you don't have much space. We supply and set up the full game, ready to play."}
                    </p>
                  }
                />
              </div>

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
          <div style={{ position: 'relative', display: isPhone ? 'flex' : 'inline-block', flexDirection: isPhone ? 'column' : 'initial', alignItems: isPhone ? 'center' : 'flex-start', textAlign: isPhone ? 'center' : 'left', marginBottom: isPhone ? '20px' : '28px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '220px' : '280px',
                height: '8px',
                marginBottom: '10px',
                objectFit: 'fill',
                marginLeft: isPhone ? 'auto' : '0',
                marginRight: isPhone ? 'auto' : '0'
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
        padding: isPhone ? '30px 4vw 25px' : '50px 4vw 35px',
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

      {/* 2.13 KNOW YOUR NUMBERS BEFORE YOU SPEND (ROI SECTION) */}
      <section className="winera-lasertag-roi-section" style={{
        width: '100%',
        padding: isPhone ? '15px 16px 20px' : '15px 4vw 20px',
        background: '#f8fafc',
        boxSizing: 'border-box'
      }}>
        <div className="winera-lasertag-roi-card" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: isPhone ? '16px' : '24px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isPhone ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}>
          {/* Left Column: Text & CTA */}
          <div style={{
            flex: isPhone ? '1 1 100%' : '1 1 46%',
            padding: isPhone ? '22px 18px 20px' : '24px 24px 24px 42px',
            boxSizing: 'border-box',
            textAlign: isPhone ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isPhone ? 'center' : 'flex-start'
          }}>
            {/* Top Yellow Stroke Accent */}
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                maxWidth: '100%',
                width: isPhone ? '200px' : '260px',
                height: '7px',
                marginBottom: '10px',
                objectFit: 'fill',
                marginLeft: isPhone ? 'auto' : '0',
                marginRight: isPhone ? 'auto' : '0'
              }}
            />

            {/* Cyan Bold Heading */}
            <h2 style={{
              fontSize: isPhone ? '24px' : '32px',
              fontWeight: '800',
              color: '#00a6ff',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              margin: '0 0 12px 0',
              fontFamily: "var(--font-heading, 'Outfit', 'Montserrat', sans-serif)"
            }}>
              {renderTitleMarkup(siteData?.lasertagRoi?.title, "Know Your Numbers<br/>Before You Spend", "#00a6ff")}
            </h2>

            {/* Paragraphs with Mobile Expandable Text */}
            <div style={{ width: '100%', maxWidth: '95%', margin: '0 0 18px 0', textAlign: isPhone ? 'center' : 'left' }}>
              <MobileExpandableText
                preview={
                  <p className="winera-lasertag-roi-p" style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.55,
                    fontWeight: '400',
                    margin: 0,
                    textAlign: isPhone ? 'center' : 'left'
                  }}>
                    {siteData?.lasertagRoi?.paragraph1 || "Buying a laser tag or laser spy setup is a big decision, and you shouldn't have to guess whether it will pay off. That's why every project with Winera starts with a free ROI report built around your venue, not a general estimate copied from a brochure."}
                  </p>
                }
                expandedContent={
                  <p className="winera-lasertag-roi-p" style={{
                    fontSize: '14.5px',
                    color: '#475569',
                    lineHeight: 1.55,
                    fontWeight: '400',
                    marginTop: '10px',
                    marginBottom: 0,
                    textAlign: isPhone ? 'center' : 'left'
                  }}>
                    {siteData?.lasertagRoi?.paragraph2 || "We work out how many games you can run each day, how much you can earn from them, what upkeep will cost, and how soon you'll make your money back. Both games are strong earners because they pull in groups, parties, office teams, and school outings that book many players at once and with just one staff member running the show, you keep costs low and games flowing. You'll see the full picture first, then decide."}
                  </p>
                }
              />
            </div>

            {/* ROI WhatsApp CTA Button */}
            {(() => {
              const baseLink = siteData?.lasertagRoi?.buttonLink || "https://wa.me/919428989488";
              const defaultMsg = siteData?.lasertagRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert regarding Laser Tag & Laser Spy setup for my venue.";
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
                  aria-label="Talk to an ROI Expert on WhatsApp"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '245px',
                    height: '56px',
                    background: `url(${talkToRoiBtn}) center center / 100% 100% no-repeat`,
                    color: '#091E2B',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, filter 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#25d366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 448 512" fill="white">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </div>
                  <span>{siteData?.lasertagRoi?.buttonText || "Talk to an ROI Expert"}</span>
                </a>
              );
            })()}
          </div>

          {/* Right Column: Laser Tag 7 Image with Frame */}
          <div style={{
            flex: isPhone ? '1 1 100%' : '1 1 54%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'stretch'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              {/* Angled Border Frame (Behind) */}
              <img
                src={getValidImageUrl(siteData?.lasertagRoi?.bgImgUrl, laserTagImg7Bg)}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />
              {/* Main Photo (In Front - slim blue chevron on left, 100% height without top/bottom space) */}
              <img
                src={getValidImageUrl(siteData?.lasertagRoi?.mainImgUrl, laserTagImg7)}
                alt="Know Your Numbers ROI - Laser Tag"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'relative',
                  width: isPhone ? '100%' : '98.5%',
                  height: '100%',
                  objectFit: 'fill',
                  display: 'block',
                  zIndex: 2
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2.14 WHY CHOOSE WINERA INTERNATIONAL SECTION */}
      <section className="winera-ar-whyus-section" style={{
        padding: isPhone ? '35px 4vw 40px' : '65px 4vw 75px',
        background: '#F5F5F9',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading with Yellow Accent Stroke */}
          <div style={{ textAlign: 'center', marginBottom: isPhone ? '35px' : '50px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              className="winera-yellow-stroke"
              style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-ar-whyus-h2" style={{ fontSize: isPhone ? '26px' : '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.lasertagWhyUs?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* Cards Grid Container (Dynamic List with Thin Blue Dividers & 3x2 Grid Layout) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const defaultCards = [
                { title: "Complete Arena Setup", desc: "We handle the equipment, design, setup, and training, not just the supply." },
                { title: "Revenue Calculated", desc: "We show you the games, monthly income, and payback time before you spend." },
                { title: "Low Running Cost", desc: "Just one person runs the whole game, less staff, more games." },
                { title: "Built for Your Space", desc: "We plan the layout and player flow to fit your floor." },
                { title: "Direct After-Sales Support", desc: "One call reaches the same team that built your game." }
              ];

              const cards = (Array.isArray(siteData?.lasertagWhyUs?.cardsList) && siteData.lasertagWhyUs.cardsList.length > 0)
                ? siteData.lasertagWhyUs.cardsList
                : defaultCards;

              const iconsList = [
                // 1. Complete Arena Setup (User with stars & experience)
                <svg key={0} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 2l.6 1.2 1.4.2-1 1 .2 1.4-1.2-.6-1.2.6.2-1.4-1-1 1.4-.2z"/></svg>,
                // 2. Revenue Calculated (Gear with checkmark)
                <svg key={1} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><polyline points="9 12 11 14 15 10"/></svg>,
                // 3. Low Running Cost (Database / Coins stack)
                <svg key={2} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
                // 4. Built for Your Space (Headset / Support)
                <svg key={3} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
                // 5. Direct After-Sales Support (Calendar / Maintenance Support)
                <svg key={4} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>
              ];

              let topCount = 3;
              if (cards.length <= 3) {
                topCount = cards.length;
              } else if (cards.length === 5) {
                topCount = 3;
              } else if (cards.length === 6) {
                topCount = 3;
              } else {
                topCount = Math.ceil(cards.length / 2);
              }

              const topCards = cards.slice(0, topCount);
              const bottomCards = cards.slice(topCount);

              return (
                <>
                  <div className="winera-ar-whyus-desktop-container" style={{ position: 'relative' }}>
                    {/* TOP ROW */}
                    <div className="winera-ar-whyus-row winera-ar-whyus-top-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {topCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="winera-ar-whyus-card"
                          style={{
                            padding: '0 35px 30px',
                            textAlign: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
                          {/* Vertical Shade/Gradient Divider Line for Top Row */}
                          {cIdx < topCards.length - 1 && (
                            <div className="winera-ar-whyus-vertical-divider" style={{
                              position: 'absolute',
                              right: 0,
                              top: '20px',
                              bottom: 0,
                              width: '2px',
                              background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 100%)',
                              zIndex: 3
                            }}></div>
                          )}

                          {/* Cyan Icon Box */}
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: 'none'
                          }}>
                            {card.iconUrl ? (
                              <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                            ) : (
                              iconsList[cIdx % iconsList.length]
                            )}
                          </div>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Horizontal Center Cyan Divider Line with Shade Fading */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-horizontal-divider" style={{
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 12%, #38bdf8 88%, rgba(56, 189, 248, 0.08) 100%)',
                        position: 'relative',
                        zIndex: 3,
                        margin: '0 0 30px'
                      }}></div>
                    )}

                    {/* BOTTOM ROW */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-row winera-ar-whyus-bottom-row" style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                        maxWidth: bottomCards.length <= 3 ? '780px' : '100%',
                        margin: '0 auto',
                        gap: '0px',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        {bottomCards.map((card, bIdx) => (
                          <div
                            key={bIdx}
                            className="winera-ar-whyus-card"
                            style={{
                              padding: '0 35px',
                              textAlign: 'center',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center'
                            }}
                          >
                            {/* Vertical Shade/Gradient Divider Line for Bottom Row */}
                            {bIdx < bottomCards.length - 1 && (
                              <div className="winera-ar-whyus-vertical-divider" style={{
                                position: 'absolute',
                                right: 0,
                                top: '-30px',
                                bottom: '20px',
                                width: '2px',
                                background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 100%)',
                                zIndex: 3
                              }}></div>
                            )}

                            {/* Cyan Icon Box */}
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '14px',
                              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '16px',
                              boxShadow: 'none'
                            }}>
                              {card.iconUrl ? (
                                <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                              ) : (
                                iconsList[(topCards.length + bIdx) % iconsList.length]
                              )}
                            </div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                              {card.title}
                            </h4>
                            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Slider View */}
                  <WhyChooseUsMobileSlider
                    items={cards}
                    renderIcon={(item, idx) =>
                      item.iconUrl ? (
                        <img src={item.iconUrl} alt="" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                      ) : (
                        iconsList[idx % iconsList.length]
                      )
                    }
                  />
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection
        sectionData={siteData?.lasertagRelated || siteData?.arcadeRelated}
        accentColor="#38bdf8"
      />

      {/* 4. WHAT OUR CLIENTS SAY SECTION (TESTIMONIALS) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 5. FREQUENTLY ASKED QUESTIONS SECTION */}
      <FaqSection
        faqList={(Array.isArray(siteData?.lasertagFaqs) && siteData.lasertagFaqs.length > 0) ? siteData.lasertagFaqs : defaultLaserTagFaqs}
        title="Frequently Asked *Questions*"
        highlightColor="#38bdf8"
      />

      {/* 5.5. CTA BANNER SECTION */}
      <div className="winera-lasertag-cta-wrapper">
        <CtaBanner
          containerPadding="10px 32px"
          blurBg={true}
          showOverlay={true}
          align="center"
          gradientTitle={true}
          buttonTheme="yellow"
          titleFontSize="clamp(20px, 2.2vw, 32px)"
          titleMaxWidth="880px"
          contentBoxMaxWidth="880px"
          leftImgMaxWidth="220px"
          subtitleFontSize="15px"
          subtitleFontWeight="400"
          subtitleMaxWidth="820px"
          bgUrl={siteData?.lasertagCta?.bgUrl ? getValidImageUrl(siteData.lasertagCta.bgUrl, ctaMainBanner) : null}
          bg={ctaMainBanner}
          leftImgUrl={siteData?.lasertagCta?.leftImgUrl}
          leftImg={laserTagLeftCta}
          rightImgUrl={siteData?.lasertagCta?.rightImgUrl}
          rightImg={laserTagRightCta}
          tagline={null}
          title={
            (() => {
              let t = siteData?.lasertagCta?.title || "Thinking About Adding Laser Tag<br/>& Laser Spy To Your Venue?";
              if (t.includes("Laser Tag & Laser Spy")) {
                t = t.replace("Laser Tag & Laser Spy", "Laser Tag<br/>& Laser Spy").replace(/<br\s*\/?>\s*To/i, " To");
              }
              return t;
            })()
          }
          subtitle={
            siteData?.lasertagCta?.subtitle || siteData?.lasertagCta?.whiteText
              ? siteData?.lasertagCta?.subtitle || siteData?.lasertagCta?.whiteText
              : "Book a free call and we'll walk you through with a free ROI report and a plan made for your venue"
          }
          description={null}
          buttonText={siteData?.lasertagCta?.buttonText || "Get a Quote on WhatsApp"}
          buttonLink={siteData?.lasertagCta?.buttonLink || "https://wa.me/919428989488"}
        />
      </div>

      {/* 6. FOOTER SECTION */}
      <div style={{ marginTop: 'auto' }}>
        <Footer footerData={footer} />
      </div>
    </div>
  );
}

const defaultLaserTagFaqs = [
  {
    q: "What is the laser tag equipment cost in India?",
    a: "The cost depends on your arena size, player count, game types, and theming. We give you a full cost breakdown plus a free ROI report before you order, so you see the exact cost and payback for your venue. Contact us for a quote for your space."
  },
  {
    q: "How long does the setup take?",
    a: "A standard laser tag or laser spy setup takes about 3–7 days, depending on the arena size and design. We give you an exact timeline at the quote stage, covering delivery, building, software, and staff training."
  },
  {
    q: "What ceiling height do I need for laser tag?",
    a: "Laser tag works best with a ceiling of at least 3 metres, which allows proper obstacles and, where space allows, a multi-level layout. We check your ceiling and floor before designing the arena."
  },
  {
    q: "How much maintenance do these games need?",
    a: "Very little. The equipment is built for daily commercial use, and routine upkeep is simple mostly charging, cleaning, and occasional checks. We provide servicing and support whenever you need it."
  },
  {
    q: "Can the arena be themed to match my venue?",
    a: "Yes. We can theme the arena with custom design, lighting, and effects to match your venue's look. We suggest the theming options during the design stage."
  },
  {
    q: "Do you provide staff training?",
    a: "Yes. Before opening day, we train your team to run games, manage sessions, and handle the software confidently, so you're ready from day one."
  },
  {
    q: "What happens if something breaks after installation?",
    a: "Our own team handles all repairs and servicing directly across 50+ cities, you deal with us, not an outside agent or an overseas supplier. Most issues are fixed quickly so your games keep running."
  }
];
