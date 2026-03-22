'use client';

import { useState, useEffect, useCallback } from 'react';

export default function CorkEntry() {
  const [show, setShow] = useState(false);
  const [popped, setPopped] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const opened = sessionStorage.getItem('pwpw-cork-opened');
    if (!opened) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handlePop = useCallback(() => {
    if (popped) return;
    setPopped(true);

    const audio = new Audio('/audio/cork-pop.mp3');
    audio.volume = 0.6;
    audio.play().catch(() => {});

    sessionStorage.setItem('pwpw-cork-opened', '1');

    setTimeout(() => {
      document.body.style.overflow = '';
      setRemoved(true);
    }, 800);
  }, [popped]);

  if (!show || removed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      style={{ backgroundColor: '#0a0505' }}
      onClick={handlePop}
    >
      {/* Cork */}
      <div
        className="flex flex-col items-center"
        style={{
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
          transform: popped ? 'translateY(-100vh)' : 'translateY(0)',
          opacity: popped ? 0 : 1,
        }}
      >
        {/* Cork body */}
        <div
          className="rounded-lg shadow-2xl"
          style={{
            width: 60,
            height: 100,
            background: 'linear-gradient(135deg, #8B6914 0%, #A0784C 25%, #6B4E1E 50%, #8B6914 75%, #A0784C 100%)',
            backgroundSize: '20px 20px',
            border: '1px solid rgba(139, 105, 20, 0.3)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        />

        {/* Text */}
        <p
          className="font-serif text-xl mt-8"
          style={{ color: '#C5A55A', letterSpacing: '0.15em' }}
        >
          Otwórz
        </p>
      </div>

      {/* Subtle instruction */}
      <p
        className="absolute bottom-8 font-mono text-xs"
        style={{
          color: 'rgba(184, 176, 163, 0.3)',
          transition: 'opacity 0.4s',
          opacity: popped ? 0 : 1,
        }}
      >
        kliknij
      </p>
    </div>
  );
}
