import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const currentScroll = window.scrollY;
      
      const scrollPercentage = (currentScroll / documentHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercentage)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return createPortal(
    <div className="fixed top-0 right-0 w-[3px] h-full bg-[var(--color-deep)] z-[9900]">
      <div 
        className="w-full bg-[var(--color-cyber-blue)] transition-[height] duration-100 ease-out glow-box"
        style={{ 
          height: `${progress}%`,
          boxShadow: '0 0 10px var(--color-cyber-blue)'
        }}
      />
    </div>,
    document.body
  );
};
