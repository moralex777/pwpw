import { geneza } from '@/lib/content'
import HeroSection from '@/components/HeroSection'
import RitualSection from '@/components/RitualSection'
import QuotesSection from '@/components/QuotesSection'
import FilozofiaSection from '@/components/FilozofiaSection'
import ToastSection from '@/components/ToastSection'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Geneza Section */}
      <section id="geneza" className="py-32 px-6 bg-wine-deep">
        <div className="max-w-4xl mx-auto">
          <div className="gold-divider mb-16" />

          <div className="space-y-8 text-cream leading-relaxed text-lg md:text-xl">
            {geneza.split('\n\n').map((paragraph, i) => (
              <p key={i} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="wine-line mt-16" />
          <div className="gold-divider mt-8" />
        </div>
      </section>

      <RitualSection />
      <QuotesSection />
      <FilozofiaSection />
      <ToastSection />

      {/* Footer */}
      <footer className="py-16 px-6 bg-background border-t border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-gold mb-6">
            Polewaj. Wypij. Polewaj. Wypij.
          </p>
          <p className="text-sm text-cream-dim mb-4">
            Strona humorystyczna. Pij odpowiedzialnie.
          </p>
          <p className="text-xs text-cream-dim">
            &copy; 2026
          </p>
        </div>
      </footer>
    </>
  )
}
