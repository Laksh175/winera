import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { useVideoModal } from '../context/VideoModalContext';
import SectionHeading from './SectionHeading';
import MotionFadeIn from './MotionFadeIn';
import testiOwner from '../assets/testi-owner.webp';
import projHulaboo from '../assets/proj-hulaboo.webp';
import projNeon1 from '../assets/proj-neonpanda1.webp';

const defaultTestimonials = [
  {
    quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself. Rebounce today is a thriving game zone and our customers keep coming back.",
    name: "Rebounce Game Zone",
    role: "Founder & Business Owner, Larana Inc.",
    img: testiOwner,
    videoImg: testiOwner,
    rating: 5
  },
  {
    quote: "Winera International exceeded our expectations! They guided us on ROI planning, equipment selection, and setup for our Hulaboo Game Zone in Surat. Their ongoing technical support and maintenance team is top-notch. Highly recommended for anyone setting up a family entertainment center.",
    name: "Hulaboo Family Fun Zone",
    role: "Director & General Manager, Surat",
    img: projHulaboo,
    videoImg: projHulaboo,
    rating: 5
  },
  {
    quote: "Partnering with Winera was the best decision for Nenopanda Indore! Their 3D interior design and high-grade arcade attractions transformed our venue into the city's top gaming hotspot. Professional installation and zero downtime experience.",
    name: "Nenopanda Trampoline & Arcade",
    role: "Owner & Co-Founder, Indore",
    img: projNeon1,
    videoImg: projNeon1,
    rating: 5
  }
];

