export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image — Wine Cellar */}
      <img
        src="/images/hero.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="font-serif text-gold text-center leading-tight">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">Polewaj. Wypij.</span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">Polewaj. Wypij.</span>
        </h1>

        <p className="font-serif italic text-2xl md:text-3xl text-cream mt-6">
          In Vino Veritas
        </p>

        <p className="font-mono text-sm md:text-base text-cream-dim tracking-[0.3em] uppercase mt-2">
          ERGO BIBAMUS!
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="scroll-chevron w-4 h-4 border-b-2 border-r-2 border-gold" />
      </div>
    </section>
  );
}
