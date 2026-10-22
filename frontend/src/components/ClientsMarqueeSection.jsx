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
    { name: "LaneX Bowling", text: "LANEX BOWLING", font: "900" },
    { name: "Funfair Game Zone", text: "FUNFAIR GAMEZONE", font: "800" },
    { name: "Neon Panda", text: "NEON PANDA", font: "900" },
    { name: "Fizzy Fox", text: "FIZZY FOX", font: "800" },
    { name: "Funiverse", text: "FUNIVERSE", font: "900" },
    { name: "Rebounce", text: "REBOUNCE", font: "800" },
    { name: "Playzonia", text: "PLAYZONIA", font: "900" },
    { name: "FifthAlley", text: "FIFTHALLEY", font: "800" }
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
  const setWidthRef = useRef(1400);

  const rawList = (clientLogos && clientLogos.length > 0) ? clientLogos : defaultList;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Cache setWidth on mount and resize to avoid forced reflow in requestAnimationFrame
    const updateWidth = () => {
      const firstSet = track.children[0];
      if (firstSet && firstSet.offsetWidth > 0) {
        setWidthRef.current = firstSet.offsetWidth;
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth, { passive: true });

    let lastTime = performance.now();
    const baseSpeed = 38; // px per second

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const setWidth = setWidthRef.current;

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
      window.removeEventListener('resize', updateWidth);
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
                    <span key={index} style={{ color: '#0072b8' }}>
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
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '55px', paddingRight: '55px' }}>
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
                              src={(() => {
                                const u = client.logoUrl;
                                if (!u || typeof u !== 'string') return u;
                                if (u.includes('res.cloudinary.com') && u.includes('/upload/')) {
                                  if (u.includes('/f_auto,q_auto,w_')) return u.replace(/\/f_auto,q_auto,w_\d+\//, '/f_auto,q_auto:eco,w_180/');
                                  if (u.includes('/f_auto,q_auto/')) return u.replace('/upload/f_auto,q_auto/', '/upload/f_auto,q_auto:eco,w_180/');
                                  return u.replace('/upload/', '/upload/f_auto,q_auto:eco,w_180/');
                                }
                                return u;
                              })()}
                              alt={client.logoAlt || `${client.name || 'Client'} Logo - Winera International`}
                              width={220}
                              height={100}
                              loading="lazy"
                              decoding="async"
                              draggable="false"
                              style={{
                                width: 'auto',
                                height: 'auto',
                                maxHeight: '100px',
                                maxWidth: '220px',
                                aspectRatio: '220 / 100',
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

