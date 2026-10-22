import React from 'react';

export default function MotionCardFlip({ children, className = "", style = {}, ...props }) {
  return (
    <div
      className={`winera-motion-card-hover ${className}`}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
        cursor: 'pointer',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
