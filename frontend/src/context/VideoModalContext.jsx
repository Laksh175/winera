import React, { createContext, useContext, useState, useEffect } from 'react';

const VideoModalContext = createContext();

export function VideoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('Video Showcase');
  const [videoOptions, setVideoOptions] = useState({});

  const openVideoModal = (url, title = 'Winera Video Showcase', options = {}) => {
    setVideoUrl(url || '');
    setVideoTitle(title);
    setVideoOptions(typeof options === 'object' && options !== null ? options : {});
    setIsOpen(true);
  };

  const closeVideoModal = () => {
    setIsOpen(false);
    setVideoUrl('');
    setVideoOptions({});
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeVideoModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <VideoModalContext.Provider value={{ isOpen, videoUrl, videoTitle, videoOptions, openVideoModal, closeVideoModal }}>
      {children}
      {isOpen && (
        <VideoModalDialog
          videoUrl={videoUrl}
          title={videoTitle}
          options={videoOptions}
          onClose={closeVideoModal}
        />
      )}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error('useVideoModal must be used within a VideoModalProvider');
  }
  return context;
}

// Internal Modal Dialog Component
function VideoModalDialog({ videoUrl, title, options = {}, onClose }) {
  const trimmed = typeof videoUrl === 'string' ? videoUrl.trim() : '';
  const isVerticalDetected = Boolean(
    options?.isVertical ||
    trimmed.includes('/shorts/') ||
    trimmed.includes('shorts/') ||
    trimmed.includes('reel') ||
    trimmed.includes('tiktok') ||
    trimmed.includes('vertical=true') ||
    (typeof title === 'string' && title.toLowerCase().includes('review'))
  );

  const [isVertical, setIsVertical] = useState(isVerticalDetected);

  useEffect(() => {
    setIsVertical(isVerticalDetected);
  }, [videoUrl, isVerticalDetected]);

  // Helper to parse YouTube URL and extract video ID
  const getEmbedInfo = (url) => {
    // Default Twinkle Twinkle Little Star nursery rhyme video fallback
    const defaultKidsVideoEmbed = 'https://www.youtube-nocookie.com/embed/yCjJyiqpAuU?autoplay=1&rel=0&modestbranding=1&controls=1';

    if (!url || typeof url !== 'string') {
      return { type: 'youtube', embedUrl: defaultKidsVideoEmbed };
    }

    const clean = url.trim();

    // Direct MP4 / WebM video file
    if (clean.match(/\.(mp4|webm|ogg)($|\?)/i)) {
      return { type: 'direct', url: clean };
    }

    // YouTube regex patterns (supports standard, shorts, embed, youtu.be, and query parameters)
    const ytReg = /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/))([^"&?\/\s]{11})/i;
    const match = clean.match(ytReg);

    if (match && match[1]) {
      const videoId = match[1];
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&enablejsapi=1`
      };
    }

    // If it's already an embed link
    if (clean.includes('youtube.com/embed/')) {
      const separator = clean.includes('?') ? '&' : '?';
      return {
        type: 'youtube',
        embedUrl: `${clean}${separator}autoplay=1&rel=0&modestbranding=1&controls=1`
      };
    }

    // Fallback default Kids Play Zone video for any non-video link (e.g. WhatsApp links)
    return {
      type: 'youtube',
      embedUrl: defaultKidsVideoEmbed
    };
  };

  const embedInfo = getEmbedInfo(videoUrl);

  return (
    <div
      className="winera-video-dialog-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        animation: 'wineraFadeIn 0.25s ease'
      }}
    >
      <style>{`
        @keyframes wineraFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className={`winera-video-modal-card ${isVertical ? 'is-vertical-video' : 'is-landscape-video'}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: isVertical ? '420px' : '880px',
          background: '#0f172a',
          borderRadius: '22px',
          border: '1.5px solid #38bdf8',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxHeight: '94vh',
          transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Modal Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#1e293b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          gap: '10px',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 8px #38bdf8',
              flexShrink: 0
            }} />
            <h4 style={{
              fontSize: '13.5px',
              fontWeight: '700',
              margin: 0,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {title}
            </h4>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Aspect Ratio Toggle (9:16 Shorts vs 16:9 Landscape) */}
            <button
              onClick={() => setIsVertical((prev) => !prev)}
              aria-label={isVertical ? "Switch to Landscape View (16:9)" : "Switch to Portrait View (9:16)"}
              title={isVertical ? "Switch to Wide View (16:9)" : "Switch to Portrait View (9:16)"}
              style={{
                background: isVertical ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: isVertical ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.2)',
                color: isVertical ? '#38bdf8' : '#e2e8f0',
                padding: '4px 9px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                outline: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{isVertical ? '📱 9:16' : '🖥️ 16:9'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Video Modal"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#ffffff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '700',
                outline: 'none',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ef4444'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player Frame Container (Responsive 9:16 for Shorts / 16:9 for Wide) */}
        <div style={{
          position: 'relative',
          width: '100%',
          background: '#000000',
          overflow: 'hidden',
          ...(isVertical ? {
            aspectRatio: '9 / 16',
            maxHeight: 'calc(94vh - 52px)',
            margin: '0 auto'
          } : {
            aspectRatio: '16 / 9',
            width: '100%'
          })
        }}>
          {embedInfo.type === 'direct' ? (
            <video
              src={embedInfo.url}
              controls
              autoPlay
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: isVertical ? 'contain' : 'cover'
              }}
            />
          ) : (
            <iframe
              src={embedInfo.embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
