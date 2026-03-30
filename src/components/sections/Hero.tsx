'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NeonButton } from '../ui/NeonButton'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const gridPlaneRef = useRef<HTMLDivElement>(null)
  const typingTextRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    // Parallax Grid Scroll
    if (gridPlaneRef.current) {
      gsap.to(gridPlaneRef.current, {
        backgroundPositionY: '1000px', // Move grid to simulate moving forward
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })
    }
    
    // Typing Effect
    if (typingTextRef.current) {
      const text = "SYSTEM_PROTOCOL @ TCS // MS_WEALTH_MGMT"
      typingTextRef.current.textContent = ""
      
      const tl = gsap.timeline({ 
        delay: 1, // Reduced delay for immediate impact after preloader
        scrollTrigger: {
          trigger: '#hero',
          start: 'top center',
        }
      })
      
      text.split('').forEach((char, i) => {
        tl.to(typingTextRef.current!, {
          textContent: text.substring(0, i + 1),
          duration: 0.05,
          ease: 'none'
        })
      })
    }
  }, [])
  
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden uppercase">
      
      {/* INFINITE CSS GRID PARALLAX FLOOR */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-end justify-center perspective-[1000px]">
        <div 
          ref={gridPlaneRef}
          className="w-[200vw] h-[150vh] origin-top opacity-50 block"
          style={{
            transform: 'rotateX(75deg) translateY(-20vh)',
            backgroundImage: `
              linear-gradient(to right, var(--color-grid-bright) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-grid-bright) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to top, black 20%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 80%)'
          }}
        />
      </div>

      {/* HORIZON GLOW */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-accent-primary shadow-glow-lg opacity-40 z-0 mix-blend-screen" />
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-bg-void via-transparent to-transparent z-0" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">
        <h3 className="font-display text-[0.6rem] md:text-xs text-accent-primary tracking-[0.6em] mb-4 bg-accent-primary/5 backdrop-blur-xl px-6 py-3 border-l-4 border-accent-primary shadow-[0_0_20px_rgba(0,245,255,0.1)]">
          <span ref={typingTextRef} className="border-r-2 border-accent-primary pr-2 animate-pulse tracking-[0.5em] uppercase">Identity_Verified: Specialist_Bhogadi;</span>
        </h3>
        
        <div className="relative mb-8">
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85] relative z-10 flex flex-col items-center justify-center">
            <span className="relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">VIDHEY</span>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-white to-accent-secondary mt-[-0.05em] drop-shadow-[0_0_50px_rgba(0,245,255,0.6)] animate-pulse">
              BHOGADI
            </span>
          </h1>
          {/* STUNNING ZENITH BACKDROP */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,var(--color-accent-primary)_0%,transparent_70%)] opacity-[0.15] blur-[120px] z-0 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-40 blur-sm z-0" />
        </div>
        
        <p className="font-body text-sm md:text-lg text-text-secondary tracking-widest max-w-2xl mb-12 uppercase">
          High-performance architecture // TCS System designated for Morgan Stanley.
        </p>

        <div className="flex items-center gap-6">
          <NeonButton variant="primary" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
            ENTER THE GRID
          </NeonButton>
          <a href="#about" className="font-mono text-[0.6rem] tracking-widest text-text-muted hover:text-accent-primary transition-colors border-b border-transparent hover:border-accent-primary pb-1 relative group">
            SKIP TO SYSTEMS
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary transition-all group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  )
}
