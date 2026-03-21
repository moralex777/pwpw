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
      <HeroSection />

      {/* Geneza */}
      <section id="geneza" className="py-32 px-6 relative overflow-hidden">
        {/* Photorealistic vineyard background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/geneza-bg.jpg)',
            backgroundColor: '#0a0505',
          }}
        />
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.78)' }}
        />
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

      <SectionDivider from="rgba(10,5,5,0.95)" to="#0a0505" />

      {/* Ritual */}
      <section id="rytuał">
        <RitualSection />
      </section>

      <SectionDivider from="#0a0505" to="#0a0505" />

      {/* Quotes */}
      <section id="glosy" className="relative">
        {/* Photorealistic quotes background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/quotes-bg.jpg)',
            backgroundColor: '#0a0505',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.82)' }}
        />
        <div className="relative z-10">
          <QuotesSection />
        </div>
      </section>

      <SectionDivider from="rgba(10,5,5,0.95)" to="#1a0a0d" />

      {/* Filozofia */}
      <section id="filozofia" className="relative">
        {/* Photorealistic scriptorium background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/filozofia-bg.jpg)',
            backgroundColor: '#1a0a0d',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.80)' }}
        />
        <div className="relative z-10">
          <FilozofiaSection />
        </div>
      </section>

      <SectionDivider from="rgba(10,5,5,0.95)" to="#0a0505" />

      {/* Wyrocznia */}
      <section id="wyrocznia" className="relative">
        {/* Photorealistic oracle background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/oracle-bg.jpg)',
            backgroundColor: '#0a0505',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.80)' }}
        />
        <div className="relative z-10">
          <WyroczniaWiniarska />
        </div>
      </section>

      <SectionDivider from="rgba(10,5,5,0.95)" to="#0a0505" />

      {/* Slownik */}
      <section id="slownik" className="relative">
        {/* Filozofia bg reused for dictionary — dark library feel */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/filozofia-bg.jpg)',
            backgroundColor: '#0a0505',
            backgroundPositionY: '70%',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.83)' }}
        />
        <div className="relative z-10">
          <SlownikBiesiadnika />
        </div>
      </section>

      <SectionDivider from="rgba(10,5,5,0.95)" to="#3D0C11" />

      {/* Toast */}
      <section id="toast" className="relative">
        {/* Photorealistic clinking glasses background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/toast-bg.jpg)',
            backgroundColor: '#3D0C11',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,5,5,0.72)' }}
        />
        <div className="relative z-10">
          <ToastSection />
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
