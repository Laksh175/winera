import React, { useState, useEffect, useRef } from 'react';
const wineraLogo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/dqjnjhybdtibqy4soznu.png";

// Global cache to remember images loaded in current session for instant rendering
const loadedImageCache = new Set();

const optimizeCloudinaryUrl = (url, width) => {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com') || !url.includes('/image/upload/')) return url;
  
  if (url.includes('f_auto') && url.includes('q_auto')) {
    if (width && !url.includes('w_')) {
      return url.replace('/image/upload/f_auto,q_auto/', `/image/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  }
  const transforms = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
  return url.replace('/image/upload/', `/image/upload/${transforms}/`);
};

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
  targetWidth = 500,
  loading = 'lazy',
  onLoad,
  onError,
  wrapperProps = {},
  ...props
}) {
  const effectiveSrc = optimizeCloudinaryUrl(src, targetWidth);
  const [isLoaded, setIsLoaded] = useState(() => {
    if (!effectiveSrc) return true;
    return loadedImageCache.has(effectiveSrc);
  });
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!effectiveSrc) {
      setIsLoaded(true);
      return;
    }

    if (loadedImageCache.has(effectiveSrc)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    setHasError(false);

    // If DOM image is already complete in browser memory/cache
    if (imgRef.current && imgRef.current.complete) {
      loadedImageCache.add(effectiveSrc);
      setIsLoaded(true);
    }
  }, [effectiveSrc]);

  const handleLoad = (e) => {
    if (effectiveSrc) loadedImageCache.add(effectiveSrc);
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
        backgroundColor: 'transparent',
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
            transition: 'opacity 0.25s ease-out',
            ...placeholderStyle
          }}
        >
          <img
            src={wineraLogo}
            alt="Loading..."
            className="winera-logo-blinking"
            width="120"
            height="35"
            style={{
              width: logoSize,
              maxWidth: maxLogoWidth,
              height: 'auto',
              maxHeight: '50px',
              aspectRatio: '120 / 35',
              objectFit: 'contain',
              opacity: 0.6
            }}
          />
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={effectiveSrc}
        alt={alt || 'Winera International - Commercial Game Zone Setup & Equipment'}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.25s ease-in-out',
          display: 'block',
          ...imgStyle
        }}
        {...props}
      />
    </div>
  );
}
