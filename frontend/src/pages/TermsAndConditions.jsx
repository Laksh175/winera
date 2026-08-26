import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsAndConditions({ siteData }) {
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const termsSeo = siteData?.termsSeo || {
    pageTitle: "Terms of Service | Winera International",
    metaDescription: "Read Winera International's Terms of Service outlining your rights, responsibilities, and guidelines for using our game zone equipment and setup in India."
  };

  useEffect(() => {
    document.title = termsSeo.pageTitle || termsSeo.title || "Terms of Service | Winera International";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', termsSeo.metaDescription || termsSeo.description || "Read Winera International's Terms of Service outlining your rights, responsibilities, and guidelines for using our game zone equipment and setup in India.");
  }, [termsSeo]);

  return (
    <div style={{ background: '#F5F5F9', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', 'Montserrat', sans-serif" }}>
      <Header headerData={header} />

      <section className="winera-vr-hero-section" style={{
        position: 'relative', width: '100%', paddingTop: '165px', paddingBottom: '75px',
        background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', color: '#ffffff'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
            Terms & <span style={{ color: '#ffcd00' }}>Conditions</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: '60px 4vw 90px', maxWidth: '900px', margin: '0 auto', lineHeight: 1.7, fontSize: '15px' }}>
        <p>Welcome to Winera International. By accessing winera.in, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '30px' }}>Intellectual Property</h3>
        <p>All content, branding, images, and designs on this website are the property of Winera International Private Limited. Unauthorized duplication or reproduction is strictly prohibited.</p>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '30px' }}>Service Quotations & Consultations</h3>
        <p>All product quotes, space layout proposals, and ROI projections provided through this site are subject to formal agreement and project site verification.</p>
      </section>

      <Footer footerData={footer} />
    </div>
  );
}
