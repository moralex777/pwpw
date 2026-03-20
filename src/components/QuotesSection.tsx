'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { quotes } from '@/lib/content'

export default function QuotesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(400)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const fillControls = useAnimationControls()

  const fillPercentage = (activeIndex / (quotes.length - 1)) * 100

  useEffect(() => {
    const updateWidth = () => {
      setCardWidth(Math.min(400, window.innerWidth * 0.85))
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    fillControls.start({
      height: `${fillPercentage}%`,
      transition: { duration: 0.6, ease: 'easeOut' },
    })
  }, [activeIndex, fillPercentage, fillControls])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => Math.min(quotes.length - 1, prev + 1))
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-gold text-center mb-12">
          Głosy Winnicy
        </h2>

        {/* Wine Glass Decoration */}
        <div className="flex justify-center mb-8">
          <svg
            width="120"
            height="200"
            viewBox="0 0 120 200"
            className="opacity-80"
          >
            <defs>
              <clipPath id="quotes-glass-clip">
                <path d="M 30 20 Q 20 40, 25 60 L 35 120 L 40 120 L 40 180 L 80 180 L 80 120 L 85 120 L 95 60 Q 100 40, 90 20 Z" />
              </clipPath>
            </defs>

            <path
              d="M 30 20 Q 20 40, 25 60 L 35 120 L 40 120 L 40 180 L 80 180 L 80 120 L 85 120 L 95 60 Q 100 40, 90 20 Z"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="2"
            />
            <line x1="30" y1="180" x2="90" y2="180" stroke="#C5A55A" strokeWidth="3" />

            <g clipPath="url(#quotes-glass-clip)">
              <motion.rect
                x="20"
                width="80"
                fill="#3D0C11"
                initial={{ height: 0, y: 180 }}
                animate={{
                  height: fillPercentage * 1.6,
                  y: 180 - fillPercentage * 1.6,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </g>
          </svg>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={constraintsRef}>
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const offset = info.offset.x
              const velocity = info.velocity.x
              if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
                if (offset > 0 && activeIndex > 0) {
                  setActiveIndex(activeIndex - 1)
                } else if (offset < 0 && activeIndex < quotes.length - 1) {
                  setActiveIndex(activeIndex + 1)
                }
              }
            }}
            animate={{ x: -activeIndex * (cardWidth + 32) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 p-8 bg-[#F5F0E8]"
                style={{ width: cardWidth }}
              >
                <p className="font-serif italic text-xl text-[#3D0C11] mb-4">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="font-medium text-gold mb-1">&mdash; {quote.author}</p>
                <p className="text-sm opacity-60 text-[#3D0C11]">{quote.source}</p>
                {quote.original && (
                  <p className="text-xs italic opacity-40 text-[#3D0C11] mt-2">
                    {quote.original}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-gold scale-125'
                  : 'bg-cream-dim opacity-50 hover:opacity-75'
              }`}
              aria-label={`Go to quote ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
