'use client';
import { useEffect } from 'react';
import { create } from 'zustand';

// ── Global scene state (zustand for performance - no re-render cascade) ──
export const useSceneStore = create((set) => ({
  // Preloader
  isPreloaderDone: false,
  setPreloaderDone: () => set({ isPreloaderDone: true }),

  // Active section tracking
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),

  // Mouse tracking (normalized -1 to 1)
  mouseNorm: { x: 0, y: 0 },
  setMouseNorm: (pos) => set({ mouseNorm: pos }),

  // Raw mouse position (pixels)
  mouseRaw: { x: 0, y: 0 },
  setMouseRaw: (pos) => set({ mouseRaw: pos }),

  // Scroll progress (0 to 1)
  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),

  // Device capability tier
  deviceTier: 'high',
  setDeviceTier: (tier) => set({ deviceTier: tier }),
}));

// ── Component that attaches global mouse/scroll listeners ──
export function SceneTracker() {
  const setMouseNorm = useSceneStore((s) => s.setMouseNorm);
  const setMouseRaw = useSceneStore((s) => s.setMouseRaw);
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);

  useEffect(() => {
    let rafId;
    let latestMouse = { x: 0, y: 0 };
    let ticking = false;

    const handleMouse = (e) => {
      latestMouse = { x: e.clientX, y: e.clientY };
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          setMouseRaw(latestMouse);
          setMouseNorm({
            x: (latestMouse.x / window.innerWidth) * 2 - 1,
            y: -(latestMouse.y / window.innerHeight) * 2 + 1,
          });
          ticking = false;
        });
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Directly update the DOM scroll progress bar for performance
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = `${progress * 100}%`;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [setMouseNorm, setMouseRaw, setScrollProgress]);

  return null;
}
