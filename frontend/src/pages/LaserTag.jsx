import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import arHeroBg from '../assets/ar-hero-bg.webp';

export default function LaserTag({ siteData }) {
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
          {/* Centered Single Line Heading: Home › Laser Tag */}
          <h1 className="winera-lasertag-hero-h1" style={{
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
              {siteData?.lasertagHero?.breadcrumbText || "Laser Tag"}
            </span>
          </h1>
        </div>
      </section>

      {/* 3. FOOTER SECTION */}
      <div style={{ marginTop: 'auto' }}>
        <Footer footerData={footer} />
      </div>
    </div>
  );
}
