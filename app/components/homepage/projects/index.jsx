// @flow strict
'use client';
import { useState } from "react";
import { projectsData } from "@/utils/data/projects-data";
import ProjectCarousel3D from "./ProjectCarousel3D";
import ProjectCard from "./project-card";
import ScrambledText from "../../helper/scrambled-text";
import { useDeviceCapability } from "@/app/hooks/useDeviceCapability";
import { AnimatePresence, motion } from "framer-motion";
import { BsGithub, BsLink45Deg, BsXCircle } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import ClientOnly from "../../helper/client-only";

function Projects() {
  const [focusedProject, setFocusedProject] = useState(null);
  const { tier } = useDeviceCapability();
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const show3D = isDesktop; // Force 3D on desktop for verification/premium feel

  return (
    <section id="projects" className="relative py-20 lg:py-32 overflow-hidden border-t border-[#7849f8]/10">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-center mb-16 lg:mb-24">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7849f8]" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
                <ScrambledText text="ORBITAL_GALLERY" speed={0.4} />
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7849f8]" />
           </div>
           <p className="text-[#00f0ff] font-mono text-xs tracking-[0.3em] uppercase opacity-60">System Repositories</p>
        </div>

        {show3D ? (
          <div className="w-full relative group">
            <ClientOnly>
               <ProjectCarousel3D onFocus={setFocusedProject} />
            </ClientOnly>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Deep Scan Modal */}
      <AnimatePresence>
        {focusedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#0a0e1a]/95 backdrop-blur-2xl"
          >
             <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-4xl w-full glass-panel border-[#7849f8]/30 bg-[#101123]/80 p-8 md:p-12 relative overflow-hidden"
             >
                {/* Background Lottie */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
                  <AnimationLottie animationPath={focusedProject.lottie} />
                </div>

                <button 
                  onClick={() => setFocusedProject(null)}
                  className="absolute top-6 right-6 text-white/40 hover:text-[#ff2d95] transition-colors"
                >
                  <BsXCircle size={32} />
                </button>

                <div className="flex flex-col gap-8">
                   <div className="space-y-4">
                      <p className="font-mono text-[10px] tracking-[0.5em] text-[#7849f8] uppercase">Deep Scan // Protocol_0{focusedProject.id}</p>
                      <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">
                        {focusedProject.title}
                      </h3>
                      <div className="h-[1px] w-24 bg-gradient-to-r from-[#7849f8] to-transparent" />
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <p className="text-white/60 text-lg leading-relaxed font-light">
                           {focusedProject.description}
                         </p>
                         
                         <div className="space-y-3">
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Neural Tools Stack</p>
                            <div className="flex flex-wrap gap-3">
                               {focusedProject.tools.map((tool, i) => (
                                 <span key={i} className="px-4 py-2 bg-[#7849f8]/05 border border-[#7849f8]/10 rounded-full text-xs font-mono text-[#00f0ff]">
                                   {tool}
                                 </span>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col gap-6">
                         <div className="aspect-video glass-panel border-[#7849f8]/20 relative overflow-hidden group">
                             <img 
                                src={focusedProject.demo} 
                                alt={focusedProject.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent opacity-60" />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <a 
                                href={focusedProject.code} 
                                target="_blank"
                                className="flex items-center justify-center gap-3 py-4 bg-[#7849f8]/10 border border-[#7849f8]/20 rounded-2xl text-white font-display tracking-widest hover:bg-[#7849f8]/30 transition-all uppercase text-sm"
                            >
                                <BsGithub size={20} /> Repository
                            </a>
                            <a 
                                href={focusedProject.demo} 
                                target="_blank"
                                className="flex items-center justify-center gap-3 py-4 bg-[#00f0ff]/10 border border-[#00f0ff]/20 rounded-2xl text-[#00f0ff] font-display tracking-widest hover:bg-[#00f0ff]/30 transition-all uppercase text-sm"
                            >
                                <BsLink45Deg size={24} /> Live System
                            </a>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;