'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function NeonButton({ children, variant = 'primary', className = '', ...props }: NeonButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  // Use quickTo for high performance pointer tracking without layout trashing
  const xTo = useRef<any>(null)
  const yTo = useRef<any>(null)

  useEffect(() => {
    if (ref.current) {
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || !xTo.current || !yTo.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate distance from center of button
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    // Move button 30% of the distance to the mouse
    xTo.current(x * 0.3)
    yTo.current(y * 0.3)
  }

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return
    xTo.current(0)
    yTo.current(0)
  }

  return (
    <button 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`neon-btn group neon-btn--${variant} ${className} transition-[background,border,color] duration-300 relative`} 
        {...props}
    >
      <span className="trace top" />
      <span className="trace right" />
      <span className="trace bottom" />
      <span className="trace left" />
      
      {/* HOLOGRAPHIC RING (THE WOW FACTOR) */}
      <span className="absolute inset-[-10px] border border-accent-primary/20 rounded-sm opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
      <span className="absolute inset-[-20px] border border-accent-secondary/10 rounded-sm opacity-0 group-hover:opacity-60 group-hover:scale-125 transition-all duration-700 pointer-events-none delay-75" />
      
      {/* SCANLINE OVERLAY */}
      <span className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,245,255,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <span className="content relative z-10 block">{children}</span>
      
      {/* GLITCH FLICKER (SUBTLE) */}
      <span className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:animate-pulse pointer-events-none" />
    </button>
  )
}
