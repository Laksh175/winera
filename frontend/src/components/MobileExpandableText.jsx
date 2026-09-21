import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * MobileExpandableText
 * - On desktop (> 850px): Renders preview + expanded content normally with no button.
 * - On mobile (<= 850px): Displays preview content with "See More ▾" inline at the end of the last line.
 */
const MobileExpandableText = ({
  preview,
  expandedContent,
  moreText = "See More",
  lessText = "See Less",
  className = "",
  style = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!expandedContent) {
    return <div className={className} style={style}>{preview}</div>;
  }

  const renderButton = (expanded) => (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      className="winera-see-more-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        padding: '1px 6px',
        fontSize: '9px',
        fontWeight: 600,
        fontFamily: "'Open Sans', sans-serif",
        color: 'rgba(0, 174, 239, 1)',
        background: 'rgba(0, 174, 239, 0.08)',
        border: '1px solid rgba(0, 174, 239, 0.22)',
        borderRadius: '10px',
        cursor: 'pointer',
        lineHeight: '12px',
        marginLeft: '4px',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        outline: 'none'
      }}
    >
      <span style={{ fontSize: '9px', lineHeight: '12px' }}>{expanded ? lessText : moreText}</span>
      {expanded ? (
        <ChevronUp style={{ width: '8px', height: '8px', strokeWidth: 2.5 }} />
      ) : (
        <ChevronDown style={{ width: '8px', height: '8px', strokeWidth: 2.5 }} />
      )}
    </button>
  );

  return (
    <div
      className={`winera-mobile-expandable-wrapper ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${className}`}
      style={{
        width: '100%',
        marginBottom: isMobile ? '12px' : '0px',
        ...style
      }}
    >
      {/* Primary Preview Content (Inline on Mobile when Collapsed) */}
      <div className="winera-expandable-preview" style={{ display: isMobile && !isExpanded ? 'inline' : 'block' }}>
        {preview}
        {isMobile && !isExpanded && renderButton(false)}
      </div>

      {/* Expanded Content: Visible always on Desktop, Toggleable on Mobile */}
      <div
        className={`winera-expandable-content ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
        style={{
          display: isMobile ? (isExpanded ? 'block' : 'none') : 'block',
          animation: isMobile && isExpanded ? 'wineraFadeSlideDown 0.25s ease forwards' : 'none'
        }}
      >
        {expandedContent}
        {isMobile && isExpanded && (
          <div style={{ display: 'inline-block', marginTop: '4px' }}>
            {renderButton(true)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileExpandableText;
