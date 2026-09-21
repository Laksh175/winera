import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WineraImage from './WineraImage';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function ArcadeSwipeCardDeck({ cards = [], getCardSlug, isClickable = true, showCta = true }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyOutDirection, setFlyOutDirection] = useState(null); // 'left' | 'right' | null
  const [dragStartTime, setDragStartTime] = useState(0);

  const startPosRef = useRef({ x: 0, y: 0 });
  const deckRef = useRef(null);

  // Reset index when cards list changes (e.g. category changed)
  useEffect(() => {
    setCurrentIndex(0);
    setDragOffset({ x: 0, y: 0 });
    setFlyOutDirection(null);
  }, [cards]);

  const handleNext = useCallback(() => {
    if (cards.length <= 1) return;
    setFlyOutDirection('right');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setFlyOutDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 280);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    if (cards.length <= 1) return;
    setFlyOutDirection('left');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setFlyOutDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 280);
  }, [cards.length]);

  // Touch Handlers
  const handleTouchStart = (e) => {
    if (flyOutDirection) return;
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setDragStartTime(Date.now());
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || flyOutDirection) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;

    // If mainly horizontal swipe, prevent vertical page scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      if (e.cancelable) e.preventDefault();
    }

    setDragOffset({ x: deltaX, y: deltaY * 0.2 });
  };

  const handleTouchEnd = () => {
    if (!isDragging || flyOutDirection) return;
    setIsDragging(false);

    const distance = dragOffset.x;
    const duration = Date.now() - dragStartTime;
    const velocity = Math.abs(distance) / Math.max(1, duration);

    if (Math.abs(distance) > 70 || velocity > 0.45) {
      const dir = distance > 0 ? 'right' : 'left';
      setFlyOutDirection(dir);
      setTimeout(() => {
        if (dir === 'right') {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        } else {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        }
        setFlyOutDirection(null);
        setDragOffset({ x: 0, y: 0 });
      }, 280);
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Mouse Handlers (for testing in browser devtools)
  const handleMouseDown = (e) => {
    if (flyOutDirection) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setDragStartTime(Date.now());
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || flyOutDirection) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY * 0.2 });
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];
  const cardSlug = getCardSlug ? getCardSlug(currentCard) : (currentCard.slug || 'parkour-motor-2-dx');

  // Compute 3 stacked cards to render
  const visibleStack = [];
  const maxStack = Math.min(3, cards.length);
  for (let i = 0; i < maxStack; i++) {
    const cardIdx = (currentIndex + i) % cards.length;
    visibleStack.push({ card: cards[cardIdx], stackLevel: i });
  }

  // Reverse so the front card (stackLevel 0) renders last on top
  const renderStack = [...visibleStack].reverse();

  return (
    <div className="winera-mobile-swipe-deck" style={{
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4px 0 10px',
      userSelect: 'none',
      touchAction: 'pan-y'
    }}>
      {/* 3D Stacked Cards Deck Container */}
      <div
        ref={deckRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '330px',
          height: showCta ? '370px' : '345px',
          perspective: '1000px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { if (isDragging) handleTouchEnd(); }}
      >
        {renderStack.map(({ card, stackLevel }) => {
          const isTop = stackLevel === 0;
          const isSecond = stackLevel === 1;
          const isThird = stackLevel === 2;

          let transform = '';
          let opacity = 1;
          let zIndex = 10 - stackLevel;
          let transition = isDragging && isTop ? 'none' : 'all 0.32s cubic-bezier(0.25, 1, 0.5, 1)';

          if (isTop) {
            if (flyOutDirection) {
              const flyX = flyOutDirection === 'right' ? 380 : -380;
              const rotate = flyOutDirection === 'right' ? 26 : -26;
              transform = `translate3d(${flyX}px, 0, 0) rotate(${rotate}deg)`;
              opacity = 0;
              transition = 'all 0.28s cubic-bezier(0.4, 0, 1, 1)';
            } else {
              const rot = dragOffset.x * 0.08;
              transform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rot}deg)`;
            }
          } else if (isSecond) {
            transform = 'translateY(14px) scale(0.93)';
            opacity = 0.88;
          } else if (isThird) {
            transform = 'translateY(26px) scale(0.86)';
            opacity = 0.55;
          }

          const currentSlug = getCardSlug ? getCardSlug(card) : (card.slug || 'parkour-motor-2-dx');

          return (
            <div
              key={card.name || card.title || stackLevel}
              onClick={(e) => {
                if (isClickable && isTop && Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
                  navigate(`/product/${currentSlug}`);
                }
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: showCta ? '352px' : '325px',
                background: 'linear-gradient(180deg, #bae6fd 0%, #ffffff 80%, #ffffff 100%)',
                borderRadius: '26px',
                padding: '14px',
                boxShadow: isTop
                  ? '0 16px 35px rgba(56, 189, 248, 0.22), 0 4px 12px rgba(0,0,0,0.06)'
                  : '0 8px 20px rgba(0,0,0,0.04)',
                border: '1.5px solid #bae6fd',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transform,
                opacity,
                zIndex,
                transition,
                cursor: isTop ? (isClickable ? 'pointer' : 'grab') : 'default',
                transformOrigin: '50% 100%',
                willChange: 'transform, opacity'
              }}
            >
              {/* Image Container with Glossy Inner Border */}
              <div style={{
                width: '100%',
                height: '222px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                border: '3.5px solid #ffffff',
                position: 'relative'
              }}>
                <WineraImage
                  src={card.imageUrl || card.img}
                  alt={card.name || card.title}
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Category Badge on Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '0.3px'
                }}>
                  {card.category || 'Arcade Game'}
                </div>
              </div>

              {/* Product Title */}
              <h4 style={{
                fontSize: '1.02rem',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: 1.25,
                margin: showCta ? '10px 0 6px' : '14px 0 4px',
                minHeight: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 6px'
              }}>
                {card.name || card.title}
              </h4>

              {/* Bottom Quick Action CTA Pill */}
              {showCta && (
                <div style={{
                  marginTop: 'auto',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '14px',
                  background: isTop ? '#0284c7' : '#e0f2fe',
                  color: isTop ? '#ffffff' : '#0369a1',
                  fontSize: '12px',
                  fontWeight: '800',
                  transition: 'all 0.2s ease'
                }}>
                  <span>View Details & Specs</span>
                  <ArrowRight style={{ width: '13px', height: '13px' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modern Interactive Bottom Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        marginTop: '16px',
        width: '100%',
        maxWidth: '310px'
      }}>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={cards.length <= 1}
          aria-label="Previous Game"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1.5px solid #bae6fd',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(56, 189, 248, 0.18)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <ChevronLeft style={{ width: '22px', height: '22px', strokeWidth: 2.5 }} />
        </button>

        {/* Counter & Progress Dots */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{
            background: '#e0f2fe',
            color: '#0369a1',
            padding: '4px 14px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '900',
            border: '1px solid #bae6fd'
          }}>
            {currentIndex + 1} / {cards.length}
          </div>

          {/* Dots Indicator */}
          {cards.length <= 10 && (
            <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
              {cards.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  style={{
                    width: dotIdx === currentIndex ? '16px' : '5px',
                    height: '5px',
                    borderRadius: '5px',
                    background: dotIdx === currentIndex ? '#0284c7' : '#cbd5e1',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={cards.length <= 1}
          aria-label="Next Game"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#38bdf8',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          <ChevronRight style={{ width: '22px', height: '22px', strokeWidth: 2.5 }} />
        </button>
      </div>
    </div>
  );
}
