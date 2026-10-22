import React, { useEffect, useRef, useState } from 'react';

export default function MotionFadeIn({
  children,
  delay = 0,
  yOffset = 30,
  duration = 0.6,
  className = "",
  style = {},
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !domRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '60px', threshold: 0.05 });

    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : `translate3d(0, ${yOffset}px, 0)`,
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
