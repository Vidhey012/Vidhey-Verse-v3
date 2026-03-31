// @flow strict
'use client';
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import experienceLottie from '/public/lottie/code.json';
import Orb from "../../helper/orb";
import ScrambledText from "../../helper/scrambled-text";

function Experience() {
  return (
    <section id="experience" className="relative py-20 lg:py-32 overflow-hidden border-t border-[#7849f8]/10">
      {/* Background Section Accent */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00f0ff]/03 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-center mb-16 lg:mb-24">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7849f8]" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
                <ScrambledText text="JOURNEY_PATH" speed={0.4} />
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7849f8]" />
           </div>
           <p className="text-[#16f2b3] font-mono text-xs tracking-[0.3em] uppercase opacity-60">Architectural Milestones</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="relative order-2 lg:order-1">
             {/* Timeline Rail */}
             <div className="absolute left-0 lg:left-[-40px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#7849f8]/10 via-[#00f0ff]/40 to-[#7849f8]/10 hidden sm:block" />

             <div className="flex flex-col gap-8">
               {experiences.map((exp, idx) => (
                 <div key={exp.id} className="relative group pl-0 sm:pl-8">
                   {/* Timeline Node */}
                   <div className="absolute left-[-4px] lg:left-[-44px] top-8 w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] hidden sm:block group-hover:scale-150 transition-transform" />
                   
                   <GlowCard identifier={`experience-${exp.id}`}>
                     <div className="p-6 md:p-8 space-y-4">
                       <div className="flex items-center justify-between">
                         <span className="text-[10px] font-mono tracking-widest text-[#16f2b3] bg-[#16f2b3]/05 px-3 py-1 rounded-full border border-[#16f2b3]/20">
                           {exp.duration}
                         </span>
                         <BsPersonWorkspace className="text-[#7849f8] opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                       </div>
                       
                       <div>
                         <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-[#7849f8] transition-colors uppercase tracking-tight">
                           {exp.title}
                         </h3>
                         <p className="text-[#00f0ff] font-mono text-sm mt-1">{exp.company}</p>
                       </div>
                       
                       <div className="h-[1px] w-full bg-gradient-to-r from-[#7849f8]/20 via-transparent to-transparent" />
                     </div>
                   </GlowCard>
                 </div>
               ))}
             </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative">
             {/* Large Floating Orb */}
             <div className="absolute inset-0 z-0 opacity-40">
               <Orb
                 hoverIntensity={0.8}
                 rotateOnHover={true}
                 hue={280}
                 forceHoverState={false}
               />
             </div>

             <div className="relative z-10 w-full max-w-md transform hover:scale-105 transition-transform duration-1000">
                <AnimationLottie animationPath={experienceLottie} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#7849f8]/10 blur-[100px] rounded-full -z-10" />
             </div>
             
             <div className="mt-8 text-center hidden lg:block">
                <p className="text-white/30 font-mono text-[10px] tracking-[0.4em] uppercase">Visualized Neural Path</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Experience;