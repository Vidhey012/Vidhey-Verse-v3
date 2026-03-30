'use client'

import { useEffect, useRef } from 'react'

export function useScrollVelocity() {
  const velocity = useRef(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(0)
  
  useEffect(() => {
    // Only access window within useEffect
    lastScrollY.current = window.scrollY
    lastTime.current = Date.now()

    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(now - lastTime.current, 1) // Prevent division by zero
      const dy = window.scrollY - lastScrollY.current
      
      // Pixels per millisecond
      velocity.current = Math.abs(dy / dt)
      
      lastScrollY.current = window.scrollY
      lastTime.current = now
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return velocity
}
