import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import MobileExpandableText from '../components/MobileExpandableText';
import SectionHeading from '../components/SectionHeading';
import WineraImage from '../components/WineraImage';
import allVrGames from '../data/allVrGames.json';
import { 
  ShieldCheck, Settings, Database, Headset, Wrench, Plane, Users, Radio, 
  Gamepad2, Zap, Sparkles, Flame, Target, Tv, Layers, Activity, Plus, Minus,
  Search, X, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Eye, CheckCheck, MessageCircle, Maximize2
} from 'lucide-react';

const vrHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/ziinwppnkbtzqzz54raa.png";
const vrMobileHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/kpty49ky7coh1q3mmylu.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const ctaGamersBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/mvnbpetz0ketq0uho4db.png";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";
const ctaArcade = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/wrwlxquyxiiygubzvzlx.jpg";
const arcadeBoy = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/lxgyufz5gdfquteol0qq.jpg";
const arcadeHall = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ctowdzk3h7ee5rxb2vpn.jpg";
const about1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345510/winera_uploads/wxqjmaw9a6bio8qwbeq4.png";
const about2 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345511/winera_uploads/tqdmbldbsagsq6pylfq0.jpg";
const about3 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345512/winera_uploads/x14hcngkdlrhsdccxigh.jpg";
const about4 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345513/winera_uploads/wvbncpu0ey7yttt9i4yc.jpg";
const bumpercarCollageFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/bcia8d2o3cekiuknvaqv.png";
const vrCollageGraphic = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/br2knhzztoors4qwhpjk.jpg";
const vrSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/fotb8dwjs5b1tvmrbuut.png";
const vrMatchedVenue = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/eijabuvukr7aecpmdxo3.jpg";
const vrMatchedVenueDirect = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/g1jdvjffwyfgczzas3bu.png";
const vrRangeTheater = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/ucvw32nn12jbiso8mkvr.jpg";
const vrBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345688/winera_uploads/lwatadqikcv51rk0ekf7.jpg";
const vrCommercialReliability = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/mwwbahj93n3edr79u56j.png";
const vrRoiFrame = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/q1ko5z5lntd6vquthluc.png";
const vrRoiContent = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/azvnt9rqdd3gsck9ez5c.jpg";
const vrEarnPlayer = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/lgpdlfkmriydmxrftvc1.jpg";
const vrGameImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/la4vnv271a1sdaztbbtg.png";
const vrGameCurveImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/k8jol5wg5u3uip9kk706.png";
const vrImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345501/winera_uploads/nis3v7prjmilqj38vokw.png";
const vectorVr = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345507/winera_uploads/gcasrkrdlwgr2sieoc7w.png";
const vector01 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345504/winera_uploads/q4pujcj5ntpkba03pixv.png";
const ctaConsultationsBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const vrgameCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345693/winera_uploads/cakb5xd88qaaqsd3wszb.png";
const vrCtaRightImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/r7a7hoy1dktrgee5mxhq.png";
const amusementParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
import WhyChooseUsMobileSlider from '../components/WhyChooseUsMobileSlider';

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  let text = rawText || defaultText;
  if (!text) return null;

  // Ensure spacing around <br/> tags so words never stick together if line breaks are hidden on mobile
  text = text.replace(/([^\s>])(<br\s*\/?>)/gi, '$1 $2').replace(/(<br\s*\/?>)([^\s<])/gi, '$1 $2');

  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;
    const lines = part.split(/<br\s*\/?>/i);
    const renderedContent = lines.map((line, lIdx) => {
      const needsNowrap = line.includes("Commercial VR Machines") || line.includes("Commercial-Grade Quality") || line.includes("What Will Your VR Gaming");
      return (
        <React.Fragment key={lIdx}>
          {lIdx > 0 && <br />}
          {needsNowrap ? <span style={{ whiteSpace: 'normal', display: 'inline' }}>{line}</span> : line}
        </React.Fragment>
      );
    });

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



// Helper to resolve valid image URLs or fallback
const getValidImageUrl = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `http://localhost:5001${url}`;
  if (url.startsWith('/assets/') || url.startsWith('/src/assets/')) return fallback;
  return url;
};

