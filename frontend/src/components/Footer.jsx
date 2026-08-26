import React from 'react';
import logo from '../assets/logo.png';
import footerBg from '../assets/footer-bg.png';
import { Phone, Mail } from 'lucide-react';

export default function Footer({ footerData }) {
  return (
    <footer className="winera-footer-section" style={{
      position: 'relative',
      width: '100%',
      background: `url(${footerBg}) center/100% 100% no-repeat`,
      padding: '100px 4vw 35px',
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
              <img src={logo} alt="Winera International" style={{ height: '62px', maxWidth: '240px', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '13px', color: '#334155', fontWeight: '500', lineHeight: 1.6, maxWidth: '310px', margin: '0 0 24px' }}>
              Winera is a professional solution provider and builder specializing in indoor amusement parks and playground equipment.
            </p>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
              Product
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
              {[
                { name: "Arcade Games", link: "/product/arcade-games" },
                { name: "Bowling Alley", link: "/product/bowling-alley" },
                { name: "Soft Play", link: "/product/soft-play" },
                { name: "Trampoline Park", link: "/product/trampoline-park" },
                { name: "VR Games", link: "/product/vr-games" },
                { name: "AR Games", link: "/product/ar-games" },
                { name: "Bumper Car", link: "/product/bumper-car" },
                { name: "Amusement Park", link: "/product/amusement-park" },
                { name: "Hypergrid", link: "/product/hypergrid" },
                { name: "Laser tag", link: "/product/laser-tag" }
              ].map((prod, idx) => (
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
              {[
                { name: "About Us", link: "/why-us" },
                { name: "Contact Us", link: "/contact" },
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Terms & Conditions", link: "/terms-and-conditions" }
              ].map((item, idx) => (
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
              {[
                { name: "Blog", link: "/blog" },
                { name: "Project", link: "/project" },
                { name: "ROI", link: "/resource/roi" },
                { name: "Safety Standards", link: "/resource/safety-standards" }
              ].map((item, idx) => (
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

          {/* Column 5: Decorative */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', marginBottom: '18px' }}>
              Decorative
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {["Lights", "Sculpture", "Reception Table", "Other Furniture"].map((item, idx) => (
                <a
                  key={idx}
                  href="#products"
                  style={{
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                >
                  {item}
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
              <a href="tel:+919512356766" style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>+91 9512356766</span>
              </a>
              <a href="tel:+919157873576" style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>+91 9157873576</span>
              </a>
              <a href="mailto:info@winera.in" style={{ fontSize: '13px', color: '#334155', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#0f172a' }} />
                <span>info@winera.in</span>
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
          © 2026 Winera International Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

