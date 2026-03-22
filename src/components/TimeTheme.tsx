'use client'

import { useEffect, useState } from 'react'

type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night'

function getTimeSlot(hour: number): TimeSlot {
  if (hour >= 6 && hour <= 11) return 'morning'
  if (hour >= 12 && hour <= 17) return 'afternoon'
  if (hour >= 18 && hour <= 22) return 'evening'
  return 'night'
}

const greetings: Record<TimeSlot, string | null> = {
  morning: 'Za wcześnie? Nigdy za wcześnie na filozofię.',
  afternoon: null,
  evening: 'Idealna pora.',
  night: 'Nocna biesiada. Najlepsza biesiada.',
}

const classMap: Record<TimeSlot, string | null> = {
  morning: 'time-morning',
  afternoon: 'time-afternoon',
  evening: 'time-evening',
  night: 'time-night',
}

export default function TimeTheme() {
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hour = new Date().getHours()
    const slot = getTimeSlot(hour)
    setTimeSlot(slot)

    const cls = classMap[slot]
    if (cls) {
      document.documentElement.classList.add(cls)
    }

    return () => {
      // Clean up all time classes on unmount
      Object.values(classMap).forEach((c) => {
        if (c) document.documentElement.classList.remove(c)
      })
    }
  }, [])

  if (!timeSlot) return null

  const greeting = greetings[timeSlot]
  if (!greeting) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-30 max-w-[200px] text-right font-mono text-xs"
      style={{ color: 'rgba(184,176,163,0.3)' }}
    >
      {greeting}
    </div>
  )
}
