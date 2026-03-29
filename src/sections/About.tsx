import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView } from 'framer-motion';
import { audioManager } from '@/audio/audioManager';

const FloatingStars = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 30;
      arr[i*3+1] = (Math.random() - 0.5) * 20;
      arr[i*3+2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.015; });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00C8FF" size={0.04} sizeAttenuation depthWrite={false} opacity={0.3} />
    </Points>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [terminalOutput, setTerminalOutput] = React.useState('');
  const [typed, setTyped] = React.useState(false);

  const yaml = `> cat vidhey.yaml

name: "Vidhey Bhogadi"
role: "Systems Engineer (SDE + SDET)"
company: "TCS × Morgan Stanley"
location: "Whitefield, Bangalore 560066"
experience: "1.5+ years"
cgpa: 8.65

stack:
  - MERN / MEAN Stack
  - Machine Learning & NLP
  - Android (Java + Firebase)
  - Spring MVC, Django, Flask

dream: "FAANG-equivalent product company"
building: "Playwright MCP Agents"
learning: ["GenAI","Agentic AI","Cybersecurity"]`;

  React.useEffect(() => {
    if (isInView && !typed) {
      setTyped(true);
      let i = 0;
      const type = () => {
        if (i <= yaml.length) {
          setTerminalOutput(yaml.slice(0, i++));
          setTimeout(type, 13);
        }
      };
      type();
    }
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-deep)] flex items-center py-24 overflow-hidden"
    >
      {/* 3D starfield background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <FloatingStars />
        </Canvas>
      </div>

      {/* Circuit bg */}
      <div className="absolute inset-0 circuit-bg opacity-[0.05] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-14 items-center">

        {/* ── LEFT: Profile card ─────────────── */}
        <motion.div
          initial={{ x: -60, opacity: 0, y: -40 }}
          animate={isInView ? { x: 0, opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          className="w-full lg:w-2/5 flex flex-col items-center gap-8"
        >
          {/* Holographic profile card */}
          <div
            className="relative w-72 h-80 border border-[rgba(0,200,255,0.25)] overflow-hidden rounded-sm scanlines holo-card group"
            style={{
              background: 'linear-gradient(145deg, rgba(13,17,48,0.95), rgba(5,7,15,0.9))',
              boxShadow: '0 0 40px rgba(0,200,255,0.12), 0 0 80px rgba(168,85,247,0.06)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            }}
            onMouseMove={(e: any) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = (e.clientX - rect.left) / rect.width - 0.5;
              const cy = (e.clientY - rect.top) / rect.height - 0.5;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${-cy * 12}deg) rotateY(${cx * 12}deg) translateZ(10px)`;
              e.currentTarget.style.boxShadow = `0 0 60px rgba(0,200,255,0.25), 0 0 120px rgba(168,85,247,0.1)`;
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0,200,255,0.12), 0 0 80px rgba(168,85,247,0.06)';
            }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-purple)] to-transparent" />

            {/* Profile photo */}
            <img
              src="/images/profile.jpg"
              alt="Vidhey Bhogadi"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'contrast(1.05) brightness(0.88)' }}
            />

            {/* HUD overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              <div className="flex justify-between items-start">
                <span className="font-code text-[10px] text-[var(--color-cyan)] bg-[rgba(5,7,15,0.7)] px-2 py-1">
                  SYS.ENGINEER.PRIME
                </span>
                <span className="font-code text-[10px] text-[var(--color-purple)] bg-[rgba(5,7,15,0.7)] px-2 py-1">
                  TCS × MS
                </span>
              </div>
              <div className="bg-[rgba(5,7,15,0.8)] border-t border-[rgba(0,200,255,0.2)] p-3">
                <div className="font-display text-white text-base font-bold">VIDHEY BHOGADI</div>
                <div className="font-code text-[var(--color-cyan)] text-xs mt-1">Bangalore, India 🇮🇳</div>
              </div>
            </div>
          </div>

          {/* Quick stat chips */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {[
              { label: 'Experience', val: '1.5+ YRS' },
              { label: 'CGPA', val: '8.65' },
              { label: 'Projects', val: '6+' },
              { label: 'Awards', val: '4' },
            ].map((s, i) => (
              <div
                key={i}
                className="border border-[rgba(0,200,255,0.15)] px-4 py-3 flex flex-col gap-1 transition-all duration-300 hover:border-[var(--color-cyan)] hover:shadow-[0_0_15px_rgba(0,200,255,0.2)] group"
                style={{ background: 'rgba(13,17,48,0.6)' }}
                onMouseEnter={() => audioManager.play('hoverTick')}
              >
                <span className="font-code text-xs text-[var(--color-text-dim)] uppercase tracking-widest">{s.label}</span>
                <span className="font-display text-lg text-[var(--color-cyan)] font-bold">[{s.val}]</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Terminal + prose ─────────── */}
        <motion.div
          initial={{ x: 60, opacity: 0, y: -40 }}
          animate={isInView ? { x: 0, opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.15 }}
          className="w-full lg:w-3/5 flex flex-col gap-8"
        >
          <div>
            <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-3">Curious About Me?</p>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-5">
              The <span className="gradient-text">Identity</span>
            </h2>
            <p className="font-body text-[var(--color-text-dim)] text-base leading-relaxed mb-2">
              A professional and enthusiastic programmer with a quality-first mindset — a rare blend of SDE and SDET. Exploring new technologies and solving enterprise-scale problems are my passions.
            </p>
            <p className="font-body text-[var(--color-text-dim)] text-base leading-relaxed">
              At TCS, within Morgan Stanley's Wealth Management division, I build AI-powered developer tools that systematically eliminate manual inefficiencies.
            </p>
          </div>

          {/* Terminal card */}
          <div className="border border-[rgba(0,200,255,0.2)] rounded-sm overflow-hidden" style={{ background: 'rgba(5,7,15,0.9)' }}>
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 h-9 border-b border-[rgba(0,200,255,0.12)]" style={{ background: 'rgba(13,17,48,0.8)' }}>
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-code text-xs text-[var(--color-text-dim)] tracking-widest">root@vidhey:~</span>
            </div>
            <div className="p-5 font-code text-sm text-[var(--color-cyan)] whitespace-pre-wrap leading-relaxed h-[280px] overflow-y-auto">
              {terminalOutput}
              <span className="typewriter-cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
