'use client'

export function Certifications() {
  return (
    <section id="certifications" className="relative min-h-screen py-32 px-6 md:px-20 lg:px-40 z-10 flex flex-col justify-center border-y border-grid-bright bg-bg-void">
       <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(to right, var(--color-accent-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent-primary) 1px, transparent 1px)',
        backgroundSize: '100px 100px'
       }} />
       
       <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-wider mb-8">
            Access_Granted<span className="text-accent-primary drop-shadow-glow">::Certs</span>
        </h2>
        
        <p className="font-mono text-sm text-text-muted max-w-2xl mx-auto mb-20 leading-relaxed tracking-widest uppercase">
            Authorized clearances and verified data packets retrieved from the mainframe.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-12">
            {/* Cert 1 */}
            <div className="group relative w-64 h-80 bg-bg-surface border border-grid-line rounded hover:border-accent-primary transition-all duration-500 flex flex-col items-center justify-center overflow-hidden hover:shadow-glow-md">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Holographic Ring */}
                <div className="absolute top-10 w-24 h-24 rounded-full border border-dashed border-accent-primary/50 animate-[spin_10s_linear_infinite] group-hover:border-accent-primary transition-colors" />

                <div className="w-20 h-20 rounded-full bg-bg-void border-2 border-accent-secondary flex items-center justify-center mb-6 shadow-glow-sm relative z-10">
                    <span className="font-mono text-3xl text-white">AZ</span>
                </div>
                <h3 className="font-display text-lg text-white group-hover:text-accent-primary transition-colors relative z-10">AZ-900</h3>
                <p className="font-mono text-[10px] text-accent-dim mt-2 tracking-widest text-center px-4 relative z-10">Microsoft Azure Fundamentals</p>
            </div>
            
            {/* Cert 2 */}
            <div className="group relative w-64 h-80 bg-bg-surface border border-grid-line rounded hover:border-accent-primary transition-all duration-500 flex flex-col items-center justify-center overflow-hidden hover:shadow-glow-md">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Holographic Ring */}
                <div className="absolute top-10 w-24 h-24 rounded-full border border-dashed border-accent-primary/50 animate-[spin_10s_linear_infinite] group-hover:border-accent-primary transition-colors" />

                <div className="w-20 h-20 rounded-full bg-bg-void border-2 border-accent-secondary flex items-center justify-center mb-6 shadow-glow-sm relative z-10">
                    <span className="font-mono text-2xl text-white tracking-widest pr-1">ITIL</span>
                </div>
                <h3 className="font-display text-lg text-white group-hover:text-accent-primary transition-colors relative z-10">ITIL v4</h3>
                <p className="font-mono text-[10px] text-accent-dim mt-2 tracking-widest text-center px-4 relative z-10">IT Service Management Foundation</p>
            </div>
        </div>
       </div>
    </section>
  )
}
