import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import FaqSection from '../components/FaqSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBanner from '../components/CtaBanner';
import RelatedProductsSection from '../components/RelatedProductsSection';

import wineraLogo from '../assets/logo.png';
import arcadeHeroBg from '../assets/arcade-hero-bg.png';
import bowlingHeroBg from '../assets/bowling-hero-bg.png';
import bowlingPinsExplode from '../assets/bowling-pins-explode.png';
import bowlingBallPinsBlue from '../assets/bowling-ball-pins-blue.png';
import bowlingTypesBg from '../assets/bowling-types-bg.png';
import ctaGamersBg from '../assets/cta-gamers-bg.png';
import ctaArcade from '../assets/cta-arcade.png';
import arcadeBoy from '../assets/arcade-boy.png';
import arcadeHall from '../assets/arcade-hall.png';
import doodleArrow from '../assets/doodle-arrow.png';
import bikeArcade from '../assets/bike-arcade.png';
import builtCommercialBg from '../assets/built-commercial-bg.png';
import commercialTeam from '../assets/commercial-team.png';
import needConsultationsBg from '../assets/need-consultations-bg.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';
import ctaSoftplayBg from '../assets/cta-softplay-bg.png';
import yellowBrushAccent from '../assets/yellow-stroke-line.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import projHulaboo from '../assets/proj-hulaboo.png';
import projNeon1 from '../assets/proj-neonpanda1.png';
import projSoft1 from '../assets/proj-softplay1.png';

