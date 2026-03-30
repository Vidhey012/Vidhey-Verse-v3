'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  text: string
  className?: string
  delay?: number
}

const chars = '!<>-_\\/[]{}—=+*^?#________'

export function GlitchText({ text, className = '', delay = 0 }: Props) {
  const [displayText, setDisplayText] = useState(text)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let iteration = 0
    let interval: NodeJS.Timeout
    
    const scramble = () => {
      clearInterval(interval)
      interval = setInterval(() => {
        setDisplayText(prev => prev.split('').map((letter, index) => {
          if (index < iteration) return text[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join(''))
        
        if (iteration >= text.length) {
            clearInterval(interval)
            setDisplayText(text)
        }
        iteration += 1 / 3
      }, 30)
    }
    
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => setTimeout(scramble, delay * 1000)
    })
    
    return () => {
        clearInterval(interval)
        trigger.kill()
    }
  }, [text, delay])
  
  return (
    <div ref={ref} className={className} data-text={text}>
      {displayText}
    </div>
  )
}
