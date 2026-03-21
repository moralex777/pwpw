'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { quotes } from '@/lib/content';

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

export default function QuotesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(420);
  const [isPaused, setIsPaused] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const fillControls = useAnimationControls();
  const fillPercentage = (activeIndex / (quotes.length - 1)) * 100;

  useEffect(() => {
    const updateWidth = () => setCardWidth(Math.min(420, window.innerWidth * 0.88));
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    fillControls.start({
      height: `${fillPercentage * 1.6}%`,
      y: `${100 - fillPercentage * 1.6}%`,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    });
  }, [activeIndex, fillPercentage, fillControls]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setActiveIndex(prev => Math.max(0, prev - 1));
    else if (e.key === 'ArrowRight') setActiveIndex(prev => Math.min(quotes.length - 1, prev + 1));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      className="py-24 bg-transparent relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient wine stain */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 wine-stain pointer-events-none"
        style={{ width: '500px', height: '500px' }} />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-2">
            Głosy Winnicy
          </h2>
          <div className="gold-divider-wide" />
        </motion.div>

        {/* Wine Glass fill indicator */}
        <div className="flex justify-center my-8">
          <svg width="80" height="140" viewBox="0 0 80 140" className="opacity-90">
            <defs>
              <clipPath id="quotes-glass-clip">
                <path d="M15 10 Q8 35 12 58 L28 100 L52 100 L68 58 Q72 35 65 10 Z" />
              </clipPath>
              <linearGradient id="wineGradQ" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B1538" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3D0C11" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              d="M15 10 Q8 35 12 58 L28 100 L52 100 L68 58 Q72 35 65 10 Z"
              fill="none" stroke="#C5A55A" strokeWidth="1.5"
            />
            <g clipPath="url(#quotes-glass-clip)">
              <motion.rect
                x="0" width="80"
                fill="url(#wineGradQ)"
                initial={{ height: 0, y: 100 }}
                animate={fillControls}
              />
            </g>
            <line x1="40" y1="100" x2="40" y2="128" stroke="#C5A55A" strokeWidth="1.5" />
            <ellipse cx="40" cy="130" rx="18" ry="4" fill="none" stroke="#C5A55A" strokeWidth="1.5" />
            <path d="M20 14 Q15 20 14 30" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={constraintsRef}>
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const offset = info.offset.x;
              const velocity = info.velocity.x;
              if (Math.abs(velocity) > 400 || Math.abs(offset) > 80) {
                if (offset > 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);
                else if (offset < 0 && activeIndex < quotes.length - 1) setActiveIndex(activeIndex + 1);
              }
            }}
            animate={{ x: -activeIndex * (cardWidth + 24) }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 quote-card-dark p-8 md:p-10 relative"
                style={{ width: cardWidth }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0.45,
                  scale: index === activeIndex ? 1 : 0.97,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Roman numeral watermark */}
                <span className="absolute top-4 right-6 font-serif text-5xl text-gold opacity-10 select-none">
                  {ROMAN[index] || index + 1}
                </span>
                {/* Decorative quote mark */}
                <span className="font-serif text-6xl text-gold opacity-20 leading-none select-none block mb-2">&ldquo;</span>
                <p className="font-serif italic text-xl md:text-2xl text-cream leading-relaxed mb-6">
                  {quote.text}
                </p>
                <div className="gold-divider mb-4" style={{ marginLeft: 0, width: '40px' }} />
                <p className="font-sans font-medium text-gold text-sm tracking-wider uppercase">
                  {quote.author}
                </p>
                <p className="text-xs text-cream-dim mt-1 opacity-60 font-sans">{quote.source}</p>
                {quote.original && (
                  <p className="text-xs italic text-cream-dim mt-2 opacity-40 font-serif">
                    {quote.original}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Roman numeral indicators */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="font-serif text-xs transition-all duration-300 hover:text-gold"
              style={{
                color: index === activeIndex ? '#C5A55A' : '#8a7340',
                opacity: index === activeIndex ? 1 : 0.5,
                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Cytat ${index + 1}`}
            >
              {ROMAN[index] || index + 1}
            </button>
          ))}
        </div>

        {/* Auto-play hint */}
        <p className="text-center text-xs text-cream-dim opacity-30 mt-4 font-sans tracking-wider">
          {isPaused ? 'Pauza' : 'Odtwarzanie automatyczne'}
        </p>
      </div>
    </section>
  );
}
