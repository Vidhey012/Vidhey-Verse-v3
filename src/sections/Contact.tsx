import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { audioManager } from '@/audio/audioManager';

interface FormState { name: string; email: string; message: string; }
type Status = 'idle' | 'typing' | 'sending' | 'sent' | 'error';

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'idle') setStatus('typing');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        audioManager.play('transmit');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/Vidhey012',  icon: 'GH', color: '#00C8FF' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhogadi-vidhey-aa62b71a8/', icon: 'LI', color: '#A855F7' },
    { label: 'Email',    href: 'mailto:vidhey.bhogadi2003@gmail.com', icon: '@', color: '#F59E0B' },
  ];

  const promptLine = status === 'sending' ? '> TRANSMITTING... ▐' :
                     status === 'sent'    ? '> TRANSMISSION_COMPLETE ✓' :
                     status === 'error'   ? '> ERROR: RETRY?' :
                     '> INIT_CONTACT _';

  return (
    <section id="contact" ref={sectionRef} className="relative w-full min-h-screen bg-[var(--color-deep)] py-24 overflow-hidden">
      {/* Background lines */}
      <div className="absolute inset-0 circuit-bg opacity-[0.04] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,200,255,0.08) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          className="text-center mb-14"
        >
          <p className="font-code text-xs text-[var(--color-cyan)] tracking-[0.3em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-5xl text-white uppercase">
            Cyber <span className="gradient-text">Terminal</span>
          </h2>
        </motion.div>

        {/* Terminal container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.15 }}
          className="border border-[rgba(0,200,255,0.2)] rounded-sm overflow-hidden"
          style={{ background: 'rgba(5,7,15,0.95)', backdropFilter: 'blur(12px)', boxShadow: '0 0 60px rgba(0,200,255,0.06)' }}
        >
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-5 h-10 border-b border-[rgba(0,200,255,0.12)]" style={{ background: 'rgba(13,17,48,0.9)' }}>
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-code text-xs text-[var(--color-cyan)] tracking-widest">{promptLine}</span>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
            {[
              { label: 'NAME', name: 'name', type: 'text', placeholder: 'Enter your name...', value: form.name },
              { label: 'EMAIL', name: 'email', type: 'email', placeholder: 'your@email.com', value: form.email },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="font-code text-xs text-[var(--color-cyan)] tracking-[0.2em] uppercase">
                  {`> ${field.label}:`}
                </label>
                <div className="flex items-center gap-2 border-b border-[rgba(0,200,255,0.2)] pb-1 focus-within:border-[var(--color-cyan)] transition-colors">
                  <span className="font-code text-[var(--color-purple)] text-sm">$</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="flex-1 bg-transparent font-code text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] caret-[var(--color-cyan)]"
                    onFocus={() => audioManager.play('hoverTick')}
                  />
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="font-code text-xs text-[var(--color-cyan)] tracking-[0.2em] uppercase">{`> MESSAGE:`}</label>
              <div className="border-b border-[rgba(0,200,255,0.2)] pb-1 focus-within:border-[var(--color-cyan)] transition-colors">
                <span className="font-code text-[var(--color-purple)] text-sm">$</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="w-full bg-transparent font-code text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-dim)] caret-[var(--color-cyan)] resize-none mt-1 ml-6"
                  onFocus={() => audioManager.play('hoverTick')}
                />
              </div>
            </div>

            {status === 'sent' ? (
              <div className="font-code text-sm text-[#4ADE80] animate-pulse">
                {'>'} TRANSMISSION COMPLETE. Message received. ✓
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-cyber self-start mt-2"
                onMouseEnter={() => audioManager.play('hoverTick')}
              >
                <span>{status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT →'}</span>
              </button>
            )}
          </form>
        </motion.div>

        {/* Contact info + social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 14 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Contact info lines */}
          <div className="font-code text-sm text-[var(--color-text-dim)] space-y-2">
            <div><span className="text-[var(--color-cyan)]">email:    </span>vidhey.bhogadi2003@gmail.com</div>
            <div><span className="text-[var(--color-cyan)]">phone:    </span>+91 7396104404</div>
            <div><span className="text-[var(--color-cyan)]">location: </span>Whitefield, Bangalore 560066</div>
          </div>

          {/* Social hexagon buttons */}
          <div className="flex gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 flex items-center justify-center border-2 font-display text-sm font-bold transition-all duration-300"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  borderColor: s.color,
                  color: s.color,
                  background: `${s.color}10`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = s.color;
                  el.style.color = '#05070F';
                  el.style.boxShadow = `0 0 20px ${s.color}`;
                  audioManager.play('hoverTick');
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = `${s.color}10`;
                  el.style.color = s.color;
                  el.style.boxShadow = 'none';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
