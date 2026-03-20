'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RitualSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map progress to step index (0-3)
  const step1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);

  // Step 1: Bottle tilt and wine stream
  const bottle1Rotate = useTransform(scrollYProgress, [0, 0.25], [0, 45]);
  const wineStream1 = useTransform(scrollYProgress, [0.1, 0.25], [100, 0]);

  // Step 2: Glass fill
  const glassFill1 = useTransform(scrollYProgress, [0.25, 0.5], [100, 0]);

  // Step 3: Second bottle tilt and stream
  const bottle2Rotate = useTransform(scrollYProgress, [0.5, 0.75], [0, 45]);
  const wineStream2 = useTransform(scrollYProgress, [0.6, 0.75], [100, 0]);

  // Step 4: Glasses slide together
  const glass1X = useTransform(scrollYProgress, [0.75, 1], [0, 100]);
  const glass2X = useTransform(scrollYProgress, [0.75, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh] bg-wine-deep"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Title */}
        <h2 className="font-serif text-6xl md:text-7xl text-gold mb-16">
          Rytuał
        </h2>

        {/* Animation Container */}
        <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
          {/* Step 1: I. Polewaj */}
          <motion.div
            style={{ opacity: step1Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Bottle */}
              <motion.svg
                style={{ rotate: bottle1Rotate }}
                width="80"
                height="200"
                viewBox="0 0 80 200"
                className="absolute left-1/4"
              >
                <rect x="25" y="0" width="30" height="40" fill="#2d5016" />
                <rect x="20" y="40" width="40" height="120" fill="#4a7c2e" rx="8" />
                <rect x="15" y="160" width="50" height="40" fill="#4a7c2e" />
              </motion.svg>

              {/* Wine stream */}
              <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="absolute left-1/4 top-1/2"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: wineStream1,
                }}
              >
                <path
                  d="M 80 60 Q 120 100 140 140"
                  stroke="#8B1538"
                  strokeWidth="4"
                  fill="none"
                />
              </motion.svg>

              {/* Glass */}
              <svg
                width="80"
                height="120"
                viewBox="0 0 80 120"
                className="absolute right-1/4"
              >
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="none"
                  stroke="#C5A55A"
                  strokeWidth="2"
                />
                <rect x="35" y="100" width="10" height="15" fill="#C5A55A" />
              </svg>
            </div>

            <div className="text-center mt-8">
              <p className="font-serif text-gold text-4xl mb-2">I. Polewaj</p>
              <p className="text-cream text-lg italic">Pierwszy akt jest aktem hojności.</p>
            </div>
          </motion.div>

          {/* Step 2: II. Wypij */}
          <motion.div
            style={{ opacity: step2Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-64 flex items-center justify-center">
              <svg width="80" height="120" viewBox="0 0 80 120">
                <defs>
                  <clipPath id="wineFill1">
                    <motion.rect
                      x="0"
                      y="0"
                      width="80"
                      height="120"
                      style={{ y: glassFill1 }}
                    />
                  </clipPath>
                </defs>
                {/* Glass outline */}
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="none"
                  stroke="#C5A55A"
                  strokeWidth="2"
                />
                {/* Wine fill */}
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="#8B1538"
                  clipPath="url(#wineFill1)"
                />
                <rect x="35" y="100" width="10" height="15" fill="#C5A55A" />
              </svg>
            </div>

            <div className="text-center mt-8">
              <p className="font-serif text-gold text-4xl mb-2">II. Wypij</p>
              <p className="text-cream text-lg italic">Drugi akt jest aktem odwagi.</p>
            </div>
          </motion.div>

          {/* Step 3: III. Polewaj */}
          <motion.div
            style={{ opacity: step3Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* Bottle */}
              <motion.svg
                style={{ rotate: bottle2Rotate }}
                width="80"
                height="200"
                viewBox="0 0 80 200"
                className="absolute left-1/4"
              >
                <rect x="25" y="0" width="30" height="40" fill="#2d5016" />
                <rect x="20" y="40" width="40" height="120" fill="#4a7c2e" rx="8" />
                <rect x="15" y="160" width="50" height="40" fill="#4a7c2e" />
              </motion.svg>

              {/* Wine stream */}
              <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="absolute left-1/4 top-1/2"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: wineStream2,
                }}
              >
                <path
                  d="M 80 60 Q 120 100 140 140"
                  stroke="#8B1538"
                  strokeWidth="4"
                  fill="none"
                />
              </motion.svg>

              {/* Second glass */}
              <svg
                width="80"
                height="120"
                viewBox="0 0 80 120"
                className="absolute right-1/4"
              >
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="none"
                  stroke="#C5A55A"
                  strokeWidth="2"
                />
                <rect x="35" y="100" width="10" height="15" fill="#C5A55A" />
              </svg>
            </div>

            <div className="text-center mt-8">
              <p className="font-serif text-gold text-4xl mb-2">III. Polewaj</p>
              <p className="text-cream text-lg italic">Trzeci akt jest aktem powtórzenia.</p>
            </div>
          </motion.div>

          {/* Step 4: IV. Wypij */}
          <motion.div
            style={{ opacity: step4Opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-64 flex items-center justify-center">
              {/* First glass sliding right */}
              <motion.svg
                style={{ x: glass1X }}
                width="80"
                height="120"
                viewBox="0 0 80 120"
                className="absolute"
              >
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="#8B1538"
                  stroke="#C5A55A"
                  strokeWidth="2"
                />
                <rect x="35" y="100" width="10" height="15" fill="#C5A55A" />
              </motion.svg>

              {/* Second glass sliding left */}
              <motion.svg
                style={{ x: glass2X }}
                width="80"
                height="120"
                viewBox="0 0 80 120"
                className="absolute"
              >
                <path
                  d="M 20 20 L 30 100 L 50 100 L 60 20 Z"
                  fill="#8B1538"
                  stroke="#C5A55A"
                  strokeWidth="2"
                />
                <rect x="35" y="100" width="10" height="15" fill="#C5A55A" />
              </motion.svg>
            </div>

            <div className="text-center mt-8">
              <p className="font-serif text-gold text-4xl mb-2">IV. Wypij</p>
              <p className="text-cream text-lg italic">Czwarty akt jest aktem filozofii.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
