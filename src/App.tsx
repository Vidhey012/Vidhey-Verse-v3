import React, { Suspense, useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Cursor } from './components/Cursor'
import { Preloader } from './components/Preloader'
import { MuteButton } from './components/MuteButton'
import { ScrollProgress } from './components/ScrollProgress'

// Lazy load all sections
const Hero         = React.lazy(() => import('./sections/Hero').then(m => ({ default: m.Hero })))
const DNANeural    = React.lazy(() => import('./sections/DNANeural').then(m => ({ default: m.DNANeural })))
const About        = React.lazy(() => import('./sections/About').then(m => ({ default: m.About })))
const Experience   = React.lazy(() => import('./sections/Experience').then(m => ({ default: m.Experience })))
const Skills       = React.lazy(() => import('./sections/Skills').then(m => ({ default: m.Skills })))
const Projects     = React.lazy(() => import('./sections/Projects').then(m => ({ default: m.Projects })))
const Education    = React.lazy(() => import('./sections/Education').then(m => ({ default: m.Education })))
const Contact      = React.lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })))

gsap.registerPlugin(ScrollTrigger)

const SectionFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-[var(--color-void)]">
    <div className="font-code text-sm text-[var(--color-text-dim)] animate-pulse tracking-widest">
      &gt; LOADING SECTOR...
    </div>
  </div>
)

const App: React.FC = () => {
  const [preloaderComplete, setPreloaderComplete] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)

  // WebGL detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
      setIsWebGLSupported(hasWebGL)
    } catch {
      setIsWebGLSupported(false)
    }
  }, [])

  // Lenis smooth scroll + GSAP ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', () => ScrollTrigger.update())

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-screen bg-[var(--color-void)] flex flex-col items-center justify-center p-8 text-center border-t-4 border-[var(--color-cyan)]">
        <h1 className="font-display text-4xl text-white mb-4 glow-cyan uppercase">Hardware Acceleration Required</h1>
        <p className="font-body text-[var(--color-text-dim)] max-w-lg mb-8">
          This 3D portfolio requires WebGL. Please enable hardware acceleration in your browser settings or switch to a modern browser like Chrome, Edge, or Firefox.
        </p>
        <div className="font-code text-[var(--color-cyan)] animate-pulse text-sm">
          &gt; ERROR: NO_WEBGL_CONTEXT
        </div>
      </div>
    )
  }

  return (
    <>
      <Cursor />
      <MuteButton />
      <ScrollProgress />

      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      <Suspense fallback={<SectionFallback />}>
        {/* Hero — Iron Man Suit-Up */}
        <Hero />

        {/* DNA → Neural Network */}
        <DNANeural />

        {/* About — Holographic card */}
        <About />

        {/* Experience — Neon wire timeline */}
        <Experience />

        {/* Skills — Orbital 3D sphere */}
        <Skills />

        {/* Projects — Floating holographic screens */}
        <Projects />

        {/* Education — Star constellation */}
        <Education />

        {/* Contact — Cyber terminal */}
        <Contact />
      </Suspense>
    </>
  )
}

export default App
