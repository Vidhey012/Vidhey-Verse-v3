import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';

const stars = [
  {
    name: 'JNTU Kakinada',
    short: 'B.Tech CSE',
    period: '2021 – 2024',
    details: 'B.Tech Computer Science & Engineering · CGPA: 8.65 · Prathibha Puraskar State Merit Award',
    color: '#00C8FF',
    pos: [2.5, 1.5, 0],
    size: 0.22,
  },
  {
    name: 'AANM & VVRSR Polytechnic',
    short: 'Diploma CS',
    period: '2018 – 2021',
    details: 'Diploma in Computer Science · Graduated with Distinction · Foundation in core CS & electronics',
    color: '#A855F7',
    pos: [-2, 0.5, 0],
    size: 0.17,
  },
  {
    name: 'Montessori High School',
    short: 'SSC Board',
    period: '2008 – 2018',
    details: 'Secondary School Certificate (SSC) · Top academic performer · Robotics & coding clubs',
    color: '#F59E0B',
    pos: [0, -2, 0],
    size: 0.13,
  },
];

const StarBackground = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 500;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i*3]   = (Math.random() - 0.5) * 40;
      a[i*3+1] = (Math.random() - 0.5) * 30;
      a[i*3+2] = (Math.random() - 0.5) * 5;
    }
    return a;
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.008; });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  );
};

const ConstellationStar = ({ star, active, onHover }: {
  star: typeof stars[0];
  active: boolean;
  onHover: (v: boolean) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    const t = active ? 2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(t, t, t), 0.1);
  });
  return (
    <mesh
      ref={meshRef}
      position={star.pos as [number,number,number]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={() => onHover(false)}
    >
      <sphereGeometry args={[star.size, 32, 32]} />
      <meshStandardMaterial color={star.color} emissive={star.color} emissiveIntensity={active ? 3 : 1.2} />
      {active && (
        <Html distanceFactor={14} center>
          <div className="pointer-events-none p-3 border rounded-sm whitespace-nowrap text-center"
            style={{ background: 'rgba(5,7,15,0.95)', borderColor: star.color, boxShadow: `0 0 20px ${star.color}55`, minWidth: '180px' }}>
            <div className="font-display text-sm text-white font-bold mb-1">{star.name}</div>
            <div className="font-code text-xs mb-1" style={{ color: star.color }}>{star.short} · {star.period}</div>
            <div className="font-body text-xs text-[#6B7DB0] leading-relaxed">{star.details}</div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

const ConstellationLines = () => {
  const lines = useMemo(() => [
    { start: stars[0].pos, end: stars[1].pos, color: '#00C8FF' },
    { start: stars[1].pos, end: stars[2].pos, color: '#A855F7' },
  ], []);
  return (
    <>
      {lines.map((l, i) => {
        const start = new THREE.Vector3(...l.start as [number,number,number]);
        const end   = new THREE.Vector3(...l.end   as [number,number,number]);
        const mid   = start.clone().add(end).multiplyScalar(0.5);
        const len   = start.distanceTo(end);
        const dir   = end.clone().sub(start).normalize();
        const q     = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0), dir);
        return (
          <mesh key={i} position={mid} quaternion={q}>
            <cylinderGeometry args={[0.01, 0.01, len, 8]} />
            <meshBasicMaterial color={l.color} transparent opacity={0.35} />
          </mesh>
        );
      })}
    </>
  );
};

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section id="education" ref={sectionRef} className="relative w-full h-screen bg-[var(--color-void)] overflow-hidden">
      <div className="absolute top-16 left-0 w-full text-center z-10 pointer-events-none">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 80, damping: 14 }}>
          <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-2">Academic Journey</p>
          <h2 className="font-display text-3xl md:text-5xl text-white uppercase">
            Education <span className="gradient-text">Constellation</span>
          </h2>
          <p className="font-body text-[var(--color-text-dim)] text-sm mt-2">Hover a star to explore</p>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} color="#00C8FF" intensity={2} />
          <pointLight position={[-5, -5, -5]} color="#A855F7" intensity={1.5} />
          <StarBackground />
          <ConstellationLines />
          {stars.map((star, i) => (
            <ConstellationStar
              key={i}
              star={star}
              active={activeIdx === i}
              onHover={v => setActiveIdx(v ? i : null)}
            />
          ))}
        </Canvas>
      </div>

      {/* Bottom list */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 z-10 flex-wrap px-4">
        {stars.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <span className="font-code text-xs text-[var(--color-text-dim)]">{s.short} · {s.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
