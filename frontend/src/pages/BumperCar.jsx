import React from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import ctaSoftplayBg from '../assets/cta-softplay-bg.webp';
import bumpercarHeroBg from '../assets/bumpercar-hero-bg.webp';
import bumpercarCollageFrame from '../assets/bumpercar-collage-frame.webp';
import bumpercar3dNeon from '../assets/bumpercar-3d-neon.webp';
import bumpercarSpecsBg from '../assets/bumpercar-specs-bg.jpg';
import bumpercarOptionsBg from '../assets/bumpercar-options-bg.webp';
import bumpercarOptionsCollage from '../assets/bumpercar-options-collage.jpg';
import bumpercarInvestmentCollage from '../assets/bumpercar-investment-collage.webp';
import bumpercarCtaBannerBg from '../assets/bumpercar-cta-banner-bg.webp';
import amusementParkCtaBg from '../assets/cta-consultations-banner.webp';
import bumperCarCtaLeft from '../assets/bumperCar-cta-left.png';
import bumperCarCtaRight from '../assets/bumperCar-cta-right.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#ffcd00') => {
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

export default function BumperCar({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Bumper Car...</div>;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.bumpercarSeo?.pageTitle || siteData?.bumperSeo?.pageTitle || "Bumper Car Manufacturer in India | Winera International";
    const metaDesc = siteData?.bumpercarSeo?.metaDescription || siteData?.bumperSeo?.metaDescription || "As a leading bumper car manufacturer in India, Winera International builds safe, durable, and thrilling bumper cars for amusement parks and FEC centers.";

    document.title = pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [siteData]);

  const { header, footer } = siteData;
  const heroBgImage = getValidImageUrl(siteData?.bumpercarHero?.bgUrl, bumpercarHeroBg);
  const [activeThrillIndex, setActiveThrillIndex] = React.useState(0);

  const defaultThrillCards = [
    {
      title: siteData?.bumpercarThrill?.title || "The Perfect Blend Of Thrill And Safety:",
      desc: siteData?.bumpercarThrill?.desc || "Bumper Cars Have Long Held A Special Place In The Hearts Of Amusement Park Enthusiasts, And At Winera International, We Take Immense Pride In Delivering High-Quality Options That Enhance The Overall Park Experience. As A Leading Bumper Car Manufacturer In India And Trusted Bumper Car Manufacturer, Our Creations Are Not Just Rides; They're An Exhilarating Blend Of Thrilling Collisions And Smooth Handling, Designed With A Laser Focus On Safety And Durability."
    }
  ];

  const thrillCards = (Array.isArray(siteData?.bumpercarThrill?.cards) && siteData.bumpercarThrill.cards.length > 0)
    ? siteData.bumpercarThrill.cards
    : defaultThrillCards;

  const currentThrillCard = thrillCards[activeThrillIndex % thrillCards.length] || thrillCards[0];
  const progressPercent = Math.round(((activeThrillIndex + 1) / thrillCards.length) * 100);

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. BUMPER CAR HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-bumpercar-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '165px',
        paddingBottom: '75px',
        background: `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › Bumper Car */}
          <h1 className="winera-bumpercar-hero-h1" style={{
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
              {siteData?.bumpercarHero?.breadcrumbText || "Bumper Car"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. BUMPER CAR MANUFACTURER IN INDIA SECTION */}
      <section className="winera-bumpercar-supplier-section" style={{ padding: '90px 4vw 20px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-bumpercar-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '70px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-bumpercar-supplier-text">
            {/* Section Title Header */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.bumpercarIntro?.title, "*Bumper Car*<br/>Manufacturer in India", '#38bdf8')}
              </h2>
            </div>

            {/* Subtitle Description Paragraph */}
            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.bumpercarIntro?.desc || "India's ROI-first bumper car manufacturer — electric floor and battery-operated cars, installed by our own team across 50+ cities, with a free ROI report before you invest."}
            </p>

            {/* Action Button: Get Quote From Expert */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.bumpercarIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.bumpercarIntro?.waMessage || "Hello Winera International! I want to get a quote and details for Bumper Car setup. Please share details. [Ref: Bumper Car Page]";
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
                    className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                  >
                    {siteData?.bumpercarIntro?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Collage Graphic Container */}
          <div className="winera-bumpercar-supplier-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.bumpercarIntro?.mainImgUrl || bumpercarCollageFrame}
              alt="Bumper Car Manufacturer in India"
              fetchpriority="high"
              decoding="async"
              width={560}
              height={380}
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                aspectRatio: '560 / 380',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. BUMPER CAR MANUFACTURER IN INDIA FULL BANNER SECTION */}
      <section className="winera-bumpercar-intro-section" style={{ padding: '10px 4vw 80px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-bumpercar-intro-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '70% 20%',
          columnGap: '10%',
          alignItems: 'center'
        }}>
          {/* 70% Left Area: Left-Aligned Heading & Sub Text */}
          <div className="winera-bumpercar-intro-text">
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.15,
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              {renderTitleMarkup(siteData?.bumpercarBanner?.title, "*Bumper Car* Manufacturer in India", '#38bdf8')}
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#475569',
              lineHeight: 1.8,
              fontWeight: '500',
              margin: 0,
              textAlign: 'left'
            }}>
              {siteData?.bumpercarBanner?.desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading Bumper Car manufacturer in India and trusted Bumper Car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability."}
            </p>
          </div>

          {/* 20% Right Area: 3D Neon Bumper Car Image */}
          <div className="winera-bumpercar-intro-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.bumpercarBanner?.imgUrl || bumpercar3dNeon}
              alt="Bumper Car 2026"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. THE PERFECT BLEND OF THRILL AND SAFETY SLIDER CARD (FIGMA 1:1 GRADIENT SHADE & BADGE) */}
      <section className="winera-bumpercar-thrill-section" style={{ padding: '30px 4vw 50px', background: '#F5F5F9' }}>
        <div className="winera-bumpercar-thrill-card" style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: 'linear-gradient(180deg, #c7ecff 0%, #e8f7ff 35%, #ffffff 100%)',
          borderRadius: '26px',
          padding: '38px 48px 30px',
          boxShadow: '0 20px 45px rgba(56, 189, 248, 0.12)',
          border: '1.5px solid #b0e2fd',
          textAlign: 'center',
          transition: 'all 0.4s ease'
        }}>
          {/* Top Title with Cyan Shield Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#b0e2fd',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck style={{ width: '24px', height: '24px' }} />
            </div>
            <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              {currentThrillCard.title || "The Perfect Blend Of Thrill And Safety:"}
            </h3>
          </div>

          {/* Subtitle Description */}
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontWeight: '500', marginBottom: '28px', minHeight: '65px' }}>
            {currentThrillCard.desc}
          </p>

          {/* Dynamic Progress Indicator Bar */}
          <div style={{
            width: '100%',
            height: '4px',
            background: '#e0f2fe',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: '#38bdf8',
              borderRadius: '10px',
              transition: 'width 0.4s ease'
            }}></div>
          </div>

          {/* Interactive Arrow Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', alignItems: 'center' }}>
            <button
              onClick={() => setActiveThrillIndex((prev) => (prev > 0 ? prev - 1 : thrillCards.length - 1))}
              aria-label="Previous Thrill Option"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1.5px solid #38bdf8',
                background: '#ffffff',
                color: '#38bdf8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft style={{ width: '18px', height: '18px' }} />
            </button>
            <button
              onClick={() => setActiveThrillIndex((prev) => (prev < thrillCards.length - 1 ? prev + 1 : 0))}
              aria-label="Next Thrill Option"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1.5px solid #38bdf8',
                background: '#ffffff',
                color: '#38bdf8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight style={{ width: '18px', height: '18px' }} />
            </button>
            {thrillCards.length > 1 && (
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284c7', marginLeft: '6px' }}>
                {activeThrillIndex + 1} / {thrillCards.length}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL SPECIFICATIONS CARD SECTION */}
      <section className="winera-bumpercar-specs-section" style={{ padding: '20px 4vw 90px', background: '#F5F5F9' }}>
        <div className="winera-bumpercar-specs-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '40px',
          overflow: 'hidden',
          background: `url(${siteData?.bumpercarSpecs?.bgUrl || bumpercarSpecsBg}) center/cover no-repeat`,
          boxShadow: '0 25px 50px rgba(6, 19, 45, 0.3)',
          padding: '60px 60px 50px',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Top Title: Technical Specifications */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '35px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '300px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.1, margin: 0 }}>
              {renderTitleMarkup(siteData?.bumpercarSpecs?.title, "*Technical* Specifications", "#ffcd00")}
            </h2>
          </div>

          {/* Center Table Card with White Background, Yellow Border & Rounded Corners (FIGMA 1:1) */}
          <div className="winera-bumpercar-specs-table-card" style={{
            width: '100%',
            maxWidth: '540px',
            boxSizing: 'border-box',
            background: '#ffffff',
            borderRadius: '26px',
            border: '2px solid #ffcd00',
            padding: '28px 36px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25)',
            marginBottom: '35px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ paddingBottom: '14px', fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', width: '45%' }}>Specification</th>
                  <th style={{ paddingBottom: '14px', fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.bumpercarSpecs?.specsList) && siteData.bumpercarSpecs.specsList.length > 0
                  ? siteData.bumpercarSpecs.specsList
                  : defaultBumperCarSpecs
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 8px 12px 0', fontWeight: '500', color: '#334155', fontSize: '13.5px', wordBreak: 'break-word' }}>{row.spec}</td>
                    <td style={{ padding: '12px 0', fontWeight: '500', color: '#334155', fontSize: '13.5px', wordBreak: 'break-word' }}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Button: Download Our Brochure with Yellow Offset Tab Backdrop Wrapper */}
          <div>
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.bumpercarSpecs?.brochureUrl || siteData?.softplayTypes?.brochureUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {siteData?.bumpercarSpecs?.btnText || "Download Our Brochure"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDOOR BUMPER CAR OPTIONS FOR YOUR VENUE SECTION */}
      <section className="winera-bumpercar-options-section" style={{
        width: '100%',
        padding: '80px 4vw 90px',
        background: `url(${siteData?.bumpercarOptions?.bgUrl || bumpercarOptionsBg}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-bumpercar-options-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Column: Heading, Intro, and 2 Option Cards */}
          <div className="winera-bumpercar-options-text">
            {/* Title */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.bumpercarOptions?.title, "Indoor Bumper Car Options *for Your Venue*", '#38bdf8')}
              </h2>
            </div>

            {/* Intro Description */}
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.bumpercarOptions?.desc || "We supply two drive types for indoor bumper car attractions. The right choice depends on your floor infrastructure, venue flexibility, and operational model."}
            </p>

            {/* Option 1: Electric Floor Bumper Cars (Contact Us Style with top-left cyan accent wing) */}
            <div style={{ position: 'relative', width: '100%', marginBottom: '28px' }}>
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '250px',
                height: '115px',
                background: '#38bdf8',
                borderRadius: '14px',
                clipPath: 'polygon(0 0, 105% 11px, 100% 100%, 10px 100%)',
                zIndex: 1
              }}></div>

              <div style={{
                position: 'relative',
                zIndex: 2,
                background: '#e0f2fe',
                border: '2px solid #38bdf8',
                borderRadius: '16px',
                padding: '24px 28px',
                boxShadow: 'none',
                textAlign: 'left'
              }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                  {siteData?.bumpercarOptions?.option1Title || "Electric Floor Bumper Cars"}
                </h4>
                <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                  {siteData?.bumpercarOptions?.option1Desc || "Powered through a conductive floor grid and ceiling contact system. Delivers consistent, uninterrupted power throughout operating hours with zero battery management. Best suited for permanent, fixed installations in amusement parks, large FECs, and dedicated entertainment venues where the infrastructure investment is justified by high daily footfall."}
                </p>
              </div>
            </div>

            {/* Option 2: Battery-Operated Bumper Cars (Contact Us Style with top-left yellow accent wing) */}
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '250px',
                height: '115px',
                background: '#ffcd00',
                borderRadius: '15px',
                clipPath: 'polygon(0 0, 105% 11px, 100% 100%, 10px 100%)',
                zIndex: 1
              }}></div>

              <div style={{
                position: 'relative',
                zIndex: 2,
                background: '#fefce8',
                border: '2px solid #facc15',
                borderRadius: '16px',
                padding: '24px 28px',
                boxShadow: 'none',
                textAlign: 'left'
              }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                  {siteData?.bumpercarOptions?.option2Title || "Battery-Operated Bumper Cars"}
                </h4>
                <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                  {siteData?.bumpercarOptions?.option2Desc || "Self-contained rides running on rechargeable batteries — no floor grid or ceiling rig required. Ideal for malls, gaming zones, and temporary event setups where floor modification is not possible or where the operator wants the flexibility to relocate the attraction."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bumper Car Collage Graphic */}
          <div className="winera-bumpercar-options-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.bumpercarOptions?.imgUrl || bumpercarOptionsCollage}
              alt="Bumper Car Options Collage"
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

      {/* 8. QUICK COMPARISON TABLE SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-bumpercar-comparison-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.bumpercarComparison?.title, "*QUICK COMPARISON* TABLE", '#38bdf8')}
            </h2>
          </div>

          {/* Central Comparison Diagram Layout */}
          <div className="winera-bumpercar-comparison-desktop" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            position: 'relative',
            maxWidth: '1150px',
            margin: '0 auto'
          }}>
            {/* LEFT COLUMN: Electric Floor Points (Yellow Arc Curve Layout) */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', position: 'relative' }}>
              {/* Point Pills List arranged in an outward curve */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', zIndex: 3, marginRight: '-80px'}}>
                {(siteData?.bumpercarComparison?.electricPoints || defaultElectricPoints).map((pt, idx) => {
                  const curveOffsets = [0, 45, 90, 75, 40, 0];
                  const offsetRight = curveOffsets[idx] || 0;

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #fef08a 0%, #fde047 50%, #facc15 100%)',
                      borderRadius: '24px',
                      padding: '10px 12px 10px 16px',
                      boxShadow: '0 6px 16px rgba(250, 204, 21, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      justifyContent: 'flex-end',
                      marginRight: `${offsetRight}px`,
                      minHeight: '38px',
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a', textAlign: 'left', lineHeight: 1.3, marginRight: '14px' }}>
                        {pt.text && typeof pt.text === 'string'
                          ? pt.text.split(/<br\s*\/?>/i).map((line, lIdx) => (
                              <React.Fragment key={lIdx}>
                                {lIdx > 0 && <br />}
                                {line}
                              </React.Fragment>
                            ))
                          : pt.text}
                      </span>
                      <span style={{
                        width: '33px',
                        height: '31px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontSize: '11px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Central Yellow Dashed Circle Badge */}
              <div style={{
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
                marginLeft: '15px',
                marginRight: '8px',
                zIndex: 2,
                position: 'relative'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#ca8a04', lineHeight: 1.25, letterSpacing: '0.3px' }}>
                  BATTERY-<br />OPERATED
                </span>
              </div>

              {/* Big Outer Yellow Dotted Circle Graphic Centered on Inner Badge */}
              <div style={{
                position: 'absolute',
                right: '-80px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '275px',
                height: '275px',
                borderRadius: '50%',
                border: '2px dashed #fde047',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
            </div>

            {/* CENTER COLUMN: Features Pill Column (Gradient Pill Card with Pill Ends) */}
            <div style={{
              width: '270px',
              minHeight: '440px',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, #dcfce7 0%, #a7f3d0 25%, #7dd3fc 65%, #38bdf8 100%)',
              padding: '34px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(56, 189, 248, 0.2)',
              zIndex: 4,
              flexShrink: 0
            }}>
              {(siteData?.bumpercarComparison?.features || defaultComparisonFeatures).map((fText, idx) => (
                <div key={idx} style={{ fontSize: '14.5px', fontWeight: '800', color: '#0f172a' }}>
                  {fText}
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Battery Operated Points (Cyan/Blue Arc Curve Layout) */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start', position: 'relative' }}>
              {/* Central Blue Dashed Circle Badge */}
              <div style={{
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
                marginRight: '15px',
                marginLeft: '8px',
                zIndex: 2,
                position: 'relative'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', lineHeight: 1.25, letterSpacing: '0.3px'}}>
                  BATTERY-<br />OPERATED
                </span>
              </div>

              {/* Big Outer Cyan Dotted Circle Graphic Centered on Inner Badge */}
              <div style={{
                position: 'absolute',
                left: '-80px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '275px',
                height: '275px',
                borderRadius: '50%',
                border: '2px dashed #7dd3fc',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>

              {/* Point Pills List arranged in an outward curve */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', zIndex: 3, marginLeft: '-80px' }}>
                {(siteData?.bumpercarComparison?.batteryPoints || defaultBatteryPoints).map((pt, idx) => {
                  const curveOffsets = [0, 45, 90, 75, 40, 0];
                  const offsetLeft = curveOffsets[idx] || 0;

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0284c7 100%)',
                      borderRadius: '24px',
                      padding: '10px 16px 10px 12px',
                      boxShadow: '0 6px 16px rgba(56, 189, 248, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginLeft: `${offsetLeft}px`,
                      minHeight: '38px',
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        width: '33px',
                        height: '31px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0284c7',
                        fontSize: '11px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#ffffff', textAlign: 'left', lineHeight: 1.3, marginLeft: '14px' }}>
                        {pt.text && typeof pt.text === 'string'
                          ? pt.text.split(/<br\s*\/?>/i).map((line, lIdx) => (
                              <React.Fragment key={lIdx}>
                                {lIdx > 0 && <br />}
                                {line}
                              </React.Fragment>
                            ))
                          : pt.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Responsive Layout for Comparison */}
          <div className="winera-bumpercar-comparison-mobile" style={{ display: 'none', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 24px rgba(250, 204, 21, 0.15)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: '16px' }}>Electric Floor</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(siteData?.bumpercarComparison?.electricPoints || defaultElectricPoints).map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>✓</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{pt.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', borderRadius: '24px', padding: '24px', color: '#ffffff', boxShadow: '0 8px 24px rgba(56, 189, 248, 0.2)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', textAlign: 'center', marginBottom: '16px' }}>Battery-Operated</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(siteData?.bumpercarComparison?.batteryPoints || defaultBatteryPoints).map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>✓</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>{pt.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. IS A BUMPER CAR RIDE A SMART INVESTMENT FOR YOUR VENUE SECTION */}
      <section className="winera-bumpercar-investment-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-bumpercar-investment-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: 4-Grid Rounded Collage Artwork */}
          <div className="winera-bumpercar-investment-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.bumpercarInvestment?.imgUrl || bumpercarInvestmentCollage}
              alt="Bumper Car Investment Collage"
              style={{
                width: '100%',
                maxWidth: '520px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Column: Title, Subtitle, Bullet List, Footer note & WhatsApp Button */}
          <div className="winera-bumpercar-investment-text">
            {/* Yellow Top Brush Line & Title */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.7rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.bumpercarInvestment?.title, "Is a Bumper Car Ride a Smart *Investment for Your Venue?*", '#38bdf8')}
              </h2>
            </div>

            {/* Intro Paragraph 1 */}
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '16px' }}>
              {siteData?.bumpercarInvestment?.introText || "Most bumper car suppliers in India provide a catalogue price and leave the financial decision to you. As India's ROI-First Game Zone Partner, Winera International works differently."}
            </p>

            {/* Subheading intro line */}
            <p style={{ fontSize: '13.5px', color: '#1e293b', lineHeight: 1.6, fontWeight: '700', marginBottom: '18px' }}>
              {siteData?.bumpercarInvestment?.subtitleText || "Before confirming any bumper car ride setup, our team prepares a complete return-on-investment report specific to your venue. It covers:"}
            </p>

            {/* Cyan Chevron Bullet Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {(siteData?.bumpercarInvestment?.bullets || defaultInvestmentBullets).map((bText, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    color: '#38bdf8',
                    fontSize: '16px',
                    fontWeight: '900',
                    lineHeight: 1,
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    »
                  </div>
                  <span style={{ fontSize: '13.5px', color: '#334155', fontWeight: '600', lineHeight: 1.5 }}>
                    {bText}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Footnote Paragraph */}
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.bumpercarInvestment?.footerText || "Every figure is calculated around your actual floor size, daily footfall, and local entry pricing — not an industry average. This report is provided free, before you commit to anything."}
            </p>

            {/* Plan Your Game Zone Button matching Figma Screenshot 1:1 */}
            <div>
              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                {(() => {
                  const baseLink = siteData?.bumpercarInvestment?.btnLink || siteData?.header?.whatsAppUrl || "https://wa.me/919428989488";
                  const defaultMsg = siteData?.bumpercarInvestment?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Bumper Car setup & commercial ROI calculation. Please share details. [Ref: Bumper Car Page]";
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
                      className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      {/* Green Circular WhatsApp Icon Badge */}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#25d366',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </div>
                      <span>{siteData?.bumpercarInvestment?.btnText || "Plan Your Game Zone"}</span>
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE WINERA INTERNATIONAL SECTION */}
      <section className="winera-bumpercar-whyus-section" style={{ padding: '0px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.bumpercarWhyChoose?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* Cards Grid Container (Dynamic List with Thin Blue Dividers & Odd/Even Row Layout) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const cards = (Array.isArray(siteData?.bumpercarWhyChoose?.cardsList) && siteData.bumpercarWhyChoose.cardsList.length > 0)
                ? siteData.bumpercarWhyChoose.cardsList
                : (Array.isArray(siteData?.bumpercarWhyChoose?.topCards)
                  ? [...siteData.bumpercarWhyChoose.topCards, ...(siteData?.bumpercarWhyChoose?.bottomCards || [])]
                  : defaultWhyChooseCards);

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
                  <div className="winera-bumpercar-whyus-row winera-bumpercar-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    gap: '0px',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-bumpercar-whyus-card"
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
                          <div className="winera-bumpercar-whyus-divider" style={{
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
                            whyChooseIcons[cIdx % whyChooseIcons.length]
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
                    <div className="winera-bumpercar-whyus-divider" style={{
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
                    <div className="winera-bumpercar-whyus-row winera-bumpercar-whyus-bottom-row" style={{
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
                          className="winera-bumpercar-whyus-card"
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
                            <div className="winera-bumpercar-whyus-divider" style={{
                              position: 'absolute',
                              right: 0,
                              top: '-30px',
                              bottom: '20px',
                              width: '2px',
                              background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 100%)',
                              zIndex: 3
                            }}></div>
                          )}

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
                              whyChooseIcons[(topCards.length + bIdx) % whyChooseIcons.length]
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
        </div>
      </section>

      {/* 11. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Project</span></>}
        showBottomButton={true}
        buttonText="View All Projects"
      />

      {/* 12. WHAT OUR CLIENTS SAY SECTION (PERSISTED TESTIMONIALS DATA) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 13. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection sectionData={siteData?.bumpercarRelated || siteData?.softplayRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 14. FREQUENTLY ASKED QUESTIONS SECTION (DYNAMIC BUMPER CAR FAQS) */}
      <FaqSection
        faqList={Array.isArray(siteData?.bumpercarFaqs) && siteData.bumpercarFaqs.length > 0 ? siteData.bumpercarFaqs : defaultBumperCarFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 15. CTA BANNER SECTION (MATCHING FIGMA SPEC EXACTLY) */}
      <CtaBanner
        align="center"
        gradientTagline={true}
        gradientTitle={true}
        buttonTheme="yellow"
        subtitleFontSize="16px"
        bgUrl={siteData?.bumpercarCta?.bgUrl}
        bg={amusementParkCtaBg}
        leftImgUrl={siteData?.bumpercarCta?.leftImgUrl}
        leftImg={bumperCarCtaLeft}
        rightImgUrl={siteData?.bumpercarCta?.rightImgUrl}
        rightImg={bumperCarCtaRight}
        tagline={siteData?.bumpercarCta?.tagline || "GET IN TOUCH"}
        title={
          siteData?.bumpercarCta?.title
            ? siteData.bumpercarCta.title
            : "READY TO EXPLORE A BUMPER CAR<br/>ATTRACTION FOR YOUR VENUE?"
        }
        subtitle={
          siteData?.bumpercarCta?.subtitle || siteData?.bumpercarCta?.whiteText
            ? siteData?.bumpercarCta?.subtitle || siteData?.bumpercarCta?.whiteText
            : "We'll assess your space and send a free<br/>ROI report before you spend anything."
        }
        description={null}
        buttonText={siteData?.bumpercarCta?.buttonText || "Get a Quote From an Expert"}
        buttonLink={siteData?.bumpercarCta?.buttonLink || "https://wa.me/919428989488"}
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}

const defaultBumperCarSpecs = [
  { spec: "Drive Type", details: "Electric Grid / Battery Operated" },
  { spec: "Body Material", details: "High-density FRP / Polyethylene" },
  { spec: "Power Source", details: "48V DC / Ceiling Floor Grid" },
  { spec: "Frame", details: "Hot-dip galvanized steel chassis" },
  { spec: "Safety Ring", details: "Heavy-duty PVC / Rubber Bumper" },
  { spec: "Controls", details: "Dual pedal & steering wheel" },
  { spec: "Expected lifespan", details: "8-12 years" }
];

const defaultComparisonFeatures = [
  "Installation",
  "Power management",
  "Best for",
  "Relocation",
  "Setup cost",
  "Operating cost"
];

const defaultElectricPoints = [
  { text: "Conductive floor +<br/>ceiling grid" },
  { text: "None — continuous<br/>supply" },
  { text: "Permanent amusement<br/>parks, FECs" },
  { text: "Fixed installation" },
  { text: "Higher (floor<br/>infrastructure)" },
  { text: "Lower per session" }
];

const defaultBatteryPoints = [
  { text: "Flat surface only — no<br/>modification needed" },
  { text: "Recharge between<br/>sessions" },
  { text: "Malls, gaming zones,<br/>events" },
  { text: "Can be moved to new<br/>venues" },
  { text: "Lower initial<br/>investment" },
  { text: "Battery replacement<br/>over time" }
];

const defaultInvestmentBullets = [
  "Equipment and installation cost breakdown",
  "Projected daily and monthly rider capacity based on your floor size",
  "Estimated revenue per session at your pricing",
  "Annual maintenance cost estimate"
];

const defaultWhyChooseCards = [
  { title: "Free ROI Report Before You Invest", desc: "See Your Real Costs, Revenue, And Break-Even Before You Commit" },
  { title: "Own Installation Team", desc: "Our Own Team Install And Commission Every Project Across 50+ Cities" },
  { title: "Reliable After-Sales Support", desc: "We Stay On After Handover With Servicing And Maintenance So Your Setup Keeps Running." },
  { title: "Proven Track Record", desc: "Take A Look At What We've Built And Hear From The Venues We've Worked With." },
  { title: "Honest, Transparent Pricing", desc: "One Clear Quote Covering Everything, No Hidden Costs Added Later." }
];

const defaultBumperCarFaqs = [
  {
    question: "Where can I buy bumper cars in India?",
    answer: "Winera International manufactures and supplies electric floor and battery-operated bumper cars across India for amusement parks, malls, FECs, and gaming zones. We have completed installations in 50+ cities since 2014 and handle setup through our own engineering team."
  },
  {
    question: "What does the bumper car arena setup cost India?",
    answer: "Bumper car price in India depends on drive type, car count, arena size, and customisation. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before you confirm anything. Contact us for a venue-specific quote."
  },
  {
    question: "What is the difference between electric floor and battery-operated bumper cars?",
    answer: "Electric floor bumper cars are powered through a conductive floor grid and ceiling contact system; they run continuously without battery management and suit permanent amusement park installations. Battery-operated bumper cars need no floor modification and can be relocated, making them ideal for malls, gaming zones, and flexible setups."
  },
  {
    question: "Do bumper cars require special flooring?",
    answer: "Electric floor bumper cars require a conductive floor grid installation. Battery-operated bumper cars work on any flat surface with no floor modification needed. Our team assesses your existing floor and recommends the right type based on your infrastructure and venue goals."
  },
  {
    question: "How much floor area do I need for a bumper car attraction?",
    answer: "The minimum floor area required is 400 sq ft. A standard 6–8 car setup runs well in 500–700 sq ft. Larger venues with 12–15 cars typically use 1,000 sq ft or more. Our team calculates exact requirements based on your car count and traffic flow during the ROI planning stage."
  },
  {
    question: "What ROI can I expect from a bumper car ride?",
    answer: "ROI varies by venue size, daily footfall, session pricing, and operating hours. Winera prepares a free, venue-specific ROI report for every project covering projected rider capacity, estimated daily revenue, and break-even timeline — calculated against your actual floor size and local pricing, not a generic average."
  },
  {
    question: "Can bumper cars be used outdoors?",
    answer: "Our bumper cars are designed for indoor commercial use. Outdoor setups require a covered structure (shed or canopy) to protect the electrical components and floor systems from weather exposure. We advise on suitable outdoor setup configurations during the venue assessment."
  },
  {
    question: "What maintenance do bumper cars require?",
    answer: "Winera bumper cars are built for continuous commercial use with an expected lifespan of 8–12 years. Routine maintenance includes periodic inspection of bumpers, motors, and electrical contacts typically once or twice annually. Battery-operated models require regular battery health checks. We provide a maintenance schedule with every installation."
  },
  {
    question: "Why choose Winera International as your bumper car supplier in India?",
    answer: "Three reasons: first, we provide a free ROI report for your venue before you commit to any purchase. Second, our own engineering team installs and commissions every ride across 50+ cities in India with no third-party contractors. Third, as a direct manufacturer, you receive manufacturer pricing with no distributor markup."
  }
];

const whyChooseIcons = [
  // 1. Star / Target icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
  </svg>,
  // 2. Gear / Settings icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>,
  // 3. Database / Support icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>,
  // 4. Headset / Support icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>,
  // 5. Shield Check / Price icon
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
];