import { Trophy, Flame, Sparkles, Star, ShieldCheck, Zap, Shield, Wrench, Play, ChevronLeft, ChevronRight, ChevronDown, CheckCheck, MessageCircle, UserCheck, Settings, Database, Coins, Headset, Box, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function BowlingAlley({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Bowling Alley...</div>;

  const { header, footer } = siteData;
  const [activeCategory, setActiveCategory] = useState("Standard 10-Pin Bowling");
  const [expandedCat, setExpandedCat] = useState("Standard 10-Pin Bowling");
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Hero background asset constant
  const heroBgImage = bowlingHeroBg;

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
      q: "1. What is the space required for a bowling alley setup?",
      a: "A full-size regulation 10-pin bowling lane requires approximately 89 to 100 feet in length and 6 feet in width per lane. For smaller spaces, mini bowling and duckpin systems require only 35 to 45 feet in length."
    },
    {
      q: "2. What is the difference between string pinsetters and free-fall pinsetters?",
      a: "String pinsetters use lightweight high-strength nylon cords attached to pins, reducing mechanical moving parts by 90% and cutting maintenance costs drastically while remaining USBC certified for open play. Free-fall pinsetters use traditional mechanical pin elevators ideal for professional tournament venues."
    },
    {
      q: "3. What is the average ROI period for a commercial bowling alley in India?",
      a: "Commercial bowling alleys typically achieve full ROI within 14 to 22 months depending on footfall, pricing per game, and food/beverage integration."
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. BOWLING ALLEY HERO BANNER */}
      <section className="winera-bowling-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '180px',
        paddingBottom: '90px',
        background: `url(${heroBgImage}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          <h1 className="winera-bowling-hero-h1" style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
            lineHeight: 1.15
          }}>
            {(() => {
              const rawTitle = siteData?.bowlingHero?.title || "*Bowling* Alley";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#ffcd00' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </h1>

          <p className="winera-bowling-hero-breadcrumb" style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#ffffff',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <a href="/products" style={{ color: '#ffffff', textDecoration: 'none' }}>Products</a>
            <span style={{ color: '#ffcd00' }}>&gt;</span>
            <span style={{ color: '#ffcd00' }}>{siteData?.bowlingHero?.breadcrumbText || "Bowling Alley"}</span>
          </p>
        </div>
      </section>

      {/* 3. BOWLING ALLEY MANUFACTURERS IN INDIA SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-bowling-supplier-section" style={{ padding: '100px 4vw 110px', background: '#F5F5F9' }}>
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
                fontSize: '3.2rem',
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
              marginBottom: '32px'
            }}>
              {siteData?.bowlingIntro?.desc || "India's trusted source for refurbished Brunswick bowling equipment — complete setup, installation, and a free ROI report before you invest."}
            </p>

            {/* Get Quote From Expert CTA Button matching Figma Screenshot */}
            <a
              href="https://wa.me/919428989488"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '900',
                padding: '16px 36px',
                borderRadius: '16px',
                border: '4px solid #ffcd00',
                boxShadow: '0 10px 25px rgba(56, 189, 248, 0.4)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              Get Quote From Expert
            </a>
          </div>

          {/* Right Column: Stacked Image Collage with Custom Rounded Shape & Floating Winera Badge (FIGMA 1:1) */}
          <div className="winera-bowling-supplier-img" style={{ position: 'relative', width: '100%', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 1. Top Right Dark Neon Bowling Alley Image with Yellow Outer Shadow/Border Frame */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '0',
              width: '340px',
              height: '270px',
              borderRadius: '45px 45px 45px 45px',
              background: '#ffcd00',
              padding: '6px',
              boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
              zIndex: 1
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '40px 40px 40px 40px',
                overflow: 'hidden',
                background: `url(${siteData?.bowlingIntro?.secondaryImgUrl || about3}) center/cover no-repeat`
              }}></div>
            </div>

            {/* 2. Main Front Bowling Friends Image with Custom Slanted Rounded Corners & Thick White Border */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '0',
              width: '370px',
              height: '280px',
              borderRadius: '50px 10px 40px 40px',
              border: '7px solid #ffffff',
              overflow: 'hidden',
              boxShadow: '0 25px 55px rgba(0,0,0,0.15)',
              background: `url(${siteData?.bowlingIntro?.mainImgUrl || ctaArcade}) center/cover no-repeat`,
              zIndex: 10
            }}></div>

            {/* 3. Floating Winera Logo Badge Overlapping Bottom Right of Front Image */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '35px',
              zIndex: 20,
              background: '#ffffff',
              borderRadius: '16px',
              padding: '10px 22px',
              border: '2px solid #38bdf8',
              boxShadow: '0 12px 35px rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src={wineraLogo} alt="Winera Logo" style={{ height: '30px', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 PREMIUM BOWLING ALLEY MANUFACTURER IN INDIA SECTION (FIGMA 1:1) */}
      <section className="winera-bowling-premium-section" style={{ padding: '90px 4vw 100px', background: '#f5f5f9', textAlign: 'center', position: 'relative' }}>
        <div className="winera-bowling-premium-container" style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          {/* Section Title with Yellow Brush Accent Top Line */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: '3.1rem',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              margin: 0
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

          {/* Double Paragraph Explanatory Content */}
          <div style={{ maxWidth: '820px', margin: '0 auto 36px', color: '#475569', fontSize: '13.5px', lineHeight: 1.7, fontWeight: '500' }}>
            <p style={{ marginBottom: '18px' }}>
              {siteData?.bowlingManufacturer?.p1 || "At Winera International Pvt. Ltd., we are proud to be India's leading bowling alley manufacturer and supplier of refurbished Brunswick bowling equipment. With over 15 years of expertise in the industry, we have built a reputation for delivering top-quality bowling alley equipment and exceptional customer service, tailored to fit the unique needs and budgets of our clients."}
            </p>
            <p style={{ margin: 0 }}>
              {siteData?.bowlingManufacturer?.p2 || "We specialize in providing refurbished Brunswick GS98 & GSX equipment, enhanced with the latest Frameworx or Vector Scoring Systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience."}
            </p>
          </div>

          {/* Watch Video Pill Button matching Figma */}
          <a
            href={siteData?.bowlingManufacturer?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '800',
              padding: '14px 44px',
              borderRadius: '16px',
              border: '3px solid #ffcd00',
              boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            Watch Video
          </a>

          {/* Floating Exploding Bowling Pins & Ball Image Graphic on Right side */}
          <div className="winera-bowling-pins-explode" style={{
            position: 'absolute',
            right: '-120px',
            top: '50%',
            transform: 'translateY(-40%)',
            width: '260px',
            pointerEvents: 'none',
            zIndex: 10,
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.12))'
          }}>
            <img src={bowlingPinsExplode} alt="Exploding Bowling Pins" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* 3.6 FREE-FALL & STRING BOWLING MACHINES COMPARISON SECTION (FULL WIDTH FIGMA 1:1) */}
      <section className="winera-bowling-types-section" style={{
        width: '100%',
        padding: '70px 4vw 90px',
        background: `url(${bowlingTypesBg}) center/100% 100% no-repeat`,
        textAlign: 'left'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '70px'
        }}>
          {/* TOP BLOCK: Free-Fall Bowling (Text Left, Image & Spec Badges Right) */}
          <div className="winera-bowling-types-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Left Content */}
            <div className="winera-bowling-types-text">
              <div style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  <span style={{ color: '#38bdf8' }}>Free-Fall Bowling:</span> Give the Full Professional Experience
                </h3>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '14px' }}>
                {siteData?.bowlingFreeFall?.p1 || "We specialize in providing refurbished Brunswick GS98 & GSX equipment, enhanced with the latest Frameworx or Vector Scoring Systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience."}
              </p>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '24px' }}>
                {siteData?.bowlingFreeFall?.p2 || "We specialise in refurbished Brunswick GS98 and GS-X equipment, restored to perform like new and enhanced with the latest Frameworx or Vector scoring systems based on your specific requirements. Our approach is simple — offer the best bowling solutions to match both your budget and venue dimensions, ensuring an outstanding bowling experience. It's the ideal choice for dedicated bowling centers and premium venues where bowling is the main attraction."}
              </p>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={siteData?.bowlingFreeFall?.videoUrl || "https://wa.me/919428989488"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#ffcd00',
                    color: '#0f172a',
                    fontSize: '13.5px',
                    fontWeight: '900',
                    padding: '12px 36px',
                    borderRadius: '14px',
                    boxShadow: '0 6px 20px rgba(255, 205, 0, 0.4)',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  {siteData?.bowlingFreeFall?.btnText || "Watch Video"}
                </a>

                <a
                  href={siteData?.bowlingFreeFall?.brochureUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  download
                  style={{
                    background: '#38bdf8',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: '900',
                    padding: '12px 32px',
                    borderRadius: '14px',
                    boxShadow: '0 6px 20px rgba(56, 189, 248, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  {siteData?.bowlingFreeFall?.brochureBtnText || "Download Brochure"}
                </a>
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
            <div className="winera-bowling-types-pills-col" style={{ position: 'relative', width: '100%', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Main Oval Free-Fall Pins Image - Bigger & More Visible */}
              <div style={{
                position: 'absolute',
                left: '-10px',
                width: '460px',
                height: '360px',
                borderRadius: '180px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                border: '5px solid #ffffff',
                background: `url(${siteData?.bowlingFreeFall?.imgUrl || about3}) center/cover no-repeat`
              }}></div>

              {/* Stacked Cyan Specification Pills matching Figma Screenshot 1:1 */}
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 10,
                filter: 'drop-shadow(0 12px 25px rgba(56, 189, 248, 0.25))'
              }}>
                {/* Pill 1: Lane length */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(90px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane length:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specLaneLength || "89 feet per lane"}
                  </span>
                </div>

                {/* Pill 2: Lane width */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(110px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane width:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specLaneWidth || "6 feet per lane"}
                  </span>
                </div>

                {/* Pill 3: Pinsetter type */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '400px',
                  transform: 'translateX(125px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Pinsetter type:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingFreeFall?.specPinsetter || "Free-fall (gravity-based)"}
                  </span>
                </div>

                {/* Pill 4: Experience */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(105px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Experience:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '12.5px', lineHeight: 1.25 }}>
                    {siteData?.bowlingFreeFall?.specExperience || "Professional /\ncompetition-grade"}
                  </span>
                </div>

                {/* Pill 5: Best for */}
                <div style={{
                  background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '390px',
                  transform: 'translateX(70px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Best for:
                  </span>
                  <span style={{ color: '#ffffff', fontWeight: '800', fontSize: '12.5px', lineHeight: 1.25 }}>
                    {siteData?.bowlingFreeFall?.specBestFor || "Dedicated bowling\ncenters, premium venues"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BLOCK: String Bowling Machines (Image & Yellow Spec Badges Left, Text Right) */}
          <div className="winera-bowling-types-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '40px', alignItems: 'center' }}>
            {/* Left Photo Collage with Overlapping Yellow Specification Badges */}
            <div className="winera-bowling-types-pills-col" style={{ position: 'relative', width: '100%', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Main Friends Bowling Photo - Bigger & More Visible */}
              <div style={{
                position: 'absolute',
                right: '-10px',
                width: '460px',
                height: '360px',
                borderRadius: '180px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                border: '5px solid #ffffff',
                background: `url(${siteData?.bowlingString?.imgUrl || ctaArcade}) center/cover no-repeat`
              }}></div>

              {/* Stacked Yellow Specification Pills matching Figma Screenshot 1:1 */}
              <div style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 10,
                filter: 'drop-shadow(0 12px 25px rgba(255, 205, 0, 0.3))'
              }}>
                {/* Pill 1: Pin reset */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(-70px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Pin reset:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingString?.specPinReset || "Overhead string mechanism"}
                  </span>
                </div>

                {/* Pill 2: Lane footprint */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '390px',
                  transform: 'translateX(-105px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane footprint:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '12.5px', lineHeight: 1.25 }}>
                    {siteData?.bowlingString?.specFootprint || "Shorter than a full 89 ft\nfree-fall lane"}
                  </span>
                </div>

                {/* Pill 3: Lane width */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(-125px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Lane width:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    {siteData?.bowlingString?.specLaneWidth || "6 feet per lane"}
                  </span>
                </div>

                {/* Pill 4: Maintenance */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '380px',
                  transform: 'translateX(-105px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Maintenance:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '12.5px', lineHeight: 1.25 }}>
                    {siteData?.bowlingString?.specMaintenance || "Low — fewer parts,\neasy servicing"}
                  </span>
                </div>

                {/* Pill 5: Best for */}
                <div style={{
                  background: 'linear-gradient(90deg, #ffcd00 0%, #facc15 100%)',
                  padding: '5px 22px 5px 6px',
                  borderRadius: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '390px',
                  transform: 'translateX(-70px)'
                }}>
                  <span style={{
                    background: '#ffffff',
                    color: '#475569',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    Best for:
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '12.5px', lineHeight: 1.25 }}>
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
                <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {(() => {
                    const rawTitle = siteData?.bowlingString?.title || "String Bowling Machines: *Affordable Bowling Setup for Every Venue*";
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

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '14px' }}>
                {siteData?.bowlingString?.p1 || "Add a complete, ready-to-play bowling setup to your venue at a lower upfront cost than a traditional free-fall system. We supply and install full string bowling lanes pins, strings, scoring screens, and commissioning so you get a finished attraction, not just a machine."}
              </p>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '24px' }}>
                {siteData?.bowlingString?.p2 || "String systems have fewer moving parts, which means quieter lanes, easier maintenance your own team can handle, and a compact footprint that fits where a full 89 ft lane won't. That's why family entertainment centers, malls, resorts, and cafés choose them. Lower to set up, lower to run, and quick to start earning."}
              </p>

              <a
                href={siteData?.bowlingString?.videoUrl || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffcd00',
                  color: '#0f172a',
                  fontSize: '13.5px',
                  fontWeight: '900',
                  padding: '12px 36px',
                  borderRadius: '14px',
                  boxShadow: '0 6px 20px rgba(255, 205, 0, 0.4)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                {siteData?.bowlingString?.btnText || "Watch Video"}
              </a>

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
      <section className="winera-bowling-roi-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9' }}>
        <div className="winera-bowling-roi-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '24px',
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
              <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, margin: 0 }}>
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
              {siteData?.bowlingRoi?.p1 || "Add a complete, ready-to-play bowling setup to your venue at a lower upfront cost than a traditional free-fall system. We supply and install full string bowling lanes pins, strings, scoring screens, and commissioning so you get a finished attraction, not just a machine."}
            </p>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '32px' }}>
              {siteData?.bowlingRoi?.p2 || "By choosing our refurbished bowling systems, you can create a high-end bowling center at a cost-effective budget. With reliable machinery that's been expertly restored, you'll enjoy top-tier performance, low maintenance, and durability without the cost of brand-new equipment."}
            </p>

            <div>
              <a
                href={siteData?.bowlingRoi?.videoUrl || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffcd00',
                  color: '#0f172a',
                  fontSize: '14px',
                  fontWeight: '900',
                  padding: '14px 44px',
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(255, 205, 0, 0.4)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                {siteData?.bowlingRoi?.btnText || "Watch Video"}
              </a>
            </div>
          </div>

          {/* Right Column: High-Tech Bowling Alley Image with Diagonal Blue Slanted Divider Border */}
          <div className="winera-bowling-roi-img" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: `url(${siteData?.bowlingRoi?.imgUrl || about3}) center/cover no-repeat`,
            clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
            marginLeft: '-30px'
          }}>
            {/* Cyan Slanted Border Line on the diagonal edge */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '16px',
              height: '100%',
              background: '#38bdf8'
            }}></div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WINERA INTERNATIONAL SECTION (FIGMA 1:1) */}
      <section className="winera-bowling-whyus-section" style={{ padding: '90px 4vw 100px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header Banner Block with Left Floating Blue Bowling Ball Pins & Centered Yellow Brush Title */}
          <div className="winera-bowling-whyus-grid" style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            {/* Left Column: Blue Bowling Ball & Exploding Pins PNG Graphic */}
            <div className="winera-bowling-whyus-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={siteData?.bowlingWhyUs?.graphicUrl || bowlingBallPinsBlue}
                alt="Blue Bowling Ball and Pins"
                style={{
                  width: '260px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.1))'
                }}
              />
            </div>

            {/* Right Column: Title with Yellow Brush Accent Top Line & Dual Centered Paragraphs */}
            <div className="winera-bowling-whyus-text" style={{ textAlign: 'center', maxWidth: '820px' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '320px', height: '14px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '3.2rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0, letterSpacing: '-1px' }}>
                  {(() => {
                    const rawTitle = siteData?.bowlingWhyUs?.title || "*Why Choose* Winera International?";
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

              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '16px' }}>
                {siteData?.bowlingWhyUs?.p1 || "At Winera International, we bring over 15 years of industry experience as a trusted bowling alley manufacturer in India. We are the largest bowling alley supplier in the country, with more than 30 complete setups delivered successfully."}
              </p>

              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.bowlingWhyUs?.p2 || "Our equipment is sourced from the USA/China, ensuring proven quality. We provide affordable refurbished options along with installation, maintenance, and support across India with low failure rates and easy servicing, tailored to your budget and space."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Project</span></>}
      />

      {/* 8. WHAT OUR CLIENTS SAY SECTION (USES HOME PAGE MONGO PERSISTED DATA) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 9. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection sectionData={siteData?.bowlingRelated} accentColor="#38bdf8" />

      {/* 10. FREQUENTLY ASKED QUESTIONS SECTION (DYNAMIC BOWLING FAQS WITH FALLBACK) */}
      <FaqSection
        faqList={Array.isArray(siteData?.bowlingFaqs) && siteData.bowlingFaqs.length > 0 ? siteData.bowlingFaqs : defaultBowlingFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 11. CTA BANNER SECTION (MATCHING FIGMA 1:1) */}
      <CtaBanner
        align="center"
        bg={siteData?.bowlingCta?.bgUrl || ctaSoftplayBg}
        subtitle={siteData?.bowlingCta?.whiteText || "Invest in our quality bowling equipment and elevate your venue with long-lasting, world-class bowling gear without overspending."}
        title={
          <>
            <span style={{ color: '#ffcd00' }}>{siteData?.bowlingCta?.yellowText ?? "NEED ANY"}</span> <span style={{ color: '#ffffff' }}>{siteData?.bowlingCta?.cyanText ?? "BOWLING CONSULTATIONS ?"}</span>
          </>
        }
        buttonText={siteData?.bowlingCta?.buttonText ?? "Get Quote Now"}
        buttonLink={siteData?.bowlingCta?.buttonLink ?? "https://wa.me/919428989488"}
      />

      {/* 12. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
