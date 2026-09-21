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

  // Touch handlers for swipe (supports both vertical flick and horizontal swipe)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaY) > 30 || Math.abs(deltaX) > 30) {
      if (deltaY < -30 || deltaX < -30) {
        // Swiped UP or LEFT -> Next
        handleNext();
      } else if (deltaY > 30 || deltaX > 30) {
        // Swiped DOWN or RIGHT -> Prev
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
      {/* CardStack Viewport */}
      <div className="winera-cardstack-viewport">
        {cards.map((card, idx) => {
          const isActive = idx === activeIndex;
          const isBefore = idx < activeIndex;
          const isAfter = idx > activeIndex;

          let topPos = 'auto';
          let bottomPos = 'auto';
          let transform = 'translateY(0) scale(1)';
          let zIndex = 1;
          let opacity = 1;

          if (isBefore) {
            topPos = `${idx * 14}px`;
            bottomPos = 'auto';
            zIndex = idx + 1;
            transform = `scale(${1 - (activeIndex - idx) * 0.04})`;
            opacity = 0.7;
          } else if (isActive) {
            topPos = `${activeIndex * 14}px`;
            bottomPos = 'auto';
            zIndex = 10;
            transform = 'translateY(0) scale(1)';
            opacity = 1;
          } else if (isAfter) {
            topPos = 'auto';
            bottomPos = `${(total - 1 - idx) * 44}px`;
            zIndex = 10 + (total - idx);
            transform = 'translateY(0) scale(1)';
            opacity = 1;
          }

          return (
            <div
              key={idx}
              className={`winera-cardstack-card ${isActive ? 'is-active' : ''} ${isBefore ? 'is-before' : ''} ${isAfter ? 'is-after' : ''}`}
              onClick={() => setActiveIndex(idx)}
              style={{
                top: topPos,
                bottom: bottomPos,
                transform,
                zIndex,
                opacity
              }}
            >
              {/* Card Header */}
              <div className="winera-cardstack-header">
                <div className="winera-cardstack-badge">
                  {idx + 1}
                </div>
                <h3 className="winera-cardstack-title">
                  {card.title}
                </h3>
              </div>

              {/* Card Body Description */}
              <div
                className="winera-cardstack-body"
                style={{
                  maxHeight: isActive ? '200px' : '0px',
                  opacity: isActive ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.35s ease'
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
            aria-label={`Go to card ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}








