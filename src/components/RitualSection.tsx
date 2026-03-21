'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';

const PouringRitual = dynamic(() => import('./PouringRitual'), { ssr: false });

function WineBottle({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <motion.svg
      style={{ rotate }}
      width="60" height="200" viewBox="0 0 60 200"
      className="drop-shadow-lg"
    >
      <rect x="22" y="0" width="16" height="10" rx="3" fill="#1a3a0a" />
      <rect x="18" y="10" width="24" height="8" rx="2" fill="#2d5016" />
      <path d="M18 18 Q10 30 8 50 L8 160 Q8 175 30 175 Q52 175 52 160 L52 50 Q50 30 42 18 Z" fill="#3a6b1e" />
      <rect x="12" y="80" width="36" height="50" rx="3" fill="rgba(197,165,90,0.15)" stroke="#C5A55A" strokeWidth="0.5" />
      <line x1="18" y1="95" x2="42" y2="95" stroke="#C5A55A" strokeWidth="0.4" opacity="0.6" />
      <line x1="20" y1="103" x2="40" y2="103" stroke="#C5A55A" strokeWidth="0.4" opacity="0.4" />
      <line x1="22" y1="111" x2="38" y2="111" stroke="#C5A55A" strokeWidth="0.4" opacity="0.3" />
      <path d="M8 160 Q8 180 30 180 Q52 180 52 160" fill="#2d5016" />
      <path d="M14 30 Q12 60 12 100" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

function WineGlass({ fillProgress, clipId }: {
  fillProgress: MotionValue<number>;
  clipId: string;
}) {
  const yVal = useTransform(fillProgress, (h: number) => 100 - h);
  return (
    <svg width="80" height="140" viewBox="0 0 80 140" className="drop-shadow-lg">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="80" height="140" />
        </clipPath>
        <linearGradient id={`wg-${clipId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B1538" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3D0C11" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M15 10 Q8 35 12 58 L28 100 L52 100 L68 58 Q72 35 65 10 Z"
        fill="none" stroke="#C5A55A" strokeWidth="1.5" />
      <motion.rect x="0" width="80" fill={`url(#wg-${clipId})`}
        clipPath={`url(#${clipId})`}
        style={{ height: fillProgress, y: yVal }}
      />
      <path d="M15 10 Q8 35 12 58 L28 100 L52 100 L68 58 Q72 35 65 10 Z"
        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <line x1="40" y1="100" x2="40" y2="128" stroke="#C5A55A" strokeWidth="1.5" />
      <ellipse cx="40" cy="130" rx="18" ry="4" fill="none" stroke="#C5A55A" strokeWidth="1.5" />
      <path d="M20 14 Q15 20 14 30" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function WineStream({ progress, streamId }: {
  progress: MotionValue<number>;
  streamId: string;
}) {
  return (
    <motion.svg width="200" height="160" viewBox="0 0 200 160"
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <defs>
        <linearGradient id={`sg-${streamId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B1538" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3D0C11" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 80 40 Q 120 80 140 130"
        stroke={`url(#sg-${streamId})`}
        strokeWidth="5" strokeLinecap="round" fill="none"
        style={{ pathLength: progress }}
      />
      <motion.path
        d="M 80 40 Q 120 80 140 130"
        stroke="rgba(197,165,90,0.25)"
        strokeWidth="1.5" strokeLinecap="round" fill="none"
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
      className="text-center mt-10 px-4"
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

  const step1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.26], [1, 1, 1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.46, 0.50], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.48, 0.52, 0.70, 0.74], [0, 1, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.72, 0.76, 1.0], [0, 1, 1]);

  const bottle1Rotate = useTransform(scrollYProgress, [0.04, 0.22], [0, -35]);
  const bottle2Rotate = useTransform(scrollYProgress, [0.54, 0.72], [0, -35]);

  const stream1Progress = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);
  const stream2Progress = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);

  const glass1Fill = useTransform(scrollYProgress, [0.06, 0.22], [0, 58]);
  const glass2Fill = useTransform(scrollYProgress, [0.28, 0.46], [58, 0]);
  const glass3Fill = useTransform(scrollYProgress, [0.56, 0.72], [0, 58]);
  const glass4Fill = useTransform(scrollYProgress, [0.78, 0.84], [0, 52]);
  const glass5Fill = useTransform(scrollYProgress, [0.78, 0.84], [0, 52]);

  const glass3X = useTransform(scrollYProgress, [0.78, 0.88], [-60, 42]);
  const glass4X = useTransform(scrollYProgress, [0.78, 0.88], [60, -42]);
  const clinkScale = useTransform(scrollYProgress, [0.88, 0.93], [1, 1.1]);

  const activeStep = useTransform(scrollYProgress, [0, 0.26, 0.50, 0.74, 1.0], [0, 1, 2, 3, 3]);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient stain */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="wine-stain" style={{ width: '600px', height: '600px', opacity: 0.06 }} />
        </div>

        {/* Pouring ritual overlay — cursor/touch interaction */}
        <div className="absolute inset-0 z-20">
          <PouringRitual />
        </div>

        {/* Step progress indicator */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6 z-30">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.span
                className="font-serif text-xs tracking-widest"
                style={{
                  color: '#C5A55A',
                  opacity: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 1 : 0.25),
                }}
              >
                {step.number}
              </motion.span>
              <motion.div
                className="h-px w-6"
                style={{
                  background: '#C5A55A',
                  opacity: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 0.8 : 0.15),
                  scaleX: useTransform(activeStep, (v: number) => Math.round(v) >= i ? 1 : 0.3),
                }}
              />
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-xs
          text-cream-dim opacity-25 tracking-widest uppercase z-30 hidden md:block">
          Przytrzymaj, aby nalewać
        </p>

        {/* Step I — Polewaj */}
        <motion.div style={{ opacity: step1Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full h-72 flex items-center justify-center">
            <div className="absolute" style={{ left: 'calc(50% - 120px)', top: '20px' }}>
              <WineBottle rotate={bottle1Rotate} />
            </div>
            <WineStream progress={stream1Progress} streamId="s1" />
            <div className="absolute" style={{ right: 'calc(50% - 120px)', top: '30px' }}>
              <WineGlass fillProgress={glass1Fill} clipId="gc1" />
            </div>
          </div>
          <StepLabel step={STEPS[0]} />
        </motion.div>

        {/* Step II — Wypij */}
        <motion.div style={{ opacity: step2Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, -3, 3, -2, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            >
              <WineGlass fillProgress={glass2Fill} clipId="gc2" />
            </motion.div>
          </div>
          <StepLabel step={STEPS[1]} />
        </motion.div>

        {/* Step III — Polewaj */}
        <motion.div style={{ opacity: step3Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full h-72 flex items-center justify-center">
            <div className="absolute" style={{ left: 'calc(50% - 120px)', top: '20px' }}>
              <WineBottle rotate={bottle2Rotate} />
            </div>
            <WineStream progress={stream2Progress} streamId="s2" />
            <div className="absolute" style={{ right: 'calc(50% - 120px)', top: '30px' }}>
              <WineGlass fillProgress={glass3Fill} clipId="gc3" />
            </div>
          </div>
          <StepLabel step={STEPS[2]} />
        </motion.div>

        {/* Step IV — Wypij (clink) */}
        <motion.div style={{ opacity: step4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full h-72 flex items-center justify-center">
            <motion.div style={{ x: glass3X, scale: clinkScale }} className="absolute">
              <WineGlass fillProgress={glass4Fill} clipId="gc4" />
            </motion.div>
            <motion.div style={{ x: glass4X, scale: clinkScale }} className="absolute">
              <WineGlass fillProgress={glass5Fill} clipId="gc5" />
            </motion.div>
          </div>
          <StepLabel step={STEPS[3]} />
        </motion.div>
      </div>
    </section>
  );
}
