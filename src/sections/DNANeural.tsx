import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/* ────────────────────────────────────────────────────────────
   DNA → Neural Network Section
   
   Phase 1 (0-0.4):   Double helix DNA unwinds from top to bottom
   Phase 2 (0.4-0.7): Helix strands pull apart and reorganise
   Phase 3 (0.7-1.0): Neural network forms with pulsing signals
   ──────────────────────────────────────────────────────────── */

const DNA_SKILLS = [
  'React', 'Python', 'ML', 'MySQL', 'MongoDB',
  'Android', 'Node.js', 'TensorFlow', 'Django', 'PostgreSQL',
  'NLP', 'Firebase',
];

/* ── Helix geometry ─────────── */
const DNAHelix = ({ phase }: { phase: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Strand 1 points
  const strand1 = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const angle = t * Math.PI * 6;
      const spread = 1.0 + phase * 0.8; // strands pull apart in phase 2+
      pts.push(new THREE.Vector3(
        Math.cos(angle) * spread,
        t * 8 - 4,
        Math.sin(angle) * spread
      ));
    }
    return pts;
  }, [phase]);

  const strand2 = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const angle = t * Math.PI * 6 + Math.PI;
      const spread = 1.0 + phase * 0.8;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * spread,
        t * 8 - 4,
        Math.sin(angle) * spread
      ));
    }
    return pts;
  }, [phase]);

  const curve1 = useMemo(() => new THREE.CatmullRomCurve3(strand1), [strand1]);
  const curve2 = useMemo(() => new THREE.CatmullRomCurve3(strand2), [strand2]);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 — cyan */}
      <mesh>
        <tubeGeometry args={[curve1, 120, 0.025, 8, false]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={0.9 - phase * 0.5} />
      </mesh>
      {/* Strand 2 — purple */}
      <mesh>
        <tubeGeometry args={[curve2, 120, 0.025, 8, false]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.9 - phase * 0.5} />
      </mesh>

      {/* Rungs with skill labels */}
      {DNA_SKILLS.slice(0, 8).map((skill, i) => {
        const t = i / 7;
        const angle = t * Math.PI * 6;
        const spread = 1.0 + phase * 0.8;
        const y = t * 8 - 4;
        const p1 = new THREE.Vector3(Math.cos(angle) * spread, y, Math.sin(angle) * spread);
        const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * spread, y, Math.sin(angle + Math.PI) * spread);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const opacity = Math.max(0, 1 - phase * 2);

        return (
          <group key={i}>
            {/* Rung line */}
            <mesh position={mid}>
              <boxGeometry args={[p1.distanceTo(p2), 0.015, 0.015]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={opacity * 0.4} />
            </mesh>
            {/* Skill label on rung */}
            {opacity > 0.3 && (
              <Html position={[mid.x, mid.y, mid.z]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: i % 2 === 0 ? '#00C8FF' : '#A855F7',
                  whiteSpace: 'nowrap',
                  opacity: opacity,
                  textShadow: `0 0 6px ${i % 2 === 0 ? '#00C8FF' : '#A855F7'}`,
                }}>
                  {skill}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

/* ── Neural Network graph ───── */
interface NeuralNode {
  pos: [number, number, number];
  label: string;
  color: string;
  connections: number[];
}

const NODES: NeuralNode[] = [
  { pos: [0, 0, 0],     label: 'MERN',       color: '#00C8FF', connections: [1, 2, 3] },
  { pos: [-2, 1.5, 0],  label: 'React',      color: '#A855F7', connections: [4] },
  { pos: [2, 1.5, 0],   label: 'Node.js',    color: '#A855F7', connections: [5] },
  { pos: [0, -2, 0],    label: 'MongoDB',    color: '#00C8FF', connections: [] },
  { pos: [-3, 0, 0],    label: 'Python',     color: '#F59E0B', connections: [6, 7] },
  { pos: [3, 0, 0],     label: 'MySQL',      color: '#F59E0B', connections: [] },
  { pos: [-2, -1.5, 0], label: 'ML',         color: '#00C8FF', connections: [8, 9] },
  { pos: [-4, -1, 0],   label: 'Django',     color: '#A855F7', connections: [] },
  { pos: [-1.5, -3, 0], label: 'TensorFlow', color: '#A855F7', connections: [] },
  { pos: [1, -3, 0],    label: 'NLP',        color: '#A855F7', connections: [] },
];

const NeuralNetwork = ({ opacity }: { opacity: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {NODES.map((node, i) => (
        <group key={i}>
          {/* Node sphere */}
          <mesh position={node.pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={1.5} />
          </mesh>
          {/* Label */}
          <Html position={[node.pos[0], node.pos[1] + 0.35, node.pos[2]]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: node.color,
              whiteSpace: 'nowrap',
              opacity,
              textShadow: `0 0 8px ${node.color}`,
            }}>{node.label}</span>
          </Html>
          {/* Connection lines */}
          {node.connections.map((targetIdx) => {
            const target = NODES[targetIdx];
            const start = new THREE.Vector3(...node.pos);
            const end = new THREE.Vector3(...target.pos);
            const mid = start.clone().add(end).multiplyScalar(0.5);
            const len = start.distanceTo(end);
            const dir = end.clone().sub(start).normalize();
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              dir
            );
            return (
              <mesh key={targetIdx} position={mid} quaternion={quaternion}>
                <cylinderGeometry args={[0.012, 0.012, len, 8]} />
                <meshBasicMaterial color={node.color} transparent opacity={opacity * 0.5} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
};

/* ── Main Section ─────────── */
export const DNANeural: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Phase calculations
  const dnaPhase    = Math.max(0, Math.min(1, (progress - 0.4) / 0.3)); // how much helix has dissolved
  const neuralOpacity = Math.max(0, Math.min(1, (progress - 0.65) / 0.2));

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[var(--color-void)]"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row items-center overflow-hidden">

        {/* 3D canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} color="#00C8FF" intensity={2} />
            <pointLight position={[-5, -5, -5]} color="#A855F7" intensity={1.5} />

            {/* DNA helix — fades out as phase increases */}
            {progress < 0.85 && <DNAHelix phase={dnaPhase} />}

            {/* Neural network — fades in from phase 0.65 */}
            {progress > 0.6 && (
              <group position={[0, 0, 0]}>
                <NeuralNetwork opacity={neuralOpacity} />
              </group>
            )}
          </Canvas>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 w-full md:w-[40%] md:ml-auto px-8 md:px-12 flex flex-col justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-3">
              {progress < 0.4 ? 'Genetic Code' : progress < 0.7 ? 'Morphing...' : 'Neural Synthesis'}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-6">
              {progress < 0.7 ? (
                <>My skills form a <span className="text-[var(--color-cyan)]">double helix</span> —<br />coded deep.</>
              ) : (
                <>They connect into a <span className="text-[var(--color-purple)]">neural network</span> —<br />always evolving.</>
              )}
            </h2>
            <p className="font-body text-[var(--color-text-dim)] leading-relaxed">
              "My skills aren't a list. They're a neural network — interconnected, evolving, intelligent."
            </p>

            {/* Progress indicator */}
            <div className="mt-8 flex flex-col gap-2">
              {['DNA Helix Forms', 'Strands Separate', 'Neural Network'].map((label, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: progress > i * 0.3 ? (i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-purple)') : 'var(--color-border)',
                      boxShadow: progress > i * 0.3 ? `0 0 8px ${i % 2 === 0 ? '#00C8FF' : '#A855F7'}` : 'none',
                    }}
                  />
                  <span
                    className="font-code text-xs uppercase tracking-widest transition-colors duration-500"
                    style={{ color: progress > i * 0.3 ? 'var(--color-text)' : 'var(--color-text-dim)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
