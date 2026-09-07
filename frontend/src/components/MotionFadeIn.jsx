import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function MotionFadeIn({
  children,
  delay = 0,
  yOffset = 40,
  duration = 0.8,
  className = "",
  style = {},
  once = true,
  amount = 0.1,
  ...props
}) {
  const location = useLocation();

  return (
    <motion.div
      key={`${location.pathname}-${delay}`}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={{
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}


