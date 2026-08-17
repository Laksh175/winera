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
import needConsultationsBg from '../assets/need-consultations-bg.png';
import yellowBrushAccent from '../assets/yellow-stroke-line.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import projHulaboo from '../assets/proj-hulaboo.png';
import projNeon1 from '../assets/proj-neonpanda1.png';
import projSoft1 from '../assets/proj-softplay1.png';
import testiOwner from '../assets/testi-owner.png';
import { Gamepad2, Trophy, Flame, Sparkles, Star, ShieldCheck, Zap, Shield, Wrench, Play, ChevronLeft, ChevronRight, ChevronDown, CheckCheck, MessageCircle, UserCheck, Settings, Database, Coins, Headset, Box, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ArcadeGame({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const { header, footer } = siteData;
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Arcade Games");
  const [expandedCat, setExpandedCat] = useState("Arcade Games");
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [mobileProdIndex, setMobileProdIndex] = useState(0);

  const arcadeGames = [
    { title: "VR Racing Simulator", tag: "Hot Seller", desc: "Immersive motion platform with 4K VR headsets and force-feedback steering.", img: about3 },
    { title: "Prize Claw Master", tag: "High Revenue", desc: "Premium transparent glass prize crane with LED lighting & customized claw strength.", img: about1 },
    { title: "Air Hockey Tournament", tag: "Classic", desc: "Heavy-duty aluminum rails with high-volume air blower and LED score keeper.", img: ctaArcade },
    { title: "Basketball Shootout PRO", tag: "Popular", desc: "Multi-stage basketball shooting arcade machine with digital timer and ticket dispenser.", img: about2 },
    { title: "Motorbike Racer 3D", tag: "Featured", desc: "Full motion leaning motorbike simulator with dual screen multiplayer connectivity.", img: about4 },
    { title: "Dancing Stage Revolution", tag: "Interactive", desc: "Non-slip stainless steel dance pads with surround sound & neon light beats.", img: ctaGamersBg }
  ];

  const arcadeFaqs = [
    {
      q: "1. How Do I Set Up A Game Zone In India?",
      a: "Start with a consultation and share your available space, budget, and location with our team. As a trusted gaming zone setup company in India, Winera International handles everything from ROI analysis and layout design to equipment selection, installation, and post-launch support across 50+ cities."
    },
    {
      q: "2. What Is The Cost Of A Game Zone Setup In India?",
      a: "The cost depends on your venue size, equipment mix (arcade, VR, bowling, softplay), and customization level. Winera provides transparent pricing and flexible packages tailored to your budget."
    },
    {
      q: "3. Does Winera Handle The Complete Game Zone Setup?",
      a: "Yes! We provide complete end-to-end turnkey solutions including 2D/3D layout planning, equipment manufacturing/sourcing, shipping, site installation, card system setup, and staff training."
    },
    {
      q: "4. Which Cities Does Winera Cover In India?",
      a: "We execute projects pan-India across 50+ major cities including Mumbai, Delhi NCR, Bangalore, Hyderabad, Surat, Indore, Ahmedabad, Pune, and Chennai."
    },
    {
      q: "5. What Makes Winera International Different From Other Game Zone Suppliers?",
      a: "We prioritize ROI consultancy first before selling equipment. Our safety-certified machines, dedicated technical support team, and custom venue branding give our clients higher profitability."
    },
    {
      q: "6. Do You Provide After-Sales Support After Installation?",
      a: "Absolutely. We offer lifetime technical support, spare parts assistance, machine maintenance guidance, and periodic software updates."
    },
    {
      q: "7. Can Game Zone Equipment Be Customised For My Venue's Theme?",
      a: "Yes, all our amusement rides, softplay structures, neon lighting, and machine cabinet graphics can be customized to align with your brand identity."
    },
    {
      q: "8. How Do I Get Started With My Game Zone Project?",
      a: "Simply reach out to us via call or WhatsApp. Our team will analyze your space drawings and prepare a customized ROI & layout proposal."
    },
    {
      q: "9. Can Winers International Help Me Plan My Game Zone From Scratch?",
      a: "Yes, even if you only have a bare commercial hall, we design full spatial layouts, electrical routing, interior lighting, and equipment placement from scratch."
    }
  ];


  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. ARCADE GAME HERO BANNER MATCHING FIGMA SCREENSHOT 1:1 */}
      <section className="winera-arcade-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '180px',
        paddingBottom: '90px',
        background: `url(${siteData?.arcadeHero?.bgUrl || arcadeHeroBg}) center/100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Main Title: Arcade Game with Yellow 'Arcade' */}
          <h1 className="winera-arcade-hero-h1" style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
            lineHeight: 1.15
          }}>
            {(() => {
              const rawTitle = siteData?.arcadeHero?.title || "*Arcade* Game";
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

          {/* Breadcrumb: Products > Arcade Games */}
          <p className="winera-arcade-hero-breadcrumb" style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#ffffff',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <a href="/products" style={{ color: '#ffffff', textDecoration: 'none' }}>Products</a>
            <span style={{ color: '#ffcd00' }}>&gt;</span>
            <span style={{ color: '#ffffff' }}>{siteData?.arcadeHero?.breadcrumbText || "Arcade Games"}</span>
          </p>
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
                const rawTitle = siteData?.arcadeIntro?.title || "*Arcade Game* Machines in India";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
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
                  background: fIdx === 0 ? '#e0f2fe' : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {fIdx === 0 ? (
                    <Shield style={{ width: '18px', height: '18px', color: '#0284c7' }} />
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
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <a
                href={siteData?.arcadeIntro?.videoLink || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '800',
                  padding: '12px 32px',
                  borderRadius: '25px',
                  border: '2px solid #ffcd00',
                  boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                {siteData?.arcadeIntro?.videoBtnText || "Watch Video"}
              </a>

              <a
                href={siteData?.arcadeIntro?.quoteLink || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#e0f2fe',
                  color: '#0f172a',
                  fontSize: '13px',
                  fontWeight: '800',
                  padding: '12px 32px',
                  borderRadius: '25px',
                  border: '2px solid #38bdf8',
                  boxShadow: '0 6px 18px rgba(56, 189, 248, 0.15)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                {siteData?.arcadeIntro?.quoteBtnText || "Get a Quote"}
              </a>
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'left' }}>
              Select Category:
            </label>
            <select
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

          {/* Main Layout Grid: Left Category Sidebar + Right Product Cards Display */}
          <div className="winera-categories-grid" style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: '24px',
            alignItems: 'start'
          }}>
            {/* LEFT CATEGORY SIDEBAR CARD (Hidden on mobile via CSS, accessible via top dropdown) */}
            <div className="winera-categories-sidebar" style={{
              background: '#dcf0fa',
              borderRadius: '24px',
              padding: '24px 18px',
              boxShadow: '0 10px 30px rgba(0, 168, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px', paddingLeft: '8px' }}>
                Discover our Products
              </h3>

              {(() => {
                const defaultCategories = [
                  { name: "Arcade Games", count: 12, subcategories: ["Claw Machine", "Redemption Game", "Kiddy Ride", "Bike Racing Game", "Car Racing Game", "Shooting Games", "Strength Based Games"] },
                  { name: "Claw Machine", count: 8 },
                  { name: "Redemption Game", count: 15 },
                  { name: "Kiddy Ride", count: 10 },
                  { name: "Bike Racing Game", count: 6 },
                  { name: "Car Racing Game", count: 7 },
                  { name: "Shooting Games", count: 9 },
                  { name: "Strength Based Games", count: 4 }
                ];

                const categoriesList = (Array.isArray(siteData?.arcadeCategories?.categoriesList) && siteData.arcadeCategories.categoriesList.length > 0)
                  ? siteData.arcadeCategories.categoriesList
                  : defaultCategories;

                return categoriesList.map((cat, idx) => {
                  const isActive = activeCategory === cat.name || (activeCategory === "All" && idx === 0);
                  const isExpanded = expandedCat === cat.name;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button
                        onClick={() => {
                          setActiveCategory(cat.name);
                          if (cat.subcategories) {
                            setExpandedCat(isExpanded ? null : cat.name);
                          }
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '14px',
                          border: 'none',
                          background: isActive ? '#38bdf8' : 'transparent',
                          color: isActive ? '#ffffff' : '#64748b',
                          fontSize: '13px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: isActive ? '0 4px 14px rgba(56, 189, 248, 0.35)' : 'none'
                        }}
                      >
                        <span>{cat.name}</span>
                        {cat.subcategories ? (
                          <ChevronDown style={{ width: '16px', height: '16px', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                        ) : (
                          <ChevronRight style={{ width: '14px', height: '14px', opacity: isActive ? 1 : 0.4 }} />
                        )}
                      </button>

                      {/* Subcategories Dropdown list */}
                      {cat.subcategories && isExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '12px', marginTop: '4px' }}>
                          {cat.subcategories.map((sub, subIdx) => (
                            <button
                              key={subIdx}
                              onClick={() => setActiveCategory(sub)}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                border: 'none',
                                background: activeCategory === sub ? '#00a8ff' : 'transparent',
                                color: activeCategory === sub ? '#ffffff' : '#475569',
                                fontSize: '12px',
                                fontWeight: activeCategory === sub ? '800' : '600',
                                cursor: 'pointer',
                                textAlign: 'left'
                              }}
                            >
                              <span>{sub}</span>
                              <ChevronRight style={{ width: '12px', height: '12px', opacity: activeCategory === sub ? 1 : 0.3 }} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            {/* RIGHT DISPLAY AREA: PRODUCT CARDS GRID + PAGINATION */}
            <div className="winera-products-display-area" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Product Cards Grid */}
              {(() => {
                const prodCards = (
                  Array.isArray(siteData?.arcadeCategories?.cards) && siteData.arcadeCategories.cards.length > 0
                    ? siteData.arcadeCategories.cards
                    : [
                      { name: "Super Air Hockey", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                      { name: "Puck Carnival Air Hockey", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
                      { name: "Dazzling Air Hockey - Multi Puck", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
                      { name: "Aurora Air Hockey", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80" },
                      { name: "Ocha Air Hockey", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
                      { name: "Aero X Air Hockey", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" }
                    ]
                );

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
                            background: '#dcf0fa',
                            borderRadius: '24px',
                            padding: '16px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.03)',
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
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '16px',
                            background: '#ffffff',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
                          }}>
                            <img
                              src={card.imageUrl || card.img}
                              alt={card.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>

                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '800',
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
                          background: '#dcf0fa',
                          borderRadius: '24px',
                          padding: '20px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
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
                            fontWeight: '800',
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
                  </>
                );
              })()}

              {/* Bottom Centered Pagination Toolbar matching screenshot */}
              <div className="winera-desktop-pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <div style={{
                  background: '#dcf0fa',
                  borderRadius: '30px',
                  padding: '8px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 6px 20px rgba(0, 168, 255, 0.06)'
                }}>
                  <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft style={{ width: '16px', height: '16px' }} />
                  </button>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#38bdf8',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(56, 189, 248, 0.4)'
                  }}>
                    1
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', cursor: 'pointer', padding: '0 4px' }}>2</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', cursor: 'pointer', padding: '0 4px' }}>3</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', cursor: 'pointer', padding: '0 4px' }}>4</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', padding: '0 2px' }}>...</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', cursor: 'pointer', padding: '0 4px' }}>71</span>
                  <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <ChevronRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
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
                const rawTitle = siteData?.arcadeCommercial?.title || "Built for *Commercial Use*";
                const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
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

            {/* Mobile Image Render (Shown after heading on mobile screens) */}
            <div className="winera-commercial-mobile-img" style={{ display: 'none', margin: '20px auto 24px', width: '100%', maxWidth: '340px', height: '240px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
              <img src={siteData?.arcadeCommercial?.imgUrl || commercialTeam} alt="Commercial Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <a
              href={siteData?.arcadeCommercial?.ctaLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13.5px',
                fontWeight: '800',
                padding: '10px 28px 10px 14px',
                borderRadius: '30px',
                border: '2.5px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(255, 205, 0, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
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

          {/* Right Image Graphic Area matching screenshot framing */}
          <div className="winera-commercial-desktop-img" style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Top Left Diagonal Decorative Blue Lines Accent */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: '70px',
              height: '70px',
              zIndex: 1,
              display: 'flex',
              gap: '6px'
            }}>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
            </div>

            {/* Bottom Right Diagonal Decorative Blue Lines Accent */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '70px',
              height: '70px',
              zIndex: 1,
              display: 'flex',
              gap: '6px'
            }}>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
              <div style={{ width: '2.5px', height: '100%', background: '#38bdf8', transform: 'rotate(28deg)' }}></div>
            </div>

            {/* Main Team Photo Container with Green Border and Diagonal Cut Corners */}
            <div style={{
              width: '90%',
              height: '340px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid #86efac',
              boxShadow: '0 20px 45px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 10,
              background: `url(${siteData?.arcadeCommercial?.teamImgUrl || commercialTeam}) center/cover no-repeat`
            }}></div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WINERA INTERNATIONAL SECTION (1:1 UI MATCH WITH SCREENSHOT) */}
      <section className="winera-arcade-why-section" style={{ padding: '90px 4vw 110px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading with Yellow Accent Line Above */}
          <SectionHeading marginBottom="60px" accentWidth="65%" accentMaxWidth="440px">
            {(() => {
              const rawTitle = siteData?.arcadeWhyUs?.title || "Why Choose *Winera International*";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
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
                  paddingBottom: bottomRow.length > 0 ? '40px' : '0px',
                  borderBottom: bottomRow.length > 0 ? '1.5px solid #7dd3fc' : 'none'
                }}>
                  {topRow.map((item, idx) => (
                    <div key={idx} className="winera-arcade-why-card" style={{
                      padding: '0 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRight: idx < topRow.length - 1 ? '1.5px solid #7dd3fc' : 'none'
                    }}>
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

                {/* Bottom Row */}
                {bottomRow.length > 0 && (
                  <div className="winera-arcade-why-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${bottomRow.length}, 1fr)`,
                    paddingTop: '40px',
                    justifyContent: 'center'
                  }}>
                    {bottomRow.map((item, idx) => (
                      <div key={idx} className="winera-arcade-why-card" style={{
                        padding: '0 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRight: idx < bottomRow.length - 1 ? '1.5px solid #7dd3fc' : 'none'
                      }}>
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

      {/* 12. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
