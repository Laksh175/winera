import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import FaqSection from '../components/FaqSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBanner from '../components/CtaBanner';
import RelatedProductsSection from '../components/RelatedProductsSection';

import wineraLogo from '../assets/logo.webp';
import arcadeHeroBg from '../assets/arcade-hero-bg.webp';
import bowlingHeroBg from '../assets/bowlling-hero-bg.webp';
import bowlingImg from '../assets/bowling.webp';
import maskGroupImg from '../assets/Mask-group.webp';
import maskGroup01Img from '../assets/Mask-group-01.webp';
import vectorImg from '../assets/Vector.webp';
import bowlingPinsExplode from '../assets/bowling-pins-explode.webp';
import bowlingBallPinsBlue from '../assets/bowling-ball-pins-blue.webp';
import bowlingTypesBg from '../assets/bowlling-bg.webp';
import ctaGamersBg from '../assets/cta-gamers-bg.webp';
import ctaArcade from '../assets/cta-arcade.webp';
import arcadeBoy from '../assets/arcade-boy.webp';
import arcadeHall from '../assets/arcade-hall.webp';
import doodleArrow from '../assets/doodle-arrow.webp';
import bikeArcade from '../assets/bike-arcade.webp';
import builtCommercialBg from '../assets/built-commercial-bg.webp';
import commercialTeam from '../assets/commercial-team.webp';
import needConsultationsBg from '../assets/cta-consultations-banner.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import ctaSoftplayBg from '../assets/cta-softplay-bg.webp';
import trampolineParkCtaBg from '../assets/trampoline-park-cta-bg.webp';
import yellowBrushAccent from '../assets/yellow-stroke-line.webp';
import about1 from '../assets/about-01.webp';
import about2 from '../assets/about-2.webp';
import about3 from '../assets/about-3.webp';
import about4 from '../assets/about-4.webp';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';
import projSoft1 from '../assets/proj-softplay1.webp';
import downloadButtonImg from '../assets/download-button.png';
import arcadeBtn1 from '../assets/arcadegame-button-1.png';
import bowlingBtnShape from '../assets/bowlling-button-shape.png';
import ctaBtn3 from '../assets/cta-button-3.png';




import { Trophy, Flame, Sparkles, Star, ShieldCheck, Zap, Shield, Wrench, Play, ChevronLeft, ChevronRight, ChevronDown, CheckCheck, MessageCircle, UserCheck, Settings, Database, Coins, Headset, Box, ArrowRight, ArrowUpRight } from 'lucide-react';

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

// Helper function to render title with *word* highlights, <cyan>cyan words</cyan> and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#ffcd00') => {
  const text = rawText || defaultText;
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    const subParts = part.split(/<cyan>(.*?)<\/cyan>/gi);

    const renderedSub = subParts.map((sub, sIdx) => {
      const isCyan = sIdx % 2 === 1;
      const lines = sub.split(/<br\s*\/?>/i);
      const lineElements = lines.map((line, lIdx) => (
        <React.Fragment key={lIdx}>
          {lIdx > 0 && <br />}
          {line}
        </React.Fragment>
      ));

      if (isCyan) {
        return <span key={sIdx} style={{ color: '#38bdf8' }}>{lineElements}</span>;
      }
      return <React.Fragment key={sIdx}>{lineElements}</React.Fragment>;
    });

    if (isHighlighted) {
      return (
        <span key={pIdx} style={{ color: highlightColor }}>
          {renderedSub}
        </span>
      );
    }
    return <React.Fragment key={pIdx}>{renderedSub}</React.Fragment>;
  });
};

import { useVideoModal } from '../context/VideoModalContext';