export default function TestimonialsSection({
  id = 'testimonials',
  siteData = null,
  testimonials = defaultTestimonials,
  title = '*What Our* Clients Say',
  subtitle = null,
  highlightColor = '#00a8ff',
  bg = '#F5F5F9',
  accentWidth = '510px',
  accentMaxWidth = '100%',
  accentHeight = '11px',
  accentMarginBottom = '8px',
  accentAlign = 'center'
}) {
  const actualTestimonials = (Array.isArray(siteData?.testimonials) && siteData.testimonials.length > 0)
    ? siteData.testimonials
    : testimonials;
  const list = Array.isArray(actualTestimonials) && actualTestimonials.length > 0 ? actualTestimonials : defaultTestimonials;
  const actualTitle = siteData?.testimonialsHeader?.title || title;
  const actualSubtitle = siteData?.testimonialsHeader?.subtitle || subtitle;
  const [activeIndex, setActiveIndex] = useState(0);
  const { openVideoModal } = useVideoModal();
  const currentItem = list[activeIndex % list.length] || defaultTestimonials[0];

  // Extract YouTube video ID to fetch official HQ thumbnail
  const getYouTubeThumbnail = (url, fallbackImg) => {
    if (!url) return fallbackImg;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return fallbackImg;
  };

  const videoThumbnail = getYouTubeThumbnail(currentItem?.youtubeVideoUrl, currentItem?.founderImage || currentItem?.videoImg || testiOwner);

  const goNext = () => setActiveIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  const goPrev = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));

  return (
    <section id={id} style={{ padding: '40px 4vw 20px', background: bg, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <MotionFadeIn>
        <SectionHeading marginBottom="10px" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
          {(() => {
            const rawTitle = actualTitle || "*What Our* Clients Say";
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

        <p style={{
          color: '#64748b',
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: 1.5,
          maxWidth: '780px',
          margin: '0 auto 24px',
          transition: 'opacity 0.3s'
        }}>
          {actualSubtitle || currentItem.quote}
        </p>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="winera-testi-desktop" style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Left Arrow Button */}
          <button
            onClick={goPrev}
            aria-label="Previous Testimonial"
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 30,
              background: 'transparent',
              border: 'none',
              color: '#a0aec0',
              cursor: 'pointer',
              padding: '10px',
              transition: 'color 0.2s'
            }}
          >
            <ChevronLeft style={{ width: '36px', height: '36px', strokeWidth: 1.5 }} />
          </button>

          {/* Main Card Slider Container */}
          <div style={{
            position: 'relative',
            width: '940px',
            height: '280px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {/* Background Faded Peek Card on Right */}
            <div style={{
              position: 'absolute',
              right: 0,
              width: '360px',
              height: '210px',
              background: '#ffffff',
              borderRadius: '28px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              opacity: 0.85,
              border: '1px solid #f1f5f9'
            }}></div>

            {/* Front White Main Content Card */}
            <div style={{
              position: 'absolute',
              left: '40px',
              width: '640px',
              height: '220px',
              background: '#ffffff',
              borderRadius: '28px',
              padding: '32px 40px',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
              zIndex: 10
            }}>
              {/* Quote Mark */}
              <div style={{
                color: '#bae6fd',
                fontSize: '2.5rem',
                lineHeight: 0.6,
                fontWeight: '900',
                marginBottom: '16px',
                fontFamily: 'serif'
              }}>
                ""
              </div>

              {/* Founder Profile & Name Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img
                  src={currentItem.founderImage || currentItem.img || testiOwner}
                  alt={currentItem.gameZoneName || currentItem.name}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#00a8ff', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <span>{currentItem.gameZoneName || currentItem.name}</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: '#000000',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: '900'
                    }}>✓</span>
                  </h4>
                  <p style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: '600', margin: '2px 0 0' }}>
                    {currentItem.reviewerRole || currentItem.role}
                  </p>
                </div>
              </div>

              {/* Star Rating Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                  <Star key={i} style={{ width: '18px', height: '18px', fill: '#ffcd00', color: '#ffcd00' }} />
                ))}
              </div>
            </div>

            {/* Overlapping Video Frame Pill Container matching the screenshot */}
            <div style={{
              position: 'absolute',
              right: '100px',
              width: '370px',
              height: '240px',
              padding: '12px',
              borderRadius: '36px',
              background: '#e0f2fe',
              zIndex: 20,
              boxShadow: '0 15px 40px rgba(0, 168, 255, 0.15)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '26px',
                overflow: 'hidden',
                position: 'relative',
                background: `url(${videoThumbnail}) center/cover no-repeat`
              }}>
                <button
                  onClick={() => openVideoModal(currentItem.youtubeVideoUrl, `${currentItem.name} - Video Review`)}
                  aria-label="Watch Review Video"
                  title="Watch Review Video"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#ffcd00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 20px rgba(255, 205, 0, 0.5)',
                    cursor: 'pointer'
                  }}>
                    <Play style={{ width: '22px', height: '22px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={goNext}
            aria-label="Next Testimonial"
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 30,
              background: 'transparent',
              border: 'none',
              color: '#a0aec0',
              cursor: 'pointer',
              padding: '10px',
              transition: 'color 0.2s'
            }}
          >
            <ChevronRight style={{ width: '36px', height: '36px', strokeWidth: 1.5 }} />
          </button>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="winera-testi-mobile" style={{ display: 'none' }}>
          {/* Mobile Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px 20px',
            boxShadow: '0 10px 35px rgba(0,0,0,0.07)',
            textAlign: 'left',
            margin: '0 4px'
          }}>
            {/* 1. Profile pic + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <img
                src={currentItem.founderImage || currentItem.img || testiOwner}
                alt={currentItem.gameZoneName || currentItem.name}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '2px solid #e0f2fe'
                }}
              />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#00a8ff', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {currentItem.gameZoneName || currentItem.name}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '13px',
                    height: '13px',
                    borderRadius: '50%',
                    background: '#000000',
                    color: '#ffffff',
                    fontSize: '8px',
                    fontWeight: '900',
                    flexShrink: 0
                  }}>✓</span>
                </h4>
              </div>
            </div>

            {/* 2. Role / Post */}
            <p style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600', margin: '0 0 12px' }}>
              {currentItem.reviewerRole || currentItem.role}
            </p>

            {/* 3. Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '16px' }}>
              {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                <Star key={i} style={{ width: '17px', height: '17px', fill: '#ffcd00', color: '#ffcd00' }} />
              ))}
            </div>

            {/* 4. Video Thumbnail */}
            <div style={{
              width: '100%',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              background: `url(${videoThumbnail}) center/cover no-repeat`,
              aspectRatio: '16/9'
            }}>
              <button
                onClick={() => openVideoModal(currentItem.youtubeVideoUrl, `${currentItem.name} - Video Review`)}
                title="Watch Review Video"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#ffcd00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(255,205,0,0.5)'
                }}>
                  <Play style={{ width: '20px', height: '20px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}>
            <button
              onClick={goPrev}
              aria-label="Previous Testimonial"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <ChevronLeft aria-hidden="true" style={{ width: '22px', height: '22px', color: '#475569' }} />
            </button>

            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
              {activeIndex + 1} / {testimonials.length}
            </span>

            <button
              onClick={goNext}
              aria-label="Next Testimonial"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#00a8ff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,168,255,0.35)'
              }}
            >
              <ChevronRight aria-hidden="true" style={{ width: '22px', height: '22px', color: '#ffffff' }} />
            </button>
          </div>
        </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
