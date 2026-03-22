"use client";

import { useState, useEffect, useCallback } from "react";

export default function ToastSection() {
  const [showZdrowie, setShowZdrowie] = useState(false);
  const [count, setCount] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  // SSR guard: read localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pwpw-toast-count");
      if (stored) setCount(parseInt(stored, 10));
    }
  }, []);

  const handleToast = useCallback(() => {
    if (cooldown) return;

    // Play sound
    new Audio("/audio/clink.mp3").play().catch(() => {});

    // Show "Zdrowie!" text
    setShowZdrowie(true);
    setCooldown(true);

    // Increment counter
    const newCount = count + 1;
    setCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("pwpw-toast-count", String(newCount));
    }

    // Reset after 2s
    setTimeout(() => {
      setShowZdrowie(false);
      setCooldown(false);
    }, 2000);
  }, [cooldown, count]);

  return (
    <section
      id="toast"
      className="min-h-[80vh] relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/toast.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="font-serif text-5xl md:text-6xl text-gold mb-8">
          Na Zdrowie!
        </h2>

        <button
          onClick={handleToast}
          disabled={cooldown}
          className="border border-gold/40 text-gold font-serif text-xl px-10 py-4 rounded-sm hover:bg-gold/10 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Wznieś toast
        </button>

        {/* "Zdrowie!" text with CSS fade-in */}
        {showZdrowie && (
          <p className="font-serif text-3xl text-gold mt-6 fade-in">
            Zdrowie!
          </p>
        )}

        {/* Counter */}
        <p className="font-mono text-xs text-cream-dim mt-8">
          Wzniesiono {count} toastów
        </p>

        {/* Instruction */}
        <p className="font-mono text-xs text-cream-dim/60 mt-4">
          Kliknij, aby wznieść toast
        </p>
      </div>
    </section>
  );
}
