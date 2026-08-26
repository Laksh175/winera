import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import ProjectsMarqueeSection from '../components/ProjectsMarqueeSection';
import projectBanner from '../assets/project-banner.png';
import projectImage01 from '../assets/project-image01.png';
import projectImage2Bg from '../assets/project-image2-bg.png';
import projectImage3 from '../assets/project-image-3.png';
import projectImage4 from '../assets/project-image-4.png';
import projectImagesBg from '../assets/project-images-bg.png';
import projectBlock1 from '../assets/project-block1.png';
import projectBlock2 from '../assets/project-block2.png';
import projectBlock3 from '../assets/project-block3.png';
import projectSectionVideo from '../assets/project-section-video.png';
import yellowStrokeLine from '../assets/yellow-stroke-line.png';
import CtaBanner from '../components/CtaBanner';
import bumpercarCtaBannerBg from '../assets/bumpercar-cta-banner-bg.png';

export default function Project({ siteData }) {
  const header = siteData?.header || null;
  const footer = siteData?.footer || null;

  // Dynamic content sections from CMS siteData
  const heroData = siteData?.projectHero || {};
  const blockData = siteData?.projectBlock || {};
  const basicData = siteData?.projectBasicInfo || {};
  const clientData = siteData?.projectClientWanted || {};
  const solutionData = siteData?.projectSolution || {};
  const galleryData = siteData?.projectGallery || {};
  const videoData = siteData?.projectVideo || {};
  const seoData = siteData?.projectSeo || {};

  // Assets & Fallbacks
  const bannerImg = heroData.bannerImg || projectBanner;
  const breadcrumbHome = heroData.breadcrumbHome || 'Home';
  const breadcrumbPage = heroData.breadcrumbPage || 'Project';

  const strokeImg = blockData.strokeImg || yellowStrokeLine;
  const titleLine1 = blockData.titleLine1 || 'FifthAlley Sport Bowling: A';
  const titleLine2 = blockData.titleLine2 || 'Complete ';
  const titleLine2Black = blockData.titleLine2Black || 'Bowling Alley Setup';
  const titleLine3 = blockData.titleLine3 || 'in the Heart of Surat';
  const description = blockData.description || 'How we designed and installed a professional-grade bowling alley across 3,000 sq. ft., transforming an empty space in Katargam into a destination entertainment venue in Surat.';
  const buttonText = blockData.buttonText || 'Get A Quote';
  const buttonLink = blockData.buttonLink || 'https://wa.me/919428989488';
  const mainImage = blockData.image || projectImage01;

  const basicBg = basicData.bgImg || projectImage2Bg;
  const yellowTitle = basicData.yellowTitle || 'Basic ';
  const whiteTitle = basicData.whiteTitle || 'Information';
  const basicRows = Array.isArray(basicData.rows) && basicData.rows.length > 0 ? basicData.rows : [
    { label: 'Project Name', val: 'FifthAlley Sport Bowling' },
    { label: 'Project Type', val: 'Bowling Alley Setup' },
    { label: 'Location', val: 'Surat, Gujarat' },
    { label: 'Total Area', val: '3,000 sq. ft.' }
  ];

  const clientTitlePrefix = clientData.titlePrefix || 'What the ';
  const clientTitleCyan = clientData.titleCyan || 'Client Wanted';
  const clientP1 = clientData.paragraph1 || 'The client had an empty 3,000 sq. ft. space in Katargam and a clear goal: to open a professional bowling venue.';
  const clientP2 = clientData.paragraph2 || "They didn't want a supplier who only supplied the equipment. They wanted one partner to handle everything, plan the space, install the lanes, and hand over a venue that was ready for opening day. In short, they needed one team they could trust from start to finish.";
  const clientImg = clientData.image || projectImage3;

  const solutionTitleCyan = solutionData.titleCyan || 'What Solution ';
  const solutionTitleSuffix = solutionData.titleSuffix || 'We Provide';
  const solutionP1 = solutionData.paragraph1 || 'We delivered FifthAlley Sport Bowling as a complete, ready-to-open venue. Across the 3,000 sq. ft. space in Katargam, we planned the layout so the professional lanes had enough room around them for people to walk, sit, and relax.';
  const solutionP2 = solutionData.paragraph2 || 'The result is a venue that is fun to play in and comfortable to spend time in — just like a good family entertainment center should feel.';
  const solutionImg = solutionData.image || projectImage4;

  const galleryTitleCyan = galleryData.titleCyan || 'Project ';
  const galleryTitleDark = galleryData.titleDark || 'Gallery';
  const galleryBg = galleryData.bgImg || projectImagesBg;
  const galleryImages = Array.isArray(galleryData.images) && galleryData.images.length > 0 ? galleryData.images : [
    projectBlock1,
    projectBlock2,
    projectBlock3,
    projectBlock1,
    projectBlock2,
    projectBlock3
  ];

  const videoImg = videoData.image || projectSectionVideo;
  const videoLink = videoData.videoUrl || siteData?.header?.whatsAppUrl || 'https://wa.me/919428989488';

  // Set page title and meta description for SEO
  useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = seoData.title || "Our Projects | Game Zone, Bowling Alley & Soft Play Setups by Winera International";
    const metaDesc = seoData.metaDescription || "Explore Winera International's completed projects across India — FifthAlley Sport Bowling, Hulaboo, Playzonia, LaneX Bowling Alley, Funfair, and 40+ more game zones, bowling alleys, and soft play setups built end-to-end.";
    const canonicalUrl = seoData.canonicalUrl || "https://winera.in/project";

    // Title
    document.title = pageTitle;

    // Meta Description
    let metaDesc_el = document.querySelector('meta[name="description"]');
    if (!metaDesc_el) {
      metaDesc_el = document.createElement('meta');
      metaDesc_el.setAttribute('name', 'description');
      document.head.appendChild(metaDesc_el);
    }
    metaDesc_el.setAttribute('content', metaDesc);

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', metaDesc);

    // OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [seoData.title, seoData.metaDescription]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', background: '#F5F5F9', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* HEADER */}
      <Header headerData={header} />

      {/* 1. HERO BANNER SECTION */}
      <section className="winera-project-hero-section" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '150px',
        paddingBottom: '120px',
        background: `url(${bannerImg}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>

          {/* Crafting Heading — TOP */}
          <p style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#38bdf8',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>Our Portfolio</p>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
            fontWeight: '900',
            color: '#ffffff',
            margin: '0 auto 10px',
            lineHeight: 1.18,
            maxWidth: '700px',
            textShadow: '0 4px 18px rgba(0,0,0,0.45)'
          }}>
            Crafting India's{' '}
            <span style={{ color: '#38bdf8' }}>Best Play Destinations</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
            From bowling alleys and game zones to soft play areas and VR zones — see what we've built across India.
          </p>

          {/* Breadcrumb: Home › Project — BOTTOM with spacing */}
          <h1 className="winera-project-hero-h1" style={{
            fontSize: '2rem',
            fontWeight: '900',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '5px 0 0 0',
            lineHeight: 1.2,
            textAlign: 'center',
            opacity: 0.85
          }}>
            <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', marginBottom: '22px' }}>{breadcrumbHome}</Link>
            <span style={{ color: '#ffffff', fontWeight: '400', marginBottom: '22px' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900', marginBottom: '22px' }}>{breadcrumbPage}</span>
          </h1>

        </div>
      </section>


      {/* 2. PROJECT BLOCK SECTION */}

      <section className="winera-project-block-section" style={{ padding: '40px 4vw 100px', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="winera-project-block-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          gap: '40px 50px',
          alignItems: 'center'
        }}>
          {/* Content Side */}
          <div className="winera-project-block-text">
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '300px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />

            <h2 style={{
              fontSize: '2.1rem',
              fontWeight: '900',
              color: '#0f172a',
              lineHeight: 1.18,
              marginBottom: '14px'
            }}>
              <span style={{ color: '#38bdf8' }}>{titleLine1}</span>
              <br />
              <span style={{ color: '#38bdf8' }}>{titleLine2}</span>
              <span style={{ color: '#0f172a' }}>{titleLine2Black}</span>
              <br />
              <span style={{ color: '#0f172a' }}>{titleLine3}</span>
            </h2>

            <p style={{
              fontSize: '12px',
              color: '#475569',
              lineHeight: 1.55,
              fontWeight: '400',
              marginBottom: '24px',
              maxWidth: '700px'
            }}>
              {description}
            </p>

            {/* Offset Yellow Backing + Cyan Pill Button */}
            <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
              <a
                href={buttonLink}
                target="_blank"
                rel="noreferrer"
                className="winera-cyan-cta-btn winera-cyan-cta-btn-sm"
              >
                {buttonText}
              </a>
            </div>
          </div>

          {/* Image Side with Offset Cyan Border Frame */}
          <div className="winera-project-block-img" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div style={{
              position: 'relative',
              maxWidth: '340px',
              width: '100%',
              aspectRatio: '1 / 1'
            }}>
              {/* Square Cyan Frame Box behind (Uniform 35px offset top-right) */}
              <div className="winera-project-frame-bg" style={{
                position: 'absolute',
                top: '-35px',
                right: '-35px',
                bottom: '35px',
                left: '35px',
                border: '2px solid #38bdf8',
                borderRadius: '22px',
                background: '#F0F7FF',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>

              {/* Main Project Card Image */}
              <img
                src={mainImage}
                alt="Project Main Card"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BASIC INFORMATION CARD BLOCK */}
      <section className="winera-project-basic-section" style={{ padding: '0 4vw 90px', maxWidth: '1240px', margin: '0 auto' }}>
        <div className="winera-project-basic-card" style={{
          position: 'relative',
          width: '100%',
          backgroundImage: `url(${basicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '60px',
          padding: '55px 65px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          overflow: 'hidden',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Yellow Stroke Accent + Title */}
          <div style={{ marginBottom: '32px' }}>
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'block', maxWidth: '100%', width: '260px', height: '8px', marginBottom: '12px', objectFit: 'fill' }}
            />
            <h3 style={{
              fontSize: '2.6rem',
              fontWeight: '900',
              margin: 0,
              lineHeight: 1.15,
              textShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}>
              <span style={{ color: '#ffcd00' }}>{yellowTitle}</span>
              <span style={{ color: '#ffffff' }}>{whiteTitle}</span>
            </h3>
          </div>

          {/* White Table Box (Full Rounded Card with Yellow Border Frame matching Image 1) */}
          <div className="winera-project-basic-table-box" style={{
            maxWidth: '520px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '28px',
            border: '2px solid #ffcd00',
            boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
            overflow: 'hidden',
            paddingBottom: '16px'
          }}>
            {basicRows.map((row, rIdx) => (
              <div
                key={row.label || rIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 36px',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#0f172a', textAlign: 'left' }}>
                  {row.label}
                </span>
                <span style={{ fontSize: '14.5px', fontWeight: '500', color: '#334155', textAlign: 'right' }}>
                  {row.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT THE CLIENT WANTED BLOCK */}
      <section className="winera-project-client-section" style={{ padding: '40px 4vw 70px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span>{clientTitlePrefix}</span>
            <span style={{ color: '#38bdf8' }}>{clientTitleCyan}</span>
          </h3>
        </div>

        {/* Content & Image Grid */}
        <div className="winera-project-client-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Paragraph Text */}
          <div className="winera-project-client-text">
            <p style={{
              fontSize: '22px',
              color: '#475569',
              lineHeight: 1.6,
              fontWeight: '400',
              marginBottom: '20px'
            }}>
              {clientP1}
            </p>
            <p style={{
              fontSize: '22px',
              color: '#475569',
              lineHeight: 1.6,
              fontWeight: '400',
              margin: 0
            }}>
              {clientP2}
            </p>
          </div>

          {/* Image with Cyan Offset Outline Frame */}
          <div className="winera-project-client-img" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '-18px',
                right: '-18px',
                bottom: '18px',
                left: '18px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={clientImg}
                alt="What the Client Wanted"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT SOLUTION WE PROVIDE BLOCK */}
      <section className="winera-project-solution-section" style={{ padding: '20px 4vw 90px', maxWidth: '1240px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <img
            src={strokeImg}
            alt=""
            style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
          />
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#0f172a',
            margin: 0,
            lineHeight: 1.15
          }}>
            <span style={{ color: '#38bdf8' }}>{solutionTitleCyan}</span>
            <span>{solutionTitleSuffix}</span>
          </h3>
        </div>

        {/* Content & Image Grid */}
        <div className="winera-project-solution-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Image with Cyan Offset Outline Frame */}
          <div className="winera-project-solution-img" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'relative', maxWidth: '430px', width: '100%' }}>
              <div style={{
                position: 'absolute',
                inset: '-15px -17px -17px 18px',
                border: '2px solid #38bdf8',
                zIndex: 1,
                pointerEvents: 'none'
              }}></div>
              <img
                src={solutionImg}
                alt="What Solution We Provide"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0px',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Paragraph Text */}
          <div className="winera-project-solution-text">
            <p style={{
              fontSize: '21px',
              color: '#475569',
              lineHeight: 1.6,
              fontWeight: '400',
              marginBottom: '20px'
            }}>
              {solutionP1}
            </p>
            <p style={{
              fontSize: '21px',
              color: '#475569',
              lineHeight: 1.6,
              fontWeight: '400',
              margin: 0
            }}>
              {solutionP2}
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROJECT GALLERY SECTION */}
      <section className="winera-project-gallery-section" style={{
        position: 'relative',
        width: '100%',
        padding: '70px 4vw 90px',
        background: `url(${galleryBg}) center top / 100% 100% no-repeat`,
        margin: '20px 0 0'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          {/* Title */}
          <div style={{ marginBottom: '45px' }}>
            <img
              src={strokeImg}
              alt=""
              style={{ display: 'inline-block', maxWidth: '100%', width: '280px', height: '8px', marginBottom: '8px', objectFit: 'fill' }}
            />
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#0f172a',
              margin: 0,
              lineHeight: 1.15
            }}>
              <span style={{ color: '#38bdf8' }}>{galleryTitleCyan}</span>
              <span>{galleryTitleDark}</span>
            </h3>
          </div>

          {/* 3-Column Image Grid (2 Rows matching photo 1:1) */}
          <div className="winera-project-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {galleryImages.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={`Project Gallery ${idx + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '24px',
                  display: 'block',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT VIDEO SHOWCASE SECTION */}
      <section style={{ padding: '60px 4vw 90px', maxWidth: '1060px', margin: '0 auto', textAlign: 'center' }}>
        <a
          href={videoLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0,0,0,0.15)',
            cursor: 'pointer'
          }}
        >
          <img
            src={videoImg}
            alt="Project Showcase Video"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '28px' }}
          />
        </a>
      </section>

      {/* 8. OUR RECENT PROJECTS MARQUEE */}
      <ProjectsMarqueeSection
        showTopHeader={false}
        simpleTitle={<>Our <span style={{ color: '#38bdf8' }}>Recent Project</span></>}
        showBottomButton={true}
        buttonText="Know More"
      />

      {/* 9. RELATED PRODUCTS SECTION */}
      <RelatedProductsSection />

      {/* 9. CTA SECTION */}
      <CtaBanner
        bg={bumpercarCtaBannerBg}
        tagline=""
        title={
          <>
            Have a space to{' '}
            <span style={{ color: '#ffcd00' }}>bring alive?</span>
          </>
        }
        subtitle="Let's build your next project together"
        description="Give us the space, and we'll deliver a complete setup — planned, built, and ready to open. Your only job is to open the doors."
        buttonText="Contact Us"
        buttonLink="/contact"
        align="center"
      />

      {/* FOOTER */}
      <Footer footerData={footer} />
    </div>
  );
}
