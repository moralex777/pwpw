import { filozofia } from "@/lib/content";
import { Card } from "@/components/ui/card";

export default function FilozofiaSection() {
  return (
    <section id="filozofia" className="bg-wine-dark py-24 md:py-32 px-6">
      <h2 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
        Filozofia
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filozofia.map((item, i) => (
          <Card
            key={i}
            className="relative overflow-hidden aspect-[4/5] rounded-xl border-0 ring-0 p-0 gap-0"
          >
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/filo-${i + 1}.webp`}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Roman Numeral */}
            <span className="font-serif text-5xl md:text-6xl text-gold/30 absolute top-4 left-6 z-10">
              {item.number}
            </span>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <h3 className="font-serif text-2xl text-gold mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-cream/90 leading-relaxed">
                {item.text}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
