import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { audioManager } from '@/audio/audioManager';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const skillGroups = {
  Web:    { color: '#00C8FF', skills: ['React','Angular','Node.js','PHP','Django','Flask','Express'] },
  DB:     { color: '#A855F7', skills: ['MySQL','PostgreSQL','MongoDB','Firebase','SQLite'] },
  ML:     { color: '#F59E0B', skills: ['Python','TensorFlow','NLP','FFNN','Scikit-learn'] },
  Mobile: { color: '#4ADE80', skills: ['Android','Java','Firebase','XML','Gradle'] },
  Tools:  { color: '#F472B6', skills: ['Git','GitHub','Spring MVC','CodeIgniter','Docker'] },
};

interface SkillNodeProps {
  skill: string;
  category: string;
  color: string;
  position: [number, number, number];
  size: number;
}

const SkillNode = ({ skill, category, color, position, size }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((s) => {
    if (!meshRef.current) return;
    const target = hovered ? 1.8 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
    if (hovered) {
      meshRef.current.position.lerp(new THREE.Vector3(position[0] * 0.6, position[1] * 0.6, position[2] * 0.6), 0.1);
    } else {
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.05);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHovered(true); audioManager.play('hoverTick'); }}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2.5 : 0.6}
        roughness={0.1}
        metalness={0.9}
      />
      {hovered && (
        <Html distanceFactor={14} center>
          <div className="pointer-events-none px-3 py-2 rounded-sm border whitespace-nowrap flex flex-col items-center gap-1"
            style={{ background: 'rgba(5,7,15,0.95)', borderColor: color, boxShadow: `0 0 20px ${color}66` }}>
            <span className="font-display text-white text-sm font-bold">{skill}</span>
            <span className="font-code text-[10px] uppercase tracking-widest" style={{ color }}>{category}</span>
            {/* Proficiency bar */}
            <div className="w-20 h-1 bg-[rgba(255,255,255,0.1)] rounded mt-1">
              <div className="h-full rounded" style={{ width: `${60 + Math.random() * 35}%`, background: color }} />
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

const OrbitalSphere = () => {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const list: SkillNodeProps[] = [];
    Object.entries(skillGroups).forEach(([cat, { color, skills }]) => {
      skills.forEach(skill => {
        const u = Math.random(), v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 4.5 + Math.random() * 3;
        list.push({
          skill, category: cat, color,
          position: [
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi),
          ],
          size: [0.16, 0.13, 0.10][Math.floor(Math.random() * 3)],
        });
      });
    });
    return list;
  }, []);

  const connections = useMemo(() => {
    return nodes.flatMap((n, i) =>
      nodes.slice(i + 1).filter((m, j) => {
        const dx = n.position[0] - nodes[i+1+j].position[0];
        const dy = n.position[1] - nodes[i+1+j].position[1];
        const dz = n.position[2] - nodes[i+1+j].position[2];
        return dx*dx+dy*dy+dz*dz < 10 && n.category === nodes[i+1+j].category;
      }).map(m => ({ start: n.position, end: m.position, color: n.color }))
    );
  }, [nodes]);

  let drag = false, prevMouse = { x: 0, y: 0 };

  useFrame(() => {
    if (groupRef.current && !drag) {
      groupRef.current.rotation.y += 0.0018;
      groupRef.current.rotation.x += 0.0006;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={e => { drag = true; prevMouse = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={() => drag = false}
      onPointerLeave={() => drag = false}
      onPointerMove={e => {
        if (drag && groupRef.current) {
          const dx = e.clientX - prevMouse.x, dy = e.clientY - prevMouse.y;
          groupRef.current.rotation.y += dx * 0.008;
          groupRef.current.rotation.x += dy * 0.008;
          prevMouse = { x: e.clientX, y: e.clientY };
        }
      }}
    >
      {nodes.map((n, i) => <SkillNode key={i} {...n} />)}
      {connections.map((c, i) => (
        <Line
          key={i}
          points={[new THREE.Vector3(...c.start), new THREE.Vector3(...c.end)]}
          color={c.color}
          lineWidth={0.5}
          transparent
          opacity={0.25}
        />
      ))}
    </group>
  );
};

export const Skills: React.FC = () => (
  <section id="skills" className="relative w-full h-screen bg-[var(--color-void)] overflow-hidden">
    <div className="absolute top-16 left-0 w-full text-center z-10 pointer-events-none">
      <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-2">Skills Arsenal</p>
      <h2 className="font-display text-3xl md:text-5xl text-white uppercase">
        Orbital <span className="gradient-text">Sphere</span>
      </h2>
      <p className="font-body text-[var(--color-text-dim)] text-sm mt-2">Drag to rotate · Hover to inspect</p>
    </div>

    <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 13], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00C8FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#A855F7" />
        <OrbitalSphere />
        <EffectComposer>
          <Bloom luminanceThreshold={0.4} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>

    {/* Legend */}
    <div className="absolute bottom-8 left-0 w-full flex justify-center gap-6 z-10 pointer-events-none flex-wrap px-4">
      {Object.entries(skillGroups).map(([cat, { color }]) => (
        <div key={cat} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="font-code text-xs text-[var(--color-text-dim)]">{cat}</span>
        </div>
      ))}
    </div>
  </section>
);
