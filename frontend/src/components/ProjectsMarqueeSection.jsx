import React, { useRef, useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';
import projSoft1 from '../assets/proj-softplay1.webp';
import projectImage01 from '../assets/project-image01.webp';
import clientsBg from '../assets/clients-bg.webp';

const defaultProjects = [
  { name: "Hulaboo", title: "Hulaboo", city: "Surat", location: "Surat", slug: "hulaboo", img: projHulaboo },
  { name: "Playzonia", title: "Playzonia", city: "Surat", location: "Surat", slug: "playzonia", img: projSoft1 },
  { name: "FifthAlley Sport Bowling", title: "FifthAlley Sport Bowling", city: "Surat", location: "Surat", slug: "fifthalley-sport-bowling", img: projectImage01 },
  { name: "Nenopanda", title: "Nenopanda", city: "Indore", location: "Indore", slug: "neon-panda", img: projNeon1 },
  { name: "FizzyFox", title: "FizzyFox", city: "Nashik", location: "Nashik", slug: "fizzyfox", img: projSoft1 }
];

export default function ProjectsMarqueeSection({
  id = 'projects',
  title = <><span>GAME ZONES WE HAVE</span><br /><span>BUILT <span style={{ color: '#38bdf8' }}>ACROSS INDIA</span></span></>,
  simpleTitle = null,
  showTopHeader = true,
  subtext = "Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers.",
  projects = defaultProjects,
  bg = 'transparent',
  buttonText = "View All",
  showBottomButton = false,
  accentWidth = '75%',
  accentMaxWidth = '100%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'left'
}) {
  const items = Array.isArray(projects) && projects.length > 0 ? projects : defaultProjects;
  const isImageBg = bg && (typeof bg === 'string' && (bg.includes('.webp') || bg.includes('.png') || bg.includes('.jpg') || bg.startsWith('/')) || typeof bg === 'object');

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const baseSpeed = 38; // px per second

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const firstSet = track.children[0];
      const setWidth = firstSet ? firstSet.offsetWidth : 1695;

      if (!isInteractingRef.current) {
        if (Math.abs(velocityRef.current) > 0.5) {
          currentXRef.current += velocityRef.current * dt * 60;
          velocityRef.current *= 0.93; // smooth deceleration friction
        } else {
          velocityRef.current = 0;
          currentXRef.current -= baseSpeed * dt;
        }
      }

      // Seamless infinite looping wrap
      if (setWidth > 0) {
        while (currentXRef.current <= -setWidth * 2) {
          currentXRef.current += setWidth;
        }
        while (currentXRef.current >= -setWidth * 0.5) {
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
  }, [items]);

  // Touch & Pointer gesture handlers
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

    if (Math.abs(deltaX) > 5) {
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
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    // Limit max fling velocity
    velocityRef.current = Math.max(-20, Math.min(20, velocityRef.current));

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      velocityRef.current = 0;
    }, 1500);

    setTimeout(() => {
      hasMovedRef.current = false;
    }, 80);
  };

  const handleCardClick = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id={id} className="winera-projects-marquee-section winera-marquee-fullwidth" style={{
      position: 'relative',
      width: '100%',
      padding: isImageBg ? '110px 0 50px' : '35px 0 10px',
      background: isImageBg ? `url(${bg}) center/100% 100% no-repeat` : bg,
      minHeight: isImageBg ? '400px' : 'auto',
      overflow: 'hidden'
    }}>
      <MotionFadeIn>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {showTopHeader ? (
          <div className="winera-projects-marquee-header" style={{
            maxWidth: '1340px',
            margin: '0 auto 45px',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div className="winera-projects-marquee-header-left" style={{ flex: '1 1 580px', minWidth: '300px' }}>
              <SectionHeading align="left" marginBottom="0" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
                {typeof title === 'string' ? (
                  (() => {
                    let cleaned = title.replace(/GAME ZONES WE HAVE\s*<br\s*\/?>\s*/gi, 'GAME ZONES WE HAVE ');
                    if (cleaned.toLowerCase().includes('game zones we have')) {
                      return (
                        <>
                          <span>Game Zones We Have</span>
                          <br />
                          <span>
                            Built <span style={{ color: '#38bdf8' }}>Across India</span>
                          </span>
                        </>
                      );
                    }
                    const parts = cleaned.split(/\*{1,2}(.*?)\*{1,2}/g);
                    return parts.map((part, index) => {
                      if (index % 2 === 1) {
                        return (
                          <span key={index} style={{ color: '#38bdf8' }}>
                            {part}
                          </span>
                        );
                      }
                      return part;
                    });
                  })()
                ) : (
                  title
                )}
              </SectionHeading>
            </div>

            <div className="winera-projects-marquee-header-right" style={{ textAlign: 'left', maxWidth: '420px', flex: '0 1 420px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
              <p style={{ color: '#334155', fontSize: '13.5px', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                {subtext}
              </p>
              <div className="winera-cyan-cta-wrapper winera-cyan-cta-wrapper-sm">
                <a href="/project" className="winera-cyan-cta-btn winera-cyan-cta-btn-sm">
                  <span>{buttonText}</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '1240px', margin: '0 auto 50px', textAlign: 'center' }}>
            <SectionHeading marginBottom="0" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
              {simpleTitle || title}
            </SectionHeading>
          </div>
        )}

        {/* Gesture & Touch Controlled Infinite Marquee Projects Showcase */}
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
            overflow: 'hidden',
            position: 'relative',
            padding: '10px 0',
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
              <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingRight: '14px' }}>
                {items.map((proj, idx) => {
                  const cardSlug = proj.slug || (proj.name || proj.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  const href = cardSlug ? `/project/${cardSlug}` : '/project';

                  const imgSrc = proj.img || proj.imageUrl || proj.imgUrl || projHulaboo;
                  const finalImgSrc = (typeof imgSrc === 'string' && imgSrc.includes('/uploads/'))
                    ? imgSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp')
                    : imgSrc;

                  return (
                    <a
                      key={idx}
                      href={href}
                      onClick={handleCardClick}
                      draggable="false"
                      style={{
                        width: '325px',
                        height: '325px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                        background: '#0f172a',
                        cursor: isGrabbing ? 'grabbing' : 'pointer',
                        flexShrink: 0,
                        textDecoration: 'none',
                        display: 'block',
                        userSelect: 'none'
                      }}
                    >
                      <img
                        src={finalImgSrc}
                        alt={proj.name || proj.title || "Built Game Zone"}
                        loading="eager"
                        decoding="async"
                        draggable="false"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = projHulaboo;
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          zIndex: 0,
                          pointerEvents: 'none',
                          userSelect: 'none'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}>
                        <div style={{ textAlign: 'left' }}>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                            {proj.name || proj.title}
                          </h3>
                          <p className="winera-project-marquee-city" style={{ fontSize: '13.5px', color: '#e2e8f0', fontWeight: '500', margin: '2px 0 0 0', textTransform: 'capitalize' }}>
                            {proj.city || proj.location}
                          </p>
                        </div>

                        <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
                          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2" cy="7" r="1.5" fill="white" />
                            <path d="M2 7H20M20 7L14 1M20 7L14 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBottomButton && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
          <div className="winera-cyan-cta-wrapper">
            <a href="/project" className="winera-cyan-cta-btn" style={{ textDecoration: 'none', padding: '12px 36px', fontSize: '15.5px' }}>
              <span>{buttonText}</span>
            </a>
          </div>
        </div>
      )}
      </MotionFadeIn>
    </section>
  );
}
