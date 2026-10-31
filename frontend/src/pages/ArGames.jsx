import React, { useEffect } from 'react';
import { ShieldCheck, Settings, Database, Headset, Wrench, Box } from 'lucide-react';
import Header from '../components/Header';
import { sanitizeAndFormatHtml } from './BlogDetail';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import MobileExpandableText from '../components/MobileExpandableText';
import WhyChooseUsMobileSlider from '../components/WhyChooseUsMobileSlider';
const arHeroBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345630/winera_uploads/jq7orz67ipny5xtqs9bb.png";
const arHeroMobileBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345484/winera_uploads/cjhcvoxksmptc84yslh2.png";
const arSupplierCollage = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/jnv3jpypar3oyptok2ua.png";
const arAttractionsGraphic = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345544/winera_uploads/o0rxgli4i1gfotelvg9a.png";
const arFeaturesBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345623/winera_uploads/ug6dmazccdtqxjpzixxz.png";
const arEarnGamers = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345546/winera_uploads/u9f9gkrbms7knuto3gg5.png";
const yellowStrokeLine = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345696/winera_uploads/kllqvzchxecftuxi6zdn.png";
const ctaConsultationsBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const needConsultationsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const homeBlock1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345655/winera_uploads/gv0pghj5lvv8p5tuhlri.png";
const vrCtaRightImg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345690/winera_uploads/r7a7hoy1dktrgee5mxhq.png";
const amusementParkCtaBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/ncvfqvtbv4zdvf9cd4n7.jpg";
const ctaMainBanner = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345648/winera_uploads/ei16uczeuelaabtue4bs.jpg";
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

// Helper function to render title with *word* highlights and <br/> linebreaks
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#00a8ff') => {
  const actualHighlight = (highlightColor === '#38bdf8' || highlightColor === '#0072b8') ? '#00a8ff' : highlightColor;
  let text = rawText || defaultText;
  if (!text) return null;

  // Ensure spacing around <br/> tags so words never stick together if line breaks are hidden on mobile
  text = text.replace(/([^\s>])(<br\s*\/?>)/gi, '$1 $2').replace(/(<br\s*\/?>)([^\s<])/gi, '$1 $2');

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
        <span key={pIdx} style={{ color: actualHighlight }}>
          {renderedContent}
        </span>
      );
    }
    return <React.Fragment key={pIdx}>{renderedContent}</React.Fragment>;
  });
};

