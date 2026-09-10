import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MotionCardFlip({ children, className = "", style = {}, ...props }) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 1024;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)');
    const handleChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  if (!isDesktop) {
    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        WebkitFontSmoothing: 'antialiased',
        cursor: 'pointer',
        ...style
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}


