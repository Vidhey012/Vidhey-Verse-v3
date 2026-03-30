'use client'

import { useEffect, useRef } from 'react'
import { AudioEngine } from '@/lib/audio'

export function TronCursor() {
  const orb = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const shockwave = useRef<HTMLDivElement>(null)
  
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    // Determine if on mobile/touch device. Cursor not needed there.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (orb.current) {
        orb.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }
    
    const onClick = (e: MouseEvent) => {
      const sw = shockwave.current
      if (sw) {
        sw.style.left = `${e.clientX - 40}px`
        sw.style.top = `${e.clientY - 40}px`
        sw.classList.add('active')
        setTimeout(() => sw.classList.remove('active'), 500)
      }
      AudioEngine.play(AudioEngine.uiClick)
    }
    
    let raf: number
    function animateRing() {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      }
      raf = requestAnimationFrame(animateRing)
    }
    animateRing()
    
    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)
    
    // Setup hover states using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        ring.current?.classList.add('hovering')
      }
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor]')) {
        ring.current?.classList.remove('hovering')
      }
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [])
  
  return (
    <>
      <div ref={orb} className="cursor-orb" />
      <div ref={ring} className="cursor-ring" />
      <div ref={shockwave} className="cursor-shockwave" />
    </>
  )
}
