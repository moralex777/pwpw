'use client';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const TOAST_KEY = 'pwpw_toast_count';

function ElegantGlass({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="100" height="180"
      viewBox="0 0 100 180"
      style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
    >
      <defs>
        <linearGradient id={`glassGrad${flipped ? 'R' : 'L'}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id={`wineGrad${flipped ? 'R' : 'L'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9B2335" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#3D0C11" stopOpacity="0.95" />
        </linearGradient>
        <clipPath id={`bowlClip${flipped ? 'R' : 'L'}`}>
          <path d="M18 12 Q10 38 14 62 L30 108 L70 108 L86 62 Q90 38 82 12 Z" />
        </clipPath>
      </defs>
      {/* Bowl */}
      <path
        d="M18 12 Q10 38 14 62 L30 108 L70 108 L86 62 Q90 38 82 12 Z"
        fill={`url(#glassGrad${flipped ? 'R' : 'L'})`}
        stroke="#C5A55A"
        strokeWidth="1.5"
      />
      {/* Wine fill */}
      <rect
        x="0" y="60" width="100" height="50"
        fill={`url(#wineGrad${flipped ? 'R' : 'L'})`}
        clipPath={`url(#bowlClip${flipped ? 'R' : 'L'})`}
      />
      {/* Wine surface shimmer */}
      <ellipse cx="50" cy="60" rx="28" ry="4"
        fill="rgba(139,21,56,0.3)" clipPath={`url(#bowlClip${flipped ? 'R' : 'L'})`} />
      {/* Stem */}
      <line x1="50" y1="108" x2="50" y2="155" stroke="#C5A55A" strokeWidth="1.5" />
      {/* Base */}
      <ellipse cx="50" cy="158" rx="24" ry="5" fill="none" stroke="#C5A55A" strokeWidth="1.5" />
      {/* Shine */}
      <path d="M24 18 Q20 30 20 50" stroke="rgba(255,255,255,0.12)" strokeWidth="2.5"
        fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function ToastSection() {
  const [hasToasted, setHasToasted] = useState(false);
  const [toastCount, setToastCount] = useState(0);
  const [showZdrowie, setShowZdrowie] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const shakeControls = useAnimation();

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(TOAST_KEY) || '0', 10);
    setToastCount(stored);
  }, []);

  const particles = useMemo(() => Array.from({ length: 32 }, (_, i) => ({
    id: i,
    angle: (Math.PI * 2 * i) / 32,
    distance: 70 + Math.random() * 60,
    size: 3 + Math.random() * 5,
    isWine: i % 3 === 0,
    delay: Math.random() * 0.15,
  })), []);

  const handleToast = useCallback(() => {
    if (hasToasted) return;
    setHasToasted(true);
    setShowZdrowie(true);

    // Increment counter
    const newCount = toastCount + 1;
    setToastCount(newCount);
    localStorage.setItem(TOAST_KEY, String(newCount));

    // Screen shake
    shakeControls.start({
      x: [0, -6, 8, -5, 4, -2, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });

    // Play clink
    const audio = new Audio('/audio/clink.mp3');
    audio.play().catch(() => {});

    setTimeout(() => {
      setHasToasted(false);
      setShowZdrowie(false);
    }, 2200);
  }, [hasToasted, toastCount, shakeControls]);

  const formatCount = (n: number) => {
    if (n < 1000) return String(n);
    return `${(n / 1000).toFixed(1)}k`;
  };

  return (
    <motion.section
      ref={containerRef as React.RefObject<HTMLElement>}
      animate={shakeControls}
      onClick={handleToast}
      className="min-h-[85vh] flex flex-col items-center justify-center relative cursor-pointer select-none overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #3D0C11 0%, #0a0505 70%)' }}
    >
      {/* Ambient stain */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="wine-stain" style={{ width: '500px', height: '500px', opacity: 0.08 }} />
      </div>

      {/* Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-serif mb-4 text-gold gold-shimmer relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Na Zdrowie!
      </motion.h2>

      {/* Toast counter */}
      <motion.div
        className="mb-12 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="font-sans text-xs text-cream-dim tracking-[0.3em] uppercase opacity-50">
          Od zarania tej strony wzniesiono
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={toastCount}
            className="font-serif text-3xl text-gold mt-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            {formatCount(toastCount)} toastów
          </motion.p>
        </AnimatePresence>
        <p className="font-serif text-xs text-cream-dim opacity-30 italic mt-1">
          Cyceron byłby dumny.
        </p>
      </motion.div>

      {/* Glasses */}
      <div className="relative flex items-end justify-center gap-24 mb-8 z-10">
        {/* Left glass */}
        <motion.div
          animate={hasToasted ? { x: 55, rotate: 8 } : { x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="glass-sway"
          style={{ animationPlayState: hasToasted ? 'paused' : 'running' }}
        >
          <ElegantGlass />
        </motion.div>

        {/* Right glass */}
        <motion.div
          animate={hasToasted ? { x: -55, rotate: -8 } : { x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="glass-sway"
          style={{ animationDelay: '0.4s', animationPlayState: hasToasted ? 'paused' : 'running' }}
        >
          <ElegantGlass flipped />
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {hasToasted && particles.map((p) => {
            const x = Math.cos(p.angle) * p.distance;
            const y = Math.sin(p.angle) * p.distance;
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.isWine ? '#8B1538' : '#C5A55A',
                  left: '50%',
                  top: '40%',
                  boxShadow: p.isWine ? '0 0 4px rgba(139,21,56,0.6)' : '0 0 4px rgba(197,165,90,0.6)',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x, y, opacity: 0, scale: 0 }}
                transition={{ duration: 0.9 + p.delay, ease: 'easeOut', delay: p.delay }}
              />
            );
          })}
        </AnimatePresence>

        {/* Zdrowie text */}
        <AnimatePresence>
          {showZdrowie && (
            <motion.p
              className="absolute font-serif text-5xl text-gold pointer-events-none"
              style={{ top: '-20px', left: '50%', x: '-50%' }}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Zdrowie!
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Instruction */}
      <motion.p
        className="text-sm font-sans text-cream-dim opacity-40 tracking-wider z-10"
        animate={{ opacity: hasToasted ? 0 : 0.4 }}
      >
        Kliknij, aby wznieść toast
      </motion.p>
    </motion.section>
  );
}
