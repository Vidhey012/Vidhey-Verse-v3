import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { audioManager } from '@/audio/audioManager';

const projects = [
  {
    id: 1,
    title: 'JNTU Web Application',
    subtitle: 'University Website',
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    impact: '+50% Traffic · −30% Bounce Rate',
    role: 'Website Administrator',
    desc: 'Full university web platform redesign serving thousands of students daily with real-time updates and academic portal access.',
    img: '/images/projects/Project-4.png',
    color: '#00C8FF',
    tilt: -8,
    offsetY: 0,
  },
  {
    id: 2,
    title: 'Stegno-Gift',
    subtitle: 'Steganography App',
    stack: ['HTML', 'CSS', 'JavaScript', 'XOR Cipher', 'Canvas API'],
    impact: 'Hidden messaging inside images',
    role: 'Solo Developer',
    desc: 'Hide secret messages inside images using Unicode binary encoding with Morse code. Zero server infrastructure required.',
    img: '/images/projects/Project-2.png',
    color: '#A855F7',
    tilt: 5,
    offsetY: 40,
  },
  {
    id: 3,
    title: 'Control Center',
    subtitle: 'Android Mobile App',
    stack: ['Android Studio', 'Java', 'Firebase', 'XML'],
    impact: '−50% Response Time · +40% Engagement',
    role: 'Android Developer',
    desc: 'Real-time control center mobile app with Firebase backend, live notifications and dark-mode UI optimised for power users.',
    img: '/images/projects/Project-3.png',
    color: '#4ADE80',
    tilt: -4,
    offsetY: 20,
  },
  {
    id: 4,
    title: 'JBot ML Chatbot',
    subtitle: 'AI University Assistant',
    stack: ['Python', 'Django', 'FFNN', 'NLP', 'NLTK'],
    impact: '24/7 On JNTUK Official Website',
    role: 'ML Engineer',
    desc: 'Feed-Forward Neural Network chatbot trained on university data. Answers 500+ college queries. Live on JNTUK website.',
    img: '/images/projects/Project-1.png',
    color: '#F59E0B',
    tilt: 6,
    offsetY: -20,
  },
];

/* Floating screen that bobs */
const FloatingScreen = ({ project, isActive, onClick }: {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const show = hovered || isActive;

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        perspective: '1200px',
        marginTop: project.offsetY,
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3 + project.id * 0.7, repeat: Infinity, ease: 'easeInOut' }}
      onMouseEnter={() => { setHovered(true); audioManager.play('hoverTick'); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{
          rotateY: show ? 0 : project.tilt,
          translateZ: show ? 30 : 0,
          scale: show ? 1.04 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Monitor bezel */}
        <div
          className="relative border-2 rounded-sm overflow-hidden transition-all duration-400"
          style={{
            borderColor: show ? project.color : `${project.color}40`,
            boxShadow: show
              ? `0 0 40px ${project.color}55, 0 0 80px ${project.color}22, inset 0 0 20px ${project.color}08`
              : '0 20px 60px rgba(0,0,0,0.6)',
            width: '280px',
            background: 'rgba(5,7,15,0.95)',
          }}
        >
          {/* Monitor top bar */}
          <div className="flex items-center gap-1.5 px-3 h-7 border-b" style={{ borderColor: `${project.color}30`, background: 'rgba(13,17,48,0.8)' }}>
            <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <div className="w-2 h-2 rounded-full bg-[#28C840]" />
            <span className="ml-2 font-code text-[9px] text-[var(--color-text-dim)] tracking-widest truncate">{project.subtitle}</span>
          </div>

          {/* Screenshot */}
          <div className="relative h-40 overflow-hidden scanlines">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500"
              style={{ transform: show ? 'scale(1.08)' : 'scale(1)' }}
            />
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${project.color}15 100%)`,
                mixBlendMode: 'screen',
              }}
            />
            {/* CRT flicker glow */}
            {show && (
              <div className="absolute inset-0 pointer-events-none animate-pulse" style={{ background: `radial-gradient(ellipse at center, ${project.color}15 0%, transparent 70%)` }} />
            )}
          </div>

          {/* Info panel below screen */}
          <div className="p-4">
            <div className="font-display text-sm font-bold mb-1" style={{ color: project.color }}>{project.title}</div>
            <div className="font-code text-[10px] text-[var(--color-text-dim)] mb-3">{project.impact}</div>

            {/* Tech stack tags float up */}
            <motion.div
              className="flex flex-wrap gap-1"
              animate={{ y: show ? 0 : 8, opacity: show ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {project.stack.slice(0, 3).map((t, i) => (
                <span key={i} className="font-code text-[9px] px-1.5 py-0.5 border rounded"
                  style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}>
                  {t}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="font-code text-[9px] px-1.5 py-0.5 text-[var(--color-text-dim)]">+{project.stack.length - 3}</span>
              )}
            </motion.div>

            {/* VIEW button materialises on hover */}
            <motion.div
              animate={{ opacity: show ? 1 : 0, y: show ? 0 : 6 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <button
                className="w-full font-code text-xs py-1.5 border tracking-widest uppercase transition-all"
                style={{ borderColor: project.color, color: project.color, background: `${project.color}10` }}
              >
                VIEW PROJECT →
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full min-h-screen bg-[var(--color-deep)] py-24 overflow-hidden">
      {/* Background depth grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: 'perspective(800px) rotateX(20deg)',
          transformOrigin: 'top center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          className="text-center mb-20"
        >
          <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-3">What I've Built</p>
          <h2 className="font-display text-3xl md:text-5xl text-white uppercase">
            Holographic <span className="gradient-text">Projects</span>
          </h2>
          <p className="font-body text-[var(--color-text-dim)] mt-3 text-sm">Floating in 3D space — hover to inspect</p>
        </motion.div>

        {/* Floating screens in 3D perspective space */}
        <div
          className="flex flex-wrap justify-center gap-10 lg:gap-20 items-end pb-12"
          style={{ perspective: '1500px' }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: -80, rotateY: p.tilt * 3 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ type: 'spring', stiffness: 70, damping: 15, delay: i * 0.12 }}
            >
              <FloatingScreen
                project={p}
                isActive={active === p.id}
                onClick={() => setActive(active === p.id ? null : p.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Detail panel for active project */}
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-10 max-w-2xl mx-auto border p-8 rounded-sm"
            style={{
              borderColor: `${projects[active-1]?.color}40`,
              background: 'rgba(13,17,48,0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 40px ${projects[active-1]?.color}22`,
            }}
          >
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: projects[active-1]?.color }}>
              {projects[active-1]?.title}
            </h3>
            <p className="font-code text-xs text-[var(--color-text-dim)] mb-4 uppercase tracking-widest">
              Role: {projects[active-1]?.role}
            </p>
            <p className="font-body text-[var(--color-text-dim)] leading-relaxed mb-4">{projects[active-1]?.desc}</p>
            <div className="flex flex-wrap gap-2">
              {projects[active-1]?.stack.map((t, i) => (
                <span key={i} className="font-code text-xs px-2 py-1 border rounded"
                  style={{ color: projects[active-1]?.color, borderColor: `${projects[active-1]?.color}50` }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
