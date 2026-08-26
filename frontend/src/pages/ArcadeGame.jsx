import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import FaqSection from '../components/FaqSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBanner from '../components/CtaBanner';
import RelatedProductsSection from '../components/RelatedProductsSection';
import arcadeHeroBg from '../assets/arcade-hero-bg.png';
import ctaGamersBg from '../assets/cta-gamers-bg.png';
import ctaArcade from '../assets/cta-arcade.png';
import arcadeBoy from '../assets/arcade-boy.png';
import arcadeHall from '../assets/arcade-hall.png';
import doodleArrow from '../assets/doodle-arrow.png';
import bikeArcade from '../assets/bike-arcade.png';
import builtCommercialBg from '../assets/built-commercial-bg.png';
import commercialTeam from '../assets/commercial-team.png';
import aboutUsSectionImg from '../assets/about-us-section.png';
import needConsultationsBg from '../assets/need-consultations-bg.png';
import yellowBrushAccent from '../assets/yellow-stroke-line.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import superAirHockeyImg from '../assets/super-air-hockey.jpg';
import puckCarnivalAirHockeyImg from '../assets/puck-carnival-air-hockey.jpg';
import dazzlingAirHockeyImg from '../assets/dazzling-air-hockey.jpg';
import auroraAirHockeyImg from '../assets/aurora-air-hockey.jpg';
import ochaAirHockeyImg from '../assets/ocha-air-hockey.jpg';
import aeroXAirHockeyImg from '../assets/aero-x-air-hockey.jpg';
import projHulaboo from '../assets/proj-hulaboo.png';
import projNeon1 from '../assets/proj-neonpanda1.png';
import projSoft1 from '../assets/proj-softplay1.png';
import testiOwner from '../assets/testi-owner.png';
import { Gamepad2, Trophy, Flame, Sparkles, Star, ShieldCheck, Zap, Shield, Wrench, Play, ChevronLeft, ChevronRight, ChevronDown, CheckCheck, MessageCircle, UserCheck, Settings, Database, Coins, Headset, Box, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ArcadeGame({ siteData }) {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Arcade Games");
  const [expandedCat, setExpandedCat] = useState("Arcade Games");
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [mobileProdIndex, setMobileProdIndex] = useState(0);

  const arcadeSeo = siteData?.arcadeSeo || {
    pageTitle: "Arcade Games Manufacturer in India | Winera International",
    metaDescription: "Looking for arcade game machines in India? Winera International offers redemption games, kiddie rides, racing simulators, and more at direct factory prices."
  };

  useEffect(() => {
    document.title = arcadeSeo.pageTitle || arcadeSeo.title || "Arcade Games Manufacturer in India | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', arcadeSeo.metaDescription || arcadeSeo.description || "Looking for arcade game machines in India? Winera International offers redemption games, kiddie rides, racing simulators, and more at direct factory prices.");
  }, [arcadeSeo]);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, footer } = siteData;

  const arcadeGames = Array.isArray(siteData?.arcadeCategories) && siteData.arcadeCategories.length > 0
    ? siteData.arcadeCategories
    : [
        { title: "Super Air Hockey", name: "Super Air Hockey", category: "Arcade Games", tag: "Popular", desc: "Commercial grade heavy-duty air hockey table with digital score display.", img: superAirHockeyImg },
        { title: "Puck Carnival Air Hockey", name: "Puck Carnival Air Hockey", category: "Arcade Games", tag: "Hot Seller", desc: "Multi-puck carnival style air hockey machine for high footfall game zones.", img: puckCarnivalAirHockeyImg },
        { title: "Dazzling Air Hockey - Multi Puck", name: "Dazzling Air Hockey - Multi Puck", category: "Arcade Games", tag: "High Revenue", desc: "LED illuminated stainless steel air hockey table with sound effects.", img: dazzlingAirHockeyImg },
        { title: "Aurora Air Hockey", name: "Aurora Air Hockey", category: "Arcade Games", tag: "Classic", desc: "High-power air blower tournament air hockey table with durable aluminum rails.", img: auroraAirHockeyImg },
        { title: "Ocha Air Hockey", name: "Ocha Air Hockey", category: "Arcade Games", tag: "Featured", desc: "Compact & stylish commercial air hockey machine for malls & FECs.", img: ochaAirHockeyImg },
        { title: "Aero X Air Hockey", name: "Aero X Air Hockey", category: "Arcade Games", tag: "Interactive", desc: "Next-gen arcade air hockey table with multi-ticket dispenser system.", img: aeroXAirHockeyImg }
      ];

  const arcadeFaqs = Array.isArray(siteData?.arcadeFaqs) && siteData.arcadeFaqs.length > 0
    ? siteData.arcadeFaqs
    : [
        {
          q: "Where Can I Buy Arcade Game Machines In India?",
          a: "Winera International is a trusted arcade games manufacturer and supplier in India — supplying claw machines, redemption games, racing simulators, shooting games, and kiddy rides for malls, hotels, FECs, and amusement parks, with complete installation across 50+ cities by our own team."
        },
        {
          q: "Do You Supply Coin Operated Arcade Machines In India?",
          a: "Yes. Winera International supplies a wide range of coin operated arcade machines in India, card-based systems, and ticket redemption arcade machines, built for commercial environments such as malls, hotels, resorts, and family entertainment centres."
        },
        {
          q: "Can Winera International Set Up A Complete Arcade Game Zone Setup?",
          a: "Yes. We handle space planning, machine selection, delivery, installation, and staff training as one connected arcade game zone setup process, not separate transactions with different vendors."
        },
        {
          q: "What Happens If A Machine Breaks Down After Installation?",
          a: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. You are not waiting on an overseas supplier or a disconnected logistics partner to respond."
        },
        {
          q: "Which Businesses Typically Install Arcade Game Machines In India?",
          a: "Malls, hotels, resorts, and family entertainment centres are the most common buyers of arcade machines."
        },
        {
          q: "How Long Does It Take To Install Arcade Machines?",
          a: "Installation timelines depend on the number of machines, your venue's readiness, and your location. We share an exact schedule as part of your quote, so you know precisely when your arcade zone will be ready."
        },
        {
          q: "What Is The Price Of Arcade Machines In India?",
          a: "Arcade machine pricing in India depends on the machine category, payment mechanism, and customisation level. Because Winera International sources directly at scale, our pricing avoids the markup typical of multi-layer resellers."
        },
        {
          q: "How Do I Get Started With Ordering Arcade Machines From Winera?",
          a: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. Our team will recommend the right machine mix for your space and send a quote ASAP."
        },
        {
          q: "Which Arcade Games Give The Best ROI For FECs And Malls In India?",
          a: "Ticket redemption games, claw machines, and racing simulators consistently deliver the strongest revenue per square foot in Indian FECs and malls. Winera International helps you choose the right arcade game zone machine mix based on your specific footfall, floor size, and visitor demographic — not a generic recommendation."
        },
        {
          q: "What Is The Difference Between Coin-Operated And Card-Based Arcade Machines?",
          a: "Coin-operated arcade machines accept physical tokens and suit venues with casual walk-in visitors. Card-based systems use rechargeable cards — better for revenue tracking, reducing cash handling, and encouraging repeat visits through balance top-ups. Winera supplies both and advises on the right system for your venue."
        }
      ];


  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      <main id="main-content">
        {/* 2. ARCADE GAME HERO BANNER MATCHING SECOND IMAGE 1:1 */}
        <section className="winera-arcade-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '165px',
        paddingBottom: '75px',
        background: `url(${siteData?.arcadeHero?.bgUrl || arcadeHeroBg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Title / Breadcrumb: Home › Arcade Game */}
          <h1 className="winera-arcade-hero-h1" style={{
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
              {siteData?.arcadeHero?.breadcrumbText || "Arcade Game"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. ARCADE GAME MACHINES IN INDIA SECTION (1:1 FIGMA SCREENSHOT MATCH) */}
      <section className="winera-arcade-intro-section" style={{ padding: '90px 4vw 100px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Overlapping Image Collage Stack with Wavy Doodle Arrow & Blue Dots matching Screenshot 1:1 */}
          <div className="winera-arcade-intro-images" style={{ position: 'relative', width: '100%', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            {/* Top-Left Main Rounded Image: Boy Playing Racing Game */}
            <div style={{
              width: '320px',
              height: '320px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.12)',
              background: `url(${siteData?.arcadeIntro?.mainImgUrl || arcadeBoy}) center/cover no-repeat`,
              position: 'relative',
              zIndex: 2
            }}></div>

            {/* Bottom-Right Overlapping Image: Arcade Arena Overview */}
            <div style={{
              position: 'absolute',
              bottom: '0px',
              right: '20px',
              width: '320px',
              height: '240px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              border: '5px solid #ffffff',
              background: `url(${siteData?.arcadeIntro?.secondaryImgUrl || arcadeHall}) center/cover no-repeat`,
              zIndex: 10
            }}></div>

            {/* Floating Pill Tag */}
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: '70px',
              zIndex: 25,
              background: '#F5F5F9',
              border: '2px solid #38bdf8',
              boxShadow: '0 10px 25px rgba(56, 189, 248, 0.25)',
              borderRadius: '30px',
              padding: '8px 22px',
              color: '#0284c7',
              fontSize: '12.5px',
              fontWeight: '800'
            }}>
              {siteData?.arcadeIntro?.floatingTag || "Set Up Arcade Arena Now !"}
            </div>

            {/* Blue Decorative Grid Dots Accent */}
            <div style={{
              position: 'absolute',
              top: '160px',
              left: '315px',
              width: '60px',
              height: '60px',
              backgroundImage: 'radial-gradient(#38bdf8 2px, transparent 2px)',
              backgroundSize: '10px 10px',
              zIndex: 1,
              opacity: 0.8
            }}></div>

            {/* Light Blue Wavy Doodle Arrow Graphic */}
            <img
              src={doodleArrow}
              alt="Doodle Arrow Accent"
              style={{
                position: 'absolute',
                top: '40px',
                left: '325px',
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                zIndex: 15,
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Right Text & Features Block */}
          <div style={{ textAlign: 'left' }}>
            {/* Title Header with yellow brush accent */}
            <SectionHeading align="left" marginBottom="20px" accentWidth="75%" accentMaxWidth="300px">
              {(() => {
                const rawTitle = typeof siteData?.arcadeIntro?.title === 'string' ? siteData.arcadeIntro.title : "*Arcade Game* Machines in India";
                const parts = String(rawTitle).split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#00a8ff' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </SectionHeading>

            {/* Description Paragraph */}
            <p style={{
              fontSize: '13px',
              color: '#475569',
              fontWeight: '500',
              lineHeight: 1.65,
              marginBottom: '28px',
              maxWidth: '540px'
            }}>
              {siteData?.arcadeIntro?.desc || "Winera International Pvt. Ltd is a trusted arcade games manufacturer and supplier of premium arcade machines, sourced and serviced end-to-end across 50+ cities. With over 15 years of industry expertise, we source every arcade game machine from established global manufacturers and configure it with modern coin, card, or ticket-based redemption systems to match your venue's requirements"}
            </p>

            {/* Dynamic Features List */}
            {(
              Array.isArray(siteData?.arcadeIntro?.features) && siteData.arcadeIntro.features.length > 0
                ? siteData.arcadeIntro.features
                : [
                  {
                    title: siteData?.arcadeIntro?.feature1Title || "Commercial Durability",
                    desc: siteData?.arcadeIntro?.feature1Desc || "Before delivery, each unit goes through a commercial-grade durability check built for high-footfall environments like malls, hotels, and entertainment centres, not casual or residential use."
                  },
                  {
                    title: siteData?.arcadeIntro?.feature2Title || "Installation Network",
                    desc: siteData?.arcadeIntro?.feature2Desc || "From sourcing to installation and after-sales support, our own team handles the entire arcade game zone setup process, not a third-party contractor."
                  }
                ]
            ).map((feature, fIdx) => (
              <div key={fIdx} style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                marginBottom: fIdx === 0 ? '20px' : '32px',
                background: '#F5F5F9',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.03)',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {fIdx === 0 ? (
                    <Shield style={{ width: '18px', height: '18px', color: '#475569' }} />
                  ) : (
                    <Wrench style={{ width: '18px', height: '18px', color: '#475569' }} />
                  )}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                    {feature.title}
                  </h4>
                  <p style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500', lineHeight: 1.5 }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
              {/* Button 1: Watch Video with Offset Rotated Yellow Backdrop */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  position: 'absolute',
                  top: '-3px',
                  bottom: '-3px',
                  left: '-4px',
                  right: '-4px',
                  background: '#ffcd00',
                  borderRadius: '14px',
                  transform: 'rotate(-1.8deg)',
                  zIndex: 1
                }} />
                <a
                  href={siteData?.arcadeIntro?.videoLink || "https://youtube.com"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(90deg, #28b4ee 0%, #0284c7 100%)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '800',
                    padding: '11px 28px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(40, 180, 238, 0.3)',
                    transition: 'all 0.25s ease'
                  }}
                  className="winera-cta-btn-hover"
                >
                  <span>{siteData?.arcadeIntro?.videoBtnText || "Watch Video"}</span>
                </a>
              </div>

              {/* Button 2: Get a Quote with Offset Rotated Cyan Backdrop */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  position: 'absolute',
                  top: '-3px',
                  bottom: '-3px',
                  left: '-4px',
                  right: '-4px',
                  background: '#38bdf8',
                  borderRadius: '14px',
                  transform: 'rotate(-1.8deg)',
                  zIndex: 1
                }} />
                <a
                  href={siteData?.arcadeIntro?.quoteLink || "https://wa.me/919428989488"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#e0f2fe',
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: '800',
                    padding: '11px 28px',
                    borderRadius: '12px',
                    border: '1.5px solid #38bdf8',
                    textDecoration: 'none',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.25s ease'
                  }}
                  className="winera-cta-btn-hover"
                >
                  <span>{siteData?.arcadeIntro?.quoteBtnText || "Get a Quote"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES: SIDEBAR & PRODUCT CARDS GRID SECTION (1:1 MATCHING USER DESIGN) */}
      <section id="categories" className="winera-categories-section" style={{ padding: '80px 4vw 100px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading for Categories */}
          <SectionHeading marginBottom="36px" accentWidth="50%" accentMaxWidth="300px">
            Discover our *Products*
          </SectionHeading>

          {/* Mobile Category Select Dropdown (Visible only on mobile) */}
          <div className="winera-mobile-category-dropdown-container" style={{ display: 'none', marginBottom: '24px', width: '100%' }}>
            <label htmlFor="arcade_category_select" style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'left' }}>
              Select Category:
            </label>
            <select
              id="arcade_category_select"
              name="arcadeCategory"
              aria-label="Select Category"
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setMobileProdIndex(0);
              }}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '2px solid #38bdf8',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '14px',
                fontWeight: '800',
                outline: 'none',
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.15)',
                cursor: 'pointer'
              }}
            >
              {[
                "Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride",
                "Bike Racing Game", "Car Racing Game", "Shooting Games", "Strength Based Games"
              ].map((cat, cIdx) => (
                <option key={cIdx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="winera-categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '24px',
            alignItems: 'stretch'
          }}>
            {/* LEFT CATEGORY SIDEBAR CARD WITH DARK TO LIGHT GRADIENT */}
            <div className="winera-categories-sidebar" style={{
              background: 'linear-gradient(180deg, #b3e5fc 0%, #e8f7fe 100%)',
              border: '1.5px solid #e8f7fe',
              borderRadius: '28px',
              padding: '24px 18px 50px',
              boxShadow: '0 8px 25px rgba(56, 189, 248, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              height: '100%'
            }}>
              <h3 style={{ fontSize: '0.80rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px', paddingLeft: '4px' }}>
                Discover our Products
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Parent Category Button: Arcade Games */}
                <button
                  onClick={() => {
                    setActiveCategory("Arcade Games");
                    setExpandedCat(expandedCat === "Arcade Games" ? null : "Arcade Games");
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#38bdf8',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '4px',
                    boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
                  }}
                >
                  <span>Arcade Games</span>
                  <ChevronDown style={{ width: '14px', height: '14px', color: '#ffffff', transform: expandedCat === "Arcade Games" ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {/* Subcategories List */}
                {[
                  "Claw Machine",
                  "Redemption Game",
                  "Kiddy Ride",
                  "Bike Racing Game",
                  "Car Racing Game",
                  "Shooting Games",
                  "Strength Based Games"
                ].map((subName, subIdx, array) => {
                  const isSelected = activeCategory === subName;
                  const isLast = subIdx === array.length - 1;

                  return (
                    <button
                      key={subIdx}
                      onClick={() => setActiveCategory(subName)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: isSelected ? '10px 14px' : '10px 8px 10px 4px',
                        borderRadius: isSelected ? '10px' : '0px',
                        border: 'none',
                        borderBottom: isSelected ? 'none' : (isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.85)'),
                        background: isSelected ? '#38bdf8' : 'transparent',
                        color: isSelected ? '#ffffff' : '#475569',
                        fontSize: '12.5px',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{subName}</span>
                      <ChevronRight style={{
                        width: '12px',
                        height: '12px',
                        color: isSelected ? '#ffffff' : '#94a3b8',
                        opacity: isSelected ? 1 : 0.5
                      }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT DISPLAY AREA: PRODUCT CARDS GRID + PAGINATION */}
            <div className="winera-products-display-area" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Product Cards Grid */}
              {(() => {
                const defaultProdCards = [
                  { name: "Super Air Hockey", title: "Super Air Hockey", img: superAirHockeyImg },
                  { name: "Puck Carnival Air Hockey", title: "Puck Carnival Air Hockey", img: puckCarnivalAirHockeyImg },
                  { name: "Dazzling Air Hockey - Multi Puck", title: "Dazzling Air Hockey - Multi Puck", img: dazzlingAirHockeyImg },
                  { name: "Aurora Air Hockey", title: "Aurora Air Hockey", img: auroraAirHockeyImg },
                  { name: "Ocha Air Hockey", title: "Ocha Air Hockey", img: ochaAirHockeyImg },
                  { name: "Aero X Air Hockey", title: "Aero X Air Hockey", img: aeroXAirHockeyImg }
                ];

                const imageMap = {
                  "Super Air Hockey": superAirHockeyImg,
                  "Puck Carnival Air Hockey": puckCarnivalAirHockeyImg,
                  "Dazzling Air Hockey - Multi Puck": dazzlingAirHockeyImg,
                  "Aurora Air Hockey": auroraAirHockeyImg,
                  "Ocha Air Hockey": ochaAirHockeyImg,
                  "Aero X Air Hockey": aeroXAirHockeyImg
                };

                const rawCards = (Array.isArray(siteData?.arcadeCategories?.cards) && siteData.arcadeCategories.cards.length > 0)
                  ? siteData.arcadeCategories.cards
                  : (Array.isArray(siteData?.arcadeCategories) && siteData.arcadeCategories.length > 0 ? siteData.arcadeCategories : null);

                let prodCards = defaultProdCards;
                if (rawCards) {
                  const hasUnsplash = rawCards.some(c => (c.img || c.imageUrl || '').includes('unsplash.com'));
                  if (hasUnsplash) {
                    prodCards = rawCards.map((c, i) => {
                      const nameKey = c.name || c.title || "";
                      const mappedImg = imageMap[nameKey] || defaultProdCards[i % defaultProdCards.length]?.img || c.img;
                      return { ...c, img: mappedImg, imageUrl: mappedImg };
                    });
                  } else {
                    prodCards = rawCards.map(c => ({
                      ...c,
                      img: imageMap[c.name || c.title] || c.img || c.imageUrl
                    }));
                  }
                }

                return (
                  <>
                    {/* Desktop Product Cards Grid */}
                    <div className="winera-desktop-products-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '20px'
                    }}>
                      {prodCards.map((card, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'linear-gradient(180deg, #bae6fd 0%, #ffffff 100%)',
                            borderRadius: '24px',
                            padding: '16px',
                            boxShadow: '0 10px 25px rgba(56, 189, 248, 0.08)',
                            border: '1.5px solid #e0f2fe',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.25s',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '180px',
                            borderRadius: '18px',
                            overflow: 'hidden',
                            marginBottom: '16px',
                            background: '#ffffff',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                            border: '4px solid #ffffff'
                          }}>
                            <img
                              src={card.imageUrl || card.img}
                              alt={card.name}
                              loading="lazy"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>

                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#0f172a',
                            lineHeight: 1.3,
                            margin: '4px 0 8px',
                            minHeight: '42px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {card.name}
                          </h4>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Single Active Product Card Display */}
                    {prodCards[mobileProdIndex] && (
                      <div className="winera-mobile-single-product-card" style={{ display: 'none' }}>
                        <div style={{
                          background: 'linear-gradient(180deg, #bae6fd 0%, #ffffff 100%)',
                          borderRadius: '24px',
                          padding: '20px',
                          boxShadow: '0 10px 25px rgba(56, 189, 248, 0.08)',
                          border: '1.5px solid #e0f2fe',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          width: '100%'
                        }}>
                          <div style={{
                            width: '100%',
                            height: '210px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '16px',
                            background: '#ffffff',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.08)'
                          }}>
                            <img
                              src={prodCards[mobileProdIndex].imageUrl || prodCards[mobileProdIndex].img}
                              alt={prodCards[mobileProdIndex].name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>

                          <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#0f172a',
                            lineHeight: 1.3,
                            margin: '4px 0'
                          }}>
                            {prodCards[mobileProdIndex].name}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Mobile Carousel Left/Right Arrow Toolbar (Visible only on mobile) */}
                    <div className="winera-mobile-products-carousel-toolbar" style={{ display: 'none', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                      <button
                        onClick={() => setMobileProdIndex((prev) => Math.max(0, prev - 1))}
                        disabled={mobileProdIndex === 0}
                        aria-label="Previous Product"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#38bdf8',
                          border: 'none',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: mobileProdIndex === 0 ? 0.4 : 1,
                          cursor: mobileProdIndex === 0 ? 'not-allowed' : 'pointer',
                          boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                        }}
                      >
                        <ChevronLeft style={{ width: '22px', height: '22px' }} />
                      </button>

                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                        {mobileProdIndex + 1} / {prodCards.length}
                      </span>

                      <button
                        onClick={() => setMobileProdIndex((prev) => Math.min(prodCards.length - 1, prev + 1))}
                        disabled={mobileProdIndex >= prodCards.length - 1}
                        aria-label="Next Product"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#38bdf8',
                          border: 'none',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: mobileProdIndex >= prodCards.length - 1 ? 0.4 : 1,
                          cursor: mobileProdIndex >= prodCards.length - 1 ? 'not-allowed' : 'pointer',
                          boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                        }}
                      >
                        <ChevronRight style={{ width: '22px', height: '22px' }} />
                      </button>
                    </div>

                    {/* Pagination Bar */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                      <div style={{
                        background: '#ffffff',
                        border: '1.5px solid #7dd3fc',
                        borderRadius: '24px',
                        padding: '8px 26px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '18px',
                        boxShadow: 'none'
                      }}>
                        <button aria-label="Previous Page" style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                          <ChevronLeft style={{ width: '16px', height: '16px', color: '#475569' }} />
                        </button>
                        <span style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: '#38bdf8',
                          color: '#ffffff',
                          fontSize: '15px',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(56, 189, 248, 0.25)'
                        }}>
                          1
                        </span>
                        <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>2</span>
                        <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>3</span>
                        <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>4</span>
                        <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>71</span>
                        <button aria-label="Next Page" style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                          <ChevronRight style={{ width: '16px', height: '16px', color: '#475569' }} />
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}

            </div>
          </div>

          {/* Bottom Centered Pagination Toolbar matching screenshot 1:1 */}
          <div className="winera-desktop-pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <div style={{
              background: '#e3f2fd',
              border: '1.5px solid #7dd3fc',
              borderRadius: '24px',
              padding: '8px 26px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '18px',
              boxShadow: 'none'
            }}>
              <button aria-label="Previous Page" style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                <ChevronLeft style={{ width: '16px', height: '16px', color: '#475569' }} />
              </button>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: '#38bdf8',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(56, 189, 248, 0.25)'
              }}>
                1
              </span>
              <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>2</span>
              <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>3</span>
              <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>4</span>
              <span style={{ fontSize: '14.5px', fontWeight: '600', color: '#475569', cursor: 'pointer', padding: '0 2px' }}>71</span>
              <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                <ChevronRight style={{ width: '16px', height: '16px', color: '#475569' }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUILT FOR COMMERCIAL USE SECTION (FULL WIDTH BACKGROUND FRAME) */}
      <section className="winera-commercial-section" style={{
        position: 'relative',
        width: '100%',
        padding: '90px 4vw 110px',
        background: `url(${siteData?.arcadeCommercial?.bgUrl || builtCommercialBg}) center/100% 100% no-repeat`,
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Area */}
          <div className="winera-commercial-text-container" style={{ textAlign: 'left', position: 'relative', zIndex: 5 }}>
            {/* Title with yellow brush line above */}
            <SectionHeading align="left" marginBottom="24px" accentWidth="80%" accentMaxWidth="320px">
              {(() => {
                const rawTitle = typeof siteData?.arcadeCommercial?.title === 'string' ? siteData.arcadeCommercial.title : "Built for *Commercial Use*";
                const parts = String(rawTitle).split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#00a8ff' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()}
            </SectionHeading>

            {/* Mobile Image Render */}
            <div className="winera-commercial-mobile-img" style={{ display: 'none', margin: '20px auto 24px', width: '100%', maxWidth: '340px', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
              <img src={aboutUsSectionImg} alt="Commercial Team" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Dynamic Commercial Points List */}
            {(
              Array.isArray(siteData?.arcadeCommercial?.points) && siteData.arcadeCommercial.points.length > 0
                ? siteData.arcadeCommercial.points
                : [
                  {
                    title: siteData?.arcadeCommercial?.point1Title || "Built for Real Commercial Footfall",
                    paragraphs: siteData?.arcadeCommercial?.point1Text
                      ? [siteData.arcadeCommercial.point1Text]
                      : [
                        "Arcade machines in Indian malls and entertainment centres often run ten or more hours a day, handled mostly by children. Equipment sourced without that environment in mind tends to fail within weeks of installation.",
                        "We at Winera International prioritise machines rated for sustained commercial cycles over units designed for lighter, residential, or occasional use, which is why our installations typically need far less frequent servicing than machines bought through unverified import channels."
                      ]
                  },
                  {
                    title: siteData?.arcadeCommercial?.point2Title || "What Will Your Arcade Game Zone Actually Earn?",
                    paragraphs: siteData?.arcadeCommercial?.point2Text
                      ? [siteData.arcadeCommercial.point2Text]
                      : [
                        "An arcade game zone is not a single machine decision, it is a business decision about which machines, in which combination, at what price point, will generate the strongest return for your specific venue. Most suppliers hand you a catalogue and leave that calculation entirely to you.",
                        "Winera International starts there. Before any machine is recommended, our team works out the numbers for your specific floor size, daily footfall, and target visitor age group projected revenue per machine category, daily session estimates, maintenance costs per year, and a realistic break-even timeline. Not a generic percentage claim. Your actual numbers, for your actual venue."
                      ]
                  }
                ]
            ).map((point, pIdx) => (
              <div key={pIdx} style={{ marginBottom: pIdx === 0 ? '22px' : '30px' }}>
                <div className="winera-commercial-point-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCheck style={{ width: '20px', height: '20px', color: '#00a8ff', strokeWidth: 3 }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {point.title}
                  </h4>
                </div>
                {Array.isArray(point.paragraphs) ? (
                  point.paragraphs.map((para, paraIdx) => (
                    <p key={paraIdx} style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.6, marginBottom: '8px', maxWidth: '580px' }}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.6, maxWidth: '580px' }}>
                    {point.desc || point.text}
                  </p>
                )}
              </div>
            ))}

            {/* WhatsApp CTA Button: Talk to an ROI Expert */}
            <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
              <div style={{
                position: 'absolute',
                top: '-3px',
                bottom: '-3px',
                left: '-4px',
                right: '-4px',
                background: '#ffcd00',
                borderRadius: '14px',
                transform: 'rotate(-1.8deg)',
                zIndex: 1
              }} />
              <a
                href={siteData?.arcadeCommercial?.ctaLink || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '14px',
                  fontWeight: '800',
                  padding: '10px 26px 10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #ffcd00',
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.25s ease'
                }}
                className="winera-cta-btn-hover"
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#25d366',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <span>{siteData?.arcadeCommercial?.ctaBtnText || "Talk to an ROI Expert"}</span>
              </a>
            </div>
          </div>

          {/* Right Image Graphic Area rendering about-us-section.png */}
          <div className="winera-commercial-desktop-img" style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={aboutUsSectionImg}
              alt="Winera Commercial Arcade Game Team"
              style={{
                width: '100%',
                maxHeight: '460px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WINERA INTERNATIONAL SECTION (1:1 UI MATCH WITH SCREENSHOT) */}
      <section className="winera-arcade-why-section" style={{ padding: '90px 4vw 110px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading with Yellow Accent Line Above */}
          <SectionHeading marginBottom="60px" accentWidth="65%" accentMaxWidth="440px">
            {(() => {
              const rawTitle = typeof siteData?.arcadeWhyUs?.title === 'string' ? siteData.arcadeWhyUs.title : "Why Choose *Winera International*";
              const parts = String(rawTitle).split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#00a8ff' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </SectionHeading>

          {/* Grid Container with Light Blue Border Separator Lines */}
          {(() => {
            const defaultList = [
              { title: "15+ Years In The Industry", desc: "Supplying And Supporting Indoor Amusement Equipment Across India" },
              { title: "Successful Installations", desc: "From Malls To Resorts, Our Track Record Speaks Through Completed Projects, Not Just Promises." },
              { title: "Direct Sourcing", desc: "We Work Straight With Global Manufacturers — Consistent Quality, No Unnecessary Markup." },
              { title: "Pricing That Makes Sense", desc: "No Hidden Costs, No Inflated Resale Pricing — Fair Rates Backed By Direct Sourcing" },
              { title: "Local Support In 50+ Cities", desc: "Our Own Technicians Install And Service Every Machine — No Waiting On Overseas Suppliers." },
              { title: "Easy To Maintain", desc: "Equipment Rated For Heavy Daily Commercial Use — Fewer Breakdowns, More Consistent Revenue" },
              { title: "Solutions That Fit Your Space", desc: "Every Recommendation Based On Your Venue Size, Footfall, And Budget — Never One-Size-Fits-All." }
            ];

            const rawItems = Array.isArray(siteData?.arcadeWhyUs?.items) && siteData.arcadeWhyUs.items.length > 0
              ? siteData.arcadeWhyUs.items
              : [
                ...(Array.isArray(siteData?.arcadeWhyUs?.topItems) ? siteData.arcadeWhyUs.topItems : []),
                ...(Array.isArray(siteData?.arcadeWhyUs?.bottomItems) ? siteData.arcadeWhyUs.bottomItems : [])
              ];

            const items = rawItems.length > 0 ? rawItems : defaultList;

            // Split rule: If items count <= 6, split 3 top + remainder bottom. If items count > 6, split Math.ceil(items.length / 2) top + remainder bottom
            const topCount = items.length <= 6 ? 3 : Math.min(4, Math.ceil(items.length / 2));
            const topRow = items.slice(0, topCount);
            const bottomRow = items.slice(topCount);

            return (
              <div className="winera-arcade-why-container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Top Row */}
                <div className="winera-arcade-why-row" style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${topRow.length}, 1fr)`,
                  position: 'relative',
                  paddingBottom: bottomRow.length > 0 ? '36px' : '0px'
                }}>
                  {topRow.map((item, idx) => (
                    <div key={idx} className="winera-arcade-why-card" style={{
                      padding: '0 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      {/* Vertical Divider Line (Gradient Shade: light at top, dark cyan at bottom meeting horizontal line) */}
                      {idx < topRow.length - 1 && (
                        <div className="winera-arcade-why-divider" style={{
                          position: 'absolute',
                          right: 0,
                          top: '10px',
                          bottom: '-36px',
                          width: '2px',
                          background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.1) 0%, #38bdf8 100%)',
                          zIndex: 2
                        }} />
                      )}

                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: '#38bdf8',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        boxShadow: '0 8px 20px rgba(56, 189, 248, 0.35)'
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <polygon points="16 11 18 13 22 9" />
                        </svg>
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.5, maxWidth: '260px', margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                 {/* Central Horizontal Joining Partition Line with Dark-to-Light Fade */}
                {bottomRow.length > 0 && (
                  <div className="winera-arcade-why-divider" style={{
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, #38bdf8 20%, #38bdf8 80%, rgba(56, 189, 248, 0.15) 100%)',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 3
                  }} />
                )}

                {/* Bottom Row */}
                {bottomRow.length > 0 && (
                  <div className="winera-arcade-why-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${bottomRow.length}, 1fr)`,
                    paddingTop: '36px',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    {bottomRow.map((item, idx) => (
                      <div key={idx} className="winera-arcade-why-card" style={{
                        padding: '0 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative'
                      }}>
                        {/* Vertical Divider Line (Gradient Shade: dark cyan at top meeting horizontal line, fading light to bottom) */}
                        {idx < bottomRow.length - 1 && (
                          <div className="winera-arcade-why-divider" style={{
                            position: 'absolute',
                            right: 0,
                            top: '-36px',
                            bottom: '10px',
                            width: '2px',
                            background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.1) 100%)',
                            zIndex: 2
                          }} />
                        )}

                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: '#38bdf8',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                          boxShadow: '0 8px 20px rgba(56, 189, 248, 0.35)'
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            <circle cx="9" cy="10" r="1" />
                            <circle cx="12" cy="10" r="1" />
                            <circle cx="15" cy="10" r="1" />
                          </svg>
                        </div>

                        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.5, maxWidth: '280px', margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 7. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={true}
        title={<>GAME ZONES WE HAVE<br />BUILT <span style={{ color: '#38bdf8' }}>ACROSS INDIA</span></>}
        subtext="Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers."
        projects={siteData?.builtProjects}
      />

      {/* 8. WHAT OUR CLIENTS SAY SECTION (USES HOME PAGE MONGO PERSISTED DATA) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 9. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection sectionData={siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 10. FREQUENTLY ASKED QUESTIONS SECTION (DYNAMIC PAGE FAQS WITH DEFAULT FALLBACK) */}
      <FaqSection
        faqList={Array.isArray(siteData?.arcadeFaqs) && siteData.arcadeFaqs.length > 0 ? siteData.arcadeFaqs : arcadeFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 11. CTA BANNER SECTION (DYNAMIC MONGO PERSISTED DATA) */}
      <CtaBanner
        align="center"
        bg={siteData?.arcadeCta?.bgUrl || needConsultationsBg}
        subtitle={null}
        title={
          <>
            <span style={{ color: '#ffcd00' }}>{siteData?.arcadeCta?.yellowText ?? "NEED ANY"}</span> <span style={{ color: '#38bdf8' }}>{siteData?.arcadeCta?.cyanText ?? "CONSULTATIONS ?"}</span><br />
            <span style={{ color: '#ffffff' }}>{siteData?.arcadeCta?.whiteText ?? "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTION."}</span>
          </>
        }
        buttonText={siteData?.arcadeCta?.buttonText ?? "Get Quote Now"}
        buttonLink={siteData?.arcadeCta?.buttonLink ?? "https://wa.me/919428989488"}
      />
      </main>

      {/* 12. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
