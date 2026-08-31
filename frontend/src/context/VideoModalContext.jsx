import React, { createContext, useContext, useState, useEffect } from 'react';

const VideoModalContext = createContext();

export function VideoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('Video Showcase');

  const openVideoModal = (url, title = 'Winera Video Showcase') => {
    setVideoUrl(url || '');
    setVideoTitle(title);
    setIsOpen(true);
  };

  const closeVideoModal = () => {
    setIsOpen(false);
    setVideoUrl('');
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
    <VideoModalContext.Provider value={{ isOpen, videoUrl, videoTitle, openVideoModal, closeVideoModal }}>
      {children}
      {isOpen && <VideoModalDialog videoUrl={videoUrl} title={videoTitle} onClose={closeVideoModal} />}
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
function VideoModalDialog({ videoUrl, title, onClose }) {
  // Helper to parse YouTube URL and extract video ID
  const getEmbedInfo = (url) => {
    // Default Twinkle Twinkle Little Star nursery rhyme video fallback
    const defaultKidsVideoEmbed = 'https://www.youtube-nocookie.com/embed/yCjJyiqpAuU?autoplay=1&rel=0&modestbranding=1&controls=1';

    if (!url || typeof url !== 'string') {
      return { type: 'youtube', embedUrl: defaultKidsVideoEmbed };
    }

    const trimmed = url.trim();

    // Direct MP4 / WebM video file
    if (trimmed.match(/\.(mp4|webm|ogg)($|\?)/i)) {
      return { type: 'direct', url: trimmed };
    }

    // YouTube regex patterns
    const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = trimmed.match(ytReg);

    if (match && match[1]) {
      const videoId = match[1];
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&enablejsapi=1`
      };
    }

    // If it's already an embed link
    if (trimmed.includes('youtube.com/embed/')) {
      const separator = trimmed.includes('?') ? '&' : '?';
      return {
        type: 'youtube',
        embedUrl: `${trimmed}${separator}autoplay=1&rel=0&modestbranding=1&controls=1`
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
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
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
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '860px',
          background: '#0f172a',
          borderRadius: '24px',
          border: '1.5px solid #38bdf8',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Modal Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 22px',
          background: '#1e293b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow: '0 0 8px #38bdf8'
            }} />
            <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
              {title}
            </h4>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Video Modal"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '700',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            ✕
          </button>
        </div>

        {/* Video Player Frame Container (16:9 Aspect Ratio) */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          height: 0,
          background: '#000000'
        }}>
          {embedInfo.type === 'direct' ? (
            <video
              src={embedInfo.url}
              controls
              autoPlay
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain'
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
