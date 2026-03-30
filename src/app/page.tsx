'use client'

import { useState } from 'react'
import { TronPreloader } from '@/components/sections/Preloader'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Certifications } from '@/components/sections/Certifications'
import { GitHubStats } from '@/components/sections/GitHubStats'
import { Contact } from '@/components/sections/Contact'
import { ReactLenis } from 'lenis/react'

import { useUI } from '@/components/providers/UIProvider'

export default function Home() {
  const { booted, setBooted } = useUI()
  
  return (
    <>
      {!booted && <TronPreloader onComplete={() => setBooted(true)} />}
      
      <ReactLenis root options={{ lerp: 0.05, syncTouch: true }}>
        <main className={`relative transition-opacity duration-1000 bg-bg-void ${booted ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <GitHubStats />
          <Contact />
          <footer className="relative z-10 py-10 text-center border-t border-grid-line bg-bg-void/50 backdrop-blur-sm">
             <p className="font-mono text-xs text-accent-dim tracking-[0.2em] uppercase">
                End of Line. // Built within the Grid by Program: Vidhey Bhogadi.
             </p>
          </footer>
        </main>
      </ReactLenis>
    </>
  )
}
