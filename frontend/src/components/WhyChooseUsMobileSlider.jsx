import React, { useState, useRef } from 'react';
import { sanitizeAndFormatHtml } from '../utils/sanitizeHtml';
const homeLeftArrow = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345664/winera_uploads/c1v6ksephaop0pt9laxi.png";
const homeRightArrow = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/irelt5fskkf6fydyofmp.png";
const homeRightSign = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345665/winera_uploads/bt1fgaurbhpkmfhczato.png";

const renderTextWithBreaks = (text) => {
  if (!text || typeof text !== 'string') return text;
  const lines = text.split(/<br\s*\/?>/gi);
  return lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {idx > 0 && <br />}
      {line}
    </React.Fragment>
  ));
};

export default function WhyChooseUsMobileSlider({ items = [], customIcon, renderIcon }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef(0);

  if (!Array.isArray(items) || items.length === 0) return null;

  const safeIndex = activeIndex % items.length;
  const currentItem = items[safeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const renderCardIcon = () => {
    if (typeof renderIcon === 'function') {
      const iconElement = renderIcon(currentItem, safeIndex);
      if (React.isValidElement(iconElement)) {
        return (
          <div className="winera-why-us-card-icon">
            {iconElement}
          </div>
        );
      }
    }

    if (currentItem?.icon) {
      if (React.isValidElement(currentItem.icon)) {
        return (
          <div className="winera-why-us-card-icon">
            {currentItem.icon}
          </div>
        );
      }
    }

    if (currentItem?.iconUrl) {
      return (
        <div className="winera-why-us-card-icon">
          <img src={currentItem.iconUrl} alt="" />
        </div>
      );
    }

    if (customIcon) {
      if (React.isValidElement(customIcon)) {
        return (
          <div className="winera-why-us-card-icon">
            {customIcon}
          </div>
        );
      }
      return (
        <img
          src={customIcon}
          alt=""
          style={{
            width: '38px',
            height: '38px',
            minWidth: '38px',
            maxWidth: '38px',
            flexShrink: 0,
            objectFit: 'contain'
          }}
        />
      );
    }

    return (
      <img
        src={homeRightSign}
        alt=""
        style={{
          width: '38px',
          height: '38px',
          minWidth: '38px',
          maxWidth: '38px',
          flexShrink: 0,
          objectFit: 'contain'
        }}
      />
    );
  };

  return (
    <div className="winera-why-us-mobile-slider-container">
      <div className="winera-why-us-mobile-slider" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
        <button
          type="button"
          onClick={handlePrev}
          onMouseDown={(e) => e.preventDefault()}
          className="winera-why-us-btn-left"
          aria-label="Previous Point"
          style={{
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none'
          }}
        >
          <img
            src={homeLeftArrow}
            alt="Previous"
            draggable={false}
            style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
          />
        </button>

        <div
          className="winera-why-us-mobile-card"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          onTouchStart={(e) => {
            touchStartRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diffX = e.changedTouches[0].clientX - touchStartRef.current;
            if (diffX > 40) {
              handlePrev();
            } else if (diffX < -40) {
              handleNext();
            }
          }}
        >
          <div className="winera-why-us-card-header">
            {renderCardIcon()}
            <h3 className="winera-why-us-card-title">
              {renderTextWithBreaks(currentItem.title)}
            </h3>
          </div>

          <p className="winera-why-us-card-desc"
            dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(String(currentItem.desc || currentItem.description || currentItem.text || '').replace(/\n/g, '<br>')) }}
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          onMouseDown={(e) => e.preventDefault()}
          className="winera-why-us-btn-right"
          aria-label="Next Point"
          style={{
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none'
          }}
        >
          <img
            src={homeRightArrow}
            alt="Next"
            draggable={false}
            style={{ pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
          />
        </button>
      </div>
    </div>
  );
}
