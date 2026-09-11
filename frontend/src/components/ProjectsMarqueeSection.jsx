import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
import projectImage01 from '../assets/project-image01.webp';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';
import projSoft1 from '../assets/proj-softplay1.webp';

const defaultProjects = [
  { name: "Hulaboo", title: "Hulaboo", city: "Surat", location: "Surat", slug: "hulaboo", img: projHulaboo },
  { name: "Playzonia", title: "Playzonia", city: "Surat", location: "Surat", slug: "playzonia", img: projSoft1 },
  { name: "FifthAlley Sport Bowling", title: "FifthAlley Sport Bowling", city: "Surat", location: "Surat", slug: "fifthalley-sport-bowling", img: projectImage01 },
  { name: "Nenopanda", title: "Nenopanda", city: "Indore", location: "Indore", slug: "neon-panda", img: projNeon1 },
  { name: "FizzyFox", title: "FizzyFox", city: "Nashik", location: "Nashik", slug: "fizzyfox", img: projSoft1 }
];

export default function ProjectsMarqueeSection({
  id = 'projects',
  title = <>GAME ZONES WE HAVE<br />BUILT <span style={{ color: '#00a8ff' }}>ACROSS INDIA</span></>,
  simpleTitle = null,
  showTopHeader = true,
  subtext = "Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers.",
  projects = defaultProjects,
  bg = '#F5F5F9',
  buttonText = "View All",
  showBottomButton = false,
  accentWidth = '40%',
  accentMaxWidth = '100%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'center'
}) {
  const items = Array.isArray(projects) && projects.length > 0 ? projects : defaultProjects;

  return (
    <section id={id} style={{ padding: '35px 0 10px', background: bg, overflow: 'hidden' }}>
      <MotionFadeIn>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {showTopHeader ? (
          <div style={{
            maxWidth: '1340px',
            margin: '0 auto 45px',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 500px', minWidth: '280px' }}>
              <SectionHeading align="left" marginBottom="0" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
                {typeof title === 'string' ? (
                  (() => {
                    const parts = title.split(/\*{1,2}(.*?)\*{1,2}/g);
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

            <div style={{ textAlign: 'left', maxWidth: '420px', flex: '0 1 420px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
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

        {/* Continuous Infinite Marquee Projects Showcase */}
        <div style={{
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          position: 'relative',
          padding: '10px 0'
        }}>
          <div className="marquee-track">
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
                      style={{
                        width: '325px',
                        height: '325px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                        background: '#0f172a',
                        cursor: 'pointer',
                        flexShrink: 0,
                        textDecoration: 'none',
                        display: 'block'
                      }}
                    >
                      <img
                        src={finalImgSrc}
                        alt={proj.name || proj.title || "Built Game Zone"}
                        loading="lazy"
                        decoding="async"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          zIndex: 0
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
                        zIndex: 1
                      }}>
                        <div style={{ textAlign: 'left' }}>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                            {proj.name || proj.title}
                          </h3>
                          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', fontWeight: '400', margin: '2px 0 0 0', textTransform: 'capitalize' }}>
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
