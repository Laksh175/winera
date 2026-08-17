import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import { ShieldCheck, Settings, Database, Headset, Wrench, Plane, Users, Radio, Gamepad2, Zap, Sparkles, Flame, Target, Tv, Layers, Activity } from 'lucide-react';

import vrHeroBg from '../assets/vr-hero-bg.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';
import ctaGamersBg from '../assets/cta-gamers-bg.png';
import ctaArcade from '../assets/cta-arcade.png';
import arcadeBoy from '../assets/arcade-boy.png';
import arcadeHall from '../assets/arcade-hall.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import bumpercarCollageFrame from '../assets/bumpercar-collage-frame.png';
import vrCollageGraphic from '../assets/vr-collage-graphic.png';
import vrSupplierCollage from '../assets/vr-supplier-collage.png';
import vrMatchedVenue from '../assets/vr-matched-venue.png';
import vrMatchedVenueDirect from '../assets/vr-matched-venue-direct.png';
import vrRangeTheater from '../assets/vr-range-theater.png';
import vrCommercialReliability from '../assets/vr-commercial-reliability.png';
import vrRoiFrame from '../assets/vr-roi-frame.png';
import vrRoiContent from '../assets/vr-roi-content.png';
import vrEarnPlayer from '../assets/vr-earn-player.jpg';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.png';

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  const text = rawText || defaultText;
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

// Helper function to render vector Lucide icons for VR Range items instead of emojis
const renderRangeIcon = (iconVal, idx, isSelected) => {
  const iconStyle = {
    width: '20px',
    height: '20px',
    color: isSelected ? '#0284c7' : '#64748b',
    transition: 'color 0.25s ease'
  };

  if (typeof iconVal === 'string' && (iconVal.startsWith('http') || iconVal.startsWith('/'))) {
    return <img src={iconVal} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />;
  }

  const iconMap = {
    plane: <Plane style={iconStyle} />,
    users: <Users style={iconStyle} />,
    radio: <Radio style={iconStyle} />,
    gamepad: <Gamepad2 style={iconStyle} />,
    zap: <Zap style={iconStyle} />,
    sparkles: <Sparkles style={iconStyle} />,
    flame: <Flame style={iconStyle} />,
    target: <Target style={iconStyle} />,
    tv: <Tv style={iconStyle} />,
    layers: <Layers style={iconStyle} />,
    activity: <Activity style={iconStyle} />
  };

  const key = typeof iconVal === 'string' ? iconVal.toLowerCase().trim() : '';
  if (iconMap[key]) {
    return iconMap[key];
  }

  const defaultIcons = [
    <Plane style={iconStyle} />,
    <Users style={iconStyle} />,
    <Radio style={iconStyle} />,
    <Gamepad2 style={iconStyle} />,
    <Zap style={iconStyle} />,
    <Sparkles style={iconStyle} />,
    <Flame style={iconStyle} />,
    <Target style={iconStyle} />
  ];

  return defaultIcons[idx % defaultIcons.length];
};

