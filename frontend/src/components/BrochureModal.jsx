import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, ExternalLink } from 'lucide-react';

// Resolve local backend uploads vs external/public URLs
export const resolvePdfUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed === '#' || trimmed === '') return '';

  // Convert Google Drive view links to embed preview link
  if (trimmed.includes('drive.google.com/file/d/')) {
    const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  if (trimmed.startsWith('/uploads')) {
    if (import.meta.env.VITE_API_URL) {
      const base = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
      return `${base}${trimmed}`;
    }
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `${window.location.origin}${trimmed}`;
    }
    return `http://${hostname}:5001${trimmed}`;
  }

  if (trimmed.startsWith('/') && trimmed.includes(' ')) {
    return encodeURI(trimmed);
  }

  return trimmed;
};

// Check if device is mobile screen or touch mobile device
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Main brochure opener helper:
// On Mobile: Directly opens PDF full screen in phone's native PDF reader / new tab
// On Laptop / Desktop: Opens the interactive desktop BrochureModal
export const openBrochure = (pdfUrl, openModal) => {
  const resolved = resolvePdfUrl(pdfUrl);
  if (isMobileDevice() && resolved) {
    const win = window.open(resolved, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = resolved;
    }
  } else if (openModal) {
    openModal();
  }
};

const BrochureModal = ({
  isOpen,
  onClose,
  pdfUrl,
  title = "Winera Commercial Brochure",
  fileName
}) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const resolvedPdfUrl = resolvePdfUrl(pdfUrl);

  useEffect(() => {
    setMounted(true);
    const updateDevice = () => {
      setIsMobile(isMobileDevice());
    };
    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  // Lock background scroll (html & body) and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscroll;
      document.documentElement.style.overscrollBehavior = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        animation: 'wineraFadeIn 0.2s ease-out',
        overscrollBehavior: 'none'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0F172B',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '1100px',
          height: '92vh',
          maxHeight: '900px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.25)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          animation: 'wineraZoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '14px 20px',
            backgroundColor: '#0b1120',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(2, 132, 199, 0.1))',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                flexShrink: 0
              }}
            >
              <FileText style={{ width: '20px', height: '20px' }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: '800',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    letterSpacing: '-0.2px'
                  }}
                >
                  {title}
                </h3>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  PDF
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#94a3b8' }}>
                Winera International • Commercial Equipment Catalogue
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close brochure modal"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF viewer */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isMobile ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '28px 20px',
              textAlign: 'center',
              background: 'radial-gradient(circle at center, #1e293b 0%, #0b1120 100%)',
              color: '#ffffff',
              gap: '16px'
            }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(2, 132, 199, 0.15))',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                boxShadow: '0 8px 24px rgba(56, 189, 248, 0.25)'
              }}>
                <FileText style={{ width: '34px', height: '34px' }} />
              </div>

              <div>
                <h4 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>
                  {title}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', maxWidth: '320px', lineHeight: 1.5 }}>
                  Click below to open the complete official catalogue in full-screen on your phone.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px', marginTop: '8px' }}>
                <a
                  href={resolvedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 20px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #00a8ff 100%)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '15px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 18px rgba(0, 168, 255, 0.4)',
                    border: 'none'
                  }}
                >
                  <ExternalLink style={{ width: '18px', height: '18px' }} />
                  Open Fullscreen PDF
                </a>

                <a
                  href="https://wa.me/919157873576?text=Hello%20Winera%20International!%20Please%20share%20the%20equipment%20catalogue."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 18px',
                    background: 'rgba(37, 211, 102, 0.15)',
                    color: '#4ade80',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    textDecoration: 'none'
                  }}
                >
                  Request on WhatsApp
                </a>
              </div>
            </div>
          ) : resolvedPdfUrl ? (
            <iframe
              src={resolvedPdfUrl.includes('drive.google.com') ? resolvedPdfUrl : `${resolvedPdfUrl}#toolbar=1&navpanes=0`}
              title={title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                backgroundColor: '#ffffff'
              }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', gap: '12px', padding: '24px', textAlign: 'center' }}>
              <FileText style={{ width: '48px', height: '48px', color: '#38bdf8' }} />
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>Brochure PDF is being updated</p>
              <p style={{ margin: 0, fontSize: '13px', maxWidth: '420px', lineHeight: 1.5 }}>
                The official product catalogue is currently being synchronized. You can request it directly via WhatsApp.
              </p>
              <a
                href="https://wa.me/919157873576?text=Hello%20Winera%20International!%20Please%20share%20the%20equipment%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '8px',
                  padding: '10px 22px',
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: '10px',
                  fontWeight: '800',
                  textDecoration: 'none',
                  fontSize: '13px',
                  boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)'
                }}
              >
                Request Catalogue via WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Helper bar */}
        <div
          style={{
            padding: '9px 18px',
            backgroundColor: '#0b1120',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: '#94a3b8',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <span>✨ Use built-in viewer controls to zoom, print, or save the file.</span>
          {resolvedPdfUrl && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#38bdf8',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: '700'
              }}
            >
              <ExternalLink style={{ width: '13px', height: '13px' }} /> Open in New Tab
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BrochureModal;
