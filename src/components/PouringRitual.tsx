'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Drop {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

let dropId = 0;

export default function PouringRitual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPouring, setIsPouring] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showAh, setShowAh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ahTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spawnDrop = useCallback((x: number, y: number) => {
    const now = Date.now();
    setDrops(prev => {
      // Remove drops older than 3s
      const fresh = prev.filter(d => now - d.createdAt < 3000);
      return [...fresh, {
        id: dropId++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: 6 + Math.random() * 10,
        createdAt: now,
      }].slice(-40);
    });
  }, []);

  const startPouring = useCallback((x: number, y: number) => {
    setIsPouring(true);
    setCursorPos({ x, y });
    if (ahTimerRef.current) clearTimeout(ahTimerRef.current);
    setShowAh(false);
  }, []);

  const stopPouring = useCallback(() => {
    setIsPouring(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    ahTimerRef.current = setTimeout(() => {
      setShowAh(true);
      setTimeout(() => setShowAh(false), 1800);
    }, 100);
  }, []);

  const updatePos = useCallback((x: number, y: number) => {
    setCursorPos({ x, y });
    if (isPouring) spawnDrop(x, y);
  }, [isPouring, spawnDrop]);

  // Mouse events
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    startPouring(e.clientX - rect.left, e.clientY - rect.top);
  }, [startPouring]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    updatePos(e.clientX - rect.left, e.clientY - rect.top);
  }, [updatePos]);

  // Touch events
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = e.touches[0];
    startPouring(t.clientX - rect.left, t.clientY - rect.top);
  }, [startPouring]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const t = e.touches[0];
    updatePos(t.clientX - rect.left, t.clientY - rect.top);
    e.preventDefault();
  }, [updatePos]);

  // Spawn drops on interval while pouring
  useEffect(() => {
    if (isPouring) {
      intervalRef.current = setInterval(() => {
        spawnDrop(cursorPos.x, cursorPos.y);
      }, 60);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPouring, cursorPos, spawnDrop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopPouring}
      onMouseLeave={stopPouring}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={stopPouring}
      style={{ cursor: isPouring ? 'crosshair' : 'default', touchAction: 'none' }}
    >
      {/* Drops */}
      <AnimatePresence>
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: drop.x - drop.size / 2,
              top: drop.y - drop.size / 2,
              width: drop.size,
              height: drop.size,
              background: 'radial-gradient(circle at 35% 35%, #9B2335, #3D0C11)',
              boxShadow: '0 0 6px rgba(139,21,56,0.4)',
            }}
            initial={{ opacity: 0.9, scale: 0.3 }}
            animate={{ opacity: 0, scale: 1.4, y: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Pour stream following cursor */}
      <AnimatePresence>
        {isPouring && (
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: cursorPos.x - 3, top: cursorPos.y - 20 }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div style={{
              width: '6px',
              height: '28px',
              background: 'linear-gradient(180deg, rgba(139,21,56,0.8) 0%, rgba(61,12,17,0.4) 100%)',
              borderRadius: '3px',
              transformOrigin: 'top center',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Ah." satisfaction */}
      <AnimatePresence>
        {showAh && (
          <motion.p
            className="absolute font-serif italic text-gold text-2xl pointer-events-none select-none"
            style={{ left: cursorPos.x + 16, top: cursorPos.y - 20 }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.8, y: -8 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Ah.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