export default function VrGames({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading VR Games...</div>;

  const { header, footer } = siteData;
  const heroBgImage = siteData?.vrHero?.bgUrl || vrHeroBg;
  const [activeRangeIndex, setActiveRangeIndex] = React.useState(0);
  const [showAllRangeItems, setShowAllRangeItems] = React.useState(false);

  const defaultRangeItems = [
    { title: "VR4 Seated", subtitle: "Multiplayer Ride", category: "ACTIVE SIMULATION", name: "VR Wings Experience", img: vrRangeTheater, status: "ONLINE", latency: "4ms", icon: "plane" },
    { title: "VR Wings", subtitle: "Immersive Flight", category: "FLIGHT SIMULATION", name: "VR Wings Flight Arena", img: about3, status: "ONLINE", latency: "2ms", icon: "users" },
    { title: "VR UFO 5 player", subtitle: "Multiplayer Ride", category: "THEATER SIMULATION", name: "VR UFO 5 Player Motion Pod", img: arcadeHall, status: "ONLINE", latency: "5ms", icon: "radio" },
    { title: "VR UFO 4 player", subtitle: "Multiplayer Ride", category: "ARCADE SIMULATION", name: "VR UFO 4 Player Battle Station", img: about4, status: "ONLINE", latency: "3ms", icon: "gamepad" },
    { title: "VR Thunder Dual 360", subtitle: "Combat Station", category: "ACTION SIMULATION", name: "VR Thunder Dual 360 Platform", img: ctaArcade, status: "ONLINE", latency: "4ms", icon: "zap" },
    { title: "VR 360 Egg Chair", subtitle: "Dual Seat Pod", category: "MOTION CINEMA", name: "VR 360 Egg Chair Simulator", img: about3, status: "ONLINE", latency: "3ms", icon: "sparkles" },
    { title: "VR Racing Motorbike", subtitle: "Speed Simulation", category: "RACING SIMULATION", name: "VR Moto Racing Simulator", img: about4, status: "ONLINE", latency: "2ms", icon: "flame" },
    { title: "VR Standing Arena", subtitle: "360 Platform", category: "ACTIVE SIMULATION", name: "VR Standing Flight Arena", img: ctaArcade, status: "ONLINE", latency: "4ms", icon: "target" }
  ];

  const vrRangeList = siteData?.vrRange?.items || defaultRangeItems;
  const displayedRangeItems = showAllRangeItems ? vrRangeList : vrRangeList.slice(0, 5);

  const defaultVrFaqs = [
    {
      q: "1. What Is A VR Game Setup For Game Zones?",
      a: "VR games combine 9D/3D motion platforms, VR headsets, 360-degree rotation seats, and interactive shooting/racing gear to deliver fully immersive virtual reality experiences for visitors of all age groups."
    },
    {
      q: "2. How Much Space Is Required For VR Machines?",
      a: "Compact single VR simulators start from as little as 30 sq ft, while multi-player VR arenas or VR motion platforms require 100-300 sq ft depending on the model."
    },
    {
      q: "3. What VR Machines Are Best For Commercial Venues?",
      a: "Popular choices include VR Egg Cinema Chairs, VR 360 Flight Simulators, VR Racing Motorbikes, VR Standing Flight Platforms, and Multi-Player VR Target Arenas."
    },
    {
      q: "4. Does Winera Provide Turnkey VR Setup & Maintenance In India?",
      a: "Yes! We offer complete turnkey solutions including venue 3D layout planning, equipment installation, game library configuration, card reader integration, and lifetime technical support across 50+ cities in India."
    }
  ];

  const vrCards = [
    {
      title: "VR 360 Egg Chair Simulator",
      desc: "Dual-seat motion platform with 9D VR headsets, dynamic seat vibration, wind effects, and 100+ pre-installed roller coaster & adventure games.",
      img: about3,
      tag: "Top Seller"
    },
    {
      title: "VR Racing Motorbike & Car",
      desc: "Full motion leaning simulator with force-feedback steering, real-time multiplayer racing, and ultra-HD VR display.",
      img: about4,
      tag: "High ROI"
    },
    {
      title: "VR Standing Flight & Arena",
      desc: "360-degree rotating flight platform with dual joystick controls, interactive shooting games, and safety harness design.",
      img: arcadeHall,
      tag: "Interactive"
    },
    {
      title: "VR Cinema & Gatling Gun",
      desc: "Multi-seat 6DOF motion theater with heavy-duty vibration guns, environmental wind & leg ticklers for family entertainment.",
      img: ctaArcade,
      tag: "Family Favorite"
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. VR GAMES HERO BANNER SECTION */}
      <section className="winera-vr-hero-section" style={{
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 20px' }}>
          {/* Main Title: VR Games */}
          <h1 className="winera-vr-hero-h1" style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
            lineHeight: 1.15
          }}>
            {renderTitleMarkup(siteData?.vrHero?.title, "*VR* Games", '#ffcd00')}
          </h1>

          {/* Breadcrumb Navigation: Products > VR Games */}
          <p className="winera-vr-hero-breadcrumb" style={{
            fontSize: '15px',
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
            <span style={{ color: '#ffcd00' }}>{siteData?.vrHero?.breadcrumbText || "VR Games"}</span>
          </p>
        </div>
      </section>

      {/* 3. VR GAMING MACHINE SUPPLIER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-supplier-section" style={{ padding: '90px 4vw 80px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-vr-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '70px',
          alignItems: 'center'
        }}>
          {/* Left Collage Graphic Container */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.vrIntro?.mainImgUrl || vrSupplierCollage}
              alt="VR Gaming Machine Supplier in India"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-vr-supplier-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.9rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.vrIntro?.title, "*VR Gaming Machine*<br/>supplier in India", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.vrIntro?.desc || "India's ROI-first VR gaming supplier commercial-grade machines sourced, configured, and serviced by our own team across 50+ cities"}
            </p>

            <a
              href={siteData?.vrIntro?.buttonLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '900',
                padding: '13px 32px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {siteData?.vrIntro?.buttonText || "Get Quote From Expert"}
            </a>
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL VR MACHINES, MATCHED TO YOUR VENUE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-attractions-section" style={{ padding: '70px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-vr-attractions-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Text Column */}
          <div className="winera-vr-attractions-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '22px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '300px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '2.85rem',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(
                  siteData?.vrMatchedVenue?.title || (siteData?.vrMatchedVenue?.titleLine1 ? `${siteData.vrMatchedVenue.titleLine1}<br/>${siteData.vrMatchedVenue.titleLine2 || ''}` : null),
                  "*Commercial VR Machines,*<br/>Matched to Your Venue",
                  '#38bdf8'
                )}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px', maxWidth: '540px' }}>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrMatchedVenue?.p1 || "Winera International Pvt. Ltd. is a trusted VR gaming machine supplier in India sourcing and servicing commercial virtual reality machines end-to-end across India."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrMatchedVenue?.p2 || "With over 15 years of industry expertise, we source every VR gaming machine from established global manufacturers and configure it with the right game library, payment system, and safety setup to match your venue's requirements."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrMatchedVenue?.p3 || "Before delivery, each unit goes through a commercial-grade durability check — built for high-footfall environments like malls, hotels, and family entertainment centres."}
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrMatchedVenue?.p4 || "From sourcing to installation and after-sales support, our own team manages the entire process."}
              </p>
            </div>

            <a
              href={siteData?.vrMatchedVenue?.buttonLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '900',
                padding: '14px 36px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {siteData?.vrMatchedVenue?.buttonText || "Get Quote From Expert"}
            </a>
          </div>

          {/* Right Image Column: Direct Image Asset */}
          <div className="winera-vr-attractions-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.vrMatchedVenue?.imgUrl || vrMatchedVenueDirect}
              alt="Commercial VR Machines Setup"
              style={{
                width: '100%',
                maxWidth: '580px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. OUR VR GAMING MACHINE RANGE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section style={{ padding: '80px 4vw 90px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, margin: '0 0 12px 0' }}>
              {renderTitleMarkup(siteData?.vrRange?.title, "*Our VR Gaming* Machine Range", '#38bdf8')}
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '500', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              {siteData?.vrRange?.subtitle || "Every model in our VR gaming set is sourced from established global manufacturers and configured for sustained commercial operation."}
            </p>
          </div>

          {/* Interactive Range Viewer (Left Image Preview Card + Right Model Selector List) */}
          <div className="winera-vr-range-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '30px',
            alignItems: 'stretch',
            maxWidth: '1120px',
            margin: '0 auto'
          }}>
            {/* Left Big Preview Card */}
            {(() => {
              const activeItem = vrRangeList[activeRangeIndex % vrRangeList.length] || vrRangeList[0];
              return (
                <div className="winera-vr-preview-card" style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '440px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: `url(${activeItem.img}) center/cover no-repeat`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  color: '#ffffff'
                }}>
                  {/* Subtle Dark Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(0, 0, 0, 0) 100%)',
                    zIndex: 1
                  }}></div>

                  {/* Top-Right Telemetry Info */}
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    zIndex: 2,
                    textAlign: 'right',
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    <div>STATUS: <span style={{ color: '#34d399' }}>{activeItem.status || "ONLINE"}</span></div>
                    <div>LATENCY: <span style={{ color: '#38bdf8' }}>{activeItem.latency || "4ms"}</span></div>
                  </div>

                  {/* Bottom-Left Card Info */}
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: '900',
                      letterSpacing: '1.2px',
                      color: '#38bdf8',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {activeItem.category || "ACTIVE SIMULATION"}
                    </span>
                    <h3 style={{
                      fontSize: '1.9rem',
                      fontWeight: '900',
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      {activeItem.name || activeItem.title}
                    </h3>
                  </div>
                </div>
              );
            })()}

            {/* Right Interactive Selection Card List */}
            <div className="winera-vr-range-select-col" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              justifyContent: 'space-between'
            }}>
              {displayedRangeItems.map((item, idx) => {
                const isSelected = idx === activeRangeIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveRangeIndex(idx)}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
                        : '#ffffff',
                      border: isSelected ? '2px solid #38bdf8' : '1px solid #e2e8f0',
                      borderLeft: isSelected ? '5px solid #0284c7' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 10px 25px rgba(56, 189, 248, 0.25)' : '0 4px 12px rgba(0,0,0,0.02)',
                      transition: 'all 0.25s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <h4 style={{
                        fontSize: '1.15rem',
                        fontWeight: '800',
                        color: '#0f172a',
                        margin: '0 0 2px 0'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: '#64748b',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        {item.subtitle}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {renderRangeIcon(item.icon, idx, isSelected)}
                    </div>
                  </div>
                );
              })}

              {vrRangeList.length > 5 && (
                <div style={{ textAlign: 'right', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAllRangeItems(prev => !prev)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '13.5px',
                      fontWeight: '800',
                      color: '#0084ff',
                      cursor: 'pointer',
                      padding: '4px 0',
                      transition: 'all 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {showAllRangeItems ? "See Less ↑" : "See More →"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMERCIAL-GRADE QUALITY AND RELIABILITY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-reliability-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-vr-reliability-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Text Column */}
          <div className="winera-vr-reliability-text" style={{ textAlign: 'left' }}>
            <div style={{ position: 'relative', display: 'block', marginBottom: '20px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '300px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '2.85rem',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(siteData?.vrReliability?.title, "*Commercial-Grade* Quality<br/>and Reliability", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', maxWidth: '580px' }}>
              {siteData?.vrReliability?.mainP || "Most VR machines look impressive in a showroom. What matters for your venue is how they perform after six months of daily public use. Every unit we supply is built specifically for commercial cycling not consumer hardware repackaged for public environments. The difference shows up in your maintenance bills, not the spec sheet."}
            </p>

            {/* Checkmark Feature Block 1: Right Machine for Every Venue Type */}
            <div style={{ marginBottom: '24px', maxWidth: '580px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '18px', fontWeight: '900' }}>✓</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {siteData?.vrReliability?.f1Title || "Right Machine for Every Venue Type"}
                </h3>
              </div>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrReliability?.f1Desc || "A 5-player group ride suits a high-footfall mall. A solo seated simulator suits a hotel lobby. Getting this match wrong is the most common reason VR zones underperform. We assess your space, footfall, and visitors before recommending anything — not from a catalogue."}
              </p>
            </div>

            {/* Checkmark Feature Block 2: End-to-End Support and Service */}
            <div style={{ maxWidth: '580px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#38bdf8', fontSize: '18px', fontWeight: '900' }}>✓</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {siteData?.vrReliability?.f2Title || "End-to-End Support and Service"}
                </h3>
              </div>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                {siteData?.vrReliability?.f2Desc || "The same team that recommends your machine mix sources it, installs it, and supports it after handover. No separate vendors, no subcontractors, no waiting on overseas manufacturers. When something needs attention, one call reaches the right person."}
              </p>
            </div>
          </div>

          {/* Right Column: Direct Image Asset */}
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.vrReliability?.imgUrl || vrCommercialReliability}
              alt="Commercial-Grade Quality and Reliability"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 7. WHAT WILL YOUR VR GAMING ZONE ACTUALLY EARN? SECTION (FULL SCREEN WIDTH BG) */}
      <section className="winera-vr-earn-section" style={{
        position: 'relative',
        width: '100%',
        padding: '90px 4vw 100px',
        background: `url(${siteData?.vrEarn?.bgUrl || vrRoiFrame}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-vr-earn-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          minHeight: '440px'
        }}>
          {/* Left Content */}
          <div className="winera-vr-earn-text" style={{ textAlign: 'left', zIndex: 2 }}>
            <div style={{ position: 'relative', display: 'block', marginBottom: '18px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '280px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '2.7rem',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(
                  siteData?.vrEarn?.title || (siteData?.vrEarn?.titleLine1 ? `${siteData.vrEarn.titleLine1}<br/>${siteData.vrEarn.titleLine2 || ''}` : null),
                  "What Will Your VR Gaming<br/>*Zone Actually Earn?*",
                  '#38bdf8'
                )}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px', maxWidth: '520px' }}>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.vrEarn?.p1 || "Most VR machine suppliers in India quote a price and leave the financial decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any order, our team prepares a complete ROI report for your specific venue covering machine cost, projected daily sessions, estimated revenue per player, maintenance costs, and break-even timeline."}
              </p>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.vrEarn?.p2 || "Every figure is calculated around your venue type, footfall, and machine selection, not an industry average pulled from a brochure. Very few VR gaming suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
              </p>
            </div>

            <a
              href={siteData?.vrEarn?.buttonLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '900',
                padding: '13px 32px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {siteData?.vrEarn?.buttonText || "Get Quote From Expert"}
            </a>
          </div>

          {/* Right Image Feature */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <img
              src={siteData?.vrEarn?.imgUrl || vrEarnPlayer}
              alt="VR Gaming Zone ROI Player"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                display: 'block',
                borderRadius: '24px'
              }}
            />
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING BUMPER CAR PAGE 1:1) */}
      <section className="winera-vr-whyus-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.vrWhyUs?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* Cards Grid Container (Dynamic List with Thin Blue Dividers & Odd/Even Row Layout) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const defaultVrWhyUsCards = [
                { title: "We Turn Down Weak Machines", desc: "If A Machine Won't Survive Heavy Public Use, We Won't Sell It To You." },
                { title: "One Supplier, Full Setup", desc: "Your Entire Machine Mix Is Sourced, Installed, And Serviced By One Team." },
                { title: "We Know The Footfall", desc: "Years Of Real Venues Tell Us What Works Where And What Doesn't." },
                { title: "Transparent Pricing", desc: "A Clear Cost Breakdown Up Front, With No Surprises Later." },
                { title: "Built Around Your Space", desc: "We Recommend Machines That Fit Your Actual Floor, Not A Catalogue." }
              ];

              const cards = (Array.isArray(siteData?.vrWhyUs?.cardsList) && siteData.vrWhyUs.cardsList.length > 0)
                ? siteData.vrWhyUs.cardsList
                : defaultVrWhyUsCards;

              const iconsList = [
                <ShieldCheck key={0} style={{ width: '24px', height: '24px' }} />,
                <Settings key={1} style={{ width: '24px', height: '24px' }} />,
                <Database key={2} style={{ width: '24px', height: '24px' }} />,
                <Headset key={3} style={{ width: '24px', height: '24px' }} />,
                <Wrench key={4} style={{ width: '24px', height: '24px' }} />
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
                  {/* TOP ROW */}
                  <div className="winera-vr-whyus-row winera-vr-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    borderBottom: bottomCards.length > 0 ? '1.5px solid #bae6fd' : 'none',
                    paddingBottom: bottomCards.length > 0 ? '40px' : '0'
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-vr-whyus-card"
                        style={{
                          padding: '0 30px',
                          textAlign: 'center',
                          borderRight: cIdx === topCards.length - 1 ? 'none' : '1.5px solid #bae6fd',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
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
                          boxShadow: '0 8px 18px rgba(56, 189, 248, 0.3)'
                        }}>
                          {card.iconUrl ? (
                            <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                          ) : (
                            iconsList[cIdx % iconsList.length]
                          )}
                        </div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                          {card.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM ROW (CENTERED ODD/EVEN REMAINDER) */}
                  {bottomCards.length > 0 && (
                    <div className="winera-vr-whyus-row winera-vr-whyus-bottom-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                      paddingTop: '40px',
                      maxWidth: bottomCards.length === 2 ? '780px' : '100%',
                      margin: '0 auto',
                      width: '100%'
                    }}>
                      {bottomCards.map((card, bIdx) => (
                        <div
                          key={bIdx}
                          className="winera-vr-whyus-card"
                          style={{
                            padding: '0 35px',
                            textAlign: 'center',
                            borderRight: bIdx === bottomCards.length - 1 ? 'none' : '1.5px solid #bae6fd',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
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
                            boxShadow: '0 8px 18px rgba(56, 189, 248, 0.3)'
                          }}>
                            {card.iconUrl ? (
                              <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                            ) : (
                              iconsList[(topCards.length + bIdx) % iconsList.length]
                            )}
                          </div>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* CTA: Get Free Consultation Button */}
          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            <a
              href={siteData?.vrWhyUs?.ctaLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '900',
                padding: '14px 38px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 25px rgba(56, 189, 248, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {siteData?.vrWhyUs?.ctaText || "Get Free Consultation"}
            </a>
          </div>
        </div>
      </section>

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>OUR <span style={{ color: '#38bdf8' }}>RECENT PROJECTS</span></>}
      />

      {/* 6. TESTIMONIALS SECTION */}
      <TestimonialsSection siteData={siteData} />

      {/* 7. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection currentProductLink="/products/vr-games" />

      {/* 8. FAQ SECTION */}
      <FaqSection
        faqList={Array.isArray(siteData?.vrFaqs) && siteData.vrFaqs.length > 0 ? siteData.vrFaqs : defaultVrFaqs}
        faqsList={Array.isArray(siteData?.vrFaqs) && siteData.vrFaqs.length > 0 ? siteData.vrFaqs : defaultVrFaqs}
      />

      {/* 9. CTA BANNER SECTION (MATCHING SCREENSHOT 1:1) */}
      <section style={{ padding: '60px 4vw 80px', background: '#F5F5F9', textAlign: 'center' }}>
        <div className="winera-cta-banner-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          backgroundImage: `url(${siteData?.vrCta?.bgUrl || siteData?.vrCta?.bg || ctaConsultationsBanner})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '24px',
          padding: '60px 40px',
          minHeight: '290px',
          aspectRatio: '1920 / 520',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            lineHeight: 1.25,
            marginBottom: '10px',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)',
            letterSpacing: '0.5px'
          }}>
            <span style={{ color: '#ffcd00' }}>
              {siteData?.vrCta?.yellowText || "NEED ANY "}
            </span>
            <span style={{ color: '#38bdf8' }}>
              {siteData?.vrCta?.cyanText || "CONSULTATIONS?"}
            </span>
          </h2>

          <p style={{
            fontSize: '1.4rem',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1.35,
            marginBottom: '12px',
            maxWidth: '680px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)'
          }}>
            {siteData?.vrCta?.whiteText || "WE'RE READY TO GIVE ANSWERS TO YOUR QUESTIONS."}
          </p>

          <p style={{
            fontSize: '12.5px',
            fontWeight: '500',
            color: '#e2e8f0',
            lineHeight: 1.6,
            marginBottom: '26px',
            maxWidth: '620px',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            {(siteData?.vrCta?.description && siteData.vrCta.description.trim() !== '') ? siteData.vrCta.description : "Partner with India's trusted VR gaming machine supplier for a complete VR zone setup across India."}
          </p>


          <a
            href={siteData?.header?.whatsAppUrl || "https://wa.me/919428989488"}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#ffcd00',
              color: '#0f172a',
              fontSize: '13.5px',
              fontWeight: '900',
              padding: '12px 30px',
              borderRadius: '12px',
              border: '3px solid #38bdf8',
              boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            {siteData?.vrCta?.buttonText || "Talk to an ROI Expert"}
          </a>
        </div>
      </section>

      {/* 10. FOOTER SECTION */}
      <Footer footerData={footer} />
    </div>
  );
}
