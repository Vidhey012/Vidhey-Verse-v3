'use client';
import { useState, useEffect } from 'react';

export function useDeviceCapability() {
  const [tier, setTier] = useState('high');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      const isTouch = 'ontouchstart' in window;
      const screenWidth = window.innerWidth;

      let gpuTier = 'high';
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
          if (renderer.includes('swiftshader') || renderer.includes('llvmpipe')) {
            gpuTier = 'low';
          } else if (renderer.includes('intel') && !renderer.includes('iris')) {
            gpuTier = 'medium';
          }
        }
      } else {
        gpuTier = 'low';
      }

      if (gpuTier === 'low' || isLowMemory) {
        setTier('low');
      } else if (isMobile || screenWidth < 768) {
        setTier('low');
      } else if (isTouch || screenWidth < 1024 || gpuTier === 'medium') {
        setTier('medium');
      } else {
        setTier('high');
      }

      canvas.remove();
    } catch (e) {
      setTier('medium');
    }
  }, []);

  return tier;
}
