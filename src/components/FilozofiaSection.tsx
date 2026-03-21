'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { filozofia } from '@/lib/content';

function PrincipleCard({
  principleIndex,
  progress,
}: {
  principleIndex: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const principle = filozofia[principleIndex];
  const total = filozofia.length;
  const segmentSize = 1 / total;
  const start = principleIndex * segmentSize;
  const fadeIn = start + 0.02;
  const hold = start + segmentSize * 0.55;
  const fadeOut = start + segmentSize * 0.9;
  const end = (principleIndex + 1) * segmentSize;

  const opacity = useTransform(
    progress,
    [start, fadeIn, hold, fadeOut, end],
    [0, 1, 1, 0, 0]
  );
  const scale = useTransform(progress, [start, fadeIn, hold], [0.94, 1, 1]);
  const y = useTransform(progress, [start, fadeIn], [30, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 80, damping: 20 });

  const words = principle.text.split(' ');
  const wordCount = words.length;

  return (
    <motion.div
      style={{ opacity: smoothOpacity, scale: smoothScale, y }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-16"
    >
      <div className="max-w-3xl w-full principle-frame rounded-sm p-8 md:p-14 relative">
        {/* Corner ornaments */}
        <span className="absolute top-3 left-3 text-gold opacity-30 text-lg select-none font-serif">✦</span>
        <span className="absolute top-3 right-3 text-gold opacity-30 text-lg select-none font-serif">✦</span>
        <span className="absolute bottom-3 left-3 text-gold opacity-30 text-lg select-none font-serif">✦</span>
        <span className="absolute bottom-3 right-3 text-gold opacity-30 text-lg select-none font-serif">✦</span>

        {/* Roman numeral */}
        <motion.p
          className="font-serif text-gold text-sm tracking-[0.4em] uppercase mb-2 opacity-60"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {principle.number}
        </motion.p>

        {/* Title */}
        <motion.h3
          className="font-serif text-gold text-4xl md:text-6xl mb-6 gold-shimmer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {principle.title}
        </motion.h3>

        <div className="gold-divider mb-6" style={{ marginLeft: 0, width: '60px' }} />

        {/* Word-by-word reveal */}
        <p className="font-serif text-cream text-lg md:text-xl leading-relaxed">
          {words.map((word, i) => {
            const wordStart = fadeIn + (i / wordCount) * (hold - fadeIn) * 0.7;
            const wordEnd = wordStart + 0.025;
            const wordOpacity = useTransform(progress, [wordStart, wordEnd], [0, 1]);
            const wordY = useTransform(progress, [wordStart, wordEnd], [8, 0]);
            return (
              <motion.span
                key={i}
                style={{ opacity: wordOpacity, y: wordY, display: 'inline-block', marginRight: '0.28em' }}
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </motion.div>
  );
}

export default function FilozofiaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient wine stain */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="wine-stain" style={{ width: '700px', height: '700px', opacity: 0.05 }} />
        </div>

        {/* Section title — dramatic reveal */}
        <motion.h2
          className="absolute top-10 left-8 md:left-16 text-gold font-serif z-20"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]),
            x: useTransform(scrollYProgress, [0, 0.05], [-20, 0]),
          }}
        >
          Filozofia
        </motion.h2>

        {filozofia.map((_, i) => (
          <PrincipleCard key={i} principleIndex={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
