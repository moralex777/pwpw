'use client'

import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Początek' },
  { id: 'geneza', label: 'Geneza' },
  { id: 'filozofia', label: 'Filozofia' },
  { id: 'glosy', label: 'Głosy Winnicy' },
  { id: 'toast', label: 'Wznieś toast!' },
]

export default function NavMenu() {
  const [open, setOpen] = useState(false)

  function scrollTo(id: string) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed top-4 right-4 z-50 md:top-6 md:right-6">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-background/80 backdrop-blur-sm rounded-sm border border-gold/20 transition-colors hover:border-gold/40"
        aria-label="Menu"
      >
        <span
          className="block w-5 h-[1.5px] bg-gold transition-all duration-300"
          style={{
            transform: open ? 'rotate(45deg) translateY(6.5px)' : 'none',
          }}
        />
        <span
          className="block w-5 h-[1.5px] bg-gold transition-all duration-300"
          style={{
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-[1.5px] bg-gold transition-all duration-300"
          style={{
            transform: open ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
          }}
        />
      </button>

      {/* Dropdown */}
      <div
        className="absolute top-12 right-0 bg-background/95 backdrop-blur-md border border-gold/15 rounded-sm overflow-hidden transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: open ? 'auto' : 'none',
          minWidth: '180px',
        }}
      >
        {NAV_ITEMS.map((item, i) => {
          const isLast = i === NAV_ITEMS.length - 1
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left px-5 py-3 transition-colors ${
                isLast
                  ? 'font-serif text-gold border-t border-gold/10 hover:bg-gold/10'
                  : 'font-sans text-cream/80 hover:text-cream hover:bg-white/5'
              }`}
              style={{ fontSize: isLast ? '14px' : '13px' }}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
