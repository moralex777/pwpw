'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.4], ['0%', '20%']);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">

      {/* Static fallback — always visible, hero.svg centred */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: 'url(/images/hero.svg)', backgroundColor: '#1a0a0d' }}
      />

      {/* Video on top — if it loads it replaces the fallback visually */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Vignette overlay — light centre, dark edges/bottom only */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 45%, rgba(10,5,5,0) 0%, rgba(10,5,5,0.28) 100%),
            linear-gradient(
              180deg,
              rgba(10,5,5,0.10) 0%,
              rgba(10,5,5,0.00) 20%,
              rgba(10,5,5,0.00) 55%,
              rgba(10,5,5,0.50) 82%,
              rgba(10,5,5,0.85) 100%
            )
          `,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: titleOpacity, scale: titleScale }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 0.6, letterSpacing: '0.5em' }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          className="font-sans text-xs text-gold-dim tracking-[0.5em] uppercase mb-6 select-none"
        >
          Est. MMXXVI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-gold gold-shimmer leading-tight"
          style={{ textShadow: '0 2px 40px rgba(10,5,5,0.8), 0 0 80px rgba(197,165,90,0.15)' }}
        >
          Polewaj. Wypij.<br />
          Polewaj. Wypij.
        </motion.h1>

        <motion.div
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="mt-8 space-y-2"
        >
          <p
            className="font-serif text-2xl md:text-3xl text-cream italic"
            style={{ textShadow: '0 2px 20px rgba(10,5,5,0.9)' }}
          >
            In Vino Veritas
          </p>
          <p
            className="font-sans text-base md:text-xl text-cream-dim tracking-[0.3em] uppercase"
            style={{ textShadow: '0 2px 16px rgba(10,5,5,0.9)' }}
          >
            Ergo Bibamus
          </p>
        </motion.div>

        {/* Wine-drop scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <svg width="16" height="32" viewBox="0 0 16 32" className="text-gold">
            <path
              d="M8 0 C8 0, 0 10, 0 18 C0 24.627 3.582 30 8 30 C12.418 30 16 24.627 16 18 C16 10 8 0 8 0Z"
              className="drip-drop"
              style={{ fill: '#C5A55A', opacity: 0.85 }}
            />
          </svg>
          <div className="wine-line" style={{ height: '24px', opacity: 0.5 }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
