'use client'

import { useState } from 'react'
import { AudioEngine } from '@/lib/audio'
import { Volume2, VolumeX } from 'lucide-react' // Using lucide-react per dependencies

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false)
  
  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    if (next) AudioEngine.enable()
    else AudioEngine.disable()
    AudioEngine.play(AudioEngine.modeSwitch) // Play click SFX
  }
  
  return (
    <button 
      onClick={toggle} 
      className="audio-toggle flex items-center gap-2 p-2 px-3 border border-accent-primary text-accent-primary hover:shadow-glow-sm transition-shadow rounded-sm text-xs font-display tracking-tron"
      title={enabled ? 'Mute' : 'Enable Audio'}
    >
      {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span>{enabled ? 'SFX ON' : 'SFX OFF'}</span>
    </button>
  )
}
