import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy({ siteData }) {
  const header = siteData?.header || {};
  const footer = siteData?.footer || {};

  const privacySeo = siteData?.privacySeo || {
    pageTitle: "Winera International Privacy Policy for Game Zone Solutions",
    metaDescription: "Learn how Winera International collects, uses, and protects the information you share when enquiring about our game zone equipment and setup services in India."
  };

  useEffect(() => {
    document.title = privacySeo.pageTitle || privacySeo.title || "Winera International Privacy Policy for Game Zone Solutions";
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', privacySeo.metaDescription || privacySeo.description || "Learn how Winera International collects, uses, and protects the information you share when enquiring about our game zone equipment and setup services in India.");
  }, [privacySeo]);

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
            Privacy <span style={{ color: '#ffcd00' }}>Policy</span>
          </h1>
        </div>
      </section>

      <section style={{ padding: '60px 4vw 90px', maxWidth: '900px', margin: '0 auto', lineHeight: 1.7, fontSize: '15px' }}>
        <p>At Winera International, accessible from winera.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Winera International and how we use it.</p>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '30px' }}>Information We Collect</h3>
        <p>When you fill out inquiry forms or contact us via WhatsApp/Phone, we collect basic details such as name, email address, phone number, and location to provide custom game zone consultation and setup solutions.</p>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginTop: '30px' }}>Contact Us</h3>
        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at info@winera.in.</p>
      </section>

      <Footer footerData={footer} />
    </div>
  );
}
