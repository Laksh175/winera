import React, { useState } from 'react';
import ctaMainBanner from '../assets/cta-main-banner.png';
import LeadCaptureModal from './LeadCaptureModal';
import MotionFadeIn from './MotionFadeIn';

const getValidImg = (url, fallback) => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('/src/assets/')) {
    return fallback;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('/assets') || url.startsWith('assets/')) {
    return url;
  }
  if (url.startsWith('/uploads') || url.includes('/uploads/')) {
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
    const port = typeof window !== 'undefined' && (window.location.port === '5173' || window.location.port === '3000') ? '5001' : (window.location.port || '5001');
    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
    return `${protocol}//${hostname}:${port}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  return fallback;
};

const toTitleCase = (str) => {
  if (!str || typeof str !== 'string') return str;
  // Cleanly convert all-caps or mixed text to CamelCase / Title Case
  const cleanTokens = str.split(/(\s+|<br\s*\/?>|\n)/gi);
  return cleanTokens
    .map((token) => {
      if (/^\s+$/.test(token) || /<br\s*\/?>/i.test(token) || token === '\n') {
        return token;
      }
      return token.replace(/[a-zA-Z0-9']+/g, (word) => {
        const lower = word.toLowerCase();
        if (lower === "we're") return "We're";
        if (lower === "roi") return "ROI";
        if (lower === "vr") return "VR";
        if (lower === "ar") return "AR";
        if (lower === "fec") return "FEC";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
    })
    .join('')
    .replace(/\bWe'Re\b/g, "We're");
};

const renderTextWithBreaks = (text, yellowHighlight = false) => {
  if (!text || typeof text !== 'string') return text;
  const convertedText = toTitleCase(text);
  const lines = convertedText.split(/<br\s*\/?>|\n/gi);
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
        {i > 0 && (
          <>
            <br className="winera-cta-br" />
            {" "}
          </>
        )}
        {content}
      </React.Fragment>
    );
  });
};

export default function CtaBanner({
  pageSource = null,
  tagline = "Ready To Get Started?",
  title = "Start Your Game Zone Journey",
  titleFontSize = null,
  titleFontWeight = null,
  subtitle = "Game Zones Are India's Fastest Growing Business Are You In?",
  subtitleFontSize = null,
  subtitleFontWeight = null,
  description = "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company",
  descriptionFontSize = null,
  descriptionFontWeight = null,
  buttonText = "Talk to an Expert",
  buttonLink = "https://wa.me/919428989488",
  buttonTheme = "cyan",
  buttonBg = null,
  bgUrl = null,
  bg = ctaMainBanner,
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
  leftImgMaxWidth = "280px",
  containerPadding = null,
  contentBoxPadding = null,
  showTextShadow = true,
  blurBg = false,
  titleMaxWidth = null,
  subtitleMaxWidth = null
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCustomBgUploaded = Boolean(
    bgUrl &&
    typeof bgUrl === 'string' &&
    bgUrl.trim() !== '' &&
    getValidImg(bgUrl, null) !== null
  );

  const finalBg = getValidImg(bgUrl, bg);
  const finalLeftImg = isCustomBgUploaded ? null : getValidImg(leftImgUrl, leftImg);
  const finalRightImg = isCustomBgUploaded ? null : getValidImg(rightImgUrl, rightImg);
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
          <div className={`winera-cta-banner-container ${isCustomBgUploaded ? 'winera-cta-custom-bg' : ''}`} style={{
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: '24px',
            padding: containerPadding || '0px 32px',
            minHeight: 'auto',
            aspectRatio: 'auto',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCentered ? 'center' : 'flex-start'
          }}>

            {/* Background Image Layer (with optional blur - disabled for custom uploaded banners) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${finalBg})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              filter: (blurBg && !isCustomBgUploaded) ? 'blur(6px) scale(1.05)' : 'none',
              borderRadius: '24px',
              zIndex: 0
            }} />

            {/* Dark Background Overlay (disabled/transparent for custom uploaded banners to preserve 100% image brightness) */}
            {showOverlay && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isCustomBgUploaded
                  ? 'transparent'
                  : ((blurBg && !isCustomBgUploaded)
                      ? 'rgba(8, 12, 22, 0.82)'
                      : 'linear-gradient(180deg, rgba(8, 12, 22, 0.4) 0%, rgba(8, 12, 22, 0.55) 100%)'),
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
              maxWidth: isCentered ? (hasSideImages ? '620px' : '860px') : '650px',
              justifyContent: isCustomBgUploaded ? 'flex-end' : 'center',
              padding: contentBoxPadding || (isCustomBgUploaded ? '120px 0 24px' : '24px 0')
            }}>
              {!isCustomBgUploaded && tagline && (
                <div className="winera-cta-tagline" style={{
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                  fontWeight: '900',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  textTransform: 'none',
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
                  {toTitleCase(tagline)}
                </div>
              )}

              {!isCustomBgUploaded && title && (
                <h2 className="winera-cta-title" style={{
                  fontSize: titleFontSize || 'clamp(24px, 2.6vw, 34px)',
                  fontWeight: titleFontWeight || '900',
                  lineHeight: 1.22,
                  marginBottom: '10px',
                  letterSpacing: '0.2px',
                  maxWidth: titleMaxWidth || (hasSideImages ? '600px' : '100%'),
                  textAlign: isCentered ? 'center' : 'left',
                  ...(gradientTitle ? {
                    background: 'linear-gradient(90deg, rgba(255, 212, 0, 1) 0%, rgba(238, 229, 183, 1) 35%, rgba(0, 174, 239, 1) 70%, rgba(125, 211, 252, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.85))',
                    display: 'inline-block'
                  } : {
                    color: '#ffffff',
                    textShadow: showTextShadow ? '0 4px 15px rgba(0,0,0,0.6)' : 'none'
                  })
                }}>
                  {typeof title === 'string' ? (
                    renderTextWithBreaks(title, yellowTitle)
                  ) : (
                    title
                  )}
                </h2>
              )}

              {!isCustomBgUploaded && subtitle && (
                <div className="winera-cta-subtitle" style={{
                  fontSize: subtitleFontSize || 'clamp(15px, 1.8vw, 22px)',
                  fontWeight: subtitleFontWeight || '400',
                  color: '#ffffff',
                  lineHeight: 1.3,
                  marginBottom: '14px',
                  maxWidth: subtitleMaxWidth || (hasSideImages ? '530px' : '840px'),
                  textAlign: isCentered ? 'center' : 'left',
                  textShadow: showTextShadow ? '0 2px 10px rgba(0,0,0,0.85)' : 'none'
                }}>
                  {typeof subtitle === 'string' ? (
                    renderTextWithBreaks(subtitle, false)
                  ) : (
                    subtitle
                  )}
                </div>
              )}

              {!isCustomBgUploaded && description && (
                <p className="winera-cta-description" style={{
                  fontSize: descriptionFontSize || '13px',
                  fontWeight: descriptionFontWeight || '400',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  maxWidth: hasSideImages ? '560px' : '620px'
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
