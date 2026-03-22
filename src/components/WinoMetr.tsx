'use client'

import { useState, useEffect } from 'react'

function getLabel(progress: number): string {
  if (progress <= 15) return 'Trzeźwy'
  if (progress <= 35) return 'Lekki szum'
  if (progress <= 55) return 'Filozoficzny'
  if (progress <= 80) return 'Elokwentny'
  return 'Oświecony'
}

export default function WinoMetr() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [labelVisible, setLabelVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0

      setScrollY(scrollTop)
      setScrollProgress(progress)

      if (progress >= 80) {
        document.body.classList.add('intoxicated')
      } else {
        document.body.classList.remove('intoxicated')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('intoxicated')
    }
  }, [])

  const visible = scrollY > 200

  // Bowl spans y=6 to y=38 (32 units of fill space)
  const fillHeight = (scrollProgress / 100) * 32
  const fillY = 38 - fillHeight

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => setLabelVisible((v) => !v)}
    >
      <svg
        width={32}
        height={56}
        viewBox="0 0 32 56"
        fill="none"
      >
        <defs>
          <clipPath id="wine-bowl-clip">
            <path d="M 5 4 Q 2 6 2 12 Q 2 22 6 28 Q 9 33 12 36 L 13 38 L 19 38 L 20 36 Q 23 33 26 28 Q 30 22 30 12 Q 30 6 27 4 Z" />
          </clipPath>
          {/* Wine surface highlight */}
          <linearGradient id="wine-fill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B1A2B" />
            <stop offset="30%" stopColor="#722F37" />
            <stop offset="100%" stopColor="#4A1520" />
          </linearGradient>
          {/* Glass reflection */}
          <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>

        {/* Wine fill with gradient */}
        <rect
          x="0"
          y={fillY}
          width="32"
          height={fillHeight}
          fill="url(#wine-fill-grad)"
          clipPath="url(#wine-bowl-clip)"
          style={{ transition: 'y 0.15s ease, height 0.15s ease' }}
        />

        {/* Wine surface line (meniscus) */}
        {scrollProgress > 5 && (
          <ellipse
            cx="16"
            cy={fillY + 1}
            rx={Math.min(12, 4 + scrollProgress * 0.08)}
            ry="1.5"
            fill="#9B2335"
            clipPath="url(#wine-bowl-clip)"
            style={{ transition: 'cy 0.15s ease' }}
          />
        )}

        {/* Glass bowl — elegant curved shape */}
        <path
          d="M 5 4 Q 2 6 2 12 Q 2 22 6 28 Q 9 33 12 36 L 13 38 L 19 38 L 20 36 Q 23 33 26 28 Q 30 22 30 12 Q 30 6 27 4"
          stroke="#C5A55A"
          strokeWidth={0.8}
          fill="none"
        />

        {/* Glass rim */}
        <path
          d="M 5 4 Q 16 2 27 4"
          stroke="#C5A55A"
          strokeWidth={0.8}
          fill="none"
        />

        {/* Glass reflection highlight */}
        <path
          d="M 7 6 Q 5 10 5 16 Q 5 22 7 26"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.6}
          fill="none"
        />

        {/* Stem — thin and elegant */}
        <line x1={16} y1={38} x2={16} y2={48} stroke="#C5A55A" strokeWidth={0.8} />

        {/* Base — curved foot */}
        <path
          d="M 9 48 Q 12 50 16 50 Q 20 50 23 48"
          stroke="#C5A55A"
          strokeWidth={0.8}
          fill="none"
        />
        <line x1={9} y1={48} x2={23} y2={48} stroke="#C5A55A" strokeWidth={0.6} />
      </svg>

      {labelVisible && (
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '9px',
            color: '#b8b0a3',
            textAlign: 'center',
            marginTop: '2px',
            letterSpacing: '0.05em',
          }}
        >
          {getLabel(scrollProgress)}
        </span>
      )}
    </div>
  )
}
