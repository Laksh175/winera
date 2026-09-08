import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import amusementHeroBg from '../assets/amusement-park-hero-bg.webp';
import amusementSupplierCollage from '../assets/amusement-supplier-collage.webp';
import amusementSetupsCollage from '../assets/amusement-setups-collage.webp';
import amusementOptionsBg from '../assets/amusement-options-bg.webp';
import amusementOptionsTopCollage from '../assets/amusement-options-top-collage.webp';
import amusementOptionsBottomImg from '../assets/amusement-options-bottom-img.webp';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.webp';
import amusementCtaBg from '../assets/cta-consultations-banner.webp';
import amusementLeftImg from '../assets/amusement-park-left-img.webp';
import amusementRightImg from '../assets/amusement-park-right-img.webp';

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

const defaultAmusementFaqs = [
  {
    q: "Who is a reliable amusement park manufacturer in India?",
    a: "Winera International is a direct amusement park manufacturer in India, supplying and installing rides and equipment for theme parks, malls, and family entertainment centres since 2014 installed across 50+ cities by our own team."
  },
  {
    q: "What is the cost of setting up an amusement park in India?",
    a: "Amusement park setup cost in India depends on land size, number of rides, ride category, and customisation. Winera provides a complete cost breakdown, installation, and maintenance before confirming any project."
  },
  {
    q: "What safety standards do Winera's amusement park rides meet?",
    a: "Every ride is built with load-rated restraints, sensor-based safety stops, and commercial-grade structural materials, then tested on-site before handover."
  },
  {
    q: "How much land is needed to start an amusement park in India?",
    a: "Land requirements vary significantly by ride mix and target capacity Winera's team assesses your available space and recommends an attraction layout that fits it."
  },
  {
    q: "Which businesses typically work with an amusement park equipment manufacturer in India?",
    a: "Theme parks, malls, resorts, family entertainment centres, and tourism developments are the most common buyers of amusement park equipment in India."
  },
  {
    q: "How long does amusement park ride installation take?",
    a: "Timelines depend on ride complexity and project scale. Winera confirms an exact schedule covering manufacturing, delivery, and installation at the quote stage."
  },
  {
    q: "What after-sales support does Winera provide for amusement park rides?",
    a: "Winera provides ongoing maintenance, spare parts, and on-site servicing support for all rides and equipment installed available directly through our after-sales team."
  }
];

