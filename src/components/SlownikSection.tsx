"use client";

import { slownik } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SlownikSection() {
  return (
    <section id="slownik" className="bg-background py-24 md:py-32 px-6">
      <h2 className="font-serif text-4xl md:text-5xl text-gold text-center mb-4">
        Słownik Biesiadnika
      </h2>
      <p className="font-mono text-xs text-cream-dim tracking-widest uppercase text-center mb-16">
        Leksykon niezbędny
      </p>

      <Accordion className="max-w-2xl mx-auto">
        {slownik.map((entry) => (
          <AccordionItem key={entry.term} value={entry.term}>
            <AccordionTrigger className="font-serif text-lg text-cream hover:text-gold transition-colors">
              <span>{entry.term}</span>
              <span className="font-mono text-xs text-gold-dim ml-2 hidden md:inline">
                ({entry.latin})
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border-l-2 border-gold/20 pl-4 pb-2">
                <p className="font-mono text-xs text-cream-dim mb-2">
                  /{entry.phonetic}/ — {entry.latin}
                </p>
                <p className="text-cream/90 leading-relaxed">
                  {entry.definition}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
