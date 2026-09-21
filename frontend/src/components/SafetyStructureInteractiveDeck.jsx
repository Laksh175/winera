import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function SafetyStructureInteractiveDeck({ cards = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const isUserScrollingRef = useRef(false);

  if (!cards || cards.length === 0) return null;

  // Short labels for the top tabs
  const tabLabels = [
    "01 Structure",
    "02 Quality",
    "03 Safety Check",
    "04 Maintenance"
  ];

  const scrollToCard = (index) => {
    setActiveIndex(index);
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth * 0.88 + 14; // card width + gap
    isUserScrollingRef.current = true;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 450);
  };

  const handleScroll = () => {
    if (isUserScrollingRef.current || !scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth * 0.88 + 14;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== activeIndex && newIdx >= 0 && newIdx < cards.length) {
      setActiveIndex(newIdx);
    }
  };

  return (
    <div className="winera-safety-structure-interactive-container">
      {/* Top Segmented Number Pills */}
      <div className="winera-safety-structure-tabs">
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;
          const accentColor = card.accent || (idx % 2 === 0 ? '#00aeef' : '#ffd600');
          return (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              className={`winera-safety-structure-tab ${isActive ? 'is-active' : ''}`}
              style={{
                borderColor: isActive ? accentColor : '#e2e8f0',
                background: isActive ? '#ffffff' : '#f8fafc',
                color: isActive ? '#0f172a' : '#64748b'
              }}
            >
              <span
                className="winera-safety-structure-tab-dot"
                style={{ background: accentColor }}
              />
              <span className="winera-safety-structure-tab-text">
                {card.num || `0${idx + 1}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Swipeable Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="winera-safety-structure-track"
      >
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;
          const accentColor = card.accent || (idx % 2 === 0 ? '#00aeef' : '#ffd600');

          return (
            <div
              key={idx}
              className={`winera-safety-structure-slide ${isActive ? 'is-active' : ''}`}
            >
              {/* Offset Accent Backing */}
              <div
                className="winera-safety-structure-card-accent"
                style={{ background: accentColor }}
              />

              {/* Main White Card */}
              <div className="winera-safety-structure-card-box">
                {/* Header Row: Shield Icon + Watermark Number */}
                <div className="winera-safety-structure-card-header">
                  <div
                    className="winera-safety-structure-icon-badge"
                    style={{
                      background: accentColor === '#ffd600' ? '#fef3c7' : '#d8eefd',
                      color: accentColor === '#ffd600' ? '#d97706' : '#0284c7'
                    }}
                  >
                    <ShieldCheck style={{ width: '22px', height: '22px' }} />
                  </div>

                  <span className="winera-safety-structure-watermark">
                    {card.num || `0${idx + 1}`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="winera-safety-structure-card-title">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="winera-safety-structure-card-desc">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Progress Dots */}
      <div className="winera-safety-structure-dots">
        {cards.map((card, dotIdx) => {
          const isActive = dotIdx === activeIndex;
          const accentColor = card.accent || (dotIdx % 2 === 0 ? '#00aeef' : '#ffd600');
          return (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToCard(dotIdx)}
              className={`winera-safety-structure-dot ${isActive ? 'is-active' : ''}`}
              style={{
                background: isActive ? accentColor : '#cbd5e1'
              }}
              aria-label={`Go to standard ${dotIdx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
