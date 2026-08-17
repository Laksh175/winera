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
          {/* Main Title: Soft Play */}
          <h1 className="winera-softplay-hero-h1" style={{
            fontSize: '3.8rem',
            fontWeight: '900',
            letterSpacing: '-1px',
            marginBottom: '10px',
            lineHeight: 1.15
          }}>
            {(() => {
              const rawTitle = siteData?.softplayHero?.title || "*Soft* Play";
              const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
              return parts.map((part, index) => {
                if (index % 2 === 1) {
                  return (
                    <span key={index} style={{ color: '#ffcd00' }}>
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </h1>

          {/* Breadcrumb Navigation: Home > Soft Play */}
          <p className="winera-softplay-hero-breadcrumb" style={{
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
            <span style={{ color: '#ffcd00' }}>{siteData?.softplayHero?.breadcrumbText || "Soft Play"}</span>
          </p>
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
          {/* Left Collage Image with Cyan Border & Circular Winera Center Badge */}
          <div className="winera-softplay-supplier-img" style={{ position: 'relative', width: '100%', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Outer Cyan Line Outline Frame */}
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '90px',
              width: '400px',
              height: '310px',
              border: '2.5px solid #38bdf8',
              borderRadius: '160px 40px 40px 40px',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>

            {/* Top Left Main Play Area Image (Arch Top Left) */}
            <div style={{
              width: '400px',
              height: '310px',
              borderRadius: '150px 30px 30px 30px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              background: `url(${siteData?.softplayIntro?.mainImgUrl || about1}) center/cover no-repeat`,
              position: 'relative',
              zIndex: 2,
              border: '4px solid #f5f5f9'
            }}></div>

            {/* Bottom Right Overlapping Image (Arch Bottom Right) */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '30px',
              width: '280px',
              height: '240px',
              borderRadius: '30px 30px 140px 30px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
              border: '5px solid #ffffff',
              background: `url(${siteData?.softplayIntro?.secondaryImgUrl || projSoft1}) center/cover no-repeat`,
              zIndex: 10
            }}></div>

            {/* Central Circular Cyan Gradient Winera Logo Badge */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '105px',
              height: '105px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a3e635 0%, #38bdf8 60%, #0284c7 100%)',
              boxShadow: '0 10px 25px rgba(56, 189, 248, 0.4)',
              border: '4px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20
            }}>
              <img src={siteData?.header?.logoUrl || logoImg} alt="Winera Logo" style={{ width: '75px', objectFit: 'contain' }} />
            </div>
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

            {/* Action Button: Get Quote From Expert */}
            <a
              href={siteData?.softplayIntro?.buttonLink || "https://wa.me/919428989488"}
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
              {siteData?.softplayIntro?.buttonText || "Get Quote From Expert"}
            </a>
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

            <a
              href={siteData?.softplayManufacture?.videoUrl || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '900',
                padding: '13px 36px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {siteData?.softplayManufacture?.btnText || "Watch Video"}
            </a>
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

          {/* Center Table Card with White Background & Rounded Corners */}
          <div className="winera-softplay-specs-table-card" style={{
            maxWidth: '520px',
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px 28px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ paddingBottom: '14px', fontSize: '18px', fontWeight: '900', color: '#0f172a', width: '42%' }}>Specification</th>
                  <th style={{ paddingBottom: '14px', fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(siteData?.softplaySpecs?.specsList) && siteData.softplaySpecs.specsList.length > 0
                  ? siteData.softplaySpecs.specsList
                  : defaultSpecsList
                ).map((row, idx, arr) => (
                  <tr key={idx} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 0', fontWeight: '700', color: '#475569' }}>{row.spec}</td>
                    <td style={{ padding: '10px 0', fontWeight: '600', color: '#1e293b', fontSize: '12.5px' }}>{row.details}</td>
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
        padding: '70px 4vw 90px',
        background: `url(${siteData?.softplayMaterials?.bgUrl || softplayMaterialsBg}) center/100% 100% no-repeat`,
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Equal 2-Column Grid Layout: Left Column (Title, Subtitle & Image Card), Right Column (Subpoints List) */}
          <div className="winera-softplay-materials-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'flex-start'
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

              {/* Left Photo Card with Embedded Pill Badge */}
              <div style={{ position: 'relative', width: '100%' }}>
                <div style={{
                  width: '100%',
                  height: '340px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                  background: `url(${siteData?.softplayMaterials?.imgUrl || about1}) center/cover no-repeat`
                }}></div>

                {/* Floating Pill Tag at bottom right of image */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '-15px',
                  background: '#ffffff',
                  border: '2px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '12px 22px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  zIndex: 10
                }}>
                  <p style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', margin: 0, lineHeight: 1.25 }}>
                    Premium Materials.<br />
                    Exceptional Durability.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Subpoints List */}
            <div className="winera-softplay-materials-points" style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingTop: '10px' }}>
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

          {/* Download Our Brochure Action Button */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a
              href={siteData?.softplaySpecs?.brochureUrl || siteData?.softplayTypes?.brochureUrl || "#"}
              target="_blank"
              rel="noreferrer"
              download
              style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #29b6f6 100%)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: '900',
                padding: '13px 36px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(56, 189, 248, 0.35)',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              {siteData?.softplaySpecs?.buttonText || "Download Our Brochure"}
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

            {/* Talk to an ROI Expert Button */}
            <a
              href={siteData?.softplayRoi?.buttonLink || "https://wa.me/919428989488"}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13.5px',
                fontWeight: '900',
                padding: '12px 28px',
                borderRadius: '14px',
                border: '3px solid #ffcd00',
                boxShadow: '0 8px 22px rgba(255, 205, 0, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none'
              }}
            >
              {/* Official 1:1 WhatsApp Logo SVG Icon */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#25D366" />
                <path d="M16 6.5C10.76 6.5 6.5 10.76 6.5 16C6.5 17.84 7.03 19.56 7.94 21.02L6.84 25.16L11.08 24.08C12.49 24.91 14.17 25.5 16 25.5C21.24 25.5 25.5 21.24 25.5 16C25.5 10.76 21.24 6.5 16 6.5ZM16 23.95C14.48 23.95 13.06 23.51 11.85 22.75L11.56 22.58L8.98 23.24L9.67 20.72L9.48 20.42C8.63 19.14 8.16 17.62 8.16 16C8.16 11.68 11.68 8.16 16 8.16C20.32 8.16 23.84 11.68 23.84 16C23.84 20.32 20.32 23.95 16 23.95ZM20.29 18.06C20.06 17.94 18.91 17.38 18.7 17.3C18.49 17.22 18.34 17.18 18.18 17.41C18.03 17.64 17.58 18.18 17.44 18.34C17.3 18.49 17.16 18.51 16.93 18.39C16.7 18.28 15.96 18.04 15.08 17.26C14.39 16.65 13.93 15.89 13.8 15.66C13.67 15.43 13.78 15.3 13.9 15.19C14 15.09 14.13 14.92 14.24 14.79C14.35 14.66 14.39 14.56 14.47 14.41C14.54 14.26 14.5 14.13 14.45 14.02C14.39 13.9 13.93 12.78 13.75 12.32C13.56 11.87 13.37 11.93 13.23 11.92C13.1 11.91 12.95 11.91 12.8 11.91C12.64 11.91 12.4 11.97 12.19 12.2C11.98 12.43 11.38 12.99 11.38 14.13C11.38 15.27 12.21 16.37 12.33 16.53C12.45 16.68 13.97 19.01 16.29 20.01C16.84 20.25 17.27 20.39 17.6 20.5C18.16 20.67 18.66 20.65 19.07 20.59C19.53 20.52 20.48 20.01 20.68 19.45C20.88 18.89 20.88 18.42 20.82 18.32C20.76 18.22 20.53 18.17 20.29 18.06Z" fill="white" />
              </svg>
              {siteData?.softplayRoi?.buttonText || "Talk to an ROI Expert"}
            </a>
          </div>

          {/* Right Overlapping 3-Photo Collage Grid */}
          <div className="winera-softplay-roi-img" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {/* Top Large Photo: Arch Top-Left & Bottom-Right */}
            <div style={{
              width: '100%',
              height: '240px',
              borderRadius: '120px 24px 24px 24px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              border: '4px solid #38bdf8',
              background: `url(${siteData?.softplayRoi?.topImgUrl || about1}) center/cover no-repeat`
            }}></div>

            {/* Bottom Row 2 Side-by-Side Photos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Bottom Left Photo */}
              <div style={{
                width: '100%',
                height: '180px',
                borderRadius: '24px 24px 24px 100px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                border: '4px solid #38bdf8',
                background: `url(${siteData?.softplayRoi?.bottomLeftImgUrl || about2}) center/cover no-repeat`
              }}></div>

              {/* Bottom Right Photo */}
              <div style={{
                width: '100%',
                height: '180px',
                borderRadius: '24px 100px 24px 24px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                border: '4px solid #ffcd00',
                background: `url(${siteData?.softplayRoi?.bottomRightImgUrl || about2}) center/cover no-repeat`
              }}></div>
            </div>
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
                <>
                  {/* Horizontal Light Blue Divider Line */}
                  {bottomCards.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      background: '#e2e8f0',
                      zIndex: 1,
                      transform: 'translateY(-50%)'
                    }}></div>
                  )}

                  {/* TOP ROW */}
                  <div className="winera-softplay-whyus-row winera-softplay-whyus-top-row" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${topCards.length}, 1fr)`,
                    gap: '0px',
                    position: 'relative',
                    zIndex: 2,
                    paddingBottom: bottomCards.length > 0 ? '40px' : '0'
                  }}>
                    {topCards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="winera-softplay-whyus-card"
                        style={{
                          padding: '0 35px',
                          textAlign: 'center',
                          borderRight: cIdx === topCards.length - 1 ? 'none' : '1.5px solid #e2e8f0',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
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

                  {/* BOTTOM ROW */}
                  {bottomCards.length > 0 && (
                    <div className="winera-softplay-whyus-row winera-softplay-whyus-bottom-row" style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${bottomCards.length}, 1fr)`,
                      maxWidth: bottomCards.length === 2 ? '740px' : '100%',
                      margin: '0 auto',
                      gap: '0px',
                      position: 'relative',
                      zIndex: 2,
                      paddingTop: '20px'
                    }}>
                      {bottomCards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="winera-softplay-whyus-card"
                          style={{
                            padding: '0 35px',
                            textAlign: 'center',
                            borderRight: cIdx === bottomCards.length - 1 ? 'none' : '1.5px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                          }}
                        >
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
                              defaultIcons[(cIdx + topCount) % defaultIcons.length]
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
                </>
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
