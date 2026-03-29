import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Grid, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import * as THREE from 'three';

/* ─── Floating particle field ───────────────────────── */
const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00C8FF" size={0.07} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
};

/* ─── Iron Man Suit-Up Core ─────────────────────────── */
const SuitUpCore = ({ progress }: { progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = s.clock.elapsedTime * 0.15 + progress * Math.PI * 2;
  });

  // Phase 1: 0-0.3  — wireframe icosahedron (human silhouette)
  // Phase 2: 0.3-0.6 — solid geo builds up, circuits
  // Phase 3: 0.6-0.8 — armored outer shell
  // Phase 4: 0.8-1.0 — CPU chip explosion

  const p1 = Math.max(0, Math.min(1, progress / 0.3));
  const p2 = Math.max(0, Math.min(1, (progress - 0.3) / 0.3));
  const p3 = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));
  const p4 = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));

  return (
    <group ref={groupRef}>
      {/* Inner wireframe — always visible (human core) */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#00C8FF"
          wireframe
          transparent
          opacity={0.6 - p4 * 0.4}
          emissive="#00C8FF"
          emissiveIntensity={0.3 + p2 * 0.5}
        />
      </mesh>

      {/* Phase 2+: Solid metallic shell assembles */}
      {p2 > 0 && (
        <mesh scale={1.15 + p3 * 0.2}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial
            color="#0D1130"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={p2 * 0.9}
            emissive="#00C8FF"
            emissiveIntensity={p3 * 0.8}
          />
        </mesh>
      )}

      {/* Phase 3+: Outer armor ring */}
      {p3 > 0 && (
        <mesh scale={1.6 * p3 + 0.4}>
          <torusGeometry args={[1.5, 0.04, 16, 100]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={p3 * 0.9} />
        </mesh>
      )}
      {p3 > 0 && (
        <mesh scale={1.4 * p3 + 0.4} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.04, 16, 100]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={p3 * 0.7} />
        </mesh>
      )}

      {/* Phase 4: CPU explosion — scattered cubes */}
      {p4 > 0 && Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 2 + p4 * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, Math.sin(angle) * r * 0.5, Math.sin(angle) * r]}
            scale={0.3 * p4}
          >
            <boxGeometry args={[1, 0.15, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00C8FF" : "#A855F7"}
              emissive={i % 2 === 0 ? "#00C8FF" : "#A855F7"}
              emissiveIntensity={1.5}
              transparent
              opacity={p4 * 0.9}
            />
          </mesh>
        );
      })}

      {/* Core glow sphere */}
      <mesh scale={0.4 + p3 * 0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          emissive={progress > 0.6 ? "#A855F7" : "#00C8FF"}
          emissiveIntensity={2 + p3 * 2}
          color="#000"
        />
      </mesh>
    </group>
  );
};

