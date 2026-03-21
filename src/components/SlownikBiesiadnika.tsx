'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Entry {
  term: string;
  phonetic: string;
  definition: string;
  latin?: string;
}

const ENTRIES: Entry[] = [
  {
    term: 'Korkociąg',
    phonetic: 'kor-ko-ciąg',
    definition: 'Klucz do bramy między dniem roboczym a wieczorem filozoficznym. Wynalazek ważniejszy od koła, choć koło też się przydaje — do toczenia beczek.',
    latin: 'clavis vini',
  },
  {
    term: 'Kieliszek',
    phonetic: 'kie-li-szek',
    definition: 'Naczynie o pojemności odwrotnie proporcjonalnej do powagi rozmowy. Im poważniejsza dyskusja, tym mniejszy kieliszek — i tym częściej napełniany.',
    latin: 'calix philosophicus',
  },
  {
    term: 'Dolewanie',
    phonetic: 'do-le-wa-nie',
    definition: 'Gest hojności, miłości i dobrego wychowania. Odmówić dolewania to jak zamknąć drzwi przed filozofią. Dosłownie.',
    latin: 'actus generositatis',
  },
  {
    term: 'Reszta w butelce',
    phonetic: 'resz-ta w bu-tel-ce',
    definition: 'Zjawisko teoretyczne. Odnotowane w literaturze, nigdy potwierdzone w praktyce przez żadnego poważnego biesiadnika.',
    latin: 'vinum residuum (hypotheticum)',
  },
  {
    term: 'Sommelier',
    phonetic: 'so-me-lie',
    definition: 'Człowiek, który potrafi powiedzieć o winie rzeczy, których nie rozumiesz, ale brzmią przekonująco. Szanuj go. On wie, gdzie jest piwnica.',
    latin: 'magister vini',
  },
  {
    term: 'Trzeźwość',
    phonetic: 'trzeź-wość',
    definition: 'Stan przejściowy między jednym a drugim kieliszkiem. Filozoficznie nieproduktywny, choć przydatny przy parkowaniu.',
    latin: 'sobrietas temporalis',
  },
  {
    term: 'Biesiada',
    phonetic: 'bie-sia-da',
    definition: 'Zgromadzenie ludzi połączonych wspólnym celem: wznoszeniem toastów, wymianą mądrości i stopniowym zapominaniem, o czym zaczęli rozmawiać.',
    latin: 'convivium perpetuum',
  },
  {
    term: 'Karton wina',
    phonetic: 'kar-ton wi-na',
    definition: 'Forma demokratyczna. Wino w karciku to wino dla ludu. Wyrocznia nie ocenia. Wyrocznia dolewa.',
    latin: 'vinum populare',
  },
  {
    term: 'Kac',
    phonetic: 'kac',
    definition: 'Filozofia dnia następnego. Ból głowy to jedynie dowód na to, że poprzedni wieczór był wystarczająco intensywny intelektualnie.',
    latin: 'crapula philosophica',
  },
  {
    term: 'Toast',
    phonetic: 'toast',
    definition: 'Krótka forma literacka. Musi zawierać: kieliszek, odbiorcę, powód i przynajmniej jedną osobę, która tego słucha. Reszta to improwizacja.',
    latin: 'propinatio solemnis',
  },
];

export default function SlownikBiesiadnika() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
    setRandomIndex(null);
  }, []);

  const pickRandom = useCallback(() => {
    const i = Math.floor(Math.random() * ENTRIES.length);
    setOpenIndex(i);
    setRandomIndex(i);
  }, []);

  return (
    <section className="py-28 px-6 bg-transparent relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 wine-stain pointer-events-none"
        style={{ width: '400px', height: '400px' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-xs text-gold-dim tracking-[0.5em] uppercase mb-3 opacity-60">
            Kompendium wiedzy biesiadnej
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4 gold-shimmer">
            Słownik Biesiadnika
          </h2>
          <div className="gold-divider-wide" />
          <p className="font-serif text-cream-dim italic mt-6 opacity-60">
            Definicje niezbędne każdemu filozofowi przy stole.
          </p>

          <button
            onClick={pickRandom}
            className="mt-6 font-sans text-xs tracking-[0.3em] uppercase text-gold
              border border-gold/30 px-6 py-2 hover:border-gold/70 hover:bg-gold/5
              transition-all duration-300"
          >
            Losuj hasło
          </button>
        </motion.div>

        {/* Entries */}
        <div className="space-y-px">
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left group"
              >
                <div className={`flex items-center justify-between py-5 px-4 border-b transition-colors duration-200
                  ${openIndex === i
                    ? 'border-gold/40 bg-wine-deep/30'
                    : 'border-gold/10 hover:border-gold/25 hover:bg-wine-deep/10'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className={`font-serif text-xl transition-colors duration-200
                      ${openIndex === i ? 'text-gold' : 'text-cream group-hover:text-gold'}`}>
                      {entry.term}
                    </span>
                    <span className="font-sans text-xs text-cream-dim opacity-40 italic hidden md:inline">
                      /{entry.phonetic}/
                    </span>
                    {entry.latin && (
                      <span className="font-serif text-xs text-gold-dim opacity-40 italic hidden md:inline">
                        {entry.latin}
                      </span>
                    )}
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-gold opacity-50 text-xl font-light ml-4 flex-shrink-0"
                  >
                    +
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-6 bg-wine-deep/20 border-b border-gold/10">
                      <p className="font-serif italic text-cream text-lg leading-relaxed">
                        {entry.definition}
                      </p>
                      {randomIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-sans text-xs text-gold-dim opacity-50 mt-3 tracking-wider uppercase"
                        >
                          — wylosowane przez Wyrocznię
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
