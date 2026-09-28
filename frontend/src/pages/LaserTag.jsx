import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedProductsSection from '../components/RelatedProductsSection';
import arHeroBg from '../assets/ar-hero-bg.webp';
import gameZoneMobileBanner from '../assets/game_zone_mobile_banner.png';

export default function LaserTag({ siteData }) {
  const [isPhone, setIsPhone] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!siteData) return <div style={{ minHeight: '100vh', background: '#06132d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Laser Tag...</div>;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    const pageTitle = siteData?.lasertagSeo?.pageTitle || "Laser Tag Equipment Supplier in India | Winera International";
    const metaDesc = siteData?.lasertagSeo?.metaDescription || "Want to add laser tag or laser spy to your venue? Winera International handles the full setup, from arena design and gear to software and staff training.";

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
  const heroBgImage = siteData?.lasertagHero?.bgUrl || arHeroBg;

  return (
    <div style={{ backgroundColor: '#F5F5F9', color: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {/* 1. HEADER NAVBAR */}
      <Header headerData={header} />

      {/* 2. LASER TAG HERO BANNER SECTION */}
      <section className="winera-lasertag-hero-section" style={{
        position: 'relative',
        width: '100%',
        minHeight: 'auto',
        aspectRatio: isPhone ? '941 / 550' : 'auto',
        paddingTop: isPhone ? '55px' : '165px',
        paddingBottom: isPhone ? '0px' : '75px',
        background: isPhone ? `url(${gameZoneMobileBanner}) center top / 100% 100% no-repeat` : `url(${heroBgImage}) center top / 100% 100% no-repeat`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px', zIndex: 2 }}>
          {/* Centered Single Line Heading: Home › Laser Tag */}
          <h1 className="winera-lasertag-hero-h1" style={{
            fontSize: isPhone ? '1.15rem' : '21px',
            fontWeight: '800',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: isPhone ? '6px' : '8px',
            margin: 0,
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
          }}>
            <a href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>Home</a>
            <span style={{ color: '#ffffff', fontWeight: '400' }}>&rsaquo;</span>
            <span style={{ color: '#ffcd00', fontWeight: '900' }}>
              {siteData?.lasertagHero?.breadcrumbText || "Laser Tag"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. RELATED PRODUCTS CAROUSEL SECTION */}
      <RelatedProductsSection
        sectionData={siteData?.lasertagRelated || siteData?.arcadeRelated}
        accentColor="#38bdf8"
      />

      {/* 4. FOOTER SECTION */}
      <div style={{ marginTop: 'auto' }}>
        <Footer footerData={footer} />
      </div>
    </div>
  );
}
