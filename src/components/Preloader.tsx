import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

/* ─────────────────────────────────────────────────────────
   Lightning Loader
   Sequence: 
   0.0s  Pure black void
   0.5s  Main lightning bolt (SVG) slices screen
   0.9s  Branch bolts + flickers
   1.4s  "VIDHEY" burns in char-by-char with sparks
   2.2s  Charge ring expands + shatters into site
   ───────────────────────────────────────────────────────── */

interface PreloaderProps {
  onComplete: () => void;
}

const CHARS = "VIDHEY";

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boltRef = useRef<SVGPathElement>(null);
  const branch1Ref = useRef<SVGPathElement>(null);
  const branch2Ref = useRef<SVGPathElement>(null);
  const branch3Ref = useRef<SVGPathElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Phase 1 — black void (0.5s)
    tl.set(containerRef.current, { opacity: 1 });

    // Phase 2 — main bolt (0.5s)
    tl.set(boltRef.current, { strokeDashoffset: 600 }, 0.5);
    tl.to(boltRef.current, {
      strokeDashoffset: 0,
      duration: 0.38,
      ease: 'power2.out',
    }, 0.5);

    // Flash
    tl.to(flashRef.current, { opacity: 1, duration: 0.04 }, 0.65);
    tl.to(flashRef.current, { opacity: 0, duration: 0.04 }, 0.69);
    tl.to(flashRef.current, { opacity: 0.6, duration: 0.04 }, 0.74);
    tl.to(flashRef.current, { opacity: 0, duration: 0.04 }, 0.78);

    // Phase 3 — branch bolts (0.9s)
    tl.set([branch1Ref.current, branch2Ref.current, branch3Ref.current], { opacity: 0 }, 0.9);
    tl.to([branch1Ref.current, branch2Ref.current, branch3Ref.current], {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.06,
      ease: 'power1.out',
    }, 0.9);

    // Phase 4 — VIDHEY burns in (1.4s)
    tl.call(() => setShowText(true), [], 1.4);
    CHARS.split('').forEach((_, i) => {
      tl.call(() => setVisibleChars(i + 1), [], 1.4 + i * 0.14);
    });

    // Phase 5 — ring expands + site fades in (2.2s)
    tl.to(ringRef.current, {
      scale: 5,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
    }, 2.2);
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete,
    }, 2.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#05070F' }}
    >
      {/* White flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: '#ffffff', opacity: 0, zIndex: 10 }}
      />

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-code text-xs text-[var(--color-text-dim)] border border-[rgba(0,200,255,0.2)] px-3 py-1.5 hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-all z-20"
        style={{ opacity: 0, animation: 'fadeIn 0.4s 0.8s ease forwards' }}
      >
        SKIP
      </button>
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>

      {/* Lightning SVG Canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: 5 }}
      >
        {/* Main bolt — top-left to bottom-right diagonal */}
        <path
          ref={boltRef}
          d="M 200 0 L 380 220 L 330 230 L 600 480 L 540 495 L 820 750 L 780 760 L 1050 900"
          fill="none"
          stroke="#00C8FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: 600,
            filter: 'drop-shadow(0 0 8px #00C8FF) drop-shadow(0 0 20px rgba(0,200,255,0.5))',
          }}
        />
        {/* Branches (purple) */}
        <path
          ref={branch1Ref}
          d="M 380 220 L 480 320 L 460 325 L 560 420"
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300,
            filter: 'drop-shadow(0 0 5px #A855F7)',
          }}
        />
        <path
          ref={branch2Ref}
          d="M 600 480 L 680 540 L 660 548 L 730 600"
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            filter: 'drop-shadow(0 0 5px #A855F7)',
          }}
        />
        <path
          ref={branch3Ref}
          d="M 820 750 L 900 800 L 880 808 L 950 850"
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            filter: 'drop-shadow(0 0 5px #A855F7)',
          }}
        />
      </svg>

      {/* VIDHEY burn-in text */}
      {showText && (
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex">
            {CHARS.split('').map((char, i) => (
              <span
                key={i}
                className={`font-display font-bold text-[clamp(4rem,12vw,9rem)] tracking-[0.25em] text-[var(--color-cyan)] char-burn ${i < visibleChars ? '' : 'invisible'}`}
                style={{
                  textShadow: '0 0 20px #00C8FF, 0 0 50px rgba(0,200,255,0.5)',
                  animationDelay: `${i * 0.14}s`,
                  animationFillMode: 'both',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Charge ring */}
      <div
        ref={ringRef}
        className="absolute w-40 h-40 rounded-full pointer-events-none z-5"
        style={{
          border: '2px solid #00C8FF',
          boxShadow: '0 0 30px #00C8FF, inset 0 0 30px rgba(0,200,255,0.2)',
          transform: 'scale(1)',
        }}
      />
    </div>
  );
};
