import { motion } from 'framer-motion';

export default function MotionCardFlip({ children, className = "", style = {}, ...props }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
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
