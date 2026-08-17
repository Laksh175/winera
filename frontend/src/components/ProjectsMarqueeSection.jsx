import React from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import projHulaboo from '../assets/proj-hulaboo.png';
import projNeon1 from '../assets/proj-neonpanda1.png';
import projSoft1 from '../assets/proj-softplay1.png';

const defaultProjects = [
  { title: "Hulaboo", location: "Surat", img: projHulaboo },
  { title: "Nenopanda", location: "Indore", img: projNeon1 },
  { title: "Nenopanda", location: "Indore", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
  { title: "Nenopanda", location: "Indore", img: projSoft1 }
];

export default function ProjectsMarqueeSection({
  id = 'projects',
  title = <>GAME ZONES WE HAVE<br />BUILT <span style={{ color: '#00a8ff' }}>ACROSS INDIA</span></>,
  simpleTitle = null,
  showTopHeader = true,
  subtext = "Explore our successfully completed projects delivered across India from small indoor game zones to large family entertainment centers.",
  projects = defaultProjects,
  bg = '#F5F5F9'
}) {
  return (
    <section id={id} style={{ padding: '80px 0 100px', background: bg, overflow: 'hidden' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {showTopHeader ? (
          <div style={{
            maxWidth: '1240px',
            margin: '0 auto 45px',
            padding: '0 4vw',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            <SectionHeading align="left" marginBottom="0" accentWidth="60%" accentMaxWidth="360px">
              {typeof title === 'string' ? (
                (() => {
                  const parts = title.split(/\*{1,2}(.*?)\*{1,2}/g);
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
                })()
              ) : (
                title
              )}
            </SectionHeading>

            <div style={{ textAlign: 'left', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, fontWeight: '500' }}>
                {subtext}
              </p>
              <a href="https://wa.me/919428989488" target="_blank" rel="noreferrer" style={{
                background: '#00a8ff',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '800',
                padding: '10px 32px',
                borderRadius: '25px',
                border: '2px solid #ffcd00',
                boxShadow: '0 6px 18px rgba(0, 168, 255, 0.3)',
                display: 'inline-block',
                textDecoration: 'none'
              }}>
                View All
              </a>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '1240px', margin: '0 auto 50px', textAlign: 'center' }}>
            <SectionHeading marginBottom="0" accentWidth="65%" accentMaxWidth="400px">
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
              <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingRight: '24px' }}>
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '280px',
                      height: '340px',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                      background: `url(${proj.imageUrl || proj.img || projHulaboo}) center/cover no-repeat`,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '20px 22px'
                    }}>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', marginBottom: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                          {proj.name || proj.title}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', textTransform: 'capitalize' }}>
                          {proj.city || proj.location}
                        </p>
                      </div>

                      <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowRight style={{ width: '18px', height: '18px', color: '#ffffff' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
