import { Howl, Howler } from 'howler'

// Global volume setup
const masterVolume = 0.6
let audioEnabled = false

// Ensure we only initialize audio client-side
const isBrowser = typeof window !== 'undefined'

export const AudioEngine = {
  ambient: isBrowser ? new Howl({
    src: ['/audio/ambient-tron.mp3'],
    loop: true,
    volume: 0.15,
    preload: false,
    onloaderror: () => console.warn("Ambient audio missing.")
  }) : null,
  
  bikeIdle: isBrowser ? new Howl({
    src: ['/audio/bike-idle.mp3'],
    loop: true,
    volume: 0.3,
    preload: false,
    onloaderror: () => console.warn("Bike audio missing.")
  }) : null,
  
  whoosh:       isBrowser ? new Howl({ src: ['/audio/section-whoosh.mp3'], volume: 0.5, onloaderror: () => {} }) : null,
  uiHover:      isBrowser ? new Howl({ src: ['/audio/ui-hover.mp3'], volume: 0.2, onloaderror: () => {} }) : null,
  uiClick:      isBrowser ? new Howl({ src: ['/audio/ui-click.mp3'], volume: 0.3, onloaderror: () => {} }) : null,
  burst:        isBrowser ? new Howl({ src: ['/audio/particle-burst.mp3'], volume: 0.5, onloaderror: () => {} }) : null,
  discThrow:    isBrowser ? new Howl({ src: ['/audio/disc-throw.mp3'], volume: 0.6, onloaderror: () => {} }) : null,
  trophyHum:    isBrowser ? new Howl({ src: ['/audio/trophy-hum.mp3'], volume: 0.2, onloaderror: () => {} }) : null,
  modeSwitch:   isBrowser ? new Howl({ src: ['/audio/mode-switch.mp3'], volume: 0.4, onloaderror: () => {} }) : null,
  typeTick:     isBrowser ? new Howl({ src: ['/audio/type-tick.mp3'], volume: 0.15, onloaderror: () => {} }) : null,
  bikeLaunch:   isBrowser ? new Howl({ src: ['/audio/bike-launch.mp3'], volume: 0.7, onloaderror: () => {} }) : null,
  bikeBrake:    isBrowser ? new Howl({ src: ['/audio/bike-brake.mp3'], volume: 0.5, onloaderror: () => {} }) : null,
  armorLock:    isBrowser ? new Howl({ src: ['/audio/armor-lock.mp3'], volume: 0.6, onloaderror: () => {} }) : null,
  worldUnleash: isBrowser ? new Howl({ src: ['/audio/world-unleash.mp3'], volume: 0.7, onloaderror: () => {} }) : null,
  
  play(sound: Howl | null, options?: { pitch?: number }) {
    if (!isBrowser || !audioEnabled || !sound) return
    if (options?.pitch) sound.rate(options.pitch)
    sound.play()
  },
  
  enable() {
    if (!isBrowser) return
    audioEnabled = true
    Howler.volume(masterVolume)
    
    if (this.ambient?.state() === 'unloaded') this.ambient?.load()
    if (this.bikeIdle?.state() === 'unloaded') this.bikeIdle?.load()
    
    this.ambient?.play()
    this.bikeIdle?.play()
  },
  
  disable() {
    if (!isBrowser) return
    audioEnabled = false
    Howler.volume(0) // Mute global
    this.ambient?.pause()
    this.bikeIdle?.pause()
  },
  
  setBikeSpeed(normalized: number) {
    if (!isBrowser || !audioEnabled || !this.bikeIdle) return
    this.bikeIdle.rate(0.8 + normalized * 1.2)
    this.bikeIdle.volume(0.2 + normalized * 0.3)
  }
}
