import React, { useState, useRef } from 'react';
import homeLeftArrow from '../assets/home-page-left-arrow.png';
import homeRightArrow from '../assets/home-page-right-arrow.png';
import homeRightSign from '../assets/home-right-sign.webp';

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
      <div className="winera-why-us-mobile-slider">
        <button
          type="button"
          onClick={handlePrev}
          className="winera-why-us-btn-left"
          aria-label="Previous Point"
        >
          <img src={homeLeftArrow} alt="Previous" />
        </button>

        <div
          className="winera-why-us-mobile-card"
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
            <h4 className="winera-why-us-card-title">
              {currentItem.title}
            </h4>
          </div>

          <p className="winera-why-us-card-desc">
            {currentItem.desc || currentItem.description || currentItem.text}
          </p>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="winera-why-us-btn-right"
          aria-label="Next Point"
        >
          <img src={homeRightArrow} alt="Next" />
        </button>
      </div>
    </div>
  );
}
