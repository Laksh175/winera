import React from 'react';
import SectionHeading from './SectionHeading';
import clientsBg from '../assets/clients-bg.webp';

export default function ClientsMarqueeSection({
  id = 'clients',
  clientLogos = null,
  title = '*Our Clients* Section',
  subtitle = 'Our Complete Game Zone Equipment & Setup Solutions',
  bg = clientsBg
}) {
  return (
    <section id={id} className="winera-clients-section" style={{
      position: 'relative',
      width: '100%',
      padding: '95px 0 65px',
      background: `url(${bg}) center/100% 100% no-repeat`,
      minHeight: '360px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
        <SectionHeading marginBottom="8px" accentWidth="280px" accentMaxWidth="340px">
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

        <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginBottom: '45px' }}>
          {subtitle}
        </p>

        <div style={{
          width: '100%',
          maxWidth: '100vw',
          margin: '0 auto',
          padding: '20px 0',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div className="marquee-track">
            {[...Array(4)].map((_, setIdx) => (
              <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '60px', paddingRight: '60px' }}>
                {(clientLogos && clientLogos.length > 0) ? (
                  clientLogos.map((client, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80px',
                        userSelect: 'none'
                      }}
                    >
                      {client.logoUrl ? (
                        <img src={client.logoUrl} alt={client.name} loading="lazy" decoding="async" style={{ maxHeight: '75px', maxWidth: '240px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '2.1rem', fontWeight: '900', color: '#1e293b', letterSpacing: '1px' }}>{client.name}</span>
                      )}
                    </div>
                  ))
                ) : (
                  [
                    { name: "Infinity", text: "∞", font: "bold" },
                    { name: "LOGO", text: "LOGO˚", font: "900" },
                    { name: "Logoipsum", text: "🌊 Logoipsum", font: "600" },
                    { name: "IPSUM", text: "IPSUM™", font: "800" },
                    { name: "Infinity2", text: "∞", font: "bold" },
                    { name: "LOGO2", text: "LOGO˚", font: "900" },
                    { name: "IPSUM2", text: "IPSUM™", font: "800" },
                    { name: "Logoipsum2", text: "🌊 Logoipsum", font: "600" }
                  ].map((client, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: '2.1rem',
                        fontWeight: client.font,
                        color: '#1e293b',
                        letterSpacing: '1px',
                        opacity: 0.85,
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        userSelect: 'none'
                      }}
                    >
                      {client.text}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