export default function BowlingAlley({ siteData }) {
  const { openVideoModal } = useVideoModal();
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Bowling Alley...</div>;

  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const { header, footer } = siteData;
  const [activeCategory, setActiveCategory] = useState("Standard 10-Pin Bowling");
  const [expandedCat, setExpandedCat] = useState("Standard 10-Pin Bowling");
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Dynamic SEO Page Title & Meta Description
  useEffect(() => {
    const pageTitle = siteData?.bowlingSeo?.pageTitle || "Bowling Alley Manufacturer in India | Winera International";
    const metaDesc = siteData?.bowlingSeo?.metaDescription || "Looking for a bowling alley manufacturer in India? Winera International supplies premium new and refurbished Brunswick systems, with 15+ years of expertise.";
    document.title = pageTitle;

    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", metaDesc);
    }
  }, [siteData]);

  // Hero background asset constant
  const heroBgImage = getValidImageUrl(siteData?.bowlingHero?.bgUrl, bowlingHeroBg);

  // Bowling Machine categories/cards fallback
  const defaultBowlingCategories = [
    {
      title: "Standard 10-Pin Bowling",
      tag: "High ROI",
      desc: "Full-length regulation 10-pin bowling lanes with string pinsetters, synthetic lanes, and LED capping light effects.",
      img: about3
    },
    {
      title: "Duckpin & Mini Bowling",
      tag: "Space Saver",
      desc: "Compact bowling lanes ideal for smaller venues, lounge bars, and family entertainment centers without shoes requirement.",
      img: ctaArcade
    },
    {
      title: "Highway 66 Mini Lanes",
      tag: "Trending",
      desc: "Ultra-compact mini bowling system featuring smaller balls and automated scoring for high footfall commercial spaces.",
      img: about2
    }
  ];

  const rawBowlingCategories = Array.isArray(siteData?.bowlingCategories?.items) && siteData.bowlingCategories.items.length > 0
    ? siteData.bowlingCategories.items
    : defaultBowlingCategories;

  const bowlingCategories = rawBowlingCategories.map((item, idx) => ({
    title: item.title,
    tag: item.tag || "Featured",
    desc: item.desc || "High profitability commercial bowling lane installation with complete scoring setup.",
    img: item.img || defaultBowlingCategories[idx % defaultBowlingCategories.length].img
  }));

  // Why Choose items dynamic calculation
  const defaultWhyUsItems = [
    { title: "Direct Factory Pricing", desc: "No middleman markup. Transparent factory direct pricing on all bowling equipment." },
    { title: "Turnkey Installation", desc: "Complete 2D/3D layout, foundation building, electrical wiring & scoring setup." },
    { title: "String Pinsetter Tech", desc: "95% fewer mechanical jams & ultra-low maintenance compared to traditional pinsetters." },
    { title: "Custom Scoring Software", desc: "Integrated digital scoreboards, automatic handicap calculations & custom branding." },
    { title: "Lifetime Spare Parts Support", desc: "Pan-India availability of original spare parts, bowling pins & lane oiling supplies." }
  ];

  const defaultBowlingFaqs = [
    {
      q: "Why Choose Refurbished Brunswick Bowling Alley Equipment?",
      a: "We offer refurbished Brunswick bowling equipment that is well-known for its long-term reliability and performance. As one of the most preferred brands worldwide, Brunswick is valued for its stable mechanical capacity and low failure rate making it a top choice for bowling alley equipment globally. One of Brunswick’s standout features is its advanced scoring system that automatically identifies potential issues and provides user-friendly troubleshooting guides. This helps keep your lanes running smoothly with minimal downtime."
    },
    {
      q: "How is Brunswick Equipment Refurbished to Perfection?",
      a: "Our skilled engineers refurbish each set of Brunswick equipment with precision, replacing all worn parts using original Brunswick components. The result? A product that performs like new, at a fraction of the cost."
    },
    {
      q: "Why is the quality of refurbished Brunswick equipment trustworthy?",
      a: "Many bowling centers in India have shut down in recent years due to shifts in the sport's popularity. However, the equipment from these venues often remains in excellent condition, with many systems being only 2–5 years old. Considering Brunswick equipment is built to last 40–50 years, even lightly used units are still in their prime."
    },
    {
      q: "Why Opt for Refurbished Equipment?",
      a: "By choosing our refurbished Brunswick bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that’s been expertly restored, you’ll enjoy top-tier performance, low maintenance, and durability."
    },
    {
      q: "What is the Bowling Alley Setup Cost in India?",
      a: "The bowling alley setup cost in India depends on the number of lanes, equipment condition, and venue size. Winera International provides refurbished Brunswick bowling equipment at a fraction of new equipment cost making it possible to set up a high-end bowling center within a realistic budget. Contact our team for a complete cost-to-revenue report for your specific space."
    },
    {
      q: "What After-Sales Support Does Winera Provide for Bowling Alley Equipment?",
      a: "Our relationship with clients continues well after installation. We provide comprehensive maintenance, servicing, and support for all Brunswick bowling alley equipment we supply ensuring your lanes run smoothly with minimal downtime for years to come."
    },
    {
      q: "How much space is required to set up a bowling alley?",
      a: "A standard bowling lane requires 89 feet in length and 6 feet in width; a minimum of 2 lanes is recommended for commercial setups. Winera assesses your exact dimensions and provides a complete layout plan along with a free ROI report before confirming any equipment."
    },
    {
      q: "What is the difference between a free-fall bowling system and a string bowling system?",
      a: "Free-Fall Bowling System: In this system, the pins fall freely when the bowling ball hits them. It feels just like real bowling played in professional bowling centers.\n\nString Bowling System: In this system, each pin has a string attached at the top. After the ball hits the pins, the strings lift them back into place. It is easier to maintain and more affordable."
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. BOWLING ALLEY HERO BANNER (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-bowling-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › Bowling Alley */}
          <h1 className="winera-bowling-hero-h1" style={{
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
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {(siteData?.bowlingHero?.breadcrumbText || "Bowling").replace("Bowling Alley", "Bowling")}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. BOWLING ALLEY MANUFACTURERS IN INDIA SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-bowling-supplier-section" style={{ padding: '45px 4vw', background: '#F5F5F9' }}>
        <div className="winera-bowling-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Column: Title with Brush Accent, Description & Pill CTA */}
          <div className="winera-bowling-supplier-text" style={{ textAlign: 'left' }}>
            {/* Title with yellow stroke line accent */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '42px',
                fontWeight: '900',
                lineHeight: 1.1,
                color: '#0f172a',
                letterSpacing: '-1px',
                margin: 0
              }}>
                {(() => {
                  const rawTitle = siteData?.bowlingIntro?.title || "*Bowling Alley*<br/>Manufacturers in India";
                  const cleanTitle = rawTitle.includes('Equipment') ? "*Bowling Alley*<br/>Manufacturers in India" : rawTitle;
                  const parts = cleanTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                  return parts.map((part, index) => {
                    if (index % 2 === 1) {
                      return (
                        <span key={index} style={{ color: '#38bdf8' }}>
                          {part}
                        </span>
                      );
                    }
                    if (part.includes('<br/>')) {
                      const subParts = part.split('<br/>');
                      return subParts.map((sp, i) => (
                        <React.Fragment key={i}>
                          {sp}
                          {i < subParts.length - 1 && <br />}
                        </React.Fragment>
                      ));
                    }
                    return part;
                  });
                })()}
              </h2>
            </div>

            <p style={{
              color: '#64748b',
              fontSize: '14px',
              lineHeight: 1.65,
              fontWeight: '500',
              maxWidth: '520px',
              marginBottom: '0px'
            }}>
              {siteData?.bowlingIntro?.desc || "India's trusted source for refurbished Brunswick bowling equipment — complete setup, installation, and a free ROI report before you invest."}
            </p>

            {/* Get Quote From Expert CTA Button with offset rotated backdrop */}
            {(() => {
              const baseLink = siteData?.bowlingIntro?.buttonLink || "https://wa.me/919428989488";
              const defaultMsg = siteData?.bowlingIntro?.waMessage || "Hello Winera International! I want to get a quote and estimation for a Bowling Alley setup. Please share details. [Ref: Bowling Alley Page]";

              let hrefLink = baseLink;
              if (!baseLink.includes('text=')) {
                const separator = baseLink.includes('?') ? '&' : '?';
                hrefLink = `${baseLink}${separator}text=${encodeURIComponent(defaultMsg)}`;
              }

              return (
                <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                  <a
                    href={hrefLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Get Quote From Expert on WhatsApp"
                    className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                  >
                    {siteData?.bowlingIntro?.buttonText || "Get Quote From Expert"}
                  </a>
                </div>
              );
            })()}
          </div>

          {/* Right Column: direct rendering of bowling.webp graphic */}
          <div className="winera-bowling-supplier-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img
              src={getValidImageUrl(siteData?.bowlingIntro?.mainImgUrl || siteData?.bowlingIntro?.imgUrl, bowlingImg)}
              alt="Bowling Alley Manufacturer Winera International"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                maxHeight: '480px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 3.5 PREMIUM BOWLING ALLEY MANUFACTURER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-bowling-premium-section" style={{ padding: '45px 4vw', background: '#F5F5F9', position: 'relative', overflow: 'hidden' }}>
        <div className="winera-bowling-premium-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Title with Yellow Brush Accent Line in 1 Single Line */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', textAlign: 'center', width: '100%' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '380px', height: '12px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h2 className="winera-bowling-premium-title" style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
              margin: 0,
              whiteSpace: 'nowrap',
              width: '100%',
              textAlign: 'center'
            }}>
              {(() => {
                const rawTitle = siteData?.bowlingManufacturer?.title || "Premium Bowling *Alley Manufacturer in India*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#38bdf8' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </h2>
          </div>

          {/* Grid Layout: Text in center/left (3 lines each) and Bowling Pins Graphic fully on Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            {/* Left/Center Text Content Block */}
            <div className="winera-bowling-premium-text" style={{ flex: '1 1 800px', color: '#475569', fontSize: '13.5px', lineHeight: 1.65, fontWeight: '500', textAlign: 'center' }}>
              <p style={{ marginBottom: '22px', maxWidth: '860px', margin: '0 auto 22px' }}>
                {siteData?.bowlingManufacturer?.p1 || "At Winera International Pvt. Ltd., we are proud to be India's leading bowling alley manufacturer and supplier of refurbished Brunswick bowling equipment. With over 15 years of expertise in the industry, we have built a reputation for delivering top-quality bowling alley equipment and exceptional customer service, tailored to fit the unique needs and budgets of our clients."}
              </p>
              <p style={{ maxWidth: '860px', margin: '0 auto' }}>
                {siteData?.bowlingManufacturer?.p2 || "We specialize in providing refurbished Brunswick GS98 & GSX equipment, enhanced with the latest Frameworx or Vector Scoring Systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience."}
              </p>
            </div>

            {/* Right Side: Exploding Bowling Pins & Ball Graphic fully visible */}
            <div className="winera-bowling-pins-explode" style={{ flex: '0 0 250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={getValidImageUrl(siteData?.bowlingManufacturer?.mainImgUrl || siteData?.bowlingManufacturer?.imgUrl, bowlingPinsExplode)}
                alt="Exploding Bowling Pins"
                style={{
                  width: '100%',
                  maxWidth: '260px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 12px 25px rgba(0,0,0,0.08))',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3.6 FREE-FALL & STRING BOWLING MACHINES COMPARISON SECTION (FULL WIDTH FIGMA 1:1) */}
      <section className="winera-bowling-types-section" style={{
        width: '100%',
        padding: '140px 5vw 70px',
        background: `url(${bowlingTypesBg}) center/100% 100% no-repeat`,
        textAlign: 'left'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '70px'
        }}>
          {/* TOP BLOCK: Free-Fall Bowling (Text Left, Image & Spec Badges Right) */}
          <div className="winera-bowling-types-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'center' }}>
            {/* Left Content */}
            <div className="winera-bowling-types-text" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
              <div style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h3 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {(() => {
                    let titleStr = siteData?.bowlingFreeFall?.title;
                    if (!titleStr || !titleStr.includes('<br/>')) {
                      titleStr = "*Free-Fall Bowling:* Give the<br/>Full Professional Experience";
                    }
                    return renderTitleMarkup(titleStr, "*Free-Fall Bowling:* Give the<br/>Full Professional Experience", '#38bdf8');
                  })()}
                </h3>
              </div>

              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '14px', textAlign: 'justify' }}>
                {siteData?.bowlingFreeFall?.p1 || "Free-fall bowling is the traditional game you'll find in professional bowling centers worldwide. When the ball hits the pins, they fall freely and naturally, and a pinsetter machine clears and resets them for the next throw. It delivers the true feel of real bowling, the satisfying strike and the competition-grade experience serious players expect."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '24px', textAlign: 'justify' }}>
                {siteData?.bowlingFreeFall?.p2 || "We specialise in refurbished Brunswick GS98 and GS-X equipment, restored to perform like new and enhanced with the latest Frameworx or Vector scoring systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience. It's the ideal choice for dedicated bowling centers and premium venues where bowling is the main attraction."}
              </p>

              <div className="winera-bowling-types-btn-row" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                <button
                  onClick={() => openVideoModal(siteData?.bowlingFreeFall?.videoUrl, "Free Fall Bowling Showcase")}
                  aria-label="Watch Free Fall Bowling Video"
                  style={{
                    width: '190px',
                    height: '70px',
                    background: `url(${getValidImageUrl(siteData?.bowlingFreeFall?.videoBtnBg, arcadeBtn1)}) center center / 100% 100% no-repeat`,
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '7px 5px 2px 0',
                    textDecoration: 'none'
                  }}
                >
                  <span>{siteData?.bowlingFreeFall?.btnText || "Watch Video"}</span>
                </button>
              </div>

              {/* Mobile Specs List */}
              <div className="winera-bowling-types-mobile-specs" style={{ display: 'none', flexDirection: 'column', gap: '8px', marginTop: '20px', background: '#ffffff', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', border: '1.5px solid #bae6fd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Lane length:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingFreeFall?.specLaneLength || "89 feet per lane"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Lane width:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingFreeFall?.specLaneWidth || "6 feet per lane"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Pinsetter type:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingFreeFall?.specPinsetter || "Free-fall (gravity-based)"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Experience:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingFreeFall?.specExperience || "Professional / competition-grade"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Best for:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingFreeFall?.specBestFor || "Dedicated bowling centers"}</span></div>
              </div>
            </div>

            {/* Right Photo Collage with Overlapping Cyan Pill Specification Badges */}
            <div className="winera-bowling-types-pills-col" style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Main Oval Free-Fall Pins Image: Mask-group.webp */}
              <img
                src={siteData?.bowlingFreeFall?.mainImgUrl || siteData?.bowlingFreeFall?.imgUrl || maskGroupImg}
                alt="Free Fall Bowling Pinsetter"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  left: '0px',
                  width: '520px',
                  height: 'auto',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                }}
              />

              {/* Stacked Cyan Specification Pills matching Figma Screenshot 1:1 */}
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                zIndex: 10,
                filter: 'drop-shadow(0 12px 25px rgba(56, 189, 248, 0.25))'
              }}>
                {/* Pill 1: Lane length */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '290px',
                  transform: 'translateX(-20px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane length:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specLaneLength || "89 feet per lane"}
                  </span>
                </div>

                {/* Pill 2: Lane width */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '290px',
                  transform: 'translateX(35px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane width:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specLaneWidth || "6 feet per lane"}
                  </span>
                </div>

                {/* Pill 3: Pinsetter type */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '320px',
                  transform: 'translateX(75px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Pinsetter type:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specPinsetter || "Free-fall (gravity-based)"}
                  </span>
                </div>

                {/* Pill 4: Experience */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '305px',
                  transform: 'translateX(45px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Experience:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {siteData?.bowlingFreeFall?.specExperience || "Professional /\ncompetition-grade"}
                  </span>
                </div>

                {/* Pill 5: Best for */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '305px',
                  transform: 'translateX(-15px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Best for:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {siteData?.bowlingFreeFall?.specBestFor || "Dedicated bowling\ncenters, premium venues"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BLOCK: String Bowling Machines (Image & Yellow Spec Badges Left, Text Right) */}
          <div className="winera-bowling-types-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', alignItems: 'center' }}>
            {/* Left Photo Collage with Overlapping Yellow Specification Badges */}
            <div className="winera-bowling-types-pills-col" style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Main Friends Bowling Photo: Mask-group-01.webp */}
              <img
                src={siteData?.bowlingString?.mainImgUrl || siteData?.bowlingString?.imgUrl || maskGroup01Img}
                alt="String Bowling Friends"
                style={{
                  position: 'absolute',
                  right: '0px',
                  width: '520px',
                  height: 'auto',
                  maxHeight: '460px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                }}
              />

              {/* Stacked Yellow Specification Pills matching Figma Screenshot 1:1 */}
              <div style={{
                position: 'absolute',
                left: '-115px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                zIndex: 10,
                filter: 'drop-shadow(0 12px 25px rgba(255, 205, 0, 0.3))'
              }}>
                {/* Pill 1: Pin reset */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '335px',
                  transform: 'translateX(50px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Pin reset:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {siteData?.bowlingString?.specPinReset || "Overhead string\nmechanism"}
                  </span>
                </div>

                {/* Pill 2: Lane footprint */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '345px',
                  transform: 'translateX(10px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane footprint :
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {(() => {
                      const raw = siteData?.bowlingString?.specFootprint || "Shorter than a full 89 ft\nfree-fall lane";
                      return raw.includes('<br') ? raw.split(/<br\s*\/?>/i).map((part, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <br />}
                          {part}
                        </React.Fragment>
                      )) : raw;
                    })()}
                  </span>
                </div>

                {/* Pill 3: Lane width */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '295px',
                  transform: 'translateX(-40px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane width :
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingString?.specLaneWidth || "6 feet per lane"}
                  </span>
                </div>

                {/* Pill 4: Maintenance */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '335px',
                  transform: 'translateX(10px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Maintenance:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {siteData?.bowlingString?.specMaintenance || "Low — fewer parts,\neasy servicing"}
                  </span>
                </div>

                {/* Pill 5: Best for */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '4px 18px 4px 13px',
                  borderRadius: '35px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '18px',
                  maxWidth: '355px',
                  transform: 'translateX(50px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '5px 15px',
                    margin: '3px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Best for:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '11.5px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>
                    {siteData?.bowlingString?.specBestFor || "FECs, malls, resorts,\ncafés, gaming zones"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="winera-bowling-types-text">
              <div style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h3 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {(() => {
                    let titleStr = siteData?.bowlingString?.title;
                    if (!titleStr || !titleStr.includes('<br/>')) {
                      titleStr = "String Bowling<br/>Machines: *Affordable*<br/>*Bowling Setup for Every*<br/>*Venue*";
                    }
                    return renderTitleMarkup(titleStr, "String Bowling<br/>Machines: *Affordable*<br/>*Bowling Setup for Every*<br/>*Venue*", '#38bdf8');
                  })()}
                </h3>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '14px', textAlign: 'justify' }}>
                {siteData?.bowlingString?.p1 || "Add a complete, ready-to-play bowling setup to your venue at a lower upfront cost than a traditional free-fall system. We supply and install full string bowling lanes pins, strings, scoring screens, and commissioning so you get a finished attraction, not just a machine."}
              </p>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '24px', textAlign: 'justify' }}>
                {siteData?.bowlingString?.p2 || "String systems have fewer moving parts, which means quieter lanes, easier maintenance your own team can handle, and a compact footprint that fits where a full 89 ft lane won't. That's why family entertainment centers, malls, resorts, and cafés choose them. Lower to set up, lower to run, and quick to start earning."}
              </p>

              <div style={{ marginBottom: '45px' }}>
                <a
                  href={siteData?.bowlingString?.brochureUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  download
                  aria-label="Download String Bowling Brochure"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '225px',
                    height: '63px',
                    paddingTop: '5px',
                    background: `url(${downloadButtonImg}) center center / 100% 100% no-repeat`,
                    color: '#ffffff',
                    fontSize: '14.5px',
                    fontWeight: '600',
                    textAlign: 'center',
                    lineHeight: 1,
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {siteData?.bowlingString?.brochureBtnText || "Download Our Brochure"}
                </a>
              </div>

              {/* Mobile Specs List */}
              <div className="winera-bowling-types-mobile-specs" style={{ display: 'none', flexDirection: 'column', gap: '8px', marginTop: '20px', background: '#ffffff', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', border: '1.5px solid #fde047' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Pin reset:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingString?.specPinReset || "Overhead string mechanism"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Lane footprint:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingString?.specFootprint || "Shorter than 89 ft lane"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Lane width:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingString?.specLaneWidth || "6 feet per lane"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Maintenance:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingString?.specMaintenance || "Low — fewer parts"}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ fontWeight: '700', color: '#475569' }}>Best for:</span><span style={{ fontWeight: '800', color: '#0f172a' }}>{siteData?.bowlingString?.specBestFor || "FECs, malls, resorts"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.7 INVESTMENT & ROI BANNER SECTION (FIGMA 1:1) */}
      <section className="winera-bowling-roi-section" style={{ padding: '70px 4vw', background: '#F5F5F9' }}>
        <div className="winera-bowling-roi-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          background: '#ffffff',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          minHeight: '440px'
        }}>
          {/* Left Column: White background with Yellow Brush Title, Dual Paragraphs & Yellow Button */}
          <div className="winera-bowling-roi-text" style={{ padding: '50px 55px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
            <div style={{ position: 'relative', display: 'block', marginBottom: '20px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h3 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, margin: 0 }}>
                {(() => {
                  const rawTitle = siteData?.bowlingRoi?.title || "*Investment* & ROI";
                  const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
                  return parts.map((part, index) => {
                    if (index % 2 === 1) {
                      return (
                        <span key={index} style={{ color: '#38bdf8' }}>
                          {part}
                        </span>
                      );
                    }
                    return part;
                  });
                })()}
              </h3>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '18px' }}>
              {siteData?.bowlingRoi?.p1 || "Setting up a bowling center is a significant investment which is why we don't just sell you equipment and walk away. We're India's ROI-First Game Zone Developer. Before you commit to a project, every client receives a complete report covering product costing, maintenance costs, and projected revenue timeline, so your investment decision is based on real numbers, not estimates."}
            </p>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '32px' }}>
              {siteData?.bowlingRoi?.p2 || "By choosing our refurbished bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that's been expertly restored, you'll enjoy top-tier performance, low maintenance, and durability without the cost of brand-new equipment."}
            </p>

            <div>
              {(() => {
                const baseLink = siteData?.bowlingRoi?.videoUrl || "https://wa.me/919428989488";
                const defaultMsg = siteData?.bowlingRoi?.waMessage || "Hello Winera International! I want to get custom Bowling ROI calculation & setup guidance. Please share details. [Ref: Bowling Alley Page]";

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
                      width: '271px',
                      height: '70px',
                      paddingTop: '2px',
                      background: `url(${getValidImageUrl(siteData?.bowlingRoi?.btnBg, bowlingBtnShape)}) center center / 100% 100% no-repeat`,
                      color: '#091E2B',
                      fontSize: '15px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#25d366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="white">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </div>
                    <span>{siteData?.bowlingRoi?.btnText || "Talk to an ROI Expert"}</span>
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Column: High-Tech Bowling Alley Image (Vector.webp) */}
          <div className="winera-bowling-roi-img" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'flex-end',
            overflow: 'hidden'
          }}>
            <img
              src={getValidImageUrl(siteData?.bowlingRoi?.mainImgUrl || siteData?.bowlingRoi?.imgUrl, vectorImg)}
              alt="Bowling Alley Lanes ROI"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING IMAGE 1:1) */}
      <section className="winera-bowling-whyus-section" style={{ padding: '45px 4vw', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Single row: Bowling pins left + Title & Content right */}
          <div className="winera-bowling-whyus-grid" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }}>
            {/* Left: Blue Bowling Ball & Exploding Pins PNG Graphic */}
            <div className="winera-bowling-whyus-img" style={{ flex: '0 0 360px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={getValidImageUrl(siteData?.bowlingWhyUs?.mainImgUrl || siteData?.bowlingWhyUs?.graphicUrl || siteData?.bowlingWhyUs?.imgUrl, bowlingBallPinsBlue)}
                alt="Blue Bowling Ball and Pins"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 12px 25px rgba(0,0,0,0.12))'
                }}
              />
            </div>

            {/* Right: Yellow brush accent + Single-line title + paragraphs */}
            <div className="winera-bowling-whyus-text" style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Yellow brush accent line */}
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '510px', maxWidth: '100%', height: '11px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
              />
              {/* Single-line title */}
              <h2 style={{
                fontSize: '42px',
                fontWeight: '900',
                color: '#0f172a',
                lineHeight: 1.15,
                margin: '0 0 20px',
                letterSpacing: '-0.5px',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ color: '#38bdf8' }}>Why Choose</span> Winera International?
              </h2>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '14px', maxWidth: '780px', margin: '0 auto 14px' }}>
                {siteData?.bowlingWhyUs?.p1 || "At Winera International, we bring over 15 years of industry experience as a trusted bowling alley manufacturer in India. We are the largest bowling alley supplier in the country, with more than 30 complete setups delivered successfully."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '0 auto', maxWidth: '780px' }}>
                {siteData?.bowlingWhyUs?.p2 || "Our equipment is sourced from the USA/China, ensuring proven quality. We provide affordable refurbished options along with installation, maintenance, and support across India with low failure rates and easy servicing, tailored to your budget and space."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
        showBottomButton={true}
        buttonText="Know More"
      />

      {/* 8. WHAT OUR CLIENTS SAY SECTION (USES HOME PAGE MONGO PERSISTED DATA) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 9. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection
        sectionData={siteData?.bowlingRelated}
        accentColor="#38bdf8"
        accentWidth="370px"
        accentMaxWidth="95%"
        accentHeight="11px"
        accentMarginBottom="8px"
        accentAlign="left-inline"
      />

      {/* 10. FREQUENTLY ASKED QUESTIONS SECTION (DYNAMIC BOWLING FAQS WITH FALLBACK) */}
      <FaqSection
        faqList={Array.isArray(siteData?.bowlingFaqs) && siteData.bowlingFaqs.length >= 8 ? siteData.bowlingFaqs : defaultBowlingFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
        accentWidth="510px"
        accentMaxWidth="95%"
        accentHeight="11px"
        accentMarginBottom="8px"
        accentAlign="left-inline"
      />

      {/* SEO PARTNER PARAGRAPH */}
      <div style={{ maxWidth: '1200px', margin: '20px auto 10px', padding: '0 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', fontWeight: '500' }}>
          Partner with <a href="https://winera.in/" style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'underline' }}>Winera International</a>, your trusted bowling alley manufacturer in India and reliable bowling alley supplier, to set your centre up for long-term success.
        </p>
      </div>

      {/* 11. CTA BANNER SECTION (MATCHING FIGMA 1:1) */}
      <CtaBanner
        showOverlay={false}
        align="center"
        buttonTheme="yellow_white"
        buttonBg={getValidImageUrl(siteData?.bowlingCta?.btnBg, ctaBtn3)}
        gradientTitle={true}
        minHeight="300px"
        descriptionFontSize="18px"
        bgUrl={siteData?.bowlingCta?.bgUrl && !siteData.bowlingCta.bgUrl.includes('bowling-last-image-bg') ? siteData.bowlingCta.bgUrl : null}
        bg={trampolineParkCtaBg}
        tagline={null}
        title={siteData?.bowlingCta?.title || "NEED ANY CONSULTATIONS?"}
        subtitle={null}
        description={
          siteData?.bowlingCta?.description !== undefined
            ? siteData.bowlingCta.description
            : "Invest in our quality bowling equipment and elevate your venue with long-lasting, world-class bowling gear without overspending."
        }
        buttonText={
          siteData?.bowlingCta?.buttonText !== undefined
            ? siteData.bowlingCta.buttonText
            : "Request a Quote"
        }
        buttonLink={
          siteData?.bowlingCta?.buttonLink !== undefined
            ? siteData.bowlingCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* 12. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
