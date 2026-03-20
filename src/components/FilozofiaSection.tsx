'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { filozofia } from '@/lib/content'

function splitIntoWords(text: string) {
  return text.split(' ').map((word, i, arr) => ({
    word: word + (i < arr.length - 1 ? '\u00A0' : ''),
    index: i,
    total: arr.length,
  }))
}

function useWordOpacity(
  progress: MotionValue<number>,
  principleIndex: number,
  wordIndex: number,
  totalWords: number
) {
  const start = principleIndex * 0.25
  const wordFraction = wordIndex / (totalWords - 1 || 1)
  return useTransform(
    progress,
    [start + wordFraction * 0.2, start + wordFraction * 0.25],
    [0.15, 1]
  )
}

// Fixed set of word components to avoid hooks-in-loops
function WordSpan({
  word,
  progress,
  principleIndex,
  wordIndex,
  totalWords,
}: {
  word: string
  progress: MotionValue<number>
  principleIndex: number
  wordIndex: number
  totalWords: number
}) {
  const opacity = useWordOpacity(progress, principleIndex, wordIndex, totalWords)
  return <motion.span style={{ opacity }}>{word}</motion.span>
}

function PrincipleCard({
  principleIndex,
  progress,
}: {
  principleIndex: number
  progress: MotionValue<number>
}) {
  const principle = filozofia[principleIndex]
  const words = splitIntoWords(principle.text)

  const start = principleIndex * 0.25
  const end = (principleIndex + 1) * 0.25
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-24 pointer-events-none"
      style={{ opacity }}
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16 items-start">
        <div className="text-gold text-6xl md:text-7xl lg:text-8xl font-serif leading-none">
          {principle.number}
        </div>
        <div className="space-y-4">
          <h3 className="text-gold text-2xl md:text-3xl font-serif mb-6">
            {principle.title}
          </h3>
          <p className="text-cream text-lg md:text-xl leading-relaxed">
            {words.map((w, i) => (
              <WordSpan
                key={`${principleIndex}-${i}`}
                word={w.word}
                progress={progress}
                principleIndex={principleIndex}
                wordIndex={i}
                totalWords={words.length}
              />
            ))}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FilozofiaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-wine-dark">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <h2 className="absolute top-12 left-8 md:left-16 text-gold text-4xl md:text-5xl font-serif">
          Filozofia
        </h2>

        <PrincipleCard principleIndex={0} progress={scrollYProgress} />
        <PrincipleCard principleIndex={1} progress={scrollYProgress} />
        <PrincipleCard principleIndex={2} progress={scrollYProgress} />
        <PrincipleCard principleIndex={3} progress={scrollYProgress} />
      </div>
    </section>
  )
}
