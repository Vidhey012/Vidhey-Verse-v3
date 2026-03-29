import React, { useEffect, useRef } from 'react';

/* Magnetic glowing orb cursor with 80ms lerp lag */
export const Cursor: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let targetX = -100, targetY = -100;
    let currentX = -100, currentY = -100;
    let rafId: number;
    const LERP = 0.12; // ~80ms lag

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onEnterLink = () => {
      orbRef.current?.classList.add('cursor-hover');
    };
    const onLeaveLink = () => {
      orbRef.current?.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', onMove);

    // Attach hover listeners to interactive elements dynamically
    const updateListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    updateListeners();
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentX - 20}px, ${currentY - 20}px)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${currentX - 30}px, ${currentY - 30}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-orb {
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,200,255,0.6) 0%, transparent 70%);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: screen;
          transition: width 0.25s ease, height 0.25s ease, background 0.25s ease;
        }
        .cursor-halo {
          position: fixed;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(0,200,255,0.5);
          pointer-events: none;
          z-index: 99998;
          transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
        }
        .cursor-orb.cursor-hover {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(0,200,255,0.2) 70%);
        }
        @media (pointer: coarse) {
          .cursor-orb, .cursor-halo { display: none; }
          * { cursor: auto !important; }
        }
      `}</style>
      <div ref={orbRef} className="cursor-orb" />
      <div ref={haloRef} className="cursor-halo" />
    </>
  );
};
