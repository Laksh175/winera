import React, { useState } from 'react';
import ctaGamersBg from '../assets/cta-gamers-bg.webp';
import LeadCaptureModal from './LeadCaptureModal';
import MotionFadeIn from './MotionFadeIn';

const getValidImg = (url, fallback) => {
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

const renderTextWithBreaks = (text, yellowHighlight = false) => {
  if (!text || typeof text !== 'string') return text;
  const lines = text.split(/<br\s*\/?>|\n/gi);
  return lines.map((line, i) => {
    const parts = line.split(/\*{1,2}(.*?)\*{1,2}/g);
    const content = parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} style={yellowHighlight ? { color: '#ffcd00' } : {}}>
            {part}
          </span>
        );
      }
      return part;
    });
    return (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {content}
      </React.Fragment>
    );
  });
};

export default function CtaBanner({
  pageSource = null,
  tagline = "READY TO GET STARTED?",
  title = "Start Your Game Zone Journey",
  titleFontSize = null,
  titleFontWeight = null,
  subtitle = "Game Zones Are India's Fastest Growing Business Are You In?",
  subtitleFontSize = null,
  subtitleFontWeight = null,
  description = "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company",
  descriptionFontSize = null,
  buttonText = "Talk to an Expert",
  buttonLink = "https://wa.me/919428989488",
  buttonTheme = "cyan",
  buttonBg = null,
  bgUrl = null,
  bg = ctaGamersBg,
  leftImgUrl = null,
  leftImg = null,
  rightImgUrl = null,
  rightImg = null,
  align = "left",
  yellowTitle = false,
  sectionPadding = "60px 4vw 80px",
  showOverlay = true,
  gradientTagline = false,
  gradientTitle = false,
  minHeight = "300px",
  leftImgMaxWidth = "280px"
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finalBg = getValidImg(bgUrl, bg);
  const finalLeftImg = getValidImg(leftImgUrl, leftImg);
  const finalRightImg = getValidImg(rightImgUrl, rightImg);
  const isCentered = align === 'center';
  const hasSideImages = Boolean(finalLeftImg || finalRightImg);

  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pageSourceTag = pageSource || currentUrl;

  return (
    <>
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pageSource={pageSourceTag}
        pageUrl={currentUrl}
      />
      <section style={{ padding: sectionPadding, background: '#F5F5F9' }}>
        <MotionFadeIn>
          <div className="winera-cta-banner-container" style={{
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
            backgroundImage: `url(${finalBg})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '24px',
            padding: isCentered ? (hasSideImages ? '48px 30px 48px' : '52px 40px 52px') : '52px 48px',
            minHeight: minHeight || '320px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCentered ? 'center' : 'flex-start'
          }}>

            {/* Dark Background Overlay (optional) */}
            {showOverlay && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(8, 12, 22, 0.85)',
                borderRadius: '24px',
                zIndex: 1
              }} />
            )}

            {/* Left Side Tilted Image Frame */}
            {finalLeftImg && (
              <div className="winera-cta-side-img winera-cta-left-img" style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%) rotate(-6deg)',
                zIndex: 5,
                pointerEvents: 'none',
                maxWidth: leftImgMaxWidth || '280px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={finalLeftImg}
                  alt="Left CTA Graphic"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
                  }}
                />
              </div>
            )}

            {/* Center / Main Content Box */}
            <div className="winera-cta-content-box" style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isCentered ? 'center' : 'flex-start',
              textAlign: isCentered ? 'center' : 'left',
              margin: isCentered ? '0 auto' : '0',
              width: '100%',
              maxWidth: isCentered ? '820px' : '650px'
            }}>
              {tagline && (
                <div className="winera-cta-tagline" style={{
                  fontSize: '1.75rem',
                  fontWeight: '900',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  textAlign: isCentered ? 'center' : 'left',
                  ...(gradientTagline ? {
                    background: 'linear-gradient(90deg, rgba(255, 212, 0, 1) 0%, rgba(238, 229, 183, 1) 30%, rgba(0, 174, 239, 1) 68%, rgba(167, 229, 245, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.85))',
                    display: 'inline-block'
                  } : {
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                  })
                }}>
                  {tagline}
                </div>
              )}

              {title && (
                <h2 className="winera-cta-title" style={{
                  fontSize: titleFontSize || '42px',
                  fontWeight: titleFontWeight || '900',
                  lineHeight: 1.25,
                  marginBottom: '14px',
                  letterSpacing: '0.2px',
                  textAlign: isCentered ? 'center' : 'left',
                  ...(gradientTitle ? {
                    background: 'linear-gradient(90deg, rgba(255, 212, 0, 1) 0%, rgba(238, 229, 183, 1) 30%, rgba(0, 174, 239, 1) 68%, rgba(167, 229, 245, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.85))',
                    display: 'inline-block'
                  } : {
                    color: '#ffffff',
                    textShadow: '0 4px 15px rgba(0,0,0,0.6)'
                  })
                }}>
                  {typeof title === 'string' ? (
                    renderTextWithBreaks(title, yellowTitle)
                  ) : (
                    title
                  )}
                </h2>
              )}

              {subtitle && (
                <div className="winera-cta-subtitle" style={{
                  fontSize: subtitleFontSize || 'clamp(1.2rem, 2.2vw, 1.6rem)',
                  fontWeight: subtitleFontWeight || '800',
                  color: '#ffffff',
                  lineHeight: 1.35,
                  marginBottom: '24px',
                  maxWidth: '820px',
                  textAlign: isCentered ? 'center' : 'left',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)'
                }}>
                  {typeof subtitle === 'string' ? (
                    renderTextWithBreaks(subtitle, false)
                  ) : (
                    subtitle
                  )}
                </div>
              )}

              {description && (
                <p className="winera-cta-description" style={{
                  fontSize: descriptionFontSize || '13px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  maxWidth: '620px'
                }}>
                  {description}
                </p>
              )}

              <div className="winera-cta-banner-btn-wrapper">
                {buttonBg ? (
                  <a
                    href={buttonLink || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                    aria-label={typeof buttonText === 'string' ? buttonText : "Get a Quote"}
                    style={{
                      width: '271px',
                      maxWidth: '82%',
                      height: '73px',
                      background: `url(${buttonBg}) center center / 100% 100% no-repeat`,
                      color: '#0f172a',
                      fontSize: '15px',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      padding: '4px 5px 2px 0'
                    }}
                  >
                    <span>{buttonText}</span>
                  </a>
                ) : (
                  <a
                    href={buttonLink || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsModalOpen(true);
                    }}
                    aria-label={typeof buttonText === 'string' ? buttonText : "Get a Quote"}
                    className={
                      buttonTheme === 'yellow_white' || buttonTheme === 'white_yellow'
                        ? "winera-cta-banner-btn-white"
                        : "winera-cta-banner-btn"
                    }
                  >
                    <span>{buttonText}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Side Tilted Image Frame */}
            {finalRightImg && (
              <div className="winera-cta-side-img winera-cta-right-img" style={{
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%) rotate(6deg)',
                zIndex: 5,
                pointerEvents: 'none',
                maxWidth: '360px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={finalRightImg}
                  alt="Right CTA Graphic"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '320px',
                    objectFit: 'contain',
                    borderRadius: '18px'
                  }}
                />
              </div>
            )}
          </div>
        </MotionFadeIn>
      </section>
    </>
  );
}
