import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import LeadCaptureModal from '../components/LeadCaptureModal';
import trampolineParkBg from '../assets/trampoline-park-hero-bg.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';
import ctaConsultationsBanner from '../assets/cta-consultations-banner.webp';
import qualityBadge from '../assets/quality-badge.webp';
import projNeonPanda from '../assets/proj-neonpanda1.webp';
import trampolineParkImg1 from '../assets/trampoline-park-img1.webp';
import trampolineParkImg2 from '../assets/trampoline-park-img-2.webp';
import trampolineImg3 from '../assets/trampoline-img-3.webp';
import tampolineImg4 from '../assets/tampoline-img-4.webp';
import tampolineImg5 from '../assets/tampoline-img-5.webp';
import tampolineImage6 from '../assets/tampoline-image-6.webp';
import trampolineParkCtaBg from '../assets/trampoline-park-cta-bg.png';

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
  return url;
};

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

export default function TrampolinePark({ siteData }) {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.trampolineSeo?.pageTitle || "Trampoline Park Manufacturer in India | Winera International";
    const metaDesc = siteData?.trampolineSeo?.metaDescription || "Looking for a trampoline park manufacturer in India? Winera International designs and installs custom trampoline parks to your space, vision, and budget.";

    document.title = pageTitle;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'description';
      document.head.appendChild(metaTag);
    }
    metaTag.content = metaDesc;
  }, [siteData]);

  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  const bgImage = siteData?.trampolineHero?.bgUrl || trampolineParkBg;

  const defaultParkZones = [
    {
      id: "free-jump",
      title: "Free Jump Zones",
      desc: "Free jump zones are open trampoline areas where visitors of all ages jump freely without restrictions. They are the primary attraction of any trampoline park — simple to supervise, high throughput, and effective at keeping visitors active throughout their session. Suitable for all age groups from 3 years upward.",
      img: tampolineImg5
    },
    {
      id: "dunk-hoops",
      title: "Dunk Hoops",
      desc: "Dunk hoops are basketball hoops mounted above trampolines so visitors can jump and slam-dunk — something impossible at standard court height. A consistently popular zone with teenagers and young adults that extends session time. Low maintenance and easy to integrate into any free jump area.",
      img: tampolineImg5
    },
    {
      id: "zip-line",
      title: "Zip Line",
      desc: "An indoor zip line where visitors glide from an elevated platform to a foam landing pit. The zip line is an aerial experience that most standard trampoline parks do not include, making it a strong differentiator for venues wanting a premium attraction mix. Suitable for visitors aged 6 and above.",
      img: tampolineImg5
    },
    {
      id: "obstacle-courts",
      title: "Obstacle Courts",
      desc: "Obstacle courts are connected physical challenge courses built across trampoline surfaces jumping, dodging, climbing, and balancing in a single run. They work particularly well for school group bookings, birthday parties, and corporate team events, where structured activity rather than open jumping is preferred.",
      img: tampolineImg5
    },
    {
      id: "air-bags",
      title: "Air Bags",
      desc: "Large soft inflatable bags where visitors land after jumping from a height. Safe and exciting visitors can try flips and aerial jumps without worrying about hard landings. Very popular with teenagers.",
      img: tampolineImg5
    },
    {
      id: "climbing-wall",
      title: "Climbing Wall",
      desc: "Indoor climbing walls where visitors use fixed grips to climb to the top. Winera International is a trusted Climbing Wall Manufacturer in India — offering options from beginner-friendly bouldering walls to more challenging rope climb routes, suitable for all ages and fitness levels.",
      img: tampolineImg5
    },
    {
      id: "ninja-courses",
      title: "Ninja Courses",
      desc: "A set of physical obstacles warped walls, balance beams, hanging bars, rope bridges, and timed speed courses. Winera International is a leading Ninja Course Equipment Manufacturer in India, designing courses for ages 6 and above. Visitors come back again and again to beat their own time and improve their skills.",
      img: tampolineImg5
    },
    {
      id: "foam-cubes",
      title: "Foam Cubes",
      desc: "A large pit filled with soft foam cubes where visitors jump in and land safely. One of the most popular attractions is that children especially love it and tend to spend more time here than any other zone.",
      img: tampolineImg5
    }
  ];

  const cmsInsideZones = siteData?.trampolineInside?.zones || siteData?.trampolineInside?.items;
  const customParkZones = (Array.isArray(cmsInsideZones) && cmsInsideZones.length > 0)
    ? cmsInsideZones.map((z, idx) => ({
        id: z.id || `zone-${idx}`,
        title: z.name || z.title || z.tabName || `Zone ${idx + 1}`,
        desc: z.desc || z.description || '',
        img: z.img || z.imageUrl || tampolineImg5
      }))
    : defaultParkZones;

  const handlePrevZone = () => {
    setActiveZoneIndex((prev) => (prev === 0 ? customParkZones.length - 1 : prev - 1));
  };

  const handleNextZone = () => {
    setActiveZoneIndex((prev) => (prev === customParkZones.length - 1 ? 0 : prev + 1));
  };

  const defaultAttractionItems = [
    {
      title: "Free Jump Arena",
      desc: "Interconnected wall-to-wall trampoline courts with high-bounce mats designed for open jumping, tricks, and high-energy fun."
    },
    {
      title: "Foam Pit & Stunt Airbag Zone",
      desc: "Deep foam cube pits and commercial stunt airbags for jumpers to practice flips and tricks with guaranteed soft landings."
    },
    {
      title: "Dodgeball & Basketball Arena",
      desc: "High-action trampoline dodgeball courts and slam-dunk basketball lanes with adjustable hoops for team play."
    },
    {
      title: "Ninja Warrior Obstacle Course",
      desc: "Multi-level Ninja obstacle courses featuring climbing walls, balance beams, and cargo nets above cushioned impact pits."
    },
    {
      title: "High Performance Trampolines",
      desc: "Olympic-grade webbed trampoline mats with extra-heavy springs for wall jumping, acrobats, and advanced jumpers."
    },
    {
      title: "Toddler & Kids Jump Zone",
      desc: "Dedicated soft enclosed trampoline areas with low height impact padding designed exclusively for kids under 6."
    }
  ];

  const attractionItems = (Array.isArray(siteData?.trampolineAttractions?.items) && siteData.trampolineAttractions.items.length > 0)
    ? siteData.trampolineAttractions.items
    : defaultAttractionItems;

  const defaultWhyUsCards = [
    {
      title: "ASTM F2970 & EN 1176 Certified",
      desc: "Every trampoline park setup adheres strictly to ASTM F2970 international safety practice standards for commercial trampoline courts."
    },
    {
      title: "Heavy-Duty Galvanized Steel Frame",
      desc: "Engineered with 80mm+ thick galvanized steel tubing and high-tensile springs designed for heavy, continuous commercial footfall."
    },
    {
      title: "Turnkey Design & On-Site Installation",
      desc: "Complete 3D space planning, CAD layout, custom padding fabrication, and on-site expert assembly by Winera's trained team."
    },
    {
      title: "Maximized Revenue & Capacity Layout",
      desc: "Designed to optimize square footage, increase venue throughput, and deliver the highest return on investment for game zones."
    }
  ];

  const whyUsCards = (Array.isArray(siteData?.trampolineWhyUs?.cards) && siteData.trampolineWhyUs.cards.length > 0)
    ? siteData.trampolineWhyUs.cards
    : defaultWhyUsCards;

  const defaultFaqs = [
    {
      q: "What is the minimum ceiling height required for a Trampoline Park?",
      a: "Commercial trampoline parks typically require a minimum ceiling height of 16 to 18 feet (5 to 5.5 meters) to ensure safe clearance for jumpers."
    },
    {
      q: "What safety certifications do Winera Trampoline Parks follow?",
      a: "Our trampoline parks comply with ASTM F2970 (International Standard for Trampoline Courts) and EN 1176 standards, featuring flame-retardant padding and non-toxic materials."
    },
    {
      q: "How long does a turnkey trampoline park installation take?",
      a: "From initial CAD layout and manufacturing to on-site assembly and safety checks, a standard 5,000 to 10,000 sq. ft. trampoline park setup takes approximately 30 to 45 days."
    },
    {
      q: "Can you customize trampoline park attractions to fit our space?",
      a: "Yes! We design custom layouts tailored to your exact floor dimensions, incorporating Dodgeball, Ninja Courses, Foam Pits, and Slam Dunk lanes."
    }
  ];

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', overflowX: 'hidden' }}>
      {/* 1. HEADER */}
      <Header headerData={header} />

      {/* 2. HERO BANNER SECTION (MATCHING SCREENSHOT 1:1 WITH TRAMPOLINE PARK BG & BREADCRUMB) */}
      <section className="winera-trampoline-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '175px',
        paddingBottom: '95px',
        background: `url(${bgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Breadcrumb Heading: Home > Trampoline Park */}
          <h1 className="winera-trampoline-hero-h1" style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&gt;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.trampolineHero?.breadcrumbText || "Trampoline Park"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. TRAMPOLINE PARK MANUFACTURER IN INDIA SECTION (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-trampoline-intro-section" style={{ padding: '45px 4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-trampoline-intro-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Image Graphic */}
          <div className="winera-trampoline-intro-img-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <img
              src={siteData?.trampolineIntro?.mainImgUrl || trampolineParkImg1}
              alt="Trampoline Park Manufacturer in India"
              style={{
                width: '100%',
                maxWidth: '620px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Right Column: Title, Description & Cyan CTA Button */}
          <div className="winera-trampoline-intro-text" style={{ textAlign: 'left' }}>
            {/* Yellow Accent Stroke Line */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '14px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '12px', objectFit: 'fill', marginLeft: 0 }}
              />
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.trampolineIntro?.title, "Trampoline Park *Manufacturer in India*", '#38bdf8')}
              </h2>
            </div>

            {/* Description Paragraph */}
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px', maxWidth: '520px' }}>
              {siteData?.trampolineIntro?.desc || siteData?.trampolineIntro?.p1 || "India's trusted trampoline park manufacturer safety-certified equipment, custom-designed layouts, and installed by our own team across India."}
            </p>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              {(() => {
                const baseLink = siteData?.trampolineIntro?.buttonLink || siteData?.trampolineIntro?.ctaLink || "https://wa.me/919428989488";
                const defaultMsg = siteData?.trampolineIntro?.waMessage || "Hello Winera International! I want to get a quote and design details for a Trampoline Park setup. Please share details. [Ref: Trampoline Park Page]";
                
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
                    {siteData?.trampolineIntro?.buttonText || siteData?.trampolineIntro?.ctaText || "Get Quote From Expert"}
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM TRAMPOLINE PARKS BY WINERA INTERNATIONAL BLOCK (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-trampoline-custom-section" style={{ padding: '45px 4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
          {/* Main Content Layout Container */}
          <div className="winera-trampoline-custom-container" style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            {/* Center Content Column: Header + 4-Row Paragraph */}
            <div style={{ textAlign: 'center', maxWidth: '980px', width: '100%', margin: '0 auto', paddingRight: '40px', paddingLeft: '40px' }}>
              {/* Yellow Accent Stroke Line */}
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
              />
              
              {/* H2 Title */}
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: '0 0 14px 0' }}>
                <span>{siteData?.trampolineCustom?.title1 || "Custom Trampoline Parks "}</span>
                <span style={{ color: '#38bdf8' }}>{siteData?.trampolineCustom?.title2 || "by Winera"}</span><br />
                <span style={{ color: '#38bdf8' }}>{siteData?.trampolineCustom?.title3 || "International"}</span>
              </h2>

              {/* 4-Row Wide Paragraph Text */}
              <p style={{
                fontSize: '15.5px',
                color: '#475569',
                lineHeight: 1.65,
                fontWeight: '500',
                margin: '0 auto',
                maxWidth: '960px',
                textAlign: 'center'
              }}>
                {siteData?.trampolineCustom?.paragraph || "At Winera International, we specialize in creating custom-built trampoline parks tailored to your space, budget, and activity preferences. As a leading trampoline manufacturer in India we ensure top-quality design, safety, and durability in every project. Whether you're envisioning a compact jump zone or a large-scale interactive entertainment center, we are the trampoline park manufacturer that delivers complete turnkey solutions to bring your vision to life. We have been designing and supplying commercial trampoline parks for malls, hotels, schools, resorts, and family entertainment centres since 2014."}
              </p>
            </div>

            {/* Right Side Compact Mascot Panda Image */}
            <div className="winera-trampoline-mascot-img" style={{
              position: 'absolute',
              right: '0px',
              top: '65px',
              zIndex: 2
            }}>
              <img
                src={siteData?.trampolineCustom?.imgUrl || trampolineParkImg2}
                alt="Custom Trampoline Parks by Winera International"
                style={{
                  width: '165px',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL SPECIFICATIONS BLOCK (MATCHING SCREENSHOT 1:1) */}
      <section className="winera-trampoline-specs-section" style={{ padding: '45px 4vw', background: '#F5F5F9', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Main Card Wrapper with trampoline-img-3.webp Background */}
          <div className="winera-trampoline-specs-card" style={{
            position: 'relative',
            width: '100%',
            minHeight: '540px',
            background: `url(${siteData?.trampolineSpecs?.bgUrl || siteData?.trampolineSpecs?.imgUrl || trampolineImg3}) center center / 100% 100% no-repeat`,
            borderRadius: '32px',
            padding: '45px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)'
          }}>
            {/* Left Section Content: Title + White Table Card + Button */}
            <div style={{ maxWidth: '530px', zIndex: 2 }}>
              {/* Yellow Accent Stroke Line */}
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', maxWidth: '100%', width: '240px', height: '8px', marginBottom: '8px', objectFit: 'fill', marginLeft: 0 }}
              />

              {/* Title */}
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ffffff', margin: '0 0 28px 0', lineHeight: 1.15 }}>
                {renderTitleMarkup(siteData?.trampolineSpecs?.title, "Technical *Specifications*", '#ffd600')}
              </h2>

              {/* White Specifications Table Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '24px 28px',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                width: '100%',
                marginBottom: '28px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 12px 0', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', width: '48%' }}>
                        Specification
                      </th>
                      <th style={{ textAlign: 'left', padding: '0 0 12px 0', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', width: '52%' }}>
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {((Array.isArray(siteData?.trampolineSpecs?.specsData) && siteData.trampolineSpecs.specsData.length > 0)
                      ? siteData.trampolineSpecs.specsData
                      : [
                          { label: "Minimum space required", value: "2,000 sq ft" },
                          { label: "Ceiling height required", value: "4.5 m minimum" },
                          { label: "Weight capacity", value: "150 kg per mat" },
                          { label: "Frame", value: "Hot-dip galvanized steel" },
                          { label: "Jump mats", value: "UV-stabilized polypropylene mesh" },
                          { label: "Springs", value: "Zinc-coated carbon steel" },
                          { label: "Expected lifespan", value: "8–12 years" }
                        ]
                    ).map((row, idx, arr) => (
                      <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 0', fontSize: '14px', color: '#475569', fontWeight: '500' }}>
                          {row.label || row.spec}
                        </td>
                        <td style={{ padding: '10px 0', fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>
                          {row.value || row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm" style={{ marginTop: '24px' }}>
                <a
                  href={siteData?.trampolineSpecs?.buttonLink || siteData?.trampolineSpecs?.brochureLink || siteData?.trampolineIntro?.buttonLink || "https://wa.me/919428989488"}
                  target="_blank"
                  rel="noreferrer"
                  className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                >
                  {siteData?.trampolineSpecs?.buttonText || "Download Our Brochure"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT IS INSIDE A CUSTOM TRAMPOLINE PARK? (100% FULL SCREEN WIDTH BACKGROUND MATCHING SCREENSHOT 2) */}
      <section className="winera-trampoline-inside-section" style={{
        padding: '0',
        background: '#F5F5F9',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Outer Frame Container with tampoline-img-4.webp Full 100% Width Edge-to-Edge Background */}
        <div className="winera-trampoline-inside-frame" style={{
          position: 'relative',
          width: '100%',
          background: `url(${tampolineImg4}) center center / 100% 100% no-repeat`,
          padding: '45px 0',
          overflow: 'hidden'
        }}>
          {/* Inner Content Centered Container */}
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 4vw' }}>
            
            {/* Header: Title + Intro text */}
            <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 35px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: '0 0 12px 0' }}>
                {renderTitleMarkup(siteData?.trampolineInside?.title, "What is inside a *custom<br />trampoline park?*", '#38bdf8')}
              </h2>
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {siteData?.trampolineInside?.subtitle || "A Winera trampoline park is built around your available space and visitor profile. Below are the zones you can include each can be combined in any configuration based on your floor area and budget."}
              </p>
            </div>

            {/* Carousel Container: Left Arrow + Figma Styled Card + Right Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              position: 'relative',
              maxWidth: '1180px',
              margin: '0 auto 40px'
            }}>
              {/* Left Arrow Button with Hover Effect */}
              <button
                onClick={handlePrevZone}
                aria-label="Previous Zone"
                className="winera-zone-nav-btn"
              >
                &#10094;
              </button>

              {/* Inner Tab Card with Smaller Image & Spacious Left Padding Matching Second Image */}
              <div style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.85) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0px',
                border: 'none',
                boxShadow: 'none',
                padding: '35px 45px',
                gap: '45px',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
                alignItems: 'center',
                flexGrow: 1,
                width: '100%',
                minHeight: '350px'
              }} className="winera-trampoline-zone-card">
                {/* Left Side Compact Zone Image */}
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={customParkZones[activeZoneIndex].img}
                    alt={customParkZones[activeZoneIndex].title}
                    style={{
                      width: '100%',
                      maxHeight: '260px',
                      objectFit: 'cover',
                      borderRadius: '0px',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Right Side Zone Content */}
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.2 }}>
                    {customParkZones[activeZoneIndex].title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.68, fontWeight: '500', margin: 0 }}>
                    {customParkZones[activeZoneIndex].desc}
                  </p>
                </div>
              </div>

              {/* Right Arrow Button with Hover Effect */}
              <button
                onClick={handleNextZone}
                aria-label="Next Zone"
                className="winera-zone-nav-btn"
              >
                &#10095;
              </button>
            </div>

            {/* Bottom Tab Bar Navigation with Extra Bottom Spacing */}
            <div style={{ maxWidth: '1180px', margin: '0 auto 28px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
              <div className="winera-trampoline-tabs-wrapper" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '6px'
              }}>
                {customParkZones.map((zone, idx) => {
                  const isActive = activeZoneIndex === idx;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZoneIndex(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderTop: isActive ? '3px solid #28b4ee' : '3px solid transparent',
                        paddingTop: '8px',
                        cursor: 'pointer',
                        fontSize: '14.5px',
                        fontWeight: '700',
                        color: isActive ? '#0f172a' : '#64748b',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {zone.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 WHAT WILL YOUR TRAMPOLINE PARK ACTUALLY EARN? (ROI SECTION MATCHING SCREENSHOT) */}
      <section className="winera-trampoline-roi-earn-section" style={{
        padding: '45px 4vw',
        background: '#F8FAFC',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 45px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.18, margin: '0 0 14px 0' }}>
              {renderTitleMarkup(siteData?.trampolineRoi?.title, "What Will Your *Trampoline<br />Park Actually Earn?*", '#28b4ee')}
            </h2>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
              {siteData?.trampolineRoi?.subtitle || "Most trampoline park suppliers in India send a price list and wait for you to decide."}
            </p>
          </div>

          {/* 2-Column Grid: Text Content + Graphic */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 520px)',
            gap: '45px',
            alignItems: 'center'
          }} className="winera-trampoline-roi-grid">
            
            {/* Left Column: Text Copy & CTA Button */}
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '0 0 20px 0' }}>
                {siteData?.trampolineRoi?.paragraph1 || "As India's ROI-First Game Zone Developer, Winera International works differently. Before a single design is drawn, our team prepares a complete ROI report for your specific venue covering your exact trampoline park setup cost, projected daily footfall, estimated monthly revenue, maintenance costs, and break-even timeline. Every figure is calculated around your location, your venue type, and your visitor profile, not an industry average."}
              </p>

              <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.7, fontWeight: '500', margin: '0 0 32px 0' }}>
                {siteData?.trampolineRoi?.paragraph2 || "Very few indoor trampoline park suppliers in India include this as a standard part of their process. For Winera, the ROI report is not an add-on, it is how every project starts."}
              </p>

              {/* CTA Button with Left-Bottom & Right-Top Offset Yellow Backdrop and WhatsApp Icon */}
              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                {(() => {
                  const baseLink = siteData?.trampolineRoi?.buttonLink || "https://wa.me/919428989488";
                  const defaultMsg = siteData?.trampolineRoi?.waMessage || "Hello Winera International! I want to talk to an ROI Expert for Trampoline Park setup & commercial ROI calculation. Please share details. [Ref: Trampoline Park Page]";
                  
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
                      {/* Proper contrasted WhatsApp Icon wrapper */}
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
                      <span>{siteData?.trampolineRoi?.buttonText || "Talk to an ROI Expert"}</span>
                    </a>
                  );
                })()}
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div style={{ textAlign: 'center' }}>
              <img
                src={siteData?.trampolineRoi?.imgUrl || tampolineImage6}
                alt="Trampoline Park ROI Report"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '520px',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING SECOND SCREENSHOT 1:1) */}
      <section className="winera-trampoline-why-choose-section" style={{
        padding: '45px 4vw',
        background: '#F8FAFC',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          {/* Header (Single Line Title & Reduced Top Spacing) */}
          <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto 35px' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: '0' }} className="winera-why-h2">
              {renderTitleMarkup(siteData?.trampolineWhyChoose?.title, "Why Choose *Winera International*", '#28b4ee')}
            </h2>
          </div>

          {/* Value Props Container */}
          {(() => {
            const itemsList = (Array.isArray(siteData?.trampolineWhyChoose?.items) && siteData.trampolineWhyChoose.items.length > 0)
              ? siteData.trampolineWhyChoose.items
              : [
                  { title: "Premium Quality", desc: "Commercial-Grade Materials Built To Survive Years Of Heavy Daily Jumping." },
                  { title: "Safety First", desc: "Foam-Padded Frames, Safety Nets, And Certified Equipment On Every Build." },
                  { title: "Custom Solutions", desc: "Layouts And Zone Mixes Designed Around Your Space, Budget, And Visitors." },
                  { title: "Competitive Pricing", desc: "Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report." },
                  { title: "Prompt Delivery", desc: "Manufactured In-House And Installed On Schedule By Our Own Team." }
                ];
            const topRow = itemsList.slice(0, 3);
            const bottomRow = itemsList.slice(3);

            return (
              <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
                {/* Top Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${topRow.length || 1}, 1fr)`,
                  gap: '0px',
                  position: 'relative'
                }} className="winera-why-top-grid">
                  {topRow.map((item, idx) => (
                    <div key={idx} style={{ padding: '20px 30px 30px', textAlign: 'center', position: 'relative' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55, fontWeight: '500', margin: 0 }}>
                        {item.desc}
                      </p>
                      {idx < topRow.length - 1 && (
                        <div className="winera-v-line" style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '1.5px',
                          background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.05) 0%, rgba(56, 189, 248, 0.65) 100%)'
                        }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Horizontal Separator */}
                {bottomRow.length > 0 && (
                  <div style={{
                    height: '1.5px',
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.05) 0%, rgba(56, 189, 248, 0.65) 50%, rgba(56, 189, 248, 0.05) 100%)',
                    margin: '0'
                  }} />
                )}

                {/* Bottom Row */}
                {bottomRow.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${bottomRow.length}, 1fr)`,
                    gap: '0px',
                    maxWidth: bottomRow.length === 2 ? '780px' : '1080px',
                    margin: '0 auto',
                    position: 'relative'
                  }} className="winera-why-bottom-grid">
                    {bottomRow.map((item, idx) => (
                      <div key={idx} style={{ padding: '30px 30px 20px', textAlign: 'center', position: 'relative' }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '14px',
                          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                          boxShadow: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px'
                        }}>
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                            <line x1="8" y1="21" x2="16" y2="21"/>
                            <line x1="12" y1="17" x2="12" y2="21"/>
                          </svg>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.55, fontWeight: '500', margin: 0 }}>
                          {item.desc}
                        </p>
                        {idx < bottomRow.length - 1 && (
                          <div className="winera-v-line" style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '1.5px',
                            background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.65) 0%, rgba(56, 189, 248, 0.05) 100%)'
                          }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* PROJECTS MARQUEE SECTION (OUR RECENT PROJECTS MATCHING VR GAMES PAGE 1:1) */}
      <ProjectsMarqueeSection
        siteData={siteData}
        showTopHeader={false}
        simpleTitle={<>OUR <span style={{ color: '#38bdf8' }}>RECENT PROJECTS</span></>}
      />

      {/* TESTIMONIALS SECTION (WHAT OUR CLIENTS SAY) */}
      <TestimonialsSection siteData={siteData} />

      {/* RELATED PRODUCTS SECTION */}
      <RelatedProductsSection sectionData={siteData?.trampolineRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <FaqSection
        faqsList={(Array.isArray(siteData?.trampolineFaqs) && siteData.trampolineFaqs.length > 0)
          ? siteData.trampolineFaqs
          : [
              {
                q: "Why does Winera International stand out as the best trampoline park manufacturer in India?",
                a: "Winera International manufactures every trampoline park in-house, offers a free ROI report before every project, and installs across 50+ cities through our own team, not a third-party contractor. One partner, from 3D design to after-sales support."
              },
              {
                q: "What is the trampoline park setup cost in India?",
                a: "Trampoline park setup cost in India depends on the facility size, number of attractions, and materials selected. Winera provides a complete cost breakdown — equipment, installation, and maintenance — before confirming any project. Contact our team for a quote specific to your space."
              },
              {
                q: "Is a trampoline park a profitable business in India?",
                a: "Yes, when located in a suitable venue with the right zone mix and pricing model. Trampoline parks generate revenue through entry fees, birthday party packages, school group bookings, corporate events, and membership plans. Winera prepares a free ROI report before every project showing your specific venue's projected daily capacity, estimated monthly revenue, and break-even timeline."
              },
              {
                q: "What licenses or permissions are required to open a trampoline park in India?",
                a: "Requirements vary by state and municipality but typically include a trade license, fire safety NOC, building use permission, and public liability insurance. Winera's team can guide you on general requirements based on your city and consult a local legal advisor for state-specific compliance."
              },
              {
                q: "What maintenance does a commercial trampoline park require?",
                a: "Winera trampoline parks are designed for 8–12 years of commercial operation with regular maintenance. Routine checks include: jump mat tension and condition, spring integrity, foam padding wear, safety net inspection, and frame connection points. A standard maintenance schedule and checklist is provided with every installation. Annual professional servicing is recommended."
              },
              {
                q: "What is the ideal target audience for a trampoline park in India?",
                a: "Children aged 5–15 years form the core audience, but modern trampoline parks increasingly serve teenagers, young adults, and corporate groups through ninja courses, dodgeball arenas, and team-building packages — making them viable for a much wider demographic than traditional play zones."
              }
            ]}
        title="Frequently Asked *Questions*"
      />

      {/* TRAMPOLINE PARK CTA SECTION */}
      <section style={{ padding: '45px 4vw', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            backgroundImage: `url(${getValidImageUrl(
              siteData?.trampolineCta?.bgUrl && !siteData.trampolineCta.bgUrl.includes('tampoline-image-7')
                ? siteData.trampolineCta.bgUrl
                : null,
              trampolineParkCtaBg
            )})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            padding: '20px 30px',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
            position: 'relative',
            overflow: 'hidden'
          }} className="winera-trampoline-cta-card">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              lineHeight: 1.25,
              background: 'linear-gradient(90deg, rgba(255, 212, 0, 1) 0%, rgba(238, 229, 183, 1) 32%, rgba(255, 255, 255, 1) 68%, rgba(202, 244, 255, 1) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.85))',
              display: 'inline-block'
            }} className="winera-cta-h2">
              <span>{siteData?.trampolineCta?.titleLine1 !== undefined ? siteData.trampolineCta.titleLine1 : "PLAN YOUR TRAMPOLINE PARK"}</span>
              <br />
              <span>{siteData?.trampolineCta?.titleLine2 !== undefined ? siteData.trampolineCta.titleLine2 : "WITH WINERA"}</span>
            </h2>
            <p style={{
              fontSize: '15.5px',
              color: '#f1f5f9',
              maxWidth: '740px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
              fontWeight: '500'
            }} className="winera-cta-p">
              <span>{siteData?.trampolineCta?.descLine1 || "Our team will assess your venue, prepare a free ROI report, and"}</span>
              <br />
              <span>{siteData?.trampolineCta?.descLine2 || "recommend the right zone mix for your space."}</span>
            </p>

            {/* Offset Rotated Backdrop Button with Yellow BG & White Border */}
            <div className="winera-yellow-white-cta-wrapper winera-yellow-white-cta-wrapper-sm">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="winera-yellow-white-cta-btn winera-yellow-white-cta-btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {/* Proper contrasted WhatsApp Icon wrapper */}
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
                <span>{siteData?.trampolineCta?.buttonText || "Get Quote Now"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pageSource="Trampoline Park Page"
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
