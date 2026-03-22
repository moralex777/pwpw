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

  // The bowl path spans roughly y=8 to y=42 (34 units).
  // Fill rect starts from the bottom of the bowl, its height proportional to progress.
  const fillHeight = (scrollProgress / 100) * 34
  const fillY = 42 - fillHeight

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
        width={36}
        height={60}
        viewBox="0 0 36 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="wine-bowl-clip">
            <path d="M 6 8 Q 4 20 8 30 L 14 42 L 22 42 L 28 30 Q 32 20 30 8 Z" />
          </clipPath>
        </defs>

        {/* Wine fill */}
        <rect
          x="0"
          y={fillY}
          width="36"
          height={fillHeight}
          fill="#722F37"
          clipPath="url(#wine-bowl-clip)"
          style={{ transition: 'y 0.15s ease, height 0.15s ease' }}
        />

        {/* Glass bowl outline */}
        <path
          d="M 6 8 Q 4 20 8 30 L 14 42 L 22 42 L 28 30 Q 32 20 30 8 Z"
          stroke="#C5A55A"
          strokeWidth={1}
          fill="none"
        />

        {/* Stem */}
        <line x1={18} y1={42} x2={18} y2={52} stroke="#C5A55A" strokeWidth={1} />

        {/* Base */}
        <line x1={12} y1={52} x2={24} y2={52} stroke="#C5A55A" strokeWidth={1} />
      </svg>

      {labelVisible && (
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#b8b0a3',
            textAlign: 'center',
            marginTop: '2px',
            transition: 'opacity 0.3s ease',
          }}
        >
          {getLabel(scrollProgress)}
        </span>
      )}
    </div>
  )
}