/* ────────────────── HERO ──────────────────────────── */
export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  const words = [
    "Systems Engineer",
    "Full Stack Developer",
    "ML Engineer",
    "Drone Systems Developer",
  ];
  const [wordIdx, setWordIdx] = React.useState(0);
  const [displayed, setDisplayed] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((wordIdx + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIdx]);

  // Phases driven by scroll progress
  const phase = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;
  const phaseLabels = ['HUMAN CORE', 'ASSEMBLING ARMOR', 'SUIT ONLINE', 'CPU EXPLOSION'];
  const phaseColors = ['#00C8FF', '#A855F7', '#00C8FF', '#A855F7'];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 3.0 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[var(--color-void)]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row">

        {/* ── LEFT: Text content ──────────────── */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={itemVariants}
              className="font-code text-xs tracking-[0.4em] uppercase"
              style={{ color: phaseColors[phase - 1] }}
            >
              {phaseLabels[phase - 1]} — TCS × Morgan Stanley
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display font-bold leading-[0.95] gradient-text"
            >
              Hey there,<br />
              I'm Vidhey<br />
              <span className="text-white">Bhogadi.</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="flex items-center gap-2 h-8">
              <span className="w-[3px] h-full bg-[var(--color-purple)]" />
              <p className="font-body text-lg text-[var(--color-text-dim)]">
                {displayed}
                <span className="typewriter-cursor" />
              </p>
            </motion.div>

            {/* Floating code panel */}
            <motion.div
              variants={itemVariants}
              className="font-code text-sm bg-[rgba(13,17,48,0.8)] border border-[rgba(0,200,255,0.15)] p-5 rounded-sm relative overflow-hidden max-w-[380px]"
              style={{ backdropFilter: 'blur(12px)', transform: 'perspective(800px) rotateX(2deg) rotateY(-5deg)' }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent" />
              <span className="text-[var(--color-text-dim)]">const </span>
              <span className="text-[var(--color-purple)]">profile</span>
              <span className="text-[var(--color-text-dim)]"> = {`{`}</span>
              <br />
              <span className="text-[var(--color-text-dim)] pl-4">name: </span>
              <span className="text-[var(--color-cyan)]">'Vidhey Bhogadi'</span>
              <span className="text-[var(--color-text-dim)]">,</span>
              <br />
              <span className="text-[var(--color-text-dim)] pl-4">hireable: </span>
              <span style={{ color: '#4ADE80' }}>true</span>
              <span className="text-[var(--color-text-dim)]">,</span>
              <br />
              <span className="text-[var(--color-text-dim)] pl-4">skills: </span>
              <span className="text-[var(--color-cyan)]">['MERN', 'ML', 'TCS', '...']</span>
              <br />
              <span className="text-[var(--color-text-dim)]">{`}`};</span>
            </motion.div>

            {/* Metric strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 pt-2 border-t border-[var(--color-border)]"
            >
              {[
                { v: '30×', l: 'Faster Validation', color: 'var(--color-cyan)' },
                { v: '45%', l: 'Faster Test Build', color: 'var(--color-purple)' },
                { v: '500+', l: 'Docs / Run', color: 'var(--color-cyan)' },
              ].map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-2xl font-bold" style={{ color: m.color, textShadow: `0 0 10px ${m.color}` }}>{m.v}</span>
                  <span className="font-code text-xs text-[var(--color-text-dim)] uppercase tracking-widest mt-1">{m.l}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-5 pt-2">
              <a
                href="#contact"
                className="btn-cyber font-code"
              >
                <span>Contact Me</span>
              </a>
              <a
                href="https://github.com/Vidhey012/Resume/blob/main/Vidhey_SDE_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-cyber btn-cyber-purple font-code"
              >
                <span>Get Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Phase progress indicator */}
          <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex gap-2">
            {[1,2,3,4].map(p => (
              <div
                key={p}
                className="h-1 transition-all duration-500"
                style={{
                  width: phase >= p ? '32px' : '8px',
                  background: phase === p ? 'var(--color-cyan)' : phase > p ? 'var(--color-purple)' : 'var(--color-border)',
                  boxShadow: phase === p ? '0 0 8px var(--color-cyan)' : 'none',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: 3D WebGL Canvas ───────────── */}
        <div className="absolute right-0 top-0 w-full md:w-[45%] h-full z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[-4, 2, 2]} color="#00C8FF" intensity={4} />
            <directionalLight position={[4, -2, 2]} color="#A855F7" intensity={3} />
            <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade speed={1} />
            <Grid
              position={[0, -3, -8]}
              args={[40, 40]}
              cellSize={1}
              cellThickness={1}
              cellColor="#00C8FF"
              sectionSize={5}
              sectionThickness={1.5}
              sectionColor="#A855F7"
              fadeDistance={25}
              infiniteGrid
            />
            <ParticleField />
            <SuitUpCore progress={progress} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.8} />
              <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
              <Vignette eskil={false} offset={0.1} darkness={1.0} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[var(--color-void)] to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
};
