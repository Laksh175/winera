import React, { useRef, useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
const projHulaboo = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345673/winera_uploads/a52mbp31belkkslptdal.jpg";
const projNeon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg";
const projSoft1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg";
const projectImage01 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345677/winera_uploads/igg4yrl7xhnxllqifpj7.jpg";
const clientsBg = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345643/winera_uploads/eogrtug3ijxrwz7xbc1y.png";

const defaultProjects = [
  { name: "FifthAlley Sport Bowling", title: "FifthAlley Sport Bowling", city: "Surat", location: "Surat, Gujarat", slug: "fifthalley-sport-bowling", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877018/winera_uploads/projects/lf45hnr7l9jwbij9gh4q.jpg" },
  { name: "Hulaboo", title: "Hulaboo", city: "Surat", location: "Surat, Gujarat", slug: "hulaboo", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877032/winera_uploads/projects/jvr2xtu8jszcmzaglxmr.jpg" },
  { name: "Playzonia", title: "Playzonia", city: "Surat", location: "Surat, Gujarat", slug: "playzonia", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877055/winera_uploads/projects/kqskvifgcu4d5yuthggs.jpg" },
  { name: "LaneX Bowling Alley", title: "LaneX Bowling Alley", city: "Surat", location: "Surat, Gujarat", slug: "lanex-bowling-alley", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877047/winera_uploads/projects/ax4fuat1a1uf3l7ex1he.jpg" },
  { name: "Rebounce", title: "Rebounce", city: "Surat", location: "Surat, Gujarat", slug: "rebounce", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877065/winera_uploads/projects/ulhoypau8uifcunj9ogn.jpg" },
  { name: "Level Up", title: "Level Up", city: "Morbi", location: "Morbi, Gujarat", slug: "level-up", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880283/winera_uploads/pskx11h3zysrl8yrx0te.jpg" },
  { name: "Rock and Bowl", title: "Rock and Bowl", city: "Vapi", location: "Vapi, Gujarat", slug: "rock-and-bowl", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791877846/winera_uploads/ebko4as1kehon9gbnkg7.jpg" },
  { name: "Rumble Zone", title: "Rumble Zone", city: "Gurugram", location: "Gurugram, Haryana", slug: "rumble-zone", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791880685/winera_uploads/ts0qlqlxigm1vfl1qp9s.jpg" },
  { name: "The Fun Factory", title: "The Fun Factory", city: "Nallasopara", location: "Nallasopara, Maharashtra", slug: "the-fun-factory", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881209/winera_uploads/b9jr71otq8j24u3ugqid.jpg" },
  { name: "Pop A Puddle", title: "Pop A Puddle", city: "Bangalore", location: "Bangalore, Karnataka", slug: "pop-a-puddle", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882402/winera_uploads/wikn3ojponc3myqreve9.jpg" },
  { name: "Skadoosh Play Area", title: "Skadoosh Play Area", city: "Bangalore", location: "Bangalore, Karnataka", slug: "skadoosh-play-area", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882832/winera_uploads/megu51reihwjmg7sodji.jpg" },
  { name: "VR 360 Game Zone", title: "VR 360 Game Zone", city: "Gandhidham", location: "Gandhidham, Gujarat", slug: "vr-360-game-zone", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791883780/winera_uploads/e9haienezg91tzsgj38x.jpg" },
  { name: "Altitude Ball in Ball Out", title: "Altitude Ball in Ball Out", city: "Mumbai", location: "Mumbai, Maharashtra", slug: "altitude-ball-in-ball-out", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791884286/winera_uploads/d9xxrrcg3v8trnkiq9kp.jpg" }
];

export default function ProjectsMarqueeSection({
  id = 'projects',
  title = <><span>GAME ZONES WE HAVE</span><br /><span>BUILT <span style={{ color: '#38bdf8' }}>ACROSS INDIA</span></span></>,
  simpleTitle = null,
  showTopHeader = true,
  subtext = "Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers.",
  projects = null,
  siteData = null,
  bg = 'transparent',
  buttonText = "View All",
  showBottomButton = false,
  accentWidth = '75%',
  accentMaxWidth = '100%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'left'
}) {
  const inactiveSlugs = new Set(
    (Array.isArray(siteData?.projectItems) ? siteData.projectItems : [])
      .filter(p => p.isActive === false || p.status === 'inactive')
      .map(p => (p.slug || '').toLowerCase())
  );

  const isProjectActive = (p) => {
    if (!p) return false;
    if (p.slug === 'funfair' || p.slug === 'skidz-play-spaces') return false;
    if (p.isActive === false || p.status === 'inactive') return false;
    const cleanSlug = (p.slug || '').toLowerCase();
    if (cleanSlug && inactiveSlugs.has(cleanSlug)) return false;
    return true;
  };

  const dynamicProjects = (Array.isArray(projects) && projects.length > 0)
    ? projects.filter(isProjectActive)
    : (Array.isArray(siteData?.builtProjects) && siteData.builtProjects.length > 0)
      ? siteData.builtProjects.filter(isProjectActive)
      : defaultProjects.filter(isProjectActive);

  const items = dynamicProjects;
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
  }, [items]);

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

        {/* Continuous Auto-Scroll & Manual Touch/Drag Infinite Marquee Projects Showcase */}
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
                  const matchedCmsItem = Array.isArray(siteData?.projectItems)
                    ? siteData.projectItems.find(p => {
                        const pSlug = (p.slug || p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                        const pName = (p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                        const cSlug = (proj.slug || proj.name || proj.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                        const cName = (proj.name || proj.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                        return (
                          (cSlug && pSlug === cSlug) ||
                          (cSlug && pName === cSlug) ||
                          (cName && pName === cName) ||
                          (cSlug && pSlug.startsWith(cSlug)) ||
                          (cSlug && cSlug.startsWith(pSlug)) ||
                          (cName && pName.includes(cName)) ||
                          (cName && cName.includes(pName))
                        );
                      })
                    : null;

                  const cardSlug = matchedCmsItem?.slug || proj.slug || (proj.name || proj.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  const href = cardSlug ? `/project/${cardSlug}` : '/project';

                  const isHulabooCard = (proj.slug === 'hulaboo' || (proj.name && proj.name.toLowerCase().includes('hulaboo')) || (proj.title && proj.title.toLowerCase().includes('hulaboo')));
                  const existingImg = proj.img || proj.imageUrl || proj.imgUrl || matchedCmsItem?.img || matchedCmsItem?.imageUrl;
                  const imgSrc = (existingImg && typeof existingImg === 'string' && existingImg.trim() !== '')
                    ? existingImg
                    : (isHulabooCard ? "/assets/Hulaboo ( Surat )/1st Image.jpg" : projHulaboo);
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
