'use client'

import React, { forwardRef, useRef } from 'react'

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className = '', ...props }, forwardedRef) => {
    // Merge internal hover ref and forwarded external ref (like GSAP)
    const localRef = useRef<HTMLDivElement | null>(null)
    
    // We update the local variable and trigger forwarded fn.
    const setRef = (el: HTMLDivElement | null) => {
      localRef.current = el
      if (typeof forwardedRef === 'function') {
        forwardedRef(el)
      } else if (forwardedRef && 'current' in forwardedRef) {
        ;(forwardedRef as any).current = el
      }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!localRef.current) return
      const rect = localRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10
      
      localRef.current.style.setProperty('--mouse-x', `${x}px`)
      localRef.current.style.setProperty('--mouse-y', `${y}px`)
      localRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
    
    const handleMouseLeave = () => {
      if (!localRef.current) return
      localRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }
    
    return (
      <div 
        ref={setRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-transform duration-200 ease-out will-change-transform group/tilt ${className}`}
        {...props}
      >
        {/* Dynamic glare element */}
        <div 
          className="pointer-events-none absolute inset-0 z-[60] rounded opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100 mix-blend-screen"
          style={{
            background: 'radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(0,245,255,0.1), transparent 40%)'
          }}
        />
        {children}
      </div>
    )
  }
)
TiltCard.displayName = 'TiltCard'
