import React from 'react';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

function parseStarText(children) {
  // If children is not a plain string, return as-is (e.g. already JSX)
  if (typeof children !== 'string') return children;

  const parts = children.split(/\*{1,2}(.*?)\*{1,2}/g);
  if (parts.length === 1) return children;

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} style={{
          color: '#00a8ff',
          fontFamily: "'Black Han Sans', sans-serif",
          fontWeight: '400',
          fontStyle: 'normal',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit'
        }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function SectionHeading({
  children,
  subtitle,
  accentWidth = '220px',
  accentMaxWidth = '260px',
  accentHeight = '10px',
  accentMarginBottom = '10px',
  accentAlign = 'center',
  align = 'center',
  marginBottom = '32px',
  accentFilter = null,
  accentColor = null,
  accentStyle = {},
  style = {}
}) {
  const isLeft = align === 'left';

  if (accentAlign === 'left-inline') {
    return (
      <div className="winera-section-heading-container" style={{
        display: 'block',
        position: 'relative',
        marginBottom: marginBottom,
        textAlign: align,
        width: '100%',
        ...style
      }}>
        <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '100%' }}>
          {accentColor ? (
            <div style={{
              display: 'block',
              width: accentWidth,
              maxWidth: accentMaxWidth,
              height: accentHeight,
              margin: `0 0 ${accentMarginBottom} 0`,
              backgroundColor: accentColor,
              WebkitMaskImage: `url(${yellowStrokeLine})`,
              maskImage: `url(${yellowStrokeLine})`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              ...accentStyle
            }} />
          ) : (
            <img
              src={yellowStrokeLine}
              alt=""
              style={{
                display: 'block',
                width: accentWidth,
                maxWidth: accentMaxWidth,
                height: accentHeight,
                margin: `0 0 ${accentMarginBottom} 0`,
                objectFit: 'fill',
                filter: accentFilter || 'none',
                ...accentStyle
              }}
            />
          )}
          <h2 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '50px',
            fontWeight: '400',
            fontStyle: 'normal',
            color: '#0f172a',
            letterSpacing: '0px',
            lineHeight: '60px'
          }}>
            {parseStarText(children)}
          </h2>
          {subtitle && (
            <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="winera-section-heading-container" style={{
      display: 'block',
      position: 'relative',
      marginBottom: marginBottom,
      textAlign: align,
      width: '100%',
      ...style
    }}>
      {accentColor ? (
        <div style={{
          display: 'block',
          width: accentWidth,
          maxWidth: accentMaxWidth,
          height: accentHeight,
          margin: isLeft ? `0 0 ${accentMarginBottom} 0` : `0 auto ${accentMarginBottom}`,
          backgroundColor: accentColor,
          WebkitMaskImage: `url(${yellowStrokeLine})`,
          maskImage: `url(${yellowStrokeLine})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          ...accentStyle
        }} />
      ) : (
        <img
          src={yellowStrokeLine}
          alt=""
          style={{
            display: 'block',
            width: accentWidth,
            maxWidth: accentMaxWidth,
            height: accentHeight,
            margin: isLeft ? `0 0 ${accentMarginBottom} 0` : `0 auto ${accentMarginBottom}`,
            objectFit: 'fill',
            filter: accentFilter || 'none',
            ...accentStyle
          }}
        />
      )}
      <h2 style={{
        fontFamily: "'Black Han Sans', sans-serif",
        fontSize: '50px',
        fontWeight: '400',
        fontStyle: 'normal',
        color: '#0f172a',
        letterSpacing: '0px',
        lineHeight: '60px'
      }}>
        {parseStarText(children)}
      </h2>
      {subtitle && (
        <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
