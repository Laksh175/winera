import React, { useEffect } from 'react';
import { Award, Settings, Coins, Headphones, CalendarCheck, Package } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import hypergridHeroBg from '../assets/hypergrid-hero-bg.webp';
import hypergridSupplierCollage from '../assets/hypergrid-supplier-collage.webp';
import hypergridBannerImg from '../assets/hypergrid-banner-img.webp';
import hypergridSpecsBg from '../assets/hypergrid-specs-bg.webp';
import hypergridWhyUsBg from '../assets/hypergrid-why-us-bg.webp';
import hypergridWhyUsLeft from '../assets/hypergrid-why-us-left.webp';
import hypergridImage from '../assets/hypergrid-image.webp';
import hypergridWineraLastblock from '../assets/hypergrid-winera-lastblock.webp';
import leftTiltedCard from '../assets/Left Tilted Card.webp';
import rightTiltedCard from '../assets/Right Tilted Card.webp';
import arImage from '../assets/AR-image.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import downloadButtonImg from '../assets/download-button.png';
import talkToRoiButtonImg from '../assets/talk-to-roi-button.png';
import homePageIcon from '../assets/home-page-icon.png';

const defaultHypergridWhyWineraItems = [
  {
    icon: 'award',
    title: "Commercial-Grade Equipment",
    desc: "Made To Run Every Day In Busy Places Without Breaking Down."
  },
  {
    icon: 'settings',
    title: "Customized For Your Venue",
    desc: "We Set Up The Games, Levels, And Branding To Fit Your Space."
  },
  {
    icon: 'coins',
    title: "ROI Planning Before You Invest",
    desc: "We Show You The Cost And Profit Before You Spend Any Money."
  },
  {
    icon: 'headphones',
    title: "Professional Installation",
    desc: "Our Own Team Comes And Sets Everything Up For You."
  },
  {
    icon: 'calendar',
    title: "Operator Training Included",
    desc: "We Train Your Staff So They're Ready Before You Open."
  },
  {
    icon: 'package',
    title: "Reliable After-Sales Support",
    desc: "We Fix, Update, And Service It Whenever You Need Help."
  }
];

