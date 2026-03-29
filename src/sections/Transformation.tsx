import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';
import circuitFrag from '@/shaders/circuit.frag.glsl';
import skinPeelVert from '@/shaders/skinPeel.vert.glsl';

gsap.registerPlugin(ScrollTrigger);

const Phase4SkillNodes = () => {
  const skills = [
    'Java', 'React', 'Node.js', 'TypeScript', 'Playwright', 'Spring Boot',
    'Selenium', 'Cypress', 'Docker', 'AWS', 'PostgreSQL', 'Copilot'
  ];

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        const radius = 2.5 + Math.random() * 1.5;
        const angle = (i / skills.length) * Math.PI * 2;
        const yOffset = (Math.random() - 0.5) * 3;
        
        return (
          <mesh 
            key={i} 
            position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#00ffea" emissive="#00d4ff" emissiveIntensity={0.5} />
            <Html center distanceFactor={10} style={{ pointerEvents: 'none' }}>
              <div style={{ color: '#00ffea', fontFamily: 'var(--font-accent)', fontSize: '12px', whiteSpace: 'nowrap', textShadow: '0 0 5px #00d4ff' }}>
                {skill}
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate helix curve points
  const curvePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 4; // 2 turns
      const radius = 1.3;
      const y = (t - 0.5) * 4;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);
  
  const curvePoints2 = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const angle = t * Math.PI * 4 + Math.PI; // offset by Pi
      const radius = 1.3;
      const y = (t - 0.5) * 4;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[curvePoints, 100, 0.02, 8, false]} />
        <meshBasicMaterial color="#00ffea" transparent opacity={0.6} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curvePoints2, 100, 0.02, 8, false]} />
        <meshBasicMaterial color="#ff2d9b" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const TransformationModel = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const processorMatRef = useRef<THREE.ShaderMaterial>(null);
  
  // Phase 1: 0 - 0.25 (Human)
  // Phase 2: 0.25 - 0.5 (Scan)
  // Phase 3: 0.5 - 0.75 (Cyborg)
  // Phase 4: 0.75 - 1.0 (Processor)
  
  const humanOpacity = progress < 0.25 ? 1 : progress < 0.5 ? 1 - (progress - 0.25) * 4 : 0;
  const cyborgOpacity = progress < 0.25 ? 0 : progress < 0.5 ? (progress - 0.25) * 4 : progress < 0.75 ? 1 : 1 - (progress - 0.75) * 4;
  const processorOpacity = progress < 0.75 ? 0 : (progress - 0.75) * 4;
  
  // uScanY interpolates from 0 (top) to 1 (bottom) between 0.25 and 0.5
  const scanProgress = progress >= 0.25 && progress <= 0.5 ? (progress - 0.25) * 4 : (progress > 0.5 ? 1 : 0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
    if (processorMatRef.current) {
      processorMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {humanOpacity > 0 && (
        <mesh scale={1.2}>
          <sphereGeometry args={[1.5, 64, 64]} />
          {scanProgress > 0 ? (
            <shaderMaterial
              transparent
              uniforms={{
                uTime: { value: 0 },
                uScanY: { value: scanProgress }
              }}
              vertexShader={skinPeelVert}
              fragmentShader={`
                varying vec2 vUv;
                varying vec3 vPosition;
                uniform float uScanY;
                void main() {
                  float scanYWorld = mix(1.5, -1.5, uScanY);
                  if (vPosition.y < scanYWorld) discard;
                  
                  vec3 color = vec3(0.95, 0.78, 0.62);
                  if (abs(vPosition.y - scanYWorld) < 0.1) {
                    color = vec3(0.0, 1.0, 0.9);
                  }
                  
                  // Apply opacity fade out for the whole mesh if humanOpacity drops
                  gl_FragColor = vec4(color, ${humanOpacity});
                }
              `}
            />
          ) : (
             <meshStandardMaterial color="#f4c9a0" roughness={0.6} metalness={0.2} transparent opacity={humanOpacity} />
          )}
        </mesh>
      )}
      
      {/* Scan line effect (visibile in phase 2) */}
      {scanProgress > 0 && scanProgress < 1 && (
        <mesh position={[0, 1.8 - (scanProgress * 3.6), 0]} scale={[1.6, 0.05, 1.6]}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>
      )}

      {/* CYBORG PHASE */}
      {cyborgOpacity > 0 && (
        <group>
          <mesh scale={1.2}>
            <sphereGeometry args={[1.48, 64, 64]} />
            <meshStandardMaterial color="#a0b8c0" metalness={0.9} roughness={0.1} emissive="#00ffea" emissiveIntensity={0.6} transparent opacity={cyborgOpacity} />
          </mesh>
          {progress >= 0.5 && progress <= 0.75 && <DNAHelix />}
        </group>
      )}

      {processorOpacity > 0 && (
        <group>
          <mesh scale={processorOpacity * 1.5}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <shaderMaterial
              ref={processorMatRef}
              transparent
              uniforms={{
                uTime: { value: 0 },
                uColor: { value: new THREE.Color('#00ffea') },
                opacity: { value: processorOpacity }
              }}
              vertexShader={`
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                  vUv = uv;
                  vNormal = normalize(normalMatrix * normal);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `}
              fragmentShader={circuitFrag}
            />
          </mesh>
          {progress >= 0.75 && <Phase4SkillNodes />}
        </group>
      )}
    </group>
  );
};

