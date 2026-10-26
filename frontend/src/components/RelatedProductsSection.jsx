
import React, { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const ctaArcade = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345647/winera_uploads/wrwlxquyxiiygubzvzlx.jpg";
const projNeon1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/s8v6jwxs7eyoq877yeso.jpg";
const projSoft1 = "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791345675/winera_uploads/olzpipldgl4mnb7c1y5q.jpg";

import WineraImage from './WineraImage';

const resolveImgUrl = (url, fallback) => {
  if (!url || typeof url !== 'string') return fallback || '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    const apiUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '') : '';
    if (apiUrl) return `${apiUrl}${cleanUrl}`;
    return cleanUrl;
  }
  return url || fallback || '';
};

export default function RelatedProductsSection({
  sectionData,
  accentColor = '#00a8ff',
  accentWidth = '370px',
  accentMaxWidth = '95%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'left-inline',
  accentStyle = {}
}) {
  const defaultCategories = [
    { title: "Arcade Games", link: "/product/arcade-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882222/winera_uploads/psq0lwhhp7kdasz18mhg.jpg" },
    { title: "VR Games", link: "/product/vr-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881945/winera_uploads/ciltspbpf3nwcvcbu16m.jpg" },
    { title: "AR Games", link: "/product/ar-games", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881961/winera_uploads/ucij9ckzxnlpskx6n0hj.png" },
    { title: "Bowling Alley", link: "/product/bowling-alley", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881975/winera_uploads/bj0fjmjyi9ogxwme3hqc.jpg" },
    { title: "Trampoline Park", link: "/product/trampoline-park", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791881999/winera_uploads/yx5bfvbaexcazrkt331g.jpg" },
    { title: "Soft Play", link: "/product/soft-play", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882021/winera_uploads/sxlzfslbp7mmm3avg0vq.jpg" },
    { title: "Bumper Cars", link: "/product/bumper-car", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882033/winera_uploads/goun29t9b7kopvwkfze9.jpg" },
    { title: "Hypergrid", link: "/product/hypergrid", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882049/winera_uploads/jxgltybqdkbolwzlzcar.jpg" },
    { title: "Laser Tag", link: "/product/laser-tag", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882062/winera_uploads/y7nkbq60c8siqqatkr36.jpg" },
    { title: "Amusement Park", link: "/product/amusement-park", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791882084/winera_uploads/tgofoefcimwe14lmqrso.jpg" },
    { title: "Lights", link: "/product/lights", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892550/winera_uploads/xzgzyyd26y9sukeicpd1.jpg", isActive: false, status: 'inactive' },
    { title: "Sculpture", link: "/product/sculpture", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791893113/winera_uploads/llle0ckzymanfgvegqmw.jpg", isActive: false, status: 'inactive' },
    { title: "Reception Table", link: "/product/reception-table", img: "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892969/winera_uploads/uswx6jond0sb102zq1k9.jpg", isActive: false, status: 'inactive' }
  ];

  const getFallbackImg = (item, idx) => {
    if (!item) return defaultCategories[0]?.img || '';
    const cleanTitle = (item.title || '').trim().toLowerCase();
    const matched = defaultCategories.find(c => c.title.toLowerCase() === cleanTitle);
    if (matched && matched.img) return matched.img;
    return defaultCategories[idx % defaultCategories.length]?.img || '';
  };

  const rawItems = (Array.isArray(sectionData?.items) && sectionData.items.length > 0)
    ? sectionData.items
    : defaultCategories;

  // Filter only active items (hide inactive items like Lights, Sculpture, Reception Table)
  const activeRawItems = rawItems.filter(item => {
    if (!item) return false;
    // Explicitly inactive
    if (item.isActive === false || item.status === 'inactive') return false;

    // By default, keep lights, sculpture, reception table inactive until admin explicitly sets them active
    const cleanTitle = (item.title || '').trim().toLowerCase();
    const isSpecialInactiveDefault = cleanTitle === 'lights' || cleanTitle === 'sculpture' || cleanTitle === 'reception table';
    if (isSpecialInactiveDefault && item.isActive !== true && item.status !== 'active') {
      return false;
    }

    return true;
  });

  // Legacy URL overrides so old Unsplash / deprecated URLs immediately update everywhere
  const getUpgradedImg = (title, currentImg, fallback) => {
    const clean = (title || '').trim().toLowerCase();
    const resolved = resolveImgUrl(currentImg, fallback);
    if (clean === 'lights' && (!resolved || resolved.includes('images.unsplash.com') || resolved.includes('1508739773434'))) {
      return "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892550/winera_uploads/xzgzyyd26y9sukeicpd1.jpg";
    }
    if (clean === 'sculpture' && (!resolved || resolved.includes('r9m4zijctdjvzmbueeze'))) {
      return "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791893113/winera_uploads/llle0ckzymanfgvegqmw.jpg";
    }
    if (clean === 'reception table' && (!resolved || resolved.includes('images.unsplash.com') || resolved.includes('1497366216548'))) {
      return "https://res.cloudinary.com/achfsmlm/image/upload/f_auto,q_auto/v1791892969/winera_uploads/uswx6jond0sb102zq1k9.jpg";
    }
    return (resolved && resolved.trim() !== '') ? resolved : fallback;
  };

  const baseCategories = activeRawItems.map((item, idx) => {
    const fallback = getFallbackImg(item, idx);
    const finalImg = getUpgradedImg(item.title, item.img || item.image || item.imgUrl, fallback);
    return {
      title: item.title,
      link: item.link
        ? item.link.replace(/^\/products\//, '/product/')
        : `/product/${(item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      img: finalImg,
      isActive: item.isActive !== false && item.status !== 'inactive',
      status: item.status || 'active'
    };
  });

  const N = baseCategories.length;
  // Repeat baseCategories enough times so track is always full
  const repeatCount = N === 0 ? 0 : (N < 4 ? Math.ceil(12 / (N || 1)) : 3);
  const relatedCategories = Array(repeatCount).fill(baseCategories).flat();

  const [relatedIndex, setRelatedIndex] = useState(N > 0 ? N : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Sync index when items count changes dynamically from API
  useEffect(() => {
    if (N > 0) {
      setRelatedIndex(N);
      setIsTransitioning(false);
    }
  }, [N]);

  // Seamless loop reset when sliding past 2*N or before N
  useEffect(() => {
    if (!isTransitioning || N === 0) return;

    if (relatedIndex >= 2 * N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setRelatedIndex(prev => prev - N);
      }, 450);
      return () => clearTimeout(timer);
    } else if (relatedIndex < N) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setRelatedIndex(prev => prev + N);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [relatedIndex, isTransitioning, N]);

  // Re-enable transition after instant snap
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Infinite Auto-Slide Interval
  useEffect(() => {
    if (isPaused || N === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setRelatedIndex(prev => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, N]);

  if (N === 0) return null;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="winera-related-section"
      style={{ padding: '25px 4vw 25px', background: '#F5F5F9', textAlign: 'center' }}
    >
      <MotionFadeIn>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <SectionHeading marginBottom="40px" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign} accentStyle={accentStyle}>
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
                setIsTransitioning(true);
                setRelatedIndex((prev) => prev - 1);
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
                        background: '#0f172a',
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
                      <img
                        src={item.img}
                        alt={item.title}
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
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 45%)',
                        padding: '20px 22px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                      }}>
                        <h3
                        className="winera-related-card-title"
                        style={{
                          fontSize: '20px',
                          fontWeight: '800',
                          color: 'rgb(255, 255, 255)',
                          textAlign: 'left',
                          margin: '0px',
                          lineHeight: 1.25,
                          textShadow: 'white 0px 4px 15px'
                        }}
                      >
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
                setIsTransitioning(true);
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
      </MotionFadeIn>
    </section>
  );
}
