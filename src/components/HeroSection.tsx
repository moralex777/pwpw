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
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden">

      {/* Photorealistic fallback background — wine cellar */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundColor: '#1a0a0d',
          transform: 'scale(1.05)',
        }}
      />

      {/* Video on top with poster — if GPU renders it, great; if not, hero-bg shows */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.jpg"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.05)' }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Vignette overlay — transparent centre, dark edges + strong bottom gradient for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,5,5,0) 0%, rgba(10,5,5,0.22) 100%),
            linear-gradient(
              180deg,
              rgba(10,5,5,0.15) 0%,
              rgba(10,5,5,0.00) 18%,
              rgba(10,5,5,0.00) 50%,
              rgba(10,5,5,0.55) 80%,
              rgba(10,5,5,0.90) 100%
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
          animate={{ opacity: 0.7, letterSpacing: '0.5em' }}
          transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          className="font-sans text-xs text-gold-dim tracking-[0.5em] uppercase mb-6 select-none"
          style={{ textShadow: '0 1px 12px rgba(10,5,5,0.9)' }}
        >
          Est. MMXXVI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-gold gold-shimmer leading-tight"
          style={{ textShadow: '0 2px 40px rgba(10,5,5,0.9), 0 0 80px rgba(197,165,90,0.2)' }}
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
            style={{ textShadow: '0 2px 20px rgba(10,5,5,0.95)' }}
          >
            In Vino Veritas
          </p>
          <p
            className="font-sans text-base md:text-xl text-cream-dim tracking-[0.3em] uppercase"
            style={{ textShadow: '0 2px 16px rgba(10,5,5,0.95)' }}
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
    </section>
  );
}
