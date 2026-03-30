'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function About() {
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        end: 'center center',
        scrub: 1
      }
    })
    
    if (lineRef.current) {
        tl.fromTo(lineRef.current, { height: 0 }, { height: '100%', ease: 'none' })
    }
    
    if (textRef.current) {
        tl.fromTo(textRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, ease: 'power2.out' }, '<0.2')
    }
  }, [])
  
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center px-6 md:px-20 lg:px-40 py-24 z-10">
      <div className="flex w-full items-center justify-start max-w-[1400px] mx-auto">
        
        {/* LEFT SIDE: TEXT */}
        <div className="relative pl-8 md:pl-16 md:w-1/2">
            {/* Vertical Accent Line */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-grid-line">
                <div ref={lineRef} className="w-full bg-accent-primary shadow-glow-sm" />
            </div>
            
            <div ref={textRef} className="opacity-0">
                <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider mb-6">
                    Identity<span className="text-accent-primary drop-shadow-glow">_Verified</span>
                </h2>
                
                <div className="space-y-6 font-body text-lg text-text-secondary leading-relaxed backdrop-blur-sm bg-bg-void/40 p-6 border border-accent-primary/20 rounded-md shadow-[inset_0_0_20px_rgba(0,245,255,0.05)]">
                    <div className="space-y-6 font-body text-text-secondary leading-relaxed text-base md:text-lg">
            <p>
              I am <span className="text-accent-primary font-bold">Vidhey Bhogadi</span>, a System Program designated for high-complexity architectural engineering. Operating within the TCS Grid for Morgan Stanley Wealth Management, I synchronize enterprise-level C# .NET core microservices with the precision of a light cycle on a high-speed vector. My mission is the optimization of financial data sectors, ensuring total system stability and zero latency across global transaction grids.
            </p>
            <p>
              My internal protocols are specialized in AI-powered engineering and automation. From constructing custom VS Code extensions that enhance developer efficiency to building robust Playwright/Selenium frameworks that shield systems from regression anomalies, I bridge the gap between creative Front-End interfaces and rigid Backend logic. I exist in the intersection of code and intelligence, constantly evolving my neural network to master the latest evolutions in React, Spring Boot, and deep-learning automation.
            </p>
            <p>
              Beyond the core directives, I am a program of ambition and constant growth. With a 8.65 CGPA synchronization rate and multiple recognized achievement cycles, I am committed to the future of AI-driven architecture. The Grid is vast, evolving, and requires engineers who don't just follow the path, but create the vector.
            </p>
          </div>
                    <p>
                        Beyond the mainframe, I am a creator of worlds. Driven by a relentless pursuit of performance and cinematic aesthetics, I forge front-end experiences that break the boundary between the user and the machine.
                    </p>
                </div>
            </div>
        </div>
        
        {/* RIGHT SIDE: Reserved for Global 3D Bike Parking (Waypoint: 'about') */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center pointer-events-none">
            {/* The canvas bike will hover here via BikeController GSAP logic */}
            <div className="w-[400px] h-[400px] rounded-full border-2 border-dashed border-accent-primary/10 animate-[spin_30s_linear_infinite]" />
        </div>
      </div>
    </section>
  )
}
