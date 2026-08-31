import React from 'react';
import ctaGamersBg from '../assets/cta-gamers-bg.webp';

export default function CtaBanner({
  tagline = "READY TO GET STARTED?",
  title = "Start Your Game Zone Journey",
  subtitle = "Game Zones Are India's Fastest Growing Business Are You In?",
  description = "Get expert guidance, custom layout design and complete installation support from India's trusted game zone setup company",
  buttonText = "Talk to an Expert",
  buttonLink = "https://wa.me/919428989488",
  bgUrl = null,
  bg = ctaGamersBg,
  align = "left",
  yellowTitle = false
}) {
  const bannerBackground = bgUrl || bg;
  const isCentered = align === 'center';

  return (
    <section style={{ padding: '60px 4vw 80px', background: '#F5F5F9', textAlign: 'center' }}>
      <div className="winera-cta-banner-container" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative',
        background: `url(${bannerBackground}) center/cover no-repeat`,
        borderRadius: '24px',
        padding: isCentered ? '55px 40px' : '48px 50px',
        minHeight: '290px',
        aspectRatio: '1920 / 520',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCentered ? 'center' : 'flex-start',
        textAlign: isCentered ? 'center' : 'left'
      }}>
        <div style={{ maxWidth: isCentered ? '780px' : '580px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: isCentered ? 'center' : 'flex-start' }}>
          {tagline && (
            <span style={{
              fontSize: '13px',
              fontWeight: '900',
              color: '#38bdf8',
              letterSpacing: '1.5px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              {tagline}
            </span>
          )}

          <h2 style={{
            fontSize: isCentered ? '2.4rem' : '2.4rem',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '10px',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)'
          }}>
            {typeof title === 'string' && yellowTitle ? (
              (() => {
                const parts = title.split(/\*{1,2}(.*?)\*{1,2}/g);
                return parts.map((part, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} style={{ color: '#ffcd00' }}>
                        {part}
                      </span>
                    );
                  }
                  return part;
                });
              })()
            ) : (
              title
            )}
          </h2>

          {subtitle && (
            <p style={{
              fontSize: '14.5px',
              fontWeight: '800',
              color: '#ffcd00',
              lineHeight: 1.4,
              marginBottom: '10px',
              maxWidth: '680px'
            }}>
              {subtitle}
            </p>
          )}

          {description && (
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#e2e8f0',
              lineHeight: 1.6,
              marginBottom: '24px',
              maxWidth: '620px'
            }}>
              {description}
            </p>
          )}

          <div className="winera-cyan-cta-wrapper">
            <a
              href={buttonLink}
              target="_blank"
              rel="noreferrer"
              aria-label={typeof buttonText === 'string' ? buttonText : "Get Quote Now"}
              className="winera-cyan-cta-btn"
            >
              <span>{buttonText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
