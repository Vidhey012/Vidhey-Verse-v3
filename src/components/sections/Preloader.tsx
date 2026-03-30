'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { AudioEngine } from '@/lib/audio'

interface PreloaderProps {
  onComplete: () => void
}

import { useUI } from '../providers/UIProvider'

interface PreloaderProps {
  onComplete: () => void
}

export function TronPreloader({ onComplete }: PreloaderProps) {
  const { booted, setIsTransitioning } = useUI()
  const container = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  
  const [stage, setStage] = useState<'video' | 'glitch' | 'grid'>('video')
  const [progress, setProgress] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  
  const [showSkip, setShowSkip] = useState(false)
  
  useEffect(() => {
    // Automatically show skip button after 2.5s if video isn't finished
    const timer = setTimeout(() => setShowSkip(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Attempt auto-play
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.warn("Autoplay failed, waiting for user.")
        setShowSkip(true) // Force skip visibility if autoplay fails
      })
    }
    
    // Simulate loading percentage
    const progressObj = { val: 0 }
    gsap.to(progressObj, {
      val: 100,
      duration: 8, 
      ease: 'none',
      onUpdate: () => setProgress(Math.floor(progressObj.val))
    })

    return () => {
      gsap.killTweensOf(progressObj)
    }
  }, [])

  const handleVideoEnd = () => {
    if (stage !== 'video') return // Prevent multiple triggers
    setStage('glitch')
    setIsTransitioning(true)
    AudioEngine.play(AudioEngine.burst)

    const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(container.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsTransitioning(false)
              AudioEngine.play(AudioEngine.bikeLaunch)
              onComplete()
            }
          })
        }
      })

    if (videoRef.current) {
        gsap.to(videoRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.in'
        })
    }

    tl.fromTo('.glitch-title', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .to({}, { duration: 1 }) 
    .call(() => {
        setStage('grid')
        AudioEngine.play(AudioEngine.worldUnleash)
    })
    .to({}, { duration: 1.5 })
    
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        opacity: 0.4,
        duration: 0.05,
        repeat: 10,
        yoyo: true,
        ease: 'steps(1)'
      })
    }
  }

  useEffect(() => {
    const flashTimer = setTimeout(() => setShowFlash(true), 2800)
    const flashEndTimer = setTimeout(() => setShowFlash(false), 2880)
    return () => {
      clearTimeout(flashTimer)
      clearTimeout(flashEndTimer)
    }
  }, [])
  
  return (
    <div ref={container} className="fixed inset-0 z-[999] bg-[#000] flex flex-col items-center justify-center overflow-hidden">
      
      {/* SCANLINE FLASH EFFECT */}
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-white shadow-[0_0_20px_#fff] z-[1000] pointer-events-none transition-opacity duration-300 ${showFlash ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* 1. POV VIDEO STAGE */}
      <video 
        ref={videoRef}
        src="/intro.mp4?v=1774815433"
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${stage === 'video' ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* 2. GLITCH STAGE */}
      <div 
        ref={bgRef}
        className={`absolute inset-0 bg-accent-primary mix-blend-color transition-opacity duration-200 ${stage === 'glitch' ? 'opacity-30' : 'opacity-0'}`}
      />
      <div className={`relative z-20 flex items-center justify-center transition-opacity duration-150 ${stage === 'glitch' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="glitch-title font-display text-4xl md:text-6xl text-accent-primary uppercase tracking-tron animate-pulse shadow-glow-text">
          Initiating_Grid
        </h1>
      </div>
      
      {/* 3. GRID ASSEMBLE STAGE */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${stage === 'grid' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, var(--color-grid-horizon) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-horizon) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top center',
        }} />
        
        <div className="absolute bottom-12 right-12 flex flex-col items-end">
          <p className="font-mono text-[10px] text-accent-primary tracking-[0.3em] mb-1">SYSTEM.BOOT()</p>
          <div className="font-display text-5xl text-white shadow-glow-sm">
            {progress}%
          </div>
        </div>
      </div>
      
      {/* FAST BOOT SKIP (FOR SLOW CONNECTIONS) */}
      {(stage === 'video' && (showSkip || progress > 25)) && (
        <button 
          onClick={handleVideoEnd}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1001] px-8 py-3 border border-accent-primary/50 bg-black/60 backdrop-blur-xl font-mono text-[11px] text-accent-primary tracking-[0.4em] hover:bg-accent-primary hover:text-black transition-all shadow-glow-sm animate-bounce"
        >
          // ENTER_THE_VERSE_NOW
        </button>
      )}
      
    </div>
  )
}
