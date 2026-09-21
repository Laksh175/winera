import React, { useState, useRef } from 'react';

export default function SafetyMaterialStackedCardDeck({ cards = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  if (!cards || cards.length === 0) return null;

  const total = cards.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaY) > 35 || Math.abs(deltaX) > 35) {
      if (deltaY < -35 || deltaX < -35) {
        handleNext();
      } else if (deltaY > 35 || deltaX > 35) {
        handlePrev();
      }
    }
  };

  return (
    <div
      className="winera-cardstack-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Layered Card List */}
      <div className="winera-cardstack-viewport">
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;
          const zIndex = isActive ? 20 : (total - idx);

          return (
            <div
              key={idx}
              className={`winera-cardstack-card ${isActive ? 'is-active' : 'is-collapsed'}`}
              onClick={() => setActiveIndex(idx)}
              style={{ zIndex }}
            >
              {/* Card Header Row */}
              <div className="winera-cardstack-header">
                <div className={`winera-cardstack-badge ${isActive ? 'badge-active' : ''}`}>
                  {idx + 1}
                </div>
                <h3 className="winera-cardstack-title">
                  {card.title}
                </h3>
                <div className={`winera-cardstack-chevron ${isActive ? 'is-open' : ''}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {/* Card Body Description (Fully expands with no cut-off) */}
              <div
                className="winera-cardstack-body"
                style={{
                  maxHeight: isActive ? '320px' : '0px',
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? '12px' : '0px',
                  paddingTop: isActive ? '12px' : '0px',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <p className="winera-cardstack-desc">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Dots Indicator */}
      <div className="winera-cardstack-dots">
        {cards.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => setActiveIndex(dotIdx)}
            className={`winera-cardstack-dot ${dotIdx === activeIndex ? 'is-active' : ''}`}
            aria-label={`Go to standard ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}









