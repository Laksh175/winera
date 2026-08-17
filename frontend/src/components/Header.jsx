import React, { useState } from 'react';
import wineraLogo from '../assets/logo.png';
import { MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ headerData }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [productDropdown, setProductDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const productSubMenu = [
    { label: 'Arcade Games', href: '/products/arcade-games' },
    { label: 'VR Games', href: '/products/vr-games' },
    { label: 'AR Games', href: '/products/ar-games' },
    { label: 'Bowling Alley', href: '/products/bowling-alley' },
    { label: 'Trampoline Park', href: '/products/trampoline-park' },
    { label: 'Soft Play', href: '/products/soft-play' },
    { label: 'Bumper Cars', href: '/products/bumper-cars' },
    { label: 'Hypergrid', href: '/products/hypergrid' },
    { label: 'Laser tag', href: '/products/laser-tag' },
    { label: 'Amusement Park', href: '/products/amusement-park' },
    { label: 'Lights', href: '/products/lights' },
    { label: 'Sculpture', href: '/products/sculpture' },
    { label: 'Reception Table', href: '/products/reception-table' },
    { label: 'Other Furniture', href: '/products/other-furniture' }
  ];

  const resourcesSubMenu = [
    { label: 'Blog', href: '/#blog' },
    { label: 'ROI', href: '/#roi' },
    { label: 'Safety Standard', href: '/#safety-standard' }
  ];

  return (
    <>
      {/*
        Responsive rules live here instead of inline styles because inline
        styles can't express @media queries. Everything below only kicks in
        under 900px / 600px - desktop layout is untouched.
      */}
      <style>{`
        .winera-header { }
        .winera-nav-desktop { display: flex; }
        .winera-socials-desktop { display: flex; }
        .winera-hamburger { display: none; }
        .winera-logo-img { height: 48px; }

        @media (max-width: 900px) {
          .winera-header {
            width: 94% !important;
            padding: 10px 16px !important;
            top: 12px !important;
          }
          .winera-nav-desktop { display: none !important; }
          .winera-socials-desktop { display: none !important; }
          .winera-hamburger { display: flex !important; }
          .winera-logo-img { height: 38px; }
        }

        @media (max-width: 420px) {
          .winera-header {
            padding: 8px 12px !important;
          }
          .winera-logo-img { height: 32px; }
          .winera-mobile-drawer { padding: 16px 14px !important; }
        }
      `}</style>

      <header className="winera-header" style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '1240px',
        zIndex: 1000,
        background: '#ffffff',
        borderRadius: '50px',
        padding: '12px 28px',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease'
      }}>
        {/* 1. Official Winera Logo */}
        <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={wineraLogo} alt="Winera International Pvt. Ltd." className="winera-logo-img" style={{ objectFit: 'contain' }} />
        </Link>

        {/* 2. Navigation Menu (hidden on mobile) */}
        <nav className="winera-nav-desktop" style={{ gap: '22px', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              fontSize: '14px',
              fontWeight: currentPath === '/' ? '800' : '700',
              color: currentPath === '/' ? '#0084ff' : '#1e293b',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>

          {/* Product Dropdown */}
          <div
            onMouseEnter={() => setProductDropdown(true)}
            onMouseLeave={() => setProductDropdown(false)}
            style={{ position: 'relative', padding: '8px 0' }}
          >
            <a
              href="/#products"
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1e293b',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Product</span>
              <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: productDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </a>

            {/* Floating Product Dropdown Card */}
            {productDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '10px 0',
                minWidth: '210px',
                maxHeight: '380px',
                overflowY: 'auto',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1050
              }}>
                {productSubMenu.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    style={{
                      padding: '8px 18px',
                      color: '#0f172a',
                      fontSize: '13px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f9ff';
                      e.currentTarget.style.color = '#0084ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#0f172a';
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Project Link */}
          <a href="/#projects" style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', textDecoration: 'none' }}>
            Project
          </a>

          {/* Resources Dropdown */}
          <div
            onMouseEnter={() => setResourcesDropdown(true)}
            onMouseLeave={() => setResourcesDropdown(false)}
            style={{ position: 'relative', padding: '8px 0' }}
          >
            <a
              href="/#resources"
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1e293b',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Resources</span>
              <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: resourcesDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </a>

            {/* Floating Resources Dropdown Card */}
            {resourcesDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '10px 0',
                minWidth: '190px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1050
              }}>
                {resourcesSubMenu.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    style={{
                      padding: '9px 18px',
                      color: '#0f172a',
                      fontSize: '13px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f9ff';
                      e.currentTarget.style.color = '#0084ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#0f172a';
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/about"
            style={{
              fontSize: '14px',
              fontWeight: currentPath === '/about' ? '800' : '700',
              color: currentPath === '/about' ? '#0084ff' : '#1e293b',
              textDecoration: 'none'
            }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{
              fontSize: '14px',
              fontWeight: currentPath === '/contact' ? '800' : '700',
              color: currentPath === '/contact' ? '#0084ff' : '#1e293b',
              textDecoration: 'none'
            }}
          >
            Contact Us
          </Link>
        </nav>

        {/* 3. Social Icons Grid, Admin Portal & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="winera-socials-desktop" style={{ alignItems: 'center', gap: '10px' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#1877f2',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#ff0000',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <a href="https://x.com" target="_blank" rel="noreferrer" style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#000000',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '14px'
            }}>
              𝕏
            </a>

            <Link to="/admin" style={{
              marginLeft: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: '#f1f5f9',
              color: '#475569',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              CMS
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="winera-hamburger"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            style={{
              background: '#00a8ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '6px',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Drawer Menu Overlay */}
        {mobileMenuOpen && (
          <div className="winera-mobile-drawer" style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: '0',
            right: '0',
            background: '#ffffff',
            borderRadius: '24px',
            padding: '22px 20px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.22)',
            border: '1.5px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '80vh',
            overflowY: 'auto',
            zIndex: 1100
          }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: currentPath === '/' ? '#0084ff' : '#0f172a',
                textDecoration: 'none',
                padding: '6px 0'
              }}
            >
              Home
            </Link>

            {/* Mobile Accordion - Products */}
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <button
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  padding: '6px 0',
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                <span>Products</span>
                <span style={{ fontSize: '12px', color: '#00a8ff', transform: mobileProductOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {mobileProductOpen && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px 14px',
                  marginTop: '12px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  {productSubMenu.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#334155',
                        textDecoration: 'none',
                        lineHeight: '1.4'
                      }}
                    >
                      • {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: '#0f172a',
                textDecoration: 'none',
                padding: '4px 0'
              }}
            >
              Projects
            </a>

            {/* Mobile Accordion - Resources */}
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  padding: '6px 0',
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
              >
                <span>Resources</span>
                <span style={{ fontSize: '12px', color: '#00a8ff', transform: mobileResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {mobileResourcesOpen && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '10px',
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0'
                }}>
                  {resourcesSubMenu.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#334155',
                        textDecoration: 'none'
                      }}
                    >
                      • {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: currentPath === '/about' ? '#0084ff' : '#0f172a',
                textDecoration: 'none',
                padding: '4px 0'
              }}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: '800',
                color: currentPath === '/contact' ? '#0084ff' : '#0f172a',
                textDecoration: 'none',
                padding: '4px 0'
              }}
            >
              Contact Us
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1877f2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>f</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e6683c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ig</a>
                <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#25d366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>wa</a>
              </div>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  background: '#00a8ff',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '900',
                  textDecoration: 'none'
                }}
              >
                ADMIN PANEL
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}