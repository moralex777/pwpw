'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero',      label: 'Początek' },
  { id: 'geneza',    label: 'Geneza' },
  { id: 'rytuał',    label: 'Rytuał' },
  { id: 'glosy',     label: 'Głosy Winnicy' },
  { id: 'filozofia', label: 'Filozofia' },
  { id: 'wyrocznia', label: 'Wyrocznia' },
  { id: 'slownik',   label: 'Słownik' },
  { id: 'toast',     label: 'Na Zdrowie' },
];

export default function ScrollNavDots() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.nav
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 items-center"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16 }}
      transition={{ duration: 0.4 }}
      aria-label="Nawigacja sekcji"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={label}
          title={label}
          className="group relative flex items-center justify-end gap-2"
        >
          {/* Tooltip */}
          <span className="absolute right-5 font-sans text-xs text-gold whitespace-nowrap
            opacity-0 group-hover:opacity-80 transition-opacity duration-200 pointer-events-none
            bg-background/80 px-2 py-1 rounded-sm border border-gold/20 backdrop-blur-sm">
            {label}
          </span>
          {/* Dot */}
          <div className={`nav-dot transition-all duration-300 ${active === id ? 'active' : ''}`} />
        </button>
      ))}
    </motion.nav>
  );
}
