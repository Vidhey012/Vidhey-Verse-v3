'use client'

import { useState, useEffect } from 'react'
import { getGPUTier } from 'detect-gpu'

export type RenderTier = 'full' | 'medium' | 'lite'

export function useGPUTier() {
  const [tier, setTier] = useState<RenderTier>('medium') // Default safe generic tier
  const [isDetected, setIsDetected] = useState(false)

  useEffect(() => {
    async function detectRenderTier() {
      try {
        const gpuTier = await getGPUTier()
        
        if (gpuTier.tier >= 3) setTier('full')         // Desktop GPU, flagship mobile
        else if (gpuTier.tier === 2) setTier('medium') // Mid-range, some mobile
        else setTier('lite')                           // Low-end, older devices
      } catch {
        setTier('lite') // Safe fallback
      } finally {
        setIsDetected(true)
      }
    }
    detectRenderTier()
  }, [])

  return { tier, isDetected }
}
