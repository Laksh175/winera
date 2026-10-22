import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import { sanitizeAndFormatHtml } from '../pages/BlogDetail';

export default function SafetyStructureAccordion({ cards = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const fallbackCards = [
    {
      num: "01",
      accent: "#00aeef",
      title: "Strong and Stable Setup (India)",
      desc: "In India, a game zone must pass a check for strong, stable structure before it can get a licence. We build and fix everything properly so your venue is ready to pass that check. This matters most for climbing walls, ninja courses, trampolines, and rides, where the structure has to hold real weight safely."
    },
    {
      num: "02",
      accent: "#ffd600",
      title: "Quality Checks (ISO 9001)",
      desc: "ISO 9001 is a worldwide standard for good quality work. It makes sure the design, sourcing, and installation are done to a consistent, high standard every time. We follow these quality practices in all our projects."
    },
    {
      num: "03",
      accent: "#00aeef",
      title: "Full Safety Check Before Handover",
      desc: "Good equipment alone is not enough. Once all the games and machines are installed, our trained team runs a full safety check on the complete setup. We hand it over only after everything passes."
    },
    {
      num: "04",
      accent: "#ffd600",
      title: "Safe Running & Maintenance (ISO 17842-2 / EN 13814-2)",
      desc: "These standards are about running and looking after the attractions safely after they are built. We set up your venue the right way and show your team how to run and maintain each attraction safely."
    }
  ];

  const cardList = Array.isArray(cards) && cards.length > 0 ? cards : fallbackCards;

  // Gentle auto-rotation that pauses when hovered or interacted with
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardList.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, cardList.length]);

  const getCardGradient = () => {
    // Winera Cyan / Sky Blue Brand Gradient (Image 1) for all cards in this section
    return 'linear-gradient(135deg, #0284c7 0%, #0099db 35%, #00aeef 70%, #38bdf8 100%)';
  };

  const getCardShadow = () => {
    return '0 20px 48px rgba(0, 174, 239, 0.32), 0 4px 16px rgba(0, 0, 0, 0.08)';
  };

  return (
    <div
      className="winera-safety-accordion-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* =========================================================
          DESKTOP & TABLET VIEW: HORIZONTAL EXPANDING CARDS DECK
          ========================================================= */}
      <div className="winera-safety-accordion-desktop">
        {cardList.map((card, idx) => {
          const isActive = idx === activeIndex;
          const numText = card.num || `0${idx + 1}`;

          return (
            <div
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              onMouseEnter={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              className={`winera-safety-accordion-card ${isActive ? 'is-expanded' : 'is-collapsed'} theme-cyan`}
              style={{
                ...(isActive
                  ? {
                      background: getCardGradient(),
                      boxShadow: getCardShadow()
                    }
                  : {})
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(idx);
                  setIsPaused(true);
                }
              }}
            >
              {isActive ? (
                /* ---------------- ACTIVE / EXPANDED CARD ---------------- */
                <div className="winera-safety-card-expanded-content">
                  {/* Subtle Decorative Ambient Shapes */}
                  <div className="winera-safety-card-ambient-top" />
                  <div className="winera-safety-card-ambient-bottom" />

                  {/* Top Bar: Left Shield Badge, Right Giant Watermark Number */}
                  <div className="winera-safety-card-topbar">
                    <div className="winera-safety-card-badge-shield">
                      <ShieldCheck size={24} strokeWidth={2.4} />
                    </div>

                    {/* Previous Style Giant Number on Right */}
                    <span className="winera-safety-watermark-num">
                      {numText}
                    </span>
                  </div>

                  {/* Bottom Text: Large Bold Title + Detailed Description */}
                  <div className="winera-safety-card-body">
                    <h3 className="winera-safety-card-title" style={{ color: '#ffffff' }}>
                      {card.title}
                    </h3>
                    <p
                      className="winera-safety-card-desc"
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', opacity: 1, margin: 0 }}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeAndFormatHtml(card.desc)
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* ---------------- COLLAPSED CARD (VERTICAL PILL) ---------------- */
                <div className="winera-safety-card-collapsed-content">
                  {/* Vertical Spine Title */}
                  <div className="winera-safety-collapsed-title-wrapper">
                    <span className="winera-safety-collapsed-title">
                      {card.title}
                    </span>
                  </div>

                  {/* Bottom Circular Number Badge */}
                  <div className="winera-safety-collapsed-badge-num badge-cyan">
                    {numText}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MOBILE VIEW: TOUCH-FRIENDLY VERTICAL EXPANDING ACCORDION
          ========================================================= */}
      <div className="winera-safety-accordion-mobile">
        {cardList.map((card, idx) => {
          const isActive = idx === activeIndex;
          const numText = card.num || `0${idx + 1}`;

          return (
            <div
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              className={`winera-safety-mobile-accordion-card ${isActive ? 'is-active' : ''} theme-cyan`}
            >
              {isActive ? (
                /* Mobile Active Expanded Card */
                <div
                  className="winera-safety-mobile-expanded-box"
                  style={{
                    background: getCardGradient(),
                    boxShadow: getCardShadow()
                  }}
                >
                  <div className="winera-safety-card-ambient-top" />
                  <div className="winera-safety-card-ambient-bottom" />
                  <div className="winera-safety-mobile-topbar">
                    <span className="winera-safety-card-badge-shield" style={{ width: '38px', height: '38px' }}>
                      <ShieldCheck size={20} strokeWidth={2.4} />
                    </span>

                    {/* Previous Style Giant Number on Right */}
                    <span className="winera-safety-mobile-watermark-num">
                      {numText}
                    </span>
                  </div>

                  <h3 className="winera-safety-mobile-title" style={{ color: '#ffffff' }}>
                    {card.title}
                  </h3>

                  <p
                    className="winera-safety-mobile-desc"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', opacity: 1, margin: 0 }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeAndFormatHtml(card.desc)
                    }}
                  />
                </div>
              ) : (
                /* Mobile Collapsed Bar */
                <div className="winera-safety-mobile-collapsed-bar bar-cyan">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <span className="winera-safety-mobile-pill-num num-cyan">
                      {numText}
                    </span>
                    <span className="winera-safety-mobile-pill-title">
                      {card.title}
                    </span>
                  </div>
                  <ChevronDown size={20} className="winera-safety-mobile-pill-icon icon-cyan" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
