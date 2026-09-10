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
    quote: "When we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back.",
    name: "Rebounce Game Zone",
    role: "Surat",
    img: testiOwner,
    videoImg: testiOwner,
    rating: 5
  },
  {
    quote: "Choosing the right gaming zone setup company in India was critical for us given our tight deadline. Winera International Pvt. Ltd. delivered everything as planned and on schedule. Fun Houze opening day went smoothly and the game zone setup was exactly as we discussed.",
    name: "Fun Houze",
    role: "Surat",
    img: projHulaboo,
    videoImg: projHulaboo,
    rating: 5
  },
  {
    quote: "To be honest before starting Hulaboo we had visited multiple game zone setup companies and was confused about who to trust. When we finally met Winera International Pvt. Ltd. the clarity they gave us from day one was different. They explained the entire process, showed us real projects and gave us a transparent quote. That confidence is what made us sign. And they delivered exactly what they promised.",
    name: "Hulaboo Family Fun Zone",
    role: "Surat",
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
  subtitle = "We are proud to have helped businesses across India build successful game zones. Here's what our clients say about our quality, service, and support.\n\nWhen we were planning Rebounce we had the space and the budget but no idea how to turn it into a game zone. Winera International Pvt. Ltd. made the entire process effortless. One meeting was enough. We shared our requirements and they handled everything from game selection and layout design to complete installation. The result speaks for itself Rebounce today is a thriving game zone and our customers keep coming back.",
  highlightColor = '#00a8ff',
  bg = '#F5F5F9',
  accentWidth = '465px',
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
  const [isExpanded, setIsExpanded] = useState(false);
  const { openVideoModal } = useVideoModal();
  const currentItem = list[activeIndex % list.length] || defaultTestimonials[0];

  const getYouTubeThumbnail = (url, fallbackImg) => {
    if (!url) return fallbackImg;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/sddefault.jpg`;
    }
    return fallbackImg;
  };

  const videoThumbnail = getYouTubeThumbnail(currentItem?.youtubeVideoUrl, currentItem?.founderImage || currentItem?.videoImg || currentItem?.img || testiOwner);

  const goNext = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  };
  const goPrev = () => {
    setIsExpanded(false);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1));
  };

  const hasMultipleTestimonials = list.length > 1;

  return (
    <section id={id} style={{ padding: '90px 4vw 70px', background: bg, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <MotionFadeIn>
          <SectionHeading marginBottom="12px" accentWidth={accentWidth} accentMaxWidth={accentMaxWidth} accentHeight={accentHeight} accentMarginBottom={accentMarginBottom} accentAlign={accentAlign}>
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
            color: '#475569',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: 1.6,
            maxWidth: '750px',
            margin: '0 auto 90px',
            textAlign: 'center',
            whiteSpace: 'pre-line'
          }}>
            {actualSubtitle}
          </p>

          {/* ── DESKTOP LAYOUT (Pop-Out Video Frame matching Image 2) ── */}
          <div className="winera-testi-desktop" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1100px',
            margin: '60px auto 20px'
          }}>
            {/* Left Arrow Button (Only if > 1 testimonial) */}
            {hasMultipleTestimonials && (
              <button
                onClick={goPrev}
                aria-label="Previous Testimonial"
                style={{
                  position: 'absolute',
                  left: '-24px',
                  zIndex: 30,
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e293b',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s'
                }}
              >
                <ChevronLeft style={{ width: '26px', height: '26px', strokeWidth: 2 }} />
              </button>
            )}

            {/* White Rectangle Card Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              background: '#ffffff',
              borderRadius: '32px',
              padding: '36px 470px 36px 48px',
              minHeight: '380px',
              height: isExpanded ? 'auto' : '410px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              transition: 'all 0.3s ease'
            }}>
              {/* Top: Star Rating & Quote */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                    <Star key={i} style={{ width: '18px', height: '18px', fill: '#ffcd00', color: '#ffcd00' }} />
                  ))}
                </div>

                {(() => {
                  const quoteText = currentItem.quote || '';
                  const isLong = quoteText.length > 280;

                  return (
                    <div style={{ position: 'relative', maxWidth: '520px', margin: '0 0 8px' }}>
                      <p className="winera-testi-quote" style={{
                        color: '#334155',
                        fontSize: '14.5px',
                        fontStyle: 'italic',
                        fontWeight: '500',
                        lineHeight: 1.5,
                        margin: 0,
                        ...(isLong && !isExpanded ? {
                          display: '-webkit-box',
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        } : {})
                      }}>
                        {quoteText}
                      </p>
                      {isLong && !isExpanded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                          }}
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 32%, #ffffff 100%)',
                            border: 'none',
                            color: '#00a8ff',
                            fontStyle: 'italic',
                            fontWeight: '700',
                            fontSize: '16.5px',
                            cursor: 'pointer',
                            paddingLeft: '28px',
                            paddingRight: '0px',
                            lineHeight: 1.5,
                            textDecoration: 'underline'
                          }}
                        >
                          ... read more..
                        </button>
                      )}
                      {isLong && isExpanded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                          }}
                          style={{
                            color: '#00a8ff',
                            background: 'none',
                            border: 'none',
                            fontStyle: 'italic',
                            fontWeight: '700',
                            fontSize: '16.5px',
                            cursor: 'pointer',
                            padding: 0,
                            margin: '4px 0 0 4px',
                            textDecoration: 'underline'
                          }}
                        >
                          read less..
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Bottom: Founder / Client Profile Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#00a8ff', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
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
                  <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', margin: '2px 0 0' }}>
                    {currentItem.reviewerRole || currentItem.role || 'Surat'}
                  </p>
                </div>
              </div>

              {/* Right Side: Floating / Pop-Out Video Frame (Linear Gradient Fade matching Image 2) */}
              <div style={{
                position: 'absolute',
                right: '55px',
                top: '39%',
                transform: 'translateY(-50%)',
                width: '450px',
                height: '450px',
                background: 'linear-gradient(191.09deg, #F5F5F9 8.2%, #E0F4FC 116.74%)',
                borderRadius: '48px',
                padding: '16px',
                zIndex: 10
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '36px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#0f172a'
                }}>
                  <img
                    src={videoThumbnail}
                    alt={currentItem.name || "Client Review"}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      position: 'absolute',
                      inset: 0,
                      transform: (videoThumbnail.includes('youtube') || videoThumbnail.includes('sddefault') || videoThumbnail.includes('hqdefault')) ? 'scale(1.35)' : 'scale(1.02)'
                    }}
                    onError={(e) => {
                      if (e.target.src.includes('sddefault')) {
                        e.target.src = e.target.src.replace('sddefault.jpg', 'hqdefault.jpg');
                      }
                    }}
                  />
                  {Boolean(currentItem.youtubeVideoUrl && String(currentItem.youtubeVideoUrl).trim()) && (
                    <button
                      onClick={() => openVideoModal(currentItem.youtubeVideoUrl, `${currentItem.name} - Video Review`)}
                      aria-label="Watch Review Video"
                      title="Watch Review Video"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.22)',
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
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#ffcd00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(255, 205, 0, 0.5)',
                        cursor: 'pointer'
                      }}>
                        <Play style={{ width: '24px', height: '24px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Arrow Button (Only if > 1 testimonial) */}
            {hasMultipleTestimonials && (
              <button
                onClick={goNext}
                aria-label="Next Testimonial"
                style={{
                  position: 'absolute',
                  right: '-24px',
                  zIndex: 30,
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e293b',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s'
                }}
              >
                <ChevronRight style={{ width: '26px', height: '26px', strokeWidth: 2 }} />
              </button>
            )}
          </div>

          {/* ── MOBILE LAYOUT ── */}
          <div className="winera-testi-mobile" style={{ display: 'none' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '24px 20px',
              boxShadow: '0 10px 35px rgba(0,0,0,0.07)',
              textAlign: 'left',
              margin: '0 4px'
            }}>
              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '14px' }}>
                {[...Array(currentItem.starRating || currentItem.rating || 5)].map((_, i) => (
                  <Star key={i} style={{ width: '17px', height: '17px', fill: '#ffcd00', color: '#ffcd00' }} />
                ))}
              </div>

              {/* Quote */}
              {(() => {
                const quoteText = currentItem.quote || '';
                const isLong = quoteText.length > 280;

                return (
                  <div style={{ position: 'relative', margin: '0 0 20px' }}>
                    <p className="winera-testi-quote" style={{
                      color: '#334155',
                      fontSize: '13.5px',
                      fontStyle: 'italic',
                      fontWeight: '500',
                      lineHeight: 1.6,
                      margin: 0,
                      ...(isLong && !isExpanded ? {
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      } : {})
                    }}>
                      {quoteText}
                    </p>
                    {isLong && !isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(true);
                        }}
                        style={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 32%, #ffffff 100%)',
                          border: 'none',
                          color: '#00a8ff',
                          fontStyle: 'italic',
                          fontWeight: '700',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          paddingLeft: '28px',
                          paddingRight: '0px',
                          lineHeight: 1.6,
                          textDecoration: 'underline'
                        }}
                      >
                        ... read more..
                      </button>
                    )}
                    {isLong && isExpanded && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(false);
                        }}
                        style={{
                          color: '#00a8ff',
                          background: 'none',
                          border: 'none',
                          fontStyle: 'italic',
                          fontWeight: '700',
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          padding: 0,
                          margin: '4px 0 0 4px',
                          textDecoration: 'underline'
                        }}
                      >
                        read less..
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img
                  src={currentItem.founderImage || currentItem.img || testiOwner}
                  alt={currentItem.gameZoneName || currentItem.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#00a8ff', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                  <p style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600', margin: '2px 0 0' }}>
                    {currentItem.reviewerRole || currentItem.role || 'Surat'}
                  </p>
                </div>
              </div>

              {/* Video Thumbnail */}
              <div style={{
                width: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: '#000',
                aspectRatio: '16/10'
              }}>
                <img
                  src={videoThumbnail}
                  alt={currentItem.name || "Client Review"}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                    transform: (videoThumbnail.includes('youtube') || videoThumbnail.includes('sddefault') || videoThumbnail.includes('hqdefault')) ? 'scale(1.35)' : 'scale(1.02)'
                  }}
                  onError={(e) => {
                    if (e.target.src.includes('sddefault')) {
                      e.target.src = e.target.src.replace('sddefault.jpg', 'hqdefault.jpg');
                    }
                  }}
                />
                {Boolean(currentItem.youtubeVideoUrl && String(currentItem.youtubeVideoUrl).trim()) && (
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
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: '#ffcd00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 20px rgba(255,205,0,0.5)'
                    }}>
                      <Play style={{ width: '22px', height: '22px', color: '#000000', fill: '#000000', marginLeft: '3px' }} />
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation Controls (Only if > 1) */}
            {hasMultipleTestimonials && (
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
                  {activeIndex + 1} / {list.length}
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
            )}
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}
