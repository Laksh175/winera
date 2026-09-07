import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';

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
    <section id={id} className="winera-faq-section" style={{ padding: '25px 4vw 40px', background: bg, textAlign: 'center' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <MotionFadeIn>
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
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    border: isOpen ? `1.5px solid ${highlightColor}` : '1.5px solid #e2e8f0',
                    boxShadow: isOpen ? '0 10px 30px rgba(0, 168, 255, 0.1)' : '0 4px 16px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.4, margin: 0, letterSpacing: '-0.2px' }}>
                      {item.q || item.question}
                    </h3>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? highlightColor : '#f1f5f9',
                      color: isOpen ? '#ffffff' : '#475569',
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
                      color: '#334155',
                      fontSize: '13.5px',
                      lineHeight: 1.65,
                      fontWeight: '500',
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop: '1px solid #f1f5f9'
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
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    border: isOpen ? `1.5px solid ${highlightColor}` : '1.5px solid #e2e8f0',
                    boxShadow: isOpen ? '0 10px 30px rgba(0, 168, 255, 0.1)' : '0 4px 16px rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.4, margin: 0, letterSpacing: '-0.2px' }}>
                      {item.q || item.question}
                    </h3>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? highlightColor : '#f1f5f9',
                      color: isOpen ? '#ffffff' : '#475569',
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
                      color: '#334155',
                      fontSize: '13.5px',
                      lineHeight: 1.65,
                      fontWeight: '500',
                      marginTop: '14px',
                      paddingTop: '12px',
                      borderTop: '1px solid #f1f5f9'
                    }}>
                      {item.a || item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
