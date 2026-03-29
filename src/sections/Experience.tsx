import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { audioManager } from '@/audio/audioManager';

const BgParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const pos = React.useMemo(() => {
    const a = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      a[i*3] = (Math.random()-0.5)*40; a[i*3+1] = (Math.random()-0.5)*30; a[i*3+2] = (Math.random()-0.5)*10;
    }
    return a;
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.01; });
  return (
    <Points ref={ref} positions={pos} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00C8FF" size={0.04} sizeAttenuation depthWrite={false} opacity={0.2} />
    </Points>
  );
};

const jobs = [
  {
    company: 'TATA CONSULTANCY SERVICES',
    client: '× Morgan Stanley',
    date: 'Nov 2024 – Present',
    role: 'Systems Engineer Prime',
    location: 'Bengaluru, India',
    isCurrent: true,
    color: '#00C8FF',
    tags: ['TypeScript', 'Java', 'Copilot', 'Playwright', 'Spring Boot'],
    bullets: [
      'BDD Auto Code Generator — 45% faster test authoring',
      'JSON Validator Full-Stack — 30× faster than manual',
      'PDF Visual Comparator — 500+ docs/run',
      'AI Chrome XPath Locator — 85% accuracy',
    ],
  },
  {
    company: 'GalaxE Solutions',
    client: '/ DataValley.AI',
    date: 'Feb 2024 – Apr 2024',
    role: 'Full Stack Developer Intern',
    location: 'Bengaluru, India',
    isCurrent: false,
    color: '#A855F7',
    tags: ['Java', 'Spring MVC', 'PostgreSQL', 'REST APIs'],
    bullets: [
      'Built full-stack Student Portal with RESTful APIs',
      '1,000+ active users · 80% improvement in progress tracking',
    ],
  },
  {
    company: 'TronTech Labs',
    client: '',
    date: 'May 2023 – Jul 2023',
    role: 'Drone Subsystem Developer',
    location: 'Bengaluru, India',
    isCurrent: false,
    color: '#F59E0B',
    tags: ['Arduino', 'Python', 'Embedded C', 'RF Systems'],
    bullets: [
      'Developed drone subsystem control logic',
      'High-performance e-commerce portfolio website',
    ],
  },
];

const TimelineEntry = ({ job, index }: { job: typeof jobs[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start w-full my-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Spark node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div
          className="w-5 h-5 rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: job.color,
            background: isInView ? job.color : 'var(--color-void)',
            boxShadow: isInView ? `0 0 20px ${job.color}, 0 0 40px ${job.color}55` : 'none',
          }}
        />
        {job.isCurrent && (
          <span
            className="mt-2 font-code text-[9px] tracking-widest uppercase px-2 py-0.5 border"
            style={{ color: job.color, borderColor: job.color, boxShadow: `0 0 8px ${job.color}55` }}
          >
            LIVE
          </span>
        )}
      </div>

      {/* Card */}
      <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-10' : 'pl-10'} flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60, y: -30 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: index * 0.08 }}
          className="w-full max-w-md"
          onMouseEnter={() => audioManager.play('hoverTick')}
        >
          <div
            className="relative border p-6 rounded-sm overflow-hidden group transition-all duration-400"
            style={{
              borderColor: `${job.color}30`,
              background: 'rgba(13,17,48,0.85)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseOver={(e: any) => {
              e.currentTarget.style.borderColor = job.color;
              e.currentTarget.style.boxShadow = `0 0 30px ${job.color}33, inset 0 0 20px ${job.color}08`;
              e.currentTarget.style.transform = `perspective(1000px) rotateY(${isLeft ? '3deg' : '-3deg'}) translateZ(10px)`;
            }}
            onMouseOut={(e: any) => {
              e.currentTarget.style.borderColor = `${job.color}30`;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {/* Top glow bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, transparent, ${job.color}, transparent)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity circuit-bg pointer-events-none" />

            <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
              <div>
                <h3 className="font-display text-sm font-bold leading-tight" style={{ color: job.color, textShadow: `0 0 10px ${job.color}88` }}>
                  {job.company}
                  {job.client && <span className="text-[var(--color-text-dim)] font-normal"> {job.client}</span>}
                </h3>
              </div>
              <span className="font-code text-xs text-[var(--color-text-dim)] bg-[var(--color-void)] px-2 py-1 border border-[rgba(255,255,255,0.06)] rounded shrink-0">
                {job.date}
              </span>
            </div>

            <div className="font-body text-base text-white font-medium mb-1">{job.role}</div>
            <div className="font-code text-xs text-[var(--color-text-dim)] mb-4">{job.location}</div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-code text-[10px] px-2 py-0.5 border rounded transition-all group-hover:border-opacity-60"
                  style={{ color: job.color, borderColor: `${job.color}30`, background: `${job.color}08` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="space-y-1.5">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm font-body text-[var(--color-text-dim)] leading-relaxed">
                  <span className="shrink-0 mt-0.5" style={{ color: job.color }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-24 bg-[var(--color-void)] overflow-hidden">
      {/* 3D particle bg */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <BgParticles />
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <torusGeometry args={[8, 0.02, 8, 120]} />
            <meshBasicMaterial color="#00C8FF" transparent opacity={0.08} />
          </mesh>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-16">
        <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-3">Career History</p>
        <h2 className="font-display text-3xl md:text-5xl text-white uppercase">
          Work <span className="gradient-text">Experience</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Neon timeline wire */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--color-cyan) 15%, var(--color-purple) 85%, transparent)',
            boxShadow: '0 0 15px rgba(0,200,255,0.4), 0 0 30px rgba(0,200,255,0.15)',
          }}
        />
        <div className="relative z-10 py-8">
          {jobs.map((job, i) => <TimelineEntry key={i} job={job} index={i} />)}
        </div>
      </div>
    </section>
  );
};