const renderWhyWineraIcon = (iconName, idx) => {
  switch (iconName) {
    case 'award':
    case 'shield':
      return <Award style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    case 'settings':
    case 'custom':
      return <Settings style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    case 'coins':
    case 'roi':
      return <Coins style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    case 'headphones':
    case 'installation':
      return <Headphones style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    case 'calendar':
    case 'training':
      return <CalendarCheck style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    case 'package':
    case 'support':
      return <Package style={{ width: '26px', height: '26px', color: '#ffffff' }} />;
    default:
      const defaultIcons = [
        <Award style={{ width: '26px', height: '26px', color: '#ffffff' }} />,
        <Settings style={{ width: '26px', height: '26px', color: '#ffffff' }} />,
        <Coins style={{ width: '26px', height: '26px', color: '#ffffff' }} />,
        <Headphones style={{ width: '26px', height: '26px', color: '#ffffff' }} />,
        <CalendarCheck style={{ width: '26px', height: '26px', color: '#ffffff' }} />,
        <Package style={{ width: '26px', height: '26px', color: '#ffffff' }} />
      ];
      return defaultIcons[idx % defaultIcons.length];
  }
};

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  let text = rawText || defaultText;

  // Fix line breaks for hypergrid banner title specifically
  if (text.toLowerCase().includes('interactive led floor games')) {
    text = text.replace(/Games\s*<br\s*\/?>\s*\*{0,2}\s*for High-/gi, 'Games *for High-');
    if (text.includes('for High-') && !text.includes('for High-<br/>') && !text.includes('for High-<br />')) {
      text = text.replace(/for High-\s*/gi, 'for High-<br/>');
    }
  }

  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);
  
  return parts.map((part, index) => {
    const isHighlight = index % 2 === 1;
    
    if (typeof part === 'string' && (part.includes('<br/>') || part.includes('<br />') || part.includes('<br>'))) {
      const subParts = part.split(/<br\s*\/?>/i);
      const content = subParts.map((subPart, sIdx) => {
        const formattedSubPart = subPart.includes('for High-') ? (
          <span style={{ whiteSpace: 'nowrap' }}>{subPart}</span>
        ) : (
          subPart
        );
        return (
          <React.Fragment key={sIdx}>
            {formattedSubPart}
            {sIdx < subParts.length - 1 && <br />}
          </React.Fragment>
        );
      });
      return isHighlight ? (
        <span key={index} style={{ color: highlightColor }}>
          {content}
        </span>
      ) : (
        <React.Fragment key={index}>{content}</React.Fragment>
      );
    }
    
    return isHighlight ? (
      <span key={index} style={{ color: highlightColor }}>
        {part}
      </span>
    ) : (
      part
    );
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

export default function Hypergrid({ siteData }) {
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;
  const heroBgImage = getValidImageUrl(siteData?.hypergridHero?.bgUrl, hypergridHeroBg);

  // SEO Title & Meta Description update
  useEffect(() => {
    const defaultTitle = "Hypergrid Game Supplier in India | Winera International";
    const defaultMetaDesc = "Winera International is a trusted Hypergrid game supplier in India, installing commercial interactive LED floor systems for malls, FECs, and trampoline parks.";

    document.title = siteData?.hypergridSeo?.pageTitle || defaultTitle;
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = "description";
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute("content", siteData?.hypergridSeo?.metaDescription || defaultMetaDesc);
  }, [siteData]);

  return (
    <div style={{ background: '#f5f5f9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Open Sans', sans-serif", overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-hypergrid-hero-section" style={{
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
          {/* Centered Single Line Heading: Home › Hypergrid (Matching AR Games 1:1) */}
          <h1 className="winera-hypergrid-hero-title" style={{
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
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>{siteData?.hypergridHero?.breadcrumbHome || "Home"}</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.hypergridHero?.breadcrumbText || "Hypergrid"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. HYPERGRID GAME SUPPLIER IN INDIA SECTION */}
      <section className="winera-hypergrid-supplier-section" style={{ paddingTop: '35px', paddingBottom: '0px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-hypergrid-supplier-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '50px',
          alignItems: 'flex-start'
        }}>
          {/* Left Collage Graphic Column */}
          <div className="winera-hypergrid-supplier-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={getValidImageUrl(siteData?.hypergridIntro?.mainImgUrl, hypergridSupplierCollage)}
              alt="Hypergrid Game Supplier in India"
              style={{
                width: '100%',
                maxWidth: '680px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-hypergrid-supplier-text">
            {/* Yellow Accent Stroke Line */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '10px', marginTop: '25px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '320px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.hypergridIntro?.title, "*Hypergrid Game*<br/>Supplier in India", '#38bdf8')}
              </h2>
            </div>

            {/* Description Paragraph */}
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '0px', maxWidth: '580px' }}>
              {siteData?.hypergridIntro?.desc || "India's trusted Hypergrid game supplier commercial-grade interactive LED floor systems, installed and serviced by our own team across 50+ cities."}
            </p>

            {/* Action Button: Get A Quote */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.hypergridIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.hypergridIntro?.waMessage || "Hello Winera International! I want to get a quote and details for Hypergrid LED Floor Game setup. Please share details. [Ref: Hypergrid Page]";
                
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
                    {siteData?.hypergridIntro?.buttonText || "Get A Quote"}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE LED FLOOR GAMES FOR HIGH-FOOTFALL VENUES SECTION */}
      <section className="winera-hypergrid-banner-section" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-hypergrid-banner-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.35fr 1fr',
          gap: '30px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-hypergrid-banner-text">
            {/* Yellow Accent Stroke Line */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '380px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0, width: '1000px', maxWidth: '100%' }}>
                {renderTitleMarkup(siteData?.hypergridBanner?.title, "Interactive LED Floor Games *for High-<br/>Footfall Venues*", '#38bdf8')}
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p style={{ fontSize: '14px', color: 'rgba(45, 45, 45, 1)', lineHeight: 1.65, fontWeight: 400, marginBottom: '20px', maxWidth: '905px' }}>
              {siteData?.hypergridBanner?.paragraph1 ? (
                typeof siteData.hypergridBanner.paragraph1 === 'string'
                  ? siteData.hypergridBanner.paragraph1.split(/<br\s*\/?>/i).map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))
                  : siteData.hypergridBanner.paragraph1
              ) : (
                <>
                  Winera International is a trusted Hypergrid game supplier in India, sourcing and installing commercial Hypergrid<br />
                  interactive LED floor systems for malls, family entertainment centres, hotels, schools, trampoline parks, and bowling alleys<br />
                  since 2014. Every Hypergrid unit we supply is sourced from established global manufacturers — configured specifically for<br />
                  sustained daily commercial use in high-footfall Indian venues.
                </>
              )}
            </p>

            {/* Paragraph 2 */}
            <p style={{ fontSize: '14px', color: 'rgba(45, 45, 45, 1)', lineHeight: 1.65, fontWeight: 400, margin: 0, maxWidth: '905px' }}>
              {siteData?.hypergridBanner?.paragraph2 ? (
                typeof siteData.hypergridBanner.paragraph2 === 'string'
                  ? siteData.hypergridBanner.paragraph2.split(/<br\s*\/?>/i).map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))
                  : siteData.hypergridBanner.paragraph2
              ) : (
                <>
                  As a direct Hypergrid business partner, our own team manages the complete process from space assessment and product<br />
                  configuration to installation, software setup, and after-sales support. One team, zero third-party contractors, from order<br />
                  to opening day
                </>
              )}
            </p>
          </div>

          {/* Right Collage Graphic Column */}
          <div className="winera-hypergrid-banner-img" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <img
              src={getValidImageUrl(siteData?.hypergridBanner?.imgUrl, hypergridBannerImg)}
              alt="Interactive LED Floor Games for High-Footfall Venues"
              style={{
                width: '166%',
                maxWidth: '702px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL SPECIFICATIONS SECTION */}
      <section className="winera-hypergrid-specs-section" style={{ paddingTop: '0px', paddingBottom: '30px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9' }}>
        <div className="winera-hypergrid-specs-container" style={{
          maxWidth: '1085px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '40px',
          overflow: 'hidden',
          background: `url(${getValidImageUrl(siteData?.hypergridSpecs?.bgUrl, hypergridSpecsBg)}) center center / 100% 100% no-repeat`,
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          padding: '60px 60px -1px',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Top Title: Technical Specifications */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0px', padding: '30px 35px 10px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '300px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.1, margin: 0 }}>
              {renderTitleMarkup(siteData?.hypergridSpecs?.title, "*Technical* Specifications", '#ffcd00')}
            </h2>
          </div>

          {/* Yellow Border Container for Table */}
          <div className="winera-hypergrid-specs-table-wrapper" style={{
            border: '2px solid #ffcd00',
            borderRadius: '24px',
            background: '#ffffff',
            padding: '24px 35px',
            maxWidth: '610px',
            width: '100%',
            margin: '20px 35px 25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '8px 20px 12px 0', fontSize: '27px', fontWeight: '700', color: '#0f172a', width: '52%' }}>Specification</th>
                  <th style={{ textAlign: 'left', padding: '8px 0 12px 20px', fontSize: '27px', fontWeight: '700', color: '#0f172a' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(siteData?.hypergridSpecs?.rows || [
                  { spec: "Players", details: "1 to 6 simultaneously", detail: "1 to 6 simultaneously" },
                  { spec: "Game modes", details: "5+ repeatable modes", detail: "5+ repeatable modes" },
                  { spec: "Attendant required", details: "No — fully self-operated", detail: "No — fully self-operated" },
                  { spec: "Minimum space required", details: "200 sq ft onwards", detail: "200 sq ft onwards" },
                  { spec: "Expected lifespan", details: "8+ years — commercial grade", detail: "8+ years — commercial grade" }
                ]).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < 4 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '11px 20px 11px 0', fontSize: '16px', fontWeight: '400', color: '#0f172a' }}>{row.spec}</td>
                    <td style={{ padding: '11px 0 11px 20px', fontSize: '16px', fontWeight: '400', color: '#334155' }}>
                      {row.details || row.detail || row.value || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA Button: Download Our Brochure */}
          <div style={{ margin: '0 0 35px 35px' }}>
            <a
              href={siteData?.hypergridSpecs?.buttonLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              aria-label="Download Our Brochure"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '225px',
                height: '63px',
                paddingTop: '0px',
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
              {siteData?.hypergridSpecs?.buttonText || "Download Our Brochure"}
            </a>
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES HYPERGRID THE RIGHT CHOICE FOR YOUR VENUE SECTION */}
      <section className="winera-hypergrid-whyus-section" style={{
        position: 'relative',
        width: '100%',
        padding: '60px 4vw',
        background: `url(${getValidImageUrl(siteData?.hypergridWhyUs?.bgUrl, hypergridWhyUsBg)}) center center / 100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-hypergrid-whyus-container" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Header Area */}
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
            {/* Yellow Accent Stroke Line */}
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '240px', height: '9px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, margin: '0 0 14px' }}>
              {renderTitleMarkup(siteData?.hypergridWhyUs?.title, "*What Makes Hypergrid* the Right<br/>Choice for Your Venue", '#38bdf8')}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'rgba(55, 62, 65, 1)', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
              {siteData?.hypergridWhyUs?.subtitle || "Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:"}
            </p>
          </div>

          {/* 2 Column Content Layout */}
          <div className="winera-hypergrid-whyus-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '40px',
            alignItems: 'center',
            paddingBottom: '25px'
          }}>
            {/* Left Graphic Image Column */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <img
                src={getValidImageUrl(siteData?.hypergridWhyUs?.leftImgUrl, arImage)}
                alt="What Makes Hypergrid the Right Choice for Your Venue"
                style={{
                  width: '300%',
                  maxWidth: '700px',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>

            {/* Right Features List Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px', margin: '0 0 0 auto' }}>
              {(siteData?.hypergridWhyUs?.cards || [
                {
                  title: "An Attraction That Draws a Crowd Without Marketing",
                  desc: "Hypergrid's illuminated floor is visible from across a venue visitors stop, watch, and join without any promotion needed. The combination of moving lights, real-time competition, and full-body play creates a natural spectator effect that draws walk-in visitors throughout the day."
                },
                {
                  title: "Every Visitor Has a Reason to Play",
                  desc: "From a young child learning through colour-based games or a teenager competing for the top score, Hypergrid keeps players engaged with adjustable difficulty levels and multiple game modes. One attraction appeals to different age groups, helping your venue attract and entertain more visitors."
                },
                {
                  title: "Revenue Without the Overhead",
                  desc: "Visitors can start and play Hypergrid on their own without needing staff assistance. This helps reduce operating costs while generating consistent revenue, making it an ideal attraction for Indian FECs, malls, and hotels."
                }
              ]).map((card, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Header Row: Icon + Title */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={homePageIcon}
                      alt=""
                      style={{ width: '20px', height: '20px', display: 'block', objectFit: 'contain', flexShrink: 0 }}
                    />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                      {card.title}
                    </h3>
                  </div>
                  {/* Paragraph text starting at left edge vertically aligned with icon */}
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, width: '450px' }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. IS HYPERGRID A SMART INVESTMENT FOR YOUR VENUE SECTION */}
      <section className="winera-hypergrid-roi-section" style={{ paddingTop: '35px', paddingBottom: '35px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Centered Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', width: '280px', height: '9px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.7rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, margin: 0 }}>
              {renderTitleMarkup(siteData?.hypergridRoi?.title, "Is Hypergrid a Smart<br/>*Investment for Your Venue?*", '#38bdf8')}
            </h2>
          </div>

          {/* 2-Column Content Grid */}
          <div className="winera-hypergrid-roi-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '15px',
            alignItems: 'center'
          }}>
            {/* Left Text Content Column */}
            <div className="winera-hypergrid-roi-text">
              {/* Paragraph 1 */}
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '22px', maxWidth: '620px', textAlign: 'justify' }}>
                {siteData?.hypergridRoi?.paragraph1 || "Most interactive LED floor game suppliers quote a unit price and leave the business decision entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before confirming any Hypergrid order, our team prepares a complete ROI report for your specific venue \u2014 covering equipment cost, projected daily sessions, estimated revenue per session, maintenance costs, and break-even timeline."}
              </p>

              {/* Paragraph 2 */}
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', maxWidth: '620px', textAlign: 'justify' }}>
                {siteData?.hypergridRoi?.paragraph2 || "Every figure is calculated around your venue type, daily footfall, and target visitor demographic \u2014 not an industry average. Very few Hypergrid game suppliers in India include this as a standard part of their process. For Winera, it is where every project starts."}
              </p>

              {(() => {
                const baseLink = siteData?.hypergridRoi?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.hypergridRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Hypergrid LED Floor Game setup & commercial ROI calculation. Please share details. [Ref: Hypergrid Page]";
                
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
                    aria-label="Talk to an ROI Expert"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      width: '271px',
                      height: '70px',
                      paddingTop: '2px',
                      background: `url(${talkToRoiButtonImg}) center center / 100% 100% no-repeat`,
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
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 1 .8-3-.2-.3A8 8 0 1 1 12 20z" fill="#ffffff" />
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" fill="#ffffff" />
                      </svg>
                    </div>
                    <span>{siteData?.hypergridRoi?.buttonText || "Talk to an ROI Expert"}</span>
                  </a>
                );
              })()}
            </div>

            {/* Right Graphic Image Column */}
            <div className="winera-hypergrid-roi-img" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '-20%' }}>
              <img
                src={getValidImageUrl(siteData?.hypergridRoi?.imgUrl, hypergridImage)}
                alt="Is Hypergrid a Smart Investment for Your Venue?"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  maxHeight: '310px',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-hypergrid-whywinera-section" style={{ paddingTop: '35px', paddingBottom: '45px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Centered Section Heading Title */}
          <div style={{ textAlign: 'center', marginBottom: '45px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '510px', maxWidth: '100%', height: '11px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.hypergridWhyWinera?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* 3x2 Grid Container matching screenshot 1:1 */}
          <div className="winera-hypergrid-whywinera-container" style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {(() => {
              const cards = Array.isArray(siteData?.hypergridWhyWinera?.items) && siteData.hypergridWhyWinera.items.length > 0
                ? siteData.hypergridWhyWinera.items
                : defaultHypergridWhyWineraItems;

              const topCards = cards.slice(0, 3);
              const bottomCards = cards.slice(3);

              return (
                <div style={{ position: 'relative' }}>
                  {/* TOP ROW (3 CELLS) */}
                  <div className="winera-hypergrid-whywinera-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    gap: '0px',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          padding: '30px 25px 40px',
                          textAlign: 'center',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        {/* Vertical Gradient Divider Line on Right of Top Row Item */}
                        <div className="winera-hypergrid-whyus-vertical-divider" style={{
                          position: 'absolute',
                          right: '9px',
                          top: 0,
                          bottom: 0,
                          width: '1.5px',
                          background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.05) 0%, #38bdf8 100%)',
                          zIndex: 3
                        }}></div>

                        <div style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                          boxShadow: 'none'
                        }}>
                          {card.iconUrl ? (
                            <img src={card.iconUrl} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                          ) : (
                            renderWhyWineraIcon(card.icon, cIdx)
                          )}
                        </div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                          {card.title}
                        </h4>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                          {card.desc || card.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* HORIZONTAL CENTER DIVIDER LINE */}
                  <div className="winera-hypergrid-whyus-horizontal-divider" style={{
                    width: '100%',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.1) 0%, #38bdf8 8%, #38bdf8 92%, rgba(56, 189, 248, 0.1) 100%)',
                    position: 'relative',
                    zIndex: 4,
                    margin: 0
                  }}></div>

                  {/* BOTTOM ROW (3 CELLS) */}
                  {bottomCards.length > 0 && (
                    <div className="winera-hypergrid-whywinera-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {bottomCards.map((card, bIdx) => (
                        <div
                          key={bIdx}
                          style={{
                            padding: '40px 25px 30px',
                            textAlign: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
                        {/* Vertical Gradient Divider Line on Right of Bottom Row Item (2 lines only) */}
                        {bIdx < bottomCards.length - 1 && (
                          <div className="winera-hypergrid-whyus-vertical-divider" style={{
                            position: 'absolute',
                            right: '-10px',
                            top: 0,
                            bottom: 0,
                            width: '1.5px',
                            background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.05) 100%)',
                            zIndex: 3
                          }}></div>
                        )}

                          <div style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: 'none'
                          }}>
                            {card.iconUrl ? (
                              <img src={card.iconUrl} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                            ) : (
                              renderWhyWineraIcon(card.icon, topCards.length + bIdx)
                            )}
                          </div>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                            {card.title}
                          </h4>
                          <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                            {card.desc || card.description}
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

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Projects</span></>}
      />

      {/* 10. WHAT OUR CLIENTS SAY (TESTIMONIALS) SECTION */}
      <TestimonialsSection siteData={siteData} />

      {/* 11. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.hypergridRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 12. FAQ SECTION */}
      {(() => {
        const defaultHypergridFaqs = [
          {
            question: "Who is a reliable Hypergrid game supplier in India?",
            answer: "Winera International is a trusted Hypergrid game supplier in India, sourcing commercial interactive LED floor systems from established global manufacturers for malls, FECs, hotels, schools, and trampoline parks — installed across 50+ cities by our own team since 2014."
          },
          {
            question: "What is a Hypergrid interactive LED floor game?",
            answer: "Hypergrid is a commercial interactive LED floor system using pressure-sensitive RGB tiles. Players step, jump, and sprint across the glowing grid — reacting to colour patterns, memory sequences, and speed challenges in real time. It supports 1 to 6 players simultaneously, requires no attendant, and offers 5+ game modes for consistent repeat engagement."
          },
          {
            question: "Is Hypergrid a good business investment for an FEC or mall?",
            answer: "As a Hypergrid FEC game, it generates revenue through per-session fees with zero consumable costs and no attendant requirement — keeping operating costs low. Its self-operated design and high repeat-play appeal make it one of the strongest revenue-per-square-foot attractions for Indian FECs and malls."
          },
          {
            question: "What is the price of a Hypergrid game in India?",
            answer: "Hypergrid game pricing depends on configuration, tile count, and installation requirements. Winera provides a complete cost breakdown — equipment, installation, and projected maintenance — before confirming any order. Contact our team for a venue-specific quote and free ROI report."
          },
          {
            question: "How much space does Hypergrid require?",
            answer: "A commercial Hypergrid installation starts from 200 sq ft of flat floor space — compact enough to fit within an existing trampoline park, bowling alley, or mall entertainment zone without requiring a dedicated standalone room."
          },
          {
            question: "What game modes does Hypergrid offer?",
            answer: "Hypergrid offers 5+ game modes including colour-matching, memory sequences, speed reaction challenges, and competitive multiplayer formats — with adjustable difficulty settings for children through adults. Game modes can be configured through the 24\" operator control panel."
          },
          {
            question: "Does Hypergrid require a dedicated staff member to operate?",
            answer: "No. Hypergrid is fully self-operated — players start and control sessions through the intuitive interface without staff involvement."
          },
          {
            question: "How long does Hypergrid installation take?",
            answer: "A standard Hypergrid installation is typically completed within 1–2 days depending on floor configuration. Winera confirms an exact timeline at the quote stage covering delivery, calibration, and staff training."
          },
          {
            question: "What after-sales support does Winera provide for Hypergrid?",
            answer: "Winera International provides software updates, hardware servicing, tile replacement, and on-site support for all Hypergrid installations — directly through our own team across 50+ cities."
          }
        ];
        const faqs = (Array.isArray(siteData?.hypergridFaqs) && siteData.hypergridFaqs.length > 0) ? siteData.hypergridFaqs : defaultHypergridFaqs;

        return (
          <FaqSection
            faqList={faqs}
            faqsList={faqs}
            highlightColor="#38bdf8"
          />
        );
      })()}

      {/* 9. READY TO ADD HYPERGRID TO YOUR VENUE CTA BANNER SECTION */}
      <CtaBanner
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="45px"
        subtitleFontSize="16px"
        subtitleFontWeight="600"
        bgUrl={siteData?.hypergridCta?.bgUrl}
        bg={hypergridWineraLastblock}
        leftImgUrl={siteData?.hypergridCta?.leftImgUrl}
        leftImg={leftTiltedCard}
        rightImgUrl={siteData?.hypergridCta?.rightImgUrl}
        rightImg={rightTiltedCard}
        tagline={null}
        title={
          siteData?.hypergridCta?.title
            ? siteData.hypergridCta.title
            : "READY TO ADD HYPERGRID<br/>TO YOUR VENUE?"
        }
        subtitle={
          siteData?.hypergridCta?.subtitle || siteData?.hypergridCta?.whiteText
            ? siteData?.hypergridCta?.subtitle || siteData?.hypergridCta?.whiteText
            : "Get In Touch With India's Trusted Hypergrid Game Supplier For A Free ROI Report, Space Assessment, And Project Quote."
        }
        description={null}
        buttonText={siteData?.hypergridCta?.buttonText || "Talk to an ROI Expert"}
        buttonLink={
          siteData?.hypergridCta?.buttonLink || siteData?.header?.whatsAppUrl || "https://wa.me/919428989488"
        }
      />       

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
