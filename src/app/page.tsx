import { geneza } from '@/lib/content';
import HeroSection from '@/components/HeroSection';
import RitualSection from '@/components/RitualSection';
import QuotesSection from '@/components/QuotesSection';
import FilozofiaSection from '@/components/FilozofiaSection';
import ToastSection from '@/components/ToastSection';
import WyroczniaWiniarska from '@/components/WyroczniaWiniarska';
import SlownikBiesiadnika from '@/components/SlownikBiesiadnika';
import ScrollNavDots from '@/components/ScrollNavDots';
import SiteFooter from '@/components/SiteFooter';

function SectionDivider({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="h-16 w-full"
      style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    />
  );
}

export default function Home() {
  const paragraphs = geneza.split('\n\n');

  return (
    <>
      <ScrollNavDots />

      {/* Hero */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Geneza */}
      <section id="geneza" className="py-32 px-6 bg-wine-deep relative overflow-hidden">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 wine-stain pointer-events-none"
          style={{ width: '400px', height: '400px' }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="gold-divider mb-16" />
          <div className="space-y-8 text-cream leading-relaxed text-lg md:text-xl">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`font-serif ${i === 0 ? 'drop-cap' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="wine-line mt-16" />
          <div className="gold-divider mt-8" />
        </div>
      </section>

      <SectionDivider from="#3D0C11" to="#0a0505" />

      {/* Ritual */}
      <section id="rytuał">
        <RitualSection />
      </section>

      <SectionDivider from="#0a0505" to="#0a0505" />

      {/* Quotes */}
      <section id="glosy">
        <QuotesSection />
      </section>

      <SectionDivider from="#0a0505" to="#1a0a0d" />

      {/* Filozofia */}
      <section id="filozofia">
        <FilozofiaSection />
      </section>

      <SectionDivider from="#1a0a0d" to="#0a0505" />

      {/* Wyrocznia */}
      <section id="wyrocznia">
        <WyroczniaWiniarska />
      </section>

      <SectionDivider from="#1a0a0d" to="#0a0505" />

      {/* Slownik */}
      <section id="slownik">
        <SlownikBiesiadnika />
      </section>

      <SectionDivider from="#0a0505" to="#3D0C11" />

      {/* Toast */}
      <section id="toast">
        <ToastSection />
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
