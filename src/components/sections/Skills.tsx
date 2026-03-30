'use client'

import { GlitchText } from '../ui/GlitchText'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CyberOrb } from '../effects/CyberOrb'

const SKILLS = [
  { category: "Frontend Engine", items: ["React", "Next.js", "Three.js", "TailwindCSS", "GSAP"] },
  { category: "Backend Processors", items: [".NET 8", "C#", "Node.js", "Python", "SQL"] },
  { category: "Grid Protocols", items: ["Docker", "Kubernetes", "Git", "Azure", "Jenkins"] }
]

export function Skills() {
  return (
    <section id="skills" className="relative min-h-[80vh] py-32 px-6 md:px-20 lg:px-40 bg-bg-void z-10 flex flex-col justify-center border-t-4 border-dashed border-grid-line">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-16">
          
        <div className="w-full md:w-1/2">
            <GlitchText 
              text="CAPABILITY_MATRIX" 
              className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider mb-2"
              delay={0.1}
            />
            <p className="font-mono text-sm text-accent-dim tracking-widest uppercase mb-12">Analyzing the core capability matrix. All protocols are currently operating at peak efficiency.</p>
            
            <div className="space-y-12">
            {SKILLS.map((set, i) => (
                <div key={i}>
                <h3 className="font-mono text-sm text-accent-dim tracking-[0.25em] border-b border-grid-line pb-2 mb-6 uppercase">[{set.category}]</h3>
                <div className="flex flex-wrap gap-4">
                    {set.items.map(skill => (
                      <span key={skill} className="font-body text-xl text-text-secondary hover:text-accent-primary hover:shadow-glow-xs transition-all px-3 py-1 bg-white/[0.02] border-l-2 border-transparent hover:border-accent-primary rounded-sm tracking-wide">
                        {skill}
                      </span>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        
        {/* RIGHT SIDE: 3D Orb Galaxy (STUNNING VFX) */}
        <div className="w-full md:w-1/2 h-[500px] border-2 border-grid-line bg-grid-line/5 rounded-full flex flex-col items-center justify-center relative shadow-[inset_0_0_100px_rgba(0,245,255,0.08)] group/orb overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-40 group-hover/orb:opacity-100 transition-opacity duration-700">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                        <CyberOrb />
                    </Suspense>
                </Canvas>
            </div>
            
            {/* Overlay indicators */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                <div className="w-32 h-32 rounded-full border border-dashed border-accent-secondary/30 animate-[spin_12s_linear_infinite]" />
                <div className="mt-4 font-mono text-[10px] text-accent-primary tracking-[0.5em] animate-pulse">ORB_SYNCHRONIZED</div>
            </div>
        </div>
      </div>
    </section>
  )
}
