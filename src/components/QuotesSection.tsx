import { quotes } from "@/lib/content";
import { Card } from "@/components/ui/card";

export default function QuotesSection() {
  return (
    <section id="glosy" className="py-24 md:py-32 px-6 relative">
      {/* Fixed background image with dark overlay */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/quotes.webp')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl text-gold text-center mb-4">
          Głosy Winnicy
        </h2>
        <p className="font-mono text-xs text-cream-dim tracking-widest uppercase text-center mb-16">
          Voices of the Vineyard
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quotes.map((quote, i) => (
            <Card
              key={i}
              className="bg-wine-deep/60 border-gold/10 backdrop-blur-sm p-6 relative"
            >
              {/* Decorative quotation mark */}
              <span className="absolute top-3 left-4 font-serif text-5xl text-gold/15 leading-none select-none">
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="font-serif italic text-base md:text-lg text-cream leading-relaxed mt-4">
                {quote.text}
              </p>

              {/* Author */}
              <p className="font-sans text-sm text-gold font-medium mt-4">
                &mdash; {quote.author}
              </p>

              {/* Source */}
              <p className="font-mono text-xs text-cream-dim mt-1">
                {quote.source}
              </p>

              {/* Original translation if exists */}
              {quote.original && (
                <p className="font-mono text-xs text-cream-dim/60 italic mt-2">
                  {quote.original}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
