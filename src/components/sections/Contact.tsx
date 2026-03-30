'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { NeonButton } from '../ui/NeonButton'
import { GlitchText } from '../ui/GlitchText'

export function Contact() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Environment variables specified by user in .env.local
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'dummy'
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'dummy'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'dummy'

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey)
      .then(() => {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      })
      .catch(() => {
        setStatus('error')
      })
      .finally(() => setLoading(false))
  }

  return (
    <section id="contact" className="relative min-h-screen py-32 px-6 md:px-20 lg:px-40 bg-bg-deep z-10 flex flex-col justify-center border-t border-accent-primary/20">
      
      {/* Background glow base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent-primary/10 blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-3xl mx-auto w-full text-center relative z-20">
        <GlitchText 
          text="COMMUNICATION_BRIDGE" 
          className="font-display text-5xl md:text-7xl text-white uppercase tracking-wider mb-6"
          delay={0.1}
        />
        <p className="font-mono text-xs md:text-sm text-text-muted tracking-[0.3em] mb-16 uppercase bg-black/50 inline-block px-4 py-2 border border-grid-line">
          The communication bridge is open. Signal your intent to initiate a collaboration cycle or simply leave a digital trace. I am ready to synchronize.
        </p>

        <form onSubmit={sendEmail} className="space-y-8 text-left bg-bg-void/60 backdrop-blur-md p-10 border border-grid-line shadow-glow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label className="font-mono text-xs text-accent-dim tracking-widest p-1 uppercase group-focus-within:text-accent-primary transition-colors">IDENTIFIER [NAME]</label>
              <input 
                type="text" 
                name="user_name" 
                required 
                className="w-full bg-bg-void/80 border-b-2 border-grid-line focus:border-accent-primary outline-none px-4 py-3 text-white font-body text-xl transition-colors placeholder:text-gray-800"
                placeholder="Kevin Flynn"
              />
            </div>
            <div className="space-y-2 group">
              <label className="font-mono text-xs text-accent-dim tracking-widest p-1 uppercase group-focus-within:text-accent-primary transition-colors">ROUTING [EMAIL]</label>
              <input 
                type="email" 
                name="user_email" 
                required 
                className="w-full bg-bg-void/80 border-b-2 border-grid-line focus:border-accent-primary outline-none px-4 py-3 text-white font-body text-xl transition-colors placeholder:text-gray-800"
                placeholder="flynn@encom.com"
              />
            </div>
          </div>
          
          <div className="space-y-2 group">
              <label className="font-mono text-xs text-accent-dim tracking-widest p-1 uppercase group-focus-within:text-accent-primary transition-colors">PACKET_PAYLOAD [MESSAGE]</label>
              <textarea 
                name="message" 
                rows={5} 
                required 
                className="w-full bg-bg-void/80 border-b-2 border-grid-line focus:border-accent-primary outline-none px-4 py-3 text-white font-body text-xl transition-colors resize-none placeholder:text-gray-800"
                placeholder="Enter message data..."
              />
          </div>

          <div className="pt-8 flex justify-center">
            <NeonButton type="submit" variant="primary" className="px-12 py-4 text-sm tracking-[0.2em]" disabled={loading}>
              {loading ? 'TRANSMITTING...' : 'INITIALIZE_CONNECTION'}
            </NeonButton>
          </div>
          
          {status === 'success' && <p className="text-center mt-6 font-mono text-xs text-status-success uppercase tracking-widest shadow-glow-sm border border-status-success/30 bg-status-success/10 py-2">Transmission Successful. Sequence complete.</p>}
          {status === 'error' && <p className="text-center mt-6 font-mono text-xs text-status-error uppercase tracking-widest shadow-glow-sm border border-status-error/30 bg-status-error/10 py-2">Transmission Failed. Check .env variables or connection.</p>}
        </form>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center">
        <p className="font-mono text-[10px] text-accent-dim uppercase tracking-[0.4em]">
          End of Line // {new Date().getFullYear()} Vidhey Bhogadi
        </p>
      </div>
    </section>
  )
}
