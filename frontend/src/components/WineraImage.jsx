import React, { useState, useEffect, useRef } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(() => {
    if (!src) return true;
    return false;
  });
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
      return;
    }

    // Check if the DOM image is already complete in browser memory
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    // Preload check for instant cache hit
    const imgTester = new Image();
    imgTester.src = src;
    if (imgTester.complete && imgTester.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    imgTester.onload = () => {
      setIsLoaded(true);
    };
    imgTester.onerror = () => {
      setIsLoaded(true);
      setHasError(true);
    };

    // Fast safety fallback: Never let placeholder hang if image is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 350);

    return () => {
      clearTimeout(timer);
      imgTester.onload = null;
      imgTester.onerror = null;
    };
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
        display: 'block',
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
            pointerEvents: 'none',
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
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          opacity: isLoaded ? 1 : 0.85,
          transition: 'opacity 0.2s ease-in-out',
          display: 'block',
          ...imgStyle
        }}
        {...props}
      />
    </div>
  );
}
