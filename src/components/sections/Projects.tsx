'use client'

import { useRef } from 'react'
import { NeonButton } from '../ui/NeonButton'
import { TiltCard } from '../ui/TiltCard'
import { GlitchText } from '../ui/GlitchText'

const PROJECTS = [
  {
    title: "Project Alpha",
    role: "Lead Architect",
    desc: "A scalable high-frequency trading simulation engine built with .NET and React. Processed 10k messages/sec.",
    tech: ["React", ".NET", "SignalR", "Docker"],
    link: "https://github.com"
  },
  {
    title: "SynthWave VR",
    role: "Frontend Developer",
    desc: "Immersive WebVR experience leveraging Three.js and WebGL for data visualization.",
    tech: ["Three.js", "WebGL", "Vue", "Node.js"],
    link: "https://github.com"
  },
  {
    title: "Grid Optimization Suite",
    role: "Systems Engineer",
    desc: "Internal tool analyzing CI/CD bottlenecks, mapping commit history into a 3D interface.",
    tech: ["Python", "FastAPI", "React", "D3.js"],
    link: "https://github.com"
  }
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section id="projects" ref={containerRef} className="relative min-h-[90vh] py-32 px-6 md:px-20 lg:px-40 bg-[length:60px_60px] z-10 border-t border-grid-bright pt-64" style={{
      backgroundImage: 'radial-gradient(circle at center, var(--color-grid-horizon) 1px, transparent 1px)'
    }}>
      <div className="absolute inset-0 bg-bg-void/80 z-0 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <GlitchText 
            text="ARCHIVED_CONSTRUCTS" 
            className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider mb-6"
            delay={0.2}
        />
        <p className="font-mono text-sm text-accent-dim tracking-widest uppercase mb-12 text-center max-w-2xl">
          Accessing the Archived Constructs database. These are the experimental sub-routines and full-scale architectures built to redefine the digital frontier.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((proj, i) => (
            <TiltCard key={i} className="group/card relative bg-bg-surface border-2 border-grid-line p-8 rounded backdrop-blur-md transition-all duration-300 hover:border-accent-primary peer z-10 peer-hover:opacity-30 flex flex-col justify-between">
              
              <div className="absolute inset-0 bg-gradient-to-br from-bg-surface to-accent-dim/10 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary opacity-0 group-hover/card:opacity-100 transition-opacity" />

              <div>
                  <p className="font-mono text-xs text-accent-secondary tracking-[0.2em] mb-3 uppercase">{proj.role}</p>
                  <h3 className="font-display text-3xl text-white mb-4 shadow-glow-xs">{proj.title}</h3>
                  <div className="h-px w-full bg-grid-line mb-6 group-hover/card:bg-accent-primary/50 transition-colors" />
                  <p className="font-body text-text-muted mb-8 text-sm leading-relaxed">{proj.desc}</p>
              </div>
              
              <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tech.map((t, j) => (
                      <span key={j} className="font-mono text-[10px] text-accent-dim uppercase border border-accent-dim/30 px-2 py-1 rounded bg-accent-dim/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <NeonButton variant="secondary" onClick={() => window.open(proj.link, '_blank')} className="w-full text-[10px] tracking-widest py-2">
                      ACCESS_REPO
                  </NeonButton>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