export default function VrGames({ siteData }) {
  const [activeCategory, setActiveCategory] = useState("All VR Games");
  const [expandedCat, setExpandedCat] = useState("All VR Games");
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecsProduct, setSelectedSpecsProduct] = useState(null);
  const [selectedModalImageIdx, setSelectedModalImageIdx] = useState(0);
  const [openReliabilityIndex, setOpenReliabilityIndex] = useState(-1);

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
        '--winera-vr-mobile-bg': `url("${vrMobileHeroBg}")`,
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
            fontSize: '21px',
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
                maxWidth: '460px',
                height: 'auto',
                display: 'block',
                borderRadius: '0px'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-vr-supplier-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                className="winera-yellow-stroke winera-vr-intro-stroke"
                style={{ display: 'block', width: '260px', maxWidth: '100%', height: '10px', marginBottom: '10px', objectFit: 'fill', margin: '0 0 10px 0' }}
              />
              <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.vrIntro?.title, "*VR Gaming Machine*<br/>supplier in India", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '5px' }}>
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
      <section className="winera-vr-attractions-section" style={{ padding: '5px 4vw 35px', background: '#F5F5F9', overflow: 'hidden' }}>
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
                className="winera-yellow-stroke winera-vr-attractions-stroke"
                style={{ display: 'block', width: '300px', maxWidth: '100%', height: '10px', marginBottom: '10px', objectFit: 'fill', margin: '0 0 10px 0' }}
              />
              <h2 style={{
                fontSize: '35px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px',
                width: '100%',
                maxWidth: '100%'
              }}>
                {renderTitleMarkup(
                  siteData?.vrMatchedVenue?.title || (siteData?.vrMatchedVenue?.titleLine1 ? `${siteData.vrMatchedVenue.titleLine1}<br/>${siteData.vrMatchedVenue.titleLine2 || ''}` : null),
                  "*Commercial VR Machines,*<br/>Matched to Your Venue",
                  '#38bdf8'
                )}
              </h2>
            </div>

            <div style={{ marginBottom: '14px', width: '100%', maxWidth: '100%' }}>
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '0 0 8px 0' }}>
                    {siteData?.vrMatchedVenue?.p1 || "Winera International Pvt. Ltd. is a trusted VR gaming machine supplier in India sourcing and servicing commercial virtual reality machines end-to-end across India."}
                  </p>
                }
                expandedContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
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
                }
              />
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

      {/* 5. VR PRODUCTS CATALOG: SIDEBAR & PRODUCT CARDS GRID (1:1 MATCHING ARCADE GAME CATALOG DESIGN) */}
      <section id="categories" className="winera-categories-section" style={{ padding: '20px 4vw 75px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading for Categories */}
          <SectionHeading marginBottom="32px" accentWidth="400px" accentMaxWidth="400px">
            Discover our *Products*
          </SectionHeading>

          {/* Mobile Category Select Dropdown */}
          <div className="winera-mobile-category-dropdown-container" style={{ display: 'none', marginBottom: '24px', width: '100%', position: 'relative', zIndex: 50 }}>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', textAlign: 'left' }}>
              Select Category:
            </label>

            {/* Category Toggle Button */}
            <button
              type="button"
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                border: '2px solid #38bdf8',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '15px',
                fontWeight: '800',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(56, 189, 248, 0.12)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <span>{activeCategory}</span>
              <ChevronDown style={{
                width: '20px',
                height: '20px',
                color: '#0284c7',
                transform: isCatDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease'
              }} />
            </button>

            {/* Custom Dropdown Options Menu */}
            {isCatDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: '#ffffff',
                border: '2px solid #38bdf8',
                borderRadius: '18px',
                boxShadow: '0 12px 35px rgba(2, 132, 199, 0.18)',
                overflow: 'hidden',
                zIndex: 100,
                maxHeight: '340px',
                overflowY: 'auto',
                padding: '6px'
              }}>
                {(allVrGames?.categoriesList || [
                  "All VR Games", "Bester VR", "Funin VR", "Movie Power", "Oculeap VR"
                ]).map((cat, cIdx) => {
                  const isSelected = (activeCategory || "All VR Games") === cat;
                  return (
                    <div
                      key={cIdx}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                        setIsCatDropdownOpen(false);
                      }}
                      style={{
                        padding: '13px 16px',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: isSelected ? '800' : '600',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        background: isSelected ? '#38bdf8' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '3px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{cat}</span>
                      {isSelected && <span style={{ fontSize: '15px', fontWeight: '900' }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
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
              padding: '24px 18px 24px',
              boxShadow: '0 8px 25px rgba(56, 189, 248, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              height: '100%'
            }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', paddingLeft: '4px' }}>
                Discover our Products
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {(() => {
                  const availableCats = allVrGames?.categoriesList || [
                    "All VR Games",
                    "Bester VR",
                    "Funin VR",
                    "Movie Power",
                    "Oculeap VR"
                  ];

                  const topCategory = availableCats[0] || "All VR Games";
                  const subCategories = availableCats.slice(1);
                  const isTopSelected = (activeCategory === topCategory || !activeCategory);

                  return (
                    <>
                      {/* Parent Category Button: All VR Games */}
                      <button
                        onClick={() => {
                          setActiveCategory(topCategory);
                          setExpandedCat(expandedCat === topCategory ? null : topCategory);
                          setCurrentPage(1);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: isTopSelected ? '10px 14px' : '10px 8px 10px 4px',
                          borderRadius: isTopSelected ? '10px' : '0px',
                          border: 'none',
                          borderBottom: isTopSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.85)',
                          background: isTopSelected ? '#38bdf8' : 'transparent',
                          color: isTopSelected ? '#ffffff' : 'rgb(55, 62, 65)',
                          fontSize: '16px',
                          fontWeight: isTopSelected ? '700' : '400',
                          cursor: 'pointer',
                          textAlign: 'left',
                          marginBottom: '4px',
                          boxShadow: 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{topCategory}</span>
                        <ChevronDown style={{ width: '14px', height: '14px', color: isTopSelected ? '#ffffff' : '#94a3b8', transform: expandedCat === topCategory ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </button>

                      {/* Subcategories List */}
                      {subCategories.map((subName, subIdx, array) => {
                        const isSelected = activeCategory === subName;
                        const isLast = subIdx === array.length - 1;

                        return (
                          <button
                            key={subIdx}
                            onClick={() => {
                              setActiveCategory(subName);
                              setCurrentPage(1);
                            }}
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
                              color: isSelected ? '#ffffff' : 'rgb(55, 62, 65)',
                              fontSize: '16px',
                              fontWeight: isSelected ? '700' : '400',
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
                    </>
                  );
                })()}
              </div>
            </div>

            {/* RIGHT DISPLAY AREA: PRODUCT SEARCH BAR + CARDS GRID + PAGINATION */}
            <div className="winera-products-display-area" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {(() => {
                const masterCards = Array.isArray(allVrGames?.cards) ? allVrGames.cards : [];

                // Filter cards by selected activeCategory
                const isAllCategory = !activeCategory || activeCategory === "All VR Games" || activeCategory === "All";
                const categoryMatched = isAllCategory
                  ? masterCards
                  : masterCards.filter(c => {
                      const cat = (c.category || c.tag || "").toLowerCase().trim();
                      const target = activeCategory.toLowerCase().trim();
                      return cat === target || cat.includes(target) || target.includes(cat);
                    });

                // Further filter cards by live search query
                const prodCards = searchQuery.trim()
                  ? categoryMatched.filter(c => {
                      const q = searchQuery.toLowerCase().trim();
                      const name = (c.name || c.title || "").toLowerCase();
                      const cat = (c.category || c.tag || "").toLowerCase();
                      const desc = (c.desc || "").toLowerCase();
                      return name.includes(q) || cat.includes(q) || desc.includes(q);
                    })
                  : categoryMatched;

                const itemsPerPage = 6;
                const totalPages = Math.max(1, Math.ceil(prodCards.length / itemsPerPage));
                const validPage = Math.min(currentPage, totalPages);
                const startIndex = (validPage - 1) * itemsPerPage;
                const visibleCards = prodCards.slice(startIndex, startIndex + itemsPerPage);

                return (
                  <>
                    {/* Top Search Bar & Counter Pill Header */}
                    <div className="winera-products-search-bar-wrap" style={{
                      background: '#ffffff',
                      border: '1.5px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '18px',
                      padding: '10px 16px',
                      boxShadow: '0 4px 18px rgba(56, 189, 248, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}>
                      {/* Search Input Field with Lucide Icon */}
                      <div style={{
                        position: 'relative',
                        flex: '1 1 240px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Search style={{
                          position: 'absolute',
                          left: '12px',
                          width: '18px',
                          height: '18px',
                          color: '#0284c7',
                          pointerEvents: 'none'
                        }} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                          }}
                          placeholder={`Search ${activeCategory || 'VR games'} (e.g. UFO, Racing, 360, Flight)...`}
                          style={{
                            width: '100%',
                            padding: '10px 36px 10px 38px',
                            borderRadius: '12px',
                            border: '1px solid rgba(148, 163, 184, 0.3)',
                            background: '#f8fafc',
                            fontSize: '13.5px',
                            fontWeight: '500',
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                          }}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              setCurrentPage(1);
                            }}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              background: '#e2e8f0',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#475569',
                              padding: 0
                            }}
                            title="Clear search"
                          >
                            <X style={{ width: '12px', height: '12px' }} />
                          </button>
                        )}
                      </div>

                      {/* Filter Count Indicator */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        <span>Showing <strong style={{ color: '#0284c7' }}>{prodCards.length}</strong> {prodCards.length === 1 ? 'game' : 'games'}</span>
                      </div>
                    </div>

                    {/* Desktop Product Cards Grid */}
                    {prodCards.length === 0 ? (
                      <div style={{
                        gridColumn: '1 / -1',
                        background: 'linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)',
                        borderRadius: '24px',
                        padding: '45px 24px',
                        textAlign: 'center',
                        border: '1.5px dashed #7dd3fc',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        <Search style={{ width: '36px', height: '36px', color: '#38bdf8', margin: '0 auto 12px' }} />
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>
                          {searchQuery ? `No VR machines found matching "${searchQuery}"` : `Custom ${activeCategory} Machines Available`}
                        </h4>
                        <p style={{ fontSize: '13.5px', color: '#64748b', maxWidth: '460px', margin: '0 auto 18px', lineHeight: 1.6 }}>
                          {searchQuery ? `Try searching with another keyword or clear the search filter.` : `We manufacture and supply commercial-grade ${activeCategory} virtual reality machines customized for your space.`}
                        </p>
                        {searchQuery ? (
                          <button
                            onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                            style={{
                              background: '#38bdf8',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px 22px',
                              borderRadius: '12px',
                              fontWeight: '800',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >
                            Clear Search
                          </button>
                        ) : (
                          <a
                            href={`https://wa.me/919428989488?text=${encodeURIComponent(`Hello Winera International! I want to inquire about ${activeCategory} catalog and pricing.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#38bdf8',
                              color: '#ffffff',
                              padding: '11px 22px',
                              borderRadius: '12px',
                              fontSize: '14px',
                              fontWeight: '700',
                              textDecoration: 'none',
                              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)'
                            }}
                          >
                            Request Catalog on WhatsApp
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="winera-desktop-products-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px'
                      }}>
                        {visibleCards.map((card, idx) => {
                          const cardSlug = card.slug || (card.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <Link
                              key={card.id || idx}
                              to={`/product/${cardSlug}`}
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
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
                              className="winera-cta-btn-hover"
                            >
                              <div style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                borderRadius: '18px',
                                overflow: 'hidden',
                                marginBottom: '16px',
                                background: '#ffffff',
                                boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                                border: '4px solid #ffffff',
                                padding: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                              }}>
                                <WineraImage
                                  src={card.imageUrl || card.img}
                                  alt={card.name}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                  imgStyle={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                  }}
                                />
                              </div>

                              <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '700',
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

                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: '#0284c7',
                                fontWeight: '700',
                                marginTop: 'auto'
                              }}>
                                <span>View Specifications</span>
                                <ArrowRight style={{ width: '13px', height: '13px' }} />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Dynamic Pagination Toolbar (Centered across full section width 1:1 matching Arcade Games) */}
          {(() => {
            const masterCards = Array.isArray(allVrGames?.cards) ? allVrGames.cards : [];
            const isAllCategory = !activeCategory || activeCategory === "All VR Games" || activeCategory === "All";
            const categoryMatched = isAllCategory
              ? masterCards
              : masterCards.filter(c => {
                  const cat = (c.category || c.tag || "").toLowerCase().trim();
                  const target = activeCategory.toLowerCase().trim();
                  return cat === target || cat.includes(target) || target.includes(cat);
                });

            const filteredCards = searchQuery.trim()
              ? categoryMatched.filter(c => {
                  const q = searchQuery.toLowerCase().trim();
                  const name = (c.name || c.title || "").toLowerCase();
                  const cat = (c.category || c.tag || "").toLowerCase();
                  const desc = (c.desc || "").toLowerCase();
                  return name.includes(q) || cat.includes(q) || desc.includes(q);
                })
              : categoryMatched;

            const itemsPerPage = 6;
            const totalPages = Math.max(1, Math.ceil(filteredCards.length / itemsPerPage));
            const validPage = Math.min(currentPage, totalPages);

            if (totalPages <= 1) return null;

            const getPaginationRange = (curr, total) => {
              if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
              if (curr <= 4) return [1, 2, 3, 4, 5, '...', total];
              if (curr >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
              return [1, '...', curr - 1, curr, curr + 1, '...', total];
            };

            const pageRange = getPaginationRange(validPage, totalPages);

            return (
              <div className="winera-desktop-pagination" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '32px' }}>
                <div style={{
                  background: 'rgba(224, 242, 254, 0.65)',
                  border: '1.5px solid #7dd3fc',
                  borderRadius: '16px',
                  padding: '6px 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'none'
                }}>
                  <button
                    aria-label="Previous Page"
                    onClick={() => {
                      if (validPage > 1) {
                        setCurrentPage(validPage - 1);
                        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={validPage <= 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: validPage <= 1 ? '#cbd5e1' : '#475569',
                      cursor: validPage <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                  >
                    <ChevronLeft style={{ width: '18px', height: '18px' }} />
                  </button>

                  {pageRange.map((item, idx) => {
                    if (item === '...') {
                      return (
                        <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: '#94a3b8', fontWeight: 'bold' }}>
                          ...
                        </span>
                      );
                    }
                    const pageNum = item;
                    const isActive = pageNum === validPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '12px',
                          background: isActive ? '#38bdf8' : 'transparent',
                          color: isActive ? '#ffffff' : '#475569',
                          fontSize: '14.5px',
                          fontWeight: isActive ? '800' : '600',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    aria-label="Next Page"
                    onClick={() => {
                      if (validPage < totalPages) {
                        setCurrentPage(validPage + 1);
                        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={validPage >= totalPages}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: validPage >= totalPages ? '#cbd5e1' : '#475569',
                      cursor: validPage >= totalPages ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                  >
                    <ChevronRight style={{ width: '18px', height: '18px' }} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* RICH SPECIFICATIONS MODAL FOR VR PRODUCTS */}
      {selectedSpecsProduct && (
        <div
          onClick={() => setSelectedSpecsProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              maxWidth: '860px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              padding: '32px'
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedSpecsProduct(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                background: '#f8fafc',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '28px',
              alignItems: 'start'
            }} className="winera-vr-modal-grid">
              {/* Left Column: Big Image & Thumbnails */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '20px',
                  background: 'linear-gradient(180deg, #bae6fd 0%, #ffffff 100%)',
                  border: '2px solid #e0f2fe',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(56, 189, 248, 0.12)'
                }}>
                  <WineraImage
                    src={(selectedSpecsProduct.gallery && selectedSpecsProduct.gallery[selectedModalImageIdx]) || selectedSpecsProduct.imageUrl || selectedSpecsProduct.img}
                    alt={selectedSpecsProduct.name}
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    imgStyle={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Thumbnails Gallery */}
                {Array.isArray(selectedSpecsProduct.gallery) && selectedSpecsProduct.gallery.length > 1 && (
                  <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {selectedSpecsProduct.gallery.map((gImg, gIdx) => (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setSelectedModalImageIdx(gIdx)}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          border: selectedModalImageIdx === gIdx ? '2.5px solid #38bdf8' : '1.5px solid #e2e8f0',
                          padding: '4px',
                          background: '#ffffff',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        <img src={gImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Title, Category, Specs List, CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div>
                  <span style={{
                    display: 'inline-block',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontSize: '12px',
                    fontWeight: '800',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    {selectedSpecsProduct.category}
                  </span>
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: '900',
                    color: '#0f172a',
                    margin: '0 0 6px 0',
                    lineHeight: 1.2
                  }}>
                    {selectedSpecsProduct.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {selectedSpecsProduct.tagline}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Machine Specifications
                  </h4>

                  {selectedSpecsProduct.dimensions && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Dimensions</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.dimensions}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.power && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Power</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.power}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.weight && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Weight</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.weight}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.maxLoad && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Max Load</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.maxLoad}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.players && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Players</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.players}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.games && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Games Library</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.games}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.helmet && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>VR Headset</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.helmet}</strong>
                    </div>
                  )}

                  {selectedSpecsProduct.voltage && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#64748b', fontWeight: '600' }}>Voltage</span>
                      <strong style={{ color: '#0f172a', textAlign: 'right' }}>{selectedSpecsProduct.voltage}</strong>
                    </div>
                  )}
                </div>

                {/* WhatsApp Quote Button */}
                <a
                  href={`https://wa.me/919428989488?text=${encodeURIComponent(`Hello Winera International! I want to inquire about the quote and specifications for "${selectedSpecsProduct.name}" (${selectedSpecsProduct.category}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#22c55e',
                    color: '#ffffff',
                    padding: '14px 24px',
                    borderRadius: '16px',
                    fontSize: '15px',
                    fontWeight: '800',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(34, 197, 94, 0.35)',
                    transition: 'all 0.2s ease',
                    marginTop: '4px'
                  }}
                >
                  <MessageCircle style={{ width: '18px', height: '18px' }} />
                  <span>Get Best Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. COMMERCIAL-GRADE QUALITY AND RELIABILITY SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-vr-reliability-section" style={{ padding: '90px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
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
                className="winera-yellow-stroke"
                style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
              />
              <h2 style={{
                fontSize: '35px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px',
                width: '100%',
                maxWidth: '100%'
              }}>
                {renderTitleMarkup(siteData?.vrReliability?.title, "*Commercial-Grade Quality*<br/>and Reliability", '#38bdf8')}
              </h2>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', width: '100%', maxWidth: '100%' }}>
              {siteData?.vrReliability?.mainP || "Most VR machines look impressive in a showroom. What matters for your venue is how they perform after six months of daily public use. Every unit we supply is built specifically for commercial cycling not consumer hardware repackaged for public environments. The difference shows up in your maintenance bills, not the spec sheet."}
            </p>

            {/* Checkmark Feature Blocks as FAQ Accordion on Mobile */}
            <div className="winera-vr-reliability-features-list" style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  title: siteData?.vrReliability?.f1Title || "Right Machine for Every Venue Type",
                  desc: siteData?.vrReliability?.f1Desc || "A 5-player group ride suits a high-footfall mall. A solo seated simulator suits a hotel lobby. Getting this match wrong is the most common reason VR zones underperform. We assess your space, footfall, and visitors before recommending anything — not from a catalogue."
                },
                {
                  title: siteData?.vrReliability?.f2Title || "End-to-End Support and Service",
                  desc: siteData?.vrReliability?.f2Desc || "The same team that recommends your machine mix sources it, installs it, and supports it after handover. No separate vendors, no subcontractors, no waiting on overseas manufacturers. When something needs attention, one call reaches the right person."
                }
              ].map((feat, fIdx) => {
                const isOpen = openReliabilityIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className={`winera-vr-reliability-faq-item ${isOpen ? 'is-open' : ''}`}
                    onClick={() => setOpenReliabilityIndex(prev => prev === fIdx ? -1 : fIdx)}
                  >
                    <div className="winera-vr-reliability-faq-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#38bdf8', fontSize: '18px', fontWeight: '900' }}>✓</span>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {feat.title}
                        </h3>
                      </div>
                      <div className="winera-vr-reliability-faq-toggle">
                        {isOpen ? <Minus style={{ width: '15px', height: '15px' }} /> : <Plus style={{ width: '15px', height: '15px' }} />}
                      </div>
                    </div>
                    <div className={`winera-vr-reliability-faq-body ${isOpen ? 'is-open' : ''}`}>
                      <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Direct Image Asset */}
          <div className="winera-vr-reliability-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '35px' }}>
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
        padding: '50px 4vw 50px',
        background: `url(${siteData?.vrEarn?.bgUrl || vrRoiFrame}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-vr-earn-card" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          background: 'transparent',
          padding: '0',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          alignItems: 'center',
          overflow: 'hidden',
          boxShadow: 'none',
          minHeight: '365px'
        }}>
          {/* Left Content Column */}
          <div className="winera-vr-earn-text" style={{ padding: '24px 30px 24px 40px', textAlign: 'left', zIndex: 3 }}>
            <div style={{ position: 'relative', display: 'block', marginBottom: '12px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                className="winera-yellow-stroke"
                style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
              />
              <h2 style={{
                fontSize: '35px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px',
                width: '100%',
                maxWidth: '100%'
              }}>
                {renderTitleMarkup(
                  siteData?.vrEarn?.title || (siteData?.vrEarn?.titleLine1 ? `${siteData.vrEarn.titleLine1}<br/>${siteData.vrEarn.titleLine2 || ''}` : null),
                  "What Will Your VR Gaming<br/>*Zone Actually Earn?*",
                  '#38bdf8'
                )}
              </h2>
            </div>

            <div style={{ marginBottom: '16px', width: '100%', maxWidth: '100%' }}>
              <MobileExpandableText
                preview={
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.55, fontWeight: '500', margin: '0 0 6px 0' }}>
                    {siteData?.vrEarn?.p1 || "Most VR machine suppliers in India quote a price and leave the financial decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any order, our team prepares a complete ROI report for your specific venue covering machine cost, projected daily sessions, estimated revenue per player, maintenance costs, and break-even timeline."}
                  </p>
                }
                expandedContent={
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.55, fontWeight: '500', margin: '6px 0 0 0' }}>
                    {siteData?.vrEarn?.p2 || "Every figure is calculated around your venue type, footfall, and machine selection, not an industry average pulled from a brochure. Very few VR gaming suppliers in India include this as a standard part of their process. For Winera, it is where every project starts"}
                  </p>
                }
              />
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
            height: 'auto',
            minHeight: '365px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <img
              src={getValidImageUrl(siteData?.vrEarn?.imgUrl, vrGameImg)}
              alt="VR Gaming Zone ROI Player"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                marginLeft: '33px'
              }}
            />
            {/* Yellow Wave Accent Stroke sitting along the curve */}
            <img
              src={vrGameCurveImg}
              alt=""
              style={{
                position: 'absolute',
                left: '2px',
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
              className="winera-yellow-stroke"
              style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-vr-whyus-h2" style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
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
                  <div className="winera-vr-whyus-desktop-container" style={{ position: 'relative' }}>
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
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0' }}>
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
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0' }}>
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
        siteData={siteData}
        projects={siteData?.builtProjects}
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
        contentBoxPadding="50px 0px"
        blurBg={true}
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="clamp(24px, 2.8vw, 38px)"
        subtitleFontSize="20px"
        subtitleFontWeight="400"
        bgUrl={
          siteData?.vrCta?.bgUrl &&
            !siteData.vrCta.bgUrl.includes('cta-consultations') &&
            !siteData.vrCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.vrCta.bgUrl, ctaMainBanner)
            : null
        }
        bg={ctaMainBanner}
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
            : "Need Any Consultations?"
        }
        subtitle={
          siteData?.vrCta?.subtitle || siteData?.vrCta?.whiteText
            ? siteData?.vrCta?.subtitle || siteData?.vrCta?.whiteText
            : "We're Ready To Give Answers To <br/>Your Questions."
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