export default function AmusementPark({ siteData }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.amusementSeo?.pageTitle || "Amusement Park Manufacturer in India | Winera International";
    const metaDesc = siteData?.amusementSeo?.metaDescription || "Winera International is a premier amusement park manufacturer in India, delivering innovative, safe rides and equipment tailored to your game zone and venue space.";

    document.title = pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [siteData]);

  if (!siteData) {
    return (
      <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading Amusement Park...
      </div>
    );
  }

  const { header, footer } = siteData;
  const heroBgImage = getValidImageUrl(siteData?.amusementHero?.bgUrl, amusementHeroBg);

  const defaultRideItems = [
    { boldText: "Thrill Rides", desc: "For Teens And Adults Chasing Excitement" },
    { boldText: "Family Rides", desc: "Gentler Attractions The Whole Family Can Enjoy Together" },
    { boldText: "Kids' Rides", desc: "Safe, Age-Appropriate Rides For Younger Visitors" },
    { boldText: "Classic Favourites", desc: "Proven, Time-Tested Crowd-Pullers" },
    { boldText: "Custom Attractions", desc: "Tailored To Your Theme And Space" }
  ];

  const rideItems = (Array.isArray(siteData?.amusementOptions?.items) && siteData.amusementOptions.items.length > 0)
    ? siteData.amusementOptions.items
    : defaultRideItems;

  const defaultWhyUsCards = [
    {
      title: "Full Project, Not Just Equipment",
      desc: "We Handle Everything From Layout To Installation, So You're Not Left Coordinating Vendors."
    },
    {
      title: "Right Attractions For Your Space",
      desc: "We Recommend Rides That Fit Your Land, Footfall, And Visitors Not A Catalogue Guess"
    },
    {
      title: "One Team, Zero Confusion",
      desc: "Sourcing, Installation, And Service Handled By Our Own Dedicated Team"
    },
    {
      title: "Ready To Open From Day One",
      desc: "Every Ride Is Tested On-Site Before Handover, So Opening Day Runs Smoothly"
    },
    {
      title: "We Know What Keeps Visitors Coming Back",
      desc: "Years Of Real Projects Tell Us Which Attractions Drive Repeat Footfall"
    }
  ];

  const whyUsCards = (Array.isArray(siteData?.amusementWhyUs?.cards) && siteData.amusementWhyUs.cards.length > 0)
    ? siteData.amusementWhyUs.cards
    : defaultWhyUsCards;

  const topCards = whyUsCards.slice(0, 3);
  const bottomCards = whyUsCards.slice(3);

  const whyUsIcons = [
    // 1. Full Project, Not Just Equipment
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 2l.6 1.2 1.4.2-1 1 .2 1.4-1.2-.6-1.2.6.2-1.4-1-1 1.4-.2z"/></svg>,
    // 2. Right Attractions For Your Space
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><polyline points="9 12 11 14 15 10"/></svg>,
    // 3. One Team, Zero Confusion
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    // 4. Ready To Open From Day One
    <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
    // 5. We Know What Keeps Visitors Coming Back
    <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>
  ];

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. AMUSEMENT PARK HERO BANNER SECTION (MATCHING 1:1 SECOND IMAGE UI) */}
      <section className="winera-amusement-hero-section" style={{
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
          {/* Centered Single Line Heading: Home › Amusement Park */}
          <h1 className="winera-amusement-hero-title" style={{
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
              {siteData?.amusementHero?.breadcrumbText || "Amusement Park"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. AMUSEMENT PARK RIDE MANUFACTURER IN INDIA SECTION */}
      <section className="winera-amusement-supplier-section" style={{ paddingTop: '0px', paddingBottom: '20px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-amusement-supplier-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Collage Graphic Column */}
          <div className="winera-amusement-supplier-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={getValidImageUrl(siteData?.amusementIntro?.mainImgUrl || siteData?.amusementIntro?.imgUrl, amusementSupplierCollage)}
              alt="Amusement Park Ride Manufacturer in India"
              style={{
                width: '100%',
                maxWidth: '680px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-amusement-supplier-text">
            {/* Yellow Accent Stroke Line */}
            <div className="winera-amusement-title-wrapper" style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.amusementIntro?.title, "*Amusement Park Ride*<br/>Manufacturer in India", '#38bdf8')}
              </h2>
            </div>

            {/* Subtitle Paragraph */}
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '30px' }}>
              {siteData?.amusementIntro?.desc || "India's ROI-first amusement park partner rides and attractions sourced, installed, and serviced by our own team across 50+ cities."}
            </p>

            {/* Action Button: Get Quote From Expert with Yellow Offset Tab Backdrop Wrapper */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.amusementIntro?.buttonLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.amusementIntro?.waMessage || "Hello Winera International! I want to get a quote and details for Amusement Park Rides. Please share details. [Ref: Amusement Park Page]";
                
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
                    {siteData?.amusementIntro?.buttonText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE AMUSEMENT PARK SETUPS, BUILT FOR INDIAN VENUES SECTION */}
      <section className="winera-amusement-banner-section" style={{ paddingTop: '20px', paddingBottom: '30px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-amusement-banner-grid" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.95fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-amusement-banner-text">
            {/* Yellow Accent Stroke Line */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '380px', height: '10px', marginBottom: '12px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, margin: 0 }}>
                {renderTitleMarkup(siteData?.amusementBanner?.title, "Complete Amusement Park<br/>*Setups, Built for Indian Venues*", '#38bdf8')}
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, fontWeight: '500', marginBottom: '20px' }}>
              {siteData?.amusementBanner?.paragraph1 || "Winera International has been supplying and installing amusement park rides and attractions across India since 2014 \u2014 for theme parks, malls, resorts, and family entertainment centres in over 50 cities. We source every ride from established manufacturers, install it with our own team, and stay on for servicing after handover."}
            </p>

            {/* Paragraph 2 */}
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, fontWeight: '500', margin: 0 }}>
              {siteData?.amusementBanner?.paragraph2 || "From a few signature rides to a full park layout, we handle the whole project space planning, ride selection, installation, and after-sales support so you deal with one team from start to finish, not a chain of separate vendors."}
            </p>
          </div>

          {/* Right Collage Graphic Column */}
          <div className="winera-amusement-banner-img" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={getValidImageUrl(siteData?.amusementBanner?.imgUrl, amusementSetupsCollage)}
              alt="Complete Amusement Park Setups Built for Indian Venues"
              style={{
                width: '100%',
                maxWidth: '640px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. RIDES & ATTRACTIONS WE SUPPLY & BEFORE YOU BUILD ROI SECTION */}
      <section className="winera-amusement-options-section" style={{
        width: '100%',
        padding: '75px 4vw',
        background: `url(${getValidImageUrl(siteData?.amusementOptions?.bgUrl, amusementOptionsBg)}) center top / 100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-amusement-options-container" style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '45px'
        }}>
          {/* SUB-BLOCK 1: RIDES & ATTRACTIONS WE SUPPLY */}
          <div className="winera-amusement-options-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left Content Column */}
            <div>
              <div className="winera-amusement-title-wrapper" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '300px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {renderTitleMarkup(siteData?.amusementOptions?.title, "*Rides & Attractions*<br/>We Supply", '#38bdf8')}
                </h2>
              </div>

              <p style={{ fontSize: '13.5px', color: '#475569', fontWeight: '600', lineHeight: 1.5, marginBottom: '20px' }}>
                {siteData?.amusementOptions?.subtitle || "We Supply Many Types Of Rides So You Can Build The Right Experience For Your Space And Visitors."}
              </p>

              {/* Bullet Points List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {rideItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <span style={{ color: '#38bdf8', fontWeight: '900', fontSize: '14px' }}>&#10148;</span>
                    <div>
                      <strong style={{ color: '#0f172a', fontWeight: '800' }}>{item.boldText || item.title} :-</strong>{' '}
                      <span style={{ fontWeight: '500', color: '#475569' }}>{item.desc || item.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', lineHeight: 1.6, margin: 0 }}>
                {siteData?.amusementOptions?.footerText || "Every Ride Comes With Strong Safety Belts, Automatic Sensors That Stop The Ride If Something Goes Wrong, And A Tough, Durable Build. We Test Each Ride On-Site Before Handing It Over To You."}
              </p>
            </div>

            {/* Right Collage Image Column */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={getValidImageUrl(siteData?.amusementOptions?.topImgUrl || siteData?.amusementOptions?.imgUrl, amusementOptionsTopCollage)}
                alt="Rides and Attractions We Supply"
                style={{ width: '100%', maxWidth: '520px', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* SUB-BLOCK 2: BEFORE YOU BUILD, KNOW WHAT IT WILL EARN */}
          <div className="winera-amusement-roi-grid" style={{
            display: 'grid',
            gridTemplateColumns: '0.95fr 1.15fr',
            gap: '50px',
            alignItems: 'center'
          }}>
            {/* Left Image Column */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={getValidImageUrl(siteData?.amusementRoi?.bottomImgUrl || siteData?.amusementRoi?.imgUrl, amusementOptionsBottomImg)}
                alt="Before You Build Know What It Will Earn"
                style={{ width: '100%', maxWidth: '520px', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Right Text Content Column */}
            <div>
              <div className="winera-amusement-title-wrapper" style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '340px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {renderTitleMarkup(siteData?.amusementRoi?.title, "Before You Build,<br/>*Know What It Will Earn*", '#38bdf8')}
                </h2>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', fontWeight: '500', lineHeight: 1.65, marginBottom: '16px' }}>
                {siteData?.amusementRoi?.paragraph1 || "Most Amusement Park Equipment Suppliers In India Hand You A Catalogue And A Price List, Leaving The Financial Planning Entirely To You. As India's ROI-First Game Zone Developer, Winera International Works Differently. Before Recommending, Our Team Prepares A Complete ROI Report For Your Specific Venue Covering Equipment Cost, Projected Daily Visitor Capacity, Estimated Revenue, Maintenance Costs, And Break-Even Timeline."}
              </p>

              <p style={{ fontSize: '13px', color: '#475569', fontWeight: '500', lineHeight: 1.65, marginBottom: '26px' }}>
                {siteData?.amusementRoi?.paragraph2 || "Every Figure Is Calculated Around Your Land Size, Footfall Projection, And Target Visitor Demographic Not An Industry Average. Very Few Amusement Park Manufacturers In India Include This As A Standard Part Of Their Process. For Winera, It Is Where Every Project Begins."}
              </p>

              {/* Action Button: Talk to an ROI Expert */}
              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                {(() => {
                  const baseLink = siteData?.amusementRoi?.buttonLink || "https://wa.me/919428989488";
                  const defaultMsg = siteData?.amusementRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Amusement Park setup & commercial ROI calculation. Please share details. [Ref: Amusement Park Page]";
                  
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
                      {/* WhatsApp Logo SVG Icon */}
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
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.277-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </div>
                      <span>{siteData?.amusementRoi?.buttonText || "Talk to an ROI Expert"}</span>
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WINERA INTERNATIONAL SECTION */}
      <section className="winera-amusement-whyus-section" style={{ paddingTop: '35px', paddingBottom: '45px', paddingLeft: '4vw', paddingRight: '4vw', background: '#F5F5F9', textAlign: 'center' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading Title */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '510px', maxWidth: '100%', height: '11px', marginBottom: '8px', objectFit: 'fill', margin: '0 auto 8px' }}
            />
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.amusementWhyUs?.title, "Why Choose *Winera International*", '#38bdf8')}
            </h2>
          </div>

          {/* Cards Grid Container */}
          <div className="winera-amusement-whyus-container" style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            <div style={{ position: 'relative' }}>
              {/* TOP ROW (3 CARDS) */}
              <div className="winera-amusement-whyus-row" style={{
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
                      padding: '0 30px 30px',
                      textAlign: 'center',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {/* Vertical Shade/Gradient Divider Line for Top Row */}
                    {cIdx < topCards.length - 1 && (
                      <div className="winera-amusement-whyus-vertical-divider" style={{
                        position: 'absolute',
                        right: 0,
                        top: '20px',
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 100%)',
                        zIndex: 3
                      }}></div>
                    )}

                    <div style={{
                      width: '50px',
                      height: '50px',
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
                        whyUsIcons[cIdx % whyUsIcons.length]
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

              {/* Horizontal Center Cyan Divider Line with Shade Fading */}
              {bottomCards.length > 0 && (
                <div className="winera-amusement-whyus-horizontal-divider" style={{
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 12%, #38bdf8 88%, rgba(56, 189, 248, 0.08) 100%)',
                  position: 'relative',
                  zIndex: 3,
                  margin: '0 0 30px'
                }}></div>
              )}

              {/* BOTTOM ROW (2 CARDS) */}
              {bottomCards.length > 0 && (
                <div className="winera-amusement-whyus-row" style={{
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
                        <div className="winera-amusement-whyus-vertical-divider" style={{
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
                        width: '50px',
                        height: '50px',
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
                          whyUsIcons[(topCards.length + bIdx) % whyUsIcons.length]
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
          </div>
        </div>
      </section>

      {/* 7. RELATED PRODUCTS & SECTIONS */}
      <ProjectsMarqueeSection
        siteData={siteData}
        showTopHeader={false}
        simpleTitle={<>OUR <span style={{ color: '#38bdf8' }}>RECENT PROJECTS</span></>}
      />
      <TestimonialsSection siteData={siteData} />
      <RelatedProductsSection sectionData={siteData?.amusementRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />
      <FaqSection faqsList={(Array.isArray(siteData?.amusementFaqs) && siteData.amusementFaqs.length >= 7) ? siteData.amusementFaqs : defaultAmusementFaqs} highlightColor="#38bdf8" />

      {/* CTA BANNER SECTION WITH DYNAMIC CONTENT & EXACT TILTED CARDS MATCHING UI 1:1 */}
      <CtaBanner
        showOverlay={true}
        align="center"
        gradientTitle={true}
        buttonTheme="yellow"
        titleFontSize="45px"
        subtitleFontSize="24px"
        subtitleFontWeight="900"
        bgUrl={siteData?.amusementCta?.bgUrl}
        bg={amusementCtaBg}
        leftImgUrl={siteData?.amusementCta?.leftImgUrl}
        leftImg={amusementLeftImg}
        rightImgUrl={siteData?.amusementCta?.rightImgUrl}
        rightImg={amusementRightImg}
        tagline={null}
        title={
          siteData?.amusementCta?.title
            ? siteData.amusementCta.title
            : "NEED ANY CONSULTATIONS?"
        }
        subtitle={
          siteData?.amusementCta?.subtitle || siteData?.amusementCta?.whiteText
            ? siteData?.amusementCta?.subtitle || siteData?.amusementCta?.whiteText
            : "WE'RE READY TO GIVE ANSWERS TO<br/>YOUR QUESTIONS."
        }
        description={null}
        buttonText={siteData?.amusementCta?.buttonText || "Talk to an ROI Expert"}
        buttonLink={siteData?.amusementCta?.buttonLink || "https://wa.me/919428989488"}
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
