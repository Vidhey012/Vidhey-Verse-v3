'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { AudioEngine } from '@/lib/audio'
import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  
  useEffect(() => {
    const saved = localStorage.getItem('vidhey-theme') as 'dark' | 'light' | null
    const system = 'dark'
    setMode(saved || system)
    document.documentElement.setAttribute('data-theme', saved || system)
  }, [])
  
  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    
    const flash = document.createElement('div')
    flash.style.cssText = `
      position: fixed; inset: 0; z-index: 999;
      background: ${next === 'light' ? '#ffffff' : '#000000'};
      opacity: 0; pointer-events: none;
    `
    document.body.appendChild(flash)
    
    gsap.timeline()
      .to(flash, { opacity: 0.8, duration: 0.15 })
      .call(() => {
        document.documentElement.setAttribute('data-theme', next)
        setMode(next)
        localStorage.setItem('vidhey-theme', next)
        window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: next } }))
      })
      .to(flash, { opacity: 0, duration: 0.3 })
      .call(() => flash.remove())
    
    AudioEngine.play(AudioEngine.modeSwitch)
  }
  
  return (
    <button onClick={toggle} className="mode-toggle flex items-center p-2 border border-accent-primary text-accent-primary hover:shadow-glow-sm transition-shadow rounded-sm" title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
      {mode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
