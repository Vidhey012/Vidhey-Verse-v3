'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useSceneStore } from '../3d/SceneProvider';

// ── Particle class for the canvas animation ──
class CinematicParticle {
  constructor(canvas, index, total) {
    this.canvas = canvas;
    this.index = index;
    this.total = total;

    // Start scattered
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 0.5 + Math.random() * 2;
    this.baseSpeed = 0.3 + Math.random() * 0.7;

    // Random velocity
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;

    // Color: purple / pink / cyan / mint
    const hues = [270, 330, 190, 160];
    this.hue = hues[Math.floor(Math.random() * hues.length)];
    this.saturation = 80 + Math.random() * 20;
    this.lightness = 50 + Math.random() * 30;
    this.alpha = 0.3 + Math.random() * 0.7;

    // Orbit properties
    this.orbitRadius = 50 + Math.random() * 200;
    this.orbitAngle = (index / total) * Math.PI * 2;
    this.orbitSpeed = 0.005 + Math.random() * 0.015;

    // Target position for convergence
    this.targetX = canvas.width / 2;
    this.targetY = canvas.height / 2;
  }

  update(phase, progress) {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;

    switch (phase) {
      case 'scatter':
        this.x += this.vx * this.baseSpeed;
        this.y += this.vy * this.baseSpeed;
        // Gentle gravity toward center
        const dxs = cx - this.x;
        const dys = cy - this.y;
        this.vx += dxs * 0.00002;
        this.vy += dys * 0.00002;
        break;

      case 'vortex':
        this.orbitAngle += this.orbitSpeed;
        this.orbitRadius *= 0.997; // Slowly spiral inward
        const targetVX = cx + Math.cos(this.orbitAngle) * this.orbitRadius;
        const targetVY = cy + Math.sin(this.orbitAngle) * this.orbitRadius;
        this.x += (targetVX - this.x) * 0.03;
        this.y += (targetVY - this.y) * 0.03;
        break;

      case 'converge':
        const dxc = cx - this.x;
        const dyc = cy - this.y;
        this.x += dxc * 0.015;
        this.y += dyc * 0.015;
        // Add slight jitter at center
        if (Math.abs(dxc) < 10) {
          this.x += (Math.random() - 0.5) * 2;
          this.y += (Math.random() - 0.5) * 2;
        }
        break;

      case 'pulse':
        // Gentle hover around center
        const dxp = cx - this.x;
        const dyp = cy - this.y;
        this.x += (Math.random() - 0.5) * 1.5 + dxp * 0.005;
        this.y += (Math.random() - 0.5) * 1.5 + dyp * 0.005;
        break;

      case 'burst':
        const dxb = this.x - cx;
        const dyb = this.y - cy;
        const dist = Math.sqrt(dxb * dxb + dyb * dyb) || 1;
        const burstForce = 8;
        this.x += (dxb / dist) * burstForce;
        this.y += (dyb / dist) * burstForce;
        this.alpha *= 0.97;
        break;
    }
  }

