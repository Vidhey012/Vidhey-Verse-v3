// @flow strict
'use client';
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import SkillConstellation from "../../helper/skill-constellation";
import ScrambledText from "../../helper/scrambled-text";
import { useDeviceCapability } from "@/app/hooks/useDeviceCapability";
import ClientOnly from "../../helper/client-only";

function Skills() {
  const { tier } = useDeviceCapability();
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const showConstellation = isDesktop || tier === 'high' || tier === 'medium';

  const skillCategories = [
    { name: "Languages", icon: "💎" },
    { name: "Frameworks", icon: "⚡" },
    { name: "Ai & Data", icon: "🧠" },
    { name: "Cloud & Ops", icon: "☁️" }
  ];

  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden border-t border-[#7849f8]/10">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#7849f8]/02 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-center mb-16 lg:mb-24">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7849f8]" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
                <ScrambledText text="NEURAL_CONSTELLATION" speed={0.3} />
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7849f8]" />
           </div>
           <p className="text-[#00f0ff] font-mono text-xs tracking-[0.3em] uppercase opacity-60">Synthesized Capabilities</p>
        </div>

        {/* 3D Neural Map (Desktop/High Tier) */}
        {showConstellation ? (
          <div className="w-full mb-20 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7849f8]/05 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="glass-panel border-[#7849f8]/20 bg-[#0a0e1a]/20 backdrop-blur-sm rounded-3xl overflow-hidden p-4">
              <ClientOnly>
                <SkillConstellation />
              </ClientOnly>
            </div>
            
            {/* Legend Overlay */}
            <div className="hidden lg:flex flex-col gap-3 absolute bottom-12 right-12">
               {skillCategories.map(cat => (
                 <div key={cat.name} className="flex items-center gap-3 px-4 py-2 glass-panel border-[#7849f8]/10 hover:border-[#7849f8]/40 transition-all cursor-crosshair">
                   <span className="text-sm">{cat.icon}</span>
                   <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">{cat.name}</span>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div className="h-20" /> // Spacer for low tier
        )}

        {/* Marquee (Fallback & Mobile/Additional Skills) */}
        <div className="w-full relative z-10">
          <div className="flex items-center gap-4 mb-8 px-4">
             <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#7849f8]/20" />
             <p className="font-mono text-[10px] tracking-widest text-[#7849f8] uppercase whitespace-nowrap">Sequential Data Stream</p>
             <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#7849f8]/20" />
          </div>

          <ClientOnly>
            <Marquee
              gradient={false}
              speed={60}
              pauseOnHover={true}
              pauseOnClick={true}
              delay={0}
              play={true}
              direction="left"
            >
              {skillsData.map((skill, id) => (
                <div 
                  className="w-32 h-32 flex flex-col items-center justify-center m-4 group relative"
                  key={id}
                >
                  <div className="absolute inset-0 bg-[#7849f8]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  <div className="w-full h-full glass-panel flex flex-col items-center justify-center p-4 border-[#7849f8]/10 group-hover:border-[#7849f8]/60 transition-all hover:-translate-y-1">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={32}
                      height={32}
                      className="h-8 w-auto mb-3 grayscale group-hover:grayscale-0 transition-all filter drop-shadow-[0_0_8px_rgba(120,73,248,0.3)]"
                    />
                    <p className="text-white/40 group-hover:text-white text-[10px] font-mono tracking-wider transition-colors text-center truncate w-full">
                      {skill.toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </Marquee>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}

export default Skills;