const TransformationParticles = ({ progress }: { progress: number }) => {
  // Particles follow the phase colors and speed
  const color = progress < 0.25 ? "#ffb347" : progress < 0.75 ? "#00ffea" : "#ff2d9b";
  const size = progress > 0.75 ? 0.04 : 0.02;
  
  const count = progress < 0.25 ? 1000 : 2000;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * (progress > 0.5 ? 0.05 : 0.01);
      ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent opacity={0.6} color={color} size={size} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
};

const CyborgExplosionParticles = ({ progress }: { progress: number }) => {
  // Only active exactly at the transition from Cyborg to Processor (0.70 to 0.75)
  const isVisible = progress > 0.65 && progress < 0.85;
  const explosionProgress = Math.max(0, Math.min(1, (progress - 0.70) * 20));
  
  const count = 3000;
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.48; // Radius of cyborg head
        arr[i*3] = r * Math.sin(phi) * Math.cos(theta);
        arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);
  
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
     if (matRef.current) {
         matRef.current.uniforms.uExplode.value = explosionProgress;
         matRef.current.uniforms.opacity.value = isVisible ? (1.0 - explosionProgress) : 0;
     }
  });

  if (!isVisible) return null;

  return (
    <Points ref={ref} positions={initialPositions} stride={3} frustumCulled={false}>
       <shaderMaterial
         ref={matRef}
         transparent
         depthWrite={false}
         uniforms={{
            uExplode: { value: 0 },
            uColor: { value: new THREE.Color('#00ffea') },
            opacity: { value: 0 }
         }}
         vertexShader={`
            uniform float uExplode;
            void main() {
                // Scatter outward aggressively up to 10 units
                vec3 finalPos = position + normalize(position) * (uExplode * 10.0);
                vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                gl_PointSize = (20.0 / -mvPosition.z) * (1.0 - uExplode);
                gl_Position = projectionMatrix * mvPosition;
            }
         `}
         fragmentShader={`
            uniform vec3 uColor;
            uniform float opacity;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                gl_FragColor = vec4(uColor, opacity * (1.0 - dist * 2.0) * 1.5);
            }
         `}
       />
    </Points>
  );
};

