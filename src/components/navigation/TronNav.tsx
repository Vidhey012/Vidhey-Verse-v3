'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AudioToggle } from '../ui/AudioToggle'
import { NeonButton } from '../ui/NeonButton'
import { useUI } from '../providers/UIProvider'

export function TronNav() {
  const { booted } = useUI()
  const [activeSection, setActiveSection] = useState('hero')
  const signalRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (signalRef.current) {
        gsap.to(signalRef.current, {
            left: '100%',
            duration: 3,
            repeat: -1,
            ease: 'none',
            delay: 1
        })
    }
  }, [])

  useEffect(() => {
    if (booted && navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
      )
    }
  }, [booted])

  const smoothScrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const links = [
    { href: '#about', label: 'ABOUT' },
    { href: '#experience', label: 'EXPERIENCE' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#skills', label: 'SKILLS' },
    { href: '#certifications', label: 'CERTS' },
    { href: '#contact', label: 'CONTACT' },
  ]

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 lg:px-12 bg-black/60 backdrop-blur-xl border-b border-accent-primary/20 z-[100] pointer-events-auto transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* ZENITH SIGNAL PULSE */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden bg-white/5">
        <div 
            ref={signalRef}
            className="absolute top-0 -left-[20%] w-[20%] h-full bg-gradient-to-r from-transparent via-accent-primary to-transparent shadow-[0_0_15px_var(--color-accent-primary)]"
        />
      </div>
      
      <a href="#hero" className="flex items-center gap-3 decoration-none group mr-4">
        <div className="w-8 h-8 rounded-sm bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center font-display text-accent-primary shadow-glow-sm group-hover:bg-accent-primary group-hover:text-black transition-all duration-300">V</div>
        <span className="font-display text-xs font-black tracking-[0.4em] text-white group-hover:text-accent-primary transition-colors duration-300 whitespace-nowrap">VIDHEY VERSE</span>
      </a>
      
      <ul className="flex overflow-x-auto gap-4 md:gap-8 list-none hide-scrollbar items-center h-full mr-4 flex-1">
        {links.map(link => (
          <li key={link.href}>
            <a 
              href={link.href}
              className={`font-display text-[0.7rem] tracking-[0.15em] text-text-secondary decoration-none relative transition-colors duration-fast 
                after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:right-1/2 after:h-[1px] after:bg-accent-primary after:shadow-glow-xs after:transition-all after:duration-normal after:ease-tron
                hover:text-accent-primary hover:shadow-glow-text hover:after:left-0 hover:after:right-0
                ${activeSection === link.href.slice(1) ? 'text-accent-primary shadow-glow-text after:left-0 after:right-0' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo(link.href)
                setActiveSection(link.href.slice(1))
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="flex items-center gap-4">
        <AudioToggle />
        <NeonButton variant="secondary" onClick={() => window.open('/resume.pdf')} className="hidden sm:block text-[0.6rem] px-4 py-2">
          RESUME ↓
        </NeonButton>
      </div>
    </nav>
  )
}
