import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import { ShieldCheck, Settings, Database, Headset, Wrench, Plane, Users, Radio, Gamepad2, Zap, Sparkles, Flame, Target, Tv, Layers, Activity } from 'lucide-react';

import vrHeroBg from '../assets/vrgame-hero-bg.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import ctaGamersBg from '../assets/cta-gamers-bg.webp';
import ctaArcade from '../assets/cta-arcade.webp';
import arcadeBoy from '../assets/arcade-boy.webp';
import arcadeHall from '../assets/arcade-hall.webp';
import about1 from '../assets/about-01.webp';
import about2 from '../assets/about-2.webp';
import about3 from '../assets/about-3.webp';
import about4 from '../assets/about-4.webp';
import bumpercarCollageFrame from '../assets/bumpercar-collage-frame.webp';
import vrCollageGraphic from '../assets/vr-collage-graphic.webp';
import vrSupplierCollage from '../assets/vr-supplier-collage.webp';
import vrMatchedVenue from '../assets/vr-matched-venue.webp';
import vrMatchedVenueDirect from '../assets/vr-matched-venue-direct.webp';
import vrRangeTheater from '../assets/vr-range-theater.webp';
import vrBlock1 from '../assets/vr-block-1.webp';
import vrCommercialReliability from '../assets/vr-commercial-reliability.webp';
import vrRoiFrame from '../assets/vr-roi-frame.webp';
import vrRoiContent from '../assets/vr-roi-content.webp';
import vrEarnPlayer from '../assets/vr-earn-player.webp';
import vrGameImg from '../assets/vr-game-image.webp';
import vrGameCurveImg from '../assets/vr-game-image2.webp';
import vrImg from '../assets/VR.webp';
import vectorVr from '../assets/Vector-VR.webp';
import vector01 from '../assets/Vector-01.webp';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.webp';
import vrgameCtaBg from '../assets/vrgame-cta-bg.webp';
import vrCtaRightImg from '../assets/vr-cta-right-img.webp';
import amusementParkCtaBg from '../assets/cta-consultations-banner.webp';

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

