import React, { useRef, useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';

export default function ClientsMarqueeSection({
  id = 'clients',
  className = 'winera-clients-section winera-marquee-fullwidth',
  clientLogos = null,
  title = '*Our Clients* Section',
  subtitle = 'Our Complete Game Zone Equipment & Setup Solutions',
  bg = '#F5F5F9',
  defaultList = [
    { name: "Infinity", text: "∞", font: "bold" },
    { name: "LOGO", text: "LOGO˚", font: "900" },
    { name: "Logoipsum", text: "🌊 Logoipsum", font: "600" },
    { name: "IPSUM", text: "IPSUM™", font: "800" },
    { name: "Infinity2", text: "∞", font: "bold" },
    { name: "LOGO2", text: "LOGO˚", font: "900" },
    { name: "IPSUM2", text: "IPSUM™", font: "800" },
    { name: "Logoipsum2", text: "🌊 Logoipsum", font: "600" }
  ]
}) {
  const trackRef = useRef(null);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const startXRef = useRef(0);
  const dragStartCurrentXRef = useRef(0);
  const hasMovedRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const velocityRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const rawList = (clientLogos && clientLogos.length > 0) ? clientLogos : defaultList;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const baseSpeed = 38; // px per second

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const firstSet = track.children[0];
      const setWidth = firstSet ? firstSet.offsetWidth : 1400;

      if (!isInteractingRef.current) {
        if (Math.abs(velocityRef.current) > 0.5) {
          currentXRef.current += velocityRef.current * dt * 60;
          velocityRef.current *= 0.93; // smooth friction deceleration
        } else {
          velocityRef.current = 0;
          currentXRef.current -= baseSpeed * dt;
        }
      }

      // Seamless infinite looping wrap
      if (setWidth > 0) {
        while (currentXRef.current <= -setWidth) {
          currentXRef.current += setWidth;
        }
        while (currentXRef.current > 0) {
          currentXRef.current -= setWidth;
        }
      }

      track.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [clientLogos]);

  // Touch & Pointer gesture handlers for manual scrolling
  const handleStart = (clientX) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isInteractingRef.current = true;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    velocityRef.current = 0;

    startXRef.current = clientX;
    lastTouchXRef.current = clientX;
    lastTouchTimeRef.current = performance.now();
    dragStartCurrentXRef.current = currentXRef.current;
    setIsGrabbing(true);
  };

  const handleMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;

    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }

    const now = performance.now();
    const timeDiff = now - lastTouchTimeRef.current;
    if (timeDiff > 10) {
      velocityRef.current = ((clientX - lastTouchXRef.current) / timeDiff) * 16;
      lastTouchXRef.current = clientX;
      lastTouchTimeRef.current = now;
    }

    currentXRef.current = dragStartCurrentXRef.current + deltaX;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    }
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);

    // Limit max fling velocity
    velocityRef.current = Math.max(-25, Math.min(25, velocityRef.current));

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      velocityRef.current = 0;
    }, 800); // Resumes smooth auto-scroll 800ms after user releases

    setTimeout(() => {
      hasMovedRef.current = false;
    }, 80);
  };

  return (
    <section id={id} className={className} style={{
      position: 'relative',
      width: '100%',
      padding: '60px 0 45px',
      background: bg,
      minHeight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <MotionFadeIn style={{ width: '100%' }}>
      <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
        <SectionHeading marginBottom={subtitle ? "8px" : "30px"} accentWidth="400px" accentMaxWidth="400px">
          {(() => {
            const rawTitle = title || "*Our Clients* Section";
            const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
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
          })()}
        </SectionHeading>

        {subtitle ? (
          <p style={{ color: '#334155', fontSize: '13px', fontWeight: '600', marginBottom: '45px' }}>
            {subtitle}
          </p>
        ) : null}

        {/* Gesture & Touch Controlled Infinite Marquee Showcase */}
        <div
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onTouchCancel={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          style={{
            width: '100%',
            maxWidth: '100vw',
            margin: '0 auto',
            padding: '20px 0',
            overflow: 'hidden',
            position: 'relative',
            cursor: isGrabbing ? 'grabbing' : 'grab',
            userSelect: 'none',
            touchAction: 'pan-y'
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              width: 'max-content',
              willChange: 'transform'
            }}
          >
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '60px', paddingRight: '60px' }}>
                {(clientLogos && clientLogos.length > 0) ? (
                  (() => {
                    let list = [...clientLogos];
                    while (list.length < 8) {
                      list = [...list, ...clientLogos];
                    }
                    return list.map((client, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '115px',
                          userSelect: 'none',
                          pointerEvents: 'none'
                        }}
                      >
                        {client.logoUrl ? (
                          <img
                            src={client.logoUrl}
                            alt={client.name || 'Logo'}
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                            style={{
                              maxHeight: '110px',
                              maxWidth: '271px',
                              objectFit: 'contain',
                              userSelect: 'none',
                              pointerEvents: 'none'
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: '2.1rem', fontWeight: '900', color: '#1e293b', letterSpacing: '1px', userSelect: 'none' }}>
                            {client.name}
                          </span>
                        )}
                      </div>
                    ));
                  })()
                ) : (
                  defaultList.map((client, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: '2.1rem',
                        fontWeight: client.font || '900',
                        color: '#1e293b',
                        letterSpacing: '1px',
                        opacity: 0.85,
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        userSelect: 'none',
                        pointerEvents: 'none'
                      }}
                    >
                      {client.text || client.name}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </MotionFadeIn>
    </section>
  );
}

