'use client';
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quotes, filozofia } from '@/lib/content';

const ORACLE_RESPONSES = [
  (q: string) => `Pytasz o ${q}? Polewaj. Wypij. Polewaj. Wypij. Oto cała odpowiedź.`,
  (q: string) => `Wyrocznia milczy przez chwilę. Potem mówi: "${q}" to tylko słowa. Wino to prawda.`,
  (q: string) => `In vino veritas. W kwestii "${q}" — szczególnie.`,
  (q: string) => `Wielcy filozofowie pytali o ${q}. Żaden nie znalazł odpowiedzi na trzeźwo.`,
  (q: string) => `Kielich pierwszy mówi: nie wiem. Kielich drugi mówi: może. Kielich trzeci mówi: ${q}? Oczywiście.`,
  (q: string) => `Horacy zapytany o ${q} odpowiedział: Nunc est bibendum. My dodajemy: i potem jeszcze raz.`,
  (q: string) => `Odpowiedź na "${q}" leży na dnie kieliszka. Trzeba dolać, żeby ją znaleźć.`,
  (q: string) => `Wyrocznia konsultuje się z Dionizosem. Dionizos wzrusza ramionami i nalewa. To znak.`,
  (q: string) => `${q}? Ergo bibamus. Zawsze ergo bibamus.`,
  (q: string) => `Mądrość w tej kwestii przychodzi po trzecim kieliszku. Jesteś przy którym?`,
];

const PHILOSOPHY_FRAGMENTS = [
  'Polewaj. Wypij. Polewaj. Wypij.',
  'Ad infinitum, ad vinum.',
  'Kielich pusty jest obrazą dla towarzystwa.',
  'Wino nie znosi wahania.',
  'Biesiada nie ma końca, ma tylko przerwy na dolewanie.',
];

function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback((t: string) => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(t.slice(0, i));
      if (i < t.length) {
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    timerRef.current = setTimeout(tick, speed);
  }, [speed]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayed('');
    setDone(false);
  }, []);

  return { displayed, done, start, reset };
}

export default function WyroczniaWiniarska() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { displayed, done, start, reset } = useTypewriter(response, 22);

  const askOracle = useCallback(() => {
    if (!question.trim() || isThinking) return;
    setIsThinking(true);
    setHasAnswered(false);
    reset();

    const q = question.trim().replace(/[?!.]+$/, '').toLowerCase();
    const idx = Math.floor(Math.random() * ORACLE_RESPONSES.length);
    const answer = ORACLE_RESPONSES[idx](q);
    const suffix = PHILOSOPHY_FRAGMENTS[Math.floor(Math.random() * PHILOSOPHY_FRAGMENTS.length)];
    const full = `${answer} — ${suffix}`;

    setTimeout(() => {
      setResponse(full);
      setIsThinking(false);
      setHasAnswered(true);
      start(full);
    }, 1800);
  }, [question, isThinking, reset, start]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') askOracle();
  }, [askOracle]);

  return (
    <section className="py-28 px-6 bg-wine-dark relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="wine-stain" style={{ width: '600px', height: '600px', opacity: 0.07 }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-xs text-gold-dim tracking-[0.5em] uppercase mb-3 opacity-60">
            Starożytna mądrość biesiadna
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4 gold-shimmer">
            Wyrocznia Winiarska
          </h2>
          <div className="gold-divider-wide" />
          <p className="font-serif text-cream-dim italic mt-6 text-lg opacity-70">
            Zadaj pytanie. Wyrocznia odpowie.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Czego szukasz w życiu?"
            maxLength={120}
            className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none
              font-serif text-cream text-xl py-4 px-2 placeholder-cream-dim/30
              transition-colors duration-300"
            style={{ caretColor: '#C5A55A' }}
          />
          <button
            onClick={askOracle}
            disabled={!question.trim() || isThinking}
            className="absolute right-2 top-1/2 -translate-y-1/2 font-sans text-xs tracking-[0.3em]
              uppercase text-gold opacity-60 hover:opacity-100 transition-opacity duration-200
              disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Zapytaj
          </button>
        </motion.div>

        {/* Oracle response */}
        <div className="mt-12 min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isThinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2 items-center"
              >
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gold"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            )}

            {hasAnswered && !isThinking && (
              <motion.div
                key="answer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="principle-frame p-8 rounded-sm relative"
              >
                {/* Corner ornaments */}
                <span className="absolute top-3 left-3 text-gold opacity-25 text-sm select-none font-serif">✦</span>
                <span className="absolute top-3 right-3 text-gold opacity-25 text-sm select-none font-serif">✦</span>
                <span className="absolute bottom-3 left-3 text-gold opacity-25 text-sm select-none font-serif">✦</span>
                <span className="absolute bottom-3 right-3 text-gold opacity-25 text-sm select-none font-serif">✦</span>

                <p className={`font-serif italic text-cream text-xl leading-relaxed text-center ${!done ? 'cursor-blink' : ''}`}>
                  &ldquo;{displayed}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