// Helper to resolve valid image URLs or fallback
const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:5001${url}`;
  if (url.startsWith('/assets/') || url.startsWith('/src/assets/')) return fallback;
  return url;
};

export default function VrGames({ siteData }) {
  const [activeRangeIndex, setActiveRangeIndex] = React.useState(0);
  const [showAllRangeItems, setShowAllRangeItems] = React.useState(false);

  React.useEffect(() => {
    if (!siteData) return;
    window.scrollTo(0, 0);

    const pageTitle = siteData?.vrSeo?.pageTitle || "VR Gaming Machine Manufacturer in India | Winera International";
    const metaDesc = siteData?.vrSeo?.metaDescription || "Winera International is a leading VR gaming machine manufacturer in India, offering immersive virtual reality attractions built for arcades and FEC centers.";

    document.title = pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [siteData]);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading VR Games...</div>;

  const { header, footer } = siteData;
  const heroBgImage = getValidImageUrl(siteData?.vrHero?.bgUrl, vrHeroBg);

  const defaultRangeItems = [
    { title: "VR4 Seated", subtitle: "Multiplayer Ride", category: "ACTIVE SIMULATION", name: "VR Wings Experience", img: vrBlock1, status: "ONLINE", latency: "4ms", icon: "plane" },
    { title: "VR Wings", subtitle: "Immersive Flight", category: "FLIGHT SIMULATION", name: "VR Wings Flight Arena", img: about3, status: "ONLINE", latency: "2ms", icon: "users" },
    { title: "VR UFO 5 player", subtitle: "Group Pod Ride", category: "THEATER SIMULATION", name: "VR UFO 5 Player Motion Pod", img: arcadeHall, status: "ONLINE", latency: "5ms", icon: "radio" },
    { title: "VR UFO 4 player", subtitle: "Group Battle", category: "ARCADE SIMULATION", name: "VR UFO 4 Player Battle Station", img: about4, status: "ONLINE", latency: "3ms", icon: "gamepad" },
    { title: "VR Thunder Dual 360", subtitle: "Combat Station", category: "ACTION SIMULATION", name: "VR Thunder Dual 360 Platform", img: ctaArcade, status: "ONLINE", latency: "4ms", icon: "zap" },
    { title: "VR small platform", subtitle: "Compact Pod", category: "MOTION CINEMA", name: "VR Small Platform Simulator", img: about3, status: "ONLINE", latency: "3ms", icon: "sparkles" },
    { title: "VR skyside 2 player", subtitle: "Co-op Flight", category: "ACTIVE SIMULATION", name: "VR Skyside 2 Player Arena", img: about4, status: "ONLINE", latency: "4ms", icon: "target" },
    { title: "VR Ski Machine 1P", subtitle: "Active Sports", category: "SPORTS SIMULATION", name: "VR Ski Machine Single Player", img: ctaArcade, status: "ONLINE", latency: "2ms", icon: "activity" },
    { title: "VR Single 360-exclusive", subtitle: "Solo Simulation", category: "360 MOTION EXCLUSIVE", name: "VR Single 360 Exclusive Pod", img: vrImg, status: "ONLINE", latency: "3ms", icon: "layers" },
    { title: "VR Single 360 Fighter Jet Simulator", subtitle: "Fighter Jet Sim", category: "MILITARY SIMULATION", name: "VR Single 360 Fighter Jet Simulator", img: about3, status: "ONLINE", latency: "5ms", icon: "plane" }
  ];

  const vrRangeListRaw = (Array.isArray(siteData?.vrRange?.items) && siteData.vrRange.items.length > 0) ? siteData.vrRange.items : defaultRangeItems;
  const vrRangeList = vrRangeListRaw.map((item, idx) => {
    let finalImg = item.img || item.imgUrl;
    if (idx === 0) {
      finalImg = vrBlock1;
    }
    return { ...item, img: finalImg, imgUrl: finalImg };
  });
  const displayedRangeItems = showAllRangeItems ? vrRangeList : vrRangeList.slice(0, 5);

  const defaultVrFaqs = [
    {
      question: "What is included in a commercial VR gaming set?",
      answer: "A complete commercial VR gaming set from Winera includes the VR machine unit, motion platform (where applicable), VR headsets, a pre-loaded and commercially licensed game library, safety barriers, installation by our own team, and post-installation support. Exact components vary by machine model — confirmed at the quote stage."
    },
    {
      question: "Which businesses typically need a VR games supplier in India?",
      answer: "Family entertainment centres, malls, amusement parks, hotels, resorts, bowling centers, and standalone gaming zones are the most common businesses that work with a VR games supplier in India."
    },
    {
      question: "What is the VR gaming setup cost in India?",
      answer: "VR gaming setup cost in India depends on the number of machines, machine category, motion system complexity, and game library size. Pricing varies significantly between a single compact platform and a multi-machine zone with group rides."
    },
    {
      question: "Do VR gaming machines require a minimum ceiling height or floor space?",
      answer: "Yes. Motion platforms and group rides typically need higher ceiling clearance than solo simulators, and floor space requirements scale with player count. Winera assesses your venue's exact dimensions before recommending machine models, since not every machine fits every space."
    },
    {
      question: "How long does VR gaming machine installation take?",
      answer: "Installation timelines depend on machine count and complexity; a single solo platform can be operational within days, while a multi-machine zone with group rides takes longer for setup and software configuration. We confirm an exact schedule at the quote stage."
    },
    {
      question: "Can VR gaming machines be customised with branded content or specific game libraries?",
      answer: "Yes. Game library selection, branding wraps, and venue-specific configuration can be tailored per machine. We confirm available customisation options for each model during the consultation."
    },
    {
      question: "What happens if a VR machine breaks down after installation?",
      answer: "Our own technicians handle servicing directly, with coverage across 50+ cities in India. For software issues, remote diagnostics are available for most machines. For hardware faults, our own team visits your site; you're not waiting on an overseas manufacturer or a disconnected logistics partner."
    },
    {
      question: "How do I get started with a VR gaming machine order from Winera?",
      answer: "Contact us via our website's contact form, WhatsApp, or call +91 94289 89488. Tell us your venue type, approximate floor area available, and the number of machines you're considering. Our team will recommend the right machine mix, provide a complete cost breakdown, and send a quote ASAP."
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

      {/* 2. VR GAMES HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-vr-hero-section" style={{
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
          {/* Centered Single Line Heading: Home › VR Games */}
          <h1 className="winera-vr-hero-h1" style={{
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
              {siteData?.vrHero?.breadcrumbText || "VR Games"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. VR GAMING MACHINE SUPPLIER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-supplier-section" style={{ padding: '90px 4vw 35px', background: '#F5F5F9', overflow: 'hidden' }}>
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
              <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.vrIntro?.title, "*VR Gaming Machine*<br/>supplier in India", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.vrIntro?.desc || "India's ROI-first VR gaming supplier commercial-grade machines sourced, configured, and serviced by our own team across 50+ cities"}
            </p>

            <div className="winera-cyan-cta-wrapper">
              {(() => {
                const baseLink = siteData?.vrIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.vrIntro?.waMessage || "Hello Winera International! I want to get a quote and details for VR Gaming Machine setup. Please share details. [Ref: VR Games Page]";
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
                    <span>{siteData?.vrIntro?.buttonText || "Get Quote From Expert"}</span>
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMMERCIAL VR MACHINES, MATCHED TO YOUR VENUE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-attractions-section" style={{ padding: '35px 4vw 35px', background: '#F5F5F9', overflow: 'hidden' }}>
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
                fontSize: '42px',
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

            <div className="winera-cyan-cta-wrapper">
              {(() => {
                const baseLink = siteData?.vrMatchedVenue?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.vrMatchedVenue?.waMessage || "Hello Winera International! I want to get a quote for Commercial VR Machines matched to my venue. Please share details. [Ref: VR Games Page]";
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
                    <span>{siteData?.vrMatchedVenue?.buttonText || "Get Quote From Expert"}</span>
                  </a>
                );
              })()}
            </div>
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
      <section style={{ padding: '35px 4vw 35px', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, margin: '0 0 12px 0' }}>
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
                      boxShadow: 'none',
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
      <section className="winera-vr-reliability-section" style={{ padding: '35px 4vw 35px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-vr-reliability-grid" style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
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
                fontSize: '42px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(siteData?.vrReliability?.title, "*Commercial-Grade* Quality<br/>and Reliability", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', maxWidth: '549px' }}>
              {siteData?.vrReliability?.mainP || "Most VR machines look impressive in a showroom. What matters for your venue is how they perform after six months of daily public use. Every unit we supply is built specifically for commercial cycling not consumer hardware repackaged for public environments. The difference shows up in your maintenance bills, not the spec sheet."}
            </p>

            {/* Checkmark Feature Block 1: Right Machine for Every Venue Type */}
            <div style={{ marginBottom: '24px', maxWidth: '549px' }}>
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
            <div style={{ maxWidth: '549px' }}>
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
          <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
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

      {/* 7. WHAT WILL YOUR VR GAMING ZONE ACTUALLY EARN? SECTION (WITH vrRoiFrame BG) */}
      <section className="winera-vr-earn-section" style={{
        position: 'relative',
        width: '100%',
        padding: '85px 4vw 95px',
        background: `url(${siteData?.vrEarn?.bgUrl || vrRoiFrame}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-vr-earn-card" style={{
          maxWidth: '1080px',
          margin: '0 auto',
          position: 'relative',
          background: 'transparent',
          padding: '0',
          display: 'grid',
          gridTemplateColumns: '1.08fr 1fr',
          alignItems: 'center',
          overflow: 'visible',
          boxShadow: 'none',
          minHeight: '430px'
        }}>
          {/* Left Content Column */}
          <div className="winera-vr-earn-text" style={{ padding: '42px 35px 42px 45px', textAlign: 'left', zIndex: 3 }}>
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '260px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '42px',
                fontWeight: '900',
                lineHeight: 1.16,
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px', maxWidth: '520px' }}>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.vrEarn?.p1 || "Most VR machine suppliers in India quote a price and leave the financial decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any order, our team prepares a complete ROI report for your specific venue covering machine cost, projected daily sessions, estimated revenue per player, maintenance costs, and break-even timeline."}
              </p>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.vrEarn?.p2 || "Every figure is calculated around your venue type, footfall, and machine selection, not an industry average pulled from a brochure. Very few VR gaming suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
              </p>
            </div>

            {/* Get Quote Button matching Image 1 1:1 */}
            <div className="winera-cyan-cta-wrapper">
              {(() => {
                const baseLink = siteData?.vrEarn?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.vrEarn?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for VR Gaming Zone setup & commercial ROI calculation. Please share details. [Ref: VR Games Page]";
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
                    <span>{siteData?.vrEarn?.buttonText || "Get Quote From Expert"}</span>
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Image Feature with vr-game-image.webp & vr-game-image2.webp (Yellow Curve Accent) */}
          <div className="winera-vr-earn-img-container" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '430px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            overflow: 'hidden'
          }}>
            <img
              src={getValidImageUrl(siteData?.vrEarn?.imgUrl, vrGameImg)}
              alt="VR Gaming Zone ROI Player"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'left center',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                paddingLeft: '12px'
              }}
            />
            {/* Yellow Wave Accent Stroke sitting along the curve */}
            <img
              src={vrGameCurveImg}
              alt=""
              style={{
                position: 'absolute',
                left: '-8px',
                top: '-2px',
                height: '103%',
                width: 'auto',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING BUMPER CAR PAGE 1:1) */}
      <section className="winera-vr-whyus-section" style={{ padding: '35px 4vw 35px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '510px', maxWidth: '100%', height: '11px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-vr-whyus-h2" style={{ fontSize: '42px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
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
                <div style={{ position: 'relative' }}>
                  {/* TOP ROW */}
                  <div className="winera-vr-whyus-row winera-vr-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    gap: '0px',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-vr-whyus-card"
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
                          <div className="winera-vr-whyus-vertical-divider" style={{
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
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                          {card.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Center Cyan Divider Line with Shade Fading */}
                  {bottomCards.length > 0 && (
                    <div className="winera-vr-whyus-horizontal-divider" style={{
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 12%, #38bdf8 88%, rgba(56, 189, 248, 0.08) 100%)',
                      position: 'relative',
                      zIndex: 3,
                      margin: '0 0 30px'
                    }}></div>
                  )}

                  {/* BOTTOM ROW (CENTERED ODD/EVEN REMAINDER) */}
                  {bottomCards.length > 0 && (
                    <div className="winera-vr-whyus-row winera-vr-whyus-bottom-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                      maxWidth: bottomCards.length === 2 ? '780px' : '100%',
                      margin: '0 auto',
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {bottomCards.map((card, bIdx) => (
                        <div
                          key={bIdx}
                          className="winera-vr-whyus-card"
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
                            <div className="winera-vr-whyus-vertical-divider" style={{
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
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* CTA: Get Free Consultation Button */}
          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.vrWhyUs?.ctaLink || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {siteData?.vrWhyUs?.ctaText || "Get Free Consultation"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
        showBottomButton={true}
        buttonText="Know More"
      />

      {/* 10. TESTIMONIALS SECTION */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 11. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.vrRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 12. FAQ SECTION */}
      <FaqSection
        faqList={Array.isArray(siteData?.vrFaqs) && siteData.vrFaqs.length > 0 ? siteData.vrFaqs : defaultVrFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 9. NEED ANY CONSULTATIONS CTA BANNER SECTION */}
      <CtaBanner
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="42px"
        subtitleFontSize="24px"
        subtitleFontWeight="900"
        bgUrl={
          siteData?.vrCta?.bgUrl &&
            !siteData.vrCta.bgUrl.includes('cta-consultations') &&
            !siteData.vrCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.vrCta.bgUrl, amusementParkCtaBg)
            : null
        }
        bg={amusementParkCtaBg}
        leftImgUrl={
          siteData?.vrCta?.leftImgUrl && !siteData.vrCta.leftImgUrl.includes('home-block-1')
            ? getValidImageUrl(siteData.vrCta.leftImgUrl, vrgameCtaBg)
            : null
        }
        leftImg={vrgameCtaBg}
        rightImgUrl={
          siteData?.vrCta?.rightImgUrl
            ? getValidImageUrl(siteData.vrCta.rightImgUrl, vrCtaRightImg)
            : null
        }
        rightImg={vrCtaRightImg}
        tagline={null}
        title={
          siteData?.vrCta?.title
            ? siteData.vrCta.title
            : "NEED ANY CONSULTATIONS?"
        }
        subtitle={
          siteData?.vrCta?.subtitle || siteData?.vrCta?.whiteText
            ? siteData?.vrCta?.subtitle || siteData?.vrCta?.whiteText
            : "WE'RE READY TO GIVE ANSWERS TO<br/>YOUR QUESTIONS."
        }
        description={null}
        buttonText={
          siteData?.vrCta?.buttonText !== undefined
            ? siteData.vrCta.buttonText
            : "Talk to an ROI Expert"
        }
        buttonLink={
          siteData?.vrCta?.buttonLink !== undefined
            ? siteData.vrCta.buttonLink
            : "https://wa.me/919428989488"
        }
      />

      {/* 10. FOOTER SECTION */}
      <Footer footerData={footer} />
    </div>
  );
}
