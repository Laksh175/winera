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
        <span key={index} style={{ color: '#00a8ff' }}>
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
  align = 'center',
  marginBottom = '32px',
  style = {}
}) {
  const isLeft = align === 'left';

  return (
    <div className="winera-section-heading-container" style={{
      display: 'block',
      position: 'relative',
      marginBottom: marginBottom,
      textAlign: align,
      width: '100%',
      ...style
    }}>
      <img
        src={yellowStrokeLine}
        alt=""
        style={{
          display: 'block',
          width: accentWidth,
          maxWidth: accentMaxWidth,
          height: '10px',
          margin: isLeft ? '0 0 10px 0' : '0 auto 10px',
          objectFit: 'fill'
        }}
      />
      <h2 style={{
        fontSize: '2.8rem',
        fontWeight: '900',
        color: '#0f172a',
        letterSpacing: '-0.5px',
        lineHeight: 1.15
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
