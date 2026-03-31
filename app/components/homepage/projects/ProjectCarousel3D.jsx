"use client";
import React, { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Html, useCursor, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { projectsData } from "@/utils/data/projects-data";
import AnimationLottie from "../../helper/animation-lottie";
import { BsGithub, BsLink45Deg } from "react-icons/bs";

function ProjectCard3D({ project, index, total, rotation, onFocus }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  useCursor(hovered);

  // Position on a circle
  const angle = (index / total) * Math.PI * 2;
  const radius = 5;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame(() => {
    if (meshRef.current) {
       // Look at the center
       meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group position={[x, 0, z]} ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html
          transform
          distanceFactor={3}
          position={[0, 0, 0.1]}
          className="pointer-events-none group"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <div className={`w-[350px] p-6 glass-panel border-[#7849f8]/20 bg-[#0a0e1a]/80 backdrop-blur-xl rounded-2xl transition-all duration-500 pointer-events-auto ${hovered ? 'scale-105 border-[#7849f8]/60 shadow-[0_0_30px_rgba(120,73,248,0.2)]' : 'scale-100 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10">
                 <AnimationLottie animationPath={project.lottie} />
               </div>
               <div className="flex gap-2">
                 <a href={project.code} target="_blank" className="p-2 bg-[#7849f8]/10 rounded-lg hover:bg-[#7849f8]/30 transition-colors">
                   <BsGithub className="text-[#7849f8]" size={16} />
                 </a>
                 <a href={project.demo} target="_blank" className="p-2 bg-[#00f0ff]/10 rounded-lg hover:bg-[#00f0ff]/30 transition-colors">
                   <BsLink45Deg className="text-[#00f0ff]" size={16} />
                 </a>
               </div>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-[#7849f8] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
              {project.title.toUpperCase()}
            </h3>
            
            <p className="text-white/50 text-xs line-clamp-3 mb-6 font-light leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool, i) => (
                <span key={i} className="text-[9px] font-mono tracking-widest text-[#16f2b3] bg-[#16f2b3]/05 px-2 py-1 rounded-md border border-[#16f2b3]/10">
                  {tool}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="text-[9px] font-mono tracking-widest text-white/20 px-2 py-1">+{project.tools.length - 3}</span>
              )}
            </div>
            
            <button 
                onClick={() => onFocus(project)}
                className="mt-6 w-full py-2 bg-[#7849f8]/10 border border-[#7849f8]/20 rounded-xl text-[10px] font-display tracking-[0.2em] text-white/50 hover:text-white hover:bg-[#7849f8]/30 hover:border-[#7849f8]/50 transition-all uppercase"
            >
                Protocol Data_View
            </button>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function Rig({ children }) {
  const ref = useRef();
  const [dragProgress, setDragProgress] = useState(0);

  useFrame((state) => {
    if (ref.current) {
        // Continuous slow rotation
        ref.current.rotation.y += 0.003;
    }
  });

  return <group ref={ref}>{children}</group>;
}

export default function ProjectCarousel3D({ onFocus }) {
  return (
    <div className="w-full h-[600px] md:h-[800px] relative mt-12">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <Rig>
            {projectsData.map((project, i) => (
              <ProjectCard3D 
                key={project.id} 
                project={project} 
                index={i} 
                total={projectsData.length} 
                onFocus={onFocus}
              />
            ))}
          </Rig>

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {/* Center Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-20">
         <div className="w-32 h-32 border border-dashed border-[#7849f8]/40 rounded-full animate-spin-slow mb-4" />
         <p className="font-mono text-[8px] tracking-[0.8em] text-[#7849f8] uppercase whitespace-nowrap">Orbital Gallery Core v3.0</p>
      </div>
    </div>
  );
}
