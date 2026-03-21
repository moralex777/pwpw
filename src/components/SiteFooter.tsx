'use client';

const NAV_LINKS = [
  { label: 'Geneza',    id: 'geneza' },
  { label: 'Rytuał',   id: 'rytuał' },
  { label: 'Głosy',    id: 'glosy' },
  { label: 'Filozofia',id: 'filozofia' },
  { label: 'Wyrocznia',id: 'wyrocznia' },
  { label: 'Słownik',  id: 'slownik' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function SiteFooter() {
  return (
    <footer className="py-20 px-6 border-t border-gold/10 relative overflow-hidden" style={{ background: '#0a0505' }}>
      {/* Vine border top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C5A55A 20%, #B87333 50%, #C5A55A 80%, transparent)' }}
      />

      {/* Wine stain bg */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 wine-stain pointer-events-none"
        style={{ width: '300px', height: '300px', opacity: 0.06 }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="font-serif text-3xl md:text-4xl text-gold mb-6 gold-shimmer">
          Polewaj. Wypij. Polewaj. Wypij.
        </p>

        <div className="gold-divider-wide mb-8" />

        {/* CTA */}
        <button
          onClick={() => scrollTo('toast')}
          className="font-sans text-xs tracking-[0.4em] uppercase text-gold border border-gold/30
            px-8 py-3 mb-10 hover:border-gold/70 hover:bg-gold/5 transition-all duration-300"
        >
          Wznieś toast
        </button>

        {/* Nav links */}
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-sans text-xs tracking-widest uppercase text-cream-dim opacity-40
                hover:opacity-80 hover:text-gold transition-all duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-sm text-cream-dim mb-3 opacity-50">
          Strona humorystyczna. Pij odpowiedzialnie.
        </p>
        <p className="text-xs text-cream-dim opacity-30">
          &copy; MMXXVI
        </p>
      </div>
    </footer>
  );
}
