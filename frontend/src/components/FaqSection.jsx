import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function FaqSection({
  faqList = [],
  faqsList = [],
  id = 'faqs',
  title = 'Frequently Asked *Questions*',
  subtitle = null,
  highlightColor = '#00a8ff',
  bg = '#F5F5F9'
}) {
  const [activeFaqIndex, setActiveFaqIndex] = useState(-1);

  const items = Array.isArray(faqsList) && faqsList.length > 0 ? faqsList : (Array.isArray(faqList) ? faqList : []);
  const col1 = items.slice(0, Math.ceil(items.length / 2));
  const col2 = items.slice(Math.ceil(items.length / 2));

  return (
    <section id={id} className="winera-faq-section" style={{ padding: '80px 4vw 100px', background: bg, textAlign: 'center' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <SectionHeading marginBottom="8px">
          {(() => {
            const rawTitle = title || "Frequently Asked *Questions*";
            const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
            return parts.map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <span key={index} style={{ color: highlightColor }}>
                    {part}
                  </span>
                );
              }
              return part;
            });
          })()}
        </SectionHeading>

        {subtitle && (
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginBottom: '35px' }}>
            {subtitle}
          </p>
        )}

        <div className="winera-faq-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px 24px',
          textAlign: 'left',
          alignItems: 'start'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {col1.map((item, idx) => {
              const globalIdx = idx;
              const isOpen = activeFaqIndex === globalIdx;

              return (
                <div
                  key={globalIdx}
                  onClick={() => setActiveFaqIndex(isOpen ? -1 : globalIdx)}
                  style={{
                    background: '#F5F5F9',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    border: isOpen ? `1.5px solid ${highlightColor}` : '1.5px solid #e2e8f0',
                    boxShadow: isOpen ? '0 10px 30px rgba(0, 168, 255, 0.08)' : '0 4px 14px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.35, margin: 0 }}>
                      {item.q || item.question}
                    </h3>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? highlightColor : '#e2e8f0',
                      color: isOpen ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s'
                    }}>
                      <ChevronDown style={{
                        width: '16px',
                        height: '16px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }} />
                    </div>
                  </div>
                  {isOpen && (
                    <p style={{
                      color: '#475569',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      fontWeight: '500',
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop: '1px stroke #cbd5e1'
                    }}>
                      {item.a || item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {col2.map((item, idx) => {
              const globalIdx = idx + col1.length;
              const isOpen = activeFaqIndex === globalIdx;

              return (
                <div
                  key={globalIdx}
                  onClick={() => setActiveFaqIndex(isOpen ? -1 : globalIdx)}
                  style={{
                    background: '#F5F5F9',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    border: isOpen ? `1.5px solid ${highlightColor}` : '1.5px solid #e2e8f0',
                    boxShadow: isOpen ? '0 10px 30px rgba(0, 168, 255, 0.08)' : '0 4px 14px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.35, margin: 0 }}>
                      {item.q || item.question}
                    </h3>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? highlightColor : '#e2e8f0',
                      color: isOpen ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s'
                    }}>
                      <ChevronDown style={{
                        width: '16px',
                        height: '16px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }} />
                    </div>
                  </div>
                  {isOpen && (
                    <p style={{
                      color: '#475569',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      fontWeight: '500',
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop: '1px stroke #cbd5e1'
                    }}>
                      {item.a || item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
