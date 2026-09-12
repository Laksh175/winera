import React from 'react';
import logo from '../assets/logo.webp';
import footerBg from '../assets/footer-bg.webp';
import { Phone, Mail } from 'lucide-react';

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

export default function Footer({ footerData }) {
  const defaultProductLinks = [
    { name: "Arcade Games", link: "/product/arcade-games" },
    { name: "Bowling Alley", link: "/product/bowling-alley" },
    { name: "Soft Play", link: "/product/soft-play" },
    { name: "Trampoline Park", link: "/product/trampoline-park" },
    { name: "VR Games", link: "/product/vr-games" },
    { name: "AR Games", link: "/product/ar-games" },
    { name: "Bumper Car", link: "/product/bumper-car" },
    { name: "Amusement Park", link: "/product/amusement-park" },
    { name: "Hypergrid", link: "/product/hypergrid" }
  ];

  const defaultQuickLinks = [
    { name: "About Us", link: "/why-us" },
    { name: "Contact Us", link: "/contact" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms & Conditions", link: "/terms-and-conditions" }
  ];

  const defaultResourceLinks = [
    { name: "Blog", link: "/blog" },
    { name: "Project", link: "/project" },
    { name: "ROI", link: "/resource/roi" },
    { name: "Safety Standards", link: "/resource/safety-standards" }
  ];

  const logoSrc = getValidImageUrl(footerData?.logoUrl, logo);
  const tagline = footerData?.tagline || "Winera is a professional solution provider and builder specializing in indoor amusement parks and playground equipment.";
  const productLinks = (Array.isArray(footerData?.productLinks) && footerData.productLinks.length > 0 ? footerData.productLinks : defaultProductLinks).filter(prod => !(prod.name || '').toLowerCase().includes('laser') && !(prod.link || '').toLowerCase().includes('laser'));
  const quickLinks = Array.isArray(footerData?.quickLinks) && footerData.quickLinks.length > 0 ? footerData.quickLinks : defaultQuickLinks;
  const resourceLinks = Array.isArray(footerData?.resourceLinks) && footerData.resourceLinks.length > 0 ? footerData.resourceLinks : defaultResourceLinks;
  const phone1 = footerData?.phone1 || "+91 94289 89488";
  const phone2 = footerData?.phone2 || "+91 95123 56766";
  const email = footerData?.email || "info@winera.in";
  const copyright = footerData?.copyright || "© 2026 Winera International Pvt. Ltd. All Rights Reserved.";

  return (
    <footer className="winera-footer-section" style={{
      position: 'relative',
      width: '100%',
      background: `url(${footerBg}) center/100% 100% no-repeat`,
      padding: '70px 4vw 35px',
      color: '#0f172a',
      minHeight: '440px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto' }}>
        {/* Main Footer Links Columns Grid */}
        <div className="winera-footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '320px 2.2fr 1fr 1fr 1fr',
          gap: '35px',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          {/* Column 1: Logo & Tagline Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <img src={logoSrc} alt="Winera International" style={{ height: '62px', maxWidth: '240px', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '13px', color: '#334155', fontWeight: '500', lineHeight: 1.6, maxWidth: '310px', margin: '0 0 24px' }}>
              {tagline}
            </p>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
              Product
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
              {productLinks.map((prod, idx) => (
                <a
                  key={idx}
                  href={prod.link}
                  style={{
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                >
                  {prod.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  style={{
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
              Resources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resourceLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  style={{
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons Row & Get in Touch Bar */}
        <div className="winera-footer-social-contact" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Left Social Media Circular Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '16px',
              textDecoration: 'none'
            }}>
              f
            </a>

            {/* Instagram Gradient */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Youtube Red */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#ef4444',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X / Twitter Black */}
            <a href="https://x.com" target="_blank" rel="noreferrer" style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#0f172a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '15px',
              textDecoration: 'none'
            }}>
              𝕏
            </a>
          </div>

          {/* Right Get in Touch Contact Phone/Email Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <h5 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Get in Touch
            </h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <a href={`tel:${phone1.replace(/\s+/g, '')}`} style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>{phone1}</span>
              </a>
              <a href={`tel:${phone2.replace(/\s+/g, '')}`} style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>{phone2}</span>
              </a>
              <a href={`mailto:${email}`} style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>{email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Divider & Text */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(15, 23, 42, 0.12)',
          textAlign: 'center',
          fontSize: '12px',
          color: '#475569',
          fontWeight: '500'
        }}>
          {copyright}
        </div>
      </div>
    </footer>
  );
}