  draw(ctx) {
    const color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;

    // Outer glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha * 0.08})`;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// ── Main Preloader Component ──
export default function Preloader() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const animFrameRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const setPreloaderDone = useSceneStore((s) => s.setPreloaderDone);

  const dismiss = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        setVisible(false);
        setPreloaderDone();
      },
    });
  }, [setPreloaderDone]);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Create particles
    const particleCount = Math.min(250, Math.floor(w * 0.15));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CinematicParticle({ width: w, height: h }, i, particleCount));
    }

    let currentPhase = 'scatter';

    // ── Render loop ──
    const render = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(10, 14, 26, 0.12)';
      ctx.fillRect(0, 0, w, h);

      // Center glow (pulsing)
      const time = Date.now() * 0.001;
      const pulseSize = 80 + Math.sin(time * 2) * 30;
      const centerGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, pulseSize);
      centerGrad.addColorStop(0, `rgba(120, 73, 248, ${currentPhase === 'converge' ? 0.15 : 0.05})`);
      centerGrad.addColorStop(0.5, `rgba(120, 73, 248, ${currentPhase === 'converge' ? 0.05 : 0.02})`);
      centerGrad.addColorStop(1, 'rgba(120, 73, 248, 0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, w, h);

      // Use additive blending for particles
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p) => {
        p.update(currentPhase, 0);
        p.draw(ctx);
      });

      ctx.globalCompositeOperation = 'source-over';

      // Scan line effect
      const scanY = (time * 100) % h;
      ctx.fillStyle = 'rgba(120, 73, 248, 0.03)';
      ctx.fillRect(0, scanY, w, 2);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // ── GSAP Timeline ──
    const tl = gsap.timeline({
      onComplete: dismiss,
    });
    timelineRef.current = tl;

    // Phase 1: Scatter (already happening for 0.8s)
    tl.to({}, { duration: 0.8 });

    // Phase 2: Vortex
    tl.call(() => { currentPhase = 'vortex'; });
    tl.to({}, { duration: 1.5 });

    // Phase 3: Converge to center
    tl.call(() => { currentPhase = 'converge'; });
    tl.to({}, { duration: 1.0 });

    // Phase 4: Show logo text
    tl.call(() => { currentPhase = 'pulse'; });
    tl.fromTo(
      '.preloader-logo-line',
      { opacity: 0, y: 30, scale: 0.8, filter: 'blur(20px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );

    // Phase 5: Show version tag
    tl.fromTo(
      '.preloader-version',
      { opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 },
      { opacity: 1, width: 'auto', paddingLeft: 16, paddingRight: 16, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // Phase 6: Show subtitle with typing effect
    tl.fromTo(
      '.preloader-subtitle',
      { opacity: 0, y: 10, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

    // Hold
    tl.to({}, { duration: 0.6 });

    // Phase 7: Burst
    tl.call(() => { currentPhase = 'burst'; });
    // Text flies up and fades
    tl.to('.preloader-text-container', {
      y: -40,
      opacity: 0,
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.in',
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Text Content */}
      <div className="preloader-text-container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        {/* Logo Lines */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <h1
            className="preloader-logo-line"
            style={{
              fontFamily: "'Refault', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #7849f8 0%, #ff2d95 50%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              margin: 0,
              opacity: 0,
              letterSpacing: '0.05em',
            }}
          >
            VIDHEY
          </h1>
          <h1
            className="preloader-logo-line"
            style={{
              fontFamily: "'Refault', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #00f0ff 0%, #7849f8 50%, #ff2d95 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              margin: 0,
              opacity: 0,
              letterSpacing: '0.15em',
            }}
          >
            VERSE
          </h1>
        </div>

        {/* Version Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}>
          <span
            className="preloader-version"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(120, 73, 248, 0.4)',
              borderRadius: '9999px',
              padding: '4px 16px',
              fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              color: '#7849f8',
              letterSpacing: '0.15em',
              opacity: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            V3.0
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="preloader-subtitle"
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
            color: 'rgba(120, 73, 248, 0.6)',
            letterSpacing: '0.3em',
            marginTop: '1rem',
            opacity: 0,
            textTransform: 'uppercase',
          }}
        >
          Initializing Portfolio System
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={dismiss}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(120, 73, 248, 0.05)',
          border: '1px solid rgba(120, 73, 248, 0.2)',
          color: 'rgba(120, 73, 248, 0.5)',
          padding: '0.5rem 1.5rem',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          zIndex: 2,
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'rgba(120, 73, 248, 0.6)';
          e.target.style.color = '#7849f8';
          e.target.style.background = 'rgba(120, 73, 248, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(120, 73, 248, 0.2)';
          e.target.style.color = 'rgba(120, 73, 248, 0.5)';
          e.target.style.background = 'rgba(120, 73, 248, 0.05)';
        }}
      >
        Skip Intro →
      </button>

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 1 }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderLeft: '1px solid rgba(120, 73, 248, 0.3)',
          borderTop: '1px solid rgba(120, 73, 248, 0.3)',
        }} />
      </div>
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 1 }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderRight: '1px solid rgba(120, 73, 248, 0.3)',
          borderTop: '1px solid rgba(120, 73, 248, 0.3)',
        }} />
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 1 }}>
        <div style={{
          width: '20px',
          height: '20px',
          borderLeft: '1px solid rgba(120, 73, 248, 0.3)',
          borderBottom: '1px solid rgba(120, 73, 248, 0.3)',
        }} />
      </div>
    </div>
  );
}
