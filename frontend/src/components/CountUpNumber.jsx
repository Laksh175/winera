import React, { useState, useEffect, useRef } from 'react';

export default function CountUpNumber({ value, targetText, duration = 1800, className = "", style = {} }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const nodeRef = useRef(null);

  const rawString = String(value || targetText || '0');
  const numericMatch = rawString.match(/(\d+)/);
  const target = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const prefix = numericMatch ? rawString.substring(0, numericMatch.index) : '';
  const suffix = numericMatch ? rawString.substring(numericMatch.index + numericMatch[0].length) : rawString;

  useEffect(() => {
    setCount(0);
    setHasAnimated(false);
  }, [value, targetText]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * target);
            setCount(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  if (target === 0) {
    return <span className={className} style={style}>{rawString}</span>;
  }

  return (
    <span ref={nodeRef} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  );
}
