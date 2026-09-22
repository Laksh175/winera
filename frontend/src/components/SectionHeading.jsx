import React from 'react';
import yellowStrokeLine from '../assets/yellow-stroke-line.webp';

const ACRONYMS = new Set(['VR', 'AR', 'ROI', 'FAQ', 'FAQS', 'USA', 'UK', '3D', '4D', '5D', '7D', '9D', 'HD', 'AI', 'B2B', 'B2C']);

function formatWordToTitleCase(word) {
  if (!word) return word;
  const upper = word.toUpperCase();
  if (ACRONYMS.has(upper)) {
    return upper;
  }
  return word.replace(/\b([a-zA-Z]+)\b/g, (match, p1, offset, string) => {
    const mUpper = match.toUpperCase();
    if (ACRONYMS.has(mUpper)) return mUpper;
    if (offset > 0 && (string[offset - 1] === "'" || string[offset - 1] === "’")) {
      return match.toLowerCase();
    }
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });
}

export function toTitleCaseText(str) {
  if (typeof str !== 'string') return str;
  return str.split(/(\s+)/).map(part => {
    if (/^\s+$/.test(part)) return part;
    return formatWordToTitleCase(part);
  }).join('');
}

export function formatNodeToTitleCase(node) {
  if (typeof node === 'string') {
    return toTitleCaseText(node);
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      React.isValidElement(child) ? React.cloneElement(child, { key: child.key ?? i }, formatNodeToTitleCase(child.props.children)) : formatNodeToTitleCase(child)
    ));
  }
  if (React.isValidElement(node)) {
    if (node.props && node.props.children) {
      return React.cloneElement(node, {
        ...node.props,
        children: formatNodeToTitleCase(node.props.children)
      });
    }
  }
  return node;
}

function parseStarText(children) {
  // If children is not a plain string, format its children recursively
  if (typeof children !== 'string') {
    return formatNodeToTitleCase(children);
  }

  const parts = children.split(/\*{1,2}(.*?)\*{1,2}/g);
  if (parts.length === 1) return toTitleCaseText(children);

  return parts.map((part, index) => {
    const formattedPart = toTitleCaseText(part);
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
          {formattedPart}
        </span>
      );
    }
    return formattedPart;
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
            <div className="winera-section-heading-accent" style={{
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
              className="winera-section-heading-accent"
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
          <h2 className="winera-section-heading-h2" style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '35px',
            fontWeight: '400',
            fontStyle: 'normal',
            color: '#0f172a',
            letterSpacing: '0px',
            lineHeight: '1.2'
          }}>
            {parseStarText(children)}
          </h2>
          {subtitle && (
            <p className="winera-section-subtitle" style={{ color: 'rgb(55, 62, 65)', fontFamily: "'Open Sans', sans-serif", fontSize: '17px', lineHeight: '28px', fontWeight: '400', letterSpacing: '0px', marginTop: '10px', textAlign: align || 'center' }}>
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
      <div className="winera-section-heading-inner" style={{ display: 'inline-block', textAlign: align, maxWidth: '100%' }}>
        {accentColor ? (
          <div className="winera-section-heading-accent" style={{
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
            className="winera-section-heading-accent"
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
        <h2 className="winera-section-heading-h2" style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '35px',
          fontWeight: '400',
          fontStyle: 'normal',
          color: '#0f172a',
          letterSpacing: '0px',
          lineHeight: '1.2'
        }}>
          {parseStarText(children)}
        </h2>
        {subtitle && (
          <p className="winera-section-subtitle" style={{ color: 'rgb(55, 62, 65)', fontFamily: "'Open Sans', sans-serif", fontSize: '17px', lineHeight: '28px', fontWeight: '400', letterSpacing: '0px', marginTop: '10px', textAlign: align || 'center' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