export const Transformation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[var(--color-void)]">
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col md:flex-row border-t border-b border-[rgba(0,212,255,0.05)]">
        
        {/* CRT Overlay on phase 2 & 3 */}
        {progress > 0.25 && progress < 0.75 && (
          <div className="absolute inset-0 z-10 pointer-events-none opacity-20" 
               style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)' }} 
          />
        )}
        
        {/* RGB Glitch effect active briefly at 0.30 and 0.45 */}
        <div 
          className="absolute inset-0 z-0 transition-all duration-75 pointer-events-none"
          style={{
            backdropFilter: (Math.abs(progress - 0.3) < 0.02 || Math.abs(progress - 0.45) < 0.02) ? 'hue-rotate(90deg) contrast(150%)' : 'none',
          }}
        />

        {/* 3D Canvas wrapper */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full z-0 flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[-5, -5, 2]} color={progress < 0.25 ? "#ffb347" : "#00ffea"} intensity={3.0} />
            <directionalLight position={[5, 5, 5]} color="#ff2d9b" intensity={2.5} />
            <TransformationParticles progress={progress} />
            <CyborgExplosionParticles progress={progress} />
            <TransformationModel progress={progress} />

            <EffectComposer>
              <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.5} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.003, 0.003)} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* Text Panels Layer - Right Side */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full z-10 flex flex-col justify-center px-8 md:px-16 pb-12 md:pb-0">
          <AnimatePresence mode="wait">
            {progress < 0.25 && (
              <motion.div 
                key="p1"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="flex flex-col gap-4 font-body border-l-2 border-[#ffb347] pl-6"
              >
                <div className="text-[var(--color-text-dim)] uppercase tracking-wider text-sm">Initiation</div>
                <h2 className="text-2xl md:text-3xl font-display text-white">HUMAN ORIGINS</h2>
                <p className="text-lg text-[var(--color-text-dim)]">"Started as a student in Kakinada, Andhra Pradesh 🇮🇳"</p>
                <p className="text-[#ffb347]">B.Tech CSE · JNTUK · 8.65 CGPA</p>
                <p className="text-white text-sm">Prathibha Puraskar — State Merit Award</p>
              </motion.div>
            )}

            {progress >= 0.25 && progress < 0.50 && (
              <motion.div 
                key="p2"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="flex flex-col gap-4 font-body border-l-2 border-[var(--color-cyber-blue)] pl-6"
              >
                <div className="text-[var(--color-cyber-blue)] uppercase tracking-wider text-sm animate-pulse">Scanning Bio-Metrics</div>
                <h2 className="text-2xl md:text-3xl font-display text-white glow-text">SYSTEM UPGRADE</h2>
                <p className="text-lg text-[var(--color-text-dim)]">"Joined TCS as Systems Engineer (Prime Category)"</p>
                <p className="text-[var(--color-neon-cyan)]">Morgan Stanley Wealth Management, Bengaluru</p>
              </motion.div>
            )}

            {progress >= 0.50 && progress < 0.75 && (
              <motion.div 
                key="p3"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="flex flex-col gap-4 font-body border-l-2 border-[var(--color-purple-mid)] pl-6"
              >
                <div className="text-[var(--color-purple-mid)] uppercase tracking-wider text-sm">Synthesis Complete</div>
                <h2 className="text-2xl md:text-3xl font-display text-white drop-shadow-[0_0_10px_#6c00ff]">THE ENGINEER</h2>
                <p className="text-lg text-[var(--color-text-dim)]">"Built AI tools across Morgan Stanley's ecosystem"</p>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="bg-[rgba(108,0,255,0.1)] border border-[rgba(108,0,255,0.3)] px-4 py-2">
                    <span className="text-[var(--color-neon-cyan)] font-data font-bold">45%</span> faster test authoring
                  </div>
                  <div className="bg-[rgba(108,0,255,0.1)] border border-[rgba(108,0,255,0.3)] px-4 py-2">
                    <span className="text-[var(--color-neon-cyan)] font-data font-bold">30×</span> validation speed
                  </div>
                </div>
              </motion.div>
            )}

            {progress >= 0.75 && (
              <motion.div 
                key="p4"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="flex flex-col gap-4 font-body border-l-2 border-[var(--color-pink-neon)] pl-6"
              >
                <div className="text-[var(--color-pink-neon)] uppercase tracking-wider text-sm">Central Processing</div>
                <h2 className="text-2xl md:text-3xl font-display text-white drop-shadow-[0_0_10px_#ff2d9b]">THE BRAIN</h2>
                <p className="text-xl text-[var(--color-text-primary)]">The logic behind the tools that power Morgan Stanley.</p>
                <p className="text-[var(--color-text-dim)] text-sm mt-4 tracking-widest uppercase">
                  [ Java ] [ React ] [ Node.js ] [ TypeScript ]
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
