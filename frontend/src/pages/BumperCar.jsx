import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import ctaSoftplayBg from '../assets/cta-softplay-bg.png';
import bumpercarHeroBg from '../assets/bumpercar-hero-bg.png';
import bumpercarCollageFrame from '../assets/bumpercar-collage-frame.png';
import bumpercar3dNeon from '../assets/bumpercar-3d-neon.png';
import bumpercarSpecsBg from '../assets/bumpercar-specs-bg.jpg';
import bumpercarOptionsBg from '../assets/bumpercar-options-bg.png';
import bumpercarOptionsCollage from '../assets/bumpercar-options-collage.png';
import bumpercarInvestmentCollage from '../assets/bumpercar-investment-collage.png';
import bumpercarCtaBannerBg from '../assets/bumpercar-cta-banner-bg.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';

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

export default function BumperCar({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Bumper Car...</div>;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.bumpercarSeo?.pageTitle || "Bumper Car Manufacturer in India | Electric & Battery Cars | Winera International";
    const metaDesc = siteData?.bumpercarSeo?.metaDescription || "As a leading Bumper Car Manufacturer in India, Winera International Pvt Ltd crafts exhilarating, safe, and durable bumper cars that are a favorite at amusement parks.";

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
  const heroBgImage = siteData?.bumpercarHero?.bgUrl || bumpercarHeroBg;
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

      {/* 2. BUMPER CAR HERO BANNER SECTION */}
      <section className="winera-bumpercar-hero-section" style={{
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
          {/* Main Title: Bumper Car */}
          <h1 className="winera-bumpercar-hero-h1" style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
            lineHeight: 1.15
          }}>
            {renderTitleMarkup(siteData?.bumpercarHero?.title, "*Bumper* Car")}
          </h1>

          {/* Breadcrumb Navigation: Home > Bumper Car */}
          <p className="winera-bumpercar-hero-breadcrumb" style={{
            fontSize: '15px',
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
            <span style={{ color: '#ffcd00' }}>{siteData?.bumpercarHero?.breadcrumbText || "Bumper Cars"}</span>
          </p>
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
            <a
              href={siteData?.bumpercarIntro?.buttonLink || "https://wa.me/919428989488"}
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
              {siteData?.bumpercarIntro?.buttonText || "Get Quote From Expert"}
            </a>
          </div>

          {/* Right Collage Graphic Container */}
          <div className="winera-bumpercar-supplier-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.bumpercarIntro?.mainImgUrl || bumpercarCollageFrame}
              alt="Bumper Car Manufacturer in India"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
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

      {/* 5. THE PERFECT BLEND OF THRILL AND SAFETY SLIDER CARD (DYNAMIC CAROUSEL) */}
      <section className="winera-bumpercar-thrill-section" style={{ padding: '20px 4vw 40px', background: '#F5F5F9' }}>
        <div className="winera-bumpercar-thrill-card" style={{
          maxWidth: '850px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.95) 0%, rgba(186, 230, 253, 0.95) 100%)',
          borderRadius: '30px',
          padding: '35px 45px 25px',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          transition: 'all 0.4s ease'
        }}>
          {/* Top Title with Check/Shield Icon */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#38bdf8',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '16px',
              flexShrink: 0
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              {currentThrillCard.title || "The Perfect Blend Of Thrill And Safety:"}
            </h3>
          </div>

          {/* Subtitle Description */}
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '24px', minHeight: '60px' }}>
            {currentThrillCard.desc}
          </p>

          {/* Dynamic Progress Indicator Bar */}
          <div style={{
            width: '100%',
            height: '5px',
            background: '#bae6fd',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: '#0284c7',
              borderRadius: '10px',
              transition: 'width 0.4s ease'
            }}></div>
          </div>

          {/* Interactive Arrow Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', alignItems: 'center' }}>
            <button
              onClick={() => setActiveThrillIndex((prev) => (prev > 0 ? prev - 1 : thrillCards.length - 1))}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid #0284c7',
                background: 'transparent',
                color: '#0284c7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              title="Previous Card"
            >
              &lt;
            </button>
            <button
              onClick={() => setActiveThrillIndex((prev) => (prev + 1) % thrillCards.length)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid #0284c7',
                background: 'transparent',
                color: '#0284c7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              title="Next Card"
            >
              &gt;
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

          {/* Center Table Card with White Background & Rounded Corners */}
          <div className="winera-bumpercar-specs-table-card" style={{
            maxWidth: '520px',
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px 28px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            marginBottom: '35px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ paddingBottom: '14px', fontSize: '18px', fontWeight: '900', color: '#0f172a', width: '42%' }}>Specification</th>
                  <th style={{ paddingBottom: '14px', fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.bumpercarSpecs?.specsList) && siteData.bumpercarSpecs.specsList.length > 0
                  ? siteData.bumpercarSpecs.specsList
                  : defaultBumperCarSpecs
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 0', fontWeight: '700', color: '#475569' }}>{row.spec}</td>
                    <td style={{ padding: '10px 0', fontWeight: '600', color: '#1e293b', fontSize: '12.5px' }}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Button: Download Our Brochure */}
          <div>
            <a
              href={siteData?.bumpercarSpecs?.brochureUrl || siteData?.softplayTypes?.brochureUrl || "#"}
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
              {siteData?.bumpercarSpecs?.btnText || "Download Our Brochure"}
            </a>
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

            {/* Option 1: Electric Floor Bumper Cars */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.85) 0%, rgba(186, 230, 253, 0.85) 100%)',
              border: '1.5px solid #38bdf8',
              borderRadius: '20px',
              padding: '20px 24px',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(56, 189, 248, 0.12)'
            }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
                {siteData?.bumpercarOptions?.option1Title || "Electric Floor Bumper Cars"}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.bumpercarOptions?.option1Desc || "Powered through a conductive floor grid and ceiling contact system. Delivers consistent, uninterrupted power throughout operating hours with zero battery management. Best suited for permanent, fixed installations in amusement parks, large FECs, and dedicated entertainment venues where the infrastructure investment is justified by high daily footfall."}
              </p>
            </div>

            {/* Option 2: Battery-Operated Bumper Cars */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(254, 249, 195, 0.85) 0%, rgba(253, 230, 138, 0.85) 100%)',
              border: '1.5px solid #facc15',
              borderRadius: '20px',
              padding: '20px 24px',
              boxShadow: '0 8px 20px rgba(250, 204, 21, 0.15)'
            }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
                {siteData?.bumpercarOptions?.option2Title || "Battery-Operated Bumper Cars"}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.bumpercarOptions?.option2Desc || "Self-contained rides running on rechargeable batteries — no floor grid or ceiling rig required. Ideal for malls, gaming zones, and temporary event setups where floor modification is not possible or where the operator wants the flexibility to relocate the attraction."}
              </p>
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
            gap: '10px',
            position: 'relative',
            maxWidth: '1150px',
            margin: '0 auto'
          }}>
            {/* LEFT COLUMN: Electric Floor Points (Yellow Arc Curve Layout) */}
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', position: 'relative' }}>
              {/* Point Pills List arranged in a outward curve */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', zIndex: 2 }}>
                {(siteData?.bumpercarComparison?.electricPoints || defaultElectricPoints).map((pt, idx) => {
                  // Calculate curve offset for 6 items: top/bottom pushed right, middle items pushed left
                  // idx 0 & 5: offset 80px right; idx 1 & 4: offset 30px right; idx 2 & 3: offset 0px
                  const curveOffsets = [0, 30, 80, 80, 30, 0];
                  const offsetRight = curveOffsets[idx] || 0;

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)',
                      borderRadius: '30px',
                      padding: '8px 14px 8px 18px',
                      boxShadow: '0 6px 16px rgba(250, 204, 21, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      maxWidth: '280px',
                      marginRight: `${offsetRight}px`,
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#0f172a', textAlign: 'right' }}>
                        {pt.text}
                      </span>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0f172a',
                        fontSize: '11px',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
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
                border: '2.5px dashed #facc15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px',
                flexShrink: 0,
                background: '#ffffff',
                boxShadow: '0 8px 20px rgba(250, 204, 21, 0.2)',
                marginLeft: '15px',
                zIndex: 1
              }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#ca8a04', lineHeight: 1.25 }}>
                  ELECTRIC<br />FLOOR
                </span>
              </div>
            </div>

            {/* CENTER COLUMN: Features Pill Column (Gradient Pill Card with Pill Ends) */}
            <div style={{
              width: '210px',
              borderRadius: '40px',
              background: 'linear-gradient(180deg, #dcfce7 0%, #7dd3fc 50%, #38bdf8 100%)',
              padding: '35px 15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '26px',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(56, 189, 248, 0.25)',
              zIndex: 3,
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
                border: '2.5px dashed #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8px',
                flexShrink: 0,
                background: '#ffffff',
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.2)',
                marginRight: '15px',
                zIndex: 1
              }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#0284c7', lineHeight: 1.25 }}>
                  BATTERY-<br />OPERATED
                </span>
              </div>

              {/* Point Pills List arranged in an outward curve */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', zIndex: 2 }}>
                {(siteData?.bumpercarComparison?.batteryPoints || defaultBatteryPoints).map((pt, idx) => {
                  // Calculate curve offset for 6 items: top/bottom pushed left, middle items pushed right
                  // idx 0 & 5: offset 80px left; idx 1 & 4: offset 30px left; idx 2 & 3: offset 0px
                  const curveOffsets = [0, 30, 80, 80, 30, 0];
                  const offsetLeft = curveOffsets[idx] || 0;

                  return (
                    <div key={idx} style={{
                      background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                      borderRadius: '30px',
                      padding: '8px 18px 8px 14px',
                      boxShadow: '0 6px 16px rgba(56, 189, 248, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      maxWidth: '280px',
                      color: '#ffffff',
                      marginLeft: `${offsetLeft}px`,
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        color: '#0284c7',
                        fontSize: '11px',
                        fontWeight: '900',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: '800', textAlign: 'left' }}>
                        {pt.text}
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

            {/* Plan Your Game Zone Button */}
            <div>
              <a
                href={siteData?.bumpercarInvestment?.btnLink || siteData?.header?.whatsAppUrl || "https://wa.me/919999999999"}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#38bdf8',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '900',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  border: '3px solid #ffcd00',
                  boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001L2 22l5.148-1.348a9.94 9.94 0 0 0 4.862 1.258h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.668-1.039-5.176-2.927-7.062A9.917 9.917 0 0 0 12.012 2zm5.82 14.167c-.244.688-1.42 1.312-1.961 1.393-.505.074-1.155.135-3.69-.912-3.242-1.341-5.321-4.636-5.48-4.85-.16-.214-1.3-1.733-1.3-3.305 0-1.572.822-2.345 1.115-2.665.292-.32.639-.4.852-.4.213 0 .426.002.613.01.198.008.463-.075.725.553.268.643.914 2.235.993 2.396.08.16.133.348.027.561-.107.214-.16.348-.32.534-.16.187-.336.417-.48.561-.16.16-.327.333-.14.654.186.32.826 1.365 1.774 2.21 1.218 1.085 2.247 1.42 2.568 1.58.32.16.507.133.693-.08.187-.214.799-.934 1.012-1.255.213-.32.427-.267.72-.16.293.107 1.865.881 2.185 1.04.32.16.533.24.613.374.08.133.08.773-.164 1.461z" />
                </svg>
                {siteData?.bumpercarInvestment?.btnText || "Plan Your Game Zone"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE WINERA INTERNATIONAL SECTION */}
      <section className="winera-bumpercar-whyus-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
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
                <>
                  {/* TOP ROW */}
                  <div className="winera-bumpercar-whyus-row winera-bumpercar-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    borderBottom: bottomCards.length > 0 ? '1.5px solid #bae6fd' : 'none',
                    paddingBottom: bottomCards.length > 0 ? '40px' : '0'
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-bumpercar-whyus-card"
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
                            whyChooseIcons[cIdx % whyChooseIcons.length]
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
                    <div className="winera-bumpercar-whyus-row winera-bumpercar-whyus-bottom-row" style={{
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
                          className="winera-bumpercar-whyus-card"
                          style={{
                            padding: '0 35px',
                            textAlign: 'center',
                            borderRight: bIdx === bottomCards.length - 1 ? 'none' : '1.5px solid #bae6fd',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
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
                              whyChooseIcons[(topCount + bIdx) % whyChooseIcons.length]
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
        </div>
      </section>

      {/* 11. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Project</span></>}
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

      {/* 15. CTA BANNER SECTION (MATCHING BOWLING ALLEY PAGE 1:1) */}
      <CtaBanner
        align="center"
        bgUrl={siteData?.bumpercarCta?.bgUrl}
        bg={bumpercarCtaBannerBg || ctaSoftplayBg}
        subtitle={siteData?.bumpercarCta?.whiteText || siteData?.bumpercarCta?.subtitle || "Get in touch with India's trusted bumper car equipment manufacturer for a free 3D layout design, complete ROI report, and project quote tailored to your venue."}
        title={
          <>
            <span style={{ color: '#ffcd00' }}>{siteData?.bumpercarCta?.yellowText ?? "NEED ANY"}</span> <span style={{ color: '#ffffff' }}>{siteData?.bumpercarCta?.cyanText ?? "BUMPER CAR CONSULTATIONS ?"}</span>
          </>
        }
        buttonText={siteData?.bumpercarCta?.buttonText ?? "Get Quote Now"}
        buttonLink={siteData?.bumpercarCta?.buttonLink ?? "https://wa.me/919428989488"}
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
  { text: "Conductive floor + ceiling grid" },
  { text: "None — continuous supply" },
  { text: "Permanent amusement parks, FECs" },
  { text: "Fixed installation" },
  { text: "Higher (floor infrastructure)" },
  { text: "Lower per session" }
];

const defaultBatteryPoints = [
  { text: "Flat surface only — no modification needed" },
  { text: "Recharge between sessions" },
  { text: "Malls, gaming zones, events" },
  { text: "Can be moved to new venues" },
  { text: "Lower initial investment" },
  { text: "Battery replacement over time" }
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
    question: "What is the difference between electric floor and battery-operated bumper cars?",
    answer: "Electric floor grid bumper cars draw continuous power from a conductive floor and ceiling contact rig, ideal for high-throughput fixed venues. Battery-operated bumper cars run on rechargeable batteries, requiring no specialized floor modifications, making them perfect for malls, gaming zones, and flexible setups."
  },
  {
    question: "What minimum space is required for an indoor bumper car arena?",
    answer: "A standard indoor bumper car arena typically requires between 800 sq ft to 3,000+ sq ft depending on the number of bumper cars operating simultaneously and safety perimeter fencing."
  },
  {
    question: "Do you offer installation and commissioning services across India?",
    answer: "Yes! Winera International has its own in-house installation team that conducts complete site preparation, grid setup, testing, and commissioning in 50+ cities across India."
  },
  {
    question: "Can we receive a free ROI projection report before ordering?",
    answer: "Absolutely. Before finalizing any purchase, our experts provide a free custom ROI report detailing equipment breakdown, rider capacity, revenue projections, and payback timelines specific to your venue."
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
