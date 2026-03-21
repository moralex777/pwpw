'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const PouringRitual = dynamic(() => import('./PouringRitual'), { ssr: false });

// Elegant wine stream using SVG path animation
function WineStream({ progress, streamId }: {
  progress: MotionValue<number>;
  streamId: string;
}) {
  return (
    <motion.svg
      width="180" height="200" viewBox="0 0 180 200"
      className="absolute pointer-events-none z-10"
      style={{ left: '50%', top: '10%', transform: 'translateX(-50%)' }}
    >
      <defs>
        <linearGradient id={`sg-${streamId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B1538" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#722F37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3D0C11" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Main stream */}
      <motion.path
        d="M 90 0 Q 100 60 110 120 Q 115 160 112 190"
        stroke={`url(#sg-${streamId})`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: progress }}
      />
      {/* Shimmer highlight */}
      <motion.path
        d="M 90 0 Q 100 60 110 120 Q 115 160 112 190"
        stroke="rgba(197,165,90,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: progress }}
      />
    </motion.svg>
  );
}

const STEPS = [
  { number: 'I',   title: 'Polewaj', subtitle: 'Pierwszy akt jest aktem hojności.' },
  { number: 'II',  title: 'Wypij',   subtitle: 'Drugi akt jest aktem odwagi.' },
  { number: 'III', title: 'Polewaj', subtitle: 'Trzeci akt jest aktem powtórzenia.' },
  { number: 'IV',  title: 'Wypij',   subtitle: 'Czwarty akt jest aktem filozofii.' },
];

function StepLabel({ step }: { step: typeof STEPS[0] }) {
  return (
    <motion.div
      className="text-center mt-12 px-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="font-serif text-gold text-4xl md:text-5xl mb-3 gold-shimmer">
        {step.number}. {step.title}
      </p>
      <div className="gold-divider mb-3" />
      <p className="text-cream text-lg italic font-serif opacity-80">{step.subtitle}</p>
    </motion.div>
  );
}

export default function RitualSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Step visibility
  const step1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.26], [1, 1, 1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.46, 0.50], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.48, 0.52, 0.70, 0.74], [0, 1, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.72, 0.76, 1.0], [0, 1, 1]);

  // Bottle tilt (pour angle)
  const bottle1Rotate = useTransform(scrollYProgress, [0.04, 0.22], [0, -42]);
  const bottle2Rotate = useTransform(scrollYProgress, [0.54, 0.72], [0, -42]);
  const bottle1Y = useTransform(scrollYProgress, [0.04, 0.22], [0, -30]);
  const bottle2Y = useTransform(scrollYProgress, [0.54, 0.72], [0, -30]);

  // Wine stream
  const stream1Progress = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);
  const stream2Progress = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);

  // Glass fill overlay (height of wine fill div)
  const glass1FillPct = useTransform(scrollYProgress, [0.06, 0.22], ['0%', '42%']);
  const glass2FillPct = useTransform(scrollYProgress, [0.28, 0.46], ['42%', '0%']);
  const glass3FillPct = useTransform(scrollYProgress, [0.56, 0.72], ['0%', '42%']);
  const glass4FillPct = useTransform(scrollYProgress, [0.78, 0.84], ['0%', '42%']);
  const glass5FillPct = useTransform(scrollYProgress, [0.78, 0.84], ['0%', '42%']);

  // Clink animation
  const glass3X = useTransform(scrollYProgress, [0.78, 0.88], [-80, 30]);
  const glass4X = useTransform(scrollYProgress, [0.78, 0.88], [80, -30]);
  const clinkScale = useTransform(scrollYProgress, [0.88, 0.93], [1, 1.06]);

  // Step progress indicator
  const activeStep = useTransform(scrollYProgress, [0, 0.26, 0.50, 0.74, 1.0], [0, 1, 2, 3, 3]);

  // Glass sway for step II
  const glass2Rotate = useSpring(
    useTransform(scrollYProgress, [0.28, 0.46], [0, -8]),
    { stiffness: 80, damping: 12 }
  );

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Ambient wine stain */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="wine-stain" style={{ width: '700px', height: '700px', opacity: 0.05 }} />
        </div>

        {/* Pouring ritual cursor/touch interaction */}
        <div className="absolute inset-0 z-20">
          <PouringRitual />
        </div>

        {/* Step progress indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-8 z-30">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.span
                className="font-serif text-xs tracking-widest"
                style={{
                  color: '#C5A55A',
                  opacity: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 1 : 0.2),
                }}
              >
                {step.number}
              </motion.span>
              <motion.div
                className="h-px w-8"
                style={{
                  background: '#C5A55A',
                  opacity: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 0.8 : 0.12),
                  scaleX: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 1 : 0.3),
                }}
              />
            </div>
          ))}
        </div>

        {/* Desktop hint */}
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-xs
          text-cream-dim opacity-20 tracking-widest uppercase z-30 hidden md:block">
          Przytrzymaj, aby nalewać
        </p>

        {/* ── STEP I — Polewaj ── */}
        <motion.div
          style={{ opacity: step1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative flex items-end justify-center gap-16 h-80">
            {/* Bottle tilting to pour */}
            <motion.div
              style={{ rotate: bottle1Rotate, y: bottle1Y, transformOrigin: 'bottom center' }}
              className="relative w-24 md:w-32 h-64 md:h-80"
            >
              <Image
                src="/images/bottle.png"
                alt="Butelka wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="128px"
              />
            </motion.div>

            {/* Wine stream */}
            <WineStream progress={stream1Progress} streamId="s1" />

            {/* Glass with animated fill overlay */}
            <div className="relative w-20 md:w-28 h-56 md:h-72">
              <Image
                src="/images/glass.png"
                alt="Kieliszek wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="112px"
              />
              {/* Wine fill rising from bottom — clip mask effect */}
              <motion.div
                className="absolute bottom-[18%] left-[15%] right-[15%] rounded-b-full"
                style={{
                  height: glass1FillPct,
                  background: 'linear-gradient(180deg, rgba(139,21,56,0.5) 0%, rgba(61,12,17,0.7) 100%)',
                  maxHeight: '42%',
                }}
              />
            </div>
          </div>
          <StepLabel step={STEPS[0]} />
        </motion.div>

        {/* ── STEP II — Wypij ── */}
        <motion.div
          style={{ opacity: step2Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative flex items-end justify-center h-80">
            <motion.div
              style={{ rotate: glass2Rotate, transformOrigin: 'bottom center' }}
              animate={{ rotate: [0, -4, 4, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
              className="relative w-24 md:w-32 h-64 md:h-80"
            >
              <Image
                src="/images/glass.png"
                alt="Kieliszek wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="128px"
              />
              <motion.div
                className="absolute bottom-[18%] left-[15%] right-[15%] rounded-b-full"
                style={{
                  height: glass2FillPct,
                  background: 'linear-gradient(180deg, rgba(139,21,56,0.5) 0%, rgba(61,12,17,0.7) 100%)',
                  maxHeight: '42%',
                }}
              />
            </motion.div>
          </div>
          <StepLabel step={STEPS[1]} />
        </motion.div>

        {/* ── STEP III — Polewaj ── */}
        <motion.div
          style={{ opacity: step3Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative flex items-end justify-center gap-16 h-80">
            <motion.div
              style={{ rotate: bottle2Rotate, y: bottle2Y, transformOrigin: 'bottom center' }}
              className="relative w-24 md:w-32 h-64 md:h-80"
            >
              <Image
                src="/images/bottle.png"
                alt="Butelka wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="128px"
              />
            </motion.div>

            <WineStream progress={stream2Progress} streamId="s2" />

            <div className="relative w-20 md:w-28 h-56 md:h-72">
              <Image
                src="/images/glass.png"
                alt="Kieliszek wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="112px"
              />
              <motion.div
                className="absolute bottom-[18%] left-[15%] right-[15%] rounded-b-full"
                style={{
                  height: glass3FillPct,
                  background: 'linear-gradient(180deg, rgba(139,21,56,0.5) 0%, rgba(61,12,17,0.7) 100%)',
                  maxHeight: '42%',
                }}
              />
            </div>
          </div>
          <StepLabel step={STEPS[2]} />
        </motion.div>

        {/* ── STEP IV — Wypij (clink) ── */}
        <motion.div
          style={{ opacity: step4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        >
          <div className="relative flex items-end justify-center h-80">
            {/* Left glass */}
            <motion.div
              style={{ x: glass3X, scale: clinkScale, transformOrigin: 'bottom center' }}
              className="relative w-20 md:w-28 h-56 md:h-72"
            >
              <Image
                src="/images/glass.png"
                alt="Kieliszek wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="112px"
              />
              <motion.div
                className="absolute bottom-[18%] left-[15%] right-[15%] rounded-b-full"
                style={{
                  height: glass4FillPct,
                  background: 'linear-gradient(180deg, rgba(139,21,56,0.5) 0%, rgba(61,12,17,0.7) 100%)',
                  maxHeight: '42%',
                }}
              />
            </motion.div>

            {/* Right glass */}
            <motion.div
              style={{ x: glass4X, scale: clinkScale, transformOrigin: 'bottom center' }}
              className="relative w-20 md:w-28 h-56 md:h-72"
            >
              <Image
                src="/images/glass.png"
                alt="Kieliszek wina"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="112px"
              />
              <motion.div
                className="absolute bottom-[18%] left-[15%] right-[15%] rounded-b-full"
                style={{
                  height: glass5FillPct,
                  background: 'linear-gradient(180deg, rgba(139,21,56,0.5) 0%, rgba(61,12,17,0.7) 100%)',
                  maxHeight: '42%',
                }}
              />
            </motion.div>
          </div>
          <StepLabel step={STEPS[3]} />
        </motion.div>

      </div>
    </section>
  );
}
