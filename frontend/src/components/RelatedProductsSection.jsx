import React, { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

import ctaArcade from '../assets/cta-arcade.png';
import projNeon1 from '../assets/proj-neonpanda1.png';
import projSoft1 from '../assets/proj-softplay1.png';

export default function RelatedProductsSection({ sectionData, accentColor = '#38bdf8' }) {
  const defaultCategories = [
    { title: "Arcade Games", link: "/products/arcade-games", img: ctaArcade },
    { title: "VR Games", link: "/products/vr-games", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80" },
    { title: "AR Games", link: "/products/ar-games", img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80" },
    { title: "Bowling Alley", link: "/products/bowling-alley", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80" },
    { title: "Trampoline Park", link: "/products/trampoline-park", img: projNeon1 },
    { title: "Soft Play", link: "/products/soft-play", img: projSoft1 },
    { title: "Bumper Cars", link: "/products/bumper-cars", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
    { title: "Hypergrid", link: "/products/hypergrid", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
    { title: "Laser Tag", link: "/products/laser-tag", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
    { title: "Amusement Park", link: "/products/amusement-park", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" },
    { title: "Lights", link: "/products/lights", img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80" },
    { title: "Sculpture", link: "/products/sculpture", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80" },
    { title: "Reception Table", link: "/products/reception-table", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80" },
    { title: "Other Furniture", link: "/products/other-furniture", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80" }
  ];

  const rawItems = Array.isArray(sectionData?.items) && sectionData.items.length > 0
    ? sectionData.items
    : defaultCategories;

  const baseCategories = rawItems.map((item, idx) => ({
    title: item.title,
    link: item.link || `/products/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    img: item.img || defaultCategories[idx % defaultCategories.length].img
  }));

  const relatedCategories = [...baseCategories, ...baseCategories];

  const [relatedIndex, setRelatedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setRelatedIndex((prev) => {
        const next = prev + 1;
        if (next >= baseCategories.length) {
          setTimeout(() => {
            setIsTransitioning(false);
            setRelatedIndex(0);
            setTimeout(() => setIsTransitioning(true), 50);
          }, 450);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, baseCategories.length]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="winera-related-section"
      style={{ padding: '90px 4vw 110px', background: '#F5F5F9', textAlign: 'center' }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <SectionHeading marginBottom="50px" accentWidth="65%" accentMaxWidth="400px">
          {(() => {
            const rawTitle = sectionData?.title || "*Related* Products";
            const parts = rawTitle.split(/\*{1,2}(.*?)\*{1,2}/g);
            return parts.map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <span key={index} style={{ color: accentColor }}>
                    {part}
                  </span>
                );
              }
              return part;
            });
          })()}
        </SectionHeading>

        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          {/* Previous Button */}
          <button
            aria-label="Previous Related Products"
            onClick={() => {
              if (relatedIndex <= 0) {
                setIsTransitioning(false);
                setRelatedIndex(baseCategories.length * 2 - 1);
                setTimeout(() => {
                  setIsTransitioning(true);
                  setRelatedIndex(baseCategories.length - 1);
                }, 50);
              } else {
                setRelatedIndex((prev) => prev - 1);
              }
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: accentColor,
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            <ChevronLeft style={{ width: '20px', height: '20px' }} />
          </button>

          {/* Sliding Track Container */}
          <div style={{
            width: '100%',
            maxWidth: '1160px',
            overflow: 'hidden',
            borderRadius: '24px'
          }}>
            <div className="winera-related-track" style={{
              display: 'flex',
              gap: '24px',
              transform: `translateX(calc(-${relatedIndex} * (100% / 4 + 6px)))`,
              transition: isTransitioning ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              width: '100%',
              '--related-index': relatedIndex
            }}>
              {relatedCategories.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="winera-related-card"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    flex: '0 0 calc(25% - 18px)',
                    minWidth: '0'
                  }}
                >
                  <div
                    style={{
                      height: '310px',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                      background: `url(${item.img}) center/cover no-repeat`,
                      cursor: 'pointer',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.25s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 20px 45px rgba(56, 189, 248, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.12)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 45%)',
                      padding: '20px 22px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', textAlign: 'left', margin: 0, lineHeight: 1.25 }}>
                        {item.title}
                      </h3>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        flexShrink: 0
                      }}>
                        <ArrowUpRight style={{ width: '18px', height: '18px', strokeWidth: 2.5 }} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            aria-label="Next Related Products"
            onClick={() => {
              setRelatedIndex((prev) => prev + 1);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: accentColor,
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            <ChevronRight style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </div>
    </section>
  );
}
