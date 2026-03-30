'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TiltCard } from '../ui/TiltCard'
import { GlitchText } from '../ui/GlitchText'

const EXPERIENCE_DATA = [
  {
    title: "Systems Engineer",
    company: "Tata Consultancy Services (TCS)",
    client: "Morgan Stanley Wealth Management",
    date: "Aug 2023 - Present",
    desc: [
      "Architect API endpoints handling 50k+ daily transactions.",
      "Optimize CI/CD pipelines reducing deployment times by 30%.",
      "Refactored legacy C# batch jobs into modern .NET 8 microservices."
    ]
  },
  {
    title: "Front-End Developer",
    company: "Freelance / Open Source",
    client: "Global Network",
    date: "Jan 2022 - Aug 2023",
    desc: [
      "Built 12+ highly animated GSAP landing pages.",
      "Integrated Three.js visualizations for Web3 projects.",
      "Achieved average Lighthouse scores of 98."
    ]
  }
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Instead of forcing 500vh right off the bat, we'll pin for duration
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=2000',
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to(timelineRef.current, { height: '100%', ease: 'none' })
    })
    
    // Fade in cards sequentially based on overall container scroll progress
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      gsap.fromTo(card, 
        { opacity: 0, y: 150, rotateX: -10 },
        {
          opacity: 1, y: 0, rotateX: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${index * 800} center`,
            end: `top+=${(index + 1) * 800} center`,
            scrub: true
          }
        }
      )
    })
    
    return () => {
        pinTrigger.kill()
    }
  }, [])
  
  return (
    <section id="experience" ref={containerRef} className="relative h-screen w-full flex items-center px-6 md:px-20 lg:px-40 overflow-hidden z-10 bg-bg-void/80 backdrop-blur-md border-y border-grid-bright">
      
      {/* BACKGROUND HEX PATTERN */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-accent-primary) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="flex flex-col md:flex-row w-full max-w-[1400px] mx-auto h-full pt-20">
        
        {/* LEFT COLUMN: Pinned Title & Timeline Core */}
        <div className="w-full md:w-1/3 flex flex-col pt-32 h-full relative pr-8">
            <GlitchText 
                text="OPERATING_CYCLES" 
                className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider mb-4"
                delay={0.1}
            />
            <p className="font-mono text-sm text-accent-dim tracking-widest uppercase">Documenting the operational history of Program: Vidhey. Each cycle represents a successful deployment into high-stakes enterprise sectors.</p>
            
            {/* The vertical timeline track */}
            <div className="absolute right-0 top-1/4 bottom-[10%] w-[2px] bg-grid-line hidden md:block">
                <div ref={timelineRef} className="w-full h-0 bg-accent-primary shadow-glow-sm" />
            </div>
        </div>
        
        {/* RIGHT COLUMN: Scrolling Cards */}
        <div className="w-full md:w-2/3 h-full flex flex-col items-center gap-12 md:pl-16 relative perspective-[1000px] pt-32 pb-64 overflow-y-visible">
           {EXPERIENCE_DATA.map((exp, i) => (
             <TiltCard 
                key={i} 
                ref={el => { if(el) cardsRef.current[i] = el }}
                className="w-full experience-card relative bg-bg-surface border border-accent-primary/20 p-8 pt-10 rounded-tr-[40px] rounded-bl-[40px] overflow-hidden group hover:border-accent-primary hover:shadow-glow-sm transition-all duration-300 transform-gpu z-10"
             >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity" style={{
                   backgroundImage: `linear-gradient(45deg, transparent 25%, var(--color-accent-primary) 25%, var(--color-accent-primary) 50%, transparent 50%, transparent 75%, var(--color-accent-primary) 75%, var(--color-accent-primary) 100%)`,
                   backgroundSize: '20px 20px'
                }} />
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-grid-line pb-4">
                  <div>
                    <h3 className="font-display text-2xl text-accent-primary drop-shadow-glow tracking-wide">{exp.title}</h3>
                    <h4 className="font-body text-xl text-white mt-1">{exp.company}</h4>
                    <span className="font-mono text-[0.65rem] text-accent-dim tracking-widest uppercase bg-accent-primary/5 px-2 py-0.5 rounded border border-accent-primary/20 mt-2 inline-block">Client: {exp.client}</span>
                  </div>
                  <div className="font-stat text-accent-secondary bg-accent-secondary/10 px-3 py-1 mt-4 md:mt-0 border border-accent-secondary/50 rounded-sm">
                    {exp.date}
                  </div>
                </div>
                
                <ul className="relative z-10 space-y-3 font-body text-text-secondary text-sm md:text-base">
                  {exp.desc.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-accent-hot font-mono mt-0.5">&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Top Right Corner Highlight */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent-primary group-hover:shadow-glow-xs transition-shadow" />
             </TiltCard>
           ))}
        </div>
      </div>
    </section>
  )
}
