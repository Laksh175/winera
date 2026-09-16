import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Winera International";
    window.scrollTo(0, 0);
  }, []);

  // Staggered Floating Animation Variants for 4-0-4 digits
  const digitVariant1 = {
    animate: {
      y: [0, -14, 0],
      rotate: [0, -2, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const digitVariantCenter = {
    animate: {
      y: [0, -20, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.3
      }
    }
  };

  const digitVariant2 = {
    animate: {
      y: [0, -14, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 3.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.6
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#0b1120',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animated Neon Glow Orbs matching Winera Gaming Theme */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(15, 23, 42, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '20%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />

      {/* Main 404 Interactive Animated Container */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '28px',
        zIndex: 2,
        userSelect: 'none'
      }}>
        {/* First '4' Digit */}
        <motion.div
          variants={digitVariant1}
          animate="animate"
          whileHover={{ scale: 1.15, rotate: -5 }}
          style={{
            fontSize: 'clamp(90px, 16vw, 170px)',
            fontWeight: '900',
            fontFamily: "'Black Han Sans', 'Open Sans', sans-serif",
            lineHeight: 1,
            color: '#ffffff',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
            cursor: 'pointer'
          }}
        >
          4
        </motion.div>

        {/* Center '0' Gaming Arcade Controller Ring */}
        <motion.div
          variants={digitVariantCenter}
          animate="animate"
          whileHover={{ scale: 1.18, rotate: 10 }}
          style={{
            position: 'relative',
            width: 'clamp(85px, 14vw, 150px)',
            height: 'clamp(85px, 14vw, 150px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 45px rgba(56, 189, 248, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.4)',
            cursor: 'pointer'
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '2px dashed rgba(56, 189, 248, 0.6)',
              pointerEvents: 'none'
            }}
          />
          <Gamepad2
            size={64}
            style={{
              color: '#ffffff',
              width: '60%',
              height: '60%',
              filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))'
            }}
          />
        </motion.div>

        {/* Second '4' Digit */}
        <motion.div
          variants={digitVariant2}
          animate="animate"
          whileHover={{ scale: 1.15, rotate: 5 }}
          style={{
            fontSize: 'clamp(90px, 16vw, 170px)',
            fontWeight: '900',
            fontFamily: "'Black Han Sans', 'Open Sans', sans-serif",
            lineHeight: 1,
            color: '#ffffff',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
            cursor: 'pointer'
          }}
        >
          4
        </motion.div>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '14px',
          lineHeight: '1.2',
          zIndex: 2
        }}
      >
        Oops! Game Level Not Found
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          fontSize: '16px',
          color: '#94a3b8',
          maxWidth: '500px',
          lineHeight: '1.6',
          marginBottom: '36px',
          zIndex: 2
        }}
      >
        The page or attraction you are searching for might have been relocated, renamed, or is temporarily out of service.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', zIndex: 2 }}
      >
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(56, 189, 248, 0.5)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)',
            color: '#ffffff',
            padding: '14px 34px',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '15px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 25px rgba(56, 189, 248, 0.35)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft size={18} />
          Back to Home Page
        </motion.a>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#0f172a' }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            border: '1.5 solid rgba(255, 255, 255, 0.2)',
            padding: '13px 32px',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '15px',
            textDecoration: 'none',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease'
          }}
        >
          Contact Support
        </motion.a>
      </motion.div>
    </div>
  );
}
