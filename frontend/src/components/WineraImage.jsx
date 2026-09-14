import React, { useState, useEffect } from 'react';
import wineraLogo from '../assets/logo.webp';

export default function WineraImage({
  src,
  alt = '',
  className = '',
  style = {},
  imgStyle = {},
  placeholderStyle = {},
  logoSize = '45%',
  maxLogoWidth = '120px',
  objectFit = 'cover',
  onLoad,
  onError,
  wrapperProps = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
      return;
    }
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError(e);
  };

  return (
    <div
      className={`winera-img-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        backgroundColor: '#f1f5f9',
        ...style
      }}
      {...wrapperProps}
    >
      {/* Loading Placeholder with Blinking Winera Logo */}
      {!isLoaded && !hasError && (
        <div
          className="winera-img-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            ...placeholderStyle
          }}
        >
          <img
            src={wineraLogo}
            alt="Loading..."
            className="winera-logo-blinking"
            style={{
              width: logoSize,
              maxWidth: maxLogoWidth,
              height: 'auto',
              maxHeight: '60px',
              objectFit: 'contain'
            }}
          />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out',
          display: 'block',
          ...imgStyle
        }}
        {...props}
      />
    </div>
  );
}
