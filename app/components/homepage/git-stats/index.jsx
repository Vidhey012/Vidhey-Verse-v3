"use client";
import React, { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import axios from 'axios';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import ScrambledText from '../../helper/scrambled-text';
import AnimationLottie from '../../helper/animation-lottie';
import githubLottie from '@/public/lottie/robot.json';
import ClientOnly from '../../helper/client-only';

function ContributionHeatmap({ data }) {
  const meshRef = useRef();
  
  const rows = 7;
  const cols = Math.ceil(data.length / rows);
  const gap = 0.05;
  const size = 0.15;

  useEffect(() => {
    if (!meshRef.current || !data.length) return;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    data.forEach((day, i) => {
      const col = Math.floor(i / rows);
      const row = i % rows;
      
      const x = col * (size + gap) - (cols * (size + gap)) / 2;
      const y = -(row * (size + gap)) + (rows * (size + gap)) / 2;
      
      // Height based on contribution count
      const h = Math.max(0.1, day.count * 0.3);
      
      matrix.makeScale(1, 1, h);
      matrix.setPosition(x, y, h / 2);
      meshRef.current.setMatrixAt(i, matrix);

      // Color intensity
      if (day.count === 0) color.set('#1a1a2e');
      else if (day.count < 3) color.set('#7849f8');
      else if (day.count < 6) color.set('#ff2d95');
      else color.set('#00f0ff');
      
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [data, cols, rows]);

  if (!data.length) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, data.length]}>
      <boxGeometry args={[size, size, 1]} />
      <meshStandardMaterial vertexColors emissive="#7849f8" emissiveIntensity={0.2} metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

const StatCounter = ({ label, value, color }) => (
  <div className="glass-panel p-4 border-[#7849f8]/10 bg-[#0a0e1a]/60 backdrop-blur-md hover:border-[#7849f8]/40 transition-all group">
    <p className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-2 group-hover:text-[#7849f8] transition-colors">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-display font-bold text-white tracking-tight">{value}</span>
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: color }} />
    </div>
  </div>
);

export default function GitStats() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/github');
        setGithubData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="w-full h-[400px] flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-t-[#7849f8] border-white/10 rounded-full animate-spin" />
          <p className="font-mono text-xs text-[#7849f8] tracking-widest animate-pulse">SYNCHRONIZING_DATA_LINK...</p>
       </div>
    </div>
  );

  return (
    <section id="git-stats" className="relative py-20 lg:py-32 overflow-hidden border-t border-[#7849f8]/10 bg-[#0a0f1a]">
      {/* Decorative Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00f0ff]/03 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        <div className="flex flex-col items-center mb-16 lg:mb-24">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#7849f8]" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-widest uppercase">
                <ScrambledText text="DATA_NEXUS" speed={0.4} />
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#7849f8]" />
           </div>
           <p className="text-[#16f2b3] font-mono text-xs tracking-[0.3em] uppercase opacity-60">Real-time Contribution Stream</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-6">
             <div className="glass-panel p-8 border-[#7849f8]/20 bg-[#101123]/40 backdrop-blur-xl relative">
                <div className="absolute top-0 right-0 p-4">
                   <div className="w-14 h-14 opacity-40">
                      <AnimationLottie animationPath={githubLottie} />
                   </div>
                </div>
                
                <p className="font-mono text-[10px] tracking-[0.4em] text-[#7849f8] uppercase mb-1">Source Node</p>
                <h3 className="text-2xl font-display font-bold text-white mb-6">@{githubData?.user.login}</h3>
                
                <div className="space-y-4">
                   <StatCounter label="Repositories" value={githubData?.user.public_repos} color="#7849f8" />
                   <StatCounter label="Total Stars" value={githubData?.user.total_stars} color="#00f0ff" />
                   <StatCounter label="Followers" value={githubData?.user.followers} color="#ff2d95" />
                </div>

                <a 
                    href={`https://github.com/${githubData?.user.login}`} 
                    target="_blank"
                    className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-white/05 border border-white/10 rounded-2xl text-white font-mono tracking-widest hover:bg-white/10 transition-all uppercase text-xs"
                >
                    Link Neural Account
                </a>
             </div>
          </div>

          <div className="lg:col-span-2 relative h-[500px] glass-panel border-[#7849f8]/10 bg-[#0a0e1a]/40 rounded-3xl overflow-hidden group">
             {/* 3D Heatmap Canvas */}
             <ClientOnly>
               <Canvas shadows dpr={[1, 2]}>
                  <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={40} />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                  <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                  
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#7849f8" />
                  <pointLight position={[-10, 5, 5]} intensity={1} color="#00f0ff" />
                  
                  <Suspense fallback={null}>
                     <group rotation={[-Math.PI / 6, -Math.PI / 4, 0]}>
                        <ContributionHeatmap data={githubData?.contributionData || []} />
                        <gridHelper args={[10, 20, '#7849f8', '#1a1a2e']} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
                     </group>
                  </Suspense>
               </Canvas>
             </ClientOnly>

             {/* Legend */}
             <div className="absolute bottom-8 left-8 flex items-center gap-4 px-4 py-2 glass-panel bg-[#0a0e1a]/80 border-white/05">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Intensity:</span>
                <div className="flex gap-1.5">
                   {['#1a1a2e', '#7849f8', '#ff2d95', '#00f0ff'].map(c => (
                     <div key={c} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
                   ))}
                </div>
             </div>

             <div className="absolute top-8 right-8 pointer-events-none">
                <div className="glass-panel px-4 py-2 border-[#16f2b3]/20 bg-[#16f2b3]/05">
                   <p className="text-[10px] font-mono text-[#16f2b3] tracking-[0.2em] uppercase">Status: Connected</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
