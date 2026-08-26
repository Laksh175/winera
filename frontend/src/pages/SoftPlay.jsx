import React from 'react';
import { MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import TestimonialsSection from '../components/TestimonialsSection';
import RelatedProductsSection from '../components/RelatedProductsSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import needConsultationsBg from '../assets/need-consultations-bg.png';
import ctaSoftplayBg from '../assets/cta-softplay-bg.png';
import softplayHeroBg from '../assets/softplay-hero-bg.png';
import logoImg from '../assets/logo.png';
import about1 from '../assets/about-1.png';
import about2 from '../assets/about-2.png';
import about3 from '../assets/about-3.png';
import about4 from '../assets/about-4.png';
import projSoft1 from '../assets/proj-softplay1.png';
import softplayCastle3d from '../assets/softplay-castle-3d.png';
import softplaySpecsBg from '../assets/softplay-specs-bg.png';
import softplayMaterialsBg from '../assets/softplay-materials-bg.png';
import softplayRoiBg from '../assets/softplay-roi-bg.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';
import softPlayImg from '../assets/soft-play.png';
import allImg from '../assets/all.png';
import groupImg from '../assets/group-image.png';

// Helper function to render title with *word* highlights and <br/> linebreaks (supporting * across breaks)
const renderTitleMarkup = (rawText, defaultText, highlightColor = '#38bdf8') => {
  const text = rawText || defaultText;
  const parts = text.split(/\*{1,2}(.*?)\*{1,2}/gs);

  return parts.map((part, pIdx) => {
    const isHighlighted = pIdx % 2 === 1;

    // Process line breaks inside this part
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

export default function SoftPlay({ siteData }) {
  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Soft Play...</div>;

  const { header, footer } = siteData;
  const heroBgImage = siteData?.softplayHero?.bgUrl || softplayHeroBg;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. SOFT PLAY HERO BANNER SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-hero-section" style={{
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
          {/* Main Title / Breadcrumb: Home › Soft Play */}
          <h1 className="winera-softplay-hero-h1" style={{
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
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>{siteData?.softplayHero?.breadcrumbText || "Soft Play"}</span>
          </h1>
        </div>
      </section>

      {/* 3. INDOOR SOFT PLAY EQUIPMENT MANUFACTURER IN INDIA SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-supplier-section" style={{ padding: '90px 4vw 100px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-softplay-supplier-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '70px',
          alignItems: 'center'
        }}>
          {/* Left Side Direct Soft Play Image */}
          <div className="winera-softplay-supplier-img" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={softPlayImg}
              alt="Indoor Soft Play Equipment Manufacturer"
              style={{
                width: '100%',
                maxWidth: '540px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Right Text Content Column */}
          <div className="winera-softplay-supplier-text">
            {/* Section Title Header */}
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.softplayIntro?.title, "*Indoor Soft Play*<br/>Equipment Manufacturer in India")}
              </h2>
            </div>

            {/* Subtitle Description Paragraph */}
            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.65, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.softplayIntro?.desc || "India's trusted soft play equipment manufacturer custom designed, safety certified, and installed by our own team across India."}
            </p>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.softplayIntro?.buttonLink || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {siteData?.softplayIntro?.buttonText || "Get Quote From Expert"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOFT PLAY EQUIPMENT MANUFACTURE SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-intro-section" style={{ padding: '80px 4vw 90px', background: '#F5F5F9', overflow: 'hidden' }}>
        <div className="winera-softplay-intro-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Text Content */}
          <div className="winera-softplay-intro-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '20px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.7rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.softplayManufacture?.title, "Soft Play *Equipment Manufacture*")}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '16px' }}>
              {siteData?.softplayManufacture?.p1 || "At Winera International, we are one of India's leading soft play equipment manufacturers, designing and supplying custom indoor play areas for kids across malls, hotels, schools, hospitals, and family entertainment centres since 2014. As a direct soft play manufacturer in India, we ensure every project starts with a detailed 3D design and ends with a fully installed, safety-certified play zone with our own team managing every step from concept to handover."}
            </p>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.65, fontWeight: '500', marginBottom: '32px' }}>
              {siteData?.softplayManufacture?.p2 || "Whether you are setting up a compact 500 sq ft play corner or a large-scale interactive soft play zone, we deliver indoor kids play zone equipment tailored precisely to your space, budget, and audience, not a pre-packaged, off-the-shelf solution."}
            </p>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.softplayManufacture?.videoUrl || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {siteData?.softplayManufacture?.btnText || "Watch Video"}
              </a>
            </div>
          </div>

          {/* Right 3D Soft Play Castle Equipment Render */}
          <div className="winera-softplay-intro-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={siteData?.softplayManufacture?.imgUrl || softplayCastle3d}
              alt="Soft Play Equipment Manufacture 3D Castle Render"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL SPECIFICATIONS SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-specs-section" style={{ padding: '40px 4vw 90px', background: '#F5F5F9' }}>
        <div className="winera-softplay-specs-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '40px',
          overflow: 'hidden',
          background: `url(${siteData?.softplaySpecs?.bgUrl || softplaySpecsBg}) center/cover no-repeat`,
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
              {renderTitleMarkup(siteData?.softplaySpecs?.title, "*Technical* Specifications", "#ffcd00")}
            </h2>
          </div>

          {/* Center Table Card with White Background & Yellow Border Stroke matching Screenshot 1:1 */}
          <div className="winera-softplay-specs-table-card" style={{
            width: '100%',
            maxWidth: '560px',
            boxSizing: 'border-box',
            background: '#ffffff',
            borderRadius: '28px',
            border: '2.5px solid #ffcd00',
            padding: '28px 32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0' }}>
                  <th style={{ paddingBottom: '16px', fontSize: '22px', fontWeight: '800', color: '#0f172a', width: '44%' }}>Specification</th>
                  <th style={{ paddingBottom: '16px', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.softplaySpecs?.specsList) && siteData.softplaySpecs.specsList.length > 0
                  ? siteData.softplaySpecs.specsList
                  : defaultSpecsList
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 12px 12px 0', fontWeight: '500', color: '#334155', fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word' }}>{row.spec}</td>
                    <td style={{ padding: '12px 0', fontWeight: '500', color: '#334155', fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word' }}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. MATERIALS QUALITY THAT DEFINES A TRUSTED SOFT PLAY MANUFACTURER SECTION (FULL WIDTH BG MATCHING FIGMA) */}
      <section className="winera-softplay-materials-section" style={{
        position: 'relative',
        width: '100%',
        padding: '90px 4vw',
        background: `url(${siteData?.softplayMaterials?.bgUrl || softplayMaterialsBg}) center/100% 100% no-repeat`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          position: 'relative'
        }}>
          {/* Equal 2-Column Grid Layout Vertically Centered */}
          <div className="winera-softplay-materials-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left Column: Heading, Subtitle & Below Image */}
            <div className="winera-softplay-materials-text">
              {/* Main Title Header */}
              <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
                <img
                  src={yellowStrokeLine}
                  alt=""
                  style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
                />
                <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                  {renderTitleMarkup(siteData?.softplayMaterials?.title, "*Materials Quality That Defines a* Trusted Soft Play Manufacturer")}
                </h2>
              </div>

              {/* Subtitle intro description */}
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '28px' }}>
                {siteData?.softplayMaterials?.desc || "Every component in a Winera soft play structure is selected to perform reliably under heavy daily commercial use, not occasional play. Here is what goes into every build:"}
              </p>

              {/* Left Photo Card with all.png */}
              <div style={{ position: 'relative', width: '100%' }}>
                <img
                  src={allImg}
                  alt="Premium Materials Exceptional Durability Soft Play"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    display: 'block',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
                  }}
                />
              </div>
            </div>

            {/* Right Column: Subpoints List Vertically Centered */}
            <div className="winera-softplay-materials-points" style={{ display: 'flex', flexDirection: 'column', gap: '22px', justifyContent: 'center' }}>
              {(Array.isArray(siteData?.softplayMaterials?.subpoints) && siteData.softplayMaterials.subpoints.length > 0
                ? siteData.softplayMaterials.subpoints
                : defaultMaterialsSubpoints
              ).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Black Checkmark Icon */}
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', marginTop: '1px' }}>✓</span>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.55, fontWeight: '500', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TYPES OF SOFT PLAY ZONES WE DESIGN & INSTALL SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-timeline-section" style={{ padding: '90px 4vw 100px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '70px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.softplayTypes?.title, "Types of Soft Play Zones *We<br />Design & Install*")}
            </h2>
          </div>

          {/* Vertical Timeline Tree Container */}
          <div style={{ position: 'relative', maxWidth: '1150px', margin: '0 auto' }}>
            {/* Center Vertical Cyan Line */}
            <div className="winera-softplay-timeline-line" style={{
              position: 'absolute',
              top: '80px',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2.5px',
              background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
              zIndex: 1
            }}></div>

            {/* Timeline Steps (Zig-Zag Left / Right Layout matching Figma 1:1) */}
            {(Array.isArray(siteData?.softplayTypes?.typesList) && siteData.softplayTypes.typesList.length > 0
              ? siteData.softplayTypes.typesList
              : defaultTypesList
            ).map((stepItem, idx, arr) => {
              const defaultImgs = [about1, about2, about3, about4];
              const imgUrl = stepItem.img || siteData?.softplayTypes?.[`step${idx + 1}Img`] || defaultImgs[idx % defaultImgs.length];
              const alignLeft = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className="winera-softplay-timeline-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center',
                    marginBottom: idx === arr.length - 1 ? 0 : '80px',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {/* Horizontal Rule Connector Line between Number Badge & Image Box */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: alignLeft ? '50%' : 'calc(50% - 40px)',
                    width: '40px',
                    height: '2px',
                    background: '#64748b',
                    transform: 'translateY(-50%)',
                    zIndex: 5
                  }}></div>

                  {/* Number Badge Pill directly on the Center Vertical Line */}
                  <div className="winera-softplay-timeline-badge" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(56, 189, 248, 0.45)',
                    zIndex: 10
                  }}>
                    {idx + 1}
                  </div>

                  {/* Left Side Element */}
                  <div className={alignLeft ? "winera-softplay-timeline-text-col" : "winera-softplay-timeline-img-col"} style={{ textAlign: alignLeft ? 'left' : 'right' }}>
                    {alignLeft ? (
                      <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#38bdf8', marginBottom: '14px', lineHeight: 1.2 }}>
                          {stepItem.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                          {stepItem.desc}
                        </p>
                      </div>
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '300px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                        background: `url(${imgUrl}) center/cover no-repeat`
                      }}></div>
                    )}
                  </div>

                  {/* Right Side Element */}
                  <div className={alignLeft ? "winera-softplay-timeline-img-col" : "winera-softplay-timeline-text-col"} style={{ textAlign: alignLeft ? 'right' : 'left' }}>
                    {alignLeft ? (
                      <div style={{
                        width: '100%',
                        height: '300px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                        background: `url(${imgUrl}) center/cover no-repeat`
                      }}></div>
                    ) : (
                      <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#38bdf8', marginBottom: '14px', lineHeight: 1.2 }}>
                          {stepItem.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, fontWeight: '500', margin: 0 }}>
                          {stepItem.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
            <a
              href={siteData?.softplaySpecs?.brochureUrl || siteData?.softplayTypes?.brochureUrl || "#"}
              target="_blank"
              rel="noreferrer"
              download
              className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
            >
              Download Our Brochure
            </a>
          </div>
        </div>
      </section>

      {/* 8. KNOW YOUR RETURNS BEFORE YOU INVEST SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-roi-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 4vw 90px',
        background: `url(${siteData?.softplayRoi?.bgUrl || softplayRoiBg}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div className="winera-softplay-roi-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Text Content Column */}
          <div className="winera-softplay-roi-text">
            <div style={{ position: 'relative', display: 'block', marginBottom: '16px' }}>
              <img
                src={yellowStrokeLine}
                alt=""
                style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
              />
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
                {renderTitleMarkup(siteData?.softplayRoi?.title, "Know Your Returns<br />*Before You Invest*")}
              </h2>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '14px' }}>
              {siteData?.softplayRoi?.p1 || "Most soft play suppliers will quote you a price and ask you to decide. Winera International works differently."}
            </p>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '14px' }}>
              {siteData?.softplayRoi?.p2 || "Before any equipment is selected, our team prepares a complete ROI report for your specific venue covering your exact soft play area cost, projected monthly footfall, estimated revenue, maintenance costs, and break-even timeline. Every number is calculated around your space, your city, and your business, not an industry average copied from a brochure."}
            </p>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, fontWeight: '500', marginBottom: '28px' }}>
              {siteData?.softplayRoi?.p3 || "No other soft play manufacturer or supplier in India currently offers this as a standard part of their process. For Winera, it is not an add-on, it is how every project starts."}
            </p>

            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={siteData?.softplayRoi?.buttonLink || "https://wa.me/919428989488"}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {/* Official 1:1 WhatsApp Logo SVG Icon */}
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
                <span>{siteData?.softplayRoi?.buttonText || "Talk to an ROI Expert"}</span>
              </a>
            </div>
          </div>

          {/* Right Column: direct rendering of group-image.png */}
          <div className="winera-softplay-roi-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={groupImg}
              alt="Know Your Returns ROI Report"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE WINERA INTERNATIONAL SECTION (MATCHING FIGMA 1:1) */}
      <section className="winera-softplay-whyus-section" style={{ padding: '90px 4vw 100px', background: '#F5F5F9' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={yellowStrokeLine}
              alt=""
              style={{ display: 'block', width: '320px', height: '10px', marginBottom: '10px', objectFit: 'fill' }}
            />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.15, margin: 0 }}>
              {renderTitleMarkup(siteData?.softplayWhyUs?.title, "Why Choose *Winera International*")}
            </h2>
          </div>          {/* 5 Cards Grid Container (Dynamic List with Thin Blue Dividers) */}
          <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
            {(() => {
              const cards = (Array.isArray(siteData?.softplayWhyUs?.cardsList) && siteData.softplayWhyUs.cardsList.length > 0)
                ? siteData.softplayWhyUs.cardsList
                : defaultWhyUsCards;

              // Dynamic top/bottom row splitting:
              // If cards count <= 3: 1 row with N cards.
              // If cards count > 3: Top row gets Math.ceil(total / 2) [or 3 if 5 or 6], bottom row gets remainder centered.
              // E.g. 5 cards -> 3 top, 2 bottom centered.
              // E.g. 6 cards -> 3 top, 3 bottom.
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

              const defaultIcons = [
                <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
                <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
                <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
                <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
                <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>
              ];

              return (
                <div style={{ position: 'relative' }}>
                  {/* TOP ROW */}
                  <div className="winera-softplay-whyus-row winera-softplay-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    gap: '0px',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-softplay-whyus-card"
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
                          <div className="winera-softplay-whyus-divider" style={{
                            position: 'absolute',
                            right: 0,
                            top: '20px',
                            bottom: 0,
                            width: '2px',
                            background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, #38bdf8 100%)',
                            zIndex: 3
                          }}></div>
                        )}

                        {/* Cyan Icon Pill Badge */}
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                          boxShadow: '0 6px 16px rgba(56, 189, 248, 0.35)'
                        }}>
                          {card.iconUrl ? (
                            <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                          ) : (
                            defaultIcons[cIdx % defaultIcons.length]
                          )}
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                          {card.title}
                        </h3>
                        <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.55, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Center Cyan Divider Line with Shade Fading */}
                  {bottomCards.length > 0 && (
                    <div className="winera-softplay-whyus-horizontal-divider" style={{
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
                    <div className="winera-softplay-whyus-row winera-softplay-whyus-bottom-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                      maxWidth: bottomCards.length === 2 ? '740px' : '100%',
                      margin: '0 auto',
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {bottomCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="winera-softplay-whyus-card"
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
                          {cIdx < bottomCards.length - 1 && (
                            <div className="winera-softplay-whyus-divider" style={{
                              position: 'absolute',
                              right: 0,
                              top: '-30px',
                              bottom: '20px',
                              width: '2px',
                              background: 'linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.08) 100%)',
                              zIndex: 3
                            }}></div>
                          )}

                          {/* Cyan Icon Pill Badge */}
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: '0 6px 16px rgba(56, 189, 248, 0.35)'
                          }}>
                            {card.iconUrl ? (
                              <img src={card.iconUrl} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                            ) : (
                              defaultIcons[(topCards.length + cIdx) % defaultIcons.length]
                            )}
                          </div>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                            {card.title}
                          </h3>
                          <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.55, fontWeight: '500', margin: 0, maxWidth: '280px' }}>
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

      {/* 10. OUR RECENT PROJECT SHOWCASE SECTION */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Project</span></>}
      />

      {/* 11. WHAT OUR CLIENTS SAY SECTION (PERSISTED TESTIMONIALS DATA) */}
      <TestimonialsSection
        testimonials={siteData?.testimonials}
        title={siteData?.testimonialsHeader?.title}
        subtitle={siteData?.testimonialsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 12. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection sectionData={siteData?.softplayRelated || siteData?.arcadeRelated} accentColor="#38bdf8" />

      {/* 13. FREQUENTLY ASKED QUESTIONS SECTION (DYNAMIC SOFT PLAY FAQS) */}
      <FaqSection
        faqList={Array.isArray(siteData?.softplayFaqs) && siteData.softplayFaqs.length > 0 ? siteData.softplayFaqs : defaultSoftPlayFaqs}
        title={siteData?.faqsHeader?.title}
        subtitle={siteData?.faqsHeader?.subtitle}
        highlightColor="#38bdf8"
      />

      {/* 14. READY TO BUILD YOUR SOFT PLAY ZONE CTA BANNER SECTION */}
      <CtaBanner
        align="center"
        bg={siteData?.softplayCta?.bgUrl || ctaSoftplayBg}
        subtitle={siteData?.softplayCta?.subtitle ?? "Get in touch with India's trusted soft play equipment manufacturer for a free 3D design, complete ROI report, and project quote tailored to your exact space and budget"}
        title={
          <span style={{ color: '#ffffff', letterSpacing: '-0.5px' }}>
            {(() => {
              const rawTitle = siteData?.softplayCta?.mainTitle || siteData?.softplayCta?.whiteText || "READY TO BUILD YOUR SOFT PLAY ZONE?";
              const lines = rawTitle.split(/<br\s*\/?>/i);
              return lines.map((line, lIdx) => (
                <React.Fragment key={lIdx}>
                  {lIdx > 0 && <br />}
                  {line}
                </React.Fragment>
              ));
            })()}
          </span>
        }
        buttonText={siteData?.softplayCta?.buttonText ?? "Get Quote Now"}
        buttonLink={siteData?.softplayCta?.buttonLink ?? "https://wa.me/919428989488"}
      />

      {/* 15. FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}

const defaultSoftPlayFaqs = [
  {
    question: "What space is required to set up an indoor soft play area?",
    answer: "A minimum of 500 sq ft is recommended for a compact soft play zone. We custom design soft play areas for any footprint from 500 sq ft up to 10,000+ sq ft multi-level play centers."
  },
  {
    question: "Are your soft play equipment safety certified?",
    answer: "Yes, all our soft play structures utilize imported anti-UV LLDPE plastics, high-density impact-absorbing sponge foam padding, rounded edges, and heavy-duty PVC covers conforming to international commercial safety standards."
  },
  {
    question: "How long does installation take for a soft play project?",
    answer: "Standard soft play installations typically take 7 to 15 days on-site depending on the size and complexity of the structure. Our own in-house installation team manages everything pan-India."
  },
  {
    question: "Do you provide a customized 3D design before manufacturing?",
    answer: "Absolutely. Every project begins with a 3D CAD design tailored to your specific venue dimensions, ceiling height, theme preferences, and budget before manufacturing begins."
  }
];

const defaultSpecsList = [
  { spec: 'Target age group', details: '2–12 years' },
  { spec: 'Minimum space required', details: '500 sq ft' },
  { spec: 'Maximum height', details: 'Customisable to your venue' },
  { spec: 'Construction', details: 'Galvanized steel frame, imported LLDPE, soft PVC cover' },
  { spec: 'Safety', details: 'Padded surfaces, rounded edges — commercial grade' },
  { spec: 'Customisation', details: 'Theme, colour, layout, activities' },
  { spec: 'Installation', details: "Pan-India by Winera's own team" },
  { spec: 'Expected lifespan', details: '10+ years with proper maintenance' }
];

const defaultMaterialsSubpoints = [
  {
    title: 'Plastic Parts',
    desc: 'Crafted from high-quality imported LLDPE (Linear Low-Density Polyethylene) anti-UV, anti-static, and impact-resistant. This material maintains its colour and structural integrity even after years of heavy commercial use'
  },
  {
    title: 'Post Structure',
    desc: 'Constructed from national standard galvanized steel pipes providing the structural backbone that keeps every soft play structure stable, safe, and built to last for years.'
  },
  {
    title: 'Metal Components',
    desc: 'All metal parts are galvanized to resist corrosion critical for indoor environments where moisture and regular cleaning can degrade lower-grade metals quickly.'
  },
  {
    title: 'Deck, Stair & Bridge',
    desc: 'Features a robust wood core padded with high-density sponge and coated with rubber or powder finish — providing comfort underfoot and impact protection for children.'
  },
  {
    title: 'Outer Cover',
    desc: 'Finished with a soft PVC covering that is pleasant to touch, easy to clean, and provides an additional protective layer across all play surfaces.'
  }
];

const defaultTypesList = [
  {
    title: 'Themed Soft Play Zones',
    desc: 'A Fully Designed Play Environment Built Around A Visual Theme — Jungle, Ocean, Space, Or A Custom Branded Concept Tailored To Your Venue. Every Element From Colours And Structures To Signage Works Together, Creating A Space Visitors Photograph, Share, And Return To. Ideal For Malls, Hotels, And Family Entertainment Centres Looking To Build A Recognisable, Destination-Worthy Indoor Play Area For Kids.'
  },
  {
    title: 'Toddler & Junior Play Areas',
    desc: 'Age-Segmented Zones Designed For Children Aged 2–5 And 6–12 Years Separately Ensure The Right Structure Height, Challenge Level, And Safety Padding For Each Group. Allows Venues Serving Mixed-Age Families To Keep Younger Toddlers Safe Without Restricting Older Children. Popular In Hospitals, Airports, And Hotel Recreation Zones Where The Play Area Must Serve A Wide Visitor Demographic.'
  },
  {
    title: 'Multi-Level Play Structures',
    desc: 'Vertical Installations That Use Your Full Ceiling Height — Slides, Climbing Walls, Rope Bridges, Tunnels, And Elevated Platforms Across Multiple Levels. Delivers Large Play Capacity In A Smaller Floor Footprint, Making It The Preferred Format For Venues Where Floor Space Is Limited But Ceiling Height Is Available. Commonly Installed In Malls And Standalone Soft Play Centres Across India.'
  },
  {
    title: 'Ball Pit & Sensory Zones',
    desc: 'Foam-Filled Ball Pits And Sensory Play Areas Built For Children Aged 2–6 Years — Fully Padded, Rounded Edges, And Commercial-Grade Foam Throughout. These Zones Generate Some Of The Highest Dwell Times Of Any Soft Play Equipment Category, Keeping Young Visitors Engaged While Parents Relax Nearby. Works Well As A Standalone Addition Or As Part Of A Larger Play Zone Setup.'
  }
];

const defaultWhyUsCards = [
  {
    title: 'Expertise',
    desc: 'Building Commercial Soft Play Zones Since 2014, Made To Survive Heavy Daily Use.'
  },
  {
    title: 'Customized Solutions',
    desc: 'Every Project Starts With A Custom 3D Design, Never An Off-The-Shelf Kit.'
  },
  {
    title: 'Proven Track Record',
    desc: 'Trusted By Malls, Hotels, And Schools Across 50+ Cities In India.'
  },
  {
    title: 'Competitive Pricing',
    desc: 'Factory-Direct Pricing With No Distributor Markup, Plus A Free ROI Report.'
  },
  {
    title: 'Single Point Of Contact',
    desc: 'One Team From 3D Design To Installation With No Third-Party Contractors.'
  }
];
