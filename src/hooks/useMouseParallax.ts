import { useState, useEffect } from 'react';
import { MathUtils } from 'three';

export const useMouseParallax = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    
    // Check if device supports DeviceOrientation (mobile)
    if (window.matchMedia("(pointer: coarse)").matches && window.DeviceOrientationEvent) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma === null || e.beta === null) return;
        
        // Portrait mode
        let x = e.gamma; // In degree in the range [-90,90]
        let y = e.beta; // In degree in the range [-180,180]
        
        // Limit
        x = Math.max(-45, Math.min(45, x));
        y = Math.max(-45, Math.min(45, y - 45)); // assume holding phone at 45 deg

        targetX = x / 45; // Normalize to -1 to 1
        targetY = y / 45; // Normalize to -1 to 1
      };
      
      window.addEventListener('deviceorientation', handleOrientation);

      const updateLerp = () => {
        setMousePos(prev => ({
          x: MathUtils.lerp(prev.x, targetX, 0.05),
          y: MathUtils.lerp(prev.y, targetY, 0.05)
        }));
        requestAnimationFrame(updateLerp);
      };
      const raf = requestAnimationFrame(updateLerp);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
        cancelAnimationFrame(raf);
      };
    } else {
      const handleMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const updateLerp = () => {
        setMousePos(prev => ({
          x: MathUtils.lerp(prev.x, targetX, 0.05),
          y: MathUtils.lerp(prev.y, targetY, 0.05)
        }));
        requestAnimationFrame(updateLerp);
      };
      const raf = requestAnimationFrame(updateLerp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(raf);
      };
    }
  }, []);

  return mousePos;
};