export default function ArGames({ siteData }) {
  const arSeo = siteData?.arSeo || {
    pageTitle: "AR Games Supplier in India | Winera International",
    metaDescription: "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions."
  };

  useEffect(() => {
    document.title = arSeo.pageTitle || arSeo.title || "AR Games Supplier in India | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', arSeo.metaDescription || arSeo.description || "Winera International is a leading AR games supplier in India, sourcing and installing sports simulators, interactive floors, and immersive gaming attractions.");
  }, [arSeo]);

  const defaultArFaqs = [
    { question: "Who is a reliable AR games supplier in India?", answer: "Winera International is a direct AR games supplier in India, sourcing and installing commercial AR and interactive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres." },
    { question: "What is the setup cost for AR gaming equipment in India?", answer: "AR gaming cost in India depends on the product category, number of units and customisation requirements. Winera provides a complete cost breakdown of equipment, installation, and maintenance before confirming any order. Contact our team for a quote specific to your venue." },
    { question: "What is the minimum space required for AR gaming equipment?", answer: "Space requirements vary by product. Interactive floor tiles start from 30x30cm per module, while full sports simulators typically require 4–9 metres in length and 3–3.5 metres ceiling height. Winera's team assesses your exact dimensions before recommending compatible products." },
    { question: "How do I get started with an AR gaming zone setup from Winera?", answer: "Contact us via our website's contact form, WhatsApp, or call +91 91578 73576. Share your venue type, available floor space, and the type of interactive experience you want to offer. Our team will recommend the right product mix, prepare a free ROI report, and send a quote ASAP." },
    { question: "Can AR gaming equipment be customised with branding or specific game content?", answer: "Yes. Many products in our range support custom branding, game library selection, and venue-specific content configuration. We confirm available customisation options for each product during the consultation stage." },
    { question: "What is the typical ROI for an AR gaming zone in India?", answer: "ROI depends on your venue type, daily footfall, session pricing, and machine mix. Winera prepares a free ROI report for every project — covering projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline — specific to your venue before you confirm any order." },
    { question: "Does Winera provide after-sales support for AR and interactive gaming equipment?", answer: "Yes. Our own technicians provide software updates, hardware servicing, and on-site support for all AR games and interactive gaming equipment we install — directly through our own team, without third-party service agents." },
    { question: "How long does AR gaming equipment installation take?", answer: "Installation timelines depend on the number of products, venue readiness, and configuration complexity. A single interactive floor system can be operational within days, while a complete multi-category AR gaming zone takes longer for full setup and software configuration." }
  ];

  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const heroBgImage = siteData?.arHero?.bgUrl || siteData?.arHero?.bg || arHeroBg;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. AR GAMES HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-ar-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        '--winera-ar-mobile-bg': `url("${arHeroMobileBg}")`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <img
          src={heroBgImage}
          alt={siteData?.arHero?.bgAlt || "AR Games Equipment Supplier & Interactive Solutions - Winera International"}
          style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › AR Games */}
          <span className="winera-ar-hero-h1" style={{
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
              {siteData?.arHero?.breadcrumbText || "AR Games"}
            </span>
          </span>
        </div>
      </section>

      {/* 3. AR GAMES SUPPLIER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-supplier-section" style={{ padding: '45px 4vw 25px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-ar-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '70px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-ar-supplier-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h1 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '35px', fontWeight: '400', fontStyle: 'normal', letterSpacing: '0px', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.arIntro?.title, "*AR Games* Supplier<br/>in India", '#00a8ff')}
              </h1>
            </div>

            <p
              style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '10px', maxWidth: '500px' }}
              dangerouslySetInnerHTML={{
                __html: sanitizeAndFormatHtml((siteData?.arIntro?.desc || "India's ROI-first AR games supplier — we source, install, and service interactive gaming attractions that draw crowds.").replace(/\n/g, '<br/>'))
              }}
            />

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.arIntro?.buttonLink || "https://wa.me/919157873576";
                const defaultMsg = siteData?.arIntro?.waMessage || "Hello Winera International! I want to get a quote and details for AR Games setup. Please share details. [Ref: AR Games Page]";
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
                    {siteData?.arIntro?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>

          {/* Right Collage Graphic Container */}
          <div className="winera-ar-supplier-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.arIntro?.mainImgUrl || arSupplierCollage}
              alt={siteData?.arIntro?.mainImgAlt || siteData?.arIntro?.imgAlt || "AR Games Supplier in India"}
              style={{
                width: '100%',
                maxWidth: '520px',
                marginBottom: '3%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE AR ATTRACTIONS, BUILT FOR YOUR VENUE SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-attractions-section" style={{ padding: '5px 4vw 45px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-ar-attractions-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Image Column */}
          <div className="winera-ar-attractions-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.arMatchedVenue?.imgUrl || arAttractionsGraphic}
              alt={siteData?.arMatchedVenue?.imgAlt || "Interactive AR Attractions Setup"}
              style={{
                width: '100%',
                maxWidth: '580px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Column */}
          <div className="winera-ar-attractions-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '22px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '300px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{
                fontSize: '35px',
                fontWeight: '900',
                lineHeight: 1.15,
                margin: 0,
                color: '#0f172a',
                letterSpacing: '-0.5px'
              }}>
                {renderTitleMarkup(
                  siteData?.arMatchedVenue?.title,
                  "Interactive AR Attractions,<br/>*Built for Your Venue*",
                  '#00a8ff'
                )}
              </h2>
            </div>

            <div style={{ marginBottom: '16px', maxWidth: '540px' }}>
              <MobileExpandableText
                preview={
                  <p
                    style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '0 0 8px 0' }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeAndFormatHtml((siteData?.arMatchedVenue?.p1 || "Winera International is a trusted AR games supplier in India sourcing and installing commercial sports simulators, interactive floor systems, AR experiences, and immersive gaming equipment for malls, hotels, schools, resorts, and family entertainment centres for more than 15 Years. Every product is sourced from established global manufacturers and configured for sustained commercial use").replace(/\n/g, '<br/>'))
                    }}
                  />
                }
                expandedContent={
                  <p
                    style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: '8px 0 0 0' }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeAndFormatHtml((siteData?.arMatchedVenue?.p2 || "As a direct AR entertainment setup partner, our own team manages everything from space planning and product selection to installation and after-sales support — one team, zero third-party contractors.").replace(/\n/g, '<br/>'))
                    }}
                  />
                }
              />
            </div>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.arMatchedVenue?.buttonLink || "https://wa.me/919157873576";
                const defaultMsg = siteData?.arMatchedVenue?.waMessage || "Hello Winera International! I want to get a quote for Interactive AR Attractions setup for my venue. Please share details. [Ref: AR Games Page]";
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
                    {siteData?.arMatchedVenue?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 6. AR FEATURES & HIGHLIGHTS SECTION (FULL WIDTH TECH FRAME BG) */}
      <section className="winera-ar-features-section" style={{
        position: 'relative',
        width: '100%',
        padding: '100px 4vw 110px',
        backgroundImage: `url(${siteData?.arFeatures?.bgUrl || arFeaturesBg})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px'
        }}>
          {/* Row 1: Exciting Attractions (Left Text + Right Image) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '260px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f1Title, "*Exciting* Attractions", '#00a8ff')}
                </h2>
              </div>
              <p
                className="winera-ar-feature-desc"
                style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeAndFormatHtml((siteData?.arFeatures?.f1Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability.").replace(/\n/g, '<br/>'))
                }}
              />
            </div>

            {/* Right Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f1Img || 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80'}
                alt={siteData?.arFeatures?.f1ImgAlt || "Exciting Attractions - AR Games"}
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Row 2: High-Quality Equipment (Left Image + Right Text) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f2Img || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'}
                alt={siteData?.arFeatures?.f2ImgAlt || "High-Quality Equipment - AR Games"}
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '260px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f2Title, "High-Quality *Equipment*", '#00a8ff')}
                </h2>
              </div>
              <p
                className="winera-ar-feature-desc"
                style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeAndFormatHtml((siteData?.arFeatures?.f2Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability.").replace(/\n/g, '<br/>'))
                }}
              />
            </div>
          </div>

          {/* Row 3: Budget-Friendly AR Entertainment Setup (Left Text + Right Image) */}
          <div className="winera-ar-feature-row" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div className="winera-ar-feature-col-text" style={{ textAlign: 'left' }}>
              <div className="winera-ar-feature-title" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '280px', height: '10px', marginBottom: '8px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                  {renderTitleMarkup(siteData?.arFeatures?.f3Title, "*Budget-Friendly AR*<br/>Entertainment Setup", '#00a8ff')}
                </h2>
              </div>
              <p
                className="winera-ar-feature-desc"
                style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0, textAlign: 'justify' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeAndFormatHtml((siteData?.arFeatures?.f3Desc || "Bumper cars have long held a special place in the hearts of amusement park enthusiasts, and at Winera International, we take immense pride in delivering high-quality options that enhance the overall park experience. As a leading bumper car manufacturer in India and trusted bumper car manufacturer, our creations are not just rides; they're an exhilarating blend of thrilling collisions and smooth handling, designed with a laser focus on safety and durability.").replace(/\n/g, '<br/>'))
                }}
              />
            </div>

            {/* Right Image */}
            <div className="winera-ar-feature-col-img" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}>
              <img
                src={siteData?.arFeatures?.f3Img || 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80'}
                alt={siteData?.arFeatures?.f3ImgAlt || "Budget-Friendly AR Setup"}
                style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. KNOW YOUR RETURNS BEFORE YOU INVEST IN AR GAMING EQUIPMENT SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-earn-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 4vw 80px',
        background: 'rgb(245, 245, 249)',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Centered Heading */}
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '14px', objectFit: 'fill' }}
            />
            <h2 style={{
              fontSize: '35px',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '950px',
              letterSpacing: '-0.5px'
            }}>
              {renderTitleMarkup(
                siteData?.arEarn?.title,
                "*Know Your Returns Before* You Invest in<br/>AR Gaming Equipment",
                '#00a8ff'
              )}
            </h2>
          </div>

          {/* Centered Wide Paragraphs with Right Side Gamers Graphic (Matching Image 2) */}
          <div className="winera-ar-earn-content-wrap winera-ar-earn-grid" style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingRight: '220px'
          }}>
            {/* Paragraphs shifted to the left side so text never overlaps right-side image */}
            <div className="winera-ar-earn-text-col" style={{
              textAlign: 'center',
              width: '100%',
              maxWidth: '840px',
              margin: '0 auto 0 20px',
              position: 'relative',
              zIndex: 2
            }}>
              <MobileExpandableText
                style={{ width: '123%', maxWidth: '123%' }}
                preview={
                  <p
                    className="winera-ar-earn-p"
                    style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '0 auto 10px', maxWidth: '123%' }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeAndFormatHtml((siteData?.arEarn?.p1 || "Most AR games suppliers in India present a product catalogue and a price list the financial planning is left entirely to you. As India's ROI-First Game Zone Developer, Winera International works differently. Before recommending any product or configuration, our team prepares a complete ROI report for your specific venue covering equipment cost, projected daily sessions, estimated revenue per attraction, maintenance costs, and break-even timeline.").replace(/\n/g, '<br/>'))
                    }}
                  />
                }
                expandedContent={
                  <p
                    className="winera-ar-earn-p"
                    style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '10px auto 0', maxWidth: '123%' }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeAndFormatHtml((siteData?.arEarn?.p2 || "Every figure is calculated around your venue type, available floor space, and visitor demographic, not an industry benchmark that may have no relevance to your actual situation. Very few interactive gaming setup suppliers in India include this as a standard part of their process. For Winera, it is where every project starts").replace(/\n/g, '<br/>'))
                    }}
                  />
                }
              />
            </div>

            {/* Right Side Gamers Graphic */}
            <div className="winera-ar-earn-graphic-col" style={{
              position: 'absolute',
              right: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              pointerEvents: 'none'
            }}>
              <img
                src={siteData?.arEarn?.imgUrl || arEarnGamers}
                alt={siteData?.arEarn?.imgAlt || "AR Gaming Experience Gamers"}
                style={{
                  width: '210px',
                  maxWidth: '220px',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-ar-whyus-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              className="winera-yellow-stroke"
              style={{ display: 'block', width: '200px', maxWidth: '100%', height: '8px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 className="winera-ar-whyus-h2" style={{ fontSize: '35px', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.arWhyUs?.title, "Why Choose *Winera International*", '#00a8ff')}
            </h2>
          </div>

          {/* Cards Grid Container (Dynamic List with Thin Blue Dividers & 3x2 Grid Layout) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const defaultArWhyUsCards = [
                { title: "Right Product, Right Venue", desc: "We Recommend What Actually Fits Your Space And Footfall." },
                { title: "ROI Before You Invest", desc: "We Show You The Real Numbers Before You Commit." },
                { title: "Operational From Day One", desc: "We Install And Configure Everything, So You Open Without The Headaches." },
                { title: "Support Beyond Installation", desc: "Our Own Technicians Handle Servicing And Updates After Handover." },
                { title: "Age-Inclusive Entertainment", desc: "We Choose A Mix That Entertains All Ages, So More Visitors Walk In." },
                { title: "Trusted Across Venue Types", desc: "From Malls And Hotels To Schools And Resorts Across India Trust Us." }
              ];

              const cards = (Array.isArray(siteData?.arWhyUs?.cardsList) && siteData.arWhyUs.cardsList.length > 0)
                ? siteData.arWhyUs.cardsList
                : defaultArWhyUsCards;

              const iconsList = [
                <ShieldCheck key={0} style={{ width: '24px', height: '24px' }} />,
                <Settings key={1} style={{ width: '24px', height: '24px' }} />,
                <Database key={2} style={{ width: '24px', height: '24px' }} />,
                <Headset key={3} style={{ width: '24px', height: '24px' }} />,
                <Wrench key={4} style={{ width: '24px', height: '24px' }} />,
                <Box key={5} style={{ width: '24px', height: '24px' }} />
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
                  <div className="winera-ar-whyus-desktop-container" style={{ position: 'relative' }}>
                    {/* TOP ROW */}
                    <div className="winera-ar-whyus-row winera-ar-whyus-top-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {topCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="winera-ar-whyus-card"
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
                            <div className="winera-ar-whyus-vertical-divider" style={{
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
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                            {card.title}
                          </h3>
                          <p
                            style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}
                            dangerouslySetInnerHTML={{
                              __html: sanitizeAndFormatHtml((card.desc || '').replace(/\n/g, '<br/>'))
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Horizontal Center Cyan Divider Line with Shade Fading */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-horizontal-divider" style={{
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 12%, #38bdf8 88%, rgba(56, 189, 248, 0.08) 100%)',
                        position: 'relative',
                        zIndex: 3,
                        margin: '0 0 30px'
                      }}></div>
                    )}

                    {/* BOTTOM ROW */}
                    {bottomCards.length > 0 && (
                      <div className="winera-ar-whyus-row winera-ar-whyus-bottom-row" style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                        maxWidth: bottomCards.length <= 3 ? '780px' : '100%',
                        margin: '0 auto',
                        gap: '0px',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        {bottomCards.map((card, bIdx) => (
                          <div
                            key={bIdx}
                            className="winera-ar-whyus-card"
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
                              <div className="winera-ar-whyus-vertical-divider" style={{
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
                            <h3 style={{ fontSize: '1.15rem', fontWeight: '500', color: '#0f172a', margin: '0 0 10px 0', whiteSpace: 'nowrap' }}>
                              {card.title}
                            </h3>
                            <p
                              style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, fontWeight: '500', margin: 0, maxWidth: '280px' }}
                              dangerouslySetInnerHTML={{
                                __html: sanitizeAndFormatHtml((card.desc || '').replace(/\n/g, '<br/>'))
                              }}
                            />
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
        </div>
      </section>

      {/* 9. OUR RECENT PROJECTS SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        siteData={siteData}
        projects={siteData?.builtProjects}
        showTopHeader={false}
        simpleTitle="Our *Recent Projects*"
      />

      {/* 10. WHAT OUR CLIENTS SAY (TESTIMONIALS) SECTION */}
      <TestimonialsSection siteData={siteData} />

      {/* 11. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.arRelated || siteData?.arcadeRelated} accentColor="#00a8ff" />

      {/* 12. FAQ SECTION */}
      <FaqSection
        faqList={Array.isArray(siteData?.arFaqs) && siteData.arFaqs.length > 0 ? siteData.arFaqs : defaultArFaqs}
        faqsList={Array.isArray(siteData?.arFaqs) && siteData.arFaqs.length > 0 ? siteData.arFaqs : defaultArFaqs}
      />

      {/* 13. CTA BANNER SECTION (MATCHING DESIGN SYSTEM SPEC) */}
      <CtaBanner
        containerPadding="15px 32px"
        blurBg={true}
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="clamp(24px, 2.6vw, 32px)"
        subtitleFontSize="16px"
        subtitleFontWeight="400"
        bgUrl={
          siteData?.arCta?.bgUrl &&
            !siteData.arCta.bgUrl.includes('cta-consultations') &&
            !siteData.arCta.bgUrl.includes('need-consultations') &&
            !siteData.arCta.bgUrl.includes('project-lastbg')
            ? getValidImageUrl(siteData.arCta.bgUrl, ctaMainBanner)
            : null
        }
        bg={ctaMainBanner}
        bgAlt={siteData?.arCta?.bgAlt || "Ready to Set Up Your Gaming Zone - Winera AR Games"}
        leftImgUrl={
          siteData?.arCta?.leftImgUrl
            ? getValidImageUrl(siteData.arCta.leftImgUrl, homeBlock1)
            : null
        }
        leftImg={homeBlock1}
        rightImgUrl={
          siteData?.arCta?.rightImgUrl
            ? getValidImageUrl(siteData.arCta.rightImgUrl, vrCtaRightImg)
            : null
        }
        rightImg={vrCtaRightImg}
        tagline={siteData?.arCta?.tagline || null}
        title={
          siteData?.arCta?.title
            ? siteData.arCta.title
            : "Ready To Set Up<br/>Your Gaming Zone?"
        }
        subtitle={
          siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            ? siteData?.arCta?.subtitle || siteData?.arCta?.description || siteData?.arCta?.whiteText
            : "Get in touch with India's ROI-First Game Zone Developer"
        }
        description={null}
        buttonText={
          siteData?.arCta?.buttonText !== undefined
            ? siteData.arCta.buttonText
            : "Get a Quote"
        }
        buttonLink={
          siteData?.arCta?.buttonLink !== undefined
            ? siteData.arCta.buttonLink
            : "https://wa.me/919157873576"
        }
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
