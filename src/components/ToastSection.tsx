'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WineGlass = () => (
  <svg width="150" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bowl */}
    <path
      d="M 25 20 Q 20 40, 30 60 L 45 90 L 55 90 L 70 60 Q 80 40, 75 20 Q 70 10, 50 10 Q 30 10, 25 20"
      stroke="#C5A55A"
      strokeWidth="2"
      fill="none"
    />
    {/* Stem */}
    <line x1="50" y1="90" x2="50" y2="130" stroke="#C5A55A" strokeWidth="2" />
    {/* Base */}
    <line x1="35" y1="130" x2="65" y2="130" stroke="#C5A55A" strokeWidth="2" />
  </svg>
);

export default function ToastSection() {
  const [hasToasted, setHasToasted] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 25,
      distance: 80 + Math.random() * 40,
      size: 4 + Math.random() * 6,
    }));
  }, []);

  const handleToast = useCallback(() => {
    if (hasToasted) return;

    setHasToasted(true);

    // Play clink sound
    const audio = new Audio('/audio/clink.mp3');
    audio.play().catch(() => {
      // Silently handle audio play errors (autoplay policy)
    });

    // Reset after 2 seconds
    setTimeout(() => {
      setHasToasted(false);
    }, 2000);
  }, [hasToasted]);

  return (
    <section
      onClick={handleToast}
      className="min-h-[80vh] flex flex-col items-center justify-center relative cursor-pointer"
      style={{
        background: 'radial-gradient(circle at center, #3D0C11 0%, #0a0505 100%)',
      }}
    >
      {/* Title */}
      <h2 className="text-5xl md:text-6xl font-serif mb-16" style={{ color: '#C5A55A' }}>
        Na Zdrowie!
      </h2>

      {/* Wine Glasses Container */}
      <div className="relative flex items-center justify-center gap-32 mb-8">
        {/* Left Glass */}
        <motion.div
          animate={
            hasToasted
              ? { x: 80 }
              : { x: 0 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <WineGlass />
        </motion.div>

        {/* Right Glass */}
        <motion.div
          animate={
            hasToasted
              ? { x: -80 }
              : { x: 0 }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <WineGlass />
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {hasToasted && (
            <>
              {particles.map((particle) => {
                const x = Math.cos(particle.angle) * particle.distance;
                const y = Math.sin(particle.angle) * particle.distance;

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      backgroundColor: '#C5A55A',
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x,
                      y,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Toast Text */}
        <AnimatePresence>
          {hasToasted && (
            <motion.p
              className="absolute text-4xl font-serif"
              style={{ color: '#C5A55A' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Zdrowie!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Instruction Text */}
      <p className="text-sm" style={{ color: '#b8b0a3' }}>
        Kliknij, aby wznieść toast
      </p>
    </section>
  );
}
